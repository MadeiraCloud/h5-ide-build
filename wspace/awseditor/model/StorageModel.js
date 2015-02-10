(function() {
  define(["Design", "ResourceModel"], function(Design, ResourceModel) {
    var Model;
    Model = ResourceModel.extend({
      type: "AWS.Tag",
      serialize: function() {
        return {
          component: $.extend(true, {}, this.get("data"))
        };
      }
    }, {
      handleTypes: ["AWS.EC2.Tag", "AWS.AutoScaling.Tag"],
      deserialize: function(data) {
        new Model({
          id: data.uid,
          data: data
        });
        return null;
      }
    });
    return Model;
  });

}).call(this);
