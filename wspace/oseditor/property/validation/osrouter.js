(function() {
  define(['constant', './ValidationBase'], function(constant, ValidationBase) {
    return ValidationBase.extend({}, {
      handleTypes: [constant.RESTYPE.OSRT]
    });
  });

}).call(this);
