(function() {
  define(['constant', 'MC', 'Design', 'TaHelper'], function(constant, MC, Design, Helper) {
    var i18n, isAccessibleEnableDNS, isAccessibleHasNoIgw, isAzConsistent, isHaveEnoughIPForDB, isHaveReplicaStorageSmallThanOrigin, isOgValid, isSqlServerCross3Subnet;
    i18n = Helper.i18n.short();
    isOgValid = function() {
      var db, dbs, nameStr, taId, _i, _len;
      dbs = Design.modelClassForType(constant.RESTYPE.DBINSTANCE).filter(function(db) {
        return (db.get('instanceClass') === 'db.t1.micro') && !db.getOptionGroup().isDefault();
      });
      if (!dbs.length) {
        return null;
      }
      taId = '';
      nameStr = '';
      for (_i = 0, _len = dbs.length; _i < _len; _i++) {
        db = dbs[_i];
        nameStr += "<span class='validation-tag'>" + (db.get('name')) + "</span>, ";
        taId += db.id;
      }
      nameStr = nameStr.slice(0, -2);
      return Helper.message.error(taId, i18n.TA_MSG_ERROR_RDS_DB_T1_MICRO_DEFAULT_OPTION, nameStr);
    };
    isAzConsistent = function(uid) {
      var azName, db, sbg;
      db = Design.instance().component(uid);
      azName = db.get('az');
      if (!azName) {
        return null;
      }
      sbg = db.parent();
      if (_.some(sbg.connectionTargets("SubnetgAsso"), function(sb) {
        return sb.parent().get('name') === azName;
      })) {
        return null;
      }
      return Helper.message.error(uid, i18n.TA_MSG_ERROR_RDS_AZ_NOT_CONSISTENT, db.get('name'), azName);
    };
    isAccessibleHasNoIgw = function(uid) {
      var db, vpc;
      db = Design.instance().component(uid);
      if (!db.get('accessible')) {
        return null;
      }
      vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
      if (_.some(vpc.children(), function(child) {
        return child.type === constant.RESTYPE.IGW;
      })) {
        return null;
      }
      return Helper.message.error(uid, i18n.TA_MSG_ERROR_RDS_ACCESSIBLE_NOT_HAVE_IGW);
    };
    isAccessibleEnableDNS = function(uid) {
      var db, vpc;
      db = Design.instance().component(uid);
      if (!db.get('accessible')) {
        return null;
      }
      vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
      if (vpc.get('dnsSupport') && vpc.get('dnsHostnames')) {
        return null;
      }
      return Helper.message.error(uid, i18n.TA_MSG_ERROR_RDS_ACCESSIBLE_NOT_HAVE_DNS);
    };
    isHaveEnoughIPForDB = function(uid) {
      var dbModels, resultSubnetAry, subnetDBMap, _getSubnetRemainIPCount;
      _getSubnetRemainIPCount = function(subnetModel) {
        var availableIPCount, cidr;
        cidr = subnetModel.get('cidr');
        availableIPCount = subnetModel.getAvailableIPCountInSubnet();
        return availableIPCount;
      };
      subnetDBMap = {};
      resultSubnetAry = [];
      dbModels = Design.modelClassForType(constant.RESTYPE.DBINSTANCE).allObjects();
      _.each(dbModels, function(dbModel) {
        var connAry, subnetGroupModel;
        subnetGroupModel = dbModel.get('__parent');
        connAry = subnetGroupModel.get('__connections');
        _.each(connAry, function(conModel) {
          var subnetModel;
          subnetModel = conModel.getTarget(constant.RESTYPE.SUBNET);
          if (!subnetDBMap[subnetModel.id]) {
            subnetDBMap[subnetModel.id] = [];
          }
          subnetDBMap[subnetModel.id] = _.union(subnetDBMap[subnetModel.id], [dbModel.get('id')]);
          return null;
        });
        return null;
      });
      _.each(subnetDBMap, function(dbAry, subnetUID) {
        var availableIPCount, subnetModel;
        subnetModel = Design.instance().component(subnetUID);
        availableIPCount = _getSubnetRemainIPCount(subnetModel);
        if (availableIPCount < dbAry.length) {
          resultSubnetAry.push(subnetModel.get('name'));
        }
        return null;
      });
      resultSubnetAry = _.map(resultSubnetAry, function(name) {
        return "<span class='validation-tag tag-vpn'>" + name + "</span>";
      });
      if (resultSubnetAry.length) {
        return {
          level: constant.TA.ERROR,
          info: sprintf(i18n.TA_MSG_ERROR_HAVE_NOT_ENOUGH_IP_FOR_DB, resultSubnetAry.join(', '))
        };
      }
      return null;
    };
    isHaveReplicaStorageSmallThanOrigin = function(uid) {
      var dbModel, srcStorge, storge;
      dbModel = Design.instance().component(uid);
      if (!dbModel.master()) {
        return null;
      }
      storge = dbModel.get('allocatedStorage');
      srcStorge = dbModel.master().get('allocatedStorage');
      if (storge < srcStorge) {
        return {
          uid: uid,
          level: constant.TA.ERROR,
          info: sprintf(i18n.TA_MSG_ERROR_REPLICA_STORAGE_SMALL_THAN_ORIGIN, dbModel.get('name'), dbModel.master().get('name'))
        };
      }
      return null;
    };
    isSqlServerCross3Subnet = function(uid) {
      var azs, db, sbg;
      db = Design.instance().component(uid);
      if (!(db.isSqlserver() && db.get('multiAz'))) {
        return null;
      }
      sbg = db.parent();
      azs = _.map(sbg.connectionTargets('SubnetgAsso'), function(sb) {
        return sb.parent();
      });
      if (_.uniq(azs) > 2) {
        return null;
      }
      return Helper.message.error(uid, i18n.TA_MSG_ERROR_RDS_SQL_SERVER_MIRROR_MUST_HAVE3SUBNET, db.get('name'));
    };
    return {
      isOgValid: isOgValid,
      isAzConsistent: isAzConsistent,
      isAccessibleHasNoIgw: isAccessibleHasNoIgw,
      isAccessibleEnableDNS: isAccessibleEnableDNS,
      isHaveEnoughIPForDB: isHaveEnoughIPForDB,
      isHaveReplicaStorageSmallThanOrigin: isHaveReplicaStorageSmallThanOrigin,
      isSqlServerCross3Subnet: isSqlServerCross3Subnet
    };
  });

}).call(this);
