define(["handlebars"],function(e){var t=function(e,t,n,r,i){return this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{},'<div id="jsonViewer" style=\'width:46%;height:70%;top:2%;left:2%;z-index:94;box-shadow:rgba(0, 0, 0, 0.3) 0px 5px 30px;position:absolute;min-width:540px;\'>\r\n\r\n<div class="modal-header"> <h3>Data viewer</h3> <i class="modal-close">×</i> </div>\r\n<div id="diffWrap">\r\n  <div class="diffInputs clearfix">\r\n    <input type="text" id="diffSearch" class="diffInput" placeholder="uid | type | name">\r\n    <select id="diffTypeSelect" class="diffInput">\r\n      <option value=".">All</option>\r\n    </select>\r\n    <button class="icon-refresh tooltip diffInput" id="diffRefresh" data-tooltip="Reload CanvasData"></button>\r\n  </div>\r\n  <div id="diffInnerWrap">\r\n    <div class="jsondiffContainer" id="jsonCompContainer"></div>\r\n    <div class="jsondiffContainer" id="jsonLayoutContainer"></div>\r\n    <div class="jsondiffContainer" id="jsonAttrContainer"></div>\r\n  </div>\r\n</div>\r\n\r\n</div>\r\n'};return e.template(t)});