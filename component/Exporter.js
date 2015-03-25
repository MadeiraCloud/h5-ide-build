/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

define("component/exporter/Download",[],function(){if(typeof e!="function"&&typeof e!="object"||typeof URL=="undefined")if(typeof e!="function"&&typeof e!="object"||typeof webkitURL=="undefined")var e=function(e){var t=e.BlobBuilder||e.WebKitBlobBuilder||e.MozBlobBuilder||e.MSBlobBuilder||function(e){var t=function(e){return Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1]},n=function(){this.data=[]},r=function(t,n,r){this.data=t,this.size=t.length,this.type=n,this.encoding=r},i=n.prototype,s=r.prototype,o=e.FileReaderSync,u=function(e){this.code=this[this.name=e]},a="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),f=a.length,l=e.URL||e.webkitURL||e,c=l.createObjectURL,h=l.revokeObjectURL,p=l,d=e.btoa,v=e.atob,m=e.ArrayBuffer,g=e.Uint8Array;r.fake=s.fake=!0;while(f--)u.prototype[a[f]]=f+1;return l.createObjectURL||(p=e.URL={}),p.createObjectURL=function(e){var t=e.type,n;t===null&&(t="application/octet-stream");if(e instanceof r)return n="data:"+t,e.encoding==="base64"?n+";base64,"+e.data:e.encoding==="URI"?n+","+decodeURIComponent(e.data):d?n+";base64,"+d(e.data):n+","+encodeURIComponent(e.data);if(c)return c.call(l,e)},p.revokeObjectURL=function(e){e.substring(0,5)!=="data:"&&h&&h.call(l,e)},i.append=function(e){var n=this.data;if(g&&(e instanceof m||e instanceof g)){var i="",s=new g(e),a=0,f=s.length;for(;a<f;a++)i+=String.fromCharCode(s[a]);n.push(i)}else if(t(e)==="Blob"||t(e)==="File"){if(!o)throw new u("NOT_READABLE_ERR");var l=new o;n.push(l.readAsBinaryString(e))}else e instanceof r?e.encoding==="base64"&&v?n.push(v(e.data)):e.encoding==="URI"?n.push(decodeURIComponent(e.data)):e.encoding==="raw"&&n.push(e.data):(typeof e!="string"&&(e+=""),n.push(unescape(encodeURIComponent(e))))},i.getBlob=function(e){return arguments.length||(e=null),new r(this.data.join(""),e,"raw")},i.toString=function(){return"[object BlobBuilder]"},s.slice=function(e,t,n){var i=arguments.length;return i<3&&(n=null),new r(this.data.slice(e,i>1?t:this.data.length),n,this.encoding)},s.toString=function(){return"[object Blob]"},n}(e);return function(n,r){var i=r?r.type||"":"",s=new t;if(n)for(var o=0,u=n.length;o<u;o++)s.append(n[o]);return s.getBlob(i)}}(window);else(self||window).URL=webkitURL;(function(t){var n=t.Uint8Array,r=t.HTMLCanvasElement,i=/\s*;\s*base64\s*(?:;|$)/i,s,o=function(e){var t=e.length,r=new n(t/4*3|0),i=0,o=0,u=[0,0],a=0,f=0,l,c,h;while(t--)c=e.charCodeAt(i++),l=s[c-43],l!==255&&l!==h&&(u[1]=u[0],u[0]=c,f=f<<6|l,a++,a===4&&(r[o++]=f>>>16,u[1]!==61&&(r[o++]=f>>>8),u[0]!==61&&(r[o++]=f),a=0));return r.buffer};n&&(s=new n([62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51])),r&&!r.prototype.toBlob&&(r.prototype.toBlob=function(t,r){r||(r="image/png");if(this.mozGetAsFile){t(this.mozGetAsFile("canvas",r));return}var s=Array.prototype.slice.call(arguments,1),u=this.toDataURL.apply(this,s),a=u.indexOf(","),f=u.substring(a+1),l=i.test(u.substring(0,a)),c;e.fake?(c=new e,l?c.encoding="base64":c.encoding="URI",c.data=f,c.size=f.length):n&&(l?c=new e([o(f)],{type:r}):c=new e([decodeURIComponent(f)],{type:r})),t(c,u)})})(window);var t=typeof navigator!="undefined"&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(e){var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=e.URL||e.webkitURL||e,i=t.createElementNS("http://www.w3.org/1999/xhtml","a"),s=!e.externalHost&&"download"in i,o=function(n){var r=t.createEvent("MouseEvents");r.initMouseEvent("click",!0,!1,e,0,0,0,0,0,!1,!1,!1,!1,0,null),n.dispatchEvent(r)},u=e.webkitRequestFileSystem,a=e.requestFileSystem||u||e.mozRequestFileSystem,f=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},l="application/octet-stream",c=0,h=[],p=function(){var e=h.length;while(e--){var t=h[e];typeof t=="string"?r.revokeObjectURL(t):t.remove()}h.length=0},d=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var i=e["on"+t[r]];if(typeof i=="function")try{i.call(e,n||e)}catch(s){f(s)}}},v=function(r,o){var f=this,p=r.type,v=!1,m,g,y=function(){var e=n().createObjectURL(r);return h.push(e),e},b=function(){d(f,"writestart progress write writeend".split(" "))},w=function(){if(v||!m)m=y(r);g?g.location.href=m:window.open(m,"_blank"),f.readyState=f.DONE,b()},E=function(e){return function(){if(f.readyState!==f.DONE)return e.apply(this,arguments)}},S={create:!0,exclusive:!1},x;f.readyState=f.INIT,o||(o="download");if(s){m=y(r),t=e.document,i=t.createElementNS("http://www.w3.org/1999/xhtml","a"),i.href=m,i.download=o;var T=t.createEvent("MouseEvents");T.initMouseEvent("click",!0,!1,e,0,0,0,0,0,!1,!1,!1,!1,0,null),i.dispatchEvent(T),f.readyState=f.DONE,b();return}e.chrome&&p&&p!==l&&(x=r.slice||r.webkitSlice,r=x.call(r,0,r.size,l),v=!0),u&&o!=="download"&&(o+=".download");if(p===l||u)g=e;if(!a){w();return}c+=r.size,a(e.TEMPORARY,c,E(function(e){e.root.getDirectory("saved",S,E(function(e){var t=function(){e.getFile(o,S,E(function(e){e.createWriter(E(function(t){t.onwriteend=function(t){g.location.href=e.toURL(),h.push(e),f.readyState=f.DONE,d(f,"writeend",t)},t.onerror=function(){var e=t.error;e.code!==e.ABORT_ERR&&w()},"writestart progress write abort".split(" ").forEach(function(e){t["on"+e]=f["on"+e]}),t.write(r),f.abort=function(){t.abort(),f.readyState=f.DONE},f.readyState=f.WRITING}),w)}),w)};e.getFile(o,{create:!1},E(function(e){e.remove(),t()}),E(function(e){e.code===e.NOT_FOUND_ERR?t():w()}))}),w)}),w)},m=v.prototype,g=function(e,t){return new v(e,t)};return m.abort=function(){var e=this;e.readyState=e.DONE,d(e,"abort")},m.readyState=m.INIT=0,m.WRITING=1,m.DONE=2,m.error=m.onwritestart=m.onprogress=m.onwrite=m.onabort=m.onerror=m.onwriteend=null,e.addEventListener("unload",p,!1),g}(window);return t}),define("ThumbnailUtil",["UI.canvg","component/exporter/Download"],function(){var e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v;return t=void 0,r=void 0,e=void 0,n=void 0,o=function(e){var n,r,i;return r=e.canvas.clientWidth||e.canvas.width,n=e.canvas.clientHeight||e.canvas.height,i=e.fillStyle,e.fillStyle=e.createPattern(t,"repeat"),e.fillRect(0,54,r,n-54),e.fillStyle=i,null},v=function(e){var t,n,i,s,o;return n=e.canvas.clientWidth||e.canvas.width,t=e.canvas.clientHeight||e.canvas.height,n>1500&&(n=1500),t>1e3&&(n=1e3),s=228/n,o=150/t,i=s<=o?o:s,e.canvas.width=228,e.canvas.height=150,e.fillStyle=e.createPattern(r,"repeat"),e.fillRect(0,0,n,t),e.scale(i,i),null},l=function(){var t,n,r,i,s;n=$("#svgDefs")[0].cloneNode(!0),n.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),$("#ExportPngWrap").append(n),s=n.children||n.childNodes;for(r=0,i=s.length;r<i;r++){t=s[r];if(!t.tagName)continue;a(t,[],!0)}e=(new XMLSerializer).serializeToString(n).replace(/^<svg[^>]+>/,"").replace(/<\/svg>$/,"").replace(/(fill:rgb\(0, 0, 0\)|stroke:none);?/g,"")},u=function(i,s){var u,f,c,h,p,d,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M;if(!s.onFinish)return;u=$("#ExportPngWrap"),u.length||(u=$("<div id='ExportPngWrap'></div>").appendTo("body").hide()),t||(t=document.createElement("img"),t.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAHUlEQVQYV2P48ePHf9yAgabSHz9+/I4bENI9gNIA0iYpJd74eOIAAAAASUVORK5CYII=",r=document.createElement("img"),r.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAMAAABh9kWNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF9fX1////0eouzwAAABRJREFUeNpiYGBkZGBkYABhgAADAAApAAUR1P0IAAAAAElFTkSuQmCC",l()),m=i[0].cloneNode(!0),S=i[0].getBBox(),m.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),u.append(m),w=[m],d=m.children||m.childNodes;for(N=0,L=d.length;N<L;N++){p=d[N];if(!p.tagName)continue;a(p,w)}for(C=0,A=w.length;C<A;C++)p=w[C],p.remove?p.remove():p.parentNode.removeChild(p);b={x:0,y:0};if(s.isExport){b={x:S.width,y:S.height},M=i[0].children||i[0].childNodes;for(k=0,O=M.length;k<O;k++){p=M[k];if(!p.tagName||p.tagName.toLowerCase()!=="g")continue;f=p.getBBox();if(f.x+f.y+f.width+f.height===0)continue;f.x<b.x&&(b.x=f.x),f.y<b.y&&(b.y=f.y)}b.x=Math.floor(b.x/10)*10-30,b.y=Math.floor(b.y/10)*10-30}return E=document.createElementNS("http://www.w3.org/2000/svg","g"),E.textContent="PLACEHOLDER",m.insertBefore(E,d[0]),x=(new XMLSerializer).serializeToString(m),g=e,s.isExport&&(n===void 0&&(n=x.indexOf("xlink:href")===-1?"href":"xlink:href"),T="",y="",s.drawInfo!==!1&&(T=MC.dateFormat(new Date,"yyyy-MM-dd hh:mm:ss"),y=s.name),x=x.replace("</svg>","</g></svg>"),g+="<g transform='translate("+ -b.x+" "+(54-b.y)+")'>\n<g transform='translate("+b.x+" "+(b.y-54)+")'>\n  <rect fill='#383975' width='100%' height='54' y='0'></rect>\n  <image "+n+"='/assets/images/ide/logo-t.png?v=2' x='10' y='11' width='116' height='35'></image>\n  <text x='100%' y='40' fill='#fff' text-anchor='end' transform='translate(-10 0)'>"+T+"</text>\n  <text x='100%' y='24' fill='#fff' text-anchor='end' transform='translate(-10 0)'>"+y+"</text>\n</g>"),x=x.replace("<g>PLACEHOLDER</g>",g),S={width:S.width+60,height:S.height+60},s.isExport?(S.height+=54,S.width<360&&(S.width=360),S.height<380&&(S.height=380),c=o):c=v,h=document.createElement("canvas"),h.width=S.width,h.height=S.height,canvg(h,x,{beforeRender:c,afterRender:function(){var e;return e=s.onFinish,s.onFinish=null,s.createBlob===!0?h.toBlob(function(t,n){return typeof n=="string"?s.image=n:s.image=h.toDataURL(),s.blob=t,e(s)}):(s.image=h.toDataURL(),e(s))}})},d=function(e,t){return e.classList?e.classList.contains(t):(e.getAttribute("class")||"").indexOf(t)!==-1},a=function(e,t,n){var r,i,s,o,u,f,l,c,h,p;c=e.tagName.toLowerCase(),i=e.children||e.childNodes;switch(c){case"g":o=i.length===0;break;case"path":o=d(e,"fill-line");break;case"rect":o=d(e,"group-resizer")}if(o)return t.push(e);f=window.getComputedStyle(e);if(f.visibility==="hidden"||f.display==="none"||f.opacity==="0")return t.push(e);u=[],""+f.opacity!="1"&&u.push("opacity:"+f.opacity),c!=="g"&&c!=="image"&&c!=="defs"&&(s=""+f.fillOpacity,!n&&(s==="0"||f.fill.match(/rgba\([^)]+0\)/))?u.push("fill:none"):(f.fill!=="#000000"&&u.push("fill:"+f.fill),s!=="1"&&u.push("fill-opacity:"+f.fillOpacity)),l=(f.strokeWidth+"").replace("px",""),s=""+f.strokeOpacity,!!n||""+f.strokeWidth!="0"&&s!=="0"?(u.push("stroke:"+f.stroke),l!=="1"&&u.push("stroke-width:"+f.strokeWidth),s!=="1"&&u.push("stroke-opacity:"+f.strokeOpacity)):u.push("stroke:none"),f.strokeLinejoin!=="miter"&&u.push("stroke-linejoin:"+f.strokeLinejoin),f.strokeDasharray!=="none"&&u.push("stroke-dasharray:"+f.strokeDasharray),c==="text"&&(f.fontSize!=="14px"&&u.push("font-size:"+f.fontSize),f.textAnchor!=="start"&&u.push("text-anchor:"+f.textAnchor))),u.length&&e.setAttribute("stylez",u.join(";"));for(h=0,p=i.length;h<p;h++){r=i[h];if(!r.tagName)continue;a(r,t,n),r.removeAttribute("data-id"),r.removeAttribute("data-tooltip")}return null},p=function(e){var t,n,r,i;return n=localStorage.getItem("thumbnails")||"",t=""+e.id+",",i=n.indexOf(t),i===-1?localStorage.length>300&&(r=n.indexOf(","),localStorage.removeItem("tn/"+n.substring(0,r)),n=n.substring(r)):n=n.replace(t,""),localStorage.setItem("thumbnails",n+t),localStorage.setItem("tn/"+e.id,e.image),null},s=function(e,t){var n;return n=Q.defer(),u(e,{size:t,onFinish:function(e){return n.resolve(e.image||"")}}),n.promise},h=function(e,t,n){if(!t)return;typeof t=="string"?p({id:e,image:t}):u(t,{id:e,size:n,onFinish:p})},f=function(e){return localStorage.getItem("tn/"+e)},c=function(e){var t;if(!e)return;return t=localStorage.getItem("thumbnails")||"",localStorage.setItem("thumbnails",t.replace(""+e+",","")),localStorage.removeItem("tn/"+e),null},i=function(e){var t,n,r,i,s,o,u,a,f,l,c,h;o={};for(u=0,l=e.length;u<l;u++)r=e[u],o[r]=!0;i=(localStorage.getItem("thumbnails")||"").split(","),s=[],e=[];for(a=0,c=i.length;a<c;a++){n=i[a];if(!n)continue;o[n]?e.push(n):s.push(n)}if(s.length){e.length&&(t=e.join(",")+","),localStorage.setItem("thumbnails",t||"");for(f=0,h=s.length;f<h;f++)n=s[f],localStorage.removeItem("tn/"+n);void 0}return null},{exportPNG:u,generate:s,save:h,fetch:f,remove:c,cleanup:i}}),define("JsonExporter",["component/exporter/Download","i18n!/nls/lang.js","crypto"],function(e,t){var n,r,i,s,o;return n=function(){return String.fromCharCode.apply(String,arguments)},o=n(77,97,100,101,105,114,97,67,108,111,117,100,73,68,69),r=function(t,n){var r,i,s,u,a,f,l;l=["description","history","id","key","property","state","username"];for(a=0,f=l.length;a<f;a++)i=l[a],delete t[i];return t.signature=CryptoJS.HmacMD5(JSON.stringify(t),o).toString(),u=4,u=void 0,s=JSON.stringify(t,void 0,u),$("body").hasClass("safari")?r=null:r=new Blob([s]),r?(e(r,n),null):{data:"data:text/plain;,"+s,name:n}},s=function(e){var n,r,i;try{r=JSON.parse(e),delete r._id}catch(s){return n=s,t.IDE.POP_IMPORT_FORMAT_ERROR}return i=r.signature,delete r.signature,r},i=function(t,n,r){var i,s,o;return s=4,s=void 0,i=JSON.stringify(n,void 0,s),o=window.navigator.userAgent,o.indexOf("Safari")>-1&&o.indexOf("Chrome")===-1?$(t).attr({href:"data:text/plain;,"+i,target:"_blank"}):$(t).off("click.export").on("click.export",function(){return e(new Blob([i]),r),null}),null},{exportJson:r,importJson:s,download:e,genericExport:i}}),define("component/Exporter",function(){});