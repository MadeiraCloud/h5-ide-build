(function() {
  define(['../base/view', './template/stack'], function(PropertyView, template) {
    var StaticSubView;
    StaticSubView = PropertyView.extend({
      events: {
        "click #changeAmi": "showChangeAmiPanel",
        "click #confirmChangeAmi": "changeAmi",
        "click #cancelChangeAmi": "hideChangeAmiPanel"
      },
      render: function() {
        var self;
        this.$el.html(template(this.model.attributes));
        this.model.attributes.name;
        self = this;
        $("#changeAmiDropZone").on("addItem_drop", function(evt, data) {
          return self.onDropAmi(data);
        });
        return this.model.id;
      },
      showChangeAmiPanel: function() {
        $("#changeAmiPanel").show().siblings(".property-ami-info").hide();
        $("#changeAmiDropZone").children().hide().filter("p").show();
        $("#confirmChangeAmiWrap").hide();
        return null;
      },
      hideChangeAmiPanel: function() {
        $("#changeAmiPanel").hide().siblings(".property-ami-info").show();
        return null;
      },
      onDropAmi: function(data) {
        var amiId, canChangeAmi;
        amiId = data.dataTransfer.imageId;
        if (!amiId) {
          return;
        }
        $("#changeAmiPanel").data("amiId", amiId);
        $("#confirmChangeAmiWrap").show();
        canChangeAmi = this.model.canChangeAmi(amiId);
        if (canChangeAmi === true) {
          $("#changeAmiWarning").hide();
          $("#confirmChangeAmi").show();
        } else {
          $("#changeAmiWarning").html(canChangeAmi).show();
          $("#confirmChangeAmi").hide();
        }
        $("#changeAmiDropZone").children().show().filter("p").hide();
        $("#changeAmiDropZone").find("img").attr("src", "/assets/images/ide/ami/" + this.model.getAmiPngName(amiId) + ".png");
        $("#changeAmiDropZone").find(".resource-label").html(this.model.getAmiName(amiId));
        return null;
      },
      changeAmi: function() {
        var amiId;
        amiId = $("#changeAmiPanel").data("amiId");
        this.model.changeAmi(amiId);
        this.trigger("AMI_CHANGE");
        return null;
      }
    });
    return new StaticSubView();
  });

}).call(this);
