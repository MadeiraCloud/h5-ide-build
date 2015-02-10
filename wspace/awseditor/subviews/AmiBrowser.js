(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['../template/TplAmiBrowser', 'i18n!/nls/lang.js', 'UI.modalplus', "ApiRequest", 'CloudResources', 'backbone', 'jqpagination'], function(TplAmiBrowser, lang, Modal, ApiRequest, CloudResources) {
    return Backbone.View.extend({
      events: {
        'click .ami-option-group .ami-option-wrap .btn': 'clickOptionBtn',
        'keypress #community-ami-input': "search",
        'click    #btn-search-ami': "search",
        'click    .toggle-fav': "toggleFav"
      },
      initialize: function(attr) {
        var modal, self;
        $.extend(this, attr);
        modal = new Modal({
          title: lang.IDE.AMI_LBL_COMMUNITY_AMIS,
          width: "855px",
          template: TplAmiBrowser.dialog(),
          disableFooter: true,
          compact: true
        });
        self = this;
        modal.on("close", function() {
          if (self.onClose) {
            self.onClose();
          }
        });
        this.setElement(modal.tpl);
        this.doSearch();
      },
      clickOptionBtn: function(event) {
        var active_btns;
        if ($(event.target).hasClass('active')) {
          active_btns = $(event.target).parent().find('.active');
          if (active_btns.length === 1 && active_btns[0] === event.target) {
            return;
          } else {
            $(event.target).removeClass('active');
          }
        } else {
          $(event.target).addClass('active');
        }
        return null;
      },
      toggleFav: function(event) {
        var amiElem, data, favAmis, id, promise, that;
        amiElem = $(event.target);
        that = this;
        favAmis = CloudResources(this.credential, "FavoriteAmi", this.region);
        promise = null;
        id = amiElem.closest("tr").attr("data-id");
        if (amiElem.hasClass('fav')) {
          promise = favAmis.unfav(id);
        } else {
          data = $.extend({
            id: id
          }, this.communityAmiData[id]);
          promise = favAmis.fav(data);
        }
        return promise.then(function() {
          return amiElem.toggleClass('fav');
        });
      },
      doSearch: function(pageNum, perPage) {
        var $buttonGroup, amiId, amiRes, architecture, isPublic, name, perPageNum, platform, reg_ami, returnPage, rootDeviceType, self;
        pageNum = pageNum || 1;
        this.renderAmiLoading();
        name = $("#community-ami-input").val();
        platform = $('#selectbox-ami-platform').find('.selected').data('id');
        isPublic = null;
        architecture = null;
        rootDeviceType = null;
        $buttonGroup = $("#filter-ami-type").find(".active");
        if ($buttonGroup.length === 1) {
          isPublic = $buttonGroup.attr("data-value");
        }
        $buttonGroup = $('#filter-ami-32bit-64bit').find('.active');
        if ($buttonGroup.length === 1) {
          architecture = $buttonGroup.attr("data-value");
        }
        $buttonGroup = $('#filter-ami-EBS-Instance').find('.active');
        if ($buttonGroup.length === 1) {
          rootDeviceType = $buttonGroup.attr("data-value");
        }
        perPageNum = parseInt(perPage || 50, 10);
        returnPage = parseInt(pageNum, 10);
        self = this;
        reg_ami = /ami-[a-zA-Z0-9]{8}$/;
        amiId = name.trim();
        if (amiId && reg_ami.test(amiId)) {
          amiRes = CloudResources(this.credential, "AWS.EC2.AMI", self.region);
          return amiRes.fetchAmis([amiId]).then(function() {
            var amiData, result, _ref;
            amiData = amiRes.where({
              id: amiId
            });
            result = {
              "ami": {
                "curPageNum": 1,
                "result": {},
                "totalNum": 0,
                "totalPageNum": 1
              }
            };
            if (amiData.length > 0) {
              result.ami.result[amiId] = amiData[0].toJSON();
              result.ami.totalNum = 1;
            }
            result = self.addFavStar(result);
            self.communityAmiData = ((_ref = result.ami) != null ? _ref.result : void 0) || {};
            return self.communityAmiRender(result);
          });
        } else {
          return ApiRequest("aws_public", {
            region_name: this.region,
            filters: {
              ami: {
                name: name,
                platform: platform,
                isPublic: isPublic,
                architecture: architecture,
                rootDeviceType: rootDeviceType,
                perPageNum: perPageNum,
                returnPage: returnPage
              }
            }
          }).then(function(result) {
            var _ref;
            result = self.addFavStar(result);
            self.communityAmiData = ((_ref = result.ami) != null ? _ref.result : void 0) || {};
            return self.communityAmiRender(result);
          }, function(result) {
            notification('error', lang.NOTIFY.UNABLE_TO_LOAD_COMMUNITY_AMIS);
            return self.communityAmiRender({
              ami: []
            });
          });
        }
      },
      searchPrev: function() {
        var page;
        page = parseInt($("#community_ami_page_current").attr("page"), 10);
        return this.doSearch(page + 1);
      },
      searchNext: function() {
        var page;
        page = parseInt($("#community_ami_page_current").attr("page"), 10);
        return this.doSearch(page - 1);
      },
      search: function(event) {
        if (event.keyCode && event.keyCode !== 13) {
          return;
        }
        return this.doSearch();
      },
      addFavStar: function(result) {
        var dumpObj, favAmis, favIds;
        favAmis = CloudResources(this.credential, "FavoriteAmi", this.region).getModels() || [];
        dumpObj = _.clone(result.ami.result);
        favIds = _.pluck(_.pluck(favAmis, "attributes"), "id");
        _.each(dumpObj, function(e, k) {
          if (__indexOf.call(favIds, k) >= 0) {
            return e.faved = true;
          }
        });
        result.ami.result = dumpObj;
        return result;
      },
      communityAmiRender: function(data) {
        var totalNum;
        this.communityShowContent();
        totalNum = 0;
        if (!data.ami) {
          return;
        }
        data = data.ami;
        $("#community_ami_table").html(TplAmiBrowser.amiItem(data.result));
        return this.communityPagerRender(data.curPageNum, data.totalPageNum, data.totalNum);
      },
      communityPagerRender: function(current_page, max_page, total) {
        var itemBegin, itemEnd, pageSize, pagination, resourceView;
        resourceView = this;
        pageSize = total > 50 ? 50 : total;
        itemBegin = (current_page - 1) * 50 + 1;
        itemEnd = itemBegin + pageSize - 1;
        if (itemEnd > total) {
          itemEnd = total;
        }
        if (itemEnd === 0) {
          itemBegin = 0;
        }
        $('.page-tip').text(sprintf(lang.IDE.AMI_LBL_PAGEINFO, itemBegin, itemEnd, total));
        pagination = $('.pagination');
        if (max_page === 0) {
          pagination.hide();
        } else {
          pagination.show();
        }
        if (pagination.data('jqPagination')) {
          pagination.jqPagination('destroy');
          pagination.find('input').data('current-page', current_page);
        }
        return pagination.jqPagination({
          current_page: current_page,
          max_page: max_page,
          page_string: "{current_page} / {max_page}",
          paged: (function(current_page, max_page) {
            return function(page) {
              if (page !== current_page && (max_page >= page && page > 0)) {
                return resourceView.doSearch(page);
              }
            };
          })(current_page, max_page)
        });
      },
      communityShowContent: function() {
        $(".show-loading").hide();
        $("#ami-table-wrap .scroll-content").show();
        $("#btn-search-ami").text(lang.IDE.AMI_LBL_SEARCH).removeAttr("disabled");
        return $("#community-ami-page>div").show();
      },
      renderAmiLoading: function() {
        $("#ami-table-wrap .scroll-content").hide();
        $(".show-loading").show();
        $("#btn-search-ami").text(lang.IDE.AMI_LBL_SEARCHING).attr("disabled", "");
        return $("#community-ami-page>div").hide();
      }
    });
  });

}).call(this);
