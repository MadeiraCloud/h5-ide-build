define(["handlebars"],function(e){var t=function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o=this.escapeExpression;return s+='\r\n<div id="reset-form-wrap" class="box-wrapper">\r\n	<div class="box-header">\r\n		<h2>'+o(n.i18n.call(t,"reset",{hash:{},data:i}))+'</h2>\r\n	</div>\r\n	<form id="reset-form" method="post" action="" class="box-body">\r\n		<div id="password-verification-status" class="verification-status"></div>\r\n		<label for="reset-pw" class="account-label">'+o(n.i18n.call(t,"reset-new-password",{hash:{},data:i}))+'</label>\r\n		<input autocomplete="off" name="password" class="account-input" type="password" id="reset-pw">\r\n\r\n		<div class="account-btn-wrap">\r\n			<input class="btn btn-primary btn-large account-btn" id="reset-password" type="submit" value="'+o(n.i18n.call(t,"reset-done-btn",{hash:{},data:i}))+'">\r\n		</div>\r\n	</form>\r\n</div>',s};return e.template(t)});