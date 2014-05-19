define('component/kp/kpTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.keyName), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                "
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            ";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n                Select Key Pair as $DefaultKeyPair\n            ";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            "
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultKey), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noKey), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_NO_KP", {hash:{},data:data}))
    + "\"></i>\n            ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"manage-kp btn btn-primary\" style=\"display:none;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_MANAGE_KP", {hash:{},data:data}))
    + "</div>\n        ";
  return buffer;
  }

  buffer += "<div class=\"selectbox keypair-select\">\n    <div class=\"selection\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRunTime), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n    </div>\n    <div style=\"height: 300px; width:260px;\" class=\"dropdown scroll-wrap scrollbar-auto-hide  clearfix\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"scroll-content\" id=\"kp-content\">\n        </div>\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRunTime), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <input class=\"input keypair-filter\" type=\"text\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_FILTER_KP", {hash:{},data:data}))
    + "\"/>\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRunTime), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <li data-id=\"@no\" class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noKey), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" tabindex=\"-1\">\n            "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_NO_KP", {hash:{},data:data}))
    + "\n            <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_NO_KP", {hash:{},data:data}))
    + "\"></i>\n        </li>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li data-id=\"@default\" class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultKey), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" tabindex=\"-1\">\n            "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_DEFAULT_KP", {hash:{},data:data}))
    + "\n            <i class=\"icon-info tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_DEFAULT_KP", {hash:{},data:data}))
    + "'></i>\n        </li>\n        ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return " selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-fingerprint=\""
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        </li>\n    ";
  return buffer;
  }

  buffer += "<ul id=\"kp-list\">\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideDefaultNoKey), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n";
  return buffer;
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"kp-no-credential tac\">\n    <p>You are using a demo AWS account.</p>\n    <a class=\"show-credential\">Provide AWS Credential <br/>to manage key pairs</a>\n</div>\n\n";
  };
TEMPLATE.nocredential=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner loading-spinner-small\"></div>\n\n";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('component/kp/kpDialogTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                        <tr class=\"item\" data-id=\"\">\n                                            <td>\n                                                <div class=\"checkbox\">\n                                                    <input id=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n                                                    <label for=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n                                                </div>\n                                            </td>\n                                            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                                            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                                        </tr>\n                                        ";
  return buffer;
  }

  buffer += "<div id=\"modal-kp-manage\" class=\"modal-toolbar\">\n    <div class=\"modal-header\">\n        <h3>Manage Key Pairs in "
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n        <i class=\"modal-close\">×</i>\n    </div>\n\n    <div class=\"modal-body\">\n        <div class=\"content-wrap\">\n            <div class=\"toolbar\">\n                <button class=\"icon-new-stack btn btn-blue\" id=\"kp-create\">Create Key Pair</button>\n                <div class=\"btn-group\">\n                    <button class=\"icon-import tooltip\" id=\"kp-import\" data-tooltip=\"\">Import Key Pair</button>\n                    <button class=\"icon-del tooltip\" id=\"kp-delete\" data-tooltip=\"\" disabled>Delete</button>\n                    <button class=\"icon-refresh tooltip\" id=\"kp-refresh\" data-tooltip=\"\"></button>\n                </div>\n            </div>\n            <div class=\"list\">\n                <div class=\"slidebox\">\n                    <div class=\"content clearfix\">\n                    </div>\n                    <div class=\"error\">\n                        something wrong\n                    </div>\n                </div>\n                <div class=\"table-head-fix\">\n                        <table class=\"table-head\">\n                            <thead>\n                                <tr>\n                                    <th>\n                                        <div class=\"checkbox\">\n                                            <input id=\"kp-select-all\" type=\"checkbox\" value=\"None\">\n                                            <label for=\"kp-select-all\"></label>\n                                        </div>\n                                    </th>\n                                    <th class=\"sortable\">Name</th>\n                                    <th>Fingerprint</th>\n                                </tr>\n                            </thead>\n                        </table>\n                        <div class=\"scroll-wrap\">\n                            <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                            <div class=\"scroll-content\" style=\"display:block;\">\n                                <table class=\"table\">\n                                    <thead>\n                                        <tr>\n                                            <th><div class=\"th-inner\"></div></th>\n                                            <th><div class=\"th-inner\"></div></th>\n                                            <th><div class=\"th-inner\"></div></th>\n                                        </tr>\n                                    </thead>\n                                    <tbody id=\"community_ami_table\">\n                                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n\n            </div>\n        </div>\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\"\">\n    <td class=\"ami-table-fav\">\n        <div class=\"checkbox\">\n            <input id=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td class=\"ami-table-id\">"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td class=\"ami-table-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n</tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>\n\n";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"before-create\">\n        <label for=\"create-kp-name\">Key Pair Name</label>\n        <input class=\"input\" type=\"text\" id=\"create-kp-name\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z0-9,_-]*$\" data-required=\"true\" maxlength=\"255\" placeholder=\"allow alphanumber, _ or - up to 255 characters\">\n    </div>\n    <div class=\"after-create hide\">Key pair <span></span> is created. You have to download the private key file (*.pem file) before you can continue. Store it in a secure and accessible location. You will not be able to download the file again after it's created.</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-blue do-action\" data-action=\"create\">Create</button>\n        <button class=\"btn btn-silver cancel\">Cancel</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>Creating...</button>\n    </div>\n    <div class=\"download action\" style=\"display:none;\">\n        <a class=\"btn btn-blue do-action pulse\" data-action=\"download\" id=\"download-kp\">Download</a>\n        <button class=\"btn btn-silver cancel\" disabled>Close</button>\n    </div>\n</div>\n\n";
  };
TEMPLATE.slideCreate=Handlebars.template(__TEMPLATE__);


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
TEMPLATE.slideDelete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"slide-import\" data-bind=\"true\">\n    <label for=\"import-kp-name\">Key Pair Name</label>\n    <input class=\"input\" type=\"text\" id=\"import-kp-name\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z0-9,_-]*$\" data-required=\"true\" maxlength=\"255\" placeholder=\"allow alphanumber, _ or - up to 255 characters\">\n    <div class=\"import-zone\">\n\n    </div>\n    <div class=\"init action\">\n        <button class=\"btn\" disabled>Import</button>\n        <button class=\"btn btn-silver cancel\">Cancel</button>\n    </div>\n    <div class=\"ready action\" style=\"display:none;\">\n        <button class=\"btn btn-blue do-action\" data-action=\"import\">Import</button>\n        <button class=\"btn btn-silver cancel\">Cancel</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>Importing...</button>\n    </div>\n</div>\n\n";
  };
TEMPLATE.slideImport=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"upload-kp-component drop-zone\">\n    <p class=\"upload-stuff\">\n        Drop "
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ",\n        <label for=\"modal-import\" class=\"select-file-link\">select a file</label>\n        <span class=\"display-empty\">or paste the key content here.</span>\n        <span class=\"display-filled\" style=\"display:none;\">or paste the key content again to update.</span>\n        <input type=\"file\" id=\"modal-import\">\n    </p>\n    <p class=\"key-content\"></p>\n</div>\n\n\n\n";
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
  define('component/kp/kpView',['./kpTpl', './kpDialogTpl', 'kp_upload', 'backbone', 'jquery', 'constant', 'component/exporter/JsonExporter', 'UI.notification'], function(template, template_modal, upload, Backbone, $, constant, JsonExporter) {
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
            this.$('.cancel').prop('disabled', false);
          }
        } else {
          if (this.__needDownload) {
            notification('warning', 'You must download the keypair.');
          }
        }
        return this.__needDownload;
      },
      initialize: function() {
        return this.model.on('change:keys', function() {
          if (this.$('.scroll-content').length) {
            return this.renderKeys();
          } else {
            return this.render(true);
          }
        }, this);
      },
      render: function(refresh) {
        var data, region;
        data = this.model.toJSON();
        region = Design.instance().get('region');
        data.regionName = constant.REGION_SHORT_LABEL[region];
        this.$el.html(template_modal.frame(data));
        if (!refresh) {
          this.open();
        }
        return this;
      },
      renderKeys: function() {
        this.$('.scroll-content tbody').html(template_modal.keys(this.model.toJSON()));
        return this;
      },
      renderLoading: function() {
        this.$('.content-wrap').html(template_modal.loading);
        return this;
      },
      stopPropagation: function(event) {
        var exception;
        exception = '.sortable, #download-kp';
        if (!$(event.target).is(exception)) {
          return event.stopPropagation();
        }
      },
      open: function() {
        modal(this.el);
        return $('#modal-wrap').click(this.stopPropagation);
      },
      showErr: function(msg) {
        return this.$('.error').text(msg).show();
      },
      hideErr: function() {
        return this.$('.error').hide();
      },
      events: {
        'click .modal-close': 'close',
        'change #kp-select-all': 'checkAll',
        'change .one-cb': 'checkOne',
        'click #download-kp': 'downloadKp',
        'click #kp-create': 'renderCreate',
        'click #kp-import': 'renderImport',
        'click #kp-delete': 'renderDelete',
        'click #kp-refresh': 'refresh',
        'click .do-action': 'doAction',
        'click .cancel': 'cancel'
      },
      downloadKp: function() {
        return this.__downloadKp && this.__downloadKp();
      },
      doAction: function(event) {
        var action;
        this.hideErr();
        action = $(event.currentTarget).data('action');
        return this[action] && this[action](this.validate(action));
      },
      validate: function(action) {
        switch (action) {
          case 'create':
            return !this.$('#create-kp-name').parsley('validate');
          case 'import':
            return !this.$('#import-kp-name').parsley('validate');
        }
      },
      switchAction: function(state) {
        if (!state) {
          state = 'init';
        }
        return this.$('.slidebox .action').each(function() {
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
            that.$('#kp-select-all').get(0).checked = false;
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
          keyName = this.$('#create-kp-name').val();
          this.switchAction('processing');
          return this.model.create(keyName).then(function(res) {
            console.log(res);
            that.needDownload(true);
            that.genDownload("" + res.keyName + ".pem", res.keyMaterial);
            that.switchAction('download');
            that.$('.before-create').hide();
            return that.$('.after-create').find('span').text(res.keyName).end().show();
          })["catch"](function(err) {
            console.log(err);
            that.showErr(err.error_message);
            return that.switchAction();
          });
        }
      },
      download: function() {
        this.needDownload(false);
        return true;
      },
      "delete": function(invalid) {
        var $checked, count, onDeleteFinish, that;
        $checked = this.$('.one-cb:checked');
        count = $checked.length;
        onDeleteFinish = this.genDeleteFinish(count);
        this.switchAction('processing');
        that = this;
        return $checked.each(function() {
          return that.model.remove($(this).data('name')).then(onDeleteFinish, onDeleteFinish);
        });
      },
      "import": function(invalid) {
        var keyName, that;
        that = this;
        if (!invalid) {
          keyName = this.$('#import-kp-name').val();
          this.switchAction('processing');
          return this.model["import"](keyName, btoa(that.__upload.getData())).then(function(res) {
            console.log(res);
            notification('info', "" + keyName + " is imported.");
            return that.cancel();
          })["catch"](function(err) {
            console.log(err);
            that.showErr(err.error_message);
            return that.switchAction('ready');
          });
        }
      },
      cancel: function() {
        return this.preSlide();
      },
      refresh: function() {
        if (!this.needDownload()) {
          this.model.getKeys();
          return this.renderLoading();
        }
      },
      renderSlide: function(html) {
        this.$('.slidebox .content').html(html);
        this.hideErr();
        return this;
      },
      preSlide: function(type) {
        var $content, $slidebox, currentType, that;
        if (this.needDownload()) {
          return false;
        }
        that = this;
        $content = this.$('.content-wrap');
        $slidebox = this.$('.slidebox');
        currentType = $content.hasClass("show-" + type);
        if (type === 'delete' && !currentType) {
          this.$('input[type=checkbox]').prop('disabled', true);
        } else {
          this.$('input[type=checkbox]').prop('disabled', false);
        }
        if (!currentType) {
          $content.removeClass('show-create show-import show-delete');
          _.each(['create', 'delete', 'import'], function(action) {
            if (action === type) {
              return that.$("#kp-" + action).addClass('active');
            } else {
              return that.$("#kp-" + action).removeClass('active');
            }
          });
          if (type) {
            $content.addClass("show-" + type);
            $slidebox.addClass('show');
          } else {
            $slidebox.removeClass('show');
          }
        } else {
          $content.removeClass('show-create show-import show-delete');
          $slidebox.removeClass('show');
          that.$("#kp-" + type).removeClass('active');
        }
        return !currentType;
      },
      renderCreate: function() {
        var data, html, tpl;
        if (this.preSlide('create')) {
          tpl = template_modal.slideCreate;
          data = {};
          html = tpl(data);
          return this.renderSlide(html);
        }
      },
      renderDelete: function() {
        var $checked, checkedAmount, data, html, tpl;
        $checked = this.$('.one-cb:checked');
        checkedAmount = $checked.length;
        if (!checkedAmount) {
          return;
        }
        if (this.preSlide('delete')) {
          tpl = template_modal.slideDelete;
          data = {};
          if (checkedAmount === 1) {
            data.selecteKeyName = $checked.data('name');
          } else {
            data.selectedCount = checkedAmount;
          }
          html = tpl(data);
          return this.renderSlide(html);
        }
      },
      renderImport: function() {
        var data, html, tpl;
        if (this.preSlide('import')) {
          tpl = template_modal.slideImport;
          data = {};
          html = tpl(data);
          this.renderSlide(html);
          this.__upload && this.__upload.remove();
          this.__upload = new upload();
          this.__upload.on('load', this.afterImport, this);
          return this.$('.import-zone').html(this.__upload.render().el);
        }
      },
      afterImport: function(result) {
        return this.switchAction('ready');
      },
      checkOne: function(event) {
        var cbAll, cbAmount, checkedAmount;
        this.processDelBtn();
        cbAll = this.$('#kp-select-all');
        cbAmount = this.model.get('keys').length;
        checkedAmount = this.$('.one-cb:checked').length;
        if (checkedAmount === cbAmount) {
          return cbAll.prop('checked', true);
        } else if (cbAmount - checkedAmount === 1) {
          return cbAll.prop('checked', false);
        }
      },
      checkAll: function(event) {
        this.processDelBtn();
        if (event.currentTarget.checked) {
          return this.$('input[type="checkbox"]').prop('checked', true);
        } else {
          return this.$('input[type="checkbox"]').prop('checked', false);
        }
      },
      processDelBtn: function() {
        var that;
        that = this;
        return _.defer(function() {
          if (that.$('input:checked').length) {
            return that.$('#kp-delete').prop('disabled', false);
          } else {
            return that.$('#kp-delete').prop('disabled', true);
          }
        });
      },
      close: function(event) {
        if (this.needDownload()) {
          return false;
        }
        $('#modal-wrap').off('click', this.stopPropagation);
        modal.close();
        this.remove();
        return false;
      }
    });
    return Backbone.View.extend({
      tagName: 'section',
      events: {
        'click .keypair-filter': 'returnFalse',
        'click .manage-kp': 'manageKp',
        'click .show-credential': 'showCredential',
        'OPTION_SHOW .selectbox': 'show',
        'OPTION_CHANGE .selectbox': 'setKey',
        'keyup .keypair-filter': 'filter'
      },
      showCredential: function() {
        return App.showSettings(App.showSettings.TAB.Credential);
      },
      filter: function(event) {
        var hitKeys, keyword, len;
        keyword = event.currentTarget.value;
        len = keyword.length;
        hitKeys = _.filter(this.model.get('keys'), function(k) {
          return k.keyName.slice(0, len).toLowerCase() === keyword;
        });
        return this.renderKeys(hitKeys);
      },
      setKey: function(event, name, data) {
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
      returnFalse: function(event) {
        return false;
      },
      manageKp: function(event) {
        this.renderModal();
        return false;
      },
      initialize: function(options) {
        this.model.on('change:keys', this.renderKeys, this);
        this.model.on('request:error', this.syncErrorHandler, this);
        if (!this.model.resModel) {
          return this.__mode = 'runtime';
        }
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
        this.renderFrame();
        return this;
      },
      renderLoading: function() {
        this.$('#kp-content').html(template.loading);
        return this.toggleKpListControls(false);
      },
      renderNoCredential: function() {
        this.$('#kp-content').html(template.nocredential);
        this.toggleKpListControls(false);
        return this;
      },
      toggleKpListControls: function(showOrHide) {
        return this.$('.keypair-filter, .manage-kp').toggle(showOrHide);
      },
      syncErrorHandler: function(err) {
        return console.error(err);
      },
      renderKeys: function(data) {
        if (data) {
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
        this.$('#kp-content').html(template.keys(data));
        this.toggleKpListControls(true);
        this.showManageBtn();
        return this;
      },
      renderFrame: function() {
        var data;
        data = this.model.toJSON();
        if (data.keyName === '$DefaultKeyPair') {
          data.defaultKey = true;
        } else if (data.keyName === 'No Key Pair') {
          data.noKey = true;
        }
        data.isRunTime = this.__mode === 'runtime';
        return this.$el.html(template.frame(data));
      },
      renderModal: function() {
        return new modalView({
          model: this.model
        }).render();
      },
      showManageBtn: function() {
        return this.$('.manage-kp').show();
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
        if (arguments.length === 1) {
          return this.trigger("change:" + key);
        } else {
          this.set(key, value);
          if (_.isEqual(this.get(key), value)) {
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

