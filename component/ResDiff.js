define("DiffTree",["constant"],function(e){var t;return t=function(e){var t,n,r,i,s;return e||(e={}),e.filterAttrMap||(e.filterAttrMap={"*.type":!0,"*.uid":!0,"*.index":!0,"*.number":!0,"*.serverGroupUid":!0,"*.serverGroupName":!0,"*.resource.UserData":!0,"*.resource.PrivateIpAddressSet.n.AutoAssign":!0,"*.resource.AssociatePublicIpAddress":!0,"*.resource.KeyName":!0,"*.resource.AssociationSet.n.RouteTableAssociationId":!0,"*.resource.AssociationSet.n.NetworkAclAssociationId":!0,"*.resource.BlockDeviceMapping":!0,"*.resource.VolumeSize":!0,"*.resource.GroupDescription":!0,"*.resource.ListenerDescriptions.n.Listener.SSLCertificateId":!0,"*.resource.Attachment.AttachmentId":!0,"DBINSTANCE.resource.DBName":!0,"DBINSTANCE.resource.AvailabilityZone":!0,"DBINSTANCE.resource.Endpoint.Address":!0,"DBINSTANCE.resource.ApplyImmediately":!0,"DBINSTANCE.resource.Endpoint":!0,"DBINSTANCE.resource.SourceDBInstanceIdentifierForPoint":!0,"DBINSTANCE.resource.UseLatestRestorableTime":!0,"ASG.resource.AutoScalingGroupARN":!0,"ASG.resource.PolicyARN":!0,"*.resource.Tags":!0,"*.resource.adminPass":!0,"*.resource.key_name":!0,"*.resource.bootable":!0}),e.noDiffArrayAttrMap||(e.noDiffArrayAttrMap={"*.state":!0,"*.resource.TerminationPolicies":!0}),e.filterResMap={},n=function(e){return e&&typeof e=="object"&&e.constructor===Array},r=function(e){return n(e)?"array":e===null?"null":typeof e},t=function(e){return typeA==="object"||typeA==="array"?"":String(a)+" "},s=function(e,t){var n,r,s,o,u,a,f,l,c,h,p;c=function(){p=[];for(var t=0,n=e.length;0<=n?t<n:t>n;0<=n?t++:t--)p.push(t);return p}.apply(this),h=[];for(n=u=0,f=c.length;u<f;n=++u)o=c[n],h.push(function(){var u,a,f,l,c,h,p;c=function(){p=[];for(var e=0,n=t.length;0<=n?e<n:e>n;0<=n?e++:e--)p.push(e);return p}.apply(this),h=[];for(r=u=0,f=c.length;u<f;r=++u)o=c[r],i.call(this,e[n],t[r],"",null,[])?h.push(void 0):(s=t[n],t[n]=t[r],h.push(t[r]=s));return h}.call(this));return h},i=function(t,n,o,u,a){var f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,D;o==="VPCZoneIdentifier"&&(f=t.split(","),v=n.split(","),f=_.map(f,function(e){return $.trim(e)}),v=_.map(v,function(e){return $.trim(e)}),t=f,n=v),d="";if(u){o&&(u=u.concat([o])),u.length===2&&t&&t.type&&(u[1]=t.type);if(u.length>2){p=u.slice(2),p=_.map(p,function(e){var t;return t=Number(e),t>=0?"n":e}),N=u[1],T=this.resTypeShortMap[N],d=p.join("."),c=T+"."+d,h="*."+d;if(e.filterAttrMap[c]||e.filterAttrMap[h])return}}if(!t&&!n)return;w=!1,C=r(t),k=r(n),l=C==="object"||C==="array"?"":String(t)+"",m=k==="object"||k==="array"?"":String(n)+"",l||(l=""),m||(m=""),g=A=O="",t===void 0?(g="added",O=m):n===void 0?(g="removed",A=l):C!==k||C!=="object"&&C!=="array"&&t!==n?(g="changed",A=l,O=m):A=l,a[o]={};if(C==="object"||C==="array"||k==="object"||k==="array"){C==="array"&&k==="array"&&(!h||h&&!e.noDiffArrayAttrMap[h])&&(y={},t.length<n.length?s.call(this,t,n):s.call(this,n,t)),x=[];for(L in t)x.push(L);for(L in n)x.push(L);x.sort(),S=!0;for(E=M=0,D=x.length;M<D;E=++M){L=x[E];if(x[E]===x[E-1])continue;b=i.call(this,t&&t[x[E]],n&&n[x[E]],x[E],u,a[o]),b&&(S=!1)}w=!S,S&&delete a[o]}else u&&(u.length=0),r(t)==="number"&&(t=String(t)),r(n)==="number"&&(n=String(n)),r(t)==="boolean"&&(t=String(t)),r(n)==="boolean"&&(n=String(n)),t!==n?(w=!0,a[o]={type:g,__old__:t,__new__:n}):delete a[o];return w},this.compare=function(e,t){var n;return n={},i.call(this,e,t,"result",[],n),n.result},null},t.prototype.resTypeShortMap=_.invert(e.RESTYPE),t}),define("component/resdiff/resDiffTpl",["handlebars"],function(e){var t,n={};return t=function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o=this.escapeExpression;return s+='<div class="modal-res-diff">\n	<p>'+o(n.i18n.call(t,"TOOLBAR.RESOURCES_APP_CHANGED",{hash:{},data:i}))+"</p>\n	<h5>"+o(n.i18n.call(t,"TOOLBAR.WHAT_HAVE_BEEN_CHANGED",{hash:{},data:i}))+'</h5>\n	<div class="scroll-wrap scroll-wrap-res-diff" style="max-height: 350px;">\n		<div class="scrollbar-veritical-wrap" style="display: block;"><div class="scrollbar-veritical-thumb"></div></div>\n		<article class="content_wrap scroll-content"></article>\n	</div>\n</div>',s},n.frame=e.template(t),t=function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u="function",a=this.escapeExpression;return s+='<div class="group '+a((o=t&&t.type,typeof o===u?o.apply(t):o))+'">\n	<div class="head">'+a((o=t&&t.title,typeof o===u?o.apply(t):o))+'<span class="count">('+a((o=t&&t.count,typeof o===u?o.apply(t):o))+')</span></div>\n	<div class="content"></div>\n</div>',s},n.resDiffGroup=e.template(t),t=function(e,t,n,r,i){return this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{},'<ul class="tree"></ul>'},n.resDiffTree=e.template(t),t=function(e,t,n,r,i){function l(e,t){return"closed"}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u=this,a="function",f=this.escapeExpression;s+='<li class="item ',o=n["if"].call(t,t&&t.closed,{hash:{},inverse:u.noop,fn:u.program(1,l,i),data:i});if(o||o===0)s+=o;return s+='">\n	<div class="meta">\n		<span class="type">'+f((o=t&&t.key,typeof o===a?o.apply(t):o))+'</span>\n		<span class="name">'+f((o=t&&t.value,typeof o===a?o.apply(t):o))+"</span>\n	</div>\n</li>",s},n.resDiffTreeItem=e.template(t),t=function(e,t,n,r,i){function l(e,t){var n;return a((n=e&&e.type,typeof n===u?n.apply(e):n))}function c(e,t){var n="",r;return n+='<span class="name to"> -></span><span class="name '+a((r=e&&e.type1,typeof r===u?r.apply(e):r))+'">'+a((r=e&&e.value1,typeof r===u?r.apply(e):r))+"</span>",n}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u="function",a=this.escapeExpression,f=this;s+='<div class="meta">\n	<span class="type">'+a((o=t&&t.key,typeof o===u?o.apply(t):o))+'</span>\n	<span class="name ',o=n["if"].call(t,t&&t.type,{hash:{},inverse:f.noop,fn:f.program(1,l,i),data:i});if(o||o===0)s+=o;s+='">'+a((o=t&&t.value,typeof o===u?o.apply(t):o))+"</span>\n	",o=n["if"].call(t,t&&t.value1,{hash:{},inverse:f.noop,fn:f.program(3,c,i),data:i});if(o||o===0)s+=o;return s+="\n</div>",s},n.resDiffTreeMeta=e.template(t),n});var __indexOf=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};define("component/resdiff/prepare",["constant"],function(e){var t,n,r;return n=function(t){return{getNodeMap:function(e){var n,r,i,s;return _.isString(e)&&(e=e.split(".")),i=t.oldAppJSON.component,n=t.newAppJSON.component,s=_.extend(i,{}),r=_.extend(n,{}),_.each(e,function(e){return s&&(_.isUndefined(s[e])?s=void 0:s=s[e]),r&&(_.isUndefined(r[e])?r=void 0:r=r[e]),null}),{oldAttr:s,newAttr:r}},genValue:function(e,t,n){var r;return r="",t=String(t),n=String(n),e==="changed"&&(t||(t="none"),n||(n="none")),t?(r=t,n&&t!==n&&(r+=" -> "+n)):r=n,r},getNodeData:function(e){return this.getNewest(this.getNodeMap(e))},getNewest:function(e){return e.newAttr||e.oldAttr},pluralToSingular:function(e){return e.slice(0,-1)},setToElement:function(e){return e.slice(0,-3)},replaceArrayIndex:function(t,n){var r,i,s,o,u,a,f,l;s=this.getNodeMap(t[0]),i=this.getNewest(s),l=i.type,a=t[t.length-2],r=n.originValue,f=["Dimensions","AlarmActions","Instances","Attachments","AvailabilityZones","LoadBalancerNames","TerminationPolicies","ListenerDescriptions","SecurityGroups","Subnets","Routes"];switch(a){case"BlockDeviceMapping":o=r.DeviceName,n.key="Device",o&&(_.isObject(o)?n.key=this.genValue(o.type,o.__old__,o.__new__):n.key=o);break;case"GroupSet":n.key="SecurityGroup";break;case"IpPermissions":case"IpPermissionsEgress":case"EntrySet":n.key="Rule";break;case"AssociationSet":case"AttachmentSet":case"PrivateIpAddressSet":n.key=this.setToElement(a);break;case"NotificationType":n.key="Type";break;case"VPCZoneIdentifier":n.key="Subnet";break;case"RouteSet":n.key="Route";break;case"SubnetIds":n.key="Subnet";break;case"OptionSettings":n.key="Option";break;case"Options":n.key="Option"}__indexOf.call(f,a)>=0&&(n.key=this.pluralToSingular(a)),t.length===1&&(n.key=e.RESNAME[n.key]||n.key);try{n.key==="MasterUserPassword"&&n.value&&n.value.type==="changed"&&(n.value.__new__=n.value.__new__.replace(/./g,"*"))}catch(c){u=c,null}return n}}},r=function(e,t){var n,r,i,s,o,u,a,f,l,c,h,p,d,v;return v=function(e,t){var n,r,i,s;if(_.isString(e)&&e.indexOf("@{")===0){i=/@\{.*\}/g,n=e.match(i);if(n&&n.length){r=e.slice(2,e.length-1),s=r.split(".")[0];if(!t)return r;if(s)return""+s+".name"}}return null},_.isObject(t.value)?(f=t.value,s=!0,t.key&&t.key.substr(t.key.lastIndexOf("Id"))==="Id"&&(s=!1),h=v(f.__old__,s),a=v(f.__new__,s),h&&(f.__old__=this.h.getNodeMap(h).oldAttr),a&&(f.__new__=this.h.getNodeMap(a).newAttr),t=this.h.replaceArrayIndex(e,t),t.value={type:f.type,old:f.__old__,"new":f.__new__}):(r=this.h.getNodeMap(e),l=r.oldAttr,o=r.newAttr,d=v(t.value),d&&(n=this.h.getNodeMap(d),p=n.oldAttr,f=n.newAttr,t.value=p||f),e.length===1&&(i=e[0],c=(l?l.name:void 0)||"",u=(o?o.name:void 0)||"",l?t.key=l.type:t.key=o.type,t.value=this.h.genValue(null,c,u)),t=this.h.replaceArrayIndex(e,t)),e.length===2&&(e[1]==="resource"&&(t.skip=!0),e[1]==="state"&&delete t.key),t},t=function(e){return _.extend(this,e),this.h=n(e),this},t.prototype.node=r,t}),define("ResDiff",["UI.modalplus","DiffTree","component/resdiff/resDiffTpl","component/resdiff/prepare","constant","i18n!/nls/lang.js","ApiRequest"],function(e,t,n,r,i,s,o){return Backbone.View.extend({className:"res_diff_tree",tagName:"section",initialize:function(e){return this.oldAppJSON=e.old,this.newAppJSON=e["new"],e.callback&&(this.callback=e.callback),this.prepare=new r({oldAppJSON:this.oldAppJSON,newAppJSON:this.newAppJSON}),this._genDiffInfo(this.oldAppJSON.component,this.newAppJSON.component)},events:{"click .item .type":"_toggleTab","click .head":"_toggleItem"},_toggleItem:function(e){var t;return t=$(e.currentTarget).closest(".group"),t.toggleClass("closed")},_toggleTab:function(e){var t;t=$(e.currentTarget).closest(".item");if(t.hasClass("end"))return;return t.toggleClass("closed")},render:function(){var t,r,i;return i=this,t=s.PROP.APP_DIFF_CHANGE_CONFIRM,r={template:n.frame(),title:s.IDE.TITLE_APP_CHANGES,disableClose:!0,hideClose:!0,confirm:{text:t},width:"608px",compact:!1,preventClose:!0},this.modal=new e(r),this.modal.on("confirm",function(){var e,n;return e=i.modal.tpl.find(".modal-confirm"),i.callback?(e.addClass("disabled"),e.text("Saving..."),n=i.callback(!0),n.then(function(){return i.modal.close()},function(n){return e.text(t),e.removeClass("disabled"),n.error===o.Errors.AppConflict?notification("error",s.IDE.WARNNING_APP_CHANGE_BY_OTHER_USER):notification("error",n.msg)})):i.modal.close()},this),this.modal.on("cancel",function(){return i.callback&&i.callback(!1),i.modal.close()},this),this.modal.tpl.find("article").html(this.$el),this._genResGroup(this.$el),this.modal.resize()},_genDiffInfo:function(e,n){var r,i,s,o,u;s=this,s.addedComps={},s.removedComps={},s.modifiedComps={},u={},o={},i={"AWS.EC2.Tag":!0,"AWS.AutoScaling.Tag":!0},_.each(e,function(t,r){if(t&&!i[t.type])return n[r]?(u[r]=e[r],o[r]=n[r]):s.removedComps[r]=e[r],null}),_.each(_.keys(n),function(t){return e[t]||n[t]&&!i[n[t].type]&&(s.addedComps[t]=n[t]),null}),r=new t,s.modifiedComps=r.compare(u,o);if(!s.modifiedComps)return s.modifiedComps={}},_genResGroup:function(e){var t,r,i,o,u,a,f,l;u=this,o=[{title:s.TOOLBAR.POP_DIFF_NEW_RES,diffComps:u.addedComps,closed:!0,type:"added",needDiff:!1},{title:s.TOOLBAR.POP_DIFF_REMOVED_RES,diffComps:u.removedComps,closed:!0,type:"removed",needDiff:!1},{title:s.TOOLBAR.POP_DIFF_MODIFY_RES,diffComps:u.modifiedComps,closed:!1,type:"modified",needDiff:!0}],l=[];for(a=0,f=o.length;a<f;a++)i=o[a],r=_.keys(i.diffComps).length,r?(t=$(n.resDiffGroup({type:i.type,title:i.title,count:r})).appendTo(e),l.push(this._genResTree(t.find(".content"),i.diffComps,i.closed,i.needDiff))):l.push(void 0);return l},_genResTree:function(e,t,r,i){var s,o;return s=this,o=function(e,t,i,u){var a,f,l,c,h,p,d,v,m,g,y,b;if(_.isObject(e)){if(_.isUndefined(e.__new__)&&_.isUndefined(e.__old__)){a=$(n.resDiffTree({})).appendTo(u),y=[];for(g in e)b=e[g],m=_.isObject(b)?"":b,h=i.concat([g]),c=this.prepare.node(h,{key:g,value:m,originValue:b}),c.key?(c.skip?(f=u,a.remove()):(f=$(n.resDiffTreeItem({key:c.key,value:c.value,closed:r})).appendTo(a),_.isObject(b)||f.addClass("end")),_.isArray(b)&&b.length===0?y.push(f.remove()):y.push(o.call(s,b,g,h,f))):y.push(void 0);return y}return l=e.type,c=this.prepare.node(i,{key:t,value:e}),c.key?(p=v=d="",_.isObject(c.value)?c.value.type==="added"?(e=c.value["new"],p="new"):c.value.type==="removed"?(e=c.value.old,p="old"):c.value.type==="changed"&&(e=c.value.old,v=c.value["new"],p="old",d="new"):e=c.value,u.html(n.resDiffTreeMeta({key:c.key,value:e,type:p,value1:v,type1:d,closed:r})),u.addClass("end"),u.addClass(l)):u.remove()}},o.call(s,t,null,[],e)},getRelatedInstanceGroupUID:function(e,t){var n,r,s,o,u,a,f,l;l=this,f=t.type;if(f===i.RESTYPE.INSTANCE)return t.serverGroupUid;f===i.RESTYPE.ENI&&(u=t.resource.Attachment.InstanceId);if(u){a=MC.extractID(u),o=e[a];if(o)return o.serverGroupUid}f===i.RESTYPE.VOL&&(u=t.resource.AttachmentSet.InstanceId);if(u){a=MC.extractID(u),o=e[a];if(o)return o.serverGroupUid}f===i.RESTYPE.EIP&&(r=t.resource.NetworkInterfaceId);if(r){s=MC.extractID(r),n=e[s];if(n)return l.getRelatedInstanceGroupUID(e,n)}return""},renderAppUpdateView:function(){return this._genResGroup(this.$el),this.$el},getDiffInfo:function(){var e,n,r,i,s,o,u,a,f,l;l=this,a=_.extend({},l.oldAppJSON),u=_.extend({},l.newAppJSON),r=!1;if(_.size(l.addedComps)||_.size(l.removedComps)||_.size(l.modifiedComps))r=!0;return n=new t,o=n.compare(a.layout,u.layout),i=!1,_.size(o)&&(i=!0),s=!1,f=!0,_.each(l.modifiedComps,function(e,t){return e.state&&(s=!0),_.size(e)===1&&e.state?delete l.modifiedComps[t]:f=!1,e&&e.state&&delete e.state,null}),f&&_.size(l.addedComps)===0&&_.size(l.removedComps)===0&&(r=!1),delete a.component,delete a.layout,delete u.component,delete u.layout,e=n.compare(a,u),_.size(e)>0&&(i=!0),{compChange:r,layoutChange:i,stateChange:s}},getChangeInfo:function(){var e,t,n,r,s;s=this,e=!1;if(_.size(s.addedComps)||_.size(s.removedComps)||_.size(s.modifiedComps))e=!0;return t=_.some(s.addedComps,function(e){return s.newAppJSON.layout[e.uid]}),n=s.newAppJSON.component,r=s.oldAppJSON.component,_.each(s.modifiedComps,function(e,n){var s,o;return s=r[n],s&&((o=s.type)===i.RESTYPE.ENI||o===i.RESTYPE.EIP||o===i.RESTYPE.INSTANCE||o===i.RESTYPE.VOL)&&s&&s.number>1&&(t=!0),null}),_.each(s.modifiedComps,function(e,n){var s;return r[n]&&r[n].type===i.RESTYPE.ELB&&e&&e.resource&&e.resource.Instances&&(s=[],_.map(e.resource.Instances,function(e){var t;t=e.InstanceId;if(t){t.__old__&&s.push(t.__old__);if(t.__new__)return s.push(t.__new__)}}),_.each(s,function(e){return n=MC.extractID(e),r[n]&&r[n].number>1&&(t=!0),null})),null}),_.each(s.modifiedComps,function(e,r){return n[r]&&n[r].type===i.RESTYPE.ASG&&(e&&e.resource&&e.resource.AvailabilityZones&&(t=!0),e&&e.resource&&e.resource.VPCZoneIdentifier&&(t=!0)),null}),_.each(s.removedComps,function(e){var n,o,u;if((u=e.type)===i.RESTYPE.ENI||u===i.RESTYPE.EIP||u===i.RESTYPE.INSTANCE||u===i.RESTYPE.VOL)o=s.getRelatedInstanceGroupUID(r,e),n=r[o],n&&n.number>1&&(t=!0);return null}),{hasResChange:e,needUpdateLayout:t}}})}),define("component/ResDiff",function(){});