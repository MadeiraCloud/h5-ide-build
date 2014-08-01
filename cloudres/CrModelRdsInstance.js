(function() {
  define(["./CrModel", "CloudResources", "ApiRequest"], function(CrModel, CloudResources, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                                    env:dev:end */
      taggable: false
    });
  });

}).call(this);
