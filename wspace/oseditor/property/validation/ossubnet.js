(function() {
  define(['constant', './ValidationBase'], function(constant, ValidationBase) {
    return ValidationBase.extend({
      limits: {
        cidr: ValidationBase.limit.cidrv4,
        iplist: ValidationBase.limit.ipv4
      },
      cidr: function(value) {
        if (!MC.validate('cidr', value)) {
          return 'Invalid CIDR Address';
        }
        return null;
      }
    }, {
      handleTypes: [constant.RESTYPE.OSSUBNET]
    });
  });

}).call(this);
