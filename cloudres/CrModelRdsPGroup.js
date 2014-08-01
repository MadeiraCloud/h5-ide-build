(function() {
  define(["./CrModel", "CloudResources", "ApiRequest", "constant"], function(CrModel, CloudResources, ApiRequest, constant) {
    return CrModel.extend({

      /* env:dev                                                   env:dev:end */
      taggable: false,
      isDefault: function() {
        return (this.get("DBParameterGroupName") || "").indexOf("default.") === 0;
      },
      getParameters: function() {
        return CloudResources(constant.RESTYPE.DBPARAM, this.id).init(this);
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("rds_pg_CreateDBParameterGroup", {
          param_group: this.get("DBParameterGroupName"),
          param_group_family: this.get("DBParameterGroupFamily"),
          description: this.get("Description")
        }).then(function(res) {
          self.set("id", self.get("DBParameterGroupName"));
          return self;
        });
      },
      doDestroy: function() {
        return ApiRequest("rds_pg_DeleteDBParameterGroup", {
          region_name: this.collection.region(),
          param_group: this.id
        });
      },
      resetParams: function() {
        var self;
        self = this;
        return ApiRequest("rds_pg_ResetDBParameterGroup", {
          region: this.collection.region(),
          param_group: this.id,
          reset_all: true
        }).then(function() {
          return self.getParameters().fetchForce();
        });
      },
      modifyParams: function(paramNewValueMap) {

        /*
        paramNewValueMap = {
          "allow-suspicious-udfs" : 0
          "log_output" : "TABLE"
        }
         */
        var i, name, pArray, parameters, params, requests, self, value;
        pArray = [];
        for (name in paramNewValueMap) {
          value = paramNewValueMap[name];
          pArray.push({
            ParameterName: name,
            ParameterValue: value,
            ApplyMethod: this.getParameters().get(name).applyMethod()
          });
        }
        requests = [];
        params = {
          region_name: this.collection.region(),
          param_group: this.id,
          parameters: []
        };
        i = 0;
        while (i < pArray.length) {
          params.parameters = pArray.slice(i, i + 20);
          requests.push(ApiRequest("rds_pg_ModifyDBParameterGroup", params));
          i += 20;
        }
        self = this;
        parameters = self.getParameters();
        return Q.all(requests).then(function() {
          for (name in paramNewValueMap) {
            value = paramNewValueMap[name];
            parameters.get(name).set("ParameterValue", value);
          }
        });
      }
    });
  });

}).call(this);
