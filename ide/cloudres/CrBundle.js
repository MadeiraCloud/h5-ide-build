(function() {
  define('ide/cloudres/CrCollection',["ApiRequest", "backbone"], function(ApiRequest) {
    var SubCollections;
    SubCollections = {};
    return Backbone.Collection.extend({
      category: "",
      constructor: function() {
        this.on("add remove", _.debounce(function() {
          return this.trigger("update");
        }), this);
        return Backbone.Collection.apply(this, arguments);
      },
      isReady: function() {
        return this.__fetchPromise && this.__ready;
      },
      fetch: function() {
        var self;
        if (this.__fetchPromise) {
          return this.__fetchPromise;
        }
        this.lastFetch = +new Date();
        this.__ready = false;
        self = this;
        this.__fetchPromise = this.doFetch().then(function(data) {
          var e;
          if (!self.__selfParseData) {
            try {
              data = self.parseFetchData(data);
            } catch (_error) {
              e = _error;
              throw McError(ApiRequest.Errors.InvalidAwsReturn, "", data);
            }
          }
          self.__ready = true;
          if (data.length === 0 && self.models.length === 0) {
            self.trigger("update");
          } else {
            self.set(data);
          }
          return self;
        }, function(error) {
          self.lastFetch = 0;
          self.__fetchPromise = null;
          throw error;
        });
        return this.__fetchPromise;
      },
      fetchForce: function() {
        this.__fetchPromise = null;
        this.reset();
        this.trigger("update");
        return this.fetch();
      },
      fetchIfExpired: function() {
        var lastFetch;
        lastFetch = this.lastFetch || 0;
        if ((+new Date()) - lastFetch < 1800000) {
          console.info("The collection is not expired,", this);
          return;
        }
        this.__fetchPromise = null;
        return this.fetch();
      },
      parseFetchData: function(res) {
        return res;
      },
      destroy: function() {
        return this.trigger("destroy", this.id);
      },
      create: function(attributes) {
        var m;
        m = new this.model(attributes);
        m.__collection = this;
        return m;
      },
      region: function() {
        return this.category;
      }
    }, {
      category: function(category) {
        return category;
      },
      classId: function(resourceType, platform) {
        return (platform || "AWS") + "_" + resourceType;
      },
      getClassById: function(id) {
        return SubCollections[id];
      },

      /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             env:dev:end */
      extend: function(protoProps, staticProps) {
        var subClass;
        console.assert(protoProps.type, "Subclass of CloudResourceCollection does not specifying a type");
        subClass = (this.__detailExtend || Backbone.Collection.extend).call(this, protoProps, staticProps);
        SubCollections[this.classId(protoProps.type, protoProps.platform)] = subClass;
        return subClass;
      }
    });
  });

}).call(this);

(function() {
  define('CloudResources',["ide/cloudres/CrCollection"], function(CrCollection) {

    /*
      resourceType : a string used to identified a class of resource
      category     : a string used to group a set of resources. It might be a region id, or app id.
      platform     : optional string used to identified the platform, currently only support aws.
     */
    var CachedCollections, CloudResources, onCollectionDestroy;
    CachedCollections = {};
    onCollectionDestroy = function(id) {
      return delete CachedCollections[id];
    };
    CloudResources = function(resourceType, category, platform) {
      var Collection, c, cid, classId;
      if (platform == null) {
        platform = "AWS";
      }
      classId = CrCollection.classId(resourceType, platform);
      Collection = CrCollection.getClassById(classId);
      category = Collection.category(category);
      cid = classId + "_" + category;
      c = CachedCollections[cid];
      if (!c) {
        c = new Collection();
        c.id = cid;
        c.category = category;
        CachedCollections[cid] = c;
        c.on("destroy", onCollectionDestroy);
      }
      return c;
    };
    CloudResources.invalidate = function() {
      var collection, id;
      for (id in CachedCollections) {
        collection = CachedCollections[id];
        collection.fetchForce();
      }
    };
    return CloudResources;
  });

}).call(this);

(function() {
  define('ide/cloudres/CrModel',["./CrCollection", "ApiRequest", "backbone"], function(CrCollection, ApiRequest) {
    return Backbone.Model.extend({
      save: function() {
        var self;
        if (this.get("id")) {
          console.error("The resource is already created. You cannot re-create it again.");
          return;
        }
        if (!this.__savePromise) {
          self = this;
          this.__savePromise = this.doCreate().then(function() {
            self.__collection.add(self);
            self.tagResource();
            delete self.__collection;
            delete self.__savePromise;
            return self;
          }, function(error) {
            delete self.__savePromise;
            throw error;
          });
        }
        return this.__savePromise;
      },
      update: function(newAttr) {
        if (!this.get("id")) {
          console.error("The resource is not yet created, so you can't update the resource.", this);
          return;
        }
        if (!this.doUpdate) {
          console.error("This kind of resource does not support update,", this.getCollection().type);
          return;
        }
        return this.doUpdate(newAttr);
      },
      destroy: function() {
        var self;
        self = this;
        return this.doDestroy().then(function() {
          self.getCollection().remove(self);
          return self;
        }, function(err) {
          if (err.awsError === 400 && err.awsErrorCode.indexOf(".NotFound") !== -1) {
            self.getCollection().remove(self);
            return self;
          }
          throw err;
        });
      },

      /*
      dosave    : ()->
      doUpdate  : ( newAttr )->
      doDestroy : ()->
       */
      getCollection: function() {
        return this.__collection || this.collection;
      },
      tagResource: function() {
        var self;
        if (this.taggable === false) {
          return;
        }
        self = this;
        return ApiRequest("ec2_CreateTags", {
          region_name: this.getCollection().region(),
          resource_ids: [this.get("id")],
          tags: [
            {
              Name: "Created by",
              Value: App.user.get("username")
            }
          ]
        }).then(function() {
          console.log("Success to tag resource", self.get("id"));
        });
      }
    }, {

      /* env:dev                                                      env:dev:end */
    });
  });

}).call(this);

(function() {
  define('ide/cloudres/CrModelDhcp',["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                           env:dev:end */
      defaults: function() {
        return {
          "domain-name": [],
          "domain-name-servers": [],
          "ntp-servers": [],
          "netbios-name-servers": [],
          "netbios-node-type": []
        };
      },
      constructor: function(attr, options) {
        attr = this.tryParseDhcpAttr(attr);
        return CrModel.call(this, attr, options);
      },
      tryParseDhcpAttr: function(attr) {
        var e, item, _i, _len, _ref;
        if (attr.dhcpConfigurationSet) {
          try {
            _ref = attr.dhcpConfigurationSet.item;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              attr[item.key] = item.valueSet;
            }
            delete attr.dhcpConfigurationSet;
          } catch (_error) {
            e = _error;
          }
        }
        return attr;
      },
      toAwsAttr: function() {
        var awsAttr, key, value, _ref;
        awsAttr = [];
        _ref = this.attributes;
        for (key in _ref) {
          value = _ref[key];
          if (key !== "id" && key !== "tagSet") {
            awsAttr.push({
              Name: key,
              Value: value
            });
          }
        }
        return awsAttr;
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("dhcp_CreateDhcpOptions", {
          region_name: this.getCollection().region(),
          dhcp_configs: this.toAwsAttr()
        }).then(function(res) {
          var e, id;
          try {
            id = res.CreateDhcpOptionsResponse.dhcpOptions.dhcpOptionsId;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Dhcp created but aws returns invalid ata.");
          }
          self.set("id", id);
          console.log("Created dhcp resource", self);
          return self;
        });
      },
      doDestroy: function() {
        return ApiRequest("dhcp_DeleteDhcpOptions", {
          region_name: this.getCollection().region(),
          dhcp_id: this.get("id")
        });
      }
    });
  });

}).call(this);

(function() {
  define('ide/cloudres/CrModelKeypair',["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                              env:dev:end */
      defaults: {
        keyName: "",
        keyData: "",
        keyMaterial: "",
        keyFingerprint: ""
      },
      doCreate: function() {
        var promise, self;
        self = this;
        if (this.get("keyData")) {
          promise = ApiRequest("kp_ImportKeyPair", {
            region_name: this.getCollection().region(),
            key_name: this.get("keyName"),
            key_data: this.get("keyData")
          });
        } else {
          promise = ApiRequest("kp_CreateKeyPair", {
            region_name: this.getCollection().region(),
            key_name: this.get("keyName")
          });
        }
        return promise.then(function(res) {
          var e;
          try {
            self.set(res.CreateKeyPairResponse);
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Keypair created but aws returns invalid ata.");
          }
          console.log("Created keypair resource", self);
          return self;
        });
      },
      doDestroy: function() {
        return ApiRequest("kp_DeleteKeyPair", {
          region_name: this.getCollection().region(),
          key_name: this.get("id")
        });
      }
    });
  });

}).call(this);

(function() {
  define('ide/cloudres/CrModelSslcert',["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                              env:dev:end */
      taggable: false,
      defaults: {
        Path: "",
        Name: "",
        PrivateKey: "",
        CertificateChain: "",
        CertificateBody: ""
      },
      doUpdate: function(newAttr) {
        var self;
        self = this;
        return ApiRequest("iam_UpdateServerCertificate", {
          servercer_name: this.get("Name"),
          new_servercer_name: newAttr.Name,
          new_path: newAttr.Path
        }).then(function(res) {
          var newArn, oldArn;
          oldArn = self.get('Arn');
          newArn = "" + (oldArn.split('/')[0]) + "/" + newAttr.Name;
          self.set('Arn', newArn);
          self.set(newAttr);
          return self;
        });
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("iam_UploadServerCertificate", {
          servercer_name: this.get("Name"),
          cert_body: this.get("CertificateBody"),
          private_key: this.get("PrivateKey"),
          cert_chain: this.get("CertificateChain"),
          path: this.get("Path")
        }).then(function(res) {
          var e;
          self.attributes.CertificateChain = "";
          self.attributes.PrivateKey = "";
          try {
            res = res.UploadServerCertificateResponse.UploadServerCertificateResult.ServerCertificateMetadata;
            res.Arn = res.Arn;
            res.Expiration = res.Expiration;
            res.Path = res.Path;
            res.id = res.ServerCertificateId;
            res.Name = res.ServerCertificateName;
            res.UploadDate = res.UploadDate;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Ssl cert created but aws returns invalid data.");
          }
          self.set(res);
          console.log("Created SslCert resource", self);
          return self;
        });
      },
      doDestroy: function() {
        return ApiRequest("iam_DeleteServerCertificate", {
          servercer_name: this.get("Name")
        });
      }
    });
  });

}).call(this);

(function() {
  define('ide/cloudres/CrModelTopic',["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                            env:dev:end */
      taggable: false,
      defaults: {
        Name: "",
        DisplayName: ""
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("sns_CreateTopic", {
          region_name: this.getCollection().region(),
          topic_name: this.get("Name")
        }).then(function(res) {
          var e, id;
          try {
            id = res.CreateTopicResponse.CreateTopicResult.TopicArn;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Topic created but aws returns invalid ata.");
          }
          self.set("id", id);
          console.log("Created topic resource", self);
          if (self.get("DisplayName")) {
            setTimeout(function() {
              return ApiRequest("sns_SetTopicAttributes", {
                region_name: self.getCollection().region(),
                topic_arn: id,
                attr_name: "DisplayName",
                attr_value: self.get("DisplayName")
              });
            }, 1000);
          }
          return self;
        });
      },
      doUpdate: function(displayName) {
        var self;
        self = this;
        return ApiRequest("sns_SetTopicAttributes", {
          region_name: this.getCollection().region(),
          topic_arn: this.get("id"),
          attr_name: "DisplayName",
          attr_value: displayName
        }).then(function() {
          self.set("DisplayName", displayName);
          return self;
        });
      },
      doDestroy: function() {
        return ApiRequest("sns_DeleteTopic", {
          region_name: this.getCollection().region(),
          topic_arn: this.get("id")
        });
      }
    });
  });

}).call(this);

(function() {
  define('ide/cloudres/CrModelSubscription',["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
    var CrSubscriptionModel;
    CrSubscriptionModel = CrModel.extend({

      /* env:dev                                                   env:dev:end */
      taggable: false,
      defaults: {
        Endpoint: "",
        Protocol: "",
        TopicName: "",
        TopicArn: "",
        SubscriptionArn: ""
      },
      initialize: function(attributes) {
        if (attributes.TopicArn) {
          this.attributes.TopicName = attributes.TopicArn.split(":").pop();
        }
      },
      isRemovable: function() {
        return this.attributes.SubscriptionArn !== "PendingConfirmation" && this.attributes.SubscriptionArn !== "Deleted";
      },
      set: function(key, value, options) {
        if (key === "TopicArn") {
          this.attributes.TopicName = value.split(":").pop();
        } else if (key.TopicArn) {
          this.attributes.TopicName = key.TopicArn.split(":").pop();
        }
        Backbone.Model.prototype.set.apply(this, arguments);
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("sns_Subscribe", {
          region_name: this.getCollection().region(),
          topic_arn: this.get("TopicArn"),
          protocol: this.get("Protocol"),
          endpoint: this.get("Endpoint")
        }).then(function(res) {
          var arn, e;
          try {
            arn = res.SubscribeResponse.SubscribeResult.SubscriptionArn;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Subscription created but aws returns invalid ata.");
          }
          if (arn === "pending confirmation") {
            arn = "PendingConfirmation";
          }
          self.set({
            id: CrSubscriptionModel.uniqueId(),
            SubscriptionArn: arn
          });
          console.log("Created subscription resource", self);
          return self;
        });
      },
      doDestroy: function() {
        var defer;
        if (this.isRemovable()) {
          return ApiRequest("sns_Unsubscribe", {
            region_name: this.getCollection().region(),
            sub_arn: this.get("SubscriptionArn")
          });
        }
        defer = Q.defer();
        defer.resolve(McError(ApiRequest.Errors.InvalidMethodCall, "Cannot unsubscribe pending subscription.", self));
        return defer.promise;
      }
    }, {
      uniqueId: function() {
        return _.uniqueId("CrSnsSub_");
      }
    });
    return CrSubscriptionModel;
  });

}).call(this);

(function() {
  define('ide/cloudres/CrModelSnapshot',["./CrModel", "CloudResources", "ApiRequest"], function(CrModel, CloudResources, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                               env:dev:end */
      defaults: {
        volumeId: "",
        status: "pending",
        startTime: "",
        progress: 0,
        ownerId: "",
        volumeSize: 1,
        description: "",
        name: ""
      },
      isComplete: function() {
        return this.attributes.status === "completed";
      },
      isPending: function() {
        return this.attributes.status === "pending";
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("ebs_CreateSnapshot", {
          region_name: this.getCollection().region(),
          volume_id: this.get("volumeId"),
          description: this.get("description")
        }).then(function(res) {
          var e;
          try {
            res = res.CreateSnapshotResponse;
            res.id = res.snapshotId;
            res.progress = res.progress || 0;
            delete res.snapshotId;
            delete res["@attributes"];
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Snapshot created but aws returns invalid ata.");
          }
          self.set(res);
          self.getCollection().startPollingStatus();
          console.log("Created Snapshot resource", self);
          return self;
        });
      },
      set: function(key, value) {
        if (key.progress) {
          key.progress = parseInt(key.progress, 10) || 0;
        }
        if (key.volumeSize) {
          key.volumeSize = parseInt(key.volumeSize, 10) || 1;
        }
        Backbone.Model.prototype.set.apply(this, arguments);
      },
      copyTo: function(destRegion, newName, description) {
        var self;
        self = this;
        return ApiRequest("ebs_CopySnapshot", {
          region_name: this.getCollection().region(),
          snapshot_id: this.get("id"),
          dst_region_name: destRegion,
          description: description
        }).then(function(data) {
          var clones, id, model, thatCln, _ref;
          id = (_ref = data.CopySnapshotResponse) != null ? _ref.snapshotId : void 0;
          if (!id) {
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Snapshot copied but aws returns invalid data.");
          }
          thatCln = CloudResources(self.collection.type, destRegion);
          clones = self.toJSON();
          clones.name = newName;
          clones.description = description;
          clones.region = destRegion;
          clones.id = id;
          model = thatCln.create(clones);
          thatCln.add(model);
          model.tagResource();
          return model;
        });
      },
      doDestroy: function() {
        return ApiRequest("ebs_DeleteSnapshot", {
          region_name: this.getCollection().region(),
          snapshot_id: this.get("id")
        });
      },
      tagResource: function() {
        var self;
        self = this;
        return ApiRequest("ec2_CreateTags", {
          region_name: this.getCollection().region(),
          resource_ids: [this.get("id")],
          tags: [
            {
              Name: "Created by",
              Value: App.user.get("username")
            }, {
              Name: "Name",
              Value: this.get("name")
            }
          ]
        }).then(function() {
          console.log("Success to tag resource", self.get("id"));
        });
      }
    });
  });

}).call(this);

(function() {
  define('ide/cloudres/CrClnSharedRes',["./CrCollection", "CloudResources", "ApiRequest", "constant", "./CrModelDhcp", "./CrModelKeypair", "./CrModelSslcert", "./CrModelTopic", "./CrModelSubscription", "./CrModelSnapshot"], function(CrCollection, CloudResources, ApiRequest, constant, CrDhcpModel, CrKeypairModel, CrSslcertModel, CrTopicModel, CrSubscriptionModel, CrSnapshotModel) {

    /* Dhcp */
    CrCollection.extend({

      /* env:dev                                                env:dev:end */
      type: constant.RESTYPE.DHCP,
      model: CrDhcpModel,
      doFetch: function() {
        return ApiRequest("dhcp_DescribeDhcpOptions", {
          region_name: this.region()
        });
      },
      parseFetchData: function(res) {
        var i, _i, _len;
        res = res.DescribeDhcpOptionsResponse.dhcpOptionsSet;
        if (res === null) {
          return [];
        }
        res = res.item;
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          i = res[_i];
          i.id = i.dhcpOptionsId;
          delete i.dhcpOptionsId;
        }
        return res;
      }
    });

    /* Keypair */
    CrCollection.extend({

      /* env:dev                                                   env:dev:end */
      type: constant.RESTYPE.KP,
      model: CrKeypairModel,
      doFetch: function() {
        return ApiRequest("kp_DescribeKeyPairs", {
          region_name: this.region()
        });
      },
      parseFetchData: function(res) {
        var i, _i, _len;
        res = res.DescribeKeyPairsResponse.keySet;
        if (res === null) {
          return [];
        }
        res = res.item;
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          i = res[_i];
          i.id = i.keyName;
        }
        return res;
      }
    });

    /* Ssl cert */
    CrCollection.extend({

      /* env:dev                                                   env:dev:end */
      type: constant.RESTYPE.IAM,
      model: CrSslcertModel,
      doFetch: function() {
        return ApiRequest("iam_ListServerCertificates");
      },
      parseFetchData: function(res) {
        var i, _i, _len;
        res = res.ListServerCertificatesResponse.ListServerCertificatesResult.ServerCertificateMetadataList;
        if (res === null) {
          return [];
        }
        res = res.member;
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          i = res[_i];
          i.id = i.ServerCertificateId;
          i.Name = i.ServerCertificateName;
          delete i.ServerCertificateName;
          delete i.ServerCertificateId;
        }
        return res;
      }
    }, {
      category: function() {
        return "";
      }
    });

    /* Sns Topic */
    CrCollection.extend({

      /* env:dev                                                 env:dev:end */
      type: constant.RESTYPE.TOPIC,
      model: CrTopicModel,
      constructor: function() {
        this.on("remove", this.__clearSubscription);
        return CrCollection.apply(this, arguments);
      },
      doFetch: function() {
        return ApiRequest("sns_ListTopics", {
          region_name: this.region()
        });
      },
      parseFetchData: function(res) {
        var i, _i, _len;
        res = res.ListTopicsResponse.ListTopicsResult.Topics;
        if (res === null) {
          return [];
        }
        res = res.member;
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          i = res[_i];
          i.id = i.TopicArn;
          i.Name = i.TopicArn.split(":").pop();
          delete i.TopicArn;
        }
        return res;
      },
      __clearSubscription: function(removedModel, collection, options) {
        var removes, snss, sub, _i, _len, _ref;
        snss = CloudResources(constant.RESTYPE.SUBSCRIPTION, this.region());
        removes = [];
        _ref = snss.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sub = _ref[_i];
          if (sub.get("TopicArn") === removedModel.id) {
            removes.push(sub);
          }
        }
        if (removes.length) {
          snss.remove(removes);
        }
      },
      filterEmptySubs: function() {
        var i, snss, topicMap, _i, _len, _ref;
        snss = CloudResources(constant.RESTYPE.SUBSCRIPTION, this.category);
        topicMap = {};
        _ref = snss.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          topicMap[i.get("TopicArn")] = true;
        }
        return this.filter(function(t) {
          return !topicMap[t.get("id")];
        });
      }
    });

    /* Sns Subscription */
    CrCollection.extend({

      /* env:dev                                                        env:dev:end */
      type: constant.RESTYPE.SUBSCRIPTION,
      model: CrSubscriptionModel,
      doFetch: function() {
        return ApiRequest("sns_ListSubscriptions", {
          region_name: this.region()
        });
      },
      parseFetchData: function(res) {
        var i, _i, _len;
        res = res.ListSubscriptionsResponse.ListSubscriptionsResult.Subscriptions;
        if (res === null) {
          return [];
        }
        res = res.member;
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          i = res[_i];
          i.id = CrSubscriptionModel.uniqueId();
        }
        return res;
      }
    });

    /* Snapshot */
    return CrCollection.extend({

      /* env:dev                                                    env:dev:end */
      type: constant.RESTYPE.SNAP,
      model: CrSnapshotModel,
      initialize: function() {
        this.__pollingStatus = _.bind(this.__pollingStatus, this);
      },
      doFetch: function() {
        return ApiRequest("ebs_DescribeSnapshots", {
          region_name: this.region(),
          owners: ["self"]
        });
      },
      parseFetchData: function(res) {
        var i, _i, _len;
        res = res.DescribeSnapshotsResponse.snapshotSet;
        if (res === null) {
          return [];
        }
        res = res.item;
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          i = res[_i];
          i.id = i.snapshotId;
          if (i.tagSet) {
            i.name = i.tagSet.Name || i.tagSet.name || "";
            delete i.tagSet;
          }
          delete i.snapshotId;
          if (i.status === "pending") {
            this.startPollingStatus();
          }
        }
        return res;
      },
      startPollingStatus: function() {
        if (this.__polling) {
          return;
        }
        this.__polling = setTimeout(this.__pollingStatus, 2000);
      },
      stopPollingStatus: function() {
        clearTimeout(this.__polling);
        this.__polling = null;
      },
      __pollingStatus: function() {
        var self;
        self = this;
        return ApiRequest("ebs_DescribeSnapshots", {
          region_name: this.region(),
          owners: ["self"],
          filters: [
            {
              "Name": "status",
              "Value": ["pending"]
            }
          ]
        }).then(function(res) {
          self.__polling = null;
          self.__parsePolling(res);
        }, function() {
          self.__polling = null;
          return self.startPollingStatus();
        });
      },
      __parsePolling: function(res) {
        var completeStatus, i, statusMap, _i, _len, _ref;
        res = res.DescribeSnapshotsResponse.snapshotSet;
        completeStatus = {
          progress: 100,
          status: "completed"
        };
        statusMap = {};
        if (res !== null && res.item) {
          this.startPollingStatus();
          _ref = res.item;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            statusMap[i.snapshotId] = {
              progress: i.progress
            };
          }
        }
        this.where({
          status: "pending"
        }).forEach(function(model) {
          return model.set(statusMap[model.get("id")] || completeStatus);
        });
      }
    });
  });

}).call(this);

(function() {
  define('ide/cloudres/CrCommonCollection',["ApiRequest", "./CrCollection", "./CrModel"], function(ApiRequest, CrCollection, CrModel) {
    var CrCommonCollection, EmptyArr;
    EmptyArr = [];
    CrCommonCollection = CrCollection.extend({

      /* env:dev                                                  env:dev:end */
      model: CrModel,
      type: "CrCommonCollection",
      __selfParseData: true,
      doFetch: function() {
        var param, self;
        param = {};
        param[this.type] = {};
        self = this;
        return ApiRequest("aws_resource", {
          region_name: null,
          resources: param,
          addition: "all",
          retry_times: 1
        }).then(function(data) {
          var d, dataXml, e, regionId, transformed, _i, _len, _ref;
          transformed = [];
          for (regionId in data) {
            dataXml = data[regionId];
            try {
              _ref = self.parseFetchData($.xml2json($.parseXML(dataXml[0]))) || EmptyArr;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                d = _ref[_i];
                if (self.modelIdAttribute) {
                  d.id = d[self.modelIdAttribute];
                  delete d[self.modelIdAttribute];
                }
                d.category = regionId;
                transformed.push(new self.model(d));
              }
            } catch (_error) {
              e = _error;
              continue;
            }
          }
          return transformed;
        });
      }
    }, {
      category: function() {
        return "";
      }
    });
    return CrCommonCollection;
  });

}).call(this);

(function() {
  define('ide/cloudres/CrClnCommonRes',["./CrCommonCollection", "ApiRequest", "constant"], function(CrCommonCollection, ApiRequest, constant) {

    /* Elb */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.ELB,
      modelIdAttribute: "LoadBalancerName",
      parseFetchData: function(data) {
        var _ref;
        return (_ref = data.DescribeLoadBalancersResponse.DescribeLoadBalancersResult.LoadBalancerDescriptions) != null ? _ref.member : void 0;
      }
    });

    /* VPN */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.VPN,
      modelIdAttribute: "vpnConnectionId",
      parseFetchData: function(data) {
        var _ref;
        return (_ref = data.DescribeVpnConnectionsResponse.vpnConnectionSet) != null ? _ref.item : void 0;
      }
    });

    /* EIP */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.EIP,
      modelIdAttribute: "allocationId",
      parseFetchData: function(data) {
        var _ref;
        return (_ref = data.DescribeAddressesResponse.addressesSet) != null ? _ref.item : void 0;
      }
    });

    /* VOLUME */
    CrCommonCollection.extend({

      /* env:dev                                                  env:dev:end */
      type: constant.RESTYPE.VOL,
      modelIdAttribute: "volumeId",
      parseFetchData: function(data) {
        var _ref;
        return (_ref = data.DescribeVolumesResponse.volumeSet) != null ? _ref.item : void 0;
      }
    });

    /* VPC */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.VPC,
      modelIdAttribute: "vpcId",
      parseFetchData: function(data) {
        var _ref;
        return (_ref = data.DescribeVpcsResponse.vpcSet) != null ? _ref.item : void 0;
      }
    });

    /* AMI */
    return CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.INSTANCE,
      modelIdAttribute: "instanceId",
      parseFetchData: function(data) {
        var ami, e, i, instances, itemset, _i, _j, _len, _len1, _ref, _ref1;
        itemset = data.DescribeInstancesResponse.reservationSet;
        if (!itemset) {
          return;
        }
        instances = [];
        _ref = itemset.item;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          try {
            _ref1 = i.instancesSet.item;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              ami = _ref1[_j];
              instances.push(ami);
            }
          } catch (_error) {
            e = _error;
            console.error("Fail to parse instance data", i);
          }
        }
        return instances;
      }
    });
  });

}).call(this);

(function() {
  define('ide/cloudres/CrBundle',["constant", "CloudResources", "./CrClnSharedRes", "./CrClnCommonRes"], function(constant, CloudResources) {});

}).call(this);

