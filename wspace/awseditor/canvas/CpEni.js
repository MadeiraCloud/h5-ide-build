(function() {
  define(["./CpInstance", "./TplPopup", "constant"], function(InstancePopup, TplPopup, constant) {
    return InstancePopup.extend({
      content: function() {
        return TplPopup.eni({
          name: this.host.get("name"),
          items: this.models || []
        });
      },
      selectItem: function(evt) {
        this.canvas.deselectItem(true);
        this.$el.find(".selected").removeClass("selected");
        this.canvas.triggerSelected(constant.RESTYPE.ENI, $(evt.currentTarget).addClass("selected").attr("data-id"));
        return false;
      }
    });
  });

}).call(this);
