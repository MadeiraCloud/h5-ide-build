define( 'component/exporter/Download',[], function(){

/* Blob.js
 * A Blob implementation.
 * 2013-06-20
 *
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/eboyjr
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self, unescape */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */
if (!(typeof Blob === "function" || typeof Blob === "object") || typeof URL === "undefined")
if ((typeof Blob === "function" || typeof Blob === "object") && typeof webkitURL !== "undefined") (self || window).URL = webkitURL;
else var Blob = (function (view) {
  

  var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || view.MSBlobBuilder || (function(view) {
    var
        get_class = function(object) {
        return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
      }
      , FakeBlobBuilder = function BlobBuilder() {
        this.data = [];
      }
      , FakeBlob = function Blob(data, type, encoding) {
        this.data = data;
        this.size = data.length;
        this.type = type;
        this.encoding = encoding;
      }
      , FBB_proto = FakeBlobBuilder.prototype
      , FB_proto = FakeBlob.prototype
      , FileReaderSync = view.FileReaderSync
      , FileException = function(type) {
        this.code = this[this.name = type];
      }
      , file_ex_codes = (
          "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
        + "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
      ).split(" ")
      , file_ex_code = file_ex_codes.length
      , real_URL = view.URL || view.webkitURL || view
      , real_create_object_URL = real_URL.createObjectURL
      , real_revoke_object_URL = real_URL.revokeObjectURL
      , URL = real_URL
      , btoa = view.btoa
      , atob = view.atob

      , ArrayBuffer = view.ArrayBuffer
      , Uint8Array = view.Uint8Array
    ;
    FakeBlob.fake = FB_proto.fake = true;
    while (file_ex_code--) {
      FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
    }
    if (!real_URL.createObjectURL) {
      URL = view.URL = {};
    }
    URL.createObjectURL = function(blob) {
      var
          type = blob.type
        , data_URI_header
      ;
      if (type === null) {
        type = "application/octet-stream";
      }
      if (blob instanceof FakeBlob) {
        data_URI_header = "data:" + type;
        if (blob.encoding === "base64") {
          return data_URI_header + ";base64," + blob.data;
        } else if (blob.encoding === "URI") {
          return data_URI_header + "," + decodeURIComponent(blob.data);
        } if (btoa) {
          return data_URI_header + ";base64," + btoa(blob.data);
        } else {
          return data_URI_header + "," + encodeURIComponent(blob.data);
        }
      } else if (real_create_object_URL) {
        return real_create_object_URL.call(real_URL, blob);
      }
    };
    URL.revokeObjectURL = function(object_URL) {
      if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
        real_revoke_object_URL.call(real_URL, object_URL);
      }
    };
    FBB_proto.append = function(data/*, endings*/) {
      var bb = this.data;
      // decode data to a binary string
      if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
        var
            str = ""
          , buf = new Uint8Array(data)
          , i = 0
          , buf_len = buf.length
        ;
        for (; i < buf_len; i++) {
          str += String.fromCharCode(buf[i]);
        }
        bb.push(str);
      } else if (get_class(data) === "Blob" || get_class(data) === "File") {
        if (FileReaderSync) {
          var fr = new FileReaderSync;
          bb.push(fr.readAsBinaryString(data));
        } else {
          // async FileReader won't work as BlobBuilder is sync
          throw new FileException("NOT_READABLE_ERR");
        }
      } else if (data instanceof FakeBlob) {
        if (data.encoding === "base64" && atob) {
          bb.push(atob(data.data));
        } else if (data.encoding === "URI") {
          bb.push(decodeURIComponent(data.data));
        } else if (data.encoding === "raw") {
          bb.push(data.data);
        }
      } else {
        if (typeof data !== "string") {
          data += ""; // convert unsupported types to strings
        }
        // decode UTF-16 to binary string
        bb.push(unescape(encodeURIComponent(data)));
      }
    };
    FBB_proto.getBlob = function(type) {
      if (!arguments.length) {
        type = null;
      }
      return new FakeBlob(this.data.join(""), type, "raw");
    };
    FBB_proto.toString = function() {
      return "[object BlobBuilder]";
    };
    FB_proto.slice = function(start, end, type) {
      var args = arguments.length;
      if (args < 3) {
        type = null;
      }
      return new FakeBlob(
          this.data.slice(start, args > 1 ? end : this.data.length)
        , type
        , this.encoding
      );
    };
    FB_proto.toString = function() {
      return "[object Blob]";
    };
    return FakeBlobBuilder;
  }(view));

  return function Blob(blobParts, options) {
    var type = options ? (options.type || "") : "";
    var builder = new BlobBuilder();
    if (blobParts) {
      for (var i = 0, len = blobParts.length; i < len; i++) {
        builder.append(blobParts[i]);
      }
    }
    return builder.getBlob(type);
  };
}(window));

/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2011-07-13
 *
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

(function(view) {

var
    Uint8Array = view.Uint8Array
  , HTMLCanvasElement = view.HTMLCanvasElement
  , is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i
  , base64_ranks
  , decode_base64 = function(base64) {
    var
        len = base64.length
      , buffer = new Uint8Array(len / 4 * 3 | 0)
      , i = 0
      , outptr = 0
      , last = [0, 0]
      , state = 0
      , save = 0
      , rank
      , code
      , undef
    ;
    while (len--) {
      code = base64.charCodeAt(i++);
      rank = base64_ranks[code-43];
      if (rank !== 255 && rank !== undef) {
        last[1] = last[0];
        last[0] = code;
        save = (save << 6) | rank;
        state++;
        if (state === 4) {
          buffer[outptr++] = save >>> 16;
          if (last[1] !== 61 /* padding character */) {
            buffer[outptr++] = save >>> 8;
          }
          if (last[0] !== 61 /* padding character */) {
            buffer[outptr++] = save;
          }
          state = 0;
        }
      }
    }
    // 2/3 chance there's going to be some null bytes at the end, but that
    // doesn't really matter with most image formats.
    // If it somehow matters for you, truncate the buffer up outptr.
    return buffer.buffer;
  }
;
if (Uint8Array) {
  base64_ranks = new Uint8Array([
      62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1
    , -1, -1,  0, -1, -1, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9
    , 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
    , -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
    , 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
  ]);
}
if (HTMLCanvasElement && !HTMLCanvasElement.prototype.toBlob) {
  HTMLCanvasElement.prototype.toBlob = function(callback, type /*, ...args*/) {
      if (!type) {
      type = "image/png";
    } if (this.mozGetAsFile) {
      callback(this.mozGetAsFile("canvas", type));
      return;
    }
    var
        args = Array.prototype.slice.call(arguments, 1)
      , dataURI = this.toDataURL.apply(this, args)
      , header_end = dataURI.indexOf(",")
      , data = dataURI.substring(header_end + 1)
      , is_base64 = is_base64_regex.test(dataURI.substring(0, header_end))
      , blob
    ;
    if (Blob.fake) {
      // no reason to decode a data: URI that's just going to become a data URI again
      blob = new Blob
      if (is_base64) {
        blob.encoding = "base64";
      } else {
        blob.encoding = "URI";
      }
      blob.data = data;
      blob.size = data.length;
    } else if (Uint8Array) {
      if (is_base64) {
        blob = new Blob([decode_base64(data)], {type: type});
      } else {
        blob = new Blob([decodeURIComponent(data)], {type: type});
      }
    }
    callback(blob, dataURI);
  };
}
}(window));

/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2013-10-21
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  || (function(view) {
  
  var
      doc = view.document
      // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
    , get_URL = function() {
      return view.URL || view.webkitURL || view;
    }
    , URL = view.URL || view.webkitURL || view
    , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
    , can_use_save_link =  !view.externalHost && "download" in save_link
    , click = function(node) {
      var event = doc.createEvent("MouseEvents");
      event.initMouseEvent(
        "click", true, false, view, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
      );
      node.dispatchEvent(event);
    }
    , webkit_req_fs = view.webkitRequestFileSystem
    , req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
    , throw_outside = function (ex) {
      (view.setImmediate || view.setTimeout)(function() {
        throw ex;
      }, 0);
    }
    , force_saveable_type = "application/octet-stream"
    , fs_min_size = 0
    , deletion_queue = []
    , process_deletion_queue = function() {
      var i = deletion_queue.length;
      while (i--) {
        var file = deletion_queue[i];
        if (typeof file === "string") { // file is an object URL
          URL.revokeObjectURL(file);
        } else { // file is a File
          file.remove();
        }
      }
      deletion_queue.length = 0; // clear queue
    }
    , dispatch = function(filesaver, event_types, event) {
      event_types = [].concat(event_types);
      var i = event_types.length;
      while (i--) {
        var listener = filesaver["on" + event_types[i]];
        if (typeof listener === "function") {
          try {
            listener.call(filesaver, event || filesaver);
          } catch (ex) {
            throw_outside(ex);
          }
        }
      }
    }
    , FileSaver = function(blob, name) {
      // First try a.download, then web filesystem, then object URLs
      var
          filesaver = this
        , type = blob.type
        , blob_changed = false
        , object_url
        , target_view
        , get_object_url = function() {
          var object_url = get_URL().createObjectURL(blob);
          deletion_queue.push(object_url);
          return object_url;
        }
        , dispatch_all = function() {
          dispatch(filesaver, "writestart progress write writeend".split(" "));
        }
        // on any filesys errors revert to saving with object URLs
        , fs_error = function() {
          // don't create more object URLs than needed
          if (blob_changed || !object_url) {
            object_url = get_object_url(blob);
          }
          if (target_view) {
            target_view.location.href = object_url;
          } else {
                        window.open(object_url, "_blank");
                    }
          filesaver.readyState = filesaver.DONE;
          dispatch_all();
        }
        , abortable = function(func) {
          return function() {
            if (filesaver.readyState !== filesaver.DONE) {
              return func.apply(this, arguments);
            }
          };
        }
        , create_if_not_found = {create: true, exclusive: false}
        , slice
      ;
      filesaver.readyState = filesaver.INIT;
      if (!name) {
        name = "download";
      }
      if (can_use_save_link) {
        object_url = get_object_url(blob);
        // FF for Android has a nasty garbage collection mechanism
        // that turns all objects that are not pure javascript into 'deadObject'
        // this means `doc` and `save_link` are unusable and need to be recreated
        // `view` is usable though:
        doc = view.document;
        save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
        save_link.href = object_url;
        save_link.download = name;
        var event = doc.createEvent("MouseEvents");
        event.initMouseEvent(
          "click", true, false, view, 0, 0, 0, 0, 0
          , false, false, false, false, 0, null
        );
        save_link.dispatchEvent(event);
        filesaver.readyState = filesaver.DONE;
        dispatch_all();
        return;
      }
      // Object and web filesystem URLs have a problem saving in Google Chrome when
      // viewed in a tab, so I force save with application/octet-stream
      // http://code.google.com/p/chromium/issues/detail?id=91158
      if (view.chrome && type && type !== force_saveable_type) {
        slice = blob.slice || blob.webkitSlice;
        blob = slice.call(blob, 0, blob.size, force_saveable_type);
        blob_changed = true;
      }
      // Since I can't be sure that the guessed media type will trigger a download
      // in WebKit, I append .download to the filename.
      // https://bugs.webkit.org/show_bug.cgi?id=65440
      if (webkit_req_fs && name !== "download") {
        name += ".download";
      }
      if (type === force_saveable_type || webkit_req_fs) {
        target_view = view;
      }
      if (!req_fs) {
        fs_error();
        return;
      }
      fs_min_size += blob.size;
      req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
        fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
          var save = function() {
            dir.getFile(name, create_if_not_found, abortable(function(file) {
              file.createWriter(abortable(function(writer) {
                writer.onwriteend = function(event) {
                  target_view.location.href = file.toURL();
                  deletion_queue.push(file);
                  filesaver.readyState = filesaver.DONE;
                  dispatch(filesaver, "writeend", event);
                };
                writer.onerror = function() {
                  var error = writer.error;
                  if (error.code !== error.ABORT_ERR) {
                    fs_error();
                  }
                };
                "writestart progress write abort".split(" ").forEach(function(event) {
                  writer["on" + event] = filesaver["on" + event];
                });
                writer.write(blob);
                filesaver.abort = function() {
                  writer.abort();
                  filesaver.readyState = filesaver.DONE;
                };
                filesaver.readyState = filesaver.WRITING;
              }), fs_error);
            }), fs_error);
          };
          dir.getFile(name, {create: false}, abortable(function(file) {
            // delete file if it already exists
            file.remove();
            save();
          }), abortable(function(ex) {
            if (ex.code === ex.NOT_FOUND_ERR) {
              save();
            } else {
              fs_error();
            }
          }));
        }), fs_error);
      }), fs_error);
    }
    , FS_proto = FileSaver.prototype
    , saveAs = function(blob, name) {
      return new FileSaver(blob, name);
    }
  ;
  FS_proto.abort = function() {
    var filesaver = this;
    filesaver.readyState = filesaver.DONE;
    dispatch(filesaver, "abort");
  };
  FS_proto.readyState = FS_proto.INIT = 0;
  FS_proto.WRITING = 1;
  FS_proto.DONE = 2;

  FS_proto.error =
  FS_proto.onwritestart =
  FS_proto.onprogress =
  FS_proto.onwrite =
  FS_proto.onabort =
  FS_proto.onerror =
  FS_proto.onwriteend =
    null;

  view.addEventListener("unload", process_deletion_queue, false);
  return saveAs;
}(window));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

  return saveAs;

});

(function() {
  define('ThumbnailUtil',['UI.canvg', 'component/exporter/Download'], function() {
    var DefsTpl, GridBackground, Href, ThumbGridBackground, cleanupThumbnail, createThumbnail, exportBeforeRender, exportPNG, fixSVG, getThumbnail, prepareDefTpl, removeThumbnail, saveThumbnail, saveThumbnailFinish, svgHasClass, thumbBeforeRender;
    GridBackground = void 0;
    ThumbGridBackground = void 0;
    DefsTpl = void 0;
    Href = void 0;
    exportBeforeRender = function(ctx) {
      var cHeight, cWidth, orgFS;
      cWidth = ctx.canvas.clientWidth || ctx.canvas.width;
      cHeight = ctx.canvas.clientHeight || ctx.canvas.height;
      orgFS = ctx.fillStyle;
      ctx.fillStyle = ctx.createPattern(GridBackground, "repeat");
      ctx.fillRect(0, 54, cWidth, cHeight - 54);
      ctx.fillStyle = orgFS;
      return null;
    };
    thumbBeforeRender = function(ctx) {
      var cHeight, cWidth, ratio, ratio1, ratio2;
      cWidth = ctx.canvas.clientWidth || ctx.canvas.width;
      cHeight = ctx.canvas.clientHeight || ctx.canvas.height;
      if (cWidth > 1500) {
        cWidth = 1500;
      }
      if (cHeight > 1000) {
        cWidth = 1000;
      }
      ratio1 = 228 / cWidth;
      ratio2 = 150 / cHeight;
      ratio = ratio1 <= ratio2 ? ratio2 : ratio1;
      ctx.canvas.width = 228;
      ctx.canvas.height = 150;
      ctx.fillStyle = ctx.createPattern(ThumbGridBackground, "repeat");
      ctx.fillRect(0, 0, cWidth, cHeight);
      ctx.scale(ratio, ratio);
      return null;
    };
    prepareDefTpl = function() {
      var ch, clone, _i, _len, _ref;
      clone = $("#svgDefs")[0].cloneNode(true);
      clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      $("#ExportPngWrap").append(clone);
      _ref = clone.children || clone.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
        if (!ch.tagName) {
          continue;
        }
        fixSVG(ch, [], true);
      }
      DefsTpl = (new XMLSerializer()).serializeToString(clone).replace(/^<svg[^>]+>/, "").replace(/<\/svg>$/, "").replace(/(fill:rgb\(0, 0, 0\)|stroke:none);?/g, "");
    };
    exportPNG = function($svg_canvas_element, data) {
      var $wrap, bbox, beforeRender, canvas, ch, children, clone, insertTpl, name, origin, removeArray, replaceEl, size, svg, time, _i, _j, _k, _len, _len1, _len2, _ref;
      if (!data.onFinish) {
        return;
      }
      $wrap = $("#ExportPngWrap");
      if (!$wrap.length) {
        $wrap = $("<div id='ExportPngWrap'></div>").appendTo("body").hide();
      }
      if (!GridBackground) {
        GridBackground = document.createElement("img");
        GridBackground.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAHUlEQVQYV2P48ePHf9yAgabSHz9+/I4bENI9gNIA0iYpJd74eOIAAAAASUVORK5CYII=";
        ThumbGridBackground = document.createElement("img");
        ThumbGridBackground.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAMAAABh9kWNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF9fX1////0eouzwAAABRJREFUeNpiYGBkZGBkYABhgAADAAApAAUR1P0IAAAAAElFTkSuQmCC";
        prepareDefTpl();
      }
      clone = $svg_canvas_element[0].cloneNode(true);
      size = $svg_canvas_element[0].getBBox();
      clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      $wrap.append(clone);
      removeArray = [clone];
      children = clone.children || clone.childNodes;
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        if (!ch.tagName) {
          continue;
        }
        fixSVG(ch, removeArray);
      }
      for (_j = 0, _len1 = removeArray.length; _j < _len1; _j++) {
        ch = removeArray[_j];
        if (ch.remove) {
          ch.remove();
        } else {
          ch.parentNode.removeChild(ch);
        }
      }
      origin = {
        x: 0,
        y: 0
      };
      if (data.isExport) {
        origin = {
          x: size.width,
          y: size.height
        };
        _ref = $svg_canvas_element[0].children || $svg_canvas_element[0].childNodes;
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          ch = _ref[_k];
          if ((!ch.tagName) || (ch.tagName.toLowerCase() !== "g")) {
            continue;
          }
          bbox = ch.getBBox();
          if (!(bbox.x + bbox.y + bbox.width + bbox.height)) {
            continue;
          }
          if (bbox.x < origin.x) {
            origin.x = bbox.x;
          }
          if (bbox.y < origin.y) {
            origin.y = bbox.y;
          }
        }
        origin.x -= 30;
        origin.y -= 30;
      }
      replaceEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
      replaceEl.textContent = "PLACEHOLDER";
      clone.insertBefore(replaceEl, children[0]);
      svg = (new XMLSerializer()).serializeToString(clone);
      insertTpl = DefsTpl;
      if (data.isExport) {
        if (Href === void 0) {
          Href = (svg.indexOf("xlink:href") === -1 ? "href" : "xlink:href");
        }
        time = "";
        name = "";
        if (data.drawInfo !== false) {
          time = MC.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
          name = data.name;
        }
        svg = svg.replace("</svg>", "</g></svg>");
        insertTpl += "<g transform='translate(" + (-origin.x) + " " + (54 - origin.y) + ")'>\n<g transform='translate(" + origin.x + " " + (origin.y - 54) + ")'>\n  <rect fill='#383975' width='100%' height='54' y='0'></rect>\n  <image " + Href + "='/assets/images/ide/logo-t.png?v=2' x='10' y='11' width='116' height='35'></image>\n  <text x='100%' y='40' fill='#fff' text-anchor='end' transform='translate(-10 0)'>" + time + "</text>\n  <text x='100%' y='24' fill='#fff' text-anchor='end' transform='translate(-10 0)'>" + name + "</text>\n</g>";
      }
      svg = svg.replace("<g>PLACEHOLDER</g>", insertTpl);
      size = {
        width: size.width + 30 * 2,
        height: size.height + 30 * 2
      };
      if (data.isExport) {
        size.height += 54;
        if (size.width < 360) {
          size.width = 360;
        }
        if (size.height < 380) {
          size.height = 380;
        }
        beforeRender = exportBeforeRender;
      } else {
        beforeRender = thumbBeforeRender;
      }
      canvas = document.createElement("canvas");
      canvas.width = size.width;
      canvas.height = size.height;
      return canvg(canvas, svg, {
        beforeRender: beforeRender,
        afterRender: function() {
          var onFinish;
          onFinish = data.onFinish;
          data.onFinish = null;
          if (data.createBlob === true) {
            return canvas.toBlob(function(blob, possibleDataURL) {
              if (typeof possibleDataURL === "string") {
                data.image = possibleDataURL;
              } else {
                data.image = canvas.toDataURL();
              }
              data.blob = blob;
              return onFinish(data);
            });
          } else {
            data.image = canvas.toDataURL();
            return onFinish(data);
          }
        }
      });
    };
    svgHasClass = function(svg, test) {
      if (svg.classList) {
        return svg.classList.contains(test);
      } else {
        return (svg.getAttribute("class") || "").indexOf(test) !== -1;
      }
    };
    fixSVG = function(element, removeArray, keepDefaultStyle) {
      var ch, children, fo, remove, s, ss, t1, tagName, _i, _len;
      tagName = element.tagName.toLowerCase();
      children = element.children || element.childNodes;
      switch (tagName) {
        case "g":
          remove = children.length === 0;
          break;
        case "path":
          remove = svgHasClass(element, "fill-line");
          break;
        case "rect":
          remove = svgHasClass(element, "group-resizer");
      }
      if (remove) {
        return removeArray.push(element);
      }
      ss = window.getComputedStyle(element);
      if (ss.visibility === "hidden" || ss.display === "none" || ss.opacity === "0") {
        return removeArray.push(element);
      }
      s = [];
      if ("" + ss.opacity !== "1") {
        s.push("opacity:" + ss.opacity);
      }
      if (tagName !== "g" && tagName !== "image" && tagName !== "defs") {
        fo = "" + ss.fillOpacity;
        if (!keepDefaultStyle && (fo === "0" || ss.fill.match(/rgba\([^)]+0\)/))) {
          s.push("fill:none");
        } else {
          if (ss.fill !== "#000000") {
            s.push("fill:" + ss.fill);
          }
          if (fo !== "1") {
            s.push("fill-opacity:" + ss.fillOpacity);
          }
        }
        t1 = (ss.strokeWidth + "").replace("px", "");
        fo = "" + ss.strokeOpacity;
        if (!keepDefaultStyle && ("" + ss.strokeWidth === "0" || fo === "0")) {
          s.push("stroke:none");
        } else {
          s.push("stroke:" + ss.stroke);
          if (t1 !== "1") {
            s.push("stroke-width:" + ss.strokeWidth);
          }
          if (fo !== "1") {
            s.push("stroke-opacity:" + ss.strokeOpacity);
          }
        }
        if (ss.strokeLinejoin !== "miter") {
          s.push("stroke-linejoin:" + ss.strokeLinejoin);
        }
        if (ss.strokeDasharray !== "none") {
          s.push("stroke-dasharray:" + ss.strokeDasharray);
        }
        if (tagName === "text") {
          if (ss.fontSize !== "14px") {
            s.push("font-size:" + ss.fontSize);
          }
          if (ss.textAnchor !== "start") {
            s.push("text-anchor:" + ss.textAnchor);
          }
        }
      }
      if (s.length) {
        element.setAttribute("stylez", s.join(";"));
      }
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        if (!ch.tagName) {
          continue;
        }
        fixSVG(ch, removeArray, keepDefaultStyle);
        ch.removeAttribute("data-id");
        ch.removeAttribute("data-tooltip");
      }
      return null;
    };
    saveThumbnailFinish = function(data) {
      var c, cache, firstIndex, index;
      cache = localStorage.getItem("thumbnails") || "";
      c = "" + data.id + ",";
      index = cache.indexOf(c);
      if (index === -1) {
        if (localStorage.length > 300) {
          firstIndex = cache.indexOf(",");
          localStorage.removeItem("tn/" + cache.substring(0, firstIndex));
          cache = cache.substring(firstIndex);
        }
      } else {
        cache = cache.replace(c, "");
      }
      localStorage.setItem("thumbnails", cache + c);
      localStorage.setItem("tn/" + data.id, data.image);
      return null;
    };
    createThumbnail = function($svg_element, size) {
      var defer;
      defer = Q.defer();
      exportPNG($svg_element, {
        size: size,
        onFinish: function(data) {
          return defer.resolve(data.image || "");
        }
      });
      return defer.promise;
    };
    saveThumbnail = function(id, $svg_element, size) {
      if (typeof $svg_element === "string") {
        saveThumbnailFinish({
          id: id,
          image: $svg_element
        });
      } else {
        exportPNG($svg_element, {
          id: id,
          size: size,
          onFinish: saveThumbnailFinish
        });
      }
      return null;
    };
    getThumbnail = function(id) {
      return localStorage.getItem("tn/" + id);
    };
    removeThumbnail = function(id) {
      var cache;
      if (!id) {
        return;
      }
      cache = localStorage.getItem("thumbnails") || "";
      localStorage.setItem("thumbnails", cache.replace("" + id + ",", ""));
      localStorage.removeItem("tn/" + id);
      return null;
    };
    cleanupThumbnail = function(keepArray) {
      var c, id, keepId, oldArray, removeArray, validId, _i, _j, _k, _len, _len1, _len2;
      validId = {};
      for (_i = 0, _len = keepArray.length; _i < _len; _i++) {
        keepId = keepArray[_i];
        validId[keepId] = true;
      }
      oldArray = (localStorage.getItem("thumbnails") || "").split(",");
      removeArray = [];
      keepArray = [];
      for (_j = 0, _len1 = oldArray.length; _j < _len1; _j++) {
        id = oldArray[_j];
        if (!id) {
          continue;
        }
        if (validId[id]) {
          keepArray.push(id);
        } else {
          removeArray.push(id);
        }
      }
      if (removeArray.length) {
        if (keepArray.length) {
          c = keepArray.join(",") + ",";
        }
        localStorage.setItem("thumbnails", c || "");
        for (_k = 0, _len2 = removeArray.length; _k < _len2; _k++) {
          id = removeArray[_k];
          localStorage.removeItem("tn/" + id);
        }
        console.debug("Cleaning up unused thumbnails:", removeArray);
      }
      return null;
    };
    return {
      exportPNG: exportPNG,
      generate: createThumbnail,
      save: saveThumbnail,
      fetch: getThumbnail,
      remove: removeThumbnail,
      cleanup: cleanupThumbnail
    };
  });

}).call(this);

(function() {
  define('JsonExporter',['component/exporter/Download', 'i18n!/nls/lang.js', "crypto"], function(download, lang) {
    var ascii, exportJson, genericExport, importJson, key;
    ascii = function() {
      return String.fromCharCode.apply(String, arguments);
    };
    key = ascii(77, 97, 100, 101, 105, 114, 97, 67, 108, 111, 117, 100, 73, 68, 69);
    exportJson = function(json, name) {
      var blob, i, j, space, _i, _len, _ref;
      _ref = ["description", "history", "id", "key", "property", "state", "username"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        delete json[i];
      }
      json.signature = CryptoJS.HmacMD5(JSON.stringify(json), key).toString();
      space = 4;

      /* env:prod */
      space = void 0;

      /* env:prod:end */
      j = JSON.stringify(json, void 0, space);
      if ($("body").hasClass("safari")) {
        blob = null;
      } else {
        blob = new Blob([j]);
      }
      if (!blob) {
        return {
          data: "data://text/plain;," + j,
          name: name
        };
      }
      download(blob, name);
      return null;
    };
    importJson = function(json) {
      var e, j, signature;
      try {
        j = JSON.parse(json);
        delete j._id;
      } catch (_error) {
        e = _error;
        return lang.ide.POP_IMPORT_FORMAT_ERROR;
      }
      signature = j.signature;
      delete j.signature;

      /* env:prod */

      /* env:prod:end */
      return j;
    };
    genericExport = function(aTag, contentJsonObject, fileName) {
      var j, space, ua;
      space = 4;

      /* env:prod */
      space = void 0;

      /* env:prod:end */
      j = JSON.stringify(contentJsonObject, void 0, space);
      ua = window.navigator.userAgent;
      if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1) {
        $(aTag).attr({
          href: "data://text/plain;," + j,
          target: "_blank"
        });
      } else {
        $(aTag).off("click.export").on("click.export", function() {
          download(new Blob([j]), fileName);
          return null;
        });
      }
      return null;
    };
    return {
      exportJson: exportJson,
      importJson: importJson,
      download: download,
      genericExport: genericExport
    };
  });

}).call(this);


define("component/Exporter", function(){});
