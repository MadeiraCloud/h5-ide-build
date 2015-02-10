define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"content-wrap\" style=\"position:relative;\">\n  <div id=\"ami-search-option\">\n    <div>\n      <input id=\"community-ami-input\" class=\"input\" type=\"text\" placeholder=\"";
  stack1 = helpers.i18n.call(depth0, "AMI_LBL_ALL_SEARCH_AMI_BY_NAME_OR_ID", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" />\n    </div>\n\n    <div id=\"selectbox-ami-platform\" class=\"selectbox\">\n      <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ALL_PLATFORMS", {hash:{},data:data}))
    + "</div>\n      <ul class=\"dropdown\" tabindex=\"-1\">\n        <li class=\"item selected\" data-id=\"\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ALL_PLATFORMS", {hash:{},data:data}))
    + "</li>\n        <li class=\"item\" data-id=\"amazonlinux\"> <span class=\"icon-ami-os amz-linux\">Amazon Linux</span> </li>\n        <li class=\"item\" data-id=\"centos\"> <span class=\"icon-ami-os centos\">Cent OS</span> </li>\n        <li class=\"item\" data-id=\"debian\"> <span class=\"icon-ami-os debian\">Debian</span> </li>\n        <li class=\"item\" data-id=\"fedora\"> <span class=\"icon-ami-os fedora\">Fedora</span> </li>\n        <li class=\"item\" data-id=\"gentoo\"> <span class=\"icon-ami-os gentoo\">Gentoo</span> </li>\n        <li class=\"item\" data-id=\"opensuse\"><span class=\"icon-ami-os opensuse\">OpenSUSE</span> </li>\n        <li class=\"item\" data-id=\"ubuntu\"> <span class=\"icon-ami-os ubuntu\">Ubuntu</span> </li>\n        <li class=\"item\" data-id=\"redhat\"> <span class=\"icon-ami-os redhat\">Red Hat</span> </li>\n        <li class=\"item\" data-id=\"windows\"><span class=\"icon-ami-os windows\">Windows</span> </li>\n        <li class=\"item\" data-id=\"otherlinux\"> <span class=\"icon-ami-os linux-other\">Other Linux</span> </li>\n      </ul>\n    </div>\n\n    <div class=\"ami-option-group\">\n      <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_VISIBILITY", {hash:{},data:data}))
    + "</h5>\n      <div class=\"ami-option-wrap\" id=\"filter-ami-type\">\n        <button type=\"button\" class=\"btn active\" data-value=\"true\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_PUBLIC", {hash:{},data:data}))
    + "</button>\n        <button type=\"button\" class=\"btn\" data-value=\"false\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_PRIVATE", {hash:{},data:data}))
    + "</button>\n      </div>\n    </div>\n\n    <div class=\"ami-option-group\">\n      <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ARCHITECTURE", {hash:{},data:data}))
    + "</h5>\n      <div class=\"ami-option-wrap\" id=\"filter-ami-32bit-64bit\">\n        <button type=\"button\" class=\"btn active\" data-value=\"32-bit\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_32_BIT", {hash:{},data:data}))
    + "</button>\n        <button type=\"button\" class=\"btn\" data-value=\"64-bit\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_64_BIT", {hash:{},data:data}))
    + "</button>\n      </div>\n    </div>\n\n    <div class=\"ami-option-group\">\n      <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ROOT_DEVICE_TYPE", {hash:{},data:data}))
    + "</h5>\n      <div class=\"ami-option-wrap\" id=\"filter-ami-EBS-Instance\">\n        <button type=\"button\" class=\"btn active\" data-value=\"EBS\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_EBS", {hash:{},data:data}))
    + "</button>\n        <button type=\"button\" class=\"btn\" data-value=\"Instance Store\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_INSTANCE_STORE", {hash:{},data:data}))
    + "</button>\n      </div>\n    </div>\n\n    <div id=\"btn-search-ami\" class=\"btn btn-blue\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_SEARCHING", {hash:{},data:data}))
    + "</div>\n  </div>\n\n  <div id=\"ami-data-wrap\">\n    <div id=\"ami-table-wrap\" class=\"table-head-fix\">\n      <table class=\"table-head\">\n        <thead>\n        <tr>\n          <th style=\"width: 44px;\"></th>\n          <th style=\"width: 104px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_AMI_ID", {hash:{},data:data}))
    + "</th>\n          <th>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_AMI_NAME", {hash:{},data:data}))
    + "</th>\n          <th style=\"width: 62px;padding-left:4px;text-align:left;\" class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_SIZE", {hash:{},data:data}))
    + "</th>\n        </tr>\n        </thead>\n      </table>\n      <div class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"show-loading\">\n          <div class=\"loading-spinner\"></div>\n        </div>\n        <div class=\"scroll-content\" style=\"display:block;\">\n          <table class=\"table\">\n            <thead>\n            <tr>\n              <th style=\"width: 16px;\"><div class=\"th-inner\"></div></th>\n              <th style=\"width: 80px;\"><div class=\"th-inner\"></div></th>\n              <th><div class=\"th-inner\"></div></th>\n              <th style=\"width: 42px;\"><div class=\"th-inner\"></div></th>\n            </tr>\n            </thead>\n            <tbody id=\"community_ami_table\"></tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"community-ami-page\">\n      <div class=\"page-tip\" style=\"display: none;\"></div>\n      <div class=\"pagination\" style=\"display: none;\">\n        <a href=\"#\" class=\"previous\" data-action=\"previous\">&lsaquo;</a>\n        <input type=\"text\" readonly=\"readonly\" data-max-page=\"40\" />\n        <a href=\"#\" class=\"next\" data-action=\"next\">&rsaquo;</a>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  };
TEMPLATE.dialog=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <td><div class=\"toggle-fav ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.faved), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_TOGGLE_FAVORITE", {hash:{},data:data}))
    + "\"></div></td>\n  <td>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n  <td>\n    <span class=\"ami-table-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <div class=\"ami-meta "
    + escapeExpression(((stack1 = (depth0 && depth0.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-ami-os\"> ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.isPublic), "true", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " | "
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " | "
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  </td>\n  <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "fav";
  }

function program4(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "AMI_TYPE_PUBLIC", {hash:{},data:data}));
  }

function program6(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "AMI_TYPE_PRIVATE", {hash:{},data:data}));
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.amiItem=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });