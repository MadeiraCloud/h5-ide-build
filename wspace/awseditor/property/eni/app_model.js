(function() {
  define(['../base/model', 'Design', 'constant', "CloudResources"], function(PropertyModel, Design, constant, CloudResources) {
    var EniAppModel;
    EniAppModel = PropertyModel.extend({
      init: function(uid) {
        var allEni, appData, e, eni, eni_comp, formated_group, group, i, index, m, mIndex, memberIndex, myEniComponent, myEniComponentJSON, _i, _j, _len, _len1, _ref, _ref1, _ref2;
        group = [];
        myEniComponent = Design.instance().component(uid);
        if (!myEniComponent) {
          allEni = Design.modelClassForType('AWS.VPC.NetworkInterface').allObjects();
          for (_i = 0, _len = allEni.length; _i < _len; _i++) {
            e = allEni[_i];
            if (e.get('appId') === uid) {
              myEniComponent = e;
              myEniComponentJSON = e != null ? e.toJSON() : void 0;
              break;
            } else {
              _ref = e.groupMembers();
              for (mIndex in _ref) {
                m = _ref[mIndex];
                if (m.appId === uid) {
                  memberIndex = +mIndex + 1;
                  myEniComponent = e;
                  myEniComponentJSON = m;
                  break;
                }
              }
            }
          }
        } else {
          myEniComponentJSON = myEniComponent != null ? myEniComponent.toJSON() : void 0;
        }
        appData = CloudResources(Design.instance().credentialId(), constant.RESTYPE.ENI, Design.instance().region());
        if (this.isGroupMode) {
          group = [myEniComponentJSON].concat(myEniComponent.groupMembers());
        } else {
          group.push(myEniComponentJSON);
        }
        formated_group = [];
        for (index in group) {
          eni_comp = group[index];
          if ((_ref1 = appData.get(eni_comp.appId)) != null ? _ref1.toJSON() : void 0) {
            eni = $.extend(true, {}, appData.get(eni_comp.appId).toJSON());
          } else {
            eni = {
              privateIpAddressesSet: []
            };
          }
          _ref2 = eni.privateIpAddressesSet;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            i = _ref2[_j];
            i.primary = i.primary === true;
          }
          eni.id = eni_comp.appId;
          eni.name = eni_comp.name ? "" + eni_comp.name + "-0" : "" + (myEniComponent.get('name')) + "-" + (memberIndex || index);
          eni.description = myEniComponent.get('description');
          eni.idx = memberIndex || index;
          eni.sourceDestCheck = eni.sourceDestCheck ? 'enabled' : 'disabled';
          formated_group.push(eni);
        }
        if (this.isGroupMode) {
          this.set('group', _.sortBy(formated_group, 'idx'));
          this.set('readOnly', true);
          this.set('isGroupMode', true);
          this.set('name', myEniComponent.get('name'));
        } else {
          eni = formated_group[0];
          eni.readOnly = true;
          eni.isGroupMode = false;
          eni.id = uid;
          eni.uid = myEniComponent ? myEniComponent.id : uid;
          this.set(eni);
        }
        return null;
      }
    });
    return new EniAppModel();
  });

}).call(this);
