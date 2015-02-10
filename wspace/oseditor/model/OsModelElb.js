(function() {
  define(["ComplexResModel", "constant"], function(ComplexResModel, constant) {
    return ComplexResModel.extend({
      type: constant.RESTYPE.OSELB,
      serialize: function() {}
    }, {
      handleTypes: constant.RESTYPE.OSELB,
      deserialize: function() {}
    });
  });

}).call(this);
