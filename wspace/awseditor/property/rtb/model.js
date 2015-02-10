(function() {
  define(['../base/model', "Design", 'constant', "CloudResources", 'i18n!/nls/lang.js'], function(PropertyModel, Design, constant, CloudResources, lang) {
    var RTBModel;
    RTBModel = PropertyModel.extend({
      defaults: {
        'isAppEdit': false
      },
      setMainRT: function() {
        Design.instance().component(this.get("uid")).setMain();
        if (this.isAppEdit) {
          this.setMainMessage(this.get("uid"));
          this.set('isMain', Design.instance().component(this.get("uid")).get("main"));
        }
        return null;
      },
      reInit: function() {
        this.init(this.get("uid"));
        return null;
      },
      init: function(uid) {
        var VPCModel, cn, component, data, design, res_type, routes, subnet, theOtherPort, _i, _len, _ref;
        design = Design.instance();
        component = design.component(uid);
        res_type = constant.RESTYPE;
        if (component.node_line) {
          subnet = component.getTarget(res_type.SUBNET);
          component = component.getTarget(res_type.RT);
          if (subnet) {
            this.set({
              title: lang.IDE.TITLE_SUBNET_RT_ASSO,
              association: {
                subnet: subnet.get("name"),
                rtb: component.get("name")
              }
            });
            return;
          }
        }
        VPCModel = Design.modelClassForType(res_type.VPC);
        routes = [];
        data = {
          uid: component.id,
          description: component.get("description"),
          title: component.get("name"),
          isMain: component.get("main"),
          local_route: VPCModel.theVPC().get("cidr"),
          routes: routes,
          isAppEdit: this.isAppEdit,
          isStack: Design.instance().mode() === 'stack'
        };
        _ref = component.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          if (cn.type !== "RTB_Route") {
            continue;
          }
          theOtherPort = cn.getOtherTarget(res_type.RT);
          routes.push({
            name: theOtherPort.get("name"),
            type: theOtherPort.type,
            ref: cn.id,
            readonly: theOtherPort.type === "ExternalVpcRouteTarget",
            isVgw: theOtherPort.type === res_type.VGW,
            isProp: cn.get("propagate"),
            cidr_set: cn.get("routes")
          });
        }
        routes = _.sortBy(routes, "type");
        if (this.isAppEdit) {
          this.set('vpcId', component.parent().get('appId'));
          this.set('routeTableId', component.get('appId'));
          this.setMainMessage(uid);
        }
        this.set(data);
        return true;
      },
      setMainMessage: function(uid) {
        var appData, asso, aws_rt_is_main, component, now_main_rtb, _i, _len, _ref, _ref1;
        component = Design.instance().component(uid);
        appData = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.RT, Design.instance().region()).get(component.get('appId'))) != null ? _ref.toJSON() : void 0;
        aws_rt_is_main = false;
        if (appData && appData.associationSet && appData.associationSet.length) {
          _ref1 = appData.associationSet;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            asso = _ref1[_i];
            if (asso.main === true) {
              aws_rt_is_main = true;
            }
          }
        }
        now_main_rtb = Design.modelClassForType(constant.RESTYPE.RT).getMainRouteTable();
        if (aws_rt_is_main && now_main_rtb.id !== component.id) {
          return this.set('main', 'Yes (Set as No after applying updates)');
        } else if (aws_rt_is_main && now_main_rtb.id === component.id) {
          return this.set('main', 'Yes');
        } else if (!aws_rt_is_main && now_main_rtb.id === component.id) {
          return this.set('main', 'No (Set as Yes after applying updates)');
        } else {
          return this.set('main', 'No');
        }
      },
      setPropagation: function(propagate) {
        var cn, component;
        component = Design.instance().component(this.get("uid"));
        cn = _.find(component.connections(), function(cn) {
          return cn.getTarget(constant.RESTYPE.VGW) !== null;
        });
        cn.setPropagate(propagate);
        return null;
      },
      setRoutes: function(routeId, routes) {
        _.each(routes, function(routeCidr, idx) {
          var validCIDR;
          validCIDR = MC.getValidCIDR(routeCidr);
          return routes[idx] = validCIDR;
        });
        Design.instance().component(routeId).set("routes", routes);
        return null;
      },
      removeRoute: function(routeId) {
        var _ref;
        return (_ref = Design.instance().component(routeId)) != null ? _ref.remove() : void 0;
      },
      isCidrConflict: function(inputValue, cidr) {
        return Design.modelClassForType(constant.RESTYPE.SUBNET).isCidrConflict(inputValue, cidr);
      }
    });
    return new RTBModel();
  });

}).call(this);
