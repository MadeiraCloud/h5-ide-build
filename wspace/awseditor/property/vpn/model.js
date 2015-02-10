(function() {
  define(['../base/model', "Design", "constant", 'CloudResources'], function(PropertyModel, Design, constant, CloudResources) {
    var VPNModel, generateDownload;
    generateDownload = function(configs, vpn_data) {
      var defaultCfg, parse_result;
      defaultCfg = "{}";
      if (!vpn_data.customerGatewayConfiguration) {
        return defaultCfg;
      }
      vpn_data = $.xml2json($.parseXML(vpn_data.customerGatewayConfiguration));
      if (!vpn_data) {
        return defaultCfg;
      }
      vpn_data = vpn_data.vpn_connection;
      parse_result = _.map(configs, function(config) {
        var dc_data, dc_filename;
        dc_data = {
          vpnConnectionId: vpn_data['@attributes'].id || "",
          vpnGatewayId: vpn_data.vpn_gateway_id || "",
          customerGatewayId: vpn_data.customer_gateway_id || ""
        };
        dc_data.tunnel = _.map(vpn_data.ipsec_tunnel, function(value, key) {
          var cur_array;
          cur_array = {};
          cur_array.number = key + 1;
          cur_array.ike_protocol_method = value.ike.authentication_protocol || "";
          cur_array.ike_pre_shared_key = value.ike.pre_shared_key || "";
          cur_array.ike_authentication_protocol_algorithm = value.ike.authentication_protocol || "";
          cur_array.ike_encryption_protocol = value.ike.encryption_protocol || "";
          cur_array.ike_lifetime = value.ike.lifetime || "";
          cur_array.ike_mode = value.ike.mode || "";
          cur_array.ike_perfect_forward_secrecy = value.ike.perfect_forward_secrecy || "";
          cur_array.ipsec_protocol = value.ipsec.protocol || "";
          cur_array.ipsec_authentication_protocol = value.ipsec.authentication_protocol || "";
          cur_array.ipsec_encryption_protocol = value.ipsec.encryption_protocol || "";
          cur_array.ipsec_lifetime = value.ipsec.lifetime || "";
          cur_array.ipsec_mode = value.ipsec.mode || "";
          cur_array.ipsec_perfect_forward_secrecy = value.ipsec.perfect_forward_secrecy || "";
          cur_array.ipsec_interval = value.ipsec.dead_peer_detection.interval || "";
          cur_array.ipsec_retries = value.ipsec.dead_peer_detection.retries || "";
          cur_array.tcp_mss_adjustment = value.ipsec.tcp_mss_adjustment || "";
          cur_array.clear_df_bit = value.ipsec.clear_df_bit || "";
          cur_array.fragmentation_before_encryption = value.ipsec.fragmentation_before_encryption || "";
          cur_array.customer_gateway_outside_address = value.customer_gateway.tunnel_outside_address.ip_address || "";
          cur_array.vpn_gateway_outside_address = value.vpn_gateway.tunnel_outside_address.ip_address || "";
          cur_array.customer_gateway_inside_address = value.customer_gateway.tunnel_inside_address.ip_address + '/' + value.customer_gateway.tunnel_inside_address.network_cidr || "";
          cur_array.vpn_gateway_inside_address = value.vpn_gateway.tunnel_inside_address.ip_address + '/' + value.customer_gateway.tunnel_inside_address.network_cidr || "";
          cur_array.next_hop = value.vpn_gateway.tunnel_inside_address.ip_address || "";
          cur_array.isStaticRouting = true;
          if (value.customer_gateway.bgp && value.customer_gateway.bgp.asn) {
            cur_array.isStaticRouting = false;
            cur_array.customer_gateway_bgp_asn = value.customer_gateway.bgp.asn || "";
            cur_array.vpn_gateway_bgp_asn = value.vpn_gateway.bgp.asn || "";
            cur_array.neighbor_ip_address = value.vpn_gateway.tunnel_inside_address.ip_address || "";
            cur_array.customer_gateway_bgp_hold_time = value.customer_gateway.bgp.hold_time || "";
          }
          return cur_array;
        });
        dc_filename = dc_data.vpnConnectionId || 'download_configuration';
        dc_data = MC.template.configurationDownload(dc_data);
        return "{\"download\":true, \"filecontent\":\"" + (Base64.encode(dc_data)) + "\", \"filename\":\"" + dc_filename + "\", \"btnname\":\"" + config.name + "\"}";
      });
      return "[ " + (parse_result.join(',')) + " ]";
    };
    VPNModel = PropertyModel.extend({
      init: function(uid) {
        var cgw, vgw, vpn;
        vpn = Design.instance().component(uid);
        vgw = vpn.getTarget(constant.RESTYPE.VGW);
        cgw = vpn.getTarget(constant.RESTYPE.CGW);
        if (this.isApp || this.isAppEdit) {
          this.getAppData(vpn.get("appId"));
        }
        this.set({
          uid: uid,
          name: "vpn:" + (cgw.get('name')),
          ips: vpn.get("routes"),
          dynamic: cgw.isDynamic()
        });
        return null;
      },
      updateIps: function(ipset) {
        _.each(ipset, function(ipCidr, idx) {
          var validCIDR;
          validCIDR = MC.getValidCIDR(ipCidr);
          ipset[idx] = validCIDR;
        });
        Design.instance().component(this.get("uid")).set("routes", ipset);
        return null;
      },
      getAppData: function(vpnAppId) {
        var vpn, vpncfg, vpncfg_str, _ref;
        vpn = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.VPN, Design.instance().region()).get(vpnAppId)) != null ? _ref.toJSON() : void 0;
        vpn = _.clone(vpn);
        if (vpn) {
          vpncfg_str = generateDownload([
            {
              "type": "download_configuration",
              "name": "Download Configuration"
            }
          ], vpn);
          vpncfg = JSON.parse(vpncfg_str);
          if (vpncfg && vpncfg.length > 0) {
            this.set("vpncfg", vpncfg[0]);
          }
        }
        if (vpn.vgwTelemetry && vpn.vgwTelemetry.item) {
          vpn.vgwTelemetry = _.map(vpn.vgwTelemetry.item, function(item, idx) {
            item = $.extend(true, {}, item);
            item.index = idx + 1;
            return item;
          });
        }
        vpn.isApp = this.isApp;
        return this.set(vpn);
      },
      isCidrConflict: function(inputValue, cidr) {
        return Design.modelClassForType(constant.RESTYPE.SUBNET).isCidrConflict(inputValue, cidr);
      }
    });
    return new VPNModel();
  });

}).call(this);
