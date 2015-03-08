(function() {
  define(["CanvasView", "constant", "i18n!/nls/lang.js", "../template/TplOpsEditor", "Design"], function(CanvasView, constant, lang, TplOpsEditor, Design) {
    var isPointInRect;
    isPointInRect = function(point, rect) {
      return rect.x1 <= point.x && rect.y1 <= point.y && rect.x2 >= point.x && rect.y2 >= point.y;
    };
    return CanvasView.extend({
      initialize: function() {
        CanvasView.prototype.initialize.apply(this, arguments);
        return this.$el.addClass("marathon").toggleClass("empty", !this.hasItems()).append(TplOpsEditor.canvas.placeholder());
      },
      hasItems: function() {
        return this.items().length > 1;
      },
      recreateStructure: function() {
        this.svg.clear().add([this.svg.group().classes("layer_group"), this.svg.group().classes("layer_line"), this.svg.group().classes("layer_node")]);
      },
      appendGroup: function(svgEl) {
        var el, self;
        el = this.__appendSvg(svgEl, ".layer_group");
        self = this;
        setTimeout((function() {
          return self.sortGroup();
        }), 0);
        return el;
      },
      sortGroup: function() {
        var ch, childrens, g, groups, idx, needToUpdate, parent, _i, _j, _k, _len, _len1, _len2;
        groups = _.chain(this.items()).filter(function(i) {
          return i.type === constant.RESTYPE.MRTHGROUP;
        }).sortBy(function(i) {
          return i.parentCount();
        }).map(function(i) {
          return i.$el[0];
        }).value();
        parent = $(this.svg.node).children(".layer_group")[0];
        childrens = $(parent).children().splice(0);
        needToUpdate = false;
        for (idx = _i = 0, _len = childrens.length; _i < _len; idx = ++_i) {
          g = childrens[idx];
          if (groups[idx] !== g) {
            needToUpdate = true;
            break;
          }
        }
        if (!needToUpdate) {
          return;
        }
        for (_j = 0, _len1 = childrens.length; _j < _len1; _j++) {
          ch = childrens[_j];
          parent.removeChild(ch);
        }
        for (idx = _k = 0, _len2 = groups.length; _k < _len2; idx = ++_k) {
          g = groups[idx];
          parent.appendChild(g);
        }
      },
      fixConnection: function(coord, initiator, target) {},
      highLightItems: function() {},
      appendNode: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_node");
      },
      appendline: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_line");
      },
      addItem: function() {
        this.$el.removeClass("empty");
        return CanvasView.prototype.addItem.apply(this, arguments);
      },
      removeItem: function() {
        CanvasView.prototype.removeItem.apply(this, arguments);
        return this.$el.toggleClass("empty", !this.hasItems());
      },
      errorMessageForDrop: function(type) {
        switch (type) {
          case constant.RESTYPE.VOL:
            return lang.CANVAS.WARN_NOTMATCH_VOLUME;
          case constant.RESTYPE.SUBNET:
            return lang.CANVAS.WARN_NOTMATCH_SUBNET;
          case constant.RESTYPE.INSTANCE:
            return lang.CANVAS.WARN_NOTMATCH_INSTANCE_SUBNET;
          case constant.RESTYPE.ENI:
            return lang.CANVAS.WARN_NOTMATCH_ENI;
          case constant.RESTYPE.RT:
            return lang.CANVAS.WARN_NOTMATCH_RTB;
          case constant.RESTYPE.ELB:
            return lang.CANVAS.WARN_NOTMATCH_ELB;
          case constant.RESTYPE.CGW:
            return lang.CANVAS.WARN_NOTMATCH_CGW;
          case constant.RESTYPE.ASG:
            return lang.CANVAS.WARN_NOTMATCH_ASG;
          case constant.RESTYPE.IGW:
            return lang.CANVAS.WARN_NOTMATCH_IGW;
          case constant.RESTYPE.VGW:
            return lang.CANVAS.WARN_NOTMATCH_VGW;
          case constant.RESTYPE.DBSBG:
            return lang.CANVAS.WARN_NOTMATCH_SGP_VPC;
          case constant.RESTYPE.DBINSTANCE:
            return lang.CANVAS.WARN_NOTMATCH_DBINSTANCE_SGP;
        }
      },
      isReadOnly: function() {
        return this.design.modeIsApp();
      }
    });
  });

}).call(this);
