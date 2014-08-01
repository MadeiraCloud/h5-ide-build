(function() {
  define(["backbone"], function() {
    return Backbone.View.extend({
      type: "CanvasPopup",
      attachType: "float",
      closeOnBlur: false,
      className: "canvas-pp",
      initialize: function(data) {
        var ac, ceItem, oldPoup, self;
        console.info("Showing canvas popup");
        console.assert(data.canvas);
        console.assert(data.attachment, "Canvas popup must be attached to some element");
        $.extend(this, data);
        this.$el.appendTo(this.canvas.__getCanvasView().parent());
        this.render();
        if (this.closeOnBlur) {
          self = this;
          ac = function(evt) {
            if (self.autoclose(evt)) {
              self.canvas.$el[0].removeEventListener("mousedown", ac, true);
            }
          };
          this.canvas.$el[0].addEventListener("mousedown", ac, true);
        }
        ceItem = this.canvas.getItem($(this.attachment).closest(".canvasel").attr("data-id"));
        console.assert(ceItem, "Canvas popup must be attached to a canvas element");
        if (!ceItem.__popupCache) {
          ceItem.__popupCache = {};
        }
        oldPoup = ceItem.__popupCache[this.type];
        ceItem.__popupCache[this.type] = this;
        if (oldPoup) {
          this.migrate(oldPoup);
          oldPoup.remove();
        }
        this.canvas.registerPopup(this);
      },
      migrate: function(oldPopup) {},
      autoclose: function(evt) {
        var popup;
        popup = $(evt.target).closest(".canvas-pp");
        if (popup.length && popup[0] === this.$el[0]) {
          return false;
        }
        this.remove();
        return true;
      },
      render: function() {
        this.$el.html(this.content());
        if (this.attachType === "float") {
          this.attachFloat();
        } else {
          this.attachOverlay();
        }
      },
      attachFloat: function() {
        var attachment, canvasview, canvaswrapper, viewportX, width, x;
        attachment = this.attachment.getBoundingClientRect();
        canvaswrapper = this.canvas.$el[0].getBoundingClientRect();
        canvasview = this.canvas.__getCanvasView()[0].getBoundingClientRect();
        viewportX = attachment.left - canvaswrapper.left;
        width = this.$el.outerWidth(true);
        if (viewportX > width + 20) {
          this.$el.addClass("pp-left");
          x = attachment.left - canvasview.left - width;
        } else {
          this.$el.addClass("pp-right");
          x = attachment.right - canvasview.left;
        }
        this.$el.css({
          left: x,
          top: attachment.top - canvasview.top + (attachment.height - this.$el.outerHeight(true)) / 2
        });
      },
      attachOverlay: function() {
        var attachment, canvasview;
        attachment = this.attachment.getBoundingClientRect();
        canvasview = this.canvas.__getCanvasView()[0].getBoundingClientRect();
        this.$el.css({
          left: attachment.left - canvasview.left,
          top: attachment.top - canvasview.top
        });
      },
      remove: function() {
        var ceItem, oldPoup;
        this.canvas.registerPopup(this);
        ceItem = this.canvas.getItem($(this.attachment).closest(".canvasel").attr("data-id"));
        oldPoup = ceItem.__popupCache[this.type];
        if (oldPoup === this) {
          delete ceItem.__popupCache[this.type];
        }
        if (this.onRemove) {
          this.onRemove();
        }
        return Backbone.View.prototype.remove.call(this);
      },
      content: function() {}
    });
  });

}).call(this);
