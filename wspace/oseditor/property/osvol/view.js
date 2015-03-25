define(['constant', '../OsPropertyView', './template', 'CloudResources'], function(constant, OsPropertyView, template, CloudResources) {
  return OsPropertyView.extend({
    events: {
      "change .selection[data-target]": "updateAttribute"
    },
    render: function() {
      var _ref;
      this.$el.html(template.stackTemplate(this.getRenderData()));
      if ((_ref = this.model) != null ? _ref.get('snapshot') : void 0) {
        this.bindSelectizeEvent();
      }
      return this;
    },
    bindSelectizeEvent: function() {
      var sizeInputElement, snapshotOptions, snapshotSelectElem, that;
      that = this;
      this.snapshots || (this.snapshots = CloudResources(constant.RESTYPE.OSSNAP, Design.instance().region()));
      snapshotOptions = _.map(this.snapshots.models, function(e) {
        var text, value;
        text = e.get('name');
        value = e.get('id');
        return {
          text: text,
          value: value
        };
      });
      snapshotSelectElem = this.$el.find("#property-os-volume-snapshot");
      snapshotSelectElem.on('select_initialize', function() {
        this.selectize.addOption(snapshotOptions);
        return this.selectize.setValue(that.model.get('snapshot'));
      });
      sizeInputElement = this.$el.find("#property-os-volume-size");
      return snapshotSelectElem.on('change', function() {
        return _.defer(function() {
          return sizeInputElement.val(that.model.get('size'));
        });
      });
    },
    updateAttribute: function(event) {
      var targetDom, volumeSize;
      OsPropertyView.prototype.updateAttribute.apply(this, arguments);
      targetDom = event.currentTarget || event.target;
      if ($(targetDom).data('target') === "snapshot") {
        volumeSize = this.snapshots.get($(targetDom).val()).get('size');
        return this.model.set('size', volumeSize);
      }
    },
    selectTpl: {
      snapshotOption: function(item) {
        var snapModel, snapshots;
        snapshots = CloudResources(constant.RESTYPE.OSSNAP, Design.instance().region());
        snapModel = snapshots.get(item.value);
        return template.snapshotOption(snapModel != null ? snapModel.toJSON() : void 0);
      }
    }
  }, {
    handleTypes: [constant.RESTYPE.OSVOL],
    handleModes: ['stack', 'appedit']
  });
});
