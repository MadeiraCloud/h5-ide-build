(function() {
  define(['backbone', 'constant', 'CloudResources', './template/TplResourcePanel', 'OsSnapshot', 'OsKp'], function(Backbone, constant, CloudResources, ResourcePanelTpl, OsSnapshot, OsKp) {
    MC.template.resPanelOsAmiInfo = function(data) {
      var ami;
      if (!data.region || !data.imageId) {
        return;
      }
      ami = CloudResources(constant.RESTYPE.OSIMAGE, data.region).get(data.imageId);
      return MC.template.bubbleOsAmiInfo((ami != null ? ami.toJSON() : void 0) || {});
    };
    MC.template.resPanelOsSnapshot = function(data) {
      var snapshot;
      if (!data.region || !data.id) {
        return;
      }
      snapshot = CloudResources(constant.RESTYPE.OSSNAP, data.region).get(data.id);
      return MC.template.bubbleOsSnapshotInfo((snapshot != null ? snapshot.toJSON() : void 0) || {});
    };
    return Backbone.View.extend({
      events: {
        'mousedown .resource-item': 'startDrag',
        'OPTION_CHANGE .ami-type-select': 'changeAmiType',
        'click .btn-refresh-panel': 'refreshPanelData',
        'click .manage-snapshot': 'manageSnapshot',
        'click .resources-dropdown-wrapper li': 'resourcesMenuClick'
      },
      amiType: 'public',
      initialize: function(options) {
        var region;
        _.extend(this, options);
        region = this.workspace.opsModel.get("region");
        this.listenTo(CloudResources(constant.RESTYPE.OSSNAP, region), 'update', this.renderSnapshot);
        return this.listenTo(CloudResources(constant.RESTYPE.OSIMAGE, region), 'update', this.renderAmi);
      },
      resourcesMenuClick: function(event) {
        var $currentDom, currentAction;
        $currentDom = $(event.currentTarget);
        currentAction = $currentDom.data('action');
        switch (currentAction) {
          case 'keypair':
            return new OsKp().manage();
          case 'snapshot':
            return new OsSnapshot().render();
        }
      },
      changeAmiType: function(event, type) {
        this.amiType = type;
        return this.renderAmi();
      },
      render: function() {
        this.$el.html(ResourcePanelTpl.frame({}));
        this.renderAmi();
        this.renderSnapshot();
        return this;
      },
      renderSnapshot: function() {
        var data, region, snapshots;
        region = this.workspace.opsModel.get("region");
        snapshots = CloudResources(constant.RESTYPE.OSSNAP, region).toJSON();
        data = _.map(snapshots, function(ss) {
          return _.extend({
            region: region
          }, ss);
        });
        this.$('.resource-list-volume').html(ResourcePanelTpl.snapshot(data));
        return this;
      },
      manageSnapshot: function() {
        var snapshotManager;
        snapshotManager = new OsSnapshot();
        return snapshotManager.render();
      },
      renderAmi: function() {
        var amis, currentTypeAmis, data, region, that;
        that = this;
        region = this.workspace.opsModel.get("region");
        amis = CloudResources(constant.RESTYPE.OSIMAGE, region).toJSON();
        currentTypeAmis = _.filter(amis, function(ami) {
          return ami.visibility === that.amiType;
        });
        data = _.map(currentTypeAmis, function(ami) {
          return _.extend({
            region: region
          }, ami);
        });
        this.$('.resource-list-ami').html(ResourcePanelTpl.ami(data));
        return this;
      },
      refreshPanelData: function(evt) {
        var $tgt, jobs, region;
        $tgt = $(evt.currentTarget);
        if ($tgt.hasClass("reloading")) {
          return;
        }
        $tgt.addClass("reloading");
        region = this.workspace.opsModel.get("region");
        jobs = [CloudResources(constant.RESTYPE.OSIMAGE, region).fetchForce(), CloudResources(constant.RESTYPE.OSSNAP, region).fetchForce()];
        Q.all(jobs).done(function() {
          return $tgt.removeClass("reloading");
        });
      },
      startDrag: function(evt) {
        var $tgt, dropTargets, option, type;
        if (evt.button !== 0) {
          return false;
        }
        $tgt = $(evt.currentTarget);
        if ($tgt.hasClass("disabled")) {
          return false;
        }
        if (evt.target && $(evt.target).hasClass("btn-fav-ami")) {
          return;
        }
        type = constant.RESTYPE[$tgt.attr("data-type")];
        dropTargets = "#OpsEditor .OEPanelCenter";
        option = $.extend(true, {}, $tgt.data("option") || {});
        option.type = type;
        $tgt.dnd(evt, {
          dropTargets: $(dropTargets),
          dataTransfer: option,
          eventPrefix: type === constant.RESTYPE.OSVOL ? "addVol_" : "addItem_"
        });
        return false;
      }
    });
  });

}).call(this);
