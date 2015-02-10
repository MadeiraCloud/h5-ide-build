define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:420px\">\n   <div class=\"modal-header\">\n      <h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_SNS_SUBSCRIPTION", {hash:{},data:data}))
    + "</h3>\n      <i class=\"modal-close\">&times;</i>\n   </div>\n   <div class=\"modal-body\" id=\"property-asg-sns-modal\" data-uid="
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ">\n      <div class=\"modal-control-group modal-sns-protocol\">\n        <label class=\"label-short\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_SNS_PROTOCOL", {hash:{},data:data}))
    + "</label>\n        <div class=\"selectbox\">\n          <div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n          <ul class=\"dropdown\" tabindex=\"-1\">\n            <li class=\"item\" data-id=\"https\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_SNS_PROTOCOL_HTTPS", {hash:{},data:data}))
    + "</li>\n            <li class=\"item\" data-id=\"http\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_SNS_PROTOCOL_HTTP", {hash:{},data:data}))
    + "</li>\n            <li class=\"item\" data-id=\"email\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_SNS_PROTOCOL_EMAIL", {hash:{},data:data}))
    + "</li>\n            <li class=\"item\" data-id=\"email-json\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_SNS_PROTOCOL_EMAIL_JSON", {hash:{},data:data}))
    + "</li>\n            <li class=\"item\" data-id=\"sms\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_SNS_PROTOCOL_SMS", {hash:{},data:data}))
    + "</li>\n            <li class=\"item\" data-id=\"arn\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_SNS_PROTOCOL_APPLICATION", {hash:{},data:data}))
    + "</li>\n            <li class=\"item\" data-id=\"sqs\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_SNS_PROTOCOL_AMAZON_SQS", {hash:{},data:data}))
    + "</li>\n          </ul>\n        </div>\n      </div>\n      <div class=\"modal-control-group\">\n        <label class=\"label-short\" for=\"property-asg-endpoint\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENDPOINT", {hash:{},data:data}))
    + "</label>\n        <div class=\"property-asg-ep\" data-bind=\"true\">\n          <input type=\"text\" class=\"input\" id=\"property-asg-endpoint\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.endpoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" max-length=\"255\" data-required=\"true\" data-trigger=\"change\">\n        </div>\n      </div>\n\n    </section>\n\n   </div>\n   <div class=\"modal-footer\">\n      <button id=\"property-asg-sns-done\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DONE", {hash:{},data:data}))
    + "</button>\n      <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n   </div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });