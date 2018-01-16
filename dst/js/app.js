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
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Type;
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
const VOID0 = void (0), _BOOLEAN = typeof true, _NUMBER = typeof 0, _STRING = typeof "", _SYMBOL = "symbol", _OBJECT = typeof {}, _UNDEFINED = typeof VOID0, _FUNCTION = typeof function () { }, LENGTH = "length";
// Only used for primitives.
const typeInfoRegistry = {};
/**
 * Exposes easy access to type information including inquiring about members.
 */
class TypeInfo {
    constructor(target, onBeforeFreeze) {
        this.isBoolean = false;
        this.isNumber = false;
        this.isString = false;
        this.isTrueNaN = false;
        this.isObject = false;
        this.isFunction = false;
        this.isUndefined = false;
        this.isNull = false;
        this.isPrimitive = false;
        this.isSymbol = false;
        switch (this.type = typeof target) {
            case _BOOLEAN:
                this.isBoolean = true;
                this.isPrimitive = true;
                break;
            case _NUMBER:
                this.isNumber = true;
                this.isTrueNaN = isNaN(target);
                this.isFinite = isFinite(target);
                this.isValidNumber = !this.isTrueNaN;
                this.isPrimitive = true;
                break;
            case _STRING:
                this.isString = true;
                this.isPrimitive = true;
                break;
            case _SYMBOL:
                this.isSymbol = true;
                break;
            case _OBJECT:
                this.target = target;
                if (target === null) {
                    this.isNull = true;
                    this.isNullOrUndefined = true;
                    this.isPrimitive = true;
                }
                else {
                    this.isArray = (target) instanceof (Array);
                    this.isObject = true;
                }
                break;
            case _FUNCTION:
                this.target = target;
                this.isFunction = true;
                break;
            case _UNDEFINED:
                this.isUndefined = true;
                this.isNullOrUndefined = true;
                this.isPrimitive = true;
                break;
            default:
                throw "Fatal type failure.  Unknown type: " + this.type;
        }
        if (onBeforeFreeze)
            onBeforeFreeze(this);
        Object.freeze(this);
    }
    /**
     * Returns a TypeInfo for any member or non-member,
     * where non-members are of type undefined.
     * @param name
     * @returns {TypeInfo}
     */
    member(name) {
        const t = this.target;
        return TypeInfo.getFor(t && (name) in (t)
            ? t[name]
            : VOID0);
    }
    /**
     * Returns a TypeInfo for any target object.
     * If the target object is of a primitive type, it returns the TypeInfo instance assigned to that type.
     * @param target
     * @returns {TypeInfo}
     */
    static getFor(target) {
        const type = typeof target;
        switch (type) {
            case _OBJECT:
            case _FUNCTION:
                return new TypeInfo(target);
        }
        let info = typeInfoRegistry[type];
        if (!info)
            typeInfoRegistry[type] = info = new TypeInfo(target);
        return info;
    }
    /**
     * Returns true if the target matches the type (instanceof).
     * @param type
     * @returns {boolean}
     */
    is(type) {
        return this.target instanceof type;
    }
    /**
     * Returns null if the target does not match the type (instanceof).
     * Otherwise returns the target as the type.
     * @param type
     * @returns {T|null}
     */
    as(type) {
        return this.target instanceof type ? this.target : null;
    }
}
/* unused harmony export TypeInfo */

function Type(target) {
    return new TypeInfo(target);
}
(function (Type) {
    /**
     * typeof true
     * @type {string}
     */
    Type.BOOLEAN = _BOOLEAN;
    /**
     * typeof 0
     * @type {string}
     */
    Type.NUMBER = _NUMBER;
    /**
     * typeof ""
     * @type {string}
     */
    Type.STRING = _STRING;
    /**
     * typeof {}
     * @type {string}
     */
    Type.OBJECT = _OBJECT;
    /**
     * typeof Symbol
     * @type {string}
     */
    Type.SYMBOL = _SYMBOL;
    /**
     * typeof undefined
     * @type {string}
     */
    Type.UNDEFINED = _UNDEFINED;
    /**
     * typeof function
     * @type {string}
     */
    Type.FUNCTION = _FUNCTION;
    /**
     * Returns true if the target matches the type (instanceof).
     * @param target
     * @param type
     * @returns {T|null}
     */
    function is(target, type) {
        return target instanceof type;
    }
    Type.is = is;
    /**
     * Returns null if the target does not match the type (instanceof).
     * Otherwise returns the target as the type.
     * @param target
     * @param type
     * @returns {T|null}
     */
    function as(target, type) {
        return target instanceof type ? target : null;
    }
    Type.as = as;
    /**
     * Returns true if the value parameter is null or undefined.
     * @param value
     * @returns {boolean}
     */
    function isNullOrUndefined(value) {
        return value == null;
    }
    Type.isNullOrUndefined = isNullOrUndefined;
    /**
     * Returns true if the value parameter is a boolean.
     * @param value
     * @returns {boolean}
     */
    function isBoolean(value) {
        return typeof value === _BOOLEAN;
    }
    Type.isBoolean = isBoolean;
    /**
     * Returns true if the value parameter is a number.
     * @param value
     * @param ignoreNaN Default is false. When true, NaN is not considered a number and will return false.
     * @returns {boolean}
     */
    function isNumber(value, ignoreNaN = false) {
        return typeof value === _NUMBER && (!ignoreNaN || !isNaN(value));
    }
    Type.isNumber = isNumber;
    /**
     * Returns true if is a number and is NaN.
     * @param value
     * @returns {boolean}
     */
    function isTrueNaN(value) {
        return typeof value === _NUMBER && isNaN(value);
    }
    Type.isTrueNaN = isTrueNaN;
    /**
     * Returns true if the value parameter is a string.
     * @param value
     * @returns {boolean}
     */
    function isString(value) {
        return typeof value === _STRING;
    }
    Type.isString = isString;
    /**
     * Returns true if the value is a boolean, string, number, null, or undefined.
     * @param value
     * @param allowUndefined if set to true will return true if the value is undefined.
     * @returns {boolean}
     */
    function isPrimitive(value, allowUndefined = false) {
        const t = typeof value;
        switch (t) {
            case _BOOLEAN:
            case _STRING:
            case _NUMBER:
                return true;
            case _UNDEFINED:
                return allowUndefined;
            case _OBJECT:
                return value === null;
        }
        return false;
    }
    Type.isPrimitive = isPrimitive;
    /**
     * For detecting if the value can be used as a key.
     * @param value
     * @param allowUndefined
     * @returns {boolean|boolean}
     */
    function isPrimitiveOrSymbol(value, allowUndefined = false) {
        return typeof value === _SYMBOL ? true : isPrimitive(value, allowUndefined);
    }
    Type.isPrimitiveOrSymbol = isPrimitiveOrSymbol;
    /**
     * Returns true if the value is a string, number, or symbol.
     * @param value
     * @returns {boolean}
     */
    function isPropertyKey(value) {
        const t = typeof value;
        switch (t) {
            case _STRING:
            case _NUMBER:
            case _SYMBOL:
                return true;
        }
        return false;
    }
    Type.isPropertyKey = isPropertyKey;
    /**
     * Returns true if the value parameter is a function.
     * @param value
     * @returns {boolean}
     */
    function isFunction(value) {
        return typeof value === _FUNCTION;
    }
    Type.isFunction = isFunction;
    /**
     * Returns true if the value parameter is an object.
     * @param value
     * @param allowNull If false (default) null is not considered an object.
     * @returns {boolean}
     */
    function isObject(value, allowNull = false) {
        return typeof value === _OBJECT && (allowNull || value !== null);
    }
    Type.isObject = isObject;
    /**
     * Guarantees a number value or NaN instead.
     * @param value
     * @returns {number}
     */
    function numberOrNaN(value) {
        return isNaN(value) ? NaN : value;
    }
    Type.numberOrNaN = numberOrNaN;
    /**
     * Returns a TypeInfo object for the target.
     * @param target
     * @returns {TypeInfo}
     */
    function of(target) {
        return TypeInfo.getFor(target);
    }
    Type.of = of;
    /**
     * Will detect if a member exists (using 'in').
     * Returns true if a property or method exists on the object or its prototype.
     * @param instance
     * @param property Name of the member.
     * @param ignoreUndefined When ignoreUndefined is true, if the member exists but is undefined, it will return false.
     * @returns {boolean}
     */
    function hasMember(instance, property, ignoreUndefined = true) {
        return instance && !isPrimitive(instance) && (property) in (instance) && (ignoreUndefined || instance[property] !== VOID0);
    }
    Type.hasMember = hasMember;
    /**
     * Returns true if the member matches the type.
     * @param instance
     * @param property
     * @param type
     * @returns {boolean}
     */
    function hasMemberOfType(instance, property, type) {
        return hasMember(instance, property) && typeof (instance[property]) === type;
    }
    Type.hasMemberOfType = hasMemberOfType;
    function hasMethod(instance, property) {
        return hasMemberOfType(instance, property, _FUNCTION);
    }
    Type.hasMethod = hasMethod;
    function isArrayLike(instance) {
        /*
         * NOTE:
         *
         * Functions:
         * Enumerating a function although it has a .length property will yield nothing or unexpected results.
         * Effectively, a function is not like an array.
         *
         * Strings:
         * Behave like arrays but don't have the same exact methods.
         */
        return instance instanceof Array
            || Type.isString(instance)
            || !Type.isFunction(instance) && hasMember(instance, LENGTH);
    }
    Type.isArrayLike = isArrayLike;
})(Type || (Type = {}));
Object.freeze(Type);
/* unused harmony default export */ var _unused_webpack_default_export = (Type);
//# sourceMappingURL=Types.js.map

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = areEqual;
/* harmony export (immutable) */ __webpack_exports__["b"] = compare;
/* unused harmony export areEquivalent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

var isTrueNaN = __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isTrueNaN;
const VOID0 = void 0;
/**
 * Used for special comparison including NaN.
 * @param a
 * @param b
 * @param strict
 * @returns {boolean|any}
 */
function areEqual(a, b, strict = true) {
    return a === b
        || !strict && a == b
        || isTrueNaN(a) && isTrueNaN(b);
}
const COMPARE_TO = "compareTo";
function compare(a, b, strict = true) {
    if (areEqual(a, b, strict))
        return 0 /* Equal */;
    if (a && __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].hasMember(a, COMPARE_TO))
        return a.compareTo(b); // If a has compareTo, use it.
    else if (b && __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].hasMember(b, COMPARE_TO))
        return -b.compareTo(a); // a doesn't have compareTo? check if b does and invert.
    // Allow for special inequality..
    if (a > b || strict && (a === 0 && b == 0 || a === null && b === VOID0))
        return 1 /* Greater */;
    if (b > a || strict && (b === 0 && a == 0 || b === null && a === VOID0))
        return -1 /* Less */;
    return NaN;
}
/**
 * Determines if two primitives are equal or if two objects have the same key/value combinations.
 * @param a
 * @param b
 * @param nullEquivalency If true, null/undefined will be equivalent to an empty object {}.
 * @param extraDepth
 * @returns {boolean}
 */
function areEquivalent(a, b, nullEquivalency = true, extraDepth = 0) {
    // Take a step by step approach to ensure efficiency.
    if (areEqual(a, b, true))
        return true;
    if (a == null || b == null) {
        if (!nullEquivalency)
            return false;
        if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isObject(a)) {
            return !Object.keys(a).length;
        }
        if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isObject(b)) {
            return !Object.keys(b).length;
        }
        return a == null && b == null;
    }
    if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isObject(a) && __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isObject(b)) {
        const aKeys = Object.keys(a), bKeys = Object.keys(b), len = aKeys.length;
        if (len != bKeys.length)
            return false;
        aKeys.sort();
        bKeys.sort();
        for (let i = 0; i < len; i++) {
            let key = aKeys[i];
            if (key !== bKeys[i] || !areEqual(a[key], b[key], true))
                return false;
        }
        // Doesn't track circular references but allows for controlling the amount of recursion.
        if (extraDepth > 0) {
            for (let key of aKeys) {
                if (!areEquivalent(a[key], b[key], nullEquivalency, extraDepth - 1))
                    return false;
            }
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=Compare.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ArgumentException__ = __webpack_require__(4);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'ArgumentNullException';
class ArgumentNullException extends __WEBPACK_IMPORTED_MODULE_0__ArgumentException__["a" /* ArgumentException */] {
    constructor(paramName, message = `'${paramName}' is null (or undefined).`, innerException) {
        super(paramName, message, innerException);
    }
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ArgumentNullException;

/* unused harmony default export */ var _unused_webpack_default_export = (ArgumentNullException);
//# sourceMappingURL=ArgumentNullException.js.map

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Text_Utility__ = __webpack_require__(27);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */


// noinspection JSUnusedLocalSymbols
const NAME = 'ArgumentException';
class ArgumentException extends __WEBPACK_IMPORTED_MODULE_0__SystemException__["a" /* SystemException */] {
    // For simplicity and consistency, lets stick with 1 signature.
    constructor(paramName, message, innerException, beforeSealing) {
        let pn = paramName ? ('{' + paramName + '} ') : '';
        super(Object(__WEBPACK_IMPORTED_MODULE_1__Text_Utility__["b" /* trim */])(pn + (message || '')), innerException, (_) => {
            _.paramName = paramName;
            if (beforeSealing)
                beforeSealing(_);
        });
    }
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ArgumentException;

/* unused harmony default export */ var _unused_webpack_default_export = (ArgumentException);
//# sourceMappingURL=ArgumentException.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ArgumentException__ = __webpack_require__(4);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'ArgumentOutOfRangeException';
class ArgumentOutOfRangeException extends __WEBPACK_IMPORTED_MODULE_0__ArgumentException__["a" /* ArgumentException */] {
    constructor(paramName, actualValue, message = ' ', innerException) {
        super(paramName, `(${actualValue}) ` + message, innerException, (_) => {
            _.actualValue = actualValue;
        });
    }
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ArgumentOutOfRangeException;

/* unused harmony default export */ var _unused_webpack_default_export = (ArgumentOutOfRangeException);
//# sourceMappingURL=ArgumentOutOfRangeException.js.map

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Disposable_DisposableBase__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Disposable_ObjectPool__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__IteratorResult__ = __webpack_require__(22);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */




// noinspection JSUnusedLocalSymbols
const VOID0 = void 0;
let yielderPool;
//noinspection JSUnusedLocalSymbols
function yielder(recycle) {
    if (!yielderPool)
        yielderPool
            = new __WEBPACK_IMPORTED_MODULE_2__Disposable_ObjectPool__["a" /* ObjectPool */](40, () => new Yielder(), y => y.yieldBreak());
    if (!recycle)
        return yielderPool.take();
    yielderPool.add(recycle);
}
class Yielder {
    constructor() {
        this._current = VOID0;
        this._index = NaN;
    }
    get current() { return this._current; } // this class is not entirely local/private.  Still needs protection.
    get index() { return this._index; }
    yieldReturn(value) {
        this._current = value;
        if (isNaN(this._index))
            this._index = 0;
        else
            this._index++;
        return true;
    }
    yieldBreak() {
        this._current = VOID0;
        this._index = NaN;
        return false;
    }
    dispose() {
        this.yieldBreak();
    }
}
const NAME = "EnumeratorBase";
// "Enumerator" is conflict JScript's "Enumerator"
// Naming this class EnumeratorBase to avoid collision with IE.
class EnumeratorBase extends __WEBPACK_IMPORTED_MODULE_1__Disposable_DisposableBase__["a" /* DisposableBase */] {
    constructor(_initializer, _tryGetNext, disposer, isEndless) {
        super();
        this._initializer = _initializer;
        this._tryGetNext = _tryGetNext;
        this._disposableObjectName = NAME;
        this.reset();
        if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isBoolean(isEndless))
            this._isEndless = isEndless;
        else if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isBoolean(disposer))
            this._isEndless = disposer;
        if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isFunction(disposer))
            this._disposer = disposer;
    }
    get current() {
        const y = this._yielder;
        return y && y.current;
    }
    get index() {
        const y = this._yielder;
        return y ? y.index : NaN;
    }
    /*
     * Provides a mechanism to indicate if this enumerable never ends.
     * If set to true, some operations that expect a finite result may throw.
     * Explicit false means it has an end.
     * Implicit void means unknown.
     */
    get isEndless() {
        return this._isEndless;
    }
    /**
     * Added for compatibility but only works if the enumerator is active.
     */
    reset() {
        const _ = this;
        _.throwIfDisposed();
        const y = _._yielder;
        _._yielder = null;
        _._state = 0 /* Before */;
        if (y)
            yielder(y); // recycle until actually needed.
    }
    _assertBadState() {
        const _ = this;
        switch (_._state) {
            case 3 /* Faulted */:
                _.throwIfDisposed("This enumerator caused a fault and was disposed.");
                break;
            case 5 /* Disposed */:
                _.throwIfDisposed("This enumerator was manually disposed.");
                break;
        }
    }
    /**
     * Passes the current value to the out callback if the enumerator is active.
     * Note: Will throw ObjectDisposedException if this has faulted or manually disposed.
     */
    tryGetCurrent(out) {
        this._assertBadState();
        if (this._state === 1 /* Active */) {
            out(this.current);
            return true;
        }
        return false;
    }
    get canMoveNext() {
        return this._state < 2 /* Completed */;
    }
    /**
     * Safely moves to the next entry and returns true if there is one.
     * Note: Will throw ObjectDisposedException if this has faulted or manually disposed.
     */
    moveNext() {
        const _ = this;
        _._assertBadState();
        try {
            switch (_._state) {
                case 0 /* Before */:
                    _._yielder = _._yielder || yielder();
                    _._state = 1 /* Active */;
                    const initializer = _._initializer;
                    if (initializer)
                        initializer();
                // fall through
                case 1 /* Active */:
                    if (_._tryGetNext(_._yielder)) {
                        return true;
                    }
                    else {
                        this.dispose();
                        _._state = 2 /* Completed */;
                        return false;
                    }
                default:
                    return false;
            }
        }
        catch (e) {
            this.dispose();
            _._state = 3 /* Faulted */;
            throw e;
        }
    }
    /**
     * Moves to the next entry and emits the value through the out callback.
     * Note: Will throw ObjectDisposedException if this has faulted or manually disposed.
     */
    tryMoveNext(out) {
        if (this.moveNext()) {
            out(this.current);
            return true;
        }
        return false;
    }
    nextValue() {
        return this.moveNext()
            ? this.current
            : VOID0;
    }
    /**
     * Exposed for compatibility with generators.
     */
    next() {
        return this.moveNext()
            ? new __WEBPACK_IMPORTED_MODULE_3__IteratorResult__["a" /* IteratorResult */](this.current, this.index)
            : __WEBPACK_IMPORTED_MODULE_3__IteratorResult__["a" /* IteratorResult */].Done;
    }
    end() {
        this._ensureDisposeState(4 /* Interrupted */);
    }
    'return'(value) {
        const _ = this;
        _._assertBadState();
        try {
            return value === VOID0 || _._state === 2 /* Completed */ || _._state === 4 /* Interrupted */
                ? __WEBPACK_IMPORTED_MODULE_3__IteratorResult__["a" /* IteratorResult */].Done
                : new __WEBPACK_IMPORTED_MODULE_3__IteratorResult__["a" /* IteratorResult */](value, VOID0, true);
        }
        finally {
            _.end();
        }
    }
    _ensureDisposeState(state) {
        const _ = this;
        if (!_.wasDisposed) {
            _.dispose();
            _._state = state;
        }
    }
    _onDispose() {
        const _ = this;
        _._isEndless = false;
        const disposer = _._disposer;
        _._initializer = null;
        _._disposer = null;
        const y = _._yielder;
        _._yielder = null;
        this._state = 5 /* Disposed */;
        if (y)
            yielder(y);
        if (disposer)
            disposer();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EnumeratorBase;

/* unused harmony default export */ var _unused_webpack_default_export = (EnumeratorBase);
//# sourceMappingURL=EnumeratorBase.js.map

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Integer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(5);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


function Integer(n) {
    return Math.floor(n);
}
(function (Integer) {
    Integer.MAX_32_BIT = 2147483647;
    Integer.MAX_VALUE = 9007199254740991;
    const NUMBER = "number";
    /**
     * Converts any number to its 32bit counterpart.
     * Throws if conversion is not possible.
     * @param n
     * @returns {number}
     */
    function as32Bit(n) {
        const result = n | 0;
        if (isNaN(n))
            throw "'n' is not a number.";
        if (n !== -1 && result === -1)
            throw "'n' is too large to be a 32 bit integer.";
        return result;
    }
    Integer.as32Bit = as32Bit;
    /**
     * Returns true if the value is an integer.
     * @param n
     * @returns {boolean}
     */
    function is(n) {
        return typeof n === NUMBER && isFinite(n) && n === Math.floor(n);
    }
    Integer.is = is;
    /**
     * Returns true if the value is within a 32 bit range.
     * @param n
     * @returns {boolean}
     */
    function is32Bit(n) {
        return n === (n | 0);
    }
    Integer.is32Bit = is32Bit;
    /**
     * Throws if not an integer.
     * @param n
     * @param argumentName
     * @returns {boolean}
     */
    function assert(n, argumentName) {
        let i = is(n);
        if (!i)
            throw new __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__["a" /* ArgumentException */](argumentName || 'n', "Must be a integer.");
        return i;
    }
    Integer.assert = assert;
    /**
     * Throws if less than zero.
     * @param n
     * @param argumentName
     * @returns {boolean}
     */
    function assertZeroOrGreater(n, argumentName) {
        let i = assert(n, argumentName) && n >= 0;
        if (!i)
            throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */](argumentName || 'n', n, "Must be a valid integer greater than or equal to zero.");
        return i;
    }
    Integer.assertZeroOrGreater = assertZeroOrGreater;
    /**
     * Throws if not greater than zero.
     * @param n
     * @param argumentName
     * @returns {boolean}
     */
    function assertPositive(n, argumentName) {
        let i = assert(n, argumentName) && n > 0;
        if (!i)
            throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */](argumentName || 'n', n, "Must be greater than zero.");
        return i;
    }
    Integer.assertPositive = assertPositive;
})(Integer || (Integer = {}));
/* unused harmony default export */ var _unused_webpack_default_export = (Integer);
//# sourceMappingURL=Integer.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exception__ = __webpack_require__(44);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/system.systemexception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'SystemException';
class SystemException extends __WEBPACK_IMPORTED_MODULE_0__Exception__["a" /* Exception */] {
    /*
        constructor(
            message:string = null,
            innerException:Error = null,
            beforeSealing?:(ex:any)=>void)
        {
            super(message, innerException, beforeSealing);
        }
    */
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SystemException;

/* unused harmony default export */ var _unused_webpack_default_export = (SystemException);
//# sourceMappingURL=SystemException.js.map

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ObjectDisposedException__ = __webpack_require__(29);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

class DisposableBase {
    constructor(__finalizer) {
        this.__finalizer = __finalizer;
        this.__wasDisposed = false;
    }
    get wasDisposed() {
        return this.__wasDisposed;
    }
    throwIfDisposed(message, objectName = this._disposableObjectName) {
        if (this.__wasDisposed)
            throw new __WEBPACK_IMPORTED_MODULE_0__ObjectDisposedException__["a" /* ObjectDisposedException */](objectName, message);
        return true;
    }
    dispose() {
        const _ = this;
        if (!_.__wasDisposed) {
            // Preemptively set wasDisposed in order to prevent repeated disposing.
            // NOTE: in true multi-threaded scenarios, this needs to be synchronized.
            _.__wasDisposed = true;
            try {
                _._onDispose(); // Protected override.
            }
            finally {
                if (_.__finalizer) {
                    _.__finalizer();
                    _.__finalizer = void 0;
                }
            }
        }
    }
    // Placeholder for overrides.
    _onDispose() { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DisposableBase;

/* unused harmony default export */ var _unused_webpack_default_export = (DisposableBase);
//# sourceMappingURL=DisposableBase.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(11);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'InvalidOperationException';
class InvalidOperationException extends __WEBPACK_IMPORTED_MODULE_0__SystemException__["a" /* SystemException */] {
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InvalidOperationException;

/* unused harmony default export */ var _unused_webpack_default_export = (InvalidOperationException);
//# sourceMappingURL=InvalidOperationException.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initialize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Integer__ = __webpack_require__(10);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

/**
 * Initializes an array depending on the requested capacity.
 * The returned array will have a .length equal to the value provided.
 * @param length
 * @returns {T[]}
 */
function initialize(length) {
    __WEBPACK_IMPORTED_MODULE_0__Integer__["a" /* Integer */].assert(length, 'length');
    // This logic is based upon JS performance tests that show a significant difference at the level of 65536.
    let array;
    if (length > 65536)
        array = new Array(length);
    else {
        array = [];
        array.length = length;
    }
    return array;
}
//# sourceMappingURL=initialize.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = throwIfEndless;
/* harmony export (immutable) */ __webpack_exports__["b"] = from;
/* harmony export (immutable) */ __webpack_exports__["c"] = isEnumerable;
/* unused harmony export isEnumerableOrArrayLike */
/* harmony export (immutable) */ __webpack_exports__["d"] = isEnumerator;
/* harmony export (immutable) */ __webpack_exports__["e"] = isIterator;
/* harmony export (immutable) */ __webpack_exports__["a"] = forEach;
/* harmony export (immutable) */ __webpack_exports__["h"] = toArray;
/* harmony export (immutable) */ __webpack_exports__["f"] = map;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Disposable_dispose__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ArrayEnumerator__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__IndexEnumerator__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__InfiniteEnumerator__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__EmptyEnumerator__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__IteratorEnumerator__ = __webpack_require__(35);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */








const STRING_EMPTY = "", ENDLESS_EXCEPTION_MESSAGE = 'Cannot call forEach on an endless enumerable. ' +
    'Would result in an infinite loop that could hang the current process.';
function throwIfEndless(isEndless) {
    if (isEndless)
        throw new __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__["a" /* UnsupportedEnumerableException */](ENDLESS_EXCEPTION_MESSAGE);
    return true;
}
function initArrayFrom(source, max = Infinity) {
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isArrayLike(source)) {
        const len = Math.min(source.length, max);
        if (isFinite(len)) {
            if (len > 65535)
                return new Array(len);
            const result = [];
            result.length = len;
            return result;
        }
    }
    return [];
}
// Could be array, or IEnumerable...
/**
 * Returns the enumerator for the specified collection, enumerator, or iterator.
 * If the source is identified as IEnumerator it will return the source as is.
 * @param source
 * @returns {any}
 */
function from(source) {
    // To simplify and prevent null reference exceptions:
    if (!source)
        return __WEBPACK_IMPORTED_MODULE_6__EmptyEnumerator__["a" /* EmptyEnumerator */];
    if ((source) instanceof (Array))
        return new __WEBPACK_IMPORTED_MODULE_2__ArrayEnumerator__["a" /* ArrayEnumerator */](source);
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isArrayLike(source)) {
        return new __WEBPACK_IMPORTED_MODULE_3__IndexEnumerator__["a" /* IndexEnumerator */](() => {
            return {
                source: source,
                length: source.length,
                pointer: 0,
                step: 1
            };
        });
    }
    if (!__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isPrimitive(source)) {
        if (isEnumerable(source))
            return source.getEnumerator();
        if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isFunction(source))
            return new __WEBPACK_IMPORTED_MODULE_5__InfiniteEnumerator__["a" /* InfiniteEnumerator */](source);
        if (isEnumerator(source))
            return source;
        if (isIterator(source))
            return new __WEBPACK_IMPORTED_MODULE_7__IteratorEnumerator__["a" /* IteratorEnumerator */](source);
    }
    throw new __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__["a" /* UnsupportedEnumerableException */]();
}
function isEnumerable(instance) {
    return __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].hasMemberOfType(instance, "getEnumerator", __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].FUNCTION);
}
function isEnumerableOrArrayLike(instance) {
    return __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isArrayLike(instance) || isEnumerable(instance);
}
function isEnumerator(instance) {
    return __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].hasMemberOfType(instance, "moveNext", __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].FUNCTION);
}
function isIterator(instance) {
    return __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].hasMemberOfType(instance, "next", __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].FUNCTION);
}
function forEach(e, action, max = Infinity) {
    if (e === STRING_EMPTY)
        return 0;
    if (e && max > 0) {
        if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isArrayLike(e)) {
            // Assume e.length is constant or at least doesn't deviate to infinite or NaN.
            throwIfEndless(!isFinite(max) && !isFinite(e.length));
            let i = 0;
            for (; i < Math.min(e.length, max); i++) {
                if (action(e[i], i) === false)
                    break;
            }
            return i;
        }
        if (isEnumerator(e)) {
            throwIfEndless(!isFinite(max) && e.isEndless);
            let i = 0;
            // Return value of action can be anything, but if it is (===) false then the forEach will discontinue.
            while (max > i && e.moveNext()) {
                if (action(e.current, i++) === false)
                    break;
            }
            return i;
        }
        if (isEnumerable(e)) {
            throwIfEndless(!isFinite(max) && e.isEndless);
            // For enumerators that aren't EnumerableBase, ensure dispose is called.
            return Object(__WEBPACK_IMPORTED_MODULE_0__Disposable_dispose__["b" /* using */])(e.getEnumerator(), f => forEach(f, action, max));
        }
        if (isIterator(e)) {
            // For our purpose iterators are endless and a max must be specified before iterating.
            throwIfEndless(!isFinite(max));
            let i = 0, r;
            // Return value of action can be anything, but if it is (===) false then the forEach will discontinue.
            while (max > i && !(r = e.next()).done) {
                if (action(r.value, i++) === false)
                    break;
            }
            return i;
        }
    }
    return -1;
}
/**
 * Converts any enumerable to an array.
 * @param source
 * @param max Stops after max is reached.  Allows for forEach to be called on infinite enumerations.
 * @returns {any}
 */
function toArray(source, max = Infinity) {
    if (source === STRING_EMPTY)
        return [];
    if (!isFinite(max) && (source) instanceof (Array))
        return source.slice();
    const result = initArrayFrom(source, max);
    if (-1 === forEach(source, (e, i) => { result[i] = e; }, max))
        throw new __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__["a" /* UnsupportedEnumerableException */]();
    return result;
}
/**
 * Converts any enumerable to an array of selected values.
 * @param source
 * @param selector
 * @param max Stops after max is reached.  Allows for forEach to be called on infinite enumerations.
 * @returns {TResult[]}
 */
function map(source, selector, max = Infinity) {
    if (source === STRING_EMPTY)
        return [];
    if (!isFinite(max) && (source) instanceof (Array))
        return source.map(selector);
    const result = initArrayFrom(source, max);
    if (-1 === forEach(source, (e, i) => { result[i] = selector(e, i); }, max))
        throw new __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__["a" /* UnsupportedEnumerableException */]();
    return result;
}
//# sourceMappingURL=Enumerator.js.map

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = dispose;
/* harmony export (immutable) */ __webpack_exports__["b"] = using;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

/**
 * Takes any number of disposables as arguments and attempts to dispose them.
 * Any exceptions thrown within a dispose are not trapped.
 * Use 'disposeWithoutException' to automatically trap exceptions.
 *
 * Can accept <any> and will ignore objects that don't have a dispose() method.
 * @param disposables
 */
function dispose(...disposables) {
    // The disposables arguments array is effectively localized so it's safe.
    disposeTheseInternal(disposables, false);
}
(function (dispose) {
    /**
     * Use this when only disposing one object to avoid creation of arrays.
     * @param disposable
     * @param trapExceptions
     */
    function single(disposable, trapExceptions = false) {
        if (disposable)
            disposeSingle(disposable, trapExceptions);
    }
    dispose.single = single;
    function deferred(...disposables) {
        these.deferred(disposables);
    }
    dispose.deferred = deferred;
    /**
     * Takes any number of disposables and traps any errors that occur when disposing.
     * Returns an array of the exceptions thrown.
     * @param disposables
     * @returns {any[]} Returns an array of exceptions that occurred, if there are any.
     */
    function withoutException(...disposables) {
        // The disposables arguments array is effectively localized so it's safe.
        return disposeTheseInternal(disposables, true);
    }
    dispose.withoutException = withoutException;
    /**
     * Takes an array of disposable objects and ensures they are disposed.
     * @param disposables
     * @param trapExceptions If true, prevents exceptions from being thrown when disposing.
     * @returns {any[]} If 'trapExceptions' is true, returns an array of exceptions that occurred, if there are any.
     */
    function these(disposables, trapExceptions) {
        return disposables && disposables.length
            ? disposeTheseInternal(disposables.slice(), trapExceptions)
            : void 0;
    }
    dispose.these = these;
    (function (these) {
        function deferred(disposables, delay = 0) {
            if (disposables && disposables.length) {
                if (!(delay >= 0))
                    delay = 0;
                setTimeout(disposeTheseInternal, delay, disposables.slice(), true);
            }
        }
        these.deferred = deferred;
        /**
         * Use this unsafe method when guaranteed not to cause events that will make modifications to the disposables array.
         * @param disposables
         * @param trapExceptions
         * @returns {any[]}
         */
        function noCopy(disposables, trapExceptions) {
            return disposables && disposables.length
                ? disposeTheseInternal(disposables, trapExceptions)
                : void 0;
        }
        these.noCopy = noCopy;
    })(these = dispose.these || (dispose.these = {}));
})(dispose || (dispose = {}));
/**
 * Just like in C# this 'using' function will ensure the passed disposable is disposed when the closure has finished.
 *
 * Usage:
 * ```typescript
 * using(new DisposableObject(),(myObj)=>{
     *   // do work with myObj
     * });
 * // myObj automatically has it's dispose method called.
 * ```
 *
 * @param disposable Object to be disposed.
 * @param closure Function call to execute.
 * @returns {TReturn} Returns whatever the closure's return value is.
 */
function using(disposable, closure) {
    try {
        return closure(disposable);
    }
    finally {
        disposeSingle(disposable, false);
    }
}
/**
 * This private function makes disposing more robust for when there's no type checking.
 * If trapExceptions is 'true' it catches and returns any exception instead of throwing.
 */
function disposeSingle(disposable, trapExceptions) {
    if (disposable
        && typeof disposable == __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].OBJECT
        && typeof disposable['dispose'] == "function") {
        if (trapExceptions) {
            try {
                disposable.dispose();
            }
            catch (ex) {
                return ex;
            }
        }
        else
            disposable.dispose();
    }
    return null;
}
/**
 * This dispose method assumes it's working on a local arrayCopy and is unsafe for external use.
 */
function disposeTheseInternal(disposables, trapExceptions, index = 0) {
    let exceptions;
    const len = disposables ? disposables.length : 0;
    for (; index < len; index++) {
        let next = disposables[index];
        if (!next)
            continue;
        if (trapExceptions) {
            const ex = disposeSingle(next, true);
            if (ex) {
                if (!exceptions)
                    exceptions = [];
                exceptions.push(ex);
            }
        }
        else {
            let success = false;
            try {
                disposeSingle(next, false);
                success = true;
            }
            finally {
                if (!success && index + 1 < len) {
                    /* If code is 'continued' by the debugger,
                     * need to ensure the rest of the disposables are cared for. */
                    disposeTheseInternal(disposables, false, index + 1);
                }
            }
            // Just in case...  Should never happen, but asserts the intention.
            if (!success)
                break;
        }
    }
    return exceptions;
}
/* unused harmony default export */ var _unused_webpack_default_export = (dispose);
//# sourceMappingURL=dispose.js.map

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EnumeratorBase__ = __webpack_require__(6);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

class IndexEnumerator extends __WEBPACK_IMPORTED_MODULE_0__EnumeratorBase__["a" /* EnumeratorBase */] {
    constructor(sourceFactory) {
        let source;
        super(() => {
            source = sourceFactory();
            if (source && source.source) {
                const len = source.length;
                if (len < 0)
                    throw new Error("length must be zero or greater");
                if (!isFinite(len))
                    throw new Error("length must finite number");
                if (len && source.step === 0)
                    throw new Error("Invalid IndexEnumerator step value (0).");
                let pointer = source.pointer;
                if (!pointer)
                    pointer = 0;
                else if (pointer != Math.floor(pointer))
                    throw new Error("Invalid IndexEnumerator pointer value (" + pointer + ") has decimal.");
                source.pointer = pointer;
                let step = source.step;
                if (!step)
                    step = 1;
                else if (step != Math.floor(step))
                    throw new Error("Invalid IndexEnumerator step value (" + step + ") has decimal.");
                source.step = step;
            }
        }, (yielder) => {
            let len = (source && source.source) ? source.length : 0;
            if (!len || isNaN(len))
                return yielder.yieldBreak();
            const current = source.pointer;
            if (source.pointer == null)
                source.pointer = 0; // should never happen but is in place to negate compiler warnings.
            if (!source.step)
                source.step = 1; // should never happen but is in place to negate compiler warnings.
            source.pointer = source.pointer + source.step;
            return (current < len && current >= 0)
                ? yielder.yieldReturn(source.source[current])
                : yielder.yieldBreak();
        }, () => {
            if (source) {
                source.source = null;
            }
        });
        this._isEndless = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IndexEnumerator;

/* unused harmony default export */ var _unused_webpack_default_export = (IndexEnumerator);
//# sourceMappingURL=IndexEnumerator.js.map

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
const VOID0 = void 0;
class IteratorResult {
    constructor(value, index, done = false) {
        this.value = value;
        if (typeof index == 'boolean')
            this.done = index;
        else {
            this.index = index;
            this.done = done;
        }
        Object.freeze(this);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IteratorResult;

(function (IteratorResult) {
    IteratorResult.Done = new IteratorResult(VOID0, VOID0, true);
    function GetDone() { return IteratorResult.Done; }
    IteratorResult.GetDone = GetDone;
})(IteratorResult || (IteratorResult = {}));
Object.freeze(IteratorResult);
/* unused harmony default export */ var _unused_webpack_default_export = (IteratorResult);
//# sourceMappingURL=IteratorResult.js.map

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
/**
 * Can be used statically or extended for varying different reusable function signatures.
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */ class Functions {
    //noinspection JSMethodCanBeStatic
    /**
     * A typed method for use with simple selection of the parameter.
     * @returns {T}
     */
    Identity(x) { return x; }
    //noinspection JSMethodCanBeStatic
    /**
     * Returns true.
     * @returns {boolean}
     */
    True() { return true; }
    //noinspection JSMethodCanBeStatic
    /**
     * Returns false.
     * @returns {boolean}
     */
    False() { return false; }
    /**
     * Does nothing.
     */
    Blank() { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Functions;

const rootFunctions = new Functions();
// Expose static versions.
(function (Functions) {
    /**
     * A typed method for use with simple selection of the parameter.
     * @returns {boolean}
     */
    Functions.Identity = rootFunctions.Identity;
    /**
     * Returns false.
     * @returns {boolean}
     */
    Functions.True = rootFunctions.True;
    /**
     * Returns false.
     * @returns {boolean}
     */
    Functions.False = rootFunctions.False;
    /**
     * Does nothing.
     */
    Functions.Blank = rootFunctions.Blank;
})(Functions || (Functions = {}));
// Make this read only.  Should still allow for sub-classing since extra methods are added to prototype.
Object.freeze(Functions);
/* unused harmony default export */ var _unused_webpack_default_export = (Functions);
//# sourceMappingURL=Functions.js.map

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Enumeration_Enumerator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Compare__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentNullException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_InvalidOperationException__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Disposable_DisposableBase__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Environment__ = __webpack_require__(52);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */






//noinspection JSUnusedLocalSymbols
//noinspection SpellCheckingInspection
const NAME = "CollectionBase", CMDC = "Cannot modify a disposed collection.", CMRO = "Cannot modify a read-only collection.";
const LINQ_PATH = "../../System.Linq/Linq";
class CollectionBase extends __WEBPACK_IMPORTED_MODULE_4__Disposable_DisposableBase__["a" /* DisposableBase */] {
    constructor(source, _equalityComparer = __WEBPACK_IMPORTED_MODULE_1__Compare__["a" /* areEqual */]) {
        super();
        this._equalityComparer = _equalityComparer;
        const _ = this;
        _._disposableObjectName = NAME;
        _._importEntries(source);
        _._updateRecursion = 0;
        _._modifiedCount = 0;
        _._version = 0;
    }
    get count() {
        return this.getCount();
    }
    getIsReadOnly() {
        return false;
    }
    //noinspection JSUnusedGlobalSymbols
    get isReadOnly() {
        return this.getIsReadOnly();
    }
    assertModifiable() {
        this.throwIfDisposed(CMDC);
        if (this.getIsReadOnly())
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_InvalidOperationException__["a" /* InvalidOperationException */](CMRO);
        return true;
    }
    assertVersion(version) {
        if (version !== this._version)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_InvalidOperationException__["a" /* InvalidOperationException */]("Collection was modified.");
        return true;
    }
    _onModified() { }
    _signalModification(increment) {
        const _ = this;
        if (increment)
            _._modifiedCount++;
        if (_._modifiedCount && !this._updateRecursion) {
            _._modifiedCount = 0;
            _._version++;
            try {
                _._onModified();
            }
            catch (ex) {
                // Avoid fatal errors which may have been caused by consumer.
                console.error(ex);
            }
            return true;
        }
        return false;
    }
    _incrementModified() { this._modifiedCount++; }
    //noinspection JSUnusedGlobalSymbols
    get isUpdating() { return this._updateRecursion != 0; }
    /**
     * Takes a closure that if returning true will propagate an update signal.
     * Multiple update operations can be occurring at once or recursively and the onModified signal will only occur once they're done.
     * @param closure
     * @returns {boolean}
     */
    handleUpdate(closure) {
        if (!closure)
            return false;
        const _ = this;
        _.assertModifiable();
        _._updateRecursion++;
        let updated = false;
        try {
            if (updated = closure())
                _._modifiedCount++;
        }
        finally {
            _._updateRecursion--;
        }
        _._signalModification();
        return updated;
    }
    /*
     * Note: for a slight amount more code, we avoid creating functions/closures.
     * Calling handleUpdate is the correct pattern, but if possible avoid creating another function scope.
     */
    /**
     * Adds an entry to the collection.
     * @param entry
     */
    add(entry) {
        const _ = this;
        _.assertModifiable();
        _._updateRecursion++;
        try {
            if (_._addInternal(entry))
                _._modifiedCount++;
        }
        finally {
            _._updateRecursion--;
        }
        _._signalModification();
        return _;
    }
    /**
     * Removes entries from the collection allowing for a limit.
     * For example if the collection not a distinct set, more than one entry could be removed.
     * @param entry The entry to remove.
     * @param max Limit of entries to remove.  Will remove all matches if no max specified.
     * @returns {number} The number of entries removed.
     */
    remove(entry, max = Infinity) {
        const _ = this;
        _.assertModifiable();
        _._updateRecursion++;
        let n = NaN;
        try {
            if (n = _._removeInternal(entry, max))
                _._modifiedCount++;
        }
        finally {
            _._updateRecursion--;
        }
        _._signalModification();
        return n;
    }
    /**
     * Clears the contents of the collection resulting in a count of zero.
     * @returns {number}
     */
    clear() {
        const _ = this;
        _.assertModifiable();
        _._updateRecursion++;
        let n = NaN;
        try {
            if (n = _._clearInternal())
                _._modifiedCount++;
        }
        finally {
            _._updateRecursion--;
        }
        _._signalModification();
        return n;
    }
    _onDispose() {
        super._onDispose();
        this._clearInternal();
        this._version = 0;
        this._updateRecursion = 0;
        this._modifiedCount = 0;
        const l = this._linq;
        this._linq = void 0;
        if (l)
            l.dispose();
    }
    _importEntries(entries) {
        let added = 0;
        if (entries) {
            if ((entries) instanceof (Array)) {
                // Optimize for avoiding a new closure.
                for (let e of entries) {
                    if (this._addInternal(e))
                        added++;
                }
            }
            else {
                Object(__WEBPACK_IMPORTED_MODULE_0__Enumeration_Enumerator__["a" /* forEach */])(entries, e => {
                    if (this._addInternal(e))
                        added++;
                });
            }
        }
        return added;
    }
    /**
     * Safely imports any array enumerator, or enumerable.
     * @param entries
     * @returns {number}
     */
    importEntries(entries) {
        const _ = this;
        if (!entries)
            return 0;
        _.assertModifiable();
        _._updateRecursion++;
        let n = NaN;
        try {
            if (n = _._importEntries(entries))
                _._modifiedCount++;
        }
        finally {
            _._updateRecursion--;
        }
        _._signalModification();
        return n;
    }
    /**
     * Returns an array filtered by the provided predicate.
     * Provided for similarity to JS Array.
     * @param predicate
     * @returns {[]}
     */
    filter(predicate) {
        if (!predicate)
            throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('predicate');
        let count = !this.getCount();
        let result = [];
        if (count) {
            this.forEach((e, i) => {
                if (predicate(e, i))
                    result.push(e);
            });
        }
        return result;
    }
    /**
     * Returns true the first time predicate returns true.  Otherwise false.
     * Useful for searching through a collection.
     * @param predicate
     * @returns {any}
     */
    any(predicate) {
        let count = this.getCount();
        if (!count)
            return false;
        if (!predicate)
            return Boolean(count);
        let found = false;
        this.forEach((e, i) => !(found = predicate(e, i)));
        return found;
    }
    /**
     * Returns true the first time predicate returns true.  Otherwise false.
     * See '.any(predicate)'.  As this method is just just included to have similarity with a JS Array.
     * @param predicate
     * @returns {any}
     */
    some(predicate) {
        return this.any(predicate);
    }
    /**
     * Returns true if the equality comparer resolves true on any element in the collection.
     * @param entry
     * @returns {boolean}
     */
    contains(entry) {
        const equals = this._equalityComparer;
        return this.any(e => equals(entry, e));
    }
    forEach(action, useCopy) {
        if (this.wasDisposed)
            return 0;
        if (useCopy) {
            const a = this.toArray();
            try {
                return Object(__WEBPACK_IMPORTED_MODULE_0__Enumeration_Enumerator__["a" /* forEach */])(a, action);
            }
            finally {
                a.length = 0;
            }
        }
        else {
            return Object(__WEBPACK_IMPORTED_MODULE_0__Enumeration_Enumerator__["a" /* forEach */])(this.getEnumerator(), action);
        }
    }
    /**
     * Copies all values to numerically indexable object.
     * @param target
     * @param index
     * @returns {TTarget}
     */
    copyTo(target, index = 0) {
        if (!target)
            throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('target');
        const count = this.getCount();
        if (count) {
            const newLength = count + index;
            if (target.length < newLength)
                target.length = newLength;
            const e = this.getEnumerator();
            while (e.moveNext()) {
                target[index++] = e.current;
            }
        }
        return target;
    }
    /**
     * Returns an array of the collection contents.
     * @returns {any[]|Array}
     */
    toArray() {
        const count = this.getCount();
        return count
            ? this.copyTo(count > 65536 ? new Array(count) : [])
            : [];
    }
    /**
     * .linq will return an ILinqEnumerable if .linqAsync() has completed successfully or the default module loader is NodeJS+CommonJS.
     * @returns {ILinqEnumerable}
     */
    get linq() {
        this.throwIfDisposed();
        let e = this._linq;
        if (!e) {
            let r;
            try {
                r = eval('require');
            }
            catch (ex) { }
            this._linq = e = r && r(LINQ_PATH).default.from(this);
            if (!e) {
                throw __WEBPACK_IMPORTED_MODULE_5__Environment__["c" /* isRequireJS */]
                    ? `using .linq to load and initialize a ILinqEnumerable is currently only supported within a NodeJS environment.
Import System.Linq/Linq and use Enumerable.from(e) instead.
You can also preload the Linq module as a dependency or use .linqAsync(callback) for AMD/RequireJS.`
                    : "There was a problem importing System.Linq/Linq";
            }
        }
        return e;
    }
    /**
     * .linqAsync() is for use with deferred loading.
     * Ensures an instance of the Linq extensions is available and then passes it to the callback.
     * Returns an ILinqEnumerable if one is already available, otherwise undefined.
     * Passing no parameters will still initiate loading and initializing the ILinqEnumerable which can be useful for pre-loading.
     * Any call to .linqAsync() where an ILinqEnumerable is returned can be assured that any subsequent calls to .linq will return the same instance.
     * @param callback
     * @returns {ILinqEnumerable}
     */
    linqAsync(callback) {
        this.throwIfDisposed();
        let e = this._linq;
        if (!e) {
            if (__WEBPACK_IMPORTED_MODULE_5__Environment__["c" /* isRequireJS */]) {
                eval("require")([LINQ_PATH], (linq) => {
                    // Could end up being called more than once, be sure to check for ._linq before setting...
                    e = this._linq;
                    if (!e)
                        this._linq = e = linq.default.from(this);
                    if (!e)
                        throw "There was a problem importing System.Linq/Linq";
                    if (callback)
                        callback(e);
                    callback = void 0; // In case this is return synchronously..
                });
            }
            else if (__WEBPACK_IMPORTED_MODULE_5__Environment__["b" /* isNodeJS */] && __WEBPACK_IMPORTED_MODULE_5__Environment__["a" /* isCommonJS */]) {
                e = this.linq;
            }
            else {
                throw "Cannot find a compatible loader for importing System.Linq/Linq";
            }
        }
        if (e && callback)
            callback(e);
        return e;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CollectionBase;

//# sourceMappingURL=CollectionBase.js.map

/***/ }),
/* 25 */,
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = copy;
/* harmony export (immutable) */ __webpack_exports__["b"] = copyTo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__initialize__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(5);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */



/**
 *
 * @param source
 * @param sourceIndex
 * @param length
 * @returns {any}
 */
function copy(source, sourceIndex = 0, length = Infinity) {
    if (!source)
        return source; // may have passed zero? undefined? or null?
    return copyTo(source, Object(__WEBPACK_IMPORTED_MODULE_0__initialize__["a" /* initialize */])(Math.min(length, Math.max(source.length - sourceIndex, 0))), sourceIndex, 0, length);
}
const CBN = 'Cannot be null.', CBL0 = 'Cannot be less than zero.';
/**
 * Copies one array to another.
 * @param source
 * @param destination
 * @param sourceIndex
 * @param destinationIndex
 * @param length An optional limit to stop copying.
 * @returns The destination array.
 */
function copyTo(source, destination, sourceIndex = 0, destinationIndex = 0, length = Infinity) {
    if (!source)
        throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('source', CBN);
    if (!destination)
        throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('destination', CBN);
    if (sourceIndex < 0)
        throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('sourceIndex', sourceIndex, CBL0);
    let sourceLength = source.length;
    if (!sourceLength)
        return destination;
    if (sourceIndex >= sourceLength)
        throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('sourceIndex', sourceIndex, 'Must be less than the length of the source array.');
    if (destination.length < 0)
        throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('destinationIndex', destinationIndex, CBL0);
    const maxLength = source.length - sourceIndex;
    if (isFinite(length) && length > maxLength)
        throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('sourceIndex', sourceIndex, 'Source index + length cannot exceed the length of the source array.');
    length = Math.min(length, maxLength);
    const newLength = destinationIndex + length;
    if (newLength > destination.length)
        destination.length = newLength;
    for (let i = 0; i < length; i++) {
        destination[destinationIndex + i] = source[sourceIndex + i];
    }
    return destination;
}
//# sourceMappingURL=copy.js.map

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getHashCode */
/* unused harmony export repeat */
/* unused harmony export fromChars */
/* unused harmony export escapeRegExp */
/* harmony export (immutable) */ __webpack_exports__["b"] = trim;
/* harmony export (immutable) */ __webpack_exports__["a"] = format;
/* unused harmony export supplant */
/* unused harmony export startsWith */
/* unused harmony export endsWith */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

const EMPTY = '';
/* unused harmony export EMPTY */

/**
 * Returns a numerical (integer) hash code of the string.  Can be used for identifying inequality of contents, but two different strings in rare cases will have the same hash code.
 * @param source
 * @returns {number}
 */
function getHashCode(source) {
    let hash = 0 | 0;
    if (source.length == 0)
        return hash;
    for (let i = 0, l = source.length; i < l; i++) {
        let ch = source.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
function repeat(source, count) {
    let result = EMPTY;
    if (!isNaN(count)) {
        for (let i = 0; i < count; i++) {
            result += source;
        }
    }
    return result;
}
function fromChars(chOrChars, count = 1) {
    if ((chOrChars) instanceof (Array)) {
        let result = EMPTY;
        for (let char of chOrChars) {
            result += String.fromCharCode(char);
        }
        return result;
    }
    else {
        return repeat(String.fromCharCode(chOrChars), count);
    }
}
/**
 * Escapes a RegExp sequence.
 * @param source
 * @returns {string}
 */
function escapeRegExp(source) {
    return source.replace(/[-[\]\/{}()*+?.\\^$|]/g, "\\$&");
}
/**
 * Can trim any character or set of characters from the ends of a string.
 * Uses a Regex escapement to replace them with empty.
 * @param source
 * @param chars A string or array of characters desired to be trimmed.
 * @param ignoreCase
 * @returns {string}
 */
function trim(source, chars, ignoreCase) {
    if (chars === EMPTY)
        return source;
    if (chars) {
        const escaped = escapeRegExp((chars) instanceof (Array) ? chars.join() : chars);
        return source.replace(new RegExp('^[' + escaped + ']+|[' + escaped + ']+$', 'g' + (ignoreCase
            ? 'i'
            : '')), EMPTY);
    }
    return source.replace(/^\s+|\s+$/g, EMPTY);
}
/**
 * Takes any arg
 * @param source
 * @param args
 * @returns {string}
 */
function format(source, ...args) {
    return supplant(source, args);
}
//
/**
 * This takes a string and replaces '{string}' with the respected parameter.
 * Also allows for passing an array in order to use '{n}' notation.
 * Not limited to an array's indexes.  For example, {length} is allowed.
 * Based upon Crockford's supplant function.
 * @param source
 * @param params
 * @returns {string}
 */
function supplant(source, params) {
    const oIsArray = (params) instanceof (Array);
    return source.replace(/{([^{}]*)}/g, (a, b) => {
        let n = b;
        if (oIsArray) {
            let i = parseInt(b);
            if (!isNaN(i))
                n = i;
        }
        let r = params[n];
        switch (typeof r) {
            case __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].STRING:
            case __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].NUMBER:
            case __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].BOOLEAN:
                return r;
            default:
                return (r && __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].hasMemberOfType(r, "toString", __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].FUNCTION))
                    ? r.toString()
                    : a;
        }
    });
}
function canMatch(source, match) {
    if (!__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isString(source) || !match)
        return false;
    if (source === match)
        return true;
    if (match.length < source.length)
        return null;
}
/**
 * Returns true if the pattern matches the beginning of the source.
 * @param source
 * @param pattern
 * @returns {boolean}
 */
function startsWith(source, pattern) {
    const m = canMatch(source, pattern);
    return __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isBoolean(m) ? m : source.indexOf(pattern) == 0;
}
/**
 * Returns true if the pattern matches the end of the source.
 * @param source
 * @param pattern
 * @returns {boolean}
 */
function endsWith(source, pattern) {
    const m = canMatch(source, pattern);
    return __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isBoolean(m) ? m : source.lastIndexOf(pattern) == (source.length - pattern.length);
}
//# sourceMappingURL=Utility.js.map

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IndexEnumerator__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


// noinspection JSUnusedLocalSymbols
class ArrayEnumerator extends __WEBPACK_IMPORTED_MODULE_0__IndexEnumerator__["a" /* IndexEnumerator */] {
    constructor(arrayOrFactory, start = 0, step = 1) {
        super(() => {
            const array = __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isFunction(arrayOrFactory) ? arrayOrFactory() : arrayOrFactory;
            return {
                source: array,
                pointer: start,
                length: array ? array.length : 0,
                step: step
            };
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ArrayEnumerator;

/* unused harmony default export */ var _unused_webpack_default_export = (ArrayEnumerator);
//# sourceMappingURL=ArrayEnumerator.js.map

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_InvalidOperationException__ = __webpack_require__(13);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'ObjectDisposedException';
class ObjectDisposedException extends __WEBPACK_IMPORTED_MODULE_0__Exceptions_InvalidOperationException__["a" /* InvalidOperationException */] {
    // For simplicity and consistency, lets stick with 1 signature.
    constructor(objectName, message, innerException) {
        super(message || '', innerException, (_) => {
            _.objectName = objectName;
        });
    }
    getName() {
        return NAME;
    }
    toString() {
        const _ = this;
        let oName = _.objectName;
        oName = oName ? ('{' + oName + '} ') : '';
        return '[' + _.name + ': ' + oName + _.message + ']';
    }
    static throwIfDisposed(disposable, objectName, message) {
        if (disposable.wasDisposed)
            throw new ObjectDisposedException(objectName, message);
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectDisposedException;

/* unused harmony default export */ var _unused_webpack_default_export = (ObjectDisposedException);
//# sourceMappingURL=ObjectDisposedException.js.map

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispose__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DisposableBase__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentException__ = __webpack_require__(4);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon ObjectPool from Parallel Extension Extras and other ObjectPool implementations.
 * Uses .add(T) and .take():T
 */





// noinspection JSUnusedLocalSymbols
const OBJECT_POOL = "ObjectPool", _MAX_SIZE = "_maxSize", ABSOLUTE_MAX_SIZE = 65536, MUST_BE_GT1 = "Must be at valid number least 1.", MUST_BE_LTM = `Must be less than or equal to ${ABSOLUTE_MAX_SIZE}.`;
class ObjectPool extends __WEBPACK_IMPORTED_MODULE_1__DisposableBase__["a" /* DisposableBase */] {
    constructor(_maxSize, _generator, _recycler) {
        super();
        this._maxSize = _maxSize;
        this._generator = _generator;
        this._recycler = _recycler;
        /**
         * By default will clear after 5 seconds of non-use.
         */
        this.autoClearTimeout = 5000;
        if (isNaN(_maxSize) || _maxSize < 1)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */](_MAX_SIZE, _maxSize, MUST_BE_GT1);
        if (_maxSize > ABSOLUTE_MAX_SIZE)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */](_MAX_SIZE, _maxSize, MUST_BE_LTM);
        this._localAbsMaxSize = Math.min(_maxSize * 2, ABSOLUTE_MAX_SIZE);
        const _ = this;
        _._disposableObjectName = OBJECT_POOL;
        _._pool = [];
        _._trimmer = new __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__["a" /* TaskHandler */](() => _._trim());
        const clear = () => _._clear();
        _._flusher = new __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__["a" /* TaskHandler */](clear);
        _._autoFlusher = new __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__["a" /* TaskHandler */](clear);
    }
    /**
     * Defines the maximum at which trimming should allow.
     * @returns {number}
     */
    get maxSize() {
        return this._maxSize;
    }
    /**
     * Current number of objects in pool.
     * @returns {number}
     */
    get count() {
        const p = this._pool;
        return p ? p.length : 0;
    }
    _trim() {
        const pool = this._pool;
        while (pool.length > this._maxSize) {
            __WEBPACK_IMPORTED_MODULE_0__dispose__["a" /* dispose */].single(pool.pop(), true);
        }
    }
    /**
     * Will trim ensure the pool is less than the maxSize.
     * @param defer A delay before trimming.  Will be overridden by later calls.
     */
    trim(defer) {
        this.throwIfDisposed();
        this._trimmer.start(defer);
    }
    _clear() {
        const _ = this;
        const p = _._pool;
        _._trimmer.cancel();
        _._flusher.cancel();
        _._autoFlusher.cancel();
        __WEBPACK_IMPORTED_MODULE_0__dispose__["a" /* dispose */].these.noCopy(p, true);
        p.length = 0;
    }
    /**
     * Will clear out the pool.
     * Cancels any scheduled trims when executed.
     * @param defer A delay before clearing.  Will be overridden by later calls.
     */
    clear(defer) {
        this.throwIfDisposed();
        this._flusher.start(defer);
    }
    toArrayAndClear() {
        const _ = this;
        _.throwIfDisposed();
        _._trimmer.cancel();
        _._flusher.cancel();
        const p = _._pool;
        _._pool = [];
        return p;
    }
    /**
     * Shortcut for toArrayAndClear();
     */
    dump() {
        return this.toArrayAndClear();
    }
    _onDispose() {
        super._onDispose();
        const _ = this;
        _._generator = null;
        _._recycler = null;
        Object(__WEBPACK_IMPORTED_MODULE_0__dispose__["a" /* dispose */])(_._trimmer, _._flusher, _._autoFlusher);
        _._trimmer = null;
        _._flusher = null;
        _._autoFlusher = null;
        _._pool.length = 0;
        _._pool = null;
    }
    extendAutoClear() {
        const _ = this;
        _.throwIfDisposed();
        const t = _.autoClearTimeout;
        if (isFinite(t) && !_._autoFlusher.isScheduled)
            _._autoFlusher.start(t);
    }
    add(o) {
        const _ = this;
        _.throwIfDisposed();
        if (_._pool.length >= _._localAbsMaxSize) {
            // Getting too big, dispose immediately...
            Object(__WEBPACK_IMPORTED_MODULE_0__dispose__["a" /* dispose */])(o);
        }
        else {
            if (_._recycler)
                _._recycler(o);
            _._pool.push(o);
            const m = _._maxSize;
            if (m < ABSOLUTE_MAX_SIZE && _._pool.length > m)
                _._trimmer.start(500);
        }
        _.extendAutoClear();
    }
    _onTaken() {
        const _ = this, len = _._pool.length;
        if (len <= _._maxSize)
            _._trimmer.cancel();
        if (len)
            _.extendAutoClear();
    }
    tryTake() {
        const _ = this;
        _.throwIfDisposed();
        try {
            return _._pool.pop();
        }
        finally {
            _._onTaken();
        }
    }
    take(factory) {
        const _ = this;
        _.throwIfDisposed();
        if (!_._generator && !factory)
            throw new __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentException__["a" /* ArgumentException */]('factory', "Must provide a factory if on was not provided at construction time.");
        try {
            return _._pool.pop() || factory && factory() || _._generator();
        }
        finally {
            _._onTaken();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectPool;

/* unused harmony default export */ var _unused_webpack_default_export = (ObjectPool);
//# sourceMappingURL=ObjectPool.js.map

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__ = __webpack_require__(11);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'UnsupportedEnumerableException';
class UnsupportedEnumerableException extends __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__["a" /* SystemException */] {
    constructor(message) {
        super(message || "Unsupported enumerable.");
    }
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UnsupportedEnumerableException;

/* unused harmony default export */ var _unused_webpack_default_export = (UnsupportedEnumerableException);
//# sourceMappingURL=UnsupportedEnumerableException.js.map

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__ = __webpack_require__(33);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

/**
 * A simplified stripped down enumerator that until disposed will infinitely return the provided factory.
 * This is analogous to a 'generator' and has a compatible interface.
 */
class InfiniteEnumerator extends __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__["a" /* SimpleEnumerableBase */] {
    /**
     * See InfiniteValueFactory
     * @param _factory
     */
    constructor(_factory) {
        super();
        this._factory = _factory;
    }
    _canMoveNext() {
        return this._factory != null;
    }
    moveNext() {
        const _ = this;
        const f = _._factory;
        if (f) {
            _._current = f(_._current, _.incrementIndex());
            return true;
        }
        return false;
    }
    dispose() {
        super.dispose();
        this._factory = null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InfiniteEnumerator;

/* unused harmony default export */ var _unused_webpack_default_export = (InfiniteEnumerator);
//# sourceMappingURL=InfiniteEnumerator.js.map

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IteratorResult__ = __webpack_require__(22);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

const VOID0 = void 0;
class SimpleEnumerableBase {
    constructor() {
        this.reset();
    }
    get current() {
        return this._current;
    }
    get canMoveNext() {
        return this._canMoveNext();
    }
    tryMoveNext(out) {
        if (this.moveNext()) {
            out(this._current);
            return true;
        }
        return false;
    }
    incrementIndex() {
        let i = this._index;
        this._index = i = isNaN(i) ? 0 : (i + 1);
        return i;
    }
    nextValue() {
        this.moveNext();
        return this._current;
    }
    next() {
        return this.moveNext()
            ? new __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */](this._current, this._index)
            : __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */].Done;
    }
    end() {
        this.dispose();
    }
    'return'(value) {
        try {
            return value !== VOID0 && this._canMoveNext()
                ? new __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */](value, VOID0, true)
                : __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */].Done;
        }
        finally {
            this.dispose();
        }
    }
    reset() {
        this._current = VOID0;
        this._index = NaN;
    }
    dispose() {
        this.reset();
    }
    getIsEndless() {
        return this._canMoveNext();
    }
    get isEndless() {
        return this.getIsEndless();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SimpleEnumerableBase;

/* unused harmony default export */ var _unused_webpack_default_export = (SimpleEnumerableBase);
//# sourceMappingURL=SimpleEnumerableBase.js.map

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IteratorResult__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Functions__ = __webpack_require__(23);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


const VOID0 = void 0;
/**
 * A simplified stripped down enumerable that is always complete and has no results.
 * Frozen and exported as 'empty' to allow for reuse.
 */
const EmptyEnumerator = Object.freeze({
    current: VOID0,
    moveNext: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].False,
    tryMoveNext: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].False,
    nextValue: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].Blank,
    next: __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */].GetDone,
    "return": __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */].GetDone,
    end: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].Blank,
    reset: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].Blank,
    dispose: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].Blank,
    isEndless: false
});
/* harmony export (immutable) */ __webpack_exports__["a"] = EmptyEnumerator;

/* unused harmony default export */ var _unused_webpack_default_export = (EmptyEnumerator);
//# sourceMappingURL=EmptyEnumerator.js.map

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__ = __webpack_require__(33);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

// noinspection JSUnusedLocalSymbols
/**
 * A simplified stripped down enumerator that until disposed will infinitely return the provided factory.
 * This is analogous to a 'generator' and has a compatible interface.
 *
 *
 */
class IteratorEnumerator extends __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__["a" /* SimpleEnumerableBase */] {
    /**
     * @param _iterator
     * @param _isEndless true and false are explicit where as undefined means 'unknown'.
     */
    constructor(_iterator, _isEndless) {
        super();
        this._iterator = _iterator;
        this._isEndless = _isEndless;
    }
    _canMoveNext() {
        return this._iterator != null;
    }
    moveNext(value) {
        const _ = this;
        const i = _._iterator;
        if (i) {
            const r = arguments.length ? i.next(value) : i.next();
            _._current = r.value;
            if (r.done)
                _.dispose();
            else
                return true;
        }
        return false;
    }
    dispose() {
        super.dispose();
        this._iterator = null;
    }
    getIsEndless() {
        return Boolean(this._isEndless) && super.getIsEndless();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IteratorEnumerator;

/* unused harmony default export */ var _unused_webpack_default_export = (IteratorEnumerator);
//# sourceMappingURL=IteratorEnumerator.js.map

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:import-name
var Linq_1 = __webpack_require__(43);
var Startup = /** @class */function () {
    function Startup() {}
    Startup.generator = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, 10];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, 20];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, 30];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    Startup.main = function () {
        var arr = Startup.generator();
        var enu = Linq_1.default.fromAny(arr);
        var v = 100;
        enu.forEach(function (x) {
            ++v;
            console.log(x + v);
        });
        return 0;
    };
    return Startup;
}();
Startup.main();

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["Enumerable"] = Enumerable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__System_Compare__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__System_Collections_Array_copy__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__System_Collections_Array_Compare__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__System_Collections_Enumeration_EmptyEnumerator__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__System_Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__System_Integer__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__System_Functions__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__System_Collections_Enumeration_ArrayEnumerator__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__System_Disposable_DisposableBase__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__System_Collections_Enumeration_UnsupportedEnumerableException__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__System_Disposable_ObjectDisposedException__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__System_Collections_Sorting_KeySortedContext__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__System_Collections_Enumeration_IndexEnumerator__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__System_Collections_Enumeration_IteratorEnumerator__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__System_Collections_Array_initialize__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__System_Random__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__System_Collections_Enumeration_InfiniteEnumerator__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__System_Collections_LazyList__ = __webpack_require__(63);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


























var disposeSingle = __WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["a" /* dispose */].single;
// noinspection JSUnusedLocalSymbols
// #region Local Constants.
const INVALID_DEFAULT = {}; // create a private unique instance for referencing.
const VOID0 = void 0;
const NULL = null;
function BREAK() {
    return 0 /* Break */;
}
function RETURN() {
    return 1 /* Return */;
}
function isNotNullOrUndefined(e) {
    return e != null;
}
// Leave internal to avoid accidental overwriting.
class LinqFunctions extends __WEBPACK_IMPORTED_MODULE_7__System_Functions__["a" /* Functions */] {
    // noinspection JSMethodCanBeStatic
    Greater(a, b) {
        return a > b ? a : b;
    }
    // noinspection JSMethodCanBeStatic
    Lesser(a, b) {
        return a < b ? a : b;
    }
}
const Functions = Object.freeze(new LinqFunctions());
// For re-use as a factory.
function getEmptyEnumerator() {
    return __WEBPACK_IMPORTED_MODULE_4__System_Collections_Enumeration_EmptyEnumerator__["a" /* EmptyEnumerator */];
}
// #endregion
/*
 * NOTE: About InfiniteEnumerable<T> and Enumerable<T>.
 * There may seem like there's extra overrides here and they may seem unnecessary.
 * But after closer inspection you'll see the type chain is retained and
 * infinite enumerables are prevented from having features that finite ones have.
 *
 * I'm not sure if it's the best option to just use overrides, but it honors the typing properly.
 */
class InfiniteLinqEnumerable extends __WEBPACK_IMPORTED_MODULE_13__System_Disposable_DisposableBase__["a" /* DisposableBase */] {
    constructor(_enumeratorFactory, finalizer) {
        super(finalizer);
        this._enumeratorFactory = _enumeratorFactory;
        this._isEndless = true;
        this._disposableObjectName = "InfiniteLinqEnumerable";
    }
    get isEndless() {
        return this._isEndless;
    }
    // #region IEnumerable<T> Implementation...
    getEnumerator() {
        this.throwIfDisposed();
        return this._enumeratorFactory();
    }
    // #endregion
    // #region IDisposable override...
    _onDispose() {
        super._onDispose(); // Just in case.
        this._enumeratorFactory = null;
    }
    // #endregion
    // Return a default (unfiltered) enumerable.
    asEnumerable() {
        const _ = this;
        _.throwIfDisposed();
        return new InfiniteLinqEnumerable(() => _.getEnumerator());
    }
    doAction(action, initializer, isEndless = this.isEndless, onComplete) {
        const _ = this;
        _.throwIfDisposed();
        const isE = isEndless || undefined; // In case it's null.
        if (!action)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("action");
        return new LinqEnumerable(() => {
            let enumerator;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(!action);
                if (initializer)
                    initializer();
                index = 0;
                enumerator = _.getEnumerator();
                // May need a way to propagate isEndless
            }, (yielder) => {
                throwIfDisposed(!action);
                while (enumerator.moveNext()) {
                    let c = enumerator.current;
                    let actionResult = action(c, index++);
                    if (actionResult === false || actionResult === 0 /* Break */)
                        return yielder.yieldBreak();
                    if (actionResult !== 2 /* Skip */)
                        return yielder.yieldReturn(c);
                    // If actionResult===2, then a signal for skip is received.
                }
                if (onComplete)
                    onComplete(index);
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
            }, isE);
        }, 
        // Using a finalizer value reduces the chance of a circular reference
        // since we could simply reference the enumeration and check e.wasDisposed.
        () => {
            action = NULL;
        }, isE);
    }
    force() {
        this.throwIfDisposed();
        this.doAction(BREAK)
            .getEnumerator()
            .moveNext();
    }
    // #region Indexing/Paging methods.
    skip(count) {
        const _ = this;
        _.throwIfDisposed();
        if (!isFinite(count))
            return new InfiniteLinqEnumerable(getEmptyEnumerator);
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count");
        return this.where((element, index) => index >= count);
    }
    take(count) {
        if (!(count > 0))
            return Enumerable.empty();
        const _ = this;
        _.throwIfDisposed();
        if (!isFinite(count))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('count', count, 'Must be finite.');
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count");
        // Once action returns false, the enumeration will stop.
        return _.doAction((element, index) => index < count, null, false);
    }
    // #region Single Value Return...
    elementAt(index) {
        const v = this.elementAtOrDefault(index, INVALID_DEFAULT);
        if (v === INVALID_DEFAULT)
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('index', index, "is greater than or equal to the number of elements in source");
        return v;
    }
    elementAtOrDefault(index, defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assertZeroOrGreater(index, 'index');
        const n = index;
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e => {
            let i = 0;
            while (e.moveNext()) {
                if (i == n)
                    return e.current;
                i++;
            }
            return defaultValue;
        });
    }
    /* Note: Unlike previous implementations, you could pass a predicate into these methods.
     * But since under the hood it ends up calling .where(predicate) anyway,
     * it may be better to remove this to allow for a cleaner signature/override.
     * JavaScript/TypeScript does not easily allow for a strict method interface like C#.
     * Having to write extra override logic is error prone and confusing to the consumer.
     * Removing the predicate here may also cause the consumer of this method to think more about how they structure their query.
     * The end all difference is that the user must declare .where(predicate) before .first(), .single(), or .last().
     * Otherwise there would need to be much more code to handle these cases (.first(predicate), etc);
     * */
    first() {
        const v = this.firstOrDefault(INVALID_DEFAULT);
        if (v === INVALID_DEFAULT)
            throw new Error("first:The sequence is empty.");
        return v;
    }
    firstOrDefault(defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e => e.moveNext() ? e.current : defaultValue);
    }
    single() {
        const _ = this;
        _.throwIfDisposed();
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e => {
            if (e.moveNext()) {
                let value = e.current;
                if (!e.moveNext())
                    return value;
                throw new Error("single:sequence contains more than one element.");
            }
            throw new Error("single:The sequence is empty.");
        });
    }
    singleOrDefault(defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e => {
            if (e.moveNext()) {
                let value = e.current;
                if (!e.moveNext())
                    return value;
            }
            return defaultValue;
        });
    }
    any() {
        const _ = this;
        _.throwIfDisposed();
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e => e.moveNext());
    }
    isEmpty() {
        return !this.any();
    }
    traverseDepthFirst(childrenSelector, resultSelector = Functions.Identity) {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        const isEndless = _._isEndless; // Is endless is not affirmative if false.
        return new LinqEnumerable(() => {
            // Dev Note: May want to consider using an actual stack and not an array.
            let enumeratorStack;
            let enumerator;
            let len; // Avoid using push/pop since they query .length every time and can be slower.
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
                enumeratorStack = [];
                len = 0;
            }, (yielder) => {
                throwIfDisposed(disposed);
                while (true) {
                    if (enumerator.moveNext()) {
                        let value = resultSelector(enumerator.current, len);
                        enumeratorStack[len++] = enumerator;
                        let c = childrenSelector(enumerator.current);
                        let e = !__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isString(c) && Enumerable.fromAny(c);
                        enumerator = e ? e.getEnumerator() : __WEBPACK_IMPORTED_MODULE_4__System_Collections_Enumeration_EmptyEnumerator__["a" /* EmptyEnumerator */];
                        return yielder.yieldReturn(value);
                    }
                    if (len == 0)
                        return false;
                    enumerator.dispose();
                    enumerator = enumeratorStack[--len];
                    enumeratorStack.length = len;
                }
            }, () => {
                try {
                    if (enumerator)
                        enumerator.dispose();
                }
                finally {
                    if (enumeratorStack) {
                        __WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["a" /* dispose */].these.noCopy(enumeratorStack);
                        enumeratorStack.length = 0;
                        enumeratorStack = NULL;
                    }
                }
            }, isEndless);
        }, () => {
            disposed = true;
        }, isEndless);
    }
    flatten() {
        return this.selectMany(entry => {
            let e = !__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isString(entry) && Enumerable.fromAny(entry);
            return e ? e.flatten() : [entry];
        });
    }
    pairwise(selector) {
        const _ = this;
        _.throwIfDisposed();
        if (!selector)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("selector");
        let previous;
        return this.select((value, i) => {
            const result = i ? selector(previous, value, i) : NULL;
            previous = value;
            return result;
        }).skip(1);
    }
    scan(func, seed) {
        const _ = this;
        _.throwIfDisposed();
        if (!func)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("func");
        return (seed === VOID0
            ? this.select((value, i) => seed = i ? func(seed, value, i) : value)
            : this.select((value, i) => seed = func(seed, value, i)));
    }
    // #endregion
    select(selector) {
        return this._filterSelected(selector);
    }
    map(selector) {
        return this._filterSelected(selector);
    }
    /*
    public static IEnumerable<TResult> SelectMany<TSource, TCollection, TResult>(
        this IEnumerable<TSource> source,
        Func<TSource, IEnumerable<TCollection>> collectionSelector,
        Func<TSource, TCollection, TResult> resultSelector)
     */
    _selectMany(collectionSelector, resultSelector) {
        const _ = this;
        _.throwIfDisposed();
        if (!collectionSelector)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("collectionSelector");
        const isEndless = _._isEndless; // Do second enumeration, it will be indeterminate if false.
        if (!resultSelector)
            resultSelector = (a, b) => b;
        return new LinqEnumerable(() => {
            let enumerator;
            let middleEnumerator;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(!collectionSelector);
                enumerator = _.getEnumerator();
                middleEnumerator = VOID0;
                index = 0;
            }, (yielder) => {
                throwIfDisposed(!collectionSelector);
                // Just started, and nothing to enumerate? End.
                if (middleEnumerator === VOID0 && !enumerator.moveNext())
                    return false;
                // moveNext has been called at least once...
                do {
                    // Initialize middle if there isn't one.
                    if (!middleEnumerator) {
                        let middleSeq = collectionSelector(enumerator.current, index++);
                        // Collection is null?  Skip it...
                        if (!middleSeq)
                            continue;
                        middleEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](middleSeq);
                    }
                    if (middleEnumerator.moveNext())
                        return yielder.yieldReturn(resultSelector(enumerator.current, middleEnumerator.current));
                    // else no more in this middle?  Then clear and reset for next...
                    middleEnumerator.dispose();
                    middleEnumerator = null;
                } while (enumerator.moveNext());
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                disposeSingle(middleEnumerator);
                enumerator = NULL;
                middleEnumerator = null;
            }, isEndless);
        }, () => {
            collectionSelector = NULL;
        }, isEndless);
    }
    selectMany(collectionSelector, resultSelector) {
        return this._selectMany(collectionSelector, resultSelector);
    }
    _filterSelected(selector = Functions.Identity, filter) {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        if (!selector)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("selector");
        return new LinqEnumerable(() => {
            let enumerator;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(!selector);
                index = 0;
                enumerator = _.getEnumerator();
            }, (yielder) => {
                throwIfDisposed(disposed);
                while (enumerator.moveNext()) {
                    let i = index++;
                    let result = selector(enumerator.current, i);
                    if (!filter || filter(result, i++))
                        return yielder.yieldReturn(result);
                }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
            }, _._isEndless);
        }, () => {
            disposed = false;
        }, _._isEndless);
    }
    choose(selector = Functions.Identity) {
        return this._filterSelected(selector, isNotNullOrUndefined);
    }
    where(predicate) {
        return this._filterSelected(Functions.Identity, predicate);
    }
    filter(predicate) {
        return this._filterSelected(Functions.Identity, predicate);
    }
    nonNull() {
        return this.where(v => v != null && v != VOID0);
    }
    ofType(type) {
        let typeName;
        switch (type) {
            case Number:
                typeName = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].NUMBER;
                break;
            case String:
                typeName = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].STRING;
                break;
            case Boolean:
                typeName = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].BOOLEAN;
                break;
            case Function:
                typeName = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].FUNCTION;
                break;
            default:
                return this
                    .where(x => x instanceof type);
        }
        return this
            .where(x => isNotNullOrUndefined(x) && typeof x === typeName);
    }
    except(second, compareSelector) {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let enumerator;
            let keys;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
                keys = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector);
                if (second)
                    __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["a" /* forEach */](second, key => { keys.addByKeyValue(key, true); });
            }, (yielder) => {
                throwIfDisposed(disposed);
                while (enumerator.moveNext()) {
                    let current = enumerator.current;
                    if (!keys.containsKey(current)) {
                        keys.addByKeyValue(current, true);
                        return yielder.yieldReturn(current);
                    }
                }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                keys.clear();
            }, isEndless);
        }, () => {
            disposed = true;
        }, isEndless);
    }
    distinct(compareSelector) {
        return this.except(NULL, compareSelector);
    }
    // [0,0,0,1,1,1,2,2,2,0,0,0,1,1] results in [0,1,2,0,1];
    distinctUntilChanged(compareSelector = Functions.Identity) {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let enumerator;
            let compareKey;
            let initial = true;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
            }, (yielder) => {
                throwIfDisposed(disposed);
                while (enumerator.moveNext()) {
                    let key = compareSelector(enumerator.current);
                    if (initial) {
                        initial = false;
                    }
                    else if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(compareKey, key)) {
                        continue;
                    }
                    compareKey = key;
                    return yielder.yieldReturn(enumerator.current);
                }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
            }, isEndless);
        }, () => {
            disposed = true;
        }, isEndless);
    }
    /**
     * Returns a single default value if empty.
     * @param defaultValue
     * @returns {Enumerable}
     */
    defaultIfEmpty(defaultValue) {
        const _ = this;
        const disposed = !_.throwIfDisposed();
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let enumerator;
            let isFirst;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                isFirst = true;
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
            }, (yielder) => {
                throwIfDisposed(disposed);
                if (enumerator.moveNext()) {
                    isFirst = false;
                    return yielder.yieldReturn(enumerator.current);
                }
                else if (isFirst) {
                    isFirst = false;
                    return yielder.yieldReturn(defaultValue);
                }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    zip(second, resultSelector) {
        const _ = this;
        _.throwIfDisposed();
        return new LinqEnumerable(() => {
            let firstEnumerator;
            let secondEnumerator;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                index = 0;
                firstEnumerator = _.getEnumerator();
                secondEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](second);
            }, (yielder) => firstEnumerator.moveNext()
                && secondEnumerator.moveNext()
                && yielder.yieldReturn(resultSelector(firstEnumerator.current, secondEnumerator.current, index++)), () => {
                if (firstEnumerator)
                    firstEnumerator.dispose();
                if (secondEnumerator)
                    secondEnumerator.dispose();
                firstEnumerator = NULL;
                secondEnumerator = NULL;
            });
        });
    }
    zipMultiple(second, resultSelector) {
        const _ = this;
        _.throwIfDisposed();
        if (!second.length)
            return Enumerable.empty();
        return new LinqEnumerable(() => {
            let secondTemp;
            let firstEnumerator;
            let secondEnumerator;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                secondTemp = new __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__["a" /* Queue */](second);
                index = 0;
                firstEnumerator = _.getEnumerator();
                secondEnumerator = NULL;
            }, (yielder) => {
                if (firstEnumerator.moveNext()) {
                    while (true) {
                        while (!secondEnumerator) {
                            if (secondTemp.count) {
                                let next = secondTemp.dequeue();
                                if (next)
                                    secondEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](next);
                            }
                            else
                                return yielder.yieldBreak();
                        }
                        if (secondEnumerator.moveNext())
                            return yielder.yieldReturn(resultSelector(firstEnumerator.current, secondEnumerator.current, index++));
                        secondEnumerator.dispose();
                        secondEnumerator = NULL;
                    }
                }
                return yielder.yieldBreak();
            }, () => {
                if (firstEnumerator)
                    firstEnumerator.dispose();
                if (secondEnumerator)
                    secondEnumerator.dispose();
                if (secondTemp)
                    secondTemp.dispose();
                firstEnumerator = NULL;
                secondEnumerator = NULL;
                secondTemp = NULL;
            });
        });
    }
    // #region Join Methods
    join(inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector = Functions.Identity) {
        const _ = this;
        return new LinqEnumerable(() => {
            let outerEnumerator;
            let lookup;
            let innerElements;
            let innerCount = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                outerEnumerator = _.getEnumerator();
                lookup = Enumerable.from(inner)
                    .toLookup(innerKeySelector, Functions.Identity, compareSelector);
            }, (yielder) => {
                while (true) {
                    if (innerElements) {
                        let innerElement = innerElements[innerCount++];
                        if (innerElement !== VOID0)
                            return yielder.yieldReturn(resultSelector(outerEnumerator.current, innerElement));
                        innerElements = null;
                        innerCount = 0;
                    }
                    if (outerEnumerator.moveNext()) {
                        let key = outerKeySelector(outerEnumerator.current);
                        innerElements = lookup.get(key);
                    }
                    else {
                        return yielder.yieldBreak();
                    }
                }
            }, () => {
                if (outerEnumerator)
                    outerEnumerator.dispose();
                innerElements = null;
                outerEnumerator = NULL;
                lookup = NULL;
            });
        });
    }
    groupJoin(inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector = Functions.Identity) {
        const _ = this;
        return new LinqEnumerable(() => {
            let enumerator;
            let lookup;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                enumerator = _.getEnumerator();
                lookup = Enumerable.from(inner)
                    .toLookup(innerKeySelector, Functions.Identity, compareSelector);
            }, (yielder) => enumerator.moveNext()
                && yielder.yieldReturn(resultSelector(enumerator.current, lookup.get(outerKeySelector(enumerator.current)))), () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
                lookup = NULL;
            });
        });
    }
    merge(enumerables) {
        const _ = this;
        const isEndless = _._isEndless;
        if (!enumerables || enumerables.length == 0)
            return _;
        return new LinqEnumerable(() => {
            let enumerator;
            let queue;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                // 1) First get our values...
                enumerator = _.getEnumerator();
                queue = new __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__["a" /* Queue */](enumerables);
            }, (yielder) => {
                while (true) {
                    while (!enumerator && queue.tryDequeue(value => {
                        enumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](value); // 4) Keep going and on to step 2.  Else fall through to yieldBreak().
                    })) { }
                    if (enumerator && enumerator.moveNext())
                        return yielder.yieldReturn(enumerator.current);
                    if (enumerator) {
                        enumerator.dispose();
                        enumerator = NULL;
                        continue;
                    }
                    return yielder.yieldBreak();
                }
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
                if (queue)
                    queue.dispose();
                queue = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    concat(...enumerables) {
        return this.merge(enumerables);
    }
    union(second, compareSelector = Functions.Identity) {
        const _ = this;
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let firstEnumerator;
            let secondEnumerator;
            let keys;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                firstEnumerator = _.getEnumerator();
                keys = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector); // Acting as a HashSet.
            }, (yielder) => {
                let current;
                if (secondEnumerator === VOID0) {
                    while (firstEnumerator.moveNext()) {
                        current = firstEnumerator.current;
                        if (!keys.containsKey(current)) {
                            keys.addByKeyValue(current, null);
                            return yielder.yieldReturn(current);
                        }
                    }
                    secondEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](second);
                }
                while (secondEnumerator.moveNext()) {
                    current = secondEnumerator.current;
                    if (!keys.containsKey(current)) {
                        keys.addByKeyValue(current, null);
                        return yielder.yieldReturn(current);
                    }
                }
                return false;
            }, () => {
                if (firstEnumerator)
                    firstEnumerator.dispose();
                if (secondEnumerator)
                    secondEnumerator.dispose();
                firstEnumerator = NULL;
                secondEnumerator = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    insertAt(index, other) {
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assertZeroOrGreater(index, 'index');
        const n = index;
        const _ = this;
        _.throwIfDisposed();
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let firstEnumerator;
            let secondEnumerator;
            let count = 0;
            let isEnumerated = false;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                count = 0;
                firstEnumerator = _.getEnumerator();
                secondEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](other);
                isEnumerated = false;
            }, (yielder) => {
                if (count == n) {
                    isEnumerated = true;
                    if (secondEnumerator.moveNext())
                        return yielder.yieldReturn(secondEnumerator.current);
                }
                if (firstEnumerator.moveNext()) {
                    count++;
                    return yielder.yieldReturn(firstEnumerator.current);
                }
                return !isEnumerated
                    && secondEnumerator.moveNext()
                    && yielder.yieldReturn(secondEnumerator.current);
            }, () => {
                if (firstEnumerator)
                    firstEnumerator.dispose();
                firstEnumerator = NULL;
                if (secondEnumerator)
                    secondEnumerator.dispose();
                secondEnumerator = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    alternateMultiple(sequence) {
        const _ = this;
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let buffer, mode, enumerator, alternateEnumerator;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                // Instead of recalling getEnumerator every time, just reset the existing one.
                alternateEnumerator = new __WEBPACK_IMPORTED_MODULE_8__System_Collections_Enumeration_ArrayEnumerator__["a" /* ArrayEnumerator */](Enumerable.toArray(sequence)); // Freeze
                enumerator = _.getEnumerator();
                let hasAtLeastOne = enumerator.moveNext();
                mode = hasAtLeastOne
                    ? 1 /* Return */
                    : 0 /* Break */;
                if (hasAtLeastOne)
                    buffer = enumerator.current;
            }, (yielder) => {
                switch (mode) {
                    case 0 /* Break */:
                        return yielder.yieldBreak();
                    case 2 /* Skip */:
                        if (alternateEnumerator.moveNext())
                            return yielder.yieldReturn(alternateEnumerator.current);
                        alternateEnumerator.reset();
                        mode = 1 /* Return */;
                        break;
                }
                let latest = buffer;
                // Set up the next round...
                // Is there another one?  Set the buffer and setup instruct for the next one to be the alternate.
                let another = enumerator.moveNext();
                mode = another
                    ? 2 /* Skip */
                    : 0 /* Break */;
                if (another)
                    buffer = enumerator.current;
                return yielder.yieldReturn(latest);
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                if (alternateEnumerator)
                    alternateEnumerator.dispose();
                enumerator = NULL;
                alternateEnumerator = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    alternateSingle(value) {
        return this.alternateMultiple(Enumerable.make(value));
    }
    alternate(...sequence) {
        return this.alternateMultiple(sequence);
    }
    // #region Error Handling
    catchError(handler) {
        const _ = this;
        const disposed = !_.throwIfDisposed();
        return new LinqEnumerable(() => {
            let enumerator;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                try {
                    throwIfDisposed(disposed);
                    enumerator = _.getEnumerator();
                }
                catch (e) {
                    // Don't init...
                }
            }, (yielder) => {
                if (enumerator)
                    try {
                        throwIfDisposed(disposed);
                        if (enumerator.moveNext())
                            return yielder.yieldReturn(enumerator.current);
                    }
                    catch (e) {
                        handler(e);
                    }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
            });
        });
    }
    finallyAction(action) {
        const _ = this;
        const disposed = !_.throwIfDisposed();
        return new LinqEnumerable(() => {
            let enumerator;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
            }, (yielder) => {
                throwIfDisposed(disposed);
                return (enumerator.moveNext())
                    ? yielder.yieldReturn(enumerator.current)
                    : false;
            }, () => {
                try {
                    if (enumerator)
                        enumerator.dispose();
                    enumerator = NULL;
                }
                finally {
                    action();
                }
            });
        });
    }
    // #endregion
    buffer(size) {
        if (size < 1 || !isFinite(size))
            throw new Error("Invalid buffer size.");
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(size, "size");
        const _ = this;
        const isEndless = _._isEndless;
        let len;
        return new LinqEnumerable(() => {
            let enumerator;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                enumerator = _.getEnumerator();
            }, (yielder) => {
                let array = Object(__WEBPACK_IMPORTED_MODULE_21__System_Collections_Array_initialize__["a" /* initialize */])(size);
                len = 0;
                while (len < size && enumerator.moveNext()) {
                    array[len++] = enumerator.current;
                }
                array.length = len;
                return !!len && yielder.yieldReturn(array);
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    share() {
        const _ = this;
        _.throwIfDisposed();
        let sharedEnumerator;
        return new LinqEnumerable(() => {
            return sharedEnumerator || (sharedEnumerator = _.getEnumerator());
        }, () => {
            if (sharedEnumerator)
                sharedEnumerator.dispose();
            sharedEnumerator = NULL;
        }, _._isEndless);
    }
    memoize() {
        let source = new __WEBPACK_IMPORTED_MODULE_24__System_Collections_LazyList__["a" /* LazyList */](this);
        return (new InfiniteLinqEnumerable(() => source.getEnumerator(), () => {
            source.dispose();
            source = null;
        }));
    }
}
/* harmony export (immutable) */ __webpack_exports__["InfiniteLinqEnumerable"] = InfiniteLinqEnumerable;

/**
 * Enumerable<T> is a wrapper class that allows more primitive enumerables to exhibit LINQ behavior.
 *
 * In C# Enumerable<T> is not an instance but has extensions for IEnumerable<T>.
 * In this case, we use Enumerable<T> as the underlying class that is being chained.
 */
class LinqEnumerable extends InfiniteLinqEnumerable {
    constructor(enumeratorFactory, finalizer, isEndless) {
        super(enumeratorFactory, finalizer);
        this._isEndless = isEndless;
        this._disposableObjectName = "LinqEnumerable";
    }
    // Return a default (unfiltered) enumerable.
    asEnumerable() {
        const _ = this;
        _.throwIfDisposed();
        return new LinqEnumerable(() => _.getEnumerator());
    }
    // #region Indexing/Paging methods.
    skipWhile(predicate) {
        this.throwIfDisposed();
        return this.doAction((element, index) => predicate(element, index)
            ? 2 /* Skip */
            : 1 /* Return */);
    }
    takeWhile(predicate) {
        this.throwIfDisposed();
        if (!predicate)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('predicate');
        return this.doAction((element, index) => predicate(element, index)
            ? 1 /* Return */
            : 0 /* Break */, null, null // We don't know the state if it is endless or not.
        );
    }
    // Is like the inverse of take While with the ability to return the value identified by the predicate.
    takeUntil(predicate, includeUntilValue) {
        this.throwIfDisposed();
        if (!predicate)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('predicate');
        if (!includeUntilValue)
            return this.doAction((element, index) => predicate(element, index)
                ? 0 /* Break */
                : 1 /* Return */, null, null // We don't know the state if it is endless or not.
            );
        let found = false;
        return this.doAction((element, index) => {
            if (found)
                return 0 /* Break */;
            found = predicate(element, index);
            return 1 /* Return */;
        }, () => {
            found = false;
        }, null // We don't know the state if it is endless or not.
        );
    }
    traverseBreadthFirst(childrenSelector, resultSelector = Functions.Identity) {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        const isEndless = _._isEndless; // Is endless is not affirmative if false.
        return new LinqEnumerable(() => {
            let enumerator;
            let nestLevel = 0;
            let buffer, len;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
                nestLevel = 0;
                buffer = [];
                len = 0;
            }, (yielder) => {
                throwIfDisposed(disposed);
                while (true) {
                    if (enumerator.moveNext()) {
                        buffer[len++] = enumerator.current;
                        return yielder.yieldReturn(resultSelector(enumerator.current, nestLevel));
                    }
                    if (!len)
                        return yielder.yieldBreak();
                    let next = Enumerable
                        .from(buffer)
                        .selectMany(childrenSelector);
                    if (!next.any()) {
                        return yielder.yieldBreak();
                    }
                    else {
                        nestLevel++;
                        buffer = [];
                        len = 0;
                        enumerator.dispose();
                        enumerator = next.getEnumerator();
                    }
                }
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
                buffer.length = 0;
            }, isEndless);
        }, () => {
            disposed = true;
        }, isEndless);
    }
    forEach(action, max = Infinity) {
        const _ = this;
        _.throwIfDisposed();
        if (!action)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("action");
        Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(_.isEndless);
        /*
        // It could be just as easy to do the following:
        return enumUtil.forEach(_, action, max);
        // But to be more active about checking for disposal, we use this instead:
        */
        // Return value of action can be anything, but if it is (===) false then the enumUtil.forEach will discontinue.
        return max > 0 ? Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(_.getEnumerator(), e => {
            Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(!isFinite(max) && e.isEndless);
            let i = 0;
            // It is possible that subsequently 'action' could cause the enumeration to dispose, so we have to check each time.
            while (max > i && _.throwIfDisposed() && e.moveNext()) {
                if (action(e.current, i++) === false)
                    break;
            }
            return i;
        }) : 0;
    }
    // #region Conversion Methods
    toArray(predicate) {
        return predicate
            ? this.where(predicate).toArray()
            : this.copyTo([]);
    }
    copyTo(target, index = 0, count = Infinity) {
        this.throwIfDisposed();
        if (!target)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("target");
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assertZeroOrGreater(index);
        // If not exposing an action that could cause dispose, then use enumUtil.forEach utility instead.
        __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["a" /* forEach */](this, (x, i) => {
            target[i + index] = x;
        }, count);
        return target;
    }
    toLookup(keySelector, elementSelector = Functions.Identity, compareSelector = Functions.Identity) {
        const dict = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector);
        this.forEach((x, i) => {
            let key = keySelector(x, i);
            let element = elementSelector(x, i);
            let array = dict.getValue(key);
            if (array !== VOID0)
                array.push(element);
            else
                dict.addByKeyValue(key, [element]);
        });
        return new Lookup(dict);
    }
    toMap(keySelector, elementSelector) {
        const obj = {};
        this.forEach((x, i) => {
            obj[keySelector(x, i)] = elementSelector(x, i);
        });
        return obj;
    }
    toDictionary(keySelector, elementSelector, compareSelector = Functions.Identity) {
        const dict = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector);
        this.forEach((x, i) => dict.addByKeyValue(keySelector(x, i), elementSelector(x, i)));
        return dict;
    }
    toJoinedString(separator = "", selector = Functions.Identity) {
        return this
            .select(selector)
            .toArray()
            .join(separator);
    }
    // #endregion
    takeExceptLast(count = 1) {
        const _ = this;
        if (!(count > 0))
            return _;
        if (!isFinite(count))
            return Enumerable.empty();
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count");
        const c = count;
        return new LinqEnumerable(() => {
            let enumerator;
            let q;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                enumerator = _.getEnumerator();
                q = new __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__["a" /* Queue */]();
            }, (yielder) => {
                while (enumerator.moveNext()) {
                    // Add the next one to the queue.
                    q.enqueue(enumerator.current);
                    // Did we reach our quota?
                    if (q.count > c)
                        // Okay then, start returning results.
                        return yielder.yieldReturn(q.dequeue());
                }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
                if (q)
                    q.dispose();
                q = NULL;
            });
        });
    }
    skipToLast(count) {
        if (!(count > 0))
            return Enumerable.empty();
        const _ = this;
        if (!isFinite(count))
            return _;
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count");
        // This sets up the query so nothing is done until move next is called.
        return _.reverse()
            .take(count)
            .reverse();
    }
    // To help with type guarding.
    select(selector) {
        return super.select(selector);
    }
    map(selector) {
        return super.select(selector);
    }
    selectMany(collectionSelector, resultSelector) {
        return this._selectMany(collectionSelector, resultSelector);
    }
    choose(selector = Functions.Identity) {
        return this._filterSelected(selector, isNotNullOrUndefined);
    }
    reverse() {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(_._isEndless); // Cannot reverse an endless collection...
        return new LinqEnumerable(() => {
            let buffer;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                _.throwIfDisposed();
                buffer = _.toArray();
                index = buffer.length;
            }, (yielder) => !!index && yielder.yieldReturn(buffer[--index]), () => {
                buffer.length = 0;
            });
        }, () => {
            disposed = true;
        });
    }
    shuffle() {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(_._isEndless); // Cannot shuffle an endless collection...
        return new LinqEnumerable(() => {
            let buffer;
            let capacity;
            let len;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                buffer = _.toArray();
                capacity = len = buffer.length;
            }, (yielder) => {
                // Avoid using major array operations like .slice();
                if (!len)
                    return yielder.yieldBreak();
                let selectedIndex = __WEBPACK_IMPORTED_MODULE_22__System_Random__["a" /* Random */].integer(len);
                let selectedValue = buffer[selectedIndex];
                buffer[selectedIndex] = buffer[--len]; // Take the last one and put it here.
                buffer[len] = NULL; // clear possible reference.
                if (len % 32 == 0)
                    buffer.length = len;
                return yielder.yieldReturn(selectedValue);
            }, () => {
                buffer.length = 0;
            });
        }, () => {
            disposed = true;
        });
    }
    count(predicate) {
        let count = 0;
        this.forEach(predicate
            ? (x, i) => {
                if (predicate(x, i))
                    ++count;
            }
            : () => {
                ++count;
            });
        return count;
    }
    // Akin to '.every' on an array.
    all(predicate) {
        if (!predicate)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("predicate");
        let result = true;
        this.forEach((x, i) => {
            if (!predicate(x, i)) {
                result = false;
                return false; // break
            }
        });
        return result;
    }
    // 'every' has been added here for parity/compatibility with an array.
    every(predicate) {
        return this.all(predicate);
    }
    // Akin to '.some' on an array.
    any(predicate) {
        if (!predicate)
            return super.any();
        let result = false;
        // Splitting the forEach up this way reduces iterative processing.
        // forEach handles the generation and disposal of the enumerator.
        this.forEach((x, i) => {
            result = predicate(x, i); // false = not found and therefore it should continue.  true = found and break;
            return !result;
        });
        return result;
    }
    // 'some' has been added here for parity/compatibility with an array.
    some(predicate) {
        return this.any(predicate);
    }
    contains(value, compareSelector) {
        if (compareSelector) {
            const s = compareSelector(value);
            return this.any(v => Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(compareSelector(v), s));
        }
        return this.any(v => Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(v, value));
    }
    // Originally has an overload for a predicate,
    // but that's a bad idea since this could be an enumeration of functions and therefore fail the intent.
    // Better to chain a where statement first to be more explicit.
    indexOf(value, compareSelector) {
        let found = -1;
        this.forEach(compareSelector
            ? (element, i) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(compareSelector(element, i), compareSelector(value, i), true)) {
                    found = i;
                    return false;
                }
            }
            : (element, i) => {
                // Why?  Because NaN doesn't equal NaN. :P
                if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(element, value, true)) {
                    found = i;
                    return false;
                }
            });
        return found;
    }
    lastIndexOf(value, compareSelector) {
        let result = -1;
        this.forEach(compareSelector
            ? (element, i) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(compareSelector(element, i), compareSelector(value, i), true))
                    result
                        = i;
            }
            : (element, i) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(element, value, true))
                    result = i;
            });
        return result;
    }
    intersect(second, compareSelector) {
        const _ = this;
        _.throwIfDisposed();
        if (!second)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("second");
        const isEndless = _.isEndless;
        return new LinqEnumerable(() => {
            let enumerator;
            let keys;
            let outs;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(!second);
                enumerator = _.getEnumerator();
                keys = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector);
                outs = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector);
                __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["a" /* forEach */](second, key => {
                    keys.addByKeyValue(key, true);
                });
            }, (yielder) => {
                while (enumerator.moveNext()) {
                    let current = enumerator.current;
                    if (!outs.containsKey(current) && keys.containsKey(current)) {
                        outs.addByKeyValue(current, true);
                        return yielder.yieldReturn(current);
                    }
                }
                return yielder.yieldBreak();
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                if (keys)
                    enumerator.dispose();
                if (outs)
                    enumerator.dispose();
                enumerator = NULL;
                keys = NULL;
                outs = NULL;
            }, isEndless);
        }, () => {
            second = NULL;
        }, isEndless);
    }
    sequenceEqual(second, equalityComparer = __WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */]) {
        this.throwIfDisposed();
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e1 => Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](second), e2 => {
            // if both are endless, this will never evaluate.
            Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(e1.isEndless && e2.isEndless);
            while (e1.moveNext()) {
                if (!e2.moveNext() || !equalityComparer(e1.current, e2.current))
                    return false;
            }
            return !e2.moveNext();
        }));
    }
    ofType(type) {
        this.throwIfDisposed();
        return super.ofType(type);
    }
    // #region Ordering Methods
    orderBy(keySelector = Functions.Identity) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this, keySelector, 1 /* Ascending */);
    }
    orderUsing(comparison) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this, null, 1 /* Ascending */, null, comparison);
    }
    orderUsingReversed(comparison) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this, null, -1 /* Descending */, null, comparison);
    }
    orderByDescending(keySelector = Functions.Identity) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this, keySelector, -1 /* Descending */);
    }
    /*
         weightedSample(weightSelector) {
         weightSelector = Utils.createLambda(weightSelector);
         var source = this;
         return new LinqEnumerable<T>(() => {
         var sortedByBound;
         var totalWeight = 0;
         return new EnumeratorBase<T>(
         () => {
         sortedByBound = source
         .choose(function (x) {
         var weight = weightSelector(x);
         if (weight <= 0) return null; // ignore 0
         totalWeight += weight;
         return { value: x, bound: totalWeight }
         })
         .toArray();
         },
         () => {
         if (sortedByBound.length > 0) {
         var draw = (Math.random() * totalWeight) + 1;
         var lower = -1;
         var upper = sortedByBound.length;
         while (upper - lower > 1) {
         var index = ((lower + upper) / 2);
         if (sortedByBound[index].bound >= draw) {
         upper = index;
         }
         else {
         lower = index;
         }
         }
         return (<any>this).yieldReturn(sortedByBound[upper].value);
         }
         return (<any>this).yieldBreak();
         },
         Functions.Blank);
         });
         }
         */
    // #endregion
    buffer(size) {
        return super.buffer(size);
    }
    groupBy(keySelector, elementSelector, compareSelector) {
        if (!elementSelector)
            elementSelector = Functions.Identity; // Allow for 'null' and not just undefined.
        return new LinqEnumerable(() => this
            .toLookup(keySelector, elementSelector, compareSelector)
            .getEnumerator());
    }
    partitionBy(keySelector, elementSelector, resultSelector = (key, elements) => new Grouping(key, elements), compareSelector = Functions.Identity) {
        const _ = this;
        if (!elementSelector)
            elementSelector = Functions.Identity; // Allow for 'null' and not just undefined.
        return new LinqEnumerable(() => {
            let enumerator;
            let key;
            let compareKey;
            let group;
            let len;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(!elementSelector);
                enumerator = _.getEnumerator();
                if (enumerator.moveNext()) {
                    let v = enumerator.current;
                    key = keySelector(v);
                    compareKey = compareSelector(key);
                    group = [elementSelector(v)];
                    len = 1;
                }
                else
                    group = null;
            }, (yielder) => {
                throwIfDisposed(!elementSelector);
                if (!group)
                    return yielder.yieldBreak();
                let hasNext, c;
                while ((hasNext = enumerator.moveNext())) {
                    c = enumerator.current;
                    if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(compareKey, compareSelector(keySelector(c))))
                        group[len++] = elementSelector(c);
                    else
                        break;
                }
                let result = resultSelector(key, group);
                if (hasNext) {
                    c = enumerator.current;
                    key = keySelector(c);
                    compareKey = compareSelector(key);
                    group = [elementSelector(c)];
                    len = 1;
                }
                else {
                    group = null;
                }
                return yielder.yieldReturn(result);
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
                group = null;
            });
        }, () => {
            elementSelector = NULL;
        });
    }
    flatten() {
        return super.flatten();
    }
    pairwise(selector) {
        return super.pairwise(selector);
    }
    aggregate(reduction, initialValue) {
        if (initialValue == VOID0) {
            this.forEach((value, i) => {
                initialValue = i
                    ? reduction(initialValue, value, i)
                    : value;
            });
        }
        else {
            this.forEach((value, i) => {
                initialValue = reduction(initialValue, value, i);
            });
        }
        return initialValue;
    }
    /**
     * Provided as an analog for array.reduce.  Simply a shortcut for aggregate.
     * @param reduction
     * @param initialValue
     */
    reduce(reduction, initialValue) {
        return this.aggregate(reduction, initialValue);
    }
    average(selector = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].numberOrNaN) {
        let count = 0;
        const sum = this.sum((e, i) => {
            count++;
            return selector(e, i);
        });
        return (isNaN(sum) || !count)
            ? NaN
            : (sum / count);
    }
    // If using numbers, it may be useful to call .takeUntil(v=>v==Infinity,true) before calling max. See static versions for numbers.
    max() {
        return this.aggregate(Functions.Greater);
    }
    min() {
        return this.aggregate(Functions.Lesser);
    }
    maxBy(keySelector = Functions.Identity) {
        return this.aggregate((a, b) => (keySelector(a) > keySelector(b)) ? a : b);
    }
    minBy(keySelector = Functions.Identity) {
        return this.aggregate((a, b) => (keySelector(a) < keySelector(b)) ? a : b);
    }
    // Addition...  Only works with numerical enumerations.
    sum(selector = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].numberOrNaN) {
        let sum = 0;
        // This allows for infinity math that doesn't destroy the other values.
        let sumInfinite = 0; // Needs more investigation since we are really trying to retain signs.
        this.forEach((x, i) => {
            let value = selector(x, i);
            if (isNaN(value)) {
                sum = NaN;
                return false;
            }
            if (isFinite(value))
                sum += value;
            else
                sumInfinite +=
                    value > 0 ? (+1) : (-1);
        });
        return isNaN(sum) ? NaN : (sumInfinite ? (sumInfinite * Infinity) : sum);
    }
    // Multiplication...
    product(selector = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].numberOrNaN) {
        let result = 1, exists = false;
        this.forEach((x, i) => {
            exists = true;
            let value = selector(x, i);
            if (isNaN(value)) {
                result = NaN;
                return false;
            }
            if (value == 0) {
                result = 0; // Multiplying by zero will always end in zero.
                return false;
            }
            // Multiplication can never recover from infinity and simply must retain signs.
            // You could cancel out infinity with 1/infinity but no available representation exists.
            result *= value;
        });
        return (exists && isNaN(result)) ? NaN : result;
    }
    /**
     * Takes the first number and divides it by all following.
     * @param selector
     * @returns {number}
     */
    quotient(selector = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].numberOrNaN) {
        let count = 0;
        let result = NaN;
        this.forEach((x, i) => {
            let value = selector(x, i);
            count++;
            if (count === 1) {
                result = value;
            }
            else {
                if (isNaN(value) || value === 0 || !isFinite(value)) {
                    result = NaN;
                    return false;
                }
                result /= value;
            }
        });
        if (count === 1)
            result = NaN;
        return result;
    }
    // #endregion
    // #region Single Value Return...
    last() {
        const _ = this;
        _.throwIfDisposed();
        let value = VOID0;
        let found = false;
        _.forEach(x => {
            found = true;
            value = x;
        });
        if (!found)
            throw new Error("last:No element satisfies the condition.");
        return value;
    }
    lastOrDefault(defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        let value = VOID0;
        let found = false;
        _.forEach(x => {
            found = true;
            value = x;
        });
        return (!found) ? defaultValue : value;
    }
    // #endregion
    memoize() {
        let source = new __WEBPACK_IMPORTED_MODULE_24__System_Collections_LazyList__["a" /* LazyList */](this);
        return (new LinqEnumerable(() => source.getEnumerator(), () => {
            source.dispose();
            source = null;
        }, this.isEndless));
    }
    throwWhenEmpty() {
        return this.doAction(RETURN, null, this.isEndless, count => {
            if (!count)
                throw "Collection is empty.";
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["LinqEnumerable"] = LinqEnumerable;

// Provided for type guarding.
class FiniteEnumerable extends LinqEnumerable {
    constructor(enumeratorFactory, finalizer) {
        super(enumeratorFactory, finalizer, false);
        this._disposableObjectName = "FiniteEnumerable";
    }
}
/* harmony export (immutable) */ __webpack_exports__["FiniteEnumerable"] = FiniteEnumerable;

class ArrayEnumerable extends FiniteEnumerable {
    constructor(source) {
        super(() => {
            _.throwIfDisposed();
            return new __WEBPACK_IMPORTED_MODULE_8__System_Collections_Enumeration_ArrayEnumerator__["a" /* ArrayEnumerator */](() => {
                _.throwIfDisposed("The underlying ArrayEnumerable was disposed.", "ArrayEnumerator");
                return _._source; // Should never be null, but ArrayEnumerable if not disposed simply treats null as empty array.
            });
        });
        const _ = this;
        _._disposableObjectName = "ArrayEnumerable";
        _._source = source;
    }
    _onDispose() {
        super._onDispose();
        this._source = NULL;
    }
    get source() {
        return this._source;
    }
    toArray() {
        const _ = this;
        _.throwIfDisposed();
        return __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["h" /* toArray */](_._source);
    }
    asEnumerable() {
        const _ = this;
        _.throwIfDisposed();
        return new ArrayEnumerable(this._source);
    }
    forEach(action, max = Infinity) {
        const _ = this;
        _.throwIfDisposed();
        return __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["a" /* forEach */](_._source, action, max);
    }
    // These methods should ALWAYS check for array length before attempting anything.
    any(predicate) {
        const _ = this;
        _.throwIfDisposed();
        const source = _._source;
        let len = source.length;
        return !!len && (!predicate || super.any(predicate));
    }
    count(predicate) {
        const _ = this;
        _.throwIfDisposed();
        const source = _._source, len = source.length;
        return len && (predicate ? super.count(predicate) : len);
    }
    elementAtOrDefault(index, defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assertZeroOrGreater(index, 'index');
        const source = _._source;
        return index < source.length
            ? source[index]
            : defaultValue;
    }
    last() {
        const _ = this;
        _.throwIfDisposed();
        const source = _._source, len = source.length;
        return (len)
            ? source[len - 1]
            : super.last();
    }
    lastOrDefault(defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        const source = _._source, len = source.length;
        return len
            ? source[len - 1]
            : defaultValue;
    }
    skip(count) {
        const _ = this;
        _.throwIfDisposed();
        if (!(count > 0))
            return _;
        return new LinqEnumerable(() => new __WEBPACK_IMPORTED_MODULE_8__System_Collections_Enumeration_ArrayEnumerator__["a" /* ArrayEnumerator */](() => _._source, count));
    }
    takeExceptLast(count = 1) {
        const _ = this;
        _.throwIfDisposed();
        return _.take(_._source.length - count);
    }
    skipToLast(count) {
        const _ = this;
        _.throwIfDisposed();
        if (!(count > 0))
            return Enumerable.empty();
        if (!isFinite(count))
            return _;
        const len = _._source
            ? _._source.length
            : 0;
        return _.skip(len - count);
    }
    reverse() {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        return new LinqEnumerable(() => {
            _.throwIfDisposed();
            return new __WEBPACK_IMPORTED_MODULE_19__System_Collections_Enumeration_IndexEnumerator__["a" /* IndexEnumerator */](() => {
                let s = _._source;
                throwIfDisposed(disposed || !s);
                return {
                    source: s,
                    pointer: (s.length - 1),
                    length: s.length,
                    step: -1
                };
            });
        }, () => {
            disposed = true;
        });
    }
    memoize() {
        return this.asEnumerable();
    }
    sequenceEqual(second, equalityComparer = __WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */]) {
        if (__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isArrayLike(second))
            return __WEBPACK_IMPORTED_MODULE_2__System_Collections_Array_Compare__["a" /* areEqual */](this.source, second, true, equalityComparer);
        if (second instanceof ArrayEnumerable)
            return second.sequenceEqual(this.source, equalityComparer);
        return super.sequenceEqual(second, equalityComparer);
    }
    toJoinedString(separator = "", selector = Functions.Identity) {
        const s = this._source;
        return !selector && (s) instanceof (Array)
            ? s.join(separator)
            : super.toJoinedString(separator, selector);
    }
}
class Grouping extends ArrayEnumerable {
    constructor(_groupKey, elements) {
        super(elements);
        this._groupKey = _groupKey;
        this._disposableObjectName = "Grouping";
    }
    get key() {
        return this._groupKey;
    }
}
class Lookup {
    constructor(_dictionary) {
        this._dictionary = _dictionary;
    }
    get count() {
        return this._dictionary.count;
    }
    get(key) {
        return this._dictionary.getValue(key) || null;
    }
    contains(key) {
        return this._dictionary.containsKey(key);
    }
    getEnumerator() {
        const _ = this;
        let enumerator;
        return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            enumerator = _._dictionary.getEnumerator();
        }, (yielder) => {
            if (!enumerator.moveNext())
                return false;
            let current = enumerator.current;
            return yielder.yieldReturn(new Grouping(current.key, current.value));
        }, () => {
            if (enumerator)
                enumerator.dispose();
            enumerator = NULL;
        });
    }
}
class OrderedEnumerable extends FiniteEnumerable {
    constructor(source, keySelector, order, parent, comparer = __WEBPACK_IMPORTED_MODULE_0__System_Compare__["b" /* compare */]) {
        super(NULL);
        this.source = source;
        this.keySelector = keySelector;
        this.order = order;
        this.parent = parent;
        this.comparer = comparer;
        Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(source && source.isEndless);
        this._disposableObjectName = "OrderedEnumerable";
    }
    createOrderedEnumerable(keySelector, order) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this.source, keySelector, order, this);
    }
    thenBy(keySelector) {
        return this.createOrderedEnumerable(keySelector, 1 /* Ascending */);
    }
    thenUsing(comparison) {
        return new OrderedEnumerable(this.source, null, 1 /* Ascending */, this, comparison);
    }
    thenByDescending(keySelector) {
        return this.createOrderedEnumerable(keySelector, -1 /* Descending */);
    }
    thenUsingReversed(comparison) {
        return new OrderedEnumerable(this.source, null, -1 /* Descending */, this, comparison);
    }
    getEnumerator() {
        const _ = this;
        _.throwIfDisposed();
        let buffer;
        let indexes;
        let index = 0;
        return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            _.throwIfDisposed();
            index = 0;
            buffer = Enumerable.toArray(_.source);
            indexes = createSortContext(_)
                .generateSortedIndexes(buffer);
        }, (yielder) => {
            _.throwIfDisposed();
            return (index < indexes.length)
                ? yielder.yieldReturn(buffer[indexes[index++]])
                : false;
        }, () => {
            if (buffer)
                buffer.length = 0;
            buffer = NULL;
            if (indexes)
                indexes.length = 0;
            indexes = NULL;
        }, false);
    }
    _onDispose() {
        const _ = this;
        super._onDispose();
        _.source = NULL;
        _.keySelector = NULL;
        _.order = NULL;
        _.parent = NULL;
    }
}
// A private static helper for the weave function.
function nextEnumerator(queue, e) {
    if (e) {
        if (e.moveNext()) {
            queue.enqueue(e);
        }
        else {
            if (e)
                e.dispose();
            return null;
        }
    }
    return e;
}
/**
 * Recursively builds a SortContext chain.
 * @param orderedEnumerable
 * @param currentContext
 * @returns {any}
 */
function createSortContext(orderedEnumerable, currentContext = null) {
    const context = new __WEBPACK_IMPORTED_MODULE_16__System_Collections_Sorting_KeySortedContext__["a" /* KeySortedContext */](currentContext, orderedEnumerable.keySelector, orderedEnumerable.order, orderedEnumerable.comparer);
    if (orderedEnumerable.parent)
        return createSortContext(orderedEnumerable.parent, context);
    return context;
}
//noinspection JSUnusedLocalSymbols
function throwIfDisposed(disposed) {
    if (disposed)
        throw new __WEBPACK_IMPORTED_MODULE_15__System_Disposable_ObjectDisposedException__["a" /* ObjectDisposedException */]("Enumerable");
    return true;
}
function Enumerable(source, ...additional) {
    return enumerableFrom(source, additional);
}
function enumerableFrom(source, additional) {
    let e = Enumerable.fromAny(source);
    if (!e)
        throw new __WEBPACK_IMPORTED_MODULE_14__System_Collections_Enumeration_UnsupportedEnumerableException__["a" /* UnsupportedEnumerableException */]();
    return (additional && additional.length)
        ? e.merge(additional)
        : e;
}
(function (Enumerable) {
    function from(source, ...additional) {
        return enumerableFrom(source, additional);
    }
    Enumerable.from = from;
    function fromAny(source, defaultEnumerable) {
        if (__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isObject(source) || __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isString(source)) {
            if (source instanceof InfiniteLinqEnumerable)
                return source;
            if (__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isArrayLike(source))
                return new ArrayEnumerable(source);
            if (Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["c" /* isEnumerable */])(source))
                return new LinqEnumerable(() => source.getEnumerator(), null, source.isEndless);
            if (Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["d" /* isEnumerator */])(source))
                return new LinqEnumerable(() => source, null, source.isEndless);
            if (Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["e" /* isIterator */])(source))
                return fromAny(new __WEBPACK_IMPORTED_MODULE_20__System_Collections_Enumeration_IteratorEnumerator__["a" /* IteratorEnumerator */](source));
        }
        else if (__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isFunction(source)) {
            return new InfiniteLinqEnumerable(() => new __WEBPACK_IMPORTED_MODULE_23__System_Collections_Enumeration_InfiniteEnumerator__["a" /* InfiniteEnumerator */](source));
        }
        return defaultEnumerable;
    }
    Enumerable.fromAny = fromAny;
    function fromThese(sources) {
        switch (sources ? sources.length : 0) {
            case 0:
                return empty();
            case 1:
                // Allow for validation and throwing...
                return enumerableFrom(sources[0]);
            default:
                return empty().merge(sources);
        }
    }
    Enumerable.fromThese = fromThese;
    function fromOrEmpty(source) {
        return fromAny(source) || empty();
    }
    Enumerable.fromOrEmpty = fromOrEmpty;
    /**
     * Static helper for converting enumerables to an array.
     * @param source
     * @returns {any}
     */
    function toArray(source) {
        if (source instanceof LinqEnumerable)
            return source.toArray();
        return __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["h" /* toArray */](source);
    }
    Enumerable.toArray = toArray;
    function _choice(values) {
        return new InfiniteLinqEnumerable(() => new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](null, (yielder) => {
            throwIfDisposed(!values);
            return yielder.yieldReturn(__WEBPACK_IMPORTED_MODULE_22__System_Random__["a" /* Random */].select.one(values));
        }, true // Is endless!
        ), () => {
            values.length = 0;
            values = NULL;
        });
    }
    Enumerable._choice = _choice;
    function choice(values) {
        let len = values && values.length;
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!len || !isFinite(len))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('length', length);
        return _choice(Object(__WEBPACK_IMPORTED_MODULE_1__System_Collections_Array_copy__["a" /* copy */])(values));
    }
    Enumerable.choice = choice;
    function chooseFrom(...args) {
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!args.length)
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('length', length);
        return _choice(args);
    }
    Enumerable.chooseFrom = chooseFrom;
    function _cycle(values) {
        return new InfiniteLinqEnumerable(() => {
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                index = 0;
            }, // Reinitialize the value just in case the enumerator is restarted.
            (yielder) => {
                throwIfDisposed(!values);
                if (index >= values.length)
                    index = 0;
                return yielder.yieldReturn(values[index++]);
            }, true // Is endless!
            );
        }, () => {
            values.length = 0;
            values = NULL;
        });
    }
    function cycle(values) {
        let len = values && values.length;
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!len || !isFinite(len))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('length', length);
        // Make a copy to avoid modifying the collection as we go.
        return _cycle(Object(__WEBPACK_IMPORTED_MODULE_1__System_Collections_Array_copy__["a" /* copy */])(values));
    }
    Enumerable.cycle = cycle;
    function cycleThrough(...args) {
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!args.length)
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('length', length);
        return _cycle(args);
    }
    Enumerable.cycleThrough = cycleThrough;
    function empty() {
        // Could be single export function instance, but for safety, we'll make a new one.
        return new FiniteEnumerable(getEmptyEnumerator);
    }
    Enumerable.empty = empty;
    function repeat(element, count = Infinity) {
        if (!(count > 0))
            return Enumerable.empty();
        return isFinite(count) && __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count")
            ? new FiniteEnumerable(() => {
                let c = count;
                let index = 0;
                return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => { index = 0; }, (yielder) => (index++ < c) && yielder.yieldReturn(element), null, false);
            })
            : new LinqEnumerable(() => new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](null, (yielder) => yielder.yieldReturn(element), true // Is endless!
            ));
    }
    Enumerable.repeat = repeat;
    function repeatWithFinalize(initializer, finalizer) {
        if (!initializer)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("initializer");
        return new InfiniteLinqEnumerable(() => {
            let element;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                if (initializer)
                    element = initializer();
            }, (yielder) => {
                return initializer
                    ? yielder.yieldReturn(element)
                    : yielder.yieldBreak();
            }, () => {
                element = NULL;
                if (finalizer)
                    finalizer(element);
            }, true // Is endless!
            );
        }, () => {
            initializer = NULL;
            finalizer = VOID0;
        });
    }
    Enumerable.repeatWithFinalize = repeatWithFinalize;
    /**
     * Creates an enumerable of one element.
     * @param element
     * @returns {FiniteEnumerable<T>}
     */
    function make(element) {
        return repeat(element, 1);
    }
    Enumerable.make = make;
    // start and step can be other than integer.
    function range(start, count, step = 1) {
        if (!isFinite(start))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("start", start, "Must be a finite number.");
        if (!(count > 0))
            return empty();
        if (!step)
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("step", step, "Must be a valid value");
        if (!isFinite(step))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("step", step, "Must be a finite number.");
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count");
        return new FiniteEnumerable(() => {
            let value;
            let c = count; // Force integer evaluation.
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                index = 0;
                value = start;
            }, (yielder) => {
                let result = index++ < c
                    && yielder.yieldReturn(value);
                if (result && index < count)
                    value += step;
                return result;
            }, false);
        });
    }
    Enumerable.range = range;
    function rangeDown(start, count, step = 1) {
        step = Math.abs(step) * -1;
        return range(start, count, step);
    }
    Enumerable.rangeDown = rangeDown;
    // step = -1 behaves the same as toNegativeInfinity;
    function toInfinity(start = 0, step = 1) {
        if (!isFinite(start))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("start", start, "Must be a finite number.");
        if (!step)
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("step", step, "Must be a valid value");
        if (!isFinite(step))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("step", step, "Must be a finite number.");
        return new InfiniteLinqEnumerable(() => {
            let value;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                value = start;
            }, (yielder) => {
                let current = value;
                value += step;
                return yielder.yieldReturn(current);
            }, true // Is endless!
            );
        });
    }
    Enumerable.toInfinity = toInfinity;
    function toNegativeInfinity(start = 0, step = 1) {
        return toInfinity(start, -step);
    }
    Enumerable.toNegativeInfinity = toNegativeInfinity;
    function rangeTo(start, to, step = 1) {
        if (isNaN(to) || !isFinite(to))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("to", to, "Must be a finite number.");
        if (step && !isFinite(step))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("step", step, "Must be a finite non-zero number.");
        // This way we adjust for the delta from start and to so the user can say +/- step and it will work as expected.
        step = Math.abs(step);
        return new FiniteEnumerable(() => {
            let value;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => { value = start; }, start < to
                ? yielder => {
                    let result = value <= to && yielder.yieldReturn(value);
                    if (result)
                        value += step;
                    return result;
                }
                : yielder => {
                    let result = value >= to && yielder.yieldReturn(value);
                    if (result)
                        value -= step;
                    return result;
                }, false);
        });
    }
    Enumerable.rangeTo = rangeTo;
    function matches(input, pattern, flags = "") {
        if (input == null)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("input");
        const type = typeof input;
        if (type != __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].STRING)
            throw new Error("Cannot exec RegExp matches of type '" + type + "'.");
        if (pattern instanceof RegExp) {
            flags += (pattern.ignoreCase) ? "i" : "";
            flags += (pattern.multiline) ? "m" : "";
            pattern = pattern.source;
        }
        if (flags.indexOf("g") === -1)
            flags += "g";
        return new FiniteEnumerable(() => {
            let regex;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                regex = new RegExp(pattern, flags);
            }, (yielder) => {
                // Calling regex.exec consecutively on the same input uses the lastIndex to start the next match.
                let match = regex.exec(input);
                return match != null
                    ? yielder.yieldReturn(match)
                    : yielder.yieldBreak();
            });
        });
    }
    Enumerable.matches = matches;
    function generate(factory, count = Infinity) {
        if (!factory)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("factory");
        if (isNaN(count) || count <= 0)
            return Enumerable.empty();
        return isFinite(count) && __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count")
            ? new FiniteEnumerable(() => {
                let c = count;
                let index = 0;
                return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                    index = 0;
                }, (yielder) => {
                    throwIfDisposed(!factory);
                    let current = index++;
                    return current < c && yielder.yieldReturn(factory(current));
                }, false);
            }, () => {
                factory = NULL;
            })
            : new InfiniteLinqEnumerable(() => {
                let index = 0;
                return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                    index = 0;
                }, (yielder) => {
                    throwIfDisposed(!factory);
                    return yielder.yieldReturn(factory(index++));
                }, true // Is endless!
                );
            }, () => {
                factory = NULL;
            });
    }
    Enumerable.generate = generate;
    var random;
    (function (random) {
        function floats(maxExclusive = 1) {
            return generate(__WEBPACK_IMPORTED_MODULE_22__System_Random__["a" /* Random */].generate(maxExclusive));
        }
        random.floats = floats;
        function integers(boundary, inclusive) {
            return generate(__WEBPACK_IMPORTED_MODULE_22__System_Random__["a" /* Random */].generate.integers(boundary, inclusive));
        }
        random.integers = integers;
    })(random = Enumerable.random || (Enumerable.random = {}));
    function unfold(seed, valueFactory, skipSeed = false) {
        if (!valueFactory)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("factory");
        return new InfiniteLinqEnumerable(() => {
            let index = 0;
            let value;
            let isFirst;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                index = 0;
                value = seed;
                isFirst = !skipSeed;
            }, (yielder) => {
                throwIfDisposed(!valueFactory);
                let i = index++;
                if (isFirst)
                    isFirst = false;
                else
                    value = valueFactory(value, i);
                return yielder.yieldReturn(value);
            }, true // Is endless!
            );
        }, () => {
            valueFactory = NULL;
        });
    }
    Enumerable.unfold = unfold;
    function forEach(enumerable, action, max = Infinity) {
        // Will properly dispose created enumerable.
        // Will throw if enumerable is endless.
        return __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["a" /* forEach */](enumerable, action, max);
    }
    Enumerable.forEach = forEach;
    function map(enumerable, selector) {
        // Will properly dispose created enumerable.
        // Will throw if enumerable is endless.
        return __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["f" /* map */](enumerable, selector);
    }
    Enumerable.map = map;
    // Slightly optimized versions for numbers.
    function max(values) {
        const v = values
            .takeUntil(v => v == +Infinity, true)
            .aggregate(Functions.Greater);
        return v === VOID0 ? NaN : v;
    }
    Enumerable.max = max;
    function min(values) {
        const v = values
            .takeUntil(v => v == -Infinity, true)
            .aggregate(Functions.Lesser);
        return v === VOID0 ? NaN : v;
    }
    Enumerable.min = min;
    /**
     * Takes any set of collections of the same type and weaves them together.
     * @param enumerables
     * @returns {Enumerable<T>}
     */
    function weave(enumerables) {
        if (!enumerables)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('enumerables');
        let disposed = false;
        return new LinqEnumerable(() => {
            let queue;
            let mainEnumerator;
            let index;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                index = 0;
                queue = new __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__["a" /* Queue */]();
                mainEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](enumerables);
            }, (yielder) => {
                throwIfDisposed(disposed);
                let e = null;
                // First pass...
                if (mainEnumerator) {
                    while (!e && mainEnumerator.moveNext()) {
                        let c = mainEnumerator.current;
                        e = nextEnumerator(queue, c ? __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](c) : NULL);
                    }
                    if (!e)
                        mainEnumerator = null;
                }
                while (!e && queue.tryDequeue(value => {
                    e = nextEnumerator(queue, __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](value));
                })) { }
                return e
                    ? yielder.yieldReturn(e.current)
                    : yielder.yieldBreak();
            }, () => {
                if (queue) {
                    __WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["a" /* dispose */].these.noCopy(queue.dump());
                    queue = NULL;
                }
                if (mainEnumerator)
                    mainEnumerator.dispose();
                mainEnumerator = null;
            });
        }, () => {
            disposed = true;
        });
    }
    Enumerable.weave = weave;
})(Enumerable || (Enumerable = {}));
/* harmony default export */ __webpack_exports__["default"] = (Enumerable);
//# sourceMappingURL=Linq.js.map

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */
const NAME = 'Exception';
/**
 * Represents errors that occur during application execution.
 */
class Exception {
    /**
     * Initializes a new instance of the Exception class with a specified error message and optionally a reference to the inner exception that is the cause of this exception.
     * @param message
     * @param innerException
     * @param beforeSealing This delegate is used to allow actions to occur just before this constructor finishes.  Since some compilers do not allow the use of 'this' before super.
     */
    constructor(message, innerException, beforeSealing) {
        this.message = message;
        const _ = this;
        this.name = _.getName();
        this.data = {};
        if (innerException)
            _.data['innerException'] = innerException;
        /* Originally intended to use 'get' accessors for properties,
         * But debuggers don't display these readily yet.
         * Object.freeze has to be used carefully, but will prevent overriding values at runtime.
         */
        if (beforeSealing)
            beforeSealing(_);
        // Node has a .stack, let's use it...
        try {
            let stack = eval("new Error()").stack;
            stack = stack
                && stack
                    .replace(/^Error\n/, '')
                    .replace(/(.|\n)+\s+at new.+/, '')
                || '';
            this.stack = _.toStringWithoutBrackets() + stack;
        }
        catch (ex) { }
        Object.freeze(_);
    }
    /**
     * A string representation of the error type.
     * The default is 'Error'.
     */
    getName() { return NAME; }
    /**
     * The string representation of the Exception instance.
     */
    toString() {
        return `[${this.toStringWithoutBrackets()}]`;
    }
    toStringWithoutBrackets() {
        const _ = this;
        const m = _.message;
        return _.name + (m ? (': ' + m) : '');
    }
    /**
     * Clears the data object.
     */
    dispose() {
        const data = this.data;
        for (let k in data) {
            if (data.hasOwnProperty(k))
                delete data[k];
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Exception;

/* unused harmony default export */ var _unused_webpack_default_export = (Exception);
//# sourceMappingURL=Exception.js.map

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export areAllEqual */
/* harmony export (immutable) */ __webpack_exports__["a"] = areEqual;
/* unused harmony export areEquivalent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


/*  validateSize: Utility for quick validation/invalidation of array equality.
    Why this way?  Why not pass a closure for the last return?
    Reason: Performance and avoiding the creation of new functions/closures. */
function validateSize(a, b) {
    // Both valid and are same object, or both are null/undefined.
    if (a && b && a === b || !a && !b)
        return true;
    // At this point, at least one has to be non-null.
    if (!a || !b)
        return false;
    const len = a.length;
    if (len !== b.length)
        return false;
    // If both are arrays and have zero length, they are equal.
    if (len === 0)
        return true;
    // Return the length for downstream processing.
    return len;
}
function areAllEqual(arrays, strict = true, equalityComparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */]) {
    if (!arrays)
        throw new Error("ArgumentNullException: 'arrays' cannot be null.");
    if (arrays.length < 2)
        throw new Error("Cannot compare a set of arrays less than 2.");
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isFunction(strict)) {
        equalityComparer = strict;
        strict = true;
    }
    const first = arrays[0];
    for (let i = 1, l = arrays.length; i < l; i++) {
        if (!areEqual(first, arrays[i], strict, equalityComparer))
            return false;
    }
    return true;
}
function areEqual(a, b, strict = true, equalityComparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */]) {
    const len = validateSize(a, b);
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isBoolean(len))
        return len;
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isFunction(strict)) {
        equalityComparer = strict;
        strict = true;
    }
    for (let i = 0; i < len; i++) {
        if (!equalityComparer(a[i], b[i], strict))
            return false;
    }
    return true;
}
function internalSort(a, comparer) {
    if (!a || a.length < 2)
        return a;
    const len = a.length;
    let b;
    if (len > 65536)
        b = new Array(len);
    else {
        b = [];
        b.length = len;
    }
    for (let i = 0; i < len; i++) {
        b[i] = a[i];
    }
    b.sort(comparer);
    return b;
}
function areEquivalent(a, b, comparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["b" /* compare */]) {
    const len = validateSize(a, b);
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isBoolean(len))
        return len;
    // There might be a better more performant way to do this, but for the moment, this
    // works quite well.
    a = internalSort(a, comparer);
    b = internalSort(b, comparer);
    for (let i = 0; i < len; i++) {
        if (comparer(a[i], b[i]) !== 0)
            return false;
    }
    return true;
}
//# sourceMappingURL=Compare.js.map

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TaskHandlerBase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__ = __webpack_require__(3);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


// noinspection JSUnusedLocalSymbols
class TaskHandler extends __WEBPACK_IMPORTED_MODULE_0__TaskHandlerBase__["a" /* TaskHandlerBase */] {
    constructor(_action) {
        super();
        this._action = _action;
        if (!_action)
            throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('action');
    }
    _onExecute() {
        this._action();
    }
    _onDispose() {
        super._onDispose();
        this._action = null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TaskHandler;

/* unused harmony default export */ var _unused_webpack_default_export = (TaskHandler);
//# sourceMappingURL=TaskHandler.js.map

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Disposable_DisposableBase__ = __webpack_require__(12);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

// noinspection JSUnusedLocalSymbols
const NAME = "TaskHandlerBase";
/**
 * A simple class for handling potentially repeated executions either deferred or immediate.
 */
class TaskHandlerBase extends __WEBPACK_IMPORTED_MODULE_0__Disposable_DisposableBase__["a" /* DisposableBase */] {
    constructor() {
        super();
        this._disposableObjectName = NAME;
        this._timeoutId = null;
        this._status = 0 /* Created */;
    }
    get isScheduled() {
        return !!this._timeoutId;
    }
    /**
     * Schedules/Reschedules triggering the task.
     * @param defer Optional time to wait until triggering.
     */
    start(defer = 0) {
        this.throwIfDisposed();
        this.cancel();
        this._status = 1 /* WaitingToRun */;
        if (!(defer > 0))
            defer = 0; // A negation is used to catch edge cases.
        if (isFinite(defer))
            this._timeoutId = setTimeout(TaskHandlerBase._handler, defer, this);
    }
    runSynchronously() {
        this.throwIfDisposed();
        TaskHandlerBase._handler(this);
    }
    getStatus() {
        return this._status;
    }
    get status() {
        return this.getStatus();
    }
    // Use a static function here to avoid recreating a new function every time.
    static _handler(d) {
        d.cancel();
        d._status = 2 /* Running */;
        try {
            d._onExecute();
            d._status = 3 /* RanToCompletion */;
        }
        catch (ex) {
            d._status = 5 /* Faulted */;
        }
    }
    _onDispose() {
        this.cancel();
        this._status = null;
    }
    cancel() {
        const id = this._timeoutId;
        if (id) {
            clearTimeout(id);
            this._timeoutId = null;
            this._status = 4 /* Cancelled */;
            return true;
        }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TaskHandlerBase;

/* unused harmony default export */ var _unused_webpack_default_export = (TaskHandlerBase);
//# sourceMappingURL=TaskHandlerBase.js.map

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LinkedNodeList__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Disposable_ObjectPool__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__getIdentifier__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DictionaryBase__ = __webpack_require__(51);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */







// noinspection JSUnusedLocalSymbols
const VOID0 = void 0;
// LinkedList for Dictionary
class HashEntry {
    constructor(key, value, previous, next) {
        this.key = key;
        this.value = value;
        this.previous = previous;
        this.next = next;
    }
}
let linkedListPool;
//noinspection JSUnusedLocalSymbols
function linkedNodeList(recycle) {
    if (!linkedListPool)
        linkedListPool
            = new __WEBPACK_IMPORTED_MODULE_4__Disposable_ObjectPool__["a" /* ObjectPool */](20, () => new __WEBPACK_IMPORTED_MODULE_3__LinkedNodeList__["a" /* LinkedNodeList */](), r => r.clear());
    if (!recycle)
        return linkedListPool.take();
    linkedListPool.add(recycle);
}
class Dictionary extends __WEBPACK_IMPORTED_MODULE_6__DictionaryBase__["a" /* default */] {
    constructor(_keyGenerator) {
        super();
        this._keyGenerator = _keyGenerator;
        this._entries = linkedNodeList();
        this._buckets = {};
    }
    _onDispose() {
        super._onDispose();
        const _ = this;
        _._entries = null;
        _._buckets = null;
        _._hashGenerator = null;
    }
    getCount() {
        return this._entries && this._entries.unsafeCount || 0;
    }
    _getBucket(hash, createIfMissing) {
        if (hash == null || !createIfMissing && !this.getCount())
            return null;
        if (!__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isPrimitiveOrSymbol(hash))
            console.warn("Key type not indexable and could cause Dictionary to be extremely slow.");
        const buckets = this._buckets;
        let bucket = buckets[hash];
        if (createIfMissing && !bucket)
            buckets[hash]
                = bucket
                    = linkedNodeList();
        return bucket || null;
    }
    _getBucketEntry(key, hash, bucket) {
        if (key == null || !this.getCount())
            return null;
        const _ = this, comparer = _._keyGenerator, compareKey = comparer ? comparer(key) : key;
        if (!bucket)
            bucket = _._getBucket(hash || Object(__WEBPACK_IMPORTED_MODULE_5__getIdentifier__["a" /* getIdentifier */])(compareKey));
        return bucket
            && (comparer
                ? bucket.find(e => comparer(e.key) === compareKey)
                : bucket.find(e => e.key === compareKey));
    }
    _getEntry(key) {
        const e = this._getBucketEntry(key);
        return e && e.value;
    }
    getValue(key) {
        const e = this._getEntry(key);
        return e ? e.value : VOID0;
    }
    _setValueInternal(key, value) {
        const _ = this;
        const buckets = _._buckets, entries = _._entries, compareKey = _._keyGenerator ? _._keyGenerator(key) : key, hash = Object(__WEBPACK_IMPORTED_MODULE_5__getIdentifier__["a" /* getIdentifier */])(compareKey);
        let bucket = _._getBucket(hash);
        const bucketEntry = bucket && _._getBucketEntry(key, hash, bucket);
        // Entry exits? Delete or update
        if (bucketEntry) {
            const b = bucket;
            if (value === VOID0) {
                let x = b.removeNode(bucketEntry), y = entries.removeNode(bucketEntry.value);
                if (x && !b.count) {
                    delete buckets[hash];
                    linkedNodeList(b);
                    bucket = null;
                }
                if (x !== y)
                    throw "Entries and buckets are out of sync.";
                if (x)
                    return true;
            }
            else {
                // We don't expose the internal hash entries so replacing the value is ok.
                const old = bucketEntry.value.value;
                bucketEntry.value.value = value;
                return !Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(value, old);
            }
        }
        else if (value !== VOID0) {
            if (!bucket)
                bucket = _._getBucket(hash, true);
            if (!bucket)
                throw new Error(`"${hash}" cannot be added to lookup table.`);
            let entry = new HashEntry(key, value);
            entries.addNode(entry);
            bucket.addNode(new HashEntry(key, entry));
            return true;
        }
        return false;
    }
    _clearInternal() {
        const _ = this;
        const buckets = _._buckets;
        // Ensure reset and clean...
        for (let key in buckets) {
            if (buckets.hasOwnProperty(key)) {
                let bucket = buckets[key];
                delete buckets[key];
                linkedNodeList(bucket);
            }
        }
        return _._entries.clear();
    }
    /*
     * Note: super.getEnumerator() works perfectly well,
     * but enumerating the internal linked node list is much more efficient.
     */
    getEnumerator() {
        const _ = this;
        _.throwIfDisposed();
        let ver, currentEntry;
        return new __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            _.throwIfDisposed();
            ver = _._version;
            currentEntry = _._entries.first;
        }, (yielder) => {
            if (currentEntry) {
                _.throwIfDisposed();
                _.assertVersion(ver);
                const result = { key: currentEntry.key, value: currentEntry.value };
                currentEntry = currentEntry.next || null;
                return yielder.yieldReturn(result);
            }
            return yielder.yieldBreak();
        });
    }
    getKeys() {
        const _ = this;
        const result = [];
        let e = _._entries && _._entries.first;
        while (e) {
            result.push(e.key);
            e = e.next;
        }
        return result;
    }
    getValues() {
        const _ = this;
        const result = [];
        let e = _._entries && _._entries.first;
        while (e) {
            result.push(e.value);
            e = e.next;
        }
        return result;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Dictionary;

/* unused harmony default export */ var _unused_webpack_default_export = (Dictionary);
//# sourceMappingURL=Dictionary.js.map

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Text_Utility__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_InvalidOperationException__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__ = __webpack_require__(6);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */





// noinspection JSUnusedLocalSymbols
/*****************************
 * IMPORTANT NOTES ABOUT PERFORMANCE:
 * http://jsperf.com/simulating-a-queue
 *
 * Adding to an array is very fast, but modifying is slow.
 * LinkedList wins when modifying contents.
 * http://stackoverflow.com/questions/166884/array-versus-linked-list
 *****************************/
/**
 * This class is useful for managing a list of linked nodes, but it does not protect against modifying individual links.
 * If the consumer modifies a link (sets the previous or next value) it will effectively break the collection.
 *
 * It is possible to declare a node type of any kind as long as it contains a previous and next value that can reference another node.
 * Although not as safe as the included LinkedList, this class has less overhead and is more flexible.
 *
 * The count (or length) of this LinkedNodeList is not tracked since it could be corrupted at any time.
 */
class LinkedNodeList {
    constructor() {
        this._first = null;
        this._last = null;
        this.unsafeCount = 0;
        this._version = 0;
    }
    assertVersion(version) {
        if (version !== this._version)
            throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_InvalidOperationException__["a" /* InvalidOperationException */]("Collection was modified.");
        return true;
    }
    /**
     * The first node.  Will be null if the collection is empty.
     */
    get first() {
        return this._first;
    }
    /**
     * The last node.
     */
    get last() {
        return this._last;
    }
    /**
     * Iteratively counts the number of linked nodes and returns the value.
     * @returns {number}
     */
    get count() {
        let next = this._first;
        let i = 0;
        while (next) {
            i++;
            next = next.next;
        }
        return i;
    }
    forEach(action, ignoreVersioning) {
        const _ = this;
        let current = null, next = _.first; // Be sure to track the next node so if current node is removed.
        const version = _._version;
        let index = 0;
        do {
            if (!ignoreVersioning)
                _.assertVersion(version);
            current = next;
            next = current && current.next;
        } while (current
            && action(current, index++) !== false);
        return index;
    }
    map(selector) {
        if (!selector)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('selector');
        const result = [];
        this.forEach((node, i) => {
            result.push(selector(node, i));
        });
        return result;
    }
    /**
     * Erases the linked node's references to each other and returns the number of nodes.
     * @returns {number}
     */
    clear() {
        const _ = this;
        let n, cF = 0, cL = 0;
        // First, clear in the forward direction.
        n = _._first;
        _._first = null;
        while (n) {
            cF++;
            let current = n;
            n = n.next;
            current.next = null;
        }
        // Last, clear in the reverse direction.
        n = _._last;
        _._last = null;
        while (n) {
            cL++;
            let current = n;
            n = n.previous;
            current.previous = null;
        }
        if (cF !== cL)
            console.warn('LinkedNodeList: Forward versus reverse count does not match when clearing. Forward: ' + cF + ", Reverse: " + cL);
        _._version++;
        _.unsafeCount = 0;
        return cF;
    }
    /**
     * Clears the list.
     */
    dispose() {
        this.clear();
    }
    /**
     * Iterates the list to see if a node exists.
     * @param node
     * @returns {boolean}
     */
    contains(node) {
        return this.indexOf(node) != -1;
    }
    /**
     * Gets the index of a particular node.
     * @param index
     */
    getNodeAt(index) {
        if (index < 0)
            return null;
        let next = this._first;
        let i = 0;
        while (next && i++ < index) {
            next = next.next || null;
        }
        return next;
    }
    find(condition) {
        let node = null;
        this.forEach((n, i) => {
            if (condition(n, i)) {
                node = n;
                return false;
            }
        });
        return node;
    }
    /**
     * Iterates the list to find the specified node and returns its index.
     * @param node
     * @returns {boolean}
     */
    indexOf(node) {
        if (node && (node.previous || node.next)) {
            let index = 0;
            let c, n = this._first;
            do {
                c = n;
                if (c === node)
                    return index;
                index++;
            } while ((n = c && c.next));
        }
        return -1;
    }
    /**
     * Removes the first node and returns true if successful.
     * @returns {boolean}
     */
    removeFirst() {
        return !!this._first && this.removeNode(this._first);
    }
    /**
     * Removes the last node and returns true if successful.
     * @returns {boolean}
     */
    removeLast() {
        return !!this._last && this.removeNode(this._last);
    }
    /**
     * Removes the specified node.
     * Returns true if successful and false if not found (already removed).
     * @param node
     * @returns {boolean}
     */
    removeNode(node) {
        if (node == null)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('node');
        const _ = this;
        const prev = node.previous || null, next = node.next || null;
        let a = false, b = false;
        if (prev)
            prev.next = next;
        else if (_._first == node)
            _._first = next;
        else
            a = true;
        if (next)
            next.previous = prev;
        else if (_._last == node)
            _._last = prev;
        else
            b = true;
        if (a !== b) {
            throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentException__["a" /* ArgumentException */]('node', Object(__WEBPACK_IMPORTED_MODULE_0__Text_Utility__["a" /* format */])("Provided node is has no {0} reference but is not the {1} node!", a ? "previous" : "next", a ? "first" : "last"));
        }
        const removed = !a && !b;
        if (removed) {
            _._version++;
            _.unsafeCount--;
            node.previous = null;
            node.next = null;
        }
        return removed;
    }
    /**
     * Adds a node to the end of the list.
     * @param node
     * @returns {LinkedNodeList}
     */
    addNode(node) {
        this.addNodeAfter(node);
        return this;
    }
    /**
     * Inserts a node before the specified 'before' node.
     * If no 'before' node is specified, it inserts it as the first node.
     * @param node
     * @param before
     * @returns {LinkedNodeList}
     */
    addNodeBefore(node, before = null) {
        assertValidDetached(node);
        const _ = this;
        if (!before) {
            before = _._first;
        }
        if (before) {
            let prev = before.previous;
            node.previous = prev;
            node.next = before;
            before.previous = node;
            if (prev)
                prev.next = node;
            if (before == _._first)
                _._first = node;
        }
        else {
            _._first = _._last = node;
        }
        _._version++;
        _.unsafeCount++;
        return this;
    }
    /**
     * Inserts a node after the specified 'after' node.
     * If no 'after' node is specified, it appends it as the last node.
     * @param node
     * @param after
     * @returns {LinkedNodeList}
     */
    addNodeAfter(node, after = null) {
        assertValidDetached(node);
        const _ = this;
        if (!after) {
            after = _._last;
        }
        if (after) {
            let next = after.next;
            node.next = next;
            node.previous = after;
            after.next = node;
            if (next)
                next.previous = node;
            if (after == _._last)
                _._last = node;
        }
        else {
            _._first = _._last = node;
        }
        _._version++;
        _.unsafeCount++;
        return _;
    }
    /**
     * Takes and existing node and replaces it.
     * @param node
     * @param replacement
     * @returns {any}
     */
    replace(node, replacement) {
        if (node == null)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('node');
        if (node == replacement)
            return this;
        assertValidDetached(replacement, 'replacement');
        const _ = this;
        replacement.previous = node.previous;
        replacement.next = node.next;
        if (node.previous)
            node.previous.next = replacement;
        if (node.next)
            node.next.previous = replacement;
        if (node == _._first)
            _._first = replacement;
        if (node == _._last)
            _._last = replacement;
        _._version++;
        return _;
    }
    static valueEnumeratorFrom(list) {
        if (!list)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('list');
        let current, next, version;
        return new __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            // Initialize anchor...
            current = null;
            next = list.first;
            version = list._version;
        }, (yielder) => {
            if (next) {
                list.assertVersion(version);
                current = next;
                next = current && current.next;
                return yielder.yieldReturn(current.value);
            }
            return yielder.yieldBreak();
        });
    }
    static copyValues(list, array, index = 0) {
        if (list && list.first) {
            if (!array)
                throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('array');
            list.forEach((node, i) => {
                array[index + i] = node.value;
            });
        }
        return array;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LinkedNodeList;

function assertValidDetached(node, propName = 'node') {
    if (node == null)
        throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */](propName);
    if (node.next || node.previous)
        throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_InvalidOperationException__["a" /* InvalidOperationException */]("Cannot add a node to a LinkedNodeList that is already linked.");
}
/* unused harmony default export */ var _unused_webpack_default_export = (LinkedNodeList);
//# sourceMappingURL=LinkedNodeList.js.map

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getIdentifier;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

const VOID0 = void 0;
const NULL = "null", GET_SYMBOL = "getSymbol", GET_HASH_CODE = "getHashCode";
function getIdentifier(obj, throwIfUnknown = false) {
    if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isPropertyKey(obj))
        return obj;
    if (obj === null)
        return NULL;
    if (obj === VOID0)
        return __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].UNDEFINED;
    // See ISymbolizable.
    if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].hasMethod(obj, GET_SYMBOL)) {
        return obj.getSymbol();
    }
    // See IHashable.
    if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].hasMethod(obj, GET_HASH_CODE)) {
        return obj.getHashCode();
    }
    if (throwIfUnknown) {
        if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isFunction(throwIfUnknown))
            return throwIfUnknown(obj);
        else
            throw "Cannot create known identity.";
    }
    return (typeof obj.toString == __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].FUNCTION)
        ? obj.toString()
        : Object.prototype.toString.call(obj);
}
/* unused harmony default export */ var _unused_webpack_default_export = (getIdentifier);
//# sourceMappingURL=getIdentifier.js.map

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Enumeration_Enumerator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CollectionBase__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Enumeration_EnumeratorBase__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_InvalidOperationException__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__KeyNotFoundException__ = __webpack_require__(55);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */








// noinspection JSUnusedLocalSymbols
const VOID0 = void 0;
// Design Note: Should DictionaryAbstractBase be IDisposable?
class DictionaryBase extends __WEBPACK_IMPORTED_MODULE_2__CollectionBase__["a" /* CollectionBase */] {
    constructor(source) {
        super(source);
    }
    //noinspection JSUnusedLocalSymbols
    _onValueModified(key, value, old) {
    }
    _addInternal(item) {
        if (!item)
            throw new __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('item', 'Dictionaries must use a valid key/value pair. \'' + item + '\' is not allowed.');
        return Object(__WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__["a" /* extractKeyValue */])(item, (key, value) => this.addByKeyValue(key, value));
    }
    _clearInternal() {
        const _ = this;
        let count = 0;
        for (let key of _.keys) {
            if (_.removeByKey(key))
                count++;
        }
        return count;
    }
    contains(item) {
        // Should never have a null object in the collection.
        if (!item || !this.getCount())
            return false;
        return Object(__WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__["a" /* extractKeyValue */])(item, (key, value) => {
            // Leave as variable for debugging...
            let v = this.getValue(key);
            return Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(value, v);
        });
    }
    _removeInternal(item) {
        if (!item)
            return 0;
        return Object(__WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__["a" /* extractKeyValue */])(item, (key, value) => {
            // Leave as variable for debugging...
            let v = this.getValue(key);
            return (Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(value, v) && this.removeByKey(key))
                ? 1 : 0;
        });
    }
    get keys() { return this.getKeys(); }
    get values() { return this.getValues(); }
    addByKeyValue(key, value) {
        if (value === VOID0)
            throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_InvalidOperationException__["a" /* InvalidOperationException */]("Cannot add 'undefined' as a value.");
        const _ = this;
        if (_.containsKey(key)) {
            const ex = new __WEBPACK_IMPORTED_MODULE_5__Exceptions_InvalidOperationException__["a" /* InvalidOperationException */]("Adding a key/value when the key already exists.");
            ex.data['key'] = key;
            ex.data['value'] = value;
            throw ex;
        }
        return _.setValue(key, value);
    }
    getAssuredValue(key) {
        const value = this.getValue(key);
        if (value === VOID0)
            throw new __WEBPACK_IMPORTED_MODULE_7__KeyNotFoundException__["a" /* KeyNotFoundException */](`Key '${key}' not found.`);
        return value;
    }
    tryGetValue(key, out) {
        const value = this.getValue(key);
        if (value !== VOID0) {
            out(value);
            return true;
        }
        return false;
    }
    /**
     * Sets the value of an entry.
     * It's important to know that 'undefined' cannot exist as a value in the dictionary and is used as a flag for removal.
     * @param key
     * @param value
     * @returns {boolean}
     */
    setValue(key, value) {
        // setValue shouldn't need to worry about recursion...
        const _ = this;
        _.assertModifiable();
        let changed = false;
        const old = _.getValue(key); // get the old value here and pass to internal.
        if (!Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(value, old) && _._setValueInternal(key, value)) {
            changed = true;
            _._onValueModified(key, value, old);
        }
        _._signalModification(changed);
        return changed;
    }
    containsKey(key) {
        return !!this._getEntry(key);
    }
    containsValue(value) {
        const e = this.getEnumerator();
        while (e.moveNext()) {
            if (Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(e.current, value, true)) {
                e.dispose();
                return true;
            }
        }
        return false;
    }
    removeByKey(key) {
        return this.setValue(key, VOID0);
    }
    removeByValue(value) {
        const _ = this;
        let count = 0;
        for (let key of _.getKeys()) {
            if (Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(_.getValue(key), value, true)) {
                _.removeByKey(key);
                count++;
            }
        }
        return count;
    }
    importEntries(pairs) {
        // Allow piping through to trigger onModified properly.
        return super.importEntries(pairs);
    }
    _importEntries(pairs) {
        const _ = this;
        if (!pairs)
            return 0;
        let changed = 0;
        Object(__WEBPACK_IMPORTED_MODULE_1__Enumeration_Enumerator__["a" /* forEach */])(pairs, pair => Object(__WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__["a" /* extractKeyValue */])(pair, (key, value) => {
            if (_._setValueInternal(key, value))
                changed++;
        }));
        return changed;
    }
    getEnumerator() {
        const _ = this;
        _.throwIfDisposed();
        let ver, keys, len, index = 0;
        return new __WEBPACK_IMPORTED_MODULE_3__Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            _.throwIfDisposed();
            ver = _._version; // Track the version since getKeys is a copy.
            keys = _.getKeys();
            len = keys.length;
        }, (yielder) => {
            _.throwIfDisposed();
            _.assertVersion(ver);
            while (index < len) {
                const key = keys[index++], value = _.getValue(key);
                if (value !== VOID0)
                    return yielder.yieldReturn({ key: key, value: value });
            }
            return yielder.yieldBreak();
        });
    }
}
/* unused harmony export DictionaryBase */

/* harmony default export */ __webpack_exports__["a"] = (DictionaryBase);
//# sourceMappingURL=DictionaryBase.js.map

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
// Need to spoof this so WebPack doesn't panic (warnings).
let r;
try {
    r = eval('require');
}
catch (ex) { }
//noinspection JSUnusedGlobalSymbols
const isCommonJS = !!(r && r.resolve);
/* harmony export (immutable) */ __webpack_exports__["a"] = isCommonJS;

//noinspection JSUnusedGlobalSymbols
const isRequireJS = !!(r && r.toUrl && r.defined);
/* harmony export (immutable) */ __webpack_exports__["c"] = isRequireJS;

/*
 * Ensure is in a real Node environment, with a `process.nextTick`.
 * To see through fake Node environments:
 * Mocha test runner - exposes a `process` global without a `nextTick`
 * Browserify - exposes a `process.nexTick` function that uses
 * `setTimeout`. In this case `setImmediate` is preferred because
 * it is faster. Browserify's `process.toString()` yields
 * "[object Object]", while in a real Node environment
 * `process.nextTick()` yields "[object process]".
 */
const isNodeJS = typeof process == "object"
    && process.toString() === "[object process]"
    && process.nextTick != void 0;
/* harmony export (immutable) */ __webpack_exports__["b"] = isNodeJS;

//noinspection JSUnusedAssignment
try {
    Object.freeze(exports);
}
catch (ex) { }
//# sourceMappingURL=Environment.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(53)))

/***/ }),
/* 53 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isKeyValuePair */
/* unused harmony export assertKey */
/* unused harmony export assertTuple */
/* unused harmony export assertNotUndefined */
/* harmony export (immutable) */ __webpack_exports__["a"] = extractKeyValue;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */



const VOID0 = void 0, DOT = '.', KEY = 'key', VALUE = 'value', ITEM = 'item', ITEM_1 = ITEM + '[1]', ITEM_VALUE = ITEM + DOT + VALUE, INVALID_KVP_MESSAGE = 'Invalid type.  Must be a KeyValuePair or Tuple of length 2.', CANNOT_BE_UNDEFINED = 'Cannot equal undefined.';
function isKeyValuePair(kvp) {
    return kvp && kvp.hasOwnProperty(KEY) && kvp.hasOwnProperty(VALUE);
}
function assertKey(key, name = ITEM) {
    assertNotUndefined(key, name + DOT + KEY);
    if (key === null)
        throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */](name + DOT + KEY);
    return key;
}
function assertTuple(tuple, name = ITEM) {
    if (tuple.length != 2)
        throw new __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__["a" /* ArgumentException */](name, 'KeyValuePair tuples must be of length 2.');
    assertKey(tuple[0], name);
}
function assertNotUndefined(value, name) {
    if (value === VOID0)
        throw new __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__["a" /* ArgumentException */](name, CANNOT_BE_UNDEFINED);
    return value;
}
function extractKeyValue(item, to) {
    let key, value;
    if (__WEBPACK_IMPORTED_MODULE_2__Types__["a" /* Type */].isArrayLike(item)) {
        assertTuple(item);
        key = item[0];
        value = assertNotUndefined(item[1], ITEM_1);
    }
    else if (isKeyValuePair(item)) {
        key = assertKey(item.key);
        value = assertNotUndefined(item.value, ITEM_VALUE);
    }
    else {
        throw new __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__["a" /* ArgumentException */](ITEM, INVALID_KVP_MESSAGE);
    }
    return to(key, value);
}
/* unused harmony default export */ var _unused_webpack_default_export = (extractKeyValue);
//# sourceMappingURL=KeyValueExtract.js.map

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__ = __webpack_require__(11);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/system.collections.generic.KeyNotFoundException(v=vs.110).aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'KeyNotFoundException ';
class KeyNotFoundException extends __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__["a" /* SystemException */] {
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyNotFoundException;

/* unused harmony default export */ var _unused_webpack_default_export = (KeyNotFoundException);
//# sourceMappingURL=KeyNotFoundException.js.map

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Array_Utility__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Integer__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_NotImplementedException__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Exceptions_InvalidOperationException__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CollectionBase__ = __webpack_require__(24);
/*!
* @author electricessence / https://github.com/electricessence/
* Based Upon: http://referencesource.microsoft.com/#System/CompMod/system/collections/generic/queue.cs
* Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
*/









// noinspection JSUnusedLocalSymbols
const VOID0 = void 0;
const MINIMUM_GROW = 4;
const SHRINK_THRESHOLD = 32; // Unused?
// var GROW_FACTOR: number = 200;  // double each time
const GROW_FACTOR_HALF = 100;
const DEFAULT_CAPACITY = MINIMUM_GROW;
const emptyArray = Object.freeze([]);
class Queue extends __WEBPACK_IMPORTED_MODULE_8__CollectionBase__["a" /* CollectionBase */] {
    constructor(source, equalityComparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */]) {
        super(VOID0, equalityComparer);
        const _ = this;
        _._head = 0;
        _._tail = 0;
        _._size = 0;
        if (!source)
            _._array = emptyArray;
        else {
            if (__WEBPACK_IMPORTED_MODULE_2__Types__["a" /* Type */].isNumber(source)) {
                const capacity = source;
                assertIntegerZeroOrGreater(capacity, "capacity");
                _._array = capacity
                    ? __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["c" /* initialize */](capacity)
                    : emptyArray;
            }
            else {
                const se = source;
                _._array = __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["c" /* initialize */](__WEBPACK_IMPORTED_MODULE_2__Types__["a" /* Type */].isArrayLike(se)
                    ? se.length
                    : DEFAULT_CAPACITY);
                _._importEntries(se);
            }
        }
        _._capacity = _._array.length;
    }
    getCount() {
        return this._size;
    }
    _addInternal(item) {
        const _ = this;
        const size = _._size;
        let len = _._capacity;
        if (size == len) {
            let newCapacity = len * GROW_FACTOR_HALF;
            if (newCapacity < len + MINIMUM_GROW)
                newCapacity = len + MINIMUM_GROW;
            _.setCapacity(newCapacity);
            len = _._capacity;
        }
        const tail = _._tail;
        _._array[tail] = item;
        _._tail = (tail + 1) % len;
        _._size = size + 1;
        return true;
    }
    //noinspection JSUnusedLocalSymbols
    _removeInternal(item, max) {
        //noinspection HtmlUnknownTag
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_NotImplementedException__["a" /* NotImplementedException */]("ICollection\<T\>.remove is not implemented in Queue\<T\>" +
            " since it would require destroying the underlying array to remove the item.");
    }
    _clearInternal() {
        const _ = this;
        const array = _._array, head = _._head, tail = _._tail, size = _._size;
        if (head < tail)
            __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["a" /* clear */](array, head, tail);
        else {
            __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["a" /* clear */](array, head);
            __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["a" /* clear */](array, 0, tail);
        }
        _._head = 0;
        _._tail = 0;
        _._size = 0;
        _.trimExcess();
        return size;
    }
    _onDispose() {
        super._onDispose();
        const _ = this;
        if (_._array != emptyArray) {
            _._array.length = _._capacity = 0;
            _._array = emptyArray;
        }
    }
    /**
     * Dequeues entries into an array.
     */
    dump(max = Infinity) {
        const _ = this;
        const result = [];
        if (isFinite(max)) {
            __WEBPACK_IMPORTED_MODULE_3__Integer__["a" /* Integer */].assertZeroOrGreater(max);
            if (max !== 0) {
                while (max-- && _._tryDequeueInternal(value => {
                    result.push(value);
                })) { }
            }
        }
        else {
            while (_._tryDequeueInternal(value => {
                result.push(value);
            })) { }
        }
        _.trimExcess();
        _._signalModification();
        return result;
    }
    forEach(action) {
        return super.forEach(action, true);
    }
    setCapacity(capacity) {
        const _ = this;
        assertIntegerZeroOrGreater(capacity, "capacity");
        const array = _._array, len = _._capacity;
        if (capacity > len)
            _.throwIfDisposed();
        if (capacity == len)
            return this;
        const head = _._head, tail = _._tail, size = _._size;
        // Special case where we can simply extend the length of the array. (JavaScript only)
        if (array != emptyArray && capacity > len && head < tail) {
            array.length = _._capacity = capacity;
            _._version++;
            return this;
        }
        // We create a new array because modifying an existing one could be slow.
        const newArray = __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["c" /* initialize */](capacity);
        if (size > 0) {
            if (head < tail) {
                __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["b" /* copyTo */](array, newArray, head, 0, size);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["b" /* copyTo */](array, newArray, head, 0, len - head);
                __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["b" /* copyTo */](array, newArray, 0, len - head, tail);
            }
        }
        _._array = newArray;
        _._capacity = capacity;
        _._head = 0;
        _._tail = (size == capacity) ? 0 : size;
        _._signalModification(true);
        return this;
    }
    enqueue(item) {
        return this.add(item);
    }
    _tryDequeueInternal(out) {
        const _ = this;
        if (!_._size)
            return false;
        const array = _._array, head = _._head;
        const removed = _._array[head];
        array[head] = null;
        _._head = (head + 1) % _._capacity;
        _._size--;
        _._incrementModified();
        out(removed);
        return true;
    }
    dequeue(throwIfEmpty = false) {
        const _ = this;
        _.assertModifiable();
        let result = VOID0;
        if (!this.tryDequeue(value => { result = value; }) && throwIfEmpty)
            throw new __WEBPACK_IMPORTED_MODULE_6__Exceptions_InvalidOperationException__["a" /* InvalidOperationException */]("Cannot dequeue an empty queue.");
        return result;
    }
    /**
     * Checks to see if the queue has entries an pulls an entry from the head of the queue and passes it to the out handler.
     * @param out The 'out' handler that receives the value if it exists.
     * @returns {boolean} True if a value was retrieved.  False if not.
     */
    tryDequeue(out) {
        const _ = this;
        if (!_._size)
            return false;
        _.assertModifiable();
        // A single dequeue shouldn't need update recursion tracking...
        if (this._tryDequeueInternal(out)) {
            // This may preemptively trigger the _onModified.
            if (_._size < _._capacity / 2)
                _.trimExcess(SHRINK_THRESHOLD);
            _._signalModification();
            return true;
        }
        return false;
    }
    _getElement(index) {
        assertIntegerZeroOrGreater(index, "index");
        const _ = this;
        return _._array[(_._head + index) % _._capacity];
    }
    peek(throwIfEmpty = false) {
        if (this._size == 0) {
            if (throwIfEmpty)
                throw new __WEBPACK_IMPORTED_MODULE_6__Exceptions_InvalidOperationException__["a" /* InvalidOperationException */]("Cannot call peek on an empty queue.");
            return VOID0;
        }
        return this._array[this._head];
    }
    trimExcess(threshold) {
        const _ = this;
        const size = _._size;
        if (size < Math.floor(_._capacity * 0.9) && (!threshold && threshold !== 0 || isNaN(threshold) || threshold < size))
            _.setCapacity(size);
    }
    getEnumerator() {
        const _ = this;
        _.throwIfDisposed();
        let index, version, size;
        return new __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            version = _._version;
            size = _._size;
            index = 0;
        }, (yielder) => {
            _.throwIfDisposed();
            _.assertVersion(version);
            if (index == size)
                return yielder.yieldBreak();
            return yielder.yieldReturn(_._getElement(index++));
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Queue;

function assertZeroOrGreater(value, property) {
    if (value < 0)
        throw new __WEBPACK_IMPORTED_MODULE_7__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */](property, value, "Must be greater than zero");
    return true;
}
function assertIntegerZeroOrGreater(value, property) {
    __WEBPACK_IMPORTED_MODULE_3__Integer__["a" /* Integer */].assert(value, property);
    return assertZeroOrGreater(value, property);
}
/* unused harmony default export */ var _unused_webpack_default_export = (Queue);
//# sourceMappingURL=Queue.js.map

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export indexOf */
/* unused harmony export contains */
/* unused harmony export replace */
/* unused harmony export updateRange */
/* harmony export (immutable) */ __webpack_exports__["a"] = clear;
/* unused harmony export register */
/* unused harmony export findIndex */
/* unused harmony export forEach */
/* unused harmony export applyTo */
/* unused harmony export removeIndex */
/* unused harmony export remove */
/* unused harmony export repeat */
/* unused harmony export range */
/* unused harmony export rangeUntil */
/* unused harmony export distinct */
/* unused harmony export flatten */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Integer__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Compare__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__initialize__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__copy__ = __webpack_require__(26);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_6__initialize__["a"]; });
/* unused harmony reexport copy */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7__copy__["b"]; });
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */









const CBN = 'Cannot be null.', CB0 = 'Cannot be zero.', CBL0 = 'Cannot be less than zero.', VFN = 'Must be a valid finite number';
/**
 * Checks to see where the provided array contains an item/value.
 * If the array value is null, then -1 is returned.
 * @param array
 * @param item
 * @param {function?} equalityComparer
 * @returns {number}
 */
function indexOf(array, item, equalityComparer = __WEBPACK_IMPORTED_MODULE_2__Compare__["a" /* areEqual */]) {
    const len = array && array.length;
    if (len) {
        // NaN NEVER evaluates its equality so be careful.
        if ((array) instanceof (Array) && !__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isTrueNaN(item))
            return array.indexOf(item);
        for (let i = 0; i < len; i++) {
            // 'areEqual' includes NaN==NaN evaluation.
            if (equalityComparer(array[i], item))
                return i;
        }
    }
    return -1;
}
/**
 * Checks to see if the provided array contains an item.
 * If the array value is null, then false is returned.
 * @param array
 * @param item
 * @param {function?} equalityComparer
 * @returns {boolean}
 */
function contains(array, item, equalityComparer = __WEBPACK_IMPORTED_MODULE_2__Compare__["a" /* areEqual */]) {
    return indexOf(array, item, equalityComparer) != -1;
}
/**
 * Finds and replaces a value from an array.  Will replaces all instances unless a maximum is specified.
 * @param array
 * @param old
 * @param newValue
 * @param max
 * @returns {number}
 */
function replace(array, old, newValue, max = Infinity) {
    if (!array || !array.length || max === 0)
        return 0;
    if (max < 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('max', max, CBL0);
    if (!max)
        max = Infinity; // just in case.
    let count = 0;
    for (let i = 0, len = array.length; i < len; i++) {
        if (array[i] === old) {
            array[i] = newValue;
            ++count;
            if (count == max)
                break;
        }
    }
    return count;
}
/**
 * Replaces values of an array across a range of indexes.
 * @param array
 * @param value
 * @param start
 * @param stop
 */
function updateRange(array, value, start = 0, stop) {
    if (!array)
        return;
    __WEBPACK_IMPORTED_MODULE_1__Integer__["a" /* Integer */].assertZeroOrGreater(start, 'start');
    if (!stop && stop !== 0)
        stop = array.length;
    __WEBPACK_IMPORTED_MODULE_1__Integer__["a" /* Integer */].assert(stop, 'stop');
    if (stop < start)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("stop", stop, "is less than start");
    for (let i = start; i < stop; i++) {
        array[i] = value;
    }
}
/**
 * Clears (sets to null) values of an array across a range of indexes.
 * @param array
 * @param start
 * @param stop
 */
function clear(array, start = 0, stop) {
    updateRange(array, null, start, stop);
}
/**
 * Ensures a value exists within an array.  If not found, adds to the end.
 * @param array
 * @param item
 * @param {function?} equalityComparer
 * @returns {boolean}
 */
function register(array, item, equalityComparer = __WEBPACK_IMPORTED_MODULE_2__Compare__["a" /* areEqual */]) {
    if (!array)
        throw new __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('array', CBN);
    let len = array.length; // avoid querying .length more than once. *
    const ok = !len || !contains(array, item, equalityComparer);
    if (ok)
        array[len] = item; // * push would query length again.
    return ok;
}
/**
 * Returns the first index of which the provided predicate returns true.
 * Returns -1 if always false.
 * @param array
 * @param predicate
 * @returns {number}
 */
function findIndex(array, predicate) {
    if (!array)
        throw new __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('array', CBN);
    if (!__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isFunction(predicate))
        throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentException__["a" /* ArgumentException */]('predicate', 'Must be a function.');
    const len = array.length;
    if (!__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isNumber(len, true) || len < 0)
        throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentException__["a" /* ArgumentException */]('array', 'Does not have a valid length.');
    if ((array) instanceof (Array)) {
        for (let i = 0; i < len; i++) {
            if (predicate(array[i], i))
                return i;
        }
    }
    else {
        for (let i = 0; i < len; i++) {
            if ((i) in (array) && predicate(array[i], i))
                return i;
        }
    }
    return -1;
}
function forEach(source, action) {
    if (source && action) {
        // Don't cache the length since it is possible that the underlying array changed.
        for (let i = 0; i < source.length; i++) {
            if (action(source[i], i) === false)
                break;
        }
    }
}
/**
 * Is similar to Array.map() but instead of returning a new array, it updates the existing indexes.
 * Can also be applied to a structure that indexes like an array, but may not be.
 * @param target
 * @param fn
 */
function applyTo(target, fn) {
    if (target && fn) {
        for (let i = 0; i < target.length; i++) {
            target[i] = fn(target[i], i);
        }
    }
}
/**
 * Removes an entry at a specified index.
 * @param array
 * @param index
 * @returns {boolean} True if the value was able to be removed.
 */
function removeIndex(array, index) {
    if (!array)
        throw new __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('array', CBN);
    __WEBPACK_IMPORTED_MODULE_1__Integer__["a" /* Integer */].assert(index, 'index');
    if (index < 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('index', index, CBL0);
    const exists = index < array.length;
    if (exists)
        array.splice(index, 1);
    return exists;
}
/**
 * Finds and removes a value from an array.  Will remove all instances unless a maximum is specified.
 * @param array
 * @param value
 * @param max
 * @param {function?} equalityComparer
 * @returns {number} The number of times the value was found and removed.
 */
function remove(array, value, max = Infinity, equalityComparer = __WEBPACK_IMPORTED_MODULE_2__Compare__["a" /* areEqual */]) {
    if (!array || !array.length || max === 0)
        return 0;
    if (max < 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('max', max, CBL0);
    let count = 0;
    if (!max || !isFinite(max)) {
        // Don't track the indexes and remove in reverse.
        for (let i = (array.length - 1); i >= 0; i--) {
            if (equalityComparer(array[i], value)) {
                array.splice(i, 1);
                ++count;
            }
        }
    }
    else {
        // Since the user will expect it to happen in forward order...
        const found = []; // indexes;
        for (let i = 0, len = array.length; i < len; i++) {
            if (equalityComparer(array[i], value)) {
                found.push(i);
                ++count;
                if (count == max)
                    break;
            }
        }
        for (let i = found.length - 1; i >= 0; i--) {
            array.splice(found[i], 1);
        }
    }
    return count;
}
/**
 * Simply repeats a value the number of times specified.
 * @param element
 * @param count
 * @returns {T[]}
 */
function repeat(element, count) {
    __WEBPACK_IMPORTED_MODULE_1__Integer__["a" /* Integer */].assert(count, 'count');
    if (count < 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('count', count, CBL0);
    const result = Object(__WEBPACK_IMPORTED_MODULE_6__initialize__["a" /* initialize */])(count);
    for (let i = 0; i < count; i++) {
        result[i] = element;
    }
    return result;
}
/**
 * Returns a range of numbers based upon the first value and the step value.
 * @param first
 * @param count
 * @param step
 * @returns {number[]}
 */
function range(first, count, step = 1) {
    if (isNaN(first) || !isFinite(first))
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('first', first, VFN);
    if (isNaN(count) || !isFinite(count))
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('count', count, VFN);
    if (count < 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('count', count, CBL0);
    const result = Object(__WEBPACK_IMPORTED_MODULE_6__initialize__["a" /* initialize */])(count);
    for (let i = 0; i < count; i++) {
        result[i] = first;
        first += step;
    }
    return result;
}
/**
 * Returns a range of numbers based upon the first value and the step value excluding any numbers at or beyond the until value.
 * @param first
 * @param until
 * @param step
 * @returns {number[]}
 */
function rangeUntil(first, until, step = 1) {
    if (step == 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('step', step, CB0);
    return range(first, (until - first) / step, step);
}
function distinct(source) {
    if (!source)
        return []; // Allowing for null facilitates regex filtering.
    const seen = {};
    return source.filter(e => !(e in seen) && (seen[e] = true));
}
/**
 * Takes any arrays within an array and inserts the values contained within in place of that array.
 * For every count higher than 0 in recurseDepth it will attempt an additional pass.  Passing Infinity will flatten all arrays contained.
 * @param a
 * @param recurseDepth
 * @returns {any[]}
 */
function flatten(a, recurseDepth = 0) {
    const result = [];
    for (let i = 0; i < a.length; i++) {
        let x = a[i];
        if ((x) instanceof (Array)) {
            if (recurseDepth > 0)
                x = flatten(x, recurseDepth - 1);
            for (let n = 0; n < x.length; n++)
                result.push(x[n]);
        }
        else
            result.push(x);
    }
    return result;
}
//# sourceMappingURL=Utility.js.map

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(11);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'NotImplementedException';
class NotImplementedException extends __WEBPACK_IMPORTED_MODULE_0__SystemException__["a" /* SystemException */] {
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NotImplementedException;

/* unused harmony default export */ var _unused_webpack_default_export = (NotImplementedException);
//# sourceMappingURL=NotImplementedException.js.map

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SortContext__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Functions__ = __webpack_require__(23);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */



// noinspection JSUnusedLocalSymbols
class KeySortedContext extends __WEBPACK_IMPORTED_MODULE_1__SortContext__["a" /* SortContext */] {
    constructor(next, _keySelector, order = 1 /* Ascending */, comparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["b" /* compare */]) {
        super(next, comparer, order);
        this._keySelector = _keySelector;
    }
    compare(a, b) {
        const _ = this;
        let ks = _._keySelector;
        if (!ks || ks == __WEBPACK_IMPORTED_MODULE_2__Functions__["a" /* Functions */].Identity)
            return super.compare(a, b);
        // We force <any> here since it can be a Primitive or IComparable<any>
        const d = __WEBPACK_IMPORTED_MODULE_0__Compare__["b" /* compare */](ks(a), ks(b));
        if (d == 0 && _._next)
            return _._next.compare(a, b);
        return _._order * d;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeySortedContext;

/* unused harmony default export */ var _unused_webpack_default_export = (KeySortedContext);
//# sourceMappingURL=KeySortedContext.js.map

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(2);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

class SortContext {
    constructor(_next, _comparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["b" /* compare */], _order = 1 /* Ascending */) {
        this._next = _next;
        this._comparer = _comparer;
        this._order = _order;
    }
    /**
     * Direction of the comparison.
     * @type {Order}
     */
    get order() { return this._order; }
    /**
     * Generates an array of indexes from the source in order of their expected internalSort without modifying the source.
     * @param source
     * @returns {number[]}
     */
    generateSortedIndexes(source) {
        if (source == null)
            return [];
        const result = source.map((s, i) => i);
        result.sort((a, b) => this.compare(source[a], source[b]));
        return result;
    }
    /**
     * Compares two values based upon SortContext parameters.
     * @param a
     * @param b
     * @returns {any}
     */
    compare(a, b) {
        const _ = this;
        const d = _._comparer(a, b);
        if (d == 0 && _._next)
            return _._next.compare(a, b);
        return _._order * d;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SortContext;

/* unused harmony default export */ var _unused_webpack_default_export = (SortContext);
//# sourceMappingURL=SortContext.js.map

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Random; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Integer__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collections_Array_initialize__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collections_Array_shuffle__ = __webpack_require__(62);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */



var assert = __WEBPACK_IMPORTED_MODULE_0__Integer__["a" /* Integer */].assert;
/**
 * This module only acts as a utility API for getting random numbers from Math.random().
 * If you need repeatable seeded random numbers then you'll need a separate utility.
 * Highly recommended: https://github.com/ckknight/random-js which has typings under @types/random-js.
 */
var Random;
(function (Random) {
    function r(maxExclusive = 1) {
        return Math.floor(Math.random() * maxExclusive);
    }
    function nr(boundary, inclusive) {
        const a = Math.abs(boundary);
        if (a === 0 || a === 1 && !inclusive)
            return 0;
        if (inclusive)
            boundary += boundary / a;
        return r(boundary);
    }
    function arrayCopy(source) {
        const len = source.length;
        const result = Object(__WEBPACK_IMPORTED_MODULE_1__Collections_Array_initialize__["a" /* initialize */])(len);
        for (let i = 0; i < len; i++) {
            result[i] = source[i];
        }
        return result;
    }
    /**
     * Returns a random integer from 0 to the maxExclusive.
     * Negative numbers are allowed.
     *
     * @param maxExclusive
     * @returns {number}
     */
    function integer(maxExclusive) {
        return next(maxExclusive);
    }
    Random.integer = integer;
    /**
     * Returns a function that generates random floating point numbers up to the maxExclusive value.
     * Useful for generating a random and memoizable set for use with other enumerables.
     * @param maxExclusive
     * @returns {()=>number}
     */
    function generate(maxExclusive = 1) {
        return () => r(maxExclusive);
    }
    Random.generate = generate;
    (function (generate) {
        /**
         * Returns a function that generates random integers up to the boundary.
         * Useful for generating a random and memoizable set for use with other enumerables.
         * @param boundary
         * @param inclusive
         * @returns {()=>number}
         */
        function integers(boundary, inclusive) {
            return () => nr(boundary, inclusive);
        }
        generate.integers = integers;
    })(generate = Random.generate || (Random.generate = {}));
    /**
     * Returns a random integer from 0 to the boundary.
     * Return value will be less than the boundary unless inclusive is set to true.
     * Negative numbers are allowed.
     *
     * @param boundary
     * @param inclusive
     * @returns {number}
     */
    function next(boundary, inclusive) {
        assert(boundary, 'boundary');
        return nr(boundary, inclusive);
    }
    Random.next = next;
    (function (next) {
        function integer(boundary, inclusive) {
            return Random.next(boundary, inclusive);
        }
        next.integer = integer;
        function float(boundary = Number.MAX_VALUE) {
            if (isNaN(boundary))
                throw "'boundary' is not a number.";
            return Math.random() * boundary;
        }
        next.float = float;
        function inRange(min, max, inclusive) {
            assert(min, 'min');
            assert(max, 'max');
            let range = max - min;
            if (range === 0)
                return min;
            if (inclusive)
                range += range / Math.abs(range);
            return min + r(range);
        }
        next.inRange = inRange;
    })(next = Random.next || (Random.next = {}));
    /**
     * Returns an array of random integers.
     * @param count
     * @param boundary
     * @param inclusive
     * @returns {number[]}
     */
    function integers(count, boundary, inclusive) {
        assert(count);
        const s = [];
        s.length = count;
        for (let i = 0; i < count; i++) {
            s[i] = nr(boundary, inclusive);
        }
        return s;
    }
    Random.integers = integers;
    /**
     * Shuffles an array.
     * @param target
     * @returns {T}
     */
    function shuffle(target) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__Collections_Array_shuffle__["a" /* shuffle */])(target);
    }
    Random.shuffle = shuffle;
    /**
     * Creates a copy of an array-like  and returns it shuffled.
     * @param source
     * @returns {T[]}
     */
    function copy(source) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__Collections_Array_shuffle__["a" /* shuffle */])(arrayCopy(source));
    }
    Random.copy = copy;
    /**
     * Returns a distinct random set from the source array up to the maxCount or the full length of the array.
     * @param source
     * @param maxCount
     * @returns {any}
     */
    function select(source, maxCount) {
        if (maxCount !== Infinity)
            __WEBPACK_IMPORTED_MODULE_0__Integer__["a" /* Integer */].assertZeroOrGreater(maxCount);
        switch (maxCount) {
            case 0:
                return [];
            case 1:
                return [select.one(source, true)];
            default:
                let result = Object(__WEBPACK_IMPORTED_MODULE_2__Collections_Array_shuffle__["a" /* shuffle */])(arrayCopy(source));
                if (maxCount < result.length)
                    result.length = maxCount;
                return result;
        }
    }
    Random.select = select;
    (function (select) {
        function one(source, throwIfEmpty) {
            if (source && source.length)
                return source[r(source.length)];
            if (throwIfEmpty)
                throw "Cannot select from an empty set.";
        }
        select.one = one;
    })(select = Random.select || (Random.select = {}));
})(Random || (Random = {}));
//# sourceMappingURL=Random.js.map

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = shuffle;
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffle(target) {
    let i = target.length;
    while (--i) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = target[i];
        target[i] = target[j];
        target[j] = temp;
    }
    return target;
}
//# sourceMappingURL=shuffle.js.map

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ReadOnlyCollectionBase__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Integer__ = __webpack_require__(10);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Origin: http://www.fallingcanbedeadly.com/
 * Licensing: MIT
 */




// noinspection JSUnusedLocalSymbols
class LazyList extends __WEBPACK_IMPORTED_MODULE_0__ReadOnlyCollectionBase__["a" /* ReadOnlyCollectionBase */] {
    constructor(source) {
        super();
        this._enumerator = source.getEnumerator();
        this._cached = [];
    }
    _onDispose() {
        super._onDispose();
        const e = this._enumerator;
        this._enumerator = null;
        if (e)
            e.dispose();
        const c = this._cached;
        this._cached = null;
        if (c)
            c.length = 0;
    }
    _getCount() {
        this.finish();
        const c = this._cached;
        return c ? c.length : 0;
    }
    _getEnumerator() {
        let current;
        return new __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            current = 0;
        }, yielder => {
            this.throwIfDisposed();
            const c = this._cached;
            return (current < c.length || this.getNext())
                ? yielder.yieldReturn(c[current++])
                : yielder.yieldBreak();
        });
    }
    get(index) {
        this.throwIfDisposed();
        __WEBPACK_IMPORTED_MODULE_3__Integer__["a" /* Integer */].assertZeroOrGreater(index);
        const c = this._cached;
        while (c.length <= index && this.getNext()) { }
        if (index < c.length)
            return c[index];
        throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("index", "Greater than total count.");
    }
    indexOf(item) {
        this.throwIfDisposed();
        const c = this._cached;
        let result = c.indexOf(item);
        while (result == -1 && this.getNext(value => {
            if (value == item)
                result = c.length - 1;
        })) { }
        return result;
    }
    contains(item) {
        return this.indexOf(item) != -1;
    }
    getNext(out) {
        const e = this._enumerator;
        if (!e)
            return false;
        if (e.moveNext()) {
            const value = e.current;
            this._cached.push(value);
            if (out)
                out(value);
            return true;
        }
        else {
            e.dispose();
            this._enumerator = null;
        }
        return false;
    }
    finish() {
        while (this.getNext()) { }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LazyList;

//# sourceMappingURL=LazyList.js.map

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CollectionBase__ = __webpack_require__(24);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

// noinspection JSUnusedLocalSymbols
class ReadOnlyCollectionBase extends __WEBPACK_IMPORTED_MODULE_0__CollectionBase__["a" /* CollectionBase */] {
    getCount() {
        return this._getCount();
    }
    getIsReadOnly() {
        return true;
    }
    //noinspection JSUnusedLocalSymbols
    _addInternal(entry) {
        return false;
    }
    //noinspection JSUnusedLocalSymbols
    _removeInternal(entry, max) {
        return 0;
    }
    _clearInternal() {
        return 0;
    }
    getEnumerator() {
        return this._getEnumerator();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ReadOnlyCollectionBase;

/* unused harmony default export */ var _unused_webpack_default_export = (ReadOnlyCollectionBase);
//# sourceMappingURL=ReadOnlyCollectionBase.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIDM2M2Q3MDBmNDE3NDEzYzEwMDYzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUeXBlcy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29tcGFyZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnROdWxsRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxBcmd1bWVudEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVudW1lcmF0b3JCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxJbnRlZ2VyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxTeXN0ZW1FeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXERpc3Bvc2FibGVcXERpc3Bvc2FibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGluaXRpYWxpemUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcRW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcZGlzcG9zZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJbmRleEVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSXRlcmF0b3JSZXN1bHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEZ1bmN0aW9ucy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXENvbGxlY3Rpb25CYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGNvcHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRleHRcXFV0aWxpdHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcQXJyYXlFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxEaXNwb3NhYmxlXFxPYmplY3REaXNwb3NlZEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcT2JqZWN0UG9vbC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSW5maW5pdGVFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXFNpbXBsZUVudW1lcmFibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVtcHR5RW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJdGVyYXRvckVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXHNyY1xcdHNcXGFwcC50cyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbS5MaW5xXFxMaW5xLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxBcnJheVxcQ29tcGFyZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcVGhyZWFkaW5nXFxUYXNrc1xcVGFza0hhbmRsZXIuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRocmVhZGluZ1xcVGFza3NcXFRhc2tIYW5kbGVyQmFzZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXERpY3Rpb25hcmllc1xcRGljdGlvbmFyeS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXExpbmtlZE5vZGVMaXN0LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRGljdGlvbmFyaWVzXFxnZXRJZGVudGlmaWVyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRGljdGlvbmFyaWVzXFxEaWN0aW9uYXJ5QmFzZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRW52aXJvbm1lbnQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xccHJvY2Vzc1xcYnJvd3Nlci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcS2V5VmFsdWVFeHRyYWN0LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcS2V5Tm90Rm91bmRFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxRdWV1ZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEFycmF5XFxVdGlsaXR5LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXFNvcnRpbmdcXEtleVNvcnRlZENvbnRleHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxTb3J0aW5nXFxTb3J0Q29udGV4dC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcUmFuZG9tLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXHNodWZmbGUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxMYXp5TGlzdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXFJlYWRPbmx5Q29sbGVjdGlvbkJhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0lBQWdJLDZEQUE2RCxFQUFFO0FBQy9MO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9CQUFvQjtBQUNyQjtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7O0FDaldBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBGQUEwRjtBQUMxRjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7O0FDL0VBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUM0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsVUFBVTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxpRDs7Ozs7Ozs7QUNqQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBCO0FBQ1g7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGtCQUFrQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsNkM7Ozs7Ozs7QUN4QkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFlBQVk7QUFDekM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHVEOzs7Ozs7Ozs7O0FDbkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNVO0FBQ0o7QUFDSTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQixFQUFFO0FBQzNDLGlCQUFpQixvQkFBb0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7Ozs7OztBQ3JOQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQzRCO0FBQ1U7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQjtBQUNBLG1DOzs7Ozs7O0FDdkZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDdkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUFBO0FBQUE7QUFDQTtBQUNBLDBDOzs7Ozs7O0FDdkNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHFEOzs7Ozs7OztBQ2RBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNnQjtBQUNEO0FBQ1c7QUFDQTtBQUNlO0FBQ1o7QUFDTTtBQUNOO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsNkJBQTZCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZSxFQUFFO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsNEJBQTRCLEVBQUU7QUFDeEU7QUFDQTtBQUNBO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7QUMzSkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixNQUFNO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLDhDQUE4QztBQUNuRCxDQUFDLDBCQUEwQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsYUFBYTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7QUNqS0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw0QkFBNEI7QUFDcEQ7QUFDQSxDQUFDLHdDQUF3QztBQUN6QztBQUNBO0FBQ0EsMEM7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhLGNBQWM7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4QkFBOEI7QUFDL0I7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7OztBQzVEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2tCO0FBQ0M7QUFDYTtBQUNJO0FBQ1g7QUFDbUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix1QkFBdUI7QUFDakQ7QUFDQSxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQSwwQzs7Ozs7Ozs7Ozs7O0FDaFhBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDcUI7QUFDVztBQUNNO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixZQUFZO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0M7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixXQUFXO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QyxzREFBc0QsRUFBRTtBQUN4RCxxREFBcUQsT0FBTztBQUM1RDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLEtBQUssSUFBSTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7O0FDM0lBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDWDtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDckJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxtRDs7Ozs7Ozs7Ozs7QUMvQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDa0I7QUFDTztBQUNIO0FBQ2dCO0FBQ1Y7QUFDNUI7QUFDQSxzTEFBc0wsa0JBQWtCO0FBQ3hNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHNDOzs7Ozs7O0FDcktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDBEOzs7Ozs7O0FDakJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsOEM7Ozs7Ozs7QUNwQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsZ0Q7Ozs7Ozs7O0FDakVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDTDtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFBQTtBQUFBO0FBQ0Q7QUFDQSwyQzs7Ozs7OztBQ3hCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQytCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSw4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0N1QztBQUN2QyxpQ0FBb0Y7QUFFcEY7QUFBQSx1QkFrQkEsQ0FBQztBQWhCZ0IsWUFBUyxZQUF4Qjs7OztBQUNFLHlDQUFROztBQUFSLHVCQUFTO0FBQ1QseUNBQVE7O0FBQVIsdUJBQVM7QUFDVCx5Q0FBUTs7QUFBUix1QkFBUzs7OztBQUNWO0FBQ2EsWUFBSSxPQUFsQjtBQUNFLFlBQVMsTUFBVSxRQUFhO0FBQ2hDLFlBQVMsTUFBMEIsT0FBVSxRQUFRLFFBQU07QUFDM0QsWUFBSyxJQUFjO0FBQ2hCLFlBQVEsUUFBQyxVQUFDO0FBQ1gsY0FBSTtBQUNHLG9CQUFJLElBQUUsSUFDZjtBQUFHO0FBRUcsZUFDUjtBQUFDO0FBQ0gsV0FBQztBQUFBO0FBRU0sUUFBUSxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QmY7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQytEO0FBQ2hEO0FBQ2Y7QUFDQTtBQUNpRTtBQUN2QztBQUNYO0FBQ0c7QUFDbUI7QUFDWDtBQUNEO0FBQ0o7QUFDTDtBQUNTO0FBQ0E7QUFDZ0I7QUFDUDtBQUNQO0FBQ0s7QUFDTTtBQUNaO0FBQ0c7QUFDUjtBQUNKO0FBQ1k7QUFDVjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0lBQXFELCtCQUErQixFQUFFO0FBQ3RGLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLHFJQUEwRDtBQUMxRCxxQkFBcUIsSUFBSTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZJQUF1RDtBQUN2RCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpTEFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpSUFBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpSUFBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3RELG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0EsaUJBQWlCO0FBQ2pCLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlJQUFpRCxXQUFXLEVBQUU7QUFDOUQsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFJQUE2QyxlQUFlLEVBQUU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssdURBQXVEO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLElBQUk7QUFDckI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQSxnQzs7Ozs7OztBQ2owRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsYUFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrQkFBK0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7OztBQ3RFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7O0FDdEZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDTTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHVDOzs7Ozs7O0FDdkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7Ozs7Ozs7QUN2RUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ21CO0FBQ0o7QUFDVTtBQUNBO0FBQ0o7QUFDRztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsS0FBSztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7OztBQ25MQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lCO0FBQ21CO0FBQ1I7QUFDSTtBQUNQO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVOQUFpRixFQUFFLDJCQUEyQixFQUFFO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7O0FDcFdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDbUI7QUFDRDtBQUNPO0FBQ0E7QUFDTztBQUNJO0FBQ1Y7QUFDSztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkMsa0JBQWtCLHlCQUF5QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrSEFBbUQsSUFBSTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHlCQUF5QjtBQUN6RTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSwwQzs7Ozs7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLHVDOzs7Ozs7O0FDaENBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUM0QjtBQUNJO0FBQ2pCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQzs7Ozs7OztBQzVDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxnRDs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ21CO0FBQ25CO0FBQ2U7QUFDRztBQUNPO0FBQ1M7QUFDRTtBQUNFO0FBQ2I7QUFDekI7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsSUFBSTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGdCQUFnQixFQUFFO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2UEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ0c7QUFDQztBQUNTO0FBQ0k7QUFDTTtBQUNqQjtBQUNFO0FBQ2Y7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFVBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsUUFBUTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLDJDQUEyQyxTQUFTO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsV0FBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7O0FDL1NBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLG1EOzs7Ozs7Ozs7QUNkQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDc0I7QUFDRjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSw0Qzs7Ozs7OztBQzFCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHVDOzs7Ozs7Ozs7O0FDM0NBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDa0I7QUFDRztBQUNhO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLHFEQUFxRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUsseUNBQXlDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixXQUFXO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLCtDQUErQztBQUNwRCxDQUFDLHdCQUF3QjtBQUN6QixrQzs7Ozs7OztBQzVLQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7Ozs7O0FDbEJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNpQztBQUNLO0FBQ2I7QUFDUDtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUk7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFBQTtBQUFBO0FBQ0Esb0M7Ozs7Ozs7QUN2RkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0Esa0QiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM2M2Q3MDBmNDE3NDEzYzEwMDYzIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuY29uc3QgVk9JRDAgPSB2b2lkICgwKSwgX0JPT0xFQU4gPSB0eXBlb2YgdHJ1ZSwgX05VTUJFUiA9IHR5cGVvZiAwLCBfU1RSSU5HID0gdHlwZW9mIFwiXCIsIF9TWU1CT0wgPSBcInN5bWJvbFwiLCBfT0JKRUNUID0gdHlwZW9mIHt9LCBfVU5ERUZJTkVEID0gdHlwZW9mIFZPSUQwLCBfRlVOQ1RJT04gPSB0eXBlb2YgZnVuY3Rpb24gKCkgeyB9LCBMRU5HVEggPSBcImxlbmd0aFwiO1xuLy8gT25seSB1c2VkIGZvciBwcmltaXRpdmVzLlxuY29uc3QgdHlwZUluZm9SZWdpc3RyeSA9IHt9O1xuLyoqXG4gKiBFeHBvc2VzIGVhc3kgYWNjZXNzIHRvIHR5cGUgaW5mb3JtYXRpb24gaW5jbHVkaW5nIGlucXVpcmluZyBhYm91dCBtZW1iZXJzLlxuICovXG5leHBvcnQgY2xhc3MgVHlwZUluZm8ge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgb25CZWZvcmVGcmVlemUpIHtcbiAgICAgICAgdGhpcy5pc0Jvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc051bWJlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RyaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNUcnVlTmFOID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNPYmplY3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0Z1bmN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNVbmRlZmluZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3ltYm9sID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlID0gdHlwZW9mIHRhcmdldCkge1xuICAgICAgICAgICAgY2FzZSBfQk9PTEVBTjpcbiAgICAgICAgICAgICAgICB0aGlzLmlzQm9vbGVhbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9OVU1CRVI6XG4gICAgICAgICAgICAgICAgdGhpcy5pc051bWJlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1RydWVOYU4gPSBpc05hTih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNGaW5pdGUgPSBpc0Zpbml0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZE51bWJlciA9ICF0aGlzLmlzVHJ1ZU5hTjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX1NUUklORzpcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3RyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX1NZTUJPTDpcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3ltYm9sID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc051bGxPclVuZGVmaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FycmF5ID0gKHRhcmdldCkgaW5zdGFuY2VvZiAoQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9GVU5DVElPTjpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRnVuY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfVU5ERUZJTkVEOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNVbmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNOdWxsT3JVbmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkZhdGFsIHR5cGUgZmFpbHVyZS4gIFVua25vd24gdHlwZTogXCIgKyB0aGlzLnR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uQmVmb3JlRnJlZXplKVxuICAgICAgICAgICAgb25CZWZvcmVGcmVlemUodGhpcyk7XG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBUeXBlSW5mbyBmb3IgYW55IG1lbWJlciBvciBub24tbWVtYmVyLFxuICAgICAqIHdoZXJlIG5vbi1tZW1iZXJzIGFyZSBvZiB0eXBlIHVuZGVmaW5lZC5cbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEByZXR1cm5zIHtUeXBlSW5mb31cbiAgICAgKi9cbiAgICBtZW1iZXIobmFtZSkge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIHJldHVybiBUeXBlSW5mby5nZXRGb3IodCAmJiAobmFtZSkgaW4gKHQpXG4gICAgICAgICAgICA/IHRbbmFtZV1cbiAgICAgICAgICAgIDogVk9JRDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgVHlwZUluZm8gZm9yIGFueSB0YXJnZXQgb2JqZWN0LlxuICAgICAqIElmIHRoZSB0YXJnZXQgb2JqZWN0IGlzIG9mIGEgcHJpbWl0aXZlIHR5cGUsIGl0IHJldHVybnMgdGhlIFR5cGVJbmZvIGluc3RhbmNlIGFzc2lnbmVkIHRvIHRoYXQgdHlwZS5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHJldHVybnMge1R5cGVJbmZvfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRGb3IodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdGFyZ2V0O1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgIGNhc2UgX0ZVTkNUSU9OOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVHlwZUluZm8odGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5mbyA9IHR5cGVJbmZvUmVnaXN0cnlbdHlwZV07XG4gICAgICAgIGlmICghaW5mbylcbiAgICAgICAgICAgIHR5cGVJbmZvUmVnaXN0cnlbdHlwZV0gPSBpbmZvID0gbmV3IFR5cGVJbmZvKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhcmdldCBtYXRjaGVzIHRoZSB0eXBlIChpbnN0YW5jZW9mKS5cbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgdHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSB0YXJnZXQgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIE90aGVyd2lzZSByZXR1cm5zIHRoZSB0YXJnZXQgYXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7VHxudWxsfVxuICAgICAqL1xuICAgIGFzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgdHlwZSA/IHRoaXMudGFyZ2V0IDogbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gVHlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVJbmZvKHRhcmdldCk7XG59XG4oZnVuY3Rpb24gKFR5cGUpIHtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgdHJ1ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5CT09MRUFOID0gX0JPT0xFQU47XG4gICAgLyoqXG4gICAgICogdHlwZW9mIDBcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuTlVNQkVSID0gX05VTUJFUjtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgXCJcIlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5TVFJJTkcgPSBfU1RSSU5HO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiB7fVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5PQkpFQ1QgPSBfT0JKRUNUO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiBTeW1ib2xcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuU1lNQk9MID0gX1NZTUJPTDtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgdW5kZWZpbmVkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLlVOREVGSU5FRCA9IF9VTkRFRklORUQ7XG4gICAgLyoqXG4gICAgICogdHlwZW9mIGZ1bmN0aW9uXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLkZVTkNUSU9OID0gX0ZVTkNUSU9OO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFyZ2V0IG1hdGNoZXMgdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtUfG51bGx9XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModGFyZ2V0LCB0eXBlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgICBUeXBlLmlzID0gaXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSB0YXJnZXQgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIE90aGVyd2lzZSByZXR1cm5zIHRoZSB0YXJnZXQgYXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMge1R8bnVsbH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcyh0YXJnZXQsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIHR5cGUgPyB0YXJnZXQgOiBudWxsO1xuICAgIH1cbiAgICBUeXBlLmFzID0gYXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGw7XG4gICAgfVxuICAgIFR5cGUuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIGJvb2xlYW4uXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9CT09MRUFOO1xuICAgIH1cbiAgICBUeXBlLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIG51bWJlci5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gaWdub3JlTmFOIERlZmF1bHQgaXMgZmFsc2UuIFdoZW4gdHJ1ZSwgTmFOIGlzIG5vdCBjb25zaWRlcmVkIGEgbnVtYmVyIGFuZCB3aWxsIHJldHVybiBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSwgaWdub3JlTmFOID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX05VTUJFUiAmJiAoIWlnbm9yZU5hTiB8fCAhaXNOYU4odmFsdWUpKTtcbiAgICB9XG4gICAgVHlwZS5pc051bWJlciA9IGlzTnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBpcyBhIG51bWJlciBhbmQgaXMgTmFOLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzVHJ1ZU5hTih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfTlVNQkVSICYmIGlzTmFOKHZhbHVlKTtcbiAgICB9XG4gICAgVHlwZS5pc1RydWVOYU4gPSBpc1RydWVOYU47XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX1NUUklORztcbiAgICB9XG4gICAgVHlwZS5pc1N0cmluZyA9IGlzU3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLCBzdHJpbmcsIG51bWJlciwgbnVsbCwgb3IgdW5kZWZpbmVkLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhbGxvd1VuZGVmaW5lZCBpZiBzZXQgdG8gdHJ1ZSB3aWxsIHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWUsIGFsbG93VW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdCA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgICBjYXNlIF9CT09MRUFOOlxuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBfTlVNQkVSOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgY2FzZSBfVU5ERUZJTkVEOlxuICAgICAgICAgICAgICAgIHJldHVybiBhbGxvd1VuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBUeXBlLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG4gICAgLyoqXG4gICAgICogRm9yIGRldGVjdGluZyBpZiB0aGUgdmFsdWUgY2FuIGJlIHVzZWQgYXMgYSBrZXkuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIGFsbG93VW5kZWZpbmVkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1ByaW1pdGl2ZU9yU3ltYm9sKHZhbHVlLCBhbGxvd1VuZGVmaW5lZCA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9TWU1CT0wgPyB0cnVlIDogaXNQcmltaXRpdmUodmFsdWUsIGFsbG93VW5kZWZpbmVkKTtcbiAgICB9XG4gICAgVHlwZS5pc1ByaW1pdGl2ZU9yU3ltYm9sID0gaXNQcmltaXRpdmVPclN5bWJvbDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLCBudW1iZXIsIG9yIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1Byb3BlcnR5S2V5KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgIHN3aXRjaCAodCkge1xuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBfTlVNQkVSOlxuICAgICAgICAgICAgY2FzZSBfU1lNQk9MOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgVHlwZS5pc1Byb3BlcnR5S2V5ID0gaXNQcm9wZXJ0eUtleTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX0ZVTkNUSU9OO1xuICAgIH1cbiAgICBUeXBlLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gYWxsb3dOdWxsIElmIGZhbHNlIChkZWZhdWx0KSBudWxsIGlzIG5vdCBjb25zaWRlcmVkIGFuIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSwgYWxsb3dOdWxsID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX09CSkVDVCAmJiAoYWxsb3dOdWxsIHx8IHZhbHVlICE9PSBudWxsKTtcbiAgICB9XG4gICAgVHlwZS5pc09iamVjdCA9IGlzT2JqZWN0O1xuICAgIC8qKlxuICAgICAqIEd1YXJhbnRlZXMgYSBudW1iZXIgdmFsdWUgb3IgTmFOIGluc3RlYWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBudW1iZXJPck5hTih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpID8gTmFOIDogdmFsdWU7XG4gICAgfVxuICAgIFR5cGUubnVtYmVyT3JOYU4gPSBudW1iZXJPck5hTjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgVHlwZUluZm8gb2JqZWN0IGZvciB0aGUgdGFyZ2V0LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyB7VHlwZUluZm99XG4gICAgICovXG4gICAgZnVuY3Rpb24gb2YodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBUeXBlSW5mby5nZXRGb3IodGFyZ2V0KTtcbiAgICB9XG4gICAgVHlwZS5vZiA9IG9mO1xuICAgIC8qKlxuICAgICAqIFdpbGwgZGV0ZWN0IGlmIGEgbWVtYmVyIGV4aXN0cyAodXNpbmcgJ2luJykuXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGEgcHJvcGVydHkgb3IgbWV0aG9kIGV4aXN0cyBvbiB0aGUgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUuXG4gICAgICogQHBhcmFtIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHByb3BlcnR5IE5hbWUgb2YgdGhlIG1lbWJlci5cbiAgICAgKiBAcGFyYW0gaWdub3JlVW5kZWZpbmVkIFdoZW4gaWdub3JlVW5kZWZpbmVkIGlzIHRydWUsIGlmIHRoZSBtZW1iZXIgZXhpc3RzIGJ1dCBpcyB1bmRlZmluZWQsIGl0IHdpbGwgcmV0dXJuIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc01lbWJlcihpbnN0YW5jZSwgcHJvcGVydHksIGlnbm9yZVVuZGVmaW5lZCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlICYmICFpc1ByaW1pdGl2ZShpbnN0YW5jZSkgJiYgKHByb3BlcnR5KSBpbiAoaW5zdGFuY2UpICYmIChpZ25vcmVVbmRlZmluZWQgfHwgaW5zdGFuY2VbcHJvcGVydHldICE9PSBWT0lEMCk7XG4gICAgfVxuICAgIFR5cGUuaGFzTWVtYmVyID0gaGFzTWVtYmVyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbWVtYmVyIG1hdGNoZXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIHByb3BlcnR5LCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBoYXNNZW1iZXIoaW5zdGFuY2UsIHByb3BlcnR5KSAmJiB0eXBlb2YgKGluc3RhbmNlW3Byb3BlcnR5XSkgPT09IHR5cGU7XG4gICAgfVxuICAgIFR5cGUuaGFzTWVtYmVyT2ZUeXBlID0gaGFzTWVtYmVyT2ZUeXBlO1xuICAgIGZ1bmN0aW9uIGhhc01ldGhvZChpbnN0YW5jZSwgcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIGhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgcHJvcGVydHksIF9GVU5DVElPTik7XG4gICAgfVxuICAgIFR5cGUuaGFzTWV0aG9kID0gaGFzTWV0aG9kO1xuICAgIGZ1bmN0aW9uIGlzQXJyYXlMaWtlKGluc3RhbmNlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIE5PVEU6XG4gICAgICAgICAqXG4gICAgICAgICAqIEZ1bmN0aW9uczpcbiAgICAgICAgICogRW51bWVyYXRpbmcgYSBmdW5jdGlvbiBhbHRob3VnaCBpdCBoYXMgYSAubGVuZ3RoIHByb3BlcnR5IHdpbGwgeWllbGQgbm90aGluZyBvciB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgICAqIEVmZmVjdGl2ZWx5LCBhIGZ1bmN0aW9uIGlzIG5vdCBsaWtlIGFuIGFycmF5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBTdHJpbmdzOlxuICAgICAgICAgKiBCZWhhdmUgbGlrZSBhcnJheXMgYnV0IGRvbid0IGhhdmUgdGhlIHNhbWUgZXhhY3QgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBpbnN0YW5jZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICB8fCBUeXBlLmlzU3RyaW5nKGluc3RhbmNlKVxuICAgICAgICAgICAgfHwgIVR5cGUuaXNGdW5jdGlvbihpbnN0YW5jZSkgJiYgaGFzTWVtYmVyKGluc3RhbmNlLCBMRU5HVEgpO1xuICAgIH1cbiAgICBUeXBlLmlzQXJyYXlMaWtlID0gaXNBcnJheUxpa2U7XG59KShUeXBlIHx8IChUeXBlID0ge30pKTtcbk9iamVjdC5mcmVlemUoVHlwZSk7XG5leHBvcnQgZGVmYXVsdCBUeXBlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VHlwZXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UeXBlcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vVHlwZXNcIjtcbnZhciBpc1RydWVOYU4gPSBUeXBlLmlzVHJ1ZU5hTjtcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuLyoqXG4gKiBVc2VkIGZvciBzcGVjaWFsIGNvbXBhcmlzb24gaW5jbHVkaW5nIE5hTi5cbiAqIEBwYXJhbSBhXG4gKiBAcGFyYW0gYlxuICogQHBhcmFtIHN0cmljdFxuICogQHJldHVybnMge2Jvb2xlYW58YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJlRXF1YWwoYSwgYiwgc3RyaWN0ID0gdHJ1ZSkge1xuICAgIHJldHVybiBhID09PSBiXG4gICAgICAgIHx8ICFzdHJpY3QgJiYgYSA9PSBiXG4gICAgICAgIHx8IGlzVHJ1ZU5hTihhKSAmJiBpc1RydWVOYU4oYik7XG59XG5jb25zdCBDT01QQVJFX1RPID0gXCJjb21wYXJlVG9cIjtcbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlKGEsIGIsIHN0cmljdCA9IHRydWUpIHtcbiAgICBpZiAoYXJlRXF1YWwoYSwgYiwgc3RyaWN0KSlcbiAgICAgICAgcmV0dXJuIDAgLyogRXF1YWwgKi87XG4gICAgaWYgKGEgJiYgVHlwZS5oYXNNZW1iZXIoYSwgQ09NUEFSRV9UTykpXG4gICAgICAgIHJldHVybiBhLmNvbXBhcmVUbyhiKTsgLy8gSWYgYSBoYXMgY29tcGFyZVRvLCB1c2UgaXQuXG4gICAgZWxzZSBpZiAoYiAmJiBUeXBlLmhhc01lbWJlcihiLCBDT01QQVJFX1RPKSlcbiAgICAgICAgcmV0dXJuIC1iLmNvbXBhcmVUbyhhKTsgLy8gYSBkb2Vzbid0IGhhdmUgY29tcGFyZVRvPyBjaGVjayBpZiBiIGRvZXMgYW5kIGludmVydC5cbiAgICAvLyBBbGxvdyBmb3Igc3BlY2lhbCBpbmVxdWFsaXR5Li5cbiAgICBpZiAoYSA+IGIgfHwgc3RyaWN0ICYmIChhID09PSAwICYmIGIgPT0gMCB8fCBhID09PSBudWxsICYmIGIgPT09IFZPSUQwKSlcbiAgICAgICAgcmV0dXJuIDEgLyogR3JlYXRlciAqLztcbiAgICBpZiAoYiA+IGEgfHwgc3RyaWN0ICYmIChiID09PSAwICYmIGEgPT0gMCB8fCBiID09PSBudWxsICYmIGEgPT09IFZPSUQwKSlcbiAgICAgICAgcmV0dXJuIC0xIC8qIExlc3MgKi87XG4gICAgcmV0dXJuIE5hTjtcbn1cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0d28gcHJpbWl0aXZlcyBhcmUgZXF1YWwgb3IgaWYgdHdvIG9iamVjdHMgaGF2ZSB0aGUgc2FtZSBrZXkvdmFsdWUgY29tYmluYXRpb25zLlxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKiBAcGFyYW0gbnVsbEVxdWl2YWxlbmN5IElmIHRydWUsIG51bGwvdW5kZWZpbmVkIHdpbGwgYmUgZXF1aXZhbGVudCB0byBhbiBlbXB0eSBvYmplY3Qge30uXG4gKiBAcGFyYW0gZXh0cmFEZXB0aFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcmVFcXVpdmFsZW50KGEsIGIsIG51bGxFcXVpdmFsZW5jeSA9IHRydWUsIGV4dHJhRGVwdGggPSAwKSB7XG4gICAgLy8gVGFrZSBhIHN0ZXAgYnkgc3RlcCBhcHByb2FjaCB0byBlbnN1cmUgZWZmaWNpZW5jeS5cbiAgICBpZiAoYXJlRXF1YWwoYSwgYiwgdHJ1ZSkpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSB7XG4gICAgICAgIGlmICghbnVsbEVxdWl2YWxlbmN5KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoVHlwZS5pc09iamVjdChhKSkge1xuICAgICAgICAgICAgcmV0dXJuICFPYmplY3Qua2V5cyhhKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFR5cGUuaXNPYmplY3QoYikpIHtcbiAgICAgICAgICAgIHJldHVybiAhT2JqZWN0LmtleXMoYikubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhID09IG51bGwgJiYgYiA9PSBudWxsO1xuICAgIH1cbiAgICBpZiAoVHlwZS5pc09iamVjdChhKSAmJiBUeXBlLmlzT2JqZWN0KGIpKSB7XG4gICAgICAgIGNvbnN0IGFLZXlzID0gT2JqZWN0LmtleXMoYSksIGJLZXlzID0gT2JqZWN0LmtleXMoYiksIGxlbiA9IGFLZXlzLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiAhPSBiS2V5cy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGFLZXlzLnNvcnQoKTtcbiAgICAgICAgYktleXMuc29ydCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQga2V5ID0gYUtleXNbaV07XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBiS2V5c1tpXSB8fCAhYXJlRXF1YWwoYVtrZXldLCBiW2tleV0sIHRydWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb2Vzbid0IHRyYWNrIGNpcmN1bGFyIHJlZmVyZW5jZXMgYnV0IGFsbG93cyBmb3IgY29udHJvbGxpbmcgdGhlIGFtb3VudCBvZiByZWN1cnNpb24uXG4gICAgICAgIGlmIChleHRyYURlcHRoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIGFLZXlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhcmVFcXVpdmFsZW50KGFba2V5XSwgYltrZXldLCBudWxsRXF1aXZhbGVuY3ksIGV4dHJhRGVwdGggLSAxKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db21wYXJlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29tcGFyZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnQXJndW1lbnROdWxsRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBBcmd1bWVudE51bGxFeGNlcHRpb24gZXh0ZW5kcyBBcmd1bWVudEV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lLCBtZXNzYWdlID0gYCcke3BhcmFtTmFtZX0nIGlzIG51bGwgKG9yIHVuZGVmaW5lZCkuYCwgaW5uZXJFeGNlcHRpb24pIHtcbiAgICAgICAgc3VwZXIocGFyYW1OYW1lLCBtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbik7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFyZ3VtZW50TnVsbEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgdHJpbSB9IGZyb20gXCIuLi9UZXh0L1V0aWxpdHlcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdBcmd1bWVudEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgQXJndW1lbnRFeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIC8vIEZvciBzaW1wbGljaXR5IGFuZCBjb25zaXN0ZW5jeSwgbGV0cyBzdGljayB3aXRoIDEgc2lnbmF0dXJlLlxuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSwgbWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIGJlZm9yZVNlYWxpbmcpIHtcbiAgICAgICAgbGV0IHBuID0gcGFyYW1OYW1lID8gKCd7JyArIHBhcmFtTmFtZSArICd9ICcpIDogJyc7XG4gICAgICAgIHN1cGVyKHRyaW0ocG4gKyAobWVzc2FnZSB8fCAnJykpLCBpbm5lckV4Y2VwdGlvbiwgKF8pID0+IHtcbiAgICAgICAgICAgIF8ucGFyYW1OYW1lID0gcGFyYW1OYW1lO1xuICAgICAgICAgICAgaWYgKGJlZm9yZVNlYWxpbmcpXG4gICAgICAgICAgICAgICAgYmVmb3JlU2VhbGluZyhfKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50RXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJndW1lbnRFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IEFyZ3VtZW50RXhjZXB0aW9uIH0gZnJvbSBcIi4vQXJndW1lbnRFeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiBleHRlbmRzIEFyZ3VtZW50RXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbU5hbWUsIGFjdHVhbFZhbHVlLCBtZXNzYWdlID0gJyAnLCBpbm5lckV4Y2VwdGlvbikge1xuICAgICAgICBzdXBlcihwYXJhbU5hbWUsIGAoJHthY3R1YWxWYWx1ZX0pIGAgKyBtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbiwgKF8pID0+IHtcbiAgICAgICAgICAgIF8uYWN0dWFsVmFsdWUgPSBhY3R1YWxWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2VcIjtcbmltcG9ydCB7IE9iamVjdFBvb2wgfSBmcm9tIFwiLi4vLi4vRGlzcG9zYWJsZS9PYmplY3RQb29sXCI7XG5pbXBvcnQgeyBJdGVyYXRvclJlc3VsdCB9IGZyb20gXCIuL0l0ZXJhdG9yUmVzdWx0XCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xubGV0IHlpZWxkZXJQb29sO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmZ1bmN0aW9uIHlpZWxkZXIocmVjeWNsZSkge1xuICAgIGlmICgheWllbGRlclBvb2wpXG4gICAgICAgIHlpZWxkZXJQb29sXG4gICAgICAgICAgICA9IG5ldyBPYmplY3RQb29sKDQwLCAoKSA9PiBuZXcgWWllbGRlcigpLCB5ID0+IHkueWllbGRCcmVhaygpKTtcbiAgICBpZiAoIXJlY3ljbGUpXG4gICAgICAgIHJldHVybiB5aWVsZGVyUG9vbC50YWtlKCk7XG4gICAgeWllbGRlclBvb2wuYWRkKHJlY3ljbGUpO1xufVxuY2xhc3MgWWllbGRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBWT0lEMDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBOYU47XG4gICAgfVxuICAgIGdldCBjdXJyZW50KCkgeyByZXR1cm4gdGhpcy5fY3VycmVudDsgfSAvLyB0aGlzIGNsYXNzIGlzIG5vdCBlbnRpcmVseSBsb2NhbC9wcml2YXRlLiAgU3RpbGwgbmVlZHMgcHJvdGVjdGlvbi5cbiAgICBnZXQgaW5kZXgoKSB7IHJldHVybiB0aGlzLl9pbmRleDsgfVxuICAgIHlpZWxkUmV0dXJuKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSB2YWx1ZTtcbiAgICAgICAgaWYgKGlzTmFOKHRoaXMuX2luZGV4KSlcbiAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5faW5kZXgrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHlpZWxkQnJlYWsoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBWT0lEMDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBOYU47XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy55aWVsZEJyZWFrKCk7XG4gICAgfVxufVxuY29uc3QgTkFNRSA9IFwiRW51bWVyYXRvckJhc2VcIjtcbi8vIFwiRW51bWVyYXRvclwiIGlzIGNvbmZsaWN0IEpTY3JpcHQncyBcIkVudW1lcmF0b3JcIlxuLy8gTmFtaW5nIHRoaXMgY2xhc3MgRW51bWVyYXRvckJhc2UgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGggSUUuXG5leHBvcnQgY2xhc3MgRW51bWVyYXRvckJhc2UgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX2luaXRpYWxpemVyLCBfdHJ5R2V0TmV4dCwgZGlzcG9zZXIsIGlzRW5kbGVzcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplciA9IF9pbml0aWFsaXplcjtcbiAgICAgICAgdGhpcy5fdHJ5R2V0TmV4dCA9IF90cnlHZXROZXh0O1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IE5BTUU7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgaWYgKFR5cGUuaXNCb29sZWFuKGlzRW5kbGVzcykpXG4gICAgICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBpc0VuZGxlc3M7XG4gICAgICAgIGVsc2UgaWYgKFR5cGUuaXNCb29sZWFuKGRpc3Bvc2VyKSlcbiAgICAgICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGRpc3Bvc2VyO1xuICAgICAgICBpZiAoVHlwZS5pc0Z1bmN0aW9uKGRpc3Bvc2VyKSlcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2VyID0gZGlzcG9zZXI7XG4gICAgfVxuICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5feWllbGRlcjtcbiAgICAgICAgcmV0dXJuIHkgJiYgeS5jdXJyZW50O1xuICAgIH1cbiAgICBnZXQgaW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLl95aWVsZGVyO1xuICAgICAgICByZXR1cm4geSA/IHkuaW5kZXggOiBOYU47XG4gICAgfVxuICAgIC8qXG4gICAgICogUHJvdmlkZXMgYSBtZWNoYW5pc20gdG8gaW5kaWNhdGUgaWYgdGhpcyBlbnVtZXJhYmxlIG5ldmVyIGVuZHMuXG4gICAgICogSWYgc2V0IHRvIHRydWUsIHNvbWUgb3BlcmF0aW9ucyB0aGF0IGV4cGVjdCBhIGZpbml0ZSByZXN1bHQgbWF5IHRocm93LlxuICAgICAqIEV4cGxpY2l0IGZhbHNlIG1lYW5zIGl0IGhhcyBhbiBlbmQuXG4gICAgICogSW1wbGljaXQgdm9pZCBtZWFucyB1bmtub3duLlxuICAgICAqL1xuICAgIGdldCBpc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VuZGxlc3M7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZGVkIGZvciBjb21wYXRpYmlsaXR5IGJ1dCBvbmx5IHdvcmtzIGlmIHRoZSBlbnVtZXJhdG9yIGlzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICByZXNldCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHkgPSBfLl95aWVsZGVyO1xuICAgICAgICBfLl95aWVsZGVyID0gbnVsbDtcbiAgICAgICAgXy5fc3RhdGUgPSAwIC8qIEJlZm9yZSAqLztcbiAgICAgICAgaWYgKHkpXG4gICAgICAgICAgICB5aWVsZGVyKHkpOyAvLyByZWN5Y2xlIHVudGlsIGFjdHVhbGx5IG5lZWRlZC5cbiAgICB9XG4gICAgX2Fzc2VydEJhZFN0YXRlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgc3dpdGNoIChfLl9zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAzIC8qIEZhdWx0ZWQgKi86XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGlzIGVudW1lcmF0b3IgY2F1c2VkIGEgZmF1bHQgYW5kIHdhcyBkaXNwb3NlZC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDUgLyogRGlzcG9zZWQgKi86XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGlzIGVudW1lcmF0b3Igd2FzIG1hbnVhbGx5IGRpc3Bvc2VkLlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXNzZXMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gdGhlIG91dCBjYWxsYmFjayBpZiB0aGUgZW51bWVyYXRvciBpcyBhY3RpdmUuXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIHRyeUdldEN1cnJlbnQob3V0KSB7XG4gICAgICAgIHRoaXMuX2Fzc2VydEJhZFN0YXRlKCk7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gMSAvKiBBY3RpdmUgKi8pIHtcbiAgICAgICAgICAgIG91dCh0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQgY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZSA8IDIgLyogQ29tcGxldGVkICovO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYWZlbHkgbW92ZXMgdG8gdGhlIG5leHQgZW50cnkgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBvbmUuXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIG1vdmVOZXh0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fYXNzZXJ0QmFkU3RhdGUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN3aXRjaCAoXy5fc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDAgLyogQmVmb3JlICovOlxuICAgICAgICAgICAgICAgICAgICBfLl95aWVsZGVyID0gXy5feWllbGRlciB8fCB5aWVsZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF8uX3N0YXRlID0gMSAvKiBBY3RpdmUgKi87XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxpemVyID0gXy5faW5pdGlhbGl6ZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSAxIC8qIEFjdGl2ZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uX3RyeUdldE5leHQoXy5feWllbGRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLl9zdGF0ZSA9IDIgLyogQ29tcGxldGVkICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIF8uX3N0YXRlID0gMyAvKiBGYXVsdGVkICovO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBlbnRyeSBhbmQgZW1pdHMgdGhlIHZhbHVlIHRocm91Z2ggdGhlIG91dCBjYWxsYmFjay5cbiAgICAgKiBOb3RlOiBXaWxsIHRocm93IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uIGlmIHRoaXMgaGFzIGZhdWx0ZWQgb3IgbWFudWFsbHkgZGlzcG9zZWQuXG4gICAgICovXG4gICAgdHJ5TW92ZU5leHQob3V0KSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIG91dCh0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBuZXh0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVOZXh0KClcbiAgICAgICAgICAgID8gdGhpcy5jdXJyZW50XG4gICAgICAgICAgICA6IFZPSUQwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeHBvc2VkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggZ2VuZXJhdG9ycy5cbiAgICAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlTmV4dCgpXG4gICAgICAgICAgICA/IG5ldyBJdGVyYXRvclJlc3VsdCh0aGlzLmN1cnJlbnQsIHRoaXMuaW5kZXgpXG4gICAgICAgICAgICA6IEl0ZXJhdG9yUmVzdWx0LkRvbmU7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlRGlzcG9zZVN0YXRlKDQgLyogSW50ZXJydXB0ZWQgKi8pO1xuICAgIH1cbiAgICAncmV0dXJuJyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fYXNzZXJ0QmFkU3RhdGUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gVk9JRDAgfHwgXy5fc3RhdGUgPT09IDIgLyogQ29tcGxldGVkICovIHx8IF8uX3N0YXRlID09PSA0IC8qIEludGVycnVwdGVkICovXG4gICAgICAgICAgICAgICAgPyBJdGVyYXRvclJlc3VsdC5Eb25lXG4gICAgICAgICAgICAgICAgOiBuZXcgSXRlcmF0b3JSZXN1bHQodmFsdWUsIFZPSUQwLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2Vuc3VyZURpc3Bvc2VTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLndhc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBfLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIF8uX3N0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2lzRW5kbGVzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBkaXNwb3NlciA9IF8uX2Rpc3Bvc2VyO1xuICAgICAgICBfLl9pbml0aWFsaXplciA9IG51bGw7XG4gICAgICAgIF8uX2Rpc3Bvc2VyID0gbnVsbDtcbiAgICAgICAgY29uc3QgeSA9IF8uX3lpZWxkZXI7XG4gICAgICAgIF8uX3lpZWxkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IDUgLyogRGlzcG9zZWQgKi87XG4gICAgICAgIGlmICh5KVxuICAgICAgICAgICAgeWllbGRlcih5KTtcbiAgICAgICAgaWYgKGRpc3Bvc2VyKVxuICAgICAgICAgICAgZGlzcG9zZXIoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBFbnVtZXJhdG9yQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVudW1lcmF0b3JCYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuZXhwb3J0IGZ1bmN0aW9uIEludGVnZXIobikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG4pO1xufVxuKGZ1bmN0aW9uIChJbnRlZ2VyKSB7XG4gICAgSW50ZWdlci5NQVhfMzJfQklUID0gMjE0NzQ4MzY0NztcbiAgICBJbnRlZ2VyLk1BWF9WQUxVRSA9IDkwMDcxOTkyNTQ3NDA5OTE7XG4gICAgY29uc3QgTlVNQkVSID0gXCJudW1iZXJcIjtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbnkgbnVtYmVyIHRvIGl0cyAzMmJpdCBjb3VudGVycGFydC5cbiAgICAgKiBUaHJvd3MgaWYgY29udmVyc2lvbiBpcyBub3QgcG9zc2libGUuXG4gICAgICogQHBhcmFtIG5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzMzJCaXQobikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuIHwgMDtcbiAgICAgICAgaWYgKGlzTmFOKG4pKVxuICAgICAgICAgICAgdGhyb3cgXCInbicgaXMgbm90IGEgbnVtYmVyLlwiO1xuICAgICAgICBpZiAobiAhPT0gLTEgJiYgcmVzdWx0ID09PSAtMSlcbiAgICAgICAgICAgIHRocm93IFwiJ24nIGlzIHRvbyBsYXJnZSB0byBiZSBhIDMyIGJpdCBpbnRlZ2VyLlwiO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBJbnRlZ2VyLmFzMzJCaXQgPSBhczMyQml0O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKG4pIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBuID09PSBOVU1CRVIgJiYgaXNGaW5pdGUobikgJiYgbiA9PT0gTWF0aC5mbG9vcihuKTtcbiAgICB9XG4gICAgSW50ZWdlci5pcyA9IGlzO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgd2l0aGluIGEgMzIgYml0IHJhbmdlLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXMzMkJpdChuKSB7XG4gICAgICAgIHJldHVybiBuID09PSAobiB8IDApO1xuICAgIH1cbiAgICBJbnRlZ2VyLmlzMzJCaXQgPSBpczMyQml0O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBpZiBub3QgYW4gaW50ZWdlci5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnQobiwgYXJndW1lbnROYW1lKSB7XG4gICAgICAgIGxldCBpID0gaXMobik7XG4gICAgICAgIGlmICghaSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBcIk11c3QgYmUgYSBpbnRlZ2VyLlwiKTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIEludGVnZXIuYXNzZXJ0ID0gYXNzZXJ0O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBpZiBsZXNzIHRoYW4gemVyby5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnRaZXJvT3JHcmVhdGVyKG4sIGFyZ3VtZW50TmFtZSkge1xuICAgICAgICBsZXQgaSA9IGFzc2VydChuLCBhcmd1bWVudE5hbWUpICYmIG4gPj0gMDtcbiAgICAgICAgaWYgKCFpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBuLCBcIk11c3QgYmUgYSB2YWxpZCBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB6ZXJvLlwiKTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlciA9IGFzc2VydFplcm9PckdyZWF0ZXI7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIG5vdCBncmVhdGVyIHRoYW4gemVyby5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnRQb3NpdGl2ZShuLCBhcmd1bWVudE5hbWUpIHtcbiAgICAgICAgbGV0IGkgPSBhc3NlcnQobiwgYXJndW1lbnROYW1lKSAmJiBuID4gMDtcbiAgICAgICAgaWYgKCFpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBuLCBcIk11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uXCIpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgSW50ZWdlci5hc3NlcnRQb3NpdGl2ZSA9IGFzc2VydFBvc2l0aXZlO1xufSkoSW50ZWdlciB8fCAoSW50ZWdlciA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBJbnRlZ2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW50ZWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0ludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L3N5c3RlbS5zeXN0ZW1leGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdTeXN0ZW1FeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIFN5c3RlbUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gICAgLypcbiAgICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBtZXNzYWdlOnN0cmluZyA9IG51bGwsXG4gICAgICAgICAgICBpbm5lckV4Y2VwdGlvbjpFcnJvciA9IG51bGwsXG4gICAgICAgICAgICBiZWZvcmVTZWFsaW5nPzooZXg6YW55KT0+dm9pZClcbiAgICAgICAge1xuICAgICAgICAgICAgc3VwZXIobWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIGJlZm9yZVNlYWxpbmcpO1xuICAgICAgICB9XG4gICAgKi9cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBTeXN0ZW1FeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TeXN0ZW1FeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL1N5c3RlbUV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gfSBmcm9tIFwiLi9PYmplY3REaXNwb3NlZEV4Y2VwdGlvblwiO1xuZXhwb3J0IGNsYXNzIERpc3Bvc2FibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihfX2ZpbmFsaXplcikge1xuICAgICAgICB0aGlzLl9fZmluYWxpemVyID0gX19maW5hbGl6ZXI7XG4gICAgICAgIHRoaXMuX193YXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgd2FzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fd2FzRGlzcG9zZWQ7XG4gICAgfVxuICAgIHRocm93SWZEaXNwb3NlZChtZXNzYWdlLCBvYmplY3ROYW1lID0gdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX193YXNEaXNwb3NlZClcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbihvYmplY3ROYW1lLCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIV8uX193YXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgLy8gUHJlZW1wdGl2ZWx5IHNldCB3YXNEaXNwb3NlZCBpbiBvcmRlciB0byBwcmV2ZW50IHJlcGVhdGVkIGRpc3Bvc2luZy5cbiAgICAgICAgICAgIC8vIE5PVEU6IGluIHRydWUgbXVsdGktdGhyZWFkZWQgc2NlbmFyaW9zLCB0aGlzIG5lZWRzIHRvIGJlIHN5bmNocm9uaXplZC5cbiAgICAgICAgICAgIF8uX193YXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF8uX29uRGlzcG9zZSgpOyAvLyBQcm90ZWN0ZWQgb3ZlcnJpZGUuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoXy5fX2ZpbmFsaXplcikge1xuICAgICAgICAgICAgICAgICAgICBfLl9fZmluYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF8uX19maW5hbGl6ZXIgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFBsYWNlaG9sZGVyIGZvciBvdmVycmlkZXMuXG4gICAgX29uRGlzcG9zZSgpIHsgfVxufVxuZXhwb3J0IGRlZmF1bHQgRGlzcG9zYWJsZUJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaXNwb3NhYmxlQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uLy4uL0ludGVnZXJcIjtcbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgZGVwZW5kaW5nIG9uIHRoZSByZXF1ZXN0ZWQgY2FwYWNpdHkuXG4gKiBUaGUgcmV0dXJuZWQgYXJyYXkgd2lsbCBoYXZlIGEgLmxlbmd0aCBlcXVhbCB0byB0aGUgdmFsdWUgcHJvdmlkZWQuXG4gKiBAcGFyYW0gbGVuZ3RoXG4gKiBAcmV0dXJucyB7VFtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZShsZW5ndGgpIHtcbiAgICBJbnRlZ2VyLmFzc2VydChsZW5ndGgsICdsZW5ndGgnKTtcbiAgICAvLyBUaGlzIGxvZ2ljIGlzIGJhc2VkIHVwb24gSlMgcGVyZm9ybWFuY2UgdGVzdHMgdGhhdCBzaG93IGEgc2lnbmlmaWNhbnQgZGlmZmVyZW5jZSBhdCB0aGUgbGV2ZWwgb2YgNjU1MzYuXG4gICAgbGV0IGFycmF5O1xuICAgIGlmIChsZW5ndGggPiA2NTUzNilcbiAgICAgICAgYXJyYXkgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBlbHNlIHtcbiAgICAgICAgYXJyYXkgPSBbXTtcbiAgICAgICAgYXJyYXkubGVuZ3RoID0gbGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbml0aWFsaXplLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvaW5pdGlhbGl6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgdXNpbmcgfSBmcm9tIFwiLi4vLi4vRGlzcG9zYWJsZS9kaXNwb3NlXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5pbXBvcnQgeyBBcnJheUVudW1lcmF0b3IgfSBmcm9tIFwiLi9BcnJheUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IEluZGV4RW51bWVyYXRvciB9IGZyb20gXCIuL0luZGV4RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uIH0gZnJvbSBcIi4vVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBJbmZpbml0ZUVudW1lcmF0b3IgfSBmcm9tIFwiLi9JbmZpbml0ZUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IEVtcHR5RW51bWVyYXRvciBhcyBFbXB0eSB9IGZyb20gXCIuL0VtcHR5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgSXRlcmF0b3JFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSXRlcmF0b3JFbnVtZXJhdG9yXCI7XG5jb25zdCBTVFJJTkdfRU1QVFkgPSBcIlwiLCBFTkRMRVNTX0VYQ0VQVElPTl9NRVNTQUdFID0gJ0Nhbm5vdCBjYWxsIGZvckVhY2ggb24gYW4gZW5kbGVzcyBlbnVtZXJhYmxlLiAnICtcbiAgICAnV291bGQgcmVzdWx0IGluIGFuIGluZmluaXRlIGxvb3AgdGhhdCBjb3VsZCBoYW5nIHRoZSBjdXJyZW50IHByb2Nlc3MuJztcbmV4cG9ydCBmdW5jdGlvbiB0aHJvd0lmRW5kbGVzcyhpc0VuZGxlc3MpIHtcbiAgICBpZiAoaXNFbmRsZXNzKVxuICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKEVORExFU1NfRVhDRVBUSU9OX01FU1NBR0UpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gaW5pdEFycmF5RnJvbShzb3VyY2UsIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKFR5cGUuaXNBcnJheUxpa2Uoc291cmNlKSkge1xuICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1pbihzb3VyY2UubGVuZ3RoLCBtYXgpO1xuICAgICAgICBpZiAoaXNGaW5pdGUobGVuKSkge1xuICAgICAgICAgICAgaWYgKGxlbiA+IDY1NTM1KVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkobGVuKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgcmVzdWx0Lmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufVxuLy8gQ291bGQgYmUgYXJyYXksIG9yIElFbnVtZXJhYmxlLi4uXG4vKipcbiAqIFJldHVybnMgdGhlIGVudW1lcmF0b3IgZm9yIHRoZSBzcGVjaWZpZWQgY29sbGVjdGlvbiwgZW51bWVyYXRvciwgb3IgaXRlcmF0b3IuXG4gKiBJZiB0aGUgc291cmNlIGlzIGlkZW50aWZpZWQgYXMgSUVudW1lcmF0b3IgaXQgd2lsbCByZXR1cm4gdGhlIHNvdXJjZSBhcyBpcy5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tKHNvdXJjZSkge1xuICAgIC8vIFRvIHNpbXBsaWZ5IGFuZCBwcmV2ZW50IG51bGwgcmVmZXJlbmNlIGV4Y2VwdGlvbnM6XG4gICAgaWYgKCFzb3VyY2UpXG4gICAgICAgIHJldHVybiBFbXB0eTtcbiAgICBpZiAoKHNvdXJjZSkgaW5zdGFuY2VvZiAoQXJyYXkpKVxuICAgICAgICByZXR1cm4gbmV3IEFycmF5RW51bWVyYXRvcihzb3VyY2UpO1xuICAgIGlmIChUeXBlLmlzQXJyYXlMaWtlKHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmRleEVudW1lcmF0b3IoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IHNvdXJjZS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgcG9pbnRlcjogMCxcbiAgICAgICAgICAgICAgICBzdGVwOiAxXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCFUeXBlLmlzUHJpbWl0aXZlKHNvdXJjZSkpIHtcbiAgICAgICAgaWYgKGlzRW51bWVyYWJsZShzb3VyY2UpKVxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oc291cmNlKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVFbnVtZXJhdG9yKHNvdXJjZSk7XG4gICAgICAgIGlmIChpc0VudW1lcmF0b3Ioc291cmNlKSlcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgIGlmIChpc0l0ZXJhdG9yKHNvdXJjZSkpXG4gICAgICAgICAgICByZXR1cm4gbmV3IEl0ZXJhdG9yRW51bWVyYXRvcihzb3VyY2UpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNFbnVtZXJhYmxlKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIFR5cGUuaGFzTWVtYmVyT2ZUeXBlKGluc3RhbmNlLCBcImdldEVudW1lcmF0b3JcIiwgVHlwZS5GVU5DVElPTik7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNFbnVtZXJhYmxlT3JBcnJheUxpa2UoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gVHlwZS5pc0FycmF5TGlrZShpbnN0YW5jZSkgfHwgaXNFbnVtZXJhYmxlKGluc3RhbmNlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VudW1lcmF0b3IoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gVHlwZS5oYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIFwibW92ZU5leHRcIiwgVHlwZS5GVU5DVElPTik7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNJdGVyYXRvcihpbnN0YW5jZSkge1xuICAgIHJldHVybiBUeXBlLmhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgXCJuZXh0XCIsIFR5cGUuRlVOQ1RJT04pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goZSwgYWN0aW9uLCBtYXggPSBJbmZpbml0eSkge1xuICAgIGlmIChlID09PSBTVFJJTkdfRU1QVFkpXG4gICAgICAgIHJldHVybiAwO1xuICAgIGlmIChlICYmIG1heCA+IDApIHtcbiAgICAgICAgaWYgKFR5cGUuaXNBcnJheUxpa2UoZSkpIHtcbiAgICAgICAgICAgIC8vIEFzc3VtZSBlLmxlbmd0aCBpcyBjb25zdGFudCBvciBhdCBsZWFzdCBkb2Vzbid0IGRldmlhdGUgdG8gaW5maW5pdGUgb3IgTmFOLlxuICAgICAgICAgICAgdGhyb3dJZkVuZGxlc3MoIWlzRmluaXRlKG1heCkgJiYgIWlzRmluaXRlKGUubGVuZ3RoKSk7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICBmb3IgKDsgaSA8IE1hdGgubWluKGUubGVuZ3RoLCBtYXgpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKGVbaV0sIGkpID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNFbnVtZXJhdG9yKGUpKSB7XG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiBlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAvLyBSZXR1cm4gdmFsdWUgb2YgYWN0aW9uIGNhbiBiZSBhbnl0aGluZywgYnV0IGlmIGl0IGlzICg9PT0pIGZhbHNlIHRoZW4gdGhlIGZvckVhY2ggd2lsbCBkaXNjb250aW51ZS5cbiAgICAgICAgICAgIHdoaWxlIChtYXggPiBpICYmIGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24oZS5jdXJyZW50LCBpKyspID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNFbnVtZXJhYmxlKGUpKSB7XG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiBlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICAvLyBGb3IgZW51bWVyYXRvcnMgdGhhdCBhcmVuJ3QgRW51bWVyYWJsZUJhc2UsIGVuc3VyZSBkaXNwb3NlIGlzIGNhbGxlZC5cbiAgICAgICAgICAgIHJldHVybiB1c2luZyhlLmdldEVudW1lcmF0b3IoKSwgZiA9PiBmb3JFYWNoKGYsIGFjdGlvbiwgbWF4KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSXRlcmF0b3IoZSkpIHtcbiAgICAgICAgICAgIC8vIEZvciBvdXIgcHVycG9zZSBpdGVyYXRvcnMgYXJlIGVuZGxlc3MgYW5kIGEgbWF4IG11c3QgYmUgc3BlY2lmaWVkIGJlZm9yZSBpdGVyYXRpbmcuXG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSk7XG4gICAgICAgICAgICBsZXQgaSA9IDAsIHI7XG4gICAgICAgICAgICAvLyBSZXR1cm4gdmFsdWUgb2YgYWN0aW9uIGNhbiBiZSBhbnl0aGluZywgYnV0IGlmIGl0IGlzICg9PT0pIGZhbHNlIHRoZW4gdGhlIGZvckVhY2ggd2lsbCBkaXNjb250aW51ZS5cbiAgICAgICAgICAgIHdoaWxlIChtYXggPiBpICYmICEociA9IGUubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbihyLnZhbHVlLCBpKyspID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG4vKipcbiAqIENvbnZlcnRzIGFueSBlbnVtZXJhYmxlIHRvIGFuIGFycmF5LlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIG1heCBTdG9wcyBhZnRlciBtYXggaXMgcmVhY2hlZC4gIEFsbG93cyBmb3IgZm9yRWFjaCB0byBiZSBjYWxsZWQgb24gaW5maW5pdGUgZW51bWVyYXRpb25zLlxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkoc291cmNlLCBtYXggPSBJbmZpbml0eSkge1xuICAgIGlmIChzb3VyY2UgPT09IFNUUklOR19FTVBUWSlcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIGlmICghaXNGaW5pdGUobWF4KSAmJiAoc291cmNlKSBpbnN0YW5jZW9mIChBcnJheSkpXG4gICAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbml0QXJyYXlGcm9tKHNvdXJjZSwgbWF4KTtcbiAgICBpZiAoLTEgPT09IGZvckVhY2goc291cmNlLCAoZSwgaSkgPT4geyByZXN1bHRbaV0gPSBlOyB9LCBtYXgpKVxuICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQ29udmVydHMgYW55IGVudW1lcmFibGUgdG8gYW4gYXJyYXkgb2Ygc2VsZWN0ZWQgdmFsdWVzLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHNlbGVjdG9yXG4gKiBAcGFyYW0gbWF4IFN0b3BzIGFmdGVyIG1heCBpcyByZWFjaGVkLiAgQWxsb3dzIGZvciBmb3JFYWNoIHRvIGJlIGNhbGxlZCBvbiBpbmZpbml0ZSBlbnVtZXJhdGlvbnMuXG4gKiBAcmV0dXJucyB7VFJlc3VsdFtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwKHNvdXJjZSwgc2VsZWN0b3IsIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKHNvdXJjZSA9PT0gU1RSSU5HX0VNUFRZKVxuICAgICAgICByZXR1cm4gW107XG4gICAgaWYgKCFpc0Zpbml0ZShtYXgpICYmIChzb3VyY2UpIGluc3RhbmNlb2YgKEFycmF5KSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5tYXAoc2VsZWN0b3IpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGluaXRBcnJheUZyb20oc291cmNlLCBtYXgpO1xuICAgIGlmICgtMSA9PT0gZm9yRWFjaChzb3VyY2UsIChlLCBpKSA9PiB7IHJlc3VsdFtpXSA9IHNlbGVjdG9yKGUsIGkpOyB9LCBtYXgpKVxuICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uL1R5cGVzXCI7XG4vKipcbiAqIFRha2VzIGFueSBudW1iZXIgb2YgZGlzcG9zYWJsZXMgYXMgYXJndW1lbnRzIGFuZCBhdHRlbXB0cyB0byBkaXNwb3NlIHRoZW0uXG4gKiBBbnkgZXhjZXB0aW9ucyB0aHJvd24gd2l0aGluIGEgZGlzcG9zZSBhcmUgbm90IHRyYXBwZWQuXG4gKiBVc2UgJ2Rpc3Bvc2VXaXRob3V0RXhjZXB0aW9uJyB0byBhdXRvbWF0aWNhbGx5IHRyYXAgZXhjZXB0aW9ucy5cbiAqXG4gKiBDYW4gYWNjZXB0IDxhbnk+IGFuZCB3aWxsIGlnbm9yZSBvYmplY3RzIHRoYXQgZG9uJ3QgaGF2ZSBhIGRpc3Bvc2UoKSBtZXRob2QuXG4gKiBAcGFyYW0gZGlzcG9zYWJsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3Bvc2UoLi4uZGlzcG9zYWJsZXMpIHtcbiAgICAvLyBUaGUgZGlzcG9zYWJsZXMgYXJndW1lbnRzIGFycmF5IGlzIGVmZmVjdGl2ZWx5IGxvY2FsaXplZCBzbyBpdCdzIHNhZmUuXG4gICAgZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMsIGZhbHNlKTtcbn1cbihmdW5jdGlvbiAoZGlzcG9zZSkge1xuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIHdoZW4gb25seSBkaXNwb3Npbmcgb25lIG9iamVjdCB0byBhdm9pZCBjcmVhdGlvbiBvZiBhcnJheXMuXG4gICAgICogQHBhcmFtIGRpc3Bvc2FibGVcbiAgICAgKiBAcGFyYW0gdHJhcEV4Y2VwdGlvbnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzaW5nbGUoZGlzcG9zYWJsZSwgdHJhcEV4Y2VwdGlvbnMgPSBmYWxzZSkge1xuICAgICAgICBpZiAoZGlzcG9zYWJsZSlcbiAgICAgICAgICAgIGRpc3Bvc2VTaW5nbGUoZGlzcG9zYWJsZSwgdHJhcEV4Y2VwdGlvbnMpO1xuICAgIH1cbiAgICBkaXNwb3NlLnNpbmdsZSA9IHNpbmdsZTtcbiAgICBmdW5jdGlvbiBkZWZlcnJlZCguLi5kaXNwb3NhYmxlcykge1xuICAgICAgICB0aGVzZS5kZWZlcnJlZChkaXNwb3NhYmxlcyk7XG4gICAgfVxuICAgIGRpc3Bvc2UuZGVmZXJyZWQgPSBkZWZlcnJlZDtcbiAgICAvKipcbiAgICAgKiBUYWtlcyBhbnkgbnVtYmVyIG9mIGRpc3Bvc2FibGVzIGFuZCB0cmFwcyBhbnkgZXJyb3JzIHRoYXQgb2NjdXIgd2hlbiBkaXNwb3NpbmcuXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgZXhjZXB0aW9ucyB0aHJvd24uXG4gICAgICogQHBhcmFtIGRpc3Bvc2FibGVzXG4gICAgICogQHJldHVybnMge2FueVtdfSBSZXR1cm5zIGFuIGFycmF5IG9mIGV4Y2VwdGlvbnMgdGhhdCBvY2N1cnJlZCwgaWYgdGhlcmUgYXJlIGFueS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3aXRob3V0RXhjZXB0aW9uKC4uLmRpc3Bvc2FibGVzKSB7XG4gICAgICAgIC8vIFRoZSBkaXNwb3NhYmxlcyBhcmd1bWVudHMgYXJyYXkgaXMgZWZmZWN0aXZlbHkgbG9jYWxpemVkIHNvIGl0J3Mgc2FmZS5cbiAgICAgICAgcmV0dXJuIGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCB0cnVlKTtcbiAgICB9XG4gICAgZGlzcG9zZS53aXRob3V0RXhjZXB0aW9uID0gd2l0aG91dEV4Y2VwdGlvbjtcbiAgICAvKipcbiAgICAgKiBUYWtlcyBhbiBhcnJheSBvZiBkaXNwb3NhYmxlIG9iamVjdHMgYW5kIGVuc3VyZXMgdGhleSBhcmUgZGlzcG9zZWQuXG4gICAgICogQHBhcmFtIGRpc3Bvc2FibGVzXG4gICAgICogQHBhcmFtIHRyYXBFeGNlcHRpb25zIElmIHRydWUsIHByZXZlbnRzIGV4Y2VwdGlvbnMgZnJvbSBiZWluZyB0aHJvd24gd2hlbiBkaXNwb3NpbmcuXG4gICAgICogQHJldHVybnMge2FueVtdfSBJZiAndHJhcEV4Y2VwdGlvbnMnIGlzIHRydWUsIHJldHVybnMgYW4gYXJyYXkgb2YgZXhjZXB0aW9ucyB0aGF0IG9jY3VycmVkLCBpZiB0aGVyZSBhcmUgYW55LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRoZXNlKGRpc3Bvc2FibGVzLCB0cmFwRXhjZXB0aW9ucykge1xuICAgICAgICByZXR1cm4gZGlzcG9zYWJsZXMgJiYgZGlzcG9zYWJsZXMubGVuZ3RoXG4gICAgICAgICAgICA/IGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLnNsaWNlKCksIHRyYXBFeGNlcHRpb25zKVxuICAgICAgICAgICAgOiB2b2lkIDA7XG4gICAgfVxuICAgIGRpc3Bvc2UudGhlc2UgPSB0aGVzZTtcbiAgICAoZnVuY3Rpb24gKHRoZXNlKSB7XG4gICAgICAgIGZ1bmN0aW9uIGRlZmVycmVkKGRpc3Bvc2FibGVzLCBkZWxheSA9IDApIHtcbiAgICAgICAgICAgIGlmIChkaXNwb3NhYmxlcyAmJiBkaXNwb3NhYmxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIShkZWxheSA+PSAwKSlcbiAgICAgICAgICAgICAgICAgICAgZGVsYXkgPSAwO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZGlzcG9zZVRoZXNlSW50ZXJuYWwsIGRlbGF5LCBkaXNwb3NhYmxlcy5zbGljZSgpLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGVzZS5kZWZlcnJlZCA9IGRlZmVycmVkO1xuICAgICAgICAvKipcbiAgICAgICAgICogVXNlIHRoaXMgdW5zYWZlIG1ldGhvZCB3aGVuIGd1YXJhbnRlZWQgbm90IHRvIGNhdXNlIGV2ZW50cyB0aGF0IHdpbGwgbWFrZSBtb2RpZmljYXRpb25zIHRvIHRoZSBkaXNwb3NhYmxlcyBhcnJheS5cbiAgICAgICAgICogQHBhcmFtIGRpc3Bvc2FibGVzXG4gICAgICAgICAqIEBwYXJhbSB0cmFwRXhjZXB0aW9uc1xuICAgICAgICAgKiBAcmV0dXJucyB7YW55W119XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBub0NvcHkoZGlzcG9zYWJsZXMsIHRyYXBFeGNlcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gZGlzcG9zYWJsZXMgJiYgZGlzcG9zYWJsZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgPyBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgdHJhcEV4Y2VwdGlvbnMpXG4gICAgICAgICAgICAgICAgOiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhlc2Uubm9Db3B5ID0gbm9Db3B5O1xuICAgIH0pKHRoZXNlID0gZGlzcG9zZS50aGVzZSB8fCAoZGlzcG9zZS50aGVzZSA9IHt9KSk7XG59KShkaXNwb3NlIHx8IChkaXNwb3NlID0ge30pKTtcbi8qKlxuICogSnVzdCBsaWtlIGluIEMjIHRoaXMgJ3VzaW5nJyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcGFzc2VkIGRpc3Bvc2FibGUgaXMgZGlzcG9zZWQgd2hlbiB0aGUgY2xvc3VyZSBoYXMgZmluaXNoZWQuXG4gKlxuICogVXNhZ2U6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiB1c2luZyhuZXcgRGlzcG9zYWJsZU9iamVjdCgpLChteU9iaik9PntcbiAgICAgKiAgIC8vIGRvIHdvcmsgd2l0aCBteU9ialxuICAgICAqIH0pO1xuICogLy8gbXlPYmogYXV0b21hdGljYWxseSBoYXMgaXQncyBkaXNwb3NlIG1ldGhvZCBjYWxsZWQuXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gZGlzcG9zYWJsZSBPYmplY3QgdG8gYmUgZGlzcG9zZWQuXG4gKiBAcGFyYW0gY2xvc3VyZSBGdW5jdGlvbiBjYWxsIHRvIGV4ZWN1dGUuXG4gKiBAcmV0dXJucyB7VFJldHVybn0gUmV0dXJucyB3aGF0ZXZlciB0aGUgY2xvc3VyZSdzIHJldHVybiB2YWx1ZSBpcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzaW5nKGRpc3Bvc2FibGUsIGNsb3N1cmUpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gY2xvc3VyZShkaXNwb3NhYmxlKTtcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIGRpc3Bvc2VTaW5nbGUoZGlzcG9zYWJsZSwgZmFsc2UpO1xuICAgIH1cbn1cbi8qKlxuICogVGhpcyBwcml2YXRlIGZ1bmN0aW9uIG1ha2VzIGRpc3Bvc2luZyBtb3JlIHJvYnVzdCBmb3Igd2hlbiB0aGVyZSdzIG5vIHR5cGUgY2hlY2tpbmcuXG4gKiBJZiB0cmFwRXhjZXB0aW9ucyBpcyAndHJ1ZScgaXQgY2F0Y2hlcyBhbmQgcmV0dXJucyBhbnkgZXhjZXB0aW9uIGluc3RlYWQgb2YgdGhyb3dpbmcuXG4gKi9cbmZ1bmN0aW9uIGRpc3Bvc2VTaW5nbGUoZGlzcG9zYWJsZSwgdHJhcEV4Y2VwdGlvbnMpIHtcbiAgICBpZiAoZGlzcG9zYWJsZVxuICAgICAgICAmJiB0eXBlb2YgZGlzcG9zYWJsZSA9PSBUeXBlLk9CSkVDVFxuICAgICAgICAmJiB0eXBlb2YgZGlzcG9zYWJsZVsnZGlzcG9zZSddID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBpZiAodHJhcEV4Y2VwdGlvbnMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZGlzcG9zYWJsZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGlzcG9zYWJsZS5kaXNwb3NlKCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuLyoqXG4gKiBUaGlzIGRpc3Bvc2UgbWV0aG9kIGFzc3VtZXMgaXQncyB3b3JraW5nIG9uIGEgbG9jYWwgYXJyYXlDb3B5IGFuZCBpcyB1bnNhZmUgZm9yIGV4dGVybmFsIHVzZS5cbiAqL1xuZnVuY3Rpb24gZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMsIHRyYXBFeGNlcHRpb25zLCBpbmRleCA9IDApIHtcbiAgICBsZXQgZXhjZXB0aW9ucztcbiAgICBjb25zdCBsZW4gPSBkaXNwb3NhYmxlcyA/IGRpc3Bvc2FibGVzLmxlbmd0aCA6IDA7XG4gICAgZm9yICg7IGluZGV4IDwgbGVuOyBpbmRleCsrKSB7XG4gICAgICAgIGxldCBuZXh0ID0gZGlzcG9zYWJsZXNbaW5kZXhdO1xuICAgICAgICBpZiAoIW5leHQpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgaWYgKHRyYXBFeGNlcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBleCA9IGRpc3Bvc2VTaW5nbGUobmV4dCwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAoZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4Y2VwdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIGV4Y2VwdGlvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICBleGNlcHRpb25zLnB1c2goZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZGlzcG9zZVNpbmdsZShuZXh0LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoIXN1Y2Nlc3MgJiYgaW5kZXggKyAxIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIElmIGNvZGUgaXMgJ2NvbnRpbnVlZCcgYnkgdGhlIGRlYnVnZ2VyLFxuICAgICAgICAgICAgICAgICAgICAgKiBuZWVkIHRvIGVuc3VyZSB0aGUgcmVzdCBvZiB0aGUgZGlzcG9zYWJsZXMgYXJlIGNhcmVkIGZvci4gKi9cbiAgICAgICAgICAgICAgICAgICAgZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMsIGZhbHNlLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEp1c3QgaW4gY2FzZS4uLiAgU2hvdWxkIG5ldmVyIGhhcHBlbiwgYnV0IGFzc2VydHMgdGhlIGludGVudGlvbi5cbiAgICAgICAgICAgIGlmICghc3VjY2VzcylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXhjZXB0aW9ucztcbn1cbmV4cG9ydCBkZWZhdWx0IGRpc3Bvc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXNwb3NlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRGlzcG9zYWJsZS9kaXNwb3NlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0b3JCYXNlXCI7XG5leHBvcnQgY2xhc3MgSW5kZXhFbnVtZXJhdG9yIGV4dGVuZHMgRW51bWVyYXRvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZUZhY3RvcnkpIHtcbiAgICAgICAgbGV0IHNvdXJjZTtcbiAgICAgICAgc3VwZXIoKCkgPT4ge1xuICAgICAgICAgICAgc291cmNlID0gc291cmNlRmFjdG9yeSgpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSAmJiBzb3VyY2Uuc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgMClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibGVuZ3RoIG11c3QgYmUgemVybyBvciBncmVhdGVyXCIpO1xuICAgICAgICAgICAgICAgIGlmICghaXNGaW5pdGUobGVuKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibGVuZ3RoIG11c3QgZmluaXRlIG51bWJlclwiKTtcbiAgICAgICAgICAgICAgICBpZiAobGVuICYmIHNvdXJjZS5zdGVwID09PSAwKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIEluZGV4RW51bWVyYXRvciBzdGVwIHZhbHVlICgwKS5cIik7XG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ZXIgPSBzb3VyY2UucG9pbnRlcjtcbiAgICAgICAgICAgICAgICBpZiAoIXBvaW50ZXIpXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvaW50ZXIgIT0gTWF0aC5mbG9vcihwb2ludGVyKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBJbmRleEVudW1lcmF0b3IgcG9pbnRlciB2YWx1ZSAoXCIgKyBwb2ludGVyICsgXCIpIGhhcyBkZWNpbWFsLlwiKTtcbiAgICAgICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IHBvaW50ZXI7XG4gICAgICAgICAgICAgICAgbGV0IHN0ZXAgPSBzb3VyY2Uuc3RlcDtcbiAgICAgICAgICAgICAgICBpZiAoIXN0ZXApXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAgPSAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0ZXAgIT0gTWF0aC5mbG9vcihzdGVwKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBJbmRleEVudW1lcmF0b3Igc3RlcCB2YWx1ZSAoXCIgKyBzdGVwICsgXCIpIGhhcyBkZWNpbWFsLlwiKTtcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc3RlcCA9IHN0ZXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGVuID0gKHNvdXJjZSAmJiBzb3VyY2Uuc291cmNlKSA/IHNvdXJjZS5sZW5ndGggOiAwO1xuICAgICAgICAgICAgaWYgKCFsZW4gfHwgaXNOYU4obGVuKSlcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gc291cmNlLnBvaW50ZXI7XG4gICAgICAgICAgICBpZiAoc291cmNlLnBvaW50ZXIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IDA7IC8vIHNob3VsZCBuZXZlciBoYXBwZW4gYnV0IGlzIGluIHBsYWNlIHRvIG5lZ2F0ZSBjb21waWxlciB3YXJuaW5ncy5cbiAgICAgICAgICAgIGlmICghc291cmNlLnN0ZXApXG4gICAgICAgICAgICAgICAgc291cmNlLnN0ZXAgPSAxOyAvLyBzaG91bGQgbmV2ZXIgaGFwcGVuIGJ1dCBpcyBpbiBwbGFjZSB0byBuZWdhdGUgY29tcGlsZXIgd2FybmluZ3MuXG4gICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IHNvdXJjZS5wb2ludGVyICsgc291cmNlLnN0ZXA7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnJlbnQgPCBsZW4gJiYgY3VycmVudCA+PSAwKVxuICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihzb3VyY2Uuc291cmNlW2N1cnJlbnRdKVxuICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc291cmNlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZGV4RW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUluZGV4RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0luZGV4RW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5leHBvcnQgY2xhc3MgSXRlcmF0b3JSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBpbmRleCwgZG9uZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PSAnYm9vbGVhbicpXG4gICAgICAgICAgICB0aGlzLmRvbmUgPSBpbmRleDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLmRvbmUgPSBkb25lO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gICAgfVxufVxuKGZ1bmN0aW9uIChJdGVyYXRvclJlc3VsdCkge1xuICAgIEl0ZXJhdG9yUmVzdWx0LkRvbmUgPSBuZXcgSXRlcmF0b3JSZXN1bHQoVk9JRDAsIFZPSUQwLCB0cnVlKTtcbiAgICBmdW5jdGlvbiBHZXREb25lKCkgeyByZXR1cm4gSXRlcmF0b3JSZXN1bHQuRG9uZTsgfVxuICAgIEl0ZXJhdG9yUmVzdWx0LkdldERvbmUgPSBHZXREb25lO1xufSkoSXRlcmF0b3JSZXN1bHQgfHwgKEl0ZXJhdG9yUmVzdWx0ID0ge30pKTtcbk9iamVjdC5mcmVlemUoSXRlcmF0b3JSZXN1bHQpO1xuZXhwb3J0IGRlZmF1bHQgSXRlcmF0b3JSZXN1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JdGVyYXRvclJlc3VsdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0l0ZXJhdG9yUmVzdWx0LmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG4vKipcbiAqIENhbiBiZSB1c2VkIHN0YXRpY2FsbHkgb3IgZXh0ZW5kZWQgZm9yIHZhcnlpbmcgZGlmZmVyZW50IHJldXNhYmxlIGZ1bmN0aW9uIHNpZ25hdHVyZXMuXG4gKi9cbi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi8gZXhwb3J0IGNsYXNzIEZ1bmN0aW9ucyB7XG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIEEgdHlwZWQgbWV0aG9kIGZvciB1c2Ugd2l0aCBzaW1wbGUgc2VsZWN0aW9uIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAgICogQHJldHVybnMge1R9XG4gICAgICovXG4gICAgSWRlbnRpdHkoeCkgeyByZXR1cm4geDsgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgVHJ1ZSgpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBGYWxzZSgpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgLyoqXG4gICAgICogRG9lcyBub3RoaW5nLlxuICAgICAqL1xuICAgIEJsYW5rKCkgeyB9XG59XG5jb25zdCByb290RnVuY3Rpb25zID0gbmV3IEZ1bmN0aW9ucygpO1xuLy8gRXhwb3NlIHN0YXRpYyB2ZXJzaW9ucy5cbihmdW5jdGlvbiAoRnVuY3Rpb25zKSB7XG4gICAgLyoqXG4gICAgICogQSB0eXBlZCBtZXRob2QgZm9yIHVzZSB3aXRoIHNpbXBsZSBzZWxlY3Rpb24gb2YgdGhlIHBhcmFtZXRlci5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBGdW5jdGlvbnMuSWRlbnRpdHkgPSByb290RnVuY3Rpb25zLklkZW50aXR5O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgZmFsc2UuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgRnVuY3Rpb25zLlRydWUgPSByb290RnVuY3Rpb25zLlRydWU7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBGdW5jdGlvbnMuRmFsc2UgPSByb290RnVuY3Rpb25zLkZhbHNlO1xuICAgIC8qKlxuICAgICAqIERvZXMgbm90aGluZy5cbiAgICAgKi9cbiAgICBGdW5jdGlvbnMuQmxhbmsgPSByb290RnVuY3Rpb25zLkJsYW5rO1xufSkoRnVuY3Rpb25zIHx8IChGdW5jdGlvbnMgPSB7fSkpO1xuLy8gTWFrZSB0aGlzIHJlYWQgb25seS4gIFNob3VsZCBzdGlsbCBhbGxvdyBmb3Igc3ViLWNsYXNzaW5nIHNpbmNlIGV4dHJhIG1ldGhvZHMgYXJlIGFkZGVkIHRvIHByb3RvdHlwZS5cbk9iamVjdC5mcmVlemUoRnVuY3Rpb25zKTtcbmV4cG9ydCBkZWZhdWx0IEZ1bmN0aW9ucztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZ1bmN0aW9ucy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Z1bmN0aW9ucy5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JcIjtcbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb25cIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2VcIjtcbmltcG9ydCB7IGlzQ29tbW9uSlMsIGlzTm9kZUpTLCBpc1JlcXVpcmVKUyB9IGZyb20gXCIuLi9FbnZpcm9ubWVudFwiO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbi8vbm9pbnNwZWN0aW9uIFNwZWxsQ2hlY2tpbmdJbnNwZWN0aW9uXG5jb25zdCBOQU1FID0gXCJDb2xsZWN0aW9uQmFzZVwiLCBDTURDID0gXCJDYW5ub3QgbW9kaWZ5IGEgZGlzcG9zZWQgY29sbGVjdGlvbi5cIiwgQ01STyA9IFwiQ2Fubm90IG1vZGlmeSBhIHJlYWQtb25seSBjb2xsZWN0aW9uLlwiO1xuY29uc3QgTElOUV9QQVRIID0gXCIuLi8uLi9TeXN0ZW0uTGlucS9MaW5xXCI7XG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbkJhc2UgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlLCBfZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2VxdWFsaXR5Q29tcGFyZXIgPSBfZXF1YWxpdHlDb21wYXJlcjtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gTkFNRTtcbiAgICAgICAgXy5faW1wb3J0RW50cmllcyhzb3VyY2UpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24gPSAwO1xuICAgICAgICBfLl9tb2RpZmllZENvdW50ID0gMDtcbiAgICAgICAgXy5fdmVyc2lvbiA9IDA7XG4gICAgfVxuICAgIGdldCBjb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q291bnQoKTtcbiAgICB9XG4gICAgZ2V0SXNSZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICBnZXQgaXNSZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXNSZWFkT25seSgpO1xuICAgIH1cbiAgICBhc3NlcnRNb2RpZmlhYmxlKCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZChDTURDKTtcbiAgICAgICAgaWYgKHRoaXMuZ2V0SXNSZWFkT25seSgpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oQ01STyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBhc3NlcnRWZXJzaW9uKHZlcnNpb24pIHtcbiAgICAgICAgaWYgKHZlcnNpb24gIT09IHRoaXMuX3ZlcnNpb24pXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNvbGxlY3Rpb24gd2FzIG1vZGlmaWVkLlwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIF9vbk1vZGlmaWVkKCkgeyB9XG4gICAgX3NpZ25hbE1vZGlmaWNhdGlvbihpbmNyZW1lbnQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmIChpbmNyZW1lbnQpXG4gICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIGlmIChfLl9tb2RpZmllZENvdW50ICYmICF0aGlzLl91cGRhdGVSZWN1cnNpb24pIHtcbiAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQgPSAwO1xuICAgICAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBfLl9vbk1vZGlmaWVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAvLyBBdm9pZCBmYXRhbCBlcnJvcnMgd2hpY2ggbWF5IGhhdmUgYmVlbiBjYXVzZWQgYnkgY29uc3VtZXIuXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF9pbmNyZW1lbnRNb2RpZmllZCgpIHsgdGhpcy5fbW9kaWZpZWRDb3VudCsrOyB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgZ2V0IGlzVXBkYXRpbmcoKSB7IHJldHVybiB0aGlzLl91cGRhdGVSZWN1cnNpb24gIT0gMDsgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgY2xvc3VyZSB0aGF0IGlmIHJldHVybmluZyB0cnVlIHdpbGwgcHJvcGFnYXRlIGFuIHVwZGF0ZSBzaWduYWwuXG4gICAgICogTXVsdGlwbGUgdXBkYXRlIG9wZXJhdGlvbnMgY2FuIGJlIG9jY3VycmluZyBhdCBvbmNlIG9yIHJlY3Vyc2l2ZWx5IGFuZCB0aGUgb25Nb2RpZmllZCBzaWduYWwgd2lsbCBvbmx5IG9jY3VyIG9uY2UgdGhleSdyZSBkb25lLlxuICAgICAqIEBwYXJhbSBjbG9zdXJlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFuZGxlVXBkYXRlKGNsb3N1cmUpIHtcbiAgICAgICAgaWYgKCFjbG9zdXJlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICBsZXQgdXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHVwZGF0ZWQgPSBjbG9zdXJlKCkpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgIH1cbiAgICAvKlxuICAgICAqIE5vdGU6IGZvciBhIHNsaWdodCBhbW91bnQgbW9yZSBjb2RlLCB3ZSBhdm9pZCBjcmVhdGluZyBmdW5jdGlvbnMvY2xvc3VyZXMuXG4gICAgICogQ2FsbGluZyBoYW5kbGVVcGRhdGUgaXMgdGhlIGNvcnJlY3QgcGF0dGVybiwgYnV0IGlmIHBvc3NpYmxlIGF2b2lkIGNyZWF0aW5nIGFub3RoZXIgZnVuY3Rpb24gc2NvcGUuXG4gICAgICovXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBlbnRyeSB0byB0aGUgY29sbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZW50cnlcbiAgICAgKi9cbiAgICBhZGQoZW50cnkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24rKztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfLl9hZGRJbnRlcm5hbChlbnRyeSkpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBfO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGVudHJpZXMgZnJvbSB0aGUgY29sbGVjdGlvbiBhbGxvd2luZyBmb3IgYSBsaW1pdC5cbiAgICAgKiBGb3IgZXhhbXBsZSBpZiB0aGUgY29sbGVjdGlvbiBub3QgYSBkaXN0aW5jdCBzZXQsIG1vcmUgdGhhbiBvbmUgZW50cnkgY291bGQgYmUgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0gZW50cnkgVGhlIGVudHJ5IHRvIHJlbW92ZS5cbiAgICAgKiBAcGFyYW0gbWF4IExpbWl0IG9mIGVudHJpZXMgdG8gcmVtb3ZlLiAgV2lsbCByZW1vdmUgYWxsIG1hdGNoZXMgaWYgbm8gbWF4IHNwZWNpZmllZC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGVudHJpZXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICByZW1vdmUoZW50cnksIG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIGxldCBuID0gTmFOO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG4gPSBfLl9yZW1vdmVJbnRlcm5hbChlbnRyeSwgbWF4KSlcbiAgICAgICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24tLTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgY29udGVudHMgb2YgdGhlIGNvbGxlY3Rpb24gcmVzdWx0aW5nIGluIGEgY291bnQgb2YgemVyby5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICBsZXQgbiA9IE5hTjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChuID0gXy5fY2xlYXJJbnRlcm5hbCgpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9jbGVhckludGVybmFsKCk7XG4gICAgICAgIHRoaXMuX3ZlcnNpb24gPSAwO1xuICAgICAgICB0aGlzLl91cGRhdGVSZWN1cnNpb24gPSAwO1xuICAgICAgICB0aGlzLl9tb2RpZmllZENvdW50ID0gMDtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMuX2xpbnE7XG4gICAgICAgIHRoaXMuX2xpbnEgPSB2b2lkIDA7XG4gICAgICAgIGlmIChsKVxuICAgICAgICAgICAgbC5kaXNwb3NlKCk7XG4gICAgfVxuICAgIF9pbXBvcnRFbnRyaWVzKGVudHJpZXMpIHtcbiAgICAgICAgbGV0IGFkZGVkID0gMDtcbiAgICAgICAgaWYgKGVudHJpZXMpIHtcbiAgICAgICAgICAgIGlmICgoZW50cmllcykgaW5zdGFuY2VvZiAoQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgLy8gT3B0aW1pemUgZm9yIGF2b2lkaW5nIGEgbmV3IGNsb3N1cmUuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hZGRJbnRlcm5hbChlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yRWFjaChlbnRyaWVzLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FkZEludGVybmFsKGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWQrKztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWRkZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhZmVseSBpbXBvcnRzIGFueSBhcnJheSBlbnVtZXJhdG9yLCBvciBlbnVtZXJhYmxlLlxuICAgICAqIEBwYXJhbSBlbnRyaWVzXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBpbXBvcnRFbnRyaWVzKGVudHJpZXMpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghZW50cmllcylcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIGxldCBuID0gTmFOO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG4gPSBfLl9pbXBvcnRFbnRyaWVzKGVudHJpZXMpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBmaWx0ZXJlZCBieSB0aGUgcHJvdmlkZWQgcHJlZGljYXRlLlxuICAgICAqIFByb3ZpZGVkIGZvciBzaW1pbGFyaXR5IHRvIEpTIEFycmF5LlxuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAcmV0dXJucyB7W119XG4gICAgICovXG4gICAgZmlsdGVyKHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ3ByZWRpY2F0ZScpO1xuICAgICAgICBsZXQgY291bnQgPSAhdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShlLCBpKSlcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgdGhlIGZpcnN0IHRpbWUgcHJlZGljYXRlIHJldHVybnMgdHJ1ZS4gIE90aGVyd2lzZSBmYWxzZS5cbiAgICAgKiBVc2VmdWwgZm9yIHNlYXJjaGluZyB0aHJvdWdoIGEgY29sbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBhbnkocHJlZGljYXRlKSB7XG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgaWYgKCFjb3VudClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICByZXR1cm4gQm9vbGVhbihjb3VudCk7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvckVhY2goKGUsIGkpID0+ICEoZm91bmQgPSBwcmVkaWNhdGUoZSwgaSkpKTtcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgdGhlIGZpcnN0IHRpbWUgcHJlZGljYXRlIHJldHVybnMgdHJ1ZS4gIE90aGVyd2lzZSBmYWxzZS5cbiAgICAgKiBTZWUgJy5hbnkocHJlZGljYXRlKScuICBBcyB0aGlzIG1ldGhvZCBpcyBqdXN0IGp1c3QgaW5jbHVkZWQgdG8gaGF2ZSBzaW1pbGFyaXR5IHdpdGggYSBKUyBBcnJheS5cbiAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBzb21lKHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbnkocHJlZGljYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBlcXVhbGl0eSBjb21wYXJlciByZXNvbHZlcyB0cnVlIG9uIGFueSBlbGVtZW50IGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBlbnRyeVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zKGVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGVxdWFscyA9IHRoaXMuX2VxdWFsaXR5Q29tcGFyZXI7XG4gICAgICAgIHJldHVybiB0aGlzLmFueShlID0+IGVxdWFscyhlbnRyeSwgZSkpO1xuICAgIH1cbiAgICBmb3JFYWNoKGFjdGlvbiwgdXNlQ29weSkge1xuICAgICAgICBpZiAodGhpcy53YXNEaXNwb3NlZClcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBpZiAodXNlQ29weSkge1xuICAgICAgICAgICAgY29uc3QgYSA9IHRoaXMudG9BcnJheSgpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9yRWFjaChhLCBhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgYS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZvckVhY2godGhpcy5nZXRFbnVtZXJhdG9yKCksIGFjdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29waWVzIGFsbCB2YWx1ZXMgdG8gbnVtZXJpY2FsbHkgaW5kZXhhYmxlIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICogQHJldHVybnMge1RUYXJnZXR9XG4gICAgICovXG4gICAgY29weVRvKHRhcmdldCwgaW5kZXggPSAwKSB7XG4gICAgICAgIGlmICghdGFyZ2V0KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigndGFyZ2V0Jyk7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0xlbmd0aCA9IGNvdW50ICsgaW5kZXg7XG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCA8IG5ld0xlbmd0aClcbiAgICAgICAgICAgICAgICB0YXJnZXQubGVuZ3RoID0gbmV3TGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgZSA9IHRoaXMuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgd2hpbGUgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpbmRleCsrXSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSBjb2xsZWN0aW9uIGNvbnRlbnRzLlxuICAgICAqIEByZXR1cm5zIHthbnlbXXxBcnJheX1cbiAgICAgKi9cbiAgICB0b0FycmF5KCkge1xuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgcmV0dXJuIGNvdW50XG4gICAgICAgICAgICA/IHRoaXMuY29weVRvKGNvdW50ID4gNjU1MzYgPyBuZXcgQXJyYXkoY291bnQpIDogW10pXG4gICAgICAgICAgICA6IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAubGlucSB3aWxsIHJldHVybiBhbiBJTGlucUVudW1lcmFibGUgaWYgLmxpbnFBc3luYygpIGhhcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5IG9yIHRoZSBkZWZhdWx0IG1vZHVsZSBsb2FkZXIgaXMgTm9kZUpTK0NvbW1vbkpTLlxuICAgICAqIEByZXR1cm5zIHtJTGlucUVudW1lcmFibGV9XG4gICAgICovXG4gICAgZ2V0IGxpbnEoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBlID0gdGhpcy5fbGlucTtcbiAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICBsZXQgcjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgciA9IGV2YWwoJ3JlcXVpcmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkgeyB9XG4gICAgICAgICAgICB0aGlzLl9saW5xID0gZSA9IHIgJiYgcihMSU5RX1BBVEgpLmRlZmF1bHQuZnJvbSh0aGlzKTtcbiAgICAgICAgICAgIGlmICghZSkge1xuICAgICAgICAgICAgICAgIHRocm93IGlzUmVxdWlyZUpTXG4gICAgICAgICAgICAgICAgICAgID8gYHVzaW5nIC5saW5xIHRvIGxvYWQgYW5kIGluaXRpYWxpemUgYSBJTGlucUVudW1lcmFibGUgaXMgY3VycmVudGx5IG9ubHkgc3VwcG9ydGVkIHdpdGhpbiBhIE5vZGVKUyBlbnZpcm9ubWVudC5cclxuSW1wb3J0IFN5c3RlbS5MaW5xL0xpbnEgYW5kIHVzZSBFbnVtZXJhYmxlLmZyb20oZSkgaW5zdGVhZC5cclxuWW91IGNhbiBhbHNvIHByZWxvYWQgdGhlIExpbnEgbW9kdWxlIGFzIGEgZGVwZW5kZW5jeSBvciB1c2UgLmxpbnFBc3luYyhjYWxsYmFjaykgZm9yIEFNRC9SZXF1aXJlSlMuYFxuICAgICAgICAgICAgICAgICAgICA6IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBpbXBvcnRpbmcgU3lzdGVtLkxpbnEvTGlucVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAubGlucUFzeW5jKCkgaXMgZm9yIHVzZSB3aXRoIGRlZmVycmVkIGxvYWRpbmcuXG4gICAgICogRW5zdXJlcyBhbiBpbnN0YW5jZSBvZiB0aGUgTGlucSBleHRlbnNpb25zIGlzIGF2YWlsYWJsZSBhbmQgdGhlbiBwYXNzZXMgaXQgdG8gdGhlIGNhbGxiYWNrLlxuICAgICAqIFJldHVybnMgYW4gSUxpbnFFbnVtZXJhYmxlIGlmIG9uZSBpcyBhbHJlYWR5IGF2YWlsYWJsZSwgb3RoZXJ3aXNlIHVuZGVmaW5lZC5cbiAgICAgKiBQYXNzaW5nIG5vIHBhcmFtZXRlcnMgd2lsbCBzdGlsbCBpbml0aWF0ZSBsb2FkaW5nIGFuZCBpbml0aWFsaXppbmcgdGhlIElMaW5xRW51bWVyYWJsZSB3aGljaCBjYW4gYmUgdXNlZnVsIGZvciBwcmUtbG9hZGluZy5cbiAgICAgKiBBbnkgY2FsbCB0byAubGlucUFzeW5jKCkgd2hlcmUgYW4gSUxpbnFFbnVtZXJhYmxlIGlzIHJldHVybmVkIGNhbiBiZSBhc3N1cmVkIHRoYXQgYW55IHN1YnNlcXVlbnQgY2FsbHMgdG8gLmxpbnEgd2lsbCByZXR1cm4gdGhlIHNhbWUgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHJldHVybnMge0lMaW5xRW51bWVyYWJsZX1cbiAgICAgKi9cbiAgICBsaW5xQXN5bmMoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IGUgPSB0aGlzLl9saW5xO1xuICAgICAgICBpZiAoIWUpIHtcbiAgICAgICAgICAgIGlmIChpc1JlcXVpcmVKUykge1xuICAgICAgICAgICAgICAgIGV2YWwoXCJyZXF1aXJlXCIpKFtMSU5RX1BBVEhdLCAobGlucSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBDb3VsZCBlbmQgdXAgYmVpbmcgY2FsbGVkIG1vcmUgdGhhbiBvbmNlLCBiZSBzdXJlIHRvIGNoZWNrIGZvciAuX2xpbnEgYmVmb3JlIHNldHRpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgZSA9IHRoaXMuX2xpbnE7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbnEgPSBlID0gbGlucS5kZWZhdWx0LmZyb20odGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBpbXBvcnRpbmcgU3lzdGVtLkxpbnEvTGlucVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB2b2lkIDA7IC8vIEluIGNhc2UgdGhpcyBpcyByZXR1cm4gc3luY2hyb25vdXNseS4uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc05vZGVKUyAmJiBpc0NvbW1vbkpTKSB7XG4gICAgICAgICAgICAgICAgZSA9IHRoaXMubGlucTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IGZpbmQgYSBjb21wYXRpYmxlIGxvYWRlciBmb3IgaW1wb3J0aW5nIFN5c3RlbS5MaW5xL0xpbnFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZSAmJiBjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db2xsZWN0aW9uQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0NvbGxlY3Rpb25CYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBpbml0aWFsaXplIH0gZnJvbSBcIi4vaW5pdGlhbGl6ZVwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbi8qKlxuICpcbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBzb3VyY2VJbmRleFxuICogQHBhcmFtIGxlbmd0aFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHkoc291cmNlLCBzb3VyY2VJbmRleCA9IDAsIGxlbmd0aCA9IEluZmluaXR5KSB7XG4gICAgaWYgKCFzb3VyY2UpXG4gICAgICAgIHJldHVybiBzb3VyY2U7IC8vIG1heSBoYXZlIHBhc3NlZCB6ZXJvPyB1bmRlZmluZWQ/IG9yIG51bGw/XG4gICAgcmV0dXJuIGNvcHlUbyhzb3VyY2UsIGluaXRpYWxpemUoTWF0aC5taW4obGVuZ3RoLCBNYXRoLm1heChzb3VyY2UubGVuZ3RoIC0gc291cmNlSW5kZXgsIDApKSksIHNvdXJjZUluZGV4LCAwLCBsZW5ndGgpO1xufVxuY29uc3QgQ0JOID0gJ0Nhbm5vdCBiZSBudWxsLicsIENCTDAgPSAnQ2Fubm90IGJlIGxlc3MgdGhhbiB6ZXJvLic7XG4vKipcbiAqIENvcGllcyBvbmUgYXJyYXkgdG8gYW5vdGhlci5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBkZXN0aW5hdGlvblxuICogQHBhcmFtIHNvdXJjZUluZGV4XG4gKiBAcGFyYW0gZGVzdGluYXRpb25JbmRleFxuICogQHBhcmFtIGxlbmd0aCBBbiBvcHRpb25hbCBsaW1pdCB0byBzdG9wIGNvcHlpbmcuXG4gKiBAcmV0dXJucyBUaGUgZGVzdGluYXRpb24gYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5VG8oc291cmNlLCBkZXN0aW5hdGlvbiwgc291cmNlSW5kZXggPSAwLCBkZXN0aW5hdGlvbkluZGV4ID0gMCwgbGVuZ3RoID0gSW5maW5pdHkpIHtcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignc291cmNlJywgQ0JOKTtcbiAgICBpZiAoIWRlc3RpbmF0aW9uKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdkZXN0aW5hdGlvbicsIENCTik7XG4gICAgaWYgKHNvdXJjZUluZGV4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignc291cmNlSW5kZXgnLCBzb3VyY2VJbmRleCwgQ0JMMCk7XG4gICAgbGV0IHNvdXJjZUxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG4gICAgaWYgKCFzb3VyY2VMZW5ndGgpXG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICBpZiAoc291cmNlSW5kZXggPj0gc291cmNlTGVuZ3RoKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzb3VyY2VJbmRleCcsIHNvdXJjZUluZGV4LCAnTXVzdCBiZSBsZXNzIHRoYW4gdGhlIGxlbmd0aCBvZiB0aGUgc291cmNlIGFycmF5LicpO1xuICAgIGlmIChkZXN0aW5hdGlvbi5sZW5ndGggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdkZXN0aW5hdGlvbkluZGV4JywgZGVzdGluYXRpb25JbmRleCwgQ0JMMCk7XG4gICAgY29uc3QgbWF4TGVuZ3RoID0gc291cmNlLmxlbmd0aCAtIHNvdXJjZUluZGV4O1xuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpICYmIGxlbmd0aCA+IG1heExlbmd0aClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignc291cmNlSW5kZXgnLCBzb3VyY2VJbmRleCwgJ1NvdXJjZSBpbmRleCArIGxlbmd0aCBjYW5ub3QgZXhjZWVkIHRoZSBsZW5ndGggb2YgdGhlIHNvdXJjZSBhcnJheS4nKTtcbiAgICBsZW5ndGggPSBNYXRoLm1pbihsZW5ndGgsIG1heExlbmd0aCk7XG4gICAgY29uc3QgbmV3TGVuZ3RoID0gZGVzdGluYXRpb25JbmRleCArIGxlbmd0aDtcbiAgICBpZiAobmV3TGVuZ3RoID4gZGVzdGluYXRpb24ubGVuZ3RoKVxuICAgICAgICBkZXN0aW5hdGlvbi5sZW5ndGggPSBuZXdMZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBkZXN0aW5hdGlvbltkZXN0aW5hdGlvbkluZGV4ICsgaV0gPSBzb3VyY2Vbc291cmNlSW5kZXggKyBpXTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29weS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L2NvcHkuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vVHlwZXNcIjtcbmV4cG9ydCBjb25zdCBFTVBUWSA9ICcnO1xuLyoqXG4gKiBSZXR1cm5zIGEgbnVtZXJpY2FsIChpbnRlZ2VyKSBoYXNoIGNvZGUgb2YgdGhlIHN0cmluZy4gIENhbiBiZSB1c2VkIGZvciBpZGVudGlmeWluZyBpbmVxdWFsaXR5IG9mIGNvbnRlbnRzLCBidXQgdHdvIGRpZmZlcmVudCBzdHJpbmdzIGluIHJhcmUgY2FzZXMgd2lsbCBoYXZlIHRoZSBzYW1lIGhhc2ggY29kZS5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIYXNoQ29kZShzb3VyY2UpIHtcbiAgICBsZXQgaGFzaCA9IDAgfCAwO1xuICAgIGlmIChzb3VyY2UubGVuZ3RoID09IDApXG4gICAgICAgIHJldHVybiBoYXNoO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gc291cmNlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBsZXQgY2ggPSBzb3VyY2UuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2g7XG4gICAgICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gICAgfVxuICAgIHJldHVybiBoYXNoO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdChzb3VyY2UsIGNvdW50KSB7XG4gICAgbGV0IHJlc3VsdCA9IEVNUFRZO1xuICAgIGlmICghaXNOYU4oY291bnQpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHNvdXJjZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21DaGFycyhjaE9yQ2hhcnMsIGNvdW50ID0gMSkge1xuICAgIGlmICgoY2hPckNoYXJzKSBpbnN0YW5jZW9mIChBcnJheSkpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IEVNUFRZO1xuICAgICAgICBmb3IgKGxldCBjaGFyIG9mIGNoT3JDaGFycykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiByZXBlYXQoU3RyaW5nLmZyb21DaGFyQ29kZShjaE9yQ2hhcnMpLCBjb3VudCk7XG4gICAgfVxufVxuLyoqXG4gKiBFc2NhcGVzIGEgUmVnRXhwIHNlcXVlbmNlLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzb3VyY2UpIHtcbiAgICByZXR1cm4gc291cmNlLnJlcGxhY2UoL1stW1xcXVxcL3t9KCkqKz8uXFxcXF4kfF0vZywgXCJcXFxcJCZcIik7XG59XG4vKipcbiAqIENhbiB0cmltIGFueSBjaGFyYWN0ZXIgb3Igc2V0IG9mIGNoYXJhY3RlcnMgZnJvbSB0aGUgZW5kcyBvZiBhIHN0cmluZy5cbiAqIFVzZXMgYSBSZWdleCBlc2NhcGVtZW50IHRvIHJlcGxhY2UgdGhlbSB3aXRoIGVtcHR5LlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIGNoYXJzIEEgc3RyaW5nIG9yIGFycmF5IG9mIGNoYXJhY3RlcnMgZGVzaXJlZCB0byBiZSB0cmltbWVkLlxuICogQHBhcmFtIGlnbm9yZUNhc2VcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmltKHNvdXJjZSwgY2hhcnMsIGlnbm9yZUNhc2UpIHtcbiAgICBpZiAoY2hhcnMgPT09IEVNUFRZKVxuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgIGlmIChjaGFycykge1xuICAgICAgICBjb25zdCBlc2NhcGVkID0gZXNjYXBlUmVnRXhwKChjaGFycykgaW5zdGFuY2VvZiAoQXJyYXkpID8gY2hhcnMuam9pbigpIDogY2hhcnMpO1xuICAgICAgICByZXR1cm4gc291cmNlLnJlcGxhY2UobmV3IFJlZ0V4cCgnXlsnICsgZXNjYXBlZCArICddK3xbJyArIGVzY2FwZWQgKyAnXSskJywgJ2cnICsgKGlnbm9yZUNhc2VcbiAgICAgICAgICAgID8gJ2knXG4gICAgICAgICAgICA6ICcnKSksIEVNUFRZKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBFTVBUWSk7XG59XG4vKipcbiAqIFRha2VzIGFueSBhcmdcbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBhcmdzXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0KHNvdXJjZSwgLi4uYXJncykge1xuICAgIHJldHVybiBzdXBwbGFudChzb3VyY2UsIGFyZ3MpO1xufVxuLy9cbi8qKlxuICogVGhpcyB0YWtlcyBhIHN0cmluZyBhbmQgcmVwbGFjZXMgJ3tzdHJpbmd9JyB3aXRoIHRoZSByZXNwZWN0ZWQgcGFyYW1ldGVyLlxuICogQWxzbyBhbGxvd3MgZm9yIHBhc3NpbmcgYW4gYXJyYXkgaW4gb3JkZXIgdG8gdXNlICd7bn0nIG5vdGF0aW9uLlxuICogTm90IGxpbWl0ZWQgdG8gYW4gYXJyYXkncyBpbmRleGVzLiAgRm9yIGV4YW1wbGUsIHtsZW5ndGh9IGlzIGFsbG93ZWQuXG4gKiBCYXNlZCB1cG9uIENyb2NrZm9yZCdzIHN1cHBsYW50IGZ1bmN0aW9uLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHBhcmFtc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1cHBsYW50KHNvdXJjZSwgcGFyYW1zKSB7XG4gICAgY29uc3Qgb0lzQXJyYXkgPSAocGFyYW1zKSBpbnN0YW5jZW9mIChBcnJheSk7XG4gICAgcmV0dXJuIHNvdXJjZS5yZXBsYWNlKC97KFtee31dKil9L2csIChhLCBiKSA9PiB7XG4gICAgICAgIGxldCBuID0gYjtcbiAgICAgICAgaWYgKG9Jc0FycmF5KSB7XG4gICAgICAgICAgICBsZXQgaSA9IHBhcnNlSW50KGIpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihpKSlcbiAgICAgICAgICAgICAgICBuID0gaTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgciA9IHBhcmFtc1tuXTtcbiAgICAgICAgc3dpdGNoICh0eXBlb2Ygcikge1xuICAgICAgICAgICAgY2FzZSBUeXBlLlNUUklORzpcbiAgICAgICAgICAgIGNhc2UgVHlwZS5OVU1CRVI6XG4gICAgICAgICAgICBjYXNlIFR5cGUuQk9PTEVBTjpcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChyICYmIFR5cGUuaGFzTWVtYmVyT2ZUeXBlKHIsIFwidG9TdHJpbmdcIiwgVHlwZS5GVU5DVElPTikpXG4gICAgICAgICAgICAgICAgICAgID8gci50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIDogYTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gY2FuTWF0Y2goc291cmNlLCBtYXRjaCkge1xuICAgIGlmICghVHlwZS5pc1N0cmluZyhzb3VyY2UpIHx8ICFtYXRjaClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChzb3VyY2UgPT09IG1hdGNoKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBpZiAobWF0Y2gubGVuZ3RoIDwgc291cmNlLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIG51bGw7XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcGF0dGVybiBtYXRjaGVzIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNvdXJjZS5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBwYXR0ZXJuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0c1dpdGgoc291cmNlLCBwYXR0ZXJuKSB7XG4gICAgY29uc3QgbSA9IGNhbk1hdGNoKHNvdXJjZSwgcGF0dGVybik7XG4gICAgcmV0dXJuIFR5cGUuaXNCb29sZWFuKG0pID8gbSA6IHNvdXJjZS5pbmRleE9mKHBhdHRlcm4pID09IDA7XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcGF0dGVybiBtYXRjaGVzIHRoZSBlbmQgb2YgdGhlIHNvdXJjZS5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBwYXR0ZXJuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuZHNXaXRoKHNvdXJjZSwgcGF0dGVybikge1xuICAgIGNvbnN0IG0gPSBjYW5NYXRjaChzb3VyY2UsIHBhdHRlcm4pO1xuICAgIHJldHVybiBUeXBlLmlzQm9vbGVhbihtKSA/IG0gOiBzb3VyY2UubGFzdEluZGV4T2YocGF0dGVybikgPT0gKHNvdXJjZS5sZW5ndGggLSBwYXR0ZXJuLmxlbmd0aCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VdGlsaXR5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vVGV4dC9VdGlsaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJbmRleEVudW1lcmF0b3IgfSBmcm9tIFwiLi9JbmRleEVudW1lcmF0b3JcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIEFycmF5RW51bWVyYXRvciBleHRlbmRzIEluZGV4RW51bWVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoYXJyYXlPckZhY3RvcnksIHN0YXJ0ID0gMCwgc3RlcCA9IDEpIHtcbiAgICAgICAgc3VwZXIoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXJyYXkgPSBUeXBlLmlzRnVuY3Rpb24oYXJyYXlPckZhY3RvcnkpID8gYXJyYXlPckZhY3RvcnkoKSA6IGFycmF5T3JGYWN0b3J5O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGFycmF5LFxuICAgICAgICAgICAgICAgIHBvaW50ZXI6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGxlbmd0aDogYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgICAgICAgICAgIHN0ZXA6IHN0ZXBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFycmF5RW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFycmF5RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0FycmF5RW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdPYmplY3REaXNwb3NlZEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gZXh0ZW5kcyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIHtcbiAgICAvLyBGb3Igc2ltcGxpY2l0eSBhbmQgY29uc2lzdGVuY3ksIGxldHMgc3RpY2sgd2l0aCAxIHNpZ25hdHVyZS5cbiAgICBjb25zdHJ1Y3RvcihvYmplY3ROYW1lLCBtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbikge1xuICAgICAgICBzdXBlcihtZXNzYWdlIHx8ICcnLCBpbm5lckV4Y2VwdGlvbiwgKF8pID0+IHtcbiAgICAgICAgICAgIF8ub2JqZWN0TmFtZSA9IG9iamVjdE5hbWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgb05hbWUgPSBfLm9iamVjdE5hbWU7XG4gICAgICAgIG9OYW1lID0gb05hbWUgPyAoJ3snICsgb05hbWUgKyAnfSAnKSA6ICcnO1xuICAgICAgICByZXR1cm4gJ1snICsgXy5uYW1lICsgJzogJyArIG9OYW1lICsgXy5tZXNzYWdlICsgJ10nO1xuICAgIH1cbiAgICBzdGF0aWMgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2FibGUsIG9iamVjdE5hbWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGRpc3Bvc2FibGUud2FzRGlzcG9zZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24ob2JqZWN0TmFtZSwgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0RGlzcG9zZWRFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL09iamVjdERpc3Bvc2VkRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbiBPYmplY3RQb29sIGZyb20gUGFyYWxsZWwgRXh0ZW5zaW9uIEV4dHJhcyBhbmQgb3RoZXIgT2JqZWN0UG9vbCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBVc2VzIC5hZGQoVCkgYW5kIC50YWtlKCk6VFxuICovXG5pbXBvcnQgeyBkaXNwb3NlIH0gZnJvbSBcIi4vZGlzcG9zZVwiO1xuaW1wb3J0IHsgRGlzcG9zYWJsZUJhc2UgfSBmcm9tIFwiLi9EaXNwb3NhYmxlQmFzZVwiO1xuaW1wb3J0IHsgVGFza0hhbmRsZXIgfSBmcm9tIFwiLi4vVGhyZWFkaW5nL1Rhc2tzL1Rhc2tIYW5kbGVyXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50RXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRFeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgT0JKRUNUX1BPT0wgPSBcIk9iamVjdFBvb2xcIiwgX01BWF9TSVpFID0gXCJfbWF4U2l6ZVwiLCBBQlNPTFVURV9NQVhfU0laRSA9IDY1NTM2LCBNVVNUX0JFX0dUMSA9IFwiTXVzdCBiZSBhdCB2YWxpZCBudW1iZXIgbGVhc3QgMS5cIiwgTVVTVF9CRV9MVE0gPSBgTXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJHtBQlNPTFVURV9NQVhfU0laRX0uYDtcbmV4cG9ydCBjbGFzcyBPYmplY3RQb29sIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9tYXhTaXplLCBfZ2VuZXJhdG9yLCBfcmVjeWNsZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fbWF4U2l6ZSA9IF9tYXhTaXplO1xuICAgICAgICB0aGlzLl9nZW5lcmF0b3IgPSBfZ2VuZXJhdG9yO1xuICAgICAgICB0aGlzLl9yZWN5Y2xlciA9IF9yZWN5Y2xlcjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJ5IGRlZmF1bHQgd2lsbCBjbGVhciBhZnRlciA1IHNlY29uZHMgb2Ygbm9uLXVzZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYXV0b0NsZWFyVGltZW91dCA9IDUwMDA7XG4gICAgICAgIGlmIChpc05hTihfbWF4U2l6ZSkgfHwgX21heFNpemUgPCAxKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihfTUFYX1NJWkUsIF9tYXhTaXplLCBNVVNUX0JFX0dUMSk7XG4gICAgICAgIGlmIChfbWF4U2l6ZSA+IEFCU09MVVRFX01BWF9TSVpFKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihfTUFYX1NJWkUsIF9tYXhTaXplLCBNVVNUX0JFX0xUTSk7XG4gICAgICAgIHRoaXMuX2xvY2FsQWJzTWF4U2l6ZSA9IE1hdGgubWluKF9tYXhTaXplICogMiwgQUJTT0xVVEVfTUFYX1NJWkUpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBPQkpFQ1RfUE9PTDtcbiAgICAgICAgXy5fcG9vbCA9IFtdO1xuICAgICAgICBfLl90cmltbWVyID0gbmV3IFRhc2tIYW5kbGVyKCgpID0+IF8uX3RyaW0oKSk7XG4gICAgICAgIGNvbnN0IGNsZWFyID0gKCkgPT4gXy5fY2xlYXIoKTtcbiAgICAgICAgXy5fZmx1c2hlciA9IG5ldyBUYXNrSGFuZGxlcihjbGVhcik7XG4gICAgICAgIF8uX2F1dG9GbHVzaGVyID0gbmV3IFRhc2tIYW5kbGVyKGNsZWFyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgbWF4aW11bSBhdCB3aGljaCB0cmltbWluZyBzaG91bGQgYWxsb3cuXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgbWF4U2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFNpemU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgbnVtYmVyIG9mIG9iamVjdHMgaW4gcG9vbC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBjb3VudCgpIHtcbiAgICAgICAgY29uc3QgcCA9IHRoaXMuX3Bvb2w7XG4gICAgICAgIHJldHVybiBwID8gcC5sZW5ndGggOiAwO1xuICAgIH1cbiAgICBfdHJpbSgpIHtcbiAgICAgICAgY29uc3QgcG9vbCA9IHRoaXMuX3Bvb2w7XG4gICAgICAgIHdoaWxlIChwb29sLmxlbmd0aCA+IHRoaXMuX21heFNpemUpIHtcbiAgICAgICAgICAgIGRpc3Bvc2Uuc2luZ2xlKHBvb2wucG9wKCksIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdpbGwgdHJpbSBlbnN1cmUgdGhlIHBvb2wgaXMgbGVzcyB0aGFuIHRoZSBtYXhTaXplLlxuICAgICAqIEBwYXJhbSBkZWZlciBBIGRlbGF5IGJlZm9yZSB0cmltbWluZy4gIFdpbGwgYmUgb3ZlcnJpZGRlbiBieSBsYXRlciBjYWxscy5cbiAgICAgKi9cbiAgICB0cmltKGRlZmVyKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRoaXMuX3RyaW1tZXIuc3RhcnQoZGVmZXIpO1xuICAgIH1cbiAgICBfY2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBwID0gXy5fcG9vbDtcbiAgICAgICAgXy5fdHJpbW1lci5jYW5jZWwoKTtcbiAgICAgICAgXy5fZmx1c2hlci5jYW5jZWwoKTtcbiAgICAgICAgXy5fYXV0b0ZsdXNoZXIuY2FuY2VsKCk7XG4gICAgICAgIGRpc3Bvc2UudGhlc2Uubm9Db3B5KHAsIHRydWUpO1xuICAgICAgICBwLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdpbGwgY2xlYXIgb3V0IHRoZSBwb29sLlxuICAgICAqIENhbmNlbHMgYW55IHNjaGVkdWxlZCB0cmltcyB3aGVuIGV4ZWN1dGVkLlxuICAgICAqIEBwYXJhbSBkZWZlciBBIGRlbGF5IGJlZm9yZSBjbGVhcmluZy4gIFdpbGwgYmUgb3ZlcnJpZGRlbiBieSBsYXRlciBjYWxscy5cbiAgICAgKi9cbiAgICBjbGVhcihkZWZlcikge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aGlzLl9mbHVzaGVyLnN0YXJ0KGRlZmVyKTtcbiAgICB9XG4gICAgdG9BcnJheUFuZENsZWFyKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgXy5fdHJpbW1lci5jYW5jZWwoKTtcbiAgICAgICAgXy5fZmx1c2hlci5jYW5jZWwoKTtcbiAgICAgICAgY29uc3QgcCA9IF8uX3Bvb2w7XG4gICAgICAgIF8uX3Bvb2wgPSBbXTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IGZvciB0b0FycmF5QW5kQ2xlYXIoKTtcbiAgICAgKi9cbiAgICBkdW1wKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b0FycmF5QW5kQ2xlYXIoKTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fZ2VuZXJhdG9yID0gbnVsbDtcbiAgICAgICAgXy5fcmVjeWNsZXIgPSBudWxsO1xuICAgICAgICBkaXNwb3NlKF8uX3RyaW1tZXIsIF8uX2ZsdXNoZXIsIF8uX2F1dG9GbHVzaGVyKTtcbiAgICAgICAgXy5fdHJpbW1lciA9IG51bGw7XG4gICAgICAgIF8uX2ZsdXNoZXIgPSBudWxsO1xuICAgICAgICBfLl9hdXRvRmx1c2hlciA9IG51bGw7XG4gICAgICAgIF8uX3Bvb2wubGVuZ3RoID0gMDtcbiAgICAgICAgXy5fcG9vbCA9IG51bGw7XG4gICAgfVxuICAgIGV4dGVuZEF1dG9DbGVhcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHQgPSBfLmF1dG9DbGVhclRpbWVvdXQ7XG4gICAgICAgIGlmIChpc0Zpbml0ZSh0KSAmJiAhXy5fYXV0b0ZsdXNoZXIuaXNTY2hlZHVsZWQpXG4gICAgICAgICAgICBfLl9hdXRvRmx1c2hlci5zdGFydCh0KTtcbiAgICB9XG4gICAgYWRkKG8pIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmIChfLl9wb29sLmxlbmd0aCA+PSBfLl9sb2NhbEFic01heFNpemUpIHtcbiAgICAgICAgICAgIC8vIEdldHRpbmcgdG9vIGJpZywgZGlzcG9zZSBpbW1lZGlhdGVseS4uLlxuICAgICAgICAgICAgZGlzcG9zZShvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChfLl9yZWN5Y2xlcilcbiAgICAgICAgICAgICAgICBfLl9yZWN5Y2xlcihvKTtcbiAgICAgICAgICAgIF8uX3Bvb2wucHVzaChvKTtcbiAgICAgICAgICAgIGNvbnN0IG0gPSBfLl9tYXhTaXplO1xuICAgICAgICAgICAgaWYgKG0gPCBBQlNPTFVURV9NQVhfU0laRSAmJiBfLl9wb29sLmxlbmd0aCA+IG0pXG4gICAgICAgICAgICAgICAgXy5fdHJpbW1lci5zdGFydCg1MDApO1xuICAgICAgICB9XG4gICAgICAgIF8uZXh0ZW5kQXV0b0NsZWFyKCk7XG4gICAgfVxuICAgIF9vblRha2VuKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcywgbGVuID0gXy5fcG9vbC5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPD0gXy5fbWF4U2l6ZSlcbiAgICAgICAgICAgIF8uX3RyaW1tZXIuY2FuY2VsKCk7XG4gICAgICAgIGlmIChsZW4pXG4gICAgICAgICAgICBfLmV4dGVuZEF1dG9DbGVhcigpO1xuICAgIH1cbiAgICB0cnlUYWtlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBfLl9wb29sLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fb25UYWtlbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRha2UoZmFjdG9yeSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFfLl9nZW5lcmF0b3IgJiYgIWZhY3RvcnkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oJ2ZhY3RvcnknLCBcIk11c3QgcHJvdmlkZSBhIGZhY3RvcnkgaWYgb24gd2FzIG5vdCBwcm92aWRlZCBhdCBjb25zdHJ1Y3Rpb24gdGltZS5cIik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gXy5fcG9vbC5wb3AoKSB8fCBmYWN0b3J5ICYmIGZhY3RvcnkoKSB8fCBfLl9nZW5lcmF0b3IoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX29uVGFrZW4oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE9iamVjdFBvb2w7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYmplY3RQb29sLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRGlzcG9zYWJsZS9PYmplY3RQb29sLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBTeXN0ZW1FeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9TeXN0ZW1FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbiBleHRlbmRzIFN5c3RlbUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlIHx8IFwiVW5zdXBwb3J0ZWQgZW51bWVyYWJsZS5cIik7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL1Vuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgU2ltcGxlRW51bWVyYWJsZUJhc2UgfSBmcm9tIFwiLi9TaW1wbGVFbnVtZXJhYmxlQmFzZVwiO1xuLyoqXG4gKiBBIHNpbXBsaWZpZWQgc3RyaXBwZWQgZG93biBlbnVtZXJhdG9yIHRoYXQgdW50aWwgZGlzcG9zZWQgd2lsbCBpbmZpbml0ZWx5IHJldHVybiB0aGUgcHJvdmlkZWQgZmFjdG9yeS5cbiAqIFRoaXMgaXMgYW5hbG9nb3VzIHRvIGEgJ2dlbmVyYXRvcicgYW5kIGhhcyBhIGNvbXBhdGlibGUgaW50ZXJmYWNlLlxuICovXG5leHBvcnQgY2xhc3MgSW5maW5pdGVFbnVtZXJhdG9yIGV4dGVuZHMgU2ltcGxlRW51bWVyYWJsZUJhc2Uge1xuICAgIC8qKlxuICAgICAqIFNlZSBJbmZpbml0ZVZhbHVlRmFjdG9yeVxuICAgICAqIEBwYXJhbSBfZmFjdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKF9mYWN0b3J5KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2ZhY3RvcnkgPSBfZmFjdG9yeTtcbiAgICB9XG4gICAgX2Nhbk1vdmVOZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmFjdG9yeSAhPSBudWxsO1xuICAgIH1cbiAgICBtb3ZlTmV4dCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGYgPSBfLl9mYWN0b3J5O1xuICAgICAgICBpZiAoZikge1xuICAgICAgICAgICAgXy5fY3VycmVudCA9IGYoXy5fY3VycmVudCwgXy5pbmNyZW1lbnRJbmRleCgpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9mYWN0b3J5ID0gbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJbmZpbml0ZUVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbmZpbml0ZUVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JbmZpbml0ZUVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IEl0ZXJhdG9yUmVzdWx0IH0gZnJvbSBcIi4vSXRlcmF0b3JSZXN1bHRcIjtcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuZXhwb3J0IGNsYXNzIFNpbXBsZUVudW1lcmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBnZXQgY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gICAgfVxuICAgIGdldCBjYW5Nb3ZlTmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nhbk1vdmVOZXh0KCk7XG4gICAgfVxuICAgIHRyeU1vdmVOZXh0KG91dCkge1xuICAgICAgICBpZiAodGhpcy5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBvdXQodGhpcy5fY3VycmVudCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGluY3JlbWVudEluZGV4KCkge1xuICAgICAgICBsZXQgaSA9IHRoaXMuX2luZGV4O1xuICAgICAgICB0aGlzLl9pbmRleCA9IGkgPSBpc05hTihpKSA/IDAgOiAoaSArIDEpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgbmV4dFZhbHVlKCkge1xuICAgICAgICB0aGlzLm1vdmVOZXh0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICAgIH1cbiAgICBuZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlTmV4dCgpXG4gICAgICAgICAgICA/IG5ldyBJdGVyYXRvclJlc3VsdCh0aGlzLl9jdXJyZW50LCB0aGlzLl9pbmRleClcbiAgICAgICAgICAgIDogSXRlcmF0b3JSZXN1bHQuRG9uZTtcbiAgICB9XG4gICAgZW5kKCkge1xuICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgJ3JldHVybicodmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSAhPT0gVk9JRDAgJiYgdGhpcy5fY2FuTW92ZU5leHQoKVxuICAgICAgICAgICAgICAgID8gbmV3IEl0ZXJhdG9yUmVzdWx0KHZhbHVlLCBWT0lEMCwgdHJ1ZSlcbiAgICAgICAgICAgICAgICA6IEl0ZXJhdG9yUmVzdWx0LkRvbmU7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IFZPSUQwO1xuICAgICAgICB0aGlzLl9pbmRleCA9IE5hTjtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBnZXRJc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW5Nb3ZlTmV4dCgpO1xuICAgIH1cbiAgICBnZXQgaXNFbmRsZXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJc0VuZGxlc3MoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBTaW1wbGVFbnVtZXJhYmxlQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNpbXBsZUVudW1lcmFibGVCYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vU2ltcGxlRW51bWVyYWJsZUJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IEl0ZXJhdG9yUmVzdWx0IH0gZnJvbSBcIi4vSXRlcmF0b3JSZXN1bHRcIjtcbmltcG9ydCB7IEZ1bmN0aW9ucyB9IGZyb20gXCIuLi8uLi9GdW5jdGlvbnNcIjtcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuLyoqXG4gKiBBIHNpbXBsaWZpZWQgc3RyaXBwZWQgZG93biBlbnVtZXJhYmxlIHRoYXQgaXMgYWx3YXlzIGNvbXBsZXRlIGFuZCBoYXMgbm8gcmVzdWx0cy5cbiAqIEZyb3plbiBhbmQgZXhwb3J0ZWQgYXMgJ2VtcHR5JyB0byBhbGxvdyBmb3IgcmV1c2UuXG4gKi9cbmV4cG9ydCBjb25zdCBFbXB0eUVudW1lcmF0b3IgPSBPYmplY3QuZnJlZXplKHtcbiAgICBjdXJyZW50OiBWT0lEMCxcbiAgICBtb3ZlTmV4dDogRnVuY3Rpb25zLkZhbHNlLFxuICAgIHRyeU1vdmVOZXh0OiBGdW5jdGlvbnMuRmFsc2UsXG4gICAgbmV4dFZhbHVlOiBGdW5jdGlvbnMuQmxhbmssXG4gICAgbmV4dDogSXRlcmF0b3JSZXN1bHQuR2V0RG9uZSxcbiAgICBcInJldHVyblwiOiBJdGVyYXRvclJlc3VsdC5HZXREb25lLFxuICAgIGVuZDogRnVuY3Rpb25zLkJsYW5rLFxuICAgIHJlc2V0OiBGdW5jdGlvbnMuQmxhbmssXG4gICAgZGlzcG9zZTogRnVuY3Rpb25zLkJsYW5rLFxuICAgIGlzRW5kbGVzczogZmFsc2Vcbn0pO1xuZXhwb3J0IGRlZmF1bHQgRW1wdHlFbnVtZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW1wdHlFbnVtZXJhdG9yLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW1wdHlFbnVtZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB9IGZyb20gXCIuL1NpbXBsZUVudW1lcmFibGVCYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbi8qKlxuICogQSBzaW1wbGlmaWVkIHN0cmlwcGVkIGRvd24gZW51bWVyYXRvciB0aGF0IHVudGlsIGRpc3Bvc2VkIHdpbGwgaW5maW5pdGVseSByZXR1cm4gdGhlIHByb3ZpZGVkIGZhY3RvcnkuXG4gKiBUaGlzIGlzIGFuYWxvZ291cyB0byBhICdnZW5lcmF0b3InIGFuZCBoYXMgYSBjb21wYXRpYmxlIGludGVyZmFjZS5cbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgSXRlcmF0b3JFbnVtZXJhdG9yIGV4dGVuZHMgU2ltcGxlRW51bWVyYWJsZUJhc2Uge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBfaXRlcmF0b3JcbiAgICAgKiBAcGFyYW0gX2lzRW5kbGVzcyB0cnVlIGFuZCBmYWxzZSBhcmUgZXhwbGljaXQgd2hlcmUgYXMgdW5kZWZpbmVkIG1lYW5zICd1bmtub3duJy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihfaXRlcmF0b3IsIF9pc0VuZGxlc3MpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faXRlcmF0b3IgPSBfaXRlcmF0b3I7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IF9pc0VuZGxlc3M7XG4gICAgfVxuICAgIF9jYW5Nb3ZlTmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZXJhdG9yICE9IG51bGw7XG4gICAgfVxuICAgIG1vdmVOZXh0KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpID0gXy5faXRlcmF0b3I7XG4gICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICBjb25zdCByID0gYXJndW1lbnRzLmxlbmd0aCA/IGkubmV4dCh2YWx1ZSkgOiBpLm5leHQoKTtcbiAgICAgICAgICAgIF8uX2N1cnJlbnQgPSByLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHIuZG9uZSlcbiAgICAgICAgICAgICAgICBfLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5faXRlcmF0b3IgPSBudWxsO1xuICAgIH1cbiAgICBnZXRJc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuX2lzRW5kbGVzcykgJiYgc3VwZXIuZ2V0SXNFbmRsZXNzKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgSXRlcmF0b3JFbnVtZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SXRlcmF0b3JFbnVtZXJhdG9yLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSXRlcmF0b3JFbnVtZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6aW1wb3J0LW5hbWVcclxuaW1wb3J0IEVudW1lcmFibGUsIHsgTGlucUVudW1lcmFibGUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtLkxpbnEvTGlucSc7XHJcbmltcG9ydCB7IE5hbWVkTm9kZSB9IGZyb20gJy4vTmFtZWROb2RlJztcclxuY2xhc3MgU3RhcnR1cCB7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgKmdlbmVyYXRvcigpOkl0ZXJhYmxlSXRlcmF0b3I8bnVtYmVyPiB7XHJcbiAgICB5aWVsZCAxMDtcclxuICAgIHlpZWxkIDIwO1xyXG4gICAgeWllbGQgMzA7XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgbWFpbigpOiBudW1iZXIge1xyXG4gICAgY29uc3QgYXJyID0gU3RhcnR1cC5nZW5lcmF0b3IoKTtcclxuICAgIGNvbnN0IGVudTpMaW5xRW51bWVyYWJsZTxudW1iZXI+ID0gRW51bWVyYWJsZS5mcm9tQW55KGFycik7XHJcbiAgICBsZXQgdjpudW1iZXIgPSAxMDA7XHJcbiAgICBlbnUuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgKyt2O1xyXG4gICAgICBjb25zb2xlLmxvZyh4ICsgdik7XHJcbiAgICB9KTtcclxuICAgXHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcbn1cclxuXHJcblN0YXJ0dXAubWFpbigpO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL2FwcC50cyIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogT3JpZ2luYWw6IGh0dHA6Ly9saW5xanMuY29kZXBsZXguY29tL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGFyZUVxdWFsIGFzIGFyZUVxdWFsVmFsdWVzLCBjb21wYXJlIGFzIGNvbXBhcmVWYWx1ZXMgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbXBhcmVcIjtcbmltcG9ydCB7IGNvcHkgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L2NvcHlcIjtcbmltcG9ydCAqIGFzIEFycmF5cyBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L0NvbXBhcmVcIjtcbmltcG9ydCAqIGFzIGVudW1VdGlsIGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgaXNFbnVtZXJhYmxlLCBpc0VudW1lcmF0b3IsIGlzSXRlcmF0b3IsIHRocm93SWZFbmRsZXNzIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBFbXB0eUVudW1lcmF0b3IgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VtcHR5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9TeXN0ZW0vVHlwZXNcIjtcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi4vU3lzdGVtL0ludGVnZXJcIjtcbmltcG9ydCB7IEZ1bmN0aW9ucyBhcyBCYXNlRnVuY3Rpb25zIH0gZnJvbSBcIi4uL1N5c3RlbS9GdW5jdGlvbnNcIjtcbmltcG9ydCB7IEFycmF5RW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vQXJyYXlFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IERpY3Rpb25hcnkgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9EaWN0aW9uYXJ5XCI7XG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvUXVldWVcIjtcbmltcG9ydCB7IGRpc3Bvc2UsIHVzaW5nIH0gZnJvbSBcIi4uL1N5c3RlbS9EaXNwb3NhYmxlL2Rpc3Bvc2VcIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uL1N5c3RlbS9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24gfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL1Vuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gfSBmcm9tIFwiLi4vU3lzdGVtL0Rpc3Bvc2FibGUvT2JqZWN0RGlzcG9zZWRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEtleVNvcnRlZENvbnRleHQgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL1NvcnRpbmcvS2V5U29ydGVkQ29udGV4dFwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgSW5kZXhFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JbmRleEVudW1lcmF0b3JcIjtcbmltcG9ydCB7IEl0ZXJhdG9yRW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSXRlcmF0b3JFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vU3lzdGVtL1JhbmRvbVwiO1xuaW1wb3J0IHsgSW5maW5pdGVFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JbmZpbml0ZUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IExhenlMaXN0IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9MYXp5TGlzdFwiO1xudmFyIGRpc3Bvc2VTaW5nbGUgPSBkaXNwb3NlLnNpbmdsZTtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLy8gI3JlZ2lvbiBMb2NhbCBDb25zdGFudHMuXG5jb25zdCBJTlZBTElEX0RFRkFVTFQgPSB7fTsgLy8gY3JlYXRlIGEgcHJpdmF0ZSB1bmlxdWUgaW5zdGFuY2UgZm9yIHJlZmVyZW5jaW5nLlxuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5jb25zdCBOVUxMID0gbnVsbDtcbmZ1bmN0aW9uIEJSRUFLKCkge1xuICAgIHJldHVybiAwIC8qIEJyZWFrICovO1xufVxuZnVuY3Rpb24gUkVUVVJOKCkge1xuICAgIHJldHVybiAxIC8qIFJldHVybiAqLztcbn1cbmZ1bmN0aW9uIGlzTm90TnVsbE9yVW5kZWZpbmVkKGUpIHtcbiAgICByZXR1cm4gZSAhPSBudWxsO1xufVxuLy8gTGVhdmUgaW50ZXJuYWwgdG8gYXZvaWQgYWNjaWRlbnRhbCBvdmVyd3JpdGluZy5cbmNsYXNzIExpbnFGdW5jdGlvbnMgZXh0ZW5kcyBCYXNlRnVuY3Rpb25zIHtcbiAgICAvLyBub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIEdyZWF0ZXIoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA+IGIgPyBhIDogYjtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICBMZXNzZXIoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA8IGIgPyBhIDogYjtcbiAgICB9XG59XG5jb25zdCBGdW5jdGlvbnMgPSBPYmplY3QuZnJlZXplKG5ldyBMaW5xRnVuY3Rpb25zKCkpO1xuLy8gRm9yIHJlLXVzZSBhcyBhIGZhY3RvcnkuXG5mdW5jdGlvbiBnZXRFbXB0eUVudW1lcmF0b3IoKSB7XG4gICAgcmV0dXJuIEVtcHR5RW51bWVyYXRvcjtcbn1cbi8vICNlbmRyZWdpb25cbi8qXG4gKiBOT1RFOiBBYm91dCBJbmZpbml0ZUVudW1lcmFibGU8VD4gYW5kIEVudW1lcmFibGU8VD4uXG4gKiBUaGVyZSBtYXkgc2VlbSBsaWtlIHRoZXJlJ3MgZXh0cmEgb3ZlcnJpZGVzIGhlcmUgYW5kIHRoZXkgbWF5IHNlZW0gdW5uZWNlc3NhcnkuXG4gKiBCdXQgYWZ0ZXIgY2xvc2VyIGluc3BlY3Rpb24geW91J2xsIHNlZSB0aGUgdHlwZSBjaGFpbiBpcyByZXRhaW5lZCBhbmRcbiAqIGluZmluaXRlIGVudW1lcmFibGVzIGFyZSBwcmV2ZW50ZWQgZnJvbSBoYXZpbmcgZmVhdHVyZXMgdGhhdCBmaW5pdGUgb25lcyBoYXZlLlxuICpcbiAqIEknbSBub3Qgc3VyZSBpZiBpdCdzIHRoZSBiZXN0IG9wdGlvbiB0byBqdXN0IHVzZSBvdmVycmlkZXMsIGJ1dCBpdCBob25vcnMgdGhlIHR5cGluZyBwcm9wZXJseS5cbiAqL1xuZXhwb3J0IGNsYXNzIEluZmluaXRlTGlucUVudW1lcmFibGUgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX2VudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIpIHtcbiAgICAgICAgc3VwZXIoZmluYWxpemVyKTtcbiAgICAgICAgdGhpcy5fZW51bWVyYXRvckZhY3RvcnkgPSBfZW51bWVyYXRvckZhY3Rvcnk7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IHRydWU7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJJbmZpbml0ZUxpbnFFbnVtZXJhYmxlXCI7XG4gICAgfVxuICAgIGdldCBpc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VuZGxlc3M7XG4gICAgfVxuICAgIC8vICNyZWdpb24gSUVudW1lcmFibGU8VD4gSW1wbGVtZW50YXRpb24uLi5cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZW51bWVyYXRvckZhY3RvcnkoKTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIC8vICNyZWdpb24gSURpc3Bvc2FibGUgb3ZlcnJpZGUuLi5cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7IC8vIEp1c3QgaW4gY2FzZS5cbiAgICAgICAgdGhpcy5fZW51bWVyYXRvckZhY3RvcnkgPSBudWxsO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgLy8gUmV0dXJuIGEgZGVmYXVsdCAodW5maWx0ZXJlZCkgZW51bWVyYWJsZS5cbiAgICBhc0VudW1lcmFibGUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4gXy5nZXRFbnVtZXJhdG9yKCkpO1xuICAgIH1cbiAgICBkb0FjdGlvbihhY3Rpb24sIGluaXRpYWxpemVyLCBpc0VuZGxlc3MgPSB0aGlzLmlzRW5kbGVzcywgb25Db21wbGV0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFID0gaXNFbmRsZXNzIHx8IHVuZGVmaW5lZDsgLy8gSW4gY2FzZSBpdCdzIG51bGwuXG4gICAgICAgIGlmICghYWN0aW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImFjdGlvblwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWFjdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYWxpemVyKVxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplcigpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgLy8gTWF5IG5lZWQgYSB3YXkgdG8gcHJvcGFnYXRlIGlzRW5kbGVzc1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWFjdGlvbik7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvblJlc3VsdCA9IGFjdGlvbihjLCBpbmRleCsrKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvblJlc3VsdCA9PT0gZmFsc2UgfHwgYWN0aW9uUmVzdWx0ID09PSAwIC8qIEJyZWFrICovKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uUmVzdWx0ICE9PSAyIC8qIFNraXAgKi8pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgYWN0aW9uUmVzdWx0PT09MiwgdGhlbiBhIHNpZ25hbCBmb3Igc2tpcCBpcyByZWNlaXZlZC5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9uQ29tcGxldGUpXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoaW5kZXgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9LCBpc0UpO1xuICAgICAgICB9LCBcbiAgICAgICAgLy8gVXNpbmcgYSBmaW5hbGl6ZXIgdmFsdWUgcmVkdWNlcyB0aGUgY2hhbmNlIG9mIGEgY2lyY3VsYXIgcmVmZXJlbmNlXG4gICAgICAgIC8vIHNpbmNlIHdlIGNvdWxkIHNpbXBseSByZWZlcmVuY2UgdGhlIGVudW1lcmF0aW9uIGFuZCBjaGVjayBlLndhc0Rpc3Bvc2VkLlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBhY3Rpb24gPSBOVUxMO1xuICAgICAgICB9LCBpc0UpO1xuICAgIH1cbiAgICBmb3JjZSgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhpcy5kb0FjdGlvbihCUkVBSylcbiAgICAgICAgICAgIC5nZXRFbnVtZXJhdG9yKClcbiAgICAgICAgICAgIC5tb3ZlTmV4dCgpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIEluZGV4aW5nL1BhZ2luZyBtZXRob2RzLlxuICAgIHNraXAoY291bnQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKGdldEVtcHR5RW51bWVyYXRvcik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICByZXR1cm4gdGhpcy53aGVyZSgoZWxlbWVudCwgaW5kZXgpID0+IGluZGV4ID49IGNvdW50KTtcbiAgICB9XG4gICAgdGFrZShjb3VudCkge1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignY291bnQnLCBjb3VudCwgJ011c3QgYmUgZmluaXRlLicpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgLy8gT25jZSBhY3Rpb24gcmV0dXJucyBmYWxzZSwgdGhlIGVudW1lcmF0aW9uIHdpbGwgc3RvcC5cbiAgICAgICAgcmV0dXJuIF8uZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiBpbmRleCA8IGNvdW50LCBudWxsLCBmYWxzZSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gU2luZ2xlIFZhbHVlIFJldHVybi4uLlxuICAgIGVsZW1lbnRBdChpbmRleCkge1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5lbGVtZW50QXRPckRlZmF1bHQoaW5kZXgsIElOVkFMSURfREVGQVVMVCk7XG4gICAgICAgIGlmICh2ID09PSBJTlZBTElEX0RFRkFVTFQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdpbmRleCcsIGluZGV4LCBcImlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHNvdXJjZVwiKTtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICAgIGVsZW1lbnRBdE9yRGVmYXVsdChpbmRleCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgsICdpbmRleCcpO1xuICAgICAgICBjb25zdCBuID0gaW5kZXg7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gbilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUuY3VycmVudDtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyogTm90ZTogVW5saWtlIHByZXZpb3VzIGltcGxlbWVudGF0aW9ucywgeW91IGNvdWxkIHBhc3MgYSBwcmVkaWNhdGUgaW50byB0aGVzZSBtZXRob2RzLlxuICAgICAqIEJ1dCBzaW5jZSB1bmRlciB0aGUgaG9vZCBpdCBlbmRzIHVwIGNhbGxpbmcgLndoZXJlKHByZWRpY2F0ZSkgYW55d2F5LFxuICAgICAqIGl0IG1heSBiZSBiZXR0ZXIgdG8gcmVtb3ZlIHRoaXMgdG8gYWxsb3cgZm9yIGEgY2xlYW5lciBzaWduYXR1cmUvb3ZlcnJpZGUuXG4gICAgICogSmF2YVNjcmlwdC9UeXBlU2NyaXB0IGRvZXMgbm90IGVhc2lseSBhbGxvdyBmb3IgYSBzdHJpY3QgbWV0aG9kIGludGVyZmFjZSBsaWtlIEMjLlxuICAgICAqIEhhdmluZyB0byB3cml0ZSBleHRyYSBvdmVycmlkZSBsb2dpYyBpcyBlcnJvciBwcm9uZSBhbmQgY29uZnVzaW5nIHRvIHRoZSBjb25zdW1lci5cbiAgICAgKiBSZW1vdmluZyB0aGUgcHJlZGljYXRlIGhlcmUgbWF5IGFsc28gY2F1c2UgdGhlIGNvbnN1bWVyIG9mIHRoaXMgbWV0aG9kIHRvIHRoaW5rIG1vcmUgYWJvdXQgaG93IHRoZXkgc3RydWN0dXJlIHRoZWlyIHF1ZXJ5LlxuICAgICAqIFRoZSBlbmQgYWxsIGRpZmZlcmVuY2UgaXMgdGhhdCB0aGUgdXNlciBtdXN0IGRlY2xhcmUgLndoZXJlKHByZWRpY2F0ZSkgYmVmb3JlIC5maXJzdCgpLCAuc2luZ2xlKCksIG9yIC5sYXN0KCkuXG4gICAgICogT3RoZXJ3aXNlIHRoZXJlIHdvdWxkIG5lZWQgdG8gYmUgbXVjaCBtb3JlIGNvZGUgdG8gaGFuZGxlIHRoZXNlIGNhc2VzICguZmlyc3QocHJlZGljYXRlKSwgZXRjKTtcbiAgICAgKiAqL1xuICAgIGZpcnN0KCkge1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5maXJzdE9yRGVmYXVsdChJTlZBTElEX0RFRkFVTFQpO1xuICAgICAgICBpZiAodiA9PT0gSU5WQUxJRF9ERUZBVUxUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZmlyc3Q6VGhlIHNlcXVlbmNlIGlzIGVtcHR5LlwiKTtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICAgIGZpcnN0T3JEZWZhdWx0KGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlID0+IGUubW92ZU5leHQoKSA/IGUuY3VycmVudCA6IGRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuICAgIHNpbmdsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZS5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmICghZS5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2luZ2xlOnNlcXVlbmNlIGNvbnRhaW5zIG1vcmUgdGhhbiBvbmUgZWxlbWVudC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzaW5nbGU6VGhlIHNlcXVlbmNlIGlzIGVtcHR5LlwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpbmdsZU9yRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZS5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmICghZS5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYW55KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlID0+IGUubW92ZU5leHQoKSk7XG4gICAgfVxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5hbnkoKTtcbiAgICB9XG4gICAgdHJhdmVyc2VEZXB0aEZpcnN0KGNoaWxkcmVuU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzOyAvLyBJcyBlbmRsZXNzIGlzIG5vdCBhZmZpcm1hdGl2ZSBpZiBmYWxzZS5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBEZXYgTm90ZTogTWF5IHdhbnQgdG8gY29uc2lkZXIgdXNpbmcgYW4gYWN0dWFsIHN0YWNrIGFuZCBub3QgYW4gYXJyYXkuXG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvclN0YWNrO1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbGVuOyAvLyBBdm9pZCB1c2luZyBwdXNoL3BvcCBzaW5jZSB0aGV5IHF1ZXJ5IC5sZW5ndGggZXZlcnkgdGltZSBhbmQgY2FuIGJlIHNsb3dlci5cbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFjayA9IFtdO1xuICAgICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcmVzdWx0U2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBsZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvclN0YWNrW2xlbisrXSA9IGVudW1lcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IGNoaWxkcmVuU2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlID0gIVR5cGUuaXNTdHJpbmcoYykgJiYgRW51bWVyYWJsZS5mcm9tQW55KGMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IGUgPyBlLmdldEVudW1lcmF0b3IoKSA6IEVtcHR5RW51bWVyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobGVuID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gZW51bWVyYXRvclN0YWNrWy0tbGVuXTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvclN0YWNrLmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yU3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3Bvc2UudGhlc2Uubm9Db3B5KGVudW1lcmF0b3JTdGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yU3RhY2subGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFjayA9IE5VTEw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGZsYXR0ZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1hbnkoZW50cnkgPT4ge1xuICAgICAgICAgICAgbGV0IGUgPSAhVHlwZS5pc1N0cmluZyhlbnRyeSkgJiYgRW51bWVyYWJsZS5mcm9tQW55KGVudHJ5KTtcbiAgICAgICAgICAgIHJldHVybiBlID8gZS5mbGF0dGVuKCkgOiBbZW50cnldO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcGFpcndpc2Uoc2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghc2VsZWN0b3IpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic2VsZWN0b3JcIik7XG4gICAgICAgIGxldCBwcmV2aW91cztcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0KCh2YWx1ZSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gaSA/IHNlbGVjdG9yKHByZXZpb3VzLCB2YWx1ZSwgaSkgOiBOVUxMO1xuICAgICAgICAgICAgcHJldmlvdXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pLnNraXAoMSk7XG4gICAgfVxuICAgIHNjYW4oZnVuYywgc2VlZCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFmdW5jKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImZ1bmNcIik7XG4gICAgICAgIHJldHVybiAoc2VlZCA9PT0gVk9JRDBcbiAgICAgICAgICAgID8gdGhpcy5zZWxlY3QoKHZhbHVlLCBpKSA9PiBzZWVkID0gaSA/IGZ1bmMoc2VlZCwgdmFsdWUsIGkpIDogdmFsdWUpXG4gICAgICAgICAgICA6IHRoaXMuc2VsZWN0KCh2YWx1ZSwgaSkgPT4gc2VlZCA9IGZ1bmMoc2VlZCwgdmFsdWUsIGkpKSk7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICBzZWxlY3Qoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgbWFwKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChzZWxlY3Rvcik7XG4gICAgfVxuICAgIC8qXG4gICAgcHVibGljIHN0YXRpYyBJRW51bWVyYWJsZTxUUmVzdWx0PiBTZWxlY3RNYW55PFRTb3VyY2UsIFRDb2xsZWN0aW9uLCBUUmVzdWx0PihcbiAgICAgICAgdGhpcyBJRW51bWVyYWJsZTxUU291cmNlPiBzb3VyY2UsXG4gICAgICAgIEZ1bmM8VFNvdXJjZSzigIJJRW51bWVyYWJsZTxUQ29sbGVjdGlvbj4+IGNvbGxlY3Rpb25TZWxlY3RvcixcbiAgICAgICAgRnVuYzxUU291cmNlLOKAglRDb2xsZWN0aW9uLOKAglRSZXN1bHQ+IHJlc3VsdFNlbGVjdG9yKVxuICAgICAqL1xuICAgIF9zZWxlY3RNYW55KGNvbGxlY3Rpb25TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghY29sbGVjdGlvblNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImNvbGxlY3Rpb25TZWxlY3RvclwiKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzOyAvLyBEbyBzZWNvbmQgZW51bWVyYXRpb24sIGl0IHdpbGwgYmUgaW5kZXRlcm1pbmF0ZSBpZiBmYWxzZS5cbiAgICAgICAgaWYgKCFyZXN1bHRTZWxlY3RvcilcbiAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yID0gKGEsIGIpID0+IGI7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbWlkZGxlRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWNvbGxlY3Rpb25TZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIG1pZGRsZUVudW1lcmF0b3IgPSBWT0lEMDtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghY29sbGVjdGlvblNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAvLyBKdXN0IHN0YXJ0ZWQsIGFuZCBub3RoaW5nIHRvIGVudW1lcmF0ZT8gRW5kLlxuICAgICAgICAgICAgICAgIGlmIChtaWRkbGVFbnVtZXJhdG9yID09PSBWT0lEMCAmJiAhZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gbW92ZU5leHQgaGFzIGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2UuLi5cbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgbWlkZGxlIGlmIHRoZXJlIGlzbid0IG9uZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtaWRkbGVFbnVtZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWlkZGxlU2VxID0gY29sbGVjdGlvblNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgaW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb2xsZWN0aW9uIGlzIG51bGw/ICBTa2lwIGl0Li4uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1pZGRsZVNlcSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pZGRsZUVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKG1pZGRsZVNlcSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pZGRsZUVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgbWlkZGxlRW51bWVyYXRvci5jdXJyZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVsc2Ugbm8gbW9yZSBpbiB0aGlzIG1pZGRsZT8gIFRoZW4gY2xlYXIgYW5kIHJlc2V0IGZvciBuZXh0Li4uXG4gICAgICAgICAgICAgICAgICAgIG1pZGRsZUVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZGlzcG9zZVNpbmdsZShtaWRkbGVFbnVtZXJhdG9yKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb25TZWxlY3RvciA9IE5VTEw7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIHNlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKTtcbiAgICB9XG4gICAgX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5LCBmaWx0ZXIpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlbGVjdG9yXCIpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBzZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIGkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbHRlciB8fCBmaWx0ZXIocmVzdWx0LCBpKyspKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH0sIF8uX2lzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIH0sIF8uX2lzRW5kbGVzcyk7XG4gICAgfVxuICAgIGNob29zZShzZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoc2VsZWN0b3IsIGlzTm90TnVsbE9yVW5kZWZpbmVkKTtcbiAgICB9XG4gICAgd2hlcmUocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChGdW5jdGlvbnMuSWRlbnRpdHksIHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIGZpbHRlcihwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKEZ1bmN0aW9ucy5JZGVudGl0eSwgcHJlZGljYXRlKTtcbiAgICB9XG4gICAgbm9uTnVsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2hlcmUodiA9PiB2ICE9IG51bGwgJiYgdiAhPSBWT0lEMCk7XG4gICAgfVxuICAgIG9mVHlwZSh0eXBlKSB7XG4gICAgICAgIGxldCB0eXBlTmFtZTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgICAgICAgICB0eXBlTmFtZSA9IFR5cGUuTlVNQkVSO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTdHJpbmc6XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLlNUUklORztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQm9vbGVhbjpcbiAgICAgICAgICAgICAgICB0eXBlTmFtZSA9IFR5cGUuQk9PTEVBTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRnVuY3Rpb246XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLkZVTkNUSU9OO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICAgICAgICAgICAgICAud2hlcmUoeCA9PiB4IGluc3RhbmNlb2YgdHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgIC53aGVyZSh4ID0+IGlzTm90TnVsbE9yVW5kZWZpbmVkKHgpICYmIHR5cGVvZiB4ID09PSB0eXBlTmFtZSk7XG4gICAgfVxuICAgIGV4Y2VwdChzZWNvbmQsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBrZXlzO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAga2V5cyA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZClcbiAgICAgICAgICAgICAgICAgICAgZW51bVV0aWwuZm9yRWFjaChzZWNvbmQsIGtleSA9PiB7IGtleXMuYWRkQnlLZXlWYWx1ZShrZXksIHRydWUpOyB9KTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWtleXMuY29udGFpbnNLZXkoY3VycmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMuYWRkQnlLZXlWYWx1ZShjdXJyZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAga2V5cy5jbGVhcigpO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBkaXN0aW5jdChjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjZXB0KE5VTEwsIGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgfVxuICAgIC8vIFswLDAsMCwxLDEsMSwyLDIsMiwwLDAsMCwxLDFdIHJlc3VsdHMgaW4gWzAsMSwyLDAsMV07XG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGNvbXBhcmVLZXk7XG4gICAgICAgICAgICBsZXQgaW5pdGlhbCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBjb21wYXJlU2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlS2V5LCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb21wYXJlS2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc2luZ2xlIGRlZmF1bHQgdmFsdWUgaWYgZW1wdHkuXG4gICAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZVxuICAgICAqIEByZXR1cm5zIHtFbnVtZXJhYmxlfVxuICAgICAqL1xuICAgIGRlZmF1bHRJZkVtcHR5KGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGlzRmlyc3Q7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNGaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICB6aXAoc2Vjb25kLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlyc3RFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHNlY29uZEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKHNlY29uZCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4gZmlyc3RFbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAmJiBzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGZpcnN0RW51bWVyYXRvci5jdXJyZW50LCBzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQsIGluZGV4KyspKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHppcE11bHRpcGxlKHNlY29uZCwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghc2Vjb25kLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlY29uZFRlbXA7XG4gICAgICAgICAgICBsZXQgZmlyc3RFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHNlY29uZEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2Vjb25kVGVtcCA9IG5ldyBRdWV1ZShzZWNvbmQpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIXNlY29uZEVudW1lcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kVGVtcC5jb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHNlY29uZFRlbXAuZGVxdWV1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKG5leHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0U2VsZWN0b3IoZmlyc3RFbnVtZXJhdG9yLmN1cnJlbnQsIHNlY29uZEVudW1lcmF0b3IuY3VycmVudCwgaW5kZXgrKykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZFRlbXApXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZFRlbXAuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgc2Vjb25kVGVtcCA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gSm9pbiBNZXRob2RzXG4gICAgam9pbihpbm5lciwgb3V0ZXJLZXlTZWxlY3RvciwgaW5uZXJLZXlTZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IsIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgb3V0ZXJFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGxvb2t1cDtcbiAgICAgICAgICAgIGxldCBpbm5lckVsZW1lbnRzO1xuICAgICAgICAgICAgbGV0IGlubmVyQ291bnQgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0ZXJFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgbG9va3VwID0gRW51bWVyYWJsZS5mcm9tKGlubmVyKVxuICAgICAgICAgICAgICAgICAgICAudG9Mb29rdXAoaW5uZXJLZXlTZWxlY3RvciwgRnVuY3Rpb25zLklkZW50aXR5LCBjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXJFbGVtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlubmVyRWxlbWVudCA9IGlubmVyRWxlbWVudHNbaW5uZXJDb3VudCsrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lckVsZW1lbnQgIT09IFZPSUQwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKG91dGVyRW51bWVyYXRvci5jdXJyZW50LCBpbm5lckVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyRWxlbWVudHMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dGVyRW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gb3V0ZXJLZXlTZWxlY3RvcihvdXRlckVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lckVsZW1lbnRzID0gbG9va3VwLmdldChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvdXRlckVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIG91dGVyRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaW5uZXJFbGVtZW50cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgb3V0ZXJFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBsb29rdXAgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBncm91cEpvaW4oaW5uZXIsIG91dGVyS2V5U2VsZWN0b3IsIGlubmVyS2V5U2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbG9va3VwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGxvb2t1cCA9IEVudW1lcmFibGUuZnJvbShpbm5lcilcbiAgICAgICAgICAgICAgICAgICAgLnRvTG9va3VwKGlubmVyS2V5U2VsZWN0b3IsIEZ1bmN0aW9ucy5JZGVudGl0eSwgY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiBlbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgbG9va3VwLmdldChvdXRlcktleVNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCkpKSksICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgbG9va3VwID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWVyZ2UoZW51bWVyYWJsZXMpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgaWYgKCFlbnVtZXJhYmxlcyB8fCBlbnVtZXJhYmxlcy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHF1ZXVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gMSkgRmlyc3QgZ2V0IG91ciB2YWx1ZXMuLi5cbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSBuZXcgUXVldWUoZW51bWVyYWJsZXMpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWVudW1lcmF0b3IgJiYgcXVldWUudHJ5RGVxdWV1ZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbSh2YWx1ZSk7IC8vIDQpIEtlZXAgZ29pbmcgYW5kIG9uIHRvIHN0ZXAgMi4gIEVsc2UgZmFsbCB0aHJvdWdoIHRvIHlpZWxkQnJlYWsoKS5cbiAgICAgICAgICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvciAmJiBlbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSlcbiAgICAgICAgICAgICAgICAgICAgcXVldWUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGNvbmNhdCguLi5lbnVtZXJhYmxlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXJnZShlbnVtZXJhYmxlcyk7XG4gICAgfVxuICAgIHVuaW9uKHNlY29uZCwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGtleXM7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBrZXlzID0gbmV3IERpY3Rpb25hcnkoY29tcGFyZVNlbGVjdG9yKTsgLy8gQWN0aW5nIGFzIGEgSGFzaFNldC5cbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IgPT09IFZPSUQwKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChmaXJzdEVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGZpcnN0RW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5hZGRCeUtleVZhbHVlKGN1cnJlbnQsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKHNlY29uZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlIChzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHNlY29uZEVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzLmFkZEJ5S2V5VmFsdWUoY3VycmVudCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGluc2VydEF0KGluZGV4LCBvdGhlcikge1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgsICdpbmRleCcpO1xuICAgICAgICBjb25zdCBuID0gaW5kZXg7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgIGxldCBpc0VudW1lcmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShvdGhlcik7XG4gICAgICAgICAgICAgICAgaXNFbnVtZXJhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSBuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzRW51bWVyYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZmlyc3RFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gIWlzRW51bWVyYXRlZFxuICAgICAgICAgICAgICAgICAgICAmJiBzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybihzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBhbHRlcm5hdGVNdWx0aXBsZShzZXF1ZW5jZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBidWZmZXIsIG1vZGUsIGVudW1lcmF0b3IsIGFsdGVybmF0ZUVudW1lcmF0b3I7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBJbnN0ZWFkIG9mIHJlY2FsbGluZyBnZXRFbnVtZXJhdG9yIGV2ZXJ5IHRpbWUsIGp1c3QgcmVzZXQgdGhlIGV4aXN0aW5nIG9uZS5cbiAgICAgICAgICAgICAgICBhbHRlcm5hdGVFbnVtZXJhdG9yID0gbmV3IEFycmF5RW51bWVyYXRvcihFbnVtZXJhYmxlLnRvQXJyYXkoc2VxdWVuY2UpKTsgLy8gRnJlZXplXG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGxldCBoYXNBdExlYXN0T25lID0gZW51bWVyYXRvci5tb3ZlTmV4dCgpO1xuICAgICAgICAgICAgICAgIG1vZGUgPSBoYXNBdExlYXN0T25lXG4gICAgICAgICAgICAgICAgICAgID8gMSAvKiBSZXR1cm4gKi9cbiAgICAgICAgICAgICAgICAgICAgOiAwIC8qIEJyZWFrICovO1xuICAgICAgICAgICAgICAgIGlmIChoYXNBdExlYXN0T25lKVxuICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDAgLyogQnJlYWsgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMiAvKiBTa2lwICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsdGVybmF0ZUVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihhbHRlcm5hdGVFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRlRW51bWVyYXRvci5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDEgLyogUmV0dXJuICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBsYXRlc3QgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgLy8gU2V0IHVwIHRoZSBuZXh0IHJvdW5kLi4uXG4gICAgICAgICAgICAgICAgLy8gSXMgdGhlcmUgYW5vdGhlciBvbmU/ICBTZXQgdGhlIGJ1ZmZlciBhbmQgc2V0dXAgaW5zdHJ1Y3QgZm9yIHRoZSBuZXh0IG9uZSB0byBiZSB0aGUgYWx0ZXJuYXRlLlxuICAgICAgICAgICAgICAgIGxldCBhbm90aGVyID0gZW51bWVyYXRvci5tb3ZlTmV4dCgpO1xuICAgICAgICAgICAgICAgIG1vZGUgPSBhbm90aGVyXG4gICAgICAgICAgICAgICAgICAgID8gMiAvKiBTa2lwICovXG4gICAgICAgICAgICAgICAgICAgIDogMCAvKiBCcmVhayAqLztcbiAgICAgICAgICAgICAgICBpZiAoYW5vdGhlcilcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGxhdGVzdCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChhbHRlcm5hdGVFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdGVFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBhbHRlcm5hdGVFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGFsdGVybmF0ZVNpbmdsZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbHRlcm5hdGVNdWx0aXBsZShFbnVtZXJhYmxlLm1ha2UodmFsdWUpKTtcbiAgICB9XG4gICAgYWx0ZXJuYXRlKC4uLnNlcXVlbmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsdGVybmF0ZU11bHRpcGxlKHNlcXVlbmNlKTtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBFcnJvciBIYW5kbGluZ1xuICAgIGNhdGNoRXJyb3IoaGFuZGxlcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgaW5pdC4uLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluYWxseUFjdGlvbihhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKGVudW1lcmF0b3IuY3VycmVudClcbiAgICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIGJ1ZmZlcihzaXplKSB7XG4gICAgICAgIGlmIChzaXplIDwgMSB8fCAhaXNGaW5pdGUoc2l6ZSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJ1ZmZlciBzaXplLlwiKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoc2l6ZSwgXCJzaXplXCIpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICBsZXQgbGVuO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBpbml0aWFsaXplKHNpemUpO1xuICAgICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGxlbiA8IHNpemUgJiYgZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5W2xlbisrXSA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJyYXkubGVuZ3RoID0gbGVuO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIWxlbiAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKGFycmF5KTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBzaGFyZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBzaGFyZWRFbnVtZXJhdG9yO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaGFyZWRFbnVtZXJhdG9yIHx8IChzaGFyZWRFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCkpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hhcmVkRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICBzaGFyZWRFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHNoYXJlZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICB9LCBfLl9pc0VuZGxlc3MpO1xuICAgIH1cbiAgICBtZW1vaXplKCkge1xuICAgICAgICBsZXQgc291cmNlID0gbmV3IExhenlMaXN0KHRoaXMpO1xuICAgICAgICByZXR1cm4gKG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHNvdXJjZS5nZXRFbnVtZXJhdG9yKCksICgpID0+IHtcbiAgICAgICAgICAgIHNvdXJjZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICBzb3VyY2UgPSBudWxsO1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuLyoqXG4gKiBFbnVtZXJhYmxlPFQ+IGlzIGEgd3JhcHBlciBjbGFzcyB0aGF0IGFsbG93cyBtb3JlIHByaW1pdGl2ZSBlbnVtZXJhYmxlcyB0byBleGhpYml0IExJTlEgYmVoYXZpb3IuXG4gKlxuICogSW4gQyMgRW51bWVyYWJsZTxUPiBpcyBub3QgYW4gaW5zdGFuY2UgYnV0IGhhcyBleHRlbnNpb25zIGZvciBJRW51bWVyYWJsZTxUPi5cbiAqIEluIHRoaXMgY2FzZSwgd2UgdXNlIEVudW1lcmFibGU8VD4gYXMgdGhlIHVuZGVybHlpbmcgY2xhc3MgdGhhdCBpcyBiZWluZyBjaGFpbmVkLlxuICovXG5leHBvcnQgY2xhc3MgTGlucUVudW1lcmFibGUgZXh0ZW5kcyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihlbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyLCBpc0VuZGxlc3MpIHtcbiAgICAgICAgc3VwZXIoZW51bWVyYXRvckZhY3RvcnksIGZpbmFsaXplcik7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGlzRW5kbGVzcztcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIkxpbnFFbnVtZXJhYmxlXCI7XG4gICAgfVxuICAgIC8vIFJldHVybiBhIGRlZmF1bHQgKHVuZmlsdGVyZWQpIGVudW1lcmFibGUuXG4gICAgYXNFbnVtZXJhYmxlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBfLmdldEVudW1lcmF0b3IoKSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gSW5kZXhpbmcvUGFnaW5nIG1ldGhvZHMuXG4gICAgc2tpcFdoaWxlKHByZWRpY2F0ZSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbigoZWxlbWVudCwgaW5kZXgpID0+IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleClcbiAgICAgICAgICAgID8gMiAvKiBTa2lwICovXG4gICAgICAgICAgICA6IDEgLyogUmV0dXJuICovKTtcbiAgICB9XG4gICAgdGFrZVdoaWxlKHByZWRpY2F0ZSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ3ByZWRpY2F0ZScpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbigoZWxlbWVudCwgaW5kZXgpID0+IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleClcbiAgICAgICAgICAgID8gMSAvKiBSZXR1cm4gKi9cbiAgICAgICAgICAgIDogMCAvKiBCcmVhayAqLywgbnVsbCwgbnVsbCAvLyBXZSBkb24ndCBrbm93IHRoZSBzdGF0ZSBpZiBpdCBpcyBlbmRsZXNzIG9yIG5vdC5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgLy8gSXMgbGlrZSB0aGUgaW52ZXJzZSBvZiB0YWtlIFdoaWxlIHdpdGggdGhlIGFiaWxpdHkgdG8gcmV0dXJuIHRoZSB2YWx1ZSBpZGVudGlmaWVkIGJ5IHRoZSBwcmVkaWNhdGUuXG4gICAgdGFrZVVudGlsKHByZWRpY2F0ZSwgaW5jbHVkZVVudGlsVmFsdWUpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdwcmVkaWNhdGUnKTtcbiAgICAgICAgaWYgKCFpbmNsdWRlVW50aWxWYWx1ZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKChlbGVtZW50LCBpbmRleCkgPT4gcHJlZGljYXRlKGVsZW1lbnQsIGluZGV4KVxuICAgICAgICAgICAgICAgID8gMCAvKiBCcmVhayAqL1xuICAgICAgICAgICAgICAgIDogMSAvKiBSZXR1cm4gKi8sIG51bGwsIG51bGwgLy8gV2UgZG9uJ3Qga25vdyB0aGUgc3RhdGUgaWYgaXQgaXMgZW5kbGVzcyBvciBub3QuXG4gICAgICAgICAgICApO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoZm91bmQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAgLyogQnJlYWsgKi87XG4gICAgICAgICAgICBmb3VuZCA9IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleCk7XG4gICAgICAgICAgICByZXR1cm4gMSAvKiBSZXR1cm4gKi87XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgIH0sIG51bGwgLy8gV2UgZG9uJ3Qga25vdyB0aGUgc3RhdGUgaWYgaXQgaXMgZW5kbGVzcyBvciBub3QuXG4gICAgICAgICk7XG4gICAgfVxuICAgIHRyYXZlcnNlQnJlYWR0aEZpcnN0KGNoaWxkcmVuU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzOyAvLyBJcyBlbmRsZXNzIGlzIG5vdCBhZmZpcm1hdGl2ZSBpZiBmYWxzZS5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBuZXN0TGV2ZWwgPSAwO1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciwgbGVuO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgbmVzdExldmVsID0gMDtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltsZW4rK10gPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIG5lc3RMZXZlbCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghbGVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IEVudW1lcmFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mcm9tKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RNYW55KGNoaWxkcmVuU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHQuYW55KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lc3RMZXZlbCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gbmV4dC5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBmb3JFYWNoKGFjdGlvbiwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghYWN0aW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImFjdGlvblwiKTtcbiAgICAgICAgdGhyb3dJZkVuZGxlc3MoXy5pc0VuZGxlc3MpO1xuICAgICAgICAvKlxuICAgICAgICAvLyBJdCBjb3VsZCBiZSBqdXN0IGFzIGVhc3kgdG8gZG8gdGhlIGZvbGxvd2luZzpcbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLmZvckVhY2goXywgYWN0aW9uLCBtYXgpO1xuICAgICAgICAvLyBCdXQgdG8gYmUgbW9yZSBhY3RpdmUgYWJvdXQgY2hlY2tpbmcgZm9yIGRpc3Bvc2FsLCB3ZSB1c2UgdGhpcyBpbnN0ZWFkOlxuICAgICAgICAqL1xuICAgICAgICAvLyBSZXR1cm4gdmFsdWUgb2YgYWN0aW9uIGNhbiBiZSBhbnl0aGluZywgYnV0IGlmIGl0IGlzICg9PT0pIGZhbHNlIHRoZW4gdGhlIGVudW1VdGlsLmZvckVhY2ggd2lsbCBkaXNjb250aW51ZS5cbiAgICAgICAgcmV0dXJuIG1heCA+IDAgPyB1c2luZyhfLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiBlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAvLyBJdCBpcyBwb3NzaWJsZSB0aGF0IHN1YnNlcXVlbnRseSAnYWN0aW9uJyBjb3VsZCBjYXVzZSB0aGUgZW51bWVyYXRpb24gdG8gZGlzcG9zZSwgc28gd2UgaGF2ZSB0byBjaGVjayBlYWNoIHRpbWUuXG4gICAgICAgICAgICB3aGlsZSAobWF4ID4gaSAmJiBfLnRocm93SWZEaXNwb3NlZCgpICYmIGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24oZS5jdXJyZW50LCBpKyspID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfSkgOiAwO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIENvbnZlcnNpb24gTWV0aG9kc1xuICAgIHRvQXJyYXkocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVcbiAgICAgICAgICAgID8gdGhpcy53aGVyZShwcmVkaWNhdGUpLnRvQXJyYXkoKVxuICAgICAgICAgICAgOiB0aGlzLmNvcHlUbyhbXSk7XG4gICAgfVxuICAgIGNvcHlUbyh0YXJnZXQsIGluZGV4ID0gMCwgY291bnQgPSBJbmZpbml0eSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXRhcmdldClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJ0YXJnZXRcIik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihpbmRleCk7XG4gICAgICAgIC8vIElmIG5vdCBleHBvc2luZyBhbiBhY3Rpb24gdGhhdCBjb3VsZCBjYXVzZSBkaXNwb3NlLCB0aGVuIHVzZSBlbnVtVXRpbC5mb3JFYWNoIHV0aWxpdHkgaW5zdGVhZC5cbiAgICAgICAgZW51bVV0aWwuZm9yRWFjaCh0aGlzLCAoeCwgaSkgPT4ge1xuICAgICAgICAgICAgdGFyZ2V0W2kgKyBpbmRleF0gPSB4O1xuICAgICAgICB9LCBjb3VudCk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIHRvTG9va3VwKGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHksIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBkaWN0ID0gbmV3IERpY3Rpb25hcnkoY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5ID0ga2V5U2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGVsZW1lbnRTZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgICAgIGxldCBhcnJheSA9IGRpY3QuZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgICAgIGlmIChhcnJheSAhPT0gVk9JRDApXG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkaWN0LmFkZEJ5S2V5VmFsdWUoa2V5LCBbZWxlbWVudF0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBMb29rdXAoZGljdCk7XG4gICAgfVxuICAgIHRvTWFwKGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgb2JqW2tleVNlbGVjdG9yKHgsIGkpXSA9IGVsZW1lbnRTZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIHRvRGljdGlvbmFyeShrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZGljdCA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4gZGljdC5hZGRCeUtleVZhbHVlKGtleVNlbGVjdG9yKHgsIGkpLCBlbGVtZW50U2VsZWN0b3IoeCwgaSkpKTtcbiAgICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgfVxuICAgIHRvSm9pbmVkU3RyaW5nKHNlcGFyYXRvciA9IFwiXCIsIHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICAuc2VsZWN0KHNlbGVjdG9yKVxuICAgICAgICAgICAgLnRvQXJyYXkoKVxuICAgICAgICAgICAgLmpvaW4oc2VwYXJhdG9yKTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIHRha2VFeGNlcHRMYXN0KGNvdW50ID0gMSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICBjb25zdCBjID0gY291bnQ7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgcTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBxID0gbmV3IFF1ZXVlKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBuZXh0IG9uZSB0byB0aGUgcXVldWUuXG4gICAgICAgICAgICAgICAgICAgIHEuZW5xdWV1ZShlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBEaWQgd2UgcmVhY2ggb3VyIHF1b3RhP1xuICAgICAgICAgICAgICAgICAgICBpZiAocS5jb3VudCA+IGMpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPa2F5IHRoZW4sIHN0YXJ0IHJldHVybmluZyByZXN1bHRzLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocS5kZXF1ZXVlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGlmIChxKVxuICAgICAgICAgICAgICAgICAgICBxLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBxID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2tpcFRvTGFzdChjb3VudCkge1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgcmV0dXJuIF87XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICAvLyBUaGlzIHNldHMgdXAgdGhlIHF1ZXJ5IHNvIG5vdGhpbmcgaXMgZG9uZSB1bnRpbCBtb3ZlIG5leHQgaXMgY2FsbGVkLlxuICAgICAgICByZXR1cm4gXy5yZXZlcnNlKClcbiAgICAgICAgICAgIC50YWtlKGNvdW50KVxuICAgICAgICAgICAgLnJldmVyc2UoKTtcbiAgICB9XG4gICAgLy8gVG8gaGVscCB3aXRoIHR5cGUgZ3VhcmRpbmcuXG4gICAgc2VsZWN0KHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBtYXAoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnNlbGVjdChzZWxlY3Rvcik7XG4gICAgfVxuICAgIHNlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKTtcbiAgICB9XG4gICAgY2hvb3NlKHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChzZWxlY3RvciwgaXNOb3ROdWxsT3JVbmRlZmluZWQpO1xuICAgIH1cbiAgICByZXZlcnNlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKF8uX2lzRW5kbGVzcyk7IC8vIENhbm5vdCByZXZlcnNlIGFuIGVuZGxlc3MgY29sbGVjdGlvbi4uLlxuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF8udG9BcnJheSgpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiAhIWluZGV4ICYmIHlpZWxkZXIueWllbGRSZXR1cm4oYnVmZmVyWy0taW5kZXhdKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNodWZmbGUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhyb3dJZkVuZGxlc3MoXy5faXNFbmRsZXNzKTsgLy8gQ2Fubm90IHNodWZmbGUgYW4gZW5kbGVzcyBjb2xsZWN0aW9uLi4uXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJ1ZmZlcjtcbiAgICAgICAgICAgIGxldCBjYXBhY2l0eTtcbiAgICAgICAgICAgIGxldCBsZW47XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF8udG9BcnJheSgpO1xuICAgICAgICAgICAgICAgIGNhcGFjaXR5ID0gbGVuID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQXZvaWQgdXNpbmcgbWFqb3IgYXJyYXkgb3BlcmF0aW9ucyBsaWtlIC5zbGljZSgpO1xuICAgICAgICAgICAgICAgIGlmICghbGVuKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSW5kZXggPSBSYW5kb20uaW50ZWdlcihsZW4pO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZFZhbHVlID0gYnVmZmVyW3NlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgICAgIGJ1ZmZlcltzZWxlY3RlZEluZGV4XSA9IGJ1ZmZlclstLWxlbl07IC8vIFRha2UgdGhlIGxhc3Qgb25lIGFuZCBwdXQgaXQgaGVyZS5cbiAgICAgICAgICAgICAgICBidWZmZXJbbGVuXSA9IE5VTEw7IC8vIGNsZWFyIHBvc3NpYmxlIHJlZmVyZW5jZS5cbiAgICAgICAgICAgICAgICBpZiAobGVuICUgMzIgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihzZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb3VudChwcmVkaWNhdGUpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5mb3JFYWNoKHByZWRpY2F0ZVxuICAgICAgICAgICAgPyAoeCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoeCwgaSkpXG4gICAgICAgICAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG4gICAgLy8gQWtpbiB0byAnLmV2ZXJ5JyBvbiBhbiBhcnJheS5cbiAgICBhbGwocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInByZWRpY2F0ZVwiKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFwcmVkaWNhdGUoeCwgaSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvLyAnZXZlcnknIGhhcyBiZWVuIGFkZGVkIGhlcmUgZm9yIHBhcml0eS9jb21wYXRpYmlsaXR5IHdpdGggYW4gYXJyYXkuXG4gICAgZXZlcnkocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbChwcmVkaWNhdGUpO1xuICAgIH1cbiAgICAvLyBBa2luIHRvICcuc29tZScgb24gYW4gYXJyYXkuXG4gICAgYW55KHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5hbnkoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAvLyBTcGxpdHRpbmcgdGhlIGZvckVhY2ggdXAgdGhpcyB3YXkgcmVkdWNlcyBpdGVyYXRpdmUgcHJvY2Vzc2luZy5cbiAgICAgICAgLy8gZm9yRWFjaCBoYW5kbGVzIHRoZSBnZW5lcmF0aW9uIGFuZCBkaXNwb3NhbCBvZiB0aGUgZW51bWVyYXRvci5cbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICByZXN1bHQgPSBwcmVkaWNhdGUoeCwgaSk7IC8vIGZhbHNlID0gbm90IGZvdW5kIGFuZCB0aGVyZWZvcmUgaXQgc2hvdWxkIGNvbnRpbnVlLiAgdHJ1ZSA9IGZvdW5kIGFuZCBicmVhaztcbiAgICAgICAgICAgIHJldHVybiAhcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gJ3NvbWUnIGhhcyBiZWVuIGFkZGVkIGhlcmUgZm9yIHBhcml0eS9jb21wYXRpYmlsaXR5IHdpdGggYW4gYXJyYXkuXG4gICAgc29tZShwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW55KHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIGNvbnRhaW5zKHZhbHVlLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgcyA9IGNvbXBhcmVTZWxlY3Rvcih2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbnkodiA9PiBhcmVFcXVhbFZhbHVlcyhjb21wYXJlU2VsZWN0b3IodiksIHMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hbnkodiA9PiBhcmVFcXVhbFZhbHVlcyh2LCB2YWx1ZSkpO1xuICAgIH1cbiAgICAvLyBPcmlnaW5hbGx5IGhhcyBhbiBvdmVybG9hZCBmb3IgYSBwcmVkaWNhdGUsXG4gICAgLy8gYnV0IHRoYXQncyBhIGJhZCBpZGVhIHNpbmNlIHRoaXMgY291bGQgYmUgYW4gZW51bWVyYXRpb24gb2YgZnVuY3Rpb25zIGFuZCB0aGVyZWZvcmUgZmFpbCB0aGUgaW50ZW50LlxuICAgIC8vIEJldHRlciB0byBjaGFpbiBhIHdoZXJlIHN0YXRlbWVudCBmaXJzdCB0byBiZSBtb3JlIGV4cGxpY2l0LlxuICAgIGluZGV4T2YodmFsdWUsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBsZXQgZm91bmQgPSAtMTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGNvbXBhcmVTZWxlY3RvclxuICAgICAgICAgICAgPyAoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlU2VsZWN0b3IoZWxlbWVudCwgaSksIGNvbXBhcmVTZWxlY3Rvcih2YWx1ZSwgaSksIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBXaHk/ICBCZWNhdXNlIE5hTiBkb2Vzbid0IGVxdWFsIE5hTi4gOlBcbiAgICAgICAgICAgICAgICBpZiAoYXJlRXF1YWxWYWx1ZXMoZWxlbWVudCwgdmFsdWUsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuICAgIGxhc3RJbmRleE9mKHZhbHVlLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IC0xO1xuICAgICAgICB0aGlzLmZvckVhY2goY29tcGFyZVNlbGVjdG9yXG4gICAgICAgICAgICA/IChlbGVtZW50LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZUVxdWFsVmFsdWVzKGNvbXBhcmVTZWxlY3RvcihlbGVtZW50LCBpKSwgY29tcGFyZVNlbGVjdG9yKHZhbHVlLCBpKSwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiAoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhlbGVtZW50LCB2YWx1ZSwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaW50ZXJzZWN0KHNlY29uZCwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlY29uZClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzZWNvbmRcIik7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uaXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGtleXM7XG4gICAgICAgICAgICBsZXQgb3V0cztcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghc2Vjb25kKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAga2V5cyA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgb3V0cyA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgZW51bVV0aWwuZm9yRWFjaChzZWNvbmQsIGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMuYWRkQnlLZXlWYWx1ZShrZXksIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW91dHMuY29udGFpbnNLZXkoY3VycmVudCkgJiYga2V5cy5jb250YWluc0tleShjdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cy5hZGRCeUtleVZhbHVlKGN1cnJlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5cylcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKG91dHMpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGtleXMgPSBOVUxMO1xuICAgICAgICAgICAgICAgIG91dHMgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgc2Vjb25kID0gTlVMTDtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgc2VxdWVuY2VFcXVhbChzZWNvbmQsIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbFZhbHVlcykge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUxID0+IHVzaW5nKGVudW1VdGlsLmZyb20oc2Vjb25kKSwgZTIgPT4ge1xuICAgICAgICAgICAgLy8gaWYgYm90aCBhcmUgZW5kbGVzcywgdGhpcyB3aWxsIG5ldmVyIGV2YWx1YXRlLlxuICAgICAgICAgICAgdGhyb3dJZkVuZGxlc3MoZTEuaXNFbmRsZXNzICYmIGUyLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICB3aGlsZSAoZTEubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmICghZTIubW92ZU5leHQoKSB8fCAhZXF1YWxpdHlDb21wYXJlcihlMS5jdXJyZW50LCBlMi5jdXJyZW50KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICFlMi5tb3ZlTmV4dCgpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIG9mVHlwZSh0eXBlKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBzdXBlci5vZlR5cGUodHlwZSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gT3JkZXJpbmcgTWV0aG9kc1xuICAgIG9yZGVyQnkoa2V5U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLCBrZXlTZWxlY3RvciwgMSAvKiBBc2NlbmRpbmcgKi8pO1xuICAgIH1cbiAgICBvcmRlclVzaW5nKGNvbXBhcmlzb24pIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLCBudWxsLCAxIC8qIEFzY2VuZGluZyAqLywgbnVsbCwgY29tcGFyaXNvbik7XG4gICAgfVxuICAgIG9yZGVyVXNpbmdSZXZlcnNlZChjb21wYXJpc29uKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywgbnVsbCwgLTEgLyogRGVzY2VuZGluZyAqLywgbnVsbCwgY29tcGFyaXNvbik7XG4gICAgfVxuICAgIG9yZGVyQnlEZXNjZW5kaW5nKGtleVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywga2V5U2VsZWN0b3IsIC0xIC8qIERlc2NlbmRpbmcgKi8pO1xuICAgIH1cbiAgICAvKlxuICAgICAgICAgd2VpZ2h0ZWRTYW1wbGUod2VpZ2h0U2VsZWN0b3IpIHtcbiAgICAgICAgIHdlaWdodFNlbGVjdG9yID0gVXRpbHMuY3JlYXRlTGFtYmRhKHdlaWdodFNlbGVjdG9yKTtcbiAgICAgICAgIHZhciBzb3VyY2UgPSB0aGlzO1xuICAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZTxUPigoKSA9PiB7XG4gICAgICAgICB2YXIgc29ydGVkQnlCb3VuZDtcbiAgICAgICAgIHZhciB0b3RhbFdlaWdodCA9IDA7XG4gICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlPFQ+KFxuICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgc29ydGVkQnlCb3VuZCA9IHNvdXJjZVxuICAgICAgICAgLmNob29zZShmdW5jdGlvbiAoeCkge1xuICAgICAgICAgdmFyIHdlaWdodCA9IHdlaWdodFNlbGVjdG9yKHgpO1xuICAgICAgICAgaWYgKHdlaWdodCA8PSAwKSByZXR1cm4gbnVsbDsgLy8gaWdub3JlIDBcbiAgICAgICAgIHRvdGFsV2VpZ2h0ICs9IHdlaWdodDtcbiAgICAgICAgIHJldHVybiB7IHZhbHVlOiB4LCBib3VuZDogdG90YWxXZWlnaHQgfVxuICAgICAgICAgfSlcbiAgICAgICAgIC50b0FycmF5KCk7XG4gICAgICAgICB9LFxuICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgaWYgKHNvcnRlZEJ5Qm91bmQubGVuZ3RoID4gMCkge1xuICAgICAgICAgdmFyIGRyYXcgPSAoTWF0aC5yYW5kb20oKSAqIHRvdGFsV2VpZ2h0KSArIDE7XG4gICAgICAgICB2YXIgbG93ZXIgPSAtMTtcbiAgICAgICAgIHZhciB1cHBlciA9IHNvcnRlZEJ5Qm91bmQubGVuZ3RoO1xuICAgICAgICAgd2hpbGUgKHVwcGVyIC0gbG93ZXIgPiAxKSB7XG4gICAgICAgICB2YXIgaW5kZXggPSAoKGxvd2VyICsgdXBwZXIpIC8gMik7XG4gICAgICAgICBpZiAoc29ydGVkQnlCb3VuZFtpbmRleF0uYm91bmQgPj0gZHJhdykge1xuICAgICAgICAgdXBwZXIgPSBpbmRleDtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2Uge1xuICAgICAgICAgbG93ZXIgPSBpbmRleDtcbiAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICAgIHJldHVybiAoPGFueT50aGlzKS55aWVsZFJldHVybihzb3J0ZWRCeUJvdW5kW3VwcGVyXS52YWx1ZSk7XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykueWllbGRCcmVhaygpO1xuICAgICAgICAgfSxcbiAgICAgICAgIEZ1bmN0aW9ucy5CbGFuayk7XG4gICAgICAgICB9KTtcbiAgICAgICAgIH1cbiAgICAgICAgICovXG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIGJ1ZmZlcihzaXplKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5idWZmZXIoc2l6ZSk7XG4gICAgfVxuICAgIGdyb3VwQnkoa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3RvciwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGlmICghZWxlbWVudFNlbGVjdG9yKVxuICAgICAgICAgICAgZWxlbWVudFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5OyAvLyBBbGxvdyBmb3IgJ251bGwnIGFuZCBub3QganVzdCB1bmRlZmluZWQuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gdGhpc1xuICAgICAgICAgICAgLnRvTG9va3VwKGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIGNvbXBhcmVTZWxlY3RvcilcbiAgICAgICAgICAgIC5nZXRFbnVtZXJhdG9yKCkpO1xuICAgIH1cbiAgICBwYXJ0aXRpb25CeShrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciA9IChrZXksIGVsZW1lbnRzKSA9PiBuZXcgR3JvdXBpbmcoa2V5LCBlbGVtZW50cyksIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFlbGVtZW50U2VsZWN0b3IpXG4gICAgICAgICAgICBlbGVtZW50U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHk7IC8vIEFsbG93IGZvciAnbnVsbCcgYW5kIG5vdCBqdXN0IHVuZGVmaW5lZC5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBrZXk7XG4gICAgICAgICAgICBsZXQgY29tcGFyZUtleTtcbiAgICAgICAgICAgIGxldCBncm91cDtcbiAgICAgICAgICAgIGxldCBsZW47XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWVsZW1lbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleVNlbGVjdG9yKHYpO1xuICAgICAgICAgICAgICAgICAgICBjb21wYXJlS2V5ID0gY29tcGFyZVNlbGVjdG9yKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gW2VsZW1lbnRTZWxlY3Rvcih2KV07XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWVsZW1lbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgaWYgKCFncm91cClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgIGxldCBoYXNOZXh0LCBjO1xuICAgICAgICAgICAgICAgIHdoaWxlICgoaGFzTmV4dCA9IGVudW1lcmF0b3IubW92ZU5leHQoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYyA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZUVxdWFsVmFsdWVzKGNvbXBhcmVLZXksIGNvbXBhcmVTZWxlY3RvcihrZXlTZWxlY3RvcihjKSkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBbbGVuKytdID0gZWxlbWVudFNlbGVjdG9yKGMpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHJlc3VsdFNlbGVjdG9yKGtleSwgZ3JvdXApO1xuICAgICAgICAgICAgICAgIGlmIChoYXNOZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleVNlbGVjdG9yKGMpO1xuICAgICAgICAgICAgICAgICAgICBjb21wYXJlS2V5ID0gY29tcGFyZVNlbGVjdG9yKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gW2VsZW1lbnRTZWxlY3RvcihjKV07XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50U2VsZWN0b3IgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmxhdHRlbigpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmZsYXR0ZW4oKTtcbiAgICB9XG4gICAgcGFpcndpc2Uoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnBhaXJ3aXNlKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgYWdncmVnYXRlKHJlZHVjdGlvbiwgaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIGlmIChpbml0aWFsVmFsdWUgPT0gVk9JRDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSBpXG4gICAgICAgICAgICAgICAgICAgID8gcmVkdWN0aW9uKGluaXRpYWxWYWx1ZSwgdmFsdWUsIGkpXG4gICAgICAgICAgICAgICAgICAgIDogdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSByZWR1Y3Rpb24oaW5pdGlhbFZhbHVlLCB2YWx1ZSwgaSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5pdGlhbFZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm92aWRlZCBhcyBhbiBhbmFsb2cgZm9yIGFycmF5LnJlZHVjZS4gIFNpbXBseSBhIHNob3J0Y3V0IGZvciBhZ2dyZWdhdGUuXG4gICAgICogQHBhcmFtIHJlZHVjdGlvblxuICAgICAqIEBwYXJhbSBpbml0aWFsVmFsdWVcbiAgICAgKi9cbiAgICByZWR1Y2UocmVkdWN0aW9uLCBpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKHJlZHVjdGlvbiwgaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgYXZlcmFnZShzZWxlY3RvciA9IFR5cGUubnVtYmVyT3JOYU4pIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3Qgc3VtID0gdGhpcy5zdW0oKGUsIGkpID0+IHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoZSwgaSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKGlzTmFOKHN1bSkgfHwgIWNvdW50KVxuICAgICAgICAgICAgPyBOYU5cbiAgICAgICAgICAgIDogKHN1bSAvIGNvdW50KTtcbiAgICB9XG4gICAgLy8gSWYgdXNpbmcgbnVtYmVycywgaXQgbWF5IGJlIHVzZWZ1bCB0byBjYWxsIC50YWtlVW50aWwodj0+dj09SW5maW5pdHksdHJ1ZSkgYmVmb3JlIGNhbGxpbmcgbWF4LiBTZWUgc3RhdGljIHZlcnNpb25zIGZvciBudW1iZXJzLlxuICAgIG1heCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKEZ1bmN0aW9ucy5HcmVhdGVyKTtcbiAgICB9XG4gICAgbWluKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUoRnVuY3Rpb25zLkxlc3Nlcik7XG4gICAgfVxuICAgIG1heEJ5KGtleVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZSgoYSwgYikgPT4gKGtleVNlbGVjdG9yKGEpID4ga2V5U2VsZWN0b3IoYikpID8gYSA6IGIpO1xuICAgIH1cbiAgICBtaW5CeShrZXlTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUoKGEsIGIpID0+IChrZXlTZWxlY3RvcihhKSA8IGtleVNlbGVjdG9yKGIpKSA/IGEgOiBiKTtcbiAgICB9XG4gICAgLy8gQWRkaXRpb24uLi4gIE9ubHkgd29ya3Mgd2l0aCBudW1lcmljYWwgZW51bWVyYXRpb25zLlxuICAgIHN1bShzZWxlY3RvciA9IFR5cGUubnVtYmVyT3JOYU4pIHtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIGZvciBpbmZpbml0eSBtYXRoIHRoYXQgZG9lc24ndCBkZXN0cm95IHRoZSBvdGhlciB2YWx1ZXMuXG4gICAgICAgIGxldCBzdW1JbmZpbml0ZSA9IDA7IC8vIE5lZWRzIG1vcmUgaW52ZXN0aWdhdGlvbiBzaW5jZSB3ZSBhcmUgcmVhbGx5IHRyeWluZyB0byByZXRhaW4gc2lnbnMuXG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgc3VtID0gTmFOO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0Zpbml0ZSh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgc3VtICs9IHZhbHVlO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN1bUluZmluaXRlICs9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID4gMCA/ICgrMSkgOiAoLTEpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGlzTmFOKHN1bSkgPyBOYU4gOiAoc3VtSW5maW5pdGUgPyAoc3VtSW5maW5pdGUgKiBJbmZpbml0eSkgOiBzdW0pO1xuICAgIH1cbiAgICAvLyBNdWx0aXBsaWNhdGlvbi4uLlxuICAgIHByb2R1Y3Qoc2VsZWN0b3IgPSBUeXBlLm51bWJlck9yTmFOKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAxLCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBleGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gTmFOO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMDsgLy8gTXVsdGlwbHlpbmcgYnkgemVybyB3aWxsIGFsd2F5cyBlbmQgaW4gemVyby5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNdWx0aXBsaWNhdGlvbiBjYW4gbmV2ZXIgcmVjb3ZlciBmcm9tIGluZmluaXR5IGFuZCBzaW1wbHkgbXVzdCByZXRhaW4gc2lnbnMuXG4gICAgICAgICAgICAvLyBZb3UgY291bGQgY2FuY2VsIG91dCBpbmZpbml0eSB3aXRoIDEvaW5maW5pdHkgYnV0IG5vIGF2YWlsYWJsZSByZXByZXNlbnRhdGlvbiBleGlzdHMuXG4gICAgICAgICAgICByZXN1bHQgKj0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKGV4aXN0cyAmJiBpc05hTihyZXN1bHQpKSA/IE5hTiA6IHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGFrZXMgdGhlIGZpcnN0IG51bWJlciBhbmQgZGl2aWRlcyBpdCBieSBhbGwgZm9sbG93aW5nLlxuICAgICAqIEBwYXJhbSBzZWxlY3RvclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgcXVvdGllbnQoc2VsZWN0b3IgPSBUeXBlLm51bWJlck9yTmFOKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGxldCByZXN1bHQgPSBOYU47XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSAwIHx8ICFpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gTmFOO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCAvPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjb3VudCA9PT0gMSlcbiAgICAgICAgICAgIHJlc3VsdCA9IE5hTjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIC8vICNyZWdpb24gU2luZ2xlIFZhbHVlIFJldHVybi4uLlxuICAgIGxhc3QoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgdmFsdWUgPSBWT0lEMDtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIF8uZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbHVlID0geDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZm91bmQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJsYXN0Ok5vIGVsZW1lbnQgc2F0aXNmaWVzIHRoZSBjb25kaXRpb24uXCIpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGxhc3RPckRlZmF1bHQoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgdmFsdWUgPSBWT0lEMDtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIF8uZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbHVlID0geDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoIWZvdW5kKSA/IGRlZmF1bHRWYWx1ZSA6IHZhbHVlO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgbWVtb2l6ZSgpIHtcbiAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBMYXp5TGlzdCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIChuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gc291cmNlLmdldEVudW1lcmF0b3IoKSwgKCkgPT4ge1xuICAgICAgICAgICAgc291cmNlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHNvdXJjZSA9IG51bGw7XG4gICAgICAgIH0sIHRoaXMuaXNFbmRsZXNzKSk7XG4gICAgfVxuICAgIHRocm93V2hlbkVtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbihSRVRVUk4sIG51bGwsIHRoaXMuaXNFbmRsZXNzLCBjb3VudCA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvdW50KVxuICAgICAgICAgICAgICAgIHRocm93IFwiQ29sbGVjdGlvbiBpcyBlbXB0eS5cIjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8gUHJvdmlkZWQgZm9yIHR5cGUgZ3VhcmRpbmcuXG5leHBvcnQgY2xhc3MgRmluaXRlRW51bWVyYWJsZSBleHRlbmRzIExpbnFFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihlbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyKSB7XG4gICAgICAgIHN1cGVyKGVudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIkZpbml0ZUVudW1lcmFibGVcIjtcbiAgICB9XG59XG5jbGFzcyBBcnJheUVudW1lcmFibGUgZXh0ZW5kcyBGaW5pdGVFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICAgICAgc3VwZXIoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhdG9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZChcIlRoZSB1bmRlcmx5aW5nIEFycmF5RW51bWVyYWJsZSB3YXMgZGlzcG9zZWQuXCIsIFwiQXJyYXlFbnVtZXJhdG9yXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLl9zb3VyY2U7IC8vIFNob3VsZCBuZXZlciBiZSBudWxsLCBidXQgQXJyYXlFbnVtZXJhYmxlIGlmIG5vdCBkaXNwb3NlZCBzaW1wbHkgdHJlYXRzIG51bGwgYXMgZW1wdHkgYXJyYXkuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiQXJyYXlFbnVtZXJhYmxlXCI7XG4gICAgICAgIF8uX3NvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9zb3VyY2UgPSBOVUxMO1xuICAgIH1cbiAgICBnZXQgc291cmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlO1xuICAgIH1cbiAgICB0b0FycmF5KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLnRvQXJyYXkoXy5fc291cmNlKTtcbiAgICB9XG4gICAgYXNFbnVtZXJhYmxlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUVudW1lcmFibGUodGhpcy5fc291cmNlKTtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gZW51bVV0aWwuZm9yRWFjaChfLl9zb3VyY2UsIGFjdGlvbiwgbWF4KTtcbiAgICB9XG4gICAgLy8gVGhlc2UgbWV0aG9kcyBzaG91bGQgQUxXQVlTIGNoZWNrIGZvciBhcnJheSBsZW5ndGggYmVmb3JlIGF0dGVtcHRpbmcgYW55dGhpbmcuXG4gICAgYW55KHByZWRpY2F0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlO1xuICAgICAgICBsZXQgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuICEhbGVuICYmICghcHJlZGljYXRlIHx8IHN1cGVyLmFueShwcmVkaWNhdGUpKTtcbiAgICB9XG4gICAgY291bnQocHJlZGljYXRlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBfLl9zb3VyY2UsIGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBsZW4gJiYgKHByZWRpY2F0ZSA/IHN1cGVyLmNvdW50KHByZWRpY2F0ZSkgOiBsZW4pO1xuICAgIH1cbiAgICBlbGVtZW50QXRPckRlZmF1bHQoaW5kZXgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4LCAnaW5kZXgnKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlO1xuICAgICAgICByZXR1cm4gaW5kZXggPCBzb3VyY2UubGVuZ3RoXG4gICAgICAgICAgICA/IHNvdXJjZVtpbmRleF1cbiAgICAgICAgICAgIDogZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgICBsYXN0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlLCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICByZXR1cm4gKGxlbilcbiAgICAgICAgICAgID8gc291cmNlW2xlbiAtIDFdXG4gICAgICAgICAgICA6IHN1cGVyLmxhc3QoKTtcbiAgICB9XG4gICAgbGFzdE9yRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZSwgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgICAgICAgPyBzb3VyY2VbbGVuIC0gMV1cbiAgICAgICAgICAgIDogZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgICBza2lwKGNvdW50KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIF87XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gbmV3IEFycmF5RW51bWVyYXRvcigoKSA9PiBfLl9zb3VyY2UsIGNvdW50KSk7XG4gICAgfVxuICAgIHRha2VFeGNlcHRMYXN0KGNvdW50ID0gMSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIF8udGFrZShfLl9zb3VyY2UubGVuZ3RoIC0gY291bnQpO1xuICAgIH1cbiAgICBza2lwVG9MYXN0KGNvdW50KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShjb3VudCkpXG4gICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgY29uc3QgbGVuID0gXy5fc291cmNlXG4gICAgICAgICAgICA/IF8uX3NvdXJjZS5sZW5ndGhcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgcmV0dXJuIF8uc2tpcChsZW4gLSBjb3VudCk7XG4gICAgfVxuICAgIHJldmVyc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmRleEVudW1lcmF0b3IoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzID0gXy5fc291cmNlO1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCB8fCAhcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBzLFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiAocy5sZW5ndGggLSAxKSxcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogLTFcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1lbW9pemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzRW51bWVyYWJsZSgpO1xuICAgIH1cbiAgICBzZXF1ZW5jZUVxdWFsKHNlY29uZCwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsVmFsdWVzKSB7XG4gICAgICAgIGlmIChUeXBlLmlzQXJyYXlMaWtlKHNlY29uZCkpXG4gICAgICAgICAgICByZXR1cm4gQXJyYXlzLmFyZUVxdWFsKHRoaXMuc291cmNlLCBzZWNvbmQsIHRydWUsIGVxdWFsaXR5Q29tcGFyZXIpO1xuICAgICAgICBpZiAoc2Vjb25kIGluc3RhbmNlb2YgQXJyYXlFbnVtZXJhYmxlKVxuICAgICAgICAgICAgcmV0dXJuIHNlY29uZC5zZXF1ZW5jZUVxdWFsKHRoaXMuc291cmNlLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnNlcXVlbmNlRXF1YWwoc2Vjb25kLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICB9XG4gICAgdG9Kb2luZWRTdHJpbmcoc2VwYXJhdG9yID0gXCJcIiwgc2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuX3NvdXJjZTtcbiAgICAgICAgcmV0dXJuICFzZWxlY3RvciAmJiAocykgaW5zdGFuY2VvZiAoQXJyYXkpXG4gICAgICAgICAgICA/IHMuam9pbihzZXBhcmF0b3IpXG4gICAgICAgICAgICA6IHN1cGVyLnRvSm9pbmVkU3RyaW5nKHNlcGFyYXRvciwgc2VsZWN0b3IpO1xuICAgIH1cbn1cbmNsYXNzIEdyb3VwaW5nIGV4dGVuZHMgQXJyYXlFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihfZ3JvdXBLZXksIGVsZW1lbnRzKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRzKTtcbiAgICAgICAgdGhpcy5fZ3JvdXBLZXkgPSBfZ3JvdXBLZXk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJHcm91cGluZ1wiO1xuICAgIH1cbiAgICBnZXQga2V5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3JvdXBLZXk7XG4gICAgfVxufVxuY2xhc3MgTG9va3VwIHtcbiAgICBjb25zdHJ1Y3RvcihfZGljdGlvbmFyeSkge1xuICAgICAgICB0aGlzLl9kaWN0aW9uYXJ5ID0gX2RpY3Rpb25hcnk7XG4gICAgfVxuICAgIGdldCBjb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpY3Rpb25hcnkuY291bnQ7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpY3Rpb25hcnkuZ2V0VmFsdWUoa2V5KSB8fCBudWxsO1xuICAgIH1cbiAgICBjb250YWlucyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpY3Rpb25hcnkuY29udGFpbnNLZXkoa2V5KTtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLl9kaWN0aW9uYXJ5LmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIGlmICghZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4obmV3IEdyb3VwaW5nKGN1cnJlbnQua2V5LCBjdXJyZW50LnZhbHVlKSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmNsYXNzIE9yZGVyZWRFbnVtZXJhYmxlIGV4dGVuZHMgRmluaXRlRW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlLCBrZXlTZWxlY3Rvciwgb3JkZXIsIHBhcmVudCwgY29tcGFyZXIgPSBjb21wYXJlVmFsdWVzKSB7XG4gICAgICAgIHN1cGVyKE5VTEwpO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgdGhpcy5rZXlTZWxlY3RvciA9IGtleVNlbGVjdG9yO1xuICAgICAgICB0aGlzLm9yZGVyID0gb3JkZXI7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLmNvbXBhcmVyID0gY29tcGFyZXI7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKHNvdXJjZSAmJiBzb3VyY2UuaXNFbmRsZXNzKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIk9yZGVyZWRFbnVtZXJhYmxlXCI7XG4gICAgfVxuICAgIGNyZWF0ZU9yZGVyZWRFbnVtZXJhYmxlKGtleVNlbGVjdG9yLCBvcmRlcikge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMuc291cmNlLCBrZXlTZWxlY3Rvciwgb3JkZXIsIHRoaXMpO1xuICAgIH1cbiAgICB0aGVuQnkoa2V5U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlT3JkZXJlZEVudW1lcmFibGUoa2V5U2VsZWN0b3IsIDEgLyogQXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgdGhlblVzaW5nKGNvbXBhcmlzb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLnNvdXJjZSwgbnVsbCwgMSAvKiBBc2NlbmRpbmcgKi8sIHRoaXMsIGNvbXBhcmlzb24pO1xuICAgIH1cbiAgICB0aGVuQnlEZXNjZW5kaW5nKGtleVNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU9yZGVyZWRFbnVtZXJhYmxlKGtleVNlbGVjdG9yLCAtMSAvKiBEZXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgdGhlblVzaW5nUmV2ZXJzZWQoY29tcGFyaXNvbikge1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMuc291cmNlLCBudWxsLCAtMSAvKiBEZXNjZW5kaW5nICovLCB0aGlzLCBjb21wYXJpc29uKTtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgIGxldCBpbmRleGVzO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICBidWZmZXIgPSBFbnVtZXJhYmxlLnRvQXJyYXkoXy5zb3VyY2UpO1xuICAgICAgICAgICAgaW5kZXhlcyA9IGNyZWF0ZVNvcnRDb250ZXh0KF8pXG4gICAgICAgICAgICAgICAgLmdlbmVyYXRlU29ydGVkSW5kZXhlcyhidWZmZXIpO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHJldHVybiAoaW5kZXggPCBpbmRleGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oYnVmZmVyW2luZGV4ZXNbaW5kZXgrK11dKVxuICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChidWZmZXIpXG4gICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBidWZmZXIgPSBOVUxMO1xuICAgICAgICAgICAgaWYgKGluZGV4ZXMpXG4gICAgICAgICAgICAgICAgaW5kZXhlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgaW5kZXhlcyA9IE5VTEw7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgXy5zb3VyY2UgPSBOVUxMO1xuICAgICAgICBfLmtleVNlbGVjdG9yID0gTlVMTDtcbiAgICAgICAgXy5vcmRlciA9IE5VTEw7XG4gICAgICAgIF8ucGFyZW50ID0gTlVMTDtcbiAgICB9XG59XG4vLyBBIHByaXZhdGUgc3RhdGljIGhlbHBlciBmb3IgdGhlIHdlYXZlIGZ1bmN0aW9uLlxuZnVuY3Rpb24gbmV4dEVudW1lcmF0b3IocXVldWUsIGUpIHtcbiAgICBpZiAoZSkge1xuICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBxdWV1ZS5lbnF1ZXVlKGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGUpXG4gICAgICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZTtcbn1cbi8qKlxuICogUmVjdXJzaXZlbHkgYnVpbGRzIGEgU29ydENvbnRleHQgY2hhaW4uXG4gKiBAcGFyYW0gb3JkZXJlZEVudW1lcmFibGVcbiAqIEBwYXJhbSBjdXJyZW50Q29udGV4dFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlU29ydENvbnRleHQob3JkZXJlZEVudW1lcmFibGUsIGN1cnJlbnRDb250ZXh0ID0gbnVsbCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgS2V5U29ydGVkQ29udGV4dChjdXJyZW50Q29udGV4dCwgb3JkZXJlZEVudW1lcmFibGUua2V5U2VsZWN0b3IsIG9yZGVyZWRFbnVtZXJhYmxlLm9yZGVyLCBvcmRlcmVkRW51bWVyYWJsZS5jb21wYXJlcik7XG4gICAgaWYgKG9yZGVyZWRFbnVtZXJhYmxlLnBhcmVudClcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVNvcnRDb250ZXh0KG9yZGVyZWRFbnVtZXJhYmxlLnBhcmVudCwgY29udGV4dCk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZnVuY3Rpb24gdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKSB7XG4gICAgaWYgKGRpc3Bvc2VkKVxuICAgICAgICB0aHJvdyBuZXcgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24oXCJFbnVtZXJhYmxlXCIpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIEVudW1lcmFibGUoc291cmNlLCAuLi5hZGRpdGlvbmFsKSB7XG4gICAgcmV0dXJuIGVudW1lcmFibGVGcm9tKHNvdXJjZSwgYWRkaXRpb25hbCk7XG59XG5mdW5jdGlvbiBlbnVtZXJhYmxlRnJvbShzb3VyY2UsIGFkZGl0aW9uYWwpIHtcbiAgICBsZXQgZSA9IEVudW1lcmFibGUuZnJvbUFueShzb3VyY2UpO1xuICAgIGlmICghZSlcbiAgICAgICAgdGhyb3cgbmV3IFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbigpO1xuICAgIHJldHVybiAoYWRkaXRpb25hbCAmJiBhZGRpdGlvbmFsLmxlbmd0aClcbiAgICAgICAgPyBlLm1lcmdlKGFkZGl0aW9uYWwpXG4gICAgICAgIDogZTtcbn1cbihmdW5jdGlvbiAoRW51bWVyYWJsZSkge1xuICAgIGZ1bmN0aW9uIGZyb20oc291cmNlLCAuLi5hZGRpdGlvbmFsKSB7XG4gICAgICAgIHJldHVybiBlbnVtZXJhYmxlRnJvbShzb3VyY2UsIGFkZGl0aW9uYWwpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZyb20gPSBmcm9tO1xuICAgIGZ1bmN0aW9uIGZyb21Bbnkoc291cmNlLCBkZWZhdWx0RW51bWVyYWJsZSkge1xuICAgICAgICBpZiAoVHlwZS5pc09iamVjdChzb3VyY2UpIHx8IFR5cGUuaXNTdHJpbmcoc291cmNlKSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEluZmluaXRlTGlucUVudW1lcmFibGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgICAgIGlmIChUeXBlLmlzQXJyYXlMaWtlKHNvdXJjZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheUVudW1lcmFibGUoc291cmNlKTtcbiAgICAgICAgICAgIGlmIChpc0VudW1lcmFibGUoc291cmNlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHNvdXJjZS5nZXRFbnVtZXJhdG9yKCksIG51bGwsIHNvdXJjZS5pc0VuZGxlc3MpO1xuICAgICAgICAgICAgaWYgKGlzRW51bWVyYXRvcihzb3VyY2UpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gc291cmNlLCBudWxsLCBzb3VyY2UuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIGlmIChpc0l0ZXJhdG9yKHNvdXJjZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb21BbnkobmV3IEl0ZXJhdG9yRW51bWVyYXRvcihzb3VyY2UpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChUeXBlLmlzRnVuY3Rpb24oc291cmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IG5ldyBJbmZpbml0ZUVudW1lcmF0b3Ioc291cmNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRFbnVtZXJhYmxlO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZyb21BbnkgPSBmcm9tQW55O1xuICAgIGZ1bmN0aW9uIGZyb21UaGVzZShzb3VyY2VzKSB7XG4gICAgICAgIHN3aXRjaCAoc291cmNlcyA/IHNvdXJjZXMubGVuZ3RoIDogMCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eSgpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vIEFsbG93IGZvciB2YWxpZGF0aW9uIGFuZCB0aHJvd2luZy4uLlxuICAgICAgICAgICAgICAgIHJldHVybiBlbnVtZXJhYmxlRnJvbShzb3VyY2VzWzBdKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5KCkubWVyZ2Uoc291cmNlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgRW51bWVyYWJsZS5mcm9tVGhlc2UgPSBmcm9tVGhlc2U7XG4gICAgZnVuY3Rpb24gZnJvbU9yRW1wdHkoc291cmNlKSB7XG4gICAgICAgIHJldHVybiBmcm9tQW55KHNvdXJjZSkgfHwgZW1wdHkoKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5mcm9tT3JFbXB0eSA9IGZyb21PckVtcHR5O1xuICAgIC8qKlxuICAgICAqIFN0YXRpYyBoZWxwZXIgZm9yIGNvbnZlcnRpbmcgZW51bWVyYWJsZXMgdG8gYW4gYXJyYXkuXG4gICAgICogQHBhcmFtIHNvdXJjZVxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9BcnJheShzb3VyY2UpIHtcbiAgICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIExpbnFFbnVtZXJhYmxlKVxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS50b0FycmF5KCk7XG4gICAgICAgIHJldHVybiBlbnVtVXRpbC50b0FycmF5KHNvdXJjZSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUudG9BcnJheSA9IHRvQXJyYXk7XG4gICAgZnVuY3Rpb24gX2Nob2ljZSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IG5ldyBFbnVtZXJhdG9yQmFzZShudWxsLCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCF2YWx1ZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oUmFuZG9tLnNlbGVjdC5vbmUodmFsdWVzKSk7XG4gICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgKSwgKCkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB2YWx1ZXMgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5fY2hvaWNlID0gX2Nob2ljZTtcbiAgICBmdW5jdGlvbiBjaG9pY2UodmFsdWVzKSB7XG4gICAgICAgIGxldCBsZW4gPSB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgLy8gV2UgY291bGQgcmV0dXJuIGVtcHR5IGlmIG5vIGxlbmd0aCwgYnV0IHRoYXQgd291bGQgYnJlYWsgdGhlIHR5cGluZyBhbmQgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgIC8vIEVuZm9yY2luZyB0aGF0IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgMSBjaG9pY2UgaXMga2V5LlxuICAgICAgICBpZiAoIWxlbiB8fCAhaXNGaW5pdGUobGVuKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2xlbmd0aCcsIGxlbmd0aCk7XG4gICAgICAgIHJldHVybiBfY2hvaWNlKGNvcHkodmFsdWVzKSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuY2hvaWNlID0gY2hvaWNlO1xuICAgIGZ1bmN0aW9uIGNob29zZUZyb20oLi4uYXJncykge1xuICAgICAgICAvLyBXZSBjb3VsZCByZXR1cm4gZW1wdHkgaWYgbm8gbGVuZ3RoLCBidXQgdGhhdCB3b3VsZCBicmVhayB0aGUgdHlwaW5nIGFuZCBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAgICAgICAgLy8gRW5mb3JjaW5nIHRoYXQgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAxIGNob2ljZSBpcyBrZXkuXG4gICAgICAgIGlmICghYXJncy5sZW5ndGgpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdsZW5ndGgnLCBsZW5ndGgpO1xuICAgICAgICByZXR1cm4gX2Nob2ljZShhcmdzKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5jaG9vc2VGcm9tID0gY2hvb3NlRnJvbTtcbiAgICBmdW5jdGlvbiBfY3ljbGUodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfSwgLy8gUmVpbml0aWFsaXplIHRoZSB2YWx1ZSBqdXN0IGluIGNhc2UgdGhlIGVudW1lcmF0b3IgaXMgcmVzdGFydGVkLlxuICAgICAgICAgICAgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXZhbHVlcyk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IHZhbHVlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybih2YWx1ZXNbaW5kZXgrK10pO1xuICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB2YWx1ZXMgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3ljbGUodmFsdWVzKSB7XG4gICAgICAgIGxldCBsZW4gPSB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgLy8gV2UgY291bGQgcmV0dXJuIGVtcHR5IGlmIG5vIGxlbmd0aCwgYnV0IHRoYXQgd291bGQgYnJlYWsgdGhlIHR5cGluZyBhbmQgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgIC8vIEVuZm9yY2luZyB0aGF0IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgMSBjaG9pY2UgaXMga2V5LlxuICAgICAgICBpZiAoIWxlbiB8fCAhaXNGaW5pdGUobGVuKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2xlbmd0aCcsIGxlbmd0aCk7XG4gICAgICAgIC8vIE1ha2UgYSBjb3B5IHRvIGF2b2lkIG1vZGlmeWluZyB0aGUgY29sbGVjdGlvbiBhcyB3ZSBnby5cbiAgICAgICAgcmV0dXJuIF9jeWNsZShjb3B5KHZhbHVlcykpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmN5Y2xlID0gY3ljbGU7XG4gICAgZnVuY3Rpb24gY3ljbGVUaHJvdWdoKC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gV2UgY291bGQgcmV0dXJuIGVtcHR5IGlmIG5vIGxlbmd0aCwgYnV0IHRoYXQgd291bGQgYnJlYWsgdGhlIHR5cGluZyBhbmQgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgIC8vIEVuZm9yY2luZyB0aGF0IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgMSBjaG9pY2UgaXMga2V5LlxuICAgICAgICBpZiAoIWFyZ3MubGVuZ3RoKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbGVuZ3RoJywgbGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIF9jeWNsZShhcmdzKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5jeWNsZVRocm91Z2ggPSBjeWNsZVRocm91Z2g7XG4gICAgZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgICAgIC8vIENvdWxkIGJlIHNpbmdsZSBleHBvcnQgZnVuY3Rpb24gaW5zdGFuY2UsIGJ1dCBmb3Igc2FmZXR5LCB3ZSdsbCBtYWtlIGEgbmV3IG9uZS5cbiAgICAgICAgcmV0dXJuIG5ldyBGaW5pdGVFbnVtZXJhYmxlKGdldEVtcHR5RW51bWVyYXRvcik7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZW1wdHkgPSBlbXB0eTtcbiAgICBmdW5jdGlvbiByZXBlYXQoZWxlbWVudCwgY291bnQgPSBJbmZpbml0eSkge1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKGNvdW50KSAmJiBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKVxuICAgICAgICAgICAgPyBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjb3VudDtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4geyBpbmRleCA9IDA7IH0sICh5aWVsZGVyKSA9PiAoaW5kZXgrKyA8IGMpICYmIHlpZWxkZXIueWllbGRSZXR1cm4oZWxlbWVudCksIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBuZXcgRW51bWVyYXRvckJhc2UobnVsbCwgKHlpZWxkZXIpID0+IHlpZWxkZXIueWllbGRSZXR1cm4oZWxlbWVudCksIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICkpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJlcGVhdCA9IHJlcGVhdDtcbiAgICBmdW5jdGlvbiByZXBlYXRXaXRoRmluYWxpemUoaW5pdGlhbGl6ZXIsIGZpbmFsaXplcikge1xuICAgICAgICBpZiAoIWluaXRpYWxpemVyKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImluaXRpYWxpemVyXCIpO1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbGl6ZXIpXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBpbml0aWFsaXplcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZXJcbiAgICAgICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IE5VTEw7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgZmluYWxpemVyKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSBOVUxMO1xuICAgICAgICAgICAgZmluYWxpemVyID0gVk9JRDA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJlcGVhdFdpdGhGaW5hbGl6ZSA9IHJlcGVhdFdpdGhGaW5hbGl6ZTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVudW1lcmFibGUgb2Ygb25lIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJucyB7RmluaXRlRW51bWVyYWJsZTxUPn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYWtlKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHJlcGVhdChlbGVtZW50LCAxKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5tYWtlID0gbWFrZTtcbiAgICAvLyBzdGFydCBhbmQgc3RlcCBjYW4gYmUgb3RoZXIgdGhhbiBpbnRlZ2VyLlxuICAgIGZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBjb3VudCwgc3RlcCA9IDEpIHtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShzdGFydCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RhcnRcIiwgc3RhcnQsIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICAgIGlmICghc3RlcClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGVwXCIsIHN0ZXAsIFwiTXVzdCBiZSBhIHZhbGlkIHZhbHVlXCIpO1xuICAgICAgICBpZiAoIWlzRmluaXRlKHN0ZXApKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgZmluaXRlIG51bWJlci5cIik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICByZXR1cm4gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgbGV0IGMgPSBjb3VudDsgLy8gRm9yY2UgaW50ZWdlciBldmFsdWF0aW9uLlxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHN0YXJ0O1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5kZXgrKyA8IGNcbiAgICAgICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiBpbmRleCA8IGNvdW50KVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBzdGVwO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJhbmdlID0gcmFuZ2U7XG4gICAgZnVuY3Rpb24gcmFuZ2VEb3duKHN0YXJ0LCBjb3VudCwgc3RlcCA9IDEpIHtcbiAgICAgICAgc3RlcCA9IE1hdGguYWJzKHN0ZXApICogLTE7XG4gICAgICAgIHJldHVybiByYW5nZShzdGFydCwgY291bnQsIHN0ZXApO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJhbmdlRG93biA9IHJhbmdlRG93bjtcbiAgICAvLyBzdGVwID0gLTEgYmVoYXZlcyB0aGUgc2FtZSBhcyB0b05lZ2F0aXZlSW5maW5pdHk7XG4gICAgZnVuY3Rpb24gdG9JbmZpbml0eShzdGFydCA9IDAsIHN0ZXAgPSAxKSB7XG4gICAgICAgIGlmICghaXNGaW5pdGUoc3RhcnQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0YXJ0XCIsIHN0YXJ0LCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgaWYgKCFzdGVwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgdmFsaWQgdmFsdWVcIik7XG4gICAgICAgIGlmICghaXNGaW5pdGUoc3RlcCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc3RhcnQ7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnRvSW5maW5pdHkgPSB0b0luZmluaXR5O1xuICAgIGZ1bmN0aW9uIHRvTmVnYXRpdmVJbmZpbml0eShzdGFydCA9IDAsIHN0ZXAgPSAxKSB7XG4gICAgICAgIHJldHVybiB0b0luZmluaXR5KHN0YXJ0LCAtc3RlcCk7XG4gICAgfVxuICAgIEVudW1lcmFibGUudG9OZWdhdGl2ZUluZmluaXR5ID0gdG9OZWdhdGl2ZUluZmluaXR5O1xuICAgIGZ1bmN0aW9uIHJhbmdlVG8oc3RhcnQsIHRvLCBzdGVwID0gMSkge1xuICAgICAgICBpZiAoaXNOYU4odG8pIHx8ICFpc0Zpbml0ZSh0bykpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwidG9cIiwgdG8sIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICBpZiAoc3RlcCAmJiAhaXNGaW5pdGUoc3RlcCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSBmaW5pdGUgbm9uLXplcm8gbnVtYmVyLlwiKTtcbiAgICAgICAgLy8gVGhpcyB3YXkgd2UgYWRqdXN0IGZvciB0aGUgZGVsdGEgZnJvbSBzdGFydCBhbmQgdG8gc28gdGhlIHVzZXIgY2FuIHNheSArLy0gc3RlcCBhbmQgaXQgd2lsbCB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICBzdGVwID0gTWF0aC5hYnMoc3RlcCk7XG4gICAgICAgIHJldHVybiBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHsgdmFsdWUgPSBzdGFydDsgfSwgc3RhcnQgPCB0b1xuICAgICAgICAgICAgICAgID8geWllbGRlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZSA8PSB0byAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogeWllbGRlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZSA+PSB0byAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIC09IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5yYW5nZVRvID0gcmFuZ2VUbztcbiAgICBmdW5jdGlvbiBtYXRjaGVzKGlucHV0LCBwYXR0ZXJuLCBmbGFncyA9IFwiXCIpIHtcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiaW5wdXRcIik7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgaW5wdXQ7XG4gICAgICAgIGlmICh0eXBlICE9IFR5cGUuU1RSSU5HKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGV4ZWMgUmVnRXhwIG1hdGNoZXMgb2YgdHlwZSAnXCIgKyB0eXBlICsgXCInLlwiKTtcbiAgICAgICAgaWYgKHBhdHRlcm4gaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIGZsYWdzICs9IChwYXR0ZXJuLmlnbm9yZUNhc2UpID8gXCJpXCIgOiBcIlwiO1xuICAgICAgICAgICAgZmxhZ3MgKz0gKHBhdHRlcm4ubXVsdGlsaW5lKSA/IFwibVwiIDogXCJcIjtcbiAgICAgICAgICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNvdXJjZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmxhZ3MuaW5kZXhPZihcImdcIikgPT09IC0xKVxuICAgICAgICAgICAgZmxhZ3MgKz0gXCJnXCI7XG4gICAgICAgIHJldHVybiBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVnZXg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAocGF0dGVybiwgZmxhZ3MpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDYWxsaW5nIHJlZ2V4LmV4ZWMgY29uc2VjdXRpdmVseSBvbiB0aGUgc2FtZSBpbnB1dCB1c2VzIHRoZSBsYXN0SW5kZXggdG8gc3RhcnQgdGhlIG5leHQgbWF0Y2guXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhpbnB1dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKG1hdGNoKVxuICAgICAgICAgICAgICAgICAgICA6IHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1hdGNoZXMgPSBtYXRjaGVzO1xuICAgIGZ1bmN0aW9uIGdlbmVyYXRlKGZhY3RvcnksIGNvdW50ID0gSW5maW5pdHkpIHtcbiAgICAgICAgaWYgKCFmYWN0b3J5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImZhY3RvcnlcIik7XG4gICAgICAgIGlmIChpc05hTihjb3VudCkgfHwgY291bnQgPD0gMClcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIHJldHVybiBpc0Zpbml0ZShjb3VudCkgJiYgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIilcbiAgICAgICAgICAgID8gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjID0gY291bnQ7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPCBjICYmIHlpZWxkZXIueWllbGRSZXR1cm4oZmFjdG9yeShjdXJyZW50KSk7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZhY3RvcnkgPSBOVUxMO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWZhY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihmYWN0b3J5KGluZGV4KyspKTtcbiAgICAgICAgICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5ID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG4gICAgdmFyIHJhbmRvbTtcbiAgICAoZnVuY3Rpb24gKHJhbmRvbSkge1xuICAgICAgICBmdW5jdGlvbiBmbG9hdHMobWF4RXhjbHVzaXZlID0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlKFJhbmRvbS5nZW5lcmF0ZShtYXhFeGNsdXNpdmUpKTtcbiAgICAgICAgfVxuICAgICAgICByYW5kb20uZmxvYXRzID0gZmxvYXRzO1xuICAgICAgICBmdW5jdGlvbiBpbnRlZ2Vycyhib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGUoUmFuZG9tLmdlbmVyYXRlLmludGVnZXJzKGJvdW5kYXJ5LCBpbmNsdXNpdmUpKTtcbiAgICAgICAgfVxuICAgICAgICByYW5kb20uaW50ZWdlcnMgPSBpbnRlZ2VycztcbiAgICB9KShyYW5kb20gPSBFbnVtZXJhYmxlLnJhbmRvbSB8fCAoRW51bWVyYWJsZS5yYW5kb20gPSB7fSkpO1xuICAgIGZ1bmN0aW9uIHVuZm9sZChzZWVkLCB2YWx1ZUZhY3RvcnksIHNraXBTZWVkID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF2YWx1ZUZhY3RvcnkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiZmFjdG9yeVwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICBsZXQgaXNGaXJzdDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHNlZWQ7XG4gICAgICAgICAgICAgICAgaXNGaXJzdCA9ICFza2lwU2VlZDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCF2YWx1ZUZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIGxldCBpID0gaW5kZXgrKztcbiAgICAgICAgICAgICAgICBpZiAoaXNGaXJzdClcbiAgICAgICAgICAgICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZUZhY3RvcnkodmFsdWUsIGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHZhbHVlRmFjdG9yeSA9IE5VTEw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnVuZm9sZCA9IHVuZm9sZDtcbiAgICBmdW5jdGlvbiBmb3JFYWNoKGVudW1lcmFibGUsIGFjdGlvbiwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICAgICAgLy8gV2lsbCBwcm9wZXJseSBkaXNwb3NlIGNyZWF0ZWQgZW51bWVyYWJsZS5cbiAgICAgICAgLy8gV2lsbCB0aHJvdyBpZiBlbnVtZXJhYmxlIGlzIGVuZGxlc3MuXG4gICAgICAgIHJldHVybiBlbnVtVXRpbC5mb3JFYWNoKGVudW1lcmFibGUsIGFjdGlvbiwgbWF4KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiBtYXAoZW51bWVyYWJsZSwgc2VsZWN0b3IpIHtcbiAgICAgICAgLy8gV2lsbCBwcm9wZXJseSBkaXNwb3NlIGNyZWF0ZWQgZW51bWVyYWJsZS5cbiAgICAgICAgLy8gV2lsbCB0aHJvdyBpZiBlbnVtZXJhYmxlIGlzIGVuZGxlc3MuXG4gICAgICAgIHJldHVybiBlbnVtVXRpbC5tYXAoZW51bWVyYWJsZSwgc2VsZWN0b3IpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1hcCA9IG1hcDtcbiAgICAvLyBTbGlnaHRseSBvcHRpbWl6ZWQgdmVyc2lvbnMgZm9yIG51bWJlcnMuXG4gICAgZnVuY3Rpb24gbWF4KHZhbHVlcykge1xuICAgICAgICBjb25zdCB2ID0gdmFsdWVzXG4gICAgICAgICAgICAudGFrZVVudGlsKHYgPT4gdiA9PSArSW5maW5pdHksIHRydWUpXG4gICAgICAgICAgICAuYWdncmVnYXRlKEZ1bmN0aW9ucy5HcmVhdGVyKTtcbiAgICAgICAgcmV0dXJuIHYgPT09IFZPSUQwID8gTmFOIDogdjtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5tYXggPSBtYXg7XG4gICAgZnVuY3Rpb24gbWluKHZhbHVlcykge1xuICAgICAgICBjb25zdCB2ID0gdmFsdWVzXG4gICAgICAgICAgICAudGFrZVVudGlsKHYgPT4gdiA9PSAtSW5maW5pdHksIHRydWUpXG4gICAgICAgICAgICAuYWdncmVnYXRlKEZ1bmN0aW9ucy5MZXNzZXIpO1xuICAgICAgICByZXR1cm4gdiA9PT0gVk9JRDAgPyBOYU4gOiB2O1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1pbiA9IG1pbjtcbiAgICAvKipcbiAgICAgKiBUYWtlcyBhbnkgc2V0IG9mIGNvbGxlY3Rpb25zIG9mIHRoZSBzYW1lIHR5cGUgYW5kIHdlYXZlcyB0aGVtIHRvZ2V0aGVyLlxuICAgICAqIEBwYXJhbSBlbnVtZXJhYmxlc1xuICAgICAqIEByZXR1cm5zIHtFbnVtZXJhYmxlPFQ+fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdlYXZlKGVudW1lcmFibGVzKSB7XG4gICAgICAgIGlmICghZW51bWVyYWJsZXMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdlbnVtZXJhYmxlcycpO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcXVldWU7XG4gICAgICAgICAgICBsZXQgbWFpbkVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuICAgICAgICAgICAgICAgIG1haW5FbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShlbnVtZXJhYmxlcyk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgbGV0IGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vIEZpcnN0IHBhc3MuLi5cbiAgICAgICAgICAgICAgICBpZiAobWFpbkVudW1lcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFlICYmIG1haW5FbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjID0gbWFpbkVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUgPSBuZXh0RW51bWVyYXRvcihxdWV1ZSwgYyA/IGVudW1VdGlsLmZyb20oYykgOiBOVUxMKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluRW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlICghZSAmJiBxdWV1ZS50cnlEZXF1ZXVlKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZSA9IG5leHRFbnVtZXJhdG9yKHF1ZXVlLCBlbnVtVXRpbC5mcm9tKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICAgICAgICAgIHJldHVybiBlXG4gICAgICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihlLmN1cnJlbnQpXG4gICAgICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2UudGhlc2Uubm9Db3B5KHF1ZXVlLmR1bXAoKSk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gTlVMTDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1haW5FbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBtYWluRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgbWFpbkVudW1lcmF0b3IgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUud2VhdmUgPSB3ZWF2ZTtcbn0pKEVudW1lcmFibGUgfHwgKEVudW1lcmFibGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgRW51bWVyYWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbnEuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS5MaW5xL0xpbnEuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmNvbnN0IE5BTUUgPSAnRXhjZXB0aW9uJztcbi8qKlxuICogUmVwcmVzZW50cyBlcnJvcnMgdGhhdCBvY2N1ciBkdXJpbmcgYXBwbGljYXRpb24gZXhlY3V0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgRXhjZXB0aW9uIGNsYXNzIHdpdGggYSBzcGVjaWZpZWQgZXJyb3IgbWVzc2FnZSBhbmQgb3B0aW9uYWxseSBhIHJlZmVyZW5jZSB0byB0aGUgaW5uZXIgZXhjZXB0aW9uIHRoYXQgaXMgdGhlIGNhdXNlIG9mIHRoaXMgZXhjZXB0aW9uLlxuICAgICAqIEBwYXJhbSBtZXNzYWdlXG4gICAgICogQHBhcmFtIGlubmVyRXhjZXB0aW9uXG4gICAgICogQHBhcmFtIGJlZm9yZVNlYWxpbmcgVGhpcyBkZWxlZ2F0ZSBpcyB1c2VkIHRvIGFsbG93IGFjdGlvbnMgdG8gb2NjdXIganVzdCBiZWZvcmUgdGhpcyBjb25zdHJ1Y3RvciBmaW5pc2hlcy4gIFNpbmNlIHNvbWUgY29tcGlsZXJzIGRvIG5vdCBhbGxvdyB0aGUgdXNlIG9mICd0aGlzJyBiZWZvcmUgc3VwZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIGJlZm9yZVNlYWxpbmcpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHRoaXMubmFtZSA9IF8uZ2V0TmFtZSgpO1xuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICAgICAgaWYgKGlubmVyRXhjZXB0aW9uKVxuICAgICAgICAgICAgXy5kYXRhWydpbm5lckV4Y2VwdGlvbiddID0gaW5uZXJFeGNlcHRpb247XG4gICAgICAgIC8qIE9yaWdpbmFsbHkgaW50ZW5kZWQgdG8gdXNlICdnZXQnIGFjY2Vzc29ycyBmb3IgcHJvcGVydGllcyxcbiAgICAgICAgICogQnV0IGRlYnVnZ2VycyBkb24ndCBkaXNwbGF5IHRoZXNlIHJlYWRpbHkgeWV0LlxuICAgICAgICAgKiBPYmplY3QuZnJlZXplIGhhcyB0byBiZSB1c2VkIGNhcmVmdWxseSwgYnV0IHdpbGwgcHJldmVudCBvdmVycmlkaW5nIHZhbHVlcyBhdCBydW50aW1lLlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGJlZm9yZVNlYWxpbmcpXG4gICAgICAgICAgICBiZWZvcmVTZWFsaW5nKF8pO1xuICAgICAgICAvLyBOb2RlIGhhcyBhIC5zdGFjaywgbGV0J3MgdXNlIGl0Li4uXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc3RhY2sgPSBldmFsKFwibmV3IEVycm9yKClcIikuc3RhY2s7XG4gICAgICAgICAgICBzdGFjayA9IHN0YWNrXG4gICAgICAgICAgICAgICAgJiYgc3RhY2tcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL15FcnJvclxcbi8sICcnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKC58XFxuKStcXHMrYXQgbmV3LisvLCAnJylcbiAgICAgICAgICAgICAgICB8fCAnJztcbiAgICAgICAgICAgIHRoaXMuc3RhY2sgPSBfLnRvU3RyaW5nV2l0aG91dEJyYWNrZXRzKCkgKyBzdGFjaztcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXgpIHsgfVxuICAgICAgICBPYmplY3QuZnJlZXplKF8pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgdHlwZS5cbiAgICAgKiBUaGUgZGVmYXVsdCBpcyAnRXJyb3InLlxuICAgICAqL1xuICAgIGdldE5hbWUoKSB7IHJldHVybiBOQU1FOyB9XG4gICAgLyoqXG4gICAgICogVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgRXhjZXB0aW9uIGluc3RhbmNlLlxuICAgICAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYFske3RoaXMudG9TdHJpbmdXaXRob3V0QnJhY2tldHMoKX1dYDtcbiAgICB9XG4gICAgdG9TdHJpbmdXaXRob3V0QnJhY2tldHMoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBtID0gXy5tZXNzYWdlO1xuICAgICAgICByZXR1cm4gXy5uYW1lICsgKG0gPyAoJzogJyArIG0pIDogJycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGRhdGEgb2JqZWN0LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIGZvciAobGV0IGsgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaykpXG4gICAgICAgICAgICAgICAgZGVsZXRlIGRhdGFba107XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCAqIGFzIFZhbHVlcyBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuLyogIHZhbGlkYXRlU2l6ZTogVXRpbGl0eSBmb3IgcXVpY2sgdmFsaWRhdGlvbi9pbnZhbGlkYXRpb24gb2YgYXJyYXkgZXF1YWxpdHkuXG4gICAgV2h5IHRoaXMgd2F5PyAgV2h5IG5vdCBwYXNzIGEgY2xvc3VyZSBmb3IgdGhlIGxhc3QgcmV0dXJuP1xuICAgIFJlYXNvbjogUGVyZm9ybWFuY2UgYW5kIGF2b2lkaW5nIHRoZSBjcmVhdGlvbiBvZiBuZXcgZnVuY3Rpb25zL2Nsb3N1cmVzLiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVTaXplKGEsIGIpIHtcbiAgICAvLyBCb3RoIHZhbGlkIGFuZCBhcmUgc2FtZSBvYmplY3QsIG9yIGJvdGggYXJlIG51bGwvdW5kZWZpbmVkLlxuICAgIGlmIChhICYmIGIgJiYgYSA9PT0gYiB8fCAhYSAmJiAhYilcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gQXQgdGhpcyBwb2ludCwgYXQgbGVhc3Qgb25lIGhhcyB0byBiZSBub24tbnVsbC5cbiAgICBpZiAoIWEgfHwgIWIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBsZW4gPSBhLmxlbmd0aDtcbiAgICBpZiAobGVuICE9PSBiLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vIElmIGJvdGggYXJlIGFycmF5cyBhbmQgaGF2ZSB6ZXJvIGxlbmd0aCwgdGhleSBhcmUgZXF1YWwuXG4gICAgaWYgKGxlbiA9PT0gMClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gUmV0dXJuIHRoZSBsZW5ndGggZm9yIGRvd25zdHJlYW0gcHJvY2Vzc2luZy5cbiAgICByZXR1cm4gbGVuO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFsbEVxdWFsKGFycmF5cywgc3RyaWN0ID0gdHJ1ZSwgZXF1YWxpdHlDb21wYXJlciA9IFZhbHVlcy5hcmVFcXVhbCkge1xuICAgIGlmICghYXJyYXlzKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudE51bGxFeGNlcHRpb246ICdhcnJheXMnIGNhbm5vdCBiZSBudWxsLlwiKTtcbiAgICBpZiAoYXJyYXlzLmxlbmd0aCA8IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjb21wYXJlIGEgc2V0IG9mIGFycmF5cyBsZXNzIHRoYW4gMi5cIik7XG4gICAgaWYgKFR5cGUuaXNGdW5jdGlvbihzdHJpY3QpKSB7XG4gICAgICAgIGVxdWFsaXR5Q29tcGFyZXIgPSBzdHJpY3Q7XG4gICAgICAgIHN0cmljdCA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGZpcnN0ID0gYXJyYXlzWzBdO1xuICAgIGZvciAobGV0IGkgPSAxLCBsID0gYXJyYXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoIWFyZUVxdWFsKGZpcnN0LCBhcnJheXNbaV0sIHN0cmljdCwgZXF1YWxpdHlDb21wYXJlcikpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFyZUVxdWFsKGEsIGIsIHN0cmljdCA9IHRydWUsIGVxdWFsaXR5Q29tcGFyZXIgPSBWYWx1ZXMuYXJlRXF1YWwpIHtcbiAgICBjb25zdCBsZW4gPSB2YWxpZGF0ZVNpemUoYSwgYik7XG4gICAgaWYgKFR5cGUuaXNCb29sZWFuKGxlbikpXG4gICAgICAgIHJldHVybiBsZW47XG4gICAgaWYgKFR5cGUuaXNGdW5jdGlvbihzdHJpY3QpKSB7XG4gICAgICAgIGVxdWFsaXR5Q29tcGFyZXIgPSBzdHJpY3Q7XG4gICAgICAgIHN0cmljdCA9IHRydWU7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKCFlcXVhbGl0eUNvbXBhcmVyKGFbaV0sIGJbaV0sIHN0cmljdCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gaW50ZXJuYWxTb3J0KGEsIGNvbXBhcmVyKSB7XG4gICAgaWYgKCFhIHx8IGEubGVuZ3RoIDwgMilcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgY29uc3QgbGVuID0gYS5sZW5ndGg7XG4gICAgbGV0IGI7XG4gICAgaWYgKGxlbiA+IDY1NTM2KVxuICAgICAgICBiID0gbmV3IEFycmF5KGxlbik7XG4gICAgZWxzZSB7XG4gICAgICAgIGIgPSBbXTtcbiAgICAgICAgYi5sZW5ndGggPSBsZW47XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgYltpXSA9IGFbaV07XG4gICAgfVxuICAgIGIuc29ydChjb21wYXJlcik7XG4gICAgcmV0dXJuIGI7XG59XG5leHBvcnQgZnVuY3Rpb24gYXJlRXF1aXZhbGVudChhLCBiLCBjb21wYXJlciA9IFZhbHVlcy5jb21wYXJlKSB7XG4gICAgY29uc3QgbGVuID0gdmFsaWRhdGVTaXplKGEsIGIpO1xuICAgIGlmIChUeXBlLmlzQm9vbGVhbihsZW4pKVxuICAgICAgICByZXR1cm4gbGVuO1xuICAgIC8vIFRoZXJlIG1pZ2h0IGJlIGEgYmV0dGVyIG1vcmUgcGVyZm9ybWFudCB3YXkgdG8gZG8gdGhpcywgYnV0IGZvciB0aGUgbW9tZW50LCB0aGlzXG4gICAgLy8gd29ya3MgcXVpdGUgd2VsbC5cbiAgICBhID0gaW50ZXJuYWxTb3J0KGEsIGNvbXBhcmVyKTtcbiAgICBiID0gaW50ZXJuYWxTb3J0KGIsIGNvbXBhcmVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChjb21wYXJlcihhW2ldLCBiW2ldKSAhPT0gMClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db21wYXJlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvQ29tcGFyZS5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVGFza0hhbmRsZXJCYXNlIH0gZnJvbSBcIi4vVGFza0hhbmRsZXJCYXNlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIFRhc2tIYW5kbGVyIGV4dGVuZHMgVGFza0hhbmRsZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihfYWN0aW9uKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2FjdGlvbiA9IF9hY3Rpb247XG4gICAgICAgIGlmICghX2FjdGlvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FjdGlvbicpO1xuICAgIH1cbiAgICBfb25FeGVjdXRlKCkge1xuICAgICAgICB0aGlzLl9hY3Rpb24oKTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9hY3Rpb24gPSBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFRhc2tIYW5kbGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFza0hhbmRsZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UaHJlYWRpbmcvVGFza3MvVGFza0hhbmRsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9IFwiVGFza0hhbmRsZXJCYXNlXCI7XG4vKipcbiAqIEEgc2ltcGxlIGNsYXNzIGZvciBoYW5kbGluZyBwb3RlbnRpYWxseSByZXBlYXRlZCBleGVjdXRpb25zIGVpdGhlciBkZWZlcnJlZCBvciBpbW1lZGlhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBUYXNrSGFuZGxlckJhc2UgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gTkFNRTtcbiAgICAgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gMCAvKiBDcmVhdGVkICovO1xuICAgIH1cbiAgICBnZXQgaXNTY2hlZHVsZWQoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX3RpbWVvdXRJZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NoZWR1bGVzL1Jlc2NoZWR1bGVzIHRyaWdnZXJpbmcgdGhlIHRhc2suXG4gICAgICogQHBhcmFtIGRlZmVyIE9wdGlvbmFsIHRpbWUgdG8gd2FpdCB1bnRpbCB0cmlnZ2VyaW5nLlxuICAgICAqL1xuICAgIHN0YXJ0KGRlZmVyID0gMCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLl9zdGF0dXMgPSAxIC8qIFdhaXRpbmdUb1J1biAqLztcbiAgICAgICAgaWYgKCEoZGVmZXIgPiAwKSlcbiAgICAgICAgICAgIGRlZmVyID0gMDsgLy8gQSBuZWdhdGlvbiBpcyB1c2VkIHRvIGNhdGNoIGVkZ2UgY2FzZXMuXG4gICAgICAgIGlmIChpc0Zpbml0ZShkZWZlcikpXG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0SWQgPSBzZXRUaW1lb3V0KFRhc2tIYW5kbGVyQmFzZS5faGFuZGxlciwgZGVmZXIsIHRoaXMpO1xuICAgIH1cbiAgICBydW5TeW5jaHJvbm91c2x5KCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBUYXNrSGFuZGxlckJhc2UuX2hhbmRsZXIodGhpcyk7XG4gICAgfVxuICAgIGdldFN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cztcbiAgICB9XG4gICAgZ2V0IHN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdHVzKCk7XG4gICAgfVxuICAgIC8vIFVzZSBhIHN0YXRpYyBmdW5jdGlvbiBoZXJlIHRvIGF2b2lkIHJlY3JlYXRpbmcgYSBuZXcgZnVuY3Rpb24gZXZlcnkgdGltZS5cbiAgICBzdGF0aWMgX2hhbmRsZXIoZCkge1xuICAgICAgICBkLmNhbmNlbCgpO1xuICAgICAgICBkLl9zdGF0dXMgPSAyIC8qIFJ1bm5pbmcgKi87XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkLl9vbkV4ZWN1dGUoKTtcbiAgICAgICAgICAgIGQuX3N0YXR1cyA9IDMgLyogUmFuVG9Db21wbGV0aW9uICovO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgZC5fc3RhdHVzID0gNSAvKiBGYXVsdGVkICovO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IG51bGw7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLl90aW1lb3V0SWQ7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zdGF0dXMgPSA0IC8qIENhbmNlbGxlZCAqLztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBUYXNrSGFuZGxlckJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UYXNrSGFuZGxlckJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UaHJlYWRpbmcvVGFza3MvVGFza0hhbmRsZXJCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIE9yaWdpbmFsOiBodHRwOi8vbGlucWpzLmNvZGVwbGV4LmNvbS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBhcmVFcXVhbCB9IGZyb20gXCIuLi8uLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yQmFzZVwiO1xuaW1wb3J0IHsgTGlua2VkTm9kZUxpc3QgfSBmcm9tIFwiLi4vTGlua2VkTm9kZUxpc3RcIjtcbmltcG9ydCB7IE9iamVjdFBvb2wgfSBmcm9tIFwiLi4vLi4vRGlzcG9zYWJsZS9PYmplY3RQb29sXCI7XG5pbXBvcnQgeyBnZXRJZGVudGlmaWVyIH0gZnJvbSBcIi4vZ2V0SWRlbnRpZmllclwiO1xuaW1wb3J0IERpY3Rpb25hcnlCYXNlIGZyb20gXCIuL0RpY3Rpb25hcnlCYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuLy8gTGlua2VkTGlzdCBmb3IgRGljdGlvbmFyeVxuY2xhc3MgSGFzaEVudHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihrZXksIHZhbHVlLCBwcmV2aW91cywgbmV4dCkge1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnByZXZpb3VzID0gcHJldmlvdXM7XG4gICAgICAgIHRoaXMubmV4dCA9IG5leHQ7XG4gICAgfVxufVxubGV0IGxpbmtlZExpc3RQb29sO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmZ1bmN0aW9uIGxpbmtlZE5vZGVMaXN0KHJlY3ljbGUpIHtcbiAgICBpZiAoIWxpbmtlZExpc3RQb29sKVxuICAgICAgICBsaW5rZWRMaXN0UG9vbFxuICAgICAgICAgICAgPSBuZXcgT2JqZWN0UG9vbCgyMCwgKCkgPT4gbmV3IExpbmtlZE5vZGVMaXN0KCksIHIgPT4gci5jbGVhcigpKTtcbiAgICBpZiAoIXJlY3ljbGUpXG4gICAgICAgIHJldHVybiBsaW5rZWRMaXN0UG9vbC50YWtlKCk7XG4gICAgbGlua2VkTGlzdFBvb2wuYWRkKHJlY3ljbGUpO1xufVxuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnkgZXh0ZW5kcyBEaWN0aW9uYXJ5QmFzZSB7XG4gICAgY29uc3RydWN0b3IoX2tleUdlbmVyYXRvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9rZXlHZW5lcmF0b3IgPSBfa2V5R2VuZXJhdG9yO1xuICAgICAgICB0aGlzLl9lbnRyaWVzID0gbGlua2VkTm9kZUxpc3QoKTtcbiAgICAgICAgdGhpcy5fYnVja2V0cyA9IHt9O1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9lbnRyaWVzID0gbnVsbDtcbiAgICAgICAgXy5fYnVja2V0cyA9IG51bGw7XG4gICAgICAgIF8uX2hhc2hHZW5lcmF0b3IgPSBudWxsO1xuICAgIH1cbiAgICBnZXRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudHJpZXMgJiYgdGhpcy5fZW50cmllcy51bnNhZmVDb3VudCB8fCAwO1xuICAgIH1cbiAgICBfZ2V0QnVja2V0KGhhc2gsIGNyZWF0ZUlmTWlzc2luZykge1xuICAgICAgICBpZiAoaGFzaCA9PSBudWxsIHx8ICFjcmVhdGVJZk1pc3NpbmcgJiYgIXRoaXMuZ2V0Q291bnQoKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoIVR5cGUuaXNQcmltaXRpdmVPclN5bWJvbChoYXNoKSlcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIktleSB0eXBlIG5vdCBpbmRleGFibGUgYW5kIGNvdWxkIGNhdXNlIERpY3Rpb25hcnkgdG8gYmUgZXh0cmVtZWx5IHNsb3cuXCIpO1xuICAgICAgICBjb25zdCBidWNrZXRzID0gdGhpcy5fYnVja2V0cztcbiAgICAgICAgbGV0IGJ1Y2tldCA9IGJ1Y2tldHNbaGFzaF07XG4gICAgICAgIGlmIChjcmVhdGVJZk1pc3NpbmcgJiYgIWJ1Y2tldClcbiAgICAgICAgICAgIGJ1Y2tldHNbaGFzaF1cbiAgICAgICAgICAgICAgICA9IGJ1Y2tldFxuICAgICAgICAgICAgICAgICAgICA9IGxpbmtlZE5vZGVMaXN0KCk7XG4gICAgICAgIHJldHVybiBidWNrZXQgfHwgbnVsbDtcbiAgICB9XG4gICAgX2dldEJ1Y2tldEVudHJ5KGtleSwgaGFzaCwgYnVja2V0KSB7XG4gICAgICAgIGlmIChrZXkgPT0gbnVsbCB8fCAhdGhpcy5nZXRDb3VudCgpKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzLCBjb21wYXJlciA9IF8uX2tleUdlbmVyYXRvciwgY29tcGFyZUtleSA9IGNvbXBhcmVyID8gY29tcGFyZXIoa2V5KSA6IGtleTtcbiAgICAgICAgaWYgKCFidWNrZXQpXG4gICAgICAgICAgICBidWNrZXQgPSBfLl9nZXRCdWNrZXQoaGFzaCB8fCBnZXRJZGVudGlmaWVyKGNvbXBhcmVLZXkpKTtcbiAgICAgICAgcmV0dXJuIGJ1Y2tldFxuICAgICAgICAgICAgJiYgKGNvbXBhcmVyXG4gICAgICAgICAgICAgICAgPyBidWNrZXQuZmluZChlID0+IGNvbXBhcmVyKGUua2V5KSA9PT0gY29tcGFyZUtleSlcbiAgICAgICAgICAgICAgICA6IGJ1Y2tldC5maW5kKGUgPT4gZS5rZXkgPT09IGNvbXBhcmVLZXkpKTtcbiAgICB9XG4gICAgX2dldEVudHJ5KGtleSkge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZ2V0QnVja2V0RW50cnkoa2V5KTtcbiAgICAgICAgcmV0dXJuIGUgJiYgZS52YWx1ZTtcbiAgICB9XG4gICAgZ2V0VmFsdWUoa2V5KSB7XG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLl9nZXRFbnRyeShrZXkpO1xuICAgICAgICByZXR1cm4gZSA/IGUudmFsdWUgOiBWT0lEMDtcbiAgICB9XG4gICAgX3NldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgYnVja2V0cyA9IF8uX2J1Y2tldHMsIGVudHJpZXMgPSBfLl9lbnRyaWVzLCBjb21wYXJlS2V5ID0gXy5fa2V5R2VuZXJhdG9yID8gXy5fa2V5R2VuZXJhdG9yKGtleSkgOiBrZXksIGhhc2ggPSBnZXRJZGVudGlmaWVyKGNvbXBhcmVLZXkpO1xuICAgICAgICBsZXQgYnVja2V0ID0gXy5fZ2V0QnVja2V0KGhhc2gpO1xuICAgICAgICBjb25zdCBidWNrZXRFbnRyeSA9IGJ1Y2tldCAmJiBfLl9nZXRCdWNrZXRFbnRyeShrZXksIGhhc2gsIGJ1Y2tldCk7XG4gICAgICAgIC8vIEVudHJ5IGV4aXRzPyBEZWxldGUgb3IgdXBkYXRlXG4gICAgICAgIGlmIChidWNrZXRFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgYiA9IGJ1Y2tldDtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gVk9JRDApIHtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IGIucmVtb3ZlTm9kZShidWNrZXRFbnRyeSksIHkgPSBlbnRyaWVzLnJlbW92ZU5vZGUoYnVja2V0RW50cnkudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICh4ICYmICFiLmNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBidWNrZXRzW2hhc2hdO1xuICAgICAgICAgICAgICAgICAgICBsaW5rZWROb2RlTGlzdChiKTtcbiAgICAgICAgICAgICAgICAgICAgYnVja2V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHggIT09IHkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiRW50cmllcyBhbmQgYnVja2V0cyBhcmUgb3V0IG9mIHN5bmMuXCI7XG4gICAgICAgICAgICAgICAgaWYgKHgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgZXhwb3NlIHRoZSBpbnRlcm5hbCBoYXNoIGVudHJpZXMgc28gcmVwbGFjaW5nIHRoZSB2YWx1ZSBpcyBvay5cbiAgICAgICAgICAgICAgICBjb25zdCBvbGQgPSBidWNrZXRFbnRyeS52YWx1ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICBidWNrZXRFbnRyeS52YWx1ZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiAhYXJlRXF1YWwodmFsdWUsIG9sZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgIT09IFZPSUQwKSB7XG4gICAgICAgICAgICBpZiAoIWJ1Y2tldClcbiAgICAgICAgICAgICAgICBidWNrZXQgPSBfLl9nZXRCdWNrZXQoaGFzaCwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAoIWJ1Y2tldClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFwiJHtoYXNofVwiIGNhbm5vdCBiZSBhZGRlZCB0byBsb29rdXAgdGFibGUuYCk7XG4gICAgICAgICAgICBsZXQgZW50cnkgPSBuZXcgSGFzaEVudHJ5KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgZW50cmllcy5hZGROb2RlKGVudHJ5KTtcbiAgICAgICAgICAgIGJ1Y2tldC5hZGROb2RlKG5ldyBIYXNoRW50cnkoa2V5LCBlbnRyeSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfY2xlYXJJbnRlcm5hbCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGJ1Y2tldHMgPSBfLl9idWNrZXRzO1xuICAgICAgICAvLyBFbnN1cmUgcmVzZXQgYW5kIGNsZWFuLi4uXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBidWNrZXRzKSB7XG4gICAgICAgICAgICBpZiAoYnVja2V0cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJ1Y2tldCA9IGJ1Y2tldHNba2V5XTtcbiAgICAgICAgICAgICAgICBkZWxldGUgYnVja2V0c1trZXldO1xuICAgICAgICAgICAgICAgIGxpbmtlZE5vZGVMaXN0KGJ1Y2tldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8uX2VudHJpZXMuY2xlYXIoKTtcbiAgICB9XG4gICAgLypcbiAgICAgKiBOb3RlOiBzdXBlci5nZXRFbnVtZXJhdG9yKCkgd29ya3MgcGVyZmVjdGx5IHdlbGwsXG4gICAgICogYnV0IGVudW1lcmF0aW5nIHRoZSBpbnRlcm5hbCBsaW5rZWQgbm9kZSBsaXN0IGlzIG11Y2ggbW9yZSBlZmZpY2llbnQuXG4gICAgICovXG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCB2ZXIsIGN1cnJlbnRFbnRyeTtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgdmVyID0gXy5fdmVyc2lvbjtcbiAgICAgICAgICAgIGN1cnJlbnRFbnRyeSA9IF8uX2VudHJpZXMuZmlyc3Q7XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoY3VycmVudEVudHJ5KSB7XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgICAgICBfLmFzc2VydFZlcnNpb24odmVyKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IGtleTogY3VycmVudEVudHJ5LmtleSwgdmFsdWU6IGN1cnJlbnRFbnRyeS52YWx1ZSB9O1xuICAgICAgICAgICAgICAgIGN1cnJlbnRFbnRyeSA9IGN1cnJlbnRFbnRyeS5uZXh0IHx8IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldEtleXMoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IGUgPSBfLl9lbnRyaWVzICYmIF8uX2VudHJpZXMuZmlyc3Q7XG4gICAgICAgIHdoaWxlIChlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChlLmtleSk7XG4gICAgICAgICAgICBlID0gZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGdldFZhbHVlcygpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgZSA9IF8uX2VudHJpZXMgJiYgXy5fZW50cmllcy5maXJzdDtcbiAgICAgICAgd2hpbGUgKGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGUudmFsdWUpO1xuICAgICAgICAgICAgZSA9IGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IERpY3Rpb25hcnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaWN0aW9uYXJ5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRGljdGlvbmFyaWVzL0RpY3Rpb25hcnkuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCIuLi9UZXh0L1V0aWxpdHlcIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJTVBPUlRBTlQgTk9URVMgQUJPVVQgUEVSRk9STUFOQ0U6XG4gKiBodHRwOi8vanNwZXJmLmNvbS9zaW11bGF0aW5nLWEtcXVldWVcbiAqXG4gKiBBZGRpbmcgdG8gYW4gYXJyYXkgaXMgdmVyeSBmYXN0LCBidXQgbW9kaWZ5aW5nIGlzIHNsb3cuXG4gKiBMaW5rZWRMaXN0IHdpbnMgd2hlbiBtb2RpZnlpbmcgY29udGVudHMuXG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2Njg4NC9hcnJheS12ZXJzdXMtbGlua2VkLWxpc3RcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VmdWwgZm9yIG1hbmFnaW5nIGEgbGlzdCBvZiBsaW5rZWQgbm9kZXMsIGJ1dCBpdCBkb2VzIG5vdCBwcm90ZWN0IGFnYWluc3QgbW9kaWZ5aW5nIGluZGl2aWR1YWwgbGlua3MuXG4gKiBJZiB0aGUgY29uc3VtZXIgbW9kaWZpZXMgYSBsaW5rIChzZXRzIHRoZSBwcmV2aW91cyBvciBuZXh0IHZhbHVlKSBpdCB3aWxsIGVmZmVjdGl2ZWx5IGJyZWFrIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIEl0IGlzIHBvc3NpYmxlIHRvIGRlY2xhcmUgYSBub2RlIHR5cGUgb2YgYW55IGtpbmQgYXMgbG9uZyBhcyBpdCBjb250YWlucyBhIHByZXZpb3VzIGFuZCBuZXh0IHZhbHVlIHRoYXQgY2FuIHJlZmVyZW5jZSBhbm90aGVyIG5vZGUuXG4gKiBBbHRob3VnaCBub3QgYXMgc2FmZSBhcyB0aGUgaW5jbHVkZWQgTGlua2VkTGlzdCwgdGhpcyBjbGFzcyBoYXMgbGVzcyBvdmVyaGVhZCBhbmQgaXMgbW9yZSBmbGV4aWJsZS5cbiAqXG4gKiBUaGUgY291bnQgKG9yIGxlbmd0aCkgb2YgdGhpcyBMaW5rZWROb2RlTGlzdCBpcyBub3QgdHJhY2tlZCBzaW5jZSBpdCBjb3VsZCBiZSBjb3JydXB0ZWQgYXQgYW55IHRpbWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaW5rZWROb2RlTGlzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGFzdCA9IG51bGw7XG4gICAgICAgIHRoaXMudW5zYWZlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gMDtcbiAgICB9XG4gICAgYXNzZXJ0VmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgICAgIGlmICh2ZXJzaW9uICE9PSB0aGlzLl92ZXJzaW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDb2xsZWN0aW9uIHdhcyBtb2RpZmllZC5cIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZmlyc3Qgbm9kZS4gIFdpbGwgYmUgbnVsbCBpZiB0aGUgY29sbGVjdGlvbiBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBnZXQgZmlyc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGxhc3Qgbm9kZS5cbiAgICAgKi9cbiAgICBnZXQgbGFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGl2ZWx5IGNvdW50cyB0aGUgbnVtYmVyIG9mIGxpbmtlZCBub2RlcyBhbmQgcmV0dXJucyB0aGUgdmFsdWUuXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgY291bnQoKSB7XG4gICAgICAgIGxldCBuZXh0ID0gdGhpcy5fZmlyc3Q7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIG5leHQgPSBuZXh0Lm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uLCBpZ25vcmVWZXJzaW9uaW5nKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgY3VycmVudCA9IG51bGwsIG5leHQgPSBfLmZpcnN0OyAvLyBCZSBzdXJlIHRvIHRyYWNrIHRoZSBuZXh0IG5vZGUgc28gaWYgY3VycmVudCBub2RlIGlzIHJlbW92ZWQuXG4gICAgICAgIGNvbnN0IHZlcnNpb24gPSBfLl92ZXJzaW9uO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoIWlnbm9yZVZlcnNpb25pbmcpXG4gICAgICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcnNpb24pO1xuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICBuZXh0ID0gY3VycmVudCAmJiBjdXJyZW50Lm5leHQ7XG4gICAgICAgIH0gd2hpbGUgKGN1cnJlbnRcbiAgICAgICAgICAgICYmIGFjdGlvbihjdXJyZW50LCBpbmRleCsrKSAhPT0gZmFsc2UpO1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIG1hcChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoIXNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignc2VsZWN0b3InKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMuZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goc2VsZWN0b3Iobm9kZSwgaSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXJhc2VzIHRoZSBsaW5rZWQgbm9kZSdzIHJlZmVyZW5jZXMgdG8gZWFjaCBvdGhlciBhbmQgcmV0dXJucyB0aGUgbnVtYmVyIG9mIG5vZGVzLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgbiwgY0YgPSAwLCBjTCA9IDA7XG4gICAgICAgIC8vIEZpcnN0LCBjbGVhciBpbiB0aGUgZm9yd2FyZCBkaXJlY3Rpb24uXG4gICAgICAgIG4gPSBfLl9maXJzdDtcbiAgICAgICAgXy5fZmlyc3QgPSBudWxsO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgICAgY0YrKztcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gbjtcbiAgICAgICAgICAgIG4gPSBuLm5leHQ7XG4gICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIExhc3QsIGNsZWFyIGluIHRoZSByZXZlcnNlIGRpcmVjdGlvbi5cbiAgICAgICAgbiA9IF8uX2xhc3Q7XG4gICAgICAgIF8uX2xhc3QgPSBudWxsO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgICAgY0wrKztcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gbjtcbiAgICAgICAgICAgIG4gPSBuLnByZXZpb3VzO1xuICAgICAgICAgICAgY3VycmVudC5wcmV2aW91cyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNGICE9PSBjTClcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTGlua2VkTm9kZUxpc3Q6IEZvcndhcmQgdmVyc3VzIHJldmVyc2UgY291bnQgZG9lcyBub3QgbWF0Y2ggd2hlbiBjbGVhcmluZy4gRm9yd2FyZDogJyArIGNGICsgXCIsIFJldmVyc2U6IFwiICsgY0wpO1xuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gY0Y7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgbGlzdC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBsaXN0IHRvIHNlZSBpZiBhIG5vZGUgZXhpc3RzLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnMobm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKG5vZGUpICE9IC0xO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbmRleCBvZiBhIHBhcnRpY3VsYXIgbm9kZS5cbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKi9cbiAgICBnZXROb2RlQXQoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgbmV4dCA9IHRoaXMuX2ZpcnN0O1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChuZXh0ICYmIGkrKyA8IGluZGV4KSB7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dC5uZXh0IHx8IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfVxuICAgIGZpbmQoY29uZGl0aW9uKSB7XG4gICAgICAgIGxldCBub2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5mb3JFYWNoKChuLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZGl0aW9uKG4sIGkpKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG47XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBsaXN0IHRvIGZpbmQgdGhlIHNwZWNpZmllZCBub2RlIGFuZCByZXR1cm5zIGl0cyBpbmRleC5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGluZGV4T2Yobm9kZSkge1xuICAgICAgICBpZiAobm9kZSAmJiAobm9kZS5wcmV2aW91cyB8fCBub2RlLm5leHQpKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IGMsIG4gPSB0aGlzLl9maXJzdDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBjID0gbjtcbiAgICAgICAgICAgICAgICBpZiAoYyA9PT0gbm9kZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9IHdoaWxlICgobiA9IGMgJiYgYy5uZXh0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBmaXJzdCBub2RlIGFuZCByZXR1cm5zIHRydWUgaWYgc3VjY2Vzc2Z1bC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVGaXJzdCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZmlyc3QgJiYgdGhpcy5yZW1vdmVOb2RlKHRoaXMuX2ZpcnN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGFzdCBub2RlIGFuZCByZXR1cm5zIHRydWUgaWYgc3VjY2Vzc2Z1bC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVMYXN0KCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9sYXN0ICYmIHRoaXMucmVtb3ZlTm9kZSh0aGlzLl9sYXN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIG5vZGUuXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHN1Y2Nlc3NmdWwgYW5kIGZhbHNlIGlmIG5vdCBmb3VuZCAoYWxyZWFkeSByZW1vdmVkKS5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHJlbW92ZU5vZGUobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbm9kZScpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcHJldiA9IG5vZGUucHJldmlvdXMgfHwgbnVsbCwgbmV4dCA9IG5vZGUubmV4dCB8fCBudWxsO1xuICAgICAgICBsZXQgYSA9IGZhbHNlLCBiID0gZmFsc2U7XG4gICAgICAgIGlmIChwcmV2KVxuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV4dDtcbiAgICAgICAgZWxzZSBpZiAoXy5fZmlyc3QgPT0gbm9kZSlcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gbmV4dDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYSA9IHRydWU7XG4gICAgICAgIGlmIChuZXh0KVxuICAgICAgICAgICAgbmV4dC5wcmV2aW91cyA9IHByZXY7XG4gICAgICAgIGVsc2UgaWYgKF8uX2xhc3QgPT0gbm9kZSlcbiAgICAgICAgICAgIF8uX2xhc3QgPSBwcmV2O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBiID0gdHJ1ZTtcbiAgICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbignbm9kZScsIGZvcm1hdChcIlByb3ZpZGVkIG5vZGUgaXMgaGFzIG5vIHswfSByZWZlcmVuY2UgYnV0IGlzIG5vdCB0aGUgezF9IG5vZGUhXCIsIGEgPyBcInByZXZpb3VzXCIgOiBcIm5leHRcIiwgYSA/IFwiZmlyc3RcIiA6IFwibGFzdFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9ICFhICYmICFiO1xuICAgICAgICBpZiAocmVtb3ZlZCkge1xuICAgICAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICAgICAgXy51bnNhZmVDb3VudC0tO1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IG51bGw7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMge0xpbmtlZE5vZGVMaXN0fVxuICAgICAqL1xuICAgIGFkZE5vZGUobm9kZSkge1xuICAgICAgICB0aGlzLmFkZE5vZGVBZnRlcihub2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBub2RlIGJlZm9yZSB0aGUgc3BlY2lmaWVkICdiZWZvcmUnIG5vZGUuXG4gICAgICogSWYgbm8gJ2JlZm9yZScgbm9kZSBpcyBzcGVjaWZpZWQsIGl0IGluc2VydHMgaXQgYXMgdGhlIGZpcnN0IG5vZGUuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcGFyYW0gYmVmb3JlXG4gICAgICogQHJldHVybnMge0xpbmtlZE5vZGVMaXN0fVxuICAgICAqL1xuICAgIGFkZE5vZGVCZWZvcmUobm9kZSwgYmVmb3JlID0gbnVsbCkge1xuICAgICAgICBhc3NlcnRWYWxpZERldGFjaGVkKG5vZGUpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFiZWZvcmUpIHtcbiAgICAgICAgICAgIGJlZm9yZSA9IF8uX2ZpcnN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChiZWZvcmUpIHtcbiAgICAgICAgICAgIGxldCBwcmV2ID0gYmVmb3JlLnByZXZpb3VzO1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IHByZXY7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBiZWZvcmU7XG4gICAgICAgICAgICBiZWZvcmUucHJldmlvdXMgPSBub2RlO1xuICAgICAgICAgICAgaWYgKHByZXYpXG4gICAgICAgICAgICAgICAgcHJldi5uZXh0ID0gbm9kZTtcbiAgICAgICAgICAgIGlmIChiZWZvcmUgPT0gXy5fZmlyc3QpXG4gICAgICAgICAgICAgICAgXy5fZmlyc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgXy5fZmlyc3QgPSBfLl9sYXN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQrKztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBub2RlIGFmdGVyIHRoZSBzcGVjaWZpZWQgJ2FmdGVyJyBub2RlLlxuICAgICAqIElmIG5vICdhZnRlcicgbm9kZSBpcyBzcGVjaWZpZWQsIGl0IGFwcGVuZHMgaXQgYXMgdGhlIGxhc3Qgbm9kZS5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSBhZnRlclxuICAgICAqIEByZXR1cm5zIHtMaW5rZWROb2RlTGlzdH1cbiAgICAgKi9cbiAgICBhZGROb2RlQWZ0ZXIobm9kZSwgYWZ0ZXIgPSBudWxsKSB7XG4gICAgICAgIGFzc2VydFZhbGlkRGV0YWNoZWQobm9kZSk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIWFmdGVyKSB7XG4gICAgICAgICAgICBhZnRlciA9IF8uX2xhc3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFmdGVyKSB7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IGFmdGVyLm5leHQ7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBuZXh0O1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IGFmdGVyO1xuICAgICAgICAgICAgYWZ0ZXIubmV4dCA9IG5vZGU7XG4gICAgICAgICAgICBpZiAobmV4dClcbiAgICAgICAgICAgICAgICBuZXh0LnByZXZpb3VzID0gbm9kZTtcbiAgICAgICAgICAgIGlmIChhZnRlciA9PSBfLl9sYXN0KVxuICAgICAgICAgICAgICAgIF8uX2xhc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgXy5fZmlyc3QgPSBfLl9sYXN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQrKztcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIGFuZCBleGlzdGluZyBub2RlIGFuZCByZXBsYWNlcyBpdC5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSByZXBsYWNlbWVudFxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgcmVwbGFjZShub2RlLCByZXBsYWNlbWVudCkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbm9kZScpO1xuICAgICAgICBpZiAobm9kZSA9PSByZXBsYWNlbWVudClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBhc3NlcnRWYWxpZERldGFjaGVkKHJlcGxhY2VtZW50LCAncmVwbGFjZW1lbnQnKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJlcGxhY2VtZW50LnByZXZpb3VzID0gbm9kZS5wcmV2aW91cztcbiAgICAgICAgcmVwbGFjZW1lbnQubmV4dCA9IG5vZGUubmV4dDtcbiAgICAgICAgaWYgKG5vZGUucHJldmlvdXMpXG4gICAgICAgICAgICBub2RlLnByZXZpb3VzLm5leHQgPSByZXBsYWNlbWVudDtcbiAgICAgICAgaWYgKG5vZGUubmV4dClcbiAgICAgICAgICAgIG5vZGUubmV4dC5wcmV2aW91cyA9IHJlcGxhY2VtZW50O1xuICAgICAgICBpZiAobm9kZSA9PSBfLl9maXJzdClcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgIGlmIChub2RlID09IF8uX2xhc3QpXG4gICAgICAgICAgICBfLl9sYXN0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIHN0YXRpYyB2YWx1ZUVudW1lcmF0b3JGcm9tKGxpc3QpIHtcbiAgICAgICAgaWYgKCFsaXN0KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbGlzdCcpO1xuICAgICAgICBsZXQgY3VycmVudCwgbmV4dCwgdmVyc2lvbjtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGFuY2hvci4uLlxuICAgICAgICAgICAgY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgICBuZXh0ID0gbGlzdC5maXJzdDtcbiAgICAgICAgICAgIHZlcnNpb24gPSBsaXN0Ll92ZXJzaW9uO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBsaXN0LmFzc2VydFZlcnNpb24odmVyc2lvbik7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICAgICAgbmV4dCA9IGN1cnJlbnQgJiYgY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGNvcHlWYWx1ZXMobGlzdCwgYXJyYXksIGluZGV4ID0gMCkge1xuICAgICAgICBpZiAobGlzdCAmJiBsaXN0LmZpcnN0KSB7XG4gICAgICAgICAgICBpZiAoIWFycmF5KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5Jyk7XG4gICAgICAgICAgICBsaXN0LmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBhcnJheVtpbmRleCArIGldID0gbm9kZS52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG59XG5mdW5jdGlvbiBhc3NlcnRWYWxpZERldGFjaGVkKG5vZGUsIHByb3BOYW1lID0gJ25vZGUnKSB7XG4gICAgaWYgKG5vZGUgPT0gbnVsbClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihwcm9wTmFtZSk7XG4gICAgaWYgKG5vZGUubmV4dCB8fCBub2RlLnByZXZpb3VzKVxuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNhbm5vdCBhZGQgYSBub2RlIHRvIGEgTGlua2VkTm9kZUxpc3QgdGhhdCBpcyBhbHJlYWR5IGxpbmtlZC5cIik7XG59XG5leHBvcnQgZGVmYXVsdCBMaW5rZWROb2RlTGlzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbmtlZE5vZGVMaXN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvTGlua2VkTm9kZUxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuY29uc3QgTlVMTCA9IFwibnVsbFwiLCBHRVRfU1lNQk9MID0gXCJnZXRTeW1ib2xcIiwgR0VUX0hBU0hfQ09ERSA9IFwiZ2V0SGFzaENvZGVcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRJZGVudGlmaWVyKG9iaiwgdGhyb3dJZlVua25vd24gPSBmYWxzZSkge1xuICAgIGlmIChUeXBlLmlzUHJvcGVydHlLZXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICBpZiAob2JqID09PSBudWxsKVxuICAgICAgICByZXR1cm4gTlVMTDtcbiAgICBpZiAob2JqID09PSBWT0lEMClcbiAgICAgICAgcmV0dXJuIFR5cGUuVU5ERUZJTkVEO1xuICAgIC8vIFNlZSBJU3ltYm9saXphYmxlLlxuICAgIGlmIChUeXBlLmhhc01ldGhvZChvYmosIEdFVF9TWU1CT0wpKSB7XG4gICAgICAgIHJldHVybiBvYmouZ2V0U3ltYm9sKCk7XG4gICAgfVxuICAgIC8vIFNlZSBJSGFzaGFibGUuXG4gICAgaWYgKFR5cGUuaGFzTWV0aG9kKG9iaiwgR0VUX0hBU0hfQ09ERSkpIHtcbiAgICAgICAgcmV0dXJuIG9iai5nZXRIYXNoQ29kZSgpO1xuICAgIH1cbiAgICBpZiAodGhyb3dJZlVua25vd24pIHtcbiAgICAgICAgaWYgKFR5cGUuaXNGdW5jdGlvbih0aHJvd0lmVW5rbm93bikpXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dJZlVua25vd24ob2JqKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhyb3cgXCJDYW5ub3QgY3JlYXRlIGtub3duIGlkZW50aXR5LlwiO1xuICAgIH1cbiAgICByZXR1cm4gKHR5cGVvZiBvYmoudG9TdHJpbmcgPT0gVHlwZS5GVU5DVElPTilcbiAgICAgICAgPyBvYmoudG9TdHJpbmcoKVxuICAgICAgICA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xufVxuZXhwb3J0IGRlZmF1bHQgZ2V0SWRlbnRpZmllcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldElkZW50aWZpZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9EaWN0aW9uYXJpZXMvZ2V0SWRlbnRpZmllci5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgYXJlRXF1YWwgfSBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gXCIuLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9uQmFzZSB9IGZyb20gXCIuLi9Db2xsZWN0aW9uQmFzZVwiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb25cIjtcbmltcG9ydCB7IGV4dHJhY3RLZXlWYWx1ZSB9IGZyb20gXCIuLi8uLi9LZXlWYWx1ZUV4dHJhY3RcIjtcbmltcG9ydCB7IEtleU5vdEZvdW5kRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0tleU5vdEZvdW5kRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuLy8gRGVzaWduIE5vdGU6IFNob3VsZCBEaWN0aW9uYXJ5QWJzdHJhY3RCYXNlIGJlIElEaXNwb3NhYmxlP1xuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnlCYXNlIGV4dGVuZHMgQ29sbGVjdGlvbkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSkge1xuICAgICAgICBzdXBlcihzb3VyY2UpO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIF9vblZhbHVlTW9kaWZpZWQoa2V5LCB2YWx1ZSwgb2xkKSB7XG4gICAgfVxuICAgIF9hZGRJbnRlcm5hbChpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2l0ZW0nLCAnRGljdGlvbmFyaWVzIG11c3QgdXNlIGEgdmFsaWQga2V5L3ZhbHVlIHBhaXIuIFxcJycgKyBpdGVtICsgJ1xcJyBpcyBub3QgYWxsb3dlZC4nKTtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RLZXlWYWx1ZShpdGVtLCAoa2V5LCB2YWx1ZSkgPT4gdGhpcy5hZGRCeUtleVZhbHVlKGtleSwgdmFsdWUpKTtcbiAgICB9XG4gICAgX2NsZWFySW50ZXJuYWwoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgXy5rZXlzKSB7XG4gICAgICAgICAgICBpZiAoXy5yZW1vdmVCeUtleShrZXkpKVxuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cbiAgICBjb250YWlucyhpdGVtKSB7XG4gICAgICAgIC8vIFNob3VsZCBuZXZlciBoYXZlIGEgbnVsbCBvYmplY3QgaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgIGlmICghaXRlbSB8fCAhdGhpcy5nZXRDb3VudCgpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gZXh0cmFjdEtleVZhbHVlKGl0ZW0sIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAvLyBMZWF2ZSBhcyB2YXJpYWJsZSBmb3IgZGVidWdnaW5nLi4uXG4gICAgICAgICAgICBsZXQgdiA9IHRoaXMuZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBhcmVFcXVhbCh2YWx1ZSwgdik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfcmVtb3ZlSW50ZXJuYWwoaXRlbSkge1xuICAgICAgICBpZiAoIWl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RLZXlWYWx1ZShpdGVtLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgLy8gTGVhdmUgYXMgdmFyaWFibGUgZm9yIGRlYnVnZ2luZy4uLlxuICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICByZXR1cm4gKGFyZUVxdWFsKHZhbHVlLCB2KSAmJiB0aGlzLnJlbW92ZUJ5S2V5KGtleSkpXG4gICAgICAgICAgICAgICAgPyAxIDogMDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBrZXlzKCkgeyByZXR1cm4gdGhpcy5nZXRLZXlzKCk7IH1cbiAgICBnZXQgdmFsdWVzKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZXMoKTsgfVxuICAgIGFkZEJ5S2V5VmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IFZPSUQwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDYW5ub3QgYWRkICd1bmRlZmluZWQnIGFzIGEgdmFsdWUuXCIpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKF8uY29udGFpbnNLZXkoa2V5KSkge1xuICAgICAgICAgICAgY29uc3QgZXggPSBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkFkZGluZyBhIGtleS92YWx1ZSB3aGVuIHRoZSBrZXkgYWxyZWFkeSBleGlzdHMuXCIpO1xuICAgICAgICAgICAgZXguZGF0YVsna2V5J10gPSBrZXk7XG4gICAgICAgICAgICBleC5kYXRhWyd2YWx1ZSddID0gdmFsdWU7XG4gICAgICAgICAgICB0aHJvdyBleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXy5zZXRWYWx1ZShrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgZ2V0QXNzdXJlZFZhbHVlKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBWT0lEMClcbiAgICAgICAgICAgIHRocm93IG5ldyBLZXlOb3RGb3VuZEV4Y2VwdGlvbihgS2V5ICcke2tleX0nIG5vdCBmb3VuZC5gKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICB0cnlHZXRWYWx1ZShrZXksIG91dCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBWT0lEMCkge1xuICAgICAgICAgICAgb3V0KHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgYW4gZW50cnkuXG4gICAgICogSXQncyBpbXBvcnRhbnQgdG8ga25vdyB0aGF0ICd1bmRlZmluZWQnIGNhbm5vdCBleGlzdCBhcyBhIHZhbHVlIGluIHRoZSBkaWN0aW9uYXJ5IGFuZCBpcyB1c2VkIGFzIGEgZmxhZyBmb3IgcmVtb3ZhbC5cbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc2V0VmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgICAgICAvLyBzZXRWYWx1ZSBzaG91bGRuJ3QgbmVlZCB0byB3b3JyeSBhYm91dCByZWN1cnNpb24uLi5cbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvbGQgPSBfLmdldFZhbHVlKGtleSk7IC8vIGdldCB0aGUgb2xkIHZhbHVlIGhlcmUgYW5kIHBhc3MgdG8gaW50ZXJuYWwuXG4gICAgICAgIGlmICghYXJlRXF1YWwodmFsdWUsIG9sZCkgJiYgXy5fc2V0VmFsdWVJbnRlcm5hbChrZXksIHZhbHVlKSkge1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICBfLl9vblZhbHVlTW9kaWZpZWQoa2V5LCB2YWx1ZSwgb2xkKTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oY2hhbmdlZCk7XG4gICAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH1cbiAgICBjb250YWluc0tleShrZXkpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZ2V0RW50cnkoa2V5KTtcbiAgICB9XG4gICAgY29udGFpbnNWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgIHdoaWxlIChlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIGlmIChhcmVFcXVhbChlLmN1cnJlbnQsIHZhbHVlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgIGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmVtb3ZlQnlLZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFZhbHVlKGtleSwgVk9JRDApO1xuICAgIH1cbiAgICByZW1vdmVCeVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgXy5nZXRLZXlzKCkpIHtcbiAgICAgICAgICAgIGlmIChhcmVFcXVhbChfLmdldFZhbHVlKGtleSksIHZhbHVlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgIF8ucmVtb3ZlQnlLZXkoa2V5KTtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG4gICAgaW1wb3J0RW50cmllcyhwYWlycykge1xuICAgICAgICAvLyBBbGxvdyBwaXBpbmcgdGhyb3VnaCB0byB0cmlnZ2VyIG9uTW9kaWZpZWQgcHJvcGVybHkuXG4gICAgICAgIHJldHVybiBzdXBlci5pbXBvcnRFbnRyaWVzKHBhaXJzKTtcbiAgICB9XG4gICAgX2ltcG9ydEVudHJpZXMocGFpcnMpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghcGFpcnMpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgbGV0IGNoYW5nZWQgPSAwO1xuICAgICAgICBmb3JFYWNoKHBhaXJzLCBwYWlyID0+IGV4dHJhY3RLZXlWYWx1ZShwYWlyLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKF8uX3NldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSkpXG4gICAgICAgICAgICAgICAgY2hhbmdlZCsrO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH1cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IHZlciwga2V5cywgbGVuLCBpbmRleCA9IDA7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHZlciA9IF8uX3ZlcnNpb247IC8vIFRyYWNrIHRoZSB2ZXJzaW9uIHNpbmNlIGdldEtleXMgaXMgYSBjb3B5LlxuICAgICAgICAgICAga2V5cyA9IF8uZ2V0S2V5cygpO1xuICAgICAgICAgICAgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcik7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2luZGV4KytdLCB2YWx1ZSA9IF8uZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IFZPSUQwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybih7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IERpY3Rpb25hcnlCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGljdGlvbmFyeUJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9EaWN0aW9uYXJpZXMvRGljdGlvbmFyeUJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbi8vIE5lZWQgdG8gc3Bvb2YgdGhpcyBzbyBXZWJQYWNrIGRvZXNuJ3QgcGFuaWMgKHdhcm5pbmdzKS5cbmxldCByO1xudHJ5IHtcbiAgICByID0gZXZhbCgncmVxdWlyZScpO1xufVxuY2F0Y2ggKGV4KSB7IH1cbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuZXhwb3J0IGNvbnN0IGlzQ29tbW9uSlMgPSAhIShyICYmIHIucmVzb2x2ZSk7XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbmV4cG9ydCBjb25zdCBpc1JlcXVpcmVKUyA9ICEhKHIgJiYgci50b1VybCAmJiByLmRlZmluZWQpO1xuLypcbiAqIEVuc3VyZSBpcyBpbiBhIHJlYWwgTm9kZSBlbnZpcm9ubWVudCwgd2l0aCBhIGBwcm9jZXNzLm5leHRUaWNrYC5cbiAqIFRvIHNlZSB0aHJvdWdoIGZha2UgTm9kZSBlbnZpcm9ubWVudHM6XG4gKiBNb2NoYSB0ZXN0IHJ1bm5lciAtIGV4cG9zZXMgYSBgcHJvY2Vzc2AgZ2xvYmFsIHdpdGhvdXQgYSBgbmV4dFRpY2tgXG4gKiBCcm93c2VyaWZ5IC0gZXhwb3NlcyBhIGBwcm9jZXNzLm5leFRpY2tgIGZ1bmN0aW9uIHRoYXQgdXNlc1xuICogYHNldFRpbWVvdXRgLiBJbiB0aGlzIGNhc2UgYHNldEltbWVkaWF0ZWAgaXMgcHJlZmVycmVkIGJlY2F1c2VcbiAqIGl0IGlzIGZhc3Rlci4gQnJvd3NlcmlmeSdzIGBwcm9jZXNzLnRvU3RyaW5nKClgIHlpZWxkc1xuICogXCJbb2JqZWN0IE9iamVjdF1cIiwgd2hpbGUgaW4gYSByZWFsIE5vZGUgZW52aXJvbm1lbnRcbiAqIGBwcm9jZXNzLm5leHRUaWNrKClgIHlpZWxkcyBcIltvYmplY3QgcHJvY2Vzc11cIi5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZUpTID0gdHlwZW9mIHByb2Nlc3MgPT0gXCJvYmplY3RcIlxuICAgICYmIHByb2Nlc3MudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCJcbiAgICAmJiBwcm9jZXNzLm5leHRUaWNrICE9IHZvaWQgMDtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxudHJ5IHtcbiAgICBPYmplY3QuZnJlZXplKGV4cG9ydHMpO1xufVxuY2F0Y2ggKGV4KSB7IH1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVudmlyb25tZW50LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRW52aXJvbm1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IEFyZ3VtZW50RXhjZXB0aW9uIH0gZnJvbSBcIi4vRXhjZXB0aW9ucy9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi9UeXBlc1wiO1xuY29uc3QgVk9JRDAgPSB2b2lkIDAsIERPVCA9ICcuJywgS0VZID0gJ2tleScsIFZBTFVFID0gJ3ZhbHVlJywgSVRFTSA9ICdpdGVtJywgSVRFTV8xID0gSVRFTSArICdbMV0nLCBJVEVNX1ZBTFVFID0gSVRFTSArIERPVCArIFZBTFVFLCBJTlZBTElEX0tWUF9NRVNTQUdFID0gJ0ludmFsaWQgdHlwZS4gIE11c3QgYmUgYSBLZXlWYWx1ZVBhaXIgb3IgVHVwbGUgb2YgbGVuZ3RoIDIuJywgQ0FOTk9UX0JFX1VOREVGSU5FRCA9ICdDYW5ub3QgZXF1YWwgdW5kZWZpbmVkLic7XG5leHBvcnQgZnVuY3Rpb24gaXNLZXlWYWx1ZVBhaXIoa3ZwKSB7XG4gICAgcmV0dXJuIGt2cCAmJiBrdnAuaGFzT3duUHJvcGVydHkoS0VZKSAmJiBrdnAuaGFzT3duUHJvcGVydHkoVkFMVUUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEtleShrZXksIG5hbWUgPSBJVEVNKSB7XG4gICAgYXNzZXJ0Tm90VW5kZWZpbmVkKGtleSwgbmFtZSArIERPVCArIEtFWSk7XG4gICAgaWYgKGtleSA9PT0gbnVsbClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihuYW1lICsgRE9UICsgS0VZKTtcbiAgICByZXR1cm4ga2V5O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFR1cGxlKHR1cGxlLCBuYW1lID0gSVRFTSkge1xuICAgIGlmICh0dXBsZS5sZW5ndGggIT0gMilcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKG5hbWUsICdLZXlWYWx1ZVBhaXIgdHVwbGVzIG11c3QgYmUgb2YgbGVuZ3RoIDIuJyk7XG4gICAgYXNzZXJ0S2V5KHR1cGxlWzBdLCBuYW1lKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb3RVbmRlZmluZWQodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAodmFsdWUgPT09IFZPSUQwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24obmFtZSwgQ0FOTk9UX0JFX1VOREVGSU5FRCk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RLZXlWYWx1ZShpdGVtLCB0bykge1xuICAgIGxldCBrZXksIHZhbHVlO1xuICAgIGlmIChUeXBlLmlzQXJyYXlMaWtlKGl0ZW0pKSB7XG4gICAgICAgIGFzc2VydFR1cGxlKGl0ZW0pO1xuICAgICAgICBrZXkgPSBpdGVtWzBdO1xuICAgICAgICB2YWx1ZSA9IGFzc2VydE5vdFVuZGVmaW5lZChpdGVtWzFdLCBJVEVNXzEpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0tleVZhbHVlUGFpcihpdGVtKSkge1xuICAgICAgICBrZXkgPSBhc3NlcnRLZXkoaXRlbS5rZXkpO1xuICAgICAgICB2YWx1ZSA9IGFzc2VydE5vdFVuZGVmaW5lZChpdGVtLnZhbHVlLCBJVEVNX1ZBTFVFKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihJVEVNLCBJTlZBTElEX0tWUF9NRVNTQUdFKTtcbiAgICB9XG4gICAgcmV0dXJuIHRvKGtleSwgdmFsdWUpO1xufVxuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdEtleVZhbHVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9S2V5VmFsdWVFeHRyYWN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vS2V5VmFsdWVFeHRyYWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9zeXN0ZW0uY29sbGVjdGlvbnMuZ2VuZXJpYy5LZXlOb3RGb3VuZEV4Y2VwdGlvbih2PXZzLjExMCkuYXNweFxuICovXG5pbXBvcnQgeyBTeXN0ZW1FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9TeXN0ZW1FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdLZXlOb3RGb3VuZEV4Y2VwdGlvbiAnO1xuZXhwb3J0IGNsYXNzIEtleU5vdEZvdW5kRXhjZXB0aW9uIGV4dGVuZHMgU3lzdGVtRXhjZXB0aW9uIHtcbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBLZXlOb3RGb3VuZEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUtleU5vdEZvdW5kRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvS2V5Tm90Rm91bmRFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4qIEJhc2VkIFVwb246IGh0dHA6Ly9yZWZlcmVuY2Vzb3VyY2UubWljcm9zb2Z0LmNvbS8jU3lzdGVtL0NvbXBNb2Qvc3lzdGVtL2NvbGxlY3Rpb25zL2dlbmVyaWMvcXVldWUuY3NcbiogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4qL1xuaW1wb3J0IHsgYXJlRXF1YWwgfSBmcm9tIFwiLi4vQ29tcGFyZVwiO1xuaW1wb3J0ICogYXMgQVUgZnJvbSBcIi4vQXJyYXkvVXRpbGl0eVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuLi9JbnRlZ2VyXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL05vdEltcGxlbWVudGVkRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9uQmFzZSB9IGZyb20gXCIuL0NvbGxlY3Rpb25CYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuY29uc3QgTUlOSU1VTV9HUk9XID0gNDtcbmNvbnN0IFNIUklOS19USFJFU0hPTEQgPSAzMjsgLy8gVW51c2VkP1xuLy8gdmFyIEdST1dfRkFDVE9SOiBudW1iZXIgPSAyMDA7ICAvLyBkb3VibGUgZWFjaCB0aW1lXG5jb25zdCBHUk9XX0ZBQ1RPUl9IQUxGID0gMTAwO1xuY29uc3QgREVGQVVMVF9DQVBBQ0lUWSA9IE1JTklNVU1fR1JPVztcbmNvbnN0IGVtcHR5QXJyYXkgPSBPYmplY3QuZnJlZXplKFtdKTtcbmV4cG9ydCBjbGFzcyBRdWV1ZSBleHRlbmRzIENvbGxlY3Rpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UsIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgICAgICBzdXBlcihWT0lEMCwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9oZWFkID0gMDtcbiAgICAgICAgXy5fdGFpbCA9IDA7XG4gICAgICAgIF8uX3NpemUgPSAwO1xuICAgICAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgICAgIF8uX2FycmF5ID0gZW1wdHlBcnJheTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoVHlwZS5pc051bWJlcihzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FwYWNpdHkgPSBzb3VyY2U7XG4gICAgICAgICAgICAgICAgYXNzZXJ0SW50ZWdlclplcm9PckdyZWF0ZXIoY2FwYWNpdHksIFwiY2FwYWNpdHlcIik7XG4gICAgICAgICAgICAgICAgXy5fYXJyYXkgPSBjYXBhY2l0eVxuICAgICAgICAgICAgICAgICAgICA/IEFVLmluaXRpYWxpemUoY2FwYWNpdHkpXG4gICAgICAgICAgICAgICAgICAgIDogZW1wdHlBcnJheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlID0gc291cmNlO1xuICAgICAgICAgICAgICAgIF8uX2FycmF5ID0gQVUuaW5pdGlhbGl6ZShUeXBlLmlzQXJyYXlMaWtlKHNlKVxuICAgICAgICAgICAgICAgICAgICA/IHNlLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA6IERFRkFVTFRfQ0FQQUNJVFkpO1xuICAgICAgICAgICAgICAgIF8uX2ltcG9ydEVudHJpZXMoc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF8uX2NhcGFjaXR5ID0gXy5fYXJyYXkubGVuZ3RoO1xuICAgIH1cbiAgICBnZXRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgfVxuICAgIF9hZGRJbnRlcm5hbChpdGVtKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgbGV0IGxlbiA9IF8uX2NhcGFjaXR5O1xuICAgICAgICBpZiAoc2l6ZSA9PSBsZW4pIHtcbiAgICAgICAgICAgIGxldCBuZXdDYXBhY2l0eSA9IGxlbiAqIEdST1dfRkFDVE9SX0hBTEY7XG4gICAgICAgICAgICBpZiAobmV3Q2FwYWNpdHkgPCBsZW4gKyBNSU5JTVVNX0dST1cpXG4gICAgICAgICAgICAgICAgbmV3Q2FwYWNpdHkgPSBsZW4gKyBNSU5JTVVNX0dST1c7XG4gICAgICAgICAgICBfLnNldENhcGFjaXR5KG5ld0NhcGFjaXR5KTtcbiAgICAgICAgICAgIGxlbiA9IF8uX2NhcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhaWwgPSBfLl90YWlsO1xuICAgICAgICBfLl9hcnJheVt0YWlsXSA9IGl0ZW07XG4gICAgICAgIF8uX3RhaWwgPSAodGFpbCArIDEpICUgbGVuO1xuICAgICAgICBfLl9zaXplID0gc2l6ZSArIDE7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIF9yZW1vdmVJbnRlcm5hbChpdGVtLCBtYXgpIHtcbiAgICAgICAgLy9ub2luc3BlY3Rpb24gSHRtbFVua25vd25UYWdcbiAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKFwiSUNvbGxlY3Rpb25cXDxUXFw+LnJlbW92ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW4gUXVldWVcXDxUXFw+XCIgK1xuICAgICAgICAgICAgXCIgc2luY2UgaXQgd291bGQgcmVxdWlyZSBkZXN0cm95aW5nIHRoZSB1bmRlcmx5aW5nIGFycmF5IHRvIHJlbW92ZSB0aGUgaXRlbS5cIik7XG4gICAgfVxuICAgIF9jbGVhckludGVybmFsKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgYXJyYXkgPSBfLl9hcnJheSwgaGVhZCA9IF8uX2hlYWQsIHRhaWwgPSBfLl90YWlsLCBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgaWYgKGhlYWQgPCB0YWlsKVxuICAgICAgICAgICAgQVUuY2xlYXIoYXJyYXksIGhlYWQsIHRhaWwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIEFVLmNsZWFyKGFycmF5LCBoZWFkKTtcbiAgICAgICAgICAgIEFVLmNsZWFyKGFycmF5LCAwLCB0YWlsKTtcbiAgICAgICAgfVxuICAgICAgICBfLl9oZWFkID0gMDtcbiAgICAgICAgXy5fdGFpbCA9IDA7XG4gICAgICAgIF8uX3NpemUgPSAwO1xuICAgICAgICBfLnRyaW1FeGNlc3MoKTtcbiAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmIChfLl9hcnJheSAhPSBlbXB0eUFycmF5KSB7XG4gICAgICAgICAgICBfLl9hcnJheS5sZW5ndGggPSBfLl9jYXBhY2l0eSA9IDA7XG4gICAgICAgICAgICBfLl9hcnJheSA9IGVtcHR5QXJyYXk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVxdWV1ZXMgZW50cmllcyBpbnRvIGFuIGFycmF5LlxuICAgICAqL1xuICAgIGR1bXAobWF4ID0gSW5maW5pdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBpZiAoaXNGaW5pdGUobWF4KSkge1xuICAgICAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKG1heCk7XG4gICAgICAgICAgICBpZiAobWF4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG1heC0tICYmIF8uX3RyeURlcXVldWVJbnRlcm5hbCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KSkgeyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAoXy5fdHJ5RGVxdWV1ZUludGVybmFsKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9KSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgXy50cmltRXhjZXNzKCk7XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBmb3JFYWNoKGFjdGlvbikge1xuICAgICAgICByZXR1cm4gc3VwZXIuZm9yRWFjaChhY3Rpb24sIHRydWUpO1xuICAgIH1cbiAgICBzZXRDYXBhY2l0eShjYXBhY2l0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgYXNzZXJ0SW50ZWdlclplcm9PckdyZWF0ZXIoY2FwYWNpdHksIFwiY2FwYWNpdHlcIik7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gXy5fYXJyYXksIGxlbiA9IF8uX2NhcGFjaXR5O1xuICAgICAgICBpZiAoY2FwYWNpdHkgPiBsZW4pXG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoY2FwYWNpdHkgPT0gbGVuKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGNvbnN0IGhlYWQgPSBfLl9oZWFkLCB0YWlsID0gXy5fdGFpbCwgc2l6ZSA9IF8uX3NpemU7XG4gICAgICAgIC8vIFNwZWNpYWwgY2FzZSB3aGVyZSB3ZSBjYW4gc2ltcGx5IGV4dGVuZCB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheS4gKEphdmFTY3JpcHQgb25seSlcbiAgICAgICAgaWYgKGFycmF5ICE9IGVtcHR5QXJyYXkgJiYgY2FwYWNpdHkgPiBsZW4gJiYgaGVhZCA8IHRhaWwpIHtcbiAgICAgICAgICAgIGFycmF5Lmxlbmd0aCA9IF8uX2NhcGFjaXR5ID0gY2FwYWNpdHk7XG4gICAgICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBjcmVhdGUgYSBuZXcgYXJyYXkgYmVjYXVzZSBtb2RpZnlpbmcgYW4gZXhpc3Rpbmcgb25lIGNvdWxkIGJlIHNsb3cuXG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gQVUuaW5pdGlhbGl6ZShjYXBhY2l0eSk7XG4gICAgICAgIGlmIChzaXplID4gMCkge1xuICAgICAgICAgICAgaWYgKGhlYWQgPCB0YWlsKSB7XG4gICAgICAgICAgICAgICAgQVUuY29weVRvKGFycmF5LCBuZXdBcnJheSwgaGVhZCwgMCwgc2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBBVS5jb3B5VG8oYXJyYXksIG5ld0FycmF5LCBoZWFkLCAwLCBsZW4gLSBoZWFkKTtcbiAgICAgICAgICAgICAgICBBVS5jb3B5VG8oYXJyYXksIG5ld0FycmF5LCAwLCBsZW4gLSBoZWFkLCB0YWlsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfLl9hcnJheSA9IG5ld0FycmF5O1xuICAgICAgICBfLl9jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgICAgICBfLl9oZWFkID0gMDtcbiAgICAgICAgXy5fdGFpbCA9IChzaXplID09IGNhcGFjaXR5KSA/IDAgOiBzaXplO1xuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24odHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbnF1ZXVlKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGl0ZW0pO1xuICAgIH1cbiAgICBfdHJ5RGVxdWV1ZUludGVybmFsKG91dCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLl9zaXplKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBhcnJheSA9IF8uX2FycmF5LCBoZWFkID0gXy5faGVhZDtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IF8uX2FycmF5W2hlYWRdO1xuICAgICAgICBhcnJheVtoZWFkXSA9IG51bGw7XG4gICAgICAgIF8uX2hlYWQgPSAoaGVhZCArIDEpICUgXy5fY2FwYWNpdHk7XG4gICAgICAgIF8uX3NpemUtLTtcbiAgICAgICAgXy5faW5jcmVtZW50TW9kaWZpZWQoKTtcbiAgICAgICAgb3V0KHJlbW92ZWQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZGVxdWV1ZSh0aHJvd0lmRW1wdHkgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBWT0lEMDtcbiAgICAgICAgaWYgKCF0aGlzLnRyeURlcXVldWUodmFsdWUgPT4geyByZXN1bHQgPSB2YWx1ZTsgfSkgJiYgdGhyb3dJZkVtcHR5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDYW5ub3QgZGVxdWV1ZSBhbiBlbXB0eSBxdWV1ZS5cIik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIHF1ZXVlIGhhcyBlbnRyaWVzIGFuIHB1bGxzIGFuIGVudHJ5IGZyb20gdGhlIGhlYWQgb2YgdGhlIHF1ZXVlIGFuZCBwYXNzZXMgaXQgdG8gdGhlIG91dCBoYW5kbGVyLlxuICAgICAqIEBwYXJhbSBvdXQgVGhlICdvdXQnIGhhbmRsZXIgdGhhdCByZWNlaXZlcyB0aGUgdmFsdWUgaWYgaXQgZXhpc3RzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGEgdmFsdWUgd2FzIHJldHJpZXZlZC4gIEZhbHNlIGlmIG5vdC5cbiAgICAgKi9cbiAgICB0cnlEZXF1ZXVlKG91dCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLl9zaXplKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgLy8gQSBzaW5nbGUgZGVxdWV1ZSBzaG91bGRuJ3QgbmVlZCB1cGRhdGUgcmVjdXJzaW9uIHRyYWNraW5nLi4uXG4gICAgICAgIGlmICh0aGlzLl90cnlEZXF1ZXVlSW50ZXJuYWwob3V0KSkge1xuICAgICAgICAgICAgLy8gVGhpcyBtYXkgcHJlZW1wdGl2ZWx5IHRyaWdnZXIgdGhlIF9vbk1vZGlmaWVkLlxuICAgICAgICAgICAgaWYgKF8uX3NpemUgPCBfLl9jYXBhY2l0eSAvIDIpXG4gICAgICAgICAgICAgICAgXy50cmltRXhjZXNzKFNIUklOS19USFJFU0hPTEQpO1xuICAgICAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF9nZXRFbGVtZW50KGluZGV4KSB7XG4gICAgICAgIGFzc2VydEludGVnZXJaZXJvT3JHcmVhdGVyKGluZGV4LCBcImluZGV4XCIpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgcmV0dXJuIF8uX2FycmF5WyhfLl9oZWFkICsgaW5kZXgpICUgXy5fY2FwYWNpdHldO1xuICAgIH1cbiAgICBwZWVrKHRocm93SWZFbXB0eSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplID09IDApIHtcbiAgICAgICAgICAgIGlmICh0aHJvd0lmRW1wdHkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDYW5ub3QgY2FsbCBwZWVrIG9uIGFuIGVtcHR5IHF1ZXVlLlwiKTtcbiAgICAgICAgICAgIHJldHVybiBWT0lEMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXlbdGhpcy5faGVhZF07XG4gICAgfVxuICAgIHRyaW1FeGNlc3ModGhyZXNob2xkKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgaWYgKHNpemUgPCBNYXRoLmZsb29yKF8uX2NhcGFjaXR5ICogMC45KSAmJiAoIXRocmVzaG9sZCAmJiB0aHJlc2hvbGQgIT09IDAgfHwgaXNOYU4odGhyZXNob2xkKSB8fCB0aHJlc2hvbGQgPCBzaXplKSlcbiAgICAgICAgICAgIF8uc2V0Q2FwYWNpdHkoc2l6ZSk7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgaW5kZXgsIHZlcnNpb24sIHNpemU7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgdmVyc2lvbiA9IF8uX3ZlcnNpb247XG4gICAgICAgICAgICBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBfLmFzc2VydFZlcnNpb24odmVyc2lvbik7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gc2l6ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihfLl9nZXRFbGVtZW50KGluZGV4KyspKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzZXJ0WmVyb09yR3JlYXRlcih2YWx1ZSwgcHJvcGVydHkpIHtcbiAgICBpZiAodmFsdWUgPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKHByb3BlcnR5LCB2YWx1ZSwgXCJNdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvXCIpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gYXNzZXJ0SW50ZWdlclplcm9PckdyZWF0ZXIodmFsdWUsIHByb3BlcnR5KSB7XG4gICAgSW50ZWdlci5hc3NlcnQodmFsdWUsIHByb3BlcnR5KTtcbiAgICByZXR1cm4gYXNzZXJ0WmVyb09yR3JlYXRlcih2YWx1ZSwgcHJvcGVydHkpO1xufVxuZXhwb3J0IGRlZmF1bHQgUXVldWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL1F1ZXVlLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uLy4uL0ludGVnZXJcIjtcbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IEFyZ3VtZW50RXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplIH0gZnJvbSBcIi4vaW5pdGlhbGl6ZVwiO1xuaW1wb3J0IHsgY29weSwgY29weVRvIH0gZnJvbSBcIi4vY29weVwiO1xuZXhwb3J0IHsgaW5pdGlhbGl6ZSwgY29weSwgY29weVRvIH07XG5jb25zdCBDQk4gPSAnQ2Fubm90IGJlIG51bGwuJywgQ0IwID0gJ0Nhbm5vdCBiZSB6ZXJvLicsIENCTDAgPSAnQ2Fubm90IGJlIGxlc3MgdGhhbiB6ZXJvLicsIFZGTiA9ICdNdXN0IGJlIGEgdmFsaWQgZmluaXRlIG51bWJlcic7XG4vKipcbiAqIENoZWNrcyB0byBzZWUgd2hlcmUgdGhlIHByb3ZpZGVkIGFycmF5IGNvbnRhaW5zIGFuIGl0ZW0vdmFsdWUuXG4gKiBJZiB0aGUgYXJyYXkgdmFsdWUgaXMgbnVsbCwgdGhlbiAtMSBpcyByZXR1cm5lZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIGl0ZW1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBlcXVhbGl0eUNvbXBhcmVyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgY29uc3QgbGVuID0gYXJyYXkgJiYgYXJyYXkubGVuZ3RoO1xuICAgIGlmIChsZW4pIHtcbiAgICAgICAgLy8gTmFOIE5FVkVSIGV2YWx1YXRlcyBpdHMgZXF1YWxpdHkgc28gYmUgY2FyZWZ1bC5cbiAgICAgICAgaWYgKChhcnJheSkgaW5zdGFuY2VvZiAoQXJyYXkpICYmICFUeXBlLmlzVHJ1ZU5hTihpdGVtKSlcbiAgICAgICAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAvLyAnYXJlRXF1YWwnIGluY2x1ZGVzIE5hTj09TmFOIGV2YWx1YXRpb24uXG4gICAgICAgICAgICBpZiAoZXF1YWxpdHlDb21wYXJlcihhcnJheVtpXSwgaXRlbSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuLyoqXG4gKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBwcm92aWRlZCBhcnJheSBjb250YWlucyBhbiBpdGVtLlxuICogSWYgdGhlIGFycmF5IHZhbHVlIGlzIG51bGwsIHRoZW4gZmFsc2UgaXMgcmV0dXJuZWQuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBpdGVtXG4gKiBAcGFyYW0ge2Z1bmN0aW9uP30gZXF1YWxpdHlDb21wYXJlclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250YWlucyhhcnJheSwgaXRlbSwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIpICE9IC0xO1xufVxuLyoqXG4gKiBGaW5kcyBhbmQgcmVwbGFjZXMgYSB2YWx1ZSBmcm9tIGFuIGFycmF5LiAgV2lsbCByZXBsYWNlcyBhbGwgaW5zdGFuY2VzIHVubGVzcyBhIG1heGltdW0gaXMgc3BlY2lmaWVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gb2xkXG4gKiBAcGFyYW0gbmV3VmFsdWVcbiAqIEBwYXJhbSBtYXhcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKGFycmF5LCBvbGQsIG5ld1ZhbHVlLCBtYXggPSBJbmZpbml0eSkge1xuICAgIGlmICghYXJyYXkgfHwgIWFycmF5Lmxlbmd0aCB8fCBtYXggPT09IDApXG4gICAgICAgIHJldHVybiAwO1xuICAgIGlmIChtYXggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdtYXgnLCBtYXgsIENCTDApO1xuICAgIGlmICghbWF4KVxuICAgICAgICBtYXggPSBJbmZpbml0eTsgLy8ganVzdCBpbiBjYXNlLlxuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheVtpXSA9PT0gb2xkKSB7XG4gICAgICAgICAgICBhcnJheVtpXSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PSBtYXgpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufVxuLyoqXG4gKiBSZXBsYWNlcyB2YWx1ZXMgb2YgYW4gYXJyYXkgYWNyb3NzIGEgcmFuZ2Ugb2YgaW5kZXhlcy5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gc3RhcnRcbiAqIEBwYXJhbSBzdG9wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVSYW5nZShhcnJheSwgdmFsdWUsIHN0YXJ0ID0gMCwgc3RvcCkge1xuICAgIGlmICghYXJyYXkpXG4gICAgICAgIHJldHVybjtcbiAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoc3RhcnQsICdzdGFydCcpO1xuICAgIGlmICghc3RvcCAmJiBzdG9wICE9PSAwKVxuICAgICAgICBzdG9wID0gYXJyYXkubGVuZ3RoO1xuICAgIEludGVnZXIuYXNzZXJ0KHN0b3AsICdzdG9wJyk7XG4gICAgaWYgKHN0b3AgPCBzdGFydClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0b3BcIiwgc3RvcCwgXCJpcyBsZXNzIHRoYW4gc3RhcnRcIik7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgc3RvcDsgaSsrKSB7XG4gICAgICAgIGFycmF5W2ldID0gdmFsdWU7XG4gICAgfVxufVxuLyoqXG4gKiBDbGVhcnMgKHNldHMgdG8gbnVsbCkgdmFsdWVzIG9mIGFuIGFycmF5IGFjcm9zcyBhIHJhbmdlIG9mIGluZGV4ZXMuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBzdGFydFxuICogQHBhcmFtIHN0b3BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKGFycmF5LCBzdGFydCA9IDAsIHN0b3ApIHtcbiAgICB1cGRhdGVSYW5nZShhcnJheSwgbnVsbCwgc3RhcnQsIHN0b3ApO1xufVxuLyoqXG4gKiBFbnN1cmVzIGEgdmFsdWUgZXhpc3RzIHdpdGhpbiBhbiBhcnJheS4gIElmIG5vdCBmb3VuZCwgYWRkcyB0byB0aGUgZW5kLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gaXRlbVxuICogQHBhcmFtIHtmdW5jdGlvbj99IGVxdWFsaXR5Q29tcGFyZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgIGlmICghYXJyYXkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5JywgQ0JOKTtcbiAgICBsZXQgbGVuID0gYXJyYXkubGVuZ3RoOyAvLyBhdm9pZCBxdWVyeWluZyAubGVuZ3RoIG1vcmUgdGhhbiBvbmNlLiAqXG4gICAgY29uc3Qgb2sgPSAhbGVuIHx8ICFjb250YWlucyhhcnJheSwgaXRlbSwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgaWYgKG9rKVxuICAgICAgICBhcnJheVtsZW5dID0gaXRlbTsgLy8gKiBwdXNoIHdvdWxkIHF1ZXJ5IGxlbmd0aCBhZ2Fpbi5cbiAgICByZXR1cm4gb2s7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGluZGV4IG9mIHdoaWNoIHRoZSBwcm92aWRlZCBwcmVkaWNhdGUgcmV0dXJucyB0cnVlLlxuICogUmV0dXJucyAtMSBpZiBhbHdheXMgZmFsc2UuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBwcmVkaWNhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSkge1xuICAgIGlmICghYXJyYXkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5JywgQ0JOKTtcbiAgICBpZiAoIVR5cGUuaXNGdW5jdGlvbihwcmVkaWNhdGUpKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oJ3ByZWRpY2F0ZScsICdNdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgY29uc3QgbGVuID0gYXJyYXkubGVuZ3RoO1xuICAgIGlmICghVHlwZS5pc051bWJlcihsZW4sIHRydWUpIHx8IGxlbiA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbignYXJyYXknLCAnRG9lcyBub3QgaGF2ZSBhIHZhbGlkIGxlbmd0aC4nKTtcbiAgICBpZiAoKGFycmF5KSBpbnN0YW5jZW9mIChBcnJheSkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShhcnJheVtpXSwgaSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgoaSkgaW4gKGFycmF5KSAmJiBwcmVkaWNhdGUoYXJyYXlbaV0sIGkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoKHNvdXJjZSwgYWN0aW9uKSB7XG4gICAgaWYgKHNvdXJjZSAmJiBhY3Rpb24pIHtcbiAgICAgICAgLy8gRG9uJ3QgY2FjaGUgdGhlIGxlbmd0aCBzaW5jZSBpdCBpcyBwb3NzaWJsZSB0aGF0IHRoZSB1bmRlcmx5aW5nIGFycmF5IGNoYW5nZWQuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYWN0aW9uKHNvdXJjZVtpXSwgaSkgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBJcyBzaW1pbGFyIHRvIEFycmF5Lm1hcCgpIGJ1dCBpbnN0ZWFkIG9mIHJldHVybmluZyBhIG5ldyBhcnJheSwgaXQgdXBkYXRlcyB0aGUgZXhpc3RpbmcgaW5kZXhlcy5cbiAqIENhbiBhbHNvIGJlIGFwcGxpZWQgdG8gYSBzdHJ1Y3R1cmUgdGhhdCBpbmRleGVzIGxpa2UgYW4gYXJyYXksIGJ1dCBtYXkgbm90IGJlLlxuICogQHBhcmFtIHRhcmdldFxuICogQHBhcmFtIGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVRvKHRhcmdldCwgZm4pIHtcbiAgICBpZiAodGFyZ2V0ICYmIGZuKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFyZ2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0YXJnZXRbaV0gPSBmbih0YXJnZXRbaV0sIGkpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBSZW1vdmVzIGFuIGVudHJ5IGF0IGEgc3BlY2lmaWVkIGluZGV4LlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSB3YXMgYWJsZSB0byBiZSByZW1vdmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSW5kZXgoYXJyYXksIGluZGV4KSB7XG4gICAgaWYgKCFhcnJheSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignYXJyYXknLCBDQk4pO1xuICAgIEludGVnZXIuYXNzZXJ0KGluZGV4LCAnaW5kZXgnKTtcbiAgICBpZiAoaW5kZXggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdpbmRleCcsIGluZGV4LCBDQkwwKTtcbiAgICBjb25zdCBleGlzdHMgPSBpbmRleCA8IGFycmF5Lmxlbmd0aDtcbiAgICBpZiAoZXhpc3RzKVxuICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiBleGlzdHM7XG59XG4vKipcbiAqIEZpbmRzIGFuZCByZW1vdmVzIGEgdmFsdWUgZnJvbSBhbiBhcnJheS4gIFdpbGwgcmVtb3ZlIGFsbCBpbnN0YW5jZXMgdW5sZXNzIGEgbWF4aW11bSBpcyBzcGVjaWZpZWQuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIG1heFxuICogQHBhcmFtIHtmdW5jdGlvbj99IGVxdWFsaXR5Q29tcGFyZXJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgdGltZXMgdGhlIHZhbHVlIHdhcyBmb3VuZCBhbmQgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShhcnJheSwgdmFsdWUsIG1heCA9IEluZmluaXR5LCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICBpZiAoIWFycmF5IHx8ICFhcnJheS5sZW5ndGggfHwgbWF4ID09PSAwKVxuICAgICAgICByZXR1cm4gMDtcbiAgICBpZiAobWF4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbWF4JywgbWF4LCBDQkwwKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGlmICghbWF4IHx8ICFpc0Zpbml0ZShtYXgpKSB7XG4gICAgICAgIC8vIERvbid0IHRyYWNrIHRoZSBpbmRleGVzIGFuZCByZW1vdmUgaW4gcmV2ZXJzZS5cbiAgICAgICAgZm9yIChsZXQgaSA9IChhcnJheS5sZW5ndGggLSAxKTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmIChlcXVhbGl0eUNvbXBhcmVyKGFycmF5W2ldLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gU2luY2UgdGhlIHVzZXIgd2lsbCBleHBlY3QgaXQgdG8gaGFwcGVuIGluIGZvcndhcmQgb3JkZXIuLi5cbiAgICAgICAgY29uc3QgZm91bmQgPSBbXTsgLy8gaW5kZXhlcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxpdHlDb21wYXJlcihhcnJheVtpXSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZm91bmQucHVzaChpKTtcbiAgICAgICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSBtYXgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSBmb3VuZC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGZvdW5kW2ldLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG59XG4vKipcbiAqIFNpbXBseSByZXBlYXRzIGEgdmFsdWUgdGhlIG51bWJlciBvZiB0aW1lcyBzcGVjaWZpZWQuXG4gKiBAcGFyYW0gZWxlbWVudFxuICogQHBhcmFtIGNvdW50XG4gKiBAcmV0dXJucyB7VFtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0KGVsZW1lbnQsIGNvdW50KSB7XG4gICAgSW50ZWdlci5hc3NlcnQoY291bnQsICdjb3VudCcpO1xuICAgIGlmIChjb3VudCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2NvdW50JywgY291bnQsIENCTDApO1xuICAgIGNvbnN0IHJlc3VsdCA9IGluaXRpYWxpemUoY291bnQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gPSBlbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgcmFuZ2Ugb2YgbnVtYmVycyBiYXNlZCB1cG9uIHRoZSBmaXJzdCB2YWx1ZSBhbmQgdGhlIHN0ZXAgdmFsdWUuXG4gKiBAcGFyYW0gZmlyc3RcbiAqIEBwYXJhbSBjb3VudFxuICogQHBhcmFtIHN0ZXBcbiAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlKGZpcnN0LCBjb3VudCwgc3RlcCA9IDEpIHtcbiAgICBpZiAoaXNOYU4oZmlyc3QpIHx8ICFpc0Zpbml0ZShmaXJzdCkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2ZpcnN0JywgZmlyc3QsIFZGTik7XG4gICAgaWYgKGlzTmFOKGNvdW50KSB8fCAhaXNGaW5pdGUoY291bnQpKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdjb3VudCcsIGNvdW50LCBWRk4pO1xuICAgIGlmIChjb3VudCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2NvdW50JywgY291bnQsIENCTDApO1xuICAgIGNvbnN0IHJlc3VsdCA9IGluaXRpYWxpemUoY291bnQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gPSBmaXJzdDtcbiAgICAgICAgZmlyc3QgKz0gc3RlcDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogUmV0dXJucyBhIHJhbmdlIG9mIG51bWJlcnMgYmFzZWQgdXBvbiB0aGUgZmlyc3QgdmFsdWUgYW5kIHRoZSBzdGVwIHZhbHVlIGV4Y2x1ZGluZyBhbnkgbnVtYmVycyBhdCBvciBiZXlvbmQgdGhlIHVudGlsIHZhbHVlLlxuICogQHBhcmFtIGZpcnN0XG4gKiBAcGFyYW0gdW50aWxcbiAqIEBwYXJhbSBzdGVwXG4gKiBAcmV0dXJucyB7bnVtYmVyW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5nZVVudGlsKGZpcnN0LCB1bnRpbCwgc3RlcCA9IDEpIHtcbiAgICBpZiAoc3RlcCA9PSAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzdGVwJywgc3RlcCwgQ0IwKTtcbiAgICByZXR1cm4gcmFuZ2UoZmlyc3QsICh1bnRpbCAtIGZpcnN0KSAvIHN0ZXAsIHN0ZXApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RpbmN0KHNvdXJjZSkge1xuICAgIGlmICghc291cmNlKVxuICAgICAgICByZXR1cm4gW107IC8vIEFsbG93aW5nIGZvciBudWxsIGZhY2lsaXRhdGVzIHJlZ2V4IGZpbHRlcmluZy5cbiAgICBjb25zdCBzZWVuID0ge307XG4gICAgcmV0dXJuIHNvdXJjZS5maWx0ZXIoZSA9PiAhKGUgaW4gc2VlbikgJiYgKHNlZW5bZV0gPSB0cnVlKSk7XG59XG4vKipcbiAqIFRha2VzIGFueSBhcnJheXMgd2l0aGluIGFuIGFycmF5IGFuZCBpbnNlcnRzIHRoZSB2YWx1ZXMgY29udGFpbmVkIHdpdGhpbiBpbiBwbGFjZSBvZiB0aGF0IGFycmF5LlxuICogRm9yIGV2ZXJ5IGNvdW50IGhpZ2hlciB0aGFuIDAgaW4gcmVjdXJzZURlcHRoIGl0IHdpbGwgYXR0ZW1wdCBhbiBhZGRpdGlvbmFsIHBhc3MuICBQYXNzaW5nIEluZmluaXR5IHdpbGwgZmxhdHRlbiBhbGwgYXJyYXlzIGNvbnRhaW5lZC5cbiAqIEBwYXJhbSBhXG4gKiBAcGFyYW0gcmVjdXJzZURlcHRoXG4gKiBAcmV0dXJucyB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGEsIHJlY3Vyc2VEZXB0aCA9IDApIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHggPSBhW2ldO1xuICAgICAgICBpZiAoKHgpIGluc3RhbmNlb2YgKEFycmF5KSkge1xuICAgICAgICAgICAgaWYgKHJlY3Vyc2VEZXB0aCA+IDApXG4gICAgICAgICAgICAgICAgeCA9IGZsYXR0ZW4oeCwgcmVjdXJzZURlcHRoIC0gMSk7XG4gICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHgubGVuZ3RoOyBuKyspXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goeFtuXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goeCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VdGlsaXR5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvVXRpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgU3lzdGVtRXhjZXB0aW9uIH0gZnJvbSBcIi4vU3lzdGVtRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnTm90SW1wbGVtZW50ZWRFeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIE5vdEltcGxlbWVudGVkRXhjZXB0aW9uIGV4dGVuZHMgU3lzdGVtRXhjZXB0aW9uIHtcbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU5vdEltcGxlbWVudGVkRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9Ob3RJbXBsZW1lbnRlZEV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0ICogYXMgVmFsdWVzIGZyb20gXCIuLi8uLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBTb3J0Q29udGV4dCB9IGZyb20gXCIuL1NvcnRDb250ZXh0XCI7XG5pbXBvcnQgeyBGdW5jdGlvbnMgfSBmcm9tIFwiLi4vLi4vRnVuY3Rpb25zXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmV4cG9ydCBjbGFzcyBLZXlTb3J0ZWRDb250ZXh0IGV4dGVuZHMgU29ydENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKG5leHQsIF9rZXlTZWxlY3Rvciwgb3JkZXIgPSAxIC8qIEFzY2VuZGluZyAqLywgY29tcGFyZXIgPSBWYWx1ZXMuY29tcGFyZSkge1xuICAgICAgICBzdXBlcihuZXh0LCBjb21wYXJlciwgb3JkZXIpO1xuICAgICAgICB0aGlzLl9rZXlTZWxlY3RvciA9IF9rZXlTZWxlY3RvcjtcbiAgICB9XG4gICAgY29tcGFyZShhLCBiKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQga3MgPSBfLl9rZXlTZWxlY3RvcjtcbiAgICAgICAgaWYgKCFrcyB8fCBrcyA9PSBGdW5jdGlvbnMuSWRlbnRpdHkpXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuY29tcGFyZShhLCBiKTtcbiAgICAgICAgLy8gV2UgZm9yY2UgPGFueT4gaGVyZSBzaW5jZSBpdCBjYW4gYmUgYSBQcmltaXRpdmUgb3IgSUNvbXBhcmFibGU8YW55PlxuICAgICAgICBjb25zdCBkID0gVmFsdWVzLmNvbXBhcmUoa3MoYSksIGtzKGIpKTtcbiAgICAgICAgaWYgKGQgPT0gMCAmJiBfLl9uZXh0KVxuICAgICAgICAgICAgcmV0dXJuIF8uX25leHQuY29tcGFyZShhLCBiKTtcbiAgICAgICAgcmV0dXJuIF8uX29yZGVyICogZDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBLZXlTb3J0ZWRDb250ZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9S2V5U29ydGVkQ29udGV4dC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL1NvcnRpbmcvS2V5U29ydGVkQ29udGV4dC5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0ICogYXMgVmFsdWVzIGZyb20gXCIuLi8uLi9Db21wYXJlXCI7XG5leHBvcnQgY2xhc3MgU29ydENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKF9uZXh0LCBfY29tcGFyZXIgPSBWYWx1ZXMuY29tcGFyZSwgX29yZGVyID0gMSAvKiBBc2NlbmRpbmcgKi8pIHtcbiAgICAgICAgdGhpcy5fbmV4dCA9IF9uZXh0O1xuICAgICAgICB0aGlzLl9jb21wYXJlciA9IF9jb21wYXJlcjtcbiAgICAgICAgdGhpcy5fb3JkZXIgPSBfb3JkZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpcmVjdGlvbiBvZiB0aGUgY29tcGFyaXNvbi5cbiAgICAgKiBAdHlwZSB7T3JkZXJ9XG4gICAgICovXG4gICAgZ2V0IG9yZGVyKCkgeyByZXR1cm4gdGhpcy5fb3JkZXI7IH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYW4gYXJyYXkgb2YgaW5kZXhlcyBmcm9tIHRoZSBzb3VyY2UgaW4gb3JkZXIgb2YgdGhlaXIgZXhwZWN0ZWQgaW50ZXJuYWxTb3J0IHdpdGhvdXQgbW9kaWZ5aW5nIHRoZSBzb3VyY2UuXG4gICAgICogQHBhcmFtIHNvdXJjZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAgICAgKi9cbiAgICBnZW5lcmF0ZVNvcnRlZEluZGV4ZXMoc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gc291cmNlLm1hcCgocywgaSkgPT4gaSk7XG4gICAgICAgIHJlc3VsdC5zb3J0KChhLCBiKSA9PiB0aGlzLmNvbXBhcmUoc291cmNlW2FdLCBzb3VyY2VbYl0pKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcGFyZXMgdHdvIHZhbHVlcyBiYXNlZCB1cG9uIFNvcnRDb250ZXh0IHBhcmFtZXRlcnMuXG4gICAgICogQHBhcmFtIGFcbiAgICAgKiBAcGFyYW0gYlxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgY29tcGFyZShhLCBiKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBkID0gXy5fY29tcGFyZXIoYSwgYik7XG4gICAgICAgIGlmIChkID09IDAgJiYgXy5fbmV4dClcbiAgICAgICAgICAgIHJldHVybiBfLl9uZXh0LmNvbXBhcmUoYSwgYik7XG4gICAgICAgIHJldHVybiBfLl9vcmRlciAqIGQ7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU29ydENvbnRleHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Tb3J0Q29udGV4dC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL1NvcnRpbmcvU29ydENvbnRleHQuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVRcbiAqL1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuL0ludGVnZXJcIjtcbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tIFwiLi9Db2xsZWN0aW9ucy9BcnJheS9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBzaHVmZmxlIGFzIGFycmF5U2h1ZmZsZSB9IGZyb20gXCIuL0NvbGxlY3Rpb25zL0FycmF5L3NodWZmbGVcIjtcbnZhciBhc3NlcnQgPSBJbnRlZ2VyLmFzc2VydDtcbi8qKlxuICogVGhpcyBtb2R1bGUgb25seSBhY3RzIGFzIGEgdXRpbGl0eSBBUEkgZm9yIGdldHRpbmcgcmFuZG9tIG51bWJlcnMgZnJvbSBNYXRoLnJhbmRvbSgpLlxuICogSWYgeW91IG5lZWQgcmVwZWF0YWJsZSBzZWVkZWQgcmFuZG9tIG51bWJlcnMgdGhlbiB5b3UnbGwgbmVlZCBhIHNlcGFyYXRlIHV0aWxpdHkuXG4gKiBIaWdobHkgcmVjb21tZW5kZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9ja2tuaWdodC9yYW5kb20tanMgd2hpY2ggaGFzIHR5cGluZ3MgdW5kZXIgQHR5cGVzL3JhbmRvbS1qcy5cbiAqL1xuZXhwb3J0IHZhciBSYW5kb207XG4oZnVuY3Rpb24gKFJhbmRvbSkge1xuICAgIGZ1bmN0aW9uIHIobWF4RXhjbHVzaXZlID0gMSkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4RXhjbHVzaXZlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbnIoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICBjb25zdCBhID0gTWF0aC5hYnMoYm91bmRhcnkpO1xuICAgICAgICBpZiAoYSA9PT0gMCB8fCBhID09PSAxICYmICFpbmNsdXNpdmUpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgaWYgKGluY2x1c2l2ZSlcbiAgICAgICAgICAgIGJvdW5kYXJ5ICs9IGJvdW5kYXJ5IC8gYTtcbiAgICAgICAgcmV0dXJuIHIoYm91bmRhcnkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhcnJheUNvcHkoc291cmNlKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGluaXRpYWxpemUobGVuKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBmcm9tIDAgdG8gdGhlIG1heEV4Y2x1c2l2ZS5cbiAgICAgKiBOZWdhdGl2ZSBudW1iZXJzIGFyZSBhbGxvd2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1heEV4Y2x1c2l2ZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gaW50ZWdlcihtYXhFeGNsdXNpdmUpIHtcbiAgICAgICAgcmV0dXJuIG5leHQobWF4RXhjbHVzaXZlKTtcbiAgICB9XG4gICAgUmFuZG9tLmludGVnZXIgPSBpbnRlZ2VyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyByYW5kb20gZmxvYXRpbmcgcG9pbnQgbnVtYmVycyB1cCB0byB0aGUgbWF4RXhjbHVzaXZlIHZhbHVlLlxuICAgICAqIFVzZWZ1bCBmb3IgZ2VuZXJhdGluZyBhIHJhbmRvbSBhbmQgbWVtb2l6YWJsZSBzZXQgZm9yIHVzZSB3aXRoIG90aGVyIGVudW1lcmFibGVzLlxuICAgICAqIEBwYXJhbSBtYXhFeGNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyB7KCk9Pm51bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZShtYXhFeGNsdXNpdmUgPSAxKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiByKG1heEV4Y2x1c2l2ZSk7XG4gICAgfVxuICAgIFJhbmRvbS5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xuICAgIChmdW5jdGlvbiAoZ2VuZXJhdGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyByYW5kb20gaW50ZWdlcnMgdXAgdG8gdGhlIGJvdW5kYXJ5LlxuICAgICAgICAgKiBVc2VmdWwgZm9yIGdlbmVyYXRpbmcgYSByYW5kb20gYW5kIG1lbW9pemFibGUgc2V0IGZvciB1c2Ugd2l0aCBvdGhlciBlbnVtZXJhYmxlcy5cbiAgICAgICAgICogQHBhcmFtIGJvdW5kYXJ5XG4gICAgICAgICAqIEBwYXJhbSBpbmNsdXNpdmVcbiAgICAgICAgICogQHJldHVybnMgeygpPT5udW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBpbnRlZ2Vycyhib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2VuZXJhdGUuaW50ZWdlcnMgPSBpbnRlZ2VycztcbiAgICB9KShnZW5lcmF0ZSA9IFJhbmRvbS5nZW5lcmF0ZSB8fCAoUmFuZG9tLmdlbmVyYXRlID0ge30pKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgZnJvbSAwIHRvIHRoZSBib3VuZGFyeS5cbiAgICAgKiBSZXR1cm4gdmFsdWUgd2lsbCBiZSBsZXNzIHRoYW4gdGhlIGJvdW5kYXJ5IHVubGVzcyBpbmNsdXNpdmUgaXMgc2V0IHRvIHRydWUuXG4gICAgICogTmVnYXRpdmUgbnVtYmVycyBhcmUgYWxsb3dlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBib3VuZGFyeVxuICAgICAqIEBwYXJhbSBpbmNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5leHQoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICBhc3NlcnQoYm91bmRhcnksICdib3VuZGFyeScpO1xuICAgICAgICByZXR1cm4gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgfVxuICAgIFJhbmRvbS5uZXh0ID0gbmV4dDtcbiAgICAoZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgZnVuY3Rpb24gaW50ZWdlcihib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gUmFuZG9tLm5leHQoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dC5pbnRlZ2VyID0gaW50ZWdlcjtcbiAgICAgICAgZnVuY3Rpb24gZmxvYXQoYm91bmRhcnkgPSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4oYm91bmRhcnkpKVxuICAgICAgICAgICAgICAgIHRocm93IFwiJ2JvdW5kYXJ5JyBpcyBub3QgYSBudW1iZXIuXCI7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIGJvdW5kYXJ5O1xuICAgICAgICB9XG4gICAgICAgIG5leHQuZmxvYXQgPSBmbG9hdDtcbiAgICAgICAgZnVuY3Rpb24gaW5SYW5nZShtaW4sIG1heCwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICBhc3NlcnQobWluLCAnbWluJyk7XG4gICAgICAgICAgICBhc3NlcnQobWF4LCAnbWF4Jyk7XG4gICAgICAgICAgICBsZXQgcmFuZ2UgPSBtYXggLSBtaW47XG4gICAgICAgICAgICBpZiAocmFuZ2UgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgICAgIGlmIChpbmNsdXNpdmUpXG4gICAgICAgICAgICAgICAgcmFuZ2UgKz0gcmFuZ2UgLyBNYXRoLmFicyhyYW5nZSk7XG4gICAgICAgICAgICByZXR1cm4gbWluICsgcihyYW5nZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dC5pblJhbmdlID0gaW5SYW5nZTtcbiAgICB9KShuZXh0ID0gUmFuZG9tLm5leHQgfHwgKFJhbmRvbS5uZXh0ID0ge30pKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHJhbmRvbSBpbnRlZ2Vycy5cbiAgICAgKiBAcGFyYW0gY291bnRcbiAgICAgKiBAcGFyYW0gYm91bmRhcnlcbiAgICAgKiBAcGFyYW0gaW5jbHVzaXZlXG4gICAgICogQHJldHVybnMge251bWJlcltdfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGludGVnZXJzKGNvdW50LCBib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgIGFzc2VydChjb3VudCk7XG4gICAgICAgIGNvbnN0IHMgPSBbXTtcbiAgICAgICAgcy5sZW5ndGggPSBjb3VudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBzW2ldID0gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIFJhbmRvbS5pbnRlZ2VycyA9IGludGVnZXJzO1xuICAgIC8qKlxuICAgICAqIFNodWZmbGVzIGFuIGFycmF5LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyB7VH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzaHVmZmxlKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gYXJyYXlTaHVmZmxlKHRhcmdldCk7XG4gICAgfVxuICAgIFJhbmRvbS5zaHVmZmxlID0gc2h1ZmZsZTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY29weSBvZiBhbiBhcnJheS1saWtlICBhbmQgcmV0dXJucyBpdCBzaHVmZmxlZC5cbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHJldHVybnMge1RbXX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb3B5KHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gYXJyYXlTaHVmZmxlKGFycmF5Q29weShzb3VyY2UpKTtcbiAgICB9XG4gICAgUmFuZG9tLmNvcHkgPSBjb3B5O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBkaXN0aW5jdCByYW5kb20gc2V0IGZyb20gdGhlIHNvdXJjZSBhcnJheSB1cCB0byB0aGUgbWF4Q291bnQgb3IgdGhlIGZ1bGwgbGVuZ3RoIG9mIHRoZSBhcnJheS5cbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHBhcmFtIG1heENvdW50XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZWxlY3Qoc291cmNlLCBtYXhDb3VudCkge1xuICAgICAgICBpZiAobWF4Q291bnQgIT09IEluZmluaXR5KVxuICAgICAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKG1heENvdW50KTtcbiAgICAgICAgc3dpdGNoIChtYXhDb3VudCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gW3NlbGVjdC5vbmUoc291cmNlLCB0cnVlKV07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBhcnJheVNodWZmbGUoYXJyYXlDb3B5KHNvdXJjZSkpO1xuICAgICAgICAgICAgICAgIGlmIChtYXhDb3VudCA8IHJlc3VsdC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5sZW5ndGggPSBtYXhDb3VudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFJhbmRvbS5zZWxlY3QgPSBzZWxlY3Q7XG4gICAgKGZ1bmN0aW9uIChzZWxlY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gb25lKHNvdXJjZSwgdGhyb3dJZkVtcHR5KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZVtyKHNvdXJjZS5sZW5ndGgpXTtcbiAgICAgICAgICAgIGlmICh0aHJvd0lmRW1wdHkpXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJDYW5ub3Qgc2VsZWN0IGZyb20gYW4gZW1wdHkgc2V0LlwiO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdC5vbmUgPSBvbmU7XG4gICAgfSkoc2VsZWN0ID0gUmFuZG9tLnNlbGVjdCB8fCAoUmFuZG9tLnNlbGVjdCA9IHt9KSk7XG59KShSYW5kb20gfHwgKFJhbmRvbSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SYW5kb20uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9SYW5kb20uanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbi8qKlxuICogUmFuZG9taXplIGFycmF5IGVsZW1lbnQgb3JkZXIgaW4tcGxhY2UuXG4gKiBVc2luZyBEdXJzdGVuZmVsZCBzaHVmZmxlIGFsZ29yaXRobS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNodWZmbGUodGFyZ2V0KSB7XG4gICAgbGV0IGkgPSB0YXJnZXQubGVuZ3RoO1xuICAgIHdoaWxlICgtLWkpIHtcbiAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICBjb25zdCB0ZW1wID0gdGFyZ2V0W2ldO1xuICAgICAgICB0YXJnZXRbaV0gPSB0YXJnZXRbal07XG4gICAgICAgIHRhcmdldFtqXSA9IHRlbXA7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaHVmZmxlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvc2h1ZmZsZS5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBPcmlnaW46IGh0dHA6Ly93d3cuZmFsbGluZ2NhbmJlZGVhZGx5LmNvbS9cbiAqIExpY2Vuc2luZzogTUlUXG4gKi9cbmltcG9ydCB7IFJlYWRPbmx5Q29sbGVjdGlvbkJhc2UgfSBmcm9tIFwiLi9SZWFkT25seUNvbGxlY3Rpb25CYXNlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi4vSW50ZWdlclwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5leHBvcnQgY2xhc3MgTGF6eUxpc3QgZXh0ZW5kcyBSZWFkT25seUNvbGxlY3Rpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZW51bWVyYXRvciA9IHNvdXJjZS5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgIHRoaXMuX2NhY2hlZCA9IFtdO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLl9lbnVtZXJhdG9yO1xuICAgICAgICB0aGlzLl9lbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgaWYgKGUpXG4gICAgICAgICAgICBlLmRpc3Bvc2UoKTtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuX2NhY2hlZDtcbiAgICAgICAgdGhpcy5fY2FjaGVkID0gbnVsbDtcbiAgICAgICAgaWYgKGMpXG4gICAgICAgICAgICBjLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIF9nZXRDb3VudCgpIHtcbiAgICAgICAgdGhpcy5maW5pc2goKTtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuX2NhY2hlZDtcbiAgICAgICAgcmV0dXJuIGMgPyBjLmxlbmd0aCA6IDA7XG4gICAgfVxuICAgIF9nZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICBsZXQgY3VycmVudDtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICBjdXJyZW50ID0gMDtcbiAgICAgICAgfSwgeWllbGRlciA9PiB7XG4gICAgICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuX2NhY2hlZDtcbiAgICAgICAgICAgIHJldHVybiAoY3VycmVudCA8IGMubGVuZ3RoIHx8IHRoaXMuZ2V0TmV4dCgpKVxuICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihjW2N1cnJlbnQrK10pXG4gICAgICAgICAgICAgICAgOiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldChpbmRleCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgpO1xuICAgICAgICBjb25zdCBjID0gdGhpcy5fY2FjaGVkO1xuICAgICAgICB3aGlsZSAoYy5sZW5ndGggPD0gaW5kZXggJiYgdGhpcy5nZXROZXh0KCkpIHsgfVxuICAgICAgICBpZiAoaW5kZXggPCBjLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBjW2luZGV4XTtcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcImluZGV4XCIsIFwiR3JlYXRlciB0aGFuIHRvdGFsIGNvdW50LlwiKTtcbiAgICB9XG4gICAgaW5kZXhPZihpdGVtKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIGxldCByZXN1bHQgPSBjLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIHdoaWxlIChyZXN1bHQgPT0gLTEgJiYgdGhpcy5nZXROZXh0KHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBpdGVtKVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGMubGVuZ3RoIC0gMTtcbiAgICAgICAgfSkpIHsgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjb250YWlucyhpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4T2YoaXRlbSkgIT0gLTE7XG4gICAgfVxuICAgIGdldE5leHQob3V0KSB7XG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLl9lbnVtZXJhdG9yO1xuICAgICAgICBpZiAoIWUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZS5jdXJyZW50O1xuICAgICAgICAgICAgdGhpcy5fY2FjaGVkLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgaWYgKG91dClcbiAgICAgICAgICAgICAgICBvdXQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2VudW1lcmF0b3IgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZmluaXNoKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0KCkpIHsgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxhenlMaXN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvTGF6eUxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IENvbGxlY3Rpb25CYXNlIH0gZnJvbSBcIi4vQ29sbGVjdGlvbkJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIFJlYWRPbmx5Q29sbGVjdGlvbkJhc2UgZXh0ZW5kcyBDb2xsZWN0aW9uQmFzZSB7XG4gICAgZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDb3VudCgpO1xuICAgIH1cbiAgICBnZXRJc1JlYWRPbmx5KCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfYWRkSW50ZXJuYWwoZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIF9yZW1vdmVJbnRlcm5hbChlbnRyeSwgbWF4KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBfY2xlYXJJbnRlcm5hbCgpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRFbnVtZXJhdG9yKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUmVhZE9ubHlDb2xsZWN0aW9uQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlYWRPbmx5Q29sbGVjdGlvbkJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9SZWFkT25seUNvbGxlY3Rpb25CYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9