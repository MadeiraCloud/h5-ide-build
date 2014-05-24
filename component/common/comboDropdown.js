define('component/common/comboDropdownTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"combo-dd-manage btn btn-primary\" style=\"display:none;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.manageBtnValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <input class=\"input combo-dd-filter\" type=\"text\" placeholder=\""
    + escapeExpression(((stack1 = (depth0 && depth0.filterPlaceHolder)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n        ";
  return buffer;
  }

  buffer += "<div class=\"selectbox combo-dd\">\n    <div class=\"selection\"></div>\n\n    <div style=\"height: 300px; width:260px;\" class=\"dropdown scroll-wrap scrollbar-auto-hide  clearfix\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"scroll-content combo-dd-content\">\n        </div>\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noManage), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noFilter), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"combo-dd-list\"></ul>\n\n";
  };
TEMPLATE.listframe=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner loading-spinner-small\"></div>\n\n\n";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"kp-no-credential tac\">\n    <p>You are using a demo AWS account.</p>\n    <a class=\"show-credential\">Provide AWS Credential <br/>to manage key pairs</a>\n</div>";
  };
TEMPLATE.nocredential=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });

/* Example:
define [ 'combo_dropdown' ], ( combo_dropdown ) ->
    dropdown = new combo_dropdown()
    @dropdown = dropdown

    @dropdown.on 'open', @open, @
    @dropdown.on 'manage', @manageKp, @
    @dropdown.on 'change', @setKey, @
    @dropdown.on 'filter', @filter, @

    render: () ->
        @dropdown.setSelection '$defaultKp'

    open = () ->
        @dropdown.setContent template
 */

(function() {
  define('combo_dropdown',['./component/common/comboDropdownTpl', 'backbone', 'jquery'], function(template, Backbone, $) {
    return Backbone.View.extend({
      tagName: 'section',
      events: {
        'click .combo-dd-manage': 'manage',
        'click .show-credential': 'showCredential',
        'OPTION_SHOW .selectbox': 'optionShow',
        'OPTION_CHANGE .selectbox': 'optionChange',
        'keyup .combo-dd-filter': 'filter',
        'keydown .combo-dd-filter': 'stopPropagation',
        'click .combo-dd-filter': 'returnFalse'
      },
      stopPropagation: function(event) {
        return event.stopPropagation();
      },
      returnFalse: function() {
        return false;
      },
      showCredential: function() {
        return App.showSettings(App.showSettings.TAB.Credential);
      },
      filter: function(event) {
        return this.trigger('filter', event.currentTarget.value);
      },
      manage: function(event) {
        this.trigger('manage');
        return event.stopPropagation();
      },
      optionShow: function() {
        return this.trigger('open');
      },
      optionChange: function(event, name, data) {
        return this.trigger('change', name, data);
      },
      initialize: function(options) {
        this.$el.html(template.frame(options));
        return this;
      },
      render: function(tpl) {
        this.$('.combo-dd-content').html(template[tpl] || tpl);
        return this;
      },
      setSelection: function(dom) {
        this.$('.selection').html(dom);
        return this;
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
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <button class=\"icon-new-stack btn btn-blue t-m-btn\" data-btn=\"create\">"
    + escapeExpression(((stack1 = (depth0 && depth0.btnValueCreate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <button class=\"icon-"
    + escapeExpression(((stack1 = (depth0 && depth0.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " t-m-btn\" data-btn=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n                ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "disabled";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <th class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sortable), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                            ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "sortable";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "width="
    + escapeExpression(((stack1 = (depth0 && depth0.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\n                                    <th><div class=\"th-inner\"></div></th>\n                                    ";
  }

  buffer += "<div class=\"modal-toolbar\">\n    <div class=\"content-wrap hide\">\n        <div class=\"toolbar\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.btnValueCreate), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <div class=\"btn-group\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.buttons), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n        <div class=\"list\">\n            <div class=\"slidebox\">\n                <div class=\"content clearfix\">\n                </div>\n                <div class=\"error\">\n                    something wrong\n                </div>\n            </div>\n            <div class=\"table-head-fix\">\n                <table class=\"table-head\">\n                    <thead>\n                        <tr>\n                            <th>\n                                <div class=\"checkbox\">\n                                    <input id=\"t-m-select-all\" type=\"checkbox\" value=\"None\">\n                                    <label for=\"t-m-select-all\"></label>\n                                </div>\n                            </th>\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </tr>\n                    </thead>\n                </table>\n                <div class=\"scroll-wrap\">\n                    <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                    <div class=\"scroll-content\" style=\"display:block;\">\n                        <table class=\"table\">\n                            <thead>\n                                <tr>\n                                    <th><div class=\"th-inner\"></div></th>\n                                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                </tr>\n                            </thead>\n                            <tbody class='t-m-content'>\n\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"loading-spinner\"></div>\n</div>\n\n\n";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>\n\n\n\n\n\n";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });

/* Example:
define [ 'toolbar_modal' ], ( toolbar_modal ) ->
    modalOptions :
        title: "Manage Key Pairs in #{{regionName}}"
        buttons: [
            {
                icon: 'new-stack'
                type: 'create'
                name: 'Create Key Pair'
            }
            {
                icon: 'del'
                type: 'delete'
                disalbed: true
                name: 'Delete'
            }
        ]
        columns: [
            {
                sortable: true
                width: 100px # or 40%
                name: 'Name'
            }
            {
                sortable: false
                width: 100px # or 40%
                name: 'Fingerprint'
            }
        ]

    bindModal: () ->
        @modal = new toolbar_modal @modalOptions

        @modal.on 'slideup', @donothing, @
        @modal.on 'slidedown', @slideDown, @
        @modal.on 'refresh', @setKey, @

    initialize: () ->
        @bindModal()
        events =
            'click .xxx', @youkown


    render: () ->


        @modal.render(options)

    open = () ->
        @modal.setContent template
 */

(function() {
  define('toolbar_modal',['./component/common/toolbarModalTpl', 'backbone', 'jquery', 'UI.modalplus', 'UI.notification'], function(template, Backbone, $, modalplus) {
    return Backbone.View.extend({
      tagName: 'section',
      __slide: null,
      __modalplus: null,
      events: {
        'click .modal-close': 'close',
        'change #t-m-select-all': 'checkAll',
        'change .one-cb': 'checkOne',
        'click .t-m-btn': 'handleSlide',
        'click .cancel': 'cancel',
        'click .do-action': 'doAction',
        'click .cancel': 'cancel',
        'click [data-btn=refresh]': 'refresh'
      },
      initialize: function(options) {
        this.options = options || {};
        if (!this.options.title) {
          this.options.title = 'Default Title';
        }
        if (options.context) {
          this.options.context.modal = this;
          return this.options.context.m$ = _.bind(this.$, this);
        }
      },
      doAction: function(event) {
        var action;
        this.error();
        action = $(event.currentTarget).data('action');
        return this.trigger('action', action, this.__getChecked());
      },
      __getChecked: function() {
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
      __slideRejct: function() {
        return _.isFunction(this.options.slideable) && !this.options.slideable();
      },
      handleSlide: function(event) {
        var $activeButton, $button, $slidebox, activeButton, button;
        if (this.__slideRejct()) {
          return this;
        }
        $button = $(event.currentTarget);
        $slidebox = this.$('.slidebox');
        button = $button.data('btn');
        $activeButton = this.$('.toolbar .active');
        activeButton = $activeButton && $activeButton.data('btn');
        if ($activeButton) {
          if ($activeButton.get(0) === $button.get(0)) {
            this.trigger('slideup', button);
            $button.removeClass('active');
            $slidebox.removeClass('show');
            return this.__slide = null;
          } else {
            this.trigger('slidedown', button, this.__getChecked());
            $activeButton.removeClass('active');
            $button.addClass('active');
            $slidebox.addClass('show');
            return this.__slide = button;
          }
        } else {
          this.trigger('slidedown', button, this.__getChecked());
          $button.addClass('active');
          $slidebox.addClass('show');
          return this.__slide = button;
        }
      },
      refresh: function() {
        if (this.__slideRejct()) {
          return this;
        }
        this.renderLoading();
        return this.trigger('refresh');
      },
      close: function(event) {
        $('#modal-wrap').off('click', this.stopPropagation);
        modal.close();
        this.trigger('close');
        this.remove();
        return false;
      },
      checkOne: function(event) {
        var $target, cbAll, cbAmount, checkedAmount;
        $target = $(event.currentTarget);
        this.processDelBtn();
        cbAll = this.$('#t-m-select-all');
        cbAmount = this.$('.one-cb').length;
        checkedAmount = this.$('.one-cb:checked').length;
        $target.closest('tr').toggleClass('selected');
        if (checkedAmount === cbAmount) {
          return cbAll.prop('checked', true);
        } else if (cbAmount - checkedAmount === 1) {
          return cbAll.prop('checked', false);
        }
      },
      checkAll: function(event) {
        this.processDelBtn();
        if (event.currentTarget.checked) {
          this.$('input[type="checkbox"]').prop('checked', true);
          return this.$('tr.item').addClass('selected');
        } else {
          this.$('input[type="checkbox"]').prop('checked', false);
          return this.$('tr.item').removeClass('selected');
        }
      },
      processDelBtn: function() {
        var that;
        that = this;
        return _.defer(function() {
          if (that.$('.one-cb:checked').length) {
            return that.$('[data-btn=delete]').prop('disabled', false);
          } else {
            return that.$('[data-btn=delete]').prop('disabled', true);
          }
        });
      },
      stopPropagation: function(event) {
        var exception;
        exception = '.sortable, #download-kp';
        if (!$(event.target).is(exception)) {
          return event.stopPropagation();
        }
      },
      open: function() {
        var options;
        options = {
          template: this.el,
          title: this.options.title,
          disableFooter: true,
          disableClose: true,
          dragable: true,
          width: '855px',
          height: '473px'
        };
        this.__modalplus = new modalplus(options);
        return $('#modal-wrap').click(this.stopPropagation);
      },
      renderLoading: function() {
        this.$('.content-wrap').html(template.loading);
        return this;
      },
      __toggleLoading: function(showOrHide) {
        this.$('.loading-spinner').toggle(!showOrHide);
        return this.$('.content-wrap').toggle(showOrHide);
      },
      render: function(refresh) {
        var data;
        data = this.options;
        data.buttons = _.reject(data.buttons, function(btn) {
          if (btn.type === 'create') {
            data.btnValueCreate = btn.name;
            return true;
          }
        });
        this.__toggleLoading(false);
        this.$el.html(template.frame(data));
        if (!refresh) {
          this.open();
        }
        return this;
      },
      setContent: function(dom) {
        if (!this.$('.scroll-content').length) {
          this.render(true);
        }
        this.$('.t-m-content').html(dom);
        this.__toggleLoading(true);
        return this;
      },
      setSlide: function(dom) {
        this.$('.slidebox .content').html(dom);
        this.error();
        return this;
      },
      cancel: function() {
        var $activeButton, $slidebox;
        if (this.__slideRejct()) {
          return this;
        }
        $slidebox = this.$('.slidebox');
        $activeButton = this.$('.toolbar .active');
        this.trigger('slideup', $activeButton.data('btn'));
        $activeButton.removeClass('active');
        $slidebox.removeClass('show');
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
      }
    });
  });

}).call(this);

