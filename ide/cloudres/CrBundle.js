(function() {
  define('ide/cloudres/CrModel',["ApiRequest", "backbone"], function(ApiRequest) {
    return Backbone.Model.extend({
      initialize: function(attr, options) {
        if (options && options.RES_TAG) {
          this.RES_TAG = options.RES_TAG;
        }
      },
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

      /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     env:dev:end */
    });
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('ide/cloudres/CrCollection',["ApiRequest", "./CrModel", "constant", "backbone"], function(ApiRequest, CrModel, constant) {
    var SubCollections, SubColsByAwsResType, emptyArr, __camelToPascal, __needUnify, __needUnifyList, __replaceKey, __replaceKeyInList;
    SubCollections = {};
    emptyArr = [];
    SubColsByAwsResType = {};
    __needUnifyList = {
      INSTANCE: {
        networkInterfaces: 'networkInterfaceSet',
        state: 'instanceState',
        securityGroups: 'groupSet',
        blockDeviceMappings: 'blockDeviceMapping',
        publicDnsName: 'dnsName'
      },
      VOL: {
        attachments: 'attachmentSet'
      },
      RT: {
        associations: 'associationSet',
        routes: 'routeSet',
        propagatingVgws: 'propagatingVgwSet'
      },
      SG: {
        description: 'groupDescription'
      },
      VGW: {
        vpcAttachments: "attachments"
      },
      IGW: {
        attachments: "attachmentSet"
      },
      LC: {
        blockDeviceMappings: "BlockDeviceMapping"
      },
      ALL: {
        associations: 'associationSet',
        privateIpAddresses: 'privateIpAddressesSet',
        groups: 'groupSet'
      }
    };
    __needUnify = function(type) {
      var all, longTypeList;
      all = jQuery.extend(true, {}, __needUnifyList.ALL);
      longTypeList = constant.WRAP(__needUnifyList);
      return _.extend(all, longTypeList[type]);
    };
    __replaceKey = function(obj, oldKey, newKey) {
      obj[newKey] = obj[oldKey];
      return delete obj[oldKey];
    };
    __camelToPascal = function(obj) {
      var exceptionList, k, newKey, v, _results;
      exceptionList = ['member', 'item'];
      _results = [];
      for (k in obj) {
        v = obj[k];
        newKey = k.substring(0, 1).toUpperCase() + k.substring(1);
        if (__indexOf.call(exceptionList, k) < 0 && newKey !== k) {
          _results.push(__replaceKey(obj, k, newKey));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    __replaceKeyInList = function(obj, type) {
      var k, needReplaceList, v, _results;
      needReplaceList = __needUnify(type);
      _results = [];
      for (k in obj) {
        v = obj[k];
        if (__indexOf.call(_.keys(needReplaceList), k) >= 0) {
          _results.push(__replaceKey(obj, k, needReplaceList[k]));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    return Backbone.Collection.extend({
      category: "",
      model: CrModel,
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
          var d, e, _i, _len;
          if (!self.__selfParseData) {
            try {
              if (self.trAwsXml) {
                data = self.trAwsXml(data);
              }
              if (self.parseFetchData && data) {
                data = self.parseFetchData(data);
              }
              if (!data) {
                data = emptyArr;
              }
            } catch (_error) {
              e = _error;
              throw McError(ApiRequest.Errors.InvalidAwsReturn, "Failed to parse aws data.", [data, e]);
            }
            if (self.modelIdAttribute) {
              for (_i = 0, _len = data.length; _i < _len; _i++) {
                d = data[_i];
                d.id = d[self.modelIdAttribute];
                delete d[self.modelIdAttribute];
              }
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
      __parseExternalData: function(awsData, extraAttr, category) {
        var d, e, i, toAddIds, ts, _i, _j, _len, _len1, _ref;
        try {
          if (this.parseExternalData) {
            awsData = this.parseExternalData(awsData);
          } else if (this.parseFetchData) {
            awsData = this.parseFetchData(awsData);
          }
        } catch (_error) {
          e = _error;
          return null;
        }
        if (!awsData || !awsData.length) {
          this.trigger("update");
          return;
        }
        toAddIds = [];
        for (_i = 0, _len = awsData.length; _i < _len; _i++) {
          d = awsData[_i];
          d.category = category;
          if (d.tags) {
            d.tagSet = d.tags;
            delete d.tags;
          }
          if (_.isArray(d.tagSet)) {
            ts = {};
            _ref = d.tagSet;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              i = _ref[_j];
              ts[i.key] = i.value;
            }
            d.tagSet = ts;
          }
          if (this.modelIdAttribute) {
            d.id = d[this.modelIdAttribute];
            delete d[this.modelIdAttribute];
          }
          toAddIds.push(d.id);
        }
        this.remove(toAddIds, {
          silent: true
        });
        this.add(awsData, extraAttr);
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
      },

      /* env:dev                                                                                                                                                                                                                                                                                                            env:dev:end */
      where: function(option, first) {
        var hasOtherAttr, key, res;
        if (option.category && option.category === this.category) {
          delete option.category;
        }
        for (key in option) {
          if (option.hasOwnProperty(key)) {
            hasOtherAttr = true;
            break;
          }
        }
        if (hasOtherAttr) {
          res = Backbone.Collection.prototype.where.call(this, option) || [];
        } else {
          res = this.models.slice(0);
        }
        if (first) {
          return res[0];
        } else {
          return res;
        }
      },
      convertNumTimeToString: function(obj) {
        var camelKey, date, value;
        for (camelKey in obj) {
          value = obj[camelKey];
          if (!(obj.hasOwnProperty(camelKey))) {
            continue;
          }
          if (_.isObject(obj[camelKey]) || _.isArray(obj[camelKey])) {
            this.convertNumTimeToString(value);
          } else if (_.isNumber(obj[camelKey])) {
            obj[camelKey] = String(obj[camelKey]);
            if (camelKey && camelKey.toLowerCase().indexOf('time') !== -1 && obj[camelKey].length > 12) {
              date = new Date(Number(obj[camelKey]));
              if (date) {
                obj[camelKey] = date.toISOString();
              }
            }
          }
        }
        return obj;
      },
      unifyApi: function(obj, type) {
        var hit, key, value;
        hit = false;
        if (!_.isObject(obj)) {
          return obj;
        }
        for (key in obj) {
          value = obj[key];
          if (!(obj.hasOwnProperty(key))) {
            continue;
          }
          if (!_.isArray(obj)) {
            __replaceKeyInList(obj, type);
            hit = true;
          }
          if (!hit) {
            this.unifyApi(value, type);
          }
        }
        return obj;
      },
      camelToPascal: function(obj) {
        var camelKey, exceptionList, pascalKey, value;
        exceptionList = ['member', 'item'];
        if (!_.isObject(obj)) {
          return obj;
        }
        for (camelKey in obj) {
          value = obj[camelKey];
          if (!(obj.hasOwnProperty(camelKey))) {
            continue;
          }
          pascalKey = camelKey.substring(0, 1).toUpperCase() + camelKey.substring(1);
          if (!_.isArray(obj) && pascalKey !== camelKey && __indexOf.call(exceptionList, camelKey) < 0) {
            obj[pascalKey] = value;
            delete obj[camelKey];
          }
          this.camelToPascal(value);
        }
        return obj;
      }
    }, {
      category: function(category) {
        return category;
      },
      getClassByType: function(id) {
        return SubCollections[id];
      },
      getClassByAwsResponseType: function(typeString) {
        return SubColsByAwsResType[typeString];
      },
      extend: function(protoProps, staticProps) {
        var AwsResponseType, subClass;
        console.assert(protoProps.type, "Subclass of CloudResourceCollection does not specifying a type");
        if (protoProps.AwsResponseType) {
          AwsResponseType = protoProps.AwsResponseType;
          delete protoProps.AwsResponseType;
        }
        staticProps = staticProps || {};
        staticProps.type = protoProps.type;
        subClass = CrModel.extend.call(this, protoProps, staticProps);
        SubCollections[protoProps.type] = subClass;
        if (AwsResponseType) {
          SubColsByAwsResType[AwsResponseType] = subClass;
        }
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
    CloudResources = function(resourceType, category) {
      var Collection, c, cid;
      Collection = CrCollection.getClassByType(resourceType);
      if (!Collection) {
        return null;
      }
      category = Collection.category(category);
      cid = resourceType + "_" + category;
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
      return Q.all(_.values(CachedCollections).map(function(cln) {
        return cln.fetchForce();
      }));
    };
    CloudResources.clearWhere = function(detect, category) {
      var Collection, cln, find, id, realCate;
      if (_.isFunction(detect)) {
        find = "filter";
      } else {
        find = "where";
      }
      for (id in CachedCollections) {
        cln = CachedCollections[id];
        Collection = CrCollection.getClassByType(cln.type);
        realCate = Collection.category(category);
        if (cln.category === realCate) {
          cln.remove(cln[find](detect));
        }
      }
    };
    return CloudResources;
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
          if (key !== "id" && key !== "tagSet" && (value.length > 0)) {
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
      idAttribute: "keyName",
      taggable: false,
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
          var e, keyName;
          try {
            self.set(res.CreateKeyPairResponse);
            keyName = res.CreateKeyPairResponse.keyName;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Keypair created but aws returns invalid ata.");
          }
          self.set('keyName', keyName);
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
            res = res.SubscribeResponse.SubscribeResult;
            arn = res.SubscriptionArn;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Subscription created but aws returns invalid ata.");
          }
          if (arn === "pending confirmation") {
            arn = "PendingConfirmation";
          }
          self.set({
            id: CrSubscriptionModel.getIdFromData(res),
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
      getIdFromData: function(res) {
        return ("" + res.TopicArn + ":" + res.Protocol + ":" + res.Endpoint).replace("arn:aws:sns:", "");
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
      trAwsXml: function(res) {
        var _ref;
        return (_ref = res.DescribeDhcpOptionsResponse.dhcpOptionsSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(res) {
        var i, _i, _len;
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          i = res[_i];
          i.id = i.dhcpOptionsId;
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
      trAwsXml: function(res) {
        var _ref;
        return (_ref = res.DescribeKeyPairsResponse.keySet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(res) {
        var i, _i, _len;
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
      trAwsXml: function(res) {
        var _ref;
        return (_ref = res.ListServerCertificatesResponse.ListServerCertificatesResult.ServerCertificateMetadataList) != null ? _ref.member : void 0;
      },
      parseFetchData: function(res) {
        var i, _i, _len;
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
      trAwsXml: function(res) {
        var _ref;
        return (_ref = res.ListTopicsResponse.ListTopicsResult.Topics) != null ? _ref.member : void 0;
      },
      parseFetchData: function(res) {
        var i, _i, _len;
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
      trAwsXml: function(res) {
        var _ref;
        return (_ref = res.ListSubscriptionsResponse.ListSubscriptionsResult.Subscriptions) != null ? _ref.member : void 0;
      },
      parseFetchData: function(res) {
        var i, _i, _len;
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          i = res[_i];
          i.id = CrSubscriptionModel.getIdFromData(i);
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
      trAwsXml: function(res) {
        var _ref;
        return (_ref = res.DescribeSnapshotsResponse.snapshotSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(res) {
        var i, _i, _len;
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
  define('ide/cloudres/CrCommonCollection',["ApiRequest", "./CrCollection", "./CrModel", "constant"], function(ApiRequest, CrCollection, CrModel, constant) {
    var CrCommonCollection, EmptyArr;
    EmptyArr = [];
    CrCommonCollection = CrCollection.extend({

      /* env:dev                                                  env:dev:end */
      model: CrModel,
      type: "CrCommonCollection",
      __selfParseData: true,
      groupByCategory: function(opts, filter) {
        var R, list, m, models, r, regionMap, regions, totalCount, _i, _j, _len, _len1, _ref, _ref1;
        opts = opts || {
          includeEmptyRegion: true,
          calcSum: true,
          toJSON: false
        };
        regionMap = {};
        _ref = this.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          m = _ref[_i];
          if (filter && filter(m) === false) {
            continue;
          }
          r = m.attributes.category;
          list = regionMap[r] || (regionMap[r] = []);
          list.push(opts.toJSON ? m.toJSON() : m);
        }
        totalCount = 0;
        regions = [];
        _ref1 = constant.REGION_KEYS;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          R = _ref1[_j];
          models = regionMap[R];
          if (models) {
            totalCount += models.length;
          } else if (!opts.includeEmptyRegion) {
            continue;
          }
          regions.push({
            region: R,
            regionName: constant.REGION_SHORT_LABEL[R],
            regionArea: constant.REGION_LABEL[R],
            data: models || []
          });
        }
        if (opts.calcSum) {
          regions.totalCount = totalCount;
        }
        return regions;
      },
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
          var d, dataXml, e, regionId, transformed, xml, _i, _len, _ref;
          transformed = [];
          for (regionId in data) {
            dataXml = data[regionId];
            if (!dataXml[0]) {
              continue;
            }
            try {
              xml = $.xml2json($.parseXML(dataXml[0]));
              if (self.trAwsXml) {
                xml = self.trAwsXml(xml);
              }
              if (self.parseFetchData && xml) {
                xml = self.parseFetchData(xml);
              }
              _ref = xml || EmptyArr;
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
  define('ide/cloudres/CrClnCommonRes',["./CrCommonCollection", "./CrCollection", "./CrModel", "ApiRequest", "constant", "CloudResources"], function(CrCommonCollection, CrCollection, CrModel, ApiRequest, constant, CloudResources) {

    /* Elb */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.ELB,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeLoadBalancersResponse.DescribeLoadBalancersResult.LoadBalancerDescriptions) != null ? _ref.member : void 0;
      },
      parseFetchData: function(elbs) {
        var elb, fixKey, i, idx, key, value, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        for (_i = 0, _len = elbs.length; _i < _len; _i++) {
          elb = elbs[_i];
          for (key in elb) {
            value = elb[key];
            fixKey = key.substring(0, 1).toUpperCase() + key.substring(1);
            delete elb[key];
            elb[fixKey] = value;
          }
          elb.id = elb.LoadBalancerName;
          elb.AvailabilityZones = ((_ref = elb.AvailabilityZones) != null ? _ref.member : void 0) || [];
          elb.Instances = ((_ref1 = elb.Instances) != null ? _ref1.member : void 0) || [];
          elb.SecurityGroups = ((_ref2 = elb.SecurityGroups) != null ? _ref2.member : void 0) || [];
          elb.Subnets = ((_ref3 = elb.Subnets) != null ? _ref3.member : void 0) || [];
          elb.ListenerDescriptions = ((_ref4 = elb.ListenerDescriptions) != null ? _ref4.member : void 0) || [];
          _ref5 = elb.Instances;
          for (idx = _j = 0, _len1 = _ref5.length; _j < _len1; idx = ++_j) {
            i = _ref5[idx];
            elb.Instances[idx] = i.InstanceId;
          }
          elb.vpcId = elb.VPCId;
          elb.id = elb.DNSName;
          elb.Name = elb.LoadBalancerName;
          delete elb.VPCId;
        }
        return elbs;
      },
      parseExternalData: function(data) {
        this.camelToPascal(data);
        this.unifyApi(data, this.type);
        this.convertNumTimeToString(data);
        _.each(data, function(dataItem) {
          dataItem.Instances = _.map(dataItem.Instances, function(obj) {
            return obj.InstanceId;
          });
          dataItem.ListenerDescriptions = _.map(dataItem.ListenerDescriptions, function(obj) {
            obj.PolicyNames = {
              member: obj.PolicyNames
            };
            return obj;
          });
          dataItem.id = dataItem.Dnsname;
          return dataItem.Name = dataItem.LoadBalancerName;
        });
        return data;
      }
    });

    /* VPN */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.VPN,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeVpnConnectionsResponse.vpnConnectionSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(vpns) {
        var vpn, _i, _len, _ref, _ref1;
        _ref = vpns || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          vpn = _ref[_i];
          vpn.vgwTelemetry = ((_ref1 = vpn.vgwTelemetry) != null ? _ref1.item : void 0) || [];
          vpn.id = vpn.vpnConnectionId;
        }
        return vpns;
      },
      parseExternalData: function(data) {
        var vpn, _i, _len, _ref;
        this.unifyApi(data, this.type);
        _ref = data || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          vpn = _ref[_i];
          vpn.id = vpn.vpnConnectionId;
        }
        return data;
      }
    });

    /* EIP */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.EIP,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeAddressesResponse.addressesSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(eips) {
        var eip, _i, _len;
        for (_i = 0, _len = eips.length; _i < _len; _i++) {
          eip = eips[_i];
          eip.id = eip.allocationId;
        }
        return eips;
      },
      parseExternalData: function(data) {
        var eip, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          eip = data[_i];
          eip.id = eip.allocationId;
        }
        return data;
      }
    });

    /* VPC */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.VPC,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeVpcsResponse.vpcSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(vpcs) {
        var vpc, _i, _len;
        for (_i = 0, _len = vpcs.length; _i < _len; _i++) {
          vpc = vpcs[_i];
          vpc.id = vpc.vpcId;
        }
        return vpcs;
      },
      parseExternalData: function(data) {
        var vpc, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          vpc = data[_i];
          vpc.id = vpc.vpcId;
        }
        return data;
      }
    });

    /* ASG */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.ASG,
      modelIdAttribute: "AutoScalingGroupARN",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeAutoScalingGroupsResponse.DescribeAutoScalingGroupsResult.AutoScalingGroups) != null ? _ref.member : void 0;
      },
      parseFetchData: function(asgs) {
        var asg, _i, _len, _ref, _ref1, _ref2, _ref3;
        for (_i = 0, _len = asgs.length; _i < _len; _i++) {
          asg = asgs[_i];
          asg.id = asg.AutoScalingGroupARN;
          asg.Name = asg.AutoScalingGroupName;
          asg.AvailabilityZones = ((_ref = asg.AvailabilityZones) != null ? _ref.member : void 0) || [];
          asg.Instances = ((_ref1 = asg.Instances) != null ? _ref1.member : void 0) || [];
          asg.LoadBalancerNames = ((_ref2 = asg.LoadBalancerNames) != null ? _ref2.member : void 0) || [];
          asg.TerminationPolicies = ((_ref3 = asg.TerminationPolicies) != null ? _ref3.member : void 0) || [];
          asg.DefaultCooldown = Number(asg.DefaultCooldown);
          asg.DesiredCapacity = Number(asg.DesiredCapacity);
          asg.HealthCheckGracePeriod = Number(asg.HealthCheckGracePeriod);
          asg.MaxSize = Number(asg.MaxSize);
          asg.MinSize = Number(asg.MinSize);
          asg.Subnets = (asg.VPCZoneIdentifier || asg.VpczoneIdentifier).split(",");
        }
        return asgs;
      },
      parseExternalData: function(data) {
        var asg, _i, _len;
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          asg = data[_i];
          asg.id = asg.AutoScalingGroupARN;
          asg.Name = asg.AutoScalingGroupName;
          asg.Subnets = (asg.VPCZoneIdentifier || asg.VpczoneIdentifier).split(",");
        }
        return data;
      }
    });

    /* CloudWatch */
    CrCommonCollection.extend({

      /* env:dev                                                      env:dev:end */
      type: constant.RESTYPE.CW,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeAlarmsResponse.DescribeAlarmsResult.MetricAlarms) != null ? _ref.member : void 0;
      },
      parseFetchData: function(cws) {
        var cw, _i, _len, _ref, _ref1;
        for (_i = 0, _len = cws.length; _i < _len; _i++) {
          cw = cws[_i];
          cw.Dimensions = ((_ref = cw.Dimensions) != null ? _ref.member : void 0) || [];
          cw.AlarmActions = ((_ref1 = cw.AlarmActions) != null ? _ref1.member : void 0) || [];
          cw.id = cw.AlarmArn;
          cw.Name = cw.AlarmName;
        }
        return cws;
      },
      parseExternalData: function(data) {
        var cw, _i, _len;
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          cw = data[_i];
          cw.id = cw.AlarmArn;
          cw.Name = cw.AlarmName;
        }
        return data;
      }
    });

    /* CGW */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.CGW,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeCustomerGatewaysResponse.customerGatewaySet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(cgws) {
        var cgw, _i, _len;
        for (_i = 0, _len = cgws.length; _i < _len; _i++) {
          cgw = cgws[_i];
          cgw.id = cgw.customerGatewayId;
        }
        return cgws;
      },
      parseExternalData: function(data) {
        var cgw, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          cgw = data[_i];
          cgw.id = cgw.customerGatewayId;
        }
        return data;
      }
    });

    /* VGW */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.VGW,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeVpnGatewaysResponse.vpnGatewaySet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(vgws) {
        var vgw, _i, _len;
        for (_i = 0, _len = vgws.length; _i < _len; _i++) {
          vgw = vgws[_i];
          vgw.id = vgw.vpnGatewayId;
          if (vgw.attachments && vgw.attachments.length > 0) {
            vgw.vpcId = vgw.attachments[0].vpcId;
            vgw.attachmentState = vgw.attachments[0].state;
          }
        }
        return vgws;
      },
      parseExternalData: function(data) {
        var vgw, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          vgw = data[_i];
          vgw.id = vgw.vpnGatewayId;
          if (vgw.attachments && vgw.attachments.length > 0) {
            vgw.vpcId = vgw.attachments[0].vpcId;
            vgw.attachmentState = vgw.attachments[0].state;
          }
        }
        return data;
      }
    });

    /* IGW */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.IGW,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeInternetGatewaysResponse.internetGatewaySet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(igws) {
        var igw, _i, _len, _ref;
        for (_i = 0, _len = igws.length; _i < _len; _i++) {
          igw = igws[_i];
          igw.id = igw.internetGatewayId;
          igw.attachmentSet = ((_ref = igw.attachmentSet) != null ? _ref.item : void 0) || igw.attachments || [];
          if (igw.attachmentSet && igw.attachmentSet.length > 0) {
            igw.vpcId = igw.attachmentSet[0].vpcId;
            igw.state = igw.attachmentSet[0].state;
          }
        }
        return igws;
      },
      parseExternalData: function(data) {
        var igw, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          igw = data[_i];
          igw.id = igw.internetGatewayId;
          if (igw.attachmentSet && igw.attachmentSet.length > 0) {
            igw.vpcId = igw.attachmentSet[0].vpcId;
            igw.state = igw.attachmentSet[0].state;
          }
        }
        return data;
      }
    });

    /* RTB */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.RT,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeRouteTablesResponse.routeTableSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(rtbs) {
        var assoc, found, idx, local_rt, main_rt, rt, rtb, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3, _ref4;
        for (_i = 0, _len = rtbs.length; _i < _len; _i++) {
          rtb = rtbs[_i];
          rtb.routeSet = ((_ref = rtb.routeSet) != null ? _ref.item : void 0) || [];
          rtb.associationSet = ((_ref1 = rtb.associationSet) != null ? _ref1.item : void 0) || [];
          rtb.propagatingVgwSet = (_ref2 = rtb.propagatingVgwSet) != null ? _ref2.item([]) : void 0;
          found = -1;
          _ref3 = rtb.routeSet;
          for (idx = _j = 0, _len1 = _ref3.length; _j < _len1; idx = ++_j) {
            rt = _ref3[idx];
            if (rt.gatewayId === 'local') {
              found = idx;
            }
          }
          if (found > 0) {
            local_rt = rtb.routeSet.splice(found, 1);
            rtb.routeSet.splice(0, 0, local_rt[0]);
          }
          found = -1;
          _ref4 = rtb.associationSet;
          for (idx = _k = 0, _len2 = _ref4.length; _k < _len2; idx = ++_k) {
            assoc = _ref4[idx];
            if (assoc.main && found === -1) {
              found = idx;
            }
          }
          if (found > 0) {
            main_rt = rtb.associationSet.splice(found, 1);
            rtb.associationSet.splice(0, 0, main_rt[0]);
          }
          rtb.id = rtb.routeTableId;
        }
        return rtbs;
      },
      parseExternalData: function(data) {
        var assoc, found, idx, local_rt, main_rt, rt, rtb, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          rtb = data[_i];
          found = -1;
          _ref = rtb.routeSet;
          for (idx = _j = 0, _len1 = _ref.length; _j < _len1; idx = ++_j) {
            rt = _ref[idx];
            if (rt.gatewayId === 'local' && found === -1) {
              found = idx;
            }
          }
          if (found > 0) {
            local_rt = rtb.routeSet.splice(found, 1);
            rtb.routeSet.splice(0, 0, local_rt[0]);
          }
          found = -1;
          _ref1 = rtb.associationSet;
          for (idx = _k = 0, _len2 = _ref1.length; _k < _len2; idx = ++_k) {
            assoc = _ref1[idx];
            if (assoc.main && found === -1) {
              found = idx;
            }
          }
          if (found > 0) {
            main_rt = rtb.associationSet.splice(found, 1);
            rtb.associationSet.splice(0, 0, main_rt[0]);
          }
          rtb.id = rtb.routeTableId;
        }
        return data;
      }
    });

    /* INSTANCE */
    CrCommonCollection.extend({

      /* env:dev                                                    env:dev:end */
      initialize: function() {
        this.listenTo(this, "add", function(m) {
          return CloudResources(constant.RESTYPE.AMI, m.attributes.category).fetchAmi(m.attributes.imageId);
        });
      },
      type: constant.RESTYPE.INSTANCE,
      trAwsXml: function(data) {
        var i, ins, instances, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
        instances = [];
        _ref1 = ((_ref = data.DescribeInstancesResponse.reservationSet) != null ? _ref.item : void 0) || [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          i = _ref1[_i];
          _ref3 = ((_ref2 = i.instancesSet) != null ? _ref2.item : void 0) || [];
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            ins = _ref3[_j];
            instances.push(ins);
          }
        }
        return instances;
      },
      parseFetchData: function(data) {
        var ins, _i, _len, _ref, _ref1, _ref2, _ref3;
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          ins = data[_i];
          ins.id = ins.instanceId;
          if (ins.instanceState && ((_ref = ins.instanceState.name) === "terminated" || _ref === "shutting-down")) {
            continue;
          }
          ins.blockDeviceMapping = ((_ref1 = ins.blockDeviceMapping) != null ? _ref1.item : void 0) || [];
          ins.networkInterfaceSet = ((_ref2 = ins.networkInterfaceSet) != null ? _ref2.item : void 0) || [];
          ins.groupSet = ((_ref3 = ins.groupSet) != null ? _ref3.item : void 0) || [];
          if (ins.blockDeviceMapping && ins.blockDeviceMapping.length > 1) {
            ins.blockDeviceMapping = ins.blockDeviceMapping.sort(MC.createCompareFn("deviceName"));
          }
        }
        return data;
      },
      parseExternalData: function(data) {
        var eni, ins, _i, _j, _len, _len1, _ref, _ref1;
        this.convertNumTimeToString(data);
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          ins = data[_i];
          ins.id = ins.instanceId;
          if (ins.instanceState && ((_ref = ins.instanceState.name) === "terminated" || _ref === "shutting-down")) {
            continue;
          }
          _ref1 = ins.networkInterfaceSet;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            eni = _ref1[_j];
            if (eni.privateIpAddresses) {
              eni.privateIpAddressesSet = {
                item: eni.privateIpAddresses
              };
              delete eni.privateIpAddresses;
            }
            if (eni.groups) {
              eni.groupSet = {
                item: eni.groups
              };
              delete eni.groups;
            }
          }
          if (ins.blockDeviceMapping && ins.blockDeviceMapping.length > 1) {
            ins.blockDeviceMapping = ins.blockDeviceMapping.sort(MC.createCompareFn("deviceName"));
          }
        }
        return data;
      }
    });

    /* VOLUME */
    CrCommonCollection.extend({

      /* env:dev                                                  env:dev:end */
      type: constant.RESTYPE.VOL,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeVolumesResponse.volumeSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(volumes) {
        var vol, _i, _len, _ref;
        for (_i = 0, _len = volumes.length; _i < _len; _i++) {
          vol = volumes[_i];
          vol.id = vol.volumeId;
          vol.attachmentSet = ((_ref = vol.attachmentSet) != null ? _ref.item : void 0) || [];
          _.each(vol.attachmentSet, function(e, key) {
            var attachmentStatus, status;
            status = vol.status;
            attachmentStatus = e.status;
            _.extend(vol, e);
            vol.status = status;
            return vol.attachmentStatus = attachmentStatus;
          });
        }
        return volumes;
      },
      parseExternalData: function(data) {
        var vol, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          vol = data[_i];
          vol.id = vol.volumeId;
          _.each(vol.attachmentSet, function(e, key) {
            var attachmentStatus, status;
            status = vol.state;
            attachmentStatus = e.state;
            _.extend(vol, e);
            vol.status = status;
            return vol.attachmentStatus = attachmentStatus;
          });
        }
        return data;
      }
    });

    /* LC */
    CrCommonCollection.extend({

      /* env:dev                                              env:dev:end */
      type: constant.RESTYPE.LC,
      AwsResponseType: "DescribeLaunchConfigurationsResponse",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeLaunchConfigurationsResponse.DescribeLaunchConfigurationsResult.LaunchConfigurations) != null ? _ref.member : void 0;
      },
      parseFetchData: function(data) {
        var lc, _i, _len, _ref, _ref1;
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          lc = data[_i];
          lc.BlockDeviceMapping = ((_ref = lc.BlockDeviceMappings) != null ? _ref.member : void 0) || [];
          lc.SecurityGroups = ((_ref1 = lc.SecurityGroups) != null ? _ref1.member : void 0) || [];
          if (lc.BlockDeviceMapping && lc.BlockDeviceMapping.length > 1) {
            lc.BlockDeviceMapping = lc.BlockDeviceMapping.sort(MC.createCompareFn("DeviceName"));
          }
          lc.id = lc.LaunchConfigurationARN;
          lc.Name = lc.LaunchConfigurationName;
        }
        return data;
      },
      parseExternalData: function(data) {
        var lc, _i, _len;
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          lc = data[_i];
          if (lc.BlockDeviceMapping && lc.BlockDeviceMapping.length > 1) {
            lc.BlockDeviceMapping = lc.BlockDeviceMapping.sort(MC.createCompareFn("DeviceName"));
          }
          lc.id = lc.LaunchConfigurationARN;
          lc.Name = lc.LaunchConfigurationName;
        }
        return data;
      }
    });

    /* ScalingPolicy */
    CrCommonCollection.extend({

      /* env:dev                                                         env:dev:end */
      type: constant.RESTYPE.SP,
      AwsResponseType: "DescribePoliciesResponse",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribePoliciesResponse.DescribePoliciesResult.ScalingPolicies) != null ? _ref.member : void 0;
      },
      parseFetchData: function(sps) {
        var sp, _i, _len;
        for (_i = 0, _len = sps.length; _i < _len; _i++) {
          sp = sps[_i];
          sp.id = sp.PolicyARN;
          sp.Name = sp.PolicyName;
        }
        return sps;
      },
      parseExternalData: function(data) {
        var sp, _i, _len;
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          sp = data[_i];
          sp.id = sp.PolicyARN;
          sp.Name = sp.PolicyName;
        }
        return data;
      }
    });

    /* AvailabilityZone */
    CrCommonCollection.extend({

      /* env:dev                                              env:dev:end */
      type: constant.RESTYPE.AZ,
      AwsResponseType: "DescribeAvailabilityZonesResponse",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeAvailabilityZonesResponse.availabilityZoneInfo) != null ? _ref.item : void 0;
      },
      parseFetchData: function(azs) {
        var az, _i, _len;
        for (_i = 0, _len = azs.length; _i < _len; _i++) {
          az = azs[_i];
          az.id = az.zoneName;
        }
        return azs;
      },
      parseExternalData: function(data) {
        var az, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          az = data[_i];
          az.id = az.zoneName;
        }
        return data;
      }
    });

    /* NotificationConfiguartion */
    CrCommonCollection.extend({

      /* env:dev                                                        env:dev:end */
      type: constant.RESTYPE.NC,
      AwsResponseType: "DescribeNotificationConfigurationsResponse",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeNotificationConfigurationsResponse.DescribeNotificationConfigurationsResult.NotificationConfigurations) != null ? _ref.member : void 0;
      },
      parseFetchData: function(ncs) {
        var first, item, nc, newNcList, _i, _len;
        newNcList = [];
        for (_i = 0, _len = ncs.length; _i < _len; _i++) {
          nc = ncs[_i];
          first = nc[0];
          item = {
            AutoScalingGroupName: first.AutoScalingGroupName,
            TopicARN: first.TopicARN,
            NotificationType: _.pluck(nc, 'NotificationType')
          };
          item.id = item.NotificationType + "-" + item.TopicARN + "-" + item.AutoScalingGroupName;
          newNcList.push(item);
        }
        return newNcList;
      },
      parseExternalData: function(data) {
        var first, item, nc, newNcList, _i, _len;
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        newNcList = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          nc = data[_i];
          first = nc[0];
          item = {
            AutoScalingGroupName: first.AutoScalingGroupName,
            TopicARN: first.TopicARN,
            NotificationType: _.pluck(nc, 'NotificationType')
          };
          item.id = item.NotificationType + "-" + item.TopicARN + "-" + item.AutoScalingGroupName;
          newNcList.push(item);
        }
        return newNcList;
      }
    });

    /* ACL */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.ACL,
      AwsResponseType: "DescribeNetworkAclsResponse",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeNetworkAclsResponse.networkAclSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(acls) {
        var acl, _i, _len, _ref, _ref1;
        for (_i = 0, _len = acls.length; _i < _len; _i++) {
          acl = acls[_i];
          acl.id = acl.networkAclId;
          acl.entrySet = ((_ref = acl.entrySet) != null ? _ref.item : void 0) || [];
          acl.associationSet = ((_ref1 = acl.associationSet) != null ? _ref1.item : void 0) || [];
          if (acl.associationSet.length > 0) {
            acl.subnetId = acl.associationSet[0].subnetId;
          }
        }
        return acls;
      },
      parseExternalData: function(data) {
        var acl, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          acl = data[_i];
          acl.id = acl.networkAclId;
          if (acl.associationSet.length > 0) {
            acl.subnetId = acl.associationSet[0].subnetId;
          }
        }
        return data;
      }
    });

    /* ENI */
    CrCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.ENI,
      AwsResponseType: "DescribeNetworkInterfacesResponse",
      doFetch: function() {
        return ApiRequest("eni_DescribeNetworkInterfaces", {
          region_name: this.region()
        });
      },
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeNetworkInterfacesResponse.networkInterfaceSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(enis) {
        _.each(enis, function(eni, index) {
          eni.id = eni.networkInterfaceId;
          return _.each(eni, function(e, key) {
            var _ref, _ref1;
            if (key === "groupSet") {
              enis[index].groupSet = ((_ref = enis[index].groupSet) != null ? _ref.item : void 0) || [];
            }
            if (key === "privateIpAddressesSet") {
              return enis[index].privateIpAddressesSet = ((_ref1 = enis[index].privateIpAddressesSet) != null ? _ref1.item : void 0) || [];
            }
          });
        });
        return enis;
      },
      parseExternalData: function(data) {
        this.convertNumTimeToString(data);
        this.unifyApi(data, this.type);
        _.each(data, function(eni, index) {
          return eni.id = eni.networkInterfaceId;
        });
        return data;
      }
    });

    /* SUBNET */
    CrCollection.extend({

      /* env:dev                                                  env:dev:end */
      type: constant.RESTYPE.SUBNET,
      doFetch: function() {
        return ApiRequest("subnet_DescribeSubnets", {
          region_name: this.region()
        });
      },
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeSubnetsResponse.subnetSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(subnets) {
        _.each(subnets, function(subnet, index) {
          return subnet.id = subnet.subnetId;
        });
        return subnets;
      },
      parseExternalData: function(data) {
        this.unifyApi(data, this.type);
        _.each(data, function(subnet, index) {
          return subnet.id = subnet.subnetId;
        });
        return data;
      }
    });

    /* SG */
    return CrCollection.extend({

      /* env:dev                                              env:dev:end */
      type: constant.RESTYPE.SG,
      AwsResponseType: "DescribeSecurityGroupsResponse",
      doFetch: function() {
        return ApiRequest("sg_DescribeSecurityGroups", {
          region_name: this.region()
        });
      },
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeSecurityGroupsResponse.securityGroupInfo) != null ? _ref.item : void 0;
      },
      parseFetchData: function(sgs) {
        var sg, _i, _len, _ref, _ref1;
        for (_i = 0, _len = sgs.length; _i < _len; _i++) {
          sg = sgs[_i];
          sg.ipPermissions = ((_ref = sg.ipPermissions) != null ? _ref.item : void 0) || [];
          _.each(sg.ipPermissions, function(rule, idx) {
            return _.each(rule, function(e, key) {
              if (key === "groups" || key === "ipRanges") {
                return sg.ipPermissions[idx][key] = (e != null ? e.item : void 0) || [];
              }
            });
          });
          sg.ipPermissionsEgress = ((_ref1 = sg.ipPermissionsEgress) != null ? _ref1.item : void 0) || [];
          _.each(sg.ipPermissionsEgress, function(rule, idx) {
            return _.each(rule, function(e, key) {
              if (key === "groups" || key === "ipRanges") {
                return sg.ipPermissionsEgress[idx][key] = (e != null ? e.item : void 0) || [];
              }
            });
          });
          sg.id = sg.groupId;
        }
        return sgs;
      },
      parseExternalData: function(data) {
        var sg, sgRuls, _i, _len;
        this.unifyApi(data, this.type);
        this.convertNumTimeToString(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          sg = data[_i];
          sg.id = sg.groupId;
          sg.ipPermissions = sg.ipPermissions || [];
          sg.ipPermissionsEgress = sg.ipPermissionsEgress || [];
          sgRuls = sg.ipPermissions.concat(sg.ipPermissionsEgress);
          _.each(sgRuls, function(rule, idx) {
            if (rule.ipRanges && rule.ipRanges.length) {
              rule.ipRanges = [
                {
                  cidrIp: rule.ipRanges[0]
                }
              ];
            }
            rule.groups = [];
            if (rule.userIdGroupPairs) {
              rule.groups = rule.userIdGroupPairs;
              return delete rule.userIdGroupPairs;
            }
          });
        }
        return data;
      }
    });
  });

}).call(this);

(function() {
  define('ide/cloudres/CrClnOpsResource',["ApiRequest", "./CrCollection", "constant", "CloudResources"], function(ApiRequest, CrCollection, constant, CloudResources) {

    /* This Connection is used to fetch all the resource of an vpc */
    return CrCollection.extend({

      /* env:dev                                               env:dev:end */
      type: "OpsResource",
      init: function(region) {
        this.__region = region;
        return this;
      },
      fetchForceDedup: function() {
        var p;
        this.__forceDedup = false;
        p = this.fetchForce();
        this.__forceDedup = true;
        return p;
      },
      fetchForce: function() {
        var d;
        if (this.__forceDedup) {
          this.__forceDedup = false;
          d = Q.defer();
          d.resolve();
          d.promise;
        }
        return CrCollection.prototype.fetchForce.call(this);
      },
      doFetch: function() {
        var self;
        self = this;
        CloudResources.clearWhere((function(m) {
          return m.RES_TAG === self.category;
        }), this.__region);
        console.assert(this.__region, "CrOpsCollection's region is not set before fetching data. Need to call init() first");
        return ApiRequest("resource_vpc_resource", {
          region_name: this.__region,
          vpc_id: this.category
        });
      },
      parseFetchData: function(data) {
        var cln, d, extraAttr, type;
        delete data.vpc;
        extraAttr = {
          RES_TAG: this.category
        };
        for (type in data) {
          d = data[type];
          cln = CloudResources(type, this.__region);
          if (!cln) {
            console.warn("Cannot find cloud resource collection for type:", type);
            continue;
          }
          cln.__parseExternalData(d, extraAttr, this.__region);
        }
      }
    });
  });

}).call(this);

(function() {
  define('ide/cloudres/CrClnAmi',["ApiRequest", "./CrCollection", "constant", "CloudResources"], function(ApiRequest, CrCollection, constant, CloudResources) {
    var INVALID_AMI_ID, MALFORM_AMI_ID, OS_TYPE_LIST, SQL_STANDARD_PATTERN, SQL_WEB_PATTERN, SpecificAmiCollection, fixDescribeImages, getOSFamily, getOSType;
    OS_TYPE_LIST = ['centos', 'redhat', 'rhel', 'ubuntu', 'debian', 'fedora', 'gentoo', 'opensuse', 'suse', 'amazon', 'amzn'];
    SQL_WEB_PATTERN = /sql.*?web.*?/i;
    SQL_STANDARD_PATTERN = /sql.*?standard.*?/i;
    INVALID_AMI_ID = /\[(.+?)\]/;
    MALFORM_AMI_ID = /\s["|'](.+?)["|']/;

    /* Helpers */
    getOSType = function(ami) {
      var desc, imgloc, name, osType, osTypeGuess1, osTypeGuess2, word, _i, _len;
      if (ami.osType) {
        return ami.osType;
      }
      if (ami.platform === "windows") {
        return "windows";
      }
      name = (ami.name || "").toLowerCase();
      desc = (ami.description || "").toLowerCase();
      imgloc = (ami.imageLocation || "").toLowerCase();
      for (_i = 0, _len = OS_TYPE_LIST.length; _i < _len; _i++) {
        word = OS_TYPE_LIST[_i];
        if (name.indexOf(word) >= 0) {
          osType = word;
          break;
        }
        if (desc.indexOf(word) >= 0) {
          osTypeGuess1 = word;
        }
        if (imgloc.indexOf(word) >= 0) {
          osTypeGuess2 = word;
        }
      }
      osType = osType || osTypeGuess1 || osTypeGuess2 || "linux-other";
      if (osType === "rhel") {
        return "redhat";
      }
      if (osType === "amzn") {
        return "amazon";
      }
      return osType;
    };
    getOSFamily = function(ami) {
      var osType;
      if (!ami.osType) {
        return "linux";
      }
      osType = ami.osType;
      if (osType === "windows" || osType === "win") {
        if (SQL_WEB_PATTERN.exec(ami.name || "") || SQL_WEB_PATTERN.exec(ami.description || "") || SQL_WEB_PATTERN.exec(ami.imageLocation || "")) {
          return "mswinSQLWeb";
        }
        if (SQL_STANDARD_PATTERN.exec(ami.name || "") || SQL_STANDARD_PATTERN.exec(ami.description || "") || SQL_STANDARD_PATTERN.exec(ami.imageLocation || "")) {
          return "mswinSQL";
        }
        return "mswin";
      }
      return constant.OS_TYPE_MAPPING[osType] || "linux";
    };
    fixDescribeImages = function(amiArray) {
      var ami, bdm, item, ms, _i, _j, _len, _len1, _ref, _ref1;
      ms = [];
      for (_i = 0, _len = amiArray.length; _i < _len; _i++) {
        ami = amiArray[_i];
        ami.id = ami.imageId;
        delete ami.imageId;
        bdm = {};
        _ref1 = ((_ref = ami.blockDeviceMapping) != null ? _ref.item : void 0) || [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          item = _ref1[_j];
          bdm[item.deviceName] = item.ebs || {};
        }
        ami.osType = getOSType(ami);
        ami.osFamily = getOSFamily(ami);
        ami.blockDeviceMapping = bdm;
        ms.push(ami.id);
      }
      return ms;
    };

    /* This Collection is used to fetch generic ami */
    CrCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.AMI,
      __selfParseData: true,
      initialize: function() {
        var id, invalidAmi, _i, _len, _ref;
        invalidAmi = localStorage.getItem("invalidAmi/" + this.region());
        this.__markedIds = {};
        if (invalidAmi) {
          _ref = invalidAmi.split(",");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            id = _ref[_i];
            this.__markedIds[id] = true;
          }
        }
      },
      doFetch: function() {
        var d;
        localStorage.setItem("invalidAmi/" + this.region(), "");
        this.__markedIds = {};
        d = Q.defer();
        d.resolve([]);
        this.trigger("update");
        return d.promise;
      },
      markId: function(amiId, invalid) {
        return this.__markedIds[amiId] = invalid;
      },
      isIdMarked: function(amiId) {
        return this.__markedIds.hasOwnProperty(amiId);
      },
      getOSFamily: function(amiId) {
        return getOSFamily(this.get(amiId));
      },
      saveInvalidAmiId: function() {
        var amiId, amis, value, _ref;
        amis = [];
        _ref = this.__markedIds;
        for (amiId in _ref) {
          value = _ref[amiId];
          if (value) {
            amis.push(amiId);
          }
        }
        return localStorage.setItem("invalidAmi/" + this.region(), amis.join(","));
      },
      fetchAmi: function(ami) {
        var self;
        if (!ami) {
          return;
        }
        console.assert(!_.isArray(ami), "CrClnAmi.fetchAmi() do not accept array param.");
        if (this.__toFetch) {
          this.__toFetch.push(ami);
          return;
        }
        this.__toFetch = [ami];
        self = this;
        setTimeout(function() {
          var f;
          f = self.__toFetch;
          self.__toFetch = null;
          return self.fetchAmis(f);
        }, 0);
      },
      fetchAmis: function(amis) {
        var amiId, d, self, toFetch, _i, _len;
        if (!amis) {
          return;
        }
        if (_.isString(amis)) {
          console.warn("Are you sure you want to call CrClnAmi.fetchAmis() with only one ami?");
          amis = [amis];
        }
        toFetch = [];
        for (_i = 0, _len = amis.length; _i < _len; _i++) {
          amiId = amis[_i];
          if (this.get(amiId)) {
            continue;
          }
          if (this.isIdMarked(amiId)) {
            if (this.__markedIds[amiId]) {
              console.info("Ami '" + amiId + "' is invalid. Ignore fetching info.");
            } else {
              console.log("Ami `" + amiId + "` is duplicated. Ignore fetching info.");
            }
            continue;
          }
          this.markId(amiId, false);
          toFetch.push(amiId);
        }
        if (toFetch.length === 0) {
          d = Q.defer();
          d.resolve();
          return d.promise;
        }
        self = this;
        return ApiRequest("ami_DescribeImages", {
          region_name: this.region(),
          ami_ids: toFetch
        }).then(function(res) {
          var _ref;
          res = (_ref = res.DescribeImagesResponse.imagesSet) != null ? _ref.item : void 0;
          if (res) {
            fixDescribeImages(res);
            self.add(res, {
              add: true,
              merge: true,
              remove: false
            });
          } else {
            self.trigger("update");
          }
          return self.saveInvalidAmiId();
        }, function(err) {
          var invalidId, p, __markedIds;
          if (err.awsErrorCode === "InvalidAMIID.NotFound") {
            invalidId = INVALID_AMI_ID.exec(err.awsResult);
          } else if (err.awsErrorCode === "InvalidAMIID.Malformed") {
            invalidId = MALFORM_AMI_ID.exec(err.awsResult);
          }
          if (!invalidId) {
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Can't describe AMIs and AWS returns invalid data. Please contact us when you encouter this issue.", toFetch);
          }
          invalidId = invalidId[1];
          console.info("The requested Ami '" + invalidId + "' is invalid, retrying to fetch");
          toFetch.splice(toFetch.indexOf(invalidId), 1);
          self.markId(invalidId, true);
          __markedIds = this.__markedIds;
          this.__markedIds = {};
          p = self.fetchAmis(toFetch);
          this.__markedIds = __markedIds;
          return p;
        });
      }
    });
    SpecificAmiCollection = CrCollection.extend({

      /* env:dev                                                       env:dev:end */
      type: "SpecificAmiCollection",
      initialize: function() {
        this.__models = [];
      },
      getModels: function() {
        var col, id, ms, _i, _len, _ref;
        ms = [];
        col = CloudResources(constant.RESTYPE.AMI, this.region());
        _ref = this.__models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          id = _ref[_i];
          ms.push(col.get(id));
        }
        return ms;
      },
      fetchForce: function() {
        this.__models = [];
        return CrCollection.prototype.fetchForce.call(this);
      }
    });

    /* This Collection is used to fetch quickstart ami */
    SpecificAmiCollection.extend({

      /* env:dev                                                         env:dev:end */
      type: "QuickStartAmi",
      doFetch: function() {
        return ApiRequest("aws_quickstart", {
          region_name: this.region()
        });
      },
      parseFetchData: function(data) {
        var ami, amiIds, id, savedAmis;
        savedAmis = [];
        amiIds = [];
        for (id in data) {
          ami = data[id];
          ami.id = id;
          savedAmis.push(ami);
          amiIds.push(id);
        }
        CloudResources(constant.RESTYPE.AMI, this.region()).add(savedAmis);
        this.__models = amiIds;
      }
    });

    /* This Collection is used to fetch my ami */
    SpecificAmiCollection.extend({

      /* env:dev                                                 env:dev:end */
      type: "MyAmi",
      doFetch: function() {
        var self, selfParam1, selfParam2;
        selfParam1 = {
          region_name: this.region(),
          executable_by: ["self"],
          filters: [
            {
              Name: "is-public",
              Value: false
            }
          ]
        };
        selfParam2 = {
          region_name: this.region(),
          owners: ["self"]
        };
        self = this;
        return Q.allSettled([ApiRequest("ami_DescribeImages", selfParam1), ApiRequest("ami_DescribeImages", selfParam2)]).spread(function(d1, d2) {
          var _ref, _ref1;
          d1 = ((_ref = d1.value.DescribeImagesResponse.imagesSet) != null ? _ref.item : void 0) || [];
          d2 = ((_ref1 = d2.value.DescribeImagesResponse.imagesSet) != null ? _ref1.item : void 0) || [];
          return self.onFetch(d1.concat(d2));
        }, function(r1, r2) {
          var d1, d2, _ref, _ref1;
          if (r1.state === "fulfilled") {
            d1 = (_ref = r1.value.DescribeImagesResponse.imagesSet) != null ? _ref.item : void 0;
          }
          if (r2.state === "fulfilled") {
            d2 = (_ref1 = r2.value.DescribeImagesResponse.imagesSet) != null ? _ref1.item : void 0;
          }
          if (d1 || d2) {
            self.onFetch([].concat(d1 || [], d2 || []));
          }
          if (d1.state === "rejected") {
            throw d1;
          }
          if (d2.state === "rejected") {
            throw d2;
          }
        });
      },
      onFetch: function(amiArray) {
        this.__models = fixDescribeImages(amiArray);
        CloudResources(constant.RESTYPE.AMI, this.region()).add(amiArray);
      },
      parseFetchData: function(data) {
        var ami, amiIds, e, savedAmis, _i, _len;
        savedAmis = [];
        amiIds = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          ami = data[_i];
          try {
            ami.id = ami.imageId;
            delete ami.imageId;
            savedAmis.push(ami);
            amiIds.push(ami.id);
          } catch (_error) {
            e = _error;
          }
        }
        CloudResources(constant.RESTYPE.AMI, this.region()).add(savedAmis);
        this.__models = amiIds;
      }
    });

    /* This Collection is used to fetch favorite ami */
    return SpecificAmiCollection.extend({

      /* env:dev                                                  env:dev:end */
      type: "FavoriteAmi",
      doFetch: function() {
        return ApiRequest("favorite_info", {
          region_name: this.region(),
          provider: "AWS",
          service: "EC2",
          resource: "AMI"
        });
      },
      parseFetchData: function(data) {
        var ami, e, favAmiId, item, savedAmis, _i, _len;
        savedAmis = [];
        favAmiId = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          ami = data[_i];
          try {
            item = JSON.parse(ami.amiVO);
            item.id = ami.id;
            savedAmis.push(item);
            favAmiId.push(ami.id);
          } catch (_error) {
            e = _error;
          }
        }
        CloudResources(constant.RESTYPE.AMI, this.region()).add(savedAmis);
        this.__models = favAmiId;
      },
      unfav: function(id) {
        var d, idx, self;
        self = this;
        idx = this.__models.indexOf(id);
        if (idx === -1) {
          d = Q.defer();
          d.resolve();
          return d.promise;
        }
        return ApiRequest("favorite_remove", {
          resource_ids: [id]
        }).then(function() {
          idx = self.__models.indexOf(id);
          self.__models.splice(idx, 1);
          self.trigger("update");
          return self;
        });
      },
      fav: function(ami) {
        var imageId, self;
        if (_.isString(ami)) {
          imageId = ami;
          ami = "";
        } else {
          ami = $.extend({}, ami);
          imageId = ami.id;
        }
        self = this;
        return ApiRequest("favorite_add", {
          resource: {
            id: imageId,
            provider: 'AWS',
            'resource': 'AMI',
            service: 'EC2'
          }
        }).then(function() {
          self.__models.push(imageId);
          if (ami) {
            CloudResources(constant.RESTYPE.AMI, self.region()).add(ami, {
              add: true,
              merge: true,
              remove: false
            });
          }
          self.trigger("update");
          return self;
        });
      }
    });
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('ide/cloudres/CloudImportVpc',["CloudResources", "ide/cloudres/CrCollection", "constant", "ApiRequest", "DiffTree"], function(CloudResources, CrCollection, constant, ApiRequest, DiffTree) {
    var AWS_ID, CREATE_REF, ConverterData, Converters, DEFAULT_KP, DEFAULT_SG, UID, convertResToJson, __createRequestParam;
    CREATE_REF = function(compOrUid, attr) {
      if (!compOrUid) {
        return '';
      }
      if (attr) {
        return "@{" + (compOrUid.uid || compOrUid) + "." + attr + "}";
      } else {
        return "@{" + (compOrUid.uid || compOrUid) + ".r.p}";
      }
    };
    UID = MC.guid;
    DEFAULT_SG = {};
    DEFAULT_KP = null;
    AWS_ID = function(dict, type) {
      var key;
      key = constant.AWS_RESOURCE_KEY[type];
      return dict[key] || dict.resource && dict.resource[key];
    };
    ConverterData = (function() {
      ConverterData.prototype.CrPartials = function(type) {
        return CloudResources(constant.RESTYPE[type], this.region);
      };

      ConverterData.prototype.getResourceByType = function(type) {
        return CloudResources(constant.RESTYPE[type], this.region).filter((function(_this) {
          return function(model) {
            return model.RES_TAG === _this.vpcId;
          };
        })(this));
      };

      function ConverterData(region, vpcId, originalJson) {
        this.region = region;
        this.vpcId = vpcId;
        this.azs = {};
        this.subnets = {};
        this.instances = {};
        this.enis = {};
        this.gateways = {};
        this.volumes = {};
        this.sgs = {};
        this.iams = {};
        this.elbs = {};
        this.lcs = {};
        this.asgs = {};
        this.topics = {};
        this.sps = {};
        this.ins_in_asg = [];
        this.component = {};
        this.layout = {};
        this.originalJson = jQuery.extend(true, {
          component: [],
          layout: []
        }, originalJson);
        this.originAppJSON = originalJson;
        this.COMPARISONOPERATOR = {
          "GreaterThanOrEqualToThreshold": ">=",
          "GreaterThanThreshold": ">",
          "LessThanThreshold": "<",
          "LessThanOrEqualToThreshold": "<="
        };
      }

      ConverterData.prototype.add = function(shortType, resource, name) {
        var comp, originComp, type;
        type = constant.RESTYPE[shortType];
        if (resource && resource.uid) {
          this.component[resource.uid] = resource;
          return resource;
        }
        originComp = this.getOriginalComp(resource, type);
        if (originComp) {
          _.extend(originComp.resource, resource);
          this.component[originComp.uid] = originComp;
          return this.component[originComp.uid];
        }
        comp = {
          uid: UID(),
          name: name || AWS_ID(resource, type) || shortType,
          type: type,
          resource: resource
        };
        this.component[comp.uid] = comp;
        return comp;
      };

      ConverterData.prototype.addLayout = function(component, isGroupLayout, parentComp) {
        var l;
        l = this.originalJson.layout[component.uid];
        if (!l) {
          l = {
            uid: component.uid,
            coordinate: [0, 0]
          };
          if (isGroupLayout) {
            l.size = [0, 0];
          }
          if (parentComp) {
            l.groupUId = parentComp.uid;
          }
        }
        this.layout[l.uid] = l;
      };

      ConverterData.prototype.addExpandedAsg = function(originalAsg, parentComp) {
        var key, l, node, _ref;
        _ref = this.originalJson.layout;
        for (key in _ref) {
          node = _ref[key];
          if (node.type === "ExpandedAsg" && node.originalId === originalAsg.uid && node.groupUId === parentComp.uid) {
            l = this.originalJson.layout[node.uid];
            break;
          }
        }
        if (!l) {
          l = {
            uid: UID(),
            coordinate: [0, 0],
            originalId: originalAsg.uid,
            type: "ExpandedAsg",
            groupUId: parentComp.uid
          };
        }
        this.layout[l.uid] = l;
      };

      ConverterData.prototype.addAz = function(azName) {
        var az, azRes;
        az = this.azs[azName];
        if (az) {
          return az;
        }
        azRes = this.getOriginalComp(azName, 'AZ');
        if (!azRes) {
          azRes = {
            "RegionName": this.region,
            "ZoneName": azName
          };
        }
        az = this.add("AZ", azRes, azName);
        this.addLayout(az, true, this.theVpc);
        this.azs[azName] = az;
        return az;
      };

      ConverterData.prototype.addIAM = function(arn) {
        var aws_iam, iamComp, iamRes, _i, _len, _ref;
        iamComp = this.iams[arn];
        if (iamComp) {
          return iamComp;
        }
        _ref = this.CrPartials("IAM").where({
          Arn: arn
        }) || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_iam = _ref[_i];
          aws_iam = aws_iam.attributes;
          iamRes = {
            "CertificateBody": "",
            "CertificateChain": "",
            "PrivateKey": "",
            "ServerCertificateMetadata": {
              "Arn": aws_iam.Arn,
              "ServerCertificateId": aws_iam.id,
              "ServerCertificateName": aws_iam.Name
            }
          };
          iamComp = this.add("IAM", iamRes, aws_iam.Name);
          this.iams[aws_iam.Arn] = iamComp;
          return iamComp;
        }
        return null;
      };

      ConverterData.prototype.addTopic = function(arn) {
        var tmpAry, topicComp, topicName, topicRes;
        topicComp = this.topics[arn];
        if (topicComp) {
          return topicComp;
        }
        topicRes = {
          "TopicArn": arn
        };
        tmpAry = arn.split(":");
        if (tmpAry.length > 0) {
          topicName = tmpAry[tmpAry.length - 1];
        }
        topicComp = this.add("TOPIC", topicRes, topicName);
        this.topics[arn] = topicComp;
        return topicComp;
      };

      ConverterData.prototype.getOriginalComp = function(jsonOrKey, type) {
        var comp, id, key, uid, _ref;
        type = constant.RESTYPE[type] || type;
        key = constant.AWS_RESOURCE_KEY[type];
        id = _.isObject(jsonOrKey) ? jsonOrKey[key] : jsonOrKey;
        if (!id) {
          return null;
        }
        _ref = this.originalJson.component;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.type !== type) {
            continue;
          }
          if ((comp[key] || comp.resource[key]) === id) {
            return comp;
          }
        }
        return null;
      };

      ConverterData.prototype._mapProperty = function(aws_json, resource) {
        var k, v, _ref;
        for (k in aws_json) {
          v = aws_json[k];
          if (((_ref = typeof v) === "string" || _ref === "number" || _ref === "boolean") && resource[k[0].toUpperCase() + k.slice(1)] !== void 0) {
            resource[k[0].toUpperCase() + k.slice(1)] = v;
          }
        }
        return resource;
      };

      ConverterData.prototype._genCompMap = function(originalJson) {
        var comp, compMap, key, uid, _ref;
        compMap = {};
        _ref = originalJson.component;
        for (uid in _ref) {
          comp = _ref[uid];
          key = constant.AWS_RESOURCE_KEY[comp.type];
          if (!comp.resource) {
            continue;
          }
          if (!key) {
            continue;
          }
          if (!comp.resource[key]) {
            console.error("not found id " + key + " for resource", comp);
          }
          compMap[comp.resource[key]] = {
            "uid": uid,
            "name": comp.name
          };
        }
        return compMap;
      };

      return ConverterData;

    })();
    Converters = [
      function() {
        var com, compJson, retainList, uid, _ref, _ref1;
        retainList = ['AWS.EC2.Tag', 'AWS.AutoScaling.Tag', constant.RESTYPE.KP, constant.RESTYPE.TOPIC, constant.RESTYPE.SUBSCRIPTION, constant.RESTYPE.IAM, constant.RESTYPE.DHCP];
        _ref = this.originalJson.component;
        for (uid in _ref) {
          com = _ref[uid];
          if (!this.component[uid] && (_ref1 = com.type, __indexOf.call(retainList, _ref1) >= 0)) {
            compJson = this.add(null, com);
            if (com.type === constant.RESTYPE.IAM) {
              this.iams[com.resource.ServerCertificateMetadata.Arn] = compJson;
            } else if (com.type === constant.RESTYPE.KP) {
              if (com.name === "DefaultKP") {
                DEFAULT_KP = com;
              }
            }
          }
          null;
        }
        return null;
      }, function() {
        var vpc, vpcComp;
        vpc = this.getResourceByType("VPC")[0];
        this.theVpc = vpcComp = this.add("VPC", {
          VpcId: this.vpcId,
          CidrBlock: vpc.attributes.cidrBlock,
          DhcpOptionsId: vpc.attributes.dhcpOptionsId,
          InstanceTenancy: vpc.attributes.instanceTenancy,
          EnableDnsHostnames: vpc.attributes.enableDnsHostnames,
          EnableDnsSupport: vpc.attributes.enableDnsSupport
        });
        this.addLayout(vpcComp, true);
      }, function() {
        var azComp, idx, sb, sbComp, _i, _len, _ref;
        _ref = this.CrPartials("SUBNET").where({
          vpcId: this.vpcId
        }) || [];
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          sb = _ref[idx];
          sb = sb.attributes;
          azComp = this.addAz(sb.availabilityZone);
          sbComp = this.add("SUBNET", {
            AvailabilityZone: CREATE_REF(azComp, "resource.ZoneName"),
            CidrBlock: sb.cidrBlock,
            SubnetId: sb.id,
            VpcId: CREATE_REF(this.theVpc, "resource.VpcId")
          });
          this.subnets[sb.id] = sbComp;
          this.addLayout(sbComp, true, azComp);
        }
      }, function() {
        var aws_igw, igwComp, igwRes, _i, _len, _ref;
        _ref = this.CrPartials("IGW").where({
          vpcId: this.vpcId
        }) || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_igw = _ref[_i];
          aws_igw = aws_igw.attributes;
          if (!(aws_igw.attachmentSet && aws_igw.attachmentSet.length > 0)) {
            continue;
          }
          igwRes = {
            "AttachmentSet": [
              {
                "VpcId": CREATE_REF(this.theVpc, "resource.VpcId")
              }
            ],
            "InternetGatewayId": aws_igw.id
          };
          igwComp = this.add("IGW", igwRes, "Internet-gateway");
          this.addLayout(igwComp, true, this.theVpc);
          this.gateways[aws_igw.id] = igwComp;
        }
      }, function() {
        var aws_vgw, vgwAttach, vgwComp, vgwRes, _i, _len, _ref, _ref1;
        _ref = this.getResourceByType("VGW");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_vgw = _ref[_i];
          aws_vgw = aws_vgw.attributes;
          if ((_ref1 = aws_vgw.state) === "deleted" || _ref1 === "deleting") {
            continue;
          }
          if (aws_vgw.attachments && aws_vgw.attachments.length > 0) {
            vgwAttach = aws_vgw.attachments[0];
          }
          vgwRes = {
            "Attachments": [
              {
                "VpcId": CREATE_REF(this.theVpc, "resource.VpcId")
              }
            ],
            "Type": aws_vgw.type,
            "VpnGatewayId": ""
          };
          vgwRes.VpnGatewayId = aws_vgw.id;
          vgwComp = this.add("VGW", vgwRes, "VPN-gateway");
          this.addLayout(vgwComp, true, this.theVpc);
          this.gateways[aws_vgw.id] = vgwComp;
        }
      }, function() {
        var aws_cgw, cgwComp, cgwRes, _i, _len, _ref, _ref1;
        _ref = this.getResourceByType("CGW");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_cgw = _ref[_i];
          aws_cgw = aws_cgw.attributes;
          if ((_ref1 = aws_cgw.state) === "deleted" || _ref1 === "deleting") {
            continue;
          }
          cgwRes = {
            "BgpAsn": 'bgpAsn' in aws_cgw ? aws_cgw.bgpAsn : "",
            "CustomerGatewayId": aws_cgw.id,
            "IpAddress": aws_cgw.ipAddress,
            "Type": aws_cgw.type
          };
          cgwComp = this.add("CGW", cgwRes, aws_cgw.id);
          delete this.component[cgwComp.uid];
          this.gateways[aws_cgw.id] = cgwComp;
        }
      }, function() {
        var aws_vpn, cgwComp, route, vgwComp, vpnComp, vpnRes, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
        _ref = this.getResourceByType("VPN");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_vpn = _ref[_i];
          aws_vpn = aws_vpn.attributes;
          if ((_ref1 = aws_vpn.state) === "deleted" || _ref1 === "deleting") {
            continue;
          }
          vgwComp = this.gateways[aws_vpn.vpnGatewayId];
          cgwComp = this.gateways[aws_vpn.customerGatewayId];
          if (!(cgwComp && vgwComp)) {
            continue;
          }
          vpnRes = {
            "CustomerGatewayId": CREATE_REF(cgwComp, "resource.CustomerGatewayId"),
            "Options": {
              "StaticRoutesOnly": false
            },
            "Routes": [],
            "Type": aws_vpn.type,
            "VpnConnectionId": aws_vpn.id,
            "VpnGatewayId": CREATE_REF(vgwComp, "resource.VpnGatewayId")
          };
          if (aws_vpn.options && aws_vpn.options.staticRoutesOnly) {
            vpnRes.Options.StaticRoutesOnly = aws_vpn.options.staticRoutesOnly;
            cgwComp.resource.BgpAsn = "";
          }
          if (aws_vpn.routes) {
            _ref2 = aws_vpn.routes;
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
              route = _ref2[_j];
              if ((_ref3 = route.state) === "deleting" || _ref3 === "deleted") {
                continue;
              }
              vpnRes.Routes.push({
                "DestinationCidrBlock": route.destinationCidrBlock
              });
            }
          }
          vpnComp = this.add("VPN", vpnRes, aws_vpn.id);
          this.component[cgwComp.uid] = cgwComp;
          this.addLayout(cgwComp, false);
        }
      }, function() {
        var aws_sg, genRules, groupId, originSGComp, selfSGId, sgComp, sgRefMap, sgRes, sg_rule, vpcComp, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
        sgRefMap = {};
        genRules = function(sg_rule, new_ruls, selfSGId) {
          var ipranges, originSGComp, sgComp, sgId;
          ipranges = '';
          if (sg_rule.groups.length > 0 && sg_rule.groups[0].groupId) {
            sgId = sg_rule.groups[0].groupId;
            sgComp = sgRefMap[sgId];
            if (sgComp) {
              ipranges = CREATE_REF(sgComp, 'resource.GroupId');
            } else {
              if (selfSGId) {
                originSGComp = this.getOriginalComp(selfSGId, 'SG');
                ipranges = CREATE_REF(originSGComp, 'resource.GroupId');
              }
            }
          } else if (sg_rule.ipRanges && sg_rule.ipRanges.length > 0) {
            ipranges = sg_rule.ipRanges[0].cidrIp;
          }
          if (String(sg_rule.ipProtocol) === '-1') {
            sg_rule.fromPort = '0';
            sg_rule.toPort = '65535';
          }
          return new_ruls.push({
            "FromPort": String(sg_rule.fromPort ? sg_rule.fromPort : ""),
            "IpProtocol": String(sg_rule.ipProtocol),
            "IpRanges": ipranges,
            "ToPort": String(sg_rule.toPort ? sg_rule.toPort : "")
          });
        };
        _ref = this.getResourceByType("SG");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_sg = _ref[_i];
          groupId = aws_sg.attributes.groupId;
          sgComp = this.getOriginalComp(groupId, 'SG');
          if (sgComp) {
            sgRefMap[groupId] = sgComp;
          }
        }
        _ref1 = this.getResourceByType("SG");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          aws_sg = _ref1[_j];
          aws_sg = aws_sg.attributes;
          sgRes = {
            "Default": false,
            "GroupDescription": "",
            "GroupId": "",
            "GroupName": "",
            "IpPermissions": [],
            "IpPermissionsEgress": [],
            "VpcId": ""
          };
          sgRes = this._mapProperty(aws_sg, sgRes);
          selfSGId = '';
          originSGComp = this.getOriginalComp(aws_sg.id, 'SG');
          if (originSGComp) {
            selfSGId = aws_sg.id;
            sgRes.GroupName = originSGComp.resource.GroupName;
          }
          vpcComp = this.getOriginalComp(aws_sg.vpcId, 'VPC');
          if (vpcComp) {
            sgRes.VpcId = CREATE_REF(vpcComp.uid, 'resource.VpcId');
          }
          sgRes.GroupDescription = aws_sg.groupDescription;
          if (aws_sg.ipPermissions) {
            _ref2 = aws_sg.ipPermissions || [];
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              sg_rule = _ref2[_k];
              genRules.call(this, sg_rule, sgRes.IpPermissions, selfSGId);
            }
          }
          if (aws_sg.ipPermissionsEgress) {
            _ref3 = aws_sg.ipPermissionsEgress || [];
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              sg_rule = _ref3[_l];
              genRules.call(this, sg_rule, sgRes.IpPermissionsEgress, selfSGId);
            }
          }
          sgComp = this.add("SG", sgRes, aws_sg.groupName);
          if (aws_sg.groupName === "default") {
            DEFAULT_SG["default"] = sgComp;
          } else if (aws_sg.groupName.indexOf("-DefaultSG-app-") !== -1) {
            DEFAULT_SG["DefaultSG"] = sgComp;
          }
          this.sgs[aws_sg.id] = sgComp;
        }
      }, function() {
        var aws_vol, az, instance, volComp, volRes, _i, _len, _ref;
        _ref = this.getResourceByType("VOL");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_vol = _ref[_i];
          aws_vol = aws_vol.attributes;
          if (!aws_vol.attachmentSet) {
            continue;
          }
          az = this.azs[aws_vol.availabilityZone];
          volRes = {
            "VolumeId": aws_vol.id,
            "Size": Number(aws_vol.size),
            "VolumeSize": Number(aws_vol.size),
            "SnapshotId": aws_vol.snapshotId ? aws_vol.snapshotId : "",
            "Iops": aws_vol.iops ? aws_vol.iops : "",
            "VolumeType": aws_vol.volumeType,
            "AvailabilityZone": CREATE_REF(az, "resource.ZoneName")
          };
          if (aws_vol.attachmentSet) {
            instance = this.instances[aws_vol.attachmentSet[0].instanceId];
            if (instance) {
              volRes.AttachmentSet.Device = aws_vol.attachmentSet[0].device;
              volRes.AttachmentSet.InstanceId = CREATE_REF(instance, "resource.InstanceId");
            }
          }
          volComp = this.add("VOL", volRes, aws_vol.attachmentSet[0].device);
          delete this.component[volComp.uid];
          this.volumes[aws_vol.id] = volComp;
        }
      }, function() {
        var aws_asg, aws_ins, azComp, insComp, insRes, keyPairComp, me, originComp, subnetComp, vol_in_instance, volumes, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
        me = this;
        _ref = this.getResourceByType("ASG");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_asg = _ref[_i];
          aws_asg = aws_asg.attributes;
          _.each(aws_asg.Instances, function(e, key) {
            return me.ins_in_asg.push(e.InstanceId);
          });
        }
        _ref1 = this.getResourceByType("INSTANCE") || [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          aws_ins = _ref1[_j];
          aws_ins = aws_ins.attributes;
          if ((_ref2 = aws_ins.instanceState.name) === "shutting-down" || _ref2 === "terminated") {
            continue;
          }
          if (_ref3 = aws_ins.id, __indexOf.call(this.ins_in_asg, _ref3) >= 0) {
            continue;
          }
          azComp = this.addAz(aws_ins.placement.availabilityZone);
          subnetComp = this.subnets[aws_ins.subnetId];
          if (!subnetComp) {
            continue;
          }
          insRes = {
            "BlockDeviceMapping": [],
            "DisableApiTermination": false,
            "EbsOptimized": "",
            "ImageId": "",
            "InstanceId": "",
            "InstanceType": "",
            "KeyName": "",
            "Monitoring": "",
            "NetworkInterface": [],
            "Placement": {
              "Tenancy": "",
              "AvailabilityZone": ""
            },
            "SecurityGroup": [],
            "SecurityGroupId": [],
            "ShutdownBehavior": "",
            "SubnetId": "",
            "UserData": {
              "Base64Encoded": false,
              "Data": ""
            },
            "VpcId": ""
          };
          insRes = this._mapProperty(aws_ins, insRes);
          insRes.SubnetId = CREATE_REF(subnetComp, 'resource.SubnetId');
          insRes.VpcId = CREATE_REF(this.theVpc, 'resource.VpcId');
          insRes.Placement.AvailabilityZone = CREATE_REF(azComp, 'resource.ZoneName');
          insRes.Placement.Tenancy = aws_ins.placement.tenancy;
          if (aws_ins.monitoring && aws_ins.monitoring) {
            insRes.Monitoring = aws_ins.monitoring.state;
          }
          if (aws_ins.placement.tenancy === 'default') {
            insRes.Placement.Tenancy = '';
          }
          if (!aws_ins.shutdownBehavior) {
            insRes.ShutdownBehavior = 'terminate';
          }
          insRes.InstanceId = aws_ins.id;
          insRes.EbsOptimized = aws_ins.ebsOptimized;
          originComp = this.getOriginalComp(aws_ins.id, 'INSTANCE');
          keyPairComp = this.getOriginalComp(aws_ins.keyName, 'KP');
          if (keyPairComp) {
            insRes.KeyName = CREATE_REF(keyPairComp, "resource.KeyName");
          } else {
            if (aws_ins.keyName) {
              insRes.KeyName = aws_ins.keyName;
            } else {
              insRes.KeyName = CREATE_REF(DEFAULT_KP, "resource.KeyName");
            }
          }
          vol_in_instance = [];
          if (originComp) {
            insRes.BlockDeviceMapping = originComp.resource.BlockDeviceMapping || [];
            insRes.BlockDeviceMapping = _.filter(insRes.BlockDeviceMapping, function(bdm) {
              if (_.isString(bdm)) {
                return false;
              }
              return true;
            });
            _.each(aws_ins.blockDeviceMapping || [], function(e, key) {
              var volComp;
              if (aws_ins.rootDeviceName.indexOf(e.deviceName) === -1) {
                volComp = me.volumes[e.ebs.volumeId];
                if (volComp) {
                  insRes.BlockDeviceMapping = _.union(insRes.BlockDeviceMapping, ["#" + volComp.uid]);
                  me.component[volComp.uid] = volComp;
                  return vol_in_instance.push(volComp.uid);
                }
              }
            });
          } else {
            insRes.BlockDeviceMapping = [];
            volumes = this.volumes;
            _.each(aws_ins.blockDeviceMapping, function(bdm) {
              var volume, volumeSize;
              volume = volumes[bdm.ebs.volumeId];
              volumeSize = '';
              if (volume) {
                volumeSize = volume.resource.Size;
              }
              return insRes.BlockDeviceMapping.push({
                DeviceName: bdm.deviceName,
                Ebs: {
                  AttachTime: bdm.ebs.attachTime,
                  DeleteOnTermination: bdm.ebs.deleteOnTermination,
                  Status: bdm.ebs.status,
                  VolumeId: bdm.ebs.volumeId,
                  VolumeSize: volumeSize
                }
              });
            });
          }
          insComp = this.add("INSTANCE", insRes);
          _.each(vol_in_instance, function(e, key) {
            var volComp;
            volComp = me.component[e];
            if (volComp) {
              if (!volComp.resource.AttachmentSet) {
                volComp.resource.AttachmentSet = {};
              }
              return volComp.resource.AttachmentSet.InstanceId = CREATE_REF(insComp, "resource.InstanceId");
            }
          });
          this.addLayout(insComp, false, subnetComp);
          this.instances[aws_ins.id] = insComp;
        }
      }, function() {
        var aws_eni, azComp, eniComp, eniRes, group, insComp, ip, subnetComp, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        _ref = this.getResourceByType("ENI") || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_eni = _ref[_i];
          aws_eni = aws_eni.attributes;
          azComp = this.addAz(aws_eni.availabilityZone);
          subnetComp = this.subnets[aws_eni.subnetId];
          if (!subnetComp) {
            continue;
          }
          eniRes = {
            "AssociatePublicIpAddress": false,
            "Attachment": {
              "AttachmentId": "",
              "DeviceIndex": "1",
              "InstanceId": ""
            },
            "AvailabilityZone": "",
            "Description": "",
            "GroupSet": [],
            "NetworkInterfaceId": "",
            "PrivateIpAddressSet": [],
            "SourceDestCheck": true,
            "SubnetId": "",
            "VpcId": ""
          };
          if (aws_eni.attachment && aws_eni.attachment.instanceOwnerId && ((_ref1 = aws_eni.attachment.instanceOwnerId) === "amazon-elb" || _ref1 === "amazon-rds")) {
            continue;
          }
          eniRes = this._mapProperty(aws_eni, eniRes);
          if (aws_eni.association && aws_eni.association.publicIp) {
            eniRes.AssociatePublicIpAddress = true;
          }
          eniRes.NetworkInterfaceId = aws_eni.id;
          eniRes.AvailabilityZone = CREATE_REF(azComp, 'resource.ZoneName');
          eniRes.SubnetId = CREATE_REF(subnetComp, 'resource.SubnetId');
          eniRes.VpcId = CREATE_REF(this.theVpc, 'resource.VpcId');
          if (aws_eni.attachment) {
            if (!((_ref2 = aws_eni.attachment.deviceIndex) === "0" || _ref2 === 0)) {
              eniRes.Attachment.AttachmentId = aws_eni.attachment.attachmentId;
            }
            insComp = this.instances[aws_eni.attachment.instanceId];
            if (insComp) {
              eniRes.Attachment.InstanceId = CREATE_REF(insComp, 'resource.InstanceId');
              eniRes.Attachment.DeviceIndex = String(aws_eni.attachment.deviceIndex === 0 ? '0' : aws_eni.attachment.deviceIndex);
            }
          }
          _ref3 = aws_eni.privateIpAddressesSet;
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            ip = _ref3[_j];
            eniRes.PrivateIpAddressSet.push({
              "PrivateIpAddress": ip.privateIpAddress,
              "AutoAssign": true,
              "Primary": ip.primary
            });
          }
          _ref4 = aws_eni.groupSet;
          for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
            group = _ref4[_k];
            eniRes.GroupSet.push({
              "GroupId": CREATE_REF(this.sgs[group.groupId], 'resource.GroupId'),
              "GroupName": CREATE_REF(this.sgs[group.groupId], 'resource.GroupName')
            });
          }
          eniComp = this.add("ENI", eniRes);
          this.enis[aws_eni.id] = eniComp;
          if (!aws_eni.attachment || !((_ref5 = aws_eni.attachment.deviceIndex) === "0" || _ref5 === 0)) {
            this.addLayout(eniComp, false, subnetComp);
          }
        }
      }, function() {
        var aws_eip, eipComp, eipRes, eni, _i, _len, _ref;
        _ref = this.getResourceByType("EIP");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_eip = _ref[_i];
          aws_eip = aws_eip.attributes;
          eni = this.enis[aws_eip.networkInterfaceId];
          if (!eni) {
            continue;
          }
          eipRes = {
            "AllocationId": aws_eip.id,
            "Domain": aws_eip.domain,
            "InstanceId": "",
            "NetworkInterfaceId": CREATE_REF(eni, "resource.NetworkInterfaceId"),
            "PrivateIpAddress": CREATE_REF(eni, "resource.PrivateIpAddressSet.0.PrivateIpAddress"),
            "PublicIp": aws_eip.publicIp
          };
          eipComp = this.add("EIP", eipRes);
        }
      }, function() {
        var asso, aws_rtb, eniComp, gwComp, i, insComp, route, rtbComp, rtbRes, subnetComp, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
        _ref = this.CrPartials("RT").where({
          vpcId: this.vpcId
        }) || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_rtb = _ref[_i];
          aws_rtb = aws_rtb.attributes;
          rtbRes = {
            "AssociationSet": [],
            "PropagatingVgwSet": [],
            "RouteSet": [],
            "RouteTableId": aws_rtb.id,
            "VpcId": CREATE_REF(this.theVpc, 'resource.VpcId')
          };
          _ref1 = aws_rtb.associationSet;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            i = _ref1[_j];
            asso = {
              Main: i.main === false ? false : "true",
              RouteTableAssociationId: "",
              SubnetId: ""
            };
            if (!asso.Main) {
              asso.RouteTableAssociationId = i.routeTableAssociationId;
              subnetComp = this.subnets[i.subnetId];
              if (i.subnetId && subnetComp) {
                asso.SubnetId = CREATE_REF(subnetComp, 'resource.SubnetId');
              }
            }
            rtbRes.AssociationSet.push(asso);
          }
          _ref2 = aws_rtb.routeSet;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            i = _ref2[_k];
            if (i.origin && i.origin === "EnableVgwRoutePropagation") {
              continue;
            }
            insComp = this.instances[i.instanceId];
            eniComp = this.enis[i.networkInterfaceId];
            gwComp = this.gateways[i.gatewayId];
            route = {
              "DestinationCidrBlock": i.destinationCidrBlock,
              "GatewayId": "",
              "InstanceId": i.instanceId && insComp ? CREATE_REF(insComp, 'resource.InstanceId') : "",
              "NetworkInterfaceId": i.networkInterfaceId && eniComp ? CREATE_REF(eniComp, 'resource.NetworkInterfaceId') : "",
              "Origin": i.gatewayId === "local" ? i.origin : ""
            };
            if (i.gatewayId) {
              if (i.gatewayId !== "local" && gwComp) {
                if (gwComp.type === "AWS.VPC.VPNGateway") {
                  route.GatewayId = CREATE_REF(gwComp, 'resource.VpnGatewayId');
                } else if (gwComp.type === "AWS.VPC.InternetGateway") {
                  route.GatewayId = CREATE_REF(gwComp, 'resource.InternetGatewayId');
                }
              } else {
                route.GatewayId = i.gatewayId;
              }
            }
            rtbRes.RouteSet.push(route);
          }
          _ref3 = aws_rtb.propagatingVgwSet;
          for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
            i = _ref3[_l];
            gwComp = this.gateways[i.gatewayId];
            if (gwComp) {
              rtbRes.PropagatingVgwSet.push(CREATE_REF(gwComp, 'resource.VpnGatewayId'));
            }
          }
          rtbComp = this.add("RT", rtbRes);
          this.addLayout(rtbComp, true, this.theVpc);
        }
      }, function() {
        var acl, aclComp, aclRes, aws_acl, defaultName, subnetComp, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        _ref = this.getResourceByType("ACL") || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_acl = _ref[_i];
          aws_acl = aws_acl.attributes;
          aclRes = {
            "AssociationSet": [],
            "Default": false,
            "EntrySet": [],
            "NetworkAclId": "",
            "VpcId": ""
          };
          aclRes = this._mapProperty(aws_acl, aclRes);
          aclRes.VpcId = CREATE_REF(this.theVpc, 'resource.VpcId');
          aclRes.NetworkAclId = aws_acl.id;
          if (aws_acl["default"]) {
            aclRes.Default = aws_acl["default"];
            defaultName = "DefaultACL";
          }
          _ref1 = aws_acl.entries;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            acl = _ref1[_j];
            aclRes.EntrySet.push({
              "RuleAction": acl.ruleAction,
              "Protocol": Number(acl.protocol),
              "CidrBlock": acl.cidrBlock,
              "Egress": acl.egress,
              "IcmpTypeCode": {
                "Type": acl.icmpTypeCode ? String(acl.icmpTypeCode.type) : "",
                "Code": acl.icmpTypeCode ? String(acl.icmpTypeCode.code) : ""
              },
              "PortRange": {
                "To": acl.portRange ? String(acl.portRange.to) : "",
                "From": acl.portRange ? String(acl.portRange.from) : ""
              },
              "RuleNumber": acl.ruleNumber
            });
          }
          _ref2 = aws_acl.associationSet;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            acl = _ref2[_k];
            subnetComp = this.subnets[acl.subnetId];
            if (!subnetComp) {
              continue;
            }
            aclRes.AssociationSet.push({
              "NetworkAclAssociationId": acl.networkAclAssociationId,
              "SubnetId": CREATE_REF(subnetComp, 'resource.SubnetId')
            });
          }
          aclComp = this.add("ACL", aclRes, defaultName);
        }
      }, function() {
        var aws_elb, data, elbComp, elbRes, iamComp, instanceId, listener, me, sgId, sslCertRef, subnetId, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4;
        me = this;
        _ref = this.getResourceByType("ELB") || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_elb = _ref[_i];
          aws_elb = aws_elb.attributes;
          elbRes = {
            "HealthCheck": {
              "Timeout": "",
              "Target": "",
              "HealthyThreshold": "",
              "UnhealthyThreshold": "",
              "Interval": ""
            },
            "Policies": {
              "AppCookieStickinessPolicies": [
                {
                  CookieName: '',
                  PolicyName: ''
                }
              ],
              "OtherPolicies": [],
              "LBCookieStickinessPolicies": [
                {
                  CookieExpirationPeriod: '',
                  PolicyName: ''
                }
              ]
            },
            "BackendServerDescriptions": [
              {
                InstantPort: "",
                PoliciyNames: ""
              }
            ],
            "SecurityGroups": [],
            "CreatedTime": "",
            "CanonicalHostedZoneNameID": "",
            "ListenerDescriptions": [],
            "DNSName": "",
            "Scheme": "",
            "CanonicalHostedZoneName": "",
            "Instances": [],
            "SourceSecurityGroup": {
              "OwnerAlias": "",
              "GroupName": ""
            },
            "Subnets": [],
            "VpcId": "",
            "LoadBalancerName": "",
            "AvailabilityZones": [],
            "CrossZoneLoadBalancing": "",
            "ConnectionDraining": {
              "Enabled": false,
              "Timeout": null
            }
          };
          elbRes = this._mapProperty(aws_elb, elbRes);
          elbRes.ConnectionDraining.Enabled = aws_elb.ConnectionDraining.Enabled;
          if (aws_elb.ConnectionDraining.Enabled) {
            elbRes.ConnectionDraining.Timeout = Number(aws_elb.ConnectionDraining.Timeout);
          }
          if (elbRes.CanonicalHostedZoneName) {
            delete elbRes.CanonicalHostedZoneName;
          }
          if (elbRes.CanonicalHostedZoneNameID) {
            delete elbRes.CanonicalHostedZoneNameID;
          }
          if (aws_elb.SecurityGroups) {
            _ref1 = aws_elb.SecurityGroups;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              sgId = _ref1[_j];
              elbRes.SecurityGroups.push(CREATE_REF(this.sgs[sgId], 'resource.GroupId'));
            }
          }
          elbRes.VpcId = CREATE_REF(this.theVpc, 'resource.VpcId');
          if (aws_elb.Subnets) {
            _ref2 = aws_elb.Subnets;
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              subnetId = _ref2[_k];
              elbRes.Subnets.push(CREATE_REF(this.subnets[subnetId], 'resource.SubnetId'));
            }
          }
          elbRes.DNSName = aws_elb.Dnsname;
          elbRes.CrossZoneLoadBalancing = aws_elb.CrossZoneLoadBalancing.Enabled;
          if (aws_elb.ListenerDescriptions) {
            _ref3 = aws_elb.ListenerDescriptions;
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              listener = _ref3[_l];
              sslCertRef = '';
              if (listener.Listener.SslcertificateId) {
                iamComp = this.addIAM(listener.Listener.SslcertificateId);
                if (iamComp) {
                  sslCertRef = CREATE_REF(iamComp, 'resource.ServerCertificateMetadata.Arn');
                }
              }
              data = {
                "PolicyNames": '',
                "Listener": {
                  "LoadBalancerPort": listener.Listener.LoadBalancerPort,
                  "InstanceProtocol": listener.Listener.InstanceProtocol,
                  "Protocol": listener.Listener.Protocol,
                  "SSLCertificateId": sslCertRef || listener.Listener.SslcertificateId,
                  "InstancePort": listener.Listener.InstancePort
                }
              };
              elbRes.ListenerDescriptions.push(data);
            }
          }
          elbRes.HealthCheck = aws_elb.HealthCheck;
          if (aws_elb.Instances) {
            _ref4 = aws_elb.Instances;
            for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
              instanceId = _ref4[_m];
              if (!(__indexOf.call(me.ins_in_asg, instanceId) >= 0)) {
                if (this.instances[instanceId]) {
                  elbRes.Instances.push({
                    InstanceId: CREATE_REF(this.instances[instanceId], 'resource.InstanceId')
                  });
                }
              }
            }
          }
          elbComp = this.add("ELB", elbRes, aws_elb.Name);
          this.addLayout(elbComp, false, this.theVpc);
          this.elbs[aws_elb.Name] = elbComp;
        }
      }, function() {
        var aws_lc, bdm, keyPairComp, lcComp, lcRes, me, originComp, sg, _i, _len, _ref;
        me = this;
        _ref = this.getResourceByType('LC');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_lc = _ref[_i];
          aws_lc = aws_lc.attributes;
          lcRes = {
            "AssociatePublicIpAddress": false,
            "BlockDeviceMapping": [],
            "EbsOptimized": false,
            "ImageId": "",
            "InstanceMonitoring": false,
            "InstanceType": "",
            "KeyName": "",
            "LaunchConfigurationARN": "",
            "LaunchConfigurationName": "",
            "SecurityGroups": [],
            "UserData": ""
          };
          lcRes = this._mapProperty(aws_lc, lcRes);
          lcRes.LaunchConfigurationARN = aws_lc.id;
          lcRes.LaunchConfigurationName = aws_lc.Name;
          lcRes.InstanceMonitoring = aws_lc.InstanceMonitoring.Enabled;
          lcRes.UserData = "";
          sg = [];
          _.each(aws_lc.SecurityGroups, function(e, key) {
            var sgComp;
            sgComp = me.sgs[e];
            if (sgComp) {
              return sg.push(CREATE_REF(sgComp, "resource.GroupId"));
            }
          });
          if (sg.length === 0) {
            continue;
          }
          lcRes.SecurityGroups = sg;
          bdm = lcRes.BlockDeviceMapping;
          _.each(aws_lc.BlockDeviceMapping || [], function(e, key) {
            var data;
            data = {
              "DeviceName": e.DeviceName,
              "Ebs": {
                "VolumeSize": Number(e.Ebs.VolumeSize),
                "VolumeType": e.Ebs.VolumeType
              }
            };
            if (e.Ebs.SnapshotId) {
              data.Ebs.SnapshotId = e.Ebs.SnapshotId;
            }
            if (data.Ebs.VolumeType === "io1") {
              data.Ebs.Iops = e.Ebs.Iops;
            }
            return bdm.push(data);
          });
          keyPairComp = this.getOriginalComp(aws_lc.KeyName, 'KP');
          if (!keyPairComp) {
            if (aws_lc.KeyName) {
              lcRes.KeyName = aws_lc.KeyName;
            }
          } else {
            originComp = this.getOriginalComp(aws_lc.id, 'LC');
            if (originComp) {
              lcRes.KeyName = originComp.resource.KeyName;
            } else {
              lcRes.KeyName = CREATE_REF(keyPairComp, "resource.KeyName");
            }
          }
          lcComp = this.add("LC", lcRes, aws_lc.Name);
          this.addLayout(lcComp);
          delete this.component[aws_lc.id];
          this.lcs[aws_lc.Name] = lcComp;
        }
      }, function() {
        var asgComp, asgRes, aws_asg, az, elb, firstSubnetComp, me, originASGComp, vpcZoneIdentifier, _i, _len, _ref;
        me = this;
        _ref = this.getResourceByType("ASG");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_asg = _ref[_i];
          aws_asg = aws_asg.attributes;
          if (!this.lcs[aws_asg.LaunchConfigurationName]) {
            continue;
          }
          asgRes = {
            "AutoScalingGroupARN": "",
            "AutoScalingGroupName": "",
            "AvailabilityZones": [],
            "DefaultCooldown": 0,
            "DesiredCapacity": 0,
            "HealthCheckGracePeriod": 0,
            "HealthCheckType": "",
            "LaunchConfigurationName": "",
            "LoadBalancerNames": [],
            "MaxSize": 0,
            "MinSize": 0,
            "TerminationPolicies": [],
            "VPCZoneIdentifier": ""
          };
          asgRes = this._mapProperty(aws_asg, asgRes);
          originASGComp = this.getOriginalComp(aws_asg.id, 'ASG');
          asgRes.AutoScalingGroupARN = aws_asg.id;
          asgRes.AutoScalingGroupName = aws_asg.Name;
          asgRes.TerminationPolicies = aws_asg.TerminationPolicies;
          asgRes.LaunchConfigurationName = CREATE_REF(this.lcs[aws_asg.LaunchConfigurationName], "resource.LaunchConfigurationName");
          vpcZoneIdentifier = [];
          firstSubnetComp = "";
          _.each(aws_asg.Subnets, function(e, key) {
            var subnetComp;
            subnetComp = me.subnets[e];
            if (subnetComp) {
              if (!firstSubnetComp) {
                firstSubnetComp = subnetComp;
              }
              return vpcZoneIdentifier.push(CREATE_REF(subnetComp, "resource.SubnetId"));
            }
          });
          if (vpcZoneIdentifier.length === 0) {
            continue;
          }
          asgRes.VPCZoneIdentifier = vpcZoneIdentifier.join(" , ");
          elb = [];
          _.each(aws_asg.LoadBalancerNames, function(e, key) {
            var elbComp;
            elbComp = me.elbs[e];
            return elb.push(CREATE_REF(elbComp, "resource.LoadBalancerName"));
          });
          asgRes.LoadBalancerNames = elb;
          az = [];
          _.each(aws_asg.AvailabilityZones, function(e, key) {
            var azComp;
            azComp = me.addAz(e);
            return az.push(CREATE_REF(azComp, "resource.ZoneName"));
          });
          asgRes.AvailabilityZones = az;
          asgComp = this.add("ASG", asgRes, aws_asg.Name);
          this.addLayout(asgComp, true, firstSubnetComp);
          _.each(aws_asg.Subnets, function(e, key) {
            var subnetComp;
            subnetComp = me.subnets[e];
            if (subnetComp.uid !== firstSubnetComp.uid) {
              return me.addExpandedAsg(asgComp, subnetComp);
            }
          });
          this.asgs[aws_asg.Name] = asgComp;
        }
      }, function() {
        var asgComp, aws_nc, ncComp, ncRes, originalNc, snsComp, _i, _len, _ref;
        _ref = this.getResourceByType("NC");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_nc = _ref[_i];
          aws_nc = aws_nc.attributes;
          ncRes = {
            "AutoScalingGroupName": aws_nc.AutoScalingGroupName,
            "NotificationType": aws_nc.NotificationType,
            "TopicARN": aws_nc.TopicARN
          };
          asgComp = this.asgs[ncRes.AutoScalingGroupName];
          if (asgComp) {
            ncRes.AutoScalingGroupName = CREATE_REF(asgComp, 'resource.AutoScalingGroupName');
          } else {
            continue;
          }
          snsComp = _.first(_.filter(this.originalJson.component, function(com) {
            if (com.type === constant.RESTYPE.TOPIC) {
              return com.resource.TopicArn === ncRes.TopicARN;
            }
          }));
          if (snsComp) {
            ncRes.TopicARN = CREATE_REF(snsComp, 'resource.TopicArn');
          }
          originalNc = _.filter(this.originalJson.component, function(com) {
            if (com.type === constant.RESTYPE.NC) {
              return _.isEqual(com.resource, ncRes);
            }
          });
          ncComp = this.add("NC", originalNc[0] || ncRes, "SnsNotification");
        }
      }, function() {
        var asgComp, aws_sp, spComp, spRes, _i, _len, _ref;
        _ref = this.getResourceByType("SP");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_sp = _ref[_i];
          aws_sp = aws_sp.attributes;
          spRes = {
            "AdjustmentType": "",
            "AutoScalingGroupName": "",
            "Cooldown": 0,
            "MinAdjustmentStep": "",
            "PolicyARN": "",
            "PolicyName": "",
            "ScalingAdjustment": ""
          };
          spRes = this._mapProperty(aws_sp, spRes);
          asgComp = this.asgs[aws_sp.AutoScalingGroupName];
          if (spRes.ScalingAdjustment) {
            spRes.ScalingAdjustment = String(spRes.ScalingAdjustment);
          }
          if (asgComp) {
            spRes.AutoScalingGroupName = CREATE_REF(asgComp, 'resource.AutoScalingGroupName');
          } else {
            continue;
          }
          spRes.PolicyARN = aws_sp.id;
          spRes.PolicyName = aws_sp.Name;
          spComp = this.add("SP", spRes, aws_sp.Name);
          this.sps[aws_sp.id] = spComp;
        }
      }, function() {
        var alarmActionAry, aws_cw, cwComp, cwRes, dimension, me, _i, _len, _ref;
        me = this;
        _ref = this.getResourceByType("CW");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_cw = _ref[_i];
          aws_cw = aws_cw.attributes;
          cwRes = {
            "AlarmActions": [],
            "AlarmArn": "",
            "AlarmName": "",
            "ComparisonOperator": "",
            "Dimensions": [],
            "EvaluationPeriods": "",
            "InsufficientDataActions": [],
            "MetricName": "",
            "Namespace": "",
            "OKAction": [],
            "Period": 0,
            "Statistic": "",
            "Threshold": "",
            "Unit": ""
          };
          cwRes = this._mapProperty(aws_cw, cwRes);
          dimension = [];
          _.each(aws_cw.Dimensions, function(e, key) {
            var asgComp, data;
            if (e.Name === "AutoScalingGroupName") {
              asgComp = me.asgs[e.Value];
              if (asgComp) {
                data = {
                  "name": e.Name,
                  "value": CREATE_REF(asgComp, "resource.AutoScalingGroupName")
                };
                return dimension.push(data);
              }
            }
          });
          if (dimension.length === 0) {
            continue;
          }
          cwRes.Dimensions = dimension;
          alarmActionAry = [];
          _.each(aws_cw.AlarmActions, function(e, key) {
            var reg_asg, reg_topic, spComp, topicComp;
            reg_asg = /arn:aws:autoscaling:.*:.*:scalingPolicy/g;
            reg_topic = /arn:aws:sns:.*:.*:.*/g;
            if (reg_topic.test(e)) {
              topicComp = me.addTopic(e);
              if (topicComp) {
                return alarmActionAry.push(CREATE_REF(topicComp, "resource.TopicArn"));
              }
            } else if (reg_asg.test(e)) {
              spComp = me.sps[e];
              if (spComp) {
                return alarmActionAry.push(CREATE_REF(spComp, "resource.PolicyARN"));
              }
            }
          });
          cwRes.AlarmActions = alarmActionAry;
          cwRes.Threshold = String(aws_cw.Threshold);
          cwRes.EvaluationPeriods = String(aws_cw.EvaluationPeriods);
          if (aws_cw.ComparisonOperator) {
            cwRes.ComparisonOperator = this.COMPARISONOPERATOR[aws_cw.ComparisonOperator];
          }
          cwRes.AlarmArn = aws_cw.id;
          cwRes.AlarmName = aws_cw.Name;
          cwComp = this.add("CW", cwRes, aws_cw.Name);
        }
      }
    ];
    convertResToJson = function(region, vpcId, originalJson) {
      var cd, changedServerGroupUidMap, default_sg, diffTree, func, originComps, _i, _len;
      console.log(["VOL", "INSTANCE", "SG", "ELB", "ACL", "CGW", "ENI", "IGW", "RT", "SUBNET", "VPC", "VPN", "VGW", "ASG", "LC", "NC", "SP", "IAM", "RETAIN"].map(function(t) {
        return CloudResources(constant.RESTYPE[t], region);
      }));
      cd = new ConverterData(region, vpcId, originalJson);
      for (_i = 0, _len = Converters.length; _i < _len; _i++) {
        func = Converters[_i];
        func.call(cd);
      }
      if (cd.originAppJSON) {
        changedServerGroupUidMap = {};
        diffTree = new DiffTree();
        originComps = cd.originAppJSON.component;
        _.each(cd.instances, function(insComp) {
          var diffResult;
          if (originComps[insComp.uid]) {
            if (insComp.number && insComp.number > 1) {
              diffResult = diffTree.compare(originComps[insComp.uid], insComp);
              if (diffResult) {
                changedServerGroupUidMap[insComp.serverGroupUid] = true;
              }
            }
          }
          return null;
        });
        _.each(cd.enis, function(insComp) {
          var attachedInsRef, diffResult, instanceUid;
          if (originComps[insComp.uid]) {
            if (insComp.number && insComp.number > 1) {
              if (diffResult) {
                diffResult = diffTree.compare(originComps[insComp.uid], insComp);
                changedServerGroupUidMap[insComp.serverGroupUid] = true;
                attachedInsRef = insComp.resource.Attachment.InstanceId;
                if (attachedInsRef) {
                  instanceUid = MC.extractID(attachedInsRef);
                  insComp = originComps[instanceUid];
                  changedServerGroupUidMap[insComp.serverGroupUid] = true;
                }
              }
            }
          }
          return null;
        });
        _.each(cd.instances, function(insComp) {
          if (insComp.serverGroupUid && changedServerGroupUidMap[insComp.serverGroupUid]) {
            insComp.serverGroupName = insComp.name;
            insComp.number = 1;
            insComp.index = 0;
            insComp.serverGroupUid = insComp.uid;
          }
          return null;
        });
      }
      if (DEFAULT_SG["DefaultSG"]) {
        default_sg = cd.component[DEFAULT_SG["DefaultSG"].uid];
        if (default_sg) {
          default_sg.name = "DefaultSG";
          default_sg.resource.Default = true;
        }
        if (DEFAULT_SG["default"] && cd.component[DEFAULT_SG["default"].uid]) {
          delete cd.component[DEFAULT_SG["default"].uid];
        }
      } else if (DEFAULT_SG["default"]) {
        default_sg = cd.component[DEFAULT_SG["default"].uid];
        if (default_sg) {
          default_sg.name = "DefaultSG";
          default_sg.resource.Default = true;
        } else {
          console.warn("can not found default sg in component");
        }
      }
      return cd;
    };
    __createRequestParam = function(region, vpcId) {
      var RESTYPE, additionalRequestParam, asg, asgNamesInVpc, filter, lcNamesInVpc, sb, subnetIdsInVpc, _i, _j, _len, _len1, _ref, _ref1;
      RESTYPE = constant.RESTYPE;
      filter = {
        filter: {
          'vpc-id': vpcId
        }
      };
      additionalRequestParam = {
        'AWS.EC2.SecurityGroup': filter,
        'AWS.VPC.NetworkAcl': filter,
        'AWS.VPC.NetworkInterface': filter
      };
      subnetIdsInVpc = {};
      _ref = CloudResources(RESTYPE.SUBNET, region).where({
        vpcId: vpcId
      });
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sb = _ref[_i];
        subnetIdsInVpc[sb.id] = true;
      }
      asgNamesInVpc = [];
      lcNamesInVpc = [];
      _ref1 = CloudResources(RESTYPE.ASG, region).models;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        asg = _ref1[_j];
        if (subnetIdsInVpc[asg.get("VPCZoneIdentifier")]) {
          asgNamesInVpc.push(asg.get("AutoScalingGroupName"));
          lcNamesInVpc.push(asg.get("LaunchConfigurationName"));
        }
      }
      if (asgNamesInVpc.length) {
        additionalRequestParam[RESTYPE.LC] = {
          id: _.uniq(lcNamesInVpc)
        };
        additionalRequestParam[RESTYPE.NC] = {
          id: asgNamesInVpc
        };
        additionalRequestParam[RESTYPE.SP] = {
          filter: {
            AutoScalingGroupName: asgNamesInVpc
          }
        };
      }
      return additionalRequestParam;
    };
    CloudResources.getAllResourcesForVpc = convertResToJson;
  });

}).call(this);

(function() {
  define('ide/cloudres/CrBundle',["CloudResources", "./CrClnSharedRes", "./CrClnCommonRes", "./CrClnOpsResource", "./CrClnAmi", "./CloudImportVpc"], function(CloudResources) {
    return CloudResources;
  });

}).call(this);

