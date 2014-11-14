(function() {
  var ajaxChangePassword, ajaxLogin, ajaxRegister, api, checkAllCookie, checkPassKey, checkUserExist, deepth, getRef, getSearch, goto500, guid, handleErrorCode, handleNetError, i18n, init, langType, loadLang, loadPageVar, render, sendEmail, setCredit, showErrorMessage, timezone, userRoute, validPassword, xhr;

  (function() {
    var MC_DOMAIN, hosts, location;
    location = window.location;
    if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.exec(location.hostname)) {
      console.error("VisualOps IDE can not be browsed with IP address.");
      return;
    }
    hosts = location.hostname.split(".");
    if (hosts.length >= 3) {
      MC_DOMAIN = hosts[hosts.length - 2] + "." + hosts[hosts.length - 1];
    } else {
      MC_DOMAIN = location.hostname;
    }
    window.API_HOST = "api." + MC_DOMAIN;
    window.API_PROTO = location.protocol + "//";
    window.language = window.version = "";
    if (location.hostname.toLowerCase().indexOf("visualops.io") >= 0 && location.protocol === "http:") {
      window.location = location.href.replace("http:", "https:");
    }
  })();

  goto500 = function() {
    var hash;
    hash = window.location.pathname;
    if (hash.length === 1) {
      hash = "";
    } else {
      hash = hash.replace("/", "#");
    }
    window.location = '/500/' + hash;
  };

  xhr = null;

  checkAllCookie = function() {
    return !!($.cookie('usercode') && $.cookie('session_id'));
  };

  langType = function() {
    return document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + "lang\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1") || "en-us";
  };

  deepth = 'RESET';

  timezone = (new Date().getTimezoneOffset()) / -60;

  userRoute = function(routes) {
    var hashArray, pathArray, _name;
    hashArray = window.location.hash.split('#').pop().split('/');
    pathArray = window.location.pathname.split('/');
    pathArray.shift();
    if (typeof routes[_name = pathArray[0]] === "function") {
      routes[_name](pathArray, hashArray);
    }
  };

  guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    }).toUpperCase();
  };

  api = function(option) {
    xhr = $.ajax({
      url: API_PROTO + API_HOST + option.url,
      dataType: 'json',
      type: 'POST',
      jsonp: false,
      data: JSON.stringify({
        jsonrpc: '2.0',
        id: guid(),
        method: option.method || '',
        params: option.data || {}
      }),
      success: function(res) {
        return option.success(res.result[1], res.result[0]);
      },
      error: function(xhr, status, error) {
        if (status !== 'abort') {
          return option.error(status, -1);
        }
      }
    });
    return xhr;
  };

  Handlebars.registerHelper('i18n', function(str) {
    return (typeof i18n === "function" ? i18n(str) : void 0) || str;
  });

  loadPageVar = function(sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  };

  getRef = function() {
    var ref;
    ref = loadPageVar('ref');
    if (ref.charAt(0) === "/") {
      return ref;
    } else {
      return "/";
    }
  };

  getSearch = function() {
    return window.location.search || "";
  };

  loadLang = function(cb) {
    return $.ajax({
      url: '/nls/' + langType() + '/lang.js',
      jsonp: false,
      dataType: "jsonp",
      jsonpCallback: "define",
      beforeSend: function() {
        var template;
        template = Handlebars.compile($("#loading-template").html());
        return $("#main-body").html(template());
      },
      success: function(data) {
        window.langsrc = data;
      },
      error: function(error) {
        goto500();
        return console.log(error, "error");
      }
    }).done(function() {
      return cb();
    });
  };

  window.onhashchange = function() {
    return init();
  };

  i18n = function(str) {
    return langsrc[deepth][str];
  };

  render = function(tempName) {
    var template;
    template = Handlebars.compile($(tempName).html());
    return $("#main-body").html(template());
  };

  init = function() {
    var browser, safari, support, ua;
    ua = navigator.userAgent.toLowerCase();
    browser = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    support = {
      chrome: 10,
      webkit: 6,
      msie: 10,
      mozilla: 4,
      opera: 10
    };
    if (browser[1] === "webkit") {
      safari = /version\/([\d\.]+).*safari/.exec(ua);
      if (safari) {
        browser[2] = safari[1];
      }
    }
    if ((parseInt(browser[2], 10) || 0) < support[browser[1]]) {
      $("header").after("<div id='unsupported-browser'><p>" + langsrc.LOGIN.browser_not_support_1 + "</p> <p>" + langsrc.LOGIN.browser_not_support_2 + "<a href='https://www.google.com/intl/en/chrome/browser/' target='_blank'>Chrome</a>, <a href='http://www.mozilla.org/en-US/firefox/all/' target='_blank'>Firefox</a> or <a href='http://windows.microsoft.com/en-us/internet-explorer/download-ie' target='_blank'>IE</a>" + langsrc.LOGIN.browser_not_support_3 + "</p></div>");
    }
    return userRoute({
      "reset": function(pathArray, hashArray) {
        var hashTarget;
        deepth = 'RESET';
        hashTarget = hashArray[0];
        if (hashTarget === 'password') {
          return checkPassKey(hashArray[1], function(statusCode, result) {
            var tempLang;
            if (!statusCode) {
              console.log('Right Verify Code!');
              render("#password-template");
              $('form.box-body').find('input').eq(0).focus();
              return $('#reset-form').on('submit', function(e) {
                e.preventDefault();
                if (validPassword()) {
                  $("#reset-password").attr('disabled', true).val(langsrc.RESET.reset_waiting);
                  ajaxChangePassword(hashArray, $("#reset-pw").val());
                }
                return false;
              });
            } else {
              tempLang = tempLang || langsrc.RESET['expired-info'];
              langsrc.RESET['expired-info'] = langsrc.SERVICE['RESET_PASSWORD_ERROR_' + statusCode] || tempLang;
              window.location.hash = "expire";
            }
          });
        } else if (hashTarget === "expire") {
          render('#expire-template');
          return $(".account-instruction a").attr("href", "/login" + getSearch());
        } else if (hashTarget === "email") {
          render("#email-template");
          return $('form.box-body').find('input').eq(0).focus();
        } else if (hashTarget === "success") {
          render("#success-template");
          return $(".account-instruction a").attr("href", "/login" + getSearch());
        } else {
          render('#default-template');
          $(".title-link").find("a").eq(0).attr("href", "/register/" + getSearch());
          $(".title-link").find("a").eq(1).attr("href", "/login/" + getSearch());
          $("#reset-pw-email").focus();
          $('#reset-pw-email').keyup(function() {
            if (this.value) {
              return $('#reset-btn').removeAttr('disabled');
            } else {
              return $("#reset-btn").attr('disabled', true);
            }
          });
          return $('#reset-form').on('submit', function() {
            $('#reset-pw-email').off('keyup');
            $("#reset-btn").attr('disabled', true);
            $("#reset-pw-email").attr('disabled', true);
            $('#reset-btn').val(window.langsrc.RESET.reset_waiting);
            sendEmail($("#reset-pw-email").val());
            return false;
          });
        }
      },
      'login': function(pathArray, hashArray) {
        var $password, $user, checkValid, submitBtn;
        if (checkAllCookie()) {
          window.location = getRef();
        }
        deepth = 'LOGIN';
        render("#login-template");
        $(".account-btn-wrap a").attr("href", "/reset/" + getSearch());
        $("#login-register").find("a").attr("href", "/register/" + getSearch());
        $user = $("#login-user");
        $password = $("#login-password");
        submitBtn = $("#login-btn").attr('disabled', false);
        $("#login-form input").eq(0).focus();
        checkValid = function() {
          if ($(this).val().trim()) {
            return $(this).parent().removeClass('error');
          }
        };
        $user.on('keyup', checkValid);
        $password.on('keyup', checkValid);
        return $("#login-form").on('submit', function(e) {
          e.preventDefault();
          if ($user.val() && $password.val()) {
            $(".error-msg").hide();
            $(".control-group").removeClass('error');
            submitBtn.attr('disabled', true).val(langsrc.RESET.reset_waiting);
            return ajaxLogin([
              $user.val(), $password.val(), {
                timezone: timezone
              }
            ], function(statusCode) {
              if (statusCode === 100) {
                $('#error-msg-1').hide();
                $('#error-msg-3').show().text(langsrc.SERVICE.ERROR_CODE_100_MESSAGE);
              } else {
                $('#error-msg-1').show();
                $('#error-msg-3').hide();
              }
              return submitBtn.attr('disabled', false).val(langsrc.LOGIN['login-btn']);
            });
          } else {
            $("#error-msg-2").show();
            if (!$user.val().trim()) {
              $user.parent().addClass('error');
            } else {
              $user.parent().removeClass('error');
            }
            if (!$password.val().trim()) {
              $password.parent().addClass('error');
            } else {
              $password.parent().removeClass('error');
            }
            return false;
          }
        });
      },
      'register': function(pathArray, hashArray) {
        var $email, $firstName, $form, $lastName, $password, $username, ajaxCheckEmail, ajaxCheckUsername, checkEmail, checkFullname, checkPassword, checkUsername, emailTimeout, resetRegForm, usernameTimeout;
        deepth = 'REGISTER';
        if (hashArray[0] === 'success') {
          render("#success-template");
          $('#register-get-start').click(function() {
            window.location = getRef();
          });
          return false;
        }
        if (checkAllCookie()) {
          window.location = getRef();
        }
        render('#register-template');
        $(".title-link a").attr("href", "/login/" + getSearch());
        $form = $("#register-form");
        $form.find('input').eq(0).focus();
        $firstName = $("#register-firstname");
        $lastName = $("#register-lastname");
        $username = $('#register-username');
        $email = $('#register-email');
        $password = $('#register-password');
        usernameTimeout = void 0;
        emailTimeout = void 0;
        $('#register-btn').attr('disabled', false);
        checkFullname = function(e, cb) {
          var firstName, lastName, status;
          status = $("#fullname-verification-status");
          firstName = $firstName.val();
          lastName = $lastName.val();
          if (firstName.trim() === "" || lastName.trim() === "") {
            status.removeClass("verification-status").addClass('error-status').text(langsrc.REGISTER.firstname_and_lastname_required);
            return false;
          } else {
            status.removeClass('verification-status').removeClass('error-status').text("");
            return true;
          }
        };
        checkUsername = function(e, cb) {
          var status, username;
          username = $username.val();
          status = $('#username-verification-status');
          if (username.trim() !== "") {
            if (/[^A-Za-z0-9\_]{1}/.test(username) !== true) {
              if (username.length > 40) {
                status.removeClass('verification-status').addClass('error-status').text(langsrc.REGISTER.username_maxlength);
                if (cb) {
                  return cb(0);
                } else {
                  return false;
                }
              } else {
                if (status.hasClass('error-status')) {
                  status.removeClass('verification-status').removeClass('error-status').text("");
                }
                if (cb) {
                  return ajaxCheckUsername(username, status, cb);
                } else {
                  return true;
                }
              }
            } else {
              status.removeClass('verification-status').addClass('error-status').text(langsrc.REGISTER.username_not_matched);
              if (cb) {
                return cb(0);
              } else {
                return false;
              }
            }
          } else {
            status.removeClass('verification-status').addClass('error-status').text(langsrc.REGISTER.username_required);
            if (cb) {
              return cb(0);
            } else {
              return false;
            }
          }
        };
        checkEmail = function(e, cb, weak) {
          var email, reg_str, status;
          email = $email.val();
          status = $("#email-verification-status");
          reg_str = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (email.trim() !== "") {
            if (reg_str.test(email)) {
              if (status.hasClass('error-status')) {
                status.removeClass('verification-status').removeClass('error-status').text("");
              }
              if (cb) {
                return ajaxCheckEmail(email, status, cb);
              } else {
                return true;
              }
            } else {
              status.removeClass('verification-status').addClass('error-status').text(langsrc.REGISTER.email_not_valid);
              if (cb) {
                return cb(0);
              } else {
                return false;
              }
            }
          } else {
            status.removeClass('verification-status').addClass('error-status').text(langsrc.REGISTER.email_required);
            if (cb) {
              return cb(0);
            } else {
              return false;
            }
          }
        };
        checkPassword = function(e, cb) {
          var password, status;
          password = $password.val();
          status = $("#password-verification-status");
          if (password !== "") {
            if (password.length > 5) {
              status.removeClass('verification-status').removeClass('error-status').text("");
              if (cb) {
                return cb(1);
              } else {
                return true;
              }
            } else {
              status.removeClass('verification-status').addClass('error-status').text(langsrc.REGISTER.password_shorter);
              if (cb) {
                return cb(0);
              } else {
                return false;
              }
            }
          } else {
            status.removeClass('verification-status').addClass('error-status').text(langsrc.REGISTER.password_required);
            if (cb) {
              return cb();
            } else {
              return false;
            }
          }
        };
        ajaxCheckUsername = function(username, status, cb) {
          if (xhr != null) {
            xhr.abort();
          }
          window.clearTimeout(usernameTimeout);
          usernameTimeout = window.setTimeout(function() {
            return checkUserExist([username, null], function(statusCode) {
              if (!statusCode) {
                if (!checkUsername()) {
                  return false;
                }
                status.removeClass('error-status').addClass('verification-status').show().text(langsrc.REGISTER.username_available);
                return typeof cb === "function" ? cb(1) : void 0;
              } else if (statusCode === 'error') {
                $('.error-msg').eq(0).text(langsrc.SERVICE.NETWORK_ERROR).show();
                return $('#register-btn').attr('disabled', false).val(langsrc.REGISTER["register-btn"]);
              } else if (checkUsername()) {
                status.removeClass('verification-status').addClass('error-status').text(langsrc.REGISTER.username_taken);
                return typeof cb === "function" ? cb(0) : void 0;
              } else {
                return typeof cb === "function" ? cb(0) : void 0;
              }
            });
          }, 500);
        };
        ajaxCheckEmail = function(email, status, cb) {
          if (xhr != null) {
            xhr.abort();
          }
          window.clearTimeout(emailTimeout);
          emailTimeout = window.setTimeout(function() {
            return checkUserExist([null, email], function(statusCode) {
              if (!statusCode) {
                if (!checkEmail()) {
                  return false;
                }
                status.removeClass('error-status').addClass('verification-status').show().text(langsrc.REGISTER.email_available);
                return typeof cb === "function" ? cb(1) : void 0;
              } else if (statusCode === 'error') {
                $('.error-msg').eq(0).text(langsrc.SERVICE.NETWORK_ERROR).show();
                return $('#register-btn').attr('disabled', false).val(langsrc.REGISTER["register-btn"]);
              } else {
                status.removeClass('verification-status').addClass('error-status').text(langsrc.REGISTER.email_used);
                return typeof cb === "function" ? cb(0) : void 0;
              }
            });
          }, 500);
        };
        resetRegForm = function(force) {
          if (force) {
            $(".verification-status").removeAttr('style');
            $('.error-status').removeClass('error-status');
          }
          return $('#register-btn').attr('disabled', false).val(langsrc.REGISTER['register-btn']);
        };
        $username.on('keyup blur change', function(e) {
          return checkUsername(e, function(a) {
            if (!a) {
              resetRegForm();
            }
            return a;
          });
        });
        $firstName.on('keyup blur change', function() {
          return checkFullname();
        });
        $lastName.on('keyup blur change', function() {
          return checkFullname();
        });
        $email.on('keyup blur change', function(e) {
          return checkEmail(e, function(a) {
            if (!a) {
              resetRegForm();
            }
            return a;
          });
        });
        $password.on('keyup blur change', function(e) {
          return checkPassword(e, function(a) {
            if (!a) {
              resetRegForm();
            }
            return a;
          });
        });
        return $form.on('submit', function(e) {
          var emailResult, fullnameResult, passwordResult, userResult;
          e.preventDefault();
          $('.error-msg').removeAttr('style');
          if ($username.next().hasClass('error-status') || $email.next().hasClass('error-status')) {
            return false;
          }
          fullnameResult = checkFullname();
          userResult = checkUsername();
          emailResult = checkEmail();
          passwordResult = checkPassword();
          if (!(userResult && emailResult && passwordResult && fullnameResult)) {
            return false;
          }
          $('#register-btn').attr('disabled', true).val(langsrc.REGISTER.reginster_waiting);
          return checkUsername(e, function(usernameAvl) {
            if (!usernameAvl) {
              resetRegForm();
              return false;
            }
            return checkEmail(e, function(emailAvl) {
              if (!emailAvl) {
                resetRegForm();
                return false;
              }
              return checkPassword(e, function(passwordAvl) {
                if (!passwordAvl) {
                  resetRegForm();
                  return false;
                }
                if (usernameAvl && emailAvl && passwordAvl) {
                  return ajaxRegister([
                    $username.val(), $password.val(), $email.val(), {
                      first_name: $firstName.val(),
                      last_name: $lastName.val(),
                      timezone: timezone
                    }
                  ], function(statusCode) {
                    resetRegForm(true);
                    $("#register-status").show().text(langsrc.SERVICE['ERROR_CODE_' + statusCode + '_MESSAGE']);
                    return false;
                  });
                }
              });
            });
          });
        });
      }
    });
  };

  validPassword = function() {
    var status, value;
    status = $("#password-verification-status");
    value = $("#reset-pw").val();
    status.removeClass('error-status');
    if (value !== "") {
      if (value.length > 5) {
        status.hide();
        return true;
      } else {
        status.addClass("error-status").show().text(langsrc.RESET.reset_password_shorter);
        return false;
      }
    } else {
      status.addClass("error-status").show().text(langsrc.RESET.reset_password_required);
      return false;
    }
  };

  showErrorMessage = function() {
    $('#reset-pw-email').attr('disabled', false);
    $("#reset-btn").attr('disabled', false).val(window.langsrc.RESET.reset_btn);
    $("#reset-status").removeClass('verification-status').addClass("error-msg").show().text(langsrc.RESET.reset_error_state);
    return false;
  };

  handleErrorCode = function(statusCode) {
    return console.error('ERROR_CODE_MESSAGE', langsrc.SERVICE["ERROR_CODE_" + statusCode + "_MESSAGE"]);
  };

  handleNetError = function(status) {
    goto500();
    return console.error(status, "Net Work Error, Redirecting...");
  };

  checkPassKey = function(keyToValid, fn) {
    return api({
      url: '/account/',
      method: 'check_validation',
      data: [keyToValid, 'reset'],
      success: function(result, statusCode) {
        console.log(statusCode, result);
        return fn(statusCode);
      },
      error: function(status) {
        handleNetError(status);
        return false;
      }
    });
  };

  setCredit = function(result) {
    var COOKIE_OPTION, cValue, ckey, domain, _ref;
    domain = {
      "domain": window.location.hostname.replace("ide", "")
    };
    _ref = $.cookie();
    for (ckey in _ref) {
      cValue = _ref[ckey];
      if (ckey !== 'stack_store_id_local' && ckey !== 'stack_store_id') {
        $.removeCookie(ckey, domain);
      }
    }
    COOKIE_OPTION = {
      expires: 30,
      path: '/'
    };
    $.cookie("usercode", result.username, COOKIE_OPTION);
    $.cookie("session_id", result.session_id, COOKIE_OPTION);
    return $.cookie("has_session", !!result.session_id, {
      domain: window.location.hostname.replace("ide", ""),
      path: "/",
      expires: 30
    });
  };

  ajaxRegister = function(params, errorCB) {
    return api({
      url: '/account/',
      method: 'register',
      data: params,
      success: function(result, statusCode) {
        if (!statusCode) {
          setCredit(result);
          window.location.hash = "success";
        } else {
          return errorCB(statusCode);
        }
      },
      error: function(status) {
        return handleNetError(status);
      }
    });
  };

  ajaxLogin = function(params, errorCB) {
    return api({
      url: '/session/',
      method: 'login',
      data: params,
      success: function(result, statusCode) {
        if (!statusCode) {
          setCredit(result);
          window.location = getRef();
        } else {
          return errorCB(statusCode);
        }
      },
      error: function(status) {
        return handleNetError(status);
      }
    });
  };

  sendEmail = function(params) {
    return checkUserExist([params, null], function(statusCode) {
      if (!statusCode) {
        showErrorMessage();
        return false;
      }
      return api({
        url: '/account/',
        method: 'reset_password',
        data: [params],
        success: function(result, statusCode) {
          if (!statusCode) {
            window.location.hash = 'email';
            return true;
          } else {
            handleErrorCode(statusCode);
            showErrorMessage();
            return false;
          }
        },
        error: function(status) {
          return handleNetError(status);
        }
      });
    });
  };

  checkUserExist = function(params, fn) {
    return api({
      url: '/account/',
      method: 'check_repeat',
      data: params,
      success: function(result, statusCode) {
        return fn(statusCode);
      },
      error: function(status) {
        return fn('error');
      }
    });
  };

  ajaxChangePassword = function(hashArray, newPw) {
    return api({
      url: "/account/",
      method: "update_password",
      data: [hashArray[1], newPw],
      success: function(result, statusCode) {
        if (!statusCode) {
          window.location.hash = 'success';
        } else {
          return handleErrorCode(statusCode);
        }
      },
      error: function(status) {
        return handleNetError(status);
      }
    });
  };

  loadLang(init);

}).call(this);
