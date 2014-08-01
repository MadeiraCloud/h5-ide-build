(function() {
  define(["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js", "./CanvasView", "component/dbsbgroup/DbSubnetGPopup"], function(CanvasElement, constant, CanvasManager, lang, CanvasView, DbSubnetGPopup) {
    return CanvasElement.extend({

      /* env:dev                                             env:dev:end */
      type: constant.RESTYPE.DBSBG,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [19, 19],
      hover: function() {
        var item, subnet, _i, _len, _ref;
        _ref = this.model.connectionTargets("SubnetgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subnet = _ref[_i];
          item = this.canvas.getItem(subnet.id);
          if (item) {
            CanvasManager.addClass(item.$el, "highlight");
          }
        }
        return false;
      },
      hoverOut: function() {
        var item, subnet, _i, _len, _ref;
        _ref = this.model.connectionTargets("SubnetgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subnet = _ref[_i];
          item = this.canvas.getItem(subnet.id);
          if (item) {
            CanvasManager.removeClass(item.$el, "highlight");
          }
        }
        return false;
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:connections", this.render);
      },
      create: function() {
        var m, svg, svgEl;
        svg = this.canvas.svg;
        svgEl = this.canvas.appendSubnet(this.createGroup());
        svgEl.add([svg.image(MC.IMG_URL + "/ide/icon/sbg-info.png", 12, 12).move(4, 4).classes("tooltip")]);
        $(svgEl.node).children(".group-label").attr({
          x: "18",
          y: "14"
        });
        m = this.model;
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var m, sb, tt, _i, _len, _ref;
        m = this.model;
        this.$el.children("text").text(m.get('name'));
        this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
        tt = [];
        _ref = m.connectionTargets("SubnetgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sb = _ref[_i];
          tt.push(sb.get("name"));
        }
        CanvasManager.update(this.$el.children(".tooltip"), tt.join(", ") || "No subnet is assigned to this subnet group yet", "tooltip");
      },
      doDestroyModel: function() {
        this.hoverOut();
        return CanvasElement.prototype.doDestroyModel.apply(this, arguments);
      }
    }, {
      createResource: function(type, attr, option) {
        var model;
        if (!attr.parent) {
          return;
        }
        model = CanvasElement.createResource(constant.RESTYPE.DBSBG, attr, option);
        new DbSubnetGPopup({
          model: model
        });
      }
    });
  });

}).call(this);
