(function() {
  define(['../base/view', './template/stack', 'event', 'i18n!/nls/lang.js'], function(PropertyView, template, ide_event, lang) {
    var ElbView, Helper;
    Helper = {
      makeInRange: function(value, range, $target, deflt) {
        var begin, end;
        begin = range[0];
        end = range[1];
        if (isFinite(value)) {
          value = +value;
          if (value < begin) {
            value = begin;
          } else if (value > end) {
            value = end;
          }
        } else {
          value = deflt;
        }
        $target.val(value);
        return value;
      }
    };
    ElbView = PropertyView.extend({
      events: {
        'keyup #property-elb-name': 'elbNameChange',
        'change #property-res-desc': 'onChangeDesc',
        'change #elb-scheme-select1': "schemeSelectChange",
        'change #elb-scheme-select2': "schemeSelectChange",
        'OPTION_CHANGE #elb-property-health-protocol-select': "healthProtocolSelect",
        'change #property-elb-health-port': 'healthPortChanged',
        'change #property-elb-health-path': 'healthPathChanged',
        'change #property-elb-health-interval': 'healthIntervalChanged',
        'change #property-elb-health-timeout': 'healthTimeoutChanged',
        'OPTION_CHANGE .elb-property-elb-protocol': 'protocolChanged',
        'OPTION_CHANGE .elb-property-instance-protocol': 'protocolChanged',
        'change .elb-property-elb-port': 'portChanged',
        'change .elb-property-instance-port': 'portChanged',
        'click #elb-property-listener-content-add': 'listenerItemAddClicked',
        'click .elb-property-listener-item-remove': 'listenerItemRemovedClicked',
        'change #elb-property-cert-name-input': 'listenerCertChanged',
        'change #elb-property-cert-privatekey-input': 'listenerCertChanged',
        'change #elb-property-cert-publickey-input': 'listenerCertChanged',
        'change #elb-property-cert-chain-input': 'listenerCertChanged',
        'change .property-elb-az-checkbox': 'azCheckChanged',
        'mousedown .slider .thumb': "sliderMouseDown",
        'mousedown .slider li': "sliderSelect",
        'SLIDER_CHANGE .slider': 'sliderChanged',
        'change #elb-cross-az-select': 'elbCrossAZSelect',
        'click #sslcert-select .item': 'changeSSLCert',
        'click #elb-connection-draining-select': 'elbConnectionDrainSelectChange',
        'change #elb-connection-draining-input': 'elbConnectionDrainTimeoutChange',
        'click #elb-advanced-proxy-protocol-select': 'elbAdvancedProxyProtocolSelectChange',
        'change #property-elb-idle-timeout': 'elbIdleTimeoutChange'
      },
      render: function() {
        var that;
        that = this;
        this.$el.html(template(this.model.attributes));
        this.updateSlider($('#elb-property-slider-unhealthy'), this.model.get('unHealthyThreshold') - 2);
        this.updateSlider($('#elb-property-slider-healthy'), this.model.get('healthyThreshold') - 2);
        _.each(this.$('.sslcert-placeholder'), function(sslCertPlaceHolder, idx) {
          var $listenerItem, $sslCertPlaceHolder, sslCertDropDown;
          $sslCertPlaceHolder = $(sslCertPlaceHolder);
          $listenerItem = $sslCertPlaceHolder.parents('.elb-property-listener');
          sslCertDropDown = that.model.initNewSSLCertDropDown(idx);
          $listenerItem.data('sslCertDropDown', sslCertDropDown);
          return $sslCertPlaceHolder.html(sslCertDropDown.render().el);
        });
        this.updateCertView();
        return this.model.attributes.name;
      },
      elbNameChange: function(event) {
        var name, newName, oldName, target;
        target = $(event.currentTarget);
        name = target.val();
        oldName = this.model.get("name");
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "Load Balancer")) {
          this.model.setName(name);
          this.setTitle(name);
          oldName += "-sg";
          newName = name + "-sg";
          return $("#sg-info-list").children().each(function() {
            var $name;
            $name = $(this).find(".sg-name");
            if ($name.text() === oldName) {
              $name.text(newName);
              return false;
            }
          });
        }
      },
      onChangeDesc: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
      },
      schemeSelectChange: function(event) {
        this.model.setScheme(event.currentTarget.value);
        return null;
      },
      healthProtocolSelect: function(event, value) {
        if (value === "TCP" || value === "SSL") {
          $('#property-elb-health-path').attr('disabled', 'disabled');
        } else {
          $('#property-elb-health-path').removeAttr('disabled');
        }
        return this.model.setHealthProtocol(value);
      },
      healthPortChanged: function(event) {
        var $target, value;
        $target = $(event.currentTarget);
        value = $target.val();
        value = Helper.makeInRange(value, [1, 65535], $target, 1);
        return this.model.setHealthPort(value);
      },
      healthPathChanged: function(event) {
        return this.model.setHealthPath($(event.currentTarget).val());
      },
      healthIntervalChanged: function(event) {
        var $target, $timeoutDom, value;
        $target = $(event.currentTarget);
        value = Helper.makeInRange($target.val(), [5, 300], $target, 30);
        $timeoutDom = $('#property-elb-health-timeout');
        $target.parsley('custom', function(val) {
          var intervalValue, timeoutValue;
          intervalValue = Number(val);
          timeoutValue = Number($timeoutDom.val());
          if (intervalValue <= timeoutValue) {
            return lang.PROP.ELB_HEALTH_INTERVAL_VALID;
          }
          return null;
        });
        if (!$target.parsley('validate')) {
          return;
        } else {
          $timeoutDom.parsley('validate');
        }
        return this.model.setHealthInterval(value);
      },
      healthTimeoutChanged: function(event) {
        var $intervalDom, $target, value;
        $target = $(event.currentTarget);
        value = Helper.makeInRange($target.val(), [2, 60], $target, 5);
        $intervalDom = $('#property-elb-health-interval');
        $target.parsley('custom', function(val) {
          var intervalValue, timeoutValue;
          intervalValue = Number($intervalDom.val());
          timeoutValue = Number(val);
          if (intervalValue <= timeoutValue) {
            return lang.PROP.ELB_HEALTH_INTERVAL_VALID;
          }
          return null;
        });
        if (!$target.parsley('validate')) {
          return;
        } else {
          $intervalDom.parsley('validate');
        }
        return this.model.setHealthTimeout(value);
      },
      elbIdleTimeoutChange: function(event) {
        var $target;
        $target = $(event.currentTarget);
        if ($target.parsley('validate')) {
          return this.model.setIdletimeout(Number($target.val()));
        }
      },
      sliderChanged: function(event, value) {
        var id, target;
        target = $(event.target);
        id = event.target.id;
        value += 2;
        if (id === 'elb-property-slider-unhealthy') {
          return this.model.setHealthUnhealth(value);
        } else {
          return this.model.setHealthHealth(value);
        }
      },
      listenerItemAddClicked: function(event) {
        var $li, $listenerItem, $portInput, $selectbox, $sslCertPlaceHolder, sslCertDropDown, that;
        that = this;
        $li = $("#elb-property-listener-list").children().eq(0).clone();
        $selectbox = $li.find("ul");
        $portInput = $li.find('input.input');
        $portInput.val('80');
        $selectbox.children(".selected").removeClass("selected");
        $selectbox.children(":first-child").addClass("selected");
        $selectbox.prev(".selection").text("HTTP");
        $('#elb-property-listener-list').append($li);
        this.updateListener($li);
        $sslCertPlaceHolder = $li.find('.sslcert-placeholder');
        $listenerItem = $sslCertPlaceHolder.parents('.elb-property-listener');
        sslCertDropDown = that.model.initNewSSLCertDropDown($li.index());
        $listenerItem.data('sslCertDropDown', sslCertDropDown);
        $sslCertPlaceHolder.html(sslCertDropDown.render().el);
        return false;
      },
      updateListener: function($li) {
        var obj;
        obj = {
          port: $li.find(".elb-property-elb-port").val(),
          protocol: $li.find(".elb-property-elb-protocol .selected").text(),
          instancePort: $li.find(".elb-property-instance-port").val(),
          instanceProtocol: $li.find(".elb-property-instance-protocol .selected").text()
        };
        this.model.setListener($li.index(), obj);
        this.updateCertView();
        return null;
      },
      protocolChanged: function(event) {
        var $allSelectItem, $protocol, $selectProtocol, currentPtotocol, layerMap, newOtherProtocol, otherProtocol, otherProtocolElem, parentItemElem, portElem, thatElem, value;
        $protocol = $(event.currentTarget);
        if (event) {
          thatElem = $(event.target);
          value = thatElem.find('.selection').text();
          if (value) {
            portElem = null;
            otherProtocolElem = null;
            parentItemElem = thatElem.parents('.elb-property-listener');
            if (thatElem.hasClass('elb-property-elb-protocol')) {
              portElem = parentItemElem.find('.elb-property-elb-port');
              otherProtocolElem = parentItemElem.find('.elb-property-instance-protocol');
            } else {
              portElem = parentItemElem.find('.elb-property-instance-port');
              otherProtocolElem = parentItemElem.find('.elb-property-elb-protocol');
            }
            if (value === 'HTTPS' || value === 'SSL') {
              portElem.val('443');
            } else {
              portElem.val('80');
            }
            layerMap = {
              'HTTP': 'application',
              'HTTPS': 'application',
              'TCP': 'transport',
              'SSL': 'transport'
            };
            currentPtotocol = value;
            otherProtocol = otherProtocolElem.find('.selection').text();
            if (layerMap[currentPtotocol] !== layerMap[otherProtocol]) {
              otherProtocolElem.find('.selection').text(currentPtotocol);
              $allSelectItem = otherProtocolElem.find('.item');
              $allSelectItem.removeClass('selected');
              $selectProtocol = otherProtocolElem.find("[data-id=" + currentPtotocol + "]");
              $selectProtocol.addClass('selected');
            }
            if (otherProtocolElem.hasClass('elb-property-elb-protocol')) {
              portElem = parentItemElem.find('.elb-property-elb-port');
            } else {
              portElem = parentItemElem.find('.elb-property-instance-port');
            }
            newOtherProtocol = otherProtocolElem.find('.selection').text();
            if (newOtherProtocol === 'HTTPS' || newOtherProtocol === 'SSL') {
              portElem.val('443');
            } else {
              portElem.val('80');
            }
          }
        }
        this.updateListener($protocol.closest("li"));
        return null;
      },
      portChanged: function(event) {
        var $input, validate;
        $input = $(event.currentTarget);
        if ($input.hasClass("elb-property-elb-port")) {
          validate = function(val) {
            val = parseInt(val, 10);
            if (!(val === 25 || val === 80 || val === 443 || ((1023 < val && val < 65536)))) {
              return lang.PARSLEY.LOAD_BALANCER_PORT_MUST_BE_SOME_PROT;
            }
          };
        } else {
          validate = function(val) {
            val = parseInt(val, 10);
            if (!((0 < val && val < 65536))) {
              return lang.PARSLEY.INSTANCE_PORT_MUST_BE_BETWEEN_1_AND_65535;
            }
          };
        }
        $input.parsley("custom", validate);
        if ($input.parsley("validate")) {
          this.updateListener($input.closest("li"));
        }
        return null;
      },
      listenerItemChanged: function(event) {
        var currentPtotocol, hasValidateError, isShowCertPanel, layerMap, listenerAry, listenerContainerElem, listenerItemElem, me, newOtherProtocol, otherProtocol, otherProtocolElem, parentItemElem, portElem, thatElem, value;
        if (event) {
          thatElem = $(event.target);
          value = thatElem.find('.selection').text();
          if (value) {
            portElem = null;
            otherProtocolElem = null;
            parentItemElem = thatElem.parents('.elb-property-listener-main');
            if (thatElem.hasClass('elb-property-listener-elb-protocol-select')) {
              portElem = parentItemElem.find('.elb-property-listener-elb-port-input');
              otherProtocolElem = parentItemElem.find('.elb-property-listener-instance-protocol-select');
            } else {
              portElem = parentItemElem.find('.elb-property-listener-instance-port-input');
              otherProtocolElem = parentItemElem.find('.elb-property-listener-elb-protocol-select');
            }
            if (value === 'HTTPS' || value === 'SSL') {
              portElem.val('443');
            } else {
              portElem.val('80');
            }
            layerMap = {
              'HTTP': 'application',
              'HTTPS': 'application',
              'TCP': 'transport',
              'SSL': 'transport'
            };
            currentPtotocol = value;
            otherProtocol = otherProtocolElem.find('.selection').text();
            if (layerMap[currentPtotocol] !== layerMap[otherProtocol]) {
              otherProtocolElem.find('.selection').text(currentPtotocol);
            }
            if (otherProtocolElem.hasClass('elb-property-listener-elb-protocol-select')) {
              portElem = parentItemElem.find('.elb-property-listener-elb-port-input');
            } else {
              portElem = parentItemElem.find('.elb-property-listener-instance-port-input');
            }
            newOtherProtocol = otherProtocolElem.find('.selection').text();
            if (newOtherProtocol === 'HTTPS' || newOtherProtocol === 'SSL') {
              portElem.val('443');
            } else {
              portElem.val('80');
            }
          }
        }
        me = this;
        listenerContainerElem = $('#accordion-group-elb-property-listener');
        listenerItemElem = listenerContainerElem.find('.elb-property-listener-main');
        listenerAry = [];
        isShowCertPanel = false;
        hasValidateError = false;
        listenerItemElem.each(function(index, elem) {
          var elbPort, elbPortValue, elbProtocolValue, instancePort, instancePortValue, instanceProtocolValue, newItemObj, that;
          that = $(this);
          elbProtocolValue = $.trim(that.find('.elb-property-listener-elb-protocol-select .selection').text());
          elbPortValue = that.find('.elb-property-listener-elb-port-input').val();
          instanceProtocolValue = $.trim(that.find('.elb-property-listener-instance-protocol-select .selection').text());
          instancePortValue = that.find('.elb-property-listener-instance-port-input').val();
          elbPort = that.find('.elb-property-listener-elb-port-input');
          instancePort = that.find('.elb-property-listener-instance-port-input');
          if (elbPortValidate && instancePortValidate && !isNaN(parseInt(elbPortValue, 10)) && !isNaN(parseInt(instancePortValue, 10))) {
            newItemObj = {
              Listener: {
                "LoadBalancerPort": elbPortValue,
                "InstanceProtocol": instanceProtocolValue,
                "Protocol": elbProtocolValue,
                "SSLCertificateId": "",
                "InstancePort": instancePortValue
              },
              PolicyNames: ''
            };
            listenerAry.push(newItemObj);
          }
          if (elbProtocolValue === 'HTTPS' || elbProtocolValue === 'SSL') {
            isShowCertPanel = true;
          }
          return null;
        });
        this.model.setListenerAry(idx, listener);
        this.updateCertView();
        return null;
      },
      listenerItemRemovedClicked: function(event) {
        var $li;
        $li = $(event.currentTarget).closest("li");
        this.model.removeListener($li.index());
        $li.remove();
        this.updateCertView();
        return false;
      },
      listenerCertChanged: function(event) {
        this.model.setCert({
          name: $('#elb-property-cert-name-input').val(),
          key: $('#elb-property-cert-privatekey-input').val(),
          body: $('#elb-property-cert-publickey-input').val(),
          chain: $('#elb-property-cert-chain-input').val()
        });
        return null;
      },
      updateCertView: function() {
        $("#elb-property-listener-list").children().each(function() {
          var $certPanel, $listenerItem, protocol, sslCertDropDown;
          protocol = $(this).find(".elb-property-elb-protocol .selected").text();
          $certPanel = $(this).find(".sslcert-select");
          $listenerItem = $(this);
          sslCertDropDown = $listenerItem.data('sslCertDropDown');
          if (protocol === "HTTPS" || protocol === "SSL") {
            if (sslCertDropDown) {
              sslCertDropDown.setDefault();
            }
            return $certPanel.show();
          } else {
            if (sslCertDropDown) {
              sslCertDropDown.dropdown.setSelection('None');
            }
            return $certPanel.hide();
          }
        });
        return null;
      },
      azCheckChanged: function(event) {
        var azArray;
        azArray = _.map($("#property-elb-az-cb-group").find("input:checked"), function(cb) {
          return $(cb).attr("data-name");
        });
        this.model.updateElbAZ(azArray);
        return null;
      },
      updateSlider: function($target, value) {
        var left, step, width;
        step = $target.children(".marker").children().length - 1;
        width = $target.width();
        left = value * Math.floor(width / step);
        $target.data("value", value).children(".thumb").css("left", left);
        return null;
      },
      sliderSelect: function(event) {
        var $slider, $target, value;
        $target = $(event.currentTarget);
        $slider = $target.closest(".slider");
        value = $target.index();
        this.updateSlider($slider, value);
        $slider.trigger("SLIDER_CHANGE", value);
        return null;
      },
      sliderMouseDown: function(event) {
        var $body, $slider, $thumb, offsetStep, onMouseMove, onMouseUp, originalX, step, stepWidth, thumbPos, value, width;
        $body = $("body");
        $thumb = $(event.currentTarget);
        $slider = $thumb.closest(".slider");
        step = $slider.children(".marker").children().length - 1;
        width = $slider.width();
        stepWidth = Math.floor(width / step);
        originalX = event.clientX;
        thumbPos = $thumb.position().left;
        value = $slider.data("value");
        offsetStep = 0;
        onMouseMove = function(event) {
          var absOffset, delta, halfStepWidth, newPos, offset;
          offset = event.clientX - originalX;
          absOffset = Math.abs(offset);
          halfStepWidth = stepWidth / 2;
          if (absOffset >= halfStepWidth) {
            absOffset += halfStepWidth;
            delta = offset > 0 ? 1 : -1;
            offsetStep = Math.floor(absOffset / stepWidth) * delta;
            newPos = thumbPos + offsetStep * stepWidth;
            if (newPos < 0) {
              newPos = 0;
              offsetStep = -value;
            } else if (newPos > width) {
              newPos = width;
              offsetStep = step - value;
            }
          } else {
            newPos = thumbPos;
            offsetStep = 0;
          }
          $thumb.css("left", newPos);
          return false;
        };
        onMouseUp = function() {
          var newValue;
          $body.off("mousemove", onMouseMove);
          newValue = value + offsetStep;
          $slider.data("value", newValue).trigger("SLIDER_CHANGE", newValue);
          return null;
        };
        $body.on("mousemove", onMouseMove);
        $body.one("mouseup", onMouseUp);
        return false;
      },
      elbCrossAZSelect: function(event) {
        this.model.setElbCrossAZ(event.target.checked);
        return null;
      },
      changeSSLCert: function(event) {
        var $certItem, certUID, that;
        that = this;
        $certItem = $(event.currentTarget);
        certUID = $certItem.attr('data-id');
        that.model.changeCert(certUID);
        return ide_event.trigger(ide_event.REFRESH_PROPERTY);
      },
      elbConnectionDrainSelectChange: function(event) {
        var $inputGroup, $selectbox, $timeoutInput, selectValue, that, timeoutValue;
        that = this;
        $selectbox = that.$('#elb-connection-draining-select');
        $inputGroup = that.$('.elb-connection-draining-input-group');
        $timeoutInput = that.$('#elb-connection-draining-input');
        selectValue = $selectbox.prop('checked');
        if (selectValue) {
          $inputGroup.removeClass('hide');
        } else {
          $inputGroup.addClass('hide');
        }
        timeoutValue = Number($timeoutInput.val());
        if (selectValue && timeoutValue) {
          that.model.setConnectionDraining(true, timeoutValue);
        }
        if (!selectValue) {
          return that.model.setConnectionDraining(false);
        }
      },
      elbConnectionDrainTimeoutChange: function(event) {
        var $selectbox, $timeoutInput, selectValue, that, timeoutValue;
        that = this;
        $timeoutInput = that.$('#elb-connection-draining-input');
        $selectbox = that.$('#elb-connection-draining-select');
        selectValue = $selectbox.prop('checked');
        timeoutValue = Number($timeoutInput.val());
        $timeoutInput.parsley('custom', function(val) {
          var inputValue;
          inputValue = Number($timeoutInput.val());
          if (!(inputValue >= 1 && inputValue < 3600)) {
            return lang.PROP.ELB_CONNECTION_DRAIN_TIMEOUT_INVALID;
          }
          return null;
        });
        if (!$timeoutInput.parsley('validate')) {
          return;
        }
        if (selectValue && timeoutValue) {
          return that.model.setConnectionDraining(true, timeoutValue);
        }
      },
      elbAdvancedProxyProtocolSelectChange: function(event) {
        var $selectbox, $tipBox, selectValue, that;
        that = this;
        $selectbox = that.$('#elb-advanced-proxy-protocol-select');
        $tipBox = $('#elb-advanced-proxy-protocol-select-tip');
        selectValue = $selectbox.prop('checked');
        if (selectValue) {
          $tipBox.removeClass('hide');
        } else {
          $tipBox.addClass('hide');
        }
        return that.model.setAdvancedProxyProtocol(selectValue, [80]);
      }
    });
    return new ElbView();
  });

}).call(this);
