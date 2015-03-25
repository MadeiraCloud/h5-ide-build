define(["ComplexResModel", "constant", "Design", "CloudResources"], function(ComplexResModel, constant, Design, CloudResources) {
  var Model;
  Model = ComplexResModel.extend({
    type: constant.RESTYPE.OSSERVER,
    newNameTmpl: "host",
    defaults: function() {
      return {
        userData: "",
        meta: "",
        adminPass: "12345678",
        keypair: "$DefaultKeyPair",
        flavorId: "6",
        availabilityZone: "",
        imageId: "",
        credential: "keypair",
        state: [],
        volumeSize: ""
      };
    },
    initialize: function(attr, option) {
      var PortModel, PortUsage, newPort;
      option = option || {};
      console.assert(attr.imageId, "Invalid attributes when creating OsModelServer", attr);
      this.setImage(attr.imageId);
      this.setCredential(attr);
      if (option.createByUser) {
        PortModel = Design.modelClassForType(constant.RESTYPE.OSPORT);
        PortUsage = Design.modelClassForType("OsPortUsage");
        newPort = new PortModel({
          name: this.get('name') + "-port"
        });
        new PortUsage(this, newPort);
        Design.modelClassForType(constant.RESTYPE.OSSG).attachDefaultSG(newPort);
        this.assignIP();
      }
      return null;
    },
    assignIP: function() {
      var availableIP;
      availableIP = Design.modelClassForType(constant.RESTYPE.OSPORT).getAvailableIP(this.parent());
      if (this.embedPort() && availableIP) {
        return this.embedPort().set('ip', availableIP);
      }
    },
    onParentChanged: function(oldParent) {
      if (oldParent) {
        return this.assignIP();
      }
    },
    embedPort: function() {
      return this.connectionTargets("OsPortUsage")[0];
    },
    volumes: function() {
      return this.connectionTargets("OsVolumeUsage");
    },
    setCredential: function(attr) {
      if (attr.keypair) {
        return this.set('credential', "keypair");
      } else if (attr.adminPass) {
        return this.set('credential', 'adminPass');
      }
    },
    setImage: function(imageId) {
      var cached, image;
      this.set("imageId", imageId);
      image = this.getImage();
      cached = this.get("cachedAmi");
      if (image && cached) {
        cached.os_distro = image.os_distro;
        cached.architecture = image.architecture;
      }
      return null;
    },
    getImage: function() {
      var image;
      image = CloudResources(constant.RESTYPE.OSIMAGE, this.design().region()).get(this.get("imageId"));
      if (image) {
        return image.toJSON();
      } else {
        return null;
      }
    },
    getStateData: function() {
      return this.get("state");
    },
    setStateData: function(stateAryData) {
      return this.set("state", stateAryData);
    },
    serialize: function() {
      var KeypairModel, component, defaultKp;
      component = {
        name: this.get("name"),
        type: this.type,
        uid: this.id,
        state: this.get("state"),
        resource: {
          id: this.get("appId"),
          name: this.get("name"),
          flavor: this.get('flavorId'),
          image: this.get("imageId"),
          meta: this.get('meta'),
          NICS: this.connectionTargets("OsPortUsage").map(function(port) {
            return {
              "port-id": port.createRef("id")
            };
          }),
          userdata: this.get('userData'),
          availabilityZone: this.get('availabilityZone'),
          blockDeviceMappingV2: [
            {
              bootIndex: 0,
              sourceType: "image",
              volumeSize: this.get("volumeSize"),
              deviceName: "",
              uuid: this.get("imageId"),
              destinationType: "volume",
              deleteOnTermination: true
            }
          ]
        }
      };
      KeypairModel = Design.modelClassForType(constant.RESTYPE.OSKP);
      defaultKp = _.find(KeypairModel.allObjects(), function(obj) {
        return obj.get("name") === "DefaultKP";
      });
      if (this.get('credential') === "keypair") {
        component.resource.key_name = this.get("keypair") === "$DefaultKeyPair" ? MC.genResRef(defaultKp.id, "resource.keyName") : this.get("keypair");
        component.resource.adminPass = "";
      } else {
        component.resource.key_name = "";
        component.resource.adminPass = this.get("adminPass");
      }
      return {
        component: component,
        layout: this.generateLayout()
      };
    }
  }, {
    handleTypes: constant.RESTYPE.OSSERVER,
    deserialize: function(data, layout_data, resolve) {
      var PortUsage, idx, port, server, _i, _len, _ref, _ref1;
      server = new Model({
        id: data.uid,
        name: data.resource.name,
        appId: data.resource.id,
        flavorId: data.resource.flavor,
        imageId: data.resource.image || data.resource.blockDeviceMappingV2[0].uuid,
        adminPass: data.resource.adminPass,
        volumeSize: (_ref = data.resource.blockDeviceMappingV2) != null ? _ref[0].volumeSize : void 0,
        keypair: data.resource.key_name.split("{")[0] === "@" ? "$DefaultKeyPair" : data.resource.key_name,
        state: data.state,
        x: layout_data.coordinate[0],
        y: layout_data.coordinate[1]
      });
      PortUsage = Design.modelClassForType("OsPortUsage");
      _ref1 = data.resource.NICS || [];
      for (idx = _i = 0, _len = _ref1.length; _i < _len; idx = ++_i) {
        port = _ref1[idx];
        port = resolve(MC.extractID(port["port-id"]));
        if (idx === 0) {
          port.parent().addChild(server);
          port.parent().removeChild(port);
        }
        new PortUsage(server, port);
      }
    }
  });
  return Model;
});
