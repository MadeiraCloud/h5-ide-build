define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isUsed), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " resource-item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isUsed), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isUsed), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_AZ", {hash:{},data:data}))
    + "' data-component-type=\"group\" data-type=\"AWS.EC2.AvailabilityZone\" data-option='{\"name\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.zoneName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n	<div class=\"resource-icon resource-icon-az\">\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.zoneShortName), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<div class=\"resource-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.zoneName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "tooltip";
  }

function program6(depth0,data) {
  
  
  return "resource-disabled";
  }

function program8(depth0,data) {
  
  
  return "data-enable=\"false\"";
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"resource-icon-az-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.zoneShortName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.availability_zone)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n";
  return buffer;
  };
TEMPLATE.availability_zone_data=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item bubble\"  data-bubble-template=\"bubbleSnapshotInfo\" data-bubble-data='{\"snapshotId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"startTime\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.startTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"status\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"size\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-component-type=\"node\" data-type=\"AWS.EC2.EBS.Volume\" data-option='{\"volumeSize\":"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", \"snapshotId\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n	<div class=\"resource-icon resource-icon-ebs-snapshot\"><span class=\"ebs-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</span></div>\n	<div class=\"resource-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.resource_snapshot)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.resoruce_snapshot_data=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item bubble\" data-bubble-template=\"bubbleAMIMongoInfo\" data-bubble-data='{\"id\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"name\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"description\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"architecture\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"imageLocation\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageLocation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"isPublic\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.isPublic)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"kernelId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.kernelId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"rootDeviceName\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"rootDeviceType\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"imageSize\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"instance_type\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.instance_type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-component-type=\"node\" data-type=\"AWS.EC2.Instance\" data-option='{\"imageId\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"cachedAmi\" : { \"osType\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"architecture\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"rootDeviceType\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" } }'>\n	<div class=\"resource-icon resource-icon-instance\" >\n		<img src=\"assets/images/ide/ami/"
    + escapeExpression(((stack1 = (depth0 && depth0.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\" width='39' height='27' />\n	</div>\n	<div class=\"resource-label instance-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.quickstart_ami), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.quickstart_ami_data=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item bubble\"  data-bubble-template=\"bubbleAMIInfo\" data-bubble-data='{\"id\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"name\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"description\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"architecture\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"imageLocation\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageLocation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"isPublic\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.isPublic)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"kernelId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.kernelId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"rootDeviceName\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"rootDeviceType\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-component-type=\"node\" data-type=\"AWS.EC2.Instance\" data-option='{\"imageId\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"osType\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"architecture\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"rootDeviceType\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"virtualizationType\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.virtualizationType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" }'>\n	<div class=\"resource-icon resource-icon-instance\">\n		<img src=\"assets/images/ide/ami/"
    + escapeExpression(((stack1 = (depth0 && depth0.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\" width='39' height='27' />\n	</div>\n	<div class=\"resource-label instance-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.my_ami), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n";
  return buffer;
  };
TEMPLATE.my_ami_data=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"pos-r\">\n	<div class=\"resource-item bubble ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['delete']), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"  data-bubble-template=\"bubbleAMIInfo\" data-bubble-data='{\"id\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"name\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"description\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"architecture\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"imageLocation\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.imageLocation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"isPublic\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.isPublic)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"kernelId\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.kernelId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"rootDeviceName\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.rootDeviceName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"rootDeviceType\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-component-type=\"node\" data-type=\"AWS.EC2.Instance\" data-option='{\"imageId\": \""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"osType\": \""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"architecture\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"rootDeviceType\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"virtualizationType\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.virtualizationType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" }'>\n		<div class=\"resource-icon resource-icon-instance\">\n			<img src=\"assets/images/ide/ami/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\" width='39' height='27' />\n		</div>\n		<div class=\"resource-label instance-label\" >"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource_info)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	</div>\n	<div class=\"btn-fav-ami ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['delete']), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " tooltip\" data-tooltip=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0['delete']), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.resource_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-amiVO=\""
    + escapeExpression(((stack1 = (depth0 && depth0.amiVO)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "deleted";
  }

function program4(depth0,data) {
  
  
  return "faved";
  }

function program6(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "RES_TIT_ADD_TO_FAVORITE", {hash:{},data:data}));
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.favorite_ami), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n";
  return buffer;
  };
TEMPLATE.favorite_ami_data=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"btn btn-primary\" data-region-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"btn-browse-community-ami\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_BTN_BROWSE_COMMUNITY_AMI", {hash:{},data:data}))
    + "</div>\n\n";
  return buffer;
  };
TEMPLATE.community_ami_btn=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_VPC", {hash:{},data:data}))
    + "</div>\n	<div class=\"accordion-body scroll-wrap scrollbar-auto-hide\">\n		<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n		<div class=\"item-wrap scroll-content\">\n			<ul class=\"resource-list\">\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isntDefaultVPC), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<li class=\"tooltip resource-item\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ENI", {hash:{},data:data}))
    + "' data-component-type=\"node\" data-type=\"AWS.VPC.NetworkInterface\">\n					<div class=\"resource-icon resource-icon-eni\"></div>\n					<div class=\"resource-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ENI", {hash:{},data:data}))
    + "</div>\n				</li>\n			</ul>\n		</div>\n	</div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<li class=\"tooltip resource-item\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_SUBNET", {hash:{},data:data}))
    + "' data-component-type=\"group\" data-type=\"AWS.VPC.Subnet\">\n					<div class=\"resource-icon resource-icon-subnet\"></div>\n					<div class=\"resource-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_SUBNET", {hash:{},data:data}))
    + "</div>\n				</li>\n				<li class=\"tooltip resource-item\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_RTB", {hash:{},data:data}))
    + "' data-component-type=\"node\" data-type=\"AWS.VPC.RouteTable\">\n					<div class=\"resource-icon resource-icon-rt\"></div>\n					<div class=\"resource-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_RTB", {hash:{},data:data}))
    + "</div>\n				</li>\n				<li class=\"tooltip resource-item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.igwIsUsed), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.igwIsUsed), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "data-tooltip='";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.igwIsUsed), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-component-type=\"node\" data-type=\"AWS.VPC.InternetGateway\" data-option='{\"name\":\"Internet-gateway\"}'>\n					<div class=\"resource-icon resource-icon-igw\"></div>\n					<div class=\"resource-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_IGW", {hash:{},data:data}))
    + "</div>\n				</li>\n				<li class=\"tooltip resource-item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vgwIsUsed), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vgwIsUsed), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-tooltip='";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vgwIsUsed), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-component-type=\"node\" data-type=\"AWS.VPC.VPNGateway\" data-option='{\"name\":\"VPN-gateway\"}'>\n					<div class=\"resource-icon resource-icon-vgw\"></div>\n					<div class=\"resource-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_VGW", {hash:{},data:data}))
    + "</div>\n				</li>\n				<li class=\"tooltip resource-item\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_CGW", {hash:{},data:data}))
    + "' data-component-type=\"node\" data-type=\"AWS.VPC.CustomerGateway\">\n					<div class=\"resource-icon resource-icon-cgw\"></div>\n					<div class=\"resource-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_CGW", {hash:{},data:data}))
    + "</div>\n				</li>\n				";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "resource-disabled";
  }

function program5(depth0,data) {
  
  
  return "data-enable=\"false\"";
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += " "
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_HAS_IGW", {hash:{},data:data}))
    + " ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += " "
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_IGW", {hash:{},data:data}))
    + " ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "";
  buffer += " "
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_HAS_VGW", {hash:{},data:data}))
    + " ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "";
  buffer += " "
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_VGW", {hash:{},data:data}))
    + " ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isntClassic), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };
TEMPLATE.resource_vpc_select_list=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });