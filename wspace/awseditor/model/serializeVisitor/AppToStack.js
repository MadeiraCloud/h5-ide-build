(function() {
  define(["../DesignAws"], function(Design) {
    Design.registerSerializeVisitor(function(components, layouts, options) {
      var comp, compo, level2DBComp, level2DBId, sourceDBId, _results;
      if (!options || !options.toStack) {
        return;
      }
      _results = [];
      for (comp in components) {
        compo = components[comp];
        switch (compo.type) {
          case 'AWS.VPC.VPC':
            _results.push(compo.resource.VpcId = "");
            break;
          case 'AWS.VPC.NetworkInterface':
            compo.resource.NetworkInterfaceId = "";
            _results.push(compo.resource.Attachment.AttachmentId = "");
            break;
          case 'AWS.EC2.Instance':
            compo.resource.InstanceId = "";
            _results.push(_.each(compo.resource.BlockDeviceMapping, function(e) {
              var _ref;
              if (((_ref = e.Ebs) != null ? _ref.VolumeType : void 0) && e.Ebs.VolumeType !== "io1" && e.Ebs.Iops) {
                return compo.Ebs.Iops = "";
              }
            }));
            break;
          case 'AWS.VPC.Subnet':
            _results.push(compo.resource.SubnetId = "");
            break;
          case 'AWS.EC2.EIP':
            compo.resource.AllocationId = "";
            _results.push(compo.resource.PublicIp = "");
            break;
          case 'AWS.VPC.RouteTable':
            compo.resource.RouteTableId = "";
            _results.push(compo.resource.AssociationSet.forEach(function(e) {
              e.RouteTableAssociationId = "";
            }));
            break;
          case 'AWS.EC2.SecurityGroup':
            compo.resource.GroupId = "";
            _results.push(compo.resource.GroupName = compo.name);
            break;
          case 'AWS.VPC.InternetGateway':
            _results.push(compo.resource.InternetGatewayId = "");
            break;
          case 'AWS.VPC.NetworkAcl':
            compo.resource.NetworkAclId = "";
            _results.push(compo.resource.AssociationSet.forEach(function(e) {
              e.NetworkAclAssociationId = "";
            }));
            break;
          case 'AWS.VPC.VPNGateway':
            _results.push(compo.resource.VpnGatewayId = "");
            break;
          case 'AWS.VPC.VPNConnection':
            _results.push(compo.resource.VpnConnectionId = "");
            break;
          case 'AWS.VPC.CustomerGateway':
            _results.push(compo.resource.CustomerGatewayId = "");
            break;
          case "AWS.EC2.EBS.Volume":
            compo.resource.VolumeId = "";
            if (compo.resource.VolumeType && compo.resource.VolumeType !== "io1" && compo.resource.Iops) {
              compo.resource.Iops = "";
              _results.push(null);
            } else {
              _results.push(void 0);
            }
            break;
          case 'AWS.EC2.Tag':
            _results.push(delete components[comp]);
            break;
          case 'AWS.AutoScaling.Tag':
            _results.push(delete components[comp]);
            break;
          case 'AWS.ELB':
            compo.resource.DNSName = "";
            _results.push(compo.resource.LoadBalancerName = compo.name);
            break;
          case 'AWS.AutoScaling.LaunchConfiguration':
            compo.resource.LaunchConfigurationARN = "";
            compo.resource.LaunchConfigurationName = compo.name;
            _results.push(_.each(compo.resource.BlockDeviceMapping, function(e) {
              var _ref;
              if (((_ref = e.Ebs) != null ? _ref.VolumeType : void 0) && e.Ebs.VolumeType !== 'io1' && e.Ebs.Iops) {
                e.Ebs.Iops = "";
                return null;
              }
            }));
            break;
          case 'AWS.AutoScaling.Group':
            compo.resource.AutoScalingGroupARN = "";
            _results.push(compo.resource.AutoScalingGroupName = compo.name);
            break;
          case 'AWS.AutoScaling.NotificationConfiguration':
            _results.push(console.log("Do Nothing Here"));
            break;
          case 'AWS.SNS.Subscription':
            _results.push(console.log("Do Nothing Here"));
            break;
          case 'AWS.AutoScaling.ScalingPolicy':
            _results.push(compo.resource.PolicyARN = "");
            break;
          case 'AWS.CloudWatch.CloudWatch':
            compo.resource.AlarmArn = "";
            _results.push(compo.resource.AlarmName = compo.name);
            break;
          case 'AWS.RDS.DBInstance':
            sourceDBId = '';
            level2DBId = MC.extractID(compo.resource.ReadReplicaSourceDBInstanceIdentifier);
            if (level2DBId) {
              level2DBComp = components[level2DBId];
              if (level2DBComp) {
                sourceDBId = level2DBComp.resource.ReadReplicaSourceDBInstanceIdentifier;
              }
            }
            if (!sourceDBId) {
              compo.resource.CreatedBy = "";
              compo.resource.DBInstanceIdentifier = "";
              compo.resource.Endpoint.Address = "";
              compo.resource.PreferredBackupWindow = "";
              compo.resource.PreferredMaintenanceWindow = "";
              if (compo.resource.ReadReplicaSourceDBInstanceIdentifier) {
                _results.push(compo.resource.MasterUserPassword = "****");
              } else {
                _results.push(compo.resource.MasterUserPassword = "12345678");
              }
            } else {
              level2DBComp.resource.BackupRetentionPeriod = 0;
              _results.push(delete components[compo.uid]);
            }
            break;
          case "AWS.RDS.DBSubnetGroup":
            compo.resource.CreatedBy = '';
            _results.push(compo.resource.DBSubnetGroupName = "");
            break;
          case 'AWS.RDS.OptionGroup':
            _results.push(compo.resource.OptionGroupName = "");
            break;
        }
      }
      return _results;
    });
    return null;
  });

}).call(this);
