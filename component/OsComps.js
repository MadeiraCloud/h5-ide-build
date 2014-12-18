define("component/oscomps/KpDialogTpl",["handlebars"],function(e){var t,n={};return t=function(e,t,n,r,i){function f(e,t){var n="",r;return n+='\n<tr class="item" data-id="">\n    <td>\n        <div class="checkbox">\n            <input id="kp-select-'+u((r=e&&e.name,typeof r===o?r.apply(e):r))+'" type="checkbox" value="None" data-name="'+u((r=e&&e.name,typeof r===o?r.apply(e):r))+'" class="one-cb">\n            <label for="kp-select-'+u((r=e&&e.name,typeof r===o?r.apply(e):r))+'"></label>\n        </div>\n    </td>\n    <td>'+u((r=e&&e.name,typeof r===o?r.apply(e):r))+"</td>\n    <td>"+u((r=e&&e.fingerprint,typeof r===o?r.apply(e):r))+"</td>\n</tr>\n",n}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s,o="function",u=this.escapeExpression,a=this;return s=n.each.call(t,t&&t.keys,{hash:{},inverse:a.noop,fn:a.program(1,f,i),data:i}),s||s===0?s:""},n.keys=e.template(t),t=function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u=this.escapeExpression;s+='<div class="slide-create" data-bind="true">\n    <div class="before-create">\n        <label for="create-kp-name">'+u(n.i18n.call(t,"PROP.KP_NAME",{hash:{},data:i}))+'</label>\n        <input class="input" type="text" id="create-kp-name" data-ignore="true" data-ignore-regexp="^[a-zA-Z0-9,_-]*$" data-required="true" maxlength="255" placeholder="allow alphanumber, _ or - up to 255 characters" autofocus>\n    </div>\n    <div class="after-create hide">',o=n.i18n.call(t,"PROP.KP_CREATED_NEED_TO_DOWNLAOD",{hash:{},data:i});if(o||o===0)s+=o;return s+='</div>\n    <div class="init action">\n        <button class="btn btn-blue do-action" data-action="create">'+u(n.i18n.call(t,"PROP.LBL_CREATE",{hash:{},data:i}))+'</button>\n        <button class="btn btn-silver cancel">'+u(n.i18n.call(t,"PROP.LBL_CANCEL",{hash:{},data:i}))+'</button>\n    </div>\n    <div class="processing action" style="display:none;">\n        <button class="btn" disabled>'+u(n.i18n.call(t,"PROP.LBL_CREATING",{hash:{},data:i}))+'</button>\n    </div>\n    <div class="download action" style="display:none;">\n        <a class="btn btn-blue do-action pulse" data-action="download" id="download-kp">'+u(n.i18n.call(t,"PROP.LBL_DOWNLOAD",{hash:{},data:i}))+'</a>\n        <button class="btn btn-silver cancel" disabled>'+u(n.i18n.call(t,"PROP.LBL_CLOSE",{hash:{},data:i}))+"</button>\n    </div>\n</div>",s},n.slide_create=e.template(t),t=function(e,t,n,r,i){function l(e,t){var n;return a((n=e&&e.selecteKeyName,typeof n===u?n.apply(e):n))}function c(e,t){var r="",i;return r+=a(n.i18n.call(e,"PROP.KP_CONFIRM_DELETE_2",{hash:{},data:t}))+" "+a((i=e&&e.selectedCount,typeof i===u?i.apply(e):i))+" "+a(n.i18n.call(e,"PROP.KP_CONFIRM_DELETE_3",{hash:{},data:t})),r}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u="function",a=this.escapeExpression,f=this;s+='<div class="slide-delete">\n    <div class="modal-text-major">'+a(n.i18n.call(t,"PROP.KP_CONFIRM_DELETE_1",{hash:{},data:i}))+" ",o=n["if"].call(t,t&&t.selecteKeyName,{hash:{},inverse:f.program(3,c,i),fn:f.program(1,l,i),data:i});if(o||o===0)s+=o;return s+='?</div>\n    <div class="init action">\n        <button class="btn btn-red do-action" data-action="delete">'+a(n.i18n.call(t,"PROP.LBL_DELETE",{hash:{},data:i}))+'</button>\n        <button class="btn btn-silver cancel">'+a(n.i18n.call(t,"PROP.LBL_CANCEL",{hash:{},data:i}))+'</button>\n    </div>\n    <div class="processing action" style="display:none;">\n        <button class="btn" disabled>'+a(n.i18n.call(t,"PROP.LBL_DELETING",{hash:{},data:i}))+"</button>\n    </div>\n</div>",s},n.slide_delete=e.template(t),t=function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o=this.escapeExpression;return s+='<div class="slide-import" data-bind="true">\n    <label for="import-kp-name">'+o(n.i18n.call(t,"PROP.KP_NAME",{hash:{},data:i}))+'</label>\n    <input class="input" type="text" id="import-kp-name" data-ignore="true" data-ignore-regexp="^[a-zA-Z0-9,_-]*$" data-required="true" maxlength="255" placeholder="allow alphanumber, _ or - up to 255 characters">\n    <div class="import-zone">\n\n    </div>\n    <div class="init action">\n        <button class="btn" disabled>'+o(n.i18n.call(t,"PROP.LBL_IMPORT",{hash:{},data:i}))+'</button>\n        <button class="btn btn-silver cancel">'+o(n.i18n.call(t,"PROP.LBL_CANCEL",{hash:{},data:i}))+'</button>\n    </div>\n    <div class="ready action" style="display:none;">\n        <button class="btn btn-blue do-action" data-action="import">'+o(n.i18n.call(t,"PROP.LBL_IMPORT",{hash:{},data:i}))+'</button>\n        <button class="btn btn-silver cancel">'+o(n.i18n.call(t,"PROP.LBL_CANCEL",{hash:{},data:i}))+'</button>\n    </div>\n    <div class="processing action" style="display:none;">\n        <button class="btn" disabled>'+o(n.i18n.call(t,"PROP.LBL_IMPORTING",{hash:{},data:i}))+"</button>\n    </div>\n</div>",s},n.slide_import=e.template(t),t=function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u="function",a=this.escapeExpression;return s+='<div class="upload-kp-component drop-zone">\n    <p class="upload-stuff">\n        Drop '+a((o=t&&t.type,typeof o===u?o.apply(t):o))+',\n        <label for="modal-import" class="select-file-link">'+a(n.i18n.call(t,"PROP.KP_SELECT_A_FILE",{hash:{},data:i}))+'</label>\n        <span class="display-empty">'+a(n.i18n.call(t,"PROP.KP_OR_PASTE_KEY_CONTENT",{hash:{},data:i}))+'</span>\n        <span class="display-filled" style="display:none;">'+a(n.i18n.call(t,"PROP.KP_OR_PASTE_TO_UPDATE",{hash:{},data:i}))+'</span>\n        <input type="file" id="modal-import">\n    </p>\n    <p class="key-content"></p>\n</div>',s},n.upload=e.template(t),t=function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u="function",a=this.escapeExpression;return s+='<textarea autofocus spellcheck="false" class="safari-download-textarea input">'+a((o=t&&t.keypair,typeof o===u?o.apply(t):o))+"</textarea>",s},n.safari_download=e.template(t),t=function(e,t,n,r,i){return this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{},'<button class="btn btn-primary dropdown-list-btn">Manage KeyPairs</button>'},n.kpButton=e.template(t),n}),function(){define("OsKp",["Design","CloudResources","constant","toolbar_modal","UI.modalplus","component/oscomps/KpDialogTpl","kp_upload","i18n!/nls/lang.js","JsonExporter","UI.selection"],function(e,t,n,r,i,s,o,u,a,f){var l;return l=a.download,Backbone.View.extend({__needDownload:!1,__upload:null,__import:"",__mode:"normal",initialize:function(r,i){return this.template=i,this.resModel=r,this.collection=t(n.RESTYPE.OSKP,e.instance().region()),this.listenTo(this.collection,"update",this.updateOption.bind(this)),this},render:function(e){var t,n;return t=$("<div/>"),this.template||(this.template=$("<select class='selection option' name='kpDropdown' data-button-tpl='kpButton'></select>")),$(this.template).attr("placeholder",u.IDE.COMPONENT_SELECT_KEYPAIR),t.append(this.template),n=t.find("select.selection.option"),f(t,this.selectionTemplate),n.on("select_initialize",function(t){return function(){t.selectize=n[0].selectize,t.updateOption();if(e)return t.setValue(e)}}(this)),this.$input=n,this.resModel&&this.$input.change(function(e){return function(){return e.resModel.set("keypair",e.$input.val())}}(this)),n.on("select_dropdown_button_click",function(e){return function(){return void 0,e.trigger("manage"),e.manage()}}(this)),this.setElement(t),this},hasResourceWithDefaultKp:function(){var t;return t=!1,e.instance().eachComponent(function(e){e.type===n.RESTYPE.OSSERVER&&e.get("keypair")==="$DefaultKeyPair"&&e.get("credential")==="keypair"&&(t=!0)}),t},defaultKpNotSet:function(){var t,r;return t=e.modelClassForType(n.RESTYPE.OSKP),r=_.find(t.allObjects(),function(e){return e.get("name")==="DefaultKP"}),!r.get("keyName")||!r.get("fingerprint")},setDefaultKeyPair:function(){var t;return t=this,e.instance().eachComponent(function(r){var i,s,o;if(r.type===n.RESTYPE.OSSERVER&&r.get("keypair")==="$DefaultKeyPair"&&r.get("credential")==="keypair")return void 0,o=t.collection.get(t.$input.val()),i=e.modelClassForType(n.RESTYPE.OSKP),s=_.find(i.allObjects(),function(e){return e.get("name")==="DefaultKP"}),s.set("keyName",o.get("name")),s.set("fingerprint",o.get("fingerprint"))})},updateOption:function(){var e,t;t=_.map(this.collection.toJSON(),function(e){return{text:e.name,value:e.name}}),e=this.resModel?[{text:"$DefaultKeyPair",value:"$DefaultKeyPair"}]:[],t=e.concat(t);if(!this.selectize)return!1;this.selectize.clearOptions(),this.selectize.addOption(t);if(this.resModel)return this.selectize.setValue(this.resModel.get("keypair")||t[0].value)},setValue:function(e){return this.selectize?this.selectize.setValue(e):(void 0,!1)},getValue:function(){return this.selectize?this.selectize.getValue():(void 0,!1)},needDownload:function(){return arguments.length===1?(this.__needDownload=arguments[0],arguments[0]===!1&&this.M$(".cancel").prop("disabled",!1)):this.__needDownload&&notification("warning",u.NOTIFY.YOU_MUST_DOWNLOAD_THE_KEYPAIR),this.__needDownload},denySlide:function(){return!this.needDownload()},selectionTemplate:{kpButton:function(){return s.kpButton()}},getModalOptions:function(){var t,r,i;return i=this,t=e.instance().get("region"),r=n.REGION_SHORT_LABEL[t]||t,{title:"Manage Key Pairs in "+r,slideable:_.bind(i.denySlide,i),context:i,buttons:[{icon:"new-stack",type:"create",name:u.IDE.COMPONENT_CREATE_KEYPAIR},{icon:"import",type:"import",name:u.IDE.COMPONENT_IMPORT_KEY_PAIR},{icon:"del",type:"delete",disabled:!0,name:u.IDE.COMPONENT_DELETE_KEY_PAIR},{icon:"refresh",type:"refresh",name:""}],columns:[{sortable:!0,width:"40%",name:u.IDE.COMPONENT_KEY_PAIR_COL_NAME},{sortable:!1,name:u.IDE.COMPONENT_KEY_PAIR_COL_FINGERPRINT}]}},initModal:function(){return new r(this.getModalOptions()),this.modal.on("slidedown",this.renderSlides,this),this.modal.on("action",this.doAction,this),this.modal.on("refresh",this.refresh,this)},manage:function(e){var t;return e||(e={}),this.initModal(),this.modal.render(),App.user.hasCredential()?(t=this,this.collection.fetch().then(function(){return t.renderKeys()})):this.modal.render("nocredential"),this.collection.on("update",this.renderKeys,this)},renderKeys:function(){var e;return this.collection.isReady()?(e={keys:this.collection.toJSON()},this.modal.setContent(s.keys(e)),this):!1},__events:{"click #kp-create":"renderCreate","click #kp-import":"renderImport","click #kp-delete":"renderDelete","click #kp-refresh":"refresh","click .cancel":"cancel"},downloadKp:function(){return this.__downloadKp&&this.__downloadKp()},doAction:function(e,t){return this[e]&&this[e](this.validate(e),t)},validate:function(e){switch(e){case"create":return!this.M$("#create-kp-name").parsley("validate");case"import":return!this.M$("#import-kp-name").parsley("validate")}},switchAction:function(e){return e||(e="init"),this.M$(".slidebox .action").each(function(){return $(this).hasClass(e)?$(this).show():$(this).hide()})},genDownload:function(e,t){return this.__downloadKp=function(){var n,r;$("body").hasClass("safari")?n=null:n=new Blob([t]);if(!n){r={template:s.safari_download({keypair:t}),title:"Keypair Content",disableFooter:!0,disableClose:!0,width:"855px",height:"473px",compact:!0},new i(r),$(".safari-download-textarea").select();return}return l(n,e)},this.__downloadKp},genDeleteFinish:function(e){var t,n,r,i;return r=[],t=[],i=this,n=_.after(e,function(){return i.cancel(),r.length===1?(void 0,notification("info",sprintf(u.NOTIFY.XXX_IS_DELETED,r[0].attributes.name))):r.length>1&&notification("info",sprintf(u.NOTIFY.SELECTED_KEYPAIRS_ARE_DELETED,r.length)),i.collection.toJSON().length||(i.M$("#t-m-select-all").get(0).checked=!1),_.each(t,function(e){return void 0})}),function(e){return void 0,!e.reason&&!e.msg?r.push(e):t.push(e),n()}},create:function(e){var t,n;n=this;if(!e)return t=this.M$("#create-kp-name").val(),this.switchAction("processing"),this.collection.create({name:t}).save().then(function(e){return n.needDownload(!0),n.genDownload(""+e.attributes.name+".pem",e.attributes.private_key),n.switchAction("download"),n.M$(".before-create").hide(),n.M$(".after-create").find("span").text(e.attributes.keyName).end().show()},function(e){return n.modal.error(e.awsResult||e.reason||e.msg),n.switchAction()})},download:function(){return this.needDownload(!1),this.__downloadKp&&this.__downloadKp(),null},"delete":function(e,t){var n,r,i;return n=t.length,r=this.genDeleteFinish(n),this.switchAction("processing"),i=this,_.each(t,function(e){return function(t){return e.collection.findWhere({name:t.data.name.toString()}).destroy().then(r,r)}}(this))},"import":function(e){var t,n,r;r=this;if(!e){n=this.M$("#import-kp-name").val(),this.switchAction("processing");try{t=r.__upload.getData()}catch(i){this.modal.error("Key is not in valid OpenSSH public key format"),r.switchAction("init");return}return this.collection.create({name:n,public_key:t}).save().then(function(e){return notification("info",sprintf(u.NOTIFY.XXX_IS_IMPORTED,n)),r.cancel()},function(e){var t;return e.awsResult&&e.awsResult.indexOf("Length exceeds maximum of 2048")>=0?t="Length exceeds maximum of 2048":t=e.awsResult||e.error_message||e.reason||e.msg,r.modal.error(t),r.switchAction("ready")})}},cancel:function(){return this.modal.cancel()},refresh:function(){return this.collection.fetchForce().then(function(e){return function(){return e.renderKeys()}}(this))},renderSlides:function(e,t){var n,r,i;return r=s["slide_"+e],n=this.getSlides(),(i=n[e])!=null?i.call(this,r,t):void 0},getSlides:function(){var e,t;return t=this,e=this.modal,{create:function(t,n){return e.setSlide(t)},"delete":function(t,n){var r,i;r=n.length;if(!r)return;return i={},r===1?i.selecteKeyName=n[0].data.name:i.selectedCount=r,e.setSlide(t(i))},"import":function(n,r){return e.setSlide(n),t.__upload&&t.__upload.remove(),t.__upload=new o,t.__upload.on("load",t.afterImport,this),t.M$(".import-zone").html(t.__upload.render().el)}}},afterImport:function(e){return this.switchAction("ready")}})})}.call(this),define("component/oscomps/SnapshotTpl",["handlebars"],function(e){var t,n={};return t=function(e,t,n,r,i){function f(e,t){var r="",i;r+='\n<li class="item',i=n["if"].call(e,e&&e.selected,{hash:{},inverse:a.noop,fn:a.program(2,l,t),data:t});if(i||i===0)r+=i;r+='" data-id="'+u((i=e&&e.id,typeof i===o?i.apply(e):i))+'" tabindex="-1">\n    ',i=n["if"].call(e,e&&e.id,{hash:{},inverse:a.program(9,d,t),fn:a.program(4,c,t),data:t});if(i||i===0)r+=i;return r+="\n</li>\n",r}function l(e,t){return" selected"}function c(e,t){var r="",i;r+='\n    <div class="manager-content-main" data-id="'+u((i=e&&e.id,typeof i===o?i.apply(e):i))+'">',i=n["if"].call(e,e&&e.name,{hash:{},inverse:a.program(7,p,t),fn:a.program(5,h,t),data:t});if(i||i===0)r+=i;return r+='</div>\n    <div class="manager-content-sub">Name: '+u((i=e&&e.name,typeof i===o?i.apply(e):i))+" &nbsp;&nbsp;&nbsp;&nbsp;Size: "+u((i=e&&e.size,typeof i===o?i.apply(e):i))+" GiB</div>\n    ",r}function h(e,t){var n;return u((n=e&&e.name,typeof n===o?n.apply(e):n))}function p(e,t){return"&lt;No Name&gt;"}function d(e,t){var n="",r;return n+='\n    <div class="manager-content-main" data-id="'+u((r=e&&e.region,typeof r===o?r.apply(e):r))+'">'+u((r=e&&e.name,typeof r===o?r.apply(e):r))+"</div>\n    ",n}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s,o="function",u=this.escapeExpression,a=this;return s=n.each.call(t,t&&t.data,{hash:{},inverse:a.noop,fn:a.program(1,f,i),data:i}),s||s===0?s:""},n.keys=e.template(t),t=function(e,t,n,r,i){function f(e,t){var r="",i;r+='\n<tr class="item" data-id="">\n    <td>\n        <div class="checkbox">\n            <input id="'+u((i=e&&e.id,typeof i===o?i.apply(e):i))+'" type="checkbox" value="None" data-id="'+u((i=e&&e.id,typeof i===o?i.apply(e):i))+'" data-name="'+u((i=e&&e.name,typeof i===o?i.apply(e):i))+'" class="one-cb">\n            <label for="'+u((i=e&&e.id,typeof i===o?i.apply(e):i))+'"></label>\n        </div>\n    </td>\n    <td><div class="manager-content-main">',i=n["if"].call(e,e&&e.name,{hash:{},inverse:a.program(4,c,t),fn:a.program(2,l,t),data:t});if(i||i===0)r+=i;r+="</div></td>\n    <td>"+u((i=e&&e.size,typeof i===o?i.apply(e):i))+' GiB</td>\n    <td>\n        <div class="manager-content-main">',i=n["if"].call(e,e&&e.completed,{hash:{},inverse:a.program(8,p,t),fn:a.program(6,h,t),data:t});if(i||i===0)r+=i;return r+='</div>\n        <span class="manager-content-sub">Started: '+u((i=e&&e.started,typeof i===o?i.apply(e):i))+"</span>\n    </td>\n    <td>"+u((i=e&&e.description,typeof i===o?i.apply(e):i))+"</td>\n</tr>\n",r}function l(e,t){var n;return u((n=e&&e.name,typeof n===o?n.apply(e):n))}function c(e,t){return"&lt;No Name&gt;"}function h(e,t){return'<i class="status status-green icon-label"></i> Completed'}function p(e,t){var n="",r;return n+='<i class="status status-yellow icon-label"></i> Pending - '+u((r=e&&e.progress,typeof r===o?r.apply(e):r))+"%",n}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s,o="function",u=this.escapeExpression,a=this;return s=n.each.call(t,t&&t.items,{hash:{},inverse:a.noop,fn:a.program(1,f,i),data:i}),s||s===0?s:""},n.content=e.template(t),t=function(e,t,n,r,i){function l(e,t){var n;return a((n=e&&e.selectedId,typeof n===u?n.apply(e):n))}function c(e,t){var r="",i;return r+=a(n.i18n.call(e,"PROP.DELETE_SNAPSHOT_2",{hash:{},data:t}))+a((i=e&&e.selectedCount,typeof i===u?i.apply(e):i))+a(n.i18n.call(e,"PROP.DELETE_SNAPSHOT_3",{hash:{},data:t})),r}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u="function",a=this.escapeExpression,f=this;s+='<div class="slide-delete">\n    <div class="modal-text-major">'+a(n.i18n.call(t,"PROP.DELETE_SNAPSHOT_1",{hash:{},data:i})),o=n["if"].call(t,t&&t.selectedId,{hash:{},inverse:f.program(3,c,i),fn:f.program(1,l,i),data:i});if(o||o===0)s+=o;return s+='?</div>\n    <div class="init action">\n        <button class="btn btn-red do-action" data-action="delete">'+a(n.i18n.call(t,"PROP.LBL_DELETE",{hash:{},data:i}))+'</button>\n        <button class="btn btn-silver cancel">'+a(n.i18n.call(t,"PROP.LBL_CANCEL",{hash:{},data:i}))+'</button>\n    </div>\n    <div class="processing action" style="display:none;">\n        <button class="btn" disabled>'+a(n.i18n.call(t,"PROP.LBL_DELETING",{hash:{},data:i}))+"</button>\n    </div>\n</div>",s},n.slide_delete=e.template(t),t=function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o=this.escapeExpression;return s+='<div class="slide-create" data-bind="true">\n    <div class="formart_toolbar_modal" data-type="true">\n        <section data-bind="true">\n            <div class="control-group clearfix">\n                <label for="property-snapshot-name-create">'+o(n.i18n.call(t,"PROP.SNAPSHOT_SET_NAME",{hash:{},data:i}))+'</label>\n                <div>\n                    <input id="property-snapshot-name-create" class="input" type="text" maxlength="255" data-type="domain" data-ignore="true" placeholder="Allow alpha number, _ or - up to 255 characters.">\n                </div>\n            </div>\n\n            <div class="control-group clearfix property-content" style="background: none">\n                <label for="property-volume-choose">'+o(n.i18n.call(t,"PROP.SNAPSHOT_SET_VOLUME",{hash:{},data:i}))+'</label>\n                <div>\n                    <div id="property-volume-choose">\n                        <select id="snapshot-volume-choose" data-option-tpl="option" data-item-tpl="item" class="selection option" placeholder="'+o(n.i18n.call(t,"PROP.VOLUME_SNAPSHOT_SELECT",{hash:{},data:i}))+'"></select>\n                    </div>\n                </div>\n            </div>\n\n            <div class="control-group clearfix property-content" style="background: none">\n                <label for="property-snapshot-desc-create">'+o(n.i18n.call(t,"PROP.SNAPSHOT_SET_DESC",{hash:{},data:i}))+'</label>\n                <div>\n                    <input id=\'property-snapshot-desc-create\' class="input" placeholder="Up to 255 characters" type="text"/>\n                </div>\n            </div>\n\n        </section>\n        <div class="init action">\n            <button class="btn btn-blue do-action" data-action="create" disabled>'+o(n.i18n.call(t,"PROP.LBL_CREATE",{hash:{},data:i}))+'</button>\n            <button class="btn btn-silver cancel">'+o(n.i18n.call(t,"PROP.LBL_CANCEL",{hash:{},data:i}))+'</button>\n        </div>\n        <div class="processing action" style="display:none;">\n            <button class="btn" disabled>'+o(n.i18n.call(t,"PROP.LBL_CREATING",{hash:{},data:i}))+"</button>\n        </div>\n    </div>\n</div>",s},n.slide_create=e.template(t),t=function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u=this.escapeExpression,a="function";return s+='<div class="slide-duplicate" data-bind="true">\n    <div class="formart_toolbar_modal" data-type="true">\n        <section data-bind="true">\n            <div class="control-group clearfix">\n                <label for="property-snapshot-source">'+u(n.i18n.call(t,"PROP.SNAPSHOT_SOURCE_SNAPSHOT",{hash:{},data:i}))+'</label>\n                <div>\n                    <p id="property-snapshot-source">'+u((o=(o=t&&t.originSnapshot,o==null||o===!1?o:o.id),typeof o===a?o.apply(t):o))+'</p>\n                </div>\n            </div>\n            <div class="control-group clearfix">\n                <label for="property-snapshot-name">'+u(n.i18n.call(t,"PROP.SNAPSHOT_SET_NEW_NAME",{hash:{},data:i}))+'</label>\n                <div>\n                    <input id="property-snapshot-name" class="input" type="text" maxlength="255" data-type="domain" value="'+u((o=(o=t&&t.originSnapshot,o==null||o===!1?o:o.id),typeof o===a?o.apply(t):o))+'-copy" data-ignore="true">\n                </div>\n            </div>\n\n            <div class="control-group clearfix property-content" style="background: none">\n                <label for="property-region-choose">'+u(n.i18n.call(t,"PROP.SNAPSHOT_DESTINATION_REGION",{hash:{},data:i}))+'</label>\n                <div>\n                    <div id="property-region-choose"></div>\n                </div>\n            </div>\n\n            <div class="control-group clearfix property-content" style="background: none">\n                <label for="property-snapshot-desc">'+u(n.i18n.call(t,"PROP.SNAPSHOT_SET_DESC",{hash:{},data:i}))+'</label>\n                <div>\n                    <input id=\'property-snapshot-desc\' class="input" value="[Copied '+u((o=(o=t&&t.originSnapshot,o==null||o===!1?o:o.id),typeof o===a?o.apply(t):o))+" from "+u((o=t&&t.region,typeof o===a?o.apply(t):o))+']" type="text"/>\n                </div>\n            </div>\n\n        </section>\n        <div class="init action">\n            <button class="btn btn-blue do-action" data-action="duplicate" disabled>'+u(n.i18n.call(t,"PROP.LBL_DUPLICATE",{hash:{},data:i}))+'</button>\n            <button class="btn btn-silver cancel">'+u(n.i18n.call(t,"PROP.LBL_CANCEL",{hash:{},data:i}))+'</button>\n        </div>\n        <div class="processing action" style="display:none;">\n            <button class="btn" disabled>'+u(n.i18n.call(t,"PROP.LBL_DUPLICATING",{hash:{},data:i}))+"</button>\n        </div>\n    </div>\n</div>",s},n.slide_duplicate=e.template(t),t=function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u="function",a=this.escapeExpression;return s+='<div>\n    <div class="manager-content-main">'+a((o=t&&t.name,typeof o===u?o.apply(t):o))+'</div>\n    <div class="manager-content-sub">'+a((o=t&&t.size,typeof o===u?o.apply(t):o))+" G &nbsp;&nbsp;|&nbsp;&nbsp;"+a((o=t&&t.id,typeof o===u?o.apply(t):o))+"</div>\n</div>",s},n.option=e.template(t),t=function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u="function",a=this.escapeExpression;return s+="<div>"+a((o=t&&t.text,typeof o===u?o.apply(t):o))+"</div>",s},n.item=e.template(t),n}),function(){define("OsSnapshot",["CloudResources","ApiRequest","constant","combo_dropdown","UI.modalplus","toolbar_modal","i18n!/nls/lang.js","component/oscomps/SnapshotTpl","UI.selection"],function(e,t,n,r,i,s,o,u,a){var f,l,c,h,p;return c=!1,f=0,l=0,h=!1,p={},Backbone.View.extend({constructor:function(){return this.collection=e(n.RESTYPE.OSSNAP,Design.instance().region()),this.listenTo(this.collection,"update",this.onChange.bind(this)),this.listenTo(this.collection,"change",this.onChange.bind(this)),this},onChange:function(){return this.initManager(),this.trigger("datachange",this)},remove:function(){return this.isRemoved=!0,Backbone.View.prototype.remove.call(this)},render:function(){return this.renderManager()},bindVolumeSelection:function(){var t;return t=this,this.volumes=e(n.RESTYPE.OSVOL,Design.instance().region()),this.manager.$el.on("select_change","#snapshot-volume-choose",function(){return t.selectSnapshot()}),this.manager.$el.on("select_initialize","#snapshot-volume-choose",function(){return t.selectize=this.selectize,this.selectize.setLoading(!0),t.manager.$el.find("#snapshot-volume-choose").on("select_dropdown_open",function(){return t.selectize.load(function(e){return t.volumes.fetch().then(function(){var n;return n=_.map(t.volumes.toJSON(),function(e){return{text:e.name,value:e.id}}),t.selectize.setLoading(!1),e(n)})})})})},renderRegionDropdown:function(){var e,t;return e={filterPlaceHolder:o.PROP.SNAPSHOT_FILTER_REGION},this.regionsDropdown=new r(e),this.regions=_.keys(n.REGION_LABEL),t=o.PROP.VOLUME_SNAPSHOT_SELECT_REGION,this.regionsDropdown.setSelection(t),this.regionsDropdown.on("open",this.openRegionDropdown,this),this.regionsDropdown.on("filter",this.filterRegionDropdown,this),this.regionsDropdown.on("change",this.selectRegion,this),this.regionsDropdown},openRegionDropdown:function(e){var t,r,i,s;return r=Design.instance().get("region"),i=_.map(this.regions,function(e){return{name:n.REGION_LABEL[e]+" - "+n.REGION_SHORT_LABEL[e],selected:e===r,region:e}}),s={isRuntime:!1,data:i},e&&(s.data=e,s.hideDefaultNoKey=!0),t=u.keys(s),this.regionsDropdown.toggleControls(!1,"manage"),this.regionsDropdown.toggleControls(!0,"filter"),this.regionsDropdown.setContent(t)},openDropdown:function(e){return this.volumes.fetch().then(function(t){return function(){var n,r,i;return r=t.volumes.toJSON(),i={isRuntime:!1,data:r},e&&(i.data=e,i.hideDefaultNoKey=!0),n=u.keys(i),t.dropdown.toggleControls(!1,"manage"),t.dropdown.toggleControls(!0,"filter"),t.dropdown.setContent(n)}}(this))},filterRegionDropdown:function(e){var t;return t=_.filter(this.regions,function(t){return t.toLowerCase().indexOf(e.toLowerCase())!==-1}),e?this.openRegionDropdown(t):this.openRegionDropdown()},selectSnapshot:function(e){return this.manager.$el.find('[data-action="create"]').prop("disabled",!1)},selectRegion:function(e){return this.manager.$el.find('[data-action="duplicate"]').prop("disabled",!1)},renderManager:function(){var e;return this.manager=new s(this.getModalOptions()),this.manager.on("refresh",this.refresh,this),this.manager.on("slidedown",this.renderSlides,this),this.manager.on("action",this.doAction,this),this.manager.on("close",function(e){return function(){return e.manager.remove()}}(this)),this.manager.on("checked",this.processDuplicate,this),this.manager.render(),App.user.hasCredential()?this.initManager():((e=this.manager)!=null&&e.render("nocredential"),!1)},processDuplicate:function(e,t){return t.length===1?this.M$("[data-btn=duplicate]").prop("disabled",!1):this.M$("[data-btn=duplicate]").prop("disabled",!0)},refresh:function(){return c=!1,this.initManager()},setContent:function(){var e,t,n,r;return h=!1,c=!0,t=this.collection.toJSON(),t=_.map(t,function(e,t){return e.status==="available"&&(e.completed=!0),e.created_at&&(e.started=(new Date(e.created_at)).toString()),e}),n={items:t},e=u.content(n),(r=this.manager)!=null?r.setContent(e):void 0},initManager:function(){var e,t,n;t=this.setContent.bind(this),e=(n=Design.instance())!=null?n.get("region"):void 0;if(e&&(!c&&!h||!p[e]))return h=!0,p[e]=!0,this.collection.fetchForce().then(t,t);if(!h)return this.setContent()},renderSlides:function(e,t){var n,r,i;return r=u["slide_"+e],n=this.getSlides(),(i=n[e])!=null?i.call(this,r,t):void 0},getSlides:function(){return{"delete":function(e,t){var n,r;n=t.length;if(!n)return;return r={},n===1?r.selectedName=t[0].data.name:r.selectedCount=n,this.manager.setSlide(e(r))},create:function(e){var t;return t={volumes:{}},a(this.manager.$el,this.selectionTemplate.call(this)),this.bindVolumeSelection(),this.manager.setSlide(e(t))}}},doAction:function(e,t){return this["do_"+e]&&this["do_"+e]("do_"+e,t)},do_create:function(e,t){var n,r,i,s;return s=this.selectize.getValue(),s?(i=this.volumes.findWhere({id:this.selectize.getValue()}),i?(r={name:$("#property-snapshot-name-create").val(),volume_id:i.get("id"),description:$("#property-snapshot-desc-create").val()},this.switchAction("processing"),n=this.afterCreated.bind(this),this.collection.create(r).save().then(n,n)):!1):!1},do_delete:function(e,t){var n,r;return r=this,f+=t.length,this.switchAction("processing"),n=r.afterDeleted.bind(r),_.each(t,function(e){return function(t){return e.collection.findWhere({id:t.data.id}).destroy().then(n,n)}}(this))},do_duplicate:function(e,t){var n,r,i,s,o;return s=t[0],o=$("#property-region-choose").find(".selectbox .selection .manager-content-main").data("id"),this.regions.indexOf(o)<0?!1:(this.switchAction("processing"),i=this.manager.$el.find("#property-snapshot-name").val(),r=this.manager.$el.find("#property-snapshot-desc").val(),n=this.afterDuplicate.bind(this),this.collection.findWhere({id:s.data.id}).copyTo(o,i,r).then(n,n))},afterCreated:function(e,t){return this.manager.cancel(),e.error?(notification("error",sprintf(o.NOTIFY.CREATE_FAILED_BECAUSE_OF_XXX,e.msg)),!1):notification("info",o.NOTIFY.NEW_SNAPSHOT_IS_CREATED_SUCCESSFULLY)},afterDuplicate:function(e){var t;return t=Design.instance().get("region"),this.manager.cancel(),e.error?(notification("error",sprintf,o.NOTIFY.DUPLICATE_FAILED_BECAUSE_OF_XXX,e.msg),!1):e.attributes.region===t?(this.collection.add(e),notification("info",o.NOTIFY.INFO_DUPLICATE_SNAPSHOT_SUCCESS)):(this.initManager(),notification("info",o.NOTIFY.INFO_ANOTHER_REGION_DUPLICATE_SNAPSHOT_SUCCESS))},afterDeleted:function(e){f--,e.error&&l++;if(f===0)return l>0?notification("error",sprintf(o.NOTIFY.XXX_SNAPSHOT_FAILED_TO_DELETE,l)):notification("info",o.NOTIFY.INFO_DELETE_SNAPSHOT_SUCCESSFULLY),this.manager.unCheckSelectAll(),l=0,this.manager.cancel()},switchAction:function(e){return e||(e="init"),this.M$(".slidebox .action").each(function(){return $(this).hasClass(e)?$(this).show():$(this).hide()})},selectionTemplate:function(){var e;return e=this,{option:function(t){var n;return n=e.volumes.get(t.value),u.option(n.toJSON())},item:u.item}},getModalOptions:function(){var e,t,r;return r=this,e=Design.instance().get("region"),t=n.REGION_SHORT_LABEL[e]||e,{title:"Manage Snapshots in "+t,slideable:!0,context:r,buttons:[{icon:"new-stack",type:"create",name:o.PROP.CREATE_SNAPSHOT},{icon:"del",type:"delete",disabled:!0,name:o.PROP.LBL_DUPLICATE},{icon:"refresh",type:"refresh",name:""}],columns:[{sortable:!0,width:"20%",name:o.PROP.LBL_NAME},{sortable:!0,rowType:"number",width:"10%",name:o.PROP.LBL_CAPACITY},{sortable:!0,rowType:"datetime",width:"40%",name:o.PROP.LBL_STATUS},{sortable:!1,width:"auto",name:o.PROP.LBL_DESC}]}}})})}.call(this),define("component/OsComps",function(){});