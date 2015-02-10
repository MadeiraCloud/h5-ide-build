(function() {
  define(["../DesignAws", "constant", "i18n!/nls/lang.js"], function(Design, constant, lang) {
    Design.registerDeserializeVisitor(function(data, layout_data, version) {
      var comp, foundKP, foundSG, uid;
      if (version >= "2014-01-15") {
        return;
      }
      if (!Design.instance().modeIsStack()) {
        return;
      }
      for (uid in data) {
        comp = data[uid];
        if (comp.type === constant.RESTYPE.KP) {
          if (comp.name === "DefaultKP") {
            foundKP = true;
            if (foundSG) {
              break;
            }
          }
        } else if (comp.type === constant.RESTYPE.SG) {
          if (comp.name === "DefaultSG") {
            foundSG = true;
            if (foundKP) {
              break;
            }
          }
        }
      }
      if (!foundKP) {
        uid = MC.guid();
        data[uid] = {
          uid: uid,
          type: constant.RESTYPE.KP,
          name: "DefaultKP",
          resource: {
            KeyName: "DefaultKP"
          }
        };
      }
      if (!foundSG) {
        uid = MC.guid();
        data[uid] = {
          uid: uid,
          type: constant.RESTYPE.SG,
          name: "DefaultSG",
          resource: {
            IpPermissions: [
              {
                IpProtocol: "tcp",
                IpRanges: "0.0.0.0/0",
                FromPort: "22",
                ToPort: "22",
                Groups: [
                  {
                    "GroupId": "",
                    "UserId": "",
                    "GroupName": ""
                  }
                ]
              }
            ],
            IpPermissionsEgress: [],
            Default: "true",
            GroupName: "DefaultSG",
            GroupDescription: lang.IDE.DESERIALIZE_VISITOR_GROUP_DESCRIPTION
          }
        };
      }
      return null;
    });
    return null;
  });

}).call(this);
