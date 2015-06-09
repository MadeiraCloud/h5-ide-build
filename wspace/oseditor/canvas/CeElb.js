define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
  return CanvasElement.extend({

    /* env:dev                                         env:dev:end */
    type: constant.RESTYPE.OSELB,
    parentType: [constant.RESTYPE.OSSUBNET],
    defaultSize: [17, 8]
  }, {
    createResource: function(type, attributes, options) {
      var ListenerModel, PoolModel, listener, pool;
      attributes.width = 8;
      PoolModel = Design.modelClassForType(constant.RESTYPE.OSPOOL);
      pool = new PoolModel($.extend({}, attributes, {
        x: attributes.x + 9
      }), options);
      ListenerModel = Design.modelClassForType(constant.RESTYPE.OSLISTENER);
      listener = new ListenerModel(attributes, $.extend({
        pool: pool
      }, options));
    }
  });
});
