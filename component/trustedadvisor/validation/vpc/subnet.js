(function() {
  define(['constant', 'jquery', 'MC', 'i18n!nls/lang.js', 'eni_service', '../result_vo'], function(constant, $, MC, lang, eniService) {
    var getAllAWSENIForAppEditAndDefaultVPC;
    getAllAWSENIForAppEditAndDefaultVPC = function(callback) {
      var currentRegion, currentState, currentVPCComp, currentVPCId, currentVPCUID, defaultVPCId, err;
      try {
        if (!callback) {
          callback = function() {};
        }
        currentState = MC.canvas.getState();
        defaultVPCId = MC.aws.aws.checkDefaultVPC();
        if (currentState !== 'appedit' && !MC.aws.aws.checkDefaultVPC()) {
          callback(null);
          return null;
        }
        if (defaultVPCId) {
          currentVPCId = defaultVPCId;
        } else {
          currentVPCUID = Design.modelClassForType(constant.AWS_RESOURCE_TYPE.AWS_VPC_VPC).theVPC().id;
          currentVPCComp = MC.canvas_data.component[currentVPCUID];
          currentVPCId = currentVPCComp.resource.VpcId;
        }
        currentRegion = MC.canvas_data.region;
        eniService.DescribeNetworkInterfaces({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'), currentRegion, null, [
          {
            "Name": "vpc-id",
            "Value": [currentVPCId]
          }
        ], function(result) {
          var checkResult, conflictInfo, eniObjAry;
          checkResult = true;
          conflictInfo = null;
          if (!result.is_error) {
            eniObjAry = result.resolved_data;
            _.each(eniObjAry, function(eniObj) {
              MC.data.resource_list[currentRegion][eniObj.networkInterfaceId] = eniObj;
              return null;
            });
            return callback(null);
          } else {
            return callback(null);
          }
        });
        return null;
      } catch (_error) {
        err = _error;
        return callback(null);
      }
    };
    return {
      getAllAWSENIForAppEditAndDefaultVPC: getAllAWSENIForAppEditAndDefaultVPC
    };
  });

}).call(this);
