define(["CanvasPopup","./TplPopup","constant","CloudResources"],function(e,t,n,r){return e.extend({type:"VolumePopup",events:{"mousedown li":"clickVolume"},closeOnBlur:!0,initialize:function(){var t,n,r,i,s;e.prototype.initialize.apply(this,arguments),this.host&&this.listenTo(this.host,"change:volume",this.render),t=this.models||[];if(t[0]&&t[0].get){s=this.models;for(r=0,i=s.length;r<i;r++)n=s[r],this.listenTo(n,"change:name",this.updateVolume),this.listenTo(n,"change:size",this.updateVolume)}this.selectAtBegin&&this.clickVolume({currentTarget:this.$el.find("[data-id="+this.selectAtBegin.id+"]")[0]})},migrate:function(e){var t;t=e.$el.find(".selected").attr("data-id"),this.$el.find('[data-id="'+t+'"]').addClass("selected")},updateVolume:function(e){var t;t=this.$el.find("[data-id="+e.id+"]"),t.children(".vpp-name").text(e.get("name")),t.children(".vpp-size").text(e.get("size")+"GB")},render:function(){var t;e.prototype.render.apply(this,arguments),this.selected&&(t=this.selected.getAttribute("data-id"),this.clickVolume({currentTarget:this.$el.find("[data-id="+t+"]")[0]}))},content:function(){var e,n,i,s,o,u,a;i=this.models||[];if(i[0]&&i[0].get){i=[],a=this.host.volumes();for(o=0,u=a.length;o<u;o++)s=a[o],n=s.get("appId"),i.push({id:s.get("id"),appId:n,name:s.get("name"),size:s.get("size"),snapshot:s.get("snapshot")}),n&&(e=r(s.type,s.design().region()).get(n),_.last(i).state=(e!=null?e.get("status"):void 0)||"unknown")}return t.volume(i)},clickVolume:function(e){var t,n;if(this.selected===e.currentTarget)return;return t=$(e.currentTarget).addClass("selected"),n=t.attr("data-id"),this.canvas.selectVolume(n),this.selected&&$(this.selected).removeClass("selected"),this.selected=e.currentTarget,!this.canvas.design.modeIsApp()&&e.which===1&&t.dnd(e,{dropTargets:this.canvas.$el,dataTransfer:{id:n},eventPrefix:"addVol_"}),!1},remove:function(){this.canvas.selectVolume(null),e.prototype.remove.call(this)}})});