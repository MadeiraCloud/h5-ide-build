define('component/oscomps/KpDialogTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\"\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.fingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n</tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"before-create\">\n        <label for=\"create-kp-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_NAME", {hash:{},data:data}))
    + "</label>\n        <input class=\"input\" type=\"text\" id=\"create-kp-name\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z0-9,_-]*$\" data-required=\"true\" maxlength=\"255\" placeholder=\"allow alphanumber, _ or - up to 255 characters\" autofocus>\n    </div>\n    <div class=\"after-create hide\">";
  stack1 = helpers.i18n.call(depth0, "PROP.KP_CREATED_NEED_TO_DOWNLAOD", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-blue do-action\" data-action=\"create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATING", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"download action\" style=\"display:none;\">\n        <a class=\"btn btn-blue do-action pulse\" data-action=\"download\" id=\"download-kp\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DOWNLOAD", {hash:{},data:data}))
    + "</a>\n        <button class=\"btn btn-silver cancel\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CLOSE", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.selecteKeyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(helpers.i18n.call(depth0, "PROP.KP_CONFIRM_DELETE_2", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.selectedCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_CONFIRM_DELETE_3", {hash:{},data:data}));
  return buffer;
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_CONFIRM_DELETE_1", {hash:{},data:data}))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selecteKeyName), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "?</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETING", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-import\" data-bind=\"true\">\n    <label for=\"import-kp-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_NAME", {hash:{},data:data}))
    + "</label>\n    <input class=\"input\" type=\"text\" id=\"import-kp-name\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z0-9,_-]*$\" data-required=\"true\" maxlength=\"255\" placeholder=\"allow alphanumber, _ or - up to 255 characters\">\n    <div class=\"import-zone\">\n\n    </div>\n    <div class=\"init action\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_IMPORT", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"ready action\" style=\"display:none;\">\n        <button class=\"btn btn-blue do-action\" data-action=\"import\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_IMPORT", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_IMPORTING", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_import=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"upload-kp-component drop-zone\">\n    <p class=\"upload-stuff\">\n        Drop "
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ",\n        <label for=\"modal-import\" class=\"select-file-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_SELECT_A_FILE", {hash:{},data:data}))
    + "</label>\n        <span class=\"display-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_OR_PASTE_KEY_CONTENT", {hash:{},data:data}))
    + "</span>\n        <span class=\"display-filled\" style=\"display:none;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_OR_PASTE_TO_UPDATE", {hash:{},data:data}))
    + "</span>\n        <input type=\"file\" id=\"modal-import\">\n    </p>\n    <p class=\"key-content\"></p>\n</div>";
  return buffer;
  };
TEMPLATE.upload=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<textarea autofocus spellcheck=\"false\" class=\"safari-download-textarea input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.keypair)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>";
  return buffer;
  };
TEMPLATE.safari_download=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<button class=\"btn btn-primary dropdown-list-btn\">Manage KeyPairs</button>";
  };
TEMPLATE.kpButton=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('OsKp',['Design', "CloudResources", 'constant', 'toolbar_modal', 'UI.modalplus', 'component/oscomps/KpDialogTpl', 'kp_upload', 'i18n!/nls/lang.js', 'JsonExporter', 'UI.selection'], function(Design, CloudResources, constant, toolbar_modal, modalplus, template, upload, lang, JsonExporter, bindSelection) {
    var download;
    download = JsonExporter.download;
    return Backbone.View.extend({
      __needDownload: false,
      __upload: null,
      __import: '',
      __mode: 'normal',
      initialize: function(resModel, selectTemplate) {
        this.template = selectTemplate;
        this.resModel = resModel;
        return this;
      },
      render: function() {
        var dropdown, dropdownSelect;
        dropdown = $("<div/>");
        this.template || (this.template = $("<select class='selection option' name='kpDropdown' data-button-tpl='kpButton'></select>"));
        $(this.template).attr('placeholder', lang.IDE.COMPONENT_SELECT_KEYPAIR);
        dropdown.append(this.template);
        dropdownSelect = dropdown.find("select.selection.option");
        bindSelection(dropdown, this.selectionTemplate);
        dropdownSelect.on('select_initialize', (function(_this) {
          return function() {
            _this.collection = CloudResources(constant.RESTYPE.OSKP, Design.instance().region());
            _this.listenTo(_this.collection, 'update', _this.updateOption.bind(_this));
            _this.selectize = dropdownSelect[0].selectize;
            return _this.updateOption();
          };
        })(this));
        this.$input = dropdownSelect;
        if (this.resModel) {
          this.$input.change((function(_this) {
            return function() {
              return _this.resModel.set('keypair', _this.$input.val());
            };
          })(this));
        }
        dropdownSelect.on('select_dropdown_button_click', (function(_this) {
          return function() {
            console.log('manage');
            _this.trigger('manage');
            return _this.manage();
          };
        })(this));
        this.setElement(dropdown);
        return this;
      },
      hasResourceWithDefaultKp: function() {
        var has;
        has = false;
        Design.instance().eachComponent(function(comp) {
          if (comp.type === constant.RESTYPE.OSSERVER) {
            console.log(comp);
            if (comp.get('keypair') === "$DefaultKeyPair" && comp.get('credential') === 'keypair') {
              has = true;
            }
          }
        });
        return has;
      },
      setDefaultKeyPair: function() {
        var that;
        that = this;
        return Design.instance().eachComponent(function(comp) {
          var KeypairModel, defaultKp, targetKeypair;
          if (comp.type === constant.RESTYPE.OSSERVER) {
            if (comp.get('keypair') === "$DefaultKeyPair" && comp.get('credential') === 'keypair') {
              console.log(comp);
              targetKeypair = that.collection.get(that.$input.val());
              KeypairModel = Design.modelClassForType(constant.RESTYPE.OSKP);
              defaultKp = _.find(KeypairModel.allObjects(), function(obj) {
                return obj.get("name") === "DefaultKP";
              });
              defaultKp.set('keyName', targetKeypair.get('name'));
              defaultKp.set('fingerprint', targetKeypair.get('fingerprint'));
              return defaultKp;
            }
          }
        });
      },
      updateOption: function() {
        var defaultKp, optionList;
        optionList = _.map(this.collection.toJSON(), function(e) {
          return {
            text: e.name,
            value: e.name
          };
        });
        defaultKp = this.resModel ? [
          {
            text: "$DefaultKeyPair",
            value: "$DefaultKeyPair"
          }
        ] : [];
        optionList = defaultKp.concat(optionList);
        if (!this.selectize) {
          return false;
        }
        this.selectize.clearOptions();
        this.selectize.addOption(optionList);
        if (this.resModel) {
          return this.selectize.setValue(this.resModel.get('keypair') || optionList[0].value);
        }
      },
      setValue: function(value) {
        if (!this.selectize) {
          console.error("Not Rendered Yet....");
          return false;
        }
        return this.selectize.setValue(value);
      },
      getValue: function() {
        if (!this.selectize) {
          console.error("Not Rendered Yet....");
          return false;
        }
        return this.selectize.getValue();
      },
      needDownload: function() {
        if (arguments.length === 1) {
          this.__needDownload = arguments[0];
          if (arguments[0] === false) {
            this.M$('.cancel').prop('disabled', false);
          }
        } else {
          if (this.__needDownload) {
            notification('warning', lang.NOTIFY.YOU_MUST_DOWNLOAD_THE_KEYPAIR);
          }
        }
        return this.__needDownload;
      },
      denySlide: function() {
        return !this.needDownload();
      },
      getRegion: function() {
        var region;
        region = Design.instance().get('region');
        return constant.REGION_SHORT_LABEL[region];
      },
      selectionTemplate: {
        kpButton: function() {
          return template.kpButton();
        }
      },
      getModalOptions: function() {
        var region, regionName, that;
        that = this;
        region = Design.instance().get('region');
        regionName = constant.REGION_SHORT_LABEL[region] || region;
        return {
          title: "Manage Key Pairs in " + regionName,
          slideable: _.bind(that.denySlide, that),
          context: that,
          buttons: [
            {
              icon: 'new-stack',
              type: 'create',
              name: lang.IDE.COMPONENT_CREATE_KEYPAIR
            }, {
              icon: 'import',
              type: 'import',
              name: lang.IDE.COMPONENT_IMPORT_KEY_PAIR
            }, {
              icon: 'del',
              type: 'delete',
              disabled: true,
              name: lang.IDE.COMPONENT_DELETE_KEY_PAIR
            }, {
              icon: 'refresh',
              type: 'refresh',
              name: ''
            }
          ],
          columns: [
            {
              sortable: true,
              width: "40%",
              name: lang.IDE.COMPONENT_KEY_PAIR_COL_NAME
            }, {
              sortable: false,
              name: lang.IDE.COMPONENT_KEY_PAIR_COL_FINGERPRINT
            }
          ]
        };
      },
      initModal: function() {
        new toolbar_modal(this.getModalOptions());
        this.modal.on('slidedown', this.renderSlides, this);
        this.modal.on('action', this.doAction, this);
        return this.modal.on('refresh', this.refresh, this);
      },
      manage: function(options) {
        var that;
        if (!options) {
          options = {};
        }
        this.initModal();
        this.modal.render();
        if (App.user.hasCredential()) {
          that = this;
          this.collection.fetch().then(function() {
            return that.renderKeys();
          });
        } else {
          this.modal.render('nocredential');
        }
        return this.collection.on('update', this.renderKeys, this);
      },
      renderKeys: function() {
        var data;
        if (!this.collection.isReady()) {
          return false;
        }
        data = {
          keys: this.collection.toJSON()
        };
        this.modal.setContent(template.keys(data));
        return this;
      },
      __events: {
        'click #kp-create': 'renderCreate',
        'click #kp-import': 'renderImport',
        'click #kp-delete': 'renderDelete',
        'click #kp-refresh': 'refresh',
        'click .cancel': 'cancel'
      },
      downloadKp: function() {
        return this.__downloadKp && this.__downloadKp();
      },
      doAction: function(action, checked) {
        return this[action] && this[action](this.validate(action), checked);
      },
      validate: function(action) {
        switch (action) {
          case 'create':
            return !this.M$('#create-kp-name').parsley('validate');
          case 'import':
            return !this.M$('#import-kp-name').parsley('validate');
        }
      },
      switchAction: function(state) {
        if (!state) {
          state = 'init';
        }
        return this.M$('.slidebox .action').each(function() {
          if ($(this).hasClass(state)) {
            return $(this).show();
          } else {
            return $(this).hide();
          }
        });
      },
      genDownload: function(name, str) {
        this.__downloadKp = function() {
          var blob, options;
          if ($("body").hasClass("safari")) {
            blob = null;
          } else {
            blob = new Blob([str]);
          }
          if (!blob) {
            options = {
              template: template.safari_download({
                keypair: str
              }),
              title: 'Keypair Content',
              disableFooter: true,
              disableClose: true,
              width: '855px',
              height: '473px',
              compact: true
            };
            new modalplus(options);
            $('.safari-download-textarea').select();
            return;
          }
          return download(blob, name);
        };
        return this.__downloadKp;
      },
      genDeleteFinish: function(times) {
        var error, finHandler, success, that;
        success = [];
        error = [];
        that = this;
        finHandler = _.after(times, function() {
          that.cancel();
          if (success.length === 1) {
            console.debug(success);
            notification('info', sprintf(lang.NOTIFY.XXX_IS_DELETED, success[0].attributes.name));
          } else if (success.length > 1) {
            notification('info', sprintf(lang.NOTIFY.SELECTED_KEYPAIRS_ARE_DELETED, success.length));
          }
          if (!that.collection.toJSON().length) {
            that.M$('#t-m-select-all').get(0).checked = false;
          }
          return _.each(error, function(s) {
            return console.log(s);
          });
        });
        return function(res) {
          console.debug(res);
          if (!(res.reason || res.msg)) {
            success.push(res);
          } else {
            error.push(res);
          }
          return finHandler();
        };
      },
      create: function(invalid) {
        var keyName, that;
        that = this;
        if (!invalid) {
          keyName = this.M$('#create-kp-name').val();
          this.switchAction('processing');
          return this.collection.create({
            name: keyName
          }).save().then(function(res) {
            that.needDownload(true);
            that.genDownload("" + res.attributes.name + ".pem", res.attributes.private_key);
            that.switchAction('download');
            that.M$('.before-create').hide();
            return that.M$('.after-create').find('span').text(res.attributes.keyName).end().show();
          }, function(err) {
            that.modal.error(err.awsResult || err.reason || err.msg);
            return that.switchAction();
          });
        }
      },
      download: function() {
        this.needDownload(false);
        this.__downloadKp && this.__downloadKp();
        return null;
      },
      "delete": function(invalid, checked) {
        var count, onDeleteFinish, that;
        count = checked.length;
        onDeleteFinish = this.genDeleteFinish(count);
        this.switchAction('processing');
        that = this;
        return _.each(checked, (function(_this) {
          return function(c) {
            return _this.collection.findWhere({
              name: c.data.name.toString()
            }).destroy().then(onDeleteFinish, onDeleteFinish);
          };
        })(this));
      },
      "import": function(invalid) {
        var keyContent, keyName, that;
        that = this;
        if (!invalid) {
          keyName = this.M$('#import-kp-name').val();
          this.switchAction('processing');
          try {
            keyContent = that.__upload.getData();
          } catch (_error) {
            this.modal.error('Key is not in valid OpenSSH public key format');
            that.switchAction('init');
            return;
          }
          return this.collection.create({
            name: keyName,
            public_key: keyContent
          }).save().then(function(res) {
            notification('info', sprintf(lang.NOTIFY.XXX_IS_IMPORTED, keyName));
            return that.cancel();
          }, function(err) {
            var msg;
            if (err.awsResult && err.awsResult.indexOf('Length exceeds maximum of 2048') >= 0) {
              msg = 'Length exceeds maximum of 2048';
            } else {
              msg = err.awsResult || err.error_message || err.reason || err.msg;
            }
            that.modal.error(msg);
            return that.switchAction('ready');
          });
        }
      },
      cancel: function() {
        return this.modal.cancel();
      },
      refresh: function() {
        return this.collection.fetchForce().then((function(_this) {
          return function() {
            return _this.renderKeys();
          };
        })(this));
      },
      renderSlides: function(which, checked) {
        var slides, tpl, _ref;
        tpl = template["slide_" + which];
        slides = this.getSlides();
        return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
      },
      getSlides: function() {
        var modal, that;
        that = this;
        modal = this.modal;
        return {
          create: function(tpl, checked) {
            return modal.setSlide(tpl);
          },
          "delete": function(tpl, checked) {
            var checkedAmount, data;
            checkedAmount = checked.length;
            if (!checkedAmount) {
              return;
            }
            data = {};
            if (checkedAmount === 1) {
              data.selecteKeyName = checked[0].data.name;
            } else {
              data.selectedCount = checkedAmount;
            }
            return modal.setSlide(tpl(data));
          },
          "import": function(tpl, checked) {
            modal.setSlide(tpl);
            that.__upload && that.__upload.remove();
            that.__upload = new upload();
            that.__upload.on('load', that.afterImport, this);
            return that.M$('.import-zone').html(that.__upload.render().el);
          }
        };
      },
      afterImport: function(result) {
        return this.switchAction('ready');
      }
    });
  });

}).call(this);

define('component/oscomps/SnapshotTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(9, program9, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"manager-content-main\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.name), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"manager-content-sub\">Name: "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &nbsp;&nbsp;&nbsp;&nbsp;Size: "
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</div>\n    ";
  return buffer;
  }
function program5(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program7(depth0,data) {
  
  
  return "&lt;No Name&gt;";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"manager-content-main\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    ";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\"\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td><div class=\"manager-content-main\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.name), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div></td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</td>\n    <td>\n        <div class=\"manager-content-main\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.completed), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        <span class=\"manager-content-sub\">Started: "
    + escapeExpression(((stack1 = (depth0 && depth0.started)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program4(depth0,data) {
  
  
  return "&lt;No Name&gt;";
  }

function program6(depth0,data) {
  
  
  return "<i class=\"status status-green icon-label\"></i> Completed";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"status status-yellow icon-label\"></i> Pending - "
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.content=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.selectedId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(helpers.i18n.call(depth0, "PROP.DELETE_SNAPSHOT_2", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.selectedCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DELETE_SNAPSHOT_3", {hash:{},data:data}));
  return buffer;
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DELETE_SNAPSHOT_1", {hash:{},data:data}));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selectedId), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "?</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETING", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n            <div class=\"control-group clearfix\">\n                <label for=\"property-snapshot-name-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_NAME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id=\"property-snapshot-name-create\" class=\"input\" type=\"text\" maxlength=\"255\" data-type=\"domain\" data-ignore=\"true\" placeholder=\"Allow alpha number, _ or - up to 255 characters.\">\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-volume-choose\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_VOLUME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div id=\"property-volume-choose\">\n                        <select id=\"snapshot-volume-choose\" data-select-tpl=\"option\" data-item-tpl=\"item\" class=\"selection option\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SNAPSHOT_SELECT", {hash:{},data:data}))
    + "\"></select>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-snapshot-desc-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_DESC", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id='property-snapshot-desc-create' class=\"input\" placeholder=\"Up to 255 characters\" type=\"text\"/>\n                </div>\n            </div>\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"create\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATING", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"slide-duplicate\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n            <div class=\"control-group clearfix\">\n                <label for=\"property-snapshot-source\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SOURCE_SNAPSHOT", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <p id=\"property-snapshot-source\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.originSnapshot)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n                </div>\n            </div>\n            <div class=\"control-group clearfix\">\n                <label for=\"property-snapshot-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_NEW_NAME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id=\"property-snapshot-name\" class=\"input\" type=\"text\" maxlength=\"255\" data-type=\"domain\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.originSnapshot)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-copy\" data-ignore=\"true\">\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-region-choose\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_DESTINATION_REGION", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div id=\"property-region-choose\"></div>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-snapshot-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_DESC", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id='property-snapshot-desc' class=\"input\" value=\"[Copied "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.originSnapshot)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " from "
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]\" type=\"text\"/>\n                </div>\n            </div>\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"duplicate\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DUPLICATE", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DUPLICATING", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_duplicate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>\n    <div class=\"manager-content-main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"manager-content-sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " G &nbsp;&nbsp;|&nbsp;&nbsp;"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</div>";
  return buffer;
  };
TEMPLATE.option=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>"
    + escapeExpression(((stack1 = (depth0 && depth0.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>";
  return buffer;
  };
TEMPLATE.item=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('OsSnapshot',['CloudResources', 'ApiRequest', 'constant', 'combo_dropdown', "UI.modalplus", 'toolbar_modal', "i18n!/nls/lang.js", 'component/oscomps/SnapshotTpl', 'UI.selection'], function(CloudResources, ApiRequest, constant, combo_dropdown, modalPlus, toolbar_modal, lang, template, bindSelection) {
    var deleteCount, deleteErrorCount, fetched, fetching, regionsMark;
    fetched = false;
    deleteCount = 0;
    deleteErrorCount = 0;
    fetching = false;
    regionsMark = {};
    return Backbone.View.extend({
      constructor: function() {
        this.collection = CloudResources(constant.RESTYPE.OSSNAP, Design.instance().region());
        this.listenTo(this.collection, 'update', this.onChange.bind(this));
        this.listenTo(this.collection, 'change', this.onChange.bind(this));
        return this;
      },
      onChange: function() {
        this.initManager();
        return this.trigger('datachange', this);
      },
      remove: function() {
        this.isRemoved = true;
        return Backbone.View.prototype.remove.call(this);
      },
      render: function() {
        return this.renderManager();
      },
      bindVolumeSelection: function() {
        var that;
        that = this;
        this.volumes = CloudResources(constant.RESTYPE.OSVOL, Design.instance().region());
        this.manager.$el.on('select_change', "#snapshot-volume-choose", function() {
          return that.selectSnapshot();
        });
        return this.manager.$el.on('select_initialize', "#snapshot-volume-choose", function() {
          that.selectize = this.selectize;
          this.selectize.setLoading(true);
          return that.manager.$el.find("#snapshot-volume-choose").on('select_dropdown_open', function() {
            return that.selectize.load(function(cb) {
              return that.volumes.fetch().then(function() {
                var volData;
                volData = _.map(that.volumes.toJSON(), function(e) {
                  return {
                    text: e.name,
                    value: e.id
                  };
                });
                that.selectize.setLoading(false);
                return cb(volData);
              });
            });
          });
        });
      },
      renderRegionDropdown: function() {
        var option, selection;
        option = {
          filterPlaceHolder: lang.PROP.SNAPSHOT_FILTER_REGION
        };
        this.regionsDropdown = new combo_dropdown(option);
        this.regions = _.keys(constant.REGION_LABEL);
        selection = lang.PROP.VOLUME_SNAPSHOT_SELECT_REGION;
        this.regionsDropdown.setSelection(selection);
        this.regionsDropdown.on('open', this.openRegionDropdown, this);
        this.regionsDropdown.on('filter', this.filterRegionDropdown, this);
        this.regionsDropdown.on('change', this.selectRegion, this);
        return this.regionsDropdown;
      },
      openRegionDropdown: function(keySet) {
        var content, currentRegion, data, dataSet;
        currentRegion = Design.instance().get('region');
        data = _.map(this.regions, function(region) {
          return {
            name: constant.REGION_LABEL[region] + " - " + constant.REGION_SHORT_LABEL[region],
            selected: region === currentRegion,
            region: region
          };
        });
        dataSet = {
          isRuntime: false,
          data: data
        };
        if (keySet) {
          dataSet.data = keySet;
          dataSet.hideDefaultNoKey = true;
        }
        content = template.keys(dataSet);
        this.regionsDropdown.toggleControls(false, 'manage');
        this.regionsDropdown.toggleControls(true, 'filter');
        return this.regionsDropdown.setContent(content);
      },
      openDropdown: function(keySet) {
        return this.volumes.fetch().then((function(_this) {
          return function() {
            var content, data, dataSet;
            data = _this.volumes.toJSON();
            dataSet = {
              isRuntime: false,
              data: data
            };
            if (keySet) {
              dataSet.data = keySet;
              dataSet.hideDefaultNoKey = true;
            }
            content = template.keys(dataSet);
            _this.dropdown.toggleControls(false, 'manage');
            _this.dropdown.toggleControls(true, 'filter');
            return _this.dropdown.setContent(content);
          };
        })(this));
      },
      filterRegionDropdown: function(keyword) {
        var hitKeys;
        hitKeys = _.filter(this.regions, function(data) {
          return data.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        if (keyword) {
          return this.openRegionDropdown(hitKeys);
        } else {
          return this.openRegionDropdown();
        }
      },
      selectSnapshot: function(e) {
        return this.manager.$el.find('[data-action="create"]').prop('disabled', false);
      },
      selectRegion: function(e) {
        return this.manager.$el.find('[data-action="duplicate"]').prop('disabled', false);
      },
      renderManager: function() {
        var _ref;
        this.manager = new toolbar_modal(this.getModalOptions());
        this.manager.on('refresh', this.refresh, this);
        this.manager.on("slidedown", this.renderSlides, this);
        this.manager.on('action', this.doAction, this);
        this.manager.on('close', (function(_this) {
          return function() {
            return _this.manager.remove();
          };
        })(this));
        this.manager.on('checked', this.processDuplicate, this);
        this.manager.render();
        if (!App.user.hasCredential()) {
          if ((_ref = this.manager) != null) {
            _ref.render('nocredential');
          }
          return false;
        }
        return this.initManager();
      },
      processDuplicate: function(event, checked) {
        if (checked.length === 1) {
          return this.M$('[data-btn=duplicate]').prop('disabled', false);
        } else {
          return this.M$('[data-btn=duplicate]').prop('disabled', true);
        }
      },
      refresh: function() {
        fetched = false;
        return this.initManager();
      },
      setContent: function() {
        var content, data, dataSet, _ref;
        fetching = false;
        fetched = true;
        data = this.collection.toJSON();
        data = _.map(data, function(e, f) {
          if (e.status === "available") {
            e.completed = true;
          }
          if (e.created_at) {
            e.started = (new Date(e.created_at)).toString();
          }
          return e;
        });
        dataSet = {
          items: data
        };
        content = template.content(dataSet);
        return (_ref = this.manager) != null ? _ref.setContent(content) : void 0;
      },
      initManager: function() {
        var currentRegion, setContent, _ref;
        setContent = this.setContent.bind(this);
        currentRegion = (_ref = Design.instance()) != null ? _ref.get('region') : void 0;
        if (currentRegion && ((!fetched && !fetching) || (!regionsMark[currentRegion]))) {
          fetching = true;
          regionsMark[currentRegion] = true;
          return this.collection.fetchForce().then(setContent, setContent);
        } else if (!fetching) {
          return this.setContent();
        }
      },
      renderSlides: function(which, checked) {
        var slides, tpl, _ref;
        tpl = template['slide_' + which];
        slides = this.getSlides();
        return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
      },
      getSlides: function() {
        return {
          'delete': function(tpl, checked) {
            var checkedAmount, data;
            checkedAmount = checked.length;
            if (!checkedAmount) {
              return;
            }
            data = {};
            if (checkedAmount === 1) {
              data.selectedName = checked[0].data.name;
            } else {
              data.selectedCount = checkedAmount;
            }
            return this.manager.setSlide(tpl(data));
          },
          'create': function(tpl) {
            var data;
            data = {
              volumes: {}
            };
            bindSelection(this.manager.$el, this.selectionTemplate.call(this));
            this.bindVolumeSelection();
            return this.manager.setSlide(tpl(data));
          }
        };
      },
      doAction: function(action, checked) {
        return this["do_" + action] && this["do_" + action]('do_' + action, checked);
      },
      do_create: function(validate, checked) {
        var afterCreated, data, volume, volumeId;
        volumeId = this.selectize.getValue();
        if (!volumeId) {
          return false;
        }
        volume = this.volumes.findWhere({
          'id': this.selectize.getValue()
        });
        if (!volume) {
          return false;
        }
        data = {
          "name": $("#property-snapshot-name-create").val(),
          'volume_id': volume.get('id'),
          'description': $('#property-snapshot-desc-create').val()
        };
        this.switchAction('processing');
        afterCreated = this.afterCreated.bind(this);
        return this.collection.create(data).save().then(afterCreated, afterCreated);
      },
      do_delete: function(invalid, checked) {
        var afterDeleted, that;
        that = this;
        deleteCount += checked.length;
        this.switchAction('processing');
        afterDeleted = that.afterDeleted.bind(that);
        return _.each(checked, (function(_this) {
          return function(data) {
            return _this.collection.findWhere({
              id: data.data.id
            }).destroy().then(afterDeleted, afterDeleted);
          };
        })(this));
      },
      do_duplicate: function(invalid, checked) {
        var afterDuplicate, description, newName, sourceSnapshot, targetRegion;
        sourceSnapshot = checked[0];
        targetRegion = $('#property-region-choose').find('.selectbox .selection .manager-content-main').data('id');
        if ((this.regions.indexOf(targetRegion)) < 0) {
          return false;
        }
        this.switchAction('processing');
        newName = this.manager.$el.find('#property-snapshot-name').val();
        description = this.manager.$el.find('#property-snapshot-desc').val();
        afterDuplicate = this.afterDuplicate.bind(this);
        return this.collection.findWhere({
          id: sourceSnapshot.data.id
        }).copyTo(targetRegion, newName, description).then(afterDuplicate, afterDuplicate);
      },
      afterCreated: function(result, newSnapshot) {
        this.manager.cancel();
        if (result.error) {
          notification('error', sprintf(lang.NOTIFY.CREATE_FAILED_BECAUSE_OF_XXX, result.msg));
          return false;
        }
        return notification('info', lang.NOTIFY.NEW_SNAPSHOT_IS_CREATED_SUCCESSFULLY);
      },
      afterDuplicate: function(result) {
        var currentRegion;
        currentRegion = Design.instance().get('region');
        this.manager.cancel();
        if (result.error) {
          notification('error', sprintf, lang.NOTIFY.DUPLICATE_FAILED_BECAUSE_OF_XXX, result.msg);
          return false;
        }
        if (result.attributes.region === currentRegion) {
          this.collection.add(result);
          return notification('info', lang.NOTIFY.INFO_DUPLICATE_SNAPSHOT_SUCCESS);
        } else {
          this.initManager();
          return notification('info', lang.NOTIFY.INFO_ANOTHER_REGION_DUPLICATE_SNAPSHOT_SUCCESS);
        }
      },
      afterDeleted: function(result) {
        deleteCount--;
        if (result.error) {
          deleteErrorCount++;
        }
        if (deleteCount === 0) {
          if (deleteErrorCount > 0) {
            notification('error', sprintf(lang.NOTIFY.XXX_SNAPSHOT_FAILED_TO_DELETE, deleteErrorCount));
          } else {
            notification('info', lang.NOTIFY.INFO_DELETE_SNAPSHOT_SUCCESSFULLY);
          }
          this.manager.unCheckSelectAll();
          deleteErrorCount = 0;
          return this.manager.cancel();
        }
      },
      switchAction: function(state) {
        if (!state) {
          state = 'init';
        }
        return this.M$('.slidebox .action').each(function() {
          if ($(this).hasClass(state)) {
            return $(this).show();
          } else {
            return $(this).hide();
          }
        });
      },
      selectionTemplate: function() {
        var that;
        that = this;
        return {
          option: function(result) {
            var volume;
            volume = that.volumes.get(result.value);
            return template.option(volume.toJSON());
          },
          item: template.item
        };
      },
      getModalOptions: function() {
        var region, regionName, that;
        that = this;
        region = Design.instance().get('region');
        regionName = constant.REGION_SHORT_LABEL[region] || region;
        return {
          title: "Manage Snapshots in " + regionName,
          slideable: true,
          context: that,
          buttons: [
            {
              icon: 'new-stack',
              type: 'create',
              name: 'Create Snapshot'
            }, {
              icon: 'del',
              type: 'delete',
              disabled: true,
              name: 'Delete'
            }, {
              icon: 'refresh',
              type: 'refresh',
              name: ''
            }
          ],
          columns: [
            {
              sortable: true,
              width: "20%",
              name: 'Name'
            }, {
              sortable: true,
              rowType: 'number',
              width: "10%",
              name: 'Capicity'
            }, {
              sortable: true,
              rowType: 'datetime',
              width: "40%",
              name: 'status'
            }, {
              sortable: false,
              width: "30%",
              name: 'Description'
            }
          ]
        };
      }
    });
  });

}).call(this);


define("component/OsComps", function(){});
