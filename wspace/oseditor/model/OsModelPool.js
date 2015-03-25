define(["ComplexResModel","constant","Design"],function(e,t,n){var r;return r=e.extend({type:t.RESTYPE.OSPOOL,newNameTmpl:"pool",defaults:function(){return{protocol:"HTTP",method:"ROUND_ROBIN"}},initialize:function(e,r){var i;e.healthMonitors||(i=n.modelClassForType(t.RESTYPE.OSHM),this.attributes.healthMonitors=[new i]),this.listenTo(this,"change:protocol",function(){var e;return(e=this.connectionTargets("OsListenerAsso")[0])!=null?e.set("protocol",this.get("protocol"),{silent:!0}):void 0})},ports:function(){var e,n,r,i,s;n=[],s=this.connectionTargets("OsPoolMembership");for(r=0,i=s.length;r<i;r++)e=s[r],e.type===t.RESTYPE.OSSERVER?n.push(e.embedPort()):n.push(e);return n},addNewHm:function(e){var r,i;return r=n.modelClassForType(t.RESTYPE.OSHM),e?i=new r({name:e}):i=new r,this.get("healthMonitors").push(i),i},getHm:function(e){var t,n,r,i;i=this.get("healthMonitors");for(n=0,r=i.length;n<r;n++){t=i[n];if(t.id===e)return t}return null},removeHm:function(e){var t,n,r,i,s;s=this.get("healthMonitors");for(n=r=0,i=s.length;r<i;n=++r){t=s[n];if(t===e||t.id===e){this.get("healthMonitors").splice(n,1),t.remove();break}}},remove:function(){var t,n,r,i;i=this.get("healthMonitors");for(n=0,r=i.length;n<r;n++)t=i[n],t.remove();return e.prototype.remove.apply(this,arguments)},serialize:function(){var e;return e=_.map(this.connections("OsPoolMembership"),function(e){var n;return n=e.getOtherTarget(t.RESTYPE.OSPOOL),n.type===t.RESTYPE.OSSERVER&&(n=n.embedPort()),{protocol_port:e.get("port"),address:n.createRef("fixed_ips.0.ip_address"),weight:e.get("weight"),id:e.get("appId")}}),{layout:this.generateLayout(),component:{name:this.get("name"),type:this.type,uid:this.id,resource:{id:this.get("appId"),name:this.get("name"),description:this.get("description"),protocol:this.get("protocol"),lb_method:this.get("method"),subnet_id:this.parent().createRef("id"),healthmonitors:this.get("healthMonitors").map(function(e){return e.createRef("id")}),member:e}}}}},{handleTypes:t.RESTYPE.OSPOOL,deserialize:function(e,t,n){new r({id:e.uid,name:e.resource.name,description:e.resource.description,appId:e.resource.id,protocol:e.resource.protocol,method:e.resource.lb_method,parent:n(MC.extractID(e.resource.subnet_id)),x:t.coordinate[0],y:t.coordinate[1],healthMonitors:(e.resource.healthmonitors||[]).map(function(e){return n(MC.extractID(e))})})},postDeserialize:function(e,t){var r,i,s,o,u,a,f;i=n.instance(),o=i.component(e.uid),r=n.modelClassForType("OsPoolMembership"),f=e.resource.member;for(u=0,a=f.length;u<a;u++)s=f[u],new r(o,i.component(MC.extractID(s.address)),{appId:s.id,weight:s.weight,port:s.protocol_port})}}),r});