(function() {
  define(['../base/model', '../instance/model', 'constant', 'i18n!/nls/lang.js', 'Design', 'CloudResources'], function(PropertyModel, instance_model, constant, lang, Design, CloudResources) {
    var ServerGroupModel;
    ServerGroupModel = PropertyModel.extend({
      init: function(uid) {
        var ami, ami_id, myInstanceComponent, rd, routeCount, tenancy;
        this.set('uid', uid);
        this.set('readOnly', !this.isAppEdit);
        myInstanceComponent = Design.instance().component(uid);
        ami_id = myInstanceComponent.get("imageId");
        ami = myInstanceComponent.getAmi() || myInstanceComponent.get("cachedAmi");
        if (ami) {
          this.set('ami', {
            id: ami_id,
            name: ami.name || ami.description || ami.id,
            icon: "" + ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png"
          });
          this.set('type_editable', ami.rootDeviceType !== "instance-store");
        } else {
          notification('warning', sprintf(lang.NOTIFY.ERR_AMI_NOT_FOUND, ami_id));
        }
        rd = myInstanceComponent.getBlockDeviceMapping();
        if (rd.length === 1) {
          this.set("rootDevice", rd[0]);
        }
        tenancy = myInstanceComponent.get('tenancy' !== 'dedicated');
        this.set('instance_type', myInstanceComponent.getInstanceTypeList());
        this.set('ebs_optimized', myInstanceComponent.get("ebsOptimized"));
        this.set('can_set_ebs', myInstanceComponent.isEbsOptimizedEnabled());
        routeCount = myInstanceComponent.connectionTargets('RTB_Route').length;
        if (routeCount) {
          this.set('number_disable', true);
        }
        this.set('number', myInstanceComponent.get('count'));
        this.set('name', myInstanceComponent.get('name'));
        this.set('monitoring', myInstanceComponent.get('monitoring'));
        this.set('description', myInstanceComponent.get('description'));
        this.set('displayCount', myInstanceComponent.get('count') - 1);
        this.getGroupList();
        this.getEni();
        return null;
      },
      setCount: function(count) {
        var uid;
        uid = this.get('uid');
        Design.instance().component(uid).setCount(count);
        this.getGroupList();
        return null;
      },
      getGroupList: function() {
        var appData, comp, count, eni, existingLength, group, idx, index, member, members, name, resource_list, uid, _i, _j, _len, _len1, _ref, _ref1;
        uid = this.get('uid');
        comp = Design.instance().component(uid);
        resource_list = CloudResources(Design.instance().credentialId(), constant.RESTYPE.INSTANCE, Design.instance().region());
        appData = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.INSTANCE, Design.instance().region()).get(comp.get('appId'))) != null ? _ref.toJSON() : void 0;
        name = comp.get("name");
        group = [
          {
            appId: comp.get("appId"),
            name: name + "-0",
            status: appData ? appData.instanceState.name : "Unknown",
            launchTime: appData ? appData.launchTime : ""
          }
        ];
        count = comp.get("count");
        if (comp.groupMembers().length > count - 1) {
          members = comp.groupMembers().slice(0, count - 1);
        } else {
          members = comp.groupMembers();
        }
        for (index = _i = 0, _len = members.length; _i < _len; index = ++_i) {
          member = members[index];
          group.push({
            name: name + "-" + (index + 1),
            appId: member.appId,
            status: resource_list.get(member.appId) ? resource_list.get(member.appId).attributes.instanceState.name : "Unknown",
            isNew: !member.appId,
            isOld: member.appId && (index + 1 >= count)
          });
        }
        while (group.length < count) {
          group.push({
            name: name + "-" + group.length,
            isNew: true,
            status: "Unknown"
          });
        }
        existingLength = 0;
        _ref1 = comp.groupMembers();
        for (idx = _j = 0, _len1 = _ref1.length; _j < _len1; idx = ++_j) {
          eni = _ref1[idx];
          if (eni.appId) {
            existingLength = idx + 1;
          } else {
            break;
          }
        }
        existingLength += 1;
        if (group.length > 1) {
          this.set('group', group);
          if (existingLength > count) {
            group.increment = "-" + (existingLength - count);
          } else if (existingLength < count) {
            group.increment = "+" + (count - existingLength);
          }
        } else {
          this.set('group', group[0]);
        }
        return null;
      },
      getEni: instance_model.getEni,
      setEbsOptimized: instance_model.setEbsOptimized,
      canSetInstanceType: instance_model.canSetInstanceType,
      setInstanceType: instance_model.setInstanceType,
      setIp: instance_model.setIp,
      canAddIP: instance_model.canAddIP,
      isValidIp: instance_model.isValidIp,
      addIp: instance_model.addIp,
      removeIp: instance_model.removeIp,
      attachEip: instance_model.attachEip,
      setMonitoring: instance_model.setMonitoring,
      setSourceCheck: instance_model.setSourceCheck
    });
    return new ServerGroupModel();
  });

}).call(this);
