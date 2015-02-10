(function() {
  define(['../base/model', "Design", 'constant', 'i18n!/nls/lang.js'], function(PropertyModel, Design, constant, lang) {
    var ConnectionModel;
    ConnectionModel = PropertyModel.extend({
      init: function(uid) {
        var attr, cn;
        cn = Design.instance().component(uid);
        if (!cn) {
          return false;
        }
        if (cn.type === "EniAttachment") {
          attr = {
            name: lang.PROP.ENI_ATTACHMENT_NAME,
            eniAsso: {
              instance: cn.getTarget(constant.RESTYPE.INSTANCE).get("name"),
              eni: cn.getTarget(constant.RESTYPE.ENI).get("name")
            }
          };
        } else if (cn.type === "ElbSubnetAsso") {
          attr = {
            name: lang.PROP.ELB_SUBNET_ASSO_NAME,
            subnetAsso: {
              elb: cn.getTarget(constant.RESTYPE.ELB).get("name"),
              subnet: cn.getTarget(constant.RESTYPE.SUBNET).get("name")
            }
          };
        }
        return this.set(attr);
      }
    });
    return new ConnectionModel();
  });

}).call(this);
