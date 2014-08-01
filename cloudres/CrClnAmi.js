(function() {
  define(["ApiRequest", "./CrCollection", "constant", "CloudResources"], function(ApiRequest, CrCollection, constant, CloudResources) {
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
        var ami, e, favAmiId, item, savedAmis, _i, _len;
        savedAmis = [];
        favAmiId = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          ami = data[_i];
          try {
            item = JSON.parse(ami.amiVO);
            item.id = ami.id;
            item.blockDeviceMapping = $.isEmptyObject(item.blockDeviceMapping) ? null : item.blockDeviceMapping;
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
