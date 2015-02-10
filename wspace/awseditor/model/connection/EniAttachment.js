(function() {
  define(["constant", "ConnectionModel", "i18n!/nls/lang.js"], function(constant, ConnectionModel, lang) {
    var C;
    C = ConnectionModel.extend({
      type: "EniAttachment",
      defaults: {
        index: 1
      },
      initialize: function(attributes) {
        var ami;
        ami = this.getTarget(constant.RESTYPE.INSTANCE);
        if (attributes && attributes.index) {
          this.ensureAttachmentOrder();
        } else {
          this.attributes.index = ami.connectionTargets("EniAttachment").length + 1;
        }
        return null;
      },
      ensureAttachmentOrder: function() {
        var ami, amiConnections, attach, attachments, cnn, idx, newArray, _i, _j, _k, _len, _len1, _len2, _ref;
        ami = this.getTarget(constant.RESTYPE.INSTANCE);
        attachments = ami.connections("EniAttachment");
        for (_i = 0, _len = attachments.length; _i < _len; _i++) {
          attach = attachments[_i];
          if (attach !== this && attach.attributes.index === this.attributes.index) {
            for (idx = _j = 0, _len1 = attachments.length; _j < _len1; idx = ++_j) {
              attach = attachments[idx];
              attach.attributes.index = idx + 1;
              attach.getOtherTarget(ami).updateName();
            }
            return;
          }
        }
        newArray = attachments.sort(function(a, b) {
          return a.attributes.index - b.attributes.index;
        });
        if (attachments.indexOf(this) !== newArray.indexOf(this)) {
          amiConnections = [];
          _ref = ami.get("__connections");
          for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
            cnn = _ref[_k];
            if (cnn.type !== "EniAttachment") {
              amiConnections.push(cnn);
            }
          }
          ami.attributes.__connections = amiConnections.concat(newArray);
        }
        return null;
      },
      remove: function() {
        var SgModel, ami, attach, attachments, eni, startIdx;
        ConnectionModel.prototype.remove.apply(this, arguments);
        ami = this.getTarget(constant.RESTYPE.INSTANCE);
        eni = this.getTarget(constant.RESTYPE.ENI);
        if (!ami.isRemoved()) {
          attachments = ami.connections("EniAttachment");
          startIdx = 1;
          while (startIdx <= attachments.length) {
            attach = attachments[startIdx - 1];
            if (attach.attributes.index !== startIdx) {
              attach.attributes.index = startIdx;
              attach.getTarget(constant.RESTYPE.ENI).updateName();
            }
            ++startIdx;
          }
        }
        if (!ami.isRemoved() && !eni.isRemoved()) {
          SgModel = Design.modelClassForType(constant.RESTYPE.SG);
          SgModel.tryDrawLine(ami, eni);
        }
        return null;
      },
      portDefs: {
        port1: {
          name: "instance-attach",
          type: constant.RESTYPE.INSTANCE
        },
        port2: {
          name: "eni-attach",
          type: constant.RESTYPE.ENI
        }
      }
    }, {
      isConnectable: function(p1Comp, p2Comp) {
        var eni, instance, maxEniCount, p1p, p2p;
        p1p = p1Comp.parent();
        p2p = p2Comp.parent();
        if (!p1p || !p2p) {
          return false;
        }
        if (p1p.type === constant.RESTYPE.SUBNET) {
          p1p = p1p.parent();
          p2p = p2p.parent();
        }
        if (p1p !== p2p) {
          return false;
        }
        if (p1Comp.type === constant.RESTYPE.INSTANCE) {
          instance = p1Comp;
          eni = p2Comp;
        } else {
          instance = p2Comp;
          eni = p1Comp;
        }
        if (eni.connections("EniAttachment").length > 0) {
          return false;
        }
        maxEniCount = instance.getMaxEniCount();
        if (instance.connections("EniAttachment").length + 1 >= maxEniCount) {
          return sprintf(lang.CANVAS.CVS_WARN_EXCEED_ENI_LIMIT, instance.get("name"), instance.get("instanceType"), maxEniCount);
        }
        if (instance.getEmbedEni().get("assoPublicIp") === true) {
          return {
            confirm: true,
            title: lang.CANVAS.ATTACH_NETWORK_INTERFACE_TO_INTERFACE,
            action: lang.CANVAS.ATTACH_AND_REMOVE_PUBLIC_IP,
            template: MC.template.modalAttachingEni({
              host: instance.get("name"),
              eni: eni.get("name")
            })
          };
        }
        return true;
      }
    });
    return C;
  });

}).call(this);
