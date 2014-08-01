(function() {
  define(["./CpInstance", "./TplPopup", "event", "constant", "CloudResources"], function(InstancePopup, TplPopup, ide_event, constant, CloudResources) {
    return InstancePopup.extend({
      content: function() {
        return TplPopup.eni({
          name: this.host.get("name"),
          items: this.models || []
        });
      }
    });
  });

}).call(this);
