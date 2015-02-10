(function() {
  define(['../base/model', "Design", 'constant', 'i18n!/nls/lang.js'], function(PropertyModel, Design, constant, lang) {
    var ACLModel, icmpCodeMap, icmpTypeMap;
    icmpTypeMap = {
      "0": "Echo Reply(0)",
      "3": "Destination Unreachable(3)",
      "4": "Source Quench(4)",
      "5": "Redirect Message(5)",
      "6": "Alternate Host Address(6)",
      "8": "Echo Request(8)",
      "9": "Router Advertisement(9)",
      "10": "Router Solicitation(10)",
      "11": "Time Exceeded(11)",
      "12": "Parameter Problem: Bad IP header(12)",
      "13": "Timestamp(13)",
      "14": "Timestamp Reply(14)",
      "15": "Information Request(15)",
      "16": "Information Reply(16)",
      "17": "Address Mask Request(17)",
      "18": "Address Mask Reply(18)",
      "30": "Traceroute(30)",
      "31": "Datagram Conversion Error(31)",
      "32": "Mobile Host Redirect(32)",
      "33": "Where Are You(33)",
      "34": "Here I Am(34)",
      "35": "Mobile Registration Request(35)",
      "36": "Mobile Registration Reply(36)",
      "37": "Domain Name Request(37)",
      "38": "Domain Name Reply(38)",
      "39": "SKIP Algorithm Discovery Protocol(39)",
      "40": "Photuris Security Failures(40)",
      "-1": "All(-1)"
    };
    icmpCodeMap = {
      "3": {
        "-1": "All(-1)",
        "0": "destination network unreachable(0)",
        "1": "destination host unreachable(1)",
        "2": "destination protocol unreachable(2)",
        "3": "destination port unreachable(3)",
        "4": "fragmentation required and DF flag set(4)",
        "5": "source route failed(5)",
        "6": "destination network unknown(6)",
        "7": "destination host unknown(7)",
        "8": "source host isolated(8)",
        "9": "network administratively prohibited(9)",
        "10": "host administratively prohibited(10)",
        "11": "network unreachable for TOS(11)",
        "12": "host unreachable for TOS(12)",
        "13": "communication administratively prohibited(13)"
      },
      "5": {
        "-1": "All(-1)",
        "0": "redirect datagram for the network(0)",
        "1": "redirect datagram for the host(1)",
        "2": "redirect datagram for the TOS & network(2)",
        "3": "redirect datagram for the TOS & host(3)"
      },
      "11": {
        "-1": "All(-1)",
        "0": "TTL expired transit(0)",
        "1": "fragmentation reasembly time exceeded(1)"
      },
      "12": {
        "-1": "All(-1)",
        "0": "pointer indicates the error(0)",
        "1": "missing a required option(1)",
        "2": "bad length(2)"
      }
    };
    ACLModel = PropertyModel.extend({
      init: function(uid) {
        var aclObj, assos;
        aclObj = Design.instance().component(uid);
        assos = _.map(aclObj.connectionTargets("AclAsso"), function(subnet) {
          return {
            name: subnet.get('name'),
            cidr: subnet.get('cidr')
          };
        });
        this.set({
          uid: uid,
          isDefault: aclObj.isDefault(),
          appId: aclObj.get("appId"),
          name: aclObj.get("name"),
          vpcId: Design.modelClassForType(constant.RESTYPE.VPC).theVPC().get("appId"),
          rules: null,
          isApp: this.isApp,
          associations: _.sortBy(assos, name)
        });
        this.getRules();
        this.sortRules();
        return null;
      },
      getRules: function() {
        var isApp, isDefault, rules;
        rules = $.extend(true, [], Design.instance().component(this.get("uid")).get("rules"));
        isDefault = this.get("isDefault");
        isApp = this.isApp;
        _.each(rules, function(rule) {
          var codeStr, err, typeCodeStrAry, typeStr;
          if (!rule.port) {
            rule.port = "All";
          }
          if (rule.number === 32767) {
            rule.number = "*";
            rule.readOnly = true;
          } else if ((rule.number === 100 && isDefault) || isApp) {
            rule.readOnly = true;
          }
          switch (rule.protocol) {
            case -1:
              rule.protocol = "ALL";
              break;
            case 1:
              rule.protocol = "ICMP";
              break;
            case 6:
              rule.protocol = "TCP";
              break;
            case 17:
              rule.protocol = "UDP";
          }
          rule.tooltip = 'Port';
          try {
            if (rule.protocol === 'ICMP') {
              typeCodeStrAry = rule.port.split('/');
              typeStr = '';
              if (typeCodeStrAry[0]) {
                typeStr = icmpTypeMap[typeCodeStrAry[0]];
              }
              codeStr = '';
              if (typeCodeStrAry[1]) {
                if (icmpCodeMap[typeCodeStrAry[0]]) {
                  codeStr = icmpCodeMap[typeCodeStrAry[0]][typeCodeStrAry[1]];
                } else {
                  codeStr = "All(-1)";
                }
              }
              if (typeStr && !codeStr) {
                rule.tooltip = 'Type: ' + typeStr;
              } else if (typeStr && codeStr) {
                rule.tooltip = 'Type: ' + typeStr + ', ' + 'Code: ' + codeStr;
              }
            } else {
              rule.tooltip = 'Port: ' + rule.port;
            }
          } catch (_error) {
            err = _error;
            console.log('ERR: icmp code type parse faild.');
          }
          return null;
        });
        return this.set("rules", rules);
      },
      sortRules: function() {
        var compare, key;
        key = this.get("sortKey") || "number";
        if (key === "number") {
          compare = function(a, b) {
            var a_n, b_n;
            a_n = parseInt(a.number, 10) || -1;
            b_n = parseInt(b.number, 10) || -1;
            if (a_n > b_n) {
              return 1;
            }
            if (a_n === b_n) {
              return 0;
            }
            if (a_n < b_n) {
              return -1;
            }
          };
        } else {
          compare = function(a, b) {
            if (a[key] > b[key]) {
              return 1;
            }
            if (a[key] === b[key]) {
              return 0;
            }
            if (a[key] < b[key]) {
              return -1;
            }
          };
        }
        this.attributes.rules = this.attributes.rules.sort(compare);
        return null;
      },
      setSortOption: function(key) {
        this.set("sortKey", key);
        this.sortRules();
        return null;
      },
      removeAclRule: function(ruleId) {
        return Design.instance().component(this.get("uid")).removeRule(ruleId);
      },
      addAclRule: function(ruleObj) {
        Design.instance().component(this.get("uid")).addRule(ruleObj);
        this.getRules();
        this.sortRules();
        this.trigger("REFRESH_RULE_LIST");
        return null;
      },
      checkRuleNumber: function(rulenumber) {
        var rule;
        rulenumber = parseInt(rulenumber, 10);
        if (!((0 < rulenumber && rulenumber < 32768))) {
          return lang.PARSLEY.VALID_RULE_NUMBER_1_TO_32767;
        }
        if (this.get("isDefault") && rulenumber === 100) {
          return lang.PARSLEY.RULE_NUMBER_100_HAS_EXISTED;
        }
        rule = _.find(Design.instance().component(this.get("uid")).get("rules"), function(r) {
          return r.number === rulenumber;
        });
        if (rule) {
          return sprintf(lang.PARSLEY.RULENUMBER_ALREADY_EXISTS, rulenumber);
        }
        return true;
      }
    });
    return new ACLModel();
  });

}).call(this);
