(function() {
  define(['constant', './ValidationBase', './osport'], function(constant, ValidationBase, PortValidation) {
    ValidationBase.extend({
      limits: {
        weight: ValidationBase.limit.positive,
        port: ValidationBase.limit.positive
      },
      weight: ValidationBase.validation.range(null, 256)
    }, {
      handleTypes: [constant.RESTYPE.OSPOOL]
    });
    ValidationBase.extend({
      limits: {
        delay: ValidationBase.limit.positive,
        timeout: ValidationBase.limit.positive,
        maxRetries: ValidationBase.limit.positive,
        hmlist: ValidationBase.limit.osname
      },
      delay: ValidationBase.validation.range4G(),
      timeout: ValidationBase.validation.range4G(),
      maxRetries: ValidationBase.validation.range(null, 3)
    }, {
      handleTypes: [constant.RESTYPE.OSHM]
    });
    return ValidationBase.extend({
      limits: {
        ip: ValidationBase.limit.ipv4,
        port: ValidationBase.limit.positive,
        limit: ValidationBase.limit.positive
      },
      limit: ValidationBase.validation.range4G(),
      ip: (new PortValidation()).ip
    }, {
      handleTypes: [constant.RESTYPE.OSLISTENER]
    });
  });

}).call(this);
