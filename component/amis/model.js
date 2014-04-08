(function() {
  define(['backbone', 'jquery', 'underscore', 'MC'], function() {
    var AMIsModel;
    AMIsModel = Backbone.Model.extend({
      defaults: {
        'set_xxx': null,
        'get_xxx': null
      },
      initialize: function() {}
    });
    return AMIsModel;
  });

}).call(this);
