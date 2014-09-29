(function() {
  define(["Design"], function(Design) {
    Design.debug = function() {
      var a, checkedMap, id, _ref;
      checkedMap = {
        "line": {},
        "node": {},
        "group": {},
        "otherResource": {},
        "otherConnection": {}
      };
      _ref = Design.instance().__componentMap;
      for (id in _ref) {
        a = _ref[id];
        if (a.node_group) {
          checkedMap.group[a.id] = a;
        } else if (a.node_line) {
          if (a.isVisual()) {
            checkedMap.line[a.id] = a;
          } else {
            checkedMap.otherConnection[a.id] = a;
          }
        } else {
          if (a.isVisual()) {
            checkedMap.node[a.id] = a;
          } else {
            checkedMap.otherResource[a.id] = a;
          }
        }
      }
      return checkedMap;
    };
    Design.debug.selectedComp = function() {
      return App.workspaces.getAwakeSpace().getSelectedComponent();
    };
    Design.debug.selectedCompState = function() {
      var comp, _ref;
      comp = (_ref = Design.debug.selectedComp()) != null ? _ref.serialize()[1] : void 0;
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
    Design.debug.autoLayout = function() {
      return App.workspaces.getAwakeSpace().view.canvas.autoLayout();
    };
    Design.debug.getDataFromLocal = function(app_id) {
      return JSON.parse(localStorage.getItem("get_resource/" + app_id));
    };
    Design.debug.setDataToLocal = function(data) {
      return localStorage.setItem("get_resource/" + data.app_json.id, JSON.stringify(data));
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
    return null;
  });

}).call(this);
