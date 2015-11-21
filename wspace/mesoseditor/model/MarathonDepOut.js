define(["constant", "./MarathonDepIn", "i18n!/nls/lang.js"], function(constant, MarathonDepIn, lang) {
  var C;
  C = MarathonDepIn.extend({
    type: "MarathonDepOut",
    directional: true,
    portDefs: [
      {
        port1: {
          name: "app-dep-out",
          type: constant.RESTYPE.MRTHAPP
        },
        port2: {
          name: "group-dep-in",
          type: constant.RESTYPE.MRTHGROUP
        }
      }, {
        port1: {
          name: "app-dep-out",
          type: constant.RESTYPE.MRTHAPP
        },
        port2: {
          name: "app-dep-in",
          type: constant.RESTYPE.MRTHAPP
        }
      }, {
        port1: {
          name: "group-dep-out",
          type: constant.RESTYPE.MRTHGROUP
        },
        port2: {
          name: "group-dep-in",
          type: constant.RESTYPE.MRTHGROUP
        }
      }, {
        port1: {
          name: "group-dep-out",
          type: constant.RESTYPE.MRTHGROUP
        },
        port2: {
          name: "app-dep-in",
          type: constant.RESTYPE.MRTHAPP
        }
      }
    ],
    serialize: function(component_data, layout_data) {
      var comp;
      comp = component_data[this.port2Comp().id];
      if (!comp.resource.dependencies) {
        comp.resource.dependencies = [];
      }
      comp.resource.dependencies.push(this.port1Comp().path());
    }
  });
  return C;
});
