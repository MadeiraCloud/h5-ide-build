(function() {
  define(['backbone', 'underscore', 'iam_service', 'base_model'], function(Backbone, _, iam_service, base_model) {
    var IAMModel, iam_model;
    IAMModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      GetServerCertificate: function(src, username, session_id, region_name, servercer_name) {
        var me;
        me = this;
        src.model = me;
        return iam_service.GetServerCertificate(src, username, session_id, region_name, servercer_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('IAM__GET_SERVER_CERTIFICATE_RETURN', aws_result);
            }
          } else {
            console.log('iam.GetServerCertificate failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ListServerCertificates: function(src, username, session_id, region_name, marker, max_items, path_prefix) {
        var me;
        if (marker == null) {
          marker = null;
        }
        if (max_items == null) {
          max_items = null;
        }
        if (path_prefix == null) {
          path_prefix = null;
        }
        me = this;
        src.model = me;
        return iam_service.ListServerCertificates(src, username, session_id, region_name, marker, max_items, path_prefix, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('IAM__LST_SERVER_CERTIFICATES_RETURN', aws_result);
            }
          } else {
            console.log('iam.ListServerCertificates failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    iam_model = new IAMModel();
    return iam_model;
  });

}).call(this);
