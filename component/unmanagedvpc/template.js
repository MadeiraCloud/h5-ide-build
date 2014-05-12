define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "\n			<div class=\"loading-spinner\"></div>\n			";
  }

function program3(depth0,data) {
  
  
  return "\n			<div class=\"unmanaged-vpc-empty\">Oops, loading VPC failed.\n				<button class=\"btn btn-blue\" id=\"btn-vpc-reload\">Retry</button>\n			</div>\n\n			";
  }

function program5(depth0,data) {
  
  
  return "\n			<div class=\"unmanaged-vpc-empty\">There is no unmanaged VPC to visualize.</div>\n			";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<li class=\"unmanaged-VPC-region-item\"\n					data-region-name=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n					<div class=\"unmanaged-VPC-region-header\">\n						<span class=\"unmanaged-VPC-location-name\">"
    + escapeExpression(helpers.city_code.call(depth0, (data == null || data === false ? data : data.key), {hash:{},data:data}))
    + "</span>\n						<span class=\"unmanaged-VPC-region-name\">"
    + escapeExpression(helpers.city_area.call(depth0, (data == null || data === false ? data : data.key), {hash:{},data:data}))
    + "</span>\n					</div>\n					<ul class=\"unmanaged-VPC-resource-list clearfix\">\n						";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</ul>\n				</li>\n				";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<li class=\"unmanaged-VPC-resource-item";
  stack1 = helpers.is_vpc_disabled.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n							";
  stack1 = helpers.is_vpc_disabled.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							id=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-item\"\n							data-vpc-id=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n							data-vpc-obj='"
    + escapeExpression(helpers.convert_string.call(depth0, (data == null || data === false ? data : data.key), depth0, {hash:{},data:data}))
    + "'>\n							<a href=\"javascript:void(0)\">\n								<h5>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n								<ol class=\"unmanaged-resource-data\">\n									<li class=\"unmanaged-resource-item\">\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "AWS.VPC.Subnet", {hash:{},data:data}))
    + "</span>\n										<span class=\"unmanaged-resource-name\">subnet</span>\n									</li>\n									<li class=\"unmanaged-resource-item\">\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "running", {hash:{},data:data}))
    + "</span>\n										<span class=\"unmanaged-resource-name\">running instance</span>\n									</li>\n									<li class=\"unmanaged-resource-item\">\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "stopped", {hash:{},data:data}))
    + "</span>\n										<span class=\"unmanaged-resource-name\">stopped instance</span>\n									</li>\n									<li class=\"unmanaged-resource-item\">\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "AWS.VPC.NetworkInterface", {hash:{},data:data}))
    + "</span>\n										<span class=\"unmanaged-resource-name\">network interface</span>\n									</li>\n									<li class=\"unmanaged-resource-item\">\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "AWS.EC2.EIP", {hash:{},data:data}))
    + "</span>\n										<span class=\"unmanaged-resource-name\">elastic ip</span>\n									</li>\n									<li class=\"unmanaged-resource-item\">\n										<span class=\"unmanaged-resource-number\">"
    + escapeExpression(helpers.vpc_sub_item.call(depth0, (depth0 && depth0.origin), "AWS.ELB", {hash:{},data:data}))
    + "</span>\n										<span class=\"unmanaged-resource-name\">load balancer</span>\n									</li>\n								</ol>\n							</a>\n						</li>\n						";
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

  buffer += "<div style=\"width:796px\">\n	<div class=\"modal-header\">\n		<h3>Select an unmanaged VPC to be visualized:</h3>\n		<i class=\"modal-close\">&times;</i>\n	</div>\n\n	<div class=\"scroll-wrap scrollbar-auto-hide\" style=\"height:400px;\">\n		<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n		<div id=\"unmanaged-VPC-modal-body\" class=\"scroll-content\">\n\n			";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.resource_list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n			";
  stack1 = helpers.is_service_error.call(depth0, (depth0 && depth0.resource_list), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n			";
  stack1 = helpers.is_unmanaged.call(depth0, (depth0 && depth0.resource_list), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n			<ul id=\"unmanaged-VPC-region-list\">\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.resource_list), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</ul>\n\n		</div>\n	</div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });