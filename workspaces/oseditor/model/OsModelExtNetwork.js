(function(){define(["ComplexResModel","constant","CloudResources"],function(e,t,n){var r;return r=e.extend({type:t.RESTYPE.OSEXTNET,defaults:function(){return{name:"ext-network"}},isRemovable:function(){return!1},getResourceId:function(){var e;return this.get("appId")?this.get("appId"):(e=n(t.RESTYPE.OSNETWORK,this.design().region()).getExtNetworks()[0],e?e.id:"")},serialize:function(){return{layout:this.generateLayout(),component:{uid:this.id,type:this.type,resource:{id:this.getResourceId()}}}}},{handleTypes:t.RESTYPE.OSEXTNET,resolveFirst:!0,preDeserialize:function(e,t){return new r({id:e.uid,x:t.coordinate[0],y:t.coordinate[1],appId:e.resource.id})},deserialize:function(){}}),r})}).call(this);