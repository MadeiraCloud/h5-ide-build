(function() {
  define(['MC', 'stack_model', 'app_model', 'backbone', 'event'], function(MC, stack_model, app_model, ide_event) {
    var TabbarModel, model;
    TabbarModel = Backbone.Model.extend({
      defaults: {
        stack_region_name: null,
        app_region_name: null,
        current_platform: null,
        tab_name: null,
        import_stack: null
      },
      initialize: function() {
        var me;
        me = this;
        me.on('STACK_INFO_RETURN', function(result) {
          console.log('STACK_INFO_RETURN');
          return me.trigger('GET_STACK_COMPLETE', result);
        });
        return me.on('APP_INFO_RETURN', function(result) {
          console.log('APP_INFO_RETURN');
          return me.trigger('GET_APP_COMPLETE', result);
        });
      },
      refresh: function(older, newer, type) {
        var event_type, suffix;
        console.log('refresh, older = ' + older + ', newer = ' + newer + ', type = ' + type);
        console.log('Tabbar.current = ' + Tabbar.current);
        if (older !== 'dashboard' && older !== null) {
          this.trigger('SAVE_DESIGN_MODULE', older);
        }
        if (newer === 'dashboard') {
          this.trigger('SWITCH_DASHBOARD');
          return;
        }
        if (Tabbar.current === 'process') {
          if (MC.common.other.processType(newer) === 'appview' && MC.common.other.getCacheMap(newer).state !== 'OPEN') {
            suffix = 'OLD_';
          } else {
            suffix = 'OPEN_';
          }
        } else if (Tabbar.current === 'appview') {
          suffix = 'OLD_';
        } else if (MC.tab[newer] === void 0) {
          console.log('write newer from MC.tab');
          suffix = 'OPEN_';
        } else {
          console.log('read older from MC.tab');
          console.log(MC.tab[newer]);
          suffix = 'OLD_';
        }
        switch (type) {
          case 'new':
            if (suffix === 'OLD_') {
              event_type = suffix + 'STACK';
            } else {
              event_type = 'NEW_STACK';
            }
            break;
          case 'stack':
          case 'import':
            event_type = suffix + 'STACK';
            break;
          case 'app':
          case 'appview':
            event_type = suffix + 'APP';
            break;
          case 'process':
            event_type = suffix + 'PROCESS';
            break;
          default:
            console.log('no find tab type');
        }
        console.log('event_type = ' + event_type);
        MC.data.current_tab_type = event_type;
        this.trigger(event_type, newer);
        console.log(MC.tab);
        return null;
      },
      getStackInfo: function(stack_id) {
        var me;
        console.log('getStackInfo');
        me = this;
        return stack_model.info({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), this.get('stack_region_name'), [stack_id]);
      },
      getAppInfo: function(app_id) {
        var me;
        console.log('getAppInfo');
        me = this;
        return app_model.info({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), this.get('app_region_name'), [app_id]);
      },
      checkPlatform: function(region_name) {
        var support_vpc;
        console.log('checkPlatform', region_name);
        support_vpc = null;
        _.each(MC.data.supported_platforms, function(item) {
          if (region_name === item.region) {
            if (item.classic) {
              support_vpc = true;
            } else {
              support_vpc = false;
            }
          }
          return null;
        });
        return support_vpc;
      }
    });
    model = new TabbarModel();
    return model;
  });

}).call(this);
