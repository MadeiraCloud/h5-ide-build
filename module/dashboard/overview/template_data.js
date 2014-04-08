define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <i class=\"icon-map-spot\"></i>\n    <a href=\"javascript:void(0)\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region_city)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Dashboard\">\n        <div class=\"global-region-location-info\">\n            <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.region_city)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n            <div class=\"global-region-location-data clearfix\">\n                <div class=\"global-region-location-data-item\">\n                    <i class=\"global-region-location-data-icon global-region-location-app\"></i>\n                    <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                </div>\n\n                <div class=\"global-region-location-data-item\">\n                    <i class=\"global-region-location-data-icon global-region-location-stack\"></i>\n                    <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.stack)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                </div>\n            </div>\n        </div>\n    </a>\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.result_list)),stack1 == null || stack1 === false ? stack1 : stack1.region_infos), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.overview_result=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li id=\"global-region-resource-instance\">\n                <div class=\"global-region-resource-header\">\n                    <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RUNNING_INSTANCE", {hash:{},data:data}))
    + "</h5>\n                    <div class=\"global-region-resource-count-wrap\">\n                        <i id=\"global-resource-icon-instance\" class=\"global-resource-icon\"></i>\n                        <span class=\"global-region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                    </div>\n                </div>\n\n                <div class=\"global-region-resource-content\">\n                    <ul>\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                </div>\n            </li>\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <li>\n                                <a href=\"javascript:void(0)\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-resource-type=\"DescribeInstances\">\n                                    <h4>"
    + escapeExpression(((stack1 = (depth0 && depth0.city)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n                                    <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.area)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n                                    <span class=\"global-region-resource-location-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                </a>\n                            </li>\n                        ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li id=\"global-region-resource-eip\">\n                <div class=\"global-region-resource-header\">\n                    <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "</h5>\n                    <div class=\"global-region-resource-count-wrap\">\n                        <i id=\"global-resource-icon-eip\" class=\"global-resource-icon\"></i>\n                        <span class=\"global-region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                    </div>\n                </div>\n\n                <div class=\"global-region-resource-content\">\n                    <ul>\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                </div>\n            </li>\n        ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <li>\n                                <a href=\"javascript:void(0)\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-resource-type=\"DescribeAddresses\">\n                                    <h4>"
    + escapeExpression(((stack1 = (depth0 && depth0.city)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n                                    <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.area)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n                                    <span class=\"global-region-resource-location-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                </a>\n                            </li>\n                        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li id=\"global-region-resource-volume\">\n            <div class=\"global-region-resource-header\">\n                <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + "</h5>\n                <div class=\"global-region-resource-count-wrap\">\n                    <i id=\"global-resource-icon-vol\" class=\"global-resource-icon\"></i>\n                    <span class=\"global-region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                </div>\n            </div>\n\n            <div class=\"global-region-resource-content\">\n                <ul>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </div>\n        </li>\n        ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li>\n                            <a href=\"javascript:void(0)\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-resource-type=\"DescribeVolumes\">\n                                <h4>"
    + escapeExpression(((stack1 = (depth0 && depth0.city)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n                                <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.area)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n                                <span class=\"global-region-resource-location-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                            </a>\n                        </li>\n                    ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li id=\"global-region-resource-elb\">\n                <div class=\"global-region-resource-header\">\n                    <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + "</h5>\n                    <div class=\"global-region-resource-count-wrap\">\n                        <i id=\"global-resource-icon-elb\" class=\"global-resource-icon\"></i>\n                        <span class=\"global-region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                    </div>\n                </div>\n\n                <div class=\"global-region-resource-content\">\n                    <ul>\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                </div>\n            </li>\n        ";
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <li>\n                                <a href=\"javascript:void(0)\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-resource-type=\"DescribeLoadBalancers\">\n                                    <h4>"
    + escapeExpression(((stack1 = (depth0 && depth0.city)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n                                    <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.area)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n                                    <span class=\"global-region-resource-location-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                </a>\n                            </li>\n                        ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li id=\"global-region-resource-vpn\"> <div class=\"global-region-resource-header\">\n                    <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPN", {hash:{},data:data}))
    + "</h5>\n                    <div class=\"global-region-resource-count-wrap\">\n                        <i id=\"global-resource-icon-vpn\" class=\"global-resource-icon\"></i>\n                        <span class=\"global-region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                    </div>\n                </div>\n\n                <div class=\"global-region-resource-content\">\n                    <ul>\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                </div>\n            </li>\n        ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <li>\n                                <a href=\"javascript:void(0)\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-resource-type=\"DescribeVpnConnections\">\n                                    <h4>"
    + escapeExpression(((stack1 = (depth0 && depth0.city)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n                                    <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.area)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n                                    <span class=\"global-region-resource-location-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                </a>\n                            </li>\n                        ";
  return buffer;
  }

  buffer += "<div id=\"global-region-resource-data-wrap\">\n    <ul id=\"global-region-resource-list\" class=\"clearfix\">\n        ";
  stack1 = helpers['with'].call(depth0, ((stack1 = (depth0 && depth0.global_list)),stack1 == null || stack1 === false ? stack1 : stack1.DescribeInstances), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers['with'].call(depth0, ((stack1 = (depth0 && depth0.global_list)),stack1 == null || stack1 === false ? stack1 : stack1.DescribeAddresses), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers['with'].call(depth0, ((stack1 = (depth0 && depth0.global_list)),stack1 == null || stack1 === false ? stack1 : stack1.DescribeVolumes), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers['with'].call(depth0, ((stack1 = (depth0 && depth0.global_list)),stack1 == null || stack1 === false ? stack1 : stack1.DescribeLoadBalancers), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers['with'].call(depth0, ((stack1 = (depth0 && depth0.global_list)),stack1 == null || stack1 === false ? stack1 : stack1.DescribeVpnConnections), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n</div>\n\n\n";
  return buffer;
  };
TEMPLATE.global_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "class=\"on\"";
  }

function program3(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cur_app_list)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program5(depth0,data) {
  
  
  return "0";
  }

function program7(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cur_stack_list)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program9(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program11(depth0,data) {
  
  
  return " style=\"display: none;\"";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ispending), {hash:{},inverse:self.program(19, program19, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li>\n                            <a href=\"javascript:void(0)\" class=\"region-resource-list-item disabled\">\n                                <div class=\"region-resource-thumbnail app-thumbnail\">\n                                    <div class=\"app-thumbnail-pending\">\n                                        <div class=\"loading-spinner loading-spinner-small\"></div>\n                                        <p>Processing...</p>\n                                    </div>\n                                </div>\n                                <div class=\"region-resource-info\">\n                                    <span class=\"region-resource-item-name truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                    <i class=\"region-resource-status icon-pending\"></i>\n                                    <!-- <div class=\"region-resource-action clearfix\">\n                                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isrunning), {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                        <i class=\"icon-terminate terminate-app\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n                                    </div> -->\n                                </div>\n                            </a>\n                        </li>\n                        ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                            <i class=\"icon-stop stop-app\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n                                        ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                            <i class=\"icon-play start-app\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n                                        ";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li class=\"\" data-bubble-template=\"bubbleAppInfo\" data-bubble-data='{\"status\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"title\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"start-time\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.start_time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"end-time\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.stop_time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"cost\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.cost)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n                            <a href=\"javascript:void(0)\" class=\"region-resource-list-item\">\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                <div class=\"region-resource-thumbnail app-thumbnail\">\n                                    <img width=\"220\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                                </div>\n                                <div class=\"region-resource-info\">\n                                    <span class=\"region-resource-item-name truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                    <i class=\"region-resource-status region-resource-status-";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isrunning), {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></i>\n                                    <div class=\"region-resource-action clearfix\">\n                                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.has_instance_store_ami), {hash:{},inverse:self.program(29, program29, data),fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                        <i class=\"modal icon-terminate terminate-app\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-modal-template=\"modalApp\" data-modal-data='{\"title\":";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_production), {hash:{},inverse:self.program(43, program43, data),fn:self.program(41, program41, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ", \"body\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BODY_TERMINATE_APP_LEFT", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BODY_TERMINATE_APP_RIGHT", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"confirm\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BTN_TERMINATE_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"color\":\"red\", \"is_production\":";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_production), {hash:{},inverse:self.program(37, program37, data),fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ",\n                                        \"app_name\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                                         }' data-modal-dismiss=\"true\"></i>\n                                    </div>\n                                </div>\n                            </a>\n                        </li>\n                        ";
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"icon-app-type-"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program22(depth0,data) {
  
  
  return "running";
  }

function program24(depth0,data) {
  
  
  return "stopped";
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                            <i ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.is_running), {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"icon-stop modal stop-app disabled\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-modal-template=\"modalApp\" data-modal-data='{\"title\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_TIT_STOP_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"body\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BODY_STOP_APP_LEFT", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BODY_STOP_APP_RIGHT", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"confirm\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BTN_STOP_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"color\":\"red\" }' data-modal-dismiss=\"true\"></i>\n                                        ";
  return buffer;
  }
function program27(depth0,data) {
  
  
  return "style=\"display:none;\"";
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isrunning), {hash:{},inverse:self.program(39, program39, data),fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                        ";
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                                <i class=\"icon-stop modal stop-app\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-modal-template=\"modalApp\" data-modal-data='{\"title\":";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_production), {hash:{},inverse:self.program(33, program33, data),fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ", \"body\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BODY_STOP_APP_LEFT", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BODY_STOP_APP_RIGHT", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"confirm\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BTN_STOP_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"color\":\"red\", \"is_production\":";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_production), {hash:{},inverse:self.program(37, program37, data),fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ",\n                                                \"app_name\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"is_stop\": true\n                                            }' data-modal-dismiss=\"true\"></i>\n                                            ";
  return buffer;
  }
function program31(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_TIT_STOP_PRD_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"";
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_TIT_STOP_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"";
  return buffer;
  }

function program35(depth0,data) {
  
  
  return "true";
  }

function program37(depth0,data) {
  
  
  return "false";
  }

function program39(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                                <i class=\"icon-play modal start-app\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-modal-template=\"modalApp\" data-modal-data='{\"title\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_TIT_START_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"body\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BODY_START_APP_LEFT", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BODY_START_APP_RIGHT", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"confirm\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BTN_START_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"color\":\"blue\" }' data-modal-dismiss=\"true\"></i>\n                                            ";
  return buffer;
  }

function program41(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_TIT_TERMINATE_PRD_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"";
  return buffer;
  }

function program43(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_TIT_TERMINATE_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"";
  return buffer;
  }

function program45(depth0,data) {
  
  var buffer = "";
  buffer += "\n                        <div class=\"blank-widget\">\n                           "
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_APP", {hash:{},data:data}))
    + "\n                        </div>\n                    ";
  return buffer;
  }

function program47(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li>\n                            <a href=\"javascript:void(0)\" class=\"region-resource-list-item\">\n                                <div class=\"region-resource-thumbnail\">\n                                    <img width=\"220\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                                </div>\n                                <div class=\"region-resource-info\">\n                                    <span class=\"region-resource-item-name truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                    <div class=\"region-resource-action clearfix\">\n                                        <i class=\"icon-duplicate modal duplicate-stack\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-modal-template=\"modalApp\" data-modal-data='{\"title\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_TIP_DUPLICATE_STACK", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"body\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BODY_DUPLICATE_STACK", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"input\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-copy\", \"confirm\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BTN_DUPLICATE_STACK", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"color\":\"blue\" }' data-modal-dismiss=\"true\"></i>\n\n                                        <i class=\"icon-delete modal delete-stack\"  id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-modal-template=\"modalApp\" data-modal-data='{\"title\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_TIP_DELETE_STACK", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"body\":\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BODY_DELETE_STACK", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "?\", \"confirm\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BTN_DELETE_STACK", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"color\":\"red\" }' data-modal-dismiss=\"true\"></i>\n                                    </div>\n                                </div>\n                            </a>\n                        </li>\n                    ";
  return buffer;
  }

function program49(depth0,data) {
  
  var buffer = "";
  buffer += "\n                        <div class=\"blank-widget\">\n                            "
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_STACK", {hash:{},data:data}))
    + "\n                            <img src=\"assets/images/ide/action-guide.png\" style=\"right:10px;top:21px;position:absolute\">\n                        </div>\n                    ";
  return buffer;
  }

  buffer += "<!-- Region App & Stack -->\n    <!-- Resource tab -->\n    <div id=\"region-resource-tab\" class=\"clearfix\">\n        <ul>\n            <li>\n                <a href=\"javascript:void(0)\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                    <i class=\"region-resource-tab-icon region-resource-icon-app\"></i>\n                    <span class=\"region-resource-tab-number\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.cur_app_list), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n                    <span class=\"region-resource-tab-type\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_APP", {hash:{},data:data}))
    + "</span>\n                </a>\n            </li>\n            <li>\n                <a href=\"javascript:void(0)\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stack), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                    <i class=\"region-resource-tab-icon region-resource-icon-stack\"></i>\n                    <span class=\"region-resource-tab-number\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.cur_stack_list), {hash:{},inverse:self.program(5, program5, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n                    <span class=\"region-resource-tab-type\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STACK", {hash:{},data:data}))
    + "</span>\n                    <button id=\"btn-create-stack\" class=\"icon-new-stack\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.supported_platforms), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " title=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_CREATE_STACK", {hash:{},data:data}))
    + "\"></button>\n                </a>\n            </li>\n        </ul>\n    </div>\n    <!-- Resource tab -->\n\n    <!-- Resource App -->\n    <div id=\"region-resource-app-wrap\" class=\"region-resource-list\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stack), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <div class=\"scroll-wrap\">\n            <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n            <div class=\"scroll-content\">\n                <ul class=\"clearfix\">\n\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.cur_app_list), {hash:{},inverse:self.program(45, program45, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                </ul>\n            </div>\n        </div>\n    </div>\n    <!-- Resource App -->\n\n    <!-- Resource Stack -->\n    <div id=\"region-resource-stack-wrap\" class=\"region-resource-list\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <div class=\"scroll-wrap\">\n            <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n            <div class=\"scroll-content\">\n                <ul class=\"clearfix\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.cur_stack_list), {hash:{},inverse:self.program(49, program49, data),fn:self.program(47, program47, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                </ul>\n            </div>\n        </div>\n    </div>\n    <!-- Resource Stack -->\n</div>\n<!-- Region App & Stack -->\n\n\n";
  return buffer;
  };
TEMPLATE.region_app_stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div id=\"region-aws-resource-tab\">\n            <ul class=\"clearfix\">\n                <li>\n                    <a href=\"javascript:void(0)\" class=\"region-resource-tab-item on\" data-resource-type=\"DescribeInstances\">\n                        <i id=\"global-resource-icon-instance\" class=\"global-resource-icon\"></i>\n                        <span class=\"region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Instance)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                        <span class=\"region-resource-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE", {hash:{},data:data}))
    + "</span>\n                    </a>\n                </li>\n\n                <li>\n                    <a href=\"javascript:void(0)\" class=\"region-resource-tab-item\" data-resource-type=\"DescribeAddresses\">\n                        <i id=\"global-resource-icon-eip\" class=\"global-resource-icon\"></i>\n                        <span class=\"region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.EIP)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                        <span class=\"region-resource-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "</span>\n                    </a>\n                </li>\n\n                <li>\n                    <a href=\"javascript:void(0)\" class=\"region-resource-tab-item\" data-resource-type=\"DescribeVolumes\">\n                        <i id=\"global-resource-icon-vol\" class=\"global-resource-icon\"></i>\n                        <span class=\"region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Volume)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                        <span class=\"region-resource-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + "</span>\n                    </a>\n                </li>\n\n                <li>\n                    <a href=\"javascript:void(0)\" class=\"region-resource-tab-item\" data-resource-type=\"DescribeVpcs\">\n                        <i id=\"global-resource-icon-vpc\" class=\"global-resource-icon\"></i>\n                        <span class=\"region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.VPC)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                        <span class=\"region-resource-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPC", {hash:{},data:data}))
    + "</span>\n                    </a>\n                </li>\n\n                <li>\n                    <a href=\"javascript:void(0)\" class=\"region-resource-tab-item\" data-resource-type=\"DescribeVpnConnections\">\n                        <i id=\"global-resource-icon-vpn\" class=\"global-resource-icon\"></i>\n                        <span class=\"region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.VPN)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                        <span class=\"region-resource-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPN", {hash:{},data:data}))
    + "</span>\n                    </a>\n                </li>\n\n                <li>\n                    <a href=\"javascript:void(0)\" class=\"region-resource-tab-item\" data-resource-type=\"DescribeLoadBalancers\">\n                        <i id=\"global-resource-icon-elb\" class=\"global-resource-icon\"></i>\n                        <span class=\"region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ELB)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                        <span class=\"region-resource-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + "</span>\n                    </a>\n                </li>\n\n                <li>\n                    <a href=\"javascript:void(0)\" class=\"region-resource-tab-item\" data-resource-type=\"DescribeAutoScalingGroups\">\n                        <i id=\"global-resource-icon-asg\" class=\"global-resource-icon\"></i>\n                        <span class=\"region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.AutoScalingGroup)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                        <span class=\"region-resource-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AUTO_SCALING_GROUP", {hash:{},data:data}))
    + "</span>\n                    </a>\n                </li>\n\n                <li>\n                    <a href=\"javascript:void(0)\" class=\"region-resource-tab-item\" data-resource-type=\"DescribeAlarms\">\n                        <i id=\"global-resource-icon-cwa\" class=\"global-resource-icon\"></i>\n                        <span class=\"region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.CW)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                        <span class=\"region-resource-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CLOUDWATCH_ALARM", {hash:{},data:data}))
    + "</span>\n                    </a>\n                </li>\n\n                <li>\n                    <a href=\"javascript:void(0)\" class=\"region-resource-tab-item\" data-resource-type=\"ListSubscriptions\">\n                        <i id=\"global-resource-icon-sns\" class=\"global-resource-icon\"></i>\n                        <span class=\"region-resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.SNS)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                        <span class=\"region-resource-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SNS_SUBSCRIPTION", {hash:{},data:data}))
    + "</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    ";
  return buffer;
  }

  buffer += "\n<!-- Region AWS resource -->\n<div id=\"region-aws-resource-wrap\">\n    ";
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.cur_region_resource_info), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <div id=\"region-aws-resource-data\">\n\n    </div>\n\n</div>\n\n";
  return buffer;
  };
TEMPLATE.region_resource_head=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <tr>\n                        <td>\n                            <div>\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app), {hash:{},inverse:self.program(8, program8, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </div>\n                            <div>\n                                "
    + escapeExpression(((stack1 = (depth0 && depth0.host)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                                <span class=\"resource-id\">( "
    + escapeExpression(((stack1 = (depth0 && depth0.instanceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " )</span>\n                            </div>\n                        </td>\n                        <td><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instanceState)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instanceState)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.launchTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td><a href=\"javascript:void(0)\" class=\"bubble table-link\"  data-bubble-template=\"bubbleAMIInfo\" data-bubble-data='{\"id\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"name\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.image)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"description\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.image)),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"architecture\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.image)),stack1 == null || stack1 === false ? stack1 : stack1.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"imageLocation\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.image)),stack1 == null || stack1 === false ? stack1 : stack1.imageLocation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"isPublic\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.image)),stack1 == null || stack1 === false ? stack1 : stack1.isPublic)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"kernelId\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.image)),stack1 == null || stack1 === false ? stack1 : stack1.kernelId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"rootDeviceName\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.image)),stack1 == null || stack1 === false ? stack1 : stack1.rootDeviceName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"rootDeviceType\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.image)),stack1 == null || stack1 === false ? stack1 : stack1.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td>\n                        <td>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.placement)),stack1 == null || stack1 === false ? stack1 : stack1.availabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td class=\"table-action\"><a href=\"javascript:void(0)\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail modal\" data-modal-template=\"modalRegionResourceDetail\" data-modal-data='";
  stack1 = ((stack1 = (depth0 && depth0.detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-modal-dismiss=\"true\"><i class=\"icon-list-2\"></i></a></td>\n                    </tr>\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.owner), {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <span class=\"table-app-link truncate tooltip ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isTerminated), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.owner)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tabSet)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>\n                                ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "table-app-link-clickable";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY_OTHER_USER", {hash:{},data:data}))
    + "\" >["
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>\n                                ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "";
  buffer += "\n                                <span class=\"table-app-link truncate table-app-link-unmanaged tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_UNMANAGED_RESOURCE", {hash:{},data:data}))
    + "' >"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</span>\n                                ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"dashboard-widget-body dashboard-widget-body-table table-tall blank-widget\">\n                        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</p>\n                    </div>\n                    ";
  return buffer;
  }

  buffer += "<div class=\"table-head-fix\" id=\"DescribeInstances\">\n    <table class=\"table-head\">\n        <thead>\n            <tr>\n                <th class=\"sortable\" style=\"width: 25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width: 17%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width: 20%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LAUNCH_TIME", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width: 15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AMI", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width: 15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AVAILABILITY_ZONE", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width: 8%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n            </tr>\n        </thead>\n    </table>\n    <div class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"scroll-content\">\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 25%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 17%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 15%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 15%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 8%\"><span class=\"th-inner\"></span></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.DescribeInstances), {hash:{},inverse:self.program(10, program10, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.DescribeInstances=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <tr>\n                        <td>\n                            "
    + escapeExpression(((stack1 = (depth0 && depth0.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                        </td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td class=\"table-action\"><a href=\"javascript:void(0)\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail modal\" data-modal-template=\"modalRegionResourceDetail\" data-modal-data='";
  stack1 = ((stack1 = (depth0 && depth0.detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-modal-dismiss=\"true\"><i class=\"icon-list-2\"></i></a></td>\n                    </tr>\n                    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"dashboard-widget-body dashboard-widget-body-table table-tall blank-widget\">\n                        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</p>\n                    </div>\n                    ";
  return buffer;
  }

  buffer += "<div class=\"table-head-fix\" id=\"DescribeAddresses\">\n    <table class=\"table-head\">\n        <thead>\n            <tr>\n                <th style=\"width:40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_IP", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ASSOCIATED_INSTANCE", {hash:{},data:data}))
    + "</th>\n                <th style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n            </tr>\n        </thead>\n    </table>\n    <div class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"scroll-content\">\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 40%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 40%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.DescribeAddresses), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.DescribeAddresses=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <tr>\n                        <td>\n                            <div>\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app), {hash:{},inverse:self.program(7, program7, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </div>\n                            <div>\n                                "
    + escapeExpression(((stack1 = (depth0 && depth0.volumeId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                            </div>\n                        </td>\n                        <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.createTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n                        <td><i class=\"status status-";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n                        <td class=\"table-action\"><a href=\"javascript:void(0)\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\" icon-detail modal\" data-modal-template=\"modalRegionResourceDetail\" data-modal-data='";
  stack1 = ((stack1 = (depth0 && depth0.detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-modal-dismiss=\"true\"><i class=\"icon-list-2\"></i></a></td>\n                    </tr>\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.owner), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.owner)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" >["
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>\n                                ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY_OTHER_USER", {hash:{},data:data}))
    + "\" >["
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>\n                                ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n                                <span class=\"table-app-link truncate table-app-link-unmanaged tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_UNMANAGED_RESOURCE", {hash:{},data:data}))
    + "' >"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</span>\n                                ";
  return buffer;
  }

function program9(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.device)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program11(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program13(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"dashboard-widget-body dashboard-widget-body-table table-tall blank-widget\">\n                        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</p>\n                    </div>\n                    ";
  return buffer;
  }

  buffer += "<div class=\"table-head-fix\" id=\"DescribeVolumes\">\n    <table class=\"table-head\">\n        <thead>\n            <tr>\n                <th class=\"sortable\" style=\"width:16%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:18%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:21%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CREATE_TIME", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DEVICE_NAME", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ATTACHMENT_STATUS", {hash:{},data:data}))
    + "</th>\n                <th style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n            </tr>\n        </thead>\n    </table>\n    <div class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"scroll-content\">\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 16%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 18%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 21%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 15%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 15%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 15%\"><span class=\"th-inner\"></span></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.DescribeVolumes), {hash:{},inverse:self.program(13, program13, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.DescribeVolumes=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <tr>\n                        <td>\n                            <div>\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app), {hash:{},inverse:self.program(7, program7, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </div>\n                            <div>\n                                "
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                            </div>\n                        </td>\n                        <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dhcp), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        <td class=\"table-action\"><a href=\"javascript:void(0)\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail modal\" data-modal-template=\"modalRegionResourceDetail\" data-modal-data='";
  stack1 = ((stack1 = (depth0 && depth0.detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-modal-dismiss=\"true\"><i class=\"icon-list-2\"></i></a></td>\n                    </tr>\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.owner), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.owner)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" >["
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>\n                                ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY_OTHER_USER", {hash:{},data:data}))
    + "\" >["
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>\n                                ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n                                <span class=\"table-app-link truncate table-app-link-unmanaged tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_UNMANAGED_RESOURCE", {hash:{},data:data}))
    + "' >"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</span>\n                                ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <td><a href=\"javascript:void(0)\" class=\"bubble table-link\"  data-bubble-template=\"bubbleRegionResourceInfo\" data-bubble-data='";
  stack1 = ((stack1 = (depth0 && depth0.dhcp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.dhcpOptionsId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td>\n                        ";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\n                        <td>None</td>\n                        ";
  }

function program13(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"dashboard-widget-body dashboard-widget-body-table table-tall blank-widget\">\n                        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPC", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</p>\n                    </div>\n                    ";
  return buffer;
  }

  buffer += "<div class=\"table-head-fix\" id=\"DescribeVpcs\">\n    <table class=\"table-head\">\n        <thead>\n            <tr>\n                <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CIDR", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DHCP_SETTINGS", {hash:{},data:data}))
    + "</th>\n                <th style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n            </tr>\n        </thead>\n    </table>\n    <div class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"scroll-content\">\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 25%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 25%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 10%\"><span class=\"th-inner\"></span></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.DescribeVpcs), {hash:{},inverse:self.program(13, program13, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.DescribeVpcs=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <tr>\n                        <td>\n                            <div>\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app), {hash:{},inverse:self.program(7, program7, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </div>\n                            <div>\n                                "
    + escapeExpression(((stack1 = (depth0 && depth0.vpnConnectionId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                            </div>\n                        </td>\n                        <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td><a href=\"javascript:void(0)\" class=\"bubble table-link\"  data-bubble-template=\"bubbleRegionResourceInfo\" data-bubble-data='";
  stack1 = ((stack1 = (depth0 && depth0.vgw)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpnGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td>\n                        <td><a href=\"javascript:void(0)\" class=\"bubble table-link\"  data-bubble-template=\"bubbleRegionResourceInfo\" data-bubble-data='";
  stack1 = ((stack1 = (depth0 && depth0.cgw)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.customerGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td>\n                        <td class=\"table-action\"><a href=\"javascript:void(0)\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail modal\" data-modal-template=\"modalRegionResourceDetail\" data-modal-data='";
  stack1 = ((stack1 = (depth0 && depth0.detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-modal-dismiss=\"true\"><i class=\"icon-list-2\"></i></a></td>\n                    </tr>\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.owner), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.owner)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" >["
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>\n                                ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY_OTHER_USER", {hash:{},data:data}))
    + "\" >["
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>\n                                ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n                                <span class=\"table-app-link truncate table-app-link-unmanaged tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_UNMANAGED_RESOURCE", {hash:{},data:data}))
    + "' >"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</span>\n                                ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"dashboard-widget-body dashboard-widget-body-table table-tall blank-widget\">\n                        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPN", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</p>\n                    </div>\n                    ";
  return buffer;
  }

  buffer += "<div class=\"table-head-fix\" id=\"DescribeVpnConnections\">\n    <table class=\"table-head\">\n        <thead>\n            <tr>\n                <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VIRTUAL_PRIVATE_GATEWAY", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CUSTOMER_GATEWAY", {hash:{},data:data}))
    + "</th>\n                <th style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n            </tr>\n        </thead>\n    </table>\n    <div class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"scroll-content\">\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 25%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 25%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 10%\"><span class=\"th-inner\"></span></th>\n                    </tr>\n                </thead>\n                <tbody>\n\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.DescribeVpnConnections), {hash:{},inverse:self.program(9, program9, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.DescribeVpnConnections=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <tr>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.CreatedTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.AvailabilityZones)),stack1 == null || stack1 === false ? stack1 : stack1.member)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td class=\"table-action\"><a href=\"javascript:void(0)\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail modal\" data-modal-template=\"modalRegionResourceDetail\" data-modal-data='";
  stack1 = ((stack1 = (depth0 && depth0.detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-modal-dismiss=\"true\"><i class=\"icon-list-2\"></i></a></td>\n                    </tr>\n                    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"dashboard-widget-body dashboard-widget-body-table table-tall blank-widget\">\n                        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</p>\n                    </div>\n                    ";
  return buffer;
  }

  buffer += "<div class=\"table-head-fix\" id=\"DescribeLoadBalancers\">\n    <table class=\"table-head\">\n        <thead>\n            <tr>\n                <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DNS_NAME", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:20%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CREATE_TIME", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AVAILABILITY_ZONE", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n                <th style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n            </tr>\n        </thead>\n    </table>\n    <div class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"scroll-content\">\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 25%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 25%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 10%\"><span class=\"th-inner\"></span></th>\n                    </tr>\n                </thead>\n                <tbody>\n\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.DescribeLoadBalancers), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.DescribeLoadBalancers=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <tr>\n                        <td>\n                            <div>\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app), {hash:{},inverse:self.program(7, program7, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </div>\n                            <div>\n                                "
    + escapeExpression(((stack1 = (depth0 && depth0.AutoScalingGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                            </div>\n                        </td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.last_activity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.activity_state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td class=\"table-action\"><a href=\"javascript:void(0)\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail modal\" data-modal-template=\"modalRegionResourceDetail\" data-modal-data='";
  stack1 = ((stack1 = (depth0 && depth0.detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-modal-dismiss=\"true\"><i class=\"icon-list-2\"></i></a></td>\n                    </tr>\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.owner), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <span class=\"table-app-link truncate tooltip\" id=\"asg-app-name\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.owner)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" >["
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>\n                                ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY_OTHER_USER", {hash:{},data:data}))
    + "\" >["
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>\n                                ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n                                <span class=\"table-app-link truncate table-app-link-unmanaged tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_UNMANAGED_RESOURCE", {hash:{},data:data}))
    + "' >["
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "] </span>\n                                ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <!-- Blank Slate -->\n                    <div class=\"dashboard-widget-body dashboard-widget-body-table table-tall blank-widget\">\n                        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AUTO_SCALING_GROUP", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</p>\n                    </div>\n                    ";
  return buffer;
  }

  buffer += "<div class=\"table-head-fix\" id=\"DescribeAutoScalingGroups\">\n    <table class=\"table-head\">\n        <thead>\n            <tr>\n                <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CURRENT", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LAST_ACTIVITY", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ACTIVITY_STATUS", {hash:{},data:data}))
    + "</th>\n                <th style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n            </tr>\n        </thead>\n    </table>\n    <div class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"scroll-content\">\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 50%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 10%\"><span class=\"th-inner\"></span></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.DescribeAutoScalingGroups), {hash:{},inverse:self.program(9, program9, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.DescribeAutoScalingGroups=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <tr>\n                        <td>\n                            "
    + escapeExpression(((stack1 = (depth0 && depth0.AlarmName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                        </td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.dimension_display)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.threshold_display)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td><i class=\"status ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.state_ok), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.state_alarm), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.state_insufficient), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.StateValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td class=\"table-action\"><a href=\"javascript:void(0)\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail modal\" data-modal-template=\"modalRegionResourceDetail\" data-modal-data='";
  stack1 = ((stack1 = (depth0 && depth0.detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-modal-dismiss=\"true\"><i class=\"icon-list-2\"></i></a></td>\n                    </tr>\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "status-green";
  }

function program4(depth0,data) {
  
  
  return "status-red";
  }

function program6(depth0,data) {
  
  
  return "status-grey";
  }

function program8(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <!-- Blank Slate -->\n                    <div class=\"dashboard-widget-body dashboard-widget-body-table table-tall blank-widget\">\n                        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CLOUDWATCH_ALARM", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</p>\n                    </div>\n                    ";
  return buffer;
  }

  buffer += "<div class=\"table-head-fix\" id=\"DescribeAlarms\">\n    <table class=\"table-head\">\n        <thead>\n            <tr>\n                <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DIMENSION", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_THRESHOLD", {hash:{},data:data}))
    + "</th>\n                <th class=\"sortable\" style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATE", {hash:{},data:data}))
    + "</th>\n                <th style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n            </tr>\n        </thead>\n    </table>\n    <div class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"scroll-content\">\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 30%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 30%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 10%\"><span class=\"th-inner\"></span></th>\n                        <th style=\"width: 10%\"><span class=\"th-inner\"></span></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.DescribeAlarms), {hash:{},inverse:self.program(8, program8, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.DescribeAlarms=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr>\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.topic)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                    </td>\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": "
    + escapeExpression(((stack1 = (depth0 && depth0.Endpoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    <td><i class=\"status ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pending_state), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pending_state), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n                    <td class=\"table-action\"><a href=\"javascript:void(0)\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail modal\" data-modal-template=\"modalRegionResourceDetail\" data-modal-data='";
  stack1 = ((stack1 = (depth0 && depth0.detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-modal-dismiss=\"true\"><i class=\"icon-list-2\"></i></a></td>\n                </tr>\n                ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "status-red";
  }

function program4(depth0,data) {
  
  
  return "status-green";
  }

function program6(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.pending_state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program8(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.success_state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <!-- Blank Slate -->\n                <div class=\"dashboard-widget-body dashboard-widget-body-table table-tall blank-widget\">\n                    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SNS_SUBSCRIPTION", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</p>\n                </div>\n\n                ";
  return buffer;
  }

  buffer += "<div class=\"table-head-fix\" id=\"ListSubscriptions\">\n    <table class=\"table-head\">\n    <thead>\n        <tr>\n            <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_TOPIC_NAME", {hash:{},data:data}))
    + "</th>\n            <th class=\"sortable\" style=\"width:40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ENDPOINT_AND_PROTOCOL", {hash:{},data:data}))
    + "</th>\n            <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CONFIRMATION", {hash:{},data:data}))
    + "</th>\n            <th style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n        </tr>\n    </thead>\n    </table>\n    <div class=\"scroll-wrap\">\n    <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n    <div class=\"scroll-content\">\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th style=\"width: 30%\"><span class=\"th-inner\"></span></th>\n                    <th style=\"width: 40%\"><span class=\"th-inner\"></span></th>\n                    <th style=\"width: 20%\"><span class=\"th-inner\"></span></th>\n                    <th style=\"width: 10%\"><span class=\"th-inner\"></span></th>\n                </tr>\n            </thead>\n            <tbody>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ListSubscriptions), {hash:{},inverse:self.program(10, program10, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n            </tbody>\n        </table>\n    </div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.ListSubscriptions=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"global-region-status-body\">\n                <div class=\"global-region-status-list\">\n                    <div class=\"global-region-status-header\">\n                        <h4>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RECENT_LAUNCHED_STACK", {hash:{},data:data}))
    + "</h4>\n                    </div>\n                    <ul>\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.recent_launched_apps), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                </div>\n            </div>\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <li>\n                                <a href=\"javascript:void(0)\" id="
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " data-option='{\"name\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"region\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n                                    <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h5>\n                                    <div class=\"global-region-status-info\">\n                                        <span class=\"global-region-status-info-location\">"
    + escapeExpression(((stack1 = (depth0 && depth0.region_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                        <time>"
    + escapeExpression(((stack1 = (depth0 && depth0.interval_date)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</time>\n                                    </div>\n                                </a>\n                            </li>\n                        ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"icon-app-type-"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n            <div class=\"global-region-status-body\">\n                <div class=\"global-region-status-empty\">\n                    <span>No recently launched app in 30 days</span>\n                </div>\n            </div>\n        ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"global-region-status-body\">\n                <div class=\"global-region-status-list\">\n                    <div class=\"global-region-status-header\">\n                        <h4>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RECENT_EDITED_STACK", {hash:{},data:data}))
    + "</h4>\n                    </div>\n                    <ul>\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.recent_edited_stacks), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                </div>\n            </div>\n        ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <li>\n                                <a href=\"javascript:void(0)\" id="
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " data-option='{\"name\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"region\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n                                    <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n                                    <div class=\"global-region-status-info\">\n                                        <span class=\"global-region-status-info-location\">"
    + escapeExpression(((stack1 = (depth0 && depth0.region_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                        <time>"
    + escapeExpression(((stack1 = (depth0 && depth0.interval_date)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</time>\n                                    </div>\n                                </a>\n                            </li>\n                        ";
  return buffer;
  }

function program10(depth0,data) {
  
  
  return "\n            <div class=\"global-region-status-body\">\n                <div class=\"global-region-status-empty\">\n                    <span>No recently edited stack in 30 days</span>\n                </div>\n            </div>\n        ";
  }

  buffer += "<div id=\"global-region-status-tab-wrap\" class=\"clearfix\">\n    <a href=\"javascript:void(0)\" id=\"global-region-status-tab-app\" class=\"global-region-status-tab-item\">\n        <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_APP", {hash:{},data:data}))
    + "</h5>\n        <div id=\"global-region-status-app\" class=\"global-region-status-count-wrap\">\n            <i class=\"global-region-status-icon global-region-status-icon-app\"></i>\n            <span id=\"global-region-status-app-count\" class=\"global-region-status-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.result_list)),stack1 == null || stack1 === false ? stack1 : stack1.total_app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </div>\n    </a>\n\n    <a href=\"javascript:void(0)\" id=\"global-region-status-tab-stack\" class=\"global-region-status-tab-item on\">\n        <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STACK", {hash:{},data:data}))
    + "</h5>\n        <div id=\"global-region-status-stack\" class=\"global-region-status-count-wrap\">\n            <i class=\"global-region-status-icon global-region-status-icon-stack\"></i>\n            <span id=\"global-region-status-statck-count\" class=\"global-region-status-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.result_list)),stack1 == null || stack1 === false ? stack1 : stack1.total_stack)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </div>\n    </a>\n</div>\n\n<div id=\"global-region-status-content-wrap\">\n\n    <div id=\"global-region-status-app-content\" class=\"global-region-status-content\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.recent_launched_apps), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    <div id=\"global-region-status-stack-content\" class=\"global-region-status-content\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.recent_edited_stacks), {hash:{},inverse:self.program(10, program10, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n\n</div>\n\n";
  return buffer;
  };
TEMPLATE.recent=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"dashboard-loading clearfix\">\n   <div class=\"loading-spinner\"></div>\n</div>\n\n";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"dashboard-loading aws-loading-faild clearfix\">\n    <p>Loading resource failed. The AWS Credential key is incorrect.</p>\n    <a href=\"###\" class=\"btn btn-blue show-credential\" style=\"width: 182px;\">Enter AWS credentials</a>\n</div>\n\n";
  };
TEMPLATE.loading_failed=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"dashboard-demo\">\n    <div class=\"enter-credential\">\n        <p class=\"info\">This is only sample data of global resource sumary.</p>\n        <p class=\"link\"><a class=\"show-credential\">Provide your AWS Credential</a> to see real data</p>\n    </div>\n    <img src=\"./assets/images/ide/global-demo.png\"/>\n</div>\n\n";
  };
TEMPLATE.demo_global=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"dashboard-demo\">\n    <div class=\"enter-credential\">\n        <p class=\"info\">This is only sample data of regional resource sumary.</p>\n        <p class=\"link\"><a class=\"show-credential\">Provide your AWS Credential</a> to see real data</p>\n    </div>\n    <img src=\"./assets/images/ide/region-demo.png\"/>\n</div>\n";
  };
TEMPLATE.demo_region=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });