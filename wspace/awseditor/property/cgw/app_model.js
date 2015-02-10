(function() {
  define(['../base/model', 'Design', 'constant', 'CloudResources'], function(PropertyModel, Design, constant, CloudResources) {
    var CGWAppModel;
    CGWAppModel = PropertyModel.extend({
      init: function(uid) {
        var cgw, myCGWComponent, _ref;
        myCGWComponent = Design.instance().component(uid);
        cgw = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.CGW, Design.instance().region()).get(myCGWComponent.get('appId'))) != null ? _ref.toJSON() : void 0;
        if (!cgw) {
          return false;
        }
        cgw = $.extend(true, {}, cgw);
        cgw.uid = uid;
        cgw.name = myCGWComponent.get('name');
        cgw.description = myCGWComponent.get('description');
        this.set(cgw);
        return null;
      }
    });
    return new CGWAppModel();
  });

}).call(this);
