/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */

(function(e){function t(e){return e}function n(e){return decodeURIComponent(e.replace(i," "))}function r(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return s.json?JSON.parse(e):e}catch(t){}}var i=/\+/g,s=e.cookie=function(i,o,u){if(void 0!==o){u=e.extend({},s.defaults,u);if("number"==typeof u.expires){var a=u.expires,f=u.expires=new Date;f.setDate(f.getDate()+a)}return o=s.json?JSON.stringify(o):String(o),document.cookie=[s.raw?i:encodeURIComponent(i),"=",s.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("")}o=s.raw?t:n,u=document.cookie.split("; ");for(var a=i?void 0:{},f=0,l=u.length;f<l;f++){var c=u[f].split("="),h=o(c.shift()),c=o(c.join("="));if(i&&i===h){a=r(c);break}i||(a[h]=r(c))}return a};s.defaults={},e.removeCookie=function(t,n){return void 0!==e.cookie(t)?(e.cookie(t,"",e.extend({},n,{expires:-1})),!0):!1}})(jQuery);