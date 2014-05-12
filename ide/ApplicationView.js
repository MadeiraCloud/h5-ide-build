
/*
----------------------------
  This is the core / entry point / controller of the whole IDE.
  It contains some basical logics to maintain the IDE. And it holds other components
  to provide other functionality
----------------------------
 */

(function() {
  define(["backbone"], function(Backbone) {
    return Backbone.View.extend({
      toggleWSStatus: function(isConnected) {
        if (isConnected) {
          return $(".disconnected-msg").remove();
        } else {
          if ($(".disconnected-msg").show().length > 0) {
            return;
          }
          return $(MC.template.disconnectedMsg()).appendTo("body").on("mouseover", function() {
            $(".disconnected-msg").addClass("hovered");
            $("body").on("mousemove.disconnectedmsg", function(e) {
              var msg, pos, x, y;
              msg = $(".disconnected-msg");
              pos = msg.offset();
              x = e.pageX;
              y = e.pageY;
              if (x < pos.left || y < pos.top || x >= pos.left + msg.outerWidth() || y >= pos.top + msg.outerHeight()) {
                $("body").off("mousemove.disconnectedmsg");
                msg.removeClass("hovered");
              }
            });
          });
        }
      }
    });
  });

}).call(this);
