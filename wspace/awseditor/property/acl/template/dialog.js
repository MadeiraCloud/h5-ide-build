define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<li class=\"item tooltip\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><div class=\"main truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div></li>\n		";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n		  <li class=\"item\" data-id=\"custom\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_CUSTOM", {hash:{},data:data}))
    + "</li>\n		  <li class=\"item\" data-id=\"all\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_ALL", {hash:{},data:data}))
    + "</li>\n		  ";
  return buffer;
  }

  buffer += "<div class=\"modal-control-group clearfix\">\n  <label class=\"label-short\" for=\"modal-acl-number\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_RULE_NUMBER", {hash:{},data:data}))
    + "</label>\n  <div class=\"prefix-input left\">\n	<label for=\"modal-acl-number\">#</label>\n	<input class=\"input\" type=\"text\" id=\"modal-acl-number\" required data-ignore=\"true\" data-ignore-regexp=\"^[0-9]*$\" data-required=\"true\" autofocus>\n  </div>\n</div>\n<div class=\"modal-control-group clearfix\">\n	<label class=\"label-short\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_ACTION", {hash:{},data:data}))
    + "</label>\n	<div class=\"radio-group-horizontal\">\n		<div class=\"radio\">\n			<input type=\"radio\" id=\"acl-add-model-action-allow\" checked=\"checked\" name=\"acl-add-model-action-select\"/>\n			<label for=\"acl-add-model-action-allow\"></label>\n		</div>\n		<label class=\"radio-label\" for=\"acl-add-model-action-allow\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_ACTION_ALLOW", {hash:{},data:data}))
    + "</label>\n	</div>\n	<div class=\"radio-group-horizontal\">\n		<div class=\"radio\">\n			<input type=\"radio\" id=\"acl-add-model-action-deny\" name=\"acl-add-model-action-select\"/>\n			<label for=\"acl-add-model-action-deny\"></label>\n		</div>\n		<label class=\"radio-label\" for=\"acl-add-model-action-deny\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_ACTION_DENY", {hash:{},data:data}))
    + "</label>\n	</div>\n</div>\n<div class=\"modal-control-group clearfix\">\n	<label class=\"label-short\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_DIRECTION", {hash:{},data:data}))
    + "</label>\n	<div class=\"radio-group-horizontal\">\n		<div class=\"radio\">\n			<input type=\"radio\" id=\"acl-add-model-direction-inbound\" checked=\"checked\" name=\"acl-add-model-direction-select\"/>\n			<label for=\"acl-add-model-direction-inbound\"></label>\n		</div>\n		<label class=\"radio-label\" for=\"acl-add-model-direction-inbound\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_INBOUND", {hash:{},data:data}))
    + "</label>\n	</div>\n	<div class=\"radio-group-horizontal\">\n		<div class=\"radio\">\n			<input type=\"radio\" id=\"acl-add-model-direction-outbound\" name=\"acl-add-model-direction-select\"/>\n			<label for=\"acl-add-model-direction-outbound\"></label>\n		</div>\n		<label class=\"radio-label\" for=\"acl-add-model-direction-outbound\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_OUTBOUND", {hash:{},data:data}))
    + "</label>\n	</div>\n</div>\n<div class=\"modal-control-group acl-source-dest clearfix\">\n  <label class=\"label-short\" id=\"acl-add-model-bound-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_SOURCE", {hash:{},data:data}))
    + "</label>\n	<div class=\"selectbox\" id=\"acl-add-model-source-select\">\n		<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_CUSTOM", {hash:{},data:data}))
    + "</div>\n		<ul class=\"dropdown\">\n		<li class=\"item tooltip selected\" data-id=\"custom\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_CUSTOM", {hash:{},data:data}))
    + "</li>\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.subnets), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n  </div>\n  <input class=\"input\" type=\"text\" id=\"modal-acl-source-input\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" data-required=\"true\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PLACEHOLD_SOURCE", {hash:{},data:data}))
    + "' >\n</div>\n\n<div class=\"modal-control-group clearfix\">\n  <label class=\"label-short\" >"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_PROTOCOL", {hash:{},data:data}))
    + "</label>\n	  <div class=\"selectbox modal-protocol-select\" id=\"modal-protocol-select\"  data-protocal-type=\"tcp\">\n		<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_TCP", {hash:{},data:data}))
    + "</div>\n		<ul class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" tabindex=\"-1\">\n		  <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n		  <li class=\"selected item\" data-id=\"tcp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_TCP", {hash:{},data:data}))
    + "</li>\n		  <li class=\"item\" data-id=\"udp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_UDP", {hash:{},data:data}))
    + "</li>\n		  <li class=\"item\" data-id=\"icmp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_ICMP", {hash:{},data:data}))
    + "</li>\n		  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.classic), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	  </div>\n\n  <div id=\"sg-protocol-select-result\">\n	  <div class=\"sg-protocol-option-input show\" id=\"sg-protocol-tcp\">\n		<input class=\"input\" type=\"text\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PLACEHOLD_PORT_RANGE", {hash:{},data:data}))
    + "' required data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\"/>\n	  </div>\n	  <div class=\"sg-protocol-option-input\" id=\"sg-protocol-udp\">\n		<input class=\"input\" type=\"text\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PLACEHOLD_PORT_RANGE", {hash:{},data:data}))
    + "' required data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\"/>\n	  </div>\n	  <div class=\"sg-protocol-option-input\" id=\"sg-protocol-icmp\">\n		<div class=\"selectbox\" id=\"protocol-icmp-main-select\" data-protocal-main=\"0\"  data-protocal-sub=\"-1\">\n		  <div class=\"selection\">Echo Reply(0)</div>\n		  <div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\n			<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n			<ul tabindex=\"-1\" class=\"scroll-content\">\n			  <li class=\"item selected\" data-id=\"0\">Echo Reply(0)</li>\n			  <li class=\"item\" data-id=\"3\">Destination Unreachable(3) ...</li>\n			  <li class=\"item\" data-id=\"4\">Source Quench(4)</li>\n			  <li class=\"item\" data-id=\"5\">Redirect Message(5) ...</li>\n			  <li class=\"item\" data-id=\"6\">Alternate Host Address(6)</li>\n			  <li class=\"item\" data-id=\"8\">Echo Request(8)</li>\n			  <li class=\"item\" data-id=\"9\">Router Advertisement(9)</li>\n			  <li class=\"item\" data-id=\"10\">Router Solicitation(10)</li>\n			  <li class=\"item\" data-id=\"11\">Time Exceeded(11) ...</li>\n			  <li class=\"item\" data-id=\"12\">Parameter Problem: Bad IP header(12) ...</li>\n			  <li class=\"item\" data-id=\"13\">Timestamp(13)</li>\n			  <li class=\"item\" data-id=\"14\">Timestamp Reply(14)</li>\n			  <li class=\"item\" data-id=\"15\">Information Request(15)</li>\n			  <li class=\"item\" data-id=\"16\">Information Reply(16)</li>\n			  <li class=\"item\" data-id=\"17\">Address Mask Request(17)</li>\n			  <li class=\"item\" data-id=\"18\">Address Mask Reply(18)</li>\n			  <li class=\"item\" data-id=\"30\">Traceroute(30)</li>\n			  <li class=\"item\" data-id=\"31\">Datagram Conversion Error(31)</li>\n			  <li class=\"item\" data-id=\"32\">Mobile Host Redirect(32)</li>\n			  <li class=\"item\" data-id=\"33\">Where Are You(33)</li>\n			  <li class=\"item\" data-id=\"34\">Here I Am(34)</li>\n			  <li class=\"item\" data-id=\"35\">Mobile Registration Request(35)</li>\n			  <li class=\"item\" data-id=\"36\">Mobile Registration Reply(36)</li>\n			  <li class=\"item\" data-id=\"37\">Domain Name Request(37)</li>\n			  <li class=\"item\" data-id=\"38\">Domain Name Reply(38)</li>\n			  <li class=\"item\" data-id=\"39\">SKIP Algorithm Discovery Protocol(39)</li>\n			  <li class=\"item\" data-id=\"40\">Photuris Security Failures(40)</li>\n			  <li class=\"item\" data-id=\"-1\">All(-1)</li>\n			</ul>\n		  </div>\n	  </div>\n	  <div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-3\">\n		<div class=\"selection\">All(-1)</div>\n		<div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\n			<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n			<ul class=\"scroll-content\" tabindex=\"-1\">\n			  <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n			  <li class=\"item\" data-id=\"0\">destination network unreachable(0)</li>\n			  <li class=\"item\" data-id=\"1\">destination host unreachable(1)</li>\n			  <li class=\"item\" data-id=\"2\">destination protocol unreachable(2)</li>\n			  <li class=\"item\" data-id=\"3\">destination port unreachable(3)</li>\n			  <li class=\"item\" data-id=\"4\">fragmentation required and DF flag set(4)</li>\n			  <li class=\"item\" data-id=\"5\">source route failed(5)</li>\n			  <li class=\"item\" data-id=\"6\">destination network unknown(6)</li>\n			  <li class=\"item\" data-id=\"7\">destination host unknown(7)</li>\n			  <li class=\"item\" data-id=\"8\">source host isolated(8)</li>\n			  <li class=\"item\" data-id=\"9\">network administratively prohibited(9)</li>\n			  <li class=\"item\" data-id=\"10\">host administratively prohibited(10)</li>\n			  <li class=\"item\" data-id=\"11\">network unreachable for TOS(11)</li>\n			  <li class=\"item\" data-id=\"12\">host unreachable for TOS(12)</li>\n			  <li class=\"item\" data-id=\"13\">communication administratively prohibited(13)</li>\n			</ul>\n		</div>\n	  </div>\n	  <div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-5\">\n		<div class=\"selection\">All(-1)</div>\n		<ul class=\"dropdown\" tabindex=\"-1\">\n		  <li class=\"selected item\" data-id=\"-1\">All(-1)</li>\n		  <li class=\"item\" data-id=\"0\">redirect datagram for the network(0)</li>\n		  <li class=\"item\" data-id=\"1\">redirect datagram for the host(1)</li>\n		  <li class=\"item\" data-id=\"2\">redirect datagram for the TOS & network(2)</li>\n		  <li class=\"item\" data-id=\"3\">redirect datagram for the TOS & host(3)</li>\n		</ul>\n	  </div>\n	  <div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-11\">\n		<div class=\"selection\">All(-1)</div>\n		<ul class=\"dropdown\" tabindex=\"-1\">\n		  <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n		  <li class=\"item\" data-id=\"0\">TTL expired transit(0)</li>\n		  <li class=\"item\" data-id=\"1\">fragmentation reasembly time exceeded(1)</li>\n		</ul>\n	  </div>\n	  <div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-12\">\n		<div class=\"selection\">All(-1)</div>\n		<ul class=\"dropdown\" role=\"menu\">\n		  <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n		  <li class=\"item\" data-id=\"0\">pointer indicates the error(0)</li>\n		  <li class=\"item\" data-id=\"1\">missing a required option(1)</li>\n		  <li class=\"item\" data-id=\"2\">bad length(2)</li>\n		</ul>\n	  </div>\n	  </div>\n	  <div class=\"sg-protocol-option-input\" id=\"sg-protocol-custom\">\n			<input class=\"input\" type=\"string\" value=\"1\" min=\"1\" max=\"255\" required=\"\" required data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\">\n	  </div>\n	  <div class=\"sg-protocol-option-input\" id=\"sg-protocol-all\" required data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\"> "
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_PORT_RANGE_ALL", {hash:{},data:data}))
    + " </div>\n  </div>\n  <ul class=\"simple-protocol-select\">\n		<li>SSH</li>\n		<li>SMTP</li>\n		<li>DNS</li>\n		<li>HTTP</li>\n		<li>POP3</li>\n		<li>IMAP</li>\n		<li>LDAP</li>\n		<li>HTTPS</li>\n		<li>SMTPS</li>\n		<li>IMAPS</li>\n		<li>POP3S</li>\n		<li>MS SQL</li>\n		<li>MYSQL</li>\n		<li>RDP</li>\n	</ul>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });