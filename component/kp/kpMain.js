define('component/kp/kpTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

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
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_NO_KP", {hash:{},data:data}))
    + "\"></i>\n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRunTime), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
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
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_NO_KP", {hash:{},data:data}))
    + "\n        <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_NO_KP", {hash:{},data:data}))
    + "\"></i>\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li data-id=\"@default\" class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultKey), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" tabindex=\"-1\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_DEFAULT_KP", {hash:{},data:data}))
    + "\n        <i class=\"icon-info tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_DEFAULT_KP", {hash:{},data:data}))
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
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('component/kp/kpDialogTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

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
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n";
  return buffer;
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\"\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n</tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.keys_backup=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>\n\n";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"before-create\">\n        <label for=\"create-kp-name\">Key Pair Name</label>\n        <input class=\"input\" type=\"text\" id=\"create-kp-name\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z0-9,_-]*$\" data-required=\"true\" maxlength=\"255\" placeholder=\"allow alphanumber, _ or - up to 255 characters\" autofocus>\n    </div>\n    <div class=\"after-create hide\">Key pair <span></span> is created. You have to download the private key file (*.pem file) before you can continue. Store it in a secure and accessible location. You will not be able to download the file again after it's created.</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-blue do-action\" data-action=\"create\">Create</button>\n        <button class=\"btn btn-silver cancel\">Cancel</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>Creating...</button>\n    </div>\n    <div class=\"download action\" style=\"display:none;\">\n        <a class=\"btn btn-blue do-action pulse\" data-action=\"download\" id=\"download-kp\">Download</a>\n        <button class=\"btn btn-silver cancel\" disabled>Close</button>\n    </div>\n</div>\n\n";
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
  buffer += "selected "
    + escapeExpression(((stack1 = (depth0 && depth0.selectedCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " key pairs";
  return buffer;
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">Confirm to delete ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selecteKeyName), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "?</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">Delete</button>\n        <button class=\"btn btn-silver cancel\">Cancel</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>Deleting...</button>\n    </div>\n</div>\n";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"slide-import\" data-bind=\"true\">\n    <label for=\"import-kp-name\">Key Pair Name</label>\n    <input class=\"input\" type=\"text\" id=\"import-kp-name\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z0-9,_-]*$\" data-required=\"true\" maxlength=\"255\" placeholder=\"allow alphanumber, _ or - up to 255 characters\">\n    <div class=\"import-zone\">\n\n    </div>\n    <div class=\"init action\">\n        <button class=\"btn\" disabled>Import</button>\n        <button class=\"btn btn-silver cancel\">Cancel</button>\n    </div>\n    <div class=\"ready action\" style=\"display:none;\">\n        <button class=\"btn btn-blue do-action\" data-action=\"import\">Import</button>\n        <button class=\"btn btn-silver cancel\">Cancel</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>Importing...</button>\n    </div>\n</div>\n\n";
  };
TEMPLATE.slide_import=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"upload-kp-component drop-zone\">\n    <p class=\"upload-stuff\">\n        Drop "
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ",\n        <label for=\"modal-import\" class=\"select-file-link\">select a file</label>\n        <span class=\"display-empty\">or paste the key content here.</span>\n        <span class=\"display-filled\" style=\"display:none;\">or paste the key content again to update.</span>\n        <input type=\"file\" id=\"modal-import\">\n    </p>\n    <p class=\"key-content\"></p>\n</div>\n\n\n\n\n";
  return buffer;
  };
TEMPLATE.upload=Handlebars.template(__TEMPLATE__);


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
        return reader.onerror = function() {
          that.trigger('error');
          return null;
        };
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
  define('component/kp/kpView',['combo_dropdown', 'toolbar_modal', './kpTpl', './kpDialogTpl', 'kp_upload', 'backbone', 'jquery', 'constant', 'component/exporter/JsonExporter', 'i18n!nls/lang.js', 'UI.notification'], function(combo_dropdown, toolbar_modal, template, template_modal, upload, Backbone, $, constant, JsonExporter, lang) {
    var download, modalView;
    download = JsonExporter.download;
    modalView = Backbone.View.extend({
      __needDownload: false,
      __upload: null,
      __import: '',
      __mode: 'normal',
      needDownload: function() {
        if (arguments.length === 1) {
          this.__needDownload = arguments[0];
          if (arguments[0] === false) {
            this.m$('.cancel').prop('disabled', false);
          }
        } else {
          if (this.__needDownload) {
            notification('warning', 'You must download the keypair.');
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
              name: 'Create Key Pair'
            }, {
              icon: 'import',
              type: 'import',
              name: 'Import Key Pair'
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
              width: "100px",
              name: 'Name'
            }, {
              sortable: false,
              width: "100px",
              name: 'Fingerprint'
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
      initialize: function() {
        this.initModal();
        return this.model.on('change:keys', this.renderKeys, this);
      },
      renderModal: function() {
        this.modal.render();
        this.renderKeys();
        return this;
      },
      render: function(refresh) {
        this.renderModal();
        return this;
      },
      renderKeys: function() {
        var data;
        data = this.model.toJSON();
        this.modal.setContent(template_modal.keys(data));
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
            return !this.m$('#create-kp-name').parsley('validate');
          case 'import':
            return !this.m$('#import-kp-name').parsley('validate');
        }
      },
      switchAction: function(state) {
        if (!state) {
          state = 'init';
        }
        return this.m$('.slidebox .action').each(function() {
          if ($(this).hasClass(state)) {
            return $(this).show();
          } else {
            return $(this).hide();
          }
        });
      },
      genDownload: function(name, str) {
        this.__downloadKp = function() {
          var blob;
          if ($("body").hasClass("safari")) {
            blob = null;
          } else {
            blob = new Blob([str]);
          }
          if (!blob) {
            return {
              data: "data://text/plain;," + str,
              name: name
            };
          }
          download(blob, name);
          return null;
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
            notification('info', "" + success[0].param[4] + " is deleted.");
          } else if (success.length > 1) {
            notification('info', "Selected " + success.length + " key pairs are deleted.");
          }
          that.processDelBtn();
          if (!that.model.get('keys').length) {
            that.m$('#kp-select-all').get(0).checked = false;
          }
          return _.each(error, function(s) {
            return console.log(s);
          });
        });
        return function(res) {
          if (!res.is_error) {
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
          keyName = this.m$('#create-kp-name').val();
          this.switchAction('processing');
          return this.model.create(keyName).then(function(res) {
            console.log(res);
            that.needDownload(true);
            that.genDownload("" + res.keyName + ".pem", res.keyMaterial);
            that.switchAction('download');
            that.m$('.before-create').hide();
            return that.m$('.after-create').find('span').text(res.keyName).end().show();
          })["catch"](function(err) {
            console.log(err);
            that.modal.error(err.error_message);
            return that.switchAction();
          });
        }
      },
      download: function() {
        this.needDownload(false);
        return this.__downloadKp && this.__downloadKp();
      },
      "delete": function(invalid, checked) {
        var count, onDeleteFinish, that;
        count = checked.length;
        onDeleteFinish = this.genDeleteFinish(count);
        this.switchAction('processing');
        that = this;
        return _.each(checked, function(c) {
          return that.model.remove(c.data['name']).then(onDeleteFinish, onDeleteFinish);
        });
      },
      "import": function(invalid) {
        var keyContent, keyName, that;
        that = this;
        if (!invalid) {
          keyName = this.m$('#import-kp-name').val();
          this.switchAction('processing');
          try {
            keyContent = btoa(that.__upload.getData());
          } catch (_error) {
            this.modal.error('Key is not in valid OpenSSH public key format');
            that.switchAction('init');
            return;
          }
          return this.model["import"](keyName, keyContent).then(function(res) {
            console.log(res);
            notification('info', "" + keyName + " is imported.");
            return that.cancel();
          })["catch"](function(err) {
            console.log(err);
            that.modal.error(err.error_message);
            return that.switchAction('ready');
          });
        }
      },
      cancel: function() {
        return this.modal.cancel();
      },
      refresh: function() {
        if (!this.needDownload()) {
          return this.model.getKeys();
        }
      },
      renderSlides: function(which, checked) {
        var slides, tpl, _ref;
        tpl = template_modal["slide_" + which];
        slides = this.getSlides();
        return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
      },
      getSlides: function() {
        var modal, that, __upload;
        that = this;
        modal = this.modal;
        __upload = this.__upload;
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
              data.selecteKeyName = checked[0].data['name'];
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
            return that.m$('.import-zone').html(that.__upload.render().el);
          }
        };
      },
      afterImport: function(result) {
        return this.switchAction('ready');
      }
    });
    return Backbone.View.extend({
      showCredential: function() {
        return App.showSettings(App.showSettings.TAB.Credential);
      },
      filter: function(keyword) {
        var hitKeys, len;
        len = keyword.length;
        hitKeys = _.filter(this.model.get('keys'), function(k) {
          return k.keyName.slice(0, len).toLowerCase() === keyword;
        });
        if (keyword) {
          return this.renderKeys(hitKeys);
        } else {
          return this.renderKeys();
        }
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
            return this.model.setKey('', true);
          } else if (name === '@no') {
            return this.model.setKey('');
          } else {
            return this.model.setKey(name);
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
          manageBtnValue: lang.ide.PROP_INSTANCE_MANAGE_KP,
          filterPlaceHolder: lang.ide.PROP_INSTANCE_FILTER_KP
        };
        if (this.__mode === 'runtime') {
          options.noManage = true;
        }
        this.dropdown = new combo_dropdown(options);
        this.dropdown.on('open', this.show, this);
        this.dropdown.on('manage', this.manageKp, this);
        this.dropdown.on('change', this.setKey, this);
        return this.dropdown.on('filter', this.filter, this);
      },
      initialize: function(options) {
        this.model.on('change:keys', this.renderKeys, this);
        this.model.on('request:error', this.syncErrorHandler, this);
        if (!this.model.resModel) {
          this.__mode = 'runtime';
        }
        return this.initDropdown();
      },
      show: function() {
        if (App.user.hasCredential()) {
          if (!this.model.haveGot()) {
            this.renderLoading();
            return this.model.getKeys();
          }
        } else {
          return this.renderNoCredential();
        }
      },
      render: function() {
        this.renderDropdown();
        this.el = this.dropdown.el;
        return this;
      },
      renderLoading: function() {
        return this.dropdown.render('loading').toggleControls(false);
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
            keys: this.model.get('keys')
          };
        }
        if (this.model.resModel) {
          if (this.model.resModel.isNoKey()) {
            data.noKey = true;
          }
          if (this.model.resModel.isDefaultKey()) {
            data.defaultKey = true;
          }
        }
        data.isRunTime = this.__mode === 'runtime';
        this.dropdown.setContent(template.keys(data));
        this.dropdown.toggleControls(true);
        return this;
      },
      renderDropdown: function() {
        var data, selection;
        data = this.model.toJSON();
        if (data.keyName === '$DefaultKeyPair') {
          data.defaultKey = true;
        } else if (data.keyName === 'No Key Pair') {
          data.noKey = true;
        }
        data.isRunTime = this.__mode === 'runtime';
        selection = template.selection(data);
        return this.dropdown.setSelection(selection);
      },
      renderModal: function() {
        return new modalView({
          model: this.model
        }).render();
      }
    });
  });

}).call(this);

(function() {
  define('component/kp/kpModel',['constant', 'backbone', 'underscore', 'MC', 'keypair_service', 'Design'], function(constant, Backbone, _, MC, keypair_service, Design) {
    var errorHandler, filterIllegal, packErrorMsg, request, setSelectedKey, successHandler;
    request = function(api, name, data) {
      var args, region, session, username;
      username = $.cookie("usercode");
      session = $.cookie("session_id");
      region = Design.instance().region();
      args = [null, username, session, region];
      if (arguments.length > 1) {
        args.push(name);
      }
      if (arguments.length > 2) {
        args.push(data);
      }
      return keypair_service[api].apply(null, args);
    };
    successHandler = function(context) {
      return function(res) {
        if (res.is_error) {
          throw res;
        } else {
          return res.resolved_data || res;
        }
      };
    };
    errorHandler = function(context) {
      return function(err) {
        err = packErrorMsg(err);
        context.trigger('request:error', err);
        throw err;
      };
    };
    packErrorMsg = function(err) {
      var msg;
      msg = err.error_message;
      if (err.error_message) {
        if (msg.indexOf('Length exceeds maximum of 2048') !== -1) {
          msg = 'Length exceeds maximum of 2048';
        }
      }
      err.error_message = msg;
      return err;
    };
    setSelectedKey = function(keys, name) {
      _.each(keys, function(key) {
        if (key.keyName === name) {
          return key.selected = true;
        }
      });
      return keys;
    };
    filterIllegal = function(keys) {
      return _.reject(keys, function(k) {
        return k.keyName[0] === '@';
      });
    };
    return Backbone.Model.extend({
      defaults: {
        keys: [],
        deleting: null,
        creating: null,
        keyName: '',
        defaultKey: null
      },
      __haveGot: false,
      initialize: function(options) {
        this.resModel = options.resModel;
        if (this.resModel) {
          return this.set('keyName', this.resModel.getKeyName());
        }

        /*
        else
            KpModel = Design.modelClassForType( constant.RESTYPE.KP )
            defaultKp = KpModel.getDefaultKP()
            @set 'keyName', defaultKp.get( 'appId' )
         */
      },
      haveGot: function() {
        if (arguments.length === 1) {
          this.__haveGot = arguments[0];
        }
        return this.__haveGot;
      },
      setKey: function(name, defaultKey) {
        if (this.resModel) {
          return this.resModel.setKey(name, defaultKey);
        }
      },
      settle: function(key, value) {
        var originKeys;
        if (arguments.length === 1) {
          return this.trigger("change:" + key);
        } else {
          originKeys = this.get('keys');
          this.set(key, value);
          if (_.isEqual(originKeys, value)) {
            return this.trigger("change:" + key);
          }
        }
      },
      getKeys: function() {
        var that;
        that = this;
        this.haveGot(true);
        return this.list().then(function(res) {
          var keyName, keys;
          console.log('-----result-----');
          if (that.resModel) {
            keyName = that.resModel.getKeyName();
          }

          /*
          else
              keyName = that.get 'keyName'
           */
          if (_.isArray(res)) {
            keys = filterIllegal(res);
            keys = setSelectedKey(keys, keyName);
          } else {
            keys = res.resolved_data;
          }
          return that.settle('keys', keys || []);
        }, function(err) {
          return that.settle('keys', []);
        });
      },
      list: function() {
        return request('DescribeKeyPairs', null, null).then(successHandler(this)).fail(errorHandler(this));
      },
      "import": function(name, data) {
        var that;
        that = this;
        return request('ImportKeyPair', name, data).then(successHandler(this)).fail(errorHandler(this)).then(function(res) {
          var keys;
          keys = that.get('keys');
          keys.unshift(res);
          that.settle('keys');
          return res;
        });
      },
      create: function(name) {
        var that;
        that = this;
        return request('CreateKeyPair', name).then(successHandler(this)).fail(errorHandler(this)).then(function(res) {
          var keys;
          keys = that.get('keys');
          keys.unshift(res);
          that.settle('keys');
          return res;
        });
      },
      remove: function(name) {
        var that;
        that = this;
        return request('DeleteKeyPair', name).then(successHandler(this)).fail(errorHandler(this)).then(function(res) {
          var keyName, keys;
          keys = that.get('keys');
          keyName = res.param[4];
          that.set('keys', _.reject(keys, function(k) {
            return k.keyName === keyName;
          }));
          return res;
        });
      },
      download: function(name) {
        return request('download', name).then(function(res) {
          return console.log(res);
        }, function(err) {
          return console.log(err);
        });
      }
    });
  });

}).call(this);

(function() {
  define('kp',['./component/kp/kpView', './component/kp/kpModel', 'constant'], function(View, Model, constant) {
    var hasResourceWithDefaultKp, load, unload;
    load = function(resModel) {
      var model, view;
      model = new Model({
        resModel: resModel
      });
      view = new View({
        model: model
      });
      return view.render();
    };
    unload = function() {
      view.remove();
      return model.destroy();
    };
    hasResourceWithDefaultKp = function() {
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
    };
    return {
      load: load,
      unload: unload,
      hasResourceWithDefaultKp: hasResourceWithDefaultKp
    };
  });

}).call(this);

