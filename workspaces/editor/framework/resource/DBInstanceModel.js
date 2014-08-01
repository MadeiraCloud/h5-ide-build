(function() {
  define(['../ComplexResModel', '../ConnectionModel', './DBOgModel', 'Design', 'constant', 'i18n!/nls/lang.js', 'CloudResources'], function(ComplexResModel, ConnectionModel, DBOgModel, Design, constant, lang, CloudResources) {
    var EnginTypeMap, Model, OgUsage, versionCompare;
    EnginTypeMap = {
      'oracle-ee': "oracle",
      'oracle-se': "oracle",
      'oracle-se1': "oracle",
      'sqlserver-ee': "sqlserver",
      'sqlserver-ex': "sqlserver",
      'sqlserver-se': "sqlserver",
      'sqlserver-web': "sqlserver"
    };
    versionCompare = function(left, right) {
      var a, b, i, len;
      if (typeof left + typeof right !== "stringstring") {
        return false;
      }
      a = left.split(".");
      b = right.split(".");
      i = 0;
      len = Math.max(a.length, b.length);
      while (i < len) {
        if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
          return 1;
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
          return -1;
        }
        i++;
      }
      return 0;
    };
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
        iops: '',
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
        applyImmediately: false
      },
      type: constant.RESTYPE.DBINSTANCE,
      newNameTmpl: "db",
      __cachedSpecifications: null,
      slaves: function() {
        if (this.master()) {
          return [];
        } else {
          return this.connectionTargets("DbReplication");
        }
      },
      master: function() {
        var m;
        m = this.connections("DbReplication")[0];
        if (m && m.master() !== this) {
          return m.master();
        }
        return null;
      },
      setMaster: function(master) {
        var Replication, _ref;
        if ((_ref = this.connections("DbReplication")[0]) != null) {
          _ref.remove();
        }
        Replication = Design.modelClassForType("DbReplication");
        new Replication(master, this);
      },
      source: function() {
        return CloudResources(constant.RESTYPE.DBSNAP, this.design().region()).get(this.get('snapshotId'));
      },
      connect: function(cnn) {
        var SgAsso, sg, slave, _i, _len, _ref;
        if (this.master()) {
          return;
        }
        if (cnn.type !== "SgAsso") {
          return;
        }
        SgAsso = Design.modelClassForType("SgAsso");
        sg = cnn.getOtherTarget(this);
        _ref = this.slaves();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          slave = _ref[_i];
          new SgAsso(slave, sg);
        }
      },
      disconnect: function(cnn) {
        var asso, sg, slave, _i, _j, _len, _len1, _ref, _ref1;
        if (this.master()) {
          return;
        }
        if (cnn.type !== "SgAsso") {
          return;
        }
        sg = cnn.getOtherTarget(this);
        _ref = this.slaves();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          slave = _ref[_i];
          _ref1 = slave.connections("SgAsso");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            asso = _ref1[_j];
            if (asso.getOtherTarget(slave) === sg) {
              asso.remove();
              break;
            }
          }
        }
      },
      initialize: function(attr, option) {
        var SgAsso, defaultSg;
        option = option || {};
        if (option.cloneSource) {
          this.clone(option.cloneSource);
          return;
        }
        if (option.master) {
          this.setMaster(option.master);
          this.clone(option.master);
        } else if (option.createByUser) {
          SgAsso = Design.modelClassForType("SgAsso");
          defaultSg = Design.modelClassForType(constant.RESTYPE.SG).getDefaultSg();
          new SgAsso(defaultSg, this);
          this.set({
            license: this.getDefaultLicense(),
            engineVersion: this.getDefaultVersion(),
            instanceClass: this.getDefaultInstanceClass(),
            port: this.getDefaultPort(),
            dbName: this.getDefaultDBName(),
            characterSetName: this.getDefaultCharSet(),
            allocatedStorage: attr.allocatedStorage || this.getDefaultAllocatedStorage(),
            snapshotId: attr.snapshotId || ""
          });
          this.setDefaultOptionGroup();
          this.setDefaultParameterGroup();
        }
      },
      clone: function(srcTarget) {
        this.cloneAttributes(srcTarget, {
          reserve: "newInstanceId|instanceId",
          copyConnection: ["SgAsso", "OgUsage"]
        });
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
        return EnginTypeMap[engine] || engine;
      },
      setDefaultOptionGroup: function(origEngineVersion) {
        var defaultInfo, defaultOG, engineCol, origDefaultInfo, regionName;
        regionName = Design.instance().region();
        engineCol = CloudResources(constant.RESTYPE.DBENGINE, regionName);
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
        var defaultInfo, defaultPG, engineCol, origDefaultInfo, regionName;
        regionName = Design.instance().region();
        engineCol = CloudResources(constant.RESTYPE.DBENGINE, regionName);
        defaultInfo = engineCol.getDefaultByNameVersion(regionName, this.get('engine'), this.get('engineVersion'));
        if (origEngineVersion) {
          origDefaultInfo = engineCol.getDefaultByNameVersion(regionName, this.get('engine'), origEngineVersion);
        }
        if (origDefaultInfo && origDefaultInfo.family && defaultInfo && defaultInfo.family) {
          if (origDefaultInfo.family === defaultInfo.family) {
            return null;
          }
        }
        if (defaultInfo && defaultInfo.defaultPGName) {
          defaultPG = defaultInfo.defaultPGName;
        } else {
          defaultPG = "default." + this.get('engine') + this.getMajorVersion();
          console.warn("can not get default parametergroup for " + (this.get('engine')) + " " + (this.getMajorVersion()));
        }
        this.set('pgName', defaultPG || "");
        return null;
      },
      setIops: function(iops) {
        return this.set('iops', iops);
      },
      getIops: function() {
        return this.get('iops');
      },
      defaultMap: {
        'mysql': {
          port: 3306,
          dbname: '',
          charset: '',
          allocatedStorage: 5
        },
        'postgres': {
          port: 5432,
          dbname: '',
          charset: '',
          allocatedStorage: 5
        },
        'oracle-ee': {
          port: 1521,
          dbname: 'ORCL',
          charset: 'AL32UTF8',
          allocatedStorage: 10
        },
        'oracle-se': {
          port: 1521,
          dbname: 'ORCL',
          charset: 'AL32UTF8',
          allocatedStorage: 10
        },
        'oracle-se1': {
          port: 1521,
          dbname: 'ORCL',
          charset: 'AL32UTF8',
          allocatedStorage: 10
        },
        'sqlserver-ee': {
          port: 1433,
          dbname: '',
          charset: '',
          allocatedStorage: 200
        },
        'sqlserver-ex': {
          port: 1433,
          dbname: '',
          charset: '',
          allocatedStorage: 30
        },
        'sqlserver-se': {
          port: 1433,
          dbname: '',
          charset: '',
          allocatedStorage: 200
        },
        'sqlserver-web': {
          port: 1433,
          dbname: '',
          charset: '',
          allocatedStorage: 30
        }
      },
      getNewName: function() {
        var args;
        args = [].slice.call(arguments, 0);
        args[0] = Model.getInstances().length;
        return ComplexResModel.prototype.getNewName.apply(this, args);
      },
      isRemovable: function() {
        if (this.slaves().length > 0) {
          return sprintf(lang.ide.CVS_CFM_DEL_DBINSTANCE, this.get("name"));
        }
        return true;
      },
      remove: function() {
        var slave, _i, _len, _ref;
        _ref = this.slaves();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          slave = _ref[_i];
          slave.remove();
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      getRdsInstances: function() {
        var _ref;
        return (_ref = App.model.getRdsData(this.design().region())) != null ? _ref.instance[this.get('engine')] : void 0;
      },
      getDefaultPort: function() {
        return this.defaultMap[this.get('engine')].port;
      },
      getDefaultDBName: function() {
        return this.defaultMap[this.get('engine')].dbname;
      },
      getDefaultCharSet: function() {
        return this.defaultMap[this.get('engine')].charset;
      },
      getDefaultAllocatedStorage: function() {
        return this.defaultMap[this.get('engine')].allocatedStorage;
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
      getLVIA: function(spec) {
        var currentClass, currentLicense, currentVersion, instanceClass, license, version, _ref, _ref1;
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
        if (!instanceClass.multiAZCapable) {
          this.set('multiAz', false);
        }
        return [spec, license.versions, version.instanceClasses, instanceClass.multiAZCapable, instanceClass.availabilityZones];
      },
      getSpecifications: function() {
        var az, cla, classes, i, instances, lObj, license, spec, specArr, that, vObj, version, versions, _i, _len;
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
            for (cla in classes) {
              az = classes[cla];
              vObj.instanceClasses.push({
                instanceClass: cla,
                multiAZCapable: az.multiAZCapable,
                availabilityZones: az.availabilityZones
              });
            }
            vObj.instanceClasses = _.sortBy(vObj.instanceClasses, function(cla) {
              return Model.instanceClassList.indexOf(cla.instanceClass);
            });
            lObj.versions.push(vObj);
          }
          lObj.versions.sort(function(a, b) {
            return versionCompare(b.version, a.version);
          });
          specArr.push(lObj);
        }
        this.__cachedSpecifications = specArr;
        return specArr;
      },
      getCost: function(priceMap, currency) {
        var dbInstanceType, deploy, engine, err, fee, formatedFee, license, p, priceObj, sufix, unit, _i, _len;
        if (!priceMap.database) {
          return null;
        }
        engine = this.engineType();
        if (engine === 'sqlserver') {
          sufix = engine.split('-')[1];
        }
        dbInstanceType = this.attributes.instanceClass.split('.');
        deploy = this.attributes.multiAZ ? 'multiAZ' : 'standard';
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
            license = license + sufix;
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
      getSnapshotModel: function() {
        var regionName, snapshotCol, snapshotModel;
        if (this.category() === 'snapshot') {
          regionName = Design.instance().region();
          snapshotCol = CloudResources(constant.RESTYPE.DBSNAP, regionName);
          snapshotModel = snapshotCol.findWhere({
            id: this.get('snapshotId')
          });
          return snapshotModel;
        } else {
          return null;
        }
      },
      autobackup: function(value) {
        if (value !== void 0) {
          this.set('backupRetentionPeriod', value);
          return;
        }
        return this.get('backupRetentionPeriod') || 0;
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
      getOptionGroup: function() {
        return this.connectionTargets('OgUsage')[0];
      },
      getOptionGroupName: function() {
        var _ref;
        return (_ref = this.getOptionGroup()) != null ? _ref.get('name') : void 0;
      },
      serialize: function() {
        var component, master, _ref;
        master = this.master();
        if (master && !this.get("appId")) {
          component = master.serialize().component;
          component.name = this.get("name");
          component.uid = this.id;
          $.extend(component.resource, {
            DBInstanceClass: this.get("instanceClass"),
            AutoMinorVersionUpgrade: this.get("autoMinorVersionUpgrade"),
            PubliclyAccessible: this.get("accessible"),
            BackupRetentionPeriod: 0,
            MultiAZ: false,
            ReadReplicaSourceDBInstanceIdentifier: master.createRef('DBInstanceIdentifier')
          });
        } else {
          component = {
            name: this.get("name"),
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
              Iops: this.getIops(),
              BackupRetentionPeriod: this.get('backupRetentionPeriod'),
              CharacterSetName: this.get('characterSetName'),
              DBInstanceClass: this.get('instanceClass'),
              DBName: this.get('dbName'),
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
              })
            }
          };
        }
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.DBINSTANCE,
      instanceClassList: ["db.t1.micro", "db.m1.small", "db.m1.medium", "db.m1.large", "db.m1.xlarge", "db.m2.xlarge", "db.m2.2xlarge", "db.m2.4xlarge", "db.cr1.8xlarge", "db.m3.medium", "db.m3.large", "db.m3.xlarge", "db.m3.2xlarge", "db.r3.large", "db.r3.xlarge", "db.r3.2xlarge", "db.r3.4xlarge", "db.r3.8xlarge"],
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
        var SgAsso, model, ogComp, ogName, sg, that, _i, _len, _ref, _ref1, _ref2, _ref3;
        that = this;
        model = new Model({
          id: data.uid,
          name: data.name,
          createdBy: data.resource.CreatedBy,
          appId: data.resource.DBInstanceIdentifier,
          instanceId: data.resource.DBInstanceIdentifier,
          newInstanceId: data.resource.NewDBInstanceIdentifier,
          snapshotId: data.resource.DBSnapshotIdentifier,
          allocatedStorage: data.resource.AllocatedStorage,
          autoMinorVersionUpgrade: data.resource.AutoMinorVersionUpgrade,
          allowMajorVersionUpgrade: data.resource.AllowMajorVersionUpgrade,
          az: data.resource.AvailabilityZone,
          multiAz: data.resource.MultiAZ,
          iops: data.resource.Iops,
          backupRetentionPeriod: data.resource.BackupRetentionPeriod,
          characterSetName: data.resource.CharacterSetName,
          dbName: data.resource.DBName,
          port: (_ref = data.resource.Endpoint) != null ? _ref.Port : void 0,
          engine: data.resource.Engine,
          license: data.resource.LicenseModel,
          engineVersion: data.resource.EngineVersion,
          instanceClass: data.resource.DBInstanceClass,
          username: data.resource.MasterUsername,
          password: data.resource.MasterUserPassword,
          pending: data.resource.PendingModifiedValues,
          backupWindow: data.resource.PreferredBackupWindow,
          maintenanceWindow: data.resource.PreferredMaintenanceWindow,
          accessible: data.resource.PubliclyAccessible,
          pgName: (_ref1 = data.resource.DBParameterGroups) != null ? _ref1.DBParameterGroupName : void 0,
          applyImmediately: data.resource.ApplyImmediately,
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
          ogComp = resolve(MC.extractID(ogName));
          return new OgUsage(model, ogComp || model.getDefaultOgInstance(ogName));
        }
      }
    });
    return Model;
  });

}).call(this);
