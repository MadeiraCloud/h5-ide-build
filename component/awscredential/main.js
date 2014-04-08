(function() {
  define(['jquery', 'event', './template', './welcome', 'i18n!nls/lang.js'], function($, ide_event, template, welcome_tmpl, lang) {
    var loadModule, model, unLoadModule, view;
    view = null;
    model = null;
    loadModule = function(state) {
      return require(['./component/awscredential/view', './component/awscredential/model'], function(View, Model) {
        var ture_template;
        if (view || model) {
          return;
        }
        view = new View();
        model = new Model();
        view.model = model;
        if (state === 'welcome') {
          ture_template = welcome_tmpl;
          view.state = 'welcome';
          if (MC.common.cookie.getCookieByName('state') === '1') {
            model.updateAccountService();
          }
        } else {
          ture_template = template;
          view.state = 'credential';
        }
        view.render(ture_template);
        if (state === 'welcome') {
          view.showSetting('credential');
        } else if (MC.common.cookie.getCookieByName('has_cred') === 'true') {
          view.showSetting('account');
        } else {
          view.showSetting('credential', 'is_failed');
        }
        view.on('CLOSE_POPUP', function() {
          return unLoadModule();
        });
        view.on('AWS_AUTHENTICATION', function(account_id, access_key, secret_key) {
          console.log('AWS_AUTHENTICATION');
          if (model.attributes.is_authenticated) {
            model.resetKey(1);
          }
          return model.awsAuthenticate(access_key, secret_key, account_id);
        });
        model.on('REFRESH_AWS_CREDENTIAL', function() {
          console.log('UPDATE_AWS_CREDENTIAL');
          ide_event.trigger(ide_event.UPDATE_AWS_CREDENTIAL);
          if (view) {
            if (model.attributes.is_authenticated) {
              view.showSetting('credential', 'load_resource');
              return setTimeout(function() {
                return view.showSetting('credential', 'on_update');
              }, 2000);
            } else {
              return view.showSetting('credential', 'is_failed');
            }
          }
        });
        view.on('UPDATE_ACCOUNT_EMAIL', function(email) {
          console.log('UPDATE_ACCOUNT_EMAIL');
          return model.updateAccountEmail(email);
        });
        view.on('UPDATE_ACCOUNT_PASSWORD', function(password, new_password) {
          console.log('UPDATE_ACCOUNT_PASSWORD');
          return model.updateAccountPassword(password, new_password);
        });
        model.on('UPDATE_ACCOUNT_ATTRIBUTES_SUCCESS', function(attributes) {
          var attr_list;
          console.log('UPDATE_ACCOUNT_ATTRIBUTES_SUCCESS:' + attr_list);
          attr_list = _.keys(attributes);
          if (_.contains(attr_list, 'email')) {
            view.notify('info', lang.ide.HEAD_MSG_INFO_UPDATE_EMAIL);
            MC.common.cookie.setCookieByName('email', MC.base64Encode(attributes.email));
            view.showSetting('account');
          }
          if (_.contains(attr_list, 'password')) {
            view.notify('info', lang.ide.HEAD_MSG_INFO_UPDATE_PASSWORD);
            view.showSetting('account');
          }
          if (_.contains(attr_list, 'access_key') && _.contains(attr_list, 'secret_key')) {
            model.sync_redis();
            model.resetKey(0);
          }
          return null;
        });
        model.on('UPDATE_ACCOUNT_ATTRIBUTES_FAILED', function(attributes) {
          var attr_list;
          console.log('UPDATE_ACCOUNT_ATTRIBUTES_FAILED:' + attr_list);
          attr_list = _.keys(attributes);
          if (_.contains(attr_list, 'email')) {
            view.clickUpdateEmail('is_failed');
          }
          if (_.contains(attr_list, 'password')) {
            view.clickUpdatePassword('error_password');
          }
          return null;
        });
        view.on('REMOVE_CREDENTIAL', function() {
          console.log('REMOVE_CREDENTIAL');
          model.resetKey();
          return null;
        });
        return view.on('CANCAL_CREDENTIAL', function() {
          console.log('CANCAL_CREDENTIAL');
          model.resetKey(0);
          return null;
        });
      });
    };
    unLoadModule = function() {
      console.log('awscredential unLoadModule');
      view.off();
      model.off();
      view.undelegateEvents();
      view = null;
      model = null;
      return modal.close();
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
