(function() {
  define(["ApiRequest", "./CrCollection", "constant", "CloudResources", "./CrModelRdsParameter"], function(ApiRequest, CrCollection, constant, CloudResources, CrRdsParamModel) {

    /*
      This kind of collection can only be obtained by CrModelRdsPGroup.getParameters()
     */

    /* Parameter */
    return CrCollection.extend({

      /* env:dev                                                    env:dev:end */
      type: constant.RESTYPE.DBPARAM,
      model: CrRdsParamModel,
      __selfParseData: true,
      init: function(paramGroupModel) {
        if (this.groupModel) {
          return this;
        }
        this.groupModel = paramGroupModel;
        this.listenTo(paramGroupModel, "remove", this.reset);
        return this;
      },
      region: function() {
        var _ref;
        return (_ref = this.groupModel.collection) != null ? _ref.region() : void 0;
      },
      doFetch: function(marker) {
        var self;
        self = this;
        return ApiRequest("rds_pg_DescribeDBParameters", {
          region_name: this.region(),
          param_group: this.category,
          marker: marker
        }).then(function(data) {
          var d, e, _i, _len, _ref;
          try {
            marker = data.DescribeDBParametersResponse.DescribeDBParametersResult.Marker;
            data = ((_ref = data.DescribeDBParametersResponse.DescribeDBParametersResult.Parameters) != null ? _ref.Parameter : void 0) || [];
          } catch (_error) {
            e = _error;
            console.log(e);
          }
          if (!_.isArray(data)) {
            data = [data];
          }
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            d = data[_i];
            d.id = d.ParameterName;
          }
          if (marker) {
            if (!self.__bucket) {
              self.__bucket = data;
            } else {
              self.__bucket = self.__bucket.concat(data);
            }
            return self.doFetch(marker);
          }
          if (self.__bucket) {
            data = self.__bucket.concat(data);
            self.__bucket = null;
          }
          return data;
        });
      }
    });
  });

}).call(this);
