(function() {
  define('CanvasManager',['CloudResources'], function(CloudResources) {
    var CanvasManager;
    CanvasManager = {
      removeClass: function(element, theClass) {
        var klass, newKlass;
        if (element.length) {
          element = element[0];
        }
        if (!element) {
          return this;
        }
        klass = element.getAttribute("class") || "";
        newKlass = klass.replace(new RegExp("\\b" + theClass + "\\b", "g"), "");
        if (klass !== newKlass) {
          element.setAttribute("class", newKlass);
        }
        return this;
      },
      addClass: function(element, theClass) {
        var klass;
        if (element.length) {
          element = element[0];
        }
        if (!element) {
          return this;
        }
        klass = element.getAttribute("class") || "";
        if (!klass.match(new RegExp("\\b" + theClass + "\\b"))) {
          klass = $.trim(klass) + " " + theClass;
          element.setAttribute("class", klass);
        }
        return this;
      },
      toggle: function(element, isShow) {
        if (element.hasOwnProperty("length")) {
          element = element[0];
        }
        if (!element) {
          return this;
        }
        if (isShow === null || isShow === void 0) {
          isShow = element.getAttribute("display") === "none";
        }
        if (isShow) {
          element.setAttribute("display", "inline");
          element.setAttribute("style", "");
          if (element.getAttribute("data-tooltip")) {
            this.addClass(element, "tooltip");
          }
        } else {
          element.setAttribute("display", "none");
          element.setAttribute("style", "opacity:0");
          this.removeClass(element, "tooltip");
        }
        return this;
      },
      updateEip: function(node, targetModel) {
        var imgUrl, res, resource_list, toggle, tootipStr;
        if (node.length) {
          node = node[0];
        }
        toggle = targetModel.hasPrimaryEip();
        if (toggle) {
          tootipStr = 'Detach Elastic IP from primary IP';
          imgUrl = 'ide/icon/eip-on.png';
        } else {
          tootipStr = 'Associate Elastic IP to primary IP';
          imgUrl = 'ide/icon/eip-off.png';
        }
        if (targetModel.design().modeIsApp() || targetModel.design().modeIsAppView()) {
          resource_list = CloudResources(targetModel.type, targetModel.design().region());
          res = resource_list.get(targetModel.get('appId'));
          if (toggle && res) {
            res = res != null ? res.toJSON() : void 0;
            if (res.privateIpAddressesSet && res.privateIpAddressesSet.item && res.privateIpAddressesSet.item.length) {
              res = res.privateIpAddressesSet.item[0];
              if (res.association && res.association) {
                tootipStr = res.association.publicIp || "";
              }
            } else {
              tootipStr = res.ipAddress || "";
            }
          } else {
            tootipStr = "";
          }
        }
        node.setAttribute("data-tooltip", tootipStr);
        $(node).data("tooltip", tootipStr);
        this.update(node, imgUrl, "href");
        return null;
      },
      update: function(element, value, attr) {
        var href;
        if (_.isString(element)) {
          element = document.getElementById(element);
        }
        element = $(element);
        if (!attr) {
          return element.text(MC.truncate(value, 17));
        } else if (attr === "href" || attr === "image") {
          value = MC.IMG_URL + value;
          href = element[0].getAttributeNS("http://www.w3.org/1999/xlink", "href");
          if (href !== value) {
            return element[0].setAttributeNS("http://www.w3.org/1999/xlink", "href", value);
          }
        } else if (attr === "tooltip") {
          element.data("tooltip", value).attr("data-tooltip", value);
          if (value) {
            return CanvasManager.addClass(element, "tooltip");
          } else {
            return CanvasManager.removeClass(element, "tooltip");
          }
        } else if (attr === "color") {
          return element.attr("style", "fill:" + value);
        } else {
          return element.attr(attr, value);
        }
      },
      size: function(node, w, h, oldw, oldh) {
        var $node, $ports, $wrap, child, childMap, deltaW, newX, newY, pad, transform, transformReg, x, y, _i, _j, _len, _len1;
        pad = 10;
        w *= MC.canvas.GRID_WIDTH;
        h *= MC.canvas.GRID_HEIGHT;
        oldw *= MC.canvas.GRID_WIDTH;
        deltaW = w - oldw;
        $node = $(node);
        $node.children("group").attr("width", w).attr("height", h);
        $ports = $node.children("path");
        transformReg = /translate\(([^)]+)\)/;
        for (_i = 0, _len = $ports.length; _i < _len; _i++) {
          child = $ports[_i];
          transform = transformReg.exec(child.getAttribute("class"));
          if (transform && transform[1]) {
            transform = transform[1].split(",");
            newX = x = parseInt(transform[0], 10);
            y = parseInt(transform[1], 10);
            newY = h / 2;
            if (x >= oldw) {
              newX += deltaW;
            }
            if (x !== newX || y !== newY) {
              this.position(child, newX, newY);
            }
          }
        }
        $wrap = $node.children('.resizer-wrap').children();
        if ($wrap.length) {
          childMap = {};
          for (_j = 0, _len1 = $wrap.length; _j < _len1; _j++) {
            child = $wrap[_j];
            childMap[child.getAttribute("class")] = child;
          }
          child = childMap["resizer-top"];
          if (child) {
            child.setAttribute("width", w - 2 * pad);
          }
          child = childMap["resizer-bottom"];
          if (child) {
            child.setAttribute("width", w - 2 * pad);
          }
          child = childMap["resizer-left"];
          if (child) {
            child.setAttribute("height", h - 2 * pad);
          }
          child = childMap["resizer-right"];
          if (child) {
            child.setAttribute("height", h - 2 * pad);
          }
          child = childMap["resizer-topright"];
          if (child) {
            child.setAttribute("x", w - pad);
          }
          child = childMap["resizer-bottomleft"];
          if (child) {
            child.setAttribute("y", h - pad);
          }
          child = childMap["resizer-bot"];
          if (child) {
            child.setAttribute("x", w - pad);
            return child.setAttribute("y", h - pad);
          }
        }
      },
      setPoisition: function(node, x, y) {
        var transformVal, translateVal;
        transformVal = node.transform.baseVal;
        if (transformVal.numberOfItems === 1) {
          transformVal.getItem(0).setTranslate(x * 10, y * 10);
        } else {
          translateVal = node.ownerSVGElement.createSVGTransform();
          translateVal.setTranslate(x * 10, y * 10);
          transformVal.appendItem(translateVal);
        }
        return null;
      },
      position: function(node, x, y, updateLine) {
        if (node.length) {
          node = node[0];
        }
        MC.canvas.position(node, x, y);
        return null;
      }
    };
    return CanvasManager;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CanvasElement',["CanvasManager", "event", "constant", "i18n!/nls/lang.js", "CloudResources", "MC.canvas.constant"], function(CanvasManager, ide_event, constant, lang, CloudResources) {
    var CanvasElement, CanvasElementConstructors, Design;
    Design = null;
    CanvasElementConstructors = {};

    /*
     * Canvas interface of CanvasElement
     */
    CanvasElement = function(model, containerId) {
      this.id = model.id;
      this.model = model;
      this.type = model.type;
      this.containerId = containerId;
      if (model.parent) {
        this.parentId = model.parent();
        this.parentId = this.parentId ? this.parentId.id : "";
      } else {
        this.parentId = "";
      }
      if (model.node_group === true) {
        this.nodeType = "group";
      } else if (model.node_line === true) {
        this.nodeType = "line";
      } else {
        this.nodeType = "node";
      }
      return this;
    };
    CanvasElement.extend = function(Child, ElementType) {
      var CanvasElementPrototype;
      CanvasElementPrototype = function() {
        return null;
      };
      CanvasElementPrototype.prototype = this.prototype;
      Child.prototype = new CanvasElementPrototype();
      Child.prototype.constructor = Child;
      Child["super"] = this.prototype;
      CanvasElementConstructors[ElementType] = Child;
      return null;
    };
    CanvasElement.createView = function(type, model, containerId) {
      var CEC, m;
      CEC = CanvasElementConstructors[type];
      if (!CEC) {
        CEC = CanvasElement;
        m = {
          type: "Unknown",
          id: model
        };
      }
      return new CEC(m || model, containerId);
    };
    CanvasElement.prototype.constant = {
      PATH_PORT_LEFT: "M-8 0.5l6 -5.5l2 0 l0 11 l-2 0z",
      PATH_PORT_TOP: "M0.5 0l5.5 0l0 -2l-5.5 -6l-5.5 6l0 2z",
      PATH_PORT_RIGHT: "M8 0.5l-6 -5.5l-2 0 l0 11 l2 0z",
      PATH_PORT_BOTTOM: "M0.5 0l5.5 0l0 2l-5.5 6l-5.5 -6l0 -2z",
      PATH_PORT_DIAMOND: "M-5 0.5l5.5 -5.5l5.5 5.5 l-5.5 5.5z"
    };
    CanvasElement.constant = {
      PORT_RIGHT_ANGLE: 0,
      PORT_UP_ANGLE: 90,
      PORT_LEFT_ANGLE: 180,
      PORT_DOWN_ANGLE: 270
    };

    /*
     * CanvasElement Interface
     */
    CanvasElement.prototype.draw = function() {
      return null;
    };
    CanvasElement.prototype.getModel = function() {
      return this.model;
    };
    CanvasElement.prototype.element = function(id) {
      if (!id) {
        id = this.id;
      }
      return document.getElementById(id);
    };
    CanvasElement.prototype.$element = function(id) {
      return $(this.element());
    };
    CanvasElement.prototype.move = function(x, y) {
      if (x === this.model.x() && y === this.model.y()) {
        return;
      }
      return MC.canvas.move(this.element(), x, y);
    };
    CanvasElement.prototype.position = function(x, y) {
      var el, oldx, oldy;
      oldx = this.model.x();
      oldy = this.model.y();
      if ((x === void 0 || x === null) && (y === void 0 || y === null)) {
        return [oldx, oldy];
      }
      if (x === null || x === void 0) {
        x = oldx;
      }
      if (y === null || y === void 0) {
        y = oldy;
      }
      if (x === oldx && y === oldy) {
        return;
      }
      this.model.set({
        x: x,
        y: y
      });
      el = this.element();
      if (el) {
        MC.canvas.position(el, x, y);
      }
      return null;
    };
    CanvasElement.prototype.size = function(w, h) {
      var el, oldh, oldw;
      oldw = this.model.width();
      oldh = this.model.height();
      if ((w === void 0 || w === null) && (h === void 0 || h === null)) {
        return [oldw, oldh];
      }
      if (!this.model.node_group) {
        return;
      }
      if (w === null || w === void 0) {
        w = oldw;
      }
      if (h === null || h === void 0) {
        h = oldh;
      }
      if (w !== oldw || h !== oldh) {
        this.model.set({
          width: w,
          height: h
        });
      }
      el = this.element();
      if (el) {
        MC.canvas.groupSize(el, w, h);
      }
      return null;
    };
    CanvasElement.prototype.offset = function() {
      return this.element().getBoundingClientRect();
    };
    CanvasElement.prototype.port = function() {
      if (!this.ports) {
        this.ports = _.map(this.$element().children(".port"), function(el) {
          return el.getAttribute("data-name");
        });
      }
      return this.ports;
    };
    CanvasElement.prototype.isConnectable = function(fromPort, toId, toPort) {
      var C, p1Comp, p2Comp, t, _i, _len, _ref;
      C = Design.modelClassForPorts(fromPort, toPort);
      if (!C) {
        return false;
      }
      p1Comp = this.model;
      p2Comp = this.model.design().component(toId);
      _ref = p1Comp.connectionTargets(C.prototype.type);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        if (t === p2Comp) {
          return false;
        }
      }
      return C.isConnectable(p1Comp, p2Comp) !== false;
    };
    CanvasElement.prototype.isRemovable = function() {
      var ch, res, _i, _len, _ref;
      res = this.model.isRemovable();
      if (res !== true) {
        return res;
      }
      if (this.nodeType === "group") {
        _ref = this.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          res = ch.isRemovable();
          if (res !== true) {
            break;
          }
        }
      }
      return res;
    };
    CanvasElement.prototype.remove = function() {
      var comp, comp_name, res, template;
      if (this.model.isRemoved()) {
        return;
      }
      res = this.isRemovable();
      comp = this.model;
      comp_name = comp.get("name");
      if (res === true && comp.children && comp.children().length > 0) {
        res = sprintf(lang.ide.CVS_CFM_DEL_GROUP, comp_name);
      }
      if (_.isString(res)) {
        template = MC.template.canvasOpConfirm({
          title: sprintf(lang.ide.CVS_CFM_DEL, comp_name),
          content: res
        });
        modal(template, true);
        $("#canvas-op-confirm").one("click", function() {
          if (!comp.isRemoved()) {
            comp.remove();
            $canvas.selected_node().length = 0;
            ide_event.trigger(ide_event.OPEN_PROPERTY);
          }
          return null;
        });
      } else if (res.error) {
        notification("error", res.error);
      } else if (res === true) {
        comp.remove();
        $canvas.selected_node().length = 0;
        ide_event.trigger(ide_event.OPEN_PROPERTY);
        return true;
      }
      return false;
    };
    CanvasElement.prototype.reConnect = function() {
      var cn, v, _i, _len, _ref;
      _ref = this.model.connections();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cn = _ref[_i];
        v = cn.getCanvasView();
        if (v) {
          v.draw();
        }
      }
      return null;
    };
    CanvasElement.prototype.select = function() {
      if (this.type === "Unknown") {
        return;
      }
      this.doSelect(this.type, this.id, this.id);
      return true;
    };
    CanvasElement.prototype.doSelect = function(type, propertyId, canvasId) {
      ide_event.trigger(ide_event.OPEN_PROPERTY, type, propertyId);
      return MC.canvas.select(canvasId);
    };
    CanvasElement.prototype.connection = function() {
      var cn, cns, _i, _len, _ref;
      cns = [];
      _ref = this.model.connections();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cn = _ref[_i];
        if (cn.get("lineType")) {
          cns.push({
            line: cn.id,
            target: this.id,
            port: cn.port(this.id, "name")
          });
        }
      }
      return cns;
    };
    CanvasElement.prototype.toggleEip = function() {
      var toggle;
      console.assert(this.model.setPrimaryEip, "The component doesn't support setting EIP");
      toggle = !this.model.hasPrimaryEip();
      this.model.setPrimaryEip(toggle);
      if (toggle) {
        Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
      }
      ide_event.trigger(ide_event.PROPERTY_REFRESH_ENI_IP_LIST);
      return null;
    };
    CanvasElement.prototype.clone = function(parentId, x, y) {
      var attributes, createOption, design, name, nameMatch, parent, pos;
      design = this.model.design();
      if (!design.modeIsStack() && !design.modeIsAppEdit()) {
        return;
      }
      parent = design.component(parentId);
      if (!parent) {
        console.error("No parent is found when cloning object");
        return;
      }
      if (this.model.clone) {
        name = this.model.get("name");
        nameMatch = name.match(/(.+-copy)(\d*)$/);
        if (nameMatch) {
          name = nameMatch[1] + ((parseInt(nameMatch[2], 10) || 0) + 1);
        } else {
          name += "-copy";
        }
        attributes = {
          parent: parent,
          name: name
        };
        pos = {
          x: x,
          y: y
        };
        createOption = {
          cloneSource: this.model
        };
        return $canvas.add(this.type, attributes, pos, createOption);
      }
    };
    CanvasElement.prototype.parent = function() {
      var p;
      p = this.model.parent();
      if (p) {
        return p.getCanvasView();
      } else {
        return null;
      }
    };
    CanvasElement.prototype.changeParent = function(parentId, execCB) {
      var oldPid, parent, res;
      if (parentId === "canvas") {
        parentId = "";
      }
      oldPid = this.model.parent();
      oldPid = oldPid ? oldPid.id : "";
      if (oldPid === parentId) {
        execCB.call(this);
        return false;
      }
      if (this.model.design().modeIsAppEdit() && this.model.get("appId")) {
        notification("error", lang.ide.NOTIFY_MSG_WARN_OPERATE_NOT_SUPPORT_YET);
        return;
      }
      parent = this.model.design().component(parentId);
      if (!parent) {
        console.warn("Cannot find parent when changing parent");
        return false;
      }
      res = this.model.isReparentable(parent);
      if (_.isString(res)) {
        notification("error", res);
      } else if (res === true) {
        parent.addChild(this.model);
        execCB.call(this);
        return true;
      }
      return false;
    };
    CanvasElement.prototype.children = function() {
      if (this.model.children) {
        return _.map(this.model.children() || [], function(c) {
          return c.getCanvasView();
        });
      } else {
        return [];
      }
    };
    CanvasElement.prototype.list = function() {
      var component, id, idx, instance_data, list, member, members, name, resource_list, state, _i, _len, _ref, _ref1, _ref2;
      component = this.model;
      members = this.model.members ? this.model.members() : this.model.groupMembers();
      if (members.length === 0) {
        return [];
      }
      id = this.id;
      name = this.model.get("name");
      resource_list = CloudResources(this.model.type, this.model.design().region());

      /*
       * Quick hack for Lc
       */
      if (this.type !== constant.RESTYPE.LC) {
        if (this.type === constant.RESTYPE.INSTANCE) {
          instance_data = (_ref = resource_list.get(this.model.get("appId"))) != null ? _ref.toJSON() : void 0;
          state = instance_data ? instance_data.instanceState.name : "unknown";
        }
        list = [
          {
            id: id,
            name: name,
            appId: this.model.get("appId"),
            state: state || "",
            deleted: resource_list.get(this.model.get("appId")) ? "" : " deleted"
          }
        ];
        list.id = id;
        list.name = name;
      } else {
        list = [];
        list.id = this.model.parent().id;
        list.name = this.model.parent().get("name");
      }
      _ref1 = this.model.groupMembers();
      for (idx = _i = 0, _len = _ref1.length; _i < _len; idx = ++_i) {
        member = _ref1[idx];
        state = "";
        if (this.type === constant.RESTYPE.INSTANCE || this.type === constant.RESTYPE.LC) {
          resource_list = CloudResources(constant.RESTYPE.INSTANCE, this.model.design().region());
          instance_data = (_ref2 = resource_list.get(member.appId)) != null ? _ref2.toJSON() : void 0;
          state = instance_data ? instance_data.instanceState.name : "unknown";
        }
        list.push({
          id: member.id,
          name: name,
          appId: member.appId,
          state: state,
          deleted: !this.model.design().modeIsStack() && !resource_list.get(this.model.get("appId")) ? " deleted" : ""
        });
      }
      return list;
    };
    CanvasElement.prototype.connectionData = function(portName) {
      return Design.modelClassForType("Framework_CN").connectionData(this.type, portName);
    };

    /*
     * Helper functions for rendering and for model
     */
    CanvasElement.prototype.getLayer = function(layerName) {
      return $("#" + layerName);
    };
    CanvasElement.prototype.portDirection = function(portName) {
      if (this.portDirMap) {
        return this.portDirMap[portName];
      } else {
        return null;
      }
    };
    CanvasElement.prototype.portPosition = function(portName) {
      if (this.portPosMap) {
        return this.portPosMap[portName];
      } else {
        return null;
      }
    };
    CanvasElement.prototype.initNode = function(node, x, y) {
      var child, name, pos, _i, _len, _ref;
      CanvasManager.position(node, x, y);
      if (node.length) {
        node = node[0];
      }
      _ref = node.children || node.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child.tagName === "PATH" || child.tagName === "path") {
          name = child.getAttribute("data-alias") || child.getAttribute("data-name");
          if (name) {
            pos = this.portPosition(name);
            if (pos) {
              CanvasManager.setPoisition(child, pos[0] / 10, pos[1] / 10);
            }
          }
        }
      }
      return null;
    };
    CanvasElement.prototype.createNode = function(option) {
      var height, m, node, width, x, y;
      m = this.model;
      x = m.x();
      y = m.y();
      width = m.width() * MC.canvas.GRID_WIDTH;
      height = m.height() * MC.canvas.GRID_HEIGHT;
      node = Canvon.group().append(Canvon.rectangle(0, 0, width, height).attr({
        'class': 'node-background',
        'rx': 5,
        'ry': 5
      }), Canvon.image(MC.IMG_URL + option.image, option.imageX, option.imageY, option.imageW, option.imageH)).attr({
        'id': option.id || this.id,
        'class': 'dragable node ' + this.type.replace(/\./g, "-"),
        'data-type': 'node',
        'data-class': this.type
      });
      if (option.labelBg) {
        node.append(Canvon.rectangle(2, 76, 86, 13).attr({
          'class': 'node-label-name-bg',
          'rx': 3,
          'ry': 3
        }));
      }
      if (option.label) {
        node.append(Canvon.text(width / 2, height - 4, MC.truncate(option.label, 17)).attr({
          'class': 'node-label' + (option.labelBg ? ' node-label-name' : '')
        }));
      }
      if (option.sg) {
        node.append(Canvon.group().append(Canvon.rectangle(10, 6, 7, 5).attr({
          'class': 'node-sg-color-border tooltip'
        }), Canvon.rectangle(20, 6, 7, 5).attr({
          'class': 'node-sg-color-border tooltip'
        }), Canvon.rectangle(30, 6, 7, 5).attr({
          'class': 'node-sg-color-border tooltip'
        }), Canvon.rectangle(40, 6, 7, 5).attr({
          'class': 'node-sg-color-border tooltip'
        }), Canvon.rectangle(50, 6, 7, 5).attr({
          'class': 'node-sg-color-border tooltip'
        })).attr({
          'class': 'node-sg-color-group',
          'transform': 'translate(8, 62)'
        }));
      }
      return node;
    };
    CanvasElement.prototype.createGroup = function(name) {
      var height, m, pad, text_pos, width, x, y;
      m = this.model;
      x = m.x();
      y = m.y();
      width = m.width() * MC.canvas.GRID_WIDTH;
      height = m.height() * MC.canvas.GRID_HEIGHT;
      text_pos = {
        'AWS.VPC.VPC': [6, 16],
        'AWS.EC2.AvailabilityZone': [4, 14],
        'AWS.VPC.Subnet': [4, 14],
        'AWS.AutoScaling.Group': [4, 14]
      }[m.type];
      pad = 10;
      return Canvon.group().append(Canvon.rectangle(0, 0, width, height).attr({
        'class': 'group',
        'rx': 5,
        'ry': 5
      }), Canvon.group().append(Canvon.rectangle(pad, 0, width - 2 * pad, pad).attr({
        'class': 'group-resizer resizer-top',
        'data-direction': 'top'
      }), Canvon.rectangle(0, pad, pad, height - 2 * pad).attr({
        'class': 'group-resizer resizer-left',
        'data-direction': 'left'
      }), Canvon.rectangle(width - pad, pad, pad, height - 2 * pad).attr({
        'class': 'group-resizer resizer-right',
        "data-direction": "right"
      }), Canvon.rectangle(pad, height - pad, width - 2 * pad, pad).attr({
        'class': 'group-resizer resizer-bottom',
        "data-direction": "bottom"
      }), Canvon.rectangle(0, 0, pad, pad).attr({
        'class': 'group-resizer resizer-topleft',
        "data-direction": "topleft"
      }), Canvon.rectangle(width - pad, 0, pad, pad).attr({
        'class': 'group-resizer resizer-topright',
        "data-direction": "topright"
      }), Canvon.rectangle(0, height - pad, pad, pad).attr({
        'class': 'group-resizer resizer-bottomleft',
        "data-direction": "bottomleft"
      }), Canvon.rectangle(width - pad, height - pad, pad, pad).attr({
        'class': 'group-resizer resizer-bottomright',
        "data-direction": "bottomright"
      })).attr({
        'class': 'resizer-wrap'
      }), Canvon.text(text_pos[0], text_pos[1], name).attr({
        'class': 'group-label name'
      })).attr({
        'id': this.id,
        'class': 'dragable ' + this.type.replace(/\./g, "-"),
        'data-type': 'group',
        'data-class': this.type
      });
    };
    CanvasElement.prototype.updateAppState = function() {
      var data, design, m, res_list;
      m = this.model;
      design = m.design();
      if (design.modeIsStack() || !m.get("appId")) {
        return;
      }
      CanvasManager.removeClass(this.element(), "deleted");
      if (m.type && design.region()) {
        res_list = CloudResources(m.type, design.region());
        data = res_list.get(m.get('appId'));
        if (!data) {
          CanvasManager.addClass(this.element(), "deleted");
        }
      }
      return null;
    };
    CanvasElement.prototype.updatexGWAppState = function() {
      var data, design, el, m, res_list, _ref;
      m = this.model;
      design = m.design();
      if (m.design().modeIsStack() || !m.get("appId")) {
        return;
      }
      el = this.element();
      CanvasManager.removeClass(el, "deleted");
      if (m.type && design.region()) {
        res_list = CloudResources(m.type, design.region());
        data = res_list.get(m.get('appId'));
      }
      if (data) {
        if (m.get("appId").indexOf("igw-") === 0) {
          if (!(data.get("state") === "available" && data.get("vpcId") === m.parent().get("appId"))) {
            CanvasManager.addClass(el, "deleted");
          }
        } else if (m.get("appId").indexOf("vgw-") === 0) {
          if (!(data.get("state") === "available" && ((_ref = data.get("attachmentState")) === "attaching" || _ref === "attached") && data.get("vpcId") === m.parent().get("appId"))) {
            CanvasManager.addClass(el, "deleted");
          }
        } else if (m.get("appId").indexOf("cgw-") === 0) {
          if (data.get("state") !== "available") {
            CanvasManager.addClass(el, "deleted");
          }
        }
      } else {
        CanvasManager.addClass(el, "deleted");
      }
      return null;
    };
    CanvasElement.prototype.detach = function() {
      return MC.canvas.remove(this.element());
    };
    CanvasElement.setDesign = function(design) {
      Design = design;
      return null;
    };
    return CanvasElement;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CanvasAdaptor',["./CanvasElement", "event", 'i18n!/nls/lang.js', "constant", "UI.notification"], function(CanvasElement, ide_event, lang, constant) {
    var $canvas, Canvas, CanvasEvent, Design;
    Design = null;

    /* $canvas is a adaptor for MC.canvas.js */
    $canvas = function(id, defaultType) {
      var component, type, view;
      component = Design.__instance.component(id);
      if (component) {
        view = component.getCanvasView();
      }
      if (!view) {
        console.debug("Creating an view for an unfound component : ", defaultType, id);
        type = component ? component.type : defaultType;
        view = CanvasElement.createView(type, component || id);
      }
      return view;
    };
    $canvas.size = function(w, h) {
      if (Design.__instance) {
        return Design.__instance.canvas.size(w, h);
      } else {
        return [240, 240];
      }
    };
    $canvas.scale = function(ratio) {
      return Design.__instance.canvas.scale(ratio);
    };
    $canvas.offset = function() {
      return $(document.getElementById("svg_canvas")).offset();
    };
    $canvas.selected_node = function() {
      if (Design.__instance) {
        return Design.__instance.canvas.selectedNode;
      } else {
        return null;
      }
    };
    $canvas.setLineStyle = function(ls) {
      if (ls === !4 && Design.instance() && Design.instance().mode() === "appview") {
        ls = 4;
      }
      localStorage.setItem("canvas/lineStyle", ls);
      return Design.instance().canvas.setLineStyle(ls);
    };
    $canvas.lineStyle = function() {
      var ls, _ref;
      ls = (_ref = Design.instance()) != null ? _ref.canvas.ls : void 0;
      if (ls === void 0) {
        ls = parseInt(localStorage.getItem("canvas/lineStyle"));
        if (isNaN(ls)) {
          ls = 2;
        }
      }
      return ls;
    };
    $canvas.node = function() {
      var comp, id, nodes, _ref;
      nodes = [];
      _ref = Design.__instance.__canvasNodes;
      for (id in _ref) {
        comp = _ref[id];
        if (!comp.isVisual || comp.isVisual()) {
          nodes.push(comp.getCanvasView());
        }
      }
      return nodes;
    };
    $canvas.group = function() {
      return _.map(Design.__instance.__canvasGroups, function(comp) {
        return comp.getCanvasView();
      });
    };
    $canvas.clearSelected = function() {
      MC.canvas.event.clearSelected();
      ide_event.trigger(ide_event.OPEN_PROPERTY);
      return null;
    };
    $canvas.trigger = function(event) {
      console.assert(_.isString(event), "Invalid parameter : event ");
      if (CanvasEvent[event]) {
        CanvasEvent[event].apply(this, Array.prototype.slice.call(arguments, 1));
      }
      return null;
    };
    $canvas.add = function(type, attributes, pos, createOption) {
      var Model, m, parent;
      attributes = $.extend({
        x: Math.round(pos.x),
        y: Math.round(pos.y)
      }, attributes);
      parent = attributes.parent;
      if (!parent) {
        parent = Design.__instance.component(attributes.groupUId);
        attributes.parent = parent;
        delete attributes.groupUId;
      }
      if (parent) {
        if (parent.type === constant.RESTYPE.ASG) {
          attributes.x = parent.x() + 2;
          attributes.y = parent.y() + 3;
          type = constant.RESTYPE.LC;
        } else if (parent.type === "ExpandedAsg") {
          return false;
        }
      }
      Model = Design.modelClassForType(type);
      createOption = $.extend({
        createByUser: true
      }, createOption || {});
      m = new Model(attributes, createOption);
      if (createOption.selectId) {
        $canvas(createOption.selectId, true).select();
      } else if (m.id) {
        $canvas(m.id, true).select();
      }
      return m.id;
    };
    $canvas.connect = function(p1, p1Name, p2, p2Name) {
      var C, DefaultCreateOption, c, comp1, comp2, res;
      C = Design.modelClassForPorts(p1Name, p2Name);
      console.assert(C, "Cannot found Class for type: " + p1Name + ">" + p2Name);
      comp1 = Design.instance().component(p1);
      comp2 = Design.instance().component(p2);
      res = C.isConnectable(comp1, comp2);
      DefaultCreateOption = {
        createByUser: true
      };
      if (_.isString(res)) {
        notification("error", res);
      } else if (res === true) {
        c = new C(comp1, comp2, void 0, DefaultCreateOption);
        if (c.id) {
          $canvas(c.id, true).select();
        }
        return true;
      } else if (res === false) {
        return false;
      } else if (res.confirm) {
        modal(MC.template.modalCanvasConfirm(res), true);
        $("#canvas-op-confirm").one("click", function() {
          c = new C(comp1, comp2, void 0, DefaultCreateOption);
          if (c.id) {
            $canvas(c.id, true).select();
          }
          return null;
        });
      }
      return false;
    };
    $canvas.connection = function(line_uid) {
      var cache, l, line, lineArray, uid;
      if (line_uid) {
        cache = {
          uid: Design.__instance.component(line_uid)
        };
      } else {
        cache = Design.__instance.__canvasLines;
      }
      lineArray = {};
      for (uid in cache) {
        line = cache[uid];
        l = {
          type: line.get("lineType"),
          target: {}
        };
        l.target[line.port1Comp().id] = line.port1("name");
        l.target[line.port2Comp().id] = line.port2("name");
        lineArray[uid] = l;
      }
      if (line_uid) {
        return lineArray.uid;
      } else {
        return lineArray;
      }
    };
    $canvas.hasVPC = function() {
      return !!Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
    };
    CanvasEvent = {
      CANVAS_NODE_SELECTED: function() {
        ide_event.trigger(ide_event.OPEN_PROPERTY);
        return null;
      },
      SHOW_STATE_EDITOR: function(uid) {
        ide_event.trigger(ide_event.SHOW_STATE_EDITOR, uid);
        return null;
      },
      SHOW_PROPERTY_PANEL: function() {
        ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY, 'property');
        return null;
      },
      CANVAS_PLACE_OVERLAP: function() {
        notification('warning', lang.ide.CVS_MSG_WARN_COMPONENT_OVERLAP, false);
        return null;
      },
      CANVAS_ZOOMED_DROP_ERROR: function() {
        notification('warning', lang.ide.CVS_MSG_ERR_ZOOMED_DROP_ERROR);
        return null;
      },
      CANVAS_SAVE: function() {
        $("#OpsEditor").trigger("SAVE");
        return false;
      },
      CANVAS_PLACE_NOT_MATCH: function(param) {
        var info, l, res_type;
        res_type = constant.RESTYPE;
        l = lang.ide;
        switch (param.type) {
          case res_type.VOL:
            info = l.CVS_MSG_WARN_NOTMATCH_VOLUME;
            break;
          case res_type.SUBNET:
            info = l.CVS_MSG_WARN_NOTMATCH_SUBNET;
            break;
          case res_type.INSTANCE:
            info = l.CVS_MSG_WARN_NOTMATCH_INSTANCE_SUBNET;
            break;
          case res_type.ENI:
            info = l.CVS_MSG_WARN_NOTMATCH_ENI;
            break;
          case res_type.RT:
            info = l.CVS_MSG_WARN_NOTMATCH_RTB;
            break;
          case res_type.ELB:
            info = l.CVS_MSG_WARN_NOTMATCH_ELB;
            break;
          case res_type.CGW:
            info = l.CVS_MSG_WARN_NOTMATCH_CGW;
            break;
          case res_type.ASG:
            info = l.CVS_MSG_WARN_NOTMATCH_ASG;
        }
        if (info) {
          notification('warning', info, false);
        }
        return null;
      },
      STATE_ICON_CLICKED: function(uid) {
        return ide_event.trigger(ide_event.OPEN_STATE_EDITOR, uid);
      }
    };
    window.$canvas = $canvas;

    /* Canvas is used by $canvas to store data of svg canvas */
    Canvas = function(size) {
      this.sizeAry = size || [240, 240];
      this.offsetAry = [0, 0];
      this.scaleAry = 1;
      this.selectedNode = [];
      return this;
    };
    Canvas.prototype.init = function() {
      var attr;
      attr = {
        'width': this.sizeAry[0] * MC.canvas.GRID_WIDTH,
        'height': this.sizeAry[1] * MC.canvas.GRID_HEIGHT
      };
      $('#svg_canvas').attr(attr);
      $('#canvas_body').css(attr);
      this.setLineStyle(localStorage.getItem("canvas/lineStyle"));
    };
    Canvas.prototype.scale = function(ratio) {
      if (ratio === void 0) {
        return this.scaleAry;
      }
      this.scaleAry = ratio;
      return null;
    };
    Canvas.prototype.offset = function(x, y) {
      if (x === void 0) {
        return this.offsetAry;
      }
      this.offsetAry[0] = x;
      this.offsetAry[1] = y;
      return null;
    };
    Canvas.prototype.size = function(w, h) {
      if (w === void 0) {
        return this.sizeAry;
      }
      this.sizeAry[0] = w;
      this.sizeAry[1] = h;
      return null;
    };
    Canvas.prototype.setLineStyle = function(ls) {
      this.ls = parseInt(ls) || 0;
      if (this.ls === 4) {
        Canvon("#line_layer").addClass("hide-sg");
      } else {
        Canvon("#line_layer").removeClass("hide-sg");
      }
      if (Design.__instance.shouldDraw() && this.ls !== 4) {
        _.each(Design.modelClassForType("SgRuleLine").allObjects(), function(cn) {
          return cn.draw();
        });
      }
      return null;
    };
    Canvas.setDesign = function(design) {
      Design = design;
      CanvasElement.setDesign(design);
      Design.on(Design.EVENT.RemoveResource, function(resource) {
        var selected;
        selected = $canvas.selected_node()[0];
        if (selected && selected.id === resource.id) {
          ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY, 'property');
          return null;
        }
      });
      return null;
    };
    return Canvas;
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('Design',["constant", "OpsModel", "workspaces/editor/framework/canvasview/CanvasAdaptor", 'CloudResources'], function(constant, OpsModel, CanvasAdaptor, CloudResources) {

    /* env:prod */
    var Design, DesignImpl, createRecursiveCheck, diffHelper, noop;
    createRecursiveCheck = function() {
      return createRecursiveCheck.o || (createRecursiveCheck.o = {
        check: function() {}
      });
    };

    /* env:prod:end */

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                       env:dev:end */
    noop = function() {};

    /*
      -------------------------------
       Design is the main controller of the framework. It handles the input / ouput of the Application ( a.k.a the DesignCanvas ).
       The input and ouput is the same : the JSON data.
      -------------------------------
    
    
      ++ Class Method ++
    
       * instance() : Design
          description : returns the currently used Design object.
    
       * modelClassForType( typeString ) : Class
          description : returns an Class for the specified typeString.
    
       * debug() :
          description : prints all the resource in the console.
    
       * debug.selectedComp() :
          description : prints the selected resouorce in console.
    
    
      ++ Object Method ++
    
       * component( uid ) : ResourceModel
          description : returns a resource model of uid
    
       * eachComponent( iterator ) :
          description : the iterator will execute with all the components.
    
       * use() :
          description : make the design object to be Design.instance()
    
       * save( component_data, layout_data ) :
          description : save the data, so that isModified() will use the saved data.
    
       * isModified() : Boolean
          description : returns true if the stack is modified since last save.
    
       * serialize() : Object
          description : returns a Plain JS Object that is indentical to JSON data.
    
       * serializeAsStack() : Object
          description : same as serialize(), but it ensure that the JSON will be a stack JSON.
    
       * getCost() : Array
          description : return an array of cost object to represent the cost of the stack.
     */
    Design = function(opsModel) {
      var design, json;
      design = (new DesignImpl(opsModel)).use();
      json = opsModel.getJsonData();
      design.deserialize($.extend(true, {}, json.component), $.extend(true, {}, json.layout));
      return design;
    };
    _.extend(Design, Backbone.Events);
    Design.__modelClassMap = {};
    Design.__resolveFirstMap = {};
    Design.__serializeVisitors = [];
    Design.__deserializeVisitors = [];
    Design.__instance = null;
    DesignImpl = function(opsModel) {
      var canvas_data, component, layout;
      this.__componentMap = {};
      this.__canvasNodes = {};
      this.__canvasLines = {};
      this.__canvasGroups = {};
      this.__classCache = {};
      this.__usedUidCache = {};
      this.__opsModel = opsModel;
      this.__shoulddraw = false;
      canvas_data = opsModel.getJsonData();
      this.canvas = new CanvasAdaptor(canvas_data.layout.size);
      this.__mode = Design.MODE.App;
      if (opsModel.testState(OpsModel.State.UnRun)) {
        this.__mode = Design.MODE.Stack;
      } else if (opsModel.isImported()) {
        this.__mode = Design.MODE.AppView;
      }
      component = canvas_data.component;
      layout = canvas_data.layout;
      delete canvas_data.component;
      delete canvas_data.layout;
      this.attributes = $.extend(true, {}, canvas_data);
      canvas_data.component = component;
      canvas_data.layout = layout;
      return null;
    };
    Design.TYPE = {
      Classic: "ec2-classic",
      Vpc: "ec2-vpc",
      DefaultVpc: "default-vpc",
      CustomVpc: "custom-vpc"
    };
    Design.MODE = {
      Stack: "stack",
      App: "app",
      AppEdit: "appedit",
      AppView: "appview"
    };
    Design.EVENT = {
      Deserialized: "DESERIALIZED",
      ChangeResource: "CHANGE_RESOURCE",
      AddResource: "ADD_RESOURCE",
      RemoveResource: "REMOVE_RESOURCE"
    };
    DesignImpl.prototype.refreshAppUpdate = function() {
      var needRefresh;
      needRefresh = [constant.RESTYPE.ASG];
      this.eachComponent(function(component) {
        var _ref;
        if (_ref = component.type, __indexOf.call(needRefresh, _ref) >= 0) {
          return component.draw();
        }
      });
      return null;
    };
    DesignImpl.prototype.deserialize = function(json_data, layout_data) {
      var ModelClass, comp, devistor, recursiveCheck, resolveDeserialize, that, uid, version, _i, _len, _old_get_component_, _ref;
      console.debug("Deserializing data :", [json_data, layout_data]);
      version = this.get("version");
      _ref = Design.__deserializeVisitors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        devistor = _ref[_i];
        devistor(json_data, layout_data, version);
      }
      Design.trigger = noop;
      that = this;
      resolveDeserialize = function(uid) {
        var ModelClass, component_data, obj;
        if (!uid) {
          return null;
        }
        obj = that.__componentMap[uid];
        if (obj) {
          return obj;
        }
        recursiveCheck.check(uid);
        component_data = json_data[uid];
        if (!component_data) {
          console.warn("Unknown uid for resolving component :", uid, json_data);
          return;
        }
        ModelClass = Design.modelClassForType(component_data.type);
        if (!ModelClass) {
          console.warn("We do not support deserializing resource of type : " + component_data.type);
          return;
        }
        ModelClass.deserialize(component_data, layout_data[uid], resolveDeserialize);
        return Design.__instance.__componentMap[uid];
      };
      _old_get_component_ = this.component;
      this.component = null;
      for (uid in json_data) {
        comp = json_data[uid];
        this.__usedUidCache[uid] = true;
        if (Design.__resolveFirstMap[comp.type] === true) {
          ModelClass = Design.modelClassForType(comp.type);
          if (!ModelClass) {
            console.warn("We do not support deserializing resource of type : " + component_data.type);
            continue;
          }
          if (!ModelClass.preDeserialize) {
            console.error("The class is marked as resolveFirst, yet it doesn't implement preDeserialize()");
            continue;
          }
          ModelClass.preDeserialize(comp, layout_data[uid]);
        }
      }
      this.component = resolveDeserialize;
      for (uid in json_data) {
        comp = json_data[uid];
        if (Design.__resolveFirstMap[comp.type] === true) {
          recursiveCheck = createRecursiveCheck(uid);
          Design.modelClassForType(comp.type).deserialize(comp, layout_data[uid], resolveDeserialize);
        } else {
          recursiveCheck = createRecursiveCheck();
          resolveDeserialize(uid);
        }
      }
      this.component = _old_get_component_;
      for (uid in json_data) {
        comp = json_data[uid];
        ModelClass = Design.modelClassForType(comp.type);
        if (ModelClass && ModelClass.postDeserialize) {
          ModelClass.postDeserialize(comp, layout_data[uid]);
        }
      }
      return null;
    };
    DesignImpl.prototype.reload = function(opsModel) {
      var json;
      DesignImpl.call(this, opsModel);
      json = opsModel.getJsonData();
      return this.deserialize($.extend(true, {}, json.component), $.extend(true, {}, json.layout));
    };
    DesignImpl.prototype.finishDeserialization = function() {
      var comp, lines, uid, _i, _len, _ref;
      this.__shoulddraw = true;
      lines = [];
      _ref = this.__componentMap;
      for (uid in _ref) {
        comp = _ref[uid];
        if (!comp.draw) {
          continue;
        }
        if (comp.node_line) {
          lines.push(comp);
        } else {
          comp.draw(true);
        }
      }
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        comp = lines[_i];
        comp.draw(true);
      }
      Design.trigger = Backbone.Events.trigger;
      Design.trigger(Design.EVENT.Deserialized);
      return null;
    };
    DesignImpl.prototype.renderNode = function() {
      var comp, uid, _ref;
      _ref = this.__componentMap;
      for (uid in _ref) {
        comp = _ref[uid];
        if (comp.draw && !comp.node_line) {
          comp.draw(false);
        }
      }
    };

    /* Private Interface */
    Design.registerModelClass = function(type, modelClass, resolveFirst) {
      this.__modelClassMap[type] = modelClass;
      if (resolveFirst) {
        this.__resolveFirstMap[type] = resolveFirst;
      }
      return null;
    };
    DesignImpl.prototype.classCacheForCid = function(cid) {
      var cache;
      if (this.__classCache[cid]) {
        return this.__classCache[cid];
      }
      cache = this.__classCache[cid] = [];
      return cache;
    };
    DesignImpl.prototype.cacheComponent = function(id, comp) {
      if (!comp) {
        comp = this.__componentMap;
        delete this.__componentMap[id];
        delete this.__canvasGroups[id];
        delete this.__canvasNodes[id];
        if (this.modeIsAppEdit()) {
          this.reclaimGuid(id);
        }
      } else {
        this.__componentMap[id] = comp;
        if (comp.isVisual && comp.isVisual()) {
          if (comp.node_group) {
            this.__canvasGroups[id] = comp;
          } else if (comp.node_line) {
            this.__canvasLines[id] = comp;
          } else {
            this.__canvasNodes[id] = comp;
          }
        }
      }
      return null;
    };
    Design.registerSerializeVisitor = function(func) {
      this.__serializeVisitors.push(func);
      return null;
    };
    Design.registerDeserializeVisitor = function(func) {
      this.__deserializeVisitors.push(func);
      return null;
    };

    /* Private Interface End */
    Design.instance = function() {
      return this.__instance;
    };
    Design.modelClassForType = function(type) {
      return this.__modelClassMap[type];
    };
    Design.modelClassForPorts = function(port1, port2) {
      var type;
      if (port1 < port2) {
        type = port1 + ">" + port2;
      } else {
        type = port2 + ">" + port1;
      }
      return this.__modelClassMap[type];
    };
    Design.lineModelClasses = function() {
      var cs, modelClass, type, _ref;
      if (this.__lineModelClasses) {
        return this.__lineModelClasses;
      }
      this.__lineModelClasses = cs = [];
      _ref = this.__modelClassMap;
      for (type in _ref) {
        modelClass = _ref[type];
        if (modelClass.__isLineClass && type.indexOf(">") === -1) {
          cs.push(modelClass);
        }
      }
      return this.__lineModelClasses;
    };
    DesignImpl.prototype.reclaimGuid = function(guid) {
      return delete this.__usedUidCache[guid];
    };
    DesignImpl.prototype.guid = function() {
      var newId;
      newId = MC.guid();
      while (this.__usedUidCache[newId]) {
        console.warn("GUID collision detected, the generated GUID is " + newId + ". Try generating a new one.");
        newId = MC.guid();
      }
      this.__usedUidCache[newId] = true;
      return newId;
    };
    DesignImpl.prototype.set = function(key, value) {
      this.attributes[key] = value;
      this.trigger("change:" + key);
      this.trigger("change");
    };
    DesignImpl.prototype.get = function(key) {
      if (key === "id") {
        return this.__opsModel.get("id");
      } else if (key === "state") {
        return this.__opsModel.getStateDesc();
      } else {
        return this.attributes[key];
      }
    };
    DesignImpl.prototype.type = function() {
      return Design.TYPE.Vpc;
    };
    DesignImpl.prototype.region = function() {
      return this.attributes.region;
    };
    DesignImpl.prototype.modeIsStack = function() {
      return this.__mode === Design.MODE.Stack;
    };
    DesignImpl.prototype.modeIsApp = function() {
      return this.__mode === Design.MODE.App;
    };
    DesignImpl.prototype.modeIsAppView = function() {
      return this.__mode === Design.MODE.AppView;
    };
    DesignImpl.prototype.modeIsAppEdit = function() {
      return this.__mode === Design.MODE.AppEdit;
    };
    DesignImpl.prototype.setMode = function(m) {
      this.__mode = m;
    };
    DesignImpl.prototype.mode = function() {
      console.warn("Better not to use Design.instance().mode() directly.");
      return this.__mode;
    };
    DesignImpl.prototype.shouldDraw = function() {
      return this.__shoulddraw;
    };
    DesignImpl.prototype.use = function() {
      Design.__instance = this;
      return this;
    };
    DesignImpl.prototype.unuse = function() {
      if (Design.__instance === this) {
        Design.__instance = null;
      }
    };
    DesignImpl.prototype.component = function(uid) {
      return this.__componentMap[uid];
    };
    DesignImpl.prototype.componentsOfType = function(type) {
      return this.classCacheForCid(Design.modelClassForType(type).prototype.classId).slice(0);
    };
    DesignImpl.prototype.eachComponent = function(func, context) {
      var comp, uid, _ref;
      console.assert(_.isFunction(func), "User must pass in a function for Design.instance().eachComponent()");
      context = context || this;
      _ref = this.__componentMap;
      for (uid in _ref) {
        comp = _ref[uid];
        if (func.call(context, comp) === false) {
          break;
        }
      }
      return null;
    };
    DesignImpl.prototype.isModified = function(newData, showDetail) {
      var backing, dataToCompare;
      if (this.modeIsApp() || this.modeIsAppView()) {
        console.warn("Testing Design.isModified() in app mode and visualize mode. This should not be happening.");
        return false;
      }
      dataToCompare = newData || this.attributes;
      backing = this.__opsModel.getJsonData();
      if (showDetail) {
        return this.__isModifiedDetail(dataToCompare, backing);
      }
      if (dataToCompare.name !== backing.name) {
        return true;
      }
      if (!newData) {
        newData = this.serialize();
      }
      if (_.isEqual(backing.component, newData.component)) {
        if (_.isEqual(backing.layout, newData.layout)) {
          return false;
        }
      }
      return true;
    };
    DesignImpl.prototype.__isModifiedDetail = function(newData, oldData) {
      var backingState, comp, dataState, result, state, uid, __bsBackup, __dtBackup, _ref, _ref1;
      backingState = {};
      dataState = {};
      if (!newData.component) {
        newData = this.serialize();
      }
      console.assert(__bsBackup = $.extend(true, {}, oldData));
      console.assert(__dtBackup = $.extend(true, {}, newData));
      _ref = oldData.component;
      for (uid in _ref) {
        comp = _ref[uid];
        if (comp.type === constant.RESTYPE.LC || comp.type === constant.RESTYPE.INSTANCE) {
          backingState[uid] = comp.state;
          delete comp.state;
        }
      }
      _ref1 = newData.component;
      for (uid in _ref1) {
        comp = _ref1[uid];
        if (comp.type === constant.RESTYPE.LC || comp.type === constant.RESTYPE.INSTANCE) {
          dataState[uid] = comp.state;
          delete comp.state;
        }
      }
      result = {
        attribute: newData.name !== oldData.name,
        component: !_.isEqual(oldData.component, newData.component),
        layout: !_.isEqual(oldData.layout, newData.layout),
        instanceState: !_.isEqual(backingState, dataState)
      };
      for (uid in backingState) {
        state = backingState[uid];
        oldData.component[uid].state = state;
      }
      for (uid in dataState) {
        state = dataState[uid];
        newData.component[uid].state = state;
      }
      console.assert(_.isEqual(oldData, __bsBackup), "BackingStore Modified.");
      console.assert(_.isEqual(newData, __dtBackup), "Data Modified.");
      if (result.attribute || result.component || result.layout || result.instanceState) {
        return $.extend(result, {
          result: this.diff(newData, oldData),
          isRunning: this.__opsModel.testState(OpsModel.State.Running),
          isModified: true,
          newData: newData
        });
      } else {
        return false;
      }
    };
    DesignImpl.prototype.serialize = function(options) {
      var c, comp, component_data, connections, currentDesignObj, data, error, j, json, layout_data, mockArray, p1, p2, uid, visitor, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      currentDesignObj = Design.instance();
      this.use();
      console.debug("Design is serializing.");
      component_data = {};
      layout_data = {};
      connections = [];
      mockArray = [];
      _ref = this.__componentMap;
      for (uid in _ref) {
        comp = _ref[uid];
        if (comp.isRemoved()) {
          console.warn("Resource has been removed, yet it remains in cache when serializing :", comp);
          continue;
        }
        if (comp.node_line) {
          connections.push(comp);
          continue;
        }
        try {
          json = comp.serialize();

          /* env:prod */
        } catch (_error) {
          error = _error;
          console.error("Error occur while serializing", error);

          /* env:prod:end */
        } finally {

        }
        if (!json) {
          continue;
        }
        if (!_.isArray(json)) {
          mockArray[0] = json;
          json = mockArray;
        }
        for (_i = 0, _len = json.length; _i < _len; _i++) {
          j = json[_i];
          if (j.component) {
            console.assert(j.component.uid, "Serialized JSON data has no uid.");
            console.assert(!component_data[j.component.uid], "ResourceModel cannot modify existing JSON data.");
            component_data[j.component.uid] = j.component;
          }
          if (j.layout) {
            layout_data[j.layout.uid] = j.layout;
          }
        }
      }
      for (_j = 0, _len1 = connections.length; _j < _len1; _j++) {
        c = connections[_j];
        p1 = c.port1Comp();
        p2 = c.port2Comp();
        if (p1 && p2 && !p1.isRemoved() && !p2.isRemoved()) {
          try {
            c.serialize(component_data, layout_data);

            /* env:prod */
          } catch (_error) {
            error = _error;
            console.error("Error occur while serializing", error);

            /* env:prod:end */
          } finally {

          }
        } else {
          console.error("Serializing an connection while one of the port is isRemoved() or null");
        }
      }
      data = $.extend(true, {}, this.attributes);
      data.component = component_data;
      data.layout = layout_data;
      _ref1 = Design.__serializeVisitors;
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        visitor = _ref1[_k];
        visitor(component_data, layout_data, options);
      }
      data.layout.size = this.canvas.sizeAry;
      data.property = this.attributes.property || {};
      data.property.stoppable = this.isStoppable();
      data.version = "2014-02-17";
      data.state = this.__opsModel.getStateDesc() || "Enabled";
      data.id = this.__opsModel.get("id");
      currentDesignObj.use();
      return data;
    };
    DesignImpl.prototype.serializeAsStack = function(new_name) {
      var json;
      json = this.serialize({
        toStack: true
      });
      json.name = new_name || json.name;
      json.state = "Enabled";
      json.id = "";
      json.owner = "";
      json.usage = "";
      delete json.history;
      delete json.stack_id;
      return json;
    };
    DesignImpl.prototype.getUidByProperty = function(property, value, res_type) {
      var comp, context, json_data, key, last, namespaces, result, uid, _i, _len, _ref;
      if (res_type == null) {
        res_type = null;
      }
      if (!property) {
        return;
      }
      json_data = this.serialize();
      result = {};
      if (json_data && json_data.component) {
        _ref = json_data.component;
        for (uid in _ref) {
          comp = _ref[uid];
          if (res_type === null || comp.type === res_type) {
            context = comp;
            namespaces = property.split('.');
            last = namespaces.pop();
            for (_i = 0, _len = namespaces.length; _i < _len; _i++) {
              key = namespaces[_i];
              context = context[key];
            }
            if (context[last] === value) {
              if (!result[comp.type]) {
                result[comp.type] = [];
              }
              result[comp.type].push(uid);
            }
          }
        }
      }
      return result;
    };
    DesignImpl.prototype.getCost = function() {
      var c, comp, cost, costList, currency, priceMap, totalFee, uid, _i, _len, _ref;
      costList = [];
      totalFee = 0;
      priceMap = App.model.getPriceData(this.region());
      if (priceMap) {
        currency = priceMap.currency || 'USD';
        _ref = this.__componentMap;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.getCost) {
            cost = comp.getCost(priceMap, currency);
            if (!cost) {
              continue;
            }
            if (cost.length) {
              for (_i = 0, _len = cost.length; _i < _len; _i++) {
                c = cost[_i];
                totalFee += c.fee;
                costList.push(c);
              }
            } else {
              totalFee += cost.fee;
              costList.push(cost);
            }
          }
        }
        costList = _.sortBy(costList, "resource");
      }
      return {
        costList: costList,
        totalFee: Math.round(totalFee * 100) / 100
      };
    };
    diffHelper = function(newComp, oldComp, result, newComponents, oldComponents) {
      var Model, changeObj, e, r;
      changeObj = newComp || oldComp;
      Model = Design.modelClassForType(changeObj.type);
      if (Model.diffJson) {
        try {
          r = Model.diffJson(newComp, oldComp, newComponents, oldComponents);
        } catch (_error) {
          e = _error;
          console.log(e);
          r = null;
        }
        if (r) {
          if (r.id) {
            result.push(r);
          } else {
            console.error("Invalid return value when diffing json.");
          }
        }
        return;
      }
      changeObj = {
        type: changeObj.type,
        name: changeObj.name,
        id: changeObj.uid
      };
      if (!newComp) {
        changeObj.change = "Delete";
      } else if (!oldComp) {
        changeObj.change = "Create";
      } else if (!_.isEqual(newComp.resource, oldComp.resource)) {
        changeObj.change = "Update";
      }
      if (changeObj.change) {
        result.push(changeObj);
      }
      return null;
    };
    DesignImpl.prototype.diff = function(newData, oldData) {

      /* Diff the Component first */
      var c, comp, dedupMap, dedupResult, exist, obj, result, uid, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      result = [];
      _ref = newData.component;
      for (uid in _ref) {
        comp = _ref[uid];
        diffHelper(comp, oldData.component[uid], result, newData.component, oldData.component);
      }
      _ref1 = oldData.component;
      for (uid in _ref1) {
        comp = _ref1[uid];
        if (newData.component[uid]) {
          continue;
        }
        diffHelper(void 0, comp, result, newData.component, oldData.component);
      }
      dedupResult = [];
      dedupMap = {};
      for (_i = 0, _len = result.length; _i < _len; _i++) {
        obj = result[_i];
        if (constant.RESNAME[obj.type]) {
          obj.type = constant.RESNAME[obj.type];
        }
        exist = dedupMap[obj.id];
        if (!exist) {
          exist = dedupMap[obj.id] = obj;
          dedupResult.push(obj);
        } else if (obj.change && obj.change !== "Update") {
          exist.change = obj.change;
        }
        if (obj.changes) {
          exist.changes = obj.changes;
          _ref2 = obj.changes;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            c = _ref2[_j];
            c.info = c.name;
            if (c.count < 0) {
              c.info = c.name + " " + c.count;
            } else if (c.count > 0) {
              c.info = c.name + " +" + c.count;
            }
          }
        }
        if (exist.change === "Delete") {
          exist.info = exist.info || "Deletion cannot be rolled back";
        } else if (exist.change === "Terminate") {
          exist.info = exist.info || "Termination cannot be rolled back";
        }
      }
      return dedupResult;
    };
    DesignImpl.prototype.isStoppable = function() {
      var InstanceModel, LcModel, allObjects, ami, comp, _i, _len;
      InstanceModel = Design.modelClassForType(constant.RESTYPE.INSTANCE);
      LcModel = Design.modelClassForType(constant.RESTYPE.LC);
      allObjects = InstanceModel.allObjects(this).concat(LcModel.allObjects(this));
      for (_i = 0, _len = allObjects.length; _i < _len; _i++) {
        comp = allObjects[_i];
        ami = comp.getAmi() || comp.get("cachedAmi");
        if (ami && ami.rootDeviceType === 'instance-store') {
          return false;
        }
      }
      return true;
    };
    DesignImpl.prototype.instancesNoUserData = function() {
      var instanceModels, lcModels, result;
      result = true;
      instanceModels = Design.modelClassForType(constant.RESTYPE.INSTANCE).allObjects();
      _.each(instanceModels, function(instanceModel) {
        result = instanceModel.get('userData') ? false : true;
        return null;
      });
      lcModels = Design.modelClassForType(constant.RESTYPE.LC).allObjects();
      _.each(lcModels, function(lcModel) {
        result = lcModel.get('userData') ? false : true;
        return null;
      });
      return result;
    };
    _.extend(DesignImpl.prototype, Backbone.Events);
    CanvasAdaptor.setDesign(Design);

    /* env:dev                                              env:dev:end */

    /* env:debug */
    Design.DesignImpl = DesignImpl;

    /* env:debug:end */
    return Design;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/ResourceModel',["Design", "event", "backbone", 'CloudResources', "constant"], function(Design, ideEvent, Backbone, CloudResources, constant) {
    var ResourceModel, deepClone, __detailExtend, __emptyObj;
    deepClone = function(base) {
      var a, idx, key, target, value, _i, _len;
      if (base === null || !_.isObject(base)) {
        return base;
      }
      if (_.isArray(base)) {
        target = [];
        for (idx = _i = 0, _len = base.length; _i < _len; idx = ++_i) {
          a = base[idx];
          target[idx] = deepClone(a);
        }
        return target;
      }
      target = {};
      for (key in base) {
        value = base[key];
        if (value !== null && _.isObject(value)) {
          target[key] = deepClone(value);
        } else {
          target[key] = value;
        }
      }
      return target;
    };
    __detailExtend = Backbone.Model.extend;
    __emptyObj = {};

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   env:dev:end */

    /*
      -------------------------------
       ResourceModel is the base class to implment a AWS Resource.
    
       [FORCE] means method of base class will be called, even if it's overriden.
      -------------------------------
    
    
      ++ Class Method ++
    
       * extend( protoProps, overrideArray, staticProps ) : ResourceModelSubClass
          description : returns a subClass of ResourceModel
    
       * preDeserialize( JSON_DATA, LAYOUT_DATA )
          description : If a Class is marked as resolveFirst, this method will be call.
    
       * deserialize( JSON_DATA, LAYOUT_DATA, resolve )
          description : This method is used to create objects from JSON.
          Must be implemented by the user, otherwise it logs an error in console.
    
       * postDeserialize( JSON_DATA, LAYOUT_DATA )
          description : This method is called after all objects are created. It's the place to create connections between objects.
    
      ++ Class Attributes ++
    
       * handleTypes : String | StringArray
                    ( Defined by user )
          description : This attribute is used to determine which ResourceModel's deserialize is called when Desin is deserializing the JSON data.
    
       * type : String
          description : This attribute is used for users to identify what type is the resource.
    
       * id : String
          description : The GUID of this component.
    
       * newNameTmpl : String
          description : This string is used to create a name for an resource
    
      ++ Object Method ++
    
       * allObjects() : Array
          description : returns a array containing all objects of this type of Model.
    
       * createRef() : String
          description : returns an string that can be used to serialized.
    
       * listenTo() :
          description : Override Backbone.Events.listenTo. This method will make sure that when other is removed, this will stop listen to it.
    
       * design() : Design
          description : returns the Design object which manages this ResourceModel object.
    
       * isDesignAwake() : Boolean
          description : return true if the object is in current tab. Otherwise, return false.
    
       * markAsRemoved() :
          description : Simple set this object as removed, so that isRemoved() will return true. Since the object will remain in cache, user still need to call remove() at appropriate time.
    
       * isRemoved() : Boolean
          description : return true if this object has already been removed.
    
       * isRemovable() : Boolean / Object / String
          description : Returns true to indicate the resource can be removed. Returns string to show as an warning asking user if he/she wants to delete anyway. Returns {error:String} to show as an error.
    
       * isReparentable( newParent ) : Boolean / String
          description : Returns true to indicate the resource can change to other parent. Returns string to show as an error.
    
       * clone() :
          description : To allow user to duplicate the resource by drag-drop. The model must implement clone() interface.
    
       * cloneAttributes() :
          description : A helper function to allow ChildClass to implement clone(). More details, see InstanceModel
    
       * remove() : [FORCE]
          description : Just like the destructor in C++. User can override this method.
          The framework will ensure the base class's remove() will get called.
          This method will fire "destroy" event when called.
    
       * initialize() : [FORCE]
          description : The same as Backbone.Model.initialize()
    
       * constructor() :
          description : new Model() will call constructor. If a model wants to create an object, it needs to call SuperClass's constructor. Otherwise, the object is consider not created.
    
    
       * serialize()
          description : Must be implemented by the user, otherwise it logs an error in console.
    
       * storage()
       * getFromStorage( filter )
       * addToStorage( resouceModel )
          description : One can store resourceModels into this.storage().
          According to `Backbone.Collection.model` and `Backbone.Collection.create()`, collection is ususally used to store the same type/kind of objects.
          Practically speaking, using this.storage() ( especially using it store different kinds of objects ) are unreasonable. It is uncertain if something is inside this.storage(), thus making it hard to manage these things.
          Better not to use this api.
     */
    ResourceModel = Backbone.Model.extend({
      classId: _.uniqueId("dfc_"),
      type: "Framework_R",
      constructor: function(attributes, options) {
        var design;
        design = Design.instance();
        this.__design = design;
        if (!attributes) {
          attributes = {};
        }
        if (!attributes.id) {
          attributes.id = design.guid();
        }
        if (!attributes.name) {
          attributes.name = this.getNewName();
          if (!attributes.name) {
            delete attributes.name;
          }
        }
        design.classCacheForCid(this.classId).push(this);
        design.cacheComponent(attributes.id, this);
        Backbone.Model.call(this, attributes, options || __emptyObj);

        /* env:dev                                                                               env:dev:end */
        if (!this.attributes.name) {
          this.attributes.name = "";
        }
        if (!this.attributes.appId) {
          this.attributes.appId = "";
        }
        if (!this.attributes.description) {
          this.attributes.description = "";
        }
        Design.trigger(Design.EVENT.AddResource, this);
        design.trigger(Design.EVENT.AddResource, this);
        this.listenTo(this, "change", this.__triggerChangeInDesign);
        return this;
      },
      __triggerChangeInDesign: function() {
        this.design().trigger(Design.EVENT.ChangeResource, this);
      },
      getNewName: function(base) {
        var myKinds, nameMap, newName;
        if (!this.newNameTmpl) {
          newName = this.defaults ? this.defaults.name : void 0;
          return newName || "";
        }
        if (base === void 0) {
          myKinds = Design.modelClassForType(this.type).allObjects();
          base = myKinds.length;
        }
        nameMap = {};
        this.design().eachComponent(function(comp) {
          if (comp.get("name")) {
            nameMap[comp.get("name")] = true;
          }
          return null;
        });
        _.each((this.design().__opsModel.getJsonData() || []).component, function(comp) {
          var _ref;
          if ((_ref = comp.type) === constant.RESTYPE.ELB || _ref === constant.RESTYPE.ASG || _ref === constant.RESTYPE.LC || _ref === constant.RESTYPE.SP || _ref === constant.RESTYPE.SA || _ref === constant.RESTYPE.CW) {
            return nameMap[comp.name] = true;
          }
        });
        while (true) {
          newName = this.newNameTmpl + base;
          if (nameMap[newName]) {
            base += 1;
          } else {
            break;
          }
        }
        return newName;
      },
      hasAppResource: function() {
        if (!Design.instance().modeIsStack() && this.get("appId")) {
          return !!this.get('appId') && CloudResources(this.type, this.design().region()).get(this.get('appId'));
        } else {
          return true;
        }
      },
      isDesignAwake: function() {
        return Design.instance() === this.__design;
      },
      design: function() {
        return this.__design;
      },
      getAllObjects: function(awsType) {
        return this.design().classCacheForCid(Design.modelClassForType(awsType || this.type).prototype.classId).slice(0);
      },
      markAsRemoved: function(isRemoved) {
        if (isRemoved === void 0) {
          this.__isRemoved = true;
        } else {
          this.__isRemoved = !!isRemoved;
        }
        return null;
      },
      isRemoved: function() {
        return this.__isRemoved === true;
      },
      isRemovable: function() {
        return true;
      },
      isReparentable: function() {
        return true;
      },

      /* env:dev                                                                                                                                                                                                                                     env:dev:end */
      serialize: function() {
        console.warn("Class '" + this.type + "' doesn't implement serialize");
        return null;
      },
      destroy: function() {
        return this.remove();
      },
      remove: function() {
        var cache, design;
        if (this.isRemoved()) {
          console.warn("The resource is already removed : ", this);
          return;
        }
        this.__isRemoved = true;
        console.debug("Removing resource : " + (this.get('name')), this);
        design = Design.instance();
        cache = design.classCacheForCid(this.classId);
        cache.splice(cache.indexOf(this), 1);
        design.cacheComponent(this.id);
        this.stopListening();
        this.trigger("destroy", this);
        this.trigger("__remove");
        this.off();
        this.__design = null;
        Design.trigger(Design.EVENT.RemoveResource, this);
        design.trigger(Design.EVENT.RemoveResource, this);
        return null;
      },
      createRef: function(refName, isResourceNS, id) {
        if (_.isString(isResourceNS)) {
          id = isResourceNS;
          isResourceNS = true;
        }
        id = id || this.id;
        if (!id) {
          return "";
        }
        if (isResourceNS !== false) {
          return MC.genResRef(id, "resource." + refName);
        } else {
          return MC.genResRef(id, "" + refName);
        }
      },
      listenTo: function(other, event, callback) {
        var model, that;
        model = Design.modelClassForType(other.type);
        if (model && (!this._listeners || !this._listeners[other._listenerId])) {
          that = this;
          other.once("__remove", function() {
            return that.stopListening(this);
          });
        }
        return Backbone.Events.listenTo.call(this, other, event, callback);
      },
      associate: function(resolve, uid) {
        var arn, arns, attr, k, keys, masterKey, model, _i, _j, _k, _len, _len1, _len2, _ref;
        if (!this.__asso) {
          this.__asso = [];
        }
        if (resolve instanceof ResourceModel) {
          model = resolve;
          this.addToStorage(model);
          model.addToStorage(this);
        } else if (_.isFunction(resolve)) {
          if (uid) {
            model = resolve(uid);
            this.associate(model);
          } else {
            _ref = this.__asso;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              attr = _ref[_i];
              keys = attr.key.split('.');
              masterKey = keys.pop();
              arns = this.get(keys);
              for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
                k = keys[_j];
                arns = arns[k];
              }
              if (_.isString(arns)) {
                arns = [arns];
              }
              if (_.isArray(arns)) {
                for (_k = 0, _len2 = arns.length; _k < _len2; _k++) {
                  arn = arns[_k];
                  uid = MC.extractID(arn);
                  model = resolve(uid);
                  if (model) {
                    this.associate(model);
                  }
                }
                if (!keys.length) {
                  this.unset(attr.key);
                }
              }
            }
          }
        }
        return null;
      },
      disassociate: function(filter) {
        var model, removed, _i, _len, _results;
        removed = this.removeFromStorage(filter);
        _results = [];
        for (_i = 0, _len = removed.length; _i < _len; _i++) {
          model = removed[_i];
          _results.push(model.removeFromStorage(this));
        }
        return _results;
      },
      clone: null,
      cloneAttributes: function(srcTarget, option) {
        var CnClass, attr, cnType, cnsType, extraReserve, reserve, target, value, _i, _j, _len, _len1, _ref, _ref1;
        console.assert(srcTarget.type === this.type, "Invalid type of target when cloning attributes.");
        option = option || {};
        extraReserve = option.reserve || "";
        reserve = "id|appId|x|y|width|height|name";
        cnsType = option.copyConnection || [];
        _ref = srcTarget.attributes;
        for (attr in _ref) {
          value = _ref[attr];
          if (attr.indexOf("__") === 0 || reserve.indexOf(attr) !== -1 || extraReserve.indexOf(attr) !== -1) {
            continue;
          }
          if (value !== null && _.isObject(value)) {
            value = this.cloneObjectAttributes(attr, value);
          }
          this.attributes[attr] = value;
        }
        for (_i = 0, _len = cnsType.length; _i < _len; _i++) {
          cnType = cnsType[_i];
          CnClass = Design.modelClassForType(cnType);
          _ref1 = srcTarget.connectionTargets(cnType);
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            target = _ref1[_j];
            new CnClass(target, this);
          }
        }
        return null;
      },
      cloneObjectAttributes: function(attributeName, attributeValue) {
        return deepClone(attributeValue);
      },
      storage: function() {
        if (!this.__storage) {
          this.__storage = new Backbone.Collection();
        }
        return this.__storage;
      },
      getFromStorage: function(filter) {
        var models, storage;
        storage = this.storage();
        if (_.isString(filter)) {
          models = _.filter(storage.models, function(res) {
            return res.type === filter;
          });
        } else if (_.isFunction(filter)) {
          models = _.filter(storage.models, filter);
        } else {
          models = storage.models;
        }
        return new Backbone.Collection(models);
      },
      removeFromStorage: function(filter) {
        var models, storage;
        storage = this.storage();
        if (_.isString(filter)) {
          models = _.filter(storage.models, function(res) {
            return res.type === filter;
          });
        } else if (_.isFunction(filter)) {
          models = _.filter(storage.models, filter);
        } else if (filter instanceof ResourceModel) {
          models = filter;
        }
        if (models) {
          storage.remove(models);
        } else {
          storage.reset();
        }
        return models;
      },
      addToStorage: function(resource) {
        var storage;
        storage = this.storage();
        storage.add(resource);
        return null;
      }
    }, {
      allObjects: function(design) {
        var d;
        d = Design.instance();
        if (design && design.prototype === d.prototype) {
          d = design;
        }
        return d.classCacheForCid(this.prototype.classId).slice(0);
      },
      deserialize: function() {
        console.error("Class '" + this.prototype.type + "' doesn't implement deserialize");
        return null;
      },
      extend: function(protoProps, staticProps) {
        var handleTypes, resolveFirst, subClass, type, _i, _len;
        console.assert(protoProps.type, "Subclass of ResourceModel does not specifying a type");
        if (staticProps) {
          handleTypes = staticProps.handleTypes;
          resolveFirst = staticProps.resolveFirst;
          delete staticProps.handleTypes;
          delete staticProps.resolveFirst;
        }

        /* env:dev                                                                                              env:dev:end */

        /* jshint -W083 */

        /* jshint +W083 */
        protoProps.classId = _.uniqueId("dfc_");
        subClass = __detailExtend.call(this, protoProps, staticProps);
        if (!handleTypes) {
          handleTypes = protoProps.type;
        }
        if (handleTypes) {
          if (_.isString(handleTypes)) {
            handleTypes = [handleTypes];
          }
          for (_i = 0, _len = handleTypes.length; _i < _len; _i++) {
            type = handleTypes[_i];
            Design.registerModelClass(type, subClass, resolveFirst);
          }
        }
        return subClass;
      }
    });
    Design.registerModelClass(ResourceModel.prototype.type, ResourceModel);
    return ResourceModel;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/ConnectionModel',["./ResourceModel", "Design", "CanvasManager", "./canvasview/CanvasElement"], function(ResourceModel, Design, CanvasManager, CanvasElement) {

    /*
      -------------------------------
       ConnectionModel is the base class to implment a connection between two resources
      -------------------------------
    
      ++ Object Method ++
    
      setDestroyAfterInit()
        description : calling this method will cause the line to be removed after initialize()
    
      port1()
      port2()
        description : returns the name of the port, port1() is always smaller than port2()
    
      port1Comp()
      port2Comp()
        description : returns the component of each port
    
      getTarget : ( type )
        description : returns a component of a specific type
    
      getOtherTarget : ( theType )
        description : returns a component that its type is not of theType
    
      connectsTo : ( id )
        description : returns true if this connection connects to resource of id
    
      remove( option )
        description : remove the connection from two resources. Optional parameter `option` will be passed.
        `option.reason` will provided when the connection is removed due to one of its target is being removed.
    
    
    
      ++ Class Attributes ++
    
      type :
        description : A string to identify the Class
    
      portDefs :
        description : Ports defination for a visual line
    
      oneToMany :
        description : A type string.
        When C ( connection ) between A ( TYPEA ) and B ( TYPEB ) is created. If oneToMany is TYPEA, then previous B <=> TYPEA connection will be removed.
    
    
    
      ++ Class Method ++
    
      isConnectable( comp1, comp2 )
        description : This method is used to determine if user can create a line between two resources.
     */
    var ConnectionModel;
    ConnectionModel = ResourceModel.extend({
      node_line: true,
      type: "Framework_CN",
      constructor: function(p1Comp, p2Comp, attr, option) {

        /* env:dev                                                                                                                                                                                                             env:dev:end */
        var cn, cns, comp, _i, _len, _ref;
        if (!p1Comp || !p2Comp) {
          console.warn("Connection of " + this.type + " is not created, because invalid targets :", [p1Comp, p2Comp]);
          return;
        }

        /*
         * We must allow self-reference connection to be created.
         * Because SgModel would need that.
         */
        if (!option || option.detectDuplicate !== false) {
          cns = Design.modelClassForType(this.type).allObjects();
          cn = Design.modelClassForType(this.type).findExisting(p1Comp, p2Comp);
          if (cn) {
            console.info("Found existing connection " + this.type + " of ", [p1Comp, p2Comp]);
            if (attr) {
              cn.set(attr);
            }
            return cn;
          }
        }
        if (!this.assignCompsToPorts(p1Comp, p2Comp)) {
          console.error("Trying to connect components while the connection does not support them : ", [p1Comp, p2Comp]);
          return;
        }
        ResourceModel.call(this, attr, option);
        if (this.__destroyAfterInit) {
          this.remove(this);
          this.id = "";
          return this;
        }
        this.__port1Comp.connect_base(this);
        if (this.__port1Comp !== this.__port2Comp) {
          this.__port2Comp.connect_base(this);
        }
        if (this.oneToMany) {
          console.assert(this.oneToMany === this.port1Comp().type || this.oneToMany === this.port2Comp().type, "Invalid oneToMany parameter");
          comp = this.getOtherTarget(this.oneToMany);
          _ref = comp.connections(this.type);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cn = _ref[_i];
            if (cn !== this) {
              cn.remove(this);
            }
          }
        }
        if (this.draw) {
          this.draw();
        }
        return this;
      },
      setDestroyAfterInit: function() {
        this.__destroyAfterInit = true;
        return null;
      },
      assignCompsToPorts: function(p1Comp, p2Comp) {
        var def, _i, _len, _ref;
        if (this.portDefs) {
          _ref = this.portDefs;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            def = _ref[_i];
            if (def.port1.type === p1Comp.type && def.port2.type === p2Comp.type) {
              this.__portDef = def;
              this.__port1Comp = p1Comp;
              this.__port2Comp = p2Comp;
              break;
            } else if (def.port1.type === p2Comp.type && def.port2.type === p1Comp.type) {
              this.__portDef = def;
              this.__port1Comp = p2Comp;
              this.__port2Comp = p1Comp;
              break;
            }
          }
          return !!this.__portDef;
        } else {
          this.__port1Comp = p1Comp;
          this.__port2Comp = p2Comp;
        }
        return true;
      },
      port: function(id, attr) {
        if (!this.__portDef) {
          return "";
        }
        if (this.__port1Comp === id || this.__port1Comp.id === id) {
          return this.__portDef.port1[attr];
        }
        if (this.__port2Comp === id || this.__port2Comp.id === id) {
          return this.__portDef.port2[attr];
        }
        return "";
      },
      port1: function(attr) {
        if (this.__portDef) {
          return this.__portDef.port1[attr];
        } else {
          return "";
        }
      },
      port2: function(attr) {
        if (this.__portDef) {
          return this.__portDef.port2[attr];
        } else {
          return "";
        }
      },
      connectsTo: function(id) {
        return (this.__port1Comp && this.__port1Comp.id === id) || (this.__port2Comp && this.__port2Comp.id === id);
      },
      port1Comp: function() {
        return this.__port1Comp;
      },
      port2Comp: function() {
        return this.__port2Comp;
      },
      getOtherTarget: function(type) {
        if (!_.isString(type)) {
          if (this.__port1Comp === type) {
            return this.__port2Comp;
          } else {
            return this.__port1Comp;
          }
        } else {
          if (this.__port1Comp.type === type) {
            return this.__port2Comp;
          } else {
            return this.__port1Comp;
          }
        }
      },
      getTarget: function(type) {
        if (this.__port1Comp.type === type) {
          return this.__port1Comp;
        }
        if (this.__port2Comp.type === type) {
          return this.__port2Comp;
        }
        return null;
      },
      remove: function(option) {
        var p1Exist, p2Exist, v;
        console.assert(!(this.__port1Comp.isRemoved() && this.__port2Comp.isRemoved()), "Both ports are already removed when connection is removing", this);
        p1Exist = !this.__port1Comp.isRemoved();
        p2Exist = !this.__port2Comp.isRemoved();
        if (p1Exist) {
          this.__port1Comp.attach_connection(this, true);
        }
        if (p2Exist) {
          this.__port2Comp.attach_connection(this, true);
        }
        if (p1Exist) {
          this.__port1Comp.disconnect_base(this, option);
        }
        if (p2Exist) {
          this.__port2Comp.disconnect_base(this, option);
        }
        v = this.__view;
        if (v) {
          v.detach();
        }
        ResourceModel.prototype.remove.call(this);
        return null;
      },
      serialize: function() {
        return null;
      },
      getCanvasView: function() {
        if (!this.isVisual()) {
          return null;
        }
        if (this.__view === void 0) {
          this.__view = CanvasElement.createView(this.ceType || "Line", this);
        }
        return this.__view;
      },
      isVisual: function() {
        return !!this.portDefs;
      },
      draw: function(isCreate) {
        var v;
        if (!Design.instance().shouldDraw()) {
          return;
        }
        v = this.getCanvasView();
        if (v) {
          v.draw(isCreate === true);
        }
        return null;
      }
    }, {
      findExisting: function(p1Comp, p2Comp) {
        var cn, _i, _len, _ref;
        _ref = this.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          if (cn.port1Comp() === p1Comp && cn.port2Comp() === p2Comp && !cn.isRemoved()) {
            return cn;
          }
          if (cn.port2Comp() === p1Comp && cn.port1Comp() === p2Comp && !cn.isRemoved()) {
            return cn;
          }
        }
        return null;
      },
      extend: function(protoProps, staticProps) {
        var child, def, t, tags, tmp, _i, _j, _len, _len1, _ref;
        tags = [];
        if (protoProps.portDefs) {
          if (!_.isArray(protoProps.portDefs)) {
            protoProps.portDefs = [protoProps.portDefs];
          }
          _ref = protoProps.portDefs;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            def = _ref[_i];
            if (def.port1.name > def.port2.name) {
              tmp = def.port1;
              def.port1 = def.port2;
              def.port2 = tmp;
            }
            tags.push(def.port1.name + ">" + def.port2.name);
          }
          if (!protoProps.type) {
            protoProps.type = tags[0];
          }
        }
        child = ResourceModel.extend.call(this, protoProps, staticProps);
        for (_j = 0, _len1 = tags.length; _j < _len1; _j++) {
          t = tags[_j];
          Design.registerModelClass(t, child);
        }
        Design.registerModelClass(protoProps.type, child);
        child.__isLineClass = true;
        return child;
      },
      isConnectable: function(comp1, comp2) {
        return true;
      },
      connectionData: function(type, portName) {
        var LineModel, allLinePortMap, arr, def, op, p, _i, _j, _len, _len1, _ref, _ref1;
        allLinePortMap = {};
        _ref = Design.lineModelClasses();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          LineModel = _ref[_i];
          if (!LineModel.prototype.portDefs) {
            continue;
          }
          _ref1 = LineModel.prototype.portDefs;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            def = _ref1[_j];
            if (def.port1.type === type) {
              p = def.port1;
              op = def.port2;
            } else if (def.port2.type === type) {
              p = def.port2;
              op = def.port1;
            } else {
              continue;
            }
            if (!portName || portName === p.name) {
              arr = allLinePortMap[op.type] || (allLinePortMap[op.type] = []);
              arr.push(op.name);
            }
          }
        }
        return allLinePortMap;
      }
    });
    return ConnectionModel;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/connection/EniAttachment',["constant", "../ConnectionModel", "i18n!/nls/lang.js"], function(constant, ConnectionModel, lang) {
    var C;
    C = ConnectionModel.extend({
      type: "EniAttachment",
      defaults: {
        lineType: "attachment",
        index: 1
      },
      initialize: function(attributes) {
        var ami;
        ami = this.getTarget(constant.RESTYPE.INSTANCE);
        if (attributes && attributes.index) {
          this.ensureAttachmentOrder();
        } else {
          this.attributes.index = ami.connectionTargets("EniAttachment").length + 1;
        }
        return null;
      },
      ensureAttachmentOrder: function() {
        var ami, amiConnections, attach, attachments, cnn, idx, newArray, _i, _j, _k, _len, _len1, _len2, _ref;
        ami = this.getTarget(constant.RESTYPE.INSTANCE);
        attachments = ami.connections("EniAttachment");
        for (_i = 0, _len = attachments.length; _i < _len; _i++) {
          attach = attachments[_i];
          if (attach !== this && attach.attributes.index === this.attributes.index) {
            for (idx = _j = 0, _len1 = attachments.length; _j < _len1; idx = ++_j) {
              attach = attachments[idx];
              attach.attributes.index = idx + 1;
              attach.getOtherTarget(ami).updateName();
            }
            return;
          }
        }
        newArray = attachments.sort(function(a, b) {
          return a.attributes.index - b.attributes.index;
        });
        if (attachments.indexOf(this) !== newArray.indexOf(this)) {
          amiConnections = [];
          _ref = ami.get("__connections");
          for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
            cnn = _ref[_k];
            if (cnn.type !== "EniAttachment") {
              amiConnections.push(cnn);
            }
          }
          ami.attributes.__connections = amiConnections.concat(newArray);
        }
        return null;
      },
      remove: function() {
        var SgModel, ami, attach, attachments, eni, startIdx;
        ConnectionModel.prototype.remove.apply(this, arguments);
        ami = this.getTarget(constant.RESTYPE.INSTANCE);
        eni = this.getTarget(constant.RESTYPE.ENI);
        if (!ami.isRemoved()) {
          attachments = ami.connections("EniAttachment");
          startIdx = 1;
          while (startIdx <= attachments.length) {
            attach = attachments[startIdx - 1];
            if (attach.attributes.index !== startIdx) {
              attach.attributes.index = startIdx;
              attach.getTarget(constant.RESTYPE.ENI).updateName();
            }
            ++startIdx;
          }
        }
        if (!ami.isRemoved() && !eni.isRemoved()) {
          SgModel = Design.modelClassForType(constant.RESTYPE.SG);
          SgModel.tryDrawLine(ami, eni);
        }
        return null;
      },
      portDefs: {
        port1: {
          name: "instance-attach",
          type: constant.RESTYPE.INSTANCE
        },
        port2: {
          name: "eni-attach",
          type: constant.RESTYPE.ENI
        }
      }
    }, {
      isConnectable: function(p1Comp, p2Comp) {
        var eni, instance, maxEniCount, p1p, p2p;
        p1p = p1Comp.parent();
        p2p = p2Comp.parent();
        if (p1p.type === constant.RESTYPE.SUBNET) {
          p1p = p1p.parent();
          p2p = p2p.parent();
        }
        if (p1p !== p2p) {
          return false;
        }
        if (p1Comp.type === constant.RESTYPE.INSTANCE) {
          instance = p1Comp;
          eni = p2Comp;
        } else {
          instance = p2Comp;
          eni = p1Comp;
        }
        if (eni.connections("EniAttachment").length > 0) {
          return false;
        }
        maxEniCount = instance.getMaxEniCount();
        if (instance.connections("EniAttachment").length + 1 >= maxEniCount) {
          return sprintf(lang.ide.CVS_WARN_EXCEED_ENI_LIMIT, instance.get("name"), instance.get("instanceType"), maxEniCount);
        }
        if (instance.getEmbedEni().get("assoPublicIp") === true) {
          return {
            confirm: MC.template.modalAttachingEni({
              host: instance.get("name"),
              eni: eni.get("name")
            }),
            action: "Attach and Remove Public IP"
          };
        }
        return true;
      }
    });
    return C;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/connection/VPNConnection',["constant", "../ConnectionModel"], function(constant, ConnectionModel) {
    var C;
    C = ConnectionModel.extend({
      type: constant.RESTYPE.VPN,
      defaults: function() {
        return {
          lineType: "vpn",
          routes: []
        };
      },
      portDefs: {
        port1: {
          name: "vgw-vpn",
          type: constant.RESTYPE.VGW
        },
        port2: {
          name: "cgw-vpn",
          type: constant.RESTYPE.CGW
        }
      },
      serialize: function(component_data) {
        var cgw, routes, vgw;
        vgw = this.getTarget(constant.RESTYPE.VGW);
        cgw = this.getTarget(constant.RESTYPE.CGW);
        if (cgw.isDynamic()) {
          routes = [];
        } else {
          routes = _.map(this.get("routes"), function(r) {
            return {
              DestinationCidrBlock: r
            };
          });
        }
        component_data[this.id] = {
          name: "vpn:" + cgw.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            CustomerGatewayId: cgw.createRef("CustomerGatewayId"),
            Options: {
              StaticRoutesOnly: !cgw.isDynamic()
            },
            Type: "ipsec.1",
            Routes: routes,
            VpnConnectionId: this.get("appId"),
            VpnGatewayId: vgw.createRef("VpnGatewayId")
          }
        };
        return null;
      }
    }, {
      handleTypes: constant.RESTYPE.VPN,
      deserialize: function(data, layout_data, resolve) {
        var cgw, vpn;
        cgw = resolve(MC.extractID(data.resource.CustomerGatewayId));
        vpn = resolve(MC.extractID(data.resource.VpnGatewayId));
        if (!cgw || !vpn) {
          return;
        }
        return new C(cgw, vpn, {
          id: data.uid,
          appId: data.resource.VpnConnectionId,
          routes: _.map(data.resource.Routes, function(r) {
            return r.DestinationCidrBlock;
          })
        });
      }
    });
    return C;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/ComplexResModel',["Design", "CanvasManager", "./ResourceModel", "constant", "./canvasview/CanvasElement"], function(Design, CanvasManager, ResourceModel, constant, CanvasElement) {
    var ComplexResModel, emptyArr;
    emptyArr = [];

    /*
      -------------------------------
       ComplexResModel is the base class to implement a Resource that have relationship with other resources. Any visual resources should inherit from ComplexResModel
      -------------------------------
    
      ++ Object Method ++
    
      connect : ( ConnectionModel ) -> [FORCE]
          description : connect is called when a connection is created, subclass should override it to do its own logic.
    
      disconnect : ( ConnectionModel, reason )->
          description : disconnect is called when a connection is removed, subclass should override it to do its own logic. `reason` if not null, it will point to an model, which is the cause to remove the connection.
    
    
      draw : ( isNewlyCreated : Boolean ) ->
          description : if the user defines this method, it will be called after object is created. And the framework might call this method at an approprieate time.
          If the method is defined, it means it's a visual resource
    
      isRemovable   : ()->
          description : When user press delete key in canvas, canvas will ask if the object can be removed. If isRemovable returns a string, it will treat it as a warning, if the string starts with '!', it is a infomation for not allowing the user to delete
    
      connections : ( typeString )->
          description : returns an array of connections. Can be filter by typeString
    
      connectionTargets : ( typeString )->
          description : The same as connections, except the array holds targets connceted to this.
    
      onParentChanged : ()->
          description : If this method is defined, it will be called after the Model's parent is changed.
     */
    ComplexResModel = ResourceModel.extend({

      /*
      defaults :
        x        : 0
        y        : 0
        width    : 0
        height   : 0
        __parent : null
       */
      type: "Framework_CR",
      constructor: function(attributes, options) {
        if (attributes && attributes.parent) {
          attributes.__parent = attributes.parent;
          delete attributes.parent;
        }
        ResourceModel.call(this, attributes, options);
        if (attributes && attributes.__parent) {
          this.set('__parent', null);
          attributes.__parent.addChild(this);
        }
        return null;
      },
      initialize: function() {
        if (this.draw && Design.instance().shouldDraw()) {
          this.draw(true);
        }
        return null;
      },
      setName: function(name) {
        if (this.get("name") === name) {
          return;
        }
        this.set("name", name);
        if (this.draw) {
          this.draw();
        }
        return null;
      },
      remove: function() {
        var cns, l, v;
        this.markAsRemoved();
        cns = this.attributes.__connections;
        if (cns) {
          l = cns.length;
          while (l) {
            --l;
            cns[l].remove();
          }
        }
        v = this.getCanvasView();
        if (v) {
          v.detach();
        }
        this.markAsRemoved(false);
        ResourceModel.prototype.remove.call(this);
        return null;
      },
      attach_connection: function(cn, detach) {
        var connections, idx;
        connections = this.get("__connections") || [];
        idx = connections.indexOf(cn);
        if (detach) {
          if (idx !== -1) {
            connections.splice(idx, 1);
          }
        } else {
          if (idx === -1) {
            connections.push(cn);
            this.set("__connections", connections);
          }
        }
        return null;
      },
      connect_base: function(connection) {

        /*
        connect_base.call(this) # This is used to suppress the warning in ResourceModel.extend.
         */
        this.attach_connection(connection);
        if (this.connect) {
          this.connect(connection);
        }
        return null;
      },
      disconnect_base: function(connection, reason) {

        /*
        disconnect_base.call(this) # This is used to suppress the warning in ResourceModel.extend.
         */
        this.attach_connection(connection, true);
        if (this.disconnect) {
          this.disconnect(connection, reason);
        }
        return null;
      },
      isVisual: function() {
        return true;
      },
      getCanvasView: function(containerId) {
        if (this.__view === void 0 && this.isVisual()) {
          this.__view = CanvasElement.createView(this.type, this, containerId);

          /* env:dev                                                                                                                                                                env:dev:end */
        }
        return this.__view;
      },
      draw: function(isCreate) {
        var args, v;
        if (!this.isVisual() || !Design.instance().shouldDraw()) {
          return;
        }
        v = this.getCanvasView();
        if (v) {
          args = arguments;
          args[0] = args[0] === true;
          if (isCreate) {
            v.nodeCreated = true;
          }
          if (!isCreate && !v.nodeCreated) {
            return;
          }
          v.draw.apply(v, args);
        }
        return null;
      },

      /*
       ReadOnly Infomation
       */
      connections: function(type) {
        var cnns;
        cnns = this.get("__connections");
        if (cnns && _.isString(type)) {
          cnns = _.filter(cnns, function(cn) {
            return cn.type === type;
          });
        }
        return cnns || emptyArr;
      },
      connectionTargets: function(connectionType) {
        var cnn, cnns, targets, _i, _len;
        targets = [];
        cnns = this.get("__connections");
        if (cnns) {
          for (_i = 0, _len = cnns.length; _i < _len; _i++) {
            cnn = cnns[_i];
            if (!connectionType || cnn.type === connectionType) {
              targets.push(cnn.getOtherTarget(this));
            }
          }
        }
        return targets;
      },
      getSubnetRef: function() {
        var p;
        p = this;
        while (p) {
          if (p.type === constant.RESTYPE.SUBNET) {
            break;
          }
          p = p.parent();
        }
        if (p) {
          return p.createRef("SubnetId");
        } else {
          return "";
        }
      },
      getVpcRef: function() {
        var VpcModel, p;
        p = this;
        while (p) {
          if (p.type === constant.RESTYPE.VPC) {
            break;
          }
          p = p.parent();
        }
        if (!p) {
          VpcModel = Design.modelClassForType(constant.RESTYPE.VPC);
          p = VpcModel.theVPC();
        }
        if (p) {
          return p.createRef("VpcId");
        } else {
          return "";
        }
      },
      generateLayout: function() {
        var layout;
        layout = {
          coordinate: [this.x(), this.y()],
          uid: this.id
        };
        if (this.parent()) {
          layout.groupUId = this.parent().id;
        }
        return layout;
      },
      parent: function() {
        return this.get('__parent') || null;
      },
      x: function() {
        return this.get('x') || 0;
      },
      y: function() {
        return this.get('y') || 0;
      },
      width: function() {
        return this.get('width') || 0;
      },
      height: function() {
        return this.get('height') || 0;
      }
    }, {
      extend: function(protoProps, staticProps) {
        if (protoProps.draw) {
          protoProps.draw = (function() {
            var draw;
            draw = protoProps.draw;
            return function() {
              if (Design.instance().shouldDraw()) {
                return draw.apply(this, arguments);
              }
            };
          })();
        }
        return ResourceModel.extend.call(this, protoProps, staticProps);
      }
    });
    return ComplexResModel;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/InstanceModel',["../ComplexResModel", "Design", "constant", "i18n!/nls/lang.js", 'CloudResources'], function(ComplexResModel, Design, constant, lang, CloudResources) {
    var Model, emptyArray;
    emptyArray = [];
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.INSTANCE,
      newNameTmpl: "host-",
      defaults: {
        x: 2,
        y: 2,
        width: 9,
        height: 9,
        count: 1,
        imageId: '',
        tenancy: 'default',
        ebsOptimized: false,
        instanceType: "m1.small",
        monitoring: false,
        userData: "",
        rdSize: 0,
        rdIops: 0,
        rdType: 'gp2',
        cachedAmi: null,
        state: null
      },
      initialize: function(attr, option) {
        var EniModel, KpModel, SgAsso, SgModel, defaultKp, defaultSg, tenancy, volSize, vpc;
        console.assert(attr.imageId, "Invalid attributes when creating InstanceModel", attr);
        option = option || {};
        this.setAmi(attr.imageId);
        if (option.createByUser) {
          EniModel = Design.modelClassForType(constant.RESTYPE.ENI);
          this.setEmbedEni(new EniModel({
            name: "eni0",
            assoPublicIp: false
          }, {
            instance: this
          }));
        }
        if (option.cloneSource) {
          this.clone(option.cloneSource);
        } else if (option.createByUser) {
          this.initInstanceType();
        }
        if (!this.get("rdSize")) {
          volSize = this.getAmiRootDeviceVolumeSize();
          if (volSize > 0) {
            this.set("rdSize", volSize);
          }
        }
        this.draw(true);
        if (option.createByUser && !option.cloneSource) {
          KpModel = Design.modelClassForType(constant.RESTYPE.KP);
          defaultKp = KpModel.getDefaultKP();
          if (defaultKp) {
            defaultKp.assignTo(this);
          } else {
            console.error("No DefaultKP found when initialize InstanceModel");
          }
          SgModel = Design.modelClassForType(constant.RESTYPE.SG);
          defaultSg = SgModel.getDefaultSg();
          if (defaultSg) {
            SgAsso = Design.modelClassForType("SgAsso");
            new SgAsso(this, defaultSg);
          } else {
            console.error("No DefaultSG found when initialize InstanceModel");
          }
        }
        tenancy = this.get("tenancy");
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
        if (vpc && !vpc.isDefaultTenancy()) {
          tenancy = "dedicated";
        }
        this.setTenancy(tenancy);
        return null;
      },
      groupMembers: function() {
        if (!this.__groupMembers) {
          this.__groupMembers = [];
        }
        return this.__groupMembers;
      },
      getAvailabilityZone: function() {
        var p;
        p = this.parent();
        if (p.type === constant.RESTYPE.SUBNET) {
          return p.parent();
        } else {
          return p;
        }
      },
      getOSFamily: function() {
        var ami;
        ami = this.getAmi() || this.get("cachedAmi");
        if (!ami || !ami.osType || !ami.osFamily) {
          console.warn("Cannot find ami infomation for instance :", this);
          return "linux";
        }
        if (ami.osFamily) {
          return ami.osFamily;
        }
        return CloudResources(constant.RESTYPE.AMI, this.design.region()).getOSFamily(ami.id);
      },
      initInstanceType: function() {
        var i, type, _i, _len, _ref;
        _ref = this.getInstanceTypeList();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (i.name !== "t1.micro") {
            type = i.name;
            break;
          }
        }
        this.attributes.instanceType = type || "m1.small";
      },
      getCost: function(priceMap, currency) {
        var ami, count, cw_fee, fee, formatedFee, instanceType, name, osFamily, osType, priceObj, t, unit, _i, _len, _ref;
        if (!priceMap.instance) {
          return null;
        }
        ami = this.getAmi() || this.get("cachedAmi");
        osType = ami ? ami.osType : "linux-other";
        osFamily = this.getOSFamily();
        instanceType = this.get("instanceType").split(".");
        unit = priceMap.instance.unit;
        fee = priceMap.instance[instanceType[0]][instanceType[1]];
        fee = fee ? fee.onDemand : void 0;
        if (fee) {
          if (fee[osFamily] === void 0 && osFamily.indexOf("mswin") === 0) {
            osFamily = "mswin";
          }
          fee = fee[osFamily];
        }
        fee = fee ? fee[currency] : void 0;
        if (!fee) {
          return null;
        }
        if (unit === "perhr") {
          formatedFee = fee + "/hr";
          fee *= 24 * 30;
        } else {
          formatedFee = fee + "/mo";
        }
        count = this.get("count") || 1;
        name = this.get("name");
        if (count > 1) {
          name += " (x" + count + ")";
          fee *= count;
        }
        priceObj = {
          resource: name,
          type: this.get("instanceType"),
          fee: fee,
          formatedFee: formatedFee
        };
        if (this.get("monitoring")) {
          _ref = priceMap.cloudwatch.types;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            t = _ref[_i];
            if (t.ec2Monitoring) {
              fee = t.ec2Monitoring[currency];
              cw_fee = {
                resource: this.get("name") + "-monitoring",
                type: "CloudWatch",
                fee: fee * count,
                formatedFee: fee + "/mo"
              };
              return [priceObj, cw_fee];
            }
          }
        }
        return priceObj;
      },
      isReparentable: function(newParent) {
        var check;
        if (newParent.type === constant.RESTYPE.ASG) {
          return false;
        }
        if (newParent.type === constant.RESTYPE.SUBNET) {
          if (newParent.parent() !== this.parent().parent()) {
            check = true;
          }
        } else {
          check = true;
        }
        if (check && this.connectionTargets("EniAttachment").length > 0) {
          return lang.ide.CVS_MSG_ERR_MOVE_ATTACHED_ENI;
        }
        return true;
      },
      connect: function(cn) {
        var eni;
        if (cn.type === "EniAttachment") {
          eni = this.getEmbedEni();
          if (eni) {
            return eni.set("assoPublicIp", false);
          }
        }
      },
      setPrimaryEip: function(toggle) {
        var eni;
        eni = this.getEmbedEni();
        if (eni) {
          eni.setPrimaryEip(toggle);
        } else {
          this.set("hasEip", toggle);
          if (toggle) {
            if (!this.attributes.eipData) {
              this.attributes.eipData = {};
            }
            if (!this.attributes.eipData.id) {
              this.attributes.eipData.id = MC.guid();
            }
          }
        }
        return this.draw();
      },
      hasPrimaryEip: function() {
        var eni;
        eni = this.getEmbedEni();
        if (eni) {
          return eni.hasPrimaryEip();
        } else {
          return this.get("hasEip");
        }
      },
      hasAutoAssignPublicIp: function() {
        return this.getEmbedEni().get('assoPublicIp');
      },
      setCount: function(count) {
        var c, eni, route, _i, _j, _len, _len1, _ref, _ref1;
        this.set("count", count);
        if (count > 1) {
          route = this.connections('RTB_Route')[0];
          if (route) {
            route.remove();
          }
        }
        this.draw();
        _ref = this.connectionTargets("EniAttachment");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          eni = _ref[_i];
          if (count > 1) {
            _ref1 = eni.connections("RTB_Route");
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              c = _ref1[_j];
              c.remove();
            }
          }
          eni.draw();
        }
        return null;
      },
      isDefaultTenancy: function() {
        var VpcModel, vpc;
        VpcModel = Design.modelClassForType(constant.RESTYPE.VPC);
        vpc = VpcModel.allObjects()[0];
        if (vpc && !vpc.isDefaultTenancy()) {
          return false;
        } else {
          return this.get("tenancy") !== "dedicated";
        }
        return null;
      },
      setAmi: function(amiId) {
        var ami, cached, minRdSize, rdEbs, rdName;
        this.set("imageId", amiId);
        ami = this.getAmi();
        cached = this.get("cachedAmi");
        if (ami && cached) {
          cached.osType = ami.osType;
          cached.architecture = ami.architecture;
          cached.rootDeviceType = ami.rootDeviceType;
        }
        if (ami && ami.blockDeviceMapping) {
          rdName = ami.rootDeviceName;
          rdEbs = ami.blockDeviceMapping[rdName];
          if (!rdEbs) {
            _.each(ami.blockDeviceMapping, function(value, key) {
              if (rdName.indexOf(key) !== -1 && !rdEbs) {
                rdEbs = value;
              }
              return null;
            });
          }
          minRdSize = rdEbs ? parseInt(rdEbs.volumeSize, 10) : 10;
          if (this.get("rdSize") < minRdSize) {
            this.set("rdSize", minRdSize);
          }
        }
        this.draw();
        return null;
      },
      getAmi: function() {
        var ami;
        ami = CloudResources(constant.RESTYPE.AMI, this.design().region()).get(this.get("imageId"));
        if (ami) {
          return ami.toJSON();
        } else {
          return null;
        }
      },
      getBlockDeviceMapping: function() {
        var ami, blockDeviceMapping, rdEbs, rdName;
        ami = this.getAmi() || this.get("cachedAmi");
        if (ami && ami.rootDeviceType === "ebs" && ami.blockDeviceMapping) {
          rdName = ami.rootDeviceName;
          rdEbs = ami.blockDeviceMapping[rdName];
          if (!rdEbs) {
            _.each(ami.blockDeviceMapping, function(value, key) {
              if (rdName.indexOf(key) !== -1 && !rdEbs) {
                rdEbs = value;
                rdName = key;
              }
              return null;
            });
          }
          blockDeviceMapping = [
            {
              DeviceName: rdName,
              Ebs: {
                SnapshotId: rdEbs.snapshotId,
                VolumeSize: this.get("rdSize") || rdEbs.volumeSize,
                VolumeType: this.get('rdType')
              }
            }
          ];
          if (this.get("rdIops") && parseInt(this.get("rdSize"), 10) >= 10) {
            blockDeviceMapping[0].Ebs.Iops = this.get("rdIops");
          }
        }
        return blockDeviceMapping || [];
      },
      getAmiRootDevice: function() {
        var amiInfo, rd, rdEbs, rdName;
        amiInfo = this.getAmi() || this.get("cachedAmi");
        rd = null;
        if (amiInfo && amiInfo.rootDeviceType === "ebs" && amiInfo.blockDeviceMapping) {
          rdName = amiInfo.rootDeviceName;
          rdEbs = amiInfo.blockDeviceMapping[rdName];
          if (rdName && !rdEbs) {
            _.each(amiInfo.blockDeviceMapping, function(value, key) {
              if (rdName.indexOf(key) !== -1 && !rdEbs) {
                rdEbs = value;
                rdName = key;
              }
              return null;
            });
          }
          if (rdName && rdEbs) {
            rd = {
              "DeviceName": rdName,
              "Ebs": {
                "VolumeSize": Number(rdEbs.volumeSize),
                "SnapshotId": rdEbs.snapshotId,
                "VolumeType": rdEbs.volumeType
              }
            };
            if (rdEbs.volumeType === "io1") {
              rd.Ebs.Iops = rdEbs.iops;
            }
          } else {
            console.warn("getAmiRootDevice(): can not found root device of AMI(" + this.get("imageId") + ")", this);
          }
        }
        return rd;
      },
      getAmiRootDeviceVolumeSize: function() {
        var amiInfo, rd, volSize, volumeSize;
        volSize = 0;
        amiInfo = this.getAmi();
        if (amiInfo) {
          if (amiInfo.osType === "windows") {
            volumeSize = 30;
          } else {
            volumeSize = 10;
          }
          rd = this.getAmiRootDevice();
          if (rd) {
            volSize = rd.Ebs.VolumeSize;
          } else {
            console.warn("getAmiRootDeviceVolumeSize(): use default volumeSize " + volSize, this);
          }
        } else {
          console.warn("getAmiRootDeviceVolumeSize(): unknown volumeSize for " + this.get("imageId"));
        }
        return volSize;
      },
      getAmiRootDeviceName: function() {
        var rd;
        rd = this.getAmiRootDevice();
        if (rd && rd.DeviceName) {
          return rd.DeviceName;
        } else {
          return "";
        }
      },
      getInstanceTypeConfig: function(type) {
        var config;
        config = App.model.getInstanceTypeConfig(this.design().region());
        if (config) {
          return config[type || this.get("instanceType")];
        }
        return null;
      },
      getMaxEniCount: function() {
        var config;
        config = this.getInstanceTypeConfig();
        if (config) {
          config = config.eni;
        }
        return config || 16;
      },
      isEbsOptimizedEnabled: function() {
        var EbsMap, ami, instanceType;
        ami = this.getAmi() || this.get("cachedAmi");
        if (ami && ami.rootDeviceType === "instance-store") {
          return false;
        }
        instanceType = this.getInstanceTypeConfig();
        if (instanceType && instanceType.ebs_optimized) {
          return instanceType.ebs_optimized === 'Yes';
        }
        EbsMap = {
          "m1.large": true,
          "m1.xlarge": true,
          "m2.2xlarge": true,
          "m2.4xlarge": true,
          "m3.xlarge": true,
          "m3.2xlarge": true,
          "c1.xlarge": true,
          "c3.xlarge": true,
          "c3.2xlarge": true,
          "c3.4xlarge": true,
          "g2.2xlarge": true,
          "i2.xlarge": true,
          "i2.2xlarge": true,
          "i2.4xlarge": true
        };
        return !!EbsMap[this.get("instanceType")];
      },
      setInstanceType: function(type) {
        var eni, enis, volumeList, _i, _len;
        if (type === "t1.micro" && !this.isDefaultTenancy()) {
          type = "m1.small";
        }
        this.set("instanceType", type);
        if (!this.isEbsOptimizedEnabled()) {
          this.set("ebsOptimized", false);
        }
        volumeList = this.get('volumeList');
        if (volumeList) {
          _.each(volumeList, function(vol) {
            if (!vol.isSupportEncrypted()) {
              vol.set('encrypted', false);
            }
            return null;
          });
        }
        if (this.getEmbedEni) {
          enis = this.connectionTargets("EniAttachment");
          enis.push(this.getEmbedEni());
          for (_i = 0, _len = enis.length; _i < _len; _i++) {
            eni = enis[_i];
            eni.limitIpAddress();
          }
        }
        return null;
      },
      setTenancy: function(tenancy) {
        this.set("tenancy", tenancy);
        if (tenancy === "dedicated" && this.get("instanceType") === "t1.micro") {
          this.initInstanceType();
        }
        return null;
      },
      getInstanceType: function() {
        return Model.getInstanceType(this.getAmi(), this.design().region());
      },
      getInstanceTypeList: function() {
        var instanceType, region, tenancy;
        tenancy = this.isDefaultTenancy();
        instanceType = this.get("instanceType");
        region = this.design().region();
        return _.map(this.getInstanceType(), function(value) {
          var configs;
          configs = App.model.getInstanceTypeConfig(region);
          if (!configs) {
            return {};
          }
          configs = configs[value].formated_desc;
          return {
            main: configs[0],
            ecu: configs[1],
            core: configs[2],
            mem: configs[3],
            name: value,
            selected: instanceType === value,
            hide: !tenancy && value === "t1.micro"
          };
        });
      },
      remove: function() {
        var eni, v, _i, _j, _len, _len1, _ref, _ref1;
        if (this.__mainEni) {
          this.__mainEni.remove();
        }
        _ref = (this.get("volumeList") || emptyArray).slice(0);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          v.remove();
        }
        if (Design.instance().modeIsAppEdit()) {
          _ref1 = this.connectionTargets("EniAttachment");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            eni = _ref1[_j];
            eni.remove();
          }
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      isRemovable: function() {
        var state;
        state = this.get("state");
        if ((state && _.isArray(state) && state.length > 0) || ($('#state-editor-model').is(':visible') && $('#state-editor-model .state-list .state-item').length >= 1)) {
          return MC.template.NodeStateRemoveConfirmation({
            name: this.get("name")
          });
        }
        return true;
      },
      clone: function(srcTarget) {
        var Volume, state, v, _i, _j, _len, _len1, _ref, _ref1;
        this.cloneAttributes(srcTarget, {
          reserve: "volumeList",
          copyConnection: ["KeypairUsage", "SgAsso", "ElbAmiAsso"]
        });
        _ref = this.get("state") || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          state = _ref[_i];
          state.id = "state-" + this.design().guid();
        }
        Volume = Design.modelClassForType(constant.RESTYPE.VOL);
        _ref1 = srcTarget.get("volumeList") || [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          v = _ref1[_j];
          new Volume({
            owner: this
          }, {
            cloneSource: v
          });
        }
        this.getEmbedEni().clone(srcTarget.getEmbedEni());
        return null;
      },
      setEmbedEni: function(eni) {
        this.__mainEni = eni;
        return null;
      },
      getEmbedEni: function() {
        return this.__mainEni;
      },
      getRealGroupMemberIds: function() {
        var c, mem, members, _i, _len, _ref;
        this.ensureEnoughMember();
        c = this.get("count");
        members = [this.id];
        _ref = this.groupMembers();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          mem = _ref[_i];
          if (members.length >= c) {
            break;
          }
          members.push(mem.id);
        }
        return members;
      },
      ensureEnoughMember: function() {
        var totalCount;
        totalCount = this.get("count") - 1;
        while (this.groupMembers().length < totalCount) {
          this.groupMembers().push({
            id: MC.guid(),
            appId: "",
            eipData: {
              id: MC.guid()
            }
          });
        }
        return null;
      },
      generateJSON: function() {
        var blockDeviceMapping, component, name, p, tenancy, volume, vpc, _i, _len, _ref;
        tenancy = this.get("tenancy");
        p = this.parent();
        if (p.type === constant.RESTYPE.SUBNET) {
          vpc = p.parent().parent();
          if (!vpc.isDefaultTenancy()) {
            tenancy = "dedicated";
          }
        }
        name = this.get("name");
        if (this.get("count") > 1) {
          name += "-0";
        }
        blockDeviceMapping = this.getBlockDeviceMapping();
        _ref = this.get("volumeList") || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          volume = _ref[_i];
          blockDeviceMapping.push("#" + volume.id);
        }
        component = {
          type: this.type,
          uid: this.id,
          name: name,
          index: 0,
          number: this.get("count"),
          serverGroupUid: this.id,
          serverGroupName: this.get("name"),
          state: this.get("state"),
          resource: {
            UserData: {
              Base64Encoded: false,
              Data: this.get("userData")
            },
            BlockDeviceMapping: blockDeviceMapping,
            Placement: {
              Tenancy: tenancy === "dedicated" ? "dedicated" : "",
              AvailabilityZone: this.getAvailabilityZone().createRef()
            },
            InstanceId: this.get("appId"),
            ImageId: this.get("imageId"),
            KeyName: this.get("keyName"),
            EbsOptimized: this.isEbsOptimizedEnabled() ? this.get("ebsOptimized") : false,
            VpcId: this.getVpcRef(),
            SubnetId: this.getSubnetRef(),
            Monitoring: this.get("monitoring") ? "enabled" : "disabled",
            NetworkInterface: [],
            InstanceType: this.get("instanceType"),
            DisableApiTermination: false,
            ShutdownBehavior: "terminate",
            SecurityGroup: [],
            SecurityGroupId: []
          }
        };
        return component;
      },
      createEipJson: function(eipData, instanceId) {
        instanceId = instanceId || this.id;
        return {
          uid: eipData.id,
          type: constant.RESTYPE.EIP,
          index: 0,
          name: "EIP",
          resource: {
            Domain: "standard",
            InstanceId: this.createRef("InstanceId", instanceId),
            AllocationId: eipData.allocationId || "",
            NetworkInterfaceId: "",
            PublicIp: eipData.publicIp || ""
          }
        };
      },
      getStateData: function() {
        return this.get("state");
      },
      setStateData: function(stateAryData) {
        return this.set("state", stateAryData);
      },
      setKey: function(keyName, defaultKey) {
        var KpModel, defaultKp, kp;
        KpModel = Design.modelClassForType(constant.RESTYPE.KP);
        defaultKp = KpModel.getDefaultKP();
        if (defaultKey) {
          if (defaultKp) {
            return defaultKp.assignTo(this);
          } else {
            return console.error("No DefaultKP found when initialize InstanceModel");
          }
        } else {
          kp = this.connectionTargets("KeypairUsage")[0];
          kp && kp.dissociate(this);
          return this.set('keyName', keyName);
        }
      },
      getKeyName: function() {
        var kp;
        kp = this.connectionTargets("KeypairUsage")[0];
        if (kp) {
          if (kp.isDefault()) {
            return '$DefaultKeyPair';
          } else {
            return kp.get('name');
          }
        } else {
          return this.get('keyName') || 'No Key Pair';
        }
      },
      isDefaultKey: function() {
        var kp;
        kp = this.connectionTargets("KeypairUsage")[0];
        return kp && kp.isDefault();
      },
      isNoKey: function() {
        var kp;
        kp = this.connectionTargets("KeypairUsage")[0];
        return !kp && !this.get('keyName');
      },
      serialize: function() {
        var allResourceArray, ami, attach, eni, eniIndex, eniModels, enis, i, idx, instance, instances, layout, member, memberObj, res, serverGroupOption, v, volume, volumeModels, volumes, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1;
        allResourceArray = [];
        ami = this.getAmi() || this.get("cachedAmi");
        layout = this.generateLayout();
        if (ami) {
          layout.osType = ami.osType;
          layout.architecture = ami.architecture;
          layout.rootDeviceType = ami.rootDeviceType;
        }
        allResourceArray.push({
          layout: layout
        });
        instances = [this.generateJSON()];
        i = instances.length;
        this.ensureEnoughMember();
        while (i < this.get("count")) {
          member = $.extend(true, {}, instances[0]);
          member.name = this.get("name") + "-" + i;
          member.index = i;
          memberObj = this.groupMembers()[instances.length - 1];
          member.uid = memberObj.id;
          member.resource.InstanceId = memberObj.appId;
          ++i;
          instances.push(member);
        }
        layout.instanceList = _.map(instances, function(ami) {
          return ami.uid;
        });
        serverGroupOption = {
          number: instances.length,
          instanceId: ""
        };
        volumeModels = this.get("volumeList") || emptyArray;
        eniModels = this.getEmbedEni() ? [this.getEmbedEni()] : [];
        _ref = this.connections("EniAttachment");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          attach = _ref[_i];
          eniModels[attach.get("index")] = attach.getOtherTarget(this);
        }
        volumes = [];
        enis = [];
        for (idx = _j = 0, _len1 = instances.length; _j < _len1; idx = ++_j) {
          instance = instances[idx];
          serverGroupOption.instanceId = instance.uid;
          serverGroupOption.instanceName = instance.name + "-";
          for (_k = 0, _len2 = volumeModels.length; _k < _len2; _k++) {
            volume = volumeModels[_k];
            v = volume.generateJSON(idx, serverGroupOption);
            volumes.push(v);
          }
          for (eniIndex = _l = 0, _len3 = eniModels.length; _l < _len3; eniIndex = ++_l) {
            eni = eniModels[eniIndex];
            enis = enis.concat(eni.generateJSON(idx, serverGroupOption, eniIndex));
          }
        }
        _ref1 = instances.concat(volumes).concat(enis);
        for (_m = 0, _len4 = _ref1.length; _m < _len4; _m++) {
          res = _ref1[_m];
          allResourceArray.push({
            component: res
          });
        }
        return allResourceArray;
      }
    }, {
      handleTypes: constant.RESTYPE.INSTANCE,
      getInstanceType: function(ami, region) {
        var data, e;
        if (!ami || !region) {
          return [];
        }
        data = App.model.getOsFamilyConfig(region);
        try {
          data = data[ami.osFamily] || data[constant.OS_TYPE_MAPPING[ami.osType]];
          data = ami.rootDeviceType === "ebs" ? data.ebs : data['instance store'];
          data = ami.architecture === "x86_64" ? data["64"] : data["32"];
          data = data[ami.virtualizationType || "paravirtual"];
        } catch (_error) {
          e = _error;
          console.error("Invalid instance type list data", ami, App.model.getOsFamilyConfig(region));
          data = [];
        }
        return data || [];
      },
      getEffectiveId: function(instance_id) {
        var asg, data, design, index, instance, member, obj, resource_list, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4;
        design = Design.instance();
        if (design.component(instance_id)) {
          return {
            uid: instance_id,
            mid: null
          };
        }
        _ref = this.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          instance = _ref[_i];
          if (instance.get("appId") === instance_id) {
            return {
              uid: instance.id,
              mid: "" + instance.id + "_0"
            };
          } else if (instance.groupMembers) {
            _ref1 = instance.groupMembers();
            for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
              member = _ref1[index];
              if (member && member.appId === instance_id) {
                return {
                  uid: instance.id,
                  mid: "" + member.id + "_" + (index + 1)
                };
              }
            }
          }
        }
        resource_list = CloudResources(constant.RESTYPE.ASG, Design.instance().region());
        _ref2 = Design.modelClassForType(constant.RESTYPE.ASG).allObjects();
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          asg = _ref2[_k];
          data = (_ref3 = resource_list.get(asg.get('appId'))) != null ? _ref3.toJSON() : void 0;
          if (!data || !data.Instances) {
            continue;
          }
          data = data.Instances;
          _ref4 = data.member || data;
          for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
            obj = _ref4[_l];
            if (obj === instance_id || obj.InstanceId === instance_id) {
              return {
                uid: asg.get("lc").id,
                mid: instance_id
              };
            }
          }
        }
        return {
          uid: null,
          mid: null
        };
      },
      diffJson: function(newData, oldData) {
        var change, changeData, newCount, oldCount;
        changeData = newData || oldData;
        if (changeData.index !== 0) {
          return;
        }
        change = {
          id: changeData.uid,
          type: changeData.type,
          name: changeData.serverGroupName,
          changes: []
        };
        if (newData && oldData && !_.isEqual(newData.resource, oldData.resource)) {
          change.changes.push({
            name: "Update"
          });
        }
        newCount = newData ? newData.number : 0;
        oldCount = oldData ? oldData.number : 0;
        if (newCount > oldCount) {
          change.changes.push({
            name: "Create",
            count: newCount - oldCount
          });
        } else if (newCount < oldCount) {
          change.change = "Terminate";
          change.changes.push({
            name: "Terminate",
            count: newCount - oldCount
          });
        }
        if (newData && oldData) {
          if (newData.resource.InstanceType !== oldData.resource.InstanceType || newData.resource.EbsOptimized !== oldData.resource.EbsOptimized || newData.resource.UserData.Data !== oldData.resource.UserData.Data) {
            change.extra = "Need to restart.";
            change.info = "If the instance or instance group has been automatically assigned public IP, the IP will change after restart.";
          }
        }
        if (change.changes.length) {
          return change;
        } else {
          return null;
        }
      },
      deserialize: function(data, layout_data, resolve) {
        var KP, attr, eipData, m, members, model, rootDevice, _i, _len;
        if (data.serverGroupUid && data.serverGroupUid !== data.uid) {
          members = resolve(data.serverGroupUid).groupMembers();
          for (_i = 0, _len = members.length; _i < _len; _i++) {
            m = members[_i];
            if (m && m.id === data.uid) {
              console.debug("This instance servergroup member has already deserialized", data);
              return;
            }
          }
          if (data.resource.EipResource) {
            eipData = {
              id: data.resource.EipResource.uid,
              allocationId: data.resource.EipResource.resource.AllocationId,
              publicIp: data.resource.EipResource.resource.PublicIp
            };
          }
          members[data.index - 1] = {
            id: data.uid,
            appId: data.resource.InstanceId,
            eipData: eipData || {
              id: MC.guid()
            }
          };
          return;
        }
        rootDevice = data.resource.BlockDeviceMapping[0];
        if (!rootDevice || _.isString(rootDevice)) {
          rootDevice = {
            Ebs: {
              VolumeSize: 0,
              Iops: ""
            }
          };
        }
        if (!(_.isArray(data.state) && data.state.length)) {
          data.state = null;
        }
        attr = {
          id: data.uid,
          name: data.serverGroupName || data.name,
          appId: data.resource.InstanceId,
          count: data.number,
          imageId: data.resource.ImageId,
          tenancy: data.resource.Placement.Tenancy,
          ebsOptimized: data.resource.EbsOptimized,
          instanceType: data.resource.InstanceType,
          monitoring: data.resource.Monitoring !== "disabled",
          userData: data.resource.UserData.Data || "",
          rdSize: rootDevice.Ebs.VolumeSize,
          rdIops: rootDevice.Ebs.Iops,
          rdType: rootDevice.Ebs.VolumeType,
          parent: resolve(layout_data.groupUId),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          state: data.state
        };
        if (data.resource.EipResource) {
          attr.hasEip = true;
          attr.eipData = {
            id: data.resource.EipResource.uid,
            allocationId: data.resource.EipResource.resource.AllocationId
          };
        }
        if (layout_data.osType && layout_data.architecture && layout_data.rootDeviceType) {
          if (layout_data.osType === "win") {
            layout_data.osType = "windows";
          }
          attr.cachedAmi = {
            osType: layout_data.osType,
            architecture: layout_data.architecture,
            rootDeviceType: layout_data.rootDeviceType
          };
        }
        model = new Model(attr);
        KP = resolve(MC.extractID(data.resource.KeyName));
        if (KP) {
          KP.assignTo(model);
        } else {
          model.set('keyName', data.resource.KeyName);
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/connection/SgAsso',["constant", "../ConnectionModel", "CanvasManager", "Design"], function(constant, ConnectionModel, CanvasManager, Design) {
    var SgAsso;
    SgAsso = ConnectionModel.extend({
      type: "SgAsso",
      initialize: function() {
        if (Design.instance().shouldDraw()) {
          this.draw = this.updateLabel;
        }
        this.listenTo(this.getTarget(constant.RESTYPE.SG), "change:name", this.updateLabel);
        this.on("destroy", this.updateLabel);
        return null;
      },
      isVisual: function() {
        return false;
      },
      assignCompsToPorts: function(p1Comp, p2Comp) {
        if (p1Comp.type === constant.RESTYPE.SG) {
          this.__port1Comp = p1Comp;
          this.__port2Comp = p2Comp;
        } else if (p2Comp.type === constant.RESTYPE.SG) {
          this.__port1Comp = p2Comp;
          this.__port2Comp = p1Comp;
        } else {
          return false;
        }
        return true;
      },
      remove: function() {
        var defaultSg, resource;
        ConnectionModel.prototype.remove.apply(this, arguments);
        resource = this.getOtherTarget(constant.RESTYPE.SG);
        if (resource.isRemoved()) {
          return;
        }
        resource = this.getOtherTarget(constant.RESTYPE.SG);
        if (resource.connections("SgAsso").length === 0) {
          defaultSg = Design.modelClassForType(constant.RESTYPE.SG).getDefaultSg();
          if (defaultSg) {
            new SgAsso(resource, defaultSg);
          }
        }
        return null;
      },
      sortedSgList: function() {
        var resource, sgAssos, sgs;
        resource = this.getOtherTarget(constant.RESTYPE.SG);
        sgAssos = resource.connections("SgAsso");
        sgs = _.map(sgAssos, function(a) {
          return a.getTarget(constant.RESTYPE.SG);
        });
        return sgs.sort(function(a_sg, b_sg) {
          var a_nm, b_nm;
          if (a_sg.isDefault()) {
            return -1;
          }
          if (b_sg.isDefault()) {
            return 1;
          }
          a_nm = a_sg.get("name");
          b_nm = b_sg.get("name");
          if (a_nm < b_nm) {
            return -1;
          }
          if (a_nm === b_nm) {
            return 0;
          }
          if (a_nm > b_nm) {
            return 1;
          }
        });
      },
      updateLabel: function() {
        var ch, idx, res_node, resource, sgs, _i, _len, _ref;
        if (!Design.instance().shouldDraw()) {
          return;
        }
        resource = this.getOtherTarget(constant.RESTYPE.SG);
        res_node = document.getElementById(resource.id);
        if (!res_node) {
          return;
        }
        sgs = this.sortedSgList();
        _ref = $(res_node).children(".node-sg-color-group").children();
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          ch = _ref[idx];
          if (idx < sgs.length) {
            CanvasManager.update(ch, sgs[idx].color, "color");
            CanvasManager.update(ch, sgs[idx].get("name"), "tooltip");
          } else {
            CanvasManager.update(ch, "none", "color");
            CanvasManager.update(ch, "", "tooltip");
          }
        }
        return null;
      }
    });
    Design.on(Design.EVENT.Deserialized, function() {
      var asso, resId, updateMap, _i, _len, _ref;
      updateMap = {};
      _ref = SgAsso.allObjects();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        asso = _ref[_i];
        updateMap[asso.getOtherTarget(constant.RESTYPE.SG).id] = asso;
      }
      for (resId in updateMap) {
        asso = updateMap[resId];
        asso.updateLabel();
      }
      return null;
    });
    return SgAsso;
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('workspaces/editor/framework/resource/EniModel',["../ComplexResModel", "Design", "../connection/SgAsso", "../connection/EniAttachment", "constant", 'i18n!/nls/lang.js'], function(ComplexResModel, Design, SgAsso, EniAttachment, constant, lang) {

    /*
    IpObject is used to represent an ip in Eni
     */
    var IpObject, Model;
    IpObject = function(attr) {
      if (!attr) {
        attr = {};
      }
      attr.ip = attr.ip || "";
      if (attr.ip.split(".").length !== 4 || attr.ip[attr.ip.length - 1] === ".") {
        attr.ip = "";
      }
      this.hasEip = attr.hasEip || false;
      this.autoAssign = attr.autoAssign !== void 0 ? attr.autoAssign : true;
      this.ip = attr.ip || "x.x.x.x";
      this.eipData = attr.eipData || {
        id: MC.guid()
      };
      this.fixedIpInApp = attr.fixedIpInApp || false;
      return null;
    };

    /*
    Defination of EniModel
     */
    Model = ComplexResModel.extend({
      defaults: function() {
        return {
          sourceDestCheck: true,
          description: "",
          ips: [],
          assoPublicIp: false,
          name: "eni",
          x: 0,
          y: 0,
          width: 9,
          height: 9
        };
      },
      type: constant.RESTYPE.ENI,
      constructor: function(attributes, option) {
        if (option && option.instance) {
          this.__embedInstance = option.instance;
        }
        if (!attributes.ips) {
          attributes.ips = [];
        }
        if (attributes.ips.length === 0) {
          attributes.ips.push(new IpObject());
        }
        return ComplexResModel.call(this, attributes, option);
      },
      initialize: function(attributes, option) {
        var defaultSg;
        option = option || {};
        this.draw(true);
        if (option.createByUser && !option.instance) {
          defaultSg = Design.modelClassForType(constant.RESTYPE.SG).getDefaultSg();
          SgAsso = Design.modelClassForType("SgAsso");
          new SgAsso(defaultSg, this);
        }
        if (option.cloneSource) {
          this.clone(option.cloneSource);
        }
        return null;
      },
      clone: function(srcTarget) {
        var ip, _i, _len, _ref;
        this.cloneAttributes(srcTarget);
        _ref = this.get("ips");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ip = _ref[_i];
          ip.ip = "x.x.x.x";
          ip.autoAssign = true;
          ip.eipData.id = this.design().guid();
        }
        return null;
      },
      groupMembers: function() {
        if (!this.__groupMembers) {
          this.__groupMembers = [];
        }
        return this.__groupMembers;
      },
      updateName: function() {
        var attachment, instance, oldName;
        oldName = this.attributes.name;
        instance = this.__embedInstance;
        if (instance) {
          this.attributes.name = "eni0";
        } else {
          attachment = this.connections("EniAttachment")[0];
          if (attachment) {
            this.attributes.name = "eni" + attachment.get("index");
          } else {
            this.attributes.name = "eni";
          }
        }
        if (this.attributes.name !== oldName) {
          this.draw();
        }
        return null;
      },
      isReparentable: function(newParent) {
        var check;
        if (newParent.type === constant.RESTYPE.SUBNET) {
          if (newParent.parent() !== this.parent().parent()) {
            check = true;
          }
        } else {
          check = true;
        }
        if (check && this.connectionTargets("EniAttachment").length > 0) {
          return lang.ide.CVS_MSG_ERR_MOVE_ATTACHED_ENI;
        }
        return true;
      },
      isVisual: function() {
        return !this.__embedInstance;
      },
      embedInstance: function() {
        return this.__embedInstance;
      },
      attachedInstance: function() {
        var instance, target;
        instance = this.__embedInstance;
        if (!instance) {
          target = this.connectionTargets("EniAttachment");
          if (target.length) {
            instance = target[0];
          }
        }
        return instance;
      },
      serverGroupCount: function() {
        var count, instance;
        instance = this.attachedInstance();
        if (instance) {
          count = instance.get("count");
        }
        return count || 1;
      },
      maxIpCount: function() {
        var config, instance;
        instance = this.attachedInstance();
        if (instance) {
          config = instance.getInstanceTypeConfig();
          if (config) {
            return config.ip_per_eni;
          }
        }
        return 1;
      },
      limitIpAddress: function() {
        var instance, ipCount;
        instance = this.attachedInstance();
        if (instance && instance.getInstanceTypeConfig()) {
          ipCount = this.maxIpCount();
          if (this.get("ips").length > ipCount) {
            this.get("ips").length = ipCount;
          }
        }
        return null;
      },
      setPrimaryEip: function(toggle) {
        if (!this.attachedInstance()) {
          return;
        }
        this.get("ips")[0].hasEip = toggle;
        this.draw();
        return null;
      },
      hasPrimaryEip: function() {
        return this.get("ips")[0].hasEip;
      },
      hasEip: function() {
        return this.get("ips").some(function(ip) {
          return ip.hasEip;
        });
      },
      subnetCidr: function() {
        var parent;
        parent = this.parent() || this.__embedInstance.parent();
        console.assert(parent.type === constant.RESTYPE.SUBNET, "Eni's parent must be subnet");
        return parent.get("cidr") || "10.0.0.1";
      },
      getIpArray: function() {
        var cidr, idx, ip, ipAry, ips, isServergroup, obj, prefixSuffixAry, _i, _len, _ref;
        cidr = this.subnetCidr();
        isServergroup = this.serverGroupCount() > 1;
        prefixSuffixAry = Design.modelClassForType(constant.RESTYPE.SUBNET).genCIDRPrefixSuffix(cidr);
        ips = [];
        _ref = this.get("ips");
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          ip = _ref[idx];
          obj = {
            hasEip: ip.hasEip,
            autoAssign: ip.autoAssign,
            editable: !(isServergroup || ip.fixedIpInApp),
            prefix: prefixSuffixAry[0]
          };
          if (obj.autoAssign || isServergroup) {
            obj.suffix = prefixSuffixAry[1];
          } else {
            ipAry = ip.ip.split(".");
            if (prefixSuffixAry[1] === "x.x") {
              obj.suffix = ipAry[2] + "." + ipAry[3];
            } else {
              obj.suffix = ipAry[3];
            }
          }
          obj.ip = obj.prefix + obj.suffix;
          ips.push(obj);
        }
        return ips;
      },
      getRealIp: function(ip, cidr) {
        var ipAry, prefixSuffixAry, realIp;
        if (ip === "x.x.x.x") {
          return ip;
        }
        if (!cidr) {
          cidr = this.subnetCidr();
        }
        if (!cidr) {
          return ip;
        }
        prefixSuffixAry = Design.modelClassForType(constant.RESTYPE.SUBNET).genCIDRPrefixSuffix(cidr);
        ipAry = ip.split(".");
        if (prefixSuffixAry[1] === "x.x") {
          realIp = prefixSuffixAry[0] + ipAry[2] + "." + ipAry[3];
        } else {
          realIp = prefixSuffixAry[0] + ipAry[3];
        }
        return realIp;
      },
      isValidIp: function(ip) {
        var cidr, eni, ipObj, realIp, realNewIp, _i, _j, _len, _len1, _ref, _ref1;
        if (ip.indexOf("x") !== -1) {
          return true;
        }
        cidr = this.subnetCidr();
        if (!Design.modelClassForType(constant.RESTYPE.SUBNET).isIPInSubnet(ip, cidr)) {
          return 'This IP address conflicts with subnet’s IP range';
        }
        realNewIp = this.getRealIp(ip, cidr);
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          eni = _ref[_i];
          if (!eni.attachedInstance()) {
            continue;
          }
          _ref1 = eni.attributes.ips;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            ipObj = _ref1[_j];
            if (ipObj.autoAssign) {
              continue;
            }
            realIp = eni.getRealIp(ipObj.ip);
            if (realIp === realNewIp) {
              if (eni === this) {
                return 'This IP address conflicts with other IP';
              } else {
                return 'This IP address conflicts with other network interface’s IP';
              }
            }
          }
        }
        return true;
      },
      addIp: function(idx, ip, autoAssign, hasEip) {
        var ips;
        ips = this.get("ips");
        if (this.maxIpCount() <= ips.length) {
          return false;
        }
        ip = new IpObject({
          hasEip: false,
          ip: "x.x.x.x",
          autoAssign: true
        });
        ips = ips.slice(0);
        ips.push(ip);
        this.set("ips", ips);
        return true;
      },
      setIp: function(idx, ip, autoAssign, hasEip) {
        var ipObj;
        ipObj = this.get("ips")[idx];
        if (ip !== void 0 && ip !== null) {
          ipObj.ip = ip;
        }
        if (autoAssign !== void 0 && autoAssign !== null) {
          ipObj.autoAssign = autoAssign;
        }
        if (hasEip !== void 0 && hasEip !== null && hasEip !== ipObj.hasEip) {
          ipObj.hasEip = hasEip;
          if (idx === 0) {
            if (this.__embedInstance) {
              this.__embedInstance.draw();
            } else {
              this.draw();
            }
          }
        }
        return null;
      },
      removeIp: function(idx) {
        var ips;
        ips = this.get("ips");
        if (ips.length <= 1 || idx === 0) {
          return;
        }
        ips = ips.slice(0);
        ips.splice(idx, 1);
        this.set("ips", ips);
        return null;
      },
      canAddIp: function() {
        var instance, ips, maxIp, result, subnet;
        instance = this.attachedInstance();
        if (!instance) {
          return false;
        }
        maxIp = this.maxIpCount();
        ips = this.get("ips");
        if (ips.length >= maxIp) {
          return sprintf(lang.ide.PROP_MSG_WARN_ENI_IP_EXTEND, instance.get("instanceType"), maxIp);
        }
        subnet = this.__embedInstance ? this.__embedInstance.parent() : this.parent();
        result = true;
        ips.push({
          ip: "fake"
        });
        if (!subnet.isCidrEnoughForIps()) {
          result = "Ip count limit has reached in " + (subnet.get('name'));
        }
        ips.length = ips.length - 1;
        return result;
      },
      connect: function(connection) {
        var SgModel;
        if (connection.type !== "EniAttachment") {
          return;
        }
        this.limitIpAddress();
        this.updateName();
        this.draw();
        SgModel = Design.modelClassForType(constant.RESTYPE.SG);
        SgModel.tryDrawLine(this);
        return null;
      },
      disconnect: function(connection) {
        var reason, sgline, _i, _len, _ref;
        if (connection.type !== "EniAttachment") {
          return;
        }
        this.attributes.name = "eni";
        this.draw();
        reason = {
          reason: connection
        };
        _ref = this.connections("SgRuleLine");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sgline = _ref[_i];
          sgline.remove(reason);
        }
        return null;
      },
      ensureEnoughMember: function() {
        var count, idx, instance, ip, ipTemplate, ips, member, _i, _j, _len, _len1, _ref;
        instance = this.attachedInstance();
        if (!instance) {
          return;
        }
        count = instance.get("count") - 1;
        ipTemplate = this.get("ips");
        _ref = this.groupMembers();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          member = _ref[_i];
          while (member.ips.length < ipTemplate.length) {
            member.ips.push({
              autoAssign: true,
              ip: "x.x.x.x",
              eipData: {
                id: MC.guid()
              }
            });
          }
        }
        while (this.groupMembers().length < count) {
          ips = [];
          for (idx = _j = 0, _len1 = ipTemplate.length; _j < _len1; idx = ++_j) {
            ip = ipTemplate[idx];
            ips.push({
              autoAssign: true,
              ip: "x.x.x.x",
              eipData: {
                id: MC.guid()
              }
            });
          }
          this.groupMembers().push({
            id: MC.guid(),
            appId: "",
            forceAutoAssign: true,
            ips: ips
          });
        }
        return null;
      },
      generateJSON: function(index, servergroupOption, eniIndex) {
        var autoAssign, az, component, eip, eniName, hasEip, idx, instanceId, ipObj, ips, memberData, parent, resources, securitygroups, sgTarget, subnetId, vpcId, _i, _len, _ref;
        resources = [{}];
        this.ensureEnoughMember();
        eniName = (servergroupOption.instanceName || "") + this.get("name");
        ips = [];
        if (index === 0) {
          memberData = {
            id: this.id,
            appId: this.get("appId"),
            ips: this.get("ips"),
            attachmentId: this.get("attachmentId")
          };
        } else {
          memberData = this.groupMembers()[index - 1];
        }
        _ref = this.get("ips");
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          ipObj = _ref[idx];
          hasEip = ipObj.hasEip;
          ipObj = memberData.ips[idx];
          console.assert(ipObj, "ipObj should be defined.");
          if (servergroupOption.number > 1) {
            autoAssign = true;
          } else {
            autoAssign = ipObj.autoAssign;
          }
          if (ipObj.fixedIpInApp) {
            autoAssign = false;
          }
          ips.push({
            PrivateIpAddress: this.getRealIp(ipObj.ip),
            AutoAssign: autoAssign,
            Primary: false
          });
          if (hasEip) {
            eip = ipObj.eipData;
            resources.push({
              uid: eip.id || MC.guid(),
              type: constant.RESTYPE.EIP,
              name: "" + eniName + "-eip" + idx,
              index: index,
              resource: {
                Domain: "vpc",
                InstanceId: "",
                AllocationId: eip.allocationId || "",
                NetworkInterfaceId: this.createRef("NetworkInterfaceId", memberData.id),
                PrivateIpAddress: this.createRef("PrivateIpAddressSet." + idx + ".PrivateIpAddress", memberData.id),
                PublicIp: eip.publicIp || ""
              }
            });
          }
        }
        ips[0].Primary = true;
        sgTarget = this.__embedInstance ? this.__embedInstance : this;
        securitygroups = _.map(sgTarget.connectionTargets("SgAsso"), function(sg) {
          return {
            GroupName: sg.createRef("GroupName"),
            GroupId: sg.createRef("GroupId")
          };
        });
        if (servergroupOption.instanceId) {
          instanceId = this.createRef("InstanceId", servergroupOption.instanceId);
        } else {
          instanceId = "";
        }
        az = "";
        if (this.__embedInstance) {
          parent = this.__embedInstance.parent();
        } else {
          parent = this.parent();
        }
        if (parent.type === constant.RESTYPE.SUBNET) {
          subnetId = parent.createRef("SubnetId");
          vpcId = parent.parent().parent().createRef("VpcId");
          az = parent.parent();
        } else {
          az = parent;
        }
        component = {
          index: index,
          uid: memberData.id,
          type: this.type,
          name: eniName,
          serverGroupUid: this.id,
          serverGroupName: this.get("name"),
          number: servergroupOption.number || 1,
          resource: {
            SourceDestCheck: this.get("sourceDestCheck"),
            Description: this.get("description"),
            NetworkInterfaceId: memberData.appId,
            AvailabilityZone: az.createRef(),
            VpcId: parent.getVpcRef(),
            SubnetId: parent.getSubnetRef(),
            AssociatePublicIpAddress: this.get("assoPublicIp"),
            PrivateIpAddressSet: ips,
            GroupSet: securitygroups,
            Attachment: {
              InstanceId: instanceId,
              DeviceIndex: eniIndex === void 0 ? "1" : "" + eniIndex,
              AttachmentId: memberData.attachmentId || ""
            }
          }
        };
        resources[0] = component;
        return resources;
      },
      serialize: function() {
        var comps, eniIndex, layout, res;
        res = [];
        if (!this.__embedInstance) {
          layout = this.generateLayout();
          res[0] = {
            layout: layout
          };
        }
        if (!this.attachedInstance()) {
          eniIndex = this.__embedInstance ? 0 : 1;
          comps = this.generateJSON(0, {
            number: 1
          }, eniIndex);
          if (!res[0]) {
            res[0] = {};
          }
          res[0].component = comps[0];
          if (comps[1]) {
            res.push({
              component: comps[1]
            });
          }
        }
        return res;
      }
    }, {
      handleTypes: [constant.RESTYPE.ENI, constant.RESTYPE.EIP],
      getAvailableIPInCIDR: function(ipCidr, filter, maxNeedIPCount) {
        var allIPAry, availableIPCount, cutAry, ipAddr, ipAddrAry, ipAddrBinAry, ipAddrBinPrefixStr, ipAddrBinStr, ipAddrBinStrSuffixMax, ipAddrBinStrSuffixMin, ipAddrNumSuffixMax, ipAddrNumSuffixMin, prefix, readyAssignAry, readyAssignAryLength, suffix, _i, _ref, _results;
        cutAry = ipCidr.split('/');
        ipAddr = cutAry[0];
        suffix = Number(cutAry[1]);
        prefix = 32 - suffix;
        ipAddrAry = ipAddr.split('.');
        ipAddrBinAry = ipAddrAry.map(function(value) {
          return MC.leftPadString(parseInt(value).toString(2), 8, "0");
        });
        ipAddrBinStr = ipAddrBinAry.join('');
        ipAddrBinPrefixStr = ipAddrBinStr.slice(0, suffix);
        ipAddrBinStrSuffixMin = ipAddrBinStr.slice(suffix).replace(/1/g, '0');
        ipAddrBinStrSuffixMax = ipAddrBinStrSuffixMin.replace(/0/g, '1');
        ipAddrNumSuffixMin = parseInt(ipAddrBinStrSuffixMin, 2);
        ipAddrNumSuffixMax = parseInt(ipAddrBinStrSuffixMax, 2);
        allIPAry = [];
        availableIPCount = 0;
        readyAssignAry = (function() {
          _results = [];
          for (var _i = ipAddrNumSuffixMin, _ref = ipAddrNumSuffixMax + 1; ipAddrNumSuffixMin <= _ref ? _i < _ref : _i > _ref; ipAddrNumSuffixMin <= _ref ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this);
        readyAssignAryLength = readyAssignAry.length;
        $.each(readyAssignAry, function(idx, value) {
          var isAvailableIP, newIPAry, newIPBinStr, newIPObj, newIPStr;
          newIPBinStr = ipAddrBinPrefixStr + MC.leftPadString(value.toString(2), prefix, "0");
          isAvailableIP = true;
          if (idx === 0 || idx === 1 || idx === 2 || idx === 3) {
            isAvailableIP = false;
          }
          if (idx === readyAssignAryLength - 1) {
            isAvailableIP = false;
          }
          newIPAry = _.map([0, 8, 16, 24], function(value) {
            var newIPNum;
            newIPNum = parseInt(newIPBinStr.slice(value, value + 8), 2);
            return newIPNum;
          });
          newIPStr = newIPAry.join('.');
          if (__indexOf.call(filter, newIPStr) >= 0) {
            isAvailableIP = false;
          }
          newIPObj = {
            ip: newIPStr,
            available: isAvailableIP
          };
          allIPAry.push(newIPObj);
          if (isAvailableIP) {
            availableIPCount++;
          }
          if (availableIPCount > maxNeedIPCount) {
            return false;
          }
          return null;
        });
        console.log('availableIPCount: ' + availableIPCount);
        return allIPAry;
      },
      getAvailableIPCountInCIDR: function(ipCidr) {
        var availableIPCount, cutAry, ipAddr, ipAddrAry, ipAddrBinAry, ipAddrBinPrefixStr, ipAddrBinStr, ipAddrBinStrSuffixMax, ipAddrBinStrSuffixMin, ipAddrNumSuffixMax, ipAddrNumSuffixMin, prefix, suffix;
        cutAry = ipCidr.split('/');
        ipAddr = cutAry[0];
        suffix = Number(cutAry[1]);
        prefix = 32 - suffix;
        ipAddrAry = ipAddr.split('.');
        ipAddrBinAry = ipAddrAry.map(function(value) {
          return MC.leftPadString(parseInt(value).toString(2), 8, "0");
        });
        ipAddrBinStr = ipAddrBinAry.join('');
        ipAddrBinPrefixStr = ipAddrBinStr.slice(0, suffix);
        ipAddrBinStrSuffixMin = ipAddrBinStr.slice(suffix).replace(/1/g, '0');
        ipAddrBinStrSuffixMax = ipAddrBinStrSuffixMin.replace(/0/g, '1');
        ipAddrNumSuffixMin = parseInt(ipAddrBinStrSuffixMin, 2);
        ipAddrNumSuffixMax = parseInt(ipAddrBinStrSuffixMax, 2);
        availableIPCount = (ipAddrNumSuffixMax - ipAddrNumSuffixMin + 1) - 5;
        if (availableIPCount < 0) {
          availableIPCount = 0;
        }
        return availableIPCount;
      },
      createServerGroupMember: function(data) {
        var attachment, ip, ipObj, memberData, _i, _len, _ref;
        attachment = data.resource.Attachment || {};
        memberData = {
          id: data.uid,
          appId: data.resource.NetworkInterfaceId,
          attachmentId: attachment.AttachmentId || "",
          ips: []
        };
        _ref = data.resource.PrivateIpAddressSet || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ip = _ref[_i];
          ipObj = new IpObject({
            autoAssign: ip.AutoAssign,
            ip: ip.PrivateIpAddress,
            fixedIpInApp: Design.instance().modeIsApp() || Design.instance().modeIsAppView()
          });
          if (ip.EipResource) {
            ipObj.eipData = {
              id: ip.EipResource.uid,
              allocationId: ip.EipResource.resource.AllocationId,
              publicIp: ip.EipResource.resource.PublicIp
            };
          }
          memberData.ips.push(ipObj);
        }
        return memberData;
      },
      diffEipJson: function(newData, oldData, newComponents, oldComponents) {
        var changeData, eni, instance;
        if (_.isEqual(newData, oldData)) {
          return;
        }
        changeData = newData || oldData;
        eni = MC.extractID(changeData.resource.NetworkInterfaceId);
        eni = newComponents[eni] || oldComponents[eni];
        if (!eni || eni.index !== 0) {
          return;
        }
        if (MC.extractID(eni.resource.Attachment.DeviceIndex) === "0") {
          instance = MC.extractID(eni.resource.Attachment.InstanceId);
          instance = newComponents[instance] || oldComponents[instance];
          if (instance) {
            return {
              name: instance.serverGroupName,
              id: instance.uid,
              type: instance.type,
              change: "Update"
            };
          }
        } else {
          return {
            name: eni.serverGroupName,
            id: eni.uid,
            type: eni.type,
            change: "Update"
          };
        }
      },
      diffJson: function(newData, oldData, newComponents, oldComponents) {
        var attachment, change, changeData, instance, newCount, oldCount;
        changeData = newData || oldData;
        if (changeData.type === constant.RESTYPE.EIP) {
          return this.diffEipJson(newData, oldData, newComponents, oldComponents);
        }
        if (changeData.index !== 0) {
          return;
        }
        if (newData) {
          attachment = newData.resource.Attachment;
        }
        if (!attachment && oldData) {
          attachment = oldData.resource.Attachment;
        }
        if (!attachment) {
          return;
        }
        instance = MC.extractID(attachment.InstanceId);
        instance = newComponents[instance] || oldComponents[instance];
        if (!instance) {
          return;
        }
        if (attachment.DeviceIndex === "0") {
          if (newData && oldData && !_.isEqual(newData, oldData)) {
            return {
              name: instance.serverGroupName,
              type: instance.type,
              id: instance.uid,
              change: "Update"
            };
          } else {
            return;
          }
        }
        change = {
          id: changeData.uid,
          type: constant.RESTYPE.ENI,
          name: instance.serverGroupName + "-" + changeData.serverGroupName,
          changes: []
        };
        if (newData && oldData && !_.isEqual(newData.resource, oldData.resource)) {
          change.changes.push({
            name: "Update"
          });
        }
        newCount = newData ? newData.number : 0;
        oldCount = oldData ? oldData.number : 0;
        if (newCount > oldCount) {
          change.changes.push({
            name: "Create",
            count: newCount - oldCount
          });
        } else if (newCount < oldCount) {
          change.changes.push({
            name: "Delete",
            count: newCount - oldCount
          });
        }
        if (change.changes.length) {
          return change;
        } else {
          return null;
        }
      },
      deserialize: function(data, layout_data, resolve) {
        var attachment, attr, autoAssign, embed, eni, eniIndex, group, instance, ip, ipObj, m, members, option, sgTarget, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        if (data.type === constant.RESTYPE.EIP) {
          return;
        }
        if (data.serverGroupUid && data.serverGroupUid !== data.uid) {
          members = resolve(data.serverGroupUid).groupMembers();
          for (_i = 0, _len = members.length; _i < _len; _i++) {
            m = members[_i];
            if (m && m.id === data.uid) {
              console.debug("This eni servergroup member has already deserialized", data);
              return;
            }
          }
          members[data.index - 1] = this.createServerGroupMember(data);
          return;
        }
        attachment = data.resource.Attachment;
        embed = attachment && (attachment.DeviceIndex === "0" || attachment.DeviceIndex === 0);
        instance = attachment && attachment.InstanceId ? resolve(MC.extractID(attachment.InstanceId)) : null;
        attr = {
          id: data.uid,
          appId: data.resource.NetworkInterfaceId,
          description: data.resource.Description,
          sourceDestCheck: data.resource.SourceDestCheck,
          assoPublicIp: data.resource.AssociatePublicIpAddress,
          attachmentId: attachment ? attachment.AttachmentId : "",
          ips: [],
          x: embed ? 0 : layout_data.coordinate[0],
          y: embed ? 0 : layout_data.coordinate[1]
        };
        _ref = data.resource.PrivateIpAddressSet || [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          ip = _ref[_j];
          autoAssign = Design.instance().modeIsStack() ? ip.AutoAssign : false;
          ipObj = new IpObject({
            autoAssign: autoAssign,
            ip: ip.PrivateIpAddress,
            fixedIpInApp: Design.instance().modeIsApp() || Design.instance().modeIsAppView()
          });
          if (ip.EipResource) {
            ipObj.hasEip = true;
            ipObj.eipData = {
              id: ip.EipResource.uid,
              allocationId: ip.EipResource.resource.AllocationId,
              publicIp: ip.EipResource.resource.PublicIp
            };
          }
          attr.ips.push(ipObj);
        }
        if (embed) {
          attr.name = "eni0";
          option = {
            instance: instance
          };
        } else {
          attr.parent = resolve(layout_data.groupUId);
        }
        eni = new Model(attr, option);
        sgTarget = eni.embedInstance() || eni;
        _ref1 = data.resource.GroupSet || [];
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          group = _ref1[_k];
          new SgAsso(sgTarget, resolve(MC.extractID(group.GroupId)));
        }
        if (instance) {
          if (embed) {
            instance.setEmbedEni(eni);
          } else {
            eniIndex = attachment && attachment.DeviceIndex ? attachment.DeviceIndex : 1;
            new EniAttachment(eni, instance, {
              index: eniIndex * 1
            });
          }
        }
        return null;
      },
      postDeserialize: function(data, layout) {
        var attach, design, embed, eni, eniMember, found, idx, instance, instanceId, m, _i, _j, _len, _len1, _ref, _ref1;
        attach = data.resource.Attachment;
        if (!attach) {
          return;
        }
        embed = attach.DeviceIndex === "0";
        if (!embed) {
          return;
        }
        design = Design.instance();
        instanceId = MC.extractID(attach.InstanceId);
        instance = design.component(instanceId);
        if (instance) {
          return;
        }
        eni = design.component(data.uid);
        if (!eni) {
          return;
        }
        console.debug("Found embed eni which doesn't belong to visible instance, it might be embed eni of an servergroup member", eni);
        eni.remove();
        eniMember = this.createServerGroupMember(data);
        _ref = Design.modelClassForType(constant.RESTYPE.INSTANCE).allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          instance = _ref[_i];
          _ref1 = instance.groupMembers();
          for (idx = _j = 0, _len1 = _ref1.length; _j < _len1; idx = ++_j) {
            m = _ref1[idx];
            if (m.id === instanceId) {
              found = true;
              break;
            }
          }
        }
        if (!found) {
          console.warn("Cannot found instance server group for embed eni :", eni);
          return;
        }
        instance.getEmbedEni().groupMembers()[idx] = eniMember;
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('workspaces/editor/framework/resource/VolumeModel',["i18n!/nls/lang.js", "../ComplexResModel", "constant"], function(lang, ComplexResModel, constant) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: {
        name: '',
        owner: null,
        volumeSize: 1,
        snapshotId: '',
        appId: '',
        volumeType: 'gp2',
        iops: '',
        encrypted: false
      },
      type: constant.RESTYPE.VOL,
      constructor: function(attributes, options) {
        var owner;
        owner = attributes.owner;
        delete attributes.owner;
        if (!attributes.name) {
          attributes.name = this.getDeviceName(owner);
        }
        if (attributes.name) {
          ComplexResModel.call(this, attributes);
          this.attachTo(owner, options);
        }
        if (options && options.cloneSource) {
          this.clone(options.cloneSource);
        }
        if (attributes.iops) {
          attributes.volumeType = "io1";
        }
        return null;
      },
      clone: function(srcTarget) {
        this.cloneAttributes(srcTarget, {
          reserve: "owner"
        });
        return null;
      },
      isVisual: function() {
        return false;
      },
      isReparentable: function(newParent) {
        var parent;
        if (this.design().modeIsAppEdit()) {
          parent = this.get("owner");
          if (parent.type !== newParent.type) {
            return false;
          }
          if (!this.get("appId")) {
            return true;
          }
          if (parent.get("count") > 1) {
            return lang.ide.CVS_MSG_ERR_SERVERGROUP_VOLUME;
          }
          if (newParent.get("count") > 1) {
            return lang.ide.CVS_MSG_ERR_SERVERGROUP_VOLUME2;
          }
          while (parent && parent.type !== constant.RESTYPE.AZ) {
            parent = parent.parent();
            newParent = newParent.parent();
          }
          if (parent && newParent && parent !== newParent) {
            return "Cannot move volume across availability zone.";
          }
        }
        return true;
      },
      groupMembers: function() {
        if (!this.__groupMembers) {
          this.__groupMembers = [];
        }
        return this.__groupMembers;
      },
      remove: function() {
        var vl;
        vl = this.attributes.owner.get("volumeList");
        vl.splice(vl.indexOf(this), 1);
        this.attributes.owner.draw();
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      genFullName: function(name) {
        if (this.get('name')[0] !== '/') {
          return 'xvd' + name;
        } else {
          return '/dev/' + name;
        }
      },
      getCost: function(priceMap, currency, force) {
        var count, fee, name, owner, p, standardType, t, volumePrices, _i, _j, _len, _len1, _ref;
        if (!priceMap.ebs) {
          return;
        }
        owner = this.get("owner");
        if (!owner) {
          console.warn("This volume has not attached to any ami, found when calc-ing cost :", this);
          return;
        }
        if (!force && this.get("owner").type !== constant.RESTYPE.INSTANCE) {
          return;
        }
        standardType = this.get("volumeType") === "standard";
        _ref = priceMap.ebs.types;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          if (standardType) {
            if (t.ebsVols) {
              volumePrices = t.ebsVols;
            }
          } else if (t.ebsPIOPSVols) {
            volumePrices = t.ebsPIOPSVols;
          }
        }
        if (!volumePrices) {
          return;
        }
        count = this.get("owner").get("count") || 1;
        name = owner.get("name") + " - " + this.get("name");
        if (count > 1) {
          name += " (x" + count + ")";
        }
        for (_j = 0, _len1 = volumePrices.length; _j < _len1; _j++) {
          p = volumePrices[_j];
          if (p.unit === 'perGBmoProvStorage') {
            fee = p[currency];
            return {
              resource: name,
              type: this.get("volumeSize") + "G",
              fee: fee * this.get("volumeSize") * count,
              formatedFee: fee + "/GB/mo"
            };
          }
        }
        return null;
      },
      attachTo: function(owner, options) {
        var oldOwner, vl, volumeList;
        if (!owner) {
          return false;
        }
        if (owner === this.attributes.owner) {
          return false;
        }
        oldOwner = this.attributes.owner;
        if (oldOwner) {
          vl = oldOwner.get('volumeList');
          vl.splice(vl.indexOf(this), 1);
          oldOwner.draw();
        }
        this.attributes.owner = owner;
        if (!(options && options.noNeedGenName)) {
          this.attributes.name = this.getDeviceName(owner);
          if (!this.attributes.name) {
            return false;
          }
        }
        if (!this.isSupportEncrypted()) {
          this.attributes.encrypted = false;
        }
        volumeList = owner.get('volumeList');
        if (volumeList) {
          volumeList.push(this);
        } else {
          owner.set('volumeList', [this]);
        }
        owner.draw();
        return true;
      },
      isSupportEncrypted: function() {
        var instanceType, owner, supportEncrypted, supportedEncryptedType;
        supportedEncryptedType = ['m3.medium', 'm3.large', 'm3.xlarge', 'm3.2xlarge', 'c3.large', 'c3.xlarge', 'c3.2xlarge', 'c3.4xlarge', 'c3.8xlarge', 'cr1.8xlarge', 'r3.large', 'r3.xlarge', 'r3.2xlarge', 'r3.4xlarge', 'r3.8xlarge', 'i2.xlarge', 'i2.2xlarge', 'i2.4xlarge', 'i2.8xlarge', 'g2.2xlarge'];
        owner = this.attributes.owner;
        instanceType = owner.get('instanceType');
        supportEncrypted = false;
        if ((__indexOf.call(supportedEncryptedType, instanceType) >= 0)) {
          supportEncrypted = true;
        }
        return supportEncrypted;
      },
      getDeviceName: function(owner) {
        var ami_info, deviceName, imageId, volumeList;
        imageId = owner.get("imageId");
        ami_info = owner.getAmi();
        if (!ami_info) {
          if (!ami_info) {
            notification("warning", sprintf(lang.ide.NOTIFY_MSG_WARN_AMI_NOT_EXIST_TRY_USE_OTHER, imageId), false);
          }
          return null;
        } else {
          deviceName = null;
          if (ami_info.osType !== "windows") {
            deviceName = ["f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
          } else {
            deviceName = ["f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
          }
          $.each(ami_info.blockDeviceMapping || [], function(key, value) {
            var index, k;
            if (key.slice(0, 4) === "/dev/") {
              k = key.slice(-1);
              index = deviceName.indexOf(k);
              if (index >= 0) {
                return deviceName.splice(index, 1);
              }
            }
          });
          volumeList = owner.get("volumeList");
          if (volumeList && volumeList.length > 0) {
            $.each(volumeList, function(key, value) {
              var index, k;
              k = value.get("name").slice(-1);
              index = deviceName.indexOf(k);
              if (index >= 0) {
                return deviceName.splice(index, 1);
              }
            });
          }
          if (deviceName.length === 0) {
            notification("warning", lang.ide.NOTIFY_MSG_WARN_ATTACH_VOLUME_REACH_INSTANCE_LIMIT, false);
            return null;
          }
          if (ami_info.osType !== "windows") {
            deviceName = "/dev/sd" + deviceName[0];
          } else {
            deviceName = "xvd" + deviceName[0];
          }
          return deviceName;
        }
      },
      ensureEnoughMember: function() {
        var totalCount;
        if (!this.get("owner")) {
          return;
        }
        totalCount = this.get("owner").get("count");
        if (!totalCount) {
          return;
        }
        totalCount -= 1;
        while (this.groupMembers().length < totalCount) {
          this.groupMembers().push({
            id: MC.guid(),
            appId: ""
          });
        }
        return null;
      },
      generateJSON: function(index, serverGroupOption) {
        var appId, instanceId, member, owner, uid;
        console.assert(!serverGroupOption || serverGroupOption.instanceId !== void 0, "Invalid serverGroupOption");
        this.ensureEnoughMember();
        appId = "";
        if (index > 0) {
          member = this.groupMembers()[index - 1];
          uid = member.id;
          appId = member.appId;
        } else {
          uid = this.id;
          appId = this.get("appId");
        }
        instanceId = this.createRef("InstanceId", serverGroupOption.instanceId);
        owner = this.get("owner");
        return {
          uid: uid,
          type: this.type,
          name: this.get("name"),
          serverGroupUid: this.id,
          serverGroupName: this.get("name"),
          index: index,
          number: serverGroupOption.number || 1,
          resource: {
            VolumeId: appId,
            Size: this.get("volumeSize"),
            SnapshotId: this.get("snapshotId"),
            Iops: this.get("iops"),
            VolumeType: this.get("volumeType"),
            AvailabilityZone: owner ? owner.getAvailabilityZone().createRef() : "",
            AttachmentSet: {
              InstanceId: instanceId,
              Device: this.get("name")
            },
            Encrypted: this.get("encrypted")
          }
        };
      },
      serialize: function() {
        if (this.get("owner")) {
          return;
        }
        return {
          component: this.generateJSON(0, {
            number: 1
          })
        };
      }
    }, {
      handleTypes: constant.RESTYPE.VOL,
      diffJson: function(newData, oldData, newComponent, oldComponent) {
        var changeData, instance;
        if (!(newData && oldData && _.isEqual(newData, oldData))) {
          changeData = newData || oldData;
          instance = Design.instance().component(changeData.resource.AttachmentSet.InstanceId);
          if (instance) {
            return {
              id: instance.id,
              name: instance.get("name"),
              change: "Update"
            };
          }
        }
      },
      deserialize: function(data, layout_data, resolve) {
        var attachment, attr, instance, m, members, model, _i, _len;
        if (data.serverGroupUid && data.serverGroupUid !== data.uid) {
          members = resolve(data.serverGroupUid).groupMembers();
          for (_i = 0, _len = members.length; _i < _len; _i++) {
            m = members[_i];
            if (m && m.id === data.uid) {
              console.debug("This volume servergroup member has already deserialized", data);
              return;
            }
          }
          members[data.index - 1] = {
            id: data.uid,
            appId: data.resource.VolumeId
          };
          return;
        }
        if (data.resource.AttachmentSet) {
          attachment = data.resource.AttachmentSet;
          instance = attachment && attachment.InstanceId ? resolve(MC.extractID(attachment.InstanceId)) : null;
        } else {
          console.error("deserialize failed");
          return null;
        }
        attr = {
          id: data.uid,
          name: data.serverGroupName || data.name,
          owner: instance,
          volumeSize: data.resource.Size,
          snapshotId: data.resource.SnapshotId,
          volumeType: data.resource.VolumeType,
          iops: data.resource.Iops,
          appId: data.resource.VolumeId,
          encrypted: data.resource.Encrypted
        };
        model = new Model(attr, {
          noNeedGenName: true
        });
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/AclModel',["../ComplexResModel", "../ConnectionModel", "constant"], function(ComplexResModel, ConnectionModel, constant) {
    var AclAsso, Model, formatRules, __emptyIcmp, __emptyPortRange;
    __emptyIcmp = {
      Code: "",
      Type: ""
    };
    __emptyPortRange = {
      From: "",
      To: ""
    };
    AclAsso = ConnectionModel.extend({
      type: "AclAsso",
      oneToMany: constant.RESTYPE.ACL,
      defaults: {
        associationId: ""
      },
      serialize: function(components) {
        var acl, sb;
        sb = this.getTarget(constant.RESTYPE.SUBNET);
        acl = this.getTarget(constant.RESTYPE.ACL);
        components[acl.id].resource.AssociationSet.push({
          NetworkAclAssociationId: this.get("associationId"),
          SubnetId: sb.createRef("SubnetId")
        });
        return null;
      }
    });
    formatRules = function(JsonRuleEntrySet) {
      if (!JsonRuleEntrySet || !JsonRuleEntrySet.length) {
        return [];
      }
      return _.map(JsonRuleEntrySet, function(r) {
        var rule;
        rule = {
          id: _.uniqueId("aclrule_"),
          cidr: r.CidrBlock,
          egress: r.Egress,
          protocol: parseInt(r.Protocol, 10),
          number: parseInt(r.RuleNumber, 10),
          action: r.RuleAction,
          port: ""
        };
        if (rule.protocol === 1 && r.IcmpTypeCode && r.IcmpTypeCode.Code && r.IcmpTypeCode.Type) {
          rule.port = r.IcmpTypeCode.Type + "/" + r.IcmpTypeCode.Code;
        } else if (r.PortRange.From && r.PortRange.To) {
          if (r.PortRange.From === r.PortRange.To) {
            rule.port = r.PortRange.From + "";
          } else {
            rule.port = r.PortRange.From + "-" + r.PortRange.To;
          }
        }
        return rule;
      });
    };
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.ACL,
      newNameTmpl: "CustomACL-",
      defaults: function() {
        return {
          rules: [
            {
              action: "deny",
              cidr: "0.0.0.0/0",
              egress: true,
              id: _.uniqueId("aclrule_"),
              number: 32767,
              port: "",
              protocol: -1
            }, {
              action: "deny",
              cidr: "0.0.0.0/0",
              egress: false,
              id: _.uniqueId("aclrule_"),
              number: 32767,
              port: "",
              protocol: -1
            }
          ]
        };
      },
      isVisual: function() {
        return false;
      },
      isDefault: function() {
        return this.attributes.name === "DefaultACL";
      },
      remove: function() {
        var defaultAcl, target, _i, _len, _ref;
        console.assert(!this.isDefault(), "Cannot delete DefaultACL");
        defaultAcl = Model.getDefaultAcl();
        _ref = this.connectionTargets();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          target = _ref[_i];
          new AclAsso(defaultAcl, target);
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      addRule: function(rule) {
        var currentRules, r, _i, _len;
        console.assert(rule.number !== void 0 && rule.protocol !== void 0 && rule.egress !== void 0 && rule.action !== void 0 && rule.cidr !== void 0 && rule.port !== void 0, "Invalid ACL Rule data");
        rule.protocol = parseInt(rule.protocol, 10);
        rule.number = parseInt(rule.number, 10);
        rule.cidr = MC.getValidCIDR(rule.cidr);
        currentRules = this.get("rules");
        for (_i = 0, _len = currentRules.length; _i < _len; _i++) {
          r = currentRules[_i];
          if (r.number === rule.number) {
            return false;
          }
        }
        rule.id = _.uniqueId("aclrule_");
        currentRules = currentRules.slice(0);
        currentRules.push(rule);
        this.set("rules", currentRules);
        return true;
      },
      removeRule: function(ruleId) {
        var idx, rule, rules, theRule, _i, _len;
        rules = this.get("rules");
        for (idx = _i = 0, _len = rules.length; _i < _len; idx = ++_i) {
          rule = rules[idx];
          if (rule.id === ruleId) {
            theRule = rule;
            break;
          }
        }
        if (theRule.number === 32767) {
          return false;
        }
        if (this.isDefault() && theRule.number === 100) {
          return false;
        }
        rules = rules.slice(0);
        rules.splice(idx, 1);
        this.set("rules", rules);
        return true;
      },
      getRuleCount: function() {
        return this.get("rules").length;
      },
      getAssoCount: function() {
        return this.connections().length;
      },
      serialize: function() {
        var component, port, r, rule, ruleSet, vpc, _i, _len, _ref;
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
        ruleSet = [];
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            AssociationSet: [],
            Default: this.isDefault(),
            EntrySet: ruleSet,
            NetworkAclId: this.get("appId"),
            VpcId: vpc.createRef("VpcId")
          }
        };
        _ref = this.get("rules");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          r = {
            Egress: rule.egress,
            Protocol: rule.protocol,
            RuleAction: rule.action,
            RuleNumber: rule.number,
            CidrBlock: rule.cidr,
            IcmpTypeCode: __emptyIcmp,
            PortRange: __emptyPortRange
          };
          if (rule.protocol === 1) {
            port = rule.port.split("/");
            r.IcmpTypeCode = {
              Code: port[1],
              Type: port[0]
            };
          } else if (rule.port) {
            port = (rule.port + "-" + rule.port).split("-");
            r.PortRange = {
              From: port[0],
              To: port[1]
            };
          }
          ruleSet.push(r);
        }
        return {
          component: component
        };
      }
    }, {
      handleTypes: constant.RESTYPE.ACL,
      resolveFirst: true,
      getDefaultAcl: function() {
        return _.find(Model.allObjects(), function(obj) {
          return obj.isDefault();
        });
      },
      preDeserialize: function(data, layout_data) {
        new Model({
          id: data.uid,
          name: data.name,
          appId: data.resource.NetworkAclId,
          rules: formatRules(data.resource.EntrySet)
        });
        return null;
      },
      deserialize: function(data, layout_data, resolve) {
        var acl, asso, c, _i, _len, _ref;
        acl = resolve(data.uid);
        _ref = data.resource.AssociationSet || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          asso = _ref[_i];
          c = new AclAsso(acl, resolve(MC.extractID(asso.SubnetId)));
          c.set("associationId", asso.NetworkAclAssociationId);
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/GroupModel',["Design", "./ComplexResModel"], function(Design, ComplexResModel) {
    var GroupModel;
    GroupModel = ComplexResModel.extend({
      node_group: true,
      type: "Framework_G",
      remove: function() {
        var child, _i, _len, _ref;
        if (this.attributes.__children) {
          _ref = this.attributes.__children.splice(0);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            child.off("destroy", this.removeChild, this);
            child.remove();
          }
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      addChild: function(child) {

        /*
        addChild.call(this) # This is used to suppress the warning in ResourceModel.extend.
         */
        var children, oldParent;
        console.assert(child.remove, "This child is not a ResourceModel object");
        oldParent = child.parent();
        if (oldParent === this) {
          return;
        }
        if (oldParent) {
          oldParent.removeChild(child);
        }
        children = this.attributes.__children;
        if (!children) {
          children = [];
        } else if (children.indexOf(child) !== -1) {
          return;
        }
        children.push(child);
        this.set("__children", children);
        child.set("__parent", this);
        child.once("destroy", this.removeChild, this);
        if (child.onParentChanged) {
          child.onParentChanged();
        }
        return null;
      },
      removeChild: function(child) {

        /*
        removeChild.call(this) # This is used to suppress the warning in ResourceModel.extend.
         */
        var children, idx;
        children = this.get("__children");
        if (!children || children.length === 0) {
          console.warn("Child not found when removing.");
          return;
        }
        idx = children.indexOf(child);
        if (idx === -1) {
          console.warn("Child not found when removing.");
          return;
        }
        children.splice(idx, 1);
        this.set("__children", children);
        child.off("destroy", this.removeChild, this);
        return null;
      },
      children: function() {
        return this.get("__children") || [];
      },
      generateLayout: function() {
        var layout;
        layout = ComplexResModel.prototype.generateLayout.call(this);
        layout.size = [this.width(), this.height()];
        return layout;
      }
    });
    return GroupModel;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/AsgModel',["../ResourceModel", "../ComplexResModel", "../GroupModel", "Design", "constant", "i18n!/nls/lang.js"], function(ResourceModel, ComplexResModel, GroupModel, Design, constant, lang) {
    var ExpandedAsgModel, Model, NotificationModel;
    NotificationModel = ComplexResModel.extend({
      type: constant.RESTYPE.NC,
      isUsed: function() {
        return this.get("instanceLaunch") || this.get("instanceLaunchError") || this.get("instanceTerminate") || this.get("instanceTerminateError") || this.get("test");
      },
      initialize: function() {
        Design.modelClassForType(constant.RESTYPE.TOPIC).ensureExistence();
        return null;
      },
      isVisual: function() {
        return false;
      },
      getTopic: function() {
        return this.connectionTargets('TopicUsage')[0];
      },
      removeTopic: function() {
        var _ref;
        return (_ref = this.connections('TopicUsage')[0]) != null ? _ref.remove() : void 0;
      },
      isEffective: function() {
        var n;
        n = this.toJSON();
        return n.instanceLaunch || n.instanceLaunchError || n.instanceTerminate || n.instanceTerminateError || n.test;
      },
      getTopicName: function() {
        var _ref;
        return (_ref = this.getTopic()) != null ? _ref.get('name') : void 0;
      },
      setTopic: function(appId, name) {
        var TopicModel;
        TopicModel = Design.modelClassForType(constant.RESTYPE.TOPIC);
        return TopicModel.get(appId, name).assignTo(this);
      },
      serialize: function() {
        var key, name, notifies, topic, _ref;
        if (!this.isUsed() || !this.get("asg")) {
          return;
        }
        topic = this.getTopic();
        notifies = [];
        _ref = NotificationModel.typeMap;
        for (key in _ref) {
          name = _ref[key];
          if (this.get(name)) {
            notifies.push(key);
          }
        }
        return {
          component: {
            name: "SnsNotification",
            type: this.type,
            uid: this.id,
            resource: {
              AutoScalingGroupName: this.get("asg").createRef("AutoScalingGroupName"),
              TopicARN: topic && topic.createRef("TopicArn") || '',
              NotificationType: notifies
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.NC,
      diffJson: function() {},
      typeMap: {
        "autoscaling:EC2_INSTANCE_LAUNCH": "instanceLaunch",
        "autoscaling:EC2_INSTANCE_LAUNCH_ERROR": "instanceLaunchError",
        "autoscaling:EC2_INSTANCE_TERMINATE": "instanceTerminate",
        "autoscaling:EC2_INSTANCE_TERMINATE_ERROR": "instanceTerminateError",
        "autoscaling:TEST_NOTIFICATION": "test"
      },
      deserialize: function(data, layout_data, resolve) {
        var asg, attr, notify, t, _i, _len, _ref, _ref1;
        attr = {
          id: data.uid
        };
        _ref = data.resource.NotificationType;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          attr[NotificationModel.typeMap[t]] = true;
        }
        notify = new NotificationModel(attr);
        asg = resolve(MC.extractID(data.resource.AutoScalingGroupName));
        if (asg) {
          asg.set("notification", notify);
          notify.set("asg", asg);
        }
        if ((_ref1 = resolve(MC.extractID(data.resource.TopicARN))) != null) {
          _ref1.assignTo(notify);
        }
        return null;
      }
    });
    ExpandedAsgModel = ComplexResModel.extend({
      type: "ExpandedAsg",
      node_group: true,
      defaults: {
        x: 0,
        y: 0,
        width: 13,
        height: 13,
        originalAsg: null
      },
      constructor: function(attributes, options) {
        var expanded, list, _i, _len;
        console.assert(attributes.parent && attributes.originalAsg, "Invalid parameter for expanding asg");
        list = [attributes.originalAsg].concat(attributes.originalAsg.get("expandedList"));
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          expanded = list[_i];
          if (attributes.parent.type === constant.RESTYPE.SUBNET) {
            if (attributes.parent.parent() === expanded.parent().parent()) {
              return;
            }
          } else {
            if (attributes.parent === expanded.parent()) {
              return;
            }
          }
        }
        ComplexResModel.call(this, attributes, options);
        return null;
      },
      isReparentable: function(newParent) {
        var asg, expanded, _i, _len, _ref;
        asg = this.attributes.originalAsg;
        _ref = [asg].concat(asg.get("expandedList"));
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          expanded = _ref[_i];
          if (expanded === this) {
            continue;
          }
          if (newParent.type === constant.RESTYPE.SUBNET) {
            if (newParent.parent() === expanded.parent().parent()) {
              return false;
            }
          } else {
            if (newParent.parent === expanded.parent()) {
              return false;
            }
          }
        }
        return true;
      },
      connections: function(type) {
        var context;
        context = type === "SgAsso" ? this.getLc() : this;
        return ComplexResModel.prototype.connections.call(context, type);
      },
      connectionTargets: function(type) {
        var context;
        context = type === "SgAsso" ? this.getLc() : this;
        return ComplexResModel.prototype.connectionTargets.call(context, type);
      },
      initialize: function() {
        this.draw(true);
        this.get("originalAsg").__addExpandedAsg(this);
        return null;
      },
      getLc: function(origin) {
        var lc;
        lc = this.attributes.originalAsg.get("lc");
        return !origin && lc.getBigBrother() || lc;
      },
      serialize: function() {
        var layout;
        layout = this.generateLayout();
        layout.type = "ExpandedAsg";
        layout.originalId = this.get("originalAsg").id;
        return {
          layout: layout
        };
      }
    }, {
      handleTypes: "ExpandedAsg",
      deserialize: function(data, layout_data, resolve) {
        new ExpandedAsgModel({
          id: data.uid,
          originalAsg: resolve(layout_data.originalId),
          parent: resolve(layout_data.groupUId),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        return null;
      }
    });
    Model = GroupModel.extend({
      defaults: function() {
        return {
          x: 0,
          y: 0,
          width: 13,
          height: 13,
          cooldown: "300",
          capacity: "1",
          minSize: "1",
          maxSize: "2",
          healthCheckGracePeriod: "300",
          healthCheckType: "EC2",
          terminationPolicies: ["Default"],
          expandedList: [],
          policies: []
        };
      },
      type: constant.RESTYPE.ASG,
      newNameTmpl: "asg",
      constructor: function(attributes, options) {
        var conn, dolly, lc, _i, _len, _ref;
        GroupModel.prototype.constructor.apply(this, arguments);
        if (attributes.lcId) {
          lc = Design.instance().component(attributes.lcId);
          dolly = lc.clone();
          this.addChild(dolly);
          dolly.draw(true);
          _ref = dolly.connections();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            conn = _ref[_i];
            if (conn.isVisual() || conn.type === 'SgAsso') {
              conn.draw();
            }
          }
        }
        return this;
      },
      isReparentable: function(newParent) {
        var expand, _i, _len, _ref;
        _ref = this.get("expandedList");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          expand = _ref[_i];
          if (newParent.type === constant.RESTYPE.SUBNET) {
            if (newParent.parent() === expand.parent().parent()) {
              return sprintf(lang.ide.CVS_MSG_ERR_DROP_ASG, this.get("name"), newParent.parent().get("name"));
            }
          } else {
            if (newParent.parent === expand.parent()) {
              return sprintf(lang.ide.CVS_MSG_ERR_DROP_ASG, this.get("name"), newParent.get("name"));
            }
          }
        }
        return true;
      },
      getCost: function(priceMap, currency) {
        var InstanceModel, lc, lcFee, lcPrice, v, volumeList, vp, _i, _len;
        lc = this.get("lc");
        if (!lc) {
          return null;
        }
        InstanceModel = Design.modelClassForType(constant.RESTYPE.INSTANCE);
        lcPrice = InstanceModel.prototype.getCost.call(lc, priceMap, currency);
        if (!lcPrice) {
          return null;
        }
        if (lcPrice.length) {
          lcPrice = lcPrice[0];
        }
        lcPrice.resource = this.get("name");
        lcFee = lcPrice.fee;
        volumeList = lc.get("volumeList");
        if (volumeList && volumeList.length) {
          for (_i = 0, _len = volumeList.length; _i < _len; _i++) {
            v = volumeList[_i];
            vp = v.getCost(priceMap, currency, true);
            if (vp) {
              lcFee += vp.fee;
            }
          }
        }
        if (lcPrice.fee !== lcFee) {
          lcPrice.resource += " (& volumes)";
          lcPrice.fee = lcFee;
        }
        lcPrice.type = parseInt(this.get("capacity") || this.get("minSize"), 10);
        lcPrice.fee *= lcPrice.type;
        lcPrice.fee = Math.round(lcPrice.fee * 100) / 100;
        lcPrice.formatedFee = lcPrice.fee + "/mo";
        return lcPrice;
      },
      addChild: function(lc) {
        var elb, oldLc, _i, _j, _len, _len1, _ref, _ref1;
        GroupModel.prototype.addChild.call(this, lc);
        lc.listenTo(this, 'change:x', function() {
          return lc.getCanvasView().resetPosition();
        });
        lc.listenTo(this, 'change:y', function() {
          return lc.getCanvasView().resetPosition();
        });
        oldLc = this.get("lc");
        if (oldLc) {
          this.stopListening(oldLc);
          _ref = oldLc.connectionTargets("ElbAmiAsso");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elb = _ref[_i];
            this.updateExpandedAsgAsso(elb, true);
          }
        }
        this.set("lc", lc);
        this.listenTo(lc, "change:name change:imageId", this.drawExpanedAsg);
        this.listenTo(lc, "destroy", this.removeChild);
        _ref1 = lc.connectionTargets("ElbAmiAsso");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          elb = _ref1[_j];
          this.updateExpandedAsgAsso(elb);
        }
        this.draw();
        this.drawExpanedAsg(false);
        return null;
      },
      removeChild: function(lc) {
        GroupModel.prototype.removeChild.call(this, lc);
        this.removeExpandedAsso();
        this.unset("lc");
        this.draw();
        return null;
      },
      drawExpanedAsg: function(isCreate) {
        var asg, lc, _i, _len, _ref;
        lc = this.get('lc');
        if (lc) {
          _ref = this.get("expandedList");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            asg = _ref[_i];
            asg.draw(isCreate);
          }
        }
        return null;
      },
      getNotification: function() {
        var n;
        n = this.get("notification");
        if (n) {
          return n.toJSON();
        } else {
          return {};
        }
      },
      getNotiObject: function() {
        return this.get("notification");
      },
      setNotification: function(data) {
        var n;
        n = this.get("notification");
        if (n) {
          n.set(data);
        } else {
          data.asg = this;
          n = new NotificationModel(data);
          this.set("notification", n);
        }
        return n;
      },
      setNotificationTopic: function(appId, name) {
        var n;
        n = this.get("notification");
        return n != null ? n.setTopic(appId, name) : void 0;
      },
      getNotificationTopicName: function() {
        var n;
        n = this.get("notification");
        if (n) {
          return n.getTopicName();
        }
        return null;
      },
      updateExpandedAsgAsso: function(elb, isRemove) {
        var ElbAsso, asso, i, old_expandedList, _i, _len;
        if (this.attributes.expandedList.length === 0) {
          return;
        }
        old_expandedList = this.attributes.expandedList;
        this.attributes.expandedList = [];
        ElbAsso = Design.modelClassForType("ElbAmiAsso");
        for (_i = 0, _len = old_expandedList.length; _i < _len; _i++) {
          i = old_expandedList[_i];
          asso = new ElbAsso(i, elb);
          if (isRemove) {
            asso.remove();
          }
        }
        this.attributes.expandedList = old_expandedList;
        return null;
      },
      updateExpandedAsgSgLine: function(sgTarget, isRemove) {
        var SgLine, createOption, i, old_expandedList, removeReason, sgline, _i, _len;
        if (this.attributes.expandedList.length === 0) {
          return;
        }
        old_expandedList = this.attributes.expandedList;
        this.attributes.expandedList = [];
        SgLine = Design.modelClassForType("SgRuleLine");
        createOption = {
          createByUser: false
        };
        removeReason = {
          reason: sgTarget
        };
        for (_i = 0, _len = old_expandedList.length; _i < _len; _i++) {
          i = old_expandedList[_i];
          if (i !== sgTarget) {
            sgline = new SgLine(i, sgTarget, createOption);
            if (isRemove) {
              sgline.silentRemove();
            }
          }
        }
        this.attributes.expandedList = old_expandedList;
        return null;
      },
      removeExpandedAsso: function() {
        var connections, expandedAsg, _i, _len, _ref;
        _ref = this.get('expandedList');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          expandedAsg = _ref[_i];
          connections = expandedAsg.connections();
          while (connections.length) {
            _.first(connections).remove();
          }
        }
        return null;
      },
      addScalingPolicy: function(policy) {
        policy.__asg = this;
        this.get("policies").push(policy);
        this.listenTo(policy, "destroy", this.__removeScalingPolicy);
        return null;
      },
      __removeScalingPolicy: function(policy) {
        this.stopListening(policy);
        this.get("policies").splice(this.get("policies").indexOf(policy), 1);
        return null;
      },
      isEC2HealthCheckType: function() {
        var lc;
        lc = this.get("lc");
        if (lc && lc.connections("ElbAmiAsso").length && this.get("healthCheckType") === "ELB") {
          return false;
        }
        return true;
      },
      remove: function() {
        var asg, p, _i, _j, _len, _len1, _ref, _ref1;
        _ref = this.get("expandedList");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          asg = _ref[_i];
          asg.off();
          asg.remove();
        }
        _ref1 = this.get("policies");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          p = _ref1[_j];
          p.off();
          p.remove();
        }
        if (this.get("notification")) {
          this.get("notification").remove();
        }
        GroupModel.prototype.remove.call(this);
        return null;
      },
      __addExpandedAsg: function(expandedAsg) {
        var ElbAsso, Sgline, elb, lc, sgTarget, _i, _j, _len, _len1, _ref, _ref1;
        console.assert(this.get("expandedList").indexOf(expandedAsg) === -1 && (!expandedAsg.originalAsg), "The expandedAsg is already in the Asg");
        this.get("expandedList").push(expandedAsg);
        expandedAsg.originalAsg = this;
        this.listenTo(expandedAsg, "destroy", this.__onExpandedAsgRemove);
        lc = this.get("lc");
        if (lc) {
          ElbAsso = Design.modelClassForType("ElbAmiAsso");
          _ref = lc.connectionTargets("ElbAmiAsso");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elb = _ref[_i];
            new ElbAsso(elb, expandedAsg);
          }
          Sgline = Design.modelClassForType("SgRuleLine");
          _ref1 = lc.connectionTargets("SgRuleLine");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            sgTarget = _ref1[_j];
            new Sgline(sgTarget, expandedAsg);
          }
        }
        return null;
      },
      __onExpandedAsgRemove: function(target) {
        console.assert(target.type === "ExpandedAsg", "Invalid Parameter");
        this.get("expandedList").splice(this.get("expandedList").indexOf(target), 1);
        return null;
      },
      getExpandSubnets: function() {
        var expand, subnets, _i, _len, _ref;
        if (this.parent().type !== constant.RESTYPE.SUBNET) {
          return [];
        }
        subnets = [this.parent()];
        _ref = this.get("expandedList");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          expand = _ref[_i];
          subnets.push(expand.parent());
        }
        return _.uniq(subnets);
      },
      getExpandAzs: function() {
        var azs, expand, subnets, _i, _len, _ref;
        subnets = [this.parent()];
        _ref = this.get("expandedList");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          expand = _ref[_i];
          subnets.push(expand.parent());
        }
        subnets = _.uniq(subnets);
        if (this.parent().type === constant.RESTYPE.SUBNET) {
          azs = _.uniq(_.map(subnets, function(sb) {
            return sb.parent();
          }));
        } else {
          azs = subnets;
        }
        return azs;
      },
      serialize: function() {
        var azs, component, elbArray, elbs, expand, healthCheckType, lc, lcId, newSubnets, sb, sbRef, subnets, _i, _j, _len, _len1, _ref;
        subnets = [this.parent()];
        _ref = this.get("expandedList");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          expand = _ref[_i];
          subnets.push(expand.parent());
        }
        subnets = _.uniq(subnets);
        if (this.parent().type === constant.RESTYPE.SUBNET) {
          azs = _.uniq(_.map(subnets, function(sb) {
            return sb.parent().createRef();
          }));
          subnets = _.map(subnets, function(sb) {
            return sb.createRef("SubnetId");
          });
        } else {
          azs = _.uniq(_.map(subnets, function(az) {
            return az.createRef();
          }));
          newSubnets = [];
          for (_j = 0, _len1 = subnets.length; _j < _len1; _j++) {
            sb = subnets[_j];
            sbRef = sb.getSubnetRef();
            if (sbRef) {
              newSubnets.push(sbRef);
            }
          }
          subnets = newSubnets;
        }
        lc = this.get("lc");
        if (lc) {
          lcId = (lc.getBigBrother() || lc).createRef("LaunchConfigurationName");
        } else {
          lcId = "";
        }
        healthCheckType = "EC2";
        if (this.get("lc")) {
          elbs = this.get("lc").connectionTargets("ElbAmiAsso");
          if (elbs.length) {
            healthCheckType = this.get("healthCheckType");
            elbArray = _.map(elbs, function(elb) {
              return elb.createRef("LoadBalancerName");
            });
          }
        }
        component = {
          uid: this.id,
          name: this.get("name"),
          type: this.type,
          resource: {
            AvailabilityZones: azs,
            VPCZoneIdentifier: subnets.join(" , "),
            LoadBalancerNames: elbArray || [],
            AutoScalingGroupARN: this.get("appId"),
            DefaultCooldown: this.get("cooldown"),
            MinSize: this.get("minSize"),
            MaxSize: this.get("maxSize"),
            HealthCheckType: healthCheckType,
            HealthCheckGracePeriod: this.get("healthCheckGracePeriod"),
            TerminationPolicies: this.get("terminationPolicies"),
            AutoScalingGroupName: this.get("groupName") || this.get("name"),
            DesiredCapacity: this.get("capacity"),
            LaunchConfigurationName: lcId
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.ASG,
      resolveLc: function(uid) {
        var obj;
        if (!uid) {
          return null;
        }
        obj = Design.__instance.__componentMap[uid];
        if (obj && !obj.parent()) {
          return obj;
        }
        return obj.clone();
      },
      deserialize: function(data, layout_data, resolve) {
        var ElbAsso, asg, elb, elbName, lc, _i, _len, _ref;
        asg = new Model({
          id: data.uid,
          name: data.name,
          appId: data.resource.AutoScalingGroupARN,
          parent: resolve(MC.extractID(layout_data.groupUId)),
          cooldown: String(data.resource.DefaultCooldown),
          capacity: String(data.resource.DesiredCapacity),
          minSize: String(data.resource.MinSize),
          maxSize: String(data.resource.MaxSize),
          healthCheckType: data.resource.HealthCheckType,
          healthCheckGracePeriod: String(data.resource.HealthCheckGracePeriod),
          terminationPolicies: data.resource.TerminationPolicies,
          groupName: data.resource.AutoScalingGroupName,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        if (data.resource.LaunchConfigurationName) {
          lc = this.resolveLc(MC.extractID(data.resource.LaunchConfigurationName));
          asg.addChild(lc);
          ElbAsso = Design.modelClassForType("ElbAmiAsso");
          _ref = data.resource.LoadBalancerNames || [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elbName = _ref[_i];
            elb = resolve(MC.extractID(elbName));
            new ElbAsso(lc, elb);
          }
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/DhcpModel',["constant", "../ResourceModel", "Design"], function(constant, ResourceModel, Design) {
    var Model;
    Model = ResourceModel.extend({
      type: constant.RESTYPE.DHCP,
      defaults: function() {
        return {
          appId: ""
        };
      },
      isAuto: function() {
        return this.attributes.appId === "";
      },
      isDefault: function() {
        return this.attributes.appId === "default";
      },
      isCustom: function() {
        return !(this.attributes.appId === '' || this.attributes.appId === 'default');
      },
      getDhcp: function() {
        return this.get('appId');
      },
      setAuto: function() {
        return this.set('appId', "");
      },
      setDefault: function() {
        return this.set("appId", "default");
      },
      setDhcp: function(val) {
        if (this.get('appId') !== val) {
          return this.set("appId", val);
        }
      },
      serialize: function() {}
    }, {
      handleTypes: constant.RESTYPE.DHCP,
      deserialize: function(data) {
        var attr;
        attr = {};
        attr.id = data.uid;
        attr.appId = data.resource.DhcpOptionsId;
        new Model(attr);
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/VpcModel',["constant", "../GroupModel", "./DhcpModel"], function(constant, GroupModel, DhcpModel) {
    var Model;
    Model = GroupModel.extend({
      type: constant.RESTYPE.VPC,
      defaults: {
        dnsSupport: true,
        dnsHostnames: false,
        tenancy: "default",
        cidr: "10.0.0.0/16",
        x: 5,
        y: 3,
        width: 60,
        height: 60
      },
      initialize: function() {
        if (!this.attributes.dhcp) {
          this.attributes.dhcp = new DhcpModel();
        }
        this.draw(true);
        return null;
      },
      isRemovable: function() {
        return false;
      },
      isDefaultTenancy: function() {
        return this.get("tenancy") !== "dedicated";
      },
      setTenancy: function(tenancy) {
        var instance, _i, _len, _ref;
        this.set("tenancy", tenancy);
        if (tenancy === "dedicated") {
          _ref = Design.modelClassForType(constant.RESTYPE.INSTANCE).allObjects();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            instance = _ref[_i];
            instance.setTenancy(tenancy);
          }
        }
        return null;
      },
      setCidr: function(cidr) {
        var SubnetModel, idx, sb, shouldUpdateSubnetCidr, subnetCidrAry, subnets, validCIDR, _i, _len;
        SubnetModel = Design.modelClassForType(constant.RESTYPE.SUBNET);
        subnets = SubnetModel.allObjects();
        shouldUpdateSubnetCidr = false;
        subnetCidrAry = _.map(subnets, function(sb) {
          var subnetCidr;
          subnetCidr = sb.get("cidr");
          if (!SubnetModel.isInVPCCIDR(cidr, subnetCidr)) {
            shouldUpdateSubnetCidr = true;
          }
          return subnetCidr;
        });
        if (shouldUpdateSubnetCidr) {
          subnetCidrAry = this.generateSubnetCidr(cidr, subnetCidrAry);
          if (!subnetCidrAry) {
            return false;
          }
          for (idx = _i = 0, _len = subnets.length; _i < _len; idx = ++_i) {
            sb = subnets[idx];
            sb.setCidr(subnetCidrAry[idx]);
          }
        }
        validCIDR = MC.getValidCIDR(cidr);
        this.set("cidr", validCIDR);
        this.draw();
        return true;
      },
      generateSubnetCidr: function(newCidr, subnetCidrAry) {
        var SubnetModel, subnets;
        SubnetModel = Design.modelClassForType(constant.RESTYPE.SUBNET);
        subnets = SubnetModel.allObjects();
        subnetCidrAry = SubnetModel.autoAssignSimpleCIDR(newCidr, subnetCidrAry, this.get("cidr"));
        if (!subnetCidrAry.length) {
          subnetCidrAry = SubnetModel.autoAssignAllCIDR(newCidr, subnets.length);
        }
        if (subnetCidrAry.length !== subnets.length) {
          return null;
        }
        return subnetCidrAry;
      },
      serialize: function() {
        var component, dhcp, dhcpModel;
        console.assert(this.get("tenancy") === "default" || this.get("tenancy") === "dedicated", "Invalid value for Vpc.attributes.tenancy");
        dhcpModel = this.get("dhcp");
        if (dhcpModel.isAuto()) {
          dhcp = "";
        } else if (dhcpModel.isDefault()) {
          dhcp = "default";
        } else {
          dhcp = dhcpModel.getDhcp();
        }
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            EnableDnsSupport: this.get("dnsSupport"),
            InstanceTenancy: this.get("tenancy"),
            EnableDnsHostnames: this.get("dnsHostnames"),
            DhcpOptionsId: dhcp,
            VpcId: this.get("appId"),
            CidrBlock: this.get("cidr")
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.VPC,
      resolveFirst: true,
      theVPC: function() {
        return Design.instance().classCacheForCid(this.prototype.classId)[0];
      },
      preDeserialize: function(data, layout_data) {
        new Model({
          id: data.uid,
          name: data.name,
          appId: data.resource.VpcId,
          cidr: data.resource.CidrBlock,
          dnsHostnames: data.resource.EnableDnsHostnames,
          dnsSupport: data.resource.EnableDnsSupport,
          tenancy: data.resource.InstanceTenancy,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1]
        });
        return null;
      },
      deserialize: function(data, layout, resolve) {
        var dhcp, oldDhcp, vpc;
        vpc = resolve(data.uid);
        dhcp = data.resource.DhcpOptionsId;
        if (dhcp === void 0) {
          vpc.get('dhcp').setAuto();
        } else if (!dhcp) {
          vpc.get("dhcp").setAuto();
        } else if (dhcp === "default") {
          vpc.get("dhcp").setDefault();
        } else if (dhcp[0] === "@") {
          oldDhcp = vpc.get("dhcp");
          if (oldDhcp) {
            oldDhcp.remove();
          }
          vpc.set("dhcp", resolve(MC.extractID(dhcp)));
        } else {
          vpc.get("dhcp").setDhcp(dhcp);
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/AzModel',["../GroupModel", "./VpcModel", "constant", "i18n!/nls/lang.js", "Design", "CloudResources"], function(GroupModel, VpcModel, constant, lang, Design, CloudResources) {
    var Model;
    Model = GroupModel.extend({
      type: constant.RESTYPE.AZ,
      defaults: {
        x: 2,
        y: 2,
        width: 21,
        height: 21
      },
      initialize: function(attribute, option) {
        var SubnetModel, m;
        if (option.createByUser) {
          SubnetModel = Design.modelClassForType(constant.RESTYPE.SUBNET);
          m = new SubnetModel({
            x: this.x() + 2,
            y: this.y() + 2,
            parent: this
          });
          option.selectId = m.id;
        }
        this.draw(true);
        return null;
      },
      isRemovable: function() {
        if (this.children().length > 0) {
          return sprintf(lang.ide.CVS_CFM_DEL_GROUP, this.get("name"));
        }
        return true;
      },
      createRef: function() {
        return Model.__super__.createRef("ZoneName", true, this.id);
      },
      isCidrEnoughForIps: function(cidr) {
        var child, eni, ipCount, maxIpCount, _i, _len, _ref;
        if (!cidr) {
          return true;
        }
        ipCount = 0;
        _ref = this.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (child.type === constant.RESTYPE.INSTANCE) {
            eni = child.getEmbedEni();
          } else if (child.type === constant.RESTYPE.ENI) {
            eni = child;
          } else {
            continue;
          }
          ipCount += eni.get("ips").length;
        }
        maxIpCount = Design.modelClassForType(constant.RESTYPE.ENI).getAvailableIPCountInCIDR(cidr);
        return maxIpCount >= ipCount;
      },
      serialize: function() {
        var component, n;
        n = this.get("name");
        component = {
          uid: this.id,
          name: n,
          type: this.type,
          resource: {
            ZoneName: n,
            RegionName: n.substring(0, n.length - 1)
          }
        };
        return {
          layout: this.generateLayout(),
          component: component
        };
      }
    }, {
      handleTypes: constant.RESTYPE.AZ,
      diffJson: function() {},
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.name,
          parent: resolve(layout_data.groupUId),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1]
        });
        return null;
      },
      allPossibleAZ: function() {
        var az, azMap, _i, _len, _ref;
        azMap = {};
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          az = _ref[_i];
          azMap[az.get("name")] = az.id;
        }
        return CloudResources(constant.RESTYPE.AZ, region).where({
          category: region
        }).map(function(az) {
          return {
            name: az.attributes.id,
            id: azMap[az.attributes.id] || ""
          };
        });
      },
      getAzByName: function(name) {
        var az, _i, _len, _ref;
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          az = _ref[_i];
          if (az.get("name") === name) {
            return az;
          }
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/CgwModel',["../ComplexResModel", "Design", "constant"], function(ComplexResModel, Design, constant) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: {
        x: 0,
        y: 0,
        width: 17,
        height: 10,
        bgpAsn: ""
      },
      newNameTmpl: "customer-gateway-",
      type: constant.RESTYPE.CGW,
      isDynamic: function() {
        return !!this.get("bgpAsn");
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            CustomerGatewayId: this.get("appId"),
            BgpAsn: this.get("bgpAsn"),
            Type: "ipsec.1",
            IpAddress: this.get("ip")
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.CGW,
      deserialize: function(data, layout_data, resolve) {
        return new Model({
          id: data.uid,
          name: data.name,
          appId: data.resource.CustomerGatewayId,
          bgpAsn: data.resource.BgpAsn,
          ip: data.resource.IpAddress,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/connection/SgRuleSet',["constant", "../ConnectionModel", "Design"], function(constant, ConnectionModel, Design) {
    var SgRuleSet;
    SgRuleSet = ConnectionModel.extend({
      type: "SgRuleSet",

      /*
      |-------|   in1        out2   |-------|
      |       |  <=====     <=====  |       |
      | PORT1 |                     | PORT2 |
      |       |  =====>     =====>  |       |
      |-------|   out1        in2   |-------|
       */
      "default": {
        in1: null,
        out1: null,
        in2: null,
        out2: null
      },
      initialize: function() {
        var tmp;
        if (this.port1Comp().type === "SgIpTarget") {
          tmp = this.port2Comp();
          this.__port2Comp = this.__port1Comp;
          this.__port1Comp = tmp;
        }
        this.attributes.in1 = [];
        this.attributes.out1 = [];
        if (this.port1Comp() === this.port2Comp()) {
          this.attributes.in2 = this.attributes.in1;
          this.attributes.out2 = this.attributes.out1;
        } else {
          this.attributes.in2 = [];
          this.attributes.out2 = [];
        }
        return null;
      },
      ruleCount: function(port) {
        if (port === this.port1Comp().id || port === this.port1Comp().get("name")) {
          return this.attributes.in1.length + this.attributes.out1.length;
        } else {
          return this.attributes.in2.length + this.attributes.out2.length;
        }
      },
      toPlainObjects: function(filter, detailedInfo) {
        var attr, port, portion, portions, rule, rules, _i, _j, _len, _len1, _ref;
        portions = [
          {
            ary: this.attributes.in1,
            direction: SgRuleSet.DIRECTION.IN,
            relation: this.port2Comp(),
            owner: this.port1Comp()
          }, {
            ary: this.attributes.out1,
            direction: SgRuleSet.DIRECTION.OUT,
            relation: this.port2Comp(),
            owner: this.port1Comp()
          }
        ];
        if (!(this.port1Comp() === this.port2Comp() || this.getTarget("SgIpTarget"))) {
          portions.push({
            ary: this.attributes.in2,
            direction: SgRuleSet.DIRECTION.IN,
            relation: this.port1Comp(),
            owner: this.port2Comp()
          });
          portions.push({
            ary: this.attributes.out2,
            direction: SgRuleSet.DIRECTION.OUT,
            relation: this.port1Comp(),
            owner: this.port2Comp()
          });
        }
        rules = [];
        for (_i = 0, _len = portions.length; _i < _len; _i++) {
          portion = portions[_i];
          if (filter) {
            if (_.isString(filter)) {
              if (portion.owner.id !== filter && portion.owner.get("name") !== filter) {
                continue;
              }
            } else if (!filter(portion.owner)) {
              continue;
            }
          }
          _ref = portion.ary;
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            rule = _ref[_j];
            if (rule.protocol === "icmp") {
              port = rule.fromPort + "/" + rule.toPort;
            } else if (rule.fromPort === rule.toPort || !rule.toPort) {
              port = rule.fromPort;
            } else {
              port = rule.fromPort + "-" + rule.toPort;
            }
            attr = {
              ruleSetId: this.id,
              port: port,
              protocol: rule.protocol,
              direction: portion.direction,
              relation: portion.relation.get("name"),
              color: portion.relation.color
            };
            if (detailedInfo) {
              attr.relationId = portion.relation.id;
              attr.ownerId = portion.owner.id;
            }
            rules.push(attr);
          }
        }
        return rules;
      },
      hasRawRuleTo: function(port) {
        console.assert(port === this.port1Comp() || port === this.port2Comp(), "Invalid port for calling SgRuleSet.hasRawRuleTo()");
        if (port === this.port1Comp()) {
          return this.attributes.in1.length > 0 || this.attributes.out2.length > 0;
        } else {
          return this.attributes.in2.length > 0 || this.attributes.out1.length > 0;
        }
      },
      addRawRule: function(ruleOwner, direction, rawRule) {
        var SgModel, elb, exist, existRule, oldPort1InRuleCout, oldPort1OutRuleCout, oldPort2InRuleCout, oldPort2OutRuleCout, p1, p2, port1, portion, portionName, portions, rule, shouldInitSgLine, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1;
        console.assert(ruleOwner === this.port1Comp().id || ruleOwner === this.port2Comp().id || ruleOwner === this.port1Comp().get("name") || ruleOwner === this.port2Comp().get("name"), "Invalid ruleOwner, when adding a raw rule to SgRuleSet : ", ruleOwner);
        console.assert(direction === SgRuleSet.DIRECTION.BIWAY || direction === SgRuleSet.DIRECTION.IN || direction === SgRuleSet.DIRECTION.OUT, "Invalid direction, when adding a raw rule to SgRuleSet : ", rawRule);
        console.assert((("" + rawRule.protocol) === "-1" || rawRule.protocol === "all" || parseInt(rawRule.protocol, 10) + "" === rawRule.protocol) || rawRule.fromPort || rawRule.toPort, "Invalid rule, when adding a raw rule to SgRuleSet : ", rawRule);
        shouldInitSgLine = this.get("in1").length + this.get("in2").length + this.get("out1").length + this.get("out2").length === 0;
        oldPort1InRuleCout = this.get("in1").length;
        oldPort2InRuleCout = this.get("in2").length;
        oldPort1OutRuleCout = this.get("out1").length;
        oldPort2OutRuleCout = this.get("out2").length;
        rule = {
          protocol: rawRule.protocol,
          fromPort: "" + rawRule.fromPort,
          toPort: "" + rawRule.toPort
        };
        if (("" + rule.protocol) === "-1" || rule.protocol === "all") {
          rule.protocol = "all";
          rule.fromPort = "0";
          rule.toPort = "65535";
        } else if (parseInt(rawRule.protocol, 10) + "" === rawRule.protocol) {
          rule.fromPort = "";
          rule.toPort = "";
        }
        if (rule.fromPort === rule.toPort && rule.protocol !== "icmp") {
          rule.toPort = "";
        }
        port1 = ruleOwner === this.port1Comp().id || ruleOwner === this.port1Comp().get("name");
        if (!port1 && this.getTarget("SgIpTarget")) {
          console.info("Ignoring adding sg rules for Ip Target.");
          return;
        }
        switch (direction) {
          case SgRuleSet.DIRECTION.IN:
            portions = [port1 ? "in1" : "in2"];
            break;
          case SgRuleSet.DIRECTION.OUT:
            portions = [port1 ? "out1" : "out2"];
            break;
          case SgRuleSet.DIRECTION.BIWAY:
            portions = [port1 ? "in1" : "in2", port1 ? "out1" : "out2"];
        }
        for (_i = 0, _len = portions.length; _i < _len; _i++) {
          portionName = portions[_i];
          exist = false;
          portion = this.get(portionName);
          for (_j = 0, _len1 = portion.length; _j < _len1; _j++) {
            existRule = portion[_j];
            if (existRule.fromPort === rule.fromPort && existRule.toPort === rule.toPort && existRule.protocol === rule.protocol) {
              exist = true;
              break;
            }
          }
          if (!exist) {
            portion = portion.slice(0);
            portion.push(rule);
            this.set(portionName, portion);
          }
        }
        if (shouldInitSgLine) {
          p1 = this.port1Comp();
          p2 = this.port2Comp();
          if (p1 !== p2 && p1.type !== "SgIpTarget" && p2.type !== "SgIpTarget") {
            p1.vlineAddBatch(p2);
          }
        } else {
          SgModel = Design.modelClassForType(constant.RESTYPE.SG);
          if ((oldPort1InRuleCout + oldPort2OutRuleCout === 0) && (this.get("in1").length + this.get("out2").length > 0)) {
            _ref = this.port1Comp().connectionTargets("SgAsso");
            for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
              elb = _ref[_k];
              if (elb.type === constant.RESTYPE.ELB) {
                SgModel.tryDrawLine(elb);
              }
            }
          }
          if ((oldPort2InRuleCout + oldPort1OutRuleCout === 0) && (this.get("in2").length + this.get("out1").length > 0)) {
            _ref1 = this.port2Comp().connectionTargets("SgAsso");
            for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
              elb = _ref1[_l];
              if (elb.type === constant.RESTYPE.ELB) {
                SgModel.tryDrawLine(elb);
              }
            }
          }
        }
        return null;
      },
      addRule: function(target, direction, rule) {
        var target2;
        console.assert(target === this.port1Comp().id || target === this.port2Comp().id || target === this.port1Comp().get("name") || target === this.port2Comp().get("name"), "Invalid target, when adding a rule to SgRuleSet : ", target);
        if (target === this.port1Comp().id || target === this.port1Comp().get("name")) {
          target2 = this.port2Comp().id;
        } else {
          target = this.port2Comp().id;
          target2 = this.port1Comp().id;
        }
        if (direction === SgRuleSet.DIRECTION.IN || direction === SgRuleSet.DIRECTION.BIWAY) {
          this.addRawRule(target, SgRuleSet.DIRECTION.IN, rule);
          this.addRawRule(target2, SgRuleSet.DIRECTION.OUT, rule);
        }
        if (direction === SgRuleSet.DIRECTION.OUT || direction === SgRuleSet.DIRECTION.BIWAY) {
          this.addRawRule(target, SgRuleSet.DIRECTION.OUT, rule);
          this.addRawRule(target2, SgRuleSet.DIRECTION.IN, rule);
        }
        return null;
      },
      removeRawRule: function(ruleOwner, direction, rule) {
        var SgModel, elb, existRule, found, idx, oldPort1InRuleCout, oldPort1OutRuleCout, oldPort2InRuleCout, oldPort2OutRuleCout, port1, portion, portionName, portions, sgline, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref, _ref1, _ref2, _ref3;
        console.assert(ruleOwner === this.port1Comp().id || ruleOwner === this.port2Comp().id || ruleOwner === this.port1Comp().get("name") || ruleOwner === this.port2Comp().get("name"), "Invalid ruleOwner, when removing a raw rule from SgRuleSet : ", ruleOwner);
        console.assert(direction === SgRuleSet.DIRECTION.BIWAY || direction === SgRuleSet.DIRECTION.IN || direction === SgRuleSet.DIRECTION.OUT, "Invalid direction, when removing a raw rule from SgRuleSet : ", rule);
        console.assert(rule.fromPort !== void 0 && rule.toPort !== void 0 && rule.protocol !== void 0, "Invalid rule, when removing a raw rule from SgRuleSet : ", rule);
        oldPort1InRuleCout = this.get("in1").length;
        oldPort2InRuleCout = this.get("in2").length;
        oldPort1OutRuleCout = this.get("out1").length;
        oldPort2OutRuleCout = this.get("out2").length;
        if (rule.protocol === "-1") {
          rule.protocol = "all";
        }
        if (rule.fromPort === rule.toPort) {
          rule.toPort = "";
        }
        port1 = ruleOwner === this.port1Comp().id || ruleOwner === this.port1Comp().get("name");
        switch (direction) {
          case SgRuleSet.DIRECTION.IN:
            portions = [port1 ? "in1" : "in2"];
            break;
          case SgRuleSet.DIRECTION.OUT:
            portions = [port1 ? "out1" : "out2"];
            break;
          case SgRuleSet.DIRECTION.BIWAY:
            portions = [port1 ? "in1" : "in2", port1 ? "out1" : "out2"];
        }
        found = false;
        for (_i = 0, _len = portions.length; _i < _len; _i++) {
          portionName = portions[_i];
          portion = this.get(portionName);
          for (idx = _j = 0, _len1 = portion.length; _j < _len1; idx = ++_j) {
            existRule = portion[idx];
            if (existRule.fromPort === rule.fromPort && existRule.toPort === rule.toPort && existRule.protocol === rule.protocol) {
              portion = portion.slice(0);
              portion.splice(idx, 1);
              found = true;
              this.set(portionName, portion);
              break;
            }
          }
        }
        if (this.get("in1").length + this.get("in2").length + this.get("out1").length + this.get("out2").length === 0) {
          this.remove();
        } else {
          SgModel = Design.modelClassForType(constant.RESTYPE.SG);
          if ((this.get("in1").length + this.get("out2").length === 0) && (oldPort1InRuleCout + oldPort2OutRuleCout > 0)) {
            _ref = this.port1Comp().connectionTargets("SgAsso");
            for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
              elb = _ref[_k];
              if (elb.type === constant.RESTYPE.ELB) {
                _ref1 = elb.connections("SgRuleLine");
                for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
                  sgline = _ref1[_l];
                  sgline.validate();
                }
              }
            }
          }
          if ((this.get("in2").length + this.get("out1").length === 0) && (oldPort2InRuleCout + oldPort1OutRuleCout > 0)) {
            _ref2 = this.port2Comp().connectionTargets("SgAsso");
            for (_m = 0, _len4 = _ref2.length; _m < _len4; _m++) {
              elb = _ref2[_m];
              if (elb.type === constant.RESTYPE.ELB) {
                _ref3 = elb.connections("SgRuleLine");
                for (_n = 0, _len5 = _ref3.length; _n < _len5; _n++) {
                  sgline = _ref3[_n];
                  sgline.validate();
                }
              }
            }
          }
        }
        console.assert(found, "Rule is not found when removing SG Rule", rule);
        return null;
      },
      removeRuleByPlainObj: function(ruleObj) {
        var owner, ports;
        console.assert(ruleObj.relation === this.port1Comp().id || ruleObj.relation === this.port1Comp().get("name") || ruleObj.relation === this.port2Comp().id || ruleObj.relation === this.port2Comp().get("name"), "Invalid ruleObj.relation, when removing a rule : ", ruleObj);
        console.assert(ruleObj.direction === SgRuleSet.DIRECTION.BIWAY || ruleObj.direction === SgRuleSet.DIRECTION.IN || ruleObj.direction === SgRuleSet.DIRECTION.OUT, "Invalid direction, when removing a raw rule from SgRuleSet : ", ruleObj);
        console.assert(ruleObj.relation !== void 0 && ruleObj.port !== void 0 && ruleObj.protocol !== void 0 && ruleObj.direction !== void 0, "Invalid ruleObj, when removing a rule : ", ruleObj);
        if (ruleObj.relation === this.port1Comp().id || ruleObj.relation === this.port1Comp().get("name")) {
          owner = this.port2Comp().id;
        } else {
          owner = this.port1Comp().id;
        }
        ports = "" + ruleObj.port;
        if (ports.indexOf("/") >= 0) {
          ports = ports.split("/");
        } else {
          ports = ports.split("-");
        }
        ruleObj.fromPort = ports[0];
        ruleObj.toPort = ports[1] || "";
        this.removeRawRule(owner, ruleObj.direction, ruleObj);
        return null;
      },
      serialize: function(components) {
        var portion, portions, rule, sg1, sg1Ref, sg2, sg2Ref, _i, _j, _len, _len1, _ref;
        sg1 = this.port1Comp();
        sg2 = this.port2Comp();
        sg1Ref = sg1.createRef("GroupId");
        sg2Ref = sg2.type === "SgIpTarget" ? sg2.get("name") : sg2.createRef("GroupId");
        portions = [
          {
            ary: this.get("in1"),
            owner: components[sg1.id].resource.IpPermissions,
            target: sg2Ref
          }, {
            ary: this.get("out1"),
            owner: components[sg1.id].resource.IpPermissionsEgress,
            target: sg2Ref
          }
        ];
        if (sg2.type !== "SgIpTarget" && sg1 !== sg2) {
          portions.push({
            ary: this.get("in2"),
            owner: components[sg2.id].resource.IpPermissions,
            target: sg1Ref
          });
          portions.push({
            ary: this.get("out2"),
            owner: components[sg2.id].resource.IpPermissionsEgress,
            target: sg1Ref
          });
        }
        for (_i = 0, _len = portions.length; _i < _len; _i++) {
          portion = portions[_i];
          _ref = portion.ary;
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            rule = _ref[_j];
            portion.owner.push({
              FromPort: rule.fromPort,
              ToPort: rule.toPort ? rule.toPort : rule.fromPort,
              IpRanges: portion.target,
              IpProtocol: rule.protocol === "all" ? "-1" : rule.protocol
            });
          }
        }
        return null;
      }
    }, {
      getResourceSgRuleSets: function(resource) {
        var ruleset, sg, sgRuleAry, sgRuleMap, _i, _j, _len, _len1, _ref, _ref1;
        sgRuleMap = {};
        sgRuleAry = [];
        _ref = resource.connectionTargets("SgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          _ref1 = sg.connections("SgRuleSet");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            ruleset = _ref1[_j];
            if (sgRuleMap[ruleset.id]) {
              continue;
            }
            sgRuleMap[ruleset.id] = true;
            sgRuleAry.push(ruleset);
          }
        }
        return sgRuleAry;
      },
      getRelatedSgRuleSets: function(res1, res2) {
        var foundRuleSet, res1SgMap, ruleset, sg, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        res1SgMap = {};
        _ref = res1.connectionTargets("SgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          res1SgMap[sg.id] = true;
        }
        foundRuleSet = [];
        _ref1 = res2.connectionTargets("SgAsso");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sg = _ref1[_j];
          _ref2 = sg.connections("SgRuleSet");
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            ruleset = _ref2[_k];
            if (res1SgMap[ruleset.getOtherTarget(sg).id]) {
              foundRuleSet.push(ruleset);
            }
          }
        }
        return _.uniq(foundRuleSet);
      },
      getPlainObjFromRuleSets: function(sgRuleAry) {
        var rule, ruleMap, ruleString, rules, _i, _len;
        ruleMap = {};
        rules = [];
        for (_i = 0, _len = sgRuleAry.length; _i < _len; _i++) {
          rule = sgRuleAry[_i];
          ruleString = rule.direction + rule.target + rule.protocol + rule.port;
          if (ruleMap[ruleString]) {
            continue;
          }
          ruleMap[ruleString] = true;
          rules.push(rule);
        }
        return rules;
      },
      getGroupedObjFromRuleSets: function(rulesetArray) {
        var arr, comp, group, id, ipTarget, plainObj, ruleset, tempMap, uid, _i, _j, _len, _len1, _ref;
        tempMap = {};
        for (_i = 0, _len = rulesetArray.length; _i < _len; _i++) {
          ruleset = rulesetArray[_i];
          ipTarget = ruleset.getTarget("SgIpTarget");
          if (ipTarget && !ipTarget.isClassicElbSg()) {
            continue;
          }
          comp = ruleset.port1Comp();
          id = comp.id;
          if (!tempMap[id]) {
            tempMap[id] = {
              ownerId: id,
              ownerName: comp.get("name"),
              ownerColor: comp.color,
              rules: []
            };
          }
          comp = ruleset.port2Comp();
          id = comp.id;
          if (!tempMap[id]) {
            tempMap[id] = {
              ownerId: id,
              ownerName: comp.get("name"),
              ownerColor: comp.color,
              rules: []
            };
          }
          _ref = ruleset.toPlainObjects(null, true);
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            plainObj = _ref[_j];
            tempMap[plainObj.ownerId].rules.push(plainObj);
          }
        }
        arr = [];
        for (uid in tempMap) {
          group = tempMap[uid];
          if (group.rules.length) {
            arr.push(group);
          }
        }
        return arr.sort(function(a, b) {
          if (a.ownerName === "DefaultSG") {
            return -1;
          }
          if (b.ownerName === "DefaultSG") {
            return 1;
          }
          if (a.ownerName < b.ownerName) {
            return -1;
          }
          if (a.ownerName > b.ownerName) {
            return 1;
          }
          return 0;
        });
      }
    });
    SgRuleSet.DIRECTION = {
      BIWAY: "biway",
      IN: "inbound",
      OUT: "outbound"
    };
    return SgRuleSet;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/connection/SgLine',["constant", "../ConnectionModel", "../ResourceModel", "component/sgrule/SGRulePopup"], function(constant, ConnectionModel, ResourceModel, SGRulePopup) {
    var SgRuleLine;
    SgRuleLine = ConnectionModel.extend({
      constructor: function(p1Comp, p2Comp, attr, option) {
        if (option && option.createByUser) {
          new SGRulePopup(p1Comp, p2Comp);
          return;
        }
        console.assert(p1Comp !== p2Comp, "Sgline should connect to different resources.");
        if (!this.assignCompsToPorts(p1Comp, p2Comp) || !this.isValid()) {
          return;
        }
        return ConnectionModel.call(this, p1Comp, p2Comp, attr, option);
      },
      isValid: function() {
        var TYPE, ami, attachs, elb, elbSgMap, eni, expandAsg, hasInRule, lc, p1Comp, p2Comp, ruleset, sg, target, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        p1Comp = this.port1Comp();
        p2Comp = this.port2Comp();
        TYPE = constant.RESTYPE;
        if (p1Comp.type === p2Comp.type && p1Comp.type === TYPE.AWS_ELB) {
          return false;
        }
        ami = this.getTarget(TYPE.INSTANCE);
        eni = this.getTarget(TYPE.ENI);
        if (eni) {
          attachs = eni.connectionTargets("EniAttachment");
          if (attachs.length === 0) {
            return false;
          }
          if (attachs.indexOf(ami) >= 0) {
            return false;
          }
        }
        expandAsg = this.getTarget("ExpandedAsg");
        lc = this.getTarget(TYPE.LC);
        if (expandAsg && lc && expandAsg.get("originalAsg").get("lc") === lc) {
          return false;
        }
        elb = this.getTarget(TYPE.ELB);
        if (elb) {
          if (!elb.get("internal")) {
            return false;
          }
          elbSgMap = {};
          hasInRule = false;
          _ref = elb.connectionTargets("SgAsso");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sg = _ref[_i];
            elbSgMap[sg.id] = sg;
          }
          _ref1 = this.getOtherTarget(elb).connectionTargets("SgAsso");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            sg = _ref1[_j];
            _ref2 = sg.connections("SgRuleSet");
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              ruleset = _ref2[_k];
              target = ruleset.getOtherTarget(sg);
              if (!elbSgMap[target.id]) {
                continue;
              }
              if (ruleset.hasRawRuleTo(elbSgMap[target.id])) {
                hasInRule = true;
                break;
              }
            }
            if (hasInRule) {
              break;
            }
          }
          if (!hasInRule) {
            return false;
          }
        }
        return true;
      },
      validate: function() {
        if (!this.isValid()) {
          this.remove({
            reason: "Validation Failed"
          });
        }
      },
      isRemovable: function() {
        var SgRuleSetModel, allRuleSets, group, groups, _i, _len;
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        allRuleSets = SgRuleSetModel.getRelatedSgRuleSets(this.port1Comp(), this.port2Comp());
        groups = SgRuleSetModel.getGroupedObjFromRuleSets(allRuleSets);
        for (_i = 0, _len = groups.length; _i < _len; _i++) {
          group = groups[_i];
          group.content = MC.template.sgRuleList(group.rules);
        }
        return MC.template.groupedSgRuleListDelConfirm(groups);
      },
      remove: function(reason) {
        var SgRuleSetModel, rs, _i, _len, _ref;
        ConnectionModel.prototype.remove.apply(this, arguments);
        if (reason) {
          return;
        }
        if (this.port1Comp().isRemoved() || this.port2Comp().isRemoved()) {
          return;
        }
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        _ref = SgRuleSetModel.getRelatedSgRuleSets(this.port1Comp(), this.port2Comp());
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rs = _ref[_i];
          rs.remove();
        }
        return null;
      },
      silentRemove: function() {
        var v;
        v = this.__view;
        if (v) {
          v.detach();
        }
        ResourceModel.prototype.remove.apply(this, arguments);
        return null;
      },
      type: "SgRuleLine",
      defaults: {
        lineType: "sg",
        dashLine: true,
        name: "Security Group Rule"
      },
      portDefs: [
        {
          port1: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          }
        }, {
          port1: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          }
        }, {
          port1: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          }
        }, {
          port1: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "launchconfig-sg",
            type: "ExpandedAsg"
          }
        }, {
          port1: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "elb-sg-in",
            type: constant.RESTYPE.ELB
          }
        }, {
          port1: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          },
          port2: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          },
          port2: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: "ExpandedAsg"
          },
          port2: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          }
        }, {
          port1: {
            name: "elb-sg-in",
            type: constant.RESTYPE.ELB
          },
          port2: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          },
          port2: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          },
          port2: {
            name: "launchconfig-sg",
            type: "ExpandedAsg"
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          },
          port2: {
            name: "elb-sg-in",
            type: constant.RESTYPE.ELB
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          },
          port2: {
            name: "elb-sg-in",
            type: constant.RESTYPE.ELB
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: "ExpandedAsg"
          },
          port2: {
            name: "elb-sg-in",
            type: constant.RESTYPE.ELB
          }
        }
      ]
    }, {
      isConnectable: function(p1Comp, p2Comp) {
        var attach, tag, _i, _len, _ref;
        tag = p1Comp.type + ">" + p2Comp.type;
        if (tag.indexOf(constant.RESTYPE.INSTANCE) !== -1 && tag.indexOf(constant.RESTYPE.ENI) !== -1) {
          _ref = p1Comp.connectionTargets("EniAttachment");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            attach = _ref[_i];
            if (attach === p2Comp) {
              return "The Network Interface is attached to the instance. No need to connect them by security group rule.";
            }
          }
        }
        return true;
      }
    });
    return SgRuleLine;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/SgModel',["../ComplexResModel", "../ResourceModel", "../connection/SgRuleSet", "../connection/SgLine", "Design", "constant"], function(ComplexResModel, ResourceModel, SgRuleSet, SgLine, Design, constant) {
    var Model, PREDEF_SG_COLORS, SgTargetModel;
    PREDEF_SG_COLORS = ['#f26c4f', '#7dc476', '#00bef2', '#615ca8', '#fcec00', '#ff9900', '#ffcc00', '#ffcc99', '#ff99ff', '#00cccc', '#99cc99', '#9999ff', '#ffff99', '#ff00ff', '#663300', '#336600', '#660066', '#003300', '#0000ff', '#666600'];
    SgTargetModel = ComplexResModel.extend({
      type: "SgIpTarget",
      constructor: function(ip) {
        var cache, ipTarget, _i, _len;
        cache = Design.instance().classCacheForCid(this.classId);
        for (_i = 0, _len = cache.length; _i < _len; _i++) {
          ipTarget = cache[_i];
          if (ipTarget.attributes.name === ip) {
            return ipTarget;
          }
        }
        cache.push(this);
        Backbone.Model.call(this, {
          id: MC.guid(),
          name: ip
        });
        return this;
      },
      isClassicElbSg: function() {
        return this.attributes.name === "amazon-elb/amazon-elb-sg";
      },
      isVisual: function() {
        return false;
      }
    });
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.SG,
      newNameTmpl: "custom-sg-",
      color: "#f26c4f",
      defaults: {
        description: "Custom Security Group",
        groupName: ""
      },
      initialize: function(attributes, option) {
        var attr, direction;
        this.color = this.generateColor();
        if (!(option && option.isDeserialize)) {
          if (this.isElbSg()) {
            direction = SgRuleSet.DIRECTION.IN;
            attr = {
              fromPort: "22",
              toPort: "",
              protocol: "tcp"
            };
          } else {
            direction = SgRuleSet.DIRECTION.OUT;
            attr = {
              fromPort: "0",
              toPort: "65535",
              protocol: "-1"
            };
          }
          (new SgRuleSet(this, this.createIpTarget("0.0.0.0/0"))).addRawRule(this.id, direction, attr);
        }
        return null;
      },
      isElbSg: function() {
        return this.get("isElbSg");
      },
      setAsElbSg: function() {
        return this.set("isElbSg", true);
      },
      isDefault: function() {
        return this.attributes.name === "DefaultSG";
      },
      isVisual: function() {
        return false;
      },
      createIpTarget: function(ipAddress) {
        return new SgTargetModel(MC.getValidCIDR(ipAddress));
      },
      getNewName: function() {
        var myKinds;
        myKinds = Design.modelClassForType(this.type).allObjects();
        return ResourceModel.prototype.getNewName.call(this, myKinds.length - 1);
      },
      ruleCount: function() {
        var count, ruleset, _i, _len, _ref;
        count = 0;
        _ref = this.connections("SgRuleSet");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ruleset = _ref[_i];
          count += ruleset.ruleCount(this.id);
        }
        return count;
      },
      getMemberList: function() {
        return _.filter(this.connectionTargets("SgAsso"), function(tgt) {
          return tgt.type !== "ExpandedAsg";
        });
      },
      connect: function(cn) {
        if (cn.type === "SgAsso") {
          this.vlineAdd(cn.getOtherTarget(this));
        }
        return null;
      },
      disconnect: function(cn) {
        if (cn.type === "SgAsso") {
          this.vlineRemove(cn.getOtherTarget(this), void 0, cn);
        } else if (cn.type === "SgRuleSet") {
          if (cn.port1Comp() === this) {
            if (cn.port2Comp().type !== "SgIpTarget") {
              this.vlineRemoveBatch(cn.port2Comp(), cn);
            }
          }
        }
        return null;
      },
      vlineAdd: function(resource) {
        var connectedResMap, res, sg, _i, _j, _len, _len1, _ref, _ref1;
        if (!Design.instance().shouldDraw()) {
          return;
        }
        connectedResMap = {};
        _ref = this.getVisualConnectedSg();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          _ref1 = sg.connectionTargets("SgAsso");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            res = _ref1[_j];
            if (connectedResMap[res.id]) {
              continue;
            }
            if (resource !== res) {
              new SgLine(resource, res);
            }
            connectedResMap[res.id] = true;
          }
        }
        return null;
      },
      vlineAddBatch: function(otherSg) {
        var groupRes, myRes, otherRes, _i, _j, _len, _len1, _ref;
        if (!Design.instance().shouldDraw()) {
          return;
        }
        if (otherSg === this) {
          return;
        }
        groupRes = this.connectionTargets("SgAsso");
        _ref = otherSg.connectionTargets("SgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          otherRes = _ref[_i];
          for (_j = 0, _len1 = groupRes.length; _j < _len1; _j++) {
            myRes = groupRes[_j];
            if (myRes !== otherRes) {
              new SgLine(myRes, otherRes);
            }
          }
        }
        return null;
      },
      vlineRemove: function(resource, possibleAffectedRes, reason) {
        var cn, connectableMap, res, resourceSg, sg, sgTarget, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3;
        if (!Design.instance().shouldDraw()) {
          return;
        }
        if (!possibleAffectedRes) {
          possibleAffectedRes = [];
          _ref = this.getVisualConnectedSg();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sg = _ref[_i];
            possibleAffectedRes = possibleAffectedRes.concat(sg.connectionTargets("SgAsso"));
          }
        }
        connectableMap = {};
        _ref1 = resource.connectionTargets("SgAsso");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          resourceSg = _ref1[_j];
          _ref2 = resourceSg.getVisualConnectedSg();
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            sg = _ref2[_k];
            _ref3 = sg.connectionTargets("SgAsso");
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              sgTarget = _ref3[_l];
              connectableMap[sgTarget.id] = true;
            }
          }
        }
        for (_m = 0, _len4 = possibleAffectedRes.length; _m < _len4; _m++) {
          res = possibleAffectedRes[_m];
          if (res === resource) {
            continue;
          }
          cn = SgLine.findExisting(resource, res);
          if (cn) {
            if (!connectableMap[res.id]) {
              cn.remove(reason);
            } else {
              cn.validate();
            }
          }
        }
        return null;
      },
      vlineRemoveBatch: function(otherSg, reason) {
        var possibleAffectedRes, resource, _i, _len, _ref;
        if (!Design.instance().shouldDraw()) {
          return;
        }
        possibleAffectedRes = otherSg.connectionTargets("SgAsso");
        _ref = this.connectionTargets("SgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          resource = _ref[_i];
          this.vlineRemove(resource, possibleAffectedRes, reason);
        }
        return null;
      },
      getVisualConnectedSg: function() {
        var cnn, cnns, _i, _len, _ref;
        cnns = [];
        _ref = this.get("__connections");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cnn = _ref[_i];
          if (cnn.type === "SgRuleSet" && cnn.port1Comp() !== cnn.port2Comp() && !cnn.getTarget("SgIpTarget")) {
            cnns.push(cnn.getOtherTarget(this));
          }
        }
        return cnns;
      },
      generateColor: function() {
        var c, color, i, sg, usedColor, _i, _len, _ref;
        if (this.isDefault()) {
          return PREDEF_SG_COLORS[0];
        }
        usedColor = {};
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          usedColor[sg.color] = true;
        }
        i = 1;
        while (i < PREDEF_SG_COLORS.length) {
          c = PREDEF_SG_COLORS[i];
          if (!usedColor[c]) {
            color = c;
            break;
          }
          ++i;
        }
        if (!color) {
          color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
          while (color.length < 6) {
            color = '0' + color;
          }
          color = "#" + color;
        }
        return color;
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            Default: this.isDefault(),
            GroupId: this.get("appId"),
            GroupName: this.get("groupName") || this.get("name"),
            GroupDescription: this.get("description"),
            VpcId: this.getVpcRef(),
            IpPermissions: [],
            IpPermissionsEgress: []
          }
        };
        return {
          component: component
        };
      }
    }, {
      getDefaultSg: function() {
        return _.find(Model.allObjects(), function(obj) {
          return obj.isDefault();
        });
      },
      tryDrawLine: function(leftRes, rightRes) {
        var connectedSg, otherSg, rightMap, rightResArr, sg, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4;
        if (rightRes) {
          rightMap = {};
          _ref = rightRes.connectionTargets("SgAsso");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sg = _ref[_i];
            rightMap[sg.id] = true;
          }
          _ref1 = leftRes.connectionTargets("SgAsso");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            sg = _ref1[_j];
            _ref2 = sg.getVisualConnectedSg();
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              connectedSg = _ref2[_k];
              if (rightMap[connectedSg.id]) {
                new SgLine(leftRes, rightRes);
                return;
              }
            }
          }
        } else {
          rightResArr = [];
          _ref3 = leftRes.connectionTargets("SgAsso");
          for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
            sg = _ref3[_l];
            _ref4 = sg.getVisualConnectedSg();
            for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
              otherSg = _ref4[_m];
              rightResArr = _.union(rightResArr, otherSg.connectionTargets("SgAsso"));
            }
          }
          for (_n = 0, _len5 = rightResArr.length; _n < _len5; _n++) {
            rightRes = rightResArr[_n];
            if (leftRes !== rightRes) {
              new SgLine(leftRes, rightRes);
            }
          }
        }
        return null;
      },
      updateSgLines: function() {
        var a, connectableMap, idKey, key, leftPortRes, leftRes, resource, ress, ruleset, sg1, sg2, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        console.assert(this === Design, "Possible misuse of updateSgLines detected!");
        connectableMap = {};
        _ref = SgRuleSet.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ruleset = _ref[_i];
          sg1 = ruleset.port1Comp();
          sg2 = ruleset.port2Comp();
          if (sg1 === sg2 || sg1.type === "SgIpTarget" || sg2.type === "SgIpTarget") {
            continue;
          }
          leftPortRes = sg1.connectionTargets("SgAsso");
          _ref1 = sg2.connectionTargets("SgAsso");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            resource = _ref1[_j];
            for (_k = 0, _len2 = leftPortRes.length; _k < _len2; _k++) {
              leftRes = leftPortRes[_k];
              if (leftRes.id === resource.id) {
                continue;
              }
              if (leftRes.id < resource.id) {
                key = leftRes.id + "|" + resource.id;
              } else {
                key = resource.id + "|" + leftRes.id;
              }
              a = connectableMap[key] || [];
              a[0] = leftRes;
              a[1] = resource;
              connectableMap[key] = a;
            }
          }
        }
        for (idKey in connectableMap) {
          ress = connectableMap[idKey];
          new SgLine(ress[0], ress[1], void 0, {
            detectDuplicate: false
          });
        }
        return null;
      },
      handleTypes: constant.RESTYPE.SG,
      deserialize: function(data, layout_data, resolve) {
        var attr, dir, group, rule, ruleObj, ruleTarget, rules, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        group = new Model({
          name: data.name,
          id: data.uid,
          appId: data.resource.GroupId,
          groupName: data.resource.GroupName,
          description: data.resource.GroupDescription
        }, {
          isDeserialize: true
        });
        rules = [];
        if (data.resource.IpPermissions) {
          _ref = data.resource.IpPermissions;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            rule = _ref[_i];
            rules.push({
              rule: rule
            });
          }
        }
        if (data.resource.IpPermissionsEgress) {
          _ref1 = data.resource.IpPermissionsEgress;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            rule = _ref1[_j];
            rules.push({
              rule: rule,
              out: true
            });
          }
        }
        for (_k = 0, _len2 = rules.length; _k < _len2; _k++) {
          ruleObj = rules[_k];
          rule = ruleObj.rule;
          if (rule.IpRanges[0] === "@") {
            ruleTarget = resolve(MC.extractID(rule.IpRanges));
          } else {
            ruleTarget = new SgTargetModel(rule.IpRanges);
          }
          if (!ruleTarget) {
            continue;
          }
          attr = {
            fromPort: rule.FromPort,
            toPort: rule.ToPort,
            protocol: rule.IpProtocol
          };
          dir = ruleObj.out ? SgRuleSet.DIRECTION.OUT : SgRuleSet.DIRECTION.IN;
          (new SgRuleSet(group, ruleTarget)).addRawRule(group.id, dir, attr);
        }
        return null;
      }
    });
    Design.on(Design.EVENT.Deserialized, Model.updateSgLines);
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/SslCertModel',["constant", "../ComplexResModel", "../ConnectionModel"], function(constant, ComplexResModel, ConnectionModel) {
    var SslCertModel, SslCertUsage;
    SslCertUsage = ConnectionModel.extend({
      type: "SslCertUsage",
      oneToMany: constant.RESTYPE.IAM
    });
    SslCertModel = ComplexResModel.extend({
      type: constant.RESTYPE.IAM,
      defaults: {
        name: "v",
        body: "",
        chain: "",
        key: "",
        arn: "",
        certId: ""
      },
      isVisual: function() {
        return false;
      },
      assignTo: function(target) {
        return new SslCertUsage(this, target);
      },
      serialize: function() {
        var elbModelAry, that, used;
        that = this;
        used = false;
        elbModelAry = Design.modelClassForType(constant.RESTYPE.ELB).allObjects();
        _.each(elbModelAry, function(elbModel) {
          _.each(elbModel.get('listeners'), function(listenerObj) {
            if (listenerObj.sslCert === that) {
              used = true;
            }
            return null;
          });
          return null;
        });
        if (used) {
          return {
            component: {
              uid: this.id,
              type: "AWS.IAM.ServerCertificate",
              name: this.get("name"),
              resource: {
                PrivateKey: this.get("key"),
                CertificateBody: this.get("body"),
                CertificateChain: this.get("chain"),
                ServerCertificateMetadata: {
                  ServerCertificateName: this.get("appName") || this.get("name"),
                  Arn: this.get("arn") || "",
                  ServerCertificateId: this.get("certId") || ""
                }
              }
            }
          };
        }
        return {};
      },
      updateValue: function(certObj) {
        var key, value;
        for (key in certObj) {
          value = certObj[key];
          this.set(key, value);
        }
        return null;
      }
    }, {
      diffJson: function() {},
      handleTypes: constant.RESTYPE.IAM,
      deserialize: function(data) {
        new SslCertModel({
          id: data.uid,
          name: data.name,
          body: data.resource.CertificateBody,
          chain: data.resource.CertificateChain,
          key: data.resource.PrivateKey,
          arn: data.resource.ServerCertificateMetadata.Arn,
          certId: data.resource.ServerCertificateMetadata.ServerCertificateId,
          appName: data.resource.ServerCertificateMetadata.ServerCertificateName
        });
        return null;
      },
      createNew: function(sslCertData) {
        var needCreate, newSslCert, sslCertList;
        newSslCert = null;
        sslCertList = Design.modelClassForType(constant.RESTYPE.IAM).allObjects();
        needCreate = true;
        _.each(sslCertList, function(sslCertModel) {
          if (sslCertModel.get('arn') === sslCertData.get('Arn')) {
            needCreate = false;
            newSslCert = sslCertModel;
          }
          return null;
        });
        if (needCreate) {
          newSslCert = new SslCertModel({
            name: sslCertData.get('Name'),
            body: sslCertData.get('CertificateBody'),
            chain: sslCertData.get('CertificateChain'),
            key: sslCertData.get('PrivateKey'),
            arn: sslCertData.get('Arn'),
            certId: sslCertData.get('id')
          });
        }
        return newSslCert;
      }
    });
    return SslCertModel;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/connection/ElbAsso',["constant", "../ConnectionModel", "i18n!/nls/lang.js", "Design", "component/sgrule/SGRulePopup"], function(constant, ConnectionModel, lang, Design, SGRulePopup) {
    var ElbAmiAsso, ElbSubnetAsso;
    ElbSubnetAsso = ConnectionModel.extend({
      type: "ElbSubnetAsso",
      defaults: {
        lineType: "association",
        deserialized: false
      },
      portDefs: [
        {
          port1: {
            name: "elb-assoc",
            type: constant.RESTYPE.ELB
          },
          port2: {
            name: "subnet-assoc-in",
            type: constant.RESTYPE.SUBNET
          }
        }
      ],
      initialize: function() {
        var az, cn, newSubnet, _i, _len, _ref;
        newSubnet = this.getTarget(constant.RESTYPE.SUBNET);
        az = newSubnet.parent();
        _ref = this.getTarget(constant.RESTYPE.ELB).connections("ElbSubnetAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          if (cn.getTarget(constant.RESTYPE.SUBNET).parent() === az) {
            if (cn.hasAppUpdateRestriction()) {
              this.setDestroyAfterInit();
            } else {
              cn.remove();
            }
          }
        }
        return null;
      },
      hasAppUpdateRestriction: function() {
        var asso, elb, _i, _len, _ref;
        elb = this.getTarget(constant.RESTYPE.ELB);
        if (this.design().modeIsAppEdit()) {
          _ref = elb.connections("ElbSubnetAsso");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            asso = _ref[_i];
            if (asso !== this && asso.get("deserialized")) {
              return false;
            }
          }
          return true;
        }
        return false;
      },
      isRemovable: function() {
        var az, child, childAZ, connected, elb, sb, subnet, _i, _j, _len, _len1, _ref, _ref1;
        if (this.design().modeIsAppEdit()) {
          if (this.hasAppUpdateRestriction()) {
            return {
              error: lang.ide.CVS_MSG_ERR_DEL_ELB_LINE_2
            };
          }
        }
        elb = this.getTarget(constant.RESTYPE.ELB);
        subnet = this.getTarget(constant.RESTYPE.SUBNET);
        az = subnet.parent();
        _ref = elb.connectionTargets("ElbAmiAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          childAZ = child.parent();
          while (childAZ) {
            if (childAZ.type === constant.RESTYPE.AZ) {
              break;
            }
            childAZ = childAZ.parent();
          }
          if (!childAZ) {
            continue;
          }
          if (childAZ === az) {
            connected = true;
            break;
          }
        }
        if (!connected) {
          return true;
        }
        _ref1 = elb.connectionTargets("ElbSubnetAsso");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sb = _ref1[_j];
          if (sb !== subnet && sb.parent() === az) {
            connected = false;
            break;
          }
        }
        if (connected) {
          return {
            error: lang.ide.CVS_MSG_ERR_DEL_ELB_LINE_2
          };
        }
        return true;
      }
    }, {});
    ElbAmiAsso = ConnectionModel.extend({
      type: "ElbAmiAsso",
      defaults: function() {
        return {
          lineType: "elb-sg"
        };
      },
      portDefs: [
        {
          port1: {
            name: "elb-sg-out",
            type: constant.RESTYPE.ELB
          },
          port2: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          }
        }, {
          port1: {
            name: "elb-sg-out",
            type: constant.RESTYPE.ELB
          },
          port2: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          }
        }, {
          port1: {
            name: "elb-sg-out",
            type: constant.RESTYPE.ELB
          },
          port2: {
            name: "launchconfig-sg",
            type: "ExpandedAsg"
          }
        }
      ],
      constructor: function(p1Comp, p2Comp, attr, option) {
        if (p1Comp.design().modeIsAppEdit() && ((p1Comp.type === constant.RESTYPE.LC && p1Comp.get('appId')) || (p2Comp.type === constant.RESTYPE.LC && p2Comp.get('appId')))) {
          notification("error", lang.ide.NOTIFY_MSG_WARN_ASG_CAN_ONLY_CONNECT_TO_ELB_ON_LAUNCH);
          return;
        }
        return ConnectionModel.prototype.constructor.apply(this, arguments);
      },
      initialize: function(attibutes, option) {
        var ami, asg, connectedSbs, elb, foundSubnet, sb, subnet, _i, _j, _len, _len1, _ref, _ref1;
        if (option && option.createByUser) {
          new SGRulePopup(this.id);
        }
        ami = this.getOtherTarget(constant.RESTYPE.ELB);
        elb = this.getTarget(constant.RESTYPE.ELB);
        subnet = ami;
        while (true) {
          subnet = subnet.parent();
          if (!subnet) {
            return;
          }
          if (subnet.type === constant.RESTYPE.SUBNET) {
            break;
          }
        }
        connectedSbs = elb.connectionTargets("ElbSubnetAsso");
        _ref = subnet.parent().children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sb = _ref[_i];
          if (connectedSbs.indexOf(sb) !== -1) {
            foundSubnet = true;
            break;
          }
        }
        if (!foundSubnet) {
          new ElbSubnetAsso(subnet, elb);
        }
        if (ami.type === constant.RESTYPE.LC) {
          _ref1 = ami.parent().get("expandedList");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            asg = _ref1[_j];
            new ElbAmiAsso(asg, elb);
          }
        }
        return null;
      },
      remove: function(option) {
        var asg, eAsg, elb, expAsg, lc, reason, _i, _len, _ref;
        if (option && option.reason.type !== constant.RESTYPE.LC) {
          ConnectionModel.prototype.remove.apply(this, arguments);
          return;
        }
        expAsg = this.getTarget("ExpandedAsg");
        if (expAsg && !expAsg.isRemoved()) {
          elb = this.getTarget(constant.RESTYPE.ELB);
          lc = expAsg.getLc();
          (new ElbAmiAsso(elb, lc)).remove();
          return;
        }
        lc = this.getTarget(constant.RESTYPE.LC);
        if (lc) {
          elb = this.getTarget(constant.RESTYPE.ELB);
          reason = {
            reason: this
          };
          asg = lc.parent();
          _ref = asg.get("expandedList");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            eAsg = _ref[_i];
            (new ElbAmiAsso(elb, eAsg)).remove(reason);
          }
        }
        ConnectionModel.prototype.remove.apply(this, arguments);
        return null;
      },
      serialize: function(components) {
        var elb, i, instance, instanceArray, _i, _len, _ref;
        instance = this.getTarget(constant.RESTYPE.INSTANCE);
        if (!instance) {
          return;
        }
        elb = this.getTarget(constant.RESTYPE.ELB);
        instanceArray = components[elb.id].resource.Instances;
        _ref = instance.getRealGroupMemberIds();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          instanceArray.push({
            InstanceId: this.createRef("InstanceId", i)
          });
        }
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/ElbModel',["Design", "constant", "../ResourceModel", "../ComplexResModel", "./VpcModel", "./SgModel", "./SslCertModel", "../connection/SgAsso", "../connection/ElbAsso"], function(Design, constant, ResourceModel, ComplexResModel, VpcModel, SgModel, SslCertModel, SgAsso) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: function() {
        return {
          x: 0,
          y: 0,
          width: 9,
          height: 9,
          internal: true,
          crossZone: true,
          healthyThreshold: "9",
          unHealthyThreshold: "4",
          healthCheckTarget: "HTTP:80/index.html",
          healthCheckInterval: "30",
          healthCheckTimeout: "5",
          listeners: [
            {
              port: "80",
              protocol: "HTTP",
              instanceProtocol: "HTTP",
              instancePort: "80",
              sslCertName: null
            }
          ],
          AvailabilityZones: [],
          ConnectionDraining: {
            Enabled: true,
            Timeout: 300
          },
          otherPoliciesMap: {}
        };
      },
      type: constant.RESTYPE.ELB,
      newNameTmpl: "load-balancer-",
      initialize: function(attr, option) {
        var SgAssoModel, sg;
        this.draw(true);
        if (option.createByUser) {
          sg = new SgModel({
            name: this.getElbSgName(),
            isElbSg: true,
            description: "Automatically created SG for load-balancer"
          });
          this.__elbSg = sg;
          SgAssoModel = Design.modelClassForType("SgAsso");
          new SgAssoModel(this, sg);
        }
        return null;
      },
      isRemovable: function() {
        var elbsg;
        elbsg = this.getElbSg();
        if (elbsg && elbsg.connections("SgAsso").length > 1) {
          return MC.template.ElbRemoveConfirmation({
            name: this.get("name"),
            sg: elbsg.get("name")
          });
        }
        return true;
      },
      remove: function() {
        if (this.getElbSg()) {
          this.getElbSg().remove();
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      getElbSg: function() {
        if (this.__elbSg) {
          if (this.__elbSg.isRemoved()) {
            this.__elbSg = void 0;
          }
        }
        return this.__elbSg;
      },
      getElbSgName: function() {
        return "elbsg-" + this.get("name");
      },
      setName: function(name) {
        if (this.get("name") === name) {
          return;
        }
        this.set("name", name);
        if (this.getElbSg()) {
          this.getElbSg().set("name", this.getElbSgName());
        }
        if (this.draw) {
          this.draw();
        }
        return null;
      },
      setListener: function(idx, value) {
        var listeners, _ref;
        console.assert(value.port && value.protocol && value.instanceProtocol && value.instancePort, "Invalid parameter for setListener");
        listeners = this.get("listeners");
        if (idx >= listeners.length) {
          listeners.push(value);
        } else {
          if (!listeners[idx]) {
            listeners[idx] = {};
          }
          listeners[idx] = $.extend(listeners[idx], value);
        }
        if (!((_ref = listeners[idx].protocol) === 'HTTPS' || _ref === 'SSL')) {
          listeners[idx].sslCert = null;
        }
        return null;
      },
      removeListener: function(idx) {
        var listeners;
        listeners = this.get("listeners");
        listeners.splice(idx, 1);
        this.set("listeners", listeners);
        return null;
      },
      setSSLCert: function(idx, sslCertId) {
        var listeners, sslCertData;
        if (idx >= 0) {
          listeners = this.get("listeners");
          sslCertData = sslCertCol.get(sslCertId);
          return listeners[idx].sslCert = SslCertModel.createNew(sslCertData);
        }
      },
      removeSSLCert: function(idx) {
        var listeners;
        listeners = this.get("listeners");
        return listeners[idx].sslCert = null;
      },
      getSSLCert: function(idx) {
        var listeners;
        listeners = this.get("listeners");
        return listeners[idx].sslCert;
      },
      getHealthCheckTarget: function() {
        var path, port, protocol, splitIndex, target;
        target = this.attributes.healthCheckTarget;
        splitIndex = target.indexOf(":");
        protocol = target.substring(0, splitIndex);
        target = target.substring(splitIndex + 1);
        port = parseInt(target, 10);
        if (isNaN(port)) {
          port = 80;
        }
        path = target.replace(/[^\/]+\//, "");
        return [protocol, port, path];
      },
      setHealthCheckTarget: function(protocol, port, path) {
        var target;
        target = this.getHealthCheckTarget();
        if (protocol) {
          target[0] = protocol;
        }
        if (port !== void 0) {
          target[1] = port;
        }
        if (path !== void 0) {
          target[2] = path;
        }
        this.set("healthCheckTarget", target[0] + ":" + target[1] + "/" + target[2]);
        return null;
      },
      setInternal: function(isInternal) {
        var line, _i, _len, _ref;
        this.set("internal", !!isInternal);
        this.draw();
        if (isInternal) {
          SgModel = Design.modelClassForType(constant.RESTYPE.SG);
          SgModel.tryDrawLine(this);
        } else {
          _ref = this.connections("SgRuleLine");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            line = _ref[_i];
            line.remove(this);
          }
        }
        return null;
      },
      getCost: function(priceMap, currency) {
        var fee, p, _i, _len, _ref;
        if (!priceMap.elb || !priceMap.elb.types) {
          return null;
        }
        _ref = priceMap.elb.types;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          if (p.unit === "perELBHour") {
            fee = parseFloat(p[currency], 10) || 0;
            break;
          }
        }
        if (fee) {
          return {
            resource: this.get("name"),
            type: constant.RESTYPE.ELB,
            fee: fee * 24 * 30,
            formatedFee: fee + "/hr"
          };
        }
      },
      getAvailabilityZones: function() {
        var azs;
        azs = _.map(this.connectionTargets("ElbSubnetAsso"), function(subnet) {
          return subnet.parent().createRef();
        });
        return _.uniq(azs);
      },
      setPolicyProxyProtocol: function(enable, portAry) {
        var otherPoliciesMap;
        otherPoliciesMap = this.get('otherPoliciesMap');
        if (enable) {
          otherPoliciesMap.EnableProxyProtocol = {
            'PolicyName': 'EnableProxyProtocol',
            'PolicyTypeName': 'ProxyProtocolPolicyType',
            'PolicyAttributes': {
              'ProxyProtocol': true
            },
            'InstancePort': portAry
          };
        } else {
          delete otherPoliciesMap.EnableProxyProtocol;
        }
        return this.set('otherPoliciesMap', otherPoliciesMap);
      },
      serialize: function() {
        var component, hcTarget, id, l, listeners, otherPoliciesAry, otherPoliciesMap, sgs, subnets, _i, _len, _ref;
        hcTarget = this.get("healthCheckTarget");
        if (hcTarget.indexOf("TCP") !== -1 || hcTarget.indexOf("SSL") !== -1) {
          hcTarget = hcTarget.split("/")[0];
        }
        listeners = [];
        _ref = this.get("listeners");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          l = _ref[_i];
          id = "";
          if ((l.protocol === "SSL" || l.protocol === "HTTPS") && l.sslCert) {
            id = l.sslCert.createRef("ServerCertificateMetadata.Arn");
          }
          listeners.push({
            PolicyNames: "",
            Listener: {
              LoadBalancerPort: l.port,
              Protocol: l.protocol,
              InstanceProtocol: l.instanceProtocol,
              InstancePort: l.instancePort,
              SSLCertificateId: id
            }
          });
        }
        sgs = _.map(this.connectionTargets("SgAsso"), function(sg) {
          return sg.createRef("GroupId");
        });
        subnets = _.map(this.connectionTargets("ElbSubnetAsso"), function(sb) {
          return sb.createRef("SubnetId");
        });
        otherPoliciesMap = this.get('otherPoliciesMap');
        otherPoliciesAry = _.map(otherPoliciesMap, function(policyObj) {
          return policyObj;
        });
        if (!otherPoliciesAry) {
          otherPoliciesAry = [];
        }
        component = {
          type: this.type,
          uid: this.id,
          name: this.get("name"),
          resource: {
            AvailabilityZones: [],
            Subnets: subnets,
            Instances: [],
            CrossZoneLoadBalancing: this.get("crossZone"),
            ConnectionDraining: this.get("ConnectionDraining"),
            VpcId: this.getVpcRef(),
            LoadBalancerName: this.get("elbName") || this.get("name"),
            SecurityGroups: sgs,
            Scheme: this.get("internal") ? "internal" : "internet-facing",
            ListenerDescriptions: listeners,
            HealthCheck: {
              Interval: String(this.get("healthCheckInterval")),
              Target: hcTarget,
              Timeout: String(this.get("healthCheckTimeout")),
              HealthyThreshold: String(this.get("healthyThreshold")),
              UnhealthyThreshold: String(this.get("unHealthyThreshold"))
            },
            DNSName: this.get("dnsName") || "",
            Policies: {
              LBCookieStickinessPolicies: [
                {
                  PolicyName: "",
                  CookieExpirationPeriod: ""
                }
              ],
              AppCookieStickinessPolicies: [
                {
                  PolicyName: "",
                  CookieName: ""
                }
              ],
              OtherPolicies: otherPoliciesAry
            },
            BackendServerDescriptions: [
              {
                InstantPort: "",
                PoliciyNames: ""
              }
            ]
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.ELB,
      deserialize: function(data, layout_data, resolve) {
        var ElbAmiAsso, ElbSubnetAsso, ami, attr, elb, idx, instance, l, sb, sg, sslCert, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
        attr = {
          id: data.uid,
          name: data.name,
          appId: data.resource.DNSName,
          parent: resolve(layout_data.groupUId),
          internal: data.resource.Scheme === 'internal',
          crossZone: !!data.resource.CrossZoneLoadBalancing,
          ConnectionDraining: data.resource.ConnectionDraining || {
            Enabled: true,
            Timeout: 300
          },
          listeners: [],
          dnsName: data.resource.DNSName,
          elbName: data.resource.LoadBalancerName,
          healthyThreshold: String(data.resource.HealthCheck.HealthyThreshold),
          unHealthyThreshold: String(data.resource.HealthCheck.UnhealthyThreshold),
          healthCheckTarget: data.resource.HealthCheck.Target,
          healthCheckInterval: String(data.resource.HealthCheck.Interval),
          healthCheckTimeout: String(data.resource.HealthCheck.Timeout),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          otherPoliciesMap: {}
        };
        if (data.resource.Policies) {
          if (data.resource.Policies.OtherPolicies) {
            _.each(data.resource.Policies.OtherPolicies, function(policyObj) {
              attr.otherPoliciesMap[policyObj.PolicyName] = policyObj;
              return null;
            });
          }
        }
        attr.AvailabilityZones = _.map(data.resource.AvailabilityZones || [], function(azRef) {
          if (azRef[0] === "@") {
            return resolve(MC.extractID(azRef)).get("name");
          } else {
            return azRef;
          }
        });
        _ref = data.resource.ListenerDescriptions || [];
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          l = _ref[idx];
          l = l.Listener;
          attr.listeners.push({
            port: l.LoadBalancerPort,
            protocol: l.Protocol,
            instanceProtocol: l.InstanceProtocol,
            instancePort: l.InstancePort
          });
          if (l.SSLCertificateId) {
            sslCert = resolve(MC.extractID(l.SSLCertificateId));
            if (sslCert) {
              attr.listeners[idx].sslCert = sslCert;
            }
          }
        }
        elb = new Model(attr);
        ElbAmiAsso = Design.modelClassForType("ElbAmiAsso");
        ElbSubnetAsso = Design.modelClassForType("ElbSubnetAsso");
        _ref1 = data.resource.SecurityGroups || [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sg = _ref1[_j];
          new SgAsso(elb, resolve(MC.extractID(sg)));
        }
        _ref2 = data.resource.Subnets || [];
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          sb = _ref2[_k];
          new ElbSubnetAsso(elb, resolve(MC.extractID(sb)), {
            deserialized: true
          });
        }
        _ref3 = data.resource.Instances || [];
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          ami = _ref3[_l];
          instance = resolve(MC.extractID(ami.InstanceId));
          if (instance) {
            new ElbAmiAsso(elb, instance);
          }
        }
        return null;
      },
      postDeserialize: function(data, layout_data) {
        var elb, sg, sgName, _i, _len, _ref;
        elb = Design.instance().component(data.uid);
        sgName = elb.getElbSgName();
        _ref = SgModel.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          if (sg.get("name") === sgName) {
            elb.__elbSg = sg;
            sg.setAsElbSg();
            return;
          }
        }
      }
    });
    return Model;
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('workspaces/editor/framework/resource/LcModel',["../ComplexResModel", "./InstanceModel", "Design", "constant", "./VolumeModel", 'i18n!/nls/lang.js', 'CloudResources'], function(ComplexResModel, InstanceModel, Design, constant, VolumeModel, lang, CloudResources) {
    var Model, emptyArray;
    emptyArray = [];
    Model = ComplexResModel.extend({
      offset: {
        x: 2,
        y: 3
      },
      defaults: function() {
        return {
          x: 0,
          y: 0,
          width: 9,
          height: 9,
          imageId: "",
          ebsOptimized: false,
          instanceType: "m1.small",
          monitoring: false,
          userData: "",
          publicIp: false,
          state: null,
          rdSize: 0,
          rdIops: "",
          rdType: 'gp2'
        };
      },
      type: constant.RESTYPE.LC,
      newNameTmpl: "launch-config-",
      __brothers: [],
      __bigBrother: null,
      __isClone: false,
      constructor: function(attr, option) {
        if (option && option.createByUser && attr.parent.get("lc")) {
          return;
        }
        if (option && option.clone) {
          this.__isClone = true;
        }
        return ComplexResModel.call(this, attr, option);
      },
      privacyAttrs: ['__parent', '__connections', 'x', 'y'],
      clone: function() {
        var conn, connClass, dolly, isRun, target, _i, _len, _ref;
        isRun = !!this.get('appId');
        dolly = new Model(null, {
          clone: true
        });
        this.addBrother(dolly);
        _ref = this.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          conn = _ref[_i];
          if (conn.type === 'ElbAmiAsso') {
            continue;
          }
          connClass = Design.modelClassForType(conn.type);
          target = conn.getOtherTarget(this.type);
          new connClass(dolly, target);
        }
        return dolly;
      },
      syncBorthersConn: function(conn, add) {
        var c, connClass, otherTarget, syncTarget, target, targetConn, _i, _len, _results;
        if (conn.type === 'ElbAmiAsso') {
          return;
        }
        if (conn.type === 'SgRuleLine') {
          return;
        }
        syncTarget = [];
        if (this.isClone()) {
          syncTarget.push(this.getBigBrother());
          syncTarget = syncTarget.concat(_.without(this.getBigBrother().__brothers, this));
        } else {
          syncTarget = syncTarget.concat(this.__brothers);
        }
        connClass = Design.modelClassForType(conn.type);
        otherTarget = conn.getOtherTarget(this.type);
        _results = [];
        for (_i = 0, _len = syncTarget.length; _i < _len; _i++) {
          target = syncTarget[_i];
          if (add) {
            _results.push(new connClass(target, otherTarget));
          } else {
            targetConn = target.connections(conn.type);
            _results.push((function() {
              var _j, _len1, _results1;
              _results1 = [];
              for (_j = 0, _len1 = targetConn.length; _j < _len1; _j++) {
                c = targetConn[_j];
                if (c.getOtherTarget(this.type === otherTarget)) {
                  _results1.push(c.remove());
                } else {
                  _results1.push(void 0);
                }
              }
              return _results1;
            }).call(this));
          }
        }
        return _results;
      },
      getBigBrother: function() {
        return this.__bigBrother;
      },
      isClone: function() {
        return this.__isClone;
      },
      addBrother: function(brother) {
        this.__brothers.push(brother);
        brother.__bigBrother = this;
        return brother.listenTo(this, 'all', function() {
          if (/^change/.test(arguments[0])) {
            return brother.trigger.apply(brother, arguments);
          }
        });
      },
      removeBrother: function(brother) {
        var idx;
        idx = this.__brothers.indexOf(brother);
        if (idx > -1) {
          this.__brothers.splice(idx, 1);
        }
        return brother.stopListening();
      },
      getContext: function(attr) {
        if (this.__bigBrother && __indexOf.call(this.privacyAttrs, attr) < 0 && !(_.intersection(_.keys(this.privacyAttrs), attr)).length) {
          return this.__bigBrother;
        }
        return this;
      },
      set: function(attr) {
        var context;
        context = this.getContext(attr);
        return ComplexResModel.prototype.set.apply(context, arguments);
      },
      get: function(attr) {
        var context, _ref, _ref1;
        context = this.getContext(attr);
        if (attr === 'x') {
          return ((_ref = this.parent()) != null ? _ref.x() : void 0) + this.offset.x;
        } else if (attr === 'y') {
          return ((_ref1 = this.parent()) != null ? _ref1.y() : void 0) + this.offset.y;
        } else {
          return ComplexResModel.prototype.get.apply(context, arguments);
        }
      },
      toJSON: function() {
        return ComplexResModel.prototype.toJSON.apply(this.__bigBrother || this);
      },
      draw: function(isCreate) {
        var brother, context, _i, _len, _ref, _results;
        if (isCreate) {
          return ComplexResModel.prototype.draw.apply(this, arguments);
        } else {
          context = this.getBigBrother() || this;
          ComplexResModel.prototype.draw.apply(context, arguments);
          _ref = context.__brothers;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            brother = _ref[_i];
            _results.push(ComplexResModel.prototype.draw.apply(brother, arguments));
          }
          return _results;
        }
      },
      initialize: function(attr, option) {
        var KpModel, SgAsso, defaultSg;
        this.__brothers = [];
        if (!option || !option.clone) {
          this.draw(true);
        }
        if (option && option.createByUser) {
          this.initInstanceType();
          KpModel = Design.modelClassForType(constant.RESTYPE.KP);
          KpModel.getDefaultKP().assignTo(this);
          defaultSg = Design.modelClassForType(constant.RESTYPE.SG).getDefaultSg();
          SgAsso = Design.modelClassForType("SgAsso");
          new SgAsso(defaultSg, this);
        }
        if (!this.get("rdSize")) {
          this.set("rdSize", this.getAmiRootDeviceVolumeSize());
        }
        return null;
      },
      getNewName: function(base) {
        var id, myKinds, nameMap, newName, resource_list, rl;
        if (!this.newNameTmpl) {
          newName = this.defaults ? this.defaults.name : void 0;
          return newName || "";
        }
        if (base === void 0) {
          myKinds = _.filter(Design.modelClassForType(this.type).allObjects(), function(m) {
            return m.getBigBrother() === null;
          });
          base = myKinds.length;
        }
        nameMap = {};
        this.design().eachComponent(function(comp) {
          if (comp.get("name")) {
            nameMap[comp.get("name")] = true;
          }
          return null;
        });
        if (Design.instance().modeIsAppEdit()) {
          resource_list = CloudResources(constant.RESTYPE.LC, Design.instance().region()).toJSON();
          for (id in resource_list) {
            rl = resource_list[id];
            if (rl.LaunchConfigurationName) {
              nameMap[_.first(rl.LaunchConfigurationName.split('---'))] = true;
            }
          }
        }
        while (true) {
          newName = this.newNameTmpl + base;
          if (nameMap[newName]) {
            base += 1;
          } else {
            break;
          }
        }
        return newName;
      },
      isRemovable: function() {
        var state;
        if (this.design().modeIsAppEdit() && this.get("appId")) {
          return {
            error: lang.ide.CVS_MSG_ERR_DEL_LC
          };
        }
        state = this.get("state");
        if ((state && _.isArray(state) && state.length > 0) || ($('#state-editor-model').is(':visible') && $('#state-editor-model .state-list .state-item').length >= 1)) {
          return MC.template.NodeStateRemoveConfirmation({
            name: this.get("name")
          });
        }
        if (this.__brothers.length > 0 || this.isClone()) {
          return true;
        }
        return sprintf(lang.ide.CVS_CFM_DEL_LC, this.get('name'));
      },
      isDefaultTenancy: function() {
        return true;
      },
      groupMembers: function() {
        var amis, i, resource, resource_list, _i, _len, _ref, _ref1;
        resource_list = CloudResources(constant.RESTYPE.ASG, Design.instance().region());
        if (!resource_list) {
          return [];
        }
        resource = (_ref = resource_list.get(this.parent().get("appId"))) != null ? _ref.toJSON() : void 0;
        if (resource && resource.Instances && resource.Instances.length) {
          amis = [];
          _ref1 = resource.Instances;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            i = _ref1[_i];
            amis.push({
              id: i.InstanceId,
              appId: i.InstanceId,
              state: i.HealthStatus
            });
          }
        }
        return amis || [];
      },
      remove: function() {
        var brother, i, k, v, _i, _j, _len, _len1, _ref, _ref1, _ref2;
        if (this.__bigBrother) {
          this.__bigBrother.removeBrother(this);
        } else if (this.__brothers.length) {
          _ref = this.attributes;
          for (k in _ref) {
            v = _ref[k];
            if (k !== '__parent' && k !== '__connections') {
              this.__brothers[0].attributes[k] = v;
            }
          }
          this.__brothers[0].__bigBrother = null;
          this.__brothers[0].__brothers = [];
          this.__brothers[0].__isClone = false;
          _ref1 = this.__brothers;
          for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
            brother = _ref1[i];
            if (i !== 0) {
              brother.__bigBrother = this.__brothers[0];
              this.__brothers[0].__brothers.push(brother);
            }
          }
        } else {
          _ref2 = (this.get("volumeList") || emptyArray).slice(0);
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            v = _ref2[_j];
            v.remove();
          }
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      connect: function(cn) {
        if (this.parent() && cn.type === "SgRuleLine") {
          this.parent().updateExpandedAsgSgLine(cn.getOtherTarget(this));
        }
        this.syncBorthersConn(cn, true);
        return null;
      },
      disconnect: function(cn) {
        if (this.parent()) {
          if (cn.type === "ElbAmiAsso") {

          } else if (cn.type === "SgRuleLine") {
            this.parent().updateExpandedAsgSgLine(cn.getOtherTarget(this), true);
          }
        }
        this.syncBorthersConn(cn);
        return null;
      },
      getStateData: InstanceModel.prototype.getStateData,
      setStateData: InstanceModel.prototype.setStateData,
      setKey: InstanceModel.prototype.setKey,
      getKeyName: InstanceModel.prototype.getKeyName,
      isDefaultKey: InstanceModel.prototype.isDefaultKey,
      isNoKey: InstanceModel.prototype.isNoKey,
      setAmi: InstanceModel.prototype.setAmi,
      getAmi: InstanceModel.prototype.getAmi,
      getOSFamily: InstanceModel.prototype.getOSFamily,
      setInstanceType: InstanceModel.prototype.setInstanceType,
      initInstanceType: InstanceModel.prototype.initInstanceType,
      isEbsOptimizedEnabled: InstanceModel.prototype.isEbsOptimizedEnabled,
      getBlockDeviceMapping: InstanceModel.prototype.getBlockDeviceMapping,
      getAmiRootDevice: InstanceModel.prototype.getAmiRootDevice,
      getAmiRootDeviceName: InstanceModel.prototype.getAmiRootDeviceName,
      getAmiRootDeviceVolumeSize: InstanceModel.prototype.getAmiRootDeviceVolumeSize,
      getInstanceType: InstanceModel.prototype.getInstanceType,
      getInstanceTypeConfig: InstanceModel.prototype.getInstanceTypeConfig,
      getInstanceTypeList: InstanceModel.prototype.getInstanceTypeList,
      serialize: function() {
        var ami, blockDevice, component, layout, sgarray, vd, volume, _i, _len, _ref;
        if (this.isClone()) {
          return;
        }
        ami = this.getAmi() || this.get("cachedAmi");
        layout = this.generateLayout();
        if (ami) {
          layout.osType = ami.osType;
          layout.architecture = ami.architecture;
          layout.rootDeviceType = ami.rootDeviceType;
        }
        sgarray = _.map(this.connectionTargets("SgAsso"), function(sg) {
          return sg.createRef("GroupId");
        });
        blockDevice = this.getBlockDeviceMapping();
        _ref = this.get("volumeList") || emptyArray;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          volume = _ref[_i];
          vd = {
            DeviceName: volume.get("name"),
            Ebs: {
              VolumeSize: volume.get("volumeSize"),
              VolumeType: volume.get("volumeType")
            }
          };
          if (volume.get("volumeType") === "io1") {
            vd.Ebs.Iops = volume.get("iops");
          }
          if (volume.get("snapshotId")) {
            vd.Ebs.SnapshotId = volume.get("snapshotId");
          }
          blockDevice.push(vd);
        }
        component = {
          type: this.type,
          uid: this.id,
          name: this.get("name"),
          state: this.get("state"),
          resource: {
            UserData: this.get("userData"),
            LaunchConfigurationARN: this.get("appId"),
            InstanceMonitoring: this.get("monitoring"),
            ImageId: this.get("imageId"),
            KeyName: this.get("keyName"),
            EbsOptimized: this.isEbsOptimizedEnabled() ? this.get("ebsOptimized") : false,
            BlockDeviceMapping: blockDevice,
            SecurityGroups: sgarray,
            LaunchConfigurationName: this.get("configName") || this.get("name"),
            InstanceType: this.get("instanceType"),
            AssociatePublicIpAddress: this.get("publicIp")
          }
        };
        return {
          component: component,
          layout: layout
        };
      }
    }, {
      handleTypes: constant.RESTYPE.LC,
      resolveFirst: true,
      preDeserialize: function(data, layout_data) {
        var attr;
        if (!(_.isArray(data.state) && data.state.length)) {
          data.state = null;
        }
        attr = {
          id: data.uid,
          name: data.name,
          state: data.state,
          appId: data.resource.LaunchConfigurationARN,
          imageId: data.resource.ImageId,
          ebsOptimized: data.resource.EbsOptimized,
          instanceType: data.resource.InstanceType,
          monitoring: data.resource.InstanceMonitoring,
          userData: data.resource.UserData,
          publicIp: data.resource.AssociatePublicIpAddress,
          configName: data.resource.LaunchConfigurationName,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        };
        if (layout_data.osType && layout_data.architecture && layout_data.rootDeviceType) {
          attr.cachedAmi = {
            osType: layout_data.osType,
            architecture: layout_data.architecture,
            rootDeviceType: layout_data.rootDeviceType
          };
        }
        new Model(attr);
        return null;
      },
      deserialize: function(data, layout_data, resolve) {
        var KP, SgAsso, model, rd, sg, volume, _attr, _i, _j, _len, _len1, _ref, _ref1;
        model = resolve(data.uid);
        rd = model.getAmiRootDevice();
        _ref = data.resource.BlockDeviceMapping || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          volume = _ref[_i];
          if (rd && volume.DeviceName === rd.DeviceName) {
            model.set("rdSize", volume.Ebs.VolumeSize);
            model.set("rdIops", volume.Ebs.Iops);
            model.set("rdType", volume.Ebs.VolumeType);
          } else {
            _attr = {
              name: volume.DeviceName,
              snapshotId: volume.Ebs.SnapshotId,
              volumeSize: volume.Ebs.VolumeSize,
              volumeType: volume.Ebs.VolumeType,
              iops: volume.Ebs.Iops,
              owner: model
            };
            new VolumeModel(_attr, {
              noNeedGenName: true
            });
          }
        }
        SgAsso = Design.modelClassForType("SgAsso");
        _ref1 = data.resource.SecurityGroups || [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sg = _ref1[_j];
          new SgAsso(model, resolve(MC.extractID(sg)));
        }
        KP = resolve(MC.extractID(data.resource.KeyName));
        if (KP) {
          KP.assignTo(model);
        } else {
          model.set('keyName', data.resource.KeyName);
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/KeypairModel',["constant", "../ComplexResModel", "../ConnectionModel"], function(constant, ComplexResModel, ConnectionModel) {
    var KeypairModel, KeypairUsage;
    KeypairUsage = ConnectionModel.extend({
      type: "KeypairUsage",
      oneToMany: constant.RESTYPE.KP,
      serialize: function(components) {
        var groupMembers, kp, member, otherTarget, otherTargetComp, ref, _i, _len;
        kp = this.getTarget(constant.RESTYPE.KP);
        if (kp) {
          otherTarget = this.getOtherTarget(kp);
          otherTargetComp = components[otherTarget.id];
          if (!otherTargetComp) {
            return;
          }
          ref = kp.createRef("KeyName");
          otherTargetComp.resource.KeyName = ref;
          groupMembers = otherTarget.groupMembers ? otherTarget.groupMembers() : [];
          for (_i = 0, _len = groupMembers.length; _i < _len; _i++) {
            member = groupMembers[_i];
            if (components[member.id]) {
              components[member.id].resource.KeyName = ref;
            }
          }
        }
        return null;
      }
    });
    KeypairModel = ComplexResModel.extend({
      type: constant.RESTYPE.KP,
      defaults: {
        fingerprint: "",
        isSet: false
      },
      isVisual: function() {
        return false;
      },
      isDefault: function() {
        return this.get('name') === 'DefaultKP';
      },
      remove: function() {
        var defaultKp, i, _i, _len, _ref;
        defaultKp = KeypairModel.getDefaultKP();
        _ref = this.connectionTargets("KeypairUsage");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          new KeypairUsage(defaultKp, i);
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      assignTo: function(target) {
        return new KeypairUsage(this, target);
      },
      dissociate: function(target) {
        var conns;
        conns = this.connections();
        return _.each(conns, function(c) {
          if (c.getOtherTarget(constant.RESTYPE.KP) === target) {
            return c.remove();
          }
        });
      },
      isSet: function() {
        return this.get('appId') && this.get('fingerprint');
      },
      getKPList: function() {
        var kp, kps, _i, _len, _ref;
        kps = [];
        _ref = KeypairModel.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          kp = _ref[_i];
          kps.push({
            id: kp.id,
            name: kp.get("name"),
            selected: kp === this,
            using: kp.connections("KeypairUsage").length > 1
          });
        }
        return _.sortBy(kps, function(a, b) {
          if (a.name === "DefaultKP") {
            return -1;
          }
          if (b.name === "DefaultKP") {
            return 1;
          }
          if (a.name > b.name) {
            return 1;
          }
          if (a.name === b.name) {
            return 0;
          }
          if (a.name < b.name) {
            return -1;
          }
        });
      },
      serialize: function() {
        return {
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              KeyFingerprint: this.get("fingerprint") || '',
              KeyName: this.get("appId")
            }
          }
        };
      }
    }, {
      getDefaultKP: function() {
        return _.find(KeypairModel.allObjects(), function(obj) {
          return obj.get("name") === "DefaultKP";
        });
      },
      setDefaultKP: function(keyName, fingerprint) {
        var defaultKP;
        defaultKP = _.find(KeypairModel.allObjects(), function(obj) {
          return obj.get("name") === "DefaultKP";
        });
        defaultKP.set('appId', keyName || '');
        defaultKP.set('fingerprint', fingerprint || '');
        return defaultKP.set('isSet', true);
      },
      diffJson: function() {},
      handleTypes: constant.RESTYPE.KP,
      deserialize: function(data, layout_data, resolve) {
        new KeypairModel({
          id: data.uid,
          name: data.name,
          appId: data.resource.KeyName,
          fingerprint: data.resource.KeyFingerprint
        });
        return null;
      }
    });
    return KeypairModel;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/connection/Route',["constant", "../ConnectionModel"], function(constant, ConnectionModel) {
    var C;
    C = ConnectionModel.extend({
      type: "RTB_Route",
      defaults: function() {
        return {
          lineType: "rtb-target",
          dashLine: true,
          routes: []
        };
      },
      initialize: function(attr, option) {
        var igw;
        igw = this.getTarget(constant.RESTYPE.IGW);
        if (igw && !attr.routes) {
          this.get("routes").push("0.0.0.0/0");
        }
        return null;
      },
      addRoute: function(route) {
        var idx, routes;
        routes = this.get("routes");
        idx = _.indexOf(routes, route);
        if (idx !== -1) {
          return false;
        }
        routes.push(route);
        this.set("routes", routes);
        return true;
      },
      removeRoute: function(route) {
        var idx, routes;
        routes = this.get("routes");
        idx = _.indexOf(routes, route);
        if (idx !== -1) {
          return false;
        }
        routes.splice(idx, 1);
        this.set("routes", routes);
        return true;
      },
      setPropagate: function(propagate) {
        console.assert((this.port1Comp().type === constant.RESTYPE.VGW) || (this.port2Comp().type === constant.RESTYPE.VGW), "Propagation can only be set to VPN<==>RTB connection.");
        return this.set("propagate", propagate);
      },
      serialize: function(components) {
        var TYPE, d, otherTarget, r, r_temp, rtb, rtb_data, _i, _len, _ref;
        rtb = this.getTarget(constant.RESTYPE.RT);
        otherTarget = this.getOtherTarget(rtb);
        rtb_data = components[rtb.id];
        if (this.get("propagate")) {
          rtb_data.resource.PropagatingVgwSet.push(otherTarget.createRef("VpnGatewayId"));
        }
        r_temp = {
          Origin: "",
          InstanceId: "",
          NetworkInterfaceId: "",
          GatewayId: ""
        };
        TYPE = constant.RESTYPE;
        switch (otherTarget.type) {
          case TYPE.ENI:
            r_temp.NetworkInterfaceId = otherTarget.createRef("NetworkInterfaceId");
            break;
          case TYPE.IGW:
            r_temp.GatewayId = otherTarget.createRef("InternetGatewayId");
            break;
          case TYPE.VGW:
            r_temp.GatewayId = otherTarget.createRef("VpnGatewayId");
            break;
          case TYPE.INSTANCE:
            r_temp.NetworkInterfaceId = otherTarget.getEmbedEni().createRef("NetworkInterfaceId");
        }
        _ref = this.get("routes");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          d = {
            "DestinationCidrBlock": r
          };
          rtb_data.resource.RouteSet.push($.extend(d, r_temp));
        }
        return null;
      },
      portDefs: [
        {
          port1: {
            name: "igw-tgt",
            type: constant.RESTYPE.IGW
          },
          port2: {
            name: "rtb-tgt",
            type: constant.RESTYPE.RT
          }
        }, {
          port1: {
            name: "instance-rtb",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "rtb-tgt",
            type: constant.RESTYPE.RT
          }
        }, {
          port1: {
            name: "eni-rtb",
            type: constant.RESTYPE.ENI
          },
          port2: {
            name: "rtb-tgt",
            type: constant.RESTYPE.RT
          }
        }, {
          port1: {
            name: "vgw-tgt",
            type: constant.RESTYPE.VGW
          },
          port2: {
            name: "rtb-tgt",
            type: constant.RESTYPE.RT
          }
        }
      ]
    });
    return C;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/connection/RtbAsso',["constant", "../ConnectionModel"], function(constant, ConnectionModel) {
    var C;
    C = ConnectionModel.extend({
      type: "RTB_Asso",
      oneToMany: constant.RESTYPE.RT,
      defaults: {
        lineType: "association",
        implicit: false
      },
      portDefs: {
        port1: {
          name: "subnet-assoc-out",
          type: constant.RESTYPE.SUBNET
        },
        port2: {
          name: "rtb-src",
          type: constant.RESTYPE.RT
        }
      },
      serialize: function(components) {
        var rtb, rtb_data, sb;
        if (this.get("implicit")) {
          return;
        }
        sb = this.getTarget(constant.RESTYPE.SUBNET);
        rtb = this.getTarget(constant.RESTYPE.RT);
        rtb_data = components[rtb.id];
        rtb_data.resource.AssociationSet.push({
          SubnetId: sb.createRef("SubnetId"),
          RouteTableAssociationId: this.get("assoId") || "",
          Main: false
        });
        return null;
      },
      remove: function() {
        var RtbModel, newRtb, oldRtb, subnet, subnetRtbAsso;
        subnet = this.getTarget(constant.RESTYPE.SUBNET);
        if (!subnet.isRemoved()) {
          subnetRtbAsso = subnet.connections("RTB_Asso");
          if (subnetRtbAsso.length === 0 || (subnetRtbAsso.length === 1 && subnetRtbAsso[0] === this)) {
            oldRtb = this.getTarget(constant.RESTYPE.RT);
            if (oldRtb.get("main")) {
              this.set("implicit", true);
              return;
            }
            ConnectionModel.prototype.remove.apply(this, arguments);
            RtbModel = Design.modelClassForType(constant.RESTYPE.RT);
            newRtb = RtbModel.getMainRouteTable();
            new C(subnet, newRtb, {
              implicit: true
            });
            return;
          }
        }
        ConnectionModel.prototype.remove.apply(this, arguments);
        return null;
      }
    });
    return C;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/RtbModel',["../ComplexResModel", "Design", "../connection/Route", "../connection/RtbAsso", "./VpcModel", "constant", "i18n!/nls/lang.js"], function(ComplexResModel, Design, Route, RtbAsso, VpcModel, constant, lang) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: {
        main: false,
        x: 50,
        y: 5,
        width: 8,
        height: 8,
        implicit: false
      },
      type: constant.RESTYPE.RT,
      newNameTmpl: "RT-",
      initialize: function() {
        this.draw(true);
        return null;
      },
      isRemovable: function() {
        if (this.get("main")) {
          return {
            error: sprintf(lang.ide.CVS_MSG_ERR_DEL_MAIN_RT, this.get("name"))
          };
        }
        return true;
      },
      setMain: function() {
        var asso, old_main_rtb, sb, subnets, _i, _len, _results;
        if (this.get("main")) {
          return;
        }
        old_main_rtb = Model.getMainRouteTable();
        old_main_rtb.set("main", false);
        old_main_rtb.draw();
        this.set("main", true);
        this.draw();
        subnets = Design.modelClassForType(constant.RESTYPE.SUBNET).allObjects();
        _results = [];
        for (_i = 0, _len = subnets.length; _i < _len; _i++) {
          sb = subnets[_i];
          asso = sb.connections("RTB_Asso")[0];
          console.assert(asso, "Subnet should at least associate to one RouteTable");
          if (asso.get("implicit")) {
            _results.push(new RtbAsso(this, sb, {
              implicit: true
            }));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },
      addRoute: function(targetId, r, propagating) {
        var component, connection;
        component = Design.instance().component(targetId);
        if (!component) {
          return;
        }
        if (component.type === constant.RESTYPE.ENI && component.embedInstance()) {
          component = component.embedInstance();
        }
        connection = new Route(this, component);
        connection.addRoute(r);
        if (propagating !== void 0) {
          connection.setPropagate(propagating);
        }
        return null;
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            PropagatingVgwSet: [],
            RouteTableId: this.get("appId"),
            VpcId: this.parent().createRef("VpcId"),
            AssociationSet: [],
            RouteSet: [
              {
                Origin: "CreateRouteTable",
                DestinationCidrBlock: this.parent().get("cidr"),
                InstanceId: "",
                NetworkInterfaceId: "",
                GatewayId: "local"
              }
            ]
          }
        };
        if (this.get("main")) {
          component.resource.AssociationSet.push({
            Main: "true",
            RouteTableAssociationId: "",
            SubnetId: ""
          });
        }
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      getMainRouteTable: function() {
        return _.find(Model.allObjects(), function(obj) {
          return obj.get("main");
        });
      },
      handleTypes: constant.RESTYPE.RT,
      resolveFirst: true,
      preDeserialize: function(data, layout_data) {
        var asso_main, rtb;
        if (data.resource.AssociationSet) {
          if (data.resource.AssociationSet[0]) {
            asso_main = "" + data.resource.AssociationSet[0].Main === "true";
          }
        }
        rtb = new Model({
          id: data.uid,
          appId: data.resource.RouteTableId,
          name: data.name,
          main: !!asso_main,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        return null;
      },
      deserialize: function(data, layout_data, resolve) {
        var rtb, vpc;
        rtb = resolve(data.uid);
        vpc = resolve(layout_data.groupUId);
        if (!vpc) {
          vpc = VpcModel.theVPC();
        }
        vpc.addChild(rtb);
        return null;
      },
      postDeserialize: function(data, layout_data) {
        var design, i, id, propagateMap, r, ref, routes, rtb, _i, _j, _len, _len1, _ref, _ref1;
        design = Design.instance();
        rtb = design.component(data.uid);
        _ref = data.resource.AssociationSet || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          if (!r.Main && r.SubnetId) {
            new RtbAsso(rtb, design.component(MC.extractID(r.SubnetId)), {
              implicit: false,
              assoId: r.RouteTableAssociationId
            });
          }
        }
        routes = data.resource.RouteSet;
        if (routes && routes.length > 1) {
          propagateMap = {};
          _ref1 = data.resource.PropagatingVgwSet || [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            ref = _ref1[_j];
            propagateMap[MC.extractID(ref)] = true;
          }
          i = 0;
          while (i < routes.length) {
            r = routes[i];
            if (r.GatewayId !== "local") {
              id = MC.extractID(r.GatewayId || r.InstanceId || r.NetworkInterfaceId);
              rtb.addRoute(id, r.DestinationCidrBlock, propagateMap[id]);
            }
            ++i;
          }
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('workspaces/editor/framework/resource/SubnetModel',["constant", "Design", "../GroupModel", "../connection/RtbAsso", "i18n!/nls/lang.js"], function(constant, Design, GroupModel, RtbAsso, lang) {
    var Model;
    Model = GroupModel.extend({
      type: constant.RESTYPE.SUBNET,
      newNameTmpl: "subnet",
      defaults: {
        x: 2,
        y: 2,
        width: 17,
        height: 17,
        cidr: ""
      },
      initialize: function(attributes, option) {
        var Acl, AclAsso, RtbModel, defaultAcl;
        if (!this.attributes.cidr) {
          this.attributes.cidr = this.generateCidr();
        }
        this.draw(true);
        RtbModel = Design.modelClassForType(constant.RESTYPE.RT);
        new RtbAsso(this, RtbModel.getMainRouteTable(), {
          implicit: true
        });
        Acl = Design.modelClassForType(constant.RESTYPE.ACL);
        defaultAcl = Acl.getDefaultAcl();
        if (defaultAcl) {
          AclAsso = Design.modelClassForType("AclAsso");
          new AclAsso(this, defaultAcl);
        }
        return null;
      },
      setCidr: function(cidr) {
        var validCIDR;
        validCIDR = MC.getValidCIDR(cidr);
        this.set("cidr", validCIDR);
        this.draw();
        return null;
      },
      setAcl: function(uid) {
        var AclAsso;
        AclAsso = Design.modelClassForType("AclAsso");
        new AclAsso(this, Design.instance().component(uid));
        return null;
      },
      isReparentable: function(newParent) {
        var attach, child, _i, _j, _len, _len1, _ref, _ref1;
        _ref = this.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (child.type === constant.RESTYPE.INSTANCE || child.type === constant.RESTYPE.ENI) {
            _ref1 = child.connectionTargets("EniAttachment");
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              attach = _ref1[_j];
              if (attach.parent() !== this) {
                return lang.ide.CVS_MSG_ERR_MOVE_ATTACHED_ENI;
              }
            }
          }
          if (child.type === constant.RESTYPE.ASG || child.type === "ExpandedAsg") {
            if (child.type === "ExpandedAsg") {
              child = child.get("originalAsg");
            }
            if (child.getExpandAzs().indexOf(newParent) !== -1) {
              return sprintf(lang.ide.CVS_MSG_ERR_DROP_ASG, child.get("name"), newParent.get("name"));
            }
          }
        }
        return true;
      },
      isRemovable: function() {
        var ami, az, childAZ, cn, _i, _j, _len, _len1, _ref, _ref1;
        az = this.parent();
        _ref = this.connections("ElbSubnetAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          if (cn.isRemovable() !== true) {
            if (!this.design().modeIsStack()) {
              return {
                error: lang.ide.CVS_MSG_ERR_DEL_LINKED_ELB
              };
            }
            _ref1 = cn.getOtherTarget(this).connectionTargets("ElbAmiAsso");
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              ami = _ref1[_j];
              if (ami.parent() === this || ami.parent().parent() === this) {
                continue;
              }
              childAZ = ami.parent();
              while (childAZ) {
                if (childAZ === az) {
                  return {
                    error: lang.ide.CVS_MSG_ERR_DEL_LINKED_ELB
                  };
                }
                childAZ = childAZ.parent();
              }
            }
          }
        }
        return true;
      },
      onParentChanged: function() {
        var elbAsso, sb, _i, _len, _ref;
        elbAsso = this.connections("ElbSubnetAsso")[0];
        if (!elbAsso) {
          return;
        }
        _ref = elbAsso.getTarget(constant.RESTYPE.ELB).connectionTargets("ElbSubnetAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sb = _ref[_i];
          if (sb.parent() === this.parent()) {
            elbAsso.remove();
            return;
          }
        }
        return null;
      },
      isValidCidr: function(cidr) {
        if (!Model.isInVPCCIDR(this.parent().parent().get("cidr"), cidr)) {
          return {
            error: "" + cidr + " conflicts with VPC CIDR.",
            detail: "Subnet CIDR block should be a subset of VPC's."
          };
        }
        if (this.isCidrConfilctWithSubnets(cidr)) {
          return {
            error: "" + cidr + " conflicts with other subnet.",
            detail: "Please choose a CIDR block not conflicting with existing subnet."
          };
        }
        if (!this.isCidrEnoughForIps(cidr)) {
          return {
            error: "" + cidr + " has not enough IP for the ENIs in this subnet."
          };
        }
        return true;
      },
      isCidrConfilctWithSubnets: function(cidr) {
        var conflict, sb, _i, _len, _ref;
        cidr = cidr || this.get("cidr");
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sb = _ref[_i];
          if (sb !== this) {
            conflict = Model.isCidrConflict(sb.get("cidr"), cidr);
            if (conflict) {
              return true;
            }
          }
        }
        return false;
      },
      isCidrEnoughForIps: function(cidr) {
        var child, eni, ipCount, maxIpCount, _i, _len, _ref;
        cidr = cidr || this.get("cidr");
        ipCount = 0;
        _ref = this.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (child.type === constant.RESTYPE.INSTANCE) {
            eni = child.getEmbedEni();
          } else if (child.type === constant.RESTYPE.ENI) {
            eni = child;
          } else {
            continue;
          }
          ipCount += eni.get("ips").length;
        }
        maxIpCount = Design.modelClassForType(constant.RESTYPE.ENI).getAvailableIPCountInCIDR(cidr);
        return maxIpCount >= ipCount;
      },
      generateCidr: function() {
        var comp, currentSubnetNum, currentVPCCIDR, maxSubnetNum, resultSubnetNum, subnetCIDR, subnetCIDRAry, subnetCIDRIPAry, subnetCIDRIPStr, subnetCIDRSuffix, vpcCIDRAry, vpcCIDRIPStr, vpcCIDRIPStrAry, vpcCIDRSuffix, _i, _len, _ref;
        currentVPCCIDR = this.parent().parent().get("cidr");
        vpcCIDRAry = currentVPCCIDR.split('/');
        vpcCIDRIPStr = vpcCIDRAry[0];
        vpcCIDRIPStrAry = vpcCIDRIPStr.split('.');
        vpcCIDRSuffix = Number(vpcCIDRAry[1]);
        if (vpcCIDRSuffix !== 16) {
          return "";
        }
        maxSubnetNum = -1;
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          comp = _ref[_i];
          subnetCIDR = comp.get("cidr");
          subnetCIDRAry = subnetCIDR.split('/');
          subnetCIDRIPStr = subnetCIDRAry[0];
          subnetCIDRSuffix = Number(subnetCIDRAry[1]);
          subnetCIDRIPAry = subnetCIDRIPStr.split('.');
          currentSubnetNum = Number(subnetCIDRIPAry[2]);
          if (maxSubnetNum < currentSubnetNum) {
            maxSubnetNum = currentSubnetNum;
          }
        }
        resultSubnetNum = maxSubnetNum + 1;
        if (resultSubnetNum > 255) {
          return "";
        }
        vpcCIDRIPStrAry[2] = String(resultSubnetNum);
        return vpcCIDRIPStrAry.join('.') + '/24';
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            AvailabilityZone: this.parent().createRef(),
            VpcId: this.parent().parent().createRef("VpcId"),
            SubnetId: this.get("appId"),
            CidrBlock: this.get("cidr")
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.SUBNET,
      diffJson: function() {},
      genCIDRPrefixSuffix: function(subnetCIDR) {
        var cutAry, ipAddr, ipAddrAry, resultPrefix, resultSuffix, suffix;
        cutAry = subnetCIDR.split('/');
        ipAddr = cutAry[0];
        suffix = Number(cutAry[1]);
        ipAddrAry = ipAddr.split('.');
        resultPrefix = '';
        resultSuffix = '';
        if (suffix > 23) {
          resultPrefix = ipAddrAry[0] + '.' + ipAddrAry[1] + '.' + ipAddrAry[2] + '.';
          resultSuffix = 'x';
        } else {
          resultPrefix = ipAddrAry[0] + '.' + ipAddrAry[1] + '.';
          resultSuffix = 'x.x';
        }
        return [resultPrefix, resultSuffix];
      },
      isIPInSubnet: function(ipAddr, subnetCIDR) {
        var filterAry, ipAddrBinStr, ipAddrBinStrDiv, ipAddrBinStrDivAnti, readyAssignAry, readyAssignAryLength, result, subnetAddrAry, subnetIPAry, subnetIPBinStr, subnetIPBinStrDiv, subnetSuffix, suffixLength, suffixOneStr, suffixOneStrNum, suffixZeroAry, suffixZeroStr, suffixZeroStrNum, _i, _j, _ref, _ref1, _results, _results1;
        subnetIPAry = subnetCIDR.split('/');
        subnetSuffix = Number(subnetIPAry[1]);
        subnetAddrAry = subnetIPAry[0].split('.');
        subnetIPBinStr = MC.getCidrBinStr(subnetIPAry[0]);
        subnetIPBinStrDiv = subnetIPBinStr.slice(0, subnetSuffix);
        ipAddrBinStr = MC.getCidrBinStr(ipAddr);
        ipAddrBinStrDiv = ipAddrBinStr.slice(0, subnetSuffix);
        ipAddrBinStrDivAnti = ipAddrBinStr.slice(subnetSuffix);
        suffixLength = 32 - subnetSuffix;
        suffixZeroAry = _.map((function() {
          _results = [];
          for (var _i = 1, _ref = suffixLength + 1; 1 <= _ref ? _i < _ref : _i > _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this), function() {
          return '0';
        });
        suffixZeroStr = suffixZeroAry.join('');
        suffixOneStr = suffixZeroStr.replace(/0/g, '1');
        suffixZeroStrNum = parseInt(suffixZeroStr, 2);
        suffixOneStrNum = parseInt(suffixOneStr, 2);
        readyAssignAry = (function() {
          _results1 = [];
          for (var _j = suffixZeroStrNum, _ref1 = suffixOneStrNum + 1; suffixZeroStrNum <= _ref1 ? _j < _ref1 : _j > _ref1; suffixZeroStrNum <= _ref1 ? _j++ : _j--){ _results1.push(_j); }
          return _results1;
        }).apply(this);
        readyAssignAryLength = readyAssignAry.length;
        result = false;
        filterAry = [];
        _.each(readyAssignAry, function(value, idx) {
          var newIPBinStr;
          newIPBinStr = MC.leftPadString(value.toString(2), suffixLength, "0");
          if (idx === 0 || idx === 1 || idx === 2 || idx === 3 || idx === (readyAssignAryLength - 1)) {
            filterAry.push(newIPBinStr);
          }
          return null;
        });
        if (__indexOf.call(filterAry, ipAddrBinStrDivAnti) >= 0) {
          return false;
        }
        return subnetIPBinStrDiv === ipAddrBinStrDiv;
      },
      isCidrConflict: function(ipCidr1, ipCidr2) {
        var ipCidr1BinStr, ipCidr1Suffix, ipCidr2BinStr, ipCidr2Suffix, minIpCidrSuffix;
        ipCidr1BinStr = MC.getCidrBinStr(ipCidr1);
        ipCidr2BinStr = MC.getCidrBinStr(ipCidr2);
        ipCidr1Suffix = Number(ipCidr1.split('/')[1]);
        ipCidr2Suffix = Number(ipCidr2.split('/')[1]);
        if (ipCidr1Suffix === 0 && (ipCidr1Suffix === ipCidr2Suffix)) {
          return true;
        }
        minIpCidrSuffix = ipCidr1Suffix;
        if (ipCidr1Suffix > ipCidr2Suffix) {
          minIpCidrSuffix = ipCidr2Suffix;
        }
        if (ipCidr1BinStr.slice(0, minIpCidrSuffix) === ipCidr2BinStr.slice(0, minIpCidrSuffix) && minIpCidrSuffix !== 0) {
          return true;
        } else {
          return false;
        }
      },
      isInVPCCIDR: function(vpcCIDR, subnetCIDR) {
        if (!this.isCidrConflict(vpcCIDR, subnetCIDR)) {
          return false;
        }
        return Number(subnetCIDR.split('/')[1]) >= Number(vpcCIDR.split('/')[1]);
      },
      isValidSubnetCIDR: function(subnetCIDR) {
        var subnetCidrBinStr, subnetCidrSuffix, suffixIPBinStr, suffixNum;
        subnetCidrBinStr = MC.getCidrBinStr(subnetCIDR);
        subnetCidrSuffix = Number(subnetCIDR.split('/')[1]);
        suffixIPBinStr = subnetCidrBinStr.slice(subnetCidrSuffix);
        suffixNum = parseInt(suffixIPBinStr);
        if ((suffixNum === 0) || (suffixIPBinStr === '')) {
          return true;
        }
        return false;
      },
      autoAssignAllCIDR: function(vpcCIDR, subnetCount) {
        var binSeq, i, needBinNum, newIPAry, newIPStr, newSubnetAry, newSubnetBinStr, newSubnetStr, newSubnetSuffix, vpcIPBinLeftStr, vpcIPBinStr, vpcIPSuffix;
        needBinNum = Math.ceil((Math.log(subnetCount)) / (Math.log(2)));
        vpcIPSuffix = Number(vpcCIDR.split('/')[1]);
        vpcIPBinStr = MC.getCidrBinStr(vpcCIDR);
        vpcIPBinLeftStr = vpcIPBinStr.slice(0, vpcIPSuffix);
        newSubnetSuffix = vpcIPSuffix + needBinNum;
        newSubnetAry = [];
        i = 0;
        while (i < subnetCount) {
          binSeq = MC.leftPadString(i.toString(2), needBinNum, "0");
          newSubnetBinStr = MC.rightPadString(vpcIPBinLeftStr + binSeq, 32, "0");
          newIPAry = _.map([0, 8, 16, 24], function(value) {
            return parseInt(newSubnetBinStr.slice(value, value + 8), 2);
          });
          newIPStr = newIPAry.join('.');
          newSubnetStr = newIPStr + '/' + newSubnetSuffix;
          newSubnetAry.push(newSubnetStr);
          ++i;
        }
        return newSubnetAry;
      },
      autoAssignSimpleCIDR: function(newVPCCIDR, oldSubnetAry, oldVPCCIDR) {
        var newSubnetAry, oldVPCCIDRSuffix, vpcCIDRAry, vpcCIDRIPStr, vpcCIDRSuffix, vpcIP1, vpcIP2, vpcIP3, vpcIPAry;
        newSubnetAry = [];
        vpcCIDRAry = newVPCCIDR.split('/');
        vpcCIDRIPStr = vpcCIDRAry[0];
        vpcCIDRSuffix = Number(vpcCIDRAry[1]);
        vpcIPAry = vpcCIDRIPStr.split('.');
        oldVPCCIDRSuffix = Number(oldVPCCIDR.split('/')[1]);
        if (vpcCIDRSuffix === 16 || (vpcCIDRSuffix === 24 && oldVPCCIDRSuffix === vpcCIDRSuffix)) {
          vpcIP1 = vpcIPAry[0];
          vpcIP2 = vpcIPAry[1];
          vpcIP3 = vpcIPAry[2];
          _.each(oldSubnetAry, function(subnetCIDR) {
            var newSubnetCIDR, subnetCIDRAry, subnetCIDRIPStr, subnetCIDRSuffix, subnetIPAry;
            subnetCIDRAry = subnetCIDR.split('/');
            subnetCIDRIPStr = subnetCIDRAry[0];
            subnetCIDRSuffix = Number(subnetCIDRAry[1]);
            subnetIPAry = subnetCIDRIPStr.split('.');
            subnetIPAry[0] = vpcIP1;
            subnetIPAry[1] = vpcIP2;
            if (vpcCIDRSuffix === 24) {
              subnetIPAry[2] = vpcIP3;
            }
            newSubnetCIDR = subnetIPAry.join('.') + '/' + subnetCIDRSuffix;
            newSubnetAry.push(newSubnetCIDR);
            return null;
          });
        }
        return newSubnetAry;
      },
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.name,
          appId: data.resource.SubnetId,
          cidr: data.resource.CidrBlock,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1],
          parent: resolve(layout_data.groupUId)
        });
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/IgwModel',["../ComplexResModel", "./VpcModel", "Design", "constant", "i18n!/nls/lang.js"], function(ComplexResModel, VpcModel, Design, constant, lang) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: {
        x: 0,
        y: 0,
        width: 8,
        height: 8,
        name: "Internet-gateway"
      },
      type: constant.RESTYPE.IGW,
      initialize: function() {
        this.draw(true);
        return null;
      },
      isRemovable: function() {
        var ElbModel, EniModel, LcModel, cannotDel;
        ElbModel = Design.modelClassForType(constant.RESTYPE.ELB);
        cannotDel = ElbModel.allObjects().some(function(elb) {
          return !elb.get("internal");
        });
        if (!cannotDel) {
          EniModel = Design.modelClassForType(constant.RESTYPE.ENI);
          cannotDel = EniModel.allObjects().some(function(eni) {
            return eni.hasEip() || eni.get("assoPublicIp");
          });
        }
        if (!cannotDel) {
          LcModel = Design.modelClassForType(constant.RESTYPE.LC);
          cannotDel = LcModel.allObjects().some(function(lc) {
            return lc.get("publicIp");
          });
        }
        if (cannotDel) {
          return {
            error: lang.ide.CVS_CFM_DEL_IGW
          };
        }
        return true;
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            InternetGatewayId: this.get("appId"),
            AttachmentSet: [
              {
                VpcId: this.parent().createRef("VpcId")
              }
            ]
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      tryCreateIgw: function() {
        var igwH, igwW, vpc, vpcH, vpcX, vpcY;
        if (Model.allObjects().length > 0) {
          return;
        }
        notification('info', lang.ide.CVS_CFM_ADD_IGW_MSG);
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
        igwW = Model.prototype.defaults.width;
        igwH = Model.prototype.defaults.height;
        vpcX = vpc.x();
        vpcY = vpc.y();
        vpcH = vpc.height();
        new Model({
          x: vpcX - igwW / 2,
          y: vpcY + (vpcH - igwH) / 2,
          parent: vpc
        });
        return null;
      },
      handleTypes: constant.RESTYPE.IGW,
      deserialize: function(data, layout_data, resolve) {
        return new Model({
          id: data.uid,
          name: data.name,
          appId: data.resource.InternetGatewayId,
          parent: resolve(layout_data.groupUId),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/VgwModel',["../ComplexResModel", "./VpcModel", "Design", "constant"], function(ComplexResModel, VpcModel, Design, constant) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: {
        x: 0,
        y: 0,
        width: 8,
        height: 8,
        name: "VPN-gateway"
      },
      type: constant.RESTYPE.VGW,
      initialize: function() {
        this.draw(true);
        return null;
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            Type: "ipsec.1",
            VpnGatewayId: this.get("appId"),
            Attachments: [
              {
                VpcId: this.parent().createRef("VpcId")
              }
            ]
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.VGW,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.name,
          appId: data.resource.VpnGatewayId,
          parent: resolve(layout_data.groupUId),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/SnsModel',["../ResourceModel", "../ComplexResModel", "constant", "../ConnectionModel"], function(ResourceModel, ComplexResModel, constant, ConnectionModel) {
    var TopicModel, TopicUsage;
    TopicUsage = ConnectionModel.extend({
      type: "TopicUsage",
      oneToMany: constant.RESTYPE.TOPIC
    });
    TopicModel = ComplexResModel.extend({
      type: constant.RESTYPE.TOPIC,
      isVisual: function() {
        return false;
      },
      serialize: function() {
        var useTopic;
        useTopic = !!this.connections().length;
        if (!useTopic) {
          console.debug("Sns Topic is not serialized, because nothing use it and it doesn't have appId.");
          return;
        }
        return {
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              TopicArn: this.get("appId")
            }
          }
        };
      },
      assignTo: function(target) {
        if (this.get('appId')) {
          return new TopicUsage(this, target);
        }
      }
    }, {
      handleTypes: constant.RESTYPE.TOPIC,
      resolveFirst: true,
      diffJson: function() {},
      isTopicNeeded: function() {
        var ScalingPolicyModel, n, sp, useTopic, _i, _j, _len, _len1, _ref, _ref1;
        ScalingPolicyModel = Design.modelClassForType(constant.RESTYPE.SP);
        _ref = ScalingPolicyModel.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sp = _ref[_i];
          if (sp.get("sendNotification")) {
            useTopic = true;
            break;
          }
        }
        if (!useTopic) {
          _ref1 = Design.modelClassForType(constant.RESTYPE.NC).allObjects();
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            n = _ref1[_j];
            if (n.isUsed()) {
              useTopic = true;
              break;
            }
          }
        }
        return useTopic;
      },
      ensureExistence: function() {
        if (this.allObjects().length === 0) {
          new TopicModel();
        }
        return this.allObjects()[0];
      },
      get: function(appId, name) {
        var topic;
        topic = _.first(_.filter(this.allObjects(), function(m) {
          return m.get('appId') === appId;
        }));
        return topic || new TopicModel({
          appId: appId,
          name: name
        });
      },
      preDeserialize: function(data, layout_data) {
        new TopicModel({
          id: data.uid,
          appId: data.resource.TopicArn,
          name: data.resource.Name || data.name
        });
        return null;
      },
      deserialize: function() {
        return null;
      }
    });

    /*
    
    SubscriptionModel = ResourceModel.extend {
      type : constant.RESTYPE.SUBSCRIPTION
    
      initialize : ()->
        TopicModel.ensureExistence()
        null
    
      serialize : ()->
        topic = TopicModel.ensureExistence()
    
        {
          component :
            name : "SnsSubscription"
            type : @type
            uid  : @id
            resource :
              Endpoint        : @get("endpoint")
              Protocol        : @get("protocol")
              SubscriptionArn : @get("appId")
              TopicArn        : TopicModel.ensureExistence().createRef( "TopicArn" )
        }
    
    }, {
    
      handleTypes : constant.RESTYPE.SUBSCRIPTION
    
      deserialize : ( data, layout_data, resolve ) ->
        new SubscriptionModel({
          id       : data.uid
          appId    : data.resource.SubscriptionArn
          endpoint : data.resource.Endpoint
          protocol : data.resource.Protocol
        })
        null
    }
     */
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/StorageModel',["Design", "../ResourceModel"], function(Design, ResourceModel) {
    var Model;
    Model = ResourceModel.extend({
      type: "AWS.Tag",
      serialize: function() {
        return {
          component: $.extend(true, {}, this.get("data"))
        };
      }
    }, {
      diffJson: function() {},
      handleTypes: ["AWS.EC2.Tag", "AWS.AutoScaling.Tag"],
      deserialize: function(data) {
        new Model({
          id: data.uid,
          data: data
        });
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/resource/ScalingPolicyModel',["../ResourceModel", "../ComplexResModel", "constant"], function(ResourceModel, ComplexResModel, constant) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.SP,
      defaults: function() {
        return {
          cooldown: "",
          minAdjustStep: "",
          adjustment: "-1",
          adjustmentType: "ChangeInCapacity",
          state: "ALARM",
          sendNotification: false,
          alarmData: {
            id: MC.guid(),
            alarmName: "",
            namespace: "AWS/AutoScaling",
            metricName: "CPUUtilization",
            comparisonOperator: ">=",
            evaluationPeriods: "2",
            period: "300",
            statistic: "Average",
            threshold: "10",
            unit: "",
            appId: ""
          }
        };
      },
      isVisual: function() {
        return false;
      },
      constructor: function(attribute, option) {
        var defaults;
        defaults = this.defaults();
        attribute.alarmData = $.extend(defaults.alarmData, attribute.alarmData);
        return ResourceModel.call(this, attribute, option);
      },
      setAlarm: function(alarmData) {
        this.set("alarmData", $.extend({
          id: this.attributes.alarmData.id,
          namespace: "AWS/AutoScaling",
          unit: "",
          appId: this.attributes.alarmData.appId,
          alarmName: this.attributes.alarmData.alarmName
        }, alarmData));
        return null;
      },
      isNotificate: function() {
        return this.get('sendNotification');
      },
      getCost: function(priceMap, currency) {
        var alarmData, asgSize, fee, p, period, _i, _len, _ref;
        alarmData = this.get("alarmData");
        period = parseInt(alarmData.period, 10);
        if (!(period <= 300 && alarmData.namespace === "AWS/AutoScaling")) {
          return null;
        }
        _ref = priceMap.cloudwatch.types;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          if (p.ec2Monitoring) {
            fee = parseFloat(p.ec2Monitoring[currency], 10) || 0;
            break;
          }
        }
        if (fee && this.__asg) {
          asgSize = Design.instance().modeIsStack() ? this.__asg.get("minSize") : this.__asg.get("capacity");
          fee = Math.round(fee / 7 * 1000) / 1000;
          return {
            resource: this.get("name") + "-alarm",
            type: "CloudWatch",
            fee: fee,
            formatedFee: fee + "/mo"
          };
        }
        return null;
      },
      setTopic: function(appId, name) {
        var TopicModel;
        TopicModel = Design.modelClassForType(constant.RESTYPE.TOPIC);
        return TopicModel.get(appId, name).assignTo(this);
      },
      removeTopic: function() {
        var _ref;
        return (_ref = this.connections('TopicUsage')[0]) != null ? _ref.remove() : void 0;
      },
      getTopic: function() {
        return this.connectionTargets('TopicUsage')[0];
      },
      getTopicName: function() {
        var _ref;
        return (_ref = this.getTopic()) != null ? _ref.get('name') : void 0;
      },
      serialize: function() {
        var act_alarm, act_insuffi, act_ok, action_arry, alarm, alarmData, policy, topic;
        if (!this.__asg) {
          console.warn("ScalingPolicy has no attached asg when serializing.");
          return;
        }
        policy = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            ScalingAdjustment: this.get("adjustment"),
            PolicyName: this.get("name"),
            PolicyARN: this.get("appId"),
            Cooldown: this.get("cooldown"),
            AutoScalingGroupName: this.__asg.createRef("AutoScalingGroupName"),
            AdjustmentType: this.get("adjustmentType"),
            MinAdjustmentStep: this.get("adjustmentType") === 'PercentChangeInCapacity' ? this.get("minAdjustStep") : ''
          }
        };
        alarmData = this.get("alarmData");
        act_alarm = act_insuffi = act_ok = [];
        action_arry = [this.createRef("PolicyARN")];
        if (this.get("sendNotification")) {
          topic = this.getTopic();
          if (topic) {
            action_arry.push(topic.createRef("TopicArn"));
          }
        }
        if (this.get("state") === "ALARM") {
          act_alarm = action_arry;
        } else if (this.get("state") === "INSUFFICIANT_DATA") {
          act_insuffi = action_arry;
        } else {
          act_ok = action_arry;
        }
        alarm = {
          name: this.get("name") + "-alarm",
          type: constant.RESTYPE.CW,
          uid: alarmData.id,
          resource: {
            AlarmArn: alarmData.appId,
            AlarmName: alarmData.alarmName || (this.get("name") + "-alarm"),
            ComparisonOperator: alarmData.comparisonOperator,
            EvaluationPeriods: alarmData.evaluationPeriods,
            MetricName: alarmData.metricName,
            Namespace: alarmData.namespace,
            Period: Math.round(alarmData.period / 60) * 60,
            Statistic: alarmData.statistic,
            Threshold: alarmData.threshold,
            Unit: alarmData.unit,
            Dimensions: [
              {
                name: "AutoScalingGroupName",
                value: this.__asg.createRef("AutoScalingGroupName")
              }
            ],
            AlarmActions: act_alarm,
            InsufficientDataActions: act_insuffi,
            OKAction: act_ok
          }
        };
        return [
          {
            component: policy
          }, {
            component: alarm
          }
        ];
      }
    }, {
      handleTypes: [constant.RESTYPE.SP, constant.RESTYPE.CW],
      diffJson: function(newData, oldData) {
        var asg, asgId;
        if (!(newData && oldData && _.isEqual(newData, oldData))) {
          asgId = (newData || oldData).resource;
          asgId = asgId.AutoScalingGroupName || asgId.Dimensions[0].value;
          asg = Design.instance().component(MC.extractID(asgId));
          if (asg) {
            return {
              id: asgId,
              type: constant.RESTYPE.ASG,
              name: asg.get("name"),
              change: "Update"
            };
          }
        }
        return null;
      },
      deserialize: function(data, layout_data, resolve) {
        var alarmData, asg, i, policy, refArray, sendNotification, state, topic, _i, _len;
        if (data.type === constant.RESTYPE.CW) {
          alarmData = {
            id: data.uid,
            name: data.name,
            alarmName: data.resource.AlarmName,
            appId: data.resource.AlarmArn,
            comparisonOperator: data.resource.ComparisonOperator,
            evaluationPeriods: data.resource.EvaluationPeriods,
            metricName: data.resource.MetricName,
            period: data.resource.Period,
            statistic: data.resource.Statistic,
            threshold: data.resource.Threshold,
            namespace: data.resource.Namespace,
            unit: data.resource.Unit
          };
          refArray = [];
          if (data.resource.AlarmActions.length) {
            state = "ALARM";
            refArray.push(data.resource.AlarmActions[0]);
            refArray.push(data.resource.AlarmActions[1]);
          }
          if (data.resource.OKAction.length) {
            state = "OK";
            refArray.push(data.resource.OKAction[0]);
            refArray.push(data.resource.OKAction[1]);
          }
          if (data.resource.InsufficientDataActions.length) {
            state = "INSUFFICIANT_DATA";
            refArray.push(data.resource.InsufficientDataActions[0]);
            refArray.push(data.resource.InsufficientDataActions[1]);
          }
          sendNotification = false;
          for (_i = 0, _len = refArray.length; _i < _len; _i++) {
            i = refArray[_i];
            if (!i) {
              continue;
            }
            if (i.indexOf("PolicyARN") !== -1) {
              policy = resolve(MC.extractID(i)) || new Backbone.Model();
            } else if (i.indexOf("TopicArn") !== -1) {
              topic = resolve(MC.extractID(i));
              sendNotification = true;
            }
          }
          if (topic != null) {
            topic.assignTo(policy);
          }
          if (policy) {
            policy.set({
              "alarmData": alarmData,
              "sendNotification": sendNotification,
              "state": state
            });
          }
        } else {
          policy = new Model({
            id: data.uid,
            name: data.resource.PolicyName || data.name,
            appId: data.resource.PolicyARN,
            cooldown: data.resource.Cooldown,
            minAdjustStep: data.resource.MinAdjustmentStep,
            adjustment: data.resource.ScalingAdjustment,
            adjustmentType: data.resource.AdjustmentType
          });
          asg = resolve(MC.extractID(data.resource.AutoScalingGroupName));
          if (asg) {
            asg.addScalingPolicy(policy);
          }
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/util/deserializeVisitor/JsonFixer',["Design"], function(Design) {
    Design.registerDeserializeVisitor(function(data, layout_data, version) {
      var az, azArr, azMap, checkObj, comp, uid, _i, _len;
      if (version >= "2014-01-25") {
        return;
      }
      azMap = {};
      azArr = [];
      for (uid in layout_data) {
        comp = layout_data[uid];
        if (comp.type === "AWS.EC2.AvailabilityZone") {
          if (comp.groupUId === "Canvas") {
            delete comp.groupUId;
          }
          azArr.push({
            uid: uid,
            type: "AWS.EC2.AvailabilityZone",
            name: comp.name
          });
          azMap[comp.name] = MC.genResRef(uid, 'name');
        } else if (comp.type === "AWS.AutoScaling.Group") {
          if (comp.originalId) {
            data[uid] = {
              type: "ExpandedAsg",
              uid: uid
            };
          }
        }
      }
      checkObj = function(obj) {
        var attr, d, dd, idx, _i, _len;
        for (attr in obj) {
          d = obj[attr];
          if (_.isString(d)) {
            if (d === "true") {
              obj[attr] = true;
            } else if (d === "false") {
              obj[attr] = false;
            } else if (azMap[d]) {
              obj[attr] = azMap[d];
            }
          } else if (_.isArray(d)) {
            for (idx = _i = 0, _len = d.length; _i < _len; idx = ++_i) {
              dd = d[idx];
              if (_.isObject(dd)) {
                checkObj(dd);
              }
              if (_.isString(dd)) {
                if (d === "true") {
                  d[idx] = true;
                } else if (d === "false") {
                  d[idx] = false;
                } else if (azMap[d]) {
                  d[idx] = azMap[d];
                }
              }
            }
          } else if (_.isObject(d)) {
            checkObj(d);
          }
        }
        return null;
      };
      for (uid in data) {
        comp = data[uid];
        checkObj(comp);
      }
      for (_i = 0, _len = azArr.length; _i < _len; _i++) {
        az = azArr[_i];
        data[az.uid] = az;
      }
      return null;
    });
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/util/deserializeVisitor/EipMerge',["Design"], function(Design) {
    Design.registerDeserializeVisitor(function(data, layout_data) {
      var comp, eni_comp, instance_comp, ipObj, refArray, uid;
      for (uid in data) {
        comp = data[uid];
        if (comp.type === "AWS.EC2.EIP") {
          if (comp.resource.NetworkInterfaceId) {
            refArray = comp.resource.PrivateIpAddress.split(".");
            eni_comp = data[MC.extractID(refArray[0])];
            if (!eni_comp) {
              continue;
            }
            ipObj = eni_comp.resource.PrivateIpAddressSet[refArray[3] * 1];
            if (!ipObj) {
              continue;
            }
            ipObj.EipResource = comp;
          } else {
            instance_comp = data[MC.extractID(comp.resource.InstanceId)];
            if (instance_comp) {
              instance_comp.resource.EipResource = comp;
            }
          }
        }
      }
      return null;
    });
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/util/deserializeVisitor/FixOldStack',["Design", "constant"], function(Design, constant) {
    Design.registerDeserializeVisitor(function(data, layout_data, version) {
      var comp, foundKP, foundSG, uid;
      if (version >= "2014-01-15") {
        return;
      }
      if (!Design.instance().modeIsStack()) {
        return;
      }
      for (uid in data) {
        comp = data[uid];
        if (comp.type === constant.RESTYPE.KP) {
          if (comp.name === "DefaultKP") {
            foundKP = true;
            if (foundSG) {
              break;
            }
          }
        } else if (comp.type === constant.RESTYPE.SG) {
          if (comp.name === "DefaultSG") {
            foundSG = true;
            if (foundKP) {
              break;
            }
          }
        }
      }
      if (!foundKP) {
        uid = MC.guid();
        data[uid] = {
          uid: uid,
          type: constant.RESTYPE.KP,
          name: "DefaultKP",
          resource: {
            KeyName: "DefaultKP"
          }
        };
      }
      if (!foundSG) {
        uid = MC.guid();
        data[uid] = {
          uid: uid,
          type: constant.RESTYPE.SG,
          name: "DefaultSG",
          resource: {
            IpPermissions: [
              {
                IpProtocol: "tcp",
                IpRanges: "0.0.0.0/0",
                FromPort: "22",
                ToPort: "22",
                Groups: [
                  {
                    "GroupId": "",
                    "UserId": "",
                    "GroupName": ""
                  }
                ]
              }
            ],
            IpPermissionsEgress: [],
            Default: "true",
            GroupName: "DefaultSG",
            GroupDescription: 'default VPC security group'
          }
        };
      }
      return null;
    });
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/util/deserializeVisitor/AsgExpandor',["Design"], function(Design) {
    Design.registerDeserializeVisitor(function(data, layout_data, version) {
      var comp, uid, _results;
      if (version < "2014-01-25") {
        return;
      }
      _results = [];
      for (uid in layout_data) {
        comp = layout_data[uid];
        if (comp.type === "ExpandedAsg") {
          _results.push(data[uid] = {
            type: "ExpandedAsg",
            uid: uid
          });
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/util/deserializeVisitor/ElbSgNamePatch',["Design", "constant"], function(Design, constant) {
    Design.registerDeserializeVisitor(function(data, layout_data, version) {
      var TYPE, comp, elb, elbs, sg, sgName, sgs, uid, _i, _j, _len, _len1;
      if (version >= "2014-02-11") {
        return;
      }
      TYPE = constant.RESTYPE;
      elbs = [];
      sgs = [];
      for (uid in data) {
        comp = data[uid];
        if (comp.type === TYPE.ELB) {
          elbs.push(comp);
        } else if (comp.type === TYPE.SG) {
          sgs.push(comp);
        }
      }
      for (_i = 0, _len = elbs.length; _i < _len; _i++) {
        elb = elbs[_i];
        sgName = elb.name + "-sg";
        for (_j = 0, _len1 = sgs.length; _j < _len1; _j++) {
          sg = sgs[_j];
          if (sg.name === sgName) {
            sg.name = "elbsg-" + elb.name;
            if (sg.resource.GroupName === sgName) {
              sg.resource.GroupName = sg.name;
            }
            break;
          }
        }
      }
      return null;
    });
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/util/serializeVisitor/EniIpAssigner',["Design", "constant"], function(Design, constant) {
    var generateIpForEnis, prepareEniData;
    prepareEniData = function(uid, eniArray) {
      var AzModel, eni, ip, ipSet, reserveIpSet, subnet, subnetCid, _i, _j, _len, _len1, _ref;
      subnet = Design.instance().component(uid);
      AzModel = Design.modelClassForType(constant.RESTYPE.AZ);
      console.assert(subnet, "Cannot find eni's subnet when assigning Eni's ip.");
      subnetCid = subnet.get("cidr");
      if (!subnetCid) {
        console.error("Cannot found cidr when assigning Eni Ip");
        return;
      }
      ipSet = [];
      reserveIpSet = [];
      for (_i = 0, _len = eniArray.length; _i < _len; _i++) {
        eni = eniArray[_i];
        _ref = eni.resource.PrivateIpAddressSet;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          ip = _ref[_j];
          if (ip.AutoAssign === true) {
            ipSet.push(ip);
          } else {
            reserveIpSet.push(ip.PrivateIpAddress);
          }
        }
      }
      return {
        subnetCid: subnetCid,
        ipSet: ipSet,
        reserveIpSet: reserveIpSet
      };
    };
    generateIpForEnis = function(data) {
      var idx, ip, validIpSet, _i, _len, _ref;
      validIpSet = Design.modelClassForType(constant.RESTYPE.ENI).getAvailableIPInCIDR(data.subnetCid, data.reserveIpSet, data.ipSet.length);
      validIpSet = _.filter(validIpSet, function(ip) {
        return ip.available;
      });
      _ref = data.ipSet;
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        ip = _ref[idx];
        if (validIpSet[idx]) {
          ip.PrivateIpAddress = validIpSet[idx].ip;
        } else {
          ip.PrivateIpAddress = "";
        }
      }
      return null;
    };
    Design.registerSerializeVisitor(function(components) {
      var array, comp, data, eniArray, key, subnetEnisMap, uid;
      if (Design.instance().modeIsApp()) {
        return;
      }
      subnetEnisMap = {};
      for (uid in components) {
        comp = components[uid];
        if (comp.type === constant.RESTYPE.ENI) {
          if (comp.resource.SubnetId && comp.resource.SubnetId[0] === "@") {
            key = comp.resource.SubnetId;
          } else {
            key = comp.resource.AvailabilityZone;
          }
          array = subnetEnisMap[key];
          if (!array) {
            array = subnetEnisMap[key] = [];
          }
          array.splice(_.sortedIndex(array, comp, "name"), 0, comp);
        }
      }
      for (uid in subnetEnisMap) {
        eniArray = subnetEnisMap[uid];
        uid = MC.extractID(uid);
        data = prepareEniData(uid, eniArray);
        if (data) {
          generateIpForEnis(data);
        }
      }
      return null;
    });
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/util/serializeVisitor/AppToStack',["Design"], function(Design) {
    Design.registerSerializeVisitor(function(components, layouts, options) {
      var comp, compo, _results;
      if (!options || !options.toStack) {
        return;
      }
      _results = [];
      for (comp in components) {
        compo = components[comp];
        switch (compo.type) {
          case 'AWS.VPC.VPC':
            _results.push(compo.resource.VpcId = "");
            break;
          case 'AWS.VPC.NetworkInterface':
            compo.resource.NetworkInterfaceId = "";
            _results.push(compo.resource.Attachment.AttachmentId = "");
            break;
          case 'AWS.EC2.Instance':
            compo.resource.InstanceId = "";
            _results.push(_.each(compo.resource.BlockDeviceMapping, function(e) {
              var _ref;
              if (((_ref = e.Ebs) != null ? _ref.VolumeType : void 0) && e.Ebs.VolumeType !== "io1" && e.Ebs.Iops) {
                return compo.Ebs.Iops = "";
              }
            }));
            break;
          case 'AWS.VPC.Subnet':
            _results.push(compo.resource.SubnetId = "");
            break;
          case 'AWS.EC2.EIP':
            compo.resource.AllocationId = "";
            _results.push(compo.resource.PublicIp = "");
            break;
          case 'AWS.VPC.RouteTable':
            compo.resource.RouteTableId = "";
            _results.push(compo.resource.AssociationSet.forEach(function(e) {
              e.RouteTableAssociationId = "";
            }));
            break;
          case 'AWS.EC2.SecurityGroup':
            compo.resource.GroupId = "";
            _results.push(compo.resource.GroupName = compo.name);
            break;
          case 'AWS.VPC.InternetGateway':
            _results.push(compo.resource.InternetGatewayId = "");
            break;
          case 'AWS.VPC.NetworkAcl':
            compo.resource.NetworkAclId = "";
            _results.push(compo.resource.AssociationSet.forEach(function(e) {
              e.NetworkAclAssociationId = "";
            }));
            break;
          case 'AWS.VPC.VPNGateway':
            _results.push(compo.resource.VpnGatewayId = "");
            break;
          case 'AWS.VPC.VPNConnection':
            _results.push(compo.resource.VpnConnectionId = "");
            break;
          case 'AWS.VPC.CustomerGateway':
            _results.push(compo.resource.CustomerGatewayId = "");
            break;
          case "AWS.EC2.EBS.Volume":
            compo.resource.VolumeId = "";
            if (compo.resource.VolumeType && compo.resource.VolumeType !== "io1" && compo.resource.Iops) {
              compo.resource.Iops = "";
              _results.push(null);
            } else {
              _results.push(void 0);
            }
            break;
          case 'AWS.EC2.Tag':
            _results.push(delete components[comp]);
            break;
          case 'AWS.AutoScaling.Tag':
            _results.push(delete components[comp]);
            break;
          case 'AWS.ELB':
            compo.resource.DNSName = "";
            _results.push(compo.resource.LoadBalancerName = compo.name);
            break;
          case 'AWS.AutoScaling.LaunchConfiguration':
            compo.resource.LaunchConfigurationARN = "";
            compo.resource.LaunchConfigurationName = compo.name;
            _results.push(_.each(compo.resource.BlockDeviceMapping, function(e) {
              var _ref;
              if (((_ref = e.Ebs) != null ? _ref.VolumeType : void 0) && e.Ebs.VolumeType !== 'io1' && e.Ebs.Iops) {
                e.Ebs.Iops = "";
                return null;
              }
            }));
            break;
          case 'AWS.AutoScaling.Group':
            compo.resource.AutoScalingGroupARN = "";
            _results.push(compo.resource.AutoScalingGroupName = compo.name);
            break;
          case 'AWS.AutoScaling.NotificationConfiguration':
            _results.push(console.log("Do Nothing Here"));
            break;
          case 'AWS.SNS.Subscription':
            _results.push(console.log("Do Nothing Here"));
            break;
          case 'AWS.AutoScaling.ScalingPolicy':
            _results.push(compo.resource.PolicyARN = "");
            break;
          case 'AWS.CloudWatch.CloudWatch':
            compo.resource.AlarmArn = "";
            _results.push(compo.resource.AlarmName = compo.name);
            break;
        }
      }
      return _results;
    });
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeLine',["./CanvasElement", "CanvasManager", "constant", "canvon"], function(CanvasElement, CanvasManager, constant) {

    /* LEGACY CODE */
    var CeLine, ChildElementProto;
    window.MC.paper = Canvon($('<svg id="SvgLineHolder" xmlns="http://www.w3.org/2000/svg" version="1.2"></div>'));
    CeLine = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeLine, "Line");
    ChildElementProto = CeLine.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.portName = function(targetId) {
      return this.model.port(targetId, "name");
    };
    ChildElementProto.reConnect = function() {
      return this.draw();
    };
    ChildElementProto.select = function() {
      if (this.type === "RTB_Route") {
        this.doSelect(this.type, this.model.getTarget(constant.RESTYPE.RT).id, this.id);
      } else {
        this.doSelect(this.type, this.id, this.id);
      }
      return true;
    };
    ChildElementProto.draw = function() {
      var connection, controlPoints, dirn_from, dirn_to, end0, from_port, item_from, item_to, ls, path, pos_from, pos_port_from, pos_port_to, pos_to, start0, svg_line, to_port;
      connection = this.model;
      item_from = connection.port1Comp().getCanvasView();
      item_to = connection.port2Comp().getCanvasView();
      if (!item_from || !item_to) {
        return;
      }
      pos_from = {
        left: connection.port1Comp().x() * 10,
        top: connection.port1Comp().y() * 10
      };
      pos_to = {
        left: connection.port2Comp().x() * 10,
        top: connection.port2Comp().y() * 10
      };
      from_port = connection.port1("name");
      to_port = connection.port2("name");
      dirn_from = item_from.portDirection(from_port);
      dirn_to = item_to.portDirection(to_port);
      if (dirn_from && dirn_to) {
        if (pos_from.left > pos_to.left) {
          from_port += "-left";
          to_port += "-right";
        } else {
          from_port += "-right";
          to_port += "-left";
        }
        pos_port_from = item_from.portPosition(from_port);
        pos_port_to = item_to.portPosition(to_port);
        pos_from.left += pos_port_from[0];
        pos_from.top += pos_port_from[1];
        pos_to.left += pos_port_to[0];
        pos_to.top += pos_port_to[1];
      } else if (dirn_from) {
        pos_port_to = item_to.portPosition(to_port);
        pos_to.left += pos_port_to[0];
        pos_to.top += pos_port_to[1];
        if (dirn_from === "vertical") {
          from_port += pos_to.top > pos_from.top ? "-bottom" : "-top";
        } else if (dirn_from === "horizontal") {
          from_port += pos_to.left > pos_from.left ? "-right" : "-left";
        }
        pos_port_from = item_from.portPosition(from_port);
        pos_from.left += pos_port_from[0];
        pos_from.top += pos_port_from[1];
      } else if (dirn_to) {
        pos_port_from = item_from.portPosition(from_port);
        pos_from.left += pos_port_from[0];
        pos_from.top += pos_port_from[1];
        if (dirn_to === "vertical") {
          to_port += pos_from.top > pos_to.top ? "-bottom" : "-top";
        } else if (dirn_to === "horizontal") {
          to_port += pos_from.left > pos_to.left ? "-right" : "-left";
        }
        pos_port_to = item_to.portPosition(to_port);
        pos_to.left += pos_port_to[0];
        pos_to.top += pos_port_to[1];
      } else {
        pos_port_from = item_from.portPosition(from_port);
        pos_port_to = item_to.portPosition(to_port);
        pos_from.left += pos_port_from[0];
        pos_from.top += pos_port_from[1];
        pos_to.left += pos_port_to[0];
        pos_to.top += pos_port_to[1];
      }
      start0 = {
        x: pos_from.left,
        y: pos_from.top,
        angle: pos_port_from[2],
        type: connection.port1Comp().type,
        name: from_port
      };
      end0 = {
        x: pos_to.left,
        y: pos_to.top,
        angle: pos_port_to[2],
        type: connection.port2Comp().type,
        name: to_port
      };
      if (start0.x === end0.x || start0.y === end0.y) {
        path = "M" + start0.x + " " + start0.y + " L" + end0.x + " " + end0.y;
      } else {
        controlPoints = MC.canvas.route2(start0, end0);
        if (controlPoints) {
          ls = connection.get("lineType") === 'sg' ? $canvas.lineStyle() : 777;
          switch (ls) {
            case 0:
              path = "M" + controlPoints[0].x + " " + controlPoints[0].y + " L" + controlPoints[1].x + " " + controlPoints[1].y + " L" + controlPoints[controlPoints.length - 2].x + " " + controlPoints[controlPoints.length - 2].y + " L" + controlPoints[controlPoints.length - 1].x + " " + controlPoints[controlPoints.length - 1].y;
              break;
            case 1:
              path = MC.canvas._round_corner(controlPoints);
              break;
            case 2:
              path = MC.canvas._bezier_q_corner(controlPoints);
              break;
            case 3:
              path = MC.canvas._bezier_qt_corner(controlPoints);
              break;
            case 777:
              path = MC.canvas._round_corner(controlPoints);
          }
        }
      }
      svg_line = document.getElementById(this.id);
      if (svg_line) {
        $(svg_line).children().attr('d', path);
      } else {
        MC.paper.start();
        MC.paper.path(path);
        MC.paper.path(path).attr('class', 'fill-line');
        if (connection.get("dashLine")) {
          MC.paper.path(path).attr('class', 'dash-line');
        }
        svg_line = $(MC.paper.save()).attr({
          'class': 'line line-' + connection.get("lineType"),
          'data-type': 'line',
          'id': this.id
        });
        this.getLayer("line_layer")[0].appendChild(svg_line[0]);
      }
      return null;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeAz',["./CanvasElement", "constant", "CanvasManager"], function(CanvasElement, constant, CanvasManager) {
    var CeAz, ChildElementProto;
    CeAz = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeAz, constant.RESTYPE.AZ);
    ChildElementProto = CeAz.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.select = function() {
      if (!this.model.design().modeIsStack()) {
        return this.doSelect("", "", this.model.id);
      } else {
        return this.doSelect(this.model.type, this.model.id, this.model.id);
      }
    };
    ChildElementProto.draw = function(isCreate) {
      var m, name, node;
      m = this.model;
      name = m.get("name");
      if (isCreate) {
        node = this.createGroup(name);
        this.getLayer("az_layer").append(node);
        CanvasManager.position(node, m.x(), m.y());
      } else {
        CanvasManager.update(this.$element().children("text"), name);
      }
      return null;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeSubnet',["./CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    var CeSubnet, ChildElementProto;
    CeSubnet = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeSubnet, constant.RESTYPE.SUBNET);
    ChildElementProto = CeSubnet.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.portPosition = function(portName) {
      var m, portY;
      m = this.model;
      portY = m.height() * MC.canvas.GRID_HEIGHT / 2 - 5;
      if (portName === "subnet-assoc-in") {
        return [-12, portY, CanvasElement.constant.PORT_LEFT_ANGLE];
      } else {
        return [m.width() * MC.canvas.GRID_WIDTH + 10, portY, CanvasElement.constant.PORT_RIGHT_ANGLE];
      }
    };
    ChildElementProto.draw = function(isCreate) {
      var label, m, node;
      m = this.model;
      label = "" + (m.get('name')) + " (" + (m.get('cidr')) + ")";
      if (isCreate) {
        node = this.createGroup(label);
        node.append(Canvon.path(this.constant.PATH_PORT_RIGHT).attr({
          'class': 'port port-gray port-subnet-assoc-in tooltip',
          'data-name': 'subnet-assoc-in',
          'data-position': 'left',
          'data-type': 'association',
          'data-direction': 'in',
          'data-tooltip': lang.ide.PORT_TIP_L
        }));
        node.append(Canvon.path("M2 0.5l-6 -5.5l-2 0 l0 11 l2 0z").attr({
          'class': 'port port-gray port-subnet-assoc-out tooltip',
          'data-name': 'subnet-assoc-out',
          'data-position': 'right',
          'data-type': 'association',
          'data-direction': 'out',
          'data-tooltip': lang.ide.PORT_TIP_M
        }));
        this.getLayer("subnet_layer").append(node);
        this.initNode(node, m.x(), m.y());
      } else {
        CanvasManager.update(this.$element().children("text"), label);
      }
      return null;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeVpc',["./CanvasElement", "constant", "CanvasManager"], function(CanvasElement, constant, CanvasManager) {
    var CeVpc, ChildElementProto;
    CeVpc = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeVpc, constant.RESTYPE.VPC);
    ChildElementProto = CeVpc.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.draw = function(isCreate) {
      var label, m, node;
      m = this.model;
      label = "" + (m.get('name')) + " (" + (m.get('cidr')) + ")";
      if (isCreate) {
        node = this.createGroup(label);
        this.getLayer("vpc_layer").append(node);
        CanvasManager.position(node, m.x(), m.y());
      } else {
        CanvasManager.update(this.$element().children("text"), label);
      }
      return null;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeCgw',["./CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    var CeCgw, ChildElementProto;
    CeCgw = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeCgw, constant.RESTYPE.CGW);
    ChildElementProto = CeCgw.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.portPosMap = {
      "cgw-vpn": [6, 45, CanvasElement.constant.PORT_LEFT_ANGLE]
    };
    ChildElementProto.draw = function(isCreate) {
      var m, node;
      m = this.model;
      if (isCreate) {
        node = this.createNode({
          image: "ide/icon/cgw-canvas.png",
          imageX: 13,
          imageY: 8,
          imageW: 151,
          imageH: 76
        });
        node.append(Canvon.path(this.constant.PATH_PORT_RIGHT).attr({
          'class': 'port port-purple port-cgw-vpn tooltip',
          'data-name': 'cgw-vpn',
          'data-position': 'left',
          'data-type': 'vpn',
          'data-direction': 'in',
          'data-tooltip': lang.ide.PORT_TIP_I
        }), Canvon.text(100, 95, MC.truncate(m.get("name"), 17)).attr({
          'class': 'node-label'
        }));
        this.getLayer("node_layer").append(node);
        this.initNode(node, m.x(), m.y());
      } else {
        CanvasManager.update(this.$element().children(".node-label"), m.get("name"));
      }
      this.updatexGWAppState();
      return null;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeIgw',["./CanvasElement", "constant", "i18n!/nls/lang.js"], function(CanvasElement, constant, lang) {
    var CeIgw, ChildElementProto;
    CeIgw = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeIgw, constant.RESTYPE.IGW);
    ChildElementProto = CeIgw.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.portPosMap = {
      "igw-tgt": [78, 35, CanvasElement.constant.PORT_RIGHT_ANGLE]
    };
    ChildElementProto.draw = function(isCreate) {
      var m, node;
      m = this.model;
      if (isCreate) {
        node = this.createNode({
          image: "ide/icon/igw-canvas.png",
          imageX: 10,
          imageY: 16,
          imageW: 60,
          imageH: 46,
          label: m.get("name")
        });
        node.append(Canvon.path(this.constant.PATH_PORT_LEFT).attr({
          'class': 'port port-blue port-igw-tgt tooltip',
          'data-name': 'igw-tgt',
          'data-position': 'right',
          'data-type': 'sg',
          'data-direction': 'in',
          'data-tooltip': lang.ide.PORT_TIP_C
        }));
        this.getLayer("node_layer").append(node);
        this.initNode(node, m.x(), m.y());
      }
      this.updatexGWAppState();
      return null;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeVgw',["./CanvasElement", "constant", "i18n!/nls/lang.js"], function(CanvasElement, constant, lang) {
    var CeVgw, ChildElementProto;
    CeVgw = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeVgw, constant.RESTYPE.VGW);
    ChildElementProto = CeVgw.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.portPosMap = {
      "vgw-tgt": [3, 35, CanvasElement.constant.PORT_LEFT_ANGLE],
      "vgw-vpn": [70, 35, CanvasElement.constant.PORT_RIGHT_ANGLE]
    };
    ChildElementProto.draw = function(isCreate) {
      var m, node;
      m = this.model;
      if (isCreate) {
        node = this.createNode({
          image: "ide/icon/vgw-canvas.png",
          imageX: 10,
          imageY: 16,
          imageW: 60,
          imageH: 46,
          label: m.get("name")
        });
        node.append(Canvon.path(this.constant.PATH_PORT_RIGHT).attr({
          'class': 'port port-blue port-vgw-tgt tooltip',
          'data-name': 'vgw-tgt',
          'data-position': 'left',
          'data-type': 'sg',
          'data-direction': 'in',
          'data-tooltip': lang.ide.PORT_TIP_C
        }), Canvon.path(this.constant.PATH_PORT_RIGHT).attr({
          'class': 'port port-purple port-vgw-vpn tooltip',
          'data-name': 'vgw-vpn',
          'data-position': 'right',
          'data-type': 'vpn',
          'data-direction': 'out',
          'data-tooltip': lang.ide.PORT_TIP_H
        }));
        this.getLayer("node_layer").append(node);
        this.initNode(node, m.x(), m.y());
      }
      this.updatexGWAppState();
      return null;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeRtb',["./CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    var CeRtb, ChildElementProto;
    CeRtb = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeRtb, constant.RESTYPE.RT);
    ChildElementProto = CeRtb.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.portPosMap = {
      "rtb-tgt-left": [10, 35, CanvasElement.constant.PORT_LEFT_ANGLE],
      "rtb-tgt-right": [70, 35, CanvasElement.constant.PORT_RIGHT_ANGLE],
      "rtb-src-top": [40, 3, CanvasElement.constant.PORT_UP_ANGLE],
      "rtb-src-bottom": [40, 77, CanvasElement.constant.PORT_DOWN_ANGLE]
    };
    ChildElementProto.portDirMap = {
      "rtb-tgt": "horizontal",
      "rtb-src": "vertical"
    };
    ChildElementProto.iconUrl = function() {
      if (this.model.get("main")) {
        return "ide/icon/rt-main-canvas.png";
      } else {
        return "ide/icon/rt-canvas.png";
      }
    };
    ChildElementProto.draw = function(isCreate) {
      var m, node;
      m = this.model;
      if (isCreate) {
        node = this.createNode({
          image: this.iconUrl(),
          imageX: 10,
          imageY: 13,
          imageW: 60,
          imageH: 57
        });
        node.append(Canvon.path(this.constant.PATH_PORT_LEFT).attr({
          'class': 'port port-blue port-rtb-tgt port-rtb-tgt-left tooltip',
          'data-name': 'rtb-tgt',
          'data-alias': 'rtb-tgt-left',
          'data-position': 'left',
          'data-type': 'sg',
          'data-direction': 'out',
          'data-tooltip': lang.ide.PORT_TIP_B
        }), Canvon.path(this.constant.PATH_PORT_RIGHT).attr({
          'class': 'port port-blue  port-rtb-tgt port-rtb-tgt-right tooltip',
          'data-name': 'rtb-tgt',
          'data-alias': 'rtb-tgt-right',
          'data-position': 'right',
          'data-type': 'sg',
          'data-direction': 'out',
          'data-tooltip': lang.ide.PORT_TIP_B
        }), Canvon.path(this.constant.PATH_PORT_BOTTOM).attr({
          'class': 'port port-gray port-rtb-src port-rtb-src-top tooltip',
          'data-name': 'rtb-src',
          'data-alias': 'rtb-src-top',
          'data-position': 'top',
          'data-type': 'association',
          'data-direction': 'in',
          'data-tooltip': lang.ide.PORT_TIP_A
        }), Canvon.path(this.constant.PATH_PORT_TOP).attr({
          'class': 'port port-gray port-rtb-src port-rtb-src-bottom tooltip',
          'data-name': 'rtb-src',
          'data-alias': 'rtb-src-bottom',
          'data-position': 'bottom',
          'data-type': 'association',
          'data-direction': 'in',
          'data-tooltip': lang.ide.PORT_TIP_A
        }), Canvon.text(41, 27, m.get("name")).attr({
          'class': 'node-label node-label-rtb-name'
        }));
        this.getLayer("node_layer").append(node);
        this.initNode(node, m.x(), m.y());
      } else {
        node = this.$element();
        CanvasManager.update(node.children(".node-label"), m.get("name"));
        CanvasManager.update(node.children("image"), this.iconUrl(), "href");
      }
      this.updateAppState();
      return null;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeElb',["./CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    var CeElb, ChildElementProto;
    CeElb = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeElb, constant.RESTYPE.ELB);
    ChildElementProto = CeElb.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.portPosMap = {
      "elb-sg-in": [2, 35, CanvasElement.constant.PORT_LEFT_ANGLE],
      "elb-assoc": [79, 50, CanvasElement.constant.PORT_RIGHT_ANGLE],
      "elb-sg-out": [79, 20, CanvasElement.constant.PORT_RIGHT_ANGLE]
    };
    ChildElementProto.iconUrl = function() {
      if (this.model.get("internal")) {
        return "ide/icon/elb-internal-canvas.png";
      } else {
        return "ide/icon/elb-internet-canvas.png";
      }
    };
    ChildElementProto.draw = function(isCreate) {
      var design, m, node;
      m = this.model;
      design = m.design();
      if (isCreate) {
        node = this.createNode({
          image: this.iconUrl(),
          imageX: 9,
          imageY: 11,
          imageW: 70,
          imageH: 53,
          label: m.get("name"),
          sg: true
        });
        node.append(Canvon.path(this.constant.PATH_PORT_RIGHT).attr({
          'class': 'port port-blue port-elb-sg-in tooltip',
          'data-name': 'elb-sg-in',
          'data-position': 'left',
          'data-type': 'sg',
          'data-direction': "in",
          'data-tooltip': lang.ide.PORT_TIP_D
        }), Canvon.path(this.constant.PATH_PORT_RIGHT).attr({
          'class': 'port port-gray port-elb-assoc tooltip',
          'data-name': 'elb-assoc',
          'data-position': 'right',
          'data-type': 'association',
          'data-direction': 'out',
          'data-tooltip': lang.ide.PORT_TIP_K
        }), Canvon.path(this.constant.PATH_PORT_RIGHT).attr({
          'class': 'port port-blue port-elb-sg-out tooltip',
          'data-name': 'elb-sg-out',
          'data-position': 'right',
          'data-type': 'sg',
          'data-direction': 'out',
          'data-tooltip': lang.ide.PORT_TIP_J
        }));
        this.getLayer("node_layer").append(node);
        this.initNode(node, m.x(), m.y());
      } else {
        node = this.$element();
        CanvasManager.update(node.children(".node-label"), m.get("name"));
        CanvasManager.update(node.children("image"), this.iconUrl(), "href");
      }
      CanvasManager.toggle(node.children(".port-elb-sg-in"), m.get("internal"));
      this.updateAppState();
      return null;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeAsg',["event", "./CanvasElement", "i18n!/nls/lang.js", "constant", "Design", "CanvasManager"], function(ide_event, CanvasElement, lang, constant, Design, CanvasManager) {
    var CeAsg, CeAsgProto;
    CeAsg = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeAsg, constant.RESTYPE.ASG);
    CeAsgProto = CeAsg.prototype;
    CeAsgProto.PATH_ASG_TITLE = "M0 21l0 -16a5 5 0 0 1 5 -5l121 0a5 5 0 0 1 5 5l0 16z";
    CeAsgProto.isRemovable = function() {
      var asg, asgName, lc, lcName;
      asg = this.model;
      lc = asg.get('lc');
      if (!lc || lc.__brothers.length > 0 || lc.isClone()) {
        return true;
      } else {
        asgName = asg.get('name');
        lcName = lc.get('name');
        return sprintf(lang.ide.CVS_CFM_DEL_ASG, lcName, asgName, asgName, lcName);
      }
    };
    CanvasElement.prototype.remove = function() {
      var comp, comp_name, res, template;
      if (this.model.isRemoved()) {
        return;
      }
      res = this.isRemovable();
      comp = this.model;
      comp_name = comp.get("name");
      if (_.isString(res)) {
        template = MC.template.canvasOpConfirm({
          title: sprintf(lang.ide.CVS_CFM_DEL, comp_name),
          content: res
        });
        modal(template, true);
        $("#canvas-op-confirm").one("click", function() {
          if (!comp.isRemoved()) {
            comp.remove();
            $canvas.selected_node().length = 0;
            ide_event.trigger(ide_event.OPEN_PROPERTY);
          }
          return null;
        });
      } else if (res.error) {
        notification("error", res.error);
      } else if (res === true) {
        comp.remove();
        $canvas.selected_node().length = 0;
        ide_event.trigger(ide_event.OPEN_PROPERTY);
        return true;
      }
      return false;
    };
    CeAsgProto.asgExpand = function(parentId, x, y) {
      var ExpandedAsgModel, comp, design, res, target, targetName;
      design = this.model.design();
      comp = this.model;
      target = design.component(parentId);
      if (target) {
        ExpandedAsgModel = Design.modelClassForType("ExpandedAsg");
        res = new ExpandedAsgModel({
          x: x,
          y: y,
          originalAsg: comp,
          parent: target
        });
      }
      if (res && res.id) {
        return true;
      }
      targetName = target.type === "AWS.EC2.AvailabilityZone" ? target.get("name") : target.parent().get("name");
      notification('error', sprintf(lang.ide.CVS_MSG_ERR_DROP_ASG, comp.get("name"), targetName));
      return false;
    };
    CeAsgProto.draw = function(isCreate) {
      var hasLC, height, m, node, width, x, y;
      m = this.model;
      if (isCreate) {
        x = m.x();
        y = m.y();
        width = m.width() * MC.canvas.GRID_WIDTH;
        height = m.height() * MC.canvas.GRID_HEIGHT;
        node = Canvon.group().append(Canvon.rectangle(1, 1, width - 1, height - 1).attr({
          'class': 'group group-asg',
          'rx': 5,
          'ry': 5
        }), Canvon.path(this.PATH_ASG_TITLE).attr({
          'class': 'asg-title'
        }));
        node.append(Canvon.image(MC.IMG_URL + 'ide/icon/asg-resource-dragger.png', width - 21, 0, 22, 21).attr({
          'class': 'asg-resource-dragger tooltip',
          'data-tooltip': 'Expand the group by drag-and-drop in other availability zone.'
        }));
        node.append(Canvon.group().append(Canvon.text(25, 45, 'Drop AMI from'), Canvon.text(20, 65, 'resource panel to'), Canvon.text(30, 85, 'create launch'), Canvon.text(30, 105, 'configuration')).attr({
          'class': 'prompt_text'
        }), Canvon.text(4, 14, MC.truncate(m.get("name"), 15)).attr({
          'class': 'group-label'
        })).attr({
          'id': this.id,
          'class': 'dragable AWS-AutoScaling-Group',
          'data-type': 'group',
          'data-class': this.type
        });
        this.getLayer("asg_layer").append(node);
        CanvasManager.position(node, m.x(), m.y());
      } else {
        node = this.$element();
        CanvasManager.update(node.children(".group-label"), MC.truncate(m.get("name"), 15));
        this.__drawExpandedAsg();
      }
      hasLC = !!m.get("lc");
      CanvasManager.toggle(node.children(".prompt_text"), !hasLC);
      return null;
    };
    CeAsgProto.__drawExpandedAsg = function() {
      var asg, _i, _len, _ref;
      _ref = this.model.get("expandedList");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        asg = _ref[_i];
        asg.draw();
      }
      return null;
    };
    return CeAsg;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeExpandedAsg',["./CanvasElement", "constant", "CanvasManager", "./CeAsg", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, CeAsg, lang) {
    var CeExpandedAsg, ChildElementProto;
    CeExpandedAsg = function() {
      CanvasElement.apply(this, arguments);
      this.type = constant.RESTYPE.ASG;
      return null;
    };
    CanvasElement.extend(CeExpandedAsg, "ExpandedAsg");
    ChildElementProto = CeExpandedAsg.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.portPosMap = {
      "launchconfig-sg-left": [30, 50, CanvasElement.constant.PORT_LEFT_ANGLE],
      "launchconfig-sg-right": [100, 50, CanvasElement.constant.PORT_RIGHT_ANGLE]
    };
    ChildElementProto.portDirMap = {
      "launchconfig-sg": "horizontal"
    };
    ChildElementProto.select = function() {
      var m;
      m = this.model.get("originalAsg");
      this.doSelect(this.type, m.id, this.id);
      return true;
    };
    ChildElementProto.amiIconUrl = function() {
      var lc;
      lc = this.model.get("originalAsg").get("lc");
      if (lc && lc.getCanvasView()) {
        return lc.getCanvasView().iconUrl();
      } else {
        return "ide/ami/ami-not-available.png";
      }
    };
    ChildElementProto.draw = function(isCreate) {
      var height, label, lc, lcLabel, m, members, node, originalAsg, width, x, y;
      $("#" + this.id).remove();
      m = this.model;
      originalAsg = m.get("originalAsg");
      label = originalAsg.get("name");
      lc = originalAsg.get("lc");
      x = m.x();
      y = m.y();
      width = m.width() * MC.canvas.GRID_WIDTH;
      height = m.height() * MC.canvas.GRID_HEIGHT;
      members = [
        Canvon.rectangle(1, 1, width - 1, height - 1).attr({
          'class': 'group group-asg',
          'rx': 5,
          'ry': 5
        }), Canvon.path(CeAsg.prototype.PATH_ASG_TITLE).attr({
          'class': 'asg-title'
        }), Canvon.text(4, 14, label).attr({
          'class': 'group-label'
        })
      ];
      if (lc) {
        lcLabel = lc.get("name");
        members = members.concat([
          Canvon.image(MC.IMG_URL + "ide/icon/instance-canvas.png", 35, 39, 61, 62), Canvon.image(MC.IMG_URL + this.amiIconUrl(), 50, 45, 39, 27).attr({
            "class": 'ami-icon'
          }), Canvon.text(65, 116, lcLabel).attr({
            'class': 'node-label'
          }), Canvon.path(this.constant.PATH_PORT_DIAMOND).attr({
            'class': 'port port-blue port-launchconfig-sg port-launchconfig-sg-left tooltip',
            'data-name': 'launchconfig-sg',
            'data-alias': 'launchconfig-sg-left',
            'data-position': 'left',
            'data-type': 'sg',
            'data-direction': 'in',
            'data-tooltip': lang.ide.PORT_TIP_D
          }), Canvon.path(this.constant.PATH_PORT_DIAMOND).attr({
            'class': 'port port-blue port-launchconfig-sg port-launchconfig-sg-right tooltip',
            'data-name': 'launchconfig-sg',
            'data-alias': 'launchconfig-sg-right',
            'data-position': 'right',
            'data-type': 'sg',
            'data-direction': 'out',
            'data-tooltip': lang.ide.PORT_TIP_D
          })
        ]);
      }
      node = Canvon.group().append.apply(Canvon.group(), members).attr({
        'id': this.id,
        'class': 'dragable AWS-AutoScaling-Group asg-expand',
        'data-type': 'group',
        'data-class': this.type
      });
      this.getLayer("asg_layer").append(node);
      return this.initNode(node, m.x(), m.y());
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeInstance',["i18n!/nls/lang.js", "./CanvasElement", "constant", "CanvasManager", "Design", "CloudResources"], function(lang, CanvasElement, constant, CanvasManager, Design, CloudResources) {
    var CeInstance, ChildElementProto;
    CeInstance = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeInstance, constant.RESTYPE.INSTANCE);
    ChildElementProto = CeInstance.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.portPosMap = {
      "instance-sg-left": [10, 20, CanvasElement.constant.PORT_LEFT_ANGLE],
      "instance-sg-right": [80, 20, CanvasElement.constant.PORT_RIGHT_ANGLE],
      "instance-attach": [78, 50, CanvasElement.constant.PORT_RIGHT_ANGLE],
      "instance-rtb": [45, 0, CanvasElement.constant.PORT_UP_ANGLE]
    };
    ChildElementProto.portDirMap = {
      "instance-sg": "horizontal"
    };
    ChildElementProto.detach = function() {
      MC.canvas.nodeAction.remove(this.id);
      CanvasElement.prototype.detach.call(this);
      return null;
    };
    ChildElementProto.iconUrl = function() {
      var ami;
      ami = this.model.getAmi() || this.model.get("cachedAmi");
      if (!ami) {
        return "ide/ami/ami-not-available.png";
      } else {
        return "ide/ami/" + ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png";
      }
    };
    ChildElementProto.draw = function(isCreate) {
      var m, node, numberGroup, volumeCount, volumeImage;
      m = this.model;
      if (isCreate) {
        node = this.createNode({
          image: "ide/icon/instance-canvas.png",
          imageX: 15,
          imageY: 9,
          imageW: 61,
          imageH: 62,
          label: m.get("name"),
          labelBg: true,
          sg: true
        });
        node.append(Canvon.image(MC.IMG_URL + this.iconUrl(), 30, 15, 39, 27).attr({
          'class': "ami-image"
        }), Canvon.image("", 21, 44, 29, 24).attr({
          'id': "" + this.id + "_volume_status",
          'class': 'volume-image'
        }), Canvon.text(35, 56, "").attr({
          'class': 'node-label volume-number'
        }), Canvon.rectangle(21, 44, 29, 24).attr({
          'data-target-id': this.id,
          'class': 'instance-volume',
          'fill': 'none'
        }), Canvon.image("", 53, 47, 12, 14).attr({
          'class': 'eip-status tooltip'
        }), Canvon.group().append(Canvon.rectangle(36, 1, 20, 16).attr({
          'class': 'server-number-bg',
          'rx': 4,
          'ry': 4
        }), Canvon.text(46, 13, "0").attr({
          'class': 'node-label server-number'
        })).attr({
          'id': "" + this.id + "_instance-number-group",
          'class': 'instance-number-group',
          "display": "none"
        }), Canvon.path(this.constant.PATH_PORT_DIAMOND).attr({
          'class': 'port port-blue port-instance-sg port-instance-sg-left tooltip',
          'data-name': 'instance-sg',
          'data-alias': 'instance-sg-left',
          'data-position': 'left',
          'data-type': 'sg',
          'data-direction': 'in',
          'data-tooltip': lang.ide.PORT_TIP_D
        }), Canvon.path(this.constant.PATH_PORT_DIAMOND).attr({
          'class': 'port port-blue port-instance-sg port-instance-sg-right tooltip',
          'data-name': 'instance-sg',
          'data-alias': 'instance-sg-right',
          'data-position': 'right',
          'data-type': 'sg',
          'data-direction': 'out',
          'data-tooltip': lang.ide.PORT_TIP_D
        }), Canvon.path(this.constant.PATH_PORT_RIGHT).attr({
          'class': 'port port-green port-instance-attach tooltip',
          'data-name': 'instance-attach',
          'data-position': 'right',
          'data-type': 'attachment',
          'data-direction': 'out',
          'data-tooltip': lang.ide.PORT_TIP_E
        }), Canvon.path(this.constant.PATH_PORT_BOTTOM).attr({
          'class': 'port port-blue port-instance-rtb tooltip',
          'data-name': 'instance-rtb',
          'data-position': 'top',
          'data-type': 'sg',
          'data-direction': 'in',
          'data-tooltip': lang.ide.PORT_TIP_C
        }));
        if (!this.model.design().modeIsStack() && m.get("appId")) {
          node.append(Canvon.circle(68, 15, 5, {}).attr({
            'id': "" + this.id + "_instance-state",
            'class': 'instance-state instance-state-unknown'
          }));
        }
        this.getLayer("node_layer").append(node);
        this.initNode(node, m.x(), m.y());
      } else {
        node = this.$element();
        CanvasManager.update(node.children(".node-label-name"), m.get("name"));
      }
      if (!this.model.design().modeIsStack() && m.get("appId")) {
        this.updateAppState();
      }
      CanvasManager.update(node.children(".ami-image"), this.iconUrl(), "href");
      numberGroup = node.children(".instance-number-group");
      if (m.get("count") > 1) {
        CanvasManager.toggle(node.children(".instance-state"), false);
        CanvasManager.toggle(node.children(".port-instance-rtb"), false);
        CanvasManager.toggle(numberGroup, true);
        CanvasManager.update(numberGroup.children("text"), m.get("count"));
      } else {
        CanvasManager.toggle(node.children(".instance-state"), true);
        CanvasManager.toggle(node.children(".port-instance-rtb"), true);
        CanvasManager.toggle(numberGroup, false);
      }
      volumeCount = m.get("volumeList") ? m.get("volumeList").length : 0;
      if (volumeCount > 0) {
        volumeImage = 'ide/icon/instance-volume-attached-normal.png';
      } else {
        volumeImage = 'ide/icon/instance-volume-not-attached.png';
      }
      CanvasManager.update(node.children(".volume-image"), volumeImage, "href");
      CanvasManager.update(node.children(".volume-number"), volumeCount);
      CanvasManager.updateEip(node.children(".eip-status"), m);
      return null;
    };
    ChildElementProto.select = function(subId) {
      var design, m, type;
      m = this.model;
      type = m.type;
      design = m.design();
      if (!subId) {
        if (design.modeIsApp()) {
          if (m.get("count") > 1) {
            type = "component_server_group";
          }
        } else if (design.modeIsAppEdit() && m.get("appId")) {
          type = "component_server_group";
        }
      }
      this.doSelect(type, subId || this.model.id, this.model.id);
      return true;
    };
    ChildElementProto.updateAppState = function() {
      var el, instanceState, instance_data, m, res_list, stateClass, stateEl;
      m = this.model;
      if (m.design().modeIsStack() || !m.get("appId")) {
        return;
      }
      if ($("#" + this.id + "_instance-state").length === 0) {
        return;
      }
      el = this.element();
      CanvasManager.removeClass(el, "deleted");
      if (m.type && m.design().region()) {
        res_list = CloudResources(m.type, m.design().region());
        instance_data = res_list.get(m.get('appId'));
      }
      if (instance_data) {
        instanceState = instance_data.get("instanceState").name;
        if (instanceState === "terminated") {
          CanvasManager.addClass(el, "deleted");
        }
      } else {
        instanceState = "unknown";
        CanvasManager.addClass(el, "deleted");
      }
      stateClass = "instance-state tooltip instance-state-" + instanceState + " instance-state-" + (m.design().mode());
      stateEl = $("#" + this.id + "_instance-state").attr({
        "class": stateClass
      });
      CanvasManager.update(stateEl, instanceState, "data-tooltip");
      return null;
    };
    ChildElementProto.volume = function(volume_id) {
      var design, m, v, vl, _i, _len, _ref;
      m = this.model;
      design = m.design();
      if (volume_id) {
        v = design.component(volume_id);
        return {
          deleted: !v.hasAppResource() ? "deleted" : "",
          name: v.get("name"),
          snapshotId: v.get("snapshotId"),
          size: v.get("volumeSize"),
          id: v.id
        };
      }
      vl = [];
      _ref = this.model.get("volumeList") || vl;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        vl.push({
          deleted: !v.hasAppResource() ? "deleted" : "",
          name: v.get("name"),
          snapshotId: v.get("snapshotId"),
          size: v.get("volumeSize"),
          id: v.id
        });
      }
      return vl;
    };
    ChildElementProto.listVolume = function(appId) {
      var data, design, instanceList, v, vl, volume, volumeList, _i, _len, _ref, _ref1, _ref2;
      vl = [];
      design = this.model.design();
      instanceList = CloudResources(constant.RESTYPE.INSTANCE, design.region());
      volumeList = CloudResources(constant.RESTYPE.VOL, design.region());
      if (!instanceList) {
        return vl;
      }
      data = (_ref = instanceList.get(appId)) != null ? _ref.toJSON() : void 0;
      if (data && data.blockDeviceMapping) {
        _ref1 = data.blockDeviceMapping;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          v = _ref1[_i];
          if (data.rootDeviceName.indexOf(v.deviceName) !== -1) {
            continue;
          }
          volume = (_ref2 = volumeList.get(v.ebs.volumeId)) != null ? _ref2.attributes : void 0;
          if (!volume) {
            continue;
          }
          if (volume) {
            vl.push({
              name: v.deviceName,
              snapshotId: volume.snapshotId || "",
              size: volume.size,
              id: volume.volumeId
            });
          } else {
            if (this.type === constant.RESTYPE.LC) {
              vl.push({
                name: v.deviceName,
                snapshotId: v.ebs.snapshotId || "",
                size: "",
                id: v.ebs.volumeId
              });
            } else {
              vl.push({
                name: v.deviceName,
                snapshotId: v.ebs.snapshotId || "",
                size: "",
                id: v.ebs.volumeId,
                deleted: "deleted"
              });
            }
          }
        }
      }
      return vl;
    };
    ChildElementProto.list = function() {
      var list;
      list = CanvasElement.prototype.list.call(this);
      list.background = this.iconUrl();
      list.volume = (this.model.get("volumeList") || []).length;
      return list;
    };
    ChildElementProto.addVolume = function(attribute) {

      /*
         * # # Quick Hack # # #
        Do not allow adding volume to existing LC in appUpdate
       */
      var VolumeModel, v;
      if (Design.instance().modeIsAppEdit() && this.model.type === constant.RESTYPE.LC && this.model.get("appId")) {
        notification("error", lang.ide.NOTIFY_MSG_WARN_OPERATE_NOT_SUPPORT_YET);
        return false;
      }
      if (attribute && _.isString(attribute.encrypted)) {
        attribute.encrypted = attribute.encrypted === 'true';
      }
      attribute = $.extend({}, attribute);
      attribute.owner = this.model;
      VolumeModel = Design.modelClassForType(constant.RESTYPE.VOL);
      v = new VolumeModel(attribute);
      if (v.id) {
        return {
          id: v.id,
          deleted: !v.hasAppResource(),
          name: v.get("name"),
          snapshotId: v.get("snapshotId"),
          size: v.get("volumeSize")
        };
      } else {
        return false;
      }
    };
    ChildElementProto.removeVolume = function(volumeId) {
      this.model.design().component(volumeId).remove();
      return null;
    };
    ChildElementProto.moveVolume = function(volumeId) {
      var design, result, volume;
      design = this.model.design();
      volume = design.component(volumeId);
      result = volume.isReparentable(this.model);
      if (_.isString(result)) {
        notification("error", result);
        return;
      } else if (result === false) {
        return false;
      }
      result = volume.attachTo(this.model);
      if (!result) {
        return false;
      } else {
        return this.volume(volumeId);
      }
      return null;
    };
    return CeInstance;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeVolume',["i18n!/nls/lang.js", "./CanvasElement", "constant", "CanvasManager", "event"], function(lang, CanvasElement, constant, CanvasManager, ide_event) {
    var CeVolume, ChildElementProto;
    CeVolume = function(component) {
      if (_.isString(component)) {
        this.id = component;
        this.nodeType = "node";
        this.type = constant.RESTYPE.VOL;
      } else {
        CanvasElement.apply(this, arguments);
      }
      return null;
    };
    CanvasElement.extend(CeVolume, constant.RESTYPE.VOL);
    ChildElementProto = CeVolume.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.remove = function() {
      if (this.model.design().modeIsAppEdit()) {
        if ((this.model.get("owner") || {}).type === constant.RESTYPE.LC) {
          notification("error", lang.ide.NOTIFY_MSG_WARN_OPERATE_NOT_SUPPORT_YET);
          return false;
        }
      }
      return CeVolume["super"].remove.call(this);
    };
    ChildElementProto.select = function(subId) {
      ide_event.trigger(ide_event.OPEN_PROPERTY, this.type, subId || this.id);
      MC.canvas.volume.select(this.id);
      return true;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeEni',["./CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    var CeEni, ChildElementProto;
    CeEni = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend(CeEni, constant.RESTYPE.ENI);
    ChildElementProto = CeEni.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.portPosMap = {
      "eni-sg-left": [10, 20, CanvasElement.constant.PORT_LEFT_ANGLE],
      "eni-attach": [8, 50, CanvasElement.constant.PORT_LEFT_ANGLE],
      "eni-sg-right": [80, 20, CanvasElement.constant.PORT_RIGHT_ANGLE],
      "eni-rtb": [45, 0, CanvasElement.constant.PORT_UP_ANGLE]
    };
    ChildElementProto.portDirMap = {
      "eni-sg": "horizontal"
    };
    ChildElementProto.iconUrl = function() {
      if (this.model.connections("EniAttachment").length) {
        return "ide/icon/eni-canvas-attached.png";
      } else {
        return "ide/icon/eni-canvas-unattached.png";
      }
    };
    ChildElementProto.draw = function(isCreate) {
      var count, m, node, numberGroup;
      m = this.model;
      if (m.embedInstance()) {
        return;
      }
      if (isCreate) {
        node = this.createNode({
          image: this.iconUrl(),
          imageX: 16,
          imageY: 15,
          imageW: 59,
          imageH: 49,
          label: m.get("name"),
          labelBg: true,
          sg: true
        });
        node.append(Canvon.image("", 44, 37, 12, 14).attr({
          'id': "" + this.id + "_eip_status",
          'class': 'eip-status tooltip'
        }), Canvon.path(this.constant.PATH_PORT_DIAMOND).attr({
          'class': 'port port-blue port-eni-sg port-eni-sg-left tooltip',
          'data-name': 'eni-sg',
          'data-alias': 'eni-sg-left',
          'data-position': 'left',
          'data-type': 'sg',
          'data-direction': "in",
          'data-tooltip': lang.ide.PORT_TIP_D
        }), Canvon.path(this.constant.PATH_PORT_RIGHT).attr({
          'class': 'port port-green port-eni-attach tooltip',
          'data-name': 'eni-attach',
          'data-position': 'left',
          'data-type': 'attachment',
          'data-direction': "in",
          'data-tooltip': lang.ide.PORT_TIP_G
        }), Canvon.path(this.constant.PATH_PORT_DIAMOND).attr({
          'class': 'port port-blue port-eni-sg port-eni-sg-right tooltip',
          'data-name': 'eni-sg',
          'data-alias': 'eni-sg-right',
          'data-position': 'right',
          'data-type': 'sg',
          'data-direction': 'out',
          'data-tooltip': lang.ide.PORT_TIP_F
        }), Canvon.path(this.constant.PATH_PORT_BOTTOM).attr({
          'class': 'port port-blue port-eni-rtb tooltip',
          'data-name': 'eni-rtb',
          'data-position': 'top',
          'data-type': 'sg',
          'data-direction': 'in',
          'data-tooltip': lang.ide.PORT_TIP_C
        }), Canvon.group().append(Canvon.rectangle(36, 1, 20, 16).attr({
          'class': 'server-number-bg',
          'rx': 4,
          'ry': 4
        }), Canvon.text(46, 13, "0").attr({
          'class': 'node-label server-number'
        })).attr({
          'class': 'eni-number-group',
          'display': "none"
        }));
        this.getLayer("node_layer").append(node);
        this.initNode(node, m.x(), m.y());
      } else {
        node = this.$element();
        CanvasManager.update(node.children(".node-label"), m.get("name"));
        CanvasManager.update(node.children("image:not(.eip-status)"), this.iconUrl(), "href");
      }
      count = m.serverGroupCount();
      numberGroup = node.children(".eni-number-group");
      if (count > 1) {
        CanvasManager.toggle(node.children(".port-eni-rtb"), false);
        CanvasManager.toggle(numberGroup, true);
        CanvasManager.update(numberGroup.children("text"), count);
      } else {
        CanvasManager.toggle(node.children(".port-eni-rtb"), true);
        CanvasManager.toggle(numberGroup, false);
      }
      CanvasManager.updateEip(node.children(".eip-status"), m);
      this.updateAppState();
      return null;
    };
    ChildElementProto.select = function(subId) {
      var design, m, type;
      m = this.model;
      type = m.type;
      design = m.design();
      if (!subId) {
        if (design.modeIsApp()) {
          if (m.serverGroupCount() > 1) {
            type = "component_eni_group";
          }
        } else if (design.modeIsAppEdit() && m.get("appId")) {
          type = "component_eni_group";
        }
      }
      this.doSelect(type, subId || this.model.id, this.model.id);
      return true;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CeLc',["./CanvasElement", "./CeInstance", "constant", "CanvasManager", 'i18n!/nls/lang.js', "CloudResources"], function(CanvasElement, CeInstance, constant, CanvasManager, lang, CloudResources) {
    var CeLc, ChildElementProto;
    CeLc = function() {
      return CanvasElement.apply(this, arguments);
    };
    CanvasElement.extend.call(CeInstance, CeLc, constant.RESTYPE.LC);
    ChildElementProto = CeLc.prototype;

    /*
     * Child Element's interface.
     */
    ChildElementProto.portPosMap = {
      "launchconfig-sg-left": [10, 20, CanvasElement.constant.PORT_LEFT_ANGLE],
      "launchconfig-sg-right": [80, 20, CanvasElement.constant.PORT_RIGHT_ANGLE]
    };
    ChildElementProto.portDirMap = {
      "launchconfig-sg": "horizontal"
    };
    ChildElementProto.detach = function() {
      MC.canvas.nodeAction.remove(this.id);
      CanvasElement.prototype.detach.call(this);
      return null;
    };
    ChildElementProto.list = function() {
      var ins, list, _i, _len;
      list = CanvasElement.prototype.list.call(this);
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        ins = list[_i];
        ins.background = this.iconUrl(ins.appId);
      }
      list.volume = (this.model.get("volumeList") || []).length;
      return list;
    };
    ChildElementProto.iconUrl = function(instanceId) {
      var ami, _ref;
      if (instanceId) {
        ami = (_ref = CloudResources(constant.RESTYPE.AMI, Design.instance().region()).get(instanceId)) != null ? _ref.toJSON() : void 0;
        if (ami) {
          ami = MC.data.dict_ami[ami.imageId];
        }
      }
      if (!ami) {
        ami = this.model.getAmi() || this.model.get("cachedAmi");
      }
      if (!ami) {
        return "ide/ami/ami-not-available.png";
      } else {
        return "ide/ami/" + ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png";
      }
    };
    ChildElementProto.draw = function(isCreate) {
      var asg, data, m, node, numberGroup, volumeCount, volumeImage, _ref;
      m = this.model;
      if (isCreate) {
        node = this.createNode({
          id: m.id,
          image: "ide/icon/instance-canvas.png",
          imageX: 15,
          imageY: 9,
          imageW: 61,
          imageH: 62,
          label: MC.truncate(m.get('name'), 15),
          labelBg: true,
          sg: true
        });
        node.append(Canvon.image(MC.IMG_URL + this.iconUrl(), 30, 15, 39, 27).attr({
          'class': "ami-image"
        }), Canvon.image("", 31, 44, 29, 24).attr({
          'id': "" + this.id + "_volume_status",
          'class': 'volume-image'
        }), Canvon.text(45, 56, "").attr({
          'class': 'node-label volume-number'
        }), Canvon.rectangle(31, 44, 29, 24).attr({
          'data-target-id': this.id,
          'class': 'instance-volume',
          'fill': 'none'
        }), Canvon.path(this.constant.PATH_PORT_DIAMOND).attr({
          'class': 'port port-blue port-launchconfig-sg port-launchconfig-sg-left tooltip',
          'data-name': 'launchconfig-sg',
          'data-alias': 'launchconfig-sg-left',
          'data-position': 'left',
          'data-type': 'sg',
          'data-direction': 'in',
          'data-tooltip': lang.ide.PORT_TIP_D
        }), Canvon.path(this.constant.PATH_PORT_DIAMOND).attr({
          'class': 'port port-blue port-launchconfig-sg port-launchconfig-sg-right tooltip',
          'data-name': 'launchconfig-sg',
          'data-alias': 'launchconfig-sg-right',
          'data-position': 'right',
          'data-type': 'sg',
          'data-direction': 'out',
          'data-tooltip': lang.ide.PORT_TIP_D
        }), Canvon.group().append(Canvon.rectangle(36, 1, 20, 16).attr({
          'class': 'server-number-bg',
          'rx': 4,
          'ry': 4
        }), Canvon.text(46, 13, "0").attr({
          'class': 'node-label server-number'
        })).attr({
          'id': "" + this.id + "_instance-number-group",
          'class': 'instance-number-group',
          "display": "none"
        }));
        this.getLayer("node_layer").append(node);
        this.initNode(node, m.x(), m.y());
      } else {
        node = this.$element(m.id);
        CanvasManager.update(node.children(".node-label-name"), MC.truncate(m.get('name'), 15));
      }
      CanvasManager.update(node.children(".ami-image"), this.iconUrl(), "href");
      volumeCount = (m.get("volumeList") || []).length;
      CanvasManager.update(node.children(".volume-number"), volumeCount);
      if (volumeCount > 0) {
        volumeImage = 'ide/icon/instance-volume-attached-normal.png';
      } else {
        volumeImage = 'ide/icon/instance-volume-not-attached.png';
      }
      CanvasManager.update(node.children(".volume-image"), volumeImage, "href");
      asg = m.parent();
      if (!m.design().modeIsStack() && asg && asg.get('appId')) {
        data = (_ref = CloudResources(constant.RESTYPE.ASG, m.design().region()).get(asg.get('appId'))) != null ? _ref.toJSON() : void 0;
        numberGroup = node.children(".instance-number-group");
        if (data && data.Instances && data.Instances.length) {
          CanvasManager.toggle(numberGroup, true);
          CanvasManager.update(numberGroup.children("text"), data.Instances.length);
        } else {
          CanvasManager.toggle(numberGroup, false);
        }
      }
      return null;
    };
    ChildElementProto.select = function(subId) {
      var type;
      if (subId) {
        type = constant.RESTYPE.INSTANCE;
      } else {
        type = this.model.type;
      }
      return this.doSelect(type, subId || this.id, this.id);
    };
    ChildElementProto.position = function(x, y) {
      var nowX, nowY;
      nowX = this.model.x();
      nowY = this.model.y();
      return [nowX, nowY];
    };
    ChildElementProto.resetPosition = function() {
      var el;
      el = this.element();
      if (el) {
        return MC.canvas.position(el, this.model.x(), this.model.y());
      }
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/DesignBundle',['Design', "CanvasManager", './connection/EniAttachment', './connection/VPNConnection', './resource/InstanceModel', './resource/EniModel', './resource/VolumeModel', './resource/AclModel', './resource/AsgModel', './resource/AzModel', './resource/AzModel', './resource/CgwModel', './resource/ElbModel', './resource/LcModel', './resource/KeypairModel', './resource/SslCertModel', './resource/RtbModel', './resource/SgModel', './resource/SubnetModel', './resource/VpcModel', './resource/IgwModel', './resource/VgwModel', './resource/SnsModel', './resource/StorageModel', './resource/ScalingPolicyModel', "./util/deserializeVisitor/JsonFixer", "./util/deserializeVisitor/EipMerge", "./util/deserializeVisitor/FixOldStack", "./util/deserializeVisitor/AsgExpandor", "./util/deserializeVisitor/ElbSgNamePatch", "./util/serializeVisitor/EniIpAssigner", "./util/serializeVisitor/AppToStack", "./canvasview/CeLine", './canvasview/CeAz', './canvasview/CeSubnet', './canvasview/CeVpc', "./canvasview/CeCgw", "./canvasview/CeIgw", "./canvasview/CeVgw", "./canvasview/CeRtb", "./canvasview/CeElb", "./canvasview/CeAsg", "./canvasview/CeExpandedAsg", "./canvasview/CeInstance", "./canvasview/CeVolume", "./canvasview/CeEni", "./canvasview/CeLc"], function(Design) {

    /* env:dev                                                                                   env:dev:end */

    /* env:debug */
    require(["./workspaces/editor/framework/util/DesignDebugger"], function() {});

    /* env:debug:end */
    window.Design = Design;
    return Design;
  });

}).call(this);

