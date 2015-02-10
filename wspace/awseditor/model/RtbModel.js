(function() {
  define(["ComplexResModel", "Design", "./connection/Route", "./connection/RtbAsso", "constant", "i18n!/nls/lang.js"], function(ComplexResModel, Design, Route, RtbAsso, constant, lang) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: {
        main: false,
        implicit: false
      },
      type: constant.RESTYPE.RT,
      newNameTmpl: "RT-",
      isRemovable: function() {
        if (this.get("main")) {
          return {
            error: sprintf(lang.CANVAS.ERR_DEL_MAIN_RT, this.get("name"))
          };
        }
        return true;
      },
      setMain: function() {
        var asso, sb, subnets, _i, _len, _results;
        if (this.get("main")) {
          return;
        }
        Model.getMainRouteTable().set("main", false);
        this.set("main", true);
        subnets = Design.modelClassForType(constant.RESTYPE.SUBNET).allObjects();
        _results = [];
        for (_i = 0, _len = subnets.length; _i < _len; _i++) {
          sb = subnets[_i];
          asso = sb.connections("RTB_Asso")[0];
          console.assert(asso, "Subnet should at least associate to one RouteTable");
          if (asso.get("implicit")) {
            _results.push(new RtbAsso(this, sb, {
              implicit: true
            }));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },
      addRoute: function(targetId, r, propagating) {
        var component, connection;
        if (_.isString(targetId)) {
          component = Design.instance().component(targetId);
        } else {
          component = new Route.VpcRouteTarget(targetId);
        }
        if (!component || !component.id) {
          console.warn("Ignoring adding route:", targetId, r);
          return;
        }
        connection = new Route(this, component);
        connection.addRoute(r);
        if (propagating !== void 0) {
          connection.setPropagate(propagating);
        }
        return null;
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          description: this.get("description") || "",
          type: this.type,
          uid: this.id,
          resource: {
            PropagatingVgwSet: [],
            RouteTableId: this.get("appId"),
            VpcId: this.parent().createRef("VpcId"),
            AssociationSet: [],
            RouteSet: [
              {
                Origin: "CreateRouteTable",
                DestinationCidrBlock: this.parent().get("cidr"),
                InstanceId: "",
                NetworkInterfaceId: "",
                GatewayId: "local"
              }
            ],
            Tags: [
              {
                Key: "visops_default",
                Value: this.get("main") ? "true" : "false"
              }
            ]
          }
        };
        if (this.get("main")) {
          component.resource.AssociationSet.push({
            Main: "true",
            RouteTableAssociationId: "",
            SubnetId: ""
          });
        }
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      getMainRouteTable: function() {
        return _.find(Model.allObjects(), function(obj) {
          return obj.get("main");
        });
      },
      handleTypes: constant.RESTYPE.RT,
      resolveFirst: true,
      preDeserialize: function(data, layout_data) {
        var asso_main, assoc, found, idx, main_rt, rtb, _i, _len, _ref;
        if (data.resource.AssociationSet) {
          found = -1;
          _ref = data.resource.AssociationSet;
          for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
            assoc = _ref[idx];
            if (assoc.Main && found === -1) {
              found = idx;
            }
          }
          if (found > 0) {
            main_rt = data.resource.AssociationSet.splice(found, 1);
            data.resource.AssociationSet.splice(0, 0, main_rt[0]);
          }
          if (data.resource.AssociationSet[0]) {
            asso_main = "" + data.resource.AssociationSet[0].Main === "true";
          }
        }
        rtb = new Model({
          id: data.uid,
          appId: data.resource.RouteTableId,
          name: data.name,
          description: data.description || "",
          main: !!asso_main,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        return null;
      },
      deserialize: function(data, layout_data, resolve) {
        var VpcModel, rtb, vpc;
        rtb = resolve(data.uid);
        vpc = resolve(layout_data.groupUId);
        VpcModel = Design.modelClassForType(constant.RESTYPE.VPC);
        if (!vpc) {
          vpc = VpcModel.theVPC();
        }
        vpc.addChild(rtb);
        return null;
      },
      postDeserialize: function(data, layout_data) {
        var design, propagateMap, r, ref, routes, rtb, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        design = Design.instance();
        rtb = design.component(data.uid);
        _ref = data.resource.AssociationSet || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          if (!r.Main && r.SubnetId) {
            new RtbAsso(rtb, design.component(MC.extractID(r.SubnetId)), {
              implicit: false,
              assoId: r.RouteTableAssociationId
            });
          }
        }
        routes = data.resource.RouteSet;
        if (routes && routes.length > 1) {
          propagateMap = {};
          _ref1 = data.resource.PropagatingVgwSet || [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            ref = _ref1[_j];
            propagateMap[ref] = true;
          }
          for (_k = 0, _len2 = routes.length; _k < _len2; _k++) {
            r = routes[_k];
            if (r.GatewayId === "local") {
              continue;
            }
            rtb.addRoute(r, r.DestinationCidrBlock, propagateMap[r.GatewayId]);
          }
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);
