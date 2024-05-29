// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"KwvA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.viewport = exports.variationPlacements = exports.top = exports.start = exports.right = exports.reference = exports.read = exports.popper = exports.placements = exports.modifierPhases = exports.main = exports.left = exports.end = exports.clippingParents = exports.bottom = exports.beforeWrite = exports.beforeRead = exports.beforeMain = exports.basePlacements = exports.auto = exports.afterWrite = exports.afterRead = exports.afterMain = void 0;
var top = exports.top = 'top';
var bottom = exports.bottom = 'bottom';
var right = exports.right = 'right';
var left = exports.left = 'left';
var auto = exports.auto = 'auto';
var basePlacements = exports.basePlacements = [top, bottom, right, left];
var start = exports.start = 'start';
var end = exports.end = 'end';
var clippingParents = exports.clippingParents = 'clippingParents';
var viewport = exports.viewport = 'viewport';
var popper = exports.popper = 'popper';
var reference = exports.reference = 'reference';
var variationPlacements = exports.variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = exports.placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = exports.beforeRead = 'beforeRead';
var read = exports.read = 'read';
var afterRead = exports.afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = exports.beforeMain = 'beforeMain';
var main = exports.main = 'main';
var afterMain = exports.afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = exports.beforeWrite = 'beforeWrite';
var write = exports.write = 'write';
var afterWrite = exports.afterWrite = 'afterWrite';
var modifierPhases = exports.modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
},{}],"hqUe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeName;
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}
},{}],"iP0B":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindow;
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
},{}],"lOVC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElement = isElement;
exports.isHTMLElement = isHTMLElement;
exports.isShadowRoot = isShadowRoot;
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isElement(node) {
  var OwnElement = (0, _getWindow.default)(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = (0, _getWindow.default)(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  var OwnElement = (0, _getWindow.default)(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
},{"./getWindow.js":"iP0B"}],"pu4Q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getNodeName = _interopRequireDefault(require("../dom-utils/getNodeName.js"));
var _instanceOf = require("../dom-utils/instanceOf.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0, _instanceOf.isHTMLElement)(element) || !(0, _getNodeName.default)(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]

    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];
      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0, _instanceOf.isHTMLElement)(element) || !(0, _getNodeName.default)(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
};
},{"../dom-utils/getNodeName.js":"hqUe","../dom-utils/instanceOf.js":"lOVC"}],"yLpD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBasePlacement;
var _enums = require("../enums.js");
function getBasePlacement(placement) {
  return placement.split('-')[0];
}
},{"../enums.js":"KwvA"}],"oQre":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.round = exports.min = exports.max = void 0;
var max = exports.max = Math.max;
var min = exports.min = Math.min;
var round = exports.round = Math.round;
},{}],"TiPP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUAString;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }
  return navigator.userAgent;
}
},{}],"PUSM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLayoutViewport;
var _userAgent = _interopRequireDefault(require("../utils/userAgent.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0, _userAgent.default)());
}
},{"../utils/userAgent.js":"TiPP"}],"btCD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBoundingClientRect;
var _instanceOf = require("./instanceOf.js");
var _math = require("../utils/math.js");
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
var _isLayoutViewport = _interopRequireDefault(require("./isLayoutViewport.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && (0, _instanceOf.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0, _math.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0, _math.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = (0, _instanceOf.isElement)(element) ? (0, _getWindow.default)(element) : window,
    visualViewport = _ref.visualViewport;
  var addVisualOffsets = !(0, _isLayoutViewport.default)() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}
},{"./instanceOf.js":"lOVC","../utils/math.js":"oQre","./getWindow.js":"iP0B","./isLayoutViewport.js":"PUSM"}],"bgU0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLayoutRect;
var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0, _getBoundingClientRect.default)(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}
},{"./getBoundingClientRect.js":"btCD"}],"TozG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;
var _instanceOf = require("./instanceOf.js");
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0, _instanceOf.isShadowRoot)(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      } // $FlowFixMe[prop-missing]: need a better way to handle this...

      next = next.parentNode || next.host;
    } while (next);
  } // Give up, the result is false

  return false;
}
},{"./instanceOf.js":"lOVC"}],"ro5C":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getComputedStyle;
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getComputedStyle(element) {
  return (0, _getWindow.default)(element).getComputedStyle(element);
}
},{"./getWindow.js":"iP0B"}],"t2So":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTableElement;
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0, _getNodeName.default)(element)) >= 0;
}
},{"./getNodeName.js":"hqUe"}],"iOCj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDocumentElement;
var _instanceOf = require("./instanceOf.js");
function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0, _instanceOf.isElement)(element) ? element.ownerDocument :
  // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}
},{"./instanceOf.js":"lOVC"}],"Tyrb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getParentNode;
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _instanceOf = require("./instanceOf.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getParentNode(element) {
  if ((0, _getNodeName.default)(element) === 'html') {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot ||
    // step into the shadow DOM of the parent of a slotted node
    element.parentNode || (
    // DOM Element detected
    (0, _instanceOf.isShadowRoot)(element) ? element.host : null) ||
    // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0, _getDocumentElement.default)(element) // fallback
  );
}
},{"./getNodeName.js":"hqUe","./getDocumentElement.js":"iOCj","./instanceOf.js":"lOVC"}],"Mnay":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOffsetParent;
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));
var _instanceOf = require("./instanceOf.js");
var _isTableElement = _interopRequireDefault(require("./isTableElement.js"));
var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));
var _userAgent = _interopRequireDefault(require("../utils/userAgent.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getTrueOffsetParent(element) {
  if (!(0, _instanceOf.isHTMLElement)(element) ||
  // https://github.com/popperjs/popper-core/issues/837
  (0, _getComputedStyle.default)(element).position === 'fixed') {
    return null;
  }
  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block

function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0, _userAgent.default)());
  var isIE = /Trident/i.test((0, _userAgent.default)());
  if (isIE && (0, _instanceOf.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0, _getComputedStyle.default)(element);
    if (elementCss.position === 'fixed') {
      return null;
    }
  }
  var currentNode = (0, _getParentNode.default)(element);
  if ((0, _instanceOf.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }
  while ((0, _instanceOf.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0, _getNodeName.default)(currentNode)) < 0) {
    var css = (0, _getComputedStyle.default)(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.

function getOffsetParent(element) {
  var window = (0, _getWindow.default)(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && (0, _isTableElement.default)(offsetParent) && (0, _getComputedStyle.default)(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && ((0, _getNodeName.default)(offsetParent) === 'html' || (0, _getNodeName.default)(offsetParent) === 'body' && (0, _getComputedStyle.default)(offsetParent).position === 'static')) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}
},{"./getWindow.js":"iP0B","./getNodeName.js":"hqUe","./getComputedStyle.js":"ro5C","./instanceOf.js":"lOVC","./isTableElement.js":"t2So","./getParentNode.js":"Tyrb","../utils/userAgent.js":"TiPP"}],"w8hZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMainAxisFromPlacement;
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}
},{}],"bTtH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.within = within;
exports.withinMaxClamp = withinMaxClamp;
var _math = require("./math.js");
function within(min, value, max) {
  return (0, _math.max)(min, (0, _math.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}
},{"./math.js":"oQre"}],"R9OA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFreshSideObject;
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
},{}],"YlSo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergePaddingObject;
var _getFreshSideObject = _interopRequireDefault(require("./getFreshSideObject.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0, _getFreshSideObject.default)(), paddingObject);
}
},{"./getFreshSideObject.js":"R9OA"}],"ZqdX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = expandToHashMap;
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
},{}],"T3Ag":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));
var _getLayoutRect = _interopRequireDefault(require("../dom-utils/getLayoutRect.js"));
var _contains = _interopRequireDefault(require("../dom-utils/contains.js"));
var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));
var _getMainAxisFromPlacement = _interopRequireDefault(require("../utils/getMainAxisFromPlacement.js"));
var _within = require("../utils/within.js");
var _mergePaddingObject = _interopRequireDefault(require("../utils/mergePaddingObject.js"));
var _expandToHashMap = _interopRequireDefault(require("../utils/expandToHashMap.js"));
var _enums = require("../enums.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0, _mergePaddingObject.default)(typeof padding !== 'number' ? padding : (0, _expandToHashMap.default)(padding, _enums.basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state,
    name = _ref.name,
    options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0, _getBasePlacement.default)(state.placement);
  var axis = (0, _getMainAxisFromPlacement.default)(basePlacement);
  var isVertical = [_enums.left, _enums.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';
  if (!arrowElement || !popperOffsets) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0, _getLayoutRect.default)(arrowElement);
  var minProp = axis === 'y' ? _enums.top : _enums.left;
  var maxProp = axis === 'y' ? _enums.bottom : _enums.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0, _getOffsetParent.default)(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0, _within.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}
function effect(_ref2) {
  var state = _ref2.state,
    options = _ref2.options;
  var _options$element = options.element,
    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
  if (arrowElement == null) {
    return;
  } // CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!(0, _contains.default)(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};
},{"../utils/getBasePlacement.js":"yLpD","../dom-utils/getLayoutRect.js":"bgU0","../dom-utils/contains.js":"TozG","../dom-utils/getOffsetParent.js":"Mnay","../utils/getMainAxisFromPlacement.js":"w8hZ","../utils/within.js":"bTtH","../utils/mergePaddingObject.js":"YlSo","../utils/expandToHashMap.js":"ZqdX","../enums.js":"KwvA"}],"kB4N":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getVariation;
function getVariation(placement) {
  return placement.split('-')[1];
}
},{}],"p5kV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.mapToStyles = mapToStyles;
var _enums = require("../enums.js");
var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));
var _getWindow = _interopRequireDefault(require("../dom-utils/getWindow.js"));
var _getDocumentElement = _interopRequireDefault(require("../dom-utils/getDocumentElement.js"));
var _getComputedStyle = _interopRequireDefault(require("../dom-utils/getComputedStyle.js"));
var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));
var _getVariation = _interopRequireDefault(require("../utils/getVariation.js"));
var _math = require("../utils/math.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
    y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0, _math.round)(x * dpr) / dpr || 0,
    y: (0, _math.round)(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper = _ref2.popper,
    popperRect = _ref2.popperRect,
    placement = _ref2.placement,
    variation = _ref2.variation,
    offsets = _ref2.offsets,
    position = _ref2.position,
    gpuAcceleration = _ref2.gpuAcceleration,
    adaptive = _ref2.adaptive,
    roundOffsets = _ref2.roundOffsets,
    isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
    x = _offsets$x === void 0 ? 0 : _offsets$x,
    _offsets$y = offsets.y,
    y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums.left;
  var sideY = _enums.top;
  var win = window;
  if (adaptive) {
    var offsetParent = (0, _getOffsetParent.default)(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';
    if (offsetParent === (0, _getWindow.default)(popper)) {
      offsetParent = (0, _getDocumentElement.default)(popper);
      if ((0, _getComputedStyle.default)(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    offsetParent = offsetParent;
    if (placement === _enums.top || (placement === _enums.left || placement === _enums.right) && variation === _enums.end) {
      sideY = _enums.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height :
      // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === _enums.left || (placement === _enums.top || placement === _enums.bottom) && variation === _enums.end) {
      sideX = _enums.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width :
      // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, (0, _getWindow.default)(popper)) : {
    x: x,
    y: y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state,
    options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
    _options$adaptive = options.adaptive,
    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
    _options$roundOffsets = options.roundOffsets,
    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: (0, _getBasePlacement.default)(state.placement),
    variation: (0, _getVariation.default)(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};
},{"../enums.js":"KwvA","../dom-utils/getOffsetParent.js":"Mnay","../dom-utils/getWindow.js":"iP0B","../dom-utils/getDocumentElement.js":"iOCj","../dom-utils/getComputedStyle.js":"ro5C","../utils/getBasePlacement.js":"yLpD","../utils/getVariation.js":"kB4N","../utils/math.js":"oQre"}],"ugN3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getWindow = _interopRequireDefault(require("../dom-utils/getWindow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state,
    instance = _ref.instance,
    options = _ref.options;
  var _options$scroll = options.scroll,
    scroll = _options$scroll === void 0 ? true : _options$scroll,
    _options$resize = options.resize,
    resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0, _getWindow.default)(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }
  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }
  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }
    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};
},{"../dom-utils/getWindow.js":"iP0B"}],"hGEW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOppositePlacement;
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
},{}],"B4ze":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOppositeVariationPlacement;
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}
},{}],"aES8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindowScroll;
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getWindowScroll(node) {
  var win = (0, _getWindow.default)(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}
},{"./getWindow.js":"iP0B"}],"pET8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindowScrollBarX;
var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0, _getBoundingClientRect.default)((0, _getDocumentElement.default)(element)).left + (0, _getWindowScroll.default)(element).scrollLeft;
}
},{"./getBoundingClientRect.js":"btCD","./getDocumentElement.js":"iOCj","./getWindowScroll.js":"aES8"}],"uJtB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getViewportRect;
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _getWindowScrollBarX = _interopRequireDefault(require("./getWindowScrollBarX.js"));
var _isLayoutViewport = _interopRequireDefault(require("./isLayoutViewport.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getViewportRect(element, strategy) {
  var win = (0, _getWindow.default)(element);
  var html = (0, _getDocumentElement.default)(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0, _isLayoutViewport.default)();
    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width: width,
    height: height,
    x: x + (0, _getWindowScrollBarX.default)(element),
    y: y
  };
}
},{"./getWindow.js":"iP0B","./getDocumentElement.js":"iOCj","./getWindowScrollBarX.js":"pET8","./isLayoutViewport.js":"PUSM"}],"xGf3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDocumentRect;
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));
var _getWindowScrollBarX = _interopRequireDefault(require("./getWindowScrollBarX.js"));
var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));
var _math = require("../utils/math.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = (0, _getDocumentElement.default)(element);
  var winScroll = (0, _getWindowScroll.default)(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0, _math.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0, _math.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0, _getWindowScrollBarX.default)(element);
  var y = -winScroll.scrollTop;
  if ((0, _getComputedStyle.default)(body || html).direction === 'rtl') {
    x += (0, _math.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}
},{"./getDocumentElement.js":"iOCj","./getComputedStyle.js":"ro5C","./getWindowScrollBarX.js":"pET8","./getWindowScroll.js":"aES8","../utils/math.js":"oQre"}],"T26w":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isScrollParent;
var _getComputedStyle2 = _interopRequireDefault(require("./getComputedStyle.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0, _getComputedStyle2.default)(element),
    overflow = _getComputedStyle.overflow,
    overflowX = _getComputedStyle.overflowX,
    overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
},{"./getComputedStyle.js":"ro5C"}],"zGGS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScrollParent;
var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));
var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
var _instanceOf = require("./instanceOf.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0, _getNodeName.default)(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }
  if ((0, _instanceOf.isHTMLElement)(node) && (0, _isScrollParent.default)(node)) {
    return node;
  }
  return getScrollParent((0, _getParentNode.default)(node));
}
},{"./getParentNode.js":"Tyrb","./isScrollParent.js":"T26w","./getNodeName.js":"hqUe","./instanceOf.js":"lOVC"}],"inBY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = listScrollParents;
var _getScrollParent = _interopRequireDefault(require("./getScrollParent.js"));
var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = (0, _getScrollParent.default)(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0, _getWindow.default)(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0, _isScrollParent.default)(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList :
  // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0, _getParentNode.default)(target)));
}
},{"./getScrollParent.js":"zGGS","./getParentNode.js":"Tyrb","./getWindow.js":"iP0B","./isScrollParent.js":"T26w"}],"vA8j":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rectToClientRect;
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
},{}],"MtyE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClippingRect;
var _enums = require("../enums.js");
var _getViewportRect = _interopRequireDefault(require("./getViewportRect.js"));
var _getDocumentRect = _interopRequireDefault(require("./getDocumentRect.js"));
var _listScrollParents = _interopRequireDefault(require("./listScrollParents.js"));
var _getOffsetParent = _interopRequireDefault(require("./getOffsetParent.js"));
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));
var _instanceOf = require("./instanceOf.js");
var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));
var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));
var _contains = _interopRequireDefault(require("./contains.js"));
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
var _rectToClientRect = _interopRequireDefault(require("../utils/rectToClientRect.js"));
var _math = require("../utils/math.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getInnerBoundingClientRect(element, strategy) {
  var rect = (0, _getBoundingClientRect.default)(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums.viewport ? (0, _rectToClientRect.default)((0, _getViewportRect.default)(element, strategy)) : (0, _instanceOf.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0, _rectToClientRect.default)((0, _getDocumentRect.default)((0, _getDocumentElement.default)(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`

function getClippingParents(element) {
  var clippingParents = (0, _listScrollParents.default)((0, _getParentNode.default)(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0, _getComputedStyle.default)(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0, _instanceOf.isHTMLElement)(element) ? (0, _getOffsetParent.default)(element) : element;
  if (!(0, _instanceOf.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

  return clippingParents.filter(function (clippingParent) {
    return (0, _instanceOf.isElement)(clippingParent) && (0, _contains.default)(clippingParent, clipperElement) && (0, _getNodeName.default)(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents

function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0, _math.max)(rect.top, accRect.top);
    accRect.right = (0, _math.min)(rect.right, accRect.right);
    accRect.bottom = (0, _math.min)(rect.bottom, accRect.bottom);
    accRect.left = (0, _math.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
},{"../enums.js":"KwvA","./getViewportRect.js":"uJtB","./getDocumentRect.js":"xGf3","./listScrollParents.js":"inBY","./getOffsetParent.js":"Mnay","./getDocumentElement.js":"iOCj","./getComputedStyle.js":"ro5C","./instanceOf.js":"lOVC","./getBoundingClientRect.js":"btCD","./getParentNode.js":"Tyrb","./contains.js":"TozG","./getNodeName.js":"hqUe","../utils/rectToClientRect.js":"vA8j","../utils/math.js":"oQre"}],"HyU9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeOffsets;
var _getBasePlacement = _interopRequireDefault(require("./getBasePlacement.js"));
var _getVariation = _interopRequireDefault(require("./getVariation.js"));
var _getMainAxisFromPlacement = _interopRequireDefault(require("./getMainAxisFromPlacement.js"));
var _enums = require("../enums.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function computeOffsets(_ref) {
  var reference = _ref.reference,
    element = _ref.element,
    placement = _ref.placement;
  var basePlacement = placement ? (0, _getBasePlacement.default)(placement) : null;
  var variation = placement ? (0, _getVariation.default)(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case _enums.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;
    case _enums.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case _enums.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case _enums.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }
  var mainAxis = basePlacement ? (0, _getMainAxisFromPlacement.default)(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';
    switch (variation) {
      case _enums.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;
      case _enums.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}
},{"./getBasePlacement.js":"yLpD","./getVariation.js":"kB4N","./getMainAxisFromPlacement.js":"w8hZ","../enums.js":"KwvA"}],"lMQv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectOverflow;
var _getClippingRect = _interopRequireDefault(require("../dom-utils/getClippingRect.js"));
var _getDocumentElement = _interopRequireDefault(require("../dom-utils/getDocumentElement.js"));
var _getBoundingClientRect = _interopRequireDefault(require("../dom-utils/getBoundingClientRect.js"));
var _computeOffsets = _interopRequireDefault(require("./computeOffsets.js"));
var _rectToClientRect = _interopRequireDefault(require("./rectToClientRect.js"));
var _enums = require("../enums.js");
var _instanceOf = require("../dom-utils/instanceOf.js");
var _mergePaddingObject = _interopRequireDefault(require("./mergePaddingObject.js"));
var _expandToHashMap = _interopRequireDefault(require("./expandToHashMap.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    _options$placement = _options.placement,
    placement = _options$placement === void 0 ? state.placement : _options$placement,
    _options$strategy = _options.strategy,
    strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
    _options$boundary = _options.boundary,
    boundary = _options$boundary === void 0 ? _enums.clippingParents : _options$boundary,
    _options$rootBoundary = _options.rootBoundary,
    rootBoundary = _options$rootBoundary === void 0 ? _enums.viewport : _options$rootBoundary,
    _options$elementConte = _options.elementContext,
    elementContext = _options$elementConte === void 0 ? _enums.popper : _options$elementConte,
    _options$altBoundary = _options.altBoundary,
    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
    _options$padding = _options.padding,
    padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0, _mergePaddingObject.default)(typeof padding !== 'number' ? padding : (0, _expandToHashMap.default)(padding, _enums.basePlacements));
  var altContext = elementContext === _enums.popper ? _enums.reference : _enums.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0, _getClippingRect.default)((0, _instanceOf.isElement)(element) ? element : element.contextElement || (0, _getDocumentElement.default)(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0, _getBoundingClientRect.default)(state.elements.reference);
  var popperOffsets = (0, _computeOffsets.default)({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0, _rectToClientRect.default)(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums.right, _enums.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums.top, _enums.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }
  return overflowOffsets;
}
},{"../dom-utils/getClippingRect.js":"MtyE","../dom-utils/getDocumentElement.js":"iOCj","../dom-utils/getBoundingClientRect.js":"btCD","./computeOffsets.js":"HyU9","./rectToClientRect.js":"vA8j","../enums.js":"KwvA","../dom-utils/instanceOf.js":"lOVC","./mergePaddingObject.js":"YlSo","./expandToHashMap.js":"ZqdX"}],"YB6F":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeAutoPlacement;
var _getVariation = _interopRequireDefault(require("./getVariation.js"));
var _enums = require("../enums.js");
var _detectOverflow = _interopRequireDefault(require("./detectOverflow.js"));
var _getBasePlacement = _interopRequireDefault(require("./getBasePlacement.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    placement = _options.placement,
    boundary = _options.boundary,
    rootBoundary = _options.rootBoundary,
    padding = _options.padding,
    flipVariations = _options.flipVariations,
    _options$allowedAutoP = _options.allowedAutoPlacements,
    allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums.placements : _options$allowedAutoP;
  var variation = (0, _getVariation.default)(placement);
  var placements = variation ? flipVariations ? _enums.variationPlacements : _enums.variationPlacements.filter(function (placement) {
    return (0, _getVariation.default)(placement) === variation;
  }) : _enums.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0, _detectOverflow.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0, _getBasePlacement.default)(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}
},{"./getVariation.js":"kB4N","../enums.js":"KwvA","./detectOverflow.js":"lMQv","./getBasePlacement.js":"yLpD"}],"sjJD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getOppositePlacement = _interopRequireDefault(require("../utils/getOppositePlacement.js"));
var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));
var _getOppositeVariationPlacement = _interopRequireDefault(require("../utils/getOppositeVariationPlacement.js"));
var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));
var _computeAutoPlacement = _interopRequireDefault(require("../utils/computeAutoPlacement.js"));
var _enums = require("../enums.js");
var _getVariation = _interopRequireDefault(require("../utils/getVariation.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0, _getBasePlacement.default)(placement) === _enums.auto) {
    return [];
  }
  var oppositePlacement = (0, _getOppositePlacement.default)(placement);
  return [(0, _getOppositeVariationPlacement.default)(placement), oppositePlacement, (0, _getOppositeVariationPlacement.default)(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
    specifiedFallbackPlacements = options.fallbackPlacements,
    padding = options.padding,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    _options$flipVariatio = options.flipVariations,
    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
    allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0, _getBasePlacement.default)(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0, _getOppositePlacement.default)(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0, _getBasePlacement.default)(placement) === _enums.auto ? (0, _computeAutoPlacement.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];
  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];
    var _basePlacement = (0, _getBasePlacement.default)(placement);
    var isStartVariation = (0, _getVariation.default)(placement) === _enums.start;
    var isVertical = [_enums.top, _enums.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0, _detectOverflow.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums.right : _enums.left : isStartVariation ? _enums.bottom : _enums.top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0, _getOppositePlacement.default)(mainVariationSide);
    }
    var altVariationSide = (0, _getOppositePlacement.default)(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);
        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};
},{"../utils/getOppositePlacement.js":"hGEW","../utils/getBasePlacement.js":"yLpD","../utils/getOppositeVariationPlacement.js":"B4ze","../utils/detectOverflow.js":"lMQv","../utils/computeAutoPlacement.js":"YB6F","../enums.js":"KwvA","../utils/getVariation.js":"kB4N"}],"T3oQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _enums = require("../enums.js");
var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [_enums.top, _enums.right, _enums.bottom, _enums.left].some(function (side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state,
    name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0, _detectOverflow.default)(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0, _detectOverflow.default)(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};
},{"../enums.js":"KwvA","../utils/detectOverflow.js":"lMQv"}],"YSdh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.distanceAndSkiddingToXY = distanceAndSkiddingToXY;
var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));
var _enums = require("../enums.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0, _getBasePlacement.default)(placement);
  var invertDistance = [_enums.left, _enums.top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
    skidding = _ref[0],
    distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums.left, _enums.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state,
    options = _ref2.options,
    name = _ref2.name;
  var _options$offset = options.offset,
    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
    x = _data$state$placement.x,
    y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};
},{"../utils/getBasePlacement.js":"yLpD","../enums.js":"KwvA"}],"KKNB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _computeOffsets = _interopRequireDefault(require("../utils/computeOffsets.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function popperOffsets(_ref) {
  var state = _ref.state,
    name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0, _computeOffsets.default)({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};
},{"../utils/computeOffsets.js":"HyU9"}],"lz0w":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAltAxis;
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
},{}],"T716":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _enums = require("../enums.js");
var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));
var _getMainAxisFromPlacement = _interopRequireDefault(require("../utils/getMainAxisFromPlacement.js"));
var _getAltAxis = _interopRequireDefault(require("../utils/getAltAxis.js"));
var _within = require("../utils/within.js");
var _getLayoutRect = _interopRequireDefault(require("../dom-utils/getLayoutRect.js"));
var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));
var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));
var _getVariation = _interopRequireDefault(require("../utils/getVariation.js"));
var _getFreshSideObject = _interopRequireDefault(require("../utils/getFreshSideObject.js"));
var _math = require("../utils/math.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function preventOverflow(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;
  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    padding = options.padding,
    _options$tether = options.tether,
    tether = _options$tether === void 0 ? true : _options$tether,
    _options$tetherOffset = options.tetherOffset,
    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0, _detectOverflow.default)(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0, _getBasePlacement.default)(state.placement);
  var variation = (0, _getVariation.default)(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0, _getMainAxisFromPlacement.default)(basePlacement);
  var altAxis = (0, _getAltAxis.default)(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === 'y' ? _enums.top : _enums.left;
    var altSide = mainAxis === 'y' ? _enums.bottom : _enums.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0, _getLayoutRect.default)(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0, _getFreshSideObject.default)();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0, _within.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0, _getOffsetParent.default)(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0, _within.within)(tether ? (0, _math.min)(min, tetherMin) : min, offset, tether ? (0, _math.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === 'x' ? _enums.top : _enums.left;
    var _altSide = mainAxis === 'x' ? _enums.bottom : _enums.right;
    var _offset = popperOffsets[altAxis];
    var _len = altAxis === 'y' ? 'height' : 'width';
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [_enums.top, _enums.left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? (0, _within.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0, _within.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};
},{"../enums.js":"KwvA","../utils/getBasePlacement.js":"yLpD","../utils/getMainAxisFromPlacement.js":"w8hZ","../utils/getAltAxis.js":"lz0w","../utils/within.js":"bTtH","../dom-utils/getLayoutRect.js":"bgU0","../dom-utils/getOffsetParent.js":"Mnay","../utils/detectOverflow.js":"lMQv","../utils/getVariation.js":"kB4N","../utils/getFreshSideObject.js":"R9OA","../utils/math.js":"oQre"}],"afdv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "applyStyles", {
  enumerable: true,
  get: function () {
    return _applyStyles.default;
  }
});
Object.defineProperty(exports, "arrow", {
  enumerable: true,
  get: function () {
    return _arrow.default;
  }
});
Object.defineProperty(exports, "computeStyles", {
  enumerable: true,
  get: function () {
    return _computeStyles.default;
  }
});
Object.defineProperty(exports, "eventListeners", {
  enumerable: true,
  get: function () {
    return _eventListeners.default;
  }
});
Object.defineProperty(exports, "flip", {
  enumerable: true,
  get: function () {
    return _flip.default;
  }
});
Object.defineProperty(exports, "hide", {
  enumerable: true,
  get: function () {
    return _hide.default;
  }
});
Object.defineProperty(exports, "offset", {
  enumerable: true,
  get: function () {
    return _offset.default;
  }
});
Object.defineProperty(exports, "popperOffsets", {
  enumerable: true,
  get: function () {
    return _popperOffsets.default;
  }
});
Object.defineProperty(exports, "preventOverflow", {
  enumerable: true,
  get: function () {
    return _preventOverflow.default;
  }
});
var _applyStyles = _interopRequireDefault(require("./applyStyles.js"));
var _arrow = _interopRequireDefault(require("./arrow.js"));
var _computeStyles = _interopRequireDefault(require("./computeStyles.js"));
var _eventListeners = _interopRequireDefault(require("./eventListeners.js"));
var _flip = _interopRequireDefault(require("./flip.js"));
var _hide = _interopRequireDefault(require("./hide.js"));
var _offset = _interopRequireDefault(require("./offset.js"));
var _popperOffsets = _interopRequireDefault(require("./popperOffsets.js"));
var _preventOverflow = _interopRequireDefault(require("./preventOverflow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./applyStyles.js":"pu4Q","./arrow.js":"T3Ag","./computeStyles.js":"p5kV","./eventListeners.js":"ugN3","./flip.js":"sjJD","./hide.js":"T3oQ","./offset.js":"YSdh","./popperOffsets.js":"KKNB","./preventOverflow.js":"T716"}],"MDXK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHTMLElementScroll;
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
},{}],"ISrc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeScroll;
var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
var _instanceOf = require("./instanceOf.js");
var _getHTMLElementScroll = _interopRequireDefault(require("./getHTMLElementScroll.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getNodeScroll(node) {
  if (node === (0, _getWindow.default)(node) || !(0, _instanceOf.isHTMLElement)(node)) {
    return (0, _getWindowScroll.default)(node);
  } else {
    return (0, _getHTMLElementScroll.default)(node);
  }
}
},{"./getWindowScroll.js":"aES8","./getWindow.js":"iP0B","./instanceOf.js":"lOVC","./getHTMLElementScroll.js":"MDXK"}],"At1X":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCompositeRect;
var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));
var _getNodeScroll = _interopRequireDefault(require("./getNodeScroll.js"));
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
var _instanceOf = require("./instanceOf.js");
var _getWindowScrollBarX = _interopRequireDefault(require("./getWindowScrollBarX.js"));
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));
var _math = require("../utils/math.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0, _math.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0, _math.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = (0, _instanceOf.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0, _instanceOf.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0, _getDocumentElement.default)(offsetParent);
  var rect = (0, _getBoundingClientRect.default)(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0, _getNodeName.default)(offsetParent) !== 'body' ||
    // https://github.com/popperjs/popper-core/issues/1078
    (0, _isScrollParent.default)(documentElement)) {
      scroll = (0, _getNodeScroll.default)(offsetParent);
    }
    if ((0, _instanceOf.isHTMLElement)(offsetParent)) {
      offsets = (0, _getBoundingClientRect.default)(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0, _getWindowScrollBarX.default)(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
},{"./getBoundingClientRect.js":"btCD","./getNodeScroll.js":"ISrc","./getNodeName.js":"hqUe","./instanceOf.js":"lOVC","./getWindowScrollBarX.js":"pET8","./getDocumentElement.js":"iOCj","./isScrollParent.js":"T26w","../utils/math.js":"oQre"}],"ND1T":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = orderModifiers;
var _enums = require("../enums.js");
// source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
},{"../enums.js":"KwvA"}],"dSl1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }
    return pending;
  };
}
},{}],"r9N4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeByName;
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}
},{}],"hLbv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPopper = void 0;
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _detectOverflow.default;
  }
});
exports.popperGenerator = popperGenerator;
var _getCompositeRect = _interopRequireDefault(require("./dom-utils/getCompositeRect.js"));
var _getLayoutRect = _interopRequireDefault(require("./dom-utils/getLayoutRect.js"));
var _listScrollParents = _interopRequireDefault(require("./dom-utils/listScrollParents.js"));
var _getOffsetParent = _interopRequireDefault(require("./dom-utils/getOffsetParent.js"));
var _orderModifiers = _interopRequireDefault(require("./utils/orderModifiers.js"));
var _debounce = _interopRequireDefault(require("./utils/debounce.js"));
var _mergeByName = _interopRequireDefault(require("./utils/mergeByName.js"));
var _detectOverflow = _interopRequireDefault(require("./utils/detectOverflow.js"));
var _instanceOf = require("./dom-utils/instanceOf.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions,
    _generatorOptions$def = _generatorOptions.defaultModifiers,
    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
    _generatorOptions$def2 = _generatorOptions.defaultOptions,
    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0, _instanceOf.isElement)(reference) ? (0, _listScrollParents.default)(reference) : reference.contextElement ? (0, _listScrollParents.default)(reference.contextElement) : [],
          popper: (0, _listScrollParents.default)(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0, _orderModifiers.default)((0, _mergeByName.default)([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements,
          reference = _state$elements.reference,
          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          return;
        } // Store the reference and popper rects to be read by modifiers

        state.rects = {
          reference: (0, _getCompositeRect.default)(reference, (0, _getOffsetParent.default)(popper), state.options.strategy === 'fixed'),
          popper: (0, _getLayoutRect.default)(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index],
            fn = _state$orderedModifie.fn,
            _state$orderedModifie2 = _state$orderedModifie.options,
            _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
            name = _state$orderedModifie.name;
          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0, _debounce.default)(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference, popper)) {
      return instance;
    }
    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref) {
        var name = _ref.name,
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options,
          effect = _ref.effect;
        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });
          var noopFn = function noopFn() {};
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = exports.createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules
},{"./dom-utils/getCompositeRect.js":"At1X","./dom-utils/getLayoutRect.js":"bgU0","./dom-utils/listScrollParents.js":"inBY","./dom-utils/getOffsetParent.js":"Mnay","./utils/orderModifiers.js":"ND1T","./utils/debounce.js":"dSl1","./utils/mergeByName.js":"r9N4","./utils/detectOverflow.js":"lMQv","./dom-utils/instanceOf.js":"lOVC"}],"DvPc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultModifiers = exports.createPopper = void 0;
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _createPopper.detectOverflow;
  }
});
Object.defineProperty(exports, "popperGenerator", {
  enumerable: true,
  get: function () {
    return _createPopper.popperGenerator;
  }
});
var _createPopper = require("./createPopper.js");
var _eventListeners = _interopRequireDefault(require("./modifiers/eventListeners.js"));
var _popperOffsets = _interopRequireDefault(require("./modifiers/popperOffsets.js"));
var _computeStyles = _interopRequireDefault(require("./modifiers/computeStyles.js"));
var _applyStyles = _interopRequireDefault(require("./modifiers/applyStyles.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var defaultModifiers = exports.defaultModifiers = [_eventListeners.default, _popperOffsets.default, _computeStyles.default, _applyStyles.default];
var createPopper = exports.createPopper = /*#__PURE__*/(0, _createPopper.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules
},{"./createPopper.js":"hLbv","./modifiers/eventListeners.js":"ugN3","./modifiers/popperOffsets.js":"KKNB","./modifiers/computeStyles.js":"p5kV","./modifiers/applyStyles.js":"pu4Q"}],"xbYU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createPopper: true,
  defaultModifiers: true,
  popperGenerator: true,
  detectOverflow: true,
  createPopperLite: true
};
exports.createPopper = void 0;
Object.defineProperty(exports, "createPopperLite", {
  enumerable: true,
  get: function () {
    return _popperLite.createPopper;
  }
});
exports.defaultModifiers = void 0;
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _createPopper.detectOverflow;
  }
});
Object.defineProperty(exports, "popperGenerator", {
  enumerable: true,
  get: function () {
    return _createPopper.popperGenerator;
  }
});
var _createPopper = require("./createPopper.js");
var _eventListeners = _interopRequireDefault(require("./modifiers/eventListeners.js"));
var _popperOffsets = _interopRequireDefault(require("./modifiers/popperOffsets.js"));
var _computeStyles = _interopRequireDefault(require("./modifiers/computeStyles.js"));
var _applyStyles = _interopRequireDefault(require("./modifiers/applyStyles.js"));
var _offset = _interopRequireDefault(require("./modifiers/offset.js"));
var _flip = _interopRequireDefault(require("./modifiers/flip.js"));
var _preventOverflow = _interopRequireDefault(require("./modifiers/preventOverflow.js"));
var _arrow = _interopRequireDefault(require("./modifiers/arrow.js"));
var _hide = _interopRequireDefault(require("./modifiers/hide.js"));
var _popperLite = require("./popper-lite.js");
var _index = require("./modifiers/index.js");
Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var defaultModifiers = exports.defaultModifiers = [_eventListeners.default, _popperOffsets.default, _computeStyles.default, _applyStyles.default, _offset.default, _flip.default, _preventOverflow.default, _arrow.default, _hide.default];
var createPopper = exports.createPopper = /*#__PURE__*/(0, _createPopper.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

// eslint-disable-next-line import/no-unused-modules

// eslint-disable-next-line import/no-unused-modules
},{"./createPopper.js":"hLbv","./modifiers/eventListeners.js":"ugN3","./modifiers/popperOffsets.js":"KKNB","./modifiers/computeStyles.js":"p5kV","./modifiers/applyStyles.js":"pu4Q","./modifiers/offset.js":"YSdh","./modifiers/flip.js":"sjJD","./modifiers/preventOverflow.js":"T716","./modifiers/arrow.js":"T3Ag","./modifiers/hide.js":"T3oQ","./popper-lite.js":"DvPc","./modifiers/index.js":"afdv"}],"S1OH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  popperGenerator: true,
  detectOverflow: true,
  createPopperBase: true,
  createPopper: true,
  createPopperLite: true
};
Object.defineProperty(exports, "createPopper", {
  enumerable: true,
  get: function () {
    return _popper.createPopper;
  }
});
Object.defineProperty(exports, "createPopperBase", {
  enumerable: true,
  get: function () {
    return _createPopper.createPopper;
  }
});
Object.defineProperty(exports, "createPopperLite", {
  enumerable: true,
  get: function () {
    return _popperLite.createPopper;
  }
});
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _createPopper.detectOverflow;
  }
});
Object.defineProperty(exports, "popperGenerator", {
  enumerable: true,
  get: function () {
    return _createPopper.popperGenerator;
  }
});
var _enums = require("./enums.js");
Object.keys(_enums).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _enums[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _enums[key];
    }
  });
});
var _index = require("./modifiers/index.js");
Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
var _createPopper = require("./createPopper.js");
var _popper = require("./popper.js");
var _popperLite = require("./popper-lite.js");
},{"./enums.js":"KwvA","./modifiers/index.js":"afdv","./createPopper.js":"hLbv","./popper.js":"xbYU","./popper-lite.js":"DvPc"}],"XhER":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = exports.Toast = exports.Tab = exports.ScrollSpy = exports.Popover = exports.Offcanvas = exports.Modal = exports.Dropdown = exports.Collapse = exports.Carousel = exports.Button = exports.Alert = void 0;
var Popper = _interopRequireWildcard(require("@popperjs/core"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const elementMap = new Map();
const Data = {
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }
    const instanceMap = elementMap.get(element);

    // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used
    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
      return;
    }
    instanceMap.set(key, instance);
  },
  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }
    return null;
  },
  remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }
    const instanceMap = elementMap.get(element);
    instanceMap.delete(key);

    // free up element references if there are no instances left for an element
    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const MAX_UID = 1000000;
const MILLISECONDS_MULTIPLIER = 1000;
const TRANSITION_END = 'transitionend';

/**
 * Properly escape IDs selectors to handle weird IDs
 * @param {string} selector
 * @returns {string}
 */
const parseSelector = selector => {
  if (selector && window.CSS && window.CSS.escape) {
    // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
    selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
  }
  return selector;
};

// Shout-out Angus Croll (https://goo.gl/pxwQGp)
const toType = object => {
  if (object === null || object === undefined) {
    return `${object}`;
  }
  return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
};

/**
 * Public Util API
 */

const getUID = prefix => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));
  return prefix;
};
const getTransitionDurationFromElement = element => {
  if (!element) {
    return 0;
  }

  // Get transition-duration of the element
  let {
    transitionDuration,
    transitionDelay
  } = window.getComputedStyle(element);
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay);

  // Return 0 if element or transition duration is not found
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }

  // If multiple durations are defined, take the first
  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};
const triggerTransitionEnd = element => {
  element.dispatchEvent(new Event(TRANSITION_END));
};
const isElement = object => {
  if (!object || typeof object !== 'object') {
    return false;
  }
  if (typeof object.jquery !== 'undefined') {
    object = object[0];
  }
  return typeof object.nodeType !== 'undefined';
};
const getElement = object => {
  // it's a jQuery object or a node element
  if (isElement(object)) {
    return object.jquery ? object[0] : object;
  }
  if (typeof object === 'string' && object.length > 0) {
    return document.querySelector(parseSelector(object));
  }
  return null;
};
const isVisible = element => {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false;
  }
  const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  // Handle `details` element as its content may falsie appear visible when it is closed
  const closedDetails = element.closest('details:not([open])');
  if (!closedDetails) {
    return elementIsVisible;
  }
  if (closedDetails !== element) {
    const summary = element.closest('summary');
    if (summary && summary.parentNode !== closedDetails) {
      return false;
    }
    if (summary === null) {
      return false;
    }
  }
  return elementIsVisible;
};
const isDisabled = element => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }
  if (element.classList.contains('disabled')) {
    return true;
  }
  if (typeof element.disabled !== 'undefined') {
    return element.disabled;
  }
  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
};
const findShadowRoot = element => {
  if (!document.documentElement.attachShadow) {
    return null;
  }

  // Can find the shadow root otherwise it'll return the document
  if (typeof element.getRootNode === 'function') {
    const root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }
  if (element instanceof ShadowRoot) {
    return element;
  }

  // when we don't find a shadow root
  if (!element.parentNode) {
    return null;
  }
  return findShadowRoot(element.parentNode);
};
const noop = () => {};

/**
 * Trick to restart an element's animation
 *
 * @param {HTMLElement} element
 * @return void
 *
 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */
const reflow = element => {
  element.offsetHeight; // eslint-disable-line no-unused-expressions
};
const getjQuery = () => {
  if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    return window.jQuery;
  }
  return null;
};
const DOMContentLoadedCallbacks = [];
const onDOMContentLoaded = callback => {
  if (document.readyState === 'loading') {
    // add listener on the first call when the document is in loading state
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', () => {
        for (const callback of DOMContentLoadedCallbacks) {
          callback();
        }
      });
    }
    DOMContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};
const isRTL = () => document.documentElement.dir === 'rtl';
const defineJQueryPlugin = plugin => {
  onDOMContentLoaded(() => {
    const $ = getjQuery();
    /* istanbul ignore if */
    if ($) {
      const name = plugin.NAME;
      const JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin.jQueryInterface;
      $.fn[name].Constructor = plugin;
      $.fn[name].noConflict = () => {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};
const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
  return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue;
};
const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
  if (!waitForTransition) {
    execute(callback);
    return;
  }
  const durationPadding = 5;
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  let called = false;
  const handler = ({
    target
  }) => {
    if (target !== transitionElement) {
      return;
    }
    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };
  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};

/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */
const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
  const listLength = list.length;
  let index = list.indexOf(activeElement);

  // if the element does not exist in the list return an element
  // depending on the direction and if cycle is allowed
  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
  }
  index += shouldGetNext ? 1 : -1;
  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }
  return list[Math.max(0, Math.min(index, listLength - 1))];
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
const stripNameRegex = /\..*/;
const stripUidRegex = /::\d+$/;
const eventRegistry = {}; // Events storage
let uidEvent = 1;
const customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

/**
 * Private methods
 */

function makeEventUid(element, uid) {
  return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
}
function getElementEvents(element) {
  const uid = makeEventUid(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}
function bootstrapHandler(element, fn) {
  return function handler(event) {
    hydrateObj(event, {
      delegateTarget: element
    });
    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn);
    }
    return fn.apply(element, [event]);
  };
}
function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    const domElements = element.querySelectorAll(selector);
    for (let {
      target
    } = event; target && target !== this; target = target.parentNode) {
      for (const domElement of domElements) {
        if (domElement !== target) {
          continue;
        }
        hydrateObj(event, {
          delegateTarget: target
        });
        if (handler.oneOff) {
          EventHandler.off(element, event.type, selector, fn);
        }
        return fn.apply(target, [event]);
      }
    }
  };
}
function findHandler(events, callable, delegationSelector = null) {
  return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
}
function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
  const isDelegated = typeof handler === 'string';
  // TODO: tooltip passes `false` instead of selector, so we need to check
  const callable = isDelegated ? delegationFunction : handler || delegationFunction;
  let typeEvent = getTypeEvent(originalTypeEvent);
  if (!nativeEvents.has(typeEvent)) {
    typeEvent = originalTypeEvent;
  }
  return [isDelegated, callable, typeEvent];
}
function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return;
  }
  let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

  // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
  // this prevents the handler from being dispatched the same way as mouseover or mouseout does
  if (originalTypeEvent in customEvents) {
    const wrapFunction = fn => {
      return function (event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn.call(this, event);
        }
      };
    };
    callable = wrapFunction(callable);
  }
  const events = getElementEvents(element);
  const handlers = events[typeEvent] || (events[typeEvent] = {});
  const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
  if (previousFunction) {
    previousFunction.oneOff = previousFunction.oneOff && oneOff;
    return;
  }
  const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
  const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
  fn.delegationSelector = isDelegated ? handler : null;
  fn.callable = callable;
  fn.oneOff = oneOff;
  fn.uidEvent = uid;
  handlers[uid] = fn;
  element.addEventListener(typeEvent, fn, isDelegated);
}
function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  const fn = findHandler(events[typeEvent], handler, delegationSelector);
  if (!fn) {
    return;
  }
  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
  delete events[typeEvent][fn.uidEvent];
}
function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {};
  for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
    if (handlerKey.includes(namespace)) {
      removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    }
  }
}
function getTypeEvent(event) {
  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  event = event.replace(stripNameRegex, '');
  return customEvents[event] || event;
}
const EventHandler = {
  on(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, false);
  },
  one(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, true);
  },
  off(element, originalTypeEvent, handler, delegationFunction) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }
    const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    const inNamespace = typeEvent !== originalTypeEvent;
    const events = getElementEvents(element);
    const storeElementEvent = events[typeEvent] || {};
    const isNamespace = originalTypeEvent.startsWith('.');
    if (typeof callable !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!Object.keys(storeElementEvent).length) {
        return;
      }
      removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
      return;
    }
    if (isNamespace) {
      for (const elementEvent of Object.keys(events)) {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      }
    }
    for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
      const handlerKey = keyHandlers.replace(stripUidRegex, '');
      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  },
  trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null;
    }
    const $ = getjQuery();
    const typeEvent = getTypeEvent(event);
    const inNamespace = event !== typeEvent;
    let jQueryEvent = null;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }
    const evt = hydrateObj(new Event(event, {
      bubbles,
      cancelable: true
    }), args);
    if (defaultPrevented) {
      evt.preventDefault();
    }
    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }
    if (evt.defaultPrevented && jQueryEvent) {
      jQueryEvent.preventDefault();
    }
    return evt;
  }
};
function hydrateObj(obj, meta = {}) {
  for (const [key, value] of Object.entries(meta)) {
    try {
      obj[key] = value;
    } catch (_unused) {
      Object.defineProperty(obj, key, {
        configurable: true,
        get() {
          return value;
        }
      });
    }
  }
  return obj;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

function normalizeData(value) {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (value === Number(value).toString()) {
    return Number(value);
  }
  if (value === '' || value === 'null') {
    return null;
  }
  if (typeof value !== 'string') {
    return value;
  }
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch (_unused) {
    return value;
  }
}
function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
}
const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
  },
  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
  },
  getDataAttributes(element) {
    if (!element) {
      return {};
    }
    const attributes = {};
    const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
    for (const key of bsKeys) {
      let pureKey = key.replace(/^bs/, '');
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    }
    return attributes;
  },
  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/config.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Class definition
 */

class Config {
  // Getters
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    return config;
  }
  _mergeConfigObj(config, element) {
    const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

    return {
      ...this.constructor.Default,
      ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
      ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
      ...(typeof config === 'object' ? config : {})
    };
  }
  _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
    for (const [property, expectedTypes] of Object.entries(configTypes)) {
      const value = config[property];
      const valueType = isElement(value) ? 'element' : toType(value);
      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
      }
    }
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const VERSION = '5.3.3';

/**
 * Class definition
 */

class BaseComponent extends Config {
  constructor(element, config) {
    super();
    element = getElement(element);
    if (!element) {
      return;
    }
    this._element = element;
    this._config = this._getConfig(config);
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }

  // Public
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, this.constructor.EVENT_KEY);
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      this[propertyName] = null;
    }
  }
  _queueCallback(callback, element, isAnimated = true) {
    executeAfterTransition(callback, element, isAnimated);
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config, this._element);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }

  // Static
  static getInstance(element) {
    return Data.get(getElement(element), this.DATA_KEY);
  }
  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
  }
  static get VERSION() {
    return VERSION;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(name) {
    return `${name}${this.EVENT_KEY}`;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const getSelector = element => {
  let selector = element.getAttribute('data-bs-target');
  if (!selector || selector === '#') {
    let hrefAttribute = element.getAttribute('href');

    // The only valid content that could double as a selector are IDs or classes,
    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    // `document.querySelector` will rightfully complain it is invalid.
    // See https://github.com/twbs/bootstrap/issues/32273
    if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
      return null;
    }

    // Just in case some CMS puts out a full URL with the anchor appended
    if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
      hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
    }
    selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
  }
  return selector ? selector.split(',').map(sel => parseSelector(sel)).join(',') : null;
};
const SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
  },
  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector);
  },
  children(element, selector) {
    return [].concat(...element.children).filter(child => child.matches(selector));
  },
  parents(element, selector) {
    const parents = [];
    let ancestor = element.parentNode.closest(selector);
    while (ancestor) {
      parents.push(ancestor);
      ancestor = ancestor.parentNode.closest(selector);
    }
    return parents;
  },
  prev(element, selector) {
    let previous = element.previousElementSibling;
    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }
      previous = previous.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(element, selector) {
    let next = element.nextElementSibling;
    while (next) {
      if (next.matches(selector)) {
        return [next];
      }
      next = next.nextElementSibling;
    }
    return [];
  },
  focusableChildren(element) {
    const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
    return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
  },
  getSelectorFromElement(element) {
    const selector = getSelector(element);
    if (selector) {
      return SelectorEngine.findOne(selector) ? selector : null;
    }
    return null;
  },
  getElementFromSelector(element) {
    const selector = getSelector(element);
    return selector ? SelectorEngine.findOne(selector) : null;
  },
  getMultipleElementsFromSelector(element) {
    const selector = getSelector(element);
    return selector ? SelectorEngine.find(selector) : [];
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/component-functions.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const enableDismissTrigger = (component, method = 'hide') => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`;
  const name = component.NAME;
  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
    const instance = component.getOrCreateInstance(target);

    // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
    instance[method]();
  });
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$f = 'alert';
const DATA_KEY$a = 'bs.alert';
const EVENT_KEY$b = `.${DATA_KEY$a}`;
const EVENT_CLOSE = `close${EVENT_KEY$b}`;
const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
const CLASS_NAME_FADE$5 = 'fade';
const CLASS_NAME_SHOW$8 = 'show';

/**
 * Class definition
 */

class Alert extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$f;
  }

  // Public
  close() {
    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
    if (closeEvent.defaultPrevented) {
      return;
    }
    this._element.classList.remove(CLASS_NAME_SHOW$8);
    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
    this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
  }

  // Private
  _destroyElement() {
    this._element.remove();
    EventHandler.trigger(this._element, EVENT_CLOSED);
    this.dispose();
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Alert.getOrCreateInstance(this);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}

/**
 * Data API implementation
 */
exports.Alert = Alert;
enableDismissTrigger(Alert, 'close');

/**
 * jQuery
 */

defineJQueryPlugin(Alert);

/**
 * --------------------------------------------------------------------------
 * Bootstrap button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$e = 'button';
const DATA_KEY$9 = 'bs.button';
const EVENT_KEY$a = `.${DATA_KEY$9}`;
const DATA_API_KEY$6 = '.data-api';
const CLASS_NAME_ACTIVE$3 = 'active';
const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;

/**
 * Class definition
 */

class Button extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$e;
  }

  // Public
  toggle() {
    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Button.getOrCreateInstance(this);
      if (config === 'toggle') {
        data[config]();
      }
    });
  }
}

/**
 * Data API implementation
 */
exports.Button = Button;
EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
  event.preventDefault();
  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  const data = Button.getOrCreateInstance(button);
  data.toggle();
});

/**
 * jQuery
 */

defineJQueryPlugin(Button);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/swipe.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$d = 'swipe';
const EVENT_KEY$9 = '.bs.swipe';
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
const POINTER_TYPE_TOUCH = 'touch';
const POINTER_TYPE_PEN = 'pen';
const CLASS_NAME_POINTER_EVENT = 'pointer-event';
const SWIPE_THRESHOLD = 40;
const Default$c = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
};
const DefaultType$c = {
  endCallback: '(function|null)',
  leftCallback: '(function|null)',
  rightCallback: '(function|null)'
};

/**
 * Class definition
 */

class Swipe extends Config {
  constructor(element, config) {
    super();
    this._element = element;
    if (!element || !Swipe.isSupported()) {
      return;
    }
    this._config = this._getConfig(config);
    this._deltaX = 0;
    this._supportPointerEvents = Boolean(window.PointerEvent);
    this._initEvents();
  }

  // Getters
  static get Default() {
    return Default$c;
  }
  static get DefaultType() {
    return DefaultType$c;
  }
  static get NAME() {
    return NAME$d;
  }

  // Public
  dispose() {
    EventHandler.off(this._element, EVENT_KEY$9);
  }

  // Private
  _start(event) {
    if (!this._supportPointerEvents) {
      this._deltaX = event.touches[0].clientX;
      return;
    }
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX;
    }
  }
  _end(event) {
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX - this._deltaX;
    }
    this._handleSwipe();
    execute(this._config.endCallback);
  }
  _move(event) {
    this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const absDeltaX = Math.abs(this._deltaX);
    if (absDeltaX <= SWIPE_THRESHOLD) {
      return;
    }
    const direction = absDeltaX / this._deltaX;
    this._deltaX = 0;
    if (!direction) {
      return;
    }
    execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    if (this._supportPointerEvents) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
      EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
      EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
      EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
    }
  }
  _eventIsPointerPenTouch(event) {
    return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
  }

  // Static
  static isSupported() {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$c = 'carousel';
const DATA_KEY$8 = 'bs.carousel';
const EVENT_KEY$8 = `.${DATA_KEY$8}`;
const DATA_API_KEY$5 = '.data-api';
const ARROW_LEFT_KEY$1 = 'ArrowLeft';
const ARROW_RIGHT_KEY$1 = 'ArrowRight';
const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

const ORDER_NEXT = 'next';
const ORDER_PREV = 'prev';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
const EVENT_SLID = `slid${EVENT_KEY$8}`;
const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
const CLASS_NAME_CAROUSEL = 'carousel';
const CLASS_NAME_ACTIVE$2 = 'active';
const CLASS_NAME_SLIDE = 'slide';
const CLASS_NAME_END = 'carousel-item-end';
const CLASS_NAME_START = 'carousel-item-start';
const CLASS_NAME_NEXT = 'carousel-item-next';
const CLASS_NAME_PREV = 'carousel-item-prev';
const SELECTOR_ACTIVE = '.active';
const SELECTOR_ITEM = '.carousel-item';
const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
const SELECTOR_ITEM_IMG = '.carousel-item img';
const SELECTOR_INDICATORS = '.carousel-indicators';
const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
const KEY_TO_DIRECTION = {
  [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
};
const Default$b = {
  interval: 5000,
  keyboard: true,
  pause: 'hover',
  ride: false,
  touch: true,
  wrap: true
};
const DefaultType$b = {
  interval: '(number|boolean)',
  // TODO:v6 remove boolean support
  keyboard: 'boolean',
  pause: '(string|boolean)',
  ride: '(boolean|string)',
  touch: 'boolean',
  wrap: 'boolean'
};

/**
 * Class definition
 */

class Carousel extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._interval = null;
    this._activeElement = null;
    this._isSliding = false;
    this.touchTimeout = null;
    this._swipeHelper = null;
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._addEventListeners();
    if (this._config.ride === CLASS_NAME_CAROUSEL) {
      this.cycle();
    }
  }

  // Getters
  static get Default() {
    return Default$b;
  }
  static get DefaultType() {
    return DefaultType$b;
  }
  static get NAME() {
    return NAME$c;
  }

  // Public
  next() {
    this._slide(ORDER_NEXT);
  }
  nextWhenVisible() {
    // FIXME TODO use `document.visibilityState`
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  }
  prev() {
    this._slide(ORDER_PREV);
  }
  pause() {
    if (this._isSliding) {
      triggerTransitionEnd(this._element);
    }
    this._clearInterval();
  }
  cycle() {
    this._clearInterval();
    this._updateInterval();
    this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (!this._config.ride) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
      return;
    }
    this.cycle();
  }
  to(index) {
    const items = this._getItems();
    if (index > items.length - 1 || index < 0) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
      return;
    }
    const activeIndex = this._getItemIndex(this._getActive());
    if (activeIndex === index) {
      return;
    }
    const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
    this._slide(order, items[index]);
  }
  dispose() {
    if (this._swipeHelper) {
      this._swipeHelper.dispose();
    }
    super.dispose();
  }

  // Private
  _configAfterMerge(config) {
    config.defaultInterval = config.interval;
    return config;
  }
  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
    }
    if (this._config.pause === 'hover') {
      EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
      EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
    }
    if (this._config.touch && Swipe.isSupported()) {
      this._addTouchEventListeners();
    }
  }
  _addTouchEventListeners() {
    for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
      EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
    }
    const endCallBack = () => {
      if (this._config.pause !== 'hover') {
        return;
      }

      // If it's a touch-enabled device, mouseenter/leave are fired as
      // part of the mouse compatibility events on first tap - the carousel
      // would stop cycling until user tapped out of it;
      // here, we listen for touchend, explicitly pause the carousel
      // (as if it's the second time we tap on it, mouseenter compat event
      // is NOT fired) and after a timeout (to allow for mouse compatibility
      // events to fire) we explicitly restart cycling

      this.pause();
      if (this.touchTimeout) {
        clearTimeout(this.touchTimeout);
      }
      this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
    };
    const swipeConfig = {
      leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
      rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
      endCallback: endCallBack
    };
    this._swipeHelper = new Swipe(this._element, swipeConfig);
  }
  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }
    const direction = KEY_TO_DIRECTION[event.key];
    if (direction) {
      event.preventDefault();
      this._slide(this._directionToOrder(direction));
    }
  }
  _getItemIndex(element) {
    return this._getItems().indexOf(element);
  }
  _setActiveIndicatorElement(index) {
    if (!this._indicatorsElement) {
      return;
    }
    const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
    activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
    activeIndicator.removeAttribute('aria-current');
    const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
    if (newActiveIndicator) {
      newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
      newActiveIndicator.setAttribute('aria-current', 'true');
    }
  }
  _updateInterval() {
    const element = this._activeElement || this._getActive();
    if (!element) {
      return;
    }
    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
    this._config.interval = elementInterval || this._config.defaultInterval;
  }
  _slide(order, element = null) {
    if (this._isSliding) {
      return;
    }
    const activeElement = this._getActive();
    const isNext = order === ORDER_NEXT;
    const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
    if (nextElement === activeElement) {
      return;
    }
    const nextElementIndex = this._getItemIndex(nextElement);
    const triggerEvent = eventName => {
      return EventHandler.trigger(this._element, eventName, {
        relatedTarget: nextElement,
        direction: this._orderToDirection(order),
        from: this._getItemIndex(activeElement),
        to: nextElementIndex
      });
    };
    const slideEvent = triggerEvent(EVENT_SLIDE);
    if (slideEvent.defaultPrevented) {
      return;
    }
    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      // TODO: change tests that use empty divs to avoid this check
      return;
    }
    const isCycling = Boolean(this._interval);
    this.pause();
    this._isSliding = true;
    this._setActiveIndicatorElement(nextElementIndex);
    this._activeElement = nextElement;
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
    nextElement.classList.add(orderClassName);
    reflow(nextElement);
    activeElement.classList.add(directionalClassName);
    nextElement.classList.add(directionalClassName);
    const completeCallBack = () => {
      nextElement.classList.remove(directionalClassName, orderClassName);
      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
      activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
      this._isSliding = false;
      triggerEvent(EVENT_SLID);
    };
    this._queueCallback(completeCallBack, activeElement, this._isAnimated());
    if (isCycling) {
      this.cycle();
    }
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_SLIDE);
  }
  _getActive() {
    return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
  }
  _getItems() {
    return SelectorEngine.find(SELECTOR_ITEM, this._element);
  }
  _clearInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  _directionToOrder(direction) {
    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }
    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  }
  _orderToDirection(order) {
    if (isRTL()) {
      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Carousel.getOrCreateInstance(this, config);
      if (typeof config === 'number') {
        data.to(config);
        return;
      }
      if (typeof config === 'string') {
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}

/**
 * Data API implementation
 */
exports.Carousel = Carousel;
EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
    return;
  }
  event.preventDefault();
  const carousel = Carousel.getOrCreateInstance(target);
  const slideIndex = this.getAttribute('data-bs-slide-to');
  if (slideIndex) {
    carousel.to(slideIndex);
    carousel._maybeEnableCycle();
    return;
  }
  if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
    carousel.next();
    carousel._maybeEnableCycle();
    return;
  }
  carousel.prev();
  carousel._maybeEnableCycle();
});
EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
  for (const carousel of carousels) {
    Carousel.getOrCreateInstance(carousel);
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(Carousel);

/**
 * --------------------------------------------------------------------------
 * Bootstrap collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$b = 'collapse';
const DATA_KEY$7 = 'bs.collapse';
const EVENT_KEY$7 = `.${DATA_KEY$7}`;
const DATA_API_KEY$4 = '.data-api';
const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
const CLASS_NAME_SHOW$7 = 'show';
const CLASS_NAME_COLLAPSE = 'collapse';
const CLASS_NAME_COLLAPSING = 'collapsing';
const CLASS_NAME_COLLAPSED = 'collapsed';
const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
const WIDTH = 'width';
const HEIGHT = 'height';
const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
const Default$a = {
  parent: null,
  toggle: true
};
const DefaultType$a = {
  parent: '(null|element)',
  toggle: 'boolean'
};

/**
 * Class definition
 */

class Collapse extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._isTransitioning = false;
    this._triggerArray = [];
    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
    for (const elem of toggleList) {
      const selector = SelectorEngine.getSelectorFromElement(elem);
      const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
      if (selector !== null && filterElement.length) {
        this._triggerArray.push(elem);
      }
    }
    this._initializeChildren();
    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    }
    if (this._config.toggle) {
      this.toggle();
    }
  }

  // Getters
  static get Default() {
    return Default$a;
  }
  static get DefaultType() {
    return DefaultType$a;
  }
  static get NAME() {
    return NAME$b;
  }

  // Public
  toggle() {
    if (this._isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }
  show() {
    if (this._isTransitioning || this._isShown()) {
      return;
    }
    let activeChildren = [];

    // find active children
    if (this._config.parent) {
      activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
        toggle: false
      }));
    }
    if (activeChildren.length && activeChildren[0]._isTransitioning) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
    if (startEvent.defaultPrevented) {
      return;
    }
    for (const activeInstance of activeChildren) {
      activeInstance.hide();
    }
    const dimension = this._getDimension();
    this._element.classList.remove(CLASS_NAME_COLLAPSE);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.style[dimension] = 0;
    this._addAriaAndCollapsedClass(this._triggerArray, true);
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      this._element.style[dimension] = '';
      EventHandler.trigger(this._element, EVENT_SHOWN$6);
    };
    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;
    this._queueCallback(complete, this._element, true);
    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown()) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
    if (startEvent.defaultPrevented) {
      return;
    }
    const dimension = this._getDimension();
    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
    for (const trigger of this._triggerArray) {
      const element = SelectorEngine.getElementFromSelector(trigger);
      if (element && !this._isShown(element)) {
        this._addAriaAndCollapsedClass([trigger], false);
      }
    }
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE);
      EventHandler.trigger(this._element, EVENT_HIDDEN$6);
    };
    this._element.style[dimension] = '';
    this._queueCallback(complete, this._element, true);
  }
  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$7);
  }

  // Private
  _configAfterMerge(config) {
    config.toggle = Boolean(config.toggle); // Coerce string values
    config.parent = getElement(config.parent);
    return config;
  }
  _getDimension() {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
  }
  _initializeChildren() {
    if (!this._config.parent) {
      return;
    }
    const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
    for (const element of children) {
      const selected = SelectorEngine.getElementFromSelector(element);
      if (selected) {
        this._addAriaAndCollapsedClass([element], this._isShown(selected));
      }
    }
  }
  _getFirstLevelChildren(selector) {
    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
    // remove children if greater depth
    return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
  }
  _addAriaAndCollapsedClass(triggerArray, isOpen) {
    if (!triggerArray.length) {
      return;
    }
    for (const element of triggerArray) {
      element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
      element.setAttribute('aria-expanded', isOpen);
    }
  }

  // Static
  static jQueryInterface(config) {
    const _config = {};
    if (typeof config === 'string' && /show|hide/.test(config)) {
      _config.toggle = false;
    }
    return this.each(function () {
      const data = Collapse.getOrCreateInstance(this, _config);
      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}

/**
 * Data API implementation
 */
exports.Collapse = Collapse;
EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    event.preventDefault();
  }
  for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
    Collapse.getOrCreateInstance(element, {
      toggle: false
    }).toggle();
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(Collapse);

/**
 * --------------------------------------------------------------------------
 * Bootstrap dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$a = 'dropdown';
const DATA_KEY$6 = 'bs.dropdown';
const EVENT_KEY$6 = `.${DATA_KEY$6}`;
const DATA_API_KEY$3 = '.data-api';
const ESCAPE_KEY$2 = 'Escape';
const TAB_KEY$1 = 'Tab';
const ARROW_UP_KEY$1 = 'ArrowUp';
const ARROW_DOWN_KEY$1 = 'ArrowDown';
const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
const CLASS_NAME_SHOW$6 = 'show';
const CLASS_NAME_DROPUP = 'dropup';
const CLASS_NAME_DROPEND = 'dropend';
const CLASS_NAME_DROPSTART = 'dropstart';
const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
const SELECTOR_MENU = '.dropdown-menu';
const SELECTOR_NAVBAR = '.navbar';
const SELECTOR_NAVBAR_NAV = '.navbar-nav';
const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
const PLACEMENT_TOPCENTER = 'top';
const PLACEMENT_BOTTOMCENTER = 'bottom';
const Default$9 = {
  autoClose: true,
  boundary: 'clippingParents',
  display: 'dynamic',
  offset: [0, 2],
  popperConfig: null,
  reference: 'toggle'
};
const DefaultType$9 = {
  autoClose: '(boolean|string)',
  boundary: '(string|element)',
  display: 'string',
  offset: '(array|string|function)',
  popperConfig: '(null|object|function)',
  reference: '(string|element|object)'
};

/**
 * Class definition
 */

class Dropdown extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._popper = null;
    this._parent = this._element.parentNode; // dropdown wrapper
    // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
    this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
    this._inNavbar = this._detectNavbar();
  }

  // Getters
  static get Default() {
    return Default$9;
  }
  static get DefaultType() {
    return DefaultType$9;
  }
  static get NAME() {
    return NAME$a;
  }

  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (isDisabled(this._element) || this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._createPopper();

    // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
    if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.on(element, 'mouseover', noop);
      }
    }
    this._element.focus();
    this._element.setAttribute('aria-expanded', true);
    this._menu.classList.add(CLASS_NAME_SHOW$6);
    this._element.classList.add(CLASS_NAME_SHOW$6);
    EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
  }
  hide() {
    if (isDisabled(this._element) || !this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    this._completeHide(relatedTarget);
  }
  dispose() {
    if (this._popper) {
      this._popper.destroy();
    }
    super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar();
    if (this._popper) {
      this._popper.update();
    }
  }

  // Private
  _completeHide(relatedTarget) {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
    if (hideEvent.defaultPrevented) {
      return;
    }

    // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.off(element, 'mouseover', noop);
      }
    }
    if (this._popper) {
      this._popper.destroy();
    }
    this._menu.classList.remove(CLASS_NAME_SHOW$6);
    this._element.classList.remove(CLASS_NAME_SHOW$6);
    this._element.setAttribute('aria-expanded', 'false');
    Manipulator.removeDataAttribute(this._menu, 'popper');
    EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
  }
  _getConfig(config) {
    config = super._getConfig(config);
    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
      // Popper virtual elements require a getBoundingClientRect method
      throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    }
    return config;
  }
  _createPopper() {
    if (typeof Popper === 'undefined') {
      throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
    }
    let referenceElement = this._element;
    if (this._config.reference === 'parent') {
      referenceElement = this._parent;
    } else if (isElement(this._config.reference)) {
      referenceElement = getElement(this._config.reference);
    } else if (typeof this._config.reference === 'object') {
      referenceElement = this._config.reference;
    }
    const popperConfig = this._getPopperConfig();
    this._popper = Popper.createPopper(referenceElement, this._menu, popperConfig);
  }
  _isShown() {
    return this._menu.classList.contains(CLASS_NAME_SHOW$6);
  }
  _getPlacement() {
    const parentDropdown = this._parent;
    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
      return PLACEMENT_TOPCENTER;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
      return PLACEMENT_BOTTOMCENTER;
    }

    // We need to trim the value because custom properties can also include spaces
    const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }
    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }
  _detectNavbar() {
    return this._element.closest(SELECTOR_NAVBAR) !== null;
  }
  _getOffset() {
    const {
      offset
    } = this._config;
    if (typeof offset === 'string') {
      return offset.split(',').map(value => Number.parseInt(value, 10));
    }
    if (typeof offset === 'function') {
      return popperData => offset(popperData, this._element);
    }
    return offset;
  }
  _getPopperConfig() {
    const defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [{
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }]
    };

    // Disable Popper if we have a static display or Dropdown is in Navbar
    if (this._inNavbar || this._config.display === 'static') {
      Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
      defaultBsPopperConfig.modifiers = [{
        name: 'applyStyles',
        enabled: false
      }];
    }
    return {
      ...defaultBsPopperConfig,
      ...execute(this._config.popperConfig, [defaultBsPopperConfig])
    };
  }
  _selectMenuItem({
    key,
    target
  }) {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
    if (!items.length) {
      return;
    }

    // if target isn't included in items (e.g. when expanding the dropdown)
    // allow cycling to get the last item in case key equals ARROW_UP_KEY
    getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Dropdown.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
  static clearMenus(event) {
    if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
      return;
    }
    const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
    for (const toggle of openToggles) {
      const context = Dropdown.getInstance(toggle);
      if (!context || context._config.autoClose === false) {
        continue;
      }
      const composedPath = event.composedPath();
      const isMenuTarget = composedPath.includes(context._menu);
      if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
        continue;
      }

      // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
      if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
        continue;
      }
      const relatedTarget = {
        relatedTarget: context._element
      };
      if (event.type === 'click') {
        relatedTarget.clickEvent = event;
      }
      context._completeHide(relatedTarget);
    }
  }
  static dataApiKeydownHandler(event) {
    // If not an UP | DOWN | ESCAPE key => not a dropdown command
    // If input/textarea && if key is other than ESCAPE => not a dropdown command

    const isInput = /input|textarea/i.test(event.target.tagName);
    const isEscapeEvent = event.key === ESCAPE_KEY$2;
    const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
    if (!isUpOrDownEvent && !isEscapeEvent) {
      return;
    }
    if (isInput && !isEscapeEvent) {
      return;
    }
    event.preventDefault();

    // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
    const instance = Dropdown.getOrCreateInstance(getToggleButton);
    if (isUpOrDownEvent) {
      event.stopPropagation();
      instance.show();
      instance._selectMenuItem(event);
      return;
    }
    if (instance._isShown()) {
      // else is escape and we check if it is shown
      event.stopPropagation();
      instance.hide();
      getToggleButton.focus();
    }
  }
}

/**
 * Data API implementation
 */
exports.Dropdown = Dropdown;
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
  event.preventDefault();
  Dropdown.getOrCreateInstance(this).toggle();
});

/**
 * jQuery
 */

defineJQueryPlugin(Dropdown);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$9 = 'backdrop';
const CLASS_NAME_FADE$4 = 'fade';
const CLASS_NAME_SHOW$5 = 'show';
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
const Default$8 = {
  className: 'modal-backdrop',
  clickCallback: null,
  isAnimated: false,
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: 'body' // give the choice to place backdrop under different elements
};
const DefaultType$8 = {
  className: 'string',
  clickCallback: '(function|null)',
  isAnimated: 'boolean',
  isVisible: 'boolean',
  rootElement: '(element|string)'
};

/**
 * Class definition
 */

class Backdrop extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }

  // Getters
  static get Default() {
    return Default$8;
  }
  static get DefaultType() {
    return DefaultType$8;
  }
  static get NAME() {
    return NAME$9;
  }

  // Public
  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._append();
    const element = this._getElement();
    if (this._config.isAnimated) {
      reflow(element);
    }
    element.classList.add(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      execute(callback);
    });
  }
  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._getElement().classList.remove(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      this.dispose();
      execute(callback);
    });
  }
  dispose() {
    if (!this._isAppended) {
      return;
    }
    EventHandler.off(this._element, EVENT_MOUSEDOWN);
    this._element.remove();
    this._isAppended = false;
  }

  // Private
  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement('div');
      backdrop.className = this._config.className;
      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$4);
      }
      this._element = backdrop;
    }
    return this._element;
  }
  _configAfterMerge(config) {
    // use getElement() with the default "body" to get a fresh Element on each instantiation
    config.rootElement = getElement(config.rootElement);
    return config;
  }
  _append() {
    if (this._isAppended) {
      return;
    }
    const element = this._getElement();
    this._config.rootElement.append(element);
    EventHandler.on(element, EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }
  _emulateAnimation(callback) {
    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/focustrap.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$8 = 'focustrap';
const DATA_KEY$5 = 'bs.focustrap';
const EVENT_KEY$5 = `.${DATA_KEY$5}`;
const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
const TAB_KEY = 'Tab';
const TAB_NAV_FORWARD = 'forward';
const TAB_NAV_BACKWARD = 'backward';
const Default$7 = {
  autofocus: true,
  trapElement: null // The element to trap focus inside of
};
const DefaultType$7 = {
  autofocus: 'boolean',
  trapElement: 'element'
};

/**
 * Class definition
 */

class FocusTrap extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isActive = false;
    this._lastTabNavDirection = null;
  }

  // Getters
  static get Default() {
    return Default$7;
  }
  static get DefaultType() {
    return DefaultType$7;
  }
  static get NAME() {
    return NAME$8;
  }

  // Public
  activate() {
    if (this._isActive) {
      return;
    }
    if (this._config.autofocus) {
      this._config.trapElement.focus();
    }
    EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
    EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
    EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
    this._isActive = true;
  }
  deactivate() {
    if (!this._isActive) {
      return;
    }
    this._isActive = false;
    EventHandler.off(document, EVENT_KEY$5);
  }

  // Private
  _handleFocusin(event) {
    const {
      trapElement
    } = this._config;
    if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
      return;
    }
    const elements = SelectorEngine.focusableChildren(trapElement);
    if (elements.length === 0) {
      trapElement.focus();
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus();
    } else {
      elements[0].focus();
    }
  }
  _handleKeydown(event) {
    if (event.key !== TAB_KEY) {
      return;
    }
    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
const SELECTOR_STICKY_CONTENT = '.sticky-top';
const PROPERTY_PADDING = 'padding-right';
const PROPERTY_MARGIN = 'margin-right';

/**
 * Class definition
 */

class ScrollBarHelper {
  constructor() {
    this._element = document.body;
  }

  // Public
  getWidth() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
  }
  hide() {
    const width = this.getWidth();
    this._disableOverFlow();
    // give padding to element to balance the hidden scrollbar width
    this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
    // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
    this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
    this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
  }
  reset() {
    this._resetElementAttributes(this._element, 'overflow');
    this._resetElementAttributes(this._element, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }

  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, 'overflow');
    this._element.style.overflow = 'hidden';
  }
  _setElementAttributes(selector, styleProperty, callback) {
    const scrollbarWidth = this.getWidth();
    const manipulationCallBack = element => {
      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
        return;
      }
      this._saveInitialAttribute(element, styleProperty);
      const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
      element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _saveInitialAttribute(element, styleProperty) {
    const actualValue = element.style.getPropertyValue(styleProperty);
    if (actualValue) {
      Manipulator.setDataAttribute(element, styleProperty, actualValue);
    }
  }
  _resetElementAttributes(selector, styleProperty) {
    const manipulationCallBack = element => {
      const value = Manipulator.getDataAttribute(element, styleProperty);
      // We only want to remove the property if the value is `null`; the value can also be zero
      if (value === null) {
        element.style.removeProperty(styleProperty);
        return;
      }
      Manipulator.removeDataAttribute(element, styleProperty);
      element.style.setProperty(styleProperty, value);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _applyManipulationCallback(selector, callBack) {
    if (isElement(selector)) {
      callBack(selector);
      return;
    }
    for (const sel of SelectorEngine.find(selector, this._element)) {
      callBack(sel);
    }
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$7 = 'modal';
const DATA_KEY$4 = 'bs.modal';
const EVENT_KEY$4 = `.${DATA_KEY$4}`;
const DATA_API_KEY$2 = '.data-api';
const ESCAPE_KEY$1 = 'Escape';
const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
const CLASS_NAME_OPEN = 'modal-open';
const CLASS_NAME_FADE$3 = 'fade';
const CLASS_NAME_SHOW$4 = 'show';
const CLASS_NAME_STATIC = 'modal-static';
const OPEN_SELECTOR$1 = '.modal.show';
const SELECTOR_DIALOG = '.modal-dialog';
const SELECTOR_MODAL_BODY = '.modal-body';
const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
const Default$6 = {
  backdrop: true,
  focus: true,
  keyboard: true
};
const DefaultType$6 = {
  backdrop: '(boolean|string)',
  focus: 'boolean',
  keyboard: 'boolean'
};

/**
 * Class definition
 */

class Modal extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._isShown = false;
    this._isTransitioning = false;
    this._scrollBar = new ScrollBarHelper();
    this._addEventListeners();
  }

  // Getters
  static get Default() {
    return Default$6;
  }
  static get DefaultType() {
    return DefaultType$6;
  }
  static get NAME() {
    return NAME$7;
  }

  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._isTransitioning = true;
    this._scrollBar.hide();
    document.body.classList.add(CLASS_NAME_OPEN);
    this._adjustDialog();
    this._backdrop.show(() => this._showElement(relatedTarget));
  }
  hide() {
    if (!this._isShown || this._isTransitioning) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._isShown = false;
    this._isTransitioning = true;
    this._focustrap.deactivate();
    this._element.classList.remove(CLASS_NAME_SHOW$4);
    this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
  }
  dispose() {
    EventHandler.off(window, EVENT_KEY$4);
    EventHandler.off(this._dialog, EVENT_KEY$4);
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }

  // Private
  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _showElement(relatedTarget) {
    // try to append dynamic modal
    if (!document.body.contains(this._element)) {
      document.body.append(this._element);
    }
    this._element.style.display = 'block';
    this._element.removeAttribute('aria-hidden');
    this._element.setAttribute('aria-modal', true);
    this._element.setAttribute('role', 'dialog');
    this._element.scrollTop = 0;
    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW$4);
    const transitionComplete = () => {
      if (this._config.focus) {
        this._focustrap.activate();
      }
      this._isTransitioning = false;
      EventHandler.trigger(this._element, EVENT_SHOWN$4, {
        relatedTarget
      });
    };
    this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
      if (event.key !== ESCAPE_KEY$1) {
        return;
      }
      if (this._config.keyboard) {
        this.hide();
        return;
      }
      this._triggerBackdropTransition();
    });
    EventHandler.on(window, EVENT_RESIZE$1, () => {
      if (this._isShown && !this._isTransitioning) {
        this._adjustDialog();
      }
    });
    EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
      // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
      EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
        if (this._element !== event.target || this._element !== event2.target) {
          return;
        }
        if (this._config.backdrop === 'static') {
          this._triggerBackdropTransition();
          return;
        }
        if (this._config.backdrop) {
          this.hide();
        }
      });
    });
  }
  _hideModal() {
    this._element.style.display = 'none';
    this._element.setAttribute('aria-hidden', true);
    this._element.removeAttribute('aria-modal');
    this._element.removeAttribute('role');
    this._isTransitioning = false;
    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN);
      this._resetAdjustments();
      this._scrollBar.reset();
      EventHandler.trigger(this._element, EVENT_HIDDEN$4);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_FADE$3);
  }
  _triggerBackdropTransition() {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const initialOverflowY = this._element.style.overflowY;
    // return if the following background transition hasn't yet completed
    if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
      return;
    }
    if (!isModalOverflowing) {
      this._element.style.overflowY = 'hidden';
    }
    this._element.classList.add(CLASS_NAME_STATIC);
    this._queueCallback(() => {
      this._element.classList.remove(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.style.overflowY = initialOverflowY;
      }, this._dialog);
    }, this._dialog);
    this._element.focus();
  }

  /**
   * The following methods are used to handle overflowing modals
   */

  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = this._scrollBar.getWidth();
    const isBodyOverflowing = scrollbarWidth > 0;
    if (isBodyOverflowing && !isModalOverflowing) {
      const property = isRTL() ? 'paddingLeft' : 'paddingRight';
      this._element.style[property] = `${scrollbarWidth}px`;
    }
    if (!isBodyOverflowing && isModalOverflowing) {
      const property = isRTL() ? 'paddingRight' : 'paddingLeft';
      this._element.style[property] = `${scrollbarWidth}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = '';
    this._element.style.paddingRight = '';
  }

  // Static
  static jQueryInterface(config, relatedTarget) {
    return this.each(function () {
      const data = Modal.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](relatedTarget);
    });
  }
}

/**
 * Data API implementation
 */
exports.Modal = Modal;
EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  EventHandler.one(target, EVENT_SHOW$4, showEvent => {
    if (showEvent.defaultPrevented) {
      // only register focus restorer if modal will actually get shown
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$4, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
  });

  // avoid conflict when clicking modal toggler while another one is open
  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
  if (alreadyOpen) {
    Modal.getInstance(alreadyOpen).hide();
  }
  const data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});
enableDismissTrigger(Modal);

/**
 * jQuery
 */

defineJQueryPlugin(Modal);

/**
 * --------------------------------------------------------------------------
 * Bootstrap offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$6 = 'offcanvas';
const DATA_KEY$3 = 'bs.offcanvas';
const EVENT_KEY$3 = `.${DATA_KEY$3}`;
const DATA_API_KEY$1 = '.data-api';
const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
const ESCAPE_KEY = 'Escape';
const CLASS_NAME_SHOW$3 = 'show';
const CLASS_NAME_SHOWING$1 = 'showing';
const CLASS_NAME_HIDING = 'hiding';
const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
const OPEN_SELECTOR = '.offcanvas.show';
const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
const Default$5 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
const DefaultType$5 = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  scroll: 'boolean'
};

/**
 * Class definition
 */

class Offcanvas extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._addEventListeners();
  }

  // Getters
  static get Default() {
    return Default$5;
  }
  static get DefaultType() {
    return DefaultType$5;
  }
  static get NAME() {
    return NAME$6;
  }

  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._backdrop.show();
    if (!this._config.scroll) {
      new ScrollBarHelper().hide();
    }
    this._element.setAttribute('aria-modal', true);
    this._element.setAttribute('role', 'dialog');
    this._element.classList.add(CLASS_NAME_SHOWING$1);
    const completeCallBack = () => {
      if (!this._config.scroll || this._config.backdrop) {
        this._focustrap.activate();
      }
      this._element.classList.add(CLASS_NAME_SHOW$3);
      this._element.classList.remove(CLASS_NAME_SHOWING$1);
      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
        relatedTarget
      });
    };
    this._queueCallback(completeCallBack, this._element, true);
  }
  hide() {
    if (!this._isShown) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._focustrap.deactivate();
    this._element.blur();
    this._isShown = false;
    this._element.classList.add(CLASS_NAME_HIDING);
    this._backdrop.hide();
    const completeCallback = () => {
      this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      if (!this._config.scroll) {
        new ScrollBarHelper().reset();
      }
      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
    };
    this._queueCallback(completeCallback, this._element, true);
  }
  dispose() {
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }

  // Private
  _initializeBackDrop() {
    const clickCallback = () => {
      if (this._config.backdrop === 'static') {
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
        return;
      }
      this.hide();
    };

    // 'static' option will be translated to true, and booleans will keep their value
    const isVisible = Boolean(this._config.backdrop);
    return new Backdrop({
      className: CLASS_NAME_BACKDROP,
      isVisible,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: isVisible ? clickCallback : null
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
      if (event.key !== ESCAPE_KEY) {
        return;
      }
      if (this._config.keyboard) {
        this.hide();
        return;
      }
      EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
    });
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Offcanvas.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}

/**
 * Data API implementation
 */
exports.Offcanvas = Offcanvas;
EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  EventHandler.one(target, EVENT_HIDDEN$3, () => {
    // focus on trigger when it is closed
    if (isVisible(this)) {
      this.focus();
    }
  });

  // avoid conflict when clicking a toggler of an offcanvas, while another is open
  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
  if (alreadyOpen && alreadyOpen !== target) {
    Offcanvas.getInstance(alreadyOpen).hide();
  }
  const data = Offcanvas.getOrCreateInstance(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
  for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
    Offcanvas.getOrCreateInstance(selector).show();
  }
});
EventHandler.on(window, EVENT_RESIZE, () => {
  for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
    if (getComputedStyle(element).position !== 'fixed') {
      Offcanvas.getOrCreateInstance(element).hide();
    }
  }
});
enableDismissTrigger(Offcanvas);

/**
 * jQuery
 */

defineJQueryPlugin(Offcanvas);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

// js-docs-start allow-list
const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
const DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  dd: [],
  div: [],
  dl: [],
  dt: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
// js-docs-end allow-list

const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

/**
 * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
 * contexts.
 *
 * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
 */
// eslint-disable-next-line unicorn/better-regex
const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
const allowedAttribute = (attribute, allowedAttributeList) => {
  const attributeName = attribute.nodeName.toLowerCase();
  if (allowedAttributeList.includes(attributeName)) {
    if (uriAttributes.has(attributeName)) {
      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
    }
    return true;
  }

  // Check if a regular expression validates the attribute.
  return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }
  if (sanitizeFunction && typeof sanitizeFunction === 'function') {
    return sanitizeFunction(unsafeHtml);
  }
  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
  for (const element of elements) {
    const elementName = element.nodeName.toLowerCase();
    if (!Object.keys(allowList).includes(elementName)) {
      element.remove();
      continue;
    }
    const attributeList = [].concat(...element.attributes);
    const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
    for (const attribute of attributeList) {
      if (!allowedAttribute(attribute, allowedAttributes)) {
        element.removeAttribute(attribute.nodeName);
      }
    }
  }
  return createdDocument.body.innerHTML;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/template-factory.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$5 = 'TemplateFactory';
const Default$4 = {
  allowList: DefaultAllowlist,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: '',
  html: false,
  sanitize: true,
  sanitizeFn: null,
  template: '<div></div>'
};
const DefaultType$4 = {
  allowList: 'object',
  content: 'object',
  extraClass: '(string|function)',
  html: 'boolean',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  template: 'string'
};
const DefaultContentType = {
  entry: '(string|element|function|null)',
  selector: '(string|element)'
};

/**
 * Class definition
 */

class TemplateFactory extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
  }

  // Getters
  static get Default() {
    return Default$4;
  }
  static get DefaultType() {
    return DefaultType$4;
  }
  static get NAME() {
    return NAME$5;
  }

  // Public
  getContent() {
    return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(content) {
    this._checkContent(content);
    this._config.content = {
      ...this._config.content,
      ...content
    };
    return this;
  }
  toHtml() {
    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
    for (const [selector, text] of Object.entries(this._config.content)) {
      this._setContent(templateWrapper, text, selector);
    }
    const template = templateWrapper.children[0];
    const extraClass = this._resolvePossibleFunction(this._config.extraClass);
    if (extraClass) {
      template.classList.add(...extraClass.split(' '));
    }
    return template;
  }

  // Private
  _typeCheckConfig(config) {
    super._typeCheckConfig(config);
    this._checkContent(config.content);
  }
  _checkContent(arg) {
    for (const [selector, content] of Object.entries(arg)) {
      super._typeCheckConfig({
        selector,
        entry: content
      }, DefaultContentType);
    }
  }
  _setContent(template, content, selector) {
    const templateElement = SelectorEngine.findOne(selector, template);
    if (!templateElement) {
      return;
    }
    content = this._resolvePossibleFunction(content);
    if (!content) {
      templateElement.remove();
      return;
    }
    if (isElement(content)) {
      this._putElementInTemplate(getElement(content), templateElement);
      return;
    }
    if (this._config.html) {
      templateElement.innerHTML = this._maybeSanitize(content);
      return;
    }
    templateElement.textContent = content;
  }
  _maybeSanitize(arg) {
    return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
  }
  _resolvePossibleFunction(arg) {
    return execute(arg, [this]);
  }
  _putElementInTemplate(element, templateElement) {
    if (this._config.html) {
      templateElement.innerHTML = '';
      templateElement.append(element);
      return;
    }
    templateElement.textContent = element.textContent;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$4 = 'tooltip';
const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
const CLASS_NAME_FADE$2 = 'fade';
const CLASS_NAME_MODAL = 'modal';
const CLASS_NAME_SHOW$2 = 'show';
const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
const EVENT_MODAL_HIDE = 'hide.bs.modal';
const TRIGGER_HOVER = 'hover';
const TRIGGER_FOCUS = 'focus';
const TRIGGER_CLICK = 'click';
const TRIGGER_MANUAL = 'manual';
const EVENT_HIDE$2 = 'hide';
const EVENT_HIDDEN$2 = 'hidden';
const EVENT_SHOW$2 = 'show';
const EVENT_SHOWN$2 = 'shown';
const EVENT_INSERTED = 'inserted';
const EVENT_CLICK$1 = 'click';
const EVENT_FOCUSIN$1 = 'focusin';
const EVENT_FOCUSOUT$1 = 'focusout';
const EVENT_MOUSEENTER = 'mouseenter';
const EVENT_MOUSELEAVE = 'mouseleave';
const AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
};
const Default$3 = {
  allowList: DefaultAllowlist,
  animation: true,
  boundary: 'clippingParents',
  container: false,
  customClass: '',
  delay: 0,
  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
  html: false,
  offset: [0, 6],
  placement: 'top',
  popperConfig: null,
  sanitize: true,
  sanitizeFn: null,
  selector: false,
  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
  title: '',
  trigger: 'hover focus'
};
const DefaultType$3 = {
  allowList: 'object',
  animation: 'boolean',
  boundary: '(string|element)',
  container: '(string|element|boolean)',
  customClass: '(string|function)',
  delay: '(number|object)',
  fallbackPlacements: 'array',
  html: 'boolean',
  offset: '(array|string|function)',
  placement: '(string|function)',
  popperConfig: '(null|object|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  selector: '(string|boolean)',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string'
};

/**
 * Class definition
 */

class Tooltip extends BaseComponent {
  constructor(element, config) {
    if (typeof Popper === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
    }
    super(element, config);

    // Private
    this._isEnabled = true;
    this._timeout = 0;
    this._isHovered = null;
    this._activeTrigger = {};
    this._popper = null;
    this._templateFactory = null;
    this._newContent = null;

    // Protected
    this.tip = null;
    this._setListeners();
    if (!this._config.selector) {
      this._fixTitle();
    }
  }

  // Getters
  static get Default() {
    return Default$3;
  }
  static get DefaultType() {
    return DefaultType$3;
  }
  static get NAME() {
    return NAME$4;
  }

  // Public
  enable() {
    this._isEnabled = true;
  }
  disable() {
    this._isEnabled = false;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (!this._isEnabled) {
      return;
    }
    this._activeTrigger.click = !this._activeTrigger.click;
    if (this._isShown()) {
      this._leave();
      return;
    }
    this._enter();
  }
  dispose() {
    clearTimeout(this._timeout);
    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    if (this._element.getAttribute('data-bs-original-title')) {
      this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
    }
    this._disposePopper();
    super.dispose();
  }
  show() {
    if (this._element.style.display === 'none') {
      throw new Error('Please use show on visible elements');
    }
    if (!(this._isWithContent() && this._isEnabled)) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
    const shadowRoot = findShadowRoot(this._element);
    const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
    if (showEvent.defaultPrevented || !isInTheDom) {
      return;
    }

    // TODO: v6 remove this or make it optional
    this._disposePopper();
    const tip = this._getTipElement();
    this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
    const {
      container
    } = this._config;
    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.append(tip);
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
    }
    this._popper = this._createPopper(tip);
    tip.classList.add(CLASS_NAME_SHOW$2);

    // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.on(element, 'mouseover', noop);
      }
    }
    const complete = () => {
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
      if (this._isHovered === false) {
        this._leave();
      }
      this._isHovered = false;
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
    if (hideEvent.defaultPrevented) {
      return;
    }
    const tip = this._getTipElement();
    tip.classList.remove(CLASS_NAME_SHOW$2);

    // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.off(element, 'mouseover', noop);
      }
    }
    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;
    this._isHovered = null; // it is a trick to support manual triggering

    const complete = () => {
      if (this._isWithActiveTrigger()) {
        return;
      }
      if (!this._isHovered) {
        this._disposePopper();
      }
      this._element.removeAttribute('aria-describedby');
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  update() {
    if (this._popper) {
      this._popper.update();
    }
  }

  // Protected
  _isWithContent() {
    return Boolean(this._getTitle());
  }
  _getTipElement() {
    if (!this.tip) {
      this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
    }
    return this.tip;
  }
  _createTipElement(content) {
    const tip = this._getTemplateFactory(content).toHtml();

    // TODO: remove this check in v6
    if (!tip) {
      return null;
    }
    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
    // TODO: v6 the following can be achieved with CSS only
    tip.classList.add(`bs-${this.constructor.NAME}-auto`);
    const tipId = getUID(this.constructor.NAME).toString();
    tip.setAttribute('id', tipId);
    if (this._isAnimated()) {
      tip.classList.add(CLASS_NAME_FADE$2);
    }
    return tip;
  }
  setContent(content) {
    this._newContent = content;
    if (this._isShown()) {
      this._disposePopper();
      this.show();
    }
  }
  _getTemplateFactory(content) {
    if (this._templateFactory) {
      this._templateFactory.changeContent(content);
    } else {
      this._templateFactory = new TemplateFactory({
        ...this._config,
        // the `content` var has to be after `this._config`
        // to override config.content in case of popover
        content,
        extraClass: this._resolvePossibleFunction(this._config.customClass)
      });
    }
    return this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [SELECTOR_TOOLTIP_INNER]: this._getTitle()
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
  }

  // Private
  _initializeOnDelegatedTarget(event) {
    return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
  }
  _createPopper(tip) {
    const placement = execute(this._config.placement, [this, tip, this._element]);
    const attachment = AttachmentMap[placement.toUpperCase()];
    return Popper.createPopper(this._element, tip, this._getPopperConfig(attachment));
  }
  _getOffset() {
    const {
      offset
    } = this._config;
    if (typeof offset === 'string') {
      return offset.split(',').map(value => Number.parseInt(value, 10));
    }
    if (typeof offset === 'function') {
      return popperData => offset(popperData, this._element);
    }
    return offset;
  }
  _resolvePossibleFunction(arg) {
    return execute(arg, [this._element]);
  }
  _getPopperConfig(attachment) {
    const defaultBsPopperConfig = {
      placement: attachment,
      modifiers: [{
        name: 'flip',
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }, {
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'arrow',
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: 'preSetPlacement',
        enabled: true,
        phase: 'beforeMain',
        fn: data => {
          // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
          // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
          this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
        }
      }]
    };
    return {
      ...defaultBsPopperConfig,
      ...execute(this._config.popperConfig, [defaultBsPopperConfig])
    };
  }
  _setListeners() {
    const triggers = this._config.trigger.split(' ');
    for (const trigger of triggers) {
      if (trigger === 'click') {
        EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
          const context = this._initializeOnDelegatedTarget(event);
          context.toggle();
        });
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
        EventHandler.on(this._element, eventIn, this._config.selector, event => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
          context._enter();
        });
        EventHandler.on(this._element, eventOut, this._config.selector, event => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
          context._leave();
        });
      }
    }
    this._hideModalHandler = () => {
      if (this._element) {
        this.hide();
      }
    };
    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
  }
  _fixTitle() {
    const title = this._element.getAttribute('title');
    if (!title) {
      return;
    }
    if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
      this._element.setAttribute('aria-label', title);
    }
    this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
    this._element.removeAttribute('title');
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = true;
      return;
    }
    this._isHovered = true;
    this._setTimeout(() => {
      if (this._isHovered) {
        this.show();
      }
    }, this._config.delay.show);
  }
  _leave() {
    if (this._isWithActiveTrigger()) {
      return;
    }
    this._isHovered = false;
    this._setTimeout(() => {
      if (!this._isHovered) {
        this.hide();
      }
    }, this._config.delay.hide);
  }
  _setTimeout(handler, timeout) {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(handler, timeout);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(true);
  }
  _getConfig(config) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);
    for (const dataAttribute of Object.keys(dataAttributes)) {
      if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
        delete dataAttributes[dataAttribute];
      }
    }
    config = {
      ...dataAttributes,
      ...(typeof config === 'object' && config ? config : {})
    };
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    config.container = config.container === false ? document.body : getElement(config.container);
    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }
    if (typeof config.title === 'number') {
      config.title = config.title.toString();
    }
    if (typeof config.content === 'number') {
      config.content = config.content.toString();
    }
    return config;
  }
  _getDelegateConfig() {
    const config = {};
    for (const [key, value] of Object.entries(this._config)) {
      if (this.constructor.Default[key] !== value) {
        config[key] = value;
      }
    }
    config.selector = false;
    config.trigger = 'manual';

    // In the future can be replaced with:
    // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
    // `Object.fromEntries(keysWithDifferentValues)`
    return config;
  }
  _disposePopper() {
    if (this._popper) {
      this._popper.destroy();
      this._popper = null;
    }
    if (this.tip) {
      this.tip.remove();
      this.tip = null;
    }
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Tooltip.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * jQuery
 */
exports.Tooltip = Tooltip;
defineJQueryPlugin(Tooltip);

/**
 * --------------------------------------------------------------------------
 * Bootstrap popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$3 = 'popover';
const SELECTOR_TITLE = '.popover-header';
const SELECTOR_CONTENT = '.popover-body';
const Default$2 = {
  ...Tooltip.Default,
  content: '',
  offset: [0, 8],
  placement: 'right',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
  trigger: 'click'
};
const DefaultType$2 = {
  ...Tooltip.DefaultType,
  content: '(null|string|element|function)'
};

/**
 * Class definition
 */

class Popover extends Tooltip {
  // Getters
  static get Default() {
    return Default$2;
  }
  static get DefaultType() {
    return DefaultType$2;
  }
  static get NAME() {
    return NAME$3;
  }

  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }

  // Private
  _getContentForTemplate() {
    return {
      [SELECTOR_TITLE]: this._getTitle(),
      [SELECTOR_CONTENT]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Popover.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * jQuery
 */
exports.Popover = Popover;
defineJQueryPlugin(Popover);

/**
 * --------------------------------------------------------------------------
 * Bootstrap scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$2 = 'scrollspy';
const DATA_KEY$2 = 'bs.scrollspy';
const EVENT_KEY$2 = `.${DATA_KEY$2}`;
const DATA_API_KEY = '.data-api';
const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
const EVENT_CLICK = `click${EVENT_KEY$2}`;
const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
const CLASS_NAME_ACTIVE$1 = 'active';
const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
const SELECTOR_TARGET_LINKS = '[href]';
const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
const SELECTOR_NAV_LINKS = '.nav-link';
const SELECTOR_NAV_ITEMS = '.nav-item';
const SELECTOR_LIST_ITEMS = '.list-group-item';
const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
const SELECTOR_DROPDOWN = '.dropdown';
const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
const Default$1 = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: '0px 0px -25%',
  smoothScroll: false,
  target: null,
  threshold: [0.1, 0.5, 1]
};
const DefaultType$1 = {
  offset: '(number|null)',
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: 'string',
  smoothScroll: 'boolean',
  target: 'element',
  threshold: 'array'
};

/**
 * Class definition
 */

class ScrollSpy extends BaseComponent {
  constructor(element, config) {
    super(element, config);

    // this._element is the observablesContainer and config.target the menu links wrapper
    this._targetLinks = new Map();
    this._observableSections = new Map();
    this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
    this._activeTarget = null;
    this._observer = null;
    this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    };
    this.refresh(); // initialize
  }

  // Getters
  static get Default() {
    return Default$1;
  }
  static get DefaultType() {
    return DefaultType$1;
  }
  static get NAME() {
    return NAME$2;
  }

  // Public
  refresh() {
    this._initializeTargetsAndObservables();
    this._maybeEnableSmoothScroll();
    if (this._observer) {
      this._observer.disconnect();
    } else {
      this._observer = this._getNewObserver();
    }
    for (const section of this._observableSections.values()) {
      this._observer.observe(section);
    }
  }
  dispose() {
    this._observer.disconnect();
    super.dispose();
  }

  // Private
  _configAfterMerge(config) {
    // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
    config.target = getElement(config.target) || document.body;

    // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
    config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
    if (typeof config.threshold === 'string') {
      config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
    }
    return config;
  }
  _maybeEnableSmoothScroll() {
    if (!this._config.smoothScroll) {
      return;
    }

    // unregister any previous listeners
    EventHandler.off(this._config.target, EVENT_CLICK);
    EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
      const observableSection = this._observableSections.get(event.target.hash);
      if (observableSection) {
        event.preventDefault();
        const root = this._rootElement || window;
        const height = observableSection.offsetTop - this._element.offsetTop;
        if (root.scrollTo) {
          root.scrollTo({
            top: height,
            behavior: 'smooth'
          });
          return;
        }

        // Chrome 60 doesn't support `scrollTo`
        root.scrollTop = height;
      }
    });
  }
  _getNewObserver() {
    const options = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    };
    return new IntersectionObserver(entries => this._observerCallback(entries), options);
  }

  // The logic of selection
  _observerCallback(entries) {
    const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
    const activate = entry => {
      this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
      this._process(targetElement(entry));
    };
    const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
    const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = parentScrollTop;
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        this._activeTarget = null;
        this._clearActiveClass(targetElement(entry));
        continue;
      }
      const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      // if we are scrolling down, pick the bigger offsetTop
      if (userScrollsDown && entryIsLowerThanPrevious) {
        activate(entry);
        // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
        if (!parentScrollTop) {
          return;
        }
        continue;
      }

      // if we are scrolling up, pick the smallest offsetTop
      if (!userScrollsDown && !entryIsLowerThanPrevious) {
        activate(entry);
      }
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = new Map();
    this._observableSections = new Map();
    const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
    for (const anchor of targetLinks) {
      // ensure that the anchor has an id and is not disabled
      if (!anchor.hash || isDisabled(anchor)) {
        continue;
      }
      const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

      // ensure that the observableSection exists & is visible
      if (isVisible(observableSection)) {
        this._targetLinks.set(decodeURI(anchor.hash), anchor);
        this._observableSections.set(anchor.hash, observableSection);
      }
    }
  }
  _process(target) {
    if (this._activeTarget === target) {
      return;
    }
    this._clearActiveClass(this._config.target);
    this._activeTarget = target;
    target.classList.add(CLASS_NAME_ACTIVE$1);
    this._activateParents(target);
    EventHandler.trigger(this._element, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  }
  _activateParents(target) {
    // Activate dropdown parents
    if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
      return;
    }
    for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
      // Set triggered links parents as active
      // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
      for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
        item.classList.add(CLASS_NAME_ACTIVE$1);
      }
    }
  }
  _clearActiveClass(parent) {
    parent.classList.remove(CLASS_NAME_ACTIVE$1);
    const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
    for (const node of activeNodes) {
      node.classList.remove(CLASS_NAME_ACTIVE$1);
    }
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = ScrollSpy.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * Data API implementation
 */
exports.ScrollSpy = ScrollSpy;
EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
  for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
    ScrollSpy.getOrCreateInstance(spy);
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(ScrollSpy);

/**
 * --------------------------------------------------------------------------
 * Bootstrap tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$1 = 'tab';
const DATA_KEY$1 = 'bs.tab';
const EVENT_KEY$1 = `.${DATA_KEY$1}`;
const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
const ARROW_LEFT_KEY = 'ArrowLeft';
const ARROW_RIGHT_KEY = 'ArrowRight';
const ARROW_UP_KEY = 'ArrowUp';
const ARROW_DOWN_KEY = 'ArrowDown';
const HOME_KEY = 'Home';
const END_KEY = 'End';
const CLASS_NAME_ACTIVE = 'active';
const CLASS_NAME_FADE$1 = 'fade';
const CLASS_NAME_SHOW$1 = 'show';
const CLASS_DROPDOWN = 'dropdown';
const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
const SELECTOR_OUTER = '.nav-item, .list-group-item';
const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

/**
 * Class definition
 */

class Tab extends BaseComponent {
  constructor(element) {
    super(element);
    this._parent = this._element.closest(SELECTOR_TAB_PANEL);
    if (!this._parent) {
      return;
      // TODO: should throw exception in v6
      // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
    }

    // Set up initial aria attributes
    this._setInitialAttributes(this._parent, this._getChildren());
    EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
  }

  // Getters
  static get NAME() {
    return NAME$1;
  }

  // Public
  show() {
    // Shows this elem and deactivate the active sibling if exists
    const innerElem = this._element;
    if (this._elemIsActive(innerElem)) {
      return;
    }

    // Search for active tab on same parent to deactivate it
    const active = this._getActiveElem();
    const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
      relatedTarget: innerElem
    }) : null;
    const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
      relatedTarget: active
    });
    if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
      return;
    }
    this._deactivate(active, innerElem);
    this._activate(innerElem, active);
  }

  // Private
  _activate(element, relatedElem) {
    if (!element) {
      return;
    }
    element.classList.add(CLASS_NAME_ACTIVE);
    this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

    const complete = () => {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.add(CLASS_NAME_SHOW$1);
        return;
      }
      element.removeAttribute('tabindex');
      element.setAttribute('aria-selected', true);
      this._toggleDropDown(element, true);
      EventHandler.trigger(element, EVENT_SHOWN$1, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  }
  _deactivate(element, relatedElem) {
    if (!element) {
      return;
    }
    element.classList.remove(CLASS_NAME_ACTIVE);
    element.blur();
    this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

    const complete = () => {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.remove(CLASS_NAME_SHOW$1);
        return;
      }
      element.setAttribute('aria-selected', false);
      element.setAttribute('tabindex', '-1');
      this._toggleDropDown(element, false);
      EventHandler.trigger(element, EVENT_HIDDEN$1, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  }
  _keydown(event) {
    if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
      return;
    }
    event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
    event.preventDefault();
    const children = this._getChildren().filter(element => !isDisabled(element));
    let nextActiveElement;
    if ([HOME_KEY, END_KEY].includes(event.key)) {
      nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
    } else {
      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
      nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
    }
    if (nextActiveElement) {
      nextActiveElement.focus({
        preventScroll: true
      });
      Tab.getOrCreateInstance(nextActiveElement).show();
    }
  }
  _getChildren() {
    // collection of inner elements
    return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find(child => this._elemIsActive(child)) || null;
  }
  _setInitialAttributes(parent, children) {
    this._setAttributeIfNotExists(parent, 'role', 'tablist');
    for (const child of children) {
      this._setInitialAttributesOnChild(child);
    }
  }
  _setInitialAttributesOnChild(child) {
    child = this._getInnerElement(child);
    const isActive = this._elemIsActive(child);
    const outerElem = this._getOuterElement(child);
    child.setAttribute('aria-selected', isActive);
    if (outerElem !== child) {
      this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
    }
    if (!isActive) {
      child.setAttribute('tabindex', '-1');
    }
    this._setAttributeIfNotExists(child, 'role', 'tab');

    // set attributes to the related panel too
    this._setInitialAttributesOnTargetPanel(child);
  }
  _setInitialAttributesOnTargetPanel(child) {
    const target = SelectorEngine.getElementFromSelector(child);
    if (!target) {
      return;
    }
    this._setAttributeIfNotExists(target, 'role', 'tabpanel');
    if (child.id) {
      this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
    }
  }
  _toggleDropDown(element, open) {
    const outerElem = this._getOuterElement(element);
    if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
      return;
    }
    const toggle = (selector, className) => {
      const element = SelectorEngine.findOne(selector, outerElem);
      if (element) {
        element.classList.toggle(className, open);
      }
    };
    toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
    toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
    outerElem.setAttribute('aria-expanded', open);
  }
  _setAttributeIfNotExists(element, attribute, value) {
    if (!element.hasAttribute(attribute)) {
      element.setAttribute(attribute, value);
    }
  }
  _elemIsActive(elem) {
    return elem.classList.contains(CLASS_NAME_ACTIVE);
  }

  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(elem) {
    return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
  }

  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(elem) {
    return elem.closest(SELECTOR_OUTER) || elem;
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Tab.getOrCreateInstance(this);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * Data API implementation
 */
exports.Tab = Tab;
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  Tab.getOrCreateInstance(this).show();
});

/**
 * Initialize on focus
 */
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
    Tab.getOrCreateInstance(element);
  }
});
/**
 * jQuery
 */

defineJQueryPlugin(Tab);

/**
 * --------------------------------------------------------------------------
 * Bootstrap toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME = 'toast';
const DATA_KEY = 'bs.toast';
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
const CLASS_NAME_SHOW = 'show';
const CLASS_NAME_SHOWING = 'showing';
const DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
const Default = {
  animation: true,
  autohide: true,
  delay: 5000
};

/**
 * Class definition
 */

class Toast extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;
    this._setListeners();
  }

  // Getters
  static get Default() {
    return Default;
  }
  static get DefaultType() {
    return DefaultType;
  }
  static get NAME() {
    return NAME;
  }

  // Public
  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._clearTimeout();
    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }
    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);
      EventHandler.trigger(this._element, EVENT_SHOWN);
      this._maybeScheduleHide();
    };
    this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
      this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
      EventHandler.trigger(this._element, EVENT_HIDDEN);
    };
    this._element.classList.add(CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout();
    if (this.isShown()) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }
    super.dispose();
  }
  isShown() {
    return this._element.classList.contains(CLASS_NAME_SHOW);
  }

  // Private

  _maybeScheduleHide() {
    if (!this._config.autohide) {
      return;
    }
    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return;
    }
    this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay);
  }
  _onInteraction(event, isInteracting) {
    switch (event.type) {
      case 'mouseover':
      case 'mouseout':
        {
          this._hasMouseInteraction = isInteracting;
          break;
        }
      case 'focusin':
      case 'focusout':
        {
          this._hasKeyboardInteraction = isInteracting;
          break;
        }
    }
    if (isInteracting) {
      this._clearTimeout();
      return;
    }
    const nextElement = event.relatedTarget;
    if (this._element === nextElement || this._element.contains(nextElement)) {
      return;
    }
    this._maybeScheduleHide();
  }
  _setListeners() {
    EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
    EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
  }
  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Toast.getOrCreateInstance(this, config);
      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      }
    });
  }
}

/**
 * Data API implementation
 */
exports.Toast = Toast;
enableDismissTrigger(Toast);

/**
 * jQuery
 */

defineJQueryPlugin(Toast);
},{"@popperjs/core":"S1OH"}],"Q2pJ":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;
/**
 * Represents a slider input element.
 */
var Slider = /*#__PURE__*/function () {
  /**
   * Creates a new Slider instance.
   * @param {string} id - The ID of the slider element.
   * @param {() => void} onChangeCallback - A callback function to execute when the slider value changes.
   */
  function Slider(id, onChangeCallback) {
    _classCallCheck(this, Slider);
    this.slider = document.getElementById(id);
    this.slider.oninput = onChangeCallback;
    this.onChangeCallback = onChangeCallback;
  }
  /**
   * Gets the minimum value of the slider.
   * @returns {number} - The minimum value.
   */
  return _createClass(Slider, [{
    key: "getMin",
    value: function getMin() {
      return parseInt(this.slider.min);
    }
    /**
     * Gets the maximum value of the slider.
     * @returns {number} - The maximum value.
     */
  }, {
    key: "getMax",
    value: function getMax() {
      return parseInt(this.slider.max);
    }
    /**
     * Gets the current value of the slider.
     * @returns {number} - The current value.
     */
  }, {
    key: "getValue",
    value: function getValue() {
      return parseInt(this.slider.value);
    }
    /**
     * Sets the value of the slider.
     * @param {number} value - The desired value.
     */
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.slider.value = String(value);
      this.onChangeCallback();
    }
  }]);
}();
exports.Slider = Slider;
},{}],"GFaE":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBox = void 0;
/**
 * Represents a checkbox element.
 */
var CheckBox = /*#__PURE__*/function () {
  /**
   * Creates a new CheckBox instance.
   * @param {string} id - The ID of the checkbox element.
   * @param {() => void} onChangeCallback - A callback function to execute when the checkbox value changes.
   */
  function CheckBox(id, onChangeCallback) {
    _classCallCheck(this, CheckBox);
    this.elem = document.getElementById(id);
    this.elem.onchange = onChangeCallback;
  }
  /**
   * Checks whether the checkbox is currently checked.
   * @returns {boolean} - True if checked, false otherwise.
   */
  return _createClass(CheckBox, [{
    key: "isChecked",
    value: function isChecked() {
      return this.elem.checked;
    }
    /**
     * Sets the checkbox to the specified checked state.
     * @param {boolean} checked - The desired checked state (true or false).
     */
  }, {
    key: "setChecked",
    value: function setChecked(checked) {
      this.elem.checked = checked;
    }
  }]);
}();
exports.CheckBox = CheckBox;
},{}],"N3UC":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Thumbnail = void 0;
/**
 * Represents a canvas-based thumbnail for an image.
 */
var Thumbnail = /*#__PURE__*/function () {
  /**
   * Creates a new Thumbnail instance.
   * @param {(filename: string) => void} onClickCallback - A callback function to execute when the thumbnail is clicked.
   * @param {number} imageSize - The desired size (width and height) of the thumbnail canvas.
   */
  function Thumbnail(onClickCallback) {
    var _this = this;
    var imageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    _classCallCheck(this, Thumbnail);
    this.image = new Image();
    this.onClickCallback = onClickCallback;
    this.a = document.createElement('a');
    this.canvas = document.createElement('canvas');
    this.canvas.className = "img-thumbnail m-2 mx-auto d-block";
    this.canvas.width = imageSize;
    this.canvas.height = imageSize;
    this.ctx = this.canvas.getContext('2d');
    this.image.onload = function () {
      return _this.draw();
    };
    this.a.href = '#';
    this.a.onclick = function (_) {
      return false;
    };
    this.a.appendChild(this.canvas);
  }
  /**
   * Sets the image source for the thumbnail.
   * @param {File} file - The image file.
   */
  return _createClass(Thumbnail, [{
    key: "setSource",
    value: function setSource(file) {
      var _this2 = this;
      var reader = new FileReader();
      reader.onload = function () {
        var result = reader.result;
        if (result) {
          _this2.image.src = result.toString();
        }
      };
      reader.readAsDataURL(file);
      this.a.onclick = function () {
        _this2.onClickCallback(file.name);
        return false;
      };
    }
    /**
     * Converts the Thumbnail to an HTML element.
     * @returns {HTMLElement} - The HTML anchor element containing the thumbnail canvas.
     */
  }, {
    key: "toHtml",
    value: function toHtml() {
      return this.a;
    }
    /**
     * Draws the image on the canvas, maintaining aspect ratio and centering it.
     */
  }, {
    key: "draw",
    value: function draw() {
      var scaleX = this.canvas.width / this.image.width;
      var scaleY = this.canvas.height / this.image.height;
      var zoomScale = scaleX < scaleY ? scaleX : scaleY;
      var offX = (this.canvas.width - this.image.width * zoomScale) / 2;
      var offY = (this.canvas.height - this.image.height * zoomScale) / 2;
      this.ctx.fillStyle = 'rgba(0,0,0,1)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.image, offX, offY, this.image.width * zoomScale, this.image.height * zoomScale);
    }
  }]);
}();
exports.Thumbnail = Thumbnail;
},{}],"hQdi":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileAnnotationHistory = void 0;
/**
 * Represents a history of annotations for a specific file.
 * Keeps track of changes made to a graph of points (e.g., annotations on an image).
 * @template T - Type of the points (must extend Point2D).
 */
var FileAnnotationHistory = /*#__PURE__*/function () {
  /**
   * Creates a new FileAnnotationHistory instance.
   * @param {File} file - The file associated with the annotations.
   * @param {number} cacheSize - The maximum number of history entries to retain.
   */
  function FileAnnotationHistory(file, cacheSize) {
    _classCallCheck(this, FileAnnotationHistory);
    this.history = [];
    this.currentHistoryIndex = 0;
    this._file = file;
    this.cacheSize = cacheSize;
  }
  /**
   * Gets the associated file.
   * @returns {File} - The file associated with the annotations.
   */
  return _createClass(FileAnnotationHistory, [{
    key: "file",
    get: function get() {
      return this._file;
    }
    /**
     * Adds a new annotation item to the history.
     * @param {Graph<T>} item - The graph of points representing the annotation.
     */
  }, {
    key: "add",
    value: function add(item) {
      if (this.currentHistoryIndex + 1 < this.history.length) {
        // Delete history stack when moved back and changed something
        this.history.length = this.currentHistoryIndex + 1;
      }
      if (this.cacheSize === this.history.length) {
        // Remove the first item as it is too old and cache limit is reached
        this.history.shift();
      }
      this.history.push(item.clone());
      this.currentHistoryIndex = this.history.length - 1;
    }
    /**
     * Sets the current history index to the specified value.
     * @param {number} index - The desired history index.
     */
  }, {
    key: "setIndex",
    value: function setIndex(index) {
      if (index < 0) {
        index = 0;
      } else if (index >= this.history.length) {
        index = this.history.length - 1;
      }
      this.currentHistoryIndex = index;
    }
    /**
     * Moves to the next history entry.
     */
  }, {
    key: "next",
    value: function next() {
      this.setIndex(this.currentHistoryIndex + 1);
    }
    /**
     * Moves to the previous history entry.
     */
  }, {
    key: "previous",
    value: function previous() {
      this.setIndex(this.currentHistoryIndex - 1);
    }
    /**
     * Retrieves the current annotation graph.
     * @returns {null | Graph<T>} - The current annotation graph or null if empty.
     */
  }, {
    key: "get",
    value: function get() {
      if (!this.isEmpty()) {
        return this.history[this.currentHistoryIndex];
      }
      return null;
    }
    /**
     * Checks if the history is empty.
     * @returns {boolean} - True if empty, false otherwise.
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.history.length === 0;
    }
    /**
     * Clears the entire history.
     */
  }, {
    key: "clear",
    value: function clear() {
      this.history.length = 0;
      this.currentHistoryIndex = 0;
    }
  }]);
}();
exports.FileAnnotationHistory = FileAnnotationHistory;
},{}],"gDGJ":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point2D = void 0;
/**
 * Represents a 2D point with an ID, coordinates, and neighbor information.
 */
var Point2D = /*#__PURE__*/function () {
  /**
   * Creates a new Point2D instance.
   * @param {number} id - The unique identifier for the point.
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   * @param {number[]} neighbourIds - An array of neighbor IDs.
   */
  function Point2D(id, x, y, neighbourIds) {
    _classCallCheck(this, Point2D);
    this._selected = false;
    this._hovered = false;
    this._deleted = false;
    this._id = id;
    this._x = x;
    this._y = y;
    this.neighbourIds = neighbourIds;
  }
  /**
   * Gets or sets whether the point is selected.
   * @returns {boolean} - True if selected, false otherwise.
   */
  return _createClass(Point2D, [{
    key: "selected",
    get: function get() {
      return this._selected;
    },
    set: function set(value) {
      this._selected = value;
    }
    /**
     * Gets or sets whether the point is hovered.
     * @returns {boolean} - True if hovered, false otherwise.
     */
  }, {
    key: "hovered",
    get: function get() {
      return this._hovered;
    },
    set: function set(value) {
      this._hovered = value;
    }
    /**
     * Gets or sets whether the point is marked as deleted.
     * @returns {boolean} - True if deleted, false otherwise.
     */
  }, {
    key: "deleted",
    get: function get() {
      return this._deleted;
    },
    set: function set(value) {
      this._deleted = value;
    }
    /**
     * Gets or sets the x-coordinate of the point.
     * @returns {number} - The x-coordinate.
     */
  }, {
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;
    }
    /**
     * Gets or sets the y-coordinate of the point.
     * @returns {number} - The y-coordinate.
     */
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;
    }
    /**
     * Returns a string representation of the point.
     * @returns {string} - A formatted string with point details.
     */
  }, {
    key: "toString",
    value: function toString() {
      return "Point2D(id=".concat(this.id, ", x=").concat(this.x, ", y=").concat(this.y, ")");
    }
    /**
     * Retrieves the unique ID of the point.
     * @returns {number} - The point's ID.
     */
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
    /**
     * Retrieves a copy of the neighbor IDs.
     * @returns {number[]} - An array of neighbor IDs.
     */
  }, {
    key: "getNeighbourIds",
    value: function getNeighbourIds() {
      return _toConsumableArray(this.neighbourIds);
    }
    /**
     * Moves the point to the specified coordinates.
     * @param {Point2D} point - The target point.
     */
  }, {
    key: "moveTo",
    value: function moveTo(point) {
      this.x = point.x;
      this.y = point.y;
    }
    /**
     * Creates a shallow copy of the point.
     * @returns {Point2D} - A new Point2D instance with cloned properties.
     */
  }, {
    key: "clone",
    value: function clone() {
      var copy = new Point2D(this.id, this._x, this._y, this.neighbourIds);
      copy.hovered = this.hovered;
      copy.deleted = this.deleted;
      copy.selected = this.selected;
      return copy;
    }
    /**
     * Converts the point to a dictionary object.
     * @returns {object} - A dictionary containing point properties.
     */
  }, {
    key: "toDict",
    value: function toDict() {
      return {
        id: this.id,
        x: this.x,
        y: this.y,
        // hovered: this.hovered,
        deleted: this.deleted
      };
    }
  }]);
}();
exports.Point2D = Point2D;
},{}],"n8rv":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Perspective2D = void 0;
/**
 * Represents a utility class for 2D perspective transformations.
 */
var Perspective2D = /*#__PURE__*/function () {
  function Perspective2D() {
    _classCallCheck(this, Perspective2D);
  }
  return _createClass(Perspective2D, null, [{
    key: "normalizedToDisplay",
    value:
    /**
     * Converts a normalized point (in the range [0, 1]) to display coordinates (pixel values).
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The normalized point.
     * @returns {Point2D} - The corresponding point in display coordinates.
     */
    function normalizedToDisplay(image, point) {
      var copy = point.clone();
      copy.x = point.x * image.width;
      copy.y = point.y * image.height;
      return copy;
    }
    /**
     * Projects a point from normalized coordinates to display coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The normalized point.
     * @returns {Point2D} - The projected point in display coordinates.
     */
  }, {
    key: "project",
    value: function project(image, point) {
      var displayedPoint = Perspective2D.normalizedToDisplay(image, point);
      var copy = point.clone();
      copy.x = displayedPoint.x;
      copy.y = displayedPoint.y;
      return copy;
    }
    /**
     * Calculates the Euclidean distance between two points in display coordinates.
     * @param {HTMLImageElement} image - The image on which the points are defined.
     * @param {Point2D} pointFrom - The starting point.
     * @param {Point2D} pointTo - The ending point.
     * @returns {number} - The distance between the two points.
     */
  }, {
    key: "distanceTo",
    value: function distanceTo(image, pointFrom, pointTo) {
      var projectPointFrom = Perspective2D.project(image, pointFrom);
      var projectPointTo = Perspective2D.project(image, pointTo);
      return Math.sqrt(Math.pow(projectPointFrom.x - projectPointTo.x, 2) + Math.pow(projectPointFrom.y - projectPointTo.y, 2));
    }
    /**
     * Checks if two points intersect within a specified delta distance.
     * @param {HTMLImageElement} image - The image on which the points are defined.
     * @param {Point2D} point - The first point.
     * @param {Point2D} pointCheck - The second point to check against.
     * @param {number} delta - The maximum allowed distance for intersection.
     * @returns {boolean} - True if the points intersect within the specified delta, false otherwise.
     */
  }, {
    key: "intersects",
    value: function intersects(image, point, pointCheck, delta) {
      return this.distanceTo(image, point, pointCheck) <= delta;
    }
    /**
     * Converts a point from display coordinates to normalized coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The point in display coordinates.
     * @returns {Point2D} - The corresponding point in normalized coordinates.
     */
  }, {
    key: "displayToNormalized",
    value: function displayToNormalized(image, point) {
      var copy = point.clone();
      copy.x = point.x / image.width;
      copy.y = point.y / image.height;
      return copy;
    }
    /**
     * Unprojects a point from display coordinates to normalized coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The point in display coordinates.
     * @returns {Point2D} - The corresponding point in normalized coordinates.
     */
  }, {
    key: "unproject",
    value: function unproject(image, point) {
      var normalizedPoint = Perspective2D.displayToNormalized(image, point);
      var copy = point.clone();
      copy.x = normalizedPoint.x;
      copy.y = normalizedPoint.y;
      return copy;
    }
  }]);
}();
exports.Perspective2D = Perspective2D;
},{}],"V4e4":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graph = void 0;
/**
 * Represents a graph of points in a 2D space.
 * @template P - Type of the points (must extend Point2D).
 */
var Graph = /*#__PURE__*/function () {
  /**
   * Creates a new Graph instance with the given points.
   * @param {P[]} points - An array of points.
   */
  function Graph(points) {
    _classCallCheck(this, Graph);
    this._points = points;
  }
  /**
   * Gets the array of points in the graph.
   * @returns {P[]} - An array of points.
   */
  return _createClass(Graph, [{
    key: "points",
    get: function get() {
      return this._points;
    }
    /**
     * Creates a Graph instance from a JSON object.
     * @param {P[]} jsonObject - An array of point objects in JSON format.
     * @param {() => P} newObject - A function to create a new point object.
     * @returns {Graph<P>} - A new Graph instance.
     */
  }, {
    key: "getById",
    value:
    /**
     * Retrieves a point from the graph by its ID.
     * @param {number} id - The ID of the point.
     * @returns {P} - The point with the specified ID.
     */
    function getById(id) {
      // @ts-ignore
      return this.points.find(function (p) {
        return p.id === id;
      });
    }
    /**
     * Retrieves the neighboring points of a given point.
     * @param {P} point - The point for which neighbors are requested.
     * @returns {P[]} - An array of neighboring points.
     */
  }, {
    key: "getNeighbourPointsOf",
    value: function getNeighbourPointsOf(point) {
      var _this = this;
      return point.getNeighbourIds().map(function (id) {
        return _this.getById(id);
      });
    }
    /**
     * Gets the selected point (if any) from the graph.
     * @returns {P | undefined} - The selected point or undefined if none is selected.
     */
  }, {
    key: "getSelected",
    value: function getSelected() {
      return this.points.find(function (p) {
        return p.selected && p.hovered;
      });
    }
    /**
     * Creates a shallow copy of the graph.
     * @returns {Graph<P>} - A new Graph instance with cloned points.
     */
  }, {
    key: "clone",
    value: function clone() {
      // @ts-ignore
      return new Graph(this.points.map(function (p) {
        return p.clone();
      }));
    }
    /**
     * Converts the graph to an array of dictionaries.
     * @returns {any[]} - An array of dictionaries representing the points.
     */
  }, {
    key: "toDictArray",
    value: function toDictArray() {
      return this.points.map(function (point) {
        return point.toDict();
      });
    }
  }], [{
    key: "fromJson",
    value: function fromJson(jsonObject, newObject) {
      return new Graph(jsonObject.map(function (dict) {
        var point = newObject(dict['id']);
        // @ts-ignore
        delete dict['id'];
        return Object.assign(point, dict);
      }));
    }
  }]);
}();
exports.Graph = Graph;
},{}],"J3Gj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionTaskRunner = exports.TaskRunner = exports.PoseLandmarker = exports.ObjectDetector = exports.MPMask = exports.MPImage = exports.InteractiveSegmenterResult = exports.InteractiveSegmenter = exports.ImageSegmenterResult = exports.ImageSegmenter = exports.ImageEmbedder = exports.ImageClassifier = exports.HolisticLandmarker = exports.HandLandmarker = exports.GestureRecognizer = exports.FilesetResolver = exports.FaceStylizer = exports.FaceLandmarker = exports.FaceDetector = exports.DrawingUtils = void 0;
var t = "undefined" != typeof self ? self : {};
function e(e) {
  t: {
    for (var n = ["CLOSURE_FLAGS"], r = t, s = 0; s < n.length; s++) if (null == (r = r[n[s]])) {
      n = null;
      break t;
    }
    n = r;
  }
  return null != (e = n && n[e]) && e;
}
function n() {
  throw Error("Invalid UTF8");
}
function r(t, e) {
  return e = String.fromCharCode.apply(null, e), null == t ? e : t + e;
}
let s, i;
const o = "undefined" != typeof TextDecoder;
let a;
const h = "undefined" != typeof TextEncoder;
function c(t) {
  if (h) t = (a ||= new TextEncoder()).encode(t);else {
    let n = 0;
    const r = new Uint8Array(3 * t.length);
    for (let s = 0; s < t.length; s++) {
      var e = t.charCodeAt(s);
      if (128 > e) r[n++] = e;else {
        if (2048 > e) r[n++] = e >> 6 | 192;else {
          if (55296 <= e && 57343 >= e) {
            if (56319 >= e && s < t.length) {
              const i = t.charCodeAt(++s);
              if (56320 <= i && 57343 >= i) {
                e = 1024 * (e - 55296) + i - 56320 + 65536, r[n++] = e >> 18 | 240, r[n++] = e >> 12 & 63 | 128, r[n++] = e >> 6 & 63 | 128, r[n++] = 63 & e | 128;
                continue;
              }
              s--;
            }
            e = 65533;
          }
          r[n++] = e >> 12 | 224, r[n++] = e >> 6 & 63 | 128;
        }
        r[n++] = 63 & e | 128;
      }
    }
    t = n === r.length ? r : r.subarray(0, n);
  }
  return t;
}
var u,
  l = e(610401301),
  d = e(188588736);
const f = t.navigator;
function p(t) {
  return !!l && !!u && u.brands.some(({
    brand: e
  }) => e && -1 != e.indexOf(t));
}
function g(e) {
  var n;
  return (n = t.navigator) && (n = n.userAgent) || (n = ""), -1 != n.indexOf(e);
}
function m() {
  return !!l && !!u && 0 < u.brands.length;
}
function y() {
  return m() ? p("Chromium") : (g("Chrome") || g("CriOS")) && !(!m() && g("Edge")) || g("Silk");
}
u = f && f.userAgentData || null;
var _ = !m() && (g("Trident") || g("MSIE"));
!g("Android") || y(), y(), g("Safari") && (y() || !m() && g("Coast") || !m() && g("Opera") || !m() && g("Edge") || (m() ? p("Microsoft Edge") : g("Edg/")) || m() && p("Opera"));
var v = {},
  E = null;
function w(t) {
  var e = t.length,
    n = 3 * e / 4;
  n % 3 ? n = Math.floor(n) : -1 != "=.".indexOf(t[e - 1]) && (n = -1 != "=.".indexOf(t[e - 2]) ? n - 2 : n - 1);
  var r = new Uint8Array(n),
    s = 0;
  return function (t, e) {
    function n(e) {
      for (; r < t.length;) {
        var n = t.charAt(r++),
          s = E[n];
        if (null != s) return s;
        if (!/^[\s\xa0]*$/.test(n)) throw Error("Unknown base64 encoding at char: " + n);
      }
      return e;
    }
    T();
    for (var r = 0;;) {
      var s = n(-1),
        i = n(0),
        o = n(64),
        a = n(64);
      if (64 === a && -1 === s) break;
      e(s << 2 | i >> 4), 64 != o && (e(i << 4 & 240 | o >> 2), 64 != a && e(o << 6 & 192 | a));
    }
  }(t, function (t) {
    r[s++] = t;
  }), s !== n ? r.subarray(0, s) : r;
}
function T() {
  if (!E) {
    E = {};
    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e = ["+/=", "+/", "-_=", "-_.", "-_"], n = 0; 5 > n; n++) {
      var r = t.concat(e[n].split(""));
      v[n] = r;
      for (var s = 0; s < r.length; s++) {
        var i = r[s];
        void 0 === E[i] && (E[i] = s);
      }
    }
  }
}
var A = "undefined" != typeof Uint8Array,
  b = !_ && "function" == typeof btoa;
function k(t) {
  if (!b) {
    var e;
    void 0 === e && (e = 0), T(), e = v[e];
    var n = Array(Math.floor(t.length / 3)),
      r = e[64] || "";
    let h = 0,
      c = 0;
    for (; h < t.length - 2; h += 3) {
      var s = t[h],
        i = t[h + 1],
        o = t[h + 2],
        a = e[s >> 2];
      s = e[(3 & s) << 4 | i >> 4], i = e[(15 & i) << 2 | o >> 6], o = e[63 & o], n[c++] = a + s + i + o;
    }
    switch (a = 0, o = r, t.length - h) {
      case 2:
        o = e[(15 & (a = t[h + 1])) << 2] || r;
      case 1:
        t = t[h], n[c] = e[t >> 2] + e[(3 & t) << 4 | a >> 4] + o + r;
    }
    return n.join("");
  }
  for (e = "", n = 0, r = t.length - 10240; n < r;) e += String.fromCharCode.apply(null, t.subarray(n, n += 10240));
  return e += String.fromCharCode.apply(null, n ? t.subarray(n) : t), btoa(e);
}
const x = /[-_.]/g,
  S = {
    "-": "+",
    _: "/",
    ".": "="
  };
function L(t) {
  return S[t] || "";
}
function F(t) {
  if (!b) return w(t);
  x.test(t) && (t = t.replace(x, L)), t = atob(t);
  const e = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
  return e;
}
function R(t) {
  return A && null != t && t instanceof Uint8Array;
}
let M;
function P() {
  return M ||= new Uint8Array(0);
}
var O = {};
let C;
function I(t) {
  if (t !== O) throw Error("illegal external caller");
}
function D() {
  return C ||= new U(null, O);
}
function N(t) {
  I(O);
  var e = t.g;
  return null == (e = null == e || R(e) ? e : "string" == typeof e ? F(e) : null) ? e : t.g = e;
}
var U = class {
  constructor(t, e) {
    if (I(e), this.g = t, null != t && 0 === t.length) throw Error("ByteString should be constructed with non-empty values");
  }
  h() {
    const t = N(this);
    return t ? new Uint8Array(t) : P();
  }
};
function B(t, e) {
  return Error(`Invalid wire type: ${t} (at position ${e})`);
}
function G() {
  return Error("Failed to read varint, encoding is invalid.");
}
function j(t, e) {
  return Error(`Tried to read past the end of the data ${e} > ${t}`);
}
function V(t) {
  if ("string" == typeof t) return {
    buffer: F(t),
    N: !1
  };
  if (Array.isArray(t)) return {
    buffer: new Uint8Array(t),
    N: !1
  };
  if (t.constructor === Uint8Array) return {
    buffer: t,
    N: !1
  };
  if (t.constructor === ArrayBuffer) return {
    buffer: new Uint8Array(t),
    N: !1
  };
  if (t.constructor === U) return {
    buffer: N(t) || P(),
    N: !0
  };
  if (t instanceof Uint8Array) return {
    buffer: new Uint8Array(t.buffer, t.byteOffset, t.byteLength),
    N: !1
  };
  throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
}
function X() {
  return "function" == typeof BigInt;
}
const H = "function" == typeof Uint8Array.prototype.slice;
let W,
  z = 0,
  K = 0;
function Y(t) {
  const e = 0 > t;
  let n = (t = Math.abs(t)) >>> 0;
  if (t = Math.floor((t - n) / 4294967296), e) {
    const [e, r] = nt(n, t);
    t = r, n = e;
  }
  z = n >>> 0, K = t >>> 0;
}
function $(t) {
  const e = W ||= new DataView(new ArrayBuffer(8));
  e.setFloat32(0, +t, !0), K = 0, z = e.getUint32(0, !0);
}
function q(t, e) {
  return 4294967296 * e + (t >>> 0);
}
function J(t, e) {
  const n = 2147483648 & e;
  return n && (e = ~e >>> 0, 0 == (t = 1 + ~t >>> 0) && (e = e + 1 >>> 0)), t = q(t, e), n ? -t : t;
}
function Z(t, e) {
  if (t >>>= 0, 2097151 >= (e >>>= 0)) var n = "" + (4294967296 * e + t);else X() ? n = "" + (BigInt(e) << BigInt(32) | BigInt(t)) : (t = (16777215 & t) + 6777216 * (n = 16777215 & (t >>> 24 | e << 8)) + 6710656 * (e = e >> 16 & 65535), n += 8147497 * e, e *= 2, 1e7 <= t && (n += Math.floor(t / 1e7), t %= 1e7), 1e7 <= n && (e += Math.floor(n / 1e7), n %= 1e7), n = e + Q(n) + Q(t));
  return n;
}
function Q(t) {
  return t = String(t), "0000000".slice(t.length) + t;
}
function tt() {
  var t = z,
    e = K;
  if (2147483648 & e) {
    if (X()) t = "" + (BigInt(0 | e) << BigInt(32) | BigInt(t >>> 0));else {
      const [n, r] = nt(t, e);
      t = "-" + Z(n, r);
    }
  } else t = Z(t, e);
  return t;
}
function et(t) {
  if (16 > t.length) Y(Number(t));else if (X()) t = BigInt(t), z = Number(t & BigInt(4294967295)) >>> 0, K = Number(t >> BigInt(32) & BigInt(4294967295));else {
    const e = +("-" === t[0]);
    K = z = 0;
    const n = t.length;
    for (let r = e, s = (n - e) % 6 + e; s <= n; r = s, s += 6) {
      const e = Number(t.slice(r, s));
      K *= 1e6, z = 1e6 * z + e, 4294967296 <= z && (K += Math.trunc(z / 4294967296), K >>>= 0, z >>>= 0);
    }
    if (e) {
      const [t, e] = nt(z, K);
      z = t, K = e;
    }
  }
}
function nt(t, e) {
  return e = ~e, t ? t = 1 + ~t : e += 1, [t, e];
}
function rt(t, e) {
  let n,
    r = 0,
    s = 0,
    i = 0;
  const o = t.h;
  let a = t.g;
  do {
    n = o[a++], r |= (127 & n) << i, i += 7;
  } while (32 > i && 128 & n);
  for (32 < i && (s |= (127 & n) >> 4), i = 3; 32 > i && 128 & n; i += 7) n = o[a++], s |= (127 & n) << i;
  if (lt(t, a), 128 > n) return e(r >>> 0, s >>> 0);
  throw G();
}
function st(t) {
  let e = 0,
    n = t.g;
  const r = n + 10,
    s = t.h;
  for (; n < r;) {
    const r = s[n++];
    if (e |= r, 0 == (128 & r)) return lt(t, n), !!(127 & e);
  }
  throw G();
}
function it(t) {
  const e = t.h;
  let n = t.g,
    r = e[n++],
    s = 127 & r;
  if (128 & r && (r = e[n++], s |= (127 & r) << 7, 128 & r && (r = e[n++], s |= (127 & r) << 14, 128 & r && (r = e[n++], s |= (127 & r) << 21, 128 & r && (r = e[n++], s |= r << 28, 128 & r && 128 & e[n++] && 128 & e[n++] && 128 & e[n++] && 128 & e[n++] && 128 & e[n++]))))) throw G();
  return lt(t, n), s;
}
function ot(t) {
  return it(t) >>> 0;
}
function at(t) {
  var e = t.h;
  const n = t.g,
    r = e[n],
    s = e[n + 1],
    i = e[n + 2];
  return e = e[n + 3], lt(t, t.g + 4), (r << 0 | s << 8 | i << 16 | e << 24) >>> 0;
}
function ht(t) {
  var e = at(t);
  t = 2 * (e >> 31) + 1;
  const n = e >>> 23 & 255;
  return e &= 8388607, 255 == n ? e ? NaN : 1 / 0 * t : 0 == n ? t * Math.pow(2, -149) * e : t * Math.pow(2, n - 150) * (e + Math.pow(2, 23));
}
function ct(t) {
  return it(t);
}
function ut(t, e, {
  ca: n = !1
} = {}) {
  t.ca = n, e && (e = V(e), t.h = e.buffer, t.m = e.N, t.j = 0, t.l = t.h.length, t.g = t.j);
}
function lt(t, e) {
  if (t.g = e, e > t.l) throw j(t.l, e);
}
function dt(t, e) {
  if (0 > e) throw Error(`Tried to read a negative byte length: ${e}`);
  const n = t.g,
    r = n + e;
  if (r > t.l) throw j(e, t.l - n);
  return t.g = r, n;
}
function ft(t, e) {
  if (0 == e) return D();
  var n = dt(t, e);
  return t.ca && t.m ? n = t.h.subarray(n, n + e) : (t = t.h, n = n === (e = n + e) ? P() : H ? t.slice(n, e) : new Uint8Array(t.subarray(n, e))), 0 == n.length ? D() : new U(n, O);
}
var pt = [];
function gt(t) {
  var e = t.g;
  if (e.g == e.l) return !1;
  t.l = t.g.g;
  var n = ot(t.g);
  if (e = n >>> 3, !(0 <= (n &= 7) && 5 >= n)) throw B(n, t.l);
  if (1 > e) throw Error(`Invalid field number: ${e} (at position ${t.l})`);
  return t.m = e, t.h = n, !0;
}
function mt(t) {
  switch (t.h) {
    case 0:
      0 != t.h ? mt(t) : st(t.g);
      break;
    case 1:
      lt(t = t.g, t.g + 8);
      break;
    case 2:
      if (2 != t.h) mt(t);else {
        var e = ot(t.g);
        lt(t = t.g, t.g + e);
      }
      break;
    case 5:
      lt(t = t.g, t.g + 4);
      break;
    case 3:
      for (e = t.m;;) {
        if (!gt(t)) throw Error("Unmatched start-group tag: stream EOF");
        if (4 == t.h) {
          if (t.m != e) throw Error("Unmatched end-group tag");
          break;
        }
        mt(t);
      }
      break;
    default:
      throw B(t.h, t.l);
  }
}
function yt(t, e, n) {
  const r = t.g.l,
    s = ot(t.g),
    i = t.g.g + s;
  let o = i - r;
  if (0 >= o && (t.g.l = i, n(e, t, void 0, void 0, void 0), o = i - t.g.g), o) throw Error(`Message parsing ended unexpectedly. Expected to read ${s} bytes, instead read ${s - o} bytes, either the data ended unexpectedly or the message misreported its own length`);
  return t.g.g = i, t.g.l = r, e;
}
function _t(t) {
  var e = ot(t.g),
    a = dt(t = t.g, e);
  if (t = t.h, o) {
    var h,
      c = t;
    (h = i) || (h = i = new TextDecoder("utf-8", {
      fatal: !0
    })), e = a + e, c = 0 === a && e === c.length ? c : c.subarray(a, e);
    try {
      var u = h.decode(c);
    } catch (t) {
      if (void 0 === s) {
        try {
          h.decode(new Uint8Array([128]));
        } catch (t) {}
        try {
          h.decode(new Uint8Array([97])), s = !0;
        } catch (t) {
          s = !1;
        }
      }
      throw !s && (i = void 0), t;
    }
  } else {
    e = (u = a) + e, a = [];
    let s,
      i = null;
    for (; u < e;) {
      var l = t[u++];
      128 > l ? a.push(l) : 224 > l ? u >= e ? n() : (s = t[u++], 194 > l || 128 != (192 & s) ? (u--, n()) : a.push((31 & l) << 6 | 63 & s)) : 240 > l ? u >= e - 1 ? n() : (s = t[u++], 128 != (192 & s) || 224 === l && 160 > s || 237 === l && 160 <= s || 128 != (192 & (h = t[u++])) ? (u--, n()) : a.push((15 & l) << 12 | (63 & s) << 6 | 63 & h)) : 244 >= l ? u >= e - 2 ? n() : (s = t[u++], 128 != (192 & s) || 0 != s - 144 + (l << 28) >> 30 || 128 != (192 & (h = t[u++])) || 128 != (192 & (c = t[u++])) ? (u--, n()) : (l = (7 & l) << 18 | (63 & s) << 12 | (63 & h) << 6 | 63 & c, l -= 65536, a.push(55296 + (l >> 10 & 1023), 56320 + (1023 & l)))) : n(), 8192 <= a.length && (i = r(i, a), a.length = 0);
    }
    u = r(i, a);
  }
  return u;
}
function vt(t) {
  const e = ot(t.g);
  return ft(t.g, e);
}
function Et(t, e, n) {
  var r = ot(t.g);
  for (r = t.g.g + r; t.g.g < r;) n.push(e(t.g));
}
var wt = [];
function Tt(t) {
  return t ? /^\d+$/.test(t) ? (et(t), new At(z, K)) : null : bt ||= new At(0, 0);
}
var At = class {
  constructor(t, e) {
    this.h = t >>> 0, this.g = e >>> 0;
  }
};
let bt;
function kt(t) {
  return t ? /^-?\d+$/.test(t) ? (et(t), new xt(z, K)) : null : St ||= new xt(0, 0);
}
var xt = class {
  constructor(t, e) {
    this.h = t >>> 0, this.g = e >>> 0;
  }
};
let St;
function Lt(t, e, n) {
  for (; 0 < n || 127 < e;) t.g.push(127 & e | 128), e = (e >>> 7 | n << 25) >>> 0, n >>>= 7;
  t.g.push(e);
}
function Ft(t, e) {
  for (; 127 < e;) t.g.push(127 & e | 128), e >>>= 7;
  t.g.push(e);
}
function Rt(t, e) {
  if (0 <= e) Ft(t, e);else {
    for (let n = 0; 9 > n; n++) t.g.push(127 & e | 128), e >>= 7;
    t.g.push(1);
  }
}
function Mt(t, e) {
  t.g.push(e >>> 0 & 255), t.g.push(e >>> 8 & 255), t.g.push(e >>> 16 & 255), t.g.push(e >>> 24 & 255);
}
function Pt(t, e) {
  0 !== e.length && (t.l.push(e), t.h += e.length);
}
function Ot(t, e, n) {
  Ft(t.g, 8 * e + n);
}
function Ct(t, e) {
  return Ot(t, e, 2), e = t.g.end(), Pt(t, e), e.push(t.h), e;
}
function It(t, e) {
  var n = e.pop();
  for (n = t.h + t.g.length() - n; 127 < n;) e.push(127 & n | 128), n >>>= 7, t.h++;
  e.push(n), t.h++;
}
function Dt(t, e, n) {
  Ot(t, e, 2), Ft(t.g, n.length), Pt(t, t.g.end()), Pt(t, n);
}
function Nt(t, e, n, r) {
  null != n && (e = Ct(t, e), r(n, t), It(t, e));
}
class Ut {
  constructor(t, e, n, r) {
    this.g = t, this.h = e, this.l = n, this.pa = r;
  }
}
function Bt(t) {
  return Array.prototype.slice.call(t);
}
function Gt(t) {
  return "function" == typeof Symbol && "symbol" == typeof Symbol() ? Symbol() : t;
}
var jt = Gt(),
  Vt = Gt("0di"),
  Xt = jt ? (t, e) => {
    t[jt] |= e;
  } : (t, e) => {
    void 0 !== t.g ? t.g |= e : Object.defineProperties(t, {
      g: {
        value: e,
        configurable: !0,
        writable: !0,
        enumerable: !1
      }
    });
  },
  Ht = jt ? (t, e) => {
    t[jt] &= ~e;
  } : (t, e) => {
    void 0 !== t.g && (t.g &= ~e);
  };
function Wt(t, e, n) {
  return n ? t | e : t & ~e;
}
var zt = jt ? t => 0 | t[jt] : t => 0 | t.g,
  Kt = jt ? t => t[jt] : t => t.g,
  Yt = jt ? (t, e) => (t[jt] = e, t) : (t, e) => (void 0 !== t.g ? t.g = e : Object.defineProperties(t, {
    g: {
      value: e,
      configurable: !0,
      writable: !0,
      enumerable: !1
    }
  }), t);
function $t(t) {
  return Xt(t, 34), t;
}
function qt(t, e) {
  Yt(e, -14591 & (0 | t));
}
function Jt(t, e) {
  Yt(e, -14557 & (34 | t));
}
function Zt(t) {
  return 0 === (t = t >> 14 & 1023) ? 536870912 : t;
}
var Qt,
  te = {},
  ee = {};
function ne(t) {
  return !(!t || "object" != typeof t || t.Ja !== ee);
}
function re(t) {
  return null !== t && "object" == typeof t && !Array.isArray(t) && t.constructor === Object;
}
function se(t, e, n) {
  if (null != t) if ("string" == typeof t) t = t ? new U(t, O) : D();else if (t.constructor !== U) if (R(t)) t = t.length ? new U(n ? t : new Uint8Array(t), O) : D();else {
    if (!e) throw Error();
    t = void 0;
  }
  return t;
}
function ie(t, e, n) {
  if (!Array.isArray(t) || t.length) return !1;
  const r = zt(t);
  return !!(1 & r) || !(!e || !(Array.isArray(e) ? e.includes(n) : e.has(n))) && (Yt(t, 1 | r), !0);
}
const oe = [];
function ae(t) {
  if (2 & t) throw Error();
}
Yt(oe, 55), Qt = Object.freeze(oe);
class he {
  constructor(t, e, n) {
    this.l = 0, this.g = t, this.h = e, this.m = n;
  }
  next() {
    if (this.l < this.g.length) {
      const t = this.g[this.l++];
      return {
        done: !1,
        value: this.h ? this.h.call(this.m, t) : t
      };
    }
    return {
      done: !0,
      value: void 0
    };
  }
  [Symbol.iterator]() {
    return new he(this.g, this.h, this.m);
  }
}
let ce, ue;
function le(t, e) {
  (e = ce ? e[ce] : void 0) && (t[ce] = Bt(e));
}
function de(t) {
  return (t = Error(t)).__closure__error__context__984382 || (t.__closure__error__context__984382 = {}), t.__closure__error__context__984382.severity = "warning", t;
}
function fe(t) {
  return null == t || "number" == typeof t ? t : "NaN" === t || "Infinity" === t || "-Infinity" === t ? Number(t) : void 0;
}
function pe(t) {
  return null == t || "boolean" == typeof t ? t : "number" == typeof t ? !!t : void 0;
}
Object.freeze(new class {}()), Object.freeze(new class {}());
const ge = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function me(t) {
  const e = typeof t;
  return "number" === e ? Number.isFinite(t) : "string" === e && ge.test(t);
}
function ye(t) {
  if (null == t) return t;
  if ("string" == typeof t) {
    if (!t) return;
    t = +t;
  }
  return "number" == typeof t && Number.isFinite(t) ? 0 | t : void 0;
}
function _e(t) {
  if (null == t) return t;
  if ("string" == typeof t) {
    if (!t) return;
    t = +t;
  }
  return "number" == typeof t && Number.isFinite(t) ? t >>> 0 : void 0;
}
function ve(t) {
  return "-" !== t[0] && (20 > t.length || 20 === t.length && 184467 > Number(t.substring(0, 6)));
}
function Ee(t) {
  return "-" === t[0] ? 20 > t.length || 20 === t.length && -922337 < Number(t.substring(0, 7)) : 19 > t.length || 19 === t.length && 922337 > Number(t.substring(0, 6));
}
function we(t) {
  return t = Math.trunc(t), Number.isSafeInteger(t) || (Y(t), t = J(z, K)), t;
}
function Te(t) {
  var e = Math.trunc(Number(t));
  return Number.isSafeInteger(e) ? String(e) : (-1 !== (e = t.indexOf(".")) && (t = t.substring(0, e)), Ee(t) || (et(t), t = tt()), t);
}
function Ae(t) {
  return null == t ? t : me(t) ? "number" == typeof t ? we(t) : Te(t) : void 0;
}
function be(t) {
  if ("string" != typeof t) throw Error();
  return t;
}
function ke(t) {
  if (null != t && "string" != typeof t) throw Error();
  return t;
}
function xe(t) {
  return null == t || "string" == typeof t ? t : void 0;
}
function Se(t, e, n, r) {
  if (null != t && "object" == typeof t && t.X === te) return t;
  if (!Array.isArray(t)) return n ? 2 & r ? (t = e[Vt]) ? e = t : ($t((t = new e()).u), e = e[Vt] = t) : e = new e() : e = void 0, e;
  let s = n = zt(t);
  return 0 === s && (s |= 32 & r), s |= 2 & r, s !== n && Yt(t, s), new e(t);
}
function Le(t, e, n) {
  if (e) {
    var r = !!r;
    if (!me(e = t)) throw de("int64");
    "string" == typeof e ? r = Te(e) : r ? (r = Math.trunc(e), Number.isSafeInteger(r) ? r = String(r) : Ee(e = String(r)) ? r = e : (Y(r), r = tt())) : r = we(e);
  } else r = Ae(t);
  return "string" == typeof (n = null == (t = r) ? n ? 0 : void 0 : t) && (r = +n, Number.isSafeInteger(r)) ? r : n;
}
let Fe, Re, Me;
function Pe(t) {
  switch (typeof t) {
    case "boolean":
      return Re ||= [0, void 0, !0];
    case "number":
      return 0 < t ? void 0 : 0 === t ? Me ||= [0, void 0] : [-t, void 0];
    case "string":
      return [0, t];
    case "object":
      return t;
  }
}
function Oe(t, e) {
  return Ce(t, e[0], e[1]);
}
function Ce(t, e, n) {
  if (null == t && (t = Fe), Fe = void 0, null == t) {
    var r = 96;
    n ? (t = [n], r |= 512) : t = [], e && (r = -16760833 & r | (1023 & e) << 14);
  } else {
    if (!Array.isArray(t)) throw Error();
    if (2048 & (r = zt(t))) throw Error();
    if (64 & r) return t;
    if (r |= 64, n && (r |= 512, n !== t[0])) throw Error();
    t: {
      const s = (n = t).length;
      if (s) {
        const t = s - 1;
        if (re(n[t])) {
          if (1024 <= (e = t - (+!!(512 & (r |= 256)) - 1))) throw Error();
          r = -16760833 & r | (1023 & e) << 14;
          break t;
        }
      }
      if (e) {
        if (1024 < (e = Math.max(e, s - (+!!(512 & r) - 1)))) throw Error();
        r = -16760833 & r | (1023 & e) << 14;
      }
    }
  }
  return Yt(t, r), t;
}
const Ie = {};
let De = function () {
  try {
    return new class extends Map {
      constructor() {
        super();
      }
    }(), !1;
  } catch {
    return !0;
  }
}();
class Ne {
  constructor() {
    this.g = new Map();
  }
  get(t) {
    return this.g.get(t);
  }
  set(t, e) {
    return this.g.set(t, e), this.size = this.g.size, this;
  }
  delete(t) {
    return t = this.g.delete(t), this.size = this.g.size, t;
  }
  clear() {
    this.g.clear(), this.size = this.g.size;
  }
  has(t) {
    return this.g.has(t);
  }
  entries() {
    return this.g.entries();
  }
  keys() {
    return this.g.keys();
  }
  values() {
    return this.g.values();
  }
  forEach(t, e) {
    return this.g.forEach(t, e);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
}
const Ue = De ? (Object.setPrototypeOf(Ne.prototype, Map.prototype), Object.defineProperties(Ne.prototype, {
  size: {
    value: 0,
    configurable: !0,
    enumerable: !0,
    writable: !0
  }
}), Ne) : class extends Map {
  constructor() {
    super();
  }
};
function Be(t) {
  return t;
}
function Ge(t) {
  if (2 & t.L) throw Error("Cannot mutate an immutable Map");
}
var je = class extends Ue {
  constructor(t, e, n = Be, r = Be) {
    super();
    let s = zt(t);
    s |= 64, Yt(t, s), this.L = s, this.U = e, this.S = n, this.Z = this.U ? Ve : r;
    for (let i = 0; i < t.length; i++) {
      const o = t[i],
        a = n(o[0], !1, !0);
      let h = o[1];
      e ? void 0 === h && (h = null) : h = r(o[1], !1, !0, void 0, void 0, s), super.set(a, h);
    }
  }
  oa(t = Xe) {
    if (0 !== this.size) return this.Y(t);
  }
  Y(t = Xe) {
    const e = [],
      n = super.entries();
    for (var r; !(r = n.next()).done;) (r = r.value)[0] = t(r[0]), r[1] = t(r[1]), e.push(r);
    return e;
  }
  clear() {
    Ge(this), super.clear();
  }
  delete(t) {
    return Ge(this), super.delete(this.S(t, !0, !1));
  }
  entries() {
    var t = this.na();
    return new he(t, He, this);
  }
  keys() {
    return this.Ia();
  }
  values() {
    var t = this.na();
    return new he(t, je.prototype.get, this);
  }
  forEach(t, e) {
    super.forEach((n, r) => {
      t.call(e, this.get(r), r, this);
    });
  }
  set(t, e) {
    return Ge(this), null == (t = this.S(t, !0, !1)) ? this : null == e ? (super.delete(t), this) : super.set(t, this.Z(e, !0, !0, this.U, !1, this.L));
  }
  Oa(t) {
    const e = this.S(t[0], !1, !0);
    t = t[1], t = this.U ? void 0 === t ? null : t : this.Z(t, !1, !0, void 0, !1, this.L), super.set(e, t);
  }
  has(t) {
    return super.has(this.S(t, !1, !1));
  }
  get(t) {
    t = this.S(t, !1, !1);
    const e = super.get(t);
    if (void 0 !== e) {
      var n = this.U;
      return n ? ((n = this.Z(e, !1, !0, n, this.ta, this.L)) !== e && super.set(t, n), n) : e;
    }
  }
  na() {
    return Array.from(super.keys());
  }
  Ia() {
    return super.keys();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
};
function Ve(t, e, n, r, s, i) {
  return t = Se(t, r, n, i), s && (t = tn(t)), t;
}
function Xe(t) {
  return t;
}
function He(t) {
  return [t, this.get(t)];
}
let We;
function ze() {
  return We ||= new je($t([]), void 0, void 0, void 0, Ie);
}
function Ke(t, e, n, r, s) {
  if (null != t) {
    if (Array.isArray(t)) t = ie(t, void 0, 0) ? void 0 : s && 2 & zt(t) ? t : Ye(t, e, n, void 0 !== r, s);else if (re(t)) {
      const i = {};
      for (let o in t) i[o] = Ke(t[o], e, n, r, s);
      t = i;
    } else t = e(t, r);
    return t;
  }
}
function Ye(t, e, n, r, s) {
  const i = r || n ? zt(t) : 0;
  r = r ? !!(32 & i) : void 0;
  const o = Bt(t);
  for (let t = 0; t < o.length; t++) o[t] = Ke(o[t], e, n, r, s);
  return n && (le(o, t), n(i, o)), o;
}
function $e(t) {
  return Ke(t, qe, void 0, void 0, !1);
}
function qe(t) {
  return t.X === te ? t.toJSON() : t instanceof je ? t.oa($e) : function (t) {
    switch (typeof t) {
      case "number":
        return isFinite(t) ? t : String(t);
      case "boolean":
        return t ? 1 : 0;
      case "object":
        if (t) if (Array.isArray(t)) {
          if (ie(t, void 0, 0)) return;
        } else {
          if (R(t)) return k(t);
          if (t instanceof U) {
            const e = t.g;
            return null == e ? "" : "string" == typeof e ? e : t.g = k(e);
          }
          if (t instanceof je) return t.oa();
        }
    }
    return t;
  }(t);
}
function Je(t, e, n = Jt) {
  if (null != t) {
    if (A && t instanceof Uint8Array) return e ? t : new Uint8Array(t);
    if (Array.isArray(t)) {
      var r = zt(t);
      return 2 & r ? t : (e &&= 0 === r || !!(32 & r) && !(64 & r || !(16 & r)), e ? Yt(t, -12293 & (34 | r)) : Ye(t, Je, 4 & r ? Jt : n, !0, !0));
    }
    return t.X === te ? (n = t.u, t = 2 & (r = Kt(n)) ? t : Ze(t, n, r, !0)) : t instanceof je && !(2 & t.L) && (n = $t(t.Y(Je)), t = new je(n, t.U, t.S, t.Z)), t;
  }
}
function Ze(t, e, n, r) {
  return t = t.constructor, Fe = e = Qe(e, n, r), e = new t(e), Fe = void 0, e;
}
function Qe(t, e, n) {
  const r = n || 2 & e ? Jt : qt,
    s = !!(32 & e);
  return t = function (t, e, n) {
    const r = Bt(t);
    var s = r.length;
    const i = 256 & e ? r[s - 1] : void 0;
    for (s += i ? -1 : 0, e = 512 & e ? 1 : 0; e < s; e++) r[e] = n(r[e]);
    if (i) {
      e = r[e] = {};
      for (const t in i) e[t] = n(i[t]);
    }
    return le(r, t), r;
  }(t, e, t => Je(t, s, r)), Xt(t, 32 | (n ? 2 : 0)), t;
}
function tn(t) {
  const e = t.u,
    n = Kt(e);
  return 2 & n ? Ze(t, e, n, !1) : t;
}
function en(t, e) {
  return nn(t = t.u, Kt(t), e);
}
function nn(t, e, n, r) {
  if (-1 === n) return null;
  if (n >= Zt(e)) {
    if (256 & e) return t[t.length - 1][n];
  } else {
    var s = t.length;
    if (r && 256 & e && null != (r = t[s - 1][n])) return r;
    if ((e = n + (+!!(512 & e) - 1)) < s) return t[e];
  }
}
function rn(t, e, n, r) {
  const s = t.u;
  let i = Kt(s);
  return ae(i), sn(s, i, e, n, r), t;
}
function sn(t, e, n, r, s) {
  const i = Zt(e);
  if (n >= i || s) {
    let o = e;
    if (256 & e) s = t[t.length - 1];else {
      if (null == r) return o;
      s = t[i + (+!!(512 & e) - 1)] = {}, o |= 256;
    }
    return s[n] = r, n < i && (t[n + (+!!(512 & e) - 1)] = void 0), o !== e && Yt(t, o), o;
  }
  return t[n + (+!!(512 & e) - 1)] = r, 256 & e && n in (t = t[t.length - 1]) && delete t[n], e;
}
function on(t, e, n, r, s) {
  var i = 2 & e;
  let o = nn(t, e, n, s);
  Array.isArray(o) || (o = Qt);
  const a = !(2 & r);
  r = !(1 & r);
  const h = !!(32 & e);
  let c = zt(o);
  return 0 !== c || !h || i || a ? 1 & c || (c |= 1, Yt(o, c)) : (c |= 33, Yt(o, c)), i ? (t = !1, 2 & c || ($t(o), t = !!(4 & c)), (r || t) && Object.freeze(o)) : (i = !!(2 & c) || !!(2048 & c), r && i ? (o = Bt(o), r = 1, h && !a && (r |= 32), Yt(o, r), sn(t, e, n, o, s)) : a && 32 & c && !i && Ht(o, 32)), o;
}
function an(t, e) {
  t = t.u;
  let n = Kt(t);
  const r = nn(t, n, e),
    s = fe(r);
  return null != s && s !== r && sn(t, n, e, s), s;
}
function hn(t) {
  t = t.u;
  let e = Kt(t);
  const n = nn(t, e, 1),
    r = se(n, !0, !!(34 & e));
  return null != r && r !== n && sn(t, e, 1, r), r;
}
function cn(t, e, n) {
  t = t.u;
  let r = Kt(t);
  const s = 2 & r ? 1 : 2;
  let i = un(t, r, e);
  var o = zt(i);
  if (!(4 & o)) {
    (4 & o || Object.isFrozen(i)) && (i = Bt(i), o = Sn(o, r, !1), r = sn(t, r, e, i));
    var a = 0;
    let s = 0;
    for (; a < i.length; a++) {
      const t = n(i[a]);
      null != t && (i[s++] = t);
    }
    s < a && (i.length = s), o = Wt(o = ln(o, r, !1), 20, !0), o = Wt(o, 4096, !1), o = Wt(o, 8192, !1), Yt(i, o), 2 & o && Object.freeze(i);
  }
  return dn(o) || (n = o, (o = (a = 1 === s) ? Wt(o, 2, !0) : Wt(o, 32, !1)) !== n && Yt(i, o), a && Object.freeze(i)), 2 === s && dn(o) && (i = Bt(i), o = Sn(o, r, !1), Yt(i, o), sn(t, r, e, i)), i;
}
function un(t, e, n) {
  return t = nn(t, e, n), Array.isArray(t) ? t : Qt;
}
function ln(t, e, n) {
  return 0 === t && (t = Sn(t, e, n)), Wt(t, 1, !0);
}
function dn(t) {
  return !!(2 & t) && !!(4 & t) || !!(2048 & t);
}
function fn(t) {
  t = Bt(t);
  for (let e = 0; e < t.length; e++) {
    const n = t[e] = Bt(t[e]);
    Array.isArray(n[1]) && (n[1] = $t(n[1]));
  }
  return t;
}
function pn(t, e, n) {
  {
    const o = t.u;
    let a = Kt(o);
    if (ae(a), null == n) sn(o, a, e);else {
      var r,
        s = t = zt(n),
        i = !!(2 & t) || Object.isFrozen(n);
      if ((r = !i) && (r = !1), !(4 & t)) for (t = 21, i && (n = Bt(n), s = 0, t = Sn(t, a, !0)), i = 0; i < n.length; i++) n[i] = be(n[i]);
      r && (n = Bt(n), s = 0, t = Sn(t, a, !0)), t !== s && Yt(n, t), sn(o, a, e, n);
    }
  }
}
function gn(t, e, n, r) {
  t = t.u;
  let s = Kt(t);
  ae(s), sn(t, s, e, ("0" === r ? 0 === Number(n) : n === r) ? void 0 : n);
}
function mn(t, e, n, r) {
  const s = Kt(t);
  ae(s), t = on(t, s, e, 2), r = n(r, !!(4 & (e = zt(t))) && !!(4096 & e)), t.push(r);
}
function yn(t) {
  return t;
}
function _n(t, e) {
  return vn(t = t.u, Kt(t), di) === e ? e : -1;
}
function vn(t, e, n) {
  let r = 0;
  for (let s = 0; s < n.length; s++) {
    const i = n[s];
    null != nn(t, e, i) && (0 !== r && (e = sn(t, e, r)), r = i);
  }
  return r;
}
function En(t, e, n, r) {
  let s = Kt(t);
  ae(s);
  const i = nn(t, s, n, r);
  let o;
  if (null != i && i.X === te) return (e = tn(i)) !== i && sn(t, s, n, e, r), e.u;
  if (Array.isArray(i)) {
    const t = zt(i);
    o = 2 & t ? Qe(i, t, !1) : i, o = Oe(o, e);
  } else o = Oe(void 0, e);
  return o !== i && sn(t, s, n, o, r), o;
}
function wn(t, e, n, r) {
  t = t.u;
  let s = Kt(t);
  const i = nn(t, s, n, r);
  return (e = Se(i, e, !1, s)) !== i && null != e && sn(t, s, n, e, r), e;
}
function Tn(t, e, n, r = !1) {
  if (null == (e = wn(t, e, n, r))) return e;
  t = t.u;
  let s = Kt(t);
  if (!(2 & s)) {
    const i = tn(e);
    i !== e && sn(t, s, n, e = i, r);
  }
  return e;
}
function An(t, e, n, r, s, i) {
  var o = !!(2 & e),
    a = o ? 1 : 2;
  const h = 1 === a;
  a = 2 === a, s = !!s, i &&= !o, o = un(t, e, r);
  var c = zt(o);
  const u = !!(4 & c);
  if (!u) {
    var l = o,
      d = e;
    const t = !!(2 & (c = ln(c, e, s)));
    t && (d = Wt(d, 2, !0));
    let r = !t,
      i = !0,
      a = 0,
      h = 0;
    for (; a < l.length; a++) {
      const e = Se(l[a], n, !1, d);
      if (e instanceof n) {
        if (!t) {
          const t = !!(2 & zt(e.u));
          r &&= !t, i &&= t;
        }
        l[h++] = e;
      }
    }
    h < a && (l.length = h), c = Wt(c, 4, !0), c = Wt(c, 16, i), c = Wt(c, 8, r), Yt(l, c), t && Object.freeze(l);
  }
  if (n = !!(8 & c) || h && !o.length, i && !n) {
    for (dn(c) && (o = Bt(o), c = Sn(c, e, s), e = sn(t, e, r, o)), i = o, n = c, l = 0; l < i.length; l++) (c = i[l]) !== (d = tn(c)) && (i[l] = d);
    n = Wt(n, 8, !0), n = Wt(n, 16, !i.length), Yt(i, n), c = n;
  }
  return dn(c) || (i = c, h ? c = Wt(c, !o.length || 16 & c && (!u || 32 & c) ? 2 : 2048, !0) : s || (c = Wt(c, 32, !1)), c !== i && Yt(o, c), h && Object.freeze(o)), a && dn(c) && (o = Bt(o), c = Sn(c, e, s), Yt(o, c), sn(t, e, r, o)), o;
}
function bn(t, e, n) {
  t = t.u;
  const r = Kt(t);
  return An(t, r, e, n, !1, !(2 & r));
}
function kn(t, e, n, r, s) {
  return null == r && (r = void 0), rn(t, n, r, s);
}
function xn(t, e, n, r) {
  null == r && (r = void 0), t = t.u;
  let s = Kt(t);
  ae(s), (n = vn(t, s, n)) && n !== e && null != r && (s = sn(t, s, n)), sn(t, s, e, r);
}
function Sn(t, e, n) {
  return t = Wt(t, 2, !!(2 & e)), t = Wt(t, 32, !!(32 & e) && n), Wt(t, 2048, !1);
}
function Ln(t, e, n, r) {
  t = t.u;
  const s = Kt(t);
  ae(s), e = An(t, s, n, e, !0), n = null != r ? r : new n(), e.push(n), 2 & zt(n.u) ? Ht(e, 8) : Ht(e, 16);
}
function Fn(t, e) {
  return ye(en(t, e));
}
function Rn(t, e) {
  return xe(en(t, e));
}
function Mn(t) {
  return t ?? 0;
}
function Pn(t, e) {
  return Mn(an(t, e));
}
function On(t, e, n) {
  if (null != n && "boolean" != typeof n) throw t = typeof n, Error(`Expected boolean but got ${"object" != t ? t : n ? Array.isArray(n) ? "array" : t : "null"}: ${n}`);
  rn(t, e, n);
}
function Cn(t, e, n) {
  if (null != n) {
    if ("number" != typeof n) throw de("int32");
    if (!Number.isFinite(n)) throw de("int32");
    n |= 0;
  }
  rn(t, e, n);
}
function In(t, e, n) {
  if (null != n && "number" != typeof n) throw Error(`Value of float/double field must be a number, found ${typeof n}: ${n}`);
  rn(t, e, n);
}
function Dn(t, e, n) {
  e.g ? e.m(t, e.g, e.h, n, !0) : e.m(t, e.h, n, !0);
}
je.prototype.toJSON = void 0, je.prototype.Ja = ee;
var Nn = class {
  constructor(t, e) {
    this.u = Ce(t, e);
  }
  toJSON() {
    return Un(this, Ye(this.u, qe, void 0, void 0, !1), !0);
  }
  l() {
    var t = mo;
    return t.g ? t.l(this, t.g, t.h, !0) : t.l(this, t.h, t.defaultValue, !0);
  }
  clone() {
    const t = this.u;
    return Ze(this, t, Kt(t), !1);
  }
  N() {
    return !!(2 & zt(this.u));
  }
};
function Un(t, e, n) {
  var r = d ? void 0 : t.constructor.A;
  const s = Kt(n ? t.u : e);
  if (!(t = e.length)) return e;
  let i, o;
  if (re(n = e[t - 1])) {
    t: {
      var a = n;
      let t = {},
        e = !1;
      for (var h in a) {
        let n = a[h];
        if (Array.isArray(n)) {
          let t = n;
          (ie(n, r, +h) || ne(n) && 0 === n.size) && (n = null), n != t && (e = !0);
        }
        null != n ? t[h] = n : e = !0;
      }
      if (e) {
        for (var c in t) {
          a = t;
          break t;
        }
        a = null;
      }
    }
    a != n && (i = !0), t--;
  }
  for (h = +!!(512 & s) - 1; 0 < t && (n = e[c = t - 1], c -= h, null == n || ie(n, r, c) || ne(n) && 0 === n.size); t--) o = !0;
  return i || o ? (e = Array.prototype.slice.call(e, 0, t), a && e.push(a), e) : e;
}
function Bn(t) {
  return Array.isArray(t) ? t[0] instanceof Ut ? t : [Gr, t] : [t, void 0];
}
function Gn(t, e) {
  if (Array.isArray(e)) {
    var n = zt(e);
    if (4 & n) return e;
    for (var r = 0, s = 0; r < e.length; r++) {
      const n = t(e[r]);
      null != n && (e[s++] = n);
    }
    return s < r && (e.length = s), Yt(e, -12289 & (5 | n)), 2 & n && Object.freeze(e), e;
  }
}
Nn.prototype.X = te, Nn.prototype.toString = function () {
  return Un(this, this.u, !1).toString();
};
const jn = Symbol();
function Vn(t) {
  let e = t[jn];
  if (!e) {
    const n = qn(t),
      r = hr(t),
      s = r.l;
    e = s ? (t, e) => s(t, e, r) : (t, e) => {
      for (; gt(e) && 4 != e.h;) {
        var s = e.m,
          i = r[s];
        if (!i) {
          var o = r.ea;
          o && (o = o[s]) && (i = r[s] = Xn(o));
        }
        i && i(e, t, s) || (s = (i = e).l, mt(i), i.ia ? i = void 0 : (o = i.g.g - s, i.g.g = s, i = ft(i.g, o)), s = t, i && (ce ||= Symbol(), (o = s[ce]) ? o.push(i) : s[ce] = [i]));
      }
      n === Wn || n === zn || n.j || (t[ue ||= Symbol()] = n);
    }, t[jn] = e;
  }
  return e;
}
function Xn(t) {
  const e = (t = Bn(t))[0].g;
  if (t = t[1]) {
    const n = Vn(t),
      r = hr(t).T;
    return (t, s, i) => e(t, s, i, r, n);
  }
  return e;
}
class Hn {}
let Wn, zn;
const Kn = Symbol();
function Yn(t, e, n) {
  const r = n[1];
  let s;
  if (r) {
    const n = r[Kn];
    s = n ? n.T : Pe(r[0]), t[e] = n ?? r;
  }
  s && s === Re ? (t.g || (t.g = new Set())).add(e) : n[0] && (t.h || (t.h = new Set())).add(e);
}
function $n(t, e) {
  return [t.l, !e || 0 < e[0] ? void 0 : e];
}
function qn(t) {
  var e = t[Kn];
  if (e) return e;
  if (!(e = Zn(t, t[Kn] = new Hn(), $n, $n, Yn)).ea && !e.h && !e.g) {
    let n = !0;
    for (let t in e) isNaN(t) || (n = !1);
    n ? (Pe(t[0]) === Re ? zn ? e = zn : ((e = new Hn()).T = Pe(!0), e = zn = e) : e = Wn ||= new Hn(), e = t[Kn] = e) : e.j = !0;
  }
  return e;
}
function Jn(t, e, n) {
  t[e] = n;
}
function Zn(t, e, n, r, s = Jn) {
  e.T = Pe(t[0]);
  let i = 0;
  var o = t[++i];
  o && o.constructor === Object && (e.ea = o, "function" == typeof (o = t[++i]) && (e.l = o, e.m = t[++i], o = t[++i]));
  const a = {};
  for (; Array.isArray(o) && "number" == typeof o[0] && 0 < o[0];) {
    for (var h = 0; h < o.length; h++) a[o[h]] = o;
    o = t[++i];
  }
  for (h = 1; void 0 !== o;) {
    let l;
    "number" == typeof o && (h += o, o = t[++i]);
    var c = void 0;
    if (o instanceof Ut ? l = o : (l = jr, i--), l.pa) {
      o = t[++i], c = t;
      var u = i;
      "function" == typeof o && (o = o(), c[u] = o), c = o;
    }
    for (u = h + 1, "number" == typeof (o = t[++i]) && 0 > o && (u -= o, o = t[++i]); h < u; h++) {
      const t = a[h];
      s(e, h, c ? r(l, c, t) : n(l, t));
    }
  }
  return e;
}
const Qn = Symbol();
function tr(t) {
  let e = t[Qn];
  if (!e) {
    const n = sr(t);
    e = (t, e) => lr(t, e, n), t[Qn] = e;
  }
  return e;
}
const er = Symbol();
function nr(t) {
  return t.h;
}
function rr(t, e) {
  let n, r;
  const s = t.h;
  return (t, i, o) => s(t, i, o, r ||= sr(e).T, n ||= tr(e));
}
function sr(t) {
  let e = t[er];
  return e || (e = Zn(t, t[er] = {}, nr, rr), cr(t), e);
}
const ir = Symbol();
function or(t, e) {
  const n = t.g;
  return e ? (t, r, s) => n(t, r, s, e) : n;
}
function ar(t, e, n) {
  const r = t.g;
  let s, i;
  return (t, o, a) => r(t, o, a, i ||= hr(e).T, s ||= Vn(e), n);
}
function hr(t) {
  let e = t[ir];
  return e || (qn(t), e = Zn(t, t[ir] = {}, or, ar), cr(t), e);
}
function cr(t) {
  ir in t && Kn in t && er in t && (t.length = 0);
}
function ur(t, e) {
  var n = t[e];
  if (n) return n;
  if ((n = t.ea) && (n = n[e])) {
    var r = (n = Bn(n))[0].h;
    if (n = n[1]) {
      const e = tr(n),
        s = sr(n).T;
      n = (n = t.m) ? n(s, e) : (t, n, i) => r(t, n, i, s, e);
    } else n = r;
    return t[e] = n;
  }
}
function lr(t, e, n) {
  for (var r = Kt(t), s = +!!(512 & r) - 1, i = t.length, o = 512 & r ? 1 : 0, a = i + (256 & r ? -1 : 0); o < a; o++) {
    const r = t[o];
    if (null == r) continue;
    const i = o - s,
      a = ur(n, i);
    a && a(e, r, i);
  }
  if (256 & r) {
    r = t[i - 1];
    for (let t in r) s = +t, Number.isNaN(s) || null != (i = r[t]) && (a = ur(n, s)) && a(e, i, s);
  }
  if (t = ce ? t[ce] : void 0) for (Pt(e, e.g.end()), n = 0; n < t.length; n++) Pt(e, N(t[n]) || P());
}
function dr(t, e) {
  return new Ut(t, e, !1, !1);
}
function fr(t, e) {
  return new Ut(t, e, !0, !1);
}
function pr(t, e) {
  return new Ut(t, e, !1, !0);
}
function gr(t, e, n) {
  sn(t, Kt(t), e, n);
}
var mr = pr(function (t, e, n, r, s) {
  return 2 === t.h && (t = yt(t, Oe([void 0, void 0], r), s), ae(r = Kt(e)), (s = nn(e, r, n)) instanceof je ? 0 != (2 & s.L) ? ((s = s.Y()).push(t), sn(e, r, n, s)) : s.Oa(t) : Array.isArray(s) ? (2 & zt(s) && sn(e, r, n, s = fn(s)), s.push(t)) : sn(e, r, n, [t]), !0);
}, function (t, e, n, r, s) {
  if (e instanceof je) e.forEach((e, i) => {
    Nt(t, n, Oe([i, e], r), s);
  });else if (Array.isArray(e)) for (let i = 0; i < e.length; i++) {
    const o = e[i];
    Array.isArray(o) && Nt(t, n, Oe(o, r), s);
  }
});
function yr(t, e, n) {
  t: if (null != e) {
    if (me(e)) {
      if ("string" == typeof e) {
        e = Te(e);
        break t;
      }
      if ("number" == typeof e) {
        e = we(e);
        break t;
      }
    }
    e = void 0;
  }
  null != e && ("string" == typeof e && kt(e), null != e && (Ot(t, n, 0), "number" == typeof e ? (t = t.g, Y(e), Lt(t, z, K)) : (n = kt(e), Lt(t.g, n.h, n.g))));
}
function _r(t, e, n) {
  null != (e = ye(e)) && null != e && (Ot(t, n, 0), Rt(t.g, e));
}
function vr(t, e, n) {
  null != (e = pe(e)) && (Ot(t, n, 0), t.g.g.push(e ? 1 : 0));
}
function Er(t, e, n) {
  null != (e = xe(e)) && Dt(t, n, c(e));
}
function wr(t, e, n, r, s) {
  Nt(t, n, e instanceof Nn ? e.u : Array.isArray(e) ? Oe(e, r) : void 0, s);
}
function Tr(t, e, n) {
  null != (e = null == e || "string" == typeof e || R(e) || e instanceof U ? e : void 0) && Dt(t, n, V(e).buffer);
}
function Ar(t, e, n) {
  return (5 === t.h || 2 === t.h) && (e = on(e, Kt(e), n, 2, !1), 2 == t.h ? Et(t, ht, e) : e.push(ht(t.g)), !0);
}
var br,
  kr = dr(function (t, e, n) {
    if (1 !== t.h) return !1;
    var r = t.g;
    t = at(r);
    const s = at(r);
    r = 2 * (s >> 31) + 1;
    const i = s >>> 20 & 2047;
    return t = 4294967296 * (1048575 & s) + t, gr(e, n, 2047 == i ? t ? NaN : 1 / 0 * r : 0 == i ? r * Math.pow(2, -1074) * t : r * Math.pow(2, i - 1075) * (t + 4503599627370496)), !0;
  }, function (t, e, n) {
    null != (e = fe(e)) && (Ot(t, n, 1), t = t.g, (n = W ||= new DataView(new ArrayBuffer(8))).setFloat64(0, +e, !0), z = n.getUint32(0, !0), K = n.getUint32(4, !0), Mt(t, z), Mt(t, K));
  }),
  xr = dr(function (t, e, n) {
    return 5 === t.h && (gr(e, n, ht(t.g)), !0);
  }, function (t, e, n) {
    null != (e = fe(e)) && (Ot(t, n, 5), t = t.g, $(e), Mt(t, z));
  }),
  Sr = fr(Ar, function (t, e, n) {
    if (null != (e = Gn(fe, e))) for (let o = 0; o < e.length; o++) {
      var r = t,
        s = n,
        i = e[o];
      null != i && (Ot(r, s, 5), r = r.g, $(i), Mt(r, z));
    }
  }),
  Lr = fr(Ar, function (t, e, n) {
    if (null != (e = Gn(fe, e)) && e.length) {
      Ot(t, n, 2), Ft(t.g, 4 * e.length);
      for (let r = 0; r < e.length; r++) n = t.g, $(e[r]), Mt(n, z);
    }
  }),
  Fr = dr(function (t, e, n) {
    return 0 === t.h && (gr(e, n, rt(t.g, J)), !0);
  }, yr),
  Rr = dr(function (t, e, n) {
    return 0 === t.h && (gr(e, n, 0 === (t = rt(t.g, J)) ? void 0 : t), !0);
  }, yr),
  Mr = dr(function (t, e, n) {
    return 0 === t.h && (gr(e, n, rt(t.g, q)), !0);
  }, function (t, e, n) {
    t: if (null != e) {
      if (me(e)) {
        if ("string" == typeof e) {
          var r = Math.trunc(Number(e));
          Number.isSafeInteger(r) && 0 <= r ? e = String(r) : (-1 !== (r = e.indexOf(".")) && (e = e.substring(0, r)), ve(e) || (et(e), e = Z(z, K)));
          break t;
        }
        if ("number" == typeof e) {
          e = 0 <= (e = Math.trunc(e)) && Number.isSafeInteger(e) ? e : function (t) {
            if (0 > t) {
              Y(t);
              const e = Z(z, K);
              return t = Number(e), Number.isSafeInteger(t) ? t : e;
            }
            return ve(String(t)) ? t : (Y(t), q(z, K));
          }(e);
          break t;
        }
      }
      e = void 0;
    }
    null != e && ("string" == typeof e && Tt(e), null != e && (Ot(t, n, 0), "number" == typeof e ? (t = t.g, Y(e), Lt(t, z, K)) : (n = Tt(e), Lt(t.g, n.h, n.g))));
  }),
  Pr = dr(function (t, e, n) {
    return 0 === t.h && (gr(e, n, it(t.g)), !0);
  }, _r),
  Or = fr(function (t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = on(e, Kt(e), n, 2, !1), 2 == t.h ? Et(t, it, e) : e.push(it(t.g)), !0);
  }, function (t, e, n) {
    if (null != (e = Gn(ye, e)) && e.length) {
      n = Ct(t, n);
      for (let n = 0; n < e.length; n++) Rt(t.g, e[n]);
      It(t, n);
    }
  }),
  Cr = dr(function (t, e, n) {
    return 0 === t.h && (gr(e, n, 0 === (t = it(t.g)) ? void 0 : t), !0);
  }, _r),
  Ir = dr(function (t, e, n) {
    return 0 === t.h && (gr(e, n, st(t.g)), !0);
  }, vr),
  Dr = dr(function (t, e, n) {
    return 0 === t.h && (gr(e, n, !1 === (t = st(t.g)) ? void 0 : t), !0);
  }, vr),
  Nr = fr(function (t, e, n) {
    return 2 === t.h && (mn(e, n, yn, t = _t(t)), !0);
  }, function (t, e, n) {
    if (null != (e = Gn(xe, e))) for (let o = 0; o < e.length; o++) {
      var r = t,
        s = n,
        i = e[o];
      null != i && Dt(r, s, c(i));
    }
  }),
  Ur = dr(function (t, e, n) {
    return 2 === t.h && (gr(e, n, "" === (t = _t(t)) ? void 0 : t), !0);
  }, Er),
  Br = dr(function (t, e, n) {
    return 2 === t.h && (gr(e, n, _t(t)), !0);
  }, Er),
  Gr = pr(function (t, e, n, r, s) {
    return 2 === t.h && (yt(t, En(e, r, n, !0), s), !0);
  }, wr),
  jr = pr(function (t, e, n, r, s) {
    return 2 === t.h && (yt(t, En(e, r, n), s), !0);
  }, wr);
br = new Ut(function (t, e, n, r, s) {
  if (2 !== t.h) return !1;
  r = Oe(void 0, r);
  let i = Kt(e);
  ae(i);
  let o = on(e, i, n, 3);
  return i = Kt(e), 4 & zt(o) && (o = Bt(o), Yt(o, -2079 & (1 | zt(o))), sn(e, i, n, o)), o.push(r), yt(t, r, s), !0;
}, function (t, e, n, r, s) {
  if (Array.isArray(e)) for (let i = 0; i < e.length; i++) wr(t, e[i], n, r, s);
}, !0, !0);
var Vr = pr(function (t, e, n, r, s, i) {
    if (2 !== t.h) return !1;
    let o = Kt(e);
    return ae(o), (i = vn(e, o, i)) && n !== i && sn(e, o, i), yt(t, e = En(e, r, n), s), !0;
  }, wr),
  Xr = dr(function (t, e, n) {
    return 2 === t.h && (gr(e, n, vt(t)), !0);
  }, Tr),
  Hr = fr(function (t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = on(e, Kt(e), n, 2, !1), 2 == t.h ? Et(t, ot, e) : e.push(ot(t.g)), !0);
  }, function (t, e, n) {
    if (null != (e = Gn(_e, e))) for (let o = 0; o < e.length; o++) {
      var r = t,
        s = n,
        i = e[o];
      null != i && (Ot(r, s, 0), Ft(r.g, i));
    }
  }),
  Wr = dr(function (t, e, n) {
    return 0 === t.h && (gr(e, n, it(t.g)), !0);
  }, function (t, e, n) {
    null != (e = ye(e)) && (e = parseInt(e, 10), Ot(t, n, 0), Rt(t.g, e));
  }),
  zr = fr(function (t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = on(e, Kt(e), n, 2, !1), 2 == t.h ? Et(t, ct, e) : e.push(it(t.g)), !0);
  }, function (t, e, n) {
    if (null != (e = Gn(ye, e)) && e.length) {
      n = Ct(t, n);
      for (let n = 0; n < e.length; n++) Rt(t.g, e[n]);
      It(t, n);
    }
  });
class Kr {
  constructor(t, e) {
    this.h = t, this.g = e, this.l = Tn, this.m = kn, this.defaultValue = void 0;
  }
}
function Yr(t, e) {
  return new Kr(t, e);
}
function $r(t, e) {
  return (n, r) => {
    t: {
      if (wt.length) {
        const t = wt.pop();
        t.o(r), ut(t.g, n, r), n = t;
      } else n = new class {
        constructor(t, e) {
          if (pt.length) {
            const n = pt.pop();
            ut(n, t, e), t = n;
          } else t = new class {
            constructor(t, e) {
              this.h = null, this.m = !1, this.g = this.l = this.j = 0, ut(this, t, e);
            }
            clear() {
              this.h = null, this.m = !1, this.g = this.l = this.j = 0, this.ca = !1;
            }
          }(t, e);
          this.g = t, this.l = this.g.g, this.h = this.m = -1, this.o(e);
        }
        o({
          ia: t = !1
        } = {}) {
          this.ia = t;
        }
      }(n, r);
      try {
        const r = new t(),
          i = r.u;
        Vn(e)(i, n);
        var s = r;
        break t;
      } finally {
        n.g.clear(), n.m = -1, n.h = -1, 100 > wt.length && wt.push(n);
      }
      s = void 0;
    }
    return s;
  };
}
function qr(t) {
  return function () {
    const e = new class {
      constructor() {
        this.l = [], this.h = 0, this.g = new class {
          constructor() {
            this.g = [];
          }
          length() {
            return this.g.length;
          }
          end() {
            const t = this.g;
            return this.g = [], t;
          }
        }();
      }
    }();
    lr(this.u, e, sr(t)), Pt(e, e.g.end());
    const n = new Uint8Array(e.h),
      r = e.l,
      s = r.length;
    let i = 0;
    for (let t = 0; t < s; t++) {
      const e = r[t];
      n.set(e, i), i += e.length;
    }
    return e.l = [n], n;
  };
}
var Jr = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Zr = [0, Ur, dr(function (t, e, n) {
    return 2 === t.h && (gr(e, n, (t = vt(t)) === D() ? void 0 : t), !0);
  }, function (t, e, n) {
    if (null != e) {
      if (e instanceof Nn) {
        const r = e.Qa;
        return void (r && (e = r(e), null != e && Dt(t, n, V(e).buffer)));
      }
      if (Array.isArray(e)) return;
    }
    Tr(t, e, n);
  })],
  Qr = [0, Br],
  ts = [0, Pr, Wr, Ir, -1, Or, Wr, -1],
  es = [0, Ir, -1],
  ns = class extends Nn {
    constructor() {
      super();
    }
  };
ns.A = [6];
var rs = [0, Ir, Br, Ir, Wr, -1, zr, Br, -1, es, Wr],
  ss = [0, Br, -2],
  is = class extends Nn {
    constructor() {
      super();
    }
  },
  os = [0],
  as = [0, Pr, Ir, -3],
  hs = class extends Nn {
    constructor(t) {
      super(t, 2);
    }
  },
  cs = {},
  us = [-2, cs, Ir];
cs[336783863] = [0, Br, Ir, -1, Pr, [0, [1, 2, 3, 4, 5], Vr, os, Vr, rs, Vr, ss, Vr, as, Vr, ts], Qr];
var ls = [0, Ur, Dr],
  ds = [0, Rr, -1, Dr, -3, Rr, Or, Ur, Cr, Rr, -1, Dr, Cr, Dr, -2, Ur],
  fs = [-1, {}],
  ps = [0, Br, 1, fs],
  gs = [0, Br, Nr, fs];
function ms(t, e) {
  gn(t, 2, ke(e), "");
}
function ys(t, e) {
  mn(t.u, 3, be, e);
}
function _s(t, e) {
  mn(t.u, 4, be, e);
}
var vs = class extends Nn {
  constructor(t) {
    super(t, 500);
  }
  o(t) {
    return kn(this, 0, 7, t);
  }
};
vs.A = [3, 4, 5, 6, 8, 13, 17, 1005];
var Es = [-500, Ur, -1, Nr, -3, us, br, Zr, Cr, -1, ps, gs, br, ls, Ur, ds, Cr, Nr, 987, Nr],
  ws = [0, Ur, -1, fs],
  Ts = [-500, Br, -1, [-1, {}], 998, Br],
  As = [-500, Br, Nr, -1, [-2, {}, Ir], 997, Nr, -1],
  bs = [-500, Br, Nr, fs, 998, Nr];
function ks(t, e) {
  Ln(t, 1, vs, e);
}
function xs(t, e) {
  mn(t.u, 10, be, e);
}
function Ss(t, e) {
  mn(t.u, 15, be, e);
}
var Ls = class extends Nn {
  constructor(t) {
    super(t, 500);
  }
  o(t) {
    return kn(this, 0, 1001, t);
  }
};
Ls.A = [1, 6, 7, 9, 10, 15, 16, 17, 14, 1002];
var Fs = [-500, br, Es, 4, br, Ts, br, As, Cr, br, bs, Nr, Cr, ps, gs, br, ws, Nr, -2, ds, Ur, -1, Dr, 979, fs, br, Zr],
  Rs = $r(Ls, Fs);
Ls.prototype.g = qr(Fs);
var Ms = [0, br, [0, Pr, -2]],
  Ps = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Os = [0, Pr, xr, Br, -1],
  Cs = class extends Nn {
    constructor(t) {
      super(t);
    }
    g() {
      return bn(this, Ps, 1);
    }
  };
Cs.A = [1];
var Is = [0, br, Os],
  Ds = $r(Cs, Is),
  Ns = [0, Pr, xr],
  Us = [0, Pr, -1, Ms],
  Bs = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Gs = [0, Pr, -3],
  js = [0, xr, -3],
  Vs = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Xs = [0, xr, -1, Br, xr],
  Hs = class extends Nn {
    constructor(t) {
      super(t);
    }
    h() {
      return Tn(this, Bs, 2);
    }
    g() {
      return bn(this, Vs, 5);
    }
  };
Hs.A = [5];
var Ws = [0, Wr, Gs, js, Us, br, Xs],
  zs = class extends Nn {
    constructor(t) {
      super(t);
    }
  };
zs.A = [1, 2, 3, 8, 9];
var Ks = $r(zs, [0, Nr, Or, Lr, Ws, Br, -1, Fr, br, Ns, Nr, Fr]),
  Ys = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  $s = [0, xr, -4],
  qs = class extends Nn {
    constructor(t) {
      super(t);
    }
  };
qs.A = [1];
var Js = $r(qs, [0, br, $s]),
  Zs = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Qs = [0, xr, -4],
  ti = class extends Nn {
    constructor(t) {
      super(t);
    }
  };
ti.A = [1];
var ei = $r(ti, [0, br, Qs]),
  ni = class extends Nn {
    constructor(t) {
      super(t);
    }
  };
ni.A = [3];
var ri = [0, Pr, -1, Lr, Wr],
  si = class extends Nn {
    constructor() {
      super();
    }
  };
si.prototype.g = qr([0, xr, -4, Fr]);
var ii = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  oi = [0, 1, Pr, Br, Is],
  ai = class extends Nn {
    constructor(t) {
      super(t);
    }
  };
ai.A = [1];
var hi = $r(ai, [0, br, oi, Fr]),
  ci = class extends Nn {
    constructor(t) {
      super(t);
    }
  };
ci.A = [1];
var ui = class extends Nn {
    constructor(t) {
      super(t);
    }
    qa() {
      const t = hn(this);
      return null == t ? D() : t;
    }
  },
  li = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  di = [1, 2],
  fi = [0, di, Vr, [0, Lr], Vr, [0, Xr], Pr, Br],
  pi = class extends Nn {
    constructor(t) {
      super(t);
    }
  };
pi.A = [1];
var gi = $r(pi, [0, br, fi, Fr]),
  mi = class extends Nn {
    constructor(t) {
      super(t);
    }
  };
mi.A = [4, 5];
var yi = [0, Br, Pr, xr, Nr, -1],
  _i = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  vi = [0, Ir, -1],
  Ei = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  wi = [1, 2, 3, 4, 5],
  Ti = class extends Nn {
    constructor(t) {
      super(t);
    }
    g() {
      return null != hn(this);
    }
    h() {
      return null != Rn(this, 2);
    }
  },
  Ai = [0, Xr, Br, [0, Pr, Fr, -1], [0, Mr, Fr]],
  bi = class extends Nn {
    constructor(t) {
      super(t);
    }
    g() {
      return pe(en(this, 2)) ?? !1;
    }
  },
  ki = [0, Ai, Ir, [0, wi, Vr, as, Vr, rs, Vr, ts, Vr, os, Vr, ss], Wr],
  xi = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Si = [0, ki, xr, -1, Pr],
  Li = Yr(502141897, xi);
cs[502141897] = Si;
var Fi = [0, Ai];
cs[512499200] = Fi;
var Ri = [0, Fi];
cs[515723506] = Ri;
var Mi = $r(class extends Nn {
    constructor(t) {
      super(t);
    }
  }, [0, [0, Wr, -1, Sr, Hr], ri]),
  Pi = [0, ki];
cs[508981768] = Pi;
var Oi = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Ci = [0, ki, xr, Pi, Ir],
  Ii = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Di = [0, ki, Si, Ci, xr, Ri];
cs[508968149] = Ci;
var Ni = Yr(508968150, Ii);
cs[508968150] = Di;
var Ui = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Bi = Yr(513916220, Ui);
cs[513916220] = [0, ki, Di, Pr];
var Gi = class extends Nn {
    constructor(t) {
      super(t);
    }
    h() {
      return Tn(this, mi, 2);
    }
    g() {
      rn(this, 2);
    }
  },
  ji = [0, ki, yi];
cs[478825465] = ji;
var Vi = [0, ki];
cs[478825422] = Vi;
var Xi = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Hi = [0, ki, Vi, ji, -1],
  Wi = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  zi = [0, ki, xr, Pr],
  Ki = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Yi = [0, ki, xr],
  $i = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  qi = [0, ki, zi, Yi, xr],
  Ji = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Zi = [0, ki, qi, Hi];
cs[463370452] = Hi, cs[464864288] = zi, cs[474472470] = Yi;
var Qi = Yr(462713202, $i);
cs[462713202] = qi;
var to = Yr(479097054, Ji);
cs[479097054] = Zi;
var eo = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  no = [0, ki],
  ro = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  so = [0, ki, xr, -1, Pr];
cs[514774813] = so;
var io = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  oo = [0, ki, xr, Ir];
cs[518928384] = oo;
var ao = class extends Nn {
  constructor() {
    super();
  }
};
ao.prototype.g = qr([0, ki, Yi, no, Si, Ci, so, oo]);
var ho = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  co = Yr(456383383, ho);
cs[456383383] = [0, ki, yi];
var uo = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  lo = Yr(476348187, uo);
cs[476348187] = [0, ki, vi];
var fo = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  po = [0, Wr, -1],
  go = class extends Nn {
    constructor(t) {
      super(t);
    }
  };
go.A = [3];
var mo = Yr(458105876, class extends Nn {
  constructor(t) {
    super(t);
  }
  g() {
    var t = this.u;
    const e = Kt(t);
    var n = 2 & e;
    return t = function (t, e, n) {
      var r = go;
      const s = 2 & e;
      let i = !1;
      if (null == n) {
        if (s) return ze();
        n = [];
      } else if (n.constructor === je) {
        if (0 == (2 & n.L) || s) return n;
        n = n.Y();
      } else Array.isArray(n) ? i = !!(2 & zt(n)) : n = [];
      if (s) {
        if (!n.length) return ze();
        i || (i = !0, $t(n));
      } else i && (i = !1, n = fn(n));
      return i || (64 & zt(n) ? Ht(n, 32) : 32 & e && Xt(n, 32)), sn(t, e, 2, r = new je(n, r, Le, void 0), !1), r;
    }(t, e, nn(t, e, 2)), null == t || !n && go && (t.ta = !0), n = t;
  }
});
cs[458105876] = [0, po, mr, [!0, Fr, [0, Br, -1, Nr]]];
var yo = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  _o = Yr(458105758, yo);
cs[458105758] = [0, ki, Br, po];
var vo = class extends Nn {
  constructor(t) {
    super(t);
  }
};
vo.A = [5, 6];
var Eo = Yr(443442058, vo);
cs[443442058] = [0, ki, Br, Pr, xr, Nr, -1];
var wo = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  To = Yr(516587230, wo);
function Ao(t, e) {
  return e = e ? e.clone() : new mi(), void 0 !== t.displayNamesLocale ? rn(e, 1, ke(t.displayNamesLocale)) : void 0 === t.displayNamesLocale && rn(e, 1), void 0 !== t.maxResults ? Cn(e, 2, t.maxResults) : "maxResults" in t && rn(e, 2), void 0 !== t.scoreThreshold ? In(e, 3, t.scoreThreshold) : "scoreThreshold" in t && rn(e, 3), void 0 !== t.categoryAllowlist ? pn(e, 4, t.categoryAllowlist) : "categoryAllowlist" in t && rn(e, 4), void 0 !== t.categoryDenylist ? pn(e, 5, t.categoryDenylist) : "categoryDenylist" in t && rn(e, 5), e;
}
function bo(t, e = -1, n = "") {
  return {
    categories: t.map(t => ({
      index: Mn(Fn(t, 1)) ?? -1,
      score: Pn(t, 2) ?? 0,
      categoryName: Rn(t, 3) ?? "" ?? "",
      displayName: Rn(t, 4) ?? "" ?? ""
    })),
    headIndex: e,
    headName: n
  };
}
function ko(t) {
  var e = cn(t, 3, fe),
    n = cn(t, 2, ye),
    r = cn(t, 1, xe),
    s = cn(t, 9, xe);
  const i = {
    categories: [],
    keypoints: []
  };
  for (let t = 0; t < e.length; t++) i.categories.push({
    score: e[t],
    index: n[t] ?? -1,
    categoryName: r[t] ?? "",
    displayName: s[t] ?? ""
  });
  if ((e = Tn(t, Hs, 4)?.h()) && (i.boundingBox = {
    originX: Fn(e, 1) ?? 0,
    originY: Fn(e, 2) ?? 0,
    width: Fn(e, 3) ?? 0,
    height: Fn(e, 4) ?? 0,
    angle: 0
  }), Tn(t, Hs, 4)?.g().length) for (const e of Tn(t, Hs, 4).g()) i.keypoints.push({
    x: an(e, 1) ?? 0,
    y: an(e, 2) ?? 0,
    score: an(e, 4) ?? 0,
    label: Rn(e, 3) ?? ""
  });
  return i;
}
function xo(t) {
  const e = [];
  for (const n of bn(t, Zs, 1)) e.push({
    x: Pn(n, 1) ?? 0,
    y: Pn(n, 2) ?? 0,
    z: Pn(n, 3) ?? 0,
    visibility: Pn(n, 4) ?? 0
  });
  return e;
}
function So(t) {
  const e = [];
  for (const n of bn(t, Ys, 1)) e.push({
    x: Pn(n, 1) ?? 0,
    y: Pn(n, 2) ?? 0,
    z: Pn(n, 3) ?? 0,
    visibility: Pn(n, 4) ?? 0
  });
  return e;
}
function Lo(t) {
  return Array.from(t, t => 127 < t ? t - 256 : t);
}
function Fo(t, e) {
  if (t.length !== e.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`);
  let n = 0,
    r = 0,
    s = 0;
  for (let i = 0; i < t.length; i++) n += t[i] * e[i], r += t[i] * t[i], s += e[i] * e[i];
  if (0 >= r || 0 >= s) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
  return n / Math.sqrt(r * s);
}
let Ro;
cs[516587230] = [0, ki, so, oo, xr];
const Mo = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function Po() {
  if (void 0 === Ro) try {
    await WebAssembly.instantiate(Mo), Ro = !0;
  } catch {
    Ro = !1;
  }
  return Ro;
}
async function Oo(t, e = "") {
  const n = (await Po()) ? "wasm_internal" : "wasm_nosimd_internal";
  return {
    wasmLoaderPath: `${e}/${t}_${n}.js`,
    wasmBinaryPath: `${e}/${t}_${n}.wasm`
  };
}
var Co = class {};
exports.FilesetResolver = Co;
function Io() {
  const t = navigator.userAgent;
  return t.includes("Safari") && !t.includes("Chrome");
}
async function Do(t) {
  if ("function" != typeof importScripts) {
    const e = document.createElement("script");
    return e.src = t.toString(), e.crossOrigin = "anonymous", new Promise((t, n) => {
      e.addEventListener("load", () => {
        t();
      }, !1), e.addEventListener("error", t => {
        n(t);
      }, !1), document.body.appendChild(e);
    });
  }
  importScripts(t.toString());
}
function No(t) {
  return void 0 !== t.videoWidth ? [t.videoWidth, t.videoHeight] : void 0 !== t.naturalWidth ? [t.naturalWidth, t.naturalHeight] : void 0 !== t.displayWidth ? [t.displayWidth, t.displayHeight] : [t.width, t.height];
}
function Uo(t, e, n) {
  t.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), n(e = t.i.stringToNewUTF8(e)), t.i._free(e);
}
function Bo(t, e, n) {
  if (!t.i.canvas) throw Error("No OpenGL canvas configured.");
  if (n ? t.i._bindTextureToStream(n) : t.i._bindTextureToCanvas(), !(n = t.i.canvas.getContext("webgl2") || t.i.canvas.getContext("webgl"))) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
  t.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !0), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e), t.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1);
  const [r, s] = No(e);
  return !t.l || r === t.i.canvas.width && s === t.i.canvas.height || (t.i.canvas.width = r, t.i.canvas.height = s), [r, s];
}
function Go(t, e, n) {
  t.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
  const r = new Uint32Array(e.length);
  for (let n = 0; n < e.length; n++) r[n] = t.i.stringToNewUTF8(e[n]);
  e = t.i._malloc(4 * r.length), t.i.HEAPU32.set(r, e >> 2), n(e);
  for (const e of r) t.i._free(e);
  t.i._free(e);
}
function jo(t, e, n) {
  t.i.simpleListeners = t.i.simpleListeners || {}, t.i.simpleListeners[e] = n;
}
function Vo(t, e, n) {
  let r = [];
  t.i.simpleListeners = t.i.simpleListeners || {}, t.i.simpleListeners[e] = (t, e, s) => {
    e ? (n(r, s), r = []) : r.push(t);
  };
}
Co.forVisionTasks = function (t) {
  return Oo("vision", t);
}, Co.forTextTasks = function (t) {
  return Oo("text", t);
}, Co.forGenAiTasks = function (t) {
  return Oo("genai", t);
}, Co.forAudioTasks = function (t) {
  return Oo("audio", t);
}, Co.isSimdSupported = function () {
  return Po();
};
async function Xo(t, e, n, r) {
  return t = await (async (t, e, n, r, s) => {
    if (e && (await Do(e)), !self.ModuleFactory) throw Error("ModuleFactory not set.");
    if (n && (await Do(n), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
    return self.Module && s && ((e = self.Module).locateFile = s.locateFile, s.mainScriptUrlOrBlob && (e.mainScriptUrlOrBlob = s.mainScriptUrlOrBlob)), s = await self.ModuleFactory(self.Module || s), self.ModuleFactory = self.Module = void 0, new t(s, r);
  })(t, n.wasmLoaderPath, n.assetLoaderPath, e, {
    locateFile: t => t.endsWith(".wasm") ? n.wasmBinaryPath.toString() : n.assetBinaryPath && t.endsWith(".data") ? n.assetBinaryPath.toString() : t
  }), await t.o(r), t;
}
function Ho(t, e) {
  const n = Tn(t.baseOptions, Ti, 1) || new Ti();
  "string" == typeof e ? (rn(n, 2, ke(e)), rn(n, 1)) : e instanceof Uint8Array && (rn(n, 1, se(e, !1, !1)), rn(n, 2)), kn(t.baseOptions, 0, 1, n);
}
function Wo(t) {
  try {
    const e = t.H.length;
    if (1 === e) throw Error(t.H[0].message);
    if (1 < e) throw Error("Encountered multiple errors: " + t.H.map(t => t.message).join(", "));
  } finally {
    t.H = [];
  }
}
function zo(t, e) {
  t.C = Math.max(t.C, e);
}
function Ko(t, e) {
  t.B = new vs(), ms(t.B, "PassThroughCalculator"), ys(t.B, "free_memory"), _s(t.B, "free_memory_unused_out"), xs(e, "free_memory"), ks(e, t.B);
}
function Yo(t, e) {
  ys(t.B, e), _s(t.B, e + "_unused_out");
}
function $o(t) {
  t.g.addBoolToStream(!0, "free_memory", t.C);
}
var qo = class {
  constructor(t) {
    this.g = t, this.H = [], this.C = 0, this.g.setAutoRenderToScreen(!1);
  }
  l(t, e = !0) {
    if (e) {
      const e = t.baseOptions || {};
      if (t.baseOptions?.modelAssetBuffer && t.baseOptions?.modelAssetPath) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      if (!(Tn(this.baseOptions, Ti, 1)?.g() || Tn(this.baseOptions, Ti, 1)?.h() || t.baseOptions?.modelAssetBuffer || t.baseOptions?.modelAssetPath)) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
      if (function (t, e) {
        let n = Tn(t.baseOptions, Ei, 3);
        if (!n) {
          var r = n = new Ei(),
            s = new is();
          xn(r, 4, wi, s);
        }
        "delegate" in e && ("GPU" === e.delegate ? (e = n, r = new ns(), xn(e, 2, wi, r)) : (e = n, r = new is(), xn(e, 4, wi, r))), kn(t.baseOptions, 0, 3, n);
      }(this, e), e.modelAssetPath) return fetch(e.modelAssetPath.toString()).then(t => {
        if (t.ok) return t.arrayBuffer();
        throw Error(`Failed to fetch model: ${e.modelAssetPath} (${t.status})`);
      }).then(t => {
        try {
          this.g.i.FS_unlink("/model.dat");
        } catch {}
        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(t), !0, !1, !1), Ho(this, "/model.dat"), this.m(), this.K();
      });
      Ho(this, e.modelAssetBuffer);
    }
    return this.m(), this.K(), Promise.resolve();
  }
  K() {}
  fa() {
    let t;
    if (this.g.fa(e => {
      t = Rs(e);
    }), !t) throw Error("Failed to retrieve CalculatorGraphConfig");
    return t;
  }
  setGraph(t, e) {
    this.g.attachErrorListener((t, e) => {
      this.H.push(Error(e));
    }), this.g.Ma(), this.g.setGraph(t, e), this.B = void 0, Wo(this);
  }
  finishProcessing() {
    this.g.finishProcessing(), Wo(this);
  }
  close() {
    this.B = void 0, this.g.closeGraph();
  }
};
exports.TaskRunner = qo;
function Jo(t, e) {
  if (!t) throw Error(`Unable to obtain required WebGL resource: ${e}`);
  return t;
}
qo.prototype.close = qo.prototype.close;
class Zo {
  constructor(t, e, n, r) {
    this.g = t, this.h = e, this.m = n, this.l = r;
  }
  bind() {
    this.g.bindVertexArray(this.h);
  }
  close() {
    this.g.deleteVertexArray(this.h), this.g.deleteBuffer(this.m), this.g.deleteBuffer(this.l);
  }
}
function Qo(t, e, n) {
  const r = t.g;
  if (n = Jo(r.createShader(n), "Failed to create WebGL shader"), r.shaderSource(n, e), r.compileShader(n), !r.getShaderParameter(n, r.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${r.getShaderInfoLog(n)}`);
  return r.attachShader(t.h, n), n;
}
function ta(t, e) {
  const n = t.g,
    r = Jo(n.createVertexArray(), "Failed to create vertex array");
  n.bindVertexArray(r);
  const s = Jo(n.createBuffer(), "Failed to create buffer");
  n.bindBuffer(n.ARRAY_BUFFER, s), n.enableVertexAttribArray(t.P), n.vertexAttribPointer(t.P, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), n.STATIC_DRAW);
  const i = Jo(n.createBuffer(), "Failed to create buffer");
  return n.bindBuffer(n.ARRAY_BUFFER, i), n.enableVertexAttribArray(t.O), n.vertexAttribPointer(t.O, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array(e ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), n.STATIC_DRAW), n.bindBuffer(n.ARRAY_BUFFER, null), n.bindVertexArray(null), new Zo(n, r, s, i);
}
function ea(t, e) {
  if (t.g) {
    if (e !== t.g) throw Error("Cannot change GL context once initialized");
  } else t.g = e;
}
function na(t, e, n, r) {
  return ea(t, e), t.h || (t.m(), t.D()), n ? (t.s || (t.s = ta(t, !0)), n = t.s) : (t.v || (t.v = ta(t, !1)), n = t.v), e.useProgram(t.h), n.bind(), t.l(), t = r(), n.g.bindVertexArray(null), t;
}
function ra(t, e, n) {
  return ea(t, e), t = Jo(e.createTexture(), "Failed to create texture"), e.bindTexture(e.TEXTURE_2D, t), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, n ?? e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, n ?? e.LINEAR), e.bindTexture(e.TEXTURE_2D, null), t;
}
function sa(t, e, n) {
  ea(t, e), t.B || (t.B = Jo(e.createFramebuffer(), "Failed to create framebuffe.")), e.bindFramebuffer(e.FRAMEBUFFER, t.B), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, n, 0);
}
function ia(t) {
  t.g?.bindFramebuffer(t.g.FRAMEBUFFER, null);
}
var oa = class {
  H() {
    return "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D inputTexture;\n  void main() {\n    gl_FragColor = texture2D(inputTexture, vTex);\n  }\n ";
  }
  m() {
    const t = this.g;
    if (this.h = Jo(t.createProgram(), "Failed to create WebGL program"), this.ba = Qo(this, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", t.VERTEX_SHADER), this.aa = Qo(this, this.H(), t.FRAGMENT_SHADER), t.linkProgram(this.h), !t.getProgramParameter(this.h, t.LINK_STATUS)) throw Error(`Error during program linking: ${t.getProgramInfoLog(this.h)}`);
    this.P = t.getAttribLocation(this.h, "aVertex"), this.O = t.getAttribLocation(this.h, "aTex");
  }
  D() {}
  l() {}
  close() {
    if (this.h) {
      const t = this.g;
      t.deleteProgram(this.h), t.deleteShader(this.ba), t.deleteShader(this.aa);
    }
    this.B && this.g.deleteFramebuffer(this.B), this.v && this.v.close(), this.s && this.s.close();
  }
};
var aa = class extends oa {
    H() {
      return "\n  precision mediump float;\n  uniform sampler2D backgroundTexture;\n  uniform sampler2D maskTexture;\n  uniform sampler2D colorMappingTexture;\n  varying vec2 vTex;\n  void main() {\n    vec4 backgroundColor = texture2D(backgroundTexture, vTex);\n    float category = texture2D(maskTexture, vTex).r;\n    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));\n    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);\n  }\n ";
    }
    D() {
      const t = this.g;
      t.activeTexture(t.TEXTURE1), this.C = ra(this, t, t.LINEAR), t.activeTexture(t.TEXTURE2), this.j = ra(this, t, t.NEAREST);
    }
    m() {
      super.m();
      const t = this.g;
      this.K = Jo(t.getUniformLocation(this.h, "backgroundTexture"), "Uniform location"), this.V = Jo(t.getUniformLocation(this.h, "colorMappingTexture"), "Uniform location"), this.J = Jo(t.getUniformLocation(this.h, "maskTexture"), "Uniform location");
    }
    l() {
      super.l();
      const t = this.g;
      t.uniform1i(this.J, 0), t.uniform1i(this.K, 1), t.uniform1i(this.V, 2);
    }
    close() {
      this.C && this.g.deleteTexture(this.C), this.j && this.g.deleteTexture(this.j), super.close();
    }
  },
  ha = class extends oa {
    H() {
      return "\n  precision mediump float;\n  uniform sampler2D maskTexture;\n  uniform sampler2D defaultTexture;\n  uniform sampler2D overlayTexture;\n  varying vec2 vTex;\n  void main() {\n    float confidence = texture2D(maskTexture, vTex).r;\n    vec4 defaultColor = texture2D(defaultTexture, vTex);\n    vec4 overlayColor = texture2D(overlayTexture, vTex);\n    // Apply the alpha from the overlay and merge in the default color\n    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);\n    gl_FragColor = mix(defaultColor, overlayColor, confidence);\n  }\n ";
    }
    D() {
      const t = this.g;
      t.activeTexture(t.TEXTURE1), this.j = ra(this, t), t.activeTexture(t.TEXTURE2), this.C = ra(this, t);
    }
    m() {
      super.m();
      const t = this.g;
      this.J = Jo(t.getUniformLocation(this.h, "defaultTexture"), "Uniform location"), this.K = Jo(t.getUniformLocation(this.h, "overlayTexture"), "Uniform location"), this.I = Jo(t.getUniformLocation(this.h, "maskTexture"), "Uniform location");
    }
    l() {
      super.l();
      const t = this.g;
      t.uniform1i(this.I, 0), t.uniform1i(this.J, 1), t.uniform1i(this.K, 2);
    }
    close() {
      this.j && this.g.deleteTexture(this.j), this.C && this.g.deleteTexture(this.C), super.close();
    }
  };
function ca(t, e) {
  switch (e) {
    case 0:
      return t.g.find(t => t instanceof Uint8Array);
    case 1:
      return t.g.find(t => t instanceof Float32Array);
    case 2:
      return t.g.find(t => "undefined" != typeof WebGLTexture && t instanceof WebGLTexture);
    default:
      throw Error(`Type is not supported: ${e}`);
  }
}
function ua(t) {
  var e = ca(t, 1);
  if (!e) {
    if (e = ca(t, 0)) e = new Float32Array(e).map(t => t / 255);else {
      e = new Float32Array(t.width * t.height);
      const r = da(t);
      var n = pa(t);
      if (sa(n, r, la(t)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in self.document) {
        n = new Float32Array(t.width * t.height * 4), r.readPixels(0, 0, t.width, t.height, r.RGBA, r.FLOAT, n);
        for (let t = 0, r = 0; t < e.length; ++t, r += 4) e[t] = n[r];
      } else r.readPixels(0, 0, t.width, t.height, r.RED, r.FLOAT, e);
    }
    t.g.push(e);
  }
  return e;
}
function la(t) {
  let e = ca(t, 2);
  if (!e) {
    const n = da(t);
    e = ga(t);
    const r = ua(t),
      s = fa(t);
    n.texImage2D(n.TEXTURE_2D, 0, s, t.width, t.height, 0, n.RED, n.FLOAT, r), ma(t);
  }
  return e;
}
function da(t) {
  if (!t.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return t.h || (t.h = Jo(t.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t.h;
}
function fa(t) {
  if (t = da(t), !ya) if (t.getExtension("EXT_color_buffer_float") && t.getExtension("OES_texture_float_linear") && t.getExtension("EXT_float_blend")) ya = t.R32F;else {
    if (!t.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
    ya = t.R16F;
  }
  return ya;
}
function pa(t) {
  return t.l || (t.l = new oa()), t.l;
}
function ga(t) {
  const e = da(t);
  e.viewport(0, 0, t.width, t.height), e.activeTexture(e.TEXTURE0);
  let n = ca(t, 2);
  return n || (n = ra(pa(t), e, t.m ? e.LINEAR : e.NEAREST), t.g.push(n), t.j = !0), e.bindTexture(e.TEXTURE_2D, n), n;
}
function ma(t) {
  t.h.bindTexture(t.h.TEXTURE_2D, null);
}
var ya,
  _a = class {
    constructor(t, e, n, r, s, i, o) {
      this.g = t, this.m = e, this.j = n, this.canvas = r, this.l = s, this.width = i, this.height = o, this.j && 0 === --va && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.");
    }
    Ha() {
      return !!ca(this, 0);
    }
    la() {
      return !!ca(this, 1);
    }
    R() {
      return !!ca(this, 2);
    }
    ka() {
      return (e = ca(t = this, 0)) || (e = ua(t), e = new Uint8Array(e.map(t => 255 * t)), t.g.push(e)), e;
      var t, e;
    }
    ja() {
      return ua(this);
    }
    M() {
      return la(this);
    }
    clone() {
      const t = [];
      for (const e of this.g) {
        let n;
        if (e instanceof Uint8Array) n = new Uint8Array(e);else if (e instanceof Float32Array) n = new Float32Array(e);else {
          if (!(e instanceof WebGLTexture)) throw Error(`Type is not supported: ${e}`);
          {
            const t = da(this),
              e = pa(this);
            t.activeTexture(t.TEXTURE1), n = ra(e, t, this.m ? t.LINEAR : t.NEAREST), t.bindTexture(t.TEXTURE_2D, n);
            const r = fa(this);
            t.texImage2D(t.TEXTURE_2D, 0, r, this.width, this.height, 0, t.RED, t.FLOAT, null), t.bindTexture(t.TEXTURE_2D, null), sa(e, t, n), na(e, t, !1, () => {
              ga(this), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.drawArrays(t.TRIANGLE_FAN, 0, 4), ma(this);
            }), ia(e), ma(this);
          }
        }
        t.push(n);
      }
      return new _a(t, this.m, this.R(), this.canvas, this.l, this.width, this.height);
    }
    close() {
      this.j && da(this).deleteTexture(ca(this, 2)), va = -1;
    }
  };
exports.MPMask = _a;
_a.prototype.close = _a.prototype.close, _a.prototype.clone = _a.prototype.clone, _a.prototype.getAsWebGLTexture = _a.prototype.M, _a.prototype.getAsFloat32Array = _a.prototype.ja, _a.prototype.getAsUint8Array = _a.prototype.ka, _a.prototype.hasWebGLTexture = _a.prototype.R, _a.prototype.hasFloat32Array = _a.prototype.la, _a.prototype.hasUint8Array = _a.prototype.Ha;
var va = 250;
const Ea = {
  color: "white",
  lineWidth: 4,
  radius: 6
};
function wa(t) {
  return {
    ...Ea,
    fillColor: (t = t || {}).color,
    ...t
  };
}
function Ta(t, e) {
  return t instanceof Function ? t(e) : t;
}
function Aa(t, e, n) {
  return Math.max(Math.min(e, n), Math.min(Math.max(e, n), t));
}
function ba(t) {
  if (!t.l) throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");
  return t.l;
}
function ka(t) {
  if (!t.j) throw Error("GPU rendering requested but WebGL2RenderingContext not provided.");
  return t.j;
}
function xa(t, e, n) {
  if (e.R()) n(e.M());else {
    const r = e.la() ? e.ja() : e.ka();
    t.m = t.m ?? new oa();
    const s = ka(t);
    n((t = new _a([r], e.m, !1, s.canvas, t.m, e.width, e.height)).M()), t.close();
  }
}
function Sa(t, e, n, r) {
  const s = function (t) {
      return t.g || (t.g = new aa()), t.g;
    }(t),
    i = ka(t),
    o = Array.isArray(n) ? new ImageData(new Uint8ClampedArray(n), 1, 1) : n;
  na(s, i, !0, () => {
    !function (t, e, n, r) {
      const s = t.g;
      if (s.activeTexture(s.TEXTURE0), s.bindTexture(s.TEXTURE_2D, e), s.activeTexture(s.TEXTURE1), s.bindTexture(s.TEXTURE_2D, t.C), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, s.RGBA, s.UNSIGNED_BYTE, n), t.I && function (t, e) {
        if (t !== e) return !1;
        t = t.entries(), e = e.entries();
        for (const [r, s] of t) {
          t = r;
          const i = s;
          var n = e.next();
          if (n.done) return !1;
          const [o, a] = n.value;
          if (n = a, t !== o || i[0] !== n[0] || i[1] !== n[1] || i[2] !== n[2] || i[3] !== n[3]) return !1;
        }
        return !!e.next().done;
      }(t.I, r)) s.activeTexture(s.TEXTURE2), s.bindTexture(s.TEXTURE_2D, t.j);else {
        t.I = r;
        const e = Array(1024).fill(0);
        r.forEach((t, n) => {
          if (4 !== t.length) throw Error(`Color at index ${n} is not a four-channel value.`);
          e[4 * n] = t[0], e[4 * n + 1] = t[1], e[4 * n + 2] = t[2], e[4 * n + 3] = t[3];
        }), s.activeTexture(s.TEXTURE2), s.bindTexture(s.TEXTURE_2D, t.j), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, 256, 1, 0, s.RGBA, s.UNSIGNED_BYTE, new Uint8Array(e));
      }
    }(s, e, o, r), i.clearColor(0, 0, 0, 0), i.clear(i.COLOR_BUFFER_BIT), i.drawArrays(i.TRIANGLE_FAN, 0, 4);
    const t = s.g;
    t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE2), t.bindTexture(t.TEXTURE_2D, null);
  });
}
function La(t, e, n, r) {
  const s = ka(t),
    i = function (t) {
      return t.h || (t.h = new ha()), t.h;
    }(t),
    o = Array.isArray(n) ? new ImageData(new Uint8ClampedArray(n), 1, 1) : n,
    a = Array.isArray(r) ? new ImageData(new Uint8ClampedArray(r), 1, 1) : r;
  na(i, s, !0, () => {
    var t = i.g;
    t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, e), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, i.j), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, o), t.activeTexture(t.TEXTURE2), t.bindTexture(t.TEXTURE_2D, i.C), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, a), s.clearColor(0, 0, 0, 0), s.clear(s.COLOR_BUFFER_BIT), s.drawArrays(s.TRIANGLE_FAN, 0, 4), s.bindTexture(s.TEXTURE_2D, null), (t = i.g).activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE2), t.bindTexture(t.TEXTURE_2D, null);
  });
}
var Fa = class {
  constructor(t, e) {
    t instanceof CanvasRenderingContext2D || t instanceof OffscreenCanvasRenderingContext2D ? (this.l = t, this.j = e) : this.j = t;
  }
  Aa(t, e) {
    if (t) {
      var n = ba(this);
      e = wa(e), n.save();
      var r = n.canvas,
        s = 0;
      for (const i of t) n.fillStyle = Ta(e.fillColor, {
        index: s,
        from: i
      }), n.strokeStyle = Ta(e.color, {
        index: s,
        from: i
      }), n.lineWidth = Ta(e.lineWidth, {
        index: s,
        from: i
      }), (t = new Path2D()).arc(i.x * r.width, i.y * r.height, Ta(e.radius, {
        index: s,
        from: i
      }), 0, 2 * Math.PI), n.fill(t), n.stroke(t), ++s;
      n.restore();
    }
  }
  za(t, e, n) {
    if (t && e) {
      var r = ba(this);
      n = wa(n), r.save();
      var s = r.canvas,
        i = 0;
      for (const o of e) {
        r.beginPath(), e = t[o.start];
        const a = t[o.end];
        e && a && (r.strokeStyle = Ta(n.color, {
          index: i,
          from: e,
          to: a
        }), r.lineWidth = Ta(n.lineWidth, {
          index: i,
          from: e,
          to: a
        }), r.moveTo(e.x * s.width, e.y * s.height), r.lineTo(a.x * s.width, a.y * s.height)), ++i, r.stroke();
      }
      r.restore();
    }
  }
  wa(t, e) {
    const n = ba(this);
    e = wa(e), n.save(), n.beginPath(), n.lineWidth = Ta(e.lineWidth, {}), n.strokeStyle = Ta(e.color, {}), n.fillStyle = Ta(e.fillColor, {}), n.moveTo(t.originX, t.originY), n.lineTo(t.originX + t.width, t.originY), n.lineTo(t.originX + t.width, t.originY + t.height), n.lineTo(t.originX, t.originY + t.height), n.lineTo(t.originX, t.originY), n.stroke(), n.fill(), n.restore();
  }
  xa(t, e, n = [0, 0, 0, 255]) {
    this.l ? function (t, e, n, r) {
      const s = ka(t);
      xa(t, e, e => {
        Sa(t, e, n, r), (e = ba(t)).drawImage(s.canvas, 0, 0, e.canvas.width, e.canvas.height);
      });
    }(this, t, n, e) : Sa(this, t.M(), n, e);
  }
  ya(t, e, n) {
    this.l ? function (t, e, n, r) {
      const s = ka(t);
      xa(t, e, e => {
        La(t, e, n, r), (e = ba(t)).drawImage(s.canvas, 0, 0, e.canvas.width, e.canvas.height);
      });
    }(this, t, e, n) : La(this, t.M(), e, n);
  }
  close() {
    this.g?.close(), this.g = void 0, this.h?.close(), this.h = void 0, this.m?.close(), this.m = void 0;
  }
};
exports.DrawingUtils = Fa;
function Ra(t, e) {
  switch (e) {
    case 0:
      return t.g.find(t => t instanceof ImageData);
    case 1:
      return t.g.find(t => "undefined" != typeof ImageBitmap && t instanceof ImageBitmap);
    case 2:
      return t.g.find(t => "undefined" != typeof WebGLTexture && t instanceof WebGLTexture);
    default:
      throw Error(`Type is not supported: ${e}`);
  }
}
function Ma(t) {
  var e = Ra(t, 0);
  if (!e) {
    e = Oa(t);
    const n = Ca(t),
      r = new Uint8Array(t.width * t.height * 4);
    sa(n, e, Pa(t)), e.readPixels(0, 0, t.width, t.height, e.RGBA, e.UNSIGNED_BYTE, r), ia(n), e = new ImageData(new Uint8ClampedArray(r.buffer), t.width, t.height), t.g.push(e);
  }
  return e;
}
function Pa(t) {
  let e = Ra(t, 2);
  if (!e) {
    const n = Oa(t);
    e = Ia(t);
    const r = Ra(t, 1) || Ma(t);
    n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, r), Da(t);
  }
  return e;
}
function Oa(t) {
  if (!t.canvas) throw Error("Conversion to different image formats require that a canvas is passed when iniitializing the image.");
  return t.h || (t.h = Jo(t.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t.h;
}
function Ca(t) {
  return t.l || (t.l = new oa()), t.l;
}
function Ia(t) {
  const e = Oa(t);
  e.viewport(0, 0, t.width, t.height), e.activeTexture(e.TEXTURE0);
  let n = Ra(t, 2);
  return n || (n = ra(Ca(t), e), t.g.push(n), t.m = !0), e.bindTexture(e.TEXTURE_2D, n), n;
}
function Da(t) {
  t.h.bindTexture(t.h.TEXTURE_2D, null);
}
function Na(t) {
  const e = Oa(t);
  return na(Ca(t), e, !0, () => function (t, e) {
    const n = t.canvas;
    if (n.width === t.width && n.height === t.height) return e();
    const r = n.width,
      s = n.height;
    return n.width = t.width, n.height = t.height, t = e(), n.width = r, n.height = s, t;
  }(t, () => {
    if (e.bindFramebuffer(e.FRAMEBUFFER, null), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), e.drawArrays(e.TRIANGLE_FAN, 0, 4), !(t.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
    return t.canvas.transferToImageBitmap();
  }));
}
Fa.prototype.close = Fa.prototype.close, Fa.prototype.drawConfidenceMask = Fa.prototype.ya, Fa.prototype.drawCategoryMask = Fa.prototype.xa, Fa.prototype.drawBoundingBox = Fa.prototype.wa, Fa.prototype.drawConnectors = Fa.prototype.za, Fa.prototype.drawLandmarks = Fa.prototype.Aa, Fa.lerp = function (t, e, n, r, s) {
  return Aa(r * (1 - (t - e) / (n - e)) + s * (1 - (n - t) / (n - e)), r, s);
}, Fa.clamp = Aa;
var Ua = class {
  constructor(t, e, n, r, s, i, o) {
    this.g = t, this.j = e, this.m = n, this.canvas = r, this.l = s, this.width = i, this.height = o, (this.j || this.m) && 0 === --Ba && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources.");
  }
  Ga() {
    return !!Ra(this, 0);
  }
  ma() {
    return !!Ra(this, 1);
  }
  R() {
    return !!Ra(this, 2);
  }
  Ea() {
    return Ma(this);
  }
  Da() {
    var t = Ra(this, 1);
    return t || (Pa(this), Ia(this), t = Na(this), Da(this), this.g.push(t), this.j = !0), t;
  }
  M() {
    return Pa(this);
  }
  clone() {
    const t = [];
    for (const e of this.g) {
      let n;
      if (e instanceof ImageData) n = new ImageData(e.data, this.width, this.height);else if (e instanceof WebGLTexture) {
        const t = Oa(this),
          e = Ca(this);
        t.activeTexture(t.TEXTURE1), n = ra(e, t), t.bindTexture(t.TEXTURE_2D, n), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.width, this.height, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.bindTexture(t.TEXTURE_2D, null), sa(e, t, n), na(e, t, !1, () => {
          Ia(this), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.drawArrays(t.TRIANGLE_FAN, 0, 4), Da(this);
        }), ia(e), Da(this);
      } else {
        if (!(e instanceof ImageBitmap)) throw Error(`Type is not supported: ${e}`);
        Pa(this), Ia(this), n = Na(this), Da(this);
      }
      t.push(n);
    }
    return new Ua(t, this.ma(), this.R(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && Ra(this, 1).close(), this.m && Oa(this).deleteTexture(Ra(this, 2)), Ba = -1;
  }
};
exports.MPImage = Ua;
Ua.prototype.close = Ua.prototype.close, Ua.prototype.clone = Ua.prototype.clone, Ua.prototype.getAsWebGLTexture = Ua.prototype.M, Ua.prototype.getAsImageBitmap = Ua.prototype.Da, Ua.prototype.getAsImageData = Ua.prototype.Ea, Ua.prototype.hasWebGLTexture = Ua.prototype.R, Ua.prototype.hasImageBitmap = Ua.prototype.ma, Ua.prototype.hasImageData = Ua.prototype.Ga;
var Ba = 250;
function Ga(...t) {
  return t.map(([t, e]) => ({
    start: t,
    end: e
  }));
}
const ja = function (t) {
  return class extends t {
    Ma() {
      this.i._registerModelResourcesGraphService();
    }
  };
}((Va = class {
  constructor(t, e) {
    this.l = !0, this.i = t, this.g = null, this.h = 0, this.m = "function" == typeof this.i._addIntToInputStream, void 0 !== e ? this.i.canvas = e : "undefined" == typeof OffscreenCanvas || Io() ? (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.i.canvas = document.createElement("canvas")) : this.i.canvas = new OffscreenCanvas(1, 1);
  }
  async initializeGraph(t) {
    const e = await (await fetch(t)).arrayBuffer();
    t = !(t.endsWith(".pbtxt") || t.endsWith(".textproto")), this.setGraph(new Uint8Array(e), t);
  }
  setGraphFromString(t) {
    this.setGraph(new TextEncoder().encode(t), !1);
  }
  setGraph(t, e) {
    const n = t.length,
      r = this.i._malloc(n);
    this.i.HEAPU8.set(t, r), e ? this.i._changeBinaryGraph(n, r) : this.i._changeTextGraph(n, r), this.i._free(r);
  }
  configureAudio(t, e, n, r, s) {
    this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), Uo(this, r || "input_audio", r => {
      Uo(this, s = s || "audio_header", s => {
        this.i._configureAudio(r, s, t, e, n);
      });
    });
  }
  setAutoResizeCanvas(t) {
    this.l = t;
  }
  setAutoRenderToScreen(t) {
    this.i._setAutoRenderToScreen(t);
  }
  setGpuBufferVerticalFlip(t) {
    this.i.gpuOriginForWebTexturesIsBottomLeft = t;
  }
  fa(t) {
    jo(this, "__graph_config__", e => {
      t(e);
    }), Uo(this, "__graph_config__", t => {
      this.i._getGraphConfig(t, void 0);
    }), delete this.i.simpleListeners.__graph_config__;
  }
  attachErrorListener(t) {
    this.i.errorListener = t;
  }
  attachEmptyPacketListener(t, e) {
    this.i.emptyPacketListeners = this.i.emptyPacketListeners || {}, this.i.emptyPacketListeners[t] = e;
  }
  addAudioToStream(t, e, n) {
    this.addAudioToStreamWithShape(t, 0, 0, e, n);
  }
  addAudioToStreamWithShape(t, e, n, r, s) {
    const i = 4 * t.length;
    this.h !== i && (this.g && this.i._free(this.g), this.g = this.i._malloc(i), this.h = i), this.i.HEAPF32.set(t, this.g / 4), Uo(this, r, t => {
      this.i._addAudioToInputStream(this.g, e, n, t, s);
    });
  }
  addGpuBufferToStream(t, e, n) {
    Uo(this, e, e => {
      const [r, s] = Bo(this, t, e);
      this.i._addBoundTextureToStream(e, r, s, n);
    });
  }
  addBoolToStream(t, e, n) {
    Uo(this, e, e => {
      this.i._addBoolToInputStream(t, e, n);
    });
  }
  addDoubleToStream(t, e, n) {
    Uo(this, e, e => {
      this.i._addDoubleToInputStream(t, e, n);
    });
  }
  addFloatToStream(t, e, n) {
    Uo(this, e, e => {
      this.i._addFloatToInputStream(t, e, n);
    });
  }
  addIntToStream(t, e, n) {
    Uo(this, e, e => {
      this.i._addIntToInputStream(t, e, n);
    });
  }
  addStringToStream(t, e, n) {
    Uo(this, e, e => {
      Uo(this, t, t => {
        this.i._addStringToInputStream(t, e, n);
      });
    });
  }
  addStringRecordToStream(t, e, n) {
    Uo(this, e, e => {
      Go(this, Object.keys(t), r => {
        Go(this, Object.values(t), s => {
          this.i._addFlatHashMapToInputStream(r, s, Object.keys(t).length, e, n);
        });
      });
    });
  }
  addProtoToStream(t, e, n, r) {
    Uo(this, n, n => {
      Uo(this, e, e => {
        const s = this.i._malloc(t.length);
        this.i.HEAPU8.set(t, s), this.i._addProtoToInputStream(s, t.length, e, n, r), this.i._free(s);
      });
    });
  }
  addEmptyPacketToStream(t, e) {
    Uo(this, t, t => {
      this.i._addEmptyPacketToInputStream(t, e);
    });
  }
  addBoolVectorToStream(t, e, n) {
    Uo(this, e, e => {
      const r = this.i._allocateBoolVector(t.length);
      if (!r) throw Error("Unable to allocate new bool vector on heap.");
      for (const e of t) this.i._addBoolVectorEntry(r, e);
      this.i._addBoolVectorToInputStream(r, e, n);
    });
  }
  addDoubleVectorToStream(t, e, n) {
    Uo(this, e, e => {
      const r = this.i._allocateDoubleVector(t.length);
      if (!r) throw Error("Unable to allocate new double vector on heap.");
      for (const e of t) this.i._addDoubleVectorEntry(r, e);
      this.i._addDoubleVectorToInputStream(r, e, n);
    });
  }
  addFloatVectorToStream(t, e, n) {
    Uo(this, e, e => {
      const r = this.i._allocateFloatVector(t.length);
      if (!r) throw Error("Unable to allocate new float vector on heap.");
      for (const e of t) this.i._addFloatVectorEntry(r, e);
      this.i._addFloatVectorToInputStream(r, e, n);
    });
  }
  addIntVectorToStream(t, e, n) {
    Uo(this, e, e => {
      const r = this.i._allocateIntVector(t.length);
      if (!r) throw Error("Unable to allocate new int vector on heap.");
      for (const e of t) this.i._addIntVectorEntry(r, e);
      this.i._addIntVectorToInputStream(r, e, n);
    });
  }
  addStringVectorToStream(t, e, n) {
    Uo(this, e, e => {
      const r = this.i._allocateStringVector(t.length);
      if (!r) throw Error("Unable to allocate new string vector on heap.");
      for (const e of t) Uo(this, e, t => {
        this.i._addStringVectorEntry(r, t);
      });
      this.i._addStringVectorToInputStream(r, e, n);
    });
  }
  addBoolToInputSidePacket(t, e) {
    Uo(this, e, e => {
      this.i._addBoolToInputSidePacket(t, e);
    });
  }
  addDoubleToInputSidePacket(t, e) {
    Uo(this, e, e => {
      this.i._addDoubleToInputSidePacket(t, e);
    });
  }
  addFloatToInputSidePacket(t, e) {
    Uo(this, e, e => {
      this.i._addFloatToInputSidePacket(t, e);
    });
  }
  addIntToInputSidePacket(t, e) {
    Uo(this, e, e => {
      this.i._addIntToInputSidePacket(t, e);
    });
  }
  addStringToInputSidePacket(t, e) {
    Uo(this, e, e => {
      Uo(this, t, t => {
        this.i._addStringToInputSidePacket(t, e);
      });
    });
  }
  addProtoToInputSidePacket(t, e, n) {
    Uo(this, n, n => {
      Uo(this, e, e => {
        const r = this.i._malloc(t.length);
        this.i.HEAPU8.set(t, r), this.i._addProtoToInputSidePacket(r, t.length, e, n), this.i._free(r);
      });
    });
  }
  addBoolVectorToInputSidePacket(t, e) {
    Uo(this, e, e => {
      const n = this.i._allocateBoolVector(t.length);
      if (!n) throw Error("Unable to allocate new bool vector on heap.");
      for (const e of t) this.i._addBoolVectorEntry(n, e);
      this.i._addBoolVectorToInputSidePacket(n, e);
    });
  }
  addDoubleVectorToInputSidePacket(t, e) {
    Uo(this, e, e => {
      const n = this.i._allocateDoubleVector(t.length);
      if (!n) throw Error("Unable to allocate new double vector on heap.");
      for (const e of t) this.i._addDoubleVectorEntry(n, e);
      this.i._addDoubleVectorToInputSidePacket(n, e);
    });
  }
  addFloatVectorToInputSidePacket(t, e) {
    Uo(this, e, e => {
      const n = this.i._allocateFloatVector(t.length);
      if (!n) throw Error("Unable to allocate new float vector on heap.");
      for (const e of t) this.i._addFloatVectorEntry(n, e);
      this.i._addFloatVectorToInputSidePacket(n, e);
    });
  }
  addIntVectorToInputSidePacket(t, e) {
    Uo(this, e, e => {
      const n = this.i._allocateIntVector(t.length);
      if (!n) throw Error("Unable to allocate new int vector on heap.");
      for (const e of t) this.i._addIntVectorEntry(n, e);
      this.i._addIntVectorToInputSidePacket(n, e);
    });
  }
  addStringVectorToInputSidePacket(t, e) {
    Uo(this, e, e => {
      const n = this.i._allocateStringVector(t.length);
      if (!n) throw Error("Unable to allocate new string vector on heap.");
      for (const e of t) Uo(this, e, t => {
        this.i._addStringVectorEntry(n, t);
      });
      this.i._addStringVectorToInputSidePacket(n, e);
    });
  }
  attachBoolListener(t, e) {
    jo(this, t, e), Uo(this, t, t => {
      this.i._attachBoolListener(t);
    });
  }
  attachBoolVectorListener(t, e) {
    Vo(this, t, e), Uo(this, t, t => {
      this.i._attachBoolVectorListener(t);
    });
  }
  attachIntListener(t, e) {
    jo(this, t, e), Uo(this, t, t => {
      this.i._attachIntListener(t);
    });
  }
  attachIntVectorListener(t, e) {
    Vo(this, t, e), Uo(this, t, t => {
      this.i._attachIntVectorListener(t);
    });
  }
  attachDoubleListener(t, e) {
    jo(this, t, e), Uo(this, t, t => {
      this.i._attachDoubleListener(t);
    });
  }
  attachDoubleVectorListener(t, e) {
    Vo(this, t, e), Uo(this, t, t => {
      this.i._attachDoubleVectorListener(t);
    });
  }
  attachFloatListener(t, e) {
    jo(this, t, e), Uo(this, t, t => {
      this.i._attachFloatListener(t);
    });
  }
  attachFloatVectorListener(t, e) {
    Vo(this, t, e), Uo(this, t, t => {
      this.i._attachFloatVectorListener(t);
    });
  }
  attachStringListener(t, e) {
    jo(this, t, e), Uo(this, t, t => {
      this.i._attachStringListener(t);
    });
  }
  attachStringVectorListener(t, e) {
    Vo(this, t, e), Uo(this, t, t => {
      this.i._attachStringVectorListener(t);
    });
  }
  attachProtoListener(t, e, n) {
    jo(this, t, e), Uo(this, t, t => {
      this.i._attachProtoListener(t, n || !1);
    });
  }
  attachProtoVectorListener(t, e, n) {
    Vo(this, t, e), Uo(this, t, t => {
      this.i._attachProtoVectorListener(t, n || !1);
    });
  }
  attachAudioListener(t, e, n) {
    this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), jo(this, t, (t, n) => {
      t = new Float32Array(t.buffer, t.byteOffset, t.length / 4), e(t, n);
    }), Uo(this, t, t => {
      this.i._attachAudioListener(t, n || !1);
    });
  }
  finishProcessing() {
    this.i._waitUntilIdle();
  }
  closeGraph() {
    this.i._closeGraph(), this.i.simpleListeners = void 0, this.i.emptyPacketListeners = void 0;
  }
}, class extends Va {
  get ha() {
    return this.i;
  }
  sa(t, e, n) {
    Uo(this, e, e => {
      const [r, s] = Bo(this, t, e);
      this.ha._addBoundTextureAsImageToStream(e, r, s, n);
    });
  }
  W(t, e) {
    jo(this, t, e), Uo(this, t, t => {
      this.ha._attachImageListener(t);
    });
  }
  da(t, e) {
    Vo(this, t, e), Uo(this, t, t => {
      this.ha._attachImageVectorListener(t);
    });
  }
}));
var Va,
  Xa = class extends ja {};
async function Ha(t, e, n) {
  return async function (t, e, n, r) {
    return Xo(t, e, n, r);
  }(t, n.canvas ?? ("undefined" == typeof OffscreenCanvas || Io() ? document.createElement("canvas") : void 0), e, n);
}
function Wa(t, e, n, r) {
  if (t.V) {
    const i = new si();
    if (n?.regionOfInterest) {
      if (!t.ra) throw Error("This task doesn't support region-of-interest.");
      var s = n.regionOfInterest;
      if (s.left >= s.right || s.top >= s.bottom) throw Error("Expected RectF with left < right and top < bottom.");
      if (0 > s.left || 0 > s.top || 1 < s.right || 1 < s.bottom) throw Error("Expected RectF values to be in [0,1].");
      In(i, 1, (s.left + s.right) / 2), In(i, 2, (s.top + s.bottom) / 2), In(i, 4, s.right - s.left), In(i, 3, s.bottom - s.top);
    } else In(i, 1, .5), In(i, 2, .5), In(i, 4, 1), In(i, 3, 1);
    if (n?.rotationDegrees) {
      if (0 != n?.rotationDegrees % 90) throw Error("Expected rotation to be a multiple of 90°.");
      if (In(i, 5, -Math.PI * n.rotationDegrees / 180), 0 != n?.rotationDegrees % 180) {
        const [t, r] = No(e);
        n = Pn(i, 3) * r / t, s = Pn(i, 4) * t / r, In(i, 4, n), In(i, 3, s);
      }
    }
    t.g.addProtoToStream(i.g(), "mediapipe.NormalizedRect", t.V, r);
  }
  t.g.sa(e, t.ba, r ?? performance.now()), t.finishProcessing();
}
function za(t, e, n) {
  if (t.baseOptions?.g()) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
  Wa(t, e, n, t.C + 1);
}
function Ka(t, e, n, r) {
  if (!t.baseOptions?.g()) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
  Wa(t, e, n, r);
}
function Ya(t, e, n, r) {
  var s = e.data;
  const i = e.width,
    o = i * (e = e.height);
  if ((s instanceof Uint8Array || s instanceof Float32Array) && s.length !== o) throw Error("Unsupported channel count: " + s.length / o);
  return t = new _a([s], n, !1, t.g.i.canvas, t.O, i, e), r ? t.clone() : t;
}
var $a = class extends qo {
  constructor(t, e, n, r) {
    super(t), this.g = t, this.ba = e, this.V = n, this.ra = r, this.O = new oa();
  }
  l(t, e = !0) {
    if ("runningMode" in t && On(this.baseOptions, 2, !!t.runningMode && "IMAGE" !== t.runningMode), void 0 !== t.canvas && this.g.i.canvas !== t.canvas) throw Error("You must create a new task to reset the canvas.");
    return super.l(t, e);
  }
  close() {
    this.O.close(), super.close();
  }
};
exports.VisionTaskRunner = $a;
$a.prototype.close = $a.prototype.close;
var qa = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "image_in", "norm_rect_in", !1), this.j = {
      detections: []
    }, kn(t = this.h = new xi(), 0, 1, e = new bi()), In(this.h, 2, .5), In(this.h, 3, .3);
  }
  get baseOptions() {
    return Tn(this.h, bi, 1);
  }
  set baseOptions(t) {
    kn(this.h, 0, 1, t);
  }
  o(t) {
    return "minDetectionConfidence" in t && In(this.h, 2, t.minDetectionConfidence ?? .5), "minSuppressionThreshold" in t && In(this.h, 3, t.minSuppressionThreshold ?? .3), this.l(t);
  }
  F(t, e) {
    return this.j = {
      detections: []
    }, za(this, t, e), this.j;
  }
  G(t, e, n) {
    return this.j = {
      detections: []
    }, Ka(this, t, n, e), this.j;
  }
  m() {
    var t = new Ls();
    xs(t, "image_in"), xs(t, "norm_rect_in"), Ss(t, "detections");
    const e = new hs();
    Dn(e, Li, this.h);
    const n = new vs();
    ms(n, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), ys(n, "IMAGE:image_in"), ys(n, "NORM_RECT:norm_rect_in"), _s(n, "DETECTIONS:detections"), n.o(e), ks(t, n), this.g.attachProtoVectorListener("detections", (t, e) => {
      for (const e of t) t = Ks(e), this.j.detections.push(ko(t));
      zo(this, e);
    }), this.g.attachEmptyPacketListener("detections", t => {
      zo(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.FaceDetector = qa;
qa.prototype.detectForVideo = qa.prototype.G, qa.prototype.detect = qa.prototype.F, qa.prototype.setOptions = qa.prototype.o, qa.createFromModelPath = async function (t, e) {
  return Ha(qa, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, qa.createFromModelBuffer = function (t, e) {
  return Ha(qa, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, qa.createFromOptions = function (t, e) {
  return Ha(qa, t, e);
};
var Ja = Ga([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]),
  Za = Ga([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]),
  Qa = Ga([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]),
  th = Ga([474, 475], [475, 476], [476, 477], [477, 474]),
  eh = Ga([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]),
  nh = Ga([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]),
  rh = Ga([469, 470], [470, 471], [471, 472], [472, 469]),
  sh = Ga([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]),
  ih = [...Ja, ...Za, ...Qa, ...eh, ...nh, ...sh],
  oh = Ga([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
function ah(t) {
  t.j = {
    faceLandmarks: [],
    faceBlendshapes: [],
    facialTransformationMatrixes: []
  };
}
var hh = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "image_in", "norm_rect", !1), this.j = {
      faceLandmarks: [],
      faceBlendshapes: [],
      facialTransformationMatrixes: []
    }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = !1, kn(t = this.h = new Ii(), 0, 1, e = new bi()), this.v = new Oi(), kn(this.h, 0, 3, this.v), this.s = new xi(), kn(this.h, 0, 2, this.s), Cn(this.s, 4, 1), In(this.s, 2, .5), In(this.v, 2, .5), In(this.h, 4, .5);
  }
  get baseOptions() {
    return Tn(this.h, bi, 1);
  }
  set baseOptions(t) {
    kn(this.h, 0, 1, t);
  }
  o(t) {
    return "numFaces" in t && Cn(this.s, 4, t.numFaces ?? 1), "minFaceDetectionConfidence" in t && In(this.s, 2, t.minFaceDetectionConfidence ?? .5), "minTrackingConfidence" in t && In(this.h, 4, t.minTrackingConfidence ?? .5), "minFacePresenceConfidence" in t && In(this.v, 2, t.minFacePresenceConfidence ?? .5), "outputFaceBlendshapes" in t && (this.outputFaceBlendshapes = !!t.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in t && (this.outputFacialTransformationMatrixes = !!t.outputFacialTransformationMatrixes), this.l(t);
  }
  F(t, e) {
    return ah(this), za(this, t, e), this.j;
  }
  G(t, e, n) {
    return ah(this), Ka(this, t, n, e), this.j;
  }
  m() {
    var t = new Ls();
    xs(t, "image_in"), xs(t, "norm_rect"), Ss(t, "face_landmarks");
    const e = new hs();
    Dn(e, Ni, this.h);
    const n = new vs();
    ms(n, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), ys(n, "IMAGE:image_in"), ys(n, "NORM_RECT:norm_rect"), _s(n, "NORM_LANDMARKS:face_landmarks"), n.o(e), ks(t, n), this.g.attachProtoVectorListener("face_landmarks", (t, e) => {
      for (const e of t) t = ei(e), this.j.faceLandmarks.push(xo(t));
      zo(this, e);
    }), this.g.attachEmptyPacketListener("face_landmarks", t => {
      zo(this, t);
    }), this.outputFaceBlendshapes && (Ss(t, "blendshapes"), _s(n, "BLENDSHAPES:blendshapes"), this.g.attachProtoVectorListener("blendshapes", (t, e) => {
      if (this.outputFaceBlendshapes) for (const e of t) t = Ds(e), this.j.faceBlendshapes.push(bo(t.g() ?? []));
      zo(this, e);
    }), this.g.attachEmptyPacketListener("blendshapes", t => {
      zo(this, t);
    })), this.outputFacialTransformationMatrixes && (Ss(t, "face_geometry"), _s(n, "FACE_GEOMETRY:face_geometry"), this.g.attachProtoVectorListener("face_geometry", (t, e) => {
      if (this.outputFacialTransformationMatrixes) for (const e of t) (t = Tn(Mi(e), ni, 2)) && this.j.facialTransformationMatrixes.push({
        rows: Mn(Fn(t, 1)) ?? 0,
        columns: Mn(Fn(t, 2)) ?? 0,
        data: cn(t, 3, fe).slice() ?? []
      });
      zo(this, e);
    }), this.g.attachEmptyPacketListener("face_geometry", t => {
      zo(this, t);
    })), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.FaceLandmarker = hh;
hh.prototype.detectForVideo = hh.prototype.G, hh.prototype.detect = hh.prototype.F, hh.prototype.setOptions = hh.prototype.o, hh.createFromModelPath = function (t, e) {
  return Ha(hh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, hh.createFromModelBuffer = function (t, e) {
  return Ha(hh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, hh.createFromOptions = function (t, e) {
  return Ha(hh, t, e);
}, hh.FACE_LANDMARKS_LIPS = Ja, hh.FACE_LANDMARKS_LEFT_EYE = Za, hh.FACE_LANDMARKS_LEFT_EYEBROW = Qa, hh.FACE_LANDMARKS_LEFT_IRIS = th, hh.FACE_LANDMARKS_RIGHT_EYE = eh, hh.FACE_LANDMARKS_RIGHT_EYEBROW = nh, hh.FACE_LANDMARKS_RIGHT_IRIS = rh, hh.FACE_LANDMARKS_FACE_OVAL = sh, hh.FACE_LANDMARKS_CONTOURS = ih, hh.FACE_LANDMARKS_TESSELATION = oh;
var ch = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "image_in", "norm_rect", !0), kn(t = this.j = new Ui(), 0, 1, e = new bi());
  }
  get baseOptions() {
    return Tn(this.j, bi, 1);
  }
  set baseOptions(t) {
    kn(this.j, 0, 1, t);
  }
  o(t) {
    return super.l(t);
  }
  Pa(t, e, n) {
    const r = "function" != typeof e ? e : {};
    if (this.h = "function" == typeof e ? e : n, za(this, t, r ?? {}), !this.h) return this.s;
  }
  m() {
    var t = new Ls();
    xs(t, "image_in"), xs(t, "norm_rect"), Ss(t, "stylized_image");
    const e = new hs();
    Dn(e, Bi, this.j);
    const n = new vs();
    ms(n, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"), ys(n, "IMAGE:image_in"), ys(n, "NORM_RECT:norm_rect"), _s(n, "STYLIZED_IMAGE:stylized_image"), n.o(e), ks(t, n), this.g.W("stylized_image", (t, e) => {
      var n = !this.h,
        r = t.data,
        s = t.width;
      const i = s * (t = t.height);
      if (r instanceof Uint8Array) {
        if (r.length === 3 * i) {
          const e = new Uint8ClampedArray(4 * i);
          for (let t = 0; t < i; ++t) e[4 * t] = r[3 * t], e[4 * t + 1] = r[3 * t + 1], e[4 * t + 2] = r[3 * t + 2], e[4 * t + 3] = 255;
          r = new ImageData(e, s, t);
        } else {
          if (r.length !== 4 * i) throw Error("Unsupported channel count: " + r.length / i);
          r = new ImageData(new Uint8ClampedArray(r.buffer, r.byteOffset, r.length), s, t);
        }
      } else if (!(r instanceof WebGLTexture)) throw Error(`Unsupported format: ${r.constructor.name}`);
      s = new Ua([r], !1, !1, this.g.i.canvas, this.O, s, t), this.s = n = n ? s.clone() : s, this.h && this.h(n), zo(this, e);
    }), this.g.attachEmptyPacketListener("stylized_image", t => {
      this.s = null, this.h && this.h(null), zo(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.FaceStylizer = ch;
ch.prototype.stylize = ch.prototype.Pa, ch.prototype.setOptions = ch.prototype.o, ch.createFromModelPath = function (t, e) {
  return Ha(ch, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, ch.createFromModelBuffer = function (t, e) {
  return Ha(ch, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, ch.createFromOptions = function (t, e) {
  return Ha(ch, t, e);
};
var uh = Ga([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
function lh(t) {
  t.gestures = [], t.landmarks = [], t.worldLandmarks = [], t.handedness = [];
}
function dh(t) {
  return 0 === t.gestures.length ? {
    gestures: [],
    landmarks: [],
    worldLandmarks: [],
    handedness: [],
    handednesses: []
  } : {
    gestures: t.gestures,
    landmarks: t.landmarks,
    worldLandmarks: t.worldLandmarks,
    handedness: t.handedness,
    handednesses: t.handedness
  };
}
function fh(t, e = !0) {
  const n = [];
  for (const s of t) {
    var r = Ds(s);
    t = [];
    for (const n of r.g()) r = e && null != Fn(n, 1) ? Mn(Fn(n, 1)) : -1, t.push({
      score: Pn(n, 2) ?? 0,
      index: r,
      categoryName: Rn(n, 3) ?? "" ?? "",
      displayName: Rn(n, 4) ?? "" ?? ""
    });
    n.push(t);
  }
  return n;
}
var ph = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "image_in", "norm_rect", !1), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], kn(t = this.j = new Ji(), 0, 1, e = new bi()), this.s = new $i(), kn(this.j, 0, 2, this.s), this.D = new Ki(), kn(this.s, 0, 3, this.D), this.v = new Wi(), kn(this.s, 0, 2, this.v), this.h = new Xi(), kn(this.j, 0, 3, this.h), In(this.v, 2, .5), In(this.s, 4, .5), In(this.D, 2, .5);
  }
  get baseOptions() {
    return Tn(this.j, bi, 1);
  }
  set baseOptions(t) {
    kn(this.j, 0, 1, t);
  }
  o(t) {
    if (Cn(this.v, 3, t.numHands ?? 1), "minHandDetectionConfidence" in t && In(this.v, 2, t.minHandDetectionConfidence ?? .5), "minTrackingConfidence" in t && In(this.s, 4, t.minTrackingConfidence ?? .5), "minHandPresenceConfidence" in t && In(this.D, 2, t.minHandPresenceConfidence ?? .5), t.cannedGesturesClassifierOptions) {
      var e = new Gi(),
        n = e,
        r = Ao(t.cannedGesturesClassifierOptions, Tn(this.h, Gi, 3)?.h());
      kn(n, 0, 2, r), kn(this.h, 0, 3, e);
    } else void 0 === t.cannedGesturesClassifierOptions && Tn(this.h, Gi, 3)?.g();
    return t.customGesturesClassifierOptions ? (kn(n = e = new Gi(), 0, 2, r = Ao(t.customGesturesClassifierOptions, Tn(this.h, Gi, 4)?.h())), kn(this.h, 0, 4, e)) : void 0 === t.customGesturesClassifierOptions && Tn(this.h, Gi, 4)?.g(), this.l(t);
  }
  Ka(t, e) {
    return lh(this), za(this, t, e), dh(this);
  }
  La(t, e, n) {
    return lh(this), Ka(this, t, n, e), dh(this);
  }
  m() {
    var t = new Ls();
    xs(t, "image_in"), xs(t, "norm_rect"), Ss(t, "hand_gestures"), Ss(t, "hand_landmarks"), Ss(t, "world_hand_landmarks"), Ss(t, "handedness");
    const e = new hs();
    Dn(e, to, this.j);
    const n = new vs();
    ms(n, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), ys(n, "IMAGE:image_in"), ys(n, "NORM_RECT:norm_rect"), _s(n, "HAND_GESTURES:hand_gestures"), _s(n, "LANDMARKS:hand_landmarks"), _s(n, "WORLD_LANDMARKS:world_hand_landmarks"), _s(n, "HANDEDNESS:handedness"), n.o(e), ks(t, n), this.g.attachProtoVectorListener("hand_landmarks", (t, e) => {
      for (const e of t) {
        t = ei(e);
        const n = [];
        for (const e of bn(t, Zs, 1)) n.push({
          x: Pn(e, 1) ?? 0,
          y: Pn(e, 2) ?? 0,
          z: Pn(e, 3) ?? 0,
          visibility: Pn(e, 4) ?? 0
        });
        this.landmarks.push(n);
      }
      zo(this, e);
    }), this.g.attachEmptyPacketListener("hand_landmarks", t => {
      zo(this, t);
    }), this.g.attachProtoVectorListener("world_hand_landmarks", (t, e) => {
      for (const e of t) {
        t = Js(e);
        const n = [];
        for (const e of bn(t, Ys, 1)) n.push({
          x: Pn(e, 1) ?? 0,
          y: Pn(e, 2) ?? 0,
          z: Pn(e, 3) ?? 0,
          visibility: Pn(e, 4) ?? 0
        });
        this.worldLandmarks.push(n);
      }
      zo(this, e);
    }), this.g.attachEmptyPacketListener("world_hand_landmarks", t => {
      zo(this, t);
    }), this.g.attachProtoVectorListener("hand_gestures", (t, e) => {
      this.gestures.push(...fh(t, !1)), zo(this, e);
    }), this.g.attachEmptyPacketListener("hand_gestures", t => {
      zo(this, t);
    }), this.g.attachProtoVectorListener("handedness", (t, e) => {
      this.handedness.push(...fh(t)), zo(this, e);
    }), this.g.attachEmptyPacketListener("handedness", t => {
      zo(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.GestureRecognizer = ph;
function gh(t) {
  return {
    landmarks: t.landmarks,
    worldLandmarks: t.worldLandmarks,
    handednesses: t.handedness,
    handedness: t.handedness
  };
}
ph.prototype.recognizeForVideo = ph.prototype.La, ph.prototype.recognize = ph.prototype.Ka, ph.prototype.setOptions = ph.prototype.o, ph.createFromModelPath = function (t, e) {
  return Ha(ph, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, ph.createFromModelBuffer = function (t, e) {
  return Ha(ph, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, ph.createFromOptions = function (t, e) {
  return Ha(ph, t, e);
}, ph.HAND_CONNECTIONS = uh;
var mh = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], kn(t = this.h = new $i(), 0, 1, e = new bi()), this.s = new Ki(), kn(this.h, 0, 3, this.s), this.j = new Wi(), kn(this.h, 0, 2, this.j), Cn(this.j, 3, 1), In(this.j, 2, .5), In(this.s, 2, .5), In(this.h, 4, .5);
  }
  get baseOptions() {
    return Tn(this.h, bi, 1);
  }
  set baseOptions(t) {
    kn(this.h, 0, 1, t);
  }
  o(t) {
    return "numHands" in t && Cn(this.j, 3, t.numHands ?? 1), "minHandDetectionConfidence" in t && In(this.j, 2, t.minHandDetectionConfidence ?? .5), "minTrackingConfidence" in t && In(this.h, 4, t.minTrackingConfidence ?? .5), "minHandPresenceConfidence" in t && In(this.s, 2, t.minHandPresenceConfidence ?? .5), this.l(t);
  }
  F(t, e) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], za(this, t, e), gh(this);
  }
  G(t, e, n) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Ka(this, t, n, e), gh(this);
  }
  m() {
    var t = new Ls();
    xs(t, "image_in"), xs(t, "norm_rect"), Ss(t, "hand_landmarks"), Ss(t, "world_hand_landmarks"), Ss(t, "handedness");
    const e = new hs();
    Dn(e, Qi, this.h);
    const n = new vs();
    ms(n, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), ys(n, "IMAGE:image_in"), ys(n, "NORM_RECT:norm_rect"), _s(n, "LANDMARKS:hand_landmarks"), _s(n, "WORLD_LANDMARKS:world_hand_landmarks"), _s(n, "HANDEDNESS:handedness"), n.o(e), ks(t, n), this.g.attachProtoVectorListener("hand_landmarks", (t, e) => {
      for (const e of t) t = ei(e), this.landmarks.push(xo(t));
      zo(this, e);
    }), this.g.attachEmptyPacketListener("hand_landmarks", t => {
      zo(this, t);
    }), this.g.attachProtoVectorListener("world_hand_landmarks", (t, e) => {
      for (const e of t) t = Js(e), this.worldLandmarks.push(So(t));
      zo(this, e);
    }), this.g.attachEmptyPacketListener("world_hand_landmarks", t => {
      zo(this, t);
    }), this.g.attachProtoVectorListener("handedness", (t, e) => {
      var n = this.handedness,
        r = n.push;
      const s = [];
      for (const e of t) {
        t = Ds(e);
        const n = [];
        for (const e of t.g()) n.push({
          score: Pn(e, 2) ?? 0,
          index: Mn(Fn(e, 1)) ?? -1,
          categoryName: Rn(e, 3) ?? "" ?? "",
          displayName: Rn(e, 4) ?? "" ?? ""
        });
        s.push(n);
      }
      r.call(n, ...s), zo(this, e);
    }), this.g.attachEmptyPacketListener("handedness", t => {
      zo(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.HandLandmarker = mh;
mh.prototype.detectForVideo = mh.prototype.G, mh.prototype.detect = mh.prototype.F, mh.prototype.setOptions = mh.prototype.o, mh.createFromModelPath = function (t, e) {
  return Ha(mh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, mh.createFromModelBuffer = function (t, e) {
  return Ha(mh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, mh.createFromOptions = function (t, e) {
  return Ha(mh, t, e);
}, mh.HAND_CONNECTIONS = uh;
var yh = Ga([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
function _h(t) {
  t.h = {
    faceLandmarks: [],
    faceBlendshapes: [],
    poseLandmarks: [],
    poseWorldLandmarks: [],
    poseSegmentationMasks: [],
    leftHandLandmarks: [],
    leftHandWorldLandmarks: [],
    rightHandLandmarks: [],
    rightHandWorldLandmarks: []
  };
}
function vh(t) {
  try {
    if (!t.D) return t.h;
    t.D(t.h);
  } finally {
    $o(t);
  }
}
function Eh(t, e) {
  t = ei(t), e.push(xo(t));
}
var wh = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "input_frames_image", null, !1), this.h = {
      faceLandmarks: [],
      faceBlendshapes: [],
      poseLandmarks: [],
      poseWorldLandmarks: [],
      poseSegmentationMasks: [],
      leftHandLandmarks: [],
      leftHandWorldLandmarks: [],
      rightHandLandmarks: [],
      rightHandWorldLandmarks: []
    }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = !1, kn(t = this.j = new ao(), 0, 1, e = new bi()), this.I = new Ki(), kn(this.j, 0, 2, this.I), this.aa = new eo(), kn(this.j, 0, 3, this.aa), this.s = new xi(), kn(this.j, 0, 4, this.s), this.P = new Oi(), kn(this.j, 0, 5, this.P), this.v = new ro(), kn(this.j, 0, 6, this.v), this.J = new io(), kn(this.j, 0, 7, this.J), In(this.s, 2, .5), In(this.s, 3, .3), In(this.P, 2, .5), In(this.v, 2, .5), In(this.v, 3, .3), In(this.J, 2, .5), In(this.I, 2, .5);
  }
  get baseOptions() {
    return Tn(this.j, bi, 1);
  }
  set baseOptions(t) {
    kn(this.j, 0, 1, t);
  }
  o(t) {
    return "minFaceDetectionConfidence" in t && In(this.s, 2, t.minFaceDetectionConfidence ?? .5), "minFaceSuppressionThreshold" in t && In(this.s, 3, t.minFaceSuppressionThreshold ?? .3), "minFacePresenceConfidence" in t && In(this.P, 2, t.minFacePresenceConfidence ?? .5), "outputFaceBlendshapes" in t && (this.outputFaceBlendshapes = !!t.outputFaceBlendshapes), "minPoseDetectionConfidence" in t && In(this.v, 2, t.minPoseDetectionConfidence ?? .5), "minPoseSuppressionThreshold" in t && In(this.v, 3, t.minPoseSuppressionThreshold ?? .3), "minPosePresenceConfidence" in t && In(this.J, 2, t.minPosePresenceConfidence ?? .5), "outputPoseSegmentationMasks" in t && (this.outputPoseSegmentationMasks = !!t.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in t && In(this.I, 2, t.minHandLandmarksConfidence ?? .5), this.l(t);
  }
  F(t, e, n) {
    const r = "function" != typeof e ? e : {};
    return this.D = "function" == typeof e ? e : n, _h(this), za(this, t, r), vh(this);
  }
  G(t, e, n, r) {
    const s = "function" != typeof n ? n : {};
    return this.D = "function" == typeof n ? n : r, _h(this), Ka(this, t, s, e), vh(this);
  }
  m() {
    var t = new Ls();
    xs(t, "input_frames_image"), Ss(t, "pose_landmarks"), Ss(t, "pose_world_landmarks"), Ss(t, "face_landmarks"), Ss(t, "left_hand_landmarks"), Ss(t, "left_hand_world_landmarks"), Ss(t, "right_hand_landmarks"), Ss(t, "right_hand_world_landmarks");
    const e = new hs(),
      n = new Jr();
    gn(n, 1, ke("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), ""), function (t, e) {
      if (null != e) if (Array.isArray(e)) rn(t, 2, Ye(e, qe, void 0, void 0, !1));else {
        if (!("string" == typeof e || e instanceof U || R(e))) throw Error("invalid value in Any.value field: " + e + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
        gn(t, 2, se(e, !1, !1), D());
      }
    }(n, this.j.g());
    const r = new vs();
    ms(r, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), Ln(r, 8, Jr, n), ys(r, "IMAGE:input_frames_image"), _s(r, "POSE_LANDMARKS:pose_landmarks"), _s(r, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), _s(r, "FACE_LANDMARKS:face_landmarks"), _s(r, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), _s(r, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), _s(r, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), _s(r, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), r.o(e), ks(t, r), Ko(this, t), this.g.attachProtoListener("pose_landmarks", (t, e) => {
      Eh(t, this.h.poseLandmarks), zo(this, e);
    }), this.g.attachEmptyPacketListener("pose_landmarks", t => {
      zo(this, t);
    }), this.g.attachProtoListener("pose_world_landmarks", (t, e) => {
      var n = this.h.poseWorldLandmarks;
      t = Js(t), n.push(So(t)), zo(this, e);
    }), this.g.attachEmptyPacketListener("pose_world_landmarks", t => {
      zo(this, t);
    }), this.outputPoseSegmentationMasks && (_s(r, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), Yo(this, "pose_segmentation_mask"), this.g.W("pose_segmentation_mask", (t, e) => {
      this.h.poseSegmentationMasks = [Ya(this, t, !0, !this.D)], zo(this, e);
    }), this.g.attachEmptyPacketListener("pose_segmentation_mask", t => {
      this.h.poseSegmentationMasks = [], zo(this, t);
    })), this.g.attachProtoListener("face_landmarks", (t, e) => {
      Eh(t, this.h.faceLandmarks), zo(this, e);
    }), this.g.attachEmptyPacketListener("face_landmarks", t => {
      zo(this, t);
    }), this.outputFaceBlendshapes && (Ss(t, "extra_blendshapes"), _s(r, "FACE_BLENDSHAPES:extra_blendshapes"), this.g.attachProtoListener("extra_blendshapes", (t, e) => {
      var n = this.h.faceBlendshapes;
      this.outputFaceBlendshapes && (t = Ds(t), n.push(bo(t.g() ?? []))), zo(this, e);
    }), this.g.attachEmptyPacketListener("extra_blendshapes", t => {
      zo(this, t);
    })), this.g.attachProtoListener("left_hand_landmarks", (t, e) => {
      Eh(t, this.h.leftHandLandmarks), zo(this, e);
    }), this.g.attachEmptyPacketListener("left_hand_landmarks", t => {
      zo(this, t);
    }), this.g.attachProtoListener("left_hand_world_landmarks", (t, e) => {
      var n = this.h.leftHandWorldLandmarks;
      t = Js(t), n.push(So(t)), zo(this, e);
    }), this.g.attachEmptyPacketListener("left_hand_world_landmarks", t => {
      zo(this, t);
    }), this.g.attachProtoListener("right_hand_landmarks", (t, e) => {
      Eh(t, this.h.rightHandLandmarks), zo(this, e);
    }), this.g.attachEmptyPacketListener("right_hand_landmarks", t => {
      zo(this, t);
    }), this.g.attachProtoListener("right_hand_world_landmarks", (t, e) => {
      var n = this.h.rightHandWorldLandmarks;
      t = Js(t), n.push(So(t)), zo(this, e);
    }), this.g.attachEmptyPacketListener("right_hand_world_landmarks", t => {
      zo(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.HolisticLandmarker = wh;
wh.prototype.detectForVideo = wh.prototype.G, wh.prototype.detect = wh.prototype.F, wh.prototype.setOptions = wh.prototype.o, wh.createFromModelPath = function (t, e) {
  return Ha(wh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, wh.createFromModelBuffer = function (t, e) {
  return Ha(wh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, wh.createFromOptions = function (t, e) {
  return Ha(wh, t, e);
}, wh.HAND_CONNECTIONS = uh, wh.POSE_CONNECTIONS = yh, wh.FACE_LANDMARKS_LIPS = Ja, wh.FACE_LANDMARKS_LEFT_EYE = Za, wh.FACE_LANDMARKS_LEFT_EYEBROW = Qa, wh.FACE_LANDMARKS_LEFT_IRIS = th, wh.FACE_LANDMARKS_RIGHT_EYE = eh, wh.FACE_LANDMARKS_RIGHT_EYEBROW = nh, wh.FACE_LANDMARKS_RIGHT_IRIS = rh, wh.FACE_LANDMARKS_FACE_OVAL = sh, wh.FACE_LANDMARKS_CONTOURS = ih, wh.FACE_LANDMARKS_TESSELATION = oh;
var Th = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "input_image", "norm_rect", !0), this.j = {
      classifications: []
    }, kn(t = this.h = new ho(), 0, 1, e = new bi());
  }
  get baseOptions() {
    return Tn(this.h, bi, 1);
  }
  set baseOptions(t) {
    kn(this.h, 0, 1, t);
  }
  o(t) {
    return kn(this.h, 0, 2, Ao(t, Tn(this.h, mi, 2))), this.l(t);
  }
  ua(t, e) {
    return this.j = {
      classifications: []
    }, za(this, t, e), this.j;
  }
  va(t, e, n) {
    return this.j = {
      classifications: []
    }, Ka(this, t, n, e), this.j;
  }
  m() {
    var t = new Ls();
    xs(t, "input_image"), xs(t, "norm_rect"), Ss(t, "classifications");
    const e = new hs();
    Dn(e, co, this.h);
    const n = new vs();
    ms(n, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), ys(n, "IMAGE:input_image"), ys(n, "NORM_RECT:norm_rect"), _s(n, "CLASSIFICATIONS:classifications"), n.o(e), ks(t, n), this.g.attachProtoListener("classifications", (t, e) => {
      this.j = function (t) {
        const e = {
          classifications: bn(t, ii, 1).map(t => bo(Tn(t, Cs, 4)?.g() ?? [], Mn(Fn(t, 2)), Rn(t, 3) ?? ""))
        };
        return null != Ae(en(t, 2)) && (e.timestampMs = Mn(Ae(en(t, 2)))), e;
      }(hi(t)), zo(this, e);
    }), this.g.attachEmptyPacketListener("classifications", t => {
      zo(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ImageClassifier = Th;
Th.prototype.classifyForVideo = Th.prototype.va, Th.prototype.classify = Th.prototype.ua, Th.prototype.setOptions = Th.prototype.o, Th.createFromModelPath = function (t, e) {
  return Ha(Th, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Th.createFromModelBuffer = function (t, e) {
  return Ha(Th, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Th.createFromOptions = function (t, e) {
  return Ha(Th, t, e);
};
var Ah = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "image_in", "norm_rect", !0), this.h = new uo(), this.embeddings = {
      embeddings: []
    }, kn(t = this.h, 0, 1, e = new bi());
  }
  get baseOptions() {
    return Tn(this.h, bi, 1);
  }
  set baseOptions(t) {
    kn(this.h, 0, 1, t);
  }
  o(t) {
    var e = this.h,
      n = Tn(this.h, _i, 2);
    return n = n ? n.clone() : new _i(), void 0 !== t.l2Normalize ? On(n, 1, t.l2Normalize) : "l2Normalize" in t && rn(n, 1), void 0 !== t.quantize ? On(n, 2, t.quantize) : "quantize" in t && rn(n, 2), kn(e, 0, 2, n), this.l(t);
  }
  Ba(t, e) {
    return za(this, t, e), this.embeddings;
  }
  Ca(t, e, n) {
    return Ka(this, t, n, e), this.embeddings;
  }
  m() {
    var t = new Ls();
    xs(t, "image_in"), xs(t, "norm_rect"), Ss(t, "embeddings_out");
    const e = new hs();
    Dn(e, lo, this.h);
    const n = new vs();
    ms(n, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), ys(n, "IMAGE:image_in"), ys(n, "NORM_RECT:norm_rect"), _s(n, "EMBEDDINGS:embeddings_out"), n.o(e), ks(t, n), this.g.attachProtoListener("embeddings_out", (t, e) => {
      t = gi(t), this.embeddings = function (t) {
        return {
          embeddings: bn(t, li, 1).map(t => {
            const e = {
              headIndex: Mn(Fn(t, 3)) ?? -1,
              headName: Rn(t, 4) ?? "" ?? ""
            };
            if (void 0 !== wn(t, ci, _n(t, 1))) t = cn(t = Tn(t, ci, _n(t, 1)), 1, fe), e.floatEmbedding = t.slice();else {
              const n = new Uint8Array(0);
              e.quantizedEmbedding = Tn(t, ui, _n(t, 2))?.qa()?.h() ?? n;
            }
            return e;
          }),
          timestampMs: Mn(Ae(en(t, 2)))
        };
      }(t), zo(this, e);
    }), this.g.attachEmptyPacketListener("embeddings_out", t => {
      zo(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ImageEmbedder = Ah;
Ah.cosineSimilarity = function (t, e) {
  if (t.floatEmbedding && e.floatEmbedding) t = Fo(t.floatEmbedding, e.floatEmbedding);else {
    if (!t.quantizedEmbedding || !e.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
    t = Fo(Lo(t.quantizedEmbedding), Lo(e.quantizedEmbedding));
  }
  return t;
}, Ah.prototype.embedForVideo = Ah.prototype.Ca, Ah.prototype.embed = Ah.prototype.Ba, Ah.prototype.setOptions = Ah.prototype.o, Ah.createFromModelPath = function (t, e) {
  return Ha(Ah, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Ah.createFromModelBuffer = function (t, e) {
  return Ha(Ah, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Ah.createFromOptions = function (t, e) {
  return Ha(Ah, t, e);
};
var bh = class {
  constructor(t, e, n) {
    this.confidenceMasks = t, this.categoryMask = e, this.qualityScores = n;
  }
  close() {
    this.confidenceMasks?.forEach(t => {
      t.close();
    }), this.categoryMask?.close();
  }
};
exports.ImageSegmenterResult = bh;
function kh(t) {
  t.categoryMask = void 0, t.confidenceMasks = void 0, t.qualityScores = void 0;
}
function xh(t) {
  try {
    const e = new bh(t.confidenceMasks, t.categoryMask, t.qualityScores);
    if (!t.j) return e;
    t.j(e);
  } finally {
    $o(t);
  }
}
bh.prototype.close = bh.prototype.close;
var Sh = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "image_in", "norm_rect", !1), this.s = [], this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new yo(), this.v = new fo(), kn(this.h, 0, 3, this.v), kn(t = this.h, 0, 1, e = new bi());
  }
  get baseOptions() {
    return Tn(this.h, bi, 1);
  }
  set baseOptions(t) {
    kn(this.h, 0, 1, t);
  }
  o(t) {
    return void 0 !== t.displayNamesLocale ? rn(this.h, 2, ke(t.displayNamesLocale)) : "displayNamesLocale" in t && rn(this.h, 2), "outputCategoryMask" in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1), "outputConfidenceMasks" in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0), super.l(t);
  }
  K() {
    !function (t) {
      const e = bn(t.fa(), vs, 1).filter(t => (Rn(t, 1) ?? "").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));
      if (t.s = [], 1 < e.length) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
      1 === e.length && (Tn(e[0], hs, 7)?.l()?.g() ?? new Map()).forEach((e, n) => {
        t.s[Number(n)] = Rn(e, 1) ?? "";
      });
    }(this);
  }
  ga(t, e, n) {
    const r = "function" != typeof e ? e : {};
    return this.j = "function" == typeof e ? e : n, kh(this), za(this, t, r), xh(this);
  }
  Na(t, e, n, r) {
    const s = "function" != typeof n ? n : {};
    return this.j = "function" == typeof n ? n : r, kh(this), Ka(this, t, s, e), xh(this);
  }
  Fa() {
    return this.s;
  }
  m() {
    var t = new Ls();
    xs(t, "image_in"), xs(t, "norm_rect");
    const e = new hs();
    Dn(e, _o, this.h);
    const n = new vs();
    ms(n, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), ys(n, "IMAGE:image_in"), ys(n, "NORM_RECT:norm_rect"), n.o(e), ks(t, n), Ko(this, t), this.outputConfidenceMasks && (Ss(t, "confidence_masks"), _s(n, "CONFIDENCE_MASKS:confidence_masks"), Yo(this, "confidence_masks"), this.g.da("confidence_masks", (t, e) => {
      this.confidenceMasks = t.map(t => Ya(this, t, !0, !this.j)), zo(this, e);
    }), this.g.attachEmptyPacketListener("confidence_masks", t => {
      this.confidenceMasks = [], zo(this, t);
    })), this.outputCategoryMask && (Ss(t, "category_mask"), _s(n, "CATEGORY_MASK:category_mask"), Yo(this, "category_mask"), this.g.W("category_mask", (t, e) => {
      this.categoryMask = Ya(this, t, !1, !this.j), zo(this, e);
    }), this.g.attachEmptyPacketListener("category_mask", t => {
      this.categoryMask = void 0, zo(this, t);
    })), Ss(t, "quality_scores"), _s(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", (t, e) => {
      this.qualityScores = t, zo(this, e);
    }), this.g.attachEmptyPacketListener("quality_scores", t => {
      this.categoryMask = void 0, zo(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ImageSegmenter = Sh;
Sh.prototype.getLabels = Sh.prototype.Fa, Sh.prototype.segmentForVideo = Sh.prototype.Na, Sh.prototype.segment = Sh.prototype.ga, Sh.prototype.setOptions = Sh.prototype.o, Sh.createFromModelPath = function (t, e) {
  return Ha(Sh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Sh.createFromModelBuffer = function (t, e) {
  return Ha(Sh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Sh.createFromOptions = function (t, e) {
  return Ha(Sh, t, e);
};
var Lh = class {
  constructor(t, e, n) {
    this.confidenceMasks = t, this.categoryMask = e, this.qualityScores = n;
  }
  close() {
    this.confidenceMasks?.forEach(t => {
      t.close();
    }), this.categoryMask?.close();
  }
};
exports.InteractiveSegmenterResult = Lh;
Lh.prototype.close = Lh.prototype.close;
var Fh = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Rh = [0, Pr, -2],
  Mh = [0, kr, -3, Ir],
  Ph = [0, kr, -3, Ir, kr, -1],
  Oh = [0, Ph],
  Ch = [0, Oh, Rh],
  Ih = [0, Ph, Rh],
  Dh = [0, Ph, Pr, -1],
  Nh = [0, Dh, Rh],
  Uh = [0, kr, -3, Ir, Rh, -1],
  Bh = [0, kr, -3, Ir, Wr],
  Gh = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  jh = [0, kr, -1, Ir],
  Vh = class extends Nn {
    constructor() {
      super();
    }
  };
Vh.A = [1];
var Xh = class extends Nn {
    constructor(t) {
      super(t);
    }
  },
  Hh = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15],
  Wh = [0, Hh, Vr, Ph, Vr, Ih, Vr, Oh, Vr, Ch, Vr, jh, Vr, Bh, Vr, Mh, Vr, [0, Br, kr, -2, Ir, Pr, Ir, -1, 2, kr, Rh], Vr, Dh, Vr, Nh, kr, Rh, Br, Vr, Uh, Vr, [0, br, jh]],
  zh = [0, Br, Pr, -1, Ir],
  Kh = class extends Nn {
    constructor() {
      super();
    }
  };
Kh.A = [1], Kh.prototype.g = qr([0, br, Wh, Br, zh]);
var Yh = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "image_in", "norm_rect_in", !1), this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new yo(), this.s = new fo(), kn(this.h, 0, 3, this.s), kn(t = this.h, 0, 1, e = new bi());
  }
  get baseOptions() {
    return Tn(this.h, bi, 1);
  }
  set baseOptions(t) {
    kn(this.h, 0, 1, t);
  }
  o(t) {
    return "outputCategoryMask" in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1), "outputConfidenceMasks" in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0), super.l(t);
  }
  ga(t, e, n, r) {
    const s = "function" != typeof n ? n : {};
    this.j = "function" == typeof n ? n : r, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, n = this.C + 1, r = new Kh();
    const i = new Xh();
    var o = new Fh();
    if (Cn(o, 1, 255), kn(i, 0, 12, o), e.keypoint && e.scribble) throw Error("Cannot provide both keypoint and scribble.");
    if (e.keypoint) {
      var a = new Gh();
      On(a, 3, !0), In(a, 1, e.keypoint.x), In(a, 2, e.keypoint.y), xn(i, 5, Hh, a);
    } else {
      if (!e.scribble) throw Error("Must provide either a keypoint or a scribble.");
      for (a of (o = new Vh(), e.scribble)) On(e = new Gh(), 3, !0), In(e, 1, a.x), In(e, 2, a.y), Ln(o, 1, Gh, e);
      xn(i, 15, Hh, o);
    }
    Ln(r, 1, Xh, i), this.g.addProtoToStream(r.g(), "drishti.RenderData", "roi_in", n), za(this, t, s);
    t: {
      try {
        const t = new Lh(this.confidenceMasks, this.categoryMask, this.qualityScores);
        if (!this.j) {
          var h = t;
          break t;
        }
        this.j(t);
      } finally {
        $o(this);
      }
      h = void 0;
    }
    return h;
  }
  m() {
    var t = new Ls();
    xs(t, "image_in"), xs(t, "roi_in"), xs(t, "norm_rect_in");
    const e = new hs();
    Dn(e, _o, this.h);
    const n = new vs();
    ms(n, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"), ys(n, "IMAGE:image_in"), ys(n, "ROI:roi_in"), ys(n, "NORM_RECT:norm_rect_in"), n.o(e), ks(t, n), Ko(this, t), this.outputConfidenceMasks && (Ss(t, "confidence_masks"), _s(n, "CONFIDENCE_MASKS:confidence_masks"), Yo(this, "confidence_masks"), this.g.da("confidence_masks", (t, e) => {
      this.confidenceMasks = t.map(t => Ya(this, t, !0, !this.j)), zo(this, e);
    }), this.g.attachEmptyPacketListener("confidence_masks", t => {
      this.confidenceMasks = [], zo(this, t);
    })), this.outputCategoryMask && (Ss(t, "category_mask"), _s(n, "CATEGORY_MASK:category_mask"), Yo(this, "category_mask"), this.g.W("category_mask", (t, e) => {
      this.categoryMask = Ya(this, t, !1, !this.j), zo(this, e);
    }), this.g.attachEmptyPacketListener("category_mask", t => {
      this.categoryMask = void 0, zo(this, t);
    })), Ss(t, "quality_scores"), _s(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", (t, e) => {
      this.qualityScores = t, zo(this, e);
    }), this.g.attachEmptyPacketListener("quality_scores", t => {
      this.categoryMask = void 0, zo(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.InteractiveSegmenter = Yh;
Yh.prototype.segment = Yh.prototype.ga, Yh.prototype.setOptions = Yh.prototype.o, Yh.createFromModelPath = function (t, e) {
  return Ha(Yh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Yh.createFromModelBuffer = function (t, e) {
  return Ha(Yh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Yh.createFromOptions = function (t, e) {
  return Ha(Yh, t, e);
};
var $h = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "input_frame_gpu", "norm_rect", !1), this.j = {
      detections: []
    }, kn(t = this.h = new vo(), 0, 1, e = new bi());
  }
  get baseOptions() {
    return Tn(this.h, bi, 1);
  }
  set baseOptions(t) {
    kn(this.h, 0, 1, t);
  }
  o(t) {
    return void 0 !== t.displayNamesLocale ? rn(this.h, 2, ke(t.displayNamesLocale)) : "displayNamesLocale" in t && rn(this.h, 2), void 0 !== t.maxResults ? Cn(this.h, 3, t.maxResults) : "maxResults" in t && rn(this.h, 3), void 0 !== t.scoreThreshold ? In(this.h, 4, t.scoreThreshold) : "scoreThreshold" in t && rn(this.h, 4), void 0 !== t.categoryAllowlist ? pn(this.h, 5, t.categoryAllowlist) : "categoryAllowlist" in t && rn(this.h, 5), void 0 !== t.categoryDenylist ? pn(this.h, 6, t.categoryDenylist) : "categoryDenylist" in t && rn(this.h, 6), this.l(t);
  }
  F(t, e) {
    return this.j = {
      detections: []
    }, za(this, t, e), this.j;
  }
  G(t, e, n) {
    return this.j = {
      detections: []
    }, Ka(this, t, n, e), this.j;
  }
  m() {
    var t = new Ls();
    xs(t, "input_frame_gpu"), xs(t, "norm_rect"), Ss(t, "detections");
    const e = new hs();
    Dn(e, Eo, this.h);
    const n = new vs();
    ms(n, "mediapipe.tasks.vision.ObjectDetectorGraph"), ys(n, "IMAGE:input_frame_gpu"), ys(n, "NORM_RECT:norm_rect"), _s(n, "DETECTIONS:detections"), n.o(e), ks(t, n), this.g.attachProtoVectorListener("detections", (t, e) => {
      for (const e of t) t = Ks(e), this.j.detections.push(ko(t));
      zo(this, e);
    }), this.g.attachEmptyPacketListener("detections", t => {
      zo(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ObjectDetector = $h;
$h.prototype.detectForVideo = $h.prototype.G, $h.prototype.detect = $h.prototype.F, $h.prototype.setOptions = $h.prototype.o, $h.createFromModelPath = async function (t, e) {
  return Ha($h, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, $h.createFromModelBuffer = function (t, e) {
  return Ha($h, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, $h.createFromOptions = function (t, e) {
  return Ha($h, t, e);
};
var qh = class {
  constructor(t, e, n) {
    this.landmarks = t, this.worldLandmarks = e, this.segmentationMasks = n;
  }
  close() {
    this.segmentationMasks?.forEach(t => {
      t.close();
    });
  }
};
function Jh(t) {
  t.landmarks = [], t.worldLandmarks = [], t.segmentationMasks = void 0;
}
function Zh(t) {
  try {
    const e = new qh(t.landmarks, t.worldLandmarks, t.segmentationMasks);
    if (!t.s) return e;
    t.s(e);
  } finally {
    $o(t);
  }
}
qh.prototype.close = qh.prototype.close;
var Qh = class extends $a {
  constructor(t, e) {
    super(new Xa(t, e), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = !1, kn(t = this.h = new wo(), 0, 1, e = new bi()), this.v = new io(), kn(this.h, 0, 3, this.v), this.j = new ro(), kn(this.h, 0, 2, this.j), Cn(this.j, 4, 1), In(this.j, 2, .5), In(this.v, 2, .5), In(this.h, 4, .5);
  }
  get baseOptions() {
    return Tn(this.h, bi, 1);
  }
  set baseOptions(t) {
    kn(this.h, 0, 1, t);
  }
  o(t) {
    return "numPoses" in t && Cn(this.j, 4, t.numPoses ?? 1), "minPoseDetectionConfidence" in t && In(this.j, 2, t.minPoseDetectionConfidence ?? .5), "minTrackingConfidence" in t && In(this.h, 4, t.minTrackingConfidence ?? .5), "minPosePresenceConfidence" in t && In(this.v, 2, t.minPosePresenceConfidence ?? .5), "outputSegmentationMasks" in t && (this.outputSegmentationMasks = t.outputSegmentationMasks ?? !1), this.l(t);
  }
  F(t, e, n) {
    const r = "function" != typeof e ? e : {};
    return this.s = "function" == typeof e ? e : n, Jh(this), za(this, t, r), Zh(this);
  }
  G(t, e, n, r) {
    const s = "function" != typeof n ? n : {};
    return this.s = "function" == typeof n ? n : r, Jh(this), Ka(this, t, s, e), Zh(this);
  }
  m() {
    var t = new Ls();
    xs(t, "image_in"), xs(t, "norm_rect"), Ss(t, "normalized_landmarks"), Ss(t, "world_landmarks"), Ss(t, "segmentation_masks");
    const e = new hs();
    Dn(e, To, this.h);
    const n = new vs();
    ms(n, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), ys(n, "IMAGE:image_in"), ys(n, "NORM_RECT:norm_rect"), _s(n, "NORM_LANDMARKS:normalized_landmarks"), _s(n, "WORLD_LANDMARKS:world_landmarks"), n.o(e), ks(t, n), Ko(this, t), this.g.attachProtoVectorListener("normalized_landmarks", (t, e) => {
      this.landmarks = [];
      for (const e of t) t = ei(e), this.landmarks.push(xo(t));
      zo(this, e);
    }), this.g.attachEmptyPacketListener("normalized_landmarks", t => {
      this.landmarks = [], zo(this, t);
    }), this.g.attachProtoVectorListener("world_landmarks", (t, e) => {
      this.worldLandmarks = [];
      for (const e of t) t = Js(e), this.worldLandmarks.push(So(t));
      zo(this, e);
    }), this.g.attachEmptyPacketListener("world_landmarks", t => {
      this.worldLandmarks = [], zo(this, t);
    }), this.outputSegmentationMasks && (_s(n, "SEGMENTATION_MASK:segmentation_masks"), Yo(this, "segmentation_masks"), this.g.da("segmentation_masks", (t, e) => {
      this.segmentationMasks = t.map(t => Ya(this, t, !0, !this.s)), zo(this, e);
    }), this.g.attachEmptyPacketListener("segmentation_masks", t => {
      this.segmentationMasks = [], zo(this, t);
    })), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.PoseLandmarker = Qh;
Qh.prototype.detectForVideo = Qh.prototype.G, Qh.prototype.detect = Qh.prototype.F, Qh.prototype.setOptions = Qh.prototype.o, Qh.createFromModelPath = function (t, e) {
  return Ha(Qh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Qh.createFromModelBuffer = function (t, e) {
  return Ha(Qh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Qh.createFromOptions = function (t, e) {
  return Ha(Qh, t, e);
}, Qh.POSE_CONNECTIONS = yh;
},{}],"K0kV":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FACE_FEATURE_NOSE = exports.FACE_LANDMARKS_NOSE = exports.FACE_FEATURE_RIGHT_EYEBROW = exports.FACE_FEATURE_RIGHT_EYE = exports.FACE_FEATURE_LEFT_EYEBROW = exports.FACE_FEATURE_LEFT_EYE = exports.FACE_FEATURE_LIPS = exports.findNeighbourPointIds = exports.Connection = void 0;
var tasks_vision_1 = require("@mediapipe/tasks-vision");
/**
 * Represents a connection between two points.
 */
var Connection = /*#__PURE__*/_createClass(
/**
 * Creates a new Connection instance.
 * @param {number} start - The ID of the starting point.
 * @param {number} end - The ID of the ending point.
 */
function Connection(start, end) {
  _classCallCheck(this, Connection);
  this.start = start;
  this.end = end;
});
exports.Connection = Connection;
/**
 * Converts an array of connections (given as pairs of start and end point IDs) into an array of Connection instances.
 * @param {...number[][]} connections - Arrays of start and end point IDs.
 * @returns {Connection[]} - An array of Connection instances.
 */
function convertToConnections() {
  for (var _len = arguments.length, connections = new Array(_len), _key = 0; _key < _len; _key++) {
    connections[_key] = arguments[_key];
  }
  return connections.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      start = _ref2[0],
      end = _ref2[1];
    return new Connection(start, end);
  });
}
/**
 * Finds neighboring point IDs recursively up to a specified depth.
 * @param {number} pointId - The ID of the starting point.
 * @param {Connection[]} connections - An array of connections.
 * @param {number} depth - The depth of neighbor search.
 * @returns {number[]} - An array of unique neighboring point IDs.
 */
function findNeighbourPointIds(pointId, connections, depth) {
  if (depth === 0) {
    return Array.from(new Set([pointId]));
  }
  var neighbours = connections.filter(function (conn) {
    return conn.start === pointId || conn.end === pointId;
  }).map(function (conn) {
    return conn.start === pointId ? conn.end : conn.start;
  });
  var neighbourIds = new Set(neighbours);
  var _iterator = _createForOfIteratorHelper(neighbours),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var neighbour = _step.value;
      var subNeighbours = findNeighbourPointIds(neighbour, connections, depth - 1);
      var _iterator2 = _createForOfIteratorHelper(subNeighbours),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var subNeighbour = _step2.value;
          neighbourIds.add(subNeighbour);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return Array.from(neighbourIds);
}
exports.findNeighbourPointIds = findNeighbourPointIds;
/**
 * Array of unique face feature point IDs related to lips.
 */
exports.FACE_FEATURE_LIPS = Array.from(new Set(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LIPS.map(function (con) {
  return con.start;
}).concat([62, 76, 184, 183, 42, 74, 41, 73, 38, 72, 12, 11, 268, 302, 271, 303, 272, 304, 407, 408, 292, 306, 325, 307, 319, 320, 403, 404, 316, 315, 15, 16, 86, 85, 179, 180, 89, 90, 96, 77, 291, 308])));
/**
 * Array of unique face feature point IDs related to the left eye.
 */
exports.FACE_FEATURE_LEFT_EYE = Array.from(new Set(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE.map(function (con) {
  return con.start;
}).concat(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE.map(function (con) {
  return con.end;
})).concat(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS.map(function (con) {
  return con.start;
}).concat(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS.map(function (con) {
  return con.end;
})))));
/**
 * Array of unique face feature point IDs related to the left eyebrow.
 */
exports.FACE_FEATURE_LEFT_EYEBROW = Array.from(new Set(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW.map(function (con) {
  return con.start;
}).concat(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW.map(function (con) {
  return con.end;
}))));
/**
 * Array of unique face feature point IDs related to the right eye.
 */
exports.FACE_FEATURE_RIGHT_EYE = Array.from(new Set(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE.map(function (con) {
  return con.start;
}).concat(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE.map(function (con) {
  return con.end;
})).concat(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS.map(function (con) {
  return con.start;
}).concat(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS.map(function (con) {
  return con.end;
})))));
/**
 * Array of unique face feature point IDs related to the right eyebrow.
 */
exports.FACE_FEATURE_RIGHT_EYEBROW = Array.from(new Set(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW.map(function (con) {
  return con.start;
}).concat(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW.map(function (con) {
  return con.end;
}))));
/**
 * Array of unique face landmark point IDs related to the nose.
 */
exports.FACE_LANDMARKS_NOSE = convertToConnections([2, 97], [97, 98], [98, 64], [64, 48], [48, 115], [115, 220], [220, 45], [45, 4], [4, 275], [275, 440], [440, 344], [344, 278], [278, 294], [294, 327], [327, 326], [326, 2], [2, 19], [19, 1], [1, 4], [4, 5], [5, 195], [195, 197], [197, 6], [6, 168]);
/**
 * Array of unique face feature point IDs related to the nose.
 */
exports.FACE_FEATURE_NOSE = Array.from(new Set(exports.FACE_LANDMARKS_NOSE.map(function (con) {
  return con.start;
}).concat(exports.FACE_LANDMARKS_NOSE.map(function (con) {
  return con.end;
})).concat([102, 49, 209, 217, 174, 196, 6, 419, 399, 437, 429, 279, 331, 198, 131, 134, 236, 3, 51, 248, 281, 456, 363, 420, 360, 94, 141, 125, 44, 237, 239, 238, 241, 242, 99, 60, 75, 240, 235, 59, 166, 219, 79, 218, 370, 354, 274, 457, 438, 439, 455, 460, 328, 462, 461, 250, 458, 290, 305, 289, 392, 309, 459, 20])));
},{"@mediapipe/tasks-vision":"J3Gj"}],"rUEc":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor2D = void 0;
var point2d_1 = require("./graph/point2d");
var perspective2d_1 = require("./graph/perspective2d");
var graph_1 = require("./graph/graph");
var tasks_vision_1 = require("@mediapipe/tasks-vision");
var face_landmarks_features_1 = require("./graph/face_landmarks_features");
var COLOR_POINT_HOVERED = 'rgba(255,250,163,0.6)';
var COLOR_POINT_SELECTED = 'rgba(255,250,58,0.6)';
var COLOR_POINT_DEFAULT = '#0d6efd';
var COLOR_EDGES_TESSELATION = '#d5d5d5';
var COLOR_EDGES_FACE_OVAL = '#42ffef';
var COLOR_EDGES_LIPS = '#ff0883';
var COLOR_EDGES_RIGHT_EYE = '#b3ff42';
var COLOR_EDGES_RIGHT_IRIS = '#efffd8';
var COLOR_EDGES_LEFT_EYE = '#42c6ff';
var COLOR_EDGES_LEFT_IRIS = '#b5ebff';
var COLOR_EDGES_NOSE = '#eada70';
var LINE_WIDTH_DEFAULT = 2;
var POINT_WIDTH = 3;
var POINT_EXTENDED_WIDTH = 5;
var Editor2D = /*#__PURE__*/function () {
  function Editor2D() {
    var _this = this;
    _classCallCheck(this, Editor2D);
    this.zoomScale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isMoving = false;
    this.isPanning = false;
    this.image = new Image();
    this.onPointsEditedCallback = null;
    this._dragDepth = 0;
    this._graph = new graph_1.Graph([]);
    this._showTesselation = false;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    // Size canvas
    this.clearAndFitToWindow();
    // Register event listeners
    this.canvas.addEventListener('mousedown', function (ev) {
      return _this.handleMouseDown(ev);
    });
    this.canvas.addEventListener('mousemove', function (ev) {
      return _this.handleMouseMove(ev);
    });
    this.canvas.addEventListener('mouseup', function (ev) {
      return _this.handleMouseUp(ev);
    });
    this.canvas.addEventListener('wheel', function (ev) {
      return _this.handleWheel(ev);
    });
    this.canvas.addEventListener('mouseout', function (ev) {
      return _this.handleMouseUp(ev);
    });
  }
  return _createClass(Editor2D, [{
    key: "dragDepth",
    get: function get() {
      return this._dragDepth;
    },
    set: function set(value) {
      this._dragDepth = value;
    }
  }, {
    key: "graph",
    get: function get() {
      return this._graph;
    },
    set: function set(value) {
      if (value) {
        this._graph = value.clone();
        this.draw();
      }
    }
  }, {
    key: "showTesselation",
    get: function get() {
      return this._showTesselation;
    },
    set: function set(value) {
      this._showTesselation = value;
      this.draw();
    }
  }, {
    key: "setOnBackgroundLoadedCallback",
    value: function setOnBackgroundLoadedCallback(callback) {
      var _this2 = this;
      this.image.onload = function (_) {
        return callback(_this2.image);
      };
    }
  }, {
    key: "setBackgroundSource",
    value: function setBackgroundSource(source) {
      var _this3 = this;
      var reader = new FileReader();
      reader.onload = function (_) {
        var result = reader.result;
        if (result) {
          _this3.image.src = result.toString();
        }
      };
      reader.readAsDataURL(source);
    }
  }, {
    key: "getBackgroundImage",
    value: function getBackgroundImage() {
      return this.image;
    }
  }, {
    key: "setOnPointsEditedCallback",
    value: function setOnPointsEditedCallback(callback) {
      this.onPointsEditedCallback = callback;
    }
  }, {
    key: "clearAndFitToWindow",
    value: function clearAndFitToWindow() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }, {
    key: "center",
    value: function center() {
      var scaleX = this.canvas.width / this.image.width;
      var scaleY = this.canvas.height / this.image.height;
      this.zoomScale = scaleX < scaleY ? scaleX : scaleY;
      this.offsetX = this.canvas.width / 2 - this.image.width / 2 * this.zoomScale;
      this.offsetY = this.canvas.height / 2 - this.image.height / 2 * this.zoomScale;
      // Redraw
      this.draw();
    }
  }, {
    key: "zoom",
    value: function zoom(out) {
      var dx = (this.mouseX - this.offsetX) / this.zoomScale;
      var dy = (this.mouseY - this.offsetY) / this.zoomScale;
      if (out) {
        this.canvas.style.cursor = "zoom-out";
        this.zoomScale /= 1.1;
      } else {
        this.canvas.style.cursor = "zoom-in";
        this.zoomScale *= 1.1;
      }
      // Ensure zoom level is within a reasonable range
      this.zoomScale = Math.min(Math.max(0.1, this.zoomScale), 50);
      // Update offsets
      this.offsetX = this.mouseX - dx * this.zoomScale;
      this.offsetY = this.mouseY - dy * this.zoomScale;
      // Redraw
      this.draw();
    }
  }, {
    key: "pan",
    value: function pan(deltaX, deltaY) {
      this.canvas.style.cursor = "move";
      // update offsets
      this.offsetX += deltaX;
      this.offsetY += deltaY;
      // Redraw
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      this.clearAndFitToWindow();
      // Set Transformations
      this.ctx.translate(this.offsetX, this.offsetY);
      this.ctx.scale(this.zoomScale, this.zoomScale);
      // Draw Background
      this.ctx.drawImage(this.image, 0, 0);
      // Draw Mesh
      if (this.showTesselation) {
        this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_TESSELATION, COLOR_EDGES_TESSELATION);
      }
      this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, COLOR_EDGES_FACE_OVAL);
      this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LIPS, COLOR_EDGES_LIPS);
      this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, COLOR_EDGES_RIGHT_EYE);
      this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, COLOR_EDGES_RIGHT_EYE);
      this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, COLOR_EDGES_RIGHT_IRIS);
      this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, COLOR_EDGES_LEFT_EYE);
      this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, COLOR_EDGES_LEFT_EYE);
      this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, COLOR_EDGES_LEFT_IRIS);
      this.drawFaceTrait(face_landmarks_features_1.FACE_LANDMARKS_NOSE, COLOR_EDGES_NOSE);
    }
  }, {
    key: "drawPoint",
    value: function drawPoint(point) {
      if (point && !point.deleted) {
        var projectedPoint = perspective2d_1.Perspective2D.project(this.image, point);
        if (point.hovered) {
          this.ctx.beginPath();
          this.ctx.fillStyle = COLOR_POINT_HOVERED;
          this.ctx.arc(projectedPoint.x, projectedPoint.y, POINT_EXTENDED_WIDTH / this.zoomScale, 0, Math.PI * 2);
          // this.ctx.font = 20 / zoomScale + "px serif";
          // this.ctx.fillText(point.getId(), projectedPoint.x, projectedPoint.y);
          this.ctx.fill();
        }
        if (point.selected) {
          this.ctx.beginPath();
          this.ctx.fillStyle = COLOR_POINT_SELECTED;
          this.ctx.arc(projectedPoint.x, projectedPoint.y, POINT_EXTENDED_WIDTH / this.zoomScale, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.beginPath();
        this.ctx.fillStyle = COLOR_POINT_DEFAULT;
        this.ctx.arc(projectedPoint.x, projectedPoint.y, POINT_WIDTH / this.zoomScale, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }, {
    key: "drawFaceTrait",
    value: function drawFaceTrait(connections, color) {
      var _this4 = this;
      if (this.graph) {
        var pointPairs = connections.map(function (connection) {
          return {
            start: _this4.graph.getById(connection.start),
            end: _this4.graph.getById(connection.end)
          };
        });
        // Draw edges
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = LINE_WIDTH_DEFAULT / this.zoomScale;
        var _iterator = _createForOfIteratorHelper(pointPairs),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var connection = _step.value;
            var startPoint = connection.start;
            var endPoint = connection.end;
            if (startPoint && endPoint && !startPoint.deleted && !endPoint.deleted) {
              startPoint = perspective2d_1.Perspective2D.project(this.image, startPoint);
              endPoint = perspective2d_1.Perspective2D.project(this.image, endPoint);
              this.ctx.moveTo(startPoint.x, startPoint.y);
              this.ctx.lineTo(endPoint.x, endPoint.y);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.ctx.stroke();
        // Draw points
        var _iterator2 = _createForOfIteratorHelper(pointPairs),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _connection = _step2.value;
            var _startPoint = _connection.start;
            var _endPoint = _connection.end;
            this.drawPoint(_startPoint);
            this.drawPoint(_endPoint);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      var _this5 = this;
      // Check if any normalized 3D point is clicked
      if (event.button === 0) {
        // left button
        this._graph.points.filter(function (p) {
          return p.hovered && !p.deleted;
        }).forEach(function (p) {
          p.selected = true;
          _this5.isMoving = true;
        });
      } else if (event.button === 1) {
        // wheel button
        this.isPanning = true;
      }
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      var _this6 = this;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      var relativeMouseX = (this.mouseX - this.offsetX) / this.zoomScale;
      var relativeMouseY = (this.mouseY - this.offsetY) / this.zoomScale;
      if (this.isMoving) {
        this.canvas.style.cursor = "pointer";
        // Update normalized coordinates based on mouse position
        var alreadyUpdated = new Set();
        var relativeMouse = perspective2d_1.Perspective2D.unproject(this.image, new point2d_1.Point2D(-1, relativeMouseX, relativeMouseY, []));
        var selectedPoint = this.graph.getSelected();
        var neighbourPoints = [selectedPoint];
        var deltaX = relativeMouse.x - selectedPoint.x;
        var deltaY = relativeMouse.y - selectedPoint.y;
        for (var depth = 0; depth <= this.dragDepth; depth++) {
          // Go through each depth step
          var tmpPoints = [];
          var _iterator3 = _createForOfIteratorHelper(neighbourPoints),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var neigP = _step3.value;
              var influenceFactor = Math.exp(-depth);
              var newX = neigP.x + deltaX * influenceFactor;
              var newY = neigP.y + deltaY * influenceFactor;
              var newPoint = new point2d_1.Point2D(-1, newX, newY, []);
              neigP.moveTo(newPoint);
              alreadyUpdated.add(neigP.id);
              // extract next depth of neighbours
              // @ts-ignore
              tmpPoints = tmpPoints.concat(this.graph.getNeighbourPointsOf(neigP));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          neighbourPoints = tmpPoints.filter(function (p) {
            return !alreadyUpdated.has(p.id);
          });
        }
        // Redraw
        this.draw();
      } else if (this.isPanning) {
        this.pan(this.mouseX - this.prevMouseX, this.mouseY - this.prevMouseY);
      } else if (this.image) {
        var pointHover = false;
        var _relativeMouse = perspective2d_1.Perspective2D.unproject(this.image, new point2d_1.Point2D(-1, relativeMouseX, relativeMouseY, []));
        this._graph.points.forEach(function (point) {
          if (!pointHover && perspective2d_1.Perspective2D.intersects(_this6.image, point, _relativeMouse, POINT_EXTENDED_WIDTH / _this6.zoomScale)) {
            point.hovered = true;
            pointHover = true;
          } else {
            pointHover || (pointHover = point.hovered); // Also update if one point gets un-hovered!
            point.hovered = false;
          }
        });
        if (pointHover) {
          this.draw();
        }
      }
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(_) {
      if (this.isMoving && this.onPointsEditedCallback) {
        this.onPointsEditedCallback(this._graph);
      }
      this.canvas.style.cursor = "default";
      this.isPanning = false;
      this.isMoving = false;
      this._graph.points.forEach(function (point) {
        return point.selected = false;
      });
    }
  }, {
    key: "handleWheel",
    value: function handleWheel(event) {
      if (this.image && !event.shiftKey) {
        this.zoom(event.deltaY > 0);
        event.preventDefault();
      }
    }
  }]);
}();
exports.Editor2D = Editor2D;
},{"./graph/point2d":"gDGJ","./graph/perspective2d":"n8rv","./graph/graph":"V4e4","@mediapipe/tasks-vision":"J3Gj","./graph/face_landmarks_features":"K0kV"}],"KpWr":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point3D = void 0;
var point2d_1 = require("./point2d");
/**
 * Represents a 3D point with an ID, coordinates, and neighbor information.
 * Extends the base class Point2D.
 */
var Point3D = /*#__PURE__*/function (_point2d_1$Point2D) {
  /**
   * Creates a new Point3D instance.
   * @param {number} id - The unique identifier for the point.
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   * @param {number} z - The z-coordinate of the point (additional dimension).
   * @param {number[]} neighbourIds - An array of neighbor IDs.
   */
  function Point3D(id, x, y, z, neighbourIds) {
    var _this;
    _classCallCheck(this, Point3D);
    _this = _callSuper(this, Point3D, [id, x, y, neighbourIds]);
    _this._z = z;
    return _this;
  }
  /**
   * Gets or sets the z-coordinate of the point.
   * @returns {number} - The z-coordinate.
   */
  _inherits(Point3D, _point2d_1$Point2D);
  return _createClass(Point3D, [{
    key: "z",
    get: function get() {
      return this._z;
    },
    set: function set(value) {
      this._z = value;
    }
    /**
     * Returns a string representation of the 3D point.
     * @returns {string} - A formatted string with point details.
     */
  }, {
    key: "toString",
    value: function toString() {
      return "Point3D(id=".concat(this.id, ", x=").concat(this.x, ", y=").concat(this.y, ", z=").concat(this.z, ")");
    }
    /**
     * Creates a shallow copy of the 3D point.
     * @returns {Point3D} - A new Point3D instance with cloned properties.
     */
  }, {
    key: "clone",
    value: function clone() {
      var copy = new Point3D(this.id, this.x, this.y, this.z, this.getNeighbourIds());
      copy.hovered = this.hovered;
      copy.deleted = this.deleted;
      copy.selected = this.selected;
      return copy;
    }
    /**
     * Converts the point to a dictionary object.
     * @returns {object} - A dictionary containing point properties.
     */
  }, {
    key: "toDict",
    value: function toDict() {
      return {
        id: this.id,
        x: this.x,
        y: this.y,
        z: this.z,
        // hovered: this.hovered,
        deleted: this.deleted
      };
    }
  }]);
}(point2d_1.Point2D);
exports.Point3D = Point3D;
},{"./point2d":"gDGJ"}],"MWsf":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediapipeModel = void 0;
var graph_1 = require("../graph/graph");
var face_landmarks_features_1 = require("../graph/face_landmarks_features");
var tasks_vision_1 = require("@mediapipe/tasks-vision");
var point3d_1 = require("../graph/point3d");
/**
 * Represents a model using MediaPipe for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
var MediapipeModel = /*#__PURE__*/function () {
  /**
   * Creates a new MediapipeModel instance.
   */
  function MediapipeModel() {
    var _this = this;
    _classCallCheck(this, MediapipeModel);
    tasks_vision_1.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm").then(function (filesetResolver) {
      return tasks_vision_1.FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          // When adding user model of same type -> modelAssetBuffer
          delegate: "CPU"
        },
        minFaceDetectionConfidence: 0.3,
        minFacePresenceConfidence: 0.3,
        runningMode: "IMAGE",
        numFaces: 1
      });
    }).then(function (landmarker) {
      return _this.meshLandmarker = landmarker;
    });
  }
  return _createClass(MediapipeModel, [{
    key: "detect",
    value: function () {
      var _detect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(imageFile) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = function (_) {
                  var _a;
                  var result = (_a = _this2.meshLandmarker) === null || _a === void 0 ? void 0 : _a.detect(image);
                  if (result) {
                    var graphs = result.faceLandmarks.map(function (landmarks) {
                      return landmarks.map(function (dict, idx) {
                        var ids = Array.from(face_landmarks_features_1.findNeighbourPointIds(idx, tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_TESSELATION, 1));
                        return new point3d_1.Point3D(idx, dict.x, dict.y, dict.z, ids);
                      }).map(function (point) {
                        return point;
                      });
                    }).map(function (landmarks) {
                      return new graph_1.Graph(landmarks);
                    });
                    if (graphs) {
                      resolve(graphs[0]);
                    }
                  } else {
                    reject('Face(s) could not be detected!');
                  }
                };
                var reader = new FileReader();
                reader.onload = function (_) {
                  var result = reader.result;
                  if (result) {
                    image.src = result.toString();
                  } else {
                    reject('Image could not be read!');
                  }
                };
                reader.readAsDataURL(imageFile);
              }));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function detect(_x) {
        return _detect.apply(this, arguments);
      }
      return detect;
    }()
  }, {
    key: "uploadAnnotations",
    value: function () {
      var _uploadAnnotations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", Promise.resolve());
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function uploadAnnotations(_x2) {
        return _uploadAnnotations.apply(this, arguments);
      }
      return uploadAnnotations;
    }()
  }]);
}();
exports.MediapipeModel = MediapipeModel;
},{"../graph/graph":"V4e4","../graph/face_landmarks_features":"K0kV","@mediapipe/tasks-vision":"J3Gj","../graph/point3d":"KpWr"}],"w2n2":[function(require,module,exports) {
"use strict";

/** Specifies the models in the API */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelType = void 0;
var ModelType;
(function (ModelType) {
  ModelType[ModelType["mediapipe"] = 0] = "mediapipe";
  ModelType[ModelType["custom"] = 1] = "custom";
})(ModelType = exports.ModelType || (exports.ModelType = {}));
},{}],"Q7NS":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlError = exports.WebServiceModel = void 0;
var point2d_1 = require("../graph/point2d");
var graph_1 = require("../graph/graph");
var face_landmarks_features_1 = require("../graph/face_landmarks_features");
var tasks_vision_1 = require("@mediapipe/tasks-vision");
/**
 * Represents a model using a WebService for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
var WebServiceModel = /*#__PURE__*/function () {
  /**
   * Creates a new WebServiceModel instance.
   */
  function WebServiceModel(url) {
    _classCallCheck(this, WebServiceModel);
    this.url = url;
  }
  return _createClass(WebServiceModel, [{
    key: "detect",
    value: function () {
      var _detect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(imageFile) {
        var headers, formData, request;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              headers = new Headers();
              headers.set('Content-Type', 'multipart/form-data');
              formData = new FormData();
              formData.append('file', imageFile);
              request = new Request(this.url + '/detect', {
                method: 'POST',
                headers: headers,
                body: formData
              });
              return _context.abrupt("return", fetch(request).then(function (res) {
                return res.json();
              }).then(function (landmarks) {
                return landmarks.map(function (dict, idx) {
                  var ids = Array.from(face_landmarks_features_1.findNeighbourPointIds(idx, tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_TESSELATION, 1));
                  return new point2d_1.Point2D(idx, dict.x, dict.y, ids);
                });
              }).then(function (landmarks) {
                return new graph_1.Graph(landmarks);
              }));
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function detect(_x) {
        return _detect.apply(this, arguments);
      }
      return detect;
    }()
  }, {
    key: "uploadAnnotations",
    value: function () {
      var _uploadAnnotations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(annotationsJson) {
        var headers, request;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              headers = new Headers();
              headers.set('Content-Type', 'application/json');
              headers.set('Accept', 'application/json');
              request = new Request(this.url + '/annotations', {
                method: 'POST',
                headers: headers,
                body: annotationsJson
              });
              return _context2.abrupt("return", fetch(request).then());
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function uploadAnnotations(_x2) {
        return _uploadAnnotations.apply(this, arguments);
      }
      return uploadAnnotations;
    }()
    /**
     * Verifies if a given URL is valid. Tries to connect to the endpoint.
     *
     * @param {string} url The URL to verify.
     *
     * @returns {urlError} Returns the type of URL error, if any.
     */
  }], [{
    key: "verifyUrl",
    value: (function () {
      var _verifyUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(url) {
        var pattern, request;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              pattern = new RegExp('^(https?:\\/\\/)?' +
              // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
              // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))' +
              // OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
              // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?' +
              // query string
              '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
              if (pattern.test(url)) {
                _context3.next = 3;
                break;
              }
              return _context3.abrupt("return", urlError.InvalidUrl);
            case 3:
              // try connecting to the url
              request = new Request(url, {
                method: 'HEAD'
              });
              return _context3.abrupt("return", fetch(request).then(function (_) {
                return null;
              }).catch(function (_) {
                return urlError.Unreachable;
              }));
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function verifyUrl(_x3) {
        return _verifyUrl.apply(this, arguments);
      }
      return verifyUrl;
    }())
  }]);
}();
exports.WebServiceModel = WebServiceModel;
var urlError;
(function (urlError) {
  urlError["InvalidUrl"] = "InvalidUrl";
  urlError["Unreachable"] = "Unreachable";
})(urlError = exports.urlError || (exports.urlError = {}));
},{"../graph/point2d":"gDGJ","../graph/graph":"V4e4","../graph/face_landmarks_features":"K0kV","@mediapipe/tasks-vision":"J3Gj"}],"YSF2":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;
var bootstrap = __importStar(require("bootstrap")); // import statically - dont grab it from a cdn
var slider_1 = require("./view/slider");
var checkbox_1 = require("./view/checkbox");
var thumbnail_1 = require("./view/thumbnail");
var fileAnnotationHistory_1 = require("./cache/fileAnnotationHistory");
var point2d_1 = require("./graph/point2d");
var editor2d_1 = require("./editor2d");
var graph_1 = require("./graph/graph");
var face_landmarks_features_1 = require("./graph/face_landmarks_features");
var mediapipe_1 = require("./model/mediapipe");
var models_1 = require("./model/models");
var webservice_1 = require("./model/webservice");
var App = /*#__PURE__*/function () {
  function App(cacheSize) {
    var _this = this;
    _classCallCheck(this, App);
    this.fileCache = [];
    this.editor = new editor2d_1.Editor2D();
    this.models = {
      "mediapipe": {
        "model": new mediapipe_1.MediapipeModel(),
        "selected": true
      },
      "custom": {
        "model": null,
        "selected": false
      }
    };
    this.selectedFile = null;
    this.cacheSize = cacheSize;
    this.featureDrag = new slider_1.Slider('feature_drag', function () {
      // TODO FIX Not working!
      var element = document.getElementById('num');
      element.value = _this.featureDrag.getValue().toString();
      _this.editor.dragDepth = _this.featureDrag.getValue();
    });
    this.viewTesselation = new checkbox_1.CheckBox('view_tesselation', function () {
      return _this.editor.showTesselation = _this.viewTesselation.isChecked();
    });
    this.thumbnailGallery = document.getElementById('thumbnailgallery');
    this.numImages = document.getElementById('num_images');
    this.editor.setOnPointsEditedCallback(function (graph) {
      var _a;
      return (_a = _this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.add(graph);
    });
    this.editor.setOnBackgroundLoadedCallback(function (_) {
      var _a, _b;
      if ((_a = _this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.isEmpty()) {
        _this.runDetection();
      } else {
        _this.editor.graph = (_b = _this.getSelectedFileHistory()) === null || _b === void 0 ? void 0 : _b.get();
      }
    });
  }
  return _createClass(App, [{
    key: "openImage",
    value: function openImage() {
      var _this2 = this;
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = "image/png, image/jpeg";
      input.multiple = true;
      input.onchange = function () {
        if (input.files) {
          var files = Array.from(input.files);
          for (var _i = 0, _files = files; _i < _files.length; _i++) {
            var f = _files[_i];
            var history = new fileAnnotationHistory_1.FileAnnotationHistory(f, _this2.cacheSize);
            _this2.fileCache.push(history);
            var thumbnail = new thumbnail_1.Thumbnail(function (filename) {
              return _this2.selectThumbnail(filename);
            });
            thumbnail.setSource(f);
            _this2.thumbnailGallery.appendChild(thumbnail.toHtml());
            _this2.numImages.value = _this2.thumbnailGallery.children.length.toString();
          }
          if (files.length > 0) {
            _this2.editor.setBackgroundSource(files[0]);
            _this2.selectedFile = files[0].name;
          }
        }
      };
      input.click();
      return false;
    }
  }, {
    key: "openAnnotation",
    value: function openAnnotation() {
      var _this3 = this;
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = ".json,application/json";
      input.onchange = function () {
        if (input.files && input.files.length > 0) {
          var annotationFile = input.files[0];
          var reader = new FileReader();
          reader.onload = function (_) {
            var jsonString = JSON.parse(reader.result);
            var _loop = function _loop() {
              var filename = _Object$keys[_i2];
              var graph = graph_1.Graph.fromJson(jsonString[filename], function (id) {
                return new point2d_1.Point2D(id, 0, 0, []);
              });
              var cache = _this3.fileCache.find(function (f) {
                return f.file.name === filename;
              });
              if (cache) {
                cache.add(graph);
                if (_this3.selectedFile === filename) {
                  _this3.editor.graph = graph;
                }
              }
            };
            for (var _i2 = 0, _Object$keys = Object.keys(jsonString); _i2 < _Object$keys.length; _i2++) {
              _loop();
            }
            _this3.editor.draw();
          };
          reader.readAsText(annotationFile);
        }
      };
      input.click();
      return false;
    }
  }, {
    key: "saveAnnotation",
    value: function saveAnnotation() {
      if (this.fileCache.length > 0) {
        var result = {};
        var _iterator = _createForOfIteratorHelper(this.fileCache),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var c = _step.value;
            var graph = c.get();
            if (graph) {
              result[c.file.name] = graph.toDictArray();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var jsonData = JSON.stringify(result);
        this.getModel().uploadAnnotations(jsonData);
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonData);
        var a = document.createElement('a');
        a.href = dataStr;
        a.download = Date.now() + '_face_mesh_annotations.json';
        a.click();
      }
      return false;
    }
  }, {
    key: "undo",
    value: function undo() {
      var _a, _b;
      (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.previous();
      this.editor.graph = (_b = this.getSelectedFileHistory()) === null || _b === void 0 ? void 0 : _b.get();
      return false;
    }
  }, {
    key: "redo",
    value: function redo() {
      var _a, _b;
      (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.next();
      this.editor.graph = (_b = this.getSelectedFileHistory()) === null || _b === void 0 ? void 0 : _b.get();
      return false;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _a;
      (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.clear();
      this.runDetection();
      return false;
    }
  }, {
    key: "addFeatureDrag",
    value: function addFeatureDrag(value) {
      this.featureDrag.setValue(this.featureDrag.getValue() + value);
    }
  }, {
    key: "setModel",
    value: function setModel(name) {
      var _this4 = this;
      var btnMediapipe = document.getElementById('btnModelMediapipe');
      var btnCustom = document.getElementById('btnModelCustom');
      this.models.mediapipe.selected = false;
      this.models.custom.selected = false;
      switch (name) {
        case models_1.ModelType.mediapipe:
          {
            btnMediapipe.checked = true;
            this.models.mediapipe.selected = true;
            break;
          }
        case models_1.ModelType.custom:
          {
            btnCustom.checked = true;
            this.models.custom.selected = true;
            var inputBox = $('#modelurl');
            var url = String(inputBox.val());
            webservice_1.WebServiceModel.verifyUrl(url).then(function (error) {
              var errorText = $('#urlErrorText');
              if (error === null) {
                _this4.models.custom.model = new webservice_1.WebServiceModel(url);
                $('#modalSettingsModel').modal('hide');
                errorText.hide();
                var saveElement = $('#saveNotification')[0];
                var toast = bootstrap.Toast.getOrCreateInstance(saveElement);
                toast.show();
                var notificationText = $('#saveNotificationText');
                notificationText.text('Webservice url saved!');
                setTimeout(function () {
                  toast.hide();
                  notificationText.text();
                }, 5000);
              } else {
                // Display error:
                switch (error) {
                  case webservice_1.urlError.InvalidUrl:
                    {
                      errorText.removeAttr('hidden');
                      errorText.text('Please enter a valid URL!');
                      break;
                    }
                  case webservice_1.urlError.Unreachable:
                    {
                      errorText.removeAttr('hidden');
                      errorText.text('The provided endpoint wasn\'t reachable!');
                      break;
                    }
                }
                // shake the input window
                inputBox.addClass("wrongInput");
                setTimeout(function () {
                  inputBox.removeClass('wrongInput');
                }, 500);
              }
            });
            break;
          }
        default:
          console.error('No model "' + name + '" found to change to!');
          break;
      }
      return false;
    }
  }, {
    key: "getModel",
    value: function getModel() {
      for (var modelName in this.models) {
        if (this.models[modelName].selected) {
          return this.models[modelName].model;
        }
      }
      return undefined;
    }
  }, {
    key: "deleteFeature",
    value: function deleteFeature(feature) {
      var _a;
      (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.add(this.editor.graph);
      switch (feature) {
        case "left_eye":
          this.deletePoints(face_landmarks_features_1.FACE_FEATURE_LEFT_EYE);
          break;
        case "left_eyebrow":
          this.deletePoints(face_landmarks_features_1.FACE_FEATURE_LEFT_EYEBROW);
          break;
        case "right_eye":
          this.deletePoints(face_landmarks_features_1.FACE_FEATURE_RIGHT_EYE);
          break;
        case "right_eyebrow":
          this.deletePoints(face_landmarks_features_1.FACE_FEATURE_RIGHT_EYEBROW);
          break;
        case "nose":
          this.deletePoints(face_landmarks_features_1.FACE_FEATURE_NOSE);
          break;
        case "mouth":
          this.deletePoints(face_landmarks_features_1.FACE_FEATURE_LIPS);
          break;
        default:
          console.error('No feature "' + feature + '" found to delete!');
          break;
      }
      return false;
    }
  }, {
    key: "selectThumbnail",
    value: function selectThumbnail(filename) {
      this.selectedFile = filename;
      var cache = this.getSelectedFileHistory();
      if (cache) {
        this.editor.setBackgroundSource(cache.file);
      }
    }
  }, {
    key: "resizeWindow",
    value: function resizeWindow() {
      this.editor.draw();
    }
  }, {
    key: "runDetection",
    value: function runDetection() {
      var _this5 = this;
      var _a;
      (_a = this.getModel()) === null || _a === void 0 ? void 0 : _a.detect(this.getSelectedFileHistory().file).then(function (graph) {
        var _a;
        (_a = _this5.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.add(graph);
        _this5.editor.center();
        _this5.editor.graph = graph;
      });
    }
  }, {
    key: "getSelectedFileHistory",
    value: function getSelectedFileHistory() {
      var _this6 = this;
      return this.fileCache.find(function (c) {
        return c.file.name === _this6.selectedFile;
      });
    }
  }, {
    key: "deletePoints",
    value: function deletePoints(pointIds) {
      var _a;
      var graph = (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.get();
      if (graph) {
        var _iterator2 = _createForOfIteratorHelper(pointIds),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var id = _step2.value;
            graph.getById(id).deleted = true;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        this.editor.graph = graph;
      }
    }
  }]);
}();
exports.App = App;
// #####################################################################################################################
// INITIAL
// #####################################################################################################################
window.onload = function (_) {
  var elements = document.querySelectorAll('[aria-keyshortcuts]');
  elements.forEach(function (elem) {
    elem.style.cssText = "width: 100%; text-align: start; padding: .2vw;";
    var keys = elem.ariaKeyShortcuts.split('+').map(function (k) {
      return k.replace('Control', 'CTRL').replace('Shift', 'SHIFT').replace('Wheel', 'SCROLL');
    });
    if (elem.ariaKeyShortcuts.length > 0) {
      var table = document.createElement('table');
      table.style.cssText = 'width: 100%';
      var row = document.createElement('tr');
      table.appendChild(row);
      var menuTextCol = document.createElement('td');
      menuTextCol.innerHTML = elem.innerHTML;
      row.appendChild(menuTextCol);
      var menuShortCutCol = document.createElement('td');
      menuShortCutCol.style.cssText = "text-align: end;";
      menuShortCutCol.innerHTML = keys.map(function (k) {
        return "<kbd>" + k + "</kbd>";
      }).join("+");
      row.appendChild(menuShortCutCol);
      elem.replaceChildren(table);
    }
  });
  var app = new App(25);
  document.getElementById('openFile').onclick = function () {
    return app.openImage();
  };
  document.getElementById('openAnno').onclick = function () {
    return app.openAnnotation();
  };
  document.getElementById('saveAnno').onclick = function () {
    return app.saveAnnotation();
  };
  document.getElementById('undo').onclick = function () {
    return app.undo();
  };
  document.getElementById('redo').onclick = function () {
    return app.redo();
  };
  document.getElementById('reset').onclick = function () {
    return app.reset();
  };
  document.getElementById('btnModelMediapipe').onclick = function () {
    return app.setModel(models_1.ModelType.mediapipe);
  };
  document.getElementById('btnCloseModal').onclick = function () {
    return app.setModel(models_1.ModelType.mediapipe);
  };
  document.getElementById('btnCancelModal').onclick = function () {
    return app.setModel(models_1.ModelType.mediapipe);
  };
  document.getElementById('btnSaveCustomModel').onclick = function () {
    return app.setModel(models_1.ModelType.custom);
  };
  document.getElementById('feat_le').onclick = function (_) {
    return app.deleteFeature('left_eye');
  };
  document.getElementById('feat_leb').onclick = function (_) {
    return app.deleteFeature('left_eyebrow');
  };
  document.getElementById('feat_re').onclick = function (_) {
    return app.deleteFeature('right_eye');
  };
  document.getElementById('feat_reb').onclick = function (_) {
    return app.deleteFeature('right_eyebrow');
  };
  document.getElementById('feat_n').onclick = function (_) {
    return app.deleteFeature('nose');
  };
  document.getElementById('feat_m').onclick = function (_) {
    return app.deleteFeature('mouth');
  };
  window.onresize = function () {
    return app.resizeWindow();
  };
  window.onwheel = function (e) {
    if (e.shiftKey) {
      app.addFeatureDrag(e.deltaY / 100);
    }
  };
};
},{"bootstrap":"XhER","./view/slider":"Q2pJ","./view/checkbox":"GFaE","./view/thumbnail":"N3UC","./cache/fileAnnotationHistory":"hQdi","./graph/point2d":"gDGJ","./editor2d":"rUEc","./graph/graph":"V4e4","./graph/face_landmarks_features":"K0kV","./model/mediapipe":"MWsf","./model/models":"w2n2","./model/webservice":"Q7NS"}]},{},["YSF2"], null)
//# sourceMappingURL=app.e3cfaa97.js.map