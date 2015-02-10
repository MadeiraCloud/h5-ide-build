(function() {
  define(['constant', './ValidationBase', 'i18n!/nls/lang.js'], function(constant, ValidationBase, lang) {
    return ValidationBase.extend({
      limits: {
        ip: ValidationBase.limit.ipv4
      },
      ip: function(value) {
        var haveRepeat, portAry, portModel, subnetCIDR, subnetModel, validObj;
        if (!MC.validate('ipv4', value)) {
          return 'Invalid IP Address';
        }
        subnetModel = this.model.parent();
        if (subnetModel.type === constant.RESTYPE.OSSUBNET) {
          subnetCIDR = subnetModel.get('cidr');
          validObj = Design.modelClassForType(constant.RESTYPE.SUBNET).isIPInSubnet(value, subnetCIDR, [0, 1, 2]);
          if (!validObj.isValid) {
            if (validObj.isReserved) {
              return lang.IDE.VALIDATION_IP_IN_SUBNET_REVERSED_RANGE;
            }
            return lang.IDE.VALIDATION_IP_CONFLICTS_WITH_SUBNET_IP_RANGE;
          }
        }
        portModel = this.model;
        if (this.model.type === constant.RESTYPE.OSSERVER && this.model.embedPort) {
          portModel = this.model.embedPort();
        }
        portAry = Design.modelClassForType(constant.RESTYPE.OSPORT).allObjects();
        portAry = portAry.concat(Design.modelClassForType(constant.RESTYPE.OSLISTENER).allObjects());
        haveRepeat = false;
        _.each(portAry, function(model) {
          if (model === portModel) {
            return;
          }
          if (value === model.get('ip')) {
            haveRepeat = true;
          }
          return null;
        });
        if (haveRepeat) {
          return lang.IDE.VALIDATION_IP_CONFLICTS_WITH_OTHER_IP;
        }
        return null;
      }
    }, {
      handleTypes: [constant.RESTYPE.OSPORT]
    });
  });

}).call(this);
