define('component/statestatus/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-header\">\n	<h3>Failed State</h3>\n	<i class=\"modal-close\">×</i>\n</div>\n<div class=\"modal-body\">\n	<div class=\"modal-state-statusbar\">\n	</div>\n</div>";
  };
TEMPLATE.modal=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"state-status-content\">\n\n	<div class=\"scroll-wrap scroll-wrap-validation\" style=\"height:200px;\">\n		<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n		<div class=\"content_wrap scroll-content\">\n			<div class=\"update-tip\"></div>\n			<div class=\"status-item\">\n				<p class=\"no-item\">No failed item.</p>\n			</div>\n		</div>\n	</div>\n</div>";
  };
TEMPLATE.content=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = (depth0 && depth0.parent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'s ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "<s>has failed</s> is updated.";
  }

function program5(depth0,data) {
  
  
  return "has failed";
  }

function program7(depth0,data) {
  
  
  return "State log will update after change is applied.";
  }

function program9(depth0,data) {
  
  
  return escapeExpression(helpers.UTC.call(depth0, (depth0 && depth0.time), {hash:{},data:data}));
  }

  buffer += "<div class=\"state-status-item-icon\">\n	<i class=\"status status-red\"></i>\n</div>\n<div class=\"state-status-item-info\">\n	<div class=\"state-status-item-desc truncate\">\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.parent), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " 's state "
    + escapeExpression(((stack1 = (depth0 && depth0.stateId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.updated), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<div class=\"timestamp\">\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.updated), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n</div>";
  return buffer;
  };
TEMPLATE.item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<dl class=\"state-status-pending\">\n	<dt>All states are pending.</dt>\n	<dd>A message will show here when a state succeeds or fails.</dd>\n</dl>";
  };
TEMPLATE.pending=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"state-status-list\">\n</ul>";
  };
TEMPLATE.container=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"state-status-update\">\n	"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " states has updated status.\n</div>";
  return buffer;
  };
TEMPLATE.update=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/statestatus/view',['event', './template', 'backbone', 'jquery', 'handlebars'], function(ide_event, template) {
    var CustomView, StateStatusView;
    CustomView = Backbone.View.extend({
      tagName: 'li',
      className: 'state-status-item',
      initialize: function() {
        return this.listenTo(this.model, 'change', this.render);
      },
      render: function() {
        this.$el.html(template.item(this.model.toJSON()));
        return this;
      },
      events: {
        'click .state-status-item-detail': 'openStateEditor'
      },
      openStateEditor: function() {
        ide_event.trigger(ide_event.SHOW_STATE_EDITOR, this.model.get('uid'));
        return null;
      }
    });
    StateStatusView = Backbone.View.extend({
      events: {
        'click .modal-close': 'closePopup',
        'click .state-status-update': 'renderNew'
      },
      initialize: function() {
        this.items = this.model.get('items');
        this.listenTo(this.model, 'change:items', this.renderAllItem);
        this.listenTo(this.model, 'change:stop', this.renderAllItem);
        this.listenTo(this.model, 'change:new', this.renderUpdate);
        this.itemView = CustomView;
        return null;
      },
      render: function() {
        this.$statusModal = this.$el;
        this.$el.html(template.modal());
        this.$('.modal-state-statusbar').html(template.content());
        this.renderAllItem();
        $('.status-bar-modal').html(this.el).show();
        return this;
      },
      renderUpdate: function(model) {
        var newCount;
        newCount = model.get('new').length;
        if (newCount) {
          this.$('.update-tip').html(template.update(newCount));
        }
        return scrollbar.scrollTo(this.$('.scroll-wrap'), {
          'top': 0
        });
      },
      renderNew: function() {
        this.$('.update-tip div').hide();
        this.renderAllItem();
        return this.model.flushNew();
      },
      renderAllItem: function() {
        var items;
        items = this.items;
        if (this.model.get('stop')) {
          this.renderPending();
          return;
        }
        if (items.length) {
          this.renderContainer();
          return items.each(this.renderItem, this);
        }
      },
      renderItem: function(model, index) {
        var view;
        view = new this.itemView({
          model: model
        });
        view.render();
        view.$el.hide();
        this.$('.state-status-list').append(view.el);
        if (__indexOf.call(this.model.get('new'), model) >= 0) {
          return _.defer(function() {
            return view.$el.fadeIn(300);
          });
        } else {
          return view.$el.show();
        }
      },
      renderContainer: function() {
        return this.$('.status-item').html(template.container());
      },
      renderPending: function() {
        return this.$('.status-item').html(template.pending());
      },
      closePopup: function() {
        $('.status-bar-modal').hide();
        return this.trigger('CLOSE_POPUP');
      }
    });
    return StateStatusView;
  });

}).call(this);

(function() {
  define('component/statestatus/model',['constant', 'event', 'backbone', 'jquery', 'underscore', 'MC'], function(constant, ide_event) {
    var StateStatusModel;
    StateStatusModel = Backbone.Model.extend({
      initialize: function() {
        var stateList;
        this.collection = new (this.__customCollection())();
        stateList = App.WS.collection.status.find().fetch();
        this.collection.set(this.__dispose(stateList).models, {
          silent: true
        });
        this.set('items', this.collection);
        this.set('new', []);
        return this.set('stop', Design.instance().get('state') === 'Stopped');
      },
      __collectNew: function(model) {
        var origins;
        origins = this.get('new');
        this.set('new', this.get('new').concat(model));
        return this;
      },
      flushNew: function() {
        return this.set('new', []);
      },
      __customCollection: function() {
        var parent;
        parent = this;
        return Backbone.Collection.extend({
          comparator: function(model) {
            return -model.get('time');
          },
          initialize: function() {
            return this.on('add', parent.__collectNew, parent);
          }
        });
      },
      __genId: function(resId, stateId) {
        return "" + resId + "|" + stateId;
      },
      __dispose: function(stateList) {
        var collection, data, idx, state, status, _i, _j, _len, _len1, _ref;
        collection = new Backbone.Collection();
        console.log(stateList);
        if (!_.isArray(stateList)) {
          stateList = [stateList];
        }
        for (_i = 0, _len = stateList.length; _i < _len; _i++) {
          state = stateList[_i];
          if (state.status) {
            _ref = state.status;
            for (idx = _j = 0, _len1 = _ref.length; _j < _len1; idx = ++_j) {
              status = _ref[idx];
              if (state.app_id !== Design.instance().get('id')) {
                continue;
              }
              data = {
                id: this.__genId(state.res_id, status.id),
                appId: state.app_id,
                resId: state.res_id,
                stateId: idx + 1,
                time: status.time,
                result: status.result
              };
              _.extend(data, this.__extendComponent(data.resId));
              if (!data.name) {
                data.name = 'unknown';
              }
              if (data.result === 'failure') {
                collection.add(new Backbone.Model(data));
              }
            }
          }
        }
        return collection;
      },
      __extendComponent: function(resId) {
        var component, extend;
        extend = {};
        component = MC.aws.aws.getCompByResIdForState(resId);
        if (component.parent) {
          if (component.self) {
            extend.name = component.self.get('name');
          } else {
            extend.parent = component.parent.get('name');
            extend.name = resId;
          }
          extend.uid = component.parent.id;
        } else if (component.self) {
          extend.name = component.self.get('name');
          extend.uid = component.self.id;
        }
        return extend;
      },
      listenStateStatusUpdate: function(type, newDoc, oldDoc) {
        var collection;
        collection = this.__dispose(newDoc);
        this.collection.add(collection.models);
        return null;
      },
      listenStateEditorUpdate: function(data) {
        var id, resId, stateId, stateIds, _i, _len;
        resId = data.resId;
        stateIds = data.stateIds;
        for (_i = 0, _len = stateIds.length; _i < _len; _i++) {
          stateId = stateIds[_i];
          id = this.__genId(resId, stateId);
          if (this.collection.get(id)) {
            this.collection.get(id).set('updated', true);
          }
        }
        return null;
      },
      listenUpdateAppState: function(state) {
        if (state === 'Stopped') {
          return this.set('stop', true);
        } else {
          return this.set('stop', false);
        }
      }
    });
    return StateStatusModel;
  });

}).call(this);

(function() {
  define('state_status',['jquery', 'event', './component/statestatus/view', './component/statestatus/model'], function($, ide_event, View, Model) {
    var loadModule, model, unLoadModule, view;
    model = null;
    view = null;
    loadModule = function() {
      model = new Model();
      view = new View({
        model: model
      });
      view.on('CLOSE_POPUP', this.unLoadModule, this);
      ide_event.onLongListen(ide_event.UPDATE_STATE_STATUS_DATA, model.listenStateStatusUpdate, model);
      ide_event.onLongListen(ide_event.STATE_EDITOR_DATA_UPDATE, model.listenStateEditorUpdate, model);
      ide_event.onLongListen(ide_event.UPDATE_APP_STATE, model.listenUpdateAppState, model);
      return view.render();
    };
    unLoadModule = function() {
      view.remove();
      model.destroy();
      ide_event.offListen(ide_event.UPDATE_STATE_STATUS_DATA, model.listenStateStatusUpdate);
      ide_event.offListen(ide_event.STATE_EDITOR_DATA_UPDATE);
      return ide_event.offListen(ide_event.UPDATE_APP_STATE, model.listenUpdateAppState);
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);

