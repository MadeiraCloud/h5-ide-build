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
  define('account_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var URL, apply_trial, check_repeat, check_validation, is_invitated, parserApplyTrialReturn, parserCheckRepeatReturn, parserCheckValidationReturn, parserIsInvitatedReturn, parserRegisterReturn, parserResetKeyReturn, parserResetPasswordReturn, parserUpdateAccountReturn, parserUpdatePasswordReturn, register, reset_key, reset_password, resolveApplyTrialResult, resolveCheckRepeatResult, resolveCheckValidationResult, resolveIsInvitatedResult, resolveRegisterResult, resolveResetKeyResult, resolveResetPasswordResult, resolveUpdateAccountResult, resolveUpdatePasswordResult, send_request, update_account, update_password;
    URL = '/account/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("account." + api_name + " callback is null");
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
        console.log("account." + method + " error:" + error.toString());
      }
      return true;
    };
    resolveRegisterResult = function(result) {
      var session_info;
      session_info = {};
      session_info.usercode = result[0];
      session_info.email = result[1];
      session_info.session_id = result[2];
      session_info.account_id = result[3];
      session_info.mod_repo = result[4];
      session_info.mod_tag = result[5];
      session_info.state = result[6];
      session_info.has_cred = result[7];
      session_info.is_invitated = result[8];
      return session_info;
    };
    parserRegisterReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveRegisterResult(result);
        forge_result.resolved_data = resolved_data;
      } else if (return_code === constant.RETURN_CODE.E_EXIST) {
        resolved_data = result;
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveUpdateAccountResult = function(result) {
      return result;
    };
    parserUpdateAccountReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveUpdateAccountResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveResetPasswordResult = function(result) {
      return result;
    };
    parserResetPasswordReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveResetPasswordResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveUpdatePasswordResult = function(result) {
      return result;
    };
    parserUpdatePasswordReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveUpdatePasswordResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveCheckRepeatResult = function(result) {
      return result;
    };
    parserCheckRepeatReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveCheckRepeatResult(result);
        forge_result.resolved_data = resolved_data;
      } else if (return_code === constant.RETURN_CODE.E_EXIST) {
        resolved_data = result;
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveCheckValidationResult = function(result) {
      return result;
    };
    parserCheckValidationReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveCheckValidationResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveResetKeyResult = function(result) {
      return result;
    };
    parserResetKeyReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveResetKeyResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveIsInvitatedResult = function(result) {};
    parserIsInvitatedReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveIsInvitatedResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveApplyTrialResult = function(result) {};
    parserApplyTrialReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveApplyTrialResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    register = function(src, username, password, email, callback) {
      send_request("register", src, [username, password, email], parserRegisterReturn, callback);
      return true;
    };
    update_account = function(src, username, session_id, attributes, callback) {
      send_request("update_account", src, [username, session_id, attributes], parserUpdateAccountReturn, callback);
      return true;
    };
    reset_password = function(src, username, callback) {
      send_request("reset_password", src, [username], parserResetPasswordReturn, callback);
      return true;
    };
    update_password = function(src, id, new_pwd, callback) {
      send_request("update_password", src, [id, new_pwd], parserUpdatePasswordReturn, callback);
      return true;
    };
    check_repeat = function(src, username, email, callback) {
      send_request("check_repeat", src, [username, email], parserCheckRepeatReturn, callback);
      return true;
    };
    check_validation = function(src, key, flag, callback) {
      send_request("check_validation", src, [key, flag], parserCheckValidationReturn, callback);
      return true;
    };
    reset_key = function(src, username, session_id, flag, callback) {
      if (flag == null) {
        flag = null;
      }
      send_request("reset_key", src, [username, session_id, flag], parserResetKeyReturn, callback);
      return true;
    };
    is_invitated = function(src, username, session_id, callback) {
      send_request("is_invitated", src, [username, session_id], parserIsInvitatedReturn, callback);
      return true;
    };
    apply_trial = function(src, username, session_id, message, callback) {
      if (message == null) {
        message = null;
      }
      send_request("apply_trial", src, [username, session_id, message], parserApplyTrialReturn, callback);
      return true;
    };
    return {
      register: register,
      update_account: update_account,
      reset_password: reset_password,
      update_password: update_password,
      check_repeat: check_repeat,
      check_validation: check_validation,
      reset_key: reset_key,
      is_invitated: is_invitated,
      apply_trial: apply_trial
    };
  });

}).call(this);

(function() {
  define('account_model',['backbone', 'underscore', 'account_service', 'base_model'], function(Backbone, _, account_service, base_model) {
    var AccountModel, account_model;
    AccountModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      update_account: function(src, username, session_id, attributes) {
        var me;
        me = this;
        src.model = me;
        return account_service.update_account(src, username, session_id, attributes, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ACCOUNT_UPDATE__ACCOUNT_RETURN', forge_result);
            }
          } else {
            console.log('account.update_account failed, error is ' + forge_result.error_message);
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ACCOUNT_UPDATE__ACCOUNT_RETURN', forge_result);
            }
          }
        });
      },
      reset_key: function(src, username, session_id, flag) {
        var me;
        me = this;
        src.model = me;
        return account_service.reset_key(src, username, session_id, flag, function(forge_result) {
          if (!forge_result.is_error) {

          } else {
            console.log('account.reset_key failed, error is ' + forge_result.error_message);
            me.pub(forge_result);
          }
          if (src.sender && src.sender.trigger) {
            return src.sender.trigger('ACCOUNT_RESET__KEY_RETURN', forge_result);
          }
        });
      }
    });
    account_model = new AccountModel();
    return account_model;
  });

}).call(this);

(function() {
  define('favorite_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var URL, add, info, parserAddReturn, parserInfoReturn, parserRemoveReturn, remove, resolveAddResult, resolveInfoResult, resolveRemoveResult, send_request;
    URL = '/favorite/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("favorite." + api_name + " callback is null");
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
        console.log("favorite." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveAddResult = function(result) {};
    parserAddReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveAddResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveRemoveResult = function(result) {};
    parserRemoveReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveRemoveResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveInfoResult = function(result) {
      var favorite_list, res, resource_info, _i, _len;
      favorite_list = [];
      for (_i = 0, _len = result.length; _i < _len; _i++) {
        res = result[_i];
        resource_info = {};
        resource_info.usercode = res['username'];
        resource_info.region = res['region'];
        resource_info.provider = res['provider'];
        resource_info.service = res['service'];
        resource_info.resource_type = res['resource'];
        resource_info.resource_id = res['id'];
        resource_info.resource_info = res['amiVO'];
        favorite_list.push(resource_info);
      }
      return favorite_list;
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
    add = function(src, username, session_id, region_name, resource, callback) {
      send_request("add", src, [username, session_id, region_name, resource], parserAddReturn, callback);
      return true;
    };
    remove = function(src, username, session_id, region_name, resource_ids, callback) {
      send_request("remove", src, [username, session_id, region_name, resource_ids], parserRemoveReturn, callback);
      return true;
    };
    info = function(src, username, session_id, region_name, provider, service, resource, callback) {
      if (provider == null) {
        provider = 'AWS';
      }
      if (service == null) {
        service = 'EC2';
      }
      if (resource == null) {
        resource = 'AMI';
      }
      send_request("info", src, [username, session_id, region_name, provider, service, resource], parserInfoReturn, callback);
      return true;
    };
    return {
      add: add,
      remove: remove,
      info: info
    };
  });

}).call(this);

(function() {
  define('favorite_model',['backbone', 'underscore', 'favorite_service', 'base_model'], function(Backbone, _, favorite_service, base_model) {
    var FavoriteModel, favorite_model;
    FavoriteModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      add: function(src, username, session_id, region_name, resource) {
        var me;
        me = this;
        src.model = me;
        return favorite_service.add(src, username, session_id, region_name, resource, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('FAVORITE_ADD_RETURN', forge_result);
            }
          } else {
            console.log('favorite.add failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      remove: function(src, username, session_id, region_name, resource_ids) {
        var me;
        me = this;
        src.model = me;
        return favorite_service.remove(src, username, session_id, region_name, resource_ids, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('FAVORITE_REMOVE_RETURN', forge_result);
            }
          } else {
            console.log('favorite.remove failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      info: function(src, username, session_id, region_name, provider, service, resource) {
        var me;
        if (provider == null) {
          provider = 'AWS';
        }
        if (service == null) {
          service = 'EC2';
        }
        if (resource == null) {
          resource = 'AMI';
        }
        me = this;
        src.model = me;
        return favorite_service.info(src, username, session_id, region_name, provider, service, resource, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('FAVORITE_INFO_RETURN', forge_result);
            }
          } else {
            return console.log('favorite.info failed, error is ' + forge_result.error_message);
          }
        });
      }
    });
    favorite_model = new FavoriteModel();
    return favorite_model;
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
  define('eip_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var AllocateAddress, AssociateAddress, DescribeAddresses, DisassociateAddress, ReleaseAddress, URL, parserAllocateAddressReturn, parserAssociateAddressReturn, parserDescribeAddressesReturn, parserDisassociateAddressReturn, parserReleaseAddressReturn, resolveDescribeAddressesResult, send_request;
    URL = '/aws/ec2/elasticip/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("eip." + api_name + " callback is null");
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
        console.log("eip." + api_name + " error:" + error.toString());
      }
      return true;
    };
    parserAllocateAddressReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserReleaseAddressReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserAssociateAddressReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserDisassociateAddressReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    resolveDescribeAddressesResult = function(result) {
      result = ($.xml2json($.parseXML(result[1]))).DescribeAddressesResponse.addressesSet;
      if ((result != null ? result.item : void 0) != null) {
        return result.item;
      } else {
        return null;
      }
    };
    parserDescribeAddressesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeAddressesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    AllocateAddress = function(src, username, session_id, region_name, domain, callback) {
      if (domain == null) {
        domain = null;
      }
      send_request("AllocateAddress", src, [username, session_id, region_name, domain], parserAllocateAddressReturn, callback);
      return true;
    };
    ReleaseAddress = function(src, username, session_id, region_name, ip, allocation_id, callback) {
      if (ip == null) {
        ip = null;
      }
      if (allocation_id == null) {
        allocation_id = null;
      }
      send_request("ReleaseAddress", src, [username, session_id, region_name, ip, allocation_id], parserReleaseAddressReturn, callback);
      return true;
    };
    AssociateAddress = function(src, username, callback) {
      send_request("AssociateAddress", src, [username], parserAssociateAddressReturn, callback);
      return true;
    };
    DisassociateAddress = function(src, username, session_id, region_name, ip, association_id, callback) {
      if (ip == null) {
        ip = null;
      }
      if (association_id == null) {
        association_id = null;
      }
      send_request("DisassociateAddress", src, [username, session_id, region_name, ip, association_id], parserDisassociateAddressReturn, callback);
      return true;
    };
    DescribeAddresses = function(src, username, session_id, region_name, ips, allocation_ids, filters, callback) {
      if (ips == null) {
        ips = null;
      }
      if (allocation_ids == null) {
        allocation_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeAddresses", src, [username, session_id, region_name, ips, allocation_ids, filters], parserDescribeAddressesReturn, callback);
      return true;
    };
    return {
      AllocateAddress: AllocateAddress,
      ReleaseAddress: ReleaseAddress,
      AssociateAddress: AssociateAddress,
      DisassociateAddress: DisassociateAddress,
      DescribeAddresses: DescribeAddresses,
      resolveDescribeAddressesResult: resolveDescribeAddressesResult
    };
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
  define('securitygroup_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var AuthorizeSecurityGroupIngress, CreateSecurityGroup, DeleteSecurityGroup, DescribeSecurityGroups, RevokeSecurityGroupIngress, URL, parserAuthorizeSecurityGroupIngressReturn, parserCreateSecurityGroupReturn, parserDeleteSecurityGroupReturn, parserDescribeSecurityGroupsReturn, parserRevokeSecurityGroupIngressReturn, resolveDescribeSecurityGroupsResult, send_request;
    URL = '/aws/ec2/securitygroup/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("securitygroup." + api_name + " callback is null");
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
        console.log("securitygroup." + api_name + " error:" + error.toString());
      }
      return true;
    };
    parserCreateSecurityGroupReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserDeleteSecurityGroupReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserAuthorizeSecurityGroupIngressReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserRevokeSecurityGroupIngressReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    resolveDescribeSecurityGroupsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeSecurityGroupsResponse.securityGroupInfo;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeSecurityGroupsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeSecurityGroupsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    CreateSecurityGroup = function(src, username, session_id, region_name, group_name, group_desc, vpc_id, callback) {
      if (vpc_id == null) {
        vpc_id = null;
      }
      send_request("CreateSecurityGroup", src, [username, session_id, region_name, group_name, group_desc, vpc_id], parserCreateSecurityGroupReturn, callback);
      return true;
    };
    DeleteSecurityGroup = function(src, username, session_id, region_name, group_name, group_id, callback) {
      if (group_name == null) {
        group_name = null;
      }
      if (group_id == null) {
        group_id = null;
      }
      send_request("DeleteSecurityGroup", src, [username, session_id, region_name, group_name, group_id], parserDeleteSecurityGroupReturn, callback);
      return true;
    };
    AuthorizeSecurityGroupIngress = function(src, username, session_id, callback) {
      send_request("AuthorizeSecurityGroupIngress", src, [username, session_id], parserAuthorizeSecurityGroupIngressReturn, callback);
      return true;
    };
    RevokeSecurityGroupIngress = function(src, username, session_id, callback) {
      send_request("RevokeSecurityGroupIngress", src, [username, session_id], parserRevokeSecurityGroupIngressReturn, callback);
      return true;
    };
    DescribeSecurityGroups = function(src, username, session_id, region_name, group_names, group_ids, filters, callback) {
      if (group_names == null) {
        group_names = null;
      }
      if (group_ids == null) {
        group_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeSecurityGroups", src, [username, session_id, region_name, group_names, group_ids, filters], parserDescribeSecurityGroupsReturn, callback);
      return true;
    };
    return {
      CreateSecurityGroup: CreateSecurityGroup,
      DeleteSecurityGroup: DeleteSecurityGroup,
      AuthorizeSecurityGroupIngress: AuthorizeSecurityGroupIngress,
      RevokeSecurityGroupIngress: RevokeSecurityGroupIngress,
      DescribeSecurityGroups: DescribeSecurityGroups,
      resolveDescribeSecurityGroupsResult: resolveDescribeSecurityGroupsResult
    };
  });

}).call(this);

(function() {
  define('elb_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeInstanceHealth, DescribeLoadBalancerAttributes, DescribeLoadBalancerPolicies, DescribeLoadBalancerPolicyTypes, DescribeLoadBalancers, URL, parserDescribeInstanceHealthReturn, parserDescribeLoadBalancerAttributesReturn, parserDescribeLoadBalancerPoliciesReturn, parserDescribeLoadBalancerPolicyTypesReturn, parserDescribeLoadBalancersReturn, resolveDescribeInstanceHealthResult, resolveDescribeLoadBalancerAttributesResult, resolveDescribeLoadBalancerPoliciesResult, resolveDescribeLoadBalancerPolicyTypesResult, resolveDescribeLoadBalancersResult, send_request;
    URL = '/aws/elb/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("elb." + api_name + " callback is null");
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
        console.log("elb." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeInstanceHealthResult = function(result) {
      var instance_state, result_set, tmp;
      instance_state = ($.xml2json($.parseXML(result[1]))).DescribeInstanceHealthResponse.DescribeInstanceHealthResult.InstanceStates;
      result_set = instance_state && 'member' in instance_state ? instance_state.member : null;
      if ($.type(result_set) === "object") {
        tmp = [];
        tmp.push(result_set);
        result_set = tmp;
      }
      return result_set;
    };
    parserDescribeInstanceHealthReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeInstanceHealthResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeLoadBalancerPoliciesResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeLoadBalancerPoliciesResponse.DescribeLoadBalancerPoliciesResult.PolicyDescriptions;
    };
    parserDescribeLoadBalancerPoliciesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeLoadBalancerPoliciesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeLoadBalancerPolicyTypesResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeLoadBalancerPolicyTypesResponse.DescribeLoadBalancerPolicyTypesResult.PolicyTypeDescriptions;
    };
    parserDescribeLoadBalancerPolicyTypesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeLoadBalancerPolicyTypesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeLoadBalancersResult = function(result) {
      var result_set, tmp;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeLoadBalancersResponse.DescribeLoadBalancersResult.LoadBalancerDescriptions;
      if (result_set) {
        if ($.type(result_set.member) === "object") {
          tmp = result_set.member;
          result_set = [];
          result_set.push(tmp);
        } else {
          result_set = result_set.member;
        }
      }
      return result_set;
    };
    parserDescribeLoadBalancersReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeLoadBalancersResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeLoadBalancerAttributesResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeLoadBalancerAttributesResponse.DescribeLoadBalancerAttributesResult.LoadBalancerAttributes;
      return result_set;
    };
    parserDescribeLoadBalancerAttributesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeLoadBalancerAttributesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeInstanceHealth = function(src, username, session_id, region_name, elb_name, instance_ids, callback) {
      if (instance_ids == null) {
        instance_ids = null;
      }
      send_request("DescribeInstanceHealth", src, [username, session_id, region_name, elb_name, instance_ids], parserDescribeInstanceHealthReturn, callback);
      return true;
    };
    DescribeLoadBalancerPolicies = function(src, username, session_id, region_name, elb_name, policy_names, callback) {
      if (elb_name == null) {
        elb_name = null;
      }
      if (policy_names == null) {
        policy_names = null;
      }
      send_request("DescribeLoadBalancerPolicies", src, [username, session_id, region_name, elb_name, policy_names], parserDescribeLoadBalancerPoliciesReturn, callback);
      return true;
    };
    DescribeLoadBalancerPolicyTypes = function(src, username, session_id, region_name, policy_type_names, callback) {
      if (policy_type_names == null) {
        policy_type_names = null;
      }
      send_request("DescribeLoadBalancerPolicyTypes", src, [username, session_id, region_name, policy_type_names], parserDescribeLoadBalancerPolicyTypesReturn, callback);
      return true;
    };
    DescribeLoadBalancers = function(src, username, session_id, region_name, elb_names, marker, callback) {
      if (elb_names == null) {
        elb_names = null;
      }
      if (marker == null) {
        marker = null;
      }
      send_request("DescribeLoadBalancers", src, [username, session_id, region_name, elb_names, marker], parserDescribeLoadBalancersReturn, callback);
      return true;
    };
    DescribeLoadBalancerAttributes = function(src, username, session_id, region_name, elb_name, callback) {
      send_request("DescribeLoadBalancerAttributes", src, [username, session_id, region_name, elb_name], parserDescribeLoadBalancerAttributesReturn, callback);
      return true;
    };
    return {
      DescribeInstanceHealth: DescribeInstanceHealth,
      DescribeLoadBalancerPolicies: DescribeLoadBalancerPolicies,
      DescribeLoadBalancerPolicyTypes: DescribeLoadBalancerPolicyTypes,
      DescribeLoadBalancers: DescribeLoadBalancers,
      DescribeLoadBalancerAttributes: DescribeLoadBalancerAttributes,
      resolveDescribeLoadBalancersResult: resolveDescribeLoadBalancersResult,
      resolveDescribeInstanceHealthResult: resolveDescribeInstanceHealthResult,
      resolveDescribeLoadBalancerAttributesResult: resolveDescribeLoadBalancerAttributesResult
    };
  });

}).call(this);

(function() {
  define('iam_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var GetServerCertificate, ListServerCertificates, URL, parserGetServerCertificateReturn, parserListServerCertificatesReturn, resolveGetServerCertificateResult, resolveListServerCertificatesResult, send_request;
    URL = '/aws/iam/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("iam." + api_name + " callback is null");
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
        console.log("iam." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveGetServerCertificateResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).GetServerCertificateResponse.GetServerCertificateResult;
    };
    parserGetServerCertificateReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveGetServerCertificateResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveListServerCertificatesResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).ListServerCertificatesResponse.ListServerCertificatesResult;
    };
    parserListServerCertificatesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveListServerCertificatesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    GetServerCertificate = function(src, username, session_id, region_name, servercer_name, callback) {
      send_request("GetServerCertificate", src, [username, session_id, region_name, servercer_name], parserGetServerCertificateReturn, callback);
      return true;
    };
    ListServerCertificates = function(src, username, session_id, region_name, marker, max_items, path_prefix, callback) {
      if (marker == null) {
        marker = null;
      }
      if (max_items == null) {
        max_items = null;
      }
      if (path_prefix == null) {
        path_prefix = null;
      }
      send_request("ListServerCertificates", src, [username, session_id, region_name, marker, max_items, path_prefix], parserListServerCertificatesReturn, callback);
      return true;
    };
    return {
      GetServerCertificate: GetServerCertificate,
      ListServerCertificates: ListServerCertificates
    };
  });

}).call(this);

(function() {
  define('acl_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeNetworkAcls, URL, parserDescribeNetworkAclsReturn, resolveDescribeNetworkAclsResult, send_request;
    URL = '/aws/vpc/acl/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("acl." + api_name + " callback is null");
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
        console.log("acl." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeNetworkAclsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeNetworkAclsResponse.networkAclSet;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeNetworkAclsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeNetworkAclsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeNetworkAcls = function(src, username, session_id, region_name, acl_ids, filters, callback) {
      if (acl_ids == null) {
        acl_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeNetworkAcls", src, [username, session_id, region_name, acl_ids, filters], parserDescribeNetworkAclsReturn, callback);
      return true;
    };
    return {
      DescribeNetworkAcls: DescribeNetworkAcls,
      resolveDescribeNetworkAclsResult: resolveDescribeNetworkAclsResult
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

(function() {
  define('dhcp_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeDhcpOptions, URL, parserDescribeDhcpOptionsReturn, resolveDescribeDhcpOptionsResult, send_request;
    URL = '/aws/vpc/dhcp/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("dhcp." + api_name + " callback is null");
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
        console.log("dhcp." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeDhcpOptionsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeDhcpOptionsResponse.dhcpOptionsSet;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeDhcpOptionsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeDhcpOptionsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeDhcpOptions = function(src, username, session_id, region_name, dhcp_ids, filters, callback) {
      if (dhcp_ids == null) {
        dhcp_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeDhcpOptions", src, [username, session_id, region_name, dhcp_ids, filters], parserDescribeDhcpOptionsReturn, callback);
      return true;
    };
    return {
      DescribeDhcpOptions: DescribeDhcpOptions,
      resolveDescribeDhcpOptionsResult: resolveDescribeDhcpOptionsResult
    };
  });

}).call(this);

(function() {
  define('eni_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeNetworkInterfaceAttribute, DescribeNetworkInterfaces, URL, parserDescribeNetworkInterfaceAttributeReturn, parserDescribeNetworkInterfacesReturn, resolveDescribeNetworkInterfaceAttributeResult, resolveDescribeNetworkInterfacesResult, send_request;
    URL = '/aws/vpc/eni/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("eni." + api_name + " callback is null");
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
        console.log("eni." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeNetworkInterfacesResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeNetworkInterfacesResponse.networkInterfaceSet;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeNetworkInterfacesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeNetworkInterfacesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeNetworkInterfaceAttributeResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeNetworkInterfaceAttributeResponse;
    };
    parserDescribeNetworkInterfaceAttributeReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeNetworkInterfaceAttributeResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeNetworkInterfaces = function(src, username, session_id, region_name, eni_ids, filters, callback) {
      if (eni_ids == null) {
        eni_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeNetworkInterfaces", src, [username, session_id, region_name, eni_ids, filters], parserDescribeNetworkInterfacesReturn, callback);
      return true;
    };
    DescribeNetworkInterfaceAttribute = function(src, username, session_id, region_name, eni_id, attribute, callback) {
      send_request("DescribeNetworkInterfaceAttribute", src, [username, session_id, region_name, eni_id, attribute], parserDescribeNetworkInterfaceAttributeReturn, callback);
      return true;
    };
    return {
      DescribeNetworkInterfaces: DescribeNetworkInterfaces,
      DescribeNetworkInterfaceAttribute: DescribeNetworkInterfaceAttribute,
      resolveDescribeNetworkInterfacesResult: resolveDescribeNetworkInterfacesResult
    };
  });

}).call(this);

(function() {
  define('internetgateway_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeInternetGateways, URL, parserDescribeInternetGatewaysReturn, resolveDescribeInternetGatewaysResult, send_request;
    URL = '/aws/vpc/igw/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("internetgateway." + api_name + " callback is null");
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
        console.log("internetgateway." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeInternetGatewaysResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeInternetGatewaysResponse.internetGatewaySet;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeInternetGatewaysReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeInternetGatewaysResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeInternetGateways = function(src, username, session_id, region_name, gw_ids, filters, callback) {
      if (gw_ids == null) {
        gw_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeInternetGateways", src, [username, session_id, region_name, gw_ids, filters], parserDescribeInternetGatewaysReturn, callback);
      return true;
    };
    return {
      DescribeInternetGateways: DescribeInternetGateways,
      resolveDescribeInternetGatewaysResult: resolveDescribeInternetGatewaysResult
    };
  });

}).call(this);

(function() {
  define('routetable_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeRouteTables, URL, parserDescribeRouteTablesReturn, resolveDescribeRouteTablesResult, send_request;
    URL = '/aws/vpc/routetable/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("routetable." + api_name + " callback is null");
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
        console.log("routetable." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeRouteTablesResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeRouteTablesResponse.routeTableSet;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeRouteTablesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeRouteTablesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeRouteTables = function(src, username, session_id, region_name, rt_ids, filters, callback) {
      if (rt_ids == null) {
        rt_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeRouteTables", src, [username, session_id, region_name, rt_ids, filters], parserDescribeRouteTablesReturn, callback);
      return true;
    };
    return {
      DescribeRouteTables: DescribeRouteTables,
      resolveDescribeRouteTablesResult: resolveDescribeRouteTablesResult
    };
  });

}).call(this);

(function() {
  define('autoscaling_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeAdjustmentTypes, DescribeAutoScalingGroups, DescribeAutoScalingInstances, DescribeAutoScalingNotificationTypes, DescribeLaunchConfigurations, DescribeMetricCollectionTypes, DescribeNotificationConfigurations, DescribePolicies, DescribeScalingActivities, DescribeScalingProcessTypes, DescribeScheduledActions, DescribeTags, URL, parserDescribeAdjustmentTypesReturn, parserDescribeAutoScalingGroupsReturn, parserDescribeAutoScalingInstancesReturn, parserDescribeAutoScalingNotificationTypesReturn, parserDescribeLaunchConfigurationsReturn, parserDescribeMetricCollectionTypesReturn, parserDescribeNotificationConfigurationsReturn, parserDescribePoliciesReturn, parserDescribeScalingActivitiesReturn, parserDescribeScalingProcessTypesReturn, parserDescribeScheduledActionsReturn, parserDescribeTagsReturn, resolveDescribeAdjustmentTypesResult, resolveDescribeAutoScalingGroupsResult, resolveDescribeAutoScalingInstancesResult, resolveDescribeAutoScalingNotificationTypesResult, resolveDescribeLaunchConfigurationsResult, resolveDescribeMetricCollectionTypesResult, resolveDescribeNotificationConfigurationsResult, resolveDescribePoliciesResult, resolveDescribeScalingActivitiesResult, resolveDescribeScalingProcessTypesResult, resolveDescribeScheduledActionsResult, resolveDescribeTagsResult, send_request;
    URL = '/aws/autoscaling/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("autoscaling." + api_name + " callback is null");
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
        console.log("autoscaling." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeAdjustmentTypesResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeAdjustmentTypesResponse;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribeAdjustmentTypesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeAdjustmentTypesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeAutoScalingGroupsResult = function(result) {
      var i, result_set, _i, _len, _ref;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeAutoScalingGroupsResponse.DescribeAutoScalingGroupsResult.AutoScalingGroups;
      if ((result_set != null ? result_set.member : void 0) != null) {
        _ref = result_set.member;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (!i.Instances) {
            i.Instances = {
              member: []
            };
          } else if (!i.Instances.member) {
            i.Instances.member = [];
          }
        }
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribeAutoScalingGroupsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeAutoScalingGroupsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeAutoScalingInstancesResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeAutoScalingInstancesResponse.DescribeAutoScalingInstancesResult.AutoScalingInstances;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribeAutoScalingInstancesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeAutoScalingInstancesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeAutoScalingNotificationTypesResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeAutoScalingNotificationTypesResponse;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribeAutoScalingNotificationTypesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeAutoScalingNotificationTypesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeLaunchConfigurationsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeLaunchConfigurationsResponse.DescribeLaunchConfigurationsResult.LaunchConfigurations;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribeLaunchConfigurationsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeLaunchConfigurationsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeMetricCollectionTypesResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeMetricCollectionTypesResponse;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribeMetricCollectionTypesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeMetricCollectionTypesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeNotificationConfigurationsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeNotificationConfigurationsResponse.DescribeNotificationConfigurationsResult.NotificationConfigurations;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribeNotificationConfigurationsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeNotificationConfigurationsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribePoliciesResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribePoliciesResponse.DescribePoliciesResult.ScalingPolicies;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribePoliciesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribePoliciesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeScalingActivitiesResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeScalingActivitiesResponse.DescribeScalingActivitiesResult.Activities;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribeScalingActivitiesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeScalingActivitiesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeScalingProcessTypesResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeScalingProcessTypesResponse.DescribeScalingProcessTypesResult;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribeScalingProcessTypesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeScalingProcessTypesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeScheduledActionsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeScheduledActionsResponse.DescribeScheduledActionsResult.ScheduledUpdateGroupActions;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribeScheduledActionsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeScheduledActionsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeTagsResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeTagsResponse;
    };
    parserDescribeTagsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeTagsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeAdjustmentTypes = function(src, username, session_id, region_name, callback) {
      send_request("DescribeAdjustmentTypes", src, [username, session_id, region_name], parserDescribeAdjustmentTypesReturn, callback);
      return true;
    };
    DescribeAutoScalingGroups = function(src, username, session_id, region_name, group_names, max_records, next_token, callback) {
      if (group_names == null) {
        group_names = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("DescribeAutoScalingGroups", src, [username, session_id, region_name, group_names, max_records, next_token], parserDescribeAutoScalingGroupsReturn, callback);
      return true;
    };
    DescribeAutoScalingInstances = function(src, username, session_id, region_name, instance_ids, max_records, next_token, callback) {
      if (instance_ids == null) {
        instance_ids = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("DescribeAutoScalingInstances", src, [username, session_id, region_name, instance_ids, max_records, next_token], parserDescribeAutoScalingInstancesReturn, callback);
      return true;
    };
    DescribeAutoScalingNotificationTypes = function(src, username, session_id, region_name, callback) {
      send_request("DescribeAutoScalingNotificationTypes", src, [username, session_id, region_name], parserDescribeAutoScalingNotificationTypesReturn, callback);
      return true;
    };
    DescribeLaunchConfigurations = function(src, username, session_id, region_name, config_names, max_records, next_token, callback) {
      if (config_names == null) {
        config_names = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("DescribeLaunchConfigurations", src, [username, session_id, region_name, config_names, max_records, next_token], parserDescribeLaunchConfigurationsReturn, callback);
      return true;
    };
    DescribeMetricCollectionTypes = function(src, username, session_id, region_name, callback) {
      send_request("DescribeMetricCollectionTypes", src, [username, session_id, region_name], parserDescribeMetricCollectionTypesReturn, callback);
      return true;
    };
    DescribeNotificationConfigurations = function(src, username, session_id, region_name, group_names, max_records, next_token, callback) {
      if (group_names == null) {
        group_names = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("DescribeNotificationConfigurations", src, [username, session_id, region_name, group_names, max_records, next_token], parserDescribeNotificationConfigurationsReturn, callback);
      return true;
    };
    DescribePolicies = function(src, username, session_id, region_name, group_name, policy_names, max_records, next_token, callback) {
      if (group_name == null) {
        group_name = null;
      }
      if (policy_names == null) {
        policy_names = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("DescribePolicies", src, [username, session_id, region_name, group_name, policy_names, max_records, next_token], parserDescribePoliciesReturn, callback);
      return true;
    };
    DescribeScalingActivities = function(src, username, session_id, region_name, group_name, activity_ids, max_records, next_token, callback) {
      if (group_name == null) {
        group_name = null;
      }
      if (activity_ids == null) {
        activity_ids = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("DescribeScalingActivities", src, [username, session_id, region_name, group_name, activity_ids, max_records, next_token], parserDescribeScalingActivitiesReturn, callback);
      return true;
    };
    DescribeScalingProcessTypes = function(src, username, session_id, region_name, callback) {
      send_request("DescribeScalingProcessTypes", src, [username, session_id, region_name], parserDescribeScalingProcessTypesReturn, callback);
      return true;
    };
    DescribeScheduledActions = function(src, username, session_id, region_name, group_name, action_names, start_time, end_time, max_records, next_token, callback) {
      if (group_name == null) {
        group_name = null;
      }
      if (action_names == null) {
        action_names = null;
      }
      if (start_time == null) {
        start_time = null;
      }
      if (end_time == null) {
        end_time = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("DescribeScheduledActions", src, [username, session_id, region_name, group_name, action_names, start_time, end_time, max_records, next_token], parserDescribeScheduledActionsReturn, callback);
      return true;
    };
    DescribeTags = function(src, username, session_id, region_name, filters, max_records, next_token, callback) {
      if (filters == null) {
        filters = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("DescribeTags", src, [username, session_id, region_name, filters, max_records, next_token], parserDescribeTagsReturn, callback);
      return true;
    };
    return {
      DescribeAdjustmentTypes: DescribeAdjustmentTypes,
      DescribeAutoScalingGroups: DescribeAutoScalingGroups,
      DescribeAutoScalingInstances: DescribeAutoScalingInstances,
      DescribeAutoScalingNotificationTypes: DescribeAutoScalingNotificationTypes,
      DescribeLaunchConfigurations: DescribeLaunchConfigurations,
      DescribeMetricCollectionTypes: DescribeMetricCollectionTypes,
      DescribeNotificationConfigurations: DescribeNotificationConfigurations,
      DescribePolicies: DescribePolicies,
      DescribeScalingActivities: DescribeScalingActivities,
      DescribeScalingProcessTypes: DescribeScalingProcessTypes,
      DescribeScheduledActions: DescribeScheduledActions,
      DescribeTags: DescribeTags,
      resolveDescribeAutoScalingGroupsResult: resolveDescribeAutoScalingGroupsResult,
      resolveDescribeLaunchConfigurationsResult: resolveDescribeLaunchConfigurationsResult,
      resolveDescribeNotificationConfigurationsResult: resolveDescribeNotificationConfigurationsResult,
      resolveDescribePoliciesResult: resolveDescribePoliciesResult,
      resolveDescribeScheduledActionsResult: resolveDescribeScheduledActionsResult,
      resolveDescribeScalingActivitiesResult: resolveDescribeScalingActivitiesResult,
      resolveDescribeAutoScalingInstancesResult: resolveDescribeAutoScalingInstancesResult
    };
  });

}).call(this);

(function() {
  define('cloudwatch_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeAlarmHistory, DescribeAlarms, DescribeAlarmsForMetric, GetMetricStatistics, ListMetrics, URL, parserDescribeAlarmHistoryReturn, parserDescribeAlarmsForMetricReturn, parserDescribeAlarmsReturn, parserGetMetricStatisticsReturn, parserListMetricsReturn, resolveDescribeAlarmHistoryResult, resolveDescribeAlarmsForMetricResult, resolveDescribeAlarmsResult, resolveGetMetricStatisticsResult, resolveListMetricsResult, send_request;
    URL = '/aws/cloudwatch/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("cloudwatch." + api_name + " callback is null");
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
        console.log("cloudwatch." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveGetMetricStatisticsResult = function(result) {
      var result_set;
      return result_set = ($.xml2json($.parseXML(result[1]))).GetMetricStatisticsResponse;
    };
    parserGetMetricStatisticsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveGetMetricStatisticsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveListMetricsResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).ListMetricsResponse;
    };
    parserListMetricsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveListMetricsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeAlarmHistoryResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeAlarmHistoryResponse;
    };
    parserDescribeAlarmHistoryReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeAlarmHistoryResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeAlarmsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeAlarmsResponse.DescribeAlarmsResult.MetricAlarms;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserDescribeAlarmsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeAlarmsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeAlarmsForMetricResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeAlarmsForMetricResponse;
    };
    parserDescribeAlarmsForMetricReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeAlarmsForMetricResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    GetMetricStatistics = function(src, username, session_id, region_name, metric_name, namespace, start_time, end_time, period, unit, statistics, dimensions, callback) {
      if (dimensions == null) {
        dimensions = null;
      }
      send_request("GetMetricStatistics", src, [username, session_id, region_name, metric_name, namespace, start_time, end_time, period, unit, statistics, dimensions], parserGetMetricStatisticsReturn, callback);
      return true;
    };
    ListMetrics = function(src, username, session_id, region_name, metric_name, namespace, dimensions, next_token, callback) {
      if (metric_name == null) {
        metric_name = null;
      }
      if (namespace == null) {
        namespace = null;
      }
      if (dimensions == null) {
        dimensions = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("ListMetrics", src, [username, session_id, region_name, metric_name, namespace, dimensions, next_token], parserListMetricsReturn, callback);
      return true;
    };
    DescribeAlarmHistory = function(src, username, session_id, region_name, alarm_name, start_date, end_date, history_item_type, max_records, next_token, callback) {
      if (alarm_name == null) {
        alarm_name = null;
      }
      if (start_date == null) {
        start_date = null;
      }
      if (end_date == null) {
        end_date = null;
      }
      if (history_item_type == null) {
        history_item_type = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("DescribeAlarmHistory", src, [username, session_id, region_name, alarm_name, start_date, end_date, history_item_type, max_records, next_token], parserDescribeAlarmHistoryReturn, callback);
      return true;
    };
    DescribeAlarms = function(src, username, session_id, region_name, alarm_names, alarm_name_prefix, action_prefix, state_value, max_records, next_token, callback) {
      if (alarm_names == null) {
        alarm_names = null;
      }
      if (alarm_name_prefix == null) {
        alarm_name_prefix = null;
      }
      if (action_prefix == null) {
        action_prefix = null;
      }
      if (state_value == null) {
        state_value = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("DescribeAlarms", src, [username, session_id, region_name, alarm_names, alarm_name_prefix, action_prefix, state_value, max_records, next_token], parserDescribeAlarmsReturn, callback);
      return true;
    };
    DescribeAlarmsForMetric = function(src, username, session_id, region_name, metric_name, namespace, dimension_names, period, statistic, unit, callback) {
      if (dimension_names == null) {
        dimension_names = null;
      }
      if (period == null) {
        period = null;
      }
      if (statistic == null) {
        statistic = null;
      }
      if (unit == null) {
        unit = null;
      }
      send_request("DescribeAlarmsForMetric", src, [username, session_id, region_name, metric_name, namespace, dimension_names, period, statistic, unit], parserDescribeAlarmsForMetricReturn, callback);
      return true;
    };
    return {
      GetMetricStatistics: GetMetricStatistics,
      ListMetrics: ListMetrics,
      DescribeAlarmHistory: DescribeAlarmHistory,
      DescribeAlarms: DescribeAlarms,
      DescribeAlarmsForMetric: DescribeAlarmsForMetric,
      resolveDescribeAlarmsResult: resolveDescribeAlarmsResult
    };
  });

}).call(this);

(function() {
  define('sns_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var GetSubscriptionAttributes, GetTopicAttributes, ListSubscriptions, ListSubscriptionsByTopic, ListTopics, URL, parserGetSubscriptionAttributesReturn, parserGetTopicAttributesReturn, parserListSubscriptionsByTopicReturn, parserListSubscriptionsReturn, parserListTopicsReturn, resolveGetSubscriptionAttributesResult, resolveGetTopicAttributesResult, resolveListSubscriptionsByTopicResult, resolveListSubscriptionsResult, resolveListTopicsResult, send_request;
    URL = '/aws/sns/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("sns." + api_name + " callback is null");
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
            return callback(aws_result);
          }
        });
      } catch (_error) {
        error = _error;
        console.log("sns." + method + " error:" + error.toString());
      }
      return true;
    };
    resolveGetSubscriptionAttributesResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).GetSubscriptionAttributesResponse;
    };
    parserGetSubscriptionAttributesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveGetSubscriptionAttributesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveGetTopicAttributesResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).GetTopicAttributesResponse;
    };
    parserGetTopicAttributesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveGetTopicAttributesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveListSubscriptionsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).ListSubscriptionsResponse.ListSubscriptionsResult.Subscriptions;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserListSubscriptionsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveListSubscriptionsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveListSubscriptionsByTopicResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).ListSubscriptionsByTopicResponse;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserListSubscriptionsByTopicReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveListSubscriptionsByTopicResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveListTopicsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).ListTopicsResponse.ListTopicsResult.Topics;
      if ((result_set != null ? result_set.member : void 0) != null) {
        return result_set.member;
      } else {
        return null;
      }
    };
    parserListTopicsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveListTopicsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    GetSubscriptionAttributes = function(src, username, session_id, region_name, subscription_arn, callback) {
      send_request("GetSubscriptionAttributes", src, [username, session_id, region_name, subscription_arn], parserGetSubscriptionAttributesReturn, callback);
      return true;
    };
    GetTopicAttributes = function(src, username, session_id, region_name, topic_arn, callback) {
      send_request("GetTopicAttributes", src, [username, session_id, region_name, topic_arn], parserGetTopicAttributesReturn, callback);
      return true;
    };
    ListSubscriptions = function(src, username, session_id, region_name, next_token, callback) {
      if (next_token == null) {
        next_token = null;
      }
      send_request("ListSubscriptions", src, [username, session_id, region_name, next_token], parserListSubscriptionsReturn, callback);
      return true;
    };
    ListSubscriptionsByTopic = function(src, username, session_id, region_name, topic_arn, next_token, callback) {
      if (next_token == null) {
        next_token = null;
      }
      send_request("ListSubscriptionsByTopic", src, [username, session_id, region_name, topic_arn, next_token], parserListSubscriptionsByTopicReturn, callback);
      return true;
    };
    ListTopics = function(src, username, session_id, region_name, next_token, callback) {
      if (next_token == null) {
        next_token = null;
      }
      send_request("ListTopics", src, [username, session_id, region_name, next_token], parserListTopicsReturn, callback);
      return true;
    };
    return {
      GetSubscriptionAttributes: GetSubscriptionAttributes,
      GetTopicAttributes: GetTopicAttributes,
      ListSubscriptions: ListSubscriptions,
      ListSubscriptionsByTopic: ListSubscriptionsByTopic,
      ListTopics: ListTopics,
      resolveListSubscriptionsResult: resolveListSubscriptionsResult,
      resolveListTopicsResult: resolveListTopicsResult
    };
  });

}).call(this);

(function() {
  define('subnet_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeSubnets, URL, parserDescribeSubnetsReturn, resolveDescribeSubnetsResult, send_request;
    URL = '/aws/vpc/subnet/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("subnet." + api_name + " callback is null");
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
        console.log("subnet." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeSubnetsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeSubnetsResponse.subnetSet;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeSubnetsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeSubnetsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeSubnets = function(src, username, session_id, region_name, subnet_ids, filters, callback) {
      if (subnet_ids == null) {
        subnet_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeSubnets", src, [username, session_id, region_name, subnet_ids, filters], parserDescribeSubnetsReturn, callback);
      return true;
    };
    return {
      DescribeSubnets: DescribeSubnets,
      resolveDescribeSubnetsResult: resolveDescribeSubnetsResult
    };
  });

}).call(this);

(function() {
  define('vpc_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeAccountAttributes, DescribeVpcAttribute, DescribeVpcs, URL, parserDescribeAccountAttributesReturn, parserDescribeVpcAttributeReturn, parserDescribeVpcsReturn, resolveDescribeAccountAttributesResult, resolveDescribeVpcAttributeResult, resolveDescribeVpcsResult, send_request;
    URL = '/aws/vpc/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("vpc." + api_name + " callback is null");
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
        console.log("vpc." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeVpcsResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeVpcsResponse.vpcSet;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeVpcsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeVpcsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeAccountAttributesResult = function(result) {
      var node, region, res, _ref;
      res = {};
      if (result[1] instanceof Object) {
        _ref = result[1];
        for (region in _ref) {
          node = _ref[region];
          res[region] = ($.xml2json($.parseXML(node))).DescribeAccountAttributesResponse;
        }
      } else {
        res = ($.xml2json($.parseXML(result[1]))).DescribeAccountAttributesResponse;
      }
      return res;
    };
    parserDescribeAccountAttributesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeAccountAttributesResult(result);
        aws_result.resolved_data = resolved_data;
      } else if (return_code === constant.RETURN_CODE.E_EXTERNAL && result[0] === 599) {
        aws_result.return_code = constant.RETURN_CODE.E_BUSY;
      }
      return aws_result;
    };
    resolveDescribeVpcAttributeResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeVpcAttributeResponse;
    };
    parserDescribeVpcAttributeReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeVpcAttributeResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeVpcs = function(src, username, session_id, region_name, vpc_ids, filters, callback) {
      if (vpc_ids == null) {
        vpc_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeVpcs", src, [username, session_id, region_name, vpc_ids, filters], parserDescribeVpcsReturn, callback);
      return true;
    };
    DescribeAccountAttributes = function(src, username, session_id, region_name, attribute_name, callback) {
      send_request("DescribeAccountAttributes", src, [username, session_id, region_name, attribute_name], parserDescribeAccountAttributesReturn, callback);
      return true;
    };
    DescribeVpcAttribute = function(src, username, session_id, region_name, vpc_id, attribute, callback) {
      send_request("DescribeVpcAttribute", src, [username, session_id, region_name, vpc_id, attribute], parserDescribeVpcAttributeReturn, callback);
      return true;
    };
    return {
      DescribeVpcs: DescribeVpcs,
      DescribeAccountAttributes: DescribeAccountAttributes,
      DescribeVpcAttribute: DescribeVpcAttribute,
      resolveDescribeVpcsResult: resolveDescribeVpcsResult,
      resolveDescribeVpcAttributeResult: resolveDescribeVpcAttributeResult
    };
  });

}).call(this);

(function() {
  define('vpn_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeVpnConnections, URL, parserDescribeVpnConnectionsReturn, resolveDescribeVpnConnectionsResult, send_request;
    URL = '/aws/vpc/vpn/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("vpn." + api_name + " callback is null");
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
        console.log("vpn." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeVpnConnectionsResult = function(result) {
      result = ($.xml2json($.parseXML(result[1]))).DescribeVpnConnectionsResponse.vpnConnectionSet;
      if ((result != null ? result.item : void 0) != null) {
        return result.item;
      } else {
        return null;
      }
    };
    parserDescribeVpnConnectionsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeVpnConnectionsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeVpnConnections = function(src, username, session_id, region_name, vpn_ids, filters, callback) {
      if (vpn_ids == null) {
        vpn_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeVpnConnections", src, [username, session_id, region_name, vpn_ids, filters], parserDescribeVpnConnectionsReturn, callback);
      return true;
    };
    return {
      DescribeVpnConnections: DescribeVpnConnections,
      resolveDescribeVpnConnectionsResult: resolveDescribeVpnConnectionsResult
    };
  });

}).call(this);

(function() {
  define('vpngateway_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeVpnGateways, URL, parserDescribeVpnGatewaysReturn, resolveDescribeVpnGatewaysResult, send_request;
    URL = '/aws/vpc/vgw/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("vpngateway." + api_name + " callback is null");
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
        console.log("vpngateway." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeVpnGatewaysResult = function(result) {
      var result_set;
      result_set = ($.xml2json($.parseXML(result[1]))).DescribeVpnGatewaysResponse.vpnGatewaySet;
      if ((result_set != null ? result_set.item : void 0) != null) {
        return result_set.item;
      } else {
        return null;
      }
    };
    parserDescribeVpnGatewaysReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeVpnGatewaysResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeVpnGateways = function(src, username, session_id, region_name, gw_ids, filters, callback) {
      if (gw_ids == null) {
        gw_ids = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeVpnGateways", src, [username, session_id, region_name, gw_ids, filters], parserDescribeVpnGatewaysReturn, callback);
      return true;
    };
    return {
      DescribeVpnGateways: DescribeVpnGateways,
      resolveDescribeVpnGatewaysResult: resolveDescribeVpnGatewaysResult
    };
  });

}).call(this);

(function() {
  define('ec2_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var CreateTags, DeleteTags, DescribeAvailabilityZones, DescribeRegions, DescribeTags, URL, parserCreateTagsReturn, parserDeleteTagsReturn, parserDescribeAvailabilityZonesReturn, parserDescribeRegionsReturn, parserDescribeTagsReturn, resolveDescribeAvailabilityZonesResult, resolveDescribeRegionsResult, resolveDescribeTagsResult, send_request;
    URL = '/aws/ec2/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("ec2." + api_name + " callback is null");
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
        console.log("ec2." + api_name + " error:" + error.toString());
      }
      return true;
    };
    parserCreateTagsReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserDeleteTagsReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    resolveDescribeTagsResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeTagsResponse.tagSet;
    };
    parserDescribeTagsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeTagsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeRegionsResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeRegionsResponse.regionInfo;
    };
    parserDescribeRegionsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeRegionsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeAvailabilityZonesResult = function(result) {
      return ($.xml2json($.parseXML(result[1]))).DescribeAvailabilityZonesResponse.availabilityZoneInfo;
    };
    parserDescribeAvailabilityZonesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeAvailabilityZonesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    CreateTags = function(src, username, session_id, region_name, resource_ids, tags, callback) {
      send_request("CreateTags", src, [username, session_id, region_name, resource_ids, tags], parserCreateTagsReturn, callback);
      return true;
    };
    DeleteTags = function(src, username, session_id, region_name, resource_ids, tags, callback) {
      send_request("DeleteTags", src, [username, session_id, region_name, resource_ids, tags], parserDeleteTagsReturn, callback);
      return true;
    };
    DescribeTags = function(src, username, session_id, region_name, filters, callback) {
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeTags", src, [username, session_id, region_name, filters], parserDescribeTagsReturn, callback);
      return true;
    };
    DescribeRegions = function(src, username, session_id, region_names, filters, callback) {
      if (region_names == null) {
        region_names = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeRegions", src, [username, session_id, region_names, filters], parserDescribeRegionsReturn, callback);
      return true;
    };
    DescribeAvailabilityZones = function(src, username, session_id, region_name, zone_names, filters, callback) {
      if (zone_names == null) {
        zone_names = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribeAvailabilityZones", src, [username, session_id, region_name, zone_names, filters], parserDescribeAvailabilityZonesReturn, callback);
      return true;
    };
    return {
      CreateTags: CreateTags,
      DeleteTags: DeleteTags,
      DescribeTags: DescribeTags,
      DescribeRegions: DescribeRegions,
      DescribeAvailabilityZones: DescribeAvailabilityZones,
      resolveDescribeAvailabilityZonesResult: resolveDescribeAvailabilityZonesResult
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
  define('app_service',['MC', 'result_vo', 'constant', 'ebs_service', 'eip_service', 'instance_service', 'keypair_service', 'securitygroup_service', 'elb_service', 'iam_service', 'acl_service', 'customergateway_service', 'dhcp_service', 'eni_service', 'internetgateway_service', 'routetable_service', 'autoscaling_service', 'cloudwatch_service', 'sns_service', 'subnet_service', 'vpc_service', 'vpn_service', 'vpngateway_service', 'ec2_service', 'ami_service'], function(MC, result_vo, constant, ebs_service, eip_service, instance_service, keypair_service, securitygroup_service, elb_service, iam_service, acl_service, customergateway_service, dhcp_service, eni_service, internetgateway_service, routetable_service, autoscaling_service, cloudwatch_service, sns_service, subnet_service, vpc_service, vpn_service, vpngateway_service, ec2_service, ami_service) {
    var URL, create, getKey, info, list, parseGetKeyReturn, parserCreateReturn, parserGetKeyReturn, parserInfoReturn, parserListReturn, parserRebootReturn, parserRenameReturn, parserResourceReturn, parserStartReturn, parserStopReturn, parserSummaryReturn, parserTerminateReturn, parserUpdateReturn, reboot, rename, resolveAppRequest, resolveCreateResult, resolveGetKeyResult, resolveInfoResult, resolveListResult, resolveRebootResult, resolveRenameResult, resolveResourceResult, resolveStartResult, resolveStopResult, resolveSummaryResult, resolveTerminateResult, resolveUpdateResult, resource, resourceMap, send_request, start, stop, summary, terminate, update;
    URL = '/app/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("app." + api_name + " callback is null");
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
        console.log("app." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveAppRequest = function(result) {
      var app_request;
      app_request = {};
      app_request.id = result[0];
      app_request.state = result[1];
      app_request.brief = result[2];
      app_request.time_submit = result[3];
      app_request.rid = result[4];
      return app_request;
    };
    resolveCreateResult = function(result) {
      return resolveAppRequest(result);
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
    resolveUpdateResult = function(result) {
      return resolveAppRequest(result);
    };
    parserUpdateReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveUpdateResult(result);
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
    resolveTerminateResult = function(result) {
      return resolveAppRequest(result);
    };
    parserTerminateReturn = function(result, return_code, param) {
      var flag, forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      flag = param[6];
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        if (flag && flag === 1) {
          resolved_data = result;
        } else {
          resolved_data = resolveTerminateResult(result);
        }
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveStartResult = function(result) {
      return resolveAppRequest(result);
    };
    parserStartReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveStartResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveStopResult = function(result) {
      return resolveAppRequest(result);
    };
    parserStopReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveStopResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveRebootResult = function(result) {
      return resolveAppRequest(result);
    };
    parserRebootReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveRebootResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveInfoResult = function(result) {
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
    resolveGetKeyResult = function(result) {
      return result;
    };
    parserGetKeyReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveGetKeyResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resourceMap = function(result) {
      var action_name, dict, dict_name, elbAttrData, elbHealthData, node, responses, vpcAttr, _i, _len;
      responses = {
        "DescribeImagesResponse": ami_service.resolveDescribeImagesResult,
        "DescribeAvailabilityZonesResponse": ec2_service.resolveDescribeAvailabilityZonesResult,
        "DescribeVolumesResponse": ebs_service.resolveDescribeVolumesResult,
        "DescribeSnapshotsResponse": ebs_service.resolveDescribeSnapshotsResult,
        "DescribeAddressesResponse": eip_service.resolveDescribeAddressesResult,
        "DescribeInstancesResponse": instance_service.resolveDescribeInstancesResult,
        "DescribeKeyPairsResponse": keypair_service.resolveDescribeKeyPairsResult,
        "DescribeSecurityGroupsResponse": securitygroup_service.resolveDescribeSecurityGroupsResult,
        "DescribeLoadBalancersResponse": elb_service.resolveDescribeLoadBalancersResult,
        "DescribeNetworkAclsResponse": acl_service.resolveDescribeNetworkAclsResult,
        "DescribeCustomerGatewaysResponse": customergateway_service.resolveDescribeCustomerGatewaysResult,
        "DescribeDhcpOptionsResponse": dhcp_service.resolveDescribeDhcpOptionsResult,
        "DescribeNetworkInterfacesResponse": eni_service.resolveDescribeNetworkInterfacesResult,
        "DescribeInternetGatewaysResponse": internetgateway_service.resolveDescribeInternetGatewaysResult,
        "DescribeRouteTablesResponse": routetable_service.resolveDescribeRouteTablesResult,
        "DescribeSubnetsResponse": subnet_service.resolveDescribeSubnetsResult,
        "DescribeVpcsResponse": vpc_service.resolveDescribeVpcsResult,
        "DescribeVpnConnectionsResponse": vpn_service.resolveDescribeVpnConnectionsResult,
        "DescribeVpnGatewaysResponse": vpngateway_service.resolveDescribeVpnGatewaysResult,
        "DescribeAutoScalingGroupsResponse": autoscaling_service.resolveDescribeAutoScalingGroupsResult,
        "DescribeLaunchConfigurationsResponse": autoscaling_service.resolveDescribeLaunchConfigurationsResult,
        "DescribeNotificationConfigurationsResponse": autoscaling_service.resolveDescribeNotificationConfigurationsResult,
        "DescribePoliciesResponse": autoscaling_service.resolveDescribePoliciesResult,
        "DescribeScheduledActionsResponse": autoscaling_service.resolveDescribeScheduledActionsResult,
        "DescribeScalingActivitiesResponse": autoscaling_service.resolveDescribeScalingActivitiesResult,
        "DescribeAlarmsResponse": cloudwatch_service.resolveDescribeAlarmsResult,
        "ListSubscriptionsResponse": sns_service.resolveListSubscriptionsResult,
        "ListTopicsResponse": sns_service.resolveListTopicsResult,
        "DescribeAutoScalingInstancesResponse": autoscaling_service.resolveDescribeAutoScalingInstancesResult,
        "DescribeInstanceHealthResponse": elb_service.resolveDescribeInstanceHealthResult,
        "DescribeLoadBalancerAttributesResponse": elb_service.resolveDescribeLoadBalancerAttributesResult,
        "DescribeVpcAttributeResponse": vpc_service.resolveDescribeVpcAttributeResult
      };
      dict = {};
      for (_i = 0, _len = result.length; _i < _len; _i++) {
        node = result[_i];
        if ($.type(node) === "string") {
          action_name = ($.parseXML(node)).documentElement.localName;
          dict_name = action_name.replace(/Response/i, "");
          if (!responses[action_name]) {
            console.warn("[resourceMap] can not find action_name [" + action_name + "]");
            continue;
          }
          if (action_name === "DescribeVpcAttributeResponse") {
            if (!dict[dict_name]) {
              dict[dict_name] = {};
            }
            vpcAttr = responses[action_name]([null, node]);
            if (vpcAttr.enableDnsSupport) {
              dict[dict_name]['enableDnsSupport'] = vpcAttr.enableDnsSupport.value;
            } else if (vpcAttr.enableDnsHostnames) {
              dict[dict_name]['enableDnsHostnames'] = vpcAttr.enableDnsHostnames.value;
            }
          } else {
            if (dict[dict_name] != null) {
              dict[dict_name] = [];
            }
            dict[dict_name] = responses[action_name]([null, node]);
          }
        } else if ($.type(node) === "object") {
          elbAttrData = node["DescribeLoadBalancerAttributes"];
          if (elbAttrData) {
            _.each(elbAttrData, function(node, elb_name) {
              var elb_data;
              action_name = ($.parseXML(node)).documentElement.localName;
              dict_name = action_name.replace(/Response/i, "");
              if (!dict[dict_name]) {
                dict[dict_name] = [];
              }
              elb_data = responses[action_name]([null, node]);
              elb_data.LoadBalancerName = elb_name;
              return dict[dict_name].push(elb_data);
            });
          }
          elbHealthData = node["DescribeInstanceHealth"];
          if (elbHealthData) {
            _.each(elbHealthData, function(node, elb_name) {
              var elb_data;
              action_name = ($.parseXML(node)).documentElement.localName;
              dict_name = action_name.replace(/Response/i, "");
              if (!dict[dict_name]) {
                dict[dict_name] = [];
              }
              elb_data = responses[action_name]([null, node]);
              if (elb_data) {
                elb_data.LoadBalancerName = elb_name;
                return dict[dict_name].push(elb_data);
              }
            });
          }
        }
      }
      return dict;
    };
    resolveResourceResult = function(result) {
      var res;
      res = {};
      res = resourceMap(result);
      return res;
    };
    parserResourceReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveResourceResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveSummaryResult = function(result) {
      return result;
    };
    parserSummaryReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveSummaryResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveListResult = function(result) {
      var app_list, vo, _i, _len;
      app_list = {};
      for (_i = 0, _len = result.length; _i < _len; _i++) {
        vo = result[_i];
        if (app_list[vo.region] === void 0) {
          app_list[vo.region] = [];
        }
        app_list[vo.region].push(vo);
      }
      return app_list;
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
    resolveGetKeyResult = function(result) {
      return result;
    };
    parseGetKeyReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveGetKeyResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    create = function(src, username, session_id, region_name, spec, callback) {
      send_request("create", src, [username, session_id, region_name, spec], parserCreateReturn, callback);
      return true;
    };
    update = function(src, username, session_id, region_name, spec, app_id, fast_update, callback) {
      send_request("update", src, [username, session_id, region_name, spec, app_id, fast_update], parserUpdateReturn, callback);
      return true;
    };
    rename = function(src, username, session_id, region_name, app_id, new_name, app_name, callback) {
      if (app_name == null) {
        app_name = null;
      }
      send_request("rename", src, [username, session_id, region_name, app_id, new_name, app_name], parserRenameReturn, callback);
      return true;
    };
    terminate = function(src, username, session_id, region_name, app_id, app_name, flag, callback) {
      if (app_name == null) {
        app_name = null;
      }
      if (flag == null) {
        flag = null;
      }
      send_request("terminate", src, [username, session_id, region_name, app_id, app_name, flag], parserTerminateReturn, callback);
      return true;
    };
    start = function(src, username, session_id, region_name, app_id, app_name, callback) {
      if (app_name == null) {
        app_name = null;
      }
      send_request("start", src, [username, session_id, region_name, app_id, app_name], parserStartReturn, callback);
      return true;
    };
    stop = function(src, username, session_id, region_name, app_id, app_name, callback) {
      if (app_name == null) {
        app_name = null;
      }
      send_request("stop", src, [username, session_id, region_name, app_id, app_name], parserStopReturn, callback);
      return true;
    };
    reboot = function(src, username, session_id, region_name, app_id, app_name, callback) {
      if (app_name == null) {
        app_name = null;
      }
      send_request("reboot", src, [username, session_id, region_name, app_id, app_name], parserRebootReturn, callback);
      return true;
    };
    info = function(src, username, session_id, region_name, app_ids, callback) {
      if (app_ids == null) {
        app_ids = null;
      }
      send_request("info", src, [username, session_id, region_name, app_ids], parserInfoReturn, callback);
      return true;
    };
    list = function(src, username, session_id, region_name, app_ids, callback) {
      if (app_ids == null) {
        app_ids = null;
      }
      send_request("list", src, [username, session_id, region_name, app_ids], parserListReturn, callback);
      return true;
    };
    resource = function(src, username, session_id, region_name, app_id, callback) {
      send_request("resource", src, [username, session_id, region_name, app_id], parserResourceReturn, callback);
      return true;
    };
    summary = function(src, username, session_id, region_name, callback) {
      if (region_name == null) {
        region_name = null;
      }
      send_request("summary", src, [username, session_id, region_name], parserSummaryReturn, callback);
      return true;
    };
    getKey = function(src, username, session_id, region_name, app_id, app_name, callback) {
      return send_request("getKey", src, [username, session_id, region_name, app_id, app_name], parseGetKeyReturn, callback);
    };
    return {
      create: create,
      update: update,
      rename: rename,
      terminate: terminate,
      start: start,
      stop: stop,
      reboot: reboot,
      info: info,
      list: list,
      resource: resource,
      summary: summary,
      getKey: getKey
    };
  });

}).call(this);

(function() {
  define('app_model',['backbone', 'underscore', 'app_service', 'base_model'], function(Backbone, _, app_service, base_model) {
    var AppModel, app_model;
    AppModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      create: function(src, username, session_id, region_name, spec) {
        var me;
        me = this;
        src.model = me;
        return app_service.create(src, username, session_id, region_name, spec, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('APP_CREATE_RETURN', forge_result);
            }
          } else {
            console.log('app.create failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      update: function(src, username, session_id, region_name, spec, app_id, fast_update) {
        var me;
        me = this;
        src.model = me;
        return app_service.update(src, username, session_id, region_name, spec, app_id, fast_update, function(forge_result) {
          if (!forge_result.is_error) {

          } else {
            console.log('app.update failed, error is ' + forge_result.error_message);
            me.pub(forge_result);
          }
          if (src.sender && src.sender.trigger) {
            return src.sender.trigger('APP_UPDATE_RETURN', forge_result);
          }
        });
      },
      rename: function(src, username, session_id, region_name, app_id, new_name, app_name) {
        var me;
        if (app_name == null) {
          app_name = null;
        }
        me = this;
        src.model = me;
        return app_service.rename(src, username, session_id, region_name, app_id, new_name, app_name, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('APP_RENAME_RETURN', forge_result);
            }
          } else {
            console.log('app.rename failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      terminate: function(src, username, session_id, region_name, app_id, app_name, flag) {
        var me;
        if (app_name == null) {
          app_name = null;
        }
        if (flag == null) {
          flag = null;
        }
        me = this;
        src.model = me;
        return app_service.terminate(src, username, session_id, region_name, app_id, app_name, flag, function(forge_result) {
          if (!forge_result.is_error) {

          } else {
            console.log('app.terminate failed, error is ' + forge_result.error_message);
            me.pub(forge_result);
          }
          if (src.sender && src.sender.trigger) {
            return src.sender.trigger('APP_TERMINATE_RETURN', forge_result);
          }
        });
      },
      start: function(src, username, session_id, region_name, app_id, app_name) {
        var me;
        if (app_name == null) {
          app_name = null;
        }
        me = this;
        src.model = me;
        return app_service.start(src, username, session_id, region_name, app_id, app_name, function(forge_result) {
          if (!forge_result.is_error) {

          } else {
            console.log('app.start failed, error is ' + forge_result.error_message);
            me.pub(forge_result);
          }
          if (src.sender && src.sender.trigger) {
            return src.sender.trigger('APP_START_RETURN', forge_result);
          }
        });
      },
      stop: function(src, username, session_id, region_name, app_id, app_name) {
        var me;
        if (app_name == null) {
          app_name = null;
        }
        me = this;
        src.model = me;
        return app_service.stop(src, username, session_id, region_name, app_id, app_name, function(forge_result) {
          if (!forge_result.is_error) {

          } else {
            console.log('app.stop failed, error is ' + forge_result.error_message);
            me.pub(forge_result);
          }
          if (src.sender && src.sender.trigger) {
            return src.sender.trigger('APP_STOP_RETURN', forge_result);
          }
        });
      },
      reboot: function(src, username, session_id, region_name, app_id, app_name) {
        var me;
        if (app_name == null) {
          app_name = null;
        }
        me = this;
        src.model = me;
        return app_service.reboot(src, username, session_id, region_name, app_id, app_name, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('APP_REBOOT_RETURN', forge_result);
            }
          } else {
            console.log('app.reboot failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      info: function(src, username, session_id, region_name, app_ids) {
        var me;
        if (region_name == null) {
          region_name = null;
        }
        if (app_ids == null) {
          app_ids = null;
        }
        me = this;
        src.model = me;
        return app_service.info(src, username, session_id, region_name, app_ids, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('APP_INFO_RETURN', forge_result);
            }
          } else {
            console.log('app.info failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      list: function(src, username, session_id, region_name, app_ids) {
        var me;
        if (region_name == null) {
          region_name = null;
        }
        if (app_ids == null) {
          app_ids = null;
        }
        me = this;
        src.model = me;
        return app_service.list(src, username, session_id, region_name, app_ids, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('APP_LST_RETURN', forge_result);
            }
          } else {
            console.log('app.list failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      resource: function(src, username, session_id, region_name, app_id) {
        var me;
        me = this;
        src.model = me;
        return app_service.resource(src, username, session_id, region_name, app_id, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('APP_RESOURCE_RETURN', forge_result);
            }
          } else {
            console.log('app.resource failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      summary: function(src, username, session_id, region_name) {
        var me;
        if (region_name == null) {
          region_name = null;
        }
        me = this;
        src.model = me;
        return app_service.summary(src, username, session_id, region_name, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('APP_SUMMARY_RETURN', forge_result);
            }
          } else {
            console.log('app.summary failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      getKey: function(src, username, session_id, region_name, app_id, app_name) {
        var me;
        me = this;
        src.model = me;
        return app_service.getKey(src, username, session_id, region_name, app_id, app_name, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('APP_GET_KEY_RETURN', forge_result);
            }
          } else {
            console.log('app.getKey failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      }
    });
    app_model = new AppModel();
    return app_model;
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
  define('stack_model',['backbone', 'underscore', 'stack_service', 'ami_service', 'base_model'], function(Backbone, _, stack_service, ami_service, base_model) {
    var StackModel, stack_model;
    StackModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      create: function(src, username, session_id, region_name, spec) {
        var me;
        me = this;
        src.model = me;
        return stack_service.create(src, username, session_id, region_name, spec, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STACK_CREATE_RETURN', forge_result);
            }
          } else {
            console.log('stack.create failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      remove: function(src, username, session_id, region_name, stack_id, stack_name) {
        var me;
        if (stack_name == null) {
          stack_name = null;
        }
        me = this;
        src.model = me;
        return stack_service.remove(src, username, session_id, region_name, stack_id, stack_name, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STACK_REMOVE_RETURN', forge_result);
            }
          } else {
            console.log('stack.remove failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      save_stack: function(src, username, session_id, region_name, spec) {
        var me;
        me = this;
        src.model = me;
        return stack_service.save(src, username, session_id, region_name, spec, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STACK_SAVE_RETURN', forge_result);
            }
          } else {
            console.log('stack.save failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      rename: function(src, username, session_id, region_name, stack_id, new_name, stack_name) {
        var me;
        if (stack_name == null) {
          stack_name = null;
        }
        me = this;
        src.model = me;
        return stack_service.rename(src, username, session_id, region_name, stack_id, new_name, stack_name, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STACK_RENAME_RETURN', forge_result);
            }
          } else {
            console.log('stack.rename failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      run: function(src, username, session_id, region_name, stack_id, app_name, app_desc, app_component, app_property, app_layout, stack_name, usage) {
        var me;
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
        me = this;
        src.model = me;
        return stack_service.run(src, username, session_id, region_name, stack_id, app_name, app_desc, app_component, app_property, app_layout, stack_name, usage, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STACK_RUN_RETURN', forge_result);
            }
          } else {
            console.log('stack.run failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      save_as: function(src, username, session_id, region_name, stack_id, new_name, stack_name) {
        var me;
        if (stack_name == null) {
          stack_name = null;
        }
        me = this;
        src.model = me;
        return stack_service.save_as(src, username, session_id, region_name, stack_id, new_name, stack_name, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STACK_SAVE__AS_RETURN', forge_result);
            }
          } else {
            console.log('stack.save_as failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      info: function(src, username, session_id, region_name, stack_ids) {
        var me;
        if (stack_ids == null) {
          stack_ids = null;
        }
        me = this;
        src.model = me;
        return stack_service.info(src, username, session_id, region_name, stack_ids, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STACK_INFO_RETURN', forge_result);
            }
          } else {
            console.log('stack.info failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      list: function(src, username, session_id, region_name, stack_ids) {
        var me;
        if (region_name == null) {
          region_name = null;
        }
        if (stack_ids == null) {
          stack_ids = null;
        }
        me = this;
        src.model = me;
        return stack_service.list(src, username, session_id, region_name, stack_ids, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STACK_LST_RETURN', forge_result);
            }
          } else {
            console.log('stack.list failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      export_cloudformation: function(src, username, session_id, region_name, stack) {
        var me;
        me = this;
        src.model = me;
        return stack_service.export_cloudformation(src, username, session_id, region_name, stack, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STACK_EXPORT__CLOUDFORMATION_RETURN', forge_result);
            }
          } else {
            console.log('stack.export_cloudformation failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      get_not_exist_ami: function(src, username, session_id, region_name, ami_list) {
        var me;
        me = this;
        src.model = me;
        return ami_service.DescribeImages(src, username, session_id, region_name, ami_list, null, null, null, function(result) {
          if (!result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('GET_NOT_EXIST_AMI_RETURN', result);
            }
          } else {
            return console.log('ami.DescribeImages failed, error is ' + result.error_message);
          }
        });
      },
      verify: function(src, username, session_id, spec) {
        var me;
        me = this;
        src.model = me;
        return stack_service.verify(src, username, session_id, spec, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('STACK_VERIFY_RETURN', forge_result);
            }
          } else {
            console.log('stack.verify failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      }
    });
    stack_model = new StackModel();
    return stack_model;
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
  define('ec2_model',['backbone', 'underscore', 'ec2_service', 'base_model'], function(Backbone, _, ec2_service, base_model) {
    var EC2Model, ec2_model;
    EC2Model = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      CreateTags: function(src, username, session_id, region_name, resource_ids, tags) {
        var me;
        me = this;
        src.model = me;
        return ec2_service.CreateTags(src, username, session_id, region_name, resource_ids, tags, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EC2_CREATE_TAGS_RETURN', aws_result);
            }
          } else {
            console.log('ec2.CreateTags failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DeleteTags: function(src, username, session_id, region_name, resource_ids, tags) {
        var me;
        me = this;
        src.model = me;
        return ec2_service.DeleteTags(src, username, session_id, region_name, resource_ids, tags, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EC2_DELETE_TAGS_RETURN', aws_result);
            }
          } else {
            console.log('ec2.DeleteTags failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeTags: function(src, username, session_id, region_name, filters) {
        var me;
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return ec2_service.DescribeTags(src, username, session_id, region_name, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EC2_DESC_TAGS_RETURN', aws_result);
            }
          } else {
            console.log('ec2.DescribeTags failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeRegions: function(src, username, session_id, region_names, filters) {
        var callback, key, me;
        if (region_names == null) {
          region_names = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        key = "DescribeRegions";
        callback = function(aws_result) {
          MC.cacheForDev(key, aws_result);
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EC2_DESC_REGIONS_RETURN', aws_result);
            }
          } else {
            console.log('ec2.DescribeRegions failed, error is ' + aws_result.error_message);
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EC2_DESC_REGIONS_RETURN', aws_result);
            }
          }
        };
        if (!MC.cacheForDev(key, null, callback)) {
          return ec2_service.DescribeRegions(src, username, session_id, region_names, filters, callback);
        }
      },
      DescribeAvailabilityZones: function(src, username, session_id, region_name, zone_names, filters) {
        var me;
        if (zone_names == null) {
          zone_names = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return ec2_service.DescribeAvailabilityZones(src, username, session_id, region_name, zone_names, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EC2_DESC_AVAILABILITY_ZONES_RETURN', aws_result);
            }
          } else {
            console.log('ec2.DescribeAvailabilityZones failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    ec2_model = new EC2Model();
    return ec2_model;
  });

}).call(this);

(function() {
  define('vpc_model',['backbone', 'underscore', 'vpc_service', 'base_model'], function(Backbone, _, vpc_service, base_model) {
    var VPCModel, vpc_model;
    VPCModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeVpcs: function(src, username, session_id, region_name, vpc_ids, filters) {
        var me;
        if (vpc_ids == null) {
          vpc_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return vpc_service.DescribeVpcs(src, username, session_id, region_name, vpc_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_VPC_DESC_VPCS_RETURN', aws_result);
            }
          } else {
            console.log('vpc.DescribeVpcs failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeAccountAttributes: function(src, username, session_id, region_name, attribute_name) {
        var callback, key, me;
        me = this;
        src.model = me;
        key = "DescribeAccountAttributes_" + username + "_" + region_name + "_" + attribute_name;
        callback = function(aws_result) {
          MC.cacheForDev(key, aws_result);
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_VPC_DESC_ACCOUNT_ATTRS_RETURN', aws_result);
            }
          } else {
            console.log('vpc.DescribeAccountAttributes failed, error is ' + aws_result.error_message);
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_VPC_DESC_ACCOUNT_ATTRS_RETURN', aws_result);
            }
          }
        };
        if (!MC.cacheForDev(key, null, callback)) {
          return vpc_service.DescribeAccountAttributes(src, username, session_id, region_name, attribute_name, callback);
        }
      },
      DescribeVpcAttribute: function(src, username, session_id, region_name, vpc_id, attribute) {
        var me;
        me = this;
        src.model = me;
        return vpc_service.DescribeVpcAttribute(src, username, session_id, region_name, vpc_id, attribute, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_VPC_DESC_VPC_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('vpc.DescribeVpcAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    vpc_model = new VPCModel();
    return vpc_model;
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('aws_service',['MC', 'common_handle', 'result_vo', 'constant', 'ebs_service', 'eip_service', 'instance_service', 'keypair_service', 'securitygroup_service', 'elb_service', 'iam_service', 'acl_service', 'customergateway_service', 'dhcp_service', 'eni_service', 'internetgateway_service', 'routetable_service', 'autoscaling_service', 'cloudwatch_service', 'sns_service', 'subnet_service', 'vpc_service', 'vpn_service', 'vpngateway_service', 'ec2_service', 'ami_service'], function(MC, common_handle, result_vo, constant, ebs_service, eip_service, instance_service, keypair_service, securitygroup_service, elb_service, iam_service, acl_service, customergateway_service, dhcp_service, eni_service, internetgateway_service, routetable_service, autoscaling_service, cloudwatch_service, sns_service, subnet_service, vpc_service, vpn_service, vpngateway_service, ec2_service, ami_service) {
    var Public, URL, info, parserInfoReturn, parserPriceReturn, parserPropertyReturn, parserPublicReturn, parserQuickstartReturn, parserResourceReturn, parserStatResourceReturn, parserStatusReturn, parserVpcResourceReturn, price, property, quickstart, resolveInfoResult, resolvePriceResult, resolvePropertyResult, resolvePublicResult, resolveQuickstartResult, resolveResourceResult, resolveStatResourceResult, resolveStatusResult, resolveVpcResourceResult, resource, resourceMap, send_request, stat_resource, status, vpc_resource, vpc_resource_map;
    URL = '/aws/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("aws." + api_name + " callback is null");
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
        console.log("aws." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveQuickstartResult = function(result) {
      return result;
    };
    parserQuickstartReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveQuickstartResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolvePublicResult = function(result) {
      return result;
    };
    parserPublicReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolvePublicResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveInfoResult = function(result) {
      return result;
    };
    parserInfoReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveInfoResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resourceMap = function(result) {
      var action_name, dict, dict_name, elbHealthData, node, parseResult, responses, _i, _len;
      responses = {
        "DescribeImagesResponse": ami_service.resolveDescribeImagesResult,
        "DescribeAvailabilityZonesResponse": ec2_service.resolveDescribeAvailabilityZonesResult,
        "DescribeVolumesResponse": ebs_service.resolveDescribeVolumesResult,
        "DescribeSnapshotsResponse": ebs_service.resolveDescribeSnapshotsResult,
        "DescribeAddressesResponse": eip_service.resolveDescribeAddressesResult,
        "DescribeInstancesResponse": instance_service.resolveDescribeInstancesResult,
        "DescribeKeyPairsResponse": keypair_service.resolveDescribeKeyPairsResult,
        "DescribeSecurityGroupsResponse": securitygroup_service.resolveDescribeSecurityGroupsResult,
        "DescribeLoadBalancersResponse": elb_service.resolveDescribeLoadBalancersResult,
        "DescribeInstanceHealthResponse": elb_service.resolveDescribeInstanceHealthResult,
        "DescribeNetworkAclsResponse": acl_service.resolveDescribeNetworkAclsResult,
        "DescribeCustomerGatewaysResponse": customergateway_service.resolveDescribeCustomerGatewaysResult,
        "DescribeDhcpOptionsResponse": dhcp_service.resolveDescribeDhcpOptionsResult,
        "DescribeNetworkInterfacesResponse": eni_service.resolveDescribeNetworkInterfacesResult,
        "DescribeInternetGatewaysResponse": internetgateway_service.resolveDescribeInternetGatewaysResult,
        "DescribeRouteTablesResponse": routetable_service.resolveDescribeRouteTablesResult,
        "DescribeSubnetsResponse": subnet_service.resolveDescribeSubnetsResult,
        "DescribeVpcsResponse": vpc_service.resolveDescribeVpcsResult,
        "DescribeVpnConnectionsResponse": vpn_service.resolveDescribeVpnConnectionsResult,
        "DescribeVpnGatewaysResponse": vpngateway_service.resolveDescribeVpnGatewaysResult,
        "DescribeAutoScalingGroupsResponse": autoscaling_service.resolveDescribeAutoScalingGroupsResult,
        "DescribeLaunchConfigurationsResponse": autoscaling_service.resolveDescribeLaunchConfigurationsResult,
        "DescribeNotificationConfigurationsResponse": autoscaling_service.resolveDescribeNotificationConfigurationsResult,
        "DescribePoliciesResponse": autoscaling_service.resolveDescribePoliciesResult,
        "DescribeScheduledActionsResponse": autoscaling_service.resolveDescribeScheduledActionsResult,
        "DescribeScalingActivitiesResponse": autoscaling_service.resolveDescribeScalingActivitiesResult,
        "DescribeAlarmsResponse": cloudwatch_service.resolveDescribeAlarmsResult,
        "ListSubscriptionsResponse": sns_service.resolveListSubscriptionsResult,
        "ListTopicsResponse": sns_service.resolveListTopicsResult
      };
      dict = {};
      for (_i = 0, _len = result.length; _i < _len; _i++) {
        node = result[_i];
        if (node) {
          if ($.type(node) === "string") {
            action_name = ($.parseXML(node)).documentElement.localName;
            dict_name = action_name.replace(/Response/i, "");
            if (dict[dict_name] != null) {
              dict[dict_name] = [];
            }
            if (!(action_name in responses)) {
              continue;
            }
            parseResult = responses[action_name]([null, node]);
            dict[dict_name] = parseResult;
          } else if ($.type(node) === "object") {
            elbHealthData = node["DescribeInstanceHealth"];
            if (elbHealthData) {
              _.each(elbHealthData, function(node, elb_name) {
                var elb_data;
                action_name = ($.parseXML(node)).documentElement.localName;
                dict_name = action_name.replace(/Response/i, "");
                if (!dict[dict_name]) {
                  dict[dict_name] = [];
                }
                elb_data = responses[action_name]([null, node]);
                if (elb_data) {
                  elb_data.LoadBalancerName = elb_name;
                  return dict[dict_name].push(elb_data);
                }
              });
            }
          }
        }
      }
      return dict;
    };
    resolveResourceResult = function(result) {
      var nodes, region, res;
      res = {};
      for (region in result) {
        nodes = result[region];
        res[region] = resourceMap(nodes);
      }
      return res;
    };
    parserResourceReturn = function(result, return_code, param) {
      var addition, aws_result, error, resolved_data;
      addition = param[5];
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = result;
        try {
          if (addition === 'statistic') {
            resolved_data = result;
          } else if (addition === 'vpc') {
            resolved_data = resolveVpcResourceResult(result);
          } else {
            resolved_data = resolveResourceResult(result);
          }
          aws_result.resolved_data = resolved_data;
        } catch (_error) {
          error = _error;
          console.log('aws service error', error);
          console.log(result, return_code, param);
          if (addition === 'vpc') {
            aws_result.is_error = true;
            aws_result.error_message = "Failed to visualize VPC. Try to refresh resources or contact VisualOps.";
            aws_result.return_code = 15;
          }
        }
      }
      return aws_result;
    };
    resolvePriceResult = function(result) {
      return result;
    };
    parserPriceReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolvePriceResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveStatusResult = function(result) {
      return $.parseJSON(result[2]);
    };
    parserStatusReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveStatusResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    vpc_resource_map = {
      "DescribeAvailabilityZones": MC.common ? MC.common.convert.convertAZ : {},
      "DescribeVolumes": MC.common ? MC.common.convert.convertVolume : {},
      "DescribeAddresses": MC.common ? MC.common.convert.convertEIP : {},
      "DescribeInstances": MC.common ? MC.common.convert.convertInstance : {},
      "DescribeKeyPairs": MC.common ? MC.common.convert.convertKP : {},
      "DescribeSecurityGroups": MC.common ? MC.common.convert.convertSGGroup : {},
      "DescribeLoadBalancers": MC.common ? MC.common.convert.convertELB : {},
      "DescribeNetworkAcls": MC.common ? MC.common.convert.convertACL : {},
      "DescribeCustomerGateways": MC.common ? MC.common.convert.convertCGW : {},
      "DescribeDhcpOptions": MC.common ? MC.common.convert.convertDHCP : {},
      "DescribeNetworkInterfaces": MC.common ? MC.common.convert.convertEni : {},
      "DescribeInternetGateways": MC.common ? MC.common.convert.convertIGW : {},
      "DescribeRouteTables": MC.common ? MC.common.convert.convertRTB : {},
      "DescribeSubnets": MC.common ? MC.common.convert.convertSubnet : {},
      "DescribeVpcs": MC.common ? MC.common.convert.convertVPC : {},
      "DescribeVpnConnections": MC.common ? MC.common.convert.convertVPN : {},
      "DescribeVpnGateways": MC.common ? MC.common.convert.convertVGW : {},
      "DescribeAutoScalingGroups": MC.common ? MC.common.convert.convertASG : {},
      "DescribeLaunchConfigurations": MC.common ? MC.common.convert.convertLC : {},
      "DescribeNotificationConfigurations": MC.common ? MC.common.convert.convertNC : {},
      "DescribePolicies": MC.common ? MC.common.convert.convertScalingPolicy : {}
    };
    resolveVpcResourceResult = function(result) {
      var app_json, asg, c, comp, comp_tmp, device, extend_asg, extend_asg_uid, i, idx, ignore_instances, ins, key_obj, keypair_name, layout, new_comp, new_layout, new_uid, nodes, originalId, ref_key, ref_res, region, remove_index, remove_uid, res, resource_comp, resource_type, subnet, subnets, subs, uid, uid_tmp, used_az, vpc_id, vpc_resource_layout_map, vpc_uid, zone, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _m, _n, _o, _p, _q, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      vpc_resource_layout_map = {
        'AWS.EC2.AvailabilityZone': MC.canvas.AZ_JSON,
        'AWS.EC2.Instance': MC.canvas.INSTANCE_JSON,
        'AWS.ELB': MC.canvas.ELB_JSON,
        'AWS.VPC.VPC': MC.canvas.VPC_JSON,
        'AWS.VPC.Subnet': MC.canvas.SUBNET_JSON,
        'AWS.VPC.InternetGateway': MC.canvas.IGW_JSON,
        'AWS.VPC.RouteTable': MC.canvas.ROUTETABLE_JSON,
        'AWS.VPC.VPNGateway': MC.canvas.VGW_JSON,
        'AWS.VPC.CustomerGateway': MC.canvas.CGW_JSON,
        'AWS.VPC.NetworkInterface': MC.canvas.ENI_JSON,
        'AWS.AutoScaling.Group': MC.canvas.ASG_JSON,
        'AWS.AutoScaling.LaunchConfiguration': MC.canvas.ASL_LC_JSON
      };
      res = {};
      for (region in result) {
        nodes = result[region];
        res[region] = resourceMap(nodes);
      }
      app_json = $.extend(true, {}, MC.canvas.STACK_JSON);
      vpc_id = "";
      ignore_instances = [];
      for (region in res) {
        nodes = res[region];
        MC.aws.aws.cacheResource(nodes, region, false);
        app_json.region = region;
        for (resource_type in nodes) {
          resource_comp = nodes[resource_type];
          if (resource_type === 'DescribeInstanceHealth') {
            continue;
          }
          if (resource_comp) {
            if (resource_type === 'DescribeAvailabilityZones') {
              _ref = resource_comp.item;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                comp = _ref[_i];
                c = vpc_resource_map[resource_type](comp);
                app_json.component[c.uid] = c;
              }
            } else {
              if (resource_type === 'DescribeInstances') {
                keypair_name = [];
                for (_j = 0, _len1 = resource_comp.length; _j < _len1; _j++) {
                  comp = resource_comp[_j];
                  if (!comp.keyName) {
                    comp.keyName = "DefaultKP";
                  }
                  if (_ref1 = comp.keyName, __indexOf.call(keypair_name, _ref1) < 0) {
                    keypair_name.push(comp.keyName);
                    key_obj = {};
                    key_obj.keyName = comp.keyName;
                    key_obj.keyFingerprint = 'resource_import';
                    c = vpc_resource_map["DescribeKeyPairs"](key_obj);
                    if (c) {
                      app_json.component[c.uid] = c;
                    }
                  }
                }
              }
              if (resource_type === "DescribeVpcs") {
                vpc_id = resource_comp[0].vpcId;
              }
              if (resource_type === 'DescribeLaunchConfigurations') {
                for (_k = 0, _len2 = resource_comp.length; _k < _len2; _k++) {
                  comp = resource_comp[_k];
                  remove_index = [];
                  if (comp.BlockDeviceMappings) {
                    _ref2 = comp.BlockDeviceMappings.member;
                    for (idx in _ref2) {
                      device = _ref2[idx];
                      if (!device.Ebs) {
                        remove_index.push(idx);
                      }
                    }
                  }
                  remove_index = remove_index.sort().reverse();
                  for (_l = 0, _len3 = remove_index.length; _l < _len3; _l++) {
                    i = remove_index[_l];
                    comp.BlockDeviceMappings.member.splice(i, 1);
                  }
                }
              }
              if (resource_type === 'DescribeAutoScalingGroups') {
                for (_m = 0, _len4 = resource_comp.length; _m < _len4; _m++) {
                  asg = resource_comp[_m];
                  if (asg.Instances) {
                    _ref3 = asg.Instances.member;
                    for (_n = 0, _len5 = _ref3.length; _n < _len5; _n++) {
                      ins = _ref3[_n];
                      ignore_instances.push(ins.InstanceId);
                    }
                  }
                }
              }
              for (_o = 0, _len6 = resource_comp.length; _o < _len6; _o++) {
                comp = resource_comp[_o];
                c = vpc_resource_map[resource_type](comp);
                if (c) {
                  app_json.component[c.uid] = c;
                }
              }
            }
          }
        }
      }
      app_json.name = app_json.id = vpc_id;
      remove_uid = [];
      used_az = [];
      _ref4 = app_json.component;
      for (uid in _ref4) {
        c = _ref4[uid];
        if (c.type === 'AWS.EC2.Instance' && (_ref5 = c.resource.InstanceId, __indexOf.call(ignore_instances, _ref5) >= 0)) {
          remove_uid.push(c.uid);
        }
        if (c.type === 'AWS.VPC.Subnet') {
          if (_ref6 = c.resource.AvailabilityZone, __indexOf.call(used_az, _ref6) < 0) {
            used_az.push(c.resource.AvailabilityZone);
          }
        }
      }
      _ref7 = app_json.component;
      for (uid in _ref7) {
        c = _ref7[uid];
        if (c.type === 'AWS.VPC.NetworkInterface' && c.resource.Attachment.InstanceId && (_ref8 = c.resource.Attachment.InstanceId, __indexOf.call(ignore_instances, _ref8) >= 0)) {
          remove_uid.push(c.uid);
        }
        if (c.type === 'AWS.EC2.EBS.Volume' && c.resource.AttachmentSet.InstanceId && (_ref9 = c.resource.AttachmentSet.InstanceId, __indexOf.call(ignore_instances, _ref9) >= 0)) {
          remove_uid.push(c.uid);
        }
        if (c.type === 'AWS.EC2.AvailabilityZone' && (_ref10 = c.resource.ZoneName, __indexOf.call(used_az, _ref10) < 0)) {
          remove_uid.push(c.uid);
        }
      }
      for (_p = 0, _len7 = remove_uid.length; _p < _len7; _p++) {
        uid = remove_uid[_p];
        delete app_json.component[uid];
      }
      ref_res = MC.aws.aws.collectReference(app_json.component);
      app_json.component = ref_res[0];
      ref_key = ref_res[1];
      vpc_uid = MC.extractID(ref_key[vpc_id]);
      _ref11 = app_json.component;
      for (uid in _ref11) {
        c = _ref11[uid];
        if (vpc_resource_layout_map[c.type]) {
          layout = $.extend(true, {}, vpc_resource_layout_map[c.type].layout);
          layout.uid = c.uid;
          switch (c.type) {
            case 'AWS.VPC.NetworkInterface':
              layout.groupUId = MC.extractID(c.resource.SubnetId);
              if (c.resource.Attachment && ((_ref12 = c.resource.Attachment.DeviceIndex) !== '0' && _ref12 !== 0)) {
                app_json.layout.component.node[c.uid] = layout;
              } else if (!c.resource.Attachment) {
                app_json.layout.component.node[c.uid] = layout;
              }
              break;
            case "AWS.AutoScaling.Group":
              subnets = [];
              if (c.resource.VPCZoneIdentifier) {
                subs = c.resource.VPCZoneIdentifier.split(',');
                for (_q = 0, _len8 = subs.length; _q < _len8; _q++) {
                  subnet = subs[_q];
                  if (subnet[0] !== "@") {
                    subnets.push(MC.extractID(ref_key[subnet]));
                  } else {
                    subnets.push(MC.extractID(subnet));
                  }
                }
                c.resource.VPCZoneIdentifier = subnets.join(',');
              }
              originalId = '';
              _ref13 = app_json.component;
              for (uid_tmp in _ref13) {
                comp_tmp = _ref13[uid_tmp];
                if (comp_tmp.type === 'AWS.AutoScaling.LaunchConfiguration' && uid_tmp === MC.extractID(c.resource.LaunchConfigurationName)) {
                  if (app_json.layout.component.node[uid_tmp].groupUId) {
                    new_comp = $.extend(true, {}, comp_tmp);
                    new_uid = MC.guid();
                    new_comp.uid = new_uid;
                    new_layout = $.extend(true, {}, app_json.layout.component.node[uid_tmp]);
                    new_layout.originalId = new_uid;
                    new_layout.groupUId = c.uid;
                    new_layout.uid = new_uid;
                    c.resource.LaunchConfigurationName = "" + new_uid + ".resource.LaunchConfigurationName";
                    app_json.component[new_uid] = new_comp;
                    app_json.layout.component.node[new_uid] = new_layout;
                  } else {
                    app_json.layout.component.node[uid_tmp].groupUId = c.uid;
                  }
                }
              }
              _ref14 = c.resource.AvailabilityZones;
              for (idx in _ref14) {
                zone = _ref14[idx];
                extend_asg = $.extend(true, {}, layout);
                if (idx === 0 || idx === "0") {
                  if (subnets.length !== 0) {
                    originalId = subnets[idx];
                  } else {
                    originalId = MC.extractID(zone);
                  }
                  extend_asg_uid = c.uid;
                } else {
                  extend_asg_uid = MC.guid();
                  extend_asg.originalId = c.uid;
                }
                if (subnets.length !== 0) {
                  extend_asg.groupUId = subnets[idx];
                } else {
                  extend_asg.groupUId = MC.extractID(zone);
                }
                app_json.layout.component.group[extend_asg_uid] = extend_asg;
              }
              break;
            case 'AWS.EC2.Instance':
              if (c.resource.SubnetId) {
                layout.groupUId = MC.extractID(c.resource.SubnetId);
              } else {
                layout.groupUId = MC.extractID(c.resource.Placement.AvailabilityZone);
              }
              _ref15 = app_json.component;
              for (uid_tmp in _ref15) {
                comp_tmp = _ref15[uid_tmp];
                if (comp_tmp.type === "AWS.EC2.EBS.Volume" && comp_tmp.resource.AttachmentSet && comp_tmp.resource.AttachmentSet.InstanceId && MC.extractID(comp_tmp.resource.AttachmentSet.InstanceId) === c.uid) {
                  layout.volumeList[uid_tmp] = [uid_tmp];
                  app_json.component[c.uid].resource.BlockDeviceMapping.push("#" + uid_tmp);
                }
              }
              app_json.layout.component.node[c.uid] = layout;
              break;
            case 'AWS.AutoScaling.LaunchConfiguration':
              layout.originalId = c.uid;
              app_json.layout.component.node[c.uid] = layout;
              break;
            case "AWS.EC2.AvailabilityZone":
              layout.name = c.name;
              layout.groupUId = vpc_uid;
              app_json.layout.component.group[c.uid] = layout;
              break;
            case "AWS.VPC.Subnet":
              layout.groupUId = MC.extractID(c.resource.AvailabilityZone);
              app_json.layout.component.group[c.uid] = layout;
              break;
            case "AWS.VPC.VPC":
              app_json.layout.component.group[c.uid] = layout;
              break;
            default:
              layout.groupUId = vpc_uid;
              app_json.layout.component.node[c.uid] = layout;
          }
        }
      }
      console.log(app_json);
      return [app_json];
    };
    parserVpcResourceReturn = function(result, return_code, param) {
      var aws_result, error, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        try {
          resolved_data = resolveVpcResourceResult(result);
          aws_result.resolved_data = resolved_data;
        } catch (_error) {
          error = _error;
          console.log(error);
          aws_result.is_error = true;
          aws_result.error_message = "We can not reverse your app, please contact VisualOps";
          aws_result.return_code = 15;
        }
      }
      return aws_result;
    };
    resolveStatResourceResult = function(result) {};
    parserStatResourceReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = result;
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolvePropertyResult = function(result) {
      return result;
    };
    parserPropertyReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolvePropertyResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    quickstart = function(src, username, session_id, region_name, callback) {
      send_request("quickstart", src, [username, session_id, region_name], parserQuickstartReturn, callback);
      return true;
    };
    Public = function(src, username, session_id, region_name, filters, callback) {
      send_request("public", src, [username, session_id, region_name, filters], parserPublicReturn, callback);
      return true;
    };
    info = function(src, username, session_id, region_name, callback) {
      send_request("info", src, [username, session_id, region_name], parserInfoReturn, callback);
      return true;
    };
    resource = function(src, username, session_id, region_name, resources, addition, retry_times, callback) {
      if (region_name == null) {
        region_name = null;
      }
      if (resources == null) {
        resources = null;
      }
      if (addition == null) {
        addition = 'all';
      }
      if (retry_times == null) {
        retry_times = 1;
      }
      send_request("resource", src, [username, session_id, region_name, resources, addition, retry_times], parserResourceReturn, callback);
      return true;
    };
    price = function(src, username, session_id, callback) {
      send_request("price", src, [username, session_id], parserPriceReturn, callback);
      return true;
    };
    status = function(src, username, session_id, callback) {
      send_request("status", src, [username, session_id], parserStatusReturn, callback);
      return true;
    };
    vpc_resource = function(src, username, session_id, region_name, resources, addition, retry_times, callback) {
      if (region_name == null) {
        region_name = null;
      }
      if (resources == null) {
        resources = null;
      }
      if (addition == null) {
        addition = 'vpc';
      }
      if (retry_times == null) {
        retry_times = 1;
      }
      send_request("resource", src, [username, session_id, region_name, resources, addition, retry_times], parserVpcResourceReturn, callback);
      return true;
    };
    stat_resource = function(src, username, session_id, region_name, resources, callback) {
      if (region_name == null) {
        region_name = null;
      }
      if (resources == null) {
        resources = null;
      }
      send_request("stat_resource", src, [username, session_id, region_name, resources], parserStatResourceReturn, callback);
      return true;
    };
    property = function(src, username, session_id, callback) {
      send_request("property", src, [username, session_id], parserPropertyReturn, callback);
      return true;
    };
    return {
      quickstart: quickstart,
      Public: Public,
      info: info,
      resource: resource,
      price: price,
      status: status,
      vpc_resource: vpc_resource,
      stat_resource: stat_resource,
      property: property
    };
  });

}).call(this);

(function() {
  define('aws_model',['backbone', 'underscore', 'aws_service', 'base_model'], function(Backbone, _, aws_service, base_model) {
    var AWSModel, aws_model;
    AWSModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      quickstart: function(src, username, session_id, region_name) {
        var me;
        me = this;
        src.model = me;
        return aws_service.quickstart(src, username, session_id, region_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('AWS_QUICKSTART_RETURN', aws_result);
            }
          } else {
            console.log('aws.quickstart failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      Public: function(src, username, session_id, region_name, filters) {
        var me;
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return aws_service.Public(src, username, session_id, region_name, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('AWS__PUBLIC_RETURN', aws_result);
            }
          } else {
            console.log('aws.Public failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      info: function(src, username, session_id, region_name) {
        var me;
        me = this;
        src.model = me;
        return aws_service.info(src, username, session_id, region_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('AWS_INFO_RETURN', aws_result);
            }
          } else {
            console.log('aws.info failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      resource: function(src, username, session_id, region_name, resources, addition, retry_times) {
        var callback, key, me;
        if (region_name == null) {
          region_name = null;
        }
        if (resources == null) {
          resources = null;
        }
        if (addition == null) {
          addition = 'all';
        }
        if (retry_times == null) {
          retry_times = 1;
        }
        me = this;
        src.model = me;
        key = "aws_resource_" + region_name;
        callback = function(aws_result) {
          MC.cacheForDev(key, aws_result);
          if (addition === 'vpc') {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('AWS_RESOURCE_RETURN', aws_result);
            }
          } else if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('AWS_RESOURCE_RETURN', aws_result);
            }
          } else {
            console.log('aws.resource failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        };
        if (!MC.cacheForDev(key, null, callback)) {
          return aws_service.resource(src, username, session_id, region_name, resources, addition, retry_times, callback);
        }
      },
      price: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return aws_service.price(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('AWS_PRICE_RETURN', aws_result);
            }
          } else {
            console.log('aws.price failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      status: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return aws_service.status(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('AWS_STATUS_RETURN', aws_result);
            }
          } else {
            console.log('aws.status failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      vpc_resource: function(src, username, session_id, region_name, resources, addition, retry_times) {
        var me;
        if (region_name == null) {
          region_name = null;
        }
        if (resources == null) {
          resources = null;
        }
        if (addition == null) {
          addition = 'all';
        }
        if (retry_times == null) {
          retry_times = 1;
        }
        me = this;
        src.model = me;
        return aws_service.vpc_resource(src, username, session_id, region_name, resources, addition, retry_times, function(aws_result) {
          if (src.sender && src.sender.trigger) {
            return src.sender.trigger('AWS_VPC__RESOURCE_RETURN', aws_result);
          }
        });
      },
      stat_resource: function(src, username, session_id, region_name, resources) {
        var me;
        if (region_name == null) {
          region_name = null;
        }
        if (resources == null) {
          resources = null;
        }
        me = this;
        src.model = me;
        return aws_service.stat_resource(src, username, session_id, region_name, resources, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('AWS_STAT__RESOURCE_RETURN', aws_result);
            }
          } else {
            console.log('aws.stat_resource failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      property: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return aws_service.property(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('AWS_PROPERTY_RETURN', aws_result);
            }
          } else {
            console.log('aws.property failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    aws_model = new AWSModel();
    return aws_model;
  });

}).call(this);

(function() {
  define('ami_model',['backbone', 'underscore', 'ami_service', 'base_model'], function(Backbone, _, ami_service, base_model) {
    var AMIModel, ami_model;
    AMIModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      CreateImage: function(src, username, session_id, region_name, instance_id, ami_name, ami_desc, no_reboot, bd_mappings) {
        var me;
        if (ami_desc == null) {
          ami_desc = null;
        }
        if (no_reboot == null) {
          no_reboot = false;
        }
        if (bd_mappings == null) {
          bd_mappings = null;
        }
        me = this;
        src.model = me;
        return ami_service.CreateImage(src, username, session_id, region_name, instance_id, ami_name, ami_desc, no_reboot, bd_mappings, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_AMI_CREATE_IMAGE_RETURN', aws_result);
            }
          } else {
            console.log('ami.CreateImage failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      RegisterImage: function(src, username, session_id, region_name, ami_name, ami_desc) {
        var me;
        if (ami_name == null) {
          ami_name = null;
        }
        if (ami_desc == null) {
          ami_desc = null;
        }
        me = this;
        src.model = me;
        return ami_service.RegisterImage(src, username, session_id, region_name, ami_name, ami_desc, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_AMI_REGISTER_IMAGE_RETURN', aws_result);
            }
          } else {
            console.log('ami.RegisterImage failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DeregisterImage: function(src, username, session_id, region_name, ami_id) {
        var me;
        me = this;
        src.model = me;
        return ami_service.DeregisterImage(src, username, session_id, region_name, ami_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_AMI_DEREGISTER_IMAGE_RETURN', aws_result);
            }
          } else {
            console.log('ami.DeregisterImage failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ModifyImageAttribute: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return ami_service.ModifyImageAttribute(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_AMI_MODIFY_IMAGE_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('ami.ModifyImageAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ResetImageAttribute: function(src, username, session_id, region_name, ami_id, attribute_name) {
        var me;
        if (attribute_name == null) {
          attribute_name = 'launchPermission';
        }
        me = this;
        src.model = me;
        return ami_service.ResetImageAttribute(src, username, session_id, region_name, ami_id, attribute_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_AMI_RESET_IMAGE_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('ami.ResetImageAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeImageAttribute: function(src, username, session_id, region_name, ami_id, attribute_name) {
        var me;
        me = this;
        src.model = me;
        return ami_service.DescribeImageAttribute(src, username, session_id, region_name, ami_id, attribute_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_AMI_DESC_IMAGE_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('ami.DescribeImageAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeImages: function(src, username, session_id, region_name, ami_ids, owners, executable_by, filters) {
        var me;
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
        me = this;
        src.model = me;
        return ami_service.DescribeImages(src, username, session_id, region_name, ami_ids, owners, executable_by, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_AMI_DESC_IMAGES_RETURN', aws_result);
            }
          } else {
            console.log('ami.DescribeImages failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    ami_model = new AMIModel();
    return ami_model;
  });

}).call(this);

(function() {
  define('ebs_model',['backbone', 'underscore', 'ebs_service', 'base_model'], function(Backbone, _, ebs_service, base_model) {
    var EBSModel, ebs_model;
    EBSModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      CreateVolume: function(src, username, session_id, region_name, zone_name, snapshot_id, volume_size, volume_type, iops) {
        var me;
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
        me = this;
        src.model = me;
        return ebs_service.CreateVolume(src, username, session_id, region_name, zone_name, snapshot_id, volume_size, volume_type, iops, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_CREATE_VOL_RETURN', aws_result);
            }
          } else {
            console.log('ebs.CreateVolume failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DeleteVolume: function(src, username, session_id, region_name, volume_id) {
        var me;
        me = this;
        src.model = me;
        return ebs_service.DeleteVolume(src, username, session_id, region_name, volume_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_DELETE_VOL_RETURN', aws_result);
            }
          } else {
            console.log('ebs.DeleteVolume failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      AttachVolume: function(src, username, session_id, region_name, volume_id, instance_id, device) {
        var me;
        me = this;
        src.model = me;
        return ebs_service.AttachVolume(src, username, session_id, region_name, volume_id, instance_id, device, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_ATTACH_VOL_RETURN', aws_result);
            }
          } else {
            console.log('ebs.AttachVolume failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DetachVolume: function(src, username, session_id, region_name, volume_id, instance_id, device, force) {
        var me;
        if (instance_id == null) {
          instance_id = null;
        }
        if (device == null) {
          device = null;
        }
        if (force == null) {
          force = false;
        }
        me = this;
        src.model = me;
        return ebs_service.DetachVolume(src, username, session_id, region_name, volume_id, instance_id, device, force, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_DETACH_VOL_RETURN', aws_result);
            }
          } else {
            console.log('ebs.DetachVolume failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeVolumes: function(src, username, session_id, region_name, volume_ids, filters) {
        var me;
        if (volume_ids == null) {
          volume_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return ebs_service.DescribeVolumes(src, username, session_id, region_name, volume_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_DESC_VOLS_RETURN', aws_result);
            }
          } else {
            console.log('ebs.DescribeVolumes failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeVolumeAttribute: function(src, username, session_id, region_name, volume_id, attribute_name) {
        var me;
        if (attribute_name == null) {
          attribute_name = 'autoEnableIO';
        }
        me = this;
        src.model = me;
        return ebs_service.DescribeVolumeAttribute(src, username, session_id, region_name, volume_id, attribute_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_DESC_VOL_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('ebs.DescribeVolumeAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeVolumeStatus: function(src, username, session_id, region_name, volume_ids, filters, max_result, next_token) {
        var me;
        if (filters == null) {
          filters = null;
        }
        if (max_result == null) {
          max_result = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return ebs_service.DescribeVolumeStatus(src, username, session_id, region_name, volume_ids, filters, max_result, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_DESC_VOL_STATUS_RETURN', aws_result);
            }
          } else {
            console.log('ebs.DescribeVolumeStatus failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ModifyVolumeAttribute: function(src, username, session_id, region_name, volume_id, auto_enable_IO) {
        var me;
        if (auto_enable_IO == null) {
          auto_enable_IO = false;
        }
        me = this;
        src.model = me;
        return ebs_service.ModifyVolumeAttribute(src, username, session_id, region_name, volume_id, auto_enable_IO, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_MODIFY_VOL_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('ebs.ModifyVolumeAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      EnableVolumeIO: function(src, username, session_id, region_name, volume_id) {
        var me;
        me = this;
        src.model = me;
        return ebs_service.EnableVolumeIO(src, username, session_id, region_name, volume_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_ENABLE_VOL_I_O_RETURN', aws_result);
            }
          } else {
            console.log('ebs.EnableVolumeIO failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      CreateSnapshot: function(src, username, session_id, region_name, volume_id, description) {
        var me;
        if (description == null) {
          description = null;
        }
        me = this;
        src.model = me;
        return ebs_service.CreateSnapshot(src, username, session_id, region_name, volume_id, description, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_CREATE_SS_RETURN', aws_result);
            }
          } else {
            console.log('ebs.CreateSnapshot failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DeleteSnapshot: function(src, username, session_id, region_name, snapshot_id) {
        var me;
        me = this;
        src.model = me;
        return ebs_service.DeleteSnapshot(src, username, session_id, region_name, snapshot_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_DELETE_SS_RETURN', aws_result);
            }
          } else {
            console.log('ebs.DeleteSnapshot failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ModifySnapshotAttribute: function(src, username, session_id, region_name, snapshot_id, user_ids, group_names) {
        var me;
        me = this;
        src.model = me;
        return ebs_service.ModifySnapshotAttribute(src, username, session_id, region_name, snapshot_id, user_ids, group_names, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_MODIFY_SS_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('ebs.ModifySnapshotAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ResetSnapshotAttribute: function(src, username, session_id, region_name, snapshot_id, attribute_name) {
        var me;
        if (attribute_name == null) {
          attribute_name = 'createVolumePermission';
        }
        me = this;
        src.model = me;
        return ebs_service.ResetSnapshotAttribute(src, username, session_id, region_name, snapshot_id, attribute_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_RESET_SS_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('ebs.ResetSnapshotAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeSnapshots: function(src, username, session_id, region_name, snapshot_ids, owners, restorable_by, filters) {
        var me;
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
        me = this;
        src.model = me;
        return ebs_service.DescribeSnapshots(src, username, session_id, region_name, snapshot_ids, owners, restorable_by, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_DESC_SSS_RETURN', aws_result);
            }
          } else {
            console.log('ebs.DescribeSnapshots failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeSnapshotAttribute: function(src, username, session_id, region_name, snapshot_id, attribute_name) {
        var me;
        if (attribute_name == null) {
          attribute_name = 'createVolumePermission';
        }
        me = this;
        src.model = me;
        return ebs_service.DescribeSnapshotAttribute(src, username, session_id, region_name, snapshot_id, attribute_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EBS_DESC_SS_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('ebs.DescribeSnapshotAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    ebs_model = new EBSModel();
    return ebs_model;
  });

}).call(this);

(function() {
  define('elb_model',['backbone', 'underscore', 'elb_service', 'base_model'], function(Backbone, _, elb_service, base_model) {
    var ELBModel, elb_model;
    ELBModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeInstanceHealth: function(src, username, session_id, region_name, elb_name, instance_ids) {
        var me;
        if (instance_ids == null) {
          instance_ids = null;
        }
        me = this;
        src.model = me;
        return elb_service.DescribeInstanceHealth(src, username, session_id, region_name, elb_name, instance_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ELB__DESC_INS_HLT_RETURN', aws_result);
            }
          } else {
            console.log('elb.DescribeInstanceHealth failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeLoadBalancerPolicies: function(src, username, session_id, region_name, elb_name, policy_names) {
        var me;
        if (elb_name == null) {
          elb_name = null;
        }
        if (policy_names == null) {
          policy_names = null;
        }
        me = this;
        src.model = me;
        return elb_service.DescribeLoadBalancerPolicies(src, username, session_id, region_name, elb_name, policy_names, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ELB__DESC_LB_PCYS_RETURN', aws_result);
            }
          } else {
            console.log('elb.DescribeLoadBalancerPolicies failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeLoadBalancerPolicyTypes: function(src, username, session_id, region_name, policy_type_names) {
        var me;
        if (policy_type_names == null) {
          policy_type_names = null;
        }
        me = this;
        src.model = me;
        return elb_service.DescribeLoadBalancerPolicyTypes(src, username, session_id, region_name, policy_type_names, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ELB__DESC_LB_PCY_TYPS_RETURN', aws_result);
            }
          } else {
            console.log('elb.DescribeLoadBalancerPolicyTypes failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeLoadBalancers: function(src, username, session_id, region_name, elb_names, marker) {
        var me;
        if (elb_names == null) {
          elb_names = null;
        }
        if (marker == null) {
          marker = null;
        }
        me = this;
        src.model = me;
        return elb_service.DescribeLoadBalancers(src, username, session_id, region_name, elb_names, marker, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ELB__DESC_LBS_RETURN', aws_result);
            }
          } else {
            console.log('elb.DescribeLoadBalancers failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeLoadBalancerAttributes: function(src, username, session_id, region_name, elb_name) {
        var me;
        me = this;
        src.model = me;
        return elb_service.DescribeLoadBalancerAttributes(src, username, session_id, region_name, elb_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ELB__DESC_LB_ATTRS_RETURN', aws_result);
            }
          } else {
            console.log('elb.DescribeLoadBalancerAttributes failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    elb_model = new ELBModel();
    return elb_model;
  });

}).call(this);

(function() {
  define('dhcp_model',['backbone', 'underscore', 'dhcp_service', 'base_model'], function(Backbone, _, dhcp_service, base_model) {
    var DHCPModel, dhcp_model;
    DHCPModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeDhcpOptions: function(src, username, session_id, region_name, dhcp_ids, filters) {
        var me;
        if (dhcp_ids == null) {
          dhcp_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return dhcp_service.DescribeDhcpOptions(src, username, session_id, region_name, dhcp_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_DHCP_DESC_DHCP_OPTS_RETURN', aws_result);
            }
          } else {
            console.log('dhcp.DescribeDhcpOptions failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    dhcp_model = new DHCPModel();
    return dhcp_model;
  });

}).call(this);

(function() {
  define('customergateway_model',['backbone', 'underscore', 'customergateway_service', 'base_model'], function(Backbone, _, customergateway_service, base_model) {
    var CustomerGatewayModel, customergateway_model;
    CustomerGatewayModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeCustomerGateways: function(src, username, session_id, region_name, gw_ids, filters) {
        var me;
        if (gw_ids == null) {
          gw_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return customergateway_service.DescribeCustomerGateways(src, username, session_id, region_name, gw_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_CGW_DESC_CUST_GWS_RETURN', aws_result);
            }
          } else {
            console.log('customergateway.DescribeCustomerGateways failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    customergateway_model = new CustomerGatewayModel();
    return customergateway_model;
  });

}).call(this);

(function() {
  define('vpngateway_model',['backbone', 'underscore', 'vpngateway_service', 'base_model'], function(Backbone, _, vpngateway_service, base_model) {
    var VPNGatewayModel, vpngateway_model;
    VPNGatewayModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeVpnGateways: function(src, username, session_id, region_name, gw_ids, filters) {
        var me;
        if (gw_ids == null) {
          gw_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return vpngateway_service.DescribeVpnGateways(src, username, session_id, region_name, gw_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_VGW_DESC_VPN_GWS_RETURN', aws_result);
            }
          } else {
            console.log('vpngateway.DescribeVpnGateways failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    vpngateway_model = new VPNGatewayModel();
    return vpngateway_model;
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
  define('autoscaling_model',['backbone', 'underscore', 'autoscaling_service', 'base_model'], function(Backbone, _, autoscaling_service, base_model) {
    var AutoScalingModel, autoscaling_model;
    AutoScalingModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeAdjustmentTypes: function(src, username, session_id, region_name) {
        var me;
        me = this;
        src.model = me;
        return autoscaling_service.DescribeAdjustmentTypes(src, username, session_id, region_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_ADJT_TYPS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribeAdjustmentTypes failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeAutoScalingGroups: function(src, username, session_id, region_name, group_names, max_records, next_token) {
        var me;
        if (group_names == null) {
          group_names = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return autoscaling_service.DescribeAutoScalingGroups(src, username, session_id, region_name, group_names, max_records, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_ASL_GRPS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribeAutoScalingGroups failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeAutoScalingInstances: function(src, username, session_id, region_name, instance_ids, max_records, next_token) {
        var me;
        if (instance_ids == null) {
          instance_ids = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return autoscaling_service.DescribeAutoScalingInstances(src, username, session_id, region_name, instance_ids, max_records, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_ASL_INSS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribeAutoScalingInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeAutoScalingNotificationTypes: function(src, username, session_id, region_name) {
        var me;
        me = this;
        src.model = me;
        return autoscaling_service.DescribeAutoScalingNotificationTypes(src, username, session_id, region_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_ASL_NTF_TYPS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribeAutoScalingNotificationTypes failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeLaunchConfigurations: function(src, username, session_id, region_name, config_names, max_records, next_token) {
        var me;
        if (config_names == null) {
          config_names = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return autoscaling_service.DescribeLaunchConfigurations(src, username, session_id, region_name, config_names, max_records, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_LAUNCH_CONFS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribeLaunchConfigurations failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeMetricCollectionTypes: function(src, username, session_id, region_name) {
        var me;
        me = this;
        src.model = me;
        return autoscaling_service.DescribeMetricCollectionTypes(src, username, session_id, region_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_METRIC_COLL_TYPS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribeMetricCollectionTypes failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeNotificationConfigurations: function(src, username, session_id, region_name, group_names, max_records, next_token) {
        var me;
        if (group_names == null) {
          group_names = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return autoscaling_service.DescribeNotificationConfigurations(src, username, session_id, region_name, group_names, max_records, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_NTF_CONFS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribeNotificationConfigurations failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribePolicies: function(src, username, session_id, region_name, group_name, policy_names, max_records, next_token) {
        var me;
        if (group_name == null) {
          group_name = null;
        }
        if (policy_names == null) {
          policy_names = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return autoscaling_service.DescribePolicies(src, username, session_id, region_name, group_name, policy_names, max_records, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_PCYS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribePolicies failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeScalingActivities: function(src, username, session_id, region_name, group_name, activity_ids, max_records, next_token) {
        var me;
        if (group_name == null) {
          group_name = null;
        }
        if (activity_ids == null) {
          activity_ids = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return autoscaling_service.DescribeScalingActivities(src, username, session_id, region_name, group_name, activity_ids, max_records, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_SCALING_ACTIS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribeScalingActivities failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeScalingProcessTypes: function(src, username, session_id, region_name) {
        var me;
        me = this;
        src.model = me;
        return autoscaling_service.DescribeScalingProcessTypes(src, username, session_id, region_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_SCALING_PRC_TYPS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribeScalingProcessTypes failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeScheduledActions: function(src, username, session_id, region_name, group_name, action_names, start_time, end_time, max_records, next_token) {
        var me;
        if (group_name == null) {
          group_name = null;
        }
        if (action_names == null) {
          action_names = null;
        }
        if (start_time == null) {
          start_time = null;
        }
        if (end_time == null) {
          end_time = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return autoscaling_service.DescribeScheduledActions(src, username, session_id, region_name, group_name, action_names, start_time, end_time, max_records, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_SCHD_ACTS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribeScheduledActions failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeTags: function(src, username, session_id, region_name, filters, max_records, next_token) {
        var me;
        if (filters == null) {
          filters = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return autoscaling_service.DescribeTags(src, username, session_id, region_name, filters, max_records, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('ASL__DESC_TAGS_RETURN', aws_result);
            }
          } else {
            console.log('autoscaling.DescribeTags failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    autoscaling_model = new AutoScalingModel();
    return autoscaling_model;
  });

}).call(this);

(function() {
  define('cloudwatch_model',['backbone', 'underscore', 'cloudwatch_service', 'base_model'], function(Backbone, _, cloudwatch_service, base_model) {
    var CloudWatchModel, cloudwatch_model;
    CloudWatchModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      GetMetricStatistics: function(src, username, session_id, region_name, metric_name, namespace, start_time, end_time, period, unit, statistics, dimensions) {
        var me;
        if (dimensions == null) {
          dimensions = null;
        }
        me = this;
        src.model = me;
        return cloudwatch_service.GetMetricStatistics(src, username, session_id, region_name, metric_name, namespace, start_time, end_time, period, unit, statistics, dimensions, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('CW__GET_METRIC_STATS_RETURN', aws_result);
            }
          } else {
            console.log('cloudwatch.GetMetricStatistics failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ListMetrics: function(src, username, session_id, region_name, metric_name, namespace, dimensions, next_token) {
        var me;
        if (metric_name == null) {
          metric_name = null;
        }
        if (namespace == null) {
          namespace = null;
        }
        if (dimensions == null) {
          dimensions = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return cloudwatch_service.ListMetrics(src, username, session_id, region_name, metric_name, namespace, dimensions, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('CW__LST_METRICS_RETURN', aws_result);
            }
          } else {
            console.log('cloudwatch.ListMetrics failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeAlarmHistory: function(src, username, session_id, region_name, alarm_name, start_date, end_date, history_item_type, max_records, next_token) {
        var me;
        if (alarm_name == null) {
          alarm_name = null;
        }
        if (start_date == null) {
          start_date = null;
        }
        if (end_date == null) {
          end_date = null;
        }
        if (history_item_type == null) {
          history_item_type = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return cloudwatch_service.DescribeAlarmHistory(src, username, session_id, region_name, alarm_name, start_date, end_date, history_item_type, max_records, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('CW__DESC_ALM_HIST_RETURN', aws_result);
            }
          } else {
            console.log('cloudwatch.DescribeAlarmHistory failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeAlarms: function(src, username, session_id, region_name, alarm_names, alarm_name_prefix, action_prefix, state_value, max_records, next_token) {
        var me;
        if (alarm_names == null) {
          alarm_names = null;
        }
        if (alarm_name_prefix == null) {
          alarm_name_prefix = null;
        }
        if (action_prefix == null) {
          action_prefix = null;
        }
        if (state_value == null) {
          state_value = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return cloudwatch_service.DescribeAlarms(src, username, session_id, region_name, alarm_names, alarm_name_prefix, action_prefix, state_value, max_records, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('CW__DESC_ALMS_RETURN', aws_result);
            }
          } else {
            console.log('cloudwatch.DescribeAlarms failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeAlarmsForMetric: function(src, username, session_id, region_name, metric_name, namespace, dimension_names, period, statistic, unit) {
        var me;
        if (dimension_names == null) {
          dimension_names = null;
        }
        if (period == null) {
          period = null;
        }
        if (statistic == null) {
          statistic = null;
        }
        if (unit == null) {
          unit = null;
        }
        me = this;
        src.model = me;
        return cloudwatch_service.DescribeAlarmsForMetric(src, username, session_id, region_name, metric_name, namespace, dimension_names, period, statistic, unit, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('CW__DESC_ALMS_FOR_METRIC_RETURN', aws_result);
            }
          } else {
            console.log('cloudwatch.DescribeAlarmsForMetric failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    cloudwatch_model = new CloudWatchModel();
    return cloudwatch_model;
  });

}).call(this);

(function() {
  define('sns_model',['backbone', 'underscore', 'sns_service', 'base_model'], function(Backbone, _, sns_service, base_model) {
    var SNSModel, sns_model;
    SNSModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      GetSubscriptionAttributes: function(src, username, session_id, region_name, subscription_arn) {
        var me;
        me = this;
        src.model = me;
        return sns_service.GetSubscriptionAttributes(src, username, session_id, region_name, subscription_arn, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('SNS__GET_SUBSCR_ATTRS_RETURN', aws_result);
            }
          } else {
            console.log('sns.GetSubscriptionAttributes failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      GetTopicAttributes: function(src, username, session_id, region_name, topic_arn) {
        var me;
        me = this;
        src.model = me;
        return sns_service.GetTopicAttributes(src, username, session_id, region_name, topic_arn, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('SNS__GET_TOPIC_ATTRS_RETURN', aws_result);
            }
          } else {
            console.log('sns.GetTopicAttributes failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ListSubscriptions: function(src, username, session_id, region_name, next_token) {
        var me;
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return sns_service.ListSubscriptions(src, username, session_id, region_name, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('SNS__LST_SUBSCRS_RETURN', aws_result);
            }
          } else {
            console.log('sns.ListSubscriptions failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ListSubscriptionsByTopic: function(src, username, session_id, region_name, topic_arn, next_token) {
        var me;
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return sns_service.ListSubscriptionsByTopic(src, username, session_id, region_name, topic_arn, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('SNS__LST_SUBSCRS_BY_TOPIC_RETURN', aws_result);
            }
          } else {
            console.log('sns.ListSubscriptionsByTopic failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ListTopics: function(src, username, session_id, region_name, next_token) {
        var me;
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return sns_service.ListTopics(src, username, session_id, region_name, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('SNS__LST_TOPICS_RETURN', aws_result);
            }
          } else {
            console.log('sns.ListTopics failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    sns_model = new SNSModel();
    return sns_model;
  });

}).call(this);

(function() {
  define('subnet_model',['backbone', 'underscore', 'subnet_service', 'base_model'], function(Backbone, _, subnet_service, base_model) {
    var SubnetModel, subnet_model;
    SubnetModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeSubnets: function(src, username, session_id, region_name, subnet_ids, filters) {
        var me;
        if (subnet_ids == null) {
          subnet_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return subnet_service.DescribeSubnets(src, username, session_id, region_name, subnet_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_SNET_DESC_SUBNETS_RETURN', aws_result);
            }
          } else {
            console.log('subnet.DescribeSubnets failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    subnet_model = new SubnetModel();
    return subnet_model;
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
  define('placementgroup_service',['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var CreatePlacementGroup, DeletePlacementGroup, DescribePlacementGroups, URL, parserCreatePlacementGroupReturn, parserDeletePlacementGroupReturn, parserDescribePlacementGroupsReturn, resolveDescribePlacementGroupsResult, send_request;
    URL = '/aws/ec2/placementgroup/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("placementgroup." + api_name + " callback is null");
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
        console.log("placementgroup." + api_name + " error:" + error.toString());
      }
      return true;
    };
    parserCreatePlacementGroupReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    parserDeletePlacementGroupReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    resolveDescribePlacementGroupsResult = function(result) {};
    parserDescribePlacementGroupsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribePlacementGroupsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    CreatePlacementGroup = function(src, username, session_id, region_name, group_name, strategy, callback) {
      if (strategy == null) {
        strategy = 'cluster';
      }
      send_request("CreatePlacementGroup", src, [username, session_id, region_name, group_name, strategy], parserCreatePlacementGroupReturn, callback);
      return true;
    };
    DeletePlacementGroup = function(src, username, session_id, region_name, group_name, callback) {
      send_request("DeletePlacementGroup", src, [username, session_id, region_name, group_name], parserDeletePlacementGroupReturn, callback);
      return true;
    };
    DescribePlacementGroups = function(src, username, session_id, region_name, group_names, filters, callback) {
      if (group_names == null) {
        group_names = null;
      }
      if (filters == null) {
        filters = null;
      }
      send_request("DescribePlacementGroups", src, [username, session_id, region_name, group_names, filters], parserDescribePlacementGroupsReturn, callback);
      return true;
    };
    return {
      CreatePlacementGroup: CreatePlacementGroup,
      DeletePlacementGroup: DeletePlacementGroup,
      DescribePlacementGroups: DescribePlacementGroups
    };
  });

}).call(this);


define("model/model", function(){});
