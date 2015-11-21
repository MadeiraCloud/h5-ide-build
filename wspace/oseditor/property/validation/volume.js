define(['constant', './ValidationBase', 'i18n!/nls/lang.js'], function(constant, ValidationBase, lang) {
  return ValidationBase.extend({
    mountPoint: function(value) {
      var _ref;
      if ((value.indexOf("/dev/sd" >= 0)) && (value.length === 8) && ((_ref = value.split("").pop()) === "f" || _ref === "g" || _ref === "h" || _ref === "i" || _ref === "j" || _ref === "k" || _ref === "l" || _ref === "m" || _ref === "n" || _ref === "o" || _ref === "p" || _ref === "q" || _ref === "r" || _ref === "s" || _ref === "t" || _ref === "u" || _ref === "v" || _ref === "w" || _ref === "x" || _ref === "y" || _ref === "z")) {
        return null;
      } else {
        return sprintf(lang.PARSLEY.THIS_VALUE_SHOULD_BE_A_VALID_XXX, "mount point");
      }
    },
    size: function(value) {
      if (value && new RegExp(ValidationBase.limit.positive).test(value)) {
        return null;
      } else {
        return sprintf(lang.PARSLEY.THIS_VALUE_SHOULD_BE_A_VALID_XXX, "number");
      }
    }
  }, {
    handleTypes: [constant.RESTYPE.OSVOL]
  });
});
