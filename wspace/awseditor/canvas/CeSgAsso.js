(function() {
  define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                        env:dev:end */
      type: "SgAsso",
      initialize: function(options) {
        var canvas, self, toRenderTargetId;
        this.listenTo(this.model.getTarget(constant.RESTYPE.SG), "change:name", this.render);
        this.canvas = canvas = options.canvas;
        this.$el = $();
        if (!canvas.__sgAssoToRender) {
          canvas.__sgAssoToRender = {};
        }
        toRenderTargetId = this.model.getOtherTarget(constant.RESTYPE.SG).id;
        canvas.__sgAssoToRender[toRenderTargetId] = this.cid;
        self = this;
        _.defer(function() {
          var item, tgtAssoId;
          tgtAssoId = canvas.__sgAssoToRender[toRenderTargetId];
          delete canvas.__sgAssoToRender[toRenderTargetId];
          item = canvas.getItem(tgtAssoId);
          if (item) {
            item.render();
          }
        });
        CanvasElement.prototype.initialize.call(this, options);
      },
      remove: function() {
        this.render();
        this.stopListening();
      },
      update: function() {},
      render: function() {
        var childrens, i, m, res_node, resource, sg, sgs;
        if (this.canvas.initializing) {
          return;
        }
        m = this.model;
        resource = m.getOtherTarget(constant.RESTYPE.SG);
        res_node = this.canvas.getItem(resource.id);
        if (!res_node) {
          return;
        }
        sgs = m.sortedSgList();
        if (sgs.length > 5) {
          sgs.length = 5;
        }
        childrens = res_node.$el.children(".node-sg-color-group").children(":first-child");
        i = 0;
        while (i < 5) {
          sg = sgs[i];
          if (sg) {
            CanvasManager.update(childrens, sg.color, "color");
            CanvasManager.update(childrens, sg.get("name"), "tooltip");
          } else {
            CanvasManager.update(childrens, "none", "color");
            CanvasManager.update(childrens, "", "tooltip");
          }
          ++i;
          childrens = childrens.next();
        }
      }
    });
  });

}).call(this);
