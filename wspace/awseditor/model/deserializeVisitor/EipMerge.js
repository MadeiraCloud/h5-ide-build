(function() {
  define(["../DesignAws"], function(Design) {
    Design.registerDeserializeVisitor(function(data, layout_data) {
      var comp, eni_comp, instance_comp, ipObj, refArray, uid;
      for (uid in data) {
        comp = data[uid];
        if (comp.type === "AWS.EC2.EIP") {
          if (comp.resource.NetworkInterfaceId) {
            refArray = comp.resource.PrivateIpAddress.split(".");
            eni_comp = data[MC.extractID(refArray[0])];
            if (!eni_comp) {
              continue;
            }
            ipObj = eni_comp.resource.PrivateIpAddressSet[refArray[3] * 1];
            if (!ipObj) {
              continue;
            }
            ipObj.EipResource = comp;
          } else {
            instance_comp = data[MC.extractID(comp.resource.InstanceId)];
            if (instance_comp) {
              instance_comp.resource.EipResource = comp;
            }
          }
        }
      }
      return null;
    });
    return null;
  });

}).call(this);
