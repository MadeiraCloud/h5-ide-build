(function() {
  define(['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DomainMetadata, GetAttributes, ListDomains, URL, parserDomainMetadataReturn, parserGetAttributesReturn, parserListDomainsReturn, resolveGetAttributesResult, resolveListDomainsResult, send_request;
    URL = '/aws/sdb/sdb/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("sdb." + api_name + " callback is null");
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
        console.log("sdb." + api_name + " error:" + error.toString());
      }
      return true;
    };
    parserDomainMetadataReturn = function(result, return_code, param) {
      var aws_result;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      return aws_result;
    };
    resolveGetAttributesResult = function(result) {};
    parserGetAttributesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveGetAttributesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveListDomainsResult = function(result) {};
    parserListDomainsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveListDomainsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DomainMetadata = function(src, username, session_id, region_name, doamin_name, callback) {
      send_request("DomainMetadata", src, [username, session_id, region_name, doamin_name], parserDomainMetadataReturn, callback);
      return true;
    };
    GetAttributes = function(src, username, session_id, region_name, domain_name, item_name, attribute_name, consistent_read, callback) {
      if (attribute_name == null) {
        attribute_name = null;
      }
      if (consistent_read == null) {
        consistent_read = null;
      }
      send_request("GetAttributes", src, [username, session_id, region_name, domain_name, item_name, attribute_name, consistent_read], parserGetAttributesReturn, callback);
      return true;
    };
    ListDomains = function(src, username, session_id, region_name, max_domains, next_token, callback) {
      if (max_domains == null) {
        max_domains = null;
      }
      if (next_token == null) {
        next_token = null;
      }
      send_request("ListDomains", src, [username, session_id, region_name, max_domains, next_token], parserListDomainsReturn, callback);
      return true;
    };
    return {
      DomainMetadata: DomainMetadata,
      GetAttributes: GetAttributes,
      ListDomains: ListDomains
    };
  });

}).call(this);
