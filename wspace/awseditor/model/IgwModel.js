(function() {
  define(["ComplexResModel", "Design", "constant", "i18n!/nls/lang.js"], function(ComplexResModel, Design, constant, lang) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: {
        name: "Internet-gateway"
      },
      type: constant.RESTYPE.IGW,
      isRemovable: function() {
        var ElbModel, EniModel, LcModel, cannotDel;
        ElbModel = Design.modelClassForType(constant.RESTYPE.ELB);
        cannotDel = ElbModel.allObjects().some(function(elb) {
          return !elb.get("internal");
        });
        if (!cannotDel) {
          EniModel = Design.modelClassForType(constant.RESTYPE.ENI);
          cannotDel = EniModel.allObjects().some(function(eni) {
            return eni.hasEip() || eni.get("assoPublicIp");
          });
        }
        if (!cannotDel) {
          LcModel = Design.modelClassForType(constant.RESTYPE.LC);
          cannotDel = LcModel.allObjects().some(function(lc) {
            return lc.get("publicIp");
          });
        }
        if (cannotDel) {
          return {
            error: lang.CANVAS.CVS_CFM_DEL_IGW
          };
        }
        return true;
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            InternetGatewayId: this.get("appId"),
            AttachmentSet: [
              {
                VpcId: this.parent().createRef("VpcId")
              }
            ]
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      tryCreateIgw: function() {
        var vpc;
        if (Model.allObjects().length > 0) {
          return;
        }
        notification('info', lang.CANVAS.CVS_CFM_ADD_IGW_MSG);
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
        new Model({
          x: -1,
          y: -1,
          parent: vpc
        });
        return null;
      },
      handleTypes: constant.RESTYPE.IGW,
      deserialize: function(data, layout_data, resolve) {
        return new Model({
          id: data.uid,
          name: data.name,
          appId: data.resource.InternetGatewayId,
          parent: resolve(MC.extractID(data.resource.AttachmentSet[0].VpcId)),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
      }
    });
    return Model;
  });

}).call(this);
