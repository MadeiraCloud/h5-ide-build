(function() {
  define(['backbone', 'jquery', 'underscore', 'MC'], function() {
    var TrustedAdvisorModel;
    TrustedAdvisorModel = Backbone.Model.extend({
      defaults: {
        'notice_list': null,
        'warning_list': null,
        'error_list': null
      },
      createList: function() {
        var error_list, notice_list, temp, warning_list;
        console.log('createList');
        notice_list = [];
        warning_list = [];
        error_list = [];
        temp = {};
        _.each(MC.ta.list, function(obj) {
          temp = {
            'info': obj.info,
            'key': obj.key,
            'type': obj.type
          };
          switch (obj.level) {
            case 'NOTICE':
              return notice_list.push(temp);
            case 'WARNING':
              return warning_list.push(temp);
            case 'ERROR':
              return error_list.push(temp);
          }
        });
        this.set('notice_list', notice_list);
        this.set('warning_list', warning_list);
        this.set('error_list', error_list);
        MC.ta.state_list = {
          'notice_list': notice_list,
          'warning_list': warning_list,
          'error_list': error_list
        };
      }
    });
    return TrustedAdvisorModel;
  });

}).call(this);
