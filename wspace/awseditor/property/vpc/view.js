(function() {
  define(['../base/view', './template/stack', 'i18n!/nls/lang.js', 'dhcp', 'UI.modalplus'], function(PropertyView, template, lang, dhcp, modalPlus) {
    var VPCView, mapFilterInput;
    mapFilterInput = function(selector) {
      var $inputs, ipt, result, _i, _len;
      $inputs = $(selector);
      result = [];
      for (_i = 0, _len = $inputs.length; _i < _len; _i++) {
        ipt = $inputs[_i];
        if (ipt.value) {
          result.push(ipt.value);
        }
      }
      return result;
    };
    VPCView = PropertyView.extend({
      events: {
        'change #property-vpc-name': 'onChangeName',
        'change #property-res-desc': 'onChangeDesc',
        'change #property-cidr-block': 'onChangeCidr',
        'change #property-dns-resolution': 'onChangeDnsSupport',
        'change #property-dns-hostname': 'onChangeDnsHostname',
        'OPTION_CHANGE #property-tenancy': 'onChangeTenancy',
        'change .property-control-group-sub .input': 'onChangeDhcpOptions',
        'OPTION_CHANGE #property-netbios-type': 'onChangeDhcpOptions',
        'REMOVE_ROW #property-dhcp-options': 'onChangeDhcpOptions',
        'ADD_ROW .multi-input': 'processParsley'
      },
      render: function() {
        var data;
        data = this.model.toJSON();
        this.$el.html(template(data));
        multiinputbox.update($("#property-domain-server"));
        this.dhcp = new dhcp({
          resModel: this.model
        });
        this.dhcp.off('change');
        this.dhcp.on('change', (function(_this) {
          return function(e) {
            return _this.changeDhcp(e);
          };
        })(this));
        this.dhcp.on('manage', (function(_this) {
          return function() {
            return console.log(_this.dhcp.manager);
          };
        })(this));
        this.$el.find('#dhcp-dropdown').html(this.dhcp.dropdown.el);
        this.initDhcpSelection();
        return data.name;
      },
      initDhcpSelection: function() {
        var currentVal, selection;
        currentVal = this.model.attributes.dhcp.appId;
        if (currentVal === '') {
          selection = {
            isAuto: true
          };
        } else if (currentVal === "default") {
          selection = {
            isDefault: true
          };
        } else {
          selection = {
            id: currentVal
          };
        }
        return this.dhcp.setSelection(selection);
      },
      changeDhcp: function(e) {
        if (e.id === 'default') {
          return this.model.removeDhcp(true);
        } else if (e.id === '') {
          return this.model.removeDhcp(false);
        } else {
          return this.model.setDhcp(e.id);
        }
      },
      onChangeName: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "VPC")) {
          this.model.setName(name);
          this.setTitle(name);
        }
        return null;
      },
      onChangeDesc: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
      },
      onChangeCidr: function(event) {
        var cidr, target;
        target = $(event.currentTarget);
        cidr = target.val();
        if (target.parsley('validate')) {
          if (!this.model.setCidr(cidr)) {
            target.val(this.model.get("cidr"));
            notification(lang.NOTIFY.WARN_CANNT_AUTO_ASSIGN_CIDR_FOR_SUBNET);
          }
        }
        return null;
      },
      onChangeTenancy: function(event, newValue) {
        this.model.setTenancy(newValue);
        return null;
      },
      onChangeDnsSupport: function(event) {
        this.model.setDnsSupport(event.target.checked);
        return null;
      },
      onChangeDnsHostname: function(event) {
        this.model.setDnsHosts(event.target.checked);
        return null;
      },
      onChangeAmazonDns: function(event) {
        var $inputbox, $rows, allowRows, useAmazonDns;
        useAmazonDns = $("#property-amazon-dns").is(":checked");
        allowRows = useAmazonDns ? 3 : 4;
        $inputbox = $("#property-domain-server").attr("data-max-row", allowRows);
        $rows = $inputbox.children();
        $inputbox.toggleClass("max", $rows.length >= allowRows);
        this.model.setAmazonDns(useAmazonDns);
        return null;
      },
      onUseDHCP: function(event) {
        $("#property-dhcp-desc").hide();
        $("#property-dhcp-options").show();
        this.model.useDhcp();
        return null;
      },
      onChangeDhcpOptions: function(event) {
        var data;
        if (event && !$(event.currentTarget).closest('[data-bind=true]').parsley('validate')) {
          return;
        }
        data = {
          domainName: $("#property-dhcp-domain").val(),
          domainServers: mapFilterInput("#property-domain-server .input"),
          ntpServers: mapFilterInput("#property-ntp-server .input"),
          netbiosServers: mapFilterInput("#property-netbios-server .input"),
          netbiosType: parseInt($("#property-netbios-type .selection").html(), 10) || 0
        };
        this.model.setDHCPOptions(data);
        return null;
      }
    });
    return new VPCView();
  });

}).call(this);
