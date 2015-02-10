(function() {
  define(["constant", "ComplexResModel", "ConnectionModel"], function(constant, ComplexResModel, ConnectionModel) {
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
          ref = kp.createRef("keyName");
          otherTargetComp.resource.keyName = ref;
          groupMembers = otherTarget.groupMembers ? otherTarget.groupMembers() : [];
          for (_i = 0, _len = groupMembers.length; _i < _len; _i++) {
            member = groupMembers[_i];
            if (components[member.id]) {
              components[member.id].resource.keyName = ref;
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
