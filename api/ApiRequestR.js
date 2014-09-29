(function() {
  define(["ApiRequestRDefs", "api/ApiRequestErrors", "MC"], function(ApiDefination, ApiErrors) {

    /*
     * === Restful ApiRequest ===
     *
     * Paramters :
     *   apiName       : (String) The name of the api, see ApiRequestDefs
     *   apiParameters : An object to be send with the api request.
     *         If an api has its parameters map, the `apiParameters` will be converted from OBJECT to ARRAY
     *         If an api has no param map, the apiParameters is considered as the first and only one paramter
     *         to be send with the api.
     */
    var Abort, AjaxErrorHandler, ApiRequestRestful, EmptyObject, logAndThrow;
    EmptyObject = {};
    logAndThrow = function(obj) {

      /* env:dev                                     env:dev:end */
      throw obj;
    };
    AjaxErrorHandler = function(jqXHR, textStatus, error) {
      if (!error && jqXHR.status !== 200) {
        logAndThrow(McError(-jqXHR.status, "Network Error"));
      }
      logAndThrow(McError(ApiErrors.XhrFailure, textStatus, error));
    };
    Abort = function() {
      this.ajax.abort();
    };

    /*
     Restful ApiRequest Defination
     */
    ApiRequestRestful = function(apiName, apiParameters) {
      var ApiDef, ajax, i, p, request, url, _i, _len, _ref;
      ApiDef = ApiDefination[apiName];
      apiParameters = apiParameters || EmptyObject;
      if (!ApiDef) {
        console.error("Cannot find defination of the api:", apiName);
        return;
      }
      url = ApiDef.url + App.user.get("usercode") + "/" + App.user.get("session");
      if (ApiDef.params) {
        p = [];
        _ref = ApiDef.params;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (apiParameters.hasOwnProperty(i)) {
            p.push(apiParameters[i]);
          }
        }
        if (p.length) {
          url += "/" + p.join("/");
        }
      }
      ajax = $.ajax({
        url: MC.API_HOST + url,
        dataType: "json",
        type: ApiDef.method || "GET",
        jsonp: false,
        cache: false
      });
      request = Q(ajax).fail(AjaxErrorHandler);
      request.abort = Abort;
      request.ajax = ajax;
      return request;
    };
    ApiRequestRestful.Errors = ApiErrors;
    return ApiRequestRestful;
  });

}).call(this);
