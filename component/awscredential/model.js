(function() {
  define(['backbone', 'jquery', 'underscore', 'MC', 'session_model', 'vpc_model', 'account_model', 'i18n!nls/lang.js', 'event', 'constant', 'UI.notification'], function(Backbone, $, _, MC, session_model, vpc_model, account_model, lang, ide_event, constant) {
    var AWSCredentialModel;
    AWSCredentialModel = Backbone.Model.extend({
      defaults: {
        'account_id': null,
        'is_authenticated': null
      },
      initialize: function() {
        var flag, me;
        me = this;
        me.on('ACCOUNT_UPDATE__ACCOUNT_RETURN', function(result) {
          var attributes;
          console.log('ACCOUNT_UPDATE__ACCOUNT_RETURN');
          attributes = result.param[3];
          if (!result.is_error) {
            me.trigger('UPDATE_ACCOUNT_ATTRIBUTES_SUCCESS', attributes);
            if (attributes.state === '3') {
              MC.common.cookie.setCookieByName('state', attributes.state);
            }
          } else {
            me.trigger('UPDATE_ACCOUNT_ATTRIBUTES_FAILED', attributes);
          }
          return null;
        });
        me.on('SESSION_SYNC__REDIS_RETURN', function(result) {
          console.log('SESSION_SYNC__REDIS_RETURN');
          if (!result.is_error) {
            ide_event.trigger(ide_event.UPDATE_AWS_CREDENTIAL);
          }
          return null;
        });
        me.on('ACCOUNT_RESET__KEY_RETURN', function(result) {
          var flag;
          console.log('ACCOUNT_RESET__KEY_RETURN');
          flag = result.param[3];
          if (!result.is_error) {
            console.log('reset key successfully');
            if (!flag || flag === 0) {
              me.set('is_authenticated', true);
              me.set('account_id', result.resolved_data);
              MC.common.cookie.setCookieByName('account_id', result.resolved_data);
              MC.common.cookie.setCookieByName('has_cred', true);
              me.trigger('REFRESH_AWS_CREDENTIAL');
            }
          } else {
            console.log('reset key failed');
          }
          return null;
        });
        flag = false;
        if (MC.common.cookie.getCookieByName('has_cred') === 'true') {
          flag = true;
        }
        me.set('is_authenticated', flag);
        if (MC.common.cookie.getCookieByName('account_id')) {
          return me.set('account_id', MC.common.cookie.getCookieByName('account_id'));
        }
      },
      awsAuthenticate: function(access_key, secret_key, account_id) {
        var me, option;
        me = this;
        option = {
          expires: 1,
          path: '/'
        };
        session_model.set_credential({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'), access_key, secret_key, account_id);
        me.once('SESSION_SET__CREDENTIAL_RETURN', function(result1) {
          var name;
          console.log('SESSION_SET__CREDENTIAL_RETURN');
          console.log(result1);
          if (!result1.is_error) {
            name = 'DescribeAccountAttributes' + '_' + $.cookie('usercode') + '__' + 'supported-platforms,default-vpc';
            if (MC.session.get(name)) {
              MC.session.remove(name);
            }
            vpc_model.DescribeAccountAttributes({
              sender: vpc_model
            }, $.cookie('usercode'), $.cookie('session_id'), '', ["supported-platforms", "default-vpc"]);
            return vpc_model.once('VPC_VPC_DESC_ACCOUNT_ATTRS_RETURN', function(result) {
              var regionAttrSet;
              console.log('VPC_VPC_DESC_ACCOUNT_ATTRS_RETURN');
              if (!result.is_error) {
                me.set('is_authenticated', true);
                MC.common.cookie.setCookieByName('has_cred', true);
                MC.common.cookie.setCookieByName('account_id', account_id);
                regionAttrSet = result.resolved_data;
                _.map(constant.REGION_KEYS, function(value) {
                  var default_vpc, support_platform;
                  if (regionAttrSet[value] && regionAttrSet[value].accountAttributeSet) {
                    support_platform = regionAttrSet[value].accountAttributeSet.item[0].attributeValueSet.item;
                    if (support_platform && $.type(support_platform) === "array") {
                      if (support_platform.length === 2) {
                        MC.data.account_attribute[value].support_platform = support_platform[0].attributeValue + ',' + support_platform[1].attributeValue;
                      } else if (support_platform.length === 1) {
                        MC.data.account_attribute[value].support_platform = support_platform[0].attributeValue;
                      }
                    }
                    default_vpc = regionAttrSet[value].accountAttributeSet.item[1].attributeValueSet.item;
                    if (default_vpc && $.type(default_vpc) === "array" && default_vpc.length === 1) {
                      MC.data.account_attribute[value].default_vpc = default_vpc[0].attributeValue;
                    }
                  }
                  return null;
                });
              } else {
                me.set('is_authenticated', false);
              }
              me.set('account_id', account_id);
              return me.trigger('REFRESH_AWS_CREDENTIAL');
            });
          } else {
            me.set('is_authenticated', false);
            MC.common.cookie.setCookieByName('has_cred', false);
            me.set('account_id', account_id);
            return me.trigger('REFRESH_AWS_CREDENTIAL');
          }
        });
        return null;
      },
      updateAccountEmail: function(new_email) {
        var attributes, me;
        me = this;
        attributes = {
          'email': new_email
        };
        account_model.update_account({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), attributes);
        return null;
      },
      updateAccountPassword: function(password, new_password) {
        var attributes, me;
        me = this;
        attributes = {
          'password': password,
          'new_password': new_password
        };
        account_model.update_account({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), attributes);
        return null;
      },
      removeCredential: function() {
        var attributes, me;
        me = this;
        attributes = {
          'account_id': null,
          'access_key': null,
          'secret_key': null
        };
        account_model.update_account({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), attributes);
        return null;
      },
      sync_redis: function() {
        var me;
        me = this;
        session_model.sync_redis({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'));
        return null;
      },
      resetKey: function(flag) {
        console.log('reset key, flag:' + flag);
        account_model.reset_key({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'), flag);
        return null;
      },
      updateAccountService: function() {
        console.log('updateAccountService');
        return account_model.update_account({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'), {
          'state': '3'
        });
      }
    });
    return AWSCredentialModel;
  });

}).call(this);
