(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["./CrModel", "CloudResources", "ApiRequest"], function(CrModel, CloudResources, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                              env:dev:end */
      taggable: false,
      isValidValue: function(value) {
        var allowed, range, valueNum, _i, _len, _ref;
        if (!this.attributes.AllowedValues) {
          return true;
        }
        valueNum = parseInt(value);
        if (__indexOf.call(this.attributes.AllowedValues.split(","), value) >= 0) {
          return true;
        }
        _ref = this.attributes.AllowedValues.split(",");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          allowed = _ref[_i];
          if (allowed.indexOf("-") >= 0) {
            if (!/^[0-9]*$/.test(value)) {
              return false;
            }
            range = allowed.split("-");
            if (valueNum >= parseInt(range[0]) && valueNum <= parseInt(range[1])) {
              return true;
            }
          }
        }
        return false;
      },
      applyMethod: function() {
        if (this.get("ApplyType") === "dynamic") {
          return "immediate";
        } else {
          return "pending-reboot";
        }
      }
    });
  });

}).call(this);
