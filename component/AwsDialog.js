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
  define('component/sgrule/SGRulePopupView',['./template', 'i18n!/nls/lang.js', "Design", "event"], function(template, lang, Design, ide_event) {
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
        var comp, lineId;
        modal.close();
        lineId = this.model.get("lineId");
        comp = Design.instance().component(lineId);
        if (comp) {
          ide_event.trigger(ide_event.OPEN_PROPERTY, comp.type, lineId);
        }
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

define('component/dbsbgroup/template',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<header class=\"modal-list-header dbsgppp-az\">"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</header>\n";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<section class=\"modal-list-body\">\n  <div class=\"checkbox\">\n   <input id=\"dbsgppp-"
    + escapeExpression(((stack1 = (depth0 && depth0.idx)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"dbsgppp-subnet\" type=\"checkbox\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n   <label for=\"dbsgppp-"
    + escapeExpression(((stack1 = (depth0 && depth0.idx)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n  </div>\n  <label class=\"dbsgppp-sbname\" for=\"dbsgppp-"
    + escapeExpression(((stack1 = (depth0 && depth0.idx)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " \n  	<div class=\"dbsgppp-cidr\">("
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n  </label>\n  \n</section>\n";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

  buffer += "<p class=\"modal-text-major\">Add subnets from at least 2 different availability zones to this subnet group. </p>\n\n";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('component/dbsbgroup/DbSubnetGPopup',['./template', 'i18n!/nls/lang.js', "UI.modalplus", "constant", "Design"], function(template, lang, Modal, constant, Design) {
    return Backbone.View.extend({
      events: {
        "click .dbsgppp-subnet": "updateSelected"
      },
      initialize: function() {
        var assos, modal, self, subnets;
        self = this;
        assos = this.model.connectionTargets("SubnetgAsso");
        subnets = _.map(this.model.design().componentsOfType(constant.RESTYPE.SUBNET), function(subnet, key) {
          return {
            az: subnet.parent().get("name"),
            id: subnet.id,
            name: subnet.get("name"),
            cidr: subnet.get("cidr"),
            idx: key,
            checked: assos.indexOf(subnet) >= 0
          };
        });
        modal = new Modal({
          title: "Select Subnet for Subnet Group",
          template: template(_.groupBy(subnets, "az")),
          confirm: {
            text: "Done"
          },
          disableClose: true,
          onCancel: function() {
            return self.cancel();
          },
          onClose: function() {
            return self.cancel();
          },
          onConfirm: function() {
            self.apply();
            return modal.close();
          }
        });
        this.setElement(modal.tpl);
        this.updateSelected();
      },
      updateSelected: function() {
        var azs, btn;
        btn = this.$el.closest(".modal-box").find(".modal-confirm");
        azs = {};
        _.each(this.$el.find(".dbsgppp-subnet:checked"), function(el) {
          var id;
          id = $(el).attr("data-id");
          return azs[Design.instance().component(id).parent().get("name")] = true;
        });
        if (_.keys(azs).length > 1) {
          btn.removeAttr("disabled");
        } else {
          btn.attr("disabled", "disabled");
        }
      },
      cancel: function() {
        if (this.model.connectionTargets("SubnetgAsso").length === 0) {
          this.model.remove();
        }
      },
      apply: function() {
        var SubnetgAsso, cb, design, existSb, id, sb, sbAsso, subnets, value, _i, _j, _len, _len1, _ref, _ref1;
        subnets = {};
        _ref = this.$el.find(".dbsgppp-subnet:checked");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          subnets[$(cb).attr("data-id")] = true;
        }
        existSb = {};
        _ref1 = this.model.connections("SubnetgAsso");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sbAsso = _ref1[_j];
          id = sbAsso.getTarget(constant.RESTYPE.SUBNET).id;
          if (!subnets[id]) {
            sbAsso.remove();
          } else {
            existSb[id] = true;
          }
        }
        SubnetgAsso = Design.modelClassForType("SubnetgAsso");
        design = this.model.design();
        for (sb in subnets) {
          value = subnets[sb];
          if (!existSb[sb]) {
            new SubnetgAsso(this.model, design.component(sb));
          }
        }
        this.trigger('update');
      }
    });
  });

}).call(this);

define('component/AppAction/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<header class=\"modal-header\" style=\"width:390px;\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_DELETE_STACK", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i></header>\n<div class=\"modal-body modal-text-wraper\" style=\"width:390px;\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(((stack1 = (depth0 && depth0.msg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn modal-close btn-red\" id=\"confirmRmStack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_DELETE_STACK", {hash:{},data:data}))
    + "</button>\n    <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.removeStackConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<header class=\"modal-header\" style=\"width:390px;\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_DUPLICATE_STACK", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i></header>\n<div class=\"modal-body modal-text-wraper\" style=\"width:390px;\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-control-group\">\n            <label class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BODY_DUPLICATE_STACK", {hash:{},data:data}))
    + "</label>\n            <input id=\"confirmDupStackIpt\" class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.newName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-red\" id=\"confirmDupStack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_DUPLICATE_STACK", {hash:{},data:data}))
    + "</button>\n    <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.dupStackConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n            <li>\n                EC2 instances will be started.\n            </li>\n        ";
  }

function program3(depth0,data) {
  
  
  return "\n            <li>\n                DB instances will be restored from final snapshot.\n            </li>\n        ";
  }

function program5(depth0,data) {
  
  
  return "\n            <li>\n                Auto Scaling Group will be recreated.\n            </li>\n        ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"modal-shrink\">\n            <div class=\"sub-gray\">Warning</div>\n            <div class=\"error\">\n                DB instance ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.lostDBSnapshot), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "’s final snapshot is missing. This DB instance cannot be restored.\n            </div>\n        </div>\n    ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.index), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }
function program9(depth0,data) {
  
  
  return ", ";
  }

  buffer += "<div class=\"modal-center-align-helper\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BODY_START_APP", {hash:{},data:data}))
    + "</div>\n    <ul class=\"modal-list-items\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasEC2Instance), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasDBInstance), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasASG), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lostDBSnapshot)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.startAppConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div style=\"padding: 20px\">\n        <p><b style=\"color:#ec3c38;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.appName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_PROD_APP_WARNING_MSG", {hash:{},data:data}))
    + "</b>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_TERMINATE_PROD_APP_MSG", {hash:{},data:data}))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_STOP_ASG", {hash:{},data:data}))
    + "</p>\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_STOP_PROD_APP_INPUT_LBL", {hash:{},data:data}))
    + "</p>\n        <div><input class=\"input\" style=\"width:351px;\" id=\"appNameConfirmIpt\"/></div>\n    </div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"modal-center-align-helper\" style=\"padding: 20px\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BODY_STOP_APP_LEFT", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.appName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BODY_STOP_APP_RIGHT", {hash:{},data:data}))
    + "</div>\n        <ul class=\"modal-list-items\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasEC2Instance), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasDBInstance), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasAsg), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </div>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <li>\n                    EC2 instances will be stopped.\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasInstanceStore), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </li>\n            ";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "<span class=\"error\">Instance-stored instances will be deleted.</span>";
  }

function program7(depth0,data) {
  
  
  return "\n                <li>\n                    DB instances will be deleted final snapshot will be taken.\n                    <span>Snapshots will be restored when the app is started.</span>\n                </li>\n            ";
  }

function program9(depth0,data) {
  
  
  return "\n                <li>\n                    Auto Scaling Group will be deleted.\n                    <span>Auto Scaling Group will be recreated when the app is started.</span>\n                </li>\n            ";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"estimate-stop clearfix\">\n        <div>\n            <span class=\"title\">Estimated Cost When Stopped</span>\n            <span class=\"price\" id=\"label-total-fee\"><b>$"
    + escapeExpression(((stack1 = (depth0 && depth0.totalFee)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> / month</span>\n        </div>\n        <div class=\"hide\">\n            <span class=\"title\">Saving Compared to Running App</span>\n            <span class=\"price\" id=\"label-total-saving\"><b>$"
    + escapeExpression(((stack1 = (depth0 && depth0.savingFee)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b>/ month</span>\n        </div>\n    </div>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isProduction), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.totalFee), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.stopAppConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "(<span class=\"db-stop-status\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return ", ";
  }

  buffer += "<p>DB Instance\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.cantStop), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    cannot take final snapshot.</p>\n<p>Wait for the DB instance(s) to be available. Then try to stop the app again.</p>";
  return buffer;
  };
TEMPLATE.cantStop=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <p><b style=\"color:#ec3c38;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_PROD_APP_WARNING_MSG", {hash:{},data:data}))
    + "</b>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_TERMINATE_PROD_APP_MSG", {hash:{},data:data}))
    + "</p>\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_TERMINATE_PROD_APP_INPUT_LBL", {hash:{},data:data}))
    + "</p>\n        <div><input class=\"input\" style=\"width:430px;\" id=\"appNameConfirmIpt\"/></div>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"modal-center-align-helper\"> <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BODY_TERMINATE_APP_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BODY_TERMINATE_APP_RIGHT", {hash:{},data:data}))
    + "</div></div>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"check-final-snapshot checkbox-wrap\">\n            <div class=\"checkbox\">\n                <input id=\"take-rds-snapshot\" type=\"checkbox\" checked=\"checked\" name=\"dns-resolution\">\n                <label for=\"take-rds-snapshot\"></label>\n            </div>\n            <label for=\"take-rds-snapshot\">Take final snapshot for DB instances.</label>\n        </section>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notReadyDB)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"cant-snapshot\">DB Instance\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.notReadyDB), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                cannot take final snapshot.</p>\n        ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "(<span class=\"db-stop-status\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return ", ";
  }

  buffer += "<div class=\"confirm-padding\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.production), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.hasDBInstance)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.terminateAppConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"disconnected-msg\">\n    <div>Connection lost. Attempting to reconnect…</div>\n    <div>Changes made now may not be saved.</div>\n</section>";
  };
TEMPLATE.disconnectedMsg=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<header class=\"modal-header\" style=\"width:390px;\"><h3>Force to delete app</h3><i class=\"modal-close\">&times;</i></header>\n<div class=\"modal-body modal-text-wraper\" style=\"width:390px;\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-text-major\">The app "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " failed to terminate. Do you want to force deleting it? After force deleting it, you need to manually manage the resource in aws console.</div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn modal-close btn-red\" id=\"forceTerminateApp\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_DELETE_STACK", {hash:{},data:data}))
    + "</button>\n    <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.forceTerminateApp=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });

/*
----------------------------
  App Action Method
----------------------------
 */

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('appAction',["backbone", "component/AppAction/template", 'i18n!/nls/lang.js', 'CloudResources', 'constant', 'UI.modalplus'], function(Backbone, AppTpl, lang, CloudResources, constant, modalPlus) {
    var AppAction;
    AppAction = Backbone.View.extend({
      deleteStack: function(id, name) {
        name = name || App.model.stackList().get(id).get("name");
        modal(AppTpl.removeStackConfirm({
          msg: sprintf(lang.ide.TOOL_POP_BODY_DELETE_STACK, name)
        }));
        $("#confirmRmStack").on("click", function() {
          var opsModel, p;
          opsModel = App.model.stackList().get(id);
          p = opsModel.remove();
          if (opsModel.isPersisted()) {
            return p.then(function() {
              return notification("info", sprintf(lang.ide.TOOL_MSG_ERR_DEL_STACK_SUCCESS, name));
            }, function() {
              return notification("error", sprintf(lang.ide.TOOL_MSG_ERR_DEL_STACK_FAILED, name));
            });
          }
        });
      },
      duplicateStack: function(id) {
        var opsModel;
        opsModel = App.model.stackList().get(id);
        if (!opsModel) {
          return;
        }
        opsModel.fetchJsonData().then(function() {
          return App.openOps(App.model.createStackByJson(opsModel.getJsonData()));
        }, function() {
          return notification("error", "Cannot duplicate the stack, please retry.");
        });
      },
      startApp: function(id) {
        var comp, dbInstance, hasASG, hasDBInstance, hasEC2Instance, name, snapshots, startAppModal;
        name = App.model.appList().get(id).get("name");
        comp = Design.instance().serialize().component;
        hasEC2Instance = (_.filter(comp, function(e) {
          return e.type === constant.RESTYPE.INSTANCE;
        })).length;
        hasDBInstance = (_.filter(comp, function(e) {
          return e.type === constant.RESTYPE.DBINSTANCE;
        })).length;
        hasASG = (_.filter(comp, function(e) {
          return e.type === constant.RESTYPE.ASG;
        })).length;
        startAppModal = new modalPlus({
          template: AppTpl.loading(),
          title: lang.ide.TOOL_TIP_START_APP,
          confirm: {
            text: lang.ide.TOOL_POP_BTN_START_APP,
            color: 'blue',
            disabled: false
          },
          disableClose: true
        });
        startAppModal.tpl.find('.modal-footer').hide();
        dbInstance = _.filter(comp, function(e) {
          return e.type === constant.RESTYPE.DBINSTANCE;
        });
        snapshots = CloudResources(constant.RESTYPE.DBSNAP, Design.instance().region());
        return snapshots.fetchForce().then(function() {
          var lostDBSnapshot;
          lostDBSnapshot = _.filter(dbInstance, function(e) {
            return e.resource.DBSnapshotIdentifier && !snapshots.findWhere({
              id: e.resource.DBSnapshotIdentifier
            });
          });
          startAppModal.tpl.find('.modal-footer').show();
          startAppModal.tpl.find('.modal-body').html(AppTpl.startAppConfirm({
            hasEC2Instance: hasEC2Instance,
            hasDBInstance: hasDBInstance,
            hasASG: hasASG,
            lostDBSnapshot: lostDBSnapshot
          }));
          startAppModal.on('confirm', function() {
            startAppModal.close();
            App.model.appList().get(id).start().fail(function(err) {
              var error;
              error = err.awsError ? err.error + "." + err.awsError : err.error;
              notification("Fail to start your app \"" + name + "\". (ErrorCode: " + error + ")");
            });
          });
        });
      },
      stopApp: function(id) {
        var app, appName, canStop, isProduction, name, resourceList, that;
        app = App.model.appList().get(id);
        name = app.get("name");
        that = this;
        AppTpl.cantStop({});
        isProduction = app.get('usage') === "production";
        appName = app.get('name');
        canStop = new modalPlus({
          template: AppTpl.loading(),
          title: isProduction ? lang.ide.TOOL_POP_TIT_STOP_PRD_APP : lang.ide.TOOL_POP_TIT_STOP_APP,
          confirm: {
            text: lang.ide.TOOL_POP_BTN_STOP_APP,
            color: 'red',
            disabled: isProduction
          },
          disableClose: true
        });
        canStop.tpl.find(".modal-footer").hide();
        resourceList = CloudResources(constant.RESTYPE.DBINSTANCE, app.get("region"));
        return Q.all(resourceList.fetchForce(), app.fetchJsonData()).then(function() {
          var amiRes, com, comp, imageId, toFetch, toFetchArray, uid;
          comp = app.getJsonData().component;
          toFetch = {};
          for (uid in comp) {
            com = comp[uid];
            if (com.type === constant.RESTYPE.INSTANCE || com.type === constant.RESTYPE.LC) {
              imageId = com.resource.ImageId;
              if (imageId) {
                toFetch[imageId] = true;
              }
            }
          }
          toFetchArray = _.keys(toFetch);
          amiRes = CloudResources(constant.RESTYPE.AMI, app.get("region"));
          return amiRes.fetchAmis(_.keys(toFetch)).then(function() {
            var dbInstanceName, fee, hasAsg, hasDBInstance, hasEC2Instance, hasInstanceStore, hasNotReadyDB, savingFee, totalFee, _ref, _ref1, _ref2;
            hasInstanceStore = false;
            amiRes.each(function(e) {
              var _ref;
              if ((_ref = e.id, __indexOf.call(toFetchArray, _ref) >= 0) && e.get("rootDeviceType") === 'instance-store') {
                return hasInstanceStore = true;
              }
            });
            hasEC2Instance = (_ref = _.filter(comp, function(e) {
              return e.type === constant.RESTYPE.INSTANCE;
            })) != null ? _ref.length : void 0;
            hasDBInstance = _.filter(comp, function(e) {
              return e.type === constant.RESTYPE.DBINSTANCE;
            });
            dbInstanceName = _.map(hasDBInstance, function(e) {
              return e.resource.DBInstanceIdentifier;
            });
            hasNotReadyDB = resourceList.filter(function(e) {
              var _ref1;
              return (_ref1 = e.get('DBInstanceIdentifier'), __indexOf.call(dbInstanceName, _ref1) >= 0) && e.get('DBInstanceStatus') !== 'available';
            });
            hasAsg = (_ref1 = _.filter(comp, function(e) {
              return e.type === constant.RESTYPE.ASG;
            })) != null ? _ref1.length : void 0;
            fee = ((_ref2 = Design.instance()) != null ? _ref2.getCost() : void 0) || {};
            totalFee = fee.totalFee;
            savingFee = fee.totalFee;
            canStop.tpl.find(".modal-footer").show();
            if (hasNotReadyDB && hasNotReadyDB.length) {
              canStop.tpl.find('.modal-body').html(AppTpl.cantStop({
                cantStop: hasNotReadyDB
              }));
              canStop.tpl.find('.modal-confirm').remove();
            } else {
              hasDBInstance = hasDBInstance != null ? hasDBInstance.length : void 0;
              canStop.tpl.find('.modal-body').css('padding', "0").html(AppTpl.stopAppConfirm({
                isProduction: isProduction,
                appName: appName,
                hasEC2Instance: hasEC2Instance,
                hasDBInstance: hasDBInstance,
                hasAsg: hasAsg,
                totalFee: totalFee,
                savingFee: savingFee,
                hasInstanceStore: hasInstanceStore
              }));
            }
            canStop.resize();
            canStop.on("confirm", function() {
              canStop.close();
              app.stop().fail(function(err) {
                var error;
                error = err.awsError ? err.error + "." + err.awsError : err.error;
                notification("Fail to stop your app \"" + name + "\". (ErrorCode: " + error + ")");
              });
            });
            $("#appNameConfirmIpt").on("keyup change", function() {
              if ($("#appNameConfirmIpt").val() === name) {
                canStop.tpl.find('.modal-confirm').removeAttr("disabled");
              } else {
                canStop.tpl.find('.modal-confirm').attr("disabled", "disabled");
              }
            });
          });
        });
      },
      terminateApp: function(id) {
        var app, name, production, resourceList, terminateConfirm;
        app = App.model.appList().get(id);
        name = app.get("name");
        production = app.get("usage") === 'production';
        terminateConfirm = new modalPlus({
          title: production ? lang.ide.TOOL_POP_TIT_TERMINATE_PRD_APP : lang.ide.TOOL_POP_TIT_TERMINATE_APP,
          template: AppTpl.loading(),
          confirm: {
            text: lang.ide.TOOL_POP_BTN_TERMINATE_APP,
            color: "red",
            disabled: production
          },
          disableClose: true
        });
        terminateConfirm.tpl.find('.modal-footer').hide();
        resourceList = CloudResources(constant.RESTYPE.DBINSTANCE, app.get("region"));
        return resourceList.fetchForce().then(function() {
          return app.fetchJsonData().then(function() {
            var comp, dbInstanceName, hasDBInstance, notReadyDB;
            comp = app.getJsonData().component;
            hasDBInstance = _.filter(comp, function(e) {
              return e.type === constant.RESTYPE.DBINSTANCE;
            });
            dbInstanceName = _.map(hasDBInstance, function(e) {
              return e.resource.DBInstanceIdentifier;
            });
            notReadyDB = resourceList.filter(function(e) {
              var _ref;
              return (_ref = e.get('DBInstanceIdentifier'), __indexOf.call(dbInstanceName, _ref) >= 0) && e.get('DBInstanceStatus') !== 'available';
            });
            terminateConfirm.tpl.find('.modal-body').html(AppTpl.terminateAppConfirm({
              production: production,
              name: name,
              hasDBInstance: hasDBInstance,
              notReadyDB: notReadyDB
            }));
            terminateConfirm.tpl.find('.modal-footer').show();
            terminateConfirm.resize();
            if (notReadyDB != null ? notReadyDB.length : void 0) {
              terminateConfirm.tpl.find("#take-rds-snapshot").attr("checked", false).change(function() {
                return terminateConfirm.tpl.find(".modal-confirm").attr('disabled', $(this).is(":checked"));
              });
            }
            $("#appNameConfirmIpt").on("keyup change", function() {
              if ($("#appNameConfirmIpt").val() === name) {
                terminateConfirm.tpl.find('.modal-confirm').removeAttr("disabled");
              } else {
                terminateConfirm.tpl.find('.modal-confirm').attr("disabled", "disabled");
              }
            });
            terminateConfirm.on("confirm", function() {
              var takeSnapshot;
              terminateConfirm.close();
              takeSnapshot = terminateConfirm.tpl.find("#take-rds-snapshot").is(':checked');
              app.terminate(null, takeSnapshot).fail(function(err) {
                var error;
                error = err.awsError ? err.error + "." + err.awsError : err.error;
                return notification("Fail to terminate your app \"" + name + "\". (ErrorCode: " + error + ")");
              });
            });
          });
        });
      }
    });
    return new AppAction();
  });

}).call(this);

define('component/common/toolbarModalTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-toolbar "
    + escapeExpression(((stack1 = (depth0 && depth0.classList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <div class=\"content-wrap\">\n\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <button class=\"icon-new-stack btn btn-blue t-m-btn\" data-btn=\"create\">"
    + escapeExpression(((stack1 = (depth0 && depth0.btnValueCreate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <button class=\"icon-"
    + escapeExpression(((stack1 = (depth0 && depth0.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " t-m-btn\" data-btn=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n        ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "disabled";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <th class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sortable), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-row-type=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rowType), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                    ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "sortable";
  }

function program9(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.rowType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program11(depth0,data) {
  
  
  return "string";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "width:"
    + escapeExpression(((stack1 = (depth0 && depth0.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style=\"height: "
    + escapeExpression(((stack1 = (depth0 && depth0.height)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px\" ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <th style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><div class=\"th-inner\"></div></th>\n                            ";
  return buffer;
  }

  buffer += "<div class=\"toolbar\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.btnValueCreate), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"btn-group\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.buttons), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>\n<div class=\"list\">\n    <div class=\"slidebox\" style=\""
    + escapeExpression(((stack1 = (depth0 && depth0.slideStyle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <div class=\"content clearfix\">\n        </div>\n        <div class=\"error\">\n            something wrong\n        </div>\n    </div>\n    <div class=\"table-head-fix will-be-covered\">\n        <table class=\"table-head\">\n            <thead>\n                <tr>\n                    <th>\n                        <div class=\"checkbox\">\n                            <input id=\"t-m-select-all\" type=\"checkbox\" value=\"None\">\n                            <label for=\"t-m-select-all\"></label>\n                        </div>\n                    </th>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </tr>\n            </thead>\n        </table>\n        <div class=\"scroll-wrap\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.height), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n            <div class=\"scroll-content\" style=\"display:block;\">\n                <table class=\"table\">\n                    <thead>\n                        <tr>\n                            <th><div class=\"th-inner\"></div></th>\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </tr>\n                    </thead>\n                    <tbody class='t-m-content'>\n\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.content=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"kp-no-credential tac\">\n    <p>You are using a demo AWS account.</p>\n    <a class=\"show-credential\">Provide AWS Credential <br/>to manage key pairs</a>\n</div>";
  };
TEMPLATE.nocredential=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr class=\"table tr-detail\">\n    <td colspan=\""
    + escapeExpression(((stack1 = (depth0 && depth0.columnCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    </td>\n</tr>";
  return buffer;
  };
TEMPLATE.tr_detail=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"no-credential tac\">\n    <p>You are using a demo AWS account.</p>\n    <a class=\"show-credential\">Provide AWS Credential <br/>to manage key pairs</a>\n</div>";
  };
TEMPLATE.nocredential=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });

/* Example:
Refer to kpView.coffee
 */

(function() {
  define('toolbar_modal',['component/common/toolbarModalTpl', 'backbone', 'jquery', 'UI.modalplus', 'UI.notification'], function(template, Backbone, $, modalplus) {
    return Backbone.View.extend({
      tagName: 'section',
      __slide: null,
      __modalplus: null,
      events: {
        'change #t-m-select-all': '__checkAll',
        'change .one-cb': '__checkOne',
        'click .t-m-btn': '__handleSlide',
        'click tr .show-detail': '__handleDetail',
        'click .cancel': 'cancel',
        'click .do-action': '__doAction',
        'click [data-btn=refresh]': '__refresh',
        'click .table-head .sortable': '__sort',
        'click .show-credential': '__showCredential'
      },
      initialize: function(options) {
        this.options = options || {};
        if (!this.options.title) {
          this.options.title = 'Default Title';
        }
        if (options.context) {
          this.options.context.modal = this;
          this.options.context.M$ = _.bind(this.$, this);
        }
        return null;
      },
      __showCredential: function() {
        return App.showSettings(App.showSettings.TAB.Credential);
      },
      __sort: function() {
        return this.$('.tr-detail').remove();
      },
      __doAction: function(event) {
        var action;
        this.error();
        action = $(event.currentTarget).data('action');
        return this.trigger('action', action, this.getChecked());
      },
      getChecked: function() {
        var allChecked, checkedInfo;
        allChecked = this.$('.one-cb:checked');
        checkedInfo = [];
        allChecked.each(function() {
          return checkedInfo.push({
            id: this.id,
            value: this.value,
            data: $(this).data()
          });
        });
        return checkedInfo;
      },
      __slideRejct: function() {
        return _.isFunction(this.options.slideable) && !this.options.slideable();
      },
      __handleSlide: function(event) {
        var $activeButton, $button, $slidebox, activeButton, button;
        $button = $(event.currentTarget);
        $slidebox = this.$('.slidebox');
        button = $button.data('btn');
        if (button === 'refresh') {
          return this;
        }
        if (this.__slideRejct()) {
          return this;
        }
        $activeButton = this.$('.toolbar .active');
        activeButton = $activeButton && $activeButton.data('btn');
        if ($activeButton.length) {
          if ($activeButton.get(0) === $button.get(0)) {
            this.trigger('slideup', button);
            $button.removeClass('active');
            $slidebox.removeClass('show');
            this.__slide = null;
          } else {
            this.trigger('slidedown', button, this.getChecked());
            $activeButton.removeClass('active');
            $button.addClass('active');
            $slidebox.addClass('show');
            this.__slide = button;
          }
        } else {
          this.trigger('slidedown', button, this.getChecked());
          $button.addClass('active');
          $slidebox.addClass('show');
          this.__slide = button;
        }
        return null;
      },
      __handleDetail: function(event) {
        var $target, $tr;
        $target = $(event.currentTarget);
        $tr = $target.closest('tr');
        if ($tr.hasClass('detailed')) {
          $tr.removeClass('detailed');
          return $tr.next('.tr-detail').remove();
        } else {
          $tr.addClass('detailed').after(template.tr_detail({
            columnCount: this.options.columns.length + 1
          }));
          return this.trigger('detail', event, $tr.data(), $tr);
        }
      },
      __refresh: function() {
        if (this.__slideRejct()) {
          return this;
        }
        this.__renderLoading();
        return this.trigger('refresh');
      },
      __close: function(event) {
        this.trigger('close');
        this.remove();
        return false;
      },
      __checkOne: function(event) {
        var $target, cbAll, cbAmount, checkedAmount;
        $target = $(event.currentTarget);
        this.__processDelBtn();
        cbAll = this.$('#t-m-select-all');
        cbAmount = this.$('.one-cb').length;
        checkedAmount = this.$('.one-cb:checked').length;
        $target.closest('tr').toggleClass('selected');
        if (checkedAmount === cbAmount) {
          cbAll.prop('checked', true);
        } else if (cbAmount - checkedAmount === 1) {
          cbAll.prop('checked', false);
        }
        return this.__triggerChecked(event);
      },
      __checkAll: function(event) {
        this.__processDelBtn();
        if (event.currentTarget.checked) {
          this.$('input[type="checkbox"]:not(:disabled)').prop('checked', true).parents('tr.item').addClass('selected');
        } else {
          this.$('input[type="checkbox"]').prop('checked', false);
          this.$('tr.item').removeClass('selected');
        }
        return this.__triggerChecked(event);
      },
      __triggerChecked: function(param) {
        return this.trigger('checked', param, this.getChecked());
      },
      __processDelBtn: function(enable) {
        var that;
        if (arguments.length === 1) {
          return this.$('[data-btn=delete]').prop('disabled', !enable);
        } else {
          that = this;
          return _.defer(function() {
            if (that.$('.one-cb:checked').length) {
              return that.$('[data-btn=delete]').prop('disabled', false);
            } else {
              return that.$('[data-btn=delete]').prop('disabled', true);
            }
          });
        }
      },
      __stopPropagation: function(event) {
        var exception;
        exception = '.sortable, #download-kp, .selection, .item';
        if (!$(event.target).is(exception)) {
          return event.stopPropagation();
        }
      },
      __open: function() {
        var options;
        options = {
          template: this.el,
          title: this.options.title,
          disableFooter: true,
          disableClose: true,
          width: '855px',
          height: '473px',
          compact: true,
          hasScroll: true,
          mode: "panel"
        };
        this.__modalplus = new modalplus(options);
        this.__modalplus.on('closed', this.__close, this);
        this.__modalplus.on("resize", this.__resizeModal.bind(this));
        return this;
      },
      __getHeightOfContent: function() {
        var $modal, footerHeight, headerHeight, windowHeight;
        windowHeight = $(window).height();
        $modal = this.__modalplus.tpl;
        headerHeight = $modal.find(".modal-header").outerHeight();
        footerHeight = $modal.find('.modal-footer').height() || 0;
        return windowHeight - headerHeight - footerHeight - 75;
      },
      __resizeModal: function() {
        var scroll, that;
        that = this;
        this.__modalplus.tpl.find(".scrollbar-veritical-thumb").removeAttr("style");
        scroll = this.__modalplus.tpl.find(".table-head-fix.will-be-covered .scroll-wrap");
        if (scroll.size()) {
          return scroll.height(that.__getHeightOfContent());
        }
      },
      __renderLoading: function() {
        this.$('.content-wrap').html(template.loading);
        return this;
      },
      __renderContent: function() {
        var $contentWrap, data, that;
        that = this;
        $contentWrap = this.$('.content-wrap');
        if (!$contentWrap.find('.toolbar').size()) {
          data = this.options;
          data.buttons = _.reject(data.buttons, function(btn) {
            if (btn.type === 'create') {
              data.btnValueCreate = btn.name;
              return true;
            }
          });
          data.height = that.__getHeightOfContent();
          this.$('.content-wrap').html(template.content(data));
          return this;
        }
      },
      render: function(refresh) {
        var tpl;
        this.$el.html(template.frame(this.options));
        if (_.isString(refresh)) {
          tpl = refresh;
          this.$('.content-wrap').html(template[tpl] && template[tpl]() || tpl);
        } else {
          this.__renderLoading();
        }
        if (!refresh) {
          this.__open();
        }
        return this;
      },
      setContent: function(dom) {
        this.tempDom = dom;
        this.__renderContent();
        this.$('.t-m-content').html(dom);
        this.__triggerChecked(null);
        this.trigger("rendered", this);
        return this;
      },
      setSlide: function(dom) {
        this.$('.slidebox .content').html(dom);
        this.error();
        return this;
      },
      setDetail: function($tr, dom) {
        var $trDetail;
        $trDetail = $tr.next('.tr-detail');
        $trDetail.find('td').html(dom);
        return $trDetail;
      },
      triggerSlide: function(which) {
        return this.$("[data-btn=" + which + "]").click();
      },
      cancel: function() {
        var $activeButton, $slidebox;
        if (this.__slideRejct()) {
          return this;
        }
        $slidebox = this.$('.slidebox');
        $activeButton = this.$('.toolbar .active');
        this.trigger('slideup', $activeButton.data('btn'));
        $activeButton.removeClass('active');
        $slidebox.removeClass('show');
        return this;
      },
      unCheckSelectAll: function() {
        this.$('#t-m-select-all').get(0).checked = false;
        return this.__processDelBtn(false);
      },
      delegate: function(events, context) {
        var eventName, key, match, method, selector, _i, _len;
        if (!events || !_.isObject(events)) {
          return this;
        }
        for (method = _i = 0, _len = events.length; _i < _len; method = ++_i) {
          key = events[method];
          if (!method) {
            continue;
          }
          match = key.match(/^(\S+)\s*(.*)$/);
          eventName = match[1];
          selector = match[2];
          method = _.bind(method, context || this);
          eventName += '.delegateEvents' + this.cid;
          if (selector === '') {
            this.$el.on(eventName, method);
          } else {
            this.$el.on(eventName, selector, method);
          }
        }
        return this;
      },
      error: function(msg) {
        var $error;
        $error = this.$('.error');
        if (msg) {
          return $error.text(msg).show();
        } else {
          return $error.hide();
        }
      },
      getSlide: function() {
        return this.__slide;
      }
    });
  });

}).call(this);

define('component/optiongroup/ogTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression;


  return escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  };
TEMPLATE.dropdown_selection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        <div class=\"option-preview\">"
    + escapeExpression(((stack1 = (depth0 && depth0.preview)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

function program4(depth0,data) {
  
  
  return "<div class=\"icon-edit\"></div>";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.dropdown_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"combo-dd-no-data\">\n    <p>No Option Group.</p>\n    <a class=\"create-one\">Create Option Group</a>\n</div>";
  };
TEMPLATE.no_option_group=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"port-sg\">\n        <div>\n            <label for=\"og-port\">Port</label>\n            <input type=\"text\" id=\"og-port\" class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required=\"true\" data-type=\"number\" autocomplete=\"off\"/>\n        </div>\n        <ul class=\"acl-sg-info-list property-list\" id=\"og-sg\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sgs), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n\n    </div>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li class=\"clearfix\">\n                <div class=\"checkbox-wrap col1\">\n                    <div class=\"checkbox\">\n                        <input type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.used), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"og-sg-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " />\n                        <label for=\"og-sg-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n                    </div>\n                </div>\n\n                <div class=\"col2\">\n                    <div class=\"col2-1 truncate\"><div class=\"sg-color\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ></div><span class=\"sg-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n                    <div class=\"col2-2 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                    <div class=\"col2-3 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ruleCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGLIST_LBL_RULE", {hash:{},data:data}))
    + ", "
    + escapeExpression(((stack1 = (depth0 && depth0.memberCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGLIST_LBL_MEMBER", {hash:{},data:data}))
    + "</div>\n                </div>\n            </li>\n            ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program5(depth0,data) {
  
  
  return "checked";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <table class=\"table\">\n        <tr>\n            <th>Option Setting</th>\n            <th>Value</th>\n            <th>Allowed Values</th>\n        </tr>\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.OptionGroupOptionSettings), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n    ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.SettingName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td class=\"value\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.program(13, program13, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.AllowedValues)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <select name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.SettingName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"option-setting\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </select>\n                ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n                    ";
  return buffer;
  }
function program11(depth0,data) {
  
  
  return "selected";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <input name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.SettingName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required=\"true\" data-type=\"number\" class=\"option-setting\" type=\"text\" class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-start=\""
    + escapeExpression(((stack1 = (depth0 && depth0.start)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-end=\""
    + escapeExpression(((stack1 = (depth0 && depth0.end)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                ";
  return buffer;
  }

  buffer += "<form class=\"content clearfix\" data-bind=\"true\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.DefaultPort), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.OptionGroupOptionSettings), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"action\">\n        <a class=\"btn btn-blue do-action add-option\" data-option-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Save Option</a>\n        <a class=\"btn btn-silver cancel\">Cancel</a>\n    </div>\n</form>";
  return buffer;
  };
TEMPLATE.og_slide=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">Confirm to delete this option group?</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red remove-confirm\">Delete</button>\n        <button class=\"btn btn-silver remove-cancel\">Cancel</button>\n    </div>\n</div>";
  };
TEMPLATE.og_slide_remove=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "\n            <a class=\"tooltip icon-info\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.MySQL.Options.html\" data-tooltip=\"Read AWS documentation…\" target=\"_blank\"></a>\n            ";
  }

function program3(depth0,data) {
  
  
  return "\n            <a class=\"tooltip icon-info\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.Oracle.Options.html\" data-tooltip=\"Read AWS documentation…\" target=\"_blank\"></a>\n            ";
  }

function program5(depth0,data) {
  
  
  return "\n            <a class=\"tooltip icon-info\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.SQLServer.Options.html\" data-tooltip=\"Read AWS documentation…\" target=\"_blank\"></a>\n            ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"og-apply-immediately\">\n                <div class=\"checkbox tooltip\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppPortChanged), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                    <input type=\"checkbox\" id=\"option-apply-immediately\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.applyImmediately), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppPortChanged), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                    <label for=\"option-apply-immediately\"></label>\n                </div>\n                <label for=\"option-apply-immediately\">Apply Immediately</label>\n            </div>\n            ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip="
    + escapeExpression(helpers.i18n.call(depth0, "RDS_PORT_CHANGE_REQUIRES_APPLIED_IMMEDIATELY", {hash:{},data:data}));
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "checked";
  }

function program13(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppPortChanged), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program15(depth0,data) {
  
  
  return "disabled";
  }

function program17(depth0,data) {
  
  
  return "<button class=\"remove-btn btn btn-red\">Delete</button>";
  }

  buffer += "<div id=\"modal-option-group\">\n    <div class=\"slidebox\">\n        <div class=\"form\"></div>\n        <div class=\"error\">\n        </div>\n    </div>\n    <div class=\"will-be-covered\">\n        <div class=\"header\">\n            This Option Group is used for "
    + escapeExpression(((stack1 = (depth0 && depth0.engineName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.engineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.engineType), "mysql", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.engineType), "oracle", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.engineType), "sqlserver", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"container\">\n            <div class=\"input-item\">\n                <label class=\"left\">Name</label>\n                <input class=\"input og-name\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n            </div>\n            <div class=\"input-item\">\n                <label class=\"left\">Description</label>\n                <input class=\"input og-description\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n            </div>\n            <div class=\"left option-list-head\">Option</div>\n            <ul class=\"option-list\"></ul>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"modal-footer\">\n            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isCreate), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <span class=\"err-tip\"></span>\n            <button class=\"save-btn btn btn-blue\">Save</button>\n            <button class=\"btn btn-silver modal-close cancel-btn\">Cancel</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.og_modal=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"option-item\" data-idx=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Persistent), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Permenant), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.unmodify), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "<div class=\"persistent\">PERSISTENT</div>";
  }

function program4(depth0,data) {
  
  
  return "<div class=\"permenant\">PERMENANT</div>";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"option-edit-btn icon-btn-details";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></div>\n    <label class=\"switcher";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        <span class=\"switch-label\" data-on=\"ON\" data-off=\"OFF\"></span>\n        <span class=\"switch-handle\"></span>\n    </label>\n    ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return " invisible";
  }

function program9(depth0,data) {
  
  
  return " on";
  }

function program11(depth0,data) {
  
  
  return " disabled";
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.ogOptions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.og_option_item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"option-item\" data-idx=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.OptionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <div class=\"og-title clearfix\">\n            <div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Persistent), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Permenant), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <a class=\"toggle-og-detail show-og-detail\">Show details</a>\n            <a class=\"toggle-og-detail hide-og-detail\" style=\"display:none;\">Hide details</a>\n        </div>\n        <div class=\"og-details\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Port), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.VpcSecurityGroupMemberships), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <table class=\"table\">\n                <tr><th>Setting</th><th>Value</th></tr>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.OptionSettings), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </table>\n        </div>\n    </li>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "<div class=\"persistent\">PERSISTENT</div>";
  }

function program4(depth0,data) {
  
  
  return "<div class=\"permenant\">PERMENANT</div>";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div>\n                <span>Port:</span>\n                <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.Port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </div>\n            ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div>\n                <span>Security Group:</span>\n                <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.VpcSecurityGroupId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </div>\n            ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr><td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td></tr>\n                ";
  return buffer;
  }

  buffer += "<div class=\"summary clearfix\">\n    <dl>\n        <dt>Option Group Name</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Engine</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.EngineName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Option Group Description</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionGroupDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Engine Version</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.MajorEngineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n</div>\n<div class=\"left option-list-head\">Option("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Options)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n<ul class=\"option-list\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.Options), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  };
TEMPLATE.og_app_modal=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('og_manage',['constant', 'CloudResources', 'toolbar_modal', './component/optiongroup/ogTpl', 'i18n!/nls/lang.js', 'event', 'UI.modalplus'], function(constant, CloudResources, toolbar_modal, template, lang, ide_event, modalplus) {
    var capitalizeKey, valueInRange;
    valueInRange = function(start, end) {
      return function(val) {
        val = +val;
        if (val > end || val < start) {
          return sprintf(lang.ide.RDS_VALUE_IS_NOT_ALLOWED, val);
        }
        return null;
      };
    };
    capitalizeKey = function(arr) {
      var a, k, newK, obj, returnArr, v, _i, _len;
      returnArr = [];
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        a = arr[_i];
        obj = {};
        for (k in a) {
          v = a[k];
          newK = k.charAt(0).toUpperCase() + k.substring(1);
          obj[newK] = v;
        }
        returnArr.push(obj);
      }
      return returnArr;
    };
    return Backbone.View.extend({
      id: 'modal-option-group',
      tagName: 'section',
      className: 'modal-toolbar',
      events: {
        'click .option-item .switcher': 'optionChanged',
        'click .option-item .option-edit-btn': 'optionEditClicked',
        'click .cancel': 'cancel',
        'click .add-option': 'addOption',
        'click .save-btn': 'saveClicked',
        'click .remove-btn': 'removeClicked',
        'click .cancel-btn': 'cancelClicked',
        'submit form': 'doNothing',
        'click #og-sg input': 'changeSg',
        'click .remove-confirm': 'removeConfirm',
        'click .remove-cancel': 'removeCancel',
        'change #option-apply-immediately': 'changeApplyImmediately'
      },
      changeApplyImmediately: function(e) {
        return this.model.set('applyImmediately', e.currentTarget.checked);
      },
      changeSg: function(e) {
        var checked, sgCbs;
        checked = e.currentTarget.checked;
        sgCbs = $('#og-sg input:checked');
        if (!sgCbs.length) {
          return false;
        }
        return null;
      },
      doNothing: function() {
        return false;
      },
      getModalOptions: function() {
        return {
          title: lang.ide.RDS_EDIT_OPTION_GROUP,
          classList: 'option-group-manage',
          context: that
        };
      },
      isAppPortChanged: function() {
        var appData, appId, appOptions, that, _ref;
        if (!this.isAppEdit) {
          return false;
        }
        appId = this.ogModel.get('appId');
        appData = (_ref = CloudResources(constant.RESTYPE.DBOG, Design.instance().region()).get(appId)) != null ? _ref.toJSON() : void 0;
        if (!appData) {
          return false;
        }
        appOptions = {};
        that = this;
        _.each(appData.Options, function(option) {
          return appOptions[option.OptionName] = option;
        });
        return _.some(appOptions, function(option, name) {
          return +that.ogDataStore[name].Port !== +option.Port;
        });
      },
      initModal: function(tpl) {
        var options, that;
        that = this;
        options = {
          template: tpl,
          title: lang.ide.RDS_EDIT_OPTION_GROUP,
          disableFooter: true,
          disableClose: true,
          width: '855px',
          height: '473px',
          compact: true,
          mode: "panel"
        };
        this.__modalplus = new modalplus(options);
        this.__modalplus.on('closed', this.close, this);
        this.dropdown.refresh();
        return null;
      },
      initialize: function(option) {
        var engineOptions, optionAry, optionCol, that;
        that = this;
        this.isAppEdit = Design.instance().modeIsAppEdit();
        this.dropdown = option.dropdown;
        this.isCreate = option.isCreate;
        this.dbInstance = option.dbInstance;
        optionCol = CloudResources(constant.RESTYPE.DBENGINE, Design.instance().region());
        engineOptions = optionCol.getOptionGroupsByEngine(Design.instance().region(), option.engine);
        if (engineOptions) {
          this.ogOptions = engineOptions[option.version];
        }
        this.ogModel = option.model;
        this.ogNameOptionMap = {};
        this.ogDataStore = {};
        optionAry = this.ogModel.get('options');
        _.each(optionAry, function(option) {
          that.ogDataStore[option.OptionName] = option;
          return null;
        });
        _.each(this.ogOptions, function(option) {
          that.ogNameOptionMap[option.Name] = option;
          if (that.ogDataStore[option.Name]) {
            option.checked = true;
          } else {
            option.checked = false;
          }
          if (that.isAppEdit && (option.Permanent || option.Persistent) && that.ogModel.get('appId')) {
            option.unmodify = true;
          } else {
            option.unmodify = false;
          }
          return null;
        });
        return null;
      },
      render: function() {
        var ogData;
        ogData = this.ogModel.toJSON();
        ogData.isCreate = this.isCreate;
        ogData.isAppEdit = this.isAppEdit;
        ogData.engineType = this.ogModel.engineType();
        ogData.isAppPortChanged = this.isAppPortChanged();
        this.$el.html(template.og_modal(ogData));
        this.initModal(this.el);
        this.renderOptionList();
        this.__modalplus.resize();
        return this;
      },
      renderOptionList: function() {
        return this.$el.find('.option-list').html(template.og_option_item({
          ogOptions: this.ogOptions,
          isAppEdit: this.isAppEdit
        }));
      },
      slide: function(option, callback) {
        var data;
        if (!option.DefaultPort && !option.OptionGroupOptionSettings) {
          callback({
            Port: '',
            VpcSecurityGroupMemberships: [],
            OptionSettings: []
          });
          return;
        }
        this.optionCb = callback;
        data = this.ogDataStore[option.Name];
        this.renderSlide(option, data);
        return this.$('.slidebox').addClass('show');
      },
      slideUp: function() {
        return this.$('.slidebox').removeClass('show').removeAttr("style");
      },
      cancel: function() {
        this.slideUp();
        if (typeof this.optionCb === "function") {
          this.optionCb(null);
        }
        return null;
      },
      removeConfirm: function() {
        this.ogModel.remove();
        this.dropdown.setSelection(this.dbInstance.getOptionGroupName());
        this.dropdown.refresh();
        this.slideUp();
        return this.__modalplus.close();
      },
      removeCancel: function() {
        return this.slideUp();
      },
      addOption: function(e) {
        var data, form, optionName, port, sgCbs;
        optionName = $(e.currentTarget).data('optionName');
        form = $('form');
        if (!form.parsley('validate')) {
          this.$('.error').html(lang.ide.RDS_SOME_ERROR_OCCURED);
          return;
        }
        data = {
          OptionSettings: capitalizeKey(form.serializeArray())
        };
        port = $('#og-port').val();
        sgCbs = $('#og-sg input:checked');
        data.Port = port || '';
        data.VpcSecurityGroupMemberships = [];
        sgCbs.each(function() {
          return data.VpcSecurityGroupMemberships.push(Design.instance().component($(this).data('uid')).createRef('GroupId'));
        });
        if (typeof this.optionCb === "function") {
          this.optionCb(data);
        }
        this.ogDataStore[optionName] = data;
        this.slideUp();
        return null;
      },
      renderSlide: function(option, data) {
        var arr, end, i, s, start, that, _i, _len, _ref;
        option = jQuery.extend(true, {}, option);
        if (option.OptionGroupOptionSettings && !_.isArray(option.OptionGroupOptionSettings)) {
          option.OptionGroupOptionSettings = [option.OptionGroupOptionSettings];
        }
        if (option.DefaultPort) {
          option.port = (data != null ? data.Port : void 0) || option.DefaultPort;
          option.sgs = [];
          Design.modelClassForType(constant.RESTYPE.SG).each(function(obj) {
            var json, _ref;
            json = obj.toJSON();
            json["default"] = obj.isDefault();
            json.color = obj.color;
            json.ruleCount = obj.ruleCount();
            json.memberCount = obj.getMemberList().length;
            if (data && data.VpcSecurityGroupMemberships) {
              if (_ref = obj.createRef('GroupId'), __indexOf.call(data.VpcSecurityGroupMemberships, _ref) >= 0) {
                json.checked = true;
              }
            }
            if (json["default"]) {
              if (!data) {
                json.checked = true;
              }
              return option.sgs.unshift(json);
            } else {
              return option.sgs.push(json);
            }
          });
        }
        _ref = option.OptionGroupOptionSettings || [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          s = _ref[i];
          if (s.AllowedValues.indexOf(',') >= 0) {
            s.items = _.map(s.AllowedValues.split(','), function(v) {
              return {
                value: v,
                selected: data && v === data.OptionSettings[i].Value
              };
            });
          } else if (s.AllowedValues.indexOf('-') >= 0) {
            arr = s.AllowedValues.split('-');
            start = +arr[0];
            end = +arr[1];
            s.start = start;
            s.end = end;

            /*
            if end - start < 10
                s.items = _.range start, end + 1
             */
          }
          if (s.items) {
            s.AllowedValues = '';
          }
          if (data) {
            s.value = data.OptionSettings[i].Value;
          } else {
            s.value = s.DefaultValue;
          }
        }
        this.$('.form').html(template.og_slide(option || {}));
        this.$('.error').html('');
        console.log("Initing...");
        that = this;
        window.setTimeout(function() {
          return that.__modalplus.$(".slidebox.show").css('max-height', that.__getHeightOfContent());
        }, 0);
        $(window).on('resize', function() {
          return that.__modalplus.$(".slidebox.show").css('max-height', that.__getHeightOfContent());
        });
        $('form input').each(function() {
          var $this;
          $this = $(this);
          start = +$this.data('start');
          end = +$this.data('end');
          if (isFinite(start) && isFinite(end)) {
            return $this.parsley('custom', valueInRange(start, end));
          }
        });
        return null;
      },
      __getHeightOfContent: function() {
        var $modal, headerHeight, windowHeight;
        windowHeight = $(window).height();
        $modal = this.__modalplus.tpl;
        headerHeight = $modal.find(".modal-header").outerHeight();
        return windowHeight - headerHeight;
      },
      renderRemoveConfirm: function() {
        this.$('.slidebox').addClass('show');
        return this.$('.slidebox .form').html(template.og_slide_remove({}));
      },
      processCol: function() {
        return this.renderList({});
      },
      renderList: function(data) {
        return this.modal.setContent(template.modal_list(data));
      },
      renderNoCredential: function() {
        return this.modal.render('nocredential').toggleControls(false);
      },
      renderSlides: function(which, checked) {
        var slides, tpl, _ref;
        tpl = template["slide_" + which];
        slides = this.getSlides();
        return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
      },
      close: function() {
        this.optionCb = null;
        return this.remove();
      },
      handleApplyImmediately: function() {
        if (this.isAppPortChanged()) {
          return this.$('#option-apply-immediately').prop('disabled', true).prop('checked', true).parent().data('tooltip', lang.ide.RDS_PORT_CHANGE_REQUIRES_APPLIED_IMMEDIATELY);
        } else {
          return this.$('#option-apply-immediately').prop('disabled', false).parent().removeAttr('data-tooltip');
        }
      },
      optionChanged: function(event) {
        var $optionEdit, $optionItem, $switcher, optionIdx, optionName, that;
        that = this;
        $switcher = $(event.currentTarget);
        $optionEdit = $switcher.siblings('.option-edit-btn');
        $switcher.toggleClass('on');
        $optionItem = $switcher.parents('.option-item');
        optionIdx = Number($optionItem.data('idx'));
        optionName = $optionItem.data('name');
        if ($switcher.hasClass('on')) {
          $optionEdit.removeClass('invisible');
          this.slide(this.ogOptions[optionIdx], function(optionData) {
            if (optionData) {
              return that.ogDataStore[optionName] = optionData;
            } else {
              return that.setOption($optionItem, false);
            }
          });
          this.handleApplyImmediately();
        } else {
          $optionEdit.addClass('invisible');
        }
        return null;
      },
      optionEditClicked: function(event) {
        var $optionEdit, $optionItem, optionIdx, optionName, that;
        that = this;
        $optionEdit = $(event.currentTarget);
        $optionItem = $optionEdit.parents('.option-item');
        optionIdx = Number($optionItem.data('idx'));
        optionName = $optionItem.data('name');
        return this.slide(this.ogOptions[optionIdx], function(optionData) {
          if (optionData) {
            that.ogDataStore[optionName] = optionData;
          }
          return that.handleApplyImmediately();
        });
      },
      setOption: function($item, value) {
        var $optionEdit, $switcher;
        $switcher = $item.find('.switcher');
        $optionEdit = $switcher.siblings('.option-edit-btn');
        if (value) {
          $switcher.addClass('on');
          return $optionEdit.removeClass('invisible');
        } else {
          $switcher.removeClass('on');
          return $optionEdit.addClass('invisible');
        }
      },
      getOption: function($item) {
        var $switcher;
        $switcher = $item.find('.switcher');
        return $switcher.hasClass('on');
      },
      getOptionByName: function(ogName) {
        var $switcher;
        $switcher = this.$('.option-list .option-item[data-name="' + ogName + '"]').find('.switcher');
        return $switcher.hasClass('on');
      },
      saveClicked: function() {
        var $ogDesc, $ogItemList, $ogName, isRightDepend, ogDataAry, ogDesc, ogName, ogNameCheck, that;
        that = this;
        $ogName = this.$('.og-name');
        $ogDesc = this.$('.og-description');
        $ogName.parsley('custom', function(val) {
          var errTip;
          errTip = 'Option group name invalid';
          if (val[val.length - 1] === '-' || (val.indexOf('--') !== -1)) {
            return errTip;
          }
          if (val.length < 1 || val.length > 255) {
            return errTip;
          }
          if (!MC.validate('letters', val[0])) {
            return errTip;
          }
        });
        ogNameCheck = MC.aws.aws.checkResName(this.ogModel.get('id'), $ogName, "OptionGroup");
        $ogDesc.parsley('custom', function(val) {
          var errTip;
          errTip = 'Option group description invalid';
          if (val.length < 1) {
            return errTip;
          }
        });
        isRightDepend = true;
        $ogItemList = that.$('.option-list .option-item');
        _.each($ogItemList, function(ogItem) {
          var $ogItem, dependAry, dependName, errTip, needAry, ogDefine, ogName, option;
          $ogItem = $(ogItem);
          option = that.getOption($ogItem);
          if (option) {
            ogName = $ogItem.data('name');
            ogDefine = that.ogNameOptionMap[ogName];
            if (ogDefine.OptionsDependedOn && ogDefine.OptionsDependedOn.OptionName) {
              dependName = ogDefine.OptionsDependedOn.OptionName;
              dependAry = dependName.split(',');
              needAry = [];
              _.each(dependAry, function(depend) {
                var isOn;
                isOn = that.getOptionByName(depend);
                if (!isOn) {
                  return needAry.push(depend);
                }
              });
              if (needAry.length) {
                isRightDepend = false;
                errTip = "" + ogName + " depend on " + (needAry.join(',')) + " option.";
                that.$('.err-tip').text(errTip);
              }
            }
          }
          return null;
        });
        if (!isRightDepend) {
          return;
        }
        if ($ogName.parsley('validate') && $ogDesc.parsley('validate') && ogNameCheck) {
          ogName = $ogName.val();
          ogDesc = $ogDesc.val();
          this.ogModel.set('name', ogName);
          this.ogModel.set('description', ogDesc);
          ogDataAry = [];
          $ogItemList = this.$('.option-list .option-item');
          _.each($ogItemList, function(ogItem) {
            var $ogItem, ogData, option;
            $ogItem = $(ogItem);
            option = that.getOption($ogItem);
            if (option) {
              ogName = $ogItem.data('name');
              ogData = that.ogDataStore[ogName];
              ogData.OptionName = ogName;
              ogDataAry.push(ogData);
            }
            return null;
          });
          this.ogModel.set('options', ogDataAry);
          this.dropdown.refresh();
          this.__modalplus.close();
          return null;
        }
      },
      removeClicked: function() {
        var that;
        that = this;
        return this.renderRemoveConfirm();
      },
      cancelClicked: function() {
        var that;
        that = this;
        return this.__modalplus.close();
      }
    });
  });

}).call(this);

(function() {
  define('og_manage_app',['constant', 'CloudResources', './component/optiongroup/ogTpl', 'i18n!/nls/lang.js', 'event', 'UI.modalplus'], function(constant, CloudResources, template, lang, ide_event, modalplus) {
    return Backbone.View.extend({
      id: 'modal-option-group',
      tagName: 'section',
      className: 'modal-toolbar modal-option-group-app',
      events: {
        'click .toggle-og-detail': "toggleDetail"
      },
      toggleDetail: function(e) {
        var $li, $target;
        $target = $(e.currentTarget);
        $li = $target.closest('li');
        $li.toggleClass('show-details');
        return $li.find('.toggle-og-detail').toggle();
      },
      initModal: function(tpl) {
        var options;
        options = {
          template: tpl,
          title: this.model.get('appId'),
          width: '855px',
          height: '473px',
          compact: true,
          confirm: {
            hide: true
          },
          cancel: {
            text: 'Close'
          }
        };
        this.__modalplus = new modalplus(options);
        this.__modalplus.on('closed', this.close, this);
        return null;
      },
      initialize: function(options) {
        var appId, _ref;
        appId = this.model.get('appId');
        this.appData = (_ref = CloudResources(constant.RESTYPE.DBOG, Design.instance().region()).get(appId)) != null ? _ref.toJSON() : void 0;
        if (!this.appData) {
          return false;
        }
        return this.render();
      },
      render: function() {
        this.$el.html(template.og_app_modal(this.appData));
        this.initModal(this.el);
        return this;
      },
      close: function() {
        return this.remove();
      }
    });
  });

}).call(this);

define('component/common/comboDropdownTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <input class=\"input combo-dd-filter\" type=\"text\" placeholder=\""
    + escapeExpression(((stack1 = (depth0 && depth0.filterPlaceHolder)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"combo-dd-manage btn btn-primary\" style=\"display:none;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.manageBtnValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        ";
  return buffer;
  }

  buffer += "<div class=\"selectbox combo-dd multiopen "
    + escapeExpression(((stack1 = (depth0 && depth0.classList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-silent-close=\"#modal-wrap\">\n    <div class=\"selection\"></div>\n\n    <div class=\"dropdown\">\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noFilter), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <div class=\"scroll-wrap scrollbar-auto-hide clearfix\">\n            <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n            <div class=\"scroll-content combo-dd-content\">\n            </div>\n        </div>\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noManage), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"combo-dd-list\"></ul>";
  };
TEMPLATE.listframe=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner loading-spinner-small\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"no-credential tac\">\n    <p>You are using a demo AWS account.</p>\n    <a class=\"show-credential\">Provide AWS Credential <br/>to manage key pairs</a>\n</div>";
  };
TEMPLATE.nocredential=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });

/* Example:
Refer to kpView.coffee
 */

(function() {
  define('combo_dropdown',['component/common/comboDropdownTpl', 'backbone', 'jquery'], function(template, Backbone, $) {
    return Backbone.View.extend({
      tagName: 'section',
      events: {
        'click .combo-dd-manage': '__manage',
        'click .show-credential': '__showCredential',
        'OPTION_SHOW .selectbox': '__optionShow',
        'OPTION_CHANGE .selectbox': '__optionChange',
        'keyup .combo-dd-filter': '__filter',
        'keydown .combo-dd-filter': '__stopPropagation',
        'click .combo-dd-filter': '__returnFalse',
        'click .create-one': '__quickCreate'
      },
      __quickCreate: function() {
        return this.trigger('quick_create');
      },
      __stopPropagation: function(event) {
        return event.stopPropagation();
      },
      __returnFalse: function() {
        return false;
      },
      __showCredential: function() {
        return App.showSettings(App.showSettings.TAB.Credential);
      },
      __filter: function(event) {
        return this.trigger('filter', event.currentTarget.value);
      },
      __manage: function(event) {
        this.trigger('manage');
        return event.stopPropagation();
      },
      __optionShow: function() {
        if (!this.$('.combo-dd-content').html().trim()) {
          this.render('loading');
        }
        return this.trigger('open');
      },
      __optionChange: function(event, name, data) {
        return this.trigger('change', name, data);
      },
      initialize: function(options) {
        this.$el.html(template.frame(options));
        return this;
      },
      render: function(tpl) {
        this.$('.combo-dd-content').html(template[tpl] && template[tpl]() || tpl);
        return this;
      },
      setSelection: function(dom) {
        this.$('.selection').html(dom);
        return this;
      },
      getSelection: function(dom) {
        return $.trim(this.$('.selection').text());
      },
      setContent: function(dom) {
        this.$('.combo-dd-content').html(template.listframe);
        this.$('.combo-dd-list').html(dom);
        return this;
      },
      toggleControls: function(showOrHide, whichOne) {
        if (whichOne) {
          this.$(".combo-dd-" + whichOne).toggle(showOrHide);
        } else {
          this.$('.combo-dd-filter, .combo-dd-manage').toggle(showOrHide);
        }
        return this;
      },
      delegate: function(events, context) {
        var eventName, key, match, method, selector, _i, _len;
        if (!events || !_.isObject(events)) {
          return this;
        }
        for (method = _i = 0, _len = events.length; _i < _len; method = ++_i) {
          key = events[method];
          if (!method) {
            continue;
          }
          match = key.match(/^(\S+)\s*(.*)$/);
          eventName = match[1];
          selector = match[2];
          method = _.bind(method, context || this);
          eventName += '.delegateEvents' + this.cid;
          if (selector === '') {
            this.$el.on(eventName, method);
          } else {
            this.$el.on(eventName, selector, method);
          }
        }
        return this;
      }
    });
  });

}).call(this);

(function() {
  define('og_dropdown',['constant', 'CloudResources', 'combo_dropdown', 'og_manage', './component/optiongroup/ogTpl', 'i18n!/nls/lang.js'], function(constant, CloudResources, comboDropdown, OgManage, template, lang) {
    return Backbone.View.extend({
      tagName: 'section',
      events: {
        'click .icon-edit': 'editClicked'
      },
      initDropdown: function() {
        var options;
        options = {
          manageBtnValue: 'Create New Option Group ...',
          filterPlaceHolder: 'Filter by Option Group name',
          noFilter: true
        };
        this.dropdown = new comboDropdown(options);
        this.dropdown.on('open', this.show, this);
        this.dropdown.on('manage', this.manage, this);
        this.dropdown.on('change', this.set, this);
        this.dropdown.on('filter', this.filter, this);
        return this.dropdown.on('quick_create', this.quickCreate, this);
      },
      initialize: function(option) {
        this.initDropdown();
        return this.dbInstance = option.dbInstance;
      },
      render: function(option) {
        var that;
        that = this;
        this.el = this.dropdown.el;
        this.dropdown.setSelection('None');
        this.engine = option.engine;
        this.engineVersion = option.engineVersion;
        this.version = option.majorVersion;
        this.refresh();
        return this;
      },
      refresh: function() {
        var customOGAry, defaultOG, defaultOGAry, engineCol, ogComps, regionName, that;
        that = this;
        regionName = Design.instance().region();
        engineCol = CloudResources(constant.RESTYPE.DBENGINE, regionName);
        ogComps = Design.modelClassForType(constant.RESTYPE.DBOG).allObjects();
        defaultOGAry = [];
        defaultOG = engineCol.getDefaultByNameVersion(regionName, this.engine, this.engineVersion);
        if (defaultOG && defaultOG.defaultOGName) {
          defaultOGAry.push({
            id: null,
            name: defaultOG.defaultOGName
          });
        }
        customOGAry = [];
        _.each(ogComps, function(compModel) {
          if (compModel.get('engineName') === that.engine && compModel.get('engineVersion') === that.version) {
            return customOGAry.push({
              id: compModel.id,
              name: compModel.get('name'),
              data: compModel.toJSON()
            });
          }
        });
        this.ogAry = defaultOGAry.concat(customOGAry);
        return this.renderDropdownList();
      },
      renderDropdownList: function() {
        var selection, that;
        that = this;
        if (this.ogAry.length) {
          selection = this.dbInstance.getOptionGroupName();
          _.each(this.ogAry, function(og) {
            var ogName, ogPreviewAry;
            ogName = og.name;
            ogPreviewAry = [];
            if (og.data) {
              _.each(og.data.options, function(option) {
                return ogPreviewAry.push(option.OptionName);
              });
              og.preview = ogPreviewAry.join(',');
            }
            if (ogName && ogName === selection) {
              og.selected = true;
              that.dropdown.setSelection(selection);
            }
            return null;
          });
          return this.dropdown.setContent(template.dropdown_list(this.ogAry)).toggleControls(true);
        } else {
          return this.dropdown.setContent(template.no_option_group({})).toggleControls(true);
        }
      },
      quickCreate: function() {
        var DBOGModel, dbOGModel;
        DBOGModel = Design.modelClassForType(constant.RESTYPE.DBOG);
        dbOGModel = new DBOGModel({
          engineName: this.engine,
          engineVersion: this.version
        });
        return new OgManage({
          dbInstance: this.dbInstance,
          engine: this.engine,
          version: this.version,
          model: dbOGModel,
          dropdown: this,
          isCreate: true
        }).render();
      },
      renderNoCredential: function() {
        return this.dropdown.render('nocredential').toggleControls(false);
      },
      show: function() {
        $('#property-dbinstance-parameter-group-select .selectbox').removeClass('open');
        if (!this.dropdown.$('.item').length) {
          return this.renderDropdownList();
        }
      },
      manage: function() {
        return this.quickCreate();
      },
      set: function(id, data) {
        return this.dbInstance.setOptionGroup(data.name);
      },
      filter: function(keyword) {},
      editClicked: function(event) {
        var $item, ogModel, ogUID;
        $item = $(event.currentTarget).parent();
        ogUID = $item.data('id');
        if (ogUID) {
          ogModel = Design.instance().component(ogUID);
          new OgManage({
            dbInstance: this.dbInstance,
            engine: this.engine,
            version: this.version,
            model: ogModel,
            dropdown: this
          }).render();
        }
        return false;
      },
      setSelection: function() {
        return this.dropdown.setSelection.apply(this, arguments);
      }
    });
  });

}).call(this);


define("component/AwsDialog", function(){});
