(function() {
  define(["Design"], function(Design) {
    var DESIGN_PROTOTYPE, NEW_DESIGN_PROTOTYPE, func, funcName;
    Design.debug = function() {
      var a, canvasGroups, canvasNodes, checked, checkedMap, componentMap, id;
      componentMap = Design.instance().__componentMap;
      canvasNodes = Design.instance().__canvasNodes;
      canvasGroups = Design.instance().__canvasGroups;
      checkedMap = {
        "line": {},
        "node": {},
        "group": {},
        "otherResource": {},
        "otherConnection": {}
      };
      checked = {};
      for (id in canvasNodes) {
        a = canvasNodes[id];
        checked[id] = true;
        checkedMap.node[a.id] = a;
      }
      for (id in canvasGroups) {
        a = canvasGroups[id];
        checked[id] = true;
        checkedMap.group[a.id] = a;
      }
      for (id in componentMap) {
        a = componentMap[id];
        if (checked[id]) {
          continue;
        }
        if (a.node_line) {
          if (a.isVisual()) {
            checkedMap.line[a.id] = a;
          } else {
            checkedMap.otherConnection[a.id] = a;
          }
        } else {
          checkedMap.otherResource[a.id] = a;
        }
      }
      return checkedMap;
    };
    Design.debug.selectedComp = function() {
      return Design.instance().component($("#svg_canvas").find(".selected").attr("id"));
    };
    Design.debug.selectedCompState = function() {
      var comp;
      comp = Design.instance().component($("#svg_canvas").find(".selected").attr("id")).serialize()[1];
      if (comp && comp.component && comp.component.state) {
        return '{\n\t"component": {\n\t\t"init" : {\n\t\t\t"state": ' + JSON.stringify(comp.component.state) + '\n\t\t}\n\t}\n}\n';
      } else {
        return "no state for selected component";
      }
    };
    Design.debug.diff = function(e) {
      require(["component/jsonviewer/JsonViewer"], function(JsonViewer) {
        var d;
        d = Design.instance();
        return JsonViewer.showDiffDialog(d.__opsModel.getJsonData(), d.serialize());
      });
      return null;
    };
    Design.debug.json = function() {
      var data;
      data = Design.instance().serialize();
      console.log(data);
      return JSON.stringify(data);
    };
    Design.debug["export"] = function() {
      var a, blob, data, e, filename;
      filename = 'CanvasData.json';
      data = Design.debug.json();
      blob = new Blob([data], {
        type: 'text/json'
      });
      e = document.createEvent('MouseEvents');
      a = document.createElement('a');
      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
      return null;
    };
    Design.debug.view = function(e) {
      var data;
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      data = Design.instance().serialize();
      require(["component/jsonviewer/JsonViewer"], function(JsonViewer) {
        return JsonViewer.showViewDialog(data);
      });
      return null;
    };
    Design.debug.checkValidDesign = function() {
      dd().eachComponent(function(comp) {
        if (comp.design() === D.instance()) {
          console.log("Valid design");
        } else {
          console.log("Invalid design");
        }
        return null;
      });
      return null;
    };
    window.d = function() {
      return Design.instance();
    };
    window.dd = Design.debug;
    window.dget = function(a) {
      return Design.instance().get(a);
    };
    window.dset = function(a, b) {
      return Design.instance().set(a, b);
    };
    window.dds = function() {
      return Design.debug.json();
    };
    window.man = "d()          Return the current Design instance \n dd()         Print all components in current Design \n dget(a)      Design att getter \n dset(a,b)    Design att setter \n dds()        Print JSON \n copy(dds())  Copy JSON";

    /*
    In the following block of code, we hijack some design's methods to test if the design is current design. If it's not, we print a warning to console. Making it easier to debug if something goes wrong.
     */

    /* jshint -W083 */
    DESIGN_PROTOTYPE = Design.DesignImpl.prototype;
    Design.DesignImpl.prototype = NEW_DESIGN_PROTOTYPE = {};
    for (funcName in DESIGN_PROTOTYPE) {
      func = DESIGN_PROTOTYPE[funcName];
      if (!DESIGN_PROTOTYPE.hasOwnProperty(funcName)) {
        continue;
      }
      if (!funcName.match(/refreshAppUpdate|cacheComponent|getCost|diff|onAwsResourceUpdated/)) {
        NEW_DESIGN_PROTOTYPE[funcName] = DESIGN_PROTOTYPE[funcName];
        continue;
      }
      NEW_DESIGN_PROTOTYPE[funcName] = (function() {
        var method;
        method = funcName;
        return function() {
          if (this !== Design.instance()) {
            console.warn("The context of the calling function is not current Design object. Every function in Design should only be call if the context is the current Design object. This is a tradeoff to make the API easier to use. \n\nIn order to avoid this limilation. One should change something like : \n  myDesign." + method + "(); \nto :\n  var currentDesign = Design.instance();\n  myDesign.use(); \n  myDesign." + method + "(); \n  currentDesign.use();");
            console.warn("Context :", this, "Current Design :", Design.instance(), "Stack Trace :", (new Error()).stack.replace("Error", ""));
          }
          return DESIGN_PROTOTYPE[method].apply(this, arguments);
        };
      })();
    }

    /* jshint +W083 */
    return null;
  });

}).call(this);
