(function() {
  define(['constant', '../OsPropertyView', './template/stack', '../oshmlist/view'], function(constant, OsPropertyView, template, HmlistView) {
    return OsPropertyView.extend({
      events: {
        'change .selection[data-target]': 'updateAttribute'
      },
      initialize: function() {
        this.memConn = this.model.connections('OsPoolMembership');
        return this.hmlistView = this.reg(new HmlistView({
          targetModel: this.model
        }));
      },
      render: function() {
        this.$el.html(template(this.getRenderData()));
        this.renderHmlist();
        return this;
      },
      getModelJson: function() {
        var data;
        data = OsPropertyView.prototype.getModelJson.call(this);
        data.mems = _.map(this.memConn, function(mc) {
          var json, port;
          port = mc.getPort();
          json = mc.toJSON();
          json.osport = mc.getPort().toJSON();
          if (port.isEmbedded()) {
            json.osport.name = port.owner().get('name');
          }
          return json;
        });
        return data;
      },
      renderHmlist: function() {
        return this.$('.pool-details').after(this.hmlistView.render().el);
      },
      getModelForUpdateAttr: function(e) {
        var $target, dataModel;
        $target = $(e.currentTarget);
        dataModel = $target.data('model');
        if (!dataModel) {
          dataModel = $target.closest('[data-model]').data('model');
        }
        switch (dataModel) {
          case 'hm':
            return this.hm;
          case 'mem':
            return this.memConn[$target.data('index')];
          default:
            return this.model;
        }
      },
      updateAttribute: function(event) {
        var $target, attr, model, value;
        model = this.getModelForUpdateAttr(event);
        $target = $(event.currentTarget);
        attr = $target.data('target');
        value = $target.getValue();
        if (attr === 'weight' || attr === 'port') {
          model.set('appId', '');
        }
        model.set(attr, value);
        if (attr === 'name') {
          return this.setTitle(value);
        }
      }
    }, {
      handleTypes: [constant.RESTYPE.OSPOOL],
      handleModes: ['stack', 'appedit']
    });
  });

}).call(this);
