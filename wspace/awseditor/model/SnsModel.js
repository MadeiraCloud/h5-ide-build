(function() {
  define(["ResourceModel", "ComplexResModel", "constant", "ConnectionModel"], function(ResourceModel, ComplexResModel, constant, ConnectionModel) {
    var TopicModel, TopicUsage;
    TopicUsage = ConnectionModel.extend({
      type: "TopicUsage",
      oneToMany: constant.RESTYPE.TOPIC
    });
    TopicModel = ComplexResModel.extend({
      type: constant.RESTYPE.TOPIC,
      isVisual: function() {
        return false;
      },
      serialize: function() {
        var useTopic;
        useTopic = !!this.connections().length;
        if (!useTopic) {
          console.debug("Sns Topic is not serialized, because nothing use it and it doesn't have appId.");
          return;
        }
        return {
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              TopicArn: this.get("appId")
            }
          }
        };
      },
      assignTo: function(target) {
        if (this.get('appId')) {
          return new TopicUsage(this, target);
        }
      }
    }, {
      handleTypes: constant.RESTYPE.TOPIC,
      resolveFirst: true,
      isTopicNeeded: function() {
        var ScalingPolicyModel, n, sp, useTopic, _i, _j, _len, _len1, _ref, _ref1;
        ScalingPolicyModel = Design.modelClassForType(constant.RESTYPE.SP);
        _ref = ScalingPolicyModel.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sp = _ref[_i];
          if (sp.get("sendNotification")) {
            useTopic = true;
            break;
          }
        }
        if (!useTopic) {
          _ref1 = Design.modelClassForType(constant.RESTYPE.NC).allObjects();
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            n = _ref1[_j];
            if (n.isUsed()) {
              useTopic = true;
              break;
            }
          }
        }
        return useTopic;
      },
      ensureExistence: function() {
        if (this.allObjects().length === 0) {
          new TopicModel();
        }
        return this.allObjects()[0];
      },
      get: function(appId, name) {
        var topic;
        topic = _.first(_.filter(this.allObjects(), function(m) {
          return m.get('appId') === appId;
        }));
        return topic || new TopicModel({
          appId: appId,
          name: name
        });
      },
      preDeserialize: function(data, layout_data) {
        new TopicModel({
          id: data.uid,
          appId: data.resource.TopicArn,
          name: data.resource.Name || data.name
        });
        return null;
      },
      deserialize: function() {
        return null;
      }
    });

    /*
    
    SubscriptionModel = ResourceModel.extend {
      type : constant.RESTYPE.SUBSCRIPTION
    
      initialize : ()->
        TopicModel.ensureExistence()
        null
    
      serialize : ()->
        topic = TopicModel.ensureExistence()
    
        {
          component :
            name : "SnsSubscription"
            type : @type
            uid  : @id
            resource :
              Endpoint        : @get("endpoint")
              Protocol        : @get("protocol")
              SubscriptionArn : @get("appId")
              TopicArn        : TopicModel.ensureExistence().createRef( "TopicArn" )
        }
    
    }, {
    
      handleTypes : constant.RESTYPE.SUBSCRIPTION
    
      deserialize : ( data, layout_data, resolve ) ->
        new SubscriptionModel({
          id       : data.uid
          appId    : data.resource.SubscriptionArn
          endpoint : data.resource.Endpoint
          protocol : data.resource.Protocol
        })
        null
    }
     */
    return null;
  });

}).call(this);
