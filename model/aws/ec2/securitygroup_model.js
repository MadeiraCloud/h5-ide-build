(function() {
  define(['backbone', 'underscore', 'securitygroup_service', 'base_model'], function(Backbone, _, securitygroup_service, base_model) {
    var SecurityGroupModel, securitygroup_model;
    SecurityGroupModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      CreateSecurityGroup: function(src, username, session_id, region_name, group_name, group_desc, vpc_id) {
        var me;
        if (vpc_id == null) {
          vpc_id = null;
        }
        me = this;
        src.model = me;
        return securitygroup_service.CreateSecurityGroup(src, username, session_id, region_name, group_name, group_desc, vpc_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_SG_CREATE_SG_RETURN', aws_result);
            }
          } else {
            console.log('securitygroup.CreateSecurityGroup failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DeleteSecurityGroup: function(src, username, session_id, region_name, group_name, group_id) {
        var me;
        if (group_name == null) {
          group_name = null;
        }
        if (group_id == null) {
          group_id = null;
        }
        me = this;
        src.model = me;
        return securitygroup_service.DeleteSecurityGroup(src, username, session_id, region_name, group_name, group_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_SG_DELETE_SG_RETURN', aws_result);
            }
          } else {
            console.log('securitygroup.DeleteSecurityGroup failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      AuthorizeSecurityGroupIngress: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return securitygroup_service.AuthorizeSecurityGroupIngress(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_SG_AUTH_SG_INGRESS_RETURN', aws_result);
            }
          } else {
            console.log('securitygroup.AuthorizeSecurityGroupIngress failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      RevokeSecurityGroupIngress: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return securitygroup_service.RevokeSecurityGroupIngress(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_SG_REVOKE_SG_INGRESS_RETURN', aws_result);
            }
          } else {
            console.log('securitygroup.RevokeSecurityGroupIngress failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeSecurityGroups: function(src, username, session_id, region_name, group_names, group_ids, filters) {
        var me;
        if (group_names == null) {
          group_names = null;
        }
        if (group_ids == null) {
          group_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return securitygroup_service.DescribeSecurityGroups(src, username, session_id, region_name, group_names, group_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_SG_DESC_SGS_RETURN', aws_result);
            }
          } else {
            console.log('securitygroup.DescribeSecurityGroups failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    securitygroup_model = new SecurityGroupModel();
    return securitygroup_model;
  });

}).call(this);
