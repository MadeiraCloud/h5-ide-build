define('component/kp/kpDialogTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\"\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
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


return TEMPLATE; });
(function() {
  define('kp_upload',['./component/kp/kpDialogTpl', 'backbone', 'jquery'], function(template_modal, Backbone, $) {
    return Backbone.View.extend({
      __data: null,
      events: {
        'paste .upload-kp-component': 'onPaste',
        'change .upload-kp-component': 'hanldeFile',
        'drop .upload-kp-component': 'hanldeFile',
        'dragenter .upload-kp-component': 'addDragoverClass',
        'dragleave .upload-kp-component': 'removeDragoverClass',
        'dragover .upload-kp-component': 'dragoverHandler'
      },
      removeDragoverClass: function(event) {
        return $(event.currentTarget).removeClass('dragover');
      },
      addDragoverClass: function(event) {
        return $(event.currentTarget).addClass('dragover');
      },
      dragoverHandler: function(event) {
        var dt;
        dt = event.originalEvent.dataTransfer;
        if (dt) {
          dt.dropEffect = "copy";
        }
        event.stopPropagation();
        event.preventDefault();
        return null;
      },
      save: function(data) {
        if (!data) {
          return;
        }
        this.__data = data;
        this.$('.drop-zone').addClass('filled');
        this.$('.key-content').text(data);
        return this.trigger('load', data);
      },
      onPaste: function(event) {
        var pasteData;
        pasteData = event.originalEvent.clipboardData.getData('text/plain');
        return this.save(pasteData);
      },
      hanldeFile: function(evt) {
        var files;
        evt.stopPropagation();
        evt.preventDefault();
        this.$(".drop-zone").removeClass("dragover");
        this.$("#import-json-error").html("");
        evt = evt.originalEvent;
        files = (evt.dataTransfer || evt.target).files;
        if (!files || !files.length) {
          return;
        }
        this.__reader.readAsText(files[0]);
        return null;
      },
      initialize: function(options) {
        var reader, that;
        that = this;
        that.type = options && options.type || 'public key';
        reader = this.__reader = new FileReader();
        reader.onload = function(evt) {
          that.save(reader.result);
          return null;
        };
        reader.onerror = function() {
          that.trigger('error');
          return null;
        };
        return null;
      },
      getData: function() {
        return this.__data;
      },
      render: function() {
        var data;
        data = {
          type: this.type
        };
        this.$el.html(template_modal.upload(data));
        return this;
      }
    });
  });

}).call(this);

(function() {
  define('kp_manage',['toolbar_modal', 'UI.modalplus', 'component/kp/kpDialogTpl', 'kp_upload', 'backbone', 'jquery', 'constant', 'JsonExporter', 'CloudResources', 'i18n!/nls/lang.js', 'UI.notification'], function(toolbar_modal, modalplus, template, upload, Backbone, $, constant, JsonExporter, CloudResources, lang) {
    var download;
    download = JsonExporter.download;
    return Backbone.View.extend({
      __needDownload: false,
      __upload: null,
      __import: '',
      __mode: 'normal',
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
      getModalOptions: function() {
        var region, regionName, that;
        that = this;
        region = Design.instance().get('region');
        regionName = constant.REGION_SHORT_LABEL[region];
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
        this.modal.on('close', function() {
          return this.remove();
        }, this);
        this.modal.on('slidedown', this.renderSlides, this);
        this.modal.on('action', this.doAction, this);
        return this.modal.on('refresh', this.refresh, this);
      },
      initialize: function(options) {
        var that;
        if (!options) {
          options = {};
        }
        this.model = options.model;
        this.resModel = options.resModel;
        this.collection = CloudResources(constant.RESTYPE.KP, Design.instance().get("region"));
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
            sprintf(lang.NOTIFY.XXX_IS_DELETED, success[0].attributes.keyName);
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
            keyName: keyName
          }).save().then(function(res) {
            that.needDownload(true);
            that.genDownload("" + res.attributes.keyName + ".pem", res.attributes.keyMaterial);
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
              keyName: c.data.name.toString()
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
            keyContent = (Base64.encode || window.btoa)(that.__upload.getData());
          } catch (_error) {
            this.modal.error('Key is not in valid OpenSSH public key format');
            that.switchAction('init');
            return;
          }
          return this.collection.create({
            keyName: keyName,
            keyData: keyContent
          }).save().then(function(res) {
            notification('info', sprintf(lang.NOTIFY.XXX_IS_IMPORTED(keyName)));
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

define('component/kp/kpTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.keyName), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n        Select Key Pair as $DefaultKeyPair\n    ";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    "
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultKey), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noKey), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_NO_KP", {hash:{},data:data}))
    + "\"></i>\n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRunTime), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.selection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRunTime), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <li data-id=\"@no\" class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noKey), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" tabindex=\"-1\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_NO_KP", {hash:{},data:data}))
    + "\n        <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_NO_KP", {hash:{},data:data}))
    + "\"></i>\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li data-id=\"@default\" class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultKey), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" tabindex=\"-1\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_DEFAULT_KP", {hash:{},data:data}))
    + "\n        <i class=\"icon-info tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_DEFAULT_KP", {hash:{},data:data}))
    + "'></i>\n    </li>\n    ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return " selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-fingerprint=\""
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </li>\n";
  return buffer;
  }

  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideDefaultNoKey), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('kp_dropdown',['Design', 'kp_manage', 'combo_dropdown', 'component/kp/kpTpl', 'backbone', 'jquery', 'constant', 'i18n!/nls/lang.js', 'CloudResources'], function(Design, kpManage, comboDropdown, template, Backbone, $, constant, lang, CloudResources) {
    var regions;
    regions = {};
    return Backbone.View.extend({
      showCredential: function() {
        return App.showSettings(App.showSettings.TAB.Credential);
      },
      filter: function(keyword) {
        var hitKeys;
        hitKeys = _.filter(this.getKey(), function(k) {
          return k.keyName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        if (keyword) {
          return this.renderKeys(hitKeys);
        } else {
          return this.renderKeys();
        }
      },
      getKey: function() {
        var json, that;
        that = this;
        json = this.collection.toJSON();
        if (this.resModel) {
          _.each(json, function(e) {
            if (e.keyName === that.resModel.getKeyName()) {
              return e.selected = true;
            }
          });
        }
        return json;
      },
      setKey: function(name, data) {
        var KpModel;
        if (this.__mode === 'runtime') {
          KpModel = Design.modelClassForType(constant.RESTYPE.KP);
          if (name === '@no') {
            return KpModel.setDefaultKP('', '');
          } else {
            return KpModel.setDefaultKP(name, data.fingerprint);
          }
        } else {
          if (name === '@default') {
            return this.resModel.setKey('', true);
          } else if (name === '@no') {
            return this.resModel.setKey('');
          } else {
            return this.resModel.setKey(name);
          }
        }
      },
      manageKp: function(event) {
        this.renderModal();
        return false;
      },
      initDropdown: function() {
        var options;
        options = {
          manageBtnValue: lang.PROP.INSTANCE_MANAGE_KP,
          filterPlaceHolder: lang.PROP.INSTANCE_FILTER_KP
        };
        this.dropdown = new comboDropdown(options);
        this.dropdown.on('open', this.show, this);
        this.dropdown.on('manage', this.manageKp, this);
        this.dropdown.on('change', this.setKey, this);
        return this.dropdown.on('filter', this.filter, this);
      },
      initialize: function(options) {
        this.resModel = options ? options.resModel : null;
        this.collection = CloudResources(constant.RESTYPE.KP, Design.instance().get("region"));
        this.listenTo(this.collection, 'update', this.renderKeys);
        this.listenTo(this.collection, 'change', this.renderKeys);
        if (!this.resModel) {
          this.__mode = 'runtime';
        }
        return this.initDropdown();
      },
      show: function() {
        var def;
        if (App.user.hasCredential()) {
          def = null;
          if (!regions[Design.instance().get("region")] && this.collection.isReady()) {
            regions[Design.instance().get("region")] = true;
            def = this.collection.fetchForce();
          } else {
            regions[Design.instance().get("region")] = true;
            def = this.collection.fetch();
          }
          return def.then((function(_this) {
            return function() {
              return _this.renderKeys();
            };
          })(this));
        } else {
          return this.renderNoCredential();
        }
      },
      render: function() {
        this.renderDropdown();
        this.el = this.dropdown.el;
        return this;
      },
      renderNoCredential: function() {
        return this.dropdown.render('nocredential').toggleControls(false);
      },
      syncErrorHandler: function(err) {
        return console.error(err);
      },
      renderKeys: function(data) {
        if (data && arguments.length === 1) {
          data = {
            keys: data,
            hideDefaultNoKey: true
          };
        } else {
          data = {
            keys: this.getKey()
          };
        }
        if (this.resModel) {
          if (this.resModel.isNoKey()) {
            data.noKey = true;
          }
          if (this.resModel.isDefaultKey()) {
            data.defaultKey = true;
          }
        }
        data.isRunTime = this.__mode === 'runtime';
        this.dropdown.setContent(template.keys(data));
        this.dropdown.toggleControls(true);
        return this;
      },
      renderDropdown: function() {
        var selection;
        this.data = {
          keyName: this.resModel ? this.resModel.getKeyName() : ""
        };
        if (this.data.keyName === '$DefaultKeyPair') {
          this.data.defaultKey = true;
        } else if (this.data.keyName === 'No Key Pair') {
          this.data.noKey = true;
        }
        this.data.isRunTime = this.__mode === 'runtime';
        selection = template.selection(this.data);
        return this.dropdown.setSelection(selection);
      },
      renderModal: function() {
        var that;
        that = this;
        return new kpManage({
          model: that.data
        });
      },
      remove: function() {
        this.dropdown.remove();
        return Backbone.View.prototype.remove.apply(this, arguments);
      }
    }, {
      hasResourceWithDefaultKp: function() {
        var has;
        has = false;
        Design.instance().eachComponent(function(comp) {
          var _ref;
          if ((_ref = comp.type) === constant.RESTYPE.INSTANCE || _ref === constant.RESTYPE.LC) {
            if (comp.isDefaultKey() && !comp.get('appId')) {
              has = true;
              return false;
            }
          }
        });
        return has;
      }
    });
  });

}).call(this);

define('component/sns/snsTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NONE", {hash:{},data:data}))
    + "</span>";
  return buffer;
  };
TEMPLATE.dropdown_no_selection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        <p><span class=\"icon-tag-sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.subCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " sub</span> "
    + escapeExpression(((stack1 = (depth0 && depth0.DisplayName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.dropdown_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-topic-arn=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subCount), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><b>"
    + escapeExpression(((stack1 = (depth0 && depth0.subCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBSCRIPTIONS", {hash:{},data:data}))
    + "</td>\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "class=\"show-detail\"";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.modal_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-display-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.DisplayName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                  ";
  return buffer;
  }

  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"before-create\">\n        <div>\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SELECT_TOPIC", {hash:{},data:data}))
    + "</label>\n            <div class=\"selectbox dd-topic-name\">\n                <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NEW_TOPIC", {hash:{},data:data}))
    + "</div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                  <li class=\"item selected new-topic\" data-id=\"@new\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NEW_TOPIC", {hash:{},data:data}))
    + "</li>\n                  ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </div>\n\n        </div>\n        <div class=\"create-sns-topic\">\n            <label for=\"create-topic-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.TOPIC_NAME", {hash:{},data:data}))
    + "</label>\n            <input class=\"input\" type=\"text\" id=\"create-topic-name\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z0-9,_-]*$\" data-required=\"true\" maxlength=\"255\" placeholder=\"Required. Up to 256 characters\" data-event-trigger=\"false\">\n        </div>\n        <div>\n            <label for=\"create-display-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DISPLAY_NAME", {hash:{},data:data}))
    + "</label>\n            <input class=\"input\" type=\"text\" id=\"create-display-name\" maxlength=\"255\" placeholder=\"Required for SMS subscriptions (up to 10 characters)\" data-event-trigger=\"false\">\n        </div>\n        <div>\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIP_PROTOCOL", {hash:{},data:data}))
    + "</label>\n            <div class=\"selectbox dd-protocol\">\n                <div class=\"selection\">email</div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                    <li class=\"item\" data-id=\"https\">HTTPS</li>\n                    <li class=\"item\" data-id=\"http\">HTTP</li>\n                    <li class=\"item selected\" data-id=\"email\">Email</li>\n                    <li class=\"item\" data-id=\"email-json\">Email-JSON</li>\n                    <li class=\"item\" data-id=\"sms\">SMS</li>\n                    <li class=\"item\" data-id=\"arn\">Application</li>\n                    <li class=\"item\" data-id=\"sqs\">Amazon SQS</li>\n                </ul>\n            </div>\n        </div>\n        <div>\n            <label for=\"create-endpoint\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENDPOINT", {hash:{},data:data}))
    + "</label>\n            <input type=\"text\" class=\"input\" id=\"create-endpoint\" max-length=\"255\" data-required=\"true\" placeholder=\"example@mail.com\" data-event-trigger=\"false\">\n        </div>\n    </div>\n    <div class=\"init action\">\n        <button class=\"btn btn-blue do-action\" data-action=\"create\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CREATING_3PERIOD", {hash:{},data:data}))
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
  
  var buffer = "", stack1;
  buffer += "SNS Topic "
    + escapeExpression(((stack1 = (depth0 && depth0.selecteKeyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "selected "
    + escapeExpression(((stack1 = (depth0 && depth0.selectedCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " SNS Topics";
  return buffer;
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">Confirm to delete ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selecteKeyName), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " and all associated subscriptions?</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DELETING_3PERIOD", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Endpoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.SubscriptionArn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRemovable), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </td>\n        </tr>\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <a class=\"icon-delete remove\"></a>\n                    <div class=\"do-remove-panel\">\n                        <button class=\"btn btn-blue btn-small do-remove\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.SubscriptionArn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n                        <button class=\"btn btn-link btn-small cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n                    </div>\n                ";
  return buffer;
  }

  buffer += "<table class=\"table sns-detail\">\n    <thead>\n        <tr>\n            <th style=\"width: 48px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIP_PROTOCOL", {hash:{},data:data}))
    + "</th>\n            <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENDPOINT", {hash:{},data:data}))
    + "</th>\n            <th style=\"wdith: 30%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBSCRIPTION_ARN", {hash:{},data:data}))
    + "</th>\n            <th style=\"width: 103px;\"></th>\n        </tr>\n    </thead>\n    <tbody>\n        ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.detail=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"combo-dd-no-data\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NO_SNS_TOPIC_IN_XXX", (depth0 && depth0.regionName), {hash:{},data:data}))
    + "</p>\n\n    <a class=\"create-one\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CREATE_SNS_TOPIC", {hash:{},data:data}))
    + "</a>\n</div>";
  return buffer;
  };
TEMPLATE.nosns=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('sns_manage',['constant', 'CloudResources', 'toolbar_modal', './component/sns/snsTpl', 'i18n!/nls/lang.js'], function(constant, CloudResources, toolbar_modal, template, lang) {
    return Backbone.View.extend({
      tagName: 'section',
      initCol: function() {
        var region;
        region = Design.instance().region();
        this.subCol = CloudResources(constant.RESTYPE.SUBSCRIPTION, region);
        this.topicCol = CloudResources(constant.RESTYPE.TOPIC, region);
        this.topicCol.on('update', this.processCol, this);
        return this.subCol.on('update', this.processSubUpdate, this);
      },
      processSubUpdate: function() {
        if (!this.M$('.tr-detail').length) {
          return this.processCol();
        }
      },
      processSubCreate: function(newSub) {
        var that, topicArn;
        topicArn = newSub.get('TopicArn');
        that = this;
        return this.M$('.detailed').each(function() {
          if ($(this).data('topicArn') === topicArn) {
            that.detail(null, $(this).data(), $(this));
            return false;
          }
        });
      },
      quickCreate: function() {
        return this.modal.triggerSlide('create');
      },
      getModalOptions: function() {
        var region, regionName, that;
        that = this;
        region = Design.instance().get('region');
        regionName = constant.REGION_SHORT_LABEL[region];
        return {
          title: "Manage SNS in " + regionName,
          classList: 'sns-manage',
          context: that,
          buttons: [
            {
              icon: 'new-stack',
              type: 'create',
              name: 'Create Subscription'
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
              width: "25%",
              name: 'Topic'
            }, {
              sortable: true,
              name: 'Topic ARN'
            }, {
              sortable: false,
              width: "20%",
              name: 'Subscription'
            }
          ]
        };
      },
      initModal: function() {
        new toolbar_modal(this.getModalOptions());
        this.modal.on('close', function() {
          return this.remove();
        }, this);
        this.modal.on('slidedown', this.renderSlides, this);
        this.modal.on('action', this.doAction, this);
        this.modal.on('refresh', this.refresh, this);
        return this.modal.on('detail', this.detail, this);
      },
      detail: function(event, data, $tr) {
        var $trDetail, subModels;
        subModels = this.getSubs(data.topicArn);
        data = _.map(subModels, function(m) {
          var attrs;
          attrs = m.toJSON();
          attrs.isRemovable = m.isRemovable();
          return attrs;
        });
        $trDetail = this.modal.setDetail($tr, template.detail(data));
        return this.processDetail($trDetail, $tr);
      },
      processDetail: function($trDetail, $tr) {
        var that, updateCount;
        that = this;
        updateCount = function() {
          var subCount;
          subCount = $trDetail.find('.sns-detail tbody tr').length;
          $tr.find('.show-detail b').text(subCount);
          if (subCount === 0) {
            return $tr.find('.show-detail').click();
          }
        };
        $trDetail.on('click', '.remove', function() {
          $(this).hide();
          return $trDetail.find('.do-remove-panel').show();
        }).on('click', '.cancel', function() {
          $(this).closest('.do-remove-panel').hide();
          return $trDetail.find('.remove').show();
        }).on('click', '.do-remove', function() {
          var $removeBtn;
          $removeBtn = $(this);
          return that.removeSub($removeBtn.data('id')).then(function() {
            $removeBtn.closest('tr').remove();
            return updateCount();
          });
        });
        return updateCount();
      },
      removeSub: function(subId) {
        var m;
        m = this.subCol.findWhere({
          SubscriptionArn: subId
        });
        return m != null ? m.destroy().then(function(deletedModel) {
          notification('info', lang.NOTIFY.REMOVE_SUBSCRIPTION_SUCCEED);
          return deletedModel;
        }).fail(function(err) {
          notification('error', err.awsResult);
          throw err;
        }) : void 0;
      },
      fetch: function() {
        if (App.user.hasCredential()) {
          this.topicCol.fetch();
          return this.subCol.fetch();
        }
      },
      initialize: function() {
        this.initCol();
        this.initModal();
        this.fetch();
        return window.M$ = this.M$;
      },
      doAction: function(action, checked) {
        return this[action] && this[action](this.validate(action), checked);
      },
      validate: function(action) {
        switch (action) {
          case 'create':
            return !this.M$('#create-topic-name').parsley('validateForm');
        }
      },
      genDeleteFinish: function(times) {
        var error, finHandler, success, that;
        success = [];
        error = [];
        that = this;
        finHandler = _.after(times, function() {
          that.modal.cancel();
          if (success.length === 1) {
            notification('info', sprintf(lang.NOTIFY.XXX_IS_DELETED, success[0].get('Name')));
          } else if (success.length > 1) {
            notification('info', sprintf(lang.NOTIFY.SELECTED_XXX_SNS_TOPIC_ARE_DELETED, success.length));
          }
          if (!error.length) {
            that.modal.unCheckSelectAll();
          }
          return _.each(error, function(s) {
            return console.log(s);
          });
        });
        return function(res) {
          if (res instanceof Backbone.Model) {
            success.push(res);
          } else {
            error.push(res);
          }
          return finHandler();
        };
      },
      errorHandler: function(awsError) {
        return this.modal.error(awsError.awsResult);
      },
      create: function(invalid) {
        var createSub, displayName, endpoint, protocol, that, topicId, topicModel, topicName;
        if (invalid) {
          return false;
        }
        that = this;
        this.switchAction('processing');
        topicId = this.M$('.dd-topic-name .selected').data('id');
        protocol = this.M$('.dd-protocol .selected ').data('id');
        topicName = this.M$('#create-topic-name').val();
        displayName = this.M$('#create-display-name').val();
        endpoint = this.M$('#create-endpoint').val();
        createSub = function(newTopic) {
          return that.subCol.create({
            TopicArn: newTopic && newTopic.id || topicId,
            Endpoint: endpoint,
            Protocol: protocol
          }).save().then(function(newSub) {
            that.processSubCreate(newSub);
            notification('info', lang.NOTIFY.CREATE_SUBSCRIPTION_SUCCEED);
            return that.modal.cancel();
          }).fail(function(awsError) {
            return that.errorHandler(awsError);
          });
        };
        if (topicId === '@new') {
          return this.topicCol.create({
            Name: topicName,
            DisplayName: displayName
          }).save().then(createSub).fail(function(awsError) {
            return that.errorHandler(awsError);
          });
        } else {
          topicModel = this.topicCol.get(topicId);
          if (displayName === topicModel.get('DisplayName')) {
            return createSub();
          } else {
            return topicModel.update(displayName).then(createSub);
          }
        }
      },
      "delete": function(invalid, checked) {
        var count, onDeleteFinish, that;
        count = checked.length;
        that = this;
        onDeleteFinish = this.genDeleteFinish(count);
        this.switchAction('processing');
        return _.each(checked, function(c) {
          var m;
          m = that.topicCol.get(c.data.id);
          return m != null ? m.destroy().then(onDeleteFinish, onDeleteFinish) : void 0;
        });
      },
      refresh: function() {
        this.subCol.fetchForce();
        return this.topicCol.fetchForce();
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
      render: function() {
        this.modal.render();
        if (App.user.hasCredential()) {
          this.processCol();
        } else {
          this.modal.render('nocredential');
        }
        return this;
      },
      processCol: function(noRender) {
        var data, that;
        that = this;
        if (this.topicCol.isReady() && this.subCol.isReady()) {
          data = this.topicCol.map(function(tModel) {
            var sub, tData;
            tData = tModel.toJSON();
            sub = that.subCol.where({
              TopicArn: tData.id
            });
            tData.sub = sub.map(function(sModel) {
              return sModel.toJSON();
            });
            tData.subCount = tData.sub.length;
            return tData;
          });
          if (!noRender) {
            this.renderList(data);
          }
        }
        return data;
      },
      getSubs: function(topicArn) {
        return this.subCol.where({
          TopicArn: topicArn
        });
      },
      renderList: function(data) {
        return this.modal.setContent(template.modal_list(data));
      },
      renderNoCredential: function() {
        return this.modal.render('nocredential').toggleControls(false);
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
            var $allTextBox, processCreateBtn, updateEndpoint, validateRequired;
            modal.setSlide(tpl(this.processCol(true)));
            updateEndpoint = function(protocol) {
              var endPoint, errorMsg, placeholder, selectedProto, type;
              selectedProto = that.M$('.dd-protocol .selected').data('id');
              switch (selectedProto) {
                case "sqs":
                  placeholder = lang.PROP.STACK_AMAZON_ARN;
                  type = lang.PROP.STACK_SQS;
                  errorMsg = lang.PARSLEY.PLEASE_PROVIDE_A_VALID_AMAZON_SQS_ARN;
                  break;
                case "arn":
                  placeholder = lang.PROP.STACK_AMAZON_ARN;
                  type = lang.PROP.STACK_ARN;
                  errorMsg = lang.PARSLEY.PLEASE_PROVIDE_A_VALID_APPLICATION_ARN;
                  break;
                case "email":
                  placeholder = lang.PROP.STACK_EXAMPLE_EMAIL;
                  type = lang.PROP.STACK_EMAIL;
                  errorMsg = lang.IDE.HEAD_MSG_ERR_UPDATE_EMAIL3;
                  break;
                case "email-json":
                  placeholder = lang.PROP.STACK_EXAMPLE_EMAIL;
                  type = lang.PROP.STACK_EMAIL;
                  errorMsg = lang.IDE.HEAD_MSG_ERR_UPDATE_EMAIL3;
                  break;
                case "sms":
                  placeholder = lang.PROP.STACK_E_G_1_206_555_6423;
                  type = lang.PROP.STACK_USPHONE;
                  errorMsg = lang.PARSLEY.PLEASE_PROVIDE_A_VALID_PHONE_NUMBER;
                  break;
                case "http":
                  placeholder = lang.PROP.STACK_HTTP_WWW_EXAMPLE_COM;
                  type = lang.PROP.STACK_HTTP;
                  errorMsg = lang.PARSLEY.PLEASE_PROVIDE_A_VALID_URL;
                  break;
                case "https":
                  placeholder = lang.PROP.STACK_HTTPS_WWW_EXAMPLE_COM;
                  type = lang.PROP.STACK_HTTPS;
                  errorMsg = lang.PARSLEY.PLEASE_PROVIDE_A_VALID_URL;
              }
              endPoint = that.M$('#create-endpoint');
              endPoint.attr("placeholder", placeholder);
              endPoint.parsley('custom', function(value) {
                if (type && value && (!MC.validate(type, value))) {
                  return errorMsg;
                }
              });
              return null;
            };
            updateEndpoint('email');
            that.M$('#create-display-name').parsley('custom', function(value) {
              var selectedProto;
              selectedProto = that.M$('.dd-protocol .selected').data('id');
              if (selectedProto === 'sms' && !value) {
                return 'Display Name is required if subscription uses SMS protocol.';
              }
              return null;
            });
            that.M$('#create-topic-name').parsley('custom', function(value) {
              if (that.topicCol.where({
                Name: value
              }).length) {
                return 'Topic name is already taken.';
              }
              return null;
            });
            $allTextBox = that.M$('.slide-create input[type=text]');
            validateRequired = function() {
              var pass;
              pass = true;
              $allTextBox.each(function() {
                var selectedProto;
                if ($(this).is(':hidden')) {
                  return;
                }
                if (this.id === 'create-display-name') {
                  selectedProto = that.M$('.dd-protocol .selected').data('id');
                  if (selectedProto === 'sms') {
                    if (!this.value.trim().length) {
                      return pass = false;
                    }
                  }
                } else {
                  if (!this.value.trim().length) {
                    return pass = false;
                  }
                }
              });
              return pass;
            };
            processCreateBtn = function(event, showError) {
              var $target;
              $target = event && $(event.currentTarget) || $('#create-topic-name');
              if (validateRequired()) {
                return that.M$('.slide-create .do-action').prop('disabled', false);
              } else {
                return that.M$('.slide-create .do-action').prop('disabled', true);
              }
            };
            $allTextBox.on('keyup', processCreateBtn);
            that.M$('.dd-protocol').off('OPTION_CHANGE').on('OPTION_CHANGE', function(id) {
              updateEndpoint(id);
              return processCreateBtn(null, true);
            });
            return that.M$('.dd-topic-name').off('OPTION_CHANGE').on('OPTION_CHANGE', function(event, id, data) {
              if (id === '@new') {
                return that.M$('.create-sns-topic').show();
              } else {
                that.M$('#create-display-name').val(data.displayName);
                return that.M$('.create-sns-topic').hide();
              }
            });
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
      show: function() {
        if (App.user.hasCredential()) {
          this.topicCol.fetch();
          this.subCol.fetch();
          return this.processCol();
        } else {
          return this.renderNoCredential();
        }
      },
      filter: function(keyword) {
        return this.processCol(true, keyword);
      }
    });
  });

}).call(this);

(function() {
  define('sns_dropdown',['constant', 'CloudResources', 'sns_manage', 'combo_dropdown', './component/sns/snsTpl', 'i18n!/nls/lang.js'], function(constant, CloudResources, snsManage, comboDropdown, template, lang) {
    var subCol, topicCol;
    subCol = CloudResources(constant.RESTYPE.SUBSCRIPTION, 'us-east-1');
    topicCol = CloudResources(constant.RESTYPE.TOPIC, 'us-east-1');
    return Backbone.View.extend({
      tagName: 'section',
      initCol: function() {
        var region;
        region = Design.instance().region();
        this.subCol = CloudResources(constant.RESTYPE.SUBSCRIPTION, region);
        this.topicCol = CloudResources(constant.RESTYPE.TOPIC, region);
        this.listenTo(this.topicCol, 'update', this.processCol);
        this.listenTo(this.topicCol, 'change', this.processCol);
        return this.listenTo(this.subCol, 'update', this.processCol);
      },
      initDropdown: function() {
        var options;
        options = {
          manageBtnValue: lang.PROP.INSTANCE_MANAGE_SNS,
          filterPlaceHolder: lang.PROP.INSTANCE_FILTER_SNS,
          classList: 'sns-dropdown'
        };
        this.dropdown = new comboDropdown(options);
        this.dropdown.on('open', this.show, this);
        this.dropdown.on('manage', this.manage, this);
        this.dropdown.on('change', this.set, this);
        this.dropdown.on('filter', this.filter, this);
        return this.dropdown.on('quick_create', this.quickCreate, this);
      },
      initialize: function(options) {
        if (options && options.selection) {
          this.selection = options.selection;
        }
        this.initCol();
        this.initDropdown();
        if (App.user.hasCredential()) {
          this.topicCol.fetch();
          return this.subCol.fetch();
        }
      },
      render: function(needInit) {
        var selection;
        selection = this.selection;
        if (needInit) {
          if (this.topicCol.first()) {
            this.selection = selection = this.topicCol.first().get('Name');
            this.processCol();
            this.trigger('change', this.topicCol.first().id, selection);
          } else {
            selection = template.dropdown_no_selection();
          }
        } else {
          if (!selection) {
            selection = template.dropdown_no_selection();
          }
        }
        this.dropdown.setSelection(selection);
        this.el = this.dropdown.el;
        return this;
      },
      quickCreate: function() {
        return new snsManage().render().quickCreate();
      },
      processCol: function(filter, keyword) {
        var data, len, selection, that;
        that = this;
        if (this.topicCol.isReady() && this.subCol.isReady()) {
          data = this.topicCol.map(function(tModel) {
            var sub, tData;
            tData = tModel.toJSON();
            sub = that.subCol.where({
              TopicArn: tData.id
            });
            tData.sub = sub.map(function(sModel) {
              return sModel.toJSON();
            });
            tData.subCount = tData.sub.length;
            return tData;
          });
          if (filter === true) {
            len = keyword.length;
            data = _.filter(data, function(d) {
              return d.Name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            });
          }
          selection = this.selection;
          _.each(data, function(d) {
            if (d.Name && d.Name === selection) {
              d.selected = true;
              return null;
            }
          });
          this.renderDropdownList(data, filter);
        }
        return false;
      },
      renderDropdownList: function(data, filter) {
        var region, regionName;
        if (_.isEmpty(data) && !filter) {
          region = Design.instance().region();
          regionName = constant.REGION_SHORT_LABEL[region];
          return this.dropdown.setContent(template.nosns({
            regionName: regionName
          })).toggleControls(true, 'manage').toggleControls(false, 'filter');
        } else {
          return this.dropdown.setContent(template.dropdown_list(data)).toggleControls(true);
        }
      },
      renderNoCredential: function() {
        return this.dropdown.render('nocredential').toggleControls(false);
      },
      show: function() {
        if (App.user.hasCredential()) {
          this.topicCol.fetch();
          this.subCol.fetch();
          if (!this.dropdown.$('.item').length) {
            return this.processCol();
          }
        } else {
          return this.renderNoCredential();
        }
      },
      manage: function() {
        return new snsManage().render();
      },
      set: function(id, data) {
        return this.trigger('change', id, data.name);
      },
      filter: function(keyword) {
        return this.processCol(true, keyword);
      },
      remove: function() {
        this.dropdown.remove();
        return Backbone.View.prototype.remove.apply(this, arguments);
      }
    });
  });

}).call(this);

define('component/dhcp/dhcp_template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n    "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_AUTO_DHCP", {hash:{},data:data}))
    + "<i class=\"icon-info tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_AUTO_DHCP", {hash:{},data:data}))
    + "'></i>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isDefault), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DEFAULT_DHCP", {hash:{},data:data}))
    + " <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_DEFAULT_DHCP", {hash:{},data:data}))
    + "\"></i>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAuto), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.selection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td><div class=\"manager-content-main\"></div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0['domain-name'])),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0['domain-name-servers'])),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0['ntp-servers'])),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0['netbios-name-servers'])),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['netbios-node-type']), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n    <td class=\"show-detail icon-toolbar-cloudformation\"></td>\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "domain-name = ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['domain-name']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ";";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "";
  buffer += escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "domain-name-servers = ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['domain-name-servers']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ";";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "ntp-servers = ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['ntp-servers']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ";";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "netbios-name-servers = ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['netbios-name-servers']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ";";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "netbios-node-type = "
    + escapeExpression(((stack1 = (depth0 && depth0['netbios-node-type'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
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
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRunTime), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<li data-id=\"@default\" class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['default']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" tabindex=\"-1\">\n    "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DEFAULT_DHCP", {hash:{},data:data}))
    + "\n    <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_DEFAULT_DHCP", {hash:{},data:data}))
    + "\"></i>\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li data-id=\"@auto\" class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.auto), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" tabindex=\"-1\">\n    "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_AUTO_DHCP", {hash:{},data:data}))
    + "\n    <i class=\"icon-info tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_AUTO_DHCP", {hash:{},data:data}))
    + "'></i>\n</li>\n";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return " selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n";
  return buffer;
  }

  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideDefaultNoKey), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


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
  buffer += "selected "
    + escapeExpression(((stack1 = (depth0 && depth0.selectedCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " DHCP Options set";
  return buffer;
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">Confirm to delete ";
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
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program3(depth0,data) {
  
  
  return "3";
  }

function program5(depth0,data) {
  
  
  return "4";
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n                        <div class=\"multi-ipt-row\">\n                            <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                            <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_DNS", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\" maxlength=\"255\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_EG_172_16_16_16", {hash:{},data:data}))
    + "\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                        </div>\n                        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n                        <div class=\"multi-ipt-row\">\n                            <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                            <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_DNS", {hash:{},data:data}))
    + "\"  placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_EG_172_16_16_16", {hash:{},data:data}))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                        </div>\n                        ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                        <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_NTP", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                    </div>\n                    ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                        <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_NTP", {hash:{},data:data}))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                    </div>\n                    ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                        <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_NETBIOS", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                    </div>\n                    ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                        <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_NETBIOS", {hash:{},data:data}))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                    </div>\n                    ";
  return buffer;
  }

function program19(depth0,data) {
  
  var stack1;
  stack1 = helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE_NOT_SPECIFIED", {hash:{},data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                        ";
  return buffer;
  }
function program22(depth0,data) {
  
  
  return " selected";
  }

  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n            <div class=\"control-group clearfix\">\n                <label for=\"property-dhcp-domain\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME", {hash:{},data:data}))
    + "</label>\n                <div id=\"property-dhcp-domain\" class=\"multi-input\" data-max-row=\"100\">\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                        <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_THE_DOMAIN_NAME", {hash:{},data:data}))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"domain\" data-ignore=\"true\"></span>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME_SERVER", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div class=\"modal-right\" style=\"margin: 10px 0\">\n                        <div class=\"checkbox\">\n                            <input id=\"property-amazon-dns\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.amazonDNS), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "type=\"checkbox\">\n                            <label style=\"width: 14px\" for=\"property-amazon-dns\"></label>\n                        </div>\n                        <label for=\"property-amazon-dns\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_AMZN_PROVIDED_DNS", {hash:{},data:data}))
    + "</label>\n                    </div>\n                    <div id=\"property-domain-server\" class=\"multi-input\" data-max-row=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.amazonDNS), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                        ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainServers), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix\">\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NTP_SERVER", {hash:{},data:data}))
    + "</label>\n                <div id=\"property-ntp-server\" class=\"multi-input\" data-max-row=\"4\">\n                    ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.ntpServers), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix\">\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NAME_SERVER", {hash:{},data:data}))
    + "</label>\n                <div id=\"property-netbios-server\" class=\"multi-input\" data-max-row=\"4\">\n                    ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosServers), {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix\">\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE", {hash:{},data:data}))
    + "</label>\n                <div class=\"selectbox selectbox-mega\" id=\"property-netbios-type\">\n                    <div class=\"selection tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_SELECT_NETBIOS_NODE", {hash:{},data:data}))
    + "\">";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosType), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n                    <ul class=\"dropdown\" tabindex=\"-1\">\n                        ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosTypes), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                </div>\n            </div>\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"create\">"
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
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "<br>";
  return buffer;
  }

  buffer += "<div class=\"detail-info\">\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME", {hash:{},data:data}))
    + "</label>\n            <div>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['domain-name']), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME_SERVER", {hash:{},data:data}))
    + "</label>\n            <div>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['domain-name-servers']), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        </section>\n    </div>\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NTP_SERVER", {hash:{},data:data}))
    + "</label>\n            <div>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['ntp-servers']), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        </section>\n        <section class=\"property-control-group\">\n\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0['netbios-node-type'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.detail_info=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('dhcp',["CloudResources", 'constant', 'combo_dropdown', 'UI.modalplus', 'toolbar_modal', 'i18n!/nls/lang.js', 'component/dhcp/dhcp_template'], function(CloudResources, constant, comboDropdown, modalPlus, toolbarModal, lang, template) {
    var deleteCount, deleteErrorCount, dhcpView, fetched, fetching, mapFilterInput, regionsMark, updateAmazonCB;
    fetched = false;
    fetching = false;
    regionsMark = {};
    updateAmazonCB = function() {
      var rowLength;
      rowLength = $("#property-domain-server").children().length;
      if (rowLength > 3) {
        return $('#property-amazon-dns').attr("disabled", true);
      } else {
        return $('#property-amazon-dns').removeAttr("disabled");
      }
    };
    mapFilterInput = function(selector) {
      var $inputs, ipt, result, _i, _len;
      $inputs = $(selector);
      result = [];
      for (_i = 0, _len = $inputs.length; _i < _len; _i++) {
        ipt = $inputs[_i];
        if (ipt.value) {
          result.push(ipt.value);
        }
      }
      return result;
    };
    deleteCount = 0;
    deleteErrorCount = 0;
    dhcpView = Backbone.View.extend({
      constructor: function(options) {
        var option, selection;
        this.resModel = options != null ? options.resModel : void 0;
        this.collection = CloudResources(constant.RESTYPE.DHCP, Design.instance().region());
        this.listenTo(this.collection, 'change', this.render);
        this.listenTo(this.collection, 'update', this.render);
        this.listenTo(this.collection, 'change', function() {
          return this.renderManager();
        });
        this.listenTo(this.collection, 'update', function() {
          return this.renderManager();
        });
        option = {
          manageBtnValue: lang.PROP.VPC_MANAGE_DHCP,
          filterPlaceHolder: lang.PROP.VPC_FILTER_DHCP
        };
        this.dropdown = new comboDropdown(option);
        selection = template.selection({
          isDefault: false,
          isAuto: true
        });
        this.dropdown.setSelection(selection);
        this.dropdown.on('open', this.show, this);
        this.dropdown.on('manage', this.manageDhcp, this);
        this.dropdown.on('change', this.setDHCP, this);
        this.dropdown.on('filter', this.filter, this);
        return this;
      },
      remove: function() {
        this.isRemoved = true;
        return Backbone.View.prototype.remove.call(this);
      },
      render: function() {
        if (!fetched) {
          this.renderLoading();
          this.collection.fetch().then((function(_this) {
            return function() {
              return _this.render();
            };
          })(this));
          fetched = true;
          return false;
        }
        return this.renderDropdown();
      },
      show: function() {
        if (App.user.hasCredential()) {
          return this.render();
        } else {
          return this.renderNoCredential();
        }
      },
      renderNoCredential: function() {
        return this.dropdown.render('nocredential').toggleControls(false);
      },
      renderLoading: function() {
        return this.dropdown.render('loading').toggleControls(false);
      },
      renderDropdown: function(keys) {
        var content, data, datas, selected, _ref;
        selected = (_ref = this.resModel) != null ? _ref.toJSON().dhcp.appId : void 0;
        data = this.collection.toJSON();
        datas = {
          isRuntime: false,
          keys: data
        };
        if (selected) {
          _.each(data, function(key) {
            if (key.id === selected) {
              key.selected = true;
            }
          });
        } else {
          datas.auto = true;
        }
        if (selected === "") {
          datas.auto = true;
        } else if (selected && selected === 'default') {
          datas["default"] = true;
        }
        if (keys) {
          datas.keys = keys;
          datas.hideDefaultNoKey = true;
        }
        if (Design.instance() && (Design.instance().modeIsApp() || Design.instance().modeIsAppEdit())) {
          datas.isRunTime = true;
        }
        content = template.keys(datas);
        this.dropdown.toggleControls(true);
        return this.dropdown.setContent(content);
      },
      filter: function(keyword) {
        var hitKeys;
        hitKeys = _.filter(this.collection.toJSON(), function(data) {
          return data.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        if (keyword) {
          return this.renderDropdown(hitKeys);
        } else {
          return this.renderDropdown();
        }
      },
      setDHCP: function(e) {
        var targetDhcp, targetModel;
        if (e === '@auto') {
          targetDhcp = {
            id: ''
          };
        } else if (e === '@default') {
          targetDhcp = {
            id: "default"
          };
        } else {
          targetModel = this.collection.findWhere({
            id: e
          });
          targetDhcp = targetModel.toJSON();
        }
        this.resModel.toJSON().dhcp.dhcpOptionsId = targetDhcp.id;
        return this.trigger('change', targetDhcp);
      },
      setSelection: function(e) {
        var selection;
        selection = template.selection(e);
        return this.dropdown.setSelection(selection);
      },
      manageDhcp: function() {
        this.manager = new toolbarModal(this.getModalOptions());
        this.manager.on('refresh', this.refreshManager, this);
        this.manager.on('slidedown', this.renderSlides, this);
        this.manager.on('action', this.doAction, this);
        this.manager.on('detail', this.detail, this);
        this.manager.on('close', (function(_this) {
          return function() {
            return _this.manager.remove();
          };
        })(this));
        this.manager.render();
        this.renderManager();
        return this.trigger('manage');
      },
      refreshManager: function() {
        fetched = false;
        return this.renderManager();
      },
      renderManager: function() {
        var currentRegion, initManager, _ref, _ref1;
        if (!App.user.hasCredential()) {
          if ((_ref = this.manager) != null) {
            _ref.render('nocredential');
          }
          return false;
        }
        initManager = this.initManager.bind(this);
        currentRegion = (_ref1 = Design.instance()) != null ? _ref1.get('region') : void 0;
        if (currentRegion && ((!fetched && !fetching) || (!regionsMark[currentRegion]))) {
          fetching = true;
          regionsMark[currentRegion] = true;
          return this.collection.fetchForce().then(initManager, initManager);
        } else if (!fetching) {
          return initManager();
        }
      },
      initManager: function() {
        var content, _ref;
        fetching = false;
        fetched = true;
        content = template.content({
          items: this.collection.toJSON()
        });
        return (_ref = this.manager) != null ? _ref.setContent(content) : void 0;
      },
      renderSlides: function(which, checked) {
        var slides, tpl, _ref;
        tpl = template['slide_' + which];
        slides = this.getSlides();
        return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
      },
      detail: function(event, data, $tr) {
        var detailTpl, dhcpData, dhcpId, that;
        that = this;
        dhcpId = data.id;
        dhcpData = this.collection.get(dhcpId).toJSON();
        detailTpl = template['detail_info'];
        return this.manager.setDetail($tr, detailTpl(dhcpData));
      },
      getSlides: function() {
        return {
          "delete": function(tpl, checked) {
            var checkedAmount, data;
            checkedAmount = checked.length;
            if (!checkedAmount) {
              return;
            }
            data = {};
            if (checkedAmount === 1) {
              data.selectedId = checked[0].data.id;
            } else {
              data.selectedCount = checkedAmount;
            }
            return this.manager.setSlide(tpl(data));
          },
          'create': function(tpl) {
            var data, selectedType;
            data = {
              dhcp: {}
            };
            selectedType = 0;
            data.dhcp.netbiosTypes = [
              {
                id: "default",
                value: lang.PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE_NOT_SPECIFIED,
                selected: selectedType === 0
              }, {
                id: 1,
                value: 1,
                selected: selectedType === 1
              }, {
                id: 2,
                value: 2,
                selected: selectedType === 2
              }, {
                id: 4,
                value: 4,
                selected: selectedType === 4
              }, {
                id: 8,
                value: 8,
                selected: selectedType === 8
              }
            ];
            this.manager.setSlide(tpl(data));
            this.manager.$el.find("#property-amazon-dns").change((function(_this) {
              return function(e) {
                return _this.onChangeAmazonDns(e);
              };
            })(this));
            this.manager.$el.find('.multi-input').on('ADD_ROW', (function(_this) {
              return function(e) {
                return _this.processParsley(e);
              };
            })(this));
            this.manager.$el.find(".control-group .input").change((function(_this) {
              return function(e) {
                return _this.onChangeDhcpOptions(e);
              };
            })(this));
            this.manager.$el.find('.formart_toolbar_modal').on('OPTION_CHANGE REMOVE_ROW', (function(_this) {
              return function(e) {
                return _this.onChangeDhcpOptions(e);
              };
            })(this));
            this.manager.$el.find('#property-domain-server').on('ADD_ROW REMOVE_ROW', updateAmazonCB);
            return updateAmazonCB();
          }
        };
      },
      processParsley: function(event) {
        $(event.currentTarget).find('input').last().removeClass('parsley-validated').removeClass('parsley-error').next('.parsley-error-list').remove();
        return $(".parsley-error-list").remove();
      },
      doAction: function(action, checked) {
        return this[action] && this[action](this.validate(action), checked);
      },
      create: function(invalid, checked) {
        var afterCreated, data, domainNameServers, validate;
        if (!invalid) {
          domainNameServers = mapFilterInput("#property-domain-server .input");
          if ($("#property-amazon-dns").is(":checked")) {
            domainNameServers.push("AmazonProvidedDNS");
          }
          data = {
            "domain-name": mapFilterInput("#property-dhcp-domain .input"),
            "domain-name-servers": domainNameServers,
            "ntp-servers": mapFilterInput("#property-ntp-server .input"),
            "netbios-name-servers": mapFilterInput("#property-netbios-server .input"),
            "netbios-node-type": [parseInt($("#property-netbios-type .selection").html(), 10) || 0]
          };
          validate = function(value, key) {
            if (key === 'netbios-node-type') {
              return false;
            }
            if (value.length < 1) {
              return false;
            } else {
              return true;
            }
          };
          if (!_.some(data, validate)) {
            this.manager.error("Please provide at least one field.");
            return false;
          }
          if (data['netbios-node-type'][0] === 0) {
            data['netbios-node-type'] = [];
          }
          this.switchAction('processing');
          afterCreated = this.afterCreated.bind(this);
          return this.collection.create(data).save().then(afterCreated, afterCreated);
        }
      },
      "delete": function(invalid, checked) {
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
      afterDeleted: function(result) {
        deleteCount--;
        if (result.error) {
          deleteErrorCount++;
        }
        if (deleteCount === 0) {
          if (deleteErrorCount > 0) {
            notification('error', sprintf(lang.NOTIFY.FAILED_TO_DELETE_DHCP, deleteErrorCount, result.awsResult));
          } else {
            notification('info', lang.NOTIFY.DELETE_SUCCESSFULLY);
          }
          this.manager.unCheckSelectAll();
          deleteErrorCount = 0;
          return this.manager.cancel();
        }
      },
      afterCreated: function(result) {
        if (result.error) {
          this.manager.error("Create failed because of: " + (result.awsResult || result.msg));
          this.switchAction();
          return false;
        }
        notification('info', lang.NOTIFY.DHCP_CREATED_SUCCESSFULLY);
        return this.manager.cancel();
      },
      validate: function(action) {
        switch (action) {
          case 'create':
            return this.manager.$el.find(".parsley-error").size() > 0;
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
      onChangeAmazonDns: function() {
        var $inputbox, $rows, allowRows, useAmazonDns;
        useAmazonDns = $("#property-amazon-dns").is(":checked");
        allowRows = useAmazonDns ? 3 : 4;
        $inputbox = $("#property-domain-server").attr("data-max-row", allowRows);
        $rows = $inputbox.children();
        $inputbox.toggleClass("max", $rows.length >= allowRows);
        return null;
      },
      onChangeDhcpOptions: function(event) {
        if (event && !$(event.currentTarget).closest('[data-bind=true]').parsley('validate')) {

        }
      },
      getModalOptions: function() {
        var region, regionName, that;
        that = this;
        region = Design.instance().get('region');
        regionName = constant.REGION_SHORT_LABEL[region];
        return {
          title: "Manage DHCP Options in " + regionName,
          slideable: true,
          context: that,
          buttons: [
            {
              icon: 'new-stack',
              type: 'create',
              name: 'Create DHCP Options Set'
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
              width: "200px",
              name: 'Name'
            }, {
              sortable: false,
              width: "480px",
              name: 'Options'
            }, {
              sortable: false,
              width: "56px",
              name: "Details"
            }
          ]
        };
      }
    });
    return dhcpView;
  });

}).call(this);

define('component/snapshot/snapshot_template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

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
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(13, program13, data),fn:self.program(4, program4, data),data:data});
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
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tagSet), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"manager-content-sub\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " &nbsp;&nbsp;&nbsp;&nbsp;Size: "
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</div>\n    ";
  return buffer;
  }
function program5(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program7(depth0,data) {
  
  
  return "&lt;No Name&gt;";
  }

function program9(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program11(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program13(depth0,data) {
  
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
  buffer += "</div><span class=\"manager-content-sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
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
    + "</label>\n                <div>\n                    <div id=\"property-volume-choose\"></div>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-snapshot-desc-create\">"
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


return TEMPLATE; });
(function() {
  define('snapshotManager',['CloudResources', 'ApiRequest', 'constant', 'combo_dropdown', "UI.modalplus", 'toolbar_modal', "i18n!/nls/lang.js", 'component/snapshot/snapshot_template'], function(CloudResources, ApiRequest, constant, combo_dropdown, modalPlus, toolbar_modal, lang, template) {
    var deleteCount, deleteErrorCount, fetched, fetching, regionsMark, snapshotRes;
    fetched = false;
    deleteCount = 0;
    deleteErrorCount = 0;
    fetching = false;
    regionsMark = {};
    snapshotRes = Backbone.View.extend({
      constructor: function() {
        this.collection = CloudResources(constant.RESTYPE.SNAP, Design.instance().region());
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
      renderDropdown: function() {
        var option, selection;
        option = {
          filterPlaceHolder: lang.PROP.SNAPSHOT_FILTER_VOLUME
        };
        this.dropdown = new combo_dropdown(option);
        this.volumes = CloudResources(constant.RESTYPE.VOL, Design.instance().region());
        selection = lang.PROP.VOLUME_SNAPSHOT_SELECT;
        this.dropdown.setSelection(selection);
        this.dropdown.on('open', this.openDropdown, this);
        this.dropdown.on('filter', this.filterDropdown, this);
        this.dropdown.on('change', this.selectSnapshot, this);
        return this.dropdown;
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
            var content, currentRegion, data, dataSet;
            data = _this.volumes.toJSON();
            currentRegion = Design.instance().get('region');
            data = _.filter(data, function(volume) {
              return volume.category === currentRegion;
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
            _this.dropdown.toggleControls(false, 'manage');
            _this.dropdown.toggleControls(true, 'filter');
            return _this.dropdown.setContent(content);
          };
        })(this));
      },
      filterDropdown: function(keyword) {
        var hitKeys;
        hitKeys = _.filter(this.volumes.toJSON(), function(data) {
          return data.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        if (keyword) {
          return this.openDropdown(hitKeys);
        } else {
          return this.openDropdown();
        }
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
        _.each(data, function(e, f) {
          if (e.progress === 100) {
            data[f].completed = true;
          }
          if (e.startTime) {
            data[f].started = (new Date(e.startTime)).toString();
          }
          return null;
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
            this.manager.setSlide(tpl(data));
            this.dropdown = this.renderDropdown();
            return this.manager.$el.find('#property-volume-choose').html(this.dropdown.$el);
          },
          'duplicate': function(tpl, checked) {
            var data;
            data = {};
            data.originSnapshot = checked[0];
            data.region = Design.instance().get('region');
            if (!checked) {
              return;
            }
            this.manager.setSlide(tpl(data));
            this.regionsDropdown = this.renderRegionDropdown();
            this.regionsDropdown.on('change', (function(_this) {
              return function() {
                return _this.manager.$el.find('[data-action="duplicate"]').prop('disabled', false);
              };
            })(this));
            return this.manager.$el.find('#property-region-choose').html(this.regionsDropdown.$el);
          }
        };
      },
      doAction: function(action, checked) {
        return this["do_" + action] && this["do_" + action]('do_' + action, checked);
      },
      do_create: function(validate, checked) {
        var afterCreated, data, volume;
        volume = this.volumes.findWhere({
          'id': $('#property-volume-choose').find('.selectbox .selection .manager-content-main').data('id')
        });
        if (!volume) {
          return false;
        }
        data = {
          "name": $("#property-snapshot-name-create").val(),
          'volumeId': volume.id,
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
      getModalOptions: function() {
        var region, regionName, that;
        that = this;
        region = Design.instance().get('region');
        regionName = constant.REGION_SHORT_LABEL[region];
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
              icon: 'duplicate',
              type: 'duplicate',
              disabled: true,
              name: 'Duplicate'
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
    return snapshotRes;
  });

}).call(this);

define('component/sslcert/sslCertTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression;


  return escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  };
TEMPLATE.dropdown_selection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.dropdown_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\"sslcert-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"sslcert-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.UploadDate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td class=\"show-detail icon-toolbar-cloudformation\"></td>\n</tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.modal_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"modal-ssl-cert-create\">\n        <div class=\"modal-ssl-cert-item clearfix\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LBL_LISTENER_CERT_NAME", {hash:{},data:data}))
    + "</label>\n            <input placeholder=\"Required. Up to 128 characters\" class=\"input\" type=\"text\" data-required=\"true\" data-ignore=\"true\" id=\"ssl-cert-name-input\"/>\n        </div>\n        <div class=\"modal-ssl-cert-item clearfix\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LBL_LISTENER_PRIVATE_KEY", {hash:{},data:data}))
    + "</label>\n            <textarea placeholder=\"Required. PEM Encoded\" class=\"input ssl-cert-input\" data-required=\"true\" id=\"ssl-cert-privatekey-input\"></textarea>\n        </div>\n        <div class=\"modal-ssl-cert-item clearfix\">\n            <label class=\"left\"  >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LBL_LISTENER_PUBLIC_KEY", {hash:{},data:data}))
    + "</label>\n            <textarea placeholder=\"Required. PEM Encoded\" class=\"input ssl-cert-input\" data-required=\"true\" id=\"ssl-cert-publickey-input\"></textarea>\n        </div>\n        <div class=\"modal-ssl-cert-item clearfix\">\n            <label class=\"left\"  >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LBL_LISTENER_CERTIFICATE_CHAIN", {hash:{},data:data}))
    + "</label>\n            <textarea placeholder=\"Optional. PEM Encoded\" class=\"input ssl-cert-input\" id=\"ssl-cert-chain-input\"></textarea>\n        </div>\n    </div>\n    <div class=\"init action\">\n        <button class=\"btn btn-blue do-action\" data-action=\"create\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.UPLOAD", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.UPLOAD_3PERIOD", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "SSL Certificate "
    + escapeExpression(((stack1 = (depth0 && depth0.selecteKeyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "selected "
    + escapeExpression(((stack1 = (depth0 && depth0.selectedCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " SSL Certificates";
  return buffer;
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">Confirm to delete ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selecteKeyName), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ?</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DELETING_3PERIOD", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"slide-update\" data-bind=\"true\">\n    <div class=\"modal-ssl-cert-update\">\n        <div class=\"modal-ssl-cert-item clearfix\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LBL_LISTENER_CERT_NAME", {hash:{},data:data}))
    + "</label>\n            <input class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cert_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" data-required=\"true\" id=\"ssl-cert-name-update-input\"/>\n        </div>\n    </div>\n    <div class=\"init action\">\n        <button class=\"btn btn-blue do-action\" data-action=\"update\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.UPDATE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.UPDATING_3PERIOD", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_update=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"detail-info\">\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SERVER_CERTIFICATE_ID", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SERVER_CERTIFICATE_ARN", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Arn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n    </div>\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.EXPIRATION_DATE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Expiration)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PATH", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Path)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.detail_info=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"combo-dd-no-data\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NO_SSL_CERTIFICATE", {hash:{},data:data}))
    + "</p>\n    <a class=\"create-one\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CREATE_SSL_CERTIFICATE", {hash:{},data:data}))
    + "</a>\n</div>";
  return buffer;
  };
TEMPLATE.no_sslcert=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('sslcert_manage',['constant', 'CloudResources', 'toolbar_modal', './component/sslcert/sslCertTpl', 'i18n!/nls/lang.js', 'event'], function(constant, CloudResources, toolbar_modal, template, lang, ide_event) {
    return Backbone.View.extend({
      tagName: 'section',
      initCol: function() {
        this.sslCertCol = CloudResources(constant.RESTYPE.IAM);
        if (App.user.hasCredential()) {
          this.sslCertCol.fetch();
        }
        this.sslCertCol.on('update', this.processCol, this);
        return this.sslCertCol.on('change', this.processCol, this);
      },
      getModalOptions: function() {
        var region, regionName, that;
        that = this;
        region = Design.instance().get('region');
        regionName = constant.REGION_SHORT_LABEL[region];
        return {
          title: "Manage SSL Certificate",
          classList: 'sslcert-manage',
          context: that,
          buttons: [
            {
              icon: 'new-stack',
              type: 'create',
              name: 'Upload New SSL Certificate'
            }, {
              icon: 'edit',
              type: 'update',
              disabled: true,
              name: 'Update'
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
              width: "50%",
              name: 'Name'
            }, {
              sortable: true,
              rowType: 'datetime',
              width: "33%",
              name: 'Upload Date'
            }, {
              sortable: false,
              name: 'View Details'
            }
          ]
        };
      },
      initModal: function() {
        new toolbar_modal(this.getModalOptions());
        this.modal.on('close', function() {
          return this.remove();
        }, this);
        this.modal.on('slidedown', this.renderSlides, this);
        this.modal.on('action', this.doAction, this);
        this.modal.on('refresh', this.refresh, this);
        this.modal.on('checked', this.checked, this);
        return this.modal.on('detail', this.detail, this);
      },
      initialize: function() {
        this.initCol();
        return this.initModal();
      },
      quickCreate: function() {
        return this.modal.triggerSlide('create');
      },
      doAction: function(action, checked) {
        return this[action] && this[action](this.validate(action), checked);
      },
      validate: function(action) {
        switch (action) {
          case 'create':
            return true;
        }
      },
      genDeleteFinish: function(times) {
        var error, finHandler, success, that;
        success = [];
        error = [];
        that = this;
        finHandler = _.after(times, function() {
          that.modal.cancel();
          if (success.length === 1) {
            notification('info', sprintf(lang.NOTIFY.XXX_IS_DELETED, success[0].get('Name')));
          } else if (success.length > 1) {
            notification('info', sprintf(lang.NOTIFY.SELECTED_XXX_SNS_TOPIC_ARE_DELETED, success.length));
          }
          return _.each(error, function(s) {
            return console.log(s);
          });
        });
        return function(res) {
          if (res instanceof Backbone.Model) {
            success.push(res);
          } else {
            error.push(res);
          }
          return finHandler();
        };
      },
      create: function(invalid) {
        var $certChain, $certName, $certPrikey, $certPubkey, certName, that;
        that = this;
        this.switchAction('processing');
        $certName = $('#ssl-cert-name-input');
        $certPrikey = $('#ssl-cert-privatekey-input');
        $certPubkey = $('#ssl-cert-publickey-input');
        $certChain = $('#ssl-cert-chain-input');
        certName = $certName.val();
        if (certName === 'None') {
          notification('error', sprintf(lang.NOTIFY.CERTIFICATE_NAME_XXX_IS_INVALID, certName));
          return;
        }
        return this.sslCertCol.create({
          Name: certName,
          CertificateBody: $certPubkey.val(),
          PrivateKey: $certPrikey.val(),
          CertificateChain: $certChain.val(),
          Path: ''
        }).save().then(function(result) {
          notification('info', sprintf(lang.NOTIFY.CERTIFICATE_XXX_IS_UPLOADED, certName));
          return that.modal.cancel();
        }, function(result) {
          that.switchAction();
          if (result.awsResult) {
            return notification('error', result.awsResult);
          }
        });
      },
      "delete": function(invalid, checked) {
        var count, onDeleteFinish;
        count = checked.length;
        onDeleteFinish = this.genDeleteFinish(count);
        this.switchAction('processing');
        return _.each(checked, function(c) {
          var m;
          m = this.sslCertCol.get(c.data.id);
          return m != null ? m.destroy().then(onDeleteFinish, onDeleteFinish) : void 0;
        });
      },
      update: function(invalid, checked) {
        var newCertName, oldCerName, sslCertData, sslCertId, that;
        that = this;
        this.switchAction('processing');
        if (checked && checked[0]) {
          sslCertId = checked[0].data.id;
          sslCertData = that.sslCertCol.get(sslCertId);
          oldCerName = sslCertData.get('Name');
          newCertName = $('#ssl-cert-name-update-input').val();
          if (newCertName === oldCerName) {
            return that.modal.cancel();
          } else {
            return sslCertData.update({
              Name: newCertName
            }).then(function(result) {
              var certName, sslCertModelAry;
              certName = newCertName;
              notification('info', sprintf(lang.NOTIFY.CERTIFICATE_XXX_IS_UPLOADED, certName));
              sslCertModelAry = Design.modelClassForType(constant.RESTYPE.IAM).allObjects();
              _.each(sslCertModelAry, function(sslCertModel) {
                if (sslCertModel.get('name') === oldCerName) {
                  sslCertModel.set('name', newCertName);
                  sslCertModel.set('arn', sslCertData.get('Arn'));
                }
                return null;
              });
              ide_event.trigger(ide_event.REFRESH_PROPERTY);
              return that.modal.cancel();
            }, function(result) {
              that.switchAction();
              if (result.awsResult) {
                return notification('error', result.awsResult);
              }
            });
          }
        }
      },
      detail: function(event, data, $tr) {
        var detailTpl, sslCertData, sslCertId, that;
        that = this;
        sslCertId = data.id;
        sslCertData = sslCertCol.get(sslCertId).toJSON();
        sslCertData.Expiration = MC.dateFormat(new Date(sslCertData.Expiration), 'yyyy-MM-dd hh:mm:ss');
        detailTpl = template['detail_info'];
        return this.modal.setDetail($tr, detailTpl(sslCertData));
      },
      refresh: function() {
        return this.sslCertCol.fetchForce();
      },
      checked: function(event, checkedAry) {
        var $editBtn;
        $editBtn = this.M$('.toolbar .icon-edit');
        if (checkedAry.length === 1) {
          return $editBtn.removeAttr('disabled');
        } else {
          return $editBtn.attr('disabled', 'disabled');
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
      render: function() {
        this.modal.render();
        if (App.user.hasCredential()) {
          this.processCol();
        } else {
          this.modal.render('nocredential');
        }
        return this;
      },
      processCol: function() {
        var data;
        if (this.sslCertCol.isReady()) {
          data = this.sslCertCol.map(function(sslCertModel) {
            var sslCertData;
            sslCertData = sslCertModel.toJSON();
            sslCertData.UploadDate = MC.dateFormat(new Date(sslCertData.UploadDate), 'yyyy-MM-dd hh:mm:ss');
            return sslCertData;
          });
          this.renderList(data);
        }
        return false;
      },
      renderList: function(data) {
        return this.modal.setContent(template.modal_list(data));
      },
      renderNoCredential: function() {
        return this.modal.render('nocredential').toggleControls(false);
      },
      renderSlides: function(which, checked) {
        var slides, tpl, _ref;
        tpl = template["slide_" + which];
        slides = this.getSlides();
        return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
      },
      processSlideCreate: function() {},
      getSlides: function() {
        var modal, that;
        that = this;
        modal = this.modal;
        return {
          create: function(tpl, checked) {
            var allTextBox, processCreateBtn;
            modal.setSlide(tpl);
            allTextBox = that.M$('.slide-create input, .slide-create textarea');
            processCreateBtn = function(event) {
              if ($(event.currentTarget).parsley('validateForm', false)) {
                return that.M$('.slide-create .do-action').prop('disabled', false);
              } else {
                return that.M$('.slide-create .do-action').prop('disabled', true);
              }
            };
            return allTextBox.on('keyup', processCreateBtn);
          },
          "delete": function(tpl, checked) {
            var checkedAmount, data;
            checkedAmount = checked.length;
            if (!checkedAmount) {
              return;
            }
            data = {};
            if (checkedAmount === 1) {
              data.selecteKeyName = checked[0].data['name'];
            } else {
              data.selectedCount = checkedAmount;
            }
            return modal.setSlide(tpl(data));
          },
          update: function(tpl, checked) {
            var allTextBox, certName, processCreateBtn;
            that = this;
            if (checked && checked[0]) {
              certName = checked[0].data.name;
              modal.setSlide(tpl({
                cert_name: certName
              }));
            }
            allTextBox = that.M$('.slide-update input');
            processCreateBtn = function(event) {
              if ($(event.currentTarget).parsley('validateForm', false)) {
                return that.M$('.slide-update .do-action').prop('disabled', false);
              } else {
                return that.M$('.slide-update .do-action').prop('disabled', true);
              }
            };
            return allTextBox.on('keyup', processCreateBtn);
          }
        };
      },
      show: function() {
        if (App.user.hasCredential()) {
          this.sslCertCol.fetch();
          return this.processCol();
        } else {
          return this.renderNoCredential();
        }
      },
      manage: function() {},
      set: function() {},
      filter: function(keyword) {
        return this.processCol(true, keyword);
      }
    });
  });

}).call(this);

(function() {
  define('sslcert_dropdown',['constant', 'CloudResources', 'sslcert_manage', 'combo_dropdown', './component/sslcert/sslCertTpl', 'i18n!/nls/lang.js'], function(constant, CloudResources, sslCertManage, comboDropdown, template, lang) {
    var sslCertCol;
    sslCertCol = CloudResources(constant.RESTYPE.IAM);
    window.sslCertCol = sslCertCol;
    return Backbone.View.extend({
      tagName: 'section',
      initCol: function() {
        this.sslCertCol = CloudResources(constant.RESTYPE.IAM);
        return this.sslCertCol.on('update', this.processCol, this);
      },
      initDropdown: function() {
        var options;
        options = {
          manageBtnValue: lang.PROP.INSTANCE_MANAGE_SSL_CERT,
          filterPlaceHolder: lang.PROP.INSTANCE_FILTER_SSL_CERT
        };
        this.dropdown = new comboDropdown(options);
        this.dropdown.on('open', this.show, this);
        this.dropdown.on('manage', this.manage, this);
        this.dropdown.on('change', this.set, this);
        this.dropdown.on('filter', this.filter, this);
        return this.dropdown.on('quick_create', this.quickCreate, this);
      },
      initialize: function() {
        this.initCol();
        return this.initDropdown();
      },
      quickCreate: function() {
        return new sslCertManage().render().quickCreate();
      },
      render: function() {
        var selectionName;
        selectionName = this.sslCertName || 'None';
        this.el = this.dropdown.el;
        if (selectionName === 'None') {
          $(this.el).addClass('empty');
          this.sslCertCol.fetch();
        }
        this.dropdown.setSelection(selectionName);
        return this;
      },
      setDefault: function() {
        var compModel, currentListenerObj, data, listenerAry, _ref;
        if (this.sslCertCol.isReady()) {
          data = this.sslCertCol.toJSON();
          if (data && data[0] && this.uid) {
            if (this.dropdown.getSelection() === 'None') {
              compModel = Design.instance().component(this.uid);
              if (compModel) {
                listenerAry = compModel.get('listeners');
                currentListenerObj = listenerAry[this.listenerNum];
                if (currentListenerObj && ((_ref = currentListenerObj.protocol) === 'HTTPS' || _ref === 'SSL')) {
                  compModel.setSSLCert(this.listenerNum, data[0].id);
                  this.dropdown.trigger('change', data[0].id);
                  this.dropdown.setSelection(data[0].Name);
                  return $(this.el).removeClass('empty');
                }
              }
            }
          }
        }
      },
      processCol: function(filter, keyword) {
        var data, len;
        if (this.sslCertCol.isReady()) {
          data = this.sslCertCol.toJSON();
          this.setDefault();
          if (filter) {
            len = keyword.length;
            data = _.filter(data, function(d) {
              return d.Name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            });
          }
          this.renderDropdownList(data);
        }
        return false;
      },
      renderDropdownList: function(data) {
        var selection;
        if (data.length) {
          selection = this.dropdown.getSelection();
          _.each(data, function(d) {
            if (d.Name && d.Name === selection) {
              d.selected = true;
            }
            return null;
          });
          return this.dropdown.setContent(template.dropdown_list(data)).toggleControls(true);
        } else {
          return this.dropdown.setContent(template.no_sslcert({})).toggleControls(true);
        }
      },
      renderNoCredential: function() {
        return this.dropdown.render('nocredential').toggleControls(false);
      },
      show: function() {
        if (App.user.hasCredential()) {
          this.sslCertCol.fetch();
          return this.processCol();
        } else {
          return this.renderNoCredential();
        }
      },
      manage: function() {
        return new sslCertManage().render();
      },
      set: function(id, data) {
        var currentListenerObj, listenerAry, _ref;
        if (this.uid && id) {
          listenerAry = Design.instance().component(this.uid).get('listeners');
          currentListenerObj = listenerAry[this.listenerNum];
          if (currentListenerObj && ((_ref = currentListenerObj.protocol) === 'HTTPS' || _ref === 'SSL')) {
            return Design.instance().component(this.uid).setSSLCert(this.listenerNum, id);
          }
        }
      },
      filter: function(keyword) {
        return this.processCol(true, keyword);
      }
    });
  });

}).call(this);

(function() {
  define('DiffTree',['constant'], function(constant) {
    var DiffTree;
    DiffTree = function(option) {
      var getType, isArray, typeofReal, _compare, _diffAry;
      if (!option) {
        option = {};
      }
      if (!option.filterAttrMap) {
        option.filterAttrMap = {
          '*.type': true,
          '*.uid': true,
          '*.name': true,
          '*.index': true,
          '*.number': true,
          '*.serverGroupUid': true,
          '*.serverGroupName': true,
          '*.resource.UserData': true,
          '*.resource.PrivateIpAddressSet.n.AutoAssign': true,
          '*.resource.AssociatePublicIpAddress': true,
          '*.resource.KeyName': true,
          '*.resource.AssociationSet.n.RouteTableAssociationId': true,
          '*.resource.AssociationSet.n.NetworkAclAssociationId': true,
          '*.resource.BlockDeviceMapping': true,
          '*.resource.VolumeSize': true,
          '*.resource.GroupDescription': true,
          '*.resource.ListenerDescriptions.n.Listener.SSLCertificateId': true,
          '*.resource.Attachment.AttachmentId': true,
          'DBINSTANCE.resource.DBName': true,
          'DBINSTANCE.resource.AvailabilityZone': true,
          'DBINSTANCE.resource.Endpoint.Address': true,
          'DBINSTANCE.resource.ApplyImmediately': true,
          'DBINSTANCE.resource.Endpoint': true,
          'DBINSTANCE.resource.SourceDBInstanceIdentifierForPoint': true,
          'DBINSTANCE.resource.UseLatestRestorableTime': true,
          'ASG.resource.AutoScalingGroupARN': true,
          'ASG.resource.PolicyARN': true
        };
      }
      if (!option.noDiffArrayAttrMap) {
        option.noDiffArrayAttrMap = {
          '*.state': true
        };
      }
      option.filterResMap = {};
      isArray = function(value) {
        return value && typeof value === 'object' && value.constructor === Array;
      };
      typeofReal = function(value) {
        if (isArray(value)) {
          return 'array';
        } else {
          if (value === null) {
            return 'null';
          } else {
            return typeof value;
          }
        }
      };
      getType = function(value) {
        if (typeA === 'object' || typeA === 'array') {
          return '';
        } else {
          return String(a) + ' ';
        }
      };
      _diffAry = function(a, b) {
        var i, j, tmp, v, _i, _j, _len, _ref, _ref1, _results, _results1;
        _ref1 = (function() {
          _results1 = [];
          for (var _j = 0, _ref = a.length; 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
          return _results1;
        }).apply(this);
        _results = [];
        for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
          v = _ref1[i];
          _results.push((function() {
            var _k, _l, _len1, _ref2, _ref3, _results2, _results3;
            _ref3 = (function() {
              _results3 = [];
              for (var _l = 0, _ref2 = b.length; 0 <= _ref2 ? _l < _ref2 : _l > _ref2; 0 <= _ref2 ? _l++ : _l--){ _results3.push(_l); }
              return _results3;
            }).apply(this);
            _results2 = [];
            for (j = _k = 0, _len1 = _ref3.length; _k < _len1; j = ++_k) {
              v = _ref3[j];
              if (!_compare.call(this, a[i], b[j], '', null, [])) {
                tmp = b[i];
                b[i] = b[j];
                _results2.push(b[j] = tmp);
              } else {
                _results2.push(void 0);
              }
            }
            return _results2;
          }).call(this));
        }
        return _results;
      };
      _compare = function(a, b, key, path, resultJSON) {
        var aAry, aString, attrPath1, attrPath2, attrPathAry, attrPathStr, bAry, bString, changeType, diffAryResult, hasDiff, haveDiff, i, isEqual, keys, resShortType, resType, typeA, typeB, v, value1, value2, _i, _len;
        if (key === 'VPCZoneIdentifier') {
          aAry = a.split(',');
          bAry = b.split(',');
          aAry = _.map(aAry, function(ref) {
            return $.trim(ref);
          });
          bAry = _.map(bAry, function(ref) {
            return $.trim(ref);
          });
          a = aAry;
          b = bAry;
        }
        attrPathStr = '';
        if (path) {
          if (key) {
            path = path.concat([key]);
          }
          if (path.length === 2 && a && a.type) {
            path[1] = a.type;
          }
          if (path.length > 2) {
            attrPathAry = path.slice(2);
            attrPathAry = _.map(attrPathAry, function(path) {
              var num;
              num = Number(path);
              if (num >= 0) {
                return 'n';
              }
              return path;
            });
            resType = path[1];
            resShortType = this.resTypeShortMap[resType];
            attrPathStr = attrPathAry.join('.');
            attrPath1 = resShortType + '.' + attrPathStr;
            attrPath2 = '*.' + attrPathStr;
            if (option.filterAttrMap[attrPath1] || option.filterAttrMap[attrPath2]) {
              return;
            }
          }
        }
        if (!a && !b) {
          return;
        }
        haveDiff = false;
        typeA = typeofReal(a);
        typeB = typeofReal(b);
        aString = typeA === 'object' || typeA === 'array' ? '' : String(a) + '';
        bString = typeB === 'object' || typeB === 'array' ? '' : String(b) + '';
        if (!aString) {
          aString = '';
        }
        if (!bString) {
          bString = '';
        }
        changeType = value1 = value2 = '';
        if (a === void 0) {
          changeType = 'added';
          value2 = bString;
        } else if (b === void 0) {
          changeType = 'removed';
          value1 = aString;
        } else if (typeA !== typeB || (typeA !== 'object' && typeA !== 'array' && a !== b)) {
          changeType = 'changed';
          value1 = aString;
          value2 = bString;
        } else {
          value1 = aString;
        }
        resultJSON[key] = {};
        if (typeA === 'object' || typeA === 'array' || typeB === 'object' || typeB === 'array') {
          if (typeA === 'array' && typeB === 'array') {
            if (!attrPath2 || (attrPath2 && !option.noDiffArrayAttrMap[attrPath2])) {
              diffAryResult = {};
              if (a.length < b.length) {
                _diffAry.call(this, a, b);
              } else {
                _diffAry.call(this, b, a);
              }
            }
          }
          keys = [];
          for (v in a) {
            keys.push(v);
          }
          for (v in b) {
            keys.push(v);
          }
          keys.sort();
          isEqual = true;
          for (i = _i = 0, _len = keys.length; _i < _len; i = ++_i) {
            v = keys[i];
            if (keys[i] === keys[i - 1]) {
              continue;
            }
            hasDiff = _compare.call(this, a && a[keys[i]], b && b[keys[i]], keys[i], path, resultJSON[key]);
            if (hasDiff) {
              isEqual = false;
            }
          }
          haveDiff = !isEqual;
          if (isEqual) {
            delete resultJSON[key];
          }
        } else {
          if (path) {
            path.length = 0;
          }
          if (typeofReal(a) === 'number') {
            a = String(a);
          }
          if (typeofReal(b) === 'number') {
            b = String(b);
          }
          if (typeofReal(a) === 'boolean') {
            a = String(a);
          }
          if (typeofReal(b) === 'boolean') {
            b = String(b);
          }
          if (a !== b) {
            haveDiff = true;
            resultJSON[key] = {
              type: changeType,
              __old__: a,
              __new__: b
            };
          } else {
            delete resultJSON[key];
          }
        }
        return haveDiff;
      };
      this.compare = function(json1, json2) {
        var resultJSON;
        resultJSON = {};
        _compare.call(this, json1, json2, 'result', [], resultJSON);
        return resultJSON.result;
      };
      return null;
    };
    DiffTree.prototype.resTypeShortMap = _.invert(constant.RESTYPE);
    return DiffTree;
  });

}).call(this);

define('component/common/diff/resDiffTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-res-diff\">\n	<p>Resources of this App have been changed externally. This has been synced to your App. The diagram may be re-generated to reflect the change(s).</p>\n	<h5>What have been changed:</h5>\n	<div class=\"scroll-wrap scroll-wrap-res-diff\" style=\"max-height: 350px;\">\n		<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n		<article class=\"content_wrap scroll-content\"></article>\n	</div>\n</div>";
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"group "
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	<div class=\"head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span class=\"count\">("
    + escapeExpression(((stack1 = (depth0 && depth0.count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></div>\n	<div class=\"content\"></div>\n</div>";
  return buffer;
  };
TEMPLATE.resDiffGroup=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"tree\"></ul>";
  };
TEMPLATE.resDiffTree=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "closed";
  }

  buffer += "<li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.closed), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n	<div class=\"meta\">\n		<span class=\"type\">"
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n		<span class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	</div>\n</li>";
  return buffer;
  };
TEMPLATE.resDiffTreeItem=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"name to\"> -></span><span class=\"name "
    + escapeExpression(((stack1 = (depth0 && depth0.type1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  return buffer;
  }

  buffer += "<div class=\"meta\">\n	<span class=\"type\">"
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	<span class=\"name ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.value1), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.resDiffTreeMeta=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/common/diff/prepare',['constant'], function(constant) {
    var Prepare, helper, prepareNode;
    helper = function(options) {
      return {
        getNodeMap: function(path) {
          var newComp, newCompAttr, oldComp, oldCompAttr;
          if (_.isString(path)) {
            path = path.split('.');
          }
          oldComp = options.oldAppJSON.component;
          newComp = options.newAppJSON.component;
          oldCompAttr = _.extend(oldComp, {});
          newCompAttr = _.extend(newComp, {});
          _.each(path, function(attr) {
            if (oldCompAttr) {
              if (_.isUndefined(oldCompAttr[attr])) {
                oldCompAttr = void 0;
              } else {
                oldCompAttr = oldCompAttr[attr];
              }
            }
            if (newCompAttr) {
              if (_.isUndefined(newCompAttr[attr])) {
                newCompAttr = void 0;
              } else {
                newCompAttr = newCompAttr[attr];
              }
            }
            return null;
          });
          return {
            oldAttr: oldCompAttr,
            newAttr: newCompAttr
          };
        },
        genValue: function(type, oldValue, newValue) {
          var result;
          result = '';
          oldValue = String(oldValue);
          newValue = String(newValue);
          if (type === 'changed') {
            if (!oldValue) {
              oldValue = 'none';
            }
            if (!newValue) {
              newValue = 'none';
            }
          }
          if (oldValue) {
            result = oldValue;
            if (newValue && oldValue !== newValue) {
              result += ' -> ' + newValue;
            }
          } else {
            result = newValue;
          }
          return result;
        },
        getNodeData: function(path) {
          return this.getNewest(this.getNodeMap(path));
        },
        getNewest: function(attrMap) {
          return attrMap.newAttr || attrMap.oldAttr;
        },
        pluralToSingular: function(str) {
          return str.slice(0, -1);
        },
        setToElement: function(str) {
          return str.slice(0, -3);
        },
        replaceArrayIndex: function(path, data) {
          var childNode, component, componentMap, deviceObj, err, parentKey, pluralKeys, type;
          componentMap = this.getNodeMap(path[0]);
          component = this.getNewest(componentMap);
          type = component.type;
          parentKey = path[path.length - 2];
          childNode = data.originValue;
          pluralKeys = ['Dimensions', 'AlarmActions', 'Instances', 'Attachments', 'AvailabilityZones', 'LoadBalancerNames', 'TerminationPolicies', 'ListenerDescriptions', 'SecurityGroups', 'Subnets', 'Routes'];
          switch (parentKey) {
            case 'BlockDeviceMapping':
              deviceObj = childNode.DeviceName;
              data.key = 'Device';
              if (deviceObj) {
                if (_.isObject(deviceObj)) {
                  data.key = this.genValue(deviceObj.type, deviceObj.__old__, deviceObj.__new__);
                } else {
                  data.key = deviceObj;
                }
              }
              break;
            case 'GroupSet':
              data.key = 'SecurityGroup';
              break;
            case 'IpPermissions':
            case 'IpPermissionsEgress':
            case 'EntrySet':
              data.key = 'Rule';
              break;
            case 'AssociationSet':
            case 'AttachmentSet':
            case 'PrivateIpAddressSet':
              data.key = this.setToElement(parentKey);
              break;
            case 'NotificationType':
              data.key = 'Type';
              break;
            case 'VPCZoneIdentifier':
              data.key = 'Subnet';
              break;
            case 'RouteSet':
              data.key = 'Route';
              break;
            case 'SubnetIds':
              data.key = 'Subnet';
              break;
            case 'OptionSettings':
              data.key = 'Option';
              break;
            case 'Options':
              data.key = 'Option';
          }
          if (__indexOf.call(pluralKeys, parentKey) >= 0) {
            data.key = this.pluralToSingular(parentKey);
          }
          if (path.length === 1) {
            data.key = constant.RESNAME[data.key] || data.key;
          }
          try {
            if (data.key === 'MasterUserPassword' && data.value) {
              if (data.value.type === 'changed') {
                data.value.__new__ = data.value.__new__.replace(/./g, '*');
              }
            }
          } catch (_error) {
            err = _error;
            null;
          }
          return data;
        }
      };
    };
    prepareNode = function(path, data) {
      var attrObj, compAttrObj, compUID, needName, newAttr, newCompName, newRef, newValue, oldAttr, oldCompName, oldRef, oldValue, valueRef, _getRef;
      _getRef = function(value, needName) {
        var refMatchAry, refName, refRegex, refUID;
        if (_.isString(value) && value.indexOf('@{') === 0) {
          refRegex = /@\{.*\}/g;
          refMatchAry = value.match(refRegex);
          if (refMatchAry && refMatchAry.length) {
            refName = value.slice(2, value.length - 1);
            refUID = refName.split('.')[0];
            if (needName) {
              if (refUID) {
                return "" + refUID + ".name";
              }
            } else {
              return refName;
            }
          }
        }
        return null;
      };
      if (_.isObject(data.value)) {
        newValue = data.value;
        needName = true;
        if (data.key) {
          if (data.key.substr(data.key.lastIndexOf('Id')) === 'Id') {
            needName = false;
          }
        }
        oldRef = _getRef(newValue.__old__, needName);
        newRef = _getRef(newValue.__new__, needName);
        if (oldRef) {
          newValue.__old__ = this.h.getNodeMap(oldRef).oldAttr;
        }
        if (newRef) {
          newValue.__new__ = this.h.getNodeMap(newRef).newAttr;
        }
        data = this.h.replaceArrayIndex(path, data);
        data.value = {
          type: newValue.type,
          old: newValue.__old__,
          "new": newValue.__new__
        };
      } else {
        compAttrObj = this.h.getNodeMap(path);
        oldAttr = compAttrObj.oldAttr;
        newAttr = compAttrObj.newAttr;
        valueRef = _getRef(data.value);
        if (valueRef) {
          attrObj = this.h.getNodeMap(valueRef);
          oldValue = attrObj.oldAttr;
          newValue = attrObj.newAttr;
          data.value = oldValue || newValue;
        }
        if (path.length === 1) {
          compUID = path[0];
          oldCompName = (oldAttr ? oldAttr.name : void 0) || '';
          newCompName = (newAttr ? newAttr.name : void 0) || '';
          if (oldAttr) {
            data.key = oldAttr.type;
          } else {
            data.key = newAttr.type;
          }
          data.value = this.h.genValue(null, oldCompName, newCompName);
        }
        data = this.h.replaceArrayIndex(path, data);
      }
      if (path.length === 2) {
        if (path[1] === 'resource') {
          data.skip = true;
        }
        if (path[1] === 'state') {
          delete data.key;
        }
      }
      return data;
    };
    Prepare = function(options) {
      _.extend(this, options);
      this.h = helper(options);
      return this;
    };
    Prepare.prototype.node = prepareNode;
    return Prepare;
  });

}).call(this);

(function() {
  define('ResDiff',['UI.modalplus', 'DiffTree', 'component/common/diff/resDiffTpl', 'component/common/diff/prepare', 'constant'], function(modalplus, DiffTree, template, Prepare, constant) {
    return Backbone.View.extend({
      className: 'res_diff_tree',
      tagName: 'section',
      initialize: function(option) {
        this.oldAppJSON = option.old;
        this.newAppJSON = option["new"];
        if (option.callback) {
          this.callback = option.callback;
        }
        this.prepare = new Prepare({
          oldAppJSON: this.oldAppJSON,
          newAppJSON: this.newAppJSON
        });
        return this._genDiffInfo(this.oldAppJSON.component, this.newAppJSON.component);
      },
      events: {
        'click .item .type': '_toggleTab',
        'click .head': '_toggleItem'
      },
      _toggleItem: function(e) {
        var $target;
        $target = $(e.currentTarget).closest('.group');
        return $target.toggleClass('closed');
      },
      _toggleTab: function(e) {
        var $target;
        $target = $(e.currentTarget).closest('.item');
        if ($target.hasClass('end')) {
          return;
        }
        return $target.toggleClass('closed');
      },
      render: function() {
        var okText, options, that;
        that = this;
        okText = 'OK, got it';
        options = {
          template: template.frame(),
          title: 'App Changes',
          disableClose: true,
          hideClose: true,
          confirm: {
            text: okText
          },
          width: '608px',
          compact: false,
          preventClose: true
        };
        this.modal = new modalplus(options);
        this.modal.on('confirm', function() {
          var $confirmBtn, promise;
          $confirmBtn = that.modal.tpl.find('.modal-confirm');
          if (that.callback) {
            $confirmBtn.addClass('disabled');
            $confirmBtn.text('Saving...');
            promise = that.callback(true);
            return promise.then(function() {
              return that.modal.close();
            }, function(error) {
              $confirmBtn.text(okText);
              $confirmBtn.removeClass('disabled');
              return notification('error', error.msg);
            });
          } else {
            return that.modal.close();
          }
        }, this);
        this.modal.on('cancel', function() {
          if (that.callback) {
            that.callback(false);
          }
          return that.modal.close();
        }, this);
        this.modal.tpl.find('article').html(this.$el);
        this._genResGroup(this.$el);
        return this.modal.resize();
      },
      _genDiffInfo: function(oldComps, newComps) {
        var diffTree, ignoreDiffMap, that, unionNewComps, unionOldComps;
        that = this;
        that.addedComps = {};
        that.removedComps = {};
        that.modifiedComps = {};
        unionOldComps = {};
        unionNewComps = {};
        ignoreDiffMap = {
          'AWS.EC2.Tag': true,
          'AWS.AutoScaling.Tag': true
        };
        _.each(oldComps, function(comp, uid) {
          if (comp && !ignoreDiffMap[comp.type]) {
            if (newComps[uid]) {
              unionOldComps[uid] = oldComps[uid];
              unionNewComps[uid] = newComps[uid];
            } else {
              that.removedComps[uid] = oldComps[uid];
            }
            return null;
          }
        });
        _.each(_.keys(newComps), function(uid) {
          if (!oldComps[uid]) {
            if (newComps[uid] && !ignoreDiffMap[newComps[uid].type]) {
              that.addedComps[uid] = newComps[uid];
            }
          }
          return null;
        });
        diffTree = new DiffTree();
        that.modifiedComps = diffTree.compare(unionOldComps, unionNewComps);
        if (!that.modifiedComps) {
          return that.modifiedComps = {};
        }
      },
      _genResGroup: function($containerDom) {
        var $group, compCount, data, groupData, that, _i, _len, _results;
        that = this;
        groupData = [
          {
            title: 'New Resource',
            diffComps: that.addedComps,
            closed: true,
            type: 'added',
            needDiff: false
          }, {
            title: 'Removed Resource',
            diffComps: that.removedComps,
            closed: true,
            type: 'removed',
            needDiff: false
          }, {
            title: 'Modified Resource',
            diffComps: that.modifiedComps,
            closed: false,
            type: 'modified',
            needDiff: true
          }
        ];
        _results = [];
        for (_i = 0, _len = groupData.length; _i < _len; _i++) {
          data = groupData[_i];
          compCount = _.keys(data.diffComps).length;
          if (compCount) {
            $group = $(template.resDiffGroup({
              type: data.type,
              title: data.title,
              count: compCount
            })).appendTo($containerDom);
            _results.push(this._genResTree($group.find('.content'), data.diffComps, data.closed, data.needDiff));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },
      _genResTree: function($container, diffComps, closed, needDiff) {
        var that, _genTree;
        that = this;
        _genTree = function(value, key, path, $parent) {
          var $diffTree, $treeItem, changeType, data, nextPath, type, type1, value1, __value, _key, _results, _value;
          if (_.isObject(value)) {
            if (_.isUndefined(value.__new__) && _.isUndefined(value.__old__)) {
              $diffTree = $(template.resDiffTree({})).appendTo($parent);
              _results = [];
              for (_key in value) {
                _value = value[_key];
                __value = _.isObject(_value) ? '' : _value;
                nextPath = path.concat([_key]);
                data = this.prepare.node(nextPath, {
                  key: _key,
                  value: __value,
                  originValue: _value
                });
                if (data.key) {
                  if (data.skip) {
                    $treeItem = $parent;
                    $diffTree.remove();
                  } else {
                    $treeItem = $(template.resDiffTreeItem({
                      key: data.key,
                      value: data.value,
                      closed: closed
                    })).appendTo($diffTree);
                    if (!_.isObject(_value)) {
                      $treeItem.addClass('end');
                    }
                  }
                  if (_.isArray(_value) && _value.length === 0) {
                    _results.push($treeItem.remove());
                  } else {
                    _results.push(_genTree.call(that, _value, _key, nextPath, $treeItem));
                  }
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            } else {
              changeType = value.type;
              data = this.prepare.node(path, {
                key: key,
                value: value
              });
              if (data.key) {
                type = value1 = type1 = '';
                if (_.isObject(data.value)) {
                  if (data.value.type === 'added') {
                    value = data.value["new"];
                    type = 'new';
                  } else if (data.value.type === 'removed') {
                    value = data.value.old;
                    type = 'old';
                  } else if (data.value.type === 'changed') {
                    value = data.value.old;
                    value1 = data.value["new"];
                    type = 'old';
                    type1 = 'new';
                  }
                } else {
                  value = data.value;
                }
                $parent.html(template.resDiffTreeMeta({
                  key: data.key,
                  value: value,
                  type: type,
                  value1: value1,
                  type1: type1,
                  closed: closed
                }));
                $parent.addClass('end');
                return $parent.addClass(changeType);
              } else {
                return $parent.remove();
              }
            }
          }
        };
        return _genTree.call(that, diffComps, null, [], $container);
      },
      getRelatedInstanceGroupUID: function(originComps, comp) {
        var eniComp, eniRef, eniUID, instanceComp, instanceRef, instanceUID, resType, that;
        that = this;
        resType = comp.type;
        if (resType === constant.RESTYPE.INSTANCE) {
          return comp.serverGroupUid;
        }
        if (resType === constant.RESTYPE.ENI) {
          instanceRef = comp.resource.Attachment.InstanceId;
        }
        if (instanceRef) {
          instanceUID = MC.extractID(instanceRef);
          instanceComp = originComps[instanceUID];
          if (instanceComp) {
            return instanceComp.serverGroupUid;
          }
        }
        if (resType === constant.RESTYPE.VOL) {
          instanceRef = comp.resource.AttachmentSet.InstanceId;
        }
        if (instanceRef) {
          instanceUID = MC.extractID(instanceRef);
          instanceComp = originComps[instanceUID];
          if (instanceComp) {
            return instanceComp.serverGroupUid;
          }
        }
        if (resType === constant.RESTYPE.EIP) {
          eniRef = comp.resource.NetworkInterfaceId;
        }
        if (eniRef) {
          eniUID = MC.extractID(eniRef);
          eniComp = originComps[eniUID];
          if (eniComp) {
            return that.getRelatedInstanceGroupUID(originComps, eniComp);
          }
        }
        return '';
      },
      renderAppUpdateView: function() {
        this._genResGroup(this.$el);
        return this.$el;
      },
      getDiffInfo: function() {
        var appModifiedComps, diffTree, hasCompChange, hasLayoutChange, hasStateChange, layoutModifiedComps, newAppJSON, oldAppJSON, onlyStateChange, that;
        that = this;
        oldAppJSON = _.extend({}, that.oldAppJSON);
        newAppJSON = _.extend({}, that.newAppJSON);
        hasCompChange = false;
        if (_.size(that.addedComps) || _.size(that.removedComps) || _.size(that.modifiedComps)) {
          hasCompChange = true;
        }
        diffTree = new DiffTree();
        layoutModifiedComps = diffTree.compare(oldAppJSON.layout, newAppJSON.layout);
        hasLayoutChange = false;
        if (_.size(layoutModifiedComps)) {
          hasLayoutChange = true;
        }
        hasStateChange = false;
        onlyStateChange = true;
        _.each(that.modifiedComps, function(comp, uid) {
          if (comp.state) {
            hasStateChange = true;
          }
          if (_.size(comp) === 1 && comp.state) {
            delete that.modifiedComps[uid];
          } else {
            onlyStateChange = false;
          }
          if (comp && comp.state) {
            delete comp.state;
          }
          return null;
        });
        if (onlyStateChange && _.size(that.addedComps) === 0 && _.size(that.removedComps) === 0) {
          hasCompChange = false;
        }
        delete oldAppJSON.component;
        delete oldAppJSON.layout;
        delete newAppJSON.component;
        delete newAppJSON.layout;
        appModifiedComps = diffTree.compare(oldAppJSON, newAppJSON);
        if (_.size(appModifiedComps) > 0) {
          hasLayoutChange = true;
        }
        return {
          compChange: hasCompChange,
          layoutChange: hasLayoutChange,
          stateChange: hasStateChange
        };
      },
      getChangeInfo: function() {
        var hasResChange, needUpdateLayout, newComps, oldComps, that;
        that = this;
        hasResChange = false;
        if (_.size(that.addedComps) || _.size(that.removedComps) || _.size(that.modifiedComps)) {
          hasResChange = true;
        }
        needUpdateLayout = _.some(that.addedComps, function(comp) {
          return that.newAppJSON.layout[comp.uid];
        });
        newComps = that.newAppJSON.component;
        oldComps = that.oldAppJSON.component;
        _.each(that.modifiedComps, function(comp, uid) {
          var originComp, _ref;
          originComp = oldComps[uid];
          if (originComp && ((_ref = originComp.type) === constant.RESTYPE.ENI || _ref === constant.RESTYPE.EIP || _ref === constant.RESTYPE.INSTANCE || _ref === constant.RESTYPE.VOL)) {
            if (originComp && originComp.number > 1) {
              needUpdateLayout = true;
            }
          }
          return null;
        });
        _.each(that.modifiedComps, function(comp, uid) {
          var instanceAry;
          if (oldComps[uid] && oldComps[uid].type === constant.RESTYPE.ELB) {
            if (comp && comp.resource && comp.resource.Instances) {
              instanceAry = [];
              _.map(comp.resource.Instances, function(refObj) {
                var _refObj;
                _refObj = refObj.InstanceId;
                if (_refObj) {
                  if (_refObj.__old__) {
                    instanceAry.push(_refObj.__old__);
                  }
                  if (_refObj.__new__) {
                    return instanceAry.push(_refObj.__new__);
                  }
                }
              });
              _.each(instanceAry, function(uidRef) {
                uid = MC.extractID(uidRef);
                if (oldComps[uid] && oldComps[uid].number > 1) {
                  needUpdateLayout = true;
                }
                return null;
              });
            }
          }
          return null;
        });
        _.each(that.modifiedComps, function(comp, uid) {
          if (newComps[uid] && newComps[uid].type === constant.RESTYPE.ASG) {
            if (comp && comp.resource && comp.resource.AvailabilityZones) {
              needUpdateLayout = true;
            }
            if (comp && comp.resource && comp.resource.VPCZoneIdentifier) {
              needUpdateLayout = true;
            }
          }
          return null;
        });
        _.each(that.removedComps, function(comp) {
          var originComp, serverGroupUid, _ref;
          if ((_ref = comp.type) === constant.RESTYPE.ENI || _ref === constant.RESTYPE.EIP || _ref === constant.RESTYPE.INSTANCE || _ref === constant.RESTYPE.VOL) {
            serverGroupUid = that.getRelatedInstanceGroupUID(oldComps, comp);
            originComp = oldComps[serverGroupUid];
            if (originComp && originComp.number > 1) {
              needUpdateLayout = true;
            }
          }
          return null;
        });
        return {
          hasResChange: hasResChange,
          needUpdateLayout: needUpdateLayout
        };
      }
    });
  });

}).call(this);

define('component/rds_pg/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.DBParameterGroupFamily)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n            <div class=\"manager-content-main\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.DBParameterGroupFamily)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.DBEngineVersionDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
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
  buffer += "\n    <tr class=\"item\" data-id=\"\">\n        <td>\n            <div class=\"checkbox\">\n                <input id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isDefault), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <label for=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n            </div>\n        </td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBParameterGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBParameterGroupFamily)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    </tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "disabled";
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
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = (depth0 && depth0.selectedId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " RDS Parameter";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "selected "
    + escapeExpression(((stack1 = (depth0 && depth0.selectedCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " RDS Parameter Groups";
  return buffer;
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">Confirm to delete ";
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
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n                                        <li class=\"item\" data-id=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>\n                                        ";
  return buffer;
  }

  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-volume-choose\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_SET_FAMILY", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div id=\"property-family-choose\">\n                        <div class=\"selectbox selectbox-mega\" id=\"property-family\">\n                            <div class=\"selection\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.families)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                            <div class=\"scroll-wrap\" style=\"height: 160px\">\n                                <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                                <div class=\"scroll-content\">\n                                    <ul class=\"dropdown\" tabindex=\"-1\">\n                                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.families), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n\n            <div class=\"control-group clearfix\">\n                <label for=\"property-dbpg-name-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_SET_NAME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id=\"property-dbpg-name-create\" class=\"input\" type=\"text\" maxlength=\"255\" data-ignore-regexp=\"^[a-zA-Z][a-zA-Z0-9-]*$\" data-required=\"true\" data-type=\"database\" data-ignore=\"true\" placeholder=\"Begin with a letter; must contain only ASCII letters, digits, and hyphens; and must not end with a hyphen or contain two consecutive hyphens\">\n                </div>\n            </div>\n\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-dbpg-desc-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_SET_DESC", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id='property-dbpg-desc-create' class=\"input\" placeholder=\"Up to 255 characters\" data-required=\"true\" type=\"text\"/>\n                </div>\n            </div>\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"create\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
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


  buffer += "<div class=\"slide-reset\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_CONFIRM_RESET_1", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_CONFIRM_RESET_2", {hash:{},data:data}))
    + "</div>\n        <div class=\"init action\">\n            <button class=\"btn btn-red do-action\" data-action=\"reset\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_RESET", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_RESETTING", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_reset=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <th width=\"40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</th>\n                <th width=\"20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_ORIGINAL_VALUE", {hash:{},data:data}))
    + "</th>\n                <th width=\"40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_EDIT_VALUE", {hash:{},data:data}))
    + "</th>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <th width=\"50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</th>\n                <th width=\"50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_EDIT_VALUE", {hash:{},data:data}))
    + "</th>\n            ";
  return buffer;
  }

function program5(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n            <tr id=\"pg-"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                <td>\n                    <div class=\"prop_main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                        <div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.Source)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n                    </div>\n                    <div class=\"prop_sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                </td>\n                ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.preview), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <td>\n                    <div class=\"prop_main\">\n                        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.noop,fn:self.programWithDepth(14, program14, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "input", {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n                    <div class=\"prop_main\">\n                        <div class=\"prop_sub\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_1", {hash:{},data:data}));
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.ApplyType), "dynamic", {hash:{},inverse:self.program(35, program35, data),fn:self.program(33, program33, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n                    </div>\n                </td>\n            </tr>\n        ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <td>\n                        <div class=\"prop_main\" style=\"text-align: center\">\n                            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ParameterValue), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </div>\n                    </td>\n                ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                "
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                            ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return "&lt;engine-default&gt;";
  }

function program12(depth0,data) {
  
  
  return "&lt;empty&gt;";
  }

function program14(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                            <select name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"select3\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.ParameterValue), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.selections), {hash:{},inverse:self.noop,fn:self.programWithDepth(19, program19, data, depth0, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </select>\n                        ";
  return buffer;
  }
function program15(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program17(depth0,data) {
  
  
  return "<option value=\"<engine-default>\">&lt;engine-default&gt;</option>";
  }

function program19(depth0,data,depth1,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n                                <option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth2 && depth2.newValue), {hash:{},inverse:self.programWithDepth(23, program23, data, depth1),fn:self.programWithDepth(20, program20, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</option>\n                            ";
  return buffer;
  }
function program20(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.newValue), depth0, {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program21(depth0,data) {
  
  
  return "selected=\"selected\" ";
  }

function program23(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.ParameterValue), depth0, {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program24(depth0,data) {
  
  
  return "selected=\"selected\"";
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <input type=\"text\" class=\"input prop-half-width\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.newValue), {hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.AllowedValues), {hash:{},inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program27(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.newValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program29(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program31(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.AllowedValues)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>";
  return buffer;
  }

function program33(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_2", {hash:{},data:data}));
  }

function program35(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_3", {hash:{},data:data}));
  }

function program37(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <button class=\"btn do-action\" id=\"pg-back-to-edit\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_BACK_TO_EDITING", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-blue\" id=\"rds-pg-save\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_APPLY_CHANGES", {hash:{},data:data}))
    + "</button>\n        ";
  return buffer;
  }

function program39(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <button class=\"btn btn-blue do-action\" data-action=\"preview\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REVIEW_CHANGES_SAVE", {hash:{},data:data}))
    + "</button>\n        ";
  return buffer;
  }

  buffer += "<div class=\"clearfix\" id=\"pg-sort-filter\">\n    <div class=\"pull-left\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_FILTER", {hash:{},data:data}))
    + " <input id=\"pg-filter-parameter-name\" class=\"input\" type=\"text\" placeholder=\"Filter by Parameter Name\"/>\n    </div>\n    <div class=\"pull-right\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_SORT_BY", {hash:{},data:data}))
    + "\n        <div class=\"selectbox\" id=\"sort-parameter-name\">\n            <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</div>\n            <ul class=\"dropdown\" tabindex=\"-1\">\n                <li class=\"item selected\" data-id=\"ParameterName\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</li>\n                <li class=\"item\" data-id=\"IsModifiable\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_ISMODIFIABLE", {hash:{},data:data}))
    + "</li>\n                <li class=\"item\" data-id=\"ApplyType\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_APPLY_METHOD", {hash:{},data:data}))
    + "</li>\n                <li class=\"item\" data-id=\"Source\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_SOURCE", {hash:{},data:data}))
    + "</li>\n            </ul>\n        </div>\n    </div>\n</div>\n<div id=\"parameter-table\" style=\"height: "
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.height), 310, {hash:{},data:data}))
    + "px\">\n    <table class=\"table\">\n        <thead>\n        <tr>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.preview), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        </tr>\n        </thead>\n        <tbody>\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.programWithDepth(5, program5, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </tbody>\n    </table>\n</div>\n<div class=\"pg-edit-footer clearfix\">\n    <a target=\"_blank\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ParamValuesRef.html\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_VALUE_REFERENCE", {hash:{},data:data}))
    + "</a>\n    <div class=\"init action\" style=\"padding: 10px 0\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.preview), {hash:{},inverse:self.program(39, program39, data),fn:self.program(37, program37, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"padding: 10px 0;display: none\">\n        <button class=\"btn btn-blue\" id=\"rds-pg-save\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_APPLYING", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_edit=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <th width=\"40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</th>\n            <th width=\"20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_ORIGINAL_VALUE", {hash:{},data:data}))
    + "</th>\n            <th width=\"40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_EDIT_VALUE", {hash:{},data:data}))
    + "</th>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <th width=\"50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</th>\n            <th width=\"50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_EDIT_VALUE", {hash:{},data:data}))
    + "</th>\n        ";
  return buffer;
  }

function program5(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr id=\"pg-"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <td>\n                <div class=\"prop_main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                    <div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.Source)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n                </div>\n                <div class=\"prop_sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            </td>\n            ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.preview), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <td>\n                <div class=\"prop_main\">\n                    ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.noop,fn:self.programWithDepth(14, program14, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "input", {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n                <div class=\"prop_main\">\n                    <div class=\"prop_sub\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_1", {hash:{},data:data}));
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.ApplyType), "dynamic", {hash:{},inverse:self.program(35, program35, data),fn:self.program(33, program33, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n                </div>\n            </td>\n        </tr>\n    ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <td>\n                    <div class=\"prop_main\" style=\"text-align: center\">\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ParameterValue), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n                </td>\n            ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            "
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return "&lt;engine-default&gt;";
  }

function program12(depth0,data) {
  
  
  return "&lt;empty&gt;";
  }

function program14(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                        <select name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"select3\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.ParameterValue), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.selections), {hash:{},inverse:self.noop,fn:self.programWithDepth(19, program19, data, depth0, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </select>\n                    ";
  return buffer;
  }
function program15(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program17(depth0,data) {
  
  
  return "<option value=\"<engine-default>\">&lt;engine-default&gt;</option>";
  }

function program19(depth0,data,depth1,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n                                <option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth2 && depth2.newValue), {hash:{},inverse:self.programWithDepth(23, program23, data, depth1),fn:self.programWithDepth(20, program20, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</option>\n                            ";
  return buffer;
  }
function program20(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.newValue), depth0, {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program21(depth0,data) {
  
  
  return "selected=\"selected\" ";
  }

function program23(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.ParameterValue), depth0, {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program24(depth0,data) {
  
  
  return "selected=\"selected\"";
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <input type=\"text\" class=\"input prop-half-width\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.newValue), {hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.AllowedValues), {hash:{},inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  return buffer;
  }
function program27(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.newValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program29(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program31(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.AllowedValues)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>";
  return buffer;
  }

function program33(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_2", {hash:{},data:data}));
  }

function program35(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_3", {hash:{},data:data}));
  }

  buffer += "<table class=\"table\">\n    <thead>\n    <tr>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.preview), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </tr>\n    </thead>\n    <tbody>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.programWithDepth(5, program5, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.filter=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('rds_pg',['CloudResources', 'ApiRequest', 'constant', "UI.modalplus", 'combo_dropdown', 'toolbar_modal', "i18n!/nls/lang.js", 'component/rds_pg/template'], function(CloudResources, ApiRequest, constant, modalPlus, combo_dropdown, toolbar_modal, lang, template) {
    var DbpgRes, deleteCount, deleteErrorCount, fetched, fetching, regionsMark;
    fetched = false;
    deleteCount = 0;
    deleteErrorCount = 0;
    fetching = false;
    regionsMark = {};
    DbpgRes = Backbone.View.extend({
      constructor: function(model) {
        if (model) {
          this.resModel = model;
        }
        this.collection = CloudResources(constant.RESTYPE.DBPG, Design.instance().region());
        this.listenTo(this.collection, 'update', this.onUpdate.bind(this));
        this.listenTo(this.collection, 'change', this.onUpdate.bind(this));
        this.listenTo(this.collection, 'remove', this.onRemove.bind(this));
        this.listenTo(this.collection, 'add', this.onAdd.bind(this));
        return this;
      },
      onUpdate: function() {
        this.initManager();
        return this.trigger('datachange', this);
      },
      onAdd: function() {
        return this.initDropdown();
      },
      onRemove: function() {
        var _ref;
        this.initDropdown();
        if (this.resModel && !(this.collection.get(this.resModel.get('pgName')))) {
          this.resModel.setDefaultParameterGroup(this.resModel.get('engineVersion'));
        }
        return (_ref = this.dropdown) != null ? _ref.setSelection(this.resModel.get('pgName')) : void 0;
      },
      remove: function() {
        return Backbone.View.prototype.remove.call(this);
      },
      render: function() {
        return this.renderManager();
      },
      enableCreate: function() {
        return this.manager.$el.find('[data-action="create"]').prop('disabled', false);
      },
      selectRegion: function() {
        return this.manager.$el.find('[data-action="reset"]').prop('disabled', false);
      },
      renderManager: function() {
        var _ref;
        this.manager = new toolbar_modal(this.getModalOptions());
        this.manager.on('refresh', this.refresh, this);
        this.manager.on("slidedown", this.renderSlides, this);
        this.manager.on('action', this.doAction, this);
        this.manager.on('close', (function(_this) {
          return function() {
            _this.manager.remove();
            return _this.collection.remove();
          };
        })(this));
        this.manager.on('checked', this.processReset, this);
        this.manager.render();
        if (!App.user.hasCredential()) {
          if ((_ref = this.manager) != null) {
            _ref.render('nocredential');
          }
          return false;
        }
        return this.initManager();
      },
      initManager: function() {
        var currentRegion, setContent;
        setContent = this.setContent.bind(this);
        currentRegion = Design.instance().get('region');
        if ((!fetched && !fetching) || (!regionsMark[currentRegion])) {
          fetching = true;
          regionsMark[currentRegion] = true;
          return this.collection.fetchForce().then(setContent, setContent);
        } else if (!fetching) {
          return this.setContent();
        }
      },
      processReset: function(event, checked) {
        var allNotDefault, that;
        if (checked.length === 1 && !this.collection.findWhere({
          id: checked[0].data.id
        }).isDefault()) {
          this.M$('[data-btn=reset],[data-btn=edit]').prop('disabled', false);
        } else {
          this.M$('[data-btn=reset],[data-btn=edit]').prop('disabled', true);
        }
        that = this;
        allNotDefault = _.every(checked, function(e) {
          var val;
          val = !that.collection.findWhere({
            id: e.data.id
          }).isDefault();
          return val;
        });
        if (checked.length >= 1 && allNotDefault) {
          return window.setTimeout(function() {
            return that.M$('[data-btn=delete]').prop('disabled', false);
          }, 1);
        } else {
          return window.setTimeout(function() {
            return that.M$('[data-btn=delete]').prop('disabled', true);
          }, 1);
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
        _.each(data, function(e) {
          if (e.DBParameterGroupName.indexOf("default.") === 0) {
            return e.isDefault = true;
          }
        });
        dataSet = {
          items: data
        };
        content = template.content(dataSet);
        return (_ref = this.manager) != null ? _ref.setContent(content) : void 0;
      },
      renderSlides: function(which, checked) {
        var slides, tpl, _ref;
        tpl = template['slide_' + which];
        $(".slidebox .content").removeAttr('style');
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
              data.selectedId = checked[0].data.id;
            } else {
              data.selectedCount = checkedAmount;
            }
            return this.manager.setSlide(tpl(data));
          },
          'create': function(tpl) {
            var that;
            this.families = CloudResources(constant.RESTYPE.DBENGINE, Design.instance().get("region"));
            that = this;
            return this.families.fetch().then(function() {
              var data, families;
              families = _.uniq(_.pluck(that.families.toJSON(), "DBParameterGroupFamily"));
              data = {
                families: families
              };
              that.manager.setSlide(tpl(data));
              return $("#property-dbpg-name-create").keyup(function() {
                var disableCreate;
                disableCreate = !$(this).val();
                return that.manager.$el.find('[data-action="create"]').prop('disabled', disableCreate);
              });
            });
          },
          'edit': function(tpl, checked, option) {
            var parameters, target, that;
            if (!checked) {
              return false;
            }
            that = this;
            target = this.collection.findWhere({
              id: checked[0].data.id
            });
            parameters = target.getParameters();
            if (!option) {
              that.manager.setSlide(template.loading());
            }
            return parameters.fetch().then(function(result) {
              if (result.error) {
                that.manager.cancel();
                notification('error', result.awsResult || result.msg);
              }
              that.renderEditTpl(parameters, tpl, option);
              $(".slidebox .content").css({
                "width": "100%",
                "margin-top": "0px"
              });
              return that.bindEditEvent(parameters, tpl, option);
            });
          },
          'reset': function(tpl, checked) {
            var data;
            data = {
              name: checked[0].data.id
            };
            if (!checked) {
              return;
            }
            return this.manager.setSlide(tpl(data));
          }
        };
      },
      renderEditTpl: function(parameters, tpl, option) {
        var data, isMixedValue, isNumberString, that;
        that = this;
        data = parameters.toJSON ? parameters.toJSON() : parameters;
        isNumberString = function(e) {
          return !isNaN(parseFloat(e)) && isFinite(e);
        };
        isMixedValue = function(e) {
          var isMixed, tempArray;
          isMixed = false;
          tempArray = e.split(",");
          _.each(tempArray, function(value) {
            var range;
            range = value.split('-');
            if (range.length = 2 && isNumberString(range[0]) && isNumberString(range[1])) {
              return isMixed = true;
            }
          });
          return isMixed;
        };
        _.each(data, function(e) {
          var _ref;
          if (((_ref = e.AllowedValues) != null ? _ref.split(',').length : void 0) > 1 && !isMixedValue(e.AllowedValues)) {
            e.inputType = "select";
            e.selections = e.AllowedValues.split(",");
          } else {
            e.inputType = "input";
          }
        });
        if (option != null ? option.sort : void 0) {
          data = _.sortBy(data, function(e) {
            var s;
            s = e.ParameterName;
            if (option.sort === "ParameterName") {
              s = e.ParameterName;
            }
            if (option.sort === 'IsModifiable') {
              s = e.IsModifiable;
            }
            if (option.sort === "ApplyType") {
              s = e.ApplyType;
            }
            if (option.sort === "Source") {
              s = e.Source;
            }
            return s;
          });
          $("#parameter-table").html(template.filter({
            data: data
          }));
        }
        if (option != null ? option.filter : void 0) {
          data = _.filter(data, function(e) {
            return (e.ParameterName.toLowerCase().indexOf(option.filter.toLowerCase())) > -1;
          });
          $("#parameter-table").html(template.filter({
            data: data
          }));
        }
        if ((option != null ? option.filter : void 0) || (option != null ? option.sort : void 0)) {
          return false;
        }
        console.log("Rendering....");
        that.manager.setSlide(tpl({
          data: data,
          height: $('.table-head-fix.will-be-covered>div').height() - 76
        }));
        $(".slidebox").css('max-height', "none");
        this.manager.on("slideup", function() {
          return $('.slidebox').removeAttr("style");
        });
        return $(window).on('resize', function() {
          return $("#parameter-table").height($('.table-head-fix.will-be-covered>div').height() - 67).find(".scrollbar-veritical-thumb").removeAttr("style");
        });
      },
      bindFilter: function(parameters, tpl) {
        var filter, sortType, that, _ref, _ref1;
        that = this;
        sortType = (_ref = $("#sort-parameter-name").find(".item.selected")) != null ? (_ref1 = _ref.data()) != null ? _ref1.id : void 0 : void 0;
        filter = $("#pg-filter-parameter-name");
        filter.off('change').on('change', function() {
          var checked, val;
          val = $(this).val();
          checked = [
            {
              data: {
                id: parameters.groupModel.id
              }
            }
          ];
          if (that.filterDelay) {
            window.clearTimeout(that.filterDelay);
          }
          return that.filterDelay = window.setTimeout(function() {
            return (that.getSlides().edit.bind(that))(template.slide_edit, checked, {
              filter: val,
              sort: sortType
            });
          }, 200);
        });
        return $("#sort-parameter-name").on('OPTION_CHANGE', function(event, value, data) {
          sortType = (data != null ? data.id : void 0) || value;
          return filter.trigger('change');
        });
      },
      bindEditEvent: function(parameters, tpl, option) {
        var getChange, that;
        that = this;
        getChange = function() {
          var changeArray;
          changeArray = [];
          parameters.filter(function(e) {
            if (e.has('newValue') && (e.get("newValue") !== e.get("ParameterValue"))) {
              return changeArray.push(e.toJSON());
            }
          });
          return changeArray;
        };
        if (getChange().length) {
          $("[data-action='preview']").prop('disabled', false);
        }
        if (!option) {
          that.bindFilter(parameters, tpl);
        }
        if (!option) {
          $("#pg-filter-parameter-name").keyup(function() {
            return $(this).trigger('change');
          });
        }
        _.each(parameters.models, function(e) {
          var onChange;
          onChange = function() {
            $("[data-action='preview']").prop('disabled', false);
            if (this.value === "<engine-default>" || (this.value === "" && !e.get("ParameterValue"))) {
              e.unset('newValue');
            }
            if (e.isValidValue(this.value) || this.value === "" || (e.isFunctionValue(this.value) && !e.isNumber(this.value))) {
              $(this).removeClass("parsley-error");
              if (this.value !== "") {
                return e.set('newValue', this.value);
              }
            } else {
              return $(this).addClass("parsley-error");
            }
          };
          if (e.attributes.IsModifiable) {
            $(".slidebox").on('change', "[name='" + e.attributes.ParameterName + "']", onChange);
            return $(".slidebox").on('keyup', "[name='" + e.attributes.ParameterName + "']", onChange);
          }
        });
        if (!option) {
          return $("[data-action='preview']").click(function() {
            var data;
            data = getChange();
            _.each(data, function(e) {
              var _ref;
              if (((_ref = e.AllowedValues) != null ? _ref.split(',').length : void 0) > 1) {
                e.inputType = 'select';
                e.selections = e.AllowedValues.split(',');
              } else {
                e.inputType = 'input';
              }
            });
            that.manager.setSlide(tpl({
              data: data,
              preview: true
            }));
            $("#parameter-table").height($('.table-head-fix.will-be-covered>div').height() - 67).find(".scrollbar-veritical-thumb").removeAttr("style");
            $("#rds-pg-save").click(function() {
              return that.modifyParams(parameters, getChange());
            });
            return $("#pg-back-to-edit").click(function() {
              var checked;
              checked = [
                {
                  data: {
                    id: parameters.groupModel.id
                  }
                }
              ];
              return (that.getSlides().edit.bind(that))(tpl, checked);
            });
          });
        }
      },
      modifyParams: function(parameters, change) {
        var afterModify, changeMap;
        changeMap = {};
        _.each(change, function(e) {
          return changeMap[e.ParameterName] = e.newValue;
        });
        _.each(parameters.models, function(d) {
          return d.unset('newValue');
        });
        afterModify = this.afterModify.bind(this);
        this.switchAction('processing');
        return parameters.groupModel.modifyParams(changeMap).then(afterModify, afterModify);
      },
      afterModify: function(result) {
        if ((result != null ? result.error : void 0)) {
          notification('error', sprintf(lang.NOTIFY.PARAMETER_GROUP_UPDATED_FAILED, (result != null ? result.awsResult : void 0) || (result != null ? result.awsErrorCode : void 0) || (result != null ? result.msg : void 0)));
          this.switchAction();
          return false;
        }
        notification('info', lang.NOTIFY.PARAMETER_GROUP_IS_UPDATED);
        return this.manager.cancel();
      },
      doAction: function(action, checked) {
        return this["do_" + action] && this["do_" + action]('do_' + action, checked);
      },
      do_create: function() {
        var afterCreated, data;
        if (!(($('#property-dbpg-name-create').parsley('validate')) && ($('#property-dbpg-desc-create').parsley('validate')))) {
          return false;
        }
        data = {
          "DBParameterGroupName": $("#property-dbpg-name-create").val(),
          'DBParameterGroupFamily': $("#property-family .selection").html().trim(),
          'Description': $('#property-dbpg-desc-create').val()
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
      do_edit: function(invalid, checked) {

        /*
         */
      },
      do_reset: function(invalid, checked) {
        var afterReset, sourceDbpg;
        sourceDbpg = checked[0];
        this.switchAction('processing');
        afterReset = this.afterReset.bind(this);
        return this.collection.findWhere({
          id: sourceDbpg.data.id
        }).resetParams().then(afterReset, afterReset);
      },
      afterCreated: function(result) {
        this.manager.cancel();
        if (result.error) {
          notification('error', sprintf(lang.NOTIFY.CREATE_FAILED_BECAUSE_OF_XXX, result.msg));
          return false;
        }
        return notification('info', lang.NOTIFY.NEW_RDS_PARAMETER_GROUP_IS_CREATED_SUCCESSFULLY);
      },
      afterReset: function(result) {
        var currentRegion;
        currentRegion = Design.instance().get('region');
        this.manager.cancel();
        if (result.error) {
          notification('error', result.awsResult);
          return false;
        }
        return notification('info', lang.NOTIFY.RDS_PARAMETER_GROUP_IS_RESET_SUCCESSFULLY);
      },
      afterDeleted: function(result) {
        deleteCount--;
        if (result.error) {
          deleteErrorCount++;
        }
        if (deleteCount === 0) {
          if (deleteErrorCount > 0) {
            this.manager.error(result.awsResult || deleteErrorCount + " DB Parameter Group(s) failed to delete, please try again later.");
            this.switchAction();
            return deleteErrorCount = 0;
          } else {
            notification('info', lang.NOTIFY.DELETE_SUCCESSFULLY);
            this.manager.unCheckSelectAll();
            deleteErrorCount = 0;
            return this.manager.cancel();
          }
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
      renderDropdown: function() {
        var option, that;
        that = this;
        option = {
          manageBtnValue: lang.PROP.VPC_MANAGE_RDS_PG,
          filterPlaceHolder: lang.PROP.VPC_FILTER_RDS_PG
        };
        this.dropdown = new combo_dropdown(option);
        if (this.resModel && !this.resModel.attributes.pgName) {
          that.dropdown.setSelection("Please Select Parameter Group");
        } else {
          this.dropdown.setSelection(this.resModel.attributes.pgName);
        }
        this.dropdown.on('open', this.initDropdown.bind(this), this);
        this.dropdown.on('manage', this.renderManager.bind(this), this);
        this.dropdown.on('filter', this.filterDropdown.bind(this), this);
        this.dropdown.on('change', this.setParameterGroup.bind(this), this);
        return this.dropdown;
      },
      initDropdown: function() {
        if (App.user.hasCredential()) {
          return this.renderDefault();
        } else {
          return this.renderNoCredential();
        }
      },
      renderDefault: function() {
        if (!this.dropdown) {
          return false;
        }
        if (!fetched) {
          this.renderLoading();
          this.collection.fetch().then((function(_this) {
            return function() {
              return _this.renderDefault();
            };
          })(this));
          fetched = true;
          return false;
        }
        return this.openDropdown();
      },
      renderNoCredential: function() {
        return this.dropdown.render('nocredential').toggleControls(false);
      },
      renderLoading: function() {
        return this.dropdown.render('loading').toggleControls(false);
      },
      openDropdown: function(keys) {
        var content, data, datas, defaultInfo, engineCol, modelData, regionName, selected, targetFamily;
        data = this.collection.toJSON();
        selected = this.resModel.attributes.pgName;
        _.each(data, function(e) {
          if (e.DBParameterGroupName === selected) {
            return e.selected = true;
          }
        });
        datas = {
          keys: data
        };
        if (keys) {
          datas.keys = keys;
        }
        if (Design.instance().modeIsApp() || Design.instance().modeIsAppEdit()) {
          datas.isRunTime = true;
        }
        modelData = this.resModel.attributes;
        regionName = Design.instance().region();
        engineCol = CloudResources(constant.RESTYPE.DBENGINE, regionName);
        if (engineCol) {
          defaultInfo = engineCol.getDefaultByNameVersion(regionName, modelData.engine, modelData.engineVersion);
          targetFamily = defaultInfo.family;
        }
        if (targetFamily) {
          datas.keys = _.filter(datas.keys, function(e) {
            return e.DBParameterGroupFamily === targetFamily;
          });
        }
        content = template.keys(datas);
        this.dropdown.toggleControls(true);
        return this.dropdown.setContent(content);
      },
      filterDropdown: function(keyword) {
        var hitKeys;
        hitKeys = _.filter(this.collection.toJSON(), function(data) {
          return data.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        if (keyword) {
          return this.openDropdown(hitKeys);
        } else {
          return this.openDropdown();
        }
      },
      setParameterGroup: function(value, data) {
        var val;
        val = value || data.id;
        return this.resModel.set("pgName", val);
      },
      getModalOptions: function() {
        var region, regionName, that;
        that = this;
        region = Design.instance().get('region');
        regionName = constant.REGION_SHORT_LABEL[region];
        return {
          title: sprintf(lang.IDE.COMPONENT_RDS_PG_MANAGER_TITLE, regionName),
          slideable: true,
          context: that,
          buttons: [
            {
              icon: 'new-stack',
              type: 'create',
              name: 'Create Parameter Group'
            }, {
              icon: 'edit',
              type: 'edit',
              disabled: true,
              name: ' Edit '
            }, {
              icon: 'reset',
              type: 'reset',
              disabled: true,
              name: 'Reset'
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
              width: "30%",
              name: 'Name',
              rowType: "string"
            }, {
              sortable: true,
              rowType: 'string',
              width: "30%",
              name: 'Family'
            }, {
              sortable: false,
              width: "40%",
              name: 'Description'
            }
          ]
        };
      }
    });
    return DbpgRes;
  });

}).call(this);

define('component/rds_snapshot/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

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
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
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
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"manager-content-sub\">Engine: "
    + escapeExpression(((stack1 = (depth0 && depth0.Engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &nbsp;&nbsp;Size: "
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</div>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
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
  buffer += "\n<tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td><div class=\"manager-content-main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div></td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</td>\n    <td>\n        <div class=\"manager-content-main\">";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.Status), "creating", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        <span class=\"manager-content-sub\">Started: "
    + escapeExpression(((stack1 = (depth0 && depth0.started)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </td>\n    <td class=\"show-detail icon-toolbar-cloudformation\"></td>\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"status status-yellow icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.Status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = (depth0 && depth0.PercentProgress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"status status-green icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.Status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
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
  buffer += escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_DELETE_2", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.selectedCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_DELETE_3", {hash:{},data:data}));
  return buffer;
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_DELETE_1", {hash:{},data:data}))
    + " ";
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


  buffer += "<div class=\"no-credential tac\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_EMPTY", {hash:{},data:data}))
    + "</p>\n</div>";
  return buffer;
  };
TEMPLATE.noinstance=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n            <div class=\"control-group clearfix\">\n                <label for=\"property-snapshot-name-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_NAME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id=\"property-snapshot-name-create\" class=\"input\" type=\"text\" maxlength=\"255\" data-type=\"database\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z][a-zA-Z0-9-]*$\" data-required=\"true\"  placeholder=\"Allow alpha number, _ or - up to 255 characters.\">\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-volume-choose\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_INSTANCE", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div id=\"property-db-instance-choose\"></div>\n                </div>\n            </div>\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"create\" disabled>"
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
    + "</p>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-region-choose\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_DESTINATION_REGION", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div id=\"property-region-choose\"></div>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix\">\n                <label for=\"property-snapshot-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_NEW_NAME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id=\"property-snapshot-name\" class=\"input\" type=\"text\" maxlength=\"255\" data-type=\"domain\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.newCopyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\">\n                </div>\n            </div>\n\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"duplicate\" disabled>"
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
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"detail-info horizontal\">\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_ID", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_VPC_ID", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.VpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_ENGINE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_LICENSE_MODEL", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.LicenseModel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_STATUS", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_STORAGE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_CREATE_TIME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.SnapshotCreateTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_SOURCE_REGION", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.AvailabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n    </div>\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_INSTANCE_NAME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_TYPE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.SnapshotType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_ENGINE_VERSION", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.EngineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_MASTER_USERNAME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.MasterUsername)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.OPTION_GROUP_NAME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PORT", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_INSTANCE_CREATE_TIME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.InstanceCreateTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.detail=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('rds_snapshot',['CloudResources', 'ApiRequest', 'constant', 'combo_dropdown', "UI.modalplus", 'toolbar_modal', "i18n!/nls/lang.js", 'component/rds_snapshot/template'], function(CloudResources, ApiRequest, constant, combo_dropdown, modalPlus, toolbar_modal, lang, template) {
    var deleteCount, deleteErrorCount, fetched, fetching, regionsMark, snapshotRes;
    fetched = false;
    deleteCount = 0;
    deleteErrorCount = 0;
    fetching = false;
    regionsMark = {};
    snapshotRes = Backbone.View.extend({
      constructor: function() {
        this.collection = CloudResources(constant.RESTYPE.DBSNAP, Design.instance().region());
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
      renderDropdown: function() {
        var option, selection;
        option = {
          filterPlaceHolder: lang.PROP.SNAPSHOT_FILTER_VOLUME
        };
        this.dropdown = new combo_dropdown(option);
        this.instances = CloudResources(constant.RESTYPE.DBINSTANCE, Design.instance().region());
        selection = lang.PROP.INSTANCE_SNAPSHOT_SELECT;
        this.dropdown.setSelection(selection);
        this.dropdown.on('open', this.openDropdown, this);
        this.dropdown.on('filter', this.filterDropdown, this);
        this.dropdown.on('change', this.selectSnapshot, this);
        return this.dropdown;
      },
      renderRegionDropdown: function(exceptRegion) {
        var option, selection;
        option = {
          filterPlaceHolder: lang.PROP.SNAPSHOT_FILTER_REGION
        };
        this.regionsDropdown = new combo_dropdown(option);
        this.regions = _.keys(constant.REGION_LABEL);
        if (exceptRegion) {
          this.regions = _.without(this.regions, exceptRegion);
        }
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
        return this.instances.fetch().then((function(_this) {
          return function() {
            var content, data, dataSet;
            data = _this.instances.toJSON();
            if (data.length < 1) {
              _this.dropdown.setContent(template.noinstance());
              return false;
            }
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
      filterDropdown: function(keyword) {
        var hitKeys;
        hitKeys = _.filter(this.instances.toJSON(), function(data) {
          return data.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        if (keyword) {
          return this.openDropdown(hitKeys);
        } else {
          return this.openDropdown();
        }
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
        $("#property-db-instance-choose .selection .manager-content-sub").remove();
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
        this.manager.on("slideup", this.resetSlide, this);
        this.manager.on('action', this.doAction, this);
        this.manager.on('detail', this.detail, this);
        this.manager.on('close', (function(_this) {
          return function() {
            _this.manager.remove();
            return _this.collection.remove();
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
      resetSlide: function() {
        return this.manager.$el.find(".slidebox").removeAttr('style');
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
        _.each(data, function(e, f) {
          if (e.PercentProgress === 100) {
            e.completed = true;
          }
          if (e.SnapshotCreateTime) {
            e.started = (new Date(e.SnapshotCreateTime)).toString();
          }
          return null;
        });
        dataSet = {
          items: data
        };
        content = template.content(dataSet);
        return (_ref = this.manager) != null ? _ref.setContent(content) : void 0;
      },
      initManager: function() {
        var currentRegion, setContent;
        setContent = this.setContent.bind(this);
        currentRegion = Design.instance().get('region');
        if ((!fetched && !fetching) || (!regionsMark[currentRegion])) {
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
            this.manager.setSlide(tpl(data));
            this.dropdown = this.renderDropdown();
            this.manager.$el.find('#property-db-instance-choose').html(this.dropdown.$el);
            return this.manager.$el.find(".slidebox").css('overflow', "visible");
          },
          'duplicate': function(tpl, checked) {
            var data, snapshot;
            data = {};
            data.originSnapshot = checked[0];
            data.region = Design.instance().get('region');
            if (!checked) {
              return;
            }
            data.newCopyName = checked[0].id.split(':').pop() + "-copy";
            snapshot = this.collection.get(checked[0].id);
            console.log(snapshot);
            this.manager.setSlide(tpl(data));
            if (snapshot.isAutomated()) {
              this.regionsDropdown = this.renderRegionDropdown();
            } else {
              this.regionsDropdown = this.renderRegionDropdown(snapshot.collection.region());
            }
            this.regionsDropdown.on('change', (function(_this) {
              return function() {
                return _this.manager.$el.find('[data-action="duplicate"]').prop('disabled', false);
              };
            })(this));
            this.manager.$el.find('#property-region-choose').html(this.regionsDropdown.$el);
            return this.manager.$el.find(".slidebox").css('overflow', "visible");
          }
        };
      },
      doAction: function(action, checked) {
        return this["do_" + action] && this["do_" + action]('do_' + action, checked);
      },
      do_create: function(validate, checked) {
        var afterCreated, data, dbInstance;
        if (!$('#property-snapshot-name-create').parsley('validate')) {
          return false;
        }
        dbInstance = this.instances.findWhere({
          'id': $('#property-db-instance-choose').find('.selectbox .selection .manager-content-main').data('id')
        });
        if (!dbInstance) {
          return false;
        }
        data = {
          "DBSnapshotIdentifier": $("#property-snapshot-name-create").val(),
          'DBInstanceIdentifier': dbInstance.id
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
        var accountNumber, afterDuplicate, newName, sourceSnapshot, targetRegion;
        sourceSnapshot = checked[0];
        targetRegion = $('#property-region-choose').find('.selectbox .selection .manager-content-main').data('id');
        if ((this.regions.indexOf(targetRegion)) < 0) {
          return false;
        }
        this.switchAction('processing');
        newName = this.manager.$el.find('#property-snapshot-name').val();
        afterDuplicate = this.afterDuplicate.bind(this);
        accountNumber = App.user.attributes.account;
        if (!/^\d+$/.test(accountNumber.split('-').join(''))) {
          notification('error', lang.PROP.DB_SNAPSHOT_ACCOUNT_NUMBER_INVALID);
          return false;
        }
        return this.collection.findWhere({
          id: sourceSnapshot.data.id
        }).copyTo(targetRegion, newName).then(afterDuplicate, afterDuplicate);
      },
      afterCreated: function(result, newSnapshot) {
        this.manager.cancel();
        if (result.error) {
          notification('error', sprintf(lang.NOTIFY.DB_SNAPSHOT_CREATE_FAILED, result.msg));
          return false;
        }
        return notification('info', lang.NOTIFY.NEW_SNAPSHOT_IS_CREATED_SUCCESSFULLY);
      },
      afterDuplicate: function(result) {
        var currentRegion;
        currentRegion = Design.instance().get('region');
        this.manager.cancel();
        if (result.error) {
          notification('error', sprintf(lang.NOTIFY.DUPLICATE_FAILED_BECAUSE_OF_XXX, result.awsResult || result.msg));
          return false;
        }
        if (result.attributes.region === currentRegion) {
          this.collection.add(result);
          return notification('info', lang.NOTIFY.DB_SNAPSHOT_DUPLICATE_SUCCESS);
        } else {
          this.initManager();
          return notification('info', lang.NOTIFY.DB_SNAPSHOT_DUPLICATE_SUCCESS_OTHER_REGION);
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
            notification('info', lang.NOTIFY.DB_SNAPSHOT_DELETE_SUCCESS);
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
      detail: function(event, data, $tr) {
        var detailTpl, snapshotData, snapshotId;
        snapshotId = data.id;
        snapshotData = this.collection.get(snapshotId).toJSON();
        detailTpl = template.detail(snapshotData);
        return this.manager.setDetail($tr, detailTpl);
      },
      getModalOptions: function() {
        var region, regionName, that;
        that = this;
        region = Design.instance().get('region');
        regionName = constant.REGION_SHORT_LABEL[region];
        return {
          title: "Manage DB Snapshots in " + regionName,
          slideable: true,
          context: that,
          buttons: [
            {
              icon: 'new-stack',
              type: 'create',
              name: 'Create Snapshot'
            }, {
              icon: 'duplicate',
              type: 'duplicate',
              disabled: true,
              name: 'Duplicate'
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
              width: "30%",
              name: 'Name'
            }, {
              sortable: true,
              rowType: 'number',
              width: "20%",
              name: 'Capicity'
            }, {
              sortable: true,
              rowType: 'datetime',
              width: "40%",
              name: 'status'
            }, {
              sortable: false,
              width: "10%",
              name: 'Detail'
            }
          ]
        };
      }
    });
    return snapshotRes;
  });

}).call(this);


define("component/sharedrescomp", function(){});
