(function() {
  define(['constant', 'CloudResources', 'combo_dropdown', 'og_manage', './component/optiongroup/ogTpl', 'i18n!/nls/lang.js'], function(constant, CloudResources, comboDropdown, OgManage, template, lang) {
    return Backbone.View.extend({
      tagName: 'section',
      events: {
        'click .icon-edit': 'editClicked'
      },
      initDropdown: function() {
        var options;
        options = {
          manageBtnValue: 'Create New Option Group ...',
          filterPlaceHolder: 'Filter by Option Group name',
          noFilter: true
        };
        this.dropdown = new comboDropdown(options);
        this.dropdown.on('open', this.show, this);
        this.dropdown.on('manage', this.manage, this);
        this.dropdown.on('change', this.set, this);
        this.dropdown.on('filter', this.filter, this);
        return this.dropdown.on('quick_create', this.quickCreate, this);
      },
      initialize: function(option) {
        this.initDropdown();
        return this.dbInstance = option.dbInstance;
      },
      render: function(option) {
        var that;
        that = this;
        this.el = this.dropdown.el;
        this.dropdown.setSelection('None');
        this.engine = option.engine;
        this.engineVersion = option.engineVersion;
        this.version = option.majorVersion;
        this.refresh();
        return this;
      },
      refresh: function() {
        var customOGAry, defaultOG, defaultOGAry, engineCol, ogComps, regionName, that;
        that = this;
        regionName = Design.instance().region();
        engineCol = CloudResources(constant.RESTYPE.DBENGINE, regionName);
        ogComps = Design.modelClassForType(constant.RESTYPE.DBOG).allObjects();
        defaultOGAry = [];
        defaultOG = engineCol.getDefaultByNameVersion(regionName, this.engine, this.engineVersion);
        if (defaultOG && defaultOG.defaultOGName) {
          defaultOGAry.push({
            id: null,
            name: defaultOG.defaultOGName
          });
        }
        customOGAry = [];
        _.each(ogComps, function(compModel) {
          if (compModel.get('engineName') === that.engine && compModel.get('engineVersion') === that.version) {
            return customOGAry.push({
              id: compModel.id,
              name: compModel.get('name'),
              data: compModel.toJSON()
            });
          }
        });
        this.ogAry = defaultOGAry.concat(customOGAry);
        return this.renderDropdownList();
      },
      renderDropdownList: function() {
        var selection, that;
        that = this;
        if (this.ogAry.length) {
          selection = this.dbInstance.getOptionGroupName();
          _.each(this.ogAry, function(og) {
            var ogName, ogPreviewAry;
            ogName = og.name;
            ogPreviewAry = [];
            if (og.data) {
              _.each(og.data.options, function(option) {
                return ogPreviewAry.push(option.OptionName);
              });
              og.preview = ogPreviewAry.join(',');
            }
            if (ogName && ogName === selection) {
              og.selected = true;
              that.dropdown.setSelection(selection);
            }
            return null;
          });
          return this.dropdown.setContent(template.dropdown_list(this.ogAry)).toggleControls(true);
        } else {
          return this.dropdown.setContent(template.no_option_group({})).toggleControls(true);
        }
      },
      quickCreate: function() {
        var DBOGModel, dbOGModel;
        DBOGModel = Design.modelClassForType(constant.RESTYPE.DBOG);
        dbOGModel = new DBOGModel({
          engineName: this.engine,
          engineVersion: this.version
        });
        return new OgManage({
          dbInstance: this.dbInstance,
          engine: this.engine,
          version: this.version,
          model: dbOGModel,
          dropdown: this,
          isCreate: true
        }).render();
      },
      renderNoCredential: function() {
        return this.dropdown.render('nocredential').toggleControls(false);
      },
      show: function() {
        $('#property-dbinstance-parameter-group-select .selectbox').removeClass('open');
        if (!this.dropdown.$('.item').length) {
          return this.renderDropdownList();
        }
      },
      manage: function() {
        return this.quickCreate();
      },
      set: function(id, data) {
        return this.dbInstance.setOptionGroup(data.name);
      },
      filter: function(keyword) {},
      editClicked: function(event) {
        var $item, ogModel, ogUID;
        $item = $(event.currentTarget).parent();
        ogUID = $item.data('id');
        if (ogUID) {
          ogModel = Design.instance().component(ogUID);
          new OgManage({
            dbInstance: this.dbInstance,
            engine: this.engine,
            version: this.version,
            model: ogModel,
            dropdown: this
          }).render();
        }
        return false;
      },
      setSelection: function() {
        return this.dropdown.setSelection.apply(this, arguments);
      }
    });
  });

}).call(this);
