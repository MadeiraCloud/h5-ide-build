(function() {
  define(['CloudResources'], function(CloudResources) {
    var CanvasManager;
    CanvasManager = {
      hasClass: function(elements, klass) {
        var element, k, _i, _len;
        if (!elements) {
          return false;
        }
        if (!elements.length && elements.length !== 0) {
          elements = [elements];
        }
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          element = elements[_i];
          k = " " + (element.getAttribute("class") || "") + " ";
          if (k.indexOf(" " + klass + " ") >= 0) {
            return true;
          }
        }
        return false;
      },
      removeClass: function(elements, theClass) {
        var element, klass, newKlass, _i, _len;
        if (!elements) {
          return this;
        }
        if (!elements.length && elements.length !== 0) {
          elements = [elements];
        }
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          element = elements[_i];
          klass = element.getAttribute("class") || "";
          newKlass = klass.replace(new RegExp("\\b" + theClass + "\\b", "g"), "");
          if (klass !== newKlass) {
            element.setAttribute("class", newKlass);
          }
        }
        return this;
      },
      addClass: function(elements, theClass) {
        var element, klass, _i, _len;
        if (!elements) {
          return this;
        }
        if (!elements.length && elements.length !== 0) {
          elements = [elements];
        }
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          element = elements[_i];
          klass = element.getAttribute("class") || "";
          if (!klass.match(new RegExp("\\b" + theClass + "\\b"))) {
            klass = $.trim(klass) + " " + theClass;
            element.setAttribute("class", klass);
          }
        }
        return this;
      },
      toggle: function(element, isShow) {
        if (element.hasOwnProperty("length")) {
          element = element[0];
        }
        if (!element) {
          return this;
        }
        if (isShow === null || isShow === void 0) {
          isShow = element.getAttribute("display") === "none";
        }
        if (isShow) {
          element.setAttribute("display", "inline");
          element.setAttribute("style", "");
          if (element.getAttribute("data-tooltip")) {
            this.addClass(element, "tooltip");
          }
        } else {
          element.setAttribute("display", "none");
          element.setAttribute("style", "opacity:0");
          this.removeClass(element, "tooltip");
        }
        return this;
      },
      updateEip: function(node, targetModel) {
        var imgUrl, ip, toggle, tootipStr, _ref;
        if (node.length) {
          node = node[0];
        }
        toggle = targetModel.hasPrimaryEip();
        if (toggle) {
          tootipStr = 'Detach Elastic IP from primary IP';
          imgUrl = 'ide/icon/eip-on.png';
        } else {
          tootipStr = 'Associate Elastic IP to primary IP';
          imgUrl = 'ide/icon/eip-off.png';
        }
        if (targetModel.design().modeIsApp()) {
          if (targetModel.getEmbedEni) {
            targetModel = targetModel.getEmbedEni();
          }
          ip = (targetModel.get("ips") || [])[0];
          tootipStr = (ip != null ? (_ref = ip.eipData) != null ? _ref.publicIp : void 0 : void 0) || "";
        }
        node.setAttribute("data-tooltip", tootipStr);
        $(node).data("tooltip", tootipStr);
        this.update(node, imgUrl, "href");
        return null;
      },
      update: function(element, value, attr) {
        var el, href, _i, _j, _len, _len1, _results, _results1;
        if (_.isString(element)) {
          element = document.getElementById(element);
        }
        element = $(element);
        if (!attr) {
          return element.text(MC.truncate(value, 17));
        } else if (attr === "href" || attr === "image") {
          value = MC.IMG_URL + value;
          _results = [];
          for (_i = 0, _len = element.length; _i < _len; _i++) {
            el = element[_i];
            href = el.getAttributeNS("http://www.w3.org/1999/xlink", "href");
            if (href !== value) {
              _results.push(el.setAttributeNS("http://www.w3.org/1999/xlink", "href", value));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        } else if (attr === "tooltip") {
          element.data("tooltip", value).attr("data-tooltip", value);
          _results1 = [];
          for (_j = 0, _len1 = element.length; _j < _len1; _j++) {
            el = element[_j];
            if (value) {
              _results1.push(CanvasManager.addClass(el, "tooltip"));
            } else {
              _results1.push(CanvasManager.removeClass(el, "tooltip"));
            }
          }
          return _results1;
        } else if (attr === "color") {
          return element.attr("style", "fill:" + value);
        } else {
          return element.attr(attr, value);
        }
      }
    };
    return CanvasManager;
  });

}).call(this);
