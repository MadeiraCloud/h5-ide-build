(function() {
  define(['event', './component/unmanagedvpc/template', 'constant', 'backbone', 'jquery', 'handlebars', 'UI.modal'], function(ide_event, template, constant) {
    var UnmanagedVPCView;
    UnmanagedVPCView = Backbone.View.extend({
      events: {
        'closed': 'closedPopup',
        'click .unmanaged-VPC-resource-item': 'resourceItemClickEvent',
        'click #btn-vpc-reload': 'reloadVPCsEvent'
      },
      initialize: function() {
        Handlebars.registerHelper('is_service_error', function(value, options) {
          if (_.isString(value)) {
            if (value === 'service_error') {
              return options.fn(this);
            } else {
              return options.inverse(this);
            }
          } else {
            return options.inverse(this);
          }
        });
        Handlebars.registerHelper('is_unmanaged', function(value, options) {
          if (_.isObject(value)) {
            if (_.isEmpty(value)) {
              return options.fn(this);
            } else {
              return options.inverse(this);
            }
          } else {
            return options.inverse(this);
          }
        });
        Handlebars.registerHelper('city_code', function(text) {
          return new Handlebars.SafeString(constant.REGION_SHORT_LABEL[text]);
        });
        Handlebars.registerHelper('city_area', function(text) {
          return new Handlebars.SafeString(constant.REGION_LABEL[text]);
        });
        Handlebars.registerHelper('convert_string', function(key, value) {
          MC.common.other.addUnmanagedVpc(key, value);
          return new Handlebars.SafeString(key);
        });
        Handlebars.registerHelper('is_vpc_disabled', function(value, options) {
          var error, is_true;
          is_true = false;
          try {
            _.each(value.origin, function(item, type) {
              var vpc_ids;
              if (type === constant.RESTYPE.ENI) {
                vpc_ids = _.keys(item);
                if (_.isArray(vpc_ids) && vpc_ids.length > 299) {
                  return is_true = true;
                }
              }
            });
            if (is_true) {
              return options.fn(this);
            } else {
              return options.inverse(this);
            }
          } catch (_error) {
            error = _error;
            return console.log('is_vpc_disabled', key, value, options, error);
          } finally {
            options.inverse(this);
          }
        });
        Handlebars.registerHelper('vpc_list', function(items, options) {
          var error, infix, new_item, prefix, suffix;
          new_item = '';
          prefix = '<li class="unmanaged-resource-item"><span class="unmanaged-resource-number">';
          infix = '</span><span class="unmanaged-resource-name">';
          suffix = '</span></li>';
          try {
            _.each(items, function(value, key) {
              var count, running, stopped, type;
              count = _.keys(value).length;
              type = '';
              switch (key) {
                case constant.RESTYPE.SUBNET:
                  type = ' subnet';
                  break;
                case constant.RESTYPE.EIP:
                  type = ' elastic ip';
                  break;
                case constant.RESTYPE.ELB:
                  type = ' load balancer';
                  break;
                case constant.RESTYPE.INSTANCE:
                  running = 0;
                  stopped = 0;
                  type = ' instance';
                  _.each(_.values(value), function(item) {
                    if (item.instanceState.name === 'running') {
                      return running = running + 1;
                    } else if (item.instanceState.name === 'stopped') {
                      return stopped = stopped + 1;
                    }
                  });
                  if (running > 0) {
                    count = running;
                    type = ' running instance';
                  }
                  if (stopped > 0) {
                    count = stopped;
                    type = ' stopped instance';
                  }
              }
              if (type) {
                return new_item += prefix + count + infix + type + suffix;
              }
            });
            if (_.isEmpty(new_item)) {
              new_item = '<p class="unmanaged-vpc-empty">There is no subnet, instance or load balancer to be visualized in this VPC.</p>';
            }
          } catch (_error) {
            error = _error;
            console.log('unmanagedvpc view vpc_id', items);
          } finally {
            new Handlebars.SafeString(new_item);
          }
          return new Handlebars.SafeString(new_item);
        });
        return Handlebars.registerHelper('vpc_sub_item', function(items, type) {
          var error, new_count;
          new_count = 0;
          try {
            _.each(items, function(value, key) {
              switch (key) {
                case type:
                  return new_count = _.keys(value).length;
                case constant.RESTYPE.INSTANCE:
                  return _.each(_.values(value), function(item) {
                    if (item.instanceState.name === type) {
                      return new_count += 1;
                    }
                  });
              }
            });
            return new Handlebars.SafeString(new_count);
          } catch (_error) {
            error = _error;
            return console.log('unmanagedvpc view vpc_id', items);
          } finally {
            new Handlebars.SafeString(new_count);
          }
        });
      },
      render: function() {
        console.log('pop-up:unmanaged vpc render');
        modal(template(this.model.attributes), true);
        this.setElement($('#unmanaged-VPC-modal-body').closest('#modal-wrap'));
        return null;
      },
      closedPopup: function() {
        console.log('closedPopup');
        return this.trigger('CLOSE_POPUP');
      },
      resourceItemClickEvent: function(event) {
        var $item, error, region, vpc_id;
        console.log('resourceItemClickEvent', event);
        try {
          $item = $(event.currentTarget);
          vpc_id = $item.attr('data-vpc-id');
          region = $item.parent('ul').parent('li').attr('data-region-name');
          if ($item.hasClass('unmanaged-VPC-resource-item-disabled')) {
            return;
          }
          ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'NEW_APPVIEW', vpc_id, region, vpc_id);
          this.closedPopup();
          modal.close();
        } catch (_error) {
          error = _error;
          console.log('current found error ' + error);
        }
        return null;
      },
      reloadVPCsEvent: function() {
        console.log('reloadVPCsEvent');
        return this.trigger('RELOAD_EVENT');
      }
    });
    return UnmanagedVPCView;
  });

}).call(this);
