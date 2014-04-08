(function() {
  define(['backbone', 'underscore', 'eni_service', 'base_model'], function(Backbone, _, eni_service, base_model) {
    var ENIModel, eni_model;
    ENIModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeNetworkInterfaces: function(src, username, session_id, region_name, eni_ids, filters) {
        var me;
        if (eni_ids == null) {
          eni_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return eni_service.DescribeNetworkInterfaces(src, username, session_id, region_name, eni_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_ENI_DESC_NET_IFS_RETURN', aws_result);
            }
          } else {
            console.log('eni.DescribeNetworkInterfaces failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeNetworkInterfaceAttribute: function(src, username, session_id, region_name, eni_id, attribute) {
        var me;
        me = this;
        src.model = me;
        return eni_service.DescribeNetworkInterfaceAttribute(src, username, session_id, region_name, eni_id, attribute, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_ENI_DESC_NET_IF_ATTR_RETURN', aws_result);
            }
          } else {
            console.log('eni.DescribeNetworkInterfaceAttribute failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    eni_model = new ENIModel();
    return eni_model;
  });

}).call(this);
