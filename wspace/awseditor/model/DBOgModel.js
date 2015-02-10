(function() {
  define(["ComplexResModel", "Design", "constant", 'i18n!/nls/lang.js'], function(ComplexResModel, Design, constant, lang) {
    var Model;
    Model = ComplexResModel.extend({
      newNameTmpl: "-og-",
      type: constant.RESTYPE.DBOG,
      isDefault: function() {
        return !!this.get('default');
      },
      isVisual: function() {
        return false;
      },
      initialize: function(attributes, option) {
        var prefix, self;
        if (this.isDefault()) {
          return;
        }
        if (!this.get('description')) {
          prefix = this.engineType() + this.get('engineVersion').replace(/\./g, '-');
          this.set('name', prefix + this.get('name'));
          this.set('name', prefix + this.getNewName(void 0, this.newNameTmpl));
          self = this;
          this.set('description', sprintf(lang.IDE.CUSTOM_OPTION_GROUP_FOR_ENGINE, self.get('engineName'), self.get('engineVersion')));
        }
        return null;
      },
      defaults: function() {
        return {
          engineName: '',
          engineVersion: '',
          options: [],
          applyImmediately: true
        };
      },
      engineType: function() {
        var engine;
        engine = this.get('engineName');
        switch (false) {
          case engine !== 'mysql':
            return 'mysql';
          case engine !== 'postgresql':
            return 'postgresql';
          case engine !== 'oracle-ee' && engine !== 'oracle-se' && engine !== 'oracle-se1':
            return 'oracle';
          case engine !== 'sqlserver-ee' && engine !== 'sqlserver-ex' && engine !== 'sqlserver-se' && engine !== 'sqlserver-web':
            return 'sqlserver';
        }
      },
      remove: function() {
        _.invoke(this.connectionTargets('OgUsage'), 'setDefaultOptionGroup');
        return ComplexResModel.prototype.remove.apply(this, arguments);
      },
      createRef: function() {
        if (this.isDefault()) {
          return this.get('name');
        } else {
          return ComplexResModel.prototype.createRef.apply(this, arguments);
        }
      },
      serialize: function(options) {
        var component, vpc;
        if (this.isDefault()) {
          return;
        }
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            CreatedBy: this.get('createdBy') || '',
            EngineName: this.get('engineName'),
            MajorEngineVersion: this.get('engineVersion'),
            OptionGroupDescription: this.get('description'),
            OptionGroupName: this.get('appId') || '',
            Options: this.get('options'),
            ApplyImmediately: this.get('applyImmediately'),
            VpcId: this.getVpcRef()
          }
        };
        return {
          component: component
        };
      }
    }, {
      handleTypes: constant.RESTYPE.DBOG,
      deserialize: function(data, layout_data, resolve) {
        return new Model({
          id: data.uid,
          name: data.name,
          appId: data.resource.OptionGroupName,
          createdBy: data.resource.CreatedBy,
          engineName: data.resource.EngineName,
          engineVersion: data.resource.MajorEngineVersion,
          options: data.resource.Options,
          description: data.resource.OptionGroupDescription,
          applyImmediately: data.resource.ApplyImmediately
        });
      }
    });
    return Model;
  });

}).call(this);
