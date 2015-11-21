define(['backbone', 'Design', "constant"], function(Backbone, Design, constant) {

  /*
  
  -------------------------------
   PropertyModel is a base class that every property view should inherit.
  -------------------------------
   */
  var PropertyModel;
  PropertyModel = Backbone.Model.extend({
    init: function() {
      return null;
    },
    setName: function(name) {
      var id;
      id = this.get("uid");
      console.assert(id, "This property model doesn't have an id");
      Design.instance().component(id).setName(name);
      this.set("name", name);
      return null;
    },
    setDesc: function(description) {
      var id;
      id = this.get("uid");
      console.assert(id, "This property model doesn't have an id");
      return Design.instance().component(id).setDesc(description);
    }
  });
  return PropertyModel;
});
