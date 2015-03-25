define(["ComplexResModel","constant","Design","i18n!/nls/lang.js"],function(e,t,n,r){var i;return i=e.extend({type:t.RESTYPE.OSVOL,newNameTmpl:"volume",defaults:{size:1,bootable:!1},constructor:function(t,n){var r;t.owner&&(r=t.owner,delete t.owner),e.call(this,t,n),this.attachTo(r,t.mountPoint)},getOwner:function(){return this.connectionTargets("OsVolumeUsage")[0]},attachTo:function(e,t){var r,i;if(e){t?i=t:i=this.getMountPoint(e);if(!i)return!1;this.set("mountPoint",i),r=n.modelClassForType("OsVolumeUsage"),new r(this,e)}},getMountPoint:function(e){var t,n,i;return t=e.getImage(),i=e.volumes(),t?(void 0,n=null,t.os_distro!=="windows"?n=["f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]:n=["f","g","h","i","j","k","l","m","n","o","p"],$.each(i||[],function(e,t){var r,i;if(t.get("mountPoint").slice(0,5)==="/dev/"){i=t.get("mountPoint").slice(-1),r=n.indexOf(i);if(r>=0)return n.splice(r,1)}}),n.length===0?(notification("warning",r.NOTIFY.WARN_ATTACH_VOLUME_REACH_INSTANCE_LIMIT,!1),null):(t.os_distro!=="windows"?n="/dev/sd"+n[0]:n="xvd"+n[0],n)):(ami_info||notification("warning",sprintf(r.NOTIFY.WARN_AMI_NOT_EXIST_TRY_USE_OTHER,imageId),!1),null)},serialize:function(){return{component:{name:this.get("name"),type:this.type,uid:this.id,resource:{id:this.get("appId"),name:this.get("name"),snapshot_id:this.get("snapshot"),size:this.get("size"),mount_point:this.get("mountPoint"),bootable:this.get("bootable"),server_id:this.connectionTargets("OsVolumeUsage")[0].createRef("id"),display_description:this.get("description"),display_name:this.get("name")}}}}},{handleTypes:t.RESTYPE.OSVOL,deserialize:function(e,t,n){new i({id:e.uid,name:e.resource.display_name,appId:e.resource.id,snapshot:e.resource.snapshot_id,size:e.resource.size,mountPoint:e.resource.mount_point,bootable:e.resource.bootable,owner:n(MC.extractID(e.resource.server_id)),description:e.resource.display_description})}}),i});