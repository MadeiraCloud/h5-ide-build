(function() {
  define(['backbone', 'jquery', 'underscore', 'MC'], function() {
    var StackRunModel;
    StackRunModel = Backbone.Model.extend({
      defaults: {
        'set_xxx': null,
        'get_xxx': null
      },
      initialize: function() {}
    });
    return StackRunModel;
  });

}).call(this);
