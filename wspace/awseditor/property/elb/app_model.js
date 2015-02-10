(function() {
  define(['../base/model', 'constant', 'Design', "CloudResources"], function(PropertyModel, constant, Design, CloudResources) {
    var ElbAppModel;
    ElbAppModel = PropertyModel.extend({
      defaults: {
        'id': null
      },
      init: function(uid) {
        var elb, elbDistrMap, instanceStateObj, myElbComponent, port, splitIndex, target, _ref;
        this.set('id', uid);
        this.set('uid', uid);
        myElbComponent = Design.instance().component(uid);
        elb = CloudResources(Design.instance().credentialId(), constant.RESTYPE.ELB, Design.instance().region()).get(myElbComponent.get("appId"));
        if (!elb) {
          return false;
        }
        elb = elb.toJSON();
        elb.description = myElbComponent.get("description");
        elb.name = myElbComponent.get("name");
        if (elb.ConnectionDraining) {
          if (elb.ConnectionDraining.Enabled) {
            elb.ConnectionDrainingInfo = "Enabled; Timeout: " + elb.ConnectionDraining.Timeout + " seconds";
          } else {
            elb.ConnectionDrainingInfo = 'Disabled';
          }
        } else {
          elb.ConnectionDrainingInfo = 'Disabled';
        }
        elb.IdleTimeout = (_ref = elb.ConnectionSettings) != null ? _ref.IdleTimeout : void 0;
        elb.name = myElbComponent.get('name');
        elb.isInternet = elb.Scheme === 'internet-facing';
        target = elb.HealthCheck.Target;
        splitIndex = target.indexOf(":");
        elb.HealthCheck.protocol = target.substring(0, splitIndex);
        target = target.substring(splitIndex + 1);
        port = parseInt(target, 10);
        if (isNaN(port)) {
          port = 80;
        }
        elb.HealthCheck.port = port;
        elb.HealthCheck.path = target.replace(/[^\/]+\//, "/");
        elb.CrossZone = myElbComponent.get('crossZone') ? "Enabled" : "Disabled";
        elb.listenerDisplay = [];
        if (elb.ListenerDescriptions) {
          $.each(elb.ListenerDescriptions, function(i, listener) {
            elb.listenerDisplay.push(listener);
            if (listener.Listener.SSLCertificateId) {
              listener.Listener.server_certificate = listener.Listener.SSLCertificateId.split('/')[1];
              return null;
            }
          });
        }
        elb.isClassic = false;
        elb.defaultVPC = false;
        elb.distribution = [];
        elbDistrMap = {};
        instanceStateObj = elb.InstanceStates;
        _.each(instanceStateObj, function(stateObj) {
          var err, instanceComp, instanceCompObj, instanceId, instanceModel, instanceName, instanceState, instanceStateCode, instanceStateDescription, instanceUID, regionComp, regionName, showStateObj;
          try {
            instanceId = stateObj.InstanceId;
            instanceStateCode = stateObj.ReasonCode;
            instanceState = stateObj.State;
            instanceStateDescription = stateObj.Description;
            instanceCompObj = Design.modelClassForType(constant.RESTYPE.INSTANCE).getEffectiveId(instanceId);
            instanceUID = instanceCompObj.uid;
            instanceComp = Design.instance().component(instanceUID);
            regionName = '';
            if (instanceComp) {
              instanceName = instanceComp.get('name');
              if (instanceName === instanceId) {
                instanceName = null;
              }
              showStateObj = {
                instance_name: instanceName,
                instance_id: instanceId,
                instance_state: instanceState === 'InService',
                instance_state_desc: instanceStateDescription
              };
              regionComp = null;
              if (instanceComp.parent() && instanceComp.parent().parent()) {
                regionComp = instanceComp.parent().parent();
                if (instanceComp.type === constant.RESTYPE.LC) {
                  regionComp = instanceComp.parent().parent().parent();
                }
              }
              if (regionComp) {
                regionName = regionComp.get('name');
              }
            }
            if (!regionName) {
              instanceModel = CloudResources(Design.instance().credentialId(), constant.RESTYPE.INSTANCE, Design.instance().region()).get(instanceId);
              if (instanceModel) {
                if (instanceModel.get('placement')) {
                  regionName = instanceModel.get('placement').availabilityZone;
                }
              }
            }
            elbDistrMap[regionName] = elbDistrMap[regionName] || [];
            return elbDistrMap[regionName].push(showStateObj);
          } catch (_error) {
            err = _error;
            return console.log('Error: ELB Instance State Parse Failed');
          }
        });
        _.each(elbDistrMap, function(instanceAry, azName) {
          var isHealth;
          isHealth = true;
          _.each(instanceAry, function(instanceObj) {
            if (!instanceObj.instance_state) {
              isHealth = false;
            }
            return null;
          });
          return elb.distribution.push({
            zone: azName,
            instance: instanceAry,
            health: isHealth
          });
        });
        elb.distribution = elb.distribution.sort(function(azObj1, azObj2) {
          return azObj1.zone > azObj2.zone;
        });
        this.set(elb);
        return this.set("componentUid", myElbComponent.id);
      }
    });
    return new ElbAppModel();
  });

}).call(this);
