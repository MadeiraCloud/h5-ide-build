(function() {
  define(['MC', 'event', "Design", 'i18n!nls/lang.js', './stack_template', './app_template', './appview_template', "component/exporter/JsonExporter", 'constant', 'kp', 'ApiRequest', 'component/stateeditor/stateeditor', 'backbone', 'jquery', 'handlebars', 'UI.selectbox', 'UI.notification', "UI.tabbar"], function(MC, ide_event, Design, lang, stack_tmpl, app_tmpl, appview_tmpl, JsonExporter, constant, kp, ApiRequest, stateeditor) {
    var ToolbarView;
    ToolbarView = Backbone.View.extend({
      el: document,
      events: {
        'click #toolbar-straight': 'clickLineStyleStraight',
        'click #toolbar-elbow': 'clickLineStyleElbow',
        'click #toolbar-bezier-q': 'clickLineStyleBezierQ',
        'click #toolbar-bezier-qt': 'clickLineStyleBezierQT',
        'click #toolbar-run': 'clickRunIcon',
        'click .icon-save': 'clickSaveIcon',
        'modal-shown #toolbar-delete': 'clickDeleteIcon',
        'modal-shown #toolbar-duplicate': 'clickDuplicateIcon',
        'modal-shown #toolbar-stop-app': 'clickStopApp',
        'modal-shown #toolbar-start-app': 'clickStartApp',
        'modal-shown #toolbar-app-to-stack': 'appToStackClick',
        'click #toolbar-new': 'clickNewStackIcon',
        'click .icon-zoom-in': 'clickZoomInIcon',
        'click .icon-zoom-out': 'clickZoomOutIcon',
        'click .icon-undo': 'clickUndoIcon',
        'click .icon-redo': 'clickRedoIcon',
        'click #toolbar-export-png': 'clickExportPngIcon',
        'click #toolbar-export-json': 'clickExportJSONIcon',
        'click #toolbar-terminate-app': 'clickTerminateApp',
        'click #btn-app-refresh': 'clickRefreshApp',
        'click #toolbar-convert-cf': 'clickConvertCloudFormation',
        'click #toolbar-edit-app': 'clickEditApp',
        'click #toolbar-save-edit-app': 'clickSaveEditApp',
        'click #toolbar-cancel-edit-app': 'clickCancelEditApp',
        'click .toolbar-visual-ops-switch': 'opsOptionChanged',
        'click .toolbar-visual-ops-refresh': 'clickReloadStates'
      },
      render: function(type, flag) {
        var data, lines;
        console.log('toolbar render');
        lines = {
          icon: '',
          is_style0: null,
          is_style1: null,
          is_style2: null,
          is_style3: null
        };
        switch ($canvas.lineStyle()) {
          case 0:
            lines.is_style0 = true;
            lines.icon = 'icon-straight';
            break;
          case 1:
            lines.is_style1 = true;
            lines.icon = 'icon-elbow';
            break;
          case 2:
            lines.is_style2 = true;
            lines.icon = 'icon-bezier-q';
            break;
          case 3:
            lines.is_style3 = true;
            lines.icon = 'icon-bezier-qt';
        }
        this.model.attributes.lines = lines;
        data = MC.common.other.canvasData.data(true);
        if (Tabbar.current === 'appview') {
          $('#main-toolbar').html(appview_tmpl(this.model.attributes));
        } else if (type === 'app' || type === 'OPEN_APP') {
          $('#main-toolbar').html(app_tmpl(this.model.attributes));
        } else {
          $('#main-toolbar').html(stack_tmpl(this.model.attributes));
        }
        if (type && flag === 1) {
          this.opsState();
        }
        ide_event.trigger(ide_event.DESIGN_SUB_COMPLETE);
        return null;
      },
      listen: function() {
        $(document.body).on('click', '#confirm-update-app', this, this.appUpdating);
        $(document.body).on('click', '#return-app-confirm', this, this.appedit2App);
        return $(document.body).on('click', '.modal-footer #btn-confirm', this, function() {
          return modal.close();
        });
      },
      reRender: function(type) {
        console.log('re-toolbar render');
        if ($.trim($('#main-toolbar').html()) === 'loading...') {
          if (type === 'stack') {
            return $('#main-toolbar').html(stack_tmpl(this.model.attributes));
          } else {
            return $('#main-toolbar').html(app_tmpl(this.model.attributes));
          }
        }
      },
      showErr: function(id, msg) {
        return $("#runtime-error-" + id).text(msg).show();
      },
      hideErr: function(type) {
        if (type) {
          return $("#runtime-error-" + type).hide();
        } else {
          return $(".runtime-error").hide();
        }
      },
      defaultKpIsSet: function() {
        var KpModel, defaultKp;
        if (!kp.hasResourceWithDefaultKp()) {
          return true;
        }
        KpModel = Design.modelClassForType(constant.RESTYPE.KP);
        defaultKp = KpModel.getDefaultKP();
        if (!defaultKp.get('isSet') || !$('#kp-runtime-placeholder .item.selected').length) {
          this.showErr('kp', 'Specify a key pair as $DefaultKeyPair for this app.');
          return false;
        }
        return true;
      },
      hideDefaultKpError: function(context) {
        return function() {
          return context.hideErr('kp');
        };
      },
      renderDefaultKpDropdown: function() {
        var kpDropdown;
        if (kp.hasResourceWithDefaultKp()) {
          kpDropdown = kp.load();
          $('#kp-runtime-placeholder').html(kpDropdown.el);
          kpDropdown.$('.selectbox').on('OPTION_CHANGE', this.hideDefaultKpError(this));
          $('.default-kp-group').show();
        }
        return null;
      },
      clickRunIcon: function(event) {
        var cost, me;
        me = this;
        if ($('#toolbar-run').hasClass('disabled')) {
          return false;
        }
        modal(MC.template.modalRunStack({
          hasCred: App.user.hasCredential()
        }));
        me.renderDefaultKpDropdown();
        event.preventDefault();
        $('.modal-input-value').val(MC.common.other.canvasData.get('name'));
        cost = Design.instance().getCost();
        $('#label-total-fee').find("b").text("$" + cost.totalFee);
        require(['component/trustedadvisor/main'], function(trustedadvisor_main) {
          return trustedadvisor_main.loadModule('stack');
        });
        $('#btn-confirm').on('click', this, function(event) {
          var appNameRepeated, app_name, obj, process_tab_name;
          me.hideErr();
          if (!App.user.hasCredential()) {
            App.showSettings(App.showSettings.TAB.Credential);
            return false;
          }
          app_name = $('.modal-input-value').val();
          if (!app_name) {
            me.showErr('appname', lang.ide.PROP_MSG_WARN_NO_APP_NAME);
            return false;
          }
          if (!MC.validate('awsName', app_name)) {
            me.showErr('appname', lang.ide.PROP_MSG_WARN_INVALID_APP_NAME);
            return false;
          }
          process_tab_name = 'process-' + MC.common.other.canvasData.get('region') + '-' + app_name;
          obj = MC.common.other.getProcess(process_tab_name);
          if (obj && obj.flag_list && obj.flag_list.is_failed === true && obj.flag_list.flag === 'RUN_STACK') {
            MC.common.other.deleteProcess(process_tab_name);
            ide_event.trigger(ide_event.CLOSE_DESIGN_TAB, process_tab_name);
          }
          appNameRepeated = (!MC.aws.aws.checkAppName(app_name)) || (_.contains(_.keys(MC.process), process_tab_name));
          if (appNameRepeated) {
            me.showErr('appname', lang.ide.PROP_MSG_WARN_REPEATED_APP_NAME);
          }
          if (!me.defaultKpIsSet() || appNameRepeated) {
            return false;
          }
          $('#btn-confirm').attr('disabled', true);
          $('.modal-header .modal-close').hide();
          $('#run-stack-cancel').attr('disabled', true);
          return event.data.model.syncSaveStack(MC.common.other.canvasData.get('region'), MC.common.other.canvasData.data());
        });
        return null;
      },
      clickSaveIcon: function() {
        var id, name, template;
        console.log('clickSaveIcon');
        name = MC.common.other.canvasData.get('name');
        id = MC.common.other.canvasData.get('id');
        if (!name) {
          notification('warning', lang.ide.PROP_MSG_WARN_NO_STACK_NAME);
        } else if (name.indexOf(' ') >= 0) {
          notification('warning', lang.ide.PROP_MSG_WARN_WHITE_SPACE);
        } else if (!MC.aws.aws.checkStackName(id, name)) {
          template = MC.template.modalReinputStackName({
            stack_name: name
          });
          modal(template, false);
          $('#rename-confirm').click(function() {
            var new_name;
            new_name = $('#new-stack-name').val();
            console.log('save stack new name:' + new_name);
            if (MC.aws.aws.checkStackName(id, new_name)) {
              modal.close();
              MC.common.other.canvasData.set('name', new_name);
              if ($('#property-stack-name').length !== 0) {
                $('#property-stack-name').val(new_name);
                $('#property-title').text('Stack - ' + new_name);
              }
              ide_event.trigger(ide_event.SAVE_STACK, MC.common.other.canvasData.data());
              return true;
            } else {
              return $('.resource-name-label').text(new_name);
            }
          });
        } else {
          MC.common.other.canvasData.set('name', name);
          ide_event.trigger(ide_event.SAVE_STACK, MC.common.other.canvasData.data());
        }
        return true;
      },
      clickDuplicateIcon: function(event) {
        var name, new_name;
        name = MC.common.other.canvasData.get('name');
        new_name = MC.aws.aws.getDuplicateName(name);
        $('#modal-input-value').val(new_name);
        $('#btn-confirm').on('click', {
          target: this
        }, function(event) {
          console.log('toolbar duplicate stack');
          new_name = $('#modal-input-value').val();
          if (!new_name) {
            return notification('warning', lang.ide.PROP_MSG_WARN_NO_STACK_NAME);
          } else if (new_name.indexOf(' ') >= 0) {
            return notification('warning', lang.ide.PROP_MSG_WARN_WHITE_SPACE);
          } else if (!MC.aws.aws.checkStackName(null, new_name)) {
            return notification('warning', lang.ide.PROP_MSG_WARN_REPEATED_STACK_NAME);
          } else {
            modal.close();
            ide_event.trigger(ide_event.SAVE_STACK, MC.common.other.canvasData.data());
            return setTimeout(function() {
              var id, region;
              region = MC.common.other.canvasData.get('region');
              id = MC.common.other.canvasData.get('id');
              name = MC.common.other.canvasData.get('name');
              return ide_event.trigger(ide_event.DUPLICATE_STACK, region, id, new_name, name);
            }, 500);
          }
        });
        return true;
      },
      appToStackClick: function(event) {
        var appToStackCb, name, new_name, originStack;
        console.log("Click to save App as Stack");
        appToStackCb = function(err, data, id) {
          if (err) {
            notification('error', sprintf(lang.ide.TOOL_MSG_ERR_SAVE_FAILED, data.name));
            return;
          }
          if (data.id) {
            notification("info", sprintf(lang.ide.TOOL_MSG_INFO_HDL_SUCCESS, lang.ide.TOOLBAR_HANDLE_SAVE_STACK, data.name));
            ide_event.trigger(ide_event.CLOSE_DESIGN_TAB, data.id);
          } else {
            notification("info", sprintf(lang.ide.TOOL_MSG_INFO_HDL_SUCCESS, lang.ide.TOOLBAR_HANDLE_CREATE_STACK, data.name));
            ide_event.trigger(ide_event.UPDATE_STACK_LIST, 'SAVE_STACK', [id]);
          }
          return window.setTimeout(function() {
            return ide_event.trigger(ide_event.OPEN_DESIGN_TAB, "OPEN_STACK", data.name, data.region, data.id || id);
          }, 160);
        };
        name = MC.common.other.canvasData.get('name');
        new_name = MC.aws.aws.getStackNameFromApp(name);
        originStack = Design.instance().serialize().stack_id;
        MC.aws.aws.hasStack(originStack);
        $('#modal-input-value').val(new_name);
        if (MC.aws.aws.hasStack(originStack)) {
          $("input[type=radio]").change(function() {
            if ($(this).is(":checked")) {
              $(".radio-instruction").addClass('hide');
              return $(this).parent().parent().find('.radio-instruction').removeClass('hide');
            }
          });
        } else {
          $("#replace_stack").hide();
          $("#save_new_stack").find('div.radio,label').hide();
          $("#save_new_stack").find('.radio-instruction').removeClass('hide');
        }
        $("#modal-input-value").keyup(function() {
          if (!MC.aws.aws.checkStackName(null, $(this).val())) {
            return $("#stack-name-exist").removeClass('hide');
          } else {
            return $('#stack-name-exist').addClass('hide');
          }
        });
        $("#btn-confirm").on('click', {
          target: this
        }, function(event) {
          var newData, stackData;
          console.log("Toolbar save app as stack");
          if ($("#save_new_stack").find(".radio-instruction").hasClass("hide")) {
            modal.close();
            stackData = Design.instance().serializeAsStack();
            stackData.id = originStack;
            ApiRequest("saveStack", {
              region_name: stackData.region,
              data: stackData
            }).then(function(result) {
              return appToStackCb(null, stackData, result);
            }, function(err) {
              return appToStackCb(err, stackData);
            });
            return false;
          }
          new_name = $("#modal-input-value").val();
          if (!new_name) {
            return notification("warning", lang.ide.PROP_MSG_WARN_NO_STACK_NAME);
          } else if (new_name.indexOf(' ') >= 0) {
            return notification('warning', lang.ide.PROP_MSG_WARN_WHITE_SPACE);
          } else if (!MC.aws.aws.checkStackName(null, new_name)) {
            $("#stack-name-exist").addClass('error-msg').removeClass('hide');
            return notification('warning', lang.ide.PROP_MSG_WARN_REPEATED_STACK_NAME);
          } else {
            $("#stack-name-exist").addClass('hide');
            modal.close();
            newData = Design.instance().serializeAsStack();
            newData.name = new_name;
            return ApiRequest("createStack", {
              region_name: newData.region,
              data: newData
            }).then(function(result) {
              return appToStackCb(null, newData, result);
            }, function(err) {
              return appToStackCb(err, newData);
            });
          }
        });
        return null;
      },
      clickReloadStates: function(event) {
        var $label, $target;
        $target = $(event.currentTarget);
        $label = $target.find('.refresh-label');
        if ($target.hasClass('disabled')) {
          return false;
        }
        console.log(event);
        $target.toggleClass('disabled');
        $label.html($label.attr('data-disabled'));
        return $.ajax({
          url: "http://urlthatdoesnotexist.com",
          method: "POST",
          data: {
            "encoded_user": App.user.get("usercode"),
            "token": App.user.get("defaultToken")
          },
          dataType: 'json',
          statusCode: {
            200: function() {
              var appData, uid, _results;
              console.log(200, arguments);
              notification('info', "Success!");
              appData = Design.instance().serialize();
              _results = [];
              for (uid in appData.component) {
                if (appData.component[uid].type === "AWS.EC2.Instance" && appData.component[uid].state.length > 0) {
                  console.log(appData, uid);
                  _results.push(stateEditor.loadModule(appData.component, uid, null, true));
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            },
            401: function() {
              console.log(401, arguments);
              return notification('error', "Error 401");
            },
            404: function() {
              console.log(404, arguments);
              return notification('error', "Error 404");
            },
            500: function() {
              console.log(500, arguments);
              return notification('error', "Error 500");
            }
          },
          error: function() {
            console.log('Reload State Request Error.');
            return null;
          }
        }).always(function() {
          $target.removeClass('disabled');
          return $label.html($label.attr('data-original'));
        });
      },
      clickDeleteIcon: function() {
        var me, target;
        me = this;
        target = $('#main-toolbar');
        return $('#btn-confirm').on('click', {
          target: this
        }, function(event) {
          var id, name, region;
          console.log('clickDeleteIcon');
          modal.close();
          region = MC.common.other.canvasData.get('region');
          id = MC.common.other.canvasData.get('id');
          name = MC.common.other.canvasData.get('name');
          return ide_event.trigger(ide_event.DELETE_STACK, region, id, name);
        });
      },
      clickNewStackIcon: function() {
        console.log('clickNewStackIcon');
        return ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'NEW_STACK', null, MC.common.other.canvasData.get('region'), null);
      },
      clickZoomInIcon: function(event) {
        console.log('clickZoomInIcon');
        if ($(event.currentTarget).hasClass("disabled")) {
          return false;
        }
        return this.trigger('TOOLBAR_ZOOM_IN');
      },
      clickZoomOutIcon: function(event) {
        console.log('clickZoomOutIcon');
        if ($(event.currentTarget).hasClass("disabled")) {
          return false;
        }
        return this.trigger('TOOLBAR_ZOOM_OUT');
      },
      clickUndoIcon: function() {
        return console.log('clickUndoIcon');

        /*
        require [ 'component/stackrun/main' ], ( stackrun_main ) ->
            stackrun_main.loadModule()
         */
      },
      clickRedoIcon: function() {
        return console.log('clickRedoIcon');

        /*
        require [ 'component/sgrule/main' ], ( sgrule_main ) ->
            sgrule_main.loadModule()
         */
      },
      clickExportPngIcon: function() {
        modal(MC.template.exportPNG({
          'title': 'Export PNG',
          'confirm': 'Download',
          'color': 'blue'
        }, false));
        $("#modal-wrap").data("uid", MC.common.other.canvasData.get('id')).find("#btn-confirm").hide();
        $("#modal-wrap").find(".modal-body").css({
          padding: "12px 20px",
          "max-height": "420px",
          overflow: "hidden",
          background: "none"
        });
        this.trigger('TOOLBAR_EXPORT_PNG_CLICK');
        return null;
      },
      clickExportJSONIcon: function() {
        var data, date, design, name, username;
        design = Design.instance();
        username = App.user.get('username');
        date = MC.dateFormat(new Date(), "yyyy-MM-dd");
        name = [design.get("name"), username, date].join("-");
        data = JsonExporter.exportJson(Design.instance().serialize(), name + ".json");
        if (data) {
          modal(MC.template.exportJSON(data));
        }
        return null;
      },
      exportPNG: function(base64_image, uid, blob) {
        var name;
        if ($("#modal-wrap").data("uid") !== uid) {
          return;
        }
        name = MC.common.other.canvasData.get('name');
        if (!blob) {
          $("#modal-wrap").find("#btn-confirm").show().attr({
            'href': base64_image,
            'download': name + '.png'
          });
        } else {
          $("#modal-wrap").find("#btn-confirm").show().click(function() {
            return JsonExporter.download(blob, name + ".png");
          });
        }
        $('.modal-body').html("<img style='max-height:100%;display:inline-block' src='" + base64_image + "' />").css({
          "background": "none",
          "text-align": "center"
        });
        _.delay(function() {
          return modal.position();
        }, 50);
        return null;
      },
      clickConvertCloudFormation: function() {
        modal(MC.template.exportCloudFormation());
        this.trigger("CONVERT_CLOUDFORMATION");
        return null;
      },
      saveCloudFormation: function(name) {
        var aTag, cf_json, error, fileName, me;
        me = this;
        try {
          aTag = $('#tpl-download').removeClass('disabled');
          cf_json = this.model.attributes.cf_data[name];
          fileName = "" + (Design.instance().get('name')) + ".json";
          JsonExporter.genericExport(aTag, cf_json, fileName);
          return $('#tpl-download').on('click', function(event) {
            return modal.close();
          });
        } catch (_error) {
          error = _error;
          return notification('error', lang.ide.TOOL_MSG_ERR_CONVERT_CLOUDFORMATION);
        }
      },
      notify: function(type, msg) {
        return notification(type, msg);
      },
      clickStopApp: function(event) {
        var me, target;
        me = this;
        console.log('click stop app');
        if (false) {
          modal.close();
          console.log('show credential setting dialog');
          return require(['component/awscredential/main'], function(awscredential_main) {
            return awscredential_main.loadModule();
          });
        } else {
          target = $('#main-toolbar');
          return $('#btn-confirm').on('click', {
            target: this
          }, function(event) {
            var id, name, region;
            region = MC.common.other.canvasData.get('region');
            id = MC.common.other.canvasData.get('id');
            name = MC.common.other.canvasData.get('name');
            ide_event.trigger(ide_event.STOP_APP, region, id, name);
            return modal.close();
          });
        }
      },
      clickStartApp: function(event) {
        var me, target;
        me = this;
        console.log('click run app');
        if (false) {
          modal.close();
          console.log('show credential setting dialog');
          return require(['component/awscredential/main'], function(awscredential_main) {
            return awscredential_main.loadModule();
          });
        } else {
          target = $('#main-toolbar');
          return $('#btn-confirm').on('click', {
            target: this
          }, function(event) {
            var id, name, region;
            region = MC.common.other.canvasData.get('region');
            id = MC.common.other.canvasData.get('id');
            name = MC.common.other.canvasData.get('name');
            ide_event.trigger(ide_event.START_APP, region, id, name);
            return modal.close();
          });
        }
      },
      clickTerminateApp: function(event) {
        var me, target;
        me = this;
        console.log('click terminate app');
        if (false) {
          modal.close();
          console.log('show credential setting dialog');
          return require(['component/awscredential/main'], function(awscredential_main) {
            return awscredential_main.loadModule();
          });
        } else {
          target = $('#main-toolbar');
          return $('#btn-confirm').on('click', {
            target: this
          }, function(event) {
            var id, name, region;
            region = MC.common.other.canvasData.get('region');
            id = MC.common.other.canvasData.get('id');
            name = MC.common.other.canvasData.get('name');
            ide_event.trigger(ide_event.TERMINATE_APP, region, id, name);
            return modal.close();
          });
        }
      },
      clickLineStyleStraight: function(event) {
        $canvas.lineStyle(0);
        return null;
      },
      clickLineStyleElbow: function(event) {
        $canvas.lineStyle(1);
        return null;
      },
      clickLineStyleBezierQ: function(event) {
        $canvas.lineStyle(2);
        return null;
      },
      clickLineStyleBezierQT: function(event) {
        $canvas.lineStyle(3);
        return null;
      },
      clickRefreshApp: function(event) {
        console.log('toolbar clickRefreshApp');
        return ide_event.trigger(ide_event.UPDATE_APP_RESOURCE, MC.common.other.canvasData.get('region'), MC.common.other.canvasData.get('id'));
      },
      clickEditApp: function() {
        console.log('clickEditApp');
        ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_TYPE, MC.data.current_tab_id, 'appedit');
        ide_event.trigger(ide_event.UPDATE_RESOURCE_STATE, 'show');
        this.trigger("UPDATE_APP", true);
        MC.canvas.event.clearList();
        MC.common.other.canvasData.origin(MC.common.other.canvasData.data());
        Design.instance().setMode(Design.MODE.AppEdit);
        ide_event.trigger(ide_event.OPEN_PROPERTY);
        Design.instance().refreshAppUpdate();
        return null;
      },
      clickSaveEditApp: function(event) {
        var result;
        if (false) {
          modal.close();
          console.log('show credential setting dialog');
          require(['component/awscredential/main'], function(awscredential_main) {
            return awscredential_main.loadModule();
          });
        } else {
          result = this.model.diff();
          if (!result.isModified) {
            this.appedit2App();
            return;
          } else {
            modal(MC.template.updateApp(result));
            this.renderDefaultKpDropdown();
            require(['component/trustedadvisor/main'], function(trustedadvisor_main) {
              return trustedadvisor_main.loadModule('stack');
            });
          }
        }
        return null;
      },
      clickCancelEditApp: function() {
        console.log('clickCancelEditApp');
        if (!MC.common.other.canvasData.isModified()) {
          this.appedit2App();
        } else {
          modal(MC.template.cancelAppEdit2App(), true);
        }
        Design.instance().refreshAppUpdate();
        return null;
      },
      appedit2App: function(target) {
        var me;
        console.log('appedit2App');
        ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_TYPE, MC.data.current_tab_id, 'app');
        if (target) {
          me = target.data;
        } else {
          me = this;
        }
        me.trigger("UPDATE_APP", false);
        if (target) {
          ide_event.trigger(ide_event.RESTORE_CANVAS);
        }
        modal.close();
        ide_event.trigger(ide_event.UPDATE_RESOURCE_STATE, 'hide');
        ide_event.trigger(ide_event.HIDE_STATUS_BAR);
        Design.instance().setMode(Design.MODE.App);
        ide_event.trigger(ide_event.OPEN_PROPERTY);
        Design.instance().trigger(Design.EVENT.AwsResourceUpdated);
        return null;
      },
      saveSuccess2App: function(tab_id, region) {
        console.log('saveSuccess2App, tab_id = ' + tab_id + ', region = ' + region);
        ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_TYPE, MC.data.current_tab_id, 'app');
        ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'RELOAD_APP', null, region, tab_id);
        MC.common.other.deleteProcess(MC.data.current_tab_id);
        return null;
      },
      appUpdating: function(event) {
        var me;
        console.log('appUpdating');
        me = event.data;
        if (!me.defaultKpIsSet()) {
          return false;
        }
        event.data.trigger('APP_UPDATING', MC.common.other.canvasData.data());
        modal.close();
        return null;
      },
      opsState: function() {
        var $applyVisops, $switchCheckbox, agentData;
        console.log('opsState');
        $switchCheckbox = $('#main-toolbar .toolbar-visual-ops-switch');
        $applyVisops = $('#apply-visops');
        if (Tabbar.current === 'new') {
          $switchCheckbox.addClass('on');
          this.model.setAgentEnable(true);
        } else {
          $switchCheckbox.removeClass('on');
        }
        if (Design && Design.instance()) {
          agentData = Design.instance().get('agent');
          if (agentData.enabled) {
            return $switchCheckbox.addClass('on');
          } else {
            return $switchCheckbox.removeClass('on');
          }
        }
      },
      opsOptionChanged: function(event) {
        var $switchInput, notShowModal, thatModel, value;
        thatModel = this.model;
        $switchInput = $('#main-toolbar .toolbar-visual-ops-switch');
        $switchInput.toggleClass('on');
        value = $switchInput.hasClass('on');
        if (value) {
          notShowModal = thatModel.isAllInstanceNotHaveUserData();
          if (!notShowModal) {
            $switchInput.removeClass('on');
            modal(MC.template.modalStackAgentEnable({}));
            $('#modal-stack-agent-enable-confirm').one('click', function() {
              $switchInput.addClass('on');
              thatModel.setAgentEnable(true);
              ide_event.trigger(ide_event.REFRESH_PROPERTY);
              return modal.close();
            });
          } else {
            thatModel.setAgentEnable(true);
          }
        } else {
          thatModel.setAgentEnable(false);
        }
        return ide_event.trigger(ide_event.REFRESH_PROPERTY);
      }
    });
    return ToolbarView;
  });

}).call(this);
