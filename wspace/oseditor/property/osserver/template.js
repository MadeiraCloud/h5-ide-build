define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                <option value='"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "' ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.id), (depth1 && depth1.imageId), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n            ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "selected='selected'";
  }

function program6(depth0,data) {
  
  
  return "selected=\"selected\"";
  }

function program8(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program10(depth0,data) {
  
  
  return "style=\"display: none\"";
  }

function program12(depth0,data) {
  
  
  return "disabled=\"disabled\" placeholder=\"User Data is disabled to allow installing OpsAgent for VisualOps.\"";
  }

function program14(depth0,data) {
  
  
  return "true";
  }

function program16(depth0,data) {
  
  
  return "false";
  }

  buffer += "<div class=\"option-group-head expand\">\n    Server Details\n</div>\n<div class=\"option-group\">\n    <section class=\"group required\">\n        <label for=\"property-os-server-name\" class=\"name\">Server Name</label>\n        <input id=\"property-os-server-name\" data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group required\">\n        <label for=\"property-os-server-image\" class=\"name\">Server Image</label>\n        <select class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"imageId\" id=\"property-os-server-image\" data-option-tpl=\"imageSelect\" data-item-tpl=\"imageValue\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.imageList), {hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n    </section>\n    <section class=\"group required\">\n        <label for=\"property-os-server-volsize\" class=\"name\">Volume Size (GB)</label>\n        <input id=\"property-os-server-volsize\" data-target=\"volumeSize\" class=\"selection number\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group required\">\n        <label for=\"property-os-server-CPU\" class=\"name\">CPU</label>\n        <select class=\"selection option\"  data-target=\"CPU\" id=\"property-os-server-CPU\"></select>\n    </section>\n    <section class=\"group required\">\n        <label for=\"property-os-server-RAM\" class=\"name\">RAM</label>\n        <select class=\"selection option required\" data-target=\"RAM\" id=\"property-os-server-RAM\"></select>\n    </section>\n    <section class=\"group\">\n        <label for=\"property-os-server-credential\" class=\"name\">Credential</label>\n        <select id=\"property-os-server-credential\" data-target=\"credential\" class=\"selection option\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <option value=\"keypair\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.credential), "keypair", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">KeyPair</option>\n            <option value=\"adminPass\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.credential), "keypair", {hash:{},inverse:self.program(6, program6, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">Password</option>\n        </select>\n    </section>\n    <section class=\"group required\"  ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.credential), "keypair", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <label class=\"name\">Admin Password</label>\n        <input id=\"property-os-server-adminPass\" data-target=\"adminPass\" type=\"password\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.adminPass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" placeholder=\"Password of the Image\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    </section>\n    <section class=\"group required\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.credential), "keypair", {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <label class=\"name\">Key Pair</label>\n        <div id=\"property-os-server-keypair\">\n        </div>\n    </section>\n    <section class=\"group\">\n        <label class=\"name\">User Data</label>\n        <textarea id=\"property-os-server-userdata\" data-target=\"userData\" type=\"text\" class=\"selection string\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.agentEnabled), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.userData)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n</div>\n<div class=\"option-group-head expand\">\n    Port Details\n</div>\n<div class=\"option-group\">\n    <section class=\"group required\">\n        <label class=\"name\">Fixed IP</label>\n        <input class=\"selection\" id=\"property-os-server-fip\" data-target=\"fixedIp\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.fixedIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name tooltip\">Associate Floating IP</label>\n        <select class=\"selection bool\" id=\"property-os-server-aip\" data-target=\"associateFip\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.floatingIp), {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></select>\n    </section>\n</div>";
  return buffer;
  };
TEMPLATE.stackTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div><img class=\"property-os-image-icon\" width=\"30\" height=\"30\" src=\"/assets/images/ide/ami-os/"
    + escapeExpression(((stack1 = (depth0 && depth0.distro)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "@2x.png\" alt=\"\"/><p class=\"property-os-image-text\">"
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.name), (depth0 && depth0.text), {hash:{},data:data}))
    + "<span class=\"uid\">"
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.id), (depth0 && depth0.value), {hash:{},data:data}))
    + "</span></p></div>";
  return buffer;
  };
TEMPLATE.imageListKey=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div><img class=\"property-os-image-icon\" width=\"30\" height=\"30\" src=\"/assets/images/ide/ami-os/"
    + escapeExpression(((stack1 = (depth0 && depth0.distro)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "@2x.png\" alt=\"\"/>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>";
  return buffer;
  };
TEMPLATE.imageValue=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<button class=\"btn btn-primary dropdown-list-btn\">Manage KeyPairs</button>";
  };
TEMPLATE.kpButton=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

  buffer += "<select class=\"selection option\" name=\"kpDropdown\" data-button-tpl=\"kpButton\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></select>";
  return buffer;
  };
TEMPLATE.kpSelection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"option-group-head expand\">\n    Server Details<a href=\"#\" class=\"icon-syslog tooltip property-btn-get-system-log action-link\" data-tooltip=\"Get System Log\"></a>\n</div>\n<div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n        <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.status), {hash:{},data:data}))
    + "</dd>\n        <dt>Image</dt><dd>\n            <div class=\"os-server-image-info\">\n                <img class=\"property-os-image-icon\" src=\"/assets/images/ide/ami-os/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_os_distro)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "@2x.png\" alt=\"\"/>\n                <p class=\"property-os-image-text\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_name), {hash:{},data:data}))
    + "<span class=\"uid\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_id), {hash:{},data:data}))
    + "</span></p>\n            </div>\n        </dd>\n        <dt>Volume Size</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.volumeSize), {hash:{},data:data}))
    + "</dd>\n        <dt>Fixed IP</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.fixedIp), {hash:{},data:data}))
    + "</dd>\n        <dt>MAC Address</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.macAddress), {hash:{},data:data}))
    + "</dd>\n        <dt>Floating IP</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.floatingIp), {hash:{},data:data}))
    + "</dd>\n        <dt>Flavor</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.flavor_id), {hash:{},data:data}))
    + " (CPU: "
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.vcpus), {hash:{},data:data}))
    + ", RAM: "
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.ram), {hash:{},data:data}))
    + "G)</dd>\n        <dt>Availability Zone</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.availability_zone), {hash:{},data:data}))
    + "</dd>\n        <dt>Key Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.key_name), {hash:{},data:data}))
    + "</dd>\n        <dt>Launched at</dt><dd>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.launch_at), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</div>";
  return buffer;
  };
TEMPLATE.appTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"group\">\n    <dl class=\"dl-vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_id), {hash:{},data:data}))
    + "</dd>\n        <dt>Distro</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_os_distro), {hash:{},data:data}))
    + "</dd>\n        <dt>Version</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_os_version), {hash:{},data:data}))
    + "</dd>\n        <dt>Arichitecture</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_architecture), {hash:{},data:data}))
    + "</dd>\n        <dt>Volume Size</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.image_vol_size), {hash:{},data:data}))
    + " GB</dd>\n        <dt>Size</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.size), {hash:{},data:data}))
    + "</dd>\n        <dt>Created</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.created_at), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.imageTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"group\">\n    <dl class=\"dl-vertical\">\n        <dt>Device Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.device_name), {hash:{},data:data}))
    + "</dd>\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n        <dt>Status</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.status), {hash:{},data:data}))
    + "</dd>\n        <dt>Description</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n        <dt>Size</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.size), {hash:{},data:data}))
    + "</dd>\n        <dt>Bootable</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.bootable), {hash:{},data:data}))
    + "</dd>\n        <dt>Created at</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.created), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.volumeTemplate=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });