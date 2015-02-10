(function() {
  define(["ComplexResModel", "constant"], function(ComplexResModel, constant) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSHM,
      newNameTmpl: "health-monitor",
      defaults: function() {
        return {
          type: 'PING',
          delay: 30,
          timeout: 30,
          maxRetries: 3,
          urlPath: '/index.html',
          expectedCodes: '200-299'
        };
      },
      get: function(attr) {
        var _ref;
        if ((attr === 'urlPath' || attr === 'expectedCodes') && ((_ref = this.attributes.type) !== 'HTTP' && _ref !== 'HTTPS')) {
          return void 0;
        } else {
          return this.attributes[attr];
        }
      },
      serialize: function() {
        var component;
        component = {
          name: this.get('name'),
          type: this.type,
          uid: this.id,
          resource: {
            id: this.get('appId'),
            name: this.get('name'),
            type: this.get('type'),
            delay: Number(this.get('delay')),
            timeout: Number(this.get('timeout')),
            max_retries: Number(this.get('maxRetries')),
            url_path: this.get('urlPath') || "",
            expected_codes: this.get('expectedCodes') || ""
          }
        };
        return {
          component: component
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSHM,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          type: data.resource.type,
          delay: Number(data.resource.delay),
          timeout: Number(data.resource.timeout),
          maxRetries: Number(data.resource.max_retries),
          urlPath: data.resource.url_path,
          expectedCodes: data.resource.expected_codes
        });
      }
    });
    return Model;
  });

}).call(this);
