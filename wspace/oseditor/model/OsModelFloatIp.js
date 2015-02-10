(function() {
  define(["ComplexResModel", "constant", "Design"], function(ComplexResModel, constant, Design) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSFIP,
      newNameTmpl: "float-ip",
      serialize: function() {
        var extNetworkId, fixed_ip_address, port, port_id, rt;
        port = this.connectionTargets("OsFloatIpUsage")[0];
        if (!port) {
          return;
        }
        rt = port.getRouter();
        extNetworkId = rt ? rt.get("extNetworkId") : "";
        port_id = port.createRef(port.type === constant.RESTYPE.OSLISTENER ? "port_id" : "id");
        fixed_ip_address = port.createRef(port.type === constant.RESTYPE.OSLISTENER ? "address" : "fixed_ips.0.ip_address");
        return {
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              fixed_ip_address: fixed_ip_address,
              floating_ip_address: this.get("address") || '',
              port_id: port_id,
              floating_network_id: extNetworkId
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSFIP,
      deserialize: function(data, layout_data, resolve) {
        var IpUsage, fip, port;
        fip = new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          address: data.resource.floating_ip_address
        });
        port = resolve(MC.extractID(data.resource.port_id));
        if (port) {
          IpUsage = Design.modelClassForType("OsFloatIpUsage");
          new IpUsage(fip, port);
        }
      }
    });
    return Model;
  });

}).call(this);
