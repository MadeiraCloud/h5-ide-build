(function() {
  define(["CloudResources", "Design", "../template/TplLeftPanel", "constant", 'i18n!/nls/lang.js', 'ApiRequest', 'OpsModel', "backbone", "UI.nanoscroller", "UI.dnd"], function(CloudResources, Design, LeftPanelTpl, constant, lang, ApiRequest, OpsModel) {
    MC.template.resPanelImageDocker = LeftPanelTpl.resourcePanelBubble;
    return Backbone.View.extend({
      events: {
        "mousedown .resource-item": "startDrag"
      },
      initialize: function(options) {
        _.extend(this, options);
        this.setElement(this.parent.$el.find(".OEPanelLeft"));
        return this.render();
      },
      render: function() {
        this.$el.html(LeftPanelTpl.panel());
        this.renderDockerImageList();
        this.$el.find(".nano").nanoScroller();
      },
      renderDockerImageList: function() {
        var dataAry, dockerImageCol;
        dockerImageCol = CloudResources(this.workspace.design.credentialId(), constant.RESTYPE.DOCKERIMAGE, this.workspace.design.region());
        dataAry = dockerImageCol.toJSON();
        _.each(dataAry, function(data) {
          return data.bubble = JSON.stringify(data);
        });
        return this.$el.find('.resource-list-docker-image').html(LeftPanelTpl.docker_image(dataAry));
      },
      toggleLeftPanel: function() {
        this.__leftPanelHidden = this.$el.toggleClass("hidden").hasClass("hidden");
        return null;
      },
      toggleResourcePanel: function() {
        return this.toggleLeftPanel();
      },
      startDrag: function(evt) {
        var $tgt, dropTargets, option, type;
        if (evt.button !== 0) {
          return false;
        }
        $tgt = $(evt.currentTarget);
        type = constant.RESTYPE[$tgt.attr("data-type")];
        dropTargets = "#OpsEditor .OEPanelCenter";
        option = $.extend(true, {}, $tgt.data("option") || {});
        option.type = type;
        $tgt.dnd(evt, {
          dropTargets: $(dropTargets),
          dataTransfer: option,
          eventPrefix: "addItem_"
        });
        return false;
      },
      remove: function() {
        _.invoke(this.subViews, 'remove');
        this.subViews = null;
        Backbone.View.prototype.remove.call(this);
      }
    });
  });

}).call(this);
