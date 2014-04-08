(function() {
  define(['event', './module/process/template', './module/process/appview_template', 'backbone', 'jquery', 'handlebars'], function(ide_event, template, appview_template) {
    var ProcessView, processView;
    ProcessView = Backbone.View.extend({
      el: '#tab-content-process',
      template: template,
      appview_template: appview_template,
      events: {
        'click .btn-close-process': 'closeProcess'
      },
      render: function(type) {
        console.log('process render', type);
        if (type === 'process') {
          return $(this.el).html(this.template(this.model.attributes));
        } else if (type === 'appview') {
          return $(this.el).html(this.appview_template(this.model.attributes.timeout_obj));
        }
      },
      closeProcess: function() {
        console.log('closeProcess');
        return ide_event.trigger(ide_event.CLOSE_DESIGN_TAB, MC.data.current_tab_id);
      }
    });
    processView = new ProcessView();
    return processView;
  });

}).call(this);
