(function() {
  define(["constant", "ResourceModel", "Design"], function(constant, ResourceModel, Design) {
    var Model;
    Model = ResourceModel.extend({
      type: constant.RESTYPE.DHCP,
      defaults: function() {
        return {
          appId: ""
        };
      },
      isAuto: function() {
        return this.attributes.appId === "";
      },
      isDefault: function() {
        return this.attributes.appId === "default";
      },
      isCustom: function() {
        return !(this.attributes.appId === '' || this.attributes.appId === 'default');
      },
      getDhcp: function() {
        return this.get('appId');
      },
      setAuto: function() {
        return this.set('appId', "");
      },
      setDefault: function() {
        return this.set("appId", "default");
      },
      setDhcp: function(val) {
        if (this.get('appId') !== val) {
          return this.set("appId", val);
        }
      },
      serialize: function() {}
    }, {
      handleTypes: constant.RESTYPE.DHCP,
      deserialize: function(data) {
        var attr;
        attr = {};
        attr.id = data.uid;
        attr.appId = data.resource.DhcpOptionsId;
        new Model(attr);
        return null;
      }
    });
    return Model;
  });

}).call(this);
