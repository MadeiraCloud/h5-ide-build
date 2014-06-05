define(["handlebars"],function(e){var t,n={};return t=function(e,t,n,r,i){function f(e,t){var r="",i;r+='\n<li>\n	<h3 class="nav-stack-region-title">'+u((i=e&&e.region_group,typeof i===o?i.apply(e):i))+" ("+u((i=e&&e.region_count,typeof i===o?i.apply(e):i))+')</h3>\n	<ul class="nav-region-list-items app-list">\n	',i=n.each.call(e,e&&e.region_name_group,{hash:{},inverse:a.noop,fn:a.program(2,l,t),data:t});if(i||i===0)r+=i;return r+="\n	</ul>\n</li>\n",r}function l(e,t){var r="",i;r+='<li data-region-name="'+u((i=e&&e.region,typeof i===o?i.apply(e):i))+'" data-app-id="'+u((i=e&&e.id,typeof i===o?i.apply(e):i))+'" class="truncate nav-truncate icon-app-'+u(n.tolower.call(e,e&&e.state,{hash:{},data:t}))+'" title="'+u((i=e&&e.name,typeof i===o?i.apply(e):i))+"-["+u((i=e&&e.state,typeof i===o?i.apply(e):i))+']">'+u((i=e&&e.name,typeof i===o?i.apply(e):i)),i=n["if"].call(e,e&&e.usage,{hash:{},inverse:a.noop,fn:a.program(3,c,t),data:t});if(i||i===0)r+=i;return r+="</li>",r}function c(e,t){var n="",r;return n+='<i class="icon-app-type-'+u((r=e&&e.usage,typeof r===o?r.apply(e):r))+'"></i>',n}function h(e,t){var r="";return r+='\n<div class="nav-empty">'+u(n.i18n.call(e,"DASH_LBL_NO_APP",{hash:{},data:t}))+"</div>\n",r}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s,o="function",u=this.escapeExpression,a=this;return s=n.each.call(t,t&&t.app_list,{hash:{},inverse:a.program(5,h,i),fn:a.program(1,f,i),data:i}),s||s===0?s:""},n.app_list_data=e.template(t),t=function(e,t,n,r,i){function f(e,t){var r="",i;r+='\n<li>\n	<h3 class="nav-stack-region-title">'+u((i=e&&e.region_group,typeof i===o?i.apply(e):i))+" ("+u((i=e&&e.region_count,typeof i===o?i.apply(e):i))+')<button class="icon-new-stack tooltip create-new-stack" data-tooltip=\''+u(n.i18n.call(e,"IDE_COM_CREATE_NEW_STACK",{hash:{},data:t}))+'\'></button></h3>\n\n	<ul class="nav-region-list-items stack-list">\n		',i=n.each.call(e,e&&e.region_name_group,{hash:{},inverse:a.noop,fn:a.program(2,l,t),data:t});if(i||i===0)r+=i;return r+="\n	</ul>\n</li>\n",r}function l(e,t){var n="",r;return n+='\n		<li data-region-name="'+u((r=e&&e.region,typeof r===o?r.apply(e):r))+'" data-stack-id="'+u((r=e&&e.id,typeof r===o?r.apply(e):r))+'" class="truncate nav-truncate icon-stack-nav">'+u((r=e&&e.name,typeof r===o?r.apply(e):r))+"</li>\n		",n}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s,o="function",u=this.escapeExpression,a=this;return s=n.each.call(t,t&&t.stack_list,{hash:{},inverse:a.noop,fn:a.program(1,f,i),data:i}),s||s===0?s:""},n.stack_list_data=e.template(t),t=function(e,t,n,r,i){function f(e,t){var r="",i;r+="\n	",i=n["if"].call(e,e&&e.region_empty_list,{hash:{},inverse:a.noop,fn:a.program(2,l,t),data:t});if(i||i===0)r+=i;return r+="\n",r}function l(e,t){var r="",i;r+='\n		<ul class="nav-region-list">\n			',i=n.each.call(e,e&&e.region_empty_list,{hash:{},inverse:a.noop,fn:a.program(3,c,t),data:t});if(i||i===0)r+=i;return r+='\n		</ul>\n\n		<div class="show-unused-region">Show unused regions</div>\n	',r}function c(e,t){var r="";return r+=' <li class="nav-stack-region-title" data-empty-region-label="'+u(typeof e===o?e.apply(e):e)+'"> '+u(typeof e===o?e.apply(e):e)+' (0) <button class="icon-new-stack tooltip create-new-empty-stack" data-tooltip=\''+u(n.i18n.call(e,"IDE_COM_CREATE_NEW_STACK",{hash:{},data:t}))+"'></button>\n			</li> ",r}function h(e,t){var r="",i;r+="\n	<ul>\n		",i=n.each.call(e,e&&e.region_empty_list,{hash:{},inverse:a.noop,fn:a.program(6,p,t),data:t});if(i||i===0)r+=i;return r+="\n	</ul>\n",r}function p(e,t){var r="";return r+=' <li class="nav-stack-region-title" data-empty-region-label="'+u(typeof e===o?e.apply(e):e)+'"> '+u(typeof e===o?e.apply(e):e)+' (0) <button class="icon-new-stack tooltip create-new-empty-stack" data-tooltip=\''+u(n.i18n.call(e,"IDE_COM_CREATE_NEW_STACK",{hash:{},data:t}))+"'></button>\n		</li> ",r}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s,o="function",u=this.escapeExpression,a=this;return s=n["if"].call(t,t&&t.stack_list,{hash:{},inverse:a.program(5,h,i),fn:a.program(1,f,i),data:i}),s||s===0?s:""},n.region_empty_list=e.template(t),t=function(e,t,n,r,i){function f(e,t){var n="",r;return n+='\n<li>\n	<a href="javascript:void(0)" class="truncate nav-truncate region-name" data-region-name="'+u((r=e&&e.region_name,typeof r===o?r.apply(e):r))+'">\n		'+u((r=e&&e.region_city,typeof r===o?r.apply(e):r))+'\n		<span class="nav-head-note">'+u((r=e&&e.region_area,typeof r===o?r.apply(e):r))+"</span>\n	</a>\n</li>\n",n}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s,o="function",u=this.escapeExpression,a=this;return s=n.each.call(t,t&&t.region_list,{hash:{},inverse:a.noop,fn:a.program(1,f,i),data:i}),s||s===0?s:""},n.region_list=e.template(t),n});