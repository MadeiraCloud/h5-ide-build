define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "\r\n			<div class=\"loading-spinner\"></div>\r\n			";
  }

function program3(depth0,data) {
  
  
  return "\r\n			<div class=\"unmanaged-vpc-empty\">Oops, loading VPC failed.\r\n				<button class=\"btn btn-blue\" id=\"btn-vpc-reload\">Retry</button>\r\n			</div>\r\n\r\n			";
  }

function program5(depth0,data) {
  
  
  return "\r\n			<div class=\"unmanaged-vpc-empty\">There is no unmanaged VPC to visualize.</div>\r\n			";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n				<li class=\"unmanaged-VPC-region-item\"\r\n					data-region-name=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n					<div class=\"unmanaged-VPC-region-header\">\r\n						<span class=\"unmanaged-VPC-location-name\">"
    + escapeExpression(helpers.city_code.call(depth0, (data == null || data === false ? data : data.key), {hash:{},data:data}))
    + "</span>\r\n						<span class=\"unmanaged-VPC-region-name\">"
    + escapeExpression(helpers.city_area.call(depth0, (data == null || data === false ? data : data.key), {hash:{},data:data}))
    + "</span>\r\n					</div>\r\n					<ul class=\"unmanaged-VPC-resource-list clearfix\">\r\n						";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n					</ul>\r\n				</li>\r\n				";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n						<li class=\"unmanaged-VPC-resource-item";
  stack1 = helpers.is_vpc_disabled.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\r\n							";
  stack1 = helpers.is_vpc_disabled.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n							id=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-item\"\r\n							data-vpc-id=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\r\n							data-vpc-obj='"
    + escapeExpression(helpers.convert_string.call(depth0, (data == null || data === false ? data : data.key), depth0, {hash:{},data:data}))
    + "'>\r\n							<a href=\"javascript:void(0)\">\r\n								<h5>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.origin)),stack1 == null || stack1 === false ? stack1 : stack1.is_unmanaged), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </h5>\r\n								<ol class=\"unmanaged-resource-data\">\r\n									<li class=\"unmanaged-resource-item\">\r\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "AWS.VPC.Subnet", {hash:{},data:data}))
    + "</span>\r\n										<span class=\"unmanaged-resource-name\">subnet</span>\r\n									</li>\r\n									<li class=\"unmanaged-resource-item\">\r\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "running", {hash:{},data:data}))
    + "</span>\r\n										<span class=\"unmanaged-resource-name\">running instance</span>\r\n									</li>\r\n									<li class=\"unmanaged-resource-item\">\r\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "stopped", {hash:{},data:data}))
    + "</span>\r\n										<span class=\"unmanaged-resource-name\">stopped instance</span>\r\n									</li>\r\n									<li class=\"unmanaged-resource-item\">\r\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "AWS.VPC.NetworkInterface", {hash:{},data:data}))
    + "</span>\r\n										<span class=\"unmanaged-resource-name\">network interface</span>\r\n									</li>\r\n									<li class=\"unmanaged-resource-item\">\r\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "AWS.EC2.EIP", {hash:{},data:data}))
    + "</span>\r\n										<span class=\"unmanaged-resource-name\">elastic ip</span>\r\n									</li>\r\n									<li class=\"unmanaged-resource-item\">\r\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "AWS.ELB", {hash:{},data:data}))
    + "</span>\r\n										<span class=\"unmanaged-resource-name\">load balancer</span>\r\n									</li>\r\n								</ol>\r\n							</a>\r\n						</li>\r\n						";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return " unmanaged-VPC-resource-item-disabled tooltip";
  }

function program11(depth0,data) {
  
  var buffer = "";
  buffer += " data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "IDE_TIP_VISUALIZE_MORE_THAN_100_ENI", {hash:{},data:data}))
    + "\" ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "";
  buffer += " <i class=\"icon-info tooltip default-kp-info\" data-tooltip=\""
    + escapeExpression(helpers.vpc_sub_title.call(depth0, (depth0 && depth0.origin), (data == null || data === false ? data : data.key), {hash:{},data:data}))
    + "\"></i>";
  return buffer;
  }

  buffer += "<div style=\"width:796px\">\r\n	<div class=\"modal-header\">\r\n		<h3>Select a VPC to be visualized:</h3>\r\n		<i class=\"modal-close\">&times;</i>\r\n	</div>\r\n\r\n	<div class=\"scroll-wrap scrollbar-auto-hide\" style=\"height:400px;\">\r\n		<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n		<div id=\"unmanaged-VPC-modal-body\" class=\"scroll-content\">\r\n\r\n			";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.resource_list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n			";
  stack1 = helpers.is_service_error.call(depth0, (depth0 && depth0.resource_list), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n			";
  stack1 = helpers.is_unmanaged.call(depth0, (depth0 && depth0.resource_list), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n			<ul id=\"unmanaged-VPC-region-list\">\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.resource_list), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</ul>\r\n\r\n		</div>\r\n	</div>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });