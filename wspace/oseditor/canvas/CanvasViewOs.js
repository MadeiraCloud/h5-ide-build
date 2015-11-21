define(["CanvasView", "constant", "i18n!/nls/lang.js", "CanvasManager", "Design", "./CpVolume"], function(CanvasView, constant, lang, CanvasManager, Design, VolumePopup) {
  var OsCanvasView, isPointInRect;
  isPointInRect = function(point, rect) {
    return rect.x1 <= point.x && rect.y1 <= point.y && rect.x2 >= point.x && rect.y2 >= point.y;
  };
  OsCanvasView = CanvasView.extend({
    events: function() {
      return $.extend({
        "addVol_dragover": "__addVolDragOver",
        "addVol_dragleave": "__addVolDragLeave",
        "addVol_drop": "__addVolDrop"
      }, CanvasView.prototype.events);
    },
    recreateStructure: function() {
      this.svg.clear().add([this.svg.group().classes("layer_network"), this.svg.group().classes("layer_groupLine"), this.svg.group().classes("layer_subnet"), this.svg.group().classes("layer_line"), this.svg.group().classes("layer_node")]);
    },
    appendNetwork: function(svgEl) {
      return this.__appendSvg(svgEl, ".layer_network");
    },
    appendSubnet: function(svgEl) {
      return this.__appendSvg(svgEl, ".layer_subnet");
    },
    appendGroupLine: function(svgEl) {
      return this.__appendSvg(svgEl, ".layer_groupLine");
    },
    fixConnection: function(coord, initiator, target) {},
    errorMessageForDrop: function(type) {
      switch (type) {
        case constant.RESTYPE.OSSUBNET:
          return lang.CANVAS.WARN_NOTMATCH_OSSUBNET;
        case constant.RESTYPE.OSLISTENER:
          return lang.CANVAS.WARN_NOTMATCH_LISTENER;
        case constant.RESTYPE.OSPOOL:
          return lang.CANVAS.WARN_NOTMATCH_POOL;
        case constant.RESTYPE.OSELB:
          return lang.CANVAS.WARN_NOTMATCH_LB;
        case constant.RESTYPE.OSRT:
          return lang.CANVAS.WARN_NOTMATCH_ROUTER;
        case constant.RESTYPE.OSRT:
          return lang.CANVAS.WARN_NOTMATCH_ROUTER;
        case constant.RESTYPE.OSVOL:
          return lang.CANVAS.WARN_NOTMATCH_OSVOL;
        case constant.RESTYPE.OSSERVER:
          return lang.CANVAS.WARN_NOTMATCH_SERVER;
      }
    },
    selectVolume: function(volumeId) {
      this.deselectItem(true);
      if (volumeId) {
        this.triggerSelected(constant.RESTYPE.OSVOL, volumeId);
      }
      this.__selectedVolume = volumeId;
      return false;
    },
    isReadOnly: function() {
      return this.design.modeIsApp();
    },
    delSelectedItem: function() {
      var nextVol, res, s, volume;
      if (this.isReadOnly()) {
        return false;
      }
      if (this.__selectedVolume) {
        volume = this.design.component(this.__selectedVolume);
        res = volume.isRemovable();
        if (_.isString(res)) {
          notification("error", res);
          return;
        }
        s = this.__selectedVolume;
        this.__selectedVolume = null;
        volume.remove();
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
      var dropzones, el, hoverItem, model, pos, r, tgt, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
      this.__scrollOnDrag(data);
      if (!data.volDropTargets) {
        data.hoverItem = null;
        data.volDropTargets = dropzones = [];
        _ref = this.design.componentsOfType(constant.RESTYPE.OSSERVER);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tgt = _ref[_i];
          tgt = this.getItem(tgt.id);
          _ref1 = tgt.$el;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            el = _ref1[_j];
            r = tgt.rect(el);
            r.tgt = tgt;
            r.el = el;
            dropzones.push(r);
          }
        }
      }
      if (!data.effect) {
        data.effect = true;
        _ref2 = data.volDropTargets || [];
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          tgt = _ref2[_k];
          CanvasManager.addClass(tgt.tgt.$el, "droppable");
        }
      }
      pos = this.__localToCanvasCoor(data.pageX - data.zoneDimension.x1, data.pageY - data.zoneDimension.y1);
      hoverItem = null;
      _ref3 = data.volDropTargets;
      for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
        tgt = _ref3[_l];
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
            models: model.volumes(),
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
      var VolumeModel, attr, doable, oldServer, owner, v, volume;
      if (!data.hoverItem) {
        return;
      }
      attr = data.dataTransfer || {};
      owner = data.hoverItem.tgt.model;
      if (attr.id) {
        volume = this.design.component(attr.id);
        oldServer = volume.getOwner();
        doable = volume.isReparentable(owner);
        if (_.isString(doable)) {
          return notification("error", doable);
        } else if (doable) {
          volume.attachTo(owner);
          this.selectItem(data.hoverItem.el);
        }
        return;
      }
      attr.owner = owner;
      VolumeModel = Design.modelClassForType(constant.RESTYPE.OSVOL);
      v = new VolumeModel(attr);
      if (data.popup) {
        data.popup.remove();
      }
      new VolumePopup({
        attachment: data.hoverItem.el,
        host: owner,
        models: owner.volumes(),
        canvas: this,
        selectAtBegin: v
      });
    }
  });
  return OsCanvasView;
});
