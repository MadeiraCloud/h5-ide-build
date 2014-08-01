(function() {
  define(["ApiRequest", "./CrCollection", "constant", "CloudResources"], function(ApiRequest, CrCollection, constant, CloudResources) {

    /* This Connection is used to fetch all the resource of an vpc */
    return CrCollection.extend({

      /* env:dev                                               env:dev:end */
      type: "OpsResource",
      init: function(region) {
        this.__region = region;
        return this;
      },
      fetchForceDedup: function() {
        var p;
        this.__forceDedup = false;
        p = this.fetchForce();
        this.__forceDedup = true;
        return p;
      },
      fetchForce: function() {
        var d;
        if (this.__forceDedup) {
          this.__forceDedup = false;
          d = Q.defer();
          d.resolve();
          d.promise;
        }
        return CrCollection.prototype.fetchForce.call(this);
      },
      doFetch: function() {
        var self;
        self = this;
        CloudResources.clearWhere((function(m) {
          return m.RES_TAG === self.category;
        }), this.__region);
        console.assert(this.__region, "CrOpsCollection's region is not set before fetching data. Need to call init() first");
        return ApiRequest("resource_vpc_resource", {
          region_name: this.__region,
          vpc_id: this.category
        });
      },
      parseFetchData: function(data) {
        var cln, d, extraAttr, type;
        delete data.vpc;
        extraAttr = {
          RES_TAG: this.category
        };
        for (type in data) {
          d = data[type];
          cln = CloudResources(type, this.__region);
          if (!cln) {
            console.warn("Cannot find cloud resource collection for type:", type);
            continue;
          }
          cln.__parseExternalData(d, extraAttr, this.__region);
        }
      }
    });
  });

}).call(this);
