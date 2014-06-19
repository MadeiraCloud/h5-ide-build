(function() {
  define(['UI.modalplus', './resDiffTpl', './DiffTree', './prepare'], function(modalplus, template, DiffTree, Prepare) {
    return Backbone.View.extend({
      className: 'res_diff_tree',
      tagName: 'section',
      initialize: function(option) {
        this.oldAppJSON = option.old;
        this.newAppJSON = option["new"];
        this.prepare = new Prepare({
          oldAppJSON: this.oldAppJSON,
          newAppJSON: this.newAppJSON
        });
        return this._genDiffInfo(this.oldAppJSON.component, this.newAppJSON.component);
      },
      events: {
        'click .item .type': '_toggleTab',
        'click .head': '_toggleItem'
      },
      _toggleItem: function(e) {
        var $target;
        $target = $(e.currentTarget).closest('.group');
        return $target.toggleClass('closed');
      },
      _toggleTab: function(e) {
        var $target;
        $target = $(e.currentTarget).closest('.item');
        if ($target.hasClass('end')) {
          return;
        }
        return $target.toggleClass('closed');
      },
      render: function() {
        var options;
        options = {
          template: this.el,
          title: 'App Changes',
          hideClose: true,
          disableClose: true,
          disableCancel: true,
          cancel: {
            hide: true
          },
          confirm: {
            text: 'OK, got it'
          },
          width: '608px',
          compact: true
        };
        this.modal = new modalplus(options);
        this.modal.on('confirm', function() {
          return this.modal.close();
        }, this);
        this.$el.html(template.frame());
        this._genResGroup(this.oldAppJSON.component, this.newAppJSON.component);
        return this.modal.resize();
      },
      _genDiffInfo: function(oldComps, newComps) {
        var diffTree, that, unionNewComps, unionOldComps;
        that = this;
        that.addedComps = {};
        that.removedComps = {};
        that.modifiedComps = {};
        unionOldComps = {};
        unionNewComps = {};
        _.each(oldComps, function(comp, uid) {
          if (newComps[uid]) {
            unionOldComps[uid] = oldComps[uid];
            unionNewComps[uid] = newComps[uid];
          } else {
            that.removedComps[uid] = oldComps[uid];
          }
          return null;
        });
        _.each(_.keys(newComps), function(uid) {
          if (!oldComps[uid]) {
            that.addedComps[uid] = newComps[uid];
          }
          return null;
        });
        diffTree = new DiffTree({});
        that.modifiedComps = diffTree.compare(unionOldComps, unionNewComps);
        if (!that.modifiedComps) {
          return that.modifiedComps = {};
        }
      },
      _genResGroup: function() {
        var $group, compCount, data, groupData, that, _i, _len, _results;
        that = this;
        groupData = [
          {
            title: 'New Resource',
            diffComps: that.addedComps,
            closed: true,
            type: 'added',
            needDiff: false
          }, {
            title: 'Removed Resource',
            diffComps: that.removedComps,
            closed: true,
            type: 'removed',
            needDiff: false
          }, {
            title: 'Modified Resource',
            diffComps: that.modifiedComps,
            closed: false,
            type: 'modified',
            needDiff: true
          }
        ];
        _results = [];
        for (_i = 0, _len = groupData.length; _i < _len; _i++) {
          data = groupData[_i];
          compCount = _.keys(data.diffComps).length;
          if (compCount) {
            $group = $(template.resDiffGroup({
              type: data.type,
              title: data.title,
              count: compCount
            })).appendTo(this.$('article'));
            _results.push(this._genResTree($group.find('.content'), data.diffComps, data.closed, data.needDiff));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },
      _genResTree: function($container, diffComps, closed, needDiff) {
        var that, _genTree;
        that = this;
        _genTree = function(value, key, path, $parent) {
          var $diffTree, $treeItem, changeType, data, nextPath, type, type1, value1, __value, _key, _results, _value;
          if (_.isObject(value)) {
            if (_.isUndefined(value.__new__) && _.isUndefined(value.__old__)) {
              $diffTree = $(template.resDiffTree({})).appendTo($parent);
              _results = [];
              for (_key in value) {
                _value = value[_key];
                __value = _.isObject(_value) ? '' : _value;
                nextPath = path.concat([_key]);
                data = this.prepare.node(nextPath, {
                  key: _key,
                  value: __value,
                  originValue: _value
                });
                if (data.key) {
                  if (data.skip) {
                    $treeItem = $parent;
                    $diffTree.remove();
                  } else {
                    $treeItem = $(template.resDiffTreeItem({
                      key: data.key,
                      value: data.value,
                      closed: closed
                    })).appendTo($diffTree);
                    if (!_.isObject(_value)) {
                      $treeItem.addClass('end');
                    }
                  }
                  if (_.isArray(_value) && _value.length === 0) {
                    _results.push($treeItem.remove());
                  } else {
                    _results.push(_genTree.call(that, _value, _key, nextPath, $treeItem));
                  }
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            } else {
              changeType = value.type;
              data = this.prepare.node(path, {
                key: key,
                value: value
              });
              if (data.key) {
                type = value1 = type1 = '';
                if (_.isObject(data.value)) {
                  if (data.value.type === 'added') {
                    value = data.value["new"];
                    type = 'new';
                  } else if (data.value.type === 'removed') {
                    value = data.value.old;
                    type = 'old';
                  } else if (data.value.type === 'changed') {
                    value = data.value.old;
                    value1 = data.value["new"];
                    type = 'old';
                    type1 = 'new';
                  }
                } else {
                  value = data.value;
                }
                $parent.html(template.resDiffTreeMeta({
                  key: data.key,
                  value: value,
                  type: type,
                  value1: value1,
                  type1: type1,
                  closed: closed
                }));
                $parent.addClass('end');
                return $parent.addClass(changeType);
              } else {
                return $parent.remove();
              }
            }
          }
        };
        return _genTree.call(that, diffComps, null, [], $container);
      },
      getChangeInfo: function() {
        var hasResChange, needUpdateLayout, that;
        that = this;
        hasResChange = false;
        if (_.size(that.addedComps) || _.size(that.removedComps) || _.size(that.modifiedComps)) {
          hasResChange = true;
        }
        needUpdateLayout = _.some(that.addedComps, function(comp) {
          return that.newAppJSON.layout[comp.uid];
        });
        return {
          hasResChange: hasResChange,
          needUpdateLayout: needUpdateLayout
        };
      }
    });
  });

}).call(this);
