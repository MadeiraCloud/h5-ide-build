(function() {
  define(["Design", "constant", "ResourceModel", "ComplexResModel", "./SgModel", "./SslCertModel", "./connection/SgAsso", "i18n!/nls/lang.js", "CloudResources", "./connection/ElbAsso"], function(Design, constant, ResourceModel, ComplexResModel, SgModel, SslCertModel, SgAsso, lang, CloudResources) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: function() {
        return {
          internal: true,
          crossZone: true,
          healthyThreshold: "9",
          unHealthyThreshold: "4",
          healthCheckTarget: "HTTP:80/index.html",
          healthCheckInterval: "30",
          healthCheckTimeout: "5",
          listeners: [
            {
              port: "80",
              protocol: "HTTP",
              instanceProtocol: "HTTP",
              instancePort: "80",
              sslCertName: null
            }
          ],
          AvailabilityZones: [],
          ConnectionDraining: {
            Enabled: true,
            Timeout: 300
          },
          idleTimeout: 60,
          otherPoliciesMap: {}
        };
      },
      type: constant.RESTYPE.ELB,
      newNameTmpl: "load-balancer-",
      initialize: function(attr, option) {
        var SgAssoModel, sg;
        if (option.createByUser) {
          sg = new SgModel({
            name: this.getElbSgName(),
            isElbSg: true,
            description: lang.IDE.AUTOMATICALLY_CREATED_SG_FOR_LOAD_BALANCER
          });
          this.__elbSg = sg;
          SgAssoModel = Design.modelClassForType("SgAsso");
          new SgAssoModel(this, sg);
        }
        return null;
      },
      isRemovable: function() {
        var elbsg;
        elbsg = this.getElbSg();
        if (elbsg && elbsg.connections("SgAsso").length > 1) {
          return MC.template.ElbRemoveConfirmation({
            name: this.get("name"),
            sg: elbsg.get("name")
          });
        }
        return true;
      },
      remove: function() {
        if (this.getElbSg()) {
          this.getElbSg().remove();
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      getElbSg: function() {
        if (this.__elbSg) {
          if (this.__elbSg.isRemoved()) {
            this.__elbSg = void 0;
          }
        }
        return this.__elbSg;
      },
      getElbSgName: function() {
        return "elbsg-" + this.get("name");
      },
      setName: function(name) {
        if (this.get("name") === name) {
          return;
        }
        this.set("name", name);
        if (this.getElbSg()) {
          this.getElbSg().set("name", this.getElbSgName());
        }
        return null;
      },
      setListener: function(idx, value) {
        var listeners, _ref;
        console.assert(value.port && value.protocol && value.instanceProtocol && value.instancePort, "Invalid parameter for setListener");
        listeners = this.get("listeners");
        if (idx >= listeners.length) {
          listeners.push(value);
        } else {
          if (!listeners[idx]) {
            listeners[idx] = {};
          }
          listeners[idx] = $.extend(listeners[idx], value);
        }
        if (!((_ref = listeners[idx].protocol) === 'HTTPS' || _ref === 'SSL')) {
          listeners[idx].sslCert = null;
        }
        return null;
      },
      removeListener: function(idx) {
        var listeners;
        listeners = this.get("listeners");
        listeners.splice(idx, 1);
        this.set("listeners", listeners);
        return null;
      },
      setSSLCert: function(idx, sslCertId) {
        var listeners, sslCertCol, sslCertData;
        if (idx >= 0) {
          sslCertCol = CloudResources(this.design().credentialId(), constant.RESTYPE.IAM, this.design().region());
          listeners = this.get("listeners");
          sslCertData = sslCertCol.get(sslCertId);
          return listeners[idx].sslCert = SslCertModel.createNew(sslCertData);
        }
      },
      removeSSLCert: function(idx) {
        var listeners;
        listeners = this.get("listeners");
        listeners[idx].sslCert = null;
        return null;
      },
      getSSLCert: function(idx) {
        var listeners;
        listeners = this.get("listeners");
        return listeners[idx].sslCert;
      },
      getHealthCheckTarget: function() {
        var path, port, protocol, splitIndex, target;
        target = this.attributes.healthCheckTarget;
        splitIndex = target.indexOf(":");
        protocol = target.substring(0, splitIndex);
        target = target.substring(splitIndex + 1);
        port = parseInt(target, 10);
        if (isNaN(port)) {
          port = 80;
        }
        path = target.replace(/[^\/]+\//, "");
        return [protocol, port, path];
      },
      setHealthCheckTarget: function(protocol, port, path) {
        var target;
        target = this.getHealthCheckTarget();
        if (protocol) {
          target[0] = protocol;
        }
        if (port !== void 0) {
          target[1] = port;
        }
        if (path !== void 0) {
          target[2] = path;
        }
        this.set("healthCheckTarget", target[0] + ":" + target[1] + "/" + target[2]);
        return null;
      },
      setInternal: function(isInternal) {
        var line, _i, _len, _ref;
        this.set("internal", !!isInternal);
        if (isInternal) {
          SgModel = Design.modelClassForType(constant.RESTYPE.SG);
          SgModel.tryDrawLine(this);
        } else {
          _ref = this.connections("SgRuleLine");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            line = _ref[_i];
            line.remove(this);
          }
        }
        return null;
      },
      getCost: function(priceMap, currency) {
        var fee, p, _i, _len, _ref;
        if (!priceMap.elb || !priceMap.elb.types) {
          return null;
        }
        _ref = priceMap.elb.types;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          if (p.unit === "perELBHour") {
            fee = parseFloat(p[currency], 10) || 0;
            break;
          }
        }
        if (fee) {
          return {
            resource: this.get("name"),
            type: constant.RESTYPE.ELB,
            fee: fee * 24 * 30,
            formatedFee: fee + "/hr"
          };
        }
      },
      getAvailabilityZones: function() {
        var azs;
        azs = _.map(this.connectionTargets("ElbSubnetAsso"), function(subnet) {
          return subnet.parent().createRef();
        });
        return _.uniq(azs);
      },
      setPolicyProxyProtocol: function(enable, portAry) {
        var otherPoliciesMap;
        otherPoliciesMap = this.get('otherPoliciesMap');
        if (enable) {
          otherPoliciesMap.EnableProxyProtocol = {
            'PolicyName': 'EnableProxyProtocol',
            'PolicyTypeName': 'ProxyProtocolPolicyType',
            'PolicyAttributes': {
              'ProxyProtocol': true
            },
            'InstancePort': portAry
          };
        } else {
          delete otherPoliciesMap.EnableProxyProtocol;
        }
        return this.set('otherPoliciesMap', otherPoliciesMap);
      },
      serialize: function() {
        var component, hcTarget, id, l, listeners, otherPoliciesAry, otherPoliciesMap, sgs, subnets, _i, _len, _ref;
        hcTarget = this.get("healthCheckTarget");
        if (hcTarget.indexOf("TCP") !== -1 || hcTarget.indexOf("SSL") !== -1) {
          hcTarget = hcTarget.split("/")[0];
        }
        listeners = [];
        _ref = this.get("listeners");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          l = _ref[_i];
          id = "";
          if ((l.protocol === "SSL" || l.protocol === "HTTPS") && l.sslCert) {
            id = l.sslCert.createRef("ServerCertificateMetadata.Arn");
          }
          listeners.push({
            PolicyNames: "",
            Listener: {
              LoadBalancerPort: l.port,
              Protocol: l.protocol,
              InstanceProtocol: l.instanceProtocol,
              InstancePort: l.instancePort,
              SSLCertificateId: id
            }
          });
        }
        sgs = _.map(this.connectionTargets("SgAsso"), function(sg) {
          return sg.createRef("GroupId");
        });
        subnets = _.map(this.connectionTargets("ElbSubnetAsso"), function(sb) {
          return sb.createRef("SubnetId");
        });
        otherPoliciesMap = this.get('otherPoliciesMap');
        otherPoliciesAry = _.map(otherPoliciesMap, function(policyObj) {
          return policyObj;
        });
        if (!otherPoliciesAry) {
          otherPoliciesAry = [];
        }
        component = {
          type: this.type,
          uid: this.id,
          name: this.get("name"),
          description: this.get("description") || "",
          resource: {
            AvailabilityZones: [],
            Subnets: subnets,
            Instances: [],
            CrossZoneLoadBalancing: this.get("crossZone"),
            ConnectionDraining: this.get("ConnectionDraining"),
            VpcId: this.getVpcRef(),
            LoadBalancerName: this.get("elbName") || this.get("name"),
            SecurityGroups: sgs,
            Scheme: this.get("internal") ? "internal" : "internet-facing",
            ListenerDescriptions: listeners,
            HealthCheck: {
              Interval: String(this.get("healthCheckInterval")),
              Target: hcTarget,
              Timeout: String(this.get("healthCheckTimeout")),
              HealthyThreshold: String(this.get("healthyThreshold")),
              UnhealthyThreshold: String(this.get("unHealthyThreshold"))
            },
            DNSName: this.get("dnsName") || "",
            Policies: {
              LBCookieStickinessPolicies: [
                {
                  PolicyName: "",
                  CookieExpirationPeriod: ""
                }
              ],
              AppCookieStickinessPolicies: [
                {
                  PolicyName: "",
                  CookieName: ""
                }
              ],
              OtherPolicies: otherPoliciesAry
            },
            BackendServerDescriptions: [
              {
                InstantPort: "",
                PoliciyNames: ""
              }
            ],
            ConnectionSettings: {
              IdleTimeout: this.get('idleTimeout') || 60
            }
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.ELB,
      deserialize: function(data, layout_data, resolve) {
        var ElbAmiAsso, ElbSubnetAsso, ami, attr, elb, idx, instance, l, sb, sg, sslCert, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        attr = {
          id: data.uid,
          name: data.name,
          description: data.description || "",
          appId: data.resource.DNSName,
          parent: resolve(layout_data.groupUId),
          internal: data.resource.Scheme === 'internal',
          crossZone: !!data.resource.CrossZoneLoadBalancing,
          ConnectionDraining: data.resource.ConnectionDraining || {
            Enabled: true,
            Timeout: 300
          },
          listeners: [],
          dnsName: data.resource.DNSName,
          elbName: data.resource.LoadBalancerName,
          healthyThreshold: String(data.resource.HealthCheck.HealthyThreshold),
          unHealthyThreshold: String(data.resource.HealthCheck.UnhealthyThreshold),
          healthCheckTarget: data.resource.HealthCheck.Target,
          healthCheckInterval: String(data.resource.HealthCheck.Interval),
          healthCheckTimeout: String(data.resource.HealthCheck.Timeout),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          idleTimeout: ((_ref = data.resource) != null ? (_ref1 = _ref.ConnectionSettings) != null ? _ref1.IdleTimeout : void 0 : void 0) || 60,
          otherPoliciesMap: {}
        };
        if (data.resource.Policies) {
          if (data.resource.Policies.OtherPolicies) {
            _.each(data.resource.Policies.OtherPolicies, function(policyObj) {
              attr.otherPoliciesMap[policyObj.PolicyName] = policyObj;
              return null;
            });
          }
        }
        attr.AvailabilityZones = _.map(data.resource.AvailabilityZones || [], function(azRef) {
          if (azRef[0] === "@") {
            return resolve(MC.extractID(azRef)).get("name");
          } else {
            return azRef;
          }
        });
        _ref2 = data.resource.ListenerDescriptions || [];
        for (idx = _i = 0, _len = _ref2.length; _i < _len; idx = ++_i) {
          l = _ref2[idx];
          l = l.Listener;
          attr.listeners.push({
            port: l.LoadBalancerPort,
            protocol: l.Protocol,
            instanceProtocol: l.InstanceProtocol,
            instancePort: l.InstancePort
          });
          if (l.SSLCertificateId) {
            sslCert = resolve(MC.extractID(l.SSLCertificateId));
            if (sslCert) {
              attr.listeners[idx].sslCert = sslCert;
            }
          }
        }
        elb = new Model(attr);
        ElbAmiAsso = Design.modelClassForType("ElbAmiAsso");
        ElbSubnetAsso = Design.modelClassForType("ElbSubnetAsso");
        _ref3 = data.resource.SecurityGroups || [];
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          sg = _ref3[_j];
          new SgAsso(elb, resolve(MC.extractID(sg)));
        }
        _ref4 = data.resource.Subnets || [];
        for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
          sb = _ref4[_k];
          new ElbSubnetAsso(elb, resolve(MC.extractID(sb)), {
            deserialized: true
          });
        }
        _ref5 = data.resource.Instances || [];
        for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
          ami = _ref5[_l];
          instance = resolve(MC.extractID(ami.InstanceId));
          if (instance) {
            new ElbAmiAsso(elb, instance);
          }
        }
        return null;
      },
      postDeserialize: function(data, layout_data) {
        var elb, sg, sgName, _i, _len, _ref;
        elb = Design.instance().component(data.uid);
        sgName = elb.getElbSgName();
        _ref = SgModel.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          if (sg.get("name") === sgName) {
            elb.__elbSg = sg;
            sg.setAsElbSg();
            return;
          }
        }
      }
    });
    return Model;
  });

}).call(this);
