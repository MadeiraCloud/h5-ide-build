
/*
----------------------------
  This is the core / entry point / controller of the whole IDE.
----------------------------

  It contains some basical logics to maintain the IDE. And it holds other components
  to provide other functionality
 */

(function() {
  define(["./Websocket", "./ApplicationView", "./ApplicationModel", "./User", "./subviews/SettingsDialog", "common_handle", "event", "vpc_model", "constant"], function(Websocket, ApplicationView, ApplicationModel, User, SettingsDialog, common_handle, ide_event, vpc_model, constant) {
    var VisualOps;
    VisualOps = function() {
      if (window.App) {
        console.error("Application is already created.");
        return;
      }
      window.App = this;
    };
    VisualOps.prototype.initialize = function() {
      this.__createUser();
      this.__createWebsocket();
      this.model = new ApplicationModel();
      this.__view = new ApplicationView();
      return this.user.fetch();
    };
    VisualOps.prototype.__createWebsocket = function() {
      this.WS = new Websocket();
      this.WS.on("Disconnected", (function(_this) {
        return function() {
          return _this.acquireSession();
        };
      })(this));
      this.WS.on("StatusChanged", (function(_this) {
        return function(isConnected) {
          console.info("Websocket Status changed, isConnected:", isConnected);
          return _this.__view.toggleWSStatus(isConnected);
        };
      })(this));
    };
    VisualOps.prototype.__createUser = function() {
      this.user = new User();
      this.user.on("SessionUpdated", (function(_this) {
        return function() {
          ide_event.trigger(ide_event.UPDATE_APP_LIST);
          ide_event.trigger(ide_event.UPDATE_DASHBOARD);
          return _this.WS.subscribe();
        };
      })(this));
      this.user.on("change:credential", (function(_this) {
        return function() {
          return _this.__onCredentialChanged();
        };
      })(this));
    };
    VisualOps.prototype.__onCredentialChanged = function() {
      vpc_model.DescribeAccountAttributes({
        sender: vpc_model
      }, App.user.get('usercode'), App.user.get('session'), '', ["supported-platforms", "default-vpc"]);
      return vpc_model.once('VPC_VPC_DESC_ACCOUNT_ATTRS_RETURN', function(result) {
        var regionAttrSet;
        console.log('VPC_VPC_DESC_ACCOUNT_ATTRS_RETURN');
        if (result.is_error) {
          return;
        }
        regionAttrSet = result.resolved_data;
        return _.map(constant.REGION_KEYS, function(value) {
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
            return null;
          }
        });
      });
    };
    VisualOps.prototype.acquireSession = function() {
      ide_event.trigger(ide_event.SWITCH_MAIN);
      return this.__view.showSessionDialog();
    };
    VisualOps.prototype.logout = function() {
      App.user.logout();
      window.location.href = "/login/";
    };
    VisualOps.prototype.showSettings = function(tab) {
      return new SettingsDialog({
        defaultTab: tab
      });
    };
    VisualOps.prototype.showSettings.TAB = SettingsDialog.TAB;
    return VisualOps;
  });

}).call(this);
