(function() {
  define(['../base/model', "Design", 'constant', 'sslcert_dropdown', "CloudResources"], function(PropertyModel, Design, constant, SSLCertDropdown, CloudResources) {
    var ElbModel;
    ElbModel = PropertyModel.extend({
      init: function(uid) {
        var allCertModelAry, attr, component, currentSSLCert, i, pingArr, _i, _len, _ref, _ref1;
        component = Design.instance().component(uid);
        this.getAppData(uid);
        attr = component != null ? component.toJSON() : void 0;
        attr.uid = uid;
        attr.isVpc = true;
        attr.description = component != null ? component.get("description") : void 0;
        pingArr = component.getHealthCheckTarget();
        attr.pingProtocol = pingArr[0];
        attr.pingPort = pingArr[1];
        attr.pingPath = pingArr[2];
        if (attr.sslCert) {
          attr.sslCert = (_ref = attr.sslCert) != null ? _ref.toJSON() : void 0;
        }
        _ref1 = attr.listeners;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          i = _ref1[_i];
          if (i.protocol === "SSL" || i.protocol === "HTTPS") {
            attr.showCert = true;
            break;
          }
        }
        currentSSLCert = component.connectionTargets("SslCertUsage")[0];
        allCertModelAry = Design.modelClassForType(constant.RESTYPE.IAM).allObjects();
        attr.noSSLCert = true;
        attr.sslCertItem = _.map(allCertModelAry, function(sslCertModel) {
          var disableCertEdit;
          if (currentSSLCert === sslCertModel) {
            attr.noSSLCert = false;
          }
          disableCertEdit = false;
          if (sslCertModel.get('certId') && sslCertModel.get('arn')) {
            disableCertEdit = true;
          }
          return {
            uid: sslCertModel.id,
            name: sslCertModel.get('name'),
            selected: currentSSLCert === sslCertModel,
            disableCertEdit: disableCertEdit
          };
        });
        if (attr.ConnectionDraining) {
          if (attr.ConnectionDraining.Enabled === true) {
            attr.connectionDrainingEnabled = true;
            attr.connectionDrainingTimeout = attr.ConnectionDraining.Timeout;
          } else {
            attr.connectionDrainingEnabled = false;
          }
        }
        this.set(attr);
        return null;
      },
      getAppData: function(uid) {
        var elb, myElbComponent;
        uid = uid || this.get("uid");
        myElbComponent = Design.instance().component(uid);
        elb = CloudResources(Design.instance().credentialId(), constant.RESTYPE.ELB, Design.instance().region()).get(myElbComponent.get('appId'));
        if (!elb) {
          return;
        }
        elb = elb.attributes;
        this.set({
          appData: true,
          isInternet: elb.Scheme === 'internet-facing',
          DNSName: elb.Dnsname,
          CanonicalHostedZoneNameID: elb.CanonicalHostedZoneNameID
        });
        return null;
      },
      setScheme: function(value) {
        value = value === "internal";
        Design.instance().component(this.get("uid")).setInternal(value);
        if (!value) {
          Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
        return null;
      },
      setElbCrossAZ: function(value) {
        Design.instance().component(this.get("uid")).set("crossZone", !!value);
        return null;
      },
      setHealthProtocol: function(value) {
        Design.instance().component(this.get("uid")).setHealthCheckTarget(value);
        return null;
      },
      setHealthPort: function(value) {
        Design.instance().component(this.get("uid")).setHealthCheckTarget(void 0, value);
        return null;
      },
      setHealthPath: function(value) {
        Design.instance().component(this.get("uid")).setHealthCheckTarget(void 0, void 0, value);
        return null;
      },
      setHealthInterval: function(value) {
        Design.instance().component(this.get("uid")).set("healthCheckInterval", value);
        return null;
      },
      setHealthTimeout: function(value) {
        Design.instance().component(this.get("uid")).set("healthCheckTimeout", value);
        return null;
      },
      setHealthUnhealth: function(value) {
        Design.instance().component(this.get("uid")).set("unHealthyThreshold", value);
        return null;
      },
      setHealthHealth: function(value) {
        Design.instance().component(this.get("uid")).set("healthyThreshold", value);
        return null;
      },
      setListener: function(idx, value) {
        Design.instance().component(this.get("uid")).setListener(idx, value);
        return null;
      },
      removeListener: function(idx) {
        Design.instance().component(this.get("uid")).removeListener(idx);
        return null;
      },
      setCert: function(value) {
        Design.instance().component(this.get("uid")).connectionTargets("SslCertUsage")[0].set(value);
        return null;
      },
      addCert: function(value) {
        var SslCertModel;
        SslCertModel = Design.modelClassForType(constant.RESTYPE.IAM);
        (new SslCertModel(value)).assignTo(Design.instance().component(this.get("uid")));
        return null;
      },
      removeCert: function(value) {
        Design.instance().component(value).remove();
        return null;
      },
      updateElbAZ: function(azArray) {
        Design.instance().component(this.get("uid")).set("AvailabilityZones", azArray);
        return null;
      },
      changeCert: function(certUID) {
        var cn, design, _i, _len, _ref;
        design = Design.instance();
        if (certUID) {
          design.component(certUID).assignTo(design.component(this.get("uid")));
        } else {
          _ref = design.component(this.get("uid")).connections("SslCertUsage");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cn = _ref[_i];
            cn.remove();
          }
        }
        return null;
      },
      updateCert: function(certUID, certObj) {
        Design.instance().component(certUID).updateValue(certObj);
        return null;
      },
      getOtherCertName: function(currentName) {
        var allCertModelAry, otherCertNameAry;
        allCertModelAry = Design.modelClassForType(constant.RESTYPE.IAM).allObjects();
        otherCertNameAry = [];
        _.each(allCertModelAry, function(sslCertModel) {
          var sslCertName;
          sslCertName = sslCertModel.get('name');
          if (currentName !== sslCertName) {
            return otherCertNameAry.push(sslCertName);
          }
        });
        return otherCertNameAry;
      },
      setConnectionDraining: function(enabled, timeout) {
        var elbModel;
        if (!enabled) {
          timeout = null;
        }
        elbModel = Design.instance().component(this.get("uid"));
        return elbModel.set('ConnectionDraining', {
          Enabled: enabled,
          Timeout: timeout
        });
      },
      setAdvancedProxyProtocol: function(enable, portAry) {
        var elbModel;
        elbModel = Design.instance().component(this.get("uid"));
        return elbModel.setPolicyProxyProtocol(enable, portAry);
      },
      initNewSSLCertDropDown: function(idx, $listenerItem) {
        var elbModel, sslCertDropDown, sslCertModel, that;
        that = this;
        elbModel = Design.instance().component(this.get("uid"));
        sslCertDropDown = new SSLCertDropdown();
        sslCertDropDown.uid = this.get('uid');
        sslCertDropDown.listenerNum = idx;
        sslCertModel = elbModel.getSSLCert(idx);
        if (sslCertModel) {
          sslCertDropDown.sslCertName = sslCertModel.get('name');
        }
        return sslCertDropDown;
      },
      setIdletimeout: function(value) {
        var elbModel;
        elbModel = Design.instance().component(this.get("uid"));
        return elbModel.set('idleTimeout', value);
      }
    });
    return new ElbModel();
  });

}).call(this);
