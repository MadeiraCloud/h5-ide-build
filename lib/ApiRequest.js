(function() {
  define('lib/ApiRequestDefs',[], function() {

    /*
    == Following name of the paramter is autofilled. Thus the paramter is not required.
    == It also means that you cannot use a param name if the param is for sth. else.
       For example, the param's name cannot be username, if it's used to represent Instance's Id.
    
    ** Auto Fill List :
    username
    usercode
    session_id
     */
    var ApiRequestDefs;
    ApiRequestDefs = {
      login: {
        url: "/session/",
        method: "login",
        params: ["username", "password"]
      },
      logout: {
        url: "/session/",
        method: "logout",
        params: ["usercode", "session_id"]
      },
      syncRedis: {
        url: "/session/",
        method: "sync_redis",
        params: ["usercode", "session_id"]
      },
      updateCred: {
        url: "/session/",
        method: "set_credential",
        params: ["username", "session_id", "access_key", "secret_key", "account_id"]
      },
      resetKey: {
        url: "/account/",
        method: "reset_key",
        params: ["usercode", "session_id", "flag"]
      }
    };

    /*
    Parsers are promise's success hanlder.
    Thus, if the parser cannot parse a result, it should throw an error !!!
    An example would be like :
    ```
    throw {
      error : 300
      msg   : "Cannot parse the result"
    }
    ```
     */
    ApiRequestDefs.Parsers = {
      login: function(result) {
        return {
          usercode: result[0],
          email: result[1],
          user_hash: result[2],
          session_id: result[3],
          account_id: result[4],
          mod_repo: result[5],
          mod_tag: result[6],
          state: result[7],
          has_cred: result[8]
        };
      }
    };
    ApiRequestDefs.autoFill = function(paramter_name) {
      switch (paramter_name) {
        case "username":
          return $.cookie('username');
        case "usercode":
          return $.cookie('usercode');
        case "session_id":
          return $.cookie('session_id');
      }
      return null;
    };
    return ApiRequestDefs;
  });

}).call(this);

(function() {
  define('ApiRequest',["lib/ApiRequestDefs", "MC"], function(ApiDefination) {

    /*
     * === ApiRequest ===
     *
     * Paramters :
     *   apiName       : (String) The name of the api, see ApiRequestDefs
     *   apiParameters : An object to be send with the api request.
     *         If an api has its parameters map, the `apiParameters` will be converted from OBJECT to ARRAY
     *         If an api has no param map, the apiParameters is considered as the first and only one paramter
     *         to be send with the api.
     */
    var Abort, AjaxErrorHandler, AjaxSuccessHandler, ApiRequest, EmptyArray, EmptyObject, OneParaArray, RequestData;
    OneParaArray = [""];
    EmptyArray = [];
    EmptyObject = {};
    RequestData = {
      jsonrpc: '2.0',
      id: "1",
      method: '',
      params: {}
    };
    ({
      logAndThrow: function(obj) {

        /* env:dev                                     env:dev:end */
        throw obj;
      }
    });
    AjaxSuccessHandler = function(res) {
      if (!res || !res.result || res.result.length !== 2) {
        logAndThrow({
          error: -1,
          msg: "Invalid JsonRpc Return Data"
        });
      }
      if (res.result[0] !== 0) {
        logAndThrow({
          error: res.result[0],
          msg: "Service Error",
          result: res.result[1]
        });
      }
      return res.result[1];
    };
    AjaxErrorHandler = function(jqXHR, textStatus, error) {
      if (!error && jqXHR.status !== 200) {
        logAndThrow({
          error: -jqXHR.status,
          msg: "Network Error"
        });
      }
      logAndThrow({
        error: -2,
        msg: textStatus,
        result: error
      });
    };
    Abort = function() {
      this.ajax.abort();
    };
    ApiRequest = function(apiName, apiParameters) {
      var ApiDef, ajax, i, p, request, _i, _len, _ref;
      ApiDef = ApiDefination[apiName];
      apiParameters = apiParameters || EmptyObject;
      if (!ApiDef) {
        console.error("Cannot find defination of the api:", apiName);
        return;
      }
      RequestData.method = ApiDef.method || "";
      if (ApiDef.params) {
        RequestData.params = p = [];
        _ref = ApiDef.params;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          p.push(apiParameters[i] || ApiDefination.autoFill(i));
        }
      } else if (apiParameters) {
        OneParaArray[0] = apiParameters;
        RequestData.params = OneParaArray;
      } else {
        RequestData.params = EmptyArray;
      }
      ajax = $.ajax({
        url: MC.API_HOST + ApiDef.url,
        dataType: "json",
        type: "POST",
        data: JSON.stringify(RequestData)
      });
      request = Q(ajax).then(AjaxSuccessHandler, AjaxErrorHandler);
      if (ApiDefination.Parsers[apiName]) {
        request = request.then(ApiDefination.Parsers[apiName]);
      }
      request.abort = Abort;
      request.ajax = ajax;
      return request;
    };
    return ApiRequest;
  });

}).call(this);

