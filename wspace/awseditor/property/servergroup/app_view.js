(function() {
  define(['../base/view', '../instance/view', './template/app', './template/ami_list', 'i18n!/nls/lang.js'], function(PropertyView, instance_view, template, ami_list_template, lang) {
    var InstanceView;
    InstanceView = PropertyView.extend({
      events: {
        'change .instance-name': 'instanceNameChange',
        'change #property-res-desc': 'onChangeDesc',
        'change #property-instance-count': "countChange",
        'click #property-ami': "openAmiPanel",
        'OPTION_CHANGE #instance-type-select': "instanceTypeSelect",
        'change #property-instance-ebs-optimized': 'ebsOptimizedSelect',
        'click .toggle-eip': 'setEip',
        'click #instance-ip-add': "addIp",
        'click #property-network-list .icon-remove': "removeIp",
        'change .input-ip': 'syncIPList',
        'change #property-instance-enable-cloudwatch': 'cloudwatchSelect',
        'change #property-instance-source-check': 'sourceCheckChange'
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        this.updateInstanceList();
        this.refreshIPList();
        return this.model.attributes.name;
      },
      instanceNameChange: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "Instance")) {
          this.model.setName(name);
          this.setTitle(name);
        }
        return null;
      },
      openAmiPanel: function(event) {
        this.trigger("OPEN_AMI", $(event.currentTarget).data("uid"));
        return false;
      },
      updateInstanceList: function() {
        $("#prop-appedit-ami-list").html(ami_list_template(this.model.attributes));
        return null;
      },
      countChange: function(event) {
        var target, val;
        target = $(event.currentTarget);
        target.parsley('custom', function(val) {
          if (isNaN(val) || val > 99 || val < 1) {
            return lang.PARSLEY.THIS_VALUE_MUST_BETWEEN_1_99;
          }
        });
        if (!target.parsley('validate')) {
          return;
        }
        val = +target.val();
        this.model.setCount(val);
        this.updateInstanceList();
        $(".property-instance-name-wrap").toggleClass("single", val === 1);
        $("#property-instance-name-count").text(val - 1);
        this.setEditableIP(val === 1);
        return null;
      },
      onChangeDesc: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
      },
      ebsOptimizedSelect: function(event) {
        this.model.setEbsOptimized(event.target.checked);
        return null;
      },
      instanceTypeSelect: instance_view.instanceTypeSelect,
      cloudwatchSelect: instance_view.cloudwatchSelect,
      sourceCheckChange: instance_view.sourceCheckChange,
      addIp: instance_view.addIp,
      removeIp: instance_view.removeIp,
      setEip: instance_view.setEip,
      syncIPList: instance_view.syncIPList,
      refreshIPList: instance_view.refreshIPList,
      updateIPAddBtnState: instance_view.updateIPAddBtnState,
      setEditableIP: instance_view.setEditableIP,
      validateIpItem: instance_view.validateIpItem,
      bindIpItemValidate: instance_view.bindIpItemValidate
    });
    return new InstanceView();
  });

}).call(this);
