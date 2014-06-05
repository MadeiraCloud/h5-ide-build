(function(){define(["aws_model","constant","backbone","jquery","underscore","MC"],function(e,t){var n;return n=Backbone.Model.extend({defaults:{resource_list:null},delay:null,initialize:function(){var e;return e=this,this.setTimeout(),this.on("AWS_RESOURCE_RETURN",function(e){return void 0,e&&e.return_code===0?void 0:(void 0,this.set("resource_list","service_error"))})},reload:function(){return void 0,this.set("resource_list",null),this.setTimeout(),this.getStatResourceService()},setTimeout:function(){var e;return void 0,e=this,this.delay=setTimeout(function(){return void 0,e.set("resource_list","service_error")},6e5)},getResource:function(e){var t;return void 0,this.delay&&clearTimeout(this.delay),delete e._id,delete e.timestamp,delete e.username,t=this.createResources(e),this.set("resource_list",$.extend(!0,{},t)),MC.common.other.addUnmanaged($.extend(!0,{},t))},getStatResourceService:function(){var t,n;return void 0,t=MC.common.other.listUnmanaged(),_.isEmpty(t)?(n={"AWS.VPC.VPC":{},"AWS.ELB":{},"AWS.EC2.Instance":{filter:{"instance-state-name":["pending","running","stopping","stopped"]}},"AWS.VPC.RouteTable":{},"AWS.VPC.Subnet":{},"AWS.VPC.VPNGateway":{filter:{state:["pending","available"]}},"AWS.VPC.VPNConnection":{filter:{state:["pending","available"]}},"AWS.AutoScaling.Group":{},"AWS.VPC.NetworkInterface":{}},e.resource({sender:this},$.cookie("usercode"),$.cookie("session_id"),null,n,"statistic",1)):this.set("resource_list",$.extend(!0,{},t)),null},createResources:function(e){var t,n;void 0,n={};try{_.each(e,function(e,t){var r;return r={},_.each(e,function(e,i){var s,o,u,a,f,l;a={},_.each(e,function(t,n){var r,i,s;if(n==="Tag"&&e[n]&&e[n].item&&$.type(e[n].item)==="array"){s={};for(r in e[n].item)s[e[n].item[r].key]=e[n].item[r].value;return a.Tag=s}return i=n.replace(/\|/igm,"."),a[i]=t}),e=a,f=e.Tag,l="",f&&f.app&&f["app-id"]&&f["Created by"]?f&&f.app&&f["app-id"]&&f["Created by"]&&f["Created by"]===atob($.cookie("usercode"))?(l="managed",s=!1):void 0:(l="unmanaged",s=!0);if(l&&l==="unmanaged")return o={"AWS.VPC.VPC":{id:[i]},"AWS.AutoScaling.Group":{id:[]},"AWS.ELB":{id:[]},"AWS.VPC.DhcpOptions":{id:[]},"AWS.VPC.CustomerGateway":{id:[]},"AWS.AutoScaling.LaunchConfiguration":{id:[]},"AWS.AutoScaling.NotificationConfiguration":{id:[]},"AWS.EC2.Instance":{filter:{"vpc-id":i,"instance-state-name":["running","stopped","stopping","pending"]}},"AWS.VPC.RouteTable":{filter:{"vpc-id":i}},"AWS.VPC.Subnet":{filter:{"vpc-id":i}},"AWS.VPC.VPNGateway":{filter:{"attachment.vpc-id":i,state:["pending","available"]}},"AWS.EC2.SecurityGroup":{filter:{"vpc-id":i}},"AWS.VPC.NetworkAcl":{filter:{"vpc-id":i}},"AWS.VPC.NetworkInterface":{filter:{"vpc-id":i}},"AWS.VPC.InternetGateway":{filter:{"attachment.vpc-id":i}},"AWS.EC2.AvailabilityZone":{filter:{"region-name":t}},"AWS.EC2.EBS.Volume":{filter:{"attachment.instance-id":[]}},"AWS.EC2.EIP":{filter:{"instance-id":[]}},"AWS.VPC.VPNConnection":{filter:{"vpn-gateway-id":"",state:["pending","available"]}},"AWS.AutoScaling.ScalingPolicy":{filter:{AutoScalingGroupName:[]}}},u={},_.each(o,function(t,n){var r,i,s,o,a,f,l,c,h,p,d,v;c={},"id"in t&&(t.id.length===0?n==="AWS.VPC.DhcpOptions"&&n in e&&"default"in e[n]?(s=function(){var t,r,i,s;i=e[n],s=[];for(t=0,r=i.length;t<r;t++)a=i[t],a!=="default"&&s.push(a);return s}(),s.length>0&&(c.id=s)):n==="AWS.VPC.CustomerGateway"&&"AWS.VPC.VPNConnection"in e?c.id=function(){var t,n,r,i;r=_.keys(e["AWS.VPC.VPNConnection"]),i=[];for(t=0,n=r.length;t<n;t++)d=r[t],"customerGatewayId"in e["AWS.VPC.VPNConnection"][d]&&i.push(e["AWS.VPC.VPNConnection"][d].customerGatewayId);return i}():n==="AWS.AutoScaling.NotificationConfiguration"&&"AWS.AutoScaling.Group"in e?c.id=_.keys(e["AWS.AutoScaling.Group"]):n==="AWS.AutoScaling.LaunchConfiguration"&&"AWS.AutoScaling.Group"in e?c.id=function(){var t,n,i,s;i=_.keys(e["AWS.AutoScaling.Group"]),s=[];for(t=0,n=i.length;t<n;t++)r=i[t],"LaunchConfigurationName"in e["AWS.AutoScaling.Group"][r]&&s.push(e["AWS.AutoScaling.Group"][r].LaunchConfigurationName);return s}():n==="AWS.CloudWatch.CloudWatch"&&"AWS.AutoScaling.ScalingPolicy"in e?c.id=function(){var t,n,r,i;r=_.keys(e["AWS.AutoScaling.ScalingPolicy"]),i=[];for(t=0,n=r.length;t<n;t++)h=r[t],"AlarmName"in e["AWS.AutoScaling.ScalingPolicy"][h]&&i.push(e["AWS.AutoScaling.ScalingPolicy"][h].AlarmName);return i}():n in e&&(c.id=_.keys(e[n])):c.id=t.id);if("filter"in t){v=t.filter;for(l in v){p=v[l],o={},!p||p.length===0?((l==="instance-id"||l==="attachment.instance-id")&&"AWS.EC2.Instance"in e&&(f=_.keys(e["AWS.EC2.Instance"]),f.length>0&&(o[l]=f)),l==="vpn-gateway-id"&&"AWS.VPC.VPNGateway"in e&&(o[l]=_.keys(e["AWS.VPC.VPNGateway"])[0]),l==="AutoScalingGroupName"&&"AWS.AutoScaling.Group"in e&&(i=_.keys(e["AWS.AutoScaling.Group"]),i.length>0&&(o[l]=i))):o[l]=t.filter[l];if(_.keys(o).length>0){"filter"in c||(c.filter={});for(l in o)p=o[l],c.filter[l]=p}}}if(_.keys(c).length>0)return u[n]=c}),_.keys(u).length>0&&(r[i]=u),e.is_unmanaged=s,r[i].origin=e,n[t]=r})}),void 0}catch(r){t=r,void 0}return n}}),n})}).call(this);