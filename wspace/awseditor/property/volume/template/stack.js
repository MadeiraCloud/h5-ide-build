define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <label for=\"volume-device\">xvd</label>\n            <input class=\"input input-device\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.editName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"volume-device\" data-ignore=\"true\" data-required-rollback=\"true\" maxlength=\"1\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n            ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "disabled";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <label for=\"volume-device\">/dev/</label>\n            <input class=\"input input-device\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.editName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"volume-device\" data-ignore=\"true\" data-required-rollback=\"true\" maxlength=\"5\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n            ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SNAPSHOT", {hash:{},data:data}))
    + "</label>\n        <div id=\"snapshot-info-group\" class=\"clearfix property-block-wrap\" data-uid='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.snapshot_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'>\n            <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.snapshot_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span class=\"mgl5\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.snapshot_size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "GB</span></div>\n            <div><span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.snapshot_desc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n        </div>\n    </section>\n    ";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "class=\"tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_MSG_WARN", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program12(depth0,data) {
  
  
  return "style=\"display:none\"";
  }

function program14(depth0,data) {
  
  
  return "style=\"display:block\"";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <input id=\"iops-ranged\" type=\"text\" class=\"input\" value=\"100\" name=\"iops-ranged\" min=\"100\" max=\"2000\" required=\"\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <input class=\"input\" id=\"iops-ranged\" type=\"text\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"iops-ranged\" min=\"100\" max=\"2000\" required=\"\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            ";
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ENCRYPTED", {hash:{},data:data}))
    + "</label>\n        <div>\n            <div class=\"checkbox\">\n                <input id=\"volume-property-encrypted-check\" type=\"checkbox\" ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.support_encrypted), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.encrypted), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                <label for=\"volume-property-encrypted-check\"></label>\n            </div>\n            <label for=\"volume-property-encrypted-check\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ENCRYPTED_LABEL", {hash:{},data:data}))
    + "</label>\n        </div>\n    </section>\n    ";
  return buffer;
  }
function program21(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program23(depth0,data) {
  
  
  return "checked=\"checked\" ";
  }

  buffer += "<article id='property-panel-volume' data-bind=\"true\" data-focus=\"none\">\n    <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</label>\n        <div class=\"name\">\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.isWin), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </section>\n    <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SIZE", {hash:{},data:data}))
    + "</label>\n        <div class=\"ranged-number-input\">\n            <label for=\"volume-size-ranged\"></label>\n            <input id=\"volume-size-ranged\" type=\"text\" class=\"input\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.volume_size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"volume-size-ranged\" data-ignore=\"true\" maxlength=\"4\" data-required=\"true\" data-required=\"true\" data-type=\"number\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n        <label for=\"volume-property-ranged-number\" >GB</label>\n        </div>\n    </section>\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.snapshot_id), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE", {hash:{},data:data}))
    + "</label>\n        <div class=\"context\" id=\"volume-type-radios\">\n\n            <div>\n                <div class=\"radio\">\n                    <input id=\"radio-standard\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.isStandard), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"standard\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                    <label for=\"radio-standard\"></label>\n                </div>\n                <label for=\"radio-standard\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE_STANDARD", {hash:{},data:data}))
    + "</label>\n            </div>\n\n            <div>\n                <div class=\"radio\">\n                    <input id=\"radio-gp2\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.isGp2), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"gp2\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                    <label for=\"radio-gp2\"></label>\n                </div>\n                <label for=\"radio-gp2\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE_GP2", {hash:{},data:data}))
    + "</label>\n            </div>\n\n            <div ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <div class=\"radio\">\n                    <input id=\"radio-io1\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.isIo1), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"io1\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                    <label for=\"radio-io1\"></label>\n                </div>\n                <label for=\"radio-io1\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE_IO1", {hash:{},data:data}))
    + "</label>\n            </div>\n\n        </div>\n    </section>\n\n    <section class=\"property-control-group\" id=\"iops-group\" ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.isIo1), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <label>IOPS</label>\n        <div class=\"ranged-number-input\">\n            <label for=\"iops-ranged\"></label>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.isStandard), {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <label for=\"volume-property-ranged-number\" ></label>\n        </div>\n    </section>\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.displayEncrypted), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });