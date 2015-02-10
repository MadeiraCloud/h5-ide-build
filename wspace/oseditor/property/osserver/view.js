(function() {
  define(['constant', '../OsPropertyView', './template', 'CloudResources', 'underscore', 'OsKp', '../ossglist/view'], function(constant, OsPropertyView, template, CloudResources, _, OsKp, SgListView) {
    return OsPropertyView.extend({
      events: {
        "change #property-os-server-credential": "onChangeCredential",
        "change #property-os-server-name": "updateServerAttr",
        "change #property-os-server-image": "updateServerAttr",
        "change #property-os-server-CPU": "updateServerAttr",
        "change #property-os-server-RAM": "updateServerAttr",
        "change #property-os-server-keypair": "updateServerAttr",
        "change #property-os-server-adminPass": "updateServerAttr",
        "change #property-os-server-userdata": "updateServerAttr",
        'change #property-os-server-fip': "updateServerAttr",
        'change #property-os-server-aip': "updateServerAttr",
        'change #property-os-server-volsize': "updateServerAttr",
        'select_initialize #property-os-server-image': "initImage",
        'select_initialize #property-os-server-credential': "initCredential",
        'select_initialize #property-os-server-RAM': "initRAM",
        'select_initialize #property-os-server-CPU': "initCPU"
      },
      initialize: function() {
        return this.listenTo(this.model, 'change:fip', this.render);
      },
      render: function() {
        var currentImage, json, kpDropdown, _ref;
        this.$el.empty();
        json = this.model.toJSON();
        currentImage = CloudResources(constant.RESTYPE.OSIMAGE, Design.instance().region()).get(this.model.get('imageId'));
        this.flavorList = App.model.getOpenstackFlavors(Design.instance().get("provider"), Design.instance().region());
        json.imageList = CloudResources(constant.RESTYPE.OSIMAGE, Design.instance().region()).toJSON();
        json.floatingIp = !!this.model.embedPort().getFloatingIp();
        json.fixedIp = this.model.embedPort().get('ip');
        json.isAppEdit = this.modeIsAppEdit();
        json.agentEnabled = Design.instance().get('agent').enabled;
        json.volumeSize || (json.volumeSize = currentImage.get("vol_size"));
        this.$el.html(template.stackTemplate(json));
        kpDropdown = new OsKp(this.model, template.kpSelection({
          isAppEdit: this.modeIsAppEdit()
        }));
        this.$el.find("#property-os-server-keypair").html(kpDropdown.render().$el);
        this.stopListening(this.workspace.design);
        this.listenTo(this.workspace.design, "change:agent", this.render);
        this.sgListView = this.reg(new SgListView({
          targetModel: (_ref = this.model) != null ? _ref.embedPort() : void 0
        }));
        this.$el.append(this.sgListView.render().el);
        return this;
      },
      initImage: function(event) {
        return $(event.target)[0].selectize.setValue(this.model.get('imageId'));
      },
      initCredential: function(event) {
        return this.checkWindowsDistro(this.model.get("imageId"));
      },
      initRAM: function(event) {
        var avaliableRams, currentFlavor, flavorGroup;
        flavorGroup = _.groupBy(this.flavorList.toJSON(), 'vcpus');
        currentFlavor = this.flavorList.get(this.model.get('flavorId'));
        avaliableRams = _.map(_.pluck(flavorGroup[currentFlavor.get('vcpus')], 'ram'), function(e) {
          return {
            text: e / 1024 + " G",
            value: e
          };
        });
        $(event.target)[0].selectize.addOption(avaliableRams);
        return $(event.target)[0].selectize.setValue(currentFlavor.get('ram'));
      },
      initCPU: function(event) {
        var avaliableCPUs, currentFlavor, flavorGroup;
        flavorGroup = _.groupBy(this.flavorList.toJSON(), 'vcpus');
        currentFlavor = this.flavorList.get(this.model.get('flavorId'));
        avaliableCPUs = _.map(flavorGroup, function(e, index) {
          return {
            text: index + " Core",
            value: index
          };
        });
        $(event.target)[0].selectize.addOption(avaliableCPUs);
        return $(event.target)[0].selectize.setValue(currentFlavor.get('vcpus'));
      },
      onChangeCredential: function(event, value) {
        var result;
        result = event ? $(event.currentTarget).getValue() : value;
        this.model.set('credential', result);
        if (result === "keypair") {
          this.$el.find("#property-os-server-keypair").parent().show();
          return this.$el.find('#property-os-server-adminPass').parent().hide();
        } else {
          this.$el.find("#property-os-server-keypair").parent().hide();
          return this.$el.find('#property-os-server-adminPass').parent().show();
        }
      },
      checkWindowsDistro: function(imageId) {
        var $serverCredential, distro, distroIsWindows, image, volumeSize, _ref;
        image = CloudResources(constant.RESTYPE.OSIMAGE, Design.instance().region()).get(imageId);
        distro = image.get("os_distro");
        volumeSize = image.get("vol_size");
        if ((this.model.get("volumeSize") || 0) < volumeSize) {
          this.model.set("volumeSize", volumeSize);
        }
        $("#property-os-server-volsize").val(this.model.get("volumeSize") || image.get("vol_size"));
        distroIsWindows = distro === 'windows';
        $serverCredential = this.$el.find("#property-os-server-credential");
        $serverCredential.parents(".group").toggle(!distroIsWindows);
        if (distroIsWindows) {
          this.model.set('credential', 'adminPass');
          if ((_ref = $serverCredential[0].selectize) != null) {
            _ref.setValue('adminPass');
          }
          return this.onChangeCredential(null, 'adminPass');
        }
      },
      updateServerAttr: function(event) {
        var attr, availableRams, availableRamsValue, currentRamFlavor, flavorGroup, oldRamFlavor, ramSelectize, ramValue, selectize, serverPort, target, targetFlavor;
        target = $(event.currentTarget);
        attr = target.data('target');
        selectize = target[0].selectize;
        switch (attr) {
          case 'imageId':
            this.checkWindowsDistro(target.val());
            this.model.setImage(target.val());
            break;
          case 'name':
            this.setTitle(target.val());
            break;
          case 'CPU':
            flavorGroup = _.groupBy(this.flavorList.models, function(e) {
              return e.get('vcpus');
            });
            availableRams = flavorGroup[target.val()];
            if (availableRams != null ? availableRams.length : void 0) {
              ramSelectize = this.$el.find("#property-os-server-RAM")[0].selectize;
              if (!ramSelectize) {
                return false;
              }
              ramValue = ramSelectize.getValue();
              availableRamsValue = _.map(_.pluck(_.map(availableRams, function(ram) {
                return ram.toJSON();
              }), 'ram'), function(e) {
                return {
                  text: e / 1024 + " G",
                  value: e
                };
              });
              currentRamFlavor = _.find(availableRams, function(e) {
                return e.get('ram') === +ramValue;
              });
              if (!currentRamFlavor) {
                ramValue = _.min(_.pluck(availableRamsValue, 'value'));
                currentRamFlavor = _.find(availableRams, function(e) {
                  return e.get('ram') === +ramValue;
                });
              }
              this.model.set("flavorId", currentRamFlavor.get('id'));
              this.updateRamOptions(availableRamsValue, ramValue);
            } else {
              return false;
            }
            return false;
          case 'RAM':
            oldRamFlavor = this.flavorList.get(this.model.get('flavorId'));
            flavorGroup = _.groupBy(this.flavorList.models, function(e) {
              return e.get('vcpus');
            });
            availableRams = flavorGroup[oldRamFlavor.get('vcpus')];
            targetFlavor = _.find(availableRams, function(e) {
              return e.get('ram') === +selectize.getValue();
            });
            this.model.set('flavorId', targetFlavor.get('id'));
            return false;
          case "fixedIp":
            serverPort = this.model.embedPort();
            serverPort.setIp(target.val());
            return false;
          case 'associateFip':
            serverPort = this.model.embedPort();
            serverPort.setFloatingIp(target.getValue());
            return false;
        }
        console.log(attr, target.val());
        if (attr) {
          return this.model.set(attr, target.val());
        }
      },
      updateRamOptions: function(availableRams, currentRam) {
        var ramSelection;
        ramSelection = this.$el.find("#property-os-server-RAM")[0].selectize;
        ramSelection.clearOptions();
        return ramSelection.load(function(callback) {
          callback(availableRams);
          ramSelection.refreshOptions(false);
          return ramSelection.setValue(currentRam);
        });
      },
      selectTpl: {
        imageSelect: function(item) {
          var imageList, imageObj, _ref;
          imageList = CloudResources(constant.RESTYPE.OSIMAGE, Design.instance().region());
          imageObj = (_ref = imageList.get(item.value)) != null ? _ref.toJSON() : void 0;
          if (!imageObj) {
            item.distro = "ami-unknown";
            return template.imageListKey(item);
          }
          imageObj.distro = imageObj.os_type + "." + imageObj.architecture;
          return template.imageListKey(imageObj);
        },
        imageValue: function(item) {
          var imageList, imageObj, _ref;
          imageList = CloudResources(constant.RESTYPE.OSIMAGE, Design.instance().region());
          imageObj = (_ref = imageList.get(item.value)) != null ? _ref.toJSON() : void 0;
          if (!imageObj) {
            item.distro = "ami-unknown";
            item.text = item.text || "Unknow";
            return template.imageValue(item);
          }
          imageObj.distro = imageObj.os_type + "." + imageObj.architecture;
          return template.imageValue(imageObj);
        },
        kpButton: function() {
          return template.kpButton();
        }
      }
    }, {
      handleTypes: [constant.RESTYPE.OSSERVER],
      handleModes: ['stack', 'appedit']
    });
  });

}).call(this);
