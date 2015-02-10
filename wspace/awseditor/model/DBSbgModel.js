(function() {
  define(["constant", "GroupModel", "ConnectionModel"], function(constant, GroupModel, ConnectionModel) {
    var Model, SbAsso;
    SbAsso = ConnectionModel.extend({
      type: "SubnetgAsso"
    });
    Model = GroupModel.extend({
      type: constant.RESTYPE.DBSBG,
      newNameTmpl: "subnetgroup",
      defaults: {
        x: 2,
        y: 2,
        width: 17,
        height: 17,
        createdBy: ""
      },
      constructor: function(attr, option) {
        var az, design, minAZCount, subnet, _i, _len, _ref, _ref1;
        if (option && option.createByUser) {
          design = Design.instance();
          az = {};
          _ref = design.componentsOfType(constant.RESTYPE.SUBNET);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            subnet = _ref[_i];
            az[subnet.parent().get("name")] = true;
          }
          if ((_ref1 = Design.instance().region()) === 'cn-north-1') {
            minAZCount = 1;
          } else {
            minAZCount = 2;
          }
          if (_.keys(az).length < minAZCount) {
            return this;
          }
        }
        return GroupModel.apply(this, arguments);
      },
      initialize: function(attributes, option) {
        if (!this.get('description')) {
          this.set('description', "" + (this.get('name')) + " default description");
        }
        return null;
      },
      serialize: function() {
        var component, sbArray;
        sbArray = _.map(this.connectionTargets("SubnetgAsso"), function(sb) {
          return sb.createRef("SubnetId");
        });
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            CreatedBy: this.get('createdBy'),
            DBSubnetGroupName: this.get('appId'),
            SubnetIds: sbArray,
            DBSubnetGroupDescription: this.get('description')
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.DBSBG,
      deserialize: function(data, layout_data, resolve) {
        var model, sb, _i, _len, _ref;
        model = new Model({
          id: data.uid,
          name: data.name || data.resource.DBSubnetGroupName,
          appId: data.resource.DBSubnetGroupName,
          createdBy: data.resource.CreatedBy,
          description: data.resource.DBSubnetGroupDescription,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1],
          parent: resolve(layout_data.groupUId)
        });
        _ref = data.resource.SubnetIds || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sb = _ref[_i];
          new SbAsso(model, resolve(MC.extractID(sb)));
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);
