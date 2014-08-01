(function() {
  define(['constant', 'MC', 'i18n!/nls/lang.js', 'Design', 'underscore'], function(CONST, MC, LANG, Design, _) {
    var Helper, Inside;
    Inside = {
      taReturn: function(type, tip, uid) {
        var ret;
        ret = {
          level: CONST.TA[type],
          info: tip
        };
        if (uid) {
          ret.uid = uid;
        }
        return ret;
      },
      genTip: function(args) {
        var tip;
        if (args.length > 2) {
          tip = Function.call.apply(sprintf, args);
        } else {
          tip = args[1];
        }
        return tip;
      }
    };
    Helper = {
      map: {
        protocal: {
          '1': 'icmp',
          '6': 'tcp',
          '17': 'udp',
          '-1': 'all'
        }
      },
      protocal: {
        get: function(code) {
          return Helper.map.protocal[code.toString()] || code;
        }
      },
      i18n: {
        short: function() {
          return LANG.ide;
        }
      },
      component: {
        get: function(uid, rework) {
          if (rework) {
            return Design.instance().component(uid);
          } else {
            return MC.canvas_data.component[uid];
          }
        }
      },
      message: {
        error: function(uid, tip) {
          tip = Inside.genTip(arguments);
          return Inside.taReturn(CONST.TA.ERROR, tip, uid);
        },
        warning: function(uid, tip) {
          tip = Inside.genTip(arguments);
          return Inside.taReturn(CONST.TA.WARNING, tip, uid);
        },
        notice: function(uid, tip) {
          tip = Inside.genTip(arguments);
          return Inside.taReturn(CONST.TA.NOTICE, tip, uid);
        }
      },
      eni: {
        getByInstance: function(instance) {
          return _.filter(MC.canvas_data.component, function(component) {
            if (component.type === CONST.RESTYPE.ENI) {
              if (MC.extractID(component.resource.Attachment.InstanceId) === instance.uid) {
                return true;
              }
            }
          });
        }
      },
      sg: {
        get: function(component) {
          var eni, enis, sg, sgId, sgs, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
          sgs = [];
          if (component.type === CONST.RESTYPE.LC) {
            _ref = component.resource.SecurityGroups;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              sgId = _ref[_i];
              sgs.push(Helper.component.get(MC.extractID(sgId)));
            }
          } else if (component.type === CONST.RESTYPE.INSTANCE) {
            enis = Helper.eni.getByInstance(component);
            for (_j = 0, _len1 = enis.length; _j < _len1; _j++) {
              eni = enis[_j];
              _ref1 = eni.resource.GroupSet;
              for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                sg = _ref1[_k];
                sgs.push(Helper.component.get(MC.extractID(sg.GroupId)));
              }
            }
          } else if (component.type === CONST.RESTYPE.ELB) {
            _ref2 = component.resource.SecurityGroups;
            for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
              sgId = _ref2[_l];
              sgs.push(Helper.component.get(MC.extractID(sgId)));
            }
          }
          return _.uniq(_.compact(sgs));
        },
        port: function(sgs) {
          var build, info, permission, sg, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
          info = {
            "in": {},
            out: {}
          };
          if (!_.isArray(sgs)) {
            sgs = [sgs];
          }
          build = function(permission, direction) {
            var protocal, theInfo;
            protocal = Helper.protocal.get(permission.IpProtocol);
            if (!info[direction][protocal]) {
              info[direction][protocal] = [];
            }
            theInfo = {
              from: Number(permission.FromPort),
              to: Number(permission.ToPort),
              range: permission.IpRanges
            };
            if (_.where(info[direction][protocal], theInfo).length === 0) {
              return info[direction][protocal].push(theInfo);
            }
          };
          for (_i = 0, _len = sgs.length; _i < _len; _i++) {
            sg = sgs[_i];
            if (sg.type !== CONST.RESTYPE.SG) {
              continue;
            }
            _ref = sg.resource.IpPermissionsEgress;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              permission = _ref[_j];
              build(permission, 'out');
            }
            _ref1 = sg.resource.IpPermissions;
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              permission = _ref1[_k];
              build(permission, 'in');
            }
          }
          return info;
        },
        isInRange: function(protocal, port, portData, direction) {
          var isInRangeResult, portCode, protocalCode;
          isInRangeResult = false;
          protocalCode = Helper.protocal.get(protocal.toLowerCase());
          portCode = Number(port);
          _.each(portData[direction], function(portAry, proto) {
            if (proto === protocalCode || proto === 'all') {
              _.each(portAry, function(portObj) {
                if (portCode >= portObj.from && portCode <= portObj.to) {
                  isInRangeResult = true;
                }
                return null;
              });
            }
            return null;
          });
          return isInRangeResult;
        }
      }
    };
    return Helper;
  });

}).call(this);
