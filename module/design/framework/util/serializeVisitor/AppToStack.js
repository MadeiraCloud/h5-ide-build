(function() {
  define(["Design"], function(Design) {
    Design.registerSerializeVisitor(function(components, layouts, options) {
      var comp, compo;
      console.info(arguments, "<===========");
      if (!options || !options.toStack) {
        return;
      }
      for (comp in components) {
        compo = components[comp];
        console.log(compo);
        switch (compo.type) {
          case 'AWS.VPC.VPC':
            compo.resource.VpcId = "";
            break;
          case 'AWS.VPC.NetworkInterface':
            compo.resource.NetworkInterfaceId = "";
            break;
          case 'AWS.EC2.Instance':
            compo.resource.PrivateIpAddress = "";
            compo.resource.InstanceId = "";
            break;
          case 'AWS.VPC.Subnet':
            compo.resource.SubnetId = "";
            break;
          case 'AWS.EC2.EIP':
            compo.name = "EIP";
            compo.resource.AllocationId = "";
            compo.resource.PublicIp = "";
            break;
          case 'AWS.VPC.RouteTable':
            compo.resource.RouteTableId = "";
            compo.resource.AssociationSet.forEach(function(e) {
              return e.RouteTableAssociationId = "";
            });
            break;
          case 'AWS.EC2.SecurityGroup':
            compo.resource.GroupId = "";
            compo.resource.GroupName = "WebServerSG";
            break;
          case 'AWS.EC2.KeyPair':
            compo.resource.KeyFingerprint = "";
            compo.resource.KeyName = "DefaultDP";
            break;
          case 'AWS.VPC.InternetGateway':
            compo.resource.InternetGatewayId = "";
            break;
          case 'AWS.VPC.NetworkAcl':
            compo.resource.NetworkAclId = "";
            compo.resource.AssociationSet.forEach(function(e) {
              e.NetworkAclAssociationId = "";
              return e.NetworkAclId = "";
            });
            break;
          case 'AWS.EC2.Tag':
            delete components[comp];
            break;
        }
      }
      return console.info(components, "<===============>");
    });
    return null;
  });

}).call(this);
