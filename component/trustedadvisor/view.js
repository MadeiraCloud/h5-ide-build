(function() {
  define(['event', './template', './modal_template', 'backbone', 'jquery', 'handlebars'], function(ide_event, template, modal_template) {
    var TrustedAdvisorView;
    TrustedAdvisorView = Backbone.View.extend({
      el: '#status-bar-modal',
      events: {
        'click .modal-close': 'closedPopup'
      },
      render: function(type, status) {
        console.log('pop-up:trusted advisor run render', status);
        if (type === 'stack') {
          $('#stack-run-validation-container').html(template(this.model.attributes));
          $('.validating').hide();
          this.processDetails();
          $('.stack-validation details').show();
        } else if (type === 'statusbar') {
          this.$el.html(modal_template());
          this.$el.find('#modal-validation-statusbar').html(template(this.model.attributes));
          this.processStatusBarDetails();
          $('#status-bar-modal').show();
        }
        return null;
      },
      processStatusBarDetails: function() {
        var $tabs, error, notice, warning;
        error = this.model.get('error_list');
        warning = this.model.get('warning_list');
        notice = this.model.get('notice_list');
        $tabs = this.$el.find('.tab li');
        if (error.length) {

        } else if (warning.length) {
          return $tabs.eq(1).click();
        } else if (notice.length) {
          return $tabs.eq(2).click();
        } else {
          this.$el.find('.validation-content').text('Great job! No error, warning or notice here.');
          return this.$el.find('.validation-content').addClass('empty');
        }
      },
      processDetails: function() {
        var $details, $nutshell, $summary, $tabs, bindSummary, error, notice, processNutshell, warning;
        error = this.model.get('error_list');
        warning = this.model.get('warning_list');
        notice = this.model.get('notice_list');
        $tabs = $('#modal-box .tab li');
        $nutshell = $('#modal-box .nutshell');
        $details = $nutshell.prev('details');
        $summary = $details.find('summary');
        bindSummary = function() {
          return $summary.click(function() {
            if ($details.attr('open') === 'open') {
              return $nutshell.show();
            } else {
              return $nutshell.hide();
            }
          });
        };
        processNutshell = function(notShow) {
          var content;
          content = '';
          if (error.length) {
            content += "" + error.length + " error(s), ";
            _.defer(function() {
              return modal.position();
            });
          }
          if (warning.length) {
            content += "" + warning.length + " warning(s), ";
          }
          if (notice.length) {
            content += "" + notice.length + " notice(s), ";
          }
          if (!content) {
            content = 'No error, warning or notice.';
          } else {
            content = content.slice(0, -2);
          }
          $nutshell.find('label').text(content);
          $nutshell.click(function() {
            return $summary.click();
          });
          if (!notShow) {
            return $nutshell.show();
          }
        };
        if (error.length) {
          bindSummary();
          return processNutshell(true);
        } else if (warning.length) {
          $tabs.eq(1).click();
          $details.removeAttr('open');
          processNutshell();
          return bindSummary();
        } else if (notice.length) {
          $tabs.eq(2).click();
          $details.removeAttr('open');
          processNutshell();
          return bindSummary();
        } else {
          $details.removeAttr('open');
          processNutshell();
          bindSummary();
          return $('.validation-content').text('Great job! No error, warning or notice here.');
        }
      },
      restoreRun: function() {
        return $('#btn-confirm, #confirm-update-app').removeAttr('disabled');
      },
      _clickCurrentTab: function(status) {
        console.log('_clickCurrentTab, status = ' + status);
        if (!status) {
          return;
        }
        return _.each($('.tab').find('li'), function(item) {
          if ($(item).attr('data-tab-target') === '#item-' + status) {
            return $(item).trigger('click');
          }
        });
      },
      closedPopup: function() {
        if (this.$el.html()) {
          console.log('closedPopup');
          this.$el.empty();
          this.trigger('CLOSE_POPUP');
          return $('#status-bar-modal').hide();
        }
      }
    });
    return TrustedAdvisorView;
  });

}).call(this);
