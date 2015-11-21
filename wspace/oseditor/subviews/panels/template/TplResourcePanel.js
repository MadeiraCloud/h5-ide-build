define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<nav class=\"clearfix\">\n    <h1 class=\"title\">Resource</h1>\n    <ul class=\"action clearfix\">\n        <li class=\"btn-refresh-panel icon-refresh tooltip\" data-tooltip=\"Refresh Resources\"></li>\n        <li class=\"btn-open-shareres js-toggle-dropdown icon-resources tooltip\" data-target=\".resources-dropdown-wrapper\" data-tooltip=\"Manage Other Resources\"></li>\n    </ul>\n    <ul class=\"dropdown-menu resources-dropdown-wrapper\">\n        <li data-action=\"keypair\" class=\"icon-kp\"><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_KEY_PAIR", {hash:{},data:data}))
    + "</span></li>\n        <li data-action=\"snapshot\" class=\"icon-ebs-snap\"><span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SNAPSHOT", {hash:{},data:data}))
    + "</span></li>\n    </ul>\n</nav>\n\n<div>\n    <section class=\"system-image\">\n        <header>\n            Server\n            <aside class=\"selectbox ami-type-select\">\n                <div class=\"selection\">System Image</div>\n                <ul class=\"dropdown\">\n                    <li class=\"item selected\" data-id=\"public\">System Image</li>\n                    <li class=\"item\" data-id=\"private\">Image Snapshot</li>\n                </ul>\n            </aside>\n        </header>\n        <article>\n            <ul class=\"nano-content resource-list-ami\"></ul>\n        </article>\n    </section>\n\n    <section class=\"block-storage\">\n        <header>Block Storage</header>\n        <article>\n            <ul class=\"resource-list-volume clearfix\"></ul>\n        </article>\n        <button class=\"btn btn-primary full-width manage-snapshot\">Manage Snapshots</button>\n    </section>\n\n    <section class=\"network\">\n        <header>Network</header>\n        <article>\n            <ul class=\"resource-list-network clearfix\">\n                <li class=\"tooltip resource-item ossubnet\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_IN_NETOWRK_TO_CREATE_SUBNET", {hash:{},data:data}))
    + "' data-type=\"OSSUBNET\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSSUBNET", {hash:{},data:data}))
    + "</li>\n\n                <li class=\"tooltip resource-item osrt\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_OUTSIDE_NETOWRK_TO_CREATE_ROUTER", {hash:{},data:data}))
    + "' data-type=\"OSRT\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSRT", {hash:{},data:data}))
    + "</li>\n\n                <li class=\"tooltip resource-item osport\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_IN_SUBNET_TO_CREATE_PORT", {hash:{},data:data}))
    + "' data-type=\"OSPORT\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSPORT", {hash:{},data:data}))
    + "</li>\n            </ul>\n        </article>\n\n    </section>\n\n    <section class=\"network\">\n        <header>Load Balancing</header>\n        <article>\n            <ul class=\"resource-list-network clearfix\">\n                <li class=\"tooltip resource-item oselb\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_IN_SUBNET_TO_CREATE_LOAD_BALANCE", {hash:{},data:data}))
    + "' data-type=\"OSELB\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSELB", {hash:{},data:data}))
    + "</li>\n\n                <li class=\"tooltip resource-item oslistener\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_IN_SUBNET_TO_CREATE_LISTENER", {hash:{},data:data}))
    + "' data-type=\"OSLISTENER\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSLISTENER", {hash:{},data:data}))
    + "</li>\n\n                <li class=\"tooltip resource-item ospool\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_IN_SUBNET_TO_CREATE_POOL", {hash:{},data:data}))
    + "' data-type=\"OSPOOL\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSPOOL", {hash:{},data:data}))
    + "</li>\n\n            </ul>\n        </article>\n    </section>\n</div>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"bubble resource-item osserver\" data-bubble-template=\"resPanelOsAmiInfo\" data-bubble-data='{\"region\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"imageId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-type=\"OSSERVER\" data-option='{\"imageId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n    <img src=\"/assets/images/ide/ami-os/"
    + escapeExpression(((stack1 = (depth0 && depth0.os_type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "@2x.png\">\n    "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.ami=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item bubble ossnapshot\" data-date=\""
    + escapeExpression(((stack1 = (depth0 && depth0.created_at)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-storge=\""
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bubble-template=\"resPanelOsSnapshot\" data-bubble-data='{\"id\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"region\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-type=\"OSVOL\" data-option='{\"size\":"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", \"snapshot\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n  <div class=\"ebs-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</div>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>\n";
  return buffer;
  }

  buffer += "<li class=\"tooltip resource-item osvol\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DRAG_AND_DROP_ON_SERVER_TO_ATTACH_VOLUME", {hash:{},data:data}))
    + "' data-type=\"OSVOL\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_OSVOL", {hash:{},data:data}))
    + "</li>\n";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.snapshot=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });