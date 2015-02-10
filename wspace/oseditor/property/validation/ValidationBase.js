(function() {
  define(['constant', 'backbone', 'i18n!/nls/lang.js'], function(constant, Backbone, LANG) {
    var ValidationBase, __handleTypes;
    __handleTypes = {};
    ValidationBase = Backbone.Model.extend({
      initialize: function(options) {
        return _.extend(this, options);
      },
      init: function() {},
      limits: {
        name: '^[a-zA-Z0-9][a-zA-Z0-9-]*$'
      },
      name: function(value) {
        var nameDup, newName, oldName, resModel;
        resModel = this.model;
        if (!resModel) {
          return;
        }
        oldName = resModel.get('name');
        newName = value;
        if (newName === '') {
          return '';
        }
        nameDup = false;
        if (oldName !== newName) {
          Design.instance().eachComponent(function(comp) {
            if (comp !== resModel && comp.get('name') === newName) {
              nameDup = true;
            }
            return null;
          });
        }
        if (nameDup === true) {
          return sprintf(LANG.PARSLEY.TYPE_NAME_CONFLICT, 'The', newName);
        }
        if (newName === 'self' || newName === 'this' || newName === 'global' || newName === 'meta' || newName === 'madeira') {
          return sprintf(LANG.PARSLEY.TYPE_NAME_CONFLICT, 'The', newName);
        }
        return null;
      },
      port: function(v) {
        if ((1 <= +v && +v <= 65535)) {
          return null;
        }
        return ValidationBase.commonTip('port');
      }
    }, {
      extend: function(protoProps, staticProps) {
        var childClass, handleTypes;
        childClass = Backbone.Model.extend.apply(this, arguments);
        delete childClass.register;
        delete childClass.getClass;
        if (staticProps) {
          handleTypes = staticProps.handleTypes;
          this.register(handleTypes, childClass);
        }
        if (protoProps.limits) {
          childClass.prototype.limits = _.extend(protoProps.limits, this.prototype.limits);
        }
        return childClass;
      },
      register: function(handleTypes, modelClass) {
        var type, _i, _len;
        for (_i = 0, _len = handleTypes.length; _i < _len; _i++) {
          type = handleTypes[_i];
          __handleTypes[type] = modelClass;
        }
        return null;
      },
      getClass: function(type) {
        return __handleTypes[type];
      },
      commonTip: function(xxx) {
        return sprintf(LANG.PARSLEY.THIS_VALUE_SHOULD_BE_A_VALID_XXX, xxx);
      },
      greaterTip: function(xxx) {
        return sprintf(LANG.PARSLEY.THIS_VALUE_SHOULD_BE_GREATER_THAN_XXX, xxx);
      },
      lowerTip: function(xxx) {
        return sprintf(LANG.PARSLEY.THIS_VALUE_SHOULD_BE_LOWER_THAN_XXX, xxx);
      },
      geTip: function(xxx) {
        return sprintf(LANG.PARSLEY.THIS_VALUE_SHOULD_BE_GREATER_THAN_OR_EQUAL_TO_XXX, xxx);
      },
      leTip: function(xxx) {
        return sprintf(LANG.PARSLEY.THIS_VALUE_SHOULD_BE_LOWER_THAN_OR_EQUAL_TO_XXX, xxx);
      },
      rangeTip: function(min, max) {
        return sprintf(LANG.PARSLEY.THIS_VALUE_MUST_BETWEEN_XXX_XXX(min, max));
      },
      validation: {
        range4G: function(nullable) {
          return ValidationBase.validation.range(null, 2147483647, nullable);
        },
        range: function(min, max, nullable) {
          if (_.isNumber(min) && _.isNumber(max)) {
            return function(v) {
              if (v < min || v > max) {
                return ValidationBase.rangeTip(min, max);
              }
              if (!nullable && v === '') {
                return '';
              } else {
                return null;
              }
            };
          } else if (_.isNumber(min)) {
            return function(v) {
              if (v < min) {
                return ValidationBase.greaterTip(min - 1);
              }
              if (!nullable && v === '') {
                return '';
              } else {
                return null;
              }
            };
          } else if (_.isNumber(max)) {
            return function(v) {
              if (v > max) {
                return ValidationBase.lowerTip(max + 1);
              }
              if (!nullable && v === '') {
                return '';
              } else {
                return null;
              }
            };
          }
        }
      },
      limit: {
        positive: '^[1-9]+[0-9]*$',
        nonnegative: '^[0-9]*$',
        portRange: '^[0-9-]*$',
        portICMPRange: '^[0-9/-]*$',
        ipv4: '^[0-9.]*$',
        cidrv4: '^[0-9/.]*$',
        number: '^-?[0-9]*$|^-?[0-9]+\\.[0-9]*$',
        osname: '^[a-zA-Z0-9][a-zA-Z0-9-]*$'
      }
    });
    return ValidationBase;
  });

}).call(this);
