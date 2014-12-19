define('component/common/comboDropdownTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <input class=\"input combo-dd-filter\" type=\"text\" placeholder=\""
    + escapeExpression(((stack1 = (depth0 && depth0.filterPlaceHolder)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"combo-dd-manage btn btn-primary\" style=\"display:none;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.manageBtnValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        ";
  return buffer;
  }

  buffer += "<div class=\"selectbox combo-dd multiopen "
    + escapeExpression(((stack1 = (depth0 && depth0.classList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-silent-close=\"#modal-wrap\">\n    <div class=\"selection\"></div>\n\n    <div class=\"dropdown\">\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noFilter), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <div class=\"scroll-wrap scrollbar-auto-hide clearfix\">\n            <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n            <div class=\"scroll-content combo-dd-content\">\n            </div>\n        </div>\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noManage), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"combo-dd-list\"></ul>";
  };
TEMPLATE.listframe=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner loading-spinner-small\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"no-credential tac\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.COMBO_DROPDOWN_DEMO_AWS_ACCOUNT", {hash:{},data:data}))
    + "</p>\n    <a class=\"show-credential\">"
    + escapeExpression(helpers.i18n.call(depth0, "COMBO_DROPDOWN_PRIVIDE_AWS_CREDENTIAL", {hash:{},data:data}))
    + "</a>\n</div>";
  return buffer;
  };
TEMPLATE.nocredential=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });

/* Example:
Refer to kpView.coffee
 */

(function() {
  define('combo_dropdown',['component/common/comboDropdownTpl', 'backbone', 'jquery'], function(template, Backbone, $) {
    return Backbone.View.extend({
      tagName: 'section',
      events: {
        'click .combo-dd-manage': '__manage',
        'click .show-credential': '__showCredential',
        'OPTION_SHOW .selectbox': '__optionShow',
        'OPTION_CHANGE .selectbox': '__optionChange',
        'keyup .combo-dd-filter': '__filter',
        'keydown .combo-dd-filter': '__stopPropagation',
        'click .combo-dd-filter': '__returnFalse',
        'click .create-one': '__quickCreate'
      },
      __quickCreate: function() {
        return this.trigger('quick_create');
      },
      __stopPropagation: function(event) {
        return event.stopPropagation();
      },
      __returnFalse: function() {
        return false;
      },
      __showCredential: function() {
        return App.showSettings(App.showSettings.TAB.Credential);
      },
      __filter: function(event) {
        return this.trigger('filter', event.currentTarget.value);
      },
      __manage: function(event) {
        this.trigger('manage');
        return event.stopPropagation();
      },
      __optionShow: function() {
        this.$('.combo-dd-filter').val('');
        if (!this.$('.combo-dd-content').html().trim()) {
          this.render('loading');
        }
        return this.trigger('open');
      },
      __optionChange: function(event, name, data) {
        return this.trigger('change', name, data);
      },
      initialize: function(options) {
        this.$el.html(template.frame(options));
        return this;
      },
      render: function(tpl) {
        this.$('.combo-dd-content').html(template[tpl] && template[tpl]() || tpl);
        return this;
      },
      setSelection: function(dom) {
        this.$('.selection').html(dom);
        return this;
      },
      getSelection: function(dom) {
        return $.trim(this.$('.selection').text());
      },
      setContent: function(dom) {
        this.$('.combo-dd-content').html(template.listframe);
        this.$('.combo-dd-list').html(dom);
        return this;
      },
      toggleControls: function(showOrHide, whichOne) {
        if (whichOne) {
          this.$(".combo-dd-" + whichOne).toggle(showOrHide);
        } else {
          this.$('.combo-dd-filter, .combo-dd-manage').toggle(showOrHide);
        }
        return this;
      },
      delegate: function(events, context) {
        var eventName, key, match, method, selector, _i, _len;
        if (!events || !_.isObject(events)) {
          return this;
        }
        for (method = _i = 0, _len = events.length; _i < _len; method = ++_i) {
          key = events[method];
          if (!method) {
            continue;
          }
          match = key.match(/^(\S+)\s*(.*)$/);
          eventName = match[1];
          selector = match[2];
          method = _.bind(method, context || this);
          eventName += '.delegateEvents' + this.cid;
          if (selector === '') {
            this.$el.on(eventName, method);
          } else {
            this.$el.on(eventName, selector, method);
          }
        }
        return this;
      }
    });
  });

}).call(this);

define('component/common/toolbarModalTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-toolbar "
    + escapeExpression(((stack1 = (depth0 && depth0.classList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <div class=\"content-wrap\">\n\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"toolbar\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.btnValueCreate), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <div class=\"btn-group\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.buttons), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n</div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <button class=\"icon-new-stack btn btn-blue t-m-btn ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-btn=\"create\">"
    + escapeExpression(((stack1 = (depth0 && depth0.btnValueCreate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n        ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "active";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <button class=\"icon-"
    + escapeExpression(((stack1 = (depth0 && depth0.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " t-m-btn ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-btn=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n            ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "disabled";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasButton), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"list\">\n    <div class=\"slidebox\" style=\""
    + escapeExpression(((stack1 = (depth0 && depth0.slideStyle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <div class=\"content clearfix\">\n            <div class=\"loading-spinner\"></div>\n        </div>\n        <div class=\"error\">\n            something wrong\n        </div>\n    </div>\n    "
    + escapeExpression(((stack1 = (depth0 && depth0.beforeTable)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    <div class=\"list-content\">\n    </div>\n\n\n</div>";
  return buffer;
  };
TEMPLATE.toolbar_slide=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n                <th>\n                    <div class=\"checkbox\">\n                        <input id=\"t-m-select-all\" type=\"checkbox\" value=\"None\">\n                        <label for=\"t-m-select-all\"></label>\n                    </div>\n                </th>\n                ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <th class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sortable), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-row-type=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rowType), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "sortable";
  }

function program6(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.rowType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program8(depth0,data) {
  
  
  return "string";
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "width:"
    + escapeExpression(((stack1 = (depth0 && depth0.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div style=\"overflow-y:auto;overflow-x:hidden;height: "
    + escapeExpression(((stack1 = (depth0 && depth0.height)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px;\">\n        ";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"scroll-wrap\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.height), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n            <div class=\"scroll-content\" style=\"display:block;\">\n                ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style=\"height: "
    + escapeExpression(((stack1 = (depth0 && depth0.height)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px\" ";
  return buffer;
  }

function program17(depth0,data) {
  
  
  return "<th><div class=\"th-inner\"></div></th>";
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <th style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><div class=\"th-inner\"></div></th>\n                            ";
  return buffer;
  }

function program21(depth0,data) {
  
  
  return "\n            </div>\n            ";
  }

function program23(depth0,data) {
  
  
  return "\n        </div>\n    </div>\n    ";
  }

  buffer += "<div class=\"table-head-fix will-be-covered\">\n    <table class=\"table-head\">\n        <thead>\n            <tr>\n                ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noCheckbox), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tr>\n        </thead>\n    </table>\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.useCustomScroll), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                <table class=\"table\">\n                    <thead>\n                        <tr>\n                            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noCheckbox), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </tr>\n                    </thead>\n                    <tbody class='t-m-content'>\n                    </tbody>\n                </table>\n                ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.useCustomScroll), {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.table=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"kp-no-credential tac\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.COMBO_DROPDOWN_DEMO_AWS_ACCOUNT", {hash:{},data:data}))
    + "</p>\n    <a class=\"show-credential\">"
    + escapeExpression(helpers.i18n.call(depth0, "COMBO_DROPDOWN_PRIVIDE_AWS_CREDENTIAL", {hash:{},data:data}))
    + "</a>\n</div>";
  return buffer;
  };
TEMPLATE.nocredential=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr class=\"table tr-detail\">\n    <td colspan=\""
    + escapeExpression(((stack1 = (depth0 && depth0.columnCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    </td>\n</tr>";
  return buffer;
  };
TEMPLATE.tr_detail=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"no-credential tac\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "COMBO_DROPDOWN_DEMO_AWS_ACCOUNT", {hash:{},data:data}))
    + "</p>\n    <a class=\"show-credential\">"
    + escapeExpression(helpers.i18n.call(depth0, "COMBO_DROPDOWN_PRIVIDE_AWS_CREDENTIAL", {hash:{},data:data}))
    + "</a>\n</div>";
  return buffer;
  };
TEMPLATE.nocredential=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });

/* Example:
Refer to kpView.coffee
 */

(function() {
  define('toolbar_modal',['component/common/toolbarModalTpl', 'backbone', 'jquery', 'UI.modalplus', 'UI.notification'], function(template, Backbone, $, modalplus) {
    return Backbone.View.extend({
      tagName: 'section',
      __slide: null,
      __modalplus: null,
      events: {
        'change #t-m-select-all': '__checkAll',
        'change .one-cb': '__checkOne',
        'click .t-m-btn': '__handleSlide',
        'click tr .show-detail': '__handleDetail',
        'click .cancel': 'cancel',
        'click .do-action': '__doAction',
        'click [data-btn=refresh]': '__refresh',
        'click .table-head .sortable': '__sort',
        'click .show-credential': '__showCredential'
      },
      initialize: function(options) {
        this.options = options || {};
        if (!this.options.title) {
          this.options.title = 'Default Title';
        }
        if (options.context) {
          this.options.context.modal = this;
          this.options.context.M$ = _.bind(this.$, this);
        }
        return null;
      },
      __showCredential: function() {
        return App.showSettings(App.showSettings.TAB.Credential);
      },
      __sort: function() {
        return this.$('.tr-detail').remove();
      },
      __doAction: function(event) {
        var action;
        this.error();
        action = $(event.currentTarget).data('action');
        return this.trigger('action', action, this.getChecked());
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
      },
      __slideReject: function() {
        return _.isFunction(this.options.slideable) && !this.options.slideable();
      },
      __handleSlide: function(event) {
        var $activeButton, $button, activeButton, button;
        $button = $(event.currentTarget);
        button = $button.data('btn');
        if (button === 'refresh') {
          return this;
        }
        if (this.__slideReject()) {
          return this;
        }
        $activeButton = this.$('.toolbar .active');
        activeButton = $activeButton && $activeButton.data('btn');
        if ($activeButton.length) {
          if ($activeButton.get(0) === $button.get(0)) {
            if (this.options.longtermActive) {
              return;
            }
            $button.removeClass('active');
            this.toggleSlide(false);
            this.__slide = null;
            this.trigger('slideup', button, this.getChecked());
          } else {
            $activeButton.removeClass('active');
            $button.addClass('active');
            this.toggleSlide(true);
            this.__slide = button;
            this.trigger('slidedown', button, this.getChecked());
          }
        } else {
          $button.addClass('active');
          this.toggleSlide(true);
          this.__slide = button;
          this.trigger('slidedown', button, this.getChecked());
        }
        return null;
      },
      __handleDetail: function(event) {
        var $target, $tr;
        $target = $(event.currentTarget);
        $tr = $target.closest('tr');
        if ($tr.hasClass('detailed')) {
          $tr.removeClass('detailed');
          return $tr.next('.tr-detail').remove();
        } else {
          $tr.addClass('detailed').after(template.tr_detail({
            columnCount: this.options.columns.length + 1
          }));
          return this.trigger('detail', event, $tr.data(), $tr);
        }
      },
      __refresh: function() {
        if (this.__slideReject()) {
          return this;
        }
        this.renderLoading();
        return this.trigger('refresh');
      },
      __close: function(event) {
        this.trigger('close');
        this.remove();
        return false;
      },
      __checkOne: function(event) {
        var $target, cbAll, cbAmount, checkedAmount;
        $target = $(event.currentTarget);
        this.__processDelBtn();
        cbAll = this.$('#t-m-select-all');
        cbAmount = this.$('.one-cb').length;
        checkedAmount = this.$('.one-cb:checked').length;
        $target.closest('tr').toggleClass('selected');
        if (checkedAmount === cbAmount) {
          cbAll.prop('checked', true);
        } else if (cbAmount - checkedAmount === 1) {
          cbAll.prop('checked', false);
        }
        return this.__triggerChecked(event);
      },
      __checkAll: function(event) {
        this.__processDelBtn();
        if (event.currentTarget.checked) {
          this.$('input[type="checkbox"]:not(:disabled)').prop('checked', true).parents('tr.item').addClass('selected');
        } else {
          this.$('input[type="checkbox"]').prop('checked', false);
          this.$('tr.item').removeClass('selected');
        }
        return this.__triggerChecked(event);
      },
      __triggerChecked: function(param) {
        return this.trigger('checked', param, this.getChecked());
      },
      __processDelBtn: function(enable) {
        var that;
        if (arguments.length === 1) {
          return this.$('[data-btn=delete]').prop('disabled', !enable);
        } else {
          that = this;
          return _.defer(function() {
            if (that.$('.one-cb:checked').length) {
              return that.$('[data-btn=delete]').prop('disabled', false);
            } else {
              return that.$('[data-btn=delete]').prop('disabled', true);
            }
          });
        }
      },
      __stopPropagation: function(event) {
        var exception;
        exception = '.sortable, #download-kp, .selection, .item';
        if (!$(event.target).is(exception)) {
          return event.stopPropagation();
        }
      },
      __open: function() {
        var options;
        options = {
          template: this.el,
          title: this.options.title,
          disableFooter: true,
          disableClose: true,
          width: '855px',
          height: '473px',
          compact: true,
          hasScroll: true,
          mode: "panel"
        };
        this.__modalplus = new modalplus(options);
        this.__modalplus.on('closed', this.__close, this);
        this.__modalplus.on("resize", this.__resizeModal.bind(this));
        return this;
      },
      __getHeightOfContent: function() {
        var $modal, footerHeight, headerHeight, windowHeight;
        windowHeight = $(window).height();
        $modal = this.__modalplus.tpl;
        headerHeight = $modal.find(".modal-header").outerHeight();
        footerHeight = $modal.find('.modal-footer').height() || 0;
        return windowHeight - headerHeight - footerHeight - 75;
      },
      __resizeModal: function() {
        var scroll, that;
        that = this;
        this.__modalplus.tpl.find(".scrollbar-veritical-thumb").removeAttr("style");
        scroll = this.__modalplus.tpl.find(".table-head-fix.will-be-covered .scroll-wrap");
        scroll = scroll.size() > 0 ? scroll : this.__modalplus.find('.will-be-covered>div');
        if (scroll.size()) {
          return scroll.height(that.__getHeightOfContent());
        }
      },
      __renderToolbarSlide: function() {
        var $contentWrap, data, that, _ref;
        that = this;
        $contentWrap = this.$('.content-wrap');
        if (!$contentWrap.find('.toolbar').size()) {
          data = this.options;
          data.hasButton = !!((_ref = data.buttons) != null ? _ref.length : void 0);
          data.buttons = _.reject(data.buttons, function(btn) {
            if (btn.type === 'create') {
              data.btnValueCreate = btn.name;
              return true;
            }
          });
          data.height = that.__getHeightOfContent();
          this.$('.content-wrap').html(template.toolbar_slide(data));
          return this;
        }
      },
      render: function(refresh) {
        var tpl;
        this.$el.html(template.frame(this.options));
        if (_.isString(refresh)) {
          tpl = refresh;
          this.$('.content-wrap').html(template[tpl] && template[tpl]() || tpl);
        } else {
          this.renderLoading();
        }
        if (!refresh) {
          this.__open();
        }
        return this;
      },
      renderLoading: function() {
        this.$('.content-wrap').html(template.loading);
        return this;
      },
      renderListLoading: function() {
        this.$('.list-content').html(template.loading);
        return this;
      },
      setContent: function(dom, noTable) {
        this.tempDom = dom;
        this.__renderToolbarSlide();
        if (noTable) {
          this.$('.list-content').html(dom);
        } else {
          this.$('.list-content').html(template.table(this.options));
          this.$('.t-m-content').html(dom);
        }
        this.__triggerChecked(null);
        this.trigger("rendered", this);
        return this;
      },
      setSlide: function(dom) {
        this.$('.slidebox .content').html(dom);
        this.error();
        return this;
      },
      setDetail: function($tr, dom) {
        var $trDetail;
        $trDetail = $tr.next('.tr-detail');
        $trDetail.find('td').html(dom);
        return $trDetail;
      },
      triggerSlide: function(which) {
        return this.$("[data-btn=" + which + "]").click();
      },
      cancel: function() {
        var $activeButton;
        if (this.__slideReject()) {
          return this;
        }
        $activeButton = this.$('.toolbar .active');
        this.trigger('slideup', $activeButton.data('btn'), this.getChecked());
        if (!this.options.longtermActive) {
          $activeButton.removeClass('active');
        }
        this.toggleSlide(false);
        return this;
      },
      unCheckSelectAll: function() {
        this.$('#t-m-select-all').get(0).checked = false;
        return this.__processDelBtn(false);
      },
      delegate: function(events, context) {
        var eventName, key, match, method, selector;
        if (!events || !_.isObject(events)) {
          return this;
        }
        context = context || this;
        for (key in events) {
          method = events[key];
          if (!_.isFunction(method)) {
            method = context[events[key]];
          }
          if (!method) {
            continue;
          }
          match = key.match(/^(\S+)\s*(.*)$/);
          eventName = match[1];
          selector = match[2];
          method = _.bind(method, context);
          eventName += '.delegateEvents' + this.cid;
          if (selector === '') {
            this.$el.on(eventName, method);
          } else {
            this.$el.on(eventName, selector, method);
          }
        }
        return this;
      },
      error: function(msg) {
        var $error;
        $error = this.$('.error');
        if (msg) {
          return $error.text(msg).show();
        } else {
          return $error.hide();
        }
      },
      getSlide: function() {
        return this.__slide;
      },
      toggleSlide: function(display) {
        var $slidebox;
        $slidebox = this.$('.slidebox');
        if (display) {
          this.setSlide(template.loading);
        }
        $slidebox.toggleClass('show', display || false);
        return this;
      }
    });
  });

}).call(this);


define("component/Common", function(){});
