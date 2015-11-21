define(['constant', './ValidationBase'], function(constant, ValidationBase) {
  return ValidationBase.extend({
    limits: {
      port: ValidationBase.limit.portICMPRange,
      sglist: ValidationBase.limit.osname
    },
    port: function(value, $dom) {
      var port, protocol, tip;
      port = value;
      protocol = $dom.prevAll('.selection[data-target="protocol"]').getValue();
      tip = 'Port/Type/Code range invalid';
      if (protocol === 'icmp') {
        port = this.view.getICMPRange(port);
        if (port === null) {
          return tip;
        }
      } else if (protocol === 'tcp' || protocol === 'udp') {
        port = this.view.getPortRange(port);
        if (port === null) {
          return tip;
        }
      }
    }
  }, {
    handleTypes: [constant.RESTYPE.OSSG]
  });
});
