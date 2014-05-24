(function() {
  define(["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                           env:dev:end */
      defaults: function() {
        return {
          "domain-name": [],
          "domain-name-servers": [],
          "ntp-servers": [],
          "netbios-name-servers": [],
          "netbios-node-type": []
        };
      },
      constructor: function(attr, options) {
        attr = this.tryParseDhcpAttr(attr);
        return CrModel.call(this, attr, options);
      },
      tryParseDhcpAttr: function(attr) {
        var e, item, _i, _len, _ref;
        if (attr.dhcpConfigurationSet) {
          try {
            _ref = attr.dhcpConfigurationSet.item;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              attr[item.key] = item.valueSet;
            }
            delete attr.dhcpConfigurationSet;
          } catch (_error) {
            e = _error;
          }
        }
        return attr;
      },
      toAwsAttr: function() {
        var awsAttr, key, value, _ref;
        awsAttr = [];
        _ref = this.attributes;
        for (key in _ref) {
          value = _ref[key];
          if (key !== "id" && key !== "tagSet") {
            awsAttr.push({
              Name: key,
              Value: value
            });
          }
        }
        return awsAttr;
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("dhcp_CreateDhcpOptions", {
          region_name: this.getCollection().region(),
          dhcp_configs: this.toAwsAttr()
        }).then(function(res) {
          var e, id;
          try {
            id = res.CreateDhcpOptionsResponse.dhcpOptions.dhcpOptionsId;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Dhcp created but aws returns invalid ata.");
          }
          self.set("id", id);
          console.log("Created dhcp resource", self);
          return self;
        });
      },
      doDestroy: function() {
        return ApiRequest("dhcp_DeleteDhcpOptions", {
          region_name: this.getCollection().region(),
          dhcp_id: this.get("id")
        });
      }
    });
  });

}).call(this);
