(function(){define(["event","./template","./success","i18n!nls/lang.js","UI.notification","backbone","jquery","handlebars"],function(e,t,n,r){var i;return i=Backbone.View.extend({el:"#main-body",template:t,success_tmpl:n,is_submit:!1,events:{"blur  #register-username":"verificationUser","keyup #register-username":"_checkButtonDisabled","blur  #register-email":"verificationEmail","keyup #register-email":"_checkButtonDisabled","blur #register-password":"verificationPassword","keyup #register-password":"_checkButtonDisabled","submit #register-form":"submit","click #register-get-start":"loginEvent"},initialize:function(){},render:function(e){void 0,void 0;switch(e){case"normal":return this.$el.html(this.template(this.model));default:return this.$el.html(this.template(this.model))}},verificationUser:function(e){var t,n;return void 0,n=$("#register-username").val(),t=$("#username-verification-status"),n.trim()!==""?/[^A-Za-z0-9\_]{1}/.test(n)!==!0?n.trim().length>40?(t.addClass("error-status").removeClass("verification-status").show().text(r.register.username_maxlength),!1):(t.removeClass("error-status").removeClass("verification-status").show().text(""),this.trigger("CHECK_REPEAT",n,null),!0):(t.addClass("error-status").removeClass("verification-status").show().text(r.register.username_not_matched),!1):(t.addClass("error-status").removeClass("verification-status").show().text(r.register.username_required),!1)},verificationEmail:function(e){var t,n,i;return void 0,i=$("#register-email").val().trim(),n=$("#email-verification-status"),t=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,i!==""&&t.test(i)?(n.removeClass("error-status").removeClass("verification-status").show().text(""),this.trigger("CHECK_REPEAT",null,i),!0):i.trim()===""?n.addClass("error-status").removeClass("verification-status").show().text(r.register.email_required):(n.addClass("error-status").removeClass("verification-status").show().text(r.register.email_not_valid),!1)},verificationPassword:function(){var e,t;return void 0,t=$("#register-password").val().trim(),e=$("#password-verification-status"),t!==""?t.length>5?(e.addClass("verification-status").removeClass("error-status").show().text(r.register.password_ok),this._checkButtonDisabled(),!0):(e.addClass("error-status").removeClass("verification-status").show().text(r.register.password_shorter),$("#register-btn").attr("disabled",!0),this._checkButtonDisabled(),!1):(e.addClass("error-status").removeClass("verification-status").show().text(r.register.password_required),$("#register-btn").attr("disabled",!0),this._checkButtonDisabled(),!1)},submit:function(){var e,t,n,i;return void 0,i=$("#register-username").val(),e=$("#register-email").val(),t=$("#register-password").val(),n=0,this.verificationUser()&&(n+=1),this.verificationEmail()&&(n+=1),this.verificationPassword()&&(n+=1),n===3&&($("#register-btn").attr("value",r.register.reginster_waiting),$("#register-btn").attr("disabled",!0),this.is_submit=!0,this.trigger("CHECK_REPEAT",i,e,t)),!1},showUsernameEmailError:function(){return void 0,this.showStatusInValid("username"),this.showStatusInValid("email"),null},showStatusInValid:function(e){var t;void 0;if(e==="username"||e==="email"){switch(e){case"username":t=$("#username-verification-status"),t.text(r.register.username_taken);break;case"email":t=$("#email-verification-status"),t.text(r.register.email_used)}t.attr("class")!=="error-status"?t.addClass("error-status").removeClass("verification-status").show():t.show(),this.is_submit=!1}return $("#register-btn").val()===r.register.reginster_waiting&&($("#register-btn").attr("disabled",!1),$("#register-btn").attr("value",r.register["register-btn"])),null},showUsernameEmailValid:function(){return void 0,this.showStatusValid("username"),this.showStatusValid("email"),null},showStatusValid:function(e){var t;void 0;if(e==="username"||e==="email"){switch(e){case"username":t=$("#username-verification-status"),t.text(r.register.username_available);break;case"email":t=$("#email-verification-status"),t.text(r.register.email_available)}$("#register-"+e).val()?t.attr("class")!=="verification-status"?t.removeClass("error-status").addClass("verification-status").show():t.show():t.removeClass("error-status").removeClass("verification-status").show().text(""),this._checkButtonDisabled()}return null},loginEvent:function(){return void 0,this.trigger("AUTO_LOGIN"),null},_checkButtonDisabled:function(e){var t;void 0;if(e&&e.target)switch(!1){case e.target.id!=="register-username":this.verificationUser();break;case e.target.id!=="register-email":this.verificationEmail();break;case e.target.id!=="register-password":this.verificationPassword()}return t=0,$("#register-username").val().trim()&&(t+=1),$("#register-email").val().trim()&&(t+=1),$("#register-password").val().trim()&&(t+=1),t===3?$("#register-btn").val()!==r.register.reginster_waiting&&(void 0,$("#register-btn").attr("disabled",!1)):$("#register-btn").attr("disabled",!0),null},otherError:function(){return void 0,$("#username-verification-status").removeClass("error-status").removeClass("verification-status").show().text(""),$("#email-verification-status").removeClass("error-status").removeClass("verification-status").show().text("")},resetCreateAccount:function(e){var t,n;return void 0,$("#username-verification-status").removeClass("error-status").removeClass("verification-status").show().text(""),$("#email-verification-status").removeClass("error-status").removeClass("verification-status").show().text(""),$("#register-btn").attr("disabled",!1),$("#register-btn").attr("value",r.register["register-btn"]),t="ERROR_CODE_"+e+"_MESSAGE",n=r.service[t],notification("error",n,!1),null},registerSuccess:function(){return void 0,this.$el.html(this.success_tmpl())}}),i})}).call(this);