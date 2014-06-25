define('component/sgrule/template',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n      <div class=\"selectbox\" id=\"sg-create-sg-out\">\n        <div class=\"selection\"><span class=\"sg-create-sg-color\" style=\"background:"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.owner)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.owner)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <ul class=\"dropdown\">\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.owner), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n      </div>\n\n      <div class=\"selectbox\" id=\"sg-create-direction\">\n        <div class=\"selection\">initiate traffic to</div>\n        <ul class=\"dropdown\">\n          <li class=\"item selected\" data-id=\"outbound\">initiate traffic to</li>\n          <li class=\"item\" data-id=\"inbound\">accept traffic from</li>\n          <li class=\"item\" data-id=\"biway\">have 2-way traffic with</li>\n        </ul>\n      </div>\n\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li class=\"item ";
  stack1 = helpers.unless.call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n              <span class=\"sg-create-sg-color\" style=\"background:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>\n              "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            </li>\n          ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n      <div id=\"sg-create-sg-out\">\n        <div class=\"sg-create-selection selected\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.owner)),stack1 == null || stack1 === false ? stack1 : stack1.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.owner)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n\n      <div id=\"sg-create-direction\">\n        <div class=\"sg-create-selection selected\" data-id=\"outbound\">initiate traffic to</div>\n      </div>\n\n      ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li class=\"item truncate ";
  stack1 = helpers.unless.call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n              <span class=\"sg-create-sg-color\" style=\"background:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>\n              "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            </li>\n          ";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\n          <li class=\"item\" data-id=\"custom\">Custom</li>\n          <li class=\"item\" data-id=\"all\">All</li>\n          ";
  }

function program11(depth0,data) {
  
  
  return "\n          <section class=\"sg-proto-input\" id=\"sg-proto-ipt-custom\">\n            <input class=\"input\" type=\"text\" name=\"protocol-custom-ranged\" value=\"1\" min=\"1\" max=\"255\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9]*$\" data-required=\"true\">\n          </section>\n\n          <section class=\"sg-proto-input\" id=\"sg-proto-ipt-all\">Port Range: 0-65535</section>\n    ";
  }

  buffer += "<header class=\"modal-header sg-rule-create-h\"><h3>Create Security Group Rule</h3><i class=\"btn-modal-close\">&times;</i></header>\n\n\n<article class=\"modal-body\" id=\"sg-rule-create-modal\" data-bind=\"true\">\n  <section class=\"sg-rule-create-add-wrap\">\n\n    <section class=\"sg-node-wrap clearfix\">\n      <label>Allow</label>\n\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.owner)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n      <div class=\"selectbox\" id=\"sg-create-sg-in\">\n        <div class=\"selection truncate\"><span class=\"sg-create-sg-color\" style=\"background:"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.relation)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.relation)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <ul class=\"dropdown\">\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.relation), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n      </div>\n    </section>\n\n    <p class=\"clearfix mgt10\">\n      <label class=\"sg-create-proto-label\">Destination Protocol</label>\n      <label class=\"sg-create-proto-label-port\">Port</label>\n    </p>\n\n    <section class=\"clearfix sg-proto-option-wrap\">\n      <div class=\"selectbox sg-proto-option\" id=\"sg-create-proto\" data-protocal-type=\"tcp\">\n        <div class=\"selection\">TCP</div>\n        <ul class=\"dropdown\" tabindex=\"-1\">\n          <li class=\"selected item\" data-id=\"tcp\">TCP</li>\n          <li class=\"item\" data-id=\"udp\">UDP</li>\n          <li class=\"item\" data-id=\"icmp\">ICMP</li>\n          ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isClassic), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n      </div>\n\n      <div class=\"sg-create-proto-inputs\">\n          <section class=\"sg-proto-input\" id=\"sg-proto-ipt-tcp\" style=\"display:block;\">\n            <input class=\"input\" type=\"text\" placeholder=\"Port Range.eg.80 or 49152-65535\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\"/>\n          </section>\n\n          <section class=\"sg-proto-input\" id=\"sg-proto-ipt-udp\">\n            <input class=\"input\" type=\"text\" placeholder=\"Port Range.eg.80 or 49152-65535\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\"/>\n          </section>\n\n          <section class=\"sg-proto-input\" id=\"sg-proto-ipt-icmp\">\n            <div class=\"selectbox\" id=\"sg-proto-icmp-sel\">\n              <div class=\"selection\">Echo Reply(0)</div>\n              <div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\n                <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                <ul tabindex=\"-1\" class=\"scroll-content\">\n                  <li class=\"item selected\" data-id=\"0\">Echo Reply(0)</li>\n                  <li class=\"item\" data-id=\"3\">Destination Unreachable(3) ...</li>\n                  <li class=\"item\" data-id=\"4\">Source Quench(4)</li>\n                  <li class=\"item\" data-id=\"5\">Redirect Message(5) ...</li>\n                  <li class=\"item\" data-id=\"6\">Alternate Host Address(6)</li>\n                  <li class=\"item\" data-id=\"8\">Echo Request(8)</li>\n                  <li class=\"item\" data-id=\"9\">Router Advertisement(9)</li>\n                  <li class=\"item\" data-id=\"10\">Router Solicitation(10)</li>\n                  <li class=\"item\" data-id=\"11\">Time Exceeded(11) ...</li>\n                  <li class=\"item\" data-id=\"12\">Parameter Problem: Bad IP header(12) ...</li>\n                  <li class=\"item\" data-id=\"13\">Timestamp(13)</li>\n                  <li class=\"item\" data-id=\"14\">Timestamp Reply(14)</li>\n                  <li class=\"item\" data-id=\"15\">Information Request(15)</li>\n                  <li class=\"item\" data-id=\"16\">Information Reply(16)</li>\n                  <li class=\"item\" data-id=\"17\">Address Mask Request(17)</li>\n                  <li class=\"item\" data-id=\"18\">Address Mask Reply(18)</li>\n                  <li class=\"item\" data-id=\"30\">Traceroute(30)</li>\n                  <li class=\"item\" data-id=\"31\">Datagram Conversion Error(31)</li>\n                  <li class=\"item\" data-id=\"32\">Mobile Host Redirect(32)</li>\n                  <li class=\"item\" data-id=\"33\">Where Are You(33)</li>\n                  <li class=\"item\" data-id=\"34\">Here I Am(34)</li>\n                  <li class=\"item\" data-id=\"35\">Mobile Registration Request(35)</li>\n                  <li class=\"item\" data-id=\"36\">Mobile Registration Reply(36)</li>\n                  <li class=\"item\" data-id=\"37\">Domain Name Request(37)</li>\n                  <li class=\"item\" data-id=\"38\">Domain Name Reply(38)</li>\n                  <li class=\"item\" data-id=\"39\">SKIP Algorithm Discovery Protocol(39)</li>\n                  <li class=\"item\" data-id=\"40\">Photuris Security Failures(40)</li>\n                  <li class=\"item\" data-id=\"-1\">All(-1)</li>\n                </ul>\n              </div>\n            </div>\n            <div class=\"selectbox sg-proto-input-sub\" id=\"sg-proto-input-sub-3\">\n              <div class=\"selection\">All(-1)</div>\n              <div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\n                <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                <ul class=\"scroll-content\" tabindex=\"-1\">\n                  <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n                  <li class=\"item\" data-id=\"0\">destination network unreachable(0)</li>\n                  <li class=\"item\" data-id=\"1\">destination host unreachable(1)</li>\n                  <li class=\"item\" data-id=\"2\">destination protocol unreachable(2)</li>\n                  <li class=\"item\" data-id=\"3\">destination port unreachable(3)</li>\n                  <li class=\"item\" data-id=\"4\">fragmentation required and DF flag set(4)</li>\n                  <li class=\"item\" data-id=\"5\">source route failed(5)</li>\n                  <li class=\"item\" data-id=\"6\">destination network unknown(6)</li>\n                  <li class=\"item\" data-id=\"7\">destination host unknown(7)</li>\n                  <li class=\"item\" data-id=\"8\">source host isolated(8)</li>\n                  <li class=\"item\" data-id=\"9\">network administratively prohibited(9)</li>\n                  <li class=\"item\" data-id=\"10\">host administratively prohibited(10)</li>\n                  <li class=\"item\" data-id=\"11\">network unreachable for TOS(11)</li>\n                  <li class=\"item\" data-id=\"12\">host unreachable for TOS(12)</li>\n                  <li class=\"item\" data-id=\"13\">communication administratively prohibited(13)</li>\n                </ul>\n              </div>\n            </div>\n            <div class=\"selectbox sg-proto-input-sub\" id=\"sg-proto-input-sub-5\">\n              <div class=\"selection\">All(-1)</div>\n              <ul class=\"dropdown\" tabindex=\"-1\">\n                <li class=\"selected item\" data-id=\"-1\">All(-1)</li>\n                <li class=\"item\" data-id=\"0\">redirect datagram for the network(0)</li>\n                <li class=\"item\" data-id=\"1\">redirect datagram for the host(1)</li>\n                <li class=\"item\" data-id=\"2\">redirect datagram for the TOS & network(2)</li>\n                <li class=\"item\" data-id=\"3\">redirect datagram for the TOS & host(3)</li>\n              </ul>\n            </div>\n            <div class=\"selectbox sg-proto-input-sub\" id=\"sg-proto-input-sub-11\">\n              <div class=\"selection\">All(-1)</div>\n              <ul class=\"dropdown\" tabindex=\"-1\">\n                <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n                <li class=\"item\" data-id=\"0\">TTL expired transit(0)</li>\n                <li class=\"item\" data-id=\"1\">fragmentation reasembly time exceeded(1)</li>\n              </ul>\n            </div>\n            <div class=\"selectbox sg-proto-input-sub\" id=\"sg-proto-input-sub-12\">\n              <div class=\"selection\">All(-1)</div>\n              <ul class=\"dropdown\" role=\"menu\">\n                <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n                <li class=\"item\" data-id=\"0\">pointer indicates the error(0)</li>\n                <li class=\"item\" data-id=\"1\">missing a required option(1)</li>\n                <li class=\"item\" data-id=\"2\">bad length(2)</li>\n              </ul>\n            </div>\n          </section>\n\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isClassic), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n    </section>\n    <button class=\"btn btn-blue sg-rule-create-add\">Add Rule</button>\n  </section>\n\n  <section class=\"sg-rule-create-done-wrap\">\n    <div>\n      <p id=\"sg-rule-create-msg\" class=\"modal-text-major\"></p>\n      <p id=\"sg-rule-self-ref\" class=\"hide\"><i class=\"icon-info icon-label\"></i>You have created a rule referencing its own security group. This rule will not be visualized as the blue connection lines.</p>\n    </div>\n    <button class=\"btn sg-rule-create-readd\">Create another rule</button>\n    <button class=\"btn btn-silver btn-modal-close\">Close</button>\n  </section>\n</article>\n\n\n<aside class=\"sg-rule-create-sidebar\">\n  <div class=\"sidebar-wrap\">\n  <header class=\"sg-create-sb-h\">Related Rule<span class=\"num-wrap\" id=\"sgRuleCreateCount\">("
    + escapeExpression(((stack1 = (depth0 && depth0.ruleCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></header>\n  <section class=\"scroll-wrap scrollbar-auto-hide\" style=\"max-height:358px\">\n      <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n      <div class=\"scroll-content sg-create-rule-list\" id=\"sgRuleCreateSidebar\"></div>\n  </section>\n</div>\n</aside>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('component/sgrule/SGRulePopupView',['./template', 'i18n!/nls/lang.js', "Design"], function(template, lang, Design) {
    var SGRulePopupView;
    SGRulePopupView = Backbone.View.extend({
      events: {
        'click .sg-rule-create-add': 'addRule',
        'click .sg-rule-create-readd': 'readdRule',
        'OPTION_CHANGE #sg-create-proto': 'onProtocolChange',
        'click .sg-rule-delete': 'deleteRule',
        'OPTION_CHANGE #sg-proto-icmp-sel': 'onICMPChange',
        "click .btn-modal-close": 'onModalClose'
      },
      render: function() {
        modal(template(this.model.attributes), true);
        this.setElement($('#sg-rule-create-modal').closest('#modal-wrap'));
        this.updateSidebar();
        return null;
      },
      addRule: function(event) {
        var action, data, in_target, info, out_target, ruleCount;
        data = this.extractRuleData(event);
        if (!data) {
          return;
        }
        ruleCount = this.model.addRule(data);
        if (ruleCount === 0) {
          return;
        }
        out_target = $("#sg-create-sg-out").find(".selected").text();
        in_target = $("#sg-create-sg-in").find(".selected").text();
        action = $("#sg-create-direction").find(".selected").text();
        $("#sg-rule-self-ref").hide();
        if (ruleCount === 1) {
          info = sprintf(lang.ide.PROP_MSG_SG_CREATE, out_target, out_target, action, in_target);
        } else if (data.target === data.relation) {
          info = sprintf(lang.ide.PROP_MSG_SG_CREATE_SELF, ruleCount, out_target, out_target);
          $("#sg-rule-self-ref").show();
        } else {
          info = sprintf(lang.ide.PROP_MSG_SG_CREATE_MULTI, ruleCount, out_target, in_target, out_target, action, in_target);
        }
        $("#sg-rule-create-msg").text(info);
        this.$el.find('#modal-box').toggleClass('done', true);
        return this.updateSidebar();
      },
      readdRule: function() {
        return this.$el.find('#modal-box').toggleClass('done', false);
      },
      deleteRule: function(event) {
        var $count, $li, $parent, c, data;
        $li = $(event.currentTarget).closest("li");
        data = {
          ruleSetId: $li.attr("data-uid"),
          protocol: $li.attr("data-protocol"),
          relation: $li.attr("data-relation"),
          port: $li.attr("data-port"),
          direction: $li.attr("data-direction")
        };
        $parent = $li.parent();
        $li.remove();
        if ($parent.children().length === 0) {
          $parent.prev().remove();
          $parent.remove();
        }
        this.model.delRule(data);
        $count = $("#sgRuleCreateCount");
        c = parseInt($("#sgRuleCreateCount").text().replace("(", ""), 10) - 1;
        if (c < 0) {
          c = 0;
        }
        $count.text("(" + c + ")");
        return false;
      },
      onDirChange: function() {
        return $(".sg-rule-direction").html($("#sg-rule-create-dir-i").is(":checked") ? lang.ide.POP_SGRULE_LBL_SOURCE : lang.ide.POP_SGRULE_LBL_DEST);
      },
      onProtocolChange: function(event, id) {
        $(".sg-proto-input").hide();
        $("#sg-proto-ipt-" + id).show();
        if (id === 'custom') {
          return $('#sg-rule-create-modal .sg-create-proto-label-port').text('Protocol');
        } else {
          return $('#sg-rule-create-modal .sg-create-proto-label-port').text('Port');
        }
      },
      onICMPChange: function(event, id) {
        $(".sg-proto-input-sub").hide();
        return $("#sg-proto-input-sub-" + id).show();
      },
      updateSidebar: function() {
        var $modal, $sidebar, group, isShown, ruleCount, _i, _len, _ref;
        ruleCount = 0;
        _ref = this.model.attributes.groups || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          group = _ref[_i];
          ruleCount += group.rules.length;
          group.rules.deletable = true;
          group.content = MC.template.sgRuleList(group.rules);
        }
        $sidebar = $("#sgRuleCreateSidebar").html(MC.template.groupedSgRuleList(this.model.attributes));
        $("#sgRuleCreateCount").text("(" + ruleCount + ")");
        $modal = this.$el.find('#modal-box');
        $sidebar = $sidebar.closest(".sg-rule-create-sidebar");
        isShown = $sidebar.hasClass("shown");
        if (ruleCount === 0) {
          if (isShown) {
            $sidebar.removeClass("shown").animate({
              left: "0"
            });
            return $modal.animate({
              left: '-=100px'
            }, 300);
          }
        } else {
          if (!isShown) {
            $sidebar.addClass("shown").animate({
              left: "-200px"
            });
            return $modal.animate({
              left: '+=100px'
            }, 300);
          }
        }
      },
      onModalClose: function() {
        var component, lineId;
        lineId = this.model.get("lineId");
        component = Design.instance().component(lineId);
        if (component) {
          $canvas(lineId).select();
        } else {
          $canvas.clearSelected();
        }
        modal.close();
        return false;
      },
      extractRuleData: function(event) {
        var $protoIpt, $protoIptWrap, custom_protocal_dom, needValidate, portValue, ports, protocol_type, rule, tcp_port_dom, udp_port_dom, validateMap;
        tcp_port_dom = $('#sg-proto-ipt-tcp input');
        udp_port_dom = $('#sg-proto-ipt-udp input');
        custom_protocal_dom = $('#sg-proto-ipt-custom input');
        protocol_type = $("#sg-create-proto").find(".selected").attr("data-id");
        validateMap = {
          'custom': {
            dom: custom_protocal_dom,
            method: function(val) {
              if (!MC.validate.portRange(val)) {
                return lang.ide.PARSLEY_MUST_BE_A_VALID_FORMAT_OF_NUMBER;
              }
              if (Number(val) < 0 || Number(val) > 255) {
                return lang.ide.PARSLEY_THE_PROTOCOL_NUMBER_RANGE_MUST_BE_0_255;
              }
              return null;
            }
          },
          'tcp': {
            dom: tcp_port_dom,
            method: function(val) {
              var portAry;
              portAry = MC.validate.portRange(val);
              if (!portAry) {
                return lang.ide.PARSLEY_MUST_BE_A_VALID_FORMAT_OF_PORT_RANGE;
              }
              if (!MC.validate.portValidRange(portAry)) {
                return lang.ide.PARSLEY_PORT_RANGE_BETWEEN_0_65535;
              }
              return null;
            }
          },
          'udp': {
            dom: udp_port_dom,
            method: function(val) {
              var portAry;
              portAry = MC.validate.portRange(val);
              if (!portAry) {
                return lang.ide.PARSLEY_MUST_BE_A_VALID_FORMAT_OF_PORT_RANGE;
              }
              if (!MC.validate.portValidRange(portAry)) {
                return lang.ide.PARSLEY_PORT_RANGE_BETWEEN_0_65535;
              }
              return null;
            }
          }
        };
        if (protocol_type in validateMap) {
          needValidate = validateMap[protocol_type];
          needValidate.dom.parsley('custom', needValidate.method);
        }
        if (needValidate && !needValidate.dom.parsley('validate')) {
          return;
        }
        rule = {
          protocol: protocol_type,
          direction: $("#sg-create-direction").find(".selected").attr("data-id"),
          fromPort: "",
          toPort: "",
          target: $("#sg-create-sg-out").find(".selected").attr("data-id"),
          relation: $("#sg-create-sg-in").find(".selected").attr("data-id")
        };
        $protoIptWrap = $("#sg-proto-ipt-" + rule.protocol);
        $protoIpt = $protoIptWrap.find("input");
        portValue = $protoIpt.val();
        switch (protocol_type) {
          case "tcp":
          case "udp":
            ports = portValue.split("-");
            rule.fromPort = ports[0].trim();
            if (ports.length >= 2) {
              rule.toPort = ports[1].trim();
            }
            break;
          case "icmp":
            portValue = $("#sg-proto-icmp-sel").find(".selected").attr("data-id");
            rule.fromPort = portValue;
            if (portValue === "3" || portValue === "5" || portValue === "11" || portValue === "12") {
              rule.toPort = $("#sg-proto-input-sub-" + portValue).find(".selected").attr("data-id");
            } else {
              rule.toPort = "-1";
            }
            break;
          case "custom":
            rule.protocol = portValue;
        }
        return rule;
      }
    });
    return SGRulePopupView;
  });

}).call(this);

(function() {
  define('component/sgrule/SGRulePopup',['constant', "Design", './SGRulePopupView', "backbone"], function(constant, Design, View) {
    var SGRulePopup, SGRulePopupModel;
    SGRulePopupModel = Backbone.Model.extend({
      initialize: function() {
        var design, map, port1, port2;
        design = Design.instance();
        port1 = this.get("port1");
        port2 = this.get("port2");
        map = function(sg) {
          return {
            uid: sg.id,
            color: sg.color,
            name: sg.get("name")
          };
        };
        this.set("relation", _.map(port2.connectionTargets("SgAsso"), map));
        if (_.isString(port1)) {
          this.set("owner", {
            name: port1,
            uid: this.get("port1").id
          });
        } else {
          this.set("owner", _.map(port1.connectionTargets("SgAsso"), map));
        }
        this.updateGroupList();
        return null;
      },
      updateGroupList: function() {
        var SgRuleSetModel, allRuleSets, cnn, design;
        design = Design.instance();
        cnn = design.component(this.get("uid"));
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        allRuleSets = SgRuleSetModel.getRelatedSgRuleSets(this.get("port1"), this.get("port2"));
        this.set("groups", SgRuleSetModel.getGroupedObjFromRuleSets(allRuleSets));
        return null;
      },
      addRule: function(data) {
        var SgRuleSetModel, count, relationComp, sgRuleSet, targetComp;
        targetComp = Design.instance().component(data.target);
        relationComp = Design.instance().component(data.relation);
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        sgRuleSet = new SgRuleSetModel(targetComp, relationComp);
        count = 2;
        sgRuleSet.addRule(data.target, data.direction, data);
        if (data.direction === "biway") {
          count *= 2;
        }
        this.updateGroupList();
        return count;
      },
      delRule: function(data) {
        var sgRuleSet;
        sgRuleSet = Design.instance().component(data.ruleSetId);
        sgRuleSet.removeRuleByPlainObj(data);
        return null;
      }
    });
    SGRulePopup = function(line_id, port2Comp) {
      var cnn, model, port1Comp;
      if (port2Comp) {
        port1Comp = line_id;
        line_id = "";
      } else {
        cnn = Design.instance().component(line_id);
        port1Comp = cnn.port1Comp();
        port2Comp = cnn.port2Comp();
      }
      model = new SGRulePopupModel({
        port1: port1Comp,
        port2: port2Comp,
        lineId: line_id
      });
      return (new View({
        model: model
      })).render();
    };
    return SGRulePopup;
  });

}).call(this);

