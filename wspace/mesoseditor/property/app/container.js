(function() {
  define(['./template/container', './template/containerApp', 'i18n!/nls/lang.js', 'constant', 'UI.modalplus'], function(Tpl, TplApp, lang, constant, Modal) {
    return Backbone.View.extend({
      className: 'container-settings',
      tagName: 'form',
      events: {
        'click #add-item-outside': 'addItem',
        'ADD_ROW .multi-input': 'processMapTitle',
        'REMOVE_ROW .multi-input': 'processMapTitle'
      },
      initialize: function(options) {
        var modalOptions;
        this.appData = options.appData;
        this.$el.prop('data-bind', true);
        modalOptions = {
          template: this.el,
          title: 'Container Settings',
          width: '555px',
          height: '473px',
          compact: true,
          mode: 'panel',
          confirm: {
            text: 'Save'
          }
        };
        this.modal = new Modal(modalOptions);
        return this.modal.on('confirm', this.save, this);
      },
      render: function() {
        if (this.appData) {
          return this.$el.html(TplApp(this.appData.container));
        } else {
          return this.$el.html(Tpl(this.model.container()));
        }
      },
      remove: function() {
        var _ref;
        if ((_ref = this.modal) != null) {
          _ref.close();
        }
        return Backbone.View.prototype.remove.apply(this, arguments);
      },
      addItem: function(e) {
        $(e.currentTarget).closest('.input-item').find('.ipt-controls .icon-add').eq(0).click();
        return false;
      },
      save: function() {
        var data, form;
        form = this.$el;
        if (!form.parsley('validate')) {
          return;
        }
        data = this.getContainer(form);
        this.model.set('container', data);
        return this.remove();
      },
      getContainer: function(form) {
        var data;
        data = {
          docker: {}
        };
        _.each(form.serializeArray(), function(filed) {
          return data.docker[filed.name] = filed.value;
        });
        data.docker.portMappings = this.getMapData(this.$('.port-mappings'));
        data.docker.parameters = this.getMapData(this.$('.parameters'));
        data.docker.privileged = this.$('#cb-privileged')[0].checked;
        data.volumes = this.getMapData(this.$('.volumes'));
        return data;
      },
      getMapData: function($dom) {
        var data;
        data = [];
        $dom.find('.multi-ipt-row:not(.template)').each(function() {
          var item;
          item = {};
          $(this).find('.input').each(function() {
            var $input, name, splits, value;
            $input = $(this);
            value = $input.val();
            name = $input.data('name');
            if (name === 'hostPort' || name === 'servicePort') {
              value = +value;
            }
            if (name === 'container') {
              splits = value.split('/');
              item.containerPort = +splits[0];
              return item.protocol = splits[1];
            } else if (name === 'containerPath') {
              splits = value.split(':');
              item.containerPath = splits[0];
              return item.mode = splits[1];
            } else {
              return item[name] = value;
            }
          });
          return data.push(item);
        });
        return data;
      },
      processMapTitle: function(e) {
        var $multiInput, hasItem;
        $multiInput = $(e.currentTarget);
        hasItem = $multiInput.find('.multi-ipt-row').length > 1;
        return $multiInput.prev('.titles').toggle(hasItem);
      }
    });
  });

}).call(this);
