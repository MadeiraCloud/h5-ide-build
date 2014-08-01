(function() {
  define(["ApiRequest", "./CrCollection", "constant", "CloudResources", "./CrModelRdsSnapshot", "./CrModelRdsInstance", "./CrModelRdsPGroup"], function(ApiRequest, CrCollection, constant, CloudResources, CrRdsSnapshotModel, CrRdsDbInstanceModel, CrRdsPGroupModel) {

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
        var i, _i, _len;
        data = data.DescribeOptionGroupsResponse.DescribeOptionGroupsResult.OptionGroupsList.OptionGroup || [];
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
