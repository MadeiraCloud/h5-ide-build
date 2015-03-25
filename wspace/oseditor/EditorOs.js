define(["OpsEditor", "./OsEditorStack", "./OsEditorApp", "./model/OsModelFloatIp", "./model/OsModelHealthMonitor", "./model/OsModelListener", "./model/OsModelNetwork", "./model/OsModelElb", "./model/OsModelPool", "./model/OsModelPort", "./model/OsModelRt", "./model/OsModelKeypair", "./model/OsModelServer", "./model/OsModelSg", "./model/OsModelSgRule", "./model/OsModelSubnet", "./model/OsModelVolume", "./model/connection/OsFloatIpUsage", "./model/connection/OsListenerAsso", "./model/connection/OsPoolMembership", "./model/connection/OsPortUsage", "./model/connection/OsRouterAsso", "./model/connection/OsSgAsso", "./model/connection/OsVolumeUsage", "./model/seVisitors/AppToStack", "./canvas/CeNetwork", "./canvas/CeSubnet", "./canvas/CeRt", "./canvas/CePool", "./canvas/CeListener", "./canvas/CeElb", "./canvas/CeServer", "./canvas/CePort", "./canvas/CeOsLine", "./canvas/CanvasViewOs", "./canvas/CanvasViewOsLayout"], function(OpsEditor, StackEditor, AppEditor) {
  var OsEditor;
  OsEditor = function(opsModel) {
    if (opsModel.isStack()) {
      return new StackEditor(opsModel);
    } else {
      return new AppEditor(opsModel);
    }
  };
  OpsEditor.registerEditors(OsEditor, function(model) {
    return model.type === "OpenstackOps";
  });
  return OsEditor;
});
