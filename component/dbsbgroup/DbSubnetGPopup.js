(function() {
  define(['./template', 'i18n!/nls/lang.js', "UI.modalplus", "constant", "Design"], function(template, lang, Modal, constant, Design) {
    return Backbone.View.extend({
      events: {
        "click .dbsgppp-subnet": "updateSelected"
      },
      initialize: function() {
        var assos, modal, self, subnets;
        self = this;
        assos = this.model.connectionTargets("SubnetgAsso");
        subnets = _.map(this.model.design().componentsOfType(constant.RESTYPE.SUBNET), function(subnet, key) {
          return {
            az: subnet.parent().get("name"),
            id: subnet.id,
            name: subnet.get("name"),
            cidr: subnet.get("cidr"),
            idx: key,
            checked: assos.indexOf(subnet) >= 0
          };
        });
        modal = new Modal({
          title: "Select Subnet for Subnet Group",
          template: template(_.groupBy(subnets, "az")),
          confirm: {
            text: "Save"
          },
          disableClose: true,
          onCancel: function() {
            return self.cancel();
          },
          onConfirm: function() {
            self.apply();
            return modal.close();
          }
        });
        this.setElement(modal.tpl);
        this.updateSelected();
      },
      updateSelected: function() {
        var btn;
        btn = this.$el.closest(".modal-box").find(".modal-confirm");
        if (this.$el.find(".dbsgppp-subnet:checked").length > 1) {
          btn.removeAttr("disabled");
        } else {
          btn.attr("disabled", "disabled");
        }
      },
      cancel: function() {
        if (this.model.connectionTargets("SubnetgAsso").length === 0) {
          this.model.remove();
        }
      },
      apply: function() {
        var SubnetgAsso, cb, design, existSb, id, sb, sbAsso, subnets, value, _i, _j, _len, _len1, _ref, _ref1;
        subnets = {};
        _ref = this.$el.find(".dbsgppp-subnet:checked");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          subnets[$(cb).attr("data-id")] = true;
        }
        existSb = {};
        _ref1 = this.model.connections("SubnetgAsso");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sbAsso = _ref1[_j];
          id = sbAsso.getTarget(constant.RESTYPE.SUBNET).id;
          if (!subnets[id]) {
            sbAsso.remove();
          } else {
            existSb[id] = true;
          }
        }
        SubnetgAsso = Design.modelClassForType("SubnetgAsso");
        design = this.model.design();
        for (sb in subnets) {
          value = subnets[sb];
          if (!existSb[sb]) {
            new SubnetgAsso(this.model, design.component(sb));
          }
        }
      }
    });
  });

}).call(this);
