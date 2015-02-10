(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["ApiRequest", "CloudResources", "constant", "backbone"], function(ApiRequest, CloudResources, constant) {

    /*
      Dashboard Model
     */
    return Backbone.Model.extend({
      defaults: {
        region: "",
        provider: ""
      },
      initialize: function() {
        var R, r;
        r = this.region = App.user.get("default_region");
        this.provider = App.user.get("default_provider");
        R = constant.RESTYPE;
        r = this.region;
        this.listenTo(CloudResources(R.OSSERVER, r), "update", this.onRegionResChanged(['OSSERVER', 'FIP']));
        this.listenTo(CloudResources(R.OSPORT, r), "update", this.onRegionResChanged(['FIP']));
        this.listenTo(CloudResources(R.OSVOL, r), "update", this.onRegionResChanged(['OSVOL', 'OSSNAP']));
        this.listenTo(CloudResources(R.OSSNAP, r), "update", this.onRegionResChanged(['OSSNAP']));
        this.listenTo(CloudResources(R.OSFIP, r), "update", this.onRegionResChanged(['OSFIP']));
        this.listenTo(CloudResources(R.OSRT, r), "update", this.onRegionResChanged(['OSRT']));
        this.listenTo(CloudResources(R.OSPOOL, r), "update", this.onRegionResChanged(['OSPOOL', 'OSLISTENER']));
        this.listenTo(CloudResources(R.OSLISTENER, r), "update", this.onRegionResChanged(['OSLISTENER']));
        return this.listenTo(CloudResources(R.OSNETWORK, r), "update", this.onRegionResChanged(['OSRT']));
      },
      onRegionResChanged: function(type) {
        return function() {
          return this.trigger("change:regionResources", type);
        };
      },

      /* Cloud Resources */
      fetchOsResources: function() {
        CloudResources(constant.RESTYPE.OSSERVER, this.region).fetch();
        CloudResources(constant.RESTYPE.OSPORT, this.region).fetch();
        CloudResources(constant.RESTYPE.OSVOL, this.region).fetch();
        CloudResources(constant.RESTYPE.OSSNAP, this.region).fetch();
        CloudResources(constant.RESTYPE.OSFIP, this.region).fetch();
        CloudResources(constant.RESTYPE.OSRT, this.region).fetch();
        CloudResources(constant.RESTYPE.OSPOOL, this.region).fetch();
        CloudResources(constant.RESTYPE.OSLISTENER, this.region).fetch();
        CloudResources(constant.RESTYPE.OSNETWORK, this.region).fetch();
      },
      isOsResReady: function(type) {
        var res;
        res = CloudResources(type, this.region).isReady();
        switch (type) {
          case constant.RESTYPE.OSLISTENER:
            res = res && CloudResources(constant.RESTYPE.OSPOOL, this.region).isReady();
            break;
          case constant.RESTYPE.OSPOOL:
            res = res && CloudResources(constant.RESTYPE.OSLISTENER, this.region).isReady();
        }
        return res;
      },
      getOsResData: function(type) {
        var availableImageDistro, data, extNetworks, region;
        region = this.region;
        availableImageDistro = ["centos", "debian", "fedora", "gentoo", "opensuse", "redhat", "suse", "ubuntu", "windows", "cirros"];
        data = {
          servers: _.map(CloudResources(constant.RESTYPE.OSSERVER, region).toJSON(), function(e) {
            var _ref;
            if (_ref = e.system_metadata.image_os_distro, __indexOf.call(availableImageDistro, _ref) < 0) {
              e.system_metadata.image_os_distro = "unknown";
            }
            return e;
          }),
          volumes: CloudResources(constant.RESTYPE.OSVOL, region).toJSON(),
          snaps: CloudResources(constant.RESTYPE.OSSNAP, region).toJSON(),
          fips: CloudResources(constant.RESTYPE.OSFIP, region).toJSON(),
          rts: CloudResources(constant.RESTYPE.OSRT, region).toJSON(),
          elbs: CloudResources(constant.RESTYPE.OSLISTENER, region).toJSON()
        };
        _.each(data.fips, function(fip) {
          var port, portId, server, _ref, _ref1, _ref2, _ref3;
          portId = fip.port_id;
          port = (_ref = CloudResources(constant.RESTYPE.OSPORT, region)) != null ? (_ref1 = _ref.get(portId)) != null ? _ref1.toJSON() : void 0 : void 0;
          if (port) {
            server = (_ref2 = CloudResources(constant.RESTYPE.OSSERVER, region)) != null ? (_ref3 = _ref2.get(port.device_id)) != null ? _ref3.toJSON() : void 0 : void 0;
          }
          fip.serverName = server != null ? server.name : void 0;
          return fip.portName = port != null ? port.name : void 0;
        });
        _.each(data.snaps, function(snap) {
          var volume, _ref, _ref1;
          volume = (_ref = CloudResources(constant.RESTYPE.OSVOL, region)) != null ? (_ref1 = _ref.get(snap.volume_id)) != null ? _ref1.toJSON() : void 0 : void 0;
          return snap.volumeName = volume != null ? volume.name : void 0;
        });
        _.each(data.elbs, function(listener) {
          var pool, _ref, _ref1;
          pool = (_ref = CloudResources(constant.RESTYPE.OSPOOL, region)) != null ? (_ref1 = _ref.get(listener.pool_id)) != null ? _ref1.toJSON() : void 0 : void 0;
          return listener.poolName = pool != null ? pool.name : void 0;
        });
        extNetworks = _.map(CloudResources(constant.RESTYPE.OSNETWORK, region).getExtNetworks(), function(m) {
          return m.toJSON();
        });
        _.each(data.rts, function(rt) {
          var extNetwork, name;
          name = "";
          if (rt.external_gateway_info) {
            extNetwork = _.findWhere(extNetworks, {
              id: rt.external_gateway_info.network_id
            });
            if (extNetwork) {
              name = extNetwork.name;
            }
          }
          return rt.externalNetworkName = name;
        });
        return data;
      },
      getOsResDataById: function(type, id) {
        return CloudResources(type, this.region).get(id);
      },
      getResourcesCount: function() {
        var collection, d, data, filter, key, type;
        filter = {
          category: this.region
        };
        data = {
          servers: "OSSERVER",
          volumes: "OSVOL",
          snaps: "OSSNAP",
          fips: "OSFIP",
          rts: "OSRT",
          elbs: "OSLISTENER"
        };
        d = {};
        for (key in data) {
          type = data[key];
          collection = CloudResources(constant.RESTYPE[type], this.region);
          if (collection.isReady()) {
            d[key] = collection.where(filter).length;
          } else {
            d[key] = "";
          }
        }
        return d;
      },
      importApp: function() {
        var self;
        self = this;
        return ApiRequest("resource_region_resource").then(function(data) {
          var d, emptyArr, key, networkId, region, value, _ref;
          d = [];
          emptyArr = [];
          _ref = data.openstack[self.provider] || {};
          for (key in _ref) {
            value = _ref[key];
            region = {
              name: constant.REGION_LABEL[key],
              region: key,
              apps: []
            };
            for (networkId in value) {
              data = value[networkId];
              region.apps.push({
                id: networkId,
                subnet: (data[constant.RESTYPE.OSSUBNET] || emptyArr).length,
                router: (data[constant.RESTYPE.OSRT] || emptyArr).length,
                server: (data[constant.RESTYPE.OSSERVER] || emptyArr).length,
                fip: (data[constant.RESTYPE.OSFIP] || emptyArr).length,
                listener: (data[constant.RESTYPE.OSLISTENER] || emptyArr).length,
                pool: (data[constant.RESTYPE.OSPOOL] || emptyArr).length
              });
            }
            if (region.apps.length) {
              d.push(region);
            }
          }
          return d;
        });
      }
    });
  });

}).call(this);
