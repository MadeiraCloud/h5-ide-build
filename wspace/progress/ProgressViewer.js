define("wspace/progress/PVTpl",["handlebars"],function(e){var t,n={};return t=function(e,t,n,r,i){function l(e,t){return"has-progess"}function c(e,t){var n;return a((n=e&&e.title,typeof n===u?n.apply(e):n))}function h(e,t){return a(n.i18n.call(e,"PROC_TITLE",{hash:{},data:t}))}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u="function",a=this.escapeExpression,f=this;s+="<div class='ops-process ",o=n["if"].call(t,t&&t.progress,{hash:{},inverse:f.noop,fn:f.program(1,l,i),data:i});if(o||o===0)s+=o;s+='\'>\n  <section class="processing-wrap">\n    <header class="processing">',o=n["if"].call(t,t&&t.title,{hash:{},inverse:f.program(5,h,i),fn:f.program(3,c,i),data:i});if(o||o===0)s+=o;return s+='<span class="process-info">'+a((o=t&&t.progress,typeof o===u?o.apply(t):o))+'%</span></header>\n    <header class="processing rolling-back-content">'+a(n.i18n.call(t,"PROP.ROLLING_BACK",{hash:{},data:i}))+'</header>\n    <section class="loading-spinner"></section>\n    <section class="progress">\n        <div class="bar" style="width:'+a((o=t&&t.progress,typeof o===u?o.apply(t):o))+'%;"></div>\n    </section>\n  </section>\n\n  <section class="success hide">\n    <p class="title">'+a(n.i18n.call(t,"PROC_RLT_DONE_TITLE",{hash:{},data:i}))+'</p>\n    <p class="sub-title">'+a(n.i18n.call(t,"PROC_RLT_DONE_SUB_TITLE",{hash:{},data:i}))+'</p>\n  </section>\n\n  <section class="fail hide error-info-block">\n    <header>'+a(n.i18n.call(t,"PROC_FAILED_TITLE",{hash:{},data:i}))+' <button class="btn btn-silver btn-close-process">'+a(n.i18n.call(t,"PROC_CLOSE_TAB",{hash:{},data:i}))+'</button></header>\n    <div class="result-error-info">\n      <p class="title">'+a(n.i18n.call(t,"PROC_RLT_FAILED_SUB_TITLE",{hash:{},data:i}))+'</p>\n      <p class="detail"></p>\n    </div>\n  </section>\n</div>',s},n.frame=e.template(t),t=function(e,t,n,r,i){function a(e,t){return'<li><div class="pdr-3"></div><div class="pdr-2"></div></li>'}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u=this;s+='<section class="process-detail">\n  <header><div class="pdr-3">STATUS</div><div class="pdr-1">#</div><div class="pdr-2">TASK</div></header>\n  <ul>',o=n.each.call(t,t,{hash:{},inverse:u.noop,fn:u.program(1,a,i),data:i});if(o||o===0)s+=o;return s+="</ul>\n</section>",s},n.detailFrame=e.template(t),n}),define("wspace/progress/ProgressViewer",["OpsModel","Workspace","./PVTpl"],function(e,t,n){var r;return r=Backbone.View.extend({events:{"click .btn-close-process":"close"},initialize:function(t){var r;this.listenTo(this.model,"destroy",this.updateState),this.listenTo(this.model,"change:state",this.updateState),this.listenTo(this.model,"change:progress",this.updateProgress),r={progress:this.model.get("progress")},this.model.testState(e.State.Initializing)||(r.title=this.model.getStateDesc()+" your app..."),this.setElement($(n.frame(r)).appendTo(t.workspace.scene.spaceParentElement()))},switchToDone:function(){var e;this.$el.find(".success").show(),this.$el.find(".process-detail").hide(),e=this,setTimeout(function(){e.$el.find(".processing-wrap").addClass("fadeout"),e.$el.find(".success").addClass("fadein")},10),setTimeout(function(){return e.trigger("done")},2e3)},updateState:function(){switch(this.model.get("state")){case e.State.Running:case e.State.Stopped:this.__awake?this.switchToDone():this.done=!0;break;case e.State.RollingBack:this.$el.toggleClass("rolling-back",!0);break;case e.State.Destroyed:if(this.done){this.close();return}this.$el.children().hide(),this.$el.find(".fail").show(),this.$el.find(".process-detail").show(),this.$el.find(".detail").html(this.model.get("opsActionError").replace(/\n/g,"<br/>"));break;default:void 0}},updateProgress:function(){var e;this.$el.toggleClass("has-progess",!0),e=""+this.model.get("progress")+"%",this.$el.find(".process-info").text(e),this.$el.find(".bar").css({width:e}),this.updateDetail()},updateDetail:function(){var e,t,r,i,s,o,u,a,f,l,c,h;s=App.model.notifications().get(this.model.id);if(!s){u=this,App.model.notifications().once("add",function(){return u.updateDetail()});return}o=s.raw(),t=this.$el.children(".process-detail"),t.length===0&&(t=$(n.detailFrame(o.step||[])).appendTo(this.$el)),e=t.children("ul").children(),o.state==="Rollback"?r={done:"pdr-3 done icon-success",running:"pdr-3 rolling icon-pending",pending:"pdr-3 rolledback icon-warning"}:r={done:"pdr-3 done icon-success",running:"pdr-3 running icon-pending",pending:"pdr-3 pending"},h=o.step;for(i=l=0,c=h.length;l<c;i=++l){a=h[i];if(a.length<5)continue;f=a[2]+" "+a[4],a[3]&&(f+=" ("+a[3]+")"),e.eq(i).children(".pdr-2").text(f),e.eq(i).children(".pdr-3").attr("class",r[a[1]])}},close:function(){return this.trigger("close")},awake:function(){this.$el.show(),this.__awake=!0,this.done&&(this.done=!1,this.switchToDone())},sleep:function(){this.$el.hide(),this.__awake=!1}}),t.extend({type:"ProgressViewer",isWorkingOn:function(e){return this.opsModel()===e.opsModel},tabClass:function(){return"icon-app-pending"},title:function(){return this.opsModel().get("name")+" - app"},url:function(){return this.opsModel().relativeUrl()},constructor:function(e){if(!e.opsModel)throw new Error("Cannot find opsmodel while openning workspace.");t.apply(this,arguments)},initialize:function(){var e;this.view=new r({model:this.opsModel(),workspace:this}),this.listenTo(this.opsModel(),"change:id",function(){this.updateUrl()}),e=this,this.view.on("close",function(){return e.remove()}),this.view.on("done",function(){e.remove(),App.loadUrl(e.opsModel().url())})},opsModel:function(){return this.get("opsModel")},awake:function(){return this.view.awake()},sleep:function(){return this.view.sleep()}},{canHandle:function(t){return t.opsModel?t.opsModel.testState(e.State.Saving)||t.opsModel.testState(e.State.Terminating)||t.opsModel.testState(e.State.Removing)?(void 0,!1):t.opsModel.isApp()&&t.opsModel.isProcessing():!1}})});