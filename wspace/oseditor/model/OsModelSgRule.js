define(["ComplexResModel", "constant"], function(ComplexResModel, constant) {
  return ComplexResModel.extend({
    type: constant.RESTYPE.OSSGRULE,
    newNameTmpl: "sg-rule",
    defaults: {
      direction: "egress",
      portMin: null,
      portMax: null,
      protocol: null,
      sg: null,
      ip: null,
      appId: ""
    },
    setTarget: function(ipOrSgModel) {
      var attr;
      if (typeof ip === "string") {
        attr = {
          ip: ipOrSgModel,
          sg: null
        };
      } else {
        attr = {
          ip: null,
          sg: ipOrSgModel
        };
      }
      this.set(attr);
    },
    toJSON: function() {
      var sg;
      sg = this.get("sg");
      return {
        direction: this.get("direction"),
        port_range_min: this.get("portMin"),
        port_range_max: this.get("portMax"),
        protocol: this.get("protocol"),
        remote_group_id: sg ? sg.createRef("id") : null,
        remote_ip_prefix: this.get("ip"),
        id: this.get("appId")
      };
    },
    fromJSON: function(json) {
      var attr;
      attr = this.attributes;
      attr.direction = json.direction || "egress";
      attr.portMin = json.port_range_min || null;
      attr.portMax = json.port_range_max || null;
      attr.protocol = json.protocol || null;
      attr.appId = json.id || "";
      attr.sg = json.remote_group_id ? json.remote_group_id : null;
      attr.ip = json.remote_ip_prefix ? json.remote_ip_prefix : null;
    },
    isEqualToData: function(data) {
      var attr;
      attr = this.attributes;
      if (attr.direction !== data.direction) {
        return false;
      }
      if (attr.portMin !== data.portMin) {
        return false;
      }
      if (attr.portMax !== data.portMax) {
        return false;
      }
      if (attr.protocol !== data.protocol) {
        return false;
      }
      if (attr.sg !== data.sg) {
        return false;
      }
      if (attr.ip !== data.ip) {
        return false;
      }
      return true;
    },
    serialize: function() {}
  });
});
