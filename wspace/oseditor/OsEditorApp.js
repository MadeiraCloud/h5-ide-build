var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var n in t)__hasProp.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};define(["CoreEditorApp","./OsViewApp","./model/DesignOs","OpsModel","CloudResources","constant"],function(e,t,n,r,i,s){var o;return o=function(e){function r(){return r.__super__.constructor.apply(this,arguments)}return __extends(r,e),r.prototype.viewClass=t,r.prototype.designClass=n,r.prototype.fetchData=function(){var e,t,n;return t=this,e=this.opsModel.get("region"),n=this.opsModel.getJsonData().agent.module,Q.all([App.model.fetchStateModule(n.repo,n.tag),i(s.RESTYPE.OSFLAVOR,e).fetch(),i(s.RESTYPE.OSIMAGE,e).fetch(),i(s.RESTYPE.OSKP,e).fetch(),i(s.RESTYPE.OSIMAGE,e).fetch(),i(s.RESTYPE.OSNETWORK,e).fetch(),i(s.RESTYPE.OSVOL,e).fetch(),this.loadVpcResource()])},r}(e),o});