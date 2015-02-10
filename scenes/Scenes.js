define('scenes/ProjectTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"project-scene\">\n  <header class=\"project-header\">\n    <button class=\"ph-nav-btn project-list popuptrigger truncate\" data-popup=\"popupProject\"></button>\n    <button class=\"ph-nav-btn icon-menu asset-list popuptrigger\" data-popup=\"popupAsset\"></button>\n    <div class=\"ws-tabbar\"><ul class=\"ws-fixed-tabs\"></ul><ul class=\"ws-tabs\"></ul></div>\n    <nav>\n      <a class=\"ph-nav-btn icon-support\" href=\"mailto:3rp02j1w@incoming.intercom.io\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_LBL_SUPPORT", {hash:{},data:data}))
    + "</a>\n      <button class=\"ph-nav-btn icon-notification popuptrigger\" data-popup=\"popupNotify\"></button>\n      <button class=\"ph-nav-btn user-menu popuptrigger\" data-popup=\"popupUser\"></button>\n    </nav>\n  </header>\n\n  <section class=\"ws-content\"></section>\n</div>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li>\n        <h3 class=\"nav-group-title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</h3>\n        <nav class=\"nav-item-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </nav>\n      </li>";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a class=\"route truncate icon-app-";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.progressing), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ["
    + escapeExpression(((stack1 = (depth0 && depth0.stateDesc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "pending";
  }

function program5(depth0,data) {
  
  
  return escapeExpression(helpers.tolower.call(depth0, (depth0 && depth0.stateDesc), {hash:{},data:data}));
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"icon-app-type-"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"nav-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_APP", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li>\n        <h3 class=\"nav-group-title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</h3>\n        <nav class=\"nav-item-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </nav>\n      </li>";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a class=\"route icon-stack-nav truncate\" href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"nav-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_STACK", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

  buffer += "<aside class=\"header-popup hp-asset-list\">\n  <nav>\n    <button class=\"off-canvas-tab\" data-id=\"app\">"
    + escapeExpression(helpers.i18n.call(depth0, "NAV_TIT_APPS", {hash:{},data:data}))
    + "</button>\n    <button class=\"off-canvas-tab selected\" data-id=\"stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "NAV_TIT_STACKS", {hash:{},data:data}))
    + "</button>\n  </nav>\n  <div class=\"hp-asset-list-wrap\">\n    <ul data-id=\"app\" class=\"hide\">\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.apps), {hash:{},inverse:self.program(9, program9, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n    <ul data-id=\"stack\">\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.stacks), {hash:{},inverse:self.program(14, program14, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n</aside>";
  return buffer;
  };
TEMPLATE.assetList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li><a class=\"route";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a><a class=\"route icon-gear tooltip\" href=\"settings/"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip=\"Workspace Settings\"></a></li>";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

  buffer += "<ul class=\"header-popup hp-project-list\">\n  ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <li class=\"create-new-project padding\">Create New Workspace</li>\n</ul>";
  return buffer;
  };
TEMPLATE.projectList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"header-popup hp-usermenu\">\n  <li><a class=\"route\" href=\"/cheatsheet\">Keyboard Shortcuts</a></li>\n  <li><a href=\"http://docs.visualops.io\" target=\"_blank\">Documentation</a></li>\n  <li><a class=\"route\" href=\"/settings\">Settings</a></li>\n  <li class=\"logout padding\">Log Out</li>\n</ul>\n<div></div>";
  };
TEMPLATE.usermenu=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"new-project-modal\" data-bind=\"true\">\n  <span>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CREATE_PROJECT_NAME", {hash:{},data:data}))
    + "</span>\n  <input type=\"text\" class=\"input new-project-name\" data-required=\"true\">\n  <div>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CREATE_PROJECT_BILLING", {hash:{},data:data}))
    + "</div>\n  <div class=\"new-project-info\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CREATE_PROJECT_BILLING_TIP", {hash:{},data:data}))
    + "</div>\n  <div class=\"new-project-err\"></div>\n  <div class=\"new-project-item new-project-item-owner\">\n    <span>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CREATE_PROJECT_BILLING_OWNER", {hash:{},data:data}))
    + "</span>\n    <input class=\"input new-project-fn\" type=\"text\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CREATE_PROJECT_FIRST_NAME", {hash:{},data:data}))
    + "\" data-required=\"true\">\n    <input class=\"input new-project-ln\" type=\"text\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CREATE_PROJECT_LAST_NAME", {hash:{},data:data}))
    + "\" data-required=\"true\">\n  </div>\n  <div class=\"new-project-item new-project-item-email\">\n    <span>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CREATE_PROJECT_BILLING_EMAIL", {hash:{},data:data}))
    + "</span>\n    <input class=\"input new-project-email\" type=\"text\" data-required=\"true\">\n  </div>\n  <div class=\"new-project-item new-project-item-card\">\n    <span>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CREATE_PROJECT_CARD_NAME", {hash:{},data:data}))
    + "</span>\n    <input class=\"input new-project-card\" type=\"text\" data-required=\"true\">\n  </div>\n  <div class=\"new-project-item new-project-item-cvv\">\n    <span>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CREATE_PROJECT_CARD_CVV", {hash:{},data:data}))
    + "</span>\n    <input class=\"input new-project-cvv\"  type=\"text\" data-required=\"true\">\n  </div>\n  <div class=\"new-project-item new-project-item-date\">\n    <span>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CREATE_PROJECT_EXPRIATION", {hash:{},data:data}))
    + "</span>\n    <input class=\"input new-project-date\" type=\"text\" placeholder=\"MM/YYYY\" data-required=\"true\">\n  </div>\n  <div class=\"modal-footer\">\n    <span class=\"new-project-support\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CREATE_PROJECT_CHARGIFY_SUPPORT", {hash:{},data:data}))
    + "</span>\n    <button class=\"btn new-project-create btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_CREATE", {hash:{},data:data}))
    + "</button>\n    <button class=\"btn modal-close new-project-cancel btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n  </div>\n</section>";
  return buffer;
  };
TEMPLATE.newProject=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section>\n  <p>You have unsaved changes in this project. Switching projects will cause your chages to lose.</p> <p>Do you confirm to switch project anyway?</p>\n  <div class=\"modal-footer\">\n    <button class=\"btn do-switch btn-silver\">Switch and discard changes</button>\n    <button class=\"btn btn-blue modal-close\">Do not switch</button>\n  </div>\n</section>";
  };
TEMPLATE.switchConfirm=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('scenes/ProjectView',["ApiRequest", "./ProjectTpl", "UI.modalplus", "i18n!/nls/lang.js", "constant", "backbone", "jquerysort", "UI.parsley", "UI.errortip", "MC.validate"], function(ApiRequest, ProjectTpl, Modal, lang, constant) {
    var AssetListPopup, HeaderPopup, ProjectCreation, ProjectListPopup, UserPopup;
    ProjectCreation = Backbone.View.extend({
      events: {
        "click .new-project-cancel": "cancel",
        "click .new-project-create": "create"
      },
      initialize: function() {
        this.modal = new Modal({
          template: ProjectTpl.newProject(),
          title: lang.IDE.SETTINGS_CREATE_PROJECT_TITLE,
          disableClose: true,
          disableFooter: true,
          width: "500px"
        });
        this.setElement(this.modal.tpl);
      },
      cancel: function() {
        return this.modal.close();
      },
      create: function() {
        var $create, $cvv, $email, $expire, $firstname, $lastname, $name, $number, expire, expireAry, modal, valid;
        modal = this.modal;
        modal.tpl.find(".new-project-err").hide();
        $create = modal.tpl.find(".new-project-create");
        $name = modal.tpl.find(".new-project-name");
        $firstname = modal.tpl.find(".new-project-fn");
        $lastname = modal.tpl.find(".new-project-ln");
        $email = modal.tpl.find(".new-project-email");
        $number = modal.tpl.find(".new-project-card");
        $expire = modal.tpl.find(".new-project-date");
        $cvv = modal.tpl.find(".new-project-cvv");
        valid = true;
        $expire.parsley('custom', function(val) {
          return null;
        });
        expire = $expire.val();
        expireAry = expire.split('/');
        if (expire.match(/^\d\d\/\d\d$/g)) {
          expire = "" + expireAry[0] + "/20" + expireAry[1];
        } else if (expire.match(/^\d\d\d\d$/g)) {
          expire = "" + (expire.substr(0, 2)) + "/20" + (expire.substr(2, 2));
        } else if (expire.match(/^\d\d\/\d\d\d\d$/g)) {
          expire = expire;
        } else if (expire.match(/^\d\d\d\d\d\d$/g)) {
          expire = "" + (expire.substr(0, 2)) + "/" + (expire.substr(2, 4));
        } else if (expire.match(/^\d\d\d$/g)) {
          expire = "0" + (expire.substr(0, 1)) + "/20" + (expire.substr(1, 2));
        } else {
          $expire.parsley('custom', function(val) {
            if (val.indexOf('/') === -1) {
              return lang.IDE.SETTINGS_CREATE_PROJECT_EXPIRE_FORMAT;
            }
            return null;
          });
        }
        modal.tpl.find("input").each(function(idx, dom) {
          if (!$(dom).parsley('validate')) {
            valid = false;
            return false;
          }
        });
        if (valid) {
          $create.prop('disabled', true);
          return App.model.createProject({
            name: $name.val(),
            firstname: $firstname.val(),
            lastname: $lastname.val(),
            email: $email.val(),
            card: {
              number: $number.val(),
              expire: expire,
              cvv: $cvv.val()
            }
          }).then(function(project) {
            modal.close();
            return App.loadUrl(project.url());
          }).fail(function(error) {
            var err, msgObj;
            try {
              msgObj = JSON.parse(error.result);
              if (_.isArray(msgObj.errors)) {
                modal.tpl.find(".new-project-err").show().html(msgObj.errors.join('<br/>'));
              }
            } catch (_error) {
              err = _error;
              notification('error', error.result);
            }
          }).done(function() {
            return $create.prop('disabled', false);
          });
        }
      }
    });
    HeaderPopup = Backbone.View.extend({
      constructor: function(attr) {
        var key, value;
        for (key in attr) {
          value = attr[key];
          this[key] = value;
        }
        this.setElement($("<div class='hp-popup-overlay'></div>").appendTo("body").on("click", (function(_this) {
          return function(evt) {
            return _this.closeOnClick(evt);
          };
        })(this)));
        this.render();
        Backbone.View.call(this);
      },
      closeOnEvent: function() {
        return true;
      },
      closeOnClick: function(evt) {
        if (evt.target === this.el || (this.closeOnEvent && this.closeOnEvent(evt))) {
          return this.close();
        }
      },
      close: function() {
        this.remove();
        if (this.onClose) {
          this.onClose(this);
        }
      }
    });
    UserPopup = HeaderPopup.extend({
      events: {
        "click .logout": "logout"
      },
      render: function() {
        return this.$el.html(ProjectTpl.usermenu());
      },
      logout: function() {
        return App.logout();
      }
    });
    AssetListPopup = HeaderPopup.extend({
      events: {
        "click .off-canvas-tab": "switchTab"
      },
      initialize: function() {
        this.listenTo(this.project, "change:stack", this.render);
        this.listenTo(this.project, "change:app", this.render);
        this.listenTo(this.project, "update:stack", this.render);
        this.listenTo(this.project, "update:app", this.render);
      },
      closeOnEvent: function(evt) {
        return $(evt.target).hasClass("route");
      },
      switchTab: function(evt) {
        var $tgt, id;
        $tgt = $(evt.currentTarget);
        $tgt.parent().children().removeClass("selected");
        $tgt.addClass("selected");
        id = $tgt.attr("data-id");
        this.$el.find(".hp-asset-list-wrap").children().hide().filter("[data-id='" + id + "']").show();
        this.showApp = id === "app";
      },
      render: function() {
        return this.$el.html(ProjectTpl.assetList({
          apps: this.project.apps().groupByRegion(),
          stacks: this.project.stacks().groupByRegion(),
          showApp: this.showApp
        }));
      }
    });
    ProjectListPopup = HeaderPopup.extend({
      render: function() {
        var p, projects, _i, _len, _ref;
        projects = [];
        _ref = App.model.projects().models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          projects.push({
            id: p.id,
            url: p.url(),
            name: p.get("name"),
            selected: p === this.project,
            "private": p.isPrivate()
          });
        }
        this.$el.html(ProjectTpl.projectList(projects));
        this.$el.find(".create-new-project").on("click", _.bind(this.createProject, this));
        return this;
      },
      createProject: function() {
        return new ProjectCreation();
      }
    });
    return Backbone.View.extend({
      initialize: function(attr) {
        var $header, self;
        this.scene = attr.scene;
        this.tabsWidth = 0;
        this.setElement($(ProjectTpl.frame()).appendTo("#scenes"));
        this.render();
        this.$tabbar = this.$el.find(".ws-tabbar");
        this.$wsparent = this.$el.find(".ws-content");
        self = this;
        this.$el.find(".ws-tabs").dragsort({
          horizontal: true,
          dragSelectorExclude: ".fixed, .icon-close",
          dragEnd: function() {
            return self.updateTabOrder();
          }
        });
        $header = this.$header = this.$el.find(".project-header");
        $header.on("click", ".ws-tabbar li", function(evt) {
          return self.onTabClick(evt);
        });
        $header.on("click", ".ws-tabbar .icon-close", function(evt) {
          return self.onTabClose(evt);
        });
        $header.on("click", ".popuptrigger", function(evt) {
          return self[$(evt.currentTarget).attr("data-popup")](evt.currentTarget);
        });
        return $header.on("click", ".icon-support", function() {
          if (window.Intercom) {
            window.Intercom('showNewMessage');
            return false;
          }
        });
      },
      render: function() {
        this.$el.find(".project-list").text(this.scene.project.get("name"));
        this.$el.find(".user-menu").text(App.user.get("username"));
      },

      /* -----------------
       * Header Related
      -----------------
       */
      showPopup: function(template, ignoreClicked) {
        var $overlay, oneTimeClicked;
        $overlay = $("<div class='hp-popup-overlay'>" + template + "</div>").appendTo("body");
        oneTimeClicked = function(evt) {
          if (ignoreClicked && ignoreClicked(evt.target)) {
            return;
          }
          console.log("popupclosed");
          $("body")[0].removeEventListener("click", oneTimeClicked, true);
          return $overlay.remove();
        };
        $("body")[0].addEventListener("click", oneTimeClicked, true);
        return $overlay;
      },
      popupProject: function() {
        return new ProjectListPopup({
          project: this.scene.project
        });
      },
      popupAsset: function() {
        return new AssetListPopup({
          project: this.scene.project
        });
      },
      popupUser: function() {
        return new UserPopup();
      },
      popupNotify: function() {},

      /* ------------------
       * Workspace Related
      ------------------
       */
      getTabElementById: function(id) {
        return this.$tabbar.find("[data-id='" + id + "']");
      },
      updateTabOrder: function() {
        return this.trigger("wsOrderChanged");
      },
      spaceOrder: function() {
        return _.map(this.$tabbar.find("li"), function(li) {
          return $(li).attr("data-id");
        });
      },
      moveSpace: function(id, isFixed, idx) {
        var $after, $group, $tgt;
        $tgt = this.getTabElementById(id);
        if (!$tgt.length) {
          return;
        }
        if (isFixed) {
          $group = this.$tabbar.children(".ws-fixed-tabs");
        } else {
          $group = this.$tabbar.children(".ws-tabs");
          idx -= this.$tabbar.children().length;
        }
        $after = $group.children().eq(idx);
        if ($after.length) {
          $tgt.insertBefore($after);
        } else {
          $group.append($tgt);
        }
      },
      awakeSpace: function(id) {
        this.$tabbar.find(".active").removeClass("active");
        this.getTabElementById(id).addClass("active");
      },
      updateSpace: function(id, title, klass) {
        var $tgt;
        $tgt = this.getTabElementById(id);
        if (title !== void 0 || title !== null) {
          this.tabsWidth -= $tgt.outerWidth();
          $tgt.attr("title", title);
          $tgt.children("span").text(title);
          this.tabsWidth += $tgt.outerWidth();
          this.ensureTabSize();
        }
        if (klass !== void 0 || klass !== null) {
          if ($tgt.hasClass("active")) {
            klass += " active";
          }
          $tgt.attr("class", klass);
        }
      },
      onTabClick: function(evt) {
        this.trigger("wsClicked", $(evt.currentTarget).attr("data-id"));
      },
      onTabClose: function(evt) {
        this.trigger("wsClosed", $(evt.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      removeSpace: function(id) {
        var $tgt;
        $tgt = this.getTabElementById(id);
        this.tabsWidth -= $tgt.outerWidth();
        $tgt.remove();
        this.ensureTabSize();
        return $tgt;
      },
      showLoading: function() {
        return $("#GlobalLoading").show();
      },
      hideLoading: function() {
        return $("#GlobalLoading").hide();
      },
      ensureTabSize: function() {
        var availableSpace, children, flexibleTB, windowWidth;
        flexibleTB = this.$tabbar.children(".ws-tabs");
        windowWidth = $(window).width();
        availableSpace = windowWidth - flexibleTB.offset().left - this.$tabbar.siblings("nav").width();
        children = flexibleTB.children();
        if (this.tabsWidth < availableSpace) {
          children.css("max-width", "auto");
        } else {
          availableSpace = Math.floor(availableSpace / children.length);
          children.css("max-width", availableSpace);
        }
      },
      addSpace: function(data, index, fixed) {
        var $parent, $tgt, tpl;
        if (index == null) {
          index = -1;
        }
        if (fixed == null) {
          fixed = false;
        }
        if (fixed) {
          $parent = this.$tabbar.children(".ws-fixed-tabs");
        } else {
          $parent = this.$tabbar.children(".ws-tabs");
        }
        tpl = "<li class='" + data.klass + "' data-id='" + data.id + "' title='" + data.title + "'><span class='truncate'>" + data.title + "</span>";
        if (data.closable) {
          tpl += '<i class="icon-close" title="' + lang.TOOLBAR.TIT_CLOSE_TAB + '"></i>';
        }
        $tgt = $parent.children().eq(index);
        if ($tgt.length) {
          $tgt = $(tpl + "</li>").insertAfter($tgt);
        } else {
          $tgt = $(tpl + "</li>").appendTo($parent);
        }
        this.tabsWidth += $tgt.outerWidth();
        this.ensureTabSize();
        return $tgt;
      }
    });
  });

}).call(this);

(function() {
  define('Workspace',["backbone"], function() {
    var SubWorkspaces, Workspace, wsid;
    wsid = 0;
    SubWorkspaces = {};
    Workspace = Backbone.Model.extend({
      constructor: function(attr, option) {
        console.assert(option && option.scene);
        this.scene = option.scene;
        Backbone.Model.apply(this, arguments);
        this.set("id", "space_" + (++wsid));
        this.scene.addSpace(this);
      },
      isAwake: function() {
        return this.scene.getAwakeSpace() === this;
      },
      setIndex: function(idx) {
        return this.scene.moveSpace(this, idx);
      },
      index: function() {
        return this.scene.spaces().indexOf(this);
      },
      isRemoved: function() {
        return !!this.__isRemoved;
      },
      remove: function() {
        if (this.__isRemoved) {
          return;
        }
        this.__isRemoved = true;
        return this.scene.removeSpace(this, true);
      },
      updateUrl: function() {
        return this.scene.updateSpace(this);
      },
      updateTab: function() {
        return this.scene.updateSpace(this);
      },
      activate: function() {
        return this.scene.awakeSpace(this);
      },

      /*
        Methods that should be override
       */
      initialize: function(attributes) {},
      isFixed: function() {
        return false;
      },
      isModified: function() {
        return false;
      },
      tabClass: function() {
        return "";
      },
      title: function() {
        return "";
      },
      awake: function() {
        if (this.view) {
          return this.view.$el.show();
        }
      },
      sleep: function() {
        $(document.activeElement).filter("input, textarea").blur();
        if (this.view) {
          return this.view.$el.hide();
        }
      },
      cleanup: function() {
        if (this.view) {
          this.view.remove();
        } else {
          console.warn("Cannot find @view when workspace is about to remove:", this);
        }
      },
      isRemovable: function() {
        return true;
      },
      isWorkingOn: function(attributes) {
        return false;
      }
    }, {
      findSuitableSpace: function(data) {
        var Space, s, type;
        s = null;
        for (type in SubWorkspaces) {
          Space = SubWorkspaces[type];
          if (Space.canHandle(data)) {
            console.assert(!s, "There's multiple workspace that can handle this data:", data);
            s = Space;
          }
        }
        return s;
      },
      canHandle: function(data) {
        return false;
      },
      extend: function(protoProps, staticProps) {
        var subClass;
        subClass = (window.__detailExtend || Backbone.Model.extend).call(this, protoProps, staticProps);
        SubWorkspaces[protoProps.type] = subClass;
        return subClass;
      }
    });
    return Workspace;
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('scenes/ProjectScene',["Scene", "./ProjectView", "./ProjectTpl", "Workspace", "UI.modalplus", "i18n!/nls/lang.js"], function(Scene, ProjectView, ProjectTpl, Workspace, Modal, lang) {
    var ProjectScene, SwitchConfirmView;
    SwitchConfirmView = Backbone.View.extend({
      events: {
        "click .do-switch": "switch"
      },
      initialize: function(attr) {
        this.toOpenProject = attr.project;
        this.toOpenOpsModel = attr.opsmodel;
        this.modal = new Modal({
          template: ProjectTpl.switchConfirm(),
          title: lang.IDE.SETTINGS_CREATE_PROJECT_TITLE,
          disableClose: true,
          disableFooter: true,
          width: "500px"
        });
        return this.setElement(this.modal.tpl);
      },
      "switch": function() {
        (new ProjectScene(this.toOpenProject, this.toOpenOpsModel, {
          slient: true
        })).activate();
        this.modal.close();
      }
    });
    ProjectScene = (function(_super) {
      __extends(ProjectScene, _super);

      ProjectScene.prototype.type = "ProjectScene";

      function ProjectScene(projectId, opsmodelId, options) {
        var scene, scenes, ss, _i, _j, _len, _len1;
        ss = App.sceneManager.find(projectId);
        if (ss) {
          ss.activate();
          ss.loadSpace(opsmodelId);
          return ss;
        }
        options = options || {};
        if (!options.slient) {
          if (_.some(App.sceneManager.scenes(), (function(s) {
            return s.type === "ProjectScene" && !s.isRemovable();
          }))) {
            App.sceneManager.activeScene().updateUrl();
            new SwitchConfirmView({
              project: projectId,
              opsmodel: opsmodelId
            });
            return;
          }
        }
        scenes = App.sceneManager.scenes().filter(function(m) {
          return m.type === "ProjectScene";
        });
        for (_i = 0, _len = scenes.length; _i < _len; _i++) {
          scene = scenes[_i];
          scene.removeNotFixedSpaces();
        }
        Scene.call(this, {
          pid: projectId,
          opsid: opsmodelId
        });
        for (_j = 0, _len1 = scenes.length; _j < _len1; _j++) {
          scene = scenes[_j];
          scene.remove();
        }
        return this;
      }

      ProjectScene.prototype.initialize = function(attr) {
        var self;
        self = this;
        this.__spaces = [];
        this.__awakeSpace = null;
        this.__spacesById = {};
        this.project = App.model.projects().get(attr.pid) || App.model.getPrivateProject();
        this.view = new ProjectView({
          scene: this
        });
        this.listenTo(this.view, "wsOrderChanged", function() {
          return this.__updateSpaceOrder();
        });
        this.listenTo(this.view, "wsClicked", function(id) {
          return this.awakeSpace(id);
        });
        this.listenTo(this.view, "wsClosed", function(id) {
          return this.removeSpace(id);
        });
        this.activate();
        self.loadDashboard();
        self.loadSpace(attr.opsid);
      };

      ProjectScene.prototype.becomeActive = function() {
        this.view.$el.show();
        this.updateUrl();
        return this.updateTitle();
      };

      ProjectScene.prototype.isRemovable = function() {
        return _.all(this.__spaces, function(ws) {
          return !ws.isModified();
        });
      };

      ProjectScene.prototype.becomeInactive = function() {
        return Scene.prototype.becomeInactive.call(this);
      };

      ProjectScene.prototype.cleanup = function() {
        return Scene.prototype.cleanup.call(this);
      };

      ProjectScene.prototype.isWorkingOn = function(projectId) {
        return this.project.id === projectId;
      };

      ProjectScene.prototype.title = function() {
        var name;
        name = this.project.get("name");
        if (this.getAwakeSpace()) {
          name = this.getAwakeSpace().title() + " on " + name;
        }
        return name;
      };

      ProjectScene.prototype.url = function() {
        var basic;
        basic = this.project.url() + "/";
        if (this.getAwakeSpace()) {
          basic += this.getAwakeSpace().url();
        }
        return basic.replace(/\/+$/, "");
      };


      /* -------------------------------
       * Funtions to manage the workspaces.
      ------------------------
       */

      ProjectScene.prototype.loadSpace = function(opsModelOrId) {
        var attr;
        if (!opsModelOrId) {
          return this.loadDashboard();
        }
        attr = {
          opsModel: _.isString(opsModelOrId) ? this.project.getOpsModel(opsModelOrId) : opsModelOrId
        };
        if (!attr.opsModel) {
          return;
        }
        (this.createSpace(attr)).activate();
      };

      ProjectScene.prototype.loadDashboard = function() {
        return (this.createSpace({
          type: "Dashboard"
        })).activate();
      };

      ProjectScene.prototype.createSpace = function(data) {
        var SpaceClass, existing;
        existing = this.findSpace(data);
        if (existing) {
          return existing;
        }
        SpaceClass = Workspace.findSuitableSpace(data);
        console.assert(SpaceClass, "Cannot find suitable workspace to work with the data", data);
        return new SpaceClass(data, {
          scene: this
        });
      };

      ProjectScene.prototype.spaceParentElement = function() {
        return this.view.$wsparent;
      };

      ProjectScene.prototype.__updateSpaceOrder = function() {
        var dict;
        dict = this.__spacesById;
        this.__spaces = this.view.spaceOrder().map(function(id) {
          return dict[id];
        });
      };

      ProjectScene.prototype.updateSpace = function(workspace) {
        if (workspace === this.__awakeSpace) {
          this.updateUrl();
          this.updateTitle();
        }
        this.view.updateSpace(workspace.id, workspace.title(), workspace.tabClass());
        return workspace;
      };

      ProjectScene.prototype.spaces = function() {
        return this.__spaces.slice(0);
      };

      ProjectScene.prototype.getAwakeSpace = function() {
        return this.__awakeSpace;
      };

      ProjectScene.prototype.getSpace = function(spaceId) {
        return this.__spacesById[spaceId];
      };

      ProjectScene.prototype.findSpace = function(attribute) {
        return _.find(this.__spaces, function(space) {
          return space.isWorkingOn(attribute);
        });
      };

      ProjectScene.prototype.moveSpace = function(workspace, idx) {
        this.view.moveSpace(workspace.id, workspace.isFixed(), idx);
        this.__updateSpaceOrder();
      };

      ProjectScene.prototype.addSpace = function(workspace) {
        if (this.__spacesById[workspace.id]) {
          return;
        }
        this.__spacesById[workspace.id] = workspace;
        this.view.addSpace({
          title: workspace.title(),
          id: workspace.id,
          closable: !workspace.isFixed(),
          klass: workspace.tabClass()
        }, -1, workspace.isFixed());
        this.__updateSpaceOrder();
        if (this.__spaces.length === 1) {
          this.awakeSpace(workspace);
        }
        return workspace;
      };

      ProjectScene.prototype.awakeSpace = function(workspace) {
        var promise;
        if (!workspace) {
          return;
        }
        if (_.isString(workspace)) {
          workspace = this.__spacesById[workspace];
        }
        if (this.__awakeSpace === workspace) {
          return;
        }
        if (workspace.isRemoved()) {
          return;
        }
        if (this.__awakeSpace) {
          this.__awakeSpace.sleep();
        }
        this.__awakeSpace = workspace;
        this.updateTitle();
        this.updateUrl();
        this.view.awakeSpace(workspace.id);
        promise = workspace.awake();
        if (promise && promise.then && promise.isFulfilled && !promise.isFulfilled()) {
          promise.then((function(_this) {
            return function() {
              return _this.view.hideLoading();
            };
          })(this));
          this.view.showLoading();
        } else {
          this.view.hideLoading();
        }
      };

      ProjectScene.prototype.removeSpace = function(workspace, force) {
        var id;
        if (!workspace) {
          return;
        }
        if (_.isString(workspace)) {
          workspace = this.__spacesById[workspace];
        }
        if (!force && !workspace.isRemovable()) {
          return;
        }
        id = workspace.id;
        this.view.removeSpace(id);
        delete this.__spacesById[id];
        this.__spaces.splice(this.__spaces.indexOf(workspace), 1);
        workspace.stopListening();
        workspace.cleanup();
        if (this.__awakeSpace === workspace) {
          this.__awakeSpace = null;
          this.awakeSpace(this.__spaces[this.__spaces.length - 1]);
        }
        return workspace;
      };

      ProjectScene.prototype.removeAllSpaces = function() {
        var space, _i, _len, _ref;
        _ref = this.spaces();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          space = _ref[_i];
          this.removeSpace(space, true);
        }
      };

      ProjectScene.prototype.removeNotFixedSpaces = function(filter) {
        var space, _i, _len, _ref;
        _ref = this.spaces();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          space = _ref[_i];
          if (!space.isFixed() && (!filter || filter(space))) {
            this.removeSpace(space, true);
          }
        }
      };

      return ProjectScene;

    })(Scene);
    Scene.SetDefaultScene(ProjectScene);
    return ProjectScene;
  });

}).call(this);

define('scenes/settings/template/TplProject',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n        <a data-id=\"billing\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_BILLING_TAB", {hash:{},data:data}))
    + "</a>\r\n        <a data-id=\"credential\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROVIDER_CREDENTIAL", {hash:{},data:data}))
    + "</a>\r\n        ";
  return buffer;
  }

  buffer += "<nav id=\"settings-nav\">\r\n    <a class=\"back-settings\">&lt; "
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_BACK", {hash:{},data:data}))
    + "</a>\r\n    <section class=\"function-list\">\r\n        <header class=\"settings-nav-project-title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</header>\r\n        <a data-id=\"basicsettings\">"
    + escapeExpression(helpers.i18n.call(depth0, "BASIC_SETTINGS", {hash:{},data:data}))
    + "</a>\r\n        <a data-id=\"member\">"
    + escapeExpression(helpers.i18n.call(depth0, "MEMBER", {hash:{},data:data}))
    + "</a>\r\n        <a data-id=\"usagereport\">"
    + escapeExpression(helpers.i18n.call(depth0, "USAGE_REPORT", {hash:{},data:data}))
    + "</a>\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.admin), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        <a data-id=\"accesstoken\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSTOKEN", {hash:{},data:data}))
    + "</a>\r\n    </section>\r\n</nav>\r\n<section class=\"setting-content\">\r\n    <header class=\"project-title\"><span id=\"title-project-name\"></span><span id=\"title-tab-name\"></span></header>\r\n    <article class=\"project-subview\"></article>\r\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('scenes/settings/template/TplBasicSettings',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers.unless.call(depth0, (depth0 && depth0['private']), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program2(depth0,data) {
  
  
  return "<button class=\"icon-edit edit-button\"></button>";
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n<dl class=\"settings-item project-item\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DELETE_WORKSPACE", {hash:{},data:data}))
    + "</dt>\n    <dd class=\"delete-project-zone\">\n    </dd>\n</dl>\n";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n<dl class=\"settings-item project-item\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "LEAVE_WORKSPACE", {hash:{},data:data}))
    + "</dt>\n    <dd class=\"leave-project-zone\">\n    </dd>\n</dl>\n";
  return buffer;
  }

  buffer += "<dl class=\"settings-item project-name-zone project-item\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "WORKSPACE_NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>\n        <div class=\"normal-mode\">\n            <span class=\"project-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </div>\n        <div class=\"edit-mode\">\n            <input type=\"text\" class=\"input\" id=\"project-name\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <div class=\"edit-actions\">\n                <button class=\"btn btn-blue\" id=\"update-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_UPDATE", {hash:{},data:data}))
    + "</button>\n                <a class=\"cancel-button\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</a>\n            </div>\n            <div class=\"loading-spinner\" style=\"display: none;\"></div>\n        </div>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAdmin), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dd>\n</dl>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAdmin), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0['private']), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.basicSettings=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<p>"
    + escapeExpression(helpers.i18n.call(depth0, "THIS_ACTION_CANNOT_BE_REVERTED", {hash:{},data:data}))
    + "<br/>"
    + escapeExpression(helpers.i18n.call(depth0, "TYPE_THE_WORKSPACE_NAME_TO_CONFIRM", {hash:{},data:data}))
    + "</p>\n<div class=\"confirm-action\">\n    <input type=\"text\" class=\"input\" id=\"confirm-project-name\"/>\n    <button class=\"btn btn-red\" id=\"do-delete-project\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "CONFIRM_TO_DELETE", {hash:{},data:data}))
    + "</button>\n    <a class=\"cancel-delete-confirm\">Cancel</a>\n</div>";
  return buffer;
  };
TEMPLATE.confirmToDelete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<p>"
    + escapeExpression(helpers.i18n.call(depth0, "THIS_ACTION_CANNOT_BE_REVERTED", {hash:{},data:data}))
    + "<br/>"
    + escapeExpression(helpers.i18n.call(depth0, "ARE_YOU_SURE_YOU_WANT_TO_LEAVE_THIS_WORKSPACE", {hash:{},data:data}))
    + "</p>\n<div class=\"confirm-action\">\n    <button class=\"btn btn-red\" id=\"do-leave-project\">"
    + escapeExpression(helpers.i18n.call(depth0, "CONFIRM_TO_LEAVE", {hash:{},data:data}))
    + "</button>\n    <a class=\"cancel-leave-confirm\">Cancel</a>\n</div>";
  return buffer;
  };
TEMPLATE.confirmToLeave=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n<p>"
    + escapeExpression(helpers.i18n.call(depth0, "FREE_WORKSPACE_CAN_NOT_DELETE", {hash:{},data:data}))
    + "</p>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.failedToPay), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "DELETE_WORKSPACE_WILL_FORGOT_APPS", {hash:{},data:data}))
    + "</p>\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "IMPORT_JSON_BEFORE_DELETE_WORKSPACE", {hash:{},data:data}))
    + "</p>\n    <button class=\"btn btn-red icon-delete\" id=\"delete-project\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.failedToPay), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(helpers.i18n.call(depth0, "DELETE_WORKSPACE", {hash:{},data:data}))
    + "</button>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <p class=\"warning-red\">"
    + escapeExpression(helpers.i18n.call(depth0, "CANT_DELETE_WORKSPACE", {hash:{},data:data}))
    + "</p>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0['private']), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<p>"
    + escapeExpression(helpers.i18n.call(depth0, "LEAVING_WORKSPACE_WILL_NOT_ACCESS", {hash:{},data:data}))
    + "</p>\n<button class=\"btn btn-red icon-delete\" id=\"leave-project\">"
    + escapeExpression(helpers.i18n.call(depth0, "LEAVE_WORKSPACE", {hash:{},data:data}))
    + "</button>\n<!-- <div class=\"level-error-tip hide\">"
    + escapeExpression(helpers.i18n.call(depth0, "LEAVING_WORKSPACE_WILL_ONLY_ONE_ADMIN", {hash:{},data:data}))
    + "</div> -->";
  return buffer;
  };
TEMPLATE.leave=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('scenes/settings/models/MemberCollection',['ApiRequest', 'backbone', 'crypto'], function(ApiRequest) {
    var MemberCollection, MemberModel;
    MemberModel = Backbone.Model.extend({
      defaults: {
        id: '',
        avatar: '',
        username: '',
        email: '',
        role: '',
        state: '',
        me: false,
        _username: '',
        _email: '',
        projectId: ''
      },
      updateRole: function(newRole) {
        var that;
        that = this;
        return ApiRequest('project_update_role', {
          project_id: this.get('projectId'),
          member_id: this.id,
          new_role: newRole
        }).then(function() {
          return that.set('role', newRole);
        });
      },
      cancelInvite: function() {
        var that;
        that = this;
        return ApiRequest('project_cancel_invitation', {
          project_id: this.get('projectId'),
          member_id: this.id
        }).then(function() {
          var _ref;
          return (_ref = that.collection) != null ? _ref.remove(that) : void 0;
        });
      },
      isAdmin: function() {
        return this.get('role') === 'admin';
      },
      isOnlyAdmin: function() {
        var adminAry, data, that;
        that = this;
        data = that.collection.toJSON();
        adminAry = [];
        _.each(data, function(member) {
          if (member.role === 'admin' && member.state === 'normal') {
            adminAry.push(member.username);
          }
          return null;
        });
        if (adminAry.length === 1 && adminAry[0] === this.get('username')) {
          return true;
        }
        return false;
      }
    });
    MemberCollection = Backbone.Collection.extend({
      constructor: function(attr) {
        Backbone.Collection.apply(this);
        return this.projectId = attr.projectId;
      },
      model: MemberModel,
      projectId: '',
      limit: 10,
      fetch: function() {
        var that;
        that = this;
        return ApiRequest('project_list_member', {
          project_id: that.projectId
        }).then(function(data) {
          var members, models;
          that.limit = data[0];
          members = data[1];
          models = _.map(members, function(member) {
            var avatar, currentUserName, email, userName;
            userName = Base64.decode(member.username);
            currentUserName = App.user.get('username');
            email = Base64.decode(member.email);
            avatar = CryptoJS.MD5(email.trim().toLowerCase()).toString();
            return new that.model({
              id: member.id,
              avatar: "https://www.gravatar.com/avatar/" + avatar,
              username: userName,
              email: email,
              role: member.role,
              state: member.state,
              me: userName === currentUserName,
              _username: member.username,
              _email: member.email,
              projectId: that.projectId
            });
          });
          return that.reset(models);
        });
      },
      removeMember: function(memIds) {
        var that;
        that = this;
        return ApiRequest('project_remove_members', {
          project_id: this.projectId,
          member_ids: memIds
        }).then(function() {
          return that.remove(memIds);
        });
      },
      inviteMember: function(email) {
        var that;
        that = this;
        return ApiRequest('project_invite', {
          project_id: this.projectId,
          member_email: email,
          member_role: 'collaborator'
        }).then(function() {
          return that.push(new that.model());
        });
      },
      getCurrentMember: function() {
        return this.findWhere({
          username: App.user.get('username')
        });
      },
      isLimitInvite: function() {
        return this.models.length >= this.limit;
      }
    });
    return MemberCollection;
  });

}).call(this);

(function() {
  define('scenes/settings/views/BasicSettingsView',['i18n!/nls/lang.js', '../template/TplBasicSettings', 'UI.modalplus', '../models/MemberCollection', 'UI.notification', 'backbone'], function(lang, TplBasicSettings, Modal, MemberCollection) {
    return Backbone.View.extend({
      events: {
        'click .edit-button': 'edit',
        'click .cancel-button': 'cancelEdit',
        'click #update-name': 'updateName',
        'click #delete-project': 'confirmDelete',
        'click #leave-project': 'confirmLeave',
        'keyup #project-name': 'checkName',
        'keyup #confirm-project-name': 'confirmProjectName',
        'paste #confirm-project-name': 'deferConfirmProjectName',
        'click #do-delete-project': 'doDelete',
        'click #do-leave-project': 'doLeave',
        'click .cancel-leave-confirm': 'cancelLeaveConfirm',
        'click .cancel-delete-confirm': 'cancelDeleteConfirm'
      },
      className: 'basic-settings',
      initialize: function(options) {
        _.extend(this, options);
        this.memberCol = new MemberCollection({
          projectId: this.model.id
        });
        return this.listenTo(this.model, 'change:name', this.changeNameOnView);
      },
      getRenderData: function() {
        var data;
        data = this.model.toJSON();
        data.isAdmin = this.model.amIAdmin();
        data.isMember = this.model.amIMeber();
        data.isObserver = this.model.amIObserver();
        data.failedToPay = this.model.get("billingState") === "failed";
        return data;
      },
      render: function() {
        var data;
        data = this.getRenderData();
        this.$el.html(TplBasicSettings.basicSettings(data));
        this.renderLeaveZone(data);
        if (data.isAdmin) {
          this.renderDeleteZone(data);
        }
        return this;
      },
      renderLeaveZone: function(data, confirm) {
        var tpl;
        if (data == null) {
          data = this.getRenderData();
        }
        if (confirm == null) {
          confirm = false;
        }
        if (confirm) {
          tpl = TplBasicSettings.confirmToLeave;
        } else {
          tpl = TplBasicSettings.leave;
        }
        this.$('.leave-project-zone').html(tpl(data));
        return this;
      },
      renderDeleteZone: function(data, confirm) {
        var tpl;
        if (data == null) {
          data = this.getRenderData();
        }
        if (confirm == null) {
          confirm = false;
        }
        if (confirm) {
          tpl = TplBasicSettings.confirmToDelete;
        } else {
          tpl = TplBasicSettings["delete"];
        }
        this.$('.delete-project-zone').html(tpl(data));
        return this;
      },
      renderLoading: function() {
        return this.$el.html(TplBasicSettings.loading);
      },
      deferConfirmProjectName: function(e) {
        return _.defer(_.bind(this.confirmProjectName, this, e));
      },
      confirmProjectName: function(e) {
        if (e.currentTarget.value === this.model.get('name')) {
          return this.$('#do-delete-project').prop('disabled', false);
        } else {
          return this.$('#do-delete-project').prop('disabled', true);
        }
      },
      edit: function(e) {
        return $(e.currentTarget).closest('.project-item').addClass('edit');
      },
      cancelEdit: function(e) {
        return $(e.currentTarget).closest('.project-item').removeClass('edit');
      },
      checkName: function(e) {
        var $updateBtn;
        $updateBtn = this.$('#update-name');
        if (e.currentTarget.value.length > 0) {
          return $updateBtn.prop('disabled', false);
        } else {
          return $updateBtn.prop('disabled', true);
        }
      },
      updateName: function(e) {
        var newName, that;
        that = this;
        newName = this.$('#project-name').val();
        this.updateNameLoading(e);
        return this.model.updateName(newName).then(function() {
          that.updateNameLoading(e, true);
          return that.cancelEdit(e);
        }, function() {
          that.updateNameLoading(e, true);
          return notification('error', lang.IDE.SETTINGS_ERR_PROJECT_RENAME);
        });
      },
      changeNameOnView: function() {
        return this.$('.project-name').text(this.model.get('name'));
      },
      updateNameLoading: function(e, stop) {
        var $editZone, $loadingZone, $projectItem;
        if (stop == null) {
          stop = false;
        }
        $projectItem = $(e.currentTarget).closest('.project-item');
        $editZone = $projectItem.find('.edit-actions');
        $loadingZone = $projectItem.find('.loading-spinner');
        $editZone.toggle(stop);
        return $loadingZone.toggle(!stop);
      },
      doDelete: function() {
        var that;
        that = this;
        this.renderLoading();
        return this.model.destroy().then(function() {
          that.remove();
          return that.settingsView.backToDefaultProject();
        }, function() {
          that.render();
          return notification('error', lang.IDE.SETTINGS_ERR_PROJECT_REMOVE);
        });
      },
      doLeave: function() {
        var that;
        that = this;
        that.renderLoading();
        if (!that.model.amIAdmin()) {
          return that.toLeave();
        } else {
          return that.memberCol.fetch().then(function() {
            var currentMember;
            currentMember = that.memberCol.getCurrentMember();
            if (currentMember.isAdmin()) {
              if (!currentMember.isOnlyAdmin()) {
                return that.toLeave();
              } else {
                that.render();
                return notification('error', lang.IDE.LEAVING_WORKSPACE_WILL_ONLY_ONE_ADMIN);
              }
            } else {
              return that.toLeave();
            }
          }).fail(function(data) {
            that.render();
            return notification('error', data.result || data.msg);
          });
        }
      },
      toLeave: function() {
        var that;
        that = this;
        return that.model.leave().then(function() {
          that.remove();
          return that.settingsView.backToDefaultProject();
        }, function() {
          that.render();
          return notification('error', lang.IDE.SETTINGS_ERR_PROJECT_LEAVE);
        });
      },
      confirmLeave: function() {
        return this.renderLeaveZone(null, true);
      },
      cancelLeaveConfirm: function() {
        return this.renderLeaveZone();
      },
      confirmDelete: function() {
        return this.renderDeleteZone(null, true);
      },
      cancelDeleteConfirm: function() {
        return this.renderDeleteZone();
      }
    });
  });

}).call(this);

define('scenes/settings/template/TplAccessToken',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "<button class=\"btn btn-blue right\" id=\"TokenCreate\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_BTN_TOKEN_CREATE", {hash:{},data:data}))
    + "</button>";
  return buffer;
  }

  buffer += "<section>\r\n    <div id=\"TokenManager\">\r\n        <p class=\"clearfix\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAdmin), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            "
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN", {hash:{},data:data}))
    + "<a href=\"http://docs.visualops.io/app_management/reload_states.html\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN_LINK", {hash:{},data:data}))
    + "</a> </p>\r\n        <section class=\"token-table\">\r\n            <header class=\"clearfix\">\r\n                <span class=\"tokenName\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_TOKENTABLE_NAME", {hash:{},data:data}))
    + "</span>\r\n                <span class=\"tokenToken\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_TOKENTABLE_TOKEN", {hash:{},data:data}))
    + "</span>\r\n            </header>\r\n            <div class=\"scroll-wrap\">\r\n                <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n                <ul id=\"TokenList\" class=\"scroll-content\" data-empty=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN_EMPTY", {hash:{},data:data}))
    + "\"></ul>\r\n            </div>\r\n        </section>\r\n    </div>\r\n    <div id=\"TokenRmConfirm\" class=\"hide\">\r\n        <h3 id=\"TokenRmTit\"></h3>\r\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CONFIRM_TOKEN_RM", {hash:{},data:data}))
    + "</p>\r\n        <div class=\"cred-btn-wrap clearfix\">\r\n            <button class=\"right btn btn-modal-close btn-silver\" id=\"TokenRmCancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</button>\r\n            <button id=\"TokenRemove\" class=\"btn btn-red right\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_BTN_TOKEN_REMOVE", {hash:{},data:data}))
    + "</button>\r\n        </div>\r\n    </div>\r\n\r\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('scenes/settings/views/AccessTokenView',['backbone', "../template/TplAccessToken", 'i18n!/nls/lang.js', "ApiRequest", "UI.scrollbar"], function(Backbone, template, lang, ApiRequest) {
    return Backbone.View.extend({
      className: "access-token-view",
      events: {
        "click #TokenCreate": "createToken",
        "click .tokenControl .icon-edit": "editToken",
        "click .tokenControl .icon-delete": "removeToken",
        "click .tokenControl .tokenDone": "doneEditToken",
        "click #TokenRemove": "confirmRmToken",
        "click #TokenRmCancel": "cancelRmToken"
      },
      initialize: function() {
        this.tokens = [];
        return this;
      },
      render: function() {
        var project_id, self;
        self = this;
        this.$el.html(MC.template.loadingSpinner());
        project_id = this.model.get("id");
        ApiRequest("token_list", {
          project_id: project_id
        }).then(function(res) {
          var isAdmin;
          isAdmin = self.model.amIAdmin();
          self.$el.html(template({
            isAdmin: isAdmin
          }));
          self.tokens = res[0].tokens;
          return self.updateTokenList();
        });
        return this;
      },
      editToken: function(evt) {
        var $p, $t;
        $t = $(evt.currentTarget);
        $p = $t.closest("li").toggleClass("editing", true);
        $p.children(".tokenName").removeAttr("readonly").focus().select();
      },
      removeToken: function(evt) {
        var $p, name;
        $p = $(evt.currentTarget).closest("li");
        name = $p.children(".tokenName").val();
        this.rmToken = $p.children(".tokenToken").text();
        this.$el.find("#TokenManager").hide();
        this.$el.find("#TokenRmConfirm").show();
        this.$el.find("#TokenRmTit").text(sprintf(lang.IDE.SETTINGS_CONFIRM_TOKEN_RM_TIT, name));
      },
      createToken: function() {
        var base, nameMap, project_id, self, t, tmpl, token_name, _i, _len, _ref;
        this.$el.find("#TokenCreate").attr("disabled", "disabled");
        self = this;
        tmpl = "MyToken";
        base = 1;
        nameMap = {};
        _ref = this.tokens;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          nameMap[t.name] = true;
        }
        while (true) {
          token_name = tmpl + base;
          if (nameMap[token_name]) {
            base += 1;
          } else {
            break;
          }
        }
        project_id = this.model.get("id");
        ApiRequest("token_create", {
          token_name: token_name,
          project_id: project_id
        }).then(function(res) {
          var name, token;
          name = res[0], token = res[1];
          self.tokens.push({
            name: name,
            token: token
          });
          self.updateTokenList();
          return self.$el.find("#TokenCreate").removeAttr("disabled");
        }, function() {
          notification("error", lang.NOTIFY.FAIL_TO_CREATE_TOKEN);
          return self.$el.find("#TokenCreate").removeAttr("disabled");
        });
      },
      doneEditToken: function(evt) {
        var $p, duplicate, new_token_name, oldName, project_id, self, t, token, _i, _len, _ref;
        self = this;
        $p = $(evt.currentTarget).closest("li").removeClass("editing");
        $p.children(".tokenName").attr("readonly", true);
        token = $p.children(".tokenToken").text();
        new_token_name = $p.children(".tokenName").val();
        _ref = this.tokens;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          if (t.token === token) {
            oldName = t.name;
          } else if (t.name === new_token_name) {
            duplicate = true;
          }
        }
        if (!new_token_name || duplicate) {
          $p.children(".tokenName").val(oldName);
          return;
        }
        project_id = this.model.get("id");
        ApiRequest("token_update", {
          token: token,
          new_token_name: new_token_name,
          project_id: project_id
        }).then(function(res) {
          var idx, _j, _len1, _ref1, _results;
          _ref1 = self.tokens;
          _results = [];
          for (idx = _j = 0, _len1 = _ref1.length; _j < _len1; idx = ++_j) {
            t = _ref1[idx];
            if (t.token === token) {
              t.name = new_token_name;
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }, function() {
          oldName = "";
          $p.children(".tokenName").val(oldName);
          return notification("error", lang.NOTIFY.FAIL_TO_UPDATE_TOKEN);
        });
      },
      confirmRmToken: function() {
        var idx, project_id, self, t, token, token_name, _i, _len, _ref;
        this.$el.find("#TokenRemove").attr("disabled", "disabled");
        self = this;
        _ref = this.tokens;
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          t = _ref[idx];
          if (t.token === this.rmToken) {
            break;
          }
        }
        project_id = this.model.get("id");
        token = this.rmToken;
        token_name = t.name;
        ApiRequest("token_remove", {
          project_id: project_id,
          token: token,
          token_name: token_name
        }).then(function(res) {
          idx = self.tokens.indexOf(t);
          if (idx >= 0) {
            self.tokens.splice(idx, 1);
            self.updateTokenList();
            return self.cancelRmToken();
          }
        }, function() {
          notification(lang.NOTIFY.FAIL_TO_DELETE_TOKEN);
          return self.cancelRmToken();
        });
      },
      cancelRmToken: function() {
        this.rmToken = "";
        this.$el.find("#TokenRemove").removeAttr("disabled");
        this.$el.find("#TokenManager").show();
        this.$el.find("#TokenRmConfirm").hide();
      },
      hasNoToken: function() {
        return this.tokens.length === 0 || (this.tokens.length === 1 && !this.tokens[0].name);
      },
      updateTokenList: function() {
        var hasNoToken, isAdmin, tokens;
        tokens = this.tokens;
        hasNoToken = this.hasNoToken();
        this.$el.find("#TokenManager").find(".token-table").toggleClass("empty", hasNoToken);
        if (!hasNoToken) {
          isAdmin = this.model.amIAdmin();
          this.$el.find("#TokenList").html(MC.template.accessTokenTable({
            tokens: tokens,
            isAdmin: isAdmin
          }));
        } else {
          this.$el.find("#TokenList").empty();
        }
      }
    });
  });

}).call(this);

define('scenes/settings/template/TplBilling',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"billing-status\" class=\"billing-frame\">\n</div>";
  };
TEMPLATE.billingLoadingFrame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.cardNumber)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "NO_CARD", {hash:{},data:data}));
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<p class=\"payment-username\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.firstName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.lastName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "<button class=\"btn btn-blue update-payment\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROVIDE_BILLING_INFORMATION", {hash:{},data:data}))
    + "<i class=\"icon-right\"></i></button>\n                ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "<button class=\"btn btn-blue update-payment\">"
    + escapeExpression(helpers.i18n.call(depth0, "UPDATE_BILLING_INFORMATION", {hash:{},data:data}))
    + "<i class=\"icon-right\"></i></button>\n                ";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\n        <dl class=\"billing-history settings-item\"></dl>\n    ";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dl class=\"billing-history settings-item\">\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "BILLING_HISTORY", {hash:{},data:data}))
    + "</dt> <span class=\"payment-next-billing\">"
    + escapeExpression(helpers.i18n.call(depth0, "NEXT_BILLING_ON", {hash:{},data:data}))
    + " "
    + escapeExpression(helpers.formatTime.call(depth0, ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.nextPeriod), "yyyy-MM-d", {hash:{},data:data}))
    + "</span>\n            <dd class=\"table-head-fix\">\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.paymentHistory)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(20, program20, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <table class=\"table-head\">\n                        <thead>\n                        <tr>\n                            <th class=\"sortable desc-sort\" data-row-type=\"datetime\" style=\"width:25%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "DATE", {hash:{},data:data}))
    + "</th>\n                            <th data-row-type=\"string\" style=\"width:25%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMOUNT", {hash:{},data:data}))
    + "</th>\n                            <th data-row-type=\"string\" style=\"width:25%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATUS", {hash:{},data:data}))
    + "</th>\n                            <th data-row-type=\"string\" style=\"width:25%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "ACTION", {hash:{},data:data}))
    + "</th>\n                        </tr>\n                        </thead>\n                    </table>\n                    <div class=\"scroll-wrap\" style=\"max-height:200px;\">\n                        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                        <div class=\"scroll-content\">\n                            <table class=\"table\">\n                                <thead>\n                                <tr>\n                                    <th style=\"width: 25%\">\n                                        <div class=\"th-inner\"></div>\n                                    </th>\n                                    <th style=\"width: 25%\">\n                                        <div class=\"th-inner\"></div>\n                                    </th>\n                                    <th style=\"width: 25%\">\n                                        <div class=\"th-inner\"></div>\n                                    </th>\n                                    <th style=\"width: 25%\">\n                                        <div class=\"th-inner\"></div>\n                                    </th>\n                                </tr>\n                                </thead>\n                                <tbody class=\"t-m-content\">\n                                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.paymentHistory), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                </tbody>\n                            </table>\n                        </div>\n                    </dd>\n                ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                    <tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                                        <td>"
    + escapeExpression(helpers.formatTime.call(depth0, (depth0 && depth0.updated_at), "yyyy-MM-d", {hash:{},data:data}))
    + "</td>\n                                        <td>$ "
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.ending_balance), (depth0 && depth0.total_balance), {hash:{},data:data}))
    + "</td>\n                                        <td>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.success), {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n                                        <td>\n                                            <a class=\"payment-receipt link-blue\" href=\"#\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_VIEW_RECEIPT", {hash:{},data:data}))
    + "</a></td>\n                                    </tr>\n                                ";
  return buffer;
  }
function program16(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PAYMENT_PAID", {hash:{},data:data}));
  }

function program18(depth0,data) {
  
  var buffer = "";
  buffer += "<span class=\"link-red\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_FAILED", {hash:{},data:data}))
    + "</span>";
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"full-space\">\n                        "
    + escapeExpression(helpers.i18n.call(depth0, "NO_BILLING_EVENT", {hash:{},data:data}))
    + "\n                    </div>\n                ";
  return buffer;
  }

  buffer += "<div id=\"PaymentBody\">\n    <p class=\"warning-red hide\"></p>\n    <dl class=\"settings-item billing-email\">\n        <dt class=\"billing-email-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_BILLING_EMAIL", {hash:{},data:data}))
    + "</dt>\n        <dd class=\"billing-email-text\">\n            <p>"
    + escapeExpression(helpers.or.call(depth0, ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.email), "Email not set", {hash:{},data:data}))
    + "</p>\n            <button class=\"icon-edit tooltip editEmailBtn\" data-tooltip=\"Click to edit billing email\"></button>\n            <input class=\"input hide\" type=\"text\"/>\n            <div class=\"editEmailControl hide edit-actions\">\n                <button class=\"btn btn-blue editEmailDone\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_DONE", {hash:{},data:data}))
    + "</button>\n                <button class=\"btn btn-silver modal-close editEmailCancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n            </div>\n        </dd>\n    </dl>\n    <dl class=\"settings-item credit-card-info\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "CREDIT_CARD_INFORMATION", {hash:{},data:data}))
    + "</dt>\n        <dd>\n            <div class=\"payment-credit-middle\">\n\n            </div>\n            <div class=\"credit-meta\">\n                <p class=\"payment-number\">";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.cardNumber), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.firstName), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n            <div class=\"credit-update\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noSubscription), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <div class=\"update-payment-ctrl hide\">\n                    <button class=\"btn btn-blue update-payment-done\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_DONE", {hash:{},data:data}))
    + "</button>\n                    <button class=\"btn btn-silver modal-close update-payment-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n                </div>\n            </div>\n        </dd>\n    </dl>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noSubscription), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.billingTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <p class=\"warning-red\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_ACCOUNT_IN_LIMITED_STATUS", {hash:{},data:data}))
    + "</p>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <p class=\"renew-points\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_RENEW_FREE_INFO", ((stack1 = (depth0 && depth0.payment)),stack1 == null || stack1 === false ? stack1 : stack1.maxQuota), ((stack1 = (depth0 && depth0.payment)),stack1 == null || stack1 === false ? stack1 : stack1.renewDays), {hash:{},data:data}))
    + "</p>\n    ";
  return buffer;
  }

  buffer += "<section id=\"UsageTab\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.payment)),stack1 == null || stack1 === false ? stack1 : stack1.failToCharge), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <h5 class=\"billing_usage_title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_CURRENT_USAGE", {hash:{},data:data}))
    + "</h5>\n    <div class=\"current-usage-block\">\n        <h3>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.payment)),stack1 == null || stack1 === false ? stack1 : stack1.currentQuota)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_INSTANT_HOUR", {hash:{},data:data}))
    + "</p>\n    </div>\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.payment)),stack1 == null || stack1 === false ? stack1 : stack1.isDefault), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <h5 class=\"billing_usage_title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_USAGE", {hash:{},data:data}))
    + "</h5>\n    <div class=\"usage-pagination\">\n        <button class=\"btn nav-left\"><i class=\"icon-caret-left\"></i></button>\n        <span class=\"usage-date\" data-date=\"\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_LOADING", {hash:{},data:data}))
    + "</span>\n        <button class=\"btn nav-right\"><i class=\"icon-caret-right\"></i></button>\n    </div>\n    <div class=\"table-head-fix\">\n            <div class=\"full-space\">\n                "
    + escapeExpression(helpers.i18n.call(depth0, "NO_USAGE_REPORT", {hash:{},data:data}))
    + "\n            </div>\n    </div>\n</section>";
  return buffer;
  };
TEMPLATE.usage=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                    <td>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    <td>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</td>\n                </tr>\n            ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable desc-sort\" data-row-type=\"string\" style=\"width:50%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_INSTANCE_ID", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable desc-sort\" data-row-type=\"number\" style=\"width:50%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_INSTANT_HOUR", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\" style=\"max-height:200px;\">\n    <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n    <div class=\"scroll-content\">\n        <table class=\"table\">\n            <thead>\n            <tr>\n                <th style=\"width: 50%\"><div class=\"th-inner\"></div></th>\n                <th style=\"width: 50%\"><div class=\"th-inner\"></div></th>\n            </tr>\n            </thead>\n            <tbody class=\"t-m-content\">\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.result)),stack1 == null || stack1 === false ? stack1 : stack1.history_usage), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.usageTable=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"update-payment-wrap\">\n    <h5>Billing Owner</h5>\n    <input class=\"input first-name\" placeholder=\"First Name\" type=\"text\"/>\n    <input class=\"input last-name\" placeholder=\"Last Name\" type=\"text\"/>\n    <h5>\n        <span class=\"card-number\">Card Number</span>\n        <span class=\"cvv\">CVV</span>\n        <span class=\"expiration\">Expiration Date</span>\n    </h5>\n    <div class=\"row\">\n        <input class=\"input card-number\" placeholder=\"\" type=\"text\"/>\n        <input class=\"input cvv\" placeholder=\"\" type=\"text\"/>\n        <input class=\"input expiration\" placeholder=\"MMYY\" type=\"text\"/>\n    </div>\n    <p><i class=\"icon-kp\"></i>Secure Payment Powered by Chargify</p>\n</div>";
  };
TEMPLATE.updatePayment=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('scenes/settings/views/BillingView',['backbone', "../template/TplBilling", 'i18n!/nls/lang.js', "ApiRequest", "ApiRequestR"], function(Backbone, template, lang, ApiRequest, ApiRequestR) {
    return Backbone.View.extend({
      events: {
        'click #PaymentBody a.payment-receipt': "viewPaymentReceipt",
        'click button.update-payment': "showUpdatePayment",
        "click .update-payment-done": "updatePaymentDone",
        "click .update-payment-cancel": "updatePaymentCancel",
        "click .editEmailBtn": "updatePaymentEmail",
        "click .editEmailDone": "updateEmailDone",
        "click .editEmailCancel": "updateEmailCancel"
      },
      className: "billing-view",
      initialize: function() {
        return this;
      },
      render: function() {
        var paymentState, that;
        this.$el.html(template.billingLoadingFrame());
        this.$el.find("#billing-status").append(MC.template.loadingSpinner());
        that = this;
        this.$el.find("#PaymentBody").remove();
        paymentState = App.user.get("paymentState");
        this.model.getPaymentState().then(function() {
          var billingTemplate, paymentUpdate;
          paymentUpdate = that.model.get("payment");
          billingTemplate = template.billingTemplate({
            paymentUpdate: paymentUpdate
          });
          that.$el.find("#billing-status").html(billingTemplate);
          that.$el.find(".table-head-fix").replaceWith(MC.template.loadingSpinner());
          if (paymentUpdate.cardNumber && paymentUpdate.currentQuota < paymentUpdate.maxQuota && paymentUpdate.paymentState === "active" || "pastdue") {
            return that.getPaymentHistory().then(function(paymentHistory) {
              var hasPaymentHistory;
              hasPaymentHistory = (_.keys(paymentHistory)).length;
              paymentUpdate = that.model.get("payment");
              billingTemplate = template.billingTemplate({
                paymentUpdate: paymentUpdate,
                paymentHistory: paymentHistory,
                hasPaymentHistory: hasPaymentHistory
              });
              return that.$el.find(".billing-history").html($(billingTemplate).find(".billing-history").html());
            }, function() {
              return that.renderCache();
            });
          } else {
            that.$el.find(".loading-spinner").remove();
            return that.$el.find("#billing-status").append(template.billingTemplate({
              needUpdatePayment: true
            }));
          }
        }, function(err) {
          var billingTemplate, noSubscription;
          if (err.error === -404) {
            noSubscription = true;
            billingTemplate = template.billingTemplate({
              noSubscription: noSubscription
            });
            return that.$el.find("#billing-status").html(billingTemplate);
          } else {
            return notification('error', "Error while getting user payment info, please try again later.");
          }
        });
        return this;
      },
      renderCache: function() {
        var billingTemplate, paymentHistory, paymentUpdate, that;
        that = this;
        paymentHistory = this.model.get("paymentHistory") || [];
        paymentUpdate = this.model.get("payment");
        billingTemplate = template.billingTemplate({
          paymentUpdate: paymentUpdate,
          paymentHistory: paymentHistory
        });
        that.$el.find("#billing-status").html(billingTemplate);
        if (!paymentHistory.length) {
          that.$el.find(".table-head-fix").replaceWith(MC.template.loadingSpinner());
          this.getPaymentHistory().then(function() {
            paymentHistory = that.model.get("paymentHistory");
            billingTemplate = template.billingTemplate({
              paymentUpdate: paymentUpdate,
              paymentHistory: paymentHistory
            });
            return that.$el.find("#billing-status").empty().append(billingTemplate);
          });
        }
        return this;
      },
      getPaymentHistory: function() {
        var historyDefer, projectId, that;
        projectId = this.model.get("id");
        historyDefer = new Q.defer();
        that = this;
        ApiRequestR("payment_statement", {
          projectId: projectId
        }).then(function(paymentHistory) {
          var tempArray;
          tempArray = [];
          _.each(paymentHistory, function(e) {
            e.ending_balance = e.ending_balance_in_cents / 100;
            e.total_balance = e.total_in_cents / 100;
            e.start_balance = e.starting_balance_in_cents / 100;
            return tempArray.push(e);
          });
          tempArray.reverse();
          paymentHistory = tempArray;
          that.model.set("paymentHistory", paymentHistory);
          return historyDefer.resolve(paymentHistory);
        }, function(err) {
          return historyDefer.reject(err);
        });
        return historyDefer.promise;
      },
      showUpdatePayment: function(evt) {
        $(".update-payment-ctrl").show();
        this.$el.find(".billing-history").replaceWith(template.updatePayment());
        return $(evt.currentTarget).hide();
      },
      updatePaymentDone: function() {
        var $wrap, attributes, project_id, that;
        that = this;
        $wrap = this.$el.find(".update-payment-wrap");
        attributes = {
          first_name: $wrap.find(".first-name").val(),
          last_name: $wrap.find(".last-name").val(),
          full_number: $wrap.find("input.card-number").val(),
          expiration_month: $wrap.find("input.expiration").val().slice(0, 2),
          expiration_year: $wrap.find("input.expiration").val().slice(2, 4),
          cvv: $wrap.find("input.cvv").val()
        };
        this.$el.find(".update-payment-wrap").html(MC.template.loadingSpinner());
        this.$el.find(".update-payment-done").text(lang.IDE.LBL_SAVING);
        this.$el.find(".update-payment-ctrl button").attr("disabled", "disabled");
        project_id = this.model.get("id");
        return ApiRequest("project_update_payment", {
          project_id: project_id,
          attributes: attributes
        }).then(function() {
          that.model.set("payment", null);
          that.model.set("paymentHistory", null);
          return that.render();
        }, function(err) {
          console.warn(err);
          notification("error", "Error while updating user payment info, please try again later.");
          return that.renderCache();
        });
      },
      updatePaymentCancel: function() {
        return this.renderCache();
      },
      updatePaymentEmail: function() {
        this.$el.find(".billing-email-text>p,.editEmailBtn").hide();
        this.$el.find(".editEmailControl,.billing-email-text>input").show();
        return this.$el.find(".billing-email-text>input").val(this.model.get("payment").email);
      },
      updateEmailCancel: function() {
        return this.renderCache();
      },
      updateEmailDone: function() {
        var attributes, email, project_id, that;
        project_id = this.model.get("id");
        that = this;
        this.$el.find(".editEmailControl button").attr("disabled", "disabled");
        this.$el.find(".billing-email-text>input").attr("disabled", "disabled");
        this.$el.find(".editEmailControl .editEmailDone").text(lang.IDE.LBL_SAVING);
        this.$el.find(".editEmailControl .editEmailCancel").hide();
        email = this.$el.find(".billing-email-text input").val();
        attributes = {
          email: email
        };
        return ApiRequest("project_update_payment", {
          project_id: project_id,
          attributes: attributes
        }).then(function() {
          that.model.set("payment", null);
          that.model.set("paymentHistory", null);
          return that.render();
        }, function(err) {
          console.warn(err);
          notification("error", "Error while updating user payment info, please try again later.");
          return that.renderCache();
        });
      },
      viewPaymentReceipt: function(event) {
        var $target, cssToInsert, id, makeNewWindow, paymentHistory;
        $target = $(event.currentTarget);
        id = $target.parent().parent().data("id");
        paymentHistory = this.model.get("paymentHistory")[id];
        cssToInsert = ".billing_statement_section {\n    display: block;\n    position: relative;\n}\n.billing_statement_section h2 {\n    display: block;\n    background: #E6E6E6;\n    font-size: 16px;\n    padding: 10px;\n    font-weight: bold;\n    margin-bottom: 0;\n    border-bottom: 1px solid #727272;\n}\n.billing_statement_section_content {\n    display: block;\n    position: relative;\n    padding-top: 10px;\n}\ntable {\n    border-collapse: collapse;\n    width: 100%;\n}\ntable, td, th {\n    border: 1px solid #333;\n    padding: 7px;\n    text-align: left;\n    font-size: 14px;\n}\ntable thead {\n    background: #dedede;\n}\ntable tr.billing_statement_listing_tfoot {\n    font-weight: bold;\n    text-align: right;\n}\n#billing_statement {\n    width: 800px;\n    margin: 20px auto;\n    padding-bottom: 50px;\n}\n.billing_statement_section .billing_statement_section_content h3 {\n    font-size: 14px;\n    position: relative;\n    margin: 10px 0;\n    font-weight: bold;\n    margin-bottom: 14px;\n    background: #F3F3F3;\n    padding: 5px;\n}\ndiv#billing_statement_account_information_section {\n    width: 49%;\n    float: left;\n}\ndiv#billing_statement_summary_section {\n    width: 49%;\n    float: right;\n}\ndiv#billing_statement_detail_section {\n    clear: both;\n    padding-top: 10px;\n}\n.billing_statement_section_content .billing_statement_summary_label {\n    font-weight: bold;\n    font-size: 16px;\n    width: 44%;\n    display: inline-block;\n    text-align: right;\n}\n.billing_statement_section_content> div {\n    margin-bottom: 10px;\n}\n.billing_statement_section_content .billing_statement_summary_value {\n    text-align: right;\n    float: right;\n    color: #666;\n}\ndiv#billing_statement_summary_balance_paid_stamp.billing_statement_balance_paid_stamp_paid {\n    float: right;\n    font-size: 30px;\n    color: #50B816;\n    margin-top: 10px;\n}\ndiv#billing_statement_summary_balance_paid_stamp.billing_statement_balance_paid_stamp_unpaid {\n    float: right;\n    font-size: 30px;\n    color: #C70000;\n    margin-top: 10px;\n}\nbody {font-family: 'Lato', 'Helvetica Neue', Arial, sans-serif;}";
        makeNewWindow = function() {
          var content, headTag, newWindow, styleTag;
          newWindow = window.open("", "");
          newWindow.focus();
          content = paymentHistory.html;
          newWindow.document.write(content);
          headTag = newWindow.document.head || newWindow.document.getElementsByTagName('head')[0];
          styleTag = document.createElement('style');
          styleTag.type = 'text/css';
          if (styleTag.styleSheet) {
            styleTag.styleSheet.cssText = cssToInsert;
          } else {
            styleTag.appendChild(document.createTextNode(cssToInsert));
          }
          headTag.appendChild(styleTag);
          return newWindow.document.close();
        };
        return makeNewWindow();
      }
    });
  });

}).call(this);

define('scenes/settings/template/TplMember',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"operate\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.limit), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <button class=\"btn btn-red\" id=\"delete\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_REMOVE", {hash:{},data:data}))
    + "</button>\n    </div>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"limit-member-tip\">\n            "
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_LIMIT", (depth0 && depth0.number), {hash:{},data:data}))
    + " <a href=\"mailto:support@visualops.io\" target=\"_top\">support@visualops.io</a>\n        </div>\n        ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"invite\">\n            <input class=\"input\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_INVITE_TIP", {hash:{},data:data}))
    + "\" id=\"mail\">\n            <div class=\"search\"></div>\n            <button class=\"btn btn-blue\" id=\"invite\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_INVITE_CONFIRM", {hash:{},data:data}))
    + "</button>\n        </div>\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.admin), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "\n                    <th class=\"checkbox-row\">\n                        <div class=\"checkbox\">\n                            <input id=\"t-m-select-all\" type=\"checkbox\" value=\"None\">\n                            <label for=\"t-m-select-all\"></label>\n                        </div>\n                    </th>\n                    ";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <th class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sortable), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-row-type=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rowType), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                    ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return "sortable";
  }

function program12(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.rowType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program14(depth0,data) {
  
  
  return "string";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "width:"
    + escapeExpression(((stack1 = (depth0 && depth0.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";";
  return buffer;
  }

function program18(depth0,data) {
  
  
  return "\n        <div>\n            ";
  }

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"scroll-wrap\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.height), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                <div class=\"scroll-content\" style=\"display:block;\">\n                    ";
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style=\"height: "
    + escapeExpression(((stack1 = (depth0 && depth0.height)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px\" ";
  return buffer;
  }

function program23(depth0,data) {
  
  var stack1;
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noCheckbox), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program24(depth0,data) {
  
  
  return "<th class=\"checkbox-row\"><div class=\"th-inner\"></div></th>";
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <th style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><div class=\"th-inner\"></div></th>\n                                ";
  return buffer;
  }

function program28(depth0,data) {
  
  
  return "\n                </div>\n                ";
  }

function program30(depth0,data) {
  
  
  return "\n            </div>\n        </div>\n        ";
  }

  buffer += "<div class=\"hide content\" data-bind=\"true\">\n    <div class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_MEMBER", {hash:{},data:data}))
    + "(<span class=\"memlist-count\"></span>)</div>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.admin), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"table-head-fix will-be-covered\">\n        <table class=\"table-head\">\n            <thead>\n                <tr>\n                    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noCheckbox), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </tr>\n            </thead>\n        </table>\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.useCustomScroll), {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.admin), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </tr>\n                        </thead>\n                        <tbody class=\"t-m-content\">\n                        </tbody>\n                    </table>\n                    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.useCustomScroll), {hash:{},inverse:self.program(30, program30, data),fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.main=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item memlist-item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.admin), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <td>\n        <img class=\"avatar\" src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.avatar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <div class=\"info\">\n            <div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.me), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n            <div class=\"mail\">"
    + escapeExpression(((stack1 = (depth0 && depth0.email)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n    </td>\n    <td class=\""
    + escapeExpression(((stack1 = (depth0 && depth0.role)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <span class=\"memlist-view-mode role\">\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "admin", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "collaborator", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </span>\n        <div class=\"selectbox memlist-edit-mode memtype\">\n            <div class=\"selection\">\n                ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "admin", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "collaborator", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n            <ul class=\"dropdown\">\n                <li data-id=\"admin\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "admin", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                    <div class=\"name\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_ADMIN", {hash:{},data:data}))
    + "</div>\n                    <div class=\"desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_ADMIN_DESC", {hash:{},data:data}))
    + "</div>\n                </li>\n                <li data-id=\"collaborator\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "collaborator", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                    <div class=\"name\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_COLLABORATOR", {hash:{},data:data}))
    + "</div>\n                    <div class=\"desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_COLLABORATOR_DESC", {hash:{},data:data}))
    + "</div>\n                </li>\n            </ul>\n        </div>\n    </td>\n    <td class=\"memlist-status ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.state), "inactive", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.state), "normal", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.state), "inactive", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </td>\n    ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.admin), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <td class=\"checkbox-row\">\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.me), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </td>\n    ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"checkbox\">\n            <input id=\"sslcert-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"sslcert-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "<span class=\"you\">("
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_YOU", {hash:{},data:data}))
    + ")</span>";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_ADMIN", {hash:{},data:data}));
  }

function program9(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_COLLABORATOR", {hash:{},data:data}));
  }

function program11(depth0,data) {
  
  
  return "selected";
  }

function program13(depth0,data) {
  
  
  return "memlist-pending";
  }

function program15(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_ACTIVE", {hash:{},data:data}));
  }

function program17(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_PENDING", {hash:{},data:data}));
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <td>";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.state), "inactive", {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n    <td>\n        <button class=\"btn btn-blue memlist-edit-mode done\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_DONE", {hash:{},data:data}))
    + "</button>\n        <button class=\"icon-edit memlist-view-mode edit\"></button>\n    </td>\n    ";
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = "";
  buffer += "<button class=\"btn btn-red cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_CANCEL_INVITE", {hash:{},data:data}))
    + "</button>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.memlist), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"info\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_REMOVE_CONFIRM", (depth0 && depth0.count), {hash:{},data:data}))
    + "</div>\n<div class=\"operate\">\n    <button class=\"confirm btn btn-red\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_REMOVE", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.deletePopup=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"mail\">"
    + escapeExpression(((stack1 = (depth0 && depth0.mail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>";
  return buffer;
  };
TEMPLATE.match=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<span>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_NO_USER", {hash:{},data:data}))
    + " \""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"</span>";
  return buffer;
  };
TEMPLATE.nomatch=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_DEFAULT_WORKSPACE_TIP1", {hash:{},data:data}))
    + ".</div>\n<div>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_DEFAULT_WORKSPACE_TIP2", {hash:{},data:data}))
    + ", "
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_CREATE_WORKSPACE", {hash:{},data:data}))
    + ".</div>";
  return buffer;
  };
TEMPLATE.defaultProject=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('scenes/settings/views/MemberView',['backbone', '../template/TplMember', 'i18n!/nls/lang.js', 'UI.bubblepopup', 'ApiRequest', '../models/MemberCollection', 'UI.selectbox', 'UI.parsley', 'UI.errortip', 'UI.table', 'MC.validate'], function(Backbone, TplMember, lang, bubblePopup, ApiRequest, MemberCollection) {
    return Backbone.View.extend({
      events: {
        'change #t-m-select-all': '__checkAll',
        'change .one-cb': '__checkOne',
        'click #invite': 'inviteMember',
        'click #delete': 'removeMember',
        'click .done': 'doneModify',
        'click .edit': 'enterModify',
        'click .cancel': 'cancelInvite',
        'focus #mail': 'focusMail',
        'blur #mail': 'blurMail',
        'keyup #mail': 'keyupMail',
        'keypress #mail': 'keypressMail'
      },
      focusMail: function() {},
      blurMail: function() {
        return this.$el.find('.search').hide();
      },
      keyupMail: function() {
        return this.keyupHandle();
      },
      keyupHandle: function() {
        var $search, mail, that;
        that = this;
        mail = that.$el.find('#mail').val();
        $search = that.$el.find('.search');
        if (mail.length > 0) {
          return ApiRequest('account_get_userinfo', {
            user_email: mail
          }).then(function(data) {
            return $search.html(TplMember.match({
              name: Base64.decode(data.username),
              mail: Base64.decode(data.email)
            }));
          }).fail(function() {
            return $search.html(TplMember.nomatch({
              name: mail
            }));
          }).done(function() {
            return $search.show();
          });
        } else {
          return $search.hide();
        }
      },
      keypressMail: function(event) {
        if (event.keyCode === 13) {
          return this.$el.find('#invite').click();
        }
      },
      className: 'member-setting',
      initialize: function() {
        this.keyupHandle = _.throttle(this.keyupHandle, 1000);
        this.project = this.model;
        this.memberCol = new MemberCollection({
          projectId: this.project.id
        });
        this.projectId = this.model.get('id');
        this.isAdmin = false;
        return this.render();
      },
      render: function() {
        var isPrivateProject;
        isPrivateProject = this.model.get('private');
        if (isPrivateProject) {
          this.$el.html(TplMember.defaultProject());
        } else {
          this.$el.html(TplMember.loading());
          this.loadMemList();
        }
        return this;
      },
      renderMain: function() {
        var columns, that;
        that = this;
        columns = [
          {
            sortable: true,
            name: lang.IDE.SETTINGS_MEMBER_COLUMN_MEMBER
          }, {
            sortable: true,
            width: "20%",
            name: lang.IDE.SETTINGS_MEMBER_COLUMN_ROLE
          }, {
            sortable: true,
            width: "10%",
            name: lang.IDE.SETTINGS_MEMBER_COLUMN_STATUS
          }
        ];
        if (that.isAdmin) {
          columns = columns.concat([
            {
              sortable: false,
              width: "20%",
              name: ""
            }, {
              sortable: false,
              width: "100px",
              name: lang.IDE.SETTINGS_MEMBER_COLUMN_EDIT
            }
          ]);
        }
        that.$el.html(TplMember.main({
          limit: that.memberCol.isLimitInvite(),
          number: that.memberCol.limit,
          columns: columns,
          admin: that.isAdmin
        }));
        return that.memList = that.$el.find('.t-m-content');
      },
      loadMemList: function(callback) {
        var currentMember, currentUserName, data, that;
        that = this;
        data = [];
        currentMember = null;
        currentUserName = App.user.get('username');
        return this.memberCol.fetch().then(function() {
          var _ref;
          that.isAdmin = (_ref = that.memberCol.getCurrentMember()) != null ? _ref.isAdmin() : void 0;
          return data = that.memberCol.toJSON();
        }).fail(function(data) {
          notification('error', data.result || data.msg);
          return that.$el.find('.loading-spinner').addClass('hide');
        }).done(function() {
          that.renderMain();
          if (currentMember) {
            that.model.set('myRole', currentMember.role);
          }
          that.$el.find('.content').removeClass('hide');
          that.$el.find('.loading-spinner').addClass('hide');
          that.renderList(data);
          that.__processDelBtn();
          if (callback) {
            return callback();
          }
        });
      },
      renderList: function(data) {
        var that;
        that = this;
        this.memList.html(TplMember.list({
          admin: that.isAdmin,
          memlist: data
        }));
        return this.$el.find('.memlist-count').text(data.length);
      },
      inviteMember: function() {
        var $invite, $mail, mail, originTxt, that;
        that = this;
        $invite = this.$el.find('#invite');
        if ($invite.prop('disabled') === false) {
          $mail = this.$el.find('#mail');
          mail = $.trim($mail.val());
          if (!mail) {
            return;
          }
          originTxt = $invite.text();
          $invite.prop('disabled', true);
          $invite.text("" + originTxt + "...");
          return this.memberCol.inviteMember(mail).then(function() {
            $mail.val('');
            return that.loadMemList(function() {
              $invite.text(originTxt);
              return $invite.prop('disabled', false);
            });
          }).fail(function(data) {
            if (data.error === ApiRequest.Errors.UserNoUser) {
              notification('error', 'User Not Found');
            } else {
              notification('error', data.result);
            }
            $invite.text(originTxt);
            return $invite.prop('disabled', false);
          });
        }
      },
      removeMember: function(event) {
        var $delete, memList, that;
        that = this;
        $delete = $(event.currentTarget);
        if ($delete.prop('disabled') === false) {
          memList = [];
          _.each(that.$el.find('.memlist-item.selected'), function(item) {
            var memId;
            memId = $(item).data('id');
            return memList.push(memId);
          });
          return bubblePopup($delete, TplMember.deletePopup({
            count: memList.length
          }), {
            '.confirm': function() {
              var originTxt;
              originTxt = $delete.text();
              $delete.prop('disabled', true);
              $delete.text("" + originTxt + "...");
              return that.memberCol.removeMember(memList).then(function() {
                return that.loadMemList(function() {
                  return $delete.text(originTxt);
                });
              }).fail(function(data) {
                notification('error', data.result);
                $delete.text(originTxt);
                return $delete.prop('disabled', false);
              });
            }
          });
        }
      },
      enterModify: function(event) {
        var $memItem;
        $memItem = $(event.currentTarget).parents('.memlist-item');
        return $memItem.addClass('edit');
      },
      doneModify: function(event) {
        var $done, $memItem, currentMember, memId, memberModel, newRole, originTxt, that;
        that = this;
        $done = $(event.currentTarget);
        if ($done.prop('disabled') === false) {
          $memItem = $(event.currentTarget).parents('.memlist-item');
          memId = $memItem.data('id');
          newRole = $memItem.find('.memtype li.selected').data('id');
          memberModel = that.memberCol.get(memId);
          currentMember = that.memberCol.getCurrentMember();
          if (memberModel === currentMember && currentMember.isAdmin() && newRole === 'collaborator' && currentMember.isOnlyAdmin()) {
            notification('error', lang.IDE.SETTINGS_MEMBER_LABEL_ONLY_ONE_ADMIN);
            $memItem.removeClass('edit');
            return;
          }
          originTxt = $done.text();
          $done.prop('disabled', true);
          $done.text("" + originTxt + "...");
          return memberModel.updateRole(newRole).then(function() {
            return that.loadMemList(function() {
              $done.text(originTxt);
              $done.prop('disabled', false);
              return $memItem.removeClass('edit');
            });
          }).fail(function(data) {
            notification('error', data.result);
            $done.text(originTxt);
            $done.prop('disabled', false);
            return $memItem.removeClass('edit');
          });
        }
      },
      cancelInvite: function(event) {
        var $cancel, $memItem, memId, memberModel, originTxt, that;
        that = this;
        $cancel = $(event.currentTarget);
        if ($cancel.prop('disabled') === false) {
          $memItem = $(event.currentTarget).parents('.memlist-item');
          memId = $memItem.data('id');
          originTxt = $cancel.text();
          $cancel.prop('disabled', true);
          $cancel.text("" + originTxt + "...");
          memberModel = that.memberCol.get(memId);
          return memberModel.cancelInvite().then(function() {
            return that.loadMemList(function() {
              $cancel.text(originTxt);
              return $cancel.prop('disabled', false);
            });
          }).fail(function(data) {
            notification('error', data.result);
            $cancel.text(originTxt);
            return $cancel.prop('disabled', false);
          });
        }
      },
      __checkOne: function(event) {
        var $target, cbAll, cbAmount, checkedAmount;
        $target = $(event.currentTarget);
        cbAll = this.$('#t-m-select-all');
        cbAmount = this.$('.one-cb').length;
        checkedAmount = this.$('.one-cb:checked').length;
        $target.closest('tr').toggleClass('selected');
        if (checkedAmount === cbAmount) {
          cbAll.prop('checked', true);
        } else if (cbAmount - checkedAmount === 1) {
          cbAll.prop('checked', false);
        }
        return this.__processDelBtn();
      },
      __checkAll: function(event) {
        if (event.currentTarget.checked) {
          this.$('input[type="checkbox"]:not(:disabled)').prop('checked', true).parents('tr.item').addClass('selected');
        } else {
          this.$('input[type="checkbox"]').prop('checked', false);
          this.$('tr.item').removeClass('selected');
        }
        return this.__processDelBtn();
      },
      __processDelBtn: function() {
        var that;
        that = this;
        if (that.$('.one-cb:checked').length) {
          return that.$('#delete').prop('disabled', false);
        } else {
          return that.$('#delete').prop('disabled', true);
        }
      },
      getChecked: function() {
        var allChecked, checkedInfo;
        allChecked = this.$('.one-cb:checked');
        checkedInfo = [];
        allChecked.each(function() {
          return checkedInfo.push({
            id: this.id,
            value: this.value,
            data: $(this).data()
          });
        });
        return checkedInfo;
      }
    });
  });

}).call(this);

define('scenes/settings/template/TplCredential',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n        "
    + escapeExpression(helpers.i18n.call(depth0, "WORKSPACE_DEMO_TIP", {hash:{},data:data}))
    + "\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n        "
    + escapeExpression(helpers.i18n.call(depth0, "CREDENTIAL_LINKED_TO_THIS_WORKSPACE", {hash:{},data:data}))
    + "\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"aws-credential\">\n            <div class=\"credential-logo\"></div>\n            <div class=\"credential-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isDemo), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n            <div class=\"credential-describe\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isDemo), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isDemo), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </li>\n        ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "";
  buffer += " "
    + escapeExpression(helpers.i18n.call(depth0, "PARENTHESES_DEMO", {hash:{},data:data}));
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "";
  buffer += "\n                "
    + escapeExpression(helpers.i18n.call(depth0, "DEMO_CREDENTIAL_TIP", {hash:{},data:data}))
    + "\n                ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                "
    + escapeExpression(((stack1 = (depth0 && depth0.awsAccessKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAdmin), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <i class=\"icon-caret-down show-button-list\"></i>\n            <ul class=\"dropdown-menu button-list\">\n                <li class=\"update-link\" data-id="
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "><i class=\"icon-edit\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_UPDATE", {hash:{},data:data}))
    + "</li>\n                ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.needed), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </ul>\n            ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <li class=\"delete-link\" data-id="
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "><i class=\"icon-delete\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "CFM_BTN_DELETE", {hash:{},data:data}))
    + "</li>\n                ";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <button class=\"btn btn-primary setup-credential\">"
    + escapeExpression(helpers.i18n.call(depth0, "SET_UP_PROVIDER_CREDENTIAL", {hash:{},data:data}))
    + "</button>\n    ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <div class=\"demo-note\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "DEMO_CREDENTIAL_ERROR_NOTE", {hash:{},data:data}))
    + "\n    </div>\n    ";
  return buffer;
  }

  buffer += "<div>\n    <div class=\"instruct\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasDemo), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <ul class=\"credential-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.credentials), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.addable), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasDemo), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.credentialManagement=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"cred-setup-msg empty-hide\"></div>\n<div>\n    "
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATE_CONFIRM_TIT", {hash:{},data:data}))
    + "\n    <p>\n        "
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATE_CONFIRM_TEXT", {hash:{},data:data}))
    + "\n    </p>\n</div>";
  return buffer;
  };
TEMPLATE.updateConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"cred-setup-msg empty-hide\"></div>\n<div class=\"delete-credential-confirm\">\n    "
    + escapeExpression(helpers.i18n.call(depth0, "ARE_YOU_SURE_YOU_WANT_TO_REMOVE_XXX", (depth0 && depth0.name), {hash:{},data:data}))
    + "\n    <p>\n       "
    + escapeExpression(helpers.i18n.call(depth0, "REMOVE_CREDENTIAL_CONFIRM_TIPS", {hash:{},data:data}))
    + "\n    </p>\n</div>";
  return buffer;
  };
TEMPLATE.removeConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"updating-credential\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATING", {hash:{},data:data}))
    + "</div>";
  return buffer;
  };
TEMPLATE.updating=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"cred-setup-msg empty-hide\"></div>\n<div id=\"CredConfirmWrap\">\n    <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATE_CONFIRM_TIT", {hash:{},data:data}))
    + "</h3>\n    <div>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATE_CONFIRM_TEXT", {hash:{},data:data}))
    + "</div>\n</div>";
  return buffer;
  };
TEMPLATE.runningAppConfirm=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('scenes/settings/views/ProviderCredentialView',['constant', 'i18n!/nls/lang.js', '../template/TplCredential', 'Credential', 'ApiRequest', 'UI.modalplus', "credentialFormView", 'UI.tooltip', 'UI.notification', 'backbone'], function(constant, lang, TplCredential, Credential, ApiRequest, Modal, credentialFormView) {
    var credentiaLoadingTips;
    credentiaLoadingTips = {
      add: lang.IDE.SETTINGS_CRED_ADDING,
      update: lang.IDE.SETTINGS_CRED_UPDATING,
      remove: lang.IDE.SETTINGS_CRED_REMOVING
    };
    return Backbone.View.extend({
      events: {
        'click .setup-credential': 'showAddForm',
        'click .update-link': 'showUpdateForm',
        'click .show-button-list': 'showButtonList',
        'click .delete-link': 'showRemoveConfirmModel'
      },
      className: 'credential',
      initialize: function() {
        this.listenTo(this.model, 'update:credential', this.render);
        return this.listenTo(this.model, 'change:credential', this.render);
      },
      render: function() {
        var applist, credentials, data;
        credentials = this.model.credentials().models;
        data = this.model.toJSON();
        data.isAdmin = this.model.amIAdmin();
        if (data.isAdmin) {
          if (credentials.length === 0) {
            data.addable = true;
          } else {
            data.addable = !_.some(credentials, function(cred) {
              return !cred.isDemo();
            });
          }
        }
        applist = this.model.apps();
        data.credentials = _.map(credentials, function(c) {
          var json;
          json = c.toJSON();
          json.isAdmin = data.isAdmin;
          json.name = constant.PROVIDER_NAME[json.provider];
          json.needed = applist.some(function(app) {
            return (app != null ? app.get('provider') : void 0) === json.provider;
          });
          if (json.isDemo) {
            data.hasDemo = true;
          }
          return json;
        });
        this.$el.html(TplCredential.credentialManagement(data));
        return this;
      },
      showButtonList: function() {
        this.$('.button-list').toggle();
        return false;
      },
      getCredentialById: function(id) {
        return this.model.credentials().findWhere({
          id: id
        });
      },
      makeModalLoading: function(modal, action) {
        modal.setContent(MC.template.credentialLoading({
          tip: credentiaLoadingTips[action]
        })).toggleFooter(false);
        return this;
      },
      stopModalLoading: function(modal, originContent) {
        modal.setContent(originContent).toggleFooter(true);
        return this;
      },
      showModalError: function(modal, message) {
        return modal.$('.cred-setup-msg').text(message);
      },
      showAddForm: function() {
        return this.showFormModal();
      },
      showUpdateForm: function(e) {
        var credential, credentialId;
        credentialId = $(e.currentTarget).data('id');
        credential = this.getCredentialById(credentialId);
        return this.showFormModal(credential);
      },
      removeCredential: function(credential) {
        var that;
        that = this;
        this.makeModalLoading(this.removeConfirmView, 'Remove');
        return credential.destroy().then(function() {
          var _ref;
          return (_ref = that.removeConfirmView) != null ? _ref.close() : void 0;
        }, function(error) {
          var credName;
          credName = constant.PROVIDER_NAME[credential.get('provider')];
          that.stopModalLoading(that.removeConfirmView, TplCredential.removeConfirm({
            name: credName
          }));
          return that.showModalError(that.removeConfirmView, lang.IDE.SETTINGS_ERR_CRED_REMOVE);
        });
      },
      showUpdateConfirmModel: function(credential, newData) {
        var _ref;
        if ((_ref = this.updateConfirmView) != null) {
          _ref.close();
        }
        this.updateConfirmView = new Modal({
          title: 'Update Cloud Credential',
          template: TplCredential.updateConfirm,
          confirm: {
            text: 'Confirm to Update',
            color: 'red'
          }
        });
        return this.updateConfirmView.on('confirm', function() {
          return this.updateCredential(credential, newData, true);
        }, this);
      },
      showRemoveConfirmModel: function(e) {
        var credName, credential, credentialId, _ref;
        credentialId = $(e.currentTarget).data('id');
        credential = this.getCredentialById(credentialId);
        credName = constant.PROVIDER_NAME[credential.get('provider')];
        if ((_ref = this.removeConfirmView) != null) {
          _ref.close();
        }
        this.removeConfirmView = new Modal({
          title: 'Delete Cloud Credential',
          template: TplCredential.removeConfirm({
            name: credName
          }),
          confirm: {
            text: 'Remove Credential'
          }
        });
        return this.removeConfirmView.on('confirm', function() {
          return this.removeCredential(credential);
        }, this);
      },
      showFormModal: function(credential, provider) {
        this.formView = new credentialFormView({
          provider: provider,
          credential: credential,
          model: this.model
        }).render();
        return this;
      },
      remove: function() {
        var _ref, _ref1, _ref2;
        if ((_ref = this.formView) != null) {
          _ref.remove();
        }
        if ((_ref1 = this.updateConfirmView) != null) {
          _ref1.close();
        }
        if ((_ref2 = this.removeConfirmView) != null) {
          _ref2.close();
        }
        return Backbone.View.prototype.remove.apply(this, arguments);
      }
    });
  });

}).call(this);

(function() {
  define('scenes/settings/views/UsageReportView',['backbone', "../template/TplBilling", "ApiRequestR", 'i18n!/nls/lang.js'], function(Backbone, template, ApiRequestR, lang) {
    return Backbone.View.extend({
      events: {
        "click .usage-pagination .nav-left": "prevUsage",
        "click .usage-pagination .nav-right": "nextUsage"
      },
      className: "usage-report-view",
      initialize: function() {
        this.$el.html(template.billingLoadingFrame());
        this.$el.find("#billing-status").html(MC.template.loadingSpinner());
        return this;
      },
      render: function() {
        var self;
        self = this;
        self.model.getPaymentState().then(function() {
          var payment;
          payment = self.model.get("payment");
          self.$el.find("#billing-status").html(template.usage({
            payment: payment
          }));
          return self.renderUsageData();
        });
        return this;
      },
      getUsage: function(date) {
        var endDate, projectId, startDate, _ref;
        date || (date = new Date());
        _ref = this.getStartAndEnd(date), startDate = _ref[0], endDate = _ref[1];
        projectId = this.model.get("id");
        startDate = this.formatDate(new Date(startDate));
        endDate = this.formatDate(new Date(endDate));
        return ApiRequestR("payment_usage", {
          projectId: projectId,
          startDate: startDate,
          endDate: endDate
        });
      },
      getStartAndEnd: function(date) {
        var firstDay, lastDay, month, year;
        date = new Date(date);
        month = date.getMonth();
        year = date.getFullYear();
        firstDay = new Date(year, month, 1);
        lastDay = new Date(year, month + 1, -1);
        console.log(firstDay.toLocaleString(), lastDay.toLocaleString());
        return [firstDay, lastDay];
      },
      renderUsageData: function(dateString) {
        var now, self;
        self = this;
        dateString || (dateString = now = new Date());
        self.$el.find(".table-head-fix").html($(MC.template.loadingSpinner()).css({
          "margin": "80px auto"
        }));
        self.$el.find(".usage-pagination button").prop("disabled", true);
        this.getUsage(dateString).then(function(result) {
          var date, elem, isDisabled, payment;
          payment = self.model.get("payment");
          if (!_.isEmpty(result != null ? result.history_usage : void 0)) {
            elem = template.usageTable({
              result: result
            });
          } else {
            elem = "<div class='full-space'>" + lang.IDE.NO_USAGE_REPORT + "</div>";
          }
          self.$el.find(".table-head-fix").html(elem);
          date = self.formatDate2(dateString);
          self.$el.find(".usage-date").text(date.string).data("date", dateString);
          isDisabled = self.getNewDate(1) > new Date();
          self.$el.find(".nav-left").prop("disabled", false);
          return self.$el.find(".nav-right").prop('disabled', isDisabled);
        }, function() {
          return notification('error', "Error while getting user payment info, please try again later.");
        });
        return this;
      },
      formatDate: function(date) {
        var day, hour, month, year;
        year = date.getFullYear();
        month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        hour = date.getHours();
        if (hour < 10) {
          hour = "0" + hour;
        }
        return "" + year + month + day + hour;
      },
      formatDate2: function(date) {
        var month, months, string, year;
        date = new Date(date);
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        month = months[date.getMonth() % 12];
        year = date.getFullYear();
        console.log(month, year);
        string = "" + month + ", " + year;
        return {
          string: string,
          date: date
        };
      },
      getNewDate: function(offset) {
        var month, oldDate, year;
        oldDate = new Date($(".usage-date").data("date"));
        year = oldDate.getFullYear();
        month = oldDate.getMonth() + offset;
        return new Date(year, month);
      },
      nextUsage: function() {
        var newDate;
        newDate = this.getNewDate(1);
        return this.renderUsageData(newDate);
      },
      prevUsage: function() {
        var newDate;
        newDate = this.getNewDate(-1);
        return this.renderUsageData(newDate);
      }
    });
  });

}).call(this);

(function() {
  define('scenes/settings/ProjectSettings',['i18n!/nls/lang.js', './template/TplProject', './views/BasicSettingsView', './views/AccessTokenView', './views/BillingView', './views/MemberView', './views/ProviderCredentialView', './views/UsageReportView', 'backbone'], function(lang, TplProject, BasicSettingsView, AccessTokenView, BillingView, MemberView, ProviderCredentialView, UsageReportView) {
    var subViewMap, subViewNameMap;
    subViewMap = {
      basicsettings: BasicSettingsView,
      accesstoken: AccessTokenView,
      billing: BillingView,
      member: MemberView,
      credential: ProviderCredentialView,
      usagereport: UsageReportView
    };
    subViewNameMap = {
      basicsettings: 'Basic Settings',
      accesstoken: 'Access Token',
      billing: 'Billing',
      member: 'Member',
      credential: 'Provider Credential',
      usagereport: 'Usage Report'
    };
    return Backbone.View.extend({
      events: {
        'click .function-list a': 'loadSub'
      },
      initialize: function(options) {
        this.settingsView = options.settingsView;
        return this.listenTo(this.model, 'change:name', this.updateProjectName);
      },
      render: function(tab) {
        if (tab == null) {
          tab = 'basicsettings';
        }
        this.setElement($(TplProject(_.extend(this.model.toJSON(), {
          tab: tab,
          admin: this.model.amIAdmin()
        }))));
        this.$('.project-subview').html(this.renderSub(tab).el);
        return this;
      },
      setElement: function(element, delegate) {
        if (this.$el) {
          this.undelegateEvents();
        }
        this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
        this.el = this.$el;
        if (delegate !== false) {
          this.delegateEvents();
        }
        return this;
      },
      loadSub: function(e) {
        var tab;
        tab = $(e.currentTarget).data('id');
        this.settingsView.navigate(tab, this.model.id);
        return this.$('.project-subview').html(this.renderSub(tab).el);
      },
      renderSub: function(tab) {
        this.setTitle(tab);
        this.activeTab(tab);
        this.subView && this.subView.remove();
        this.subView = new subViewMap[tab]({
          model: this.model,
          settingsView: this.settingsView
        });
        return this.subView.render();
      },
      setTitle: function(tab) {
        var projectName, tabName;
        projectName = this.model.get('name');
        tabName = subViewNameMap[tab];
        this.$('#title-project-name').text(projectName);
        this.$('#title-tab-name').text(tabName);
        return this;
      },
      activeTab: function(tab) {
        return this.$('.function-list a').each(function() {
          if ($(this).data('id') === tab) {
            return $(this).addClass('active');
          } else {
            return $(this).removeClass('active');
          }
        });
      },
      updateProjectName: function() {
        this.$('.settings-nav-project-title').text(this.model.get('name'));
        return this.$('.project-title').text(this.model.get('name'));
      }
    });
  });

}).call(this);

define('scenes/settings/template/TplSettings',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <a data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\r\n        ";
  return buffer;
  }

  buffer += "<nav id=\"settings-nav\">\r\n    <section>\r\n        <header>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_SETTING", {hash:{},data:data}))
    + "</header>\r\n        <a class=\"active\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT", {hash:{},data:data}))
    + "</a>\r\n    </section>\r\n    <section class=\"project-list\">\r\n        <header>"
    + escapeExpression(helpers.i18n.call(depth0, "MANAGE_WORKSPACE", {hash:{},data:data}))
    + "</header>\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.projects), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </section>\r\n</nav>\r\n<section class=\"setting-content\">\r\n    <header>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT", {hash:{},data:data}))
    + "</header>\r\n    <dl class=\"settings-item\">\r\n        <dt class=\"avatar\"><img src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.gravatar)),stack1 == null || stack1 === false ? stack1 : stack1.image)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></dt>\r\n        <dd class=\"change-photo\">\r\n            <a id=\"change-photo\" href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.gravatar)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\" >"
    + escapeExpression(helpers.i18n.call(depth0, "CHANGE_PHOTO", {hash:{},data:data}))
    + "</a>\r\n        </dd>\r\n    </dl>\r\n    <dl class=\"settings-item\">\r\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_USERNAME", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n    </dl>\r\n\r\n    <dl class=\"settings-item accountFullNameRO\">\r\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_FULLNAME", {hash:{},data:data}))
    + "</dt><dd> <span class=\"fullNameText\">"
    + escapeExpression(((stack1 = (depth0 && depth0.firstName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.lastName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </span> <button class=\"icon-edit link-style tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_FULLNAME", {hash:{},data:data}))
    + "' id=\"AccountFullName\"></button></dd>\r\n    </dl>\r\n    <div id=\"AccountFullNameWrap\" class=\"accountEditWrap settings-item\">\r\n        <dl>\r\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "FIRST_NAME", {hash:{},data:data}))
    + "</dt>\r\n            <dd><input type=\"text\" class=\"input\" id=\"AccountFirstName\"/></dd>\r\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "LAST_NAME", {hash:{},data:data}))
    + "</dt>\r\n            <dd><input type=\"text\" class=\"input\" id=\"AccountLastName\"/></dd>\r\n        </dl>\r\n        <div id=\"AccountFullNameInfo\" class=\"empty-hide\"></div>\r\n        <div class=\"edit-actions\">\r\n            <button class=\"btn btn-blue\" id=\"AccountUpdateFullName\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_UPDATE", {hash:{},data:data}))
    + "</button>\r\n            <span id=\"AccountCancelFullName\" class=\"cancel-button\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_CANCEL", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n    </div>\r\n\r\n    <dl class=\"settings-item accountEmailRO\">\r\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_EMAIL", {hash:{},data:data}))
    + "</dt>\r\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.email)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n            <button class=\"icon-edit link-style tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_NEW_EMAIL", {hash:{},data:data}))
    + "' id=\"AccountEmail\"></button>\r\n        </dd>\r\n    </dl>\r\n    <div id=\"AccountEmailWrap\" class=\"accountEditWrap settings-item\">\r\n        <dl>\r\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_NEW_EMAIL", {hash:{},data:data}))
    + "</dt>\r\n            <dd><input type=\"string\" class=\"input\" id=\"AccountNewEmail\" /></dd>\r\n\r\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CURRENT_PASSWORD", {hash:{},data:data}))
    + "</dt>\r\n            <dd><input type=\"password\" class=\"input\" id=\"AccountEmailPwd\" /></dd>\r\n        </dl>\r\n\r\n      <div id=\"AccountEmailInfo\" class=\"empty-hide\"></div>\r\n\r\n      <div class=\"edit-actions\">\r\n          <button class=\"btn btn-blue\" id=\"AccountUpdateEmail\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_UPDATE", {hash:{},data:data}))
    + "</button>\r\n          <span id=\"AccountCancelEmail\" class=\"cancel-button\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_CANCEL", {hash:{},data:data}))
    + "</span>\r\n      </div>\r\n    </div>\r\n\r\n    <button id=\"AccountPwd\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CHANGE_PASSWORD", {hash:{},data:data}))
    + "</button>\r\n    <div id=\"AccountPwdWrap\" class=\"accountEditWrap settings-item\">\r\n\r\n        <dl>\r\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CURRENT_PASSWORD", {hash:{},data:data}))
    + "</dt>\r\n            <dd><input type=\"password\" class=\"input\" id=\"AccountCurrentPwd\" /></dd>\r\n\r\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HAED_LABEL_NEW_PASSWORD", {hash:{},data:data}))
    + "</dt>\r\n            <dd><input type=\"password\" class=\"input\" id=\"AccountNewPwd\" /></dd>\r\n        </dl>\r\n\r\n        <div id=\"AccountInfo\" class=\"empty-hide\"></div>\r\n\r\n        <div class=\"edit-actions\">\r\n            <button class=\"btn btn-blue\" id=\"AccountUpdatePwd\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_UPDATE", {hash:{},data:data}))
    + "</button>\r\n        <span id=\"AccountCancelPwd\" class=\"cancel-button\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_CANCEL", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n    </div>\r\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('scenes/settings/GenericSettings',['i18n!/nls/lang.js', 'UI.modalplus', './ProjectSettings', './template/TplSettings', 'backbone'], function(lang, Modal, ProjectView, TplSettings) {
    var SettingsView;
    SettingsView = Backbone.View.extend({
      events: {
        'click .project-list a': 'renderProject',
        'click .back-settings': 'backToSettings',
        'click #AccountEmail': 'showEmail',
        'click #AccountFullName': 'showFullName',
        'click #AccountPwd': 'showPwd',
        'click #AccountCancelPwd': 'hidePwd',
        'click #AccountUpdatePwd': 'changePwd',
        'click #AccountCancelEmail': 'hideEmail',
        'click #AccountUpdateEmail': 'changeEmail',
        'click #AccountCancelFullName': 'hideFullName',
        'change #AccountNewEmail, #AccountEmailPwd': 'updateEmailBtn',
        'keyup  #AccountNewEmail, #AccountEmailPwd': 'updateEmailBtn',
        'click #AccountUpdateFullName': 'changeFullName',
        'change #AccountFirstName, #AccountLastName': 'updateFullNameBtn',
        'keyup #AccountFirstName, #AccountLastName': 'updateFullNameBtn',
        'change #AccountCurrentPwd, #AccountNewPwd': 'updatePwdBtn',
        'keyup  #AccountCurrentPwd, #AccountNewPwd': 'updatePwdBtn'
      },
      className: 'fullpage-settings',
      initialize: function(attr, options) {
        var tab, _ref;
        if (attr) {
          this.projectId = attr.projectId;
          tab = (_ref = attr.tab) != null ? _ref.toLowerCase() : void 0;
          if (this.projectId && !tab) {
            tab = SettingsView.TAB.Project.BasicSettings;
          }
        }
        this.scene = options.scene;
        this.projects = App.model.projects();
        return this.render(tab);
      },
      render: function(tab) {
        var renderResult, that;
        if (tab == null) {
          tab = SettingsView.TAB.Account;
        }
        that = this;
        if (tab === SettingsView.TAB.Account) {
          renderResult = this.renderSettings();
        } else {
          renderResult = this.renderProject(this.projects.get(this.projectId), tab);
        }
        if (!renderResult) {
          return false;
        }
        this.modal = new Modal({
          template: that.el,
          mode: 'fullscreen',
          disableFooter: true,
          compact: true
        });
        this.modal.on("close", function() {
          return that.scene.remove();
        });
        return this;
      },
      renderSettings: function() {
        var data;
        data = _.extend({}, App.user.toJSON());
        data.gravatar = App.user.gravatar();
        data.projects = this.projects.toJSON();
        this.$el.html(TplSettings(data));
        return this;
      },
      backToSettings: function() {
        this.navigate();
        return this.renderSettings();
      },
      backToDefaultProject: function() {
        var privateProject;
        this.modal.close();
        privateProject = App.model.getPrivateProject();
        return Router.navigate("/workspace/" + privateProject.id, {
          trigger: true
        });
      },
      renderProject: function(project, tab) {
        var projectId, _ref;
        console.log("SettingsView");
        if (project && project.currentTarget) {
          projectId = $(project.currentTarget).data('id');
          project = this.projects.get(projectId);
          this.navigate(SettingsView.TAB.Project.BasicSettings, projectId);
        } else {
          if ((!project) || (__indexOf.call(_.values(SettingsView.TAB.Project), tab) < 0) || (!this.auth(project, tab))) {
            notification('error', lang.IDE.PAGE_NOT_FOUND_WORKSPACE_TAB_NOT_EXIST);
            Router.navigate('/', {
              trigger: true
            });
            return false;
          }
        }
        if ((_ref = this.projectView) != null) {
          _ref.remove();
        }
        this.projectView = new ProjectView({
          model: project,
          settingsView: this
        });
        return this.$el.html(this.projectView.render(tab).el);
      },
      remove: function() {
        var _ref, _ref1;
        if ((_ref = this.projectView) != null) {
          _ref.remove();
        }
        if ((_ref1 = this.modal) != null) {
          _ref1.close();
        }
        return Backbone.View.prototype.remove.apply(this, arguments);
      },
      navigate: function(tab, projectId) {
        var url;
        url = this.url(tab, projectId);
        return Router.navigate(url);
      },
      url: function(tab, projectId) {
        if (!tab) {
          return '/settings';
        }
        return "/settings/" + projectId + "/" + tab;
      },
      auth: function(project, tab) {
        return project.amIAdmin() || (tab !== SettingsView.TAB.Project.Billing && tab !== SettingsView.TAB.Project.ProviderCredential);
      },
      showEmail: function() {
        this.hideFullName();
        $(".accountEmailRO").hide();
        $("#AccountEmailWrap").show();
        $("#AccountNewEmail").focus();
      },
      hideEmail: function() {
        $(".accountEmailRO").show();
        $("#AccountEmailWrap").hide();
        $("#AccountNewEmail, #AccountEmailPwd").val("");
        $("#AccountEmailInfo").empty();
      },
      showFullName: function() {
        this.hideEmail();
        $(".accountFullNameRO").hide();
        $("#AccountFullNameWrap").show();
        $("#AccountFirstName").val(App.user.get("firstName") || "").focus();
        $("#AccountLastName").val(App.user.get("lastName") || "");
      },
      hideFullName: function() {
        $(".accountFullNameRO").show();
        $("#AccountFullNameWrap").hide();
        $("#AccountFirstName, #AccountLastName").val("");
        return $("#AccountUpdateFullName").attr("disabled", false);
      },
      showPwd: function() {
        this.$("#AccountPwd").hide();
        this.$("#AccountPwdWrap").show();
        this.$("#AccountCurrentPwd").focus();
      },
      hidePwd: function() {
        this.$("#AccountPwd").show();
        this.$("#AccountPwdWrap").hide();
        this.$("#AccountCurrentPwd, #AccountNewPwd").val("");
        this.$("#AccountInfo").empty();
      },
      updatePwdBtn: function() {
        var new_pwd, old_pwd;
        old_pwd = this.$("#AccountCurrentPwd").val() || "";
        new_pwd = this.$("#AccountNewPwd").val() || "";
        if (old_pwd.length && new_pwd.length) {
          this.$("#AccountUpdatePwd").removeAttr("disabled");
        } else {
          this.$("#AccountUpdatePwd").attr("disabled", "disabled");
        }
      },
      updateEmailBtn: function() {
        var new_pwd, old_pwd;
        old_pwd = $("#AccountNewEmail").val() || "";
        new_pwd = $("#AccountEmailPwd").val() || "";
        if (old_pwd.length && new_pwd.length >= 6) {
          $("#AccountUpdateEmail").removeAttr("disabled");
        } else {
          $("#AccountUpdateEmail").attr("disabled", "disabled");
        }
      },
      updateFullNameBtn: function() {
        var first_name, last_name;
        first_name = $("#AccountFirstName").val() || "";
        last_name = $("#AccountLastName").val() || "";
        if (first_name.length && last_name.length) {
          $("#AccountUpdateFullName").removeAttr("disabled");
        } else {
          $("#AccountUpdateFullName").attr("disabled", "disabled");
        }
      },
      changeFullName: function() {
        var first_name, last_name, that;
        that = this;
        first_name = $("#AccountFirstName").val() || "";
        last_name = $("#AccountLastName").val() || "";
        if (first_name && last_name) {
          $("#AccountUpdateFullName").attr("disabled", true);
          return App.user.changeName(first_name, last_name).then(function(result) {
            that.hideFullName();
            $(".fullNameText").text(first_name + " " + last_name);
            if (result) {
              return notification("info", lang.NOTIFY.UPDATED_FULLNAME_SUCCESS);
            }
          }, function(err) {
            notification("error", lang.NOTIFY.UPDATED_FULLNAME_FAIL);
            $("#AccountUpdateFullName").attr("disabled", false);
            return console.error("Change Full name Failed due to ->", err);
          });
        }
      },
      changeEmail: function() {
        var email, pwd;
        email = $("#AccountNewEmail").val() || "";
        pwd = $("#AccountEmailPwd").val() || "";
        $("#AccountEmailInfo").empty();
        $("#AccountUpdateEmail").attr("disabled", "disabled");
        App.user.changeEmail(email, pwd).then(function() {
          notification('info', lang.NOTIFY.SETTINGS_UPDATE_EMAIL_SUCCESS);
          $("#AccountCancelEmail").click();
          $(".accountEmailRO").children("span").text(App.user.get("email"));
        }, function(err) {
          var text;
          switch (err.error) {
            case 116:
              text = lang.IDE.SETTINGS_UPDATE_EMAIL_FAIL3;
              break;
            case 117:
              text = lang.IDE.SETTINGS_UPDATE_EMAIL_FAIL2;
              break;
            default:
              text = lang.IDE.SETTINGS_UPDATE_EMAIL_FAIL1;
          }
          $('#AccountEmailInfo').text(text);
          return $("#AccountUpdateEmail").removeAttr("disabled");
        });
      },
      changePwd: function() {
        var new_pwd, old_pwd, that;
        that = this;
        old_pwd = this.$("#AccountCurrentPwd").val() || "";
        new_pwd = this.$("#AccountNewPwd").val() || "";
        if (new_pwd.length < 6) {
          this.$('#AccountInfo').text(lang.IDE.SETTINGS_ERR_INVALID_PWD);
          return;
        }
        this.$("#AccountInfo").empty();
        this.$("#AccountUpdatePwd").attr("disabled", "disabled");
        App.user.changePassword(old_pwd, new_pwd).then(function() {
          notification('info', lang.NOTIFY.SETTINGS_UPDATE_PWD_SUCCESS);
          $("#AccountCancelPwd").click();
        }, function(err) {
          if (err.error === 2) {
            that.modal.$('#AccountInfo').html("" + lang.IDE.SETTINGS_ERR_WRONG_PWD + " <a href='/reset/' target='_blank'>" + lang.IDE.SETTINGS_INFO_FORGET_PWD + "</a>");
          } else {
            that.modal.$('#AccountInfo').text(lang.IDE.SETTINGS_UPDATE_PWD_FAILURE);
          }
          return that.modal.$("#AccountUpdatePwd").removeAttr("disabled");
        });
      }
    });
    SettingsView.TAB = {
      Account: 'account',
      Project: {
        BasicSettings: 'basicsettings',
        AccessToken: 'accesstoken',
        Billing: 'billing',
        Member: 'member',
        ProviderCredential: 'credential',
        UsageReport: 'usagereport'
      }
    };
    return SettingsView;
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('scenes/Settings',["Scene", "./settings/GenericSettings"], function(Scene, SettingsView) {
    var Settings;
    return Settings = (function(_super) {
      __extends(Settings, _super);

      function Settings() {
        return Settings.__super__.constructor.apply(this, arguments);
      }


      /*
        Methods that should be override
       */

      Settings.prototype.initialize = function(attributes) {
        this.view = new SettingsView(attributes, {
          scene: this
        });
        return this.activate();
      };

      Settings.prototype.isRemovable = function() {
        return true;
      };

      Settings.prototype.becomeActive = function() {
        return Scene.prototype.becomeActive.call(this);
      };

      Settings.prototype.becomeInactive = function() {
        return Scene.prototype.remove.call(this);
      };

      Settings.prototype.cleanup = function() {};

      Settings.prototype.isWorkingOn = function(info) {
        return info === "AppSettings";
      };

      return Settings;

    })(Scene);
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('scenes/StackStore',["ApiRequest", "Scene", "i18n!/nls/lang.js", "backbone", "UI.notification"], function(ApiRequest, Scene, lang) {
    var SSView, StackStore;
    SSView = Backbone.View.extend({
      initialize: function() {
        return this.setElement($("<div class='global-loading'></div>").appendTo("#scenes"));
      }
    });
    return StackStore = (function(_super) {
      __extends(StackStore, _super);

      function StackStore(attr) {
        var ss;
        ss = App.sceneManager.find(attr.id);
        if (ss) {
          ss.activate();
          return ss;
        }
        return Scene.call(this, attr);
      }


      /*
        Methods that should be override
       */

      StackStore.prototype.initialize = function(attributes) {
        var self;
        this.id = attributes.id;
        this.view = new SSView();
        this.activate();
        self = this;
        return ApiRequest('stackstore_fetch_stackstore', {
          sub_path: "master/stack/" + this.id + "/" + this.id + ".json"
        }).then(function(res) {
          var e, j;
          try {
            j = JSON.parse(res);
            delete j.id;
            delete j.signature;
          } catch (_error) {
            e = _error;
            j = null;
            self.onParseError();
          }
          if (j) {
            return self.onParseSuccess(j);
          }
        }, function() {
          return self.onLoadError();
        });
      };

      StackStore.prototype.title = function() {
        return "Fetching Sample Stack";
      };

      StackStore.prototype.url = function() {
        return "store/" + this.id;
      };

      StackStore.prototype.isWorkingOn = function(info) {
        return info === this.id;
      };

      StackStore.prototype.onParseSuccess = function(j) {
        App.loadUrl(App.model.getPrivateProject().createStackByJson(j).url());
        return this.remove();
      };

      StackStore.prototype.onLoadError = function() {
        notification("error", lang.NOTIFY.LOAD_SAMPLE_FAIL);
        return this.remove();
      };

      StackStore.prototype.onParseError = function() {
        notification("error", lang.NOTIFY.PARSE_SAMPLE_FAIL);
        return this.remove();
      };

      return StackStore;

    })(Scene);
  });

}).call(this);

define('scenes/CheatsheetTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"cheatsheet\"> <div class=\"cheatsheet-wrap\">\r\n\r\n  <div class=\"icon-close-circle\"></div>\r\n\r\n  <section>\r\n    <h3 class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_TIT_STACK_APP_OP", {hash:{},data:data}))
    + "</h3>\r\n    <ul>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\"> <span class=\"shortcut\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PROP_KEY", {hash:{},data:data}))
    + "</span> </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PROP_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\"> <span class=\"shortcut\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_STAT_KEY", {hash:{},data:data}))
    + "</span> </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_STAT_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DUPL_KEY_MAC", {hash:{},data:data}))
    + "</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DUPL_KEY_MAC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DUPL_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DEL_KEY_MAC", {hash:{},data:data}))
    + "</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DEL_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DEL_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + S</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SAVE_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SAVE_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + "
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SCRL_KEY_MAC", {hash:{},data:data}))
    + "</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SCRL_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SCRL_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\"> <span class=\"shortcut\">← ↑ → ↓</span> </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_NUDGE_ITEM_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n    </ul>\r\n  </section>\r\n\r\n  <section>\r\n    <h3 class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_TIT_STATE_GEN", {hash:{},data:data}))
    + "</h3>\r\n    <ul class=\"keys\">\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\"> <span class=\"shortcut\">↑ ↓</span></div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_FOCUS_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\"> <span class=\"shortcut\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SELECT_KEY", {hash:{},data:data}))
    + "</span></div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SELECT_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\"> <span class=\"shortcut\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_EXPAND_KEY", {hash:{},data:data}))
    + "</span></div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_EXPAND_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\"> <span class=\"shortcut\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_COLLAPSE_KEY", {hash:{},data:data}))
    + "</span></div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_COLLAPSE_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\"> <span class=\"shortcut\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_NEXT_KEY", {hash:{},data:data}))
    + "</span></div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_NEXT_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\"> <span class=\"shortcut\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PREV_KEY", {hash:{},data:data}))
    + "</span></div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PREV_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + E</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_CONTENT_EDITOR_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_CONTENT_EDITOR_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + I</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_INFO_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_INFO_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + L</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_LOG_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_LOG_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n    </ul>\r\n  </section>\r\n\r\n  <section>\r\n    <h3 class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_TIT_STATE_EDIT", {hash:{},data:data}))
    + "</h3>\r\n    <ul>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + A</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SELECT_ALL_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SELECT_ALL_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + D</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DESELECT_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DESELECT_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + Enter</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_CREATE_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_CREATE_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + Delete</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DEL_STATE_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DEL_STATE_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + ↑</span>\r\n          <span class=\"shortcut mac\">⌘ + ↓</span>\r\n          <span class=\"shortcut pc\">Ctrl + ↑</span>\r\n          <span class=\"shortcut pc\">Ctrl + ↓</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_MOVE_FOCUS_STATE_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + C</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_COPY_STATE_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_COPY_STATE_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + V</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PASTE_STATE_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PASTE_STATE_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + Z</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_UNDO_STATE_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_UNDO_STATE_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n      <li class=\"shortcut-item\">\r\n        <div class=\"shortcuts\">\r\n          <span class=\"shortcut mac\">⌘ + Y</span>\r\n          <span class=\"shortcut pc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_REDO_STATE_KEY_PC", {hash:{},data:data}))
    + "</span>\r\n        </div>\r\n        <div class=\"shortcut-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_REDO_STATE_ACTION", {hash:{},data:data}))
    + "</div>\r\n      </li>\r\n    </ul>\r\n  </section>\r\n\r\n</div> </div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('scenes/Cheatsheet',["./CheatsheetTpl", "Scene", "i18n!/nls/lang.js"], function(CheatsheetTpl, Scene, lang) {
    var CSView, Cheatsheet;
    CSView = Backbone.View.extend({
      events: {
        "click": "clickBg",
        "click .icon-close-circle": "clickBtn"
      },
      initialize: function() {
        return this.setElement($(CheatsheetTpl()).appendTo("#scenes"));
      },
      clickBg: function(evt) {
        if ($(evt.target).hasClass("cheatsheet")) {
          this.trigger("close");
        }
      },
      clickBtn: function() {
        return this.trigger("close");
      }
    });
    return Cheatsheet = (function(_super) {
      __extends(Cheatsheet, _super);

      function Cheatsheet(attr) {
        var ss;
        ss = App.sceneManager.find("Cheatsheet");
        if (ss) {
          return ss;
        }
        return Scene.call(this, attr);
      }

      Cheatsheet.prototype.initialize = function() {
        this.view = new CSView();
        this.listenTo(this.view, "close", this.remove);
      };

      Cheatsheet.prototype.url = function() {
        return "/cheatsheet";
      };

      Cheatsheet.prototype.isWorkingOn = function(info) {
        return info === "Cheatsheet";
      };

      Cheatsheet.prototype.cleanup = function() {
        Scene.prototype.cleanup.call(this);
        App.sceneManager.activeScene().updateUrl();
      };

      return Cheatsheet;

    })(Scene);
  });

}).call(this);

(function() {
  define('scenes/Router',["scenes/ProjectScene", "scenes/Settings", "scenes/StackStore", "scenes/Cheatsheet", "backbone"], function(ProjectScene, Settings, StackStore, Cheatsheet) {
    return Backbone.Router.extend({
      routes: {
        "": "openProject",
        "workspace(/:project)": "openProject",
        "workspace/:project/ops(/:ops)": "openProject",
        "settings": "openSettings",
        "settings/:projectId(/:tab)": "openSettings",
        "store/:sampleId": "openStore",
        "cheatsheet": "openCheatsheet"
      },
      openStore: function(id) {
        return new StackStore({
          id: id
        });
      },
      openSettings: function(projectId, tab) {
        return new Settings({
          tab: tab,
          projectId: projectId
        });
      },
      openProject: function(projectId, opsModelId) {
        return new ProjectScene(projectId, opsModelId);
      },
      openCheatsheet: function() {
        return new Cheatsheet();
      },
      start: function() {
        var self;
        if (!Backbone.history.start({
          pushState: true
        })) {
          console.warn("URL doesn't match any routes.");
          this.navigate("/", {
            replace: true,
            trigger: true
          });
        }
        self = this;
        $(document).on("click", "a.route", function(evt) {
          return self.onRouteClicked(evt);
        });
        this.route("workspace/:project/unsaved(/:ops)", "openProject");
      },
      onRouteClicked: function(evt) {
        var currentUrl, href, lastChar, result;
        href = $(evt.currentTarget).attr("href");
        currentUrl = Backbone.history.fragment;
        lastChar = href[href.length - 1];
        if (lastChar === "/" || lastChar === "\\") {
          href = href.substring(0, href.length - 1);
        }
        result = this.navigate(href, {
          replace: true,
          trigger: true
        });
        if (result === true) {
          $(document).trigger("urlroute");
        } else if (result === false) {
          console.log("URL doesn't match any routes.");
          this.navigate(currentUrl, {
            replace: true
          });
        }
        return false;
      }
    });
  });

}).call(this);


define("scenes/Scenes", function(){});
