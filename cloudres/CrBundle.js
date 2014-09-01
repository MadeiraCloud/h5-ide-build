(function() {
  define('cloudres/CrModel',["ApiRequest", "backbone"], function(ApiRequest) {
    return Backbone.Model.extend({
      constructor: function(attr, options) {
        Backbone.Model.call(this, attr, options);
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

  define('cloudres/CrCollection',["ApiRequest", "./CrModel", "constant", "backbone"], function(ApiRequest, CrModel, constant) {
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
      DBSBG: {
        dbsubnetGroupDescription: "DBSubnetGroupDescription",
        dbsubnetGroupName: "DBSubnetGroupName"
      },
      DBINSTANCE: {
        dbinstanceClass: "DBInstanceClass",
        dbinstanceIdentifier: "DBInstanceIdentifier",
        dbinstanceStatus: "DBInstanceStatus",
        dbname: "DBName",
        dbparameterGroups: "DBParameterGroups",
        dbsecurityGroups: "DBSecurityGroups",
        dbsubnetGroup: "DBSubnetGroup",
        dbname: "DBName"
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
      isLastFetchFailed: function() {
        return !!this.lastFetchError();
      },
      lastFetchError: function() {
        return this.__lastFetchError;
      },
      fetch: function() {
        var self;
        if (!this.isLastFetchFailed() && this.__fetchPromise) {
          return this.__fetchPromise;
        }
        this.lastFetch = +new Date();
        this.__ready = false;
        this.__lastFetchError = null;
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
          self.__lastFetchError = error;
          self.__ready = true;
          self.trigger("update");
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
      resolveTagSet: function(tagSet) {
        var data, item, visopsTag, visualops, _i, _len, _ref;
        if (!tagSet) {
          return {};
        }
        if (tagSet['Created by'] && tagSet['app'] && tagSet['app-id'] && tagSet['name'] && tagSet['Name']) {
          visopsTag = jQuery.extend(true, {}, tagSet);
          visopsTag['isOwner'] = App.user.get('username') === tagSet['Created by'];
        } else if (tagSet['visualops'] && tagSet['Name']) {
          visopsTag = {};
          visualops = tagSet['visualops'];
          if (visualops.indexOf('app-name=') === 0 && visualops.indexOf('app-id=') > 0 && visualops.indexOf('created-by=') > 0) {
            _ref = visualops.split(' ');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              data = item.split('=');
              switch (data[0]) {
                case 'app-name':
                  visopsTag['app'] = data[1];
                  break;
                case 'app-id':
                  visopsTag['app-id'] = data[1];
                  break;
                case 'created-by':
                  visopsTag['Created by'] = data[1];
              }
              null;
            }
          }
          visopsTag['name'] = tagSet['Name'];
          if (visopsTag['Created by'] && visopsTag['app'] && visopsTag['app-id'] && visopsTag['name']) {
            visopsTag['Name'] = visopsTag['app'] + '-' + visopsTag['name'];
            visopsTag['isOwner'] = App.user.get('username') === visopsTag['Created by'];
          }
        }
        return visopsTag;
      },
      __parseExternalData: function(awsData, extraAttr, category) {
        var d, e, i, toAddIds, ts, _i, _j, _len, _len1, _ref;
        try {
          if (this.parseExternalData) {
            awsData = this.parseExternalData(awsData, category);
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
          if (d.tags || d.Tags) {
            d.tagSet = d.tags || d.Tags;
            delete d.tags;
            delete d.Tags;
          }
          if (_.isArray(d.tagSet)) {
            ts = {};
            _ref = d.tagSet;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              i = _ref[_j];
              if (i.key) {
                ts[i.key] = i.value;
              } else if (i.Key) {
                ts[i.Key] = i.Value;
              }
            }
            d.tagSet = ts;
          }
          if (d.tagSet) {
            d.visopsTag = this.resolveTagSet(d.tagSet);
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
  define('CloudResources',["cloudres/CrCollection"], function(CrCollection) {

    /*
      resourceType : a string used to identified a class of resource
      category     : a string used to group a set of resources. It might be a region id, or app id.
     */
    var CachedCollections, CloudResources, onCollectionDestroy;
    CachedCollections = {};
    onCollectionDestroy = function(id) {
      console.info("CloudResource collection is destroyed:", CachedCollections[id]);
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
  define('cloudres/aws/CrModelDhcp',["../CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
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
  define('cloudres/aws/CrModelKeypair',["../CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
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
            res = res.CreateKeyPairResponse || res.ImportKeyPairResponse;
            self.set(res);
            keyName = res.keyName;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Keypair created but aws returns invalid data.");
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
  define('cloudres/aws/CrModelSslcert',["../CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
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
  define('cloudres/aws/CrModelTopic',["../CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
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
  define('cloudres/aws/CrModelSubscription',["../CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
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
            id: CrSubscriptionModel.getIdFromData(self.attributes),
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
  define('cloudres/aws/CrModelSnapshot',["../CrModel", "CloudResources", "ApiRequest"], function(CrModel, CloudResources, ApiRequest) {
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
  define('cloudres/aws/CrClnSharedRes',["../CrCollection", "CloudResources", "ApiRequest", "constant", "./CrModelDhcp", "./CrModelKeypair", "./CrModelSslcert", "./CrModelTopic", "./CrModelSubscription", "./CrModelSnapshot"], function(CrCollection, CloudResources, ApiRequest, constant, CrDhcpModel, CrKeypairModel, CrSslcertModel, CrTopicModel, CrSubscriptionModel, CrSnapshotModel) {

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
  define('cloudres/CrCommonCollection',["ApiRequest", "./CrCollection", "./CrModel", "constant"], function(ApiRequest, CrCollection, CrModel, constant) {
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
                xml = self.parseFetchData(xml, regionId);
              }
              _ref = xml || EmptyArr;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                d = _ref[_i];
                d.visopsTag = self.resolveTagSet(d.tagSet);
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
  define('cloudres/aws/CrModelElb',["../CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                          env:dev:end */
      initialize: function() {
        var self;
        self = this;
        ApiRequest("elb_DescribeInstanceHealth", {
          region_name: this.get("category"),
          elb_name: this.get("Name")
        }).then(function(data) {
          return self.onInsHealthData(data);
        });
      },
      onInsHealthData: function(data) {
        var _ref;
        data = data.DescribeInstanceHealthResponse;
        if (!data) {
          return;
        }
        data = data.DescribeInstanceHealthResult;
        if (!data) {
          return;
        }
        data = (_ref = data.InstanceStates) != null ? _ref.member : void 0;
        if (!data) {
          return;
        }
        this.set("InstanceStates", data);
      }
    });
  });

}).call(this);

(function() {
  define('cloudres/aws/CrClnCommonRes',["../CrCommonCollection", "../CrCollection", "../CrModel", "./CrModelElb", "ApiRequest", "constant", "CloudResources"], function(CrCommonCollection, CrCollection, CrModel, CrElbModel, ApiRequest, constant, CloudResources) {

    /* Elb */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.ELB,
      model: CrElbModel,
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
          dataItem.vpcId = dataItem.Vpcid;
          delete dataItem.Vpcid;
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
          asg.Subnets = (asg.VPCZoneIdentifier || asg.VpczoneIdentifier || "").split(",");
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
          asg.DefaultCooldown = String(asg.DefaultCooldown);
          asg.DesiredCapacity = String(asg.DesiredCapacity);
          asg.HealthCheckGracePeriod = String(asg.HealthCheckGracePeriod);
          asg.MaxSize = String(asg.MaxSize);
          asg.MinSize = String(asg.MinSize);
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
          rtb.propagatingVgwSet = ((_ref2 = rtb.propagatingVgwSet) != null ? _ref2.item : void 0) || [];
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
      parseFetchData: function(data, region) {
        var ins, _i, _len, _ref, _ref1, _ref2, _ref3;
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          ins = data[_i];
          if (ins.tagSet) {
            if (ins.tagSet['aws:elasticmapreduce:instance-group-role'] || ins.tagSet['aws:elasticmapreduce:job-flow-id']) {
              console.warn("ignore EMR instances");
              continue;
            }
          }
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
      parseExternalData: function(data, region) {
        var eni, ins, tag, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        this.convertNumTimeToString(data);
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          ins = data[_i];
          if (ins.tags) {
            _ref = ins.tags;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              tag = _ref[_j];
              if (tag.key === 'aws:elasticmapreduce:instance-group-role' || tag.key === 'aws:elasticmapreduce:job-flow-id') {
                console.warn("ignore EMR instances");
                continue;
              }
            }
          }
          ins.id = ins.instanceId;
          if (ins.instanceState && ((_ref1 = ins.instanceState.name) === "terminated" || _ref1 === "shutting-down")) {
            continue;
          }
          _ref2 = ins.networkInterfaceSet;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            eni = _ref2[_k];
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
        this.convertNumTimeToString(data);
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
          sp.Cooldown = sp.Cooldown ? sp.Cooldown.toString() : "";
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
        var id, item, nc, ncMap, newNcList, _i, _len;
        newNcList = [];
        ncMap = {};
        for (_i = 0, _len = ncs.length; _i < _len; _i++) {
          nc = ncs[_i];
          item = ncMap[id] || (ncMap[id] = {});
          id = item.AutoScalingGroupName + "-" + item.TopicARN;
          if (!item) {
            item = ncMap[id] = {
              id: id,
              AutoScalingGroupName: nc.AutoScalingGroupName,
              TopicARN: nc.TopicARN,
              NotificationType: [nc.NotificationType]
            };
            newNcList.push(item);
          } else {
            item.NotificationType.push(nc.NotificationType);
          }
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
          item.id = item.AutoScalingGroupName + "-" + item.TopicARN;
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
          sg.Name = sg.groupName;
        }
        return sgs;
      },
      parseExternalData: function(data) {
        var sg, sgRuls, _i, _len;
        this.unifyApi(data, this.type);
        this.convertNumTimeToString(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          sg = data[_i];
          sg.groupName = sg.groupName.trim();
          sg.id = sg.groupId;
          sg.Name = sg.groupName;
          sg.ipPermissions = sg.ipPermissions || [];
          sg.ipPermissionsEgress = sg.ipPermissionsEgress || [];
          sgRuls = sg.ipPermissions.concat(sg.ipPermissionsEgress);
          _.each(sgRuls, function(rule, idx) {
            if (rule.ipRanges && rule.ipRanges.length) {
              rule.ipRanges = _.map(rule.ipRanges, function(cidr) {
                return {
                  cidrIp: cidr
                };
              });
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
  define('cloudres/aws/CrClnOpsResource',["ApiRequest", "../CrCollection", "constant", "CloudResources"], function(ApiRequest, CrCollection, constant, CloudResources) {

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
          return d.promise;
        }
        this.generatedJson = null;
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
        var app_id, app_json, cln, comp, d, eni, extraAttr, id, kpComp, originalJson, originalKpComp, sg, type, _ref, _ref1, _ref2;
        delete data.vpc;
        app_json = data.app_json;
        delete data.app_json;
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
        app_id = App.workspaces.getAwakeSpace().opsModel.get("id");
        if (app_id && app_id.substr(0, 4) === 'app-') {
          originalJson = App.model.attributes.appList.where({
            id: app_id
          });
          if (originalJson && originalJson.length > 0) {
            originalJson = originalJson[0].__jsonData;
          }
        }
        if (app_json) {
          this.generatedJson = app_json;
          if (!(app_json.agent.module.repo && app_json.agent.module.tag)) {
            this.generatedJson.agent.module.repo = App.user.get("repo");
            this.generatedJson.agent.module.tag = App.user.get("tag");
          }
          console.log("Generated Json from backend:", $.extend(true, {}, this.generatedJson));
          _ref = this.generatedJson.component;
          for (id in _ref) {
            comp = _ref[id];
            if (comp.type === constant.RESTYPE.ENI) {
              eni = CloudResources(constant.RESTYPE.ENI, this.__region).where({
                id: comp.resource.NetworkInterfaceId
              });
              if (eni && eni.length > 0 && !comp.resource.Attachment.AttachmentId) {
                eni = eni[0].attributes;
                comp.resource.Attachment.AttachmentId = eni.attachment.attachmentId;
                console.warn("[patch app_json] fill AttachmentId of eni");
              }
            } else if (comp.type === constant.RESTYPE.KP) {
              kpComp = $.extend(true, {}, comp);
            }
            null;
          }
          if (originalJson) {
            _ref1 = originalJson.component;
            for (id in _ref1) {
              comp = _ref1[id];
              if (comp.type === constant.RESTYPE.KP) {
                originalKpComp = $.extend(true, {}, comp);
              } else if (comp.type === constant.RESTYPE.SG && ((_ref2 = comp.name) === "DefaultSG" || _ref2 === "default")) {
                sg = CloudResources(constant.RESTYPE.SG, this.__region).where({
                  id: comp.resource.GroupId
                });
                if (sg && sg.length > 0 && comp.resource.GroupName !== sg[0].get("groupName")) {
                  comp.resource.GroupName = sg[0].get("groupName");
                  console.warn("[patch app_json] change groupName from 'default' to real value @{comp.resource.GroupName}");
                }
              }
              null;
            }
            if (originalKpComp) {
              if (kpComp && originalKpComp.uid !== kpComp.uid) {
                delete this.generatedJson.component[kpComp.uid];
                this.generatedJson.component[originalKpComp.uid] = originalKpComp;
              }
            } else {
              originalJson.component[kpComp.uid] = kpComp;
            }
          }
          this.generatedJson.agent.enabled = originalJson ? originalJson.agent.enabled : false;
        } else {

          /* env:dev                                                                                                                                                                      env:dev:end */
        }
      }

      /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  env:dev:end */
    });
  });

}).call(this);

(function() {
  define('cloudres/aws/CrClnAmi',["ApiRequest", "../CrCollection", "constant", "CloudResources"], function(ApiRequest, CrCollection, constant, CloudResources) {
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
        this.__markedIds[amiId] = invalid;
      },
      isIdMarked: function(amiId) {
        return this.__markedIds.hasOwnProperty(amiId);
      },
      isInvalidAmiId: function(amiId) {
        return this.__markedIds[amiId];
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
        var ami, amiIds, id, savedAmis, _ref;
        savedAmis = [];
        amiIds = [];
        for (id in data) {
          ami = data[id];
          if (ami.architecture === 'i386' || (ami.name.indexOf('by VisualOps') === -1 && ((_ref = ami.osType) !== 'windows' && _ref !== 'suse'))) {
            continue;
          }
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
        var ami, favAmiId, savedAmis, _i, _len;
        savedAmis = [];
        favAmiId = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          ami = data[_i];
          if ($.isEmptyObject(ami.blockDeviceMapping)) {
            ami.blockDeviceMapping = null;
          }
          savedAmis.push(ami);
          favAmiId.push(ami.id);
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
  define('cloudres/aws/CrModelRdsSnapshot',["../CrModel", "CloudResources", "ApiRequest"], function(CrModel, CloudResources, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                                  env:dev:end */
      taggable: false,
      isComplete: function() {
        return this.attributes.Status === "available";
      },
      isAutomated: function() {
        return this.attributes.SnapshotType === "automated";
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("rds_snap_CreateDBSnapshot", {
          region_name: this.getCollection().region(),
          source_id: this.get("DBInstanceIdentifier"),
          snapshot_id: this.get("DBSnapshotIdentifier")
        }).then(function(res) {
          var e;
          try {
            res = res.CreateDBSnapshotResponse.CreateDBSnapshotResult.DBSnapshot;
            res.id = res.DBSnapshotIdentifier;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Snapshot created but aws returns invalid data.");
          }
          self.set(res);
          console.log("Created DbSnapshot resource", self);
          return self;
        });
      },
      set: function(key) {
        if (key.PercentProgress) {
          key.PercentProgress = parseInt(key.PercentProgress, 10) || 0;
        }
        if (key.Status === "creating") {
          this.startPollingStatus();
        }
        Backbone.Model.prototype.set.apply(this, arguments);
      },
      startPollingStatus: function() {
        var ___pollingStatus;
        if (this.__polling) {
          return;
        }
        ___pollingStatus = this.__pollingStatus.bind(this);
        this.__polling = setTimeout(___pollingStatus, 2000);
      },
      stopPollingStatus: function() {
        clearTimeout(this.__polling);
        this.__polling = null;
      },
      __pollingStatus: function() {
        var self, _ref;
        self = this;
        return ApiRequest("rds_snap_DescribeDBSnapshots", {
          region_name: ((_ref = this.getCollection()) != null ? _ref.region() : void 0) || Design.instance().region(),
          snapshot_id: this.get("DBSnapshotIdentifier")
        }).then(function(res) {
          self.__polling = null;
          self.__parsePolling(res);
        }, function(err) {
          if (err && err.awsError) {
            if (err.awsError === 404) {
              self.remove();
            }
            return;
          }
          if (err && err.error < 0) {
            self.__polling = null;
            return self.startPollingStatus();
          }
        });
      },
      __parsePolling: function(res) {
        res = res.DescribeDBSnapshotsResponse.DescribeDBSnapshotsResult.DBSnapshots.DBSnapshot;
        this.set({
          PercentProgress: res.PercentProgress,
          Status: res.Status
        });
      },
      copyTo: function(destRegion, newName, description) {
        var self, source_id;
        self = this;
        source_id = "arn:aws:rds:" + (this.collection.region()) + ":" + (App.user.attributes.account.split('-').join("")) + ":snapshot:" + (this.get('id'));
        return ApiRequest("rds_snap_CopyDBSnapshot", {
          region_name: destRegion,
          source_id: source_id,
          target_id: newName
        }).then(function(data) {
          var clones, model, newSnapshot, thatCln, _ref, _ref1;
          console.log(data);
          newSnapshot = (_ref = data.CopyDBSnapshotResponse) != null ? (_ref1 = _ref.CopyDBSnapshotResult) != null ? _ref1.DBSnapshot : void 0 : void 0;
          if (!newSnapshot.DBSnapshotIdentifier) {
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Snapshot copied but aws returns invalid data.");
          }
          thatCln = CloudResources(self.collection.type, destRegion);
          clones = newSnapshot;
          clones.id = newSnapshot.DBSnapshotIdentifier;
          clones.name = newName;
          clones.region = destRegion;
          model = thatCln.create(clones);
          thatCln.add(model);
          model.tagResource();
          return model;
        });
      },
      doDestroy: function() {
        return ApiRequest("rds_snap_DeleteDBSnapshot", {
          region_name: this.getCollection().region(),
          snapshot_id: this.get("id")
        });
      }
    });
  });

}).call(this);

(function() {
  define('cloudres/aws/CrModelRdsInstance',["../CrModel", "CloudResources", "ApiRequest"], function(CrModel, CloudResources, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                                    env:dev:end */
      taggable: false
    });
  });

}).call(this);

(function() {
  define('cloudres/aws/CrModelRdsPGroup',["../CrModel", "CloudResources", "ApiRequest", "constant"], function(CrModel, CloudResources, ApiRequest, constant) {
    return CrModel.extend({

      /* env:dev                                                   env:dev:end */
      taggable: false,
      isDefault: function() {
        return (this.get("DBParameterGroupName") || "").indexOf("default.") === 0;
      },
      getParameters: function() {
        return CloudResources(constant.RESTYPE.DBPARAM, this.id).init(this);
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("rds_pg_CreateDBParameterGroup", {
          region_name: this.getCollection().region(),
          param_group: this.get("DBParameterGroupName"),
          param_group_family: this.get("DBParameterGroupFamily"),
          description: this.get("Description")
        }).then(function(res) {
          self.set("id", self.get("DBParameterGroupName"));
          return self;
        });
      },
      doDestroy: function() {
        return ApiRequest("rds_pg_DeleteDBParameterGroup", {
          region_name: this.collection.region(),
          param_group: this.id
        });
      },
      resetParams: function() {
        var self;
        self = this;
        return ApiRequest("rds_pg_ResetDBParameterGroup", {
          region_name: this.collection.region(),
          param_group: this.id,
          reset_all: true
        }).then(function() {
          return self.getParameters().fetchForce();
        });
      },
      modifyParams: function(paramNewValueMap) {

        /*
        paramNewValueMap = {
          "allow-suspicious-udfs" : 0
          "log_output" : "TABLE"
        }
         */
        var i, name, pArray, parameters, params, requests, self, value;
        pArray = [];
        for (name in paramNewValueMap) {
          value = paramNewValueMap[name];
          pArray.push({
            ParameterName: name,
            ParameterValue: value,
            ApplyMethod: this.getParameters().get(name).applyMethod()
          });
        }
        requests = [];
        params = {
          region_name: this.collection.region(),
          param_group: this.id,
          parameters: []
        };
        i = 0;
        while (i < pArray.length) {
          params.parameters = pArray.slice(i, i + 20);
          requests.push(ApiRequest("rds_pg_ModifyDBParameterGroup", params));
          i += 20;
        }
        self = this;
        parameters = self.getParameters();
        return Q.all(requests).then(function() {
          var n, v;
          for (n in paramNewValueMap) {
            v = paramNewValueMap[n];
            parameters.get(n).set("ParameterValue", v);
          }
        });
      }
    });
  });

}).call(this);

(function() {
  define('cloudres/aws/CrClnRds',["ApiRequest", "../CrCollection", "constant", "CloudResources", "./CrModelRdsSnapshot", "./CrModelRdsInstance", "./CrModelRdsPGroup"], function(ApiRequest, CrCollection, constant, CloudResources, CrRdsSnapshotModel, CrRdsDbInstanceModel, CrRdsPGroupModel) {

    /* Engine */
    CrCollection.extend({

      /* env:dev                                                           env:dev:end */
      type: constant.RESTYPE.DBENGINE,
      __selfParseData: true,
      initialize: function() {
        this.optionGroupData = {};
        this.engineDict = {};
        this.defaultInfo = {};
      },
      getOptionGroupsByEngine: function(regionName, engineName) {
        var ogAry;
        if (!regionName) {
          console.error("please provide regionName");
        } else if (!engineName) {
          console.error("please provide engineName");
        } else {
          ogAry = this.optionGroupData[regionName][engineName];
        }
        return ogAry || "";
      },
      getDefaultByNameVersion: function(regionName, engineName, engineVersion) {
        var defaultData;
        if (!regionName) {
          console.error("please provide regionName");
        } else if (!engineName) {
          console.error("please provide engineName");
        } else if (!engineVersion) {
          console.error("please provide engineVersion");
        } else {
          defaultData = this.engineDict[regionName][engineName][engineVersion];
        }
        return defaultData || "";
      },
      getDefaultByFamily: function(regionName, family) {
        var defaultData;
        if (!regionName) {
          console.error("please provide regionName");
        } else if (!family) {
          console.error("please provide family");
        } else {
          defaultData = this.defaultInfo[regionName][family];
        }
        return defaultData || "";
      },
      doFetch: function() {
        var regionName, self;
        self = this;
        regionName = this.region();
        return ApiRequest("rds_DescribeDBEngineVersions", {
          region_name: regionName
        }).then(function(data) {
          var d, dict, e, engines, jobs, _i, _len;
          self.optionGroupData[regionName] = {};
          self.engineDict[regionName] = {};
          self.defaultInfo[regionName] = {};
          try {
            data = data.DescribeDBEngineVersionsResponse.DescribeDBEngineVersionsResult.DBEngineVersions.DBEngineVersion;
          } catch (_error) {
            e = _error;
            console.error(e);
          }
          data = data || [];
          if (!_.isArray(data)) {
            data = [data];
          }
          engines = {};
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            d = data[_i];
            d.id = d.Engine + " " + d.EngineVersion;
            engines[d.Engine] = true;
            if (!self.engineDict[regionName][d.Engine]) {
              self.engineDict[regionName][d.Engine] = {};
            }
            dict = {
              family: d.DBParameterGroupFamily,
              defaultPGName: 'default.' + d.DBParameterGroupFamily,
              defaultOGName: 'default:' + d.Engine + '-' + d.EngineVersion.split('.').slice(0, 2).join('-'),
              canCustomOG: false
            };
            self.engineDict[regionName][d.Engine][d.EngineVersion] = dict;
            if (!self.defaultInfo[regionName][d.DBParameterGroupFamily]) {
              self.defaultInfo[regionName][d.DBParameterGroupFamily] = dict;
            }
          }
          jobs = _.keys(engines).map(function(engineName) {
            return ApiRequest("rds_og_DescribeOptionGroupOptions", {
              region_name: regionName,
              engine_name: engineName
            }).then(function(data) {
              try {
                self.__parseOptions(self.category, data);
              } catch (_error) {
                e = _error;
                console.error(e);
              }
            });
          });
          return Q.all(jobs).then(function() {
            return data;
          });
        });
      },
      __parseOptions: function(regionName, data) {
        var d, engineName, optionData, self, _i, _len;
        self = this;
        data = data.DescribeOptionGroupOptionsResponse.DescribeOptionGroupOptionsResult.OptionGroupOptions;
        if (!data) {
          return;
        }
        data = data.OptionGroupOption || [];
        if (!_.isArray(data)) {
          data = [data];
        }
        if (!data.length) {
          return;
        }
        optionData = {};
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          d = data[_i];
          engineName = d.EngineName;
          if (!optionData[d.MajorEngineVersion]) {
            optionData[d.MajorEngineVersion] = [];
          }
          if (d.OptionGroupOptionSettings && d.OptionGroupOptionSettings.OptionGroupOptionSetting) {
            d.OptionGroupOptionSettings = d.OptionGroupOptionSettings.OptionGroupOptionSetting;
          }
          optionData[d.MajorEngineVersion].push(d);
          _.each(self.engineDict[regionName][d.EngineName], function(item, key) {
            if (key.indexOf(d.MajorEngineVersion) === 0) {
              return item.canCustomOG = true;
            }
          });
        }
        this.optionGroupData[regionName][engineName] = optionData;
      }
    });

    /* DBSubnetGroup */
    CrCollection.extend({

      /* env:dev                                                         env:dev:end */
      type: constant.RESTYPE.DBSBG,
      doFetch: function() {
        return ApiRequest("rds_subgrp_DescribeDBSubnetGroups", {
          region_name: this.region()
        });
      },
      parseFetchData: function(data) {
        var i, _i, _len, _ref, _ref1;
        data = ((_ref = data.DescribeDBSubnetGroupsResponse.DescribeDBSubnetGroupsResult.DBSubnetGroups) != null ? _ref.DBSubnetGroup : void 0) || [];
        if (!_.isArray(data)) {
          data = [data];
        }
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          i = data[_i];
          i.id = i.DBSubnetGroupName;
          i.Subnets = (_ref1 = i.Subnets) != null ? _ref1.Subnet : void 0;
        }
        return data;
      },
      parseExternalData: function(data) {
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        _.each(data, function(dataItem) {
          return dataItem.id = dataItem.DBSubnetGroupName;
        });
        return data;
      }
    });

    /* DBOptionGroup */
    CrCollection.extend({

      /* env:dev                                                         env:dev:end */
      type: constant.RESTYPE.DBOG,
      doFetch: function() {
        return ApiRequest("rds_og_DescribeOptionGroups", {
          region_name: this.region()
        });
      },
      parseFetchData: function(data) {
        var i, _i, _len, _ref;
        data = ((_ref = data.DescribeOptionGroupsResponse.DescribeOptionGroupsResult.OptionGroupsList) != null ? _ref.OptionGroup : void 0) || [];
        if (!_.isArray(data)) {
          data = [data];
        }
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          i = data[_i];
          i.id = i.OptionGroupName;
        }
        return data;
      },
      parseExternalData: function(data) {
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        _.each(data, function(dataItem) {
          return dataItem.id = dataItem.OptionGroupName;
        });
        return data;
      }
    });

    /* DBInstance */
    CrCollection.extend({

      /* env:dev                                                      env:dev:end */
      type: constant.RESTYPE.DBINSTANCE,
      model: CrRdsDbInstanceModel,
      doFetch: function() {
        return ApiRequest("rds_ins_DescribeDBInstances", {
          region_name: this.region()
        });
      },
      parseFetchData: function(data) {
        var i, _i, _len, _ref, _ref1, _ref2, _ref3;
        data = ((_ref = data.DescribeDBInstancesResponse.DescribeDBInstancesResult.DBInstances) != null ? _ref.DBInstance : void 0) || [];
        if (!_.isArray(data)) {
          data = [data];
        }
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          i = data[_i];
          i.id = i.DBInstanceIdentifier;
          i.Name = i.DBName;
          i.sbgId = (_ref1 = i.DBSubnetGroup) != null ? _ref1.DBSubnetGroupName : void 0;
          i.DBParameterGroups = ((_ref2 = i.DBParameterGroups) != null ? _ref2.DBParameterGroup : void 0) || [];
          i.DBSecurityGroups = ((_ref3 = i.DBSecurityGroups) != null ? _ref3.DBSecurityGroup : void 0) || [];
          if (i.LatestRestorableTime) {
            i.LatestRestorableTime = (new Date(i.LatestRestorableTime)).getTime();
          }
          if (i.InstanceCreateTime) {
            i.InstanceCreateTime = (new Date(i.InstanceCreateTime)).getTime();
          }
        }
        return data;
      },
      parseExternalData: function(data) {
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        _.each(data, function(dataItem) {
          var pg, _i, _len, _ref;
          if (dataItem.DBSubnetGroup) {
            dataItem.DBSubnetGroup.DBSubnetGroupDescription = dataItem.DBSubnetGroup.DbsubnetGroupDescription;
            dataItem.DBSubnetGroup.DBSubnetGroupName = dataItem.DBSubnetGroup.DbsubnetGroupName;
            delete dataItem.DBSubnetGroup.DbsubnetGroupDescription;
            delete dataItem.DBSubnetGroup.DbsubnetGroupName;
          }
          _ref = dataItem.DBParameterGroups;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            pg = _ref[_i];
            pg.DBParameterGroupName = pg.DbparameterGroupName;
            delete pg.DbparameterGroupName;
          }
          if (dataItem.PendingModifiedValues) {
            dataItem.PendingModifiedValues.DBInstanceClass = dataItem.PendingModifiedValues.DbinstanceClass;
            dataItem.PendingModifiedValues.DBInstanceIdentifier = dataItem.PendingModifiedValues.DbinstanceIdentifier;
            delete dataItem.PendingModifiedValues.DbinstanceClass;
            delete dataItem.PendingModifiedValues.DbinstanceIdentifier;
          }
          dataItem.id = dataItem.DBInstanceIdentifier;
          dataItem.Name = dataItem.DBName;
          return dataItem.sbgId = dataItem.DBSubnetGroup.DBSubnetGroupName;
        });
        return data;
      }
    });

    /* Snapshot */
    CrCollection.extend({

      /* env:dev                                                       env:dev:end */
      type: constant.RESTYPE.DBSNAP,
      model: CrRdsSnapshotModel,
      doFetch: function() {
        return ApiRequest("rds_snap_DescribeDBSnapshots", {
          region_name: this.region()
        });
      },
      parseFetchData: function(data) {
        var i, _i, _len, _ref;
        data = ((_ref = data.DescribeDBSnapshotsResponse.DescribeDBSnapshotsResult.DBSnapshots) != null ? _ref.DBSnapshot : void 0) || [];
        if (!_.isArray(data)) {
          data = [data];
        }
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          i = data[_i];
          i.id = i.DBSnapshotIdentifier;
        }
        return data;
      }
    });

    /* Parameter Group */
    return CrCollection.extend({

      /* env:dev                                                     env:dev:end */
      type: constant.RESTYPE.DBPG,
      model: CrRdsPGroupModel,
      doFetch: function() {
        return ApiRequest("rds_pg_DescribeDBParameterGroups", {
          region_name: this.region()
        });
      },
      parseFetchData: function(data) {
        var i, _i, _len, _ref;
        data = ((_ref = data.DescribeDBParameterGroupsResponse.DescribeDBParameterGroupsResult.DBParameterGroups) != null ? _ref.DBParameterGroup : void 0) || [];
        if (!_.isArray(data)) {
          data = [data];
        }
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          i = data[_i];
          i.id = i.DBParameterGroupName;
        }
        return data;
      }
    });
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('cloudres/aws/CrModelRdsParameter',["../CrModel", "CloudResources", "ApiRequest"], function(CrModel, CloudResources, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                              env:dev:end */
      taggable: false,
      isValidValue: function(value) {
        var allowed, range, second_minus, valueNum, _i, _len, _ref;
        if (!this.attributes.AllowedValues) {
          return true;
        }
        valueNum = Number(value);
        if (__indexOf.call(this.attributes.AllowedValues.split(","), value) >= 0) {
          return true;
        }
        _ref = this.attributes.AllowedValues.split(",");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          allowed = _ref[_i];
          if (allowed.indexOf("-") >= 0) {
            if (!(!isNaN(parseFloat(value)) && isFinite(value))) {
              return false;
            }
            if (allowed.split("-").length >= 2) {
              if (allowed.indexOf("-") === 0) {
                second_minus = allowed.indexOf("-", 1);
              } else {
                second_minus = allowed.indexOf("-", 0);
              }
              allowed = allowed.substr(0, second_minus) + "#" + allowed.substr(second_minus + 1);
              range = allowed.split("#");
              if (valueNum >= Number(range[0]) && valueNum <= Number(range[1])) {
                return true;
              }
            }
          }
        }
        return false;
      },
      isFunctionValue: function(value) {
        var reg;
        reg = /^((GREATEST|LEAST|SUM)\s*\(\s*)*((({(DBInstanceClassMemory|AllocatedStorage|EndPointPort))+((\/|\*|\+|\-)*(\d+|(DBInstanceClassMemory|AllocatedStorage|EndPointPort)))*}|\d+)\s*,?\s*\)*)*$/;
        return reg.test(value);
      },
      isNumber: function(value) {
        var reg;
        reg = /^\d+$/;
        return reg.test(value);
      },
      applyMethod: function() {
        if (this.get("ApplyType") === "dynamic") {
          return "immediate";
        } else {
          return "pending-reboot";
        }
      }
    });
  });

}).call(this);

(function() {
  define('cloudres/aws/CrClnRdsParam',["ApiRequest", "../CrCollection", "constant", "CloudResources", "./CrModelRdsParameter"], function(ApiRequest, CrCollection, constant, CloudResources, CrRdsParamModel) {

    /*
      This kind of collection can only be obtained by CrModelRdsPGroup.getParameters()
     */

    /* Parameter */
    return CrCollection.extend({

      /* env:dev                                                    env:dev:end */
      type: constant.RESTYPE.DBPARAM,
      model: CrRdsParamModel,
      __selfParseData: true,
      init: function(paramGroupModel) {
        if (this.groupModel) {
          return this;
        }
        this.groupModel = paramGroupModel;
        this.listenTo(paramGroupModel, "remove", this.reset);
        return this;
      },
      region: function() {
        var _ref;
        return (_ref = this.groupModel.collection) != null ? _ref.region() : void 0;
      },
      doFetch: function(marker) {
        var self;
        self = this;
        return ApiRequest("rds_pg_DescribeDBParameters", {
          region_name: this.region(),
          param_group: this.category,
          marker: marker
        }).then(function(data) {
          var d, e, _i, _len, _ref;
          try {
            marker = data.DescribeDBParametersResponse.DescribeDBParametersResult.Marker;
            data = ((_ref = data.DescribeDBParametersResponse.DescribeDBParametersResult.Parameters) != null ? _ref.Parameter : void 0) || [];
          } catch (_error) {
            e = _error;
            console.log(e);
          }
          if (!_.isArray(data)) {
            data = [data];
          }
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            d = data[_i];
            d.id = d.ParameterName;
          }
          if (marker) {
            if (!self.__bucket) {
              self.__bucket = data;
            } else {
              self.__bucket = self.__bucket.concat(data);
            }
            return self.doFetch(marker);
          }
          if (self.__bucket) {
            data = self.__bucket.concat(data);
            self.__bucket = null;
          }
          return data;
        });
      }
    });
  });

}).call(this);

(function() {
  define('cloudres/CrBundle',["CloudResources", "./aws/CrClnSharedRes", "./aws/CrClnCommonRes", "./aws/CrClnOpsResource", "./aws/CrClnAmi", "./aws/CrClnRds", "./aws/CrClnRdsParam"], function(CloudResources) {

    /* env:dev                                                             env:dev:end */

    /* env:debug */
    require(["./cloudres/aws/CloudImportVpc"], function() {});

    /* env:debug:end */
    return CloudResources;
  });

}).call(this);

