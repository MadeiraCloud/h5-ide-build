define(["handlebars"],function(e){var t=function(e,t,n,r,i){function l(e,t){return"App"}function c(e,t){return"Stack"}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u=this,a="function",f=this.escapeExpression;s+='<section class="group required">\n    <label class="name">',o=n["if"].call(t,t&&t.modeIsAppEdit,{hash:{},inverse:u.program(3,c,i),fn:u.program(1,l,i),data:i});if(o||o===0)s+=o;s+=' Name</label>\n    <input data-target="name" class="selection string" value="'+f((o=t&&t.name,typeof o===a?o.apply(t):o))+'"/>\n</section>\n\n<section class="group">\n    <label class="name">',o=n["if"].call(t,t&&t.modeIsAppEdit,{hash:{},inverse:u.program(3,c,i),fn:u.program(1,l,i),data:i});if(o||o===0)s+=o;s+=' Description</label>\n    <input data-target="description" class="selection string" value="'+f((o=t&&t.description,typeof o===a?o.apply(t):o))+'"/>\n</section>\n\n<section class="group">\n    <dl class="dl-horizontal">\n        <dt>Platform</dt><dd>'+f((o=t&&t.platform,typeof o===a?o.apply(t):o))+"</dd>\n        <dt>Region</dt><dd>"+f((o=t&&t.region,typeof o===a?o.apply(t):o))+"</dd>\n        <dt>",o=n["if"].call(t,t&&t.modeIsAppEdit,{hash:{},inverse:u.program(3,c,i),fn:u.program(1,l,i),data:i});if(o||o===0)s+=o;return s+=" ID</dt><dd>"+f((o=t&&t.id,typeof o===a?o.apply(t):o))+"</dd>\n    </dl>\n</section>",s};return e.template(t)});