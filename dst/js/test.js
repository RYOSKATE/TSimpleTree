/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .flag(object, key, [value])
 *
 * Get or set a flag value on an object. If a
 * value is provided it will be set, else it will
 * return the currently set value or `undefined` if
 * the value is not set.
 *
 *     utils.flag(this, 'foo', 'bar'); // setter
 *     utils.flag(this, 'foo'); // getter, returns `bar`
 *
 * @param {Object} object constructed Assertion
 * @param {String} key
 * @param {Mixed} value (optional)
 * @namespace Utils
 * @name flag
 * @api private
 */

module.exports = function flag(obj, key, value) {
  var flags = obj.__flags || (obj.__flags = Object.create(null));
  if (arguments.length === 3) {
    flags[key] = value;
  } else {
    return flags[key];
  }
};


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = [];

/*!
 * Chai version
 */

exports.version = '4.1.2';

/*!
 * Assertion Error
 */

exports.AssertionError = __webpack_require__(36);

/*!
 * Utils for plugins (not exported)
 */

var util = __webpack_require__(67);

/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai.
 *
 * @param {Function}
 * @returns {this} for chaining
 * @api public
 */

exports.use = function (fn) {
  if (!~used.indexOf(fn)) {
    fn(exports, util);
    used.push(fn);
  }

  return exports;
};

/*!
 * Utility Functions
 */

exports.util = util;

/*!
 * Configuration
 */

var config = __webpack_require__(8);
exports.config = config;

/*!
 * Primary `Assertion` prototype
 */

var assertion = __webpack_require__(85);
exports.use(assertion);

/*!
 * Core Assertions
 */

var core = __webpack_require__(86);
exports.use(core);

/*!
 * Expect interface
 */

var expect = __webpack_require__(87);
exports.use(expect);

/*!
 * Should interface
 */

var should = __webpack_require__(88);
exports.use(should);

/*!
 * Assert interface
 */

var assert = __webpack_require__(89);
exports.use(assert);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {

  /**
   * ### config.includeStack
   *
   * User configurable property, influences whether stack trace
   * is included in Assertion error message. Default of false
   * suppresses stack trace in the error message.
   *
   *     chai.config.includeStack = true;  // enable stack on error
   *
   * @param {Boolean}
   * @api public
   */

  includeStack: false,

  /**
   * ### config.showDiff
   *
   * User configurable property, influences whether or not
   * the `showDiff` flag should be included in the thrown
   * AssertionErrors. `false` will always be `false`; `true`
   * will be true when the assertion has requested a diff
   * be shown.
   *
   * @param {Boolean}
   * @api public
   */

  showDiff: true,

  /**
   * ### config.truncateThreshold
   *
   * User configurable property, sets length threshold for actual and
   * expected values in assertion errors. If this threshold is exceeded, for
   * example for large data structures, the value is replaced with something
   * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
   *
   * Set it to zero if you want to disable truncating altogether.
   *
   * This is especially userful when doing assertions on arrays: having this
   * set to a reasonable large value makes the failure messages readily
   * inspectable.
   *
   *     chai.config.truncateThreshold = 0;  // disable truncating
   *
   * @param {Number}
   * @api public
   */

  truncateThreshold: 40,

  /**
   * ### config.useProxy
   *
   * User configurable property, defines if chai will use a Proxy to throw
   * an error when a non-existent property is read, which protects users
   * from typos when using property-based assertions.
   *
   * Set it to false if you want to disable this feature.
   *
   *     chai.config.useProxy = false;  // disable use of Proxy
   *
   * This feature is automatically disabled regardless of this config value
   * in environments that don't support proxies.
   *
   * @param {Boolean}
   * @api public
   */

  useProxy: true,

  /**
   * ### config.proxyExcludedKeys
   *
   * User configurable property, defines which properties should be ignored
   * instead of throwing an error if they do not exist on the assertion.
   * This is only applied if the environment Chai is running in supports proxies and
   * if the `useProxy` configuration setting is enabled.
   * By default, `then` and `inspect` will not throw an error if they do not exist on the
   * assertion object because the `.inspect` property is read by `util.inspect` (for example, when
   * using `console.log` on the assertion object) and `.then` is necessary for promise type-checking.
   *
   *     // By default these keys will not throw an error if they do not exist on the assertion object
   *     chai.config.proxyExcludedKeys = ['then', 'inspect'];
   *
   * @param {Array}
   * @api public
   */

  proxyExcludedKeys: ['then', 'inspect', 'toJSON']
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .transferFlags(assertion, object, includeAll = true)
 *
 * Transfer all the flags for `assertion` to `object`. If
 * `includeAll` is set to `false`, then the base Chai
 * assertion flags (namely `object`, `ssfi`, `lockSsfi`,
 * and `message`) will not be transferred.
 *
 *
 *     var newAssertion = new Assertion();
 *     utils.transferFlags(assertion, newAssertion);
 *
 *     var anotherAsseriton = new Assertion(myObj);
 *     utils.transferFlags(assertion, anotherAssertion, false);
 *
 * @param {Assertion} assertion the assertion to transfer the flags from
 * @param {Object} object the object to transfer the flags to; usually a new assertion
 * @param {Boolean} includeAll
 * @namespace Utils
 * @name transferFlags
 * @api private
 */

module.exports = function transferFlags(assertion, object, includeAll) {
  var flags = assertion.__flags || (assertion.__flags = Object.create(null));

  if (!object.__flags) {
    object.__flags = Object.create(null);
  }

  includeAll = arguments.length === 3 ? includeAll : true;

  for (var flag in flags) {
    if (includeAll ||
        (flag !== 'object' && flag !== 'ssfi' && flag !== 'lockSsfi' && flag != 'message')) {
      object.__flags[flag] = flags[flag];
    }
  }
};


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// This is (almost) directly from Node.js utils
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js

var getName = __webpack_require__(38);
var getProperties = __webpack_require__(39);
var getEnumerableProperties = __webpack_require__(73);
var config = __webpack_require__(8);

module.exports = inspect;

/**
 * ### .inspect(obj, [showHidden], [depth], [colors])
 *
 * Echoes the value of a value. Tries to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
 *    properties of objects. Default is false.
 * @param {Number} depth Depth in which to descend in object. Default is 2.
 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
 *    output. Default is false (no coloring).
 * @namespace Utils
 * @name inspect
 */
function inspect(obj, showHidden, depth, colors) {
  var ctx = {
    showHidden: showHidden,
    seen: [],
    stylize: function (str) { return str; }
  };
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}

// Returns true if object is a DOM element.
var isDOMElement = function (object) {
  if (typeof HTMLElement === 'object') {
    return object instanceof HTMLElement;
  } else {
    return object &&
      typeof object === 'object' &&
      'nodeType' in object &&
      object.nodeType === 1 &&
      typeof object.nodeName === 'string';
  }
};

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (value && typeof value.inspect === 'function' &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (typeof ret !== 'string') {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // If this is a DOM element, try to get the outer HTML.
  if (isDOMElement(value)) {
    if ('outerHTML' in value) {
      return value.outerHTML;
      // This value does not have an outerHTML attribute,
      //   it could still be an XML element
    } else {
      // Attempt to serialize it
      try {
        if (document.xmlVersion) {
          var xmlSerializer = new XMLSerializer();
          return xmlSerializer.serializeToString(value);
        } else {
          // Firefox 11- do not support outerHTML
          //   It does, however, support innerHTML
          //   Use the following to render the element
          var ns = "http://www.w3.org/1999/xhtml";
          var container = document.createElementNS(ns, '_');

          container.appendChild(value.cloneNode(false));
          var html = container.innerHTML
            .replace('><', '>' + value.innerHTML + '<');
          container.innerHTML = '';
          return html;
        }
      } catch (err) {
        // This could be a non-native DOM implementation,
        //   continue with the normal flow:
        //   printing the element as if it is an object.
      }
    }
  }

  // Look up the keys of the object.
  var visibleKeys = getEnumerableProperties(value);
  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;

  var name, nameSuffix;

  // Some type of object without properties can be shortcutted.
  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
  // a `stack` plus `description` property; ignore those for consistency.
  if (keys.length === 0 || (isError(value) && (
      (keys.length === 1 && keys[0] === 'stack') ||
      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
     ))) {
    if (typeof value === 'function') {
      name = getName(value);
      nameSuffix = name ? ': ' + name : '';
      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = ''
    , array = false
    , typedArray = false
    , braces = ['{', '}'];

  if (isTypedArray(value)) {
    typedArray = true;
    braces = ['[', ']'];
  }

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (typeof value === 'function') {
    name = getName(value);
    nameSuffix = name ? ': ' + name : '';
    base = ' [Function' + nameSuffix + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    return formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else if (typedArray) {
    return formatTypedArray(value);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  switch (typeof value) {
    case 'undefined':
      return ctx.stylize('undefined', 'undefined');

    case 'string':
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');

    case 'number':
      if (value === 0 && (1/value) === -Infinity) {
        return ctx.stylize('-0', 'number');
      }
      return ctx.stylize('' + value, 'number');

    case 'boolean':
      return ctx.stylize('' + value, 'boolean');

    case 'symbol':
      return ctx.stylize(value.toString(), 'symbol');
  }
  // For some reason typeof null is "object", so special case here.
  if (value === null) {
    return ctx.stylize('null', 'null');
  }
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}

function formatTypedArray(value) {
  var str = '[ ';

  for (var i = 0; i < value.length; ++i) {
    if (str.length >= config.truncateThreshold - 7) {
      str += '...';
      break;
    }
    str += value[i] + ', ';
  }
  str += ' ]';

  // Removing trailing `, ` if the array was not truncated
  if (str.indexOf(',  ]') !== -1) {
    str = str.replace(',  ]', ' ]');
  }

  return str;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name;
  var propDescriptor = Object.getOwnPropertyDescriptor(value, key);
  var str;

  if (propDescriptor) {
    if (propDescriptor.get) {
      if (propDescriptor.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (propDescriptor.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
  }
  if (visibleKeys.indexOf(key) < 0) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(value[key]) < 0) {
      if (recurseTimes === null) {
        str = formatValue(ctx, value[key], null);
      } else {
        str = formatValue(ctx, value[key], recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (typeof name === 'undefined') {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

function isTypedArray(ar) {
  // Unfortunately there's no way to check if an object is a TypedArray
  // We have to check if it's one of these types
  return (typeof ar === 'object' && /\w+Array]$/.test(objectToString(ar)));
}

function isArray(ar) {
  return Array.isArray(ar) ||
         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}

function isRegExp(re) {
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}

function isDate(d) {
  return typeof d === 'object' && objectToString(d) === '[object Date]';
}

function isError(e) {
  return typeof e === 'object' && objectToString(e) === '[object Error]';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(8);

/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .isProxyEnabled()
 *
 * Helper function to check if Chai's proxy protection feature is enabled. If
 * proxies are unsupported or disabled via the user's Chai config, then return
 * false. Otherwise, return true.
 *
 * @namespace Utils
 * @name isProxyEnabled
 */

module.exports = function isProxyEnabled() {
  return config.useProxy && 
    typeof Proxy !== 'undefined' &&
    typeof Reflect !== 'undefined';
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(8);

var fnLengthDesc = Object.getOwnPropertyDescriptor(function () {}, 'length');

/*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .addLengthGuard(fn, assertionName, isChainable)
 *
 * Define `length` as a getter on the given uninvoked method assertion. The
 * getter acts as a guard against chaining `length` directly off of an uninvoked
 * method assertion, which is a problem because it references `function`'s
 * built-in `length` property instead of Chai's `length` assertion. When the
 * getter catches the user making this mistake, it throws an error with a
 * helpful message.
 *
 * There are two ways in which this mistake can be made. The first way is by
 * chaining the `length` assertion directly off of an uninvoked chainable
 * method. In this case, Chai suggests that the user use `lengthOf` instead. The
 * second way is by chaining the `length` assertion directly off of an uninvoked
 * non-chainable method. Non-chainable methods must be invoked prior to
 * chaining. In this case, Chai suggests that the user consult the docs for the
 * given assertion.
 *
 * If the `length` property of functions is unconfigurable, then return `fn`
 * without modification.
 *
 * Note that in ES6, the function's `length` property is configurable, so once
 * support for legacy environments is dropped, Chai's `length` property can
 * replace the built-in function's `length` property, and this length guard will
 * no longer be necessary. In the mean time, maintaining consistency across all
 * environments is the priority.
 *
 * @param {Function} fn
 * @param {String} assertionName
 * @param {Boolean} isChainable
 * @namespace Utils
 * @name addLengthGuard
 */

module.exports = function addLengthGuard (fn, assertionName, isChainable) {
  if (!fnLengthDesc.configurable) return fn;

  Object.defineProperty(fn, 'length', {
    get: function () {
      if (isChainable) {
        throw Error('Invalid Chai property: ' + assertionName + '.length. Due' +
          ' to a compatibility issue, "length" cannot directly follow "' +
          assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
      }

      throw Error('Invalid Chai property: ' + assertionName + '.length. See' +
        ' docs for proper usage of "' + assertionName + '".');
    }
  });

  return fn;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(8);
var flag = __webpack_require__(1);
var getProperties = __webpack_require__(39);
var isProxyEnabled = __webpack_require__(17);

/*!
 * Chai - proxify utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .proxify(object)
 *
 * Return a proxy of given object that throws an error when a non-existent
 * property is read. By default, the root cause is assumed to be a misspelled
 * property, and thus an attempt is made to offer a reasonable suggestion from
 * the list of existing properties. However, if a nonChainableMethodName is
 * provided, then the root cause is instead a failure to invoke a non-chainable
 * method prior to reading the non-existent property.
 * 
 * If proxies are unsupported or disabled via the user's Chai config, then
 * return object without modification.
 *
 * @param {Object} obj
 * @param {String} nonChainableMethodName
 * @namespace Utils
 * @name proxify
 */

var builtins = ['__flags', '__methods', '_obj', 'assert'];

module.exports = function proxify(obj, nonChainableMethodName) {
  if (!isProxyEnabled()) return obj;

  return new Proxy(obj, {
    get: function proxyGetter(target, property) {
      // This check is here because we should not throw errors on Symbol properties
      // such as `Symbol.toStringTag`.
      // The values for which an error should be thrown can be configured using
      // the `config.proxyExcludedKeys` setting.
      if (typeof property === 'string' &&
          config.proxyExcludedKeys.indexOf(property) === -1 &&
          !Reflect.has(target, property)) {
        // Special message for invalid property access of non-chainable methods.
        if (nonChainableMethodName) {
          throw Error('Invalid Chai property: ' + nonChainableMethodName + '.' +
            property + '. See docs for proper usage of "' +
            nonChainableMethodName + '".');
        }

        var orderedProperties = getProperties(target).filter(function(property) {
          return !Object.prototype.hasOwnProperty(property) &&
            builtins.indexOf(property) === -1;
        }).sort(function(a, b) {
          return stringDistance(property, a) - stringDistance(property, b);
        });

        if (orderedProperties.length &&
            stringDistance(orderedProperties[0], property) < 4) {
          // If the property is reasonably close to an existing Chai property,
          // suggest that property to the user.
          throw Error('Invalid Chai property: ' + property +
            '. Did you mean "' + orderedProperties[0] + '"?');
        } else {
          throw Error('Invalid Chai property: ' + property);
        }
      }

      // Use this proxy getter as the starting point for removing implementation
      // frames from the stack trace of a failed assertion. For property
      // assertions, this prevents the proxy getter from showing up in the stack
      // trace since it's invoked before the property getter. For method and
      // chainable method assertions, this flag will end up getting changed to
      // the method wrapper, which is good since this frame will no longer be in
      // the stack once the method is invoked. Note that Chai builtin assertion
      // properties such as `__flags` are skipped since this is only meant to
      // capture the starting point of an assertion. This step is also skipped
      // if the `lockSsfi` flag is set, thus indicating that this assertion is
      // being called from within another assertion. In that case, the `ssfi`
      // flag is already set to the outer assertion's starting point.
      if (builtins.indexOf(property) === -1 && !flag(target, 'lockSsfi')) {
        flag(target, 'ssfi', proxyGetter);
      }

      return Reflect.get(target, property);
    }
  });
};

/**
 * # stringDistance(strA, strB)
 * Return the Levenshtein distance between two strings.
 * @param {string} strA
 * @param {string} strB
 * @return {number} the string distance between strA and strB
 * @api private
 */

function stringDistance(strA, strB, memo) {
  if (!memo) {
    // `memo` is a two-dimensional array containing a cache of distances
    // memo[i][j] is the distance between strA.slice(0, i) and
    // strB.slice(0, j).
    memo = [];
    for (var i = 0; i <= strA.length; i++) {
      memo[i] = [];
    }
  }

  if (!memo[strA.length] || !memo[strA.length][strB.length]) {
    if (strA.length === 0 || strB.length === 0) {
      memo[strA.length][strB.length] = Math.max(strA.length, strB.length);
    } else {
      memo[strA.length][strB.length] = Math.min(
        stringDistance(strA.slice(0, -1), strB, memo) + 1,
        stringDistance(strA, strB.slice(0, -1), memo) + 1,
        stringDistance(strA.slice(0, -1), strB.slice(0, -1), memo) +
          (strA.slice(-1) === strB.slice(-1) ? 0 : 1)
      );
    }
  }

  return memo[strA.length][strB.length];
}


/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.typeDetect = factory());
}(this, (function () { 'use strict';

/* !
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var promiseExists = typeof Promise === 'function';

/* eslint-disable no-undef */
var globalObject = typeof self === 'object' ? self : global; // eslint-disable-line id-blacklist

var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
var windowExists = typeof window === 'object';
var windowLocationExists = windowExists && typeof window.location === 'object';
var windowDocumentExists = windowExists && typeof window.document === 'object';
var windowNavigatorExists = windowExists && typeof window.navigator === 'object';
var windowNavigatorMimeTypesExists = windowNavigatorExists && typeof window.navigator.mimeTypes === 'object';
var windowNavigatorPluginsExists = windowNavigatorExists && typeof window.navigator.plugins === 'object';
var windowHTMLElementExists = windowExists &&
  (typeof window.HTMLElement === 'function' || typeof window.HTMLElement === 'object');
/**
 * ### typeOf (obj)
 *
 * Uses `Object.prototype.toString` to determine the type of an object,
 * normalising behaviour across engine versions & well optimised.
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */
function typeDetect(obj) {
  /* ! Speed optimisation
   * Pre:
   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
   * Post:
   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
   */
  var typeofObj = typeof obj;
  if (typeofObj !== 'object') {
    return typeofObj;
  }

  /* ! Speed optimisation
   * Pre:
   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
   * Post:
   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
   */
  if (obj === null) {
    return 'null';
  }

  /* ! Spec Conformance
   * Test: `Object.prototype.toString.call(window)``
   *  - Node === "[object global]"
   *  - Chrome === "[object global]"
   *  - Firefox === "[object Window]"
   *  - PhantomJS === "[object Window]"
   *  - Safari === "[object Window]"
   *  - IE 11 === "[object Window]"
   *  - IE Edge === "[object Window]"
   * Test: `Object.prototype.toString.call(this)``
   *  - Chrome Worker === "[object global]"
   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
   *  - IE 11 Worker === "[object WorkerGlobalScope]"
   *  - IE Edge Worker === "[object WorkerGlobalScope]"
   */
  if (obj === globalObject) {
    return 'global';
  }

  /* ! Speed optimisation
   * Pre:
   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
   * Post:
   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
   */
  if (
    Array.isArray(obj) &&
    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
  ) {
    return 'Array';
  }

  if (windowExists) {
    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
     * WhatWG HTML$7.7.3 - The `Location` interface
     * Test: `Object.prototype.toString.call(window.location)``
     *  - IE <=11 === "[object Object]"
     *  - IE Edge <=13 === "[object Object]"
     */
    if (windowLocationExists && obj === window.location) {
      return 'Location';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#document)
     * WhatWG HTML$3.1.1 - The `Document` object
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     *       WhatWG HTML states:
     *         > For historical reasons, Window objects must also have a
     *         > writable, configurable, non-enumerable property named
     *         > HTMLDocument whose value is the Document interface object.
     * Test: `Object.prototype.toString.call(document)``
     *  - Chrome === "[object HTMLDocument]"
     *  - Firefox === "[object HTMLDocument]"
     *  - Safari === "[object HTMLDocument]"
     *  - IE <=10 === "[object Document]"
     *  - IE 11 === "[object HTMLDocument]"
     *  - IE Edge <=13 === "[object HTMLDocument]"
     */
    if (windowDocumentExists && obj === window.document) {
      return 'Document';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
     * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
     * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
     *  - IE <=10 === "[object MSMimeTypesCollection]"
     */
    if (windowNavigatorMimeTypesExists && obj === window.navigator.mimeTypes) {
      return 'MimeTypeArray';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
     * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
     * Test: `Object.prototype.toString.call(navigator.plugins)``
     *  - IE <=10 === "[object MSPluginsCollection]"
     */
    if (windowNavigatorPluginsExists && obj === window.navigator.plugins) {
      return 'PluginArray';
    }

    if (windowHTMLElementExists && obj instanceof window.HTMLElement) {
      /* ! Spec Conformance
      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
      *  - IE <=10 === "[object HTMLBlockElement]"
      */
      if (obj.tagName === 'BLOCKQUOTE') {
        return 'HTMLQuoteElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('td'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TD') {
        return 'HTMLTableDataCellElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('th'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TH') {
        return 'HTMLTableHeaderCellElement';
      }
    }
  }

  /* ! Speed optimisation
  * Pre:
  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
  * Post:
  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
  */
  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
  if (typeof stringTag === 'string') {
    return stringTag;
  }

  var objPrototype = Object.getPrototypeOf(obj);
  /* ! Speed optimisation
  * Pre:
  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
  * Post:
  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
  */
  if (objPrototype === RegExp.prototype) {
    return 'RegExp';
  }

  /* ! Speed optimisation
  * Pre:
  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
  * Post:
  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
  */
  if (objPrototype === Date.prototype) {
    return 'Date';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
   * Test: `Object.prototype.toString.call(Promise.resolve())``
   *  - Chrome <=47 === "[object Object]"
   *  - Edge <=20 === "[object Object]"
   *  - Firefox 29-Latest === "[object Promise]"
   *  - Safari 7.1-Latest === "[object Promise]"
   */
  if (promiseExists && objPrototype === Promise.prototype) {
    return 'Promise';
  }

  /* ! Speed optimisation
  * Pre:
  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
  * Post:
  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
  */
  if (setExists && objPrototype === Set.prototype) {
    return 'Set';
  }

  /* ! Speed optimisation
  * Pre:
  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
  * Post:
  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
  */
  if (mapExists && objPrototype === Map.prototype) {
    return 'Map';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
  * Post:
  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
  */
  if (weakSetExists && objPrototype === WeakSet.prototype) {
    return 'WeakSet';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
  * Post:
  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
  */
  if (weakMapExists && objPrototype === WeakMap.prototype) {
    return 'WeakMap';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
   *  - Edge <=13 === "[object Object]"
   */
  if (dataViewExists && objPrototype === DataView.prototype) {
    return 'DataView';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
   * Test: `Object.prototype.toString.call(new Map().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (mapExists && objPrototype === mapIteratorPrototype) {
    return 'Map Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
   * Test: `Object.prototype.toString.call(new Set().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (setExists && objPrototype === setIteratorPrototype) {
    return 'Set Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
    return 'Array Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
    return 'String Iterator';
  }

  /* ! Speed optimisation
  * Pre:
  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
  * Post:
  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
  */
  if (objPrototype === null) {
    return 'Object';
  }

  return Object
    .prototype
    .toString
    .call(obj)
    .slice(toStringLeftSliceLength, toStringRightSliceLength);
}

return typeDetect;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(70)))

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports) {

/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */

function exclude () {
  var excludes = [].slice.call(arguments);

  function excludeProps (res, obj) {
    Object.keys(obj).forEach(function (key) {
      if (!~excludes.indexOf(key)) res[key] = obj[key];
    });
  }

  return function extendExclude () {
    var args = [].slice.call(arguments)
      , i = 0
      , res = {};

    for (; i < args.length; i++) {
      excludeProps(res, args[i]);
    }

    return res;
  };
};

/*!
 * Primary Exports
 */

module.exports = AssertionError;

/**
 * ### AssertionError
 *
 * An extension of the JavaScript `Error` constructor for
 * assertion and validation scenarios.
 *
 * @param {String} message
 * @param {Object} properties to include (optional)
 * @param {callee} start stack function (optional)
 */

function AssertionError (message, _props, ssf) {
  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
    , props = extend(_props || {});

  // default values
  this.message = message || 'Unspecified AssertionError';
  this.showDiff = false;

  // copy from properties
  for (var key in props) {
    this[key] = props[key];
  }

  // capture stack trace
  ssf = ssf || AssertionError;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ssf);
  } else {
    try {
      throw new Error();
    } catch(e) {
      this.stack = e.stack;
    }
  }
}

/*!
 * Inherit from Error.prototype
 */

AssertionError.prototype = Object.create(Error.prototype);

/*!
 * Statically set name
 */

AssertionError.prototype.name = 'AssertionError';

/*!
 * Ensure correct constructor
 */

AssertionError.prototype.constructor = AssertionError;

/**
 * Allow errors to be converted to JSON for static transfer.
 *
 * @param {Boolean} include stack (default: `true`)
 * @return {Object} object that can be `JSON.stringify`
 */

AssertionError.prototype.toJSON = function (stack) {
  var extend = exclude('constructor', 'toJSON', 'stack')
    , props = extend({ name: this.name }, this);

  // include stack if exists and not turned off
  if (false !== stack && this.stack) {
    props.stack = this.stack;
  }

  return props;
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getActual(object, [actual])
 *
 * Returns the `actual` value for an Assertion.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getActual
 */

module.exports = function getActual(obj, args) {
  return args.length > 4 ? args[4] : obj._obj;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* !
 * Chai - getFuncName utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getFuncName(constructorFn)
 *
 * Returns the name of a function.
 * When a non-function instance is passed, returns `null`.
 * This also includes a polyfill function if `aFunc.name` is not defined.
 *
 * @name getFuncName
 * @param {Function} funct
 * @namespace Utils
 * @api public
 */

var toString = Function.prototype.toString;
var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
function getFuncName(aFunc) {
  if (typeof aFunc !== 'function') {
    return null;
  }

  var name = '';
  if (typeof Function.prototype.name === 'undefined' && typeof aFunc.name === 'undefined') {
    // Here we run a polyfill if Function does not support the `name` property and if aFunc.name is not defined
    var match = toString.call(aFunc).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    // If we've got a `name` property we just use it
    name = aFunc.name;
  }

  return name;
}

module.exports = getFuncName;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getProperties(object)
 *
 * This allows the retrieval of property names of an object, enumerable or not,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getProperties
 * @api public
 */

module.exports = function getProperties(object) {
  var result = Object.getOwnPropertyNames(object);

  function addProperty(property) {
    if (result.indexOf(property) === -1) {
      result.push(property);
    }
  }

  var proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(addProperty);
    proto = Object.getPrototypeOf(proto);
  }

  return result;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var inspect = __webpack_require__(16);
var config = __webpack_require__(8);

/**
 * ### .objDisplay(object)
 *
 * Determines if an object or an array matches
 * criteria to be inspected in-line for error
 * messages or should be truncated.
 *
 * @param {Mixed} javascript object to inspect
 * @name objDisplay
 * @namespace Utils
 * @api public
 */

module.exports = function objDisplay(obj) {
  var str = inspect(obj)
    , type = Object.prototype.toString.call(obj);

  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
    if (type === '[object Function]') {
      return !obj.name || obj.name === ''
        ? '[Function]'
        : '[Function: ' + obj.name + ']';
    } else if (type === '[object Array]') {
      return '[ Array(' + obj.length + ') ]';
    } else if (type === '[object Object]') {
      var keys = Object.keys(obj)
        , kstr = keys.length > 2
          ? keys.splice(0, 2).join(', ') + ', ...'
          : keys.join(', ');
      return '{ Object (' + kstr + ') }';
    } else {
      return str;
    }
  } else {
    return str;
  }
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

/*!
 * Chai - getOwnEnumerablePropertySymbols utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getOwnEnumerablePropertySymbols(object)
 *
 * This allows the retrieval of directly-owned enumerable property symbols of an
 * object. This function is necessary because Object.getOwnPropertySymbols
 * returns both enumerable and non-enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerablePropertySymbols
 * @api public
 */

module.exports = function getOwnEnumerablePropertySymbols(obj) {
  if (typeof Object.getOwnPropertySymbols !== 'function') return [];

  return Object.getOwnPropertySymbols(obj).filter(function (sym) {
    return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
  });
};


/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __webpack_require__(66);
describe('module1 default function', function () {
    it('1+1', function () {
        var expect = 3;
        chai_1.assert.equal(1 + 2, expect);
    });
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Dependencies that are used for multiple exports are required here only once
 */

var pathval = __webpack_require__(68);

/*!
 * test utility
 */

exports.test = __webpack_require__(69);

/*!
 * type utility
 */

exports.type = __webpack_require__(25);

/*!
 * expectTypes utility
 */
exports.expectTypes = __webpack_require__(71);

/*!
 * message utility
 */

exports.getMessage = __webpack_require__(72);

/*!
 * actual utility
 */

exports.getActual = __webpack_require__(37);

/*!
 * Inspect util
 */

exports.inspect = __webpack_require__(16);

/*!
 * Object Display util
 */

exports.objDisplay = __webpack_require__(40);

/*!
 * Flag utility
 */

exports.flag = __webpack_require__(1);

/*!
 * Flag transferring utility
 */

exports.transferFlags = __webpack_require__(9);

/*!
 * Deep equal utility
 */

exports.eql = __webpack_require__(74);

/*!
 * Deep path info
 */

exports.getPathInfo = pathval.getPathInfo;

/*!
 * Check if a property exists
 */

exports.hasProperty = pathval.hasProperty;

/*!
 * Function name
 */

exports.getName = __webpack_require__(38);

/*!
 * add Property
 */

exports.addProperty = __webpack_require__(75);

/*!
 * add Method
 */

exports.addMethod = __webpack_require__(76);

/*!
 * overwrite Property
 */

exports.overwriteProperty = __webpack_require__(77);

/*!
 * overwrite Method
 */

exports.overwriteMethod = __webpack_require__(78);

/*!
 * Add a chainable method
 */

exports.addChainableMethod = __webpack_require__(79);

/*!
 * Overwrite chainable method
 */

exports.overwriteChainableMethod = __webpack_require__(80);

/*!
 * Compare by inspect method
 */

exports.compareByInspect = __webpack_require__(81);

/*!
 * Get own enumerable property symbols method
 */

exports.getOwnEnumerablePropertySymbols = __webpack_require__(41);

/*!
 * Get own enumerable properties method
 */

exports.getOwnEnumerableProperties = __webpack_require__(82);

/*!
 * Checks error against a given set of criteria
 */

exports.checkError = __webpack_require__(83);

/*!
 * Proxify util
 */

exports.proxify = __webpack_require__(19);

/*!
 * addLengthGuard util
 */

exports.addLengthGuard = __webpack_require__(18);

/*!
 * isProxyEnabled helper
 */

exports.isProxyEnabled = __webpack_require__(17);

/*!
 * isNaN method
 */

exports.isNaN = __webpack_require__(84);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* !
 * Chai - pathval utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * @see https://github.com/logicalparadox/filtr
 * MIT Licensed
 */

/**
 * ### .hasProperty(object, name)
 *
 * This allows checking whether an object has own
 * or inherited from prototype chain named property.
 *
 * Basically does the same thing as the `in`
 * operator but works properly with null/undefined values
 * and other primitives.
 *
 *     var obj = {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *
 * The following would be the results.
 *
 *     hasProperty(obj, 'str');  // true
 *     hasProperty(obj, 'constructor');  // true
 *     hasProperty(obj, 'bar');  // false
 *
 *     hasProperty(obj.str, 'length'); // true
 *     hasProperty(obj.str, 1);  // true
 *     hasProperty(obj.str, 5);  // false
 *
 *     hasProperty(obj.arr, 'length');  // true
 *     hasProperty(obj.arr, 2);  // true
 *     hasProperty(obj.arr, 3);  // false
 *
 * @param {Object} object
 * @param {String|Symbol} name
 * @returns {Boolean} whether it exists
 * @namespace Utils
 * @name hasProperty
 * @api public
 */

function hasProperty(obj, name) {
  if (typeof obj === 'undefined' || obj === null) {
    return false;
  }

  // The `in` operator does not work with primitives.
  return name in Object(obj);
}

/* !
 * ## parsePath(path)
 *
 * Helper function used to parse string object
 * paths. Use in conjunction with `internalGetPathValue`.
 *
 *      var parsed = parsePath('myobject.property.subprop');
 *
 * ### Paths:
 *
 * * Can be infinitely deep and nested.
 * * Arrays are also valid using the formal `myobject.document[3].property`.
 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
 *
 * @param {String} path
 * @returns {Object} parsed
 * @api private
 */

function parsePath(path) {
  var str = path.replace(/([^\\])\[/g, '$1.[');
  var parts = str.match(/(\\\.|[^.]+?)+/g);
  return parts.map(function mapMatches(value) {
    var regexp = /^\[(\d+)\]$/;
    var mArr = regexp.exec(value);
    var parsed = null;
    if (mArr) {
      parsed = { i: parseFloat(mArr[1]) };
    } else {
      parsed = { p: value.replace(/\\([.\[\]])/g, '$1') };
    }

    return parsed;
  });
}

/* !
 * ## internalGetPathValue(obj, parsed[, pathDepth])
 *
 * Helper companion function for `.parsePath` that returns
 * the value located at the parsed address.
 *
 *      var value = getPathValue(obj, parsed);
 *
 * @param {Object} object to search against
 * @param {Object} parsed definition from `parsePath`.
 * @param {Number} depth (nesting level) of the property we want to retrieve
 * @returns {Object|Undefined} value
 * @api private
 */

function internalGetPathValue(obj, parsed, pathDepth) {
  var temporaryValue = obj;
  var res = null;
  pathDepth = (typeof pathDepth === 'undefined' ? parsed.length : pathDepth);

  for (var i = 0; i < pathDepth; i++) {
    var part = parsed[i];
    if (temporaryValue) {
      if (typeof part.p === 'undefined') {
        temporaryValue = temporaryValue[part.i];
      } else {
        temporaryValue = temporaryValue[part.p];
      }

      if (i === (pathDepth - 1)) {
        res = temporaryValue;
      }
    }
  }

  return res;
}

/* !
 * ## internalSetPathValue(obj, value, parsed)
 *
 * Companion function for `parsePath` that sets
 * the value located at a parsed address.
 *
 *  internalSetPathValue(obj, 'value', parsed);
 *
 * @param {Object} object to search and define on
 * @param {*} value to use upon set
 * @param {Object} parsed definition from `parsePath`
 * @api private
 */

function internalSetPathValue(obj, val, parsed) {
  var tempObj = obj;
  var pathDepth = parsed.length;
  var part = null;
  // Here we iterate through every part of the path
  for (var i = 0; i < pathDepth; i++) {
    var propName = null;
    var propVal = null;
    part = parsed[i];

    // If it's the last part of the path, we set the 'propName' value with the property name
    if (i === (pathDepth - 1)) {
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Now we set the property with the name held by 'propName' on object with the desired val
      tempObj[propName] = val;
    } else if (typeof part.p !== 'undefined' && tempObj[part.p]) {
      tempObj = tempObj[part.p];
    } else if (typeof part.i !== 'undefined' && tempObj[part.i]) {
      tempObj = tempObj[part.i];
    } else {
      // If the obj doesn't have the property we create one with that name to define it
      var next = parsed[i + 1];
      // Here we set the name of the property which will be defined
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Here we decide if this property will be an array or a new object
      propVal = typeof next.p === 'undefined' ? [] : {};
      tempObj[propName] = propVal;
      tempObj = tempObj[propName];
    }
  }
}

/**
 * ### .getPathInfo(object, path)
 *
 * This allows the retrieval of property info in an
 * object given a string path.
 *
 * The path info consists of an object with the
 * following properties:
 *
 * * parent - The parent object of the property referenced by `path`
 * * name - The name of the final property, a number if it was an array indexer
 * * value - The value of the property, if it exists, otherwise `undefined`
 * * exists - Whether the property exists or not
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} info
 * @namespace Utils
 * @name getPathInfo
 * @api public
 */

function getPathInfo(obj, path) {
  var parsed = parsePath(path);
  var last = parsed[parsed.length - 1];
  var info = {
    parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
    name: last.p || last.i,
    value: internalGetPathValue(obj, parsed),
  };
  info.exists = hasProperty(info.parent, info.name);

  return info;
}

/**
 * ### .getPathValue(object, path)
 *
 * This allows the retrieval of values in an
 * object given a string path.
 *
 *     var obj = {
 *         prop1: {
 *             arr: ['a', 'b', 'c']
 *           , str: 'Hello'
 *         }
 *       , prop2: {
 *             arr: [ { nested: 'Universe' } ]
 *           , str: 'Hello again!'
 *         }
 *     }
 *
 * The following would be the results.
 *
 *     getPathValue(obj, 'prop1.str'); // Hello
 *     getPathValue(obj, 'prop1.att[2]'); // b
 *     getPathValue(obj, 'prop2.arr[0].nested'); // Universe
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} value or `undefined`
 * @namespace Utils
 * @name getPathValue
 * @api public
 */

function getPathValue(obj, path) {
  var info = getPathInfo(obj, path);
  return info.value;
}

/**
 * ### .setPathValue(object, path, value)
 *
 * Define the value in an object at a given string path.
 *
 * ```js
 * var obj = {
 *     prop1: {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *   , prop2: {
 *         arr: [ { nested: 'Universe' } ]
 *       , str: 'Hello again!'
 *     }
 * };
 * ```
 *
 * The following would be acceptable.
 *
 * ```js
 * var properties = require('tea-properties');
 * properties.set(obj, 'prop1.str', 'Hello Universe!');
 * properties.set(obj, 'prop1.arr[2]', 'B');
 * properties.set(obj, 'prop2.arr[0].nested.value', { hello: 'universe' });
 * ```
 *
 * @param {Object} object
 * @param {String} path
 * @param {Mixed} value
 * @api private
 */

function setPathValue(obj, path, val) {
  var parsed = parsePath(path);
  internalSetPathValue(obj, val, parsed);
  return obj;
}

module.exports = {
  hasProperty: hasProperty,
  getPathInfo: getPathInfo,
  getPathValue: getPathValue,
  setPathValue: setPathValue,
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var flag = __webpack_require__(1);

/**
 * ### .test(object, expression)
 *
 * Test and object for expression.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name test
 */

module.exports = function test(obj, args) {
  var negate = flag(obj, 'negate')
    , expr = args[0];
  return negate ? !expr : expr;
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .expectTypes(obj, types)
 *
 * Ensures that the object being tested against is of a valid type.
 *
 *     utils.expectTypes(this, ['array', 'object', 'string']);
 *
 * @param {Mixed} obj constructed Assertion
 * @param {Array} type A list of allowed types for this assertion
 * @namespace Utils
 * @name expectTypes
 * @api public
 */

var AssertionError = __webpack_require__(36);
var flag = __webpack_require__(1);
var type = __webpack_require__(25);

module.exports = function expectTypes(obj, types) {
  var flagMsg = flag(obj, 'message');
  var ssfi = flag(obj, 'ssfi');

  flagMsg = flagMsg ? flagMsg + ': ' : '';

  obj = flag(obj, 'object');
  types = types.map(function (t) { return t.toLowerCase(); });
  types.sort();

  // Transforms ['lorem', 'ipsum'] into 'a lorem, or an ipsum'
  var str = types.map(function (t, index) {
    var art = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(t.charAt(0)) ? 'an' : 'a';
    var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
    return or + art + ' ' + t;
  }).join(', ');

  var objType = type(obj).toLowerCase();

  if (!types.some(function (expected) { return objType === expected; })) {
    throw new AssertionError(
      flagMsg + 'object tested must be ' + str + ', but ' + objType + ' given',
      undefined,
      ssfi
    );
  }
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var flag = __webpack_require__(1)
  , getActual = __webpack_require__(37)
  , inspect = __webpack_require__(16)
  , objDisplay = __webpack_require__(40);

/**
 * ### .getMessage(object, message, negateMessage)
 *
 * Construct the error message based on flags
 * and template tags. Template tags will return
 * a stringified inspection of the object referenced.
 *
 * Message template tags:
 * - `#{this}` current asserted object
 * - `#{act}` actual value
 * - `#{exp}` expected value
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getMessage
 * @api public
 */

module.exports = function getMessage(obj, args) {
  var negate = flag(obj, 'negate')
    , val = flag(obj, 'object')
    , expected = args[3]
    , actual = getActual(obj, args)
    , msg = negate ? args[2] : args[1]
    , flagMsg = flag(obj, 'message');

  if(typeof msg === "function") msg = msg();
  msg = msg || '';
  msg = msg
    .replace(/#\{this\}/g, function () { return objDisplay(val); })
    .replace(/#\{act\}/g, function () { return objDisplay(actual); })
    .replace(/#\{exp\}/g, function () { return objDisplay(expected); });

  return flagMsg ? flagMsg + ': ' + msg : msg;
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getEnumerableProperties(object)
 *
 * This allows the retrieval of enumerable property names of an object,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getEnumerableProperties
 * @api public
 */

module.exports = function getEnumerableProperties(object) {
  var result = [];
  for (var name in object) {
    result.push(name);
  }
  return result;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* globals Symbol: false, Uint8Array: false, WeakMap: false */
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var type = __webpack_require__(25);
function FakeMap() {
  this._key = 'chai/deep-eql__' + Math.random() + Date.now();
}

FakeMap.prototype = {
  get: function getMap(key) {
    return key[this._key];
  },
  set: function setMap(key, value) {
    if (Object.isExtensible(key)) {
      Object.defineProperty(key, this._key, {
        value: value,
        configurable: true,
      });
    }
  },
};

var MemoizeMap = typeof WeakMap === 'function' ? WeakMap : FakeMap;
/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return null;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    var result = leftHandMap.get(rightHandOperand);
    if (typeof result === 'boolean') {
      return result;
    }
  }
  return null;
}

/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    leftHandMap.set(rightHandOperand, result);
  } else {
    leftHandMap = new MemoizeMap();
    leftHandMap.set(rightHandOperand, result);
    memoizeMap.set(leftHandOperand, leftHandMap);
  }
}

/*!
 * Primary Export
 */

module.exports = deepEqual;
module.exports.MemoizeMap = MemoizeMap;

/**
 * Assert deeply nested sameValue equality between two objects of any type.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
 */
function deepEqual(leftHandOperand, rightHandOperand, options) {
  // If we have a comparator, we can't assume anything; so bail to its check first.
  if (options && options.comparator) {
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  }

  var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
  if (simpleResult !== null) {
    return simpleResult;
  }

  // Deeper comparisons are pushed through to a larger function
  return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}

/**
 * Many comparisons can be canceled out early via simple equality or primitive checks.
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @return {Boolean|null} equal match
 */
function simpleEqual(leftHandOperand, rightHandOperand) {
  // Equal references (except for Numbers) can be returned early
  if (leftHandOperand === rightHandOperand) {
    // Handle +-0 cases
    return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
  }

  // handle NaN cases
  if (
    leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
    rightHandOperand !== rightHandOperand // eslint-disable-line no-self-compare
  ) {
    return true;
  }

  // Anything that is not an 'object', i.e. symbols, functions, booleans, numbers,
  // strings, and undefined, can be compared by reference.
  if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    // Easy out b/c it would have passed the first equality check
    return false;
  }
  return null;
}

/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
  options = options || {};
  options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
  var comparator = options && options.comparator;

  // Check if a memoized result exists.
  var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
  if (memoizeResultLeft !== null) {
    return memoizeResultLeft;
  }
  var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
  if (memoizeResultRight !== null) {
    return memoizeResultRight;
  }

  // If a comparator is present, use it.
  if (comparator) {
    var comparatorResult = comparator(leftHandOperand, rightHandOperand);
    // Comparators may return null, in which case we want to go back to default behavior.
    if (comparatorResult === false || comparatorResult === true) {
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
      return comparatorResult;
    }
    // To allow comparators to override *any* behavior, we ran them first. Since it didn't decide
    // what to do, we need to make sure to return the basic tests first before we move on.
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) {
      // Don't memoize this, it takes longer to set/retrieve than to just compare.
      return simpleResult;
    }
  }

  var leftHandType = type(leftHandOperand);
  if (leftHandType !== type(rightHandOperand)) {
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
    return false;
  }

  // Temporarily set the operands in the memoize object to prevent blowing the stack
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);

  var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
  return result;
}

function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
  switch (leftHandType) {
    case 'String':
    case 'Number':
    case 'Boolean':
    case 'Date':
      // If these types are their instance types (e.g. `new Number`) then re-deepEqual against their values
      return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
    case 'Promise':
    case 'Symbol':
    case 'function':
    case 'WeakMap':
    case 'WeakSet':
    case 'Error':
      return leftHandOperand === rightHandOperand;
    case 'Arguments':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'Array':
      return iterableEqual(leftHandOperand, rightHandOperand, options);
    case 'RegExp':
      return regexpEqual(leftHandOperand, rightHandOperand);
    case 'Generator':
      return generatorEqual(leftHandOperand, rightHandOperand, options);
    case 'DataView':
      return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
    case 'ArrayBuffer':
      return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
    case 'Set':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case 'Map':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    default:
      return objectEqual(leftHandOperand, rightHandOperand, options);
  }
}

/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */

function regexpEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand.toString() === rightHandOperand.toString();
}

/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function entriesEqual(leftHandOperand, rightHandOperand, options) {
  // IE11 doesn't support Set#entries or Set#@@iterator, so we need manually populate using Set#forEach
  if (leftHandOperand.size !== rightHandOperand.size) {
    return false;
  }
  if (leftHandOperand.size === 0) {
    return true;
  }
  var leftHandItems = [];
  var rightHandItems = [];
  leftHandOperand.forEach(function gatherEntries(key, value) {
    leftHandItems.push([ key, value ]);
  });
  rightHandOperand.forEach(function gatherEntries(key, value) {
    rightHandItems.push([ key, value ]);
  });
  return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}

/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function iterableEqual(leftHandOperand, rightHandOperand, options) {
  var length = leftHandOperand.length;
  if (length !== rightHandOperand.length) {
    return false;
  }
  if (length === 0) {
    return true;
  }
  var index = -1;
  while (++index < length) {
    if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function generatorEqual(leftHandOperand, rightHandOperand, options) {
  return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}

/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */
function hasIteratorFunction(target) {
  return typeof Symbol !== 'undefined' &&
    typeof target === 'object' &&
    typeof Symbol.iterator !== 'undefined' &&
    typeof target[Symbol.iterator] === 'function';
}

/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */
function getIteratorEntries(target) {
  if (hasIteratorFunction(target)) {
    try {
      return getGeneratorEntries(target[Symbol.iterator]());
    } catch (iteratorError) {
      return [];
    }
  }
  return [];
}

/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */
function getGeneratorEntries(generator) {
  var generatorResult = generator.next();
  var accumulator = [ generatorResult.value ];
  while (generatorResult.done === false) {
    generatorResult = generator.next();
    accumulator.push(generatorResult.value);
  }
  return accumulator;
}

/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */
function getEnumerableKeys(target) {
  var keys = [];
  for (var key in target) {
    keys.push(key);
  }
  return keys;
}

/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
  var length = keys.length;
  if (length === 0) {
    return true;
  }
  for (var i = 0; i < length; i += 1) {
    if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function objectEqual(leftHandOperand, rightHandOperand, options) {
  var leftHandKeys = getEnumerableKeys(leftHandOperand);
  var rightHandKeys = getEnumerableKeys(rightHandOperand);
  if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
    leftHandKeys.sort();
    rightHandKeys.sort();
    if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
      return false;
    }
    return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
  }

  var leftHandEntries = getIteratorEntries(leftHandOperand);
  var rightHandEntries = getIteratorEntries(rightHandOperand);
  if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
    leftHandEntries.sort();
    rightHandEntries.sort();
    return iterableEqual(leftHandEntries, rightHandEntries, options);
  }

  if (leftHandKeys.length === 0 &&
      leftHandEntries.length === 0 &&
      rightHandKeys.length === 0 &&
      rightHandEntries.length === 0) {
    return true;
  }

  return false;
}

/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */
function isPrimitive(value) {
  return value === null || typeof value !== 'object';
}


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = __webpack_require__(7);
var flag = __webpack_require__(1);
var isProxyEnabled = __webpack_require__(17);
var transferFlags = __webpack_require__(9);

/**
 * ### .addProperty(ctx, name, getter)
 *
 * Adds a property to the prototype of an object.
 *
 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.instanceof(Foo);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.foo;
 *
 * @param {Object} ctx object to which the property is added
 * @param {String} name of property to add
 * @param {Function} getter function to be used for name
 * @namespace Utils
 * @name addProperty
 * @api public
 */

module.exports = function addProperty(ctx, name, getter) {
  getter = getter === undefined ? function () {} : getter;

  Object.defineProperty(ctx, name,
    { get: function propertyGetter() {
        // Setting the `ssfi` flag to `propertyGetter` causes this function to
        // be the starting point for removing implementation frames from the
        // stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
          flag(this, 'ssfi', propertyGetter);
        }

        var result = getter.call(this);
        if (result !== undefined)
          return result;

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var addLengthGuard = __webpack_require__(18);
var chai = __webpack_require__(7);
var flag = __webpack_require__(1);
var proxify = __webpack_require__(19);
var transferFlags = __webpack_require__(9);

/**
 * ### .addMethod(ctx, name, method)
 *
 * Adds a method to the prototype of an object.
 *
 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(fooStr).to.be.foo('bar');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for name
 * @namespace Utils
 * @name addMethod
 * @api public
 */

module.exports = function addMethod(ctx, name, method) {
  var methodWrapper = function () {
    // Setting the `ssfi` flag to `methodWrapper` causes this function to be the
    // starting point for removing implementation frames from the stack trace of
    // a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag(this, 'lockSsfi')) {
      flag(this, 'ssfi', methodWrapper);
    }

    var result = method.apply(this, arguments);
    if (result !== undefined)
      return result;

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  addLengthGuard(methodWrapper, name, false);
  ctx[name] = proxify(methodWrapper, name);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = __webpack_require__(7);
var flag = __webpack_require__(1);
var isProxyEnabled = __webpack_require__(17);
var transferFlags = __webpack_require__(9);

/**
 * ### .overwriteProperty(ctx, name, fn)
 *
 * Overwites an already existing property getter and provides
 * access to previous value. Must return function to use as getter.
 *
 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
 *       return function () {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.name).to.equal('bar');
 *         } else {
 *           _super.call(this);
 *         }
 *       }
 *     });
 *
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.ok;
 *
 * @param {Object} ctx object whose property is to be overwritten
 * @param {String} name of property to overwrite
 * @param {Function} getter function that returns a getter function to be used for name
 * @namespace Utils
 * @name overwriteProperty
 * @api public
 */

module.exports = function overwriteProperty(ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name)
    , _super = function () {};

  if (_get && 'function' === typeof _get.get)
    _super = _get.get

  Object.defineProperty(ctx, name,
    { get: function overwritingPropertyGetter() {
        // Setting the `ssfi` flag to `overwritingPropertyGetter` causes this
        // function to be the starting point for removing implementation frames
        // from the stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
          flag(this, 'ssfi', overwritingPropertyGetter);
        }

        // Setting the `lockSsfi` flag to `true` prevents the overwritten
        // assertion from changing the `ssfi` flag. By this point, the `ssfi`
        // flag is already set to the correct starting point for this assertion.
        var origLockSsfi = flag(this, 'lockSsfi');
        flag(this, 'lockSsfi', true);
        var result = getter(_super).call(this);
        flag(this, 'lockSsfi', origLockSsfi);

        if (result !== undefined) {
          return result;
        }

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var addLengthGuard = __webpack_require__(18);
var chai = __webpack_require__(7);
var flag = __webpack_require__(1);
var proxify = __webpack_require__(19);
var transferFlags = __webpack_require__(9);

/**
 * ### .overwriteMethod(ctx, name, fn)
 *
 * Overwites an already existing method and provides
 * access to previous function. Must return function
 * to be used for name.
 *
 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
 *       return function (str) {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.value).to.equal(str);
 *         } else {
 *           _super.apply(this, arguments);
 *         }
 *       }
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.equal('bar');
 *
 * @param {Object} ctx object whose method is to be overwritten
 * @param {String} name of method to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @namespace Utils
 * @name overwriteMethod
 * @api public
 */

module.exports = function overwriteMethod(ctx, name, method) {
  var _method = ctx[name]
    , _super = function () {
      throw new Error(name + ' is not a function');
    };

  if (_method && 'function' === typeof _method)
    _super = _method;

  var overwritingMethodWrapper = function () {
    // Setting the `ssfi` flag to `overwritingMethodWrapper` causes this
    // function to be the starting point for removing implementation frames from
    // the stack trace of a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag(this, 'lockSsfi')) {
      flag(this, 'ssfi', overwritingMethodWrapper);
    }

    // Setting the `lockSsfi` flag to `true` prevents the overwritten assertion
    // from changing the `ssfi` flag. By this point, the `ssfi` flag is already
    // set to the correct starting point for this assertion.
    var origLockSsfi = flag(this, 'lockSsfi');
    flag(this, 'lockSsfi', true);
    var result = method(_super).apply(this, arguments);
    flag(this, 'lockSsfi', origLockSsfi);

    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  }

  addLengthGuard(overwritingMethodWrapper, name, false);
  ctx[name] = proxify(overwritingMethodWrapper, name);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var addLengthGuard = __webpack_require__(18);
var chai = __webpack_require__(7);
var flag = __webpack_require__(1);
var proxify = __webpack_require__(19);
var transferFlags = __webpack_require__(9);

/*!
 * Module variables
 */

// Check whether `Object.setPrototypeOf` is supported
var canSetPrototype = typeof Object.setPrototypeOf === 'function';

// Without `Object.setPrototypeOf` support, this module will need to add properties to a function.
// However, some of functions' own props are not configurable and should be skipped.
var testFn = function() {};
var excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
  var propDesc = Object.getOwnPropertyDescriptor(testFn, name);

  // Note: PhantomJS 1.x includes `callee` as one of `testFn`'s own properties,
  // but then returns `undefined` as the property descriptor for `callee`. As a
  // workaround, we perform an otherwise unnecessary type-check for `propDesc`,
  // and then filter it out if it's not an object as it should be.
  if (typeof propDesc !== 'object')
    return true;

  return !propDesc.configurable;
});

// Cache `Function` properties
var call  = Function.prototype.call,
    apply = Function.prototype.apply;

/**
 * ### .addChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Adds a method to an object, such that the method can also be chained.
 *
 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
 *
 * The result can then be used as both a method assertion, executing both `method` and
 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
 *
 *     expect(fooStr).to.be.foo('bar');
 *     expect(fooStr).to.be.foo.equal('foo');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for `name`, when called
 * @param {Function} chainingBehavior function to be called every time the property is accessed
 * @namespace Utils
 * @name addChainableMethod
 * @api public
 */

module.exports = function addChainableMethod(ctx, name, method, chainingBehavior) {
  if (typeof chainingBehavior !== 'function') {
    chainingBehavior = function () { };
  }

  var chainableBehavior = {
      method: method
    , chainingBehavior: chainingBehavior
  };

  // save the methods so we can overwrite them later, if we need to.
  if (!ctx.__methods) {
    ctx.__methods = {};
  }
  ctx.__methods[name] = chainableBehavior;

  Object.defineProperty(ctx, name,
    { get: function chainableMethodGetter() {
        chainableBehavior.chainingBehavior.call(this);

        var chainableMethodWrapper = function () {
          // Setting the `ssfi` flag to `chainableMethodWrapper` causes this
          // function to be the starting point for removing implementation
          // frames from the stack trace of a failed assertion.
          //
          // However, we only want to use this function as the starting point if
          // the `lockSsfi` flag isn't set.
          //
          // If the `lockSsfi` flag is set, then this assertion is being
          // invoked from inside of another assertion. In this case, the `ssfi`
          // flag has already been set by the outer assertion.
          //
          // Note that overwriting a chainable method merely replaces the saved
          // methods in `ctx.__methods` instead of completely replacing the
          // overwritten assertion. Therefore, an overwriting assertion won't
          // set the `ssfi` or `lockSsfi` flags.
          if (!flag(this, 'lockSsfi')) {
            flag(this, 'ssfi', chainableMethodWrapper);
          }

          var result = chainableBehavior.method.apply(this, arguments);
          if (result !== undefined) {
            return result;
          }

          var newAssertion = new chai.Assertion();
          transferFlags(this, newAssertion);
          return newAssertion;
        };

        addLengthGuard(chainableMethodWrapper, name, true);

        // Use `Object.setPrototypeOf` if available
        if (canSetPrototype) {
          // Inherit all properties from the object by replacing the `Function` prototype
          var prototype = Object.create(this);
          // Restore the `call` and `apply` methods from `Function`
          prototype.call = call;
          prototype.apply = apply;
          Object.setPrototypeOf(chainableMethodWrapper, prototype);
        }
        // Otherwise, redefine all properties (slow!)
        else {
          var asserterNames = Object.getOwnPropertyNames(ctx);
          asserterNames.forEach(function (asserterName) {
            if (excludeNames.indexOf(asserterName) !== -1) {
              return;
            }

            var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
            Object.defineProperty(chainableMethodWrapper, asserterName, pd);
          });
        }

        transferFlags(this, chainableMethodWrapper);
        return proxify(chainableMethodWrapper);
      }
    , configurable: true
  });
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = __webpack_require__(7);
var transferFlags = __webpack_require__(9);

/**
 * ### .overwriteChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Overwites an already existing chainable method
 * and provides access to the previous function or
 * property.  Must return functions to be used for
 * name.
 *
 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'lengthOf',
 *       function (_super) {
 *       }
 *     , function (_super) {
 *       }
 *     );
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.have.lengthOf(3);
 *     expect(myFoo).to.have.lengthOf.above(3);
 *
 * @param {Object} ctx object whose method / property is to be overwritten
 * @param {String} name of method / property to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @param {Function} chainingBehavior function that returns a function to be used for property
 * @namespace Utils
 * @name overwriteChainableMethod
 * @api public
 */

module.exports = function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
  var chainableBehavior = ctx.__methods[name];

  var _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = function overwritingChainableMethodGetter() {
    var result = chainingBehavior(_chainingBehavior).call(this);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  var _method = chainableBehavior.method;
  chainableBehavior.method = function overwritingChainableMethodWrapper() {
    var result = method(_method).apply(this, arguments);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var inspect = __webpack_require__(16);

/**
 * ### .compareByInspect(mixed, mixed)
 *
 * To be used as a compareFunction with Array.prototype.sort. Compares elements
 * using inspect instead of default behavior of using toString so that Symbols
 * and objects with irregular/missing toString can still be sorted without a
 * TypeError.
 *
 * @param {Mixed} first element to compare
 * @param {Mixed} second element to compare
 * @returns {Number} -1 if 'a' should come before 'b'; otherwise 1 
 * @name compareByInspect
 * @namespace Utils
 * @api public
 */

module.exports = function compareByInspect(a, b) {
  return inspect(a) < inspect(b) ? -1 : 1;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var getOwnEnumerablePropertySymbols = __webpack_require__(41);

/**
 * ### .getOwnEnumerableProperties(object)
 *
 * This allows the retrieval of directly-owned enumerable property names and
 * symbols of an object. This function is necessary because Object.keys only
 * returns enumerable property names, not enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerableProperties
 * @api public
 */

module.exports = function getOwnEnumerableProperties(obj) {
  return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* !
 * Chai - checkError utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .checkError
 *
 * Checks that an error conforms to a given set of criteria and/or retrieves information about it.
 *
 * @api public
 */

/**
 * ### .compatibleInstance(thrown, errorLike)
 *
 * Checks if two instances are compatible (strict equal).
 * Returns false if errorLike is not an instance of Error, because instances
 * can only be compatible if they're both error instances.
 *
 * @name compatibleInstance
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleInstance(thrown, errorLike) {
  return errorLike instanceof Error && thrown === errorLike;
}

/**
 * ### .compatibleConstructor(thrown, errorLike)
 *
 * Checks if two constructors are compatible.
 * This function can receive either an error constructor or
 * an error instance as the `errorLike` argument.
 * Constructors are compatible if they're the same or if one is
 * an instance of another.
 *
 * @name compatibleConstructor
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleConstructor(thrown, errorLike) {
  if (errorLike instanceof Error) {
    // If `errorLike` is an instance of any error we compare their constructors
    return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
  } else if (errorLike.prototype instanceof Error || errorLike === Error) {
    // If `errorLike` is a constructor that inherits from Error, we compare `thrown` to `errorLike` directly
    return thrown.constructor === errorLike || thrown instanceof errorLike;
  }

  return false;
}

/**
 * ### .compatibleMessage(thrown, errMatcher)
 *
 * Checks if an error's message is compatible with a matcher (String or RegExp).
 * If the message contains the String or passes the RegExp test,
 * it is considered compatible.
 *
 * @name compatibleMessage
 * @param {Error} thrown error
 * @param {String|RegExp} errMatcher to look for into the message
 * @namespace Utils
 * @api public
 */

function compatibleMessage(thrown, errMatcher) {
  var comparisonString = typeof thrown === 'string' ? thrown : thrown.message;
  if (errMatcher instanceof RegExp) {
    return errMatcher.test(comparisonString);
  } else if (typeof errMatcher === 'string') {
    return comparisonString.indexOf(errMatcher) !== -1; // eslint-disable-line no-magic-numbers
  }

  return false;
}

/**
 * ### .getFunctionName(constructorFn)
 *
 * Returns the name of a function.
 * This also includes a polyfill function if `constructorFn.name` is not defined.
 *
 * @name getFunctionName
 * @param {Function} constructorFn
 * @namespace Utils
 * @api private
 */

var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;
function getFunctionName(constructorFn) {
  var name = '';
  if (typeof constructorFn.name === 'undefined') {
    // Here we run a polyfill if constructorFn.name is not defined
    var match = String(constructorFn).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    name = constructorFn.name;
  }

  return name;
}

/**
 * ### .getConstructorName(errorLike)
 *
 * Gets the constructor name for an Error instance or constructor itself.
 *
 * @name getConstructorName
 * @param {Error|ErrorConstructor} errorLike
 * @namespace Utils
 * @api public
 */

function getConstructorName(errorLike) {
  var constructorName = errorLike;
  if (errorLike instanceof Error) {
    constructorName = getFunctionName(errorLike.constructor);
  } else if (typeof errorLike === 'function') {
    // If `err` is not an instance of Error it is an error constructor itself or another function.
    // If we've got a common function we get its name, otherwise we may need to create a new instance
    // of the error just in case it's a poorly-constructed error. Please see chaijs/chai/issues/45 to know more.
    constructorName = getFunctionName(errorLike).trim() ||
        getFunctionName(new errorLike()); // eslint-disable-line new-cap
  }

  return constructorName;
}

/**
 * ### .getMessage(errorLike)
 *
 * Gets the error message from an error.
 * If `err` is a String itself, we return it.
 * If the error has no message, we return an empty string.
 *
 * @name getMessage
 * @param {Error|String} errorLike
 * @namespace Utils
 * @api public
 */

function getMessage(errorLike) {
  var msg = '';
  if (errorLike && errorLike.message) {
    msg = errorLike.message;
  } else if (typeof errorLike === 'string') {
    msg = errorLike;
  }

  return msg;
}

module.exports = {
  compatibleInstance: compatibleInstance,
  compatibleConstructor: compatibleConstructor,
  compatibleMessage: compatibleMessage,
  getMessage: getMessage,
  getConstructorName: getConstructorName,
};


/***/ }),
/* 84 */
/***/ (function(module, exports) {

/*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */

/**
 * ### .isNaN(value)
 *
 * Checks if the given value is NaN or not.
 *
 *     utils.isNaN(NaN); // true
 *
 * @param {Value} The value which has to be checked if it is NaN
 * @name isNaN
 * @api private
 */

function isNaN(value) {
  // Refer http://www.ecma-international.org/ecma-262/6.0/#sec-isnan-number
  // section's NOTE.
  return value !== value;
}

// If ECMAScript 6's Number.isNaN is present, prefer that.
module.exports = Number.isNaN || isNaN;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var config = __webpack_require__(8);

module.exports = function (_chai, util) {
  /*!
   * Module dependencies.
   */

  var AssertionError = _chai.AssertionError
    , flag = util.flag;

  /*!
   * Module export.
   */

  _chai.Assertion = Assertion;

  /*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   */

  function Assertion (obj, msg, ssfi, lockSsfi) {
    flag(this, 'ssfi', ssfi || Assertion);
    flag(this, 'lockSsfi', lockSsfi);
    flag(this, 'object', obj);
    flag(this, 'message', msg);

    return util.proxify(this);
  }

  Object.defineProperty(Assertion, 'includeStack', {
    get: function() {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      return config.includeStack;
    },
    set: function(value) {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      config.includeStack = value;
    }
  });

  Object.defineProperty(Assertion, 'showDiff', {
    get: function() {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      return config.showDiff;
    },
    set: function(value) {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      config.showDiff = value;
    }
  });

  Assertion.addProperty = function (name, fn) {
    util.addProperty(this.prototype, name, fn);
  };

  Assertion.addMethod = function (name, fn) {
    util.addMethod(this.prototype, name, fn);
  };

  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  Assertion.overwriteProperty = function (name, fn) {
    util.overwriteProperty(this.prototype, name, fn);
  };

  Assertion.overwriteMethod = function (name, fn) {
    util.overwriteMethod(this.prototype, name, fn);
  };

  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  /**
   * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
   *
   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
   *
   * @name assert
   * @param {Philosophical} expression to be tested
   * @param {String|Function} message or function that returns message to display if expression fails
   * @param {String|Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
   * @param {Mixed} expected value (remember to check for negation)
   * @param {Mixed} actual (optional) will default to `this.obj`
   * @param {Boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
   * @api private
   */

  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
    var ok = util.test(this, arguments);
    if (false !== showDiff) showDiff = true;
    if (undefined === expected && undefined === _actual) showDiff = false;
    if (true !== config.showDiff) showDiff = false;

    if (!ok) {
      msg = util.getMessage(this, arguments);
      var actual = util.getActual(this, arguments);
      throw new AssertionError(msg, {
          actual: actual
        , expected: expected
        , showDiff: showDiff
      }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
    }
  };

  /*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */

  Object.defineProperty(Assertion.prototype, '_obj',
    { get: function () {
        return flag(this, 'object');
      }
    , set: function (val) {
        flag(this, 'object', val);
      }
  });
};


/***/ }),
/* 86 */
/***/ (function(module, exports) {

/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, _) {
  var Assertion = chai.Assertion
    , AssertionError = chai.AssertionError
    , flag = _.flag;

  /**
   * ### Language Chains
   *
   * The following are provided as chainable getters to improve the readability
   * of your assertions.
   *
   * **Chains**
   *
   * - to
   * - be
   * - been
   * - is
   * - that
   * - which
   * - and
   * - has
   * - have
   * - with
   * - at
   * - of
   * - same
   * - but
   * - does
   *
   * @name language chains
   * @namespace BDD
   * @api public
   */

  [ 'to', 'be', 'been'
  , 'is', 'and', 'has', 'have'
  , 'with', 'that', 'which', 'at'
  , 'of', 'same', 'but', 'does' ].forEach(function (chain) {
    Assertion.addProperty(chain);
  });

  /**
   * ### .not
   *
   * Negates all assertions that follow in the chain.
   *
   *     expect(function () {}).to.not.throw();
   *     expect({a: 1}).to.not.have.property('b');
   *     expect([1, 2]).to.be.an('array').that.does.not.include(3);
   *
   * Just because you can negate any assertion with `.not` doesn't mean you
   * should. With great power comes great responsibility. It's often best to
   * assert that the one expected output was produced, rather than asserting
   * that one of countless unexpected outputs wasn't produced. See individual
   * assertions for specific guidance.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.equal(1); // Not recommended
   *
   * @name not
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('not', function () {
    flag(this, 'negate', true);
  });

  /**
   * ### .deep
   *
   * Causes all `.equal`, `.include`, `.members`, `.keys`, and `.property`
   * assertions that follow in the chain to use deep equality instead of strict
   * (`===`) equality. See the `deep-eql` project page for info on the deep
   * equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.keys([{a: 1}]);
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * @name deep
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('deep', function () {
    flag(this, 'deep', true);
  });

  /**
   * ### .nested
   *
   * Enables dot- and bracket-notation in all `.property` and `.include`
   * assertions that follow in the chain.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *     expect({'.a': {'[b]': 'x'}}).to.nested.include({'\\.a.\\[b\\]': 'x'});
   *
   * `.nested` cannot be combined with `.own`.
   *
   * @name nested
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('nested', function () {
    flag(this, 'nested', true);
  });

  /**
   * ### .own
   *
   * Causes all `.property` and `.include` assertions that follow in the chain
   * to ignore inherited properties.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.property('b').but.not.own.property('b'); 
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * `.own` cannot be combined with `.nested`.
   *
   * @name own
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('own', function () {
    flag(this, 'own', true);
  });

  /**
   * ### .ordered
   *
   * Causes all `.members` assertions that follow in the chain to require that
   * members be in the same order.
   *
   *     expect([1, 2]).to.have.ordered.members([1, 2])
   *       .but.not.have.ordered.members([2, 1]);
   *
   * When `.include` and `.ordered` are combined, the ordering begins at the
   * start of both arrays.
   *
   *     expect([1, 2, 3]).to.include.ordered.members([1, 2])
   *       .but.not.include.ordered.members([2, 3]);
   *
   * @name ordered
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ordered', function () {
    flag(this, 'ordered', true);
  });

  /**
   * ### .any
   *
   * Causes all `.keys` assertions that follow in the chain to only require that
   * the target have at least one of the given keys. This is the opposite of
   * `.all`, which requires that the target have all of the given keys.
   *
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name any
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('any', function () {
    flag(this, 'any', true);
    flag(this, 'all', false);
  });


  /**
   * ### .all
   *
   * Causes all `.keys` assertions that follow in the chain to require that the
   * target have all of the given keys. This is the opposite of `.any`, which
   * only requires that the target have at least one of the given keys.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` are
   * added earlier in the chain. However, it's often best to add `.all` anyway
   * because it improves readability.
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name all
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('all', function () {
    flag(this, 'all', true);
    flag(this, 'any', false);
  });

  /**
   * ### .a(type[, msg])
   *
   * Asserts that the target's type is equal to the given string `type`. Types
   * are case insensitive. See the `type-detect` project page for info on the
   * type detection algorithm: https://github.com/chaijs/type-detect.
   *
   *     expect('foo').to.be.a('string');
   *     expect({a: 1}).to.be.an('object');
   *     expect(null).to.be.a('null');
   *     expect(undefined).to.be.an('undefined');
   *     expect(new Error).to.be.an('error');
   *     expect(Promise.resolve()).to.be.a('promise');
   *     expect(new Float32Array).to.be.a('float32array');
   *     expect(Symbol()).to.be.a('symbol');
   *
   * `.a` supports objects that have a custom type set via `Symbol.toStringTag`.
   *
   *     var myObj = {
   *       [Symbol.toStringTag]: 'myCustomType'
   *     };
   *
   *     expect(myObj).to.be.a('myCustomType').but.not.an('object');
   *
   * It's often best to use `.a` to check a target's type before making more
   * assertions on the same target. That way, you avoid unexpected behavior from
   * any assertion that does different things based on the target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.a`. However, it's often best to
   * assert that the target is the expected type, rather than asserting that it
   * isn't one of many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.an('array'); // Not recommended
   *
   * `.a` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     expect(1).to.be.a('string', 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.a('string');
   *
   * `.a` can also be used as a language chain to improve the readability of
   * your assertions. 
   *
   *     expect({b: 2}).to.have.a.property('b');
   *
   * The alias `.an` can be used interchangeably with `.a`.
   *
   * @name a
   * @alias an
   * @param {String} type
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function an (type, msg) {
    if (msg) flag(this, 'message', msg);
    type = type.toLowerCase();
    var obj = flag(this, 'object')
      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';

    this.assert(
        type === _.type(obj).toLowerCase()
      , 'expected #{this} to be ' + article + type
      , 'expected #{this} not to be ' + article + type
    );
  }

  Assertion.addChainableMethod('an', an);
  Assertion.addChainableMethod('a', an);

  /**
   * ### .include(val[, msg])
   *
   * When the target is a string, `.include` asserts that the given string `val`
   * is a substring of the target.
   *
   *     expect('foobar').to.include('foo');
   *
   * When the target is an array, `.include` asserts that the given `val` is a
   * member of the target.
   *
   *     expect([1, 2, 3]).to.include(2);
   *
   * When the target is an object, `.include` asserts that the given object
   * `val`'s properties are a subset of the target's properties.
   *
   *     expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2});
   *
   * When the target is a Set or WeakSet, `.include` asserts that the given `val` is a
   * member of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Set([1, 2])).to.include(2);
   *
   * When the target is a Map, `.include` asserts that the given `val` is one of
   * the values of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.include(2);
   *
   * Because `.include` does different things based on the target's type, it's
   * important to check the target's type before using `.include`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *
   * By default, strict (`===`) equality is used to compare array members and
   * object properties. Add `.deep` earlier in the chain to use deep equality
   * instead (WeakSet targets are not supported). See the `deep-eql` project
   * page for info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   * By default, all of the target's properties are searched when working with
   * objects. This includes properties that are inherited and/or non-enumerable.
   * Add `.own` earlier in the chain to exclude the target's inherited
   * properties from the search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * Note that a target object is always only searched for `val`'s own
   * enumerable properties.
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({a: {b: 2}}).to.deep.own.include({a: {b: 2}});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 2}}).to.nested.include({'\\.a.\\[b\\]': 2});
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}}).to.deep.nested.include({'a.b[0]': {c: 3}});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.include`.
   *
   *     expect('foobar').to.not.include('taco');
   *     expect([1, 2, 3]).to.not.include(4);
   * 
   * However, it's dangerous to negate `.include` when the target is an object.
   * The problem is that it creates uncertain expectations by asserting that the
   * target object doesn't have all of `val`'s key/value pairs but may or may
   * not have some of them. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target object isn't even expected to have `val`'s keys, it's
   * often best to assert exactly that.
   *
   *     expect({c: 3}).to.not.have.any.keys('a', 'b'); // Recommended
   *     expect({c: 3}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * When the target object is expected to have `val`'s keys, it's often best to
   * assert that each of the properties has its expected value, rather than
   * asserting that each property doesn't have one of many unexpected values.
   *
   *     expect({a: 3, b: 4}).to.include({a: 3, b: 4}); // Recommended
   *     expect({a: 3, b: 4}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * `.include` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.include(4, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.include(4);
   *
   * `.include` can also be used as a language chain, causing all `.members` and
   * `.keys` assertions that follow in the chain to require the target to be a
   * superset of the expected set, rather than an identical set. Note that
   * `.members` ignores duplicates in the subset when `.include` is added.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * Note that adding `.any` earlier in the chain causes the `.keys` assertion
   * to ignore `.include`.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *
   * The aliases `.includes`, `.contain`, and `.contains` can be used
   * interchangeably with `.include`.
   *
   * @name include
   * @alias contain
   * @alias includes
   * @alias contains
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function SameValueZero(a, b) {
    return (_.isNaN(a) && _.isNaN(b)) || a === b;
  }

  function includeChainingBehavior () {
    flag(this, 'contains', true);
  }

  function include (val, msg) {
    if (msg) flag(this, 'message', msg);
    
    var obj = flag(this, 'object')
      , objType = _.type(obj).toLowerCase()
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate')
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , descriptor = isDeep ? 'deep ' : '';

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    var included = false;

    switch (objType) {
      case 'string':
        included = obj.indexOf(val) !== -1;
        break;

      case 'weakset':
        if (isDeep) {
          throw new AssertionError(
            flagMsg + 'unable to use .deep.include with WeakSet',
            undefined,
            ssfi
          );
        }

        included = obj.has(val);
        break;

      case 'map':
        var isEql = isDeep ? _.eql : SameValueZero;
        obj.forEach(function (item) {
          included = included || isEql(item, val);
        });
        break;

      case 'set':
        if (isDeep) {
          obj.forEach(function (item) {
            included = included || _.eql(item, val);
          });
        } else {
          included = obj.has(val);
        }
        break;

      case 'array':
        if (isDeep) {
          included = obj.some(function (item) {
            return _.eql(item, val);
          })
        } else {
          included = obj.indexOf(val) !== -1;
        }
        break;

      default:
        // This block is for asserting a subset of properties in an object.
        // `_.expectTypes` isn't used here because `.include` should work with
        // objects with a custom `@@toStringTag`.
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + 'object tested must be an array, a map, an object,'
              + ' a set, a string, or a weakset, but ' + objType + ' given',
            undefined,
            ssfi
          );
        }

        var props = Object.keys(val)
          , firstErr = null
          , numErrs = 0;
  
        props.forEach(function (prop) {
          var propAssertion = new Assertion(obj);
          _.transferFlags(this, propAssertion, true);
          flag(propAssertion, 'lockSsfi', true);
  
          if (!negate || props.length === 1) {
            propAssertion.property(prop, val[prop]);
            return;
          }
  
          try {
            propAssertion.property(prop, val[prop]);
          } catch (err) {
            if (!_.checkError.compatibleConstructor(err, AssertionError)) {
              throw err;
            }
            if (firstErr === null) firstErr = err;
            numErrs++;
          }
        }, this);
  
        // When validating .not.include with multiple properties, we only want
        // to throw an assertion error if all of the properties are included,
        // in which case we throw the first property assertion error that we
        // encountered.
        if (negate && props.length > 1 && numErrs === props.length) {
          throw firstErr;
        }
        return;
    }

    // Assert inclusion in collection or substring in a string.
    this.assert(
      included
      , 'expected #{this} to ' + descriptor + 'include ' + _.inspect(val)
      , 'expected #{this} to not ' + descriptor + 'include ' + _.inspect(val));
  }

  Assertion.addChainableMethod('include', include, includeChainingBehavior);
  Assertion.addChainableMethod('contain', include, includeChainingBehavior);
  Assertion.addChainableMethod('contains', include, includeChainingBehavior);
  Assertion.addChainableMethod('includes', include, includeChainingBehavior);

  /**
   * ### .ok
   *
   * Asserts that the target is loosely (`==`) equal to `true`. However, it's
   * often best to assert that the target is strictly (`===`) or deeply equal to
   * its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.ok; // Not recommended
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.be.ok; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.ok`.
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.not.be.ok; // Not recommended
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.ok; // Not recommended
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.be.ok; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.be.ok; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.ok;
   *
   * @name ok
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ok', function () {
    this.assert(
        flag(this, 'object')
      , 'expected #{this} to be truthy'
      , 'expected #{this} to be falsy');
  });

  /**
   * ### .true
   *
   * Asserts that the target is strictly (`===`) equal to `true`.
   *
   *     expect(true).to.be.true;
   *
   * Add `.not` earlier in the chain to negate `.true`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `true`.
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.true; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.true; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.true;
   *
   * @name true
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('true', function () {
    this.assert(
        true === flag(this, 'object')
      , 'expected #{this} to be true'
      , 'expected #{this} to be false'
      , flag(this, 'negate') ? false : true
    );
  });

  /**
   * ### .false
   *
   * Asserts that the target is strictly (`===`) equal to `false`.
   *
   *     expect(false).to.be.false;
   *
   * Add `.not` earlier in the chain to negate `.false`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `false`.
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.not.be.false; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.false; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(true, 'nooo why fail??').to.be.false;
   *
   * @name false
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('false', function () {
    this.assert(
        false === flag(this, 'object')
      , 'expected #{this} to be false'
      , 'expected #{this} to be true'
      , flag(this, 'negate') ? true : false
    );
  });

  /**
   * ### .null
   *
   * Asserts that the target is strictly (`===`) equal to `null`.
   *
   *     expect(null).to.be.null;
   *
   * Add `.not` earlier in the chain to negate `.null`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `null`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.null; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.null;
   *
   * @name null
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('null', function () {
    this.assert(
        null === flag(this, 'object')
      , 'expected #{this} to be null'
      , 'expected #{this} not to be null'
    );
  });

  /**
   * ### .undefined
   *
   * Asserts that the target is strictly (`===`) equal to `undefined`.
   *
   *     expect(undefined).to.be.undefined;
   *
   * Add `.not` earlier in the chain to negate `.undefined`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `undefined`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.undefined; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.undefined;
   *
   * @name undefined
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('undefined', function () {
    this.assert(
        undefined === flag(this, 'object')
      , 'expected #{this} to be undefined'
      , 'expected #{this} not to be undefined'
    );
  });

  /**
   * ### .NaN
   *
   * Asserts that the target is exactly `NaN`.
   *
   *     expect(NaN).to.be.NaN;
   *
   * Add `.not` earlier in the chain to negate `.NaN`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `NaN`.
   *
   *     expect('foo').to.equal('foo'); // Recommended
   *     expect('foo').to.not.be.NaN; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.NaN;
   *
   * @name NaN
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('NaN', function () {
    this.assert(
        _.isNaN(flag(this, 'object'))
        , 'expected #{this} to be NaN'
        , 'expected #{this} not to be NaN'
    );
  });

  /**
   * ### .exist
   *
   * Asserts that the target is not strictly (`===`) equal to either `null` or
   * `undefined`. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.exist; // Not recommended
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.exist; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.exist`.
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.exist; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.exist; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(null, 'nooo why fail??').to.exist;
   *
   * @name exist
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('exist', function () {
    var val = flag(this, 'object');
    this.assert(
        val !== null && val !== undefined
      , 'expected #{this} to exist'
      , 'expected #{this} to not exist'
    );
  });

  /**
   * ### .empty
   *
   * When the target is a string or array, `.empty` asserts that the target's
   * `length` property is strictly (`===`) equal to `0`.
   *
   *     expect([]).to.be.empty;
   *     expect('').to.be.empty;
   *
   * When the target is a map or set, `.empty` asserts that the target's `size`
   * property is strictly equal to `0`.
   *
   *     expect(new Set()).to.be.empty;
   *     expect(new Map()).to.be.empty;
   *
   * When the target is a non-function object, `.empty` asserts that the target
   * doesn't have any own enumerable properties. Properties with Symbol-based
   * keys are excluded from the count.
   *
   *     expect({}).to.be.empty;
   *
   * Because `.empty` does different things based on the target's type, it's
   * important to check the target's type before using `.empty`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.empty`. However, it's often
   * best to assert that the target contains its expected number of values,
   * rather than asserting that it's not empty.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.not.be.empty; // Not recommended
   *
   *     expect(new Set([1, 2, 3])).to.have.property('size', 3); // Recommended
   *     expect(new Set([1, 2, 3])).to.not.be.empty; // Not recommended
   *
   *     expect(Object.keys({a: 1})).to.have.lengthOf(1); // Recommended
   *     expect({a: 1}).to.not.be.empty; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect([1, 2, 3], 'nooo why fail??').to.be.empty;
   *
   * @name empty
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('empty', function () {
    var val = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , itemsCount;

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    switch (_.type(val).toLowerCase()) {
      case 'array':
      case 'string':
        itemsCount = val.length;
        break;
      case 'map':
      case 'set':
        itemsCount = val.size;
        break;
      case 'weakmap':
      case 'weakset':
        throw new AssertionError(
          flagMsg + '.empty was passed a weak collection',
          undefined,
          ssfi
        );
      case 'function':
        var msg = flagMsg + '.empty was passed a function ' + _.getName(val);
        throw new AssertionError(msg.trim(), undefined, ssfi);
      default:
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + '.empty was passed non-string primitive ' + _.inspect(val),
            undefined,
            ssfi
          );
        }
        itemsCount = Object.keys(val).length;
    }

    this.assert(
        0 === itemsCount
      , 'expected #{this} to be empty'
      , 'expected #{this} not to be empty'
    );
  });

  /**
   * ### .arguments
   *
   * Asserts that the target is an `arguments` object.
   *
   *     function test () {
   *       expect(arguments).to.be.arguments;
   *     }
   *
   *     test();
   *
   * Add `.not` earlier in the chain to negate `.arguments`. However, it's often
   * best to assert which type the target is expected to be, rather than
   * asserting that its not an `arguments` object.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.arguments; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({}, 'nooo why fail??').to.be.arguments;
   *
   * The alias `.Arguments` can be used interchangeably with `.arguments`.
   *
   * @name arguments
   * @alias Arguments
   * @namespace BDD
   * @api public
   */

  function checkArguments () {
    var obj = flag(this, 'object')
      , type = _.type(obj);
    this.assert(
        'Arguments' === type
      , 'expected #{this} to be arguments but got ' + type
      , 'expected #{this} to not be arguments'
    );
  }

  Assertion.addProperty('arguments', checkArguments);
  Assertion.addProperty('Arguments', checkArguments);

  /**
   * ### .equal(val[, msg])
   *
   * Asserts that the target is strictly (`===`) equal to the given `val`.
   *
   *     expect(1).to.equal(1);
   *     expect('foo').to.equal('foo');
   * 
   * Add `.deep` earlier in the chain to use deep equality instead. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) equals `[1, 2]`
   *     expect([1, 2]).to.deep.equal([1, 2]);
   *     expect([1, 2]).to.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.equal`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to one of countless unexpected values.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.equal(2); // Not recommended
   *
   * `.equal` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.equal(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.equal(2);
   *
   * The aliases `.equals` and `eq` can be used interchangeably with `.equal`.
   *
   * @name equal
   * @alias equals
   * @alias eq
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEqual (val, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'deep')) {
      return this.eql(val);
    } else {
      this.assert(
          val === obj
        , 'expected #{this} to equal #{exp}'
        , 'expected #{this} to not equal #{exp}'
        , val
        , this._obj
        , true
      );
    }
  }

  Assertion.addMethod('equal', assertEqual);
  Assertion.addMethod('equals', assertEqual);
  Assertion.addMethod('eq', assertEqual);

  /**
   * ### .eql(obj[, msg])
   *
   * Asserts that the target is deeply equal to the given `obj`. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object is deeply (but not strictly) equal to {a: 1}
   *     expect({a: 1}).to.eql({a: 1}).but.not.equal({a: 1});
   *
   *     // Target array is deeply (but not strictly) equal to [1, 2]
   *     expect([1, 2]).to.eql([1, 2]).but.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.eql`. However, it's often best
   * to assert that the target is deeply equal to its expected value, rather
   * than not deeply equal to one of countless unexpected values.
   *
   *     expect({a: 1}).to.eql({a: 1}); // Recommended
   *     expect({a: 1}).to.not.eql({b: 2}); // Not recommended
   *
   * `.eql` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect({a: 1}).to.eql({b: 2}, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.eql({b: 2});
   *
   * The alias `.eqls` can be used interchangeably with `.eql`.
   *
   * The `.deep.equal` assertion is almost identical to `.eql` but with one
   * difference: `.deep.equal` causes deep equality comparisons to also be used
   * for any other assertions that follow in the chain.
   *
   * @name eql
   * @alias eqls
   * @param {Mixed} obj
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEql(obj, msg) {
    if (msg) flag(this, 'message', msg);
    this.assert(
        _.eql(obj, flag(this, 'object'))
      , 'expected #{this} to deeply equal #{exp}'
      , 'expected #{this} to not deeply equal #{exp}'
      , obj
      , this._obj
      , true
    );
  }

  Assertion.addMethod('eql', assertEql);
  Assertion.addMethod('eqls', assertEql);

  /**
   * ### .above(n[, msg])
   *
   * Asserts that the target is a number or a date greater than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.above(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is greater than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.above(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.above`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(1).to.not.be.above(2); // Not recommended
   *
   * `.above` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.above(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.above(2);
   *
   * The aliases `.gt` and `.greaterThan` can be used interchangeably with
   * `.above`.
   *
   * @name above
   * @alias gt
   * @alias greaterThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertAbove (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }
    
    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to above must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to above must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len > n
        , 'expected #{this} to have a length above #{exp} but got #{act}'
        , 'expected #{this} to not have a length above #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj > n
        , 'expected #{this} to be above #{exp}'
        , 'expected #{this} to be at most #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('above', assertAbove);
  Assertion.addMethod('gt', assertAbove);
  Assertion.addMethod('greaterThan', assertAbove);

  /**
   * ### .least(n[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `n` respectively. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.at.least(1); // Not recommended
   *     expect(2).to.be.at.least(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is greater than or equal to the given number
   * `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.least(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.least`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.at.least(2); // Not recommended
   *
   * `.least` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.at.least(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.at.least(2);
   *
   * The alias `.gte` can be used interchangeably with `.least`.
   *
   * @name least
   * @alias gte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLeast (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to least must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to least must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len >= n
        , 'expected #{this} to have a length at least #{exp} but got #{act}'
        , 'expected #{this} to have a length below #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj >= n
        , 'expected #{this} to be at least #{exp}'
        , 'expected #{this} to be below #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('least', assertLeast);
  Assertion.addMethod('gte', assertLeast);

  /**
   * ### .below(n[, msg])
   *
   * Asserts that the target is a number or a date less than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.below(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is less than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.below(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.length(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.below(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.below`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.below(1); // Not recommended
   *
   * `.below` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.below(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.below(1);
   *
   * The aliases `.lt` and `.lessThan` can be used interchangeably with
   * `.below`.
   *
   * @name below
   * @alias lt
   * @alias lessThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertBelow (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to below must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to below must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len < n
        , 'expected #{this} to have a length below #{exp} but got #{act}'
        , 'expected #{this} to not have a length below #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj < n
        , 'expected #{this} to be below #{exp}'
        , 'expected #{this} to be at least #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('below', assertBelow);
  Assertion.addMethod('lt', assertBelow);
  Assertion.addMethod('lessThan', assertBelow);

  /**
   * ### .most(n[, msg])
   *
   * Asserts that the target is a number or a date less than or equal to the given number
   * or date `n` respectively. However, it's often best to assert that the target is equal to its
   * expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.at.most(2); // Not recommended
   *     expect(1).to.be.at.most(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is less than or equal to the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.most(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.most`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.at.most(1); // Not recommended
   *
   * `.most` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.at.most(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.at.most(1);
   *
   * The alias `.lte` can be used interchangeably with `.most`.
   *
   * @name most
   * @alias lte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertMost (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }
    
    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to most must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to most must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len <= n
        , 'expected #{this} to have a length at most #{exp} but got #{act}'
        , 'expected #{this} to have a length above #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj <= n
        , 'expected #{this} to be at most #{exp}'
        , 'expected #{this} to be above #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('most', assertMost);
  Assertion.addMethod('lte', assertMost);

  /**
   * ### .within(start, finish[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `start`, and less than or equal to the given number or date `finish` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.within(1, 3); // Not recommended
   *     expect(2).to.be.within(2, 3); // Not recommended
   *     expect(2).to.be.within(1, 2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is greater than or equal to the given number
   * `start`, and less than or equal to the given number `finish`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.within(2, 4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.within(2, 4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.within`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.within(2, 4); // Not recommended
   *
   * `.within` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(4).to.be.within(1, 3, 'nooo why fail??');
   *     expect(4, 'nooo why fail??').to.be.within(1, 3);
   *
   * @name within
   * @param {Number} start lower bound inclusive
   * @param {Number} finish upper bound inclusive
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('within', function (start, finish, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , startType = _.type(start).toLowerCase()
      , finishType = _.type(finish).toLowerCase()
      , shouldThrow = true
      , range = (startType === 'date' && finishType === 'date')
          ? start.toUTCString() + '..' + finish.toUTCString()
          : start + '..' + finish;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && (startType !== 'date' || finishType !== 'date'))) {
      errorMessage = msgPrefix + 'the arguments to within must be dates';
    } else if ((startType !== 'number' || finishType !== 'number') && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the arguments to within must be numbers';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len >= start && len <= finish
        , 'expected #{this} to have a length within ' + range
        , 'expected #{this} to not have a length within ' + range
      );
    } else {
      this.assert(
          obj >= start && obj <= finish
        , 'expected #{this} to be within ' + range
        , 'expected #{this} to not be within ' + range
      );
    }
  });

  /**
   * ### .instanceof(constructor[, msg])
   *
   * Asserts that the target is an instance of the given `constructor`.
   *
   *     function Cat () { }
   *
   *     expect(new Cat()).to.be.an.instanceof(Cat);
   *     expect([1, 2]).to.be.an.instanceof(Array);
   *
   * Add `.not` earlier in the chain to negate `.instanceof`.
   *
   *     expect({a: 1}).to.not.be.an.instanceof(Array);
   *
   * `.instanceof` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.be.an.instanceof(Array, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.an.instanceof(Array);
   *
   * Due to limitations in ES5, `.instanceof` may not always work as expected
   * when using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing built-in object such as
   * `Array`, `Error`, and `Map`. See your transpiler's docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * The alias `.instanceOf` can be used interchangeably with `.instanceof`.
   *
   * @name instanceof
   * @param {Constructor} constructor
   * @param {String} msg _optional_
   * @alias instanceOf
   * @namespace BDD
   * @api public
   */

  function assertInstanceOf (constructor, msg) {
    if (msg) flag(this, 'message', msg);

    var target = flag(this, 'object')
    var ssfi = flag(this, 'ssfi');
    var flagMsg = flag(this, 'message');

    try {
      var isInstanceOf = target instanceof constructor;
    } catch (err) {
      if (err instanceof TypeError) {
        flagMsg = flagMsg ? flagMsg + ': ' : '';
        throw new AssertionError(
          flagMsg + 'The instanceof assertion needs a constructor but '
            + _.type(constructor) + ' was given.',
          undefined,
          ssfi
        );
      }
      throw err;
    }

    var name = _.getName(constructor);
    if (name === null) {
      name = 'an unnamed constructor';
    }

    this.assert(
        isInstanceOf
      , 'expected #{this} to be an instance of ' + name
      , 'expected #{this} to not be an instance of ' + name
    );
  };

  Assertion.addMethod('instanceof', assertInstanceOf);
  Assertion.addMethod('instanceOf', assertInstanceOf);

  /**
   * ### .property(name[, val[, msg]])
   *
   * Asserts that the target has a property with the given key `name`.
   *
   *     expect({a: 1}).to.have.property('a');
   *
   * When `val` is provided, `.property` also asserts that the property's value
   * is equal to the given `val`.
   *
   *     expect({a: 1}).to.have.property('a', 1);
   *
   * By default, strict (`===`) equality is used. Add `.deep` earlier in the
   * chain to use deep equality instead. See the `deep-eql` project page for
   * info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * The target's enumerable and non-enumerable properties are always included
   * in the search. By default, both own and inherited properties are included.
   * Add `.own` earlier in the chain to exclude inherited properties from the
   * search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.own.property('a', 1);
   *     expect({a: 1}).to.have.property('b').but.not.own.property('b'); 
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({x: {a: 1}}).to.have.deep.own.property('x', {a: 1});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]', 'y');
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}})
   *       .to.have.deep.nested.property('a.b[0]', {c: 3});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.property`.
   *
   *     expect({a: 1}).to.not.have.property('b');
   * 
   * However, it's dangerous to negate `.property` when providing `val`. The
   * problem is that it creates uncertain expectations by asserting that the
   * target either doesn't have a property with the given key `name`, or that it
   * does have a property with the given key `name` but its value isn't equal to
   * the given `val`. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property with the given key
   * `name`, it's often best to assert exactly that.
   *
   *     expect({b: 2}).to.not.have.property('a'); // Recommended
   *     expect({b: 2}).to.not.have.property('a', 1); // Not recommended
   *
   * When the target is expected to have a property with the given key `name`,
   * it's often best to assert that the property has its expected value, rather
   * than asserting that it doesn't have one of many unexpected values.
   *
   *     expect({a: 3}).to.have.property('a', 3); // Recommended
   *     expect({a: 3}).to.not.have.property('a', 1); // Not recommended
   *
   * `.property` changes the target of any assertions that follow in the chain
   * to be the value of the property from the original target object.
   *
   *     expect({a: 1}).to.have.property('a').that.is.a('number');
   *
   * `.property` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing `val`, only use the
   * second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.property('a', 2, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.have.property('a', 2);
   *     expect({a: 1}, 'nooo why fail??').to.have.property('b');
   *
   *     // Not recommended
   *     expect({a: 1}).to.have.property('b', undefined, 'nooo why fail??');
   * 
   * The above assertion isn't the same thing as not providing `val`. Instead,
   * it's asserting that the target object has a `b` property that's equal to
   * `undefined`.
   *
   * The assertions `.ownProperty` and `.haveOwnProperty` can be used
   * interchangeably with `.own.property`.
   *
   * @name property
   * @param {String} name
   * @param {Mixed} val (optional)
   * @param {String} msg _optional_
   * @returns value of property for chaining
   * @namespace BDD
   * @api public
   */

  function assertProperty (name, val, msg) {
    if (msg) flag(this, 'message', msg);

    var isNested = flag(this, 'nested')
      , isOwn = flag(this, 'own')
      , flagMsg = flag(this, 'message')
      , obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi');

    if (isNested && isOwn) {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      throw new AssertionError(
        flagMsg + 'The "nested" and "own" flags cannot be combined.',
        undefined,
        ssfi
      );
    }

    if (obj === null || obj === undefined) {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      throw new AssertionError(
        flagMsg + 'Target cannot be null or undefined.',
        undefined,
        ssfi
      );
    }

    var isDeep = flag(this, 'deep')
      , negate = flag(this, 'negate')
      , pathInfo = isNested ? _.getPathInfo(obj, name) : null
      , value = isNested ? pathInfo.value : obj[name];

    var descriptor = '';
    if (isDeep) descriptor += 'deep ';
    if (isOwn) descriptor += 'own ';
    if (isNested) descriptor += 'nested ';
    descriptor += 'property ';

    var hasProperty;
    if (isOwn) hasProperty = Object.prototype.hasOwnProperty.call(obj, name);
    else if (isNested) hasProperty = pathInfo.exists;
    else hasProperty = _.hasProperty(obj, name);

    // When performing a negated assertion for both name and val, merely having
    // a property with the given name isn't enough to cause the assertion to
    // fail. It must both have a property with the given name, and the value of
    // that property must equal the given val. Therefore, skip this assertion in
    // favor of the next.
    if (!negate || arguments.length === 1) {
      this.assert(
          hasProperty
        , 'expected #{this} to have ' + descriptor + _.inspect(name)
        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
    }

    if (arguments.length > 1) {
      this.assert(
          hasProperty && (isDeep ? _.eql(val, value) : val === value)
        , 'expected #{this} to have ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
        , 'expected #{this} to not have ' + descriptor + _.inspect(name) + ' of #{act}'
        , val
        , value
      );
    }

    flag(this, 'object', value);
  }

  Assertion.addMethod('property', assertProperty);

  function assertOwnProperty (name, value, msg) {
    flag(this, 'own', true);
    assertProperty.apply(this, arguments);
  }

  Assertion.addMethod('ownProperty', assertOwnProperty);
  Assertion.addMethod('haveOwnProperty', assertOwnProperty);

  /**
   * ### .ownPropertyDescriptor(name[, descriptor[, msg]])
   *
   * Asserts that the target has its own property descriptor with the given key
   * `name`. Enumerable and non-enumerable properties are included in the
   * search.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a');
   *
   * When `descriptor` is provided, `.ownPropertyDescriptor` also asserts that
   * the property's descriptor is deeply equal to the given `descriptor`. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * Add `.not` earlier in the chain to negate `.ownPropertyDescriptor`.
   *
   *     expect({a: 1}).to.not.have.ownPropertyDescriptor('b');
   * 
   * However, it's dangerous to negate `.ownPropertyDescriptor` when providing
   * a `descriptor`. The problem is that it creates uncertain expectations by
   * asserting that the target either doesn't have a property descriptor with
   * the given key `name`, or that it does have a property descriptor with the
   * given key `name` but its not deeply equal to the given `descriptor`. It's
   * often best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property descriptor with the given
   * key `name`, it's often best to assert exactly that.
   *
   *     // Recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a');
   *
   *     // Not recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * When the target is expected to have a property descriptor with the given
   * key `name`, it's often best to assert that the property has its expected
   * descriptor, rather than asserting that it doesn't have one of many
   * unexpected descriptors.
   *
   *     // Recommended
   *     expect({a: 3}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 3,
   *     });
   *
   *     // Not recommended
   *     expect({a: 3}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * `.ownPropertyDescriptor` changes the target of any assertions that follow
   * in the chain to be the value of the property descriptor from the original
   * target object.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a')
   *       .that.has.property('enumerable', true);
   *
   * `.ownPropertyDescriptor` accepts an optional `msg` argument which is a
   * custom error message to show when the assertion fails. The message can also
   * be given as the second argument to `expect`. When not providing
   * `descriptor`, only use the second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     }, 'nooo why fail??');
   *
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     });
   * 
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('b');
   *
   *     // Not recommended
   *     expect({a: 1})
   *       .to.have.ownPropertyDescriptor('b', undefined, 'nooo why fail??');
   *
   * The above assertion isn't the same thing as not providing `descriptor`.
   * Instead, it's asserting that the target object has a `b` property
   * descriptor that's deeply equal to `undefined`.
   *
   * The alias `.haveOwnPropertyDescriptor` can be used interchangeably with
   * `.ownPropertyDescriptor`.
   *
   * @name ownPropertyDescriptor
   * @alias haveOwnPropertyDescriptor
   * @param {String} name
   * @param {Object} descriptor _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertOwnPropertyDescriptor (name, descriptor, msg) {
    if (typeof descriptor === 'string') {
      msg = descriptor;
      descriptor = null;
    }
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
    if (actualDescriptor && descriptor) {
      this.assert(
          _.eql(descriptor, actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor)
        , descriptor
        , actualDescriptor
        , true
      );
    } else {
      this.assert(
          actualDescriptor
        , 'expected #{this} to have an own property descriptor for ' + _.inspect(name)
        , 'expected #{this} to not have an own property descriptor for ' + _.inspect(name)
      );
    }
    flag(this, 'object', actualDescriptor);
  }

  Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
  Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);

  /**
   * ### .lengthOf(n[, msg])
   *
   * Asserts that the target's `length` property is equal to the given number
   * `n`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *     expect('foo').to.have.lengthOf(3);
   *
   * Add `.not` earlier in the chain to negate `.lengthOf`. However, it's often
   * best to assert that the target's `length` property is equal to its expected
   * value, rather than not equal to one of many unexpected values.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.not.have.lengthOf(4); // Not recommended
   *
   * `.lengthOf` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(2, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.have.lengthOf(2);
   *
   * `.lengthOf` can also be used as a language chain, causing all `.above`,
   * `.below`, `.least`, `.most`, and `.within` assertions that follow in the
   * chain to use the target's `length` property as the target. However, it's
   * often best to assert that the target's `length` property is equal to its
   * expected length, rather than asserting that its `length` property falls
   * within some range of values.
   *
   *     // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *
   *     // Not recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2);
   *     expect([1, 2, 3]).to.have.lengthOf.below(4);
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(3);
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(3);
   *     expect([1, 2, 3]).to.have.lengthOf.within(2,4);
   *
   * Due to a compatibility issue, the alias `.length` can't be chained directly
   * off of an uninvoked method such as `.a`. Therefore, `.length` can't be used
   * interchangeably with `.lengthOf` in every situation. It's recommended to
   * always use `.lengthOf` instead of `.length`.
   *
   *     expect([1, 2, 3]).to.have.a.length(3); // incompatible; throws error
   *     expect([1, 2, 3]).to.have.a.lengthOf(3);  // passes as expected
   *
   * @name lengthOf
   * @alias length
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLengthChain () {
    flag(this, 'doLength', true);
  }

  function assertLength (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    var len = obj.length;

    this.assert(
        len == n
      , 'expected #{this} to have a length of #{exp} but got #{act}'
      , 'expected #{this} to not have a length of #{act}'
      , n
      , len
    );
  }

  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
  Assertion.addChainableMethod('lengthOf', assertLength, assertLengthChain);

  /**
   * ### .match(re[, msg])
   *
   * Asserts that the target matches the given regular expression `re`.
   *
   *     expect('foobar').to.match(/^foo/);
   *
   * Add `.not` earlier in the chain to negate `.match`.
   *
   *     expect('foobar').to.not.match(/taco/);
   *
   * `.match` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect('foobar').to.match(/taco/, 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.match(/taco/);
   *
   * The alias `.matches` can be used interchangeably with `.match`.
   *
   * @name match
   * @alias matches
   * @param {RegExp} re
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */
  function assertMatch(re, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        re.exec(obj)
      , 'expected #{this} to match ' + re
      , 'expected #{this} not to match ' + re
    );
  }

  Assertion.addMethod('match', assertMatch);
  Assertion.addMethod('matches', assertMatch);

  /**
   * ### .string(str[, msg])
   *
   * Asserts that the target string contains the given substring `str`.
   *
   *     expect('foobar').to.have.string('bar');
   *
   * Add `.not` earlier in the chain to negate `.string`.
   *
   *     expect('foobar').to.not.have.string('taco');
   *
   * `.string` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect('foobar').to.have.string(/taco/, 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.have.string(/taco/);
   *
   * @name string
   * @param {String} str
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('string', function (str, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(obj, flagMsg, ssfi, true).is.a('string');

    this.assert(
        ~obj.indexOf(str)
      , 'expected #{this} to contain ' + _.inspect(str)
      , 'expected #{this} to not contain ' + _.inspect(str)
    );
  });

  /**
   * ### .keys(key1[, key2[, ...]])
   *
   * Asserts that the target object, array, map, or set has the given keys. Only
   * the target's own inherited properties are included in the search. 
   *
   * When the target is an object or array, keys can be provided as one or more
   * string arguments, a single array argument, or a single object argument. In
   * the latter case, only the keys in the given object matter; the values are
   * ignored.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *     expect(['x', 'y']).to.have.all.keys(0, 1);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys(['a', 'b']);
   *     expect(['x', 'y']).to.have.all.keys([0, 1]);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys({a: 4, b: 5}); // ignore 4 and 5
   *     expect(['x', 'y']).to.have.all.keys({0: 4, 1: 5}); // ignore 4 and 5
   *
   * When the target is a map or set, each key must be provided as a separate
   * argument.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.have.all.keys('a', 'b');
   *     expect(new Set(['a', 'b'])).to.have.all.keys('a', 'b');
   *
   * Because `.keys` does different things based on the target's type, it's
   * important to check the target's type before using `.keys`. See the `.a` doc
   * for info on testing a target's type.
   *
   *     expect({a: 1, b: 2}).to.be.an('object').that.has.all.keys('a', 'b');
   *
   * By default, strict (`===`) equality is used to compare keys of maps and
   * sets. Add `.deep` earlier in the chain to use deep equality instead. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.all.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.all.keys([{a: 1}]);
   *
   * By default, the target must have all of the given keys and no more. Add
   * `.any` earlier in the chain to only require that the target have at least
   * one of the given keys. Also, add `.not` earlier in the chain to negate
   * `.keys`. It's often best to add `.any` when negating `.keys`, and to use
   * `.all` when asserting `.keys` without negation.
   *
   * When negating `.keys`, `.any` is preferred because `.not.any.keys` asserts
   * exactly what's expected of the output, whereas `.not.all.keys` creates
   * uncertain expectations.
   *
   *     // Recommended; asserts that target doesn't have any of the given keys
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   *     // Not recommended; asserts that target doesn't have all of the given
   *     // keys but may or may not have some of them
   *     expect({a: 1, b: 2}).to.not.have.all.keys('c', 'd');
   *
   * When asserting `.keys` without negation, `.all` is preferred because
   * `.all.keys` asserts exactly what's expected of the output, whereas
   * `.any.keys` creates uncertain expectations.
   *
   *     // Recommended; asserts that target has all the given keys
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   *     // Not recommended; asserts that target has at least one of the given
   *     // keys but may or may not have more of them
   *     expect({a: 1, b: 2}).to.have.any.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` appear
   * earlier in the chain. However, it's often best to add `.all` anyway because
   * it improves readability.
   *
   *     // Both assertions are identical
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b'); // Recommended
   *     expect({a: 1, b: 2}).to.have.keys('a', 'b'); // Not recommended
   *
   * Add `.include` earlier in the chain to require that the target's keys be a
   * superset of the expected keys, rather than identical sets.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   * However, if `.any` and `.include` are combined, only the `.any` takes
   * effect. The `.include` is ignored in this case.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.have.key('b');
   *
   * The alias `.key` can be used interchangeably with `.keys`.
   *
   * @name keys
   * @alias key
   * @param {...String|Array|Object} keys
   * @namespace BDD
   * @api public
   */

  function assertKeys (keys) {
    var obj = flag(this, 'object')
      , objType = _.type(obj)
      , keysType = _.type(keys)
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , str
      , deepStr = ''
      , ok = true
      , flagMsg = flag(this, 'message');

    flagMsg = flagMsg ? flagMsg + ': ' : '';
    var mixedArgsMsg = flagMsg + 'when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments';

    if (objType === 'Map' || objType === 'Set') {
      deepStr = isDeep ? 'deeply ' : '';
      actual = [];

      // Map and Set '.keys' aren't supported in IE 11. Therefore, use .forEach.
      obj.forEach(function (val, key) { actual.push(key) });

      if (keysType !== 'Array') {
        keys = Array.prototype.slice.call(arguments);
      }

    } else {
      actual = _.getOwnEnumerableProperties(obj);

      switch (keysType) {
        case 'Array':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          break;
        case 'Object':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          keys = Object.keys(keys);
          break;
        default:
          keys = Array.prototype.slice.call(arguments);
      }

      // Only stringify non-Symbols because Symbols would become "Symbol()"
      keys = keys.map(function (val) {
        return typeof val === 'symbol' ? val : String(val);
      });
    }

    if (!keys.length) {
      throw new AssertionError(flagMsg + 'keys required', undefined, ssfi);
    }

    var len = keys.length
      , any = flag(this, 'any')
      , all = flag(this, 'all')
      , expected = keys
      , actual;

    if (!any && !all) {
      all = true;
    }

    // Has any
    if (any) {
      ok = expected.some(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });
    }

    // Has all
    if (all) {
      ok = expected.every(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });

      if (!flag(this, 'contains')) {
        ok = ok && keys.length == actual.length;
      }
    }

    // Key string
    if (len > 1) {
      keys = keys.map(function(key) {
        return _.inspect(key);
      });
      var last = keys.pop();
      if (all) {
        str = keys.join(', ') + ', and ' + last;
      }
      if (any) {
        str = keys.join(', ') + ', or ' + last;
      }
    } else {
      str = _.inspect(keys[0]);
    }

    // Form
    str = (len > 1 ? 'keys ' : 'key ') + str;

    // Have / include
    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

    // Assertion
    this.assert(
        ok
      , 'expected #{this} to ' + deepStr + str
      , 'expected #{this} to not ' + deepStr + str
      , expected.slice(0).sort(_.compareByInspect)
      , actual.sort(_.compareByInspect)
      , true
    );
  }

  Assertion.addMethod('keys', assertKeys);
  Assertion.addMethod('key', assertKeys);

  /**
   * ### .throw([errorLike], [errMsgMatcher], [msg])
   *
   * When no arguments are provided, `.throw` invokes the target function and
   * asserts that an error is thrown.
   * 
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw();
   *
   * When one argument is provided, and it's an error constructor, `.throw`
   * invokes the target function and asserts that an error is thrown that's an
   * instance of that error constructor.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError);
   *
   * When one argument is provided, and it's an error instance, `.throw` invokes
   * the target function and asserts that an error is thrown that's strictly
   * (`===`) equal to that error instance.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(err);
   *
   * When one argument is provided, and it's a string, `.throw` invokes the
   * target function and asserts that an error is thrown with a message that
   * contains that string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw('salmon');
   *
   * When one argument is provided, and it's a regular expression, `.throw`
   * invokes the target function and asserts that an error is thrown with a
   * message that matches that regular expression.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(/salmon/);
   *
   * When two arguments are provided, and the first is an error instance or
   * constructor, and the second is a string or regular expression, `.throw`
   * invokes the function and asserts that an error is thrown that fulfills both
   * conditions as described above.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon');
   *     expect(badFn).to.throw(TypeError, /salmon/);
   *     expect(badFn).to.throw(err, 'salmon');
   *     expect(badFn).to.throw(err, /salmon/);
   *
   * Add `.not` earlier in the chain to negate `.throw`.
   *     
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw();
   * 
   * However, it's dangerous to negate `.throw` when providing any arguments.
   * The problem is that it creates uncertain expectations by asserting that the
   * target either doesn't throw an error, or that it throws an error but of a
   * different type than the given type, or that it throws an error of the given
   * type but with a message that doesn't include the given string. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to throw an error, it's often best to assert
   * exactly that.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw(); // Recommended
   *     expect(goodFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * When the target is expected to throw an error, it's often best to assert
   * that the error is of its expected type, and has a message that includes an
   * expected string, rather than asserting that it doesn't have one of many
   * unexpected types, and doesn't have a message that includes some string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon'); // Recommended
   *     expect(badFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * `.throw` changes the target of any assertions that follow in the chain to
   * be the error object that's thrown.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     err.code = 42;
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError).with.property('code', 42);
   *
   * `.throw` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`. When not providing two arguments, always use
   * the second form.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.throw(TypeError, 'x', 'nooo why fail??');
   *     expect(goodFn, 'nooo why fail??').to.throw();
   *
   * Due to limitations in ES5, `.throw` may not always work as expected when
   * using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing the built-in `Error` object and
   * then passing the subclassed constructor to `.throw`. See your transpiler's
   * docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * Beware of some common mistakes when using the `throw` assertion. One common
   * mistake is to accidentally invoke the function yourself instead of letting
   * the `throw` assertion invoke the function for you. For example, when
   * testing if a function named `fn` throws, provide `fn` instead of `fn()` as
   * the target for the assertion.
   *
   *     expect(fn).to.throw();     // Good! Tests `fn` as desired
   *     expect(fn()).to.throw();   // Bad! Tests result of `fn()`, not `fn`
   *
   * If you need to assert that your function `fn` throws when passed certain
   * arguments, then wrap a call to `fn` inside of another function.
   *
   *     expect(function () { fn(42); }).to.throw();  // Function expression
   *     expect(() => fn(42)).to.throw();             // ES6 arrow function
   *
   * Another common mistake is to provide an object method (or any stand-alone
   * function that relies on `this`) as the target of the assertion. Doing so is
   * problematic because the `this` context will be lost when the function is
   * invoked by `.throw`; there's no way for it to know what `this` is supposed
   * to be. There are two ways around this problem. One solution is to wrap the
   * method or function call inside of another function. Another solution is to
   * use `bind`.
   *
   *     expect(function () { cat.meow(); }).to.throw();  // Function expression
   *     expect(() => cat.meow()).to.throw();             // ES6 arrow function
   *     expect(cat.meow.bind(cat)).to.throw();           // Bind
   *
   * Finally, it's worth mentioning that it's a best practice in JavaScript to
   * only throw `Error` and derivatives of `Error` such as `ReferenceError`,
   * `TypeError`, and user-defined objects that extend `Error`. No other type of
   * value will generate a stack trace when initialized. With that said, the
   * `throw` assertion does technically support any type of value being thrown,
   * not just `Error` and its derivatives.
   *
   * The aliases `.throws` and `.Throw` can be used interchangeably with
   * `.throw`.
   *
   * @name throw
   * @alias throws
   * @alias Throw
   * @param {Error|ErrorConstructor} errorLike
   * @param {String|RegExp} errMsgMatcher error message
   * @param {String} msg _optional_
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @returns error for chaining (null if no error)
   * @namespace BDD
   * @api public
   */

  function assertThrows (errorLike, errMsgMatcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate') || false;
    new Assertion(obj, flagMsg, ssfi, true).is.a('function');

    if (errorLike instanceof RegExp || typeof errorLike === 'string') {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var caughtErr;
    try {
      obj();
    } catch (err) {
      caughtErr = err;
    }

    // If we have the negate flag enabled and at least one valid argument it means we do expect an error
    // but we want it to match a given set of criteria
    var everyArgIsUndefined = errorLike === undefined && errMsgMatcher === undefined;

    // If we've got the negate flag enabled and both args, we should only fail if both aren't compatible
    // See Issue #551 and PR #683@GitHub
    var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
    var errorLikeFail = false;
    var errMsgMatcherFail = false;

    // Checking if error was thrown
    if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
      // We need this to display results correctly according to their types
      var errorLikeString = 'an error';
      if (errorLike instanceof Error) {
        errorLikeString = '#{exp}';
      } else if (errorLike) {
        errorLikeString = _.checkError.getConstructorName(errorLike);
      }

      this.assert(
          caughtErr
        , 'expected #{this} to throw ' + errorLikeString
        , 'expected #{this} to not throw an error but #{act} was thrown'
        , errorLike && errorLike.toString()
        , (caughtErr instanceof Error ?
            caughtErr.toString() : (typeof caughtErr === 'string' ? caughtErr : caughtErr &&
                                    _.checkError.getConstructorName(caughtErr)))
      );
    }

    if (errorLike && caughtErr) {
      // We should compare instances only if `errorLike` is an instance of `Error`
      if (errorLike instanceof Error) {
        var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);

        if (isCompatibleInstance === negate) {
          // These checks were created to ensure we won't fail too soon when we've got both args and a negate
          // See Issue #551 and PR #683@GitHub
          if (everyArgIsDefined && negate) {
            errorLikeFail = true;
          } else {
            this.assert(
                negate
              , 'expected #{this} to throw #{exp} but #{act} was thrown'
              , 'expected #{this} to not throw #{exp}' + (caughtErr && !negate ? ' but #{act} was thrown' : '')
              , errorLike.toString()
              , caughtErr.toString()
            );
          }
        }
      }

      var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
      if (isCompatibleConstructor === negate) {
        if (everyArgIsDefined && negate) {
            errorLikeFail = true;
        } else {
          this.assert(
              negate
            , 'expected #{this} to throw #{exp} but #{act} was thrown'
            , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
            , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
            , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
          );
        }
      }
    }

    if (caughtErr && errMsgMatcher !== undefined && errMsgMatcher !== null) {
      // Here we check compatible messages
      var placeholder = 'including';
      if (errMsgMatcher instanceof RegExp) {
        placeholder = 'matching'
      }

      var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
      if (isCompatibleMessage === negate) {
        if (everyArgIsDefined && negate) {
            errMsgMatcherFail = true;
        } else {
          this.assert(
            negate
            , 'expected #{this} to throw error ' + placeholder + ' #{exp} but got #{act}'
            , 'expected #{this} to throw error not ' + placeholder + ' #{exp}'
            ,  errMsgMatcher
            ,  _.checkError.getMessage(caughtErr)
          );
        }
      }
    }

    // If both assertions failed and both should've matched we throw an error
    if (errorLikeFail && errMsgMatcherFail) {
      this.assert(
        negate
        , 'expected #{this} to throw #{exp} but #{act} was thrown'
        , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
        , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
        , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
      );
    }

    flag(this, 'object', caughtErr);
  };

  Assertion.addMethod('throw', assertThrows);
  Assertion.addMethod('throws', assertThrows);
  Assertion.addMethod('Throw', assertThrows);

  /**
   * ### .respondTo(method[, msg])
   *
   * When the target is a non-function object, `.respondTo` asserts that the
   * target has a method with the given name `method`. The method can be own or
   * inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.respondTo('meow');
   *
   * When the target is a function, `.respondTo` asserts that the target's
   * `prototype` property has a method with the given name `method`. Again, the
   * method can be own or inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(Cat).to.respondTo('meow');
   *
   * Add `.itself` earlier in the chain to force `.respondTo` to treat the
   * target as a non-function object, even if it's a function. Thus, it asserts
   * that the target has a method with the given name `method`, rather than
   * asserting that the target's `prototype` property has a method with the
   * given name `method`.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * When not adding `.itself`, it's important to check the target's type before
   * using `.respondTo`. See the `.a` doc for info on checking a target's type.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.be.an('object').that.respondsTo('meow');
   *
   * Add `.not` earlier in the chain to negate `.respondTo`.
   *
   *     function Dog () {}
   *     Dog.prototype.bark = function () {};
   *
   *     expect(new Dog()).to.not.respondTo('meow');
   *
   * `.respondTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect({}).to.respondTo('meow', 'nooo why fail??');
   *     expect({}, 'nooo why fail??').to.respondTo('meow');
   *
   * The alias `.respondsTo` can be used interchangeably with `.respondTo`.
   *
   * @name respondTo
   * @alias respondsTo
   * @param {String} method
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function respondTo (method, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , itself = flag(this, 'itself')
      , context = ('function' === typeof obj && !itself)
        ? obj.prototype[method]
        : obj[method];

    this.assert(
        'function' === typeof context
      , 'expected #{this} to respond to ' + _.inspect(method)
      , 'expected #{this} to not respond to ' + _.inspect(method)
    );
  }

  Assertion.addMethod('respondTo', respondTo);
  Assertion.addMethod('respondsTo', respondTo);

  /**
   * ### .itself
   *
   * Forces all `.respondTo` assertions that follow in the chain to behave as if
   * the target is a non-function object, even if it's a function. Thus, it
   * causes `.respondTo` to assert that the target has a method with the given
   * name, rather than asserting that the target's `prototype` property has a
   * method with the given name.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * @name itself
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('itself', function () {
    flag(this, 'itself', true);
  });

  /**
   * ### .satisfy(matcher[, msg])
   *
   * Invokes the given `matcher` function with the target being passed as the
   * first argument, and asserts that the value returned is truthy.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 0; 
   *     });
   *
   * Add `.not` earlier in the chain to negate `.satisfy`.
   *
   *     expect(1).to.not.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * `.satisfy` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 2;
   *     }, 'nooo why fail??');
   *
   *     expect(1, 'nooo why fail??').to.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * The alias `.satisfies` can be used interchangeably with `.satisfy`.
   *
   * @name satisfy
   * @alias satisfies
   * @param {Function} matcher
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function satisfy (matcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var result = matcher(obj);
    this.assert(
        result
      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
      , flag(this, 'negate') ? false : true
      , result
    );
  }

  Assertion.addMethod('satisfy', satisfy);
  Assertion.addMethod('satisfies', satisfy);

  /**
   * ### .closeTo(expected, delta[, msg])
   *
   * Asserts that the target is a number that's within a given +/- `delta` range
   * of the given number `expected`. However, it's often best to assert that the
   * target is equal to its expected value.
   *
   *     // Recommended
   *     expect(1.5).to.equal(1.5);
   *
   *     // Not recommended
   *     expect(1.5).to.be.closeTo(1, 0.5);
   *     expect(1.5).to.be.closeTo(2, 0.5);
   *     expect(1.5).to.be.closeTo(1, 1);
   *
   * Add `.not` earlier in the chain to negate `.closeTo`.
   *
   *     expect(1.5).to.equal(1.5); // Recommended
   *     expect(1.5).to.not.be.closeTo(3, 1); // Not recommended
   *
   * `.closeTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1.5).to.be.closeTo(3, 1, 'nooo why fail??');
   *     expect(1.5, 'nooo why fail??').to.be.closeTo(3, 1);
   *
   * The alias `.approximately` can be used interchangeably with `.closeTo`.
   *
   * @name closeTo
   * @alias approximately
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function closeTo(expected, delta, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).is.a('number');
    if (typeof expected !== 'number' || typeof delta !== 'number') {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      throw new AssertionError(
          flagMsg + 'the arguments to closeTo or approximately must be numbers',
          undefined,
          ssfi
      );
    }

    this.assert(
        Math.abs(obj - expected) <= delta
      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
    );
  }

  Assertion.addMethod('closeTo', closeTo);
  Assertion.addMethod('approximately', closeTo);

  // Note: Duplicates are ignored if testing for inclusion instead of sameness.
  function isSubsetOf(subset, superset, cmp, contains, ordered) {
    if (!contains) {
      if (subset.length !== superset.length) return false;
      superset = superset.slice();
    }

    return subset.every(function(elem, idx) {
      if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];

      if (!cmp) {
        var matchIdx = superset.indexOf(elem);
        if (matchIdx === -1) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      }

      return superset.some(function(elem2, matchIdx) {
        if (!cmp(elem, elem2)) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      });
    });
  }

  /**
   * ### .members(set[, msg])
   *
   * Asserts that the target array has the same members as the given array
   * `set`.
   *
   *     expect([1, 2, 3]).to.have.members([2, 1, 3]);
   *     expect([1, 2, 2]).to.have.members([2, 1, 2]);
   *
   * By default, members are compared using strict (`===`) equality. Add `.deep`
   * earlier in the chain to use deep equality instead. See the `deep-eql`
   * project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   * By default, order doesn't matter. Add `.ordered` earlier in the chain to
   * require that members appear in the same order.
   *
   *     expect([1, 2, 3]).to.have.ordered.members([1, 2, 3]);
   *     expect([1, 2, 3]).to.have.members([2, 1, 3])
   *       .but.not.ordered.members([2, 1, 3]);
   *
   * By default, both arrays must be the same size. Add `.include` earlier in
   * the chain to require that the target's members be a superset of the
   * expected members. Note that duplicates are ignored in the subset when
   * `.include` is added.
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * `.deep`, `.ordered`, and `.include` can all be combined. However, if
   * `.include` and `.ordered` are combined, the ordering begins at the start of
   * both arrays.
   *
   *     expect([{a: 1}, {b: 2}, {c: 3}])
   *       .to.include.deep.ordered.members([{a: 1}, {b: 2}])
   *       .but.not.include.deep.ordered.members([{b: 2}, {c: 3}]);
   *
   * Add `.not` earlier in the chain to negate `.members`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the target array doesn't have all of the same members as
   * the given array `set` but may or may not have some of them. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     expect([1, 2]).to.not.include(3).and.not.include(4); // Recommended
   *     expect([1, 2]).to.not.have.members([3, 4]); // Not recommended
   *
   * `.members` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2]).to.have.members([1, 2, 3], 'nooo why fail??');
   *     expect([1, 2], 'nooo why fail??').to.have.members([1, 2, 3]);
   *
   * @name members
   * @param {Array} set
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('members', function (subset, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).to.be.an('array');
    new Assertion(subset, flagMsg, ssfi, true).to.be.an('array');

    var contains = flag(this, 'contains');
    var ordered = flag(this, 'ordered');

    var subject, failMsg, failNegateMsg, lengthCheck;

    if (contains) {
      subject = ordered ? 'an ordered superset' : 'a superset';
      failMsg = 'expected #{this} to be ' + subject + ' of #{exp}';
      failNegateMsg = 'expected #{this} to not be ' + subject + ' of #{exp}';
    } else {
      subject = ordered ? 'ordered members' : 'members';
      failMsg = 'expected #{this} to have the same ' + subject + ' as #{exp}';
      failNegateMsg = 'expected #{this} to not have the same ' + subject + ' as #{exp}';
    }

    var cmp = flag(this, 'deep') ? _.eql : undefined;

    this.assert(
        isSubsetOf(subset, obj, cmp, contains, ordered)
      , failMsg
      , failNegateMsg
      , subset
      , obj
      , true
    );
  });

  /**
   * ### .oneOf(list[, msg])
   *
   * Asserts that the target is a member of the given array `list`. However,
   * it's often best to assert that the target is equal to its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.oneOf([1, 2, 3]); // Not recommended
   *
   * Comparisons are performed using strict (`===`) equality.
   *
   * Add `.not` earlier in the chain to negate `.oneOf`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.oneOf([2, 3, 4]); // Not recommended
   *
   * `.oneOf` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.oneOf([2, 3, 4], 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.oneOf([2, 3, 4]);
   *
   * @name oneOf
   * @param {Array<*>} list
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function oneOf (list, msg) {
    if (msg) flag(this, 'message', msg);
    var expected = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(list, flagMsg, ssfi, true).to.be.an('array');

    this.assert(
        list.indexOf(expected) > -1
      , 'expected #{this} to be one of #{exp}'
      , 'expected #{this} to not be one of #{exp}'
      , list
      , expected
    );
  }

  Assertion.addMethod('oneOf', oneOf);


  /**
   * ### .change(subject[, prop[, msg]])
   *
   * When one argument is provided, `.change` asserts that the given function
   * `subject` returns a different value when it's invoked before the target
   * function compared to when it's invoked afterward. However, it's often best
   * to assert that `subject` is equal to its expected value.
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     // Recommended
   *     expect(getDots()).to.equal('');
   *     addDot();
   *     expect(getDots()).to.equal('.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(getDots);
   *
   * When two arguments are provided, `.change` asserts that the value of the
   * given object `subject`'s `prop` property is different before invoking the
   * target function compared to afterward.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     // Recommended
   *     expect(myObj).to.have.property('dots', '');
   *     addDot();
   *     expect(myObj).to.have.property('dots', '.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(myObj, 'dots');
   *
   * Strict (`===`) equality is used to compare before and after values.
   *
   * Add `.not` earlier in the chain to negate `.change`.
   *
   *     var dots = ''
   *       , noop = function () {}
   *       , getDots = function () { return dots; };
   *
   *     expect(noop).to.not.change(getDots);
   *
   *     var myObj = {dots: ''}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'dots');
   *
   * `.change` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     expect(addDot).to.not.change(myObj, 'dots', 'nooo why fail??');
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     expect(addDot, 'nooo why fail??').to.not.change(getDots);
   *
   * `.change` also causes all `.by` assertions that follow in the chain to
   * assert how much a numeric subject was increased or decreased by. However,
   * it's dangerous to use `.change.by`. The problem is that it creates
   * uncertain expectations by asserting that the subject either increases by
   * the given delta, or that it decreases by the given delta. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * The alias `.changes` can be used interchangeably with `.change`.
   *
   * @name change
   * @alias changes
   * @param {String} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertChanges (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    // This gets flagged because of the .by(delta) assertion
    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'change');
    flag(this, 'realDelta', final !== initial);

    this.assert(
      initial !== final
      , 'expected ' + msgObj + ' to change'
      , 'expected ' + msgObj + ' to not change'
    );
  }

  Assertion.addMethod('change', assertChanges);
  Assertion.addMethod('changes', assertChanges);

  /**
   * ### .increase(subject[, prop[, msg]])
   *
   * When one argument is provided, `.increase` asserts that the given function
   * `subject` returns a greater number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.increase` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * greater of a number is returned. It's often best to assert that the return
   * value increased by the expected amount, rather than asserting it increased
   * by any amount.
   *
   *     var val = 1
   *       , addTwo = function () { val += 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(addTwo).to.increase(getVal).by(2); // Recommended
   *     expect(addTwo).to.increase(getVal); // Not recommended
   *
   * When two arguments are provided, `.increase` asserts that the value of the
   * given object `subject`'s `prop` property is greater after invoking the
   * target function compared to beforehand.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.increase(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.increase`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either decreases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to decrease, it's often best to assert that it
   * decreased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.not.increase(myObj, 'val'); // Not recommended
   * 
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.increase(myObj, 'val'); // Not recommended
   *
   * `.increase` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.increase(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.increase(getVal);
   *
   * The alias `.increases` can be used interchangeably with `.increase`.
   *
   * @name increase
   * @alias increases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertIncreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'increase');
    flag(this, 'realDelta', final - initial);

    this.assert(
      final - initial > 0
      , 'expected ' + msgObj + ' to increase'
      , 'expected ' + msgObj + ' to not increase'
    );
  }

  Assertion.addMethod('increase', assertIncreases);
  Assertion.addMethod('increases', assertIncreases);

  /**
   * ### .decrease(subject[, prop[, msg]])
   *
   * When one argument is provided, `.decrease` asserts that the given function
   * `subject` returns a lesser number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.decrease` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * lesser of a number is returned. It's often best to assert that the return
   * value decreased by the expected amount, rather than asserting it decreased
   * by any amount.
   *
   *     var val = 1
   *       , subtractTwo = function () { val -= 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(subtractTwo).to.decrease(getVal).by(2); // Recommended
   *     expect(subtractTwo).to.decrease(getVal); // Not recommended
   *
   * When two arguments are provided, `.decrease` asserts that the value of the
   * given object `subject`'s `prop` property is lesser after invoking the
   * target function compared to beforehand. 
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.decrease(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.decrease`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either increases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to increase, it's often best to assert that it
   * increased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.not.decrease(myObj, 'val'); // Not recommended
   * 
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.decrease(myObj, 'val'); // Not recommended
   *
   * `.decrease` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.decrease(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.decrease(getVal);
   *
   * The alias `.decreases` can be used interchangeably with `.decrease`.
   *
   * @name decrease
   * @alias decreases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDecreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'decrease');
    flag(this, 'realDelta', initial - final);

    this.assert(
      final - initial < 0
      , 'expected ' + msgObj + ' to decrease'
      , 'expected ' + msgObj + ' to not decrease'
    );
  }

  Assertion.addMethod('decrease', assertDecreases);
  Assertion.addMethod('decreases', assertDecreases);

  /**
   * ### .by(delta[, msg])
   *
   * When following an `.increase` assertion in the chain, `.by` asserts that
   * the subject of the `.increase` assertion increased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   * When following a `.decrease` assertion in the chain, `.by` asserts that the
   * subject of the `.decrease` assertion decreased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2);
   *
   * When following a `.change` assertion in the chain, `.by` asserts that the
   * subject of the `.change` assertion either increased or decreased by the
   * given `delta`. However, it's dangerous to use `.change.by`. The problem is
   * that it creates uncertain expectations. It's often best to identify the
   * exact output that's expected, and then write an assertion that only accepts
   * that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.by`. However, it's often best
   * to assert that the subject changed by its expected delta, rather than
   * asserting that it didn't change by one of countless unexpected deltas.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     // Recommended
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   *     // Not recommended
   *     expect(addTwo).to.increase(myObj, 'val').but.not.by(3);
   *
   * `.by` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(3, 'nooo why fail??');
   *     expect(addTwo, 'nooo why fail??').to.increase(myObj, 'val').by(3);
   *
   * @name by
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDelta(delta, msg) {
    if (msg) flag(this, 'message', msg);

    var msgObj = flag(this, 'deltaMsgObj');
    var initial = flag(this, 'initialDeltaValue');
    var final = flag(this, 'finalDeltaValue');
    var behavior = flag(this, 'deltaBehavior');
    var realDelta = flag(this, 'realDelta');

    var expression;
    if (behavior === 'change') {
      expression = Math.abs(final - initial) === Math.abs(delta);
    } else {
      expression = realDelta === Math.abs(delta);
    }

    this.assert(
      expression
      , 'expected ' + msgObj + ' to ' + behavior + ' by ' + delta
      , 'expected ' + msgObj + ' to not ' + behavior + ' by ' + delta
    );
  }

  Assertion.addMethod('by', assertDelta);

  /**
   * ### .extensible
   *
   * Asserts that the target is extensible, which means that new properties can
   * be added to it. Primitives are never extensible.
   *
   *     expect({a: 1}).to.be.extensible;
   *
   * Add `.not` earlier in the chain to negate `.extensible`.
   *
   *     var nonExtensibleObject = Object.preventExtensions({})
   *       , sealedObject = Object.seal({})
   *       , frozenObject = Object.freeze({});
   *
   *     expect(nonExtensibleObject).to.not.be.extensible;
   *     expect(sealedObject).to.not.be.extensible;
   *     expect(frozenObject).to.not.be.extensible;
   *     expect(1).to.not.be.extensible;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(1, 'nooo why fail??').to.be.extensible;
   *
   * @name extensible
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('extensible', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a non-extensible ordinary object, simply return false.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
    // The following provides ES6 behavior for ES5 environments.

    var isExtensible = obj === Object(obj) && Object.isExtensible(obj);

    this.assert(
      isExtensible
      , 'expected #{this} to be extensible'
      , 'expected #{this} to not be extensible'
    );
  });

  /**
   * ### .sealed
   *
   * Asserts that the target is sealed, which means that new properties can't be
   * added to it, and its existing properties can't be reconfigured or deleted.
   * However, it's possible that its existing properties can still be reassigned
   * to different values. Primitives are always sealed.
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     expect(sealedObject).to.be.sealed;
   *     expect(frozenObject).to.be.sealed;
   *     expect(1).to.be.sealed;
   *
   * Add `.not` earlier in the chain to negate `.sealed`.
   *
   *     expect({a: 1}).to.not.be.sealed;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.sealed;
   *
   * @name sealed
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('sealed', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a sealed ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
    // The following provides ES6 behavior for ES5 environments.

    var isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;

    this.assert(
      isSealed
      , 'expected #{this} to be sealed'
      , 'expected #{this} to not be sealed'
    );
  });

  /**
   * ### .frozen
   *
   * Asserts that the target is frozen, which means that new properties can't be
   * added to it, and its existing properties can't be reassigned to different
   * values, reconfigured, or deleted. Primitives are always frozen.
   *
   *     var frozenObject = Object.freeze({});
   *
   *     expect(frozenObject).to.be.frozen;
   *     expect(1).to.be.frozen;
   *
   * Add `.not` earlier in the chain to negate `.frozen`.
   *
   *     expect({a: 1}).to.not.be.frozen;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.frozen;
   *
   * @name frozen
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('frozen', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a frozen ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
    // The following provides ES6 behavior for ES5 environments.

    var isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;

    this.assert(
      isFrozen
      , 'expected #{this} to be frozen'
      , 'expected #{this} to not be frozen'
    );
  });

  /**
   * ### .finite
   *
   * Asserts that the target is a number, and isn't `NaN` or positive/negative
   * `Infinity`.
   *
   *     expect(1).to.be.finite;
   *
   * Add `.not` earlier in the chain to negate `.finite`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either isn't a number, or that it's `NaN`, or
   * that it's positive `Infinity`, or that it's negative `Infinity`. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to be a number, it's often best to assert
   * that it's the expected type, rather than asserting that it isn't one of
   * many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.finite; // Not recommended
   *
   * When the target is expected to be `NaN`, it's often best to assert exactly
   * that.
   *
   *     expect(NaN).to.be.NaN; // Recommended
   *     expect(NaN).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be positive infinity, it's often best to
   * assert exactly that.
   *
   *     expect(Infinity).to.equal(Infinity); // Recommended
   *     expect(Infinity).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be negative infinity, it's often best to
   * assert exactly that.
   *
   *     expect(-Infinity).to.equal(-Infinity); // Recommended
   *     expect(-Infinity).to.not.be.finite; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect('foo', 'nooo why fail??').to.be.finite;
   *
   * @name finite
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('finite', function(msg) {
    var obj = flag(this, 'object');

    this.assert(
        typeof obj === "number" && isFinite(obj)
      , 'expected #{this} to be a finite number'
      , 'expected #{this} to not be a finite number'
    );
  });
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  chai.expect = function (val, message) {
    return new chai.Assertion(val, message);
  };

  /**
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure.
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace BDD
   * @api public
   */

  chai.expect.fail = function (actual, expected, message, operator) {
    message = message || 'expect.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, chai.expect.fail);
  };
};


/***/ }),
/* 88 */
/***/ (function(module, exports) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  var Assertion = chai.Assertion;

  function loadShould () {
    // explicitly define this method as function as to have it's name to include as `ssfi`
    function shouldGetter() {
      if (this instanceof String
          || this instanceof Number
          || this instanceof Boolean
          || typeof Symbol === 'function' && this instanceof Symbol) {
        return new Assertion(this.valueOf(), null, shouldGetter);
      }
      return new Assertion(this, null, shouldGetter);
    }
    function shouldSetter(value) {
      // See https://github.com/chaijs/chai/issues/86: this makes
      // `whatever.should = someValue` actually set `someValue`, which is
      // especially useful for `global.should = require('chai').should()`.
      //
      // Note that we have to use [[DefineProperty]] instead of [[Put]]
      // since otherwise we would trigger this very setter!
      Object.defineProperty(this, 'should', {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    }
    // modify Object.prototype to have `should`
    Object.defineProperty(Object.prototype, 'should', {
      set: shouldSetter
      , get: shouldGetter
      , configurable: true
    });

    var should = {};

    /**
     * ### .fail(actual, expected, [message], [operator])
     *
     * Throw a failure.
     *
     * @name fail
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @param {String} operator
     * @namespace BDD
     * @api public
     */

    should.fail = function (actual, expected, message, operator) {
      message = message || 'should.fail()';
      throw new chai.AssertionError(message, {
          actual: actual
        , expected: expected
        , operator: operator
      }, should.fail);
    };

    /**
     * ### .equal(actual, expected, [message])
     *
     * Asserts non-strict equality (`==`) of `actual` and `expected`.
     *
     *     should.equal(3, '3', '== coerces values to strings');
     *
     * @name equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/string/regexp], [string/regexp], [message])
     *
     * Asserts that `function` will throw an error that is an instance of
     * `constructor`, or alternately that it will throw an error with message
     * matching `regexp`.
     *
     *     should.throw(fn, 'function throws a reference error');
     *     should.throw(fn, /function throws a reference error/);
     *     should.throw(fn, ReferenceError);
     *     should.throw(fn, ReferenceError, 'function throws a reference error');
     *     should.throw(fn, ReferenceError, /function throws a reference error/);
     *
     * @name throw
     * @alias Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.Throw(errt, errs);
    };

    /**
     * ### .exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var foo = 'hi';
     *
     *     should.exist(foo, 'foo exists');
     *
     * @name exist
     * @namespace Should
     * @api public
     */

    should.exist = function (val, msg) {
      new Assertion(val, msg).to.exist;
    }

    // negation
    should.not = {}

    /**
     * ### .not.equal(actual, expected, [message])
     *
     * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
     *
     *     should.not.equal(3, 4, 'these numbers are not equal');
     *
     * @name not.equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.not.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.not.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/regexp], [message])
     *
     * Asserts that `function` will _not_ throw an error that is an instance of
     * `constructor`, or alternately that it will not throw an error with message
     * matching `regexp`.
     *
     *     should.not.throw(fn, Error, 'function does not throw');
     *
     * @name not.throw
     * @alias not.Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.not.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.not.Throw(errt, errs);
    };

    /**
     * ### .not.exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var bar = null;
     *
     *     should.not.exist(bar, 'bar does not exist');
     *
     * @name not.exist
     * @namespace Should
     * @api public
     */

    should.not.exist = function (val, msg) {
      new Assertion(val, msg).to.not.exist;
    }

    should['throw'] = should['Throw'];
    should.not['throw'] = should.not['Throw'];

    return should;
  };

  chai.should = loadShould;
  chai.Should = loadShould;
};


/***/ }),
/* 89 */
/***/ (function(module, exports) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */


module.exports = function (chai, util) {

  /*!
   * Chai dependencies.
   */

  var Assertion = chai.Assertion
    , flag = util.flag;

  /*!
   * Module export.
   */

  /**
   * ### assert(expression, message)
   *
   * Write your own test expressions.
   *
   *     assert('foo' !== 'bar', 'foo is not bar');
   *     assert(Array.isArray([]), 'empty arrays are arrays');
   *
   * @param {Mixed} expression to test for truthiness
   * @param {String} message to display on error
   * @name assert
   * @namespace Assert
   * @api public
   */

  var assert = chai.assert = function (express, errmsg) {
    var test = new Assertion(null, null, chai.assert, true);
    test.assert(
        express
      , errmsg
      , '[ negation message unavailable ]'
    );
  };

  /**
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure. Node.js `assert` module-compatible.
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace Assert
   * @api public
   */

  assert.fail = function (actual, expected, message, operator) {
    message = message || 'assert.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, assert.fail);
  };

  /**
   * ### .isOk(object, [message])
   *
   * Asserts that `object` is truthy.
   *
   *     assert.isOk('everything', 'everything is ok');
   *     assert.isOk(false, 'this will fail');
   *
   * @name isOk
   * @alias ok
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isOk = function (val, msg) {
    new Assertion(val, msg, assert.isOk, true).is.ok;
  };

  /**
   * ### .isNotOk(object, [message])
   *
   * Asserts that `object` is falsy.
   *
   *     assert.isNotOk('everything', 'this will fail');
   *     assert.isNotOk(false, 'this will pass');
   *
   * @name isNotOk
   * @alias notOk
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotOk = function (val, msg) {
    new Assertion(val, msg, assert.isNotOk, true).is.not.ok;
  };

  /**
   * ### .equal(actual, expected, [message])
   *
   * Asserts non-strict equality (`==`) of `actual` and `expected`.
   *
   *     assert.equal(3, '3', '== coerces values to strings');
   *
   * @name equal
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.equal = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.equal, true);

    test.assert(
        exp == flag(test, 'object')
      , 'expected #{this} to equal #{exp}'
      , 'expected #{this} to not equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .notEqual(actual, expected, [message])
   *
   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
   *
   *     assert.notEqual(3, 4, 'these numbers are not equal');
   *
   * @name notEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notEqual = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.notEqual, true);

    test.assert(
        exp != flag(test, 'object')
      , 'expected #{this} to not equal #{exp}'
      , 'expected #{this} to equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .strictEqual(actual, expected, [message])
   *
   * Asserts strict equality (`===`) of `actual` and `expected`.
   *
   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
   *
   * @name strictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.strictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.strictEqual, true).to.equal(exp);
  };

  /**
   * ### .notStrictEqual(actual, expected, [message])
   *
   * Asserts strict inequality (`!==`) of `actual` and `expected`.
   *
   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
   *
   * @name notStrictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notStrictEqual, true).to.not.equal(exp);
  };

  /**
   * ### .deepEqual(actual, expected, [message])
   *
   * Asserts that `actual` is deeply equal to `expected`.
   *
   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
   *
   * @name deepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @alias deepStrictEqual
   * @namespace Assert
   * @api public
   */

  assert.deepEqual = assert.deepStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.deepEqual, true).to.eql(exp);
  };

  /**
   * ### .notDeepEqual(actual, expected, [message])
   *
   * Assert that `actual` is not deeply equal to `expected`.
   *
   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
   *
   * @name notDeepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notDeepEqual, true).to.not.eql(exp);
  };

   /**
   * ### .isAbove(valueToCheck, valueToBeAbove, [message])
   *
   * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`.
   *
   *     assert.isAbove(5, 2, '5 is strictly greater than 2');
   *
   * @name isAbove
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAbove
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAbove = function (val, abv, msg) {
    new Assertion(val, msg, assert.isAbove, true).to.be.above(abv);
  };

   /**
   * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
   *
   * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`.
   *
   *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
   *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
   *
   * @name isAtLeast
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtLeast
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtLeast = function (val, atlst, msg) {
    new Assertion(val, msg, assert.isAtLeast, true).to.be.least(atlst);
  };

   /**
   * ### .isBelow(valueToCheck, valueToBeBelow, [message])
   *
   * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`.
   *
   *     assert.isBelow(3, 6, '3 is strictly less than 6');
   *
   * @name isBelow
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeBelow
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBelow = function (val, blw, msg) {
    new Assertion(val, msg, assert.isBelow, true).to.be.below(blw);
  };

   /**
   * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
   *
   * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`.
   *
   *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
   *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
   *
   * @name isAtMost
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtMost
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtMost = function (val, atmst, msg) {
    new Assertion(val, msg, assert.isAtMost, true).to.be.most(atmst);
  };

  /**
   * ### .isTrue(value, [message])
   *
   * Asserts that `value` is true.
   *
   *     var teaServed = true;
   *     assert.isTrue(teaServed, 'the tea has been served');
   *
   * @name isTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isTrue = function (val, msg) {
    new Assertion(val, msg, assert.isTrue, true).is['true'];
  };

  /**
   * ### .isNotTrue(value, [message])
   *
   * Asserts that `value` is not true.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotTrue(tea, 'great, time for tea!');
   *
   * @name isNotTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotTrue = function (val, msg) {
    new Assertion(val, msg, assert.isNotTrue, true).to.not.equal(true);
  };

  /**
   * ### .isFalse(value, [message])
   *
   * Asserts that `value` is false.
   *
   *     var teaServed = false;
   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
   *
   * @name isFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFalse = function (val, msg) {
    new Assertion(val, msg, assert.isFalse, true).is['false'];
  };

  /**
   * ### .isNotFalse(value, [message])
   *
   * Asserts that `value` is not false.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotFalse(tea, 'great, time for tea!');
   *
   * @name isNotFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFalse = function (val, msg) {
    new Assertion(val, msg, assert.isNotFalse, true).to.not.equal(false);
  };

  /**
   * ### .isNull(value, [message])
   *
   * Asserts that `value` is null.
   *
   *     assert.isNull(err, 'there was no error');
   *
   * @name isNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNull = function (val, msg) {
    new Assertion(val, msg, assert.isNull, true).to.equal(null);
  };

  /**
   * ### .isNotNull(value, [message])
   *
   * Asserts that `value` is not null.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotNull(tea, 'great, time for tea!');
   *
   * @name isNotNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNull = function (val, msg) {
    new Assertion(val, msg, assert.isNotNull, true).to.not.equal(null);
  };

  /**
   * ### .isNaN
   *
   * Asserts that value is NaN.
   *
   *     assert.isNaN(NaN, 'NaN is NaN');
   *
   * @name isNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNaN, true).to.be.NaN;
  };

  /**
   * ### .isNotNaN
   *
   * Asserts that value is not NaN.
   *
   *     assert.isNotNaN(4, '4 is not NaN');
   *
   * @name isNotNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */
  assert.isNotNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNotNaN, true).not.to.be.NaN;
  };

  /**
   * ### .exists
   *
   * Asserts that the target is neither `null` nor `undefined`.
   *
   *     var foo = 'hi';
   *
   *     assert.exists(foo, 'foo is neither `null` nor `undefined`');
   *
   * @name exists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.exists = function (val, msg) {
    new Assertion(val, msg, assert.exists, true).to.exist;
  };

  /**
   * ### .notExists
   *
   * Asserts that the target is either `null` or `undefined`.
   *
   *     var bar = null
   *       , baz;
   *
   *     assert.notExists(bar);
   *     assert.notExists(baz, 'baz is either null or undefined');
   *
   * @name notExists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notExists = function (val, msg) {
    new Assertion(val, msg, assert.notExists, true).to.not.exist;
  };

  /**
   * ### .isUndefined(value, [message])
   *
   * Asserts that `value` is `undefined`.
   *
   *     var tea;
   *     assert.isUndefined(tea, 'no tea defined');
   *
   * @name isUndefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isUndefined = function (val, msg) {
    new Assertion(val, msg, assert.isUndefined, true).to.equal(undefined);
  };

  /**
   * ### .isDefined(value, [message])
   *
   * Asserts that `value` is not `undefined`.
   *
   *     var tea = 'cup of chai';
   *     assert.isDefined(tea, 'tea has been defined');
   *
   * @name isDefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isDefined = function (val, msg) {
    new Assertion(val, msg, assert.isDefined, true).to.not.equal(undefined);
  };

  /**
   * ### .isFunction(value, [message])
   *
   * Asserts that `value` is a function.
   *
   *     function serveTea() { return 'cup of tea'; };
   *     assert.isFunction(serveTea, 'great, we can have tea now');
   *
   * @name isFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFunction = function (val, msg) {
    new Assertion(val, msg, assert.isFunction, true).to.be.a('function');
  };

  /**
   * ### .isNotFunction(value, [message])
   *
   * Asserts that `value` is _not_ a function.
   *
   *     var serveTea = [ 'heat', 'pour', 'sip' ];
   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
   *
   * @name isNotFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFunction = function (val, msg) {
    new Assertion(val, msg, assert.isNotFunction, true).to.not.be.a('function');
  };

  /**
   * ### .isObject(value, [message])
   *
   * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
   * _The assertion does not match subclassed objects._
   *
   *     var selection = { name: 'Chai', serve: 'with spices' };
   *     assert.isObject(selection, 'tea selection is an object');
   *
   * @name isObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isObject = function (val, msg) {
    new Assertion(val, msg, assert.isObject, true).to.be.a('object');
  };

  /**
   * ### .isNotObject(value, [message])
   *
   * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
   *
   *     var selection = 'chai'
   *     assert.isNotObject(selection, 'tea selection is not an object');
   *     assert.isNotObject(null, 'null is not an object');
   *
   * @name isNotObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotObject = function (val, msg) {
    new Assertion(val, msg, assert.isNotObject, true).to.not.be.a('object');
  };

  /**
   * ### .isArray(value, [message])
   *
   * Asserts that `value` is an array.
   *
   *     var menu = [ 'green', 'chai', 'oolong' ];
   *     assert.isArray(menu, 'what kind of tea do we want?');
   *
   * @name isArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isArray = function (val, msg) {
    new Assertion(val, msg, assert.isArray, true).to.be.an('array');
  };

  /**
   * ### .isNotArray(value, [message])
   *
   * Asserts that `value` is _not_ an array.
   *
   *     var menu = 'green|chai|oolong';
   *     assert.isNotArray(menu, 'what kind of tea do we want?');
   *
   * @name isNotArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotArray = function (val, msg) {
    new Assertion(val, msg, assert.isNotArray, true).to.not.be.an('array');
  };

  /**
   * ### .isString(value, [message])
   *
   * Asserts that `value` is a string.
   *
   *     var teaOrder = 'chai';
   *     assert.isString(teaOrder, 'order placed');
   *
   * @name isString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isString = function (val, msg) {
    new Assertion(val, msg, assert.isString, true).to.be.a('string');
  };

  /**
   * ### .isNotString(value, [message])
   *
   * Asserts that `value` is _not_ a string.
   *
   *     var teaOrder = 4;
   *     assert.isNotString(teaOrder, 'order placed');
   *
   * @name isNotString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotString = function (val, msg) {
    new Assertion(val, msg, assert.isNotString, true).to.not.be.a('string');
  };

  /**
   * ### .isNumber(value, [message])
   *
   * Asserts that `value` is a number.
   *
   *     var cups = 2;
   *     assert.isNumber(cups, 'how many cups');
   *
   * @name isNumber
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNumber, true).to.be.a('number');
  };

  /**
   * ### .isNotNumber(value, [message])
   *
   * Asserts that `value` is _not_ a number.
   *
   *     var cups = '2 cups please';
   *     assert.isNotNumber(cups, 'how many cups');
   *
   * @name isNotNumber
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNotNumber, true).to.not.be.a('number');
  };

   /**
   * ### .isFinite(value, [message])
   *
   * Asserts that `value` is a finite number. Unlike `.isNumber`, this will fail for `NaN` and `Infinity`.
   *
   *     var cups = 2;
   *     assert.isFinite(cups, 'how many cups');
   *
   *     assert.isFinite(NaN); // throws
   *
   * @name isFinite
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFinite = function (val, msg) {
    new Assertion(val, msg, assert.isFinite, true).to.be.finite;
  };

  /**
   * ### .isBoolean(value, [message])
   *
   * Asserts that `value` is a boolean.
   *
   *     var teaReady = true
   *       , teaServed = false;
   *
   *     assert.isBoolean(teaReady, 'is the tea ready');
   *     assert.isBoolean(teaServed, 'has tea been served');
   *
   * @name isBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isBoolean, true).to.be.a('boolean');
  };

  /**
   * ### .isNotBoolean(value, [message])
   *
   * Asserts that `value` is _not_ a boolean.
   *
   *     var teaReady = 'yep'
   *       , teaServed = 'nope';
   *
   *     assert.isNotBoolean(teaReady, 'is the tea ready');
   *     assert.isNotBoolean(teaServed, 'has tea been served');
   *
   * @name isNotBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isNotBoolean, true).to.not.be.a('boolean');
  };

  /**
   * ### .typeOf(value, name, [message])
   *
   * Asserts that `value`'s type is `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
   *     assert.typeOf('tea', 'string', 'we have a string');
   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
   *     assert.typeOf(null, 'null', 'we have a null');
   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
   *
   * @name typeOf
   * @param {Mixed} value
   * @param {String} name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.typeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.typeOf, true).to.be.a(type);
  };

  /**
   * ### .notTypeOf(value, name, [message])
   *
   * Asserts that `value`'s type is _not_ `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
   *
   * @name notTypeOf
   * @param {Mixed} value
   * @param {String} typeof name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notTypeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notTypeOf, true).to.not.be.a(type);
  };

  /**
   * ### .instanceOf(object, constructor, [message])
   *
   * Asserts that `value` is an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new Tea('chai');
   *
   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
   *
   * @name instanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.instanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.instanceOf, true).to.be.instanceOf(type);
  };

  /**
   * ### .notInstanceOf(object, constructor, [message])
   *
   * Asserts `value` is not an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new String('chai');
   *
   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
   *
   * @name notInstanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInstanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notInstanceOf, true)
      .to.not.be.instanceOf(type);
  };

  /**
   * ### .include(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.include([1,2,3], 2, 'array contains value');
   *     assert.include('foobar', 'foo', 'string contains substring');
   *     assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
   *
   * Strict equality (===) is used. When asserting the inclusion of a value in
   * an array, the array is searched for an element that's strictly equal to the
   * given value. When asserting a subset of properties in an object, the object
   * is searched for the given property keys, checking that each one is present
   * and stricty equal to the given property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.include([obj1, obj2], obj1);
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1});
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
   *
   * @name include
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.include = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.include, true).include(inc);
  };

  /**
   * ### .notInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.notInclude([1,2,3], 4, 'array doesn't contain value');
   *     assert.notInclude('foobar', 'baz', 'string doesn't contain substring');
   *     assert.notInclude({ foo: 'bar', hello: 'universe' }, { foo: 'baz' }, 'object doesn't contain property');
   *
   * Strict equality (===) is used. When asserting the absence of a value in an
   * array, the array is searched to confirm the absence of an element that's
   * strictly equal to the given value. When asserting a subset of properties in
   * an object, the object is searched to confirm that at least one of the given
   * property keys is either not present or not strictly equal to the given
   * property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notInclude([obj1, obj2], {a: 1});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: {b: 2}});
   *
   * @name notInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notInclude, true).not.include(inc);
  };

  /**
   * ### .deepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.deepInclude([obj1, obj2], {a: 1});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
   *
   * @name deepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.deepInclude, true).deep.include(inc);
  };

  /**
   * ### .notDeepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notDeepInclude([obj1, obj2], {a: 9});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
   *
   * @name notDeepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepInclude, true).not.deep.include(inc);
  };

  /**
   * ### .nestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'. 
   * Can be used to assert the inclusion of a subset of properties in an 
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.nestedInclude({'.a': {'b': 'x'}}, {'\\.a.[b]': 'x'});
   *     assert.nestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'x'});
   * 
   * @name nestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */ 

  assert.nestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.nestedInclude, true).nested.include(inc);
  };

  /**
   * ### .notNestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' does not include 'needle'. 
   * Can be used to assert the absence of a subset of properties in an 
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties. 
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.notNestedInclude({'.a': {'b': 'x'}}, {'\\.a.b': 'y'});
   *     assert.notNestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'y'});
   * 
   * @name notNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */ 

  assert.notNestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notNestedInclude, true)
      .not.nested.include(inc);
  };

  /**
   * ### .deepNestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an 
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.deepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {x: 1}});
   *     assert.deepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {x: 1}});
   *    
   * @name deepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */

  assert.deepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepNestedInclude, true)
      .deep.nested.include(inc);
  };

  /**
   * ### .notDeepNestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' does not include 'needle'.
   * Can be used to assert the absence of a subset of properties in an 
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.notDeepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {y: 1}})
   *     assert.notDeepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {y: 2}});
   *    
   * @name notDeepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */

  assert.notDeepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepNestedInclude, true)
      .not.deep.nested.include(inc);
  };

  /**
   * ### .ownInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an 
   * object while ignoring inherited properties.
   * 
   *     assert.ownInclude({ a: 1 }, { a: 1 });
   * 
   * @name ownInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.ownInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.ownInclude, true).own.include(inc);
  };

  /**
   * ### .notOwnInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an 
   * object while ignoring inherited properties.
   * 
   *     Object.prototype.b = 2;
   * 
   *     assert.notOwnInclude({ a: 1 }, { b: 2 });
   * 
   * @name notOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notOwnInclude, true).not.own.include(inc);
  };

  /**
   * ### .deepOwnInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an 
   * object while ignoring inherited properties and checking for deep equality.
   * 
   *      assert.deepOwnInclude({a: {b: 2}}, {a: {b: 2}});
   *      
   * @name deepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepOwnInclude, true)
      .deep.own.include(inc);
  };

   /**
   * ### .notDeepOwnInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an 
   * object while ignoring inherited properties and checking for deep equality.
   * 
   *      assert.notDeepOwnInclude({a: {b: 2}}, {a: {c: 3}});
   *      
   * @name notDeepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepOwnInclude, true)
      .not.deep.own.include(inc);
  };

  /**
   * ### .match(value, regexp, [message])
   *
   * Asserts that `value` matches the regular expression `regexp`.
   *
   *     assert.match('foobar', /^foo/, 'regexp matches');
   *
   * @name match
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.match = function (exp, re, msg) {
    new Assertion(exp, msg, assert.match, true).to.match(re);
  };

  /**
   * ### .notMatch(value, regexp, [message])
   *
   * Asserts that `value` does not match the regular expression `regexp`.
   *
   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
   *
   * @name notMatch
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notMatch = function (exp, re, msg) {
    new Assertion(exp, msg, assert.notMatch, true).to.not.match(re);
  };

  /**
   * ### .property(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`.
   *
   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
   *     assert.property({ tea: { green: 'matcha' }}, 'toString');
   *
   * @name property
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.property = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.property, true).to.have.property(prop);
  };

  /**
   * ### .notProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property`.
   *
   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
   *
   * @name notProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notProperty, true)
      .to.not.have.property(prop);
  };

  /**
   * ### .propertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
   *
   * @name propertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.propertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.propertyVal, true)
      .to.have.property(prop, val);
  };

  /**
   * ### .notPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.notPropertyVal({ tea: 'is good' }, 'tea', 'is bad');
   *     assert.notPropertyVal({ tea: 'is good' }, 'coffee', 'is good');
   *
   * @name notPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notPropertyVal, true)
      .to.not.have.property(prop, val);
  };

  /**
   * ### .deepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a deep equality check.
   *
   *     assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepPropertyVal, true)
      .to.have.deep.property(prop, val);
  };

  /**
   * ### .notDeepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a deep equality check.
   *
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *
   * @name notDeepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepPropertyVal, true)
      .to.not.have.deep.property(prop, val);
  };

  /**
   * ### .ownProperty(object, property, [message])
   *
   * Asserts that `object` has a direct property named by `property`. Inherited
   * properties aren't checked.
   *
   *     assert.ownProperty({ tea: { green: 'matcha' }}, 'tea');
   *
   * @name ownProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.ownProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.ownProperty, true)
      .to.have.own.property(prop);
  };

  /**
   * ### .notOwnProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by
   * `property`. Inherited properties aren't checked.
   *
   *     assert.notOwnProperty({ tea: { green: 'matcha' }}, 'coffee');
   *     assert.notOwnProperty({}, 'toString');
   *
   * @name notOwnProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.notOwnProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notOwnProperty, true)
      .to.not.have.own.property(prop);
  };

  /**
   * ### .ownPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a strict equality check (===).
   * Inherited properties aren't checked.
   *
   *     assert.ownPropertyVal({ coffee: 'is good'}, 'coffee', 'is good');
   *
   * @name ownPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.ownPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.ownPropertyVal, true)
      .to.have.own.property(prop, value);
  };

  /**
   * ### .notOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a strict equality check
   * (===). Inherited properties aren't checked.
   *
   *     assert.notOwnPropertyVal({ tea: 'is better'}, 'tea', 'is worse');
   *     assert.notOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notOwnPropertyVal, true)
      .to.not.have.own.property(prop, value);
  };

  /**
   * ### .deepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a deep equality check. Inherited
   * properties aren't checked.
   *
   *     assert.deepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.deepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.deepOwnPropertyVal, true)
      .to.have.deep.own.property(prop, value);
  };

  /**
   * ### .notDeepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a deep equality check.
   * Inherited properties aren't checked.
   *
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *     assert.notDeepOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notDeepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notDeepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notDeepOwnPropertyVal, true)
      .to.not.have.deep.own.property(prop, value);
  };

  /**
   * ### .nestedProperty(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`, which can be a string using dot- and bracket-notation for
   * nested reference.
   *
   *     assert.nestedProperty({ tea: { green: 'matcha' }}, 'tea.green');
   *
   * @name nestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.nestedProperty, true)
      .to.have.nested.property(prop);
  };

  /**
   * ### .notNestedProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property`, which
   * can be a string using dot- and bracket-notation for nested reference. The
   * property cannot exist on the object nor anywhere in its prototype chain.
   *
   *     assert.notNestedProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
   *
   * @name notNestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notNestedProperty, true)
      .to.not.have.nested.property(prop);
  };

  /**
   * ### .nestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a strict equality check (===).
   *
   *     assert.nestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
   *
   * @name nestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.nestedPropertyVal, true)
      .to.have.nested.property(prop, val);
  };

  /**
   * ### .notNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a strict equality check (===).
   *
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'coffee.green', 'matcha');
   *
   * @name notNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notNestedPropertyVal, true)
      .to.not.have.nested.property(prop, val);
  };

  /**
   * ### .deepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with a value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a deep equality check.
   *
   *     assert.deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
   *
   * @name deepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepNestedPropertyVal, true)
      .to.have.deep.nested.property(prop, val);
  };

  /**
   * ### .notDeepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a deep equality check.
   *
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });
   *
   * @name notDeepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepNestedPropertyVal, true)
      .to.not.have.deep.nested.property(prop, val);
  }

  /**
   * ### .lengthOf(object, length, [message])
   *
   * Asserts that `object` has a `length` property with the expected value.
   *
   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
   *     assert.lengthOf('foobar', 6, 'string has length of 6');
   *
   * @name lengthOf
   * @param {Mixed} object
   * @param {Number} length
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.lengthOf = function (exp, len, msg) {
    new Assertion(exp, msg, assert.lengthOf, true).to.have.lengthOf(len);
  };

  /**
   * ### .hasAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
   *     assert.hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAnyKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyKeys, true).to.have.any.keys(keys);
  }

  /**
   * ### .hasAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337]);
   *     assert.hasAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllKeys, true).to.have.all.keys(keys);
  }

  /**
   * ### .containsAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all of the `keys` provided but may have more keys not listed.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, baz: 1337});
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}]);
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}]);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name containsAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllKeys, true)
      .to.contain.all.keys(keys);
  }

  /**
   * ### .doesNotHaveAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAnyKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAnyKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyKeys, true)
      .to.not.have.any.keys(keys);
  }

  /**
   * ### .doesNotHaveAllKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllKeys, true)
      .to.not.have.all.keys(keys);
  }

  /**
   * ### .hasAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {three: 'three'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name doesNotHaveAllKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyDeepKeys, true)
      .to.have.any.deep.keys(keys);
  }

 /**
   * ### .hasAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne']]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name hasAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllDeepKeys, true)
      .to.have.all.deep.keys(keys);
  }

 /**
   * ### .containsAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` contains all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name containsAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllDeepKeys, true)
      .to.contain.all.deep.keys(keys);
  }

 /**
   * ### .doesNotHaveAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAnyDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyDeepKeys, true)
      .to.not.have.any.deep.keys(keys);
  }

 /**
   * ### .doesNotHaveAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {one: 'one'}]);
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllDeepKeys, true)
      .to.not.have.all.deep.keys(keys);
  }

 /**
   * ### .throws(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will have a
   * message matching `errMsgMatcher`.
   *
   *     assert.throws(fn, 'function throws a reference error');
   *     assert.throws(fn, /function throws a reference error/);
   *     assert.throws(fn, ReferenceError);
   *     assert.throws(fn, errorInstance);
   *     assert.throws(fn, ReferenceError, 'Error thrown must be a ReferenceError and have this msg');
   *     assert.throws(fn, errorInstance, 'Error thrown must be the same errorInstance and have this msg');
   *     assert.throws(fn, ReferenceError, /Error thrown must be a ReferenceError and match this/);
   *     assert.throws(fn, errorInstance, /Error thrown must be the same errorInstance and match this/);
   *
   * @name throws
   * @alias throw
   * @alias Throw
   * @param {Function} fn
   * @param {ErrorConstructor|Error} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.throws = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var assertErr = new Assertion(fn, msg, assert.throws, true)
      .to.throw(errorLike, errMsgMatcher);
    return flag(assertErr, 'object');
  };

  /**
   * ### .doesNotThrow(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will _not_ throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is _not_ the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will _not_ have a
   * message matching `errMsgMatcher`.
   *
   *     assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
   *     assert.doesNotThrow(fn, /Any Error thrown must not match this/);
   *     assert.doesNotThrow(fn, Error);
   *     assert.doesNotThrow(fn, errorInstance);
   *     assert.doesNotThrow(fn, Error, 'Error must not have this message');
   *     assert.doesNotThrow(fn, errorInstance, 'Error must not have this message');
   *     assert.doesNotThrow(fn, Error, /Error must not match this/);
   *     assert.doesNotThrow(fn, errorInstance, /Error must not match this/);
   *
   * @name doesNotThrow
   * @param {Function} fn
   * @param {ErrorConstructor} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.doesNotThrow = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    new Assertion(fn, msg, assert.doesNotThrow, true)
      .to.not.throw(errorLike, errMsgMatcher);
  };

  /**
   * ### .operator(val1, operator, val2, [message])
   *
   * Compares two values using `operator`.
   *
   *     assert.operator(1, '<', 2, 'everything is ok');
   *     assert.operator(1, '>', 2, 'this will fail');
   *
   * @name operator
   * @param {Mixed} val1
   * @param {String} operator
   * @param {Mixed} val2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.operator = function (val, operator, val2, msg) {
    var ok;
    switch(operator) {
      case '==':
        ok = val == val2;
        break;
      case '===':
        ok = val === val2;
        break;
      case '>':
        ok = val > val2;
        break;
      case '>=':
        ok = val >= val2;
        break;
      case '<':
        ok = val < val2;
        break;
      case '<=':
        ok = val <= val2;
        break;
      case '!=':
        ok = val != val2;
        break;
      case '!==':
        ok = val !== val2;
        break;
      default:
        msg = msg ? msg + ': ' : msg;
        throw new chai.AssertionError(
          msg + 'Invalid operator "' + operator + '"',
          undefined,
          assert.operator
        );
    }
    var test = new Assertion(ok, msg, assert.operator, true);
    test.assert(
        true === flag(test, 'object')
      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
  };

  /**
   * ### .closeTo(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
   *
   * @name closeTo
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.closeTo = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.closeTo, true).to.be.closeTo(exp, delta);
  };

  /**
   * ### .approximately(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
   *
   * @name approximately
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.approximately = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.approximately, true)
      .to.be.approximately(exp, delta);
  };

  /**
   * ### .sameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * strict equality check (===).
   *
   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
   *
   * @name sameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameMembers, true)
      .to.have.same.members(set2);
  }

  /**
   * ### .notSameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a strict equality check (===).
   *
   *     assert.notSameMembers([ 1, 2, 3 ], [ 5, 1, 3 ], 'not same members');
   *
   * @name notSameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameMembers, true)
      .to.not.have.same.members(set2);
  }

  /**
   * ### .sameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * deep equality check.
   *
   *     assert.sameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members');
   *
   * @name sameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepMembers, true)
      .to.have.same.deep.members(set2);
  }

  /**
   * ### .notSameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a deep equality check.
   *
   *     assert.notSameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { f: 5 }], 'not same deep members');
   *
   * @name notSameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepMembers, true)
      .to.not.have.same.deep.members(set2);
  }

  /**
   * ### .sameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a strict equality check (===).
   *
   *     assert.sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ], 'same ordered members');
   *
   * @name sameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameOrderedMembers, true)
      .to.have.same.ordered.members(set2);
  }

  /**
   * ### .notSameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a strict equality check (===).
   *
   *     assert.notSameOrderedMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'not same ordered members');
   *
   * @name notSameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameOrderedMembers, true)
      .to.not.have.same.ordered.members(set2);
  }

  /**
   * ### .sameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a deep equality check.
   *
   * assert.sameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { c: 3 } ], 'same deep ordered members');
   *
   * @name sameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepOrderedMembers, true)
      .to.have.same.deep.ordered.members(set2);
  }

  /**
   * ### .notSameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a deep equality check.
   *
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { z: 5 } ], 'not same deep ordered members');
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { c: 3 } ], 'not same deep ordered members');
   *
   * @name notSameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepOrderedMembers, true)
      .to.not.have.same.deep.ordered.members(set2);
  }

  /**
   * ### .includeMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1, 2 ], 'include members');
   *
   * @name includeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeMembers, true)
      .to.include.members(subset);
  }

  /**
   * ### .notIncludeMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.notIncludeMembers([ 1, 2, 3 ], [ 5, 1 ], 'not include members');
   *
   * @name notIncludeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeMembers, true)
      .to.not.include.members(subset);
  }

  /**
   * ### .includeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a deep
   * equality check. Duplicates are ignored.
   *
   *     assert.includeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { b: 2 } ], 'include deep members');
   *
   * @name includeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepMembers, true)
      .to.include.deep.members(subset);
  }

  /**
   * ### .notIncludeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * deep equality check. Duplicates are ignored.
   *
   *     assert.notIncludeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { f: 5 } ], 'not include deep members');
   *
   * @name notIncludeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepMembers, true)
      .to.not.include.deep.members(subset);
  }

  /**
   * ### .includeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.includeOrderedMembers([ 1, 2, 3 ], [ 1, 2 ], 'include ordered members');
   *
   * @name includeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeOrderedMembers, true)
      .to.include.ordered.members(subset);
  }

  /**
   * ### .notIncludeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 1 ], 'not include ordered members');
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 3 ], 'not include ordered members');
   *
   * @name notIncludeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeOrderedMembers, true)
      .to.not.include.ordered.members(subset);
  }

  /**
   * ### .includeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.includeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 } ], 'include deep ordered members');
   *
   * @name includeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepOrderedMembers, true)
      .to.include.deep.ordered.members(subset);
  }

  /**
   * ### .notIncludeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { f: 5 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { c: 3 } ], 'not include deep ordered members');
   *
   * @name notIncludeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepOrderedMembers, true)
      .to.not.include.deep.ordered.members(subset);
  }

  /**
   * ### .oneOf(inList, list, [message])
   *
   * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
   *
   *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
   *
   * @name oneOf
   * @param {*} inList
   * @param {Array<*>} list
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.oneOf = function (inList, list, msg) {
    new Assertion(inList, msg, assert.oneOf, true).to.be.oneOf(list);
  }

  /**
   * ### .changes(function, object, property, [message])
   *
   * Asserts that a function changes the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 22 };
   *     assert.changes(fn, obj, 'val');
   *
   * @name changes
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changes = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changes, true).to.change(obj, prop);
  }

   /**
   * ### .changesBy(function, object, property, delta, [message])
   *
   * Asserts that a function changes the value of a property by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 2 };
   *     assert.changesBy(fn, obj, 'val', 2);
   *
   * @name changesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesBy, true)
      .to.change(obj, prop).by(delta);
  }

   /**
   * ### .doesNotChange(function, object, property, [message])
   *
   * Asserts that a function does not change the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { console.log('foo'); };
   *     assert.doesNotChange(fn, obj, 'val');
   *
   * @name doesNotChange
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotChange = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotChange, true)
      .to.not.change(obj, prop);
  }

  /**
   * ### .changesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not change the value of a property or of a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.changesButNotBy(fn, obj, 'val', 5);
   *
   * @name changesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesButNotBy, true)
      .to.change(obj, prop).but.not.by(delta);
  }

  /**
   * ### .increases(function, object, property, [message])
   *
   * Asserts that a function increases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 13 };
   *     assert.increases(fn, obj, 'val');
   *
   * @name increases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.increases, true)
      .to.increase(obj, prop);
  }

  /**
   * ### .increasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function increases a numeric object property or a function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.increasesBy(fn, obj, 'val', 10);
   *
   * @name increasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesBy, true)
      .to.increase(obj, prop).by(delta);
  }

  /**
   * ### .doesNotIncrease(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 8 };
   *     assert.doesNotIncrease(fn, obj, 'val');
   *
   * @name doesNotIncrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotIncrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotIncrease, true)
      .to.not.increase(obj, prop);
  }

  /**
   * ### .increasesButNotBy(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property or function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.increasesButNotBy(fn, obj, 'val', 10);
   *
   * @name increasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesButNotBy, true)
      .to.increase(obj, prop).but.not.by(delta);
  }

  /**
   * ### .decreases(function, object, property, [message])
   *
   * Asserts that a function decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreases(fn, obj, 'val');
   *
   * @name decreases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.decreases, true)
      .to.decrease(obj, prop);
  }

  /**
   * ### .decreasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val -= 5 };
   *     assert.decreasesBy(fn, obj, 'val', 5);
   *
   * @name decreasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesBy, true)
      .to.decrease(obj, prop).by(delta);
  }

  /**
   * ### .doesNotDecrease(function, object, property, [message])
   *
   * Asserts that a function does not decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.doesNotDecrease(fn, obj, 'val');
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecrease, true)
      .to.not.decrease(obj, prop);
  }

  /**
   * ### .doesNotDecreaseBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.doesNotDecreaseBy(fn, obj, 'val', 1);
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecreaseBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecreaseBy, true)
      .to.not.decrease(obj, prop).by(delta);
  }

  /**
   * ### .decreasesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreasesButNotBy(fn, obj, 'val', 1);
   *
   * @name decreasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesButNotBy, true)
      .to.decrease(obj, prop).but.not.by(delta);
  }

  /*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   */

  assert.ifError = function (val) {
    if (val) {
      throw(val);
    }
  };

  /**
   * ### .isExtensible(object)
   *
   * Asserts that `object` is extensible (can have new properties added to it).
   *
   *     assert.isExtensible({});
   *
   * @name isExtensible
   * @alias extensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isExtensible, true).to.be.extensible;
  };

  /**
   * ### .isNotExtensible(object)
   *
   * Asserts that `object` is _not_ extensible.
   *
   *     var nonExtensibleObject = Object.preventExtensions({});
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     assert.isNotExtensible(nonExtensibleObject);
   *     assert.isNotExtensible(sealedObject);
   *     assert.isNotExtensible(frozenObject);
   *
   * @name isNotExtensible
   * @alias notExtensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotExtensible, true).to.not.be.extensible;
  };

  /**
   * ### .isSealed(object)
   *
   * Asserts that `object` is sealed (cannot have new properties added to it
   * and its existing properties cannot be removed).
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.seal({});
   *
   *     assert.isSealed(sealedObject);
   *     assert.isSealed(frozenObject);
   *
   * @name isSealed
   * @alias sealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isSealed, true).to.be.sealed;
  };

  /**
   * ### .isNotSealed(object)
   *
   * Asserts that `object` is _not_ sealed.
   *
   *     assert.isNotSealed({});
   *
   * @name isNotSealed
   * @alias notSealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotSealed, true).to.not.be.sealed;
  };

  /**
   * ### .isFrozen(object)
   *
   * Asserts that `object` is frozen (cannot have new properties added to it
   * and its existing properties cannot be modified).
   *
   *     var frozenObject = Object.freeze({});
   *     assert.frozen(frozenObject);
   *
   * @name isFrozen
   * @alias frozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isFrozen, true).to.be.frozen;
  };

  /**
   * ### .isNotFrozen(object)
   *
   * Asserts that `object` is _not_ frozen.
   *
   *     assert.isNotFrozen({});
   *
   * @name isNotFrozen
   * @alias notFrozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotFrozen, true).to.not.be.frozen;
  };

  /**
   * ### .isEmpty(target)
   *
   * Asserts that the target does not contain any values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isEmpty([]);
   *     assert.isEmpty('');
   *     assert.isEmpty(new Map);
   *     assert.isEmpty({});
   *
   * @name isEmpty
   * @alias empty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isEmpty, true).to.be.empty;
  };

  /**
   * ### .isNotEmpty(target)
   *
   * Asserts that the target contains values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isNotEmpty([1, 2]);
   *     assert.isNotEmpty('34');
   *     assert.isNotEmpty(new Set([5, 6]));
   *     assert.isNotEmpty({ key: 7 });
   *
   * @name isNotEmpty
   * @alias notEmpty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isNotEmpty, true).to.not.be.empty;
  };

  /*!
   * Aliases.
   */

  (function alias(name, as){
    assert[as] = assert[name];
    return alias;
  })
  ('isOk', 'ok')
  ('isNotOk', 'notOk')
  ('throws', 'throw')
  ('throws', 'Throw')
  ('isExtensible', 'extensible')
  ('isNotExtensible', 'notExtensible')
  ('isSealed', 'sealed')
  ('isNotSealed', 'notSealed')
  ('isFrozen', 'frozen')
  ('isNotFrozen', 'notFrozen')
  ('isEmpty', 'empty')
  ('isNotEmpty', 'notEmpty');
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIDM2M2Q3MDBmNDE3NDEzYzEwMDYzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXGZsYWcuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcY2hhaVxcbGliXFxjaGFpLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcY29uZmlnLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXHRyYW5zZmVyRmxhZ3MuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcY2hhaVxcbGliXFxjaGFpXFx1dGlsc1xcaW5zcGVjdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxjaGFpXFxsaWJcXGNoYWlcXHV0aWxzXFxpc1Byb3h5RW5hYmxlZC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxjaGFpXFxsaWJcXGNoYWlcXHV0aWxzXFxhZGRMZW5ndGhHdWFyZC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxjaGFpXFxsaWJcXGNoYWlcXHV0aWxzXFxwcm94aWZ5LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGUtZGV0ZWN0XFx0eXBlLWRldGVjdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxhc3NlcnRpb24tZXJyb3JcXGluZGV4LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXGdldEFjdHVhbC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxnZXQtZnVuYy1uYW1lXFxpbmRleC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxjaGFpXFxsaWJcXGNoYWlcXHV0aWxzXFxnZXRQcm9wZXJ0aWVzLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXG9iakRpc3BsYXkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcY2hhaVxcbGliXFxjaGFpXFx1dGlsc1xcZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcdGVzdFxcdHNcXE5vZGVUZXN0LnRzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGluZGV4LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXGluZGV4LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHBhdGh2YWxcXGluZGV4LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXHRlc3QuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcd2VicGFja1xcYnVpbGRpblxcZ2xvYmFsLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXGV4cGVjdFR5cGVzLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXGdldE1lc3NhZ2UuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcY2hhaVxcbGliXFxjaGFpXFx1dGlsc1xcZ2V0RW51bWVyYWJsZVByb3BlcnRpZXMuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcZGVlcC1lcWxcXGluZGV4LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXGFkZFByb3BlcnR5LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXGFkZE1ldGhvZC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxjaGFpXFxsaWJcXGNoYWlcXHV0aWxzXFxvdmVyd3JpdGVQcm9wZXJ0eS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxjaGFpXFxsaWJcXGNoYWlcXHV0aWxzXFxvdmVyd3JpdGVNZXRob2QuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcY2hhaVxcbGliXFxjaGFpXFx1dGlsc1xcYWRkQ2hhaW5hYmxlTWV0aG9kLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxjaGFpXFxsaWJcXGNoYWlcXHV0aWxzXFxjb21wYXJlQnlJbnNwZWN0LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcdXRpbHNcXGdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoZWNrLWVycm9yXFxpbmRleC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxjaGFpXFxsaWJcXGNoYWlcXHV0aWxzXFxpc05hTi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxjaGFpXFxsaWJcXGNoYWlcXGFzc2VydGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxjaGFpXFxsaWJcXGNoYWlcXGNvcmVcXGFzc2VydGlvbnMuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcY2hhaVxcbGliXFxjaGFpXFxpbnRlcmZhY2VcXGV4cGVjdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFxjaGFpXFxsaWJcXGNoYWlcXGludGVyZmFjZVxcc2hvdWxkLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXGNoYWlcXGxpYlxcY2hhaVxcaW50ZXJmYWNlXFxhc3NlcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CO0FBQ0EsV0FBVyxP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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbllEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLGlCQUFpQjtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQzs7QUFFakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksT0FBTztBQUNuQjs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLGtCQUFrQjs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHdCQUF3QjtBQUN2QyxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJBLGlDQUE4QjtBQUV0QixTQUEyQiw0QkFBRTtBQUNqQyxPQUFNLE9BQUU7QUFDUixZQUFZLFNBQWE7QUFDekIsZUFBTSxPQUFNLE1BQUUsSUFBSSxHQUNwQjtBQUNGO0FBQUcsRzs7Ozs7O0FDUkg7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQzNLQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQix1Q0FBdUM7QUFDdkMsK0JBQStCO0FBQy9CO0FBQ0Esc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQiwrQkFBK0I7QUFDL0I7QUFDQSxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLCtCQUErQjtBQUMvQjtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGNBQWM7QUFDekIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsZUFBZTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsRUFBRTtBQUNiLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZUFBZTtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsZ0RBQWdEO0FBQ2hEO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELG9CQUFvQjtBQUN6RTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE1BQU07QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esa0NBQWtDLHdCQUF3QixFQUFFO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBLHVDQUF1Qyw2QkFBNkIsRUFBRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxLQUFLO0FBQ2IsUUFBUSxJQUFJO0FBQ1osUUFBUSxJQUFJO0FBQ1o7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixNQUFNLGlCQUFpQix3QkFBd0IsRUFBRTtBQUNsRSxpQkFBaUIsS0FBSyxpQkFBaUIsMkJBQTJCLEVBQUU7QUFDcEUsaUJBQWlCLEtBQUssaUJBQWlCLDZCQUE2QixFQUFFOztBQUV0RTtBQUNBOzs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsV0FBVztBQUN0QixhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE1BQU07QUFDakIsV0FBVyxXQUFXO0FBQ3RCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQixXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsTUFBTTtBQUNqQixXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsSUFBSTtBQUNmLFdBQVcsSUFBSTtBQUNmLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7OztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixxQkFBcUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQixhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPLEdB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O0FBQ0E7QUFDQSxhQUFhLDRCQUE0QjtBQUN6QyxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsU0FBUztBQUNyQztBQUNBO0FBQ0E7QUFDQSxhQUFhLDRCQUE0QjtBQUN6QyxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2NSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzYzZDcwMGY0MTc0MTNjMTAwNjMiLCIvKiFcbiAqIENoYWkgLSBmbGFnIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuZmxhZyhvYmplY3QsIGtleSwgW3ZhbHVlXSlcbiAqXG4gKiBHZXQgb3Igc2V0IGEgZmxhZyB2YWx1ZSBvbiBhbiBvYmplY3QuIElmIGFcbiAqIHZhbHVlIGlzIHByb3ZpZGVkIGl0IHdpbGwgYmUgc2V0LCBlbHNlIGl0IHdpbGxcbiAqIHJldHVybiB0aGUgY3VycmVudGx5IHNldCB2YWx1ZSBvciBgdW5kZWZpbmVkYCBpZlxuICogdGhlIHZhbHVlIGlzIG5vdCBzZXQuXG4gKlxuICogICAgIHV0aWxzLmZsYWcodGhpcywgJ2ZvbycsICdiYXInKTsgLy8gc2V0dGVyXG4gKiAgICAgdXRpbHMuZmxhZyh0aGlzLCAnZm9vJyk7IC8vIGdldHRlciwgcmV0dXJucyBgYmFyYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgY29uc3RydWN0ZWQgQXNzZXJ0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAob3B0aW9uYWwpXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBmbGFnXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZsYWcob2JqLCBrZXksIHZhbHVlKSB7XG4gIHZhciBmbGFncyA9IG9iai5fX2ZsYWdzIHx8IChvYmouX19mbGFncyA9IE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGZsYWdzW2tleV0gPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmxhZ3Nba2V5XTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZmxhZy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiFcbiAqIGNoYWlcbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG52YXIgdXNlZCA9IFtdO1xuXG4vKiFcbiAqIENoYWkgdmVyc2lvblxuICovXG5cbmV4cG9ydHMudmVyc2lvbiA9ICc0LjEuMic7XG5cbi8qIVxuICogQXNzZXJ0aW9uIEVycm9yXG4gKi9cblxuZXhwb3J0cy5Bc3NlcnRpb25FcnJvciA9IHJlcXVpcmUoJ2Fzc2VydGlvbi1lcnJvcicpO1xuXG4vKiFcbiAqIFV0aWxzIGZvciBwbHVnaW5zIChub3QgZXhwb3J0ZWQpXG4gKi9cblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL2NoYWkvdXRpbHMnKTtcblxuLyoqXG4gKiAjIC51c2UoZnVuY3Rpb24pXG4gKlxuICogUHJvdmlkZXMgYSB3YXkgdG8gZXh0ZW5kIHRoZSBpbnRlcm5hbHMgb2YgQ2hhaS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQHJldHVybnMge3RoaXN9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnVzZSA9IGZ1bmN0aW9uIChmbikge1xuICBpZiAoIX51c2VkLmluZGV4T2YoZm4pKSB7XG4gICAgZm4oZXhwb3J0cywgdXRpbCk7XG4gICAgdXNlZC5wdXNoKGZuKTtcbiAgfVxuXG4gIHJldHVybiBleHBvcnRzO1xufTtcblxuLyohXG4gKiBVdGlsaXR5IEZ1bmN0aW9uc1xuICovXG5cbmV4cG9ydHMudXRpbCA9IHV0aWw7XG5cbi8qIVxuICogQ29uZmlndXJhdGlvblxuICovXG5cbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NoYWkvY29uZmlnJyk7XG5leHBvcnRzLmNvbmZpZyA9IGNvbmZpZztcblxuLyohXG4gKiBQcmltYXJ5IGBBc3NlcnRpb25gIHByb3RvdHlwZVxuICovXG5cbnZhciBhc3NlcnRpb24gPSByZXF1aXJlKCcuL2NoYWkvYXNzZXJ0aW9uJyk7XG5leHBvcnRzLnVzZShhc3NlcnRpb24pO1xuXG4vKiFcbiAqIENvcmUgQXNzZXJ0aW9uc1xuICovXG5cbnZhciBjb3JlID0gcmVxdWlyZSgnLi9jaGFpL2NvcmUvYXNzZXJ0aW9ucycpO1xuZXhwb3J0cy51c2UoY29yZSk7XG5cbi8qIVxuICogRXhwZWN0IGludGVyZmFjZVxuICovXG5cbnZhciBleHBlY3QgPSByZXF1aXJlKCcuL2NoYWkvaW50ZXJmYWNlL2V4cGVjdCcpO1xuZXhwb3J0cy51c2UoZXhwZWN0KTtcblxuLyohXG4gKiBTaG91bGQgaW50ZXJmYWNlXG4gKi9cblxudmFyIHNob3VsZCA9IHJlcXVpcmUoJy4vY2hhaS9pbnRlcmZhY2Uvc2hvdWxkJyk7XG5leHBvcnRzLnVzZShzaG91bGQpO1xuXG4vKiFcbiAqIEFzc2VydCBpbnRlcmZhY2VcbiAqL1xuXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnLi9jaGFpL2ludGVyZmFjZS9hc3NlcnQnKTtcbmV4cG9ydHMudXNlKGFzc2VydCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLmluY2x1ZGVTdGFja1xuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgaW5mbHVlbmNlcyB3aGV0aGVyIHN0YWNrIHRyYWNlXG4gICAqIGlzIGluY2x1ZGVkIGluIEFzc2VydGlvbiBlcnJvciBtZXNzYWdlLiBEZWZhdWx0IG9mIGZhbHNlXG4gICAqIHN1cHByZXNzZXMgc3RhY2sgdHJhY2UgaW4gdGhlIGVycm9yIG1lc3NhZ2UuXG4gICAqXG4gICAqICAgICBjaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2sgPSB0cnVlOyAgLy8gZW5hYmxlIHN0YWNrIG9uIGVycm9yXG4gICAqXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgaW5jbHVkZVN0YWNrOiBmYWxzZSxcblxuICAvKipcbiAgICogIyMjIGNvbmZpZy5zaG93RGlmZlxuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgaW5mbHVlbmNlcyB3aGV0aGVyIG9yIG5vdFxuICAgKiB0aGUgYHNob3dEaWZmYCBmbGFnIHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgdGhyb3duXG4gICAqIEFzc2VydGlvbkVycm9ycy4gYGZhbHNlYCB3aWxsIGFsd2F5cyBiZSBgZmFsc2VgOyBgdHJ1ZWBcbiAgICogd2lsbCBiZSB0cnVlIHdoZW4gdGhlIGFzc2VydGlvbiBoYXMgcmVxdWVzdGVkIGEgZGlmZlxuICAgKiBiZSBzaG93bi5cbiAgICpcbiAgICogQHBhcmFtIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBzaG93RGlmZjogdHJ1ZSxcblxuICAvKipcbiAgICogIyMjIGNvbmZpZy50cnVuY2F0ZVRocmVzaG9sZFxuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgc2V0cyBsZW5ndGggdGhyZXNob2xkIGZvciBhY3R1YWwgYW5kXG4gICAqIGV4cGVjdGVkIHZhbHVlcyBpbiBhc3NlcnRpb24gZXJyb3JzLiBJZiB0aGlzIHRocmVzaG9sZCBpcyBleGNlZWRlZCwgZm9yXG4gICAqIGV4YW1wbGUgZm9yIGxhcmdlIGRhdGEgc3RydWN0dXJlcywgdGhlIHZhbHVlIGlzIHJlcGxhY2VkIHdpdGggc29tZXRoaW5nXG4gICAqIGxpa2UgYFsgQXJyYXkoMykgXWAgb3IgYHsgT2JqZWN0IChwcm9wMSwgcHJvcDIpIH1gLlxuICAgKlxuICAgKiBTZXQgaXQgdG8gemVybyBpZiB5b3Ugd2FudCB0byBkaXNhYmxlIHRydW5jYXRpbmcgYWx0b2dldGhlci5cbiAgICpcbiAgICogVGhpcyBpcyBlc3BlY2lhbGx5IHVzZXJmdWwgd2hlbiBkb2luZyBhc3NlcnRpb25zIG9uIGFycmF5czogaGF2aW5nIHRoaXNcbiAgICogc2V0IHRvIGEgcmVhc29uYWJsZSBsYXJnZSB2YWx1ZSBtYWtlcyB0aGUgZmFpbHVyZSBtZXNzYWdlcyByZWFkaWx5XG4gICAqIGluc3BlY3RhYmxlLlxuICAgKlxuICAgKiAgICAgY2hhaS5jb25maWcudHJ1bmNhdGVUaHJlc2hvbGQgPSAwOyAgLy8gZGlzYWJsZSB0cnVuY2F0aW5nXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB0cnVuY2F0ZVRocmVzaG9sZDogNDAsXG5cbiAgLyoqXG4gICAqICMjIyBjb25maWcudXNlUHJveHlcbiAgICpcbiAgICogVXNlciBjb25maWd1cmFibGUgcHJvcGVydHksIGRlZmluZXMgaWYgY2hhaSB3aWxsIHVzZSBhIFByb3h5IHRvIHRocm93XG4gICAqIGFuIGVycm9yIHdoZW4gYSBub24tZXhpc3RlbnQgcHJvcGVydHkgaXMgcmVhZCwgd2hpY2ggcHJvdGVjdHMgdXNlcnNcbiAgICogZnJvbSB0eXBvcyB3aGVuIHVzaW5nIHByb3BlcnR5LWJhc2VkIGFzc2VydGlvbnMuXG4gICAqXG4gICAqIFNldCBpdCB0byBmYWxzZSBpZiB5b3Ugd2FudCB0byBkaXNhYmxlIHRoaXMgZmVhdHVyZS5cbiAgICpcbiAgICogICAgIGNoYWkuY29uZmlnLnVzZVByb3h5ID0gZmFsc2U7ICAvLyBkaXNhYmxlIHVzZSBvZiBQcm94eVxuICAgKlxuICAgKiBUaGlzIGZlYXR1cmUgaXMgYXV0b21hdGljYWxseSBkaXNhYmxlZCByZWdhcmRsZXNzIG9mIHRoaXMgY29uZmlnIHZhbHVlXG4gICAqIGluIGVudmlyb25tZW50cyB0aGF0IGRvbid0IHN1cHBvcnQgcHJveGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1c2VQcm94eTogdHJ1ZSxcblxuICAvKipcbiAgICogIyMjIGNvbmZpZy5wcm94eUV4Y2x1ZGVkS2V5c1xuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgZGVmaW5lcyB3aGljaCBwcm9wZXJ0aWVzIHNob3VsZCBiZSBpZ25vcmVkXG4gICAqIGluc3RlYWQgb2YgdGhyb3dpbmcgYW4gZXJyb3IgaWYgdGhleSBkbyBub3QgZXhpc3Qgb24gdGhlIGFzc2VydGlvbi5cbiAgICogVGhpcyBpcyBvbmx5IGFwcGxpZWQgaWYgdGhlIGVudmlyb25tZW50IENoYWkgaXMgcnVubmluZyBpbiBzdXBwb3J0cyBwcm94aWVzIGFuZFxuICAgKiBpZiB0aGUgYHVzZVByb3h5YCBjb25maWd1cmF0aW9uIHNldHRpbmcgaXMgZW5hYmxlZC5cbiAgICogQnkgZGVmYXVsdCwgYHRoZW5gIGFuZCBgaW5zcGVjdGAgd2lsbCBub3QgdGhyb3cgYW4gZXJyb3IgaWYgdGhleSBkbyBub3QgZXhpc3Qgb24gdGhlXG4gICAqIGFzc2VydGlvbiBvYmplY3QgYmVjYXVzZSB0aGUgYC5pbnNwZWN0YCBwcm9wZXJ0eSBpcyByZWFkIGJ5IGB1dGlsLmluc3BlY3RgIChmb3IgZXhhbXBsZSwgd2hlblxuICAgKiB1c2luZyBgY29uc29sZS5sb2dgIG9uIHRoZSBhc3NlcnRpb24gb2JqZWN0KSBhbmQgYC50aGVuYCBpcyBuZWNlc3NhcnkgZm9yIHByb21pc2UgdHlwZS1jaGVja2luZy5cbiAgICpcbiAgICogICAgIC8vIEJ5IGRlZmF1bHQgdGhlc2Uga2V5cyB3aWxsIG5vdCB0aHJvdyBhbiBlcnJvciBpZiB0aGV5IGRvIG5vdCBleGlzdCBvbiB0aGUgYXNzZXJ0aW9uIG9iamVjdFxuICAgKiAgICAgY2hhaS5jb25maWcucHJveHlFeGNsdWRlZEtleXMgPSBbJ3RoZW4nLCAnaW5zcGVjdCddO1xuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBwcm94eUV4Y2x1ZGVkS2V5czogWyd0aGVuJywgJ2luc3BlY3QnLCAndG9KU09OJ11cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL2NvbmZpZy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiFcbiAqIENoYWkgLSB0cmFuc2ZlckZsYWdzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAudHJhbnNmZXJGbGFncyhhc3NlcnRpb24sIG9iamVjdCwgaW5jbHVkZUFsbCA9IHRydWUpXG4gKlxuICogVHJhbnNmZXIgYWxsIHRoZSBmbGFncyBmb3IgYGFzc2VydGlvbmAgdG8gYG9iamVjdGAuIElmXG4gKiBgaW5jbHVkZUFsbGAgaXMgc2V0IHRvIGBmYWxzZWAsIHRoZW4gdGhlIGJhc2UgQ2hhaVxuICogYXNzZXJ0aW9uIGZsYWdzIChuYW1lbHkgYG9iamVjdGAsIGBzc2ZpYCwgYGxvY2tTc2ZpYCxcbiAqIGFuZCBgbWVzc2FnZWApIHdpbGwgbm90IGJlIHRyYW5zZmVycmVkLlxuICpcbiAqXG4gKiAgICAgdmFyIG5ld0Fzc2VydGlvbiA9IG5ldyBBc3NlcnRpb24oKTtcbiAqICAgICB1dGlscy50cmFuc2ZlckZsYWdzKGFzc2VydGlvbiwgbmV3QXNzZXJ0aW9uKTtcbiAqXG4gKiAgICAgdmFyIGFub3RoZXJBc3Nlcml0b24gPSBuZXcgQXNzZXJ0aW9uKG15T2JqKTtcbiAqICAgICB1dGlscy50cmFuc2ZlckZsYWdzKGFzc2VydGlvbiwgYW5vdGhlckFzc2VydGlvbiwgZmFsc2UpO1xuICpcbiAqIEBwYXJhbSB7QXNzZXJ0aW9ufSBhc3NlcnRpb24gdGhlIGFzc2VydGlvbiB0byB0cmFuc2ZlciB0aGUgZmxhZ3MgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0aGUgb2JqZWN0IHRvIHRyYW5zZmVyIHRoZSBmbGFncyB0bzsgdXN1YWxseSBhIG5ldyBhc3NlcnRpb25cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5jbHVkZUFsbFxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQG5hbWUgdHJhbnNmZXJGbGFnc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2ZlckZsYWdzKGFzc2VydGlvbiwgb2JqZWN0LCBpbmNsdWRlQWxsKSB7XG4gIHZhciBmbGFncyA9IGFzc2VydGlvbi5fX2ZsYWdzIHx8IChhc3NlcnRpb24uX19mbGFncyA9IE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG4gIGlmICghb2JqZWN0Ll9fZmxhZ3MpIHtcbiAgICBvYmplY3QuX19mbGFncyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBpbmNsdWRlQWxsID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMyA/IGluY2x1ZGVBbGwgOiB0cnVlO1xuXG4gIGZvciAodmFyIGZsYWcgaW4gZmxhZ3MpIHtcbiAgICBpZiAoaW5jbHVkZUFsbCB8fFxuICAgICAgICAoZmxhZyAhPT0gJ29iamVjdCcgJiYgZmxhZyAhPT0gJ3NzZmknICYmIGZsYWcgIT09ICdsb2NrU3NmaScgJiYgZmxhZyAhPSAnbWVzc2FnZScpKSB7XG4gICAgICBvYmplY3QuX19mbGFnc1tmbGFnXSA9IGZsYWdzW2ZsYWddO1xuICAgIH1cbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvdHJhbnNmZXJGbGFncy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBUaGlzIGlzIChhbG1vc3QpIGRpcmVjdGx5IGZyb20gTm9kZS5qcyB1dGlsc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2Jsb2IvZjhjMzM1ZDBjYWY0N2YxNmQzMTQxM2Y4OWFhMjhlZGEzODc4ZTNhYS9saWIvdXRpbC5qc1xuXG52YXIgZ2V0TmFtZSA9IHJlcXVpcmUoJ2dldC1mdW5jLW5hbWUnKTtcbnZhciBnZXRQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi9nZXRQcm9wZXJ0aWVzJyk7XG52YXIgZ2V0RW51bWVyYWJsZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuL2dldEVudW1lcmFibGVQcm9wZXJ0aWVzJyk7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zcGVjdDtcblxuLyoqXG4gKiAjIyMgLmluc3BlY3Qob2JqLCBbc2hvd0hpZGRlbl0sIFtkZXB0aF0sIFtjb2xvcnNdKVxuICpcbiAqIEVjaG9lcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJpZXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc2hvd0hpZGRlbiBGbGFnIHRoYXQgc2hvd3MgaGlkZGVuIChub3QgZW51bWVyYWJsZSlcbiAqICAgIHByb3BlcnRpZXMgb2Ygb2JqZWN0cy4gRGVmYXVsdCBpcyBmYWxzZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBkZXB0aCBEZXB0aCBpbiB3aGljaCB0byBkZXNjZW5kIGluIG9iamVjdC4gRGVmYXVsdCBpcyAyLlxuICogQHBhcmFtIHtCb29sZWFufSBjb2xvcnMgRmxhZyB0byB0dXJuIG9uIEFOU0kgZXNjYXBlIGNvZGVzIHRvIGNvbG9yIHRoZVxuICogICAgb3V0cHV0LiBEZWZhdWx0IGlzIGZhbHNlIChubyBjb2xvcmluZykuXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBpbnNwZWN0XG4gKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKSB7XG4gIHZhciBjdHggPSB7XG4gICAgc2hvd0hpZGRlbjogc2hvd0hpZGRlbixcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBzdHI7IH1cbiAgfTtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCAodHlwZW9mIGRlcHRoID09PSAndW5kZWZpbmVkJyA/IDIgOiBkZXB0aCkpO1xufVxuXG4vLyBSZXR1cm5zIHRydWUgaWYgb2JqZWN0IGlzIGEgRE9NIGVsZW1lbnQuXG52YXIgaXNET01FbGVtZW50ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICBpZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqZWN0ICYmXG4gICAgICB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgJ25vZGVUeXBlJyBpbiBvYmplY3QgJiZcbiAgICAgIG9iamVjdC5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgdHlwZW9mIG9iamVjdC5ub2RlTmFtZSA9PT0gJ3N0cmluZyc7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcykge1xuICAvLyBQcm92aWRlIGEgaG9vayBmb3IgdXNlci1zcGVjaWZpZWQgaW5zcGVjdCBmdW5jdGlvbnMuXG4gIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLmluc3BlY3QgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICAgICAgdmFsdWUuaW5zcGVjdCAhPT0gZXhwb3J0cy5pbnNwZWN0ICYmXG4gICAgICAvLyBBbHNvIGZpbHRlciBvdXQgYW55IHByb3RvdHlwZSBvYmplY3RzIHVzaW5nIHRoZSBjaXJjdWxhciBjaGVjay5cbiAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKHR5cGVvZiByZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gSWYgdGhpcyBpcyBhIERPTSBlbGVtZW50LCB0cnkgdG8gZ2V0IHRoZSBvdXRlciBIVE1MLlxuICBpZiAoaXNET01FbGVtZW50KHZhbHVlKSkge1xuICAgIGlmICgnb3V0ZXJIVE1MJyBpbiB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLm91dGVySFRNTDtcbiAgICAgIC8vIFRoaXMgdmFsdWUgZG9lcyBub3QgaGF2ZSBhbiBvdXRlckhUTUwgYXR0cmlidXRlLFxuICAgICAgLy8gICBpdCBjb3VsZCBzdGlsbCBiZSBhbiBYTUwgZWxlbWVudFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBdHRlbXB0IHRvIHNlcmlhbGl6ZSBpdFxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnhtbFZlcnNpb24pIHtcbiAgICAgICAgICB2YXIgeG1sU2VyaWFsaXplciA9IG5ldyBYTUxTZXJpYWxpemVyKCk7XG4gICAgICAgICAgcmV0dXJuIHhtbFNlcmlhbGl6ZXIuc2VyaWFsaXplVG9TdHJpbmcodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEZpcmVmb3ggMTEtIGRvIG5vdCBzdXBwb3J0IG91dGVySFRNTFxuICAgICAgICAgIC8vICAgSXQgZG9lcywgaG93ZXZlciwgc3VwcG9ydCBpbm5lckhUTUxcbiAgICAgICAgICAvLyAgIFVzZSB0aGUgZm9sbG93aW5nIHRvIHJlbmRlciB0aGUgZWxlbWVudFxuICAgICAgICAgIHZhciBucyA9IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiO1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMsICdfJyk7XG5cbiAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodmFsdWUuY2xvbmVOb2RlKGZhbHNlKSk7XG4gICAgICAgICAgdmFyIGh0bWwgPSBjb250YWluZXIuaW5uZXJIVE1MXG4gICAgICAgICAgICAucmVwbGFjZSgnPjwnLCAnPicgKyB2YWx1ZS5pbm5lckhUTUwgKyAnPCcpO1xuICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIFRoaXMgY291bGQgYmUgYSBub24tbmF0aXZlIERPTSBpbXBsZW1lbnRhdGlvbixcbiAgICAgICAgLy8gICBjb250aW51ZSB3aXRoIHRoZSBub3JtYWwgZmxvdzpcbiAgICAgICAgLy8gICBwcmludGluZyB0aGUgZWxlbWVudCBhcyBpZiBpdCBpcyBhbiBvYmplY3QuXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIgdmlzaWJsZUtleXMgPSBnZXRFbnVtZXJhYmxlUHJvcGVydGllcyh2YWx1ZSk7XG4gIHZhciBrZXlzID0gY3R4LnNob3dIaWRkZW4gPyBnZXRQcm9wZXJ0aWVzKHZhbHVlKSA6IHZpc2libGVLZXlzO1xuXG4gIHZhciBuYW1lLCBuYW1lU3VmZml4O1xuXG4gIC8vIFNvbWUgdHlwZSBvZiBvYmplY3Qgd2l0aG91dCBwcm9wZXJ0aWVzIGNhbiBiZSBzaG9ydGN1dHRlZC5cbiAgLy8gSW4gSUUsIGVycm9ycyBoYXZlIGEgc2luZ2xlIGBzdGFja2AgcHJvcGVydHksIG9yIGlmIHRoZXkgYXJlIHZhbmlsbGEgYEVycm9yYCxcbiAgLy8gYSBgc3RhY2tgIHBsdXMgYGRlc2NyaXB0aW9uYCBwcm9wZXJ0eTsgaWdub3JlIHRob3NlIGZvciBjb25zaXN0ZW5jeS5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwIHx8IChpc0Vycm9yKHZhbHVlKSAmJiAoXG4gICAgICAoa2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gJ3N0YWNrJykgfHxcbiAgICAgIChrZXlzLmxlbmd0aCA9PT0gMiAmJiBrZXlzWzBdID09PSAnZGVzY3JpcHRpb24nICYmIGtleXNbMV0gPT09ICdzdGFjaycpXG4gICAgICkpKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbmFtZSA9IGdldE5hbWUodmFsdWUpO1xuICAgICAgbmFtZVN1ZmZpeCA9IG5hbWUgPyAnOiAnICsgbmFtZSA6ICcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbRnVuY3Rpb24nICsgbmFtZVN1ZmZpeCArICddJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9XG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKSwgJ2RhdGUnKTtcbiAgICB9XG4gICAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNlID0gJydcbiAgICAsIGFycmF5ID0gZmFsc2VcbiAgICAsIHR5cGVkQXJyYXkgPSBmYWxzZVxuICAgICwgYnJhY2VzID0gWyd7JywgJ30nXTtcblxuICBpZiAoaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgIHR5cGVkQXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIEFycmF5IHNheSB0aGF0IHRoZXkgYXJlIEFycmF5XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGFycmF5ID0gdHJ1ZTtcbiAgICBicmFjZXMgPSBbJ1snLCAnXSddO1xuICB9XG5cbiAgLy8gTWFrZSBmdW5jdGlvbnMgc2F5IHRoYXQgdGhleSBhcmUgZnVuY3Rpb25zXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBuYW1lID0gZ2V0TmFtZSh2YWx1ZSk7XG4gICAgbmFtZVN1ZmZpeCA9IG5hbWUgPyAnOiAnICsgbmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuYW1lU3VmZml4ICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2UgaWYgKHR5cGVkQXJyYXkpIHtcbiAgICByZXR1cm4gZm9ybWF0VHlwZWRBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSk7XG4gICAgfSk7XG4gIH1cblxuICBjdHguc2Vlbi5wb3AoKTtcblxuICByZXR1cm4gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuXG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBpZiAodmFsdWUgPT09IDAgJiYgKDEvdmFsdWUpID09PSAtSW5maW5pdHkpIHtcbiAgICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCctMCcsICdudW1iZXInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuXG4gICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSh2YWx1ZS50b1N0cmluZygpLCAnc3ltYm9sJyk7XG4gIH1cbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG5cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHZhciBzdHIgPSAnWyAnO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCA+PSBjb25maWcudHJ1bmNhdGVUaHJlc2hvbGQgLSA3KSB7XG4gICAgICBzdHIgKz0gJy4uLic7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgc3RyICs9IHZhbHVlW2ldICsgJywgJztcbiAgfVxuICBzdHIgKz0gJyBdJztcblxuICAvLyBSZW1vdmluZyB0cmFpbGluZyBgLCBgIGlmIHRoZSBhcnJheSB3YXMgbm90IHRydW5jYXRlZFxuICBpZiAoc3RyLmluZGV4T2YoJywgIF0nKSAhPT0gLTEpIHtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgnLCAgXScsICcgXScpO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZTtcbiAgdmFyIHByb3BEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KTtcbiAgdmFyIHN0cjtcblxuICBpZiAocHJvcERlc2NyaXB0b3IpIHtcbiAgICBpZiAocHJvcERlc2NyaXB0b3IuZ2V0KSB7XG4gICAgICBpZiAocHJvcERlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHByb3BEZXNjcmlwdG9yLnNldCkge1xuICAgICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAodmlzaWJsZUtleXMuaW5kZXhPZihrZXkpIDwgMCkge1xuICAgIG5hbWUgPSAnWycgKyBrZXkgKyAnXSc7XG4gIH1cbiAgaWYgKCFzdHIpIHtcbiAgICBpZiAoY3R4LnNlZW4uaW5kZXhPZih2YWx1ZVtrZXldKSA8IDApIHtcbiAgICAgIGlmIChyZWN1cnNlVGltZXMgPT09IG51bGwpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZVtrZXldLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgdmFsdWVba2V5XSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAodHlwZW9mIG5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKGFycmF5ICYmIGtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIG5hbWUgPSBKU09OLnN0cmluZ2lmeSgnJyArIGtleSk7XG4gICAgaWYgKG5hbWUubWF0Y2goL15cIihbYS16QS1aX11bYS16QS1aXzAtOV0qKVwiJC8pKSB7XG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSwgbmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBudW1MaW5lc0VzdCA9IDA7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIG51bUxpbmVzRXN0Kys7XG4gICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuICAgIHJldHVybiBwcmV2ICsgY3VyLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuZnVuY3Rpb24gaXNUeXBlZEFycmF5KGFyKSB7XG4gIC8vIFVuZm9ydHVuYXRlbHkgdGhlcmUncyBubyB3YXkgdG8gY2hlY2sgaWYgYW4gb2JqZWN0IGlzIGEgVHlwZWRBcnJheVxuICAvLyBXZSBoYXZlIHRvIGNoZWNrIGlmIGl0J3Mgb25lIG9mIHRoZXNlIHR5cGVzXG4gIHJldHVybiAodHlwZW9mIGFyID09PSAnb2JqZWN0JyAmJiAvXFx3K0FycmF5XSQvLnRlc3Qob2JqZWN0VG9TdHJpbmcoYXIpKSk7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpIHx8XG4gICAgICAgICAodHlwZW9mIGFyID09PSAnb2JqZWN0JyAmJiBvYmplY3RUb1N0cmluZyhhcikgPT09ICdbb2JqZWN0IEFycmF5XScpO1xufVxuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gdHlwZW9mIHJlID09PSAnb2JqZWN0JyAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gdHlwZW9mIGQgPT09ICdvYmplY3QnICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gdHlwZW9mIGUgPT09ICdvYmplY3QnICYmIG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nO1xufVxuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2luc3BlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxuLyohXG4gKiBDaGFpIC0gaXNQcm94eUVuYWJsZWQgaGVscGVyXG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgLmlzUHJveHlFbmFibGVkKClcbiAqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgaWYgQ2hhaSdzIHByb3h5IHByb3RlY3Rpb24gZmVhdHVyZSBpcyBlbmFibGVkLiBJZlxuICogcHJveGllcyBhcmUgdW5zdXBwb3J0ZWQgb3IgZGlzYWJsZWQgdmlhIHRoZSB1c2VyJ3MgQ2hhaSBjb25maWcsIHRoZW4gcmV0dXJuXG4gKiBmYWxzZS4gT3RoZXJ3aXNlLCByZXR1cm4gdHJ1ZS5cbiAqXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBpc1Byb3h5RW5hYmxlZFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNQcm94eUVuYWJsZWQoKSB7XG4gIHJldHVybiBjb25maWcudXNlUHJveHkgJiYgXG4gICAgdHlwZW9mIFByb3h5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2lzUHJveHlFbmFibGVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG5cbnZhciBmbkxlbmd0aERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGZ1bmN0aW9uICgpIHt9LCAnbGVuZ3RoJyk7XG5cbi8qIVxuICogQ2hhaSAtIGFkZExlbmd0aEd1YXJkIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuYWRkTGVuZ3RoR3VhcmQoZm4sIGFzc2VydGlvbk5hbWUsIGlzQ2hhaW5hYmxlKVxuICpcbiAqIERlZmluZSBgbGVuZ3RoYCBhcyBhIGdldHRlciBvbiB0aGUgZ2l2ZW4gdW5pbnZva2VkIG1ldGhvZCBhc3NlcnRpb24uIFRoZVxuICogZ2V0dGVyIGFjdHMgYXMgYSBndWFyZCBhZ2FpbnN0IGNoYWluaW5nIGBsZW5ndGhgIGRpcmVjdGx5IG9mZiBvZiBhbiB1bmludm9rZWRcbiAqIG1ldGhvZCBhc3NlcnRpb24sIHdoaWNoIGlzIGEgcHJvYmxlbSBiZWNhdXNlIGl0IHJlZmVyZW5jZXMgYGZ1bmN0aW9uYCdzXG4gKiBidWlsdC1pbiBgbGVuZ3RoYCBwcm9wZXJ0eSBpbnN0ZWFkIG9mIENoYWkncyBgbGVuZ3RoYCBhc3NlcnRpb24uIFdoZW4gdGhlXG4gKiBnZXR0ZXIgY2F0Y2hlcyB0aGUgdXNlciBtYWtpbmcgdGhpcyBtaXN0YWtlLCBpdCB0aHJvd3MgYW4gZXJyb3Igd2l0aCBhXG4gKiBoZWxwZnVsIG1lc3NhZ2UuXG4gKlxuICogVGhlcmUgYXJlIHR3byB3YXlzIGluIHdoaWNoIHRoaXMgbWlzdGFrZSBjYW4gYmUgbWFkZS4gVGhlIGZpcnN0IHdheSBpcyBieVxuICogY2hhaW5pbmcgdGhlIGBsZW5ndGhgIGFzc2VydGlvbiBkaXJlY3RseSBvZmYgb2YgYW4gdW5pbnZva2VkIGNoYWluYWJsZVxuICogbWV0aG9kLiBJbiB0aGlzIGNhc2UsIENoYWkgc3VnZ2VzdHMgdGhhdCB0aGUgdXNlciB1c2UgYGxlbmd0aE9mYCBpbnN0ZWFkLiBUaGVcbiAqIHNlY29uZCB3YXkgaXMgYnkgY2hhaW5pbmcgdGhlIGBsZW5ndGhgIGFzc2VydGlvbiBkaXJlY3RseSBvZmYgb2YgYW4gdW5pbnZva2VkXG4gKiBub24tY2hhaW5hYmxlIG1ldGhvZC4gTm9uLWNoYWluYWJsZSBtZXRob2RzIG11c3QgYmUgaW52b2tlZCBwcmlvciB0b1xuICogY2hhaW5pbmcuIEluIHRoaXMgY2FzZSwgQ2hhaSBzdWdnZXN0cyB0aGF0IHRoZSB1c2VyIGNvbnN1bHQgdGhlIGRvY3MgZm9yIHRoZVxuICogZ2l2ZW4gYXNzZXJ0aW9uLlxuICpcbiAqIElmIHRoZSBgbGVuZ3RoYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgaXMgdW5jb25maWd1cmFibGUsIHRoZW4gcmV0dXJuIGBmbmBcbiAqIHdpdGhvdXQgbW9kaWZpY2F0aW9uLlxuICpcbiAqIE5vdGUgdGhhdCBpbiBFUzYsIHRoZSBmdW5jdGlvbidzIGBsZW5ndGhgIHByb3BlcnR5IGlzIGNvbmZpZ3VyYWJsZSwgc28gb25jZVxuICogc3VwcG9ydCBmb3IgbGVnYWN5IGVudmlyb25tZW50cyBpcyBkcm9wcGVkLCBDaGFpJ3MgYGxlbmd0aGAgcHJvcGVydHkgY2FuXG4gKiByZXBsYWNlIHRoZSBidWlsdC1pbiBmdW5jdGlvbidzIGBsZW5ndGhgIHByb3BlcnR5LCBhbmQgdGhpcyBsZW5ndGggZ3VhcmQgd2lsbFxuICogbm8gbG9uZ2VyIGJlIG5lY2Vzc2FyeS4gSW4gdGhlIG1lYW4gdGltZSwgbWFpbnRhaW5pbmcgY29uc2lzdGVuY3kgYWNyb3NzIGFsbFxuICogZW52aXJvbm1lbnRzIGlzIHRoZSBwcmlvcml0eS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtTdHJpbmd9IGFzc2VydGlvbk5hbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNDaGFpbmFibGVcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGFkZExlbmd0aEd1YXJkXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhZGRMZW5ndGhHdWFyZCAoZm4sIGFzc2VydGlvbk5hbWUsIGlzQ2hhaW5hYmxlKSB7XG4gIGlmICghZm5MZW5ndGhEZXNjLmNvbmZpZ3VyYWJsZSkgcmV0dXJuIGZuO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ2xlbmd0aCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0NoYWluYWJsZSkge1xuICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBDaGFpIHByb3BlcnR5OiAnICsgYXNzZXJ0aW9uTmFtZSArICcubGVuZ3RoLiBEdWUnICtcbiAgICAgICAgICAnIHRvIGEgY29tcGF0aWJpbGl0eSBpc3N1ZSwgXCJsZW5ndGhcIiBjYW5ub3QgZGlyZWN0bHkgZm9sbG93IFwiJyArXG4gICAgICAgICAgYXNzZXJ0aW9uTmFtZSArICdcIi4gVXNlIFwiJyArIGFzc2VydGlvbk5hbWUgKyAnLmxlbmd0aE9mXCIgaW5zdGVhZC4nKTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgQ2hhaSBwcm9wZXJ0eTogJyArIGFzc2VydGlvbk5hbWUgKyAnLmxlbmd0aC4gU2VlJyArXG4gICAgICAgICcgZG9jcyBmb3IgcHJvcGVyIHVzYWdlIG9mIFwiJyArIGFzc2VydGlvbk5hbWUgKyAnXCIuJyk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZm47XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9hZGRMZW5ndGhHdWFyZC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xudmFyIGZsYWcgPSByZXF1aXJlKCcuL2ZsYWcnKTtcbnZhciBnZXRQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi9nZXRQcm9wZXJ0aWVzJyk7XG52YXIgaXNQcm94eUVuYWJsZWQgPSByZXF1aXJlKCcuL2lzUHJveHlFbmFibGVkJyk7XG5cbi8qIVxuICogQ2hhaSAtIHByb3hpZnkgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIC5wcm94aWZ5KG9iamVjdClcbiAqXG4gKiBSZXR1cm4gYSBwcm94eSBvZiBnaXZlbiBvYmplY3QgdGhhdCB0aHJvd3MgYW4gZXJyb3Igd2hlbiBhIG5vbi1leGlzdGVudFxuICogcHJvcGVydHkgaXMgcmVhZC4gQnkgZGVmYXVsdCwgdGhlIHJvb3QgY2F1c2UgaXMgYXNzdW1lZCB0byBiZSBhIG1pc3NwZWxsZWRcbiAqIHByb3BlcnR5LCBhbmQgdGh1cyBhbiBhdHRlbXB0IGlzIG1hZGUgdG8gb2ZmZXIgYSByZWFzb25hYmxlIHN1Z2dlc3Rpb24gZnJvbVxuICogdGhlIGxpc3Qgb2YgZXhpc3RpbmcgcHJvcGVydGllcy4gSG93ZXZlciwgaWYgYSBub25DaGFpbmFibGVNZXRob2ROYW1lIGlzXG4gKiBwcm92aWRlZCwgdGhlbiB0aGUgcm9vdCBjYXVzZSBpcyBpbnN0ZWFkIGEgZmFpbHVyZSB0byBpbnZva2UgYSBub24tY2hhaW5hYmxlXG4gKiBtZXRob2QgcHJpb3IgdG8gcmVhZGluZyB0aGUgbm9uLWV4aXN0ZW50IHByb3BlcnR5LlxuICogXG4gKiBJZiBwcm94aWVzIGFyZSB1bnN1cHBvcnRlZCBvciBkaXNhYmxlZCB2aWEgdGhlIHVzZXIncyBDaGFpIGNvbmZpZywgdGhlblxuICogcmV0dXJuIG9iamVjdCB3aXRob3V0IG1vZGlmaWNhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gbm9uQ2hhaW5hYmxlTWV0aG9kTmFtZVxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQG5hbWUgcHJveGlmeVxuICovXG5cbnZhciBidWlsdGlucyA9IFsnX19mbGFncycsICdfX21ldGhvZHMnLCAnX29iaicsICdhc3NlcnQnXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcm94aWZ5KG9iaiwgbm9uQ2hhaW5hYmxlTWV0aG9kTmFtZSkge1xuICBpZiAoIWlzUHJveHlFbmFibGVkKCkpIHJldHVybiBvYmo7XG5cbiAgcmV0dXJuIG5ldyBQcm94eShvYmosIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIHByb3h5R2V0dGVyKHRhcmdldCwgcHJvcGVydHkpIHtcbiAgICAgIC8vIFRoaXMgY2hlY2sgaXMgaGVyZSBiZWNhdXNlIHdlIHNob3VsZCBub3QgdGhyb3cgZXJyb3JzIG9uIFN5bWJvbCBwcm9wZXJ0aWVzXG4gICAgICAvLyBzdWNoIGFzIGBTeW1ib2wudG9TdHJpbmdUYWdgLlxuICAgICAgLy8gVGhlIHZhbHVlcyBmb3Igd2hpY2ggYW4gZXJyb3Igc2hvdWxkIGJlIHRocm93biBjYW4gYmUgY29uZmlndXJlZCB1c2luZ1xuICAgICAgLy8gdGhlIGBjb25maWcucHJveHlFeGNsdWRlZEtleXNgIHNldHRpbmcuXG4gICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgIGNvbmZpZy5wcm94eUV4Y2x1ZGVkS2V5cy5pbmRleE9mKHByb3BlcnR5KSA9PT0gLTEgJiZcbiAgICAgICAgICAhUmVmbGVjdC5oYXModGFyZ2V0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgLy8gU3BlY2lhbCBtZXNzYWdlIGZvciBpbnZhbGlkIHByb3BlcnR5IGFjY2VzcyBvZiBub24tY2hhaW5hYmxlIG1ldGhvZHMuXG4gICAgICAgIGlmIChub25DaGFpbmFibGVNZXRob2ROYW1lKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgQ2hhaSBwcm9wZXJ0eTogJyArIG5vbkNoYWluYWJsZU1ldGhvZE5hbWUgKyAnLicgK1xuICAgICAgICAgICAgcHJvcGVydHkgKyAnLiBTZWUgZG9jcyBmb3IgcHJvcGVyIHVzYWdlIG9mIFwiJyArXG4gICAgICAgICAgICBub25DaGFpbmFibGVNZXRob2ROYW1lICsgJ1wiLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9yZGVyZWRQcm9wZXJ0aWVzID0gZ2V0UHJvcGVydGllcyh0YXJnZXQpLmZpbHRlcihmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgICAgIHJldHVybiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkgJiZcbiAgICAgICAgICAgIGJ1aWx0aW5zLmluZGV4T2YocHJvcGVydHkpID09PSAtMTtcbiAgICAgICAgfSkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIHN0cmluZ0Rpc3RhbmNlKHByb3BlcnR5LCBhKSAtIHN0cmluZ0Rpc3RhbmNlKHByb3BlcnR5LCBiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG9yZGVyZWRQcm9wZXJ0aWVzLmxlbmd0aCAmJlxuICAgICAgICAgICAgc3RyaW5nRGlzdGFuY2Uob3JkZXJlZFByb3BlcnRpZXNbMF0sIHByb3BlcnR5KSA8IDQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgcHJvcGVydHkgaXMgcmVhc29uYWJseSBjbG9zZSB0byBhbiBleGlzdGluZyBDaGFpIHByb3BlcnR5LFxuICAgICAgICAgIC8vIHN1Z2dlc3QgdGhhdCBwcm9wZXJ0eSB0byB0aGUgdXNlci5cbiAgICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBDaGFpIHByb3BlcnR5OiAnICsgcHJvcGVydHkgK1xuICAgICAgICAgICAgJy4gRGlkIHlvdSBtZWFuIFwiJyArIG9yZGVyZWRQcm9wZXJ0aWVzWzBdICsgJ1wiPycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIENoYWkgcHJvcGVydHk6ICcgKyBwcm9wZXJ0eSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVXNlIHRoaXMgcHJveHkgZ2V0dGVyIGFzIHRoZSBzdGFydGluZyBwb2ludCBmb3IgcmVtb3ZpbmcgaW1wbGVtZW50YXRpb25cbiAgICAgIC8vIGZyYW1lcyBmcm9tIHRoZSBzdGFjayB0cmFjZSBvZiBhIGZhaWxlZCBhc3NlcnRpb24uIEZvciBwcm9wZXJ0eVxuICAgICAgLy8gYXNzZXJ0aW9ucywgdGhpcyBwcmV2ZW50cyB0aGUgcHJveHkgZ2V0dGVyIGZyb20gc2hvd2luZyB1cCBpbiB0aGUgc3RhY2tcbiAgICAgIC8vIHRyYWNlIHNpbmNlIGl0J3MgaW52b2tlZCBiZWZvcmUgdGhlIHByb3BlcnR5IGdldHRlci4gRm9yIG1ldGhvZCBhbmRcbiAgICAgIC8vIGNoYWluYWJsZSBtZXRob2QgYXNzZXJ0aW9ucywgdGhpcyBmbGFnIHdpbGwgZW5kIHVwIGdldHRpbmcgY2hhbmdlZCB0b1xuICAgICAgLy8gdGhlIG1ldGhvZCB3cmFwcGVyLCB3aGljaCBpcyBnb29kIHNpbmNlIHRoaXMgZnJhbWUgd2lsbCBubyBsb25nZXIgYmUgaW5cbiAgICAgIC8vIHRoZSBzdGFjayBvbmNlIHRoZSBtZXRob2QgaXMgaW52b2tlZC4gTm90ZSB0aGF0IENoYWkgYnVpbHRpbiBhc3NlcnRpb25cbiAgICAgIC8vIHByb3BlcnRpZXMgc3VjaCBhcyBgX19mbGFnc2AgYXJlIHNraXBwZWQgc2luY2UgdGhpcyBpcyBvbmx5IG1lYW50IHRvXG4gICAgICAvLyBjYXB0dXJlIHRoZSBzdGFydGluZyBwb2ludCBvZiBhbiBhc3NlcnRpb24uIFRoaXMgc3RlcCBpcyBhbHNvIHNraXBwZWRcbiAgICAgIC8vIGlmIHRoZSBgbG9ja1NzZmlgIGZsYWcgaXMgc2V0LCB0aHVzIGluZGljYXRpbmcgdGhhdCB0aGlzIGFzc2VydGlvbiBpc1xuICAgICAgLy8gYmVpbmcgY2FsbGVkIGZyb20gd2l0aGluIGFub3RoZXIgYXNzZXJ0aW9uLiBJbiB0aGF0IGNhc2UsIHRoZSBgc3NmaWBcbiAgICAgIC8vIGZsYWcgaXMgYWxyZWFkeSBzZXQgdG8gdGhlIG91dGVyIGFzc2VydGlvbidzIHN0YXJ0aW5nIHBvaW50LlxuICAgICAgaWYgKGJ1aWx0aW5zLmluZGV4T2YocHJvcGVydHkpID09PSAtMSAmJiAhZmxhZyh0YXJnZXQsICdsb2NrU3NmaScpKSB7XG4gICAgICAgIGZsYWcodGFyZ2V0LCAnc3NmaScsIHByb3h5R2V0dGVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHkpO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqICMgc3RyaW5nRGlzdGFuY2Uoc3RyQSwgc3RyQilcbiAqIFJldHVybiB0aGUgTGV2ZW5zaHRlaW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gc3RyaW5ncy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJBXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyQlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgc3RyaW5nIGRpc3RhbmNlIGJldHdlZW4gc3RyQSBhbmQgc3RyQlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc3RyaW5nRGlzdGFuY2Uoc3RyQSwgc3RyQiwgbWVtbykge1xuICBpZiAoIW1lbW8pIHtcbiAgICAvLyBgbWVtb2AgaXMgYSB0d28tZGltZW5zaW9uYWwgYXJyYXkgY29udGFpbmluZyBhIGNhY2hlIG9mIGRpc3RhbmNlc1xuICAgIC8vIG1lbW9baV1bal0gaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gc3RyQS5zbGljZSgwLCBpKSBhbmRcbiAgICAvLyBzdHJCLnNsaWNlKDAsIGopLlxuICAgIG1lbW8gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBzdHJBLmxlbmd0aDsgaSsrKSB7XG4gICAgICBtZW1vW2ldID0gW107XG4gICAgfVxuICB9XG5cbiAgaWYgKCFtZW1vW3N0ckEubGVuZ3RoXSB8fCAhbWVtb1tzdHJBLmxlbmd0aF1bc3RyQi5sZW5ndGhdKSB7XG4gICAgaWYgKHN0ckEubGVuZ3RoID09PSAwIHx8IHN0ckIubGVuZ3RoID09PSAwKSB7XG4gICAgICBtZW1vW3N0ckEubGVuZ3RoXVtzdHJCLmxlbmd0aF0gPSBNYXRoLm1heChzdHJBLmxlbmd0aCwgc3RyQi5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZW1vW3N0ckEubGVuZ3RoXVtzdHJCLmxlbmd0aF0gPSBNYXRoLm1pbihcbiAgICAgICAgc3RyaW5nRGlzdGFuY2Uoc3RyQS5zbGljZSgwLCAtMSksIHN0ckIsIG1lbW8pICsgMSxcbiAgICAgICAgc3RyaW5nRGlzdGFuY2Uoc3RyQSwgc3RyQi5zbGljZSgwLCAtMSksIG1lbW8pICsgMSxcbiAgICAgICAgc3RyaW5nRGlzdGFuY2Uoc3RyQS5zbGljZSgwLCAtMSksIHN0ckIuc2xpY2UoMCwgLTEpLCBtZW1vKSArXG4gICAgICAgICAgKHN0ckEuc2xpY2UoLTEpID09PSBzdHJCLnNsaWNlKC0xKSA/IDAgOiAxKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWVtb1tzdHJBLmxlbmd0aF1bc3RyQi5sZW5ndGhdO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9wcm94aWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwudHlwZURldGVjdCA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuLyogIVxuICogdHlwZS1kZXRlY3RcbiAqIENvcHlyaWdodChjKSAyMDEzIGpha2UgbHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbnZhciBwcm9taXNlRXhpc3RzID0gdHlwZW9mIFByb21pc2UgPT09ICdmdW5jdGlvbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG52YXIgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIHNlbGYgPT09ICdvYmplY3QnID8gc2VsZiA6IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpZC1ibGFja2xpc3RcblxudmFyIHN5bWJvbEV4aXN0cyA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnO1xudmFyIG1hcEV4aXN0cyA9IHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnO1xudmFyIHNldEV4aXN0cyA9IHR5cGVvZiBTZXQgIT09ICd1bmRlZmluZWQnO1xudmFyIHdlYWtNYXBFeGlzdHMgPSB0eXBlb2YgV2Vha01hcCAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgd2Vha1NldEV4aXN0cyA9IHR5cGVvZiBXZWFrU2V0ICE9PSAndW5kZWZpbmVkJztcbnZhciBkYXRhVmlld0V4aXN0cyA9IHR5cGVvZiBEYXRhVmlldyAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgc3ltYm9sSXRlcmF0b3JFeGlzdHMgPSBzeW1ib2xFeGlzdHMgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgc3ltYm9sVG9TdHJpbmdUYWdFeGlzdHMgPSBzeW1ib2xFeGlzdHMgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgc2V0RW50cmllc0V4aXN0cyA9IHNldEV4aXN0cyAmJiB0eXBlb2YgU2V0LnByb3RvdHlwZS5lbnRyaWVzID09PSAnZnVuY3Rpb24nO1xudmFyIG1hcEVudHJpZXNFeGlzdHMgPSBtYXBFeGlzdHMgJiYgdHlwZW9mIE1hcC5wcm90b3R5cGUuZW50cmllcyA9PT0gJ2Z1bmN0aW9uJztcbnZhciBzZXRJdGVyYXRvclByb3RvdHlwZSA9IHNldEVudHJpZXNFeGlzdHMgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBTZXQoKS5lbnRyaWVzKCkpO1xudmFyIG1hcEl0ZXJhdG9yUHJvdG90eXBlID0gbWFwRW50cmllc0V4aXN0cyAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IE1hcCgpLmVudHJpZXMoKSk7XG52YXIgYXJyYXlJdGVyYXRvckV4aXN0cyA9IHN5bWJvbEl0ZXJhdG9yRXhpc3RzICYmIHR5cGVvZiBBcnJheS5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJztcbnZhciBhcnJheUl0ZXJhdG9yUHJvdG90eXBlID0gYXJyYXlJdGVyYXRvckV4aXN0cyAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoW11bU3ltYm9sLml0ZXJhdG9yXSgpKTtcbnZhciBzdHJpbmdJdGVyYXRvckV4aXN0cyA9IHN5bWJvbEl0ZXJhdG9yRXhpc3RzICYmIHR5cGVvZiBTdHJpbmcucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbic7XG52YXIgc3RyaW5nSXRlcmF0b3JQcm90b3R5cGUgPSBzdHJpbmdJdGVyYXRvckV4aXN0cyAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoJydbU3ltYm9sLml0ZXJhdG9yXSgpKTtcbnZhciB0b1N0cmluZ0xlZnRTbGljZUxlbmd0aCA9IDg7XG52YXIgdG9TdHJpbmdSaWdodFNsaWNlTGVuZ3RoID0gLTE7XG52YXIgd2luZG93RXhpc3RzID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCc7XG52YXIgd2luZG93TG9jYXRpb25FeGlzdHMgPSB3aW5kb3dFeGlzdHMgJiYgdHlwZW9mIHdpbmRvdy5sb2NhdGlvbiA9PT0gJ29iamVjdCc7XG52YXIgd2luZG93RG9jdW1lbnRFeGlzdHMgPSB3aW5kb3dFeGlzdHMgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCA9PT0gJ29iamVjdCc7XG52YXIgd2luZG93TmF2aWdhdG9yRXhpc3RzID0gd2luZG93RXhpc3RzICYmIHR5cGVvZiB3aW5kb3cubmF2aWdhdG9yID09PSAnb2JqZWN0JztcbnZhciB3aW5kb3dOYXZpZ2F0b3JNaW1lVHlwZXNFeGlzdHMgPSB3aW5kb3dOYXZpZ2F0b3JFeGlzdHMgJiYgdHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzID09PSAnb2JqZWN0JztcbnZhciB3aW5kb3dOYXZpZ2F0b3JQbHVnaW5zRXhpc3RzID0gd2luZG93TmF2aWdhdG9yRXhpc3RzICYmIHR5cGVvZiB3aW5kb3cubmF2aWdhdG9yLnBsdWdpbnMgPT09ICdvYmplY3QnO1xudmFyIHdpbmRvd0hUTUxFbGVtZW50RXhpc3RzID0gd2luZG93RXhpc3RzICYmXG4gICh0eXBlb2Ygd2luZG93LkhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB3aW5kb3cuSFRNTEVsZW1lbnQgPT09ICdvYmplY3QnKTtcbi8qKlxuICogIyMjIHR5cGVPZiAob2JqKVxuICpcbiAqIFVzZXMgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiBhbiBvYmplY3QsXG4gKiBub3JtYWxpc2luZyBiZWhhdmlvdXIgYWNyb3NzIGVuZ2luZSB2ZXJzaW9ucyAmIHdlbGwgb3B0aW1pc2VkLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICogQHJldHVybiB7U3RyaW5nfSBvYmplY3QgdHlwZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdHlwZURldGVjdChvYmopIHtcbiAgLyogISBTcGVlZCBvcHRpbWlzYXRpb25cbiAgICogUHJlOlxuICAgKiAgIHN0cmluZyBsaXRlcmFsICAgICB4IDMsMDM5LDAzNSBvcHMvc2VjIMKxMS42MiUgKDc4IHJ1bnMgc2FtcGxlZClcbiAgICogICBib29sZWFuIGxpdGVyYWwgICAgeCAxLDQyNCwxMzggb3BzL3NlYyDCsTQuNTQlICg3NSBydW5zIHNhbXBsZWQpXG4gICAqICAgbnVtYmVyIGxpdGVyYWwgICAgIHggMSw2NTMsMTUzIG9wcy9zZWMgwrExLjkxJSAoODIgcnVucyBzYW1wbGVkKVxuICAgKiAgIHVuZGVmaW5lZCAgICAgICAgICB4IDksOTc4LDY2MCBvcHMvc2VjIMKxMS45MiUgKDc1IHJ1bnMgc2FtcGxlZClcbiAgICogICBmdW5jdGlvbiAgICAgICAgICAgeCAyLDU1Niw3Njkgb3BzL3NlYyDCsTEuNzMlICg3NyBydW5zIHNhbXBsZWQpXG4gICAqIFBvc3Q6XG4gICAqICAgc3RyaW5nIGxpdGVyYWwgICAgIHggMzgsNTY0LDc5NiBvcHMvc2VjIMKxMS4xNSUgKDc5IHJ1bnMgc2FtcGxlZClcbiAgICogICBib29sZWFuIGxpdGVyYWwgICAgeCAzMSwxNDgsOTQwIG9wcy9zZWMgwrExLjEwJSAoNzkgcnVucyBzYW1wbGVkKVxuICAgKiAgIG51bWJlciBsaXRlcmFsICAgICB4IDMyLDY3OSwzMzAgb3BzL3NlYyDCsTEuOTAlICg3OCBydW5zIHNhbXBsZWQpXG4gICAqICAgdW5kZWZpbmVkICAgICAgICAgIHggMzIsMzYzLDM2OCBvcHMvc2VjIMKxMS4wNyUgKDgyIHJ1bnMgc2FtcGxlZClcbiAgICogICBmdW5jdGlvbiAgICAgICAgICAgeCAzMSwyOTYsODcwIG9wcy9zZWMgwrEwLjk2JSAoODMgcnVucyBzYW1wbGVkKVxuICAgKi9cbiAgdmFyIHR5cGVvZk9iaiA9IHR5cGVvZiBvYmo7XG4gIGlmICh0eXBlb2ZPYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHR5cGVvZk9iajtcbiAgfVxuXG4gIC8qICEgU3BlZWQgb3B0aW1pc2F0aW9uXG4gICAqIFByZTpcbiAgICogICBudWxsICAgICAgICAgICAgICAgeCAyOCw2NDUsNzY1IG9wcy9zZWMgwrExLjE3JSAoODIgcnVucyBzYW1wbGVkKVxuICAgKiBQb3N0OlxuICAgKiAgIG51bGwgICAgICAgICAgICAgICB4IDM2LDQyOCw5NjIgb3BzL3NlYyDCsTEuMzclICg4NCBydW5zIHNhbXBsZWQpXG4gICAqL1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuICdudWxsJztcbiAgfVxuXG4gIC8qICEgU3BlYyBDb25mb3JtYW5jZVxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHdpbmRvdylgYFxuICAgKiAgLSBOb2RlID09PSBcIltvYmplY3QgZ2xvYmFsXVwiXG4gICAqICAtIENocm9tZSA9PT0gXCJbb2JqZWN0IGdsb2JhbF1cIlxuICAgKiAgLSBGaXJlZm94ID09PSBcIltvYmplY3QgV2luZG93XVwiXG4gICAqICAtIFBoYW50b21KUyA9PT0gXCJbb2JqZWN0IFdpbmRvd11cIlxuICAgKiAgLSBTYWZhcmkgPT09IFwiW29iamVjdCBXaW5kb3ddXCJcbiAgICogIC0gSUUgMTEgPT09IFwiW29iamVjdCBXaW5kb3ddXCJcbiAgICogIC0gSUUgRWRnZSA9PT0gXCJbb2JqZWN0IFdpbmRvd11cIlxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMpYGBcbiAgICogIC0gQ2hyb21lIFdvcmtlciA9PT0gXCJbb2JqZWN0IGdsb2JhbF1cIlxuICAgKiAgLSBGaXJlZm94IFdvcmtlciA9PT0gXCJbb2JqZWN0IERlZGljYXRlZFdvcmtlckdsb2JhbFNjb3BlXVwiXG4gICAqICAtIFNhZmFyaSBXb3JrZXIgPT09IFwiW29iamVjdCBEZWRpY2F0ZWRXb3JrZXJHbG9iYWxTY29wZV1cIlxuICAgKiAgLSBJRSAxMSBXb3JrZXIgPT09IFwiW29iamVjdCBXb3JrZXJHbG9iYWxTY29wZV1cIlxuICAgKiAgLSBJRSBFZGdlIFdvcmtlciA9PT0gXCJbb2JqZWN0IFdvcmtlckdsb2JhbFNjb3BlXVwiXG4gICAqL1xuICBpZiAob2JqID09PSBnbG9iYWxPYmplY3QpIHtcbiAgICByZXR1cm4gJ2dsb2JhbCc7XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAgKiBQcmU6XG4gICAqICAgYXJyYXkgbGl0ZXJhbCAgICAgIHggMiw4ODgsMzUyIG9wcy9zZWMgwrEwLjY3JSAoODIgcnVucyBzYW1wbGVkKVxuICAgKiBQb3N0OlxuICAgKiAgIGFycmF5IGxpdGVyYWwgICAgICB4IDIyLDQ3OSw2NTAgb3BzL3NlYyDCsTAuOTYlICg4MSBydW5zIHNhbXBsZWQpXG4gICAqL1xuICBpZiAoXG4gICAgQXJyYXkuaXNBcnJheShvYmopICYmXG4gICAgKHN5bWJvbFRvU3RyaW5nVGFnRXhpc3RzID09PSBmYWxzZSB8fCAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiBvYmopKVxuICApIHtcbiAgICByZXR1cm4gJ0FycmF5JztcbiAgfVxuXG4gIGlmICh3aW5kb3dFeGlzdHMpIHtcbiAgICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICAgKiAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvYnJvd3NlcnMuaHRtbCNsb2NhdGlvbilcbiAgICAgKiBXaGF0V0cgSFRNTCQ3LjcuMyAtIFRoZSBgTG9jYXRpb25gIGludGVyZmFjZVxuICAgICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2luZG93LmxvY2F0aW9uKWBgXG4gICAgICogIC0gSUUgPD0xMSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgICAqICAtIElFIEVkZ2UgPD0xMyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgICAqL1xuICAgIGlmICh3aW5kb3dMb2NhdGlvbkV4aXN0cyAmJiBvYmogPT09IHdpbmRvdy5sb2NhdGlvbikge1xuICAgICAgcmV0dXJuICdMb2NhdGlvbic7XG4gICAgfVxuXG4gICAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAgICogKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI2RvY3VtZW50KVxuICAgICAqIFdoYXRXRyBIVE1MJDMuMS4xIC0gVGhlIGBEb2N1bWVudGAgb2JqZWN0XG4gICAgICogTm90ZTogTW9zdCBicm93c2VycyBjdXJyZW50bHkgYWRoZXIgdG8gdGhlIFczQyBET00gTGV2ZWwgMiBzcGVjXG4gICAgICogICAgICAgKGh0dHBzOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMi1IVE1ML2h0bWwuaHRtbCNJRC0yNjgwOTI2OClcbiAgICAgKiAgICAgICB3aGljaCBzdWdnZXN0cyB0aGF0IGJyb3dzZXJzIHNob3VsZCB1c2UgSFRNTFRhYmxlQ2VsbEVsZW1lbnQgZm9yXG4gICAgICogICAgICAgYm90aCBURCBhbmQgVEggZWxlbWVudHMuIFdoYXRXRyBzZXBhcmF0ZXMgdGhlc2UuXG4gICAgICogICAgICAgV2hhdFdHIEhUTUwgc3RhdGVzOlxuICAgICAqICAgICAgICAgPiBGb3IgaGlzdG9yaWNhbCByZWFzb25zLCBXaW5kb3cgb2JqZWN0cyBtdXN0IGFsc28gaGF2ZSBhXG4gICAgICogICAgICAgICA+IHdyaXRhYmxlLCBjb25maWd1cmFibGUsIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVkXG4gICAgICogICAgICAgICA+IEhUTUxEb2N1bWVudCB3aG9zZSB2YWx1ZSBpcyB0aGUgRG9jdW1lbnQgaW50ZXJmYWNlIG9iamVjdC5cbiAgICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRvY3VtZW50KWBgXG4gICAgICogIC0gQ2hyb21lID09PSBcIltvYmplY3QgSFRNTERvY3VtZW50XVwiXG4gICAgICogIC0gRmlyZWZveCA9PT0gXCJbb2JqZWN0IEhUTUxEb2N1bWVudF1cIlxuICAgICAqICAtIFNhZmFyaSA9PT0gXCJbb2JqZWN0IEhUTUxEb2N1bWVudF1cIlxuICAgICAqICAtIElFIDw9MTAgPT09IFwiW29iamVjdCBEb2N1bWVudF1cIlxuICAgICAqICAtIElFIDExID09PSBcIltvYmplY3QgSFRNTERvY3VtZW50XVwiXG4gICAgICogIC0gSUUgRWRnZSA8PTEzID09PSBcIltvYmplY3QgSFRNTERvY3VtZW50XVwiXG4gICAgICovXG4gICAgaWYgKHdpbmRvd0RvY3VtZW50RXhpc3RzICYmIG9iaiA9PT0gd2luZG93LmRvY3VtZW50KSB7XG4gICAgICByZXR1cm4gJ0RvY3VtZW50JztcbiAgICB9XG5cbiAgICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICAgKiAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvd2ViYXBwYXBpcy5odG1sI21pbWV0eXBlYXJyYXkpXG4gICAgICogV2hhdFdHIEhUTUwkOC42LjEuNSAtIFBsdWdpbnMgLSBJbnRlcmZhY2UgTWltZVR5cGVBcnJheVxuICAgICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmF2aWdhdG9yLm1pbWVUeXBlcylgYFxuICAgICAqICAtIElFIDw9MTAgPT09IFwiW29iamVjdCBNU01pbWVUeXBlc0NvbGxlY3Rpb25dXCJcbiAgICAgKi9cbiAgICBpZiAod2luZG93TmF2aWdhdG9yTWltZVR5cGVzRXhpc3RzICYmIG9iaiA9PT0gd2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXMpIHtcbiAgICAgIHJldHVybiAnTWltZVR5cGVBcnJheSc7XG4gICAgfVxuXG4gICAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAgICogKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3dlYmFwcGFwaXMuaHRtbCNwbHVnaW5hcnJheSlcbiAgICAgKiBXaGF0V0cgSFRNTCQ4LjYuMS41IC0gUGx1Z2lucyAtIEludGVyZmFjZSBQbHVnaW5BcnJheVxuICAgICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmF2aWdhdG9yLnBsdWdpbnMpYGBcbiAgICAgKiAgLSBJRSA8PTEwID09PSBcIltvYmplY3QgTVNQbHVnaW5zQ29sbGVjdGlvbl1cIlxuICAgICAqL1xuICAgIGlmICh3aW5kb3dOYXZpZ2F0b3JQbHVnaW5zRXhpc3RzICYmIG9iaiA9PT0gd2luZG93Lm5hdmlnYXRvci5wbHVnaW5zKSB7XG4gICAgICByZXR1cm4gJ1BsdWdpbkFycmF5JztcbiAgICB9XG5cbiAgICBpZiAod2luZG93SFRNTEVsZW1lbnRFeGlzdHMgJiYgb2JqIGluc3RhbmNlb2Ygd2luZG93LkhUTUxFbGVtZW50KSB7XG4gICAgICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICAgICogKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3dlYmFwcGFwaXMuaHRtbCNwbHVnaW5hcnJheSlcbiAgICAgICogV2hhdFdHIEhUTUwkNC40LjQgLSBUaGUgYGJsb2NrcXVvdGVgIGVsZW1lbnQgLSBJbnRlcmZhY2UgYEhUTUxRdW90ZUVsZW1lbnRgXG4gICAgICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYmxvY2txdW90ZScpKWBgXG4gICAgICAqICAtIElFIDw9MTAgPT09IFwiW29iamVjdCBIVE1MQmxvY2tFbGVtZW50XVwiXG4gICAgICAqL1xuICAgICAgaWYgKG9iai50YWdOYW1lID09PSAnQkxPQ0tRVU9URScpIHtcbiAgICAgICAgcmV0dXJuICdIVE1MUXVvdGVFbGVtZW50JztcbiAgICAgIH1cblxuICAgICAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAgICAgKiAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jaHRtbHRhYmxlZGF0YWNlbGxlbGVtZW50KVxuICAgICAgICogV2hhdFdHIEhUTUwkNC45LjkgLSBUaGUgYHRkYCBlbGVtZW50IC0gSW50ZXJmYWNlIGBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnRgXG4gICAgICAgKiBOb3RlOiBNb3N0IGJyb3dzZXJzIGN1cnJlbnRseSBhZGhlciB0byB0aGUgVzNDIERPTSBMZXZlbCAyIHNwZWNcbiAgICAgICAqICAgICAgIChodHRwczovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTItSFRNTC9odG1sLmh0bWwjSUQtODI5MTUwNzUpXG4gICAgICAgKiAgICAgICB3aGljaCBzdWdnZXN0cyB0aGF0IGJyb3dzZXJzIHNob3VsZCB1c2UgSFRNTFRhYmxlQ2VsbEVsZW1lbnQgZm9yXG4gICAgICAgKiAgICAgICBib3RoIFREIGFuZCBUSCBlbGVtZW50cy4gV2hhdFdHIHNlcGFyYXRlcyB0aGVzZS5cbiAgICAgICAqIFRlc3Q6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKVxuICAgICAgICogIC0gQ2hyb21lID09PSBcIltvYmplY3QgSFRNTFRhYmxlQ2VsbEVsZW1lbnRdXCJcbiAgICAgICAqICAtIEZpcmVmb3ggPT09IFwiW29iamVjdCBIVE1MVGFibGVDZWxsRWxlbWVudF1cIlxuICAgICAgICogIC0gU2FmYXJpID09PSBcIltvYmplY3QgSFRNTFRhYmxlQ2VsbEVsZW1lbnRdXCJcbiAgICAgICAqL1xuICAgICAgaWYgKG9iai50YWdOYW1lID09PSAnVEQnKSB7XG4gICAgICAgIHJldHVybiAnSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50JztcbiAgICAgIH1cblxuICAgICAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAgICAgKiAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jaHRtbHRhYmxlaGVhZGVyY2VsbGVsZW1lbnQpXG4gICAgICAgKiBXaGF0V0cgSFRNTCQ0LjkuOSAtIFRoZSBgdGRgIGVsZW1lbnQgLSBJbnRlcmZhY2UgYEhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50YFxuICAgICAgICogTm90ZTogTW9zdCBicm93c2VycyBjdXJyZW50bHkgYWRoZXIgdG8gdGhlIFczQyBET00gTGV2ZWwgMiBzcGVjXG4gICAgICAgKiAgICAgICAoaHR0cHM6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0yLUhUTUwvaHRtbC5odG1sI0lELTgyOTE1MDc1KVxuICAgICAgICogICAgICAgd2hpY2ggc3VnZ2VzdHMgdGhhdCBicm93c2VycyBzaG91bGQgdXNlIEhUTUxUYWJsZUNlbGxFbGVtZW50IGZvclxuICAgICAgICogICAgICAgYm90aCBURCBhbmQgVEggZWxlbWVudHMuIFdoYXRXRyBzZXBhcmF0ZXMgdGhlc2UuXG4gICAgICAgKiBUZXN0OiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKSlcbiAgICAgICAqICAtIENocm9tZSA9PT0gXCJbb2JqZWN0IEhUTUxUYWJsZUNlbGxFbGVtZW50XVwiXG4gICAgICAgKiAgLSBGaXJlZm94ID09PSBcIltvYmplY3QgSFRNTFRhYmxlQ2VsbEVsZW1lbnRdXCJcbiAgICAgICAqICAtIFNhZmFyaSA9PT0gXCJbb2JqZWN0IEhUTUxUYWJsZUNlbGxFbGVtZW50XVwiXG4gICAgICAgKi9cbiAgICAgIGlmIChvYmoudGFnTmFtZSA9PT0gJ1RIJykge1xuICAgICAgICByZXR1cm4gJ0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAqIFByZTpcbiAgKiAgIEZsb2F0NjRBcnJheSAgICAgICB4IDYyNSw2NDQgb3BzL3NlYyDCsTEuNTglICg4MCBydW5zIHNhbXBsZWQpXG4gICogICBGbG9hdDMyQXJyYXkgICAgICAgeCAxLDI3OSw4NTIgb3BzL3NlYyDCsTIuOTElICg3NyBydW5zIHNhbXBsZWQpXG4gICogICBVaW50MzJBcnJheSAgICAgICAgeCAxLDE3OCwxODUgb3BzL3NlYyDCsTEuOTUlICg4MyBydW5zIHNhbXBsZWQpXG4gICogICBVaW50MTZBcnJheSAgICAgICAgeCAxLDAwOCwzODAgb3BzL3NlYyDCsTIuMjUlICg4MCBydW5zIHNhbXBsZWQpXG4gICogICBVaW50OEFycmF5ICAgICAgICAgeCAxLDEyOCwwNDAgb3BzL3NlYyDCsTIuMTElICg4MSBydW5zIHNhbXBsZWQpXG4gICogICBJbnQzMkFycmF5ICAgICAgICAgeCAxLDE3MCwxMTkgb3BzL3NlYyDCsTIuODglICg4MCBydW5zIHNhbXBsZWQpXG4gICogICBJbnQxNkFycmF5ICAgICAgICAgeCAxLDE3NiwzNDggb3BzL3NlYyDCsTUuNzklICg4NiBydW5zIHNhbXBsZWQpXG4gICogICBJbnQ4QXJyYXkgICAgICAgICAgeCAxLDA1OCw3MDcgb3BzL3NlYyDCsTQuOTQlICg3NyBydW5zIHNhbXBsZWQpXG4gICogICBVaW50OENsYW1wZWRBcnJheSAgeCAxLDExMCw2MzMgb3BzL3NlYyDCsTQuMjAlICg4MCBydW5zIHNhbXBsZWQpXG4gICogUG9zdDpcbiAgKiAgIEZsb2F0NjRBcnJheSAgICAgICB4IDcsMTA1LDY3MSBvcHMvc2VjIMKxMTMuNDclICg2NCBydW5zIHNhbXBsZWQpXG4gICogICBGbG9hdDMyQXJyYXkgICAgICAgeCA1LDg4Nyw5MTIgb3BzL3NlYyDCsTEuNDYlICg4MiBydW5zIHNhbXBsZWQpXG4gICogICBVaW50MzJBcnJheSAgICAgICAgeCA2LDQ5MSw2NjEgb3BzL3NlYyDCsTEuNzYlICg3OSBydW5zIHNhbXBsZWQpXG4gICogICBVaW50MTZBcnJheSAgICAgICAgeCA2LDU1OSw3OTUgb3BzL3NlYyDCsTEuNjclICg4MiBydW5zIHNhbXBsZWQpXG4gICogICBVaW50OEFycmF5ICAgICAgICAgeCA2LDQ2Myw5NjYgb3BzL3NlYyDCsTEuNDMlICg4NSBydW5zIHNhbXBsZWQpXG4gICogICBJbnQzMkFycmF5ICAgICAgICAgeCA1LDY0MSw4NDEgb3BzL3NlYyDCsTMuNDklICg4MSBydW5zIHNhbXBsZWQpXG4gICogICBJbnQxNkFycmF5ICAgICAgICAgeCA2LDU4Myw1MTEgb3BzL3NlYyDCsTEuOTglICg4MCBydW5zIHNhbXBsZWQpXG4gICogICBJbnQ4QXJyYXkgICAgICAgICAgeCA2LDYwNiwwNzggb3BzL3NlYyDCsTEuNzQlICg4MSBydW5zIHNhbXBsZWQpXG4gICogICBVaW50OENsYW1wZWRBcnJheSAgeCA2LDYwMiwyMjQgb3BzL3NlYyDCsTEuNzclICg4MyBydW5zIHNhbXBsZWQpXG4gICovXG4gIHZhciBzdHJpbmdUYWcgPSAoc3ltYm9sVG9TdHJpbmdUYWdFeGlzdHMgJiYgb2JqW1N5bWJvbC50b1N0cmluZ1RhZ10pO1xuICBpZiAodHlwZW9mIHN0cmluZ1RhZyA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3RyaW5nVGFnO1xuICB9XG5cbiAgdmFyIG9ialByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAqIFByZTpcbiAgKiAgIHJlZ2V4IGxpdGVyYWwgICAgICB4IDEsNzcyLDM4NSBvcHMvc2VjIMKxMS44NSUgKDc3IHJ1bnMgc2FtcGxlZClcbiAgKiAgIHJlZ2V4IGNvbnN0cnVjdG9yICB4IDIsMTQzLDYzNCBvcHMvc2VjIMKxMi40NiUgKDc4IHJ1bnMgc2FtcGxlZClcbiAgKiBQb3N0OlxuICAqICAgcmVnZXggbGl0ZXJhbCAgICAgIHggMyw5MjgsMDA5IG9wcy9zZWMgwrEwLjY1JSAoNzggcnVucyBzYW1wbGVkKVxuICAqICAgcmVnZXggY29uc3RydWN0b3IgIHggMyw5MzEsMTA4IG9wcy9zZWMgwrEwLjU4JSAoODQgcnVucyBzYW1wbGVkKVxuICAqL1xuICBpZiAob2JqUHJvdG90eXBlID09PSBSZWdFeHAucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdSZWdFeHAnO1xuICB9XG5cbiAgLyogISBTcGVlZCBvcHRpbWlzYXRpb25cbiAgKiBQcmU6XG4gICogICBkYXRlICAgICAgICAgICAgICAgeCAyLDEzMCwwNzQgb3BzL3NlYyDCsTQuNDIlICg2OCBydW5zIHNhbXBsZWQpXG4gICogUG9zdDpcbiAgKiAgIGRhdGUgICAgICAgICAgICAgICB4IDMsOTUzLDc3OSBvcHMvc2VjIMKxMS4zNSUgKDc3IHJ1bnMgc2FtcGxlZClcbiAgKi9cbiAgaWYgKG9ialByb3RvdHlwZSA9PT0gRGF0ZS5wcm90b3R5cGUpIHtcbiAgICByZXR1cm4gJ0RhdGUnO1xuICB9XG5cbiAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAqIChodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wL2luZGV4Lmh0bWwjc2VjLXByb21pc2UucHJvdG90eXBlLUBAdG9zdHJpbmd0YWcpXG4gICAqIEVTNiQyNS40LjUuNCAtIFByb21pc2UucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddIHNob3VsZCBiZSBcIlByb21pc2VcIjpcbiAgICogVGVzdDogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChQcm9taXNlLnJlc29sdmUoKSlgYFxuICAgKiAgLSBDaHJvbWUgPD00NyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgKiAgLSBFZGdlIDw9MjAgPT09IFwiW29iamVjdCBPYmplY3RdXCJcbiAgICogIC0gRmlyZWZveCAyOS1MYXRlc3QgPT09IFwiW29iamVjdCBQcm9taXNlXVwiXG4gICAqICAtIFNhZmFyaSA3LjEtTGF0ZXN0ID09PSBcIltvYmplY3QgUHJvbWlzZV1cIlxuICAgKi9cbiAgaWYgKHByb21pc2VFeGlzdHMgJiYgb2JqUHJvdG90eXBlID09PSBQcm9taXNlLnByb3RvdHlwZSkge1xuICAgIHJldHVybiAnUHJvbWlzZSc7XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAqIFByZTpcbiAgKiAgIHNldCAgICAgICAgICAgICAgICB4IDIsMjIyLDE4NiBvcHMvc2VjIMKxMS4zMSUgKDgyIHJ1bnMgc2FtcGxlZClcbiAgKiBQb3N0OlxuICAqICAgc2V0ICAgICAgICAgICAgICAgIHggNCw1NDUsODc5IG9wcy9zZWMgwrExLjEzJSAoODMgcnVucyBzYW1wbGVkKVxuICAqL1xuICBpZiAoc2V0RXhpc3RzICYmIG9ialByb3RvdHlwZSA9PT0gU2V0LnByb3RvdHlwZSkge1xuICAgIHJldHVybiAnU2V0JztcbiAgfVxuXG4gIC8qICEgU3BlZWQgb3B0aW1pc2F0aW9uXG4gICogUHJlOlxuICAqICAgbWFwICAgICAgICAgICAgICAgIHggMiwzOTYsODQyIG9wcy9zZWMgwrExLjU5JSAoODEgcnVucyBzYW1wbGVkKVxuICAqIFBvc3Q6XG4gICogICBtYXAgICAgICAgICAgICAgICAgeCA0LDE4Myw5NDUgb3BzL3NlYyDCsTYuNTklICg4MiBydW5zIHNhbXBsZWQpXG4gICovXG4gIGlmIChtYXBFeGlzdHMgJiYgb2JqUHJvdG90eXBlID09PSBNYXAucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdNYXAnO1xuICB9XG5cbiAgLyogISBTcGVlZCBvcHRpbWlzYXRpb25cbiAgKiBQcmU6XG4gICogICB3ZWFrc2V0ICAgICAgICAgICAgeCAxLDMyMywyMjAgb3BzL3NlYyDCsTIuMTclICg3NiBydW5zIHNhbXBsZWQpXG4gICogUG9zdDpcbiAgKiAgIHdlYWtzZXQgICAgICAgICAgICB4IDQsMjM3LDUxMCBvcHMvc2VjIMKxMi4wMSUgKDc3IHJ1bnMgc2FtcGxlZClcbiAgKi9cbiAgaWYgKHdlYWtTZXRFeGlzdHMgJiYgb2JqUHJvdG90eXBlID09PSBXZWFrU2V0LnByb3RvdHlwZSkge1xuICAgIHJldHVybiAnV2Vha1NldCc7XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAqIFByZTpcbiAgKiAgIHdlYWttYXAgICAgICAgICAgICB4IDEsNTAwLDI2MCBvcHMvc2VjIMKxMi4wMiUgKDc4IHJ1bnMgc2FtcGxlZClcbiAgKiBQb3N0OlxuICAqICAgd2Vha21hcCAgICAgICAgICAgIHggMyw4ODEsMzg0IG9wcy9zZWMgwrExLjQ1JSAoODIgcnVucyBzYW1wbGVkKVxuICAqL1xuICBpZiAod2Vha01hcEV4aXN0cyAmJiBvYmpQcm90b3R5cGUgPT09IFdlYWtNYXAucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdXZWFrTWFwJztcbiAgfVxuXG4gIC8qICEgU3BlYyBDb25mb3JtYW5jZVxuICAgKiAoaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC9pbmRleC5odG1sI3NlYy1kYXRhdmlldy5wcm90b3R5cGUtQEB0b3N0cmluZ3RhZylcbiAgICogRVM2JDI0LjIuNC4yMSAtIERhdGFWaWV3LnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSBzaG91bGQgYmUgXCJEYXRhVmlld1wiOlxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKWBgXG4gICAqICAtIEVkZ2UgPD0xMyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgKi9cbiAgaWYgKGRhdGFWaWV3RXhpc3RzICYmIG9ialByb3RvdHlwZSA9PT0gRGF0YVZpZXcucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdEYXRhVmlldyc7XG4gIH1cblxuICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICogKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvaW5kZXguaHRtbCNzZWMtJW1hcGl0ZXJhdG9ycHJvdG90eXBlJS1AQHRvc3RyaW5ndGFnKVxuICAgKiBFUzYkMjMuMS41LjIuMiAtICVNYXBJdGVyYXRvclByb3RvdHlwZSVbQEB0b1N0cmluZ1RhZ10gc2hvdWxkIGJlIFwiTWFwIEl0ZXJhdG9yXCI6XG4gICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3IE1hcCgpLmVudHJpZXMoKSlgYFxuICAgKiAgLSBFZGdlIDw9MTMgPT09IFwiW29iamVjdCBPYmplY3RdXCJcbiAgICovXG4gIGlmIChtYXBFeGlzdHMgJiYgb2JqUHJvdG90eXBlID09PSBtYXBJdGVyYXRvclByb3RvdHlwZSkge1xuICAgIHJldHVybiAnTWFwIEl0ZXJhdG9yJztcbiAgfVxuXG4gIC8qICEgU3BlYyBDb25mb3JtYW5jZVxuICAgKiAoaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC9pbmRleC5odG1sI3NlYy0lc2V0aXRlcmF0b3Jwcm90b3R5cGUlLUBAdG9zdHJpbmd0YWcpXG4gICAqIEVTNiQyMy4yLjUuMi4yIC0gJVNldEl0ZXJhdG9yUHJvdG90eXBlJVtAQHRvU3RyaW5nVGFnXSBzaG91bGQgYmUgXCJTZXQgSXRlcmF0b3JcIjpcbiAgICogVGVzdDogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuZXcgU2V0KCkuZW50cmllcygpKWBgXG4gICAqICAtIEVkZ2UgPD0xMyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgKi9cbiAgaWYgKHNldEV4aXN0cyAmJiBvYmpQcm90b3R5cGUgPT09IHNldEl0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdTZXQgSXRlcmF0b3InO1xuICB9XG5cbiAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAqIChodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wL2luZGV4Lmh0bWwjc2VjLSVhcnJheWl0ZXJhdG9ycHJvdG90eXBlJS1AQHRvc3RyaW5ndGFnKVxuICAgKiBFUzYkMjIuMS41LjIuMiAtICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJVtAQHRvU3RyaW5nVGFnXSBzaG91bGQgYmUgXCJBcnJheSBJdGVyYXRvclwiOlxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSlgYFxuICAgKiAgLSBFZGdlIDw9MTMgPT09IFwiW29iamVjdCBPYmplY3RdXCJcbiAgICovXG4gIGlmIChhcnJheUl0ZXJhdG9yRXhpc3RzICYmIG9ialByb3RvdHlwZSA9PT0gYXJyYXlJdGVyYXRvclByb3RvdHlwZSkge1xuICAgIHJldHVybiAnQXJyYXkgSXRlcmF0b3InO1xuICB9XG5cbiAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAqIChodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wL2luZGV4Lmh0bWwjc2VjLSVzdHJpbmdpdGVyYXRvcnByb3RvdHlwZSUtQEB0b3N0cmluZ3RhZylcbiAgICogRVM2JDIxLjEuNS4yLjIgLSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlW0BAdG9TdHJpbmdUYWddIHNob3VsZCBiZSBcIlN0cmluZyBJdGVyYXRvclwiOlxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSlgYFxuICAgKiAgLSBFZGdlIDw9MTMgPT09IFwiW29iamVjdCBPYmplY3RdXCJcbiAgICovXG4gIGlmIChzdHJpbmdJdGVyYXRvckV4aXN0cyAmJiBvYmpQcm90b3R5cGUgPT09IHN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdTdHJpbmcgSXRlcmF0b3InO1xuICB9XG5cbiAgLyogISBTcGVlZCBvcHRpbWlzYXRpb25cbiAgKiBQcmU6XG4gICogICBvYmplY3QgZnJvbSBudWxsICAgeCAyLDQyNCwzMjAgb3BzL3NlYyDCsTEuNjclICg3NiBydW5zIHNhbXBsZWQpXG4gICogUG9zdDpcbiAgKiAgIG9iamVjdCBmcm9tIG51bGwgICB4IDUsODM4LDAwMCBvcHMvc2VjIMKxMC45OSUgKDg0IHJ1bnMgc2FtcGxlZClcbiAgKi9cbiAgaWYgKG9ialByb3RvdHlwZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiAnT2JqZWN0JztcbiAgfVxuXG4gIHJldHVybiBPYmplY3RcbiAgICAucHJvdG90eXBlXG4gICAgLnRvU3RyaW5nXG4gICAgLmNhbGwob2JqKVxuICAgIC5zbGljZSh0b1N0cmluZ0xlZnRTbGljZUxlbmd0aCwgdG9TdHJpbmdSaWdodFNsaWNlTGVuZ3RoKTtcbn1cblxucmV0dXJuIHR5cGVEZXRlY3Q7XG5cbn0pKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlLWRldGVjdC90eXBlLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyohXG4gKiBhc3NlcnRpb24tZXJyb3JcbiAqIENvcHlyaWdodChjKSAyMDEzIEpha2UgTHVlciA8amFrZUBxdWFsaWFuY3kuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyohXG4gKiBSZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHdpbGwgY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIG9uZSBvYmplY3QgdG8gYW5vdGhlciBleGNsdWRpbmcgYW55IG9yaWdpbmFsbHlcbiAqIGxpc3RlZC4gUmV0dXJuZWQgZnVuY3Rpb24gd2lsbCBjcmVhdGUgYSBuZXcgYHt9YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXhjbHVkZWQgcHJvcGVydGllcyAuLi5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5cbmZ1bmN0aW9uIGV4Y2x1ZGUgKCkge1xuICB2YXIgZXhjbHVkZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgZnVuY3Rpb24gZXhjbHVkZVByb3BzIChyZXMsIG9iaikge1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoIX5leGNsdWRlcy5pbmRleE9mKGtleSkpIHJlc1trZXldID0gb2JqW2tleV07XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gZXh0ZW5kRXhjbHVkZSAoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICAgICwgaSA9IDBcbiAgICAgICwgcmVzID0ge307XG5cbiAgICBmb3IgKDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGV4Y2x1ZGVQcm9wcyhyZXMsIGFyZ3NbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH07XG59O1xuXG4vKiFcbiAqIFByaW1hcnkgRXhwb3J0c1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gQXNzZXJ0aW9uRXJyb3I7XG5cbi8qKlxuICogIyMjIEFzc2VydGlvbkVycm9yXG4gKlxuICogQW4gZXh0ZW5zaW9uIG9mIHRoZSBKYXZhU2NyaXB0IGBFcnJvcmAgY29uc3RydWN0b3IgZm9yXG4gKiBhc3NlcnRpb24gYW5kIHZhbGlkYXRpb24gc2NlbmFyaW9zLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllcyB0byBpbmNsdWRlIChvcHRpb25hbClcbiAqIEBwYXJhbSB7Y2FsbGVlfSBzdGFydCBzdGFjayBmdW5jdGlvbiAob3B0aW9uYWwpXG4gKi9cblxuZnVuY3Rpb24gQXNzZXJ0aW9uRXJyb3IgKG1lc3NhZ2UsIF9wcm9wcywgc3NmKSB7XG4gIHZhciBleHRlbmQgPSBleGNsdWRlKCduYW1lJywgJ21lc3NhZ2UnLCAnc3RhY2snLCAnY29uc3RydWN0b3InLCAndG9KU09OJylcbiAgICAsIHByb3BzID0gZXh0ZW5kKF9wcm9wcyB8fCB7fSk7XG5cbiAgLy8gZGVmYXVsdCB2YWx1ZXNcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCAnVW5zcGVjaWZpZWQgQXNzZXJ0aW9uRXJyb3InO1xuICB0aGlzLnNob3dEaWZmID0gZmFsc2U7XG5cbiAgLy8gY29weSBmcm9tIHByb3BlcnRpZXNcbiAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgdGhpc1trZXldID0gcHJvcHNba2V5XTtcbiAgfVxuXG4gIC8vIGNhcHR1cmUgc3RhY2sgdHJhY2VcbiAgc3NmID0gc3NmIHx8IEFzc2VydGlvbkVycm9yO1xuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBzc2YpO1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHRoaXMuc3RhY2sgPSBlLnN0YWNrO1xuICAgIH1cbiAgfVxufVxuXG4vKiFcbiAqIEluaGVyaXQgZnJvbSBFcnJvci5wcm90b3R5cGVcbiAqL1xuXG5Bc3NlcnRpb25FcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5cbi8qIVxuICogU3RhdGljYWxseSBzZXQgbmFtZVxuICovXG5cbkFzc2VydGlvbkVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0Fzc2VydGlvbkVycm9yJztcblxuLyohXG4gKiBFbnN1cmUgY29ycmVjdCBjb25zdHJ1Y3RvclxuICovXG5cbkFzc2VydGlvbkVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFzc2VydGlvbkVycm9yO1xuXG4vKipcbiAqIEFsbG93IGVycm9ycyB0byBiZSBjb252ZXJ0ZWQgdG8gSlNPTiBmb3Igc3RhdGljIHRyYW5zZmVyLlxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5jbHVkZSBzdGFjayAoZGVmYXVsdDogYHRydWVgKVxuICogQHJldHVybiB7T2JqZWN0fSBvYmplY3QgdGhhdCBjYW4gYmUgYEpTT04uc3RyaW5naWZ5YFxuICovXG5cbkFzc2VydGlvbkVycm9yLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoc3RhY2spIHtcbiAgdmFyIGV4dGVuZCA9IGV4Y2x1ZGUoJ2NvbnN0cnVjdG9yJywgJ3RvSlNPTicsICdzdGFjaycpXG4gICAgLCBwcm9wcyA9IGV4dGVuZCh7IG5hbWU6IHRoaXMubmFtZSB9LCB0aGlzKTtcblxuICAvLyBpbmNsdWRlIHN0YWNrIGlmIGV4aXN0cyBhbmQgbm90IHR1cm5lZCBvZmZcbiAgaWYgKGZhbHNlICE9PSBzdGFjayAmJiB0aGlzLnN0YWNrKSB7XG4gICAgcHJvcHMuc3RhY2sgPSB0aGlzLnN0YWNrO1xuICB9XG5cbiAgcmV0dXJuIHByb3BzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fzc2VydGlvbi1lcnJvci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyohXG4gKiBDaGFpIC0gZ2V0QWN0dWFsIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuZ2V0QWN0dWFsKG9iamVjdCwgW2FjdHVhbF0pXG4gKlxuICogUmV0dXJucyB0aGUgYGFjdHVhbGAgdmFsdWUgZm9yIGFuIEFzc2VydGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IChjb25zdHJ1Y3RlZCBBc3NlcnRpb24pXG4gKiBAcGFyYW0ge0FyZ3VtZW50c30gY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLmFzc2VydCBhcmd1bWVudHNcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGdldEFjdHVhbFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0QWN0dWFsKG9iaiwgYXJncykge1xuICByZXR1cm4gYXJncy5sZW5ndGggPiA0ID8gYXJnc1s0XSA6IG9iai5fb2JqO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0QWN0dWFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbi8qICFcbiAqIENoYWkgLSBnZXRGdW5jTmFtZSB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE2IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgLmdldEZ1bmNOYW1lKGNvbnN0cnVjdG9yRm4pXG4gKlxuICogUmV0dXJucyB0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uLlxuICogV2hlbiBhIG5vbi1mdW5jdGlvbiBpbnN0YW5jZSBpcyBwYXNzZWQsIHJldHVybnMgYG51bGxgLlxuICogVGhpcyBhbHNvIGluY2x1ZGVzIGEgcG9seWZpbGwgZnVuY3Rpb24gaWYgYGFGdW5jLm5hbWVgIGlzIG5vdCBkZWZpbmVkLlxuICpcbiAqIEBuYW1lIGdldEZ1bmNOYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdFxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG52YXIgdG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZnVuY3Rpb25OYW1lTWF0Y2ggPSAvXFxzKmZ1bmN0aW9uKD86XFxzfFxccypcXC9cXCpbXig/OipcXC8pXStcXCpcXC9cXHMqKSooW15cXHNcXChcXC9dKykvO1xuZnVuY3Rpb24gZ2V0RnVuY05hbWUoYUZ1bmMpIHtcbiAgaWYgKHR5cGVvZiBhRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIG5hbWUgPSAnJztcbiAgaWYgKHR5cGVvZiBGdW5jdGlvbi5wcm90b3R5cGUubmFtZSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGFGdW5jLm5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gSGVyZSB3ZSBydW4gYSBwb2x5ZmlsbCBpZiBGdW5jdGlvbiBkb2VzIG5vdCBzdXBwb3J0IHRoZSBgbmFtZWAgcHJvcGVydHkgYW5kIGlmIGFGdW5jLm5hbWUgaXMgbm90IGRlZmluZWRcbiAgICB2YXIgbWF0Y2ggPSB0b1N0cmluZy5jYWxsKGFGdW5jKS5tYXRjaChmdW5jdGlvbk5hbWVNYXRjaCk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBuYW1lID0gbWF0Y2hbMV07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIElmIHdlJ3ZlIGdvdCBhIGBuYW1lYCBwcm9wZXJ0eSB3ZSBqdXN0IHVzZSBpdFxuICAgIG5hbWUgPSBhRnVuYy5uYW1lO1xuICB9XG5cbiAgcmV0dXJuIG5hbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0RnVuY05hbWU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nZXQtZnVuYy1uYW1lL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiFcbiAqIENoYWkgLSBnZXRQcm9wZXJ0aWVzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuZ2V0UHJvcGVydGllcyhvYmplY3QpXG4gKlxuICogVGhpcyBhbGxvd3MgdGhlIHJldHJpZXZhbCBvZiBwcm9wZXJ0eSBuYW1lcyBvZiBhbiBvYmplY3QsIGVudW1lcmFibGUgb3Igbm90LFxuICogaW5oZXJpdGVkIG9yIG5vdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBnZXRQcm9wZXJ0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UHJvcGVydGllcyhvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG5cbiAgZnVuY3Rpb24gYWRkUHJvcGVydHkocHJvcGVydHkpIHtcbiAgICBpZiAocmVzdWx0LmluZGV4T2YocHJvcGVydHkpID09PSAtMSkge1xuICAgICAgcmVzdWx0LnB1c2gocHJvcGVydHkpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICB3aGlsZSAocHJvdG8gIT09IG51bGwpIHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykuZm9yRWFjaChhZGRQcm9wZXJ0eSk7XG4gICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2dldFByb3BlcnRpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIVxuICogQ2hhaSAtIGZsYWcgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogTW9kdWxlIGRlcGVuZGFuY2llc1xuICovXG5cbnZhciBpbnNwZWN0ID0gcmVxdWlyZSgnLi9pbnNwZWN0Jyk7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG5cbi8qKlxuICogIyMjIC5vYmpEaXNwbGF5KG9iamVjdClcbiAqXG4gKiBEZXRlcm1pbmVzIGlmIGFuIG9iamVjdCBvciBhbiBhcnJheSBtYXRjaGVzXG4gKiBjcml0ZXJpYSB0byBiZSBpbnNwZWN0ZWQgaW4tbGluZSBmb3IgZXJyb3JcbiAqIG1lc3NhZ2VzIG9yIHNob3VsZCBiZSB0cnVuY2F0ZWQuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gamF2YXNjcmlwdCBvYmplY3QgdG8gaW5zcGVjdFxuICogQG5hbWUgb2JqRGlzcGxheVxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9iakRpc3BsYXkob2JqKSB7XG4gIHZhciBzdHIgPSBpbnNwZWN0KG9iailcbiAgICAsIHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTtcblxuICBpZiAoY29uZmlnLnRydW5jYXRlVGhyZXNob2xkICYmIHN0ci5sZW5ndGggPj0gY29uZmlnLnRydW5jYXRlVGhyZXNob2xkKSB7XG4gICAgaWYgKHR5cGUgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScpIHtcbiAgICAgIHJldHVybiAhb2JqLm5hbWUgfHwgb2JqLm5hbWUgPT09ICcnXG4gICAgICAgID8gJ1tGdW5jdGlvbl0nXG4gICAgICAgIDogJ1tGdW5jdGlvbjogJyArIG9iai5uYW1lICsgJ10nO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuICdbIEFycmF5KCcgKyBvYmoubGVuZ3RoICsgJykgXSc7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopXG4gICAgICAgICwga3N0ciA9IGtleXMubGVuZ3RoID4gMlxuICAgICAgICAgID8ga2V5cy5zcGxpY2UoMCwgMikuam9pbignLCAnKSArICcsIC4uLidcbiAgICAgICAgICA6IGtleXMuam9pbignLCAnKTtcbiAgICAgIHJldHVybiAneyBPYmplY3QgKCcgKyBrc3RyICsgJykgfSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL29iakRpc3BsYXkuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIVxuICogQ2hhaSAtIGdldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHMgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNiBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIC5nZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzKG9iamVjdClcbiAqXG4gKiBUaGlzIGFsbG93cyB0aGUgcmV0cmlldmFsIG9mIGRpcmVjdGx5LW93bmVkIGVudW1lcmFibGUgcHJvcGVydHkgc3ltYm9scyBvZiBhblxuICogb2JqZWN0LiBUaGlzIGZ1bmN0aW9uIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbiAqIHJldHVybnMgYm90aCBlbnVtZXJhYmxlIGFuZCBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSBzeW1ib2xzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGdldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzKG9iaikge1xuICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgIT09ICdmdW5jdGlvbicpIHJldHVybiBbXTtcblxuICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBzeW0pLmVudW1lcmFibGU7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scy5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXHJcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xyXG5cclxuZGVzY3JpYmUoJ21vZHVsZTEgZGVmYXVsdCBmdW5jdGlvbicsICgpID0+IHtcclxuICBpdCgnMSsxJywgKCkgPT4ge1xyXG4gICAgY29uc3QgZXhwZWN0OiBudW1iZXIgPSAzO1xyXG4gICAgYXNzZXJ0LmVxdWFsKDEgKyAyLCBleHBlY3QpO1xyXG4gIH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdGVzdC90cy9Ob2RlVGVzdC50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvY2hhaScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY2hhaS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyohXG4gKiBjaGFpXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogRGVwZW5kZW5jaWVzIHRoYXQgYXJlIHVzZWQgZm9yIG11bHRpcGxlIGV4cG9ydHMgYXJlIHJlcXVpcmVkIGhlcmUgb25seSBvbmNlXG4gKi9cblxudmFyIHBhdGh2YWwgPSByZXF1aXJlKCdwYXRodmFsJyk7XG5cbi8qIVxuICogdGVzdCB1dGlsaXR5XG4gKi9cblxuZXhwb3J0cy50ZXN0ID0gcmVxdWlyZSgnLi90ZXN0Jyk7XG5cbi8qIVxuICogdHlwZSB1dGlsaXR5XG4gKi9cblxuZXhwb3J0cy50eXBlID0gcmVxdWlyZSgndHlwZS1kZXRlY3QnKTtcblxuLyohXG4gKiBleHBlY3RUeXBlcyB1dGlsaXR5XG4gKi9cbmV4cG9ydHMuZXhwZWN0VHlwZXMgPSByZXF1aXJlKCcuL2V4cGVjdFR5cGVzJyk7XG5cbi8qIVxuICogbWVzc2FnZSB1dGlsaXR5XG4gKi9cblxuZXhwb3J0cy5nZXRNZXNzYWdlID0gcmVxdWlyZSgnLi9nZXRNZXNzYWdlJyk7XG5cbi8qIVxuICogYWN0dWFsIHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLmdldEFjdHVhbCA9IHJlcXVpcmUoJy4vZ2V0QWN0dWFsJyk7XG5cbi8qIVxuICogSW5zcGVjdCB1dGlsXG4gKi9cblxuZXhwb3J0cy5pbnNwZWN0ID0gcmVxdWlyZSgnLi9pbnNwZWN0Jyk7XG5cbi8qIVxuICogT2JqZWN0IERpc3BsYXkgdXRpbFxuICovXG5cbmV4cG9ydHMub2JqRGlzcGxheSA9IHJlcXVpcmUoJy4vb2JqRGlzcGxheScpO1xuXG4vKiFcbiAqIEZsYWcgdXRpbGl0eVxuICovXG5cbmV4cG9ydHMuZmxhZyA9IHJlcXVpcmUoJy4vZmxhZycpO1xuXG4vKiFcbiAqIEZsYWcgdHJhbnNmZXJyaW5nIHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLnRyYW5zZmVyRmxhZ3MgPSByZXF1aXJlKCcuL3RyYW5zZmVyRmxhZ3MnKTtcblxuLyohXG4gKiBEZWVwIGVxdWFsIHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLmVxbCA9IHJlcXVpcmUoJ2RlZXAtZXFsJyk7XG5cbi8qIVxuICogRGVlcCBwYXRoIGluZm9cbiAqL1xuXG5leHBvcnRzLmdldFBhdGhJbmZvID0gcGF0aHZhbC5nZXRQYXRoSW5mbztcblxuLyohXG4gKiBDaGVjayBpZiBhIHByb3BlcnR5IGV4aXN0c1xuICovXG5cbmV4cG9ydHMuaGFzUHJvcGVydHkgPSBwYXRodmFsLmhhc1Byb3BlcnR5O1xuXG4vKiFcbiAqIEZ1bmN0aW9uIG5hbWVcbiAqL1xuXG5leHBvcnRzLmdldE5hbWUgPSByZXF1aXJlKCdnZXQtZnVuYy1uYW1lJyk7XG5cbi8qIVxuICogYWRkIFByb3BlcnR5XG4gKi9cblxuZXhwb3J0cy5hZGRQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vYWRkUHJvcGVydHknKTtcblxuLyohXG4gKiBhZGQgTWV0aG9kXG4gKi9cblxuZXhwb3J0cy5hZGRNZXRob2QgPSByZXF1aXJlKCcuL2FkZE1ldGhvZCcpO1xuXG4vKiFcbiAqIG92ZXJ3cml0ZSBQcm9wZXJ0eVxuICovXG5cbmV4cG9ydHMub3ZlcndyaXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL292ZXJ3cml0ZVByb3BlcnR5Jyk7XG5cbi8qIVxuICogb3ZlcndyaXRlIE1ldGhvZFxuICovXG5cbmV4cG9ydHMub3ZlcndyaXRlTWV0aG9kID0gcmVxdWlyZSgnLi9vdmVyd3JpdGVNZXRob2QnKTtcblxuLyohXG4gKiBBZGQgYSBjaGFpbmFibGUgbWV0aG9kXG4gKi9cblxuZXhwb3J0cy5hZGRDaGFpbmFibGVNZXRob2QgPSByZXF1aXJlKCcuL2FkZENoYWluYWJsZU1ldGhvZCcpO1xuXG4vKiFcbiAqIE92ZXJ3cml0ZSBjaGFpbmFibGUgbWV0aG9kXG4gKi9cblxuZXhwb3J0cy5vdmVyd3JpdGVDaGFpbmFibGVNZXRob2QgPSByZXF1aXJlKCcuL292ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCcpO1xuXG4vKiFcbiAqIENvbXBhcmUgYnkgaW5zcGVjdCBtZXRob2RcbiAqL1xuXG5leHBvcnRzLmNvbXBhcmVCeUluc3BlY3QgPSByZXF1aXJlKCcuL2NvbXBhcmVCeUluc3BlY3QnKTtcblxuLyohXG4gKiBHZXQgb3duIGVudW1lcmFibGUgcHJvcGVydHkgc3ltYm9scyBtZXRob2RcbiAqL1xuXG5leHBvcnRzLmdldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHMgPSByZXF1aXJlKCcuL2dldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHMnKTtcblxuLyohXG4gKiBHZXQgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBtZXRob2RcbiAqL1xuXG5leHBvcnRzLmdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi9nZXRPd25FbnVtZXJhYmxlUHJvcGVydGllcycpO1xuXG4vKiFcbiAqIENoZWNrcyBlcnJvciBhZ2FpbnN0IGEgZ2l2ZW4gc2V0IG9mIGNyaXRlcmlhXG4gKi9cblxuZXhwb3J0cy5jaGVja0Vycm9yID0gcmVxdWlyZSgnY2hlY2stZXJyb3InKTtcblxuLyohXG4gKiBQcm94aWZ5IHV0aWxcbiAqL1xuXG5leHBvcnRzLnByb3hpZnkgPSByZXF1aXJlKCcuL3Byb3hpZnknKTtcblxuLyohXG4gKiBhZGRMZW5ndGhHdWFyZCB1dGlsXG4gKi9cblxuZXhwb3J0cy5hZGRMZW5ndGhHdWFyZCA9IHJlcXVpcmUoJy4vYWRkTGVuZ3RoR3VhcmQnKTtcblxuLyohXG4gKiBpc1Byb3h5RW5hYmxlZCBoZWxwZXJcbiAqL1xuXG5leHBvcnRzLmlzUHJveHlFbmFibGVkID0gcmVxdWlyZSgnLi9pc1Byb3h5RW5hYmxlZCcpO1xuXG4vKiFcbiAqIGlzTmFOIG1ldGhvZFxuICovXG5cbmV4cG9ydHMuaXNOYU4gPSByZXF1aXJlKCcuL2lzTmFOJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbi8qICFcbiAqIENoYWkgLSBwYXRodmFsIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2dpY2FscGFyYWRveC9maWx0clxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgLmhhc1Byb3BlcnR5KG9iamVjdCwgbmFtZSlcbiAqXG4gKiBUaGlzIGFsbG93cyBjaGVja2luZyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgb3duXG4gKiBvciBpbmhlcml0ZWQgZnJvbSBwcm90b3R5cGUgY2hhaW4gbmFtZWQgcHJvcGVydHkuXG4gKlxuICogQmFzaWNhbGx5IGRvZXMgdGhlIHNhbWUgdGhpbmcgYXMgdGhlIGBpbmBcbiAqIG9wZXJhdG9yIGJ1dCB3b3JrcyBwcm9wZXJseSB3aXRoIG51bGwvdW5kZWZpbmVkIHZhbHVlc1xuICogYW5kIG90aGVyIHByaW1pdGl2ZXMuXG4gKlxuICogICAgIHZhciBvYmogPSB7XG4gKiAgICAgICAgIGFycjogWydhJywgJ2InLCAnYyddXG4gKiAgICAgICAsIHN0cjogJ0hlbGxvJ1xuICogICAgIH1cbiAqXG4gKiBUaGUgZm9sbG93aW5nIHdvdWxkIGJlIHRoZSByZXN1bHRzLlxuICpcbiAqICAgICBoYXNQcm9wZXJ0eShvYmosICdzdHInKTsgIC8vIHRydWVcbiAqICAgICBoYXNQcm9wZXJ0eShvYmosICdjb25zdHJ1Y3RvcicpOyAgLy8gdHJ1ZVxuICogICAgIGhhc1Byb3BlcnR5KG9iaiwgJ2JhcicpOyAgLy8gZmFsc2VcbiAqXG4gKiAgICAgaGFzUHJvcGVydHkob2JqLnN0ciwgJ2xlbmd0aCcpOyAvLyB0cnVlXG4gKiAgICAgaGFzUHJvcGVydHkob2JqLnN0ciwgMSk7ICAvLyB0cnVlXG4gKiAgICAgaGFzUHJvcGVydHkob2JqLnN0ciwgNSk7ICAvLyBmYWxzZVxuICpcbiAqICAgICBoYXNQcm9wZXJ0eShvYmouYXJyLCAnbGVuZ3RoJyk7ICAvLyB0cnVlXG4gKiAgICAgaGFzUHJvcGVydHkob2JqLmFyciwgMik7ICAvLyB0cnVlXG4gKiAgICAgaGFzUHJvcGVydHkob2JqLmFyciwgMyk7ICAvLyBmYWxzZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfFN5bWJvbH0gbmFtZVxuICogQHJldHVybnMge0Jvb2xlYW59IHdoZXRoZXIgaXQgZXhpc3RzXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBoYXNQcm9wZXJ0eVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBoYXNQcm9wZXJ0eShvYmosIG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRoZSBgaW5gIG9wZXJhdG9yIGRvZXMgbm90IHdvcmsgd2l0aCBwcmltaXRpdmVzLlxuICByZXR1cm4gbmFtZSBpbiBPYmplY3Qob2JqKTtcbn1cblxuLyogIVxuICogIyMgcGFyc2VQYXRoKHBhdGgpXG4gKlxuICogSGVscGVyIGZ1bmN0aW9uIHVzZWQgdG8gcGFyc2Ugc3RyaW5nIG9iamVjdFxuICogcGF0aHMuIFVzZSBpbiBjb25qdW5jdGlvbiB3aXRoIGBpbnRlcm5hbEdldFBhdGhWYWx1ZWAuXG4gKlxuICogICAgICB2YXIgcGFyc2VkID0gcGFyc2VQYXRoKCdteW9iamVjdC5wcm9wZXJ0eS5zdWJwcm9wJyk7XG4gKlxuICogIyMjIFBhdGhzOlxuICpcbiAqICogQ2FuIGJlIGluZmluaXRlbHkgZGVlcCBhbmQgbmVzdGVkLlxuICogKiBBcnJheXMgYXJlIGFsc28gdmFsaWQgdXNpbmcgdGhlIGZvcm1hbCBgbXlvYmplY3QuZG9jdW1lbnRbM10ucHJvcGVydHlgLlxuICogKiBMaXRlcmFsIGRvdHMgYW5kIGJyYWNrZXRzIChub3QgZGVsaW1pdGVyKSBtdXN0IGJlIGJhY2tzbGFzaC1lc2NhcGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBwYXJzZWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoKSB7XG4gIHZhciBzdHIgPSBwYXRoLnJlcGxhY2UoLyhbXlxcXFxdKVxcWy9nLCAnJDEuWycpO1xuICB2YXIgcGFydHMgPSBzdHIubWF0Y2goLyhcXFxcXFwufFteLl0rPykrL2cpO1xuICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uIG1hcE1hdGNoZXModmFsdWUpIHtcbiAgICB2YXIgcmVnZXhwID0gL15cXFsoXFxkKylcXF0kLztcbiAgICB2YXIgbUFyciA9IHJlZ2V4cC5leGVjKHZhbHVlKTtcbiAgICB2YXIgcGFyc2VkID0gbnVsbDtcbiAgICBpZiAobUFycikge1xuICAgICAgcGFyc2VkID0geyBpOiBwYXJzZUZsb2F0KG1BcnJbMV0pIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlZCA9IHsgcDogdmFsdWUucmVwbGFjZSgvXFxcXChbLlxcW1xcXV0pL2csICckMScpIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfSk7XG59XG5cbi8qICFcbiAqICMjIGludGVybmFsR2V0UGF0aFZhbHVlKG9iaiwgcGFyc2VkWywgcGF0aERlcHRoXSlcbiAqXG4gKiBIZWxwZXIgY29tcGFuaW9uIGZ1bmN0aW9uIGZvciBgLnBhcnNlUGF0aGAgdGhhdCByZXR1cm5zXG4gKiB0aGUgdmFsdWUgbG9jYXRlZCBhdCB0aGUgcGFyc2VkIGFkZHJlc3MuXG4gKlxuICogICAgICB2YXIgdmFsdWUgPSBnZXRQYXRoVmFsdWUob2JqLCBwYXJzZWQpO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdG8gc2VhcmNoIGFnYWluc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJzZWQgZGVmaW5pdGlvbiBmcm9tIGBwYXJzZVBhdGhgLlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlcHRoIChuZXN0aW5nIGxldmVsKSBvZiB0aGUgcHJvcGVydHkgd2Ugd2FudCB0byByZXRyaWV2ZVxuICogQHJldHVybnMge09iamVjdHxVbmRlZmluZWR9IHZhbHVlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpbnRlcm5hbEdldFBhdGhWYWx1ZShvYmosIHBhcnNlZCwgcGF0aERlcHRoKSB7XG4gIHZhciB0ZW1wb3JhcnlWYWx1ZSA9IG9iajtcbiAgdmFyIHJlcyA9IG51bGw7XG4gIHBhdGhEZXB0aCA9ICh0eXBlb2YgcGF0aERlcHRoID09PSAndW5kZWZpbmVkJyA/IHBhcnNlZC5sZW5ndGggOiBwYXRoRGVwdGgpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aERlcHRoOyBpKyspIHtcbiAgICB2YXIgcGFydCA9IHBhcnNlZFtpXTtcbiAgICBpZiAodGVtcG9yYXJ5VmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgcGFydC5wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IHRlbXBvcmFyeVZhbHVlW3BhcnQuaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IHRlbXBvcmFyeVZhbHVlW3BhcnQucF07XG4gICAgICB9XG5cbiAgICAgIGlmIChpID09PSAocGF0aERlcHRoIC0gMSkpIHtcbiAgICAgICAgcmVzID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLyogIVxuICogIyMgaW50ZXJuYWxTZXRQYXRoVmFsdWUob2JqLCB2YWx1ZSwgcGFyc2VkKVxuICpcbiAqIENvbXBhbmlvbiBmdW5jdGlvbiBmb3IgYHBhcnNlUGF0aGAgdGhhdCBzZXRzXG4gKiB0aGUgdmFsdWUgbG9jYXRlZCBhdCBhIHBhcnNlZCBhZGRyZXNzLlxuICpcbiAqICBpbnRlcm5hbFNldFBhdGhWYWx1ZShvYmosICd2YWx1ZScsIHBhcnNlZCk7XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0byBzZWFyY2ggYW5kIGRlZmluZSBvblxuICogQHBhcmFtIHsqfSB2YWx1ZSB0byB1c2UgdXBvbiBzZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJzZWQgZGVmaW5pdGlvbiBmcm9tIGBwYXJzZVBhdGhgXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpbnRlcm5hbFNldFBhdGhWYWx1ZShvYmosIHZhbCwgcGFyc2VkKSB7XG4gIHZhciB0ZW1wT2JqID0gb2JqO1xuICB2YXIgcGF0aERlcHRoID0gcGFyc2VkLmxlbmd0aDtcbiAgdmFyIHBhcnQgPSBudWxsO1xuICAvLyBIZXJlIHdlIGl0ZXJhdGUgdGhyb3VnaCBldmVyeSBwYXJ0IG9mIHRoZSBwYXRoXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aERlcHRoOyBpKyspIHtcbiAgICB2YXIgcHJvcE5hbWUgPSBudWxsO1xuICAgIHZhciBwcm9wVmFsID0gbnVsbDtcbiAgICBwYXJ0ID0gcGFyc2VkW2ldO1xuXG4gICAgLy8gSWYgaXQncyB0aGUgbGFzdCBwYXJ0IG9mIHRoZSBwYXRoLCB3ZSBzZXQgdGhlICdwcm9wTmFtZScgdmFsdWUgd2l0aCB0aGUgcHJvcGVydHkgbmFtZVxuICAgIGlmIChpID09PSAocGF0aERlcHRoIC0gMSkpIHtcbiAgICAgIHByb3BOYW1lID0gdHlwZW9mIHBhcnQucCA9PT0gJ3VuZGVmaW5lZCcgPyBwYXJ0LmkgOiBwYXJ0LnA7XG4gICAgICAvLyBOb3cgd2Ugc2V0IHRoZSBwcm9wZXJ0eSB3aXRoIHRoZSBuYW1lIGhlbGQgYnkgJ3Byb3BOYW1lJyBvbiBvYmplY3Qgd2l0aCB0aGUgZGVzaXJlZCB2YWxcbiAgICAgIHRlbXBPYmpbcHJvcE5hbWVdID0gdmFsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcnQucCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGVtcE9ialtwYXJ0LnBdKSB7XG4gICAgICB0ZW1wT2JqID0gdGVtcE9ialtwYXJ0LnBdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcnQuaSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGVtcE9ialtwYXJ0LmldKSB7XG4gICAgICB0ZW1wT2JqID0gdGVtcE9ialtwYXJ0LmldO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB0aGUgb2JqIGRvZXNuJ3QgaGF2ZSB0aGUgcHJvcGVydHkgd2UgY3JlYXRlIG9uZSB3aXRoIHRoYXQgbmFtZSB0byBkZWZpbmUgaXRcbiAgICAgIHZhciBuZXh0ID0gcGFyc2VkW2kgKyAxXTtcbiAgICAgIC8vIEhlcmUgd2Ugc2V0IHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3aGljaCB3aWxsIGJlIGRlZmluZWRcbiAgICAgIHByb3BOYW1lID0gdHlwZW9mIHBhcnQucCA9PT0gJ3VuZGVmaW5lZCcgPyBwYXJ0LmkgOiBwYXJ0LnA7XG4gICAgICAvLyBIZXJlIHdlIGRlY2lkZSBpZiB0aGlzIHByb3BlcnR5IHdpbGwgYmUgYW4gYXJyYXkgb3IgYSBuZXcgb2JqZWN0XG4gICAgICBwcm9wVmFsID0gdHlwZW9mIG5leHQucCA9PT0gJ3VuZGVmaW5lZCcgPyBbXSA6IHt9O1xuICAgICAgdGVtcE9ialtwcm9wTmFtZV0gPSBwcm9wVmFsO1xuICAgICAgdGVtcE9iaiA9IHRlbXBPYmpbcHJvcE5hbWVdO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqICMjIyAuZ2V0UGF0aEluZm8ob2JqZWN0LCBwYXRoKVxuICpcbiAqIFRoaXMgYWxsb3dzIHRoZSByZXRyaWV2YWwgb2YgcHJvcGVydHkgaW5mbyBpbiBhblxuICogb2JqZWN0IGdpdmVuIGEgc3RyaW5nIHBhdGguXG4gKlxuICogVGhlIHBhdGggaW5mbyBjb25zaXN0cyBvZiBhbiBvYmplY3Qgd2l0aCB0aGVcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICogcGFyZW50IC0gVGhlIHBhcmVudCBvYmplY3Qgb2YgdGhlIHByb3BlcnR5IHJlZmVyZW5jZWQgYnkgYHBhdGhgXG4gKiAqIG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZmluYWwgcHJvcGVydHksIGEgbnVtYmVyIGlmIGl0IHdhcyBhbiBhcnJheSBpbmRleGVyXG4gKiAqIHZhbHVlIC0gVGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSwgaWYgaXQgZXhpc3RzLCBvdGhlcndpc2UgYHVuZGVmaW5lZGBcbiAqICogZXhpc3RzIC0gV2hldGhlciB0aGUgcHJvcGVydHkgZXhpc3RzIG9yIG5vdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBpbmZvXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBnZXRQYXRoSW5mb1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBnZXRQYXRoSW5mbyhvYmosIHBhdGgpIHtcbiAgdmFyIHBhcnNlZCA9IHBhcnNlUGF0aChwYXRoKTtcbiAgdmFyIGxhc3QgPSBwYXJzZWRbcGFyc2VkLmxlbmd0aCAtIDFdO1xuICB2YXIgaW5mbyA9IHtcbiAgICBwYXJlbnQ6IHBhcnNlZC5sZW5ndGggPiAxID8gaW50ZXJuYWxHZXRQYXRoVmFsdWUob2JqLCBwYXJzZWQsIHBhcnNlZC5sZW5ndGggLSAxKSA6IG9iaixcbiAgICBuYW1lOiBsYXN0LnAgfHwgbGFzdC5pLFxuICAgIHZhbHVlOiBpbnRlcm5hbEdldFBhdGhWYWx1ZShvYmosIHBhcnNlZCksXG4gIH07XG4gIGluZm8uZXhpc3RzID0gaGFzUHJvcGVydHkoaW5mby5wYXJlbnQsIGluZm8ubmFtZSk7XG5cbiAgcmV0dXJuIGluZm87XG59XG5cbi8qKlxuICogIyMjIC5nZXRQYXRoVmFsdWUob2JqZWN0LCBwYXRoKVxuICpcbiAqIFRoaXMgYWxsb3dzIHRoZSByZXRyaWV2YWwgb2YgdmFsdWVzIGluIGFuXG4gKiBvYmplY3QgZ2l2ZW4gYSBzdHJpbmcgcGF0aC5cbiAqXG4gKiAgICAgdmFyIG9iaiA9IHtcbiAqICAgICAgICAgcHJvcDE6IHtcbiAqICAgICAgICAgICAgIGFycjogWydhJywgJ2InLCAnYyddXG4gKiAgICAgICAgICAgLCBzdHI6ICdIZWxsbydcbiAqICAgICAgICAgfVxuICogICAgICAgLCBwcm9wMjoge1xuICogICAgICAgICAgICAgYXJyOiBbIHsgbmVzdGVkOiAnVW5pdmVyc2UnIH0gXVxuICogICAgICAgICAgICwgc3RyOiAnSGVsbG8gYWdhaW4hJ1xuICogICAgICAgICB9XG4gKiAgICAgfVxuICpcbiAqIFRoZSBmb2xsb3dpbmcgd291bGQgYmUgdGhlIHJlc3VsdHMuXG4gKlxuICogICAgIGdldFBhdGhWYWx1ZShvYmosICdwcm9wMS5zdHInKTsgLy8gSGVsbG9cbiAqICAgICBnZXRQYXRoVmFsdWUob2JqLCAncHJvcDEuYXR0WzJdJyk7IC8vIGJcbiAqICAgICBnZXRQYXRoVmFsdWUob2JqLCAncHJvcDIuYXJyWzBdLm5lc3RlZCcpOyAvLyBVbml2ZXJzZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcmV0dXJucyB7T2JqZWN0fSB2YWx1ZSBvciBgdW5kZWZpbmVkYFxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQG5hbWUgZ2V0UGF0aFZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGdldFBhdGhWYWx1ZShvYmosIHBhdGgpIHtcbiAgdmFyIGluZm8gPSBnZXRQYXRoSW5mbyhvYmosIHBhdGgpO1xuICByZXR1cm4gaW5mby52YWx1ZTtcbn1cblxuLyoqXG4gKiAjIyMgLnNldFBhdGhWYWx1ZShvYmplY3QsIHBhdGgsIHZhbHVlKVxuICpcbiAqIERlZmluZSB0aGUgdmFsdWUgaW4gYW4gb2JqZWN0IGF0IGEgZ2l2ZW4gc3RyaW5nIHBhdGguXG4gKlxuICogYGBganNcbiAqIHZhciBvYmogPSB7XG4gKiAgICAgcHJvcDE6IHtcbiAqICAgICAgICAgYXJyOiBbJ2EnLCAnYicsICdjJ11cbiAqICAgICAgICwgc3RyOiAnSGVsbG8nXG4gKiAgICAgfVxuICogICAsIHByb3AyOiB7XG4gKiAgICAgICAgIGFycjogWyB7IG5lc3RlZDogJ1VuaXZlcnNlJyB9IF1cbiAqICAgICAgICwgc3RyOiAnSGVsbG8gYWdhaW4hJ1xuICogICAgIH1cbiAqIH07XG4gKiBgYGBcbiAqXG4gKiBUaGUgZm9sbG93aW5nIHdvdWxkIGJlIGFjY2VwdGFibGUuXG4gKlxuICogYGBganNcbiAqIHZhciBwcm9wZXJ0aWVzID0gcmVxdWlyZSgndGVhLXByb3BlcnRpZXMnKTtcbiAqIHByb3BlcnRpZXMuc2V0KG9iaiwgJ3Byb3AxLnN0cicsICdIZWxsbyBVbml2ZXJzZSEnKTtcbiAqIHByb3BlcnRpZXMuc2V0KG9iaiwgJ3Byb3AxLmFyclsyXScsICdCJyk7XG4gKiBwcm9wZXJ0aWVzLnNldChvYmosICdwcm9wMi5hcnJbMF0ubmVzdGVkLnZhbHVlJywgeyBoZWxsbzogJ3VuaXZlcnNlJyB9KTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2V0UGF0aFZhbHVlKG9iaiwgcGF0aCwgdmFsKSB7XG4gIHZhciBwYXJzZWQgPSBwYXJzZVBhdGgocGF0aCk7XG4gIGludGVybmFsU2V0UGF0aFZhbHVlKG9iaiwgdmFsLCBwYXJzZWQpO1xuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGFzUHJvcGVydHk6IGhhc1Byb3BlcnR5LFxuICBnZXRQYXRoSW5mbzogZ2V0UGF0aEluZm8sXG4gIGdldFBhdGhWYWx1ZTogZ2V0UGF0aFZhbHVlLFxuICBzZXRQYXRoVmFsdWU6IHNldFBhdGhWYWx1ZSxcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wYXRodmFsL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiFcbiAqIENoYWkgLSB0ZXN0IHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiFcbiAqIE1vZHVsZSBkZXBlbmRhbmNpZXNcbiAqL1xuXG52YXIgZmxhZyA9IHJlcXVpcmUoJy4vZmxhZycpO1xuXG4vKipcbiAqICMjIyAudGVzdChvYmplY3QsIGV4cHJlc3Npb24pXG4gKlxuICogVGVzdCBhbmQgb2JqZWN0IGZvciBleHByZXNzaW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgKGNvbnN0cnVjdGVkIEFzc2VydGlvbilcbiAqIEBwYXJhbSB7QXJndW1lbnRzfSBjaGFpLkFzc2VydGlvbi5wcm90b3R5cGUuYXNzZXJ0IGFyZ3VtZW50c1xuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQG5hbWUgdGVzdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVzdChvYmosIGFyZ3MpIHtcbiAgdmFyIG5lZ2F0ZSA9IGZsYWcob2JqLCAnbmVnYXRlJylcbiAgICAsIGV4cHIgPSBhcmdzWzBdO1xuICByZXR1cm4gbmVnYXRlID8gIWV4cHIgOiBleHByO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvdGVzdC5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiFcbiAqIENoYWkgLSBleHBlY3RUeXBlcyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgLmV4cGVjdFR5cGVzKG9iaiwgdHlwZXMpXG4gKlxuICogRW5zdXJlcyB0aGF0IHRoZSBvYmplY3QgYmVpbmcgdGVzdGVkIGFnYWluc3QgaXMgb2YgYSB2YWxpZCB0eXBlLlxuICpcbiAqICAgICB1dGlscy5leHBlY3RUeXBlcyh0aGlzLCBbJ2FycmF5JywgJ29iamVjdCcsICdzdHJpbmcnXSk7XG4gKlxuICogQHBhcmFtIHtNaXhlZH0gb2JqIGNvbnN0cnVjdGVkIEFzc2VydGlvblxuICogQHBhcmFtIHtBcnJheX0gdHlwZSBBIGxpc3Qgb2YgYWxsb3dlZCB0eXBlcyBmb3IgdGhpcyBhc3NlcnRpb25cbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGV4cGVjdFR5cGVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnZhciBBc3NlcnRpb25FcnJvciA9IHJlcXVpcmUoJ2Fzc2VydGlvbi1lcnJvcicpO1xudmFyIGZsYWcgPSByZXF1aXJlKCcuL2ZsYWcnKTtcbnZhciB0eXBlID0gcmVxdWlyZSgndHlwZS1kZXRlY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHBlY3RUeXBlcyhvYmosIHR5cGVzKSB7XG4gIHZhciBmbGFnTXNnID0gZmxhZyhvYmosICdtZXNzYWdlJyk7XG4gIHZhciBzc2ZpID0gZmxhZyhvYmosICdzc2ZpJyk7XG5cbiAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgJzogJyA6ICcnO1xuXG4gIG9iaiA9IGZsYWcob2JqLCAnb2JqZWN0Jyk7XG4gIHR5cGVzID0gdHlwZXMubWFwKGZ1bmN0aW9uICh0KSB7IHJldHVybiB0LnRvTG93ZXJDYXNlKCk7IH0pO1xuICB0eXBlcy5zb3J0KCk7XG5cbiAgLy8gVHJhbnNmb3JtcyBbJ2xvcmVtJywgJ2lwc3VtJ10gaW50byAnYSBsb3JlbSwgb3IgYW4gaXBzdW0nXG4gIHZhciBzdHIgPSB0eXBlcy5tYXAoZnVuY3Rpb24gKHQsIGluZGV4KSB7XG4gICAgdmFyIGFydCA9IH5bICdhJywgJ2UnLCAnaScsICdvJywgJ3UnIF0uaW5kZXhPZih0LmNoYXJBdCgwKSkgPyAnYW4nIDogJ2EnO1xuICAgIHZhciBvciA9IHR5cGVzLmxlbmd0aCA+IDEgJiYgaW5kZXggPT09IHR5cGVzLmxlbmd0aCAtIDEgPyAnb3IgJyA6ICcnO1xuICAgIHJldHVybiBvciArIGFydCArICcgJyArIHQ7XG4gIH0pLmpvaW4oJywgJyk7XG5cbiAgdmFyIG9ialR5cGUgPSB0eXBlKG9iaikudG9Mb3dlckNhc2UoKTtcblxuICBpZiAoIXR5cGVzLnNvbWUoZnVuY3Rpb24gKGV4cGVjdGVkKSB7IHJldHVybiBvYmpUeXBlID09PSBleHBlY3RlZDsgfSkpIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICBmbGFnTXNnICsgJ29iamVjdCB0ZXN0ZWQgbXVzdCBiZSAnICsgc3RyICsgJywgYnV0ICcgKyBvYmpUeXBlICsgJyBnaXZlbicsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICBzc2ZpXG4gICAgKTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZXhwZWN0VHlwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIVxuICogQ2hhaSAtIG1lc3NhZ2UgY29tcG9zaXRpb24gdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogTW9kdWxlIGRlcGVuZGFuY2llc1xuICovXG5cbnZhciBmbGFnID0gcmVxdWlyZSgnLi9mbGFnJylcbiAgLCBnZXRBY3R1YWwgPSByZXF1aXJlKCcuL2dldEFjdHVhbCcpXG4gICwgaW5zcGVjdCA9IHJlcXVpcmUoJy4vaW5zcGVjdCcpXG4gICwgb2JqRGlzcGxheSA9IHJlcXVpcmUoJy4vb2JqRGlzcGxheScpO1xuXG4vKipcbiAqICMjIyAuZ2V0TWVzc2FnZShvYmplY3QsIG1lc3NhZ2UsIG5lZ2F0ZU1lc3NhZ2UpXG4gKlxuICogQ29uc3RydWN0IHRoZSBlcnJvciBtZXNzYWdlIGJhc2VkIG9uIGZsYWdzXG4gKiBhbmQgdGVtcGxhdGUgdGFncy4gVGVtcGxhdGUgdGFncyB3aWxsIHJldHVyblxuICogYSBzdHJpbmdpZmllZCBpbnNwZWN0aW9uIG9mIHRoZSBvYmplY3QgcmVmZXJlbmNlZC5cbiAqXG4gKiBNZXNzYWdlIHRlbXBsYXRlIHRhZ3M6XG4gKiAtIGAje3RoaXN9YCBjdXJyZW50IGFzc2VydGVkIG9iamVjdFxuICogLSBgI3thY3R9YCBhY3R1YWwgdmFsdWVcbiAqIC0gYCN7ZXhwfWAgZXhwZWN0ZWQgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IChjb25zdHJ1Y3RlZCBBc3NlcnRpb24pXG4gKiBAcGFyYW0ge0FyZ3VtZW50c30gY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLmFzc2VydCBhcmd1bWVudHNcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGdldE1lc3NhZ2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRNZXNzYWdlKG9iaiwgYXJncykge1xuICB2YXIgbmVnYXRlID0gZmxhZyhvYmosICduZWdhdGUnKVxuICAgICwgdmFsID0gZmxhZyhvYmosICdvYmplY3QnKVxuICAgICwgZXhwZWN0ZWQgPSBhcmdzWzNdXG4gICAgLCBhY3R1YWwgPSBnZXRBY3R1YWwob2JqLCBhcmdzKVxuICAgICwgbXNnID0gbmVnYXRlID8gYXJnc1syXSA6IGFyZ3NbMV1cbiAgICAsIGZsYWdNc2cgPSBmbGFnKG9iaiwgJ21lc3NhZ2UnKTtcblxuICBpZih0eXBlb2YgbXNnID09PSBcImZ1bmN0aW9uXCIpIG1zZyA9IG1zZygpO1xuICBtc2cgPSBtc2cgfHwgJyc7XG4gIG1zZyA9IG1zZ1xuICAgIC5yZXBsYWNlKC8jXFx7dGhpc1xcfS9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBvYmpEaXNwbGF5KHZhbCk7IH0pXG4gICAgLnJlcGxhY2UoLyNcXHthY3RcXH0vZywgZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JqRGlzcGxheShhY3R1YWwpOyB9KVxuICAgIC5yZXBsYWNlKC8jXFx7ZXhwXFx9L2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9iakRpc3BsYXkoZXhwZWN0ZWQpOyB9KTtcblxuICByZXR1cm4gZmxhZ01zZyA/IGZsYWdNc2cgKyAnOiAnICsgbXNnIDogbXNnO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0TWVzc2FnZS5qc1xuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyohXG4gKiBDaGFpIC0gZ2V0RW51bWVyYWJsZVByb3BlcnRpZXMgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIC5nZXRFbnVtZXJhYmxlUHJvcGVydGllcyhvYmplY3QpXG4gKlxuICogVGhpcyBhbGxvd3MgdGhlIHJldHJpZXZhbCBvZiBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGFuIG9iamVjdCxcbiAqIGluaGVyaXRlZCBvciBub3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICogQHJldHVybnMge0FycmF5fVxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQG5hbWUgZ2V0RW51bWVyYWJsZVByb3BlcnRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRFbnVtZXJhYmxlUHJvcGVydGllcyhvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuICAgIHJlc3VsdC5wdXNoKG5hbWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRFbnVtZXJhYmxlUHJvcGVydGllcy5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFscyBTeW1ib2w6IGZhbHNlLCBVaW50OEFycmF5OiBmYWxzZSwgV2Vha01hcDogZmFsc2UgKi9cbi8qIVxuICogZGVlcC1lcWxcbiAqIENvcHlyaWdodChjKSAyMDEzIEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxudmFyIHR5cGUgPSByZXF1aXJlKCd0eXBlLWRldGVjdCcpO1xuZnVuY3Rpb24gRmFrZU1hcCgpIHtcbiAgdGhpcy5fa2V5ID0gJ2NoYWkvZGVlcC1lcWxfXycgKyBNYXRoLnJhbmRvbSgpICsgRGF0ZS5ub3coKTtcbn1cblxuRmFrZU1hcC5wcm90b3R5cGUgPSB7XG4gIGdldDogZnVuY3Rpb24gZ2V0TWFwKGtleSkge1xuICAgIHJldHVybiBrZXlbdGhpcy5fa2V5XTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiBzZXRNYXAoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChPYmplY3QuaXNFeHRlbnNpYmxlKGtleSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShrZXksIHRoaXMuX2tleSwge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbn07XG5cbnZhciBNZW1vaXplTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgPyBXZWFrTWFwIDogRmFrZU1hcDtcbi8qIVxuICogQ2hlY2sgdG8gc2VlIGlmIHRoZSBNZW1vaXplTWFwIGhhcyByZWNvcmRlZCBhIHJlc3VsdCBvZiB0aGUgdHdvIG9wZXJhbmRzXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gbGVmdEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge01peGVkfSByaWdodEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge01lbW9pemVNYXB9IG1lbW9pemVNYXBcbiAqIEByZXR1cm5zIHtCb29sZWFufG51bGx9IHJlc3VsdFxuKi9cbmZ1bmN0aW9uIG1lbW9pemVDb21wYXJlKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgbWVtb2l6ZU1hcCkge1xuICAvLyBUZWNobmljYWxseSwgV2Vha01hcCBrZXlzIGNhbiAqb25seSogYmUgb2JqZWN0cywgbm90IHByaW1pdGl2ZXMuXG4gIGlmICghbWVtb2l6ZU1hcCB8fCBpc1ByaW1pdGl2ZShsZWZ0SGFuZE9wZXJhbmQpIHx8IGlzUHJpbWl0aXZlKHJpZ2h0SGFuZE9wZXJhbmQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIGxlZnRIYW5kTWFwID0gbWVtb2l6ZU1hcC5nZXQobGVmdEhhbmRPcGVyYW5kKTtcbiAgaWYgKGxlZnRIYW5kTWFwKSB7XG4gICAgdmFyIHJlc3VsdCA9IGxlZnRIYW5kTWFwLmdldChyaWdodEhhbmRPcGVyYW5kKTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyohXG4gKiBTZXQgdGhlIHJlc3VsdCBvZiB0aGUgZXF1YWxpdHkgaW50byB0aGUgTWVtb2l6ZU1hcFxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGxlZnRIYW5kT3BlcmFuZFxuICogQHBhcmFtIHtNaXhlZH0gcmlnaHRIYW5kT3BlcmFuZFxuICogQHBhcmFtIHtNZW1vaXplTWFwfSBtZW1vaXplTWFwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHJlc3VsdFxuKi9cbmZ1bmN0aW9uIG1lbW9pemVTZXQobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBtZW1vaXplTWFwLCByZXN1bHQpIHtcbiAgLy8gVGVjaG5pY2FsbHksIFdlYWtNYXAga2V5cyBjYW4gKm9ubHkqIGJlIG9iamVjdHMsIG5vdCBwcmltaXRpdmVzLlxuICBpZiAoIW1lbW9pemVNYXAgfHwgaXNQcmltaXRpdmUobGVmdEhhbmRPcGVyYW5kKSB8fCBpc1ByaW1pdGl2ZShyaWdodEhhbmRPcGVyYW5kKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVmdEhhbmRNYXAgPSBtZW1vaXplTWFwLmdldChsZWZ0SGFuZE9wZXJhbmQpO1xuICBpZiAobGVmdEhhbmRNYXApIHtcbiAgICBsZWZ0SGFuZE1hcC5zZXQocmlnaHRIYW5kT3BlcmFuZCwgcmVzdWx0KTtcbiAgfSBlbHNlIHtcbiAgICBsZWZ0SGFuZE1hcCA9IG5ldyBNZW1vaXplTWFwKCk7XG4gICAgbGVmdEhhbmRNYXAuc2V0KHJpZ2h0SGFuZE9wZXJhbmQsIHJlc3VsdCk7XG4gICAgbWVtb2l6ZU1hcC5zZXQobGVmdEhhbmRPcGVyYW5kLCBsZWZ0SGFuZE1hcCk7XG4gIH1cbn1cblxuLyohXG4gKiBQcmltYXJ5IEV4cG9ydFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZGVlcEVxdWFsO1xubW9kdWxlLmV4cG9ydHMuTWVtb2l6ZU1hcCA9IE1lbW9pemVNYXA7XG5cbi8qKlxuICogQXNzZXJ0IGRlZXBseSBuZXN0ZWQgc2FtZVZhbHVlIGVxdWFsaXR5IGJldHdlZW4gdHdvIG9iamVjdHMgb2YgYW55IHR5cGUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gbGVmdEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge01peGVkfSByaWdodEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIChvcHRpb25hbCkgQWRkaXRpb25hbCBvcHRpb25zXG4gKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5jb21wYXJhdG9yXSAob3B0aW9uYWwpIE92ZXJyaWRlIGRlZmF1bHQgYWxnb3JpdGhtLCBkZXRlcm1pbmluZyBjdXN0b20gZXF1YWxpdHkuXG4gKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5tZW1vaXplXSAob3B0aW9uYWwpIFByb3ZpZGUgYSBjdXN0b20gbWVtb2l6YXRpb24gb2JqZWN0IHdoaWNoIHdpbGwgY2FjaGUgdGhlIHJlc3VsdHMgb2ZcbiAgICBjb21wbGV4IG9iamVjdHMgZm9yIGEgc3BlZWQgYm9vc3QuIEJ5IHBhc3NpbmcgYGZhbHNlYCB5b3UgY2FuIGRpc2FibGUgbWVtb2l6YXRpb24sIGJ1dCB0aGlzIHdpbGwgY2F1c2UgY2lyY3VsYXJcbiAgICByZWZlcmVuY2VzIHRvIGJsb3cgdGhlIHN0YWNrLlxuICogQHJldHVybiB7Qm9vbGVhbn0gZXF1YWwgbWF0Y2hcbiAqL1xuZnVuY3Rpb24gZGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucykge1xuICAvLyBJZiB3ZSBoYXZlIGEgY29tcGFyYXRvciwgd2UgY2FuJ3QgYXNzdW1lIGFueXRoaW5nOyBzbyBiYWlsIHRvIGl0cyBjaGVjayBmaXJzdC5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5jb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIGV4dGVuc2l2ZURlZXBFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpO1xuICB9XG5cbiAgdmFyIHNpbXBsZVJlc3VsdCA9IHNpbXBsZUVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCk7XG4gIGlmIChzaW1wbGVSZXN1bHQgIT09IG51bGwpIHtcbiAgICByZXR1cm4gc2ltcGxlUmVzdWx0O1xuICB9XG5cbiAgLy8gRGVlcGVyIGNvbXBhcmlzb25zIGFyZSBwdXNoZWQgdGhyb3VnaCB0byBhIGxhcmdlciBmdW5jdGlvblxuICByZXR1cm4gZXh0ZW5zaXZlRGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogTWFueSBjb21wYXJpc29ucyBjYW4gYmUgY2FuY2VsZWQgb3V0IGVhcmx5IHZpYSBzaW1wbGUgZXF1YWxpdHkgb3IgcHJpbWl0aXZlIGNoZWNrcy5cbiAqIEBwYXJhbSB7TWl4ZWR9IGxlZnRIYW5kT3BlcmFuZFxuICogQHBhcmFtIHtNaXhlZH0gcmlnaHRIYW5kT3BlcmFuZFxuICogQHJldHVybiB7Qm9vbGVhbnxudWxsfSBlcXVhbCBtYXRjaFxuICovXG5mdW5jdGlvbiBzaW1wbGVFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQpIHtcbiAgLy8gRXF1YWwgcmVmZXJlbmNlcyAoZXhjZXB0IGZvciBOdW1iZXJzKSBjYW4gYmUgcmV0dXJuZWQgZWFybHlcbiAgaWYgKGxlZnRIYW5kT3BlcmFuZCA9PT0gcmlnaHRIYW5kT3BlcmFuZCkge1xuICAgIC8vIEhhbmRsZSArLTAgY2FzZXNcbiAgICByZXR1cm4gbGVmdEhhbmRPcGVyYW5kICE9PSAwIHx8IDEgLyBsZWZ0SGFuZE9wZXJhbmQgPT09IDEgLyByaWdodEhhbmRPcGVyYW5kO1xuICB9XG5cbiAgLy8gaGFuZGxlIE5hTiBjYXNlc1xuICBpZiAoXG4gICAgbGVmdEhhbmRPcGVyYW5kICE9PSBsZWZ0SGFuZE9wZXJhbmQgJiYgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICByaWdodEhhbmRPcGVyYW5kICE9PSByaWdodEhhbmRPcGVyYW5kIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gQW55dGhpbmcgdGhhdCBpcyBub3QgYW4gJ29iamVjdCcsIGkuZS4gc3ltYm9scywgZnVuY3Rpb25zLCBib29sZWFucywgbnVtYmVycyxcbiAgLy8gc3RyaW5ncywgYW5kIHVuZGVmaW5lZCwgY2FuIGJlIGNvbXBhcmVkIGJ5IHJlZmVyZW5jZS5cbiAgaWYgKGlzUHJpbWl0aXZlKGxlZnRIYW5kT3BlcmFuZCkgfHwgaXNQcmltaXRpdmUocmlnaHRIYW5kT3BlcmFuZCkpIHtcbiAgICAvLyBFYXN5IG91dCBiL2MgaXQgd291bGQgaGF2ZSBwYXNzZWQgdGhlIGZpcnN0IGVxdWFsaXR5IGNoZWNrXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKiFcbiAqIFRoZSBtYWluIGxvZ2ljIG9mIHRoZSBgZGVlcEVxdWFsYCBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBsZWZ0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7TWl4ZWR9IHJpZ2h0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKG9wdGlvbmFsKSBBZGRpdGlvbmFsIG9wdGlvbnNcbiAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLmNvbXBhcmF0b3JdIChvcHRpb25hbCkgT3ZlcnJpZGUgZGVmYXVsdCBhbGdvcml0aG0sIGRldGVybWluaW5nIGN1c3RvbSBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLm1lbW9pemVdIChvcHRpb25hbCkgUHJvdmlkZSBhIGN1c3RvbSBtZW1vaXphdGlvbiBvYmplY3Qgd2hpY2ggd2lsbCBjYWNoZSB0aGUgcmVzdWx0cyBvZlxuICAgIGNvbXBsZXggb2JqZWN0cyBmb3IgYSBzcGVlZCBib29zdC4gQnkgcGFzc2luZyBgZmFsc2VgIHlvdSBjYW4gZGlzYWJsZSBtZW1vaXphdGlvbiwgYnV0IHRoaXMgd2lsbCBjYXVzZSBjaXJjdWxhclxuICAgIHJlZmVyZW5jZXMgdG8gYmxvdyB0aGUgc3RhY2suXG4gKiBAcmV0dXJuIHtCb29sZWFufSBlcXVhbCBtYXRjaFxuKi9cbmZ1bmN0aW9uIGV4dGVuc2l2ZURlZXBFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMubWVtb2l6ZSA9IG9wdGlvbnMubWVtb2l6ZSA9PT0gZmFsc2UgPyBmYWxzZSA6IG9wdGlvbnMubWVtb2l6ZSB8fCBuZXcgTWVtb2l6ZU1hcCgpO1xuICB2YXIgY29tcGFyYXRvciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5jb21wYXJhdG9yO1xuXG4gIC8vIENoZWNrIGlmIGEgbWVtb2l6ZWQgcmVzdWx0IGV4aXN0cy5cbiAgdmFyIG1lbW9pemVSZXN1bHRMZWZ0ID0gbWVtb2l6ZUNvbXBhcmUobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zLm1lbW9pemUpO1xuICBpZiAobWVtb2l6ZVJlc3VsdExlZnQgIT09IG51bGwpIHtcbiAgICByZXR1cm4gbWVtb2l6ZVJlc3VsdExlZnQ7XG4gIH1cbiAgdmFyIG1lbW9pemVSZXN1bHRSaWdodCA9IG1lbW9pemVDb21wYXJlKHJpZ2h0SGFuZE9wZXJhbmQsIGxlZnRIYW5kT3BlcmFuZCwgb3B0aW9ucy5tZW1vaXplKTtcbiAgaWYgKG1lbW9pemVSZXN1bHRSaWdodCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBtZW1vaXplUmVzdWx0UmlnaHQ7XG4gIH1cblxuICAvLyBJZiBhIGNvbXBhcmF0b3IgaXMgcHJlc2VudCwgdXNlIGl0LlxuICBpZiAoY29tcGFyYXRvcikge1xuICAgIHZhciBjb21wYXJhdG9yUmVzdWx0ID0gY29tcGFyYXRvcihsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQpO1xuICAgIC8vIENvbXBhcmF0b3JzIG1heSByZXR1cm4gbnVsbCwgaW4gd2hpY2ggY2FzZSB3ZSB3YW50IHRvIGdvIGJhY2sgdG8gZGVmYXVsdCBiZWhhdmlvci5cbiAgICBpZiAoY29tcGFyYXRvclJlc3VsdCA9PT0gZmFsc2UgfHwgY29tcGFyYXRvclJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgbWVtb2l6ZVNldChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMubWVtb2l6ZSwgY29tcGFyYXRvclJlc3VsdCk7XG4gICAgICByZXR1cm4gY29tcGFyYXRvclJlc3VsdDtcbiAgICB9XG4gICAgLy8gVG8gYWxsb3cgY29tcGFyYXRvcnMgdG8gb3ZlcnJpZGUgKmFueSogYmVoYXZpb3IsIHdlIHJhbiB0aGVtIGZpcnN0LiBTaW5jZSBpdCBkaWRuJ3QgZGVjaWRlXG4gICAgLy8gd2hhdCB0byBkbywgd2UgbmVlZCB0byBtYWtlIHN1cmUgdG8gcmV0dXJuIHRoZSBiYXNpYyB0ZXN0cyBmaXJzdCBiZWZvcmUgd2UgbW92ZSBvbi5cbiAgICB2YXIgc2ltcGxlUmVzdWx0ID0gc2ltcGxlRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kKTtcbiAgICBpZiAoc2ltcGxlUmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICAvLyBEb24ndCBtZW1vaXplIHRoaXMsIGl0IHRha2VzIGxvbmdlciB0byBzZXQvcmV0cmlldmUgdGhhbiB0byBqdXN0IGNvbXBhcmUuXG4gICAgICByZXR1cm4gc2ltcGxlUmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIHZhciBsZWZ0SGFuZFR5cGUgPSB0eXBlKGxlZnRIYW5kT3BlcmFuZCk7XG4gIGlmIChsZWZ0SGFuZFR5cGUgIT09IHR5cGUocmlnaHRIYW5kT3BlcmFuZCkpIHtcbiAgICBtZW1vaXplU2V0KGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucy5tZW1vaXplLCBmYWxzZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVGVtcG9yYXJpbHkgc2V0IHRoZSBvcGVyYW5kcyBpbiB0aGUgbWVtb2l6ZSBvYmplY3QgdG8gcHJldmVudCBibG93aW5nIHRoZSBzdGFja1xuICBtZW1vaXplU2V0KGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucy5tZW1vaXplLCB0cnVlKTtcblxuICB2YXIgcmVzdWx0ID0gZXh0ZW5zaXZlRGVlcEVxdWFsQnlUeXBlKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgbGVmdEhhbmRUeXBlLCBvcHRpb25zKTtcbiAgbWVtb2l6ZVNldChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMubWVtb2l6ZSwgcmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZXh0ZW5zaXZlRGVlcEVxdWFsQnlUeXBlKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgbGVmdEhhbmRUeXBlLCBvcHRpb25zKSB7XG4gIHN3aXRjaCAobGVmdEhhbmRUeXBlKSB7XG4gICAgY2FzZSAnU3RyaW5nJzpcbiAgICBjYXNlICdOdW1iZXInOlxuICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgLy8gSWYgdGhlc2UgdHlwZXMgYXJlIHRoZWlyIGluc3RhbmNlIHR5cGVzIChlLmcuIGBuZXcgTnVtYmVyYCkgdGhlbiByZS1kZWVwRXF1YWwgYWdhaW5zdCB0aGVpciB2YWx1ZXNcbiAgICAgIHJldHVybiBkZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kLnZhbHVlT2YoKSwgcmlnaHRIYW5kT3BlcmFuZC52YWx1ZU9mKCkpO1xuICAgIGNhc2UgJ1Byb21pc2UnOlxuICAgIGNhc2UgJ1N5bWJvbCc6XG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgIGNhc2UgJ1dlYWtNYXAnOlxuICAgIGNhc2UgJ1dlYWtTZXQnOlxuICAgIGNhc2UgJ0Vycm9yJzpcbiAgICAgIHJldHVybiBsZWZ0SGFuZE9wZXJhbmQgPT09IHJpZ2h0SGFuZE9wZXJhbmQ7XG4gICAgY2FzZSAnQXJndW1lbnRzJzpcbiAgICBjYXNlICdJbnQ4QXJyYXknOlxuICAgIGNhc2UgJ1VpbnQ4QXJyYXknOlxuICAgIGNhc2UgJ1VpbnQ4Q2xhbXBlZEFycmF5JzpcbiAgICBjYXNlICdJbnQxNkFycmF5JzpcbiAgICBjYXNlICdVaW50MTZBcnJheSc6XG4gICAgY2FzZSAnSW50MzJBcnJheSc6XG4gICAgY2FzZSAnVWludDMyQXJyYXknOlxuICAgIGNhc2UgJ0Zsb2F0MzJBcnJheSc6XG4gICAgY2FzZSAnRmxvYXQ2NEFycmF5JzpcbiAgICBjYXNlICdBcnJheSc6XG4gICAgICByZXR1cm4gaXRlcmFibGVFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpO1xuICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICByZXR1cm4gcmVnZXhwRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kKTtcbiAgICBjYXNlICdHZW5lcmF0b3InOlxuICAgICAgcmV0dXJuIGdlbmVyYXRvckVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG4gICAgY2FzZSAnRGF0YVZpZXcnOlxuICAgICAgcmV0dXJuIGl0ZXJhYmxlRXF1YWwobmV3IFVpbnQ4QXJyYXkobGVmdEhhbmRPcGVyYW5kLmJ1ZmZlciksIG5ldyBVaW50OEFycmF5KHJpZ2h0SGFuZE9wZXJhbmQuYnVmZmVyKSwgb3B0aW9ucyk7XG4gICAgY2FzZSAnQXJyYXlCdWZmZXInOlxuICAgICAgcmV0dXJuIGl0ZXJhYmxlRXF1YWwobmV3IFVpbnQ4QXJyYXkobGVmdEhhbmRPcGVyYW5kKSwgbmV3IFVpbnQ4QXJyYXkocmlnaHRIYW5kT3BlcmFuZCksIG9wdGlvbnMpO1xuICAgIGNhc2UgJ1NldCc6XG4gICAgICByZXR1cm4gZW50cmllc0VxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG4gICAgY2FzZSAnTWFwJzpcbiAgICAgIHJldHVybiBlbnRyaWVzRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG9iamVjdEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuLyohXG4gKiBDb21wYXJlIHR3byBSZWd1bGFyIEV4cHJlc3Npb25zIGZvciBlcXVhbGl0eS5cbiAqXG4gKiBAcGFyYW0ge1JlZ0V4cH0gbGVmdEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge1JlZ0V4cH0gcmlnaHRIYW5kT3BlcmFuZFxuICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gKi9cblxuZnVuY3Rpb24gcmVnZXhwRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kKSB7XG4gIHJldHVybiBsZWZ0SGFuZE9wZXJhbmQudG9TdHJpbmcoKSA9PT0gcmlnaHRIYW5kT3BlcmFuZC50b1N0cmluZygpO1xufVxuXG4vKiFcbiAqIENvbXBhcmUgdHdvIFNldHMvTWFwcyBmb3IgZXF1YWxpdHkuIEZhc3RlciB0aGFuIG90aGVyIGVxdWFsaXR5IGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge1NldH0gbGVmdEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge1NldH0gcmlnaHRIYW5kT3BlcmFuZFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAoT3B0aW9uYWwpXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqL1xuXG5mdW5jdGlvbiBlbnRyaWVzRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKSB7XG4gIC8vIElFMTEgZG9lc24ndCBzdXBwb3J0IFNldCNlbnRyaWVzIG9yIFNldCNAQGl0ZXJhdG9yLCBzbyB3ZSBuZWVkIG1hbnVhbGx5IHBvcHVsYXRlIHVzaW5nIFNldCNmb3JFYWNoXG4gIGlmIChsZWZ0SGFuZE9wZXJhbmQuc2l6ZSAhPT0gcmlnaHRIYW5kT3BlcmFuZC5zaXplKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChsZWZ0SGFuZE9wZXJhbmQuc2l6ZSA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBsZWZ0SGFuZEl0ZW1zID0gW107XG4gIHZhciByaWdodEhhbmRJdGVtcyA9IFtdO1xuICBsZWZ0SGFuZE9wZXJhbmQuZm9yRWFjaChmdW5jdGlvbiBnYXRoZXJFbnRyaWVzKGtleSwgdmFsdWUpIHtcbiAgICBsZWZ0SGFuZEl0ZW1zLnB1c2goWyBrZXksIHZhbHVlIF0pO1xuICB9KTtcbiAgcmlnaHRIYW5kT3BlcmFuZC5mb3JFYWNoKGZ1bmN0aW9uIGdhdGhlckVudHJpZXMoa2V5LCB2YWx1ZSkge1xuICAgIHJpZ2h0SGFuZEl0ZW1zLnB1c2goWyBrZXksIHZhbHVlIF0pO1xuICB9KTtcbiAgcmV0dXJuIGl0ZXJhYmxlRXF1YWwobGVmdEhhbmRJdGVtcy5zb3J0KCksIHJpZ2h0SGFuZEl0ZW1zLnNvcnQoKSwgb3B0aW9ucyk7XG59XG5cbi8qIVxuICogU2ltcGxlIGVxdWFsaXR5IGZvciBmbGF0IGl0ZXJhYmxlIG9iamVjdHMgc3VjaCBhcyBBcnJheXMsIFR5cGVkQXJyYXlzIG9yIE5vZGUuanMgYnVmZmVycy5cbiAqXG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSBsZWZ0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7SXRlcmFibGV9IHJpZ2h0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKE9wdGlvbmFsKVxuICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gKi9cblxuZnVuY3Rpb24gaXRlcmFibGVFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpIHtcbiAgdmFyIGxlbmd0aCA9IGxlZnRIYW5kT3BlcmFuZC5sZW5ndGg7XG4gIGlmIChsZW5ndGggIT09IHJpZ2h0SGFuZE9wZXJhbmQubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChsZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoZGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZFtpbmRleF0sIHJpZ2h0SGFuZE9wZXJhbmRbaW5kZXhdLCBvcHRpb25zKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qIVxuICogU2ltcGxlIGVxdWFsaXR5IGZvciBnZW5lcmF0b3Igb2JqZWN0cyBzdWNoIGFzIHRob3NlIHJldHVybmVkIGJ5IGdlbmVyYXRvciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtJdGVyYWJsZX0gbGVmdEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSByaWdodEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIChPcHRpb25hbClcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICovXG5cbmZ1bmN0aW9uIGdlbmVyYXRvckVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucykge1xuICByZXR1cm4gaXRlcmFibGVFcXVhbChnZXRHZW5lcmF0b3JFbnRyaWVzKGxlZnRIYW5kT3BlcmFuZCksIGdldEdlbmVyYXRvckVudHJpZXMocmlnaHRIYW5kT3BlcmFuZCksIG9wdGlvbnMpO1xufVxuXG4vKiFcbiAqIERldGVybWluZSBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGhhcyBhbiBAQGl0ZXJhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgb2JqZWN0IGhhcyBhbiBAQGl0ZXJhdG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBoYXNJdGVyYXRvckZ1bmN0aW9uKHRhcmdldCkge1xuICByZXR1cm4gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIHRhcmdldFtTeW1ib2wuaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKiFcbiAqIEdldHMgYWxsIGl0ZXJhdG9yIGVudHJpZXMgZnJvbSB0aGUgZ2l2ZW4gT2JqZWN0LiBJZiB0aGUgT2JqZWN0IGhhcyBubyBAQGl0ZXJhdG9yIGZ1bmN0aW9uLCByZXR1cm5zIGFuIGVtcHR5IGFycmF5LlxuICogVGhpcyB3aWxsIGNvbnN1bWUgdGhlIGl0ZXJhdG9yIC0gd2hpY2ggY291bGQgaGF2ZSBzaWRlIGVmZmVjdHMgZGVwZW5kaW5nIG9uIHRoZSBAQGl0ZXJhdG9yIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEByZXR1cm5zIHtBcnJheX0gYW4gYXJyYXkgb2YgZW50cmllcyBmcm9tIHRoZSBAQGl0ZXJhdG9yIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRW50cmllcyh0YXJnZXQpIHtcbiAgaWYgKGhhc0l0ZXJhdG9yRnVuY3Rpb24odGFyZ2V0KSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZ2V0R2VuZXJhdG9yRW50cmllcyh0YXJnZXRbU3ltYm9sLml0ZXJhdG9yXSgpKTtcbiAgICB9IGNhdGNoIChpdGVyYXRvckVycm9yKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG4gIHJldHVybiBbXTtcbn1cblxuLyohXG4gKiBHZXRzIGFsbCBlbnRyaWVzIGZyb20gYSBHZW5lcmF0b3IuIFRoaXMgd2lsbCBjb25zdW1lIHRoZSBnZW5lcmF0b3IgLSB3aGljaCBjb3VsZCBoYXZlIHNpZGUgZWZmZWN0cy5cbiAqXG4gKiBAcGFyYW0ge0dlbmVyYXRvcn0gdGFyZ2V0XG4gKiBAcmV0dXJucyB7QXJyYXl9IGFuIGFycmF5IG9mIGVudHJpZXMgZnJvbSB0aGUgR2VuZXJhdG9yLlxuICovXG5mdW5jdGlvbiBnZXRHZW5lcmF0b3JFbnRyaWVzKGdlbmVyYXRvcikge1xuICB2YXIgZ2VuZXJhdG9yUmVzdWx0ID0gZ2VuZXJhdG9yLm5leHQoKTtcbiAgdmFyIGFjY3VtdWxhdG9yID0gWyBnZW5lcmF0b3JSZXN1bHQudmFsdWUgXTtcbiAgd2hpbGUgKGdlbmVyYXRvclJlc3VsdC5kb25lID09PSBmYWxzZSkge1xuICAgIGdlbmVyYXRvclJlc3VsdCA9IGdlbmVyYXRvci5uZXh0KCk7XG4gICAgYWNjdW11bGF0b3IucHVzaChnZW5lcmF0b3JSZXN1bHQudmFsdWUpO1xuICB9XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn1cblxuLyohXG4gKiBHZXRzIGFsbCBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIGtleXMgZnJvbSBhIHRhcmdldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcmV0dXJucyB7QXJyYXl9IGFuIGFycmF5IG9mIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUga2V5cyBmcm9tIHRoZSB0YXJnZXQuXG4gKi9cbmZ1bmN0aW9uIGdldEVudW1lcmFibGVLZXlzKHRhcmdldCkge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gdGFyZ2V0KSB7XG4gICAga2V5cy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIGtleXM7XG59XG5cbi8qIVxuICogRGV0ZXJtaW5lcyBpZiB0d28gb2JqZWN0cyBoYXZlIG1hdGNoaW5nIHZhbHVlcywgZ2l2ZW4gYSBzZXQgb2Yga2V5cy4gRGVmZXJzIHRvIGRlZXBFcXVhbCBmb3IgdGhlIGVxdWFsaXR5IGNoZWNrIG9mXG4gKiBlYWNoIGtleS4gSWYgYW55IHZhbHVlIG9mIHRoZSBnaXZlbiBrZXkgaXMgbm90IGVxdWFsLCB0aGUgZnVuY3Rpb24gd2lsbCByZXR1cm4gZmFsc2UgKGVhcmx5KS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBsZWZ0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7TWl4ZWR9IHJpZ2h0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7QXJyYXl9IGtleXMgQW4gYXJyYXkgb2Yga2V5cyB0byBjb21wYXJlIHRoZSB2YWx1ZXMgb2YgbGVmdEhhbmRPcGVyYW5kIGFuZCByaWdodEhhbmRPcGVyYW5kIGFnYWluc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKE9wdGlvbmFsKVxuICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gKi9cbmZ1bmN0aW9uIGtleXNFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIGtleXMsIG9wdGlvbnMpIHtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICBpZiAobGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChkZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kW2tleXNbaV1dLCByaWdodEhhbmRPcGVyYW5kW2tleXNbaV1dLCBvcHRpb25zKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qIVxuICogUmVjdXJzaXZlbHkgY2hlY2sgdGhlIGVxdWFsaXR5IG9mIHR3byBPYmplY3RzLiBPbmNlIGJhc2ljIHNhbWVuZXNzIGhhcyBiZWVuIGVzdGFibGlzaGVkIGl0IHdpbGwgZGVmZXIgdG8gYGRlZXBFcXVhbGBcbiAqIGZvciBlYWNoIGVudW1lcmFibGUga2V5IGluIHRoZSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gbGVmdEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge01peGVkfSByaWdodEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIChPcHRpb25hbClcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICovXG5cbmZ1bmN0aW9uIG9iamVjdEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucykge1xuICB2YXIgbGVmdEhhbmRLZXlzID0gZ2V0RW51bWVyYWJsZUtleXMobGVmdEhhbmRPcGVyYW5kKTtcbiAgdmFyIHJpZ2h0SGFuZEtleXMgPSBnZXRFbnVtZXJhYmxlS2V5cyhyaWdodEhhbmRPcGVyYW5kKTtcbiAgaWYgKGxlZnRIYW5kS2V5cy5sZW5ndGggJiYgbGVmdEhhbmRLZXlzLmxlbmd0aCA9PT0gcmlnaHRIYW5kS2V5cy5sZW5ndGgpIHtcbiAgICBsZWZ0SGFuZEtleXMuc29ydCgpO1xuICAgIHJpZ2h0SGFuZEtleXMuc29ydCgpO1xuICAgIGlmIChpdGVyYWJsZUVxdWFsKGxlZnRIYW5kS2V5cywgcmlnaHRIYW5kS2V5cykgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBrZXlzRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBsZWZ0SGFuZEtleXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgdmFyIGxlZnRIYW5kRW50cmllcyA9IGdldEl0ZXJhdG9yRW50cmllcyhsZWZ0SGFuZE9wZXJhbmQpO1xuICB2YXIgcmlnaHRIYW5kRW50cmllcyA9IGdldEl0ZXJhdG9yRW50cmllcyhyaWdodEhhbmRPcGVyYW5kKTtcbiAgaWYgKGxlZnRIYW5kRW50cmllcy5sZW5ndGggJiYgbGVmdEhhbmRFbnRyaWVzLmxlbmd0aCA9PT0gcmlnaHRIYW5kRW50cmllcy5sZW5ndGgpIHtcbiAgICBsZWZ0SGFuZEVudHJpZXMuc29ydCgpO1xuICAgIHJpZ2h0SGFuZEVudHJpZXMuc29ydCgpO1xuICAgIHJldHVybiBpdGVyYWJsZUVxdWFsKGxlZnRIYW5kRW50cmllcywgcmlnaHRIYW5kRW50cmllcywgb3B0aW9ucyk7XG4gIH1cblxuICBpZiAobGVmdEhhbmRLZXlzLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgbGVmdEhhbmRFbnRyaWVzLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgcmlnaHRIYW5kS2V5cy5sZW5ndGggPT09IDAgJiZcbiAgICAgIHJpZ2h0SGFuZEVudHJpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qIVxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBhcmd1bWVudCBpcyBhIHByaW1pdGl2ZS5cbiAqXG4gKiBUaGlzIGludGVudGlvbmFsbHkgcmV0dXJucyB0cnVlIGZvciBhbGwgb2JqZWN0cyB0aGF0IGNhbiBiZSBjb21wYXJlZCBieSByZWZlcmVuY2UsXG4gKiBpbmNsdWRpbmcgZnVuY3Rpb25zIGFuZCBzeW1ib2xzLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqL1xuZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kZWVwLWVxbC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyohXG4gKiBDaGFpIC0gYWRkUHJvcGVydHkgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbnZhciBjaGFpID0gcmVxdWlyZSgnLi4vLi4vY2hhaScpO1xudmFyIGZsYWcgPSByZXF1aXJlKCcuL2ZsYWcnKTtcbnZhciBpc1Byb3h5RW5hYmxlZCA9IHJlcXVpcmUoJy4vaXNQcm94eUVuYWJsZWQnKTtcbnZhciB0cmFuc2ZlckZsYWdzID0gcmVxdWlyZSgnLi90cmFuc2ZlckZsYWdzJyk7XG5cbi8qKlxuICogIyMjIC5hZGRQcm9wZXJ0eShjdHgsIG5hbWUsIGdldHRlcilcbiAqXG4gKiBBZGRzIGEgcHJvcGVydHkgdG8gdGhlIHByb3RvdHlwZSBvZiBhbiBvYmplY3QuXG4gKlxuICogICAgIHV0aWxzLmFkZFByb3BlcnR5KGNoYWkuQXNzZXJ0aW9uLnByb3RvdHlwZSwgJ2ZvbycsIGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHZhciBvYmogPSB1dGlscy5mbGFnKHRoaXMsICdvYmplY3QnKTtcbiAqICAgICAgIG5ldyBjaGFpLkFzc2VydGlvbihvYmopLnRvLmJlLmluc3RhbmNlb2YoRm9vKTtcbiAqICAgICB9KTtcbiAqXG4gKiBDYW4gYWxzbyBiZSBhY2Nlc3NlZCBkaXJlY3RseSBmcm9tIGBjaGFpLkFzc2VydGlvbmAuXG4gKlxuICogICAgIGNoYWkuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdmb28nLCBmbik7XG4gKlxuICogVGhlbiBjYW4gYmUgdXNlZCBhcyBhbnkgb3RoZXIgYXNzZXJ0aW9uLlxuICpcbiAqICAgICBleHBlY3QobXlGb28pLnRvLmJlLmZvbztcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4IG9iamVjdCB0byB3aGljaCB0aGUgcHJvcGVydHkgaXMgYWRkZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG9mIHByb3BlcnR5IHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZ2V0dGVyIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIG5hbWVcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGFkZFByb3BlcnR5XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYWRkUHJvcGVydHkoY3R4LCBuYW1lLCBnZXR0ZXIpIHtcbiAgZ2V0dGVyID0gZ2V0dGVyID09PSB1bmRlZmluZWQgPyBmdW5jdGlvbiAoKSB7fSA6IGdldHRlcjtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBuYW1lLFxuICAgIHsgZ2V0OiBmdW5jdGlvbiBwcm9wZXJ0eUdldHRlcigpIHtcbiAgICAgICAgLy8gU2V0dGluZyB0aGUgYHNzZmlgIGZsYWcgdG8gYHByb3BlcnR5R2V0dGVyYCBjYXVzZXMgdGhpcyBmdW5jdGlvbiB0b1xuICAgICAgICAvLyBiZSB0aGUgc3RhcnRpbmcgcG9pbnQgZm9yIHJlbW92aW5nIGltcGxlbWVudGF0aW9uIGZyYW1lcyBmcm9tIHRoZVxuICAgICAgICAvLyBzdGFjayB0cmFjZSBvZiBhIGZhaWxlZCBhc3NlcnRpb24uXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEhvd2V2ZXIsIHdlIG9ubHkgd2FudCB0byB1c2UgdGhpcyBmdW5jdGlvbiBhcyB0aGUgc3RhcnRpbmcgcG9pbnQgaWZcbiAgICAgICAgLy8gdGhlIGBsb2NrU3NmaWAgZmxhZyBpc24ndCBzZXQgYW5kIHByb3h5IHByb3RlY3Rpb24gaXMgZGlzYWJsZWQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIElmIHRoZSBgbG9ja1NzZmlgIGZsYWcgaXMgc2V0LCB0aGVuIGVpdGhlciB0aGlzIGFzc2VydGlvbiBoYXMgYmVlblxuICAgICAgICAvLyBvdmVyd3JpdHRlbiBieSBhbm90aGVyIGFzc2VydGlvbiwgb3IgdGhpcyBhc3NlcnRpb24gaXMgYmVpbmcgaW52b2tlZFxuICAgICAgICAvLyBmcm9tIGluc2lkZSBvZiBhbm90aGVyIGFzc2VydGlvbi4gSW4gdGhlIGZpcnN0IGNhc2UsIHRoZSBgc3NmaWAgZmxhZ1xuICAgICAgICAvLyBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgb3ZlcndyaXRpbmcgYXNzZXJ0aW9uLiBJbiB0aGUgc2Vjb25kXG4gICAgICAgIC8vIGNhc2UsIHRoZSBgc3NmaWAgZmxhZyBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgb3V0ZXIgYXNzZXJ0aW9uLlxuICAgICAgICAvL1xuICAgICAgICAvLyBJZiBwcm94eSBwcm90ZWN0aW9uIGlzIGVuYWJsZWQsIHRoZW4gdGhlIGBzc2ZpYCBmbGFnIGhhcyBhbHJlYWR5IGJlZW5cbiAgICAgICAgLy8gc2V0IGJ5IHRoZSBwcm94eSBnZXR0ZXIuXG4gICAgICAgIGlmICghaXNQcm94eUVuYWJsZWQoKSAmJiAhZmxhZyh0aGlzLCAnbG9ja1NzZmknKSkge1xuICAgICAgICAgIGZsYWcodGhpcywgJ3NzZmknLCBwcm9wZXJ0eUdldHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzdWx0ID0gZ2V0dGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgIHZhciBuZXdBc3NlcnRpb24gPSBuZXcgY2hhaS5Bc3NlcnRpb24oKTtcbiAgICAgICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgICAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICAgICAgfVxuICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvYWRkUHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIVxuICogQ2hhaSAtIGFkZE1ldGhvZCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxudmFyIGFkZExlbmd0aEd1YXJkID0gcmVxdWlyZSgnLi9hZGRMZW5ndGhHdWFyZCcpO1xudmFyIGNoYWkgPSByZXF1aXJlKCcuLi8uLi9jaGFpJyk7XG52YXIgZmxhZyA9IHJlcXVpcmUoJy4vZmxhZycpO1xudmFyIHByb3hpZnkgPSByZXF1aXJlKCcuL3Byb3hpZnknKTtcbnZhciB0cmFuc2ZlckZsYWdzID0gcmVxdWlyZSgnLi90cmFuc2ZlckZsYWdzJyk7XG5cbi8qKlxuICogIyMjIC5hZGRNZXRob2QoY3R4LCBuYW1lLCBtZXRob2QpXG4gKlxuICogQWRkcyBhIG1ldGhvZCB0byB0aGUgcHJvdG90eXBlIG9mIGFuIG9iamVjdC5cbiAqXG4gKiAgICAgdXRpbHMuYWRkTWV0aG9kKGNoYWkuQXNzZXJ0aW9uLnByb3RvdHlwZSwgJ2ZvbycsIGZ1bmN0aW9uIChzdHIpIHtcbiAqICAgICAgIHZhciBvYmogPSB1dGlscy5mbGFnKHRoaXMsICdvYmplY3QnKTtcbiAqICAgICAgIG5ldyBjaGFpLkFzc2VydGlvbihvYmopLnRvLmJlLmVxdWFsKHN0cik7XG4gKiAgICAgfSk7XG4gKlxuICogQ2FuIGFsc28gYmUgYWNjZXNzZWQgZGlyZWN0bHkgZnJvbSBgY2hhaS5Bc3NlcnRpb25gLlxuICpcbiAqICAgICBjaGFpLkFzc2VydGlvbi5hZGRNZXRob2QoJ2ZvbycsIGZuKTtcbiAqXG4gKiBUaGVuIGNhbiBiZSB1c2VkIGFzIGFueSBvdGhlciBhc3NlcnRpb24uXG4gKlxuICogICAgIGV4cGVjdChmb29TdHIpLnRvLmJlLmZvbygnYmFyJyk7XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBvYmplY3QgdG8gd2hpY2ggdGhlIG1ldGhvZCBpcyBhZGRlZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgbWV0aG9kIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIG5hbWVcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGFkZE1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFkZE1ldGhvZChjdHgsIG5hbWUsIG1ldGhvZCkge1xuICB2YXIgbWV0aG9kV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTZXR0aW5nIHRoZSBgc3NmaWAgZmxhZyB0byBgbWV0aG9kV3JhcHBlcmAgY2F1c2VzIHRoaXMgZnVuY3Rpb24gdG8gYmUgdGhlXG4gICAgLy8gc3RhcnRpbmcgcG9pbnQgZm9yIHJlbW92aW5nIGltcGxlbWVudGF0aW9uIGZyYW1lcyBmcm9tIHRoZSBzdGFjayB0cmFjZSBvZlxuICAgIC8vIGEgZmFpbGVkIGFzc2VydGlvbi5cbiAgICAvL1xuICAgIC8vIEhvd2V2ZXIsIHdlIG9ubHkgd2FudCB0byB1c2UgdGhpcyBmdW5jdGlvbiBhcyB0aGUgc3RhcnRpbmcgcG9pbnQgaWYgdGhlXG4gICAgLy8gYGxvY2tTc2ZpYCBmbGFnIGlzbid0IHNldC5cbiAgICAvL1xuICAgIC8vIElmIHRoZSBgbG9ja1NzZmlgIGZsYWcgaXMgc2V0LCB0aGVuIGVpdGhlciB0aGlzIGFzc2VydGlvbiBoYXMgYmVlblxuICAgIC8vIG92ZXJ3cml0dGVuIGJ5IGFub3RoZXIgYXNzZXJ0aW9uLCBvciB0aGlzIGFzc2VydGlvbiBpcyBiZWluZyBpbnZva2VkIGZyb21cbiAgICAvLyBpbnNpZGUgb2YgYW5vdGhlciBhc3NlcnRpb24uIEluIHRoZSBmaXJzdCBjYXNlLCB0aGUgYHNzZmlgIGZsYWcgaGFzXG4gICAgLy8gYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgb3ZlcndyaXRpbmcgYXNzZXJ0aW9uLiBJbiB0aGUgc2Vjb25kIGNhc2UsIHRoZVxuICAgIC8vIGBzc2ZpYCBmbGFnIGhhcyBhbHJlYWR5IGJlZW4gc2V0IGJ5IHRoZSBvdXRlciBhc3NlcnRpb24uXG4gICAgaWYgKCFmbGFnKHRoaXMsICdsb2NrU3NmaScpKSB7XG4gICAgICBmbGFnKHRoaXMsICdzc2ZpJywgbWV0aG9kV3JhcHBlcik7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IG1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB2YXIgbmV3QXNzZXJ0aW9uID0gbmV3IGNoYWkuQXNzZXJ0aW9uKCk7XG4gICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gIH07XG5cbiAgYWRkTGVuZ3RoR3VhcmQobWV0aG9kV3JhcHBlciwgbmFtZSwgZmFsc2UpO1xuICBjdHhbbmFtZV0gPSBwcm94aWZ5KG1ldGhvZFdyYXBwZXIsIG5hbWUpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvYWRkTWV0aG9kLmpzXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiFcbiAqIENoYWkgLSBvdmVyd3JpdGVQcm9wZXJ0eSB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxudmFyIGNoYWkgPSByZXF1aXJlKCcuLi8uLi9jaGFpJyk7XG52YXIgZmxhZyA9IHJlcXVpcmUoJy4vZmxhZycpO1xudmFyIGlzUHJveHlFbmFibGVkID0gcmVxdWlyZSgnLi9pc1Byb3h5RW5hYmxlZCcpO1xudmFyIHRyYW5zZmVyRmxhZ3MgPSByZXF1aXJlKCcuL3RyYW5zZmVyRmxhZ3MnKTtcblxuLyoqXG4gKiAjIyMgLm92ZXJ3cml0ZVByb3BlcnR5KGN0eCwgbmFtZSwgZm4pXG4gKlxuICogT3ZlcndpdGVzIGFuIGFscmVhZHkgZXhpc3RpbmcgcHJvcGVydHkgZ2V0dGVyIGFuZCBwcm92aWRlc1xuICogYWNjZXNzIHRvIHByZXZpb3VzIHZhbHVlLiBNdXN0IHJldHVybiBmdW5jdGlvbiB0byB1c2UgYXMgZ2V0dGVyLlxuICpcbiAqICAgICB1dGlscy5vdmVyd3JpdGVQcm9wZXJ0eShjaGFpLkFzc2VydGlvbi5wcm90b3R5cGUsICdvaycsIGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAqICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gKiAgICAgICAgIHZhciBvYmogPSB1dGlscy5mbGFnKHRoaXMsICdvYmplY3QnKTtcbiAqICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEZvbykge1xuICogICAgICAgICAgIG5ldyBjaGFpLkFzc2VydGlvbihvYmoubmFtZSkudG8uZXF1YWwoJ2JhcicpO1xuICogICAgICAgICB9IGVsc2Uge1xuICogICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICogICAgICAgICB9XG4gKiAgICAgICB9XG4gKiAgICAgfSk7XG4gKlxuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24ub3ZlcndyaXRlUHJvcGVydHkoJ2ZvbycsIGZuKTtcbiAqXG4gKiBUaGVuIGNhbiBiZSB1c2VkIGFzIGFueSBvdGhlciBhc3NlcnRpb24uXG4gKlxuICogICAgIGV4cGVjdChteUZvbykudG8uYmUub2s7XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBvYmplY3Qgd2hvc2UgcHJvcGVydHkgaXMgdG8gYmUgb3ZlcndyaXR0ZW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG9mIHByb3BlcnR5IHRvIG92ZXJ3cml0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZ2V0dGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGdldHRlciBmdW5jdGlvbiB0byBiZSB1c2VkIGZvciBuYW1lXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBvdmVyd3JpdGVQcm9wZXJ0eVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG92ZXJ3cml0ZVByb3BlcnR5KGN0eCwgbmFtZSwgZ2V0dGVyKSB7XG4gIHZhciBfZ2V0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjdHgsIG5hbWUpXG4gICAgLCBfc3VwZXIgPSBmdW5jdGlvbiAoKSB7fTtcblxuICBpZiAoX2dldCAmJiAnZnVuY3Rpb24nID09PSB0eXBlb2YgX2dldC5nZXQpXG4gICAgX3N1cGVyID0gX2dldC5nZXRcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBuYW1lLFxuICAgIHsgZ2V0OiBmdW5jdGlvbiBvdmVyd3JpdGluZ1Byb3BlcnR5R2V0dGVyKCkge1xuICAgICAgICAvLyBTZXR0aW5nIHRoZSBgc3NmaWAgZmxhZyB0byBgb3ZlcndyaXRpbmdQcm9wZXJ0eUdldHRlcmAgY2F1c2VzIHRoaXNcbiAgICAgICAgLy8gZnVuY3Rpb24gdG8gYmUgdGhlIHN0YXJ0aW5nIHBvaW50IGZvciByZW1vdmluZyBpbXBsZW1lbnRhdGlvbiBmcmFtZXNcbiAgICAgICAgLy8gZnJvbSB0aGUgc3RhY2sgdHJhY2Ugb2YgYSBmYWlsZWQgYXNzZXJ0aW9uLlxuICAgICAgICAvL1xuICAgICAgICAvLyBIb3dldmVyLCB3ZSBvbmx5IHdhbnQgdG8gdXNlIHRoaXMgZnVuY3Rpb24gYXMgdGhlIHN0YXJ0aW5nIHBvaW50IGlmXG4gICAgICAgIC8vIHRoZSBgbG9ja1NzZmlgIGZsYWcgaXNuJ3Qgc2V0IGFuZCBwcm94eSBwcm90ZWN0aW9uIGlzIGRpc2FibGVkLlxuICAgICAgICAvL1xuICAgICAgICAvLyBJZiB0aGUgYGxvY2tTc2ZpYCBmbGFnIGlzIHNldCwgdGhlbiBlaXRoZXIgdGhpcyBhc3NlcnRpb24gaGFzIGJlZW5cbiAgICAgICAgLy8gb3ZlcndyaXR0ZW4gYnkgYW5vdGhlciBhc3NlcnRpb24sIG9yIHRoaXMgYXNzZXJ0aW9uIGlzIGJlaW5nIGludm9rZWRcbiAgICAgICAgLy8gZnJvbSBpbnNpZGUgb2YgYW5vdGhlciBhc3NlcnRpb24uIEluIHRoZSBmaXJzdCBjYXNlLCB0aGUgYHNzZmlgIGZsYWdcbiAgICAgICAgLy8gaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgdGhlIG92ZXJ3cml0aW5nIGFzc2VydGlvbi4gSW4gdGhlIHNlY29uZFxuICAgICAgICAvLyBjYXNlLCB0aGUgYHNzZmlgIGZsYWcgaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgdGhlIG91dGVyIGFzc2VydGlvbi5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSWYgcHJveHkgcHJvdGVjdGlvbiBpcyBlbmFibGVkLCB0aGVuIHRoZSBgc3NmaWAgZmxhZyBoYXMgYWxyZWFkeSBiZWVuXG4gICAgICAgIC8vIHNldCBieSB0aGUgcHJveHkgZ2V0dGVyLlxuICAgICAgICBpZiAoIWlzUHJveHlFbmFibGVkKCkgJiYgIWZsYWcodGhpcywgJ2xvY2tTc2ZpJykpIHtcbiAgICAgICAgICBmbGFnKHRoaXMsICdzc2ZpJywgb3ZlcndyaXRpbmdQcm9wZXJ0eUdldHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXR0aW5nIHRoZSBgbG9ja1NzZmlgIGZsYWcgdG8gYHRydWVgIHByZXZlbnRzIHRoZSBvdmVyd3JpdHRlblxuICAgICAgICAvLyBhc3NlcnRpb24gZnJvbSBjaGFuZ2luZyB0aGUgYHNzZmlgIGZsYWcuIEJ5IHRoaXMgcG9pbnQsIHRoZSBgc3NmaWBcbiAgICAgICAgLy8gZmxhZyBpcyBhbHJlYWR5IHNldCB0byB0aGUgY29ycmVjdCBzdGFydGluZyBwb2ludCBmb3IgdGhpcyBhc3NlcnRpb24uXG4gICAgICAgIHZhciBvcmlnTG9ja1NzZmkgPSBmbGFnKHRoaXMsICdsb2NrU3NmaScpO1xuICAgICAgICBmbGFnKHRoaXMsICdsb2NrU3NmaScsIHRydWUpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gZ2V0dGVyKF9zdXBlcikuY2FsbCh0aGlzKTtcbiAgICAgICAgZmxhZyh0aGlzLCAnbG9ja1NzZmknLCBvcmlnTG9ja1NzZmkpO1xuXG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3QXNzZXJ0aW9uID0gbmV3IGNoYWkuQXNzZXJ0aW9uKCk7XG4gICAgICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgbmV3QXNzZXJ0aW9uKTtcbiAgICAgICAgcmV0dXJuIG5ld0Fzc2VydGlvbjtcbiAgICAgIH1cbiAgICAsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL292ZXJ3cml0ZVByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiFcbiAqIENoYWkgLSBvdmVyd3JpdGVNZXRob2QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbnZhciBhZGRMZW5ndGhHdWFyZCA9IHJlcXVpcmUoJy4vYWRkTGVuZ3RoR3VhcmQnKTtcbnZhciBjaGFpID0gcmVxdWlyZSgnLi4vLi4vY2hhaScpO1xudmFyIGZsYWcgPSByZXF1aXJlKCcuL2ZsYWcnKTtcbnZhciBwcm94aWZ5ID0gcmVxdWlyZSgnLi9wcm94aWZ5Jyk7XG52YXIgdHJhbnNmZXJGbGFncyA9IHJlcXVpcmUoJy4vdHJhbnNmZXJGbGFncycpO1xuXG4vKipcbiAqICMjIyAub3ZlcndyaXRlTWV0aG9kKGN0eCwgbmFtZSwgZm4pXG4gKlxuICogT3ZlcndpdGVzIGFuIGFscmVhZHkgZXhpc3RpbmcgbWV0aG9kIGFuZCBwcm92aWRlc1xuICogYWNjZXNzIHRvIHByZXZpb3VzIGZ1bmN0aW9uLiBNdXN0IHJldHVybiBmdW5jdGlvblxuICogdG8gYmUgdXNlZCBmb3IgbmFtZS5cbiAqXG4gKiAgICAgdXRpbHMub3ZlcndyaXRlTWV0aG9kKGNoYWkuQXNzZXJ0aW9uLnByb3RvdHlwZSwgJ2VxdWFsJywgZnVuY3Rpb24gKF9zdXBlcikge1xuICogICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHIpIHtcbiAqICAgICAgICAgdmFyIG9iaiA9IHV0aWxzLmZsYWcodGhpcywgJ29iamVjdCcpO1xuICogICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgRm9vKSB7XG4gKiAgICAgICAgICAgbmV3IGNoYWkuQXNzZXJ0aW9uKG9iai52YWx1ZSkudG8uZXF1YWwoc3RyKTtcbiAqICAgICAgICAgfSBlbHNlIHtcbiAqICAgICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAqICAgICAgICAgfVxuICogICAgICAgfVxuICogICAgIH0pO1xuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24ub3ZlcndyaXRlTWV0aG9kKCdmb28nLCBmbik7XG4gKlxuICogVGhlbiBjYW4gYmUgdXNlZCBhcyBhbnkgb3RoZXIgYXNzZXJ0aW9uLlxuICpcbiAqICAgICBleHBlY3QobXlGb28pLnRvLmVxdWFsKCdiYXInKTtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4IG9iamVjdCB3aG9zZSBtZXRob2QgaXMgdG8gYmUgb3ZlcndyaXR0ZW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG9mIG1ldGhvZCB0byBvdmVyd3JpdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBmdW5jdGlvbiB0byBiZSB1c2VkIGZvciBuYW1lXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBvdmVyd3JpdGVNZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvdmVyd3JpdGVNZXRob2QoY3R4LCBuYW1lLCBtZXRob2QpIHtcbiAgdmFyIF9tZXRob2QgPSBjdHhbbmFtZV1cbiAgICAsIF9zdXBlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihuYW1lICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgIH07XG5cbiAgaWYgKF9tZXRob2QgJiYgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIF9tZXRob2QpXG4gICAgX3N1cGVyID0gX21ldGhvZDtcblxuICB2YXIgb3ZlcndyaXRpbmdNZXRob2RXcmFwcGVyID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFNldHRpbmcgdGhlIGBzc2ZpYCBmbGFnIHRvIGBvdmVyd3JpdGluZ01ldGhvZFdyYXBwZXJgIGNhdXNlcyB0aGlzXG4gICAgLy8gZnVuY3Rpb24gdG8gYmUgdGhlIHN0YXJ0aW5nIHBvaW50IGZvciByZW1vdmluZyBpbXBsZW1lbnRhdGlvbiBmcmFtZXMgZnJvbVxuICAgIC8vIHRoZSBzdGFjayB0cmFjZSBvZiBhIGZhaWxlZCBhc3NlcnRpb24uXG4gICAgLy9cbiAgICAvLyBIb3dldmVyLCB3ZSBvbmx5IHdhbnQgdG8gdXNlIHRoaXMgZnVuY3Rpb24gYXMgdGhlIHN0YXJ0aW5nIHBvaW50IGlmIHRoZVxuICAgIC8vIGBsb2NrU3NmaWAgZmxhZyBpc24ndCBzZXQuXG4gICAgLy9cbiAgICAvLyBJZiB0aGUgYGxvY2tTc2ZpYCBmbGFnIGlzIHNldCwgdGhlbiBlaXRoZXIgdGhpcyBhc3NlcnRpb24gaGFzIGJlZW5cbiAgICAvLyBvdmVyd3JpdHRlbiBieSBhbm90aGVyIGFzc2VydGlvbiwgb3IgdGhpcyBhc3NlcnRpb24gaXMgYmVpbmcgaW52b2tlZCBmcm9tXG4gICAgLy8gaW5zaWRlIG9mIGFub3RoZXIgYXNzZXJ0aW9uLiBJbiB0aGUgZmlyc3QgY2FzZSwgdGhlIGBzc2ZpYCBmbGFnIGhhc1xuICAgIC8vIGFscmVhZHkgYmVlbiBzZXQgYnkgdGhlIG92ZXJ3cml0aW5nIGFzc2VydGlvbi4gSW4gdGhlIHNlY29uZCBjYXNlLCB0aGVcbiAgICAvLyBgc3NmaWAgZmxhZyBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgb3V0ZXIgYXNzZXJ0aW9uLlxuICAgIGlmICghZmxhZyh0aGlzLCAnbG9ja1NzZmknKSkge1xuICAgICAgZmxhZyh0aGlzLCAnc3NmaScsIG92ZXJ3cml0aW5nTWV0aG9kV3JhcHBlcik7XG4gICAgfVxuXG4gICAgLy8gU2V0dGluZyB0aGUgYGxvY2tTc2ZpYCBmbGFnIHRvIGB0cnVlYCBwcmV2ZW50cyB0aGUgb3ZlcndyaXR0ZW4gYXNzZXJ0aW9uXG4gICAgLy8gZnJvbSBjaGFuZ2luZyB0aGUgYHNzZmlgIGZsYWcuIEJ5IHRoaXMgcG9pbnQsIHRoZSBgc3NmaWAgZmxhZyBpcyBhbHJlYWR5XG4gICAgLy8gc2V0IHRvIHRoZSBjb3JyZWN0IHN0YXJ0aW5nIHBvaW50IGZvciB0aGlzIGFzc2VydGlvbi5cbiAgICB2YXIgb3JpZ0xvY2tTc2ZpID0gZmxhZyh0aGlzLCAnbG9ja1NzZmknKTtcbiAgICBmbGFnKHRoaXMsICdsb2NrU3NmaScsIHRydWUpO1xuICAgIHZhciByZXN1bHQgPSBtZXRob2QoX3N1cGVyKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGZsYWcodGhpcywgJ2xvY2tTc2ZpJywgb3JpZ0xvY2tTc2ZpKTtcblxuICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB2YXIgbmV3QXNzZXJ0aW9uID0gbmV3IGNoYWkuQXNzZXJ0aW9uKCk7XG4gICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gIH1cblxuICBhZGRMZW5ndGhHdWFyZChvdmVyd3JpdGluZ01ldGhvZFdyYXBwZXIsIG5hbWUsIGZhbHNlKTtcbiAgY3R4W25hbWVdID0gcHJveGlmeShvdmVyd3JpdGluZ01ldGhvZFdyYXBwZXIsIG5hbWUpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvb3ZlcndyaXRlTWV0aG9kLmpzXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiFcbiAqIENoYWkgLSBhZGRDaGFpbmluZ01ldGhvZCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyohXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cblxudmFyIGFkZExlbmd0aEd1YXJkID0gcmVxdWlyZSgnLi9hZGRMZW5ndGhHdWFyZCcpO1xudmFyIGNoYWkgPSByZXF1aXJlKCcuLi8uLi9jaGFpJyk7XG52YXIgZmxhZyA9IHJlcXVpcmUoJy4vZmxhZycpO1xudmFyIHByb3hpZnkgPSByZXF1aXJlKCcuL3Byb3hpZnknKTtcbnZhciB0cmFuc2ZlckZsYWdzID0gcmVxdWlyZSgnLi90cmFuc2ZlckZsYWdzJyk7XG5cbi8qIVxuICogTW9kdWxlIHZhcmlhYmxlc1xuICovXG5cbi8vIENoZWNrIHdoZXRoZXIgYE9iamVjdC5zZXRQcm90b3R5cGVPZmAgaXMgc3VwcG9ydGVkXG52YXIgY2FuU2V0UHJvdG90eXBlID0gdHlwZW9mIE9iamVjdC5zZXRQcm90b3R5cGVPZiA9PT0gJ2Z1bmN0aW9uJztcblxuLy8gV2l0aG91dCBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBzdXBwb3J0LCB0aGlzIG1vZHVsZSB3aWxsIG5lZWQgdG8gYWRkIHByb3BlcnRpZXMgdG8gYSBmdW5jdGlvbi5cbi8vIEhvd2V2ZXIsIHNvbWUgb2YgZnVuY3Rpb25zJyBvd24gcHJvcHMgYXJlIG5vdCBjb25maWd1cmFibGUgYW5kIHNob3VsZCBiZSBza2lwcGVkLlxudmFyIHRlc3RGbiA9IGZ1bmN0aW9uKCkge307XG52YXIgZXhjbHVkZU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdEZuKS5maWx0ZXIoZnVuY3Rpb24obmFtZSkge1xuICB2YXIgcHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRlc3RGbiwgbmFtZSk7XG5cbiAgLy8gTm90ZTogUGhhbnRvbUpTIDEueCBpbmNsdWRlcyBgY2FsbGVlYCBhcyBvbmUgb2YgYHRlc3RGbmAncyBvd24gcHJvcGVydGllcyxcbiAgLy8gYnV0IHRoZW4gcmV0dXJucyBgdW5kZWZpbmVkYCBhcyB0aGUgcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgYGNhbGxlZWAuIEFzIGFcbiAgLy8gd29ya2Fyb3VuZCwgd2UgcGVyZm9ybSBhbiBvdGhlcndpc2UgdW5uZWNlc3NhcnkgdHlwZS1jaGVjayBmb3IgYHByb3BEZXNjYCxcbiAgLy8gYW5kIHRoZW4gZmlsdGVyIGl0IG91dCBpZiBpdCdzIG5vdCBhbiBvYmplY3QgYXMgaXQgc2hvdWxkIGJlLlxuICBpZiAodHlwZW9mIHByb3BEZXNjICE9PSAnb2JqZWN0JylcbiAgICByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gIXByb3BEZXNjLmNvbmZpZ3VyYWJsZTtcbn0pO1xuXG4vLyBDYWNoZSBgRnVuY3Rpb25gIHByb3BlcnRpZXNcbnZhciBjYWxsICA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsLFxuICAgIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vKipcbiAqICMjIyAuYWRkQ2hhaW5hYmxlTWV0aG9kKGN0eCwgbmFtZSwgbWV0aG9kLCBjaGFpbmluZ0JlaGF2aW9yKVxuICpcbiAqIEFkZHMgYSBtZXRob2QgdG8gYW4gb2JqZWN0LCBzdWNoIHRoYXQgdGhlIG1ldGhvZCBjYW4gYWxzbyBiZSBjaGFpbmVkLlxuICpcbiAqICAgICB1dGlscy5hZGRDaGFpbmFibGVNZXRob2QoY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLCAnZm9vJywgZnVuY3Rpb24gKHN0cikge1xuICogICAgICAgdmFyIG9iaiA9IHV0aWxzLmZsYWcodGhpcywgJ29iamVjdCcpO1xuICogICAgICAgbmV3IGNoYWkuQXNzZXJ0aW9uKG9iaikudG8uYmUuZXF1YWwoc3RyKTtcbiAqICAgICB9KTtcbiAqXG4gKiBDYW4gYWxzbyBiZSBhY2Nlc3NlZCBkaXJlY3RseSBmcm9tIGBjaGFpLkFzc2VydGlvbmAuXG4gKlxuICogICAgIGNoYWkuQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnZm9vJywgZm4sIGNoYWluaW5nQmVoYXZpb3IpO1xuICpcbiAqIFRoZSByZXN1bHQgY2FuIHRoZW4gYmUgdXNlZCBhcyBib3RoIGEgbWV0aG9kIGFzc2VydGlvbiwgZXhlY3V0aW5nIGJvdGggYG1ldGhvZGAgYW5kXG4gKiBgY2hhaW5pbmdCZWhhdmlvcmAsIG9yIGFzIGEgbGFuZ3VhZ2UgY2hhaW4sIHdoaWNoIG9ubHkgZXhlY3V0ZXMgYGNoYWluaW5nQmVoYXZpb3JgLlxuICpcbiAqICAgICBleHBlY3QoZm9vU3RyKS50by5iZS5mb28oJ2JhcicpO1xuICogICAgIGV4cGVjdChmb29TdHIpLnRvLmJlLmZvby5lcXVhbCgnZm9vJyk7XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBvYmplY3QgdG8gd2hpY2ggdGhlIG1ldGhvZCBpcyBhZGRlZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgbWV0aG9kIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIGBuYW1lYCwgd2hlbiBjYWxsZWRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNoYWluaW5nQmVoYXZpb3IgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGV2ZXJ5IHRpbWUgdGhlIHByb3BlcnR5IGlzIGFjY2Vzc2VkXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBhZGRDaGFpbmFibGVNZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhZGRDaGFpbmFibGVNZXRob2QoY3R4LCBuYW1lLCBtZXRob2QsIGNoYWluaW5nQmVoYXZpb3IpIHtcbiAgaWYgKHR5cGVvZiBjaGFpbmluZ0JlaGF2aW9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgY2hhaW5pbmdCZWhhdmlvciA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgfVxuXG4gIHZhciBjaGFpbmFibGVCZWhhdmlvciA9IHtcbiAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgLCBjaGFpbmluZ0JlaGF2aW9yOiBjaGFpbmluZ0JlaGF2aW9yXG4gIH07XG5cbiAgLy8gc2F2ZSB0aGUgbWV0aG9kcyBzbyB3ZSBjYW4gb3ZlcndyaXRlIHRoZW0gbGF0ZXIsIGlmIHdlIG5lZWQgdG8uXG4gIGlmICghY3R4Ll9fbWV0aG9kcykge1xuICAgIGN0eC5fX21ldGhvZHMgPSB7fTtcbiAgfVxuICBjdHguX19tZXRob2RzW25hbWVdID0gY2hhaW5hYmxlQmVoYXZpb3I7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwgbmFtZSxcbiAgICB7IGdldDogZnVuY3Rpb24gY2hhaW5hYmxlTWV0aG9kR2V0dGVyKCkge1xuICAgICAgICBjaGFpbmFibGVCZWhhdmlvci5jaGFpbmluZ0JlaGF2aW9yLmNhbGwodGhpcyk7XG5cbiAgICAgICAgdmFyIGNoYWluYWJsZU1ldGhvZFdyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyB0aGUgYHNzZmlgIGZsYWcgdG8gYGNoYWluYWJsZU1ldGhvZFdyYXBwZXJgIGNhdXNlcyB0aGlzXG4gICAgICAgICAgLy8gZnVuY3Rpb24gdG8gYmUgdGhlIHN0YXJ0aW5nIHBvaW50IGZvciByZW1vdmluZyBpbXBsZW1lbnRhdGlvblxuICAgICAgICAgIC8vIGZyYW1lcyBmcm9tIHRoZSBzdGFjayB0cmFjZSBvZiBhIGZhaWxlZCBhc3NlcnRpb24uXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBIb3dldmVyLCB3ZSBvbmx5IHdhbnQgdG8gdXNlIHRoaXMgZnVuY3Rpb24gYXMgdGhlIHN0YXJ0aW5nIHBvaW50IGlmXG4gICAgICAgICAgLy8gdGhlIGBsb2NrU3NmaWAgZmxhZyBpc24ndCBzZXQuXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBJZiB0aGUgYGxvY2tTc2ZpYCBmbGFnIGlzIHNldCwgdGhlbiB0aGlzIGFzc2VydGlvbiBpcyBiZWluZ1xuICAgICAgICAgIC8vIGludm9rZWQgZnJvbSBpbnNpZGUgb2YgYW5vdGhlciBhc3NlcnRpb24uIEluIHRoaXMgY2FzZSwgdGhlIGBzc2ZpYFxuICAgICAgICAgIC8vIGZsYWcgaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgdGhlIG91dGVyIGFzc2VydGlvbi5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIE5vdGUgdGhhdCBvdmVyd3JpdGluZyBhIGNoYWluYWJsZSBtZXRob2QgbWVyZWx5IHJlcGxhY2VzIHRoZSBzYXZlZFxuICAgICAgICAgIC8vIG1ldGhvZHMgaW4gYGN0eC5fX21ldGhvZHNgIGluc3RlYWQgb2YgY29tcGxldGVseSByZXBsYWNpbmcgdGhlXG4gICAgICAgICAgLy8gb3ZlcndyaXR0ZW4gYXNzZXJ0aW9uLiBUaGVyZWZvcmUsIGFuIG92ZXJ3cml0aW5nIGFzc2VydGlvbiB3b24ndFxuICAgICAgICAgIC8vIHNldCB0aGUgYHNzZmlgIG9yIGBsb2NrU3NmaWAgZmxhZ3MuXG4gICAgICAgICAgaWYgKCFmbGFnKHRoaXMsICdsb2NrU3NmaScpKSB7XG4gICAgICAgICAgICBmbGFnKHRoaXMsICdzc2ZpJywgY2hhaW5hYmxlTWV0aG9kV3JhcHBlcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IGNoYWluYWJsZUJlaGF2aW9yLm1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbmV3QXNzZXJ0aW9uID0gbmV3IGNoYWkuQXNzZXJ0aW9uKCk7XG4gICAgICAgICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgICAgICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gICAgICAgIH07XG5cbiAgICAgICAgYWRkTGVuZ3RoR3VhcmQoY2hhaW5hYmxlTWV0aG9kV3JhcHBlciwgbmFtZSwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gVXNlIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIGlmIGF2YWlsYWJsZVxuICAgICAgICBpZiAoY2FuU2V0UHJvdG90eXBlKSB7XG4gICAgICAgICAgLy8gSW5oZXJpdCBhbGwgcHJvcGVydGllcyBmcm9tIHRoZSBvYmplY3QgYnkgcmVwbGFjaW5nIHRoZSBgRnVuY3Rpb25gIHByb3RvdHlwZVxuICAgICAgICAgIHZhciBwcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgICAgICAgIC8vIFJlc3RvcmUgdGhlIGBjYWxsYCBhbmQgYGFwcGx5YCBtZXRob2RzIGZyb20gYEZ1bmN0aW9uYFxuICAgICAgICAgIHByb3RvdHlwZS5jYWxsID0gY2FsbDtcbiAgICAgICAgICBwcm90b3R5cGUuYXBwbHkgPSBhcHBseTtcbiAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY2hhaW5hYmxlTWV0aG9kV3JhcHBlciwgcHJvdG90eXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIHJlZGVmaW5lIGFsbCBwcm9wZXJ0aWVzIChzbG93ISlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFyIGFzc2VydGVyTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdHgpO1xuICAgICAgICAgIGFzc2VydGVyTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXJ0ZXJOYW1lKSB7XG4gICAgICAgICAgICBpZiAoZXhjbHVkZU5hbWVzLmluZGV4T2YoYXNzZXJ0ZXJOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGN0eCwgYXNzZXJ0ZXJOYW1lKTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGFpbmFibGVNZXRob2RXcmFwcGVyLCBhc3NlcnRlck5hbWUsIHBkKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgY2hhaW5hYmxlTWV0aG9kV3JhcHBlcik7XG4gICAgICAgIHJldHVybiBwcm94aWZ5KGNoYWluYWJsZU1ldGhvZFdyYXBwZXIpO1xuICAgICAgfVxuICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvYWRkQ2hhaW5hYmxlTWV0aG9kLmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiFcbiAqIENoYWkgLSBvdmVyd3JpdGVDaGFpbmFibGVNZXRob2QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbnZhciBjaGFpID0gcmVxdWlyZSgnLi4vLi4vY2hhaScpO1xudmFyIHRyYW5zZmVyRmxhZ3MgPSByZXF1aXJlKCcuL3RyYW5zZmVyRmxhZ3MnKTtcblxuLyoqXG4gKiAjIyMgLm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZChjdHgsIG5hbWUsIG1ldGhvZCwgY2hhaW5pbmdCZWhhdmlvcilcbiAqXG4gKiBPdmVyd2l0ZXMgYW4gYWxyZWFkeSBleGlzdGluZyBjaGFpbmFibGUgbWV0aG9kXG4gKiBhbmQgcHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBwcmV2aW91cyBmdW5jdGlvbiBvclxuICogcHJvcGVydHkuICBNdXN0IHJldHVybiBmdW5jdGlvbnMgdG8gYmUgdXNlZCBmb3JcbiAqIG5hbWUuXG4gKlxuICogICAgIHV0aWxzLm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZChjaGFpLkFzc2VydGlvbi5wcm90b3R5cGUsICdsZW5ndGhPZicsXG4gKiAgICAgICBmdW5jdGlvbiAoX3N1cGVyKSB7XG4gKiAgICAgICB9XG4gKiAgICAgLCBmdW5jdGlvbiAoX3N1cGVyKSB7XG4gKiAgICAgICB9XG4gKiAgICAgKTtcbiAqXG4gKiBDYW4gYWxzbyBiZSBhY2Nlc3NlZCBkaXJlY3RseSBmcm9tIGBjaGFpLkFzc2VydGlvbmAuXG4gKlxuICogICAgIGNoYWkuQXNzZXJ0aW9uLm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCgnZm9vJywgZm4sIGZuKTtcbiAqXG4gKiBUaGVuIGNhbiBiZSB1c2VkIGFzIGFueSBvdGhlciBhc3NlcnRpb24uXG4gKlxuICogICAgIGV4cGVjdChteUZvbykudG8uaGF2ZS5sZW5ndGhPZigzKTtcbiAqICAgICBleHBlY3QobXlGb28pLnRvLmhhdmUubGVuZ3RoT2YuYWJvdmUoMyk7XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBvYmplY3Qgd2hvc2UgbWV0aG9kIC8gcHJvcGVydHkgaXMgdG8gYmUgb3ZlcndyaXR0ZW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG9mIG1ldGhvZCAvIHByb3BlcnR5IHRvIG92ZXJ3cml0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIG5hbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNoYWluaW5nQmVoYXZpb3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgZnVuY3Rpb24gdG8gYmUgdXNlZCBmb3IgcHJvcGVydHlcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZChjdHgsIG5hbWUsIG1ldGhvZCwgY2hhaW5pbmdCZWhhdmlvcikge1xuICB2YXIgY2hhaW5hYmxlQmVoYXZpb3IgPSBjdHguX19tZXRob2RzW25hbWVdO1xuXG4gIHZhciBfY2hhaW5pbmdCZWhhdmlvciA9IGNoYWluYWJsZUJlaGF2aW9yLmNoYWluaW5nQmVoYXZpb3I7XG4gIGNoYWluYWJsZUJlaGF2aW9yLmNoYWluaW5nQmVoYXZpb3IgPSBmdW5jdGlvbiBvdmVyd3JpdGluZ0NoYWluYWJsZU1ldGhvZEdldHRlcigpIHtcbiAgICB2YXIgcmVzdWx0ID0gY2hhaW5pbmdCZWhhdmlvcihfY2hhaW5pbmdCZWhhdmlvcikuY2FsbCh0aGlzKTtcbiAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdmFyIG5ld0Fzc2VydGlvbiA9IG5ldyBjaGFpLkFzc2VydGlvbigpO1xuICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgbmV3QXNzZXJ0aW9uKTtcbiAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICB9O1xuXG4gIHZhciBfbWV0aG9kID0gY2hhaW5hYmxlQmVoYXZpb3IubWV0aG9kO1xuICBjaGFpbmFibGVCZWhhdmlvci5tZXRob2QgPSBmdW5jdGlvbiBvdmVyd3JpdGluZ0NoYWluYWJsZU1ldGhvZFdyYXBwZXIoKSB7XG4gICAgdmFyIHJlc3VsdCA9IG1ldGhvZChfbWV0aG9kKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB2YXIgbmV3QXNzZXJ0aW9uID0gbmV3IGNoYWkuQXNzZXJ0aW9uKCk7XG4gICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9vdmVyd3JpdGVDaGFpbmFibGVNZXRob2QuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIVxuICogQ2hhaSAtIGNvbXBhcmVCeUluc3BlY3QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNiBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogTW9kdWxlIGRlcGVuZGFuY2llc1xuICovXG5cbnZhciBpbnNwZWN0ID0gcmVxdWlyZSgnLi9pbnNwZWN0Jyk7XG5cbi8qKlxuICogIyMjIC5jb21wYXJlQnlJbnNwZWN0KG1peGVkLCBtaXhlZClcbiAqXG4gKiBUbyBiZSB1c2VkIGFzIGEgY29tcGFyZUZ1bmN0aW9uIHdpdGggQXJyYXkucHJvdG90eXBlLnNvcnQuIENvbXBhcmVzIGVsZW1lbnRzXG4gKiB1c2luZyBpbnNwZWN0IGluc3RlYWQgb2YgZGVmYXVsdCBiZWhhdmlvciBvZiB1c2luZyB0b1N0cmluZyBzbyB0aGF0IFN5bWJvbHNcbiAqIGFuZCBvYmplY3RzIHdpdGggaXJyZWd1bGFyL21pc3NpbmcgdG9TdHJpbmcgY2FuIHN0aWxsIGJlIHNvcnRlZCB3aXRob3V0IGFcbiAqIFR5cGVFcnJvci5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBmaXJzdCBlbGVtZW50IHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7TWl4ZWR9IHNlY29uZCBlbGVtZW50IHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IC0xIGlmICdhJyBzaG91bGQgY29tZSBiZWZvcmUgJ2InOyBvdGhlcndpc2UgMSBcbiAqIEBuYW1lIGNvbXBhcmVCeUluc3BlY3RcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21wYXJlQnlJbnNwZWN0KGEsIGIpIHtcbiAgcmV0dXJuIGluc3BlY3QoYSkgPCBpbnNwZWN0KGIpID8gLTEgOiAxO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvY29tcGFyZUJ5SW5zcGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gODFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyohXG4gKiBDaGFpIC0gZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNiBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogTW9kdWxlIGRlcGVuZGFuY2llc1xuICovXG5cbnZhciBnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzID0gcmVxdWlyZSgnLi9nZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzJyk7XG5cbi8qKlxuICogIyMjIC5nZXRPd25FbnVtZXJhYmxlUHJvcGVydGllcyhvYmplY3QpXG4gKlxuICogVGhpcyBhbGxvd3MgdGhlIHJldHJpZXZhbCBvZiBkaXJlY3RseS1vd25lZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZFxuICogc3ltYm9scyBvZiBhbiBvYmplY3QuIFRoaXMgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IGJlY2F1c2UgT2JqZWN0LmtleXMgb25seVxuICogcmV0dXJucyBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzLCBub3QgZW51bWVyYWJsZSBwcm9wZXJ0eSBzeW1ib2xzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmNvbmNhdChnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzKG9iaikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcblxuLyogIVxuICogQ2hhaSAtIGNoZWNrRXJyb3IgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNiBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIC5jaGVja0Vycm9yXG4gKlxuICogQ2hlY2tzIHRoYXQgYW4gZXJyb3IgY29uZm9ybXMgdG8gYSBnaXZlbiBzZXQgb2YgY3JpdGVyaWEgYW5kL29yIHJldHJpZXZlcyBpbmZvcm1hdGlvbiBhYm91dCBpdC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbi8qKlxuICogIyMjIC5jb21wYXRpYmxlSW5zdGFuY2UodGhyb3duLCBlcnJvckxpa2UpXG4gKlxuICogQ2hlY2tzIGlmIHR3byBpbnN0YW5jZXMgYXJlIGNvbXBhdGlibGUgKHN0cmljdCBlcXVhbCkuXG4gKiBSZXR1cm5zIGZhbHNlIGlmIGVycm9yTGlrZSBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgRXJyb3IsIGJlY2F1c2UgaW5zdGFuY2VzXG4gKiBjYW4gb25seSBiZSBjb21wYXRpYmxlIGlmIHRoZXkncmUgYm90aCBlcnJvciBpbnN0YW5jZXMuXG4gKlxuICogQG5hbWUgY29tcGF0aWJsZUluc3RhbmNlXG4gKiBAcGFyYW0ge0Vycm9yfSB0aHJvd24gZXJyb3JcbiAqIEBwYXJhbSB7RXJyb3J8RXJyb3JDb25zdHJ1Y3Rvcn0gZXJyb3JMaWtlIG9iamVjdCB0byBjb21wYXJlIGFnYWluc3RcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY29tcGF0aWJsZUluc3RhbmNlKHRocm93biwgZXJyb3JMaWtlKSB7XG4gIHJldHVybiBlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvciAmJiB0aHJvd24gPT09IGVycm9yTGlrZTtcbn1cblxuLyoqXG4gKiAjIyMgLmNvbXBhdGlibGVDb25zdHJ1Y3Rvcih0aHJvd24sIGVycm9yTGlrZSlcbiAqXG4gKiBDaGVja3MgaWYgdHdvIGNvbnN0cnVjdG9ycyBhcmUgY29tcGF0aWJsZS5cbiAqIFRoaXMgZnVuY3Rpb24gY2FuIHJlY2VpdmUgZWl0aGVyIGFuIGVycm9yIGNvbnN0cnVjdG9yIG9yXG4gKiBhbiBlcnJvciBpbnN0YW5jZSBhcyB0aGUgYGVycm9yTGlrZWAgYXJndW1lbnQuXG4gKiBDb25zdHJ1Y3RvcnMgYXJlIGNvbXBhdGlibGUgaWYgdGhleSdyZSB0aGUgc2FtZSBvciBpZiBvbmUgaXNcbiAqIGFuIGluc3RhbmNlIG9mIGFub3RoZXIuXG4gKlxuICogQG5hbWUgY29tcGF0aWJsZUNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0Vycm9yfSB0aHJvd24gZXJyb3JcbiAqIEBwYXJhbSB7RXJyb3J8RXJyb3JDb25zdHJ1Y3Rvcn0gZXJyb3JMaWtlIG9iamVjdCB0byBjb21wYXJlIGFnYWluc3RcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY29tcGF0aWJsZUNvbnN0cnVjdG9yKHRocm93biwgZXJyb3JMaWtlKSB7XG4gIGlmIChlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIC8vIElmIGBlcnJvckxpa2VgIGlzIGFuIGluc3RhbmNlIG9mIGFueSBlcnJvciB3ZSBjb21wYXJlIHRoZWlyIGNvbnN0cnVjdG9yc1xuICAgIHJldHVybiB0aHJvd24uY29uc3RydWN0b3IgPT09IGVycm9yTGlrZS5jb25zdHJ1Y3RvciB8fCB0aHJvd24gaW5zdGFuY2VvZiBlcnJvckxpa2UuY29uc3RydWN0b3I7XG4gIH0gZWxzZSBpZiAoZXJyb3JMaWtlLnByb3RvdHlwZSBpbnN0YW5jZW9mIEVycm9yIHx8IGVycm9yTGlrZSA9PT0gRXJyb3IpIHtcbiAgICAvLyBJZiBgZXJyb3JMaWtlYCBpcyBhIGNvbnN0cnVjdG9yIHRoYXQgaW5oZXJpdHMgZnJvbSBFcnJvciwgd2UgY29tcGFyZSBgdGhyb3duYCB0byBgZXJyb3JMaWtlYCBkaXJlY3RseVxuICAgIHJldHVybiB0aHJvd24uY29uc3RydWN0b3IgPT09IGVycm9yTGlrZSB8fCB0aHJvd24gaW5zdGFuY2VvZiBlcnJvckxpa2U7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogIyMjIC5jb21wYXRpYmxlTWVzc2FnZSh0aHJvd24sIGVyck1hdGNoZXIpXG4gKlxuICogQ2hlY2tzIGlmIGFuIGVycm9yJ3MgbWVzc2FnZSBpcyBjb21wYXRpYmxlIHdpdGggYSBtYXRjaGVyIChTdHJpbmcgb3IgUmVnRXhwKS5cbiAqIElmIHRoZSBtZXNzYWdlIGNvbnRhaW5zIHRoZSBTdHJpbmcgb3IgcGFzc2VzIHRoZSBSZWdFeHAgdGVzdCxcbiAqIGl0IGlzIGNvbnNpZGVyZWQgY29tcGF0aWJsZS5cbiAqXG4gKiBAbmFtZSBjb21wYXRpYmxlTWVzc2FnZVxuICogQHBhcmFtIHtFcnJvcn0gdGhyb3duIGVycm9yXG4gKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGVyck1hdGNoZXIgdG8gbG9vayBmb3IgaW50byB0aGUgbWVzc2FnZVxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjb21wYXRpYmxlTWVzc2FnZSh0aHJvd24sIGVyck1hdGNoZXIpIHtcbiAgdmFyIGNvbXBhcmlzb25TdHJpbmcgPSB0eXBlb2YgdGhyb3duID09PSAnc3RyaW5nJyA/IHRocm93biA6IHRocm93bi5tZXNzYWdlO1xuICBpZiAoZXJyTWF0Y2hlciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiBlcnJNYXRjaGVyLnRlc3QoY29tcGFyaXNvblN0cmluZyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVyck1hdGNoZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGNvbXBhcmlzb25TdHJpbmcuaW5kZXhPZihlcnJNYXRjaGVyKSAhPT0gLTE7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbWFnaWMtbnVtYmVyc1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqICMjIyAuZ2V0RnVuY3Rpb25OYW1lKGNvbnN0cnVjdG9yRm4pXG4gKlxuICogUmV0dXJucyB0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uLlxuICogVGhpcyBhbHNvIGluY2x1ZGVzIGEgcG9seWZpbGwgZnVuY3Rpb24gaWYgYGNvbnN0cnVjdG9yRm4ubmFtZWAgaXMgbm90IGRlZmluZWQuXG4gKlxuICogQG5hbWUgZ2V0RnVuY3Rpb25OYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvckZuXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgZnVuY3Rpb25OYW1lTWF0Y2ggPSAvXFxzKmZ1bmN0aW9uKD86XFxzfFxccypcXC9cXCpbXig/OipcXC8pXStcXCpcXC9cXHMqKSooW15cXChcXC9dKykvO1xuZnVuY3Rpb24gZ2V0RnVuY3Rpb25OYW1lKGNvbnN0cnVjdG9yRm4pIHtcbiAgdmFyIG5hbWUgPSAnJztcbiAgaWYgKHR5cGVvZiBjb25zdHJ1Y3RvckZuLm5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gSGVyZSB3ZSBydW4gYSBwb2x5ZmlsbCBpZiBjb25zdHJ1Y3RvckZuLm5hbWUgaXMgbm90IGRlZmluZWRcbiAgICB2YXIgbWF0Y2ggPSBTdHJpbmcoY29uc3RydWN0b3JGbikubWF0Y2goZnVuY3Rpb25OYW1lTWF0Y2gpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgbmFtZSA9IG1hdGNoWzFdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBuYW1lID0gY29uc3RydWN0b3JGbi5uYW1lO1xuICB9XG5cbiAgcmV0dXJuIG5hbWU7XG59XG5cbi8qKlxuICogIyMjIC5nZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKVxuICpcbiAqIEdldHMgdGhlIGNvbnN0cnVjdG9yIG5hbWUgZm9yIGFuIEVycm9yIGluc3RhbmNlIG9yIGNvbnN0cnVjdG9yIGl0c2VsZi5cbiAqXG4gKiBAbmFtZSBnZXRDb25zdHJ1Y3Rvck5hbWVcbiAqIEBwYXJhbSB7RXJyb3J8RXJyb3JDb25zdHJ1Y3Rvcn0gZXJyb3JMaWtlXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yTmFtZShlcnJvckxpa2UpIHtcbiAgdmFyIGNvbnN0cnVjdG9yTmFtZSA9IGVycm9yTGlrZTtcbiAgaWYgKGVycm9yTGlrZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgY29uc3RydWN0b3JOYW1lID0gZ2V0RnVuY3Rpb25OYW1lKGVycm9yTGlrZS5jb25zdHJ1Y3Rvcik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yTGlrZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIElmIGBlcnJgIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBFcnJvciBpdCBpcyBhbiBlcnJvciBjb25zdHJ1Y3RvciBpdHNlbGYgb3IgYW5vdGhlciBmdW5jdGlvbi5cbiAgICAvLyBJZiB3ZSd2ZSBnb3QgYSBjb21tb24gZnVuY3Rpb24gd2UgZ2V0IGl0cyBuYW1lLCBvdGhlcndpc2Ugd2UgbWF5IG5lZWQgdG8gY3JlYXRlIGEgbmV3IGluc3RhbmNlXG4gICAgLy8gb2YgdGhlIGVycm9yIGp1c3QgaW4gY2FzZSBpdCdzIGEgcG9vcmx5LWNvbnN0cnVjdGVkIGVycm9yLiBQbGVhc2Ugc2VlIGNoYWlqcy9jaGFpL2lzc3Vlcy80NSB0byBrbm93IG1vcmUuXG4gICAgY29uc3RydWN0b3JOYW1lID0gZ2V0RnVuY3Rpb25OYW1lKGVycm9yTGlrZSkudHJpbSgpIHx8XG4gICAgICAgIGdldEZ1bmN0aW9uTmFtZShuZXcgZXJyb3JMaWtlKCkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5ldy1jYXBcbiAgfVxuXG4gIHJldHVybiBjb25zdHJ1Y3Rvck5hbWU7XG59XG5cbi8qKlxuICogIyMjIC5nZXRNZXNzYWdlKGVycm9yTGlrZSlcbiAqXG4gKiBHZXRzIHRoZSBlcnJvciBtZXNzYWdlIGZyb20gYW4gZXJyb3IuXG4gKiBJZiBgZXJyYCBpcyBhIFN0cmluZyBpdHNlbGYsIHdlIHJldHVybiBpdC5cbiAqIElmIHRoZSBlcnJvciBoYXMgbm8gbWVzc2FnZSwgd2UgcmV0dXJuIGFuIGVtcHR5IHN0cmluZy5cbiAqXG4gKiBAbmFtZSBnZXRNZXNzYWdlXG4gKiBAcGFyYW0ge0Vycm9yfFN0cmluZ30gZXJyb3JMaWtlXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGdldE1lc3NhZ2UoZXJyb3JMaWtlKSB7XG4gIHZhciBtc2cgPSAnJztcbiAgaWYgKGVycm9yTGlrZSAmJiBlcnJvckxpa2UubWVzc2FnZSkge1xuICAgIG1zZyA9IGVycm9yTGlrZS5tZXNzYWdlO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvckxpa2UgPT09ICdzdHJpbmcnKSB7XG4gICAgbXNnID0gZXJyb3JMaWtlO1xuICB9XG5cbiAgcmV0dXJuIG1zZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbXBhdGlibGVJbnN0YW5jZTogY29tcGF0aWJsZUluc3RhbmNlLFxuICBjb21wYXRpYmxlQ29uc3RydWN0b3I6IGNvbXBhdGlibGVDb25zdHJ1Y3RvcixcbiAgY29tcGF0aWJsZU1lc3NhZ2U6IGNvbXBhdGlibGVNZXNzYWdlLFxuICBnZXRNZXNzYWdlOiBnZXRNZXNzYWdlLFxuICBnZXRDb25zdHJ1Y3Rvck5hbWU6IGdldENvbnN0cnVjdG9yTmFtZSxcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jaGVjay1lcnJvci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gODNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyohXG4gKiBDaGFpIC0gaXNOYU4gdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNSBTYWt0aGlwcml5YW4gVmFpcmFtYW5pIDx0aGVjaGFyZ2luZ3ZvbGNhbm9AZ21haWwuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgLmlzTmFOKHZhbHVlKVxuICpcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgTmFOIG9yIG5vdC5cbiAqXG4gKiAgICAgdXRpbHMuaXNOYU4oTmFOKTsgLy8gdHJ1ZVxuICpcbiAqIEBwYXJhbSB7VmFsdWV9IFRoZSB2YWx1ZSB3aGljaCBoYXMgdG8gYmUgY2hlY2tlZCBpZiBpdCBpcyBOYU5cbiAqIEBuYW1lIGlzTmFOXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc05hTih2YWx1ZSkge1xuICAvLyBSZWZlciBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtaXNuYW4tbnVtYmVyXG4gIC8vIHNlY3Rpb24ncyBOT1RFLlxuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG4vLyBJZiBFQ01BU2NyaXB0IDYncyBOdW1iZXIuaXNOYU4gaXMgcHJlc2VudCwgcHJlZmVyIHRoYXQuXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlci5pc05hTiB8fCBpc05hTjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvaXNOYU4uanNcbi8vIG1vZHVsZSBpZCA9IDg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIVxuICogY2hhaVxuICogaHR0cDovL2NoYWlqcy5jb21cbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX2NoYWksIHV0aWwpIHtcbiAgLyohXG4gICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gICAqL1xuXG4gIHZhciBBc3NlcnRpb25FcnJvciA9IF9jaGFpLkFzc2VydGlvbkVycm9yXG4gICAgLCBmbGFnID0gdXRpbC5mbGFnO1xuXG4gIC8qIVxuICAgKiBNb2R1bGUgZXhwb3J0LlxuICAgKi9cblxuICBfY2hhaS5Bc3NlcnRpb24gPSBBc3NlcnRpb247XG5cbiAgLyohXG4gICAqIEFzc2VydGlvbiBDb25zdHJ1Y3RvclxuICAgKlxuICAgKiBDcmVhdGVzIG9iamVjdCBmb3IgY2hhaW5pbmcuXG4gICAqXG4gICAqIGBBc3NlcnRpb25gIG9iamVjdHMgY29udGFpbiBtZXRhZGF0YSBpbiB0aGUgZm9ybSBvZiBmbGFncy4gVGhyZWUgZmxhZ3MgY2FuXG4gICAqIGJlIGFzc2lnbmVkIGR1cmluZyBpbnN0YW50aWF0aW9uIGJ5IHBhc3NpbmcgYXJndW1lbnRzIHRvIHRoaXMgY29uc3RydWN0b3I6XG4gICAqXG4gICAqIC0gYG9iamVjdGA6IFRoaXMgZmxhZyBjb250YWlucyB0aGUgdGFyZ2V0IG9mIHRoZSBhc3NlcnRpb24uIEZvciBleGFtcGxlLCBpblxuICAgKiAgIHRoZSBhc3NlcnRpb24gYGV4cGVjdChudW1LaXR0ZW5zKS50by5lcXVhbCg3KTtgLCB0aGUgYG9iamVjdGAgZmxhZyB3aWxsXG4gICAqICAgY29udGFpbiBgbnVtS2l0dGVuc2Agc28gdGhhdCB0aGUgYGVxdWFsYCBhc3NlcnRpb24gY2FuIHJlZmVyZW5jZSBpdCB3aGVuXG4gICAqICAgbmVlZGVkLlxuICAgKlxuICAgKiAtIGBtZXNzYWdlYDogVGhpcyBmbGFnIGNvbnRhaW5zIGFuIG9wdGlvbmFsIGN1c3RvbSBlcnJvciBtZXNzYWdlIHRvIGJlXG4gICAqICAgcHJlcGVuZGVkIHRvIHRoZSBlcnJvciBtZXNzYWdlIHRoYXQncyBnZW5lcmF0ZWQgYnkgdGhlIGFzc2VydGlvbiB3aGVuIGl0XG4gICAqICAgZmFpbHMuXG4gICAqXG4gICAqIC0gYHNzZmlgOiBUaGlzIGZsYWcgc3RhbmRzIGZvciBcInN0YXJ0IHN0YWNrIGZ1bmN0aW9uIGluZGljYXRvclwiLiBJdFxuICAgKiAgIGNvbnRhaW5zIGEgZnVuY3Rpb24gcmVmZXJlbmNlIHRoYXQgc2VydmVzIGFzIHRoZSBzdGFydGluZyBwb2ludCBmb3JcbiAgICogICByZW1vdmluZyBmcmFtZXMgZnJvbSB0aGUgc3RhY2sgdHJhY2Ugb2YgdGhlIGVycm9yIHRoYXQncyBjcmVhdGVkIGJ5IHRoZVxuICAgKiAgIGFzc2VydGlvbiB3aGVuIGl0IGZhaWxzLiBUaGUgZ29hbCBpcyB0byBwcm92aWRlIGEgY2xlYW5lciBzdGFjayB0cmFjZSB0b1xuICAgKiAgIGVuZCB1c2VycyBieSByZW1vdmluZyBDaGFpJ3MgaW50ZXJuYWwgZnVuY3Rpb25zLiBOb3RlIHRoYXQgaXQgb25seSB3b3Jrc1xuICAgKiAgIGluIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgYEVycm9yLmNhcHR1cmVTdGFja1RyYWNlYCwgYW5kIG9ubHkgd2hlblxuICAgKiAgIGBDaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2tgIGhhc24ndCBiZWVuIHNldCB0byBgZmFsc2VgLlxuICAgKlxuICAgKiAtIGBsb2NrU3NmaWA6IFRoaXMgZmxhZyBjb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYHNzZmlgIGZsYWdcbiAgICogICBzaG91bGQgcmV0YWluIGl0cyBjdXJyZW50IHZhbHVlLCBldmVuIGFzIGFzc2VydGlvbnMgYXJlIGNoYWluZWQgb2ZmIG9mXG4gICAqICAgdGhpcyBvYmplY3QuIFRoaXMgaXMgdXN1YWxseSBzZXQgdG8gYHRydWVgIHdoZW4gY3JlYXRpbmcgYSBuZXcgYXNzZXJ0aW9uXG4gICAqICAgZnJvbSB3aXRoaW4gYW5vdGhlciBhc3NlcnRpb24uIEl0J3MgYWxzbyB0ZW1wb3JhcmlseSBzZXQgdG8gYHRydWVgIGJlZm9yZVxuICAgKiAgIGFuIG92ZXJ3cml0dGVuIGFzc2VydGlvbiBnZXRzIGNhbGxlZCBieSB0aGUgb3ZlcndyaXRpbmcgYXNzZXJ0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSBvYmogdGFyZ2V0IG9mIHRoZSBhc3NlcnRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyAob3B0aW9uYWwpIGN1c3RvbSBlcnJvciBtZXNzYWdlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHNzZmkgKG9wdGlvbmFsKSBzdGFydGluZyBwb2ludCBmb3IgcmVtb3Zpbmcgc3RhY2sgZnJhbWVzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbG9ja1NzZmkgKG9wdGlvbmFsKSB3aGV0aGVyIG9yIG5vdCB0aGUgc3NmaSBmbGFnIGlzIGxvY2tlZFxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgZnVuY3Rpb24gQXNzZXJ0aW9uIChvYmosIG1zZywgc3NmaSwgbG9ja1NzZmkpIHtcbiAgICBmbGFnKHRoaXMsICdzc2ZpJywgc3NmaSB8fCBBc3NlcnRpb24pO1xuICAgIGZsYWcodGhpcywgJ2xvY2tTc2ZpJywgbG9ja1NzZmkpO1xuICAgIGZsYWcodGhpcywgJ29iamVjdCcsIG9iaik7XG4gICAgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG5cbiAgICByZXR1cm4gdXRpbC5wcm94aWZ5KHRoaXMpO1xuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFzc2VydGlvbiwgJ2luY2x1ZGVTdGFjaycsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS53YXJuKCdBc3NlcnRpb24uaW5jbHVkZVN0YWNrIGlzIGRlcHJlY2F0ZWQsIHVzZSBjaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2sgaW5zdGVhZC4nKTtcbiAgICAgIHJldHVybiBjb25maWcuaW5jbHVkZVN0YWNrO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgY29uc29sZS53YXJuKCdBc3NlcnRpb24uaW5jbHVkZVN0YWNrIGlzIGRlcHJlY2F0ZWQsIHVzZSBjaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2sgaW5zdGVhZC4nKTtcbiAgICAgIGNvbmZpZy5pbmNsdWRlU3RhY2sgPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBc3NlcnRpb24sICdzaG93RGlmZicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS53YXJuKCdBc3NlcnRpb24uc2hvd0RpZmYgaXMgZGVwcmVjYXRlZCwgdXNlIGNoYWkuY29uZmlnLnNob3dEaWZmIGluc3RlYWQuJyk7XG4gICAgICByZXR1cm4gY29uZmlnLnNob3dEaWZmO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgY29uc29sZS53YXJuKCdBc3NlcnRpb24uc2hvd0RpZmYgaXMgZGVwcmVjYXRlZCwgdXNlIGNoYWkuY29uZmlnLnNob3dEaWZmIGluc3RlYWQuJyk7XG4gICAgICBjb25maWcuc2hvd0RpZmYgPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgIHV0aWwuYWRkUHJvcGVydHkodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuKTtcbiAgfTtcblxuICBBc3NlcnRpb24uYWRkTWV0aG9kID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gICAgdXRpbC5hZGRNZXRob2QodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuKTtcbiAgfTtcblxuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kID0gZnVuY3Rpb24gKG5hbWUsIGZuLCBjaGFpbmluZ0JlaGF2aW9yKSB7XG4gICAgdXRpbC5hZGRDaGFpbmFibGVNZXRob2QodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuLCBjaGFpbmluZ0JlaGF2aW9yKTtcbiAgfTtcblxuICBBc3NlcnRpb24ub3ZlcndyaXRlUHJvcGVydHkgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgICB1dGlsLm92ZXJ3cml0ZVByb3BlcnR5KHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbik7XG4gIH07XG5cbiAgQXNzZXJ0aW9uLm92ZXJ3cml0ZU1ldGhvZCA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgIHV0aWwub3ZlcndyaXRlTWV0aG9kKHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbik7XG4gIH07XG5cbiAgQXNzZXJ0aW9uLm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCA9IGZ1bmN0aW9uIChuYW1lLCBmbiwgY2hhaW5pbmdCZWhhdmlvcikge1xuICAgIHV0aWwub3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kKHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbiwgY2hhaW5pbmdCZWhhdmlvcik7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuYXNzZXJ0KGV4cHJlc3Npb24sIG1lc3NhZ2UsIG5lZ2F0ZU1lc3NhZ2UsIGV4cGVjdGVkLCBhY3R1YWwsIHNob3dEaWZmKVxuICAgKlxuICAgKiBFeGVjdXRlcyBhbiBleHByZXNzaW9uIGFuZCBjaGVjayBleHBlY3RhdGlvbnMuIFRocm93cyBBc3NlcnRpb25FcnJvciBmb3IgcmVwb3J0aW5nIGlmIHRlc3QgZG9lc24ndCBwYXNzLlxuICAgKlxuICAgKiBAbmFtZSBhc3NlcnRcbiAgICogQHBhcmFtIHtQaGlsb3NvcGhpY2FsfSBleHByZXNzaW9uIHRvIGJlIHRlc3RlZFxuICAgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gbWVzc2FnZSBvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgbWVzc2FnZSB0byBkaXNwbGF5IGlmIGV4cHJlc3Npb24gZmFpbHNcbiAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IG5lZ2F0ZWRNZXNzYWdlIG9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBuZWdhdGVkTWVzc2FnZSB0byBkaXNwbGF5IGlmIG5lZ2F0ZWQgZXhwcmVzc2lvbiBmYWlsc1xuICAgKiBAcGFyYW0ge01peGVkfSBleHBlY3RlZCB2YWx1ZSAocmVtZW1iZXIgdG8gY2hlY2sgZm9yIG5lZ2F0aW9uKVxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWwgKG9wdGlvbmFsKSB3aWxsIGRlZmF1bHQgdG8gYHRoaXMub2JqYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHNob3dEaWZmIChvcHRpb25hbCkgd2hlbiBzZXQgdG8gYHRydWVgLCBhc3NlcnQgd2lsbCBkaXNwbGF5IGEgZGlmZiBpbiBhZGRpdGlvbiB0byB0aGUgbWVzc2FnZSBpZiBleHByZXNzaW9uIGZhaWxzXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBBc3NlcnRpb24ucHJvdG90eXBlLmFzc2VydCA9IGZ1bmN0aW9uIChleHByLCBtc2csIG5lZ2F0ZU1zZywgZXhwZWN0ZWQsIF9hY3R1YWwsIHNob3dEaWZmKSB7XG4gICAgdmFyIG9rID0gdXRpbC50ZXN0KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGZhbHNlICE9PSBzaG93RGlmZikgc2hvd0RpZmYgPSB0cnVlO1xuICAgIGlmICh1bmRlZmluZWQgPT09IGV4cGVjdGVkICYmIHVuZGVmaW5lZCA9PT0gX2FjdHVhbCkgc2hvd0RpZmYgPSBmYWxzZTtcbiAgICBpZiAodHJ1ZSAhPT0gY29uZmlnLnNob3dEaWZmKSBzaG93RGlmZiA9IGZhbHNlO1xuXG4gICAgaWYgKCFvaykge1xuICAgICAgbXNnID0gdXRpbC5nZXRNZXNzYWdlKHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB2YXIgYWN0dWFsID0gdXRpbC5nZXRBY3R1YWwodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihtc2csIHtcbiAgICAgICAgICBhY3R1YWw6IGFjdHVhbFxuICAgICAgICAsIGV4cGVjdGVkOiBleHBlY3RlZFxuICAgICAgICAsIHNob3dEaWZmOiBzaG93RGlmZlxuICAgICAgfSwgKGNvbmZpZy5pbmNsdWRlU3RhY2spID8gdGhpcy5hc3NlcnQgOiBmbGFnKHRoaXMsICdzc2ZpJykpO1xuICAgIH1cbiAgfTtcblxuICAvKiFcbiAgICogIyMjIC5fb2JqXG4gICAqXG4gICAqIFF1aWNrIHJlZmVyZW5jZSB0byBzdG9yZWQgYGFjdHVhbGAgdmFsdWUgZm9yIHBsdWdpbiBkZXZlbG9wZXJzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFzc2VydGlvbi5wcm90b3R5cGUsICdfb2JqJyxcbiAgICB7IGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgICB9XG4gICAgLCBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgZmxhZyh0aGlzLCAnb2JqZWN0JywgdmFsKTtcbiAgICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS9hc3NlcnRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIVxuICogY2hhaVxuICogaHR0cDovL2NoYWlqcy5jb21cbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjaGFpLCBfKSB7XG4gIHZhciBBc3NlcnRpb24gPSBjaGFpLkFzc2VydGlvblxuICAgICwgQXNzZXJ0aW9uRXJyb3IgPSBjaGFpLkFzc2VydGlvbkVycm9yXG4gICAgLCBmbGFnID0gXy5mbGFnO1xuXG4gIC8qKlxuICAgKiAjIyMgTGFuZ3VhZ2UgQ2hhaW5zXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgYXJlIHByb3ZpZGVkIGFzIGNoYWluYWJsZSBnZXR0ZXJzIHRvIGltcHJvdmUgdGhlIHJlYWRhYmlsaXR5XG4gICAqIG9mIHlvdXIgYXNzZXJ0aW9ucy5cbiAgICpcbiAgICogKipDaGFpbnMqKlxuICAgKlxuICAgKiAtIHRvXG4gICAqIC0gYmVcbiAgICogLSBiZWVuXG4gICAqIC0gaXNcbiAgICogLSB0aGF0XG4gICAqIC0gd2hpY2hcbiAgICogLSBhbmRcbiAgICogLSBoYXNcbiAgICogLSBoYXZlXG4gICAqIC0gd2l0aFxuICAgKiAtIGF0XG4gICAqIC0gb2ZcbiAgICogLSBzYW1lXG4gICAqIC0gYnV0XG4gICAqIC0gZG9lc1xuICAgKlxuICAgKiBAbmFtZSBsYW5ndWFnZSBjaGFpbnNcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgWyAndG8nLCAnYmUnLCAnYmVlbidcbiAgLCAnaXMnLCAnYW5kJywgJ2hhcycsICdoYXZlJ1xuICAsICd3aXRoJywgJ3RoYXQnLCAnd2hpY2gnLCAnYXQnXG4gICwgJ29mJywgJ3NhbWUnLCAnYnV0JywgJ2RvZXMnIF0uZm9yRWFjaChmdW5jdGlvbiAoY2hhaW4pIHtcbiAgICBBc3NlcnRpb24uYWRkUHJvcGVydHkoY2hhaW4pO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5ub3RcbiAgICpcbiAgICogTmVnYXRlcyBhbGwgYXNzZXJ0aW9ucyB0aGF0IGZvbGxvdyBpbiB0aGUgY2hhaW4uXG4gICAqXG4gICAqICAgICBleHBlY3QoZnVuY3Rpb24gKCkge30pLnRvLm5vdC50aHJvdygpO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8ubm90LmhhdmUucHJvcGVydHkoJ2InKTtcbiAgICogICAgIGV4cGVjdChbMSwgMl0pLnRvLmJlLmFuKCdhcnJheScpLnRoYXQuZG9lcy5ub3QuaW5jbHVkZSgzKTtcbiAgICpcbiAgICogSnVzdCBiZWNhdXNlIHlvdSBjYW4gbmVnYXRlIGFueSBhc3NlcnRpb24gd2l0aCBgLm5vdGAgZG9lc24ndCBtZWFuIHlvdVxuICAgKiBzaG91bGQuIFdpdGggZ3JlYXQgcG93ZXIgY29tZXMgZ3JlYXQgcmVzcG9uc2liaWxpdHkuIEl0J3Mgb2Z0ZW4gYmVzdCB0b1xuICAgKiBhc3NlcnQgdGhhdCB0aGUgb25lIGV4cGVjdGVkIG91dHB1dCB3YXMgcHJvZHVjZWQsIHJhdGhlciB0aGFuIGFzc2VydGluZ1xuICAgKiB0aGF0IG9uZSBvZiBjb3VudGxlc3MgdW5leHBlY3RlZCBvdXRwdXRzIHdhc24ndCBwcm9kdWNlZC4gU2VlIGluZGl2aWR1YWxcbiAgICogYXNzZXJ0aW9ucyBmb3Igc3BlY2lmaWMgZ3VpZGFuY2UuXG4gICAqXG4gICAqICAgICBleHBlY3QoMikudG8uZXF1YWwoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMikudG8ubm90LmVxdWFsKDEpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQG5hbWUgbm90XG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnbm90JywgZnVuY3Rpb24gKCkge1xuICAgIGZsYWcodGhpcywgJ25lZ2F0ZScsIHRydWUpO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5kZWVwXG4gICAqXG4gICAqIENhdXNlcyBhbGwgYC5lcXVhbGAsIGAuaW5jbHVkZWAsIGAubWVtYmVyc2AsIGAua2V5c2AsIGFuZCBgLnByb3BlcnR5YFxuICAgKiBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbiB0byB1c2UgZGVlcCBlcXVhbGl0eSBpbnN0ZWFkIG9mIHN0cmljdFxuICAgKiAoYD09PWApIGVxdWFsaXR5LiBTZWUgdGhlIGBkZWVwLWVxbGAgcHJvamVjdCBwYWdlIGZvciBpbmZvIG9uIHRoZSBkZWVwXG4gICAqIGVxdWFsaXR5IGFsZ29yaXRobTogaHR0cHM6Ly9naXRodWIuY29tL2NoYWlqcy9kZWVwLWVxbC5cbiAgICpcbiAgICogICAgIC8vIFRhcmdldCBvYmplY3QgZGVlcGx5IChidXQgbm90IHN0cmljdGx5KSBlcXVhbHMgYHthOiAxfWBcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmRlZXAuZXF1YWwoe2E6IDF9KTtcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLm5vdC5lcXVhbCh7YTogMX0pO1xuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IGFycmF5IGRlZXBseSAoYnV0IG5vdCBzdHJpY3RseSkgaW5jbHVkZXMgYHthOiAxfWBcbiAgICogICAgIGV4cGVjdChbe2E6IDF9XSkudG8uZGVlcC5pbmNsdWRlKHthOiAxfSk7XG4gICAqICAgICBleHBlY3QoW3thOiAxfV0pLnRvLm5vdC5pbmNsdWRlKHthOiAxfSk7XG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgb2JqZWN0IGRlZXBseSAoYnV0IG5vdCBzdHJpY3RseSkgaW5jbHVkZXMgYHg6IHthOiAxfWBcbiAgICogICAgIGV4cGVjdCh7eDoge2E6IDF9fSkudG8uZGVlcC5pbmNsdWRlKHt4OiB7YTogMX19KTtcbiAgICogICAgIGV4cGVjdCh7eDoge2E6IDF9fSkudG8ubm90LmluY2x1ZGUoe3g6IHthOiAxfX0pO1xuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IGFycmF5IGRlZXBseSAoYnV0IG5vdCBzdHJpY3RseSkgaGFzIG1lbWJlciBge2E6IDF9YFxuICAgKiAgICAgZXhwZWN0KFt7YTogMX1dKS50by5oYXZlLmRlZXAubWVtYmVycyhbe2E6IDF9XSk7XG4gICAqICAgICBleHBlY3QoW3thOiAxfV0pLnRvLm5vdC5oYXZlLm1lbWJlcnMoW3thOiAxfV0pO1xuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IHNldCBkZWVwbHkgKGJ1dCBub3Qgc3RyaWN0bHkpIGhhcyBrZXkgYHthOiAxfWBcbiAgICogICAgIGV4cGVjdChuZXcgU2V0KFt7YTogMX1dKSkudG8uaGF2ZS5kZWVwLmtleXMoW3thOiAxfV0pO1xuICAgKiAgICAgZXhwZWN0KG5ldyBTZXQoW3thOiAxfV0pKS50by5ub3QuaGF2ZS5rZXlzKFt7YTogMX1dKTtcbiAgICpcbiAgICogICAgIC8vIFRhcmdldCBvYmplY3QgZGVlcGx5IChidXQgbm90IHN0cmljdGx5KSBoYXMgcHJvcGVydHkgYHg6IHthOiAxfWBcbiAgICogICAgIGV4cGVjdCh7eDoge2E6IDF9fSkudG8uaGF2ZS5kZWVwLnByb3BlcnR5KCd4Jywge2E6IDF9KTtcbiAgICogICAgIGV4cGVjdCh7eDoge2E6IDF9fSkudG8ubm90LmhhdmUucHJvcGVydHkoJ3gnLCB7YTogMX0pO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnZGVlcCcsIGZ1bmN0aW9uICgpIHtcbiAgICBmbGFnKHRoaXMsICdkZWVwJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLm5lc3RlZFxuICAgKlxuICAgKiBFbmFibGVzIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gaW4gYWxsIGAucHJvcGVydHlgIGFuZCBgLmluY2x1ZGVgXG4gICAqIGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlIGNoYWluLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiB7YjogWyd4JywgJ3knXX19KS50by5oYXZlLm5lc3RlZC5wcm9wZXJ0eSgnYS5iWzFdJyk7XG4gICAqICAgICBleHBlY3Qoe2E6IHtiOiBbJ3gnLCAneSddfX0pLnRvLm5lc3RlZC5pbmNsdWRlKHsnYS5iWzFdJzogJ3knfSk7XG4gICAqXG4gICAqIElmIGAuYCBvciBgW11gIGFyZSBwYXJ0IG9mIGFuIGFjdHVhbCBwcm9wZXJ0eSBuYW1lLCB0aGV5IGNhbiBiZSBlc2NhcGVkIGJ5XG4gICAqIGFkZGluZyB0d28gYmFja3NsYXNoZXMgYmVmb3JlIHRoZW0uXG4gICAqXG4gICAqICAgICBleHBlY3QoeycuYSc6IHsnW2JdJzogJ3gnfX0pLnRvLmhhdmUubmVzdGVkLnByb3BlcnR5KCdcXFxcLmEuXFxcXFtiXFxcXF0nKTtcbiAgICogICAgIGV4cGVjdCh7Jy5hJzogeydbYl0nOiAneCd9fSkudG8ubmVzdGVkLmluY2x1ZGUoeydcXFxcLmEuXFxcXFtiXFxcXF0nOiAneCd9KTtcbiAgICpcbiAgICogYC5uZXN0ZWRgIGNhbm5vdCBiZSBjb21iaW5lZCB3aXRoIGAub3duYC5cbiAgICpcbiAgICogQG5hbWUgbmVzdGVkXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnbmVzdGVkJywgZnVuY3Rpb24gKCkge1xuICAgIGZsYWcodGhpcywgJ25lc3RlZCcsIHRydWUpO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5vd25cbiAgICpcbiAgICogQ2F1c2VzIGFsbCBgLnByb3BlcnR5YCBhbmQgYC5pbmNsdWRlYCBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpblxuICAgKiB0byBpZ25vcmUgaW5oZXJpdGVkIHByb3BlcnRpZXMuXG4gICAqXG4gICAqICAgICBPYmplY3QucHJvdG90eXBlLmIgPSAyO1xuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5vd24ucHJvcGVydHkoJ2EnKTtcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmhhdmUucHJvcGVydHkoJ2InKS5idXQubm90Lm93bi5wcm9wZXJ0eSgnYicpOyBcbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLm93bi5pbmNsdWRlKHthOiAxfSk7XG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5pbmNsdWRlKHtiOiAyfSkuYnV0Lm5vdC5vd24uaW5jbHVkZSh7YjogMn0pO1xuICAgKlxuICAgKiBgLm93bmAgY2Fubm90IGJlIGNvbWJpbmVkIHdpdGggYC5uZXN0ZWRgLlxuICAgKlxuICAgKiBAbmFtZSBvd25cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdvd24nLCBmdW5jdGlvbiAoKSB7XG4gICAgZmxhZyh0aGlzLCAnb3duJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLm9yZGVyZWRcbiAgICpcbiAgICogQ2F1c2VzIGFsbCBgLm1lbWJlcnNgIGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlIGNoYWluIHRvIHJlcXVpcmUgdGhhdFxuICAgKiBtZW1iZXJzIGJlIGluIHRoZSBzYW1lIG9yZGVyLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyXSkudG8uaGF2ZS5vcmRlcmVkLm1lbWJlcnMoWzEsIDJdKVxuICAgKiAgICAgICAuYnV0Lm5vdC5oYXZlLm9yZGVyZWQubWVtYmVycyhbMiwgMV0pO1xuICAgKlxuICAgKiBXaGVuIGAuaW5jbHVkZWAgYW5kIGAub3JkZXJlZGAgYXJlIGNvbWJpbmVkLCB0aGUgb3JkZXJpbmcgYmVnaW5zIGF0IHRoZVxuICAgKiBzdGFydCBvZiBib3RoIGFycmF5cy5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmluY2x1ZGUub3JkZXJlZC5tZW1iZXJzKFsxLCAyXSlcbiAgICogICAgICAgLmJ1dC5ub3QuaW5jbHVkZS5vcmRlcmVkLm1lbWJlcnMoWzIsIDNdKTtcbiAgICpcbiAgICogQG5hbWUgb3JkZXJlZFxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ29yZGVyZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgZmxhZyh0aGlzLCAnb3JkZXJlZCcsIHRydWUpO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5hbnlcbiAgICpcbiAgICogQ2F1c2VzIGFsbCBgLmtleXNgIGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlIGNoYWluIHRvIG9ubHkgcmVxdWlyZSB0aGF0XG4gICAqIHRoZSB0YXJnZXQgaGF2ZSBhdCBsZWFzdCBvbmUgb2YgdGhlIGdpdmVuIGtleXMuIFRoaXMgaXMgdGhlIG9wcG9zaXRlIG9mXG4gICAqIGAuYWxsYCwgd2hpY2ggcmVxdWlyZXMgdGhhdCB0aGUgdGFyZ2V0IGhhdmUgYWxsIG9mIHRoZSBnaXZlbiBrZXlzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxLCBiOiAyfSkudG8ubm90LmhhdmUuYW55LmtleXMoJ2MnLCAnZCcpO1xuICAgKlxuICAgKiBTZWUgdGhlIGAua2V5c2AgZG9jIGZvciBndWlkYW5jZSBvbiB3aGVuIHRvIHVzZSBgLmFueWAgb3IgYC5hbGxgLlxuICAgKlxuICAgKiBAbmFtZSBhbnlcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdhbnknLCBmdW5jdGlvbiAoKSB7XG4gICAgZmxhZyh0aGlzLCAnYW55JywgdHJ1ZSk7XG4gICAgZmxhZyh0aGlzLCAnYWxsJywgZmFsc2UpO1xuICB9KTtcblxuXG4gIC8qKlxuICAgKiAjIyMgLmFsbFxuICAgKlxuICAgKiBDYXVzZXMgYWxsIGAua2V5c2AgYXNzZXJ0aW9ucyB0aGF0IGZvbGxvdyBpbiB0aGUgY2hhaW4gdG8gcmVxdWlyZSB0aGF0IHRoZVxuICAgKiB0YXJnZXQgaGF2ZSBhbGwgb2YgdGhlIGdpdmVuIGtleXMuIFRoaXMgaXMgdGhlIG9wcG9zaXRlIG9mIGAuYW55YCwgd2hpY2hcbiAgICogb25seSByZXF1aXJlcyB0aGF0IHRoZSB0YXJnZXQgaGF2ZSBhdCBsZWFzdCBvbmUgb2YgdGhlIGdpdmVuIGtleXMuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDJ9KS50by5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICpcbiAgICogTm90ZSB0aGF0IGAuYWxsYCBpcyB1c2VkIGJ5IGRlZmF1bHQgd2hlbiBuZWl0aGVyIGAuYWxsYCBub3IgYC5hbnlgIGFyZVxuICAgKiBhZGRlZCBlYXJsaWVyIGluIHRoZSBjaGFpbi4gSG93ZXZlciwgaXQncyBvZnRlbiBiZXN0IHRvIGFkZCBgLmFsbGAgYW55d2F5XG4gICAqIGJlY2F1c2UgaXQgaW1wcm92ZXMgcmVhZGFiaWxpdHkuXG4gICAqXG4gICAqIFNlZSB0aGUgYC5rZXlzYCBkb2MgZm9yIGd1aWRhbmNlIG9uIHdoZW4gdG8gdXNlIGAuYW55YCBvciBgLmFsbGAuXG4gICAqXG4gICAqIEBuYW1lIGFsbFxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ2FsbCcsIGZ1bmN0aW9uICgpIHtcbiAgICBmbGFnKHRoaXMsICdhbGwnLCB0cnVlKTtcbiAgICBmbGFnKHRoaXMsICdhbnknLCBmYWxzZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmEodHlwZVssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0J3MgdHlwZSBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gc3RyaW5nIGB0eXBlYC4gVHlwZXNcbiAgICogYXJlIGNhc2UgaW5zZW5zaXRpdmUuIFNlZSB0aGUgYHR5cGUtZGV0ZWN0YCBwcm9qZWN0IHBhZ2UgZm9yIGluZm8gb24gdGhlXG4gICAqIHR5cGUgZGV0ZWN0aW9uIGFsZ29yaXRobTogaHR0cHM6Ly9naXRodWIuY29tL2NoYWlqcy90eXBlLWRldGVjdC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uYmUuYSgnc3RyaW5nJyk7XG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5iZS5hbignb2JqZWN0Jyk7XG4gICAqICAgICBleHBlY3QobnVsbCkudG8uYmUuYSgnbnVsbCcpO1xuICAgKiAgICAgZXhwZWN0KHVuZGVmaW5lZCkudG8uYmUuYW4oJ3VuZGVmaW5lZCcpO1xuICAgKiAgICAgZXhwZWN0KG5ldyBFcnJvcikudG8uYmUuYW4oJ2Vycm9yJyk7XG4gICAqICAgICBleHBlY3QoUHJvbWlzZS5yZXNvbHZlKCkpLnRvLmJlLmEoJ3Byb21pc2UnKTtcbiAgICogICAgIGV4cGVjdChuZXcgRmxvYXQzMkFycmF5KS50by5iZS5hKCdmbG9hdDMyYXJyYXknKTtcbiAgICogICAgIGV4cGVjdChTeW1ib2woKSkudG8uYmUuYSgnc3ltYm9sJyk7XG4gICAqXG4gICAqIGAuYWAgc3VwcG9ydHMgb2JqZWN0cyB0aGF0IGhhdmUgYSBjdXN0b20gdHlwZSBzZXQgdmlhIGBTeW1ib2wudG9TdHJpbmdUYWdgLlxuICAgKlxuICAgKiAgICAgdmFyIG15T2JqID0ge1xuICAgKiAgICAgICBbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ215Q3VzdG9tVHlwZSdcbiAgICogICAgIH07XG4gICAqXG4gICAqICAgICBleHBlY3QobXlPYmopLnRvLmJlLmEoJ215Q3VzdG9tVHlwZScpLmJ1dC5ub3QuYW4oJ29iamVjdCcpO1xuICAgKlxuICAgKiBJdCdzIG9mdGVuIGJlc3QgdG8gdXNlIGAuYWAgdG8gY2hlY2sgYSB0YXJnZXQncyB0eXBlIGJlZm9yZSBtYWtpbmcgbW9yZVxuICAgKiBhc3NlcnRpb25zIG9uIHRoZSBzYW1lIHRhcmdldC4gVGhhdCB3YXksIHlvdSBhdm9pZCB1bmV4cGVjdGVkIGJlaGF2aW9yIGZyb21cbiAgICogYW55IGFzc2VydGlvbiB0aGF0IGRvZXMgZGlmZmVyZW50IHRoaW5ncyBiYXNlZCBvbiB0aGUgdGFyZ2V0J3MgdHlwZS5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmJlLmFuKCdhcnJheScpLnRoYXQuaW5jbHVkZXMoMik7XG4gICAqICAgICBleHBlY3QoW10pLnRvLmJlLmFuKCdhcnJheScpLnRoYXQuaXMuZW1wdHk7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuYWAuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdCB0b1xuICAgKiBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0IGlzIHRoZSBleHBlY3RlZCB0eXBlLCByYXRoZXIgdGhhbiBhc3NlcnRpbmcgdGhhdCBpdFxuICAgKiBpc24ndCBvbmUgb2YgbWFueSB1bmV4cGVjdGVkIHR5cGVzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5iZS5hKCdzdHJpbmcnKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8ubm90LmJlLmFuKCdhcnJheScpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5hYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgdG9cbiAgICogc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmRcbiAgICogYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uYmUuYSgnc3RyaW5nJywgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KDEsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5hKCdzdHJpbmcnKTtcbiAgICpcbiAgICogYC5hYCBjYW4gYWxzbyBiZSB1c2VkIGFzIGEgbGFuZ3VhZ2UgY2hhaW4gdG8gaW1wcm92ZSB0aGUgcmVhZGFiaWxpdHkgb2ZcbiAgICogeW91ciBhc3NlcnRpb25zLiBcbiAgICpcbiAgICogICAgIGV4cGVjdCh7YjogMn0pLnRvLmhhdmUuYS5wcm9wZXJ0eSgnYicpO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5hbmAgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5hYC5cbiAgICpcbiAgICogQG5hbWUgYVxuICAgKiBAYWxpYXMgYW5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFuICh0eXBlLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBhcnRpY2xlID0gflsgJ2EnLCAnZScsICdpJywgJ28nLCAndScgXS5pbmRleE9mKHR5cGUuY2hhckF0KDApKSA/ICdhbiAnIDogJ2EgJztcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICB0eXBlID09PSBfLnR5cGUob2JqKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlICcgKyBhcnRpY2xlICsgdHlwZVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgJyArIGFydGljbGUgKyB0eXBlXG4gICAgKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoJ2FuJywgYW4pO1xuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKCdhJywgYW4pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmluY2x1ZGUodmFsWywgbXNnXSlcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGEgc3RyaW5nLCBgLmluY2x1ZGVgIGFzc2VydHMgdGhhdCB0aGUgZ2l2ZW4gc3RyaW5nIGB2YWxgXG4gICAqIGlzIGEgc3Vic3RyaW5nIG9mIHRoZSB0YXJnZXQuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2Zvb2JhcicpLnRvLmluY2x1ZGUoJ2ZvbycpO1xuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXMgYW4gYXJyYXksIGAuaW5jbHVkZWAgYXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBgdmFsYCBpcyBhXG4gICAqIG1lbWJlciBvZiB0aGUgdGFyZ2V0LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaW5jbHVkZSgyKTtcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGFuIG9iamVjdCwgYC5pbmNsdWRlYCBhc3NlcnRzIHRoYXQgdGhlIGdpdmVuIG9iamVjdFxuICAgKiBgdmFsYCdzIHByb3BlcnRpZXMgYXJlIGEgc3Vic2V0IG9mIHRoZSB0YXJnZXQncyBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxLCBiOiAyLCBjOiAzfSkudG8uaW5jbHVkZSh7YTogMSwgYjogMn0pO1xuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXMgYSBTZXQgb3IgV2Vha1NldCwgYC5pbmNsdWRlYCBhc3NlcnRzIHRoYXQgdGhlIGdpdmVuIGB2YWxgIGlzIGFcbiAgICogbWVtYmVyIG9mIHRoZSB0YXJnZXQuIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtIGlzIHVzZWQuXG4gICAqXG4gICAqICAgICBleHBlY3QobmV3IFNldChbMSwgMl0pKS50by5pbmNsdWRlKDIpO1xuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXMgYSBNYXAsIGAuaW5jbHVkZWAgYXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBgdmFsYCBpcyBvbmUgb2ZcbiAgICogdGhlIHZhbHVlcyBvZiB0aGUgdGFyZ2V0LiBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobSBpcyB1c2VkLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KG5ldyBNYXAoW1snYScsIDFdLCBbJ2InLCAyXV0pKS50by5pbmNsdWRlKDIpO1xuICAgKlxuICAgKiBCZWNhdXNlIGAuaW5jbHVkZWAgZG9lcyBkaWZmZXJlbnQgdGhpbmdzIGJhc2VkIG9uIHRoZSB0YXJnZXQncyB0eXBlLCBpdCdzXG4gICAqIGltcG9ydGFudCB0byBjaGVjayB0aGUgdGFyZ2V0J3MgdHlwZSBiZWZvcmUgdXNpbmcgYC5pbmNsdWRlYC4gU2VlIHRoZSBgLmFgXG4gICAqIGRvYyBmb3IgaW5mbyBvbiB0ZXN0aW5nIGEgdGFyZ2V0J3MgdHlwZS5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmJlLmFuKCdhcnJheScpLnRoYXQuaW5jbHVkZXMoMik7XG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHN0cmljdCAoYD09PWApIGVxdWFsaXR5IGlzIHVzZWQgdG8gY29tcGFyZSBhcnJheSBtZW1iZXJzIGFuZFxuICAgKiBvYmplY3QgcHJvcGVydGllcy4gQWRkIGAuZGVlcGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gdXNlIGRlZXAgZXF1YWxpdHlcbiAgICogaW5zdGVhZCAoV2Vha1NldCB0YXJnZXRzIGFyZSBub3Qgc3VwcG9ydGVkKS4gU2VlIHRoZSBgZGVlcC1lcWxgIHByb2plY3RcbiAgICogcGFnZSBmb3IgaW5mbyBvbiB0aGUgZGVlcCBlcXVhbGl0eSBhbGdvcml0aG06IGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFpanMvZGVlcC1lcWwuXG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgYXJyYXkgZGVlcGx5IChidXQgbm90IHN0cmljdGx5KSBpbmNsdWRlcyBge2E6IDF9YFxuICAgKiAgICAgZXhwZWN0KFt7YTogMX1dKS50by5kZWVwLmluY2x1ZGUoe2E6IDF9KTtcbiAgICogICAgIGV4cGVjdChbe2E6IDF9XSkudG8ubm90LmluY2x1ZGUoe2E6IDF9KTtcbiAgICpcbiAgICogICAgIC8vIFRhcmdldCBvYmplY3QgZGVlcGx5IChidXQgbm90IHN0cmljdGx5KSBpbmNsdWRlcyBgeDoge2E6IDF9YFxuICAgKiAgICAgZXhwZWN0KHt4OiB7YTogMX19KS50by5kZWVwLmluY2x1ZGUoe3g6IHthOiAxfX0pO1xuICAgKiAgICAgZXhwZWN0KHt4OiB7YTogMX19KS50by5ub3QuaW5jbHVkZSh7eDoge2E6IDF9fSk7XG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIGFsbCBvZiB0aGUgdGFyZ2V0J3MgcHJvcGVydGllcyBhcmUgc2VhcmNoZWQgd2hlbiB3b3JraW5nIHdpdGhcbiAgICogb2JqZWN0cy4gVGhpcyBpbmNsdWRlcyBwcm9wZXJ0aWVzIHRoYXQgYXJlIGluaGVyaXRlZCBhbmQvb3Igbm9uLWVudW1lcmFibGUuXG4gICAqIEFkZCBgLm93bmAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gZXhjbHVkZSB0aGUgdGFyZ2V0J3MgaW5oZXJpdGVkXG4gICAqIHByb3BlcnRpZXMgZnJvbSB0aGUgc2VhcmNoLlxuICAgKlxuICAgKiAgICAgT2JqZWN0LnByb3RvdHlwZS5iID0gMjtcbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLm93bi5pbmNsdWRlKHthOiAxfSk7XG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5pbmNsdWRlKHtiOiAyfSkuYnV0Lm5vdC5vd24uaW5jbHVkZSh7YjogMn0pO1xuICAgKlxuICAgKiBOb3RlIHRoYXQgYSB0YXJnZXQgb2JqZWN0IGlzIGFsd2F5cyBvbmx5IHNlYXJjaGVkIGZvciBgdmFsYCdzIG93blxuICAgKiBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIGAuZGVlcGAgYW5kIGAub3duYCBjYW4gYmUgY29tYmluZWQuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IHtiOiAyfX0pLnRvLmRlZXAub3duLmluY2x1ZGUoe2E6IHtiOiAyfX0pO1xuICAgKlxuICAgKiBBZGQgYC5uZXN0ZWRgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIGVuYWJsZSBkb3QtIGFuZCBicmFja2V0LW5vdGF0aW9uIHdoZW5cbiAgICogcmVmZXJlbmNpbmcgbmVzdGVkIHByb3BlcnRpZXMuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IHtiOiBbJ3gnLCAneSddfX0pLnRvLm5lc3RlZC5pbmNsdWRlKHsnYS5iWzFdJzogJ3knfSk7XG4gICAqXG4gICAqIElmIGAuYCBvciBgW11gIGFyZSBwYXJ0IG9mIGFuIGFjdHVhbCBwcm9wZXJ0eSBuYW1lLCB0aGV5IGNhbiBiZSBlc2NhcGVkIGJ5XG4gICAqIGFkZGluZyB0d28gYmFja3NsYXNoZXMgYmVmb3JlIHRoZW0uXG4gICAqXG4gICAqICAgICBleHBlY3QoeycuYSc6IHsnW2JdJzogMn19KS50by5uZXN0ZWQuaW5jbHVkZSh7J1xcXFwuYS5cXFxcW2JcXFxcXSc6IDJ9KTtcbiAgICpcbiAgICogYC5kZWVwYCBhbmQgYC5uZXN0ZWRgIGNhbiBiZSBjb21iaW5lZC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YToge2I6IFt7YzogM31dfX0pLnRvLmRlZXAubmVzdGVkLmluY2x1ZGUoeydhLmJbMF0nOiB7YzogM319KTtcbiAgICpcbiAgICogYC5vd25gIGFuZCBgLm5lc3RlZGAgY2Fubm90IGJlIGNvbWJpbmVkLlxuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLmluY2x1ZGVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb29iYXInKS50by5ub3QuaW5jbHVkZSgndGFjbycpO1xuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8ubm90LmluY2x1ZGUoNCk7XG4gICAqIFxuICAgKiBIb3dldmVyLCBpdCdzIGRhbmdlcm91cyB0byBuZWdhdGUgYC5pbmNsdWRlYCB3aGVuIHRoZSB0YXJnZXQgaXMgYW4gb2JqZWN0LlxuICAgKiBUaGUgcHJvYmxlbSBpcyB0aGF0IGl0IGNyZWF0ZXMgdW5jZXJ0YWluIGV4cGVjdGF0aW9ucyBieSBhc3NlcnRpbmcgdGhhdCB0aGVcbiAgICogdGFyZ2V0IG9iamVjdCBkb2Vzbid0IGhhdmUgYWxsIG9mIGB2YWxgJ3Mga2V5L3ZhbHVlIHBhaXJzIGJ1dCBtYXkgb3IgbWF5XG4gICAqIG5vdCBoYXZlIHNvbWUgb2YgdGhlbS4gSXQncyBvZnRlbiBiZXN0IHRvIGlkZW50aWZ5IHRoZSBleGFjdCBvdXRwdXQgdGhhdCdzXG4gICAqIGV4cGVjdGVkLCBhbmQgdGhlbiB3cml0ZSBhbiBhc3NlcnRpb24gdGhhdCBvbmx5IGFjY2VwdHMgdGhhdCBleGFjdCBvdXRwdXQuXG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBvYmplY3QgaXNuJ3QgZXZlbiBleHBlY3RlZCB0byBoYXZlIGB2YWxgJ3Mga2V5cywgaXQnc1xuICAgKiBvZnRlbiBiZXN0IHRvIGFzc2VydCBleGFjdGx5IHRoYXQuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2M6IDN9KS50by5ub3QuaGF2ZS5hbnkua2V5cygnYScsICdiJyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2M6IDN9KS50by5ub3QuaW5jbHVkZSh7YTogMSwgYjogMn0pOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IG9iamVjdCBpcyBleHBlY3RlZCB0byBoYXZlIGB2YWxgJ3Mga2V5cywgaXQncyBvZnRlbiBiZXN0IHRvXG4gICAqIGFzc2VydCB0aGF0IGVhY2ggb2YgdGhlIHByb3BlcnRpZXMgaGFzIGl0cyBleHBlY3RlZCB2YWx1ZSwgcmF0aGVyIHRoYW5cbiAgICogYXNzZXJ0aW5nIHRoYXQgZWFjaCBwcm9wZXJ0eSBkb2Vzbid0IGhhdmUgb25lIG9mIG1hbnkgdW5leHBlY3RlZCB2YWx1ZXMuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDMsIGI6IDR9KS50by5pbmNsdWRlKHthOiAzLCBiOiA0fSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2E6IDMsIGI6IDR9KS50by5ub3QuaW5jbHVkZSh7YTogMSwgYjogMn0pOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5pbmNsdWRlYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yXG4gICAqIG1lc3NhZ2UgdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzXG4gICAqIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5pbmNsdWRlKDQsICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10sICdub29vIHdoeSBmYWlsPz8nKS50by5pbmNsdWRlKDQpO1xuICAgKlxuICAgKiBgLmluY2x1ZGVgIGNhbiBhbHNvIGJlIHVzZWQgYXMgYSBsYW5ndWFnZSBjaGFpbiwgY2F1c2luZyBhbGwgYC5tZW1iZXJzYCBhbmRcbiAgICogYC5rZXlzYCBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbiB0byByZXF1aXJlIHRoZSB0YXJnZXQgdG8gYmUgYVxuICAgKiBzdXBlcnNldCBvZiB0aGUgZXhwZWN0ZWQgc2V0LCByYXRoZXIgdGhhbiBhbiBpZGVudGljYWwgc2V0LiBOb3RlIHRoYXRcbiAgICogYC5tZW1iZXJzYCBpZ25vcmVzIGR1cGxpY2F0ZXMgaW4gdGhlIHN1YnNldCB3aGVuIGAuaW5jbHVkZWAgaXMgYWRkZWQuXG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgb2JqZWN0J3Mga2V5cyBhcmUgYSBzdXBlcnNldCBvZiBbJ2EnLCAnYiddIGJ1dCBub3QgaWRlbnRpY2FsXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDIsIGM6IDN9KS50by5pbmNsdWRlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMiwgYzogM30pLnRvLm5vdC5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICpcbiAgICogICAgIC8vIFRhcmdldCBhcnJheSBpcyBhIHN1cGVyc2V0IG9mIFsxLCAyXSBidXQgbm90IGlkZW50aWNhbFxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaW5jbHVkZS5tZW1iZXJzKFsxLCAyXSk7XG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5ub3QuaGF2ZS5tZW1iZXJzKFsxLCAyXSk7XG4gICAqXG4gICAqICAgICAvLyBEdXBsaWNhdGVzIGluIHRoZSBzdWJzZXQgYXJlIGlnbm9yZWRcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmluY2x1ZGUubWVtYmVycyhbMSwgMiwgMiwgMl0pO1xuICAgKlxuICAgKiBOb3RlIHRoYXQgYWRkaW5nIGAuYW55YCBlYXJsaWVyIGluIHRoZSBjaGFpbiBjYXVzZXMgdGhlIGAua2V5c2AgYXNzZXJ0aW9uXG4gICAqIHRvIGlnbm9yZSBgLmluY2x1ZGVgLlxuICAgKlxuICAgKiAgICAgLy8gQm90aCBhc3NlcnRpb25zIGFyZSBpZGVudGljYWxcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmluY2x1ZGUuYW55LmtleXMoJ2EnLCAnYicpO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5hbnkua2V5cygnYScsICdiJyk7XG4gICAqXG4gICAqIFRoZSBhbGlhc2VzIGAuaW5jbHVkZXNgLCBgLmNvbnRhaW5gLCBhbmQgYC5jb250YWluc2AgY2FuIGJlIHVzZWRcbiAgICogaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5pbmNsdWRlYC5cbiAgICpcbiAgICogQG5hbWUgaW5jbHVkZVxuICAgKiBAYWxpYXMgY29udGFpblxuICAgKiBAYWxpYXMgaW5jbHVkZXNcbiAgICogQGFsaWFzIGNvbnRhaW5zXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gU2FtZVZhbHVlWmVybyhhLCBiKSB7XG4gICAgcmV0dXJuIChfLmlzTmFOKGEpICYmIF8uaXNOYU4oYikpIHx8IGEgPT09IGI7XG4gIH1cblxuICBmdW5jdGlvbiBpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvciAoKSB7XG4gICAgZmxhZyh0aGlzLCAnY29udGFpbnMnLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluY2x1ZGUgKHZhbCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgXG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIG9ialR5cGUgPSBfLnR5cGUob2JqKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgbmVnYXRlID0gZmxhZyh0aGlzLCAnbmVnYXRlJylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKVxuICAgICAgLCBpc0RlZXAgPSBmbGFnKHRoaXMsICdkZWVwJylcbiAgICAgICwgZGVzY3JpcHRvciA9IGlzRGVlcCA/ICdkZWVwICcgOiAnJztcblxuICAgIGZsYWdNc2cgPSBmbGFnTXNnID8gZmxhZ01zZyArICc6ICcgOiAnJztcblxuICAgIHZhciBpbmNsdWRlZCA9IGZhbHNlO1xuXG4gICAgc3dpdGNoIChvYmpUeXBlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBpbmNsdWRlZCA9IG9iai5pbmRleE9mKHZhbCkgIT09IC0xO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnd2Vha3NldCc6XG4gICAgICAgIGlmIChpc0RlZXApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgICAgICBmbGFnTXNnICsgJ3VuYWJsZSB0byB1c2UgLmRlZXAuaW5jbHVkZSB3aXRoIFdlYWtTZXQnLFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgc3NmaVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpbmNsdWRlZCA9IG9iai5oYXModmFsKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ21hcCc6XG4gICAgICAgIHZhciBpc0VxbCA9IGlzRGVlcCA/IF8uZXFsIDogU2FtZVZhbHVlWmVybztcbiAgICAgICAgb2JqLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICBpbmNsdWRlZCA9IGluY2x1ZGVkIHx8IGlzRXFsKGl0ZW0sIHZhbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnc2V0JzpcbiAgICAgICAgaWYgKGlzRGVlcCkge1xuICAgICAgICAgIG9iai5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpbmNsdWRlZCA9IGluY2x1ZGVkIHx8IF8uZXFsKGl0ZW0sIHZhbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5jbHVkZWQgPSBvYmouaGFzKHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgaWYgKGlzRGVlcCkge1xuICAgICAgICAgIGluY2x1ZGVkID0gb2JqLnNvbWUoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBfLmVxbChpdGVtLCB2YWwpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5jbHVkZWQgPSBvYmouaW5kZXhPZih2YWwpICE9PSAtMTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gVGhpcyBibG9jayBpcyBmb3IgYXNzZXJ0aW5nIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW4gYW4gb2JqZWN0LlxuICAgICAgICAvLyBgXy5leHBlY3RUeXBlc2AgaXNuJ3QgdXNlZCBoZXJlIGJlY2F1c2UgYC5pbmNsdWRlYCBzaG91bGQgd29yayB3aXRoXG4gICAgICAgIC8vIG9iamVjdHMgd2l0aCBhIGN1c3RvbSBgQEB0b1N0cmluZ1RhZ2AuXG4gICAgICAgIGlmICh2YWwgIT09IE9iamVjdCh2YWwpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgICAgICAgZmxhZ01zZyArICdvYmplY3QgdGVzdGVkIG11c3QgYmUgYW4gYXJyYXksIGEgbWFwLCBhbiBvYmplY3QsJ1xuICAgICAgICAgICAgICArICcgYSBzZXQsIGEgc3RyaW5nLCBvciBhIHdlYWtzZXQsIGJ1dCAnICsgb2JqVHlwZSArICcgZ2l2ZW4nLFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgc3NmaVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJvcHMgPSBPYmplY3Qua2V5cyh2YWwpXG4gICAgICAgICAgLCBmaXJzdEVyciA9IG51bGxcbiAgICAgICAgICAsIG51bUVycnMgPSAwO1xuICBcbiAgICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgIHZhciBwcm9wQXNzZXJ0aW9uID0gbmV3IEFzc2VydGlvbihvYmopO1xuICAgICAgICAgIF8udHJhbnNmZXJGbGFncyh0aGlzLCBwcm9wQXNzZXJ0aW9uLCB0cnVlKTtcbiAgICAgICAgICBmbGFnKHByb3BBc3NlcnRpb24sICdsb2NrU3NmaScsIHRydWUpO1xuICBcbiAgICAgICAgICBpZiAoIW5lZ2F0ZSB8fCBwcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHByb3BBc3NlcnRpb24ucHJvcGVydHkocHJvcCwgdmFsW3Byb3BdKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwcm9wQXNzZXJ0aW9uLnByb3BlcnR5KHByb3AsIHZhbFtwcm9wXSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoIV8uY2hlY2tFcnJvci5jb21wYXRpYmxlQ29uc3RydWN0b3IoZXJyLCBBc3NlcnRpb25FcnJvcikpIHtcbiAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0RXJyID09PSBudWxsKSBmaXJzdEVyciA9IGVycjtcbiAgICAgICAgICAgIG51bUVycnMrKztcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICBcbiAgICAgICAgLy8gV2hlbiB2YWxpZGF0aW5nIC5ub3QuaW5jbHVkZSB3aXRoIG11bHRpcGxlIHByb3BlcnRpZXMsIHdlIG9ubHkgd2FudFxuICAgICAgICAvLyB0byB0aHJvdyBhbiBhc3NlcnRpb24gZXJyb3IgaWYgYWxsIG9mIHRoZSBwcm9wZXJ0aWVzIGFyZSBpbmNsdWRlZCxcbiAgICAgICAgLy8gaW4gd2hpY2ggY2FzZSB3ZSB0aHJvdyB0aGUgZmlyc3QgcHJvcGVydHkgYXNzZXJ0aW9uIGVycm9yIHRoYXQgd2VcbiAgICAgICAgLy8gZW5jb3VudGVyZWQuXG4gICAgICAgIGlmIChuZWdhdGUgJiYgcHJvcHMubGVuZ3RoID4gMSAmJiBudW1FcnJzID09PSBwcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBmaXJzdEVycjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXNzZXJ0IGluY2x1c2lvbiBpbiBjb2xsZWN0aW9uIG9yIHN1YnN0cmluZyBpbiBhIHN0cmluZy5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGluY2x1ZGVkXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvICcgKyBkZXNjcmlwdG9yICsgJ2luY2x1ZGUgJyArIF8uaW5zcGVjdCh2YWwpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCAnICsgZGVzY3JpcHRvciArICdpbmNsdWRlICcgKyBfLmluc3BlY3QodmFsKSk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKCdpbmNsdWRlJywgaW5jbHVkZSwgaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IpO1xuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKCdjb250YWluJywgaW5jbHVkZSwgaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IpO1xuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKCdjb250YWlucycsIGluY2x1ZGUsIGluY2x1ZGVDaGFpbmluZ0JlaGF2aW9yKTtcbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnaW5jbHVkZXMnLCBpbmNsdWRlLCBpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvcik7XG5cbiAgLyoqXG4gICAqICMjIyAub2tcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgbG9vc2VseSAoYD09YCkgZXF1YWwgdG8gYHRydWVgLiBIb3dldmVyLCBpdCdzXG4gICAqIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBpcyBzdHJpY3RseSAoYD09PWApIG9yIGRlZXBseSBlcXVhbCB0b1xuICAgKiBpdHMgZXhwZWN0ZWQgdmFsdWUuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uZXF1YWwoMSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMSkudG8uYmUub2s7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiAgICAgZXhwZWN0KHRydWUpLnRvLmJlLnRydWU7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QodHJ1ZSkudG8uYmUub2s7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLm9rYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgwKS50by5lcXVhbCgwKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgwKS50by5ub3QuYmUub2s7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZhbHNlKS50by5iZS5mYWxzZTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChmYWxzZSkudG8ubm90LmJlLm9rOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogICAgIGV4cGVjdChudWxsKS50by5iZS5udWxsOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KG51bGwpLnRvLm5vdC5iZS5vazsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3QodW5kZWZpbmVkKS50by5iZS51bmRlZmluZWQ7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QodW5kZWZpbmVkKS50by5ub3QuYmUub2s7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlIGNhbiBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZhbHNlLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUub2s7XG4gICAqXG4gICAqIEBuYW1lIG9rXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnb2snLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIHRydXRoeSdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgZmFsc3knKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAudHJ1ZVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBzdHJpY3RseSAoYD09PWApIGVxdWFsIHRvIGB0cnVlYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh0cnVlKS50by5iZS50cnVlO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLnRydWVgLiBIb3dldmVyLCBpdCdzIG9mdGVuIGJlc3RcbiAgICogdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCB0byBpdHMgZXhwZWN0ZWQgdmFsdWUsIHJhdGhlciB0aGFuIG5vdFxuICAgKiBlcXVhbCB0byBgdHJ1ZWAuXG4gICAqXG4gICAqICAgICBleHBlY3QoZmFsc2UpLnRvLmJlLmZhbHNlOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KGZhbHNlKS50by5ub3QuYmUudHJ1ZTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uZXF1YWwoMSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMSkudG8ubm90LmJlLnRydWU7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlIGNhbiBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZhbHNlLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUudHJ1ZTtcbiAgICpcbiAgICogQG5hbWUgdHJ1ZVxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ3RydWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIHRydWUgPT09IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIHRydWUnXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGZhbHNlJ1xuICAgICAgLCBmbGFnKHRoaXMsICduZWdhdGUnKSA/IGZhbHNlIDogdHJ1ZVxuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmZhbHNlXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIHN0cmljdGx5IChgPT09YCkgZXF1YWwgdG8gYGZhbHNlYC5cbiAgICpcbiAgICogICAgIGV4cGVjdChmYWxzZSkudG8uYmUuZmFsc2U7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuZmFsc2VgLiBIb3dldmVyLCBpdCdzIG9mdGVuXG4gICAqIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCB0byBpdHMgZXhwZWN0ZWQgdmFsdWUsIHJhdGhlciB0aGFuXG4gICAqIG5vdCBlcXVhbCB0byBgZmFsc2VgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHRydWUpLnRvLmJlLnRydWU7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QodHJ1ZSkudG8ubm90LmJlLmZhbHNlOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgxKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxKS50by5ub3QuYmUuZmFsc2U7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlIGNhbiBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHRydWUsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5mYWxzZTtcbiAgICpcbiAgICogQG5hbWUgZmFsc2VcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdmYWxzZScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgZmFsc2UgPT09IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGZhbHNlJ1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB0cnVlJ1xuICAgICAgLCBmbGFnKHRoaXMsICduZWdhdGUnKSA/IHRydWUgOiBmYWxzZVxuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLm51bGxcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgc3RyaWN0bHkgKGA9PT1gKSBlcXVhbCB0byBgbnVsbGAuXG4gICAqXG4gICAqICAgICBleHBlY3QobnVsbCkudG8uYmUubnVsbDtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5udWxsYC4gSG93ZXZlciwgaXQncyBvZnRlbiBiZXN0XG4gICAqIHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaXMgZXF1YWwgdG8gaXRzIGV4cGVjdGVkIHZhbHVlLCByYXRoZXIgdGhhbiBub3RcbiAgICogZXF1YWwgdG8gYG51bGxgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmVxdWFsKDEpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLm5vdC5iZS5udWxsOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQSBjdXN0b20gZXJyb3IgbWVzc2FnZSBjYW4gYmUgZ2l2ZW4gYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCg0MiwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLm51bGw7XG4gICAqXG4gICAqIEBuYW1lIG51bGxcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdudWxsJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBudWxsID09PSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBudWxsJ1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgbnVsbCdcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC51bmRlZmluZWRcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgc3RyaWN0bHkgKGA9PT1gKSBlcXVhbCB0byBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh1bmRlZmluZWQpLnRvLmJlLnVuZGVmaW5lZDtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC51bmRlZmluZWRgLiBIb3dldmVyLCBpdCdzIG9mdGVuXG4gICAqIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCB0byBpdHMgZXhwZWN0ZWQgdmFsdWUsIHJhdGhlciB0aGFuXG4gICAqIG5vdCBlcXVhbCB0byBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgxKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxKS50by5ub3QuYmUudW5kZWZpbmVkOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQSBjdXN0b20gZXJyb3IgbWVzc2FnZSBjYW4gYmUgZ2l2ZW4gYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCg0MiwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLnVuZGVmaW5lZDtcbiAgICpcbiAgICogQG5hbWUgdW5kZWZpbmVkXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgndW5kZWZpbmVkJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICB1bmRlZmluZWQgPT09IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIHVuZGVmaW5lZCdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIHVuZGVmaW5lZCdcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5OYU5cbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgZXhhY3RseSBgTmFOYC5cbiAgICpcbiAgICogICAgIGV4cGVjdChOYU4pLnRvLmJlLk5hTjtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5OYU5gLiBIb3dldmVyLCBpdCdzIG9mdGVuIGJlc3RcbiAgICogdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCB0byBpdHMgZXhwZWN0ZWQgdmFsdWUsIHJhdGhlciB0aGFuIG5vdFxuICAgKiBlcXVhbCB0byBgTmFOYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uZXF1YWwoJ2ZvbycpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5ub3QuYmUuTmFOOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQSBjdXN0b20gZXJyb3IgbWVzc2FnZSBjYW4gYmUgZ2l2ZW4gYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCg0MiwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLk5hTjtcbiAgICpcbiAgICogQG5hbWUgTmFOXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnTmFOJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBfLmlzTmFOKGZsYWcodGhpcywgJ29iamVjdCcpKVxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIE5hTidcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgTmFOJ1xuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmV4aXN0XG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIG5vdCBzdHJpY3RseSAoYD09PWApIGVxdWFsIHRvIGVpdGhlciBgbnVsbGAgb3JcbiAgICogYHVuZGVmaW5lZGAuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvXG4gICAqIGl0cyBleHBlY3RlZCB2YWx1ZS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgxKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxKS50by5leGlzdDsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3QoMCkudG8uZXF1YWwoMCk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMCkudG8uZXhpc3Q7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLmV4aXN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdChudWxsKS50by5iZS5udWxsOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KG51bGwpLnRvLm5vdC5leGlzdDsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3QodW5kZWZpbmVkKS50by5iZS51bmRlZmluZWQ7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QodW5kZWZpbmVkKS50by5ub3QuZXhpc3Q7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlIGNhbiBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KG51bGwsICdub29vIHdoeSBmYWlsPz8nKS50by5leGlzdDtcbiAgICpcbiAgICogQG5hbWUgZXhpc3RcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdleGlzdCcsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIHZhbCAhPT0gbnVsbCAmJiB2YWwgIT09IHVuZGVmaW5lZFxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBleGlzdCdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGV4aXN0J1xuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmVtcHR5XG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBhIHN0cmluZyBvciBhcnJheSwgYC5lbXB0eWAgYXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQnc1xuICAgKiBgbGVuZ3RoYCBwcm9wZXJ0eSBpcyBzdHJpY3RseSAoYD09PWApIGVxdWFsIHRvIGAwYC5cbiAgICpcbiAgICogICAgIGV4cGVjdChbXSkudG8uYmUuZW1wdHk7XG4gICAqICAgICBleHBlY3QoJycpLnRvLmJlLmVtcHR5O1xuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXMgYSBtYXAgb3Igc2V0LCBgLmVtcHR5YCBhc3NlcnRzIHRoYXQgdGhlIHRhcmdldCdzIGBzaXplYFxuICAgKiBwcm9wZXJ0eSBpcyBzdHJpY3RseSBlcXVhbCB0byBgMGAuXG4gICAqXG4gICAqICAgICBleHBlY3QobmV3IFNldCgpKS50by5iZS5lbXB0eTtcbiAgICogICAgIGV4cGVjdChuZXcgTWFwKCkpLnRvLmJlLmVtcHR5O1xuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXMgYSBub24tZnVuY3Rpb24gb2JqZWN0LCBgLmVtcHR5YCBhc3NlcnRzIHRoYXQgdGhlIHRhcmdldFxuICAgKiBkb2Vzbid0IGhhdmUgYW55IG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMuIFByb3BlcnRpZXMgd2l0aCBTeW1ib2wtYmFzZWRcbiAgICoga2V5cyBhcmUgZXhjbHVkZWQgZnJvbSB0aGUgY291bnQuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe30pLnRvLmJlLmVtcHR5O1xuICAgKlxuICAgKiBCZWNhdXNlIGAuZW1wdHlgIGRvZXMgZGlmZmVyZW50IHRoaW5ncyBiYXNlZCBvbiB0aGUgdGFyZ2V0J3MgdHlwZSwgaXQnc1xuICAgKiBpbXBvcnRhbnQgdG8gY2hlY2sgdGhlIHRhcmdldCdzIHR5cGUgYmVmb3JlIHVzaW5nIGAuZW1wdHlgLiBTZWUgdGhlIGAuYWBcbiAgICogZG9jIGZvciBpbmZvIG9uIHRlc3RpbmcgYSB0YXJnZXQncyB0eXBlLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFtdKS50by5iZS5hbignYXJyYXknKS50aGF0LmlzLmVtcHR5O1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLmVtcHR5YC4gSG93ZXZlciwgaXQncyBvZnRlblxuICAgKiBiZXN0IHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgY29udGFpbnMgaXRzIGV4cGVjdGVkIG51bWJlciBvZiB2YWx1ZXMsXG4gICAqIHJhdGhlciB0aGFuIGFzc2VydGluZyB0aGF0IGl0J3Mgbm90IGVtcHR5LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZigzKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLm5vdC5iZS5lbXB0eTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3QobmV3IFNldChbMSwgMiwgM10pKS50by5oYXZlLnByb3BlcnR5KCdzaXplJywgMyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QobmV3IFNldChbMSwgMiwgM10pKS50by5ub3QuYmUuZW1wdHk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiAgICAgZXhwZWN0KE9iamVjdC5rZXlzKHthOiAxfSkpLnRvLmhhdmUubGVuZ3RoT2YoMSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5ub3QuYmUuZW1wdHk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlIGNhbiBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLmVtcHR5O1xuICAgKlxuICAgKiBAbmFtZSBlbXB0eVxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ2VtcHR5JywgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWwgPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgaXRlbXNDb3VudDtcblxuICAgIGZsYWdNc2cgPSBmbGFnTXNnID8gZmxhZ01zZyArICc6ICcgOiAnJztcblxuICAgIHN3aXRjaCAoXy50eXBlKHZhbCkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgaXRlbXNDb3VudCA9IHZhbC5sZW5ndGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbWFwJzpcbiAgICAgIGNhc2UgJ3NldCc6XG4gICAgICAgIGl0ZW1zQ291bnQgPSB2YWwuc2l6ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd3ZWFrbWFwJzpcbiAgICAgIGNhc2UgJ3dlYWtzZXQnOlxuICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgICAgZmxhZ01zZyArICcuZW1wdHkgd2FzIHBhc3NlZCBhIHdlYWsgY29sbGVjdGlvbicsXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHNzZmlcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgdmFyIG1zZyA9IGZsYWdNc2cgKyAnLmVtcHR5IHdhcyBwYXNzZWQgYSBmdW5jdGlvbiAnICsgXy5nZXROYW1lKHZhbCk7XG4gICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihtc2cudHJpbSgpLCB1bmRlZmluZWQsIHNzZmkpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHZhbCAhPT0gT2JqZWN0KHZhbCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgICAgICBmbGFnTXNnICsgJy5lbXB0eSB3YXMgcGFzc2VkIG5vbi1zdHJpbmcgcHJpbWl0aXZlICcgKyBfLmluc3BlY3QodmFsKSxcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNzZmlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW1zQ291bnQgPSBPYmplY3Qua2V5cyh2YWwpLmxlbmd0aDtcbiAgICB9XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgMCA9PT0gaXRlbXNDb3VudFxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBlbXB0eSdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIGVtcHR5J1xuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmFyZ3VtZW50c1xuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gICAqXG4gICAqICAgICBmdW5jdGlvbiB0ZXN0ICgpIHtcbiAgICogICAgICAgZXhwZWN0KGFyZ3VtZW50cykudG8uYmUuYXJndW1lbnRzO1xuICAgKiAgICAgfVxuICAgKlxuICAgKiAgICAgdGVzdCgpO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLmFyZ3VtZW50c2AuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW5cbiAgICogYmVzdCB0byBhc3NlcnQgd2hpY2ggdHlwZSB0aGUgdGFyZ2V0IGlzIGV4cGVjdGVkIHRvIGJlLCByYXRoZXIgdGhhblxuICAgKiBhc3NlcnRpbmcgdGhhdCBpdHMgbm90IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uYmUuYSgnc3RyaW5nJyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLm5vdC5iZS5hcmd1bWVudHM7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlIGNhbiBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHt9LCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUuYXJndW1lbnRzO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5Bcmd1bWVudHNgIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAuYXJndW1lbnRzYC5cbiAgICpcbiAgICogQG5hbWUgYXJndW1lbnRzXG4gICAqIEBhbGlhcyBBcmd1bWVudHNcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gY2hlY2tBcmd1bWVudHMgKCkge1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCB0eXBlID0gXy50eXBlKG9iaik7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICdBcmd1bWVudHMnID09PSB0eXBlXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGFyZ3VtZW50cyBidXQgZ290ICcgKyB0eXBlXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBhcmd1bWVudHMnXG4gICAgKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnYXJndW1lbnRzJywgY2hlY2tBcmd1bWVudHMpO1xuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ0FyZ3VtZW50cycsIGNoZWNrQXJndW1lbnRzKTtcblxuICAvKipcbiAgICogIyMjIC5lcXVhbCh2YWxbLCBtc2ddKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBzdHJpY3RseSAoYD09PWApIGVxdWFsIHRvIHRoZSBnaXZlbiBgdmFsYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgxKTtcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uZXF1YWwoJ2ZvbycpO1xuICAgKiBcbiAgICogQWRkIGAuZGVlcGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gdXNlIGRlZXAgZXF1YWxpdHkgaW5zdGVhZC4gU2VlIHRoZVxuICAgKiBgZGVlcC1lcWxgIHByb2plY3QgcGFnZSBmb3IgaW5mbyBvbiB0aGUgZGVlcCBlcXVhbGl0eSBhbGdvcml0aG06XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFpanMvZGVlcC1lcWwuXG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgb2JqZWN0IGRlZXBseSAoYnV0IG5vdCBzdHJpY3RseSkgZXF1YWxzIGB7YTogMX1gXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5kZWVwLmVxdWFsKHthOiAxfSk7XG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5ub3QuZXF1YWwoe2E6IDF9KTtcbiAgICpcbiAgICogICAgIC8vIFRhcmdldCBhcnJheSBkZWVwbHkgKGJ1dCBub3Qgc3RyaWN0bHkpIGVxdWFscyBgWzEsIDJdYFxuICAgKiAgICAgZXhwZWN0KFsxLCAyXSkudG8uZGVlcC5lcXVhbChbMSwgMl0pO1xuICAgKiAgICAgZXhwZWN0KFsxLCAyXSkudG8ubm90LmVxdWFsKFsxLCAyXSk7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuZXF1YWxgLiBIb3dldmVyLCBpdCdzIG9mdGVuXG4gICAqIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCB0byBpdHMgZXhwZWN0ZWQgdmFsdWUsIHJhdGhlciB0aGFuXG4gICAqIG5vdCBlcXVhbCB0byBvbmUgb2YgY291bnRsZXNzIHVuZXhwZWN0ZWQgdmFsdWVzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmVxdWFsKDEpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLm5vdC5lcXVhbCgyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIGAuZXF1YWxgIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3IgbWVzc2FnZVxuICAgKiB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXMgdGhlXG4gICAqIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgyLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoMSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmVxdWFsKDIpO1xuICAgKlxuICAgKiBUaGUgYWxpYXNlcyBgLmVxdWFsc2AgYW5kIGBlcWAgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5lcXVhbGAuXG4gICAqXG4gICAqIEBuYW1lIGVxdWFsXG4gICAqIEBhbGlhcyBlcXVhbHNcbiAgICogQGFsaWFzIGVxXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0RXF1YWwgKHZhbCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuICAgIGlmIChmbGFnKHRoaXMsICdkZWVwJykpIHtcbiAgICAgIHJldHVybiB0aGlzLmVxbCh2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICB2YWwgPT09IG9ialxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGVxdWFsICN7ZXhwfSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXF1YWwgI3tleHB9J1xuICAgICAgICAsIHZhbFxuICAgICAgICAsIHRoaXMuX29ialxuICAgICAgICAsIHRydWVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXF1YWwnLCBhc3NlcnRFcXVhbCk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2VxdWFscycsIGFzc2VydEVxdWFsKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXEnLCBhc3NlcnRFcXVhbCk7XG5cbiAgLyoqXG4gICAqICMjIyAuZXFsKG9ialssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGRlZXBseSBlcXVhbCB0byB0aGUgZ2l2ZW4gYG9iamAuIFNlZSB0aGVcbiAgICogYGRlZXAtZXFsYCBwcm9qZWN0IHBhZ2UgZm9yIGluZm8gb24gdGhlIGRlZXAgZXF1YWxpdHkgYWxnb3JpdGhtOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vY2hhaWpzL2RlZXAtZXFsLlxuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IG9iamVjdCBpcyBkZWVwbHkgKGJ1dCBub3Qgc3RyaWN0bHkpIGVxdWFsIHRvIHthOiAxfVxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uZXFsKHthOiAxfSkuYnV0Lm5vdC5lcXVhbCh7YTogMX0pO1xuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IGFycmF5IGlzIGRlZXBseSAoYnV0IG5vdCBzdHJpY3RseSkgZXF1YWwgdG8gWzEsIDJdXG4gICAqICAgICBleHBlY3QoWzEsIDJdKS50by5lcWwoWzEsIDJdKS5idXQubm90LmVxdWFsKFsxLCAyXSk7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuZXFsYC4gSG93ZXZlciwgaXQncyBvZnRlbiBiZXN0XG4gICAqIHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaXMgZGVlcGx5IGVxdWFsIHRvIGl0cyBleHBlY3RlZCB2YWx1ZSwgcmF0aGVyXG4gICAqIHRoYW4gbm90IGRlZXBseSBlcXVhbCB0byBvbmUgb2YgY291bnRsZXNzIHVuZXhwZWN0ZWQgdmFsdWVzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uZXFsKHthOiAxfSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5ub3QuZXFsKHtiOiAyfSk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLmVxbGAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvciBtZXNzYWdlXG4gICAqIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhcyB0aGVcbiAgICogc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uZXFsKHtiOiAyfSwgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmVxbCh7YjogMn0pO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5lcWxzYCBjYW4gYmUgdXNlZCBpbnRlcmNoYW5nZWFibHkgd2l0aCBgLmVxbGAuXG4gICAqXG4gICAqIFRoZSBgLmRlZXAuZXF1YWxgIGFzc2VydGlvbiBpcyBhbG1vc3QgaWRlbnRpY2FsIHRvIGAuZXFsYCBidXQgd2l0aCBvbmVcbiAgICogZGlmZmVyZW5jZTogYC5kZWVwLmVxdWFsYCBjYXVzZXMgZGVlcCBlcXVhbGl0eSBjb21wYXJpc29ucyB0byBhbHNvIGJlIHVzZWRcbiAgICogZm9yIGFueSBvdGhlciBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbi5cbiAgICpcbiAgICogQG5hbWUgZXFsXG4gICAqIEBhbGlhcyBlcWxzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9ialxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0RXFsKG9iaiwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIF8uZXFsKG9iaiwgZmxhZyh0aGlzLCAnb2JqZWN0JykpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGRlZXBseSBlcXVhbCAje2V4cH0nXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBkZWVwbHkgZXF1YWwgI3tleHB9J1xuICAgICAgLCBvYmpcbiAgICAgICwgdGhpcy5fb2JqXG4gICAgICAsIHRydWVcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXFsJywgYXNzZXJ0RXFsKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXFscycsIGFzc2VydEVxbCk7XG5cbiAgLyoqXG4gICAqICMjIyAuYWJvdmUoblssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGEgbnVtYmVyIG9yIGEgZGF0ZSBncmVhdGVyIHRoYW4gdGhlIGdpdmVuIG51bWJlciBvciBkYXRlIGBuYCByZXNwZWN0aXZlbHkuXG4gICAqIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvIGl0cyBleHBlY3RlZFxuICAgKiB2YWx1ZS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgyKS50by5lcXVhbCgyKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgyKS50by5iZS5hYm92ZSgxKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLmxlbmd0aE9mYCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBhc3NlcnQgdGhhdCB0aGUgdmFsdWUgb2YgdGhlXG4gICAqIHRhcmdldCdzIGBsZW5ndGhgIHByb3BlcnR5IGlzIGdyZWF0ZXIgdGhhbiB0aGUgZ2l2ZW4gbnVtYmVyIGBuYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGhPZigzKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGhPZi5hYm92ZSgyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLmxlbmd0aE9mKDMpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZi5hYm92ZSgyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuYWJvdmVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDIpLnRvLmVxdWFsKDIpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLm5vdC5iZS5hYm92ZSgyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIGAuYWJvdmVgIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3IgbWVzc2FnZVxuICAgKiB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXMgdGhlXG4gICAqIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5iZS5hYm92ZSgyLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoMSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLmFib3ZlKDIpO1xuICAgKlxuICAgKiBUaGUgYWxpYXNlcyBgLmd0YCBhbmQgYC5ncmVhdGVyVGhhbmAgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGhcbiAgICogYC5hYm92ZWAuXG4gICAqXG4gICAqIEBuYW1lIGFib3ZlXG4gICAqIEBhbGlhcyBndFxuICAgKiBAYWxpYXMgZ3JlYXRlclRoYW5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydEFib3ZlIChuLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgZG9MZW5ndGggPSBmbGFnKHRoaXMsICdkb0xlbmd0aCcpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgbXNnUHJlZml4ID0gKChmbGFnTXNnKSA/IGZsYWdNc2cgKyAnOiAnIDogJycpXG4gICAgICAsIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJylcbiAgICAgICwgb2JqVHlwZSA9IF8udHlwZShvYmopLnRvTG93ZXJDYXNlKClcbiAgICAgICwgblR5cGUgPSBfLnR5cGUobikudG9Mb3dlckNhc2UoKVxuICAgICAgLCBzaG91bGRUaHJvdyA9IHRydWU7XG5cbiAgICBpZiAoZG9MZW5ndGgpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCFkb0xlbmd0aCAmJiAob2JqVHlwZSA9PT0gJ2RhdGUnICYmIG5UeXBlICE9PSAnZGF0ZScpKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyAndGhlIGFyZ3VtZW50IHRvIGFib3ZlIG11c3QgYmUgYSBkYXRlJztcbiAgICB9IGVsc2UgaWYgKG5UeXBlICE9PSAnbnVtYmVyJyAmJiAoZG9MZW5ndGggfHwgb2JqVHlwZSA9PT0gJ251bWJlcicpKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyAndGhlIGFyZ3VtZW50IHRvIGFib3ZlIG11c3QgYmUgYSBudW1iZXInO1xuICAgIH0gZWxzZSBpZiAoIWRvTGVuZ3RoICYmIChvYmpUeXBlICE9PSAnZGF0ZScgJiYgb2JqVHlwZSAhPT0gJ251bWJlcicpKSB7XG4gICAgICB2YXIgcHJpbnRPYmogPSAob2JqVHlwZSA9PT0gJ3N0cmluZycpID8gXCInXCIgKyBvYmogKyBcIidcIiA6IG9iajtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICdleHBlY3RlZCAnICsgcHJpbnRPYmogKyAnIHRvIGJlIGEgbnVtYmVyIG9yIGEgZGF0ZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3VsZFRocm93ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoZXJyb3JNZXNzYWdlLCB1bmRlZmluZWQsIHNzZmkpO1xuICAgIH1cblxuICAgIGlmIChkb0xlbmd0aCkge1xuICAgICAgdmFyIGxlbiA9IG9iai5sZW5ndGg7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBsZW4gPiBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIGxlbmd0aCBhYm92ZSAje2V4cH0gYnV0IGdvdCAje2FjdH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSBsZW5ndGggYWJvdmUgI3tleHB9J1xuICAgICAgICAsIG5cbiAgICAgICAgLCBsZW5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIG9iaiA+IG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhYm92ZSAje2V4cH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYXQgbW9zdCAje2V4cH0nXG4gICAgICAgICwgblxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdhYm92ZScsIGFzc2VydEFib3ZlKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZ3QnLCBhc3NlcnRBYm92ZSk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2dyZWF0ZXJUaGFuJywgYXNzZXJ0QWJvdmUpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmxlYXN0KG5bLCBtc2ddKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBhIG51bWJlciBvciBhIGRhdGUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBnaXZlblxuICAgKiBudW1iZXIgb3IgZGF0ZSBgbmAgcmVzcGVjdGl2ZWx5LiBIb3dldmVyLCBpdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCB0b1xuICAgKiBpdHMgZXhwZWN0ZWQgdmFsdWUuXG4gICAqXG4gICAqICAgICBleHBlY3QoMikudG8uZXF1YWwoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMikudG8uYmUuYXQubGVhc3QoMSk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDIpLnRvLmJlLmF0LmxlYXN0KDIpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQWRkIGAubGVuZ3RoT2ZgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIGFzc2VydCB0aGF0IHRoZSB2YWx1ZSBvZiB0aGVcbiAgICogdGFyZ2V0J3MgYGxlbmd0aGAgcHJvcGVydHkgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBnaXZlbiBudW1iZXJcbiAgICogYG5gLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5oYXZlLmxlbmd0aE9mKDMpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5oYXZlLmxlbmd0aE9mLmF0LmxlYXN0KDIpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2YoMyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLmxlbmd0aE9mLmF0LmxlYXN0KDIpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5sZWFzdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uZXF1YWwoMSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMSkudG8ubm90LmJlLmF0LmxlYXN0KDIpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5sZWFzdGAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvciBtZXNzYWdlXG4gICAqIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhcyB0aGVcbiAgICogc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmJlLmF0LmxlYXN0KDIsICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICogICAgIGV4cGVjdCgxLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUuYXQubGVhc3QoMik7XG4gICAqXG4gICAqIFRoZSBhbGlhcyBgLmd0ZWAgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5sZWFzdGAuXG4gICAqXG4gICAqIEBuYW1lIGxlYXN0XG4gICAqIEBhbGlhcyBndGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydExlYXN0IChuLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgZG9MZW5ndGggPSBmbGFnKHRoaXMsICdkb0xlbmd0aCcpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgbXNnUHJlZml4ID0gKChmbGFnTXNnKSA/IGZsYWdNc2cgKyAnOiAnIDogJycpXG4gICAgICAsIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJylcbiAgICAgICwgb2JqVHlwZSA9IF8udHlwZShvYmopLnRvTG93ZXJDYXNlKClcbiAgICAgICwgblR5cGUgPSBfLnR5cGUobikudG9Mb3dlckNhc2UoKVxuICAgICAgLCBzaG91bGRUaHJvdyA9IHRydWU7XG5cbiAgICBpZiAoZG9MZW5ndGgpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICB9XG5cbiAgICBpZiAoIWRvTGVuZ3RoICYmIChvYmpUeXBlID09PSAnZGF0ZScgJiYgblR5cGUgIT09ICdkYXRlJykpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICd0aGUgYXJndW1lbnQgdG8gbGVhc3QgbXVzdCBiZSBhIGRhdGUnO1xuICAgIH0gZWxzZSBpZiAoblR5cGUgIT09ICdudW1iZXInICYmIChkb0xlbmd0aCB8fCBvYmpUeXBlID09PSAnbnVtYmVyJykpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICd0aGUgYXJndW1lbnQgdG8gbGVhc3QgbXVzdCBiZSBhIG51bWJlcic7XG4gICAgfSBlbHNlIGlmICghZG9MZW5ndGggJiYgKG9ialR5cGUgIT09ICdkYXRlJyAmJiBvYmpUeXBlICE9PSAnbnVtYmVyJykpIHtcbiAgICAgIHZhciBwcmludE9iaiA9IChvYmpUeXBlID09PSAnc3RyaW5nJykgPyBcIidcIiArIG9iaiArIFwiJ1wiIDogb2JqO1xuICAgICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgJ2V4cGVjdGVkICcgKyBwcmludE9iaiArICcgdG8gYmUgYSBudW1iZXIgb3IgYSBkYXRlJztcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvdWxkVGhyb3cgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihlcnJvck1lc3NhZ2UsIHVuZGVmaW5lZCwgc3NmaSk7XG4gICAgfVxuXG4gICAgaWYgKGRvTGVuZ3RoKSB7XG4gICAgICB2YXIgbGVuID0gb2JqLmxlbmd0aDtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIGxlbiA+PSBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIGxlbmd0aCBhdCBsZWFzdCAje2V4cH0gYnV0IGdvdCAje2FjdH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIGxlbmd0aCBiZWxvdyAje2V4cH0nXG4gICAgICAgICwgblxuICAgICAgICAsIGxlblxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgb2JqID49IG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhdCBsZWFzdCAje2V4cH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYmVsb3cgI3tleHB9J1xuICAgICAgICAsIG5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnbGVhc3QnLCBhc3NlcnRMZWFzdCk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2d0ZScsIGFzc2VydExlYXN0KTtcblxuICAvKipcbiAgICogIyMjIC5iZWxvdyhuWywgbXNnXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgYSBudW1iZXIgb3IgYSBkYXRlIGxlc3MgdGhhbiB0aGUgZ2l2ZW4gbnVtYmVyIG9yIGRhdGUgYG5gIHJlc3BlY3RpdmVseS5cbiAgICogSG93ZXZlciwgaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaXMgZXF1YWwgdG8gaXRzIGV4cGVjdGVkXG4gICAqIHZhbHVlLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmVxdWFsKDEpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmJlLmJlbG93KDIpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQWRkIGAubGVuZ3RoT2ZgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIGFzc2VydCB0aGF0IHRoZSB2YWx1ZSBvZiB0aGVcbiAgICogdGFyZ2V0J3MgYGxlbmd0aGAgcHJvcGVydHkgaXMgbGVzcyB0aGFuIHRoZSBnaXZlbiBudW1iZXIgYG5gLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5oYXZlLmxlbmd0aE9mKDMpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5oYXZlLmxlbmd0aE9mLmJlbG93KDQpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoKDMpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZi5iZWxvdyg0KTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuYmVsb3dgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDIpLnRvLmVxdWFsKDIpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDIpLnRvLm5vdC5iZS5iZWxvdygxKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIGAuYmVsb3dgIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3IgbWVzc2FnZVxuICAgKiB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXMgdGhlXG4gICAqIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgyKS50by5iZS5iZWxvdygxLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoMiwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLmJlbG93KDEpO1xuICAgKlxuICAgKiBUaGUgYWxpYXNlcyBgLmx0YCBhbmQgYC5sZXNzVGhhbmAgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGhcbiAgICogYC5iZWxvd2AuXG4gICAqXG4gICAqIEBuYW1lIGJlbG93XG4gICAqIEBhbGlhcyBsdFxuICAgKiBAYWxpYXMgbGVzc1RoYW5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydEJlbG93IChuLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgZG9MZW5ndGggPSBmbGFnKHRoaXMsICdkb0xlbmd0aCcpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgbXNnUHJlZml4ID0gKChmbGFnTXNnKSA/IGZsYWdNc2cgKyAnOiAnIDogJycpXG4gICAgICAsIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJylcbiAgICAgICwgb2JqVHlwZSA9IF8udHlwZShvYmopLnRvTG93ZXJDYXNlKClcbiAgICAgICwgblR5cGUgPSBfLnR5cGUobikudG9Mb3dlckNhc2UoKVxuICAgICAgLCBzaG91bGRUaHJvdyA9IHRydWU7XG5cbiAgICBpZiAoZG9MZW5ndGgpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICB9XG5cbiAgICBpZiAoIWRvTGVuZ3RoICYmIChvYmpUeXBlID09PSAnZGF0ZScgJiYgblR5cGUgIT09ICdkYXRlJykpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICd0aGUgYXJndW1lbnQgdG8gYmVsb3cgbXVzdCBiZSBhIGRhdGUnO1xuICAgIH0gZWxzZSBpZiAoblR5cGUgIT09ICdudW1iZXInICYmIChkb0xlbmd0aCB8fCBvYmpUeXBlID09PSAnbnVtYmVyJykpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICd0aGUgYXJndW1lbnQgdG8gYmVsb3cgbXVzdCBiZSBhIG51bWJlcic7XG4gICAgfSBlbHNlIGlmICghZG9MZW5ndGggJiYgKG9ialR5cGUgIT09ICdkYXRlJyAmJiBvYmpUeXBlICE9PSAnbnVtYmVyJykpIHtcbiAgICAgIHZhciBwcmludE9iaiA9IChvYmpUeXBlID09PSAnc3RyaW5nJykgPyBcIidcIiArIG9iaiArIFwiJ1wiIDogb2JqO1xuICAgICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgJ2V4cGVjdGVkICcgKyBwcmludE9iaiArICcgdG8gYmUgYSBudW1iZXIgb3IgYSBkYXRlJztcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvdWxkVGhyb3cgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihlcnJvck1lc3NhZ2UsIHVuZGVmaW5lZCwgc3NmaSk7XG4gICAgfVxuXG4gICAgaWYgKGRvTGVuZ3RoKSB7XG4gICAgICB2YXIgbGVuID0gb2JqLmxlbmd0aDtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIGxlbiA8IG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgbGVuZ3RoIGJlbG93ICN7ZXhwfSBidXQgZ290ICN7YWN0fSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBhIGxlbmd0aCBiZWxvdyAje2V4cH0nXG4gICAgICAgICwgblxuICAgICAgICAsIGxlblxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgb2JqIDwgblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGJlbG93ICN7ZXhwfSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhdCBsZWFzdCAje2V4cH0nXG4gICAgICAgICwgblxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdiZWxvdycsIGFzc2VydEJlbG93KTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnbHQnLCBhc3NlcnRCZWxvdyk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2xlc3NUaGFuJywgYXNzZXJ0QmVsb3cpO1xuXG4gIC8qKlxuICAgKiAjIyMgLm1vc3QoblssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGEgbnVtYmVyIG9yIGEgZGF0ZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIGdpdmVuIG51bWJlclxuICAgKiBvciBkYXRlIGBuYCByZXNwZWN0aXZlbHkuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvIGl0c1xuICAgKiBleHBlY3RlZCB2YWx1ZS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgxKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxKS50by5iZS5hdC5tb3N0KDIpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxKS50by5iZS5hdC5tb3N0KDEpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQWRkIGAubGVuZ3RoT2ZgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIGFzc2VydCB0aGF0IHRoZSB2YWx1ZSBvZiB0aGVcbiAgICogdGFyZ2V0J3MgYGxlbmd0aGAgcHJvcGVydHkgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSBnaXZlbiBudW1iZXIgYG5gLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5oYXZlLmxlbmd0aE9mKDMpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5oYXZlLmxlbmd0aE9mLmF0Lm1vc3QoNCk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZigzKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2YuYXQubW9zdCg0KTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAubW9zdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMikudG8uZXF1YWwoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMikudG8ubm90LmJlLmF0Lm1vc3QoMSk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLm1vc3RgIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3IgbWVzc2FnZVxuICAgKiB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXMgdGhlXG4gICAqIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgyKS50by5iZS5hdC5tb3N0KDEsICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICogICAgIGV4cGVjdCgyLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUuYXQubW9zdCgxKTtcbiAgICpcbiAgICogVGhlIGFsaWFzIGAubHRlYCBjYW4gYmUgdXNlZCBpbnRlcmNoYW5nZWFibHkgd2l0aCBgLm1vc3RgLlxuICAgKlxuICAgKiBAbmFtZSBtb3N0XG4gICAqIEBhbGlhcyBsdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydE1vc3QgKG4sIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBkb0xlbmd0aCA9IGZsYWcodGhpcywgJ2RvTGVuZ3RoJylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBtc2dQcmVmaXggPSAoKGZsYWdNc2cpID8gZmxhZ01zZyArICc6ICcgOiAnJylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKVxuICAgICAgLCBvYmpUeXBlID0gXy50eXBlKG9iaikudG9Mb3dlckNhc2UoKVxuICAgICAgLCBuVHlwZSA9IF8udHlwZShuKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIHNob3VsZFRocm93ID0gdHJ1ZTtcblxuICAgIGlmIChkb0xlbmd0aCkge1xuICAgICAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkoJ2xlbmd0aCcpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoIWRvTGVuZ3RoICYmIChvYmpUeXBlID09PSAnZGF0ZScgJiYgblR5cGUgIT09ICdkYXRlJykpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICd0aGUgYXJndW1lbnQgdG8gbW9zdCBtdXN0IGJlIGEgZGF0ZSc7XG4gICAgfSBlbHNlIGlmIChuVHlwZSAhPT0gJ251bWJlcicgJiYgKGRvTGVuZ3RoIHx8IG9ialR5cGUgPT09ICdudW1iZXInKSkge1xuICAgICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgJ3RoZSBhcmd1bWVudCB0byBtb3N0IG11c3QgYmUgYSBudW1iZXInO1xuICAgIH0gZWxzZSBpZiAoIWRvTGVuZ3RoICYmIChvYmpUeXBlICE9PSAnZGF0ZScgJiYgb2JqVHlwZSAhPT0gJ251bWJlcicpKSB7XG4gICAgICB2YXIgcHJpbnRPYmogPSAob2JqVHlwZSA9PT0gJ3N0cmluZycpID8gXCInXCIgKyBvYmogKyBcIidcIiA6IG9iajtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICdleHBlY3RlZCAnICsgcHJpbnRPYmogKyAnIHRvIGJlIGEgbnVtYmVyIG9yIGEgZGF0ZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3VsZFRocm93ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoZXJyb3JNZXNzYWdlLCB1bmRlZmluZWQsIHNzZmkpO1xuICAgIH1cblxuICAgIGlmIChkb0xlbmd0aCkge1xuICAgICAgdmFyIGxlbiA9IG9iai5sZW5ndGg7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBsZW4gPD0gblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBsZW5ndGggYXQgbW9zdCAje2V4cH0gYnV0IGdvdCAje2FjdH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIGxlbmd0aCBhYm92ZSAje2V4cH0nXG4gICAgICAgICwgblxuICAgICAgICAsIGxlblxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgb2JqIDw9IG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhdCBtb3N0ICN7ZXhwfSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhYm92ZSAje2V4cH0nXG4gICAgICAgICwgblxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdtb3N0JywgYXNzZXJ0TW9zdCk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2x0ZScsIGFzc2VydE1vc3QpO1xuXG4gIC8qKlxuICAgKiAjIyMgLndpdGhpbihzdGFydCwgZmluaXNoWywgbXNnXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgYSBudW1iZXIgb3IgYSBkYXRlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgZ2l2ZW5cbiAgICogbnVtYmVyIG9yIGRhdGUgYHN0YXJ0YCwgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgZ2l2ZW4gbnVtYmVyIG9yIGRhdGUgYGZpbmlzaGAgcmVzcGVjdGl2ZWx5LlxuICAgKiBIb3dldmVyLCBpdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCB0byBpdHMgZXhwZWN0ZWRcbiAgICogdmFsdWUuXG4gICAqXG4gICAqICAgICBleHBlY3QoMikudG8uZXF1YWwoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMikudG8uYmUud2l0aGluKDEsIDMpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgyKS50by5iZS53aXRoaW4oMiwgMyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDIpLnRvLmJlLndpdGhpbigxLCAyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLmxlbmd0aE9mYCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBhc3NlcnQgdGhhdCB0aGUgdmFsdWUgb2YgdGhlXG4gICAqIHRhcmdldCdzIGBsZW5ndGhgIHByb3BlcnR5IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgZ2l2ZW4gbnVtYmVyXG4gICAqIGBzdGFydGAsIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIGdpdmVuIG51bWJlciBgZmluaXNoYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGhPZigzKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGhPZi53aXRoaW4oMiwgNCk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZigzKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2Yud2l0aGluKDIsIDQpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC53aXRoaW5gLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmVxdWFsKDEpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLm5vdC5iZS53aXRoaW4oMiwgNCk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLndpdGhpbmAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvclxuICAgKiBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhc1xuICAgKiB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDQpLnRvLmJlLndpdGhpbigxLCAzLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoNCwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLndpdGhpbigxLCAzKTtcbiAgICpcbiAgICogQG5hbWUgd2l0aGluXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCBsb3dlciBib3VuZCBpbmNsdXNpdmVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZpbmlzaCB1cHBlciBib3VuZCBpbmNsdXNpdmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ3dpdGhpbicsIGZ1bmN0aW9uIChzdGFydCwgZmluaXNoLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgZG9MZW5ndGggPSBmbGFnKHRoaXMsICdkb0xlbmd0aCcpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgbXNnUHJlZml4ID0gKChmbGFnTXNnKSA/IGZsYWdNc2cgKyAnOiAnIDogJycpXG4gICAgICAsIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJylcbiAgICAgICwgb2JqVHlwZSA9IF8udHlwZShvYmopLnRvTG93ZXJDYXNlKClcbiAgICAgICwgc3RhcnRUeXBlID0gXy50eXBlKHN0YXJ0KS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIGZpbmlzaFR5cGUgPSBfLnR5cGUoZmluaXNoKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIHNob3VsZFRocm93ID0gdHJ1ZVxuICAgICAgLCByYW5nZSA9IChzdGFydFR5cGUgPT09ICdkYXRlJyAmJiBmaW5pc2hUeXBlID09PSAnZGF0ZScpXG4gICAgICAgICAgPyBzdGFydC50b1VUQ1N0cmluZygpICsgJy4uJyArIGZpbmlzaC50b1VUQ1N0cmluZygpXG4gICAgICAgICAgOiBzdGFydCArICcuLicgKyBmaW5pc2g7XG5cbiAgICBpZiAoZG9MZW5ndGgpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICB9XG5cbiAgICBpZiAoIWRvTGVuZ3RoICYmIChvYmpUeXBlID09PSAnZGF0ZScgJiYgKHN0YXJ0VHlwZSAhPT0gJ2RhdGUnIHx8IGZpbmlzaFR5cGUgIT09ICdkYXRlJykpKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyAndGhlIGFyZ3VtZW50cyB0byB3aXRoaW4gbXVzdCBiZSBkYXRlcyc7XG4gICAgfSBlbHNlIGlmICgoc3RhcnRUeXBlICE9PSAnbnVtYmVyJyB8fCBmaW5pc2hUeXBlICE9PSAnbnVtYmVyJykgJiYgKGRvTGVuZ3RoIHx8IG9ialR5cGUgPT09ICdudW1iZXInKSkge1xuICAgICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgJ3RoZSBhcmd1bWVudHMgdG8gd2l0aGluIG11c3QgYmUgbnVtYmVycyc7XG4gICAgfSBlbHNlIGlmICghZG9MZW5ndGggJiYgKG9ialR5cGUgIT09ICdkYXRlJyAmJiBvYmpUeXBlICE9PSAnbnVtYmVyJykpIHtcbiAgICAgIHZhciBwcmludE9iaiA9IChvYmpUeXBlID09PSAnc3RyaW5nJykgPyBcIidcIiArIG9iaiArIFwiJ1wiIDogb2JqO1xuICAgICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgJ2V4cGVjdGVkICcgKyBwcmludE9iaiArICcgdG8gYmUgYSBudW1iZXIgb3IgYSBkYXRlJztcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvdWxkVGhyb3cgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihlcnJvck1lc3NhZ2UsIHVuZGVmaW5lZCwgc3NmaSk7XG4gICAgfVxuXG4gICAgaWYgKGRvTGVuZ3RoKSB7XG4gICAgICB2YXIgbGVuID0gb2JqLmxlbmd0aDtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIGxlbiA+PSBzdGFydCAmJiBsZW4gPD0gZmluaXNoXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIGxlbmd0aCB3aXRoaW4gJyArIHJhbmdlXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSBsZW5ndGggd2l0aGluICcgKyByYW5nZVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgb2JqID49IHN0YXJ0ICYmIG9iaiA8PSBmaW5pc2hcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB3aXRoaW4gJyArIHJhbmdlXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIHdpdGhpbiAnICsgcmFuZ2VcbiAgICAgICk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5pbnN0YW5jZW9mKGNvbnN0cnVjdG9yWywgbXNnXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIGBjb25zdHJ1Y3RvcmAuXG4gICAqXG4gICAqICAgICBmdW5jdGlvbiBDYXQgKCkgeyB9XG4gICAqXG4gICAqICAgICBleHBlY3QobmV3IENhdCgpKS50by5iZS5hbi5pbnN0YW5jZW9mKENhdCk7XG4gICAqICAgICBleHBlY3QoWzEsIDJdKS50by5iZS5hbi5pbnN0YW5jZW9mKEFycmF5KTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5pbnN0YW5jZW9mYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLm5vdC5iZS5hbi5pbnN0YW5jZW9mKEFycmF5KTtcbiAgICpcbiAgICogYC5pbnN0YW5jZW9mYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yXG4gICAqIG1lc3NhZ2UgdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzXG4gICAqIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uYmUuYW4uaW5zdGFuY2VvZihBcnJheSwgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KDEsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5hbi5pbnN0YW5jZW9mKEFycmF5KTtcbiAgICpcbiAgICogRHVlIHRvIGxpbWl0YXRpb25zIGluIEVTNSwgYC5pbnN0YW5jZW9mYCBtYXkgbm90IGFsd2F5cyB3b3JrIGFzIGV4cGVjdGVkXG4gICAqIHdoZW4gdXNpbmcgYSB0cmFuc3BpbGVyIHN1Y2ggYXMgQmFiZWwgb3IgVHlwZVNjcmlwdC4gSW4gcGFydGljdWxhciwgaXQgbWF5XG4gICAqIHByb2R1Y2UgdW5leHBlY3RlZCByZXN1bHRzIHdoZW4gc3ViY2xhc3NpbmcgYnVpbHQtaW4gb2JqZWN0IHN1Y2ggYXNcbiAgICogYEFycmF5YCwgYEVycm9yYCwgYW5kIGBNYXBgLiBTZWUgeW91ciB0cmFuc3BpbGVyJ3MgZG9jcyBmb3IgZGV0YWlsczpcbiAgICpcbiAgICogLSAoW0JhYmVsXShodHRwczovL2JhYmVsanMuaW8vZG9jcy91c2FnZS9jYXZlYXRzLyNjbGFzc2VzKSlcbiAgICogLSAoW1R5cGVTY3JpcHRdKGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC93aWtpL0JyZWFraW5nLUNoYW5nZXMjZXh0ZW5kaW5nLWJ1aWx0LWlucy1saWtlLWVycm9yLWFycmF5LWFuZC1tYXAtbWF5LW5vLWxvbmdlci13b3JrKSlcbiAgICpcbiAgICogVGhlIGFsaWFzIGAuaW5zdGFuY2VPZmAgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5pbnN0YW5jZW9mYC5cbiAgICpcbiAgICogQG5hbWUgaW5zdGFuY2VvZlxuICAgKiBAcGFyYW0ge0NvbnN0cnVjdG9yfSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQGFsaWFzIGluc3RhbmNlT2ZcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0SW5zdGFuY2VPZiAoY29uc3RydWN0b3IsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuXG4gICAgdmFyIHRhcmdldCA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgdmFyIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJyk7XG4gICAgdmFyIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJyk7XG5cbiAgICB0cnkge1xuICAgICAgdmFyIGlzSW5zdGFuY2VPZiA9IHRhcmdldCBpbnN0YW5jZW9mIGNvbnN0cnVjdG9yO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFR5cGVFcnJvcikge1xuICAgICAgICBmbGFnTXNnID0gZmxhZ01zZyA/IGZsYWdNc2cgKyAnOiAnIDogJyc7XG4gICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgICBmbGFnTXNnICsgJ1RoZSBpbnN0YW5jZW9mIGFzc2VydGlvbiBuZWVkcyBhIGNvbnN0cnVjdG9yIGJ1dCAnXG4gICAgICAgICAgICArIF8udHlwZShjb25zdHJ1Y3RvcikgKyAnIHdhcyBnaXZlbi4nLFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICBzc2ZpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuXG4gICAgdmFyIG5hbWUgPSBfLmdldE5hbWUoY29uc3RydWN0b3IpO1xuICAgIGlmIChuYW1lID09PSBudWxsKSB7XG4gICAgICBuYW1lID0gJ2FuIHVubmFtZWQgY29uc3RydWN0b3InO1xuICAgIH1cblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBpc0luc3RhbmNlT2ZcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYW4gaW5zdGFuY2Ugb2YgJyArIG5hbWVcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIGFuIGluc3RhbmNlIG9mICcgKyBuYW1lXG4gICAgKTtcbiAgfTtcblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdpbnN0YW5jZW9mJywgYXNzZXJ0SW5zdGFuY2VPZik7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2luc3RhbmNlT2YnLCBhc3NlcnRJbnN0YW5jZU9mKTtcblxuICAvKipcbiAgICogIyMjIC5wcm9wZXJ0eShuYW1lWywgdmFsWywgbXNnXV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGhhcyBhIHByb3BlcnR5IHdpdGggdGhlIGdpdmVuIGtleSBgbmFtZWAuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5oYXZlLnByb3BlcnR5KCdhJyk7XG4gICAqXG4gICAqIFdoZW4gYHZhbGAgaXMgcHJvdmlkZWQsIGAucHJvcGVydHlgIGFsc28gYXNzZXJ0cyB0aGF0IHRoZSBwcm9wZXJ0eSdzIHZhbHVlXG4gICAqIGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBgdmFsYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmhhdmUucHJvcGVydHkoJ2EnLCAxKTtcbiAgICpcbiAgICogQnkgZGVmYXVsdCwgc3RyaWN0IChgPT09YCkgZXF1YWxpdHkgaXMgdXNlZC4gQWRkIGAuZGVlcGAgZWFybGllciBpbiB0aGVcbiAgICogY2hhaW4gdG8gdXNlIGRlZXAgZXF1YWxpdHkgaW5zdGVhZC4gU2VlIHRoZSBgZGVlcC1lcWxgIHByb2plY3QgcGFnZSBmb3JcbiAgICogaW5mbyBvbiB0aGUgZGVlcCBlcXVhbGl0eSBhbGdvcml0aG06IGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFpanMvZGVlcC1lcWwuXG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgb2JqZWN0IGRlZXBseSAoYnV0IG5vdCBzdHJpY3RseSkgaGFzIHByb3BlcnR5IGB4OiB7YTogMX1gXG4gICAqICAgICBleHBlY3Qoe3g6IHthOiAxfX0pLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eSgneCcsIHthOiAxfSk7XG4gICAqICAgICBleHBlY3Qoe3g6IHthOiAxfX0pLnRvLm5vdC5oYXZlLnByb3BlcnR5KCd4Jywge2E6IDF9KTtcbiAgICpcbiAgICogVGhlIHRhcmdldCdzIGVudW1lcmFibGUgYW5kIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgYXJlIGFsd2F5cyBpbmNsdWRlZFxuICAgKiBpbiB0aGUgc2VhcmNoLiBCeSBkZWZhdWx0LCBib3RoIG93biBhbmQgaW5oZXJpdGVkIHByb3BlcnRpZXMgYXJlIGluY2x1ZGVkLlxuICAgKiBBZGQgYC5vd25gIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIGV4Y2x1ZGUgaW5oZXJpdGVkIHByb3BlcnRpZXMgZnJvbSB0aGVcbiAgICogc2VhcmNoLlxuICAgKlxuICAgKiAgICAgT2JqZWN0LnByb3RvdHlwZS5iID0gMjtcbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmhhdmUub3duLnByb3BlcnR5KCdhJyk7XG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5oYXZlLm93bi5wcm9wZXJ0eSgnYScsIDEpO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5wcm9wZXJ0eSgnYicpLmJ1dC5ub3Qub3duLnByb3BlcnR5KCdiJyk7IFxuICAgKlxuICAgKiBgLmRlZXBgIGFuZCBgLm93bmAgY2FuIGJlIGNvbWJpbmVkLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHt4OiB7YTogMX19KS50by5oYXZlLmRlZXAub3duLnByb3BlcnR5KCd4Jywge2E6IDF9KTtcbiAgICpcbiAgICogQWRkIGAubmVzdGVkYCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBlbmFibGUgZG90LSBhbmQgYnJhY2tldC1ub3RhdGlvbiB3aGVuXG4gICAqIHJlZmVyZW5jaW5nIG5lc3RlZCBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiB7YjogWyd4JywgJ3knXX19KS50by5oYXZlLm5lc3RlZC5wcm9wZXJ0eSgnYS5iWzFdJyk7XG4gICAqICAgICBleHBlY3Qoe2E6IHtiOiBbJ3gnLCAneSddfX0pLnRvLmhhdmUubmVzdGVkLnByb3BlcnR5KCdhLmJbMV0nLCAneScpO1xuICAgKlxuICAgKiBJZiBgLmAgb3IgYFtdYCBhcmUgcGFydCBvZiBhbiBhY3R1YWwgcHJvcGVydHkgbmFtZSwgdGhleSBjYW4gYmUgZXNjYXBlZCBieVxuICAgKiBhZGRpbmcgdHdvIGJhY2tzbGFzaGVzIGJlZm9yZSB0aGVtLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHsnLmEnOiB7J1tiXSc6ICd4J319KS50by5oYXZlLm5lc3RlZC5wcm9wZXJ0eSgnXFxcXC5hLlxcXFxbYlxcXFxdJyk7XG4gICAqXG4gICAqIGAuZGVlcGAgYW5kIGAubmVzdGVkYCBjYW4gYmUgY29tYmluZWQuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IHtiOiBbe2M6IDN9XX19KVxuICAgKiAgICAgICAudG8uaGF2ZS5kZWVwLm5lc3RlZC5wcm9wZXJ0eSgnYS5iWzBdJywge2M6IDN9KTtcbiAgICpcbiAgICogYC5vd25gIGFuZCBgLm5lc3RlZGAgY2Fubm90IGJlIGNvbWJpbmVkLlxuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLnByb3BlcnR5YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLm5vdC5oYXZlLnByb3BlcnR5KCdiJyk7XG4gICAqIFxuICAgKiBIb3dldmVyLCBpdCdzIGRhbmdlcm91cyB0byBuZWdhdGUgYC5wcm9wZXJ0eWAgd2hlbiBwcm92aWRpbmcgYHZhbGAuIFRoZVxuICAgKiBwcm9ibGVtIGlzIHRoYXQgaXQgY3JlYXRlcyB1bmNlcnRhaW4gZXhwZWN0YXRpb25zIGJ5IGFzc2VydGluZyB0aGF0IHRoZVxuICAgKiB0YXJnZXQgZWl0aGVyIGRvZXNuJ3QgaGF2ZSBhIHByb3BlcnR5IHdpdGggdGhlIGdpdmVuIGtleSBgbmFtZWAsIG9yIHRoYXQgaXRcbiAgICogZG9lcyBoYXZlIGEgcHJvcGVydHkgd2l0aCB0aGUgZ2l2ZW4ga2V5IGBuYW1lYCBidXQgaXRzIHZhbHVlIGlzbid0IGVxdWFsIHRvXG4gICAqIHRoZSBnaXZlbiBgdmFsYC4gSXQncyBvZnRlbiBiZXN0IHRvIGlkZW50aWZ5IHRoZSBleGFjdCBvdXRwdXQgdGhhdCdzXG4gICAqIGV4cGVjdGVkLCBhbmQgdGhlbiB3cml0ZSBhbiBhc3NlcnRpb24gdGhhdCBvbmx5IGFjY2VwdHMgdGhhdCBleGFjdCBvdXRwdXQuXG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpc24ndCBleHBlY3RlZCB0byBoYXZlIGEgcHJvcGVydHkgd2l0aCB0aGUgZ2l2ZW4ga2V5XG4gICAqIGBuYW1lYCwgaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydCBleGFjdGx5IHRoYXQuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2I6IDJ9KS50by5ub3QuaGF2ZS5wcm9wZXJ0eSgnYScpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KHtiOiAyfSkudG8ubm90LmhhdmUucHJvcGVydHkoJ2EnLCAxKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBleHBlY3RlZCB0byBoYXZlIGEgcHJvcGVydHkgd2l0aCB0aGUgZ2l2ZW4ga2V5IGBuYW1lYCxcbiAgICogaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydCB0aGF0IHRoZSBwcm9wZXJ0eSBoYXMgaXRzIGV4cGVjdGVkIHZhbHVlLCByYXRoZXJcbiAgICogdGhhbiBhc3NlcnRpbmcgdGhhdCBpdCBkb2Vzbid0IGhhdmUgb25lIG9mIG1hbnkgdW5leHBlY3RlZCB2YWx1ZXMuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDN9KS50by5oYXZlLnByb3BlcnR5KCdhJywgMyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2E6IDN9KS50by5ub3QuaGF2ZS5wcm9wZXJ0eSgnYScsIDEpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5wcm9wZXJ0eWAgY2hhbmdlcyB0aGUgdGFyZ2V0IG9mIGFueSBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpblxuICAgKiB0byBiZSB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IGZyb20gdGhlIG9yaWdpbmFsIHRhcmdldCBvYmplY3QuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5oYXZlLnByb3BlcnR5KCdhJykudGhhdC5pcy5hKCdudW1iZXInKTtcbiAgICpcbiAgICogYC5wcm9wZXJ0eWAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvclxuICAgKiBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhc1xuICAgKiB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLiBXaGVuIG5vdCBwcm92aWRpbmcgYHZhbGAsIG9ubHkgdXNlIHRoZVxuICAgKiBzZWNvbmQgZm9ybS5cbiAgICpcbiAgICogICAgIC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5oYXZlLnByb3BlcnR5KCdhJywgMiwgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmhhdmUucHJvcGVydHkoJ2EnLCAyKTtcbiAgICogICAgIGV4cGVjdCh7YTogMX0sICdub29vIHdoeSBmYWlsPz8nKS50by5oYXZlLnByb3BlcnR5KCdiJyk7XG4gICAqXG4gICAqICAgICAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmhhdmUucHJvcGVydHkoJ2InLCB1bmRlZmluZWQsICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICogXG4gICAqIFRoZSBhYm92ZSBhc3NlcnRpb24gaXNuJ3QgdGhlIHNhbWUgdGhpbmcgYXMgbm90IHByb3ZpZGluZyBgdmFsYC4gSW5zdGVhZCxcbiAgICogaXQncyBhc3NlcnRpbmcgdGhhdCB0aGUgdGFyZ2V0IG9iamVjdCBoYXMgYSBgYmAgcHJvcGVydHkgdGhhdCdzIGVxdWFsIHRvXG4gICAqIGB1bmRlZmluZWRgLlxuICAgKlxuICAgKiBUaGUgYXNzZXJ0aW9ucyBgLm93blByb3BlcnR5YCBhbmQgYC5oYXZlT3duUHJvcGVydHlgIGNhbiBiZSB1c2VkXG4gICAqIGludGVyY2hhbmdlYWJseSB3aXRoIGAub3duLnByb3BlcnR5YC5cbiAgICpcbiAgICogQG5hbWUgcHJvcGVydHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsIChvcHRpb25hbClcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEByZXR1cm5zIHZhbHVlIG9mIHByb3BlcnR5IGZvciBjaGFpbmluZ1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRQcm9wZXJ0eSAobmFtZSwgdmFsLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcblxuICAgIHZhciBpc05lc3RlZCA9IGZsYWcodGhpcywgJ25lc3RlZCcpXG4gICAgICAsIGlzT3duID0gZmxhZyh0aGlzLCAnb3duJylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpO1xuXG4gICAgaWYgKGlzTmVzdGVkICYmIGlzT3duKSB7XG4gICAgICBmbGFnTXNnID0gZmxhZ01zZyA/IGZsYWdNc2cgKyAnOiAnIDogJyc7XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgIGZsYWdNc2cgKyAnVGhlIFwibmVzdGVkXCIgYW5kIFwib3duXCIgZmxhZ3MgY2Fubm90IGJlIGNvbWJpbmVkLicsXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgc3NmaVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmbGFnTXNnID0gZmxhZ01zZyA/IGZsYWdNc2cgKyAnOiAnIDogJyc7XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgIGZsYWdNc2cgKyAnVGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZC4nLFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHNzZmlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdmFyIGlzRGVlcCA9IGZsYWcodGhpcywgJ2RlZXAnKVxuICAgICAgLCBuZWdhdGUgPSBmbGFnKHRoaXMsICduZWdhdGUnKVxuICAgICAgLCBwYXRoSW5mbyA9IGlzTmVzdGVkID8gXy5nZXRQYXRoSW5mbyhvYmosIG5hbWUpIDogbnVsbFxuICAgICAgLCB2YWx1ZSA9IGlzTmVzdGVkID8gcGF0aEluZm8udmFsdWUgOiBvYmpbbmFtZV07XG5cbiAgICB2YXIgZGVzY3JpcHRvciA9ICcnO1xuICAgIGlmIChpc0RlZXApIGRlc2NyaXB0b3IgKz0gJ2RlZXAgJztcbiAgICBpZiAoaXNPd24pIGRlc2NyaXB0b3IgKz0gJ293biAnO1xuICAgIGlmIChpc05lc3RlZCkgZGVzY3JpcHRvciArPSAnbmVzdGVkICc7XG4gICAgZGVzY3JpcHRvciArPSAncHJvcGVydHkgJztcblxuICAgIHZhciBoYXNQcm9wZXJ0eTtcbiAgICBpZiAoaXNPd24pIGhhc1Byb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgbmFtZSk7XG4gICAgZWxzZSBpZiAoaXNOZXN0ZWQpIGhhc1Byb3BlcnR5ID0gcGF0aEluZm8uZXhpc3RzO1xuICAgIGVsc2UgaGFzUHJvcGVydHkgPSBfLmhhc1Byb3BlcnR5KG9iaiwgbmFtZSk7XG5cbiAgICAvLyBXaGVuIHBlcmZvcm1pbmcgYSBuZWdhdGVkIGFzc2VydGlvbiBmb3IgYm90aCBuYW1lIGFuZCB2YWwsIG1lcmVseSBoYXZpbmdcbiAgICAvLyBhIHByb3BlcnR5IHdpdGggdGhlIGdpdmVuIG5hbWUgaXNuJ3QgZW5vdWdoIHRvIGNhdXNlIHRoZSBhc3NlcnRpb24gdG9cbiAgICAvLyBmYWlsLiBJdCBtdXN0IGJvdGggaGF2ZSBhIHByb3BlcnR5IHdpdGggdGhlIGdpdmVuIG5hbWUsIGFuZCB0aGUgdmFsdWUgb2ZcbiAgICAvLyB0aGF0IHByb3BlcnR5IG11c3QgZXF1YWwgdGhlIGdpdmVuIHZhbC4gVGhlcmVmb3JlLCBza2lwIHRoaXMgYXNzZXJ0aW9uIGluXG4gICAgLy8gZmF2b3Igb2YgdGhlIG5leHQuXG4gICAgaWYgKCFuZWdhdGUgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgaGFzUHJvcGVydHlcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlICcgKyBkZXNjcmlwdG9yICsgXy5pbnNwZWN0KG5hbWUpXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgJyArIGRlc2NyaXB0b3IgKyBfLmluc3BlY3QobmFtZSkpO1xuICAgIH1cblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgaGFzUHJvcGVydHkgJiYgKGlzRGVlcCA/IF8uZXFsKHZhbCwgdmFsdWUpIDogdmFsID09PSB2YWx1ZSlcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlICcgKyBkZXNjcmlwdG9yICsgXy5pbnNwZWN0KG5hbWUpICsgJyBvZiAje2V4cH0sIGJ1dCBnb3QgI3thY3R9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlICcgKyBkZXNjcmlwdG9yICsgXy5pbnNwZWN0KG5hbWUpICsgJyBvZiAje2FjdH0nXG4gICAgICAgICwgdmFsXG4gICAgICAgICwgdmFsdWVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZmxhZyh0aGlzLCAnb2JqZWN0JywgdmFsdWUpO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgncHJvcGVydHknLCBhc3NlcnRQcm9wZXJ0eSk7XG5cbiAgZnVuY3Rpb24gYXNzZXJ0T3duUHJvcGVydHkgKG5hbWUsIHZhbHVlLCBtc2cpIHtcbiAgICBmbGFnKHRoaXMsICdvd24nLCB0cnVlKTtcbiAgICBhc3NlcnRQcm9wZXJ0eS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnb3duUHJvcGVydHknLCBhc3NlcnRPd25Qcm9wZXJ0eSk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2hhdmVPd25Qcm9wZXJ0eScsIGFzc2VydE93blByb3BlcnR5KTtcblxuICAvKipcbiAgICogIyMjIC5vd25Qcm9wZXJ0eURlc2NyaXB0b3IobmFtZVssIGRlc2NyaXB0b3JbLCBtc2ddXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaGFzIGl0cyBvd24gcHJvcGVydHkgZGVzY3JpcHRvciB3aXRoIHRoZSBnaXZlbiBrZXlcbiAgICogYG5hbWVgLiBFbnVtZXJhYmxlIGFuZCBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGFyZSBpbmNsdWRlZCBpbiB0aGVcbiAgICogc2VhcmNoLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5vd25Qcm9wZXJ0eURlc2NyaXB0b3IoJ2EnKTtcbiAgICpcbiAgICogV2hlbiBgZGVzY3JpcHRvcmAgaXMgcHJvdmlkZWQsIGAub3duUHJvcGVydHlEZXNjcmlwdG9yYCBhbHNvIGFzc2VydHMgdGhhdFxuICAgKiB0aGUgcHJvcGVydHkncyBkZXNjcmlwdG9yIGlzIGRlZXBseSBlcXVhbCB0byB0aGUgZ2l2ZW4gYGRlc2NyaXB0b3JgLiBTZWVcbiAgICogdGhlIGBkZWVwLWVxbGAgcHJvamVjdCBwYWdlIGZvciBpbmZvIG9uIHRoZSBkZWVwIGVxdWFsaXR5IGFsZ29yaXRobTpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2NoYWlqcy9kZWVwLWVxbC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmhhdmUub3duUHJvcGVydHlEZXNjcmlwdG9yKCdhJywge1xuICAgKiAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAqICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAqICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgKiAgICAgICB2YWx1ZTogMSxcbiAgICogICAgIH0pO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLm93blByb3BlcnR5RGVzY3JpcHRvcmAuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5ub3QuaGF2ZS5vd25Qcm9wZXJ0eURlc2NyaXB0b3IoJ2InKTtcbiAgICogXG4gICAqIEhvd2V2ZXIsIGl0J3MgZGFuZ2Vyb3VzIHRvIG5lZ2F0ZSBgLm93blByb3BlcnR5RGVzY3JpcHRvcmAgd2hlbiBwcm92aWRpbmdcbiAgICogYSBgZGVzY3JpcHRvcmAuIFRoZSBwcm9ibGVtIGlzIHRoYXQgaXQgY3JlYXRlcyB1bmNlcnRhaW4gZXhwZWN0YXRpb25zIGJ5XG4gICAqIGFzc2VydGluZyB0aGF0IHRoZSB0YXJnZXQgZWl0aGVyIGRvZXNuJ3QgaGF2ZSBhIHByb3BlcnR5IGRlc2NyaXB0b3Igd2l0aFxuICAgKiB0aGUgZ2l2ZW4ga2V5IGBuYW1lYCwgb3IgdGhhdCBpdCBkb2VzIGhhdmUgYSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHdpdGggdGhlXG4gICAqIGdpdmVuIGtleSBgbmFtZWAgYnV0IGl0cyBub3QgZGVlcGx5IGVxdWFsIHRvIHRoZSBnaXZlbiBgZGVzY3JpcHRvcmAuIEl0J3NcbiAgICogb2Z0ZW4gYmVzdCB0byBpZGVudGlmeSB0aGUgZXhhY3Qgb3V0cHV0IHRoYXQncyBleHBlY3RlZCwgYW5kIHRoZW4gd3JpdGUgYW5cbiAgICogYXNzZXJ0aW9uIHRoYXQgb25seSBhY2NlcHRzIHRoYXQgZXhhY3Qgb3V0cHV0LlxuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXNuJ3QgZXhwZWN0ZWQgdG8gaGF2ZSBhIHByb3BlcnR5IGRlc2NyaXB0b3Igd2l0aCB0aGUgZ2l2ZW5cbiAgICoga2V5IGBuYW1lYCwgaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydCBleGFjdGx5IHRoYXQuXG4gICAqXG4gICAqICAgICAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KHtiOiAyfSkudG8ubm90LmhhdmUub3duUHJvcGVydHlEZXNjcmlwdG9yKCdhJyk7XG4gICAqXG4gICAqICAgICAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh7YjogMn0pLnRvLm5vdC5oYXZlLm93blByb3BlcnR5RGVzY3JpcHRvcignYScsIHtcbiAgICogICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICogICAgICAgdmFsdWU6IDEsXG4gICAqICAgICB9KTtcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGV4cGVjdGVkIHRvIGhhdmUgYSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHdpdGggdGhlIGdpdmVuXG4gICAqIGtleSBgbmFtZWAsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgcHJvcGVydHkgaGFzIGl0cyBleHBlY3RlZFxuICAgKiBkZXNjcmlwdG9yLCByYXRoZXIgdGhhbiBhc3NlcnRpbmcgdGhhdCBpdCBkb2Vzbid0IGhhdmUgb25lIG9mIG1hbnlcbiAgICogdW5leHBlY3RlZCBkZXNjcmlwdG9ycy5cbiAgICpcbiAgICogICAgIC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2E6IDN9KS50by5oYXZlLm93blByb3BlcnR5RGVzY3JpcHRvcignYScsIHtcbiAgICogICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICogICAgICAgdmFsdWU6IDMsXG4gICAqICAgICB9KTtcbiAgICpcbiAgICogICAgIC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KHthOiAzfSkudG8ubm90LmhhdmUub3duUHJvcGVydHlEZXNjcmlwdG9yKCdhJywge1xuICAgKiAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAqICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAqICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgKiAgICAgICB2YWx1ZTogMSxcbiAgICogICAgIH0pO1xuICAgKlxuICAgKiBgLm93blByb3BlcnR5RGVzY3JpcHRvcmAgY2hhbmdlcyB0aGUgdGFyZ2V0IG9mIGFueSBhc3NlcnRpb25zIHRoYXQgZm9sbG93XG4gICAqIGluIHRoZSBjaGFpbiB0byBiZSB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IGRlc2NyaXB0b3IgZnJvbSB0aGUgb3JpZ2luYWxcbiAgICogdGFyZ2V0IG9iamVjdC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmhhdmUub3duUHJvcGVydHlEZXNjcmlwdG9yKCdhJylcbiAgICogICAgICAgLnRoYXQuaGFzLnByb3BlcnR5KCdlbnVtZXJhYmxlJywgdHJ1ZSk7XG4gICAqXG4gICAqIGAub3duUHJvcGVydHlEZXNjcmlwdG9yYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGFcbiAgICogY3VzdG9tIGVycm9yIG1lc3NhZ2UgdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvXG4gICAqIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuIFdoZW4gbm90IHByb3ZpZGluZ1xuICAgKiBgZGVzY3JpcHRvcmAsIG9ubHkgdXNlIHRoZSBzZWNvbmQgZm9ybS5cbiAgICpcbiAgICogICAgIC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5oYXZlLm93blByb3BlcnR5RGVzY3JpcHRvcignYScsIHtcbiAgICogICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICogICAgICAgdmFsdWU6IDIsXG4gICAqICAgICB9LCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqXG4gICAqICAgICAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KHthOiAxfSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmhhdmUub3duUHJvcGVydHlEZXNjcmlwdG9yKCdhJywge1xuICAgKiAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAqICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAqICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgKiAgICAgICB2YWx1ZTogMixcbiAgICogICAgIH0pO1xuICAgKiBcbiAgICogICAgIC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2E6IDF9LCAnbm9vbyB3aHkgZmFpbD8/JykudG8uaGF2ZS5vd25Qcm9wZXJ0eURlc2NyaXB0b3IoJ2InKTtcbiAgICpcbiAgICogICAgIC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KHthOiAxfSlcbiAgICogICAgICAgLnRvLmhhdmUub3duUHJvcGVydHlEZXNjcmlwdG9yKCdiJywgdW5kZWZpbmVkLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqXG4gICAqIFRoZSBhYm92ZSBhc3NlcnRpb24gaXNuJ3QgdGhlIHNhbWUgdGhpbmcgYXMgbm90IHByb3ZpZGluZyBgZGVzY3JpcHRvcmAuXG4gICAqIEluc3RlYWQsIGl0J3MgYXNzZXJ0aW5nIHRoYXQgdGhlIHRhcmdldCBvYmplY3QgaGFzIGEgYGJgIHByb3BlcnR5XG4gICAqIGRlc2NyaXB0b3IgdGhhdCdzIGRlZXBseSBlcXVhbCB0byBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogVGhlIGFsaWFzIGAuaGF2ZU93blByb3BlcnR5RGVzY3JpcHRvcmAgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGhcbiAgICogYC5vd25Qcm9wZXJ0eURlc2NyaXB0b3JgLlxuICAgKlxuICAgKiBAbmFtZSBvd25Qcm9wZXJ0eURlc2NyaXB0b3JcbiAgICogQGFsaWFzIGhhdmVPd25Qcm9wZXJ0eURlc2NyaXB0b3JcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGRlc2NyaXB0b3IgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0T3duUHJvcGVydHlEZXNjcmlwdG9yIChuYW1lLCBkZXNjcmlwdG9yLCBtc2cpIHtcbiAgICBpZiAodHlwZW9mIGRlc2NyaXB0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtc2cgPSBkZXNjcmlwdG9yO1xuICAgICAgZGVzY3JpcHRvciA9IG51bGw7XG4gICAgfVxuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICB2YXIgYWN0dWFsRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0KG9iaiksIG5hbWUpO1xuICAgIGlmIChhY3R1YWxEZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IpIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIF8uZXFsKGRlc2NyaXB0b3IsIGFjdHVhbERlc2NyaXB0b3IpXG4gICAgICAgICwgJ2V4cGVjdGVkIHRoZSBvd24gcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgJyArIF8uaW5zcGVjdChuYW1lKSArICcgb24gI3t0aGlzfSB0byBtYXRjaCAnICsgXy5pbnNwZWN0KGRlc2NyaXB0b3IpICsgJywgZ290ICcgKyBfLmluc3BlY3QoYWN0dWFsRGVzY3JpcHRvcilcbiAgICAgICAgLCAnZXhwZWN0ZWQgdGhlIG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciAnICsgXy5pbnNwZWN0KG5hbWUpICsgJyBvbiAje3RoaXN9IHRvIG5vdCBtYXRjaCAnICsgXy5pbnNwZWN0KGRlc2NyaXB0b3IpXG4gICAgICAgICwgZGVzY3JpcHRvclxuICAgICAgICAsIGFjdHVhbERlc2NyaXB0b3JcbiAgICAgICAgLCB0cnVlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBhY3R1YWxEZXNjcmlwdG9yXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhbiBvd24gcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgJyArIF8uaW5zcGVjdChuYW1lKVxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGFuIG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciAnICsgXy5pbnNwZWN0KG5hbWUpXG4gICAgICApO1xuICAgIH1cbiAgICBmbGFnKHRoaXMsICdvYmplY3QnLCBhY3R1YWxEZXNjcmlwdG9yKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ293blByb3BlcnR5RGVzY3JpcHRvcicsIGFzc2VydE93blByb3BlcnR5RGVzY3JpcHRvcik7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2hhdmVPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCBhc3NlcnRPd25Qcm9wZXJ0eURlc2NyaXB0b3IpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmxlbmd0aE9mKG5bLCBtc2ddKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCdzIGBsZW5ndGhgIHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBudW1iZXJcbiAgICogYG5gLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZigzKTtcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGhPZigzKTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5sZW5ndGhPZmAuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW5cbiAgICogYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0J3MgYGxlbmd0aGAgcHJvcGVydHkgaXMgZXF1YWwgdG8gaXRzIGV4cGVjdGVkXG4gICAqIHZhbHVlLCByYXRoZXIgdGhhbiBub3QgZXF1YWwgdG8gb25lIG9mIG1hbnkgdW5leHBlY3RlZCB2YWx1ZXMuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoT2YoMyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLm5vdC5oYXZlLmxlbmd0aE9mKDQpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5sZW5ndGhPZmAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvclxuICAgKiBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhc1xuICAgKiB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZigyLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uaGF2ZS5sZW5ndGhPZigyKTtcbiAgICpcbiAgICogYC5sZW5ndGhPZmAgY2FuIGFsc28gYmUgdXNlZCBhcyBhIGxhbmd1YWdlIGNoYWluLCBjYXVzaW5nIGFsbCBgLmFib3ZlYCxcbiAgICogYC5iZWxvd2AsIGAubGVhc3RgLCBgLm1vc3RgLCBhbmQgYC53aXRoaW5gIGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlXG4gICAqIGNoYWluIHRvIHVzZSB0aGUgdGFyZ2V0J3MgYGxlbmd0aGAgcHJvcGVydHkgYXMgdGhlIHRhcmdldC4gSG93ZXZlciwgaXQnc1xuICAgKiBvZnRlbiBiZXN0IHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQncyBgbGVuZ3RoYCBwcm9wZXJ0eSBpcyBlcXVhbCB0byBpdHNcbiAgICogZXhwZWN0ZWQgbGVuZ3RoLCByYXRoZXIgdGhhbiBhc3NlcnRpbmcgdGhhdCBpdHMgYGxlbmd0aGAgcHJvcGVydHkgZmFsbHNcbiAgICogd2l0aGluIHNvbWUgcmFuZ2Ugb2YgdmFsdWVzLlxuICAgKlxuICAgKiAgICAgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2YoMyk7XG4gICAqXG4gICAqICAgICAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2YuYWJvdmUoMik7XG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLmxlbmd0aE9mLmJlbG93KDQpO1xuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZi5hdC5sZWFzdCgzKTtcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2YuYXQubW9zdCgzKTtcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2Yud2l0aGluKDIsNCk7XG4gICAqXG4gICAqIER1ZSB0byBhIGNvbXBhdGliaWxpdHkgaXNzdWUsIHRoZSBhbGlhcyBgLmxlbmd0aGAgY2FuJ3QgYmUgY2hhaW5lZCBkaXJlY3RseVxuICAgKiBvZmYgb2YgYW4gdW5pbnZva2VkIG1ldGhvZCBzdWNoIGFzIGAuYWAuIFRoZXJlZm9yZSwgYC5sZW5ndGhgIGNhbid0IGJlIHVzZWRcbiAgICogaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5sZW5ndGhPZmAgaW4gZXZlcnkgc2l0dWF0aW9uLiBJdCdzIHJlY29tbWVuZGVkIHRvXG4gICAqIGFsd2F5cyB1c2UgYC5sZW5ndGhPZmAgaW5zdGVhZCBvZiBgLmxlbmd0aGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLmEubGVuZ3RoKDMpOyAvLyBpbmNvbXBhdGlibGU7IHRocm93cyBlcnJvclxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5hLmxlbmd0aE9mKDMpOyAgLy8gcGFzc2VzIGFzIGV4cGVjdGVkXG4gICAqXG4gICAqIEBuYW1lIGxlbmd0aE9mXG4gICAqIEBhbGlhcyBsZW5ndGhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydExlbmd0aENoYWluICgpIHtcbiAgICBmbGFnKHRoaXMsICdkb0xlbmd0aCcsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXNzZXJ0TGVuZ3RoIChuLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpO1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICB2YXIgbGVuID0gb2JqLmxlbmd0aDtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBsZW4gPT0gblxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgbGVuZ3RoIG9mICN7ZXhwfSBidXQgZ290ICN7YWN0fSdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSBsZW5ndGggb2YgI3thY3R9J1xuICAgICAgLCBuXG4gICAgICAsIGxlblxuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKCdsZW5ndGgnLCBhc3NlcnRMZW5ndGgsIGFzc2VydExlbmd0aENoYWluKTtcbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnbGVuZ3RoT2YnLCBhc3NlcnRMZW5ndGgsIGFzc2VydExlbmd0aENoYWluKTtcblxuICAvKipcbiAgICogIyMjIC5tYXRjaChyZVssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IG1hdGNoZXMgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBgcmVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb29iYXInKS50by5tYXRjaCgvXmZvby8pO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLm1hdGNoYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vYmFyJykudG8ubm90Lm1hdGNoKC90YWNvLyk7XG4gICAqXG4gICAqIGAubWF0Y2hgIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3IgbWVzc2FnZVxuICAgKiB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXMgdGhlXG4gICAqIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vYmFyJykudG8ubWF0Y2goL3RhY28vLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoJ2Zvb2JhcicsICdub29vIHdoeSBmYWlsPz8nKS50by5tYXRjaCgvdGFjby8pO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5tYXRjaGVzYCBjYW4gYmUgdXNlZCBpbnRlcmNoYW5nZWFibHkgd2l0aCBgLm1hdGNoYC5cbiAgICpcbiAgICogQG5hbWUgbWF0Y2hcbiAgICogQGFsaWFzIG1hdGNoZXNcbiAgICogQHBhcmFtIHtSZWdFeHB9IHJlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cbiAgZnVuY3Rpb24gYXNzZXJ0TWF0Y2gocmUsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgcmUuZXhlYyhvYmopXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG1hdGNoICcgKyByZVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gbWF0Y2ggJyArIHJlXG4gICAgKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ21hdGNoJywgYXNzZXJ0TWF0Y2gpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdtYXRjaGVzJywgYXNzZXJ0TWF0Y2gpO1xuXG4gIC8qKlxuICAgKiAjIyMgLnN0cmluZyhzdHJbLCBtc2ddKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBzdHJpbmcgY29udGFpbnMgdGhlIGdpdmVuIHN1YnN0cmluZyBgc3RyYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vYmFyJykudG8uaGF2ZS5zdHJpbmcoJ2JhcicpO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLnN0cmluZ2AuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2Zvb2JhcicpLnRvLm5vdC5oYXZlLnN0cmluZygndGFjbycpO1xuICAgKlxuICAgKiBgLnN0cmluZ2AgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvclxuICAgKiBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhc1xuICAgKiB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb29iYXInKS50by5oYXZlLnN0cmluZygvdGFjby8sICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICogICAgIGV4cGVjdCgnZm9vYmFyJywgJ25vb28gd2h5IGZhaWw/PycpLnRvLmhhdmUuc3RyaW5nKC90YWNvLyk7XG4gICAqXG4gICAqIEBuYW1lIHN0cmluZ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdzdHJpbmcnLCBmdW5jdGlvbiAoc3RyLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpO1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKCdzdHJpbmcnKTtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICB+b2JqLmluZGV4T2Yoc3RyKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBjb250YWluICcgKyBfLmluc3BlY3Qoc3RyKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgY29udGFpbiAnICsgXy5pbnNwZWN0KHN0cilcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5rZXlzKGtleTFbLCBrZXkyWywgLi4uXV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IG9iamVjdCwgYXJyYXksIG1hcCwgb3Igc2V0IGhhcyB0aGUgZ2l2ZW4ga2V5cy4gT25seVxuICAgKiB0aGUgdGFyZ2V0J3Mgb3duIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGFyZSBpbmNsdWRlZCBpbiB0aGUgc2VhcmNoLiBcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGFuIG9iamVjdCBvciBhcnJheSwga2V5cyBjYW4gYmUgcHJvdmlkZWQgYXMgb25lIG9yIG1vcmVcbiAgICogc3RyaW5nIGFyZ3VtZW50cywgYSBzaW5nbGUgYXJyYXkgYXJndW1lbnQsIG9yIGEgc2luZ2xlIG9iamVjdCBhcmd1bWVudC4gSW5cbiAgICogdGhlIGxhdHRlciBjYXNlLCBvbmx5IHRoZSBrZXlzIGluIHRoZSBnaXZlbiBvYmplY3QgbWF0dGVyOyB0aGUgdmFsdWVzIGFyZVxuICAgKiBpZ25vcmVkLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxLCBiOiAyfSkudG8uaGF2ZS5hbGwua2V5cygnYScsICdiJyk7XG4gICAqICAgICBleHBlY3QoWyd4JywgJ3knXSkudG8uaGF2ZS5hbGwua2V5cygwLCAxKTtcbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMn0pLnRvLmhhdmUuYWxsLmtleXMoWydhJywgJ2InXSk7XG4gICAqICAgICBleHBlY3QoWyd4JywgJ3knXSkudG8uaGF2ZS5hbGwua2V5cyhbMCwgMV0pO1xuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxLCBiOiAyfSkudG8uaGF2ZS5hbGwua2V5cyh7YTogNCwgYjogNX0pOyAvLyBpZ25vcmUgNCBhbmQgNVxuICAgKiAgICAgZXhwZWN0KFsneCcsICd5J10pLnRvLmhhdmUuYWxsLmtleXMoezA6IDQsIDE6IDV9KTsgLy8gaWdub3JlIDQgYW5kIDVcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGEgbWFwIG9yIHNldCwgZWFjaCBrZXkgbXVzdCBiZSBwcm92aWRlZCBhcyBhIHNlcGFyYXRlXG4gICAqIGFyZ3VtZW50LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KG5ldyBNYXAoW1snYScsIDFdLCBbJ2InLCAyXV0pKS50by5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICogICAgIGV4cGVjdChuZXcgU2V0KFsnYScsICdiJ10pKS50by5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICpcbiAgICogQmVjYXVzZSBgLmtleXNgIGRvZXMgZGlmZmVyZW50IHRoaW5ncyBiYXNlZCBvbiB0aGUgdGFyZ2V0J3MgdHlwZSwgaXQnc1xuICAgKiBpbXBvcnRhbnQgdG8gY2hlY2sgdGhlIHRhcmdldCdzIHR5cGUgYmVmb3JlIHVzaW5nIGAua2V5c2AuIFNlZSB0aGUgYC5hYCBkb2NcbiAgICogZm9yIGluZm8gb24gdGVzdGluZyBhIHRhcmdldCdzIHR5cGUuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDJ9KS50by5iZS5hbignb2JqZWN0JykudGhhdC5oYXMuYWxsLmtleXMoJ2EnLCAnYicpO1xuICAgKlxuICAgKiBCeSBkZWZhdWx0LCBzdHJpY3QgKGA9PT1gKSBlcXVhbGl0eSBpcyB1c2VkIHRvIGNvbXBhcmUga2V5cyBvZiBtYXBzIGFuZFxuICAgKiBzZXRzLiBBZGQgYC5kZWVwYCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byB1c2UgZGVlcCBlcXVhbGl0eSBpbnN0ZWFkLiBTZWVcbiAgICogdGhlIGBkZWVwLWVxbGAgcHJvamVjdCBwYWdlIGZvciBpbmZvIG9uIHRoZSBkZWVwIGVxdWFsaXR5IGFsZ29yaXRobTpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2NoYWlqcy9kZWVwLWVxbC5cbiAgICpcbiAgICogICAgIC8vIFRhcmdldCBzZXQgZGVlcGx5IChidXQgbm90IHN0cmljdGx5KSBoYXMga2V5IGB7YTogMX1gXG4gICAqICAgICBleHBlY3QobmV3IFNldChbe2E6IDF9XSkpLnRvLmhhdmUuYWxsLmRlZXAua2V5cyhbe2E6IDF9XSk7XG4gICAqICAgICBleHBlY3QobmV3IFNldChbe2E6IDF9XSkpLnRvLm5vdC5oYXZlLmFsbC5rZXlzKFt7YTogMX1dKTtcbiAgICpcbiAgICogQnkgZGVmYXVsdCwgdGhlIHRhcmdldCBtdXN0IGhhdmUgYWxsIG9mIHRoZSBnaXZlbiBrZXlzIGFuZCBubyBtb3JlLiBBZGRcbiAgICogYC5hbnlgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG9ubHkgcmVxdWlyZSB0aGF0IHRoZSB0YXJnZXQgaGF2ZSBhdCBsZWFzdFxuICAgKiBvbmUgb2YgdGhlIGdpdmVuIGtleXMuIEFsc28sIGFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlXG4gICAqIGAua2V5c2AuIEl0J3Mgb2Z0ZW4gYmVzdCB0byBhZGQgYC5hbnlgIHdoZW4gbmVnYXRpbmcgYC5rZXlzYCwgYW5kIHRvIHVzZVxuICAgKiBgLmFsbGAgd2hlbiBhc3NlcnRpbmcgYC5rZXlzYCB3aXRob3V0IG5lZ2F0aW9uLlxuICAgKlxuICAgKiBXaGVuIG5lZ2F0aW5nIGAua2V5c2AsIGAuYW55YCBpcyBwcmVmZXJyZWQgYmVjYXVzZSBgLm5vdC5hbnkua2V5c2AgYXNzZXJ0c1xuICAgKiBleGFjdGx5IHdoYXQncyBleHBlY3RlZCBvZiB0aGUgb3V0cHV0LCB3aGVyZWFzIGAubm90LmFsbC5rZXlzYCBjcmVhdGVzXG4gICAqIHVuY2VydGFpbiBleHBlY3RhdGlvbnMuXG4gICAqXG4gICAqICAgICAvLyBSZWNvbW1lbmRlZDsgYXNzZXJ0cyB0aGF0IHRhcmdldCBkb2Vzbid0IGhhdmUgYW55IG9mIHRoZSBnaXZlbiBrZXlzXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDJ9KS50by5ub3QuaGF2ZS5hbnkua2V5cygnYycsICdkJyk7XG4gICAqXG4gICAqICAgICAvLyBOb3QgcmVjb21tZW5kZWQ7IGFzc2VydHMgdGhhdCB0YXJnZXQgZG9lc24ndCBoYXZlIGFsbCBvZiB0aGUgZ2l2ZW5cbiAgICogICAgIC8vIGtleXMgYnV0IG1heSBvciBtYXkgbm90IGhhdmUgc29tZSBvZiB0aGVtXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDJ9KS50by5ub3QuaGF2ZS5hbGwua2V5cygnYycsICdkJyk7XG4gICAqXG4gICAqIFdoZW4gYXNzZXJ0aW5nIGAua2V5c2Agd2l0aG91dCBuZWdhdGlvbiwgYC5hbGxgIGlzIHByZWZlcnJlZCBiZWNhdXNlXG4gICAqIGAuYWxsLmtleXNgIGFzc2VydHMgZXhhY3RseSB3aGF0J3MgZXhwZWN0ZWQgb2YgdGhlIG91dHB1dCwgd2hlcmVhc1xuICAgKiBgLmFueS5rZXlzYCBjcmVhdGVzIHVuY2VydGFpbiBleHBlY3RhdGlvbnMuXG4gICAqXG4gICAqICAgICAvLyBSZWNvbW1lbmRlZDsgYXNzZXJ0cyB0aGF0IHRhcmdldCBoYXMgYWxsIHRoZSBnaXZlbiBrZXlzXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDJ9KS50by5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICpcbiAgICogICAgIC8vIE5vdCByZWNvbW1lbmRlZDsgYXNzZXJ0cyB0aGF0IHRhcmdldCBoYXMgYXQgbGVhc3Qgb25lIG9mIHRoZSBnaXZlblxuICAgKiAgICAgLy8ga2V5cyBidXQgbWF5IG9yIG1heSBub3QgaGF2ZSBtb3JlIG9mIHRoZW1cbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMn0pLnRvLmhhdmUuYW55LmtleXMoJ2EnLCAnYicpO1xuICAgKlxuICAgKiBOb3RlIHRoYXQgYC5hbGxgIGlzIHVzZWQgYnkgZGVmYXVsdCB3aGVuIG5laXRoZXIgYC5hbGxgIG5vciBgLmFueWAgYXBwZWFyXG4gICAqIGVhcmxpZXIgaW4gdGhlIGNoYWluLiBIb3dldmVyLCBpdCdzIG9mdGVuIGJlc3QgdG8gYWRkIGAuYWxsYCBhbnl3YXkgYmVjYXVzZVxuICAgKiBpdCBpbXByb3ZlcyByZWFkYWJpbGl0eS5cbiAgICpcbiAgICogICAgIC8vIEJvdGggYXNzZXJ0aW9ucyBhcmUgaWRlbnRpY2FsXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDJ9KS50by5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMn0pLnRvLmhhdmUua2V5cygnYScsICdiJyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBZGQgYC5pbmNsdWRlYCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byByZXF1aXJlIHRoYXQgdGhlIHRhcmdldCdzIGtleXMgYmUgYVxuICAgKiBzdXBlcnNldCBvZiB0aGUgZXhwZWN0ZWQga2V5cywgcmF0aGVyIHRoYW4gaWRlbnRpY2FsIHNldHMuXG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgb2JqZWN0J3Mga2V5cyBhcmUgYSBzdXBlcnNldCBvZiBbJ2EnLCAnYiddIGJ1dCBub3QgaWRlbnRpY2FsXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDIsIGM6IDN9KS50by5pbmNsdWRlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMiwgYzogM30pLnRvLm5vdC5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICpcbiAgICogSG93ZXZlciwgaWYgYC5hbnlgIGFuZCBgLmluY2x1ZGVgIGFyZSBjb21iaW5lZCwgb25seSB0aGUgYC5hbnlgIHRha2VzXG4gICAqIGVmZmVjdC4gVGhlIGAuaW5jbHVkZWAgaXMgaWdub3JlZCBpbiB0aGlzIGNhc2UuXG4gICAqXG4gICAqICAgICAvLyBCb3RoIGFzc2VydGlvbnMgYXJlIGlkZW50aWNhbFxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5hbnkua2V5cygnYScsICdiJyk7XG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5pbmNsdWRlLmFueS5rZXlzKCdhJywgJ2InKTtcbiAgICpcbiAgICogQSBjdXN0b20gZXJyb3IgbWVzc2FnZSBjYW4gYmUgZ2l2ZW4gYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0sICdub29vIHdoeSBmYWlsPz8nKS50by5oYXZlLmtleSgnYicpO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5rZXlgIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAua2V5c2AuXG4gICAqXG4gICAqIEBuYW1lIGtleXNcbiAgICogQGFsaWFzIGtleVxuICAgKiBAcGFyYW0gey4uLlN0cmluZ3xBcnJheXxPYmplY3R9IGtleXNcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0S2V5cyAoa2V5cykge1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBvYmpUeXBlID0gXy50eXBlKG9iailcbiAgICAgICwga2V5c1R5cGUgPSBfLnR5cGUoa2V5cylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKVxuICAgICAgLCBpc0RlZXAgPSBmbGFnKHRoaXMsICdkZWVwJylcbiAgICAgICwgc3RyXG4gICAgICAsIGRlZXBTdHIgPSAnJ1xuICAgICAgLCBvayA9IHRydWVcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKTtcblxuICAgIGZsYWdNc2cgPSBmbGFnTXNnID8gZmxhZ01zZyArICc6ICcgOiAnJztcbiAgICB2YXIgbWl4ZWRBcmdzTXNnID0gZmxhZ01zZyArICd3aGVuIHRlc3Rpbmcga2V5cyBhZ2FpbnN0IGFuIG9iamVjdCBvciBhbiBhcnJheSB5b3UgbXVzdCBnaXZlIGEgc2luZ2xlIEFycmF5fE9iamVjdHxTdHJpbmcgYXJndW1lbnQgb3IgbXVsdGlwbGUgU3RyaW5nIGFyZ3VtZW50cyc7XG5cbiAgICBpZiAob2JqVHlwZSA9PT0gJ01hcCcgfHwgb2JqVHlwZSA9PT0gJ1NldCcpIHtcbiAgICAgIGRlZXBTdHIgPSBpc0RlZXAgPyAnZGVlcGx5ICcgOiAnJztcbiAgICAgIGFjdHVhbCA9IFtdO1xuXG4gICAgICAvLyBNYXAgYW5kIFNldCAnLmtleXMnIGFyZW4ndCBzdXBwb3J0ZWQgaW4gSUUgMTEuIFRoZXJlZm9yZSwgdXNlIC5mb3JFYWNoLlxuICAgICAgb2JqLmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7IGFjdHVhbC5wdXNoKGtleSkgfSk7XG5cbiAgICAgIGlmIChrZXlzVHlwZSAhPT0gJ0FycmF5Jykge1xuICAgICAgICBrZXlzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBhY3R1YWwgPSBfLmdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzKG9iaik7XG5cbiAgICAgIHN3aXRjaCAoa2V5c1R5cGUpIHtcbiAgICAgICAgY2FzZSAnQXJyYXknOlxuICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKG1peGVkQXJnc01zZywgdW5kZWZpbmVkLCBzc2ZpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ09iamVjdCc6XG4gICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IobWl4ZWRBcmdzTXNnLCB1bmRlZmluZWQsIHNzZmkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMoa2V5cyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAga2V5cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIC8vIE9ubHkgc3RyaW5naWZ5IG5vbi1TeW1ib2xzIGJlY2F1c2UgU3ltYm9scyB3b3VsZCBiZWNvbWUgXCJTeW1ib2woKVwiXG4gICAgICBrZXlzID0ga2V5cy5tYXAoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N5bWJvbCcgPyB2YWwgOiBTdHJpbmcodmFsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICgha2V5cy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihmbGFnTXNnICsgJ2tleXMgcmVxdWlyZWQnLCB1bmRlZmluZWQsIHNzZmkpO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBrZXlzLmxlbmd0aFxuICAgICAgLCBhbnkgPSBmbGFnKHRoaXMsICdhbnknKVxuICAgICAgLCBhbGwgPSBmbGFnKHRoaXMsICdhbGwnKVxuICAgICAgLCBleHBlY3RlZCA9IGtleXNcbiAgICAgICwgYWN0dWFsO1xuXG4gICAgaWYgKCFhbnkgJiYgIWFsbCkge1xuICAgICAgYWxsID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBIYXMgYW55XG4gICAgaWYgKGFueSkge1xuICAgICAgb2sgPSBleHBlY3RlZC5zb21lKGZ1bmN0aW9uKGV4cGVjdGVkS2V5KSB7XG4gICAgICAgIHJldHVybiBhY3R1YWwuc29tZShmdW5jdGlvbihhY3R1YWxLZXkpIHtcbiAgICAgICAgICBpZiAoaXNEZWVwKSB7XG4gICAgICAgICAgICByZXR1cm4gXy5lcWwoZXhwZWN0ZWRLZXksIGFjdHVhbEtleSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBleHBlY3RlZEtleSA9PT0gYWN0dWFsS2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBIYXMgYWxsXG4gICAgaWYgKGFsbCkge1xuICAgICAgb2sgPSBleHBlY3RlZC5ldmVyeShmdW5jdGlvbihleHBlY3RlZEtleSkge1xuICAgICAgICByZXR1cm4gYWN0dWFsLnNvbWUoZnVuY3Rpb24oYWN0dWFsS2V5KSB7XG4gICAgICAgICAgaWYgKGlzRGVlcCkge1xuICAgICAgICAgICAgcmV0dXJuIF8uZXFsKGV4cGVjdGVkS2V5LCBhY3R1YWxLZXkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWRLZXkgPT09IGFjdHVhbEtleTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghZmxhZyh0aGlzLCAnY29udGFpbnMnKSkge1xuICAgICAgICBvayA9IG9rICYmIGtleXMubGVuZ3RoID09IGFjdHVhbC5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gS2V5IHN0cmluZ1xuICAgIGlmIChsZW4gPiAxKSB7XG4gICAgICBrZXlzID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBfLmluc3BlY3Qoa2V5KTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGxhc3QgPSBrZXlzLnBvcCgpO1xuICAgICAgaWYgKGFsbCkge1xuICAgICAgICBzdHIgPSBrZXlzLmpvaW4oJywgJykgKyAnLCBhbmQgJyArIGxhc3Q7XG4gICAgICB9XG4gICAgICBpZiAoYW55KSB7XG4gICAgICAgIHN0ciA9IGtleXMuam9pbignLCAnKSArICcsIG9yICcgKyBsYXN0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBfLmluc3BlY3Qoa2V5c1swXSk7XG4gICAgfVxuXG4gICAgLy8gRm9ybVxuICAgIHN0ciA9IChsZW4gPiAxID8gJ2tleXMgJyA6ICdrZXkgJykgKyBzdHI7XG5cbiAgICAvLyBIYXZlIC8gaW5jbHVkZVxuICAgIHN0ciA9IChmbGFnKHRoaXMsICdjb250YWlucycpID8gJ2NvbnRhaW4gJyA6ICdoYXZlICcpICsgc3RyO1xuXG4gICAgLy8gQXNzZXJ0aW9uXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIG9rXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvICcgKyBkZWVwU3RyICsgc3RyXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCAnICsgZGVlcFN0ciArIHN0clxuICAgICAgLCBleHBlY3RlZC5zbGljZSgwKS5zb3J0KF8uY29tcGFyZUJ5SW5zcGVjdClcbiAgICAgICwgYWN0dWFsLnNvcnQoXy5jb21wYXJlQnlJbnNwZWN0KVxuICAgICAgLCB0cnVlXG4gICAgKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2tleXMnLCBhc3NlcnRLZXlzKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgna2V5JywgYXNzZXJ0S2V5cyk7XG5cbiAgLyoqXG4gICAqICMjIyAudGhyb3coW2Vycm9yTGlrZV0sIFtlcnJNc2dNYXRjaGVyXSwgW21zZ10pXG4gICAqXG4gICAqIFdoZW4gbm8gYXJndW1lbnRzIGFyZSBwcm92aWRlZCwgYC50aHJvd2AgaW52b2tlcyB0aGUgdGFyZ2V0IGZ1bmN0aW9uIGFuZFxuICAgKiBhc3NlcnRzIHRoYXQgYW4gZXJyb3IgaXMgdGhyb3duLlxuICAgKiBcbiAgICogICAgIHZhciBiYWRGbiA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBzYWxtb24hJyk7IH07XG4gICAqXG4gICAqICAgICBleHBlY3QoYmFkRm4pLnRvLnRocm93KCk7XG4gICAqXG4gICAqIFdoZW4gb25lIGFyZ3VtZW50IGlzIHByb3ZpZGVkLCBhbmQgaXQncyBhbiBlcnJvciBjb25zdHJ1Y3RvciwgYC50aHJvd2BcbiAgICogaW52b2tlcyB0aGUgdGFyZ2V0IGZ1bmN0aW9uIGFuZCBhc3NlcnRzIHRoYXQgYW4gZXJyb3IgaXMgdGhyb3duIHRoYXQncyBhblxuICAgKiBpbnN0YW5jZSBvZiB0aGF0IGVycm9yIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiAgICAgdmFyIGJhZEZuID0gZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIHNhbG1vbiEnKTsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChiYWRGbikudG8udGhyb3coVHlwZUVycm9yKTtcbiAgICpcbiAgICogV2hlbiBvbmUgYXJndW1lbnQgaXMgcHJvdmlkZWQsIGFuZCBpdCdzIGFuIGVycm9yIGluc3RhbmNlLCBgLnRocm93YCBpbnZva2VzXG4gICAqIHRoZSB0YXJnZXQgZnVuY3Rpb24gYW5kIGFzc2VydHMgdGhhdCBhbiBlcnJvciBpcyB0aHJvd24gdGhhdCdzIHN0cmljdGx5XG4gICAqIChgPT09YCkgZXF1YWwgdG8gdGhhdCBlcnJvciBpbnN0YW5jZS5cbiAgICpcbiAgICogICAgIHZhciBlcnIgPSBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIHNhbG1vbiEnKTtcbiAgICogICAgIHZhciBiYWRGbiA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgZXJyOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGJhZEZuKS50by50aHJvdyhlcnIpO1xuICAgKlxuICAgKiBXaGVuIG9uZSBhcmd1bWVudCBpcyBwcm92aWRlZCwgYW5kIGl0J3MgYSBzdHJpbmcsIGAudGhyb3dgIGludm9rZXMgdGhlXG4gICAqIHRhcmdldCBmdW5jdGlvbiBhbmQgYXNzZXJ0cyB0aGF0IGFuIGVycm9yIGlzIHRocm93biB3aXRoIGEgbWVzc2FnZSB0aGF0XG4gICAqIGNvbnRhaW5zIHRoYXQgc3RyaW5nLlxuICAgKlxuICAgKiAgICAgdmFyIGJhZEZuID0gZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIHNhbG1vbiEnKTsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChiYWRGbikudG8udGhyb3coJ3NhbG1vbicpO1xuICAgKlxuICAgKiBXaGVuIG9uZSBhcmd1bWVudCBpcyBwcm92aWRlZCwgYW5kIGl0J3MgYSByZWd1bGFyIGV4cHJlc3Npb24sIGAudGhyb3dgXG4gICAqIGludm9rZXMgdGhlIHRhcmdldCBmdW5jdGlvbiBhbmQgYXNzZXJ0cyB0aGF0IGFuIGVycm9yIGlzIHRocm93biB3aXRoIGFcbiAgICogbWVzc2FnZSB0aGF0IG1hdGNoZXMgdGhhdCByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAqXG4gICAqICAgICB2YXIgYmFkRm4gPSBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgc2FsbW9uIScpOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGJhZEZuKS50by50aHJvdygvc2FsbW9uLyk7XG4gICAqXG4gICAqIFdoZW4gdHdvIGFyZ3VtZW50cyBhcmUgcHJvdmlkZWQsIGFuZCB0aGUgZmlyc3QgaXMgYW4gZXJyb3IgaW5zdGFuY2Ugb3JcbiAgICogY29uc3RydWN0b3IsIGFuZCB0aGUgc2Vjb25kIGlzIGEgc3RyaW5nIG9yIHJlZ3VsYXIgZXhwcmVzc2lvbiwgYC50aHJvd2BcbiAgICogaW52b2tlcyB0aGUgZnVuY3Rpb24gYW5kIGFzc2VydHMgdGhhdCBhbiBlcnJvciBpcyB0aHJvd24gdGhhdCBmdWxmaWxscyBib3RoXG4gICAqIGNvbmRpdGlvbnMgYXMgZGVzY3JpYmVkIGFib3ZlLlxuICAgKlxuICAgKiAgICAgdmFyIGVyciA9IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgc2FsbW9uIScpO1xuICAgKiAgICAgdmFyIGJhZEZuID0gZnVuY3Rpb24gKCkgeyB0aHJvdyBlcnI7IH07XG4gICAqXG4gICAqICAgICBleHBlY3QoYmFkRm4pLnRvLnRocm93KFR5cGVFcnJvciwgJ3NhbG1vbicpO1xuICAgKiAgICAgZXhwZWN0KGJhZEZuKS50by50aHJvdyhUeXBlRXJyb3IsIC9zYWxtb24vKTtcbiAgICogICAgIGV4cGVjdChiYWRGbikudG8udGhyb3coZXJyLCAnc2FsbW9uJyk7XG4gICAqICAgICBleHBlY3QoYmFkRm4pLnRvLnRocm93KGVyciwgL3NhbG1vbi8pO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLnRocm93YC5cbiAgICogICAgIFxuICAgKiAgICAgdmFyIGdvb2RGbiA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGdvb2RGbikudG8ubm90LnRocm93KCk7XG4gICAqIFxuICAgKiBIb3dldmVyLCBpdCdzIGRhbmdlcm91cyB0byBuZWdhdGUgYC50aHJvd2Agd2hlbiBwcm92aWRpbmcgYW55IGFyZ3VtZW50cy5cbiAgICogVGhlIHByb2JsZW0gaXMgdGhhdCBpdCBjcmVhdGVzIHVuY2VydGFpbiBleHBlY3RhdGlvbnMgYnkgYXNzZXJ0aW5nIHRoYXQgdGhlXG4gICAqIHRhcmdldCBlaXRoZXIgZG9lc24ndCB0aHJvdyBhbiBlcnJvciwgb3IgdGhhdCBpdCB0aHJvd3MgYW4gZXJyb3IgYnV0IG9mIGFcbiAgICogZGlmZmVyZW50IHR5cGUgdGhhbiB0aGUgZ2l2ZW4gdHlwZSwgb3IgdGhhdCBpdCB0aHJvd3MgYW4gZXJyb3Igb2YgdGhlIGdpdmVuXG4gICAqIHR5cGUgYnV0IHdpdGggYSBtZXNzYWdlIHRoYXQgZG9lc24ndCBpbmNsdWRlIHRoZSBnaXZlbiBzdHJpbmcuIEl0J3Mgb2Z0ZW5cbiAgICogYmVzdCB0byBpZGVudGlmeSB0aGUgZXhhY3Qgb3V0cHV0IHRoYXQncyBleHBlY3RlZCwgYW5kIHRoZW4gd3JpdGUgYW5cbiAgICogYXNzZXJ0aW9uIHRoYXQgb25seSBhY2NlcHRzIHRoYXQgZXhhY3Qgb3V0cHV0LlxuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXNuJ3QgZXhwZWN0ZWQgdG8gdGhyb3cgYW4gZXJyb3IsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnRcbiAgICogZXhhY3RseSB0aGF0LlxuICAgKlxuICAgKiAgICAgdmFyIGdvb2RGbiA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGdvb2RGbikudG8ubm90LnRocm93KCk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoZ29vZEZuKS50by5ub3QudGhyb3coUmVmZXJlbmNlRXJyb3IsICd4Jyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXMgZXhwZWN0ZWQgdG8gdGhyb3cgYW4gZXJyb3IsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnRcbiAgICogdGhhdCB0aGUgZXJyb3IgaXMgb2YgaXRzIGV4cGVjdGVkIHR5cGUsIGFuZCBoYXMgYSBtZXNzYWdlIHRoYXQgaW5jbHVkZXMgYW5cbiAgICogZXhwZWN0ZWQgc3RyaW5nLCByYXRoZXIgdGhhbiBhc3NlcnRpbmcgdGhhdCBpdCBkb2Vzbid0IGhhdmUgb25lIG9mIG1hbnlcbiAgICogdW5leHBlY3RlZCB0eXBlcywgYW5kIGRvZXNuJ3QgaGF2ZSBhIG1lc3NhZ2UgdGhhdCBpbmNsdWRlcyBzb21lIHN0cmluZy5cbiAgICpcbiAgICogICAgIHZhciBiYWRGbiA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBzYWxtb24hJyk7IH07XG4gICAqXG4gICAqICAgICBleHBlY3QoYmFkRm4pLnRvLnRocm93KFR5cGVFcnJvciwgJ3NhbG1vbicpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KGJhZEZuKS50by5ub3QudGhyb3coUmVmZXJlbmNlRXJyb3IsICd4Jyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLnRocm93YCBjaGFuZ2VzIHRoZSB0YXJnZXQgb2YgYW55IGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlIGNoYWluIHRvXG4gICAqIGJlIHRoZSBlcnJvciBvYmplY3QgdGhhdCdzIHRocm93bi5cbiAgICpcbiAgICogICAgIHZhciBlcnIgPSBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIHNhbG1vbiEnKTtcbiAgICogICAgIGVyci5jb2RlID0gNDI7XG4gICAqICAgICB2YXIgYmFkRm4gPSBmdW5jdGlvbiAoKSB7IHRocm93IGVycjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChiYWRGbikudG8udGhyb3coVHlwZUVycm9yKS53aXRoLnByb3BlcnR5KCdjb2RlJywgNDIpO1xuICAgKlxuICAgKiBgLnRocm93YCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yIG1lc3NhZ2VcbiAgICogdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzIHRoZVxuICAgKiBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuIFdoZW4gbm90IHByb3ZpZGluZyB0d28gYXJndW1lbnRzLCBhbHdheXMgdXNlXG4gICAqIHRoZSBzZWNvbmQgZm9ybS5cbiAgICpcbiAgICogICAgIHZhciBnb29kRm4gPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChnb29kRm4pLnRvLnRocm93KFR5cGVFcnJvciwgJ3gnLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoZ29vZEZuLCAnbm9vbyB3aHkgZmFpbD8/JykudG8udGhyb3coKTtcbiAgICpcbiAgICogRHVlIHRvIGxpbWl0YXRpb25zIGluIEVTNSwgYC50aHJvd2AgbWF5IG5vdCBhbHdheXMgd29yayBhcyBleHBlY3RlZCB3aGVuXG4gICAqIHVzaW5nIGEgdHJhbnNwaWxlciBzdWNoIGFzIEJhYmVsIG9yIFR5cGVTY3JpcHQuIEluIHBhcnRpY3VsYXIsIGl0IG1heVxuICAgKiBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cyB3aGVuIHN1YmNsYXNzaW5nIHRoZSBidWlsdC1pbiBgRXJyb3JgIG9iamVjdCBhbmRcbiAgICogdGhlbiBwYXNzaW5nIHRoZSBzdWJjbGFzc2VkIGNvbnN0cnVjdG9yIHRvIGAudGhyb3dgLiBTZWUgeW91ciB0cmFuc3BpbGVyJ3NcbiAgICogZG9jcyBmb3IgZGV0YWlsczpcbiAgICpcbiAgICogLSAoW0JhYmVsXShodHRwczovL2JhYmVsanMuaW8vZG9jcy91c2FnZS9jYXZlYXRzLyNjbGFzc2VzKSlcbiAgICogLSAoW1R5cGVTY3JpcHRdKGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC93aWtpL0JyZWFraW5nLUNoYW5nZXMjZXh0ZW5kaW5nLWJ1aWx0LWlucy1saWtlLWVycm9yLWFycmF5LWFuZC1tYXAtbWF5LW5vLWxvbmdlci13b3JrKSlcbiAgICpcbiAgICogQmV3YXJlIG9mIHNvbWUgY29tbW9uIG1pc3Rha2VzIHdoZW4gdXNpbmcgdGhlIGB0aHJvd2AgYXNzZXJ0aW9uLiBPbmUgY29tbW9uXG4gICAqIG1pc3Rha2UgaXMgdG8gYWNjaWRlbnRhbGx5IGludm9rZSB0aGUgZnVuY3Rpb24geW91cnNlbGYgaW5zdGVhZCBvZiBsZXR0aW5nXG4gICAqIHRoZSBgdGhyb3dgIGFzc2VydGlvbiBpbnZva2UgdGhlIGZ1bmN0aW9uIGZvciB5b3UuIEZvciBleGFtcGxlLCB3aGVuXG4gICAqIHRlc3RpbmcgaWYgYSBmdW5jdGlvbiBuYW1lZCBgZm5gIHRocm93cywgcHJvdmlkZSBgZm5gIGluc3RlYWQgb2YgYGZuKClgIGFzXG4gICAqIHRoZSB0YXJnZXQgZm9yIHRoZSBhc3NlcnRpb24uXG4gICAqXG4gICAqICAgICBleHBlY3QoZm4pLnRvLnRocm93KCk7ICAgICAvLyBHb29kISBUZXN0cyBgZm5gIGFzIGRlc2lyZWRcbiAgICogICAgIGV4cGVjdChmbigpKS50by50aHJvdygpOyAgIC8vIEJhZCEgVGVzdHMgcmVzdWx0IG9mIGBmbigpYCwgbm90IGBmbmBcbiAgICpcbiAgICogSWYgeW91IG5lZWQgdG8gYXNzZXJ0IHRoYXQgeW91ciBmdW5jdGlvbiBgZm5gIHRocm93cyB3aGVuIHBhc3NlZCBjZXJ0YWluXG4gICAqIGFyZ3VtZW50cywgdGhlbiB3cmFwIGEgY2FsbCB0byBgZm5gIGluc2lkZSBvZiBhbm90aGVyIGZ1bmN0aW9uLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZ1bmN0aW9uICgpIHsgZm4oNDIpOyB9KS50by50aHJvdygpOyAgLy8gRnVuY3Rpb24gZXhwcmVzc2lvblxuICAgKiAgICAgZXhwZWN0KCgpID0+IGZuKDQyKSkudG8udGhyb3coKTsgICAgICAgICAgICAgLy8gRVM2IGFycm93IGZ1bmN0aW9uXG4gICAqXG4gICAqIEFub3RoZXIgY29tbW9uIG1pc3Rha2UgaXMgdG8gcHJvdmlkZSBhbiBvYmplY3QgbWV0aG9kIChvciBhbnkgc3RhbmQtYWxvbmVcbiAgICogZnVuY3Rpb24gdGhhdCByZWxpZXMgb24gYHRoaXNgKSBhcyB0aGUgdGFyZ2V0IG9mIHRoZSBhc3NlcnRpb24uIERvaW5nIHNvIGlzXG4gICAqIHByb2JsZW1hdGljIGJlY2F1c2UgdGhlIGB0aGlzYCBjb250ZXh0IHdpbGwgYmUgbG9zdCB3aGVuIHRoZSBmdW5jdGlvbiBpc1xuICAgKiBpbnZva2VkIGJ5IGAudGhyb3dgOyB0aGVyZSdzIG5vIHdheSBmb3IgaXQgdG8ga25vdyB3aGF0IGB0aGlzYCBpcyBzdXBwb3NlZFxuICAgKiB0byBiZS4gVGhlcmUgYXJlIHR3byB3YXlzIGFyb3VuZCB0aGlzIHByb2JsZW0uIE9uZSBzb2x1dGlvbiBpcyB0byB3cmFwIHRoZVxuICAgKiBtZXRob2Qgb3IgZnVuY3Rpb24gY2FsbCBpbnNpZGUgb2YgYW5vdGhlciBmdW5jdGlvbi4gQW5vdGhlciBzb2x1dGlvbiBpcyB0b1xuICAgKiB1c2UgYGJpbmRgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZ1bmN0aW9uICgpIHsgY2F0Lm1lb3coKTsgfSkudG8udGhyb3coKTsgIC8vIEZ1bmN0aW9uIGV4cHJlc3Npb25cbiAgICogICAgIGV4cGVjdCgoKSA9PiBjYXQubWVvdygpKS50by50aHJvdygpOyAgICAgICAgICAgICAvLyBFUzYgYXJyb3cgZnVuY3Rpb25cbiAgICogICAgIGV4cGVjdChjYXQubWVvdy5iaW5kKGNhdCkpLnRvLnRocm93KCk7ICAgICAgICAgICAvLyBCaW5kXG4gICAqXG4gICAqIEZpbmFsbHksIGl0J3Mgd29ydGggbWVudGlvbmluZyB0aGF0IGl0J3MgYSBiZXN0IHByYWN0aWNlIGluIEphdmFTY3JpcHQgdG9cbiAgICogb25seSB0aHJvdyBgRXJyb3JgIGFuZCBkZXJpdmF0aXZlcyBvZiBgRXJyb3JgIHN1Y2ggYXMgYFJlZmVyZW5jZUVycm9yYCxcbiAgICogYFR5cGVFcnJvcmAsIGFuZCB1c2VyLWRlZmluZWQgb2JqZWN0cyB0aGF0IGV4dGVuZCBgRXJyb3JgLiBObyBvdGhlciB0eXBlIG9mXG4gICAqIHZhbHVlIHdpbGwgZ2VuZXJhdGUgYSBzdGFjayB0cmFjZSB3aGVuIGluaXRpYWxpemVkLiBXaXRoIHRoYXQgc2FpZCwgdGhlXG4gICAqIGB0aHJvd2AgYXNzZXJ0aW9uIGRvZXMgdGVjaG5pY2FsbHkgc3VwcG9ydCBhbnkgdHlwZSBvZiB2YWx1ZSBiZWluZyB0aHJvd24sXG4gICAqIG5vdCBqdXN0IGBFcnJvcmAgYW5kIGl0cyBkZXJpdmF0aXZlcy5cbiAgICpcbiAgICogVGhlIGFsaWFzZXMgYC50aHJvd3NgIGFuZCBgLlRocm93YCBjYW4gYmUgdXNlZCBpbnRlcmNoYW5nZWFibHkgd2l0aFxuICAgKiBgLnRocm93YC5cbiAgICpcbiAgICogQG5hbWUgdGhyb3dcbiAgICogQGFsaWFzIHRocm93c1xuICAgKiBAYWxpYXMgVGhyb3dcbiAgICogQHBhcmFtIHtFcnJvcnxFcnJvckNvbnN0cnVjdG9yfSBlcnJvckxpa2VcbiAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBlcnJNc2dNYXRjaGVyIGVycm9yIG1lc3NhZ2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRXJyb3IjRXJyb3JfdHlwZXNcbiAgICogQHJldHVybnMgZXJyb3IgZm9yIGNoYWluaW5nIChudWxsIGlmIG5vIGVycm9yKVxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRUaHJvd3MgKGVycm9yTGlrZSwgZXJyTXNnTWF0Y2hlciwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBuZWdhdGUgPSBmbGFnKHRoaXMsICduZWdhdGUnKSB8fCBmYWxzZTtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYSgnZnVuY3Rpb24nKTtcblxuICAgIGlmIChlcnJvckxpa2UgaW5zdGFuY2VvZiBSZWdFeHAgfHwgdHlwZW9mIGVycm9yTGlrZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVyck1zZ01hdGNoZXIgPSBlcnJvckxpa2U7XG4gICAgICBlcnJvckxpa2UgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBjYXVnaHRFcnI7XG4gICAgdHJ5IHtcbiAgICAgIG9iaigpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY2F1Z2h0RXJyID0gZXJyO1xuICAgIH1cblxuICAgIC8vIElmIHdlIGhhdmUgdGhlIG5lZ2F0ZSBmbGFnIGVuYWJsZWQgYW5kIGF0IGxlYXN0IG9uZSB2YWxpZCBhcmd1bWVudCBpdCBtZWFucyB3ZSBkbyBleHBlY3QgYW4gZXJyb3JcbiAgICAvLyBidXQgd2Ugd2FudCBpdCB0byBtYXRjaCBhIGdpdmVuIHNldCBvZiBjcml0ZXJpYVxuICAgIHZhciBldmVyeUFyZ0lzVW5kZWZpbmVkID0gZXJyb3JMaWtlID09PSB1bmRlZmluZWQgJiYgZXJyTXNnTWF0Y2hlciA9PT0gdW5kZWZpbmVkO1xuXG4gICAgLy8gSWYgd2UndmUgZ290IHRoZSBuZWdhdGUgZmxhZyBlbmFibGVkIGFuZCBib3RoIGFyZ3MsIHdlIHNob3VsZCBvbmx5IGZhaWwgaWYgYm90aCBhcmVuJ3QgY29tcGF0aWJsZVxuICAgIC8vIFNlZSBJc3N1ZSAjNTUxIGFuZCBQUiAjNjgzQEdpdEh1YlxuICAgIHZhciBldmVyeUFyZ0lzRGVmaW5lZCA9IEJvb2xlYW4oZXJyb3JMaWtlICYmIGVyck1zZ01hdGNoZXIpO1xuICAgIHZhciBlcnJvckxpa2VGYWlsID0gZmFsc2U7XG4gICAgdmFyIGVyck1zZ01hdGNoZXJGYWlsID0gZmFsc2U7XG5cbiAgICAvLyBDaGVja2luZyBpZiBlcnJvciB3YXMgdGhyb3duXG4gICAgaWYgKGV2ZXJ5QXJnSXNVbmRlZmluZWQgfHwgIWV2ZXJ5QXJnSXNVbmRlZmluZWQgJiYgIW5lZ2F0ZSkge1xuICAgICAgLy8gV2UgbmVlZCB0aGlzIHRvIGRpc3BsYXkgcmVzdWx0cyBjb3JyZWN0bHkgYWNjb3JkaW5nIHRvIHRoZWlyIHR5cGVzXG4gICAgICB2YXIgZXJyb3JMaWtlU3RyaW5nID0gJ2FuIGVycm9yJztcbiAgICAgIGlmIChlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBlcnJvckxpa2VTdHJpbmcgPSAnI3tleHB9JztcbiAgICAgIH0gZWxzZSBpZiAoZXJyb3JMaWtlKSB7XG4gICAgICAgIGVycm9yTGlrZVN0cmluZyA9IF8uY2hlY2tFcnJvci5nZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgY2F1Z2h0RXJyXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgJyArIGVycm9yTGlrZVN0cmluZ1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCB0aHJvdyBhbiBlcnJvciBidXQgI3thY3R9IHdhcyB0aHJvd24nXG4gICAgICAgICwgZXJyb3JMaWtlICYmIGVycm9yTGlrZS50b1N0cmluZygpXG4gICAgICAgICwgKGNhdWdodEVyciBpbnN0YW5jZW9mIEVycm9yID9cbiAgICAgICAgICAgIGNhdWdodEVyci50b1N0cmluZygpIDogKHR5cGVvZiBjYXVnaHRFcnIgPT09ICdzdHJpbmcnID8gY2F1Z2h0RXJyIDogY2F1Z2h0RXJyICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmNoZWNrRXJyb3IuZ2V0Q29uc3RydWN0b3JOYW1lKGNhdWdodEVycikpKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3JMaWtlICYmIGNhdWdodEVycikge1xuICAgICAgLy8gV2Ugc2hvdWxkIGNvbXBhcmUgaW5zdGFuY2VzIG9ubHkgaWYgYGVycm9yTGlrZWAgaXMgYW4gaW5zdGFuY2Ugb2YgYEVycm9yYFxuICAgICAgaWYgKGVycm9yTGlrZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHZhciBpc0NvbXBhdGlibGVJbnN0YW5jZSA9IF8uY2hlY2tFcnJvci5jb21wYXRpYmxlSW5zdGFuY2UoY2F1Z2h0RXJyLCBlcnJvckxpa2UpO1xuXG4gICAgICAgIGlmIChpc0NvbXBhdGlibGVJbnN0YW5jZSA9PT0gbmVnYXRlKSB7XG4gICAgICAgICAgLy8gVGhlc2UgY2hlY2tzIHdlcmUgY3JlYXRlZCB0byBlbnN1cmUgd2Ugd29uJ3QgZmFpbCB0b28gc29vbiB3aGVuIHdlJ3ZlIGdvdCBib3RoIGFyZ3MgYW5kIGEgbmVnYXRlXG4gICAgICAgICAgLy8gU2VlIElzc3VlICM1NTEgYW5kIFBSICM2ODNAR2l0SHViXG4gICAgICAgICAgaWYgKGV2ZXJ5QXJnSXNEZWZpbmVkICYmIG5lZ2F0ZSkge1xuICAgICAgICAgICAgZXJyb3JMaWtlRmFpbCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgICAgICAgIG5lZ2F0ZVxuICAgICAgICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIHRocm93ICN7ZXhwfSBidXQgI3thY3R9IHdhcyB0aHJvd24nXG4gICAgICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93ICN7ZXhwfScgKyAoY2F1Z2h0RXJyICYmICFuZWdhdGUgPyAnIGJ1dCAje2FjdH0gd2FzIHRocm93bicgOiAnJylcbiAgICAgICAgICAgICAgLCBlcnJvckxpa2UudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAsIGNhdWdodEVyci50b1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaXNDb21wYXRpYmxlQ29uc3RydWN0b3IgPSBfLmNoZWNrRXJyb3IuY29tcGF0aWJsZUNvbnN0cnVjdG9yKGNhdWdodEVyciwgZXJyb3JMaWtlKTtcbiAgICAgIGlmIChpc0NvbXBhdGlibGVDb25zdHJ1Y3RvciA9PT0gbmVnYXRlKSB7XG4gICAgICAgIGlmIChldmVyeUFyZ0lzRGVmaW5lZCAmJiBuZWdhdGUpIHtcbiAgICAgICAgICAgIGVycm9yTGlrZUZhaWwgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgICAgICBuZWdhdGVcbiAgICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgI3tleHB9IGJ1dCAje2FjdH0gd2FzIHRocm93bidcbiAgICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93ICN7ZXhwfScgKyAoY2F1Z2h0RXJyID8gJyBidXQgI3thY3R9IHdhcyB0aHJvd24nIDogJycpXG4gICAgICAgICAgICAsIChlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yTGlrZS50b1N0cmluZygpIDogZXJyb3JMaWtlICYmIF8uY2hlY2tFcnJvci5nZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKSlcbiAgICAgICAgICAgICwgKGNhdWdodEVyciBpbnN0YW5jZW9mIEVycm9yID8gY2F1Z2h0RXJyLnRvU3RyaW5nKCkgOiBjYXVnaHRFcnIgJiYgXy5jaGVja0Vycm9yLmdldENvbnN0cnVjdG9yTmFtZShjYXVnaHRFcnIpKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2F1Z2h0RXJyICYmIGVyck1zZ01hdGNoZXIgIT09IHVuZGVmaW5lZCAmJiBlcnJNc2dNYXRjaGVyICE9PSBudWxsKSB7XG4gICAgICAvLyBIZXJlIHdlIGNoZWNrIGNvbXBhdGlibGUgbWVzc2FnZXNcbiAgICAgIHZhciBwbGFjZWhvbGRlciA9ICdpbmNsdWRpbmcnO1xuICAgICAgaWYgKGVyck1zZ01hdGNoZXIgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcGxhY2Vob2xkZXIgPSAnbWF0Y2hpbmcnXG4gICAgICB9XG5cbiAgICAgIHZhciBpc0NvbXBhdGlibGVNZXNzYWdlID0gXy5jaGVja0Vycm9yLmNvbXBhdGlibGVNZXNzYWdlKGNhdWdodEVyciwgZXJyTXNnTWF0Y2hlcik7XG4gICAgICBpZiAoaXNDb21wYXRpYmxlTWVzc2FnZSA9PT0gbmVnYXRlKSB7XG4gICAgICAgIGlmIChldmVyeUFyZ0lzRGVmaW5lZCAmJiBuZWdhdGUpIHtcbiAgICAgICAgICAgIGVyck1zZ01hdGNoZXJGYWlsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICAgIG5lZ2F0ZVxuICAgICAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyBlcnJvciAnICsgcGxhY2Vob2xkZXIgKyAnICN7ZXhwfSBidXQgZ290ICN7YWN0fSdcbiAgICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgZXJyb3Igbm90ICcgKyBwbGFjZWhvbGRlciArICcgI3tleHB9J1xuICAgICAgICAgICAgLCAgZXJyTXNnTWF0Y2hlclxuICAgICAgICAgICAgLCAgXy5jaGVja0Vycm9yLmdldE1lc3NhZ2UoY2F1Z2h0RXJyKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBib3RoIGFzc2VydGlvbnMgZmFpbGVkIGFuZCBib3RoIHNob3VsZCd2ZSBtYXRjaGVkIHdlIHRocm93IGFuIGVycm9yXG4gICAgaWYgKGVycm9yTGlrZUZhaWwgJiYgZXJyTXNnTWF0Y2hlckZhaWwpIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBuZWdhdGVcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyAje2V4cH0gYnV0ICN7YWN0fSB3YXMgdGhyb3duJ1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCB0aHJvdyAje2V4cH0nICsgKGNhdWdodEVyciA/ICcgYnV0ICN7YWN0fSB3YXMgdGhyb3duJyA6ICcnKVxuICAgICAgICAsIChlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yTGlrZS50b1N0cmluZygpIDogZXJyb3JMaWtlICYmIF8uY2hlY2tFcnJvci5nZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKSlcbiAgICAgICAgLCAoY2F1Z2h0RXJyIGluc3RhbmNlb2YgRXJyb3IgPyBjYXVnaHRFcnIudG9TdHJpbmcoKSA6IGNhdWdodEVyciAmJiBfLmNoZWNrRXJyb3IuZ2V0Q29uc3RydWN0b3JOYW1lKGNhdWdodEVycikpXG4gICAgICApO1xuICAgIH1cblxuICAgIGZsYWcodGhpcywgJ29iamVjdCcsIGNhdWdodEVycik7XG4gIH07XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgndGhyb3cnLCBhc3NlcnRUaHJvd3MpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCd0aHJvd3MnLCBhc3NlcnRUaHJvd3MpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdUaHJvdycsIGFzc2VydFRocm93cyk7XG5cbiAgLyoqXG4gICAqICMjIyAucmVzcG9uZFRvKG1ldGhvZFssIG1zZ10pXG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBhIG5vbi1mdW5jdGlvbiBvYmplY3QsIGAucmVzcG9uZFRvYCBhc3NlcnRzIHRoYXQgdGhlXG4gICAqIHRhcmdldCBoYXMgYSBtZXRob2Qgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBgbWV0aG9kYC4gVGhlIG1ldGhvZCBjYW4gYmUgb3duIG9yXG4gICAqIGluaGVyaXRlZCwgYW5kIGl0IGNhbiBiZSBlbnVtZXJhYmxlIG9yIG5vbi1lbnVtZXJhYmxlLlxuICAgKlxuICAgKiAgICAgZnVuY3Rpb24gQ2F0ICgpIHt9XG4gICAqICAgICBDYXQucHJvdG90eXBlLm1lb3cgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChuZXcgQ2F0KCkpLnRvLnJlc3BvbmRUbygnbWVvdycpO1xuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXMgYSBmdW5jdGlvbiwgYC5yZXNwb25kVG9gIGFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0J3NcbiAgICogYHByb3RvdHlwZWAgcHJvcGVydHkgaGFzIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuIG5hbWUgYG1ldGhvZGAuIEFnYWluLCB0aGVcbiAgICogbWV0aG9kIGNhbiBiZSBvd24gb3IgaW5oZXJpdGVkLCBhbmQgaXQgY2FuIGJlIGVudW1lcmFibGUgb3Igbm9uLWVudW1lcmFibGUuXG4gICAqXG4gICAqICAgICBmdW5jdGlvbiBDYXQgKCkge31cbiAgICogICAgIENhdC5wcm90b3R5cGUubWVvdyA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KENhdCkudG8ucmVzcG9uZFRvKCdtZW93Jyk7XG4gICAqXG4gICAqIEFkZCBgLml0c2VsZmAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gZm9yY2UgYC5yZXNwb25kVG9gIHRvIHRyZWF0IHRoZVxuICAgKiB0YXJnZXQgYXMgYSBub24tZnVuY3Rpb24gb2JqZWN0LCBldmVuIGlmIGl0J3MgYSBmdW5jdGlvbi4gVGh1cywgaXQgYXNzZXJ0c1xuICAgKiB0aGF0IHRoZSB0YXJnZXQgaGFzIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuIG5hbWUgYG1ldGhvZGAsIHJhdGhlciB0aGFuXG4gICAqIGFzc2VydGluZyB0aGF0IHRoZSB0YXJnZXQncyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBoYXMgYSBtZXRob2Qgd2l0aCB0aGVcbiAgICogZ2l2ZW4gbmFtZSBgbWV0aG9kYC5cbiAgICpcbiAgICogICAgIGZ1bmN0aW9uIENhdCAoKSB7fVxuICAgKiAgICAgQ2F0LnByb3RvdHlwZS5tZW93ID0gZnVuY3Rpb24gKCkge307XG4gICAqICAgICBDYXQuaGlzcyA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KENhdCkuaXRzZWxmLnRvLnJlc3BvbmRUbygnaGlzcycpLmJ1dC5ub3QucmVzcG9uZFRvKCdtZW93Jyk7XG4gICAqXG4gICAqIFdoZW4gbm90IGFkZGluZyBgLml0c2VsZmAsIGl0J3MgaW1wb3J0YW50IHRvIGNoZWNrIHRoZSB0YXJnZXQncyB0eXBlIGJlZm9yZVxuICAgKiB1c2luZyBgLnJlc3BvbmRUb2AuIFNlZSB0aGUgYC5hYCBkb2MgZm9yIGluZm8gb24gY2hlY2tpbmcgYSB0YXJnZXQncyB0eXBlLlxuICAgKlxuICAgKiAgICAgZnVuY3Rpb24gQ2F0ICgpIHt9XG4gICAqICAgICBDYXQucHJvdG90eXBlLm1lb3cgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChuZXcgQ2F0KCkpLnRvLmJlLmFuKCdvYmplY3QnKS50aGF0LnJlc3BvbmRzVG8oJ21lb3cnKTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5yZXNwb25kVG9gLlxuICAgKlxuICAgKiAgICAgZnVuY3Rpb24gRG9nICgpIHt9XG4gICAqICAgICBEb2cucHJvdG90eXBlLmJhcmsgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChuZXcgRG9nKCkpLnRvLm5vdC5yZXNwb25kVG8oJ21lb3cnKTtcbiAgICpcbiAgICogYC5yZXNwb25kVG9gIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3JcbiAgICogbWVzc2FnZSB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXNcbiAgICogdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7fSkudG8ucmVzcG9uZFRvKCdtZW93JywgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KHt9LCAnbm9vbyB3aHkgZmFpbD8/JykudG8ucmVzcG9uZFRvKCdtZW93Jyk7XG4gICAqXG4gICAqIFRoZSBhbGlhcyBgLnJlc3BvbmRzVG9gIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAucmVzcG9uZFRvYC5cbiAgICpcbiAgICogQG5hbWUgcmVzcG9uZFRvXG4gICAqIEBhbGlhcyByZXNwb25kc1RvXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlc3BvbmRUbyAobWV0aG9kLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgaXRzZWxmID0gZmxhZyh0aGlzLCAnaXRzZWxmJylcbiAgICAgICwgY29udGV4dCA9ICgnZnVuY3Rpb24nID09PSB0eXBlb2Ygb2JqICYmICFpdHNlbGYpXG4gICAgICAgID8gb2JqLnByb3RvdHlwZVttZXRob2RdXG4gICAgICAgIDogb2JqW21ldGhvZF07XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNvbnRleHRcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gcmVzcG9uZCB0byAnICsgXy5pbnNwZWN0KG1ldGhvZClcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IHJlc3BvbmQgdG8gJyArIF8uaW5zcGVjdChtZXRob2QpXG4gICAgKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ3Jlc3BvbmRUbycsIHJlc3BvbmRUbyk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ3Jlc3BvbmRzVG8nLCByZXNwb25kVG8pO1xuXG4gIC8qKlxuICAgKiAjIyMgLml0c2VsZlxuICAgKlxuICAgKiBGb3JjZXMgYWxsIGAucmVzcG9uZFRvYCBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbiB0byBiZWhhdmUgYXMgaWZcbiAgICogdGhlIHRhcmdldCBpcyBhIG5vbi1mdW5jdGlvbiBvYmplY3QsIGV2ZW4gaWYgaXQncyBhIGZ1bmN0aW9uLiBUaHVzLCBpdFxuICAgKiBjYXVzZXMgYC5yZXNwb25kVG9gIHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaGFzIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuXG4gICAqIG5hbWUsIHJhdGhlciB0aGFuIGFzc2VydGluZyB0aGF0IHRoZSB0YXJnZXQncyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBoYXMgYVxuICAgKiBtZXRob2Qgd2l0aCB0aGUgZ2l2ZW4gbmFtZS5cbiAgICpcbiAgICogICAgIGZ1bmN0aW9uIENhdCAoKSB7fVxuICAgKiAgICAgQ2F0LnByb3RvdHlwZS5tZW93ID0gZnVuY3Rpb24gKCkge307XG4gICAqICAgICBDYXQuaGlzcyA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KENhdCkuaXRzZWxmLnRvLnJlc3BvbmRUbygnaGlzcycpLmJ1dC5ub3QucmVzcG9uZFRvKCdtZW93Jyk7XG4gICAqXG4gICAqIEBuYW1lIGl0c2VsZlxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ2l0c2VsZicsIGZ1bmN0aW9uICgpIHtcbiAgICBmbGFnKHRoaXMsICdpdHNlbGYnLCB0cnVlKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuc2F0aXNmeShtYXRjaGVyWywgbXNnXSlcbiAgICpcbiAgICogSW52b2tlcyB0aGUgZ2l2ZW4gYG1hdGNoZXJgIGZ1bmN0aW9uIHdpdGggdGhlIHRhcmdldCBiZWluZyBwYXNzZWQgYXMgdGhlXG4gICAqIGZpcnN0IGFyZ3VtZW50LCBhbmQgYXNzZXJ0cyB0aGF0IHRoZSB2YWx1ZSByZXR1cm5lZCBpcyB0cnV0aHkuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uc2F0aXNmeShmdW5jdGlvbihudW0pIHtcbiAgICogICAgICAgcmV0dXJuIG51bSA+IDA7IFxuICAgKiAgICAgfSk7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuc2F0aXNmeWAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8ubm90LnNhdGlzZnkoZnVuY3Rpb24obnVtKSB7XG4gICAqICAgICAgIHJldHVybiBudW0gPiAyO1xuICAgKiAgICAgfSk7XG4gICAqXG4gICAqIGAuc2F0aXNmeWAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvclxuICAgKiBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhc1xuICAgKiB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLnNhdGlzZnkoZnVuY3Rpb24obnVtKSB7XG4gICAqICAgICAgIHJldHVybiBudW0gPiAyO1xuICAgKiAgICAgfSwgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKlxuICAgKiAgICAgZXhwZWN0KDEsICdub29vIHdoeSBmYWlsPz8nKS50by5zYXRpc2Z5KGZ1bmN0aW9uKG51bSkge1xuICAgKiAgICAgICByZXR1cm4gbnVtID4gMjtcbiAgICogICAgIH0pO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5zYXRpc2ZpZXNgIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAuc2F0aXNmeWAuXG4gICAqXG4gICAqIEBuYW1lIHNhdGlzZnlcbiAgICogQGFsaWFzIHNhdGlzZmllc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtYXRjaGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBzYXRpc2Z5IChtYXRjaGVyLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgdmFyIHJlc3VsdCA9IG1hdGNoZXIob2JqKTtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgcmVzdWx0XG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIHNhdGlzZnkgJyArIF8ub2JqRGlzcGxheShtYXRjaGVyKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3Qgc2F0aXNmeScgKyBfLm9iakRpc3BsYXkobWF0Y2hlcilcbiAgICAgICwgZmxhZyh0aGlzLCAnbmVnYXRlJykgPyBmYWxzZSA6IHRydWVcbiAgICAgICwgcmVzdWx0XG4gICAgKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ3NhdGlzZnknLCBzYXRpc2Z5KTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnc2F0aXNmaWVzJywgc2F0aXNmeSk7XG5cbiAgLyoqXG4gICAqICMjIyAuY2xvc2VUbyhleHBlY3RlZCwgZGVsdGFbLCBtc2ddKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBhIG51bWJlciB0aGF0J3Mgd2l0aGluIGEgZ2l2ZW4gKy8tIGBkZWx0YWAgcmFuZ2VcbiAgICogb2YgdGhlIGdpdmVuIG51bWJlciBgZXhwZWN0ZWRgLiBIb3dldmVyLCBpdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlXG4gICAqIHRhcmdldCBpcyBlcXVhbCB0byBpdHMgZXhwZWN0ZWQgdmFsdWUuXG4gICAqXG4gICAqICAgICAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEuNSkudG8uZXF1YWwoMS41KTtcbiAgICpcbiAgICogICAgIC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEuNSkudG8uYmUuY2xvc2VUbygxLCAwLjUpO1xuICAgKiAgICAgZXhwZWN0KDEuNSkudG8uYmUuY2xvc2VUbygyLCAwLjUpO1xuICAgKiAgICAgZXhwZWN0KDEuNSkudG8uYmUuY2xvc2VUbygxLCAxKTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5jbG9zZVRvYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxLjUpLnRvLmVxdWFsKDEuNSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMS41KS50by5ub3QuYmUuY2xvc2VUbygzLCAxKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIGAuY2xvc2VUb2AgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvclxuICAgKiBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhc1xuICAgKiB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEuNSkudG8uYmUuY2xvc2VUbygzLCAxLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoMS41LCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUuY2xvc2VUbygzLCAxKTtcbiAgICpcbiAgICogVGhlIGFsaWFzIGAuYXBwcm94aW1hdGVseWAgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5jbG9zZVRvYC5cbiAgICpcbiAgICogQG5hbWUgY2xvc2VUb1xuICAgKiBAYWxpYXMgYXBwcm94aW1hdGVseVxuICAgKiBAcGFyYW0ge051bWJlcn0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBjbG9zZVRvKGV4cGVjdGVkLCBkZWx0YSwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKTtcblxuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKCdudW1iZXInKTtcbiAgICBpZiAodHlwZW9mIGV4cGVjdGVkICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgZGVsdGEgIT09ICdudW1iZXInKSB7XG4gICAgICBmbGFnTXNnID0gZmxhZ01zZyA/IGZsYWdNc2cgKyAnOiAnIDogJyc7XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgICAgZmxhZ01zZyArICd0aGUgYXJndW1lbnRzIHRvIGNsb3NlVG8gb3IgYXBwcm94aW1hdGVseSBtdXN0IGJlIG51bWJlcnMnLFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICBzc2ZpXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBNYXRoLmFicyhvYmogLSBleHBlY3RlZCkgPD0gZGVsdGFcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgY2xvc2UgdG8gJyArIGV4cGVjdGVkICsgJyArLy0gJyArIGRlbHRhXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSBjbG9zZSB0byAnICsgZXhwZWN0ZWQgKyAnICsvLSAnICsgZGVsdGFcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnY2xvc2VUbycsIGNsb3NlVG8pO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdhcHByb3hpbWF0ZWx5JywgY2xvc2VUbyk7XG5cbiAgLy8gTm90ZTogRHVwbGljYXRlcyBhcmUgaWdub3JlZCBpZiB0ZXN0aW5nIGZvciBpbmNsdXNpb24gaW5zdGVhZCBvZiBzYW1lbmVzcy5cbiAgZnVuY3Rpb24gaXNTdWJzZXRPZihzdWJzZXQsIHN1cGVyc2V0LCBjbXAsIGNvbnRhaW5zLCBvcmRlcmVkKSB7XG4gICAgaWYgKCFjb250YWlucykge1xuICAgICAgaWYgKHN1YnNldC5sZW5ndGggIT09IHN1cGVyc2V0Lmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgc3VwZXJzZXQgPSBzdXBlcnNldC5zbGljZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzdWJzZXQuZXZlcnkoZnVuY3Rpb24oZWxlbSwgaWR4KSB7XG4gICAgICBpZiAob3JkZXJlZCkgcmV0dXJuIGNtcCA/IGNtcChlbGVtLCBzdXBlcnNldFtpZHhdKSA6IGVsZW0gPT09IHN1cGVyc2V0W2lkeF07XG5cbiAgICAgIGlmICghY21wKSB7XG4gICAgICAgIHZhciBtYXRjaElkeCA9IHN1cGVyc2V0LmluZGV4T2YoZWxlbSk7XG4gICAgICAgIGlmIChtYXRjaElkeCA9PT0gLTEpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyBSZW1vdmUgbWF0Y2ggZnJvbSBzdXBlcnNldCBzbyBub3QgY291bnRlZCB0d2ljZSBpZiBkdXBsaWNhdGUgaW4gc3Vic2V0LlxuICAgICAgICBpZiAoIWNvbnRhaW5zKSBzdXBlcnNldC5zcGxpY2UobWF0Y2hJZHgsIDEpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1cGVyc2V0LnNvbWUoZnVuY3Rpb24oZWxlbTIsIG1hdGNoSWR4KSB7XG4gICAgICAgIGlmICghY21wKGVsZW0sIGVsZW0yKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIFJlbW92ZSBtYXRjaCBmcm9tIHN1cGVyc2V0IHNvIG5vdCBjb3VudGVkIHR3aWNlIGlmIGR1cGxpY2F0ZSBpbiBzdWJzZXQuXG4gICAgICAgIGlmICghY29udGFpbnMpIHN1cGVyc2V0LnNwbGljZShtYXRjaElkeCwgMSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5tZW1iZXJzKHNldFssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGFycmF5IGhhcyB0aGUgc2FtZSBtZW1iZXJzIGFzIHRoZSBnaXZlbiBhcnJheVxuICAgKiBgc2V0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubWVtYmVycyhbMiwgMSwgM10pO1xuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAyXSkudG8uaGF2ZS5tZW1iZXJzKFsyLCAxLCAyXSk7XG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIG1lbWJlcnMgYXJlIGNvbXBhcmVkIHVzaW5nIHN0cmljdCAoYD09PWApIGVxdWFsaXR5LiBBZGQgYC5kZWVwYFxuICAgKiBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byB1c2UgZGVlcCBlcXVhbGl0eSBpbnN0ZWFkLiBTZWUgdGhlIGBkZWVwLWVxbGBcbiAgICogcHJvamVjdCBwYWdlIGZvciBpbmZvIG9uIHRoZSBkZWVwIGVxdWFsaXR5IGFsZ29yaXRobTpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2NoYWlqcy9kZWVwLWVxbC5cbiAgICpcbiAgICogICAgIC8vIFRhcmdldCBhcnJheSBkZWVwbHkgKGJ1dCBub3Qgc3RyaWN0bHkpIGhhcyBtZW1iZXIgYHthOiAxfWBcbiAgICogICAgIGV4cGVjdChbe2E6IDF9XSkudG8uaGF2ZS5kZWVwLm1lbWJlcnMoW3thOiAxfV0pO1xuICAgKiAgICAgZXhwZWN0KFt7YTogMX1dKS50by5ub3QuaGF2ZS5tZW1iZXJzKFt7YTogMX1dKTtcbiAgICpcbiAgICogQnkgZGVmYXVsdCwgb3JkZXIgZG9lc24ndCBtYXR0ZXIuIEFkZCBgLm9yZGVyZWRgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvXG4gICAqIHJlcXVpcmUgdGhhdCBtZW1iZXJzIGFwcGVhciBpbiB0aGUgc2FtZSBvcmRlci5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUub3JkZXJlZC5tZW1iZXJzKFsxLCAyLCAzXSk7XG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLm1lbWJlcnMoWzIsIDEsIDNdKVxuICAgKiAgICAgICAuYnV0Lm5vdC5vcmRlcmVkLm1lbWJlcnMoWzIsIDEsIDNdKTtcbiAgICpcbiAgICogQnkgZGVmYXVsdCwgYm90aCBhcnJheXMgbXVzdCBiZSB0aGUgc2FtZSBzaXplLiBBZGQgYC5pbmNsdWRlYCBlYXJsaWVyIGluXG4gICAqIHRoZSBjaGFpbiB0byByZXF1aXJlIHRoYXQgdGhlIHRhcmdldCdzIG1lbWJlcnMgYmUgYSBzdXBlcnNldCBvZiB0aGVcbiAgICogZXhwZWN0ZWQgbWVtYmVycy4gTm90ZSB0aGF0IGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgaW4gdGhlIHN1YnNldCB3aGVuXG4gICAqIGAuaW5jbHVkZWAgaXMgYWRkZWQuXG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgYXJyYXkgaXMgYSBzdXBlcnNldCBvZiBbMSwgMl0gYnV0IG5vdCBpZGVudGljYWxcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmluY2x1ZGUubWVtYmVycyhbMSwgMl0pO1xuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8ubm90LmhhdmUubWVtYmVycyhbMSwgMl0pO1xuICAgKlxuICAgKiAgICAgLy8gRHVwbGljYXRlcyBpbiB0aGUgc3Vic2V0IGFyZSBpZ25vcmVkXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5pbmNsdWRlLm1lbWJlcnMoWzEsIDIsIDIsIDJdKTtcbiAgICpcbiAgICogYC5kZWVwYCwgYC5vcmRlcmVkYCwgYW5kIGAuaW5jbHVkZWAgY2FuIGFsbCBiZSBjb21iaW5lZC4gSG93ZXZlciwgaWZcbiAgICogYC5pbmNsdWRlYCBhbmQgYC5vcmRlcmVkYCBhcmUgY29tYmluZWQsIHRoZSBvcmRlcmluZyBiZWdpbnMgYXQgdGhlIHN0YXJ0IG9mXG4gICAqIGJvdGggYXJyYXlzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFt7YTogMX0sIHtiOiAyfSwge2M6IDN9XSlcbiAgICogICAgICAgLnRvLmluY2x1ZGUuZGVlcC5vcmRlcmVkLm1lbWJlcnMoW3thOiAxfSwge2I6IDJ9XSlcbiAgICogICAgICAgLmJ1dC5ub3QuaW5jbHVkZS5kZWVwLm9yZGVyZWQubWVtYmVycyhbe2I6IDJ9LCB7YzogM31dKTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5tZW1iZXJzYC4gSG93ZXZlciwgaXQnc1xuICAgKiBkYW5nZXJvdXMgdG8gZG8gc28uIFRoZSBwcm9ibGVtIGlzIHRoYXQgaXQgY3JlYXRlcyB1bmNlcnRhaW4gZXhwZWN0YXRpb25zXG4gICAqIGJ5IGFzc2VydGluZyB0aGF0IHRoZSB0YXJnZXQgYXJyYXkgZG9lc24ndCBoYXZlIGFsbCBvZiB0aGUgc2FtZSBtZW1iZXJzIGFzXG4gICAqIHRoZSBnaXZlbiBhcnJheSBgc2V0YCBidXQgbWF5IG9yIG1heSBub3QgaGF2ZSBzb21lIG9mIHRoZW0uIEl0J3Mgb2Z0ZW4gYmVzdFxuICAgKiB0byBpZGVudGlmeSB0aGUgZXhhY3Qgb3V0cHV0IHRoYXQncyBleHBlY3RlZCwgYW5kIHRoZW4gd3JpdGUgYW4gYXNzZXJ0aW9uXG4gICAqIHRoYXQgb25seSBhY2NlcHRzIHRoYXQgZXhhY3Qgb3V0cHV0LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyXSkudG8ubm90LmluY2x1ZGUoMykuYW5kLm5vdC5pbmNsdWRlKDQpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KFsxLCAyXSkudG8ubm90LmhhdmUubWVtYmVycyhbMywgNF0pOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5tZW1iZXJzYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yXG4gICAqIG1lc3NhZ2UgdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzXG4gICAqIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDJdKS50by5oYXZlLm1lbWJlcnMoWzEsIDIsIDNdLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoWzEsIDJdLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uaGF2ZS5tZW1iZXJzKFsxLCAyLCAzXSk7XG4gICAqXG4gICAqIEBuYW1lIG1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdtZW1iZXJzJywgZnVuY3Rpb24gKHN1YnNldCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKTtcblxuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5iZS5hbignYXJyYXknKTtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1YnNldCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uYmUuYW4oJ2FycmF5Jyk7XG5cbiAgICB2YXIgY29udGFpbnMgPSBmbGFnKHRoaXMsICdjb250YWlucycpO1xuICAgIHZhciBvcmRlcmVkID0gZmxhZyh0aGlzLCAnb3JkZXJlZCcpO1xuXG4gICAgdmFyIHN1YmplY3QsIGZhaWxNc2csIGZhaWxOZWdhdGVNc2csIGxlbmd0aENoZWNrO1xuXG4gICAgaWYgKGNvbnRhaW5zKSB7XG4gICAgICBzdWJqZWN0ID0gb3JkZXJlZCA/ICdhbiBvcmRlcmVkIHN1cGVyc2V0JyA6ICdhIHN1cGVyc2V0JztcbiAgICAgIGZhaWxNc2cgPSAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSAnICsgc3ViamVjdCArICcgb2YgI3tleHB9JztcbiAgICAgIGZhaWxOZWdhdGVNc2cgPSAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgJyArIHN1YmplY3QgKyAnIG9mICN7ZXhwfSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1YmplY3QgPSBvcmRlcmVkID8gJ29yZGVyZWQgbWVtYmVycycgOiAnbWVtYmVycyc7XG4gICAgICBmYWlsTXNnID0gJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSB0aGUgc2FtZSAnICsgc3ViamVjdCArICcgYXMgI3tleHB9JztcbiAgICAgIGZhaWxOZWdhdGVNc2cgPSAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSB0aGUgc2FtZSAnICsgc3ViamVjdCArICcgYXMgI3tleHB9JztcbiAgICB9XG5cbiAgICB2YXIgY21wID0gZmxhZyh0aGlzLCAnZGVlcCcpID8gXy5lcWwgOiB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgaXNTdWJzZXRPZihzdWJzZXQsIG9iaiwgY21wLCBjb250YWlucywgb3JkZXJlZClcbiAgICAgICwgZmFpbE1zZ1xuICAgICAgLCBmYWlsTmVnYXRlTXNnXG4gICAgICAsIHN1YnNldFxuICAgICAgLCBvYmpcbiAgICAgICwgdHJ1ZVxuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLm9uZU9mKGxpc3RbLCBtc2ddKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBhIG1lbWJlciBvZiB0aGUgZ2l2ZW4gYXJyYXkgYGxpc3RgLiBIb3dldmVyLFxuICAgKiBpdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCB0byBpdHMgZXhwZWN0ZWQgdmFsdWUuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uZXF1YWwoMSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMSkudG8uYmUub25lT2YoWzEsIDIsIDNdKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIENvbXBhcmlzb25zIGFyZSBwZXJmb3JtZWQgdXNpbmcgc3RyaWN0IChgPT09YCkgZXF1YWxpdHkuXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAub25lT2ZgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmVxdWFsKDEpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLm5vdC5iZS5vbmVPZihbMiwgMywgNF0pOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5vbmVPZmAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvciBtZXNzYWdlXG4gICAqIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhcyB0aGVcbiAgICogc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmJlLm9uZU9mKFsyLCAzLCA0XSwgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KDEsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5vbmVPZihbMiwgMywgNF0pO1xuICAgKlxuICAgKiBAbmFtZSBvbmVPZlxuICAgKiBAcGFyYW0ge0FycmF5PCo+fSBsaXN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBvbmVPZiAobGlzdCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIGV4cGVjdGVkID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpO1xuICAgIG5ldyBBc3NlcnRpb24obGlzdCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uYmUuYW4oJ2FycmF5Jyk7XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgbGlzdC5pbmRleE9mKGV4cGVjdGVkKSA+IC0xXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIG9uZSBvZiAje2V4cH0nXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBvbmUgb2YgI3tleHB9J1xuICAgICAgLCBsaXN0XG4gICAgICAsIGV4cGVjdGVkXG4gICAgKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ29uZU9mJywgb25lT2YpO1xuXG5cbiAgLyoqXG4gICAqICMjIyAuY2hhbmdlKHN1YmplY3RbLCBwcm9wWywgbXNnXV0pXG4gICAqXG4gICAqIFdoZW4gb25lIGFyZ3VtZW50IGlzIHByb3ZpZGVkLCBgLmNoYW5nZWAgYXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBmdW5jdGlvblxuICAgKiBgc3ViamVjdGAgcmV0dXJucyBhIGRpZmZlcmVudCB2YWx1ZSB3aGVuIGl0J3MgaW52b2tlZCBiZWZvcmUgdGhlIHRhcmdldFxuICAgKiBmdW5jdGlvbiBjb21wYXJlZCB0byB3aGVuIGl0J3MgaW52b2tlZCBhZnRlcndhcmQuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdFxuICAgKiB0byBhc3NlcnQgdGhhdCBgc3ViamVjdGAgaXMgZXF1YWwgdG8gaXRzIGV4cGVjdGVkIHZhbHVlLlxuICAgKlxuICAgKiAgICAgdmFyIGRvdHMgPSAnJ1xuICAgKiAgICAgICAsIGFkZERvdCA9IGZ1bmN0aW9uICgpIHsgZG90cyArPSAnLic7IH1cbiAgICogICAgICAgLCBnZXREb3RzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZG90czsgfTtcbiAgICpcbiAgICogICAgIC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoZ2V0RG90cygpKS50by5lcXVhbCgnJyk7XG4gICAqICAgICBhZGREb3QoKTtcbiAgICogICAgIGV4cGVjdChnZXREb3RzKCkpLnRvLmVxdWFsKCcuJyk7XG4gICAqXG4gICAqICAgICAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChhZGREb3QpLnRvLmNoYW5nZShnZXREb3RzKTtcbiAgICpcbiAgICogV2hlbiB0d28gYXJndW1lbnRzIGFyZSBwcm92aWRlZCwgYC5jaGFuZ2VgIGFzc2VydHMgdGhhdCB0aGUgdmFsdWUgb2YgdGhlXG4gICAqIGdpdmVuIG9iamVjdCBgc3ViamVjdGAncyBgcHJvcGAgcHJvcGVydHkgaXMgZGlmZmVyZW50IGJlZm9yZSBpbnZva2luZyB0aGVcbiAgICogdGFyZ2V0IGZ1bmN0aW9uIGNvbXBhcmVkIHRvIGFmdGVyd2FyZC5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHtkb3RzOiAnJ31cbiAgICogICAgICAgLCBhZGREb3QgPSBmdW5jdGlvbiAoKSB7IG15T2JqLmRvdHMgKz0gJy4nOyB9O1xuICAgKlxuICAgKiAgICAgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChteU9iaikudG8uaGF2ZS5wcm9wZXJ0eSgnZG90cycsICcnKTtcbiAgICogICAgIGFkZERvdCgpO1xuICAgKiAgICAgZXhwZWN0KG15T2JqKS50by5oYXZlLnByb3BlcnR5KCdkb3RzJywgJy4nKTtcbiAgICpcbiAgICogICAgIC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KGFkZERvdCkudG8uY2hhbmdlKG15T2JqLCAnZG90cycpO1xuICAgKlxuICAgKiBTdHJpY3QgKGA9PT1gKSBlcXVhbGl0eSBpcyB1c2VkIHRvIGNvbXBhcmUgYmVmb3JlIGFuZCBhZnRlciB2YWx1ZXMuXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuY2hhbmdlYC5cbiAgICpcbiAgICogICAgIHZhciBkb3RzID0gJydcbiAgICogICAgICAgLCBub29wID0gZnVuY3Rpb24gKCkge31cbiAgICogICAgICAgLCBnZXREb3RzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZG90czsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChub29wKS50by5ub3QuY2hhbmdlKGdldERvdHMpO1xuICAgKlxuICAgKiAgICAgdmFyIG15T2JqID0ge2RvdHM6ICcnfVxuICAgKiAgICAgICAsIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChub29wKS50by5ub3QuY2hhbmdlKG15T2JqLCAnZG90cycpO1xuICAgKlxuICAgKiBgLmNoYW5nZWAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvclxuICAgKiBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhc1xuICAgKiB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLiBXaGVuIG5vdCBwcm92aWRpbmcgdHdvIGFyZ3VtZW50cywgYWx3YXlzXG4gICAqIHVzZSB0aGUgc2Vjb25kIGZvcm0uXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7ZG90czogJyd9XG4gICAqICAgICAgICwgYWRkRG90ID0gZnVuY3Rpb24gKCkgeyBteU9iai5kb3RzICs9ICcuJzsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChhZGREb3QpLnRvLm5vdC5jaGFuZ2UobXlPYmosICdkb3RzJywgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKlxuICAgKiAgICAgdmFyIGRvdHMgPSAnJ1xuICAgKiAgICAgICAsIGFkZERvdCA9IGZ1bmN0aW9uICgpIHsgZG90cyArPSAnLic7IH1cbiAgICogICAgICAgLCBnZXREb3RzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZG90czsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChhZGREb3QsICdub29vIHdoeSBmYWlsPz8nKS50by5ub3QuY2hhbmdlKGdldERvdHMpO1xuICAgKlxuICAgKiBgLmNoYW5nZWAgYWxzbyBjYXVzZXMgYWxsIGAuYnlgIGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlIGNoYWluIHRvXG4gICAqIGFzc2VydCBob3cgbXVjaCBhIG51bWVyaWMgc3ViamVjdCB3YXMgaW5jcmVhc2VkIG9yIGRlY3JlYXNlZCBieS4gSG93ZXZlcixcbiAgICogaXQncyBkYW5nZXJvdXMgdG8gdXNlIGAuY2hhbmdlLmJ5YC4gVGhlIHByb2JsZW0gaXMgdGhhdCBpdCBjcmVhdGVzXG4gICAqIHVuY2VydGFpbiBleHBlY3RhdGlvbnMgYnkgYXNzZXJ0aW5nIHRoYXQgdGhlIHN1YmplY3QgZWl0aGVyIGluY3JlYXNlcyBieVxuICAgKiB0aGUgZ2l2ZW4gZGVsdGEsIG9yIHRoYXQgaXQgZGVjcmVhc2VzIGJ5IHRoZSBnaXZlbiBkZWx0YS4gSXQncyBvZnRlbiBiZXN0XG4gICAqIHRvIGlkZW50aWZ5IHRoZSBleGFjdCBvdXRwdXQgdGhhdCdzIGV4cGVjdGVkLCBhbmQgdGhlbiB3cml0ZSBhbiBhc3NlcnRpb25cbiAgICogdGhhdCBvbmx5IGFjY2VwdHMgdGhhdCBleGFjdCBvdXRwdXQuXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7dmFsOiAxfVxuICAgKiAgICAgICAsIGFkZFR3byA9IGZ1bmN0aW9uICgpIHsgbXlPYmoudmFsICs9IDI7IH1cbiAgICogICAgICAgLCBzdWJ0cmFjdFR3byA9IGZ1bmN0aW9uICgpIHsgbXlPYmoudmFsIC09IDI7IH07XG4gICAqXG4gICAqICAgICBleHBlY3QoYWRkVHdvKS50by5pbmNyZWFzZShteU9iaiwgJ3ZhbCcpLmJ5KDIpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KGFkZFR3bykudG8uY2hhbmdlKG15T2JqLCAndmFsJykuYnkoMik7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiAgICAgZXhwZWN0KHN1YnRyYWN0VHdvKS50by5kZWNyZWFzZShteU9iaiwgJ3ZhbCcpLmJ5KDIpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KHN1YnRyYWN0VHdvKS50by5jaGFuZ2UobXlPYmosICd2YWwnKS5ieSgyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIFRoZSBhbGlhcyBgLmNoYW5nZXNgIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAuY2hhbmdlYC5cbiAgICpcbiAgICogQG5hbWUgY2hhbmdlXG4gICAqIEBhbGlhcyBjaGFuZ2VzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdWJqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0Q2hhbmdlcyAoc3ViamVjdCwgcHJvcCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIGZuID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpO1xuICAgIG5ldyBBc3NlcnRpb24oZm4sIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoJ2Z1bmN0aW9uJyk7XG5cbiAgICB2YXIgaW5pdGlhbDtcbiAgICBpZiAoIXByb3ApIHtcbiAgICAgIG5ldyBBc3NlcnRpb24oc3ViamVjdCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYSgnZnVuY3Rpb24nKTtcbiAgICAgIGluaXRpYWwgPSBzdWJqZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBBc3NlcnRpb24oc3ViamVjdCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShwcm9wKTtcbiAgICAgIGluaXRpYWwgPSBzdWJqZWN0W3Byb3BdO1xuICAgIH1cblxuICAgIGZuKCk7XG5cbiAgICB2YXIgZmluYWwgPSBwcm9wID09PSB1bmRlZmluZWQgfHwgcHJvcCA9PT0gbnVsbCA/IHN1YmplY3QoKSA6IHN1YmplY3RbcHJvcF07XG4gICAgdmFyIG1zZ09iaiA9IHByb3AgPT09IHVuZGVmaW5lZCB8fCBwcm9wID09PSBudWxsID8gaW5pdGlhbCA6ICcuJyArIHByb3A7XG5cbiAgICAvLyBUaGlzIGdldHMgZmxhZ2dlZCBiZWNhdXNlIG9mIHRoZSAuYnkoZGVsdGEpIGFzc2VydGlvblxuICAgIGZsYWcodGhpcywgJ2RlbHRhTXNnT2JqJywgbXNnT2JqKTtcbiAgICBmbGFnKHRoaXMsICdpbml0aWFsRGVsdGFWYWx1ZScsIGluaXRpYWwpO1xuICAgIGZsYWcodGhpcywgJ2ZpbmFsRGVsdGFWYWx1ZScsIGZpbmFsKTtcbiAgICBmbGFnKHRoaXMsICdkZWx0YUJlaGF2aW9yJywgJ2NoYW5nZScpO1xuICAgIGZsYWcodGhpcywgJ3JlYWxEZWx0YScsIGZpbmFsICE9PSBpbml0aWFsKTtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgaW5pdGlhbCAhPT0gZmluYWxcbiAgICAgICwgJ2V4cGVjdGVkICcgKyBtc2dPYmogKyAnIHRvIGNoYW5nZSdcbiAgICAgICwgJ2V4cGVjdGVkICcgKyBtc2dPYmogKyAnIHRvIG5vdCBjaGFuZ2UnXG4gICAgKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2NoYW5nZScsIGFzc2VydENoYW5nZXMpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdjaGFuZ2VzJywgYXNzZXJ0Q2hhbmdlcyk7XG5cbiAgLyoqXG4gICAqICMjIyAuaW5jcmVhc2Uoc3ViamVjdFssIHByb3BbLCBtc2ddXSlcbiAgICpcbiAgICogV2hlbiBvbmUgYXJndW1lbnQgaXMgcHJvdmlkZWQsIGAuaW5jcmVhc2VgIGFzc2VydHMgdGhhdCB0aGUgZ2l2ZW4gZnVuY3Rpb25cbiAgICogYHN1YmplY3RgIHJldHVybnMgYSBncmVhdGVyIG51bWJlciB3aGVuIGl0J3MgaW52b2tlZCBhZnRlciBpbnZva2luZyB0aGVcbiAgICogdGFyZ2V0IGZ1bmN0aW9uIGNvbXBhcmVkIHRvIHdoZW4gaXQncyBpbnZva2VkIGJlZm9yZWhhbmQuIGAuaW5jcmVhc2VgIGFsc29cbiAgICogY2F1c2VzIGFsbCBgLmJ5YCBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbiB0byBhc3NlcnQgaG93IG11Y2hcbiAgICogZ3JlYXRlciBvZiBhIG51bWJlciBpcyByZXR1cm5lZC4gSXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydCB0aGF0IHRoZSByZXR1cm5cbiAgICogdmFsdWUgaW5jcmVhc2VkIGJ5IHRoZSBleHBlY3RlZCBhbW91bnQsIHJhdGhlciB0aGFuIGFzc2VydGluZyBpdCBpbmNyZWFzZWRcbiAgICogYnkgYW55IGFtb3VudC5cbiAgICpcbiAgICogICAgIHZhciB2YWwgPSAxXG4gICAqICAgICAgICwgYWRkVHdvID0gZnVuY3Rpb24gKCkgeyB2YWwgKz0gMjsgfVxuICAgKiAgICAgICAsIGdldFZhbCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbDsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChhZGRUd28pLnRvLmluY3JlYXNlKGdldFZhbCkuYnkoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoYWRkVHdvKS50by5pbmNyZWFzZShnZXRWYWwpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogV2hlbiB0d28gYXJndW1lbnRzIGFyZSBwcm92aWRlZCwgYC5pbmNyZWFzZWAgYXNzZXJ0cyB0aGF0IHRoZSB2YWx1ZSBvZiB0aGVcbiAgICogZ2l2ZW4gb2JqZWN0IGBzdWJqZWN0YCdzIGBwcm9wYCBwcm9wZXJ0eSBpcyBncmVhdGVyIGFmdGVyIGludm9raW5nIHRoZVxuICAgKiB0YXJnZXQgZnVuY3Rpb24gY29tcGFyZWQgdG8gYmVmb3JlaGFuZC5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHt2YWw6IDF9XG4gICAqICAgICAgICwgYWRkVHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgKz0gMjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChhZGRUd28pLnRvLmluY3JlYXNlKG15T2JqLCAndmFsJykuYnkoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoYWRkVHdvKS50by5pbmNyZWFzZShteU9iaiwgJ3ZhbCcpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5pbmNyZWFzZWAuIEhvd2V2ZXIsIGl0J3NcbiAgICogZGFuZ2Vyb3VzIHRvIGRvIHNvLiBUaGUgcHJvYmxlbSBpcyB0aGF0IGl0IGNyZWF0ZXMgdW5jZXJ0YWluIGV4cGVjdGF0aW9uc1xuICAgKiBieSBhc3NlcnRpbmcgdGhhdCB0aGUgc3ViamVjdCBlaXRoZXIgZGVjcmVhc2VzLCBvciB0aGF0IGl0IHN0YXlzIHRoZSBzYW1lLlxuICAgKiBJdCdzIG9mdGVuIGJlc3QgdG8gaWRlbnRpZnkgdGhlIGV4YWN0IG91dHB1dCB0aGF0J3MgZXhwZWN0ZWQsIGFuZCB0aGVuXG4gICAqIHdyaXRlIGFuIGFzc2VydGlvbiB0aGF0IG9ubHkgYWNjZXB0cyB0aGF0IGV4YWN0IG91dHB1dC5cbiAgICpcbiAgICogV2hlbiB0aGUgc3ViamVjdCBpcyBleHBlY3RlZCB0byBkZWNyZWFzZSwgaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydCB0aGF0IGl0XG4gICAqIGRlY3JlYXNlZCBieSB0aGUgZXhwZWN0ZWQgYW1vdW50LlxuICAgKlxuICAgKiAgICAgdmFyIG15T2JqID0ge3ZhbDogMX1cbiAgICogICAgICAgLCBzdWJ0cmFjdFR3byA9IGZ1bmN0aW9uICgpIHsgbXlPYmoudmFsIC09IDI7IH07XG4gICAqXG4gICAqICAgICBleHBlY3Qoc3VidHJhY3RUd28pLnRvLmRlY3JlYXNlKG15T2JqLCAndmFsJykuYnkoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoc3VidHJhY3RUd28pLnRvLm5vdC5pbmNyZWFzZShteU9iaiwgJ3ZhbCcpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICogXG4gICAqIFdoZW4gdGhlIHN1YmplY3QgaXMgZXhwZWN0ZWQgdG8gc3RheSB0aGUgc2FtZSwgaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydFxuICAgKiBleGFjdGx5IHRoYXQuXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7dmFsOiAxfVxuICAgKiAgICAgICAsIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChub29wKS50by5ub3QuY2hhbmdlKG15T2JqLCAndmFsJyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qobm9vcCkudG8ubm90LmluY3JlYXNlKG15T2JqLCAndmFsJyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLmluY3JlYXNlYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yXG4gICAqIG1lc3NhZ2UgdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzXG4gICAqIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuIFdoZW4gbm90IHByb3ZpZGluZyB0d28gYXJndW1lbnRzLCBhbHdheXNcbiAgICogdXNlIHRoZSBzZWNvbmQgZm9ybS5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHt2YWw6IDF9XG4gICAqICAgICAgICwgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KG5vb3ApLnRvLmluY3JlYXNlKG15T2JqLCAndmFsJywgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKlxuICAgKiAgICAgdmFyIHZhbCA9IDFcbiAgICogICAgICAgLCBub29wID0gZnVuY3Rpb24gKCkge31cbiAgICogICAgICAgLCBnZXRWYWwgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWw7IH07XG4gICAqXG4gICAqICAgICBleHBlY3Qobm9vcCwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmluY3JlYXNlKGdldFZhbCk7XG4gICAqXG4gICAqIFRoZSBhbGlhcyBgLmluY3JlYXNlc2AgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5pbmNyZWFzZWAuXG4gICAqXG4gICAqIEBuYW1lIGluY3JlYXNlXG4gICAqIEBhbGlhcyBpbmNyZWFzZXNcbiAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHN1YmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3AgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRJbmNyZWFzZXMgKHN1YmplY3QsIHByb3AsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBmbiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKTtcbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKCdmdW5jdGlvbicpO1xuXG4gICAgdmFyIGluaXRpYWw7XG4gICAgaWYgKCFwcm9wKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoJ2Z1bmN0aW9uJyk7XG4gICAgICBpbml0aWFsID0gc3ViamVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkocHJvcCk7XG4gICAgICBpbml0aWFsID0gc3ViamVjdFtwcm9wXTtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgdGFyZ2V0IGlzIGEgbnVtYmVyXG4gICAgbmV3IEFzc2VydGlvbihpbml0aWFsLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKCdudW1iZXInKTtcblxuICAgIGZuKCk7XG5cbiAgICB2YXIgZmluYWwgPSBwcm9wID09PSB1bmRlZmluZWQgfHwgcHJvcCA9PT0gbnVsbCA/IHN1YmplY3QoKSA6IHN1YmplY3RbcHJvcF07XG4gICAgdmFyIG1zZ09iaiA9IHByb3AgPT09IHVuZGVmaW5lZCB8fCBwcm9wID09PSBudWxsID8gaW5pdGlhbCA6ICcuJyArIHByb3A7XG5cbiAgICBmbGFnKHRoaXMsICdkZWx0YU1zZ09iaicsIG1zZ09iaik7XG4gICAgZmxhZyh0aGlzLCAnaW5pdGlhbERlbHRhVmFsdWUnLCBpbml0aWFsKTtcbiAgICBmbGFnKHRoaXMsICdmaW5hbERlbHRhVmFsdWUnLCBmaW5hbCk7XG4gICAgZmxhZyh0aGlzLCAnZGVsdGFCZWhhdmlvcicsICdpbmNyZWFzZScpO1xuICAgIGZsYWcodGhpcywgJ3JlYWxEZWx0YScsIGZpbmFsIC0gaW5pdGlhbCk7XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGZpbmFsIC0gaW5pdGlhbCA+IDBcbiAgICAgICwgJ2V4cGVjdGVkICcgKyBtc2dPYmogKyAnIHRvIGluY3JlYXNlJ1xuICAgICAgLCAnZXhwZWN0ZWQgJyArIG1zZ09iaiArICcgdG8gbm90IGluY3JlYXNlJ1xuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdpbmNyZWFzZScsIGFzc2VydEluY3JlYXNlcyk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2luY3JlYXNlcycsIGFzc2VydEluY3JlYXNlcyk7XG5cbiAgLyoqXG4gICAqICMjIyAuZGVjcmVhc2Uoc3ViamVjdFssIHByb3BbLCBtc2ddXSlcbiAgICpcbiAgICogV2hlbiBvbmUgYXJndW1lbnQgaXMgcHJvdmlkZWQsIGAuZGVjcmVhc2VgIGFzc2VydHMgdGhhdCB0aGUgZ2l2ZW4gZnVuY3Rpb25cbiAgICogYHN1YmplY3RgIHJldHVybnMgYSBsZXNzZXIgbnVtYmVyIHdoZW4gaXQncyBpbnZva2VkIGFmdGVyIGludm9raW5nIHRoZVxuICAgKiB0YXJnZXQgZnVuY3Rpb24gY29tcGFyZWQgdG8gd2hlbiBpdCdzIGludm9rZWQgYmVmb3JlaGFuZC4gYC5kZWNyZWFzZWAgYWxzb1xuICAgKiBjYXVzZXMgYWxsIGAuYnlgIGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlIGNoYWluIHRvIGFzc2VydCBob3cgbXVjaFxuICAgKiBsZXNzZXIgb2YgYSBudW1iZXIgaXMgcmV0dXJuZWQuIEl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgcmV0dXJuXG4gICAqIHZhbHVlIGRlY3JlYXNlZCBieSB0aGUgZXhwZWN0ZWQgYW1vdW50LCByYXRoZXIgdGhhbiBhc3NlcnRpbmcgaXQgZGVjcmVhc2VkXG4gICAqIGJ5IGFueSBhbW91bnQuXG4gICAqXG4gICAqICAgICB2YXIgdmFsID0gMVxuICAgKiAgICAgICAsIHN1YnRyYWN0VHdvID0gZnVuY3Rpb24gKCkgeyB2YWwgLT0gMjsgfVxuICAgKiAgICAgICAsIGdldFZhbCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbDsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChzdWJ0cmFjdFR3bykudG8uZGVjcmVhc2UoZ2V0VmFsKS5ieSgyKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChzdWJ0cmFjdFR3bykudG8uZGVjcmVhc2UoZ2V0VmFsKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIFdoZW4gdHdvIGFyZ3VtZW50cyBhcmUgcHJvdmlkZWQsIGAuZGVjcmVhc2VgIGFzc2VydHMgdGhhdCB0aGUgdmFsdWUgb2YgdGhlXG4gICAqIGdpdmVuIG9iamVjdCBgc3ViamVjdGAncyBgcHJvcGAgcHJvcGVydHkgaXMgbGVzc2VyIGFmdGVyIGludm9raW5nIHRoZVxuICAgKiB0YXJnZXQgZnVuY3Rpb24gY29tcGFyZWQgdG8gYmVmb3JlaGFuZC4gXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7dmFsOiAxfVxuICAgKiAgICAgICAsIHN1YnRyYWN0VHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgLT0gMjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChzdWJ0cmFjdFR3bykudG8uZGVjcmVhc2UobXlPYmosICd2YWwnKS5ieSgyKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChzdWJ0cmFjdFR3bykudG8uZGVjcmVhc2UobXlPYmosICd2YWwnKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuZGVjcmVhc2VgLiBIb3dldmVyLCBpdCdzXG4gICAqIGRhbmdlcm91cyB0byBkbyBzby4gVGhlIHByb2JsZW0gaXMgdGhhdCBpdCBjcmVhdGVzIHVuY2VydGFpbiBleHBlY3RhdGlvbnNcbiAgICogYnkgYXNzZXJ0aW5nIHRoYXQgdGhlIHN1YmplY3QgZWl0aGVyIGluY3JlYXNlcywgb3IgdGhhdCBpdCBzdGF5cyB0aGUgc2FtZS5cbiAgICogSXQncyBvZnRlbiBiZXN0IHRvIGlkZW50aWZ5IHRoZSBleGFjdCBvdXRwdXQgdGhhdCdzIGV4cGVjdGVkLCBhbmQgdGhlblxuICAgKiB3cml0ZSBhbiBhc3NlcnRpb24gdGhhdCBvbmx5IGFjY2VwdHMgdGhhdCBleGFjdCBvdXRwdXQuXG4gICAqXG4gICAqIFdoZW4gdGhlIHN1YmplY3QgaXMgZXhwZWN0ZWQgdG8gaW5jcmVhc2UsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgdGhhdCBpdFxuICAgKiBpbmNyZWFzZWQgYnkgdGhlIGV4cGVjdGVkIGFtb3VudC5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHt2YWw6IDF9XG4gICAqICAgICAgICwgYWRkVHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgKz0gMjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChhZGRUd28pLnRvLmluY3JlYXNlKG15T2JqLCAndmFsJykuYnkoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoYWRkVHdvKS50by5ub3QuZGVjcmVhc2UobXlPYmosICd2YWwnKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqIFxuICAgKiBXaGVuIHRoZSBzdWJqZWN0IGlzIGV4cGVjdGVkIHRvIHN0YXkgdGhlIHNhbWUsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnRcbiAgICogZXhhY3RseSB0aGF0LlxuICAgKlxuICAgKiAgICAgdmFyIG15T2JqID0ge3ZhbDogMX1cbiAgICogICAgICAgLCBub29wID0gZnVuY3Rpb24gKCkge307XG4gICAqXG4gICAqICAgICBleHBlY3Qobm9vcCkudG8ubm90LmNoYW5nZShteU9iaiwgJ3ZhbCcpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KG5vb3ApLnRvLm5vdC5kZWNyZWFzZShteU9iaiwgJ3ZhbCcpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5kZWNyZWFzZWAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvclxuICAgKiBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhc1xuICAgKiB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLiBXaGVuIG5vdCBwcm92aWRpbmcgdHdvIGFyZ3VtZW50cywgYWx3YXlzXG4gICAqIHVzZSB0aGUgc2Vjb25kIGZvcm0uXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7dmFsOiAxfVxuICAgKiAgICAgICAsIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChub29wKS50by5kZWNyZWFzZShteU9iaiwgJ3ZhbCcsICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICpcbiAgICogICAgIHZhciB2YWwgPSAxXG4gICAqICAgICAgICwgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG4gICAqICAgICAgICwgZ2V0VmFsID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KG5vb3AsICdub29vIHdoeSBmYWlsPz8nKS50by5kZWNyZWFzZShnZXRWYWwpO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5kZWNyZWFzZXNgIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAuZGVjcmVhc2VgLlxuICAgKlxuICAgKiBAbmFtZSBkZWNyZWFzZVxuICAgKiBAYWxpYXMgZGVjcmVhc2VzXG4gICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBzdWJqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0RGVjcmVhc2VzIChzdWJqZWN0LCBwcm9wLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgZm4gPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBmbGFnTXNnID0gZmxhZyh0aGlzLCAnbWVzc2FnZScpXG4gICAgICAsIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJyk7XG4gICAgbmV3IEFzc2VydGlvbihmbiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYSgnZnVuY3Rpb24nKTtcblxuICAgIHZhciBpbml0aWFsO1xuICAgIGlmICghcHJvcCkge1xuICAgICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKCdmdW5jdGlvbicpO1xuICAgICAgaW5pdGlhbCA9IHN1YmplY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KHByb3ApO1xuICAgICAgaW5pdGlhbCA9IHN1YmplY3RbcHJvcF07XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIHRhcmdldCBpcyBhIG51bWJlclxuICAgIG5ldyBBc3NlcnRpb24oaW5pdGlhbCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYSgnbnVtYmVyJyk7XG5cbiAgICBmbigpO1xuXG4gICAgdmFyIGZpbmFsID0gcHJvcCA9PT0gdW5kZWZpbmVkIHx8IHByb3AgPT09IG51bGwgPyBzdWJqZWN0KCkgOiBzdWJqZWN0W3Byb3BdO1xuICAgIHZhciBtc2dPYmogPSBwcm9wID09PSB1bmRlZmluZWQgfHwgcHJvcCA9PT0gbnVsbCA/IGluaXRpYWwgOiAnLicgKyBwcm9wO1xuXG4gICAgZmxhZyh0aGlzLCAnZGVsdGFNc2dPYmonLCBtc2dPYmopO1xuICAgIGZsYWcodGhpcywgJ2luaXRpYWxEZWx0YVZhbHVlJywgaW5pdGlhbCk7XG4gICAgZmxhZyh0aGlzLCAnZmluYWxEZWx0YVZhbHVlJywgZmluYWwpO1xuICAgIGZsYWcodGhpcywgJ2RlbHRhQmVoYXZpb3InLCAnZGVjcmVhc2UnKTtcbiAgICBmbGFnKHRoaXMsICdyZWFsRGVsdGEnLCBpbml0aWFsIC0gZmluYWwpO1xuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBmaW5hbCAtIGluaXRpYWwgPCAwXG4gICAgICAsICdleHBlY3RlZCAnICsgbXNnT2JqICsgJyB0byBkZWNyZWFzZSdcbiAgICAgICwgJ2V4cGVjdGVkICcgKyBtc2dPYmogKyAnIHRvIG5vdCBkZWNyZWFzZSdcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZGVjcmVhc2UnLCBhc3NlcnREZWNyZWFzZXMpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdkZWNyZWFzZXMnLCBhc3NlcnREZWNyZWFzZXMpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmJ5KGRlbHRhWywgbXNnXSlcbiAgICpcbiAgICogV2hlbiBmb2xsb3dpbmcgYW4gYC5pbmNyZWFzZWAgYXNzZXJ0aW9uIGluIHRoZSBjaGFpbiwgYC5ieWAgYXNzZXJ0cyB0aGF0XG4gICAqIHRoZSBzdWJqZWN0IG9mIHRoZSBgLmluY3JlYXNlYCBhc3NlcnRpb24gaW5jcmVhc2VkIGJ5IHRoZSBnaXZlbiBgZGVsdGFgLlxuICAgKlxuICAgKiAgICAgdmFyIG15T2JqID0ge3ZhbDogMX1cbiAgICogICAgICAgLCBhZGRUd28gPSBmdW5jdGlvbiAoKSB7IG15T2JqLnZhbCArPSAyOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGFkZFR3bykudG8uaW5jcmVhc2UobXlPYmosICd2YWwnKS5ieSgyKTtcbiAgICpcbiAgICogV2hlbiBmb2xsb3dpbmcgYSBgLmRlY3JlYXNlYCBhc3NlcnRpb24gaW4gdGhlIGNoYWluLCBgLmJ5YCBhc3NlcnRzIHRoYXQgdGhlXG4gICAqIHN1YmplY3Qgb2YgdGhlIGAuZGVjcmVhc2VgIGFzc2VydGlvbiBkZWNyZWFzZWQgYnkgdGhlIGdpdmVuIGBkZWx0YWAuXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7dmFsOiAxfVxuICAgKiAgICAgICAsIHN1YnRyYWN0VHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgLT0gMjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChzdWJ0cmFjdFR3bykudG8uZGVjcmVhc2UobXlPYmosICd2YWwnKS5ieSgyKTtcbiAgICpcbiAgICogV2hlbiBmb2xsb3dpbmcgYSBgLmNoYW5nZWAgYXNzZXJ0aW9uIGluIHRoZSBjaGFpbiwgYC5ieWAgYXNzZXJ0cyB0aGF0IHRoZVxuICAgKiBzdWJqZWN0IG9mIHRoZSBgLmNoYW5nZWAgYXNzZXJ0aW9uIGVpdGhlciBpbmNyZWFzZWQgb3IgZGVjcmVhc2VkIGJ5IHRoZVxuICAgKiBnaXZlbiBgZGVsdGFgLiBIb3dldmVyLCBpdCdzIGRhbmdlcm91cyB0byB1c2UgYC5jaGFuZ2UuYnlgLiBUaGUgcHJvYmxlbSBpc1xuICAgKiB0aGF0IGl0IGNyZWF0ZXMgdW5jZXJ0YWluIGV4cGVjdGF0aW9ucy4gSXQncyBvZnRlbiBiZXN0IHRvIGlkZW50aWZ5IHRoZVxuICAgKiBleGFjdCBvdXRwdXQgdGhhdCdzIGV4cGVjdGVkLCBhbmQgdGhlbiB3cml0ZSBhbiBhc3NlcnRpb24gdGhhdCBvbmx5IGFjY2VwdHNcbiAgICogdGhhdCBleGFjdCBvdXRwdXQuXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7dmFsOiAxfVxuICAgKiAgICAgICAsIGFkZFR3byA9IGZ1bmN0aW9uICgpIHsgbXlPYmoudmFsICs9IDI7IH1cbiAgICogICAgICAgLCBzdWJ0cmFjdFR3byA9IGZ1bmN0aW9uICgpIHsgbXlPYmoudmFsIC09IDI7IH07XG4gICAqXG4gICAqICAgICBleHBlY3QoYWRkVHdvKS50by5pbmNyZWFzZShteU9iaiwgJ3ZhbCcpLmJ5KDIpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KGFkZFR3bykudG8uY2hhbmdlKG15T2JqLCAndmFsJykuYnkoMik7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiAgICAgZXhwZWN0KHN1YnRyYWN0VHdvKS50by5kZWNyZWFzZShteU9iaiwgJ3ZhbCcpLmJ5KDIpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KHN1YnRyYWN0VHdvKS50by5jaGFuZ2UobXlPYmosICd2YWwnKS5ieSgyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuYnlgLiBIb3dldmVyLCBpdCdzIG9mdGVuIGJlc3RcbiAgICogdG8gYXNzZXJ0IHRoYXQgdGhlIHN1YmplY3QgY2hhbmdlZCBieSBpdHMgZXhwZWN0ZWQgZGVsdGEsIHJhdGhlciB0aGFuXG4gICAqIGFzc2VydGluZyB0aGF0IGl0IGRpZG4ndCBjaGFuZ2UgYnkgb25lIG9mIGNvdW50bGVzcyB1bmV4cGVjdGVkIGRlbHRhcy5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHt2YWw6IDF9XG4gICAqICAgICAgICwgYWRkVHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgKz0gMjsgfTtcbiAgICpcbiAgICogICAgIC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoYWRkVHdvKS50by5pbmNyZWFzZShteU9iaiwgJ3ZhbCcpLmJ5KDIpO1xuICAgKlxuICAgKiAgICAgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoYWRkVHdvKS50by5pbmNyZWFzZShteU9iaiwgJ3ZhbCcpLmJ1dC5ub3QuYnkoMyk7XG4gICAqXG4gICAqIGAuYnlgIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3IgbWVzc2FnZSB0b1xuICAgKiBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXMgdGhlIHNlY29uZFxuICAgKiBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHt2YWw6IDF9XG4gICAqICAgICAgICwgYWRkVHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgKz0gMjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChhZGRUd28pLnRvLmluY3JlYXNlKG15T2JqLCAndmFsJykuYnkoMywgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KGFkZFR3bywgJ25vb28gd2h5IGZhaWw/PycpLnRvLmluY3JlYXNlKG15T2JqLCAndmFsJykuYnkoMyk7XG4gICAqXG4gICAqIEBuYW1lIGJ5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0RGVsdGEoZGVsdGEsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuXG4gICAgdmFyIG1zZ09iaiA9IGZsYWcodGhpcywgJ2RlbHRhTXNnT2JqJyk7XG4gICAgdmFyIGluaXRpYWwgPSBmbGFnKHRoaXMsICdpbml0aWFsRGVsdGFWYWx1ZScpO1xuICAgIHZhciBmaW5hbCA9IGZsYWcodGhpcywgJ2ZpbmFsRGVsdGFWYWx1ZScpO1xuICAgIHZhciBiZWhhdmlvciA9IGZsYWcodGhpcywgJ2RlbHRhQmVoYXZpb3InKTtcbiAgICB2YXIgcmVhbERlbHRhID0gZmxhZyh0aGlzLCAncmVhbERlbHRhJyk7XG5cbiAgICB2YXIgZXhwcmVzc2lvbjtcbiAgICBpZiAoYmVoYXZpb3IgPT09ICdjaGFuZ2UnKSB7XG4gICAgICBleHByZXNzaW9uID0gTWF0aC5hYnMoZmluYWwgLSBpbml0aWFsKSA9PT0gTWF0aC5hYnMoZGVsdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHByZXNzaW9uID0gcmVhbERlbHRhID09PSBNYXRoLmFicyhkZWx0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBleHByZXNzaW9uXG4gICAgICAsICdleHBlY3RlZCAnICsgbXNnT2JqICsgJyB0byAnICsgYmVoYXZpb3IgKyAnIGJ5ICcgKyBkZWx0YVxuICAgICAgLCAnZXhwZWN0ZWQgJyArIG1zZ09iaiArICcgdG8gbm90ICcgKyBiZWhhdmlvciArICcgYnkgJyArIGRlbHRhXG4gICAgKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2J5JywgYXNzZXJ0RGVsdGEpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmV4dGVuc2libGVcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgZXh0ZW5zaWJsZSwgd2hpY2ggbWVhbnMgdGhhdCBuZXcgcHJvcGVydGllcyBjYW5cbiAgICogYmUgYWRkZWQgdG8gaXQuIFByaW1pdGl2ZXMgYXJlIG5ldmVyIGV4dGVuc2libGUuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5iZS5leHRlbnNpYmxlO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLmV4dGVuc2libGVgLlxuICAgKlxuICAgKiAgICAgdmFyIG5vbkV4dGVuc2libGVPYmplY3QgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pXG4gICAqICAgICAgICwgc2VhbGVkT2JqZWN0ID0gT2JqZWN0LnNlYWwoe30pXG4gICAqICAgICAgICwgZnJvemVuT2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG4gICAqXG4gICAqICAgICBleHBlY3Qobm9uRXh0ZW5zaWJsZU9iamVjdCkudG8ubm90LmJlLmV4dGVuc2libGU7XG4gICAqICAgICBleHBlY3Qoc2VhbGVkT2JqZWN0KS50by5ub3QuYmUuZXh0ZW5zaWJsZTtcbiAgICogICAgIGV4cGVjdChmcm96ZW5PYmplY3QpLnRvLm5vdC5iZS5leHRlbnNpYmxlO1xuICAgKiAgICAgZXhwZWN0KDEpLnRvLm5vdC5iZS5leHRlbnNpYmxlO1xuICAgKlxuICAgKiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlIGNhbiBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5leHRlbnNpYmxlO1xuICAgKlxuICAgKiBAbmFtZSBleHRlbnNpYmxlXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnZXh0ZW5zaWJsZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcblxuICAgIC8vIEluIEVTNSwgaWYgdGhlIGFyZ3VtZW50IHRvIHRoaXMgbWV0aG9kIGlzIGEgcHJpbWl0aXZlLCB0aGVuIGl0IHdpbGwgY2F1c2UgYSBUeXBlRXJyb3IuXG4gICAgLy8gSW4gRVM2LCBhIG5vbi1vYmplY3QgYXJndW1lbnQgd2lsbCBiZSB0cmVhdGVkIGFzIGlmIGl0IHdhcyBhIG5vbi1leHRlbnNpYmxlIG9yZGluYXJ5IG9iamVjdCwgc2ltcGx5IHJldHVybiBmYWxzZS5cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNFeHRlbnNpYmxlXG4gICAgLy8gVGhlIGZvbGxvd2luZyBwcm92aWRlcyBFUzYgYmVoYXZpb3IgZm9yIEVTNSBlbnZpcm9ubWVudHMuXG5cbiAgICB2YXIgaXNFeHRlbnNpYmxlID0gb2JqID09PSBPYmplY3Qob2JqKSAmJiBPYmplY3QuaXNFeHRlbnNpYmxlKG9iaik7XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGlzRXh0ZW5zaWJsZVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBleHRlbnNpYmxlJ1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgZXh0ZW5zaWJsZSdcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5zZWFsZWRcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgc2VhbGVkLCB3aGljaCBtZWFucyB0aGF0IG5ldyBwcm9wZXJ0aWVzIGNhbid0IGJlXG4gICAqIGFkZGVkIHRvIGl0LCBhbmQgaXRzIGV4aXN0aW5nIHByb3BlcnRpZXMgY2FuJ3QgYmUgcmVjb25maWd1cmVkIG9yIGRlbGV0ZWQuXG4gICAqIEhvd2V2ZXIsIGl0J3MgcG9zc2libGUgdGhhdCBpdHMgZXhpc3RpbmcgcHJvcGVydGllcyBjYW4gc3RpbGwgYmUgcmVhc3NpZ25lZFxuICAgKiB0byBkaWZmZXJlbnQgdmFsdWVzLiBQcmltaXRpdmVzIGFyZSBhbHdheXMgc2VhbGVkLlxuICAgKlxuICAgKiAgICAgdmFyIHNlYWxlZE9iamVjdCA9IE9iamVjdC5zZWFsKHt9KTtcbiAgICogICAgIHZhciBmcm96ZW5PYmplY3QgPSBPYmplY3QuZnJlZXplKHt9KTtcbiAgICpcbiAgICogICAgIGV4cGVjdChzZWFsZWRPYmplY3QpLnRvLmJlLnNlYWxlZDtcbiAgICogICAgIGV4cGVjdChmcm96ZW5PYmplY3QpLnRvLmJlLnNlYWxlZDtcbiAgICogICAgIGV4cGVjdCgxKS50by5iZS5zZWFsZWQ7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuc2VhbGVkYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLm5vdC5iZS5zZWFsZWQ7XG4gICAqXG4gICAqIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgY2FuIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9LCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUuc2VhbGVkO1xuICAgKlxuICAgKiBAbmFtZSBzZWFsZWRcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdzZWFsZWQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG5cbiAgICAvLyBJbiBFUzUsIGlmIHRoZSBhcmd1bWVudCB0byB0aGlzIG1ldGhvZCBpcyBhIHByaW1pdGl2ZSwgdGhlbiBpdCB3aWxsIGNhdXNlIGEgVHlwZUVycm9yLlxuICAgIC8vIEluIEVTNiwgYSBub24tb2JqZWN0IGFyZ3VtZW50IHdpbGwgYmUgdHJlYXRlZCBhcyBpZiBpdCB3YXMgYSBzZWFsZWQgb3JkaW5hcnkgb2JqZWN0LCBzaW1wbHkgcmV0dXJuIHRydWUuXG4gICAgLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1NlYWxlZFxuICAgIC8vIFRoZSBmb2xsb3dpbmcgcHJvdmlkZXMgRVM2IGJlaGF2aW9yIGZvciBFUzUgZW52aXJvbm1lbnRzLlxuXG4gICAgdmFyIGlzU2VhbGVkID0gb2JqID09PSBPYmplY3Qob2JqKSA/IE9iamVjdC5pc1NlYWxlZChvYmopIDogdHJ1ZTtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgaXNTZWFsZWRcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgc2VhbGVkJ1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgc2VhbGVkJ1xuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmZyb3plblxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBmcm96ZW4sIHdoaWNoIG1lYW5zIHRoYXQgbmV3IHByb3BlcnRpZXMgY2FuJ3QgYmVcbiAgICogYWRkZWQgdG8gaXQsIGFuZCBpdHMgZXhpc3RpbmcgcHJvcGVydGllcyBjYW4ndCBiZSByZWFzc2lnbmVkIHRvIGRpZmZlcmVudFxuICAgKiB2YWx1ZXMsIHJlY29uZmlndXJlZCwgb3IgZGVsZXRlZC4gUHJpbWl0aXZlcyBhcmUgYWx3YXlzIGZyb3plbi5cbiAgICpcbiAgICogICAgIHZhciBmcm96ZW5PYmplY3QgPSBPYmplY3QuZnJlZXplKHt9KTtcbiAgICpcbiAgICogICAgIGV4cGVjdChmcm96ZW5PYmplY3QpLnRvLmJlLmZyb3plbjtcbiAgICogICAgIGV4cGVjdCgxKS50by5iZS5mcm96ZW47XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuZnJvemVuYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLm5vdC5iZS5mcm96ZW47XG4gICAqXG4gICAqIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgY2FuIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9LCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUuZnJvemVuO1xuICAgKlxuICAgKiBAbmFtZSBmcm96ZW5cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdmcm96ZW4nLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG5cbiAgICAvLyBJbiBFUzUsIGlmIHRoZSBhcmd1bWVudCB0byB0aGlzIG1ldGhvZCBpcyBhIHByaW1pdGl2ZSwgdGhlbiBpdCB3aWxsIGNhdXNlIGEgVHlwZUVycm9yLlxuICAgIC8vIEluIEVTNiwgYSBub24tb2JqZWN0IGFyZ3VtZW50IHdpbGwgYmUgdHJlYXRlZCBhcyBpZiBpdCB3YXMgYSBmcm96ZW4gb3JkaW5hcnkgb2JqZWN0LCBzaW1wbHkgcmV0dXJuIHRydWUuXG4gICAgLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc0Zyb3plblxuICAgIC8vIFRoZSBmb2xsb3dpbmcgcHJvdmlkZXMgRVM2IGJlaGF2aW9yIGZvciBFUzUgZW52aXJvbm1lbnRzLlxuXG4gICAgdmFyIGlzRnJvemVuID0gb2JqID09PSBPYmplY3Qob2JqKSA/IE9iamVjdC5pc0Zyb3plbihvYmopIDogdHJ1ZTtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgaXNGcm96ZW5cbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgZnJvemVuJ1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgZnJvemVuJ1xuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmZpbml0ZVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBhIG51bWJlciwgYW5kIGlzbid0IGBOYU5gIG9yIHBvc2l0aXZlL25lZ2F0aXZlXG4gICAqIGBJbmZpbml0eWAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uYmUuZmluaXRlO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLmZpbml0ZWAuIEhvd2V2ZXIsIGl0J3NcbiAgICogZGFuZ2Vyb3VzIHRvIGRvIHNvLiBUaGUgcHJvYmxlbSBpcyB0aGF0IGl0IGNyZWF0ZXMgdW5jZXJ0YWluIGV4cGVjdGF0aW9uc1xuICAgKiBieSBhc3NlcnRpbmcgdGhhdCB0aGUgc3ViamVjdCBlaXRoZXIgaXNuJ3QgYSBudW1iZXIsIG9yIHRoYXQgaXQncyBgTmFOYCwgb3JcbiAgICogdGhhdCBpdCdzIHBvc2l0aXZlIGBJbmZpbml0eWAsIG9yIHRoYXQgaXQncyBuZWdhdGl2ZSBgSW5maW5pdHlgLiBJdCdzIG9mdGVuXG4gICAqIGJlc3QgdG8gaWRlbnRpZnkgdGhlIGV4YWN0IG91dHB1dCB0aGF0J3MgZXhwZWN0ZWQsIGFuZCB0aGVuIHdyaXRlIGFuXG4gICAqIGFzc2VydGlvbiB0aGF0IG9ubHkgYWNjZXB0cyB0aGF0IGV4YWN0IG91dHB1dC5cbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzbid0IGV4cGVjdGVkIHRvIGJlIGEgbnVtYmVyLCBpdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0XG4gICAqIHRoYXQgaXQncyB0aGUgZXhwZWN0ZWQgdHlwZSwgcmF0aGVyIHRoYW4gYXNzZXJ0aW5nIHRoYXQgaXQgaXNuJ3Qgb25lIG9mXG4gICAqIG1hbnkgdW5leHBlY3RlZCB0eXBlcy5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uYmUuYSgnc3RyaW5nJyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLm5vdC5iZS5maW5pdGU7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXMgZXhwZWN0ZWQgdG8gYmUgYE5hTmAsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgZXhhY3RseVxuICAgKiB0aGF0LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KE5hTikudG8uYmUuTmFOOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KE5hTikudG8ubm90LmJlLmZpbml0ZTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBleHBlY3RlZCB0byBiZSBwb3NpdGl2ZSBpbmZpbml0eSwgaXQncyBvZnRlbiBiZXN0IHRvXG4gICAqIGFzc2VydCBleGFjdGx5IHRoYXQuXG4gICAqXG4gICAqICAgICBleHBlY3QoSW5maW5pdHkpLnRvLmVxdWFsKEluZmluaXR5KTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChJbmZpbml0eSkudG8ubm90LmJlLmZpbml0ZTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBleHBlY3RlZCB0byBiZSBuZWdhdGl2ZSBpbmZpbml0eSwgaXQncyBvZnRlbiBiZXN0IHRvXG4gICAqIGFzc2VydCBleGFjdGx5IHRoYXQuXG4gICAqXG4gICAqICAgICBleHBlY3QoLUluZmluaXR5KS50by5lcXVhbCgtSW5maW5pdHkpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KC1JbmZpbml0eSkudG8ubm90LmJlLmZpbml0ZTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgY2FuIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5maW5pdGU7XG4gICAqXG4gICAqIEBuYW1lIGZpbml0ZVxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ2Zpbml0ZScsIGZ1bmN0aW9uKG1zZykge1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICB0eXBlb2Ygb2JqID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKG9iailcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYSBmaW5pdGUgbnVtYmVyJ1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgYSBmaW5pdGUgbnVtYmVyJ1xuICAgICk7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvY29yZS9hc3NlcnRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiFcbiAqIGNoYWlcbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjaGFpLCB1dGlsKSB7XG4gIGNoYWkuZXhwZWN0ID0gZnVuY3Rpb24gKHZhbCwgbWVzc2FnZSkge1xuICAgIHJldHVybiBuZXcgY2hhaS5Bc3NlcnRpb24odmFsLCBtZXNzYWdlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5mYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIFttZXNzYWdlXSwgW29wZXJhdG9yXSlcbiAgICpcbiAgICogVGhyb3cgYSBmYWlsdXJlLlxuICAgKlxuICAgKiBAbmFtZSBmYWlsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGFjdHVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3BlcmF0b3JcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgY2hhaS5leHBlY3QuZmFpbCA9IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvcikge1xuICAgIG1lc3NhZ2UgPSBtZXNzYWdlIHx8ICdleHBlY3QuZmFpbCgpJztcbiAgICB0aHJvdyBuZXcgY2hhaS5Bc3NlcnRpb25FcnJvcihtZXNzYWdlLCB7XG4gICAgICAgIGFjdHVhbDogYWN0dWFsXG4gICAgICAsIGV4cGVjdGVkOiBleHBlY3RlZFxuICAgICAgLCBvcGVyYXRvcjogb3BlcmF0b3JcbiAgICB9LCBjaGFpLmV4cGVjdC5mYWlsKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL2ludGVyZmFjZS9leHBlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIVxuICogY2hhaVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNoYWksIHV0aWwpIHtcbiAgdmFyIEFzc2VydGlvbiA9IGNoYWkuQXNzZXJ0aW9uO1xuXG4gIGZ1bmN0aW9uIGxvYWRTaG91bGQgKCkge1xuICAgIC8vIGV4cGxpY2l0bHkgZGVmaW5lIHRoaXMgbWV0aG9kIGFzIGZ1bmN0aW9uIGFzIHRvIGhhdmUgaXQncyBuYW1lIHRvIGluY2x1ZGUgYXMgYHNzZmlgXG4gICAgZnVuY3Rpb24gc2hvdWxkR2V0dGVyKCkge1xuICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBTdHJpbmdcbiAgICAgICAgICB8fCB0aGlzIGluc3RhbmNlb2YgTnVtYmVyXG4gICAgICAgICAgfHwgdGhpcyBpbnN0YW5jZW9mIEJvb2xlYW5cbiAgICAgICAgICB8fCB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHRoaXMgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBc3NlcnRpb24odGhpcy52YWx1ZU9mKCksIG51bGwsIHNob3VsZEdldHRlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEFzc2VydGlvbih0aGlzLCBudWxsLCBzaG91bGRHZXR0ZXIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzaG91bGRTZXR0ZXIodmFsdWUpIHtcbiAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vY2hhaWpzL2NoYWkvaXNzdWVzLzg2OiB0aGlzIG1ha2VzXG4gICAgICAvLyBgd2hhdGV2ZXIuc2hvdWxkID0gc29tZVZhbHVlYCBhY3R1YWxseSBzZXQgYHNvbWVWYWx1ZWAsIHdoaWNoIGlzXG4gICAgICAvLyBlc3BlY2lhbGx5IHVzZWZ1bCBmb3IgYGdsb2JhbC5zaG91bGQgPSByZXF1aXJlKCdjaGFpJykuc2hvdWxkKClgLlxuICAgICAgLy9cbiAgICAgIC8vIE5vdGUgdGhhdCB3ZSBoYXZlIHRvIHVzZSBbW0RlZmluZVByb3BlcnR5XV0gaW5zdGVhZCBvZiBbW1B1dF1dXG4gICAgICAvLyBzaW5jZSBvdGhlcndpc2Ugd2Ugd291bGQgdHJpZ2dlciB0aGlzIHZlcnkgc2V0dGVyIVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzaG91bGQnLCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIG1vZGlmeSBPYmplY3QucHJvdG90eXBlIHRvIGhhdmUgYHNob3VsZGBcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3Nob3VsZCcsIHtcbiAgICAgIHNldDogc2hvdWxkU2V0dGVyXG4gICAgICAsIGdldDogc2hvdWxkR2V0dGVyXG4gICAgICAsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgdmFyIHNob3VsZCA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogIyMjIC5mYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIFttZXNzYWdlXSwgW29wZXJhdG9yXSlcbiAgICAgKlxuICAgICAqIFRocm93IGEgZmFpbHVyZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGZhaWxcbiAgICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWxcbiAgICAgKiBAcGFyYW0ge01peGVkfSBleHBlY3RlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9wZXJhdG9yXG4gICAgICogQG5hbWVzcGFjZSBCRERcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuXG4gICAgc2hvdWxkLmZhaWwgPSBmdW5jdGlvbiAoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgb3BlcmF0b3IpIHtcbiAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlIHx8ICdzaG91bGQuZmFpbCgpJztcbiAgICAgIHRocm93IG5ldyBjaGFpLkFzc2VydGlvbkVycm9yKG1lc3NhZ2UsIHtcbiAgICAgICAgICBhY3R1YWw6IGFjdHVhbFxuICAgICAgICAsIGV4cGVjdGVkOiBleHBlY3RlZFxuICAgICAgICAsIG9wZXJhdG9yOiBvcGVyYXRvclxuICAgICAgfSwgc2hvdWxkLmZhaWwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAjIyMgLmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIFttZXNzYWdlXSlcbiAgICAgKlxuICAgICAqIEFzc2VydHMgbm9uLXN0cmljdCBlcXVhbGl0eSAoYD09YCkgb2YgYGFjdHVhbGAgYW5kIGBleHBlY3RlZGAuXG4gICAgICpcbiAgICAgKiAgICAgc2hvdWxkLmVxdWFsKDMsICczJywgJz09IGNvZXJjZXMgdmFsdWVzIHRvIHN0cmluZ3MnKTtcbiAgICAgKlxuICAgICAqIEBuYW1lIGVxdWFsXG4gICAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqIEBuYW1lc3BhY2UgU2hvdWxkXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cblxuICAgIHNob3VsZC5lcXVhbCA9IGZ1bmN0aW9uICh2YWwxLCB2YWwyLCBtc2cpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24odmFsMSwgbXNnKS50by5lcXVhbCh2YWwyKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogIyMjIC50aHJvdyhmdW5jdGlvbiwgW2NvbnN0cnVjdG9yL3N0cmluZy9yZWdleHBdLCBbc3RyaW5nL3JlZ2V4cF0sIFttZXNzYWdlXSlcbiAgICAgKlxuICAgICAqIEFzc2VydHMgdGhhdCBgZnVuY3Rpb25gIHdpbGwgdGhyb3cgYW4gZXJyb3IgdGhhdCBpcyBhbiBpbnN0YW5jZSBvZlxuICAgICAqIGBjb25zdHJ1Y3RvcmAsIG9yIGFsdGVybmF0ZWx5IHRoYXQgaXQgd2lsbCB0aHJvdyBhbiBlcnJvciB3aXRoIG1lc3NhZ2VcbiAgICAgKiBtYXRjaGluZyBgcmVnZXhwYC5cbiAgICAgKlxuICAgICAqICAgICBzaG91bGQudGhyb3coZm4sICdmdW5jdGlvbiB0aHJvd3MgYSByZWZlcmVuY2UgZXJyb3InKTtcbiAgICAgKiAgICAgc2hvdWxkLnRocm93KGZuLCAvZnVuY3Rpb24gdGhyb3dzIGEgcmVmZXJlbmNlIGVycm9yLyk7XG4gICAgICogICAgIHNob3VsZC50aHJvdyhmbiwgUmVmZXJlbmNlRXJyb3IpO1xuICAgICAqICAgICBzaG91bGQudGhyb3coZm4sIFJlZmVyZW5jZUVycm9yLCAnZnVuY3Rpb24gdGhyb3dzIGEgcmVmZXJlbmNlIGVycm9yJyk7XG4gICAgICogICAgIHNob3VsZC50aHJvdyhmbiwgUmVmZXJlbmNlRXJyb3IsIC9mdW5jdGlvbiB0aHJvd3MgYSByZWZlcmVuY2UgZXJyb3IvKTtcbiAgICAgKlxuICAgICAqIEBuYW1lIHRocm93XG4gICAgICogQGFsaWFzIFRocm93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Vycm9yQ29uc3RydWN0b3J9IGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4cFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9FcnJvciNFcnJvcl90eXBlc1xuICAgICAqIEBuYW1lc3BhY2UgU2hvdWxkXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cblxuICAgIHNob3VsZC5UaHJvdyA9IGZ1bmN0aW9uIChmbiwgZXJydCwgZXJycywgbXNnKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2cpLnRvLlRocm93KGVycnQsIGVycnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAjIyMgLmV4aXN0XG4gICAgICpcbiAgICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBuZWl0aGVyIGBudWxsYCBub3IgYHVuZGVmaW5lZGAuXG4gICAgICpcbiAgICAgKiAgICAgdmFyIGZvbyA9ICdoaSc7XG4gICAgICpcbiAgICAgKiAgICAgc2hvdWxkLmV4aXN0KGZvbywgJ2ZvbyBleGlzdHMnKTtcbiAgICAgKlxuICAgICAqIEBuYW1lIGV4aXN0XG4gICAgICogQG5hbWVzcGFjZSBTaG91bGRcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuXG4gICAgc2hvdWxkLmV4aXN0ID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5leGlzdDtcbiAgICB9XG5cbiAgICAvLyBuZWdhdGlvblxuICAgIHNob3VsZC5ub3QgPSB7fVxuXG4gICAgLyoqXG4gICAgICogIyMjIC5ub3QuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgICAqXG4gICAgICogQXNzZXJ0cyBub24tc3RyaWN0IGluZXF1YWxpdHkgKGAhPWApIG9mIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgLlxuICAgICAqXG4gICAgICogICAgIHNob3VsZC5ub3QuZXF1YWwoMywgNCwgJ3RoZXNlIG51bWJlcnMgYXJlIG5vdCBlcXVhbCcpO1xuICAgICAqXG4gICAgICogQG5hbWUgbm90LmVxdWFsXG4gICAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqIEBuYW1lc3BhY2UgU2hvdWxkXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cblxuICAgIHNob3VsZC5ub3QuZXF1YWwgPSBmdW5jdGlvbiAodmFsMSwgdmFsMiwgbXNnKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKHZhbDEsIG1zZykudG8ubm90LmVxdWFsKHZhbDIpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAjIyMgLnRocm93KGZ1bmN0aW9uLCBbY29uc3RydWN0b3IvcmVnZXhwXSwgW21lc3NhZ2VdKVxuICAgICAqXG4gICAgICogQXNzZXJ0cyB0aGF0IGBmdW5jdGlvbmAgd2lsbCBfbm90XyB0aHJvdyBhbiBlcnJvciB0aGF0IGlzIGFuIGluc3RhbmNlIG9mXG4gICAgICogYGNvbnN0cnVjdG9yYCwgb3IgYWx0ZXJuYXRlbHkgdGhhdCBpdCB3aWxsIG5vdCB0aHJvdyBhbiBlcnJvciB3aXRoIG1lc3NhZ2VcbiAgICAgKiBtYXRjaGluZyBgcmVnZXhwYC5cbiAgICAgKlxuICAgICAqICAgICBzaG91bGQubm90LnRocm93KGZuLCBFcnJvciwgJ2Z1bmN0aW9uIGRvZXMgbm90IHRocm93Jyk7XG4gICAgICpcbiAgICAgKiBAbmFtZSBub3QudGhyb3dcbiAgICAgKiBAYWxpYXMgbm90LlRocm93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Vycm9yQ29uc3RydWN0b3J9IGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4cFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9FcnJvciNFcnJvcl90eXBlc1xuICAgICAqIEBuYW1lc3BhY2UgU2hvdWxkXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cblxuICAgIHNob3VsZC5ub3QuVGhyb3cgPSBmdW5jdGlvbiAoZm4sIGVycnQsIGVycnMsIG1zZykge1xuICAgICAgbmV3IEFzc2VydGlvbihmbiwgbXNnKS50by5ub3QuVGhyb3coZXJydCwgZXJycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqICMjIyAubm90LmV4aXN0XG4gICAgICpcbiAgICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBuZWl0aGVyIGBudWxsYCBub3IgYHVuZGVmaW5lZGAuXG4gICAgICpcbiAgICAgKiAgICAgdmFyIGJhciA9IG51bGw7XG4gICAgICpcbiAgICAgKiAgICAgc2hvdWxkLm5vdC5leGlzdChiYXIsICdiYXIgZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgKlxuICAgICAqIEBuYW1lIG5vdC5leGlzdFxuICAgICAqIEBuYW1lc3BhY2UgU2hvdWxkXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cblxuICAgIHNob3VsZC5ub3QuZXhpc3QgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5leGlzdDtcbiAgICB9XG5cbiAgICBzaG91bGRbJ3Rocm93J10gPSBzaG91bGRbJ1Rocm93J107XG4gICAgc2hvdWxkLm5vdFsndGhyb3cnXSA9IHNob3VsZC5ub3RbJ1Rocm93J107XG5cbiAgICByZXR1cm4gc2hvdWxkO1xuICB9O1xuXG4gIGNoYWkuc2hvdWxkID0gbG9hZFNob3VsZDtcbiAgY2hhaS5TaG91bGQgPSBsb2FkU2hvdWxkO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvaW50ZXJmYWNlL3Nob3VsZC5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyohXG4gKiBjaGFpXG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjaGFpLCB1dGlsKSB7XG5cbiAgLyohXG4gICAqIENoYWkgZGVwZW5kZW5jaWVzLlxuICAgKi9cblxuICB2YXIgQXNzZXJ0aW9uID0gY2hhaS5Bc3NlcnRpb25cbiAgICAsIGZsYWcgPSB1dGlsLmZsYWc7XG5cbiAgLyohXG4gICAqIE1vZHVsZSBleHBvcnQuXG4gICAqL1xuXG4gIC8qKlxuICAgKiAjIyMgYXNzZXJ0KGV4cHJlc3Npb24sIG1lc3NhZ2UpXG4gICAqXG4gICAqIFdyaXRlIHlvdXIgb3duIHRlc3QgZXhwcmVzc2lvbnMuXG4gICAqXG4gICAqICAgICBhc3NlcnQoJ2ZvbycgIT09ICdiYXInLCAnZm9vIGlzIG5vdCBiYXInKTtcbiAgICogICAgIGFzc2VydChBcnJheS5pc0FycmF5KFtdKSwgJ2VtcHR5IGFycmF5cyBhcmUgYXJyYXlzJyk7XG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cHJlc3Npb24gdG8gdGVzdCBmb3IgdHJ1dGhpbmVzc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSB0byBkaXNwbGF5IG9uIGVycm9yXG4gICAqIEBuYW1lIGFzc2VydFxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB2YXIgYXNzZXJ0ID0gY2hhaS5hc3NlcnQgPSBmdW5jdGlvbiAoZXhwcmVzcywgZXJybXNnKSB7XG4gICAgdmFyIHRlc3QgPSBuZXcgQXNzZXJ0aW9uKG51bGwsIG51bGwsIGNoYWkuYXNzZXJ0LCB0cnVlKTtcbiAgICB0ZXN0LmFzc2VydChcbiAgICAgICAgZXhwcmVzc1xuICAgICAgLCBlcnJtc2dcbiAgICAgICwgJ1sgbmVnYXRpb24gbWVzc2FnZSB1bmF2YWlsYWJsZSBdJ1xuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0sIFtvcGVyYXRvcl0pXG4gICAqXG4gICAqIFRocm93IGEgZmFpbHVyZS4gTm9kZS5qcyBgYXNzZXJ0YCBtb2R1bGUtY29tcGF0aWJsZS5cbiAgICpcbiAgICogQG5hbWUgZmFpbFxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wZXJhdG9yXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5mYWlsID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yKSB7XG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgJ2Fzc2VydC5mYWlsKCknO1xuICAgIHRocm93IG5ldyBjaGFpLkFzc2VydGlvbkVycm9yKG1lc3NhZ2UsIHtcbiAgICAgICAgYWN0dWFsOiBhY3R1YWxcbiAgICAgICwgZXhwZWN0ZWQ6IGV4cGVjdGVkXG4gICAgICAsIG9wZXJhdG9yOiBvcGVyYXRvclxuICAgIH0sIGFzc2VydC5mYWlsKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc09rKG9iamVjdCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaXMgdHJ1dGh5LlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzT2soJ2V2ZXJ5dGhpbmcnLCAnZXZlcnl0aGluZyBpcyBvaycpO1xuICAgKiAgICAgYXNzZXJ0LmlzT2soZmFsc2UsICd0aGlzIHdpbGwgZmFpbCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc09rXG4gICAqIEBhbGlhcyBva1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3QgdG8gdGVzdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNPayA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc09rLCB0cnVlKS5pcy5vaztcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdE9rKG9iamVjdCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaXMgZmFsc3kuXG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNOb3RPaygnZXZlcnl0aGluZycsICd0aGlzIHdpbGwgZmFpbCcpO1xuICAgKiAgICAgYXNzZXJ0LmlzTm90T2soZmFsc2UsICd0aGlzIHdpbGwgcGFzcycpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdE9rXG4gICAqIEBhbGlhcyBub3RPa1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3QgdG8gdGVzdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3RPayA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdE9rLCB0cnVlKS5pcy5ub3Qub2s7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIG5vbi1zdHJpY3QgZXF1YWxpdHkgKGA9PWApIG9mIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmVxdWFsKDMsICczJywgJz09IGNvZXJjZXMgdmFsdWVzIHRvIHN0cmluZ3MnKTtcbiAgICpcbiAgICogQG5hbWUgZXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5lcXVhbCA9IGZ1bmN0aW9uIChhY3QsIGV4cCwgbXNnKSB7XG4gICAgdmFyIHRlc3QgPSBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQuZXF1YWwsIHRydWUpO1xuXG4gICAgdGVzdC5hc3NlcnQoXG4gICAgICAgIGV4cCA9PSBmbGFnKHRlc3QsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBlcXVhbCAje2V4cH0nXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBlcXVhbCAje2FjdH0nXG4gICAgICAsIGV4cFxuICAgICAgLCBhY3RcbiAgICAgICwgdHJ1ZVxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIG5vbi1zdHJpY3QgaW5lcXVhbGl0eSAoYCE9YCkgb2YgYGFjdHVhbGAgYW5kIGBleHBlY3RlZGAuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90RXF1YWwoMywgNCwgJ3RoZXNlIG51bWJlcnMgYXJlIG5vdCBlcXVhbCcpO1xuICAgKlxuICAgKiBAbmFtZSBub3RFcXVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdEVxdWFsID0gZnVuY3Rpb24gKGFjdCwgZXhwLCBtc2cpIHtcbiAgICB2YXIgdGVzdCA9IG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5ub3RFcXVhbCwgdHJ1ZSk7XG5cbiAgICB0ZXN0LmFzc2VydChcbiAgICAgICAgZXhwICE9IGZsYWcodGVzdCwgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBlcXVhbCAje2V4cH0nXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGVxdWFsICN7YWN0fSdcbiAgICAgICwgZXhwXG4gICAgICAsIGFjdFxuICAgICAgLCB0cnVlXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgc3RyaWN0IGVxdWFsaXR5IChgPT09YCkgb2YgYGFjdHVhbGAgYW5kIGBleHBlY3RlZGAuXG4gICAqXG4gICAqICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodHJ1ZSwgdHJ1ZSwgJ3RoZXNlIGJvb2xlYW5zIGFyZSBzdHJpY3RseSBlcXVhbCcpO1xuICAgKlxuICAgKiBAbmFtZSBzdHJpY3RFcXVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LnN0cmljdEVxdWFsID0gZnVuY3Rpb24gKGFjdCwgZXhwLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQuc3RyaWN0RXF1YWwsIHRydWUpLnRvLmVxdWFsKGV4cCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHN0cmljdCBpbmVxdWFsaXR5IChgIT09YCkgb2YgYGFjdHVhbGAgYW5kIGBleHBlY3RlZGAuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90U3RyaWN0RXF1YWwoMywgJzMnLCAnbm8gY29lcmNpb24gZm9yIHN0cmljdCBlcXVhbGl0eScpO1xuICAgKlxuICAgKiBAbmFtZSBub3RTdHJpY3RFcXVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsID0gZnVuY3Rpb24gKGFjdCwgZXhwLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQubm90U3RyaWN0RXF1YWwsIHRydWUpLnRvLm5vdC5lcXVhbChleHApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgYWN0dWFsYCBpcyBkZWVwbHkgZXF1YWwgdG8gYGV4cGVjdGVkYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5kZWVwRXF1YWwoeyB0ZWE6ICdncmVlbicgfSwgeyB0ZWE6ICdncmVlbicgfSk7XG4gICAqXG4gICAqIEBuYW1lIGRlZXBFcXVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFsaWFzIGRlZXBTdHJpY3RFcXVhbFxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZGVlcEVxdWFsID0gYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIChhY3QsIGV4cCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0LmRlZXBFcXVhbCwgdHJ1ZSkudG8uZXFsKGV4cCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0IHRoYXQgYGFjdHVhbGAgaXMgbm90IGRlZXBseSBlcXVhbCB0byBgZXhwZWN0ZWRgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBFcXVhbCh7IHRlYTogJ2dyZWVuJyB9LCB7IHRlYTogJ2phc21pbmUnIH0pO1xuICAgKlxuICAgKiBAbmFtZSBub3REZWVwRXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3REZWVwRXF1YWwgPSBmdW5jdGlvbiAoYWN0LCBleHAsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5ub3REZWVwRXF1YWwsIHRydWUpLnRvLm5vdC5lcWwoZXhwKTtcbiAgfTtcblxuICAgLyoqXG4gICAqICMjIyAuaXNBYm92ZSh2YWx1ZVRvQ2hlY2ssIHZhbHVlVG9CZUFib3ZlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgYHZhbHVlVG9DaGVja2AgaXMgc3RyaWN0bHkgZ3JlYXRlciB0aGFuICg+KSBgdmFsdWVUb0JlQWJvdmVgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzQWJvdmUoNSwgMiwgJzUgaXMgc3RyaWN0bHkgZ3JlYXRlciB0aGFuIDInKTtcbiAgICpcbiAgICogQG5hbWUgaXNBYm92ZVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVRvQ2hlY2tcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVUb0JlQWJvdmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzQWJvdmUgPSBmdW5jdGlvbiAodmFsLCBhYnYsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0Fib3ZlLCB0cnVlKS50by5iZS5hYm92ZShhYnYpO1xuICB9O1xuXG4gICAvKipcbiAgICogIyMjIC5pc0F0TGVhc3QodmFsdWVUb0NoZWNrLCB2YWx1ZVRvQmVBdExlYXN0LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgYHZhbHVlVG9DaGVja2AgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICg+PSkgYHZhbHVlVG9CZUF0TGVhc3RgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzQXRMZWFzdCg1LCAyLCAnNSBpcyBncmVhdGVyIG9yIGVxdWFsIHRvIDInKTtcbiAgICogICAgIGFzc2VydC5pc0F0TGVhc3QoMywgMywgJzMgaXMgZ3JlYXRlciBvciBlcXVhbCB0byAzJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzQXRMZWFzdFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVRvQ2hlY2tcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVUb0JlQXRMZWFzdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNBdExlYXN0ID0gZnVuY3Rpb24gKHZhbCwgYXRsc3QsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0F0TGVhc3QsIHRydWUpLnRvLmJlLmxlYXN0KGF0bHN0KTtcbiAgfTtcblxuICAgLyoqXG4gICAqICMjIyAuaXNCZWxvdyh2YWx1ZVRvQ2hlY2ssIHZhbHVlVG9CZUJlbG93LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgYHZhbHVlVG9DaGVja2AgaXMgc3RyaWN0bHkgbGVzcyB0aGFuICg8KSBgdmFsdWVUb0JlQmVsb3dgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzQmVsb3coMywgNiwgJzMgaXMgc3RyaWN0bHkgbGVzcyB0aGFuIDYnKTtcbiAgICpcbiAgICogQG5hbWUgaXNCZWxvd1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVRvQ2hlY2tcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVUb0JlQmVsb3dcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzQmVsb3cgPSBmdW5jdGlvbiAodmFsLCBibHcsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0JlbG93LCB0cnVlKS50by5iZS5iZWxvdyhibHcpO1xuICB9O1xuXG4gICAvKipcbiAgICogIyMjIC5pc0F0TW9zdCh2YWx1ZVRvQ2hlY2ssIHZhbHVlVG9CZUF0TW9zdCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIGB2YWx1ZVRvQ2hlY2tgIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byAoPD0pIGB2YWx1ZVRvQmVBdE1vc3RgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzQXRNb3N0KDMsIDYsICczIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byA2Jyk7XG4gICAqICAgICBhc3NlcnQuaXNBdE1vc3QoNCwgNCwgJzQgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDQnKTtcbiAgICpcbiAgICogQG5hbWUgaXNBdE1vc3RcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVUb0NoZWNrXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlVG9CZUF0TW9zdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNBdE1vc3QgPSBmdW5jdGlvbiAodmFsLCBhdG1zdCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzQXRNb3N0LCB0cnVlKS50by5iZS5tb3N0KGF0bXN0KTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc1RydWUodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgdHJ1ZS5cbiAgICpcbiAgICogICAgIHZhciB0ZWFTZXJ2ZWQgPSB0cnVlO1xuICAgKiAgICAgYXNzZXJ0LmlzVHJ1ZSh0ZWFTZXJ2ZWQsICd0aGUgdGVhIGhhcyBiZWVuIHNlcnZlZCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc1RydWVcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzVHJ1ZSA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc1RydWUsIHRydWUpLmlzWyd0cnVlJ107XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RUcnVlKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIG5vdCB0cnVlLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYSA9ICd0YXN0eSBjaGFpJztcbiAgICogICAgIGFzc2VydC5pc05vdFRydWUodGVhLCAnZ3JlYXQsIHRpbWUgZm9yIHRlYSEnKTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3RUcnVlXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdFRydWUgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RUcnVlLCB0cnVlKS50by5ub3QuZXF1YWwodHJ1ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNGYWxzZSh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBmYWxzZS5cbiAgICpcbiAgICogICAgIHZhciB0ZWFTZXJ2ZWQgPSBmYWxzZTtcbiAgICogICAgIGFzc2VydC5pc0ZhbHNlKHRlYVNlcnZlZCwgJ25vIHRlYSB5ZXQ/IGhtbS4uLicpO1xuICAgKlxuICAgKiBAbmFtZSBpc0ZhbHNlXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0ZhbHNlID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzRmFsc2UsIHRydWUpLmlzWydmYWxzZSddO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90RmFsc2UodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgbm90IGZhbHNlLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYSA9ICd0YXN0eSBjaGFpJztcbiAgICogICAgIGFzc2VydC5pc05vdEZhbHNlKHRlYSwgJ2dyZWF0LCB0aW1lIGZvciB0ZWEhJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90RmFsc2VcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90RmFsc2UgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RGYWxzZSwgdHJ1ZSkudG8ubm90LmVxdWFsKGZhbHNlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc051bGwodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgbnVsbC5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc051bGwoZXJyLCAndGhlcmUgd2FzIG5vIGVycm9yJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTnVsbFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOdWxsID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTnVsbCwgdHJ1ZSkudG8uZXF1YWwobnVsbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3ROdWxsKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIG5vdCBudWxsLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYSA9ICd0YXN0eSBjaGFpJztcbiAgICogICAgIGFzc2VydC5pc05vdE51bGwodGVhLCAnZ3JlYXQsIHRpbWUgZm9yIHRlYSEnKTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3ROdWxsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdE51bGwgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3ROdWxsLCB0cnVlKS50by5ub3QuZXF1YWwobnVsbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOYU5cbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHZhbHVlIGlzIE5hTi5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc05hTihOYU4sICdOYU4gaXMgTmFOJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTmFOXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05hTiA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05hTiwgdHJ1ZSkudG8uYmUuTmFOO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90TmFOXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB2YWx1ZSBpcyBub3QgTmFOLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzTm90TmFOKDQsICc0IGlzIG5vdCBOYU4nKTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3ROYU5cbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG4gIGFzc2VydC5pc05vdE5hTiA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdE5hTiwgdHJ1ZSkubm90LnRvLmJlLk5hTjtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5leGlzdHNcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgbmVpdGhlciBgbnVsbGAgbm9yIGB1bmRlZmluZWRgLlxuICAgKlxuICAgKiAgICAgdmFyIGZvbyA9ICdoaSc7XG4gICAqXG4gICAqICAgICBhc3NlcnQuZXhpc3RzKGZvbywgJ2ZvbyBpcyBuZWl0aGVyIGBudWxsYCBub3IgYHVuZGVmaW5lZGAnKTtcbiAgICpcbiAgICogQG5hbWUgZXhpc3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5leGlzdHMgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuZXhpc3RzLCB0cnVlKS50by5leGlzdDtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RFeGlzdHNcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgZWl0aGVyIGBudWxsYCBvciBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogICAgIHZhciBiYXIgPSBudWxsXG4gICAqICAgICAgICwgYmF6O1xuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdEV4aXN0cyhiYXIpO1xuICAgKiAgICAgYXNzZXJ0Lm5vdEV4aXN0cyhiYXosICdiYXogaXMgZWl0aGVyIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdEV4aXN0c1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90RXhpc3RzID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0Lm5vdEV4aXN0cywgdHJ1ZSkudG8ubm90LmV4aXN0O1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzVW5kZWZpbmVkKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGB1bmRlZmluZWRgLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYTtcbiAgICogICAgIGFzc2VydC5pc1VuZGVmaW5lZCh0ZWEsICdubyB0ZWEgZGVmaW5lZCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc1VuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNVbmRlZmluZWQgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNVbmRlZmluZWQsIHRydWUpLnRvLmVxdWFsKHVuZGVmaW5lZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNEZWZpbmVkKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIG5vdCBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogICAgIHZhciB0ZWEgPSAnY3VwIG9mIGNoYWknO1xuICAgKiAgICAgYXNzZXJ0LmlzRGVmaW5lZCh0ZWEsICd0ZWEgaGFzIGJlZW4gZGVmaW5lZCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc0RlZmluZWRcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzRGVmaW5lZCA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0RlZmluZWQsIHRydWUpLnRvLm5vdC5lcXVhbCh1bmRlZmluZWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzRnVuY3Rpb24odmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgYSBmdW5jdGlvbi5cbiAgICpcbiAgICogICAgIGZ1bmN0aW9uIHNlcnZlVGVhKCkgeyByZXR1cm4gJ2N1cCBvZiB0ZWEnOyB9O1xuICAgKiAgICAgYXNzZXJ0LmlzRnVuY3Rpb24oc2VydmVUZWEsICdncmVhdCwgd2UgY2FuIGhhdmUgdGVhIG5vdycpO1xuICAgKlxuICAgKiBAbmFtZSBpc0Z1bmN0aW9uXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0Z1bmN0aW9uID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzRnVuY3Rpb24sIHRydWUpLnRvLmJlLmEoJ2Z1bmN0aW9uJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RGdW5jdGlvbih2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBfbm90XyBhIGZ1bmN0aW9uLlxuICAgKlxuICAgKiAgICAgdmFyIHNlcnZlVGVhID0gWyAnaGVhdCcsICdwb3VyJywgJ3NpcCcgXTtcbiAgICogICAgIGFzc2VydC5pc05vdEZ1bmN0aW9uKHNlcnZlVGVhLCAnZ3JlYXQsIHdlIGhhdmUgbGlzdGVkIHRoZSBzdGVwcycpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdEZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90RnVuY3Rpb24sIHRydWUpLnRvLm5vdC5iZS5hKCdmdW5jdGlvbicpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzT2JqZWN0KHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGFuIG9iamVjdCBvZiB0eXBlICdPYmplY3QnIChhcyByZXZlYWxlZCBieSBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2ApLlxuICAgKiBfVGhlIGFzc2VydGlvbiBkb2VzIG5vdCBtYXRjaCBzdWJjbGFzc2VkIG9iamVjdHMuX1xuICAgKlxuICAgKiAgICAgdmFyIHNlbGVjdGlvbiA9IHsgbmFtZTogJ0NoYWknLCBzZXJ2ZTogJ3dpdGggc3BpY2VzJyB9O1xuICAgKiAgICAgYXNzZXJ0LmlzT2JqZWN0KHNlbGVjdGlvbiwgJ3RlYSBzZWxlY3Rpb24gaXMgYW4gb2JqZWN0Jyk7XG4gICAqXG4gICAqIEBuYW1lIGlzT2JqZWN0XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc09iamVjdCA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc09iamVjdCwgdHJ1ZSkudG8uYmUuYSgnb2JqZWN0Jyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RPYmplY3QodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgX25vdF8gYW4gb2JqZWN0IG9mIHR5cGUgJ09iamVjdCcgKGFzIHJldmVhbGVkIGJ5IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCkuXG4gICAqXG4gICAqICAgICB2YXIgc2VsZWN0aW9uID0gJ2NoYWknXG4gICAqICAgICBhc3NlcnQuaXNOb3RPYmplY3Qoc2VsZWN0aW9uLCAndGVhIHNlbGVjdGlvbiBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gICAqICAgICBhc3NlcnQuaXNOb3RPYmplY3QobnVsbCwgJ251bGwgaXMgbm90IGFuIG9iamVjdCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdE9iamVjdFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3RPYmplY3QgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RPYmplY3QsIHRydWUpLnRvLm5vdC5iZS5hKCdvYmplY3QnKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc0FycmF5KHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGFuIGFycmF5LlxuICAgKlxuICAgKiAgICAgdmFyIG1lbnUgPSBbICdncmVlbicsICdjaGFpJywgJ29vbG9uZycgXTtcbiAgICogICAgIGFzc2VydC5pc0FycmF5KG1lbnUsICd3aGF0IGtpbmQgb2YgdGVhIGRvIHdlIHdhbnQ/Jyk7XG4gICAqXG4gICAqIEBuYW1lIGlzQXJyYXlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzQXJyYXkgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNBcnJheSwgdHJ1ZSkudG8uYmUuYW4oJ2FycmF5Jyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RBcnJheSh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBfbm90XyBhbiBhcnJheS5cbiAgICpcbiAgICogICAgIHZhciBtZW51ID0gJ2dyZWVufGNoYWl8b29sb25nJztcbiAgICogICAgIGFzc2VydC5pc05vdEFycmF5KG1lbnUsICd3aGF0IGtpbmQgb2YgdGVhIGRvIHdlIHdhbnQ/Jyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90QXJyYXlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90QXJyYXkgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RBcnJheSwgdHJ1ZSkudG8ubm90LmJlLmFuKCdhcnJheScpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzU3RyaW5nKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGEgc3RyaW5nLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYU9yZGVyID0gJ2NoYWknO1xuICAgKiAgICAgYXNzZXJ0LmlzU3RyaW5nKHRlYU9yZGVyLCAnb3JkZXIgcGxhY2VkJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzU3RyaW5nXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc1N0cmluZyA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc1N0cmluZywgdHJ1ZSkudG8uYmUuYSgnc3RyaW5nJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RTdHJpbmcodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgX25vdF8gYSBzdHJpbmcuXG4gICAqXG4gICAqICAgICB2YXIgdGVhT3JkZXIgPSA0O1xuICAgKiAgICAgYXNzZXJ0LmlzTm90U3RyaW5nKHRlYU9yZGVyLCAnb3JkZXIgcGxhY2VkJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90U3RyaW5nXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdFN0cmluZyA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdFN0cmluZywgdHJ1ZSkudG8ubm90LmJlLmEoJ3N0cmluZycpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTnVtYmVyKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGEgbnVtYmVyLlxuICAgKlxuICAgKiAgICAgdmFyIGN1cHMgPSAyO1xuICAgKiAgICAgYXNzZXJ0LmlzTnVtYmVyKGN1cHMsICdob3cgbWFueSBjdXBzJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTnVtYmVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOdW1iZXIgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOdW1iZXIsIHRydWUpLnRvLmJlLmEoJ251bWJlcicpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90TnVtYmVyKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIF9ub3RfIGEgbnVtYmVyLlxuICAgKlxuICAgKiAgICAgdmFyIGN1cHMgPSAnMiBjdXBzIHBsZWFzZSc7XG4gICAqICAgICBhc3NlcnQuaXNOb3ROdW1iZXIoY3VwcywgJ2hvdyBtYW55IGN1cHMnKTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3ROdW1iZXJcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90TnVtYmVyID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90TnVtYmVyLCB0cnVlKS50by5ub3QuYmUuYSgnbnVtYmVyJyk7XG4gIH07XG5cbiAgIC8qKlxuICAgKiAjIyMgLmlzRmluaXRlKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGEgZmluaXRlIG51bWJlci4gVW5saWtlIGAuaXNOdW1iZXJgLCB0aGlzIHdpbGwgZmFpbCBmb3IgYE5hTmAgYW5kIGBJbmZpbml0eWAuXG4gICAqXG4gICAqICAgICB2YXIgY3VwcyA9IDI7XG4gICAqICAgICBhc3NlcnQuaXNGaW5pdGUoY3VwcywgJ2hvdyBtYW55IGN1cHMnKTtcbiAgICpcbiAgICogICAgIGFzc2VydC5pc0Zpbml0ZShOYU4pOyAvLyB0aHJvd3NcbiAgICpcbiAgICogQG5hbWUgaXNGaW5pdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0Zpbml0ZSA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0Zpbml0ZSwgdHJ1ZSkudG8uYmUuZmluaXRlO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzQm9vbGVhbih2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhIGJvb2xlYW4uXG4gICAqXG4gICAqICAgICB2YXIgdGVhUmVhZHkgPSB0cnVlXG4gICAqICAgICAgICwgdGVhU2VydmVkID0gZmFsc2U7XG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNCb29sZWFuKHRlYVJlYWR5LCAnaXMgdGhlIHRlYSByZWFkeScpO1xuICAgKiAgICAgYXNzZXJ0LmlzQm9vbGVhbih0ZWFTZXJ2ZWQsICdoYXMgdGVhIGJlZW4gc2VydmVkJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzQm9vbGVhblxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNCb29sZWFuID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzQm9vbGVhbiwgdHJ1ZSkudG8uYmUuYSgnYm9vbGVhbicpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90Qm9vbGVhbih2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBfbm90XyBhIGJvb2xlYW4uXG4gICAqXG4gICAqICAgICB2YXIgdGVhUmVhZHkgPSAneWVwJ1xuICAgKiAgICAgICAsIHRlYVNlcnZlZCA9ICdub3BlJztcbiAgICpcbiAgICogICAgIGFzc2VydC5pc05vdEJvb2xlYW4odGVhUmVhZHksICdpcyB0aGUgdGVhIHJlYWR5Jyk7XG4gICAqICAgICBhc3NlcnQuaXNOb3RCb29sZWFuKHRlYVNlcnZlZCwgJ2hhcyB0ZWEgYmVlbiBzZXJ2ZWQnKTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3RCb29sZWFuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdEJvb2xlYW4gPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RCb29sZWFuLCB0cnVlKS50by5ub3QuYmUuYSgnYm9vbGVhbicpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLnR5cGVPZih2YWx1ZSwgbmFtZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCdzIHR5cGUgaXMgYG5hbWVgLCBhcyBkZXRlcm1pbmVkIGJ5XG4gICAqIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAgICpcbiAgICogICAgIGFzc2VydC50eXBlT2YoeyB0ZWE6ICdjaGFpJyB9LCAnb2JqZWN0JywgJ3dlIGhhdmUgYW4gb2JqZWN0Jyk7XG4gICAqICAgICBhc3NlcnQudHlwZU9mKFsnY2hhaScsICdqYXNtaW5lJ10sICdhcnJheScsICd3ZSBoYXZlIGFuIGFycmF5Jyk7XG4gICAqICAgICBhc3NlcnQudHlwZU9mKCd0ZWEnLCAnc3RyaW5nJywgJ3dlIGhhdmUgYSBzdHJpbmcnKTtcbiAgICogICAgIGFzc2VydC50eXBlT2YoL3RlYS8sICdyZWdleHAnLCAnd2UgaGF2ZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbicpO1xuICAgKiAgICAgYXNzZXJ0LnR5cGVPZihudWxsLCAnbnVsbCcsICd3ZSBoYXZlIGEgbnVsbCcpO1xuICAgKiAgICAgYXNzZXJ0LnR5cGVPZih1bmRlZmluZWQsICd1bmRlZmluZWQnLCAnd2UgaGF2ZSBhbiB1bmRlZmluZWQnKTtcbiAgICpcbiAgICogQG5hbWUgdHlwZU9mXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC50eXBlT2YgPSBmdW5jdGlvbiAodmFsLCB0eXBlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQudHlwZU9mLCB0cnVlKS50by5iZS5hKHR5cGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFR5cGVPZih2YWx1ZSwgbmFtZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCdzIHR5cGUgaXMgX25vdF8gYG5hbWVgLCBhcyBkZXRlcm1pbmVkIGJ5XG4gICAqIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RUeXBlT2YoJ3RlYScsICdudW1iZXInLCAnc3RyaW5ncyBhcmUgbm90IG51bWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgbm90VHlwZU9mXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlb2YgbmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90VHlwZU9mID0gZnVuY3Rpb24gKHZhbCwgdHlwZSwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0Lm5vdFR5cGVPZiwgdHJ1ZSkudG8ubm90LmJlLmEodHlwZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaW5zdGFuY2VPZihvYmplY3QsIGNvbnN0cnVjdG9yLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGFuIGluc3RhbmNlIG9mIGBjb25zdHJ1Y3RvcmAuXG4gICAqXG4gICAqICAgICB2YXIgVGVhID0gZnVuY3Rpb24gKG5hbWUpIHsgdGhpcy5uYW1lID0gbmFtZTsgfVxuICAgKiAgICAgICAsIGNoYWkgPSBuZXcgVGVhKCdjaGFpJyk7XG4gICAqXG4gICAqICAgICBhc3NlcnQuaW5zdGFuY2VPZihjaGFpLCBUZWEsICdjaGFpIGlzIGFuIGluc3RhbmNlIG9mIHRlYScpO1xuICAgKlxuICAgKiBAbmFtZSBpbnN0YW5jZU9mXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtDb25zdHJ1Y3Rvcn0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lmluc3RhbmNlT2YgPSBmdW5jdGlvbiAodmFsLCB0eXBlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaW5zdGFuY2VPZiwgdHJ1ZSkudG8uYmUuaW5zdGFuY2VPZih0eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RJbnN0YW5jZU9mKG9iamVjdCwgY29uc3RydWN0b3IsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyBgdmFsdWVgIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBgY29uc3RydWN0b3JgLlxuICAgKlxuICAgKiAgICAgdmFyIFRlYSA9IGZ1bmN0aW9uIChuYW1lKSB7IHRoaXMubmFtZSA9IG5hbWU7IH1cbiAgICogICAgICAgLCBjaGFpID0gbmV3IFN0cmluZygnY2hhaScpO1xuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdEluc3RhbmNlT2YoY2hhaSwgVGVhLCAnY2hhaSBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgdGVhJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdEluc3RhbmNlT2ZcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge0NvbnN0cnVjdG9yfSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90SW5zdGFuY2VPZiA9IGZ1bmN0aW9uICh2YWwsIHR5cGUsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5ub3RJbnN0YW5jZU9mLCB0cnVlKVxuICAgICAgLnRvLm5vdC5iZS5pbnN0YW5jZU9mKHR5cGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmluY2x1ZGUoaGF5c3RhY2ssIG5lZWRsZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYGhheXN0YWNrYCBpbmNsdWRlcyBgbmVlZGxlYC4gQ2FuIGJlIHVzZWQgdG8gYXNzZXJ0IHRoZVxuICAgKiBpbmNsdXNpb24gb2YgYSB2YWx1ZSBpbiBhbiBhcnJheSwgYSBzdWJzdHJpbmcgaW4gYSBzdHJpbmcsIG9yIGEgc3Vic2V0IG9mXG4gICAqIHByb3BlcnRpZXMgaW4gYW4gb2JqZWN0LlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmluY2x1ZGUoWzEsMiwzXSwgMiwgJ2FycmF5IGNvbnRhaW5zIHZhbHVlJyk7XG4gICAqICAgICBhc3NlcnQuaW5jbHVkZSgnZm9vYmFyJywgJ2ZvbycsICdzdHJpbmcgY29udGFpbnMgc3Vic3RyaW5nJyk7XG4gICAqICAgICBhc3NlcnQuaW5jbHVkZSh7IGZvbzogJ2JhcicsIGhlbGxvOiAndW5pdmVyc2UnIH0sIHsgZm9vOiAnYmFyJyB9LCAnb2JqZWN0IGNvbnRhaW5zIHByb3BlcnR5Jyk7XG4gICAqXG4gICAqIFN0cmljdCBlcXVhbGl0eSAoPT09KSBpcyB1c2VkLiBXaGVuIGFzc2VydGluZyB0aGUgaW5jbHVzaW9uIG9mIGEgdmFsdWUgaW5cbiAgICogYW4gYXJyYXksIHRoZSBhcnJheSBpcyBzZWFyY2hlZCBmb3IgYW4gZWxlbWVudCB0aGF0J3Mgc3RyaWN0bHkgZXF1YWwgdG8gdGhlXG4gICAqIGdpdmVuIHZhbHVlLiBXaGVuIGFzc2VydGluZyBhIHN1YnNldCBvZiBwcm9wZXJ0aWVzIGluIGFuIG9iamVjdCwgdGhlIG9iamVjdFxuICAgKiBpcyBzZWFyY2hlZCBmb3IgdGhlIGdpdmVuIHByb3BlcnR5IGtleXMsIGNoZWNraW5nIHRoYXQgZWFjaCBvbmUgaXMgcHJlc2VudFxuICAgKiBhbmQgc3RyaWN0eSBlcXVhbCB0byB0aGUgZ2l2ZW4gcHJvcGVydHkgdmFsdWUuIEZvciBpbnN0YW5jZTpcbiAgICpcbiAgICogICAgIHZhciBvYmoxID0ge2E6IDF9XG4gICAqICAgICAgICwgb2JqMiA9IHtiOiAyfTtcbiAgICogICAgIGFzc2VydC5pbmNsdWRlKFtvYmoxLCBvYmoyXSwgb2JqMSk7XG4gICAqICAgICBhc3NlcnQuaW5jbHVkZSh7Zm9vOiBvYmoxLCBiYXI6IG9iajJ9LCB7Zm9vOiBvYmoxfSk7XG4gICAqICAgICBhc3NlcnQuaW5jbHVkZSh7Zm9vOiBvYmoxLCBiYXI6IG9iajJ9LCB7Zm9vOiBvYmoxLCBiYXI6IG9iajJ9KTtcbiAgICpcbiAgICogQG5hbWUgaW5jbHVkZVxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaGF5c3RhY2tcbiAgICogQHBhcmFtIHtNaXhlZH0gbmVlZGxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pbmNsdWRlID0gZnVuY3Rpb24gKGV4cCwgaW5jLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQuaW5jbHVkZSwgdHJ1ZSkuaW5jbHVkZShpbmMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdEluY2x1ZGUoaGF5c3RhY2ssIG5lZWRsZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYGhheXN0YWNrYCBkb2VzIG5vdCBpbmNsdWRlIGBuZWVkbGVgLiBDYW4gYmUgdXNlZCB0byBhc3NlcnRcbiAgICogdGhlIGFic2VuY2Ugb2YgYSB2YWx1ZSBpbiBhbiBhcnJheSwgYSBzdWJzdHJpbmcgaW4gYSBzdHJpbmcsIG9yIGEgc3Vic2V0IG9mXG4gICAqIHByb3BlcnRpZXMgaW4gYW4gb2JqZWN0LlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdEluY2x1ZGUoWzEsMiwzXSwgNCwgJ2FycmF5IGRvZXNuJ3QgY29udGFpbiB2YWx1ZScpO1xuICAgKiAgICAgYXNzZXJ0Lm5vdEluY2x1ZGUoJ2Zvb2JhcicsICdiYXonLCAnc3RyaW5nIGRvZXNuJ3QgY29udGFpbiBzdWJzdHJpbmcnKTtcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlKHsgZm9vOiAnYmFyJywgaGVsbG86ICd1bml2ZXJzZScgfSwgeyBmb286ICdiYXonIH0sICdvYmplY3QgZG9lc24ndCBjb250YWluIHByb3BlcnR5Jyk7XG4gICAqXG4gICAqIFN0cmljdCBlcXVhbGl0eSAoPT09KSBpcyB1c2VkLiBXaGVuIGFzc2VydGluZyB0aGUgYWJzZW5jZSBvZiBhIHZhbHVlIGluIGFuXG4gICAqIGFycmF5LCB0aGUgYXJyYXkgaXMgc2VhcmNoZWQgdG8gY29uZmlybSB0aGUgYWJzZW5jZSBvZiBhbiBlbGVtZW50IHRoYXQnc1xuICAgKiBzdHJpY3RseSBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuIFdoZW4gYXNzZXJ0aW5nIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW5cbiAgICogYW4gb2JqZWN0LCB0aGUgb2JqZWN0IGlzIHNlYXJjaGVkIHRvIGNvbmZpcm0gdGhhdCBhdCBsZWFzdCBvbmUgb2YgdGhlIGdpdmVuXG4gICAqIHByb3BlcnR5IGtleXMgaXMgZWl0aGVyIG5vdCBwcmVzZW50IG9yIG5vdCBzdHJpY3RseSBlcXVhbCB0byB0aGUgZ2l2ZW5cbiAgICogcHJvcGVydHkgdmFsdWUuIEZvciBpbnN0YW5jZTpcbiAgICpcbiAgICogICAgIHZhciBvYmoxID0ge2E6IDF9XG4gICAqICAgICAgICwgb2JqMiA9IHtiOiAyfTtcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlKFtvYmoxLCBvYmoyXSwge2E6IDF9KTtcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlKHtmb286IG9iajEsIGJhcjogb2JqMn0sIHtmb286IHthOiAxfX0pO1xuICAgKiAgICAgYXNzZXJ0Lm5vdEluY2x1ZGUoe2Zvbzogb2JqMSwgYmFyOiBvYmoyfSwge2Zvbzogb2JqMSwgYmFyOiB7YjogMn19KTtcbiAgICpcbiAgICogQG5hbWUgbm90SW5jbHVkZVxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaGF5c3RhY2tcbiAgICogQHBhcmFtIHtNaXhlZH0gbmVlZGxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RJbmNsdWRlID0gZnVuY3Rpb24gKGV4cCwgaW5jLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90SW5jbHVkZSwgdHJ1ZSkubm90LmluY2x1ZGUoaW5jKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5kZWVwSW5jbHVkZShoYXlzdGFjaywgbmVlZGxlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgaGF5c3RhY2tgIGluY2x1ZGVzIGBuZWVkbGVgLiBDYW4gYmUgdXNlZCB0byBhc3NlcnQgdGhlXG4gICAqIGluY2x1c2lvbiBvZiBhIHZhbHVlIGluIGFuIGFycmF5IG9yIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW4gYW4gb2JqZWN0LlxuICAgKiBEZWVwIGVxdWFsaXR5IGlzIHVzZWQuXG4gICAqXG4gICAqICAgICB2YXIgb2JqMSA9IHthOiAxfVxuICAgKiAgICAgICAsIG9iajIgPSB7YjogMn07XG4gICAqICAgICBhc3NlcnQuZGVlcEluY2x1ZGUoW29iajEsIG9iajJdLCB7YTogMX0pO1xuICAgKiAgICAgYXNzZXJ0LmRlZXBJbmNsdWRlKHtmb286IG9iajEsIGJhcjogb2JqMn0sIHtmb286IHthOiAxfX0pO1xuICAgKiAgICAgYXNzZXJ0LmRlZXBJbmNsdWRlKHtmb286IG9iajEsIGJhcjogb2JqMn0sIHtmb286IHthOiAxfSwgYmFyOiB7YjogMn19KTtcbiAgICpcbiAgICogQG5hbWUgZGVlcEluY2x1ZGVcbiAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGhheXN0YWNrXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG5lZWRsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZGVlcEluY2x1ZGUgPSBmdW5jdGlvbiAoZXhwLCBpbmMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5kZWVwSW5jbHVkZSwgdHJ1ZSkuZGVlcC5pbmNsdWRlKGluYyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90RGVlcEluY2x1ZGUoaGF5c3RhY2ssIG5lZWRsZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYGhheXN0YWNrYCBkb2VzIG5vdCBpbmNsdWRlIGBuZWVkbGVgLiBDYW4gYmUgdXNlZCB0byBhc3NlcnRcbiAgICogdGhlIGFic2VuY2Ugb2YgYSB2YWx1ZSBpbiBhbiBhcnJheSBvciBhIHN1YnNldCBvZiBwcm9wZXJ0aWVzIGluIGFuIG9iamVjdC5cbiAgICogRGVlcCBlcXVhbGl0eSBpcyB1c2VkLlxuICAgKlxuICAgKiAgICAgdmFyIG9iajEgPSB7YTogMX1cbiAgICogICAgICAgLCBvYmoyID0ge2I6IDJ9O1xuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBJbmNsdWRlKFtvYmoxLCBvYmoyXSwge2E6IDl9KTtcbiAgICogICAgIGFzc2VydC5ub3REZWVwSW5jbHVkZSh7Zm9vOiBvYmoxLCBiYXI6IG9iajJ9LCB7Zm9vOiB7YTogOX19KTtcbiAgICogICAgIGFzc2VydC5ub3REZWVwSW5jbHVkZSh7Zm9vOiBvYmoxLCBiYXI6IG9iajJ9LCB7Zm9vOiB7YTogMX0sIGJhcjoge2I6IDl9fSk7XG4gICAqXG4gICAqIEBuYW1lIG5vdERlZXBJbmNsdWRlXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBoYXlzdGFja1xuICAgKiBAcGFyYW0ge01peGVkfSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdERlZXBJbmNsdWRlID0gZnVuY3Rpb24gKGV4cCwgaW5jLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90RGVlcEluY2x1ZGUsIHRydWUpLm5vdC5kZWVwLmluY2x1ZGUoaW5jKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5uZXN0ZWRJbmNsdWRlKGhheXN0YWNrLCBuZWVkbGUsIFttZXNzYWdlXSlcbiAgICogXG4gICAqIEFzc2VydHMgdGhhdCAnaGF5c3RhY2snIGluY2x1ZGVzICduZWVkbGUnLiBcbiAgICogQ2FuIGJlIHVzZWQgdG8gYXNzZXJ0IHRoZSBpbmNsdXNpb24gb2YgYSBzdWJzZXQgb2YgcHJvcGVydGllcyBpbiBhbiBcbiAgICogb2JqZWN0LlxuICAgKiBFbmFibGVzIHRoZSB1c2Ugb2YgZG90LSBhbmQgYnJhY2tldC1ub3RhdGlvbiBmb3IgcmVmZXJlbmNpbmcgbmVzdGVkIFxuICAgKiBwcm9wZXJ0aWVzLlxuICAgKiAnW10nIGFuZCAnLicgaW4gcHJvcGVydHkgbmFtZXMgY2FuIGJlIGVzY2FwZWQgdXNpbmcgZG91YmxlIGJhY2tzbGFzaGVzLlxuICAgKiBcbiAgICogICAgIGFzc2VydC5uZXN0ZWRJbmNsdWRlKHsnLmEnOiB7J2InOiAneCd9fSwgeydcXFxcLmEuW2JdJzogJ3gnfSk7XG4gICAqICAgICBhc3NlcnQubmVzdGVkSW5jbHVkZSh7J2EnOiB7J1tiXSc6ICd4J319LCB7J2EuXFxcXFtiXFxcXF0nOiAneCd9KTtcbiAgICogXG4gICAqIEBuYW1lIG5lc3RlZEluY2x1ZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGhheXN0YWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWMgXG4gICAqLyBcblxuICBhc3NlcnQubmVzdGVkSW5jbHVkZSA9IGZ1bmN0aW9uIChleHAsIGluYywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm5lc3RlZEluY2x1ZGUsIHRydWUpLm5lc3RlZC5pbmNsdWRlKGluYyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90TmVzdGVkSW5jbHVkZShoYXlzdGFjaywgbmVlZGxlLCBbbWVzc2FnZV0pXG4gICAqIFxuICAgKiBBc3NlcnRzIHRoYXQgJ2hheXN0YWNrJyBkb2VzIG5vdCBpbmNsdWRlICduZWVkbGUnLiBcbiAgICogQ2FuIGJlIHVzZWQgdG8gYXNzZXJ0IHRoZSBhYnNlbmNlIG9mIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW4gYW4gXG4gICAqIG9iamVjdC5cbiAgICogRW5hYmxlcyB0aGUgdXNlIG9mIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gZm9yIHJlZmVyZW5jaW5nIG5lc3RlZCBcbiAgICogcHJvcGVydGllcy4gXG4gICAqICdbXScgYW5kICcuJyBpbiBwcm9wZXJ0eSBuYW1lcyBjYW4gYmUgZXNjYXBlZCB1c2luZyBkb3VibGUgYmFja3NsYXNoZXMuXG4gICAqIFxuICAgKiAgICAgYXNzZXJ0Lm5vdE5lc3RlZEluY2x1ZGUoeycuYSc6IHsnYic6ICd4J319LCB7J1xcXFwuYS5iJzogJ3knfSk7XG4gICAqICAgICBhc3NlcnQubm90TmVzdGVkSW5jbHVkZSh7J2EnOiB7J1tiXSc6ICd4J319LCB7J2EuXFxcXFtiXFxcXF0nOiAneSd9KTtcbiAgICogXG4gICAqIEBuYW1lIG5vdE5lc3RlZEluY2x1ZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGhheXN0YWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWMgXG4gICAqLyBcblxuICBhc3NlcnQubm90TmVzdGVkSW5jbHVkZSA9IGZ1bmN0aW9uIChleHAsIGluYywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm5vdE5lc3RlZEluY2x1ZGUsIHRydWUpXG4gICAgICAubm90Lm5lc3RlZC5pbmNsdWRlKGluYyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZGVlcE5lc3RlZEluY2x1ZGUoaGF5c3RhY2ssIG5lZWRsZSwgW21lc3NhZ2VdKVxuICAgKiBcbiAgICogQXNzZXJ0cyB0aGF0ICdoYXlzdGFjaycgaW5jbHVkZXMgJ25lZWRsZScuXG4gICAqIENhbiBiZSB1c2VkIHRvIGFzc2VydCB0aGUgaW5jbHVzaW9uIG9mIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW4gYW4gXG4gICAqIG9iamVjdCB3aGlsZSBjaGVja2luZyBmb3IgZGVlcCBlcXVhbGl0eS5cbiAgICogRW5hYmxlcyB0aGUgdXNlIG9mIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gZm9yIHJlZmVyZW5jaW5nIG5lc3RlZCBcbiAgICogcHJvcGVydGllcy5cbiAgICogJ1tdJyBhbmQgJy4nIGluIHByb3BlcnR5IG5hbWVzIGNhbiBiZSBlc2NhcGVkIHVzaW5nIGRvdWJsZSBiYWNrc2xhc2hlcy5cbiAgICogXG4gICAqICAgICBhc3NlcnQuZGVlcE5lc3RlZEluY2x1ZGUoe2E6IHtiOiBbe3g6IDF9XX19LCB7J2EuYlswXSc6IHt4OiAxfX0pO1xuICAgKiAgICAgYXNzZXJ0LmRlZXBOZXN0ZWRJbmNsdWRlKHsnLmEnOiB7J1tiXSc6IHt4OiAxfX19LCB7J1xcXFwuYS5cXFxcW2JcXFxcXSc6IHt4OiAxfX0pO1xuICAgKiAgICBcbiAgICogQG5hbWUgZGVlcE5lc3RlZEluY2x1ZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGhheXN0YWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWMgXG4gICAqL1xuXG4gIGFzc2VydC5kZWVwTmVzdGVkSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQuZGVlcE5lc3RlZEluY2x1ZGUsIHRydWUpXG4gICAgICAuZGVlcC5uZXN0ZWQuaW5jbHVkZShpbmMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdERlZXBOZXN0ZWRJbmNsdWRlKGhheXN0YWNrLCBuZWVkbGUsIFttZXNzYWdlXSlcbiAgICogXG4gICAqIEFzc2VydHMgdGhhdCAnaGF5c3RhY2snIGRvZXMgbm90IGluY2x1ZGUgJ25lZWRsZScuXG4gICAqIENhbiBiZSB1c2VkIHRvIGFzc2VydCB0aGUgYWJzZW5jZSBvZiBhIHN1YnNldCBvZiBwcm9wZXJ0aWVzIGluIGFuIFxuICAgKiBvYmplY3Qgd2hpbGUgY2hlY2tpbmcgZm9yIGRlZXAgZXF1YWxpdHkuXG4gICAqIEVuYWJsZXMgdGhlIHVzZSBvZiBkb3QtIGFuZCBicmFja2V0LW5vdGF0aW9uIGZvciByZWZlcmVuY2luZyBuZXN0ZWQgXG4gICAqIHByb3BlcnRpZXMuXG4gICAqICdbXScgYW5kICcuJyBpbiBwcm9wZXJ0eSBuYW1lcyBjYW4gYmUgZXNjYXBlZCB1c2luZyBkb3VibGUgYmFja3NsYXNoZXMuXG4gICAqIFxuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBOZXN0ZWRJbmNsdWRlKHthOiB7YjogW3t4OiAxfV19fSwgeydhLmJbMF0nOiB7eTogMX19KVxuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBOZXN0ZWRJbmNsdWRlKHsnLmEnOiB7J1tiXSc6IHt4OiAxfX19LCB7J1xcXFwuYS5cXFxcW2JcXFxcXSc6IHt5OiAyfX0pO1xuICAgKiAgICBcbiAgICogQG5hbWUgbm90RGVlcE5lc3RlZEluY2x1ZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGhheXN0YWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWMgXG4gICAqL1xuXG4gIGFzc2VydC5ub3REZWVwTmVzdGVkSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90RGVlcE5lc3RlZEluY2x1ZGUsIHRydWUpXG4gICAgICAubm90LmRlZXAubmVzdGVkLmluY2x1ZGUoaW5jKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5vd25JbmNsdWRlKGhheXN0YWNrLCBuZWVkbGUsIFttZXNzYWdlXSlcbiAgICogXG4gICAqIEFzc2VydHMgdGhhdCAnaGF5c3RhY2snIGluY2x1ZGVzICduZWVkbGUnLlxuICAgKiBDYW4gYmUgdXNlZCB0byBhc3NlcnQgdGhlIGluY2x1c2lvbiBvZiBhIHN1YnNldCBvZiBwcm9wZXJ0aWVzIGluIGFuIFxuICAgKiBvYmplY3Qgd2hpbGUgaWdub3JpbmcgaW5oZXJpdGVkIHByb3BlcnRpZXMuXG4gICAqIFxuICAgKiAgICAgYXNzZXJ0Lm93bkluY2x1ZGUoeyBhOiAxIH0sIHsgYTogMSB9KTtcbiAgICogXG4gICAqIEBuYW1lIG93bkluY2x1ZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGhheXN0YWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm93bkluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm93bkluY2x1ZGUsIHRydWUpLm93bi5pbmNsdWRlKGluYyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90T3duSW5jbHVkZShoYXlzdGFjaywgbmVlZGxlLCBbbWVzc2FnZV0pXG4gICAqIFxuICAgKiBBc3NlcnRzIHRoYXQgJ2hheXN0YWNrJyBpbmNsdWRlcyAnbmVlZGxlJy5cbiAgICogQ2FuIGJlIHVzZWQgdG8gYXNzZXJ0IHRoZSBhYnNlbmNlIG9mIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW4gYW4gXG4gICAqIG9iamVjdCB3aGlsZSBpZ25vcmluZyBpbmhlcml0ZWQgcHJvcGVydGllcy5cbiAgICogXG4gICAqICAgICBPYmplY3QucHJvdG90eXBlLmIgPSAyO1xuICAgKiBcbiAgICogICAgIGFzc2VydC5ub3RPd25JbmNsdWRlKHsgYTogMSB9LCB7IGI6IDIgfSk7XG4gICAqIFxuICAgKiBAbmFtZSBub3RPd25JbmNsdWRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBoYXlzdGFja1xuICAgKiBAcGFyYW0ge09iamVjdH0gbmVlZGxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RPd25JbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5ub3RPd25JbmNsdWRlLCB0cnVlKS5ub3Qub3duLmluY2x1ZGUoaW5jKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5kZWVwT3duSW5jbHVkZShoYXlzdGFjaywgbmVlZGxlLCBbbWVzc2FnZV0pXG4gICAqIFxuICAgKiBBc3NlcnRzIHRoYXQgJ2hheXN0YWNrJyBpbmNsdWRlcyAnbmVlZGxlJy5cbiAgICogQ2FuIGJlIHVzZWQgdG8gYXNzZXJ0IHRoZSBpbmNsdXNpb24gb2YgYSBzdWJzZXQgb2YgcHJvcGVydGllcyBpbiBhbiBcbiAgICogb2JqZWN0IHdoaWxlIGlnbm9yaW5nIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGFuZCBjaGVja2luZyBmb3IgZGVlcCBlcXVhbGl0eS5cbiAgICogXG4gICAqICAgICAgYXNzZXJ0LmRlZXBPd25JbmNsdWRlKHthOiB7YjogMn19LCB7YToge2I6IDJ9fSk7XG4gICAqICAgICAgXG4gICAqIEBuYW1lIGRlZXBPd25JbmNsdWRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBoYXlzdGFja1xuICAgKiBAcGFyYW0ge09iamVjdH0gbmVlZGxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kZWVwT3duSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQuZGVlcE93bkluY2x1ZGUsIHRydWUpXG4gICAgICAuZGVlcC5vd24uaW5jbHVkZShpbmMpO1xuICB9O1xuXG4gICAvKipcbiAgICogIyMjIC5ub3REZWVwT3duSW5jbHVkZShoYXlzdGFjaywgbmVlZGxlLCBbbWVzc2FnZV0pXG4gICAqIFxuICAgKiBBc3NlcnRzIHRoYXQgJ2hheXN0YWNrJyBpbmNsdWRlcyAnbmVlZGxlJy5cbiAgICogQ2FuIGJlIHVzZWQgdG8gYXNzZXJ0IHRoZSBhYnNlbmNlIG9mIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW4gYW4gXG4gICAqIG9iamVjdCB3aGlsZSBpZ25vcmluZyBpbmhlcml0ZWQgcHJvcGVydGllcyBhbmQgY2hlY2tpbmcgZm9yIGRlZXAgZXF1YWxpdHkuXG4gICAqIFxuICAgKiAgICAgIGFzc2VydC5ub3REZWVwT3duSW5jbHVkZSh7YToge2I6IDJ9fSwge2E6IHtjOiAzfX0pO1xuICAgKiAgICAgIFxuICAgKiBAbmFtZSBub3REZWVwT3duSW5jbHVkZVxuICAgKiBAcGFyYW0ge09iamVjdH0gaGF5c3RhY2tcbiAgICogQHBhcmFtIHtPYmplY3R9IG5lZWRsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90RGVlcE93bkluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm5vdERlZXBPd25JbmNsdWRlLCB0cnVlKVxuICAgICAgLm5vdC5kZWVwLm93bi5pbmNsdWRlKGluYyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubWF0Y2godmFsdWUsIHJlZ2V4cCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBtYXRjaGVzIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gYHJlZ2V4cGAuXG4gICAqXG4gICAqICAgICBhc3NlcnQubWF0Y2goJ2Zvb2JhcicsIC9eZm9vLywgJ3JlZ2V4cCBtYXRjaGVzJyk7XG4gICAqXG4gICAqIEBuYW1lIG1hdGNoXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7UmVnRXhwfSByZWdleHBcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm1hdGNoID0gZnVuY3Rpb24gKGV4cCwgcmUsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5tYXRjaCwgdHJ1ZSkudG8ubWF0Y2gocmUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdE1hdGNoKHZhbHVlLCByZWdleHAsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgZG9lcyBub3QgbWF0Y2ggdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBgcmVnZXhwYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RNYXRjaCgnZm9vYmFyJywgL15mb28vLCAncmVnZXhwIGRvZXMgbm90IG1hdGNoJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdE1hdGNoXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7UmVnRXhwfSByZWdleHBcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdE1hdGNoID0gZnVuY3Rpb24gKGV4cCwgcmUsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5ub3RNYXRjaCwgdHJ1ZSkudG8ubm90Lm1hdGNoKHJlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5wcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVkIGJ5XG4gICAqIGBwcm9wZXJ0eWAuXG4gICAqXG4gICAqICAgICBhc3NlcnQucHJvcGVydHkoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAndGVhJyk7XG4gICAqICAgICBhc3NlcnQucHJvcGVydHkoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAndG9TdHJpbmcnKTtcbiAgICpcbiAgICogQG5hbWUgcHJvcGVydHlcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LnByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LnByb3BlcnR5LCB0cnVlKS50by5oYXZlLnByb3BlcnR5KHByb3ApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFByb3BlcnR5KG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGRvZXMgX25vdF8gaGF2ZSBhIGRpcmVjdCBvciBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZWRcbiAgICogYnkgYHByb3BlcnR5YC5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RQcm9wZXJ0eSh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfX0sICdjb2ZmZWUnKTtcbiAgICpcbiAgICogQG5hbWUgbm90UHJvcGVydHlcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdFByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm5vdFByb3BlcnR5LCB0cnVlKVxuICAgICAgLnRvLm5vdC5oYXZlLnByb3BlcnR5KHByb3ApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLnByb3BlcnR5VmFsKG9iamVjdCwgcHJvcGVydHksIHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVkIGJ5XG4gICAqIGBwcm9wZXJ0eWAgd2l0aCBhIHZhbHVlIGdpdmVuIGJ5IGB2YWx1ZWAuIFVzZXMgYSBzdHJpY3QgZXF1YWxpdHkgY2hlY2tcbiAgICogKD09PSkuXG4gICAqXG4gICAqICAgICBhc3NlcnQucHJvcGVydHlWYWwoeyB0ZWE6ICdpcyBnb29kJyB9LCAndGVhJywgJ2lzIGdvb2QnKTtcbiAgICpcbiAgICogQG5hbWUgcHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LnByb3BlcnR5VmFsID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQucHJvcGVydHlWYWwsIHRydWUpXG4gICAgICAudG8uaGF2ZS5wcm9wZXJ0eShwcm9wLCB2YWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFByb3BlcnR5VmFsKG9iamVjdCwgcHJvcGVydHksIHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBkb2VzIF9ub3RfIGhhdmUgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVkXG4gICAqIGJ5IGBwcm9wZXJ0eWAgd2l0aCB2YWx1ZSBnaXZlbiBieSBgdmFsdWVgLiBVc2VzIGEgc3RyaWN0IGVxdWFsaXR5IGNoZWNrXG4gICAqICg9PT0pLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdFByb3BlcnR5VmFsKHsgdGVhOiAnaXMgZ29vZCcgfSwgJ3RlYScsICdpcyBiYWQnKTtcbiAgICogICAgIGFzc2VydC5ub3RQcm9wZXJ0eVZhbCh7IHRlYTogJ2lzIGdvb2QnIH0sICdjb2ZmZWUnLCAnaXMgZ29vZCcpO1xuICAgKlxuICAgKiBAbmFtZSBub3RQcm9wZXJ0eVZhbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90UHJvcGVydHlWYWwgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5ub3RQcm9wZXJ0eVZhbCwgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5wcm9wZXJ0eShwcm9wLCB2YWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBQcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lZCBieVxuICAgKiBgcHJvcGVydHlgIHdpdGggYSB2YWx1ZSBnaXZlbiBieSBgdmFsdWVgLiBVc2VzIGEgZGVlcCBlcXVhbGl0eSBjaGVjay5cbiAgICpcbiAgICogICAgIGFzc2VydC5kZWVwUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH0gfSwgJ3RlYScsIHsgZ3JlZW46ICdtYXRjaGEnIH0pO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwUHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlZXBQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmRlZXBQcm9wZXJ0eVZhbCwgdHJ1ZSlcbiAgICAgIC50by5oYXZlLmRlZXAucHJvcGVydHkocHJvcCwgdmFsKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3REZWVwUHJvcGVydHlWYWwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGRvZXMgX25vdF8gaGF2ZSBhIGRpcmVjdCBvciBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZWRcbiAgICogYnkgYHByb3BlcnR5YCB3aXRoIHZhbHVlIGdpdmVuIGJ5IGB2YWx1ZWAuIFVzZXMgYSBkZWVwIGVxdWFsaXR5IGNoZWNrLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBQcm9wZXJ0eVZhbCh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfSB9LCAndGVhJywgeyBibGFjazogJ21hdGNoYScgfSk7XG4gICAqICAgICBhc3NlcnQubm90RGVlcFByb3BlcnR5VmFsKHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9IH0sICd0ZWEnLCB7IGdyZWVuOiAnb29sb25nJyB9KTtcbiAgICogICAgIGFzc2VydC5ub3REZWVwUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH0gfSwgJ2NvZmZlZScsIHsgZ3JlZW46ICdtYXRjaGEnIH0pO1xuICAgKlxuICAgKiBAbmFtZSBub3REZWVwUHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdERlZXBQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm5vdERlZXBQcm9wZXJ0eVZhbCwgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5kZWVwLnByb3BlcnR5KHByb3AsIHZhbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAub3duUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgZGlyZWN0IHByb3BlcnR5IG5hbWVkIGJ5IGBwcm9wZXJ0eWAuIEluaGVyaXRlZFxuICAgKiBwcm9wZXJ0aWVzIGFyZW4ndCBjaGVja2VkLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm93blByb3BlcnR5KHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9fSwgJ3RlYScpO1xuICAgKlxuICAgKiBAbmFtZSBvd25Qcm9wZXJ0eVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQub3duUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQub3duUHJvcGVydHksIHRydWUpXG4gICAgICAudG8uaGF2ZS5vd24ucHJvcGVydHkocHJvcCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90T3duUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgZG9lcyBfbm90XyBoYXZlIGEgZGlyZWN0IHByb3BlcnR5IG5hbWVkIGJ5XG4gICAqIGBwcm9wZXJ0eWAuIEluaGVyaXRlZCBwcm9wZXJ0aWVzIGFyZW4ndCBjaGVja2VkLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdE93blByb3BlcnR5KHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9fSwgJ2NvZmZlZScpO1xuICAgKiAgICAgYXNzZXJ0Lm5vdE93blByb3BlcnR5KHt9LCAndG9TdHJpbmcnKTtcbiAgICpcbiAgICogQG5hbWUgbm90T3duUHJvcGVydHlcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdE93blByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm5vdE93blByb3BlcnR5LCB0cnVlKVxuICAgICAgLnRvLm5vdC5oYXZlLm93bi5wcm9wZXJ0eShwcm9wKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5vd25Qcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgZGlyZWN0IHByb3BlcnR5IG5hbWVkIGJ5IGBwcm9wZXJ0eWAgYW5kIGEgdmFsdWVcbiAgICogZXF1YWwgdG8gdGhlIHByb3ZpZGVkIGB2YWx1ZWAuIFVzZXMgYSBzdHJpY3QgZXF1YWxpdHkgY2hlY2sgKD09PSkuXG4gICAqIEluaGVyaXRlZCBwcm9wZXJ0aWVzIGFyZW4ndCBjaGVja2VkLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm93blByb3BlcnR5VmFsKHsgY29mZmVlOiAnaXMgZ29vZCd9LCAnY29mZmVlJywgJ2lzIGdvb2QnKTtcbiAgICpcbiAgICogQG5hbWUgb3duUHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm93blByb3BlcnR5VmFsID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsdWUsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5vd25Qcm9wZXJ0eVZhbCwgdHJ1ZSlcbiAgICAgIC50by5oYXZlLm93bi5wcm9wZXJ0eShwcm9wLCB2YWx1ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90T3duUHJvcGVydHlWYWwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGRvZXMgX25vdF8gaGF2ZSBhIGRpcmVjdCBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgXG4gICAqIHdpdGggYSB2YWx1ZSBlcXVhbCB0byB0aGUgcHJvdmlkZWQgYHZhbHVlYC4gVXNlcyBhIHN0cmljdCBlcXVhbGl0eSBjaGVja1xuICAgKiAoPT09KS4gSW5oZXJpdGVkIHByb3BlcnRpZXMgYXJlbid0IGNoZWNrZWQuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90T3duUHJvcGVydHlWYWwoeyB0ZWE6ICdpcyBiZXR0ZXInfSwgJ3RlYScsICdpcyB3b3JzZScpO1xuICAgKiAgICAgYXNzZXJ0Lm5vdE93blByb3BlcnR5VmFsKHt9LCAndG9TdHJpbmcnLCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKTtcbiAgICpcbiAgICogQG5hbWUgbm90T3duUHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdE93blByb3BlcnR5VmFsID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsdWUsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5ub3RPd25Qcm9wZXJ0eVZhbCwgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5vd24ucHJvcGVydHkocHJvcCwgdmFsdWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBPd25Qcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgZGlyZWN0IHByb3BlcnR5IG5hbWVkIGJ5IGBwcm9wZXJ0eWAgYW5kIGEgdmFsdWVcbiAgICogZXF1YWwgdG8gdGhlIHByb3ZpZGVkIGB2YWx1ZWAuIFVzZXMgYSBkZWVwIGVxdWFsaXR5IGNoZWNrLiBJbmhlcml0ZWRcbiAgICogcHJvcGVydGllcyBhcmVuJ3QgY2hlY2tlZC5cbiAgICpcbiAgICogICAgIGFzc2VydC5kZWVwT3duUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH0gfSwgJ3RlYScsIHsgZ3JlZW46ICdtYXRjaGEnIH0pO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwT3duUHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlZXBPd25Qcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbHVlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuZGVlcE93blByb3BlcnR5VmFsLCB0cnVlKVxuICAgICAgLnRvLmhhdmUuZGVlcC5vd24ucHJvcGVydHkocHJvcCwgdmFsdWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdERlZXBPd25Qcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgZG9lcyBfbm90XyBoYXZlIGEgZGlyZWN0IHByb3BlcnR5IG5hbWVkIGJ5IGBwcm9wZXJ0eWBcbiAgICogd2l0aCBhIHZhbHVlIGVxdWFsIHRvIHRoZSBwcm92aWRlZCBgdmFsdWVgLiBVc2VzIGEgZGVlcCBlcXVhbGl0eSBjaGVjay5cbiAgICogSW5oZXJpdGVkIHByb3BlcnRpZXMgYXJlbid0IGNoZWNrZWQuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90RGVlcE93blByb3BlcnR5VmFsKHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9IH0sICd0ZWEnLCB7IGJsYWNrOiAnbWF0Y2hhJyB9KTtcbiAgICogICAgIGFzc2VydC5ub3REZWVwT3duUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH0gfSwgJ3RlYScsIHsgZ3JlZW46ICdvb2xvbmcnIH0pO1xuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBPd25Qcm9wZXJ0eVZhbCh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfSB9LCAnY29mZmVlJywgeyBncmVlbjogJ21hdGNoYScgfSk7XG4gICAqICAgICBhc3NlcnQubm90RGVlcE93blByb3BlcnR5VmFsKHt9LCAndG9TdHJpbmcnLCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKTtcbiAgICpcbiAgICogQG5hbWUgbm90RGVlcE93blByb3BlcnR5VmFsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3REZWVwT3duUHJvcGVydHlWYWwgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCB2YWx1ZSwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm5vdERlZXBPd25Qcm9wZXJ0eVZhbCwgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5kZWVwLm93bi5wcm9wZXJ0eShwcm9wLCB2YWx1ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubmVzdGVkUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lZCBieVxuICAgKiBgcHJvcGVydHlgLCB3aGljaCBjYW4gYmUgYSBzdHJpbmcgdXNpbmcgZG90LSBhbmQgYnJhY2tldC1ub3RhdGlvbiBmb3JcbiAgICogbmVzdGVkIHJlZmVyZW5jZS5cbiAgICpcbiAgICogICAgIGFzc2VydC5uZXN0ZWRQcm9wZXJ0eSh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfX0sICd0ZWEuZ3JlZW4nKTtcbiAgICpcbiAgICogQG5hbWUgbmVzdGVkUHJvcGVydHlcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5lc3RlZFByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm5lc3RlZFByb3BlcnR5LCB0cnVlKVxuICAgICAgLnRvLmhhdmUubmVzdGVkLnByb3BlcnR5KHByb3ApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdE5lc3RlZFByb3BlcnR5KG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGRvZXMgX25vdF8gaGF2ZSBhIHByb3BlcnR5IG5hbWVkIGJ5IGBwcm9wZXJ0eWAsIHdoaWNoXG4gICAqIGNhbiBiZSBhIHN0cmluZyB1c2luZyBkb3QtIGFuZCBicmFja2V0LW5vdGF0aW9uIGZvciBuZXN0ZWQgcmVmZXJlbmNlLiBUaGVcbiAgICogcHJvcGVydHkgY2Fubm90IGV4aXN0IG9uIHRoZSBvYmplY3Qgbm9yIGFueXdoZXJlIGluIGl0cyBwcm90b3R5cGUgY2hhaW4uXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90TmVzdGVkUHJvcGVydHkoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAndGVhLm9vbG9uZycpO1xuICAgKlxuICAgKiBAbmFtZSBub3ROZXN0ZWRQcm9wZXJ0eVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90TmVzdGVkUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQubm90TmVzdGVkUHJvcGVydHksIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUubmVzdGVkLnByb3BlcnR5KHByb3ApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5lc3RlZFByb3BlcnR5VmFsKG9iamVjdCwgcHJvcGVydHksIHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgIHdpdGggdmFsdWUgZ2l2ZW5cbiAgICogYnkgYHZhbHVlYC4gYHByb3BlcnR5YCBjYW4gdXNlIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gZm9yIG5lc3RlZFxuICAgKiByZWZlcmVuY2UuIFVzZXMgYSBzdHJpY3QgZXF1YWxpdHkgY2hlY2sgKD09PSkuXG4gICAqXG4gICAqICAgICBhc3NlcnQubmVzdGVkUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAndGVhLmdyZWVuJywgJ21hdGNoYScpO1xuICAgKlxuICAgKiBAbmFtZSBuZXN0ZWRQcm9wZXJ0eVZhbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubmVzdGVkUHJvcGVydHlWYWwgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5uZXN0ZWRQcm9wZXJ0eVZhbCwgdHJ1ZSlcbiAgICAgIC50by5oYXZlLm5lc3RlZC5wcm9wZXJ0eShwcm9wLCB2YWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdE5lc3RlZFByb3BlcnR5VmFsKG9iamVjdCwgcHJvcGVydHksIHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBkb2VzIF9ub3RfIGhhdmUgYSBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgIHdpdGhcbiAgICogdmFsdWUgZ2l2ZW4gYnkgYHZhbHVlYC4gYHByb3BlcnR5YCBjYW4gdXNlIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gZm9yXG4gICAqIG5lc3RlZCByZWZlcmVuY2UuIFVzZXMgYSBzdHJpY3QgZXF1YWxpdHkgY2hlY2sgKD09PSkuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90TmVzdGVkUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAndGVhLmdyZWVuJywgJ2tvbmFjaGEnKTtcbiAgICogICAgIGFzc2VydC5ub3ROZXN0ZWRQcm9wZXJ0eVZhbCh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfX0sICdjb2ZmZWUuZ3JlZW4nLCAnbWF0Y2hhJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdE5lc3RlZFByb3BlcnR5VmFsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3ROZXN0ZWRQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm5vdE5lc3RlZFByb3BlcnR5VmFsLCB0cnVlKVxuICAgICAgLnRvLm5vdC5oYXZlLm5lc3RlZC5wcm9wZXJ0eShwcm9wLCB2YWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBOZXN0ZWRQcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgcHJvcGVydHkgbmFtZWQgYnkgYHByb3BlcnR5YCB3aXRoIGEgdmFsdWUgZ2l2ZW5cbiAgICogYnkgYHZhbHVlYC4gYHByb3BlcnR5YCBjYW4gdXNlIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gZm9yIG5lc3RlZFxuICAgKiByZWZlcmVuY2UuIFVzZXMgYSBkZWVwIGVxdWFsaXR5IGNoZWNrLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmRlZXBOZXN0ZWRQcm9wZXJ0eVZhbCh7IHRlYTogeyBncmVlbjogeyBtYXRjaGE6ICd5dW0nIH0gfSB9LCAndGVhLmdyZWVuJywgeyBtYXRjaGE6ICd5dW0nIH0pO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwTmVzdGVkUHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlZXBOZXN0ZWRQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmRlZXBOZXN0ZWRQcm9wZXJ0eVZhbCwgdHJ1ZSlcbiAgICAgIC50by5oYXZlLmRlZXAubmVzdGVkLnByb3BlcnR5KHByb3AsIHZhbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90RGVlcE5lc3RlZFByb3BlcnR5VmFsKG9iamVjdCwgcHJvcGVydHksIHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBkb2VzIF9ub3RfIGhhdmUgYSBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgIHdpdGhcbiAgICogdmFsdWUgZ2l2ZW4gYnkgYHZhbHVlYC4gYHByb3BlcnR5YCBjYW4gdXNlIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gZm9yXG4gICAqIG5lc3RlZCByZWZlcmVuY2UuIFVzZXMgYSBkZWVwIGVxdWFsaXR5IGNoZWNrLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBOZXN0ZWRQcm9wZXJ0eVZhbCh7IHRlYTogeyBncmVlbjogeyBtYXRjaGE6ICd5dW0nIH0gfSB9LCAndGVhLmdyZWVuJywgeyBvb2xvbmc6ICd5dW0nIH0pO1xuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBOZXN0ZWRQcm9wZXJ0eVZhbCh7IHRlYTogeyBncmVlbjogeyBtYXRjaGE6ICd5dW0nIH0gfSB9LCAndGVhLmdyZWVuJywgeyBtYXRjaGE6ICd5dWNrJyB9KTtcbiAgICogICAgIGFzc2VydC5ub3REZWVwTmVzdGVkUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46IHsgbWF0Y2hhOiAneXVtJyB9IH0gfSwgJ3RlYS5ibGFjaycsIHsgbWF0Y2hhOiAneXVtJyB9KTtcbiAgICpcbiAgICogQG5hbWUgbm90RGVlcE5lc3RlZFByb3BlcnR5VmFsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3REZWVwTmVzdGVkUHJvcGVydHlWYWwgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5ub3REZWVwTmVzdGVkUHJvcGVydHlWYWwsIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUuZGVlcC5uZXN0ZWQucHJvcGVydHkocHJvcCwgdmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmxlbmd0aE9mKG9iamVjdCwgbGVuZ3RoLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBgbGVuZ3RoYCBwcm9wZXJ0eSB3aXRoIHRoZSBleHBlY3RlZCB2YWx1ZS5cbiAgICpcbiAgICogICAgIGFzc2VydC5sZW5ndGhPZihbMSwyLDNdLCAzLCAnYXJyYXkgaGFzIGxlbmd0aCBvZiAzJyk7XG4gICAqICAgICBhc3NlcnQubGVuZ3RoT2YoJ2Zvb2JhcicsIDYsICdzdHJpbmcgaGFzIGxlbmd0aCBvZiA2Jyk7XG4gICAqXG4gICAqIEBuYW1lIGxlbmd0aE9mXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5sZW5ndGhPZiA9IGZ1bmN0aW9uIChleHAsIGxlbiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lmxlbmd0aE9mLCB0cnVlKS50by5oYXZlLmxlbmd0aE9mKGxlbik7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaGFzQW55S2V5cyhvYmplY3QsIFtrZXlzXSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGF0IGxlYXN0IG9uZSBvZiB0aGUgYGtleXNgIHByb3ZpZGVkLlxuICAgKiBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCBvZiBhIGBrZXlzYCBhcnJheSBhbmQgaXRzIGtleXNcbiAgICogd2lsbCBiZSB1c2VkIGFzIHRoZSBleHBlY3RlZCBzZXQgb2Yga2V5cy5cbiAgICpcbiAgICogICAgIGFzc2VydC5oYXNBbnlLZXlzKHtmb286IDEsIGJhcjogMiwgYmF6OiAzfSwgWydmb28nLCAnaURvbnRFeGlzdCcsICdiYXonXSk7XG4gICAqICAgICBhc3NlcnQuaGFzQW55S2V5cyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30sIHtmb286IDMwLCBpRG9udEV4aXN0OiA5OSwgYmF6OiAxMzM3fSk7XG4gICAqICAgICBhc3NlcnQuaGFzQW55S2V5cyhuZXcgTWFwKFtbe2ZvbzogMX0sICdiYXInXSwgWydrZXknLCAndmFsdWUnXV0pLCBbe2ZvbzogMX0sICdrZXknXSk7XG4gICAqICAgICBhc3NlcnQuaGFzQW55S2V5cyhuZXcgU2V0KFt7Zm9vOiAnYmFyJ30sICdhbm90aGVyS2V5J10pLCBbe2ZvbzogJ2Jhcid9LCAnYW5vdGhlcktleSddKTtcbiAgICpcbiAgICogQG5hbWUgaGFzQW55S2V5c1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3RcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGtleXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lmhhc0FueUtleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaGFzQW55S2V5cywgdHJ1ZSkudG8uaGF2ZS5hbnkua2V5cyhrZXlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmhhc0FsbEtleXMob2JqZWN0LCBba2V5c10sIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGhhcyBhbGwgYW5kIG9ubHkgYWxsIG9mIHRoZSBga2V5c2AgcHJvdmlkZWQuXG4gICAqIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgc2luZ2xlIG9iamVjdCBpbnN0ZWFkIG9mIGEgYGtleXNgIGFycmF5IGFuZCBpdHMga2V5c1xuICAgKiB3aWxsIGJlIHVzZWQgYXMgdGhlIGV4cGVjdGVkIHNldCBvZiBrZXlzLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lmhhc0FsbEtleXMoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9LCBbJ2ZvbycsICdiYXInLCAnYmF6J10pO1xuICAgKiAgICAgYXNzZXJ0Lmhhc0FsbEtleXMoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9LCB7Zm9vOiAzMCwgYmFyOiA5OSwgYmF6OiAxMzM3XSk7XG4gICAqICAgICBhc3NlcnQuaGFzQWxsS2V5cyhuZXcgTWFwKFtbe2ZvbzogMX0sICdiYXInXSwgWydrZXknLCAndmFsdWUnXV0pLCBbe2ZvbzogMX0sICdrZXknXSk7XG4gICAqICAgICBhc3NlcnQuaGFzQWxsS2V5cyhuZXcgU2V0KFt7Zm9vOiAnYmFyJ30sICdhbm90aGVyS2V5J10sIFt7Zm9vOiAnYmFyJ30sICdhbm90aGVyS2V5J10pO1xuICAgKlxuICAgKiBAbmFtZSBoYXNBbGxLZXlzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBrZXlzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5oYXNBbGxLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lmhhc0FsbEtleXMsIHRydWUpLnRvLmhhdmUuYWxsLmtleXMoa2V5cyk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5jb250YWluc0FsbEtleXMob2JqZWN0LCBba2V5c10sIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGhhcyBhbGwgb2YgdGhlIGBrZXlzYCBwcm92aWRlZCBidXQgbWF5IGhhdmUgbW9yZSBrZXlzIG5vdCBsaXN0ZWQuXG4gICAqIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgc2luZ2xlIG9iamVjdCBpbnN0ZWFkIG9mIGEgYGtleXNgIGFycmF5IGFuZCBpdHMga2V5c1xuICAgKiB3aWxsIGJlIHVzZWQgYXMgdGhlIGV4cGVjdGVkIHNldCBvZiBrZXlzLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmNvbnRhaW5zQWxsS2V5cyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30sIFsnZm9vJywgJ2JheiddKTtcbiAgICogICAgIGFzc2VydC5jb250YWluc0FsbEtleXMoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9LCBbJ2ZvbycsICdiYXInLCAnYmF6J10pO1xuICAgKiAgICAgYXNzZXJ0LmNvbnRhaW5zQWxsS2V5cyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30sIHtmb286IDMwLCBiYXo6IDEzMzd9KTtcbiAgICogICAgIGFzc2VydC5jb250YWluc0FsbEtleXMoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9LCB7Zm9vOiAzMCwgYmFyOiA5OSwgYmF6OiAxMzM3fSk7XG4gICAqICAgICBhc3NlcnQuY29udGFpbnNBbGxLZXlzKG5ldyBNYXAoW1t7Zm9vOiAxfSwgJ2JhciddLCBbJ2tleScsICd2YWx1ZSddXSksIFt7Zm9vOiAxfV0pO1xuICAgKiAgICAgYXNzZXJ0LmNvbnRhaW5zQWxsS2V5cyhuZXcgTWFwKFtbe2ZvbzogMX0sICdiYXInXSwgWydrZXknLCAndmFsdWUnXV0pLCBbe2ZvbzogMX0sICdrZXknXSk7XG4gICAqICAgICBhc3NlcnQuY29udGFpbnNBbGxLZXlzKG5ldyBTZXQoW3tmb286ICdiYXInfSwgJ2Fub3RoZXJLZXknXSwgW3tmb286ICdiYXInfV0pO1xuICAgKiAgICAgYXNzZXJ0LmNvbnRhaW5zQWxsS2V5cyhuZXcgU2V0KFt7Zm9vOiAnYmFyJ30sICdhbm90aGVyS2V5J10sIFt7Zm9vOiAnYmFyJ30sICdhbm90aGVyS2V5J10pO1xuICAgKlxuICAgKiBAbmFtZSBjb250YWluc0FsbEtleXNcbiAgICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nW119IGtleXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmNvbnRhaW5zQWxsS2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5jb250YWluc0FsbEtleXMsIHRydWUpXG4gICAgICAudG8uY29udGFpbi5hbGwua2V5cyhrZXlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmRvZXNOb3RIYXZlQW55S2V5cyhvYmplY3QsIFtrZXlzXSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIG5vbmUgb2YgdGhlIGBrZXlzYCBwcm92aWRlZC5cbiAgICogWW91IGNhbiBhbHNvIHByb3ZpZGUgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQgb2YgYSBga2V5c2AgYXJyYXkgYW5kIGl0cyBrZXlzXG4gICAqIHdpbGwgYmUgdXNlZCBhcyB0aGUgZXhwZWN0ZWQgc2V0IG9mIGtleXMuXG4gICAqXG4gICAqICAgICBhc3NlcnQuZG9lc05vdEhhdmVBbnlLZXlzKHtmb286IDEsIGJhcjogMiwgYmF6OiAzfSwgWydvbmUnLCAndHdvJywgJ2V4YW1wbGUnXSk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdEhhdmVBbnlLZXlzKHtmb286IDEsIGJhcjogMiwgYmF6OiAzfSwge29uZTogMSwgdHdvOiAyLCBleGFtcGxlOiAnZm9vJ30pO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RIYXZlQW55S2V5cyhuZXcgTWFwKFtbe2ZvbzogMX0sICdiYXInXSwgWydrZXknLCAndmFsdWUnXV0pLCBbe29uZTogJ3R3byd9LCAnZXhhbXBsZSddKTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90SGF2ZUFueUtleXMobmV3IFNldChbe2ZvbzogJ2Jhcid9LCAnYW5vdGhlcktleSddLCBbe29uZTogJ3R3byd9LCAnZXhhbXBsZSddKTtcbiAgICpcbiAgICogQG5hbWUgZG9lc05vdEhhdmVBbnlLZXlzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBrZXlzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kb2VzTm90SGF2ZUFueUtleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuZG9lc05vdEhhdmVBbnlLZXlzLCB0cnVlKVxuICAgICAgLnRvLm5vdC5oYXZlLmFueS5rZXlzKGtleXMpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuZG9lc05vdEhhdmVBbGxLZXlzKG9iamVjdCwgW2tleXNdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBkb2VzIG5vdCBoYXZlIGF0IGxlYXN0IG9uZSBvZiB0aGUgYGtleXNgIHByb3ZpZGVkLlxuICAgKiBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCBvZiBhIGBrZXlzYCBhcnJheSBhbmQgaXRzIGtleXNcbiAgICogd2lsbCBiZSB1c2VkIGFzIHRoZSBleHBlY3RlZCBzZXQgb2Yga2V5cy5cbiAgICpcbiAgICogICAgIGFzc2VydC5kb2VzTm90SGF2ZUFsbEtleXMoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9LCBbJ29uZScsICd0d28nLCAnZXhhbXBsZSddKTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90SGF2ZUFsbEtleXMoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9LCB7b25lOiAxLCB0d286IDIsIGV4YW1wbGU6ICdmb28nfSk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdEhhdmVBbGxLZXlzKG5ldyBNYXAoW1t7Zm9vOiAxfSwgJ2JhciddLCBbJ2tleScsICd2YWx1ZSddXSksIFt7b25lOiAndHdvJ30sICdleGFtcGxlJ10pO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RIYXZlQWxsS2V5cyhuZXcgU2V0KFt7Zm9vOiAnYmFyJ30sICdhbm90aGVyS2V5J10sIFt7b25lOiAndHdvJ30sICdleGFtcGxlJ10pO1xuICAgKlxuICAgKiBAbmFtZSBkb2VzTm90SGF2ZUFsbEtleXNcbiAgICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nW119IGtleXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRvZXNOb3RIYXZlQWxsS2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5kb2VzTm90SGF2ZUFsbEtleXMsIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUuYWxsLmtleXMoa2V5cyk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5oYXNBbnlEZWVwS2V5cyhvYmplY3QsIFtrZXlzXSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGF0IGxlYXN0IG9uZSBvZiB0aGUgYGtleXNgIHByb3ZpZGVkLlxuICAgKiBTaW5jZSBTZXRzIGFuZCBNYXBzIGNhbiBoYXZlIG9iamVjdHMgYXMga2V5cyB5b3UgY2FuIHVzZSB0aGlzIGFzc2VydGlvbiB0byBwZXJmb3JtXG4gICAqIGEgZGVlcCBjb21wYXJpc29uLlxuICAgKiBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCBvZiBhIGBrZXlzYCBhcnJheSBhbmQgaXRzIGtleXNcbiAgICogd2lsbCBiZSB1c2VkIGFzIHRoZSBleHBlY3RlZCBzZXQgb2Yga2V5cy5cbiAgICpcbiAgICogICAgIGFzc2VydC5oYXNBbnlEZWVwS2V5cyhuZXcgTWFwKFtbe29uZTogJ29uZSd9LCAndmFsdWVPbmUnXSwgWzEsIDJdXSksIHtvbmU6ICdvbmUnfSk7XG4gICAqICAgICBhc3NlcnQuaGFzQW55RGVlcEtleXMobmV3IE1hcChbW3tvbmU6ICdvbmUnfSwgJ3ZhbHVlT25lJ10sIFsxLCAyXV0pLCBbe29uZTogJ29uZSd9LCB7dHdvOiAndHdvJ31dKTtcbiAgICogICAgIGFzc2VydC5oYXNBbnlEZWVwS2V5cyhuZXcgTWFwKFtbe29uZTogJ29uZSd9LCAndmFsdWVPbmUnXSwgW3t0d286ICd0d28nfSwgJ3ZhbHVlVHdvJ11dKSwgW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSk7XG4gICAqICAgICBhc3NlcnQuaGFzQW55RGVlcEtleXMobmV3IFNldChbe29uZTogJ29uZSd9LCB7dHdvOiAndHdvJ31dKSwge29uZTogJ29uZSd9KTtcbiAgICogICAgIGFzc2VydC5oYXNBbnlEZWVwS2V5cyhuZXcgU2V0KFt7b25lOiAnb25lJ30sIHt0d286ICd0d28nfV0pLCBbe29uZTogJ29uZSd9LCB7dGhyZWU6ICd0aHJlZSd9XSk7XG4gICAqICAgICBhc3NlcnQuaGFzQW55RGVlcEtleXMobmV3IFNldChbe29uZTogJ29uZSd9LCB7dHdvOiAndHdvJ31dKSwgW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSk7XG4gICAqXG4gICAqIEBuYW1lIGRvZXNOb3RIYXZlQWxsS2V5c1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3RcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGtleXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lmhhc0FueURlZXBLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lmhhc0FueURlZXBLZXlzLCB0cnVlKVxuICAgICAgLnRvLmhhdmUuYW55LmRlZXAua2V5cyhrZXlzKTtcbiAgfVxuXG4gLyoqXG4gICAqICMjIyAuaGFzQWxsRGVlcEtleXMob2JqZWN0LCBba2V5c10sIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGhhcyBhbGwgYW5kIG9ubHkgYWxsIG9mIHRoZSBga2V5c2AgcHJvdmlkZWQuXG4gICAqIFNpbmNlIFNldHMgYW5kIE1hcHMgY2FuIGhhdmUgb2JqZWN0cyBhcyBrZXlzIHlvdSBjYW4gdXNlIHRoaXMgYXNzZXJ0aW9uIHRvIHBlcmZvcm1cbiAgICogYSBkZWVwIGNvbXBhcmlzb24uXG4gICAqIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgc2luZ2xlIG9iamVjdCBpbnN0ZWFkIG9mIGEgYGtleXNgIGFycmF5IGFuZCBpdHMga2V5c1xuICAgKiB3aWxsIGJlIHVzZWQgYXMgdGhlIGV4cGVjdGVkIHNldCBvZiBrZXlzLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lmhhc0FsbERlZXBLZXlzKG5ldyBNYXAoW1t7b25lOiAnb25lJ30sICd2YWx1ZU9uZSddXSksIHtvbmU6ICdvbmUnfSk7XG4gICAqICAgICBhc3NlcnQuaGFzQWxsRGVlcEtleXMobmV3IE1hcChbW3tvbmU6ICdvbmUnfSwgJ3ZhbHVlT25lJ10sIFt7dHdvOiAndHdvJ30sICd2YWx1ZVR3byddXSksIFt7b25lOiAnb25lJ30sIHt0d286ICd0d28nfV0pO1xuICAgKiAgICAgYXNzZXJ0Lmhhc0FsbERlZXBLZXlzKG5ldyBTZXQoW3tvbmU6ICdvbmUnfV0pLCB7b25lOiAnb25lJ30pO1xuICAgKiAgICAgYXNzZXJ0Lmhhc0FsbERlZXBLZXlzKG5ldyBTZXQoW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSksIFt7b25lOiAnb25lJ30sIHt0d286ICd0d28nfV0pO1xuICAgKlxuICAgKiBAbmFtZSBoYXNBbGxEZWVwS2V5c1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3RcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGtleXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lmhhc0FsbERlZXBLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lmhhc0FsbERlZXBLZXlzLCB0cnVlKVxuICAgICAgLnRvLmhhdmUuYWxsLmRlZXAua2V5cyhrZXlzKTtcbiAgfVxuXG4gLyoqXG4gICAqICMjIyAuY29udGFpbnNBbGxEZWVwS2V5cyhvYmplY3QsIFtrZXlzXSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgY29udGFpbnMgYWxsIG9mIHRoZSBga2V5c2AgcHJvdmlkZWQuXG4gICAqIFNpbmNlIFNldHMgYW5kIE1hcHMgY2FuIGhhdmUgb2JqZWN0cyBhcyBrZXlzIHlvdSBjYW4gdXNlIHRoaXMgYXNzZXJ0aW9uIHRvIHBlcmZvcm1cbiAgICogYSBkZWVwIGNvbXBhcmlzb24uXG4gICAqIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgc2luZ2xlIG9iamVjdCBpbnN0ZWFkIG9mIGEgYGtleXNgIGFycmF5IGFuZCBpdHMga2V5c1xuICAgKiB3aWxsIGJlIHVzZWQgYXMgdGhlIGV4cGVjdGVkIHNldCBvZiBrZXlzLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmNvbnRhaW5zQWxsRGVlcEtleXMobmV3IE1hcChbW3tvbmU6ICdvbmUnfSwgJ3ZhbHVlT25lJ10sIFsxLCAyXV0pLCB7b25lOiAnb25lJ30pO1xuICAgKiAgICAgYXNzZXJ0LmNvbnRhaW5zQWxsRGVlcEtleXMobmV3IE1hcChbW3tvbmU6ICdvbmUnfSwgJ3ZhbHVlT25lJ10sIFt7dHdvOiAndHdvJ30sICd2YWx1ZVR3byddXSksIFt7b25lOiAnb25lJ30sIHt0d286ICd0d28nfV0pO1xuICAgKiAgICAgYXNzZXJ0LmNvbnRhaW5zQWxsRGVlcEtleXMobmV3IFNldChbe29uZTogJ29uZSd9LCB7dHdvOiAndHdvJ31dKSwge29uZTogJ29uZSd9KTtcbiAgICogICAgIGFzc2VydC5jb250YWluc0FsbERlZXBLZXlzKG5ldyBTZXQoW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSksIFt7b25lOiAnb25lJ30sIHt0d286ICd0d28nfV0pO1xuICAgKlxuICAgKiBAbmFtZSBjb250YWluc0FsbERlZXBLZXlzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0ga2V5c1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuY29udGFpbnNBbGxEZWVwS2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5jb250YWluc0FsbERlZXBLZXlzLCB0cnVlKVxuICAgICAgLnRvLmNvbnRhaW4uYWxsLmRlZXAua2V5cyhrZXlzKTtcbiAgfVxuXG4gLyoqXG4gICAqICMjIyAuZG9lc05vdEhhdmVBbnlEZWVwS2V5cyhvYmplY3QsIFtrZXlzXSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIG5vbmUgb2YgdGhlIGBrZXlzYCBwcm92aWRlZC5cbiAgICogU2luY2UgU2V0cyBhbmQgTWFwcyBjYW4gaGF2ZSBvYmplY3RzIGFzIGtleXMgeW91IGNhbiB1c2UgdGhpcyBhc3NlcnRpb24gdG8gcGVyZm9ybVxuICAgKiBhIGRlZXAgY29tcGFyaXNvbi5cbiAgICogWW91IGNhbiBhbHNvIHByb3ZpZGUgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQgb2YgYSBga2V5c2AgYXJyYXkgYW5kIGl0cyBrZXlzXG4gICAqIHdpbGwgYmUgdXNlZCBhcyB0aGUgZXhwZWN0ZWQgc2V0IG9mIGtleXMuXG4gICAqXG4gICAqICAgICBhc3NlcnQuZG9lc05vdEhhdmVBbnlEZWVwS2V5cyhuZXcgTWFwKFtbe29uZTogJ29uZSd9LCAndmFsdWVPbmUnXSwgWzEsIDJdXSksIHt0aGlzRG9lc05vdDogJ2V4aXN0J30pO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RIYXZlQW55RGVlcEtleXMobmV3IE1hcChbW3tvbmU6ICdvbmUnfSwgJ3ZhbHVlT25lJ10sIFt7dHdvOiAndHdvJ30sICd2YWx1ZVR3byddXSksIFt7dHdlbnR5OiAndHdlbnR5J30sIHtmaWZ0eTogJ2ZpZnR5J31dKTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90SGF2ZUFueURlZXBLZXlzKG5ldyBTZXQoW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSksIHt0d2VudHk6ICd0d2VudHknfSk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdEhhdmVBbnlEZWVwS2V5cyhuZXcgU2V0KFt7b25lOiAnb25lJ30sIHt0d286ICd0d28nfV0pLCBbe3R3ZW50eTogJ3R3ZW50eSd9LCB7ZmlmdHk6ICdmaWZ0eSd9XSk7XG4gICAqXG4gICAqIEBuYW1lIGRvZXNOb3RIYXZlQW55RGVlcEtleXNcbiAgICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBrZXlzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kb2VzTm90SGF2ZUFueURlZXBLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmRvZXNOb3RIYXZlQW55RGVlcEtleXMsIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUuYW55LmRlZXAua2V5cyhrZXlzKTtcbiAgfVxuXG4gLyoqXG4gICAqICMjIyAuZG9lc05vdEhhdmVBbGxEZWVwS2V5cyhvYmplY3QsIFtrZXlzXSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgZG9lcyBub3QgaGF2ZSBhdCBsZWFzdCBvbmUgb2YgdGhlIGBrZXlzYCBwcm92aWRlZC5cbiAgICogU2luY2UgU2V0cyBhbmQgTWFwcyBjYW4gaGF2ZSBvYmplY3RzIGFzIGtleXMgeW91IGNhbiB1c2UgdGhpcyBhc3NlcnRpb24gdG8gcGVyZm9ybVxuICAgKiBhIGRlZXAgY29tcGFyaXNvbi5cbiAgICogWW91IGNhbiBhbHNvIHByb3ZpZGUgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQgb2YgYSBga2V5c2AgYXJyYXkgYW5kIGl0cyBrZXlzXG4gICAqIHdpbGwgYmUgdXNlZCBhcyB0aGUgZXhwZWN0ZWQgc2V0IG9mIGtleXMuXG4gICAqXG4gICAqICAgICBhc3NlcnQuZG9lc05vdEhhdmVBbGxEZWVwS2V5cyhuZXcgTWFwKFtbe29uZTogJ29uZSd9LCAndmFsdWVPbmUnXSwgWzEsIDJdXSksIHt0aGlzRG9lc05vdDogJ2V4aXN0J30pO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RIYXZlQWxsRGVlcEtleXMobmV3IE1hcChbW3tvbmU6ICdvbmUnfSwgJ3ZhbHVlT25lJ10sIFt7dHdvOiAndHdvJ30sICd2YWx1ZVR3byddXSksIFt7dHdlbnR5OiAndHdlbnR5J30sIHtvbmU6ICdvbmUnfV0pO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RIYXZlQWxsRGVlcEtleXMobmV3IFNldChbe29uZTogJ29uZSd9LCB7dHdvOiAndHdvJ31dKSwge3R3ZW50eTogJ3R3ZW50eSd9KTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90SGF2ZUFsbERlZXBLZXlzKG5ldyBTZXQoW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSksIFt7b25lOiAnb25lJ30sIHtmaWZ0eTogJ2ZpZnR5J31dKTtcbiAgICpcbiAgICogQG5hbWUgZG9lc05vdEhhdmVBbGxEZWVwS2V5c1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3RcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGtleXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRvZXNOb3RIYXZlQWxsRGVlcEtleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuZG9lc05vdEhhdmVBbGxEZWVwS2V5cywgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5hbGwuZGVlcC5rZXlzKGtleXMpO1xuICB9XG5cbiAvKipcbiAgICogIyMjIC50aHJvd3MoZm4sIFtlcnJvckxpa2Uvc3RyaW5nL3JlZ2V4cF0sIFtzdHJpbmcvcmVnZXhwXSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBJZiBgZXJyb3JMaWtlYCBpcyBhbiBgRXJyb3JgIGNvbnN0cnVjdG9yLCBhc3NlcnRzIHRoYXQgYGZuYCB3aWxsIHRocm93IGFuIGVycm9yIHRoYXQgaXMgYW5cbiAgICogaW5zdGFuY2Ugb2YgYGVycm9yTGlrZWAuXG4gICAqIElmIGBlcnJvckxpa2VgIGlzIGFuIGBFcnJvcmAgaW5zdGFuY2UsIGFzc2VydHMgdGhhdCB0aGUgZXJyb3IgdGhyb3duIGlzIHRoZSBzYW1lXG4gICAqIGluc3RhbmNlIGFzIGBlcnJvckxpa2VgLlxuICAgKiBJZiBgZXJyTXNnTWF0Y2hlcmAgaXMgcHJvdmlkZWQsIGl0IGFsc28gYXNzZXJ0cyB0aGF0IHRoZSBlcnJvciB0aHJvd24gd2lsbCBoYXZlIGFcbiAgICogbWVzc2FnZSBtYXRjaGluZyBgZXJyTXNnTWF0Y2hlcmAuXG4gICAqXG4gICAqICAgICBhc3NlcnQudGhyb3dzKGZuLCAnZnVuY3Rpb24gdGhyb3dzIGEgcmVmZXJlbmNlIGVycm9yJyk7XG4gICAqICAgICBhc3NlcnQudGhyb3dzKGZuLCAvZnVuY3Rpb24gdGhyb3dzIGEgcmVmZXJlbmNlIGVycm9yLyk7XG4gICAqICAgICBhc3NlcnQudGhyb3dzKGZuLCBSZWZlcmVuY2VFcnJvcik7XG4gICAqICAgICBhc3NlcnQudGhyb3dzKGZuLCBlcnJvckluc3RhbmNlKTtcbiAgICogICAgIGFzc2VydC50aHJvd3MoZm4sIFJlZmVyZW5jZUVycm9yLCAnRXJyb3IgdGhyb3duIG11c3QgYmUgYSBSZWZlcmVuY2VFcnJvciBhbmQgaGF2ZSB0aGlzIG1zZycpO1xuICAgKiAgICAgYXNzZXJ0LnRocm93cyhmbiwgZXJyb3JJbnN0YW5jZSwgJ0Vycm9yIHRocm93biBtdXN0IGJlIHRoZSBzYW1lIGVycm9ySW5zdGFuY2UgYW5kIGhhdmUgdGhpcyBtc2cnKTtcbiAgICogICAgIGFzc2VydC50aHJvd3MoZm4sIFJlZmVyZW5jZUVycm9yLCAvRXJyb3IgdGhyb3duIG11c3QgYmUgYSBSZWZlcmVuY2VFcnJvciBhbmQgbWF0Y2ggdGhpcy8pO1xuICAgKiAgICAgYXNzZXJ0LnRocm93cyhmbiwgZXJyb3JJbnN0YW5jZSwgL0Vycm9yIHRocm93biBtdXN0IGJlIHRoZSBzYW1lIGVycm9ySW5zdGFuY2UgYW5kIG1hdGNoIHRoaXMvKTtcbiAgICpcbiAgICogQG5hbWUgdGhyb3dzXG4gICAqIEBhbGlhcyB0aHJvd1xuICAgKiBAYWxpYXMgVGhyb3dcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHBhcmFtIHtFcnJvckNvbnN0cnVjdG9yfEVycm9yfSBlcnJvckxpa2VcbiAgICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSBlcnJNc2dNYXRjaGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRXJyb3IjRXJyb3JfdHlwZXNcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LnRocm93cyA9IGZ1bmN0aW9uIChmbiwgZXJyb3JMaWtlLCBlcnJNc2dNYXRjaGVyLCBtc2cpIHtcbiAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBlcnJvckxpa2UgfHwgZXJyb3JMaWtlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICBlcnJNc2dNYXRjaGVyID0gZXJyb3JMaWtlO1xuICAgICAgZXJyb3JMaWtlID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgYXNzZXJ0RXJyID0gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQudGhyb3dzLCB0cnVlKVxuICAgICAgLnRvLnRocm93KGVycm9yTGlrZSwgZXJyTXNnTWF0Y2hlcik7XG4gICAgcmV0dXJuIGZsYWcoYXNzZXJ0RXJyLCAnb2JqZWN0Jyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZG9lc05vdFRocm93KGZuLCBbZXJyb3JMaWtlL3N0cmluZy9yZWdleHBdLCBbc3RyaW5nL3JlZ2V4cF0sIFttZXNzYWdlXSlcbiAgICpcbiAgICogSWYgYGVycm9yTGlrZWAgaXMgYW4gYEVycm9yYCBjb25zdHJ1Y3RvciwgYXNzZXJ0cyB0aGF0IGBmbmAgd2lsbCBfbm90XyB0aHJvdyBhbiBlcnJvciB0aGF0IGlzIGFuXG4gICAqIGluc3RhbmNlIG9mIGBlcnJvckxpa2VgLlxuICAgKiBJZiBgZXJyb3JMaWtlYCBpcyBhbiBgRXJyb3JgIGluc3RhbmNlLCBhc3NlcnRzIHRoYXQgdGhlIGVycm9yIHRocm93biBpcyBfbm90XyB0aGUgc2FtZVxuICAgKiBpbnN0YW5jZSBhcyBgZXJyb3JMaWtlYC5cbiAgICogSWYgYGVyck1zZ01hdGNoZXJgIGlzIHByb3ZpZGVkLCBpdCBhbHNvIGFzc2VydHMgdGhhdCB0aGUgZXJyb3IgdGhyb3duIHdpbGwgX25vdF8gaGF2ZSBhXG4gICAqIG1lc3NhZ2UgbWF0Y2hpbmcgYGVyck1zZ01hdGNoZXJgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RUaHJvdyhmbiwgJ0FueSBFcnJvciB0aHJvd24gbXVzdCBub3QgaGF2ZSB0aGlzIG1lc3NhZ2UnKTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90VGhyb3coZm4sIC9BbnkgRXJyb3IgdGhyb3duIG11c3Qgbm90IG1hdGNoIHRoaXMvKTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90VGhyb3coZm4sIEVycm9yKTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90VGhyb3coZm4sIGVycm9ySW5zdGFuY2UpO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RUaHJvdyhmbiwgRXJyb3IsICdFcnJvciBtdXN0IG5vdCBoYXZlIHRoaXMgbWVzc2FnZScpO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RUaHJvdyhmbiwgZXJyb3JJbnN0YW5jZSwgJ0Vycm9yIG11c3Qgbm90IGhhdmUgdGhpcyBtZXNzYWdlJyk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdFRocm93KGZuLCBFcnJvciwgL0Vycm9yIG11c3Qgbm90IG1hdGNoIHRoaXMvKTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90VGhyb3coZm4sIGVycm9ySW5zdGFuY2UsIC9FcnJvciBtdXN0IG5vdCBtYXRjaCB0aGlzLyk7XG4gICAqXG4gICAqIEBuYW1lIGRvZXNOb3RUaHJvd1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcGFyYW0ge0Vycm9yQ29uc3RydWN0b3J9IGVycm9yTGlrZVxuICAgKiBAcGFyYW0ge1JlZ0V4cHxTdHJpbmd9IGVyck1zZ01hdGNoZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9FcnJvciNFcnJvcl90eXBlc1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZG9lc05vdFRocm93ID0gZnVuY3Rpb24gKGZuLCBlcnJvckxpa2UsIGVyck1zZ01hdGNoZXIsIG1zZykge1xuICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGVycm9yTGlrZSB8fCBlcnJvckxpa2UgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIGVyck1zZ01hdGNoZXIgPSBlcnJvckxpa2U7XG4gICAgICBlcnJvckxpa2UgPSBudWxsO1xuICAgIH1cblxuICAgIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRvZXNOb3RUaHJvdywgdHJ1ZSlcbiAgICAgIC50by5ub3QudGhyb3coZXJyb3JMaWtlLCBlcnJNc2dNYXRjaGVyKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5vcGVyYXRvcih2YWwxLCBvcGVyYXRvciwgdmFsMiwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBDb21wYXJlcyB0d28gdmFsdWVzIHVzaW5nIGBvcGVyYXRvcmAuXG4gICAqXG4gICAqICAgICBhc3NlcnQub3BlcmF0b3IoMSwgJzwnLCAyLCAnZXZlcnl0aGluZyBpcyBvaycpO1xuICAgKiAgICAgYXNzZXJ0Lm9wZXJhdG9yKDEsICc+JywgMiwgJ3RoaXMgd2lsbCBmYWlsJyk7XG4gICAqXG4gICAqIEBuYW1lIG9wZXJhdG9yXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbDFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wZXJhdG9yXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbDJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm9wZXJhdG9yID0gZnVuY3Rpb24gKHZhbCwgb3BlcmF0b3IsIHZhbDIsIG1zZykge1xuICAgIHZhciBvaztcbiAgICBzd2l0Y2gob3BlcmF0b3IpIHtcbiAgICAgIGNhc2UgJz09JzpcbiAgICAgICAgb2sgPSB2YWwgPT0gdmFsMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc9PT0nOlxuICAgICAgICBvayA9IHZhbCA9PT0gdmFsMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc+JzpcbiAgICAgICAgb2sgPSB2YWwgPiB2YWwyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgb2sgPSB2YWwgPj0gdmFsMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc8JzpcbiAgICAgICAgb2sgPSB2YWwgPCB2YWwyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJzw9JzpcbiAgICAgICAgb2sgPSB2YWwgPD0gdmFsMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICchPSc6XG4gICAgICAgIG9rID0gdmFsICE9IHZhbDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnIT09JzpcbiAgICAgICAgb2sgPSB2YWwgIT09IHZhbDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbXNnID0gbXNnID8gbXNnICsgJzogJyA6IG1zZztcbiAgICAgICAgdGhyb3cgbmV3IGNoYWkuQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgICAgbXNnICsgJ0ludmFsaWQgb3BlcmF0b3IgXCInICsgb3BlcmF0b3IgKyAnXCInLFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICBhc3NlcnQub3BlcmF0b3JcbiAgICAgICAgKTtcbiAgICB9XG4gICAgdmFyIHRlc3QgPSBuZXcgQXNzZXJ0aW9uKG9rLCBtc2csIGFzc2VydC5vcGVyYXRvciwgdHJ1ZSk7XG4gICAgdGVzdC5hc3NlcnQoXG4gICAgICAgIHRydWUgPT09IGZsYWcodGVzdCwgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAnICsgdXRpbC5pbnNwZWN0KHZhbCkgKyAnIHRvIGJlICcgKyBvcGVyYXRvciArICcgJyArIHV0aWwuaW5zcGVjdCh2YWwyKVxuICAgICAgLCAnZXhwZWN0ZWQgJyArIHV0aWwuaW5zcGVjdCh2YWwpICsgJyB0byBub3QgYmUgJyArIG9wZXJhdG9yICsgJyAnICsgdXRpbC5pbnNwZWN0KHZhbDIpICk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuY2xvc2VUbyhhY3R1YWwsIGV4cGVjdGVkLCBkZWx0YSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCBgZXhwZWN0ZWRgLCB0byB3aXRoaW4gYSArLy0gYGRlbHRhYCByYW5nZS5cbiAgICpcbiAgICogICAgIGFzc2VydC5jbG9zZVRvKDEuNSwgMSwgMC41LCAnbnVtYmVycyBhcmUgY2xvc2UnKTtcbiAgICpcbiAgICogQG5hbWUgY2xvc2VUb1xuICAgKiBAcGFyYW0ge051bWJlcn0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmNsb3NlVG8gPSBmdW5jdGlvbiAoYWN0LCBleHAsIGRlbHRhLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQuY2xvc2VUbywgdHJ1ZSkudG8uYmUuY2xvc2VUbyhleHAsIGRlbHRhKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5hcHByb3hpbWF0ZWx5KGFjdHVhbCwgZXhwZWN0ZWQsIGRlbHRhLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGVxdWFsIGBleHBlY3RlZGAsIHRvIHdpdGhpbiBhICsvLSBgZGVsdGFgIHJhbmdlLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmFwcHJveGltYXRlbHkoMS41LCAxLCAwLjUsICdudW1iZXJzIGFyZSBjbG9zZScpO1xuICAgKlxuICAgKiBAbmFtZSBhcHByb3hpbWF0ZWx5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhY3R1YWxcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuYXBwcm94aW1hdGVseSA9IGZ1bmN0aW9uIChhY3QsIGV4cCwgZGVsdGEsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5hcHByb3hpbWF0ZWx5LCB0cnVlKVxuICAgICAgLnRvLmJlLmFwcHJveGltYXRlbHkoZXhwLCBkZWx0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuc2FtZU1lbWJlcnMoc2V0MSwgc2V0MiwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHNldDFgIGFuZCBgc2V0MmAgaGF2ZSB0aGUgc2FtZSBtZW1iZXJzIGluIGFueSBvcmRlci4gVXNlcyBhXG4gICAqIHN0cmljdCBlcXVhbGl0eSBjaGVjayAoPT09KS5cbiAgICpcbiAgICogICAgIGFzc2VydC5zYW1lTWVtYmVycyhbIDEsIDIsIDMgXSwgWyAyLCAxLCAzIF0sICdzYW1lIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgc2FtZU1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MVxuICAgKiBAcGFyYW0ge0FycmF5fSBzZXQyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5zYW1lTWVtYmVycyA9IGZ1bmN0aW9uIChzZXQxLCBzZXQyLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHNldDEsIG1zZywgYXNzZXJ0LnNhbWVNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLmhhdmUuc2FtZS5tZW1iZXJzKHNldDIpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAubm90U2FtZU1lbWJlcnMoc2V0MSwgc2V0MiwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHNldDFgIGFuZCBgc2V0MmAgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBtZW1iZXJzIGluIGFueSBvcmRlci5cbiAgICogVXNlcyBhIHN0cmljdCBlcXVhbGl0eSBjaGVjayAoPT09KS5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RTYW1lTWVtYmVycyhbIDEsIDIsIDMgXSwgWyA1LCAxLCAzIF0sICdub3Qgc2FtZSBtZW1iZXJzJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdFNhbWVNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNldDFcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90U2FtZU1lbWJlcnMgPSBmdW5jdGlvbiAoc2V0MSwgc2V0MiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzZXQxLCBtc2csIGFzc2VydC5ub3RTYW1lTWVtYmVycywgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5zYW1lLm1lbWJlcnMoc2V0Mik7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5zYW1lRGVlcE1lbWJlcnMoc2V0MSwgc2V0MiwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHNldDFgIGFuZCBgc2V0MmAgaGF2ZSB0aGUgc2FtZSBtZW1iZXJzIGluIGFueSBvcmRlci4gVXNlcyBhXG4gICAqIGRlZXAgZXF1YWxpdHkgY2hlY2suXG4gICAqXG4gICAqICAgICBhc3NlcnQuc2FtZURlZXBNZW1iZXJzKFsgeyBhOiAxIH0sIHsgYjogMiB9LCB7IGM6IDMgfSBdLCBbeyBiOiAyIH0sIHsgYTogMSB9LCB7IGM6IDMgfV0sICdzYW1lIGRlZXAgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBzYW1lRGVlcE1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MVxuICAgKiBAcGFyYW0ge0FycmF5fSBzZXQyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5zYW1lRGVlcE1lbWJlcnMgPSBmdW5jdGlvbiAoc2V0MSwgc2V0MiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzZXQxLCBtc2csIGFzc2VydC5zYW1lRGVlcE1lbWJlcnMsIHRydWUpXG4gICAgICAudG8uaGF2ZS5zYW1lLmRlZXAubWVtYmVycyhzZXQyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFNhbWVEZWVwTWVtYmVycyhzZXQxLCBzZXQyLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgc2V0MWAgYW5kIGBzZXQyYCBkb24ndCBoYXZlIHRoZSBzYW1lIG1lbWJlcnMgaW4gYW55IG9yZGVyLlxuICAgKiBVc2VzIGEgZGVlcCBlcXVhbGl0eSBjaGVjay5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RTYW1lRGVlcE1lbWJlcnMoWyB7IGE6IDEgfSwgeyBiOiAyIH0sIHsgYzogMyB9IF0sIFt7IGI6IDIgfSwgeyBhOiAxIH0sIHsgZjogNSB9XSwgJ25vdCBzYW1lIGRlZXAgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBub3RTYW1lRGVlcE1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MVxuICAgKiBAcGFyYW0ge0FycmF5fSBzZXQyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RTYW1lRGVlcE1lbWJlcnMgPSBmdW5jdGlvbiAoc2V0MSwgc2V0MiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzZXQxLCBtc2csIGFzc2VydC5ub3RTYW1lRGVlcE1lbWJlcnMsIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUuc2FtZS5kZWVwLm1lbWJlcnMoc2V0Mik7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5zYW1lT3JkZXJlZE1lbWJlcnMoc2V0MSwgc2V0MiwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHNldDFgIGFuZCBgc2V0MmAgaGF2ZSB0aGUgc2FtZSBtZW1iZXJzIGluIHRoZSBzYW1lIG9yZGVyLlxuICAgKiBVc2VzIGEgc3RyaWN0IGVxdWFsaXR5IGNoZWNrICg9PT0pLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnNhbWVPcmRlcmVkTWVtYmVycyhbIDEsIDIsIDMgXSwgWyAxLCAyLCAzIF0sICdzYW1lIG9yZGVyZWQgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBzYW1lT3JkZXJlZE1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MVxuICAgKiBAcGFyYW0ge0FycmF5fSBzZXQyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5zYW1lT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbiAoc2V0MSwgc2V0MiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzZXQxLCBtc2csIGFzc2VydC5zYW1lT3JkZXJlZE1lbWJlcnMsIHRydWUpXG4gICAgICAudG8uaGF2ZS5zYW1lLm9yZGVyZWQubWVtYmVycyhzZXQyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFNhbWVPcmRlcmVkTWVtYmVycyhzZXQxLCBzZXQyLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgc2V0MWAgYW5kIGBzZXQyYCBkb24ndCBoYXZlIHRoZSBzYW1lIG1lbWJlcnMgaW4gdGhlIHNhbWVcbiAgICogb3JkZXIuIFVzZXMgYSBzdHJpY3QgZXF1YWxpdHkgY2hlY2sgKD09PSkuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90U2FtZU9yZGVyZWRNZW1iZXJzKFsgMSwgMiwgMyBdLCBbIDIsIDEsIDMgXSwgJ25vdCBzYW1lIG9yZGVyZWQgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBub3RTYW1lT3JkZXJlZE1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MVxuICAgKiBAcGFyYW0ge0FycmF5fSBzZXQyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RTYW1lT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbiAoc2V0MSwgc2V0MiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzZXQxLCBtc2csIGFzc2VydC5ub3RTYW1lT3JkZXJlZE1lbWJlcnMsIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUuc2FtZS5vcmRlcmVkLm1lbWJlcnMoc2V0Mik7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5zYW1lRGVlcE9yZGVyZWRNZW1iZXJzKHNldDEsIHNldDIsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzZXQxYCBhbmQgYHNldDJgIGhhdmUgdGhlIHNhbWUgbWVtYmVycyBpbiB0aGUgc2FtZSBvcmRlci5cbiAgICogVXNlcyBhIGRlZXAgZXF1YWxpdHkgY2hlY2suXG4gICAqXG4gICAqIGFzc2VydC5zYW1lRGVlcE9yZGVyZWRNZW1iZXJzKFsgeyBhOiAxIH0sIHsgYjogMiB9LCB7IGM6IDMgfSBdLCBbIHsgYTogMSB9LCB7IGI6IDIgfSwgeyBjOiAzIH0gXSwgJ3NhbWUgZGVlcCBvcmRlcmVkIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgc2FtZURlZXBPcmRlcmVkTWVtYmVyc1xuICAgKiBAcGFyYW0ge0FycmF5fSBzZXQxXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNldDJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LnNhbWVEZWVwT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbiAoc2V0MSwgc2V0MiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzZXQxLCBtc2csIGFzc2VydC5zYW1lRGVlcE9yZGVyZWRNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLmhhdmUuc2FtZS5kZWVwLm9yZGVyZWQubWVtYmVycyhzZXQyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFNhbWVEZWVwT3JkZXJlZE1lbWJlcnMoc2V0MSwgc2V0MiwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHNldDFgIGFuZCBgc2V0MmAgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBtZW1iZXJzIGluIHRoZSBzYW1lXG4gICAqIG9yZGVyLiBVc2VzIGEgZGVlcCBlcXVhbGl0eSBjaGVjay5cbiAgICpcbiAgICogYXNzZXJ0Lm5vdFNhbWVEZWVwT3JkZXJlZE1lbWJlcnMoWyB7IGE6IDEgfSwgeyBiOiAyIH0sIHsgYzogMyB9IF0sIFsgeyBhOiAxIH0sIHsgYjogMiB9LCB7IHo6IDUgfSBdLCAnbm90IHNhbWUgZGVlcCBvcmRlcmVkIG1lbWJlcnMnKTtcbiAgICogYXNzZXJ0Lm5vdFNhbWVEZWVwT3JkZXJlZE1lbWJlcnMoWyB7IGE6IDEgfSwgeyBiOiAyIH0sIHsgYzogMyB9IF0sIFsgeyBiOiAyIH0sIHsgYTogMSB9LCB7IGM6IDMgfSBdLCAnbm90IHNhbWUgZGVlcCBvcmRlcmVkIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgbm90U2FtZURlZXBPcmRlcmVkTWVtYmVyc1xuICAgKiBAcGFyYW0ge0FycmF5fSBzZXQxXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNldDJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdFNhbWVEZWVwT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbiAoc2V0MSwgc2V0MiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzZXQxLCBtc2csIGFzc2VydC5ub3RTYW1lRGVlcE9yZGVyZWRNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLm5vdC5oYXZlLnNhbWUuZGVlcC5vcmRlcmVkLm1lbWJlcnMoc2V0Mik7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5pbmNsdWRlTWVtYmVycyhzdXBlcnNldCwgc3Vic2V0LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgc3Vic2V0YCBpcyBpbmNsdWRlZCBpbiBgc3VwZXJzZXRgIGluIGFueSBvcmRlci4gVXNlcyBhXG4gICAqIHN0cmljdCBlcXVhbGl0eSBjaGVjayAoPT09KS4gRHVwbGljYXRlcyBhcmUgaWdub3JlZC5cbiAgICpcbiAgICogICAgIGFzc2VydC5pbmNsdWRlTWVtYmVycyhbIDEsIDIsIDMgXSwgWyAyLCAxLCAyIF0sICdpbmNsdWRlIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgaW5jbHVkZU1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc3VwZXJzZXRcbiAgICogQHBhcmFtIHtBcnJheX0gc3Vic2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pbmNsdWRlTWVtYmVycyA9IGZ1bmN0aW9uIChzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1cGVyc2V0LCBtc2csIGFzc2VydC5pbmNsdWRlTWVtYmVycywgdHJ1ZSlcbiAgICAgIC50by5pbmNsdWRlLm1lbWJlcnMoc3Vic2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLm5vdEluY2x1ZGVNZW1iZXJzKHN1cGVyc2V0LCBzdWJzZXQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzdWJzZXRgIGlzbid0IGluY2x1ZGVkIGluIGBzdXBlcnNldGAgaW4gYW55IG9yZGVyLiBVc2VzIGFcbiAgICogc3RyaWN0IGVxdWFsaXR5IGNoZWNrICg9PT0pLiBEdXBsaWNhdGVzIGFyZSBpZ25vcmVkLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdEluY2x1ZGVNZW1iZXJzKFsgMSwgMiwgMyBdLCBbIDUsIDEgXSwgJ25vdCBpbmNsdWRlIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgbm90SW5jbHVkZU1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc3VwZXJzZXRcbiAgICogQHBhcmFtIHtBcnJheX0gc3Vic2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RJbmNsdWRlTWVtYmVycyA9IGZ1bmN0aW9uIChzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1cGVyc2V0LCBtc2csIGFzc2VydC5ub3RJbmNsdWRlTWVtYmVycywgdHJ1ZSlcbiAgICAgIC50by5ub3QuaW5jbHVkZS5tZW1iZXJzKHN1YnNldCk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5pbmNsdWRlRGVlcE1lbWJlcnMoc3VwZXJzZXQsIHN1YnNldCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHN1YnNldGAgaXMgaW5jbHVkZWQgaW4gYHN1cGVyc2V0YCBpbiBhbnkgb3JkZXIuIFVzZXMgYSBkZWVwXG4gICAqIGVxdWFsaXR5IGNoZWNrLiBEdXBsaWNhdGVzIGFyZSBpZ25vcmVkLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmluY2x1ZGVEZWVwTWVtYmVycyhbIHsgYTogMSB9LCB7IGI6IDIgfSwgeyBjOiAzIH0gXSwgWyB7IGI6IDIgfSwgeyBhOiAxIH0sIHsgYjogMiB9IF0sICdpbmNsdWRlIGRlZXAgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBpbmNsdWRlRGVlcE1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc3VwZXJzZXRcbiAgICogQHBhcmFtIHtBcnJheX0gc3Vic2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pbmNsdWRlRGVlcE1lbWJlcnMgPSBmdW5jdGlvbiAoc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzdXBlcnNldCwgbXNnLCBhc3NlcnQuaW5jbHVkZURlZXBNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLmluY2x1ZGUuZGVlcC5tZW1iZXJzKHN1YnNldCk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5ub3RJbmNsdWRlRGVlcE1lbWJlcnMoc3VwZXJzZXQsIHN1YnNldCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHN1YnNldGAgaXNuJ3QgaW5jbHVkZWQgaW4gYHN1cGVyc2V0YCBpbiBhbnkgb3JkZXIuIFVzZXMgYVxuICAgKiBkZWVwIGVxdWFsaXR5IGNoZWNrLiBEdXBsaWNhdGVzIGFyZSBpZ25vcmVkLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdEluY2x1ZGVEZWVwTWVtYmVycyhbIHsgYTogMSB9LCB7IGI6IDIgfSwgeyBjOiAzIH0gXSwgWyB7IGI6IDIgfSwgeyBmOiA1IH0gXSwgJ25vdCBpbmNsdWRlIGRlZXAgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBub3RJbmNsdWRlRGVlcE1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc3VwZXJzZXRcbiAgICogQHBhcmFtIHtBcnJheX0gc3Vic2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RJbmNsdWRlRGVlcE1lbWJlcnMgPSBmdW5jdGlvbiAoc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzdXBlcnNldCwgbXNnLCBhc3NlcnQubm90SW5jbHVkZURlZXBNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLm5vdC5pbmNsdWRlLmRlZXAubWVtYmVycyhzdWJzZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuaW5jbHVkZU9yZGVyZWRNZW1iZXJzKHN1cGVyc2V0LCBzdWJzZXQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzdWJzZXRgIGlzIGluY2x1ZGVkIGluIGBzdXBlcnNldGAgaW4gdGhlIHNhbWUgb3JkZXJcbiAgICogYmVnaW5uaW5nIHdpdGggdGhlIGZpcnN0IGVsZW1lbnQgaW4gYHN1cGVyc2V0YC4gVXNlcyBhIHN0cmljdCBlcXVhbGl0eVxuICAgKiBjaGVjayAoPT09KS5cbiAgICpcbiAgICogICAgIGFzc2VydC5pbmNsdWRlT3JkZXJlZE1lbWJlcnMoWyAxLCAyLCAzIF0sIFsgMSwgMiBdLCAnaW5jbHVkZSBvcmRlcmVkIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgaW5jbHVkZU9yZGVyZWRNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1cGVyc2V0XG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1YnNldFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaW5jbHVkZU9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24gKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc3VwZXJzZXQsIG1zZywgYXNzZXJ0LmluY2x1ZGVPcmRlcmVkTWVtYmVycywgdHJ1ZSlcbiAgICAgIC50by5pbmNsdWRlLm9yZGVyZWQubWVtYmVycyhzdWJzZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAubm90SW5jbHVkZU9yZGVyZWRNZW1iZXJzKHN1cGVyc2V0LCBzdWJzZXQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzdWJzZXRgIGlzbid0IGluY2x1ZGVkIGluIGBzdXBlcnNldGAgaW4gdGhlIHNhbWUgb3JkZXJcbiAgICogYmVnaW5uaW5nIHdpdGggdGhlIGZpcnN0IGVsZW1lbnQgaW4gYHN1cGVyc2V0YC4gVXNlcyBhIHN0cmljdCBlcXVhbGl0eVxuICAgKiBjaGVjayAoPT09KS5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlT3JkZXJlZE1lbWJlcnMoWyAxLCAyLCAzIF0sIFsgMiwgMSBdLCAnbm90IGluY2x1ZGUgb3JkZXJlZCBtZW1iZXJzJyk7XG4gICAqICAgICBhc3NlcnQubm90SW5jbHVkZU9yZGVyZWRNZW1iZXJzKFsgMSwgMiwgMyBdLCBbIDIsIDMgXSwgJ25vdCBpbmNsdWRlIG9yZGVyZWQgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBub3RJbmNsdWRlT3JkZXJlZE1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc3VwZXJzZXRcbiAgICogQHBhcmFtIHtBcnJheX0gc3Vic2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RJbmNsdWRlT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbiAoc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzdXBlcnNldCwgbXNnLCBhc3NlcnQubm90SW5jbHVkZU9yZGVyZWRNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLm5vdC5pbmNsdWRlLm9yZGVyZWQubWVtYmVycyhzdWJzZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuaW5jbHVkZURlZXBPcmRlcmVkTWVtYmVycyhzdXBlcnNldCwgc3Vic2V0LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgc3Vic2V0YCBpcyBpbmNsdWRlZCBpbiBgc3VwZXJzZXRgIGluIHRoZSBzYW1lIG9yZGVyXG4gICAqIGJlZ2lubmluZyB3aXRoIHRoZSBmaXJzdCBlbGVtZW50IGluIGBzdXBlcnNldGAuIFVzZXMgYSBkZWVwIGVxdWFsaXR5XG4gICAqIGNoZWNrLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMoWyB7IGE6IDEgfSwgeyBiOiAyIH0sIHsgYzogMyB9IF0sIFsgeyBhOiAxIH0sIHsgYjogMiB9IF0sICdpbmNsdWRlIGRlZXAgb3JkZXJlZCBtZW1iZXJzJyk7XG4gICAqXG4gICAqIEBuYW1lIGluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc3VwZXJzZXRcbiAgICogQHBhcmFtIHtBcnJheX0gc3Vic2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24gKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc3VwZXJzZXQsIG1zZywgYXNzZXJ0LmluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMsIHRydWUpXG4gICAgICAudG8uaW5jbHVkZS5kZWVwLm9yZGVyZWQubWVtYmVycyhzdWJzZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAubm90SW5jbHVkZURlZXBPcmRlcmVkTWVtYmVycyhzdXBlcnNldCwgc3Vic2V0LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgc3Vic2V0YCBpc24ndCBpbmNsdWRlZCBpbiBgc3VwZXJzZXRgIGluIHRoZSBzYW1lIG9yZGVyXG4gICAqIGJlZ2lubmluZyB3aXRoIHRoZSBmaXJzdCBlbGVtZW50IGluIGBzdXBlcnNldGAuIFVzZXMgYSBkZWVwIGVxdWFsaXR5XG4gICAqIGNoZWNrLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdEluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMoWyB7IGE6IDEgfSwgeyBiOiAyIH0sIHsgYzogMyB9IF0sIFsgeyBhOiAxIH0sIHsgZjogNSB9IF0sICdub3QgaW5jbHVkZSBkZWVwIG9yZGVyZWQgbWVtYmVycycpO1xuICAgKiAgICAgYXNzZXJ0Lm5vdEluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMoWyB7IGE6IDEgfSwgeyBiOiAyIH0sIHsgYzogMyB9IF0sIFsgeyBiOiAyIH0sIHsgYTogMSB9IF0sICdub3QgaW5jbHVkZSBkZWVwIG9yZGVyZWQgbWVtYmVycycpO1xuICAgKiAgICAgYXNzZXJ0Lm5vdEluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMoWyB7IGE6IDEgfSwgeyBiOiAyIH0sIHsgYzogMyB9IF0sIFsgeyBiOiAyIH0sIHsgYzogMyB9IF0sICdub3QgaW5jbHVkZSBkZWVwIG9yZGVyZWQgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBub3RJbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1cGVyc2V0XG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1YnNldFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90SW5jbHVkZURlZXBPcmRlcmVkTWVtYmVycyA9IGZ1bmN0aW9uIChzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1cGVyc2V0LCBtc2csIGFzc2VydC5ub3RJbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLm5vdC5pbmNsdWRlLmRlZXAub3JkZXJlZC5tZW1iZXJzKHN1YnNldCk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5vbmVPZihpbkxpc3QsIGxpc3QsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IG5vbi1vYmplY3QsIG5vbi1hcnJheSB2YWx1ZSBgaW5MaXN0YCBhcHBlYXJzIGluIHRoZSBmbGF0IGFycmF5IGBsaXN0YC5cbiAgICpcbiAgICogICAgIGFzc2VydC5vbmVPZigxLCBbIDIsIDEgXSwgJ05vdCBmb3VuZCBpbiBsaXN0Jyk7XG4gICAqXG4gICAqIEBuYW1lIG9uZU9mXG4gICAqIEBwYXJhbSB7Kn0gaW5MaXN0XG4gICAqIEBwYXJhbSB7QXJyYXk8Kj59IGxpc3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm9uZU9mID0gZnVuY3Rpb24gKGluTGlzdCwgbGlzdCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihpbkxpc3QsIG1zZywgYXNzZXJ0Lm9uZU9mLCB0cnVlKS50by5iZS5vbmVPZihsaXN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmNoYW5nZXMoZnVuY3Rpb24sIG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGEgZnVuY3Rpb24gY2hhbmdlcyB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eS5cbiAgICpcbiAgICogICAgIHZhciBvYmogPSB7IHZhbDogMTAgfTtcbiAgICogICAgIHZhciBmbiA9IGZ1bmN0aW9uKCkgeyBvYmoudmFsID0gMjIgfTtcbiAgICogICAgIGFzc2VydC5jaGFuZ2VzKGZuLCBvYmosICd2YWwnKTtcbiAgICpcbiAgICogQG5hbWUgY2hhbmdlc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2RpZmllciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IG9yIGdldHRlciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmNoYW5nZXMgPSBmdW5jdGlvbiAoZm4sIG9iaiwgcHJvcCwgbXNnKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbXNnID0gcHJvcDtcbiAgICAgIHByb3AgPSBudWxsO1xuICAgIH1cblxuICAgIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmNoYW5nZXMsIHRydWUpLnRvLmNoYW5nZShvYmosIHByb3ApO1xuICB9XG5cbiAgIC8qKlxuICAgKiAjIyMgLmNoYW5nZXNCeShmdW5jdGlvbiwgb2JqZWN0LCBwcm9wZXJ0eSwgZGVsdGEsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGEgZnVuY3Rpb24gY2hhbmdlcyB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBieSBhbiBhbW91bnQgKGRlbHRhKS5cbiAgICpcbiAgICogICAgIHZhciBvYmogPSB7IHZhbDogMTAgfTtcbiAgICogICAgIHZhciBmbiA9IGZ1bmN0aW9uKCkgeyBvYmoudmFsICs9IDIgfTtcbiAgICogICAgIGFzc2VydC5jaGFuZ2VzQnkoZm4sIG9iaiwgJ3ZhbCcsIDIpO1xuICAgKlxuICAgKiBAbmFtZSBjaGFuZ2VzQnlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvciBnZXR0ZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge051bWJlcn0gY2hhbmdlIGFtb3VudCAoZGVsdGEpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmNoYW5nZXNCeSA9IGZ1bmN0aW9uIChmbiwgb2JqLCBwcm9wLCBkZWx0YSwgbXNnKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQgJiYgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIHRtcE1zZyA9IGRlbHRhO1xuICAgICAgZGVsdGEgPSBwcm9wO1xuICAgICAgbXNnID0gdG1wTXNnO1xuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgZGVsdGEgPSBwcm9wO1xuICAgICAgcHJvcCA9IG51bGw7XG4gICAgfVxuXG4gICAgbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuY2hhbmdlc0J5LCB0cnVlKVxuICAgICAgLnRvLmNoYW5nZShvYmosIHByb3ApLmJ5KGRlbHRhKTtcbiAgfVxuXG4gICAvKipcbiAgICogIyMjIC5kb2VzTm90Q2hhbmdlKGZ1bmN0aW9uLCBvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBhIGZ1bmN0aW9uIGRvZXMgbm90IGNoYW5nZSB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eS5cbiAgICpcbiAgICogICAgIHZhciBvYmogPSB7IHZhbDogMTAgfTtcbiAgICogICAgIHZhciBmbiA9IGZ1bmN0aW9uKCkgeyBjb25zb2xlLmxvZygnZm9vJyk7IH07XG4gICAqICAgICBhc3NlcnQuZG9lc05vdENoYW5nZShmbiwgb2JqLCAndmFsJyk7XG4gICAqXG4gICAqIEBuYW1lIGRvZXNOb3RDaGFuZ2VcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvciBnZXR0ZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kb2VzTm90Q2hhbmdlID0gZnVuY3Rpb24gKGZuLCBvYmosIHByb3AsIG1zZykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG1zZyA9IHByb3A7XG4gICAgICBwcm9wID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuZG9lc05vdENoYW5nZSwgdHJ1ZSlcbiAgICAgIC50by5ub3QuY2hhbmdlKG9iaiwgcHJvcCk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5jaGFuZ2VzQnV0Tm90QnkoZnVuY3Rpb24sIG9iamVjdCwgcHJvcGVydHksIGRlbHRhLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBhIGZ1bmN0aW9uIGRvZXMgbm90IGNoYW5nZSB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBvciBvZiBhIGZ1bmN0aW9uJ3MgcmV0dXJuIHZhbHVlIGJ5IGFuIGFtb3VudCAoZGVsdGEpXG4gICAqXG4gICAqICAgICB2YXIgb2JqID0geyB2YWw6IDEwIH07XG4gICAqICAgICB2YXIgZm4gPSBmdW5jdGlvbigpIHsgb2JqLnZhbCArPSAxMCB9O1xuICAgKiAgICAgYXNzZXJ0LmNoYW5nZXNCdXROb3RCeShmbiwgb2JqLCAndmFsJywgNSk7XG4gICAqXG4gICAqIEBuYW1lIGNoYW5nZXNCdXROb3RCeVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2RpZmllciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IG9yIGdldHRlciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjaGFuZ2UgYW1vdW50IChkZWx0YSlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuY2hhbmdlc0J1dE5vdEJ5ID0gZnVuY3Rpb24gKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdG1wTXNnID0gZGVsdGE7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBtc2cgPSB0bXBNc2c7XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBwcm9wID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5jaGFuZ2VzQnV0Tm90QnksIHRydWUpXG4gICAgICAudG8uY2hhbmdlKG9iaiwgcHJvcCkuYnV0Lm5vdC5ieShkZWx0YSk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5pbmNyZWFzZXMoZnVuY3Rpb24sIG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGEgZnVuY3Rpb24gaW5jcmVhc2VzIGEgbnVtZXJpYyBvYmplY3QgcHJvcGVydHkuXG4gICAqXG4gICAqICAgICB2YXIgb2JqID0geyB2YWw6IDEwIH07XG4gICAqICAgICB2YXIgZm4gPSBmdW5jdGlvbigpIHsgb2JqLnZhbCA9IDEzIH07XG4gICAqICAgICBhc3NlcnQuaW5jcmVhc2VzKGZuLCBvYmosICd2YWwnKTtcbiAgICpcbiAgICogQG5hbWUgaW5jcmVhc2VzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZGlmaWVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3Qgb3IgZ2V0dGVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eSBuYW1lIF9vcHRpb25hbF9cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaW5jcmVhc2VzID0gZnVuY3Rpb24gKGZuLCBvYmosIHByb3AsIG1zZykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG1zZyA9IHByb3A7XG4gICAgICBwcm9wID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuaW5jcmVhc2VzLCB0cnVlKVxuICAgICAgLnRvLmluY3JlYXNlKG9iaiwgcHJvcCk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5pbmNyZWFzZXNCeShmdW5jdGlvbiwgb2JqZWN0LCBwcm9wZXJ0eSwgZGVsdGEsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGEgZnVuY3Rpb24gaW5jcmVhc2VzIGEgbnVtZXJpYyBvYmplY3QgcHJvcGVydHkgb3IgYSBmdW5jdGlvbidzIHJldHVybiB2YWx1ZSBieSBhbiBhbW91bnQgKGRlbHRhKS5cbiAgICpcbiAgICogICAgIHZhciBvYmogPSB7IHZhbDogMTAgfTtcbiAgICogICAgIHZhciBmbiA9IGZ1bmN0aW9uKCkgeyBvYmoudmFsICs9IDEwIH07XG4gICAqICAgICBhc3NlcnQuaW5jcmVhc2VzQnkoZm4sIG9iaiwgJ3ZhbCcsIDEwKTtcbiAgICpcbiAgICogQG5hbWUgaW5jcmVhc2VzQnlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvciBnZXR0ZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge051bWJlcn0gY2hhbmdlIGFtb3VudCAoZGVsdGEpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmluY3JlYXNlc0J5ID0gZnVuY3Rpb24gKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdG1wTXNnID0gZGVsdGE7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBtc2cgPSB0bXBNc2c7XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBwcm9wID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5pbmNyZWFzZXNCeSwgdHJ1ZSlcbiAgICAgIC50by5pbmNyZWFzZShvYmosIHByb3ApLmJ5KGRlbHRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmRvZXNOb3RJbmNyZWFzZShmdW5jdGlvbiwgb2JqZWN0LCBwcm9wZXJ0eSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYSBmdW5jdGlvbiBkb2VzIG5vdCBpbmNyZWFzZSBhIG51bWVyaWMgb2JqZWN0IHByb3BlcnR5LlxuICAgKlxuICAgKiAgICAgdmFyIG9iaiA9IHsgdmFsOiAxMCB9O1xuICAgKiAgICAgdmFyIGZuID0gZnVuY3Rpb24oKSB7IG9iai52YWwgPSA4IH07XG4gICAqICAgICBhc3NlcnQuZG9lc05vdEluY3JlYXNlKGZuLCBvYmosICd2YWwnKTtcbiAgICpcbiAgICogQG5hbWUgZG9lc05vdEluY3JlYXNlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZGlmaWVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3Qgb3IgZ2V0dGVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eSBuYW1lIF9vcHRpb25hbF9cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZG9lc05vdEluY3JlYXNlID0gZnVuY3Rpb24gKGZuLCBvYmosIHByb3AsIG1zZykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG1zZyA9IHByb3A7XG4gICAgICBwcm9wID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuZG9lc05vdEluY3JlYXNlLCB0cnVlKVxuICAgICAgLnRvLm5vdC5pbmNyZWFzZShvYmosIHByb3ApO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuaW5jcmVhc2VzQnV0Tm90QnkoZnVuY3Rpb24sIG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGEgZnVuY3Rpb24gZG9lcyBub3QgaW5jcmVhc2UgYSBudW1lcmljIG9iamVjdCBwcm9wZXJ0eSBvciBmdW5jdGlvbidzIHJldHVybiB2YWx1ZSBieSBhbiBhbW91bnQgKGRlbHRhKS5cbiAgICpcbiAgICogICAgIHZhciBvYmogPSB7IHZhbDogMTAgfTtcbiAgICogICAgIHZhciBmbiA9IGZ1bmN0aW9uKCkgeyBvYmoudmFsID0gMTUgfTtcbiAgICogICAgIGFzc2VydC5pbmNyZWFzZXNCdXROb3RCeShmbiwgb2JqLCAndmFsJywgMTApO1xuICAgKlxuICAgKiBAbmFtZSBpbmNyZWFzZXNCdXROb3RCeVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2RpZmllciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IG9yIGdldHRlciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjaGFuZ2UgYW1vdW50IChkZWx0YSlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaW5jcmVhc2VzQnV0Tm90QnkgPSBmdW5jdGlvbiAoZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciB0bXBNc2cgPSBkZWx0YTtcbiAgICAgIGRlbHRhID0gcHJvcDtcbiAgICAgIG1zZyA9IHRtcE1zZztcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgIGRlbHRhID0gcHJvcDtcbiAgICAgIHByb3AgPSBudWxsO1xuICAgIH1cblxuICAgIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmluY3JlYXNlc0J1dE5vdEJ5LCB0cnVlKVxuICAgICAgLnRvLmluY3JlYXNlKG9iaiwgcHJvcCkuYnV0Lm5vdC5ieShkZWx0YSk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5kZWNyZWFzZXMoZnVuY3Rpb24sIG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGEgZnVuY3Rpb24gZGVjcmVhc2VzIGEgbnVtZXJpYyBvYmplY3QgcHJvcGVydHkuXG4gICAqXG4gICAqICAgICB2YXIgb2JqID0geyB2YWw6IDEwIH07XG4gICAqICAgICB2YXIgZm4gPSBmdW5jdGlvbigpIHsgb2JqLnZhbCA9IDUgfTtcbiAgICogICAgIGFzc2VydC5kZWNyZWFzZXMoZm4sIG9iaiwgJ3ZhbCcpO1xuICAgKlxuICAgKiBAbmFtZSBkZWNyZWFzZXNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvciBnZXR0ZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kZWNyZWFzZXMgPSBmdW5jdGlvbiAoZm4sIG9iaiwgcHJvcCwgbXNnKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbXNnID0gcHJvcDtcbiAgICAgIHByb3AgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kZWNyZWFzZXMsIHRydWUpXG4gICAgICAudG8uZGVjcmVhc2Uob2JqLCBwcm9wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmRlY3JlYXNlc0J5KGZ1bmN0aW9uLCBvYmplY3QsIHByb3BlcnR5LCBkZWx0YSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYSBmdW5jdGlvbiBkZWNyZWFzZXMgYSBudW1lcmljIG9iamVjdCBwcm9wZXJ0eSBvciBhIGZ1bmN0aW9uJ3MgcmV0dXJuIHZhbHVlIGJ5IGFuIGFtb3VudCAoZGVsdGEpXG4gICAqXG4gICAqICAgICB2YXIgb2JqID0geyB2YWw6IDEwIH07XG4gICAqICAgICB2YXIgZm4gPSBmdW5jdGlvbigpIHsgb2JqLnZhbCAtPSA1IH07XG4gICAqICAgICBhc3NlcnQuZGVjcmVhc2VzQnkoZm4sIG9iaiwgJ3ZhbCcsIDUpO1xuICAgKlxuICAgKiBAbmFtZSBkZWNyZWFzZXNCeVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2RpZmllciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IG9yIGdldHRlciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjaGFuZ2UgYW1vdW50IChkZWx0YSlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZGVjcmVhc2VzQnkgPSBmdW5jdGlvbiAoZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciB0bXBNc2cgPSBkZWx0YTtcbiAgICAgIGRlbHRhID0gcHJvcDtcbiAgICAgIG1zZyA9IHRtcE1zZztcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgIGRlbHRhID0gcHJvcDtcbiAgICAgIHByb3AgPSBudWxsO1xuICAgIH1cblxuICAgIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRlY3JlYXNlc0J5LCB0cnVlKVxuICAgICAgLnRvLmRlY3JlYXNlKG9iaiwgcHJvcCkuYnkoZGVsdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuZG9lc05vdERlY3JlYXNlKGZ1bmN0aW9uLCBvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBhIGZ1bmN0aW9uIGRvZXMgbm90IGRlY3JlYXNlcyBhIG51bWVyaWMgb2JqZWN0IHByb3BlcnR5LlxuICAgKlxuICAgKiAgICAgdmFyIG9iaiA9IHsgdmFsOiAxMCB9O1xuICAgKiAgICAgdmFyIGZuID0gZnVuY3Rpb24oKSB7IG9iai52YWwgPSAxNSB9O1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3REZWNyZWFzZShmbiwgb2JqLCAndmFsJyk7XG4gICAqXG4gICAqIEBuYW1lIGRvZXNOb3REZWNyZWFzZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2RpZmllciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IG9yIGdldHRlciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRvZXNOb3REZWNyZWFzZSA9IGZ1bmN0aW9uIChmbiwgb2JqLCBwcm9wLCBtc2cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtc2cgPSBwcm9wO1xuICAgICAgcHJvcCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRvZXNOb3REZWNyZWFzZSwgdHJ1ZSlcbiAgICAgIC50by5ub3QuZGVjcmVhc2Uob2JqLCBwcm9wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmRvZXNOb3REZWNyZWFzZUJ5KGZ1bmN0aW9uLCBvYmplY3QsIHByb3BlcnR5LCBkZWx0YSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYSBmdW5jdGlvbiBkb2VzIG5vdCBkZWNyZWFzZXMgYSBudW1lcmljIG9iamVjdCBwcm9wZXJ0eSBvciBhIGZ1bmN0aW9uJ3MgcmV0dXJuIHZhbHVlIGJ5IGFuIGFtb3VudCAoZGVsdGEpXG4gICAqXG4gICAqICAgICB2YXIgb2JqID0geyB2YWw6IDEwIH07XG4gICAqICAgICB2YXIgZm4gPSBmdW5jdGlvbigpIHsgb2JqLnZhbCA9IDUgfTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90RGVjcmVhc2VCeShmbiwgb2JqLCAndmFsJywgMSk7XG4gICAqXG4gICAqIEBuYW1lIGRvZXNOb3REZWNyZWFzZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2RpZmllciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IG9yIGdldHRlciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjaGFuZ2UgYW1vdW50IChkZWx0YSlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZG9lc05vdERlY3JlYXNlQnkgPSBmdW5jdGlvbiAoZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciB0bXBNc2cgPSBkZWx0YTtcbiAgICAgIGRlbHRhID0gcHJvcDtcbiAgICAgIG1zZyA9IHRtcE1zZztcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgIGRlbHRhID0gcHJvcDtcbiAgICAgIHByb3AgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kb2VzTm90RGVjcmVhc2VCeSwgdHJ1ZSlcbiAgICAgIC50by5ub3QuZGVjcmVhc2Uob2JqLCBwcm9wKS5ieShkZWx0YSk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5kZWNyZWFzZXNCdXROb3RCeShmdW5jdGlvbiwgb2JqZWN0LCBwcm9wZXJ0eSwgZGVsdGEsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGEgZnVuY3Rpb24gZG9lcyBub3QgZGVjcmVhc2VzIGEgbnVtZXJpYyBvYmplY3QgcHJvcGVydHkgb3IgYSBmdW5jdGlvbidzIHJldHVybiB2YWx1ZSBieSBhbiBhbW91bnQgKGRlbHRhKVxuICAgKlxuICAgKiAgICAgdmFyIG9iaiA9IHsgdmFsOiAxMCB9O1xuICAgKiAgICAgdmFyIGZuID0gZnVuY3Rpb24oKSB7IG9iai52YWwgPSA1IH07XG4gICAqICAgICBhc3NlcnQuZGVjcmVhc2VzQnV0Tm90QnkoZm4sIG9iaiwgJ3ZhbCcsIDEpO1xuICAgKlxuICAgKiBAbmFtZSBkZWNyZWFzZXNCdXROb3RCeVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2RpZmllciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IG9yIGdldHRlciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjaGFuZ2UgYW1vdW50IChkZWx0YSlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZGVjcmVhc2VzQnV0Tm90QnkgPSBmdW5jdGlvbiAoZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciB0bXBNc2cgPSBkZWx0YTtcbiAgICAgIGRlbHRhID0gcHJvcDtcbiAgICAgIG1zZyA9IHRtcE1zZztcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgIGRlbHRhID0gcHJvcDtcbiAgICAgIHByb3AgPSBudWxsO1xuICAgIH1cblxuICAgIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRlY3JlYXNlc0J1dE5vdEJ5LCB0cnVlKVxuICAgICAgLnRvLmRlY3JlYXNlKG9iaiwgcHJvcCkuYnV0Lm5vdC5ieShkZWx0YSk7XG4gIH1cblxuICAvKiFcbiAgICogIyMjIC5pZkVycm9yKG9iamVjdClcbiAgICpcbiAgICogQXNzZXJ0cyBpZiB2YWx1ZSBpcyBub3QgYSBmYWxzZSB2YWx1ZSwgYW5kIHRocm93cyBpZiBpdCBpcyBhIHRydWUgdmFsdWUuXG4gICAqIFRoaXMgaXMgYWRkZWQgdG8gYWxsb3cgZm9yIGNoYWkgdG8gYmUgYSBkcm9wLWluIHJlcGxhY2VtZW50IGZvciBOb2RlJ3NcbiAgICogYXNzZXJ0IGNsYXNzLlxuICAgKlxuICAgKiAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSSBhbSBhIGN1c3RvbSBlcnJvcicpO1xuICAgKiAgICAgYXNzZXJ0LmlmRXJyb3IoZXJyKTsgLy8gUmV0aHJvd3MgZXJyIVxuICAgKlxuICAgKiBAbmFtZSBpZkVycm9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlmRXJyb3IgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgdGhyb3codmFsKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNFeHRlbnNpYmxlKG9iamVjdClcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGlzIGV4dGVuc2libGUgKGNhbiBoYXZlIG5ldyBwcm9wZXJ0aWVzIGFkZGVkIHRvIGl0KS5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc0V4dGVuc2libGUoe30pO1xuICAgKlxuICAgKiBAbmFtZSBpc0V4dGVuc2libGVcbiAgICogQGFsaWFzIGV4dGVuc2libGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0V4dGVuc2libGUgPSBmdW5jdGlvbiAob2JqLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaXNFeHRlbnNpYmxlLCB0cnVlKS50by5iZS5leHRlbnNpYmxlO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90RXh0ZW5zaWJsZShvYmplY3QpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBpcyBfbm90XyBleHRlbnNpYmxlLlxuICAgKlxuICAgKiAgICAgdmFyIG5vbkV4dGVuc2libGVPYmplY3QgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pO1xuICAgKiAgICAgdmFyIHNlYWxlZE9iamVjdCA9IE9iamVjdC5zZWFsKHt9KTtcbiAgICogICAgIHZhciBmcm96ZW5PYmplY3QgPSBPYmplY3QuZnJlZXplKHt9KTtcbiAgICpcbiAgICogICAgIGFzc2VydC5pc05vdEV4dGVuc2libGUobm9uRXh0ZW5zaWJsZU9iamVjdCk7XG4gICAqICAgICBhc3NlcnQuaXNOb3RFeHRlbnNpYmxlKHNlYWxlZE9iamVjdCk7XG4gICAqICAgICBhc3NlcnQuaXNOb3RFeHRlbnNpYmxlKGZyb3plbk9iamVjdCk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90RXh0ZW5zaWJsZVxuICAgKiBAYWxpYXMgbm90RXh0ZW5zaWJsZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90RXh0ZW5zaWJsZSA9IGZ1bmN0aW9uIChvYmosIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5pc05vdEV4dGVuc2libGUsIHRydWUpLnRvLm5vdC5iZS5leHRlbnNpYmxlO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzU2VhbGVkKG9iamVjdClcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGlzIHNlYWxlZCAoY2Fubm90IGhhdmUgbmV3IHByb3BlcnRpZXMgYWRkZWQgdG8gaXRcbiAgICogYW5kIGl0cyBleGlzdGluZyBwcm9wZXJ0aWVzIGNhbm5vdCBiZSByZW1vdmVkKS5cbiAgICpcbiAgICogICAgIHZhciBzZWFsZWRPYmplY3QgPSBPYmplY3Quc2VhbCh7fSk7XG4gICAqICAgICB2YXIgZnJvemVuT2JqZWN0ID0gT2JqZWN0LnNlYWwoe30pO1xuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzU2VhbGVkKHNlYWxlZE9iamVjdCk7XG4gICAqICAgICBhc3NlcnQuaXNTZWFsZWQoZnJvemVuT2JqZWN0KTtcbiAgICpcbiAgICogQG5hbWUgaXNTZWFsZWRcbiAgICogQGFsaWFzIHNlYWxlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzU2VhbGVkID0gZnVuY3Rpb24gKG9iaiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmlzU2VhbGVkLCB0cnVlKS50by5iZS5zZWFsZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RTZWFsZWQob2JqZWN0KVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaXMgX25vdF8gc2VhbGVkLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzTm90U2VhbGVkKHt9KTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3RTZWFsZWRcbiAgICogQGFsaWFzIG5vdFNlYWxlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90U2VhbGVkID0gZnVuY3Rpb24gKG9iaiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmlzTm90U2VhbGVkLCB0cnVlKS50by5ub3QuYmUuc2VhbGVkO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzRnJvemVuKG9iamVjdClcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGlzIGZyb3plbiAoY2Fubm90IGhhdmUgbmV3IHByb3BlcnRpZXMgYWRkZWQgdG8gaXRcbiAgICogYW5kIGl0cyBleGlzdGluZyBwcm9wZXJ0aWVzIGNhbm5vdCBiZSBtb2RpZmllZCkuXG4gICAqXG4gICAqICAgICB2YXIgZnJvemVuT2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG4gICAqICAgICBhc3NlcnQuZnJvemVuKGZyb3plbk9iamVjdCk7XG4gICAqXG4gICAqIEBuYW1lIGlzRnJvemVuXG4gICAqIEBhbGlhcyBmcm96ZW5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0Zyb3plbiA9IGZ1bmN0aW9uIChvYmosIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5pc0Zyb3plbiwgdHJ1ZSkudG8uYmUuZnJvemVuO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90RnJvemVuKG9iamVjdClcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGlzIF9ub3RfIGZyb3plbi5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc05vdEZyb3plbih7fSk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90RnJvemVuXG4gICAqIEBhbGlhcyBub3RGcm96ZW5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdEZyb3plbiA9IGZ1bmN0aW9uIChvYmosIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5pc05vdEZyb3plbiwgdHJ1ZSkudG8ubm90LmJlLmZyb3plbjtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc0VtcHR5KHRhcmdldClcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiBhbnkgdmFsdWVzLlxuICAgKiBGb3IgYXJyYXlzIGFuZCBzdHJpbmdzLCBpdCBjaGVja3MgdGhlIGBsZW5ndGhgIHByb3BlcnR5LlxuICAgKiBGb3IgYE1hcGAgYW5kIGBTZXRgIGluc3RhbmNlcywgaXQgY2hlY2tzIHRoZSBgc2l6ZWAgcHJvcGVydHkuXG4gICAqIEZvciBub24tZnVuY3Rpb24gb2JqZWN0cywgaXQgZ2V0cyB0aGUgY291bnQgb2Ygb3duXG4gICAqIGVudW1lcmFibGUgc3RyaW5nIGtleXMuXG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNFbXB0eShbXSk7XG4gICAqICAgICBhc3NlcnQuaXNFbXB0eSgnJyk7XG4gICAqICAgICBhc3NlcnQuaXNFbXB0eShuZXcgTWFwKTtcbiAgICogICAgIGFzc2VydC5pc0VtcHR5KHt9KTtcbiAgICpcbiAgICogQG5hbWUgaXNFbXB0eVxuICAgKiBAYWxpYXMgZW1wdHlcbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8U3RyaW5nfE1hcHxTZXR9IHRhcmdldFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0VtcHR5ID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNFbXB0eSwgdHJ1ZSkudG8uYmUuZW1wdHk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RFbXB0eSh0YXJnZXQpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGNvbnRhaW5zIHZhbHVlcy5cbiAgICogRm9yIGFycmF5cyBhbmQgc3RyaW5ncywgaXQgY2hlY2tzIHRoZSBgbGVuZ3RoYCBwcm9wZXJ0eS5cbiAgICogRm9yIGBNYXBgIGFuZCBgU2V0YCBpbnN0YW5jZXMsIGl0IGNoZWNrcyB0aGUgYHNpemVgIHByb3BlcnR5LlxuICAgKiBGb3Igbm9uLWZ1bmN0aW9uIG9iamVjdHMsIGl0IGdldHMgdGhlIGNvdW50IG9mIG93blxuICAgKiBlbnVtZXJhYmxlIHN0cmluZyBrZXlzLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzTm90RW1wdHkoWzEsIDJdKTtcbiAgICogICAgIGFzc2VydC5pc05vdEVtcHR5KCczNCcpO1xuICAgKiAgICAgYXNzZXJ0LmlzTm90RW1wdHkobmV3IFNldChbNSwgNl0pKTtcbiAgICogICAgIGFzc2VydC5pc05vdEVtcHR5KHsga2V5OiA3IH0pO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdEVtcHR5XG4gICAqIEBhbGlhcyBub3RFbXB0eVxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxTdHJpbmd8TWFwfFNldH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90RW1wdHkgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdEVtcHR5LCB0cnVlKS50by5ub3QuYmUuZW1wdHk7XG4gIH07XG5cbiAgLyohXG4gICAqIEFsaWFzZXMuXG4gICAqL1xuXG4gIChmdW5jdGlvbiBhbGlhcyhuYW1lLCBhcyl7XG4gICAgYXNzZXJ0W2FzXSA9IGFzc2VydFtuYW1lXTtcbiAgICByZXR1cm4gYWxpYXM7XG4gIH0pXG4gICgnaXNPaycsICdvaycpXG4gICgnaXNOb3RPaycsICdub3RPaycpXG4gICgndGhyb3dzJywgJ3Rocm93JylcbiAgKCd0aHJvd3MnLCAnVGhyb3cnKVxuICAoJ2lzRXh0ZW5zaWJsZScsICdleHRlbnNpYmxlJylcbiAgKCdpc05vdEV4dGVuc2libGUnLCAnbm90RXh0ZW5zaWJsZScpXG4gICgnaXNTZWFsZWQnLCAnc2VhbGVkJylcbiAgKCdpc05vdFNlYWxlZCcsICdub3RTZWFsZWQnKVxuICAoJ2lzRnJvemVuJywgJ2Zyb3plbicpXG4gICgnaXNOb3RGcm96ZW4nLCAnbm90RnJvemVuJylcbiAgKCdpc0VtcHR5JywgJ2VtcHR5JylcbiAgKCdpc05vdEVtcHR5JywgJ25vdEVtcHR5Jyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS9pbnRlcmZhY2UvYXNzZXJ0LmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwic291cmNlUm9vdCI6IiJ9