(function() {
  define(["ApiRequest", "./CrCollection", "./CrModel", "constant"], function(ApiRequest, CrCollection, CrModel, constant) {
    var CrCommonCollection, EmptyArr;
    EmptyArr = [];
    CrCommonCollection = CrCollection.extend({

      /* env:dev                                                  env:dev:end */
      model: CrModel,
      type: "CrCommonCollection",
      __selfParseData: true,
      groupByCategory: function(opts, filter) {
        var R, list, m, models, r, regionMap, regions, totalCount, _i, _j, _len, _len1, _ref, _ref1;
        opts = opts || {
          includeEmptyRegion: true,
          calcSum: true,
          toJSON: false
        };
        regionMap = {};
        _ref = this.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          m = _ref[_i];
          if (filter && filter(m) === false) {
            continue;
          }
          r = m.attributes.category;
          list = regionMap[r] || (regionMap[r] = []);
          list.push(opts.toJSON ? m.toJSON() : m);
        }
        totalCount = 0;
        regions = [];
        _ref1 = constant.REGION_KEYS;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          R = _ref1[_j];
          models = regionMap[R];
          if (models) {
            totalCount += models.length;
          } else if (!opts.includeEmptyRegion) {
            continue;
          }
          regions.push({
            region: R,
            regionName: constant.REGION_SHORT_LABEL[R],
            regionArea: constant.REGION_LABEL[R],
            data: models || []
          });
        }
        if (opts.calcSum) {
          regions.totalCount = totalCount;
        }
        return regions;
      },
      doFetch: function() {
        var param, self;
        param = {};
        param[this.type] = {};
        self = this;
        return ApiRequest("aws_resource", {
          region_name: null,
          resources: param,
          addition: "all",
          retry_times: 1
        }).then(function(data) {
          var d, dataXml, e, regionId, transformed, xml, _i, _len, _ref;
          transformed = [];
          for (regionId in data) {
            dataXml = data[regionId];
            if (!dataXml[0]) {
              continue;
            }
            try {
              xml = $.xml2json($.parseXML(dataXml[0]));
              if (self.trAwsXml) {
                xml = self.trAwsXml(xml);
              }
              if (self.parseFetchData && xml) {
                xml = self.parseFetchData(xml);
              }
              _ref = xml || EmptyArr;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                d = _ref[_i];
                if (self.modelIdAttribute) {
                  d.id = d[self.modelIdAttribute];
                  delete d[self.modelIdAttribute];
                }
                d.category = regionId;
                transformed.push(new self.model(d));
              }
            } catch (_error) {
              e = _error;
              continue;
            }
          }
          return transformed;
        });
      }
    }, {
      category: function() {
        return "";
      }
    });
    return CrCommonCollection;
  });

}).call(this);
