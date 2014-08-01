(function() {
  define(["cloudres/CrCollection"], function(CrCollection) {

    /*
      resourceType : a string used to identified a class of resource
      category     : a string used to group a set of resources. It might be a region id, or app id.
      platform     : optional string used to identified the platform, currently only support aws.
     */
    var CachedCollections, CloudResources, onCollectionDestroy;
    CachedCollections = {};
    onCollectionDestroy = function(id) {
      return delete CachedCollections[id];
    };
    CloudResources = function(resourceType, category) {
      var Collection, c, cid;
      Collection = CrCollection.getClassByType(resourceType);
      if (!Collection) {
        return null;
      }
      category = Collection.category(category);
      cid = resourceType + "_" + category;
      c = CachedCollections[cid];
      if (!c) {
        c = new Collection();
        c.id = cid;
        c.category = category;
        CachedCollections[cid] = c;
        c.on("destroy", onCollectionDestroy);
      }
      return c;
    };
    CloudResources.invalidate = function() {
      return Q.all(_.values(CachedCollections).map(function(cln) {
        return cln.fetchForce();
      }));
    };
    CloudResources.clearWhere = function(detect, category) {
      var Collection, cln, find, id, realCate;
      if (_.isFunction(detect)) {
        find = "filter";
      } else {
        find = "where";
      }
      for (id in CachedCollections) {
        cln = CachedCollections[id];
        Collection = CrCollection.getClassByType(cln.type);
        realCate = Collection.category(category);
        if (cln.category === realCate) {
          cln.remove(cln[find](detect));
        }
      }
    };
    return CloudResources;
  });

}).call(this);
