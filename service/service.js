(function() {
  define('base_model',['backbone'], function() {
    var BaseModel, base_model;
    BaseModel = Backbone.Model.extend({
      ERROR: 'SERVICE_ERROR',
      pub: function(error) {
        console.log('pub');
        console.log(error);
        return base_model.trigger(this.ERROR, error);
      },
      sub: function(callback) {
        console.log('sub');
        return base_model.on(this.ERROR, callback);
      }
    });
    base_model = new BaseModel();
    return base_model;
  });

}).call(this);

(function() {
  define('result_vo',['constant', 'underscore'], function(constant, _) {
    var genErrorHandler, genSendRequest, genSuccessHandler, parseAWSError, processAWSReturnHandler, processForgeReturnHandler;
    genSuccessHandler = function(api_name, src, param_ary, parser, callback) {
      return function(res) {
        var aws_result, result, return_code;
        result = res.result[1];
        return_code = res.result[0];
        param_ary.splice(0, 0, {
          url: URL,
          method: api_name,
          src: src
        });
        aws_result = {};
        aws_result = parser(result, return_code, param_ary);
        if (callback) {
          callback(aws_result);
          return null;
        } else {
          return aws_result;
        }
      };
    };
    genErrorHandler = function(api_name, src, param_ary, parser, callback) {
      return function(res) {
        var aws_result, result, return_code;
        result = res.result[1];
        return_code = res.result[0];
        aws_result = {};
        aws_result.return_code = return_code;
        aws_result.is_error = true;
        aws_result.error_message = result.toString();
        param_ary.splice(0, 0, {
          url: URL,
          method: api_name,
          src: src
        });
        aws_result.param = param_ary;
        if (callback) {
          callback(aws_result);
          return null;
        } else {
          return aws_result;
        }
      };
    };
    genSendRequest = function(url) {
      return function(api_name, src, param_ary, parser, callback) {
        var errorHandler, successHandler;
        successHandler = genSuccessHandler.apply(null, arguments);
        errorHandler = genErrorHandler.apply(null, arguments);
        return MC.api({
          url: url,
          method: api_name,
          data: param_ary
        }).then(successHandler, errorHandler);
      };
    };
    processForgeReturnHandler = function(result, return_code, param) {
      var error, error_message, forge_result, is_error, resolved_data;
      forge_result = {
        return_code: -1,
        param: null,
        resolved_data: null,
        is_error: true,
        error_message: ""
      };
      is_error = true;
      error_message = "";
      resolved_data = null;
      try {
        switch (return_code) {
          case constant.RETURN_CODE.E_OK:
            is_error = false;
            break;
          case constant.RETURN_CODE.E_NONE:
            error_message = result.toString();
            break;
          case constant.RETURN_CODE.E_INVALID:
            error_message = result.toString();
            break;
          case constant.RETURN_CODE.E_EXPIRED:
            error_message = result.toString();
            break;
          case constant.RETURN_CODE.E_UNKNOWN:
            error_message = constant.MESSAGE_E.E_UNKNOWN;
            break;
          default:
            error_message = result.toString();
        }
      } catch (_error) {
        error = _error;
        error_message = error.toString();
        is_error = true;
      } finally {
        forge_result.return_code = return_code;
        forge_result.param = param;
        forge_result.is_error = is_error;
        forge_result.resolved_data = resolved_data;
        forge_result.error_message = error_message;
      }
      return forge_result;
    };
    processAWSReturnHandler = function(result, return_code, param) {
      var aws_error_code, aws_error_message, aws_result, errObj, error, error_message, is_error, resolved_data;
      aws_result = {
        return_code: -1,
        param: null,
        resolved_data: null,
        is_error: true,
        error_message: "",
        aws_error_code: -1,
        aws_error_message: ""
      };
      is_error = true;
      error_message = "";
      resolved_data = null;
      aws_error_code = "";
      aws_error_message = "";
      try {
        switch (return_code) {
          case constant.RETURN_CODE.E_OK:
            is_error = false;
            break;
          case constant.RETURN_CODE.E_NONE:
            error_message = result.toString();
            break;
          case constant.RETURN_CODE.E_INVALID:
            error_message = result.toString();
            break;
          case constant.RETURN_CODE.E_EXPIRED:
            error_message = result.toString();
            break;
          case constant.RETURN_CODE.E_UNKNOWN:
            error_message = constant.MESSAGE_E.E_UNKNOWN;
            break;
          case constant.RETURN_CODE.E_PARAM:
          case 404:
          case 405:
            errObj = parseAWSError(result);
            error_message = errObj.errMessage;
            aws_error_code = errObj.errCode;
            break;
          default:
            error_message = result.toString();
        }
      } catch (_error) {
        error = _error;
        error_message = error.toString();
        is_error = true;
      } finally {
        aws_result.return_code = return_code;
        aws_result.param = param;
        aws_result.is_error = is_error;
        aws_result.resolved_data = resolved_data;
        aws_result.error_message = error_message;
        aws_result.aws_error_code = aws_error_code;
        aws_result.aws_error_message = aws_error_message;
      }
      return aws_result;
    };
    parseAWSError = function(result) {
      var errCodeStr, errCodeXML, errMessageXML, err_code, err_xml, error_message;
      error_message = '';
      errCodeStr = '';
      if (_.isArray(result) && result.length === 2) {
        err_code = result[0];
        err_xml = result[1];
        errCodeXML = $($.parseXML(err_xml)).find('Error').find('Code');
        errMessageXML = $($.parseXML(err_xml)).find('Error').find('Message');
        if (((400 <= err_code && err_code < 500)) && errCodeXML.length === 1 && errMessageXML.length === 1) {
          errCodeStr = errCodeXML.text();
          switch (errCodeStr) {
            case 'InvalidAMIID.NotFound':
              error_message = errMessageXML.text();
              break;
            default:
              error_message = $($.parseXML(err_xml)).find('Error').find('Message').text();
          }
        }
      } else if (_.isString(result)) {
        error_message = result;
      }
      return {
        errCode: errCodeStr,
        errMessage: error_message
      };
    };
    return {
      processForgeReturnHandler: processForgeReturnHandler,
      processAWSReturnHandler: processAWSReturnHandler,
      genSendRequest: genSendRequest
    };
  });

}).call(this);

(function() {
  define('state_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var URL, log, module, parserLogReturn, parserModuleReturn, parserStatusReturn, resolveLogResult, resolveModuleResult, resolveStatusResult, send_request, status;
    URL = '/state/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("state." + api_name + " callback is null");
        return false;
      }
      try {
        MC.api({
          url: URL,
          method: api_name,
          data: param_ary,
          success: function(result, return_code) {
            var forge_result;
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            forge_result = {};
            forge_result = parser(result, return_code, param_ary);
            return callback(forge_result);
          },
          error: function(result, return_code) {
            var forge_result;
            forge_result = {};
            forge_result.return_code = return_code;
            forge_result.is_error = true;
            forge_result.error_message = result.toString();
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            forge_result.param = param_ary;
            return callback(forge_result);
          }
        });
      } catch (_error) {
        error = _error;
        console.log("state." + method + " error:" + error.toString());
      }
      return true;
    };
    resolveModuleResult = function(result) {
      return result;
    };
    parserModuleReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveModuleResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveStatusResult = function(result) {
      return result;
    };
    parserStatusReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveStatusResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveLogResult = function(result) {
      return result;
    };
    parserLogReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveLogResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    module = function(src, username, session_id, mod_repo, mod_tag, callback) {
      send_request("module", src, [username, session_id, mod_repo, mod_tag], parserModuleReturn, callback);
      return true;
    };
    status = function(src, username, session_id, app_id, callback) {
      send_request("status", src, [username, session_id, app_id], parserStatusReturn, callback);
      return true;
    };
    log = function(src, username, session_id, app_id, res_id, callback) {
      if (res_id == null) {
        res_id = null;
      }
      send_request("log", src, [username, session_id, app_id, res_id], parserLogReturn, callback);
      return true;
    };
    return {
      module: module,
      status: status,
      log: log
    };
  });

}).call(this);

(function() {
  define('state_model',['backbone', 'underscore', 'state_service', 'base_model'], function(Backbone, _, state_service, base_model) {
    var StateModel, state_model;
    StateModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      module: function(src, username, session_id, mod_repo, mod_tag) {
        var me;
        me = this;
        src.model = me;
        return state_service.module(src, username, session_id, mod_repo, mod_tag, function(forge_result) {
          var err, jsonData, jsonDataStr;
          if (!forge_result.is_error) {
            if (forge_result.resolved_data) {
              jsonDataStr = forge_result.resolved_data;
              try {
                jsonData = JSON.parse(jsonDataStr);
                forge_result.resolved_data = jsonData;
                if (src.sender && src.sender.trigger) {
                  src.sender.trigger('STATE_MODULE_RETURN', forge_result, src);
                }
                return;
              } catch (_error) {
                err = _error;
                console.log('state.module failed, error is JSON parse error');
              }
            }
          }
          console.log('state.module failed, error is ' + forge_result.error_message);
          return me.pub(forge_result);
        });
      },
      status: function(src, username, session_id, app_id) {
        var me;
        me = this;
        src.model = me;
        return state_service.status(src, username, session_id, app_id, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STATE_STATUS_RETURN', forge_result);
            }
          } else {
            console.log('state.status failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      log: function(src, username, session_id, app_id, res_id) {
        var me;
        if (res_id == null) {
          res_id = null;
        }
        me = this;
        src.model = me;
        return state_service.log(src, username, session_id, app_id, res_id, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STATE_LOG_RETURN', forge_result);
            }
          } else {
            console.log('state.log failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      }
    });
    state_model = new StateModel();
    return state_model;
  });

}).call(this);

(function() {
  define('keypair_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var CreateKeyPair, DeleteKeyPair, DescribeKeyPairs, ImportKeyPair, URL, download, list, parserCreateKeyPairReturn, parserDeleteKeyPairReturn, parserDescribeKeyPairsReturn, parserDownloadReturn, parserImportKeyPairReturn, parserListReturn, parserRemoveReturn, parserUploadReturn, remove, resolveCreateKeyPairsResult, resolveDescribeKeyPairsResult, resolveImportKeyPairsResult, send_request, upload;
    URL = '/aws/ec2/keypair/';
    send_request = result_vo.genSendRequest(URL);
    parserCreateKeyPairReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveCreateKeyPairsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    parserDeleteKeyPairReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserImportKeyPairReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveImportKeyPairsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveCreateKeyPairsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).CreateKeyPairResponse;
      return result_set;
    };
    resolveImportKeyPairsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).ImportKeyPairResponse;
      return result_set;
    };
    resolveDescribeKeyPairsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeKeyPairsResponse.keySet;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeKeyPairsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeKeyPairsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    parserUploadReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processForgeReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserDownloadReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processForgeReturnHandler(result, return_code, param);
      aws_result.resolved_data = result;
      return aws_result;
    };
    parserRemoveReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserListReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    CreateKeyPair = function(src, username, session_id, region_name, key_name, callback) {
      return send_request("CreateKeyPair", src, [username, session_id, region_name, key_name], parserCreateKeyPairReturn, callback);
    };
    DeleteKeyPair = function(src, username, session_id, region_name, key_name, callback) {
      return send_request("DeleteKeyPair", src, [username, session_id, region_name, key_name], parserDeleteKeyPairReturn, callback);
    };
    ImportKeyPair = function(src, username, session_id, region_name, key_name, key_data, callback) {
      return send_request("ImportKeyPair", src, [username, session_id, region_name, key_name, key_data], parserImportKeyPairReturn, callback);
    };
    DescribeKeyPairs = function(src, username, session_id, region_name, key_names, filters, callback) {
      if (key_names == null) {
        key_names = null;
      }
      if (filters == null) {
        filters = null;
      }
      return send_request("DescribeKeyPairs", src, [username, session_id, region_name, key_names, filters], parserDescribeKeyPairsReturn, callback);
    };
    upload = function(src, username, session_id, region_name, key_name, key_data, callback) {
      return send_request("upload", src, [username, session_id, region_name, key_name, key_data], parserUploadReturn, callback);
    };
    download = function(src, username, session_id, region_name, key_name, callback) {
      return send_request("download", src, [username, session_id, region_name, key_name], parserDownloadReturn, callback);
    };
    remove = function(src, username, session_id, region_name, key_name, callback) {
      return send_request("remove", src, [username, session_id, region_name, key_name], parserRemoveReturn, callback);
    };
    list = function(src, username, session_id, region_name, callback) {
      return send_request("list", src, [username, session_id, region_name], parserListReturn, callback);
    };
    return {
      CreateKeyPair: CreateKeyPair,
      DeleteKeyPair: DeleteKeyPair,
      ImportKeyPair: ImportKeyPair,
      DescribeKeyPairs: DescribeKeyPairs,
      upload: upload,
      download: download,
      remove: remove,
      list: list,
      resolveDescribeKeyPairsResult: resolveDescribeKeyPairsResult
    };
  });

}).call(this);

(function() {
  define('keypair_model',['backbone', 'underscore', 'keypair_service', 'base_model'], function(Backbone, _, keypair_service, base_model) {
    var KeyPairModel, keypair_model;
    KeyPairModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      CreateKeyPair: function(src, username, session_id, region_name, key_name) {
        var me;
        me = this;
        src.model = me;
        return keypair_service.CreateKeyPair(src, username, session_id, region_name, key_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_KP_CREATE_KEY_PAIR_RETURN', aws_result);
            }
          } else {
            console.log('keypair.CreateKeyPair failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DeleteKeyPair: function(src, username, session_id, region_name, key_name) {
        var me;
        me = this;
        src.model = me;
        return keypair_service.DeleteKeyPair(src, username, session_id, region_name, key_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_KP_DELETE_KEY_PAIR_RETURN', aws_result);
            }
          } else {
            console.log('keypair.DeleteKeyPair failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ImportKeyPair: function(src, username, session_id, region_name, key_name, key_data) {
        var me;
        me = this;
        src.model = me;
        return keypair_service.ImportKeyPair(src, username, session_id, region_name, key_name, key_data, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_KP_IMPORT_KEY_PAIR_RETURN', aws_result);
            }
          } else {
            console.log('keypair.ImportKeyPair failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeKeyPairs: function(src, username, session_id, region_name, key_names, filters) {
        var me;
        if (key_names == null) {
          key_names = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return keypair_service.DescribeKeyPairs(src, username, session_id, region_name, key_names, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_KP_DESC_KEY_PAIRS_RETURN', aws_result);
            }
          } else {
            console.log('keypair.DescribeKeyPairs failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      upload: function(src, username, session_id, region_name, key_name, key_data) {
        var me;
        me = this;
        src.model = me;
        return keypair_service.upload(src, username, session_id, region_name, key_name, key_data, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_KPUPLOAD_RETURN', aws_result);
            }
          } else {
            console.log('keypair.upload failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      download: function(src, username, session_id, region_name, key_name) {
        var me;
        me = this;
        src.model = me;
        return keypair_service.download(src, username, session_id, region_name, key_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_KPDOWNLOAD_RETURN', aws_result);
            }
          } else {
            console.log('keypair.download failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      remove: function(src, username, session_id, region_name, key_name) {
        var me;
        me = this;
        src.model = me;
        return keypair_service.remove(src, username, session_id, region_name, key_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_KPREMOVE_RETURN', aws_result);
            }
          } else {
            console.log('keypair.remove failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      list: function(src, username, session_id, region_name) {
        var me;
        me = this;
        src.model = me;
        return keypair_service.list(src, username, session_id, region_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_KPLST_RETURN', aws_result);
            }
          } else {
            console.log('keypair.list failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    keypair_model = new KeyPairModel();
    return keypair_model;
  });

}).call(this);

(function() {
  define('instance_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var BundleInstance, CancelBundleTask, ConfirmProductInstance, DescribeBundleTasks, DescribeInstanceAttribute, DescribeInstanceStatus, DescribeInstances, GetConsoleOutput, GetPasswordData, ModifyInstanceAttribute, MonitorInstances, RebootInstances, ResetInstanceAttribute, RunInstances, StartInstances, StopInstances, TerminateInstances, URL, UnmonitorInstances, parserBundleInstanceReturn, parserCancelBundleTaskReturn, parserConfirmProductInstanceReturn, parserDescribeBundleTasksReturn, parserDescribeInstanceAttributeReturn, parserDescribeInstanceStatusReturn, parserDescribeInstancesReturn, parserGetConsoleOutputReturn, parserGetPasswordDataReturn, parserModifyInstanceAttributeReturn, parserMonitorInstancesReturn, parserRebootInstancesReturn, parserResetInstanceAttributeReturn, parserRunInstancesReturn, parserStartInstancesReturn, parserStopInstancesReturn, parserTerminateInstancesReturn, parserUnmonitorInstancesReturn, resolveDescribeBundleTasksResult, resolveDescribeInstanceAttributeResult, resolveDescribeInstanceStatusResult, resolveDescribeInstancesResult, resolveGetConsoleOutputResult, resolveGetPasswordDataResult, send_request;
    URL = '/aws/ec2/instance/';
    send_request = result_vo.genSendRequest(URL);
    parserRunInstancesReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserStartInstancesReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserStopInstancesReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserRebootInstancesReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserTerminateInstancesReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserMonitorInstancesReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserUnmonitorInstancesReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserBundleInstanceReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserCancelBundleTaskReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserModifyInstanceAttributeReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserResetInstanceAttributeReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserConfirmProductInstanceReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    resolveDescribeInstancesResult = function(result) {
      var i, instance_list, item, reservationSet, xml, _i, _j, _len, _len1, _ref, _ref1;
      xml = $.parseXML(result[1]);
      instance_list = [];
      reservationSet = ($.xml2json(xml)).DescribeInstancesResponse.reservationSet;
      if (!$.isEmptyObject(reservationSet)) {
        if ($.type(reservationSet.item) === "array") {
          _ref = reservationSet.item;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            if ($.type(item.instancesSet.item) === "array") {
              _ref1 = item.instancesSet.item;
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                i = _ref1[_j];
                instance_list.push(i);
              }
            } else {
              instance_list.push(item.instancesSet.item);
            }
          }
        } else {
          if (reservationSet.$.type(item.instancesSet.item) === "array") {
            instance_list = reservationSet.item.instancesSet.item;
          } else {
            instance_list.push(reservationSet.item.instancesSet.item);
          }
        }
      }
      return instance_list;
    };
    parserDescribeInstancesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeInstancesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeInstanceStatusResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeInstanceStatusResponse.instanceStatusSet;
    };
    parserDescribeInstanceStatusReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeInstanceStatusResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeBundleTasksResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeBundleTasksResponse.bundleInstanceTasksSet;
    };
    parserDescribeBundleTasksReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeBundleTasksResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeInstanceAttributeResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeInstanceAttributeResponse;
    };
    parserDescribeInstanceAttributeReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeInstanceAttributeResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveGetConsoleOutputResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).GetConsoleOutputResponse;
    };
    parserGetConsoleOutputReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveGetConsoleOutputResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveGetPasswordDataResult = function(result) {
      var aws_result, data, jsonData;
      aws_result = null;
      jsonData = $.xml2json($.parseXML(result[1]));
      data = jsonData["ns0:GetPasswordDataResponse"] || jsonData["GetPasswordDataResponse"];
      if (data) {
        aws_result = {
          instanceId: data["ns0:instanceId"] || data["instanceId"],
          passwordData: data["ns0:passwordData"] || data["passwordData"],
          requestId: data["ns0:requestId"] || data["requestId"],
          timestamp: data["ns0:timestamp"] || data["timestamp"]
        };
      }
      return aws_result;
    };
    parserGetPasswordDataReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveGetPasswordDataResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    RunInstances = function(src, username, session_id, callback) {
      return send_request("RunInstances", src, [username, session_id], parserRunInstancesReturn, callback);
    };
    StartInstances = function(src, username, session_id, region_name, instance_ids, callback) {
      if (instance_ids == null) {
        instance_ids = null;
      }
      return send_request("StartInstances", src, [username, session_id, region_name, instance_ids], parserStartInstancesReturn, callback);
    };
    StopInstances = function(src, username, session_id, region_name, instance_ids, force, callback) {
      if (instance_ids == null) {
        instance_ids = null;
      }
      if (force == null) {
        force = false;
      }
      return send_request("StopInstances", src, [username, session_id, region_name, instance_ids, force], parserStopInstancesReturn, callback);
    };
    RebootInstances = function(src, username, session_id, region_name, instance_ids, callback) {
      if (instance_ids == null) {
        instance_ids = null;
      }
      return send_request("RebootInstances", src, [username, session_id, region_name, instance_ids], parserRebootInstancesReturn, callback);
    };
    TerminateInstances = function(src, username, session_id, region_name, instance_ids, callback) {
      if (instance_ids == null) {
        instance_ids = null;
      }
      return send_request("TerminateInstances", src, [username, session_id, region_name, instance_ids], parserTerminateInstancesReturn, callback);
    };
    MonitorInstances = function(src, username, session_id, region_name, instance_ids, callback) {
      return send_request("MonitorInstances", src, [username, session_id, region_name, instance_ids], parserMonitorInstancesReturn, callback);
    };
    UnmonitorInstances = function(src, username, session_id, region_name, instance_ids, callback) {
      return send_request("UnmonitorInstances", src, [username, session_id, region_name, instance_ids], parserUnmonitorInstancesReturn, callback);
    };
    BundleInstance = function(src, username, session_id, region_name, instance_id, s3_bucket, callback) {
      return send_request("BundleInstance", src, [username, session_id, region_name, instance_id, s3_bucket], parserBundleInstanceReturn, callback);
    };
    CancelBundleTask = function(src, username, session_id, region_name, bundle_id, callback) {
      return send_request("CancelBundleTask", src, [username, session_id, region_name, bundle_id], parserCancelBundleTaskReturn, callback);
    };
    ModifyInstanceAttribute = function(src, username, session_id, callback) {
      return send_request("ModifyInstanceAttribute", src, [username, session_id], parserModifyInstanceAttributeReturn, callback);
    };
    ResetInstanceAttribute = function(src, username, session_id, region_name, instance_id, attribute_name, callback) {
      return send_request("ResetInstanceAttribute", src, [username, session_id, region_name, instance_id, attribute_name], parserResetInstanceAttributeReturn, callback);
    };
    ConfirmProductInstance = function(src, username, session_id, region_name, instance_id, product_code, callback) {
      return send_request("ConfirmProductInstance", src, [username, session_id, region_name, instance_id, product_code], parserConfirmProductInstanceReturn, callback);
    };
    DescribeInstances = function(src, username, session_id, region_name, instance_ids, filters, callback) {
      if (instance_ids == null) {
        instance_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      return send_request("DescribeInstances", src, [username, session_id, region_name, instance_ids, filters], parserDescribeInstancesReturn, callback);
    };
    DescribeInstanceStatus = function(src, username, session_id, region_name, instance_ids, include_all_instances, max_results, next_token, callback) {
      if (instance_ids == null) {
        instance_ids = null;
      }
      if (include_all_instances == null) {
        include_all_instances = false;
      }
      if (max_results == null) {
        max_results = 1000;
      }
      if (next_token == null) {
        next_token = null;
      }
      return send_request("DescribeInstanceStatus", src, [username, session_id, region_name, instance_ids, include_all_instances, max_results, next_token], parserDescribeInstanceStatusReturn, callback);
    };
    DescribeBundleTasks = function(src, username, session_id, region_name, bundle_ids, filters, callback) {
      if (bundle_ids == null) {
        bundle_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      return send_request("DescribeBundleTasks", src, [username, session_id, region_name, bundle_ids, filters], parserDescribeBundleTasksReturn, callback);
    };
    DescribeInstanceAttribute = function(src, username, session_id, region_name, instance_id, attribute_name, callback) {
      return send_request("DescribeInstanceAttribute", src, [username, session_id, region_name, instance_id, attribute_name], parserDescribeInstanceAttributeReturn, callback);
    };
    GetConsoleOutput = function(src, username, session_id, region_name, instance_id, callback) {
      return send_request("GetConsoleOutput", src, [username, session_id, region_name, instance_id], parserGetConsoleOutputReturn, callback);
    };
    GetPasswordData = function(src, username, session_id, region_name, instance_id, key_data, callback) {
      if (key_data == null) {
        key_data = null;
      }
      return send_request("GetPasswordData", src, [username, session_id, region_name, instance_id, key_data], parserGetPasswordDataReturn, callback);
    };
    return {
      RunInstances: RunInstances,
      StartInstances: StartInstances,
      StopInstances: StopInstances,
      RebootInstances: RebootInstances,
      TerminateInstances: TerminateInstances,
      MonitorInstances: MonitorInstances,
      UnmonitorInstances: UnmonitorInstances,
      BundleInstance: BundleInstance,
      CancelBundleTask: CancelBundleTask,
      ModifyInstanceAttribute: ModifyInstanceAttribute,
      ResetInstanceAttribute: ResetInstanceAttribute,
      ConfirmProductInstance: ConfirmProductInstance,
      DescribeInstances: DescribeInstances,
      DescribeInstanceStatus: DescribeInstanceStatus,
      DescribeBundleTasks: DescribeBundleTasks,
      DescribeInstanceAttribute: DescribeInstanceAttribute,
      GetConsoleOutput: GetConsoleOutput,
      GetPasswordData: GetPasswordData,
      resolveDescribeInstancesResult: resolveDescribeInstancesResult
    };
  });

}).call(this);

(function() {
  define('instance_model',['backbone', 'underscore', 'instance_service', 'base_model'], function(Backbone, _, instance_service, base_model) {
    var InstanceModel, instance_model;
    InstanceModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      RunInstances: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return instance_service.RunInstances(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_RUN_INSTANCES_RETURN', aws_result);
            }
          } else {
            console.log('instance.RunInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      StartInstances: function(src, username, session_id, region_name, instance_ids) {
        var me;
        if (instance_ids == null) {
          instance_ids = null;
        }
        me = this;
        src.model = me;
        return instance_service.StartInstances(src, username, session_id, region_name, instance_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_START_INSTANCES_RETURN', aws_result);
            }
          } else {
            console.log('instance.StartInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      StopInstances: function(src, username, session_id, region_name, instance_ids, force) {
        var me;
        if (instance_ids == null) {
          instance_ids = null;
        }
        if (force == null) {
          force = false;
        }
        me = this;
        src.model = me;
        return instance_service.StopInstances(src, username, session_id, region_name, instance_ids, force, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_STOP_INSTANCES_RETURN', aws_result);
            }
          } else {
            console.log('instance.StopInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      RebootInstances: function(src, username, session_id, region_name, instance_ids) {
        var me;
        if (instance_ids == null) {
          instance_ids = null;
        }
        me = this;
        src.model = me;
        return instance_service.RebootInstances(src, username, session_id, region_name, instance_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_REBOOT_INSTANCES_RETURN', aws_result);
            }
          } else {
            console.log('instance.RebootInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      TerminateInstances: function(src, username, session_id, region_name, instance_ids) {
        var me;
        if (instance_ids == null) {
          instance_ids = null;
        }
        me = this;
        src.model = me;
        return instance_service.TerminateInstances(src, username, session_id, region_name, instance_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_TERMINATE_INSTANCES_RETURN', aws_result);
            }
          } else {
            console.log('instance.TerminateInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      MonitorInstances: function(src, username, session_id, region_name, instance_ids) {
        var me;
        me = this;
        src.model = me;
        return instance_service.MonitorInstances(src, username, session_id, region_name, instance_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_MONITOR_INSTANCES_RETURN', aws_result);
            }
          } else {
            console.log('instance.MonitorInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      UnmonitorInstances: function(src, username, session_id, region_name, instance_ids) {
        var me;
        me = this;
        src.model = me;
        return instance_service.UnmonitorInstances(src, username, session_id, region_name, instance_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_UNMONITOR_INSTANCES_RETURN', aws_result);
            }
          } else {
            console.log('instance.UnmonitorInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      BundleInstance: function(src, username, session_id, region_name, instance_id, s3_bucket) {
        var me;
        me = this;
        src.model = me;
        return instance_service.BundleInstance(src, username, session_id, region_name, instance_id, s3_bucket, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_BUNDLE_INSTANCE_RETURN', aws_result);
            }
          } else {
            console.log('instance.BundleInstance failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      CancelBundleTask: function(src, username, session_id, region_name, bundle_id) {
        var me;
        me = this;
        src.model = me;
        return instance_service.CancelBundleTask(src, username, session_id, region_name, bundle_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_CANCEL_BUNDLE_TASK_RETURN', aws_result);
            }
          } else {
            console.log('instance.CancelBundleTask failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ModifyInstanceAttribute: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return instance_service.ModifyInstanceAttribute(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_MODIFY_INSTANCE_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('instance.ModifyInstanceAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ResetInstanceAttribute: function(src, username, session_id, region_name, instance_id, attribute_name) {
        var me;
        me = this;
        src.model = me;
        return instance_service.ResetInstanceAttribute(src, username, session_id, region_name, instance_id, attribute_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_RESET_INSTANCE_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('instance.ResetInstanceAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ConfirmProductInstance: function(src, username, session_id, region_name, instance_id, product_code) {
        var me;
        me = this;
        src.model = me;
        return instance_service.ConfirmProductInstance(src, username, session_id, region_name, instance_id, product_code, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_CONFIRM_PRODUCT_INSTANCE_RETURN', aws_result);
            }
          } else {
            console.log('instance.ConfirmProductInstance failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeInstances: function(src, username, session_id, region_name, instance_ids, filters) {
        var me;
        if (instance_ids == null) {
          instance_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return instance_service.DescribeInstances(src, username, session_id, region_name, instance_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_DESC_INSTANCES_RETURN', aws_result);
            }
          } else {
            console.log('instance.DescribeInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeInstanceStatus: function(src, username, session_id, region_name, instance_ids, include_all_instances, max_results, next_token) {
        var me;
        if (instance_ids == null) {
          instance_ids = null;
        }
        if (include_all_instances == null) {
          include_all_instances = false;
        }
        if (max_results == null) {
          max_results = 1000;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return instance_service.DescribeInstanceStatus(src, username, session_id, region_name, instance_ids, include_all_instances, max_results, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_DESC_INSTANCE_STATUS_RETURN', aws_result);
            }
          } else {
            console.log('instance.DescribeInstanceStatus failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeBundleTasks: function(src, username, session_id, region_name, bundle_ids, filters) {
        var me;
        if (bundle_ids == null) {
          bundle_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return instance_service.DescribeBundleTasks(src, username, session_id, region_name, bundle_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_DESC_BUNDLE_TASKS_RETURN', aws_result);
            }
          } else {
            console.log('instance.DescribeBundleTasks failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeInstanceAttribute: function(src, username, session_id, region_name, instance_id, attribute_name) {
        var me;
        me = this;
        src.model = me;
        return instance_service.DescribeInstanceAttribute(src, username, session_id, region_name, instance_id, attribute_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_DESC_INSTANCE_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('instance.DescribeInstanceAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      GetConsoleOutput: function(src, username, session_id, region_name, instance_id) {
        var me;
        me = this;
        src.model = me;
        return instance_service.GetConsoleOutput(src, username, session_id, region_name, instance_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_GET_CONSOLE_OUTPUT_RETURN', aws_result);
            }
          } else {
            console.log('instance.GetConsoleOutput failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      GetPasswordData: function(src, username, session_id, region_name, instance_id, key_data) {
        var me;
        if (key_data == null) {
          key_data = null;
        }
        me = this;
        src.model = me;
        return instance_service.GetPasswordData(src, username, session_id, region_name, instance_id, key_data, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_INS_GET_PWD_DATA_RETURN', aws_result);
            }
          } else {
            console.log('instance.GetPasswordData failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    instance_model = new InstanceModel();
    return instance_model;
  });

}).call(this);

(function() {
  define('stack_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var URL, create, export_cloudformation, info, list, parserCreateReturn, parserExportCloudformationReturn, parserInfoReturn, parserListReturn, parserRemoveReturn, parserRenameReturn, parserRunReturn, parserSaveAsReturn, parserSaveReturn, parserVerifyReturn, remove, rename, resolveCreateResult, resolveExportCloudformationResult, resolveInfoResult, resolveListResult, resolveRemoveResult, resolveRenameResult, resolveRunResult, resolveSaveAsResult, resolveSaveResult, resolveVerifyResult, run, save, save_as, send_request, verify;
    URL = '/stack/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("stack." + api_name + " callback is null");
        return false;
      }
      try {
        MC.api({
          url: URL,
          method: api_name,
          data: param_ary,
          success: function(result, return_code) {
            var forge_result;
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            forge_result = {};
            forge_result = parser(result, return_code, param_ary);
            return callback(forge_result);
          },
          error: function(result, return_code) {
            var forge_result;
            forge_result = {};
            forge_result.return_code = return_code;
            forge_result.is_error = true;
            forge_result.error_message = result.toString();
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            forge_result.param = param_ary;
            return callback(forge_result);
          }
        });
      } catch (_error) {
        error = _error;
        console.log("stack." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveCreateResult = function(result) {
      return result;
    };
    parserCreateReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveCreateResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveRemoveResult = function(result) {
      return result;
    };
    parserRemoveReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveRemoveResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveSaveResult = function(result) {
      return result;
    };
    parserSaveReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveSaveResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveRenameResult = function(result) {
      return result;
    };
    parserRenameReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveRenameResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveRunResult = function(result) {
      var stack_run;
      stack_run = {};
      stack_run.id = result[0];
      stack_run.state = result[1];
      stack_run.brief = result[2];
      stack_run.time_submit = result[3];
      stack_run.rid = result[4];
      return stack_run;
    };
    parserRunReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveRunResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveSaveAsResult = function(result) {
      return result;
    };
    parserSaveAsReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveSaveAsResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveInfoResult = function(result) {
      var jsonString;
      if (result[0]) {
        jsonString = JSON.stringify(result[0]);
        if (jsonString.indexOf("InstanceMonitoring") !== -1) {
          jsonString = jsonString.replace(new RegExp('"InstanceMonitoring":"enabled"', "gm"), '"InstanceMonitoring":true');
          jsonString = jsonString.replace(new RegExp('"InstanceMonitoring":"disabled"', "gm"), '"InstanceMonitoring":false');
          result[0] = JSON.parse(jsonString);
        }
      }
      return result;
    };
    parserInfoReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveInfoResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveListResult = function(result) {
      var stack_list, vo, _i, _len;
      stack_list = {};
      for (_i = 0, _len = result.length; _i < _len; _i++) {
        vo = result[_i];
        if (stack_list[vo.region] === void 0) {
          stack_list[vo.region] = [];
        }
        stack_list[vo.region].push(vo);
      }
      return stack_list;
    };
    parserListReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveListResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveExportCloudformationResult = function(result) {
      return result;
    };
    parserExportCloudformationReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveExportCloudformationResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveVerifyResult = function(result) {};
    parserVerifyReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      resolved_data = {
        result: false,
        cause: 'internal error'
      };
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = {
          result: true
        };
      } else if (return_code === constant.RETURN_CODE.E_INVALID) {
        resolved_data = {
          result: false,
          cause: result
        };
        forge_result.is_error = false;
      } else {
        forge_result.is_error = true;
      }
      forge_result.resolved_data = resolved_data;
      return forge_result;
    };
    create = function(src, username, session_id, region_name, spec, callback) {
      send_request("create", src, [username, session_id, region_name, spec], parserCreateReturn, callback);
      return true;
    };
    remove = function(src, username, session_id, region_name, stack_id, stack_name, callback) {
      if (stack_name == null) {
        stack_name = null;
      }
      send_request("remove", src, [username, session_id, region_name, stack_id, stack_name], parserRemoveReturn, callback);
      return true;
    };
    save = function(src, username, session_id, region_name, spec, callback) {
      send_request("save", src, [username, session_id, region_name, spec], parserSaveReturn, callback);
      return true;
    };
    rename = function(src, username, session_id, region_name, stack_id, new_name, stack_name, callback) {
      if (stack_name == null) {
        stack_name = null;
      }
      send_request("rename", src, [username, session_id, region_name, stack_id, new_name, stack_name], parserRenameReturn, callback);
      return true;
    };
    run = function(src, username, session_id, region_name, stack_id, app_name, app_desc, app_component, app_property, app_layout, stack_name, usage, callback) {
      if (app_desc == null) {
        app_desc = null;
      }
      if (app_component == null) {
        app_component = null;
      }
      if (app_property == null) {
        app_property = null;
      }
      if (app_layout == null) {
        app_layout = null;
      }
      if (stack_name == null) {
        stack_name = null;
      }
      if (usage == null) {
        usage = null;
      }
      send_request("run", src, [username, session_id, region_name, stack_id, app_name, app_desc, app_component, app_property, app_layout, stack_name, usage], parserRunReturn, callback);
      return true;
    };
    save_as = function(src, username, session_id, region_name, stack_id, new_name, stack_name, callback) {
      if (stack_name == null) {
        stack_name = null;
      }
      send_request("save_as", src, [username, session_id, region_name, stack_id, new_name, stack_name], parserSaveAsReturn, callback);
      return true;
    };
    info = function(src, username, session_id, region_name, stack_ids, callback) {
      if (stack_ids == null) {
        stack_ids = null;
      }
      send_request("info", src, [username, session_id, region_name, stack_ids], parserInfoReturn, callback);
      return true;
    };
    list = function(src, username, session_id, region_name, stack_ids, callback) {
      if (stack_ids == null) {
        stack_ids = null;
      }
      send_request("list", src, [username, session_id, region_name, stack_ids], parserListReturn, callback);
      return true;
    };
    export_cloudformation = function(src, username, session_id, region_name, stack, callback) {
      send_request("export_cloudformation", src, [username, session_id, region_name, stack], parserExportCloudformationReturn, callback);
      return true;
    };
    verify = function(src, username, session_id, spec, callback) {
      send_request("verify", src, [username, session_id, spec], parserVerifyReturn, callback);
      return true;
    };
    return {
      create: create,
      remove: remove,
      save: save,
      rename: rename,
      run: run,
      save_as: save_as,
      info: info,
      list: list,
      export_cloudformation: export_cloudformation,
      verify: verify
    };
  });

}).call(this);

(function() {
  define('ami_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var CreateImage, DeregisterImage, DescribeImageAttribute, DescribeImages, ModifyImageAttribute, RegisterImage, ResetImageAttribute, URL, parserCreateImageReturn, parserDeregisterImageReturn, parserDescribeImageAttributeReturn, parserDescribeImagesReturn, parserModifyImageAttributeReturn, parserRegisterImageReturn, parserResetImageAttributeReturn, resolveDescribeImageAttributeResult, resolveDescribeImagesResult, send_request;
    URL = '/aws/ec2/ami/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("ami." + api_name + " callback is null");
        return false;
      }
      try {
        MC.api({
          url: URL,
          method: api_name,
          data: param_ary,
          success: function(result, return_code) {
            var aws_result;
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            aws_result = {};
            aws_result = parser(result, return_code, param_ary);
            return callback(aws_result);
          },
          error: function(result, return_code) {
            var aws_result;
            aws_result = {};
            aws_result.return_code = return_code;
            aws_result.is_error = true;
            aws_result.error_message = result.toString();
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            aws_result.param = param_ary;
            return callback(aws_result);
          }
        });
      } catch (_error) {
        error = _error;
        console.log("ami." + api_name + " error:" + error.toString());
      }
      return true;
    };
    parserCreateImageReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserRegisterImageReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserDeregisterImageReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserModifyImageAttributeReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserResetImageAttributeReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    resolveDescribeImageAttributeResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeImageAttributeResponse;
    };
    parserDescribeImageAttributeReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeImageAttributeResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeImagesResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeImagesResponse.imagesSet;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeImagesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeImagesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    CreateImage = function(src, username, session_id, region_name, instance_id, ami_name, ami_desc, no_reboot, bd_mappings, callback) {
      if (ami_desc == null) {
        ami_desc = null;
      }
      if (no_reboot == null) {
        no_reboot = false;
      }
      if (bd_mappings == null) {
        bd_mappings = null;
      }
      send_request("CreateImage", src, [username, session_id, region_name, instance_id, ami_name, ami_desc, no_reboot, bd_mappings], parserCreateImageReturn, callback);
      return true;
    };
    RegisterImage = function(src, username, session_id, region_name, ami_name, ami_desc, callback) {
      if (ami_name == null) {
        ami_name = null;
      }
      if (ami_desc == null) {
        ami_desc = null;
      }
      send_request("RegisterImage", src, [username, session_id, region_name, ami_name, ami_desc], parserRegisterImageReturn, callback);
      return true;
    };
    DeregisterImage = function(src, username, session_id, region_name, ami_id, callback) {
      send_request("DeregisterImage", src, [username, session_id, region_name, ami_id], parserDeregisterImageReturn, callback);
      return true;
    };
    ModifyImageAttribute = function(src, username, session_id, callback) {
      send_request("ModifyImageAttribute", src, [username, session_id], parserModifyImageAttributeReturn, callback);
      return true;
    };
    ResetImageAttribute = function(src, username, session_id, region_name, ami_id, attribute_name, callback) {
      if (attribute_name == null) {
        attribute_name = 'launchPermission';
      }
      send_request("ResetImageAttribute", src, [username, session_id, region_name, ami_id, attribute_name], parserResetImageAttributeReturn, callback);
      return true;
    };
    DescribeImageAttribute = function(src, username, session_id, region_name, ami_id, attribute_name, callback) {
      send_request("DescribeImageAttribute", src, [username, session_id, region_name, ami_id, attribute_name], parserDescribeImageAttributeReturn, callback);
      return true;
    };
    DescribeImages = function(src, username, session_id, region_name, ami_ids, owners, executable_by, filters, callback) {
      if (ami_ids == null) {
        ami_ids = null;
      }
      if (owners == null) {
        owners = null;
      }
      if (executable_by == null) {
        executable_by = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeImages", src, [username, session_id, region_name, ami_ids, owners, executable_by, filters], parserDescribeImagesReturn, callback);
      return true;
    };
    return {
      CreateImage: CreateImage,
      RegisterImage: RegisterImage,
      DeregisterImage: DeregisterImage,
      ModifyImageAttribute: ModifyImageAttribute,
      ResetImageAttribute: ResetImageAttribute,
      DescribeImageAttribute: DescribeImageAttribute,
      DescribeImages: DescribeImages,
      resolveDescribeImagesResult: resolveDescribeImagesResult
    };
  });

}).call(this);

(function() {
  define('ebs_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var AttachVolume, BASE_URL, CreateSnapshot, CreateVolume, DeleteSnapshot, DeleteVolume, DescribeSnapshotAttribute, DescribeSnapshots, DescribeVolumeAttribute, DescribeVolumeStatus, DescribeVolumes, DetachVolume, EnableVolumeIO, ModifySnapshotAttribute, ModifyVolumeAttribute, ResetSnapshotAttribute, parserAttachVolumeReturn, parserCreateSnapshotReturn, parserCreateVolumeReturn, parserDeleteSnapshotReturn, parserDeleteVolumeReturn, parserDescribeSnapshotAttributeReturn, parserDescribeSnapshotsReturn, parserDescribeVolumeAttributeReturn, parserDescribeVolumeStatusReturn, parserDescribeVolumesReturn, parserDetachVolumeReturn, parserEnableVolumeIOReturn, parserModifySnapshotAttributeReturn, parserModifyVolumeAttributeReturn, parserResetSnapshotAttributeReturn, resolveDescribeSnapshotAttributeResult, resolveDescribeSnapshotsResult, resolveDescribeVolumeAttributeResult, resolveDescribeVolumeStatusResult, resolveDescribeVolumesResult, send_request;
    BASE_URL = '/aws/ec2/ebs/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var URL, error;
      if (callback === null) {
        console.log("ebs." + api_name + " callback is null");
        return false;
      }
      try {
        if ((api_name.indexOf("Volume")) !== -1) {
          URL = BASE_URL + "volume/";
        } else if ((api_name.indexOf("Snapshot")) !== -1) {
          URL = BASE_URL + "snapshot/";
        }
        MC.api({
          url: URL,
          method: api_name,
          data: param_ary,
          success: function(result, return_code) {
            var aws_result;
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            aws_result = {};
            aws_result = parser(result, return_code, param_ary);
            return callback(aws_result);
          },
          error: function(result, return_code) {
            var aws_result;
            aws_result = {};
            aws_result.return_code = return_code;
            aws_result.is_error = true;
            aws_result.error_message = result.toString();
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            aws_result.param = param_ary;
            return callback(aws_result);
          }
        });
      } catch (_error) {
        error = _error;
        console.log("ebs." + api_name + " error:" + error.toString());
      }
      return true;
    };
    parserCreateVolumeReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserDeleteVolumeReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserAttachVolumeReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserDetachVolumeReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    resolveDescribeVolumesResult = function(result) {
      result = ($.xml2json($.parseXML(result[1]))).DescribeVolumesResponse.volumeSet;
      if ((result != null ? result.item : void 0) != null) {
        return result.item;
      } else {
        return null;
      }
    };
    parserDescribeVolumesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeVolumesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeVolumeAttributeResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeVolumeAttributeResponse;
    };
    parserDescribeVolumeAttributeReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeVolumeAttributeResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeVolumeStatusResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeVolumeStatusResponse;
    };
    parserDescribeVolumeStatusReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeVolumeStatusResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    parserModifyVolumeAttributeReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserEnableVolumeIOReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserCreateSnapshotReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserDeleteSnapshotReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserModifySnapshotAttributeReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserResetSnapshotAttributeReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    resolveDescribeSnapshotsResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeSnapshotsResponse.snapshotSet;
    };
    parserDescribeSnapshotsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeSnapshotsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeSnapshotAttributeResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeSnapshotAttributeResponse;
    };
    parserDescribeSnapshotAttributeReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeSnapshotAttributeResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    CreateVolume = function(src, username, session_id, region_name, zone_name, snapshot_id, volume_size, volume_type, iops, callback) {
      if (snapshot_id == null) {
        snapshot_id = null;
      }
      if (volume_size == null) {
        volume_size = null;
      }
      if (volume_type == null) {
        volume_type = null;
      }
      if (iops == null) {
        iops = null;
      }
      send_request("CreateVolume", src, [username, session_id, region_name, zone_name, snapshot_id, volume_size, volume_type, iops], parserCreateVolumeReturn, callback);
      return true;
    };
    DeleteVolume = function(src, username, session_id, region_name, volume_id, callback) {
      send_request("DeleteVolume", src, [username, session_id, region_name, volume_id], parserDeleteVolumeReturn, callback);
      return true;
    };
    AttachVolume = function(src, username, session_id, region_name, volume_id, instance_id, device, callback) {
      send_request("AttachVolume", src, [username, session_id, region_name, volume_id, instance_id, device], parserAttachVolumeReturn, callback);
      return true;
    };
    DetachVolume = function(src, username, session_id, region_name, volume_id, instance_id, device, force, callback) {
      if (instance_id == null) {
        instance_id = null;
      }
      if (device == null) {
        device = null;
      }
      if (force == null) {
        force = false;
      }
      send_request("DetachVolume", src, [username, session_id, region_name, volume_id, instance_id, device, force], parserDetachVolumeReturn, callback);
      return true;
    };
    DescribeVolumes = function(src, username, session_id, region_name, volume_ids, filters, callback) {
      if (volume_ids == null) {
        volume_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeVolumes", src, [username, session_id, region_name, volume_ids, filters], parserDescribeVolumesReturn, callback);
      return true;
    };
    DescribeVolumeAttribute = function(src, username, session_id, region_name, volume_id, attribute_name, callback) {
      if (attribute_name == null) {
        attribute_name = 'autoEnableIO';
      }
      send_request("DescribeVolumeAttribute", src, [username, session_id, region_name, volume_id, attribute_name], parserDescribeVolumeAttributeReturn, callback);
      return true;
    };
    DescribeVolumeStatus = function(src, username, session_id, region_name, volume_ids, filters, max_result, next_token, callback) {
      if (filters == null) {
        filters = null;
      }
      if (max_result == null) {
        max_result = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("DescribeVolumeStatus", src, [username, session_id, region_name, volume_ids, filters, max_result, next_token], parserDescribeVolumeStatusReturn, callback);
      return true;
    };
    ModifyVolumeAttribute = function(src, username, session_id, region_name, volume_id, auto_enable_IO, callback) {
      if (auto_enable_IO == null) {
        auto_enable_IO = false;
      }
      send_request("ModifyVolumeAttribute", src, [username, session_id, region_name, volume_id, auto_enable_IO], parserModifyVolumeAttributeReturn, callback);
      return true;
    };
    EnableVolumeIO = function(src, username, session_id, region_name, volume_id, callback) {
      send_request("EnableVolumeIO", src, [username, session_id, region_name, volume_id], parserEnableVolumeIOReturn, callback);
      return true;
    };
    CreateSnapshot = function(src, username, session_id, region_name, volume_id, description, callback) {
      if (description == null) {
        description = null;
      }
      send_request("CreateSnapshot", src, [username, session_id, region_name, volume_id, description], parserCreateSnapshotReturn, callback);
      return true;
    };
    DeleteSnapshot = function(src, username, session_id, region_name, snapshot_id, callback) {
      send_request("DeleteSnapshot", src, [username, session_id, region_name, snapshot_id], parserDeleteSnapshotReturn, callback);
      return true;
    };
    ModifySnapshotAttribute = function(src, username, session_id, region_name, snapshot_id, user_ids, group_names, callback) {
      send_request("ModifySnapshotAttribute", src, [username, session_id, region_name, snapshot_id, user_ids, group_names], parserModifySnapshotAttributeReturn, callback);
      return true;
    };
    ResetSnapshotAttribute = function(src, username, session_id, region_name, snapshot_id, attribute_name, callback) {
      if (attribute_name == null) {
        attribute_name = 'createVolumePermission';
      }
      send_request("ResetSnapshotAttribute", src, [username, session_id, region_name, snapshot_id, attribute_name], parserResetSnapshotAttributeReturn, callback);
      return true;
    };
    DescribeSnapshots = function(src, username, session_id, region_name, snapshot_ids, owners, restorable_by, filters, callback) {
      if (snapshot_ids == null) {
        snapshot_ids = null;
      }
      if (owners == null) {
        owners = null;
      }
      if (restorable_by == null) {
        restorable_by = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeSnapshots", src, [username, session_id, region_name, snapshot_ids, owners, restorable_by, filters], parserDescribeSnapshotsReturn, callback);
      return true;
    };
    DescribeSnapshotAttribute = function(src, username, session_id, region_name, snapshot_id, attribute_name, callback) {
      if (attribute_name == null) {
        attribute_name = 'createVolumePermission';
      }
      send_request("DescribeSnapshotAttribute", src, [username, session_id, region_name, snapshot_id, attribute_name], parserDescribeSnapshotAttributeReturn, callback);
      return true;
    };
    return {
      CreateVolume: CreateVolume,
      DeleteVolume: DeleteVolume,
      AttachVolume: AttachVolume,
      DetachVolume: DetachVolume,
      DescribeVolumes: DescribeVolumes,
      DescribeVolumeAttribute: DescribeVolumeAttribute,
      DescribeVolumeStatus: DescribeVolumeStatus,
      ModifyVolumeAttribute: ModifyVolumeAttribute,
      EnableVolumeIO: EnableVolumeIO,
      CreateSnapshot: CreateSnapshot,
      DeleteSnapshot: DeleteSnapshot,
      ModifySnapshotAttribute: ModifySnapshotAttribute,
      ResetSnapshotAttribute: ResetSnapshotAttribute,
      DescribeSnapshots: DescribeSnapshots,
      DescribeSnapshotAttribute: DescribeSnapshotAttribute,
      resolveDescribeVolumesResult: resolveDescribeVolumesResult,
      resolveDescribeSnapshotsResult: resolveDescribeSnapshotsResult
    };
  });

}).call(this);

(function() {
  define('customergateway_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeCustomerGateways, URL, parserDescribeCustomerGatewaysReturn, resolveDescribeCustomerGatewaysResult, send_request;
    URL = '/aws/vpc/cgw/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("customergateway." + api_name + " callback is null");
        return false;
      }
      try {
        MC.api({
          url: URL,
          method: api_name,
          data: param_ary,
          success: function(result, return_code) {
            var aws_result;
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            aws_result = {};
            aws_result = parser(result, return_code, param_ary);
            return callback(aws_result);
          },
          error: function(result, return_code) {
            var aws_result;
            aws_result = {};
            aws_result.return_code = return_code;
            aws_result.is_error = true;
            aws_result.error_message = result.toString();
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            aws_result.param = param_ary;
            return callback(aws_result);
          }
        });
      } catch (_error) {
        error = _error;
        console.log("customergateway." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeCustomerGatewaysResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeCustomerGatewaysResponse.customerGatewaySet;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeCustomerGatewaysReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeCustomerGatewaysResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeCustomerGateways = function(src, username, session_id, region_name, gw_ids, filters, callback) {
      if (gw_ids == null) {
        gw_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeCustomerGateways", src, [username, session_id, region_name, gw_ids, filters], parserDescribeCustomerGatewaysReturn, callback);
      return true;
    };
    return {
      DescribeCustomerGateways: DescribeCustomerGateways,
      resolveDescribeCustomerGatewaysResult: resolveDescribeCustomerGatewaysResult
    };
  });

}).call(this);


define("service/service", function(){});
