(function() {
  define(['backbone', 'underscore', 'eip_service', 'base_model'], function(Backbone, _, eip_service, base_model) {
    var EIPModel, eip_model;
    EIPModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      AllocateAddress: function(src, username, session_id, region_name, domain) {
        var me;
        if (domain == null) {
          domain = null;
        }
        me = this;
        src.model = me;
        return eip_service.AllocateAddress(src, username, session_id, region_name, domain, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EIP_ALLOCATE_ADDR_RETURN', aws_result);
            }
          } else {
            console.log('eip.AllocateAddress failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ReleaseAddress: function(src, username, session_id, region_name, ip, allocation_id) {
        var me;
        if (ip == null) {
          ip = null;
        }
        if (allocation_id == null) {
          allocation_id = null;
        }
        me = this;
        src.model = me;
        return eip_service.ReleaseAddress(src, username, session_id, region_name, ip, allocation_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EIP_RELEASE_ADDR_RETURN', aws_result);
            }
          } else {
            console.log('eip.ReleaseAddress failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      AssociateAddress: function(src, username) {
        var me;
        me = this;
        src.model = me;
        return eip_service.AssociateAddress(src, username, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EIP_ASSOCIATE_ADDR_RETURN', aws_result);
            }
          } else {
            console.log('eip.AssociateAddress failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DisassociateAddress: function(src, username, session_id, region_name, ip, association_id) {
        var me;
        if (ip == null) {
          ip = null;
        }
        if (association_id == null) {
          association_id = null;
        }
        me = this;
        src.model = me;
        return eip_service.DisassociateAddress(src, username, session_id, region_name, ip, association_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EIP_DISASSOCIATE_ADDR_RETURN', aws_result);
            }
          } else {
            console.log('eip.DisassociateAddress failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeAddresses: function(src, username, session_id, region_name, ips, allocation_ids, filters) {
        var me;
        if (ips == null) {
          ips = null;
        }
        if (allocation_ids == null) {
          allocation_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return eip_service.DescribeAddresses(src, username, session_id, region_name, ips, allocation_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_EIP_DESC_ADDRES_RETURN', aws_result);
            }
          } else {
            console.log('eip.DescribeAddresses failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    eip_model = new EIPModel();
    return eip_model;
  });

}).call(this);
