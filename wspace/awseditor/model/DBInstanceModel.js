(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['ComplexResModel', 'ConnectionModel', './DBOgModel', 'Design', 'constant', 'i18n!/nls/lang.js', 'CloudResources'], function(ComplexResModel, ConnectionModel, DBOgModel, Design, constant, lang, CloudResources) {
    var Model, OgUsage;
    OgUsage = ConnectionModel.extend({
      type: "OgUsage",
      oneToMany: constant.RESTYPE.DBOG
    });
    Model = ComplexResModel.extend({
      defaults: {
        newInstanceId: '',
        instanceId: '',
        snapshotId: '',
        createdBy: "",
        accessible: false,
        username: 'root',
        password: '12345678',
        multiAz: true,
        iops: 0,
        autoMinorVersionUpgrade: true,
        allowMajorVersionUpgrade: '',
        backupRetentionPeriod: 1,
        allocatedStorage: 10,
        backupWindow: '',
        maintenanceWindow: '',
        characterSetName: '',
        dbName: '',
        port: '',
        pending: '',
        az: '',
        ogName: '',
        pgName: '',
        applyImmediately: false,
        dbRestoreTime: '',
        isRestored: false,
        storageType: "standard"
      },
      type: constant.RESTYPE.DBINSTANCE,
      newNameTmpl: "db",
      __cachedSpecifications: null,
      source: function() {
        return CloudResources(this.design().credentialId(), constant.RESTYPE.DBSNAP, this.design().region()).get(this.get('snapshotId'));
      },
      slaveIndependentAttr: "id|appId|x|y|width|height|name|accessible|createdBy|instanceId|instanceClass|autoMinorVersionUpgrade|accessible|backupRetentionPeriod|multiAz|password|__connections|__parent",
      sourceDbIndependentAttrForRestore: "id|appId|x|y|width|height|name|accessible|createdBy|instanceId|instanceClass|autoMinorVersionUpgrade|multiAz|__connections|__parent|license|iops|port|ogName|pgName|az",
      slaves: function() {
        var that;
        that = this;
        if (this.master() && this.master().master()) {
          return [];
        }
        return _.filter(this.connectionTargets("DbReplication"), function(dbModel) {
          if (dbModel.category() === 'instance' && dbModel.get('appId')) {
            return false;
          }
          if (that.category() === 'replica' && !that.get('appId')) {
            return false;
          }
          return true;
        });
      },
      getAllRestoreDB: function() {
        var dbModels, srcDb, that;
        srcDb = this.getSourceDBForRestore();
        if (srcDb) {
          return [];
        }
        that = this;
        dbModels = Design.modelClassForType(constant.RESTYPE.DBINSTANCE).allObjects();
        return _.filter(dbModels, function(dbModel) {
          if (dbModel.getSourceDBForRestore() === that) {
            return true;
          }
          return false;
        });
      },
      master: function() {
        var m;
        m = this.connections('DbReplication')[0];
        if (m && m.master() !== this) {
          return m.master();
        }
        return null;
      },
      copyMaster: function(master) {
        this.clone(master);
        if (!this.get('appId')) {
          return this.set({
            backupRetentionPeriod: 0,
            multiAz: false,
            instanceId: '',
            snapshotId: '',
            password: '****'
          });
        }
      },
      setMaster: function(master) {
        var Replication;
        this.unsetMaster();
        Replication = Design.modelClassForType("DbReplication");
        new Replication(master, this);
        this.listenTo(master, 'change', this.syncMasterAttr);
        return null;
      },
      unsetMaster: function() {
        var that;
        that = this;
        return _.each(this.connections("DbReplication"), function(connection) {
          if (connection.slave() === that) {
            return connection.remove();
          }
        });
      },
      setSourceDBForRestore: function(sourceDb) {
        var SgAsso, defaultSg;
        this.sourceDBForRestore = sourceDb;
        this.setDefaultParameterGroup();
        defaultSg = Design.modelClassForType(constant.RESTYPE.SG).getDefaultSg();
        SgAsso = Design.modelClassForType("SgAsso");
        new SgAsso(defaultSg, this);
        return this.listenTo(sourceDb, 'change', this.syncAttrSourceDBForRestore);
      },
      getSourceDBForRestore: function() {
        return this.sourceDBForRestore;
      },
      syncMasterAttr: function(master) {
        var k, needSync, v, _ref;
        if (this.get('appId')) {
          return false;
        }
        needSync = {};
        _ref = master.changedAttributes();
        for (k in _ref) {
          v = _ref[k];
          if (this.slaveIndependentAttr.indexOf(k) < 0) {
            needSync[k] = v;
          }
        }
        if (needSync['iops']) {
          delete needSync['iops'];
        }
        return this.set(needSync);
      },
      syncAttrSourceDBForRestore: function(sourceDb) {
        var k, needSync, v, _ref;
        needSync = {};
        _ref = sourceDb.changedAttributes();
        for (k in _ref) {
          v = _ref[k];
          if (this.sourceDbIndependentAttrForRestore.indexOf(k) < 0) {
            needSync[k] = v;
          }
        }
        return this.set(needSync);
      },
      needSyncMasterConn: function(cnn) {
        var connTypesToCopy, _ref;
        if (this.master()) {
          return false;
        }
        if (this.get('appId')) {
          connTypesToCopy = [];
        } else {
          connTypesToCopy = ['SgAsso', 'OgUsage'];
        }
        if (_ref = cnn.type, __indexOf.call(connTypesToCopy, _ref) < 0) {
          return false;
        }
        return true;
      },
      connect: function(cnn) {
        var connectionModel, otherTarget, slave, _i, _len, _ref;
        if (!this.needSyncMasterConn(cnn)) {
          return;
        }
        otherTarget = cnn.getOtherTarget(this);
        connectionModel = Design.modelClassForType(cnn.type);
        _ref = this.slaves();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          slave = _ref[_i];
          new connectionModel(slave, otherTarget);
        }
      },
      disconnect: function(cnn) {
        var connectionModel, otherTarget, slave, _i, _len, _ref;
        if (!this.needSyncMasterConn(cnn)) {
          return;
        }
        if (cnn.oneToMany) {
          return;
        }
        otherTarget = cnn.getOtherTarget(this);
        connectionModel = Design.modelClassForType(cnn.type);
        _ref = this.slaves();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          slave = _ref[_i];
          new connectionModel(slave, otherTarget).remove();
        }
      },
      restoreMaster: function(master) {
        this.clone(master);
        this.set("snapshotId", master.get("snapshotId"));
        return null;
      },
      constructor: function(attr, option) {
        var snapshotModel;
        if (option && !option.master && option.createByUser) {
          if (attr.snapshotId) {
            snapshotModel = this.getSnapshotModel(attr.snapshotId);
            _.extend(attr, {
              "engine": snapshotModel.get('Engine'),
              "engineVersion": snapshotModel.get('EngineVersion'),
              "snapshotId": snapshotModel.get('DBSnapshotIdentifier'),
              "allocatedStorage": snapshotModel.get('AllocatedStorage'),
              "port": snapshotModel.get('Port'),
              "iops": snapshotModel.get('Iops') || 0,
              "multiAz": snapshotModel.get('MultiAZ'),
              "ogName": snapshotModel.get('OptionGroupName'),
              "license": snapshotModel.get('LicenseModel'),
              "az": snapshotModel.get('AvailabilityZone'),
              "username": snapshotModel.get('MasterUsername')
            });
          }
        }
        return ComplexResModel.call(this, attr, option);
      },
      initialize: function(attr, option) {
        var SgAsso, defaultSg;
        option = option || {};
        if (option.cloneSource) {
          this.clone(option.cloneSource);
          return;
        }
        if (option.master) {
          if (!option.isRestore) {
            this.copyMaster(option.master);
            this.setMaster(option.master);
          } else {
            this.cloneForRestore(option.master);
            this.setSourceDBForRestore(option.master);
          }
        } else if (option.createByUser) {
          SgAsso = Design.modelClassForType("SgAsso");
          defaultSg = Design.modelClassForType(constant.RESTYPE.SG).getDefaultSg();
          new SgAsso(defaultSg, this);
          this.set(_.defaults(attr, {
            license: this.getDefaultLicense(),
            engineVersion: this.getDefaultVersion(),
            instanceClass: this.getDefaultInstanceClass(),
            port: this.getDefaultPort(),
            dbName: this.getDefaultDBName(),
            characterSetName: this.getDefaultCharSet(),
            allocatedStorage: this.getDefaultAllocatedStorage(),
            snapshotId: "",
            multiAz: !!attr.multiAz
          }));
          if (attr.iops && Number(attr.iops) > 0) {
            this.set('storageType', 'io1');
          }
          this.setDefaultOptionGroup();
          this.setDefaultParameterGroup();
        }
      },
      clone: function(srcTarget) {
        this.cloneAttributes(srcTarget, {
          reserve: "newInstanceId|instanceId|createdBy",
          copyConnection: ["SgAsso", "OgUsage"]
        });
        this.set('snapshotId', '');
        if (this.get('password') === '****') {
          this.set('password', '12345678');
        }
      },
      cloneForRestore: function(srcTarget) {
        this.cloneAttributes(srcTarget, {
          reserve: "newInstanceId|instanceId|createdBy|pgName",
          copyConnection: ["OgUsage"]
        });
        this.set('snapshotId', '');
        if (this.get('password') === '****') {
          this.set('password', '12345678');
        }
      },
      setDefaultOptionGroup: function(origEngineVersion) {
        var defaultInfo, defaultOG, engineCol, origDefaultInfo, regionName;
        regionName = this.design().region();
        engineCol = CloudResources(this.design().credentialId(), constant.RESTYPE.DBENGINE, regionName);
        defaultInfo = engineCol.getDefaultByNameVersion(regionName, this.get('engine'), this.get('engineVersion'));
        if (origEngineVersion) {
          origDefaultInfo = engineCol.getDefaultByNameVersion(regionName, this.get('engine'), origEngineVersion);
        }
        if (origDefaultInfo && origDefaultInfo.family && defaultInfo && defaultInfo.family) {
          if (origDefaultInfo.family === defaultInfo.family) {
            return null;
          }
        }
        if (defaultInfo && defaultInfo.defaultOGName) {
          defaultOG = defaultInfo.defaultOGName;
        } else {
          defaultOG = "default:" + this.get('engine') + "-" + this.getMajorVersion().replace(".", "-");
          console.warn("can not get default optiongroup for " + (this.get('engine')) + " " + (this.getMajorVersion()));
        }
        new OgUsage(this, this.getDefaultOgInstance(defaultOG));
        return null;
      },
      getDefaultOgInstance: function(name) {
        return DBOgModel.findWhere({
          name: name,
          "default": true
        }) || new DBOgModel({
          name: name,
          "default": true
        });
      },
      setDefaultParameterGroup: function(origEngineVersion) {
        var defaultInfo, defaultPG, engineCol, regionName;
        regionName = this.design().region();
        engineCol = CloudResources(this.design().credentialId(), constant.RESTYPE.DBENGINE, regionName);
        defaultInfo = engineCol.getDefaultByNameVersion(regionName, this.get('engine'), this.get('engineVersion'));
        if (defaultInfo && defaultInfo.defaultPGName) {
          defaultPG = defaultInfo.defaultPGName;
        } else {
          defaultPG = "default." + this.get('engine') + this.getMajorVersion();
          console.warn("can not get default parametergroup for " + (this.get('engine')) + " " + (this.getMajorVersion()));
        }
        this.set('pgName', defaultPG || "");
        return defaultPG;
      },
      getAllocatedRange: function() {
        var engine, obj;
        engine = this.get('engine');
        if (this.isMysql()) {
          obj = {
            min: 5,
            max: 3072
          };
        }
        if (this.isPostgresql()) {
          obj = {
            min: 5,
            max: 3072
          };
        }
        if (this.isOracle()) {
          obj = {
            min: 10,
            max: 3072
          };
        }
        if (this.isSqlserver()) {
          engine = this.get('engine');
          if (engine === 'sqlserver-ee' || engine === 'sqlserver-se') {
            obj = {
              min: 200,
              max: 1024
            };
          }
          if (engine === 'sqlserver-ex' || engine === 'sqlserver-web') {
            obj = {
              min: 30,
              max: 1024
            };
          }
        }
        return obj;
      },
      getLicenseObj: function(getDefault) {
        var currentLicense, obj;
        currentLicense = this.get('license');
        if (currentLicense) {
          obj = _.findWhere(this.getSpecifications(), {
            license: currentLicense
          });
        }
        if (!obj && getDefault) {
          obj = this.getSpecifications()[0];
        }
        return obj;
      },
      getVersionObj: function(getDefault) {
        var currentVersion, obj, versions;
        versions = this.getLicenseObj(true).versions;
        currentVersion = this.get('engineVersion');
        if (currentVersion) {
          obj = _.findWhere(versions, {
            version: currentVersion
          });
        }
        if (!obj && getDefault) {
          obj = versions[0];
        }
        return obj;
      },
      getInstanceClassObj: function(getDefault) {
        var consoleDefault, currentClass, instanceClasses, obj;
        instanceClasses = this.getVersionObj(true).instanceClasses;
        currentClass = this.get('instanceClass');
        if (currentClass) {
          obj = _.findWhere(instanceClasses, {
            instanceClass: currentClass
          });
        }
        if (!obj && getDefault) {
          consoleDefault = 'db.t1.micro';
          obj = _.find(instanceClasses, function(i) {
            return i.instanceClass === consoleDefault;
          });
          if (!obj) {
            obj = instanceClasses[0];
          }
        }
        return obj;
      },
      setIops: function(iops) {
        return this.set('iops', iops);
      },
      getIops: function() {
        return this.get('iops');
      },
      getDefaultLicense: function() {
        return this.getLicenseObj(true).license;
      },
      getDefaultVersion: function() {
        return this.getVersionObj(true).version;
      },
      getDefaultInstanceClass: function() {
        return this.getInstanceClassObj(true).instanceClass;
      },
      getMajorVersion: function() {
        var _ref;
        return (_ref = this.get('engineVersion')) != null ? _ref.split('.').slice(0, 2).join('.') : void 0;
      },
      getMinorVersion: function() {
        var _ref;
        return (_ref = this.get('engineVersion')) != null ? _ref.split('.').slice(2).join('.') : void 0;
      },
      getRdsInstances: function() {
        var _ref;
        return (_ref = App.model.getRdsData(this.design().region())) != null ? _ref.instance[this.get('engine')] : void 0;
      },
      getDefaultPort: function() {
        return constant.DB_DEFAULTSETTING[this.get('engine')].port;
      },
      getDefaultDBName: function() {
        return constant.DB_DEFAULTSETTING[this.get('engine')].dbname;
      },
      getDefaultCharSet: function() {
        return constant.DB_DEFAULTSETTING[this.get('engine')].charset;
      },
      getInstanceClassDict: function() {
        return _.find(constant.DB_INSTANCECLASS, (function(_this) {
          return function(claDict) {
            return claDict.instanceClass === _this.get('instanceClass');
          };
        })(this));
      },
      getDefaultAllocatedStorage: function() {
        var defaultStorage;
        defaultStorage = constant.DB_DEFAULTSETTING[this.get('engine')].allocatedStorage;
        return defaultStorage;
      },
      getOptionGroup: function() {
        return this.connectionTargets('OgUsage')[0];
      },
      getOptionGroupName: function() {
        var _ref;
        return (_ref = this.getOptionGroup()) != null ? _ref.get('name') : void 0;
      },
      setOptionGroup: function(name) {
        var ogComp;
        ogComp = DBOgModel.findWhere({
          name: name
        }) || new DBOgModel({
          name: name,
          "default": true
        });
        return new OgUsage(this, ogComp);
      },
      isMysql: function() {
        return this.engineType() === 'mysql';
      },
      isOracle: function() {
        return this.engineType() === 'oracle';
      },
      isSqlserver: function() {
        return this.engineType() === 'sqlserver';
      },
      isPostgresql: function() {
        return this.engineType() === 'postgresql';
      },
      engineType: function() {
        var engine;
        engine = this.get('engine');
        return constant.DB_ENGINTYPE[engine] || engine;
      },
      getSpecifications: function() {
        var az, cla, claDict, classes, i, instanceClassDict, instances, lObj, license, spec, specArr, that, vObj, version, versions, _i, _j, _len, _len1, _ref;
        if (this.__cachedSpecifications) {
          return this.__cachedSpecifications;
        }
        that = this;
        instances = this.getRdsInstances();
        if (!instances) {
          return null;
        }
        spec = {};
        specArr = [];
        for (_i = 0, _len = instances.length; _i < _len; _i++) {
          i = instances[_i];
          if (!spec[i.LicenseModel]) {
            spec[i.LicenseModel] = {};
          }
          if (!spec[i.LicenseModel][i.EngineVersion]) {
            spec[i.LicenseModel][i.EngineVersion] = {};
          }
          spec[i.LicenseModel][i.EngineVersion][i.DBInstanceClass] = {
            multiAZCapable: i.MultiAZCapable,
            availabilityZones: i.AvailabilityZones
          };
        }
        for (license in spec) {
          versions = spec[license];
          lObj = {
            license: license,
            versions: []
          };
          for (version in versions) {
            classes = versions[version];
            vObj = {
              version: version,
              instanceClasses: []
            };
            instanceClassDict = {};
            for (cla in classes) {
              az = classes[cla];
              instanceClassDict[cla] = {
                multiAZCapable: az.multiAZCapable,
                availabilityZones: az.availabilityZones
              };
            }
            _ref = constant.DB_INSTANCECLASS;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              claDict = _ref[_j];
              if (_.has(instanceClassDict, claDict.instanceClass)) {
                vObj.instanceClasses.push(_.extend(instanceClassDict[claDict.instanceClass], claDict));
              }
            }
            lObj.versions.push(vObj);
          }
          lObj.versions.sort(function(a, b) {
            return MC.versionCompare(b.version, a.version);
          });
          specArr.push(lObj);
        }
        this.__cachedSpecifications = specArr;
        return specArr;
      },
      getLVIA: function(spec) {
        var currentClass, currentLicense, currentVersion, engine, instanceClass, license, multiAZCapable, version, _ref, _ref1;
        if (!spec) {
          return [];
        }
        currentLicense = this.get('license');
        currentVersion = this.get('engineVersion');
        currentClass = this.get('instanceClass');
        license = _.first(_.filter(spec, function(s) {
          if (s.license === currentLicense) {
            s.selected = true;
            return true;
          } else {
            delete s.selected;
            return false;
          }
        }));
        version = _.first(_.filter(license.versions, function(v) {
          if (v.version === currentVersion) {
            v.selected = true;
            return true;
          } else {
            delete v.selected;
            return false;
          }
        }));
        if (!version) {
          version = this.getVersionObj(true);
          this.set('engineVersion', version.version);
          if ((_ref = _.findWhere(license.versions, {
            version: version.version
          })) != null) {
            _ref.selected = true;
          }
        }
        instanceClass = _.first(_.filter(version.instanceClasses, function(i) {
          if (i.instanceClass === currentClass) {
            i.selected = true;
            return true;
          } else {
            delete i.selected;
            return false;
          }
        }));
        if (!instanceClass) {
          instanceClass = this.getInstanceClassObj(true);
          this.set('instanceClass', instanceClass.instanceClass);
          if ((_ref1 = _.where(version.instanceClasses, {
            instanceClass: instanceClass.instanceClass
          })) != null) {
            _ref1.selected = true;
          }
        }
        multiAZCapable = instanceClass.multiAZCapable;
        if (!multiAZCapable) {
          this.set('multiAz', '');
        }
        engine = this.get('engine');
        if ((engine === 'sqlserver-ee' || engine === 'sqlserver-se')) {
          multiAZCapable = true;
        }
        return [spec, license.versions, version.instanceClasses, multiAZCapable, instanceClass.availabilityZones];
      },
      getCost: function(priceMap, currency) {
        var dbInstanceType, deploy, engine, err, fee, formatedFee, license, p, priceObj, sufix, unit, _i, _len;
        if (!priceMap.database) {
          return null;
        }
        engine = this.engineType();
        if (engine === 'sqlserver') {
          sufix = this.get('engine').split('-')[1];
        }
        dbInstanceType = this.attributes.instanceClass.split('.');
        deploy = this.attributes.multiAz ? 'multiAZ' : 'standard';
        if (!engine || !deploy) {
          return null;
        }
        unit = priceMap.database.rds.unit;
        try {
          fee = priceMap.database.rds[engine][dbInstanceType[0]][dbInstanceType[1]][dbInstanceType[2]];
          license = null;
          if (this.attributes.license === 'license-included') {
            license = 'li';
          } else if (this.attributes.license === 'bring-your-own-license') {
            license = 'byol';
          }
          if (license === 'li' && engine === 'sqlserver') {
            license = license + '-' + sufix;
          }
          for (_i = 0, _len = fee.length; _i < _len; _i++) {
            p = fee[_i];
            if (p.deploy !== deploy) {
              continue;
            }
            if (license && license !== p.license) {
              continue;
            }
            fee = p[currency];
            break;
          }
          if (!fee || typeof fee !== 'number') {
            return null;
          }
          if (unit === "pricePerHour") {
            formatedFee = fee + "/hr";
            fee *= 24 * 30;
          } else {
            formatedFee = fee + "/mo";
          }
          priceObj = {
            resource: this.attributes.name,
            type: this.attributes.instanceClass,
            fee: fee,
            formatedFee: formatedFee
          };
          return priceObj;
        } catch (_error) {
          err = _error;
        } finally {

        }
      },
      category: function(type) {
        switch (type) {
          case 'instance':
            return !(this.get('snapshotId') || this.master());
          case 'replica':
            return !!this.master();
          case 'snapshot':
            return !!this.get('snapshotId');
        }
        if (this.get('snapshotId')) {
          return 'snapshot';
        }
        if (this.master()) {
          return 'replica';
        } else {
          return 'instance';
        }
      },
      getSnapshotModel: function(snapshotId) {
        return CloudResources(this.design().credentialId(), constant.RESTYPE.DBSNAP, this.design().region()).findWhere({
          id: snapshotId || this.get('snapshotId')
        });
      },
      autobackup: function(value) {
        if (value !== void 0) {
          this.set('backupRetentionPeriod', value);
          return;
        }
        return this.get('backupRetentionPeriod') || 0;
      },
      getNewName: function() {
        var args;
        args = [].slice.call(arguments, 0);
        args[0] = Model.getInstances().length;
        return ComplexResModel.prototype.getNewName.apply(this, args);
      },
      isRemovable: function() {
        var allRestoreDB, dbNameAry, result;
        if (this.slaves(true).length > 0) {
          if (!this.get("appId")) {
            result = sprintf(lang.CANVAS.CVS_CFM_DEL_NONEXISTENT_DBINSTANCE, this.get("name"));
            result = "<div class='modal-text-major'>" + result + "</div>";
          } else {
            result = sprintf(lang.CANVAS.CVS_CFM_DEL_EXISTENT_DBINSTANCE, this.get("name"));
            result = "<div class='modal-text-major'>" + result + "</div>";
          }
          return result;
        }
        allRestoreDB = this.getAllRestoreDB();
        if (allRestoreDB.length > 0) {
          dbNameAry = [];
          _.each(allRestoreDB, function(dbModel) {
            return dbNameAry.push("<span class='resource-tag'>" + (dbModel.get('name')) + "</span>");
          });
          result = sprintf(lang.CANVAS.CVS_CFM_DEL_RELATED_RESTORE_DBINSTANCE, this.get("name"), dbNameAry.join(', '));
          result = "<div class='modal-text-major'>" + result + "</div>";
          return result;
        }
        return true;
      },
      remove: function() {
        var restore, slave, _i, _j, _len, _len1, _ref, _ref1;
        _ref = this.slaves();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          slave = _ref[_i];
          if (!slave.get("appId")) {
            if (slave !== this) {
              slave.remove();
            }
          }
        }
        _ref1 = this.getAllRestoreDB();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          restore = _ref1[_j];
          restore.remove();
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      isReparentable: function(newParent) {
        if (this.master() && newParent.get("id") !== this.get("id")) {
          notification("error", "Cannot move read replica to another DBSubnetGroup.");
          return false;
        }
        return true;
      },
      serialize: function() {
        var component, master, restoreTime, useLatestRestorableTime, _ref, _ref1;
        master = this.master();
        useLatestRestorableTime = '';
        if (this.getSourceDBForRestore()) {
          useLatestRestorableTime = this.get('dbRestoreTime') ? false : true;
        }
        restoreTime = '';
        if (this.get('dbRestoreTime')) {
          restoreTime = this.get('dbRestoreTime');
        }
        component = {
          name: this.get("name"),
          description: this.get("description") || "",
          type: this.type,
          uid: this.id,
          resource: {
            CreatedBy: this.get('createdBy'),
            DBInstanceIdentifier: this.get('instanceId'),
            NewDBInstanceIdentifier: this.get('newInstanceId'),
            DBSnapshotIdentifier: this.get('snapshotId'),
            AllocatedStorage: this.get('allocatedStorage'),
            AutoMinorVersionUpgrade: this.get('autoMinorVersionUpgrade'),
            AllowMajorVersionUpgrade: this.get('allowMajorVersionUpgrade'),
            AvailabilityZone: this.get('az'),
            MultiAZ: this.get('multiAz'),
            Iops: this.getIops() || 0,
            BackupRetentionPeriod: this.get('backupRetentionPeriod'),
            CharacterSetName: this.get('characterSetName'),
            DBInstanceClass: this.get('instanceClass'),
            DBName: this.isMysql() && this.get('snapshotId') ? '' : this.get('dbName'),
            Endpoint: {
              Port: this.get('port')
            },
            Engine: this.get('engine'),
            EngineVersion: this.get('engineVersion'),
            LicenseModel: this.get('license'),
            MasterUsername: this.get('username'),
            MasterUserPassword: this.get('password'),
            OptionGroupMembership: {
              OptionGroupName: (_ref = this.connectionTargets('OgUsage')[0]) != null ? _ref.createRef('OptionGroupName' || "") : void 0
            },
            DBParameterGroups: {
              DBParameterGroupName: this.get('pgName')
            },
            ApplyImmediately: this.get('applyImmediately'),
            PendingModifiedValues: this.get('pending'),
            PreferredBackupWindow: this.get('backupWindow'),
            PreferredMaintenanceWindow: this.get('maintenanceWindow'),
            PubliclyAccessible: this.get('accessible'),
            DBSubnetGroup: {
              DBSubnetGroupName: this.parent().createRef('DBSubnetGroupName')
            },
            VpcSecurityGroupIds: _.map(this.connectionTargets("SgAsso"), function(sg) {
              return sg.createRef('GroupId');
            }),
            ReadReplicaSourceDBInstanceIdentifier: (master != null ? master.createRef('DBInstanceIdentifier') : void 0) || '',
            SourceDBInstanceIdentifierForPoint: ((_ref1 = this.getSourceDBForRestore()) != null ? _ref1.createRef('DBInstanceIdentifier') : void 0) || '',
            UseLatestRestorableTime: useLatestRestorableTime,
            RestoreTime: restoreTime,
            StorageType: this.get('storageType')
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.DBINSTANCE,
      oracleCharset: ["AL32UTF8", "JA16EUC", "JA16EUCTILDE", "JA16SJIS", "JA16SJISTILDE", "KO16MSWIN949", "TH8TISASCII", "VN8MSWIN1258", "ZHS16GBK", "ZHT16HKSCS", "ZHT16MSWIN950", "ZHT32EUC", "BLT8ISO8859P13", "BLT8MSWIN1257", "CL8ISO8859P5", "CL8MSWIN1251", "EE8ISO8859P2", "EL8ISO8859P7", "EL8MSWIN1253", "EE8MSWIN1250", "NE8ISO8859P10", "NEE8ISO8859P4", "WE8ISO8859P15", "WE8MSWIN1252", "AR8ISO8859P6", "AR8MSWIN1256", "IW8ISO8859P8", "IW8MSWIN1255", "TR8MSWIN1254", "WE8ISO8859P9", "US7ASCII", "UTF8", "WE8ISO8859P1"],
      getInstances: function() {
        return this.reject(function(obj) {
          return obj.master() || obj.get('snapshotId');
        });
      },
      getReplicas: function() {
        return this.filter(function(obj) {
          return !!obj.master();
        });
      },
      getSnapShots: function() {
        return this.filter(function(obj) {
          return !!obj.get('snapshotId');
        });
      },
      getDefaultOgInstance: function(name) {
        return DBOgModel.findWhere({
          name: name,
          "default": true
        }) || new DBOgModel({
          name: name,
          "default": true
        });
      },
      deserialize: function(data, layout_data, resolve) {
        var SgAsso, model, ogComp, ogName, ogUid, resource, sg, storageType, that, _i, _len, _ref, _ref1, _ref2, _ref3;
        that = this;
        resource = data.resource;
        storageType = resource.StorageType;
        if (!storageType) {
          if (resource.Iops && Number(resource.Iops) > 0) {
            storageType = 'io1';
          } else {
            storageType = 'standard';
          }
        }
        model = new Model({
          id: data.uid,
          name: data.name,
          description: data.description || "",
          createdBy: resource.CreatedBy,
          appId: resource.DBInstanceIdentifier,
          instanceId: resource.DBInstanceIdentifier,
          newInstanceId: resource.NewDBInstanceIdentifier,
          snapshotId: resource.DBSnapshotIdentifier,
          allocatedStorage: resource.AllocatedStorage,
          autoMinorVersionUpgrade: resource.AutoMinorVersionUpgrade,
          allowMajorVersionUpgrade: resource.AllowMajorVersionUpgrade,
          az: resource.AvailabilityZone,
          multiAz: resource.MultiAZ,
          iops: resource.Iops,
          backupRetentionPeriod: resource.BackupRetentionPeriod,
          characterSetName: resource.CharacterSetName,
          dbName: resource.DBName,
          port: (_ref = resource.Endpoint) != null ? _ref.Port : void 0,
          engine: resource.Engine,
          license: resource.LicenseModel,
          engineVersion: resource.EngineVersion,
          instanceClass: resource.DBInstanceClass,
          username: resource.MasterUsername,
          password: resource.MasterUserPassword,
          pending: resource.PendingModifiedValues,
          backupWindow: resource.PreferredBackupWindow,
          maintenanceWindow: resource.PreferredMaintenanceWindow,
          accessible: resource.PubliclyAccessible,
          pgName: (_ref1 = resource.DBParameterGroups) != null ? _ref1.DBParameterGroupName : void 0,
          applyImmediately: resource.ApplyImmediately,
          storageType: storageType,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          parent: resolve(layout_data.groupUId)
        });
        if (data.resource.ReadReplicaSourceDBInstanceIdentifier) {
          model.setMaster(resolve(MC.extractID(data.resource.ReadReplicaSourceDBInstanceIdentifier)));
        }
        SgAsso = Design.modelClassForType("SgAsso");
        _ref2 = data.resource.VpcSecurityGroupIds || [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          sg = _ref2[_i];
          new SgAsso(model, resolve(MC.extractID(sg)));
        }
        ogName = (_ref3 = data.resource.OptionGroupMembership) != null ? _ref3.OptionGroupName : void 0;
        if (ogName) {
          ogUid = MC.extractID(ogName);
          if (ogUid && ogUid !== ogName) {
            ogComp = resolve(ogUid);
          }
          return new OgUsage(model, ogComp || model.getDefaultOgInstance(ogName));
        }
      }
    });
    return Model;
  });

}).call(this);
