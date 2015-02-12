(function() {
  define(['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
    return OsPropertyView.extend({
      events: {
        "change .selection[data-target]": "updateAttribute",
        "select_dropdown_button_click .item-list": "addItem",
        "click .item-list .item .item-remove": "removeItemClicked",
        "select_item_remove .item-list": "removeItem"
      },
      initialize: function() {
        this.selectTpl = {
          button: function() {
            return template.addButton();
          },
          sgItem: function(item) {
            return template.item({
              value: item.text
            });
          },
          sgOption: function(item) {
            return template.option({
              value: item.text
            });
          }
        };
      },
      render: function() {
        var json, nameServerList, nameServers, _ref;
        if ((_ref = this.mode()) === 'stack' || _ref === 'appedit') {
          json = this.model.toJSON();
          nameServerList = [];
          nameServers = [];
          _.each(this.model.get('nameservers'), function(value) {
            nameServers.push(value);
            return nameServerList.push(value);
          });
          nameServerList = nameServerList.join(',');
          json = _.extend(json, {
            nameServerList: nameServerList,
            nameServers: nameServers
          });
          json = _.extend(json, this.getRenderData());
          this.$el.html(template.stack(json));
        } else {
          this.$el.html(template.app(this.getRenderData()));
        }
        return this;
      },
      addItem: function(event, value) {
        var ipAddr, nameservers;
        ipAddr = $.trim(value);
        if (MC.validate('ipv4', ipAddr)) {
          nameservers = this.model.get('nameservers');
          nameservers.push(ipAddr);
          this.model.set('nameservers', _.uniq(nameservers));
        }
        return this.render();
      },
      removeItemClicked: function(event) {
        var $target, idx, value;
        $target = $(event.currentTarget);
        value = $target.parents('.item').find('.item-name').attr('data-value');
        idx = this.model.get('nameservers').indexOf(value);
        if (idx > -1) {
          this.model.get('nameservers').splice(idx, 1);
        }
        return this.render();
      },
      removeItem: function(event, value) {
        var idx;
        idx = this.model.get('nameservers').indexOf(value);
        if (idx > -1) {
          return this.model.get('nameservers').splice(idx, 1);
        }
      },
      updateAttribute: function(event) {
        var $target, attr, value;
        $target = $(event.currentTarget);
        attr = $target.data('target');
        value = $target.getValue();
        this.model.set(attr, value);
        if (attr === 'cidr') {
          this.model.resetAllChildIP();
        }
        if (attr === 'name') {
          return this.setTitle(value);
        }
      }
    }, {
      handleTypes: [constant.RESTYPE.OSSUBNET],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);
