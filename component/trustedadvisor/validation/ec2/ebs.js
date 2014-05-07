(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['constant', 'jquery', 'MC', 'i18n!nls/lang.js', 'ebs_service', '../result_vo'], function(constant, $, MC, lang, ebsService) {
    var isSnapshotExist;
    isSnapshotExist = function(callback) {
      var currentRegion, err, snaphostAry, snaphostMap;
      try {
        if (!callback) {
          callback = function() {};
        }
        snaphostAry = [];
        snaphostMap = {};
        _.each(MC.canvas_data.component, function(compObj) {
          var instanceUID, snaphostId;
          if (compObj.type === constant.RESTYPE.SNAP) {
            snaphostId = compObj.resource.SnapshotId;
            instanceUID = compObj.resource.AttachmentSet.InstanceId;
            if (snaphostId && instanceUID) {
              snaphostMap[snaphostId] = instanceUID;
            }
          }
          return null;
        });
        snaphostAry = _.keys(snaphostMap);
        if (snaphostAry.length) {
          currentRegion = MC.canvas_data.region;
          ebsService.DescribeSnapshots({
            sender: this
          }, $.cookie('usercode'), $.cookie('session_id'), currentRegion, null, null, null, null, function(result) {
            var awsAMIIdAry, awsAMIIdAryStr, descAMIAry, descAMIIdAry, tipInfoAry;
            tipInfoAry = [];
            if (result.is_error && result.aws_error_code === 'InvalidAMIID.NotFound') {
              awsAMIIdAryStr = result.error_message;
              awsAMIIdAryStr = awsAMIIdAryStr.replace("The image ids '[", "").replace("]' do not exist", "").replace("The image id '[", "").replace("]' does not exist", "");
              awsAMIIdAry = awsAMIIdAryStr.split(',');
              awsAMIIdAry = _.map(awsAMIIdAry, function(awsAMIId) {
                return $.trim(awsAMIId);
              });
              if (!awsAMIIdAry.length) {
                callback(null);
                return null;
              }
              _.each(amiAry, function(amiId) {
                var instanceUIDAry;
                if (__indexOf.call(awsAMIIdAry, amiId) >= 0) {
                  instanceUIDAry = instanceAMIMap[amiId];
                  _.each(instanceUIDAry, function(instanceUID) {
                    var infoObjType, infoTagType, instanceName, instanceObj, instanceType, tipInfo;
                    instanceObj = MC.canvas_data.component[instanceUID];
                    instanceType = instanceObj.type;
                    instanceName = instanceObj.name;
                    infoObjType = 'Instance';
                    infoTagType = 'instance';
                    if (instanceType === constant.RESTYPE.LC) {
                      infoObjType = 'Launch Configuration';
                      infoTagType = 'lc';
                    }
                    tipInfo = sprintf(lang.ide.TA_MSG_ERROR_STACK_HAVE_NOT_EXIST_AMI, infoObjType, infoTagType, instanceName, amiId);
                    tipInfoAry.push({
                      level: constant.TA.ERROR,
                      info: tipInfo,
                      uid: instanceUID
                    });
                    return null;
                  });
                }
                return null;
              });
            } else if (!result.is_error) {
              descAMIIdAry = [];
              descAMIAry = result.resolved_data;
              if (_.isArray(descAMIAry)) {
                _.each(descAMIAry, function(amiObj) {
                  descAMIIdAry.push(amiObj.imageId);
                  return null;
                });
              }
              _.each(amiAry, function(amiId) {
                var instanceUIDAry;
                if (__indexOf.call(descAMIIdAry, amiId) < 0) {
                  instanceUIDAry = instanceAMIMap[amiId];
                  _.each(instanceUIDAry, function(instanceUID) {
                    var infoObjType, infoTagType, instanceName, instanceObj, instanceType, tipInfo;
                    instanceObj = MC.canvas_data.component[instanceUID];
                    instanceType = instanceObj.type;
                    instanceName = instanceObj.name;
                    infoObjType = 'Instance';
                    infoTagType = 'instance';
                    if (instanceType === constant.RESTYPE.LC) {
                      infoObjType = 'Launch Configuration';
                      infoTagType = 'lc';
                    }
                    tipInfo = sprintf(lang.ide.TA_MSG_ERROR_STACK_HAVE_NOT_AUTHED_AMI, infoObjType, infoTagType, instanceName, amiId);
                    tipInfoAry.push({
                      level: constant.TA.ERROR,
                      info: tipInfo,
                      uid: instanceUID
                    });
                    return null;
                  });
                }
                return null;
              });
            }
            if (tipInfoAry.length) {
              callback(tipInfoAry);
              return console.log(tipInfoAry);
            } else {
              return callback(null);
            }
          });
          return null;
        } else {
          return callback(null);
        }
      } catch (_error) {
        err = _error;
        return callback(null);
      }
    };
    return {
      isSnapshotExist: isSnapshotExist
    };
  });

}).call(this);
