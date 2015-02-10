(function() {
  define(["../DesignAws"], function(Design) {
    Design.registerDeserializeVisitor(function(data, layout_data, version) {
      var comp, uid, _results;
      if (version < "2014-01-25") {
        return;
      }
      _results = [];
      for (uid in layout_data) {
        comp = layout_data[uid];
        if (comp.type === "ExpandedAsg") {
          _results.push(data[uid] = {
            type: "ExpandedAsg",
            uid: uid
          });
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
    return null;
  });

}).call(this);
