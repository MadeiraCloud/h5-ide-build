define(["event", "./diff", "./view", "./JsonDiffLib", "UI.modalplus", "./jqUi"], function(ide_event, tplDiff, tplView, jsond, modalPlus) {
  var applyViewFilter, componentData, selectedComponetUid, showChangesOnly, updateViewDialog;
  componentData = null;
  selectedComponetUid = ".";
  ide_event.on(ide_event.OPEN_PROPERTY, function(type, id) {
    if ($("#jsonViewer").length) {
      selectedComponetUid = id || ".";
      applyViewFilter();
    }
    return null;
  });
  showChangesOnly = function() {
    if ($("#diffChangesOnly").is(":checked")) {
      $("#jsondiffContainer").toggleClass("changesOnly", true);
      $("#jsondiffContainer").find(".changed, .added, .removed").each(function(idx, el) {
        var p;
        p = $(el).parent();
        while (p.attr("id") !== "jsondiffContainer") {
          p.toggleClass("hasChanges", true).removeClass("closed");
          p = p.parent();
        }
        return null;
      });
    } else {
      $("#jsondiffContainer").removeClass("changesOnly");
    }
    return null;
  };
  applyViewFilter = function() {
    var comp, filterText, filterType, show, shown, shownTarget, uid, uidChild, _i, _len, _ref;
    filterText = $.trim($("#diffSearch").val());
    filterType = $("#diffTypeSelect").val() || ".";
    shown = 0;
    shownTarget = null;
    _ref = $("#jsonCompContainer").children().children("li").children().children("span");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      uidChild = _ref[_i];
      uidChild = $(uidChild);
      uid = uidChild.children(":first-child").text().replace(": ", "");
      comp = componentData[uid];
      if (!filterText || comp.uid.indexOf(filterText) !== -1 || comp.type.indexOf(filterText) !== -1 || comp.name.indexOf(filterText) !== -1) {
        show = true;
      } else {
        show = false;
      }
      if (filterType === "selected") {
        if (comp.uid !== selectedComponetUid && selectedComponetUid !== ".") {
          show = false;
        }
      } else if (comp.type.indexOf(filterType) === -1) {
        show = false;
      }
      if (show) {
        ++shown;
        shownTarget = uidChild.parent();
      }
      if (show) {
        uidChild.parent().parent().css({
          "display": ""
        });
      } else {
        uidChild.parent().parent().css({
          "display": "none"
        });
      }
    }
    if (selectedComponetUid === "." && filterType === "selected") {
      $("#jsonCompContainer").children().children("li").children().addClass("closed");
    } else {
      if (shown === 1) {
        shownTarget.removeClass("closed");
      }
    }
    return null;
  };
  updateViewDialog = function(canvas_data) {
    var attributes, comp, component, layout, selectOptions, type, typeArr, typeMap, uid, _i, _len, _ref, _ref1;
    component = canvas_data.component;
    layout = canvas_data.layout;
    delete canvas_data.component;
    delete canvas_data.layout;
    componentData = component;
    attributes = $.extend(true, {}, canvas_data);
    jsond.compare(attributes, attributes, "attribute", $("#jsonAttrContainer").empty()[0]);
    jsond.compare(component, component, "component", $("#jsonCompContainer").empty()[0]);
    jsond.compare(layout, layout, "layout", $("#jsonLayoutContainer").empty()[0]);
    $("#jsonCompContainer, #jsonAttrContainer, #jsonLayoutContainer").children().removeClass("closed");
    typeMap = {};
    typeArr = [];
    for (uid in component) {
      comp = component[uid];
      if (!typeMap[comp.type]) {
        typeMap[comp.type] = true;
        typeArr.push(comp.type);
      }
    }
    selectOptions = "<option value='.'>All</option><option value='selected' selected='selected'>Selected Component</option><option value='.'>----------</option>";
    selectedComponetUid = ((_ref = debug.selectedComp()) != null ? _ref.id : void 0) || ".";
    _ref1 = typeArr.sort();
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      type = _ref1[_i];
      selectOptions += "<option value='" + type + "'>" + type + "</option>";
    }
    $("#diffTypeSelect").html(selectOptions);
    applyViewFilter();
    return null;
  };
  return {
    showDiffDialog: function(json1, json2) {
      var modal;
      modal = new modalPlus({
        title: "JSON Diff",
        compact: true,
        template: tplDiff()
      });
      modal.tpl.css({
        width: "98%",
        height: "98%",
        top: "1%",
        left: "1%"
      });
      modal.setWidth("100%");
      $("#diffTextarea1").val(JSON.stringify(json1));
      $("#diffTextarea2").val(JSON.stringify(json2));
      jsond.compare(json1, json2, "CanvasData", $("#jsondiffContainer")[0]);
      modal.tpl.on("click", "ul", function(e) {
        if (e.target.tagName && e.target.tagName.toUpperCase() === "UL") {
          $(e.target).toggleClass("closed");
        }
        return false;
      });
      $("#diffTextarea1, #diffTextarea2").on("focus", function() {
        setTimeout(((function(_this) {
          return function() {
            return $(_this).select();
          };
        })(this)), 10);
        return null;
      });
      $("#diffSwap").on("click", function() {
        var j1;
        j1 = $("#diffTextarea1").val();
        $("#diffTextarea1").val($("#diffTextarea2").val());
        $("#diffTextarea2").val(j1);
        return null;
      });
      $("#diffClear").on("click", function() {
        $("#diffTextarea1").val("");
        $("#diffTextarea2").val("");
        return null;
      });
      $("#diffCompare").on("click", function() {
        var e, j1, j2;
        try {
          j1 = JSON.parse($("#diffTextarea1").css({
            "background": ""
          }).val());
        } catch (_error) {
          e = _error;
          $("#diffTextarea1").css({
            "background": "res"
          });
        }
        try {
          j2 = JSON.parse($("#diffTextarea2").css({
            "background": ""
          }).val());
        } catch (_error) {
          e = _error;
          $("#diffTextarea2").css({
            "background": "res"
          });
        }
        if (j1 && j2) {
          jsond.compare(j1, j2, "CanvasData", $("#jsondiffContainer").empty()[0]);
        }
        showChangesOnly();
        return null;
      });
      showChangesOnly();
      $("#diffChangesOnly").on("change", function(e) {
        showChangesOnly();
        return null;
      });
      return null;
    },
    showViewDialog: function(canvas_data) {
      var modal, updateTO;
      if ($("#jsonViewer").length) {
        $("#diffWrap").hide();
        $("#jsonViewer .modal-header").dblclick();
        return null;
      }
      modal = new modalPlus({
        title: "Data View",
        template: tplView(),
        width: "100%",
        disableFooter: true,
        compact: true
      });
      modal.tpl.attr("id", "jsonViewer").css({
        width: "98%",
        height: "98%",
        top: "1%",
        left: "1%"
      });
      updateViewDialog(canvas_data);
      $("#jsonViewer").on("click", "ul", function(e) {
        if (e.target.tagName && e.target.tagName.toUpperCase() === "UL") {
          $(e.target).toggleClass("closed");
        }
        return false;
      });
      $("#jsonViewer").on("dblclick", ".modal-header", function() {
        var $wrap;
        $wrap = modal.$(".modal-body");
        if ($wrap.is(":hidden")) {
          $("#jsonViewer").css({
            "height": $("#jsonViewer").attr("data-height") || "98%",
            "width": $("#jsonViewer").attr("data-width") || "98%",
            "min-width": "540px"
          });
          $wrap.show();
        } else {
          $("#jsonViewer").attr({
            "data-height": $("#jsonViewer").height(),
            "data-width": $("#jsonViewer").width()
          }).css({
            "height": "auto",
            "width": "150px",
            "min-width": "150px"
          });
          $wrap.hide();
        }
        return null;
      });
      $("#diffRefresh").on("click", function() {
        return updateViewDialog(d().serialize());
      });
      updateTO = null;
      $("#diffSearch").on("keydown", function() {
        if (updateTO) {
          clearTimeout(updateTO);
        }
        updateTO = setTimeout(function() {
          return applyViewFilter();
        }, 200);
        return null;
      });
      $("#diffTypeSelect").on("change", applyViewFilter);
      return null;
    }
  };
});
