(function() {
  define(['../base/view', './template/stack', './template/eni_list', 'i18n!/nls/lang.js'], function(PropertyView, template, list_template, lang) {
    var ENIView, noop;
    noop = function() {
      return null;
    };
    ENIView = PropertyView.extend({
      events: {
        'change #property-res-desc': 'onChangeDesc',
        "change #property-eni-source-check": "setEniSourceDestCheck",
        'click .toggle-eip': 'setEip',
        'click #property-eni-ip-add': "addIp",
        'click #property-eni-list .icon-remove': "removeIp",
        'keyup .input-ip': 'syncIPList'
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        this.refreshIpList();
        $("#prop-appedit-eni-list").html(list_template(this.model.attributes));
        this.bindIpItemValidate();
        return this.model.attributes.name;
      },
      setEniDesc: function(event) {
        this.model.setEniDesc(event.target.value);
        return null;
      },
      onChangeDesc: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
      },
      setEniSourceDestCheck: function(event) {
        this.model.setSourceDestCheck(event.target.checked);
        return null;
      },
      addIp: function() {
        if ($("#property-eni-ip-add").hasClass("disabled")) {
          return;
        }
        this.model.addIp();
        this.refreshIpList();
        return null;
      },
      setEip: function(event) {
        var $target, attach, index, tooltip;
        $target = $(event.currentTarget);
        index = $target.closest("li").index();
        attach = !$target.hasClass("associated");
        if (attach) {
          tooltip = lang.PROP.INSTANCE_IP_MSG_4;
        } else {
          tooltip = lang.PROP.INSTANCE_IP_MSG_3;
        }
        $target.toggleClass("associated", attach).attr("data-tooltip", tooltip);
        this.model.attachEip(index, attach);
        return null;
      },
      removeIp: function(event) {
        var $li, index;
        $li = $(event.currentTarget).closest("li");
        index = $li.index();
        $li.remove();
        this.model.removeIp(index);
        this.updateIPAddBtnState(true);
        return null;
      },
      syncIPList: function(event) {
        var $target, autoAssign, ip, ipItems, ipVal;
        ipItems = $('#property-eni-list .input-ip-item');
        $target = $(event.currentTarget);
        if (!$target.parsley('validate')) {
          return;
        }
        ipVal = $target.val();
        ip = $target.siblings(".input-ip-prefix").text() + ipVal;
        autoAssign = ipVal === "x" || ipVal === "x.x";
        this.model.setIp($target.closest(".input-ip-item").index(), ip, autoAssign);
        return null;
      },
      refreshIpList: function(event) {
        $('#property-eni-list').html(MC.template.propertyIpList(this.model.attributes.ips));
        this.updateIPAddBtnState();
        this.bindIpItemValidate();
        return null;
      },
      bindIpItemValidate: function() {
        var that;
        that = this;
        return $('.input-ip').each(function() {
          var $item;
          $item = $(this);
          return $item.parsley("custom", function(val) {
            var currentInputIP, inputValue, inputValuePrefix, ipIPFormatCorrect, prefixAry, result, validDOM;
            validDOM = $item;
            inputValue = val;
            inputValuePrefix = validDOM.siblings(".input-ip-prefix").text();
            currentInputIP = inputValuePrefix + inputValue;
            prefixAry = inputValuePrefix.split('.');
            ipIPFormatCorrect = false;
            if (prefixAry.length === 4) {
              if (inputValue === 'x') {
                ipIPFormatCorrect = true;
              } else if (MC.validate('ipaddress', inputValuePrefix + inputValue)) {
                ipIPFormatCorrect = true;
              }
            } else {
              if (inputValue === 'x.x') {
                ipIPFormatCorrect = true;
              } else if (MC.validate('ipaddress', inputValuePrefix + inputValue)) {
                ipIPFormatCorrect = true;
              }
            }
            if (!ipIPFormatCorrect) {
              return 'Invalid IP address';
            } else {
              result = that.model.isValidIp(currentInputIP);
              if (result !== true) {
                return result;
              }
            }
          });
        });
      },
      updateIPAddBtnState: function(enabled) {
        var tooltip;
        if (enabled === void 0) {
          enabled = this.model.canAddIP();
        }
        if (enabled === true) {
          tooltip = "Add IP Address";
        } else {
          if (_.isString(enabled)) {
            tooltip = enabled;
          } else {
            tooltip = "Cannot add IP address";
          }
          enabled = false;
        }
        $("#property-eni-ip-add").toggleClass("disabled", !enabled).data("tooltip", tooltip);
        return null;
      }
    });
    return new ENIView();
  });

}).call(this);
