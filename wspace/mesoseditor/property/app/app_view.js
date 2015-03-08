(function() {
  define(['../base/view', './container', './template/app', 'i18n!/nls/lang.js', 'constant', 'UI.modalplus'], function(PropertyView, Container, Tpl, lang, constant) {
    var view;
    view = PropertyView.extend({
      events: {
        'click .open-container': 'openContainer',
        "OPTION_CHANGE .mesos-switch-versions": "switchVersion"
      },
      initialize: function(options) {},
      openContainer: function() {
        return this.container = new Container({
          model: this.model,
          appData: this.data
        }).render();
      },
      switchVersion: function(evt) {
        var version;
        version = $(evt.currentTarget).find(".selection").text();
        return this._render(version.toString());
      },
      render: function() {
        return this._render();
      },
      _render: function(version) {
        var data, path, _ref;
        this.appList = _.map(this.appData, function(model) {
          return model.toJSON();
        });
        if (version) {
          data = _.findWhere(this.appList, {
            version: version
          });
        } else {
          data = _.sortBy(this.appList, "version")[0];
        }
        data.versions = _.pluck(this.appList, 'version');
        path = this.model.path();
        data.task = Design.instance().serialize().host + "v2/apps" + path;
        this.data = data;
        data.isCommand = data.cmd && !((_ref = data.args) != null ? _ref.length : void 0) || true;
        this.$el.html(Tpl(data));
        return this.model.get('name');
      }
    });
    return new view();
  });

}).call(this);
