(function() {
  define(['./template/stack', 'i18n!/nls/lang.js', "UI.modalplus"], function(template, lang, modalPlus) {
    var SGListView;
    SGListView = Backbone.View.extend({
      events: {
        'click #sg-info-list .sg-edit-icon': 'openSgPanel',
        'click #add-sg-btn': 'openSgPanel',
        'click .sg-list-association-check': 'assignSGToComp',
        'click .sg-list-delete-btn': 'deleteSGFromComp',
        'OPTION_CHANGE #sg-rule-filter-select': 'sortSgRule'
      },
      render: function() {
        this.model.getSGInfoList();
        this.setElement($('.sg-group'));
        this.$el.html(template(this.model.attributes));
        $("#sglist-rule-list").html(MC.template.sgRuleList(this.model.attributes.sg_rule_list));
        return $('#property-head-sg-num').text(this.model.attributes.sg_length);
      },
      openSgPanel: function(event) {
        var sgUID;
        if (event.currentTarget.id === "add-sg-btn") {
          sgUID = this.model.createNewSG();
        } else {
          sgUID = $(event.currentTarget).closest("li").attr("data-uid");
        }
        return this.trigger('OPEN_SG', sgUID);
      },
      refreshSGList: function() {
        return this.render();
      },
      assignSGToComp: function(event) {
        var $checked, $target, sgChecked, sgUID;
        $target = $(event.currentTarget);
        $checked = $target.closest("#sg-info-list").find(":checked");
        if ($checked.length === 0) {
          return false;
        }
        sgUID = $target.closest("li").attr('data-uid');
        sgChecked = $target.prop('checked');
        this.model.assignSG(sgUID, sgChecked);
        this.render();
        return null;
      },
      deleteSGFromComp: function(event) {
        var $target, descContent, mainContent, memberNum, modal, sgName, sgUID, that, tpl;
        that = this;
        $target = $(event.currentTarget);
        sgUID = $target.closest('li').attr('data-uid');
        memberNum = Number($target.attr('data-count'));
        sgName = $target.attr('data-name');
        if (memberNum) {
          mainContent = sprintf(lang.PROP.SGLIST_DELETE_SG_CONFIRM_TITLE, sgName);
          descContent = sprintf(lang.PROP.SGLIST_DELETE_SG_CONFIRM_DESC, sgName);
        }
        if (mainContent) {
          tpl = MC.template.modalDeleteSGOrACL({
            title: lang.PROP.SGLIST_DELETE_SG_TITLE,
            main_content: mainContent,
            desc_content: descContent
          });
          modal = new modalPlus({
            title: lang.PROP.SGLIST_DELETE_SG_TITLE,
            width: 420,
            template: tpl,
            confirm: {
              text: lang.PROP.LBL_DELETE,
              color: "red"
            }
          });
          return modal.on("confirm", function() {
            that.model.deleteSG(sgUID);
            that.render();
            return modal.close();
          });
        } else {
          this.model.deleteSG(sgUID);
          return this.render();
        }
      },
      sortSgRule: function(event) {
        var sg_rule_list, sortType;
        sg_rule_list = $('#sglist-rule-list');
        sortType = $(event.target).find('.selected').attr('data-id');
        this.model.sortSGRule(sortType);
        return $("#sglist-rule-list").html(MC.template.sgRuleList(this.model.attributes.sg_rule_list));
      }
    });
    return new SGListView();
  });

}).call(this);
