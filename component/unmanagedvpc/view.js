(function(){define(["event","./component/unmanagedvpc/template","constant","backbone","jquery","handlebars","UI.modal"],function(e,t,n){var r;return r=Backbone.View.extend({events:{closed:"closedPopup","click .unmanaged-VPC-resource-item":"resourceItemClickEvent","click #btn-vpc-reload":"reloadVPCsEvent"},initialize:function(){return Handlebars.registerHelper("is_service_error",function(e,t){return _.isString(e)?e==="service_error"?t.fn(this):t.inverse(this):t.inverse(this)}),Handlebars.registerHelper("is_unmanaged",function(e,t){return _.isObject(e)?_.isEmpty(e)?t.fn(this):t.inverse(this):t.inverse(this)}),Handlebars.registerHelper("city_code",function(e){return new Handlebars.SafeString(n.REGION_SHORT_LABEL[e])}),Handlebars.registerHelper("city_area",function(e){return new Handlebars.SafeString(n.REGION_LABEL[e])}),Handlebars.registerHelper("convert_string",function(e,t){return MC.common.other.addUnmanagedVpc(e,t),new Handlebars.SafeString(e)}),Handlebars.registerHelper("is_vpc_disabled",function(e,t){var r,i;i=!1;try{return _.each(e.origin,function(e,t){var r;if(t===n.RESTYPE.ENI){r=_.keys(e);if(_.isArray(r)&&r.length>299)return i=!0}}),i?t.fn(this):t.inverse(this)}catch(s){return r=s,void 0}finally{t.inverse(this)}}),Handlebars.registerHelper("vpc_list",function(e,t){var r,i,s,o,u;s="",o='<li class="unmanaged-resource-item"><span class="unmanaged-resource-number">',i='</span><span class="unmanaged-resource-name">',u="</span></li>";try{_.each(e,function(e,t){var r,a,f,l;r=_.keys(e).length,l="";switch(t){case n.RESTYPE.SUBNET:l=" subnet";break;case n.RESTYPE.EIP:l=" elastic ip";break;case n.RESTYPE.ELB:l=" load balancer";break;case n.RESTYPE.INSTANCE:a=0,f=0,l=" instance",_.each(_.values(e),function(e){if(e.instanceState.name==="running")return a+=1;if(e.instanceState.name==="stopped")return f+=1}),a>0&&(r=a,l=" running instance"),f>0&&(r=f,l=" stopped instance")}if(l)return s+=o+r+i+l+u}),_.isEmpty(s)&&(s='<p class="unmanaged-vpc-empty">There is no subnet, instance or load balancer to be visualized in this VPC.</p>')}catch(a){r=a,void 0}finally{new Handlebars.SafeString(s)}return new Handlebars.SafeString(s)}),Handlebars.registerHelper("vpc_sub_item",function(e,t){var r,i;i=0;try{return _.each(e,function(e,r){switch(r){case t:return i=_.keys(e).length;case n.RESTYPE.INSTANCE:return _.each(_.values(e),function(e){if(e.instanceState.name===t)return i+=1})}}),new Handlebars.SafeString(i)}catch(s){return r=s,void 0}finally{new Handlebars.SafeString(i)}}),Handlebars.registerHelper("vpc_sub_title",function(e,t){var n,r;r="";try{return e.Tag&&!e.is_unmanaged&&(r+=e.Tag["app-id"]+"("+e.Tag.app+")"),new Handlebars.SafeString(r)}catch(i){return n=i,void 0}finally{new Handlebars.SafeString(r)}})},render:function(){return void 0,modal(t(this.model.attributes),!0),this.setElement($("#unmanaged-VPC-modal-body").closest("#modal-wrap")),null},closedPopup:function(){return void 0,this.trigger("CLOSE_POPUP")},resourceItemClickEvent:function(t){var n,r,i,s;void 0;try{n=$(t.currentTarget),s=n.attr("data-vpc-id"),i=n.parent("ul").parent("li").attr("data-region-name");if(n.hasClass("unmanaged-VPC-resource-item-disabled"))return;e.trigger(e.OPEN_DESIGN_TAB,"NEW_APPVIEW",s,i,s),this.closedPopup(),modal.close()}catch(o){r=o,void 0}return null},reloadVPCsEvent:function(){return void 0,this.trigger("RELOAD_EVENT")}}),r})}).call(this);