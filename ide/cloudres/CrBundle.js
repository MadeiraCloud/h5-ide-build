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
      fetch: function() {
        var self;
        if (this.__fetchPromise) {
          return this.__fetchPromise;
        }
        this.lastFetch = +new Date();
        self = this;
        this.__fetchPromise = this.doFetch().then(function(res) {
          var data, e;
          try {
            data = self.parseFetchData(res);
            if (data.length === 0 && self.models.length === 0) {
              self.trigger("update");
            } else {
              self.set(data);
            }
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "", res);
          }
          return self;
        }, function(error) {
          this.lastFetch = 0;
          self.__fetchPromise = null;
          throw error;
        });
        return this.__fetchPromise;
      },
      fetchForce: function() {
        this.__fetchPromise = null;
        this.reset();
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
    var CrModel;
    return CrModel = Backbone.Model.extend({
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
  define('ide/cloudres/CrDhcpModel',["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
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
  define('ide/cloudres/CrKeypairModel',["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
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
  define('ide/cloudres/CrSslcertModel',["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
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
        }).then(function() {
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
          var e, id;
          self.attributes.CertificateChain = "";
          self.attributes.PrivateKey = "";
          try {
            id = res.UploadServerCertificateResponse.UploadServerCertificateResult.ServerCertificateMetadata.ServerCertificateId;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Ssl cert created but aws returns invalid ata.");
          }
          self.set("id", id);
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
  define('ide/cloudres/CrTopicModel',["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
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
  define('ide/cloudres/CrSubscriptionModel',["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
    var CrSubscriptionModel;
    return CrSubscriptionModel = CrModel.extend({

      /* env:dev                                                   env:dev:end */
      taggable: false,
      defaults: {
        Endpoint: "",
        Protocol: "",
        TopicName: "",
        TopicArn: "",
        SubscriptionArn: ""
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
  });

}).call(this);

(function() {
  define('ide/cloudres/CrSnapshotModel',["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
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
          var e, id;
          try {
            id = res.CreateSnapshotResponse.snapshotId;
            delete res.requestId;
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
      doDestroy: function() {
        return ApiRequest("ebs_DeleteSnapshot", {
          region_name: this.getCollection().region(),
          dhcp_id: this.get("id")
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
  define('ide/cloudres/CrSubCollection',["./CrCollection", "CloudResources", "ApiRequest", "constant", "./CrDhcpModel", "./CrKeypairModel", "./CrSslcertModel", "./CrTopicModel", "./CrSubscriptionModel", "./CrSnapshotModel"], function(CrCollection, CloudResources, ApiRequest, constant, CrDhcpModel, CrKeypairModel, CrSslcertModel, CrTopicModel, CrSubscriptionModel, CrSnapshotModel) {

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
        return this.__pollingStatus = _.bind(this.__pollingStatus, this);
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
  define('ide/cloudres/CrBundle',["constant", "CloudResources", "./CrSubCollection"], function(constant, CloudResources) {
    var CertCollection, DhcpCollection, SnapCollection, SubsCollection, TopicCollection;
    DhcpCollection = CloudResources(constant.RESTYPE.DHCP, "us-west-2");
    DhcpCollection.on("update", function() {
      console.log("==============");
      console.log("==============");
      return console.info(DhcpCollection);
    });
    CertCollection = CloudResources(constant.RESTYPE.IAM, "us-west-2");
    CertCollection.on("update", function() {
      console.log("==============");
      console.log("==============");
      return console.info(CertCollection);
    });
    TopicCollection = CloudResources(constant.RESTYPE.TOPIC, "us-west-2");
    TopicCollection.on("update", function() {
      console.log("==============");
      console.log("==============");
      return console.info(TopicCollection);
    });
    SubsCollection = CloudResources(constant.RESTYPE.SUBSCRIPTION, "us-west-2");
    SubsCollection.on("update", function() {
      console.log("==============");
      console.log("==============");
      return console.info(SubsCollection);
    });
    SnapCollection = CloudResources(constant.RESTYPE.SNAP, "us-east-1");
    SnapCollection.on("update", function() {
      console.log("==============");
      console.log("==============");
      return console.info(SnapCollection);
    });
    DhcpCollection.fetch();
    CertCollection.fetch();
    TopicCollection.fetch();
    SubsCollection.fetch();
    SnapCollection.fetch();
    return window.CrTestcase = {
      RemoveResources: function() {
        if (DhcpCollection.get("dopt-9e6172fc")) {
          DhcpCollection.get("dopt-9e6172fc").destroy();
        }
        if (CertCollection.findWhere({
          Name: "MorrisTestCert2"
        })) {
          CertCollection.findWhere({
            Name: "MorrisTestCert2"
          }).destroy();
        }
        if (TopicCollection.get("arn:aws:sns:us-west-2:994554139310:MorrisTestTopic")) {
          return TopicCollection.get("arn:aws:sns:us-west-2:994554139310:MorrisTestTopic").destroy();
        }
      },
      RemoveResourcesFail: function() {},
      CreateResourcesFail: function() {
        DhcpCollection.create({
          "netbios-node-type": "abc"
        }).save();
        TopicCollection.create({
          Name: ""
        }).save();
        SubsCollection.create({
          Endpoint: "morris@mc2.io",
          Protocol: "email",
          TopicArn: "arn:aws:sns:us-west-2:994554139310:MorrisTestTopicNoneExist"
        }).save();
        return CertCollection.create({
          Name: "MorrisTestCert2",
          PrivateKey: "",
          CertificateBody: ""
        }).save();
      },
      CreateResources: function() {
        DhcpCollection.create({
          "netbios-node-type": ["2"],
          "ntp-servers": ["4.4.4.4", "3.3.3.3"],
          "domain-name": ["www.abc2.com", "www.abc.com"],
          "domain-name-servers": ["12.12.12.12", "13.13.13.13"],
          "netbios-name-servers": ["13.13.13.13", "200.200.200.200"]
        }).save();
        TopicCollection.create({
          Name: "MorrisTestTopic",
          DisplayName: "MorrisTestTopic"
        }).save();
        SubsCollection.create({
          Endpoint: "morris@mc2.io",
          Protocol: "email",
          TopicArn: "arn:aws:sns:us-west-2:994554139310:MorrisTestTopic"
        }).save();
        return CertCollection.create({
          Name: "MorrisTestCert2",
          PrivateKey: "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA2PSMweBuIoF+FG6M24FGiSLZ6l4E5hHkdwpYg/LEE0s5RJ5W\nDUJWt16ixTscYcDK/AoXjSWaN7StyVQ3hHsb9EVlk5ljEISF0DoFMvGqTBATB/Za\nE2TqiVXRUZaaQTFxBgiA5Bme8RDUFr2hpS79NPJ5JZU+qLsamZ/EaJm/8xg3sckY\n9zG/SMYvktMw0Kwb+3Sdn8dZSa3/8FhATEpemAMYCXTzI04hfq5kbLlveklSDsnw\n3vBmMo4pZVnqyd2LGNOITFy7T+R9yQiK3i+yF4c9KIJgGGtIC+9kajU7kMCrmAhq\n2s/a/RN7Oq+hWx2uz0mmWCIe7pLr0HJvC1tqhwIDAQABAoIBAQCd102Qv/dgo1VX\nCBbym9r1aqWgHUbzG5FcCercFIMShmfjxE5W1yy/u9owJBFCDUGgnLcFuZW5cXn+\nP4ckm2x7CwIboDyyh7fTBmNB7RA4xnkSEej2szTvNcBT233ecFoKSaV8TieUuumS\noeQ4iTcujjoVXb94gqeXnOUINNOxx1T3ab4r9JzJDim7hnns3I79XVHVF2NYh3z2\n6ZW5PeHr94Dn4hoswSDRPqDSJmpenmO9jAxgD4RfpeoOX5u8vw48L48kCYINIpZ9\nz1fvmajFn2xFCBOsuKKi6YCXBeBMytwXZeDPbCHOVAsYizVJJOKCVCcARwRJhWpk\nzqeJE3wBAoGBAPzrjfbURp4FSY95LTBFXM5cPsVA0k7CIiLZ5fULr+11PeKdy2Sc\nLtdpDmJXCLh312Y2Q1oRehNQRpuG8I+009+uoGufP4saOifwUJMxt1WQ3fVc/Cqq\nPFFFU65pv2BfMObgRphcwxpCvrZkCwLmVwP99rvaB8TPAnaroDcxrYoJAoGBANuY\n4Sjkcyh+BBWRUH8Q294mBEgfKlfuZ1L1mF5O7iPwdvcOWiskAwoSXROE/FS0vSmM\nVAXmZaJZ+i/HVjr5D3PF9Yrf1op2EesmLK7UwGRC7Fzna53zyYMrkY4jea7EDrCa\nidp0A+Xed1ajqrreIM5YEx+lB22e/ythrhJEkrQPAoGBALIVJYtzYhmnvWjROLkx\nTaxblTMMdkhQNvr1FA6bYQ9AqwdidbDsq6qu5RrnD1PbxgXJFVlYzuzEbELcG4wE\nFd78tSWyJmrKV8KBWiqaKe2MqEw4YbGk1f2fY9F90euIewVFS0/CmPlnn6MLBBnR\nl9lOu6j/VtMDs0ddhtz2FKwJAoGAV7PBCRHkJCHgA7UbjwPuq9RHFX7M7H1careH\nePLRDS12dckXne8t/5HB9o/ALxxYCAXxcMHJiYOh9f8Io1jhIP3IyQQIrRfmpCGE\n6vYxOFm6CIisZFL/AhIeecQVTwUiUMoHkGWRQPcOdl27TBJ2y7JFQPgp9U/w3SSP\n3t/gL2UCgYBRIUMm9Vg06YOzYES2YWpoZfpPevCO4j+dS2MjoTGJ/MTn29ASjrrd\nrkhulebUMEcSDwGtaZUnnSsl+LlklqMlTJWTms4KaOxa64pitdc8zkR8F4iECzEe\nwkI+YJ9kgWQZXQPKgSAiKiPq06nVUfbSp6lqApVHrCi4k5Q8XGoI6A==\n-----END RSA PRIVATE KEY-----",
          CertificateBody: "-----BEGIN CERTIFICATE-----\nMIIFATCCA+mgAwIBAgIQSHW5NjjFcwlWluD7RcFWVTANBgkqhkiG9w0BAQUFADBz\nMQswCQYDVQQGEwJHQjEbMBkGA1UECBMSR3JlYXRlciBNYW5jaGVzdGVyMRAwDgYD\nVQQHEwdTYWxmb3JkMRowGAYDVQQKExFDT01PRE8gQ0EgTGltaXRlZDEZMBcGA1UE\nAxMQUG9zaXRpdmVTU0wgQ0EgMjAeFw0xNDAzMjUwMDAwMDBaFw0xNTAzMjUyMzU5\nNTlaMFsxITAfBgNVBAsTGERvbWFpbiBDb250cm9sIFZhbGlkYXRlZDEdMBsGA1UE\nCxMUUG9zaXRpdmVTU0wgV2lsZGNhcmQxFzAVBgNVBAMUDioudmlzdWFsb3BzLmlv\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2PSMweBuIoF+FG6M24FG\niSLZ6l4E5hHkdwpYg/LEE0s5RJ5WDUJWt16ixTscYcDK/AoXjSWaN7StyVQ3hHsb\n9EVlk5ljEISF0DoFMvGqTBATB/ZaE2TqiVXRUZaaQTFxBgiA5Bme8RDUFr2hpS79\nNPJ5JZU+qLsamZ/EaJm/8xg3sckY9zG/SMYvktMw0Kwb+3Sdn8dZSa3/8FhATEpe\nmAMYCXTzI04hfq5kbLlveklSDsnw3vBmMo4pZVnqyd2LGNOITFy7T+R9yQiK3i+y\nF4c9KIJgGGtIC+9kajU7kMCrmAhq2s/a/RN7Oq+hWx2uz0mmWCIe7pLr0HJvC1tq\nhwIDAQABo4IBpzCCAaMwHwYDVR0jBBgwFoAUmeRAX2sUXj4F2d3TY1T8Yrj3AKww\nHQYDVR0OBBYEFLXrdQPZF6zUlOKQfmkFy4jZ/U30MA4GA1UdDwEB/wQEAwIFoDAM\nBgNVHRMBAf8EAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjBQBgNV\nHSAESTBHMDsGCysGAQQBsjEBAgIHMCwwKgYIKwYBBQUHAgEWHmh0dHA6Ly93d3cu\ncG9zaXRpdmVzc2wuY29tL0NQUzAIBgZngQwBAgEwOwYDVR0fBDQwMjAwoC6gLIYq\naHR0cDovL2NybC5jb21vZG9jYS5jb20vUG9zaXRpdmVTU0xDQTIuY3JsMGwGCCsG\nAQUFBwEBBGAwXjA2BggrBgEFBQcwAoYqaHR0cDovL2NydC5jb21vZG9jYS5jb20v\nUG9zaXRpdmVTU0xDQTIuY3J0MCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5jb21v\nZG9jYS5jb20wJwYDVR0RBCAwHoIOKi52aXN1YWxvcHMuaW+CDHZpc3VhbG9wcy5p\nbzANBgkqhkiG9w0BAQUFAAOCAQEAzhAURhFuwMaWXaKOTUuDE46NjA3gAhdmWcNt\n9m97kddNMzwdLeCmzCAP5pVsSx4PMm1P+eWq46W1C2SObFCL3vLaWB9o4lt+ufmI\n4fTsi76qIhm90IVDQdnz7V9UoyRcXMsKx7HnfaW16DHxjj0bvOjN9VBTzr8BF+fB\nxjTxJiv1yOHxvpE1zn469VTAerDD9US2eusZlf6uh/uB/I4UTjq2LG9dBz+aTPre\nWBkJsNi+RduPwjpNZ5S+kZev03jkhyvaDd1LDduJ3xayX/4ODZVGgp/xe9cxZt+D\ne2xP6Y71oeEL+LVB1lMVMCUDB9zg+GiAmZ3QHv5y/ZabUOmm6w==\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIE5TCCA82gAwIBAgIQB28SRoFFnCjVSNaXxA4AGzANBgkqhkiG9w0BAQUFADBv\nMQswCQYDVQQGEwJTRTEUMBIGA1UEChMLQWRkVHJ1c3QgQUIxJjAkBgNVBAsTHUFk\nZFRydXN0IEV4dGVybmFsIFRUUCBOZXR3b3JrMSIwIAYDVQQDExlBZGRUcnVzdCBF\neHRlcm5hbCBDQSBSb290MB4XDTEyMDIxNjAwMDAwMFoXDTIwMDUzMDEwNDgzOFow\nczELMAkGA1UEBhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4G\nA1UEBxMHU2FsZm9yZDEaMBgGA1UEChMRQ09NT0RPIENBIExpbWl0ZWQxGTAXBgNV\nBAMTEFBvc2l0aXZlU1NMIENBIDIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK\nAoIBAQDo6jnjIqaqucQA0OeqZztDB71Pkuu8vgGjQK3g70QotdA6voBUF4V6a4Rs\nNjbloyTi/igBkLzX3Q+5K05IdwVpr95XMLHo+xoD9jxbUx6hAUlocnPWMytDqTcy\nUg+uJ1YxMGCtyb1zLDnukNh1sCUhYHsqfwL9goUfdE+SNHNcHQCgsMDqmOK+ARRY\nFygiinddUCXNmmym5QzlqyjDsiCJ8AckHpXCLsDl6ez2PRIHSD3SwyNWQezT3zVL\nyOf2hgVSEEOajBd8i6q8eODwRTusgFX+KJPhChFo9FJXb/5IC1tdGmpnc5mCtJ5D\nYD7HWyoSbhruyzmuwzWdqLxdsC/DAgMBAAGjggF3MIIBczAfBgNVHSMEGDAWgBSt\nvZh6NLQm9/rEJlTvA73gJMtUGjAdBgNVHQ4EFgQUmeRAX2sUXj4F2d3TY1T8Yrj3\nAKwwDgYDVR0PAQH/BAQDAgEGMBIGA1UdEwEB/wQIMAYBAf8CAQAwEQYDVR0gBAow\nCDAGBgRVHSAAMEQGA1UdHwQ9MDswOaA3oDWGM2h0dHA6Ly9jcmwudXNlcnRydXN0\nLmNvbS9BZGRUcnVzdEV4dGVybmFsQ0FSb290LmNybDCBswYIKwYBBQUHAQEEgaYw\ngaMwPwYIKwYBBQUHMAKGM2h0dHA6Ly9jcnQudXNlcnRydXN0LmNvbS9BZGRUcnVz\ndEV4dGVybmFsQ0FSb290LnA3YzA5BggrBgEFBQcwAoYtaHR0cDovL2NydC51c2Vy\ndHJ1c3QuY29tL0FkZFRydXN0VVROU0dDQ0EuY3J0MCUGCCsGAQUFBzABhhlodHRw\nOi8vb2NzcC51c2VydHJ1c3QuY29tMA0GCSqGSIb3DQEBBQUAA4IBAQCcNuNOrvGK\nu2yXjI9LZ9Cf2ISqnyFfNaFbxCtjDei8d12nxDf9Sy2e6B1pocCEzNFti/OBy59L\ndLBJKjHoN0DrH9mXoxoR1Sanbg+61b4s/bSRZNy+OxlQDXqV8wQTqbtHD4tc0azC\ne3chUN1bq+70ptjUSlNrTa24yOfmUlhNQ0zCoiNPDsAgOa/fT0JbHtMJ9BgJWSrZ\n6EoYvzL7+i1ki4fKWyvouAt+vhcSxwOCKa9Yr4WEXT0K3yNRw82vEL+AaXeRCk/l\nuuGtm87fM04wO+mPZn+C+mv626PAcwDj1hKvTfIPWhRRH224hoFiB85ccsJP81cq\ncdnUl4XmGFO3\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIENjCCAx6gAwIBAgIBATANBgkqhkiG9w0BAQUFADBvMQswCQYDVQQGEwJTRTEU\nMBIGA1UEChMLQWRkVHJ1c3QgQUIxJjAkBgNVBAsTHUFkZFRydXN0IEV4dGVybmFs\nIFRUUCBOZXR3b3JrMSIwIAYDVQQDExlBZGRUcnVzdCBFeHRlcm5hbCBDQSBSb290\nMB4XDTAwMDUzMDEwNDgzOFoXDTIwMDUzMDEwNDgzOFowbzELMAkGA1UEBhMCU0Ux\nFDASBgNVBAoTC0FkZFRydXN0IEFCMSYwJAYDVQQLEx1BZGRUcnVzdCBFeHRlcm5h\nbCBUVFAgTmV0d29yazEiMCAGA1UEAxMZQWRkVHJ1c3QgRXh0ZXJuYWwgQ0EgUm9v\ndDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALf3GjPm8gAELTngTlvt\nH7xsD821+iO2zt6bETOXpClMfZOfvUq8k+0DGuOPz+VtUFrWlymUWoCwSXrbLpX9\nuMq/NzgtHj6RQa1wVsfwTz/oMp50ysiQVOnGXw94nZpAPA6sYapeFI+eh6FqUNzX\nmk6vBbOmcZSccbNQYArHE504B4YCqOmoaSYYkKtMsE8jqzpPhNjfzp/haW+710LX\na0Tkx63ubUFfclpxCDezeWWkWaCUN/cALw3CknLa0Dhy2xSoRcRdKn23tNbE7qzN\nE0S3ySvdQwAl+mG5aWpYIxG3pzOPVnVZ9c0p10a3CitlttNCbxWyuHv77+ldU9U0\nWicCAwEAAaOB3DCB2TAdBgNVHQ4EFgQUrb2YejS0Jvf6xCZU7wO94CTLVBowCwYD\nVR0PBAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wgZkGA1UdIwSBkTCBjoAUrb2YejS0\nJvf6xCZU7wO94CTLVBqhc6RxMG8xCzAJBgNVBAYTAlNFMRQwEgYDVQQKEwtBZGRU\ncnVzdCBBQjEmMCQGA1UECxMdQWRkVHJ1c3QgRXh0ZXJuYWwgVFRQIE5ldHdvcmsx\nIjAgBgNVBAMTGUFkZFRydXN0IEV4dGVybmFsIENBIFJvb3SCAQEwDQYJKoZIhvcN\nAQEFBQADggEBALCb4IUlwtYj4g+WBpKdQZic2YR5gdkeWxQHIzZlj7DYd7usQWxH\nYINRsPkyPef89iYTx4AWpb9a/IfPeHmJIZriTAcKhjW88t5RxNKWt9x+Tu5w/Rw5\n6wwCURQtjr0W4MHfRnXnJK3s9EK0hZNwEGe6nQY1ShjTK3rMUUKhemPR5ruhxSvC\nNr4TDea9Y355e6cJDUCrat2PisP29owaQgVR1EX1n6diIWgVIEM8med8vSTYqZEX\nc4g/VhsxOBi0cQ+azcgOno4uG+GMmIPLHzHxREzGBHNJdmAPx/i9F4BrLunMTA5a\nmnkPIAou1Z5jJh5VkpTYghdae9C8x49OhgQ=\n-----END CERTIFICATE-----"
        }).save();
      }
    };
  });

}).call(this);

