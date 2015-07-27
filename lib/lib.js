define('ui/MC.template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={"notification":{}};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "<i class=\"notification_close\">&times;</i>";
  }

  buffer += "<div class=\"notification_item "
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "_item\">\n	<span>"
    + escapeExpression(((stack1 = (depth0 && depth0.template)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.should_stay), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.notification.item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head alert\">"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n	"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</div>";
  return buffer;
  };
TEMPLATE.bubbleAlert=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head suggest\">"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n	"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</div>";
  return buffer;
  };
TEMPLATE.bubbleSuggest=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head\"><i class=\"status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-("
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n<div class=\"bubble-content\">\n	<dl class=\"dl-horizontal\">\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "BUBBLE_LAUNCHTIME", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0['launch-time'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "BUBBLE_AVAILABILITYZONE", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.az)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "BUBBLE_INSTANCETYPE", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0['instance-type'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	</dl>\n</div>";
  return buffer;
  };
TEMPLATE.bubbleInstanceInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n	<dl class=\"dl-horizontal\">\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "BUBBLE_SNAPSHOTID", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "BUBBLE_START_TIME", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.startTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "STATUS", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "BUBBLE_SIZE", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "BUBBLE_ENCRYPTED", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.encrypted)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	</dl>\n</div>";
  return buffer;
  };
TEMPLATE.bubbleSnapshotInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_IMAGEOWNERALIAS", {hash:{},data:data}))
    + "</dt> <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageOwnerAlias)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_IMAGEOWNERID", {hash:{},data:data}))
    + "</dt> <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageOwnerId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n	<dl class=\"dl-horizontal\">\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_NAME", {hash:{},data:data}))
    + "</dt>            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_DESCRIPTION", {hash:{},data:data}))
    + "</dt>     <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_ARCHITECTURE", {hash:{},data:data}))
    + "</dt>    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_IMAGELOCATION", {hash:{},data:data}))
    + "</dt>   <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageLocation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.imageOwnerAlias), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_ISPUBLIC", {hash:{},data:data}))
    + "</dt>       <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.isPublic)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_KERNELID", {hash:{},data:data}))
    + "</dt>       <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.kernelId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_ROOTDEVICENAME", {hash:{},data:data}))
    + "</dt> <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_ROOTDEVICETYPE", {hash:{},data:data}))
    + "</dt> <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "BUBBLE_IMAGE_SIZE", {hash:{},data:data}))
    + "</dt>    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "BUBBLE_INSTANCETYPE", {hash:{},data:data}))
    + "</dt> <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	</dl>\n</div>";
  return buffer;
  };
TEMPLATE.bubbleAMIInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n    <dl class=\"dl-horizontal\">\n        <dt>Distro</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>Version</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.os_version)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_ARCHITECTURE", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>Volume Size</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vol_size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "GB</dd>\n        <dt>id</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>Created</dt><dd>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.created_at), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</div>";
  return buffer;
  };
TEMPLATE.bubbleOsAmiInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n    <dl class=\"dl-horizontal\">\n        <dt>Status</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>UUID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>Parent Volume</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.volume_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>Volume Size</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vol_size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "GB</dd>\n        <dt>Created</dt><dd>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.created_at), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</div>";
  return buffer;
  };
TEMPLATE.bubbleOsSnapshotInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\nIPSec Tunnel #"
    + escapeExpression(((stack1 = (depth0 && depth0.number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n================================================================================\n#1: Internet Key Exchange Configuration\n\nConfigure the IKE SA as follows\n  - Authentication Method    : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_protocol_method)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Pre-Shared Key           : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_pre_shared_key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Authentication Algorithm : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_authentication_protocol_algorithm)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Encryption Algorithm     : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_encryption_protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Lifetime                 : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_lifetime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " seconds\n  - Phase 1 Negotiation Mode : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_mode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Perfect Forward Secrecy  : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_perfect_forward_secrecy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\n#2: IPSec Configuration\n\nConfigure the IPSec SA as follows:\n  - Protocol                 : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Authentication Algorithm : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_authentication_protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Encryption Algorithm     : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_encryption_protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Lifetime                 : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_lifetime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " seconds\n  - Mode                     : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_mode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Perfect Forward Secrecy  : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_perfect_forward_secrecy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nIPSec Dead Peer Detection (DPD) will be enabled on the AWS Endpoint. We\nrecommend configuring DPD on your endpoint as follows:\n  - DPD Interval             : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_interval)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - DPD Retries              : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_retries)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nIPSec ESP (Encapsulating Security Payload) inserts additional\nheaders to transmit packets. These headers require additional space,\nwhich reduces the amount of space available to transmit application data.\nTo limit the impact of this behavior, we recommend the following\nconfiguration on your Customer Gateway:\n  - TCP MSS Adjustment       : "
    + escapeExpression(((stack1 = (depth0 && depth0.tcp_mss_adjustment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " bytes\n  - Clear Don't Fragment Bit : "
    + escapeExpression(((stack1 = (depth0 && depth0.clear_df_bit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Fragmentation            : "
    + escapeExpression(((stack1 = (depth0 && depth0.fragmentation_before_encryption)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\n#3: Tunnel Interface Configuration\n\nYour Customer Gateway must be configured with a tunnel interface that is\nassociated with the IPSec tunnel. All traffic transmitted to the tunnel\ninterface is encrypted and transmitted to the Virtual Private Gateway.\n\nThe Customer Gateway and Virtual Private Gateway each have two addresses that relate\nto this IPSec tunnel. Each contains an outside address, upon which encrypted\ntraffic is exchanged. Each also contain an inside address associated with\nthe tunnel interface.\n\nThe Customer Gateway outside IP address was provided when the Customer Gateway\nwas created. Changing the IP address requires the creation of a new\nCustomer Gateway.\n\nThe Customer Gateway inside IP address should be configured on your tunnel\ninterface.\n\nOutside IP Addresses:\n  - Customer Gateway 		        : "
    + escapeExpression(((stack1 = (depth0 && depth0.customer_gateway_outside_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Virtual Private Gateway	        : "
    + escapeExpression(((stack1 = (depth0 && depth0.vpn_gateway_outside_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nInside IP Addresses\n  - Customer Gateway         		: "
    + escapeExpression(((stack1 = (depth0 && depth0.customer_gateway_inside_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Virtual Private Gateway             : "
    + escapeExpression(((stack1 = (depth0 && depth0.vpn_gateway_inside_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nConfigure your tunnel to fragment at the optimal size:\n  - Tunnel interface MTU     : 1436 bytes\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isStaticRouting), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n#4: Static Routing Configuration:\n\nTo route traffic between your internal network and your VPC,\nyou will need a static route added to your router.\n\nStatic Route Configuration Options:\n\n  - Next hop                      : "
    + escapeExpression(((stack1 = (depth0 && depth0.next_hop)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nYou should add static routes towards your internal network on the VGW.\nThe VGW will then send traffic towards your internal network over\nhe tunnels.\n";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n#4: Border Gateway Protocol (BGP) Configuration:\n\nThe Border Gateway Protocol (BGPv4) is used within the tunnel, between the inside\nIP addresses, to exchange routes from the VPC to your home network. Each\nBGP router has an Autonomous System Number (ASN). Your ASN was provided\nto AWS when the Customer Gateway was created.\n\nBGP Configuration Options:\n  - Customer Gateway ASN	          : "
    + escapeExpression(((stack1 = (depth0 && depth0.customer_gateway_bgp_asn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Virtual Private  Gateway ASN          : "
    + escapeExpression(((stack1 = (depth0 && depth0.vpn_gateway_bgp_asn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Neighbor IP Address     		  : "
    + escapeExpression(((stack1 = (depth0 && depth0.neighbor_ip_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Neighbor Hold Time       : "
    + escapeExpression(((stack1 = (depth0 && depth0.customer_gateway_bgp_hold_time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nConfigure BGP to announce routes to the Virtual Private Gateway. The gateway\nwill announce prefixes to your customer gateway based upon the prefix you\nassigned to the VPC at creation time.\n";
  return buffer;
  }

  buffer += "Amazon Web Services\nVirtual Private Cloud\n\nVPN Connection Configuration\n================================================================================\nAWS utilizes unique identifiers to manipulate the configuration of\na VPN Connection. Each VPN Connection is assigned a VPN Connection Identifier\nand is associated with two other identifiers, namely the\nCustomer Gateway Identifier and the Virtual Private Gateway Identifier.\n\nYour VPN Connection ID		         : "
    + escapeExpression(((stack1 = (depth0 && depth0.vpnConnectionId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\nYour Virtual Private Gateway ID          : "
    + escapeExpression(((stack1 = (depth0 && depth0.vpnGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\nYour Customer Gateway ID    		 : "
    + escapeExpression(((stack1 = (depth0 && depth0.customerGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nA VPN Connection consists of a pair of IPSec tunnel security associations (SAs).\nIt is important that both tunnel security associations be configured.\n\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.tunnel), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n\nAdditional Notes and Questions\n================================================================================\n\n  - Amazon Virtual Private Cloud Getting Started Guide:\n      http://docs.amazonwebservices.com/AmazonVPC/latest/GettingStartedGuide\n  - Amazon Virtual Private Cloud Network Administrator Guide:\n      http://docs.amazonwebservices.com/AmazonVPC/latest/NetworkAdminGuide\n  - XSL Version: 2009-07-15-1119716";
  return buffer;
  };
TEMPLATE.configurationDownload=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<section id=\"modal-run-mesos\">\n  <div class=\"modal-control-group clearfix\" data-bind=\"true\">\n      <label class=\"label\" for=\"app-name\">Deployment Name</label>\n      <input id=\"app-name\" class=\"input modal-input-value\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\">\n      <div class=\"runtime-error\" id=\"runtime-error-appname\"></div>\n  </div>\n	<div class=\"modal-control-group clearfix\">\n	  <label class=\"label var-label\">Specify the variable value for this deployment:</label>\n	  <ul class=\"para-list\">\n	  	<li class=\"para-item\">\n		  <input class=\"input key\" value=\"$env\" disabled />\n		  <input class=\"input value\" />\n		</li>\n		<li class=\"para-item\">\n		  <input class=\"input key\" value=\"$ver\" disabled />\n		  <input class=\"input value\" />\n	    </li>\n	  </ul>\n	</div>\n  <div class=\"modal-control-group clearfix\" data-bind=\"true\">\n      <label class=\"label url-label\" for=\"app-url\">Specify the URL of your Mesos Cluster’s Master:</label>\n      <input id=\"app-url\" class=\"input\" type=\"text\">\n      <div class=\"runtime-error\" id=\"runtime-error-appurl\"></div>\n  </div>\n  <div class=\"mesos-tip\">You need to have a running Mesos Cluster first, either using VisualOps Mesos Sample Stack or your own deployment.</div>\n</section>";
  return buffer;
  };
TEMPLATE.modalRunMesos=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"warning-text\">\n                "
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_WARNNING_IN_MODAL", ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.url), {hash:{},data:data}))
    + "\n            </div>\n        ";
  return buffer;
  }

  buffer += "<section id=\"modal-run-stack\">\n    <div class=\"payment-wrapper\">\n        <div class=\"modal-control-group clearfix\" data-bind=\"true\">\n            <label class=\"label\" for=\"app-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.APP_NAME", {hash:{},data:data}))
    + "</label>\n            <input id=\"app-name\" class=\"input modal-input-value\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\">\n            <div class=\"runtime-error\" id=\"runtime-error-appname\"></div>\n        </div>\n        <div class=\"modal-control-group default-kp-group clearfix\" style=\"display:none;\">\n            <label for=\"\">$DefaultKeyPair</label>\n            <div id=\"kp-runtime-placeholder\"></div>\n            <div class=\"runtime-error\" id=\"runtime-error-kp\"></div>\n        </div>\n        <div class=\"modal-control-group app-usage-group clearfix\">\n            <label for=\"\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.APP_USAGE", {hash:{},data:data}))
    + "</label>\n            <div id=\"app-usage-selectbox\" class=\"selectbox\">\n                <div class=\"selection\"><i class=\"icon-app-type-testing\"></i>Testing</div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                    <li class=\"selected item\" data-value=\"testing\"><i class=\"icon-app-type-testing\"></i>Testing</li>\n                    <li class=\"item\" data-value=\"development\"><i class=\"icon-app-type-development\"></i>Development</li>\n                    <li class=\"item\" data-value=\"production\"><i class=\"icon-app-type-production\"></i>Production</li>\n                    <li class=\"item\" data-value=\"others\"><i class=\"icon-app-type-others\" data-value=\"testing\"></i>Others</li>\n                    <li class=\"item\" data-value=\"custom\"><i class=\"icon-app-type-custom\" data-value=\"custom\"></i>Custom</li>\n                </ul>\n            </div>\n            <input type=\"text\" class=\"input custom-app-usage\" placeholder=\"custom\" maxlength=\"32\" />\n        </div>\n        <div class=\"stack-validation\">\n            <details open style=\"display:none;\">\n                <summary>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_VALIDATION", {hash:{},data:data}))
    + "<span class=\"nutshell\">:<label></label></span></summary>\n                <div id=\"stack-run-validation-container\"></div>\n            </details>\n            <div class=\"validating\">\n                <div class=\"loading-spinner loading-spinner-small\"></div>\n                <p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.VALIDATING_STACK", {hash:{},data:data}))
    + "</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"payment-wrapper-right\">\n        <div class=\"estimate clearfix\">\n            <div class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "ESTIMATED_AWS_COST", {hash:{},data:data}))
    + "</div>\n            <div class=\"price\" id=\"label-total-fee\"><b>$"
    + escapeExpression(((stack1 = (depth0 && depth0.total_fee)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> "
    + escapeExpression(helpers.i18n.call(depth0, "PER_MONTH", {hash:{},data:data}))
    + "</div>\n        </div>\n        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.paymentState), "pastdue", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</section>\n<section class=\"members-only hide\">\n    "
    + escapeExpression(helpers.i18n.call(depth0, "WAIT_FOR_ADMIN_FINISH_CREDENTIAL", {hash:{},data:data}))
    + "\n</section>\n<section style=\"position: absolute; bottom: 21px; left: 17px;\" class=\"property-content \">\n  <div class=\"dryrun checkbox left\" style=\"margin-top: 0px;\"> <input id=\"ipt-dryrun\" type=\"checkbox\"> <label for=\"ipt-dryrun\"></label> </div>\n  <label for=\"ipt-dryrun\" class=\"left\">Dry Run Mode</label>\n  <i class=\"icon-info tooltip left\" style=\"margin-top:2px;\" data-tooltip=\"Checks whether have the required permissions for every action, without actually operate AWS resources and only check for EC2 resources.\"></i>\n</section>";
  return buffer;
  };
TEMPLATE.modalRunStack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.deletable), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"rule-list-row\">\n	<div class='rule-direction-icon tooltip icon-"
    + escapeExpression(((stack1 = (depth0 && depth0.direction)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "' data-tooltip='";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.direction), "inbound", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></div>\n	<div class='rule-reference tooltip truncate' data-tooltip='";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.direction), "inbound", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.color), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = (depth0 && depth0.relation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</div>\n<div class=\"rule-list-row\">\n	<div><span class=\"rule-protocol tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_TIP_PROTOCOL", {hash:{},data:data}))
    + "' >"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n	<div class='rule-port tooltip' data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_TIP_PORT_CODE", {hash:{},data:data}))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</div>\n";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.deletable), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ruleSetId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-protocol=\""
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-port=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-relation=\""
    + escapeExpression(((stack1 = (depth0 && depth0.relation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-relationid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.relationId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-direction=\""
    + escapeExpression(((stack1 = (depth0 && depth0.direction)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"pos-r\">\n";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n<li>\n";
  }

function program6(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.SG_TIP_INBOUND", {hash:{},data:data}));
  }

function program8(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.SG_TIP_OUTBOUND", {hash:{},data:data}));
  }

function program10(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "IDE.POP_SGRULE_LBL_SOURCE", {hash:{},data:data}));
  }

function program12(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "IDE.POP_SGRULE_LBL_DEST", {hash:{},data:data}));
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"sg-color\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "";
  buffer += "<a href=\"#\" class=\"sg-rule-delete icon-remove tooltip rule-remove-icon\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_TIP_REMOVE_RULE", {hash:{},data:data}))
    + "'></a>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.sgRuleList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<h3 class=\"truncate\"><span class=\"sg-color sg-color-rule-header\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n<ul class=\"sg-rule-list\">";
  stack1 = ((stack1 = (depth0 && depth0.content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.groups), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.groupedSgRuleList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<header class=\"mega-list-wraper-header\"><span class=\"sg-color sg-color-rule-header\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</header>\n<ul class=\"mega-list-wraper\">\n";
  stack1 = ((stack1 = (depth0 && depth0.content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  }

  buffer += "<p>"
    + escapeExpression(helpers.i18n.call(depth0, "SG_RULE_WILL_BE_DELETED", {hash:{},data:data}))
    + "</p>\n<article class=\"scroll-wrap delete-sgrule-dialog\">\n<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n</article>";
  return buffer;
  };
TEMPLATE.groupedSgRuleListDelConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"input-ip-item\">\n  <div class=\"name tooltip\" data-tooltip=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.autoAssign), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n    <label class=\"input-ip-wrap\" for=\"propertyIpListItem-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><span class=\"input-ip-prefix\">"
    + escapeExpression(((stack1 = (depth0 && depth0.prefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <input type=\"text\" class=\"input input-ip\"  id=\"propertyIpListItem-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.suffix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.editable), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-ignore=\"true\" data-ignore-regexp=\"^[0-9.x]*$\" data-required=\"true\">\n    </label>\n  </div>\n  <div class=\"input-ip-eip-btn tooltip toggle-eip";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasEip), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tooltip=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasEip), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></div>\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.unDeletable), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_IP_MSG_2", {hash:{},data:data}));
  }

function program4(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_IP_MSG_1", {hash:{},data:data}));
  }

function program6(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program8(depth0,data) {
  
  
  return " associated";
  }

function program10(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_IP_MSG_4", {hash:{},data:data}));
  }

function program12(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_IP_MSG_3", {hash:{},data:data}));
  }

function program14(depth0,data) {
  
  
  return "<div class=\"icon-remove\"></div>";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.propertyIpList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n		<div class=\"modal-text-minor\" style=\"margin-top:10px;\"><i class=\"icon-inbound\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_INBOUND", {hash:{},data:data}))
    + "</div>\n	";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n	<div class=\"radio-group-horizontal\">\n		<div class=\"radio\">\n			<input id=\"radio_inbound\" type=\"radio\" name=\"sg-direction\" checked=\"checked\" value=\"inbound\" />\n			<label for=\"radio_inbound\"></label>\n		</div>\n		<label for=\"radio_inbound\" ><i class=\"icon-inbound icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_INBOUND", {hash:{},data:data}))
    + "</label>\n	</div>\n	<div class=\"radio-group-horizontal\">\n		<div class=\"radio\">\n			<input id=\"radio_outbound\" type=\"radio\" name=\"sg-direction\" value=\"outbound\"/>\n			<label for=\"radio_outbound\"></label>\n		</div>\n		<label for=\"radio_outbound\"><i class=\"icon-outbound icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_OUTBOUND", {hash:{},data:data}))
    + "</label>\n	</div>\n	";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<li class=\"item truncate\" data-id=\"sg\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><span class=\"sg-color\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n			";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\n				";
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n				<li class=\"item\" data-id=\"custom\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_CUSTOM", {hash:{},data:data}))
    + "</li>\n				<li class=\"item\" data-id=\"all\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_ALL", {hash:{},data:data}))
    + "</li>\n				";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\n			<div class=\"sg-protocol-option-input\" id=\"sg-protocol-custom\">\n				<input class=\"input\" name=\"protocol-custom-ranged\" placeholder=\"0-255\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9]*$\" data-required=\"true\">\n			</div>\n			<div class=\"sg-protocol-option-input\" id=\"sg-protocol-all\">\n				Port Range:<span>0-65535</span>\n			</div>\n		";
  }

  buffer += "<div class=\"modal-control-group clearfix\" data-bind=\"true\">\n	<label class=\"label-short\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_DIRECTION", {hash:{},data:data}))
    + "</label>\n	<div id=\"sg-modal-direction\">\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isClassic), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n</div>\n<div class=\"modal-control-group clearfix\">\n	<label class=\"label-short\" for=\"securitygroup-modal-description\" id=\"rule-modal-ip-range\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_SOURCE", {hash:{},data:data}))
    + "</label>\n	<div class=\"selectbox\" id=\"sg-add-model-source-select\">\n		<div class=\"selection\">IP...</div>\n		<ul class=\"dropdown\">\n			<li class=\"item selected\" data-id=\"custom\">IP...</li>\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sgList), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	</div>\n	<input class=\"input\" type=\"text\" id=\"securitygroup-modal-description\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" data-required=\"true\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PLACEHOLD_SOURCE", {hash:{},data:data}))
    + "'>\n</div>\n<div class=\"modal-control-group clearfix\">\n	<label class=\"label-short\" >"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_PROTOCOL", {hash:{},data:data}))
    + "</label>\n	<div class=\"modal-protocol-select\">\n		<div class=\"selectbox\" id=\"modal-protocol-select\"  data-protocal-type=\"tcp\">\n			<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_TCP", {hash:{},data:data}))
    + "</div>\n			<ul class=\"dropdown\" tabindex=\"-1\">\n				<li class=\"selected item\" data-id=\"tcp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_TCP", {hash:{},data:data}))
    + "</li>\n				<li class=\"item\" data-id=\"udp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_UDP", {hash:{},data:data}))
    + "</li>\n				<li class=\"item\" data-id=\"icmp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_ICMP", {hash:{},data:data}))
    + "</li>\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isClassic), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</ul>\n		</div>\n	</div>\n	<div id=\"sg-protocol-select-result\">\n		<div class=\"sg-protocol-option-input show\" id=\"sg-protocol-tcp\">\n			<input class=\"input\" type=\"text\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PLACEHOLD_PORT_RANGE", {hash:{},data:data}))
    + "' data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\"  data-required=\"true\"/>\n		</div>\n		<div class=\"sg-protocol-option-input\" id=\"sg-protocol-udp\">\n			<input class=\"input\" type=\"text\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PLACEHOLD_PORT_RANGE", {hash:{},data:data}))
    + "' data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\"/>\n		</div>\n\n		<div class=\"sg-protocol-option-input\" id=\"sg-protocol-icmp\">\n			<div class=\"selectbox\" id=\"protocol-icmp-main-select\" data-protocal-main=\"0\"  data-protocal-sub=\"-1\">\n			<div class=\"selection\">Echo Reply(0)</div>\n			<div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\n				<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n				<ul tabindex=\"-1\" class=\"scroll-content\">\n					<li class=\"item selected\" data-id=\"0\">Echo Reply(0)</li>\n					<li class=\"item\" data-id=\"3\">Destination Unreachable(3) ...</li>\n					<li class=\"item\" data-id=\"4\">Source Quench(4)</li>\n					<li class=\"item\" data-id=\"5\">Redirect Message(5) ...</li>\n					<li class=\"item\" data-id=\"6\">Alternate Host Address(6)</li>\n					<li class=\"item\" data-id=\"8\">Echo Request(8)</li>\n					<li class=\"item\" data-id=\"9\">Router Advertisement(9)</li>\n					<li class=\"item\" data-id=\"10\">Router Solicitation(10)</li>\n					<li class=\"item\" data-id=\"11\">Time Exceeded(11) ...</li>\n					<li class=\"item\" data-id=\"12\">Parameter Problem: Bad IP header(12) ...</li>\n					<li class=\"item\" data-id=\"13\">Timestamp(13)</li>\n					<li class=\"item\" data-id=\"14\">Timestamp Reply(14)</li>\n					<li class=\"item\" data-id=\"15\">Information Request(15)</li>\n					<li class=\"item\" data-id=\"16\">Information Reply(16)</li>\n					<li class=\"item\" data-id=\"17\">Address Mask Request(17)</li>\n					<li class=\"item\" data-id=\"18\">Address Mask Reply(18)</li>\n					<li class=\"item\" data-id=\"30\">Traceroute(30)</li>\n					<li class=\"item\" data-id=\"31\">Datagram Conversion Error(31)</li>\n					<li class=\"item\" data-id=\"32\">Mobile Host Redirect(32)</li>\n					<li class=\"item\" data-id=\"33\">Where Are You(33)</li>\n					<li class=\"item\" data-id=\"34\">Here I Am(34)</li>\n					<li class=\"item\" data-id=\"35\">Mobile Registration Request(35)</li>\n					<li class=\"item\" data-id=\"36\">Mobile Registration Reply(36)</li>\n					<li class=\"item\" data-id=\"37\">Domain Name Request(37)</li>\n					<li class=\"item\" data-id=\"38\">Domain Name Reply(38)</li>\n					<li class=\"item\" data-id=\"39\">SKIP Algorithm Discovery Protocol(39)</li>\n					<li class=\"item\" data-id=\"40\">Photuris Security Failures(40)</li>\n					<li class=\"item\" data-id=\"-1\">All(-1)</li>\n				</ul>\n			</div>\n			</div>\n		</div>\n\n		<div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-3\">\n			<div class=\"selection\">All(-1)</div>\n			<div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\n				<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n				<ul class=\"scroll-content\" tabindex=\"-1\">\n					<li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n					<li class=\"item\" data-id=\"0\">destination network unreachable(0)</li>\n					<li class=\"item\" data-id=\"1\">destination host unreachable(1)</li>\n					<li class=\"item\" data-id=\"2\">destination protocol unreachable(2)</li>\n					<li class=\"item\" data-id=\"3\">destination port unreachable(3)</li>\n					<li class=\"item\" data-id=\"4\">fragmentation required and DF flag set(4)</li>\n					<li class=\"item\" data-id=\"5\">source route failed(5)</li>\n					<li class=\"item\" data-id=\"6\">destination network unknown(6)</li>\n					<li class=\"item\" data-id=\"7\">destination host unknown(7)</li>\n					<li class=\"item\" data-id=\"8\">source host isolated(8)</li>\n					<li class=\"item\" data-id=\"9\">network administratively prohibited(9)</li>\n					<li class=\"item\" data-id=\"10\">host administratively prohibited(10)</li>\n					<li class=\"item\" data-id=\"11\">network unreachable for TOS(11)</li>\n					<li class=\"item\" data-id=\"12\">host unreachable for TOS(12)</li>\n					<li class=\"item\" data-id=\"13\">communication administratively prohibited(13)</li>\n				</ul>\n			</div>\n		</div>\n\n		<div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-5\">\n			<div class=\"selection\">All(-1)</div>\n			<ul class=\"dropdown\" tabindex=\"-1\">\n				<li class=\"selected item\" data-id=\"-1\">All(-1)</li>\n				<li class=\"item\" data-id=\"0\">redirect datagram for the network(0)</li>\n				<li class=\"item\" data-id=\"1\">redirect datagram for the host(1)</li>\n				<li class=\"item\" data-id=\"2\">redirect datagram for the TOS & network(2)</li>\n				<li class=\"item\" data-id=\"3\">redirect datagram for the TOS & host(3)</li>\n			</ul>\n		</div>\n\n		<div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-11\">\n			<div class=\"selection\">All(-1)</div>\n			<ul class=\"dropdown\" tabindex=\"-1\">\n				<li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n				<li class=\"item\" data-id=\"0\">TTL expired transit(0)</li>\n				<li class=\"item\" data-id=\"1\">fragmentation reasembly time exceeded(1)</li>\n			</ul>\n		</div>\n\n		<div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-12\">\n			<div class=\"selection\">All(-1)</div>\n			<ul class=\"dropdown\" role=\"menu\">\n				<li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n				<li class=\"item\" data-id=\"0\">pointer indicates the error(0)</li>\n				<li class=\"item\" data-id=\"1\">missing a required option(1)</li>\n				<li class=\"item\" data-id=\"2\">bad length(2)</li>\n			</ul>\n		</div>\n\n		";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isClassic), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n</div>";
  return buffer;
  };
TEMPLATE.modalSGRule=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<section class=\"password-hint\">\n	<p class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "INSTANCE_ASSO_WITH_KEYPAIR", {hash:{},data:data}))
    + "<span>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></p>\n	<p>"
    + escapeExpression(helpers.i18n.call(depth0, "TO_ACCESS_THIS_INSTANCE_REMOTELY", {hash:{},data:data}))
    + "</p>\n</section>\n<section class=\"import-zone\">\n	<div id='keypair-loading' class=\"loading-spinner\"></div>\n</section>\n<section class=\"decrypt-action\" style=\"display: none;\">\n	<button class=\"btn btn-blue\" id=\"do-kp-decrypt\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "DECRYPT_PASSWORD", {hash:{},data:data}))
    + "</button>\n	<input readonly class=\"input\" type=\"text\" id=\"keypair-pwd\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "DECRYPTED_PASSWORD_WILL_APPEAR_HERE", {hash:{},data:data}))
    + "\">\n	<div class=\"change-pw-recommend icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "RECOMMEND_CHANGE_PASSWORD", {hash:{},data:data}))
    + "\" style=\"display: none;\">"
    + escapeExpression(helpers.i18n.call(depth0, "CHANGE_PASSWORD_RECOMMENDATION_FROM_AWS", {hash:{},data:data}))
    + "</div>\n</section>\n<section class=\"no-password\" style=\"display: none;\">\n	<p>\n		"
    + escapeExpression(helpers.i18n.call(depth0, "YOUR_PASSWORD_IS_NOT_READY", {hash:{},data:data}))
    + "\n	</p>\n\n	<p>\n		"
    + escapeExpression(helpers.i18n.call(depth0, "PASSWORD_OF_OWN_AMI", {hash:{},data:data}))
    + "\n	</p>\n</section>";
  return buffer;
  };
TEMPLATE.modalDecryptPassword=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "class=\"hide\"";
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n	<div class=\"keypair-download clearfix modal-control-group\">\n		<p class=\"modal-text-major left\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PAIR_DATA_IS_READY", {hash:{},data:data}))
    + "</p>\n		<a href=\"#\" class=\"btn btn-blue right\" id=\"keypair-kp-download\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DOWNLOAD", {hash:{},data:data}))
    + "</a>\n	</div>\n	";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"keypair-download clearfix modal-control-group\">\n		<p class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "INSTANCE_ASSO_WITH_KP", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n	</div>\n	";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div id=\"keypair-remote\" class=\"modal-control-group clearfix\">\n		<label for=\"keypair-cmd\">"
    + escapeExpression(helpers.i18n.call(depth0, "LBL_REMOTE_ACCESS", {hash:{},data:data}))
    + "</label>\n		<input class=\"input\" id=\"keypair-cmd\" type=\"text\" readonly=\"readonly\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.loginCmd)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	</div>\n	";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n	<div class=\"modal-control-group clearfix\">\n		<label style=\"width:100%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "WINDOWS_LOGIN_PASSWORD", {hash:{},data:data}))
    + "</label>\n		<div id=\"keypair-login\">\n			<input type=\"password\" readonly=\"readonly\" id=\"keypair-pwd-old\" class=\"input\">\n			<a href=\"#\" class=\"btn btn-silver kp-copy-btn\" id=\"keypair-show\">"
    + escapeExpression(helpers.i18n.call(depth0, "SHOW_PASSWORD", {hash:{},data:data}))
    + "</a>\n		</div>\n		<div id=\"keypair-no-pwd\"></div>\n	</div>\n	";
  return buffer;
  }

  buffer += "<section id=\"keypair-body\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isOldKp), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isOldKp), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.windows), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</section>";
  return buffer;
  };
TEMPLATE.modalDownloadKP=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<article>\n	<div class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "MISSING_PROPERTY_PANEL", {hash:{},data:data}))
    + "</div>\n</article>";
  return buffer;
  };
TEMPLATE.missingPropertyPanel=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<article>\n	<div class=\"property-control-group\">"
    + escapeExpression(((stack1 = (depth0 && depth0.asgName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "ASG_DELETED_IN_STOPPED_APP", {hash:{},data:data}))
    + "</div>\n</article>";
  return buffer;
  };
TEMPLATE.missingAsgWhenStop=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n	<div class=\"modal-text-major\">"
    + escapeExpression(((stack1 = (depth0 && depth0.main_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"modal-text-minor\">"
    + escapeExpression(((stack1 = (depth0 && depth0.desc_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</div> </div>";
  return buffer;
  };
TEMPLATE.setupCIDRConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-body\">\n	<div class=\"modal-center-align-helper\">\n		<p>"
    + escapeExpression(((stack1 = (depth0 && depth0.host)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(helpers.i18n.call(depth0, "HOST_HAS_BEEN_ASSIGNED_PUBLIC_IP", {hash:{},data:data}))
    + "</p>\n		<p>"
    + escapeExpression(helpers.i18n.call(depth0, "PUBLIC_IP_MUST_BE_REMOVED", (depth0 && depth0.host), {hash:{},data:data}))
    + "</p>\n		<p>"
    + escapeExpression(helpers.i18n.call(depth0, "CONFIRM_REMOVE_PUBLIC_IP", (depth0 && depth0.eni), (depth0 && depth0.host), {hash:{},data:data}))
    + "</p>\n	</div>\n</div>";
  return buffer;
  };
TEMPLATE.modalAttachingEni=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-wraper\">\n	 <div class=\"modal-center-align-helper\">\n		<div class=\"modal-text-major\">"
    + escapeExpression(((stack1 = (depth0 && depth0.main_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		<div class=\"modal-text-minor\">"
    + escapeExpression(((stack1 = (depth0 && depth0.desc_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	</div>\n </div>";
  return buffer;
  };
TEMPLATE.modalDeleteSGOrACL=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"loading-modal-wrap\">\n	<div class=\"loading-modal\" id=\"modal-box\">\n		<div class=\"loading-spinner loading-spinner-mid\"></div>\n		<div>"
    + escapeExpression(helpers.i18n.call(depth0, "REFRESHING_RESOURCES", {hash:{},data:data}))
    + "</div>\n	</div>\n</div>";
  return buffer;
  };
TEMPLATE.loadingTransparent=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <h3 class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_MAJOR_TEXT_RUNNING", {hash:{},data:data}))
    + "</h3>\n                ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <h3 class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_MAJOR_TEXT_STOPPED", {hash:{},data:data}))
    + "</h3>\n                    <p class=\"modal-text-minor\" style=\"margin-top:10px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_MINOR_TEXT_STOPPED", {hash:{},data:data}))
    + "</p>\n                ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <ul class=\"error-message-wrapper\">\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.notification), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n                            <li class=\"error-message\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>\n                        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <section class=\"mgt10 checkbox-wrap\">\n                        <div class=\"checkbox\">\n                            <input id=\"take-rds-snapshot\" type=\"checkbox\" checked=\"checked\" name=\"dns-resolution\">\n                            <label for=\"take-rds-snapshot\"></label>\n                        </div>\n                        <label for=\"take-rds-snapshot\">"
    + escapeExpression(helpers.i18n.call(depth0, "TAKE_FINAL_SNAPSHOT_FOR_DB_INSTANCES", {hash:{},data:data}))
    + "</label>\n                    </section>\n                    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notReadyDB)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <p class=\"cant-snapshot\">"
    + escapeExpression(helpers.i18n.call(depth0, "DB_INSTANCE", {hash:{},data:data}))
    + "\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.notReadyDB), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            "
    + escapeExpression(helpers.i18n.call(depth0, "CANNOT_TAKE_FINAL_SNAPSHOT", {hash:{},data:data}))
    + "</p>\n                    ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "(<span\n                                    class=\"db-stop-status\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)";
  return buffer;
  }
function program11(depth0,data) {
  
  
  return ", ";
  }

function program13(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div class=\"payment-warning\">\n                "
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_WARNNING_IN_MODAL", (depth0 && depth0['payment-link']), {hash:{},data:data}))
    + "\n            </div>\n        ";
  return buffer;
  }

  buffer += "<div id=\"app-apply-update\">\n    <div class=\"payment-wrapper\">\n        <div class=\"scroll-wrap\" style=\"max-height:455px;min-height:210px;\">\n            <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n            <div class=\"scroll-content\">\n                <div class=\"modal-control-group default-kp-group clearfix\" style=\"display:none;\">\n                    <label for=\"kp-runtime-placeholder\">$DefaultKeyPair</label>\n                    <div id=\"kp-runtime-placeholder\"></div>\n                    <div class=\"runtime-error\" id=\"runtime-error-kp\"></div>\n                </div>\n                <div class=\"modal-control-group app-usage-group clearfix update-app\">\n                    <label for=\"\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.APP_USAGE", {hash:{},data:data}))
    + "</label>\n                    <div id=\"app-usage-selectbox\" class=\"selectbox\">\n                        <div class=\"selection\"><i class=\"icon-app-type-testing\"></i>Testing</div>\n                        <ul class=\"dropdown\" tabindex=\"-1\">\n                            <li class=\"selected item\" data-value=\"testing\"><i class=\"icon-app-type-testing\"></i>Testing</li>\n                            <li class=\"item\" data-value=\"development\"><i class=\"icon-app-type-development\"></i>Development</li>\n                            <li class=\"item\" data-value=\"production\"><i class=\"icon-app-type-production\"></i>Production</li>\n                            <li class=\"item\" data-value=\"others\"><i class=\"icon-app-type-others\" data-value=\"testing\"></i>Others</li>\n                            <li class=\"item\" data-value=\"custom\"><i class=\"icon-app-type-custom\" data-value=\"custom\"></i>Custom</li>\n                        </ul>\n                    </div>\n                    <input type=\"text\" class=\"input custom-app-usage\" placeholder=\"custom\" maxlength=\"32\" />\n                </div>\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRunning), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <div id=\"release-eips-placeholder\"></div>\n                <div class=\"scroll-wrap\" style=\"max-height:256px;\">\n                    <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                    <div class=\"scroll-content res_diff_tree\" id=\"app-update-summary-table\">\n                    </div>\n                </div>\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.notification), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.removeList)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <div class=\"stack-validation\">\n                    <details open style=\"display:none;\">\n                        <summary>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_VALIDATION", {hash:{},data:data}))
    + "<span class=\"nutshell\">:<label></label></span></summary>\n                        <div id=\"stack-run-validation-container\"></div>\n                    </details>\n                    <div class=\"validating\">\n                        <div class=\"loading-spinner loading-spinner-small\"></div>\n                        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_VALIDATING", {hash:{},data:data}))
    + "</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"payment-wrapper-right\">\n        <div class=\"estimate clearfix\">\n            <div class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "ESTIMATED_AWS_COST", {hash:{},data:data}))
    + "</div>\n            <div class=\"price\" id=\"label-total-fee\"><b>"
    + escapeExpression(helpers.i18n.call(depth0, "MONEY_SYMBOL", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.total_fee)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b>"
    + escapeExpression(helpers.i18n.call(depth0, "PER_MONTH", {hash:{},data:data}))
    + "</div>\n        </div>\n        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.paymentState), "past_due", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <section style=\"position: absolute; bottom: -43px; left: 17px;\" class=\"property-content\">\n      <div class=\"dryrun checkbox left\" style=\"margin-top: 0px;\"> <input id=\"ipt-dryrun\" type=\"checkbox\"> <label for=\"ipt-dryrun\"></label> </div>\n      <label for=\"ipt-dryrun\" class=\"left\">Dry Run Mode</label>\n      <i class=\"icon-info tooltip left\" style=\"margin-top:2px;\" data-tooltip=\"Checks whether have the required permissions for every action, without actually operate AWS resources and only check for EC2 resources.\"></i>\n    </section>\n</div>";
  return buffer;
  };
TEMPLATE.updateApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span class=\"resource-tag\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>(<span class=\"warning-text\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>) ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return ", ";
  }

  buffer += "<p class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "DB_INSTANCE", {hash:{},data:data}))
    + "\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    "
    + escapeExpression(helpers.i18n.call(depth0, "CANNOT_BE_MODIFIED_NOW", {hash:{},data:data}))
    + "</p>\n<p>"
    + escapeExpression(helpers.i18n.call(depth0, "WAIT_FOR_DB_THEN_UPDATE", {hash:{},data:data}))
    + "</p>";
  return buffer;
  };
TEMPLATE.cantUpdateApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loadingSpinner=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"node-action-wrap\">\n	<div id=\"node-action-state\">\n		<div id=\"node-action-state-btn\">\n			<i id=\"node-state-icon\"></i>\n			<span id=\"node-state-number\">"
    + escapeExpression(((stack1 = (depth0 && depth0.state_num)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n		</div>\n		<div class=\"node-action-tooltip\">"
    + escapeExpression(helpers.i18n.call(depth0, "EDIT_STATE", {hash:{},data:data}))
    + "</div>\n	</div>\n</div>";
  return buffer;
  };
TEMPLATE.nodeAction=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"instance-sys-log-loading loading-spinner\"></section>\n<div class=\"instance-sys-log-content\">"
    + escapeExpression(((stack1 = (depth0 && depth0.log_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"instance-sys-log-info modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "SYSTEM_LOG_NOT_READY", {hash:{},data:data}))
    + "</div>";
  return buffer;
  };
TEMPLATE.modalInstanceSysLog=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "CONFIRM_TO_DELETE_XXX", (depth0 && depth0.name), {hash:{},data:data}))
    + "</div>\n<div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "ONCE_DELETE_STATE_CONF_LOST", (depth0 && depth0.name), {hash:{},data:data}))
    + "</div>";
  return buffer;
  };
TEMPLATE.NodeStateRemoveConfirmation=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "CONFIRM_TO_DELETE_XXX", (depth0 && depth0.name), {hash:{},data:data}))
    + "</div>\n<div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "THE_SG_WILL_BE_DELETED", (depth0 && depth0.sg), {hash:{},data:data}))
    + "</div>";
  return buffer;
  };
TEMPLATE.ElbRemoveConfirmation=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "NAT_INSTANCE_MEET_REQ", {hash:{},data:data}))
    + "</div>\n<div class=\"bubble-content\">\n	<ul class=\"bubble-NAT-req-list\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "NAT_INSTANCE_REQS", {hash:{},data:data}))
    + "\n	</ul>\n</div>";
  return buffer;
  };
TEMPLATE.bubbleNATreq=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var escapeExpression=this.escapeExpression;


  return escapeExpression(helpers.nl2br.call(depth0, (depth0 && depth0.content), {hash:{},data:data}));
  };
TEMPLATE.covertNl2br=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var escapeExpression=this.escapeExpression;


  return escapeExpression(helpers.breaklines.call(depth0, (depth0 && depth0.content), {hash:{},data:data}));
  };
TEMPLATE.convertBreaklines=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return " unread";
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <i class=\"icon-error\"></i>\n      <div class=\"content\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.NOTI_FAILED", (depth0 && depth0.targetName), (depth0 && depth0.operation), (depth0 && depth0.region), {hash:{},data:data}))
    + "</div>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <i class=\"icon-pending\"></i>\n      <div class=\"content\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.NOTI_SENDING", (depth0 && depth0.operation), (depth0 && depth0.targetName), (depth0 && depth0.region), {hash:{},data:data}))
    + "</div>\n    ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <i class=\"icon-pending\"></i>\n      <div class=\"content\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.NOTI_PROCESSING", (depth0 && depth0.operation), (depth0 && depth0.targetName), (depth0 && depth0.region), {hash:{},data:data}))
    + "</div>\n    ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <i class=\"icon-success\"></i>\n      <div class=\"content\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.NOTI_SUCCESSFULLY", (depth0 && depth0.targetName), (depth0 && depth0.operation), (depth0 && depth0.region), {hash:{},data:data}))
    + "</div>\n    ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"notification-details\">"
    + escapeExpression(((stack1 = (depth0 && depth0.error)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>";
  return buffer;
  }

  buffer += "<li class=\"notification-item";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.readed), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n  <div class=\"notification-message\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.failed), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.pending), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.processing), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.completed), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.error), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"notification-duration left\">"
    + escapeExpression(((stack1 = (depth0 && depth0.duration)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  <div class=\"timestamp\">"
    + escapeExpression(((stack1 = (depth0 && depth0.time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</li>";
  return buffer;
  };
TEMPLATE.headerNotifyItem=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.name), {hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n        <input class=\"tokenName input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" readonly/>\n        <span class=\"tokenToken click-select truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.token)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        ";
  stack1 = helpers['if'].call(depth0, (depth2 && depth2.isAdmin), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "";
  buffer += "<span class=\"tokenControl\">\n            <button class=\"tooltip icon-edit\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "ACCESS_TOKEN_EDIT_TIP", {hash:{},data:data}))
    + "\"></button>\n            <button class=\"tooltip icon-delete\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "ACCESS_TOKEN_DELETE_TIP", {hash:{},data:data}))
    + "\"></button>\n            <button class=\"btn btn-blue tokenDone\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_DONE", {hash:{},data:data}))
    + "</button>\n        </span>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.tokens), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.accessTokenTable=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " class=\"modal-wrapper-fix\"";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style=\"width: "
    + escapeExpression(((stack1 = (depth0 && depth0.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\"";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"modal-header\">\n            <h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideClose), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        ";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return "<i class=\"modal-close\">×</i>";
  }

function program10(depth0,data) {
  
  
  return " scroll-wrap scrollbar-auto-hide";
  }

function program12(depth0,data) {
  
  
  return "padding: 0;";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " max-height: "
    + escapeExpression(((stack1 = (depth0 && depth0.maxHeight)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                <div class=\"scroll-content\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.compact), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                    ";
  stack1 = ((stack1 = (depth0 && depth0.template)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n            ";
  return buffer;
  }
function program17(depth0,data) {
  
  
  return " style=\"padding: 0;\"";
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = ((stack1 = (depth0 && depth0.template)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"modal-footer\">\n            ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.confirm)),stack1 == null || stack1 === false ? stack1 : stack1.hide), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.cancel)),stack1 == null || stack1 === false ? stack1 : stack1.hide), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        ";
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<button class=\"btn modal-confirm btn-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.confirm)),stack1 == null || stack1 === false ? stack1 : stack1.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.confirm)),stack1 == null || stack1 === false ? stack1 : stack1.disabled), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.confirm)),stack1 == null || stack1 === false ? stack1 : stack1.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>";
  return buffer;
  }
function program23(depth0,data) {
  
  
  return " disabled ";
  }

function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<button class=\"btn modal-close btn-"
    + escapeExpression(helpers.or.call(depth0, ((stack1 = (depth0 && depth0.cancel)),stack1 == null || stack1 === false ? stack1 : stack1.color), "silver", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cancel)),stack1 == null || stack1 === false ? stack1 : stack1.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>";
  return buffer;
  }

  buffer += "<div class=\"modal-box "
    + escapeExpression(((stack1 = (depth0 && depth0.mode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <div";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.mode), "panel", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasHeader), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	    <div class=\"modal-body context-wrap";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasScroll), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.compact), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.maxHeight), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" >\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasScroll), {hash:{},inverse:self.program(19, program19, data),fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasFooter), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.modalTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"payment-no-card-wrapper\">\n    <div class=\"payment-credit-card\"></div>\n    <p class=\"modal-text-minor payment-text\">"
    + escapeExpression(helpers.i18n.call(depth0, "YOUR_FREE_POINTS_USED_UP", (depth0 && depth0.freePointsPerMonth), {hash:{},data:data}))
    + "</p>\n    <table class=\"table payment-table\">\n        <tbody>\n        <tr>\n            <td>"
    + escapeExpression(helpers.i18n.call(depth0, "INSTANCE_HOURS_PER_MONTH", (depth0 && depth0.freePointsPerMonth), {hash:{},data:data}))
    + "</td>\n            <td class=\"align-right\">"
    + escapeExpression(helpers.i18n.call(depth0, "LALEL_FREE", {hash:{},data:data}))
    + "</td>\n        </tr>\n        <tr>\n            <td>"
    + escapeExpression(helpers.i18n.call(depth0, "INSTANCE_HOURS_CONSUMED_OVER_XXX", (depth0 && depth0.freePointsPerMonth), {hash:{},data:data}))
    + "</td>\n            <td class=\"align-right\"><strong>$0.01</strong>/"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_INSTANT_HOUR", {hash:{},data:data}))
    + "</td>\n        </tr>\n        </tbody>\n    </table>\n    <a href=\"https://www.visualops.io/pricing\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "PRICING_IN_DETAIL", {hash:{},data:data}))
    + "</a>\n    <div class=\"payment-modal-wrap\">\n        <a href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"btn btn-blue btn-xlarge\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROVIDE_BILLING_INFORMATION", {hash:{},data:data}))
    + " <i class=\"icon-caret-right\"></i></a>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.providePayment=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <p class=\"modal-text-minor payment-text\">"
    + escapeExpression(helpers.i18n.call(depth0, "FAILED_TO_CHARGE_YOUR_CREDIT_CARD", {hash:{},data:data}))
    + "</p>\n    <div class=\"payment-modal-wrap\">\n        <a href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"btn btn-blue btn-xlarge route\">"
    + escapeExpression(helpers.i18n.call(depth0, "UPDATE_BILLING_INFORMATION", {hash:{},data:data}))
    + " <i class=\"icon-caret-right\"></i></a>\n    </div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <p class=\"modal-text-minor payment-text\">"
    + escapeExpression(helpers.i18n.call(depth0, "FAILED_TO_CHARGE_YOUR_CREDIT_CARD_MEMBER", {hash:{},data:data}))
    + "</p>\n    <p class=\"modal-text-minor payment-text\">"
    + escapeExpression(helpers.i18n.call(depth0, "WAIT_FOR_ADMIN_UPDATE_PAYMENT_MODAL", {hash:{},data:data}))
    + "</p>\n";
  return buffer;
  }

  buffer += "<div class=\"payment-credit-card payment-failed\"></div>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAdmin), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.paymentUpdate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"loading-zone\">\n    <p>"
    + escapeExpression(((stack1 = (depth0 && depth0.tip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    <div class=\"loading-spinner\"></div>\n</div>";
  return buffer;
  };
TEMPLATE.credentialLoading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div id=\"CredSetupWrap\">\n    <div id=\"CredSetupMsg\" class=\"cred-setup-msg empty-hide warning-red\"></div>\n    <div class=\"modal-control-group\">\n        <label for=\"CredSetupAlias\">"
    + escapeExpression(helpers.i18n.call(depth0, "CREDENTIAL_ALIAS", {hash:{},data:data}))
    + "</label>\n        <input autocomplete=\"off\" class=\"input\" id=\"CredSetupAlias\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.alias)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    </div>\n    <div class=\"modal-control-group\">\n        <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_ACCOUNTID", {hash:{},data:data}))
    + "\"></i>\n        <label for=\"CredSetupAccount\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNTID", {hash:{},data:data}))
    + "</label>\n        <input autocomplete=\"off\" class=\"input\" id=\"CredSetupAccount\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.awsAccount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    </div>\n    <div class=\"modal-control-group\">\n        <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_ACCESSKEY", {hash:{},data:data}))
    + "\"></i>\n        <label for=\"CredSetupAccessKey\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSKEY", {hash:{},data:data}))
    + "</label>\n        <input autocomplete=\"off\" class=\"input\" id=\"CredSetupAccessKey\" type=\"text\" placeholder=\""
    + escapeExpression(((stack1 = (depth0 && depth0.awsAccessKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    </div>\n    <div class=\"modal-control-group\">\n        <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_SECRETKEY", {hash:{},data:data}))
    + "\"></i>\n        <label for=\"CredSetupSecretKey\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_SECRETKEY", {hash:{},data:data}))
    + "</label>\n        <input autocomplete=\"off\" class=\"input\" id=\"CredSetupSecretKey\" type=\"password\" placeholder=\""
    + escapeExpression(((stack1 = (depth0 && depth0.awsSecretKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    </div>\n    <p class=\"warning-text\">"
    + escapeExpression(helpers.i18n.call(depth0, "CREDENTIAL_AUTHORIZE_NOTE", {hash:{},data:data}))
    + "</p>\n</div>";
  return buffer;
  };
TEMPLATE.credentialForm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"cred-setup-msg empty-hide warning-red\"></div>\n<div class=\"modal-text-major\">\n	"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATE_CONFIRM_TIT", {hash:{},data:data}))
    + "\n	<p class=\"modal-text-major\">\n		"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATE_CONFIRM_TEXT", {hash:{},data:data}))
    + "\n	</p>\n</div>";
  return buffer;
  };
TEMPLATE.updateCredentialConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li class=\"item\" data-value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n<div class=\"modal-control-group clearfix\">\n	<label class=\"label var-label\">Specify the variable value for this deployment:</label>\n	<ul class=\"para-list\">\n		<li class=\"para-item\">\n		<input class=\"input key\" value=\"$env\" disabled />\n		<input class=\"input value\" />\n	</li>\n	<li class=\"para-item\">\n		<input class=\"input key\" value=\"$ver\" disabled />\n		<input class=\"input value\" />\n	</li>\n	</ul>\n</div>\n<div class=\"modal-control-group clearfix\" data-bind=\"true\">\n	<label class=\"label url-label\" for=\"app-url\">Specify the URL of your Mesos Cluster’s Master:</label>\n	<input id=\"app-url\" class=\"input\" type=\"text\">\n	<div class=\"runtime-error\" id=\"runtime-error-appurl\"></div>\n</div>\n";
  }

  buffer += "<div id=\"modal-run-mesos\">\n<section class=\"apply-marathon-stack\">\n	<div class=\"modal-control-group clearfix\">\n  <label class=\"label url-label\">Link to a Marathon stack designed with VisualOps:</label>\n  <div id=\"app-usage-selectbox\" class=\"selectbox\">\n    <div class=\"selection\">Select existing Marathon stack …</div>\n    <ul class=\"dropdown\" tabindex=\"-1\">";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n  </div>\n</div>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</section>\n</div>";
  return buffer;
  };
TEMPLATE.applyMarathonStack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li class=\"item";
  stack1 = helpers.unless.call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.alias)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "("
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</li>\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

  buffer += "<ul class=\"tabs select-stack-type clearfix\">\n    <li class=\"tab-aws-stack active\">\n        <img src=\"/assets/images/ide/aws_stack.png\" alt=\"\"/>\n        <span class=\"stack-title\">AWS Stack</span>\n    </li>\n    <li class=\"tab-mesos-stack\">\n        <img src=\"/assets/images/ide/mesos_stack.png\" alt=\"\"/>\n        <span class=\"stack-title\">Mesos on AWS VPC</span>\n    </li>\n</ul>\n<div class=\"tabs-content\">\n    <div id=\"tab-aws-stack\">\n        <div class=\"control-group clearfix\">\n            <label>Region</label>\n            <div id=\"create-aws-stack-region\" class=\"selectbox\">\n                <div class=\"selection\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.firstRegion)),stack1 == null || stack1 === false ? stack1 : stack1.alias)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.firstRegion)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.awsRegions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div id=\"tab-mesos-stack\" class=\"hide\">\n        <div class=\"control-group clearfix\">\n            <label for=\"mesos-scale\">Scale</label>\n            <div id=\"mesos-scale\" class=\"selectbox\">\n                <div class=\"selection\">\n                    <div class=\"main truncate\">Small</div>\n                    <div class=\"sub\">5 - 50 instances (1 cpu, 2GB mem)</div>\n                </div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                    <li class=\"item selected\" data-value=\"small\" data-tooltip-type=\"html\">\n                        <div class=\"main truncate\">Small</div>\n                        <div class=\"sub\">5 - 50 instances (1 cpu, 2GB mem)</div>\n                    </li>\n                    <li class=\"item\" data-value=\"medium\">\n                        <div class=\"main truncate\">Medium</div>\n                        <div class=\"sub\">50 - 200 instances (2 cpu, 3.75GB mem)</div>\n                    </li>\n                    <li class=\"item\" data-value=\"large\">\n                        <div class=\"main truncate\">Large</div>\n                        <div class=\"sub\">200 - 1000 instances (8 cpu, 15GB mem)</div>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div class=\"control-group clearfix\">\n            <label>Region</label>\n            <div id=\"create-mesos-stack-region\" class=\"selectbox\">\n                <div class=\"selection\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.firstRegion)),stack1 == null || stack1 === false ? stack1 : stack1.alias)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.firstRegion)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.awsRegions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </div>\n        </div>\n        <div class=\"control-group clearfix\">\n            <label for=\"\">Framework</label>\n            <span>\n                <img class=\"marathon-mark-img\" src=\"/assets/images/ide/marathon.png\" alt=\"\"/> <span>Marathon</span>\n                <label class=\"switch toolbar-visual-ops-switch create-mesos-use-marathon on narrow\">\n                    <span class=\"switch-handle\"></span>\n                </label>\n            </span>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.createStack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"release-eip checkbox-wrap\">\n        <div class=\"checkbox\">\n            <input type=\"checkbox\" id=\"release-eip-checkbox\" />\n            <label for=\"release-eip-checkbox\"></label>\n        </div>\n        <label class=\"modal-text-minor\" for=\"release-eip-checkbox\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_RELEASE_EIP_LABEL", {hash:{},data:data}))
    + "(";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.eipsToRelease), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ")</label>\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_RELEASE_EIP_NOTE", {hash:{},data:data}))
    + "</p>\n    </section>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource)),stack1 == null || stack1 === false ? stack1 : stack1.PublicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }
function program3(depth0,data) {
  
  
  return ", ";
  }

  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eipsToRelease)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.releaseEipCheck=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('lib/IntercomAnalytics',["jquery"], function() {

  /*
   * Every key that are used to do analytics should be defined here.
   */
  var IntercomAnalytics, IntercomKeys;
  IntercomKeys = {
    import_json: true,
    import_cf: true,
    export_json: true,
    visualize_vpc: true,
    sg_line_style: true,
    export_png: true,
    export_vis_png: true,
    cloudformation: true,
    use_visualops: true,
    app_to_stack: true,
    version: true,
    timezone: true,
    lastlogin: true
  };
  IntercomAnalytics = {
    increase: function(key) {
      var o;
      if (!IntercomKeys[key]) {
        console.error("The key `" + key + "` is not enabled for analytics");
        return;
      }
      o = {};
      o[key] = 1;
      return window.Intercom && window.Intercom('update', {
        increments: o
      });
    },
    update: function(key, value) {
      var k, o, v;
      o = {};
      if (key && value) {
        if (!IntercomKeys[key]) {
          console.error("The key `" + key + "` is not enabled for analytics");
          return;
        }
        o[key] = value;
      } else if (key) {
        for (k in key) {
          v = key[k];
          if (IntercomKeys[k]) {
            o[k] = v;
          } else {
            console.error("The key `" + key + "` is not enabled for analytics");
          }
        }
      }
      return window.Intercom && window.Intercom("update", o);
    }
  };
  $(document.body).on("click", "[data-analytics-plus]", function() {
    var key;
    key = $(this).attr("data-analytics-plus");
    if (key) {
      IntercomAnalytics.increase(key);
    }
  });
  return IntercomAnalytics;
});

define('lib/handlebarhelpers',["i18n!/nls/lang.js", "handlebars"], function(lang) {
  Handlebars.registerHelper('i18n', function(text) {
    var args, members, t;
    members = text.split('.');
    if (members.length === 1) {
      members.unshift('IDE');
    }
    t = lang[members[0]][members[1]] || lang.PROP[members[1]];

    /* env:dev                               env:dev:end */

    /* env:prod */
    t = t || text || "undefined";

    /* env:prod:end */
    if (arguments.length > 2) {
      args = [].slice.call(arguments, 1, -1);
      args.unshift(t);
      t = sprintf.apply(null, args);
    }
    return new Handlebars.SafeString(t);
  });
  Handlebars.registerHelper('tolower', function(result) {
    return new Handlebars.SafeString(result.toLowerCase());
  });
  Handlebars.registerHelper('emptyStr', function(v1) {
    if (v1 === '' || v1 === (void 0) || v1 === null) {
      return '-';
    } else {
      return new Handlebars.SafeString(v1);
    }
  });
  Handlebars.registerHelper('readableVt', function(text) {
    if (text === '' || text === (void 0) || text === null) {
      return '-';
    }
    return lang.PROP["VOLUME_TYPE_" + (text.toUpperCase())];
  });
  Handlebars.registerHelper('UTC', function(text) {
    return new Handlebars.SafeString(new Date(+text).toUTCString());
  });
  Handlebars.registerHelper('breaklines', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Handlebars.SafeString(text);
  });
  Handlebars.registerHelper('nl2br', function(text) {
    var nl2br;
    nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
    return new Handlebars.SafeString(nl2br);
  });
  Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if ((v1 === v2) || (v1 && v2 && (typeof v1.valueOf === "function" ? v1.valueOf() : void 0) === (typeof v2.valueOf === "function" ? v2.valueOf() : void 0))) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  Handlebars.registerHelper('timeStr', function(v1) {
    var d;
    d = new Date(+v1);
    if (!isNaN(parseFloat(v1)) && isFinite(v1) && v1 > 0) {
      return d.toLocaleDateString() + " " + d.toTimeString();
    }
    if (isNaN(Date.parse(v1)) || !d.toLocaleDateString || !d.toTimeString) {
      if (v1) {
        return new Handlebars.SafeString(v1);
      } else {
        return '-';
      }
    }
    d = new Date(v1);
    return d.toLocaleDateString() + " " + d.toTimeString();
  });
  Handlebars.registerHelper("plusone", function(v1) {
    v1 = parseInt(v1, 10);
    if (isNaN(v1)) {
      return v1;
    } else {
      return '' + (v1 + 1);
    }
  });
  Handlebars.registerHelper("getInvalidKey", function(v1, v2) {
    return v1[v2];
  });
  Handlebars.registerHelper("doubleIf", function(v1, v2, options) {
    if (v1 && v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  Handlebars.registerHelper("or", function(v1, v2) {
    return v1 || v2;
  });
  Handlebars.registerHelper("simpleTime", function(time) {
    return MC.dateFormat(new Date(time), "yyyy-MM-dd hh:mm:ss");
  });
  Handlebars.registerHelper("firstOfSplit", function(content, splitter) {
    return content.split("-")[0];
  });
  Handlebars.registerHelper('formatTime', function(dateStr, format) {
    var H, K, M, MMM, MMMM, T, d, date, day, daySuffix, ddd, dddd, f, h, ii, m, monthSuffix, s, t, tz, tzHrs, tzMin, utc, y, yearSuffix;
    utc = false;
    date = new Date(dateStr);
    MMMM = lang.IDE.DATE_FORMAT_MONTHS.split(', ');
    MMM = lang.IDE.DATE_FORMAT_MON.split(', ');
    dddd = lang.IDE.DATE_FORMAT_WEEK.split(', ');
    ddd = lang.IDE.DATE_FORMAT_WEK.split(', ');
    daySuffix = lang.IDE.DATE_FORMAT_DAY;
    yearSuffix = lang.IDE.DATE_FORMAT_YEAR;
    monthSuffix = lang.IDE.DATE_FORMAT_MONTH;
    y = utc ? date.getUTCFullYear() : date.getFullYear();
    ii = function(i, len) {
      var s;
      s = i + '';
      len = len || 2;
      while (s.length < len) {
        s = '0' + s;
      }
      return s;
    };
    format = format.replace(/(^|[^\\])yyyy+/g, '$1' + y + yearSuffix);
    format = format.replace(/(^|[^\\])yy/g, '$1' + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, '$1' + y + yearSuffix);
    M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, '$1' + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, '$1' + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, '$1' + ii(M) + monthSuffix);
    format = format.replace(/(^|[^\\])M/g, '$1' + M + monthSuffix);
    d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, '$1' + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, '$1' + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, '$1' + ii(d) + daySuffix);
    format = format.replace(/(^|[^\\])d/g, '$1' + d + daySuffix);
    H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, '$1' + ii(H));
    format = format.replace(/(^|[^\\])H/g, '$1' + H);
    h = H > 12 ? H - 12 : H === 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, '$1' + ii(h));
    format = format.replace(/(^|[^\\])h/g, '$1' + h);
    m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, '$1' + ii(m));
    format = format.replace(/(^|[^\\])m/g, '$1' + m);
    s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, '$1' + ii(s));
    format = format.replace(/(^|[^\\])s/g, '$1' + s);
    f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, '$1' + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, '$1' + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, '$1' + f);
    T = H < 12 ? lang.IDE.DATE_FORMAT_AM : lang.IDE.DATE_FORMAT_PM;
    format = format.replace(/(^|[^\\])TT+/g, '$1' + T);
    format = format.replace(/(^|[^\\])T/g, '$1' + T.charAt(0));
    t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, '$1' + t);
    format = format.replace(/(^|[^\\])t/g, '$1' + t.charAt(0));
    tz = -date.getTimezoneOffset();
    K = utc || !tz ? 'Z' : tz > 0 ? '+' : '-';
    if (!utc) {
      tz = Math.abs(tz);
      tzHrs = Math.floor(tz / 60);
      tzMin = tz % 60;
      K += ii(tzHrs) + ':' + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, '$1' + K);
    day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], 'g'), dddd[day]);
    format = format.replace(new RegExp(ddd[0], 'g'), ddd[day]);
    format = format.replace(new RegExp(MMMM[0], 'g'), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], 'g'), MMM[M]);
    format = format.replace(/\\(.)/g, '$1');
    return format;
  });
  Handlebars.registerHelper("lastChar", function(string) {
    var ch;
    ch = string.charAt(string.length - 1);
    if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")) {
      return ch;
    } else {
      return "";
    }
  });
  Handlebars.registerHelper("awsAmiIcon", function(amiId, region) {});
  Handlebars.registerHelper("awsIsEip", function(ip, region) {});
  return Handlebars.registerHelper('ifLogic', function(v1, operator, v2, options) {
    r;
    var r;
    switch (operator) {
      case 'is':
        r = v1 === v2 ? options.fn(this) : options.inverse(this);
        break;
      case '<':
        r = v1 < v2 ? options.fn(this) : options.inverse(this);
        break;
      case '<=':
        r = v1 <= v2 ? options.fn(this) : options.inverse(this);
        break;
      case '>':
        r = v1 > v2 ? options.fn(this) : options.inverse(this);
        break;
      case '>=':
        r = v1 >= v2 ? options.fn(this) : options.inverse(this);
        break;
      case 'and':
        r = v1 && v2 ? options.fn(this) : options.inverse(this);
        break;
      case 'or':
        r = v1 || v2 ? options.fn(this) : options.inverse(this);
        break;
      default:
        r = options.inverse(this);
    }
    return r;
  });
});

/*
#**********************************************************
#* Filename: MC.core.js
#* Creator: Angel
#* Description: The core of the whole system
#* Date: 20131115
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/

/* Define as MC module */
define( "MC", [ "ui/MC.template", "q", "lib/IntercomAnalytics", 'i18n!/nls/lang.js', "lib/handlebarhelpers", "jquery", "sprintf" ], function ( template, Q, Analytics, lang ) {

var tz = (new Date().getTimezoneOffset())/-60;
if (tz >= 0) { tz = "+" + tz; }
Analytics.update({
	  "version"   : window.version
	, "lastlogin" : (new Date()).toString()
	, "timezone"  : "UTC" + tz
});

window.Q = Q;

var storage = function( instance ) {
	var s = {
		  set: function (name, value) {
			instance[name] = typeof value === 'object' ? JSON.stringify(value) : value;
		}

		, get: function (name) {
			var data = instance[name];

			try {
				data = JSON.parse(data);
			} catch (e) {}
			return data || "";
		}

		, remove: function (name) {
			instance.removeItem(name);

			return true;
		}

		, clear: function() {
			instance.clear();
		}
	};
	return s;
};

var _extractIDRegex = /^\s*?@?{?([-A-Z0-9a-z]+)}?/;

var MC = {
	// Global Variable

	DOMAIN   : window.MC_DOMAIN,
	API_HOST : window.MC_API_HOST,

	IMG_URL: '/assets/images/',

	// Global data
	data: {},

	Analytics : Analytics,

	getCidrBinStr: function ( ipCidr )
	{
		var cutAry, ipAddr, ipAddrAry, ipAddrBinAry, prefix, suffix;

		cutAry = ipCidr.split('/');
		ipAddr = cutAry[0];
		suffix = Number(cutAry[1]);
		prefix = 32 - suffix;
		ipAddrAry = ipAddr.split('.');
		ipAddrBinAry = ipAddrAry.map(function(value) {
			return MC.leftPadString(parseInt(value).toString(2), 8, "0");
		});

		return ipAddrBinAry.join('');
	},

	getValidCIDR: function ( cidr )
	{
		var newCIDRStr, newIPAry, newIPBinStr, newIPStr,
			prefixIPBinStr, subnetCidrBinStr, subnetCidrSuffix,
			suffixIPBinStr, suffixNum;

		subnetCidrBinStr = MC.getCidrBinStr(cidr);
		subnetCidrSuffix = Number(cidr.split('/')[1]);
		suffixIPBinStr = subnetCidrBinStr.slice(subnetCidrSuffix);
		suffixNum = parseInt(suffixIPBinStr);
		if ((suffixNum === 0) || (suffixIPBinStr === '')) {
			return cidr;
		} else {
			prefixIPBinStr = subnetCidrBinStr.slice(0, subnetCidrSuffix);
			newIPBinStr = prefixIPBinStr + MC.rightPadString('', suffixIPBinStr.length, '0');
			newIPAry = _.map([0, 8, 16, 24], function(value) {
				return parseInt(newIPBinStr.slice(value, value + 8), 2);
			});
			newIPStr = newIPAry.join('.');
			newCIDRStr = newIPStr + '/' + subnetCidrSuffix;
			return newCIDRStr;
		}
	},

	prettyStackTrace : function ( popLevel )
	{
		function StackTrace (){}
		var stack = (new Error().stack || "").split("\n");
		popLevel = (popLevel || 0) + 2;
		var pretty = new StackTrace();
		for ( var i = 0; i < stack.length - popLevel; ++i ) {
			pretty[ "@"+i ] = stack[i+popLevel].replace(/^\s+at\s+/,"");
		}
		return pretty;
	},


	/**
	 * Generate GUID
	 * @return {string} the guid
	 */
	guid: function ()
	{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
		{
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r&0x3 | 0x8);
			return v.toString(16);
   		}).toUpperCase();
	},

	genResRef: function(uid, attrName)
	{
		return "@{" + uid + "." + attrName + "}"
	},

	/**
	 * Determine the string is JSON or not
	 * @param  {string}  string the string will be determined
	 * @return {Boolean} if the string is JSON, return true, otherwise return false
	 */
	isJSON: function (string)
	{
		var rvalidchars = /^[\],:{}\s]*$/,
			rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
			rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
			rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;

		return typeof string === 'string' && string.trim() !== '' ?
			rvalidchars.test(string
				.replace(rvalidescape, '@')
				.replace(rvalidtokens, ']')
				.replace(rvalidbraces, '')) :
			false;
	},

	/**
	 * JSON-RPC API request
	 * @param  {object} option the configuration of API request
	 * @return {[type]} [description]
	 *
	 * example:
	 * MC.api({
 		url: '/app/',
	 	method: 'summary',
	 	data: {},
	 	success: function (data)
	 	error: function (status, error)
	 	});
	 */
	api: function (option)
	{
		return Q($.ajax({
			url: MC.API_HOST + option.url,
			dataType: 'json',
			type: 'POST',
			jsonp: false,
			data: JSON.stringify({
				jsonrpc: '2.0',
				id: MC.guid(),
				method: option.method || '',
				params: option.data || {}
			}),
			success: function(res){
				option.success && option.success(res.result[1], res.result[0]);
			},
			error: function(xhr, status, error){
				option.error && option.error(status, -1);
			}
		}));
	},

	capitalize: function (string)
	{
	    return string.charAt(0).toUpperCase() + string.slice(1);
	},

	truncate: function (string, length)
	{
		return string.length > length ? string.substring(0, length - 3) + '...' : string;
	},

	leftPadString : function (string, length, padding)
	{
		if ( string.length >= length ) { return string; }
		return (new Array(length-string.length+1)).join(padding) + string;
	},
	rightPadString : function (string, length, padding)
	{
		if ( string.length >= length ) { return string; }
		return string + (new Array(length-string.length+1)).join(padding);
	},


	/*
		For realtime CSS edit
	 */
	/* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nv:dev:end */

	extractID: function (uid)
	{
		if (!uid) { return ""; }
		var result = _extractIDRegex.exec(uid);
		return result ? result[1] : uid;
	},

	/**
	 * Display and update notification number on title
	 * @param  {number} number the notification number
	 * @return {boolean} true
	 */
	titleNotification: function (number)
	{
		var rnumber = /\([0-9]*\)/ig;

		if (number > 0)
		{
			document.title = (document.title.match(rnumber)) ? document.title.replace(rnumber, '(' + number + ')') : '(' + number + ') ' + document.title;
		}
		else
		{
			document.title = document.title.replace(rnumber, '');
		}

		return true;
	},

	/**
	 * Format a number with grouped thousands
	 * @param  {number} number The target number
	 * @return {string}
	 *
	 * 3123131 -> 3,123,131
	 */
	numberFormat: function (number)
	{
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '');

		var n = !isFinite(+number) ? 0 : +number,
			precision = 0,
			separator = ',',
			decimal = '.',
			string = '',
			fix = function (n, precision)
			{
				var k = Math.pow(10, precision);
				return '' + Math.round(n * k) / k;
			};

		string = (precision ? fix(n, precision) : '' + Math.round(n)).split('.');
		if (string[0].length > 3)
		{
			string[0] = string[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);
		}
		if ((string[1] || '').length < precision)
		{
			string[1] = string[1] || '';
			string[1] += [precision - string[1].length + 1].join('0');
		}

		return string.join(decimal);
	},

	/**
	 * Returns a formatted string according to the given format string with date object
	 * @param  {Date object} date   The date object
	 * @param  {String} format the string of format
	 * @return {String} The formatted date string
	 */
	dateFormat: function (date, format)
	{
		var date_format = {
				"M+" : date.getMonth() + 1,
				"d+" : date.getDate(),
				"h+" : date.getHours(),
				"m+" : date.getMinutes(),
				"s+" : date.getSeconds(),
				"q+" : Math.floor((date.getMonth() + 3) / 3),
				"S" : date.getMilliseconds()
			},
			key;

		if (/(y+)/.test(format))
		{
			format = format.replace(
				RegExp.$1,
				(date.getFullYear() + "").substr(4 - RegExp.$1.length)
			);
		}
		for (key in date_format)
		{
			if (new RegExp("("+ key +")").test(format))
			{
				format = format.replace(
					RegExp.$1,
					RegExp.$1.length === 1 ? date_format[key] : ("00"+ date_format[key]).substr((""+ date_format[key]).length)
				);
			}
		}

		return format;
	},

	/**
	 * Calculate the interval time between now and target date time.
	 * @param  {timespan number} date_time The target date time with second
	 * @return {[string]} The interval time.
	 */
	intervalDate: function (date_time)
	{
		var now = new Date(),
			date_time = date_time * 1000,
			second = (now.getTime() - date_time) / 1000,
			days = Math.floor(second / 86400),
			hours = Math.floor(second / 3600),
			minute = Math.floor(second / 60);

		if (days > 30)
		{
			return MC.dateFormat(new Date(date_time), "dd/MM yyyy");
		}
	 	else
	 	{
			return days > 0 ? days + lang.IDE.DAYS_AGO : hours > 0 ? hours + lang.IDE.HOURS_AGO : minute > 0 ? minute + lang.IDE.MINUTES_AGO : lang.IDE.DASH_TPL_JUST_NOW;
	 	}
	},

	/**
	 * Calculate the interval time between two date time.
	 * @param  {Date} first time
	 * @param  {Date} second time
	 * @param  {String} (s)econd | (m)inute | (h)our | (d)ay default is second
	 * @return {number} time difference
	 */
	timestamp : function( t1, t2, type ) {

		if ( $.type( t1 ) === 'date' && $.type( t2 ) === 'date' ) {

			var div_num = 1;

			switch ( type ) {
				case 's':
					div_num = 1000;
					break;
				case 'm':
					div_num = 1000 * 60;
					break;
				case 'h':
					div_num = 1000 * 3600;
					break;
				case 'd':
					div_num = 1000 * 3600 * 24;
					break;
				default:
					div_num = 1000;
					break;
			}
			return parseInt(( t2.getTime() - t1.getTime() ) / parseInt( div_num ));
		}

		else {
			console.error( 'variable is type date', t1, t2, type );
		}
	},

	/**
	 * Generate random number
	 * @param  {number} min min number
	 * @param  {number} max max number
	 * @return {number} The randomized number
	 */
	rand: function (min, max)
	{
		return Math.floor(Math.random() * (max - min + 1) + min);
	},

	camelCase: function (string)
	{
		return string.replace(/-([a-z])/ig, function (match, letter)
		{
			return (letter + '').toUpperCase();
		});
	},

	/*
	* Storage
	* Author: Angel & Tim
	*
	* Save data into local computer via HTML5 localStorage or sessionStorage.
	*
	* Saving data
	* MC.[storage|session].set(name, value)
	*
	* Getting data
	* MC.[storage|session].get(name)
	*
	* Remove data
	* MC.[storage|session].remove(name)
	*/
	storage : storage( localStorage ),
	session : storage( sessionStorage ),

	versionCompare: function(left, right) {
		var a, b, i, len;
		if (typeof left + typeof right !== "stringstring") {
			return false;
		}
		a = left.replace(/[a-zA-Z]/g, '').split(".");
		b = right.replace(/[a-zA-Z]/g, '').split(".");
		i = 0;
		len = Math.max(a.length, b.length);
		while (i < len) {
			if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
				return 1;
			} else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
				return -1;
			}
			i++;
		}
		return 0;
	},

	cacheForDev : function( key, data, callback ) {
		/* env:dev                                                                                                                                                                                                                                                                                                                                                                                       nv:dev:end */

		return false;


	},

	createCompareFn : function(propertyName)
	{
		/**
		example:
		var data = [{ name: "seacha.com", age: 36 }, { name: "jiang", age: 45 }, { name: "google", age: 32 }, { name: "javascript", age: 19}];
		data.sort(createCompareFn("age"));
		**/
		return function(object1, object2)
		{
			var value1 = object1[propertyName];
			var value2 = object2[propertyName];
			if (value1 < value2)
			{
				return -1;
			}
			else if (value1 > value2)
			{
				return 1;
			}
			else
			{
				return 0;
			}
		}
	}

};

window.MC = MC;

// https://gist.github.com/ncerminara/11257943
window.Base64 =  {_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};


	/**
	 * jQuery plugin to convert a given $.ajax response xml object to json.
	 *
	 * @example var json = $.xml2json(response);
	 * modified by Angel
	 */
	jQuery.extend({
		xml2json : function xml2json(xml) {
			var result = {},
				attribute,
				content,
				node,
				child,
				i,
				j;

			for (i in xml.childNodes)
			{
				node = xml.childNodes[ i ];

				if (node.nodeType === 1)
				{
					child = node.hasChildNodes() ? xml2json(node) : node.nodevalue;

					child = child == null ? null : child;

					// Special for "item" & "member"
					if (
						(node.nodeName === 'item' || node.nodeName === 'member') &&
						child.value
					)
					{
						if (child.key)
						{
							if ($.type(result) !== 'object')
							{
								result = {};
							}
							if (!$.isEmptyObject(child))
							{
								result[ child.key ] = child.value;
							}
						}
						else
						{
							if ($.type(result) !== 'array')
							{
								result = [];
							}
							if (!$.isEmptyObject(child))
							{
								result.push(child.value);
							}
						}
					}
					else
					{
						if (
							(
								node.nextElementSibling &&
								node.nextElementSibling.nodeName === node.nodeName
							)
							||
							node.nodeName === 'item' ||
							node.nodeName === 'member'
						)
						{
							if ($.type(result[ node.nodeName ]) === 'undefined')
							{
								result[ node.nodeName ] = [];
							}
							if (!$.isEmptyObject(child))
							{
								result[ node.nodeName ].push(child);
							}
						}
						else
						{
							if (node.previousElementSibling && node.previousElementSibling.nodeName === node.nodeName)
							{
								if (!$.isEmptyObject(child))
								{
									result[ node.nodeName ].push(child);
								}
							}
							else
							{
								result[ node.nodeName ] = child;
							}
						}
					}

					// Add attributes if any
					if (node.attributes.length > 0)
					{
						result[ node.nodeName ][ '@attributes' ] = {};
						for (j in node.attributes)
						{
							attribute = node.attributes.item(j);
							result[ node.nodeName ]['@attributes'][attribute.nodeName] = attribute.nodeValue;
						}
					}

					// Add element value
					if (
						node.childElementCount === 0 &&
						node.textContent != null &&
						node.textContent !== ''
					)
					{
						content = node.textContent.trim();

						switch (content.toLowerCase())
						{
							case 'true':
								content = true;
								break;

							case 'false':
								content = false;
								break;
						}

						if (result[ node.nodeName ] instanceof Array)
						{
							result[ node.nodeName ].push(content);
						}
						else
						{
							result[ node.nodeName ] = content;
						}
					}
				}
			}

			return result;
		}
	});

	/*!
	 * jQuery Cookie Plugin v1.3.1
	 * https://github.com/carhartl/jquery-cookie
	 *
	 * Copyright 2013 Klaus Hartl
	 * Released under the MIT license
	 */
	(function(e){function m(a){return a}function n(a){return decodeURIComponent(a.replace(j," "))}function k(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return d.json?JSON.parse(a):a}catch(c){}}var j=/\+/g,d=e.cookie=function(a,c,b){if(void 0!==c){b=e.extend({},d.defaults,b);if("number"===typeof b.expires){var g=b.expires,f=b.expires=new Date;f.setDate(f.getDate()+g)}c=d.json?JSON.stringify(c):String(c);return document.cookie=[d.raw?a:encodeURIComponent(a),"=",d.raw?c:encodeURIComponent(c),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}c=d.raw?m:n;b=document.cookie.split("; ");for(var g=a?void 0:{},f=0,j=b.length;f<j;f++){var h=b[f].split("="),l=c(h.shift()),h=c(h.join("="));if(a&&a===l){g=k(h);break}a||(g[l]=k(h))}return g};d.defaults={};e.removeCookie=function(a,c){return void 0!==e.cookie(a)?(e.cookie(a,"",e.extend({},c,{expires:-1})),!0):!1}})(jQuery);

	/* Global initialization */
	// Detecting browser and add the class name on body, so that we can use specific CSS style
	// or for specific usage.
	(function () {
		var ua  = navigator.userAgent.toLowerCase();

		var ua = navigator.userAgent.toLowerCase();
    var browser = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) || [];
    var kclass = browser[1] || "";

    if ( browser[1] == "webkit" ) {
    	var safari = /version\/([\d\.]+).*safari/.exec( ua );
      if (safari) {
      	kclass += " safari";
      	browser[2] = safari[1];
      }
    } else if ( browser[1] == "chrome" ) {
    	kclass += " webkit";
    }
    if (navigator.platform.toLowerCase().indexOf('mac') >= 0) {
			kclass += " mac";
		}

		MC.browser = browser[1];
		MC.browserVersion = parseInt(browser[2], 10);

		$(document.body).addClass(kclass);
	})();

  /* Bugfix for jquery ready() */
  // If jQuery is loaded after `DOMContentLoaded` is dispatched, jQuery will trigger `ready` event
  // after `window.load` event.
  // Since we're pretty sure the DOM is OK when this file is loaded, we just trigger an fake `DOMContentLoaded` event on document.
  if ( window.CustomEvent ) {
    // IE9, IE10 doesn't support CustomEvent
    try {
  		document.dispatchEvent( new CustomEvent("DOMContentLoaded") );
    } catch(e) {
    	var eo = document.createEvent('Event');
      eo.initEvent("DOMContentLoaded", true, true);
      document.dispatchEvent( eo );
    }
  }


	MC.template = template;
	return MC;
});

define('constant',['MC', 'i18n!/nls/lang.js'], function(MC, lang) {
  var AWS_RESOURCE_KEY, AWS_RESOURCE_SHORT_TYPE, DB_DEFAULTSETTING, DB_ENGINE, DB_ENGINE_ARY, DB_ENGINTYPE, DB_INSTANCECLASS, DEMO_STACK_NAME_LIST, HASTAG, INSTANCE_STATES, LINUX, MESOS_AMI_IDS, MESSAGE_E, OPS_CODE_NAME, OPS_STATE, OS_TYPE_MAPPING, REGEXP, REGION_KEYS, REGION_LABEL, REGION_SHORT_LABEL, RESNAME, RESTYPE, RETURN_CODE, STATE_REF_DICT, TA, WINDOWS, wrap;
  wrap = function(dict) {
    var wrapArray, wrappedDict;
    wrapArray = _.isArray(dict);
    if (wrapArray) {
      wrappedDict = [];
    } else {
      wrappedDict = {};
    }
    _.each(dict, function(name, key) {
      if (wrapArray) {
        wrappedDict.push(RESTYPE[name]);
      } else {
        wrappedDict[RESTYPE[key]] = name;
      }
      return null;
    });
    return wrappedDict;
  };
  AWS_RESOURCE_KEY = {
    "AWS.EC2.AvailabilityZone": "ZoneName",
    "AWS.EC2.Instance": "InstanceId",
    "AWS.EC2.KeyPair": "KeyName",
    "AWS.EC2.SecurityGroup": "GroupId",
    "AWS.EC2.EIP": "PublicIp",
    "AWS.EC2.AMI": "ImageId",
    "AWS.EC2.EBS.Volume": "VolumeId",
    "AWS.ELB": "LoadBalancerName",
    "AWS.VPC.VPC": "VpcId",
    "AWS.VPC.Subnet": "SubnetId",
    "AWS.VPC.InternetGateway": "InternetGatewayId",
    "AWS.VPC.RouteTable": "RouteTableId",
    "AWS.VPC.VPNGateway": "VpnGatewayId",
    "AWS.VPC.CustomerGateway": "CustomerGatewayId",
    "AWS.VPC.NetworkInterface": "NetworkInterfaceId",
    "AWS.VPC.DhcpOptions": "DhcpOptionsId",
    "AWS.VPC.VPNConnection": "VpnConnectionId",
    "AWS.VPC.NetworkAcl": "NetworkAclId",
    "AWS.IAM.ServerCertificate": "",
    "AWS.AutoScaling.Group": "AutoScalingGroupARN",
    "AWS.AutoScaling.LaunchConfiguration": "LaunchConfigurationARN",
    "AWS.AutoScaling.NotificationConfiguration": "",
    "AWS.AutoScaling.ScalingPolicy": "PolicyARN",
    "AWS.AutoScaling.ScheduledActions": "ScheduledActionARN",
    "AWS.CloudWatch.CloudWatch": "AlarmArn",
    "AWS.SNS.Subscription": "",
    "AWS.SNS.Topic": "TopicArn",
    "AWS.RDS.DBSubnetGroup": "DBSubnetGroupName",
    "AWS.RDS.DBInstance": "DBInstanceIdentifier",
    "AWS.RDS.OptionGroup": "OptionGroupName"
  };
  RESTYPE = {
    AZ: "AWS.EC2.AvailabilityZone",
    INSTANCE: "AWS.EC2.Instance",
    KP: "AWS.EC2.KeyPair",
    SG: "AWS.EC2.SecurityGroup",
    EIP: "AWS.EC2.EIP",
    AMI: "AWS.EC2.AMI",
    VOL: "AWS.EC2.EBS.Volume",
    SNAP: "AWS.EC2.EBS.Snapshot",
    ELB: "AWS.ELB",
    VPC: "AWS.VPC.VPC",
    SUBNET: "AWS.VPC.Subnet",
    IGW: "AWS.VPC.InternetGateway",
    RT: "AWS.VPC.RouteTable",
    VGW: "AWS.VPC.VPNGateway",
    CGW: "AWS.VPC.CustomerGateway",
    ENI: "AWS.VPC.NetworkInterface",
    DHCP: "AWS.VPC.DhcpOptions",
    VPN: "AWS.VPC.VPNConnection",
    ACL: "AWS.VPC.NetworkAcl",
    IAM: "AWS.IAM.ServerCertificate",
    ASG: 'AWS.AutoScaling.Group',
    LC: 'AWS.AutoScaling.LaunchConfiguration',
    NC: 'AWS.AutoScaling.NotificationConfiguration',
    SP: 'AWS.AutoScaling.ScalingPolicy',
    SA: 'AWS.AutoScaling.ScheduledActions',
    CW: 'AWS.CloudWatch.CloudWatch',
    SUBSCRIPTION: 'AWS.SNS.Subscription',
    TOPIC: 'AWS.SNS.Topic',
    TAG: 'AWS.EC2.Tag',
    ASGTAG: 'AWS.AutoScaling.Tag',
    DBSBG: 'AWS.RDS.DBSubnetGroup',
    DBINSTANCE: 'AWS.RDS.DBInstance',
    DBPARAM: 'AWS.RDS.Parameter',
    DBPG: 'AWS.RDS.ParameterGroup',
    DBSNAP: 'AWS.RDS.Snapshot',
    DBES: 'AWS.RDS.EventSubscription',
    DBOG: 'AWS.RDS.OptionGroup',
    DBENGINE: 'AWS.RDS.DBEngineVersion',
    OSSERVER: "OS::Nova::Server",
    OSNETWORK: "OS::Neutron::Network",
    OSSUBNET: "OS::Neutron::Subnet",
    OSPORT: "OS::Neutron::Port",
    OSSG: "OS::Neutron::SecurityGroup",
    OSSGRULE: "OS::Neutron::SecurityGroupRule",
    OSRT: "OS::Neutron::Router",
    OSFIP: "OS::Neutron::FloatingIP",
    OSELB: "OS::Elb",
    OSLISTENER: "OS::Neutron::VIP",
    OSPOOL: "OS::Neutron::Pool",
    OSHM: "OS::Neutron::HealthMonitor",
    OSVOL: "OS::Cinder::Volume",
    OSFLAVOR: "OS::Nova::Flavor",
    OSKP: "OS::Nova::KeyPair",
    OSIMAGE: "OS::Image",
    OSSNAP: "OS::Snapshot",
    OSNQ: "OS::Neutron::Quota",
    OSCQ: "OS::Cinder::Quota",
    MRTHAPP: "DOCKER.MARATHON.App",
    MRTHGROUP: "DOCKER.MARATHON.Group",
    DOCKERIMAGE: "DOCKER.IMAGE",
    MESOSMASTER: "MESOS.MASTER",
    MESOSSLAVE: "MESOS.SLAVE",
    MESOSASG: "MESOS.ASG",
    MESOSLC: "MESOS.LC"
  };
  RESNAME = {
    AZ: "Availability Zone",
    INSTANCE: "Instance",
    KP: "Key Pair",
    SG: "Security Group",
    EIP: "Elastic IP",
    AMI: "AMI",
    VOL: "Volume",
    SNAP: "Snapshot",
    ELB: "Load Balancer",
    VPC: "VPC",
    SUBNET: "Subnet",
    IGW: "Internet Gateway",
    RT: "Route Table",
    VGW: "VPN Gateway",
    CGW: "Customer Gateway",
    ENI: "Network Interface",
    DHCP: "Dhcp Options",
    VPN: "VPN Connection",
    ACL: "Network Acl",
    IAM: "Server Certificate",
    ASG: 'AutoScaling Group',
    LC: 'Launch Configuration',
    NC: 'Notification Configuration',
    SP: 'Scaling Policy',
    SA: 'Scheduled Actions',
    CW: 'Cloud Watch',
    SUBSCRIPTION: 'Subscription',
    TOPIC: 'Topic',
    DBSBG: 'DB Subnet Group',
    DBINSTANCE: 'DB Instance',
    DBPARAM: 'Parameter',
    DBPG: 'ParameterGroup',
    DBSNAP: 'DB Snapshot',
    DBES: 'Event Subscription',
    DBOG: 'OptionGroup',
    DBENGINE: 'DB Engine Version',
    OSSERVER: "Server",
    OSNETWORK: "Network",
    OSSUBNET: "Subnet",
    OSPORT: "Port",
    OSSG: "Security Group",
    OSSGRULE: "Security Group Rule",
    OSRT: "Router",
    OSFIP: "Floating IP",
    OSELB: "Load Balancer",
    OSLISTENER: "Listener",
    OSPOOL: "Pool",
    OSHM: "Health Monitor",
    OSVOL: "Volume",
    OSFLAVOR: "Flavor",
    OSKP: "Key Pair",
    OSIMAGE: "Image",
    OSSNAP: "Snapshot"
  };
  HASTAG = ['CGW', 'AMI', 'INSTANCE', 'IGW', 'ACL', 'ENI', 'RT', 'SG', 'SUBNET', 'VOL', 'VPC', 'VPN', 'VGW', 'ASG'];
  AWS_RESOURCE_SHORT_TYPE = {
    AWS_EC2_AvailabilityZone: "az",
    AWS_EC2_Instance: "instance",
    AWS_EC2_KeyPair: "kp",
    AWS_EC2_SecurityGroup: "sg",
    AWS_EC2_EIP: "eip",
    AWS_EC2_AMI: "ami",
    AWS_EBS_Volume: "vol",
    AWS_EBS_Snapshot: "snap",
    AWS_ELB: "elb",
    AWS_VPC_VPC: "vpc",
    AWS_VPC_Subnet: "subnet",
    AWS_VPC_InternetGateway: "igw",
    AWS_VPC_RouteTable: "rtb",
    AWS_VPC_VPNGateway: "vgw",
    AWS_VPC_CustomerGateway: "cgw",
    AWS_VPC_NetworkInterface: "eni",
    AWS_VPC_DhcpOptions: "dhcp",
    AWS_VPC_VPNConnection: "vpn",
    AWS_VPC_NetworkAcl: "acl",
    AWS_IAM_ServerCertificate: "iam",
    AWS_AutoScaling_Group: 'asg',
    AWS_AutoScaling_LaunchConfiguration: 'asl_lc',
    AWS_AutoScaling_NotificationConfiguration: 'asl_nc',
    AWS_AutoScaling_ScalingPolicy: 'asl_sp',
    AWS_AutoScaling_ScheduledActions: 'asl_sa',
    AWS_CloudWatch_CloudWatch: 'clw',
    AWS_SNS_Subscription: 'sns_sub',
    AWS_SNS_Topic: 'sns_top'
  };
  DB_INSTANCECLASS = [
    {
      instanceClass: "db.t1.micro",
      cpu: "1 vCPU",
      memory: '0.613 GB',
      ebs: false,
      ecu: 1
    }, {
      instanceClass: "db.t2.micro",
      cpu: "1 vCPU",
      memory: '1 GB',
      ebs: false,
      ecu: 1
    }, {
      instanceClass: "db.t2.small",
      cpu: "1 vCPU",
      memory: '2 GB',
      ebs: false,
      ecu: 1
    }, {
      instanceClass: "db.t2.medium",
      cpu: "2 vCPU",
      memory: '4 GB',
      ebs: false,
      ecu: 2
    }, {
      instanceClass: "db.m1.small",
      cpu: "1 vCPU",
      memory: '1.7 GB',
      ebs: false,
      ecu: 1
    }, {
      instanceClass: "db.m1.medium",
      cpu: '1 vCPU',
      memory: '3.75 GB',
      ebs: false,
      ecu: 2
    }, {
      instanceClass: "db.m1.large",
      cpu: '2 vCPU',
      memory: '7.5 GB',
      ebs: true,
      ecu: 4
    }, {
      instanceClass: "db.m1.xlarge",
      cpu: '4 vCPU',
      memory: '15 GB',
      ebs: true,
      ecu: 8
    }, {
      instanceClass: "db.m2.xlarge",
      cpu: '2 vCPU',
      memory: '17.1 GB',
      ebs: false,
      ecu: 6.5
    }, {
      instanceClass: "db.m2.2xlarge",
      cpu: '4 vCPU',
      memory: '34 GB',
      ebs: true,
      ecu: 13
    }, {
      instanceClass: "db.m2.4xlarge",
      cpu: '8 vCPU',
      memory: '68 GB',
      ebs: true,
      ecu: 26
    }, {
      instanceClass: "db.cr1.8xlarge",
      cpu: '32 vCPU',
      memory: '244 GB',
      ebs: false,
      ecu: 88
    }, {
      instanceClass: "db.m3.medium",
      cpu: '1 vCPU',
      memory: '3.75 GB',
      ebs: false,
      ecu: 3
    }, {
      instanceClass: "db.m3.large",
      cpu: '2 vCPU',
      memory: '7.5 GB',
      ebs: false,
      ecu: 6.5
    }, {
      instanceClass: "db.m3.xlarge",
      cpu: '4 vCPU',
      memory: '15 GB',
      ebs: true,
      ecu: 13
    }, {
      instanceClass: "db.m3.2xlarge",
      cpu: '8 vCPU',
      memory: '30 GB',
      ebs: true,
      ecu: 26
    }, {
      instanceClass: "db.r3.large",
      cpu: '2 vCPU',
      memory: '15 GB',
      ebs: false,
      ecu: 6.5
    }, {
      instanceClass: "db.r3.xlarge",
      cpu: '4 vCPU',
      memory: '30.5 GB',
      ebs: true,
      ecu: 13
    }, {
      instanceClass: "db.r3.2xlarge",
      cpu: '8 vCPU',
      memory: '61 GB',
      ebs: true,
      ecu: 26
    }, {
      instanceClass: "db.r3.4xlarge",
      cpu: '16 vCPU',
      memory: '122 GB',
      ebs: true,
      ecu: 52
    }, {
      instanceClass: "db.r3.8xlarge",
      cpu: '32 vCPU',
      memory: '244GB',
      ebs: false,
      ecu: 104
    }
  ];
  DB_ENGINE = {
    MYSQL: "mysql",
    ORA_SE1: "oracle-se1",
    ORA_SE: "oracle-se",
    ORA_EE: "oracle-ee",
    SQLSRV_EE: "sqlserver-ee",
    SQLSRV_SE: "sqlserver-se",
    SQLSRV_EX: "sqlserver-ex",
    SQLSRV_WEB: "sqlserver-web",
    POSTGRES: "postgres"
  };
  DB_ENGINTYPE = {
    'mysql': "mysql",
    'oracle-ee': "oracle",
    'oracle-se': "oracle",
    'oracle-se1': "oracle",
    'sqlserver-ee': "sqlserver",
    'sqlserver-ex': "sqlserver",
    'sqlserver-se': "sqlserver",
    'sqlserver-web': "sqlserver",
    'postgres': "postgresql"
  };
  DB_ENGINE_ARY = {
    'mysql': ["mysql"],
    'oracle': ['oracle-ee', 'oracle-se', 'oracle-se1'],
    'sqlserver': ['sqlserver-ee', 'sqlserver-ex', 'sqlserver-se', 'sqlserver-web'],
    'postgres': ['postgres']
  };
  DB_DEFAULTSETTING = {
    'mysql': {
      port: 3306,
      dbname: '',
      charset: '',
      allocatedStorage: 5
    },
    'postgres': {
      port: 5432,
      dbname: '',
      charset: '',
      allocatedStorage: 5
    },
    'oracle-ee': {
      port: 1521,
      dbname: 'ORCL',
      charset: 'AL32UTF8',
      allocatedStorage: 10
    },
    'oracle-se': {
      port: 1521,
      dbname: 'ORCL',
      charset: 'AL32UTF8',
      allocatedStorage: 10
    },
    'oracle-se1': {
      port: 1521,
      dbname: 'ORCL',
      charset: 'AL32UTF8',
      allocatedStorage: 10
    },
    'sqlserver-ee': {
      port: 1433,
      dbname: '',
      charset: '',
      allocatedStorage: 200
    },
    'sqlserver-ex': {
      port: 1433,
      dbname: '',
      charset: '',
      allocatedStorage: 30
    },
    'sqlserver-se': {
      port: 1433,
      dbname: '',
      charset: '',
      allocatedStorage: 200
    },
    'sqlserver-web': {
      port: 1433,
      dbname: '',
      charset: '',
      allocatedStorage: 30
    }
  };
  INSTANCE_STATES = {
    'pending': 0,
    'running': 16,
    'shuttingdown': 32,
    'terminated': 48,
    'stopping': 64,
    'stopped': 80
  };
  MESSAGE_E = {
    MESSAGE_E_SESSION: lang.SERVICE.CONSTANT_MSG_E_SESSION,
    MESSAGE_E_EXTERNAL: lang.SERVICE.CONSTANT_MSG_E_EXTERNAL,
    MESSAGE_E_ERROR: lang.SERVICE.CONSTANT_MSG_E_ERROR,
    MESSAGE_E_UNKNOWN: lang.SERVICE.CONSTANT_MSG_E_UNKNOW,
    MESSAGE_E_PARAM: lang.SERVICE.CONSTANT_MSG_E_PARAM
  };
  REGION_KEYS = ['us-east-1', 'us-west-1', 'us-west-2', 'eu-west-1', 'eu-central-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'sa-east-1'];
  REGION_LABEL = {
    'us-east-1': lang.IDE['IDE_LBL_REGION_NAME_us-east-1'],
    'us-west-1': lang.IDE['IDE_LBL_REGION_NAME_us-west-1'],
    'us-west-2': lang.IDE['IDE_LBL_REGION_NAME_us-west-2'],
    'eu-west-1': lang.IDE['IDE_LBL_REGION_NAME_eu-west-1'],
    'eu-central-1': lang.IDE['IDE_LBL_REGION_NAME_eu-central-1'],
    'ap-southeast-2': lang.IDE['IDE_LBL_REGION_NAME_ap-southeast-2'],
    'ap-northeast-1': lang.IDE['IDE_LBL_REGION_NAME_ap-northeast-1'],
    'ap-southeast-1': lang.IDE['IDE_LBL_REGION_NAME_ap-southeast-1'],
    'sa-east-1': lang.IDE['IDE_LBL_REGION_NAME_sa-east-1']
  };
  REGION_SHORT_LABEL = {
    'us-east-1': lang.IDE['IDE_LBL_REGION_NAME_SHORT_us-east-1'],
    'us-west-1': lang.IDE['IDE_LBL_REGION_NAME_SHORT_us-west-1'],
    'us-west-2': lang.IDE['IDE_LBL_REGION_NAME_SHORT_us-west-2'],
    'eu-west-1': lang.IDE['IDE_LBL_REGION_NAME_SHORT_eu-west-1'],
    'eu-central-1': lang.IDE['IDE_LBL_REGION_NAME_SHORT_eu-central-1'],
    'ap-southeast-1': lang.IDE['IDE_LBL_REGION_NAME_SHORT_ap-southeast-1'],
    'ap-southeast-2': lang.IDE['IDE_LBL_REGION_NAME_SHORT_ap-southeast-2'],
    'ap-northeast-1': lang.IDE['IDE_LBL_REGION_NAME_SHORT_ap-northeast-1'],
    'sa-east-1': lang.IDE['IDE_LBL_REGION_NAME_SHORT_sa-east-1']
  };
  RETURN_CODE = {
    E_OK: 0,
    E_NONE: 1,
    E_INVALID: 2,
    E_FULL: 3,
    E_EXIST: 4,
    E_EXTERNAL: 5,
    E_FAILED: 6,
    E_BUSY: 7,
    E_NORSC: 8,
    E_NOPERM: 9,
    E_NOSTOP: 10,
    E_NOSTART: 11,
    E_ERROR: 12,
    E_LEFTOVER: 13,
    E_TIMEOUT: 14,
    E_UNKNOWN: 15,
    E_CONN: 16,
    E_EXPIRED: 17,
    E_PARAM: 18,
    E_SESSION: 19,
    E_END: 20,
    E_BLOCKED_USER: 21
  };
  OPS_STATE = {
    PENDING: "Pending",
    INPROCESS: "InProcess",
    DONE: "Done",
    ROLLBACK: "Rollback",
    FAILED: "Failed"
  };
  OPS_CODE_NAME = {
    LAUNCH: "Forge.Stack.Run",
    STOP: "Forge.App.Stop",
    START: "Forge.App.Start",
    UPDATE: "Forge.App.Update",
    STATE_UPDATE: "Forge.AppState.Update",
    TERMINATE: "Forge.App.Terminate",
    APP_SAVE: "Forge.App.Save",
    APP_IMPORT: "Forge.App.SaveImport"
  };
  DEMO_STACK_NAME_LIST = ['vpc-with-private-subnet-and-vpn', 'vpc-with-public-and-private-subnets-and-vpn', 'vpc-with-public-subnet-only', 'vpc-with-public-and-private-subnets'];
  TA = {
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    NOTICE: 'NOTICE'
  };
  LINUX = ['centos', 'redhat', 'rhel', 'ubuntu', 'debian', 'fedora', 'gentoo', 'opensuse', 'suse', 'sles', 'amazon', 'amaz', 'linux-other'];
  WINDOWS = ['windows', 'win'];
  OS_TYPE_MAPPING = {
    'linux-other': 'linux',
    'redhat': 'rhel',
    'suse': 'sles',
    'windows': 'mswin'
  };
  REGEXP = {
    'stateEditorReference': /@\{([A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12})\.\w+\}/g,
    'stateEditorOriginReference': /@\{(([\w-]+)\.(([\w-]+(\[\d+\])?)|state.[\w-]+))\}/g,
    'stateEditorRefOnly': /^@\{(([\w-]+)\.(([\w-]+(\[\d+\])?)|state.[\w-]+))\}$/,
    'uid': /[A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12}/g
  };
  STATE_REF_DICT = {
    _id: "property",
    AWS_VPC_CustomerGateway: {
      __array: false,
      IpAddress: false,
      Type: false,
      BgpAsn: false
    },
    AWS_EC2_Instance: {
      __array: false,
      PublicIp: true,
      MacAddress: true,
      PrivateIpAddress: true
    },
    AWS_AutoScaling_Group: {
      __array: true,
      PublicIp: true,
      MacAddress: true,
      AvailabilityZones: true,
      PrivateIpAddress: true
    },
    AWS_VPC_Subnet: {
      __array: false,
      AvailableIpAddressCount: false,
      AvailabilityZone: false,
      CidrBlock: false
    },
    AWS_VPC_NetworkInterface: {
      __array: true,
      PublicIp: true,
      MacAddress: true,
      PrivateIpAddress: true
    },
    AWS_ELB: {
      __array: false,
      DNSName: false,
      CanonicalHostedZoneName: false,
      CanonicalHostedZoneNameID: false,
      AvailabilityZones: true
    },
    AWS_VPC_VPC: {
      __array: false,
      CidrBlock: false
    },
    AWS_EC2_InstanceGroup: {
      __array: false,
      PublicIp: true,
      MacAddress: true,
      PrivateIpAddress: true
    },
    AWS_RDS_DBInstance: {
      Address: true,
      Port: true
    }
  };
  MESOS_AMI_IDS = [
    {
      "region": "us-east-1",
      "imageId": "ami-9ef278f6"
    }, {
      "region": "us-west-1",
      "imageId": "ami-353f2970"
    }, {
      "region": "eu-west-1",
      "imageId": "ami-1a92266d"
    }, {
      "region": "us-west-2",
      "imageId": "ami-fba3e8cb"
    }, {
      "region": "eu-central-1",
      "imageId": "ami-929caa8f"
    }, {
      "region": "ap-southeast-2",
      "imageId": "ami-5fe28d65"
    }, {
      "region": "ap-northeast-1",
      "imageId": "ami-9d7f479c"
    }, {
      "region": "ap-southeast-1",
      "imageId": "ami-a6a083f4"
    }, {
      "region": "sa-east-1",
      "imageId": "ami-c79e28da"
    }
  ];
  return {
    AWS_RESOURCE_KEY: AWS_RESOURCE_KEY,
    INSTANCE_STATES: INSTANCE_STATES,
    AWS_RESOURCE_SHORT_TYPE: AWS_RESOURCE_SHORT_TYPE,
    REGION_KEYS: REGION_KEYS,
    REGION_SHORT_LABEL: REGION_SHORT_LABEL,
    REGION_LABEL: REGION_LABEL,
    RETURN_CODE: RETURN_CODE,
    LINUX: LINUX,
    WINDOWS: WINDOWS,
    MESSAGE_E: MESSAGE_E,
    OPS_STATE: OPS_STATE,
    OPS_CODE_NAME: OPS_CODE_NAME,
    DEMO_STACK_NAME_LIST: DEMO_STACK_NAME_LIST,
    TA: TA,
    OS_TYPE_MAPPING: OS_TYPE_MAPPING,
    REGEXP: REGEXP,
    RESTYPE: RESTYPE,
    STATE_REF_DICT: STATE_REF_DICT,
    RESNAME: wrap(RESNAME),
    HASTAG: wrap(HASTAG),
    WRAP: wrap,
    DB_INSTANCECLASS: DB_INSTANCECLASS,
    DB_ENGINE: DB_ENGINE,
    DB_ENGINTYPE: DB_ENGINTYPE,
    DB_ENGINE_ARY: DB_ENGINE_ARY,
    DB_DEFAULTSETTING: DB_DEFAULTSETTING,
    MESOS_AMI_IDS: MESOS_AMI_IDS
  };
});

/*
#**********************************************************
#* Filename: MC.validate.js
#* Creator: Tim
#* Description: Validate helper of logic
#* Date: 20130813
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/

define('MC.validate',["MC"], function( MC ) {

	var slice = function( arr, start, end ) {
		return Function.call.apply( Array.prototype.slice, arguments );
	};

	var regExp = {
		email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
		, letters: /[a-zA-Z]/
		, alphanum: /^\w+$/
		, digits: /^\d+$/
		, number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
		, awsName: /^[a-zA-Z0-9][a-zA-Z0-9-]*$/
		, phone: /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/
		, usPhone: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
		// IPv4 only
		, ipv4: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
		// CIDR only
		, cidr: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/(\d|[1-2]\d|3[0-2]))$/
		// AWS CIDR
		, awsCidr: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([1][6-9]|[2][0-8]))$/
		// IPv4 and CIDR
		, ipaddress: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/(\d|[1-2]\d|3[0-2]))?$/
		, url: /^(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
		, urlstrict: /^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

		, arn: /^arn:aws:sns:[\w-]+:.+$/
		, sqs: /^arn:aws:sqs:[\w-]+:\d{12}:.+$/

		, deviceParavirtual: /^\/dev\/(hd[a-z]([1-9]|1[0-5])?|(sd[a-z]([1-9]|1[0-5])?))$/
		, deviceHvm: /^((\/dev\/)?xvd[a-z][a-z]?|\/dev\/sd[a-z])$/

	};


	MC.validate = function() {
		var func = arguments[ 0 ];
		if ( func in MC.validate ) {
			return MC.validate[ func ].apply( MC.validate, slice( arguments, 1 ) );
		} else if ( func in regExp ) {
			return regExp[ func ].test( slice( arguments, 1, 2) );
		}
		else {
			throw "the validate method: [" + func + "] doesn't exist";
		}
	};

	MC.validate.required = function( value ) {
		return !! value;
	};

	MC.validate.equal = function( value1, value2 ) {
		return value1 === value2;
	};

	MC.validate.exist = function( value, set ) {
		if ( Array.prototype.indexOf && Array.prototype.indexOf === set.indexOf ) {
			return set.indexOf( value ) !== -1;
		}

		var i = 0;
		for ( ; i<set.length; i++ ) {
			if ( set[ i ] === value ) {
				break;
			}
		}

		return !( i === set.length );
	};

	MC.validate.range = function( value, range ) {
		return value >= range[ 0 ] && value <= range[ 1 ];
	};

	MC.validate.http = function( value ) {
		return regExp.urlstrict.test( value ) && value.slice(0, 4) === 'http';
	};

	MC.validate.https = function( value ) {
		return regExp.urlstrict.test( value ) && value.slice(0, 5) === 'https';
	};

	MC.validate.deviceName = function ( value, type ) {
		if ( type === 'paravirtual' ) {
			return regExp.deviceParavirtual.test( value );
		} else if ( type === 'hvm') {
			return regExp.deviceHvm.test( value );
		}

		return false;
	};

	// helper

	// MC.validate.preventDupname = function( target, id, name, type ) {
	// 	$target = target instanceof $ ? target : $( target )
	// 	if ( arguments.length === 3 ) type = name;

	// 	$target.parsley('custom', function( val ) {
	// 		if ( val && !MC.validate( 'awsName',  val ) ) {
	// 			return 'This value should be a valid ' + type + ' name.';
	// 		}
 //            if ( !MC.aws.aws.checkIsRepeatName( id, val ) ) {
 //                return type + ' name " ' + val + ' " is already in using. Please use another one.';
 //            }
	// 	})
	// };

	MC.validate.portRange = function ( value ) {
		var portAry = []
		if (value.indexOf('-') === -1) {
			if (!value || isNaN(Number(value))) {
				return false;
			}
			portAry[0] = Number(value);
		} else {
			valueAry = value.split('-');
			if (valueAry.length !== 2 || !valueAry[0] || !valueAry[1]) {
				return false;
			}
			if (isNaN(Number(valueAry[0])) || isNaN(Number(valueAry[1]))) {
				return false;
			}
			portAry[0] = Number(valueAry[0]);
			portAry[1] = Number(valueAry[1]);
		}
		return portAry;
	};

	MC.validate.portValidRange = function ( portAry ) {
		if (portAry.length === 1) {
			port1 = portAry[0];
			if (port1 < 0 || port1 > 65535) {
				return false;
			}
		} else {
			port1 = portAry[0];
			port2 = portAry[1];
			if (port1 < 0 || port1 > 65535 || port2 < 0 || port2 > 65535) {
				return false;
			}
			if (port2 <= port1) {
				return false;
			}
		}
		return true;
	};

	MC.validate.port = function ( value ) {
		var portValue = null

		if (!value || isNaN(Number(value))) {
			return false;
		}

		portValue = Number(value);
		return portValue;
	};

});



/*
 */
define('event',['underscore', 'backbone'], function() {
  var Event, event;
  Event = (function() {
    function Event() {
      _.extend(this, Backbone.Events);
    }

    Event.prototype.OPEN_PROPERTY = 'OPEN_PROPERTY';

    Event.prototype.FORCE_OPEN_PROPERTY = "FORCE_OPEN_PROPERTY";

    Event.prototype.REFRESH_PROPERTY = "REFRESH_PROPERTY";

    Event.prototype.UPDATE_STATUS_BAR = 'UPDATE_STATUS_BAR';

    Event.prototype.UPDATE_TA_MODAL = 'UPDATE_TA_MODAL';

    Event.prototype.UNLOAD_TA_MODAL = 'UNLOAD_TA_MODAL';

    Event.prototype.TA_SYNC_START = 'TA_SYNC_START';

    Event.prototype.TA_SYNC_FINISH = 'TA_SYNC_FINISH';

    Event.prototype.PROPERTY_REFRESH_ENI_IP_LIST = 'PROPERTY_REFRESH_ENI_IP_LIST';

    Event.prototype.UPDATE_STATE_STATUS_DATA = 'STATE_STATUS_DATA_UPDATE';

    Event.prototype.UPDATE_STATE_STATUS_DATA_TO_EDITOR = 'UPDATE_STATE_STATUS_DATA_TO_EDITOR';

    Event.prototype.STATE_EDITOR_SAVE_DATA = 'STATE_EDITOR_SAVE_DATA';

    Event.prototype.SHOW_STATE_EDITOR = 'SHOW_STATE_EDITOR';

    Event.prototype.STATE_EDITOR_DATA_UPDATE = 'STATE_EDITOR_DATA_UPDATE';

    Event.prototype.onListen = function(type, callback, context) {
      return this.once(type, callback, context);
    };

    Event.prototype.onLongListen = function(type, callback, context) {
      return this.on(type, callback, context);
    };

    Event.prototype.offListen = function(type, function_name) {
      if (function_name) {
        return this.off(type, function_name);
      } else {
        return this.off(type);
      }
    };

    return Event;

  })();
  event = new Event();
  return event;
});


define("lib/lib", function(){});
