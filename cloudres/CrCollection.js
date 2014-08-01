(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["ApiRequest", "./CrModel", "constant", "backbone"], function(ApiRequest, CrModel, constant) {
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
