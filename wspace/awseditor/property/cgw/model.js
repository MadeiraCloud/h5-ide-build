(function() {
  define(['../base/model', "Design", 'constant'], function(PropertyModel, Design, constant) {
    var CGWModel;
    CGWModel = PropertyModel.extend({
      init: function(uid) {
        var cgw;
        cgw = Design.instance().component(uid);
        this.set({
          uid: uid,
          name: cgw.get("name"),
          description: cgw.get("description"),
          BGP: cgw.get("bgpAsn"),
          ip: cgw.get("ip")
        });
        return null;
      },
      setIP: function(ip) {
        Design.instance().component(this.get("uid")).set("ip", ip);
        return null;
      },
      setBGP: function(bgp) {
        Design.instance().component(this.get("uid")).set("bgpAsn", bgp);
        return null;
      }
    });
    return new CGWModel();
  });

}).call(this);
