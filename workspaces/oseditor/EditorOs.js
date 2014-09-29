define('workspaces/oseditor/template/TplOsEditor',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1;


  buffer += "<div id=\"OpsEditor\" class=\"pos-r\">\n  <nav class=\"OEPanelTop\"></nav>\n  <aside class=\"OEPanelRight\" id=\"OEPanelRight\"></aside>\n\n<div class=\"OEMiddleWrap\">\n  <div class=\"OEPanelBottom\"></div>\n\n  <section class=\"OEPanelCenter nano\"> <div class=\"nano-content\">\n    <div class=\"canvas-view\">\n      <button class=\"svg_resizer icon-resize-down tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_EXPAND_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-up tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_SHRINK_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-right tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_EXPAND_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-left tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_SHRINK_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <svg width=\"100%\" height=\"100%\"></svg>\n    </div> </div>\n    <q class=\"canvas-message\"></q>\n  </section>\n</div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('workspaces/oseditor/template/TplPanel',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<article class=\"panel-body\"></article>\n<article class=\"panel-float hidden\"></article>";
  }; return Handlebars.template(TEMPLATE); });
define('workspaces/oseditor/subviews/panels/template/TplResourcePanel',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<nav class=\"clearfix\">\n    <ul class=\"anchor clearfix\">\n        <li data-scroll-to=\"system-image\">S</li>\n        <li data-scroll-to=\"block-storage\">B</li>\n        <li data-scroll-to=\"network\">N</li>\n    </ul>\n    <ul class=\"action clearfix\">\n        <li class=\"btn-refresh-panel icon-refresh\"></li>\n        <li class=\"btn-open-shareres icon-resources\"></li>\n    </ul>\n</nav>\n<section class=\"system-image\">\n    <header>\n        Server\n        <aside class=\"selectbox ami-type-select\">\n            <div class=\"selection\">System Image</div>\n            <ul class=\"dropdown\">\n                <li class=\"item selected\" data-id=\"public\">System Image</li>\n                <li class=\"item\" data-id=\"private\">Image Snapshot</li>\n            </ul>\n        </aside>\n    </header>\n    <article>\n        <ul class=\"nano-content resource-list-ami\"></ul>\n    </article>\n</section>\n\n<section class=\"block-storage\">\n    <header>Block Storage</header>\n    <article>\n        <ul class=\"resource-list-volume clearfix\"></ul>\n    </article>\n    <button class=\"btn btn-primary full-width manage-snapshot\">Manage Snapshots</button>\n</section>\n\n<section class=\"network\">\n    <header>Network</header>\n    <article>\n        <ul class=\"resource-list-network clearfix\">\n            <li class=\"tooltip resource-item ossubnet\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_IN_NETOWRK_TO_CREATE_SUBNET", {hash:{},data:data}))
    + "' data-type=\"OSSUBNET\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSSUBNET", {hash:{},data:data}))
    + "</li>\n\n            <li class=\"tooltip resource-item osrt\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_OUTSIDE_NETOWRK_TO_CREATE_ROUTER", {hash:{},data:data}))
    + "' data-type=\"OSRT\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSRT", {hash:{},data:data}))
    + "</li>\n\n            <li class=\"tooltip resource-item osport\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_IN_SUBNET_TO_CREATE_PORT", {hash:{},data:data}))
    + "' data-type=\"OSPORT\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSPORT", {hash:{},data:data}))
    + "</li>\n\n            <li class=\"tooltip resource-item oselb\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_IN_SUBNET_TO_CREATE_LOAD_BALANCE", {hash:{},data:data}))
    + "' data-type=\"OSPOOL\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSELB", {hash:{},data:data}))
    + "</li>\n\n        </ul>\n    </article>\n\n</section>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"bubble resource-item instance\" data-bubble-template=\"resPanelOsAmiInfo\" data-bubble-data='{\"region\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"imageId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-type=\"OSSERVER\" data-option='{\"imageId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n    <div class=\"resource-icon-instance\"><img src=\"/assets/images/ide/ami/openstack/"
    + escapeExpression(((stack1 = (depth0 && depth0.os_type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\" width=\"39\" height=\"27\"></div>\n    "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.ami=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item bubble snapshot\" data-date=\""
    + escapeExpression(((stack1 = (depth0 && depth0.created_at)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-storge=\""
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bubble-template=\"resPanelOsSnapshot\" data-bubble-data='{\"id\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"region\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-type=\"OSVOL\" data-option='{\"size\":"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", \"snapshot\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n  <div class=\"ebs-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</div>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>\n";
  return buffer;
  }

  buffer += "<li class=\"tooltip resource-item osvol\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_ON_SERVER_TO_ATTACH_VOLUME", {hash:{},data:data}))
    + "' data-type=\"OSVOL\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSVOL", {hash:{},data:data}))
    + "</li>\n";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.snapshot=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/oseditor/subviews/panels/ResourcePanel',['backbone', 'constant', 'CloudResources', './template/TplResourcePanel', 'OsSnapshot'], function(Backbone, constant, CloudResources, ResourcePanelTpl, OsSnapshot) {
    var amiType;
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
    amiType = 'public';
    return Backbone.View.extend({
      events: {
        'mousedown .resource-item': 'startDrag',
        'OPTION_CHANGE .ami-type-select': 'changeAmiType',
        'click .btn-refresh-panel': 'refreshPanelData',
        'click .manage-snapshot': "manageSnapshot"
      },
      initialize: function(options) {
        var region;
        _.extend(this, options);
        region = this.workspace.opsModel.get("region");
        this.listenTo(CloudResources(constant.RESTYPE.OSSNAP, region), 'update', this.renderSnapshot);
        return this.listenTo(CloudResources(constant.RESTYPE.OSIMAGE, region), 'update', this.renderAmi);
      },
      changeAmiType: function(event, type) {
        amiType = type;
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
        var amis, currentTypeAmis, data, region;
        region = this.workspace.opsModel.get("region");
        amis = CloudResources(constant.RESTYPE.OSIMAGE, region).toJSON();
        currentTypeAmis = _.filter(amis, function(ami) {
          return ami.visibility === amiType;
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

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('workspaces/oseditor/property/OsPropertyView',['constant'], function(constant) {
    var OsPropertyView, __propertyViewMap;
    __propertyViewMap = {
      stack: {},
      app: {},
      appedit: {}
    };
    OsPropertyView = Backbone.View.extend({
      events: {
        'change [data-target]': 'updateAttribute'
      },
      constructor: function(options) {
        if (options && _.isObject(options)) {
          _.extend(this, options);
        }
        this.__subViews = [];
        return Backbone.View.apply(this, arguments);
      },
      reg: function(subView) {
        if (__indexOf.call(this.__subViews, subView) >= 0) {
          return subView;
        }
        if (subView === this) {
          return subView;
        }
        this.__subViews.push(subView);
        _.extend(subView, _.pick(this, 'propertyPanel', 'panel'));
        subView.__superView = this;
        return subView;
      },
      remove: function() {
        var sv, _i, _len, _ref;
        _ref = this.__subViews;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sv = _ref[_i];
          if (sv != null) {
            if (typeof sv.remove === "function") {
              sv.remove();
            }
          }
        }
        return Backbone.View.prototype.remove.apply(this, arguments);
      },
      getRenderData: function() {
        return _.extend({}, this.getExtendJson(), this.getModelJson());
      },
      getExtendJson: function() {
        return {
          modeIsApp: this.modeIsApp(),
          modeIsAppEdit: this.modeIsAppEdit(),
          modeIsStack: this.modeIsStack()
        };
      },
      getModelJson: function() {
        var _ref, _ref1;
        switch (false) {
          case !this.modeIsStack():
            return this.model.toJSON();
          case !this.modeIsApp():
            return (_ref = this.appModel) != null ? _ref.toJSON() : void 0;
          case !this.modeIsAppEdit():
            return _.extend(this.model.toJSON(), {
              app: (_ref1 = this.appModel) != null ? _ref1.toJSON() : void 0
            });
        }
      },

      /*
      events:
          'change [data-target]': 'updateAttribute'
       */
      updateAttribute: function(e) {
        var $target, attr, value, _ref;
        $target = $(e.currentTarget);
        attr = $target.data('target');
        if (!attr) {
          return;
        }
        value = $target.getValue();
        if ((_ref = this.getModelForUpdateAttr(e)) != null) {
          _ref.set(attr, value);
        }
        if (attr === 'name') {
          return this.setTitle(value);
        }
      },
      getModelForUpdateAttr: function() {
        return this.model;
      },
      getPanel: function() {
        var _ref;
        return this.panel || ((_ref = this.__superView) != null ? _ref.panel : void 0);
      },
      getPropertyPanel: function() {
        var _ref;
        return this.propertyPanel || ((_ref = this.__superView) != null ? _ref.propertyPanel : void 0);
      },
      getModelForMode: function() {
        return this.model;
      },
      mode: function() {
        var mod, model;
        model = this.getModelForMode();
        if (!model) {
          return '';
        }
        mod = Design.instance().mode();
        if (mod === 'appedit' && !model.get('appId')) {
          mod = 'stack';
        }
        return mod;
      },
      modeIsApp: function() {
        return this.mode() === 'app';
      },
      modeIsAppEdit: function() {
        return this.mode() === 'appedit';
      },
      modeIsStack: function() {
        return this.mode() === 'stack';
      },
      getTitle: function() {
        var _ref;
        return (_ref = this.model) != null ? _ref.get('name') : void 0;
      },
      setTitle: function() {
        var _ref;
        return (_ref = this.getPropertyPanel()) != null ? _ref.setTitle.apply(this.getPropertyPanel(), arguments) : void 0;
      },
      showFloatPanel: function() {
        var _ref;
        return (_ref = this.getPanel()) != null ? _ref.showFloatPanel.apply(this.getPanel(), arguments) : void 0;
      },
      hideFloatPanel: function() {
        var _ref;
        return (_ref = this.getPanel()) != null ? _ref.hideFloatPanel.apply(this.getPanel(), arguments) : void 0;
      }
    }, {
      extend: function(protoProps, staticProps) {
        var childClass, handleModes, handleTypes;
        childClass = Backbone.Model.extend.apply(this, arguments);
        delete childClass.register;
        delete childClass.getClass;
        if (staticProps) {
          handleTypes = staticProps.handleTypes;
          handleModes = staticProps.handleModes;
          OsPropertyView.register(handleTypes, handleModes, childClass);
        }
        return childClass;
      },
      register: function(handleTypes, handleModes, modelClass) {
        var mode, type, _i, _j, _len, _len1;
        for (_i = 0, _len = handleModes.length; _i < _len; _i++) {
          mode = handleModes[_i];
          for (_j = 0, _len1 = handleTypes.length; _j < _len1; _j++) {
            type = handleTypes[_j];
            __propertyViewMap[mode][type] = modelClass;
          }
        }
        return null;
      },
      getClass: function(mode, type) {
        return __propertyViewMap[mode][type];
      }
    });
    return OsPropertyView;
  });

}).call(this);

define('workspaces/oseditor/property/default/template',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"os-property-default\">Select a resource on canvas to edit property</div>";
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/oseditor/property/default/view',['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
    return OsPropertyView.extend({
      render: function() {
        this.$el.html(template({}));
        return this;
      }
    }, {
      handleTypes: ['default'],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);

define('workspaces/oseditor/property/globalconfig/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"group required\">\n    <label class=\"name\">Stack Name</label>\n    <input data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group\">\n    <label class=\"name\">Stack Description</label>\n    <input data-target=\"description\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group\">\n    <dl class=\"horizontal\">\n        <dt>Platform</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.platform)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl class=\"horizontal\">\n        <dt>Region</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl class=\"horizontal\">\n        <dt>Stack ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('workspaces/oseditor/property/globalconfig/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_ENABLED", {hash:{},data:data}))
    + "</dd>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DISABLED", {hash:{},data:data}))
    + "</dd>\n        ";
  return buffer;
  }

  buffer += "<section class=\"group\">\n    <dl class=\"horizontal\">\n        <dt>Platform</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.platform)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl class=\"horizontal\">\n        <dt>Region</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl class=\"horizontal\">\n        <dt>App ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl class=\"horizontal\">\n        <dt>Usage</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n</section>\n\n<section class=\"group\">\n    <dl>\n        <dt>Description</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Instance State</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ">"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.APP_LBL_RESDIFF_VIEW", {hash:{},data:data}))
    + "</dt>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.resource_diff), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dl>\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/oseditor/property/globalconfig/view',['constant', '../OsPropertyView', './stack', './app'], function(constant, OsPropertyView, TplStack, TplApp) {
    return OsPropertyView.extend({
      events: {
        'change [data-target]': 'updateAttribute'
      },
      render: function() {
        var template;
        template = (function() {
          switch (false) {
            case this.mode !== 'app':
              return TplApp;
            default:
              return TplStack;
          }
        }).call(this);
        this.$el.html(template(this.getRenderData()));
        return this;
      },
      getTitle: function() {
        return null;
      }
    }, {
      handleTypes: ['globalconfig'],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);

define('workspaces/oseditor/property/ossubnet/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<section class=\"group\">\n    <dl class=\"vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Gateway IP</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.gateway_ip), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>DNS Name Server</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.dns_nameservers)),stack1 == null || stack1 === false ? stack1 : stack1[0]), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "disabled";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<section class=\"group required\">\n    <label class=\"name\">Subnet Name</label>\n    <input class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"name\" />\n</section>\n<section class=\"group required\">\n    <label class=\"name\">Cidr</label>\n    <input class=\"selection cidrv4\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"cidr\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n</section>";
  return buffer;
  };
TEMPLATE.stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "true";
  }

function program3(depth0,data) {
  
  
  return "false";
  }

  buffer += "<section class=\"group\">\n    <dl class=\"vertical\">\n        <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>CIDR</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.cidr), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Gateway IP</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.gateway_ip), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Enable DHCP</dt><dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.enable_dhcp), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>DNS Name Server</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.dns_nameservers)),stack1 == null || stack1 === false ? stack1 : stack1[0]), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.app=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/oseditor/property/ossubnet/view',['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
    return OsPropertyView.extend({
      events: {
        "change [data-target]": "updateAttribute"
      },
      render: function() {
        var json, _ref;
        if ((_ref = this.mode()) === 'stack' || _ref === 'appedit') {
          json = this.model.toJSON();
          if (this.mode() === 'appedit') {
            json = _.extend(json, this.getRenderData());
          }
          this.$el.html(template.stack(json));
        } else {
          this.$el.html(template.app(this.getRenderData()));
        }
        return this;
      },
      updateAttribute: function(event) {
        var $target, attr, value;
        $target = $(event.currentTarget);
        attr = $target.data('target');
        value = $target.getValue();
        this.model.set(attr, value);
        if (attr === 'cidr') {
          this.model.resetAllChildIP();
        }
        if (attr === 'name') {
          return this.setTitle(value);
        }
      }
    }, {
      handleTypes: [constant.RESTYPE.OSSUBNET],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);

define('workspaces/oseditor/property/osserver/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                <option value='"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "' ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.id), (depth1 && depth1.imageId), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n            ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "selected='selected'";
  }

function program6(depth0,data) {
  
  
  return "selected=\"selected\"";
  }

function program8(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program10(depth0,data) {
  
  
  return "style=\"display: none\"";
  }

function program12(depth0,data) {
  
  
  return "true";
  }

function program14(depth0,data) {
  
  
  return "false";
  }

  buffer += "<div class=\"option-group-head expand\">\n    Server Details\n</div>\n<div class=\"option-group\">\n    <section class=\"group required\">\n        <label class=\"name\">Server Name</label>\n        <input id=\"property-os-server-name\" data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name\">Server Image</label>\n        <select class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"imageId\" id=\"property-os-server-image\" data-select-tpl=\"imageSelect\" data-item-tpl=\"imageValue\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.imageList), {hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name\">CPU</label>\n        <select class=\"selection option\"  data-target=\"CPU\" id=\"property-os-server-CPU\"></select>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name\">RAM</label>\n        <select class=\"selection option required\" data-target=\"RAM\" id=\"property-os-server-RAM\"></select>\n    </section>\n    <section class=\"group\">\n        <label class=\"name\">Credential</label>\n        <select id=\"property-os-server-credential\" data-target=\"credential\" class=\"selection option\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <option value=\"keypair\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.credential), "keypair", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">KeyPair</option>\n            <option value=\"adminPass\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.credential), "keypair", {hash:{},inverse:self.program(6, program6, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">Password</option>\n        </select>\n    </section>\n    <section class=\"group required\"  ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.credential), "keypair", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <label class=\"name\">Admin Password</label>\n        <input id=\"property-os-server-adminPass\" data-target=\"adminPass\" type=\"password\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.adminPass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" placeholder=\"Password of the Image\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    </section>\n    <section class=\"group required\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.credential), "keypair", {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <label class=\"name\">Key Pair</label>\n        <div id=\"property-os-server-keypair\">\n        </div>\n    </section>\n    <section class=\"group\">\n        <label class=\"name\">User Data</label>\n        <textarea id=\"property-os-server-userdata\" data-target=\"userData\" type=\"text\" class=\"selection string\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.userData)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n</div>\n<div class=\"option-group-head expand\">\n    Port Details\n</div>\n<div class=\"option-group\">\n    <section class=\"group required\">\n        <label class=\"name\">Fixed IP</label>\n        <input class=\"selection ipv4\" id=\"property-os-server-fip\" data-target=\"fixedIp\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.fixedIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name tooltip\">Associate Floating IP</label>\n        <select class=\"selection bool\" id=\"property-os-server-aip\" data-target=\"associateFip\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.floatingIp), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></select>\n    </section>\n</div>";
  return buffer;
  };
TEMPLATE.stackTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div><img class=\"property-os-image-icon\" src=\"/assets/images/ide/ami/openstack/"
    + escapeExpression(((stack1 = (depth0 && depth0.distro)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\" alt=\"\"/><p class=\"property-os-image-text\">"
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.name), (depth0 && depth0.text), {hash:{},data:data}))
    + "<span class=\"uid\">"
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.id), (depth0 && depth0.value), {hash:{},data:data}))
    + "</span></p></div>";
  return buffer;
  };
TEMPLATE.imageListKey=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div><img class=\"property-os-image-icon property-os-image-value\" src=\"/assets/images/ide/ami/openstack/"
    + escapeExpression(((stack1 = (depth0 && depth0.distro)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\" alt=\"\"/>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>";
  return buffer;
  };
TEMPLATE.imageValue=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<button class=\"btn btn-primary dropdown-list-btn\">Manage KeyPairs</button>";
  };
TEMPLATE.kpButton=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

  buffer += "<select class=\"selection option\" name=\"kpDropdown\" data-button-tpl=\"kpButton\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></select>";
  return buffer;
  };
TEMPLATE.kpSelection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<section class=\"group\">\n    <dl class=\"vertical\">\n        <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.status), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Image</dt><dd>\n            <div class=\"os-server-image-info\">\n                <img class=\"property-os-image-icon\" src=\"/assets/images/ide/ami/openstack/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_os_distro)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\" alt=\"\"/>\n                <p class=\"property-os-image-text\">"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_image_name), {hash:{},data:data}))
    + "<span class=\"uid\">"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_image_id), {hash:{},data:data}))
    + "</span></p>\n            </div>\n        </dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Flavor</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.flavor)),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Availability Zone</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.availability_zone), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Key Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.key_name), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Launched at</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.launched_at), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.appTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"group\">\n    <dl class=\"vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_image_id), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Distro</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_os_distro), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Version</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_os_version), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Arichitecture</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_architecture), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Volume Size</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_vol_size), {hash:{},data:data}))
    + " GB</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Size</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.size), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Created</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.created_at), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.imageTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"group\">\n    <dl class=\"vertical\">\n        <dt>Device Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.device_name), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Status</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.status), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Description</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Size</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.size), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Bootable</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.bootable), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Created at</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.created), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.volumeTemplate=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('workspaces/oseditor/property/ossglist/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n        ";
  return buffer;
  }

  buffer += "<div class=\"option-group-head expand\">\n    Security Group\n</div>\n<div class=\"option-group\">\n    <select class=\"selection option mutil show-input item-list\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.attachedSGList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-button-tpl=\"button\" data-select-tpl=\"sgOption\" data-item-tpl=\"sgItem\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sgList), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </select>\n</div>";
  return buffer;
  };
TEMPLATE.stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"item\">\n    <span class=\"item-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <div class=\"item-remove icon-delete\"></div>\n</div>";
  return buffer;
  };
TEMPLATE.item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"option\">\n    <div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"info\">\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.ruleCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Rules, "
    + escapeExpression(((stack1 = (depth0 && depth0.memberCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Members, "
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.option=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>Create New Security Group...</div>";
  };
TEMPLATE.addButton=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <div class=\"item-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            <span class=\"item-info\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ruleCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Rules, "
    + escapeExpression(((stack1 = (depth0 && depth0.memberCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Members, "
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </li>\n        ";
  return buffer;
  }

  buffer += "<div class=\"option-group-head expand\">\n    Security Group ("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attachedSGList)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")\n</div>\n<div class=\"option-group\">\n    <ul class=\"item-readable-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.attachedSGList), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n</div>";
  return buffer;
  };
TEMPLATE.app=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('workspaces/oseditor/property/ossg/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "<div class=\"os-sg-remove icon-delete bubble-popup\"></div>";
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <section class=\"group\">\n        <dl class=\"vertical\">\n            <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n        </dl>\n        <dl class=\"vertical\">\n            <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n        </dl>\n        <dl class=\"vertical\">\n            <dt>Description</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n        </dl>\n    </section>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"group required\">\n        <label class=\"name\">Name</label>\n        <input data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name\">Description</label>\n        <input data-target=\"description\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    ";
  return buffer;
  }

function program7(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"rule-item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                <select data-target=\"protocol\" class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                    <option value=\"tcp\">TCP</option>\n                    <option value=\"udp\">UDP</option>\n                    <option value=\"icmp\">ICMP</option>\n                    <option value=\"all\">All</option>\n                </select>\n                <input class=\"selection\" data-target=\"port\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "all", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-tip=\"blablablabla...\" ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                <select data-target=\"ip\" class=\"selection option\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sgId), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-valid-handle=\"ipValid\" ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                    <option value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sgId), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n                </select>\n                ";
  stack1 = helpers.unless.call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n            ";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return "disabled";
  }

function program10(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.sgId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program12(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.ip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program14(depth0,data) {
  
  
  return "<div class=\"rule-item-remove icon-delete\"></div>";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"member-item\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n        ";
  return buffer;
  }

  buffer += "<h1>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.defaultSG), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"option-group-head expand\">\n    Security Group\n</div>\n<div class=\"option-group\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsApp), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n<div class=\"option-group-head expand\">Rule (<span class=\"sg-rule-count\"></span>)</div>\n<div class=\"direction-switch btn-group\">\n    <button class=\"icon-unknown t-m-btn ingress active\">Ingress (<span class=\"sg-ingress-count\"></span>)</button>\n    <button class=\"icon-unknown t-m-btn egress\">Egress (<span class=\"sg-egress-count\"></span>)</button>\n</div>\n<div class=\"os-sg-rule-list-container\">\n    <div class=\"rule-container ingress\">\n        <ul class=\"head-list\">\n            <li class=\"head\">Protocol</li>\n            <li class=\"head\">Port/Code</li>\n            <li class=\"head\">Source</li>\n        </ul>\n        <div class=\"rule-list ingress\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ingressRules), {hash:{},inverse:self.noop,fn:self.programWithDepth(7, program7, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n    <div class=\"rule-container egress hide\">\n        <ul class=\"head-list\">\n            <li class=\"head\">Protocol</li>\n            <li class=\"head\">Port/Code</li>\n            <li class=\"head\">Target</li>\n        </ul>\n        <div class=\"rule-list egress\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.egressRules), {hash:{},inverse:self.noop,fn:self.programWithDepth(7, program7, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n</div>\n<div class=\"option-group-head expand\">\n    Member (<span class=\"sg-member-count\"></span>)\n</div>\n<div class=\"option-group\">\n    <ul class=\"os-sg-member-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.memberList), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n</div>";
  return buffer;
  };
TEMPLATE.stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"rule-item\">\n    <select data-target=\"protocol\" class=\"selection option\" value=\"\" >\n        <option value=\"tcp\">TCP</option>\n        <option value=\"udp\">UDP</option>\n        <option value=\"icmp\">ICMP</option>\n        <option value=\"all\">All</option>\n    </select>\n    <input class=\"selection\" data-target=\"port\" value=\"\" />\n    <select data-target=\"ip\" class=\"selection option\" value=\"\" data-valid-handle=\"ipValid\" ></select>\n    <div class=\"rule-item-remove icon-delete hide\"></div>\n</div>";
  };
TEMPLATE.newItem=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"info\">Confirm to remove the Security Group ?</div>\n<ul class=\"operate\">\n    <li class=\"confirm\">Remove</li>\n    <li class=\"cancel\">Cancel</li>\n</ul>";
  };
TEMPLATE.sgRemovePopup=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/oseditor/property/ossg/view',['constant', '../OsPropertyView', './template', 'CloudResources', 'UI.selection', 'UI.bubblepopup'], function(constant, OsPropertyView, template, CloudResources, bindSelection, bubblePopup) {
    return OsPropertyView.extend({
      events: {
        "change [data-target]": "updateAttribute",
        "click .direction-switch .t-m-btn": "switchDirection",
        "click .rule-item-remove": "removeRule",
        "click .os-sg-remove": "removeSG"
      },
      className: 'float-panel-sg',
      initialize: function(options) {
        var that;
        that = this;
        that.sgModel = options.sgModel;
        that.listView = options.listView;
        return this.selectTpl = {
          ipValid: function(value) {
            if (MC.validate('cidr', value)) {
              return true;
            }
            if (Design.instance().component(value)) {
              return true;
            }
            return false;
          },
          portValid: function(value) {
            var rule, _ref;
            if (!(value && value[0])) {
              return false;
            }
            value = value[0];
            rule = that.getRuleValue(this);
            if ((_ref = rule.protocol) === 'tcp' || _ref === 'udp' || _ref === 'all') {
              if (that.getPortRange(value)) {
                return true;
              }
            } else {
              if (that.getICMPRange(value)) {
                return true;
              }
            }
            return false;
          }
        };
      },
      render: function() {
        var currentMode, egressRules, ingressRules, memberList, memberModelList, modeIsApp, modeIsAppEdit, sgRules, that;
        that = this;
        bindSelection(this.$el, this.selectTpl);
        ingressRules = [];
        egressRules = [];
        sgRules = that.sgModel.get('rules');
        _.each(sgRules, function(ruleModel) {
          var ruleStrObj;
          ruleStrObj = that.getRuleStr(ruleModel);
          if (ruleStrObj.direction === 'ingress') {
            return ingressRules.push(ruleStrObj);
          } else if (ruleStrObj.direction === 'egress') {
            return egressRules.push(ruleStrObj);
          }
        });
        memberModelList = this.sgModel.getMemberList();
        memberList = _.map(memberModelList, function(member) {
          return {
            name: member.get('name')
          };
        });
        currentMode = Design.instance().mode();
        if (!this.sgModel.get('appId')) {
          currentMode = 'stack';
        }
        modeIsAppEdit = currentMode === 'appedit';
        modeIsApp = currentMode === 'app';
        this.$el.html(template.stack({
          id: this.sgModel.get('appId'),
          name: this.sgModel.get('name'),
          description: this.sgModel.get('description'),
          defaultSG: this.sgModel.isDefault(),
          ingressRules: ingressRules,
          egressRules: egressRules,
          memberList: memberList,
          modeIsAppEdit: modeIsAppEdit,
          modeIsApp: modeIsApp
        }));
        _.delay(function() {
          return that.$el.find('.rule-item').each(function() {
            return that.initSGList($(this));
          });
        });
        if (!modeIsApp) {
          this.addNewItem(this.$el.find('.rule-list'));
        }
        this.setTitle(this.sgModel.get('name'));
        this.updateCount();
        return this;
      },
      nullStr: 'N/A',
      initSGList: function($ruleItem) {
        var $selectDom, allSGModels, allSGObjs, selectDom;
        allSGModels = Design.modelClassForType(constant.RESTYPE.OSSG).allObjects();
        allSGObjs = _.map(allSGModels, function(sgModel) {
          return {
            text: sgModel.get('name'),
            value: sgModel.id
          };
        });
        $selectDom = $ruleItem.find('select.selection[data-target="ip"]');
        selectDom = $selectDom[0];
        if (selectDom && selectDom.selectize) {
          return selectDom.selectize.addOption(allSGObjs);
        }
      },
      switchDirection: function(event) {
        var $target;
        $target = $(event.currentTarget);
        this.$el.find('.direction-switch .t-m-btn').removeClass('active');
        $target.addClass('active');
        this.$el.find('.rule-container').addClass('hide');
        if ($target.hasClass('ingress')) {
          return this.$el.find('.rule-container.ingress').removeClass('hide');
        } else {
          return this.$el.find('.rule-container.egress').removeClass('hide');
        }
      },
      setTitle: function(title) {
        return this.$('h1').text(title);
      },
      updateAttribute: function(event) {
        var $ruleItem, $target, attr, newRuleId, rule, ruleId, ruleModel, value;
        $target = $(event.currentTarget);
        attr = $target.data('target');
        value = $target.getValue();
        if (attr === 'protocol' || attr === 'port' || attr === 'ip') {
          rule = this.getRuleValue($target);
          if (!rule) {
            return;
          }
          if (attr === 'protocol') {
            this.setDefaultPort(rule, $target);
          }
          $ruleItem = $target.parents('.rule-item');
          ruleId = $ruleItem.data('id');
          ruleModel = this.sgModel.getRule(ruleId);
          if (ruleModel) {
            if (rule) {
              this.sgModel.updateRule(ruleId, rule);
            }
          } else {
            if (rule) {
              newRuleId = this.sgModel.addRule(rule);
            }
            this.addNewItem($ruleItem);
            $ruleItem.data('id', newRuleId);
            this.updateCount();
          }
        }
        if (attr === 'name') {
          this.sgModel.set('name', value);
          this.listView.refreshList();
        }
        if (attr === 'description') {
          this.sgModel.set('description', value);
        }
        return this.refreshDeleteState();
      },
      refreshDeleteState: function() {
        return this.$el.find('.rule-item').each(function() {
          if ($(this).data('id')) {
            return $(this).find('.icon-delete').removeClass('hide');
          } else {
            return $(this).find('.icon-delete').addClass('hide');
          }
        });
      },
      addNewItem: function($lastItem) {
        var $newItem, that;
        that = this;
        if ($lastItem.hasClass('rule-item')) {
          $newItem = $(template.newItem()).insertAfter($lastItem);
        } else {
          $newItem = $(template.newItem()).appendTo($lastItem);
        }
        return _.delay(function() {
          if ($newItem) {
            return that.initSGList($newItem);
          }
        });
      },
      removeRule: function(event) {
        var $ruleItem, $target, ruleId;
        $target = $(event.currentTarget);
        $ruleItem = $target.parents('.rule-item');
        ruleId = $ruleItem.data('id');
        if (ruleId) {
          this.sgModel.removeRule(ruleId);
          $ruleItem.remove();
          return this.updateCount();
        }
      },
      setDefaultPort: function(rule, $target) {
        var $port, $ruleContainer, _ref;
        $ruleContainer = $target.parents('.rule-item');
        $port = $ruleContainer.find('input[data-target="port"]');
        $port.removeAttr('disabled');
        if ((_ref = rule.protocol) === 'tcp' || _ref === 'udp') {
          return $port.val('0-65535');
        } else if (rule.protocol === 'icmp') {
          return $port.val('-1/-1');
        } else if (rule.protocol === null) {
          $port.val(this.nullStr);
          return $port.attr('disabled', 'disabled');
        }
      },
      getPortStr: function(min, max) {
        if (min === null || max === null) {
          return '0-65535';
        }
        if (min === max) {
          return min + '';
        } else {
          return min + '-' + max;
        }
      },
      getICMPStr: function(type, code) {
        if (type === null) {
          type = -1;
        }
        if (code === null) {
          code = -1;
        }
        return type + '/' + code;
      },
      getPortRange: function(portStr) {
        var portRange;
        if (portStr === '0-65535') {
          return [null, null];
        }
        portRange = MC.validate.portRange(portStr);
        if (portRange && MC.validate.portValidRange(portRange)) {
          if (portRange.length === 1) {
            portRange[1] = portRange[0];
          }
          return portRange;
        } else {
          return null;
        }
      },
      getICMPRange: function(icmpStr) {
        var icmpAry, icmpCode, icmpType;
        icmpAry = icmpStr.split('/');
        if (icmpAry && icmpAry.length && icmpAry.length === 2) {
          icmpType = Number(icmpAry[0]);
          icmpCode = Number(icmpAry[1]);
          if (_.isNumber(icmpType) && _.isNumber(icmpCode)) {
            if (icmpType === -1) {
              icmpAry[0] = null;
            }
            if (icmpCode === -1) {
              icmpAry[1] = null;
            }
            return icmpAry;
          }
        }
        return null;
      },
      getRuleValue: function($target) {
        var $ip, $port, $protocol, $ruleContainer, $ruleItem, direction, ip, port, port_range_max, port_range_min, protocol, sg, sgModel;
        $ruleItem = $target.parents('.rule-item');
        $ruleContainer = $ruleItem.parents('.rule-container');
        $protocol = $ruleItem.find('select[data-target="protocol"]');
        $port = $ruleItem.find('input[data-target="port"]');
        $ip = $ruleItem.find('select[data-target="ip"]');
        protocol = $protocol.getValue();
        port = $port.getValue();
        ip = $ip.getValue();
        if (ip === '0.0.0.0/0') {
          ip = null;
        }
        sg = null;
        sgModel = Design.instance().component(ip);
        if (sgModel) {
          sg = sgModel;
          ip = null;
        }
        direction = 'ingress';
        if ($ruleContainer.hasClass('egress')) {
          direction = 'egress';
        }
        if (protocol === 'all') {
          protocol = null;
          port_range_min = null;
          port_range_max = null;
        } else if (protocol === 'icmp') {
          port = this.getICMPRange(port);
          if (port === null) {
            port_range_min = null;
            port_range_max = null;
          } else {
            port_range_min = port[0];
            port_range_max = port[1];
          }
        } else {
          port = this.getPortRange(port);
          if (port === null) {
            port_range_min = null;
            port_range_max = null;
          } else {
            port_range_min = port[0];
            port_range_max = port[1];
          }
        }
        return {
          direction: direction,
          protocol: protocol,
          portMin: port_range_min,
          portMax: port_range_max,
          ip: ip,
          sg: sg
        };
      },
      getRuleStr: function(ruleModel) {
        var direction, ip, port, protocol, rule, ruleData, sgId, sgModel, _ref, _ref1;
        rule = ruleModel.toJSON();
        direction = rule.direction;
        ip = rule.remote_ip_prefix;
        protocol = rule.protocol;
        if (ip === null) {
          ip = '0.0.0.0/0';
        }
        sgModel = ruleModel.get('sg');
        if (sgModel) {
          ip = sgModel.get('name');
          sgId = sgModel.id;
        }
        if ((_ref = rule.protocol) === 'tcp' || _ref === 'udp') {
          port = this.getPortStr(rule.port_range_min, rule.port_range_max);
        } else if ((_ref1 = rule.protocol) === 'icmp') {
          port = this.getICMPStr(rule.port_range_min, rule.port_range_max);
        } else {
          protocol = 'all';
          port = this.nullStr;
        }
        return ruleData = {
          id: ruleModel.get('ruleId'),
          direction: direction,
          protocol: protocol,
          port: port,
          ip: ip,
          sgId: sgId
        };
      },
      removeSG: function(event) {
        var that;
        that = this;
        return bubblePopup($(event.currentTarget), template.sgRemovePopup(), {
          '.confirm': function() {
            that.sgModel.remove();
            that.listView.refreshList();
            return that.listView.hideFloatPanel();
          }
        });
      },
      updateCount: function() {
        var ingressRules, sgRules;
        sgRules = this.sgModel.get('rules');
        ingressRules = _.filter(sgRules, function(ruleModel) {
          return ruleModel.get('direction') === 'ingress';
        });
        this.$el.find('.sg-rule-count').text(sgRules.length);
        this.$el.find('.sg-ingress-count').text(ingressRules.length);
        this.$el.find('.sg-egress-count').text(sgRules.length - ingressRules.length);
        return this.$el.find('.sg-member-count').text(this.sgModel.getMemberList().length);
      }
    }, {
      handleTypes: ['ossg'],
      handleModes: ['stack', 'appedit', 'app']
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/property/ossglist/view',['constant', '../OsPropertyView', './template', 'CloudResources', '../ossg/view', 'UI.selection'], function(constant, OsPropertyView, template, CloudResources, SgView, bindSelection) {
    return OsPropertyView.extend({
      events: {
        "change [data-target]": "updateAttribute",
        "select_dropdown_button_click .item-list": "addItem",
        "click .item-list .item": "editItem",
        "click .item-readable-list .item": "editItem",
        "select_item_add .item-list": "attachItem",
        "select_item_remove .item-list": "unAttachItem",
        "click .item-list .item .item-remove": "unAttachItemClick",
        "mousedown .item-list .item .item-remove": "unAttachItemMousedown"
      },
      initialize: function(options) {
        var that;
        that = this;
        this.targetModel = options.targetModel;
        this.panel = options.panel;
        return this.selectTpl = {
          button: function() {
            return template.addButton();
          },
          sgItem: function(item) {
            return template.item({
              name: item.text
            });
          },
          sgOption: function(data) {
            var sgModel;
            sgModel = Design.instance().component(data.value);
            return template.option({
              name: data.text,
              ruleCount: sgModel.get('rules').length,
              memberCount: sgModel.getMemberList().length,
              description: sgModel.get('description')
            });
          }
        };
      },
      getAttachSGForApp: function() {
        var attachedSGModel, region, targetAppModel, _ref;
        attachedSGModel = [];
        region = Design.instance().region();
        targetAppModel = (_ref = CloudResources(this.targetModel.type, region)) != null ? _ref.get(this.targetModel.get('appId')) : void 0;
        if (targetAppModel && targetAppModel.security_groups) {
          _.each(targetAppModel.security_groups, function(sgId) {
            var sgAppModel, _ref1;
            sgAppModel = (_ref1 = CloudResources(constant.RESTYPE.OSSG, region)) != null ? _ref1.get(sgId) : void 0;
            if (sgAppModel) {
              attachedSGModel.push(sgAppModel);
            }
            return null;
          });
        }
        return attachedSGModel;
      },
      render: function() {
        bindSelection(this.$el, this.selectTpl);
        this.refreshList();
        return this;
      },
      refreshList: function() {
        var OSSGModel, allSGModels, attachedSGList, attachedSGModels, currentMode, sgList;
        currentMode = Design.instance().mode();
        if (!this.targetModel.get('appId')) {
          currentMode = 'stack';
        }
        if (currentMode === 'stack' || currentMode === 'appedit') {
          OSSGModel = Design.modelClassForType(constant.RESTYPE.OSSG);
          allSGModels = OSSGModel.allObjects();
          sgList = [];
          _.each(allSGModels, function(sgModel) {
            var sgName, sgUID;
            sgName = sgModel.get('name');
            sgUID = sgModel.get('id');
            return sgList.push({
              name: sgName,
              uid: sgUID
            });
          });
          attachedSGModels = this.targetModel.connectionTargets("OsSgAsso");
          attachedSGList = [];
          _.each(attachedSGModels, function(sgModel) {
            var sgUID;
            sgUID = sgModel.get('id');
            return attachedSGList.push(sgUID);
          });
          this.$el.html(template.stack({
            sgList: sgList,
            attachedSGList: attachedSGList.join(',')
          }));
          return this.refreshRemoveState();
        } else {
          attachedSGModels = this.targetModel.connectionTargets("OsSgAsso");
          attachedSGList = [];
          _.each(attachedSGModels, function(sgModel) {
            return attachedSGList.push({
              id: sgModel.id,
              name: sgModel.get('name'),
              ruleCount: sgModel.get('rules').length,
              memberCount: sgModel.getMemberList().length,
              description: sgModel.get('description')
            });
          });
          return this.$el.html(template.app({
            attachedSGList: attachedSGList
          }));
        }
      },
      refreshRemoveState: function() {
        var attachedSGModels;
        attachedSGModels = this.targetModel.connectionTargets("OsSgAsso");
        if (attachedSGModels.length <= 1) {
          return this.$el.find('.item-list .item-remove').addClass('hide');
        } else {
          return this.$el.find('.item-list .item-remove').removeClass('hide');
        }
      },
      getSelectItemModel: function($sgItem) {
        var sgId, sgModel;
        sgId = $sgItem.data('value') || $sgItem.data('id');
        sgModel = Design.instance().component(sgId);
        return sgModel;
      },
      updateAttribute: function(event) {
        var $target, attr, value;
        $target = $(event.currentTarget);
        attr = $target.data('target');
        return value = $target.getValue();
      },
      addItem: function(event) {
        var $newItem, OSSGModel, oSSGModel, sgUID;
        OSSGModel = Design.modelClassForType(constant.RESTYPE.OSSG);
        oSSGModel = new OSSGModel({});
        sgUID = oSSGModel.get('id');
        this.attachItem(null, sgUID);
        this.refreshList();
        $newItem = this.$el.find('.item-list .item[data-value="' + sgUID + '"]');
        $newItem.click();
        return false;
      },
      editItem: function(event) {
        var $target, sgModel, sgView;
        $target = $(event.currentTarget);
        sgModel = this.getSelectItemModel($target);
        sgView = new SgView({
          sgModel: sgModel,
          listView: this
        });
        this.showFloatPanel(sgView.render().el);
        return false;
      },
      attachItem: function(event, sgUID) {
        var sgModel;
        sgModel = Design.instance().component(sgUID);
        sgModel.attachSG(this.targetModel);
        return this.refreshRemoveState();
      },
      unAttachItem: function(event, sgUID) {
        var sgModel;
        sgModel = Design.instance().component(sgUID);
        sgModel.unAttachSG(this.targetModel);
        return this.refreshRemoveState();
      },
      unAttachItemClick: function(event) {
        var $sgItem, $target, sgModel;
        $target = $(event.currentTarget);
        $sgItem = $target.parents('.item');
        sgModel = this.getSelectItemModel($sgItem);
        sgModel.unAttachSG(this.targetModel);
        this.refreshList();
        return false;
      },
      unAttachItemMousedown: function() {
        return false;
      }
    }, {
      handleTypes: ['ossglist'],
      handleModes: ['stack', 'appedit', 'app']
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/property/osserver/view',['constant', '../OsPropertyView', './template', 'CloudResources', 'underscore', 'OsKp', '../ossglist/view'], function(constant, OsPropertyView, template, CloudResources, _, OsKp, SgListView) {
    return OsPropertyView.extend({
      events: {
        "change #property-os-server-credential": "onChangeCredential",
        "change #property-os-server-name": "updateServerAttr",
        "change #property-os-server-image": "updateServerAttr",
        "change #property-os-server-CPU": "updateServerAttr",
        "change #property-os-server-RAM": "updateServerAttr",
        "change #property-os-server-keypair": "updateServerAttr",
        "change #property-os-server-adminPass": "updateServerAttr",
        "change #property-os-server-userdata": "updateServerAttr",
        'change #property-os-server-fip': "updateServerAttr",
        'change #property-os-server-aip': "updateServerAttr"
      },
      initialize: function() {
        return this.sgListView = this.reg(new SgListView({
          targetModel: this.model.embedPort()
        }));
      },
      render: function() {
        var json, kpDropdown;
        json = this.model.toJSON();
        this.flavorList = CloudResources(constant.RESTYPE.OSFLAVOR, Design.instance().region());
        json.imageList = CloudResources(constant.RESTYPE.OSIMAGE, Design.instance().region()).toJSON();
        json.floatingIp = !!this.model.embedPort().getFloatingIp();
        json.fixedIp = this.model.embedPort().get('ip');
        json.isAppEdit = this.modeIsAppEdit();
        this.$el.html(template.stackTemplate(json));
        kpDropdown = new OsKp(this.model, template.kpSelection({
          isAppEdit: this.modeIsAppEdit()
        }));
        this.$el.find("#property-os-server-keypair").html(kpDropdown.render().$el);
        this.bindSelectizeEvent();
        this.$el.append(this.sgListView.render().el);
        return this;
      },
      bindSelectizeEvent: function() {
        var avaliableRams, currentFlavor, flavorGroup, that;
        that = this;
        flavorGroup = _.groupBy(that.flavorList.toJSON(), 'vcpus');
        currentFlavor = that.flavorList.get(that.model.get('flavorId'));
        avaliableRams = _.map(_.pluck(flavorGroup[currentFlavor.get('vcpus')], 'ram'), function(e) {
          return {
            text: e / 1024 + " G",
            value: e
          };
        });
        this.$el.find("#property-os-server-image").on('select_initialize', function() {
          return this.selectize.setValue(that.model.get('imageId'));
        });
        this.$el.find("#property-os-server-credential").on('select_initialize', function() {
          return that.checkWindowsDistro(that.model.get("imageId"));
        });
        this.$el.find('#property-os-server-RAM').on('select_initialize', function() {
          this.selectize.addOption(avaliableRams);
          return this.selectize.setValue(currentFlavor.get('ram'));
        });
        return this.$el.find('#property-os-server-CPU').on('select_initialize', function() {
          var avaliableCPUs;
          avaliableCPUs = _.map(flavorGroup, function(e, index) {
            return {
              text: index + " Core",
              value: index
            };
          });
          this.selectize.addOption(avaliableCPUs);
          return this.selectize.setValue(currentFlavor.get('vcpus'));
        });
      },
      onChangeCredential: function(event, value) {
        var result;
        result = event ? $(event.currentTarget).getValue() : value;
        this.model.set('credential', result);
        if (result === "keypair") {
          this.$el.find("#property-os-server-keypair").parent().show();
          return this.$el.find('#property-os-server-adminPass').parent().hide();
        } else {
          this.$el.find("#property-os-server-keypair").parent().hide();
          return this.$el.find('#property-os-server-adminPass').parent().show();
        }
      },
      checkWindowsDistro: function(imageId) {
        var $serverCredential, distro, distroIsWindows, image, _ref;
        image = CloudResources(constant.RESTYPE.OSIMAGE, Design.instance().region()).get(imageId);
        distro = image.get("os_distro");
        distroIsWindows = distro === 'windows';
        $serverCredential = this.$el.find("#property-os-server-credential");
        $serverCredential.parents(".group").toggle(!distroIsWindows);
        if (distroIsWindows) {
          this.model.set('credential', 'adminPass');
          if ((_ref = $serverCredential[0].selectize) != null) {
            _ref.setValue('adminPass');
          }
          return this.onChangeCredential(null, 'adminPass');
        }
      },
      updateServerAttr: function(event) {
        var attr, availableRams, availableRamsValue, currentRamFlavor, flavorGroup, oldRamFlavor, ramSelectize, ramValue, selectize, serverPort, target, targetFlavor;
        target = $(event.currentTarget);
        attr = target.data('target');
        selectize = target[0].selectize;
        if (attr === 'imageId') {
          this.model.setImage(target.val());
          this.checkWindowsDistro(target.val());
        }
        if (attr === 'name') {
          this.setTitle(target.val());
        }
        if (attr === 'CPU') {
          flavorGroup = _.groupBy(this.flavorList.models, function(e) {
            return e.get('vcpus');
          });
          availableRams = flavorGroup[target.val()];
          if (availableRams != null ? availableRams.length : void 0) {
            ramSelectize = this.$el.find("#property-os-server-RAM")[0].selectize;
            if (!ramSelectize) {
              return false;
            }
            ramValue = ramSelectize.getValue();
            availableRamsValue = _.map(_.pluck(_.map(availableRams, function(ram) {
              return ram.toJSON();
            }), 'ram'), function(e) {
              return {
                text: e / 1024 + " G",
                value: e
              };
            });
            currentRamFlavor = _.find(availableRams, function(e) {
              return e.get('ram') === +ramValue;
            });
            if (!currentRamFlavor) {
              ramValue = _.min(_.pluck(availableRamsValue, 'value'));
              currentRamFlavor = _.find(availableRams, function(e) {
                return e.get('ram') === +ramValue;
              });
            }
            this.model.set("flavorId", currentRamFlavor.get('id'));
            this.updateRamOptions(availableRamsValue, ramValue);
          } else {
            return false;
          }
          return false;
        }
        if (attr === 'RAM') {
          oldRamFlavor = this.flavorList.get(this.model.get('flavorId'));
          flavorGroup = _.groupBy(this.flavorList.models, function(e) {
            return e.get('vcpus');
          });
          availableRams = flavorGroup[oldRamFlavor.get('vcpus')];
          targetFlavor = _.find(availableRams, function(e) {
            return e.get('ram') === +selectize.getValue();
          });
          this.model.set('flavorId', targetFlavor.get('id'));
          return false;
        }
        if (attr === "fixedIp") {
          serverPort = this.model.embedPort();
          serverPort.setIp(target.val());
          return false;
        }
        if (attr === 'associateFip') {
          serverPort = this.model.embedPort();
          serverPort.setFloatingIp(target.getValue());
          return false;
        }
        if (attr) {
          return this.model.set(attr, target.val());
        }
      },
      updateRamOptions: function(availableRams, currentRam) {
        var ramSelection;
        ramSelection = this.$el.find("#property-os-server-RAM")[0].selectize;
        ramSelection.clearOptions();
        return ramSelection.load(function(callback) {
          callback(availableRams);
          ramSelection.refreshOptions(false);
          return ramSelection.setValue(currentRam);
        });
      },
      selectTpl: {
        imageSelect: function(item) {
          var imageList, imageObj, _ref;
          imageList = CloudResources(constant.RESTYPE.OSIMAGE, Design.instance().region());
          imageObj = (_ref = imageList.get(item.value)) != null ? _ref.toJSON() : void 0;
          if (!imageObj) {
            item.distro = "ami-unknown";
            return template.imageListKey(item);
          }
          imageObj.distro = imageObj.os_type + "." + imageObj.architecture;
          return template.imageListKey(imageObj);
        },
        imageValue: function(item) {
          var imageList, imageObj, _ref;
          imageList = CloudResources(constant.RESTYPE.OSIMAGE, Design.instance().region());
          imageObj = (_ref = imageList.get(item.value)) != null ? _ref.toJSON() : void 0;
          if (!imageObj) {
            item.distro = "ami-unknown";
            item.text = item.text || "Unknow";
            return template.imageValue(item);
          }
          imageObj.distro = imageObj.os_type + "." + imageObj.architecture;
          return template.imageValue(imageObj);
        },
        kpButton: function() {
          return template.kpButton();
        }
      }
    }, {
      handleTypes: [constant.RESTYPE.OSSERVER],
      handleModes: ['stack', 'appedit']
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/property/osserver/appView',['constant', '../OsPropertyView', './template', 'CloudResources', 'underscore', 'OsKp', '../ossglist/view'], function(constant, OsPropertyView, template, CloudResources, _, OsKp, SgListView) {
    return OsPropertyView.extend({
      events: {
        'click .os-server-image-info': 'openImageInfoPanel'
      },
      initialize: function() {
        return this.sgListView = new SgListView({
          panel: this.panel,
          targetModel: this.model.embedPort()
        });
      },
      render: function() {
        this.$el.html(template.appTemplate(this.getRenderData()));
        this.$el.append(this.sgListView.render().el);
        return this;
      },
      openImageInfoPanel: function() {
        var serverData;
        serverData = this.getRenderData();
        return this.showFloatPanel(template.imageTemplate(serverData.system_metadata));
      }
    }, {
      handleTypes: [constant.RESTYPE.OSSERVER],
      handleModes: ['app']
    });
  });

}).call(this);

define('workspaces/oseditor/property/osvol/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"group\">\n            <label class=\"name\">Snapshot ID</label>\n            <select id=\"property-os-volume-snapshot\" data-target=\"snapshot\" class=\"selection option\" data-select-tpl=\"snapshotOption\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.mode), "appedit", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></select>\n        </section>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "true";
  }

function program7(depth0,data) {
  
  
  return "false";
  }

  buffer += "<div class=\"option-group-head expand\">\n    Volume Details\n</div>\n<div class=\"option-group\">\n    <section class=\"group required\">\n        <label class=\"name\">Volume Name</label>\n        <input data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name\">Volume Size</label>\n        <input data-target=\"size\" class=\"selection string\" id=\"property-os-volume-size\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.mode), "appedit", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name\">Mount Point</label>\n        <input data-target=\"mountPoint\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.mountPoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.mode), "appedit", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    </section>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshot), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <section class=\"group\">\n        <label class=\"name\">Description</label>\n        <input data-target=\"description\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group\">\n        <label class=\"name\">Bootable</label>\n        <select class=\"selection bool\" data-target=\"bootable\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.bootable), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.mode), "appedit", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></select>\n    </section>\n</div>";
  return buffer;
  };
TEMPLATE.stackTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>\n    <div class=\"manager-content-main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"manager-content-sub\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "G | "
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</div>";
  return buffer;
  };
TEMPLATE.snapshotOption=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <dl class=\"vertical\">\n            <dt>Snapshot ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.snapshot_id), {hash:{},data:data}))
    + "</dd>\n        </dl>\n    ";
  return buffer;
  }

  buffer += "<section class=\"group\">\n    <dl class=\"vertical\">\n        <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Status</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.status), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Size</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.size), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshot_id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <dl class=\"vertical\">\n        <dt>Description</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Bootable</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.bootable), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Created at</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.created_at), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.appTemplate=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/oseditor/property/osvol/view',['constant', '../OsPropertyView', './template', 'CloudResources'], function(constant, OsPropertyView, template, CloudResources) {
    return OsPropertyView.extend({
      events: {
        "change [data-target]": "updateAttribute"
      },
      render: function() {
        var json, mode;
        mode = Design.instance().mode();
        json = this.model.toJSON();
        json.mode = mode;
        this.$el.html(template.stackTemplate(json));
        if (this.model.get('snapshot')) {
          this.bindSelectizeEvent();
        }
        return this;
      },
      bindSelectizeEvent: function() {
        var sizeInputElement, snapshotOptions, snapshotSelectElem, that;
        that = this;
        this.snapshots || (this.snapshots = CloudResources(constant.RESTYPE.OSSNAP, Design.instance().region()));
        snapshotOptions = _.map(this.snapshots.models, function(e) {
          var text, value;
          text = e.get('name');
          value = e.get('id');
          return {
            text: text,
            value: value
          };
        });
        snapshotSelectElem = this.$el.find("#property-os-volume-snapshot");
        snapshotSelectElem.on('select_initialize', function() {
          this.selectize.addOption(snapshotOptions);
          return this.selectize.setValue(that.model.get('snapshot'));
        });
        sizeInputElement = this.$el.find("#property-os-volume-size");
        return snapshotSelectElem.on('change', function() {
          return _.defer(function() {
            return sizeInputElement.val(that.model.get('size'));
          });
        });
      },
      updateAttribute: function(event) {
        var targetDom, volumeSize;
        OsPropertyView.prototype.updateAttribute.apply(this, arguments);
        targetDom = event.currentTarget || event.target;
        if ($(targetDom).data('target') === "snapshot") {
          volumeSize = this.snapshots.get($(targetDom).val()).get('size');
          return this.model.set('size', volumeSize);
        }
      },
      selectTpl: {
        snapshotOption: function(item) {
          var snapModel, snapshots;
          snapshots = CloudResources(constant.RESTYPE.OSSNAP, Design.instance().region());
          snapModel = snapshots.get(item.value);
          return template.snapshotOption(snapModel != null ? snapModel.toJSON() : void 0);
        }
      }
    }, {
      handleTypes: [constant.RESTYPE.OSVOL],
      handleModes: ['stack', 'appedit']
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/property/osvol/appView',['constant', '../OsPropertyView', './template', 'CloudResources'], function(constant, OsPropertyView, template, CloudResources) {
    return OsPropertyView.extend({
      render: function() {
        this.$el.html(template.appTemplate(this.getRenderData()));
        return this;
      }
    }, {
      handleTypes: [constant.RESTYPE.OSVOL],
      handleModes: ['app']
    });
  });

}).call(this);

define('workspaces/oseditor/property/oslistener-asso/template',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"os-property-message\">\n    This is a connection of "
    + escapeExpression(((stack1 = (depth0 && depth0.listenerName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " and "
    + escapeExpression(((stack1 = (depth0 && depth0.poolName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", working as load balancer.\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/oseditor/property/oslistener-asso/view',['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
    return OsPropertyView.extend({
      render: function() {
        var listenerName, poolName;
        poolName = this.model.getTarget(constant.RESTYPE.OSPOOL).get('name');
        listenerName = this.model.getTarget(constant.RESTYPE.OSLISTENER).get('name');
        this.$el.html(template({
          poolName: poolName,
          listenerName: listenerName
        }));
        return this;
      }
    }, {
      handleTypes: ['OsListenerAsso'],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);

define('workspaces/oseditor/property/ospool-membership/template',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"os-property-message\">\n    This is a connection of "
    + escapeExpression(((stack1 = (depth0 && depth0.poolName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " and "
    + escapeExpression(((stack1 = (depth0 && depth0.memberName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", registering "
    + escapeExpression(((stack1 = (depth0 && depth0.memberName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " as member of load balancer.\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/oseditor/property/ospool-membership/view',['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
    return OsPropertyView.extend({
      render: function() {
        var memberName, poolName;
        poolName = this.model.getTarget(constant.RESTYPE.OSPOOL).get('name');
        memberName = this.model.getOtherTarget(constant.RESTYPE.OSPOOL).get('name');
        this.$el.html(template({
          poolName: poolName,
          memberName: memberName
        }));
        return this;
      }
    }, {
      handleTypes: ['OsPoolMembership'],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);

define('workspaces/oseditor/property/osport/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<section class=\"group\">\n    <dl class=\"vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Mac Address</dt><dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.mac_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n</section>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"group required\">\n        <label class=\"name\">Name</label>\n        <input data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "true";
  }

function program7(depth0,data) {
  
  
  return "false";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"option-group-head expand\">\n    Port Details\n</div>\n<div class=\"option-group\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isPurePort), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <section class=\"group required\">\n        <label class=\"name\">Fixed IP</label>\n        <input data-target=\"ip\" class=\"selection string ipv4\" data-tip=\"blablablabla...\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name\">Associate Floating IP</label>\n        <select data-target=\"float_ip\" class=\"selection bool\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasFloatIP), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ></select>\n    </section>\n</div>";
  return buffer;
  };
TEMPLATE.stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "Attach the port to a server";
  };
TEMPLATE.unattached=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<section class=\"group\">\n    <dl class=\"vertical\">\n        <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.status), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Mac Address</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.mac_address), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Fixed IP</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.fixed_ips)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.ip_address), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Floating IP</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.float_ip), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.app=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/oseditor/property/osport/view',['constant', '../OsPropertyView', './template', 'CloudResources', '../ossglist/view'], function(constant, OsPropertyView, template, CloudResources, SgListView) {
    return OsPropertyView.extend({
      events: {
        "change [data-target]": "updateAttribute"
      },
      initialize: function() {
        return this.sgListView = this.reg(new SgListView({
          targetModel: this.model
        }));
      },
      render: function() {
        var extendData, floatIPData, floatIPModel, float_ip, value, _ref;
        if ((_ref = this.mode()) === 'stack' || _ref === 'appedit') {
          if (this.model.isAttached()) {
            value = _.extend({
              hasFloatIP: this.model.getFloatingIp(),
              isPurePort: this.model.type === constant.RESTYPE.OSPORT
            }, this.model.toJSON());
            if (this.mode() === 'appedit') {
              value = _.extend(value, this.getRenderData());
            }
            this.$el.html(template.stack(value));
          } else {
            this.$el.html(template.unattached(value));
          }
        } else {
          extendData = {};
          floatIPModel = this.model.getFloatingIp();
          if (floatIPModel) {
            floatIPData = CloudResources(constant.RESTYPE.OSFIP, Design.instance().region()).get(floatIPModel.get('appId'));
            if (floatIPData) {
              float_ip = floatIPData.get('floating_ip_address');
            }
            extendData.float_ip = float_ip;
          }
          this.$el.html(template.app(_.extend(this.getRenderData(), extendData)));
        }
        if (this.model.isAttached()) {
          this.$el.append(this.sgListView.render().el);
        }
        return this;
      },
      updateAttribute: function(event) {
        var $target, attr, value;
        $target = $(event.currentTarget);
        attr = $target.data('target');
        value = $target.getValue();
        if (attr === 'float_ip') {
          this.model.setFloatingIp(value);
        } else {
          this.model.set(attr, value);
        }
        if (attr === 'name') {
          return this.setTitle(value);
        }
      }
    }, {
      handleTypes: [constant.RESTYPE.OSPORT],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);

define('workspaces/oseditor/property/oslistener/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dl><dt>ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n    <dl><dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n    <dl><dt>Subnet ID</dt><dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.subnet_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "disabled";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"option-group-head expand\">\n    Listener Details\n</div>\n<div class=\"option-group\" data-model=\"listener\">\n    <section class=\"group required\">\n        <label class=\"name\">Name</label>\n        <input data-id=\"listener-name\" data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n\n    <section class=\"group required\">\n        <label class=\"name\">Connection Limit</label>\n        <input data-id=\"listener-limit\" data-target=\"limit\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.limit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n\n    <section class=\"group required\">\n        <label class=\"name\">Protocol</label>\n        <select class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"protocol\" data-id=\"listener-protocol\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <option value='HTTP'>HTTP</option>\n            <option value='HTTPS'>HTTPS</option>\n            <option value='TCP'>TCP</option>\n        </select>\n    </section>\n\n    <section class=\"group required\">\n        <label class=\"name\">Protocol Port</label>\n        <input data-id=\"listener-port\" data-target=\"port\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    </section>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/oseditor/property/oslistener/view',['constant', '../OsPropertyView', '../osport/view', './template/stack'], function(constant, OsPropertyView, portView, template) {
    return OsPropertyView.extend({
      events: {
        'change [data-target]': 'updateAttribute'
      },
      render: function() {
        this.$el.html(template(this.getRenderData()));
        this.$el.append(this.reg(new portView({
          model: this.model
        })).render().el);
        return this;
      },
      getModelForUpdateAttr: function(e) {
        var $target, dataModel;
        $target = $(e.currentTarget);
        dataModel = $target.closest('[data-model]').data('model');
        if (dataModel === 'listener') {
          return this.model;
        } else {
          return null;
        }
      }
    }, {
      handleTypes: [constant.RESTYPE.OSLISTENER],
      handleModes: ['stack', 'appedit']
    });
  });

}).call(this);

define('workspaces/oseditor/property/oslistener/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"option-group-head expand\">\n    Listener Details\n</div>\n<div class=\"option-group\">\n    <dl>\n        <dt>Name</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Subnet ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.subnet_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Address</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Connection Limit</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.connection_limit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Protocol</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Protocol Port</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol_port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Pool ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.pool_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n</div>\n\n<div class=\"option-group-head expand\">\n    Port Details\n</div>\n<div class=\"option-group\">\n\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/oseditor/property/oslistener/appView',['constant', '../OsPropertyView', '../osport/view', './template/app', 'CloudResources'], function(constant, OsPropertyView, portView, template, CloudResources) {
    return OsPropertyView.extend({
      render: function() {
        this.$el.html(template(this.getRenderData()));
        this.$el.append(this.reg(new portView({
          model: this.model,
          appModel: this.genModelForPort()
        })).render().el);
        return this;
      },
      genModelForPort: function() {
        var portId, region;
        region = Design.instance().region();
        portId = this.appModel.get('port_id');
        return CloudResources(constant.RESTYPE.OSPORT, region).get(portId);
      }
    }, {
      handleTypes: [constant.RESTYPE.OSLISTENER],
      handleModes: ['app']
    });
  });

}).call(this);

define('workspaces/oseditor/property/ospool/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<dl>ID<dt></dt><dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n<dl>Status<dt></dt><dd class=\"os-status "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n<dl>Subnet ID<dt></dt><dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.subnet_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <header>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.osport)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</header>\n    <section class=\"group required\">\n        <label class=\"name\">Weight</label>\n        <input data-id=\"mem-weight\" data-index=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"weight\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.weight)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n\n    <section class=\"group required\">\n        <label class=\"name\">Protocol Port</label>\n        <input data-id=\"mem-port\" data-target=\"port\" data-index=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"option-group-head expand\">\n    Pool\n</div>\n<div class=\"option-group pool-details\">\n    <section class=\"group required\">\n        <label class=\"name\">Pool</label>\n        <input data-id=\"pool-name\" data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n\n    <section class=\"group required\">\n        <label class=\"name\">Protocol</label>\n        <select class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"protocol\" data-id=\"pool-protocol\">\n            <option value='HTTP'>HTTP</option>\n            <option value='HTTPS'>HTTPS</option>\n            <option value='TCP'>TCP</option>\n        </select>\n    </section>\n\n    <section class=\"group required\">\n        <label class=\"name\">Load Balancing Method</label>\n        <select class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.method)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"method\" data-id=\"listener-method\">\n            <option value='Round_Robin'>Round Robin</option>\n            <option value='Least_Connections'>Least Connections</option>\n            <option value='Source_IP'>Source IP</option>\n        </select>\n    </section>\n</div>\n\n<div class=\"option-group-head expand\">\n    Member("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.mems)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")\n</div>\n<div class=\"option-group\" data-model=\"mem\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.mems), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('workspaces/oseditor/property/oshmlist/stack',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "disabled";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n            ";
  return buffer;
  }

  buffer += "<div class=\"option-group-head expand\">\n    Health Monitor("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.list)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")\n</div>\n<div class=\"option-group\">\n    <section class=\"group\">\n        <select class=\"selection option mutil item-list\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.activeList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-button-tpl=\"button\" data-item-tpl=\"getItem\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.list), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n    </section>\n</div>";
  return buffer;
  };
TEMPLATE.stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"item hm-item\">\n    <div class=\"item-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"item-info\">"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " | "
    + escapeExpression(((stack1 = (depth0 && depth0.urlPath)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n\n    <div class=\"item-remove icon-delete\"></div>\n</div>";
  return buffer;
  };
TEMPLATE.item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>Create New Health Monitor...</div>";
  };
TEMPLATE.addButton=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('workspaces/oseditor/property/oshmlist/app',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item hm-item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <div class=\"item-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"item-info\">"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " | "
    + escapeExpression(((stack1 = (depth0 && depth0.url_path)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </li>\n    ";
  return buffer;
  }

  buffer += "<div class=\"option-group-head expand\">\n    Health Monitor("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.list)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")\n</div>\n<div class=\"option-group\">\n    <ul class=\"item-readable-list\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n</div>";
  return buffer;
  };
TEMPLATE.stack=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('workspaces/oseditor/property/oshm/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "disabled";
  }

  buffer += "<h1>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n<section class=\"group required\">\n    <label class=\"name\">Name</label>\n    <input data-id=\"hm-name\" data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n<section class=\"group required\">\n    <label class=\"name\">Type</label>\n    <select class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"type\" data-id=\"hm-method\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <option value='PING'>PING</option>\n        <option value='HTTP'>HTTP</option>\n        <option value='HTTPS'>HTTPS</option>\n        <option value='TCP'>TCP</option>\n    </select>\n</section>\n\n<section class=\"group required\">\n    <label class=\"name\">Delay</label>\n    <input data-id=\"hm-delay\" data-target=\"delay\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.delay)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group required\">\n    <label class=\"name\">Timeout</label>\n    <input data-id=\"hm-timeout\" data-target=\"delay\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.timeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group required\">\n    <label class=\"name\">Max Retries</label>\n    <input data-id=\"hm-maxretries\" data-target=\"maxRetries\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.maxRetries)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group required\">\n    <label class=\"name\">URL Path</label>\n    <input data-id=\"hm-urlpath\" data-target=\"urlPath\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.urlPath)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group required\">\n    <label class=\"name\">Expected Codes</label>\n    <input data-id=\"hm-expectedcodes\" data-target=\"expectedCodes\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.expectedCodes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('workspaces/oseditor/property/oshm/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n<section class=\"group\">\n    <dl><dt>Name</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n    <dl><dt>ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n    <dl><dt>Type</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n    <dl><dt>Delay</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.delay)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n    <dl><dt>Timeout</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.timeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n    <dl><dt>Max Retries</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.max_retries)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n    <dl><dt>Expected Codes</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.expected_codes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/oseditor/property/oshm/view',['constant', '../OsPropertyView', './stack', './app', 'CloudResources', 'UI.selection'], function(constant, OsPropertyView, TplStack, TplApp, CloudResources, bindSelection) {
    return OsPropertyView.extend({
      events: {
        "change [data-target]": "updateAttribute"
      },
      initialize: function(options) {
        this.isApp = options.isApp;
        if (this.isApp) {
          return this.modelData = options.modelData;
        }
      },
      setTitle: function(title) {
        return this.$('h1').text(title);
      },
      render: function() {
        if (this.isApp) {
          this.$el.html(TplApp(this.modelData));
        } else {
          bindSelection(this.$el, this.selectTpl);
          this.$el.html(TplStack(this.getRenderData()));
        }
        return this;
      }
    }, {
      handleTypes: [constant.RESTYPE.OSHM],
      handleModes: ['stack', 'appedit']
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/property/oshmlist/view',['constant', '../OsPropertyView', './stack', './app', 'CloudResources', '../oshm/view', 'UI.selection'], function(constant, OsPropertyView, TplStack, TplApp, CloudResources, HmView, bindSelection) {
    return OsPropertyView.extend({
      events: {
        "change [data-target]": "updateAttribute",
        "select_dropdown_button_click .item-list": "addItem",
        "click .item-list .item": "editItem",
        "click .item-readable-list .item": "viewItem",
        "click .item-list .item .item-remove": "removeItem"
      },
      initialize: function(options) {
        var that;
        this.targetModel = options.targetModel;
        this.isApp = options.isApp;
        if (this.isApp) {
          this.appModelList = this.targetModel;
          delete this.targetModel;
        }
        that = this;
        return this.selectTpl = {
          button: function() {
            return that.getTpl().addButton();
          },
          getItem: function(item) {
            return that.getTpl().item(that.getItemData(item));
          }
        };
      },
      getModelForMode: function() {
        return this.targetModel;
      },
      getItemData: function(item) {
        return Design.instance().component(item.value).toJSON();
      },
      getAppData: function() {
        var HmClass;
        HmClass = Design.modelClassForType(constant.RESTYPE.OSHM);
        return _.map(this.appModelList, function(model) {
          var json, oshm;
          json = model.toJSON();
          oshm = HmClass.find(function(hm) {
            return hm.get('appId') === json.id;
          });
          json.name = oshm != null ? oshm.get('name') : void 0;
          return json;
        });
      },
      getSingleAppData: function(id) {
        return _.findWhere(this.getAppData(), {
          id: id
        });
      },
      getTpl: function() {
        if (this.isApp) {
          return TplApp;
        } else {
          return TplStack;
        }
      },
      render: function() {
        bindSelection(this.$el, this.selectTpl);
        if (this.isApp) {
          this.renderApp();
        } else {
          this.refreshList();
        }
        return this;
      },
      refreshList: function() {
        return this.$el.html(this.getTpl().stack({
          activeList: this.targetModel.get("healthMonitors").map(function(hm) {
            return hm.id;
          }).join(','),
          list: this.targetModel.get("healthMonitors").map(function(hm) {
            return hm.toJSON();
          })
        }));
      },
      renderApp: function() {
        return this.$el.html(this.getTpl().stack({
          list: this.getAppData()
        }));
      },
      getSelectItemModel: function($item) {
        var uid;
        uid = $item.data('value');
        return Design.instance().component(uid);
      },
      updateAttribute: function(event) {
        var $target, attr, value;
        $target = $(event.currentTarget);
        attr = $target.data('target');
        return value = $target.getValue();
      },
      addItem: function(event) {
        this.targetModel.addNewHm();
        return this.refreshList();
      },
      editItem: function(event) {
        var $target, model, view;
        $target = $(event.currentTarget);
        model = this.getSelectItemModel($target);
        view = this.reg(new HmView({
          model: model,
          isApp: this.isApp
        }));
        this.listenTo(model, 'change', this.refreshList);
        return this.showFloatPanel(view.render().el);
      },
      viewItem: function(event) {
        var $target, id, modelData, view;
        $target = $(event.currentTarget);
        $('.item-readable-list .item').removeClass('focus');
        $target.addClass('focus');
        id = $target.data('id');
        modelData = this.getSingleAppData(id);
        view = this.reg(new HmView({
          modelData: modelData,
          isApp: this.isApp
        }));
        return this.showFloatPanel(view.render().el);
      },
      removeItem: function(event) {
        var $target, id;
        $target = $(event.currentTarget);
        id = $target.closest('.item').data('value');
        this.targetModel.removeHm(id);
        this.refreshList();
        this.hideFloatPanel();
        return false;
      }
    }, {
      handleTypes: ['ossglist'],
      handleModes: ['stack', 'appedit']
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/property/ospool/view',['constant', '../OsPropertyView', './template/stack', '../oshmlist/view'], function(constant, OsPropertyView, template, HmlistView) {
    return OsPropertyView.extend({
      events: {
        'change [data-target]': 'updateAttribute'
      },
      initialize: function() {
        this.memConn = this.model.connections('OsPoolMembership');
        return this.hmlistView = this.reg(new HmlistView({
          targetModel: this.model
        }));
      },
      render: function() {
        this.$el.html(template(this.getRenderData()));
        this.renderHmlist();
        return this;
      },
      getModelJson: function() {
        var data;
        data = OsPropertyView.prototype.getModelJson.call(this);
        data.mems = _.map(this.memConn, function(mc) {
          var json;
          json = mc.toJSON();
          json.osport = mc.getPort().toJSON();
          return json;
        });
        return data;
      },
      renderHmlist: function() {
        return this.$('.pool-details').after(this.hmlistView.render().el);
      },
      getModelForUpdateAttr: function(e) {
        var $target, dataModel;
        $target = $(e.currentTarget);
        dataModel = $target.data('model');
        if (!dataModel) {
          dataModel = $target.closest('[data-model]').data('model');
        }
        switch (dataModel) {
          case 'hm':
            return this.hm;
          case 'mem':
            return this.memConn[$target.data('index')];
          default:
            return this.model;
        }
      }
    }, {
      handleTypes: [constant.RESTYPE.OSPOOL],
      handleModes: ['stack', 'appedit']
    });
  });

}).call(this);

define('workspaces/oseditor/property/ospool/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <header>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = (depth0 && depth0.address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</header>\n    <section class=\"group\">\n        <dl>\n            <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        </dl>\n        <dl>\n            <dt>Weight</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.weight)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        </dl>\n    </section>\n";
  return buffer;
  }

  buffer += "<div class=\"option-group-head expand\">\n    Pool Details\n</div>\n<div class=\"option-group pool-details\">\n    <dl>\n        <dt>Name</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Subnet ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.subnet_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Protocol</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>LB Method</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.lb_method)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Provider</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.provider)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n</div>\n\n<div class=\"option-group-head expand\">\n    Member("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.members)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")\n</div>\n<div class=\"option-group \">\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/oseditor/property/ospool/appView',['constant', '../OsPropertyView', '../osport/view', '../oshmlist/view', './template/app', 'CloudResources'], function(constant, OsPropertyView, PortView, HmlistView, template, CloudResources) {
    return OsPropertyView.extend({
      initialize: function() {
        var region;
        region = Design.instance().region();
        this.hmList = _.map(this.appModel.get('health_monitors'), function(id) {
          return CloudResources(constant.RESTYPE.OSHM, region).get(id);
        });
        return this.hmlistView = this.reg(new HmlistView({
          targetModel: this.hmList,
          isApp: true
        }));
      },
      render: function() {
        this.$el.html(template(this.getRenderData()));
        this.renderHmlist();
        return this;
      },
      getModelJson: function() {
        var PortClass, appJson, _ref;
        appJson = ((_ref = this.appModel) != null ? _ref.toJSON() : void 0) || {};
        appJson = $.extend(true, {}, appJson);
        PortClass = Design.modelClassForType(constant.RESTYPE.OSPORT);
        _.each(appJson.members, function(m) {
          var osport;
          osport = PortClass.find(function(port) {
            return port.get('ip') === m.address;
          });
          m.name = osport != null ? osport.get('name') : void 0;
          return null;
        });
        return appJson;
      },
      renderHmlist: function() {
        return this.$('.pool-details').after(this.hmlistView.render().el);
      }
    }, {
      handleTypes: [constant.RESTYPE.OSPOOL],
      handleModes: ['app']
    });
  });

}).call(this);

define('workspaces/oseditor/property/osrouter/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<section class=\"group\">\n    <dl class=\"vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.appId), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "true";
  }

function program5(depth0,data) {
  
  
  return "false";
  }

function program7(depth0,data) {
  
  
  return "disabled";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"group\">\n        <div class=\"main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n    </section>\n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"option-group-head expand\">\n    Router Detail\n</div>\n<div class=\"option-group\">\n    <section class=\"group required\">\n        <label class=\"name\">Router Name</label>\n        <input id=\"property-os-router-name\" data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name\">Enable NAT</label>\n        <select class=\"selection bool\" id=\"property-os-router-enablenat\" data-target=\"enableNAT\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.floatingIp), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></select>\n    </section>\n</div>\n<div class=\"option-group-head expand\">\n    Router Detail\n</div>\n<div class=\"option-group\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.subnets), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.stackTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "true";
  }

function program3(depth0,data) {
  
  
  return "false";
  }

  buffer += "<section class=\"group\">\n    <dl class=\"vertical\">\n        <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.status), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    <dl class=\"vertical\">\n        <dt>Enable NAT</dt><dd>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.external_gateway_info)),stack1 == null || stack1 === false ? stack1 : stack1.enable_snat), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.appTemplate=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/oseditor/property/osrouter/view',['constant', '../OsPropertyView', './template', 'CloudResources', 'underscore', 'OsKp'], function(constant, OsPropertyView, template, CloudResources, _, OsKp) {
    return OsPropertyView.extend({
      events: {
        "change [data-target]": "updateAttribute"
      },
      render: function() {
        var json, resData, subnets, _ref, _ref1;
        if ((_ref = this.mode()) === 'stack' || _ref === 'appedit') {
          console.log(this.model);
          subnets = this.model.connectionTargets("OsRouterAsso");
          json = this.model.toJSON();
          json.subnets = _.map(subnets, function(e) {
            return e.toJSON();
          });
          if (this.mode() === 'appedit') {
            resData = this.getRenderData();
            if (resData) {
              _.extend(json, resData);
            }
            json.status = resData != null ? (_ref1 = resData.app) != null ? _ref1.status : void 0 : void 0;
          }
          this.$el.html(template.stackTemplate(json));
        } else {
          this.$el.html(template.appTemplate(this.getRenderData()));
        }
        return this;
      }
    }, {
      handleTypes: [constant.RESTYPE.OSRT],
      handleModes: ['stack', 'appedit', 'app']
    });
  });

}).call(this);

define('workspaces/oseditor/property/osextnet/template',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"group\">\n    <dl>\n        <dt>External Network ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/oseditor/property/osextnet/view',['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
    return OsPropertyView.extend({
      render: function() {
        this.$el.html(template({
          appId: this.model.getResourceId()
        }));
        return this;
      }
    }, {
      handleTypes: [constant.RESTYPE.OSEXTNET],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);

define('workspaces/oseditor/property/osnetwork/template',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<section class=\"group required\">\n    <label class=\"name\">Name</label>\n    <input data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<dl><dt>ID</dt><dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<dl><dt>Name</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n<dl><dt>ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\n";
  return buffer;
  }

  stack1 = helpers.unless.call(depth0, (depth0 && depth0.modeIsApp), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/oseditor/property/osnetwork/view',['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
    return OsPropertyView.extend({
      render: function() {
        this.$el.html(template(this.getRenderData()));
        return this;
      }
    }, {
      handleTypes: [constant.RESTYPE.OSNETWORK],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/property/OsPropertyBundle',['./default/view', './globalconfig/view', './ossubnet/view', './osserver/view', './osserver/appView', './osvol/view', './osvol/appView', './oslistener-asso/view', './ospool-membership/view', './oslistener/view', './oslistener/appView', './ospool/view', './ospool/appView', './osport/view', './osrouter/view', './osextnet/view', './osnetwork/view'], function() {});

}).call(this);

define('workspaces/oseditor/subviews/panels/template/TplPropertyPanel',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>";
  return buffer;
  };
TEMPLATE.title=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"os-property-res-inexist\">The resource may be not exist.</div>";
  };
TEMPLATE.empty=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/oseditor/subviews/panels/PropertyPanel',['backbone', 'constant', 'Design', 'CloudResources', '../../property/OsPropertyView', '../../property/OsPropertyBundle', './template/TplPropertyPanel', 'UI.selection'], function(Backbone, constant, Design, CloudResources, OsPropertyView, OsPropertyBundle, PropertyPanelTpl, bindSelection) {
    return Backbone.View.extend({
      events: {
        "click .option-group-head": "updateRightPanelOption"
      },
      initialize: function(options) {
        var region, _ref, _ref1, _ref2, _ref3, _ref4;
        region = options.workspace.design.region();
        this.options = options;
        this.uid = options.uid;
        this.type = options.type;
        this.panel = options.panel;
        this.model = Design.instance().component(this.uid);
        this.mode = options.workspace.design.mode();
        if (this.mode === 'appedit' && !((_ref = this.model) != null ? _ref.get('appId') : void 0)) {
          this.mode = 'stack';
        }
        if (this.model && ((_ref1 = this.mode) === 'app' || _ref1 === 'appedit') && ((_ref2 = this.model) != null ? _ref2.get('appId') : void 0)) {
          this.appModel = (_ref3 = CloudResources(this.type, region)) != null ? _ref3.get((_ref4 = this.model) != null ? _ref4.get('appId') : void 0) : void 0;
        }
        return this.viewClass = OsPropertyView.getClass(this.mode, this.type) || OsPropertyView.getClass(this.mode, 'default');
      },
      render: function() {
        var design, propertyView, _ref, _ref1, _ref2;
        design = this.options.workspace.design;
        propertyView = this.propertyView = new this.viewClass({
          model: this.model,
          appModel: this.appModel || null,
          propertyPanel: this,
          panel: this.panel
        });
        bindSelection(this.$el, propertyView.selectTpl);
        this.setTitle();
        if (((_ref = this.mode) === 'app' || _ref === 'appedit') && !this.appModel && ((_ref1 = this.model) != null ? _ref1.type : void 0) !== constant.RESTYPE.OSEXTNET) {
          this.$el.append(PropertyPanelTpl.empty());
        } else {
          this.$el.append(propertyView.render().el);
        }
        this.restoreAccordion((_ref2 = this.model) != null ? _ref2.type : void 0, this.uid);
        return this;
      },
      setTitle: function(title) {
        var $title;
        if (title == null) {
          title = this.propertyView.getTitle();
        }
        if (!title) {
          return;
        }
        $title = this.$('h1');
        if ($title.size()) {
          return $title.eq(0).text(title);
        } else {
          return this.$el.html(PropertyPanelTpl.title({
            title: title
          }));
        }
      },
      showFloatPanel: function() {
        return this.panel.showFloatPanel.apply(this.panel, arguments);
      },
      hideFloatPanel: function() {
        return this.panel.hideFloatPanel.apply(this.panel, arguments);
      },
      remove: function() {
        this.propertyView.remove();
        return Backbone.View.prototype.remove.apply(this, arguments);
      },
      updateRightPanelOption: function(event) {
        var $target, $toggle, comp, hide, status;
        $toggle = $(event.currentTarget);
        if ($toggle.is("button") || $toggle.is("a")) {
          return;
        }
        hide = $toggle.hasClass("expand");
        $target = $toggle.next();
        if (hide) {
          $target.css("display", "block").slideUp(200);
        } else {
          $target.slideDown(200);
        }
        $toggle.toggleClass("expand");
        if (!$toggle.parents(".panel-body").length) {
          return;
        }
        this.__optionStates = this.__optionStates || {};
        comp = this.uid || "Stack";
        status = _.map(this.$el.find('.panel-body').find('.option-group-head'), function(el) {
          return $(el).hasClass("expand");
        });
        this.__optionStates[comp] = status;
        comp = Design.instance().component(comp);
        console.log(comp);
        if (comp) {
          this.__optionStates[comp.type] = status;
        }
        return false;
      },
      restoreAccordion: function(type, uid) {
        var el, idx, states, _i, _len, _ref, _ref1;
        if (!this.__optionStates) {
          return;
        }
        states = this.__optionStates[uid];
        if (!states) {
          states = this.__optionStates[type];
        }
        if (states) {
          _ref = this.$el.find('.panel-body').find('.option-group-head');
          for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
            el = _ref[idx];
            $(el).toggleClass("expand", states[idx]);
          }
          _ref1 = this.__optionStates;
          for (uid in _ref1) {
            states = _ref1[uid];
            if (!uid || Design.instance().component(uid) || uid.indexOf("i-") === 0 || uid === "Stack") {
              continue;
              delete this.__optionStates[uid];
              return;
            }
          }
        }
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/subviews/panels/ConfigPanel',['backbone', 'constant', './PropertyPanel', '../../property/OsPropertyView'], function(Backbone, constant, PropertyPanel, OsPropertyView) {
    return PropertyPanel.extend({
      initialize: function(options) {
        PropertyPanel.prototype.initialize.apply(this, arguments);
        this.type = 'globalconfig';
        this.model = this.appModel = Design.instance();
        return this.viewClass = OsPropertyView.getClass(this.mode, this.type);
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/subviews/Panel',['backbone', 'constant', '../template/TplPanel', './panels/ResourcePanel', './panels/ConfigPanel', './panels/PropertyPanel', "StateEditorView"], function(Backbone, constant, PanelTpl, ResourcePanel, ConfigPanel, PropertyPanel, StatePanel) {
    var Panels, __defaultArgs;
    Panels = {
      resource: ResourcePanel,
      config: ConfigPanel,
      property: PropertyPanel,
      state: StatePanel
    };
    __defaultArgs = {
      uid: '',
      type: 'default'
    };
    return Backbone.View.extend({
      events: {
        'click .anchor li': '__scrollTo'
      },
      __openArgs: __defaultArgs,
      __currentPanel: 'resource',
      initialize: function(options) {
        _.extend(this, options);
        if (this.workspace.design.mode() === 'app') {
          this.__currentPanel = 'config';
        }
        return this.render();
      },
      render: function() {
        this.setElement(this.parent.$el.find(".OEPanelRight"));
        this.$el.html(PanelTpl({}));
        this.open(this.__currentPanel);
        return this;
      },
      renderSubPanel: function(subPanel, args) {
        var _ref;
        args = _.extend({
          workspace: this.workspace,
          panel: this
        }, args);
        $(document.activeElement).filter("input, textarea").blur();
        if ((_ref = this.subPanel) != null) {
          _ref.remove();
        }
        this.subPanel = new subPanel(args);
        return this.$('.panel-body').html(this.subPanel.render().el);
      },
      scrollTo: function(className) {
        var $container, $target, newTop, top;
        $container = this.$('.panel-body');
        $target = $("section." + className);
        top = $container.offset().top;
        newTop = $target.offset().top - top + $container.scrollTop();
        return $container.animate({
          scrollTop: newTop
        });
      },
      open: function(panelName, args) {
        var lastArgs, lastPanel, targetPanel;
        if (args == null) {
          args = this.__openArgs;
        }
        lastPanel = this.__currentPanel;
        lastArgs = _.extend({}, this.__openArgs);
        this.__openArgs = args;
        this.__currentPanel = panelName;
        targetPanel = Panels[panelName];
        if (!targetPanel) {
          return;
        }
        if (this.hidden()) {
          return;
        }
        this.$el.removeClass('hide');
        if (!(lastPanel === this.__currentPanel && _.isEqual(lastArgs, args))) {
          this.hideFloatPanel();
        }
        this.$el.prop('class', "OEPanelRight " + panelName);
        this.$el.closest('#OpsEditor').find('.sidebar-title').prop('class', "sidebar-title " + panelName);
        return this.renderSubPanel(targetPanel, args);
      },
      floatPanelShowCount: 0,
      showFloatPanel: function(dom) {
        this.floatPanelShowCount++;
        if (dom) {
          this.$('.panel-float').html(dom);
        }
        this.$('.panel-float').removeClass('hidden');
        return _.defer((function(_this) {
          return function() {
            return _this.$('.panel-body').one('click', _this.__hideFloatPanel(_this.floatPanelShowCount));
          };
        })(this));
      },
      __hideFloatPanel: function(showCount) {
        var that;
        that = this;
        return function() {
          if (showCount === that.floatPanelShowCount) {
            return that.hideFloatPanel();
          }
        };
      },
      hideFloatPanel: function() {
        return this.$('.panel-float').addClass('hidden');
      },
      show: function() {
        this.$el.removeClass('hidden');
        return this;
      },
      hide: function() {
        this.$el.addClass('hidden');
        $('.sidebar-title').prop('class', 'sidebar-title');
        return this;
      },
      shown: function() {
        return !this.$el.hasClass('hidden');
      },
      hidden: function() {
        return !this.shown();
      },
      openResource: function(args) {
        return this.open('resource', args);
      },
      openState: function(args) {
        return this.open('state', args);
      },
      openProperty: function(args) {
        return this.open('property', args);
      },
      openConfig: function(args) {
        this.open('config', args);
        return this.__openArgs = this.__defaultArgs;
      },
      openCurrent: function(args) {
        if (this.workspace.design.mode() === 'app' && this.__currentPanel === 'resource') {
          this.__currentPanel = 'config';
        }
        return this.open(this.__currentPanel, args);
      },
      __openOrHidePanel: function(e) {
        var targetPanelName;
        targetPanelName = $(e.currentTarget).prop('class');
        if (this.__currentPanel === targetPanelName && this.shown()) {
          return this.hide();
        } else {
          this.show();
          return this.open(targetPanelName, this.__openArgs);
        }
      },
      __scrollTo: function(e) {
        var targetClassName;
        targetClassName = $(e.currentTarget).data('scrollTo');
        return this.scrollTo(targetClassName);
      }
    });
  });

}).call(this);

define('workspaces/oseditor/template/TplToolbar',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={"confirm":{},"modal":{},"export":{}};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar icon-zoom-in tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_ZOOM_IN", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar icon-zoom-out seperator tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_ZOOM_OUT", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.BtnZoom=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar icon-play tooltip toolbar-btn-primary runApp\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_BTN_RUN_STACK", {hash:{},data:data}))
    + "'>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.BTN_RUN_STACK", {hash:{},data:data}))
    + "</button>";
  return buffer;
  };
TEMPLATE.BtnRunStack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar tooltip icon-save\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_SAVE_STACK", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar icon-delete tooltip seperator\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_DELETE_STACK", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar tooltip icon-duplicate\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_DUPLICATE_STACK", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar icon-new-stack tooltip seperator\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_CREATE_STACK", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.BtnStackOps=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"selectbox btn-toolbar seperator\">\n  <button class=\"selection tooltip icon-send\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EXPORT", {hash:{},data:data}))
    + "'></button>\n  <ul class=\"dropdown\">\n    <li data-analytics-plus=\"export_png\" class=\"icon-export-png\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EXPORT_AS_PNG", {hash:{},data:data}))
    + "</li>\n    <li data-analytics-plus=\"export_json\" class=\"icon-export-json\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EXPORT_AS_JSON", {hash:{},data:data}))
    + "</li>\n  </ul>\n</div>";
  return buffer;
  };
TEMPLATE.BtnExport=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"tooltip btn-toolbar icon-update-app toolbar-btn-primary\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_UPDATE_APP", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EDIT_APP", {hash:{},data:data}))
    + "</button>\n<button class=\"tooltip btn-toolbar icon-apply-app toolbar-btn-primary\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_SAVE_UPDATE_APP", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.APPLY_EDIT", {hash:{},data:data}))
    + "</button>\n<button class=\"tooltip btn-toolbar icon-cancel-update-app seperator\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_CANCEL_UPDATE_APP", {hash:{},data:data}))
    + "\"></button>";
  return buffer;
  };
TEMPLATE.BtnEditApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression;


  buffer += "<button class=\"tooltip btn-toolbar icon-stop\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_STOP_APP", {hash:{},data:data}))
    + "\"></button>\n<button class=\"tooltip btn-toolbar icon-play startApp\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_START_APP", {hash:{},data:data}))
    + "\"><span style=\"display: none\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.START_APP", {hash:{},data:data}))
    + "</span></button>\n<button class=\"btn-toolbar tooltip icon-terminate seperator\" data-tooltip=\"";
  stack1 = helpers.i18n.call(depth0, "TOOLBAR.TIP_TERMINATE_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></button>\n<button class=\"btn-toolbar tooltip icon-save-app seperator\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_SAVE_APP_TO_STACK", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.BtnAppOps=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar icon-export-png tooltip seperator\" data-analytics-plus=\"export_png\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EXPORT_AS_PNG", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.BtnPng=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar tooltip icon-refresh seperator\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_REFRESH_REOURCES", {hash:{},data:data}))
    + "\"></button>";
  return buffer;
  };
TEMPLATE.BtnReloadRes=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return " on";
  }

  buffer += "<label class=\"switch toolbar-visual-ops-switch tooltip";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stateOn), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_CUSTOM_USER_DATA", {hash:{},data:data}))
    + "\">\n    <span class=\"switch-label\" data-on=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TOGGLE_VISUALOPS_ON", {hash:{},data:data}))
    + "\" data-off=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TOGGLE_VISUALOPS_OFF", {hash:{},data:data}))
    + "\"></span>\n    <span class=\"switch-handle\"></span>\n</label>";
  return buffer;
  };
TEMPLATE.BtnSwitchStates=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"icon-reload tooltip btn btn-blue reload-states\" data-original=\"Reload States\" data-disabled=\"Initiating…\"  data-tooltip=\"Instantly rerun all states in this app.\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.RELOAD_STATES", {hash:{},data:data}))
    + "</button>";
  return buffer;
  };
TEMPLATE.BtnReloadStates=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header class=\"sidebar-title resource\">\n    <a class=\"resource\">R</a>\n    <a class=\"config\">A</a>\n    <a class=\"property\">P</a>\n    <a class=\"state\">S</a>\n</header>";
  };
TEMPLATE.PanelHeaderStack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header class=\"sidebar-title resource\" data-mode=\"app\">\n    <a class=\"resource\">R</a>\n    <a class=\"config\">A</a>\n    <a class=\"property\">P</a>\n    <a class=\"state\">S</a>\n</header>";
  };
TEMPLATE.PanelHeaderApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-wraper\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CONFIRM_ENABLE_STATE", {hash:{},data:data}))
    + "</div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.confirm.enableState=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-wraper\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CANCEL_UPDATE_CONFIRM", {hash:{},data:data}))
    + "</div>\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.DISCARD_UPDATE_CHANGE", {hash:{},data:data}))
    + "</div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.modal.cancelUpdate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"modal-text-wraper\">\n    <div class=\"modal-center-align-helper\" style=\"padding:40px 20px;\">\n        <div class=\"modal-text-major\"></div>\n        <div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BODY_EXPORT_AS_JSON", {hash:{},data:data}))
    + "</div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <a class=\"btn btn-blue\" href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.data)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_DOWNLOAD", {hash:{},data:data}))
    + "</a>\n    <button id=\"tpl-cancel\" class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.export.JSON=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"loading-spinner\"></div>\n<section style=\"margin:10px 10px 0;max-height:420px;overflow:hidden;text-align:center;display:none;\"></section>\n<div class=\"modal-footer\">\n    <a class=\"btn btn-blue\" style=\"display: inline-block;\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.LBL_DOWNLOAD", {hash:{},data:data}))
    + "</a>\n    <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.export.PNG=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div id=\"replace_stack\" style=\"padding: 10px 0\">\n                <div class=\"radio\">\n                    <input id=\"radio-replace-stack\" type=\"radio\" name=\"save-stack-type\" value=\"replace\" checked>\n                    <label for=\"radio-replace-stack\"></label>\n                </div>\n                <label class=\"modal-text-minor\" for=\"radio-replace-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_REPLACE_STACK", {hash:{},data:data}))
    + "</label>\n                <div style=\"padding: 10px 22px\" class=\"radio-instruction\">\n                    "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_REPLACE_STACK_INTRO", {hash:{},data:data}))
    + " \""
    + escapeExpression(((stack1 = (depth0 && depth0.input)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_REPLACE_STACK_INTRO_END", {hash:{},data:data}))
    + "\n                </div>\n            </div>\n            <div id=\"save_new_stack\">\n                <div class=\"radio\">\n                    <input id=\"radio-new-stack\" type=\"radio\" name=\"save-stack-type\">\n                    <label for=\"radio-new-stack\"></label>\n                </div>\n                <label class=\"modal-text-minor\" for=\"radio-new-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_SAVE_NEW_STACK", {hash:{},data:data}))
    + "</label>\n                <div style=\"padding: 10px 22px\" class=\"radio-instruction hide\">\n                    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_SAVE_STACK_INSTRUCTION", {hash:{},data:data}))
    + "</p>\n                    <input class=\"input\" id=\"modal-input-value\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.stackName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" style=\"width: 400px\"/>\n                    <div id=\"stack-name-exist\" class=\"hide\" style=\"color: #ec3c38\">\n                        "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_STACK_NAME_ERROR", {hash:{},data:data}))
    + "</div>\n                </div>\n            </div>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div id=\"name_new_stack\">\n                <input id=\"radio-new-stack\" type=\"hidden\" name=\"save-stack-type\" checked>\n                <div style=\"padding: 10px 22px\" class=\"radio-instruction\">\n                    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_SAVE_STACK_INSTRUCTION", {hash:{},data:data}))
    + "</p>\n                    <input class=\"input\" id=\"modal-input-value\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.stackName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" style=\"width: 400px\"/>\n                    <div id=\"stack-name-exist\" class=\"hide\" style=\"color: #ec3c38\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_STACK_NAME_ERROR", {hash:{},data:data}))
    + "</div>\n                </div>\n            </div>\n        ";
  return buffer;
  }

  buffer += "<p class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_INTRO_1", {hash:{},data:data}))
    + "</p>\n<p class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_INTRO_2", {hash:{},data:data}))
    + "</p>\n<div class=\"modal-center-align-helper\">\n    <div class=\"modal-control-group\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.originStackExist), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.saveAppToStack=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('workspaces/oseditor/subviews/Toolbar',["OpsModel", "../template/TplToolbar", "ThumbnailUtil", "JsonExporter", "ApiRequest", "i18n!/nls/lang.js", "UI.modalplus", 'kp_dropdown', "ResDiff", 'constant', 'event', 'TaGui', "CloudResources", "AppAction", "UI.notification", "backbone"], function(OpsModel, ToolbarTpl, Thumbnail, JsonExporter, ApiRequest, lang, Modal, kpDropdown, ResDiff, constant, ide_event, TA, CloudResources, appAction) {
    return Backbone.View.extend({
      events: {
        "click .icon-save": "saveStack",
        "click .icon-delete": "deleteStack",
        "click .icon-duplicate": "duplicateStack",
        "click .icon-new-stack": "createStack",
        "click .icon-zoom-in": "zoomIn",
        "click .icon-zoom-out": "zoomOut",
        "click .icon-export-png": "exportPNG",
        "click .icon-export-json": "exportJson",
        "click .runApp": 'runStack',
        "click .icon-stop": "stopApp",
        "click .startApp": "startApp",
        "click .icon-terminate": "terminateApp",
        "click .icon-forget-app": "forgetApp",
        "click .icon-refresh": "refreshResource",
        "click .icon-update-app": "switchToAppEdit",
        "click .icon-apply-app": "applyAppEdit",
        "click .icon-cancel-update-app": "cancelAppEdit",
        'click .toolbar-visual-ops-switch': 'opsOptionChanged',
        'click .reload-states': "reloadState",
        'click .icon-save-app': 'appToStack',
        'click .sidebar-title a': 'openOrHidePanel'
      },
      initialize: function(options) {
        var attr, btn, btns, opsModel, tpl, _i, _len;
        _.extend(this, options);
        opsModel = this.workspace.opsModel;
        if (opsModel.isStack()) {
          btns = ["BtnRunStack", "BtnStackOps", "BtnZoom", "BtnExport", "PanelHeaderStack", "BtnSwitchStates"];
        } else {
          btns = ["BtnEditApp", "BtnAppOps", "BtnZoom", "BtnPng", "BtnReloadRes", "PanelHeaderApp"];
        }
        tpl = "";
        for (_i = 0, _len = btns.length; _i < _len; _i++) {
          btn = btns[_i];
          attr = {
            stateOn: this.workspace.design.get("agent").enabled
          };
          tpl += ToolbarTpl[btn](attr);
        }
        if (this.workspace.opsModel.isApp() && this.workspace.design.get("agent").enabled) {
          tpl += ToolbarTpl.BtnReloadStates();
        }
        this.setElement(this.parent.$el.find(".OEPanelTop").html(tpl));
        this.updateZoomButtons();
        this.updateTbBtns();
      },
      openOrHidePanel: function(e) {
        return this.parent.propertyPanel.__openOrHidePanel.call(this.parent.propertyPanel, e);
      },
      updateTbBtns: function() {
        var ami, hasState, isAppEdit, opsModel, running, stopped;
        opsModel = this.workspace.opsModel;
        if (opsModel.isApp()) {
          console.log("isApp");
          isAppEdit = this.workspace.isAppEditMode && this.workspace.isAppEditMode();
          this.$el.children(".icon-update-app").toggle(!isAppEdit);
          this.$el.children(".icon-apply-app, .icon-cancel-update-app").toggle(isAppEdit);
          if (isAppEdit) {
            this.$el.children(".icon-terminate, .icon-forget-app, .icon-stop, .icon-play, .icon-refresh, .icon-save-app, .icon-reload").hide();
            this.$el.find(".icon-refresh").hide();
            this.$('.sidebar-title').attr('data-mode', 'stack');
          } else {
            running = opsModel.testState(OpsModel.State.Running);
            stopped = opsModel.testState(OpsModel.State.Stopped);
            this.$('.sidebar-title').attr('data-mode', 'app');
            this.$el.children(".icon-terminate, .icon-forget-app, .icon-refresh, .icon-save-app, .icon-reload").show();
            this.$el.children(".icon-stop").toggle(opsModel.get("stoppable") && running);
            this.$el.children(".icon-play").toggle(stopped).toggleClass("toolbar-btn-primary seperator", opsModel.testState(OpsModel.State.Stopped)).find("span").toggle(stopped);
            this.$el.children('.icon-update-app').toggle(!stopped);
            this.$el.find(".icon-refresh").toggle(running);
            ami = [].concat(this.workspace.design.componentsOfType(constant.RESTYPE.INSTANCE), this.workspace.design.componentsOfType(constant.RESTYPE.LC));
            hasState = _.find(ami, function(comp) {
              var _ref;
              return comp && (((_ref = comp.attributes.state) != null ? _ref.length : void 0) > 0);
            });
            this.$el.find('.reload-states').toggle(!!hasState);
          }
        }
        if (this.__saving) {
          this.$el.children(".icon-save").attr("disabled", "disabled");
        } else {
          this.$el.children(".icon-save").removeAttr("disabled");
        }
        this.updateZoomButtons();
      },
      saveStack: function(evt) {
        var newJson, self;
        $(evt.currentTarget).attr("disabled", "disabled");
        self = this;
        this.__saving = true;
        newJson = this.workspace.design.serialize();
        return Thumbnail.generate(this.parent.getSvgElement())["catch"](function() {
          return null;
        }).then(function(thumbnail) {
          self.workspace.opsModel.save(newJson, thumbnail).then(function() {
            self.__saving = false;
            $(evt.currentTarget).removeAttr("disabled");
            return notification("info", sprintf(lang.NOTIFY.ERR_SAVE_SUCCESS, newJson.name));
          }, function() {
            self.__saving = false;
            $(evt.currentTarget).removeAttr("disabled");
            return notification("error", sprintf(lang.NOTIFY.ERR_SAVE_FAILED, newJson.name));
          });
        });
      },
      deleteStack: function() {
        return appAction.deleteStack(this.workspace.opsModel.cid, this.workspace.design.get("name"));
      },
      createStack: function() {
        var opsModel;
        opsModel = this.workspace.opsModel;
        App.createOps(opsModel.get("region"), "openstack", opsModel.get("provider"));
      },
      duplicateStack: function() {
        var newOps;
        newOps = App.model.createStackByJson(this.workspace.design.serialize());
        App.openOps(newOps);
      },
      zoomIn: function() {
        this.parent.canvas.zoomIn();
        return this.updateZoomButtons();
      },
      zoomOut: function() {
        this.parent.canvas.zoomOut();
        return this.updateZoomButtons();
      },
      updateZoomButtons: function() {
        var scale;
        scale = this.parent.canvas ? this.parent.canvas.scale() : 1;
        if (scale <= 1) {
          this.$el.find(".icon-zoom-in").attr("disabled", "disabled");
        } else {
          this.$el.find(".icon-zoom-in").removeAttr("disabled");
        }
        if (scale >= 1.6) {
          this.$el.find(".icon-zoom-out").attr("disabled", "disabled");
        } else {
          this.$el.find(".icon-zoom-out").removeAttr("disabled");
        }
      },
      exportPNG: function() {
        var design, modal, name;
        modal = new Modal({
          title: "Export PNG",
          template: ToolbarTpl["export"].PNG(),
          width: "470",
          disableFooter: true,
          compact: true,
          onClose: function() {
            modal = null;
          }
        });
        design = this.workspace.design;
        name = design.get("name");
        Thumbnail.exportPNG(this.parent.getSvgElement(), {
          isExport: true,
          createBlob: true,
          name: name,
          id: design.get("id"),
          onFinish: function(data) {
            var btn;
            if (!modal) {
              return;
            }
            modal.tpl.find(".loading-spinner").remove();
            modal.tpl.find("section").show().prepend("<img style='max-height:100%;display:inline-block;' src='" + data.image + "' />");
            btn = modal.tpl.find("a.btn-blue").click(function() {
              return modal.close();
            });
            if (data.blob) {
              btn.click(function() {
                JsonExporter.download(data.blob, "" + name + ".png");
                return false;
              });
            } else {
              btn.attr({
                href: data.image,
                download: "" + name + ".png"
              });
            }
            modal.resize();
          }
        });
      },
      exportJson: function() {
        var data, date, design, name, username;
        design = this.workspace.design;
        username = App.user.get('username');
        date = MC.dateFormat(new Date(), "yyyy-MM-dd");
        name = [design.get("name"), username, date].join("-");
        data = JsonExporter.exportJson(design.serialize(), "" + name + ".json");
        if (data) {
          return new Modal({
            title: lang.TOOLBAR.EXPORT_AS_JSON,
            template: ToolbarTpl["export"].JSON(data),
            width: "470",
            disableFooter: true,
            compact: true
          });
        }
      },
      reloadState: function(event) {
        var $target, app_id, data;
        $target = $(event.currentTarget);
        if ($target.hasClass('disabled')) {
          return false;
        }
        $target.toggleClass('disabled').html($target.attr('data-disabled'));
        app_id = Design.instance().get('id');
        data = {
          'encoded_user': App.user.get('usercode'),
          'token': App.user.get('defaultToken')
        };
        return $.ajax({
          url: API_URL + app_id,
          method: "POST",
          data: JSON.stringify(data),
          dataType: 'json',
          statusCode: {
            200: function() {
              notification('info', lang.NOTIFY.RELOAD_STATE_SUCCESS);
              return ide_event.trigger(ide_event.REFRESH_PROPERTY);
            },
            401: function() {
              return notification('error', lang.NOTIFY.RELOAD_STATE_INVALID_REQUEST);
            },
            404: function() {
              return notification('error', lang.NOTIFY.RELOAD_STATE_NETWORKERROR);
            },
            429: function() {
              return notification('error', lang.NOTIFY.RELOAD_STATE_NOT_READY);
            },
            500: function() {
              return notification('error', lang.NOTIFY.RELOAD_STATE_INTERNAL_SERVER_ERROR);
            }
          },
          error: function() {
            return console.log('Error while Reload State');
          },
          success: function() {
            return console.debug('Reload State Success!');
          }
        }).always(function() {
          return window.setTimeout(function() {
            return $target.removeClass('disabled').html($target.attr('data-original'));
          });
        });
      },
      runStack: function(event) {
        console.log(Design.instance(), this.workspace.opsModel, Design.instance() === this.workspace.opsModel);
        appAction.runStack(event, this.workspace);
        return false;
      },
      appToStack: function() {
        var appToStackModal, name, newName, onConfirm, originStackExist, stack;
        name = this.workspace.design.attributes.name;
        newName = this.getStackNameFromApp(name);
        stack = App.model.stackList().get(this.workspace.design.attributes.stack_id);
        onConfirm = (function(_this) {
          return function() {
            var isNew, newJson, newOps;
            MC.Analytics.increase("app_to_stack");
            isNew = !(appToStackModal.tpl.find("input[name='save-stack-type']:checked").val() === "replace");
            if (isNew) {
              newOps = App.model.createStackByJson(_this.workspace.design.serializeAsStack(appToStackModal.tpl.find('#modal-input-value').val()));
              appToStackModal.close();
              App.openOps(newOps);
            } else {
              newJson = Design.instance().serializeAsStack();
              newJson.id = _this.workspace.design.attributes.stack_id;
              appToStackModal.close();
              newJson.name = stack.get("name");
              return stack.save(newJson).then(function() {
                notification("info", sprintf(lang.NOTIFY.INFO_HDL_SUCCESS, lang.IDE.TOOLBAR_HANDLE_SAVE_STACK, newJson.name));
                return App.openOps(stack, true);
              }, function() {
                return notification('error', sprintf(lang.NOTIFY.ERR_SAVE_FAILED, newJson.name));
              });
            }
          };
        })(this);
        originStackExist = !!stack;
        appToStackModal = new Modal({
          title: lang.TOOLBAR.POP_TIT_APP_TO_STACK,
          template: ToolbarTpl.saveAppToStack({
            input: name,
            stackName: newName,
            originStackExist: originStackExist
          }),
          confirm: {
            text: lang.TOOLBAR.POP_BTN_SAVE_TO_STACK
          },
          onConfirm: onConfirm
        });
        return appToStackModal.tpl.find("input[name='save-stack-type']").change(function() {
          return appToStackModal.tpl.find(".radio-instruction").toggleClass('hide');
        });
      },
      getStackNameFromApp: function(app_name) {
        var copy_name, idx, name_list, prefix, reg_name, stack_reg;
        if (!app_name) {
          app_name = "untitled";
        }
        idx = 0;
        reg_name = /.*-\d+$/;
        if (reg_name.test(app_name)) {
          prefix = app_name.substr(0, app_name.lastIndexOf("-"));
          idx = Number(app_name.substr(app_name.lastIndexOf("-") + 1));
          copy_name = prefix;
        } else {
          if (app_name.charAt(app_name.length - 1) === "-") {
            copy_name = app_name.substr(0, app_name.length - 1);
          } else {
            copy_name = app_name;
          }
        }
        stack_reg = /.-stack+$/;
        if (stack_reg.test(copy_name)) {
          copy_name = copy_name;
        } else {
          copy_name = copy_name + "-stack";
        }
        name_list = App.model.stackList().pluck("name") || [];
        idx++;
        while (idx <= name_list.length) {
          if ($.inArray(copy_name + "-" + idx, name_list) === -1) {
            break;
          }
          idx++;
        }
        return copy_name + "-" + idx;
      },
      checkAppNameRepeat: function(nameVal) {
        if (App.model.appList().findWhere({
          name: nameVal
        })) {
          this.showError('appname', lang.PROP.MSG_WARN_REPEATED_APP_NAME);
          return true;
        } else if (!nameVal) {
          this.showError('appname', lang.PROP.MSG_WARN_NO_APP_NAME);
          return true;
        } else {
          this.hideError('appname');
          return false;
        }
      },
      renderKpDropdown: function(modal) {
        var hideKpError, keyPairDropdown;
        if (kpDropdown.hasResourceWithDefaultKp()) {
          keyPairDropdown = new kpDropdown();
          if (modal) {
            modal.tpl.find("#kp-runtime-placeholder").html(keyPairDropdown.render().el);
          } else {
            return false;
          }
          hideKpError = this.hideError.bind(this);
          keyPairDropdown.dropdown.on('change', function() {
            return hideKpError('kp');
          });
          modal.tpl.find('.default-kp-group').show();
          if (this.modal) {
            this.modal.on('close', function() {
              return keyPairDropdown.remove();
            });
          }
          if (this.updateModal) {
            this.updateModal.on('close', function() {
              return keyPairDropdown.remove();
            });
          }
        }
        return null;
      },
      hideDefaultKpError: function(context) {
        return context.hideError('kp');
      },
      hideError: function(type) {
        var selector;
        selector = type ? $("#runtime-error-" + type) : $(".runtime-error");
        return selector.hide();
      },
      showError: function(id, msg) {
        return $("#runtime-error-" + id).text(msg).show();
      },
      defaultKpIsSet: function() {
        var defaultKP, kpModal;
        if (!kpDropdown.hasResourceWithDefaultKp()) {
          return true;
        }
        kpModal = Design.modelClassForType(constant.RESTYPE.KP);
        defaultKP = kpModal.getDefaultKP();
        if (!defaultKP.get('isSet') || !((this.modal || this.updateModal) && (this.modal || this.updateModal).tpl.find("#kp-runtime-placeholder .item.selected").size())) {
          this.showError('kp', lang.IDE.RUN_STACK_MODAL_KP_WARNNING);
          return false;
        }
        return true;
      },
      startApp: function() {
        appAction.startApp(this.workspace.opsModel.id);
        return false;
      },
      stopApp: function() {
        appAction.stopApp(this.workspace.opsModel.id);
        return false;
      },
      terminateApp: function() {
        appAction.terminateApp(this.workspace.opsModel.id);
        return false;
      },
      forgetApp: function() {
        appAction.forgetApp(this.workspace.opsModel.id);
        return false;
      },
      refreshResource: function() {
        this.workspace.reloadAppData();
        return false;
      },
      switchToAppEdit: function() {
        this.workspace.switchToEditMode();
        return false;
      },
      checkDBinstance: function(oldDBInstanceList) {
        var DBInstances, checkDB;
        checkDB = new Q.defer();
        if (oldDBInstanceList.length) {
          DBInstances = CloudResources(constant.RESTYPE.DBINSTANCE, Design.instance().get("region"));
          DBInstances.fetchForce().then(function() {
            return checkDB.resolve(DBInstances);
          });
        } else {
          checkDB.resolve([]);
        }
        return checkDB.promise;
      },
      applyOpenstackAppEdit: function() {
        var $diffTree, changedServers, differ, newJson, notification, oldJson, result, that;
        that = this;
        oldJson = this.workspace.opsModel.getJsonData();
        newJson = this.workspace.design.serialize({
          usage: 'updateApp'
        });
        differ = new ResDiff({
          old: oldJson,
          "new": newJson
        });
        result = differ.getDiffInfo();
        if (!result.compChange && !result.layoutChange && !result.stateChange) {
          return this.workspace.applyAppEdit();
        }
        notification = [];
        changedServers = [];
        _.each(differ.modifiedComps, function(comp, id) {
          var _ref;
          if (((_ref = newJson.component[id]) != null ? _ref.type : void 0) === constant.RESTYPE.OSSERVER && comp.resource.flavor) {
            return changedServers.push(newJson.component[id].name);
          }
        });
        if (changedServers.length) {
          notification.push("Server " + (changedServers.join(", ")) + " will be restarted to change flavor.");
        }
        _.each(differ.removedComps, function(comp, id) {
          if (oldJson.component[id]) {
            return notification.push("Note: deleted resources cannot be restored.");
          }
        });
        this.updateModal = new Modal({
          title: lang.IDE.UPDATE_APP_MODAL_TITLE,
          template: MC.template.updateApp({
            isRunning: that.workspace.opsModel.testState(OpsModel.State.Running),
            notification: notification
          }),
          disableClose: true,
          hasScroll: true,
          maxHeight: "450px",
          cancel: "Close"
        });
        that.updateModal.tpl.find('.modal-confirm').prop("disabled", true).text((App.user.hasCredential() ? lang.IDE.UPDATE_APP_CONFIRM_BTN : lang.IDE.UPDATE_APP_MODAL_NEED_CREDENTIAL));
        that.updateModal.on('confirm', function() {
          var _ref;
          if (!App.user.hasCredential()) {
            App.showSettings(App.showSettings.TAB.Credential);
            return false;
          }
          if (!that.defaultKpIsSet()) {
            return false;
          }
          newJson = that.workspace.design.serialize({
            usage: 'updateApp'
          });
          that.workspace.applyAppEdit(newJson, !result.compChange);
          return (_ref = that.updateModal) != null ? _ref.close() : void 0;
        });
        if (result.compChange) {
          $diffTree = differ.renderAppUpdateView();
          $('#app-update-summary-table').html($diffTree);
        }
        that.renderKpDropdown(that.updateModal);
        return TA.loadModule('stack').then(function() {
          var _ref;
          that.updateModal && that.updateModal.toggleConfirm(false);
          return (_ref = that.updateModal) != null ? _ref.resize() : void 0;
        }, function(err) {
          var _ref;
          console.log(err);
          that.updateModal && that.updateModal.toggleConfirm(true);
          that.updateModal && that.updateModal.tpl.find("#take-rds-snapshot").off('change');
          return (_ref = that.updateModal) != null ? _ref.resize() : void 0;
        });
      },
      applyAppEdit: function() {
        var components, dbInstanceList, differ, newJson, oldDBInstanceList, oldJson, removes, result, that;
        if (Design.instance().get("cloud_type") === 'openstack') {
          this.applyOpenstackAppEdit();
          return false;
        }
        that = this;
        oldJson = this.workspace.opsModel.getJsonData();
        newJson = this.workspace.design.serialize({
          usage: 'updateApp'
        });
        differ = new ResDiff({
          old: oldJson,
          "new": newJson
        });
        result = differ.getDiffInfo();
        if (!result.compChange && !result.layoutChange && !result.stateChange) {
          return this.workspace.applyAppEdit();
        }
        removes = differ.removedComps;
        console.log(differ);
        dbInstanceList = [];
        console.log(newJson);
        components = newJson.component;
        _.each(components, function(e) {
          if (e.type === constant.RESTYPE.DBINSTANCE) {
            return dbInstanceList.push(e.resource.DBInstanceIdentifier);
          }
        });
        this.updateModal = new Modal({
          title: lang.IDE.HEAD_INFO_LOADING,
          template: MC.template.loadingSpiner,
          disableClose: true,
          hasScroll: true,
          maxHeight: "450px",
          cancel: "Close"
        });
        this.updateModal.tpl.find(".modal-footer").hide();
        oldDBInstanceList = [];
        _.each(oldJson.component, function(e) {
          if (e.type === constant.RESTYPE.DBINSTANCE) {
            return oldDBInstanceList.push(e.resource.DBInstanceIdentifier);
          }
        });
        return this.checkDBinstance(oldDBInstanceList).then(function(DBInstances) {
          var $diffTree, notAvailableDB, removeList, removeListNotReady;
          notAvailableDB = DBInstances.filter(function(e) {
            var _ref;
            return (_ref = e.attributes.DBInstanceIdentifier, __indexOf.call(dbInstanceList, _ref) >= 0) && e.attributes.DBInstanceStatus !== "available";
          });
          if (notAvailableDB.length) {
            that.updateModal.find(".modal-footer").show().find(".modal-confirm").hide();
            that.updateModal.setContent(MC.template.cantUpdateApp({
              data: notAvailableDB
            }));
            that.updateModal.setTitle(lang.IDE.UPDATE_APP_MODAL_TITLE);
            return false;
          }
          removeList = [];
          _.each(removes, function(e) {
            var dbModel;
            if (e.type === constant.RESTYPE.DBINSTANCE) {
              dbModel = DBInstances.get(e.resource.DBInstanceIdentifier);
              if (dbModel) {
                return removeList.push(DBInstances.get(e.resource.DBInstanceIdentifier));
              }
            }
          });
          removeListNotReady = _.filter(removeList, function(e) {
            return e.attributes.DBInstanceStatus !== "available";
          });
          that.updateModal.tpl.children().css('width', "450px").find(".modal-footer").show();
          that.updateModal.setContent(MC.template.updateApp({
            isRunning: that.workspace.opsModel.testState(OpsModel.State.Running),
            notReadyDB: removeListNotReady,
            removeList: removeList
          }));
          that.updateModal.setTitle(lang.IDE.UPDATE_APP_MODAL_TITLE);
          that.updateModal.tpl.find('.modal-confirm').prop("disabled", true).text((App.user.hasCredential() ? lang.IDE.UPDATE_APP_CONFIRM_BTN : lang.IDE.UPDATE_APP_MODAL_NEED_CREDENTIAL));
          that.updateModal.resize();
          window.setTimeout(function() {
            return that.updateModal.resize();
          }, 100);
          if (removeListNotReady != null ? removeListNotReady.length : void 0) {
            that.updateModal.tpl.find("#take-rds-snapshot").attr("checked", false).on("change", function() {
              return that.updateModal.tpl.find(".modal-confirm").prop('disabled', $(this).is(":checked"));
            });
          }
          that.updateModal.on('confirm', function() {
            var _ref;
            if (!App.user.hasCredential()) {
              App.showSettings(App.showSettings.TAB.Credential);
              return false;
            }
            if (!that.defaultKpIsSet()) {
              return false;
            }
            newJson = that.workspace.design.serialize({
              usage: 'updateApp'
            });
            that.workspace.applyAppEdit(newJson, !result.compChange);
            return (_ref = that.updateModal) != null ? _ref.close() : void 0;
          });
          if (result.compChange) {
            $diffTree = differ.renderAppUpdateView();
            $('#app-update-summary-table').html($diffTree);
          }
          that.renderKpDropdown(that.updateModal);
          TA.loadModule('stack').then(function() {
            var _ref;
            that.updateModal && that.updateModal.toggleConfirm(false);
            return (_ref = that.updateModal) != null ? _ref.resize() : void 0;
          }, function(err) {
            var _ref;
            console.log(err);
            that.updateModal && that.updateModal.toggleConfirm(true);
            that.updateModal && that.updateModal.tpl.find("#take-rds-snapshot").off('change');
            return (_ref = that.updateModal) != null ? _ref.resize() : void 0;
          });
        });
      },
      opsOptionChanged: function() {
        var $switcher, agent, confirmModal, instancesNoUserData, stateEnabled, workspace;
        $switcher = this.$(".toolbar-visual-ops-switch").toggleClass('on');
        stateEnabled = $switcher.hasClass("on");
        agent = this.workspace.design.get('agent');
        if (stateEnabled) {
          instancesNoUserData = this.workspace.design.instancesNoUserData();
          workspace = this.workspace;
          if (!instancesNoUserData) {
            $switcher.removeClass('on');
            confirmModal = new Modal({
              title: "Confirm to Enable VisualOps",
              width: "420px",
              template: ToolbarTpl.confirm.enableState(),
              confirm: {
                text: "Enable VisualOps"
              },
              onConfirm: function() {
                agent.enabled = true;
                confirmModal.close();
                $switcher.addClass('on');
                workspace.design.set('agent', agent);
                return ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY);
              }
            });
            return null;
          } else {
            agent.enabled = true;
            this.workspace.design.set("agent", agent);
            return ide_event.trigger(ide_event.REFRESH_PROPERTY);
          }
        } else {
          agent.enabled = false;
          this.workspace.design.set('agent', agent);
          return ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY);
        }
      },
      cancelAppEdit: function() {
        var modal, self;
        if (!this.workspace.cancelEditMode()) {
          self = this;
          modal = new Modal({
            title: "Changes not applied",
            template: ToolbarTpl.modal.cancelUpdate(),
            width: "400",
            confirm: {
              text: "Discard",
              color: "red"
            },
            onConfirm: function() {
              modal.close();
              self.workspace.cancelEditMode(true);
            }
          });
        }
        return false;
      }
    });
  });

}).call(this);

define('workspaces/oseditor/template/TplStatusbar',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"status-bar\"></ul>\n<div class=\"status-bar-modal\" style=\"display: none;\"></div>";
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "Last saved: <span class=\"stack-save-time\">-<span>";
  };
TEMPLATE.lastSaved=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class=\"state-success\"><i class=\"status status-green icon-label\"></i><b>"
    + escapeExpression(((stack1 = (depth0 && depth0.successCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b></span>\n<span class=\"state-failed\"><i class=\"status status-red icon-label\"></i><b>"
    + escapeExpression(((stack1 = (depth0 && depth0.failCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b></span>";
  return buffer;
  };
TEMPLATE.state=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "Validate";
  };
TEMPLATE.ta=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/oseditor/subviews/Statusbar',["OpsModel", "Design", "../template/TplStatusbar", "constant", "backbone", "event", "state_status"], function(OpsModel, Design, template, constant, Backbone, ide_event, stateStatus) {
    var itemView, items;
    items = [
      {
        name: 'lastSaved',
        className: 'info',
        visible: true,
        events: {
          update: function() {
            return [
              {
                obj: null,
                event: 'jsonDataSaved'
              }
            ];
          }
        },
        update: function($, workspace) {
          var save_time;
          save_time = jQuery.now() / 1000;
          if (this.timer) {
            clearInterval(this.timer);
          }
          this.timer = setInterval(function() {
            var $item, new_interval_time;
            $item = $('.stack-save-time');
            new_interval_time = MC.intervalDate(save_time);
            if ($item.text() !== new_interval_time) {
              return $item.text(new_interval_time);
            }
          }, 1000);
          return null;
        },
        click: function(event) {
          return null;
        },
        remove: function() {
          return clearInterval(this.timer);
        }
      }, {
        name: 'ta',
        className: 'status-bar-btn',
        visible: function(toggle, workspace) {
          var isVisible, mode;
          mode = workspace.design.mode();
          if (mode === 'app' || mode === 'appview') {
            isVisible = false;
          } else {
            isVisible = true;
          }
          if (typeof toggle === "function") {
            toggle(isVisible);
          }
          return isVisible;
        },
        changeVisible: true,
        click: function(event) {
          var btnDom, currentText;
          btnDom = $(event.currentTarget);
          currentText = 'Validate';
          btnDom.text('Validating...');
          return setTimeout(function() {
            MC.ta.validAll();
            btnDom.text(currentText);
            return require(['TaGui'], function(trustedadvisor_main) {
              return trustedadvisor_main.loadModule('statusbar', null);
            });
          }, 50);
        }
      }, {
        name: 'state',
        className: 'status-bar-btn',
        visible: function(toggle, workspace) {
          var appStoped, isVisible, mode;
          mode = workspace.design.mode();
          appStoped = _.every([OpsModel.State.Updating, OpsModel.State.Running, OpsModel.State.Saving], function(state) {
            return !workspace.opsModel.testState(state);
          });
          isVisible = false;
          if (mode === 'app' || mode === 'appedit') {
            isVisible = !appStoped;
          } else if (mode === 'appview') {
            isVisible = false;
          }
          if (typeof toggle === "function") {
            toggle(isVisible);
          }
          return isVisible;
        },
        events: {
          update: [
            {
              obj: ide_event,
              event: ide_event.UPDATE_STATE_STATUS_DATA
            }
          ]
        },
        changeVisible: true,
        update: function($, workspace) {
          var data;
          data = this.renderData(true, workspace);
          $('.state-success b').text(data.successCount);
          return $('.state-failed b').text(data.failCount);
        },
        renderData: function(visible, workspace) {
          var failed, state, stateList, status, succeed, _i, _j, _len, _len1, _ref;
          this.workspace = workspace;
          if (!visible) {
            return {};
          }
          stateList = App.WS.collection.status.find().fetch();
          succeed = failed = 0;
          if (!_.isArray(stateList)) {
            stateList = [stateList];
          }
          for (_i = 0, _len = stateList.length; _i < _len; _i++) {
            state = stateList[_i];
            if (state.app_id !== workspace.opsModel.get('id')) {
              continue;
            }
            if (state.status) {
              _ref = state.status;
              for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                status = _ref[_j];
                if (status.result === 'success') {
                  succeed++;
                } else if (status.result === 'failure') {
                  failed++;
                }
              }
            }
          }
          return {
            successCount: succeed,
            failCount: failed
          };
        },
        click: function(event) {
          return stateStatus.loadModule();
        }
      }
    ];
    itemView = Backbone.View.extend({
      tagName: 'li',
      initialize: function() {
        _.bindAll(this, 'render', 'toggle');
        this.clearGarbage = [];
        return this.needUpdate = [];
      },
      render: function() {
        this.$el.html(this.template(this.data));
        return this;
      },
      toggle: function(showOrHide) {
        return this.$el.toggle(showOrHide);
      },
      remove: function() {
        var garbage, _i, _len, _ref;
        this.$el.remove();
        this.stopListening();
        _ref = this.clearGarbage;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          garbage = _ref[_i];
          if (_.isArray(garbage)) {
            garbage[1].apply(garbage[0], garbage.slice(2));
          } else {
            garbage();
          }
        }
        this.clearGarbage = [];
        this.needUpdate = [];
        return this;
      },
      update: function() {
        var needUpdate, _i, _len, _ref;
        _ref = this.needUpdate;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          needUpdate = _ref[_i];
          needUpdate();
        }
        return this;
      }
    });
    return Backbone.View.extend({
      initialize: function(options) {
        var workspace;
        _.extend(this, options);
        workspace = this.workspace;
        this.itemViews = [];
        this.setElement(this.parent.$el.find(".OEPanelBottom").html(template.frame()));
        return this.renderItem();
      },
      ready: false,
      bindItem: function() {
        var e, event, index, isVisible, item, type, view, wrap$, wrapToggle, wrapUpdate, wrapVisible, _i, _j, _len, _len1, _ref, _ref1;
        _ref = jQuery.extend(true, [], items).reverse();
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          item = _ref[index];
          view = new itemView();
          view.delegateEvents({
            click: item.click
          });
          view.template = template[item.name];
          view.$el.addClass(item.className);
          wrap$ = _.bind(view.$, view);
          wrapToggle = _.bind(view.toggle, view);
          if (_.isFunction(item.visible)) {
            wrapVisible = _.bind(item.visible, item, wrapToggle, this.workspace);
          }
          if (_.isFunction(item.update)) {
            wrapUpdate = _.bind(item.update, item, wrap$, this.workspace);
          }
          _ref1 = item.events;
          for (type in _ref1) {
            event = _ref1[type];
            if (_.isFunction(event)) {
              event = event();
            }
            if (!_.isArray(event)) {
              continue;
            }
            for (_j = 0, _len1 = event.length; _j < _len1; _j++) {
              e = event[_j];
              if (type === 'update') {
                if (e.obj === ide_event) {
                  ide_event.onLongListen(e.event, wrapUpdate);
                  view.clearGarbage.push([ide_event, ide_event.offListen, e.event, wrapUpdate]);
                } else {
                  view.listenTo(e.obj || this.workspace.opsModel, e.event, wrapUpdate);
                }
              }
            }
          }
          if (item.changeVisible) {
            if (item.visible) {
              view.needUpdate.push(wrapVisible);
            }
            if (item.update) {
              view.needUpdate.push(wrapUpdate);
            }
          }
          if (_.isFunction(item.visible)) {
            isVisible = item.visible(view.toggle, this.workspace);
          } else {
            view.toggle(item.visible);
            isVisible = item.visible;
          }
          view.data = (typeof item.renderData === "function" ? item.renderData(isVisible, this.workspace) : void 0) || {};
          if (item.remove) {
            view.clearGarbage.push(_.bind(item.remove, item));
          }
          this.itemViews.push(view);
        }
        return null;
      },
      renderItem: function() {
        var that, view, _i, _len, _ref;
        that = this;
        if (!this.ready) {
          this.bindItem();
          this.ready = true;
        }
        _ref = this.itemViews;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          this.$('ul').append(view.render().el);
        }
        return this;
      },
      update: function() {
        var view, _i, _len, _ref, _results;
        _ref = this.itemViews;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          _results.push(view.update());
        }
        return _results;
      },
      remove: function() {
        var view, _i, _len, _ref;
        this.$el.remove();
        this.stopListening();
        _ref = this.itemViews;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          view.remove();
        }
        return this;
      }
    });
  });

}).call(this);

define('workspaces/oseditor/canvas/TplPopup',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<header class=\"volume-pph\">"
    + escapeExpression(helpers.i18n.call(depth0, "CANVAS.CVS_POP_ATTACHED_VOLUMES", {hash:{},data:data}))
    + " <span>("
    + escapeExpression(((stack1 = (depth0 && depth0.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></header>\n<ul class=\"popup-content popup-volume\">\n\n    ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshot), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        <div class=\"vpp-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"vpp-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "GB</div>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "vpp-snapshot";
  }

function program5(depth0,data) {
  
  
  return "vpp-volume";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"status res-state tooltip "
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n<div class=\"volume-pp-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "CANVAS.CVS_POP_NO_ATTACHED_VOLUME", {hash:{},data:data}))
    + "</div>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.length), {hash:{},inverse:self.program(9, program9, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.volume=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/oseditor/canvas/CpVolume',["CanvasPopup", "./TplPopup", "constant", "CloudResources"], function(CanvasPopup, TplPopup, constant, CloudResources) {
    return CanvasPopup.extend({
      type: "VolumePopup",
      events: {
        "mousedown li": "clickVolume"
      },
      closeOnBlur: true,
      initialize: function() {
        var data, volume, _i, _len, _ref;
        CanvasPopup.prototype.initialize.apply(this, arguments);
        if (this.host) {
          this.listenTo(this.host, "change:volume", this.render);
        }
        data = this.models || [];
        if (data[0] && data[0].get) {
          _ref = this.models;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            volume = _ref[_i];
            this.listenTo(volume, "change:name", this.updateVolume);
            this.listenTo(volume, "change:size", this.updateVolume);
          }
        }
        if (this.selectAtBegin) {
          this.clickVolume({
            currentTarget: this.$el.find('[data-id=' + this.selectAtBegin.id + ']')[0]
          });
        }
      },
      migrate: function(oldPopup) {
        var id;
        id = oldPopup.$el.find(".selected").attr("data-id");
        this.$el.find('[data-id="' + id + '"]').addClass("selected");
      },
      updateVolume: function(volume) {
        var $vol;
        $vol = this.$el.find('[data-id=' + volume.id + ']');
        $vol.children(".vpp-name").text(volume.get("name"));
        $vol.children(".vpp-size").text(volume.get("size") + "GB");
      },
      content: function() {
        var appData, appId, data, volume, _i, _len, _ref;
        data = this.models || [];
        if (data[0] && data[0].get) {
          data = [];
          _ref = this.host.volumes();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            volume = _ref[_i];
            appId = volume.get("appId");
            data.push({
              id: volume.get("id"),
              appId: appId,
              name: volume.get("name"),
              size: volume.get("size"),
              snapshot: volume.get("snapshot")
            });
            if (appId) {
              appData = CloudResources(volume.type, volume.design().region()).get(appId);
              _.last(data).state = (appData != null ? appData.get('state') : void 0) || 'unknown';
            }
          }
        }
        return TplPopup.volume(data);
      },
      clickVolume: function(evt) {
        var $vol, volId;
        if (this.selected === evt.currentTarget) {
          return;
        }
        $vol = $(evt.currentTarget).addClass("selected");
        volId = $vol.attr("data-id");
        this.canvas.selectVolume(volId);
        if (this.selected) {
          $(this.selected).removeClass("selected");
        }
        this.selected = evt.currentTarget;
        if (!this.canvas.design.modeIsApp() && evt.which === 1) {
          $vol.dnd(evt, {
            dropTargets: this.canvas.$el,
            dataTransfer: {
              id: volId
            },
            eventPrefix: "addVol_"
          });
        }
        return false;
      },
      remove: function() {
        this.canvas.selectVolume(null);
        CanvasPopup.prototype.remove.call(this);
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/canvas/CanvasViewOs',["CanvasView", "constant", "i18n!/nls/lang.js", "CanvasManager", "Design", "./CpVolume"], function(CanvasView, constant, lang, CanvasManager, Design, VolumePopup) {
    var OsCanvasView, isPointInRect;
    isPointInRect = function(point, rect) {
      return rect.x1 <= point.x && rect.y1 <= point.y && rect.x2 >= point.x && rect.y2 >= point.y;
    };
    OsCanvasView = CanvasView.extend({
      events: function() {
        return $.extend({
          "addVol_dragover": "__addVolDragOver",
          "addVol_dragleave": "__addVolDragLeave",
          "addVol_drop": "__addVolDrop"
        }, CanvasView.prototype.events);
      },
      recreateStructure: function() {
        this.svg.clear().add([this.svg.group().classes("layer_network"), this.svg.group().classes("layer_subnet"), this.svg.group().classes("layer_line"), this.svg.group().classes("layer_node")]);
      },
      appendNetwork: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_network");
      },
      appendSubnet: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_subnet");
      },
      fixConnection: function(coord, initiator, target) {},
      errorMessageForDrop: function(type) {
        switch (type) {
          case constant.RESTYPE.VOL:
            return lang.CANVAS.WARN_NOTMATCH_VOLUME;
          case constant.RESTYPE.SUBNET:
            return lang.CANVAS.WARN_NOTMATCH_SUBNET;
          case constant.RESTYPE.INSTANCE:
            return lang.CANVAS.WARN_NOTMATCH_INSTANCE_SUBNET;
          case constant.RESTYPE.ENI:
            return lang.CANVAS.WARN_NOTMATCH_ENI;
          case constant.RESTYPE.RT:
            return lang.CANVAS.WARN_NOTMATCH_RTB;
          case constant.RESTYPE.ELB:
            return lang.CANVAS.WARN_NOTMATCH_ELB;
          case constant.RESTYPE.CGW:
            return lang.CANVAS.WARN_NOTMATCH_CGW;
          case constant.RESTYPE.ASG:
            return lang.CANVAS.WARN_NOTMATCH_ASG;
          case constant.RESTYPE.IGW:
            return lang.CANVAS.WARN_NOTMATCH_IGW;
          case constant.RESTYPE.VGW:
            return lang.CANVAS.WARN_NOTMATCH_VGW;
          case constant.RESTYPE.DBSBG:
            return lang.CANVAS.WARN_NOTMATCH_SGP_VPC;
          case constant.RESTYPE.DBINSTANCE:
            return lang.CANVAS.WARN_NOTMATCH_DBINSTANCE_SGP;
        }
      },
      selectVolume: function(volumeId) {
        this.deselectItem(true);
        if (volumeId) {
          this.triggerSelected(constant.RESTYPE.OSVOL, volumeId);
        }
        this.__selectedVolume = volumeId;
        return false;
      },
      isReadOnly: function() {
        return this.design.modeIsApp();
      },
      delSelectedItem: function() {
        var nextVol, res, s, volume;
        if (this.isReadOnly()) {
          return false;
        }
        if (this.__selectedVolume) {
          volume = this.design.component(this.__selectedVolume);
          res = volume.isRemovable();
          if (_.isString(res)) {
            notification("error", res);
            return;
          }
          s = this.__selectedVolume;
          this.__selectedVolume = null;
          volume.remove();
          nextVol = $(".canvas-pp .popup-volume").children().eq(0);
          if (nextVol.length) {
            nextVol.trigger("mousedown");
          } else {
            this.deselectItem();
          }
          return;
        }
        return CanvasView.prototype.delSelectedItem.apply(this, arguments);
      },
      __addVolDragOver: function(evt, data) {
        var dropzones, el, hoverItem, model, pos, r, tgt, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
        this.__scrollOnDrag(data);
        if (!data.volDropTargets) {
          data.hoverItem = null;
          data.volDropTargets = dropzones = [];
          _ref = this.design.componentsOfType(constant.RESTYPE.OSSERVER);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tgt = _ref[_i];
            tgt = this.getItem(tgt.id);
            _ref1 = tgt.$el;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              el = _ref1[_j];
              r = tgt.rect(el);
              r.tgt = tgt;
              r.el = el;
              dropzones.push(r);
            }
          }
        }
        if (!data.effect) {
          data.effect = true;
          _ref2 = data.volDropTargets || [];
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            tgt = _ref2[_k];
            CanvasManager.addClass(tgt.tgt.$el, "droppable");
          }
        }
        pos = this.__localToCanvasCoor(data.pageX - data.zoneDimension.x1, data.pageY - data.zoneDimension.y1);
        hoverItem = null;
        _ref3 = data.volDropTargets;
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          tgt = _ref3[_l];
          if (isPointInRect(pos, tgt)) {
            hoverItem = tgt;
            break;
          }
        }
        if (hoverItem !== data.hoverItem) {
          if (data.popup) {
            data.popup.remove();
          }
          data.hoverItem = hoverItem;
          if (hoverItem) {
            model = hoverItem.tgt.model;
            data.popup = new VolumePopup({
              attachment: hoverItem.el,
              host: model,
              models: model.volumes(),
              canvas: this
            });
          }
        }
      },
      __addVolDragLeave: function(evt, data) {
        var tgt, _i, _len, _ref;
        this.__clearDragScroll();
        _ref = data.volDropTargets || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tgt = _ref[_i];
          CanvasManager.removeClass(tgt.tgt.$el, "droppable");
        }
        data.effect = false;
        if (data.popup) {
          data.popup.remove();
        }
      },
      __addVolDrop: function(evt, data) {
        var VolumeModel, attr, doable, oldServer, owner, v, volume;
        if (!data.hoverItem) {
          return;
        }
        attr = data.dataTransfer || {};
        owner = data.hoverItem.tgt.model;
        if (attr.id) {
          volume = this.design.component(attr.id);
          oldServer = volume.getOwner();
          doable = volume.isReparentable(owner);
          if (_.isString(doable)) {
            return notification("error", doable);
          } else if (doable) {
            volume.attachTo(owner);
            this.selectItem(data.hoverItem.el);
          }
          return;
        }
        attr.owner = owner;
        VolumeModel = Design.modelClassForType(constant.RESTYPE.OSVOL);
        v = new VolumeModel(attr);
        new VolumePopup({
          attachment: data.hoverItem.el,
          host: owner,
          models: owner.volumes(),
          canvas: this,
          selectAtBegin: v
        });
      }
    });
    return OsCanvasView;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/OsViewStack',["CoreEditorView", "./template/TplOsEditor", "./subviews/Panel", "./subviews/Toolbar", "./subviews/Statusbar", "./canvas/CanvasViewOs"], function(CoreEditorView, TplOsEditor, RightPanel, Toolbar, Statusbar, CanvasView) {
    return CoreEditorView.extend({
      template: TplOsEditor,
      constructor: function(options) {
        _.extend(options, {
          TopPanel: Toolbar,
          RightPanel: RightPanel,
          BottomPanel: Statusbar,
          CanvasView: CanvasView
        });
        return CoreEditorView.apply(this, arguments);
      },
      initialize: function() {
        this.panel = this.propertyPanel;
        this.$el.addClass("openstack").find(".OEPanelLeft").addClass("force-hidden");
      },
      showProperty: function() {
        this.panel.openProperty();
        return false;
      },
      showResource: function() {
        this.panel.openResource();
        return false;
      },
      showGlobal: function() {
        this.panel.openConfig();
        return false;
      },
      showStateEditor: function() {
        this.panel.openState();
        return false;
      },
      onCanvasDoubleClick: function() {
        return this.panel.show().openCurrent();
      },
      onItemSelected: function(type, id) {
        if (!id && !type) {
          this.panel.openConfig();
          return;
        }
        return this.panel.openProperty({
          uid: id,
          type: type
        });
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/DesignOs',["Design", "constant"], function(Design, constant) {
    var OsDesign;
    OsDesign = Design.extend({
      instancesNoUserData: function() {
        var instanceModels, result;
        result = true;
        instanceModels = Design.modelClassForType(constant.RESTYPE.OSSERVER).allObjects();
        _.each(instanceModels, function(serverModel) {
          result = serverModel.get('userData') ? false : true;
          return null;
        });
        return result;
      }
    });
    return OsDesign;
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/oseditor/OsEditorStack',["CoreEditor", "./OsViewStack", "./model/DesignOs", "CloudResources", "constant"], function(CoreEditor, StackView, DesignOs, CloudResources, constant) {

    /*
      StackEditor is mainly for editing a stack
     */
    var StackEditor;
    StackEditor = (function(_super) {
      __extends(StackEditor, _super);

      function StackEditor() {
        return StackEditor.__super__.constructor.apply(this, arguments);
      }

      StackEditor.prototype.viewClass = StackView;

      StackEditor.prototype.designClass = DesignOs;

      StackEditor.prototype.title = function() {
        return (this.design || this.opsModel).get("name") + " - stack";
      };

      StackEditor.prototype.isReady = function() {
        var region, stateModule;
        if (this.__hasAdditionalData) {
          return true;
        }
        if (!this.opsModel.hasJsonData() || !this.opsModel.isPersisted()) {
          return false;
        }
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        return CloudResources(constant.RESTYPE.OSFLAVOR, region).isReady() && CloudResources(constant.RESTYPE.OSIMAGE, region).isReady() && CloudResources(constant.RESTYPE.OSKP, region).isReady() && CloudResources(constant.RESTYPE.OSNETWORK, region).isReady() && CloudResources(constant.RESTYPE.OSSNAP, region).isReady() && !!App.model.getStateModule(stateModule.repo, stateModule.tag);
      };

      StackEditor.prototype.fetchAdditionalData = function() {
        var jobs, region, stateModule;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        jobs = [App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(constant.RESTYPE.OSFLAVOR, region).fetch(), CloudResources(constant.RESTYPE.OSIMAGE, region).fetch(), CloudResources(constant.RESTYPE.OSKP, region).fetch(), CloudResources(constant.RESTYPE.OSSNAP, region).fetch(), CloudResources(constant.RESTYPE.OSNETWORK, region).fetch()];
        if (!this.opsModel.isPersisted()) {
          jobs.unshift(this.opsModel.save());
        }
        return Q.all(jobs);
      };

      StackEditor.prototype.isModified = function() {
        if (!this.opsModel.isPersisted()) {
          return true;
        }
        return this.design && this.design.isModified();
      };

      return StackEditor;

    })(CoreEditor);
    return StackEditor;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/OsViewApp',["CoreEditorViewApp", "./template/TplOsEditor", "./subviews/Panel", "./subviews/Toolbar", "./subviews/Statusbar", "./canvas/CanvasViewOs"], function(CoreEditorViewApp, TplOsEditor, RightPanel, Toolbar, Statusbar, CanvasView) {
    return CoreEditorViewApp.extend({
      template: TplOsEditor,
      constructor: function(options) {
        _.extend(options, {
          TopPanel: Toolbar,
          RightPanel: RightPanel,
          BottomPanel: Statusbar,
          CanvasView: CanvasView
        });
        return CoreEditorViewApp.apply(this, arguments);
      },
      initialize: function() {
        this.panel = this.propertyPanel;
        this.$el.addClass("openstack").find(".OEPanelLeft").addClass("force-hidden");
        CoreEditorViewApp.prototype.initialize.apply(this, arguments);
      },
      switchMode: function(mode) {
        this.toolbar.updateTbBtns();
        this.statusbar.update();
        this.propertyPanel.openCurrent();
      },
      showProperty: function() {
        this.panel.openProperty();
        return false;
      },
      showResource: function() {},
      showGlobal: function() {
        this.panel.openConfig();
        return false;
      },
      showStateEditor: function() {
        this.panel.openState();
        return false;
      },
      onCanvasDoubleClick: function() {
        return this.panel.show().openCurrent();
      },
      onItemSelected: function(type, id) {
        if (!id && !type) {
          this.panel.openConfig();
          return;
        }
        return this.panel.openProperty({
          uid: id,
          type: type
        });
      }
    });
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/oseditor/OsEditorApp',["CoreEditorApp", "./OsViewApp", "OpsModel", "CloudResources", "constant"], function(CoreEditorApp, AppView, OpsModel, CloudResources, constant) {
    var AppEditor;
    AppEditor = (function(_super) {
      __extends(AppEditor, _super);

      function AppEditor() {
        return AppEditor.__super__.constructor.apply(this, arguments);
      }

      AppEditor.prototype.viewClass = AppView;

      AppEditor.prototype.fetchAdditionalData = function() {
        var region, self, stateModule;
        self = this;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        return Q.all([App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(constant.RESTYPE.OSFLAVOR, region).fetch(), CloudResources(constant.RESTYPE.OSIMAGE, region).fetch(), CloudResources(constant.RESTYPE.OSKP, region).fetch(), CloudResources(constant.RESTYPE.OSIMAGE, region).fetch(), CloudResources(constant.RESTYPE.OSNETWORK, region).fetch(), CloudResources(constant.RESTYPE.OSVOL, region).fetch(), this.loadVpcResource()]);
      };

      return AppEditor;

    })(CoreEditorApp);
    return AppEditor;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelFloatIp',["ComplexResModel", "constant", "Design"], function(ComplexResModel, constant, Design) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSFIP,
      newNameTmpl: "FloatIp-",
      serialize: function() {
        var extNetworkAry, extNetworkId, port, port_id;
        port = this.connectionTargets("OsFloatIpUsage")[0];
        if (!port) {
          return;
        }
        extNetworkAry = this.design().componentsOfType(constant.RESTYPE.OSEXTNET);
        if (extNetworkAry && extNetworkAry.length) {
          extNetworkId = extNetworkAry[0].getResourceId();
        }
        port_id = port.createRef(port.type === constant.RESTYPE.OSLISTENER ? "port_id" : "id");
        return {
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              fixed_ip_address: port.createRef("fixed_ips.0.ip_address"),
              floating_ip_address: this.get("address") || '',
              port_id: port_id,
              floating_network_id: extNetworkId
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSFIP,
      deserialize: function(data, layout_data, resolve) {
        var IpUsage, fip, port;
        fip = new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          address: data.resource.floating_ip_address
        });
        port = resolve(MC.extractID(data.resource.port_id));
        if (port) {
          IpUsage = Design.modelClassForType("OsFloatIpUsage");
          new IpUsage(fip, port);
        }
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelHealthMonitor',["ComplexResModel", "constant"], function(ComplexResModel, constant) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSHM,
      newNameTmpl: "health-monitor",
      defaults: function() {
        return {
          type: 'PING',
          delay: 30,
          timeout: 30,
          maxRetries: 3,
          urlPath: '/index.html',
          expectedCodes: '200-299'
        };
      },
      serialize: function() {
        var component;
        component = {
          name: this.get('name'),
          type: this.type,
          uid: this.id,
          resource: {
            id: this.get('appId'),
            name: this.get('name'),
            type: this.get('type'),
            delay: this.get('delay'),
            timeout: this.get('timeout'),
            max_retries: this.get('maxRetries'),
            url_path: this.get('urlPath'),
            expected_codes: this.get('expectedCodes')
          }
        };
        return {
          component: component
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSHM,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          type: data.resource.type,
          deley: data.resource.deley,
          timeout: data.resource.timeout,
          maxRetries: data.resource.max_retries,
          urlPath: data.resource.url_path,
          expectedCodes: data.resource.expected_codes
        });
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelPort',["ComplexResModel", "constant", "Design"], function(ComplexResModel, constant, Design) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSPORT,
      newNameTmpl: "Port-",
      defaults: function() {
        return {
          ip: "",
          macAddress: ""
        };
      },
      initialize: function(attributes, option) {
        if (option.createByUser) {
          Design.modelClassForType(constant.RESTYPE.OSSG).attachDefaultSG(this);
          return this.assignIP();
        }
      },
      assignIP: function() {
        var availableIP, parent;
        parent = this.parent();
        if (this.isEmbedded()) {
          parent = this.owner().parent();
        }
        availableIP = Model.getAvailableIP(parent);
        if (availableIP) {
          return this.set('ip', availableIP);
        }
      },
      onParentChanged: function(oldParent) {
        if (oldParent) {
          if (!this.isEmbedded()) {
            return this.assignIP();
          }
        }
      },
      owner: function() {
        return this.connectionTargets("OsPortUsage")[0];
      },
      isAttached: function() {
        return !!this.owner();
      },
      isVisual: function() {
        return !this.isEmbedded();
      },
      isEmbedded: function() {
        if (!this.parent()) {
          return true;
        }
        return this.owner() && this.owner().embedPort() === this;
      },
      setFloatingIp: function(hasFip) {
        var Usage, oldUsage;
        oldUsage = this.connections("OsFloatIpUsage")[0];
        if (!hasFip) {
          if (oldUsage) {
            oldUsage.remove();
          }
        } else {
          if (!oldUsage) {
            Usage = Design.modelClassForType("OsFloatIpUsage");
            new Usage(this);
          }
        }
        this.owner().trigger('change:fip');
      },
      getFloatingIp: function() {
        return this.connectionTargets("OsFloatIpUsage")[0];
      },
      serialize: function() {
        var subnet;
        if (this.isEmbedded()) {
          subnet = this.owner().parent();
        } else {
          subnet = this.parent();
        }
        return {
          layout: this.generateLayout(),
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name"),
              mac_address: this.get("macAddress"),
              security_groups: this.connectionTargets("OsSgAsso").map(function(sg) {
                return sg.createRef("id");
              }),
              network_id: subnet.parent().createRef("id"),
              device_id: this.owner() ? this.owner().createRef("id") : "",
              fixed_ips: [
                {
                  subnet_id: subnet.createRef("id"),
                  ip_address: this.get("ip")
                }
              ]
            }
          }
        };
      },
      setIp: function(ip) {
        return this.set("ip", ip);
      }
    }, {
      handleTypes: constant.RESTYPE.OSPORT,
      deserialize: function(data, layout_data, resolve) {
        var SgAsso, port, sg, _i, _len, _ref;
        port = new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          parent: resolve(MC.extractID(data.resource.fixed_ips[0].subnet_id)),
          ip: data.resource.fixed_ips[0].ip_address,
          macAddress: data.resource.mac_address,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        SgAsso = Design.modelClassForType("OsSgAsso");
        _ref = data.resource.security_groups;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          new SgAsso(port, resolve(MC.extractID(sg)));
        }
      },
      getAvailableIP: function(subnetModel) {
        var allListenerModels, allPortModels, availableIPAry, filterList, ipObj, models, subnetCIDR;
        subnetCIDR = subnetModel.get('cidr');
        filterList = [];
        allPortModels = Design.modelClassForType(constant.RESTYPE.OSPORT).allObjects();
        allListenerModels = Design.modelClassForType(constant.RESTYPE.OSLISTENER).allObjects();
        models = allPortModels.concat(allListenerModels);
        _.each(models, function(model) {
          var currentSubnetModel;
          if (model.isEmbedded && model.isEmbedded()) {
            currentSubnetModel = model.owner().parent();
          } else {
            currentSubnetModel = model.parent();
          }
          if (currentSubnetModel === subnetModel) {
            filterList.push(model.get('ip'));
          }
          return null;
        });
        availableIPAry = Design.modelClassForType(constant.RESTYPE.ENI).getAvailableIPInCIDR(subnetCIDR, filterList, 0);
        if (availableIPAry && availableIPAry[availableIPAry.length - 1]) {
          ipObj = availableIPAry[availableIPAry.length - 1];
          if (ipObj.available) {
            return ipObj.ip;
          }
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelListener',["./OsModelPort", "constant", "Design"], function(OsModelPort, constant, Design) {
    var Model;
    Model = OsModelPort.extend({
      type: constant.RESTYPE.OSLISTENER,
      newNameTmpl: "Listener-",
      defaults: function() {
        return {
          protocol: 'HTTP',
          port: 80,
          limit: 1000,
          ip: ""
        };
      },
      initialize: function(attr, options) {
        var Asso;
        console.assert(options.pool, "Pool must be specified when creating a listener");
        Asso = Design.modelClassForType("OsListenerAsso");
        new Asso(this, options.pool);
        if (options.createByUser) {
          Design.modelClassForType(constant.RESTYPE.OSSG).attachDefaultSG(this);
          this.assignIP();
        }
      },
      assignIP: function() {
        var availableIP;
        availableIP = Design.modelClassForType(constant.RESTYPE.OSPORT).getAvailableIP(this.parent());
        if (availableIP) {
          return this.set('ip', availableIP);
        }
      },
      onParentChanged: function(oldParent) {
        if (oldParent) {
          return this.assignIP();
        }
      },
      isAttached: function() {
        return true;
      },
      isVisual: function() {
        return true;
      },
      isEmbedded: function() {
        return false;
      },
      serialize: function() {
        return {
          layout: this.generateLayout(),
          component: {
            name: this.get('name'),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get('appId'),
              name: this.get('name'),
              pool_id: this.connectionTargets('OsListenerAsso')[0].createRef('id'),
              subnet_id: this.parent().createRef('id'),
              connection_limit: this.get('limit'),
              protocol: this.get('protocol'),
              protocol_port: this.get('port'),
              port_id: this.get("portId"),
              address: this.get("ip"),
              security_groups: this.connectionTargets("OsSgAsso").map(function(sg) {
                return sg.createRef("id");
              })
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSLISTENER,
      deserialize: function(data, layout_data, resolve) {
        var SgAsso, listener, sg, _i, _len, _ref;
        listener = new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          limit: data.resource.connection_limit,
          port: data.resource.protocol_port,
          protocol: data.resource.protocol,
          parent: resolve(MC.extractID(data.resource.subnet_id)),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          portId: data.resource.port_id,
          ip: data.resource.address
        }, {
          pool: resolve(MC.extractID(data.resource.pool_id))
        });
        SgAsso = Design.modelClassForType("OsSgAsso");
        _ref = data.resource.security_groups || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          new SgAsso(listener, resolve(MC.extractID(sg)));
        }
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelNetwork',["GroupModel", "constant"], function(GroupModel, constant) {
    var Model;
    Model = GroupModel.extend({
      type: constant.RESTYPE.OSNETWORK,
      newNameTmpl: "Network-",
      isRemovable: function() {
        return false;
      },
      serialize: function() {
        return {
          layout: this.generateLayout(),
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name")
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSNETWORK,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1]
        });
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelPool',["ComplexResModel", "constant", "Design"], function(ComplexResModel, constant, Design) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSPOOL,
      newNameTmpl: "Pool-",
      defaults: function() {
        return {
          protocol: 'HTTP',
          method: 'ROUND_ROBIN'
        };
      },
      initialize: function(attr, options) {
        var HmModel;
        if (!attr.healthMonitors) {
          HmModel = Design.modelClassForType(constant.RESTYPE.OSHM);
          this.attributes.healthMonitors = [new HmModel()];
        }
      },
      ports: function() {
        var p, ports, _i, _len, _ref;
        ports = [];
        _ref = this.connectionTargets("OsPoolMembership");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          if (p.type === constant.RESTYPE.OSSERVER) {
            ports.push(p.embedPort());
          } else {
            ports.push(p);
          }
        }
        return ports;
      },
      addNewHm: function() {
        var MonitorModel, monitor;
        MonitorModel = Design.modelClassForType(constant.RESTYPE.OSHM);
        monitor = new MonitorModel();
        this.get("healthMonitors").push(monitor);
        return monitor;
      },
      getHm: function(id) {
        var hm, _i, _len, _ref;
        _ref = this.get("healthMonitors");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          hm = _ref[_i];
          if (hm.id === id) {
            return hm;
          }
        }
        return null;
      },
      removeHm: function(idOrModel) {
        var h, idx, _i, _len, _ref;
        _ref = this.get("healthMonitors");
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          h = _ref[idx];
          if (h === idOrModel || h.id === idOrModel) {
            this.get("healthMonitors").splice(idx, 1);
            break;
          }
        }
      },
      remove: function() {
        var hm, _i, _len, _ref;
        _ref = this.get("healthMonitors");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          hm = _ref[_i];
          hm.remove();
        }
        return ComplexResModel.prototype.remove.apply(this, arguments);
      },
      serialize: function() {
        var member;
        member = _.map(this.connections('OsPoolMembership'), function(c) {
          var target;
          target = c.getOtherTarget(constant.RESTYPE.OSPOOL);
          if (target.type === constant.RESTYPE.OSSERVER) {
            target = target.embedPort();
          }
          return {
            protocol_port: c.get('port'),
            address: target.createRef('fixed_ips.0.ip_address'),
            weight: c.get('weight'),
            id: c.get('appId')
          };
        });
        return {
          layout: this.generateLayout(),
          component: {
            name: this.get('name'),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get('appId'),
              name: this.get('name'),
              protocol: this.get('protocol'),
              lb_method: this.get('method'),
              subnet_id: this.parent().createRef('id'),
              healthmonitors: this.get("healthMonitors").map(function(hm) {
                return hm.createRef('id');
              }),
              member: member
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSPOOL,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          protocol: data.resource.protocol,
          method: data.resource.lb_method,
          parent: resolve(MC.extractID(data.resource.subnet_id)),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          healthMonitors: (data.resource.healthmonitors || []).map(function(hmid) {
            return resolve(MC.extractID(hmid));
          })
        });
      },
      postDeserialize: function(data, layout_data) {
        var Membership, design, member, pool, _i, _len, _ref;
        design = Design.instance();
        pool = design.component(data.uid);
        Membership = Design.modelClassForType("OsPoolMembership");
        _ref = data.resource.member;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          member = _ref[_i];
          new Membership(pool, design.component(MC.extractID(member.address)), {
            appId: member.id,
            weight: member.weight,
            port: member.protocol_port
          });
        }
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelRt',["ComplexResModel", "constant", "Design"], function(ComplexResModel, constant, Design) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSRT,
      newNameTmpl: "Router-",
      connect: function(cn) {
        if (cn.type === 'OsExtRouterAttach') {
          this.set("public", true);
        }
      },
      disconnect: function(cn) {
        if (cn.type === 'OsExtRouterAttach') {
          this.set("public", false);
        }
      },
      serialize: function() {
        var extNetwork;
        extNetwork = this.connectionTargets("OsExtRouterAttach")[0];
        if (extNetwork) {
          extNetwork = {
            network_id: extNetwork.createRef("id")
          };
        }
        return {
          layout: this.generateLayout(),
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name"),
              external_gateway_info: extNetwork || {},
              router_interface: this.connectionTargets("OsRouterAsso").map(function(subnet) {
                return {
                  subnet_id: subnet.createRef("id")
                };
              })
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSRT,
      deserialize: function(data, layout_data, resolve) {
        var Asso, Attach, router, subnet, _i, _len, _ref;
        router = new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        Asso = Design.modelClassForType("OsRouterAsso");
        _ref = data.resource.router_interface;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subnet = _ref[_i];
          new Asso(router, resolve(MC.extractID(subnet.subnet_id)));
        }
        Attach = Design.modelClassForType("OsExtRouterAttach");
        new Attach(router, resolve(MC.extractID(data.resource.external_gateway_info.network_id)));
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelKeypair',["constant", "ComplexResModel", "ConnectionModel"], function(constant, ComplexResModel, ConnectionModel) {
    var KeypairModel, KeypairUsage;
    KeypairUsage = ConnectionModel.extend({
      type: "KeypairUsage",
      oneToMany: constant.RESTYPE.OSKP,
      serialize: function(components) {
        var groupMembers, kp, member, otherTarget, otherTargetComp, ref, _i, _len;
        kp = this.getTarget(constant.RESTYPE.OSKP);
        if (kp) {
          otherTarget = this.getOtherTarget(kp);
          otherTargetComp = components[otherTarget.id];
          if (!otherTargetComp) {
            return;
          }
          ref = kp.createRef("KeyName");
          otherTargetComp.resource.KeyName = ref;
          groupMembers = otherTarget.groupMembers ? otherTarget.groupMembers() : [];
          for (_i = 0, _len = groupMembers.length; _i < _len; _i++) {
            member = groupMembers[_i];
            if (components[member.id]) {
              components[member.id].resource.KeyName = ref;
            }
          }
        }
        return null;
      }
    });
    KeypairModel = ComplexResModel.extend({
      type: constant.RESTYPE.OSKP,
      defaults: {
        fingerprint: "",
        isSet: false
      },
      isVisual: function() {
        return false;
      },
      isDefault: function() {
        return this.get('name') === 'DefaultKP';
      },
      remove: function() {
        var defaultKp, i, _i, _len, _ref;
        defaultKp = KeypairModel.getDefaultKP();
        _ref = this.connectionTargets("KeypairUsage");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          new KeypairUsage(defaultKp, i);
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      assignTo: function(target) {
        return new KeypairUsage(this, target);
      },
      dissociate: function(target) {
        var conns;
        conns = this.connections();
        return _.each(conns, function(c) {
          if (c.getOtherTarget(constant.RESTYPE.OSKP) === target) {
            return c.remove();
          }
        });
      },
      isSet: function() {
        return this.get('appId') && this.get('fingerprint');
      },
      getKPList: function() {
        var kp, kps, _i, _len, _ref;
        kps = [];
        _ref = KeypairModel.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          kp = _ref[_i];
          kps.push({
            id: kp.id,
            name: kp.get("name"),
            selected: kp === this,
            using: kp.connections("KeypairUsage").length > 1
          });
        }
        return _.sortBy(kps, function(a, b) {
          if (a.name === "DefaultKP") {
            return -1;
          }
          if (b.name === "DefaultKP") {
            return 1;
          }
          if (a.name > b.name) {
            return 1;
          }
          if (a.name === b.name) {
            return 0;
          }
          if (a.name < b.name) {
            return -1;
          }
        });
      },
      serialize: function() {
        return {
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              fingerprint: this.get("fingerprint") || '',
              keyName: this.get("keyName") || ''
            }
          }
        };
      }
    }, {
      getDefaultKP: function() {
        return _.find(KeypairModel.allObjects(), function(obj) {
          return obj.get("name") === "DefaultKP";
        });
      },
      setDefaultKP: function(keyName, fingerprint) {
        var defaultKP;
        defaultKP = _.find(KeypairModel.allObjects(), function(obj) {
          return obj.get("name") === "DefaultKP";
        });
        defaultKP.set('appId', keyName || '');
        defaultKP.set('fingerprint', fingerprint || '');
        return defaultKP.set('isSet', true);
      },
      diffJson: function() {},
      handleTypes: constant.RESTYPE.OSKP,
      deserialize: function(data, layout_data, resolve) {
        new KeypairModel({
          id: data.uid,
          name: data.name,
          keyName: data.resource.keyName,
          fingerprint: data.resource.fingerprint
        });
        return null;
      }
    });
    return KeypairModel;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelServer',["ComplexResModel", "constant", "Design", "CloudResources"], function(ComplexResModel, constant, Design, CloudResources) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSSERVER,
      newNameTmpl: "host-",
      defaults: function() {
        return {
          userData: "",
          meta: "",
          adminPass: "12345678",
          keypair: "$DefaultKeyPair",
          flavorId: "6",
          availabilityZone: "",
          imageId: "",
          credential: "keypair",
          state: []
        };
      },
      initialize: function(attr, option) {
        var PortModel, PortUsage, newPort;
        option = option || {};
        console.assert(attr.imageId, "Invalid attributes when creating OsModelServer", attr);
        this.setImage(attr.imageId);
        this.setCredential(attr);
        if (option.createByUser) {
          PortModel = Design.modelClassForType(constant.RESTYPE.OSPORT);
          PortUsage = Design.modelClassForType("OsPortUsage");
          newPort = new PortModel({
            name: this.get('name') + "-port"
          });
          new PortUsage(this, newPort);
          Design.modelClassForType(constant.RESTYPE.OSSG).attachDefaultSG(newPort);
          this.assignIP();
        }
        return null;
      },
      assignIP: function() {
        var availableIP;
        availableIP = Design.modelClassForType(constant.RESTYPE.OSPORT).getAvailableIP(this.parent());
        if (this.embedPort() && availableIP) {
          return this.embedPort().set('ip', availableIP);
        }
      },
      onParentChanged: function(oldParent) {
        if (oldParent) {
          return this.assignIP();
        }
      },
      embedPort: function() {
        return this.connectionTargets("OsPortUsage")[0];
      },
      volumes: function() {
        return this.connectionTargets("OsVolumeUsage");
      },
      setCredential: function(attr) {
        if (attr.keypair) {
          return this.set('credential', "keypair");
        } else if (attr.adminPass) {
          return this.set('credential', 'adminPass');
        }
      },
      setImage: function(imageId) {
        var cached, image;
        this.set("imageId", imageId);
        image = this.getImage();
        cached = this.get("cachedAmi");
        if (image && cached) {
          cached.os_distro = image.os_distro;
          cached.architecture = image.architecture;
        }
        return null;
      },
      getImage: function() {
        var image;
        image = CloudResources(constant.RESTYPE.OSIMAGE, this.design().region()).get(this.get("imageId"));
        if (image) {
          return image.toJSON();
        } else {
          return null;
        }
      },
      getStateData: function() {
        return this.get("state");
      },
      setStateData: function(stateAryData) {
        return this.set("state", stateAryData);
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          state: this.get("state"),
          resource: {
            id: this.get("appId"),
            name: this.get("name"),
            flavor: this.get('flavorId'),
            image: this.get('imageId'),
            meta: this.get('meta'),
            NICS: this.connectionTargets("OsPortUsage").map(function(port) {
              return {
                "port-id": port.createRef("id")
              };
            }),
            userdata: this.get('userData'),
            availabilityZone: this.get('availabilityZone'),
            blockDeviceMapping: []
          }
        };
        if (this.get('credential') === "keypair") {
          component.resource.key_name = this.get("keypair");
          component.resource.adminPass = "";
        } else {
          component.resource.key_name = "";
          component.resource.adminPass = this.get("adminPass");
        }
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSSERVER,
      deserialize: function(data, layout_data, resolve) {
        var PortUsage, idx, port, server, _i, _len, _ref;
        server = new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          flavorId: data.resource.flavor,
          imageId: data.resource.image,
          adminPass: data.resource.adminPass,
          keypair: data.resource.key_name,
          state: data.state,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        PortUsage = Design.modelClassForType("OsPortUsage");
        _ref = data.resource.NICS || [];
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          port = _ref[idx];
          port = resolve(MC.extractID(port["port-id"]));
          if (idx === 0) {
            port.parent().addChild(server);
            port.parent().removeChild(port);
          }
          new PortUsage(server, port);
        }
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelSg',["ComplexResModel", "constant"], function(ComplexResModel, constant) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSSG,
      newNameTmpl: "SecurityGroup-",
      initialize: function() {},
      defaults: function() {
        return {
          description: "custom security group",
          rules: []
        };
      },
      attachSG: function(targetModel) {
        var SgAsso;
        SgAsso = Design.modelClassForType("OsSgAsso");
        return new SgAsso(targetModel, this);
      },
      unAttachSG: function(targetModel) {
        var SgAsso;
        SgAsso = Design.modelClassForType("OsSgAsso");
        return (new SgAsso(targetModel, this)).remove();
      },
      addRule: function(ruleData) {
        var RuleModel, rule, _i, _len, _ref;
        _ref = this.get("rules");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          if (rule.isEqualToData(ruleData)) {
            return false;
          }
        }
        RuleModel = Design.modelClassForType(constant.RESTYPE.OSSGRULE);
        rule = new RuleModel(ruleData);
        this.get("rules").push(rule);
        return rule.get('ruleId');
      },
      getRule: function(ruleId) {
        var rule, _i, _len, _ref;
        _ref = this.get("rules");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          if (rule.get('ruleId') === ruleId) {
            return rule;
          }
        }
        return null;
      },
      updateRule: function(ruleId, ruleData) {
        var rule, _i, _len, _ref;
        _ref = this.get("rules");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          if (rule.get('ruleId') === ruleId) {
            rule.set(ruleData);
            return;
          }
        }
      },
      removeRule: function(idOrModel) {
        var idx, r, _i, _len, _ref;
        _ref = this.get("rules");
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          r = _ref[idx];
          if (r === idOrModel || r.get('ruleId') === idOrModel) {
            this.get("rules").splice(idx, 1);
            break;
          }
        }
      },
      getMemberList: function() {
        return _.filter(this.connectionTargets('OsSgAsso'), function(tgt) {
          return true;
        });
      },
      isDefault: function() {
        return this.get('name') === 'DefaultSG';
      },
      remove: function() {
        var rule, _i, _len, _ref;
        _ref = this.get("rules");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          rule.remove();
        }
        return ComplexResModel.prototype.remove.apply(this, arguments);
      },
      serialize: function() {
        var _ref;
        return {
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name"),
              description: this.get("description"),
              rules: (_ref = this.get("rules")) != null ? _ref.map(function(rule) {
                return rule.toJSON();
              }) : void 0
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSSG,
      deserialize: function(data, layout_data, resolve) {
        var RuleModel, rules, sgModel;
        RuleModel = Design.modelClassForType(constant.RESTYPE.OSSGRULE);
        sgModel = new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          description: data.resource.description
        });
        rules = data.resource.rules.map(function(rule) {
          var rModel;
          if (rule.remote_group_id) {
            rule.remote_group_id = resolve(MC.extractID(rule.remote_group_id));
          }
          rModel = new RuleModel();
          rModel.fromJSON(rule);
          return rModel;
        });
        sgModel.set('rules', rules);
      },
      getDefaultSg: function() {
        return _.find(Model.allObjects(), function(obj) {
          return obj.isDefault();
        });
      },
      attachDefaultSG: function(targetModel) {
        var SgAsso, defaultSg;
        defaultSg = Model.getDefaultSg();
        SgAsso = Design.modelClassForType('OsSgAsso');
        return new SgAsso(defaultSg, targetModel);
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelSgRule',["ComplexResModel", "constant"], function(ComplexResModel, constant) {
    return ComplexResModel.extend({
      type: constant.RESTYPE.OSSGRULE,
      newNameTmpl: "SgRule-",
      defaults: {
        direction: "",
        portMin: "",
        portMax: "",
        protocol: "",
        sg: null,
        ip: null,
        appId: "",
        id: "",
        ruleId: ""
      },
      initialize: function() {
        return this.set('ruleId', MC.guid());
      },
      setTarget: function(ipOrSgModel) {
        var attr;
        if (typeof ip === "string") {
          attr = {
            ip: ipOrSgModel,
            sg: null
          };
        } else {
          attr = {
            ip: null,
            sg: ipOrSgModel
          };
        }
        this.set(attr);
      },
      toJSON: function() {
        var sg;
        sg = this.get("sg");
        return {
          direction: this.get("direction"),
          port_range_min: this.get("portMin"),
          port_range_max: this.get("portMax"),
          protocol: this.get("protocol"),
          remote_group_id: sg ? sg.createRef("id") : null,
          remote_ip_prefix: this.get("ip"),
          id: this.get("appId")
        };
      },
      fromJSON: function(json) {
        var attr;
        attr = this.attributes;
        attr.direction = json.direction;
        attr.portMin = json.port_range_min;
        attr.portMax = json.port_range_max;
        attr.protocol = json.protocol;
        attr.id = json.id;
        attr.sg = json.remote_group_id ? json.remote_group_id : null;
        attr.ip = json.remote_ip_prefix ? json.remote_ip_prefix : null;
      },
      isEqualToData: function(data) {
        var attr;
        attr = this.attributes;
        if (attr.direction !== data.direction) {
          return false;
        }
        if (attr.portMin !== data.portMin) {
          return false;
        }
        if (attr.portMax !== data.portMax) {
          return false;
        }
        if (attr.protocol !== data.protocol) {
          return false;
        }
        if (attr.sg !== data.sg) {
          return false;
        }
        if (attr.ip !== data.ip) {
          return false;
        }
        return true;
      },
      serialize: function() {}
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelSubnet',["GroupModel", "constant"], function(GroupModel, constant) {
    var Model;
    Model = GroupModel.extend({
      type: constant.RESTYPE.OSSUBNET,
      newNameTmpl: "Subnet-",
      defaults: function() {
        return {
          "public": false,
          cidr: "",
          dhcp: true
        };
      },
      initialize: function(attributes, option) {
        if (option.createByUser) {
          return this.set('cidr', this.generateCidr());
        }
      },
      generateCidr: function() {
        var comp, currentSubnetNum, currentVPCCIDR, maxSubnetNum, resultSubnetNum, subnetCIDR, subnetCIDRAry, subnetCIDRIPAry, subnetCIDRIPStr, subnetCIDRSuffix, vpcCIDRAry, vpcCIDRIPStr, vpcCIDRIPStrAry, vpcCIDRSuffix, _i, _len, _ref;
        currentVPCCIDR = '10.0.0.0/8';
        vpcCIDRAry = currentVPCCIDR.split('/');
        vpcCIDRIPStr = vpcCIDRAry[0];
        vpcCIDRIPStrAry = vpcCIDRIPStr.split('.');
        vpcCIDRSuffix = Number(vpcCIDRAry[1]);
        maxSubnetNum = -1;
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          comp = _ref[_i];
          subnetCIDR = comp.get("cidr");
          subnetCIDRAry = subnetCIDR.split('/');
          subnetCIDRIPStr = subnetCIDRAry[0];
          subnetCIDRSuffix = Number(subnetCIDRAry[1]);
          subnetCIDRIPAry = subnetCIDRIPStr.split('.');
          currentSubnetNum = Number(subnetCIDRIPAry[1]);
          if (maxSubnetNum < currentSubnetNum) {
            maxSubnetNum = currentSubnetNum;
          }
        }
        resultSubnetNum = maxSubnetNum + 1;
        if (resultSubnetNum > 255) {
          return "";
        }
        vpcCIDRIPStrAry[1] = String(resultSubnetNum);
        return vpcCIDRIPStrAry.join('.') + '/16';
      },
      resetAllChildIP: function() {
        var allListenerModels, allPortModels, models;
        allPortModels = Design.modelClassForType(constant.RESTYPE.OSPORT).allObjects();
        allListenerModels = Design.modelClassForType(constant.RESTYPE.OSLISTENER).allObjects();
        models = allPortModels.concat(allListenerModels);
        return _.each(models, function(model) {
          model.assignIP();
          return null;
        });
      },
      serialize: function() {
        return {
          layout: this.generateLayout(),
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name"),
              cidr: this.get("cidr"),
              enable_dhcp: this.get("dhcp"),
              network_id: this.parent().createRef("id"),
              gateway_ip: "",
              ip_version: "4",
              allocation_pools: {}
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSSUBNET,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          parent: resolve(MC.extractID(data.resource.network_id)),
          cidr: data.resource.cidr,
          dhcp: data.resource.enable_dhcp,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1]
        });
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelVolume',["ComplexResModel", "constant", "Design", "i18n!/nls/lang.js"], function(ComplexResModel, constant, Design, lang) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSVOL,
      newNameTmpl: "Volume-",
      defaults: {
        size: 1
      },
      constructor: function(attr, option) {
        var owner;
        if (attr.owner) {
          owner = attr.owner;
          delete attr.owner;
        }
        ComplexResModel.call(this, attr, option);
        this.attachTo(owner);
      },
      getOwner: function() {
        return this.connectionTargets("OsVolumeUsage")[0];
      },
      attachTo: function(owner) {
        var VolumeUsage, mountPoint;
        if (owner) {
          mountPoint = this.get('mountPoint') || this.getMountPoint(owner);
          if (!mountPoint) {
            return false;
          }
          this.set("mountPoint", mountPoint);
          VolumeUsage = Design.modelClassForType("OsVolumeUsage");
          new VolumeUsage(this, owner);
        }
      },
      getMountPoint: function(owner) {
        var image, mountPoint, volumes;
        image = owner.getImage();
        volumes = owner.volumes();
        if (!image) {
          if (!ami_info) {
            notification("warning", sprintf(lang.NOTIFY.WARN_AMI_NOT_EXIST_TRY_USE_OTHER, imageId), false);
          }
          return null;
        } else {
          console.log(image);
          mountPoint = null;
          if (image.os_distro !== "windows") {
            mountPoint = ["f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
          } else {
            mountPoint = ["f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
          }
          $.each(volumes || [], function(key, value) {
            var index, k;
            if (value.get('mountPoint').slice(0, 5) === "/dev/") {
              k = value.get('mountPoint').slice(-1);
              index = mountPoint.indexOf(k);
              if (index >= 0) {
                return mountPoint.splice(index, 1);
              }
            }
          });
          if (mountPoint.length === 0) {
            notification("warning", lang.NOTIFY.WARN_ATTACH_VOLUME_REACH_INSTANCE_LIMIT, false);
            return null;
          }
          if (image.os_distro !== "windows") {
            mountPoint = "/dev/sd" + mountPoint[0];
          } else {
            mountPoint = "xvd" + mountPoint[0];
          }
          return mountPoint;
        }
      },
      serialize: function() {
        return {
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name"),
              snapshot_id: this.get("snapshot"),
              size: this.get("size"),
              mount_point: this.get("mountPoint"),
              bootable: this.get("bootable"),
              server_id: this.connectionTargets("OsVolumeUsage")[0].createRef("id"),
              display_description: this.get("description"),
              display_name: this.get("name")
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSVOL,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.resource.display_name,
          appId: data.resource.id,
          snapshot: data.resource.snapshot_id,
          size: data.resource.size,
          mountPoint: data.resource.mount_point,
          bootable: data.resource.bootable,
          owner: resolve(MC.extractID(data.resource.server_id)),
          description: data.resource.display_description
        });
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/OsModelExtNetwork',["ComplexResModel", "constant", "CloudResources"], function(ComplexResModel, constant, CloudResources) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSEXTNET,
      defaults: function() {
        return {
          name: "ExtNetwork"
        };
      },
      isRemovable: function() {
        return false;
      },
      getResourceId: function() {
        var extNetwork;
        if (this.get("appId")) {
          return this.get("appId");
        }
        extNetwork = CloudResources(constant.RESTYPE.OSNETWORK, this.design().region()).getExtNetworks()[0];
        if (extNetwork) {
          return extNetwork.id;
        } else {
          return "";
        }
      },
      serialize: function() {
        return {
          layout: this.generateLayout(),
          component: {
            uid: this.id,
            type: this.type,
            resource: {
              id: this.getResourceId()
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSEXTNET,
      resolveFirst: true,
      preDeserialize: function(data, layout_data) {
        return new Model({
          id: data.uid,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          appId: data.resource.id
        });
      },
      deserialize: function() {}
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/connection/OsFloatIpUsage',["ConnectionModel", "constant", "Design"], function(ConnectionModel, constant, Design) {
    return ConnectionModel.extend({
      type: "OsFloatIpUsage",
      constructor: function(p1comp, p2comp, attr, options) {
        var FloatIpModel;
        if (!p2comp && p1comp.type !== constant.RESTYPE.OSFIP) {
          FloatIpModel = Design.modelClassForType(constant.RESTYPE.OSFIP);
          p2comp = new FloatIpModel();
        }
        return ConnectionModel.call(this, p1comp, p2comp, attr, options);
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/connection/OsListenerAsso',["ConnectionModel", "constant"], function(ConnectionModel, constant) {
    return ConnectionModel.extend({
      type: "OsListenerAsso",
      portDefs: [
        {
          port1: {
            name: "listener",
            type: constant.RESTYPE.OSLISTENER
          },
          port2: {
            name: "listener",
            type: constant.RESTYPE.OSPOOL
          }
        }
      ],
      isRemovable: function() {
        return false;
      },
      remove: function() {
        var listener, pool;
        ConnectionModel.prototype.remove.apply(this, arguments);
        listener = this.getTarget(constant.RESTYPE.OSLISTENER);
        pool = this.getTarget(constant.RESTYPE.OSPOOL);
        if (listener.isRemoved() && !pool.isRemoved()) {
          pool.remove();
        }
        if (pool.isRemoved() && !listener.isRemoved()) {
          listener.remove();
        }
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/connection/OsPoolMembership',["ConnectionModel", "constant"], function(ConnectionModel, constant) {
    return ConnectionModel.extend({
      type: "OsPoolMembership",
      defaults: function() {
        return {
          port: 80,
          weight: 1,
          appId: ""
        };
      },
      getPort: function() {
        var pool;
        pool = this.getOtherTarget(constant.RESTYPE.OSPOOL);
        if (pool.type === constant.RESTYPE.OSSERVER) {
          pool = pool.embedPort();
        }
        return pool;
      },
      portDefs: [
        {
          port1: {
            name: "pool",
            type: constant.RESTYPE.OSPOOL
          },
          port2: {
            name: "pool",
            type: constant.RESTYPE.OSPORT
          }
        }, {
          port1: {
            name: "pool",
            type: constant.RESTYPE.OSPOOL
          },
          port2: {
            name: "pool",
            type: constant.RESTYPE.OSSERVER
          }
        }
      ],
      constructor: function(p1Comp, p2Comp, attr, option) {
        var pool, port;
        if (p1Comp.type === constant.RESTYPE.OSPORT) {
          port = p1Comp;
          pool = p2Comp;
        } else if (p2Comp.type === constant.RESTYPE.OSPORT) {
          port = p2Comp;
          pool = p1Comp;
        }
        if (port && port.isEmbedded()) {
          p1Comp = port.owner();
          p2Comp = pool;
        }
        return ConnectionModel.call(this, p1Comp, p2Comp, attr, option);
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/connection/OsPortUsage',["ConnectionModel", "constant"], function(ConnectionModel, constant) {
    return ConnectionModel.extend({
      type: "OsPortUsage",
      portDefs: [
        {
          port1: {
            name: "server",
            type: constant.RESTYPE.OSSERVER
          },
          port2: {
            name: "server",
            type: constant.RESTYPE.OSPORT
          }
        }, {
          port1: {
            name: "listener",
            type: constant.RESTYPE.OSLISTENER
          },
          port2: {
            name: "listener",
            type: constant.RESTYPE.OSPORT
          }
        }
      ],
      isVisual: function() {
        var server;
        server = this.getTarget(constant.RESTYPE.OSSERVER);
        return server && server.embedPort() !== this.getTarget(constant.RESTYPE.OSPORT);
      },
      remove: function(option) {
        var port, server;
        ConnectionModel.prototype.remove.call(this, option);
        server = this.getTarget(constant.RESTYPE.OSSERVER);
        port = this.getTarget(constant.RESTYPE.OSPORT);
        if (server.isRemoved() && server.embedPort() === port) {
          port.remove();
        }
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/connection/OsRouterAsso',["ConnectionModel", "constant"], function(ConnectionModel, constant) {

    /* Router <=> Subnet */
    ConnectionModel.extend({
      type: "OsRouterAsso",
      oneToMany: constant.RESTYPE.OSRT,
      portDefs: [
        {
          port1: {
            name: "route",
            type: constant.RESTYPE.OSRT
          },
          port2: {
            name: "route",
            type: constant.RESTYPE.OSSUBNET
          }
        }
      ],
      initialize: function() {
        var rt;
        rt = this.getTarget(constant.RESTYPE.OSRT);
        this.listenTo(rt, "change:public", this.onRtPublicityChanged);
        this.getTarget(constant.RESTYPE.OSSUBNET).set("public", rt.get("public"));
      },
      remove: function() {
        var res, subnet;
        subnet = this.getTarget(constant.RESTYPE.OSSUBNET);
        res = ConnectionModel.prototype.remove.apply(this, arguments);
        subnet.set("public", false);
        return res;
      },
      onRtPublicityChanged: function() {
        this.getTarget(constant.RESTYPE.OSSUBNET).set("public", this.getTarget(constant.RESTYPE.OSRT).get("public"));
      }
    });

    /* ExtNetwork <=> Router */
    return ConnectionModel.extend({
      type: "OsExtRouterAttach",
      portDefs: [
        {
          port1: {
            name: "router",
            type: constant.RESTYPE.OSEXTNET
          },
          port2: {
            name: "external",
            type: constant.RESTYPE.OSRT
          }
        }
      ]
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/connection/OsSgAsso',["ConnectionModel", "constant"], function(ConnectionModel, constant) {
    return ConnectionModel.extend({
      type: "OsSgAsso"
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/connection/OsVolumeUsage',["ConnectionModel", "constant"], function(ConnectionModel, constant) {
    return ConnectionModel.extend({
      type: "OsVolumeUsage",
      initialize: function() {
        var server, usage, volume, _i, _len, _ref;
        volume = this.getTarget(constant.RESTYPE.OSVOL);
        _ref = volume.connections("OsVolumeUsage");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          usage = _ref[_i];
          if (usage !== this) {
            usage.remove();
          }
        }
        server = this.getTarget(constant.RESTYPE.OSSERVER);
        _.defer(function() {
          if (!server.isRemoved()) {
            return server.trigger("change:volume");
          }
        });
      },
      remove: function(option) {
        ConnectionModel.prototype.remove.call(this, option);
        if (this.getTarget(constant.RESTYPE.OSSERVER).isRemoved()) {
          this.getTarget(constant.RESTYPE.OSVOL).remove();
        } else {
          this.getTarget(constant.RESTYPE.OSSERVER).trigger('change:volume');
        }
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/model/seVisitors/AppToStack',["../DesignOs"], function(Design) {
    Design.registerSerializeVisitor(function(components, layouts, options) {
      if (!options || !options.toStack) {

      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/canvas/CeNetwork',["CanvasElement", "constant", "CanvasManager", "CanvasView"], function(CanvasElement, constant, CanvasManager, CanvasView) {
    return CanvasElement.extend({

      /* env:dev                                           env:dev:end */
      type: constant.RESTYPE.OSNETWORK,
      parentType: ["SVG"],
      defaultSize: [60, 60],
      create: function() {
        return this.canvas.appendNetwork(this.createGroup());
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children("text"));
        return this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/canvas/CeSubnet',["CanvasElement", "constant", "CanvasManager", "CanvasView", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, CanvasView, lang) {
    return CanvasElement.extend({

      /* env:dev                                          env:dev:end */
      type: constant.RESTYPE.OSSUBNET,
      parentType: [constant.RESTYPE.OSNETWORK],
      defaultSize: [13, 13],
      portDirMap: {
        "route": "horizontal"
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:public", this.render);
        this.listenTo(this.model, "change:cidr", this.render);
      },
      portPosition: function(portName, isAtomic) {
        var m, portY, x;
        m = this.model;
        portY = m.height() * CanvasView.GRID_HEIGHT / 2 - 5;
        if (portName === "route-left") {
          return [-12, portY, CanvasElement.constant.PORT_LEFT_ANGLE];
        } else {
          x = m.width() * CanvasView.GRID_WIDTH + 4;
          if (isAtomic) {
            x += 8;
          }
          return [x, portY, CanvasElement.constant.PORT_RIGHT_ANGLE];
        }
      },
      create: function() {
        var m, svg, svgEl;
        svg = this.canvas.svg;
        svgEl = this.canvas.appendSubnet(this.createGroup());
        svgEl.add([
          svg.use("port_right").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'route',
            'data-alias': 'route-left',
            'data-tooltip': lang.IDE.PORT_TIP_L
          }), svg.use("port_right").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'route',
            'data-alias': 'route-right',
            'data-tooltip': lang.IDE.PORT_TIP_M
          }), svg.circle(8).move(5, 6).classes('public').attr("fill", "#009EFF")
        ]);
        m = this.model;
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      label: function() {
        return "" + (this.model.get('name')) + " (" + (this.model.get('cidr')) + ")";
      },
      labelWidth: function(width) {
        var w;
        w = CanvasElement.prototype.labelWidth.call(this, width);
        if (this.model.get("public")) {
          w -= 16;
        }
        return w;
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children("text"));
        this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
        this.$el.children("text")[0].setAttribute("x", m.get("public") ? 21 : 5);
        return CanvasManager.toggle(this.$el.children(".public"), m.get("public"));
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/canvas/CeRt',["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                      env:dev:end */
      type: constant.RESTYPE.OSRT,
      parentType: ["SVG"],
      defaultSize: [8, 8],
      portPosMap: {
        "external": [10, 30, CanvasElement.constant.PORT_LEFT_ANGLE, 8, 30],
        "route": [70, 30, CanvasElement.constant.PORT_RIGHT_ANGLE, 72, 30]
      },
      iconUrl: function() {
        return "ide/icon/openstack/cvs-router.png";
      },
      create: function() {
        var m, node, svg;
        m = this.model;
        svg = this.canvas.svg;
        node = this.createNode({
          image: this.iconUrl(),
          imageX: 0,
          imageY: 0,
          imageW: 80,
          imageH: 80
        }).add([
          svg.text("").move(41, 75).classes('node-label'), svg.use("port_left").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'external',
            'data-tooltip': lang.IDE.PORT_TIP_B
          }), svg.use("port_right").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'route',
            'data-tooltip': lang.IDE.PORT_TIP_B
          })
        ]);
        this.canvas.appendNode(node);
        this.initNode(node, m.x(), m.y());
        return node;
      },
      render: function() {
        return CanvasManager.setLabel(this, this.$el.children(".node-label"));
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/canvas/CePool',["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                        env:dev:end */
      type: constant.RESTYPE.OSPOOL,
      parentType: [constant.RESTYPE.OSSUBNET],
      defaultSize: [17, 8],
      portPosMap: {
        "listener": [2, 36, CanvasElement.constant.PORT_LEFT_ANGLE],
        "pool": [73, 36, CanvasElement.constant.PORT_RIGHT_ANGLE, 81, 36]
      },
      size: function() {
        return {
          width: 8,
          height: 8
        };
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/openstack/cvs-pool.png",
          imageX: 0,
          imageY: 0,
          imageW: 80,
          imageH: 80,
          label: m.get("name")
        }).add([
          svg.use("port_right").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'listener',
            'data-tooltip': lang.IDE.PORT_TIP_D
          }), svg.use("port_right").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'pool',
            'data-tooltip': lang.IDE.PORT_TIP_K
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        return CanvasManager.setLabel(this, this.$el.children(".node-label"));
      }
    }, {
      createResource: function(type, attributes, options) {
        var ListenerModel, PoolModel, listener, pool;
        attributes.width = 8;
        PoolModel = Design.modelClassForType(constant.RESTYPE.OSPOOL);
        pool = new PoolModel($.extend({}, attributes, {
          x: attributes.x + 9
        }), options);
        ListenerModel = Design.modelClassForType(constant.RESTYPE.OSLISTENER);
        listener = new ListenerModel(attributes, $.extend({
          pool: pool
        }, options));
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/canvas/CeListener',["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                            env:dev:end */
      type: constant.RESTYPE.OSLISTENER,
      parentType: [constant.RESTYPE.OSSUBNET],
      defaultSize: [8, 8],
      portPosMap: {
        "listener": [72, 35, CanvasElement.constant.PORT_RIGHT_ANGLE, 80, 35]
      },
      events: {
        "mousedown .fip-status": "toggleFip"
      },
      toggleFip: function() {
        if (this.canvas.design.modeIsApp()) {
          return false;
        }
        CanvasManager.updateFip(this.$el.children(".fip-status"), this.model);
        return false;
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/openstack/cvs-vip.png",
          imageX: 0,
          imageY: 0,
          imageW: 80,
          imageH: 80,
          label: m.get("name")
        }).add([
          svg.image("", 12, 14).move(36, 36).classes('fip-status tooltip'), svg.use("port_right").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'listener',
            'data-tooltip': lang.IDE.PORT_TIP_D
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        CanvasManager.updateFip(this.$el.children(".fip-status"), m);
        return null;
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/canvas/CeExtNetwork',["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js", "Design", "CloudResources"], function(CanvasElement, constant, CanvasManager, lang, Design, CloudResources) {
    return CanvasElement.extend({

      /* env:dev                                              env:dev:end */
      type: "OS::ExternalNetwork",
      parentType: ["SVG"],
      defaultSize: [8, 8],
      portPosMap: {
        "router": [70, 30, CanvasElement.constant.PORT_RIGHT_ANGLE]
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/openstack/cvs-ext-net.png",
          imageX: 0,
          imageY: 0,
          imageW: 80,
          imageH: 80,
          label: m.get("name")
        }).add(svg.use("port_left").attr({
          'class': 'port port-blue tooltip',
          'data-name': 'router',
          'data-tooltip': lang.IDE.PORT_TIP_C
        }));
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/canvas/CeServer',["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js", "CloudResources", "./CpVolume"], function(CanvasElement, constant, CanvasManager, lang, CloudResources, VolumePopup) {
    return CanvasElement.extend({

      /* env:dev                                          env:dev:end */
      type: constant.RESTYPE.OSSERVER,
      parentType: [constant.RESTYPE.OSSUBNET],
      defaultSize: [9, 9],
      portPosMap: {
        "pool": [5, 36, CanvasElement.constant.PORT_LEFT_ANGLE],
        "server": [82, 36, CanvasElement.constant.PORT_RIGHT_ANGLE, 85, 36]
      },
      events: {
        "mousedown .fip-status": "toggleFip",
        "mousedown .volume-image": "showVolume",
        "click .volume-image": "suppressEvent"
      },
      suppressEvent: function() {
        return false;
      },
      iconUrl: function() {
        var image, m, server, url;
        image = this.model.getImage() || this.model.get("cachedAmi");
        if (!image) {
          m = this.model;
          server = CloudResources(m.type, m.design().region()).get(m.get("appId"));
          if (server) {
            server = server.attributes;
            if (server.platform && server.platform === "windows") {
              url = "ide/ami/openstack/windows." + server.architecture + ".png";
            } else {
              url = "ide/ami/openstack/linux-other." + server.architecture + ".png";
            }
          } else {
            url = "ide/ami/openstack/image-not-available.png";
          }
        } else {
          url = "ide/ami/openstack/" + image.os_type + "." + image.architecture + ".png";
        }
        return url;
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:imageId", this.render);
        this.listenTo(this.model, 'change:fip', this.render);
      },
      toggleFip: function() {
        var embedPort, hasFloatingIp;
        if (this.canvas.design.modeIsApp()) {
          return false;
        }
        embedPort = this.model.embedPort();
        hasFloatingIp = !!embedPort.getFloatingIp();
        embedPort.setFloatingIp(!hasFloatingIp);
        CanvasManager.updateFip(this.$el.children(".fip-status"), this.model);
        return false;
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/openstack/cvs-server.png",
          imageX: 0,
          imageY: 0,
          imageW: 90,
          imageH: 90,
          label: true,
          labelBg: true
        }).add([
          svg.image(MC.IMG_URL + this.iconUrl(), 39, 27).move(27, 15).classes("ami-image"), svg.image("", 12, 14).move(50, 55).classes('fip-status tooltip'), svg.image(MC.IMG_URL + "ide/icon/icn-vol.png", 29, 24).move(22, 52).classes('volume-image'), svg.text("").move(36, 42).classes('volume-number'), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'pool',
            'data-tooltip': lang.IDE.PORT_TIP_D
          }), svg.use("port_right").attr({
            'class': 'port port-green tooltip',
            'data-name': 'server',
            'data-tooltip': lang.IDE.PORT_TIP_E
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        this.listenTo(this.model, 'change:volume', this.updateVolume);
        return svgEl;
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        CanvasManager.update(this.$el.children(".ami-image"), this.iconUrl(), "href");
        CanvasManager.updateFip(this.$el.children(".fip-status"), m);
        this.updateVolume();
        return null;
      },
      updateVolume: function() {
        var m, volumes;
        m = this.model;
        volumes = m.volumes();
        return this.$el.children('.volume-number').find('tspan').text(volumes.length || 0);
      },
      showVolume: function() {
        var attachment, canvas, owner, v;
        owner = this.model;
        v = owner.volumes()[0];
        attachment = this.$el[0];
        canvas = this.canvas;
        new VolumePopup({
          attachment: attachment,
          host: owner,
          models: owner.volumes(),
          canvas: canvas,
          selectAtBegin: v
        });
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/canvas/CePort',["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                        env:dev:end */
      type: constant.RESTYPE.OSPORT,
      parentType: [constant.RESTYPE.OSSUBNET],
      defaultSize: [9, 9],
      portPosMap: {
        "pool": [10, 20, CanvasElement.constant.PORT_LEFT_ANGLE],
        "server": [8, 50, CanvasElement.constant.PORT_LEFT_ANGLE]
      },
      events: {
        "mousedown .fip-status": "toggleFip"
      },
      toggleFip: function() {
        if (this.canvas.design.modeIsApp()) {
          return false;
        }
        CanvasManager.updateFip(this.$el.children(".fip-status"), this.model);
        return false;
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        console.assert(!this.model.isEmbedded());
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/openstack/cvs-port-att.png",
          imageX: 0,
          imageY: 0,
          imageW: 80,
          imageH: 80,
          label: true,
          labelBg: true
        }).add([
          svg.image("", 12, 14).move(40, 35).classes('fip-status tooltip'), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'pool',
            'data-tooltip': lang.IDE.PORT_TIP_D
          }), svg.use("port_right").attr({
            'class': 'port port-green tooltip',
            'data-name': 'server',
            'data-tooltip': lang.IDE.PORT_TIP_G
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        CanvasManager.updateFip(this.$el.children(".fip-status"), m);
        return null;
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/canvas/CeOsLine',["CanvasLine", "constant"], function(CeLine, constant) {
    CeLine.extend({

      /* env:dev                                              env:dev:end */
      type: "OsListenerAsso"
    });
    CeLine.extend({

      /* env:dev                                           env:dev:end */
      type: "OsPortUsage"
    });
    CeLine.extend({

      /* env:dev                                            env:dev:end */
      type: "OsRouterAsso"
    });
    CeLine.extend({

      /* env:dev                                                 env:dev:end */
      type: "OsExtRouterAttach"
    });
    return CeLine.extend({

      /* env:dev                                                env:dev:end */
      type: "OsPoolMembership"
    });
  });

}).call(this);

(function() {
  define('workspaces/oseditor/EditorOs',["OpsEditor", "./OsEditorStack", "./OsEditorApp", "./model/OsModelFloatIp", "./model/OsModelHealthMonitor", "./model/OsModelListener", "./model/OsModelNetwork", "./model/OsModelPool", "./model/OsModelPort", "./model/OsModelRt", "./model/OsModelKeypair", "./model/OsModelServer", "./model/OsModelSg", "./model/OsModelSgRule", "./model/OsModelSubnet", "./model/OsModelVolume", "./model/OsModelExtNetwork", "./model/connection/OsFloatIpUsage", "./model/connection/OsListenerAsso", "./model/connection/OsPoolMembership", "./model/connection/OsPortUsage", "./model/connection/OsRouterAsso", "./model/connection/OsSgAsso", "./model/connection/OsVolumeUsage", "./model/seVisitors/AppToStack", "./canvas/CeNetwork", "./canvas/CeSubnet", "./canvas/CeRt", "./canvas/CePool", "./canvas/CeListener", "./canvas/CeExtNetwork", "./canvas/CeServer", "./canvas/CePort", "./canvas/CeOsLine"], function(OpsEditor, StackEditor, AppEditor) {
    var OsEditor;
    OsEditor = function(opsModel) {
      if (opsModel.isStack()) {
        return new StackEditor(opsModel);
      } else {
        return new AppEditor(opsModel);
      }
    };
    OpsEditor.registerEditors(OsEditor, function(model) {
      return model.type === "OpenstackOps";
    });
    return OsEditor;
  });

}).call(this);

