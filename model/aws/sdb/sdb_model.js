(function() {
  define(['backbone', 'underscore', 'sdb_service', 'base_model'], function(Backbone, _, sdb_service, base_model) {
    var SDBModel, sdb_model;
    SDBModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DomainMetadata: function(src, username, session_id, region_name, doamin_name) {
        var me;
        me = this;
        src.model = me;
        return sdb_service.DomainMetadata(src, username, session_id, region_name, doamin_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('SDB__DOMAIN_MDATA_RETURN', aws_result);
            }
          } else {
            console.log('sdb.DomainMetadata failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      GetAttributes: function(src, username, session_id, region_name, domain_name, item_name, attribute_name, consistent_read) {
        var me;
        if (attribute_name == null) {
          attribute_name = null;
        }
        if (consistent_read == null) {
          consistent_read = null;
        }
        me = this;
        src.model = me;
        return sdb_service.GetAttributes(src, username, session_id, region_name, domain_name, item_name, attribute_name, consistent_read, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('SDB__GET_ATTRS_RETURN', aws_result);
            }
          } else {
            console.log('sdb.GetAttributes failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      ListDomains: function(src, username, session_id, region_name, max_domains, next_token) {
        var me;
        if (max_domains == null) {
          max_domains = null;
        }
        if (next_token == null) {
          next_token = null;
        }
        me = this;
        src.model = me;
        return sdb_service.ListDomains(src, username, session_id, region_name, max_domains, next_token, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('SDB__LST_DOMAINS_RETURN', aws_result);
            }
          } else {
            console.log('sdb.ListDomains failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    sdb_model = new SDBModel();
    return sdb_model;
  });

}).call(this);
