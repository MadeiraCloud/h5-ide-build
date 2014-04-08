(function() {
  define(['constant', 'event', 'backbone', 'jquery', 'underscore', 'MC'], function(constant, ide_event) {
    var StateStatusModel;
    StateStatusModel = Backbone.Model.extend({
      initialize: function() {
        var stateList;
        this.collection = new (this.__customCollection());
        stateList = MC.data.websocket.collection.status.find().fetch();
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
          this.collection.get(id) && this.collection.get(id).set('updated', true);
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
