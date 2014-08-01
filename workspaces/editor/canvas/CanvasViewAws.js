(function() {
  define(["./CanvasBundle", "constant", "i18n!/nls/lang.js", "./CpVolume", "./CanvasManager", "Design"], function(CanvasView, constant, lang, VolumePopup, CanvasManager, Design) {
    var AwsCanvasView, isPointInRect;
    isPointInRect = function(point, rect) {
      return rect.x1 <= point.x && rect.y1 <= point.y && rect.x2 >= point.x && rect.y2 >= point.y;
    };
    AwsCanvasView = CanvasView.extend({
      events: function() {
        return $.extend({
          "addVol_dragover": "__addVolDragOver",
          "addVol_dragleave": "__addVolDragLeave",
          "addVol_drop": "__addVolDrop"
        }, CanvasView.prototype.events);
      },
      recreateStructure: function() {
        this.svg.clear().add([this.svg.group().classes("layer_vpc"), this.svg.group().classes("layer_az"), this.svg.group().classes("layer_subnet"), this.svg.group().classes("layer_line"), this.svg.group().classes("layer_asg"), this.svg.group().classes("layer_sgline"), this.svg.group().classes("layer_node")]);
      },
      appendVpc: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_vpc");
      },
      appendAz: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_az");
      },
      appendSubnet: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_subnet");
      },
      appendAsg: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_asg");
      },
      appendSgline: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_sgline");
      },
      fixConnection: function(coord, initiator, target) {
        var toPort;
        if (target.type === constant.RESTYPE.ELB && (initiator.type === constant.RESTYPE.INSTANCE || initiator.type === constant.RESTYPE.LC)) {
          if (coord.x < target.pos().x + target.size().width / 2) {
            toPort = "elb-sg-out";
          } else {
            toPort = "elb-sg-in";
          }
        } else if (target.type === constant.RESTYPE.ASG || target.type === "ExpandedAsg") {
          target = target.getLc();
          if (target) {
            target = this.getItem(target.id);
          }
        }
        return {
          toPort: toPort,
          target: target
        };
      },
      errorMessageForDrop: function(type) {
        switch (type) {
          case constant.RESTYPE.VOL:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_VOLUME;
          case constant.RESTYPE.SUBNET:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_SUBNET;
          case constant.RESTYPE.INSTANCE:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_INSTANCE_SUBNET;
          case constant.RESTYPE.ENI:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_ENI;
          case constant.RESTYPE.RT:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_RTB;
          case constant.RESTYPE.ELB:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_ELB;
          case constant.RESTYPE.CGW:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_CGW;
          case constant.RESTYPE.ASG:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_ASG;
          case constant.RESTYPE.IGW:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_IGW;
          case constant.RESTYPE.VGW:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_VGW;
          case constant.RESTYPE.DBSBG:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_SGP_VPC;
          case constant.RESTYPE.DBINSTANCE:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_DBINSTANCE_SGP;
        }
      },
      selectVolume: function(volumeId) {
        this.deselectItem(true);
        this.__selectedVolume = volumeId;
        return false;
      },
      isReadOnly: function() {
        return this.design.modeIsApp();
      },
      delSelectedItem: function() {
        var nextVol, s;
        if (this.isReadOnly()) {
          return false;
        }
        if (this.__selectedVolume) {
          s = this.__selectedVolume;
          this.__selectedVolume = null;
          this.design.component(s).remove();
          nextVol = $(".canvas-pp .popup-volume").children().eq(0);
          if (nextVol.length) {
            nextVol.trigger("mousedown");
          } else {
            this.deselectItem();
          }
          return;
        }
        return CanvasView.prototype.delSelectedItem.apply(this, arguments);
      },
      __addVolDragOver: function(evt, data) {
        var RTP, dropzones, el, hoverItem, model, pos, r, targets, tgt, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
        this.__scrollOnDrag(data);
        if (!data.volDropTargets) {
          data.hoverItem = null;
          RTP = constant.RESTYPE;
          targets = this.design.componentsOfType(RTP.INSTANCE).concat(this.design.componentsOfType(RTP.LC));
          data.volDropTargets = dropzones = [];
          for (_i = 0, _len = targets.length; _i < _len; _i++) {
            tgt = targets[_i];
            tgt = this.getItem(tgt.id);
            _ref = tgt.$el;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              el = _ref[_j];
              r = tgt.rect(el);
              r.tgt = tgt;
              r.el = el;
              dropzones.push(r);
            }
          }
        }
        if (!data.effect) {
          data.effect = true;
          _ref1 = data.volDropTargets || [];
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            tgt = _ref1[_k];
            CanvasManager.addClass(tgt.tgt.$el, "droppable");
          }
        }
        pos = this.__localToCanvasCoor(data.pageX - data.zoneDimension.x1, data.pageY - data.zoneDimension.y1);
        hoverItem = null;
        _ref2 = data.volDropTargets;
        for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
          tgt = _ref2[_l];
          if (isPointInRect(pos, tgt)) {
            hoverItem = tgt;
            break;
          }
        }
        if (hoverItem !== data.hoverItem) {
          if (data.popup) {
            data.popup.remove();
          }
          data.hoverItem = hoverItem;
          if (hoverItem) {
            model = hoverItem.tgt.model;
            data.popup = new VolumePopup({
              attachment: hoverItem.el,
              host: model,
              models: model.get("volumeList"),
              canvas: this
            });
          }
        }
      },
      __addVolDragLeave: function(evt, data) {
        var tgt, _i, _len, _ref;
        this.__clearDragScroll();
        _ref = data.volDropTargets || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tgt = _ref[_i];
          CanvasManager.removeClass(tgt.tgt.$el, "droppable");
        }
        data.effect = false;
        if (data.popup) {
          data.popup.remove();
        }
      },
      __addVolDrop: function(evt, data) {
        var VolumeModel, attr, owner, v;
        if (!data.hoverItem) {
          return;
        }
        attr = data.dataTransfer || {};
        owner = data.hoverItem.tgt.model;
        if (attr.id) {
          this.design.component(attr.id).attachTo(owner);
          this.selectItem(data.hoverItem.el);
          return;
        }
        attr.owner = owner;
        if (_.isString(attr.encrypted)) {
          attr.encrypted = attr.encrypted === 'true';
        }
        VolumeModel = Design.modelClassForType(constant.RESTYPE.VOL);
        v = new VolumeModel(attr);
        new VolumePopup({
          attachment: data.hoverItem.el,
          host: owner,
          models: owner.get("volumeList"),
          canvas: this,
          selectAtBegin: v
        });
      }
    });
    return AwsCanvasView;
  });

}).call(this);
