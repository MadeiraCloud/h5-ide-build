(function() {
  define(['backbone', 'underscore', 'stack_service', 'ami_service', 'base_model'], function(Backbone, _, stack_service, ami_service, base_model) {
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
