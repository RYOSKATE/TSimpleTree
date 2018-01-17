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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
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
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ArgumentException__ = __webpack_require__(3);
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Text_Utility__ = __webpack_require__(22);
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ArgumentException__ = __webpack_require__(3);
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Disposable_DisposableBase__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Disposable_ObjectPool__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__IteratorResult__ = __webpack_require__(15);
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Integer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(8);
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
/* harmony export (immutable) */ __webpack_exports__["InvalidOperationException"] = InvalidOperationException;

/* harmony default export */ __webpack_exports__["default"] = (InvalidOperationException);
//# sourceMappingURL=InvalidOperationException.js.map

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exception__ = __webpack_require__(42);
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ObjectDisposedException__ = __webpack_require__(24);
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
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initialize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Integer__ = __webpack_require__(6);
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
/* 12 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Disposable_dispose__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ArrayEnumerator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__IndexEnumerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__InfiniteEnumerator__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__EmptyEnumerator__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__IteratorEnumerator__ = __webpack_require__(30);
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
/* 13 */
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EnumeratorBase__ = __webpack_require__(5);
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
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Enumeration_Enumerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Disposable_DisposableBase__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Environment__ = __webpack_require__(49);
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
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_InvalidOperationException__["InvalidOperationException"](CMRO);
        return true;
    }
    assertVersion(version) {
        if (version !== this._version)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_InvalidOperationException__["InvalidOperationException"]("Collection was modified.");
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
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = copy;
/* harmony export (immutable) */ __webpack_exports__["b"] = copyTo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__initialize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
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
/* 22 */
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IndexEnumerator__ = __webpack_require__(14);
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'ObjectDisposedException';
class ObjectDisposedException extends __WEBPACK_IMPORTED_MODULE_0__Exceptions_InvalidOperationException__["InvalidOperationException"] {
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispose__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DisposableBase__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentException__ = __webpack_require__(3);
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
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__ = __webpack_require__(8);
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__ = __webpack_require__(28);
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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IteratorResult__ = __webpack_require__(15);
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IteratorResult__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Functions__ = __webpack_require__(16);
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__ = __webpack_require__(28);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


String.prototype.normalizeNewLine = function () {
    return this.replace(/\r?\n/g, '\r\n');
};

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["areAllEqual"] = areAllEqual;
/* harmony export (immutable) */ __webpack_exports__["areEqual"] = areEqual;
/* harmony export (immutable) */ __webpack_exports__["areEquivalent"] = areEquivalent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
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
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:import-name
var StringNode_1 = __webpack_require__(38);
exports.StringNode = StringNode_1.StringNode;
__webpack_require__(31);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var NamedNode_1 = __webpack_require__(39);
var StringNode = /** @class */function (_super) {
    __extends(StringNode, _super);
    function StringNode(node) {
        return _super.call(this, node) || this;
    }
    Object.defineProperty(StringNode.prototype, "Value", {
        get: function get() {
            return _super.prototype.getValue.call(this);
        },
        set: function set(value) {
            _super.prototype.setValue.call(this, value);
        },
        enumerable: true,
        configurable: true
    });
    StringNode.prototype.AddFirst = function (value) {
        if (typeof value === 'string') {
            return _super.prototype.AddFirst.call(this, new StringNode(value));
        }
        return _super.prototype.AddFirst.call(this, value);
    };
    StringNode.prototype.AddLast = function (value) {
        if (typeof value === 'string') {
            return _super.prototype.AddLast.call(this, new StringNode(value));
        }
        return _super.prototype.AddLast.call(this, value);
    };
    StringNode.prototype.AddNext = function (value) {
        if (typeof value === 'string') {
            return _super.prototype.AddNext.call(this, new StringNode(value));
        }
        return _super.prototype.AddNext.call(this, value);
    };
    StringNode.prototype.AddPrevious = function (value) {
        if (typeof value === 'string') {
            return _super.prototype.AddPrevious.call(this, new StringNode(value));
        }
        return _super.prototype.AddPrevious.call(this, value);
    };
    return StringNode;
}(NamedNode_1.NamedNode);
exports.StringNode = StringNode;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __webpack_require__(40);
var NamedNode = /** @class */function (_super) {
    __extends(NamedNode, _super);
    function NamedNode(node) {
        var _this = this;
        if (node !== undefined) {
            _this = _super.call(this, node) || this;
        }
        return _this;
    }
    Object.defineProperty(NamedNode.prototype, "Name", {
        get: function get() {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    NamedNode.prototype.set = function (name) {
        this.name = name;
    };
    // #region Traversal
    NamedNode.prototype.Child = function (name) {
        return _super.prototype.Children.call(this).where(function (node) {
            return node.Name === name;
        }).first();
    };
    NamedNode.prototype.Ancestors = function (nameOrInclusiveDepth, inclusiveDepth) {
        if (typeof nameOrInclusiveDepth !== 'string') {
            return _super.prototype.Ancestors.call(this, nameOrInclusiveDepth);
        }
        return _super.prototype.Ancestors.call(this, inclusiveDepth).where(function (node) {
            return node.Name === nameOrInclusiveDepth;
        });
    };
    NamedNode.prototype.AncestorsAndSelf = function (nameOrInclusiveDepth, inclusiveDepth) {
        if (typeof nameOrInclusiveDepth !== 'string') {
            return _super.prototype.AncestorsAndSelf.call(this, nameOrInclusiveDepth);
        }
        return _super.prototype.AncestorsAndSelf.call(this, inclusiveDepth).where(function (node) {
            return node.Name === nameOrInclusiveDepth;
        });
    };
    NamedNode.prototype.Children = function (name) {
        return name === undefined ? _super.prototype.Children.call(this) : _super.prototype.Children.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.NextsFromSelf = function (name) {
        return name === undefined ? _super.prototype.NextsFromSelf.call(this) : _super.prototype.NextsFromSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.NextsFromSelfAndSelf = function (name) {
        return name === undefined ? _super.prototype.NextsFromSelfAndSelf.call(this) : _super.prototype.NextsFromSelfAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.NextsFromLast = function (name) {
        return name === undefined ? _super.prototype.NextsFromLast.call(this) : _super.prototype.NextsFromLast.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.NextsFromLastAndSelf = function (name) {
        return name === undefined ? _super.prototype.NextsFromLastAndSelf.call(this) : _super.prototype.NextsFromLastAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.PrevsFromFirst = function (name) {
        return name === undefined ? _super.prototype.PrevsFromFirst.call(this) : _super.prototype.PrevsFromFirst.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.PrevsFromFirstAndSelf = function (name) {
        return name === undefined ? _super.prototype.PrevsFromFirstAndSelf.call(this) : _super.prototype.PrevsFromFirstAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.PrevsFromSelf = function (name) {
        return name === undefined ? _super.prototype.PrevsFromSelf.call(this) : _super.prototype.PrevsFromSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.PrevsFromSelfAndSelf = function (name) {
        return name === undefined ? _super.prototype.PrevsFromSelfAndSelf.call(this) : _super.prototype.PrevsFromSelfAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.Descendants = function (nameOrInclusiveDepth, inclusiveDepth) {
        if (typeof nameOrInclusiveDepth !== 'string') {
            return _super.prototype.Descendants.call(this, nameOrInclusiveDepth);
        }
        return _super.prototype.Descendants.call(this, inclusiveDepth).where(function (node) {
            return node.Name === nameOrInclusiveDepth;
        });
    };
    NamedNode.prototype.DescendantsAndSelf = function (nameOrInclusiveDepth, inclusiveDepth) {
        if (typeof nameOrInclusiveDepth !== 'string') {
            return _super.prototype.DescendantsAndSelf.call(this, nameOrInclusiveDepth);
        }
        return _super.prototype.DescendantsAndSelf.call(this, inclusiveDepth).where(function (node) {
            return node.Name === nameOrInclusiveDepth;
        });
    };
    NamedNode.prototype.Siblings = function (nameOrInclusiveEachLength, inclusiveEachLength) {
        if (typeof nameOrInclusiveEachLength !== 'string') {
            return _super.prototype.Siblings.call(this, nameOrInclusiveEachLength);
        }
        return _super.prototype.Siblings.call(this, inclusiveEachLength).where(function (node) {
            return node.Name === nameOrInclusiveEachLength;
        });
    };
    NamedNode.prototype.SiblingsAndSelf = function (nameOrInclusiveEachLength, inclusiveEachLength) {
        if (typeof nameOrInclusiveEachLength !== 'string') {
            return _super.prototype.SiblingsAndSelf.call(this, nameOrInclusiveEachLength);
        }
        return _super.prototype.SiblingsAndSelf.call(this, inclusiveEachLength).where(function (node) {
            return node.Name === nameOrInclusiveEachLength;
        });
    };
    NamedNode.prototype.AncestorsAndSiblingsAfterSelf = function (name) {
        return name === undefined ? _super.prototype.AncestorsAndSiblingsAfterSelf.call(this) : _super.prototype.AncestorsAndSiblingsAfterSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.AncestorsAndSiblingsAfterSelfAndSelf = function (name) {
        return name === undefined ? _super.prototype.AncestorsAndSiblingsAfterSelfAndSelf.call(this) : _super.prototype.AncestorsAndSiblingsAfterSelfAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.AncestorsAndSiblingsBeforeSelf = function (name) {
        return name === undefined ? _super.prototype.AncestorsAndSiblingsBeforeSelf.call(this) : _super.prototype.AncestorsAndSiblingsBeforeSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.AncestorsAndSiblingsBeforeSelfAndSelf = function (name) {
        return name === undefined ? _super.prototype.AncestorsAndSiblingsBeforeSelfAndSelf.call(this) : _super.prototype.AncestorsAndSiblingsBeforeSelfAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.AncestorsWithSingleChild = function (name) {
        return name === undefined ? _super.prototype.AncestorsWithSingleChild.call(this) : _super.prototype.AncestorsWithSingleChild.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.AncestorsWithSingleChildAndSelf = function (name) {
        return name === undefined ? _super.prototype.AncestorsWithSingleChildAndSelf.call(this) : _super.prototype.AncestorsWithSingleChildAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.DescendantsOfSingle = function (name) {
        return name === undefined ? _super.prototype.DescendantsOfSingle.call(this) : _super.prototype.DescendantsOfSingle.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.DescendantsOfSingleAndSelf = function (name) {
        return name === undefined ? _super.prototype.DescendantsOfSingleAndSelf.call(this) : _super.prototype.DescendantsOfSingleAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.DescendantsOfFirstChild = function (name) {
        return name === undefined ? _super.prototype.DescendantsOfFirstChild.call(this) : _super.prototype.DescendantsOfFirstChild.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.DescendantsOfFirstChildAndSelf = function (name) {
        return name === undefined ? _super.prototype.DescendantsOfFirstChildAndSelf.call(this) : _super.prototype.DescendantsOfFirstChildAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    return NamedNode;
}(Node_1.Node);
exports.NamedNode = NamedNode;

/***/ }),
/* 40 */
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
var Linq_1 = __webpack_require__(41);
var StringBuilder_1 = __webpack_require__(62);
var InvalidOperationException_1 = __webpack_require__(7);
__webpack_require__(31);
var Node = /** @class */function () {
    /// Initializes a new instance of the Node class with a default value.
    function Node(value) {
        this.firstChild = null;
        this.parent = null;
        this.cyclicPrev = this.ThisNode;
        this.cyclicNext = this.ThisNode;
        this.Value = value === undefined ? null : value;
    }
    Object.defineProperty(Node.prototype, "ThisNode", {
        get: function get() {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "FirstSibling", {
        get: function get() {
            return this.Parent != null ? this.Parent.FirstChild : this.ThisNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "LastSibling", {
        get: function get() {
            return this.Parent != null ? this.Parent.FirstChild.CyclicPrev : this.ThisNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "FirstChild", {
        get: function get() {
            return this._firstChild;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "firstChild", {
        set: function set(firstChild) {
            this._firstChild = firstChild;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "LastChild", {
        get: function get() {
            return this.FirstChild != null ? this.FirstChild.CyclicPrev : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "Parent", {
        get: function get() {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "parent", {
        set: function set(parent) {
            this._parent = parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "CyclicPrev", {
        get: function get() {
            return this._cyclicPrev;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "cyclicPrev", {
        set: function set(cyclicPrev) {
            this._cyclicPrev = cyclicPrev;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "CyclicNext", {
        get: function get() {
            return this._cyclicNext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "cyclicNext", {
        set: function set(cyclicNext) {
            this._cyclicNext = cyclicNext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "Prev", {
        get: function get() {
            return this.CyclicPrev !== this.LastSibling ? this.CyclicPrev : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "Next", {
        get: function get() {
            return this.CyclicNext !== this.FirstSibling ? this.CyclicNext : null;
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.getValue = function () {
        return this._value;
    };
    Node.prototype.setValue = function (value) {
        this._value = value;
    };
    Object.defineProperty(Node.prototype, "Value", {
        get: function get() {
            return this._value;
        },
        set: function set(value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "ChildrenCount", {
        get: function get() {
            return this.Children().count();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "LengthFromDeepestChild", {
        get: function get() {
            return this.GetLengthFromDeepestChild();
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.GetLengthFromDeepestChild = function () {
        var maxLength = 0;
        this.Children().forEach(function (child) {
            var length = child.GetLengthFromDeepestChild() + 1;
            if (maxLength < length) {
                maxLength = length;
            }
        });
        return maxLength;
    };
    Node.prototype.ChildAtOrNull = function (index) {
        return this.Children().elementAtOrDefault(index);
    };
    Node.prototype.Ancestors = function (inclusiveDepth) {
        return inclusiveDepth === undefined ? this.AncestorsAndSelf().skip(1) : this.Ancestors().take(inclusiveDepth);
    };
    Node.prototype.AncestorsAndSelf = function (inclusiveDepth) {
        if (inclusiveDepth !== undefined) {
            return this.AncestorsAndSelf().take(inclusiveDepth + 1);
        }
        function generator(_this) {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.Parent;
                        _a.label = 3;
                    case 3:
                        if (node != null) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.Children = function () {
        function generator(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.FirstChild;
                        if (!(node !== null)) return [3 /*break*/, 4];
                        terminal = node;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicNext;
                        _a.label = 3;
                    case 3:
                        if (node !== terminal) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.ReverseChildren = function () {
        function generator(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.LastChild;
                        if (node == null) {
                            return [2 /*return*/];
                        }
                        terminal = node;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicPrev;
                        _a.label = 3;
                    case 3:
                        if (node !== terminal) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.NextsFromSelf = function () {
        function generator1(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.CyclicNext;
                        terminal = _this.FirstSibling;
                        _a.label = 1;
                    case 1:
                        if (!(node !== terminal)) return [3 /*break*/, 3];
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicNext;
                        return [3 /*break*/, 1];
                    case 3:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator1(this));
    };
    Node.prototype.NextsFromSelfAndSelf = function () {
        return Linq_1.default.repeat(this.ThisNode, 1).concat(this.NextsFromSelf());
    };
    Node.prototype.NextsFromLast = function () {
        function generator(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.LastSibling;
                        terminal = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        if (!(node !== terminal)) return [3 /*break*/, 3];
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicPrev;
                        return [3 /*break*/, 1];
                    case 3:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.NextsFromLastAndSelf = function () {
        return this.NextsFromLast().concat(Linq_1.default.repeat(this.ThisNode, 1));
    };
    Node.prototype.PrevsFromFirst = function () {
        function generator(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.FirstSibling;
                        terminal = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        if (!(node !== terminal)) return [3 /*break*/, 3];
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicNext;
                        return [3 /*break*/, 1];
                    case 3:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.PrevsFromFirstAndSelf = function () {
        return this.PrevsFromFirst().concat(Linq_1.default.repeat(this.ThisNode, 1));
    };
    Node.prototype.PrevsFromSelf = function () {
        function generator(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.CyclicPrev;
                        terminal = _this.LastSibling;
                        _a.label = 1;
                    case 1:
                        if (!(node !== terminal)) return [3 /*break*/, 3];
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicPrev;
                        return [3 /*break*/, 1];
                    case 3:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.PrevsFromSelfAndSelf = function () {
        return Linq_1.default.repeat(this.ThisNode, 1).concat(this.PrevsFromSelf());
    };
    Node.prototype.Descendants = function (inclusiveDepth) {
        function generator(_this) {
            var start, cursor, start, cursor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(inclusiveDepth === undefined)) return [3 /*break*/, 8];
                        start = _this.ThisNode;
                        cursor = start;
                        if (!(cursor.FirstChild != null)) return [3 /*break*/, 7];
                        cursor = cursor.FirstChild;
                        return [4 /*yield*/, cursor];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (false) return [3 /*break*/, 7];
                        _a.label = 3;
                    case 3:
                        if (!(cursor.FirstChild != null)) return [3 /*break*/, 5];
                        cursor = cursor.FirstChild;
                        return [4 /*yield*/, cursor];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 5:
                        while (cursor.Next == null) {
                            cursor = cursor.Parent;
                            if (cursor === start) {
                                return [2 /*return*/];
                            }
                        }
                        cursor = cursor.CyclicNext;
                        return [4 /*yield*/, cursor];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 7:
                        return [3 /*break*/, 15];
                    case 8:
                        start = _this.ThisNode;
                        cursor = start;
                        if (!(cursor.FirstChild != null && inclusiveDepth > 0)) return [3 /*break*/, 15];
                        cursor = cursor.FirstChild;
                        inclusiveDepth--;
                        return [4 /*yield*/, cursor];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (false) return [3 /*break*/, 15];
                        _a.label = 11;
                    case 11:
                        if (!(cursor.FirstChild != null && inclusiveDepth > 0)) return [3 /*break*/, 13];
                        cursor = cursor.FirstChild;
                        inclusiveDepth--;
                        return [4 /*yield*/, cursor];
                    case 12:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 13:
                        while (cursor.Next == null) {
                            cursor = cursor.Parent;
                            inclusiveDepth++;
                            if (cursor === start) {
                                return [2 /*return*/];
                            }
                        }
                        cursor = cursor.CyclicNext;
                        return [4 /*yield*/, cursor];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 15:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.DescendantsAndSelf = function (inclusiveDepth) {
        return inclusiveDepth === undefined ? Linq_1.default.repeat(this.ThisNode, 1).concat(this.Descendants()) : Linq_1.default.repeat(this.ThisNode, 1).concat(this.Descendants(inclusiveDepth));
    };
    Node.prototype.Siblings = function (inclusiveEachLength) {
        if (inclusiveEachLength !== undefined) {
            return this.PrevsFromSelf().take(inclusiveEachLength).reverse().concat(this.NextsFromSelf().take(inclusiveEachLength));
        }
        function generator(_this) {
            var first, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        first = _this.FirstSibling;
                        node = first;
                        _a.label = 1;
                    case 1:
                        if (!(node !== _this)) return [3 /*break*/, 3];
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicNext;
                        return [3 /*break*/, 1];
                    case 3:
                        node = node.CyclicNext;
                        _a.label = 4;
                    case 4:
                        if (!(node !== first)) return [3 /*break*/, 6];
                        return [4 /*yield*/, node];
                    case 5:
                        _a.sent();
                        node = node.CyclicNext;
                        return [3 /*break*/, 4];
                    case 6:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.SiblingsAndSelf = function (inclusiveEachLength) {
        if (inclusiveEachLength !== undefined) {
            return this.PrevsFromSelf().take(inclusiveEachLength).reverse().concat(Linq_1.default.repeat(this.ThisNode, 1)).concat(this.NextsFromSelf().take(inclusiveEachLength));
        }
        function generator(_this) {
            var first, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        first = _this.FirstSibling;
                        node = first;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicNext;
                        _a.label = 3;
                    case 3:
                        if (node !== first) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AncestorsAndSiblingsAfterSelf = function () {
        function generator(_this) {
            var node, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        e = node.NextsFromSelf().getEnumerator();
                        _a.label = 2;
                    case 2:
                        if (!e.moveNext()) return [3 /*break*/, 4];
                        return [4 /*yield*/, e.current];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4:
                        node = node.Parent;
                        _a.label = 5;
                    case 5:
                        if (node != null) return [3 /*break*/, 1];
                        _a.label = 6;
                    case 6:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AncestorsAndSiblingsAfterSelfAndSelf = function () {
        return Linq_1.default.repeat(this.ThisNode, 1).concat(this.AncestorsAndSiblingsAfterSelf());
    };
    Node.prototype.AncestorsAndSiblingsBeforeSelf = function () {
        return this.AncestorsAndSiblingsBeforeSelfAndSelf().skip(1);
    };
    Node.prototype.AncestorsAndSiblingsBeforeSelfAndSelf = function () {
        function generator(_this) {
            var node, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        e = node.PrevsFromSelfAndSelf().getEnumerator();
                        _a.label = 2;
                    case 2:
                        if (!e.moveNext()) return [3 /*break*/, 4];
                        return [4 /*yield*/, e.current];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4:
                        node = node.Parent;
                        _a.label = 5;
                    case 5:
                        if (node != null) return [3 /*break*/, 1];
                        _a.label = 6;
                    case 6:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AncestorWithSingleChild = function () {
        function generator(_this) {
            var node, lastNode;
            return __generator(this, function (_a) {
                node = _this.ThisNode;
                while (node === node.CyclicNext) {
                    lastNode = node;
                    node = node.Parent;
                    if (node == null) {
                        return [2 /*return*/, lastNode];
                    }
                }
                return [2 /*return*/, node];
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AncestorsWithSingleChild = function () {
        function generator(_this) {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        if (!(node === node.CyclicNext)) return [3 /*break*/, 3];
                        node = node.Parent;
                        if (node == null) {
                            return [3 /*break*/, 3];
                        }
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AncestorsWithSingleChildAndSelf = function () {
        function generator(_this) {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        return [4 /*yield*/, node];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(node === node.CyclicNext)) return [3 /*break*/, 4];
                        node = node.Parent;
                        if (node == null) {
                            return [3 /*break*/, 4];
                        }
                        return [4 /*yield*/, node];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.DescendantsOfSingle = function () {
        return this.DescendantsOfSingleAndSelf().skip(1);
    };
    Node.prototype.DescendantsOfSingleAndSelf = function () {
        function generator(_this) {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.FirstChild;
                        _a.label = 3;
                    case 3:
                        if (node != null && node === node.CyclicNext) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.DescendantsOfFirstChild = function () {
        return this.DescendantsOfFirstChildAndSelf().skip(1);
    };
    Node.prototype.DescendantsOfFirstChildAndSelf = function () {
        function generator(_this) {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.FirstChild;
                        _a.label = 3;
                    case 3:
                        if (node != null) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AddPrevious = function (node) {
        console.assert(node != null);
        console.assert(node.Parent == null);
        console.assert(this.Parent != null);
        if (this.Parent.FirstChild === this) {
            this.Parent.firstChild = node;
        }
        return this.AddPreviousIgnoringFirstChild(node);
    };
    Node.prototype.AddNext = function (node) {
        console.assert(node != null);
        console.assert(node.Parent == null);
        console.assert(this.Parent != null);
        return this.CyclicNext.AddPreviousIgnoringFirstChild(node);
    };
    Node.prototype.AddFirst = function (node) {
        console.assert(node != null);
        console.assert(node.Parent == null);
        return this.AddFirstPrivate(node);
    };
    Node.prototype.AddFirstPrivate = function (node) {
        this.AddLastPrivate(node);
        this.firstChild = node;
        return node;
    };
    Node.prototype.AddPreviousIgnoringFirstChild = function (node) {
        node.parent = this.Parent;
        node.cyclicNext = this.ThisNode;
        node.cyclicPrev = this.CyclicPrev;
        this.CyclicPrev.cyclicNext = node;
        this.cyclicPrev = node;
        return node;
    };
    Node.prototype.AddLast = function (node) {
        console.assert(node != null);
        console.assert(node.Parent == null);
        return this.AddLastPrivate(node);
    };
    Node.prototype.AddLastPrivate = function (node) {
        var second = this.FirstChild;
        if (second == null) {
            node.parent = this.ThisNode;
            node.cyclicNext = node;
            node.cyclicPrev = node;
            this.firstChild = node;
        } else {
            second.AddPreviousIgnoringFirstChild(node);
        }
        return node;
    };
    Node.prototype.Replace = function (newNode) {
        if (this.Parent == null) {
            throw new InvalidOperationException_1.InvalidOperationException('A root node cannot be replaced.');
        }
        newNode.parent = this.Parent;
        newNode.cyclicNext = this.CyclicNext;
        newNode.cyclicPrev = this.CyclicPrev;
        this.CyclicPrev.cyclicNext = newNode; // prev.next = newNode
        this.CyclicNext.cyclicPrev = newNode;
        newNode.CyclicPrev.cyclicNext = newNode;
        if (this.Parent.FirstChild === this) {
            this.Parent.firstChild = newNode;
        }
        this.cyclicNext = null;
        this.cyclicPrev = null;
        this.parent = null;
    };
    Node.prototype.Remove = function () {
        if (this.Parent == null) {
            throw new InvalidOperationException_1.InvalidOperationException('A root node cannot be removed.');
        }
        var next = this.CyclicNext;
        if (next !== this) {
            this.CyclicPrev.cyclicNext = next;
            next.cyclicPrev = this.CyclicPrev;
            if (this.Parent.FirstChild === this) {
                this.Parent.firstChild = next;
            }
        } else {
            this.Parent.firstChild = null;
        }
        this.cyclicNext = null;
        this.cyclicPrev = null;
        this.parent = null;
    };
    Node.prototype.RemoveRecoverably = function () {
        var _this = this;
        if (this.Parent == null) {
            throw new InvalidOperationException_1.InvalidOperationException('A root node cannot be removed.');
        }
        var next = this.CyclicNext;
        if (next !== this) {
            this.CyclicPrev.cyclicNext = next;
            next.cyclicPrev = this.CyclicPrev;
            if (this.Parent.FirstChild === this) {
                this.Parent.firstChild = next;
                return function () {
                    next.Parent.firstChild = _this.ThisNode;
                    _this.CyclicPrev.cyclicNext = _this.ThisNode;
                    next.cyclicPrev = _this.ThisNode;
                };
            }
            return function () {
                _this.CyclicPrev.cyclicNext = _this.ThisNode;
                next.cyclicPrev = _this.ThisNode;
            };
        }
        var parent = this.Parent;
        parent.firstChild = null;
        return function () {
            parent.firstChild = _this.ThisNode;
        };
    };
    Node.prototype.toString = function () {
        var builder = new StringBuilder_1.StringBuilder();
        this.ToStringPrivate(this.ThisNode, 0, builder);
        return builder.toString();
    };
    Node.prototype.ToStringPrivate = function (node, depth, builder) {
        var _this = this;
        if (node == null) {
            return;
        }
        for (var i = 0; i < depth; i++) {
            builder.append('  ');
        }
        builder.appendLine(!node.Value != null ? node.Value.toString() : '');
        var children = node.Children();
        children.forEach(function (child) {
            _this.ToStringPrivate(child, depth + 1, builder);
        });
    };
    return Node;
}();
exports.Node = Node;

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["Enumerable"] = Enumerable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__System_Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__System_Collections_Array_copy__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__System_Collections_Array_Compare__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__System_Collections_Enumeration_EmptyEnumerator__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__System_Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__System_Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__System_Functions__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__System_Collections_Enumeration_ArrayEnumerator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__System_Disposable_DisposableBase__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__System_Collections_Enumeration_UnsupportedEnumerableException__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__System_Disposable_ObjectDisposedException__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__System_Collections_Sorting_KeySortedContext__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__System_Collections_Enumeration_IndexEnumerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__System_Collections_Enumeration_IteratorEnumerator__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__System_Collections_Array_initialize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__System_Random__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__System_Collections_Enumeration_InfiniteEnumerator__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__System_Collections_LazyList__ = __webpack_require__(60);
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
            return __WEBPACK_IMPORTED_MODULE_2__System_Collections_Array_Compare__["areEqual"](this.source, second, true, equalityComparer);
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
/* 42 */
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
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TaskHandlerBase__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__ = __webpack_require__(2);
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
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Disposable_DisposableBase__ = __webpack_require__(9);
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
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LinkedNodeList__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Disposable_ObjectPool__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__getIdentifier__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DictionaryBase__ = __webpack_require__(48);
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
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Text_Utility__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__ = __webpack_require__(5);
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
            throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_InvalidOperationException__["InvalidOperationException"]("Collection was modified.");
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
        throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_InvalidOperationException__["InvalidOperationException"]("Cannot add a node to a LinkedNodeList that is already linked.");
}
/* unused harmony default export */ var _unused_webpack_default_export = (LinkedNodeList);
//# sourceMappingURL=LinkedNodeList.js.map

/***/ }),
/* 47 */
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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Enumeration_Enumerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CollectionBase__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__KeyNotFoundException__ = __webpack_require__(52);
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
            throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_InvalidOperationException__["InvalidOperationException"]("Cannot add 'undefined' as a value.");
        const _ = this;
        if (_.containsKey(key)) {
            const ex = new __WEBPACK_IMPORTED_MODULE_5__Exceptions_InvalidOperationException__["InvalidOperationException"]("Adding a key/value when the key already exists.");
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
/* 49 */
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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(50)))

/***/ }),
/* 50 */
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
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isKeyValuePair */
/* unused harmony export assertKey */
/* unused harmony export assertTuple */
/* unused harmony export assertNotUndefined */
/* harmony export (immutable) */ __webpack_exports__["a"] = extractKeyValue;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__ = __webpack_require__(2);
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
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__ = __webpack_require__(8);
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
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Array_Utility__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_NotImplementedException__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CollectionBase__ = __webpack_require__(17);
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
            throw new __WEBPACK_IMPORTED_MODULE_6__Exceptions_InvalidOperationException__["InvalidOperationException"]("Cannot dequeue an empty queue.");
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
                throw new __WEBPACK_IMPORTED_MODULE_6__Exceptions_InvalidOperationException__["InvalidOperationException"]("Cannot call peek on an empty queue.");
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
/* 54 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__initialize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__copy__ = __webpack_require__(21);
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
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(8);
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
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SortContext__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Functions__ = __webpack_require__(16);
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
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
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
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Random; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collections_Array_initialize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collections_Array_shuffle__ = __webpack_require__(59);
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
/* 59 */
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
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ReadOnlyCollectionBase__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Integer__ = __webpack_require__(6);
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
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CollectionBase__ = __webpack_require__(17);
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

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * .NET Reference: http://referencesource.microsoft.com/#mscorlib/system/text/StringBuilder.cs
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

/*****************************
 * IMPORTANT NOTES ABOUT PERFORMANCE:
 * http://jsperf.com/string-concatenation-looped
 * http://jsperf.com/adding-strings-to-an-array
 * http://jsperf.com/string-concatenation-versus-array-operations-with-join
 *
 * It is clearly inefficient to use a StringBuilder or LinkedList to build a string when you have a small set of string portions.
 * StringBuilder will really show it's benefit likely somewhere above 1000 items.
 *****************************/
const EMPTY = "";
const NEWLINE = "\r\n";
class StringBuilder {
    constructor(...initial) {
        this._latest = null;
        this._partArray = [];
        this.appendThese(initial);
    }
    appendSingle(item) {
        if (item != null) {
            const _ = this;
            _._latest = null;
            switch (typeof item) {
                case __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].OBJECT:
                case __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].FUNCTION:
                    item = item.toString();
                    break;
            }
            _._partArray.push(item); // Other primitive types can keep their format since a number or boolean is a smaller footprint than a string.
        }
    }
    appendThese(items) {
        const _ = this;
        items.forEach(s => _.appendSingle(s));
        return _;
    }
    append(...items) {
        this.appendThese(items);
        return this;
    }
    appendLine(...items) {
        this.appendLines(items);
        return this;
    }
    appendLines(items) {
        const _ = this;
        items.forEach(i => {
            if (i != null) {
                _.appendSingle(i);
                _._partArray.push(NEWLINE);
            }
        });
        return _;
    }
    /** /// These methods can only efficiently be added if not using a single array.
     insert(index: number, value: string, count: number = 1): StringBuilder
     {
    }
     remove(startIndex:number, length:number): StringBuilder
     {
    }
     /**/
    get isEmpty() {
        return this._partArray.length === 0;
    }
    toString() {
        let latest = this._latest;
        if (latest == null)
            this._latest = latest = this._partArray.join(EMPTY);
        return latest;
    }
    join(delimiter) {
        return this._partArray.join(delimiter);
    }
    clear() {
        this._partArray.length = 0;
        this._latest = null;
    }
    dispose() {
        this.clear();
    }
}
/* harmony export (immutable) */ __webpack_exports__["StringBuilder"] = StringBuilder;

/* harmony default export */ __webpack_exports__["default"] = (StringBuilder);
//# sourceMappingURL=StringBuilder.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIGRkN2M0Nzc1NzI5MjMzYjVkYWVkIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUeXBlcy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29tcGFyZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnROdWxsRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxBcmd1bWVudEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVudW1lcmF0b3JCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxJbnRlZ2VyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxTeXN0ZW1FeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXERpc3Bvc2FibGVcXERpc3Bvc2FibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGluaXRpYWxpemUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcRW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcZGlzcG9zZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJbmRleEVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSXRlcmF0b3JSZXN1bHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEZ1bmN0aW9ucy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXENvbGxlY3Rpb25CYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGNvcHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRleHRcXFV0aWxpdHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcQXJyYXlFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxEaXNwb3NhYmxlXFxPYmplY3REaXNwb3NlZEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcT2JqZWN0UG9vbC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSW5maW5pdGVFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXFNpbXBsZUVudW1lcmFibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVtcHR5RW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJdGVyYXRvckVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXHNyY1xcU3RyaW5nRXh0ZW5zaW9uLnRzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXENvbXBhcmUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXHNyY1xcaW5kZXgudHMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXHNyY1xcU3RyaW5nTm9kZS50cyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcc3JjXFxOYW1lZE5vZGUudHMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXHNyY1xcTm9kZS50cyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbS5MaW5xXFxMaW5xLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRocmVhZGluZ1xcVGFza3NcXFRhc2tIYW5kbGVyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUaHJlYWRpbmdcXFRhc2tzXFxUYXNrSGFuZGxlckJhc2UuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxEaWN0aW9uYXJpZXNcXERpY3Rpb25hcnkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxMaW5rZWROb2RlTGlzdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXERpY3Rpb25hcmllc1xcZ2V0SWRlbnRpZmllci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXERpY3Rpb25hcmllc1xcRGljdGlvbmFyeUJhc2UuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEVudmlyb25tZW50LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHByb2Nlc3NcXGJyb3dzZXIuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEtleVZhbHVlRXh0cmFjdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEtleU5vdEZvdW5kRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcUXVldWUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxBcnJheVxcVXRpbGl0eS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcTm90SW1wbGVtZW50ZWRFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxTb3J0aW5nXFxLZXlTb3J0ZWRDb250ZXh0LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcU29ydGluZ1xcU29ydENvbnRleHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFJhbmRvbS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEFycmF5XFxzaHVmZmxlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcTGF6eUxpc3QuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxSZWFkT25seUNvbGxlY3Rpb25CYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUZXh0XFxTdHJpbmdCdWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdJQUFnSSw2REFBNkQsRUFBRTtBQUMvTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7OztBQ3JOQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQzRCO0FBQ1U7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQjtBQUNBLG1DOzs7Ozs7OztBQ3ZGQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxxRDs7Ozs7OztBQ2RBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDdkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUFBO0FBQUE7QUFDQTtBQUNBLDBDOzs7Ozs7Ozs7QUN2Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2dCO0FBQ0Q7QUFDVztBQUNBO0FBQ2U7QUFDWjtBQUNNO0FBQ047QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2QkFBNkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxlQUFlLEVBQUU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw0QkFBNEIsRUFBRTtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7O0FDM0pBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyw4Q0FBOEM7QUFDbkQsQ0FBQywwQkFBMEI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGFBQWE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7O0FDaktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSwyQzs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCO0FBQ3BEO0FBQ0EsQ0FBQyx3Q0FBd0M7QUFDekM7QUFDQTtBQUNBLDBDOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUIsVUFBVTtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYSxjQUFjO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7QUM1REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQjtBQUNDO0FBQ2E7QUFDSTtBQUNYO0FBQ21CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUJBQXVCO0FBQ2pEO0FBQ0Esc0JBQXNCLG1DQUFtQztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHNDOzs7Ozs7O0FDcktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDBEOzs7Ozs7O0FDakJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsOEM7Ozs7Ozs7QUNwQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnSUFBcUQsK0JBQStCLEVBQUU7QUFDdEYsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EscUlBQTBEO0FBQzFELHFCQUFxQixJQUFJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNklBQXVEO0FBQ3ZELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlMQUF3RjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlJQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlJQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQSxpQkFBaUI7QUFDakIsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUlBQWlELFdBQVcsRUFBRTtBQUM5RCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUlBQTZDLGVBQWUsRUFBRTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyx1REFBdUQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsSUFBSTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUNqQztBQUNBLGdDOzs7Ozs7O0FDajBFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLCtCQUErQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7O0FDdEVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDTTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHVDOzs7Ozs7O0FDdkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7Ozs7Ozs7QUN2RUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ21CO0FBQ0o7QUFDVTtBQUNBO0FBQ0o7QUFDRztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsS0FBSztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7OztBQ25MQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lCO0FBQ21CO0FBQ1I7QUFDSTtBQUNQO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVOQUFpRixFQUFFLDJCQUEyQixFQUFFO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7O0FDcFdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDbUI7QUFDRDtBQUNPO0FBQ0E7QUFDTztBQUNJO0FBQ1Y7QUFDSztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkMsa0JBQWtCLHlCQUF5QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrSEFBbUQsSUFBSTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHlCQUF5QjtBQUN6RTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSwwQzs7Ozs7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLHVDOzs7Ozs7O0FDaENBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUM0QjtBQUNJO0FBQ2pCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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YjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFBQTtBQUFBO0FBQ0Esb0M7Ozs7Ozs7QUN2RkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0Esa0Q7Ozs7Ozs7O0FDN0JBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHlDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRkN2M0Nzc1NzI5MjMzYjVkYWVkIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuY29uc3QgVk9JRDAgPSB2b2lkICgwKSwgX0JPT0xFQU4gPSB0eXBlb2YgdHJ1ZSwgX05VTUJFUiA9IHR5cGVvZiAwLCBfU1RSSU5HID0gdHlwZW9mIFwiXCIsIF9TWU1CT0wgPSBcInN5bWJvbFwiLCBfT0JKRUNUID0gdHlwZW9mIHt9LCBfVU5ERUZJTkVEID0gdHlwZW9mIFZPSUQwLCBfRlVOQ1RJT04gPSB0eXBlb2YgZnVuY3Rpb24gKCkgeyB9LCBMRU5HVEggPSBcImxlbmd0aFwiO1xuLy8gT25seSB1c2VkIGZvciBwcmltaXRpdmVzLlxuY29uc3QgdHlwZUluZm9SZWdpc3RyeSA9IHt9O1xuLyoqXG4gKiBFeHBvc2VzIGVhc3kgYWNjZXNzIHRvIHR5cGUgaW5mb3JtYXRpb24gaW5jbHVkaW5nIGlucXVpcmluZyBhYm91dCBtZW1iZXJzLlxuICovXG5leHBvcnQgY2xhc3MgVHlwZUluZm8ge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgb25CZWZvcmVGcmVlemUpIHtcbiAgICAgICAgdGhpcy5pc0Jvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc051bWJlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RyaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNUcnVlTmFOID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNPYmplY3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0Z1bmN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNVbmRlZmluZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3ltYm9sID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlID0gdHlwZW9mIHRhcmdldCkge1xuICAgICAgICAgICAgY2FzZSBfQk9PTEVBTjpcbiAgICAgICAgICAgICAgICB0aGlzLmlzQm9vbGVhbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9OVU1CRVI6XG4gICAgICAgICAgICAgICAgdGhpcy5pc051bWJlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1RydWVOYU4gPSBpc05hTih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNGaW5pdGUgPSBpc0Zpbml0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZE51bWJlciA9ICF0aGlzLmlzVHJ1ZU5hTjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX1NUUklORzpcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3RyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX1NZTUJPTDpcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3ltYm9sID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc051bGxPclVuZGVmaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FycmF5ID0gKHRhcmdldCkgaW5zdGFuY2VvZiAoQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9GVU5DVElPTjpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRnVuY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfVU5ERUZJTkVEOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNVbmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNOdWxsT3JVbmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkZhdGFsIHR5cGUgZmFpbHVyZS4gIFVua25vd24gdHlwZTogXCIgKyB0aGlzLnR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uQmVmb3JlRnJlZXplKVxuICAgICAgICAgICAgb25CZWZvcmVGcmVlemUodGhpcyk7XG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBUeXBlSW5mbyBmb3IgYW55IG1lbWJlciBvciBub24tbWVtYmVyLFxuICAgICAqIHdoZXJlIG5vbi1tZW1iZXJzIGFyZSBvZiB0eXBlIHVuZGVmaW5lZC5cbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEByZXR1cm5zIHtUeXBlSW5mb31cbiAgICAgKi9cbiAgICBtZW1iZXIobmFtZSkge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIHJldHVybiBUeXBlSW5mby5nZXRGb3IodCAmJiAobmFtZSkgaW4gKHQpXG4gICAgICAgICAgICA/IHRbbmFtZV1cbiAgICAgICAgICAgIDogVk9JRDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgVHlwZUluZm8gZm9yIGFueSB0YXJnZXQgb2JqZWN0LlxuICAgICAqIElmIHRoZSB0YXJnZXQgb2JqZWN0IGlzIG9mIGEgcHJpbWl0aXZlIHR5cGUsIGl0IHJldHVybnMgdGhlIFR5cGVJbmZvIGluc3RhbmNlIGFzc2lnbmVkIHRvIHRoYXQgdHlwZS5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHJldHVybnMge1R5cGVJbmZvfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRGb3IodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdGFyZ2V0O1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgIGNhc2UgX0ZVTkNUSU9OOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVHlwZUluZm8odGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5mbyA9IHR5cGVJbmZvUmVnaXN0cnlbdHlwZV07XG4gICAgICAgIGlmICghaW5mbylcbiAgICAgICAgICAgIHR5cGVJbmZvUmVnaXN0cnlbdHlwZV0gPSBpbmZvID0gbmV3IFR5cGVJbmZvKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhcmdldCBtYXRjaGVzIHRoZSB0eXBlIChpbnN0YW5jZW9mKS5cbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgdHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSB0YXJnZXQgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIE90aGVyd2lzZSByZXR1cm5zIHRoZSB0YXJnZXQgYXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7VHxudWxsfVxuICAgICAqL1xuICAgIGFzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgdHlwZSA/IHRoaXMudGFyZ2V0IDogbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gVHlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVJbmZvKHRhcmdldCk7XG59XG4oZnVuY3Rpb24gKFR5cGUpIHtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgdHJ1ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5CT09MRUFOID0gX0JPT0xFQU47XG4gICAgLyoqXG4gICAgICogdHlwZW9mIDBcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuTlVNQkVSID0gX05VTUJFUjtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgXCJcIlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5TVFJJTkcgPSBfU1RSSU5HO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiB7fVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5PQkpFQ1QgPSBfT0JKRUNUO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiBTeW1ib2xcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuU1lNQk9MID0gX1NZTUJPTDtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgdW5kZWZpbmVkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLlVOREVGSU5FRCA9IF9VTkRFRklORUQ7XG4gICAgLyoqXG4gICAgICogdHlwZW9mIGZ1bmN0aW9uXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLkZVTkNUSU9OID0gX0ZVTkNUSU9OO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFyZ2V0IG1hdGNoZXMgdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtUfG51bGx9XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModGFyZ2V0LCB0eXBlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgICBUeXBlLmlzID0gaXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSB0YXJnZXQgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIE90aGVyd2lzZSByZXR1cm5zIHRoZSB0YXJnZXQgYXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMge1R8bnVsbH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcyh0YXJnZXQsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIHR5cGUgPyB0YXJnZXQgOiBudWxsO1xuICAgIH1cbiAgICBUeXBlLmFzID0gYXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGw7XG4gICAgfVxuICAgIFR5cGUuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIGJvb2xlYW4uXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9CT09MRUFOO1xuICAgIH1cbiAgICBUeXBlLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIG51bWJlci5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gaWdub3JlTmFOIERlZmF1bHQgaXMgZmFsc2UuIFdoZW4gdHJ1ZSwgTmFOIGlzIG5vdCBjb25zaWRlcmVkIGEgbnVtYmVyIGFuZCB3aWxsIHJldHVybiBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSwgaWdub3JlTmFOID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX05VTUJFUiAmJiAoIWlnbm9yZU5hTiB8fCAhaXNOYU4odmFsdWUpKTtcbiAgICB9XG4gICAgVHlwZS5pc051bWJlciA9IGlzTnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBpcyBhIG51bWJlciBhbmQgaXMgTmFOLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzVHJ1ZU5hTih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfTlVNQkVSICYmIGlzTmFOKHZhbHVlKTtcbiAgICB9XG4gICAgVHlwZS5pc1RydWVOYU4gPSBpc1RydWVOYU47XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX1NUUklORztcbiAgICB9XG4gICAgVHlwZS5pc1N0cmluZyA9IGlzU3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLCBzdHJpbmcsIG51bWJlciwgbnVsbCwgb3IgdW5kZWZpbmVkLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhbGxvd1VuZGVmaW5lZCBpZiBzZXQgdG8gdHJ1ZSB3aWxsIHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWUsIGFsbG93VW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdCA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgICBjYXNlIF9CT09MRUFOOlxuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBfTlVNQkVSOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgY2FzZSBfVU5ERUZJTkVEOlxuICAgICAgICAgICAgICAgIHJldHVybiBhbGxvd1VuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBUeXBlLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG4gICAgLyoqXG4gICAgICogRm9yIGRldGVjdGluZyBpZiB0aGUgdmFsdWUgY2FuIGJlIHVzZWQgYXMgYSBrZXkuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIGFsbG93VW5kZWZpbmVkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1ByaW1pdGl2ZU9yU3ltYm9sKHZhbHVlLCBhbGxvd1VuZGVmaW5lZCA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9TWU1CT0wgPyB0cnVlIDogaXNQcmltaXRpdmUodmFsdWUsIGFsbG93VW5kZWZpbmVkKTtcbiAgICB9XG4gICAgVHlwZS5pc1ByaW1pdGl2ZU9yU3ltYm9sID0gaXNQcmltaXRpdmVPclN5bWJvbDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLCBudW1iZXIsIG9yIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1Byb3BlcnR5S2V5KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgIHN3aXRjaCAodCkge1xuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBfTlVNQkVSOlxuICAgICAgICAgICAgY2FzZSBfU1lNQk9MOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgVHlwZS5pc1Byb3BlcnR5S2V5ID0gaXNQcm9wZXJ0eUtleTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX0ZVTkNUSU9OO1xuICAgIH1cbiAgICBUeXBlLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gYWxsb3dOdWxsIElmIGZhbHNlIChkZWZhdWx0KSBudWxsIGlzIG5vdCBjb25zaWRlcmVkIGFuIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSwgYWxsb3dOdWxsID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX09CSkVDVCAmJiAoYWxsb3dOdWxsIHx8IHZhbHVlICE9PSBudWxsKTtcbiAgICB9XG4gICAgVHlwZS5pc09iamVjdCA9IGlzT2JqZWN0O1xuICAgIC8qKlxuICAgICAqIEd1YXJhbnRlZXMgYSBudW1iZXIgdmFsdWUgb3IgTmFOIGluc3RlYWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBudW1iZXJPck5hTih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpID8gTmFOIDogdmFsdWU7XG4gICAgfVxuICAgIFR5cGUubnVtYmVyT3JOYU4gPSBudW1iZXJPck5hTjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgVHlwZUluZm8gb2JqZWN0IGZvciB0aGUgdGFyZ2V0LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyB7VHlwZUluZm99XG4gICAgICovXG4gICAgZnVuY3Rpb24gb2YodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBUeXBlSW5mby5nZXRGb3IodGFyZ2V0KTtcbiAgICB9XG4gICAgVHlwZS5vZiA9IG9mO1xuICAgIC8qKlxuICAgICAqIFdpbGwgZGV0ZWN0IGlmIGEgbWVtYmVyIGV4aXN0cyAodXNpbmcgJ2luJykuXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGEgcHJvcGVydHkgb3IgbWV0aG9kIGV4aXN0cyBvbiB0aGUgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUuXG4gICAgICogQHBhcmFtIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHByb3BlcnR5IE5hbWUgb2YgdGhlIG1lbWJlci5cbiAgICAgKiBAcGFyYW0gaWdub3JlVW5kZWZpbmVkIFdoZW4gaWdub3JlVW5kZWZpbmVkIGlzIHRydWUsIGlmIHRoZSBtZW1iZXIgZXhpc3RzIGJ1dCBpcyB1bmRlZmluZWQsIGl0IHdpbGwgcmV0dXJuIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc01lbWJlcihpbnN0YW5jZSwgcHJvcGVydHksIGlnbm9yZVVuZGVmaW5lZCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlICYmICFpc1ByaW1pdGl2ZShpbnN0YW5jZSkgJiYgKHByb3BlcnR5KSBpbiAoaW5zdGFuY2UpICYmIChpZ25vcmVVbmRlZmluZWQgfHwgaW5zdGFuY2VbcHJvcGVydHldICE9PSBWT0lEMCk7XG4gICAgfVxuICAgIFR5cGUuaGFzTWVtYmVyID0gaGFzTWVtYmVyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbWVtYmVyIG1hdGNoZXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIHByb3BlcnR5LCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBoYXNNZW1iZXIoaW5zdGFuY2UsIHByb3BlcnR5KSAmJiB0eXBlb2YgKGluc3RhbmNlW3Byb3BlcnR5XSkgPT09IHR5cGU7XG4gICAgfVxuICAgIFR5cGUuaGFzTWVtYmVyT2ZUeXBlID0gaGFzTWVtYmVyT2ZUeXBlO1xuICAgIGZ1bmN0aW9uIGhhc01ldGhvZChpbnN0YW5jZSwgcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIGhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgcHJvcGVydHksIF9GVU5DVElPTik7XG4gICAgfVxuICAgIFR5cGUuaGFzTWV0aG9kID0gaGFzTWV0aG9kO1xuICAgIGZ1bmN0aW9uIGlzQXJyYXlMaWtlKGluc3RhbmNlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIE5PVEU6XG4gICAgICAgICAqXG4gICAgICAgICAqIEZ1bmN0aW9uczpcbiAgICAgICAgICogRW51bWVyYXRpbmcgYSBmdW5jdGlvbiBhbHRob3VnaCBpdCBoYXMgYSAubGVuZ3RoIHByb3BlcnR5IHdpbGwgeWllbGQgbm90aGluZyBvciB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgICAqIEVmZmVjdGl2ZWx5LCBhIGZ1bmN0aW9uIGlzIG5vdCBsaWtlIGFuIGFycmF5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBTdHJpbmdzOlxuICAgICAgICAgKiBCZWhhdmUgbGlrZSBhcnJheXMgYnV0IGRvbid0IGhhdmUgdGhlIHNhbWUgZXhhY3QgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBpbnN0YW5jZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICB8fCBUeXBlLmlzU3RyaW5nKGluc3RhbmNlKVxuICAgICAgICAgICAgfHwgIVR5cGUuaXNGdW5jdGlvbihpbnN0YW5jZSkgJiYgaGFzTWVtYmVyKGluc3RhbmNlLCBMRU5HVEgpO1xuICAgIH1cbiAgICBUeXBlLmlzQXJyYXlMaWtlID0gaXNBcnJheUxpa2U7XG59KShUeXBlIHx8IChUeXBlID0ge30pKTtcbk9iamVjdC5mcmVlemUoVHlwZSk7XG5leHBvcnQgZGVmYXVsdCBUeXBlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VHlwZXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UeXBlcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi9UeXBlc1wiO1xudmFyIGlzVHJ1ZU5hTiA9IFR5cGUuaXNUcnVlTmFOO1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG4vKipcbiAqIFVzZWQgZm9yIHNwZWNpYWwgY29tcGFyaXNvbiBpbmNsdWRpbmcgTmFOLlxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKiBAcGFyYW0gc3RyaWN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbnxhbnl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcmVFcXVhbChhLCBiLCBzdHJpY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIGEgPT09IGJcbiAgICAgICAgfHwgIXN0cmljdCAmJiBhID09IGJcbiAgICAgICAgfHwgaXNUcnVlTmFOKGEpICYmIGlzVHJ1ZU5hTihiKTtcbn1cbmNvbnN0IENPTVBBUkVfVE8gPSBcImNvbXBhcmVUb1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgc3RyaWN0ID0gdHJ1ZSkge1xuICAgIGlmIChhcmVFcXVhbChhLCBiLCBzdHJpY3QpKVxuICAgICAgICByZXR1cm4gMCAvKiBFcXVhbCAqLztcbiAgICBpZiAoYSAmJiBUeXBlLmhhc01lbWJlcihhLCBDT01QQVJFX1RPKSlcbiAgICAgICAgcmV0dXJuIGEuY29tcGFyZVRvKGIpOyAvLyBJZiBhIGhhcyBjb21wYXJlVG8sIHVzZSBpdC5cbiAgICBlbHNlIGlmIChiICYmIFR5cGUuaGFzTWVtYmVyKGIsIENPTVBBUkVfVE8pKVxuICAgICAgICByZXR1cm4gLWIuY29tcGFyZVRvKGEpOyAvLyBhIGRvZXNuJ3QgaGF2ZSBjb21wYXJlVG8/IGNoZWNrIGlmIGIgZG9lcyBhbmQgaW52ZXJ0LlxuICAgIC8vIEFsbG93IGZvciBzcGVjaWFsIGluZXF1YWxpdHkuLlxuICAgIGlmIChhID4gYiB8fCBzdHJpY3QgJiYgKGEgPT09IDAgJiYgYiA9PSAwIHx8IGEgPT09IG51bGwgJiYgYiA9PT0gVk9JRDApKVxuICAgICAgICByZXR1cm4gMSAvKiBHcmVhdGVyICovO1xuICAgIGlmIChiID4gYSB8fCBzdHJpY3QgJiYgKGIgPT09IDAgJiYgYSA9PSAwIHx8IGIgPT09IG51bGwgJiYgYSA9PT0gVk9JRDApKVxuICAgICAgICByZXR1cm4gLTEgLyogTGVzcyAqLztcbiAgICByZXR1cm4gTmFOO1xufVxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHR3byBwcmltaXRpdmVzIGFyZSBlcXVhbCBvciBpZiB0d28gb2JqZWN0cyBoYXZlIHRoZSBzYW1lIGtleS92YWx1ZSBjb21iaW5hdGlvbnMuXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqIEBwYXJhbSBudWxsRXF1aXZhbGVuY3kgSWYgdHJ1ZSwgbnVsbC91bmRlZmluZWQgd2lsbCBiZSBlcXVpdmFsZW50IHRvIGFuIGVtcHR5IG9iamVjdCB7fS5cbiAqIEBwYXJhbSBleHRyYURlcHRoXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFyZUVxdWl2YWxlbnQoYSwgYiwgbnVsbEVxdWl2YWxlbmN5ID0gdHJ1ZSwgZXh0cmFEZXB0aCA9IDApIHtcbiAgICAvLyBUYWtlIGEgc3RlcCBieSBzdGVwIGFwcHJvYWNoIHRvIGVuc3VyZSBlZmZpY2llbmN5LlxuICAgIGlmIChhcmVFcXVhbChhLCBiLCB0cnVlKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHtcbiAgICAgICAgaWYgKCFudWxsRXF1aXZhbGVuY3kpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChUeXBlLmlzT2JqZWN0KGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gIU9iamVjdC5rZXlzKGEpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVHlwZS5pc09iamVjdChiKSkge1xuICAgICAgICAgICAgcmV0dXJuICFPYmplY3Qua2V5cyhiKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEgPT0gbnVsbCAmJiBiID09IG51bGw7XG4gICAgfVxuICAgIGlmIChUeXBlLmlzT2JqZWN0KGEpICYmIFR5cGUuaXNPYmplY3QoYikpIHtcbiAgICAgICAgY29uc3QgYUtleXMgPSBPYmplY3Qua2V5cyhhKSwgYktleXMgPSBPYmplY3Qua2V5cyhiKSwgbGVuID0gYUtleXMubGVuZ3RoO1xuICAgICAgICBpZiAobGVuICE9IGJLZXlzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgYUtleXMuc29ydCgpO1xuICAgICAgICBiS2V5cy5zb3J0KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBhS2V5c1tpXTtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IGJLZXlzW2ldIHx8ICFhcmVFcXVhbChhW2tleV0sIGJba2V5XSwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvZXNuJ3QgdHJhY2sgY2lyY3VsYXIgcmVmZXJlbmNlcyBidXQgYWxsb3dzIGZvciBjb250cm9sbGluZyB0aGUgYW1vdW50IG9mIHJlY3Vyc2lvbi5cbiAgICAgICAgaWYgKGV4dHJhRGVwdGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgYUtleXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFyZUVxdWl2YWxlbnQoYVtrZXldLCBiW2tleV0sIG51bGxFcXVpdmFsZW5jeSwgZXh0cmFEZXB0aCAtIDEpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbXBhcmUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db21wYXJlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0FyZ3VtZW50TnVsbEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgQXJndW1lbnROdWxsRXhjZXB0aW9uIGV4dGVuZHMgQXJndW1lbnRFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSwgbWVzc2FnZSA9IGAnJHtwYXJhbU5hbWV9JyBpcyBudWxsIChvciB1bmRlZmluZWQpLmAsIGlubmVyRXhjZXB0aW9uKSB7XG4gICAgICAgIHN1cGVyKHBhcmFtTmFtZSwgbWVzc2FnZSwgaW5uZXJFeGNlcHRpb24pO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBBcmd1bWVudE51bGxFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bcmd1bWVudE51bGxFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgdHJpbSB9IGZyb20gXCIuLi9UZXh0L1V0aWxpdHlcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdBcmd1bWVudEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgQXJndW1lbnRFeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIC8vIEZvciBzaW1wbGljaXR5IGFuZCBjb25zaXN0ZW5jeSwgbGV0cyBzdGljayB3aXRoIDEgc2lnbmF0dXJlLlxuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSwgbWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIGJlZm9yZVNlYWxpbmcpIHtcbiAgICAgICAgbGV0IHBuID0gcGFyYW1OYW1lID8gKCd7JyArIHBhcmFtTmFtZSArICd9ICcpIDogJyc7XG4gICAgICAgIHN1cGVyKHRyaW0ocG4gKyAobWVzc2FnZSB8fCAnJykpLCBpbm5lckV4Y2VwdGlvbiwgKF8pID0+IHtcbiAgICAgICAgICAgIF8ucGFyYW1OYW1lID0gcGFyYW1OYW1lO1xuICAgICAgICAgICAgaWYgKGJlZm9yZVNlYWxpbmcpXG4gICAgICAgICAgICAgICAgYmVmb3JlU2VhbGluZyhfKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50RXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJndW1lbnRFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgQXJndW1lbnRFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSwgYWN0dWFsVmFsdWUsIG1lc3NhZ2UgPSAnICcsIGlubmVyRXhjZXB0aW9uKSB7XG4gICAgICAgIHN1cGVyKHBhcmFtTmFtZSwgYCgke2FjdHVhbFZhbHVlfSkgYCArIG1lc3NhZ2UsIGlubmVyRXhjZXB0aW9uLCAoXykgPT4ge1xuICAgICAgICAgICAgXy5hY3R1YWxWYWx1ZSA9IGFjdHVhbFZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBPYmplY3RQb29sIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvT2JqZWN0UG9vbFwiO1xuaW1wb3J0IHsgSXRlcmF0b3JSZXN1bHQgfSBmcm9tIFwiLi9JdGVyYXRvclJlc3VsdFwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmxldCB5aWVsZGVyUG9vbDtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5mdW5jdGlvbiB5aWVsZGVyKHJlY3ljbGUpIHtcbiAgICBpZiAoIXlpZWxkZXJQb29sKVxuICAgICAgICB5aWVsZGVyUG9vbFxuICAgICAgICAgICAgPSBuZXcgT2JqZWN0UG9vbCg0MCwgKCkgPT4gbmV3IFlpZWxkZXIoKSwgeSA9PiB5LnlpZWxkQnJlYWsoKSk7XG4gICAgaWYgKCFyZWN5Y2xlKVxuICAgICAgICByZXR1cm4geWllbGRlclBvb2wudGFrZSgpO1xuICAgIHlpZWxkZXJQb29sLmFkZChyZWN5Y2xlKTtcbn1cbmNsYXNzIFlpZWxkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gVk9JRDA7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gTmFOO1xuICAgIH1cbiAgICBnZXQgY3VycmVudCgpIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7IH0gLy8gdGhpcyBjbGFzcyBpcyBub3QgZW50aXJlbHkgbG9jYWwvcHJpdmF0ZS4gIFN0aWxsIG5lZWRzIHByb3RlY3Rpb24uXG4gICAgZ2V0IGluZGV4KCkgeyByZXR1cm4gdGhpcy5faW5kZXg7IH1cbiAgICB5aWVsZFJldHVybih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gdmFsdWU7XG4gICAgICAgIGlmIChpc05hTih0aGlzLl9pbmRleCkpXG4gICAgICAgICAgICB0aGlzLl9pbmRleCA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX2luZGV4Kys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB5aWVsZEJyZWFrKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gVk9JRDA7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gTmFOO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMueWllbGRCcmVhaygpO1xuICAgIH1cbn1cbmNvbnN0IE5BTUUgPSBcIkVudW1lcmF0b3JCYXNlXCI7XG4vLyBcIkVudW1lcmF0b3JcIiBpcyBjb25mbGljdCBKU2NyaXB0J3MgXCJFbnVtZXJhdG9yXCJcbi8vIE5hbWluZyB0aGlzIGNsYXNzIEVudW1lcmF0b3JCYXNlIHRvIGF2b2lkIGNvbGxpc2lvbiB3aXRoIElFLlxuZXhwb3J0IGNsYXNzIEVudW1lcmF0b3JCYXNlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9pbml0aWFsaXplciwgX3RyeUdldE5leHQsIGRpc3Bvc2VyLCBpc0VuZGxlc3MpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZXIgPSBfaW5pdGlhbGl6ZXI7XG4gICAgICAgIHRoaXMuX3RyeUdldE5leHQgPSBfdHJ5R2V0TmV4dDtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBOQU1FO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIGlmIChUeXBlLmlzQm9vbGVhbihpc0VuZGxlc3MpKVxuICAgICAgICAgICAgdGhpcy5faXNFbmRsZXNzID0gaXNFbmRsZXNzO1xuICAgICAgICBlbHNlIGlmIChUeXBlLmlzQm9vbGVhbihkaXNwb3NlcikpXG4gICAgICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBkaXNwb3NlcjtcbiAgICAgICAgaWYgKFR5cGUuaXNGdW5jdGlvbihkaXNwb3NlcikpXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlciA9IGRpc3Bvc2VyO1xuICAgIH1cbiAgICBnZXQgY3VycmVudCgpIHtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuX3lpZWxkZXI7XG4gICAgICAgIHJldHVybiB5ICYmIHkuY3VycmVudDtcbiAgICB9XG4gICAgZ2V0IGluZGV4KCkge1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5feWllbGRlcjtcbiAgICAgICAgcmV0dXJuIHkgPyB5LmluZGV4IDogTmFOO1xuICAgIH1cbiAgICAvKlxuICAgICAqIFByb3ZpZGVzIGEgbWVjaGFuaXNtIHRvIGluZGljYXRlIGlmIHRoaXMgZW51bWVyYWJsZSBuZXZlciBlbmRzLlxuICAgICAqIElmIHNldCB0byB0cnVlLCBzb21lIG9wZXJhdGlvbnMgdGhhdCBleHBlY3QgYSBmaW5pdGUgcmVzdWx0IG1heSB0aHJvdy5cbiAgICAgKiBFeHBsaWNpdCBmYWxzZSBtZWFucyBpdCBoYXMgYW4gZW5kLlxuICAgICAqIEltcGxpY2l0IHZvaWQgbWVhbnMgdW5rbm93bi5cbiAgICAgKi9cbiAgICBnZXQgaXNFbmRsZXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNFbmRsZXNzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRlZCBmb3IgY29tcGF0aWJpbGl0eSBidXQgb25seSB3b3JrcyBpZiB0aGUgZW51bWVyYXRvciBpcyBhY3RpdmUuXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCB5ID0gXy5feWllbGRlcjtcbiAgICAgICAgXy5feWllbGRlciA9IG51bGw7XG4gICAgICAgIF8uX3N0YXRlID0gMCAvKiBCZWZvcmUgKi87XG4gICAgICAgIGlmICh5KVxuICAgICAgICAgICAgeWllbGRlcih5KTsgLy8gcmVjeWNsZSB1bnRpbCBhY3R1YWxseSBuZWVkZWQuXG4gICAgfVxuICAgIF9hc3NlcnRCYWRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHN3aXRjaCAoXy5fc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMyAvKiBGYXVsdGVkICovOlxuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKFwiVGhpcyBlbnVtZXJhdG9yIGNhdXNlZCBhIGZhdWx0IGFuZCB3YXMgZGlzcG9zZWQuXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1IC8qIERpc3Bvc2VkICovOlxuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKFwiVGhpcyBlbnVtZXJhdG9yIHdhcyBtYW51YWxseSBkaXNwb3NlZC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUGFzc2VzIHRoZSBjdXJyZW50IHZhbHVlIHRvIHRoZSBvdXQgY2FsbGJhY2sgaWYgdGhlIGVudW1lcmF0b3IgaXMgYWN0aXZlLlxuICAgICAqIE5vdGU6IFdpbGwgdGhyb3cgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gaWYgdGhpcyBoYXMgZmF1bHRlZCBvciBtYW51YWxseSBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICB0cnlHZXRDdXJyZW50KG91dCkge1xuICAgICAgICB0aGlzLl9hc3NlcnRCYWRTdGF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUgPT09IDEgLyogQWN0aXZlICovKSB7XG4gICAgICAgICAgICBvdXQodGhpcy5jdXJyZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IGNhbk1vdmVOZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUgPCAyIC8qIENvbXBsZXRlZCAqLztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2FmZWx5IG1vdmVzIHRvIHRoZSBuZXh0IGVudHJ5IGFuZCByZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgb25lLlxuICAgICAqIE5vdGU6IFdpbGwgdGhyb3cgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gaWYgdGhpcyBoYXMgZmF1bHRlZCBvciBtYW51YWxseSBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBtb3ZlTmV4dCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2Fzc2VydEJhZFN0YXRlKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF8uX3N0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwIC8qIEJlZm9yZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgXy5feWllbGRlciA9IF8uX3lpZWxkZXIgfHwgeWllbGRlcigpO1xuICAgICAgICAgICAgICAgICAgICBfLl9zdGF0ZSA9IDEgLyogQWN0aXZlICovO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbml0aWFsaXplciA9IF8uX2luaXRpYWxpemVyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbGl6ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplcigpO1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgMSAvKiBBY3RpdmUgKi86XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLl90cnlHZXROZXh0KF8uX3lpZWxkZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5fc3RhdGUgPSAyIC8qIENvbXBsZXRlZCAqLztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICBfLl9zdGF0ZSA9IDMgLyogRmF1bHRlZCAqLztcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTW92ZXMgdG8gdGhlIG5leHQgZW50cnkgYW5kIGVtaXRzIHRoZSB2YWx1ZSB0aHJvdWdoIHRoZSBvdXQgY2FsbGJhY2suXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIHRyeU1vdmVOZXh0KG91dCkge1xuICAgICAgICBpZiAodGhpcy5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBvdXQodGhpcy5jdXJyZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbmV4dFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlTmV4dCgpXG4gICAgICAgICAgICA/IHRoaXMuY3VycmVudFxuICAgICAgICAgICAgOiBWT0lEMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXhwb3NlZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIGdlbmVyYXRvcnMuXG4gICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZU5leHQoKVxuICAgICAgICAgICAgPyBuZXcgSXRlcmF0b3JSZXN1bHQodGhpcy5jdXJyZW50LCB0aGlzLmluZGV4KVxuICAgICAgICAgICAgOiBJdGVyYXRvclJlc3VsdC5Eb25lO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHRoaXMuX2Vuc3VyZURpc3Bvc2VTdGF0ZSg0IC8qIEludGVycnVwdGVkICovKTtcbiAgICB9XG4gICAgJ3JldHVybicodmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2Fzc2VydEJhZFN0YXRlKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IFZPSUQwIHx8IF8uX3N0YXRlID09PSAyIC8qIENvbXBsZXRlZCAqLyB8fCBfLl9zdGF0ZSA9PT0gNCAvKiBJbnRlcnJ1cHRlZCAqL1xuICAgICAgICAgICAgICAgID8gSXRlcmF0b3JSZXN1bHQuRG9uZVxuICAgICAgICAgICAgICAgIDogbmV3IEl0ZXJhdG9yUmVzdWx0KHZhbHVlLCBWT0lEMCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLmVuZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9lbnN1cmVEaXNwb3NlU3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghXy53YXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgXy5kaXNwb3NlKCk7XG4gICAgICAgICAgICBfLl9zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9pc0VuZGxlc3MgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgZGlzcG9zZXIgPSBfLl9kaXNwb3NlcjtcbiAgICAgICAgXy5faW5pdGlhbGl6ZXIgPSBudWxsO1xuICAgICAgICBfLl9kaXNwb3NlciA9IG51bGw7XG4gICAgICAgIGNvbnN0IHkgPSBfLl95aWVsZGVyO1xuICAgICAgICBfLl95aWVsZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSA1IC8qIERpc3Bvc2VkICovO1xuICAgICAgICBpZiAoeSlcbiAgICAgICAgICAgIHlpZWxkZXIoeSk7XG4gICAgICAgIGlmIChkaXNwb3NlcilcbiAgICAgICAgICAgIGRpc3Bvc2VyKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRW51bWVyYXRvckJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FbnVtZXJhdG9yQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuZXhwb3J0IGZ1bmN0aW9uIEludGVnZXIobikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG4pO1xufVxuKGZ1bmN0aW9uIChJbnRlZ2VyKSB7XG4gICAgSW50ZWdlci5NQVhfMzJfQklUID0gMjE0NzQ4MzY0NztcbiAgICBJbnRlZ2VyLk1BWF9WQUxVRSA9IDkwMDcxOTkyNTQ3NDA5OTE7XG4gICAgY29uc3QgTlVNQkVSID0gXCJudW1iZXJcIjtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbnkgbnVtYmVyIHRvIGl0cyAzMmJpdCBjb3VudGVycGFydC5cbiAgICAgKiBUaHJvd3MgaWYgY29udmVyc2lvbiBpcyBub3QgcG9zc2libGUuXG4gICAgICogQHBhcmFtIG5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzMzJCaXQobikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuIHwgMDtcbiAgICAgICAgaWYgKGlzTmFOKG4pKVxuICAgICAgICAgICAgdGhyb3cgXCInbicgaXMgbm90IGEgbnVtYmVyLlwiO1xuICAgICAgICBpZiAobiAhPT0gLTEgJiYgcmVzdWx0ID09PSAtMSlcbiAgICAgICAgICAgIHRocm93IFwiJ24nIGlzIHRvbyBsYXJnZSB0byBiZSBhIDMyIGJpdCBpbnRlZ2VyLlwiO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBJbnRlZ2VyLmFzMzJCaXQgPSBhczMyQml0O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKG4pIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBuID09PSBOVU1CRVIgJiYgaXNGaW5pdGUobikgJiYgbiA9PT0gTWF0aC5mbG9vcihuKTtcbiAgICB9XG4gICAgSW50ZWdlci5pcyA9IGlzO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgd2l0aGluIGEgMzIgYml0IHJhbmdlLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXMzMkJpdChuKSB7XG4gICAgICAgIHJldHVybiBuID09PSAobiB8IDApO1xuICAgIH1cbiAgICBJbnRlZ2VyLmlzMzJCaXQgPSBpczMyQml0O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBpZiBub3QgYW4gaW50ZWdlci5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnQobiwgYXJndW1lbnROYW1lKSB7XG4gICAgICAgIGxldCBpID0gaXMobik7XG4gICAgICAgIGlmICghaSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBcIk11c3QgYmUgYSBpbnRlZ2VyLlwiKTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIEludGVnZXIuYXNzZXJ0ID0gYXNzZXJ0O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBpZiBsZXNzIHRoYW4gemVyby5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnRaZXJvT3JHcmVhdGVyKG4sIGFyZ3VtZW50TmFtZSkge1xuICAgICAgICBsZXQgaSA9IGFzc2VydChuLCBhcmd1bWVudE5hbWUpICYmIG4gPj0gMDtcbiAgICAgICAgaWYgKCFpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBuLCBcIk11c3QgYmUgYSB2YWxpZCBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB6ZXJvLlwiKTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlciA9IGFzc2VydFplcm9PckdyZWF0ZXI7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIG5vdCBncmVhdGVyIHRoYW4gemVyby5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnRQb3NpdGl2ZShuLCBhcmd1bWVudE5hbWUpIHtcbiAgICAgICAgbGV0IGkgPSBhc3NlcnQobiwgYXJndW1lbnROYW1lKSAmJiBuID4gMDtcbiAgICAgICAgaWYgKCFpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBuLCBcIk11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uXCIpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgSW50ZWdlci5hc3NlcnRQb3NpdGl2ZSA9IGFzc2VydFBvc2l0aXZlO1xufSkoSW50ZWdlciB8fCAoSW50ZWdlciA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBJbnRlZ2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW50ZWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0ludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBTeXN0ZW1FeGNlcHRpb24gfSBmcm9tIFwiLi9TeXN0ZW1FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIGV4dGVuZHMgU3lzdGVtRXhjZXB0aW9uIHtcbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L3N5c3RlbS5zeXN0ZW1leGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdTeXN0ZW1FeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIFN5c3RlbUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gICAgLypcbiAgICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBtZXNzYWdlOnN0cmluZyA9IG51bGwsXG4gICAgICAgICAgICBpbm5lckV4Y2VwdGlvbjpFcnJvciA9IG51bGwsXG4gICAgICAgICAgICBiZWZvcmVTZWFsaW5nPzooZXg6YW55KT0+dm9pZClcbiAgICAgICAge1xuICAgICAgICAgICAgc3VwZXIobWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIGJlZm9yZVNlYWxpbmcpO1xuICAgICAgICB9XG4gICAgKi9cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBTeXN0ZW1FeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TeXN0ZW1FeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL1N5c3RlbUV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uIH0gZnJvbSBcIi4vT2JqZWN0RGlzcG9zZWRFeGNlcHRpb25cIjtcbmV4cG9ydCBjbGFzcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX19maW5hbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5fX2ZpbmFsaXplciA9IF9fZmluYWxpemVyO1xuICAgICAgICB0aGlzLl9fd2FzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IHdhc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX3dhc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICB0aHJvd0lmRGlzcG9zZWQobWVzc2FnZSwgb2JqZWN0TmFtZSA9IHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9fd2FzRGlzcG9zZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24ob2JqZWN0TmFtZSwgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLl9fd2FzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIC8vIFByZWVtcHRpdmVseSBzZXQgd2FzRGlzcG9zZWQgaW4gb3JkZXIgdG8gcHJldmVudCByZXBlYXRlZCBkaXNwb3NpbmcuXG4gICAgICAgICAgICAvLyBOT1RFOiBpbiB0cnVlIG11bHRpLXRocmVhZGVkIHNjZW5hcmlvcywgdGhpcyBuZWVkcyB0byBiZSBzeW5jaHJvbml6ZWQuXG4gICAgICAgICAgICBfLl9fd2FzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBfLl9vbkRpc3Bvc2UoKTsgLy8gUHJvdGVjdGVkIG92ZXJyaWRlLlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uX19maW5hbGl6ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5fX2ZpbmFsaXplcigpO1xuICAgICAgICAgICAgICAgICAgICBfLl9fZmluYWxpemVyID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBQbGFjZWhvbGRlciBmb3Igb3ZlcnJpZGVzLlxuICAgIF9vbkRpc3Bvc2UoKSB7IH1cbn1cbmV4cG9ydCBkZWZhdWx0IERpc3Bvc2FibGVCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGlzcG9zYWJsZUJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuLi8uLi9JbnRlZ2VyXCI7XG4vKipcbiAqIEluaXRpYWxpemVzIGFuIGFycmF5IGRlcGVuZGluZyBvbiB0aGUgcmVxdWVzdGVkIGNhcGFjaXR5LlxuICogVGhlIHJldHVybmVkIGFycmF5IHdpbGwgaGF2ZSBhIC5sZW5ndGggZXF1YWwgdG8gdGhlIHZhbHVlIHByb3ZpZGVkLlxuICogQHBhcmFtIGxlbmd0aFxuICogQHJldHVybnMge1RbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUobGVuZ3RoKSB7XG4gICAgSW50ZWdlci5hc3NlcnQobGVuZ3RoLCAnbGVuZ3RoJyk7XG4gICAgLy8gVGhpcyBsb2dpYyBpcyBiYXNlZCB1cG9uIEpTIHBlcmZvcm1hbmNlIHRlc3RzIHRoYXQgc2hvdyBhIHNpZ25pZmljYW50IGRpZmZlcmVuY2UgYXQgdGhlIGxldmVsIG9mIDY1NTM2LlxuICAgIGxldCBhcnJheTtcbiAgICBpZiAobGVuZ3RoID4gNjU1MzYpXG4gICAgICAgIGFycmF5ID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgZWxzZSB7XG4gICAgICAgIGFycmF5ID0gW107XG4gICAgICAgIGFycmF5Lmxlbmd0aCA9IGxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5pdGlhbGl6ZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L2luaXRpYWxpemUuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgdXNpbmcgfSBmcm9tIFwiLi4vLi4vRGlzcG9zYWJsZS9kaXNwb3NlXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5pbXBvcnQgeyBBcnJheUVudW1lcmF0b3IgfSBmcm9tIFwiLi9BcnJheUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IEluZGV4RW51bWVyYXRvciB9IGZyb20gXCIuL0luZGV4RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uIH0gZnJvbSBcIi4vVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBJbmZpbml0ZUVudW1lcmF0b3IgfSBmcm9tIFwiLi9JbmZpbml0ZUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IEVtcHR5RW51bWVyYXRvciBhcyBFbXB0eSB9IGZyb20gXCIuL0VtcHR5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgSXRlcmF0b3JFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSXRlcmF0b3JFbnVtZXJhdG9yXCI7XG5jb25zdCBTVFJJTkdfRU1QVFkgPSBcIlwiLCBFTkRMRVNTX0VYQ0VQVElPTl9NRVNTQUdFID0gJ0Nhbm5vdCBjYWxsIGZvckVhY2ggb24gYW4gZW5kbGVzcyBlbnVtZXJhYmxlLiAnICtcbiAgICAnV291bGQgcmVzdWx0IGluIGFuIGluZmluaXRlIGxvb3AgdGhhdCBjb3VsZCBoYW5nIHRoZSBjdXJyZW50IHByb2Nlc3MuJztcbmV4cG9ydCBmdW5jdGlvbiB0aHJvd0lmRW5kbGVzcyhpc0VuZGxlc3MpIHtcbiAgICBpZiAoaXNFbmRsZXNzKVxuICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKEVORExFU1NfRVhDRVBUSU9OX01FU1NBR0UpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gaW5pdEFycmF5RnJvbShzb3VyY2UsIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKFR5cGUuaXNBcnJheUxpa2Uoc291cmNlKSkge1xuICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1pbihzb3VyY2UubGVuZ3RoLCBtYXgpO1xuICAgICAgICBpZiAoaXNGaW5pdGUobGVuKSkge1xuICAgICAgICAgICAgaWYgKGxlbiA+IDY1NTM1KVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkobGVuKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgcmVzdWx0Lmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufVxuLy8gQ291bGQgYmUgYXJyYXksIG9yIElFbnVtZXJhYmxlLi4uXG4vKipcbiAqIFJldHVybnMgdGhlIGVudW1lcmF0b3IgZm9yIHRoZSBzcGVjaWZpZWQgY29sbGVjdGlvbiwgZW51bWVyYXRvciwgb3IgaXRlcmF0b3IuXG4gKiBJZiB0aGUgc291cmNlIGlzIGlkZW50aWZpZWQgYXMgSUVudW1lcmF0b3IgaXQgd2lsbCByZXR1cm4gdGhlIHNvdXJjZSBhcyBpcy5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tKHNvdXJjZSkge1xuICAgIC8vIFRvIHNpbXBsaWZ5IGFuZCBwcmV2ZW50IG51bGwgcmVmZXJlbmNlIGV4Y2VwdGlvbnM6XG4gICAgaWYgKCFzb3VyY2UpXG4gICAgICAgIHJldHVybiBFbXB0eTtcbiAgICBpZiAoKHNvdXJjZSkgaW5zdGFuY2VvZiAoQXJyYXkpKVxuICAgICAgICByZXR1cm4gbmV3IEFycmF5RW51bWVyYXRvcihzb3VyY2UpO1xuICAgIGlmIChUeXBlLmlzQXJyYXlMaWtlKHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmRleEVudW1lcmF0b3IoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IHNvdXJjZS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgcG9pbnRlcjogMCxcbiAgICAgICAgICAgICAgICBzdGVwOiAxXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCFUeXBlLmlzUHJpbWl0aXZlKHNvdXJjZSkpIHtcbiAgICAgICAgaWYgKGlzRW51bWVyYWJsZShzb3VyY2UpKVxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oc291cmNlKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVFbnVtZXJhdG9yKHNvdXJjZSk7XG4gICAgICAgIGlmIChpc0VudW1lcmF0b3Ioc291cmNlKSlcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgIGlmIChpc0l0ZXJhdG9yKHNvdXJjZSkpXG4gICAgICAgICAgICByZXR1cm4gbmV3IEl0ZXJhdG9yRW51bWVyYXRvcihzb3VyY2UpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNFbnVtZXJhYmxlKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIFR5cGUuaGFzTWVtYmVyT2ZUeXBlKGluc3RhbmNlLCBcImdldEVudW1lcmF0b3JcIiwgVHlwZS5GVU5DVElPTik7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNFbnVtZXJhYmxlT3JBcnJheUxpa2UoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gVHlwZS5pc0FycmF5TGlrZShpbnN0YW5jZSkgfHwgaXNFbnVtZXJhYmxlKGluc3RhbmNlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VudW1lcmF0b3IoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gVHlwZS5oYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIFwibW92ZU5leHRcIiwgVHlwZS5GVU5DVElPTik7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNJdGVyYXRvcihpbnN0YW5jZSkge1xuICAgIHJldHVybiBUeXBlLmhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgXCJuZXh0XCIsIFR5cGUuRlVOQ1RJT04pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goZSwgYWN0aW9uLCBtYXggPSBJbmZpbml0eSkge1xuICAgIGlmIChlID09PSBTVFJJTkdfRU1QVFkpXG4gICAgICAgIHJldHVybiAwO1xuICAgIGlmIChlICYmIG1heCA+IDApIHtcbiAgICAgICAgaWYgKFR5cGUuaXNBcnJheUxpa2UoZSkpIHtcbiAgICAgICAgICAgIC8vIEFzc3VtZSBlLmxlbmd0aCBpcyBjb25zdGFudCBvciBhdCBsZWFzdCBkb2Vzbid0IGRldmlhdGUgdG8gaW5maW5pdGUgb3IgTmFOLlxuICAgICAgICAgICAgdGhyb3dJZkVuZGxlc3MoIWlzRmluaXRlKG1heCkgJiYgIWlzRmluaXRlKGUubGVuZ3RoKSk7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICBmb3IgKDsgaSA8IE1hdGgubWluKGUubGVuZ3RoLCBtYXgpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKGVbaV0sIGkpID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNFbnVtZXJhdG9yKGUpKSB7XG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiBlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAvLyBSZXR1cm4gdmFsdWUgb2YgYWN0aW9uIGNhbiBiZSBhbnl0aGluZywgYnV0IGlmIGl0IGlzICg9PT0pIGZhbHNlIHRoZW4gdGhlIGZvckVhY2ggd2lsbCBkaXNjb250aW51ZS5cbiAgICAgICAgICAgIHdoaWxlIChtYXggPiBpICYmIGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24oZS5jdXJyZW50LCBpKyspID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNFbnVtZXJhYmxlKGUpKSB7XG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiBlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICAvLyBGb3IgZW51bWVyYXRvcnMgdGhhdCBhcmVuJ3QgRW51bWVyYWJsZUJhc2UsIGVuc3VyZSBkaXNwb3NlIGlzIGNhbGxlZC5cbiAgICAgICAgICAgIHJldHVybiB1c2luZyhlLmdldEVudW1lcmF0b3IoKSwgZiA9PiBmb3JFYWNoKGYsIGFjdGlvbiwgbWF4KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSXRlcmF0b3IoZSkpIHtcbiAgICAgICAgICAgIC8vIEZvciBvdXIgcHVycG9zZSBpdGVyYXRvcnMgYXJlIGVuZGxlc3MgYW5kIGEgbWF4IG11c3QgYmUgc3BlY2lmaWVkIGJlZm9yZSBpdGVyYXRpbmcuXG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSk7XG4gICAgICAgICAgICBsZXQgaSA9IDAsIHI7XG4gICAgICAgICAgICAvLyBSZXR1cm4gdmFsdWUgb2YgYWN0aW9uIGNhbiBiZSBhbnl0aGluZywgYnV0IGlmIGl0IGlzICg9PT0pIGZhbHNlIHRoZW4gdGhlIGZvckVhY2ggd2lsbCBkaXNjb250aW51ZS5cbiAgICAgICAgICAgIHdoaWxlIChtYXggPiBpICYmICEociA9IGUubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbihyLnZhbHVlLCBpKyspID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG4vKipcbiAqIENvbnZlcnRzIGFueSBlbnVtZXJhYmxlIHRvIGFuIGFycmF5LlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIG1heCBTdG9wcyBhZnRlciBtYXggaXMgcmVhY2hlZC4gIEFsbG93cyBmb3IgZm9yRWFjaCB0byBiZSBjYWxsZWQgb24gaW5maW5pdGUgZW51bWVyYXRpb25zLlxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkoc291cmNlLCBtYXggPSBJbmZpbml0eSkge1xuICAgIGlmIChzb3VyY2UgPT09IFNUUklOR19FTVBUWSlcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIGlmICghaXNGaW5pdGUobWF4KSAmJiAoc291cmNlKSBpbnN0YW5jZW9mIChBcnJheSkpXG4gICAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbml0QXJyYXlGcm9tKHNvdXJjZSwgbWF4KTtcbiAgICBpZiAoLTEgPT09IGZvckVhY2goc291cmNlLCAoZSwgaSkgPT4geyByZXN1bHRbaV0gPSBlOyB9LCBtYXgpKVxuICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQ29udmVydHMgYW55IGVudW1lcmFibGUgdG8gYW4gYXJyYXkgb2Ygc2VsZWN0ZWQgdmFsdWVzLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHNlbGVjdG9yXG4gKiBAcGFyYW0gbWF4IFN0b3BzIGFmdGVyIG1heCBpcyByZWFjaGVkLiAgQWxsb3dzIGZvciBmb3JFYWNoIHRvIGJlIGNhbGxlZCBvbiBpbmZpbml0ZSBlbnVtZXJhdGlvbnMuXG4gKiBAcmV0dXJucyB7VFJlc3VsdFtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwKHNvdXJjZSwgc2VsZWN0b3IsIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKHNvdXJjZSA9PT0gU1RSSU5HX0VNUFRZKVxuICAgICAgICByZXR1cm4gW107XG4gICAgaWYgKCFpc0Zpbml0ZShtYXgpICYmIChzb3VyY2UpIGluc3RhbmNlb2YgKEFycmF5KSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5tYXAoc2VsZWN0b3IpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGluaXRBcnJheUZyb20oc291cmNlLCBtYXgpO1xuICAgIGlmICgtMSA9PT0gZm9yRWFjaChzb3VyY2UsIChlLCBpKSA9PiB7IHJlc3VsdFtpXSA9IHNlbGVjdG9yKGUsIGkpOyB9LCBtYXgpKVxuICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vVHlwZXNcIjtcbi8qKlxuICogVGFrZXMgYW55IG51bWJlciBvZiBkaXNwb3NhYmxlcyBhcyBhcmd1bWVudHMgYW5kIGF0dGVtcHRzIHRvIGRpc3Bvc2UgdGhlbS5cbiAqIEFueSBleGNlcHRpb25zIHRocm93biB3aXRoaW4gYSBkaXNwb3NlIGFyZSBub3QgdHJhcHBlZC5cbiAqIFVzZSAnZGlzcG9zZVdpdGhvdXRFeGNlcHRpb24nIHRvIGF1dG9tYXRpY2FsbHkgdHJhcCBleGNlcHRpb25zLlxuICpcbiAqIENhbiBhY2NlcHQgPGFueT4gYW5kIHdpbGwgaWdub3JlIG9iamVjdHMgdGhhdCBkb24ndCBoYXZlIGEgZGlzcG9zZSgpIG1ldGhvZC5cbiAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcG9zZSguLi5kaXNwb3NhYmxlcykge1xuICAgIC8vIFRoZSBkaXNwb3NhYmxlcyBhcmd1bWVudHMgYXJyYXkgaXMgZWZmZWN0aXZlbHkgbG9jYWxpemVkIHNvIGl0J3Mgc2FmZS5cbiAgICBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgZmFsc2UpO1xufVxuKGZ1bmN0aW9uIChkaXNwb3NlKSB7XG4gICAgLyoqXG4gICAgICogVXNlIHRoaXMgd2hlbiBvbmx5IGRpc3Bvc2luZyBvbmUgb2JqZWN0IHRvIGF2b2lkIGNyZWF0aW9uIG9mIGFycmF5cy5cbiAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZVxuICAgICAqIEBwYXJhbSB0cmFwRXhjZXB0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNpbmdsZShkaXNwb3NhYmxlLCB0cmFwRXhjZXB0aW9ucyA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChkaXNwb3NhYmxlKVxuICAgICAgICAgICAgZGlzcG9zZVNpbmdsZShkaXNwb3NhYmxlLCB0cmFwRXhjZXB0aW9ucyk7XG4gICAgfVxuICAgIGRpc3Bvc2Uuc2luZ2xlID0gc2luZ2xlO1xuICAgIGZ1bmN0aW9uIGRlZmVycmVkKC4uLmRpc3Bvc2FibGVzKSB7XG4gICAgICAgIHRoZXNlLmRlZmVycmVkKGRpc3Bvc2FibGVzKTtcbiAgICB9XG4gICAgZGlzcG9zZS5kZWZlcnJlZCA9IGRlZmVycmVkO1xuICAgIC8qKlxuICAgICAqIFRha2VzIGFueSBudW1iZXIgb2YgZGlzcG9zYWJsZXMgYW5kIHRyYXBzIGFueSBlcnJvcnMgdGhhdCBvY2N1ciB3aGVuIGRpc3Bvc2luZy5cbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSBleGNlcHRpb25zIHRocm93bi5cbiAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZXNcbiAgICAgKiBAcmV0dXJucyB7YW55W119IFJldHVybnMgYW4gYXJyYXkgb2YgZXhjZXB0aW9ucyB0aGF0IG9jY3VycmVkLCBpZiB0aGVyZSBhcmUgYW55LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdpdGhvdXRFeGNlcHRpb24oLi4uZGlzcG9zYWJsZXMpIHtcbiAgICAgICAgLy8gVGhlIGRpc3Bvc2FibGVzIGFyZ3VtZW50cyBhcnJheSBpcyBlZmZlY3RpdmVseSBsb2NhbGl6ZWQgc28gaXQncyBzYWZlLlxuICAgICAgICByZXR1cm4gZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMsIHRydWUpO1xuICAgIH1cbiAgICBkaXNwb3NlLndpdGhvdXRFeGNlcHRpb24gPSB3aXRob3V0RXhjZXB0aW9uO1xuICAgIC8qKlxuICAgICAqIFRha2VzIGFuIGFycmF5IG9mIGRpc3Bvc2FibGUgb2JqZWN0cyBhbmQgZW5zdXJlcyB0aGV5IGFyZSBkaXNwb3NlZC5cbiAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZXNcbiAgICAgKiBAcGFyYW0gdHJhcEV4Y2VwdGlvbnMgSWYgdHJ1ZSwgcHJldmVudHMgZXhjZXB0aW9ucyBmcm9tIGJlaW5nIHRocm93biB3aGVuIGRpc3Bvc2luZy5cbiAgICAgKiBAcmV0dXJucyB7YW55W119IElmICd0cmFwRXhjZXB0aW9ucycgaXMgdHJ1ZSwgcmV0dXJucyBhbiBhcnJheSBvZiBleGNlcHRpb25zIHRoYXQgb2NjdXJyZWQsIGlmIHRoZXJlIGFyZSBhbnkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdGhlc2UoZGlzcG9zYWJsZXMsIHRyYXBFeGNlcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkaXNwb3NhYmxlcyAmJiBkaXNwb3NhYmxlcy5sZW5ndGhcbiAgICAgICAgICAgID8gZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMuc2xpY2UoKSwgdHJhcEV4Y2VwdGlvbnMpXG4gICAgICAgICAgICA6IHZvaWQgMDtcbiAgICB9XG4gICAgZGlzcG9zZS50aGVzZSA9IHRoZXNlO1xuICAgIChmdW5jdGlvbiAodGhlc2UpIHtcbiAgICAgICAgZnVuY3Rpb24gZGVmZXJyZWQoZGlzcG9zYWJsZXMsIGRlbGF5ID0gMCkge1xuICAgICAgICAgICAgaWYgKGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICghKGRlbGF5ID49IDApKVxuICAgICAgICAgICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChkaXNwb3NlVGhlc2VJbnRlcm5hbCwgZGVsYXksIGRpc3Bvc2FibGVzLnNsaWNlKCksIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoZXNlLmRlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2UgdGhpcyB1bnNhZmUgbWV0aG9kIHdoZW4gZ3VhcmFudGVlZCBub3QgdG8gY2F1c2UgZXZlbnRzIHRoYXQgd2lsbCBtYWtlIG1vZGlmaWNhdGlvbnMgdG8gdGhlIGRpc3Bvc2FibGVzIGFycmF5LlxuICAgICAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZXNcbiAgICAgICAgICogQHBhcmFtIHRyYXBFeGNlcHRpb25zXG4gICAgICAgICAqIEByZXR1cm5zIHthbnlbXX1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG5vQ29weShkaXNwb3NhYmxlcywgdHJhcEV4Y2VwdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXNwb3NhYmxlcyAmJiBkaXNwb3NhYmxlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICA/IGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCB0cmFwRXhjZXB0aW9ucylcbiAgICAgICAgICAgICAgICA6IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgICB0aGVzZS5ub0NvcHkgPSBub0NvcHk7XG4gICAgfSkodGhlc2UgPSBkaXNwb3NlLnRoZXNlIHx8IChkaXNwb3NlLnRoZXNlID0ge30pKTtcbn0pKGRpc3Bvc2UgfHwgKGRpc3Bvc2UgPSB7fSkpO1xuLyoqXG4gKiBKdXN0IGxpa2UgaW4gQyMgdGhpcyAndXNpbmcnIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBwYXNzZWQgZGlzcG9zYWJsZSBpcyBkaXNwb3NlZCB3aGVuIHRoZSBjbG9zdXJlIGhhcyBmaW5pc2hlZC5cbiAqXG4gKiBVc2FnZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHVzaW5nKG5ldyBEaXNwb3NhYmxlT2JqZWN0KCksKG15T2JqKT0+e1xuICAgICAqICAgLy8gZG8gd29yayB3aXRoIG15T2JqXG4gICAgICogfSk7XG4gKiAvLyBteU9iaiBhdXRvbWF0aWNhbGx5IGhhcyBpdCdzIGRpc3Bvc2UgbWV0aG9kIGNhbGxlZC5cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBkaXNwb3NhYmxlIE9iamVjdCB0byBiZSBkaXNwb3NlZC5cbiAqIEBwYXJhbSBjbG9zdXJlIEZ1bmN0aW9uIGNhbGwgdG8gZXhlY3V0ZS5cbiAqIEByZXR1cm5zIHtUUmV0dXJufSBSZXR1cm5zIHdoYXRldmVyIHRoZSBjbG9zdXJlJ3MgcmV0dXJuIHZhbHVlIGlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNpbmcoZGlzcG9zYWJsZSwgY2xvc3VyZSkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjbG9zdXJlKGRpc3Bvc2FibGUpO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgZGlzcG9zZVNpbmdsZShkaXNwb3NhYmxlLCBmYWxzZSk7XG4gICAgfVxufVxuLyoqXG4gKiBUaGlzIHByaXZhdGUgZnVuY3Rpb24gbWFrZXMgZGlzcG9zaW5nIG1vcmUgcm9idXN0IGZvciB3aGVuIHRoZXJlJ3Mgbm8gdHlwZSBjaGVja2luZy5cbiAqIElmIHRyYXBFeGNlcHRpb25zIGlzICd0cnVlJyBpdCBjYXRjaGVzIGFuZCByZXR1cm5zIGFueSBleGNlcHRpb24gaW5zdGVhZCBvZiB0aHJvd2luZy5cbiAqL1xuZnVuY3Rpb24gZGlzcG9zZVNpbmdsZShkaXNwb3NhYmxlLCB0cmFwRXhjZXB0aW9ucykge1xuICAgIGlmIChkaXNwb3NhYmxlXG4gICAgICAgICYmIHR5cGVvZiBkaXNwb3NhYmxlID09IFR5cGUuT0JKRUNUXG4gICAgICAgICYmIHR5cGVvZiBkaXNwb3NhYmxlWydkaXNwb3NlJ10gPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGlmICh0cmFwRXhjZXB0aW9ucykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkaXNwb3NhYmxlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkaXNwb3NhYmxlLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG4vKipcbiAqIFRoaXMgZGlzcG9zZSBtZXRob2QgYXNzdW1lcyBpdCdzIHdvcmtpbmcgb24gYSBsb2NhbCBhcnJheUNvcHkgYW5kIGlzIHVuc2FmZSBmb3IgZXh0ZXJuYWwgdXNlLlxuICovXG5mdW5jdGlvbiBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgdHJhcEV4Y2VwdGlvbnMsIGluZGV4ID0gMCkge1xuICAgIGxldCBleGNlcHRpb25zO1xuICAgIGNvbnN0IGxlbiA9IGRpc3Bvc2FibGVzID8gZGlzcG9zYWJsZXMubGVuZ3RoIDogMDtcbiAgICBmb3IgKDsgaW5kZXggPCBsZW47IGluZGV4KyspIHtcbiAgICAgICAgbGV0IG5leHQgPSBkaXNwb3NhYmxlc1tpbmRleF07XG4gICAgICAgIGlmICghbmV4dClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiAodHJhcEV4Y2VwdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ID0gZGlzcG9zZVNpbmdsZShuZXh0LCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChleCkge1xuICAgICAgICAgICAgICAgIGlmICghZXhjZXB0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgIGV4Y2VwdGlvbnMucHVzaChleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkaXNwb3NlU2luZ2xlKG5leHQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGlmICghc3VjY2VzcyAmJiBpbmRleCArIDEgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLyogSWYgY29kZSBpcyAnY29udGludWVkJyBieSB0aGUgZGVidWdnZXIsXG4gICAgICAgICAgICAgICAgICAgICAqIG5lZWQgdG8gZW5zdXJlIHRoZSByZXN0IG9mIHRoZSBkaXNwb3NhYmxlcyBhcmUgY2FyZWQgZm9yLiAqL1xuICAgICAgICAgICAgICAgICAgICBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgZmFsc2UsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSnVzdCBpbiBjYXNlLi4uICBTaG91bGQgbmV2ZXIgaGFwcGVuLCBidXQgYXNzZXJ0cyB0aGUgaW50ZW50aW9uLlxuICAgICAgICAgICAgaWYgKCFzdWNjZXNzKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBleGNlcHRpb25zO1xufVxuZXhwb3J0IGRlZmF1bHQgZGlzcG9zZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpc3Bvc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL2Rpc3Bvc2UuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi9FbnVtZXJhdG9yQmFzZVwiO1xuZXhwb3J0IGNsYXNzIEluZGV4RW51bWVyYXRvciBleHRlbmRzIEVudW1lcmF0b3JCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VGYWN0b3J5KSB7XG4gICAgICAgIGxldCBzb3VyY2U7XG4gICAgICAgIHN1cGVyKCgpID0+IHtcbiAgICAgICAgICAgIHNvdXJjZSA9IHNvdXJjZUZhY3RvcnkoKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgJiYgc291cmNlLnNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IDApXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImxlbmd0aCBtdXN0IGJlIHplcm8gb3IgZ3JlYXRlclwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKGxlbikpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImxlbmd0aCBtdXN0IGZpbml0ZSBudW1iZXJcIik7XG4gICAgICAgICAgICAgICAgaWYgKGxlbiAmJiBzb3VyY2Uuc3RlcCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBJbmRleEVudW1lcmF0b3Igc3RlcCB2YWx1ZSAoMCkuXCIpO1xuICAgICAgICAgICAgICAgIGxldCBwb2ludGVyID0gc291cmNlLnBvaW50ZXI7XG4gICAgICAgICAgICAgICAgaWYgKCFwb2ludGVyKVxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyID0gMDtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwb2ludGVyICE9IE1hdGguZmxvb3IocG9pbnRlcikpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgSW5kZXhFbnVtZXJhdG9yIHBvaW50ZXIgdmFsdWUgKFwiICsgcG9pbnRlciArIFwiKSBoYXMgZGVjaW1hbC5cIik7XG4gICAgICAgICAgICAgICAgc291cmNlLnBvaW50ZXIgPSBwb2ludGVyO1xuICAgICAgICAgICAgICAgIGxldCBzdGVwID0gc291cmNlLnN0ZXA7XG4gICAgICAgICAgICAgICAgaWYgKCFzdGVwKVxuICAgICAgICAgICAgICAgICAgICBzdGVwID0gMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdGVwICE9IE1hdGguZmxvb3Ioc3RlcCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgSW5kZXhFbnVtZXJhdG9yIHN0ZXAgdmFsdWUgKFwiICsgc3RlcCArIFwiKSBoYXMgZGVjaW1hbC5cIik7XG4gICAgICAgICAgICAgICAgc291cmNlLnN0ZXAgPSBzdGVwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IGxlbiA9IChzb3VyY2UgJiYgc291cmNlLnNvdXJjZSkgPyBzb3VyY2UubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIGlmICghbGVuIHx8IGlzTmFOKGxlbikpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IHNvdXJjZS5wb2ludGVyO1xuICAgICAgICAgICAgaWYgKHNvdXJjZS5wb2ludGVyID09IG51bGwpXG4gICAgICAgICAgICAgICAgc291cmNlLnBvaW50ZXIgPSAwOyAvLyBzaG91bGQgbmV2ZXIgaGFwcGVuIGJ1dCBpcyBpbiBwbGFjZSB0byBuZWdhdGUgY29tcGlsZXIgd2FybmluZ3MuXG4gICAgICAgICAgICBpZiAoIXNvdXJjZS5zdGVwKVxuICAgICAgICAgICAgICAgIHNvdXJjZS5zdGVwID0gMTsgLy8gc2hvdWxkIG5ldmVyIGhhcHBlbiBidXQgaXMgaW4gcGxhY2UgdG8gbmVnYXRlIGNvbXBpbGVyIHdhcm5pbmdzLlxuICAgICAgICAgICAgc291cmNlLnBvaW50ZXIgPSBzb3VyY2UucG9pbnRlciArIHNvdXJjZS5zdGVwO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyZW50IDwgbGVuICYmIGN1cnJlbnQgPj0gMClcbiAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oc291cmNlLnNvdXJjZVtjdXJyZW50XSlcbiAgICAgICAgICAgICAgICA6IHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgc291cmNlLnNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJbmRleEVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbmRleEVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JbmRleEVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5leHBvcnQgY2xhc3MgSXRlcmF0b3JSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBpbmRleCwgZG9uZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PSAnYm9vbGVhbicpXG4gICAgICAgICAgICB0aGlzLmRvbmUgPSBpbmRleDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLmRvbmUgPSBkb25lO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gICAgfVxufVxuKGZ1bmN0aW9uIChJdGVyYXRvclJlc3VsdCkge1xuICAgIEl0ZXJhdG9yUmVzdWx0LkRvbmUgPSBuZXcgSXRlcmF0b3JSZXN1bHQoVk9JRDAsIFZPSUQwLCB0cnVlKTtcbiAgICBmdW5jdGlvbiBHZXREb25lKCkgeyByZXR1cm4gSXRlcmF0b3JSZXN1bHQuRG9uZTsgfVxuICAgIEl0ZXJhdG9yUmVzdWx0LkdldERvbmUgPSBHZXREb25lO1xufSkoSXRlcmF0b3JSZXN1bHQgfHwgKEl0ZXJhdG9yUmVzdWx0ID0ge30pKTtcbk9iamVjdC5mcmVlemUoSXRlcmF0b3JSZXN1bHQpO1xuZXhwb3J0IGRlZmF1bHQgSXRlcmF0b3JSZXN1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JdGVyYXRvclJlc3VsdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0l0ZXJhdG9yUmVzdWx0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbi8qKlxuICogQ2FuIGJlIHVzZWQgc3RhdGljYWxseSBvciBleHRlbmRlZCBmb3IgdmFyeWluZyBkaWZmZXJlbnQgcmV1c2FibGUgZnVuY3Rpb24gc2lnbmF0dXJlcy5cbiAqL1xuLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqLyBleHBvcnQgY2xhc3MgRnVuY3Rpb25zIHtcbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogQSB0eXBlZCBtZXRob2QgZm9yIHVzZSB3aXRoIHNpbXBsZSBzZWxlY3Rpb24gb2YgdGhlIHBhcmFtZXRlci5cbiAgICAgKiBAcmV0dXJucyB7VH1cbiAgICAgKi9cbiAgICBJZGVudGl0eSh4KSB7IHJldHVybiB4OyB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBUcnVlKCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZhbHNlKCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAvKipcbiAgICAgKiBEb2VzIG5vdGhpbmcuXG4gICAgICovXG4gICAgQmxhbmsoKSB7IH1cbn1cbmNvbnN0IHJvb3RGdW5jdGlvbnMgPSBuZXcgRnVuY3Rpb25zKCk7XG4vLyBFeHBvc2Ugc3RhdGljIHZlcnNpb25zLlxuKGZ1bmN0aW9uIChGdW5jdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBBIHR5cGVkIG1ldGhvZCBmb3IgdXNlIHdpdGggc2ltcGxlIHNlbGVjdGlvbiBvZiB0aGUgcGFyYW1ldGVyLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5JZGVudGl0eSA9IHJvb3RGdW5jdGlvbnMuSWRlbnRpdHk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBGdW5jdGlvbnMuVHJ1ZSA9IHJvb3RGdW5jdGlvbnMuVHJ1ZTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5GYWxzZSA9IHJvb3RGdW5jdGlvbnMuRmFsc2U7XG4gICAgLyoqXG4gICAgICogRG9lcyBub3RoaW5nLlxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5CbGFuayA9IHJvb3RGdW5jdGlvbnMuQmxhbms7XG59KShGdW5jdGlvbnMgfHwgKEZ1bmN0aW9ucyA9IHt9KSk7XG4vLyBNYWtlIHRoaXMgcmVhZCBvbmx5LiAgU2hvdWxkIHN0aWxsIGFsbG93IGZvciBzdWItY2xhc3Npbmcgc2luY2UgZXh0cmEgbWV0aG9kcyBhcmUgYWRkZWQgdG8gcHJvdG90eXBlLlxuT2JqZWN0LmZyZWV6ZShGdW5jdGlvbnMpO1xuZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb25zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RnVuY3Rpb25zLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRnVuY3Rpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tIFwiLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBhcmVFcXVhbCB9IGZyb20gXCIuLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBpc0NvbW1vbkpTLCBpc05vZGVKUywgaXNSZXF1aXJlSlMgfSBmcm9tIFwiLi4vRW52aXJvbm1lbnRcIjtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4vL25vaW5zcGVjdGlvbiBTcGVsbENoZWNraW5nSW5zcGVjdGlvblxuY29uc3QgTkFNRSA9IFwiQ29sbGVjdGlvbkJhc2VcIiwgQ01EQyA9IFwiQ2Fubm90IG1vZGlmeSBhIGRpc3Bvc2VkIGNvbGxlY3Rpb24uXCIsIENNUk8gPSBcIkNhbm5vdCBtb2RpZnkgYSByZWFkLW9ubHkgY29sbGVjdGlvbi5cIjtcbmNvbnN0IExJTlFfUEFUSCA9IFwiLi4vLi4vU3lzdGVtLkxpbnEvTGlucVwiO1xuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25CYXNlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSwgX2VxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9lcXVhbGl0eUNvbXBhcmVyID0gX2VxdWFsaXR5Q29tcGFyZXI7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IE5BTUU7XG4gICAgICAgIF8uX2ltcG9ydEVudHJpZXMoc291cmNlKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uID0gMDtcbiAgICAgICAgXy5fbW9kaWZpZWRDb3VudCA9IDA7XG4gICAgICAgIF8uX3ZlcnNpb24gPSAwO1xuICAgIH1cbiAgICBnZXQgY291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvdW50KCk7XG4gICAgfVxuICAgIGdldElzUmVhZE9ubHkoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgZ2V0IGlzUmVhZE9ubHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldElzUmVhZE9ubHkoKTtcbiAgICB9XG4gICAgYXNzZXJ0TW9kaWZpYWJsZSgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoQ01EQyk7XG4gICAgICAgIGlmICh0aGlzLmdldElzUmVhZE9ubHkoKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKENNUk8pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgYXNzZXJ0VmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgICAgIGlmICh2ZXJzaW9uICE9PSB0aGlzLl92ZXJzaW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDb2xsZWN0aW9uIHdhcyBtb2RpZmllZC5cIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBfb25Nb2RpZmllZCgpIHsgfVxuICAgIF9zaWduYWxNb2RpZmljYXRpb24oaW5jcmVtZW50KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoaW5jcmVtZW50KVxuICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICBpZiAoXy5fbW9kaWZpZWRDb3VudCAmJiAhdGhpcy5fdXBkYXRlUmVjdXJzaW9uKSB7XG4gICAgICAgICAgICBfLl9tb2RpZmllZENvdW50ID0gMDtcbiAgICAgICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgXy5fb25Nb2RpZmllZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgLy8gQXZvaWQgZmF0YWwgZXJyb3JzIHdoaWNoIG1heSBoYXZlIGJlZW4gY2F1c2VkIGJ5IGNvbnN1bWVyLlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfaW5jcmVtZW50TW9kaWZpZWQoKSB7IHRoaXMuX21vZGlmaWVkQ291bnQrKzsgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIGdldCBpc1VwZGF0aW5nKCkgeyByZXR1cm4gdGhpcy5fdXBkYXRlUmVjdXJzaW9uICE9IDA7IH1cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGNsb3N1cmUgdGhhdCBpZiByZXR1cm5pbmcgdHJ1ZSB3aWxsIHByb3BhZ2F0ZSBhbiB1cGRhdGUgc2lnbmFsLlxuICAgICAqIE11bHRpcGxlIHVwZGF0ZSBvcGVyYXRpb25zIGNhbiBiZSBvY2N1cnJpbmcgYXQgb25jZSBvciByZWN1cnNpdmVseSBhbmQgdGhlIG9uTW9kaWZpZWQgc2lnbmFsIHdpbGwgb25seSBvY2N1ciBvbmNlIHRoZXkncmUgZG9uZS5cbiAgICAgKiBAcGFyYW0gY2xvc3VyZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhbmRsZVVwZGF0ZShjbG9zdXJlKSB7XG4gICAgICAgIGlmICghY2xvc3VyZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24rKztcbiAgICAgICAgbGV0IHVwZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh1cGRhdGVkID0gY2xvc3VyZSgpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICB9XG4gICAgLypcbiAgICAgKiBOb3RlOiBmb3IgYSBzbGlnaHQgYW1vdW50IG1vcmUgY29kZSwgd2UgYXZvaWQgY3JlYXRpbmcgZnVuY3Rpb25zL2Nsb3N1cmVzLlxuICAgICAqIENhbGxpbmcgaGFuZGxlVXBkYXRlIGlzIHRoZSBjb3JyZWN0IHBhdHRlcm4sIGJ1dCBpZiBwb3NzaWJsZSBhdm9pZCBjcmVhdGluZyBhbm90aGVyIGZ1bmN0aW9uIHNjb3BlLlxuICAgICAqL1xuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZW50cnkgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAgICogQHBhcmFtIGVudHJ5XG4gICAgICovXG4gICAgYWRkKGVudHJ5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoXy5fYWRkSW50ZXJuYWwoZW50cnkpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gXztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBlbnRyaWVzIGZyb20gdGhlIGNvbGxlY3Rpb24gYWxsb3dpbmcgZm9yIGEgbGltaXQuXG4gICAgICogRm9yIGV4YW1wbGUgaWYgdGhlIGNvbGxlY3Rpb24gbm90IGEgZGlzdGluY3Qgc2V0LCBtb3JlIHRoYW4gb25lIGVudHJ5IGNvdWxkIGJlIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIGVudHJ5IFRoZSBlbnRyeSB0byByZW1vdmUuXG4gICAgICogQHBhcmFtIG1heCBMaW1pdCBvZiBlbnRyaWVzIHRvIHJlbW92ZS4gIFdpbGwgcmVtb3ZlIGFsbCBtYXRjaGVzIGlmIG5vIG1heCBzcGVjaWZpZWQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIG51bWJlciBvZiBlbnRyaWVzIHJlbW92ZWQuXG4gICAgICovXG4gICAgcmVtb3ZlKGVudHJ5LCBtYXggPSBJbmZpbml0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICBsZXQgbiA9IE5hTjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChuID0gXy5fcmVtb3ZlSW50ZXJuYWwoZW50cnksIG1heCkpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGNvbnRlbnRzIG9mIHRoZSBjb2xsZWN0aW9uIHJlc3VsdGluZyBpbiBhIGNvdW50IG9mIHplcm8uXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24rKztcbiAgICAgICAgbGV0IG4gPSBOYU47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobiA9IF8uX2NsZWFySW50ZXJuYWwoKSlcbiAgICAgICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24tLTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJJbnRlcm5hbCgpO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gMDtcbiAgICAgICAgdGhpcy5fdXBkYXRlUmVjdXJzaW9uID0gMDtcbiAgICAgICAgdGhpcy5fbW9kaWZpZWRDb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IGwgPSB0aGlzLl9saW5xO1xuICAgICAgICB0aGlzLl9saW5xID0gdm9pZCAwO1xuICAgICAgICBpZiAobClcbiAgICAgICAgICAgIGwuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBfaW1wb3J0RW50cmllcyhlbnRyaWVzKSB7XG4gICAgICAgIGxldCBhZGRlZCA9IDA7XG4gICAgICAgIGlmIChlbnRyaWVzKSB7XG4gICAgICAgICAgICBpZiAoKGVudHJpZXMpIGluc3RhbmNlb2YgKEFycmF5KSkge1xuICAgICAgICAgICAgICAgIC8vIE9wdGltaXplIGZvciBhdm9pZGluZyBhIG5ldyBjbG9zdXJlLlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGUgb2YgZW50cmllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWRkSW50ZXJuYWwoZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRlZCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvckVhY2goZW50cmllcywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hZGRJbnRlcm5hbChlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkKys7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFkZGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYWZlbHkgaW1wb3J0cyBhbnkgYXJyYXkgZW51bWVyYXRvciwgb3IgZW51bWVyYWJsZS5cbiAgICAgKiBAcGFyYW0gZW50cmllc1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgaW1wb3J0RW50cmllcyhlbnRyaWVzKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIWVudHJpZXMpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICBsZXQgbiA9IE5hTjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChuID0gXy5faW1wb3J0RW50cmllcyhlbnRyaWVzKSlcbiAgICAgICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24tLTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgZmlsdGVyZWQgYnkgdGhlIHByb3ZpZGVkIHByZWRpY2F0ZS5cbiAgICAgKiBQcm92aWRlZCBmb3Igc2ltaWxhcml0eSB0byBKUyBBcnJheS5cbiAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICogQHJldHVybnMge1tdfVxuICAgICAqL1xuICAgIGZpbHRlcihwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdwcmVkaWNhdGUnKTtcbiAgICAgICAgbGV0IGNvdW50ID0gIXRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoZSwgaSkpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIHRoZSBmaXJzdCB0aW1lIHByZWRpY2F0ZSByZXR1cm5zIHRydWUuICBPdGhlcndpc2UgZmFsc2UuXG4gICAgICogVXNlZnVsIGZvciBzZWFyY2hpbmcgdGhyb3VnaCBhIGNvbGxlY3Rpb24uXG4gICAgICogQHBhcmFtIHByZWRpY2F0ZVxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgYW55KHByZWRpY2F0ZSkge1xuICAgICAgICBsZXQgY291bnQgPSB0aGlzLmdldENvdW50KCk7XG4gICAgICAgIGlmICghY291bnQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4oY291bnQpO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKChlLCBpKSA9PiAhKGZvdW5kID0gcHJlZGljYXRlKGUsIGkpKSk7XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIHRoZSBmaXJzdCB0aW1lIHByZWRpY2F0ZSByZXR1cm5zIHRydWUuICBPdGhlcndpc2UgZmFsc2UuXG4gICAgICogU2VlICcuYW55KHByZWRpY2F0ZSknLiAgQXMgdGhpcyBtZXRob2QgaXMganVzdCBqdXN0IGluY2x1ZGVkIHRvIGhhdmUgc2ltaWxhcml0eSB3aXRoIGEgSlMgQXJyYXkuXG4gICAgICogQHBhcmFtIHByZWRpY2F0ZVxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgc29tZShwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW55KHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZXF1YWxpdHkgY29tcGFyZXIgcmVzb2x2ZXMgdHJ1ZSBvbiBhbnkgZWxlbWVudCBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZW50cnlcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjb250YWlucyhlbnRyeSkge1xuICAgICAgICBjb25zdCBlcXVhbHMgPSB0aGlzLl9lcXVhbGl0eUNvbXBhcmVyO1xuICAgICAgICByZXR1cm4gdGhpcy5hbnkoZSA9PiBlcXVhbHMoZW50cnksIGUpKTtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24sIHVzZUNvcHkpIHtcbiAgICAgICAgaWYgKHRoaXMud2FzRGlzcG9zZWQpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgaWYgKHVzZUNvcHkpIHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSB0aGlzLnRvQXJyYXkoKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvckVhY2goYSwgYWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGEubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JFYWNoKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBhY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvcGllcyBhbGwgdmFsdWVzIHRvIG51bWVyaWNhbGx5IGluZGV4YWJsZSBvYmplY3QuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqIEByZXR1cm5zIHtUVGFyZ2V0fVxuICAgICAqL1xuICAgIGNvcHlUbyh0YXJnZXQsIGluZGV4ID0gMCkge1xuICAgICAgICBpZiAoIXRhcmdldClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ3RhcmdldCcpO1xuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICBjb25zdCBuZXdMZW5ndGggPSBjb3VudCArIGluZGV4O1xuICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGggPCBuZXdMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGFyZ2V0Lmxlbmd0aCA9IG5ld0xlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IGUgPSB0aGlzLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIHdoaWxlIChlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaW5kZXgrK10gPSBlLmN1cnJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgY29sbGVjdGlvbiBjb250ZW50cy5cbiAgICAgKiBAcmV0dXJucyB7YW55W118QXJyYXl9XG4gICAgICovXG4gICAgdG9BcnJheSgpIHtcbiAgICAgICAgY29uc3QgY291bnQgPSB0aGlzLmdldENvdW50KCk7XG4gICAgICAgIHJldHVybiBjb3VudFxuICAgICAgICAgICAgPyB0aGlzLmNvcHlUbyhjb3VudCA+IDY1NTM2ID8gbmV3IEFycmF5KGNvdW50KSA6IFtdKVxuICAgICAgICAgICAgOiBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogLmxpbnEgd2lsbCByZXR1cm4gYW4gSUxpbnFFbnVtZXJhYmxlIGlmIC5saW5xQXN5bmMoKSBoYXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseSBvciB0aGUgZGVmYXVsdCBtb2R1bGUgbG9hZGVyIGlzIE5vZGVKUytDb21tb25KUy5cbiAgICAgKiBAcmV0dXJucyB7SUxpbnFFbnVtZXJhYmxlfVxuICAgICAqL1xuICAgIGdldCBsaW5xKCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgZSA9IHRoaXMuX2xpbnE7XG4gICAgICAgIGlmICghZSkge1xuICAgICAgICAgICAgbGV0IHI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHIgPSBldmFsKCdyZXF1aXJlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHsgfVxuICAgICAgICAgICAgdGhpcy5fbGlucSA9IGUgPSByICYmIHIoTElOUV9QQVRIKS5kZWZhdWx0LmZyb20odGhpcyk7XG4gICAgICAgICAgICBpZiAoIWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBpc1JlcXVpcmVKU1xuICAgICAgICAgICAgICAgICAgICA/IGB1c2luZyAubGlucSB0byBsb2FkIGFuZCBpbml0aWFsaXplIGEgSUxpbnFFbnVtZXJhYmxlIGlzIGN1cnJlbnRseSBvbmx5IHN1cHBvcnRlZCB3aXRoaW4gYSBOb2RlSlMgZW52aXJvbm1lbnQuXHJcbkltcG9ydCBTeXN0ZW0uTGlucS9MaW5xIGFuZCB1c2UgRW51bWVyYWJsZS5mcm9tKGUpIGluc3RlYWQuXHJcbllvdSBjYW4gYWxzbyBwcmVsb2FkIHRoZSBMaW5xIG1vZHVsZSBhcyBhIGRlcGVuZGVuY3kgb3IgdXNlIC5saW5xQXN5bmMoY2FsbGJhY2spIGZvciBBTUQvUmVxdWlyZUpTLmBcbiAgICAgICAgICAgICAgICAgICAgOiBcIlRoZXJlIHdhcyBhIHByb2JsZW0gaW1wb3J0aW5nIFN5c3RlbS5MaW5xL0xpbnFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogLmxpbnFBc3luYygpIGlzIGZvciB1c2Ugd2l0aCBkZWZlcnJlZCBsb2FkaW5nLlxuICAgICAqIEVuc3VyZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIExpbnEgZXh0ZW5zaW9ucyBpcyBhdmFpbGFibGUgYW5kIHRoZW4gcGFzc2VzIGl0IHRvIHRoZSBjYWxsYmFjay5cbiAgICAgKiBSZXR1cm5zIGFuIElMaW5xRW51bWVyYWJsZSBpZiBvbmUgaXMgYWxyZWFkeSBhdmFpbGFibGUsIG90aGVyd2lzZSB1bmRlZmluZWQuXG4gICAgICogUGFzc2luZyBubyBwYXJhbWV0ZXJzIHdpbGwgc3RpbGwgaW5pdGlhdGUgbG9hZGluZyBhbmQgaW5pdGlhbGl6aW5nIHRoZSBJTGlucUVudW1lcmFibGUgd2hpY2ggY2FuIGJlIHVzZWZ1bCBmb3IgcHJlLWxvYWRpbmcuXG4gICAgICogQW55IGNhbGwgdG8gLmxpbnFBc3luYygpIHdoZXJlIGFuIElMaW5xRW51bWVyYWJsZSBpcyByZXR1cm5lZCBjYW4gYmUgYXNzdXJlZCB0aGF0IGFueSBzdWJzZXF1ZW50IGNhbGxzIHRvIC5saW5xIHdpbGwgcmV0dXJuIHRoZSBzYW1lIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHtJTGlucUVudW1lcmFibGV9XG4gICAgICovXG4gICAgbGlucUFzeW5jKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBlID0gdGhpcy5fbGlucTtcbiAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICBpZiAoaXNSZXF1aXJlSlMpIHtcbiAgICAgICAgICAgICAgICBldmFsKFwicmVxdWlyZVwiKShbTElOUV9QQVRIXSwgKGxpbnEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ291bGQgZW5kIHVwIGJlaW5nIGNhbGxlZCBtb3JlIHRoYW4gb25jZSwgYmUgc3VyZSB0byBjaGVjayBmb3IgLl9saW5xIGJlZm9yZSBzZXR0aW5nLi4uXG4gICAgICAgICAgICAgICAgICAgIGUgPSB0aGlzLl9saW5xO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWUpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9saW5xID0gZSA9IGxpbnEuZGVmYXVsdC5mcm9tKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWUpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIlRoZXJlIHdhcyBhIHByb2JsZW0gaW1wb3J0aW5nIFN5c3RlbS5MaW5xL0xpbnFcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gdm9pZCAwOyAvLyBJbiBjYXNlIHRoaXMgaXMgcmV0dXJuIHN5bmNocm9ub3VzbHkuLlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNOb2RlSlMgJiYgaXNDb21tb25KUykge1xuICAgICAgICAgICAgICAgIGUgPSB0aGlzLmxpbnE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbm5vdCBmaW5kIGEgY29tcGF0aWJsZSBsb2FkZXIgZm9yIGltcG9ydGluZyBTeXN0ZW0uTGlucS9MaW5xXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUgJiYgY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29sbGVjdGlvbkJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9Db2xsZWN0aW9uQmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBpbml0aWFsaXplIH0gZnJvbSBcIi4vaW5pdGlhbGl6ZVwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbi8qKlxuICpcbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBzb3VyY2VJbmRleFxuICogQHBhcmFtIGxlbmd0aFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHkoc291cmNlLCBzb3VyY2VJbmRleCA9IDAsIGxlbmd0aCA9IEluZmluaXR5KSB7XG4gICAgaWYgKCFzb3VyY2UpXG4gICAgICAgIHJldHVybiBzb3VyY2U7IC8vIG1heSBoYXZlIHBhc3NlZCB6ZXJvPyB1bmRlZmluZWQ/IG9yIG51bGw/XG4gICAgcmV0dXJuIGNvcHlUbyhzb3VyY2UsIGluaXRpYWxpemUoTWF0aC5taW4obGVuZ3RoLCBNYXRoLm1heChzb3VyY2UubGVuZ3RoIC0gc291cmNlSW5kZXgsIDApKSksIHNvdXJjZUluZGV4LCAwLCBsZW5ndGgpO1xufVxuY29uc3QgQ0JOID0gJ0Nhbm5vdCBiZSBudWxsLicsIENCTDAgPSAnQ2Fubm90IGJlIGxlc3MgdGhhbiB6ZXJvLic7XG4vKipcbiAqIENvcGllcyBvbmUgYXJyYXkgdG8gYW5vdGhlci5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBkZXN0aW5hdGlvblxuICogQHBhcmFtIHNvdXJjZUluZGV4XG4gKiBAcGFyYW0gZGVzdGluYXRpb25JbmRleFxuICogQHBhcmFtIGxlbmd0aCBBbiBvcHRpb25hbCBsaW1pdCB0byBzdG9wIGNvcHlpbmcuXG4gKiBAcmV0dXJucyBUaGUgZGVzdGluYXRpb24gYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5VG8oc291cmNlLCBkZXN0aW5hdGlvbiwgc291cmNlSW5kZXggPSAwLCBkZXN0aW5hdGlvbkluZGV4ID0gMCwgbGVuZ3RoID0gSW5maW5pdHkpIHtcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignc291cmNlJywgQ0JOKTtcbiAgICBpZiAoIWRlc3RpbmF0aW9uKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdkZXN0aW5hdGlvbicsIENCTik7XG4gICAgaWYgKHNvdXJjZUluZGV4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignc291cmNlSW5kZXgnLCBzb3VyY2VJbmRleCwgQ0JMMCk7XG4gICAgbGV0IHNvdXJjZUxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG4gICAgaWYgKCFzb3VyY2VMZW5ndGgpXG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICBpZiAoc291cmNlSW5kZXggPj0gc291cmNlTGVuZ3RoKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzb3VyY2VJbmRleCcsIHNvdXJjZUluZGV4LCAnTXVzdCBiZSBsZXNzIHRoYW4gdGhlIGxlbmd0aCBvZiB0aGUgc291cmNlIGFycmF5LicpO1xuICAgIGlmIChkZXN0aW5hdGlvbi5sZW5ndGggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdkZXN0aW5hdGlvbkluZGV4JywgZGVzdGluYXRpb25JbmRleCwgQ0JMMCk7XG4gICAgY29uc3QgbWF4TGVuZ3RoID0gc291cmNlLmxlbmd0aCAtIHNvdXJjZUluZGV4O1xuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpICYmIGxlbmd0aCA+IG1heExlbmd0aClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignc291cmNlSW5kZXgnLCBzb3VyY2VJbmRleCwgJ1NvdXJjZSBpbmRleCArIGxlbmd0aCBjYW5ub3QgZXhjZWVkIHRoZSBsZW5ndGggb2YgdGhlIHNvdXJjZSBhcnJheS4nKTtcbiAgICBsZW5ndGggPSBNYXRoLm1pbihsZW5ndGgsIG1heExlbmd0aCk7XG4gICAgY29uc3QgbmV3TGVuZ3RoID0gZGVzdGluYXRpb25JbmRleCArIGxlbmd0aDtcbiAgICBpZiAobmV3TGVuZ3RoID4gZGVzdGluYXRpb24ubGVuZ3RoKVxuICAgICAgICBkZXN0aW5hdGlvbi5sZW5ndGggPSBuZXdMZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBkZXN0aW5hdGlvbltkZXN0aW5hdGlvbkluZGV4ICsgaV0gPSBzb3VyY2Vbc291cmNlSW5kZXggKyBpXTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29weS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L2NvcHkuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuZXhwb3J0IGNvbnN0IEVNUFRZID0gJyc7XG4vKipcbiAqIFJldHVybnMgYSBudW1lcmljYWwgKGludGVnZXIpIGhhc2ggY29kZSBvZiB0aGUgc3RyaW5nLiAgQ2FuIGJlIHVzZWQgZm9yIGlkZW50aWZ5aW5nIGluZXF1YWxpdHkgb2YgY29udGVudHMsIGJ1dCB0d28gZGlmZmVyZW50IHN0cmluZ3MgaW4gcmFyZSBjYXNlcyB3aWxsIGhhdmUgdGhlIHNhbWUgaGFzaCBjb2RlLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhhc2hDb2RlKHNvdXJjZSkge1xuICAgIGxldCBoYXNoID0gMCB8IDA7XG4gICAgaWYgKHNvdXJjZS5sZW5ndGggPT0gMClcbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzb3VyY2UubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGxldCBjaCA9IHNvdXJjZS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaDtcbiAgICAgICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgICB9XG4gICAgcmV0dXJuIGhhc2g7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0KHNvdXJjZSwgY291bnQpIHtcbiAgICBsZXQgcmVzdWx0ID0gRU1QVFk7XG4gICAgaWYgKCFpc05hTihjb3VudCkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gc291cmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUNoYXJzKGNoT3JDaGFycywgY291bnQgPSAxKSB7XG4gICAgaWYgKChjaE9yQ2hhcnMpIGluc3RhbmNlb2YgKEFycmF5KSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gRU1QVFk7XG4gICAgICAgIGZvciAobGV0IGNoYXIgb2YgY2hPckNoYXJzKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcGVhdChTdHJpbmcuZnJvbUNoYXJDb2RlKGNoT3JDaGFycyksIGNvdW50KTtcbiAgICB9XG59XG4vKipcbiAqIEVzY2FwZXMgYSBSZWdFeHAgc2VxdWVuY2UuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHNvdXJjZSkge1xuICAgIHJldHVybiBzb3VyY2UucmVwbGFjZSgvWy1bXFxdXFwve30oKSorPy5cXFxcXiR8XS9nLCBcIlxcXFwkJlwiKTtcbn1cbi8qKlxuICogQ2FuIHRyaW0gYW55IGNoYXJhY3RlciBvciBzZXQgb2YgY2hhcmFjdGVycyBmcm9tIHRoZSBlbmRzIG9mIGEgc3RyaW5nLlxuICogVXNlcyBhIFJlZ2V4IGVzY2FwZW1lbnQgdG8gcmVwbGFjZSB0aGVtIHdpdGggZW1wdHkuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gY2hhcnMgQSBzdHJpbmcgb3IgYXJyYXkgb2YgY2hhcmFjdGVycyBkZXNpcmVkIHRvIGJlIHRyaW1tZWQuXG4gKiBAcGFyYW0gaWdub3JlQ2FzZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc291cmNlLCBjaGFycywgaWdub3JlQ2FzZSkge1xuICAgIGlmIChjaGFycyA9PT0gRU1QVFkpXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgaWYgKGNoYXJzKSB7XG4gICAgICAgIGNvbnN0IGVzY2FwZWQgPSBlc2NhcGVSZWdFeHAoKGNoYXJzKSBpbnN0YW5jZW9mIChBcnJheSkgPyBjaGFycy5qb2luKCkgOiBjaGFycyk7XG4gICAgICAgIHJldHVybiBzb3VyY2UucmVwbGFjZShuZXcgUmVnRXhwKCdeWycgKyBlc2NhcGVkICsgJ10rfFsnICsgZXNjYXBlZCArICddKyQnLCAnZycgKyAoaWdub3JlQ2FzZVxuICAgICAgICAgICAgPyAnaSdcbiAgICAgICAgICAgIDogJycpKSwgRU1QVFkpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlLnJlcGxhY2UoL15cXHMrfFxccyskL2csIEVNUFRZKTtcbn1cbi8qKlxuICogVGFrZXMgYW55IGFyZ1xuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIGFyZ3NcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoc291cmNlLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHN1cHBsYW50KHNvdXJjZSwgYXJncyk7XG59XG4vL1xuLyoqXG4gKiBUaGlzIHRha2VzIGEgc3RyaW5nIGFuZCByZXBsYWNlcyAne3N0cmluZ30nIHdpdGggdGhlIHJlc3BlY3RlZCBwYXJhbWV0ZXIuXG4gKiBBbHNvIGFsbG93cyBmb3IgcGFzc2luZyBhbiBhcnJheSBpbiBvcmRlciB0byB1c2UgJ3tufScgbm90YXRpb24uXG4gKiBOb3QgbGltaXRlZCB0byBhbiBhcnJheSdzIGluZGV4ZXMuICBGb3IgZXhhbXBsZSwge2xlbmd0aH0gaXMgYWxsb3dlZC5cbiAqIEJhc2VkIHVwb24gQ3JvY2tmb3JkJ3Mgc3VwcGxhbnQgZnVuY3Rpb24uXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gcGFyYW1zXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VwcGxhbnQoc291cmNlLCBwYXJhbXMpIHtcbiAgICBjb25zdCBvSXNBcnJheSA9IChwYXJhbXMpIGluc3RhbmNlb2YgKEFycmF5KTtcbiAgICByZXR1cm4gc291cmNlLnJlcGxhY2UoL3soW157fV0qKX0vZywgKGEsIGIpID0+IHtcbiAgICAgICAgbGV0IG4gPSBiO1xuICAgICAgICBpZiAob0lzQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBpID0gcGFyc2VJbnQoYik7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKGkpKVxuICAgICAgICAgICAgICAgIG4gPSBpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByID0gcGFyYW1zW25dO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiByKSB7XG4gICAgICAgICAgICBjYXNlIFR5cGUuU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBUeXBlLk5VTUJFUjpcbiAgICAgICAgICAgIGNhc2UgVHlwZS5CT09MRUFOOlxuICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKHIgJiYgVHlwZS5oYXNNZW1iZXJPZlR5cGUociwgXCJ0b1N0cmluZ1wiLCBUeXBlLkZVTkNUSU9OKSlcbiAgICAgICAgICAgICAgICAgICAgPyByLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgOiBhO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjYW5NYXRjaChzb3VyY2UsIG1hdGNoKSB7XG4gICAgaWYgKCFUeXBlLmlzU3RyaW5nKHNvdXJjZSkgfHwgIW1hdGNoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHNvdXJjZSA9PT0gbWF0Y2gpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmIChtYXRjaC5sZW5ndGggPCBzb3VyY2UubGVuZ3RoKVxuICAgICAgICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXR0ZXJuIG1hdGNoZXMgdGhlIGJlZ2lubmluZyBvZiB0aGUgc291cmNlLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHBhdHRlcm5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRzV2l0aChzb3VyY2UsIHBhdHRlcm4pIHtcbiAgICBjb25zdCBtID0gY2FuTWF0Y2goc291cmNlLCBwYXR0ZXJuKTtcbiAgICByZXR1cm4gVHlwZS5pc0Jvb2xlYW4obSkgPyBtIDogc291cmNlLmluZGV4T2YocGF0dGVybikgPT0gMDtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXR0ZXJuIG1hdGNoZXMgdGhlIGVuZCBvZiB0aGUgc291cmNlLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHBhdHRlcm5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5kc1dpdGgoc291cmNlLCBwYXR0ZXJuKSB7XG4gICAgY29uc3QgbSA9IGNhbk1hdGNoKHNvdXJjZSwgcGF0dGVybik7XG4gICAgcmV0dXJuIFR5cGUuaXNCb29sZWFuKG0pID8gbSA6IHNvdXJjZS5sYXN0SW5kZXhPZihwYXR0ZXJuKSA9PSAoc291cmNlLmxlbmd0aCAtIHBhdHRlcm4ubGVuZ3RoKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVV0aWxpdHkuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UZXh0L1V0aWxpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgSW5kZXhFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSW5kZXhFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmV4cG9ydCBjbGFzcyBBcnJheUVudW1lcmF0b3IgZXh0ZW5kcyBJbmRleEVudW1lcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGFycmF5T3JGYWN0b3J5LCBzdGFydCA9IDAsIHN0ZXAgPSAxKSB7XG4gICAgICAgIHN1cGVyKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFycmF5ID0gVHlwZS5pc0Z1bmN0aW9uKGFycmF5T3JGYWN0b3J5KSA/IGFycmF5T3JGYWN0b3J5KCkgOiBhcnJheU9yRmFjdG9yeTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc291cmNlOiBhcnJheSxcbiAgICAgICAgICAgICAgICBwb2ludGVyOiBzdGFydCxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgICAgICAgICAgICBzdGVwOiBzdGVwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBBcnJheUVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BcnJheUVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9BcnJheUVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdPYmplY3REaXNwb3NlZEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gZXh0ZW5kcyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIHtcbiAgICAvLyBGb3Igc2ltcGxpY2l0eSBhbmQgY29uc2lzdGVuY3ksIGxldHMgc3RpY2sgd2l0aCAxIHNpZ25hdHVyZS5cbiAgICBjb25zdHJ1Y3RvcihvYmplY3ROYW1lLCBtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbikge1xuICAgICAgICBzdXBlcihtZXNzYWdlIHx8ICcnLCBpbm5lckV4Y2VwdGlvbiwgKF8pID0+IHtcbiAgICAgICAgICAgIF8ub2JqZWN0TmFtZSA9IG9iamVjdE5hbWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgb05hbWUgPSBfLm9iamVjdE5hbWU7XG4gICAgICAgIG9OYW1lID0gb05hbWUgPyAoJ3snICsgb05hbWUgKyAnfSAnKSA6ICcnO1xuICAgICAgICByZXR1cm4gJ1snICsgXy5uYW1lICsgJzogJyArIG9OYW1lICsgXy5tZXNzYWdlICsgJ10nO1xuICAgIH1cbiAgICBzdGF0aWMgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2FibGUsIG9iamVjdE5hbWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGRpc3Bvc2FibGUud2FzRGlzcG9zZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24ob2JqZWN0TmFtZSwgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0RGlzcG9zZWRFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL09iamVjdERpc3Bvc2VkRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uIE9iamVjdFBvb2wgZnJvbSBQYXJhbGxlbCBFeHRlbnNpb24gRXh0cmFzIGFuZCBvdGhlciBPYmplY3RQb29sIGltcGxlbWVudGF0aW9ucy5cbiAqIFVzZXMgLmFkZChUKSBhbmQgLnRha2UoKTpUXG4gKi9cbmltcG9ydCB7IGRpc3Bvc2UgfSBmcm9tIFwiLi9kaXNwb3NlXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBUYXNrSGFuZGxlciB9IGZyb20gXCIuLi9UaHJlYWRpbmcvVGFza3MvVGFza0hhbmRsZXJcIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBPQkpFQ1RfUE9PTCA9IFwiT2JqZWN0UG9vbFwiLCBfTUFYX1NJWkUgPSBcIl9tYXhTaXplXCIsIEFCU09MVVRFX01BWF9TSVpFID0gNjU1MzYsIE1VU1RfQkVfR1QxID0gXCJNdXN0IGJlIGF0IHZhbGlkIG51bWJlciBsZWFzdCAxLlwiLCBNVVNUX0JFX0xUTSA9IGBNdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAke0FCU09MVVRFX01BWF9TSVpFfS5gO1xuZXhwb3J0IGNsYXNzIE9iamVjdFBvb2wgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX21heFNpemUsIF9nZW5lcmF0b3IsIF9yZWN5Y2xlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9tYXhTaXplID0gX21heFNpemU7XG4gICAgICAgIHRoaXMuX2dlbmVyYXRvciA9IF9nZW5lcmF0b3I7XG4gICAgICAgIHRoaXMuX3JlY3ljbGVyID0gX3JlY3ljbGVyO1xuICAgICAgICAvKipcbiAgICAgICAgICogQnkgZGVmYXVsdCB3aWxsIGNsZWFyIGFmdGVyIDUgc2Vjb25kcyBvZiBub24tdXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hdXRvQ2xlYXJUaW1lb3V0ID0gNTAwMDtcbiAgICAgICAgaWYgKGlzTmFOKF9tYXhTaXplKSB8fCBfbWF4U2l6ZSA8IDEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKF9NQVhfU0laRSwgX21heFNpemUsIE1VU1RfQkVfR1QxKTtcbiAgICAgICAgaWYgKF9tYXhTaXplID4gQUJTT0xVVEVfTUFYX1NJWkUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKF9NQVhfU0laRSwgX21heFNpemUsIE1VU1RfQkVfTFRNKTtcbiAgICAgICAgdGhpcy5fbG9jYWxBYnNNYXhTaXplID0gTWF0aC5taW4oX21heFNpemUgKiAyLCBBQlNPTFVURV9NQVhfU0laRSk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IE9CSkVDVF9QT09MO1xuICAgICAgICBfLl9wb29sID0gW107XG4gICAgICAgIF8uX3RyaW1tZXIgPSBuZXcgVGFza0hhbmRsZXIoKCkgPT4gXy5fdHJpbSgpKTtcbiAgICAgICAgY29uc3QgY2xlYXIgPSAoKSA9PiBfLl9jbGVhcigpO1xuICAgICAgICBfLl9mbHVzaGVyID0gbmV3IFRhc2tIYW5kbGVyKGNsZWFyKTtcbiAgICAgICAgXy5fYXV0b0ZsdXNoZXIgPSBuZXcgVGFza0hhbmRsZXIoY2xlYXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBtYXhpbXVtIGF0IHdoaWNoIHRyaW1taW5nIHNob3VsZCBhbGxvdy5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBtYXhTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4U2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBudW1iZXIgb2Ygb2JqZWN0cyBpbiBwb29sLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvdW50KCkge1xuICAgICAgICBjb25zdCBwID0gdGhpcy5fcG9vbDtcbiAgICAgICAgcmV0dXJuIHAgPyBwLmxlbmd0aCA6IDA7XG4gICAgfVxuICAgIF90cmltKCkge1xuICAgICAgICBjb25zdCBwb29sID0gdGhpcy5fcG9vbDtcbiAgICAgICAgd2hpbGUgKHBvb2wubGVuZ3RoID4gdGhpcy5fbWF4U2l6ZSkge1xuICAgICAgICAgICAgZGlzcG9zZS5zaW5nbGUocG9vbC5wb3AoKSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV2lsbCB0cmltIGVuc3VyZSB0aGUgcG9vbCBpcyBsZXNzIHRoYW4gdGhlIG1heFNpemUuXG4gICAgICogQHBhcmFtIGRlZmVyIEEgZGVsYXkgYmVmb3JlIHRyaW1taW5nLiAgV2lsbCBiZSBvdmVycmlkZGVuIGJ5IGxhdGVyIGNhbGxzLlxuICAgICAqL1xuICAgIHRyaW0oZGVmZXIpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhpcy5fdHJpbW1lci5zdGFydChkZWZlcik7XG4gICAgfVxuICAgIF9jbGVhcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHAgPSBfLl9wb29sO1xuICAgICAgICBfLl90cmltbWVyLmNhbmNlbCgpO1xuICAgICAgICBfLl9mbHVzaGVyLmNhbmNlbCgpO1xuICAgICAgICBfLl9hdXRvRmx1c2hlci5jYW5jZWwoKTtcbiAgICAgICAgZGlzcG9zZS50aGVzZS5ub0NvcHkocCwgdHJ1ZSk7XG4gICAgICAgIHAubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2lsbCBjbGVhciBvdXQgdGhlIHBvb2wuXG4gICAgICogQ2FuY2VscyBhbnkgc2NoZWR1bGVkIHRyaW1zIHdoZW4gZXhlY3V0ZWQuXG4gICAgICogQHBhcmFtIGRlZmVyIEEgZGVsYXkgYmVmb3JlIGNsZWFyaW5nLiAgV2lsbCBiZSBvdmVycmlkZGVuIGJ5IGxhdGVyIGNhbGxzLlxuICAgICAqL1xuICAgIGNsZWFyKGRlZmVyKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRoaXMuX2ZsdXNoZXIuc3RhcnQoZGVmZXIpO1xuICAgIH1cbiAgICB0b0FycmF5QW5kQ2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBfLl90cmltbWVyLmNhbmNlbCgpO1xuICAgICAgICBfLl9mbHVzaGVyLmNhbmNlbCgpO1xuICAgICAgICBjb25zdCBwID0gXy5fcG9vbDtcbiAgICAgICAgXy5fcG9vbCA9IFtdO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgZm9yIHRvQXJyYXlBbmRDbGVhcigpO1xuICAgICAqL1xuICAgIGR1bXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvQXJyYXlBbmRDbGVhcigpO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9nZW5lcmF0b3IgPSBudWxsO1xuICAgICAgICBfLl9yZWN5Y2xlciA9IG51bGw7XG4gICAgICAgIGRpc3Bvc2UoXy5fdHJpbW1lciwgXy5fZmx1c2hlciwgXy5fYXV0b0ZsdXNoZXIpO1xuICAgICAgICBfLl90cmltbWVyID0gbnVsbDtcbiAgICAgICAgXy5fZmx1c2hlciA9IG51bGw7XG4gICAgICAgIF8uX2F1dG9GbHVzaGVyID0gbnVsbDtcbiAgICAgICAgXy5fcG9vbC5sZW5ndGggPSAwO1xuICAgICAgICBfLl9wb29sID0gbnVsbDtcbiAgICB9XG4gICAgZXh0ZW5kQXV0b0NsZWFyKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgdCA9IF8uYXV0b0NsZWFyVGltZW91dDtcbiAgICAgICAgaWYgKGlzRmluaXRlKHQpICYmICFfLl9hdXRvRmx1c2hlci5pc1NjaGVkdWxlZClcbiAgICAgICAgICAgIF8uX2F1dG9GbHVzaGVyLnN0YXJ0KHQpO1xuICAgIH1cbiAgICBhZGQobykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKF8uX3Bvb2wubGVuZ3RoID49IF8uX2xvY2FsQWJzTWF4U2l6ZSkge1xuICAgICAgICAgICAgLy8gR2V0dGluZyB0b28gYmlnLCBkaXNwb3NlIGltbWVkaWF0ZWx5Li4uXG4gICAgICAgICAgICBkaXNwb3NlKG8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKF8uX3JlY3ljbGVyKVxuICAgICAgICAgICAgICAgIF8uX3JlY3ljbGVyKG8pO1xuICAgICAgICAgICAgXy5fcG9vbC5wdXNoKG8pO1xuICAgICAgICAgICAgY29uc3QgbSA9IF8uX21heFNpemU7XG4gICAgICAgICAgICBpZiAobSA8IEFCU09MVVRFX01BWF9TSVpFICYmIF8uX3Bvb2wubGVuZ3RoID4gbSlcbiAgICAgICAgICAgICAgICBfLl90cmltbWVyLnN0YXJ0KDUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5leHRlbmRBdXRvQ2xlYXIoKTtcbiAgICB9XG4gICAgX29uVGFrZW4oKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzLCBsZW4gPSBfLl9wb29sLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA8PSBfLl9tYXhTaXplKVxuICAgICAgICAgICAgXy5fdHJpbW1lci5jYW5jZWwoKTtcbiAgICAgICAgaWYgKGxlbilcbiAgICAgICAgICAgIF8uZXh0ZW5kQXV0b0NsZWFyKCk7XG4gICAgfVxuICAgIHRyeVRha2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIF8uX3Bvb2wucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl9vblRha2VuKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGFrZShmYWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIV8uX2dlbmVyYXRvciAmJiAhZmFjdG9yeSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbignZmFjdG9yeScsIFwiTXVzdCBwcm92aWRlIGEgZmFjdG9yeSBpZiBvbiB3YXMgbm90IHByb3ZpZGVkIGF0IGNvbnN0cnVjdGlvbiB0aW1lLlwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBfLl9wb29sLnBvcCgpIHx8IGZhY3RvcnkgJiYgZmFjdG9yeSgpIHx8IF8uX2dlbmVyYXRvcigpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fb25UYWtlbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0UG9vbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9iamVjdFBvb2wuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL09iamVjdFBvb2wuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgU3lzdGVtRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvU3lzdGVtRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSB8fCBcIlVuc3VwcG9ydGVkIGVudW1lcmFibGUuXCIpO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9VbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgU2ltcGxlRW51bWVyYWJsZUJhc2UgfSBmcm9tIFwiLi9TaW1wbGVFbnVtZXJhYmxlQmFzZVwiO1xuLyoqXG4gKiBBIHNpbXBsaWZpZWQgc3RyaXBwZWQgZG93biBlbnVtZXJhdG9yIHRoYXQgdW50aWwgZGlzcG9zZWQgd2lsbCBpbmZpbml0ZWx5IHJldHVybiB0aGUgcHJvdmlkZWQgZmFjdG9yeS5cbiAqIFRoaXMgaXMgYW5hbG9nb3VzIHRvIGEgJ2dlbmVyYXRvcicgYW5kIGhhcyBhIGNvbXBhdGlibGUgaW50ZXJmYWNlLlxuICovXG5leHBvcnQgY2xhc3MgSW5maW5pdGVFbnVtZXJhdG9yIGV4dGVuZHMgU2ltcGxlRW51bWVyYWJsZUJhc2Uge1xuICAgIC8qKlxuICAgICAqIFNlZSBJbmZpbml0ZVZhbHVlRmFjdG9yeVxuICAgICAqIEBwYXJhbSBfZmFjdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKF9mYWN0b3J5KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2ZhY3RvcnkgPSBfZmFjdG9yeTtcbiAgICB9XG4gICAgX2Nhbk1vdmVOZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmFjdG9yeSAhPSBudWxsO1xuICAgIH1cbiAgICBtb3ZlTmV4dCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGYgPSBfLl9mYWN0b3J5O1xuICAgICAgICBpZiAoZikge1xuICAgICAgICAgICAgXy5fY3VycmVudCA9IGYoXy5fY3VycmVudCwgXy5pbmNyZW1lbnRJbmRleCgpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9mYWN0b3J5ID0gbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJbmZpbml0ZUVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbmZpbml0ZUVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JbmZpbml0ZUVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgSXRlcmF0b3JSZXN1bHQgfSBmcm9tIFwiLi9JdGVyYXRvclJlc3VsdFwiO1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5leHBvcnQgY2xhc3MgU2ltcGxlRW51bWVyYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9XG4gICAgZ2V0IGNhbk1vdmVOZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FuTW92ZU5leHQoKTtcbiAgICB9XG4gICAgdHJ5TW92ZU5leHQob3V0KSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIG91dCh0aGlzLl9jdXJyZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaW5jcmVtZW50SW5kZXgoKSB7XG4gICAgICAgIGxldCBpID0gdGhpcy5faW5kZXg7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gaSA9IGlzTmFOKGkpID8gMCA6IChpICsgMSk7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgICBuZXh0VmFsdWUoKSB7XG4gICAgICAgIHRoaXMubW92ZU5leHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gICAgfVxuICAgIG5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVOZXh0KClcbiAgICAgICAgICAgID8gbmV3IEl0ZXJhdG9yUmVzdWx0KHRoaXMuX2N1cnJlbnQsIHRoaXMuX2luZGV4KVxuICAgICAgICAgICAgOiBJdGVyYXRvclJlc3VsdC5Eb25lO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAncmV0dXJuJyh2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBWT0lEMCAmJiB0aGlzLl9jYW5Nb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgPyBuZXcgSXRlcmF0b3JSZXN1bHQodmFsdWUsIFZPSUQwLCB0cnVlKVxuICAgICAgICAgICAgICAgIDogSXRlcmF0b3JSZXN1bHQuRG9uZTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gVk9JRDA7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gTmFOO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGdldElzRW5kbGVzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nhbk1vdmVOZXh0KCk7XG4gICAgfVxuICAgIGdldCBpc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldElzRW5kbGVzcygpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNpbXBsZUVudW1lcmFibGVCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2ltcGxlRW51bWVyYWJsZUJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9TaW1wbGVFbnVtZXJhYmxlQmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJdGVyYXRvclJlc3VsdCB9IGZyb20gXCIuL0l0ZXJhdG9yUmVzdWx0XCI7XG5pbXBvcnQgeyBGdW5jdGlvbnMgfSBmcm9tIFwiLi4vLi4vRnVuY3Rpb25zXCI7XG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbi8qKlxuICogQSBzaW1wbGlmaWVkIHN0cmlwcGVkIGRvd24gZW51bWVyYWJsZSB0aGF0IGlzIGFsd2F5cyBjb21wbGV0ZSBhbmQgaGFzIG5vIHJlc3VsdHMuXG4gKiBGcm96ZW4gYW5kIGV4cG9ydGVkIGFzICdlbXB0eScgdG8gYWxsb3cgZm9yIHJldXNlLlxuICovXG5leHBvcnQgY29uc3QgRW1wdHlFbnVtZXJhdG9yID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY3VycmVudDogVk9JRDAsXG4gICAgbW92ZU5leHQ6IEZ1bmN0aW9ucy5GYWxzZSxcbiAgICB0cnlNb3ZlTmV4dDogRnVuY3Rpb25zLkZhbHNlLFxuICAgIG5leHRWYWx1ZTogRnVuY3Rpb25zLkJsYW5rLFxuICAgIG5leHQ6IEl0ZXJhdG9yUmVzdWx0LkdldERvbmUsXG4gICAgXCJyZXR1cm5cIjogSXRlcmF0b3JSZXN1bHQuR2V0RG9uZSxcbiAgICBlbmQ6IEZ1bmN0aW9ucy5CbGFuayxcbiAgICByZXNldDogRnVuY3Rpb25zLkJsYW5rLFxuICAgIGRpc3Bvc2U6IEZ1bmN0aW9ucy5CbGFuayxcbiAgICBpc0VuZGxlc3M6IGZhbHNlXG59KTtcbmV4cG9ydCBkZWZhdWx0IEVtcHR5RW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVtcHR5RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VtcHR5RW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB9IGZyb20gXCIuL1NpbXBsZUVudW1lcmFibGVCYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbi8qKlxuICogQSBzaW1wbGlmaWVkIHN0cmlwcGVkIGRvd24gZW51bWVyYXRvciB0aGF0IHVudGlsIGRpc3Bvc2VkIHdpbGwgaW5maW5pdGVseSByZXR1cm4gdGhlIHByb3ZpZGVkIGZhY3RvcnkuXG4gKiBUaGlzIGlzIGFuYWxvZ291cyB0byBhICdnZW5lcmF0b3InIGFuZCBoYXMgYSBjb21wYXRpYmxlIGludGVyZmFjZS5cbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgSXRlcmF0b3JFbnVtZXJhdG9yIGV4dGVuZHMgU2ltcGxlRW51bWVyYWJsZUJhc2Uge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBfaXRlcmF0b3JcbiAgICAgKiBAcGFyYW0gX2lzRW5kbGVzcyB0cnVlIGFuZCBmYWxzZSBhcmUgZXhwbGljaXQgd2hlcmUgYXMgdW5kZWZpbmVkIG1lYW5zICd1bmtub3duJy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihfaXRlcmF0b3IsIF9pc0VuZGxlc3MpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faXRlcmF0b3IgPSBfaXRlcmF0b3I7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IF9pc0VuZGxlc3M7XG4gICAgfVxuICAgIF9jYW5Nb3ZlTmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZXJhdG9yICE9IG51bGw7XG4gICAgfVxuICAgIG1vdmVOZXh0KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpID0gXy5faXRlcmF0b3I7XG4gICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICBjb25zdCByID0gYXJndW1lbnRzLmxlbmd0aCA/IGkubmV4dCh2YWx1ZSkgOiBpLm5leHQoKTtcbiAgICAgICAgICAgIF8uX2N1cnJlbnQgPSByLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHIuZG9uZSlcbiAgICAgICAgICAgICAgICBfLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5faXRlcmF0b3IgPSBudWxsO1xuICAgIH1cbiAgICBnZXRJc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuX2lzRW5kbGVzcykgJiYgc3VwZXIuZ2V0SXNFbmRsZXNzKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgSXRlcmF0b3JFbnVtZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SXRlcmF0b3JFbnVtZXJhdG9yLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSXRlcmF0b3JFbnVtZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIOOCpOODs+OCv+ODvOODleOCp+OCpOOCuee1seWQiOOBq+OCiOOCi+OCs+OCouOCr+ODqeOCueOBruaLoeW8tVxyXG5kZWNsYXJlIGludGVyZmFjZSBTdHJpbmcge1xyXG4gIG5vcm1hbGl6ZU5ld0xpbmUoKTogc3RyaW5nO1xyXG59XHJcblxyXG5TdHJpbmcucHJvdG90eXBlLm5vcm1hbGl6ZU5ld0xpbmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXFxyP1xcbi9nLCAnXFxyXFxuJyk7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TdHJpbmdFeHRlbnNpb24udHMiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgKiBhcyBWYWx1ZXMgZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbi8qICB2YWxpZGF0ZVNpemU6IFV0aWxpdHkgZm9yIHF1aWNrIHZhbGlkYXRpb24vaW52YWxpZGF0aW9uIG9mIGFycmF5IGVxdWFsaXR5LlxuICAgIFdoeSB0aGlzIHdheT8gIFdoeSBub3QgcGFzcyBhIGNsb3N1cmUgZm9yIHRoZSBsYXN0IHJldHVybj9cbiAgICBSZWFzb246IFBlcmZvcm1hbmNlIGFuZCBhdm9pZGluZyB0aGUgY3JlYXRpb24gb2YgbmV3IGZ1bmN0aW9ucy9jbG9zdXJlcy4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlU2l6ZShhLCBiKSB7XG4gICAgLy8gQm90aCB2YWxpZCBhbmQgYXJlIHNhbWUgb2JqZWN0LCBvciBib3RoIGFyZSBudWxsL3VuZGVmaW5lZC5cbiAgICBpZiAoYSAmJiBiICYmIGEgPT09IGIgfHwgIWEgJiYgIWIpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vIEF0IHRoaXMgcG9pbnQsIGF0IGxlYXN0IG9uZSBoYXMgdG8gYmUgbm9uLW51bGwuXG4gICAgaWYgKCFhIHx8ICFiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgbGVuID0gYS5sZW5ndGg7XG4gICAgaWYgKGxlbiAhPT0gYi5sZW5ndGgpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAvLyBJZiBib3RoIGFyZSBhcnJheXMgYW5kIGhhdmUgemVybyBsZW5ndGgsIHRoZXkgYXJlIGVxdWFsLlxuICAgIGlmIChsZW4gPT09IDApXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vIFJldHVybiB0aGUgbGVuZ3RoIGZvciBkb3duc3RyZWFtIHByb2Nlc3NpbmcuXG4gICAgcmV0dXJuIGxlbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcmVBbGxFcXVhbChhcnJheXMsIHN0cmljdCA9IHRydWUsIGVxdWFsaXR5Q29tcGFyZXIgPSBWYWx1ZXMuYXJlRXF1YWwpIHtcbiAgICBpZiAoIWFycmF5cylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnROdWxsRXhjZXB0aW9uOiAnYXJyYXlzJyBjYW5ub3QgYmUgbnVsbC5cIik7XG4gICAgaWYgKGFycmF5cy5sZW5ndGggPCAyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY29tcGFyZSBhIHNldCBvZiBhcnJheXMgbGVzcyB0aGFuIDIuXCIpO1xuICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oc3RyaWN0KSkge1xuICAgICAgICBlcXVhbGl0eUNvbXBhcmVyID0gc3RyaWN0O1xuICAgICAgICBzdHJpY3QgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBmaXJzdCA9IGFycmF5c1swXTtcbiAgICBmb3IgKGxldCBpID0gMSwgbCA9IGFycmF5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKCFhcmVFcXVhbChmaXJzdCwgYXJyYXlzW2ldLCBzdHJpY3QsIGVxdWFsaXR5Q29tcGFyZXIpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcmVFcXVhbChhLCBiLCBzdHJpY3QgPSB0cnVlLCBlcXVhbGl0eUNvbXBhcmVyID0gVmFsdWVzLmFyZUVxdWFsKSB7XG4gICAgY29uc3QgbGVuID0gdmFsaWRhdGVTaXplKGEsIGIpO1xuICAgIGlmIChUeXBlLmlzQm9vbGVhbihsZW4pKVxuICAgICAgICByZXR1cm4gbGVuO1xuICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oc3RyaWN0KSkge1xuICAgICAgICBlcXVhbGl0eUNvbXBhcmVyID0gc3RyaWN0O1xuICAgICAgICBzdHJpY3QgPSB0cnVlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICghZXF1YWxpdHlDb21wYXJlcihhW2ldLCBiW2ldLCBzdHJpY3QpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGludGVybmFsU29ydChhLCBjb21wYXJlcikge1xuICAgIGlmICghYSB8fCBhLmxlbmd0aCA8IDIpXG4gICAgICAgIHJldHVybiBhO1xuICAgIGNvbnN0IGxlbiA9IGEubGVuZ3RoO1xuICAgIGxldCBiO1xuICAgIGlmIChsZW4gPiA2NTUzNilcbiAgICAgICAgYiA9IG5ldyBBcnJheShsZW4pO1xuICAgIGVsc2Uge1xuICAgICAgICBiID0gW107XG4gICAgICAgIGIubGVuZ3RoID0gbGVuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGJbaV0gPSBhW2ldO1xuICAgIH1cbiAgICBiLnNvcnQoY29tcGFyZXIpO1xuICAgIHJldHVybiBiO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFyZUVxdWl2YWxlbnQoYSwgYiwgY29tcGFyZXIgPSBWYWx1ZXMuY29tcGFyZSkge1xuICAgIGNvbnN0IGxlbiA9IHZhbGlkYXRlU2l6ZShhLCBiKTtcbiAgICBpZiAoVHlwZS5pc0Jvb2xlYW4obGVuKSlcbiAgICAgICAgcmV0dXJuIGxlbjtcbiAgICAvLyBUaGVyZSBtaWdodCBiZSBhIGJldHRlciBtb3JlIHBlcmZvcm1hbnQgd2F5IHRvIGRvIHRoaXMsIGJ1dCBmb3IgdGhlIG1vbWVudCwgdGhpc1xuICAgIC8vIHdvcmtzIHF1aXRlIHdlbGwuXG4gICAgYSA9IGludGVybmFsU29ydChhLCBjb21wYXJlcik7XG4gICAgYiA9IGludGVybmFsU29ydChiLCBjb21wYXJlcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoY29tcGFyZXIoYVtpXSwgYltpXSkgIT09IDApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tcGFyZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L0NvbXBhcmUuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmltcG9ydC1uYW1lXHJcbmltcG9ydCB7IFN0cmluZ05vZGUgfSBmcm9tICcuL1N0cmluZ05vZGUnO1xyXG5pbXBvcnQgJy4vU3RyaW5nRXh0ZW5zaW9uJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgU3RyaW5nTm9kZSxcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiaW1wb3J0IHsgTmFtZWROb2RlIH0gZnJvbSAnLi9OYW1lZE5vZGUnO1xyXG5leHBvcnQgY2xhc3MgU3RyaW5nTm9kZSBleHRlbmRzIE5hbWVkTm9kZTxTdHJpbmdOb2RlLCBzdHJpbmc+IHtcclxuXHJcbiAgcHVibGljIGdldCBWYWx1ZSgpOnN0cmluZyB7XHJcbiAgICByZXR1cm4gc3VwZXIuZ2V0VmFsdWUoKTtcclxuICB9XHJcbiAgcHVibGljIHNldCBWYWx1ZSh2YWx1ZTpzdHJpbmcpIHtcclxuICAgIHN1cGVyLnNldFZhbHVlKHZhbHVlKTtcclxuICB9XHJcbiAgXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKG5vZGU6IHN0cmluZykge1xyXG4gICAgc3VwZXIobm9kZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkRmlyc3QodmFsdWU6c3RyaW5nIHwgU3RyaW5nTm9kZSk6U3RyaW5nTm9kZSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuQWRkRmlyc3QobmV3IFN0cmluZ05vZGUodmFsdWUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5BZGRGaXJzdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkTGFzdCh2YWx1ZTpzdHJpbmcgfCBTdHJpbmdOb2RlKTpTdHJpbmdOb2RlIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5BZGRMYXN0KG5ldyBTdHJpbmdOb2RlKHZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuQWRkTGFzdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkTmV4dCh2YWx1ZTpzdHJpbmcgfCBTdHJpbmdOb2RlKTpTdHJpbmdOb2RlIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5BZGROZXh0KG5ldyBTdHJpbmdOb2RlKHZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuQWRkTmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkUHJldmlvdXModmFsdWU6c3RyaW5nIHwgU3RyaW5nTm9kZSk6U3RyaW5nTm9kZSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuQWRkUHJldmlvdXMobmV3IFN0cmluZ05vZGUodmFsdWUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5BZGRQcmV2aW91cyh2YWx1ZSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TdHJpbmdOb2RlLnRzIiwiLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmltcG9ydC1uYW1lXHJcbmltcG9ydCBFbnVtZXJhYmxlIGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9MaW5xJztcclxuaW1wb3J0IHsgSUxpbnFFbnVtZXJhYmxlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS5MaW5xL0VudW1lcmFibGUnO1xyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOYW1lZE5vZGU8VE5vZGUgZXh0ZW5kcyBOYW1lZE5vZGU8VE5vZGUsIFRWYWx1ZT4sIFRWYWx1ZT4gZXh0ZW5kcyBOb2RlPFROb2RlLCBUVmFsdWU+IHtcclxuXHJcbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG5vZGU/OlRWYWx1ZSkge1xyXG4gICAgaWYgKG5vZGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdXBlcihub2RlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbmFtZTpzdHJpbmc7XHJcbiAgcHVibGljIGdldCBOYW1lKCk6c3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgfVxyXG4gIHByb3RlY3RlZCBzZXQobmFtZTpzdHJpbmcpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgfVxyXG5cclxuICAvLyAjcmVnaW9uIFRyYXZlcnNhbFxyXG5cclxuICBwdWJsaWMgQ2hpbGQobmFtZTpzdHJpbmcpOlROb2RlIHtcclxuICAgIHJldHVybiBzdXBlci5DaGlsZHJlbigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKS5maXJzdCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9ycyhuYW1lT3JJbmNsdXNpdmVEZXB0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRGVwdGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5BbmNlc3RvcnMobmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkFuY2VzdG9ycyhpbmNsdXNpdmVEZXB0aCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWVPckluY2x1c2l2ZURlcHRoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTZWxmKG5hbWVPckluY2x1c2l2ZURlcHRoPzpzdHJpbmcgfCBudW1iZXIsIGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lT3JJbmNsdXNpdmVEZXB0aCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLkFuY2VzdG9yc0FuZFNlbGYobmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkFuY2VzdG9yc0FuZFNlbGYoaW5jbHVzaXZlRGVwdGgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQ2hpbGRyZW4obmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkNoaWxkcmVuKCkgXHJcbiAgICA6IHN1cGVyLkNoaWxkcmVuKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIE5leHRzRnJvbVNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLk5leHRzRnJvbVNlbGYoKVxyXG4gICAgOiBzdXBlci5OZXh0c0Zyb21TZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIE5leHRzRnJvbVNlbGZBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5OZXh0c0Zyb21TZWxmQW5kU2VsZigpXHJcbiAgICA6IHN1cGVyLiBOZXh0c0Zyb21TZWxmQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBOZXh0c0Zyb21MYXN0KG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5OZXh0c0Zyb21MYXN0KClcclxuICAgIDogc3VwZXIuTmV4dHNGcm9tTGFzdCgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBOZXh0c0Zyb21MYXN0QW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuTmV4dHNGcm9tTGFzdEFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci5OZXh0c0Zyb21MYXN0QW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBQcmV2c0Zyb21GaXJzdChuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuUHJldnNGcm9tRmlyc3QoKVxyXG4gICAgOiBzdXBlci5QcmV2c0Zyb21GaXJzdCgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBQcmV2c0Zyb21GaXJzdEFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLlByZXZzRnJvbUZpcnN0QW5kU2VsZigpXHJcbiAgICA6IHN1cGVyLlByZXZzRnJvbUZpcnN0QW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBQcmV2c0Zyb21TZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5QcmV2c0Zyb21TZWxmKClcclxuICAgIDogc3VwZXIuUHJldnNGcm9tU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBQcmV2c0Zyb21TZWxmQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuUHJldnNGcm9tU2VsZkFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci5QcmV2c0Zyb21TZWxmQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50cyhuYW1lT3JJbmNsdXNpdmVEZXB0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRGVwdGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5EZXNjZW5kYW50cyhuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuRGVzY2VuZGFudHMoaW5jbHVzaXZlRGVwdGgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNBbmRTZWxmKG5hbWVPckluY2x1c2l2ZURlcHRoPzpzdHJpbmcgfCBudW1iZXIsIGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lT3JJbmNsdXNpdmVEZXB0aCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLkRlc2NlbmRhbnRzQW5kU2VsZihuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuRGVzY2VuZGFudHNBbmRTZWxmKGluY2x1c2l2ZURlcHRoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFNpYmxpbmdzKG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGg/OnN0cmluZyB8IG51bWJlciwgaW5jbHVzaXZlRWFjaExlbmd0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLlNpYmxpbmdzKG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLlNpYmxpbmdzKGluY2x1c2l2ZUVhY2hMZW5ndGgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBTaWJsaW5nc0FuZFNlbGYobmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVFYWNoTGVuZ3RoPzpudW1iZXIpXHJcbiAgICA6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5TaWJsaW5nc0FuZFNlbGYobmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuU2libGluZ3NBbmRTZWxmKGluY2x1c2l2ZUVhY2hMZW5ndGgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGYoKVxyXG4gICAgOiBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZkFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmQW5kU2VsZigpXHJcbiAgICA6IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZigpXHJcbiAgICA6IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGZBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGZBbmRTZWxmKClcclxuICAgIDogc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcbiAgXHJcbiAgcHVibGljIEFuY2VzdG9yc1dpdGhTaW5nbGVDaGlsZChuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkKClcclxuICAgIDogc3VwZXIuQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc1dpdGhTaW5nbGVDaGlsZEFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkFuY2VzdG9yc1dpdGhTaW5nbGVDaGlsZEFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci5BbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGRBbmRTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzT2ZTaW5nbGUobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkRlc2NlbmRhbnRzT2ZTaW5nbGUoKVxyXG4gICAgOiBzdXBlci5EZXNjZW5kYW50c09mU2luZ2xlKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzT2ZTaW5nbGVBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5EZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZigpXHJcbiAgICA6IHN1cGVyLkRlc2NlbmRhbnRzT2ZTaW5nbGVBbmRTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzT2ZGaXJzdENoaWxkKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5EZXNjZW5kYW50c09mRmlyc3RDaGlsZCgpXHJcbiAgICA6IHN1cGVyLkRlc2NlbmRhbnRzT2ZGaXJzdENoaWxkKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzT2ZGaXJzdENoaWxkQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGRBbmRTZWxmKClcclxuICAgIDogc3VwZXIuRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGRBbmRTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvTmFtZWROb2RlLnRzIiwiLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmltcG9ydC1uYW1lXHJcbmltcG9ydCBFbnVtZXJhYmxlIGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9MaW5xJztcclxuaW1wb3J0IHsgSUxpbnFFbnVtZXJhYmxlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS5MaW5xL0VudW1lcmFibGUnO1xyXG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yJztcclxuaW1wb3J0IHsgU3RyaW5nQnVpbGRlciB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vVGV4dC9TdHJpbmdCdWlsZGVyJztcclxuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi8vU3lzdGVtL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbic7XHJcbmltcG9ydCAnLi9TdHJpbmdFeHRlbnNpb24nO1xyXG5leHBvcnQgY2xhc3MgTm9kZTxUTm9kZSBleHRlbmRzIE5vZGU8VE5vZGUsIFRWYWx1ZT4sIFRWYWx1ZT4ge1xyXG4gIFxyXG4gIC8vLyBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgTm9kZSBjbGFzcyB3aXRoIGEgZGVmYXVsdCB2YWx1ZS5cclxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IodmFsdWU/OiBUVmFsdWUpIHtcclxuICAgIHRoaXMuZmlyc3RDaGlsZCA9IG51bGw7XHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICB0aGlzLmN5Y2xpY1ByZXYgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgdGhpcy5jeWNsaWNOZXh0ID0gdGhpcy5UaGlzTm9kZTtcclxuICAgIHRoaXMuVmFsdWUgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZmlyc3RDaGlsZDpUTm9kZTtcclxuICBwcml2YXRlIF9wYXJlbnQ6VE5vZGU7XHJcbiAgcHJpdmF0ZSBfY3ljbGljUHJldjpUTm9kZTtcclxuICBwcml2YXRlIF9jeWNsaWNOZXh0OlROb2RlO1xyXG4gIHByaXZhdGUgX3ZhbHVlOlRWYWx1ZTtcclxuXHJcbiAgcHJpdmF0ZSBnZXQgVGhpc05vZGUoKTogVE5vZGUge1xyXG4gICAgcmV0dXJuIDxUTm9kZT48YW55PnRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IEZpcnN0U2libGluZygpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLlBhcmVudCAhPSBudWxsID8gdGhpcy5QYXJlbnQuRmlyc3RDaGlsZCA6IHRoaXMuVGhpc05vZGU7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBnZXQgTGFzdFNpYmxpbmcoKTogVE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuUGFyZW50ICE9IG51bGwgPyB0aGlzLlBhcmVudC5GaXJzdENoaWxkLkN5Y2xpY1ByZXYgOiB0aGlzLlRoaXNOb2RlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBGaXJzdENoaWxkKCk6VE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0Q2hpbGQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgc2V0IGZpcnN0Q2hpbGQoZmlyc3RDaGlsZDpUTm9kZSkge1xyXG4gICAgdGhpcy5fZmlyc3RDaGlsZCA9IGZpcnN0Q2hpbGQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IExhc3RDaGlsZCgpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLkZpcnN0Q2hpbGQgIT0gbnVsbCA/IHRoaXMuRmlyc3RDaGlsZC5DeWNsaWNQcmV2IDogbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgUGFyZW50KCk6VE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBzZXQgcGFyZW50KHBhcmVudDpUTm9kZSkge1xyXG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBDeWNsaWNQcmV2KCk6VE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N5Y2xpY1ByZXY7XHJcbiAgfVxyXG4gIHByaXZhdGUgc2V0IGN5Y2xpY1ByZXYoY3ljbGljUHJldjpUTm9kZSkge1xyXG4gICAgdGhpcy5fY3ljbGljUHJldiA9IGN5Y2xpY1ByZXY7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IEN5Y2xpY05leHQoKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3ljbGljTmV4dDtcclxuICB9XHJcbiAgcHJpdmF0ZSBzZXQgY3ljbGljTmV4dChjeWNsaWNOZXh0OlROb2RlKSB7XHJcbiAgICB0aGlzLl9jeWNsaWNOZXh0ID0gY3ljbGljTmV4dDtcclxuICB9XHJcbiAgcHVibGljIGdldCBQcmV2KCk6VE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuQ3ljbGljUHJldiAhPT0gdGhpcy5MYXN0U2libGluZyA/IHRoaXMuQ3ljbGljUHJldiA6IG51bGw7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgTmV4dCgpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLkN5Y2xpY05leHQgIT09IHRoaXMuRmlyc3RTaWJsaW5nID8gdGhpcy5DeWNsaWNOZXh0IDogbnVsbDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRWYWx1ZSgpOlRWYWx1ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgfVxyXG4gIHByb3RlY3RlZCBzZXRWYWx1ZSh2YWx1ZTogVFZhbHVlKSB7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gIH1cclxuICBwcm90ZWN0ZWQgZ2V0IFZhbHVlKCk6VFZhbHVlIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICB9XHJcbiAgcHJvdGVjdGVkIHNldCBWYWx1ZSh2YWx1ZTogVFZhbHVlKSB7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBDaGlsZHJlbkNvdW50KCk6bnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLkNoaWxkcmVuKCkuY291bnQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgTGVuZ3RoRnJvbURlZXBlc3RDaGlsZCgpOm51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5HZXRMZW5ndGhGcm9tRGVlcGVzdENoaWxkKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBHZXRMZW5ndGhGcm9tRGVlcGVzdENoaWxkKCk6bnVtYmVyIHtcclxuICAgIGxldCBtYXhMZW5ndGggPSAwO1xyXG4gICAgdGhpcy5DaGlsZHJlbigpLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICBjb25zdCBsZW5ndGggPSBjaGlsZC5HZXRMZW5ndGhGcm9tRGVlcGVzdENoaWxkKCkgKyAxO1xyXG4gICAgICBpZiAobWF4TGVuZ3RoIDwgbGVuZ3RoKSB7XHJcbiAgICAgICAgbWF4TGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXhMZW5ndGg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQ2hpbGRBdE9yTnVsbChpbmRleDpudW1iZXIpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLkNoaWxkcmVuKCkuZWxlbWVudEF0T3JEZWZhdWx0KGluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnMoaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gaW5jbHVzaXZlRGVwdGggPT09IHVuZGVmaW5lZCBcclxuICAgID8gdGhpcy5BbmNlc3RvcnNBbmRTZWxmKCkuc2tpcCgxKSBcclxuICAgIDogdGhpcy5BbmNlc3RvcnMoKS50YWtlKGluY2x1c2l2ZURlcHRoKTtcclxuICB9XHJcbiAgXHJcbiAgcHVibGljIEFuY2VzdG9yc0FuZFNlbGYoaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAoaW5jbHVzaXZlRGVwdGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5BbmNlc3RvcnNBbmRTZWxmKCkudGFrZShpbmNsdXNpdmVEZXB0aCArIDEpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLlRoaXNOb2RlO1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XHJcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT0gbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQ2hpbGRyZW4oKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5GaXJzdENoaWxkO1xyXG4gICAgICBpZiAobm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IHRlcm1pbmFsID0gbm9kZTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljTmV4dDtcclxuICAgICAgICB9IHdoaWxlIChub2RlICE9PSB0ZXJtaW5hbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG5cclxuICBwdWJsaWMgUmV2ZXJzZUNoaWxkcmVuKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuTGFzdENoaWxkO1xyXG4gICAgICBpZiAobm9kZSA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHRlcm1pbmFsID0gbm9kZTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljUHJldjtcclxuICAgICAgfSB3aGlsZSAobm9kZSAhPT0gdGVybWluYWwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIE5leHRzRnJvbVNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IxKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuQ3ljbGljTmV4dDtcclxuICAgICAgY29uc3QgdGVybWluYWwgPSBfdGhpcy5GaXJzdFNpYmxpbmc7XHJcbiAgICAgIHdoaWxlIChub2RlICE9PSB0ZXJtaW5hbCkge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljTmV4dDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IxKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBOZXh0c0Zyb21TZWxmQW5kU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpLmNvbmNhdCh0aGlzLk5leHRzRnJvbVNlbGYoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tTGFzdCgpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLkxhc3RTaWJsaW5nO1xyXG4gICAgICBjb25zdCB0ZXJtaW5hbCA9IF90aGlzLlRoaXNOb2RlO1xyXG4gICAgICB3aGlsZSAobm9kZSAhPT0gdGVybWluYWwpIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY1ByZXY7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBOZXh0c0Zyb21MYXN0QW5kU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuTmV4dHNGcm9tTGFzdCgpLmNvbmNhdChFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tRmlyc3QoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5GaXJzdFNpYmxpbmc7XHJcbiAgICAgIGNvbnN0IHRlcm1pbmFsID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIHdoaWxlIChub2RlICE9PSB0ZXJtaW5hbCkge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljTmV4dDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFByZXZzRnJvbUZpcnN0QW5kU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuUHJldnNGcm9tRmlyc3QoKS5jb25jYXQoRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFByZXZzRnJvbVNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5DeWNsaWNQcmV2O1xyXG4gICAgICBjb25zdCB0ZXJtaW5hbCA9IF90aGlzLkxhc3RTaWJsaW5nO1xyXG4gICAgICB3aGlsZSAobm9kZSAhPT0gdGVybWluYWwpIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY1ByZXY7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBQcmV2c0Zyb21TZWxmQW5kU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpLmNvbmNhdCh0aGlzLlByZXZzRnJvbVNlbGYoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHMoaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGlmIChpbmNsdXNpdmVEZXB0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgICBsZXQgY3Vyc29yID0gc3RhcnQ7XHJcbiAgICAgICAgaWYgKGN1cnNvci5GaXJzdENoaWxkICE9IG51bGwpIHtcclxuICAgICAgICAgIGN1cnNvciA9IGN1cnNvci5GaXJzdENoaWxkO1xyXG4gICAgICAgICAgeWllbGQgY3Vyc29yO1xyXG4gICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgd2hpbGUgKGN1cnNvci5GaXJzdENoaWxkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuRmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgICB5aWVsZCBjdXJzb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKGN1cnNvci5OZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuUGFyZW50O1xyXG4gICAgICAgICAgICAgIGlmIChjdXJzb3IgPT09IHN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnNvciA9IGN1cnNvci5DeWNsaWNOZXh0O1xyXG4gICAgICAgICAgICB5aWVsZCBjdXJzb3I7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSAgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgICBsZXQgY3Vyc29yID0gc3RhcnQ7XHJcbiAgICAgICAgaWYgKGN1cnNvci5GaXJzdENoaWxkICE9IG51bGwgJiYgaW5jbHVzaXZlRGVwdGggPiAwKSB7XHJcbiAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuRmlyc3RDaGlsZDtcclxuICAgICAgICAgIGluY2x1c2l2ZURlcHRoLS07XHJcbiAgICAgICAgICB5aWVsZCBjdXJzb3I7XHJcbiAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICB3aGlsZSAoY3Vyc29yLkZpcnN0Q2hpbGQgIT0gbnVsbCAmJiBpbmNsdXNpdmVEZXB0aCA+IDApIHtcclxuICAgICAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuRmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgICBpbmNsdXNpdmVEZXB0aC0tO1xyXG4gICAgICAgICAgICAgIHlpZWxkIGN1cnNvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAoY3Vyc29yLk5leHQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIGN1cnNvciA9IGN1cnNvci5QYXJlbnQ7XHJcbiAgICAgICAgICAgICAgaW5jbHVzaXZlRGVwdGgrKztcclxuICAgICAgICAgICAgICBpZiAoY3Vyc29yID09PSBzdGFydCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuQ3ljbGljTmV4dDtcclxuICAgICAgICAgICAgeWllbGQgY3Vyc29yO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzQW5kU2VsZihpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBpbmNsdXNpdmVEZXB0aCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkuY29uY2F0KHRoaXMuRGVzY2VuZGFudHMoKSlcclxuICAgICAgOiBFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKS5jb25jYXQodGhpcy5EZXNjZW5kYW50cyhpbmNsdXNpdmVEZXB0aCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFNpYmxpbmdzKGluY2x1c2l2ZUVhY2hMZW5ndGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAoaW5jbHVzaXZlRWFjaExlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLlByZXZzRnJvbVNlbGYoKS50YWtlKGluY2x1c2l2ZUVhY2hMZW5ndGgpLnJldmVyc2UoKVxyXG4gICAgICAuY29uY2F0KHRoaXMuTmV4dHNGcm9tU2VsZigpLnRha2UoaW5jbHVzaXZlRWFjaExlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBjb25zdCBmaXJzdCA9IF90aGlzLkZpcnN0U2libGluZztcclxuICAgICAgbGV0IG5vZGUgPSBmaXJzdDtcclxuICAgICAgd2hpbGUgKG5vZGUgIT09IDxUTm9kZT48YW55Pl90aGlzKSB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNOZXh0O1xyXG4gICAgICB9XHJcbiAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgIHdoaWxlIChub2RlICE9PSBmaXJzdCkge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljTmV4dDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFNpYmxpbmdzQW5kU2VsZihpbmNsdXNpdmVFYWNoTGVuZ3RoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKGluY2x1c2l2ZUVhY2hMZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5QcmV2c0Zyb21TZWxmKCkudGFrZShpbmNsdXNpdmVFYWNoTGVuZ3RoKS5yZXZlcnNlKClcclxuICAgICAgICAgICAgICAgIC5jb25jYXQoRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KHRoaXMuTmV4dHNGcm9tU2VsZigpLnRha2UoaW5jbHVzaXZlRWFjaExlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBjb25zdCBmaXJzdCA9IF90aGlzLkZpcnN0U2libGluZztcclxuICAgICAgbGV0IG5vZGUgPSBmaXJzdDtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljTmV4dDtcclxuICAgICAgfSB3aGlsZSAobm9kZSAhPT0gZmlyc3QpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICBjb25zdCBlID0gbm9kZS5OZXh0c0Zyb21TZWxmKCkuZ2V0RW51bWVyYXRvcigpO1xyXG4gICAgICAgIHdoaWxlKGUubW92ZU5leHQoKSkge1xyXG4gICAgICAgICAgeWllbGQgZS5jdXJyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XHJcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT0gbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZkFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKS5jb25jYXQodGhpcy5BbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZigpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLkFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYoKS5za2lwKDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIGNvbnN0IGUgPSBub2RlLlByZXZzRnJvbVNlbGZBbmRTZWxmKCkuZ2V0RW51bWVyYXRvcigpO1xyXG4gICAgICAgIHdoaWxlKGUubW92ZU5leHQoKSkge1xyXG4gICAgICAgICAgeWllbGQgZS5jdXJyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XHJcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT0gbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JXaXRoU2luZ2xlQ2hpbGQoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgd2hpbGUgKG5vZGUgPT09IG5vZGUuQ3ljbGljTmV4dCkge1xyXG4gICAgICAgIGNvbnN0IGxhc3ROb2RlID0gbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XHJcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGxhc3ROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGQoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgd2hpbGUgKG5vZGUgPT09IG5vZGUuQ3ljbGljTmV4dCkge1xyXG4gICAgICAgIG5vZGUgPSBub2RlLlBhcmVudDtcclxuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc1dpdGhTaW5nbGVDaGlsZEFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgd2hpbGUgKG5vZGUgPT09IG5vZGUuQ3ljbGljTmV4dCkge1xyXG4gICAgICAgIG5vZGUgPSBub2RlLlBhcmVudDtcclxuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzT2ZTaW5nbGUoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLkRlc2NlbmRhbnRzT2ZTaW5nbGVBbmRTZWxmKCkuc2tpcCgxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLlRoaXNOb2RlO1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5GaXJzdENoaWxkO1xyXG4gICAgICB9IHdoaWxlIChub2RlICE9IG51bGwgJiYgbm9kZSA9PT0gbm9kZS5DeWNsaWNOZXh0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mRmlyc3RDaGlsZCgpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGRBbmRTZWxmKCkuc2tpcCgxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mRmlyc3RDaGlsZEFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuRmlyc3RDaGlsZDtcclxuICAgICAgfSB3aGlsZSAobm9kZSAhPSBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBZGRQcmV2aW91cyhub2RlOlROb2RlKTpUTm9kZSB7XHJcbiAgICBjb25zb2xlLmFzc2VydChub2RlICE9IG51bGwpO1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZS5QYXJlbnQgPT0gbnVsbCk7XHJcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLlBhcmVudCAhPSBudWxsKTtcclxuICAgIGlmICh0aGlzLlBhcmVudC5GaXJzdENoaWxkID09PSA8VE5vZGU+PGFueT50aGlzKSB7XHJcbiAgICAgIHRoaXMuUGFyZW50LmZpcnN0Q2hpbGQgPSBub2RlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuQWRkUHJldmlvdXNJZ25vcmluZ0ZpcnN0Q2hpbGQobm9kZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkTmV4dChub2RlOlROb2RlKTpUTm9kZSB7XHJcbiAgICBjb25zb2xlLmFzc2VydChub2RlICE9IG51bGwpO1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZS5QYXJlbnQgPT0gbnVsbCk7XHJcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLlBhcmVudCAhPSBudWxsKTtcclxuICAgIHJldHVybiB0aGlzLkN5Y2xpY05leHQuQWRkUHJldmlvdXNJZ25vcmluZ0ZpcnN0Q2hpbGQobm9kZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkRmlyc3Qobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZSAhPSBudWxsKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUuUGFyZW50ID09IG51bGwpO1xyXG4gICAgcmV0dXJuIHRoaXMuQWRkRmlyc3RQcml2YXRlKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBBZGRGaXJzdFByaXZhdGUobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgdGhpcy5BZGRMYXN0UHJpdmF0ZShub2RlKTtcclxuICAgIHRoaXMuZmlyc3RDaGlsZCA9IG5vZGU7XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgQWRkUHJldmlvdXNJZ25vcmluZ0ZpcnN0Q2hpbGQobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgbm9kZS5wYXJlbnQgPSB0aGlzLlBhcmVudDtcclxuICAgIG5vZGUuY3ljbGljTmV4dCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICBub2RlLmN5Y2xpY1ByZXYgPSB0aGlzLkN5Y2xpY1ByZXY7XHJcbiAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IG5vZGU7XHJcbiAgICB0aGlzLmN5Y2xpY1ByZXYgPSBub2RlO1xyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkTGFzdChub2RlOlROb2RlKTpUTm9kZSB7XHJcbiAgICBjb25zb2xlLmFzc2VydChub2RlICE9IG51bGwpO1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZS5QYXJlbnQgPT0gbnVsbCk7XHJcbiAgICByZXR1cm4gdGhpcy5BZGRMYXN0UHJpdmF0ZShub2RlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgQWRkTGFzdFByaXZhdGUobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgY29uc3Qgc2Vjb25kID0gdGhpcy5GaXJzdENoaWxkO1xyXG4gICAgaWYgKHNlY29uZCA9PSBudWxsKSB7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5UaGlzTm9kZTtcclxuICAgICAgbm9kZS5jeWNsaWNOZXh0ID0gbm9kZTtcclxuICAgICAgbm9kZS5jeWNsaWNQcmV2ID0gbm9kZTtcclxuICAgICAgdGhpcy5maXJzdENoaWxkID0gbm9kZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNlY29uZC5BZGRQcmV2aW91c0lnbm9yaW5nRmlyc3RDaGlsZChub2RlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFJlcGxhY2UobmV3Tm9kZTpUTm9kZSk6dm9pZCB7XHJcbiAgICBpZiAodGhpcy5QYXJlbnQgPT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbignQSByb290IG5vZGUgY2Fubm90IGJlIHJlcGxhY2VkLicpO1xyXG4gICAgfVxyXG4gICAgbmV3Tm9kZS5wYXJlbnQgPSB0aGlzLlBhcmVudDtcclxuICAgIG5ld05vZGUuY3ljbGljTmV4dCA9IHRoaXMuQ3ljbGljTmV4dDtcclxuICAgIG5ld05vZGUuY3ljbGljUHJldiA9IHRoaXMuQ3ljbGljUHJldjtcclxuICAgIHRoaXMuQ3ljbGljUHJldi5jeWNsaWNOZXh0ID0gbmV3Tm9kZTsgLy8gcHJldi5uZXh0ID0gbmV3Tm9kZVxyXG4gICAgdGhpcy5DeWNsaWNOZXh0LmN5Y2xpY1ByZXYgPSBuZXdOb2RlO1xyXG4gICAgbmV3Tm9kZS5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSBuZXdOb2RlO1xyXG4gICAgaWYgKHRoaXMuUGFyZW50LkZpcnN0Q2hpbGQgPT09IDxUTm9kZT48YW55PnRoaXMpIHtcclxuICAgICAgdGhpcy5QYXJlbnQuZmlyc3RDaGlsZCA9IG5ld05vZGU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmN5Y2xpY05leHQgPSBudWxsO1xyXG4gICAgdGhpcy5jeWNsaWNQcmV2ID0gbnVsbDtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBSZW1vdmUoKTp2b2lkIHtcclxuICAgIGlmICh0aGlzLlBhcmVudCA9PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKCdBIHJvb3Qgbm9kZSBjYW5ub3QgYmUgcmVtb3ZlZC4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG5leHQgPSB0aGlzLkN5Y2xpY05leHQ7XHJcbiAgICBpZiAobmV4dCAhPT0gPFROb2RlPjxhbnk+dGhpcykge1xyXG4gICAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IG5leHQ7XHJcbiAgICAgIG5leHQuY3ljbGljUHJldiA9IHRoaXMuQ3ljbGljUHJldjtcclxuICAgICAgaWYgKHRoaXMuUGFyZW50LkZpcnN0Q2hpbGQgPT09IDxUTm9kZT48YW55PnRoaXMpIHtcclxuICAgICAgICB0aGlzLlBhcmVudC5maXJzdENoaWxkID0gbmV4dDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5QYXJlbnQuZmlyc3RDaGlsZCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0aGlzLmN5Y2xpY05leHQgPSBudWxsO1xyXG4gICAgdGhpcy5jeWNsaWNQcmV2ID0gbnVsbDtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBSZW1vdmVSZWNvdmVyYWJseSgpIHtcclxuICAgIGlmICh0aGlzLlBhcmVudCA9PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKCdBIHJvb3Qgbm9kZSBjYW5ub3QgYmUgcmVtb3ZlZC4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG5leHQgPSB0aGlzLkN5Y2xpY05leHQ7XHJcbiAgICBpZiAobmV4dCAhPT0gPFROb2RlPjxhbnk+dGhpcykge1xyXG4gICAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IG5leHQ7XHJcbiAgICAgIG5leHQuY3ljbGljUHJldiA9IHRoaXMuQ3ljbGljUHJldjtcclxuICAgICAgaWYgKHRoaXMuUGFyZW50LkZpcnN0Q2hpbGQgPT09IDxUTm9kZT48YW55PnRoaXMpIHtcclxuICAgICAgICB0aGlzLlBhcmVudC5maXJzdENoaWxkID0gbmV4dDtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgbmV4dC5QYXJlbnQuZmlyc3RDaGlsZCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICAgICAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICAgICAgICBuZXh0LmN5Y2xpY1ByZXYgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICAgICAgbmV4dC5jeWNsaWNQcmV2ID0gdGhpcy5UaGlzTm9kZTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuUGFyZW50O1xyXG4gICAgcGFyZW50LmZpcnN0Q2hpbGQgPSBudWxsO1xyXG4gICAgcmV0dXJuICgpID0+IHsgcGFyZW50LmZpcnN0Q2hpbGQgPSB0aGlzLlRoaXNOb2RlOyB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvU3RyaW5nKCk6c3RyaW5nIHtcclxuICAgIGNvbnN0IGJ1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgdGhpcy5Ub1N0cmluZ1ByaXZhdGUodGhpcy5UaGlzTm9kZSwgMCwgYnVpbGRlcik7XHJcbiAgICByZXR1cm4gYnVpbGRlci50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBUb1N0cmluZ1ByaXZhdGUobm9kZTpUTm9kZSxkZXB0aDpudW1iZXIsIGJ1aWxkZXI6U3RyaW5nQnVpbGRlcik6dm9pZCAge1xyXG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlcHRoOyBpKyspIHtcclxuICAgICAgYnVpbGRlci5hcHBlbmQoJyAgJyk7XHJcbiAgICB9XHJcbiAgICBidWlsZGVyLmFwcGVuZExpbmUoIW5vZGUuVmFsdWUgIT0gbnVsbCA/IG5vZGUuVmFsdWUudG9TdHJpbmcoKSA6ICcnKTtcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5DaGlsZHJlbigpO1xyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgIHRoaXMuVG9TdHJpbmdQcml2YXRlKGNoaWxkLCBkZXB0aCArIDEsIGJ1aWxkZXIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Ob2RlLnRzIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBPcmlnaW5hbDogaHR0cDovL2xpbnFqcy5jb2RlcGxleC5jb20vXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgYXJlRXF1YWwgYXMgYXJlRXF1YWxWYWx1ZXMsIGNvbXBhcmUgYXMgY29tcGFyZVZhbHVlcyB9IGZyb20gXCIuLi9TeXN0ZW0vQ29tcGFyZVwiO1xuaW1wb3J0IHsgY29weSB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvY29weVwiO1xuaW1wb3J0ICogYXMgQXJyYXlzIGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvQ29tcGFyZVwiO1xuaW1wb3J0ICogYXMgZW51bVV0aWwgZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBpc0VudW1lcmFibGUsIGlzRW51bWVyYXRvciwgaXNJdGVyYXRvciwgdGhyb3dJZkVuZGxlc3MgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3JcIjtcbmltcG9ydCB7IEVtcHR5RW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW1wdHlFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uL1N5c3RlbS9UeXBlc1wiO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuLi9TeXN0ZW0vSW50ZWdlclwiO1xuaW1wb3J0IHsgRnVuY3Rpb25zIGFzIEJhc2VGdW5jdGlvbnMgfSBmcm9tIFwiLi4vU3lzdGVtL0Z1bmN0aW9uc1wiO1xuaW1wb3J0IHsgQXJyYXlFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9BcnJheUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yQmFzZVwiO1xuaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRGljdGlvbmFyaWVzL0RpY3Rpb25hcnlcIjtcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9RdWV1ZVwiO1xuaW1wb3J0IHsgZGlzcG9zZSwgdXNpbmcgfSBmcm9tIFwiLi4vU3lzdGVtL0Rpc3Bvc2FibGUvZGlzcG9zZVwiO1xuaW1wb3J0IHsgRGlzcG9zYWJsZUJhc2UgfSBmcm9tIFwiLi4vU3lzdGVtL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2VcIjtcbmltcG9ydCB7IFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9TeXN0ZW0vRGlzcG9zYWJsZS9PYmplY3REaXNwb3NlZEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgS2V5U29ydGVkQ29udGV4dCB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvU29ydGluZy9LZXlTb3J0ZWRDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vU3lzdGVtL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi4vU3lzdGVtL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBJbmRleEVudW1lcmF0b3IgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0luZGV4RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgSXRlcmF0b3JFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JdGVyYXRvckVudW1lcmF0b3JcIjtcbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L2luaXRpYWxpemVcIjtcbmltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCIuLi9TeXN0ZW0vUmFuZG9tXCI7XG5pbXBvcnQgeyBJbmZpbml0ZUVudW1lcmF0b3IgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0luZmluaXRlRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgTGF6eUxpc3QgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0xhenlMaXN0XCI7XG52YXIgZGlzcG9zZVNpbmdsZSA9IGRpc3Bvc2Uuc2luZ2xlO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4vLyAjcmVnaW9uIExvY2FsIENvbnN0YW50cy5cbmNvbnN0IElOVkFMSURfREVGQVVMVCA9IHt9OyAvLyBjcmVhdGUgYSBwcml2YXRlIHVuaXF1ZSBpbnN0YW5jZSBmb3IgcmVmZXJlbmNpbmcuXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmNvbnN0IE5VTEwgPSBudWxsO1xuZnVuY3Rpb24gQlJFQUsoKSB7XG4gICAgcmV0dXJuIDAgLyogQnJlYWsgKi87XG59XG5mdW5jdGlvbiBSRVRVUk4oKSB7XG4gICAgcmV0dXJuIDEgLyogUmV0dXJuICovO1xufVxuZnVuY3Rpb24gaXNOb3ROdWxsT3JVbmRlZmluZWQoZSkge1xuICAgIHJldHVybiBlICE9IG51bGw7XG59XG4vLyBMZWF2ZSBpbnRlcm5hbCB0byBhdm9pZCBhY2NpZGVudGFsIG92ZXJ3cml0aW5nLlxuY2xhc3MgTGlucUZ1bmN0aW9ucyBleHRlbmRzIEJhc2VGdW5jdGlvbnMge1xuICAgIC8vIG5vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgR3JlYXRlcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhID4gYiA/IGEgOiBiO1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIExlc3NlcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIDwgYiA/IGEgOiBiO1xuICAgIH1cbn1cbmNvbnN0IEZ1bmN0aW9ucyA9IE9iamVjdC5mcmVlemUobmV3IExpbnFGdW5jdGlvbnMoKSk7XG4vLyBGb3IgcmUtdXNlIGFzIGEgZmFjdG9yeS5cbmZ1bmN0aW9uIGdldEVtcHR5RW51bWVyYXRvcigpIHtcbiAgICByZXR1cm4gRW1wdHlFbnVtZXJhdG9yO1xufVxuLy8gI2VuZHJlZ2lvblxuLypcbiAqIE5PVEU6IEFib3V0IEluZmluaXRlRW51bWVyYWJsZTxUPiBhbmQgRW51bWVyYWJsZTxUPi5cbiAqIFRoZXJlIG1heSBzZWVtIGxpa2UgdGhlcmUncyBleHRyYSBvdmVycmlkZXMgaGVyZSBhbmQgdGhleSBtYXkgc2VlbSB1bm5lY2Vzc2FyeS5cbiAqIEJ1dCBhZnRlciBjbG9zZXIgaW5zcGVjdGlvbiB5b3UnbGwgc2VlIHRoZSB0eXBlIGNoYWluIGlzIHJldGFpbmVkIGFuZFxuICogaW5maW5pdGUgZW51bWVyYWJsZXMgYXJlIHByZXZlbnRlZCBmcm9tIGhhdmluZyBmZWF0dXJlcyB0aGF0IGZpbml0ZSBvbmVzIGhhdmUuXG4gKlxuICogSSdtIG5vdCBzdXJlIGlmIGl0J3MgdGhlIGJlc3Qgb3B0aW9uIHRvIGp1c3QgdXNlIG92ZXJyaWRlcywgYnV0IGl0IGhvbm9ycyB0aGUgdHlwaW5nIHByb3Blcmx5LlxuICovXG5leHBvcnQgY2xhc3MgSW5maW5pdGVMaW5xRW51bWVyYWJsZSBleHRlbmRzIERpc3Bvc2FibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihfZW51bWVyYXRvckZhY3RvcnksIGZpbmFsaXplcikge1xuICAgICAgICBzdXBlcihmaW5hbGl6ZXIpO1xuICAgICAgICB0aGlzLl9lbnVtZXJhdG9yRmFjdG9yeSA9IF9lbnVtZXJhdG9yRmFjdG9yeTtcbiAgICAgICAgdGhpcy5faXNFbmRsZXNzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIkluZmluaXRlTGlucUVudW1lcmFibGVcIjtcbiAgICB9XG4gICAgZ2V0IGlzRW5kbGVzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRW5kbGVzcztcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBJRW51bWVyYWJsZTxUPiBJbXBsZW1lbnRhdGlvbi4uLlxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtZXJhdG9yRmFjdG9yeSgpO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgLy8gI3JlZ2lvbiBJRGlzcG9zYWJsZSBvdmVycmlkZS4uLlxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTsgLy8gSnVzdCBpbiBjYXNlLlxuICAgICAgICB0aGlzLl9lbnVtZXJhdG9yRmFjdG9yeSA9IG51bGw7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICAvLyBSZXR1cm4gYSBkZWZhdWx0ICh1bmZpbHRlcmVkKSBlbnVtZXJhYmxlLlxuICAgIGFzRW51bWVyYWJsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiBfLmdldEVudW1lcmF0b3IoKSk7XG4gICAgfVxuICAgIGRvQWN0aW9uKGFjdGlvbiwgaW5pdGlhbGl6ZXIsIGlzRW5kbGVzcyA9IHRoaXMuaXNFbmRsZXNzLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0UgPSBpc0VuZGxlc3MgfHwgdW5kZWZpbmVkOyAvLyBJbiBjYXNlIGl0J3MgbnVsbC5cbiAgICAgICAgaWYgKCFhY3Rpb24pXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiYWN0aW9uXCIpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbGl6ZXIpXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICAvLyBNYXkgbmVlZCBhIHdheSB0byBwcm9wYWdhdGUgaXNFbmRsZXNzXG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uUmVzdWx0ID0gYWN0aW9uKGMsIGluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uUmVzdWx0ID09PSBmYWxzZSB8fCBhY3Rpb25SZXN1bHQgPT09IDAgLyogQnJlYWsgKi8pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25SZXN1bHQgIT09IDIgLyogU2tpcCAqLylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGMpO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiBhY3Rpb25SZXN1bHQ9PT0yLCB0aGVuIGEgc2lnbmFsIGZvciBza2lwIGlzIHJlY2VpdmVkLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob25Db21wbGV0ZSlcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZShpbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH0sIGlzRSk7XG4gICAgICAgIH0sIFxuICAgICAgICAvLyBVc2luZyBhIGZpbmFsaXplciB2YWx1ZSByZWR1Y2VzIHRoZSBjaGFuY2Ugb2YgYSBjaXJjdWxhciByZWZlcmVuY2VcbiAgICAgICAgLy8gc2luY2Ugd2UgY291bGQgc2ltcGx5IHJlZmVyZW5jZSB0aGUgZW51bWVyYXRpb24gYW5kIGNoZWNrIGUud2FzRGlzcG9zZWQuXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGFjdGlvbiA9IE5VTEw7XG4gICAgICAgIH0sIGlzRSk7XG4gICAgfVxuICAgIGZvcmNlKCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aGlzLmRvQWN0aW9uKEJSRUFLKVxuICAgICAgICAgICAgLmdldEVudW1lcmF0b3IoKVxuICAgICAgICAgICAgLm1vdmVOZXh0KCk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gSW5kZXhpbmcvUGFnaW5nIG1ldGhvZHMuXG4gICAgc2tpcChjb3VudCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShjb3VudCkpXG4gICAgICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoZ2V0RW1wdHlFbnVtZXJhdG9yKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIik7XG4gICAgICAgIHJldHVybiB0aGlzLndoZXJlKChlbGVtZW50LCBpbmRleCkgPT4gaW5kZXggPj0gY291bnQpO1xuICAgIH1cbiAgICB0YWtlKGNvdW50KSB7XG4gICAgICAgIGlmICghKGNvdW50ID4gMCkpXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShjb3VudCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdjb3VudCcsIGNvdW50LCAnTXVzdCBiZSBmaW5pdGUuJyk7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICAvLyBPbmNlIGFjdGlvbiByZXR1cm5zIGZhbHNlLCB0aGUgZW51bWVyYXRpb24gd2lsbCBzdG9wLlxuICAgICAgICByZXR1cm4gXy5kb0FjdGlvbigoZWxlbWVudCwgaW5kZXgpID0+IGluZGV4IDwgY291bnQsIG51bGwsIGZhbHNlKTtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBTaW5nbGUgVmFsdWUgUmV0dXJuLi4uXG4gICAgZWxlbWVudEF0KGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLmVsZW1lbnRBdE9yRGVmYXVsdChpbmRleCwgSU5WQUxJRF9ERUZBVUxUKTtcbiAgICAgICAgaWYgKHYgPT09IElOVkFMSURfREVGQVVMVClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2luZGV4JywgaW5kZXgsIFwiaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gc291cmNlXCIpO1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9XG4gICAgZWxlbWVudEF0T3JEZWZhdWx0KGluZGV4LCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihpbmRleCwgJ2luZGV4Jyk7XG4gICAgICAgIGNvbnN0IG4gPSBpbmRleDtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlID0+IHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBuKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKiBOb3RlOiBVbmxpa2UgcHJldmlvdXMgaW1wbGVtZW50YXRpb25zLCB5b3UgY291bGQgcGFzcyBhIHByZWRpY2F0ZSBpbnRvIHRoZXNlIG1ldGhvZHMuXG4gICAgICogQnV0IHNpbmNlIHVuZGVyIHRoZSBob29kIGl0IGVuZHMgdXAgY2FsbGluZyAud2hlcmUocHJlZGljYXRlKSBhbnl3YXksXG4gICAgICogaXQgbWF5IGJlIGJldHRlciB0byByZW1vdmUgdGhpcyB0byBhbGxvdyBmb3IgYSBjbGVhbmVyIHNpZ25hdHVyZS9vdmVycmlkZS5cbiAgICAgKiBKYXZhU2NyaXB0L1R5cGVTY3JpcHQgZG9lcyBub3QgZWFzaWx5IGFsbG93IGZvciBhIHN0cmljdCBtZXRob2QgaW50ZXJmYWNlIGxpa2UgQyMuXG4gICAgICogSGF2aW5nIHRvIHdyaXRlIGV4dHJhIG92ZXJyaWRlIGxvZ2ljIGlzIGVycm9yIHByb25lIGFuZCBjb25mdXNpbmcgdG8gdGhlIGNvbnN1bWVyLlxuICAgICAqIFJlbW92aW5nIHRoZSBwcmVkaWNhdGUgaGVyZSBtYXkgYWxzbyBjYXVzZSB0aGUgY29uc3VtZXIgb2YgdGhpcyBtZXRob2QgdG8gdGhpbmsgbW9yZSBhYm91dCBob3cgdGhleSBzdHJ1Y3R1cmUgdGhlaXIgcXVlcnkuXG4gICAgICogVGhlIGVuZCBhbGwgZGlmZmVyZW5jZSBpcyB0aGF0IHRoZSB1c2VyIG11c3QgZGVjbGFyZSAud2hlcmUocHJlZGljYXRlKSBiZWZvcmUgLmZpcnN0KCksIC5zaW5nbGUoKSwgb3IgLmxhc3QoKS5cbiAgICAgKiBPdGhlcndpc2UgdGhlcmUgd291bGQgbmVlZCB0byBiZSBtdWNoIG1vcmUgY29kZSB0byBoYW5kbGUgdGhlc2UgY2FzZXMgKC5maXJzdChwcmVkaWNhdGUpLCBldGMpO1xuICAgICAqICovXG4gICAgZmlyc3QoKSB7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLmZpcnN0T3JEZWZhdWx0KElOVkFMSURfREVGQVVMVCk7XG4gICAgICAgIGlmICh2ID09PSBJTlZBTElEX0RFRkFVTFQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXJzdDpUaGUgc2VxdWVuY2UgaXMgZW1wdHkuXCIpO1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9XG4gICAgZmlyc3RPckRlZmF1bHQoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUgPT4gZS5tb3ZlTmV4dCgpID8gZS5jdXJyZW50IDogZGVmYXVsdFZhbHVlKTtcbiAgICB9XG4gICAgc2luZ2xlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBlLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKCFlLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzaW5nbGU6c2VxdWVuY2UgY29udGFpbnMgbW9yZSB0aGFuIG9uZSBlbGVtZW50LlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNpbmdsZTpUaGUgc2VxdWVuY2UgaXMgZW1wdHkuXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2luZ2xlT3JEZWZhdWx0KGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBlLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKCFlLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhbnkoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUgPT4gZS5tb3ZlTmV4dCgpKTtcbiAgICB9XG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmFueSgpO1xuICAgIH1cbiAgICB0cmF2ZXJzZURlcHRoRmlyc3QoY2hpbGRyZW5TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7IC8vIElzIGVuZGxlc3MgaXMgbm90IGFmZmlybWF0aXZlIGlmIGZhbHNlLlxuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIC8vIERldiBOb3RlOiBNYXkgd2FudCB0byBjb25zaWRlciB1c2luZyBhbiBhY3R1YWwgc3RhY2sgYW5kIG5vdCBhbiBhcnJheS5cbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yU3RhY2s7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBsZW47IC8vIEF2b2lkIHVzaW5nIHB1c2gvcG9wIHNpbmNlIHRoZXkgcXVlcnkgLmxlbmd0aCBldmVyeSB0aW1lIGFuZCBjYW4gYmUgc2xvd2VyLlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvclN0YWNrID0gW107XG4gICAgICAgICAgICAgICAgbGVuID0gMDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSByZXN1bHRTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIGxlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yU3RhY2tbbGVuKytdID0gZW51bWVyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjID0gY2hpbGRyZW5TZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGUgPSAhVHlwZS5pc1N0cmluZyhjKSAmJiBFbnVtZXJhYmxlLmZyb21BbnkoYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gZSA/IGUuZ2V0RW51bWVyYXRvcigpIDogRW1wdHlFbnVtZXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW4gPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBlbnVtZXJhdG9yU3RhY2tbLS1sZW5dO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yU3RhY2subGVuZ3RoID0gbGVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3JTdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcG9zZS50aGVzZS5ub0NvcHkoZW51bWVyYXRvclN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFjay5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvclN0YWNrID0gTlVMTDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgZmxhdHRlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0TWFueShlbnRyeSA9PiB7XG4gICAgICAgICAgICBsZXQgZSA9ICFUeXBlLmlzU3RyaW5nKGVudHJ5KSAmJiBFbnVtZXJhYmxlLmZyb21BbnkoZW50cnkpO1xuICAgICAgICAgICAgcmV0dXJuIGUgPyBlLmZsYXR0ZW4oKSA6IFtlbnRyeV07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwYWlyd2lzZShzZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFzZWxlY3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzZWxlY3RvclwiKTtcbiAgICAgICAgbGV0IHByZXZpb3VzO1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3QoKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBpID8gc2VsZWN0b3IocHJldmlvdXMsIHZhbHVlLCBpKSA6IE5VTEw7XG4gICAgICAgICAgICBwcmV2aW91cyA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSkuc2tpcCgxKTtcbiAgICB9XG4gICAgc2NhbihmdW5jLCBzZWVkKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWZ1bmMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiZnVuY1wiKTtcbiAgICAgICAgcmV0dXJuIChzZWVkID09PSBWT0lEMFxuICAgICAgICAgICAgPyB0aGlzLnNlbGVjdCgodmFsdWUsIGkpID0+IHNlZWQgPSBpID8gZnVuYyhzZWVkLCB2YWx1ZSwgaSkgOiB2YWx1ZSlcbiAgICAgICAgICAgIDogdGhpcy5zZWxlY3QoKHZhbHVlLCBpKSA9PiBzZWVkID0gZnVuYyhzZWVkLCB2YWx1ZSwgaSkpKTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIHNlbGVjdChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBtYXAoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgLypcbiAgICBwdWJsaWMgc3RhdGljIElFbnVtZXJhYmxlPFRSZXN1bHQ+IFNlbGVjdE1hbnk8VFNvdXJjZSwgVENvbGxlY3Rpb24sIFRSZXN1bHQ+KFxuICAgICAgICB0aGlzIElFbnVtZXJhYmxlPFRTb3VyY2U+IHNvdXJjZSxcbiAgICAgICAgRnVuYzxUU291cmNlLOKAgklFbnVtZXJhYmxlPFRDb2xsZWN0aW9uPj4gY29sbGVjdGlvblNlbGVjdG9yLFxuICAgICAgICBGdW5jPFRTb3VyY2Us4oCCVENvbGxlY3Rpb24s4oCCVFJlc3VsdD4gcmVzdWx0U2VsZWN0b3IpXG4gICAgICovXG4gICAgX3NlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFjb2xsZWN0aW9uU2VsZWN0b3IpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiY29sbGVjdGlvblNlbGVjdG9yXCIpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7IC8vIERvIHNlY29uZCBlbnVtZXJhdGlvbiwgaXQgd2lsbCBiZSBpbmRldGVybWluYXRlIGlmIGZhbHNlLlxuICAgICAgICBpZiAoIXJlc3VsdFNlbGVjdG9yKVxuICAgICAgICAgICAgcmVzdWx0U2VsZWN0b3IgPSAoYSwgYikgPT4gYjtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBtaWRkbGVFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghY29sbGVjdGlvblNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgbWlkZGxlRW51bWVyYXRvciA9IFZPSUQwO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFjb2xsZWN0aW9uU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIC8vIEp1c3Qgc3RhcnRlZCwgYW5kIG5vdGhpbmcgdG8gZW51bWVyYXRlPyBFbmQuXG4gICAgICAgICAgICAgICAgaWYgKG1pZGRsZUVudW1lcmF0b3IgPT09IFZPSUQwICYmICFlbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBtb3ZlTmV4dCBoYXMgYmVlbiBjYWxsZWQgYXQgbGVhc3Qgb25jZS4uLlxuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBtaWRkbGUgaWYgdGhlcmUgaXNuJ3Qgb25lLlxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1pZGRsZUVudW1lcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaWRkbGVTZXEgPSBjb2xsZWN0aW9uU2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBpbmRleCsrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbGxlY3Rpb24gaXMgbnVsbD8gIFNraXAgaXQuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWlkZGxlU2VxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWlkZGxlRW51bWVyYXRvciA9IGVudW1VdGlsLmZyb20obWlkZGxlU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobWlkZGxlRW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0U2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBtaWRkbGVFbnVtZXJhdG9yLmN1cnJlbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSBubyBtb3JlIGluIHRoaXMgbWlkZGxlPyAgVGhlbiBjbGVhciBhbmQgcmVzZXQgZm9yIG5leHQuLi5cbiAgICAgICAgICAgICAgICAgICAgbWlkZGxlRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIG1pZGRsZUVudW1lcmF0b3IgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBkaXNwb3NlU2luZ2xlKG1pZGRsZUVudW1lcmF0b3IpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIG1pZGRsZUVudW1lcmF0b3IgPSBudWxsO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgY29sbGVjdGlvblNlbGVjdG9yID0gTlVMTDtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNYW55KGNvbGxlY3Rpb25TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpO1xuICAgIH1cbiAgICBfZmlsdGVyU2VsZWN0ZWQoc2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHksIGZpbHRlcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghc2VsZWN0b3IpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic2VsZWN0b3JcIik7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpID0gaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlsdGVyIHx8IGZpbHRlcihyZXN1bHQsIGkrKykpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSwgXy5faXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgfSwgXy5faXNFbmRsZXNzKTtcbiAgICB9XG4gICAgY2hvb3NlKHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChzZWxlY3RvciwgaXNOb3ROdWxsT3JVbmRlZmluZWQpO1xuICAgIH1cbiAgICB3aGVyZShwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKEZ1bmN0aW9ucy5JZGVudGl0eSwgcHJlZGljYXRlKTtcbiAgICB9XG4gICAgZmlsdGVyKHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoRnVuY3Rpb25zLklkZW50aXR5LCBwcmVkaWNhdGUpO1xuICAgIH1cbiAgICBub25OdWxsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aGVyZSh2ID0+IHYgIT0gbnVsbCAmJiB2ICE9IFZPSUQwKTtcbiAgICB9XG4gICAgb2ZUeXBlKHR5cGUpIHtcbiAgICAgICAgbGV0IHR5cGVOYW1lO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgTnVtYmVyOlxuICAgICAgICAgICAgICAgIHR5cGVOYW1lID0gVHlwZS5OVU1CRVI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFN0cmluZzpcbiAgICAgICAgICAgICAgICB0eXBlTmFtZSA9IFR5cGUuU1RSSU5HO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBCb29sZWFuOlxuICAgICAgICAgICAgICAgIHR5cGVOYW1lID0gVHlwZS5CT09MRUFOO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBGdW5jdGlvbjpcbiAgICAgICAgICAgICAgICB0eXBlTmFtZSA9IFR5cGUuRlVOQ1RJT047XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICAgICAgICAgIC53aGVyZSh4ID0+IHggaW5zdGFuY2VvZiB0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICAgICAgLndoZXJlKHggPT4gaXNOb3ROdWxsT3JVbmRlZmluZWQoeCkgJiYgdHlwZW9mIHggPT09IHR5cGVOYW1lKTtcbiAgICB9XG4gICAgZXhjZXB0KHNlY29uZCwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGtleXM7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBrZXlzID0gbmV3IERpY3Rpb25hcnkoY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kKVxuICAgICAgICAgICAgICAgICAgICBlbnVtVXRpbC5mb3JFYWNoKHNlY29uZCwga2V5ID0+IHsga2V5cy5hZGRCeUtleVZhbHVlKGtleSwgdHJ1ZSk7IH0pO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgha2V5cy5jb250YWluc0tleShjdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5hZGRCeUtleVZhbHVlKGN1cnJlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBrZXlzLmNsZWFyKCk7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGRpc3RpbmN0KGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5leGNlcHQoTlVMTCwgY29tcGFyZVNlbGVjdG9yKTtcbiAgICB9XG4gICAgLy8gWzAsMCwwLDEsMSwxLDIsMiwyLDAsMCwwLDEsMV0gcmVzdWx0cyBpbiBbMCwxLDIsMCwxXTtcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgY29tcGFyZUtleTtcbiAgICAgICAgICAgIGxldCBpbml0aWFsID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IGNvbXBhcmVTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFyZUVxdWFsVmFsdWVzKGNvbXBhcmVLZXksIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmVLZXkgPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzaW5nbGUgZGVmYXVsdCB2YWx1ZSBpZiBlbXB0eS5cbiAgICAgKiBAcGFyYW0gZGVmYXVsdFZhbHVlXG4gICAgICogQHJldHVybnMge0VudW1lcmFibGV9XG4gICAgICovXG4gICAgZGVmYXVsdElmRW1wdHkoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaXNGaXJzdDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlzRmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIHppcChzZWNvbmQsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBmaXJzdEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgc2Vjb25kRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IGVudW1VdGlsLmZyb20oc2Vjb25kKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiBmaXJzdEVudW1lcmF0b3IubW92ZU5leHQoKVxuICAgICAgICAgICAgICAgICYmIHNlY29uZEVudW1lcmF0b3IubW92ZU5leHQoKVxuICAgICAgICAgICAgICAgICYmIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0U2VsZWN0b3IoZmlyc3RFbnVtZXJhdG9yLmN1cnJlbnQsIHNlY29uZEVudW1lcmF0b3IuY3VycmVudCwgaW5kZXgrKykpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgemlwTXVsdGlwbGUoc2Vjb25kLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFzZWNvbmQubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2Vjb25kVGVtcDtcbiAgICAgICAgICAgIGxldCBmaXJzdEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgc2Vjb25kRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWNvbmRUZW1wID0gbmV3IFF1ZXVlKHNlY29uZCk7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICghc2Vjb25kRW51bWVyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRUZW1wLmNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0ID0gc2Vjb25kVGVtcC5kZXF1ZXVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IGVudW1VdGlsLmZyb20obmV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihmaXJzdEVudW1lcmF0b3IuY3VycmVudCwgc2Vjb25kRW51bWVyYXRvci5jdXJyZW50LCBpbmRleCsrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kVGVtcClcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kVGVtcC5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBzZWNvbmRUZW1wID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBKb2luIE1ldGhvZHNcbiAgICBqb2luKGlubmVyLCBvdXRlcktleVNlbGVjdG9yLCBpbm5lcktleVNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBvdXRlckVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbG9va3VwO1xuICAgICAgICAgICAgbGV0IGlubmVyRWxlbWVudHM7XG4gICAgICAgICAgICBsZXQgaW5uZXJDb3VudCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBvdXRlckVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBsb29rdXAgPSBFbnVtZXJhYmxlLmZyb20oaW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIC50b0xvb2t1cChpbm5lcktleVNlbGVjdG9yLCBGdW5jdGlvbnMuSWRlbnRpdHksIGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbm5lckVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5uZXJFbGVtZW50ID0gaW5uZXJFbGVtZW50c1tpbm5lckNvdW50KytdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyRWxlbWVudCAhPT0gVk9JRDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0U2VsZWN0b3Iob3V0ZXJFbnVtZXJhdG9yLmN1cnJlbnQsIGlubmVyRWxlbWVudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJFbGVtZW50cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lckNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3V0ZXJFbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBvdXRlcktleVNlbGVjdG9yKG91dGVyRW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyRWxlbWVudHMgPSBsb29rdXAuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG91dGVyRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgb3V0ZXJFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpbm5lckVsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICBvdXRlckVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGxvb2t1cCA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdyb3VwSm9pbihpbm5lciwgb3V0ZXJLZXlTZWxlY3RvciwgaW5uZXJLZXlTZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IsIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBsb29rdXA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgbG9va3VwID0gRW51bWVyYWJsZS5mcm9tKGlubmVyKVxuICAgICAgICAgICAgICAgICAgICAudG9Mb29rdXAoaW5uZXJLZXlTZWxlY3RvciwgRnVuY3Rpb25zLklkZW50aXR5LCBjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IGVudW1lcmF0b3IubW92ZU5leHQoKVxuICAgICAgICAgICAgICAgICYmIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0U2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBsb29rdXAuZ2V0KG91dGVyS2V5U2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50KSkpKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBsb29rdXAgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtZXJnZShlbnVtZXJhYmxlcykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICBpZiAoIWVudW1lcmFibGVzIHx8IGVudW1lcmFibGVzLmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgcmV0dXJuIF87XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgcXVldWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAxKSBGaXJzdCBnZXQgb3VyIHZhbHVlcy4uLlxuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IG5ldyBRdWV1ZShlbnVtZXJhYmxlcyk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghZW51bWVyYXRvciAmJiBxdWV1ZS50cnlEZXF1ZXVlKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKHZhbHVlKTsgLy8gNCkgS2VlcCBnb2luZyBhbmQgb24gdG8gc3RlcCAyLiAgRWxzZSBmYWxsIHRocm91Z2ggdG8geWllbGRCcmVhaygpLlxuICAgICAgICAgICAgICAgICAgICB9KSkgeyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yICYmIGVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlKVxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgbnVsbCwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgY29uY2F0KC4uLmVudW1lcmFibGVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lcmdlKGVudW1lcmFibGVzKTtcbiAgICB9XG4gICAgdW5pb24oc2Vjb25kLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlyc3RFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHNlY29uZEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQga2V5cztcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGtleXMgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpOyAvLyBBY3RpbmcgYXMgYSBIYXNoU2V0LlxuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvciA9PT0gVk9JRDApIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGZpcnN0RW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gZmlyc3RFbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWtleXMuY29udGFpbnNLZXkoY3VycmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzLmFkZEJ5S2V5VmFsdWUoY3VycmVudCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IGVudW1VdGlsLmZyb20oc2Vjb25kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKHNlY29uZEVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gc2Vjb25kRW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWtleXMuY29udGFpbnNLZXkoY3VycmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMuYWRkQnlLZXlWYWx1ZShjdXJyZW50LCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgbnVsbCwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgaW5zZXJ0QXQoaW5kZXgsIG90aGVyKSB7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihpbmRleCwgJ2luZGV4Jyk7XG4gICAgICAgIGNvbnN0IG4gPSBpbmRleDtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlyc3RFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHNlY29uZEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICAgICAgbGV0IGlzRW51bWVyYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKG90aGVyKTtcbiAgICAgICAgICAgICAgICBpc0VudW1lcmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IG4pIHtcbiAgICAgICAgICAgICAgICAgICAgaXNFbnVtZXJhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHNlY29uZEVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihmaXJzdEVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhaXNFbnVtZXJhdGVkXG4gICAgICAgICAgICAgICAgICAgICYmIHNlY29uZEVudW1lcmF0b3IubW92ZU5leHQoKVxuICAgICAgICAgICAgICAgICAgICAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHNlY29uZEVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGFsdGVybmF0ZU11bHRpcGxlKHNlcXVlbmNlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciwgbW9kZSwgZW51bWVyYXRvciwgYWx0ZXJuYXRlRW51bWVyYXRvcjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEluc3RlYWQgb2YgcmVjYWxsaW5nIGdldEVudW1lcmF0b3IgZXZlcnkgdGltZSwganVzdCByZXNldCB0aGUgZXhpc3Rpbmcgb25lLlxuICAgICAgICAgICAgICAgIGFsdGVybmF0ZUVudW1lcmF0b3IgPSBuZXcgQXJyYXlFbnVtZXJhdG9yKEVudW1lcmFibGUudG9BcnJheShzZXF1ZW5jZSkpOyAvLyBGcmVlemVcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgbGV0IGhhc0F0TGVhc3RPbmUgPSBlbnVtZXJhdG9yLm1vdmVOZXh0KCk7XG4gICAgICAgICAgICAgICAgbW9kZSA9IGhhc0F0TGVhc3RPbmVcbiAgICAgICAgICAgICAgICAgICAgPyAxIC8qIFJldHVybiAqL1xuICAgICAgICAgICAgICAgICAgICA6IDAgLyogQnJlYWsgKi87XG4gICAgICAgICAgICAgICAgaWYgKGhhc0F0TGVhc3RPbmUpXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMCAvKiBCcmVhayAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyIC8qIFNraXAgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWx0ZXJuYXRlRW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGFsdGVybmF0ZUVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdGVFbnVtZXJhdG9yLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMSAvKiBSZXR1cm4gKi87XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxhdGVzdCA9IGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAvLyBTZXQgdXAgdGhlIG5leHQgcm91bmQuLi5cbiAgICAgICAgICAgICAgICAvLyBJcyB0aGVyZSBhbm90aGVyIG9uZT8gIFNldCB0aGUgYnVmZmVyIGFuZCBzZXR1cCBpbnN0cnVjdCBmb3IgdGhlIG5leHQgb25lIHRvIGJlIHRoZSBhbHRlcm5hdGUuXG4gICAgICAgICAgICAgICAgbGV0IGFub3RoZXIgPSBlbnVtZXJhdG9yLm1vdmVOZXh0KCk7XG4gICAgICAgICAgICAgICAgbW9kZSA9IGFub3RoZXJcbiAgICAgICAgICAgICAgICAgICAgPyAyIC8qIFNraXAgKi9cbiAgICAgICAgICAgICAgICAgICAgOiAwIC8qIEJyZWFrICovO1xuICAgICAgICAgICAgICAgIGlmIChhbm90aGVyKVxuICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4obGF0ZXN0KTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGFsdGVybmF0ZUVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGFsdGVybmF0ZUVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGFsdGVybmF0ZUVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgbnVsbCwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgYWx0ZXJuYXRlU2luZ2xlKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsdGVybmF0ZU11bHRpcGxlKEVudW1lcmFibGUubWFrZSh2YWx1ZSkpO1xuICAgIH1cbiAgICBhbHRlcm5hdGUoLi4uc2VxdWVuY2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWx0ZXJuYXRlTXVsdGlwbGUoc2VxdWVuY2UpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIEVycm9yIEhhbmRsaW5nXG4gICAgY2F0Y2hFcnJvcihoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBpbml0Li4uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXIoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaW5hbGx5QWN0aW9uKGFjdGlvbikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KVxuICAgICAgICAgICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgYnVmZmVyKHNpemUpIHtcbiAgICAgICAgaWYgKHNpemUgPCAxIHx8ICFpc0Zpbml0ZShzaXplKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYnVmZmVyIHNpemUuXCIpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChzaXplLCBcInNpemVcIik7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIGxldCBsZW47XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhcnJheSA9IGluaXRpYWxpemUoc2l6ZSk7XG4gICAgICAgICAgICAgICAgbGVuID0gMDtcbiAgICAgICAgICAgICAgICB3aGlsZSAobGVuIDwgc2l6ZSAmJiBlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlbbGVuKytdID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcnJheS5sZW5ndGggPSBsZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhbGVuICYmIHlpZWxkZXIueWllbGRSZXR1cm4oYXJyYXkpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIHNoYXJlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IHNoYXJlZEVudW1lcmF0b3I7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNoYXJlZEVudW1lcmF0b3IgfHwgKHNoYXJlZEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzaGFyZWRFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgIHNoYXJlZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgc2hhcmVkRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgIH0sIF8uX2lzRW5kbGVzcyk7XG4gICAgfVxuICAgIG1lbW9pemUoKSB7XG4gICAgICAgIGxldCBzb3VyY2UgPSBuZXcgTGF6eUxpc3QodGhpcyk7XG4gICAgICAgIHJldHVybiAobmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4gc291cmNlLmdldEVudW1lcmF0b3IoKSwgKCkgPT4ge1xuICAgICAgICAgICAgc291cmNlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHNvdXJjZSA9IG51bGw7XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4vKipcbiAqIEVudW1lcmFibGU8VD4gaXMgYSB3cmFwcGVyIGNsYXNzIHRoYXQgYWxsb3dzIG1vcmUgcHJpbWl0aXZlIGVudW1lcmFibGVzIHRvIGV4aGliaXQgTElOUSBiZWhhdmlvci5cbiAqXG4gKiBJbiBDIyBFbnVtZXJhYmxlPFQ+IGlzIG5vdCBhbiBpbnN0YW5jZSBidXQgaGFzIGV4dGVuc2lvbnMgZm9yIElFbnVtZXJhYmxlPFQ+LlxuICogSW4gdGhpcyBjYXNlLCB3ZSB1c2UgRW51bWVyYWJsZTxUPiBhcyB0aGUgdW5kZXJseWluZyBjbGFzcyB0aGF0IGlzIGJlaW5nIGNoYWluZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaW5xRW51bWVyYWJsZSBleHRlbmRzIEluZmluaXRlTGlucUVudW1lcmFibGUge1xuICAgIGNvbnN0cnVjdG9yKGVudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIsIGlzRW5kbGVzcykge1xuICAgICAgICBzdXBlcihlbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyKTtcbiAgICAgICAgdGhpcy5faXNFbmRsZXNzID0gaXNFbmRsZXNzO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiTGlucUVudW1lcmFibGVcIjtcbiAgICB9XG4gICAgLy8gUmV0dXJuIGEgZGVmYXVsdCAodW5maWx0ZXJlZCkgZW51bWVyYWJsZS5cbiAgICBhc0VudW1lcmFibGUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IF8uZ2V0RW51bWVyYXRvcigpKTtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBJbmRleGluZy9QYWdpbmcgbWV0aG9kcy5cbiAgICBza2lwV2hpbGUocHJlZGljYXRlKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKChlbGVtZW50LCBpbmRleCkgPT4gcHJlZGljYXRlKGVsZW1lbnQsIGluZGV4KVxuICAgICAgICAgICAgPyAyIC8qIFNraXAgKi9cbiAgICAgICAgICAgIDogMSAvKiBSZXR1cm4gKi8pO1xuICAgIH1cbiAgICB0YWtlV2hpbGUocHJlZGljYXRlKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigncHJlZGljYXRlJyk7XG4gICAgICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKChlbGVtZW50LCBpbmRleCkgPT4gcHJlZGljYXRlKGVsZW1lbnQsIGluZGV4KVxuICAgICAgICAgICAgPyAxIC8qIFJldHVybiAqL1xuICAgICAgICAgICAgOiAwIC8qIEJyZWFrICovLCBudWxsLCBudWxsIC8vIFdlIGRvbid0IGtub3cgdGhlIHN0YXRlIGlmIGl0IGlzIGVuZGxlc3Mgb3Igbm90LlxuICAgICAgICApO1xuICAgIH1cbiAgICAvLyBJcyBsaWtlIHRoZSBpbnZlcnNlIG9mIHRha2UgV2hpbGUgd2l0aCB0aGUgYWJpbGl0eSB0byByZXR1cm4gdGhlIHZhbHVlIGlkZW50aWZpZWQgYnkgdGhlIHByZWRpY2F0ZS5cbiAgICB0YWtlVW50aWwocHJlZGljYXRlLCBpbmNsdWRlVW50aWxWYWx1ZSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ3ByZWRpY2F0ZScpO1xuICAgICAgICBpZiAoIWluY2x1ZGVVbnRpbFZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiBwcmVkaWNhdGUoZWxlbWVudCwgaW5kZXgpXG4gICAgICAgICAgICAgICAgPyAwIC8qIEJyZWFrICovXG4gICAgICAgICAgICAgICAgOiAxIC8qIFJldHVybiAqLywgbnVsbCwgbnVsbCAvLyBXZSBkb24ndCBrbm93IHRoZSBzdGF0ZSBpZiBpdCBpcyBlbmRsZXNzIG9yIG5vdC5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbigoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChmb3VuZClcbiAgICAgICAgICAgICAgICByZXR1cm4gMCAvKiBCcmVhayAqLztcbiAgICAgICAgICAgIGZvdW5kID0gcHJlZGljYXRlKGVsZW1lbnQsIGluZGV4KTtcbiAgICAgICAgICAgIHJldHVybiAxIC8qIFJldHVybiAqLztcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgfSwgbnVsbCAvLyBXZSBkb24ndCBrbm93IHRoZSBzdGF0ZSBpZiBpdCBpcyBlbmRsZXNzIG9yIG5vdC5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgdHJhdmVyc2VCcmVhZHRoRmlyc3QoY2hpbGRyZW5TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7IC8vIElzIGVuZGxlc3MgaXMgbm90IGFmZmlybWF0aXZlIGlmIGZhbHNlLlxuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IG5lc3RMZXZlbCA9IDA7XG4gICAgICAgICAgICBsZXQgYnVmZmVyLCBsZW47XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBuZXN0TGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyW2xlbisrXSA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgbmVzdExldmVsKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0ID0gRW51bWVyYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZyb20oYnVmZmVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdE1hbnkoY2hpbGRyZW5TZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbmV4dC5hbnkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmVzdExldmVsKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBuZXh0LmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uLCBtYXggPSBJbmZpbml0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFhY3Rpb24pXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiYWN0aW9uXCIpO1xuICAgICAgICB0aHJvd0lmRW5kbGVzcyhfLmlzRW5kbGVzcyk7XG4gICAgICAgIC8qXG4gICAgICAgIC8vIEl0IGNvdWxkIGJlIGp1c3QgYXMgZWFzeSB0byBkbyB0aGUgZm9sbG93aW5nOlxuICAgICAgICByZXR1cm4gZW51bVV0aWwuZm9yRWFjaChfLCBhY3Rpb24sIG1heCk7XG4gICAgICAgIC8vIEJ1dCB0byBiZSBtb3JlIGFjdGl2ZSBhYm91dCBjaGVja2luZyBmb3IgZGlzcG9zYWwsIHdlIHVzZSB0aGlzIGluc3RlYWQ6XG4gICAgICAgICovXG4gICAgICAgIC8vIFJldHVybiB2YWx1ZSBvZiBhY3Rpb24gY2FuIGJlIGFueXRoaW5nLCBidXQgaWYgaXQgaXMgKD09PSkgZmFsc2UgdGhlbiB0aGUgZW51bVV0aWwuZm9yRWFjaCB3aWxsIGRpc2NvbnRpbnVlLlxuICAgICAgICByZXR1cm4gbWF4ID4gMCA/IHVzaW5nKF8uZ2V0RW51bWVyYXRvcigpLCBlID0+IHtcbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpICYmIGUuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIC8vIEl0IGlzIHBvc3NpYmxlIHRoYXQgc3Vic2VxdWVudGx5ICdhY3Rpb24nIGNvdWxkIGNhdXNlIHRoZSBlbnVtZXJhdGlvbiB0byBkaXNwb3NlLCBzbyB3ZSBoYXZlIHRvIGNoZWNrIGVhY2ggdGltZS5cbiAgICAgICAgICAgIHdoaWxlIChtYXggPiBpICYmIF8udGhyb3dJZkRpc3Bvc2VkKCkgJiYgZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbihlLmN1cnJlbnQsIGkrKykgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9KSA6IDA7XG4gICAgfVxuICAgIC8vICNyZWdpb24gQ29udmVyc2lvbiBNZXRob2RzXG4gICAgdG9BcnJheShwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHByZWRpY2F0ZVxuICAgICAgICAgICAgPyB0aGlzLndoZXJlKHByZWRpY2F0ZSkudG9BcnJheSgpXG4gICAgICAgICAgICA6IHRoaXMuY29weVRvKFtdKTtcbiAgICB9XG4gICAgY29weVRvKHRhcmdldCwgaW5kZXggPSAwLCBjb3VudCA9IEluZmluaXR5KSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghdGFyZ2V0KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInRhcmdldFwiKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4KTtcbiAgICAgICAgLy8gSWYgbm90IGV4cG9zaW5nIGFuIGFjdGlvbiB0aGF0IGNvdWxkIGNhdXNlIGRpc3Bvc2UsIHRoZW4gdXNlIGVudW1VdGlsLmZvckVhY2ggdXRpbGl0eSBpbnN0ZWFkLlxuICAgICAgICBlbnVtVXRpbC5mb3JFYWNoKHRoaXMsICh4LCBpKSA9PiB7XG4gICAgICAgICAgICB0YXJnZXRbaSArIGluZGV4XSA9IHg7XG4gICAgICAgIH0sIGNvdW50KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgdG9Mb29rdXAoa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGRpY3QgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBrZXlTZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZWxlbWVudFNlbGVjdG9yKHgsIGkpO1xuICAgICAgICAgICAgbGV0IGFycmF5ID0gZGljdC5nZXRWYWx1ZShrZXkpO1xuICAgICAgICAgICAgaWYgKGFycmF5ICE9PSBWT0lEMClcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRpY3QuYWRkQnlLZXlWYWx1ZShrZXksIFtlbGVtZW50XSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3IExvb2t1cChkaWN0KTtcbiAgICB9XG4gICAgdG9NYXAoa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBvYmpba2V5U2VsZWN0b3IoeCwgaSldID0gZWxlbWVudFNlbGVjdG9yKHgsIGkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgdG9EaWN0aW9uYXJ5KGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBkaWN0ID0gbmV3IERpY3Rpb25hcnkoY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiBkaWN0LmFkZEJ5S2V5VmFsdWUoa2V5U2VsZWN0b3IoeCwgaSksIGVsZW1lbnRTZWxlY3Rvcih4LCBpKSkpO1xuICAgICAgICByZXR1cm4gZGljdDtcbiAgICB9XG4gICAgdG9Kb2luZWRTdHJpbmcoc2VwYXJhdG9yID0gXCJcIiwgc2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgIC5zZWxlY3Qoc2VsZWN0b3IpXG4gICAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgICAuam9pbihzZXBhcmF0b3IpO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgdGFrZUV4Y2VwdExhc3QoY291bnQgPSAxKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIF87XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIik7XG4gICAgICAgIGNvbnN0IGMgPSBjb3VudDtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBxO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIHEgPSBuZXcgUXVldWUoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIG5leHQgb25lIHRvIHRoZSBxdWV1ZS5cbiAgICAgICAgICAgICAgICAgICAgcS5lbnF1ZXVlKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIERpZCB3ZSByZWFjaCBvdXIgcXVvdGE/XG4gICAgICAgICAgICAgICAgICAgIGlmIChxLmNvdW50ID4gYylcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9rYXkgdGhlbiwgc3RhcnQgcmV0dXJuaW5nIHJlc3VsdHMuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihxLmRlcXVldWUoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgaWYgKHEpXG4gICAgICAgICAgICAgICAgICAgIHEuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHEgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBza2lwVG9MYXN0KGNvdW50KSB7XG4gICAgICAgIGlmICghKGNvdW50ID4gMCkpXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShjb3VudCkpXG4gICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIik7XG4gICAgICAgIC8vIFRoaXMgc2V0cyB1cCB0aGUgcXVlcnkgc28gbm90aGluZyBpcyBkb25lIHVudGlsIG1vdmUgbmV4dCBpcyBjYWxsZWQuXG4gICAgICAgIHJldHVybiBfLnJldmVyc2UoKVxuICAgICAgICAgICAgLnRha2UoY291bnQpXG4gICAgICAgICAgICAucmV2ZXJzZSgpO1xuICAgIH1cbiAgICAvLyBUbyBoZWxwIHdpdGggdHlwZSBndWFyZGluZy5cbiAgICBzZWxlY3Qoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnNlbGVjdChzZWxlY3Rvcik7XG4gICAgfVxuICAgIG1hcChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gc3VwZXIuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICB9XG4gICAgc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNYW55KGNvbGxlY3Rpb25TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpO1xuICAgIH1cbiAgICBjaG9vc2Uoc2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yLCBpc05vdE51bGxPclVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHJldmVyc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhyb3dJZkVuZGxlc3MoXy5faXNFbmRsZXNzKTsgLy8gQ2Fubm90IHJldmVyc2UgYW4gZW5kbGVzcyBjb2xsZWN0aW9uLi4uXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJ1ZmZlcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gXy50b0FycmF5KCk7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+ICEhaW5kZXggJiYgeWllbGRlci55aWVsZFJldHVybihidWZmZXJbLS1pbmRleF0pLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2h1ZmZsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aHJvd0lmRW5kbGVzcyhfLl9pc0VuZGxlc3MpOyAvLyBDYW5ub3Qgc2h1ZmZsZSBhbiBlbmRsZXNzIGNvbGxlY3Rpb24uLi5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYnVmZmVyO1xuICAgICAgICAgICAgbGV0IGNhcGFjaXR5O1xuICAgICAgICAgICAgbGV0IGxlbjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gXy50b0FycmF5KCk7XG4gICAgICAgICAgICAgICAgY2FwYWNpdHkgPSBsZW4gPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBBdm9pZCB1c2luZyBtYWpvciBhcnJheSBvcGVyYXRpb25zIGxpa2UgLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFsZW4pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJbmRleCA9IFJhbmRvbS5pbnRlZ2VyKGxlbik7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkVmFsdWUgPSBidWZmZXJbc2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICAgICAgYnVmZmVyW3NlbGVjdGVkSW5kZXhdID0gYnVmZmVyWy0tbGVuXTsgLy8gVGFrZSB0aGUgbGFzdCBvbmUgYW5kIHB1dCBpdCBoZXJlLlxuICAgICAgICAgICAgICAgIGJ1ZmZlcltsZW5dID0gTlVMTDsgLy8gY2xlYXIgcG9zc2libGUgcmVmZXJlbmNlLlxuICAgICAgICAgICAgICAgIGlmIChsZW4gJSAzMiA9PSAwKVxuICAgICAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gbGVuO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHNlbGVjdGVkVmFsdWUpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvdW50KHByZWRpY2F0ZSkge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICB0aGlzLmZvckVhY2gocHJlZGljYXRlXG4gICAgICAgICAgICA/ICh4LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSh4LCBpKSlcbiAgICAgICAgICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cbiAgICAvLyBBa2luIHRvICcuZXZlcnknIG9uIGFuIGFycmF5LlxuICAgIGFsbChwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwicHJlZGljYXRlXCIpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXByZWRpY2F0ZSh4LCBpKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vICdldmVyeScgaGFzIGJlZW4gYWRkZWQgaGVyZSBmb3IgcGFyaXR5L2NvbXBhdGliaWxpdHkgd2l0aCBhbiBhcnJheS5cbiAgICBldmVyeShwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsKHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIC8vIEFraW4gdG8gJy5zb21lJyBvbiBhbiBhcnJheS5cbiAgICBhbnkocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmFueSgpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIC8vIFNwbGl0dGluZyB0aGUgZm9yRWFjaCB1cCB0aGlzIHdheSByZWR1Y2VzIGl0ZXJhdGl2ZSBwcm9jZXNzaW5nLlxuICAgICAgICAvLyBmb3JFYWNoIGhhbmRsZXMgdGhlIGdlbmVyYXRpb24gYW5kIGRpc3Bvc2FsIG9mIHRoZSBlbnVtZXJhdG9yLlxuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHByZWRpY2F0ZSh4LCBpKTsgLy8gZmFsc2UgPSBub3QgZm91bmQgYW5kIHRoZXJlZm9yZSBpdCBzaG91bGQgY29udGludWUuICB0cnVlID0gZm91bmQgYW5kIGJyZWFrO1xuICAgICAgICAgICAgcmV0dXJuICFyZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvLyAnc29tZScgaGFzIGJlZW4gYWRkZWQgaGVyZSBmb3IgcGFyaXR5L2NvbXBhdGliaWxpdHkgd2l0aCBhbiBhcnJheS5cbiAgICBzb21lKHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbnkocHJlZGljYXRlKTtcbiAgICB9XG4gICAgY29udGFpbnModmFsdWUsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBpZiAoY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gY29tcGFyZVNlbGVjdG9yKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFueSh2ID0+IGFyZUVxdWFsVmFsdWVzKGNvbXBhcmVTZWxlY3Rvcih2KSwgcykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmFueSh2ID0+IGFyZUVxdWFsVmFsdWVzKHYsIHZhbHVlKSk7XG4gICAgfVxuICAgIC8vIE9yaWdpbmFsbHkgaGFzIGFuIG92ZXJsb2FkIGZvciBhIHByZWRpY2F0ZSxcbiAgICAvLyBidXQgdGhhdCdzIGEgYmFkIGlkZWEgc2luY2UgdGhpcyBjb3VsZCBiZSBhbiBlbnVtZXJhdGlvbiBvZiBmdW5jdGlvbnMgYW5kIHRoZXJlZm9yZSBmYWlsIHRoZSBpbnRlbnQuXG4gICAgLy8gQmV0dGVyIHRvIGNoYWluIGEgd2hlcmUgc3RhdGVtZW50IGZpcnN0IHRvIGJlIG1vcmUgZXhwbGljaXQuXG4gICAgaW5kZXhPZih2YWx1ZSwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGxldCBmb3VuZCA9IC0xO1xuICAgICAgICB0aGlzLmZvckVhY2goY29tcGFyZVNlbGVjdG9yXG4gICAgICAgICAgICA/IChlbGVtZW50LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZUVxdWFsVmFsdWVzKGNvbXBhcmVTZWxlY3RvcihlbGVtZW50LCBpKSwgY29tcGFyZVNlbGVjdG9yKHZhbHVlLCBpKSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiAoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFdoeT8gIEJlY2F1c2UgTmFOIGRvZXNuJ3QgZXF1YWwgTmFOLiA6UFxuICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhlbGVtZW50LCB2YWx1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG4gICAgbGFzdEluZGV4T2YodmFsdWUsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gLTE7XG4gICAgICAgIHRoaXMuZm9yRWFjaChjb21wYXJlU2VsZWN0b3JcbiAgICAgICAgICAgID8gKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXJlRXF1YWxWYWx1ZXMoY29tcGFyZVNlbGVjdG9yKGVsZW1lbnQsIGkpLCBjb21wYXJlU2VsZWN0b3IodmFsdWUsIGkpLCB0cnVlKSlcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IChlbGVtZW50LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZUVxdWFsVmFsdWVzKGVsZW1lbnQsIHZhbHVlLCB0cnVlKSlcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gaTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpbnRlcnNlY3Qoc2Vjb25kLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghc2Vjb25kKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlY29uZFwiKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQga2V5cztcbiAgICAgICAgICAgIGxldCBvdXRzO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFzZWNvbmQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBrZXlzID0gbmV3IERpY3Rpb25hcnkoY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBvdXRzID0gbmV3IERpY3Rpb25hcnkoY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBlbnVtVXRpbC5mb3JFYWNoKHNlY29uZCwga2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5hZGRCeUtleVZhbHVlKGtleSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb3V0cy5jb250YWluc0tleShjdXJyZW50KSAmJiBrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRzLmFkZEJ5S2V5VmFsdWUoY3VycmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChrZXlzKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAob3V0cylcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAga2V5cyA9IE5VTEw7XG4gICAgICAgICAgICAgICAgb3V0cyA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBzZWNvbmQgPSBOVUxMO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBzZXF1ZW5jZUVxdWFsKHNlY29uZCwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsVmFsdWVzKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZTEgPT4gdXNpbmcoZW51bVV0aWwuZnJvbShzZWNvbmQpLCBlMiA9PiB7XG4gICAgICAgICAgICAvLyBpZiBib3RoIGFyZSBlbmRsZXNzLCB0aGlzIHdpbGwgbmV2ZXIgZXZhbHVhdGUuXG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyhlMS5pc0VuZGxlc3MgJiYgZTIuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIHdoaWxlIChlMS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFlMi5tb3ZlTmV4dCgpIHx8ICFlcXVhbGl0eUNvbXBhcmVyKGUxLmN1cnJlbnQsIGUyLmN1cnJlbnQpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gIWUyLm1vdmVOZXh0KCk7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgb2ZUeXBlKHR5cGUpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLm9mVHlwZSh0eXBlKTtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBPcmRlcmluZyBNZXRob2RzXG4gICAgb3JkZXJCeShrZXlTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMsIGtleVNlbGVjdG9yLCAxIC8qIEFzY2VuZGluZyAqLyk7XG4gICAgfVxuICAgIG9yZGVyVXNpbmcoY29tcGFyaXNvbikge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMsIG51bGwsIDEgLyogQXNjZW5kaW5nICovLCBudWxsLCBjb21wYXJpc29uKTtcbiAgICB9XG4gICAgb3JkZXJVc2luZ1JldmVyc2VkKGNvbXBhcmlzb24pIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLCBudWxsLCAtMSAvKiBEZXNjZW5kaW5nICovLCBudWxsLCBjb21wYXJpc29uKTtcbiAgICB9XG4gICAgb3JkZXJCeURlc2NlbmRpbmcoa2V5U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLCBrZXlTZWxlY3RvciwgLTEgLyogRGVzY2VuZGluZyAqLyk7XG4gICAgfVxuICAgIC8qXG4gICAgICAgICB3ZWlnaHRlZFNhbXBsZSh3ZWlnaHRTZWxlY3Rvcikge1xuICAgICAgICAgd2VpZ2h0U2VsZWN0b3IgPSBVdGlscy5jcmVhdGVMYW1iZGEod2VpZ2h0U2VsZWN0b3IpO1xuICAgICAgICAgdmFyIHNvdXJjZSA9IHRoaXM7XG4gICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlPFQ+KCgpID0+IHtcbiAgICAgICAgIHZhciBzb3J0ZWRCeUJvdW5kO1xuICAgICAgICAgdmFyIHRvdGFsV2VpZ2h0ID0gMDtcbiAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2U8VD4oXG4gICAgICAgICAoKSA9PiB7XG4gICAgICAgICBzb3J0ZWRCeUJvdW5kID0gc291cmNlXG4gICAgICAgICAuY2hvb3NlKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICB2YXIgd2VpZ2h0ID0gd2VpZ2h0U2VsZWN0b3IoeCk7XG4gICAgICAgICBpZiAod2VpZ2h0IDw9IDApIHJldHVybiBudWxsOyAvLyBpZ25vcmUgMFxuICAgICAgICAgdG90YWxXZWlnaHQgKz0gd2VpZ2h0O1xuICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHgsIGJvdW5kOiB0b3RhbFdlaWdodCB9XG4gICAgICAgICB9KVxuICAgICAgICAgLnRvQXJyYXkoKTtcbiAgICAgICAgIH0sXG4gICAgICAgICAoKSA9PiB7XG4gICAgICAgICBpZiAoc29ydGVkQnlCb3VuZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICB2YXIgZHJhdyA9IChNYXRoLnJhbmRvbSgpICogdG90YWxXZWlnaHQpICsgMTtcbiAgICAgICAgIHZhciBsb3dlciA9IC0xO1xuICAgICAgICAgdmFyIHVwcGVyID0gc29ydGVkQnlCb3VuZC5sZW5ndGg7XG4gICAgICAgICB3aGlsZSAodXBwZXIgLSBsb3dlciA+IDEpIHtcbiAgICAgICAgIHZhciBpbmRleCA9ICgobG93ZXIgKyB1cHBlcikgLyAyKTtcbiAgICAgICAgIGlmIChzb3J0ZWRCeUJvdW5kW2luZGV4XS5ib3VuZCA+PSBkcmF3KSB7XG4gICAgICAgICB1cHBlciA9IGluZGV4O1xuICAgICAgICAgfVxuICAgICAgICAgZWxzZSB7XG4gICAgICAgICBsb3dlciA9IGluZGV4O1xuICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgICAgcmV0dXJuICg8YW55PnRoaXMpLnlpZWxkUmV0dXJuKHNvcnRlZEJ5Qm91bmRbdXBwZXJdLnZhbHVlKTtcbiAgICAgICAgIH1cbiAgICAgICAgIHJldHVybiAoPGFueT50aGlzKS55aWVsZEJyZWFrKCk7XG4gICAgICAgICB9LFxuICAgICAgICAgRnVuY3Rpb25zLkJsYW5rKTtcbiAgICAgICAgIH0pO1xuICAgICAgICAgfVxuICAgICAgICAgKi9cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgYnVmZmVyKHNpemUpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmJ1ZmZlcihzaXplKTtcbiAgICB9XG4gICAgZ3JvdXBCeShrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50U2VsZWN0b3IpXG4gICAgICAgICAgICBlbGVtZW50U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHk7IC8vIEFsbG93IGZvciAnbnVsbCcgYW5kIG5vdCBqdXN0IHVuZGVmaW5lZC5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB0aGlzXG4gICAgICAgICAgICAudG9Mb29rdXAoa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3RvciwgY29tcGFyZVNlbGVjdG9yKVxuICAgICAgICAgICAgLmdldEVudW1lcmF0b3IoKSk7XG4gICAgfVxuICAgIHBhcnRpdGlvbkJ5KGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yID0gKGtleSwgZWxlbWVudHMpID0+IG5ldyBHcm91cGluZyhrZXksIGVsZW1lbnRzKSwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIWVsZW1lbnRTZWxlY3RvcilcbiAgICAgICAgICAgIGVsZW1lbnRTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eTsgLy8gQWxsb3cgZm9yICdudWxsJyBhbmQgbm90IGp1c3QgdW5kZWZpbmVkLlxuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGtleTtcbiAgICAgICAgICAgIGxldCBjb21wYXJlS2V5O1xuICAgICAgICAgICAgbGV0IGdyb3VwO1xuICAgICAgICAgICAgbGV0IGxlbjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghZWxlbWVudFNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5U2VsZWN0b3Iodik7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmVLZXkgPSBjb21wYXJlU2VsZWN0b3Ioa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBbZWxlbWVudFNlbGVjdG9yKHYpXTtcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBncm91cCA9IG51bGw7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghZWxlbWVudFNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoIWdyb3VwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgbGV0IGhhc05leHQsIGM7XG4gICAgICAgICAgICAgICAgd2hpbGUgKChoYXNOZXh0ID0gZW51bWVyYXRvci5tb3ZlTmV4dCgpKSkge1xuICAgICAgICAgICAgICAgICAgICBjID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJlRXF1YWxWYWx1ZXMoY29tcGFyZUtleSwgY29tcGFyZVNlbGVjdG9yKGtleVNlbGVjdG9yKGMpKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cFtsZW4rK10gPSBlbGVtZW50U2VsZWN0b3IoYyk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gcmVzdWx0U2VsZWN0b3Ioa2V5LCBncm91cCk7XG4gICAgICAgICAgICAgICAgaWYgKGhhc05leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgYyA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5U2VsZWN0b3IoYyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmVLZXkgPSBjb21wYXJlU2VsZWN0b3Ioa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBbZWxlbWVudFNlbGVjdG9yKGMpXTtcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0KTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgZ3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRTZWxlY3RvciA9IE5VTEw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmbGF0dGVuKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIuZmxhdHRlbigpO1xuICAgIH1cbiAgICBwYWlyd2lzZShzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gc3VwZXIucGFpcndpc2Uoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBhZ2dyZWdhdGUocmVkdWN0aW9uLCBpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgaWYgKGluaXRpYWxWYWx1ZSA9PSBWT0lEMCkge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKCh2YWx1ZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZSA9IGlcbiAgICAgICAgICAgICAgICAgICAgPyByZWR1Y3Rpb24oaW5pdGlhbFZhbHVlLCB2YWx1ZSwgaSlcbiAgICAgICAgICAgICAgICAgICAgOiB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKCh2YWx1ZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZSA9IHJlZHVjdGlvbihpbml0aWFsVmFsdWUsIHZhbHVlLCBpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbml0aWFsVmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVkIGFzIGFuIGFuYWxvZyBmb3IgYXJyYXkucmVkdWNlLiAgU2ltcGx5IGEgc2hvcnRjdXQgZm9yIGFnZ3JlZ2F0ZS5cbiAgICAgKiBAcGFyYW0gcmVkdWN0aW9uXG4gICAgICogQHBhcmFtIGluaXRpYWxWYWx1ZVxuICAgICAqL1xuICAgIHJlZHVjZShyZWR1Y3Rpb24sIGluaXRpYWxWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUocmVkdWN0aW9uLCBpbml0aWFsVmFsdWUpO1xuICAgIH1cbiAgICBhdmVyYWdlKHNlbGVjdG9yID0gVHlwZS5udW1iZXJPck5hTikge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBzdW0gPSB0aGlzLnN1bSgoZSwgaSkgPT4ge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcihlLCBpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoaXNOYU4oc3VtKSB8fCAhY291bnQpXG4gICAgICAgICAgICA/IE5hTlxuICAgICAgICAgICAgOiAoc3VtIC8gY291bnQpO1xuICAgIH1cbiAgICAvLyBJZiB1c2luZyBudW1iZXJzLCBpdCBtYXkgYmUgdXNlZnVsIHRvIGNhbGwgLnRha2VVbnRpbCh2PT52PT1JbmZpbml0eSx0cnVlKSBiZWZvcmUgY2FsbGluZyBtYXguIFNlZSBzdGF0aWMgdmVyc2lvbnMgZm9yIG51bWJlcnMuXG4gICAgbWF4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUoRnVuY3Rpb25zLkdyZWF0ZXIpO1xuICAgIH1cbiAgICBtaW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZShGdW5jdGlvbnMuTGVzc2VyKTtcbiAgICB9XG4gICAgbWF4Qnkoa2V5U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKChhLCBiKSA9PiAoa2V5U2VsZWN0b3IoYSkgPiBrZXlTZWxlY3RvcihiKSkgPyBhIDogYik7XG4gICAgfVxuICAgIG1pbkJ5KGtleVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZSgoYSwgYikgPT4gKGtleVNlbGVjdG9yKGEpIDwga2V5U2VsZWN0b3IoYikpID8gYSA6IGIpO1xuICAgIH1cbiAgICAvLyBBZGRpdGlvbi4uLiAgT25seSB3b3JrcyB3aXRoIG51bWVyaWNhbCBlbnVtZXJhdGlvbnMuXG4gICAgc3VtKHNlbGVjdG9yID0gVHlwZS5udW1iZXJPck5hTikge1xuICAgICAgICBsZXQgc3VtID0gMDtcbiAgICAgICAgLy8gVGhpcyBhbGxvd3MgZm9yIGluZmluaXR5IG1hdGggdGhhdCBkb2Vzbid0IGRlc3Ryb3kgdGhlIG90aGVyIHZhbHVlcy5cbiAgICAgICAgbGV0IHN1bUluZmluaXRlID0gMDsgLy8gTmVlZHMgbW9yZSBpbnZlc3RpZ2F0aW9uIHNpbmNlIHdlIGFyZSByZWFsbHkgdHJ5aW5nIHRvIHJldGFpbiBzaWducy5cbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBzdW0gPSBOYU47XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRmluaXRlKHZhbHVlKSlcbiAgICAgICAgICAgICAgICBzdW0gKz0gdmFsdWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3VtSW5maW5pdGUgKz1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPiAwID8gKCsxKSA6ICgtMSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaXNOYU4oc3VtKSA/IE5hTiA6IChzdW1JbmZpbml0ZSA/IChzdW1JbmZpbml0ZSAqIEluZmluaXR5KSA6IHN1bSk7XG4gICAgfVxuICAgIC8vIE11bHRpcGxpY2F0aW9uLi4uXG4gICAgcHJvZHVjdChzZWxlY3RvciA9IFR5cGUubnVtYmVyT3JOYU4pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDEsIGV4aXN0cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIGV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBOYU47XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlID09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAwOyAvLyBNdWx0aXBseWluZyBieSB6ZXJvIHdpbGwgYWx3YXlzIGVuZCBpbiB6ZXJvLlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE11bHRpcGxpY2F0aW9uIGNhbiBuZXZlciByZWNvdmVyIGZyb20gaW5maW5pdHkgYW5kIHNpbXBseSBtdXN0IHJldGFpbiBzaWducy5cbiAgICAgICAgICAgIC8vIFlvdSBjb3VsZCBjYW5jZWwgb3V0IGluZmluaXR5IHdpdGggMS9pbmZpbml0eSBidXQgbm8gYXZhaWxhYmxlIHJlcHJlc2VudGF0aW9uIGV4aXN0cy5cbiAgICAgICAgICAgIHJlc3VsdCAqPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoZXhpc3RzICYmIGlzTmFOKHJlc3VsdCkpID8gTmFOIDogcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUYWtlcyB0aGUgZmlyc3QgbnVtYmVyIGFuZCBkaXZpZGVzIGl0IGJ5IGFsbCBmb2xsb3dpbmcuXG4gICAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBxdW90aWVudChzZWxlY3RvciA9IFR5cGUubnVtYmVyT3JOYU4pIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IE5hTjtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IDAgfHwgIWlzRmluaXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBOYU47XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0IC89IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNvdW50ID09PSAxKVxuICAgICAgICAgICAgcmVzdWx0ID0gTmFOO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgLy8gI3JlZ2lvbiBTaW5nbGUgVmFsdWUgUmV0dXJuLi4uXG4gICAgbGFzdCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IFZPSUQwO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgXy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdmFsdWUgPSB4O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFmb3VuZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImxhc3Q6Tm8gZWxlbWVudCBzYXRpc2ZpZXMgdGhlIGNvbmRpdGlvbi5cIik7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgbGFzdE9yRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IFZPSUQwO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgXy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdmFsdWUgPSB4O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICghZm91bmQpID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICBtZW1vaXplKCkge1xuICAgICAgICBsZXQgc291cmNlID0gbmV3IExhenlMaXN0KHRoaXMpO1xuICAgICAgICByZXR1cm4gKG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBzb3VyY2UuZ2V0RW51bWVyYXRvcigpLCAoKSA9PiB7XG4gICAgICAgICAgICBzb3VyY2UuZGlzcG9zZSgpO1xuICAgICAgICAgICAgc291cmNlID0gbnVsbDtcbiAgICAgICAgfSwgdGhpcy5pc0VuZGxlc3MpKTtcbiAgICB9XG4gICAgdGhyb3dXaGVuRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKFJFVFVSTiwgbnVsbCwgdGhpcy5pc0VuZGxlc3MsIGNvdW50ID0+IHtcbiAgICAgICAgICAgIGlmICghY291bnQpXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJDb2xsZWN0aW9uIGlzIGVtcHR5LlwiO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyBQcm92aWRlZCBmb3IgdHlwZSBndWFyZGluZy5cbmV4cG9ydCBjbGFzcyBGaW5pdGVFbnVtZXJhYmxlIGV4dGVuZHMgTGlucUVudW1lcmFibGUge1xuICAgIGNvbnN0cnVjdG9yKGVudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIpIHtcbiAgICAgICAgc3VwZXIoZW51bWVyYXRvckZhY3RvcnksIGZpbmFsaXplciwgZmFsc2UpO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiRmluaXRlRW51bWVyYWJsZVwiO1xuICAgIH1cbn1cbmNsYXNzIEFycmF5RW51bWVyYWJsZSBleHRlbmRzIEZpbml0ZUVudW1lcmFibGUge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSkge1xuICAgICAgICBzdXBlcigoKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheUVudW1lcmF0b3IoKCkgPT4ge1xuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKFwiVGhlIHVuZGVybHlpbmcgQXJyYXlFbnVtZXJhYmxlIHdhcyBkaXNwb3NlZC5cIiwgXCJBcnJheUVudW1lcmF0b3JcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uX3NvdXJjZTsgLy8gU2hvdWxkIG5ldmVyIGJlIG51bGwsIGJ1dCBBcnJheUVudW1lcmFibGUgaWYgbm90IGRpc3Bvc2VkIHNpbXBseSB0cmVhdHMgbnVsbCBhcyBlbXB0eSBhcnJheS5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJBcnJheUVudW1lcmFibGVcIjtcbiAgICAgICAgXy5fc291cmNlID0gc291cmNlO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IE5VTEw7XG4gICAgfVxuICAgIGdldCBzb3VyY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zb3VyY2U7XG4gICAgfVxuICAgIHRvQXJyYXkoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gZW51bVV0aWwudG9BcnJheShfLl9zb3VyY2UpO1xuICAgIH1cbiAgICBhc0VudW1lcmFibGUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5RW51bWVyYWJsZSh0aGlzLl9zb3VyY2UpO1xuICAgIH1cbiAgICBmb3JFYWNoKGFjdGlvbiwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBlbnVtVXRpbC5mb3JFYWNoKF8uX3NvdXJjZSwgYWN0aW9uLCBtYXgpO1xuICAgIH1cbiAgICAvLyBUaGVzZSBtZXRob2RzIHNob3VsZCBBTFdBWVMgY2hlY2sgZm9yIGFycmF5IGxlbmd0aCBiZWZvcmUgYXR0ZW1wdGluZyBhbnl0aGluZy5cbiAgICBhbnkocHJlZGljYXRlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBfLl9zb3VyY2U7XG4gICAgICAgIGxldCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICByZXR1cm4gISFsZW4gJiYgKCFwcmVkaWNhdGUgfHwgc3VwZXIuYW55KHByZWRpY2F0ZSkpO1xuICAgIH1cbiAgICBjb3VudChwcmVkaWNhdGUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZSwgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGxlbiAmJiAocHJlZGljYXRlID8gc3VwZXIuY291bnQocHJlZGljYXRlKSA6IGxlbik7XG4gICAgfVxuICAgIGVsZW1lbnRBdE9yRGVmYXVsdChpbmRleCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgsICdpbmRleCcpO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBfLl9zb3VyY2U7XG4gICAgICAgIHJldHVybiBpbmRleCA8IHNvdXJjZS5sZW5ndGhcbiAgICAgICAgICAgID8gc291cmNlW2luZGV4XVxuICAgICAgICAgICAgOiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuICAgIGxhc3QoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBfLl9zb3VyY2UsIGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiAobGVuKVxuICAgICAgICAgICAgPyBzb3VyY2VbbGVuIC0gMV1cbiAgICAgICAgICAgIDogc3VwZXIubGFzdCgpO1xuICAgIH1cbiAgICBsYXN0T3JEZWZhdWx0KGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlLCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICByZXR1cm4gbGVuXG4gICAgICAgICAgICA/IHNvdXJjZVtsZW4gLSAxXVxuICAgICAgICAgICAgOiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuICAgIHNraXAoY291bnQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghKGNvdW50ID4gMCkpXG4gICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBuZXcgQXJyYXlFbnVtZXJhdG9yKCgpID0+IF8uX3NvdXJjZSwgY291bnQpKTtcbiAgICB9XG4gICAgdGFrZUV4Y2VwdExhc3QoY291bnQgPSAxKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gXy50YWtlKF8uX3NvdXJjZS5sZW5ndGggLSBjb3VudCk7XG4gICAgfVxuICAgIHNraXBUb0xhc3QoY291bnQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghKGNvdW50ID4gMCkpXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICBjb25zdCBsZW4gPSBfLl9zb3VyY2VcbiAgICAgICAgICAgID8gXy5fc291cmNlLmxlbmd0aFxuICAgICAgICAgICAgOiAwO1xuICAgICAgICByZXR1cm4gXy5za2lwKGxlbiAtIGNvdW50KTtcbiAgICB9XG4gICAgcmV2ZXJzZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluZGV4RW51bWVyYXRvcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHMgPSBfLl9zb3VyY2U7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkIHx8ICFzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHMsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IChzLmxlbmd0aCAtIDEpLFxuICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiAtMVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWVtb2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXNFbnVtZXJhYmxlKCk7XG4gICAgfVxuICAgIHNlcXVlbmNlRXF1YWwoc2Vjb25kLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWxWYWx1ZXMpIHtcbiAgICAgICAgaWYgKFR5cGUuaXNBcnJheUxpa2Uoc2Vjb25kKSlcbiAgICAgICAgICAgIHJldHVybiBBcnJheXMuYXJlRXF1YWwodGhpcy5zb3VyY2UsIHNlY29uZCwgdHJ1ZSwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgICAgIGlmIChzZWNvbmQgaW5zdGFuY2VvZiBBcnJheUVudW1lcmFibGUpXG4gICAgICAgICAgICByZXR1cm4gc2Vjb25kLnNlcXVlbmNlRXF1YWwodGhpcy5zb3VyY2UsIGVxdWFsaXR5Q29tcGFyZXIpO1xuICAgICAgICByZXR1cm4gc3VwZXIuc2VxdWVuY2VFcXVhbChzZWNvbmQsIGVxdWFsaXR5Q29tcGFyZXIpO1xuICAgIH1cbiAgICB0b0pvaW5lZFN0cmluZyhzZXBhcmF0b3IgPSBcIlwiLCBzZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5fc291cmNlO1xuICAgICAgICByZXR1cm4gIXNlbGVjdG9yICYmIChzKSBpbnN0YW5jZW9mIChBcnJheSlcbiAgICAgICAgICAgID8gcy5qb2luKHNlcGFyYXRvcilcbiAgICAgICAgICAgIDogc3VwZXIudG9Kb2luZWRTdHJpbmcoc2VwYXJhdG9yLCBzZWxlY3Rvcik7XG4gICAgfVxufVxuY2xhc3MgR3JvdXBpbmcgZXh0ZW5kcyBBcnJheUVudW1lcmFibGUge1xuICAgIGNvbnN0cnVjdG9yKF9ncm91cEtleSwgZWxlbWVudHMpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudHMpO1xuICAgICAgICB0aGlzLl9ncm91cEtleSA9IF9ncm91cEtleTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIkdyb3VwaW5nXCI7XG4gICAgfVxuICAgIGdldCBrZXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ncm91cEtleTtcbiAgICB9XG59XG5jbGFzcyBMb29rdXAge1xuICAgIGNvbnN0cnVjdG9yKF9kaWN0aW9uYXJ5KSB7XG4gICAgICAgIHRoaXMuX2RpY3Rpb25hcnkgPSBfZGljdGlvbmFyeTtcbiAgICB9XG4gICAgZ2V0IGNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGljdGlvbmFyeS5jb3VudDtcbiAgICB9XG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGljdGlvbmFyeS5nZXRWYWx1ZShrZXkpIHx8IG51bGw7XG4gICAgfVxuICAgIGNvbnRhaW5zKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGljdGlvbmFyeS5jb250YWluc0tleShrZXkpO1xuICAgIH1cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uX2RpY3Rpb25hcnkuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKCFlbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihuZXcgR3JvdXBpbmcoY3VycmVudC5rZXksIGN1cnJlbnQudmFsdWUpKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuY2xhc3MgT3JkZXJlZEVudW1lcmFibGUgZXh0ZW5kcyBGaW5pdGVFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UsIGtleVNlbGVjdG9yLCBvcmRlciwgcGFyZW50LCBjb21wYXJlciA9IGNvbXBhcmVWYWx1ZXMpIHtcbiAgICAgICAgc3VwZXIoTlVMTCk7XG4gICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgICAgICB0aGlzLmtleVNlbGVjdG9yID0ga2V5U2VsZWN0b3I7XG4gICAgICAgIHRoaXMub3JkZXIgPSBvcmRlcjtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMuY29tcGFyZXIgPSBjb21wYXJlcjtcbiAgICAgICAgdGhyb3dJZkVuZGxlc3Moc291cmNlICYmIHNvdXJjZS5pc0VuZGxlc3MpO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiT3JkZXJlZEVudW1lcmFibGVcIjtcbiAgICB9XG4gICAgY3JlYXRlT3JkZXJlZEVudW1lcmFibGUoa2V5U2VsZWN0b3IsIG9yZGVyKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcy5zb3VyY2UsIGtleVNlbGVjdG9yLCBvcmRlciwgdGhpcyk7XG4gICAgfVxuICAgIHRoZW5CeShrZXlTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVPcmRlcmVkRW51bWVyYWJsZShrZXlTZWxlY3RvciwgMSAvKiBBc2NlbmRpbmcgKi8pO1xuICAgIH1cbiAgICB0aGVuVXNpbmcoY29tcGFyaXNvbikge1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMuc291cmNlLCBudWxsLCAxIC8qIEFzY2VuZGluZyAqLywgdGhpcywgY29tcGFyaXNvbik7XG4gICAgfVxuICAgIHRoZW5CeURlc2NlbmRpbmcoa2V5U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlT3JkZXJlZEVudW1lcmFibGUoa2V5U2VsZWN0b3IsIC0xIC8qIERlc2NlbmRpbmcgKi8pO1xuICAgIH1cbiAgICB0aGVuVXNpbmdSZXZlcnNlZChjb21wYXJpc29uKSB7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcy5zb3VyY2UsIG51bGwsIC0xIC8qIERlc2NlbmRpbmcgKi8sIHRoaXMsIGNvbXBhcmlzb24pO1xuICAgIH1cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IGJ1ZmZlcjtcbiAgICAgICAgbGV0IGluZGV4ZXM7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIGJ1ZmZlciA9IEVudW1lcmFibGUudG9BcnJheShfLnNvdXJjZSk7XG4gICAgICAgICAgICBpbmRleGVzID0gY3JlYXRlU29ydENvbnRleHQoXylcbiAgICAgICAgICAgICAgICAuZ2VuZXJhdGVTb3J0ZWRJbmRleGVzKGJ1ZmZlcik7XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIChpbmRleCA8IGluZGV4ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihidWZmZXJbaW5kZXhlc1tpbmRleCsrXV0pXG4gICAgICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGJ1ZmZlciA9IE5VTEw7XG4gICAgICAgICAgICBpZiAoaW5kZXhlcylcbiAgICAgICAgICAgICAgICBpbmRleGVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBpbmRleGVzID0gTlVMTDtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBfLnNvdXJjZSA9IE5VTEw7XG4gICAgICAgIF8ua2V5U2VsZWN0b3IgPSBOVUxMO1xuICAgICAgICBfLm9yZGVyID0gTlVMTDtcbiAgICAgICAgXy5wYXJlbnQgPSBOVUxMO1xuICAgIH1cbn1cbi8vIEEgcHJpdmF0ZSBzdGF0aWMgaGVscGVyIGZvciB0aGUgd2VhdmUgZnVuY3Rpb24uXG5mdW5jdGlvbiBuZXh0RW51bWVyYXRvcihxdWV1ZSwgZSkge1xuICAgIGlmIChlKSB7XG4gICAgICAgIGlmIChlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIHF1ZXVlLmVucXVldWUoZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZSlcbiAgICAgICAgICAgICAgICBlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlO1xufVxuLyoqXG4gKiBSZWN1cnNpdmVseSBidWlsZHMgYSBTb3J0Q29udGV4dCBjaGFpbi5cbiAqIEBwYXJhbSBvcmRlcmVkRW51bWVyYWJsZVxuICogQHBhcmFtIGN1cnJlbnRDb250ZXh0XG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBjcmVhdGVTb3J0Q29udGV4dChvcmRlcmVkRW51bWVyYWJsZSwgY3VycmVudENvbnRleHQgPSBudWxsKSB7XG4gICAgY29uc3QgY29udGV4dCA9IG5ldyBLZXlTb3J0ZWRDb250ZXh0KGN1cnJlbnRDb250ZXh0LCBvcmRlcmVkRW51bWVyYWJsZS5rZXlTZWxlY3Rvciwgb3JkZXJlZEVudW1lcmFibGUub3JkZXIsIG9yZGVyZWRFbnVtZXJhYmxlLmNvbXBhcmVyKTtcbiAgICBpZiAob3JkZXJlZEVudW1lcmFibGUucGFyZW50KVxuICAgICAgICByZXR1cm4gY3JlYXRlU29ydENvbnRleHQob3JkZXJlZEVudW1lcmFibGUucGFyZW50LCBjb250ZXh0KTtcbiAgICByZXR1cm4gY29udGV4dDtcbn1cbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5mdW5jdGlvbiB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpIHtcbiAgICBpZiAoZGlzcG9zZWQpXG4gICAgICAgIHRocm93IG5ldyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbihcIkVudW1lcmFibGVcIik7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnQgZnVuY3Rpb24gRW51bWVyYWJsZShzb3VyY2UsIC4uLmFkZGl0aW9uYWwpIHtcbiAgICByZXR1cm4gZW51bWVyYWJsZUZyb20oc291cmNlLCBhZGRpdGlvbmFsKTtcbn1cbmZ1bmN0aW9uIGVudW1lcmFibGVGcm9tKHNvdXJjZSwgYWRkaXRpb25hbCkge1xuICAgIGxldCBlID0gRW51bWVyYWJsZS5mcm9tQW55KHNvdXJjZSk7XG4gICAgaWYgKCFlKVxuICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKCk7XG4gICAgcmV0dXJuIChhZGRpdGlvbmFsICYmIGFkZGl0aW9uYWwubGVuZ3RoKVxuICAgICAgICA/IGUubWVyZ2UoYWRkaXRpb25hbClcbiAgICAgICAgOiBlO1xufVxuKGZ1bmN0aW9uIChFbnVtZXJhYmxlKSB7XG4gICAgZnVuY3Rpb24gZnJvbShzb3VyY2UsIC4uLmFkZGl0aW9uYWwpIHtcbiAgICAgICAgcmV0dXJuIGVudW1lcmFibGVGcm9tKHNvdXJjZSwgYWRkaXRpb25hbCk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZnJvbSA9IGZyb207XG4gICAgZnVuY3Rpb24gZnJvbUFueShzb3VyY2UsIGRlZmF1bHRFbnVtZXJhYmxlKSB7XG4gICAgICAgIGlmIChUeXBlLmlzT2JqZWN0KHNvdXJjZSkgfHwgVHlwZS5pc1N0cmluZyhzb3VyY2UpKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgSW5maW5pdGVMaW5xRW51bWVyYWJsZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgICAgICAgaWYgKFR5cGUuaXNBcnJheUxpa2Uoc291cmNlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5RW51bWVyYWJsZShzb3VyY2UpO1xuICAgICAgICAgICAgaWYgKGlzRW51bWVyYWJsZShzb3VyY2UpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gc291cmNlLmdldEVudW1lcmF0b3IoKSwgbnVsbCwgc291cmNlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICBpZiAoaXNFbnVtZXJhdG9yKHNvdXJjZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBzb3VyY2UsIG51bGwsIHNvdXJjZS5pc0VuZGxlc3MpO1xuICAgICAgICAgICAgaWYgKGlzSXRlcmF0b3Ioc291cmNlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbUFueShuZXcgSXRlcmF0b3JFbnVtZXJhdG9yKHNvdXJjZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFR5cGUuaXNGdW5jdGlvbihzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4gbmV3IEluZmluaXRlRW51bWVyYXRvcihzb3VyY2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmYXVsdEVudW1lcmFibGU7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZnJvbUFueSA9IGZyb21Bbnk7XG4gICAgZnVuY3Rpb24gZnJvbVRoZXNlKHNvdXJjZXMpIHtcbiAgICAgICAgc3dpdGNoIChzb3VyY2VzID8gc291cmNlcy5sZW5ndGggOiAwKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgLy8gQWxsb3cgZm9yIHZhbGlkYXRpb24gYW5kIHRocm93aW5nLi4uXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudW1lcmFibGVGcm9tKHNvdXJjZXNbMF0pO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHkoKS5tZXJnZShzb3VyY2VzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZyb21UaGVzZSA9IGZyb21UaGVzZTtcbiAgICBmdW5jdGlvbiBmcm9tT3JFbXB0eShzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIGZyb21Bbnkoc291cmNlKSB8fCBlbXB0eSgpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZyb21PckVtcHR5ID0gZnJvbU9yRW1wdHk7XG4gICAgLyoqXG4gICAgICogU3RhdGljIGhlbHBlciBmb3IgY29udmVydGluZyBlbnVtZXJhYmxlcyB0byBhbiBhcnJheS5cbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b0FycmF5KHNvdXJjZSkge1xuICAgICAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgTGlucUVudW1lcmFibGUpXG4gICAgICAgICAgICByZXR1cm4gc291cmNlLnRvQXJyYXkoKTtcbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLnRvQXJyYXkoc291cmNlKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS50b0FycmF5ID0gdG9BcnJheTtcbiAgICBmdW5jdGlvbiBfY2hvaWNlKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4gbmV3IEVudW1lcmF0b3JCYXNlKG51bGwsICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXZhbHVlcyk7XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihSYW5kb20uc2VsZWN0Lm9uZSh2YWx1ZXMpKTtcbiAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICApLCAoKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHZhbHVlcyA9IE5VTEw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLl9jaG9pY2UgPSBfY2hvaWNlO1xuICAgIGZ1bmN0aW9uIGNob2ljZSh2YWx1ZXMpIHtcbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoO1xuICAgICAgICAvLyBXZSBjb3VsZCByZXR1cm4gZW1wdHkgaWYgbm8gbGVuZ3RoLCBidXQgdGhhdCB3b3VsZCBicmVhayB0aGUgdHlwaW5nIGFuZCBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAgICAgICAgLy8gRW5mb3JjaW5nIHRoYXQgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAxIGNob2ljZSBpcyBrZXkuXG4gICAgICAgIGlmICghbGVuIHx8ICFpc0Zpbml0ZShsZW4pKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbGVuZ3RoJywgbGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIF9jaG9pY2UoY29weSh2YWx1ZXMpKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5jaG9pY2UgPSBjaG9pY2U7XG4gICAgZnVuY3Rpb24gY2hvb3NlRnJvbSguLi5hcmdzKSB7XG4gICAgICAgIC8vIFdlIGNvdWxkIHJldHVybiBlbXB0eSBpZiBubyBsZW5ndGgsIGJ1dCB0aGF0IHdvdWxkIGJyZWFrIHRoZSB0eXBpbmcgYW5kIHByb2R1Y2UgdW5leHBlY3RlZCByZXN1bHRzLlxuICAgICAgICAvLyBFbmZvcmNpbmcgdGhhdCB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IDEgY2hvaWNlIGlzIGtleS5cbiAgICAgICAgaWYgKCFhcmdzLmxlbmd0aClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2xlbmd0aCcsIGxlbmd0aCk7XG4gICAgICAgIHJldHVybiBfY2hvaWNlKGFyZ3MpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmNob29zZUZyb20gPSBjaG9vc2VGcm9tO1xuICAgIGZ1bmN0aW9uIF9jeWNsZSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9LCAvLyBSZWluaXRpYWxpemUgdGhlIHZhbHVlIGp1c3QgaW4gY2FzZSB0aGUgZW51bWVyYXRvciBpcyByZXN0YXJ0ZWQuXG4gICAgICAgICAgICAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghdmFsdWVzKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gdmFsdWVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlc1tpbmRleCsrXSk7XG4gICAgICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICApO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHZhbHVlcyA9IE5VTEw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjeWNsZSh2YWx1ZXMpIHtcbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoO1xuICAgICAgICAvLyBXZSBjb3VsZCByZXR1cm4gZW1wdHkgaWYgbm8gbGVuZ3RoLCBidXQgdGhhdCB3b3VsZCBicmVhayB0aGUgdHlwaW5nIGFuZCBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAgICAgICAgLy8gRW5mb3JjaW5nIHRoYXQgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAxIGNob2ljZSBpcyBrZXkuXG4gICAgICAgIGlmICghbGVuIHx8ICFpc0Zpbml0ZShsZW4pKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbGVuZ3RoJywgbGVuZ3RoKTtcbiAgICAgICAgLy8gTWFrZSBhIGNvcHkgdG8gYXZvaWQgbW9kaWZ5aW5nIHRoZSBjb2xsZWN0aW9uIGFzIHdlIGdvLlxuICAgICAgICByZXR1cm4gX2N5Y2xlKGNvcHkodmFsdWVzKSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuY3ljbGUgPSBjeWNsZTtcbiAgICBmdW5jdGlvbiBjeWNsZVRocm91Z2goLi4uYXJncykge1xuICAgICAgICAvLyBXZSBjb3VsZCByZXR1cm4gZW1wdHkgaWYgbm8gbGVuZ3RoLCBidXQgdGhhdCB3b3VsZCBicmVhayB0aGUgdHlwaW5nIGFuZCBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAgICAgICAgLy8gRW5mb3JjaW5nIHRoYXQgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAxIGNob2ljZSBpcyBrZXkuXG4gICAgICAgIGlmICghYXJncy5sZW5ndGgpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdsZW5ndGgnLCBsZW5ndGgpO1xuICAgICAgICByZXR1cm4gX2N5Y2xlKGFyZ3MpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmN5Y2xlVGhyb3VnaCA9IGN5Y2xlVGhyb3VnaDtcbiAgICBmdW5jdGlvbiBlbXB0eSgpIHtcbiAgICAgICAgLy8gQ291bGQgYmUgc2luZ2xlIGV4cG9ydCBmdW5jdGlvbiBpbnN0YW5jZSwgYnV0IGZvciBzYWZldHksIHdlJ2xsIG1ha2UgYSBuZXcgb25lLlxuICAgICAgICByZXR1cm4gbmV3IEZpbml0ZUVudW1lcmFibGUoZ2V0RW1wdHlFbnVtZXJhdG9yKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5lbXB0eSA9IGVtcHR5O1xuICAgIGZ1bmN0aW9uIHJlcGVhdChlbGVtZW50LCBjb3VudCA9IEluZmluaXR5KSB7XG4gICAgICAgIGlmICghKGNvdW50ID4gMCkpXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICByZXR1cm4gaXNGaW5pdGUoY291bnQpICYmIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpXG4gICAgICAgICAgICA/IG5ldyBGaW5pdGVFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYyA9IGNvdW50O1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7IGluZGV4ID0gMDsgfSwgKHlpZWxkZXIpID0+IChpbmRleCsrIDwgYykgJiYgeWllbGRlci55aWVsZFJldHVybihlbGVtZW50KSwgbnVsbCwgZmFsc2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IG5ldyBFbnVtZXJhdG9yQmFzZShudWxsLCAoeWllbGRlcikgPT4geWllbGRlci55aWVsZFJldHVybihlbGVtZW50KSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUucmVwZWF0ID0gcmVwZWF0O1xuICAgIGZ1bmN0aW9uIHJlcGVhdFdpdGhGaW5hbGl6ZShpbml0aWFsaXplciwgZmluYWxpemVyKSB7XG4gICAgICAgIGlmICghaW5pdGlhbGl6ZXIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiaW5pdGlhbGl6ZXJcIik7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpbml0aWFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGluaXRpYWxpemVyKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbml0aWFsaXplclxuICAgICAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgOiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gTlVMTDtcbiAgICAgICAgICAgICAgICBpZiAoZmluYWxpemVyKVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGl6ZXIoZWxlbWVudCk7XG4gICAgICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICApO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpbml0aWFsaXplciA9IE5VTEw7XG4gICAgICAgICAgICBmaW5hbGl6ZXIgPSBWT0lEMDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUucmVwZWF0V2l0aEZpbmFsaXplID0gcmVwZWF0V2l0aEZpbmFsaXplO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZW51bWVyYWJsZSBvZiBvbmUgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAqIEByZXR1cm5zIHtGaW5pdGVFbnVtZXJhYmxlPFQ+fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1ha2UoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gcmVwZWF0KGVsZW1lbnQsIDEpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1ha2UgPSBtYWtlO1xuICAgIC8vIHN0YXJ0IGFuZCBzdGVwIGNhbiBiZSBvdGhlciB0aGFuIGludGVnZXIuXG4gICAgZnVuY3Rpb24gcmFuZ2Uoc3RhcnQsIGNvdW50LCBzdGVwID0gMSkge1xuICAgICAgICBpZiAoIWlzRmluaXRlKHN0YXJ0KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGFydFwiLCBzdGFydCwgXCJNdXN0IGJlIGEgZmluaXRlIG51bWJlci5cIik7XG4gICAgICAgIGlmICghKGNvdW50ID4gMCkpXG4gICAgICAgICAgICByZXR1cm4gZW1wdHkoKTtcbiAgICAgICAgaWYgKCFzdGVwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgdmFsaWQgdmFsdWVcIik7XG4gICAgICAgIGlmICghaXNGaW5pdGUoc3RlcCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIik7XG4gICAgICAgIHJldHVybiBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICBsZXQgYyA9IGNvdW50OyAvLyBGb3JjZSBpbnRlZ2VyIGV2YWx1YXRpb24uXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc3RhcnQ7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBpbmRleCsrIDwgY1xuICAgICAgICAgICAgICAgICAgICAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIGluZGV4IDwgY291bnQpXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUucmFuZ2UgPSByYW5nZTtcbiAgICBmdW5jdGlvbiByYW5nZURvd24oc3RhcnQsIGNvdW50LCBzdGVwID0gMSkge1xuICAgICAgICBzdGVwID0gTWF0aC5hYnMoc3RlcCkgKiAtMTtcbiAgICAgICAgcmV0dXJuIHJhbmdlKHN0YXJ0LCBjb3VudCwgc3RlcCk7XG4gICAgfVxuICAgIEVudW1lcmFibGUucmFuZ2VEb3duID0gcmFuZ2VEb3duO1xuICAgIC8vIHN0ZXAgPSAtMSBiZWhhdmVzIHRoZSBzYW1lIGFzIHRvTmVnYXRpdmVJbmZpbml0eTtcbiAgICBmdW5jdGlvbiB0b0luZmluaXR5KHN0YXJ0ID0gMCwgc3RlcCA9IDEpIHtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShzdGFydCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RhcnRcIiwgc3RhcnQsIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICBpZiAoIXN0ZXApXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSB2YWxpZCB2YWx1ZVwiKTtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShzdGVwKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGVwXCIsIHN0ZXAsIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzdGFydDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBzdGVwO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUudG9JbmZpbml0eSA9IHRvSW5maW5pdHk7XG4gICAgZnVuY3Rpb24gdG9OZWdhdGl2ZUluZmluaXR5KHN0YXJ0ID0gMCwgc3RlcCA9IDEpIHtcbiAgICAgICAgcmV0dXJuIHRvSW5maW5pdHkoc3RhcnQsIC1zdGVwKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS50b05lZ2F0aXZlSW5maW5pdHkgPSB0b05lZ2F0aXZlSW5maW5pdHk7XG4gICAgZnVuY3Rpb24gcmFuZ2VUbyhzdGFydCwgdG8sIHN0ZXAgPSAxKSB7XG4gICAgICAgIGlmIChpc05hTih0bykgfHwgIWlzRmluaXRlKHRvKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJ0b1wiLCB0bywgXCJNdXN0IGJlIGEgZmluaXRlIG51bWJlci5cIik7XG4gICAgICAgIGlmIChzdGVwICYmICFpc0Zpbml0ZShzdGVwKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGVwXCIsIHN0ZXAsIFwiTXVzdCBiZSBhIGZpbml0ZSBub24temVybyBudW1iZXIuXCIpO1xuICAgICAgICAvLyBUaGlzIHdheSB3ZSBhZGp1c3QgZm9yIHRoZSBkZWx0YSBmcm9tIHN0YXJ0IGFuZCB0byBzbyB0aGUgdXNlciBjYW4gc2F5ICsvLSBzdGVwIGFuZCBpdCB3aWxsIHdvcmsgYXMgZXhwZWN0ZWQuXG4gICAgICAgIHN0ZXAgPSBNYXRoLmFicyhzdGVwKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGaW5pdGVFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4geyB2YWx1ZSA9IHN0YXJ0OyB9LCBzdGFydCA8IHRvXG4gICAgICAgICAgICAgICAgPyB5aWVsZGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlIDw9IHRvICYmIHlpZWxkZXIueWllbGRSZXR1cm4odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiB5aWVsZGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlID49IHRvICYmIHlpZWxkZXIueWllbGRSZXR1cm4odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgLT0gc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJhbmdlVG8gPSByYW5nZVRvO1xuICAgIGZ1bmN0aW9uIG1hdGNoZXMoaW5wdXQsIHBhdHRlcm4sIGZsYWdzID0gXCJcIikge1xuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJpbnB1dFwiKTtcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBpbnB1dDtcbiAgICAgICAgaWYgKHR5cGUgIT0gVHlwZS5TVFJJTkcpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZXhlYyBSZWdFeHAgbWF0Y2hlcyBvZiB0eXBlICdcIiArIHR5cGUgKyBcIicuXCIpO1xuICAgICAgICBpZiAocGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgZmxhZ3MgKz0gKHBhdHRlcm4uaWdub3JlQ2FzZSkgPyBcImlcIiA6IFwiXCI7XG4gICAgICAgICAgICBmbGFncyArPSAocGF0dGVybi5tdWx0aWxpbmUpID8gXCJtXCIgOiBcIlwiO1xuICAgICAgICAgICAgcGF0dGVybiA9IHBhdHRlcm4uc291cmNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmbGFncy5pbmRleE9mKFwiZ1wiKSA9PT0gLTEpXG4gICAgICAgICAgICBmbGFncyArPSBcImdcIjtcbiAgICAgICAgcmV0dXJuIG5ldyBGaW5pdGVFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCByZWdleDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBmbGFncyk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIENhbGxpbmcgcmVnZXguZXhlYyBjb25zZWN1dGl2ZWx5IG9uIHRoZSBzYW1lIGlucHV0IHVzZXMgdGhlIGxhc3RJbmRleCB0byBzdGFydCB0aGUgbmV4dCBtYXRjaC5cbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKGlucHV0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2ggIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4obWF0Y2gpXG4gICAgICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUubWF0Y2hlcyA9IG1hdGNoZXM7XG4gICAgZnVuY3Rpb24gZ2VuZXJhdGUoZmFjdG9yeSwgY291bnQgPSBJbmZpbml0eSkge1xuICAgICAgICBpZiAoIWZhY3RvcnkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiZmFjdG9yeVwiKTtcbiAgICAgICAgaWYgKGlzTmFOKGNvdW50KSB8fCBjb3VudCA8PSAwKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKGNvdW50KSAmJiBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKVxuICAgICAgICAgICAgPyBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjb3VudDtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBpbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudCA8IGMgJiYgeWllbGRlci55aWVsZFJldHVybihmYWN0b3J5KGN1cnJlbnQpKTtcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmFjdG9yeSA9IE5VTEw7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGZhY3RvcnkoaW5kZXgrKykpO1xuICAgICAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZhY3RvcnkgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbiAgICB2YXIgcmFuZG9tO1xuICAgIChmdW5jdGlvbiAocmFuZG9tKSB7XG4gICAgICAgIGZ1bmN0aW9uIGZsb2F0cyhtYXhFeGNsdXNpdmUgPSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGUoUmFuZG9tLmdlbmVyYXRlKG1heEV4Y2x1c2l2ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJhbmRvbS5mbG9hdHMgPSBmbG9hdHM7XG4gICAgICAgIGZ1bmN0aW9uIGludGVnZXJzKGJvdW5kYXJ5LCBpbmNsdXNpdmUpIHtcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZShSYW5kb20uZ2VuZXJhdGUuaW50ZWdlcnMoYm91bmRhcnksIGluY2x1c2l2ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJhbmRvbS5pbnRlZ2VycyA9IGludGVnZXJzO1xuICAgIH0pKHJhbmRvbSA9IEVudW1lcmFibGUucmFuZG9tIHx8IChFbnVtZXJhYmxlLnJhbmRvbSA9IHt9KSk7XG4gICAgZnVuY3Rpb24gdW5mb2xkKHNlZWQsIHZhbHVlRmFjdG9yeSwgc2tpcFNlZWQgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXZhbHVlRmFjdG9yeSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJmYWN0b3J5XCIpO1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc2VlZDtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gIXNraXBTZWVkO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXZhbHVlRmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgbGV0IGkgPSBpbmRleCsrO1xuICAgICAgICAgICAgICAgIGlmIChpc0ZpcnN0KVxuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlRmFjdG9yeSh2YWx1ZSwgaSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4odmFsdWUpO1xuICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdmFsdWVGYWN0b3J5ID0gTlVMTDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUudW5mb2xkID0gdW5mb2xkO1xuICAgIGZ1bmN0aW9uIGZvckVhY2goZW51bWVyYWJsZSwgYWN0aW9uLCBtYXggPSBJbmZpbml0eSkge1xuICAgICAgICAvLyBXaWxsIHByb3Blcmx5IGRpc3Bvc2UgY3JlYXRlZCBlbnVtZXJhYmxlLlxuICAgICAgICAvLyBXaWxsIHRocm93IGlmIGVudW1lcmFibGUgaXMgZW5kbGVzcy5cbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLmZvckVhY2goZW51bWVyYWJsZSwgYWN0aW9uLCBtYXgpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZvckVhY2ggPSBmb3JFYWNoO1xuICAgIGZ1bmN0aW9uIG1hcChlbnVtZXJhYmxlLCBzZWxlY3Rvcikge1xuICAgICAgICAvLyBXaWxsIHByb3Blcmx5IGRpc3Bvc2UgY3JlYXRlZCBlbnVtZXJhYmxlLlxuICAgICAgICAvLyBXaWxsIHRocm93IGlmIGVudW1lcmFibGUgaXMgZW5kbGVzcy5cbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLm1hcChlbnVtZXJhYmxlLCBzZWxlY3Rvcik7XG4gICAgfVxuICAgIEVudW1lcmFibGUubWFwID0gbWFwO1xuICAgIC8vIFNsaWdodGx5IG9wdGltaXplZCB2ZXJzaW9ucyBmb3IgbnVtYmVycy5cbiAgICBmdW5jdGlvbiBtYXgodmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IHYgPSB2YWx1ZXNcbiAgICAgICAgICAgIC50YWtlVW50aWwodiA9PiB2ID09ICtJbmZpbml0eSwgdHJ1ZSlcbiAgICAgICAgICAgIC5hZ2dyZWdhdGUoRnVuY3Rpb25zLkdyZWF0ZXIpO1xuICAgICAgICByZXR1cm4gdiA9PT0gVk9JRDAgPyBOYU4gOiB2O1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1heCA9IG1heDtcbiAgICBmdW5jdGlvbiBtaW4odmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IHYgPSB2YWx1ZXNcbiAgICAgICAgICAgIC50YWtlVW50aWwodiA9PiB2ID09IC1JbmZpbml0eSwgdHJ1ZSlcbiAgICAgICAgICAgIC5hZ2dyZWdhdGUoRnVuY3Rpb25zLkxlc3Nlcik7XG4gICAgICAgIHJldHVybiB2ID09PSBWT0lEMCA/IE5hTiA6IHY7XG4gICAgfVxuICAgIEVudW1lcmFibGUubWluID0gbWluO1xuICAgIC8qKlxuICAgICAqIFRha2VzIGFueSBzZXQgb2YgY29sbGVjdGlvbnMgb2YgdGhlIHNhbWUgdHlwZSBhbmQgd2VhdmVzIHRoZW0gdG9nZXRoZXIuXG4gICAgICogQHBhcmFtIGVudW1lcmFibGVzXG4gICAgICogQHJldHVybnMge0VudW1lcmFibGU8VD59XG4gICAgICovXG4gICAgZnVuY3Rpb24gd2VhdmUoZW51bWVyYWJsZXMpIHtcbiAgICAgICAgaWYgKCFlbnVtZXJhYmxlcylcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2VudW1lcmFibGVzJyk7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBxdWV1ZTtcbiAgICAgICAgICAgIGxldCBtYWluRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gbmV3IFF1ZXVlKCk7XG4gICAgICAgICAgICAgICAgbWFpbkVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKGVudW1lcmFibGVzKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBsZXQgZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy8gRmlyc3QgcGFzcy4uLlxuICAgICAgICAgICAgICAgIGlmIChtYWluRW51bWVyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWUgJiYgbWFpbkVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSBtYWluRW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgZSA9IG5leHRFbnVtZXJhdG9yKHF1ZXVlLCBjID8gZW51bVV0aWwuZnJvbShjKSA6IE5VTEwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5FbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKCFlICYmIHF1ZXVlLnRyeURlcXVldWUodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlID0gbmV4dEVudW1lcmF0b3IocXVldWUsIGVudW1VdGlsLmZyb20odmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9KSkgeyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVcbiAgICAgICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKGUuY3VycmVudClcbiAgICAgICAgICAgICAgICAgICAgOiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcG9zZS50aGVzZS5ub0NvcHkocXVldWUuZHVtcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSBOVUxMO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWFpbkVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIG1haW5FbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBtYWluRW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS53ZWF2ZSA9IHdlYXZlO1xufSkoRW51bWVyYWJsZSB8fCAoRW51bWVyYWJsZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBFbnVtZXJhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlucS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtLkxpbnEvTGlucS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5jb25zdCBOQU1FID0gJ0V4Y2VwdGlvbic7XG4vKipcbiAqIFJlcHJlc2VudHMgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIGFwcGxpY2F0aW9uIGV4ZWN1dGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbiB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIEV4Y2VwdGlvbiBjbGFzcyB3aXRoIGEgc3BlY2lmaWVkIGVycm9yIG1lc3NhZ2UgYW5kIG9wdGlvbmFsbHkgYSByZWZlcmVuY2UgdG8gdGhlIGlubmVyIGV4Y2VwdGlvbiB0aGF0IGlzIHRoZSBjYXVzZSBvZiB0aGlzIGV4Y2VwdGlvbi5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSBpbm5lckV4Y2VwdGlvblxuICAgICAqIEBwYXJhbSBiZWZvcmVTZWFsaW5nIFRoaXMgZGVsZWdhdGUgaXMgdXNlZCB0byBhbGxvdyBhY3Rpb25zIHRvIG9jY3VyIGp1c3QgYmVmb3JlIHRoaXMgY29uc3RydWN0b3IgZmluaXNoZXMuICBTaW5jZSBzb21lIGNvbXBpbGVycyBkbyBub3QgYWxsb3cgdGhlIHVzZSBvZiAndGhpcycgYmVmb3JlIHN1cGVyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGlubmVyRXhjZXB0aW9uLCBiZWZvcmVTZWFsaW5nKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICB0aGlzLm5hbWUgPSBfLmdldE5hbWUoKTtcbiAgICAgICAgdGhpcy5kYXRhID0ge307XG4gICAgICAgIGlmIChpbm5lckV4Y2VwdGlvbilcbiAgICAgICAgICAgIF8uZGF0YVsnaW5uZXJFeGNlcHRpb24nXSA9IGlubmVyRXhjZXB0aW9uO1xuICAgICAgICAvKiBPcmlnaW5hbGx5IGludGVuZGVkIHRvIHVzZSAnZ2V0JyBhY2Nlc3NvcnMgZm9yIHByb3BlcnRpZXMsXG4gICAgICAgICAqIEJ1dCBkZWJ1Z2dlcnMgZG9uJ3QgZGlzcGxheSB0aGVzZSByZWFkaWx5IHlldC5cbiAgICAgICAgICogT2JqZWN0LmZyZWV6ZSBoYXMgdG8gYmUgdXNlZCBjYXJlZnVsbHksIGJ1dCB3aWxsIHByZXZlbnQgb3ZlcnJpZGluZyB2YWx1ZXMgYXQgcnVudGltZS5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChiZWZvcmVTZWFsaW5nKVxuICAgICAgICAgICAgYmVmb3JlU2VhbGluZyhfKTtcbiAgICAgICAgLy8gTm9kZSBoYXMgYSAuc3RhY2ssIGxldCdzIHVzZSBpdC4uLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHN0YWNrID0gZXZhbChcIm5ldyBFcnJvcigpXCIpLnN0YWNrO1xuICAgICAgICAgICAgc3RhY2sgPSBzdGFja1xuICAgICAgICAgICAgICAgICYmIHN0YWNrXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eRXJyb3JcXG4vLCAnJylcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLygufFxcbikrXFxzK2F0IG5ldy4rLywgJycpXG4gICAgICAgICAgICAgICAgfHwgJyc7XG4gICAgICAgICAgICB0aGlzLnN0YWNrID0gXy50b1N0cmluZ1dpdGhvdXRCcmFja2V0cygpICsgc3RhY2s7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGV4KSB7IH1cbiAgICAgICAgT2JqZWN0LmZyZWV6ZShfKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIHR5cGUuXG4gICAgICogVGhlIGRlZmF1bHQgaXMgJ0Vycm9yJy5cbiAgICAgKi9cbiAgICBnZXROYW1lKCkgeyByZXR1cm4gTkFNRTsgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIEV4Y2VwdGlvbiBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGBbJHt0aGlzLnRvU3RyaW5nV2l0aG91dEJyYWNrZXRzKCl9XWA7XG4gICAgfVxuICAgIHRvU3RyaW5nV2l0aG91dEJyYWNrZXRzKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgbSA9IF8ubWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIF8ubmFtZSArIChtID8gKCc6ICcgKyBtKSA6ICcnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBkYXRhIG9iamVjdC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICBmb3IgKGxldCBrIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGspKVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2tdO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFRhc2tIYW5kbGVyQmFzZSB9IGZyb20gXCIuL1Rhc2tIYW5kbGVyQmFzZVwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmV4cG9ydCBjbGFzcyBUYXNrSGFuZGxlciBleHRlbmRzIFRhc2tIYW5kbGVyQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX2FjdGlvbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hY3Rpb24gPSBfYWN0aW9uO1xuICAgICAgICBpZiAoIV9hY3Rpb24pXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhY3Rpb24nKTtcbiAgICB9XG4gICAgX29uRXhlY3V0ZSgpIHtcbiAgICAgICAgdGhpcy5fYWN0aW9uKCk7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fYWN0aW9uID0gbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBUYXNrSGFuZGxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhc2tIYW5kbGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vVGhyZWFkaW5nL1Rhc2tzL1Rhc2tIYW5kbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9IFwiVGFza0hhbmRsZXJCYXNlXCI7XG4vKipcbiAqIEEgc2ltcGxlIGNsYXNzIGZvciBoYW5kbGluZyBwb3RlbnRpYWxseSByZXBlYXRlZCBleGVjdXRpb25zIGVpdGhlciBkZWZlcnJlZCBvciBpbW1lZGlhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBUYXNrSGFuZGxlckJhc2UgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gTkFNRTtcbiAgICAgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gMCAvKiBDcmVhdGVkICovO1xuICAgIH1cbiAgICBnZXQgaXNTY2hlZHVsZWQoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX3RpbWVvdXRJZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NoZWR1bGVzL1Jlc2NoZWR1bGVzIHRyaWdnZXJpbmcgdGhlIHRhc2suXG4gICAgICogQHBhcmFtIGRlZmVyIE9wdGlvbmFsIHRpbWUgdG8gd2FpdCB1bnRpbCB0cmlnZ2VyaW5nLlxuICAgICAqL1xuICAgIHN0YXJ0KGRlZmVyID0gMCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLl9zdGF0dXMgPSAxIC8qIFdhaXRpbmdUb1J1biAqLztcbiAgICAgICAgaWYgKCEoZGVmZXIgPiAwKSlcbiAgICAgICAgICAgIGRlZmVyID0gMDsgLy8gQSBuZWdhdGlvbiBpcyB1c2VkIHRvIGNhdGNoIGVkZ2UgY2FzZXMuXG4gICAgICAgIGlmIChpc0Zpbml0ZShkZWZlcikpXG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0SWQgPSBzZXRUaW1lb3V0KFRhc2tIYW5kbGVyQmFzZS5faGFuZGxlciwgZGVmZXIsIHRoaXMpO1xuICAgIH1cbiAgICBydW5TeW5jaHJvbm91c2x5KCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBUYXNrSGFuZGxlckJhc2UuX2hhbmRsZXIodGhpcyk7XG4gICAgfVxuICAgIGdldFN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cztcbiAgICB9XG4gICAgZ2V0IHN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdHVzKCk7XG4gICAgfVxuICAgIC8vIFVzZSBhIHN0YXRpYyBmdW5jdGlvbiBoZXJlIHRvIGF2b2lkIHJlY3JlYXRpbmcgYSBuZXcgZnVuY3Rpb24gZXZlcnkgdGltZS5cbiAgICBzdGF0aWMgX2hhbmRsZXIoZCkge1xuICAgICAgICBkLmNhbmNlbCgpO1xuICAgICAgICBkLl9zdGF0dXMgPSAyIC8qIFJ1bm5pbmcgKi87XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkLl9vbkV4ZWN1dGUoKTtcbiAgICAgICAgICAgIGQuX3N0YXR1cyA9IDMgLyogUmFuVG9Db21wbGV0aW9uICovO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgZC5fc3RhdHVzID0gNSAvKiBGYXVsdGVkICovO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IG51bGw7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLl90aW1lb3V0SWQ7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zdGF0dXMgPSA0IC8qIENhbmNlbGxlZCAqLztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBUYXNrSGFuZGxlckJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UYXNrSGFuZGxlckJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UaHJlYWRpbmcvVGFza3MvVGFza0hhbmRsZXJCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogT3JpZ2luYWw6IGh0dHA6Ly9saW5xanMuY29kZXBsZXguY29tL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBMaW5rZWROb2RlTGlzdCB9IGZyb20gXCIuLi9MaW5rZWROb2RlTGlzdFwiO1xuaW1wb3J0IHsgT2JqZWN0UG9vbCB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL09iamVjdFBvb2xcIjtcbmltcG9ydCB7IGdldElkZW50aWZpZXIgfSBmcm9tIFwiLi9nZXRJZGVudGlmaWVyXCI7XG5pbXBvcnQgRGljdGlvbmFyeUJhc2UgZnJvbSBcIi4vRGljdGlvbmFyeUJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG4vLyBMaW5rZWRMaXN0IGZvciBEaWN0aW9uYXJ5XG5jbGFzcyBIYXNoRW50cnkge1xuICAgIGNvbnN0cnVjdG9yKGtleSwgdmFsdWUsIHByZXZpb3VzLCBuZXh0KSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJldmlvdXMgPSBwcmV2aW91cztcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV4dDtcbiAgICB9XG59XG5sZXQgbGlua2VkTGlzdFBvb2w7XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZnVuY3Rpb24gbGlua2VkTm9kZUxpc3QocmVjeWNsZSkge1xuICAgIGlmICghbGlua2VkTGlzdFBvb2wpXG4gICAgICAgIGxpbmtlZExpc3RQb29sXG4gICAgICAgICAgICA9IG5ldyBPYmplY3RQb29sKDIwLCAoKSA9PiBuZXcgTGlua2VkTm9kZUxpc3QoKSwgciA9PiByLmNsZWFyKCkpO1xuICAgIGlmICghcmVjeWNsZSlcbiAgICAgICAgcmV0dXJuIGxpbmtlZExpc3RQb29sLnRha2UoKTtcbiAgICBsaW5rZWRMaXN0UG9vbC5hZGQocmVjeWNsZSk7XG59XG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeSBleHRlbmRzIERpY3Rpb25hcnlCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihfa2V5R2VuZXJhdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2tleUdlbmVyYXRvciA9IF9rZXlHZW5lcmF0b3I7XG4gICAgICAgIHRoaXMuX2VudHJpZXMgPSBsaW5rZWROb2RlTGlzdCgpO1xuICAgICAgICB0aGlzLl9idWNrZXRzID0ge307XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2VudHJpZXMgPSBudWxsO1xuICAgICAgICBfLl9idWNrZXRzID0gbnVsbDtcbiAgICAgICAgXy5faGFzaEdlbmVyYXRvciA9IG51bGw7XG4gICAgfVxuICAgIGdldENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW50cmllcyAmJiB0aGlzLl9lbnRyaWVzLnVuc2FmZUNvdW50IHx8IDA7XG4gICAgfVxuICAgIF9nZXRCdWNrZXQoaGFzaCwgY3JlYXRlSWZNaXNzaW5nKSB7XG4gICAgICAgIGlmIChoYXNoID09IG51bGwgfHwgIWNyZWF0ZUlmTWlzc2luZyAmJiAhdGhpcy5nZXRDb3VudCgpKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghVHlwZS5pc1ByaW1pdGl2ZU9yU3ltYm9sKGhhc2gpKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiS2V5IHR5cGUgbm90IGluZGV4YWJsZSBhbmQgY291bGQgY2F1c2UgRGljdGlvbmFyeSB0byBiZSBleHRyZW1lbHkgc2xvdy5cIik7XG4gICAgICAgIGNvbnN0IGJ1Y2tldHMgPSB0aGlzLl9idWNrZXRzO1xuICAgICAgICBsZXQgYnVja2V0ID0gYnVja2V0c1toYXNoXTtcbiAgICAgICAgaWYgKGNyZWF0ZUlmTWlzc2luZyAmJiAhYnVja2V0KVxuICAgICAgICAgICAgYnVja2V0c1toYXNoXVxuICAgICAgICAgICAgICAgID0gYnVja2V0XG4gICAgICAgICAgICAgICAgICAgID0gbGlua2VkTm9kZUxpc3QoKTtcbiAgICAgICAgcmV0dXJuIGJ1Y2tldCB8fCBudWxsO1xuICAgIH1cbiAgICBfZ2V0QnVja2V0RW50cnkoa2V5LCBoYXNoLCBidWNrZXQpIHtcbiAgICAgICAgaWYgKGtleSA9PSBudWxsIHx8ICF0aGlzLmdldENvdW50KCkpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgXyA9IHRoaXMsIGNvbXBhcmVyID0gXy5fa2V5R2VuZXJhdG9yLCBjb21wYXJlS2V5ID0gY29tcGFyZXIgPyBjb21wYXJlcihrZXkpIDoga2V5O1xuICAgICAgICBpZiAoIWJ1Y2tldClcbiAgICAgICAgICAgIGJ1Y2tldCA9IF8uX2dldEJ1Y2tldChoYXNoIHx8IGdldElkZW50aWZpZXIoY29tcGFyZUtleSkpO1xuICAgICAgICByZXR1cm4gYnVja2V0XG4gICAgICAgICAgICAmJiAoY29tcGFyZXJcbiAgICAgICAgICAgICAgICA/IGJ1Y2tldC5maW5kKGUgPT4gY29tcGFyZXIoZS5rZXkpID09PSBjb21wYXJlS2V5KVxuICAgICAgICAgICAgICAgIDogYnVja2V0LmZpbmQoZSA9PiBlLmtleSA9PT0gY29tcGFyZUtleSkpO1xuICAgIH1cbiAgICBfZ2V0RW50cnkoa2V5KSB7XG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLl9nZXRCdWNrZXRFbnRyeShrZXkpO1xuICAgICAgICByZXR1cm4gZSAmJiBlLnZhbHVlO1xuICAgIH1cbiAgICBnZXRWYWx1ZShrZXkpIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuX2dldEVudHJ5KGtleSk7XG4gICAgICAgIHJldHVybiBlID8gZS52YWx1ZSA6IFZPSUQwO1xuICAgIH1cbiAgICBfc2V0VmFsdWVJbnRlcm5hbChrZXksIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBidWNrZXRzID0gXy5fYnVja2V0cywgZW50cmllcyA9IF8uX2VudHJpZXMsIGNvbXBhcmVLZXkgPSBfLl9rZXlHZW5lcmF0b3IgPyBfLl9rZXlHZW5lcmF0b3Ioa2V5KSA6IGtleSwgaGFzaCA9IGdldElkZW50aWZpZXIoY29tcGFyZUtleSk7XG4gICAgICAgIGxldCBidWNrZXQgPSBfLl9nZXRCdWNrZXQoaGFzaCk7XG4gICAgICAgIGNvbnN0IGJ1Y2tldEVudHJ5ID0gYnVja2V0ICYmIF8uX2dldEJ1Y2tldEVudHJ5KGtleSwgaGFzaCwgYnVja2V0KTtcbiAgICAgICAgLy8gRW50cnkgZXhpdHM/IERlbGV0ZSBvciB1cGRhdGVcbiAgICAgICAgaWYgKGJ1Y2tldEVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBiID0gYnVja2V0O1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBWT0lEMCkge1xuICAgICAgICAgICAgICAgIGxldCB4ID0gYi5yZW1vdmVOb2RlKGJ1Y2tldEVudHJ5KSwgeSA9IGVudHJpZXMucmVtb3ZlTm9kZShidWNrZXRFbnRyeS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHggJiYgIWIuY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGJ1Y2tldHNbaGFzaF07XG4gICAgICAgICAgICAgICAgICAgIGxpbmtlZE5vZGVMaXN0KGIpO1xuICAgICAgICAgICAgICAgICAgICBidWNrZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoeCAhPT0geSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJFbnRyaWVzIGFuZCBidWNrZXRzIGFyZSBvdXQgb2Ygc3luYy5cIjtcbiAgICAgICAgICAgICAgICBpZiAoeClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCBleHBvc2UgdGhlIGludGVybmFsIGhhc2ggZW50cmllcyBzbyByZXBsYWNpbmcgdGhlIHZhbHVlIGlzIG9rLlxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZCA9IGJ1Y2tldEVudHJ5LnZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgICAgIGJ1Y2tldEVudHJ5LnZhbHVlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFhcmVFcXVhbCh2YWx1ZSwgb2xkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSAhPT0gVk9JRDApIHtcbiAgICAgICAgICAgIGlmICghYnVja2V0KVxuICAgICAgICAgICAgICAgIGJ1Y2tldCA9IF8uX2dldEJ1Y2tldChoYXNoLCB0cnVlKTtcbiAgICAgICAgICAgIGlmICghYnVja2V0KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgXCIke2hhc2h9XCIgY2Fubm90IGJlIGFkZGVkIHRvIGxvb2t1cCB0YWJsZS5gKTtcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IG5ldyBIYXNoRW50cnkoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICBlbnRyaWVzLmFkZE5vZGUoZW50cnkpO1xuICAgICAgICAgICAgYnVja2V0LmFkZE5vZGUobmV3IEhhc2hFbnRyeShrZXksIGVudHJ5KSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF9jbGVhckludGVybmFsKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgYnVja2V0cyA9IF8uX2J1Y2tldHM7XG4gICAgICAgIC8vIEVuc3VyZSByZXNldCBhbmQgY2xlYW4uLi5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGJ1Y2tldHMpIHtcbiAgICAgICAgICAgIGlmIChidWNrZXRzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgYnVja2V0ID0gYnVja2V0c1trZXldO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBidWNrZXRzW2tleV07XG4gICAgICAgICAgICAgICAgbGlua2VkTm9kZUxpc3QoYnVja2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXy5fZW50cmllcy5jbGVhcigpO1xuICAgIH1cbiAgICAvKlxuICAgICAqIE5vdGU6IHN1cGVyLmdldEVudW1lcmF0b3IoKSB3b3JrcyBwZXJmZWN0bHkgd2VsbCxcbiAgICAgKiBidXQgZW51bWVyYXRpbmcgdGhlIGludGVybmFsIGxpbmtlZCBub2RlIGxpc3QgaXMgbXVjaCBtb3JlIGVmZmljaWVudC5cbiAgICAgKi9cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IHZlciwgY3VycmVudEVudHJ5O1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICB2ZXIgPSBfLl92ZXJzaW9uO1xuICAgICAgICAgICAgY3VycmVudEVudHJ5ID0gXy5fZW50cmllcy5maXJzdDtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50RW50cnkpIHtcbiAgICAgICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgICAgIF8uYXNzZXJ0VmVyc2lvbih2ZXIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsga2V5OiBjdXJyZW50RW50cnkua2V5LCB2YWx1ZTogY3VycmVudEVudHJ5LnZhbHVlIH07XG4gICAgICAgICAgICAgICAgY3VycmVudEVudHJ5ID0gY3VycmVudEVudHJ5Lm5leHQgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0S2V5cygpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgZSA9IF8uX2VudHJpZXMgJiYgXy5fZW50cmllcy5maXJzdDtcbiAgICAgICAgd2hpbGUgKGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGUua2V5KTtcbiAgICAgICAgICAgIGUgPSBlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZ2V0VmFsdWVzKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBlID0gXy5fZW50cmllcyAmJiBfLl9lbnRyaWVzLmZpcnN0O1xuICAgICAgICB3aGlsZSAoZSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goZS52YWx1ZSk7XG4gICAgICAgICAgICBlID0gZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRGljdGlvbmFyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURpY3Rpb25hcnkuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9EaWN0aW9uYXJpZXMvRGljdGlvbmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tIFwiLi4vVGV4dC9VdGlsaXR5XCI7XG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSU1QT1JUQU5UIE5PVEVTIEFCT1VUIFBFUkZPUk1BTkNFOlxuICogaHR0cDovL2pzcGVyZi5jb20vc2ltdWxhdGluZy1hLXF1ZXVlXG4gKlxuICogQWRkaW5nIHRvIGFuIGFycmF5IGlzIHZlcnkgZmFzdCwgYnV0IG1vZGlmeWluZyBpcyBzbG93LlxuICogTGlua2VkTGlzdCB3aW5zIHdoZW4gbW9kaWZ5aW5nIGNvbnRlbnRzLlxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjY4ODQvYXJyYXktdmVyc3VzLWxpbmtlZC1saXN0XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZnVsIGZvciBtYW5hZ2luZyBhIGxpc3Qgb2YgbGlua2VkIG5vZGVzLCBidXQgaXQgZG9lcyBub3QgcHJvdGVjdCBhZ2FpbnN0IG1vZGlmeWluZyBpbmRpdmlkdWFsIGxpbmtzLlxuICogSWYgdGhlIGNvbnN1bWVyIG1vZGlmaWVzIGEgbGluayAoc2V0cyB0aGUgcHJldmlvdXMgb3IgbmV4dCB2YWx1ZSkgaXQgd2lsbCBlZmZlY3RpdmVseSBicmVhayB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBJdCBpcyBwb3NzaWJsZSB0byBkZWNsYXJlIGEgbm9kZSB0eXBlIG9mIGFueSBraW5kIGFzIGxvbmcgYXMgaXQgY29udGFpbnMgYSBwcmV2aW91cyBhbmQgbmV4dCB2YWx1ZSB0aGF0IGNhbiByZWZlcmVuY2UgYW5vdGhlciBub2RlLlxuICogQWx0aG91Z2ggbm90IGFzIHNhZmUgYXMgdGhlIGluY2x1ZGVkIExpbmtlZExpc3QsIHRoaXMgY2xhc3MgaGFzIGxlc3Mgb3ZlcmhlYWQgYW5kIGlzIG1vcmUgZmxleGlibGUuXG4gKlxuICogVGhlIGNvdW50IChvciBsZW5ndGgpIG9mIHRoaXMgTGlua2VkTm9kZUxpc3QgaXMgbm90IHRyYWNrZWQgc2luY2UgaXQgY291bGQgYmUgY29ycnVwdGVkIGF0IGFueSB0aW1lLlxuICovXG5leHBvcnQgY2xhc3MgTGlua2VkTm9kZUxpc3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9maXJzdCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhc3QgPSBudWxsO1xuICAgICAgICB0aGlzLnVuc2FmZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IDA7XG4gICAgfVxuICAgIGFzc2VydFZlcnNpb24odmVyc2lvbikge1xuICAgICAgICBpZiAodmVyc2lvbiAhPT0gdGhpcy5fdmVyc2lvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ29sbGVjdGlvbiB3YXMgbW9kaWZpZWQuXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGZpcnN0IG5vZGUuICBXaWxsIGJlIG51bGwgaWYgdGhlIGNvbGxlY3Rpb24gaXMgZW1wdHkuXG4gICAgICovXG4gICAgZ2V0IGZpcnN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBsYXN0IG5vZGUuXG4gICAgICovXG4gICAgZ2V0IGxhc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJdGVyYXRpdmVseSBjb3VudHMgdGhlIG51bWJlciBvZiBsaW5rZWQgbm9kZXMgYW5kIHJldHVybnMgdGhlIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvdW50KCkge1xuICAgICAgICBsZXQgbmV4dCA9IHRoaXMuX2ZpcnN0O1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dC5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgICBmb3JFYWNoKGFjdGlvbiwgaWdub3JlVmVyc2lvbmluZykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBudWxsLCBuZXh0ID0gXy5maXJzdDsgLy8gQmUgc3VyZSB0byB0cmFjayB0aGUgbmV4dCBub2RlIHNvIGlmIGN1cnJlbnQgbm9kZSBpcyByZW1vdmVkLlxuICAgICAgICBjb25zdCB2ZXJzaW9uID0gXy5fdmVyc2lvbjtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKCFpZ25vcmVWZXJzaW9uaW5nKVxuICAgICAgICAgICAgICAgIF8uYXNzZXJ0VmVyc2lvbih2ZXJzaW9uKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgICAgICAgICAgbmV4dCA9IGN1cnJlbnQgJiYgY3VycmVudC5uZXh0O1xuICAgICAgICB9IHdoaWxlIChjdXJyZW50XG4gICAgICAgICAgICAmJiBhY3Rpb24oY3VycmVudCwgaW5kZXgrKykgIT09IGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICBtYXAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKCFzZWxlY3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ3NlbGVjdG9yJyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICB0aGlzLmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNlbGVjdG9yKG5vZGUsIGkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVyYXNlcyB0aGUgbGlua2VkIG5vZGUncyByZWZlcmVuY2VzIHRvIGVhY2ggb3RoZXIgYW5kIHJldHVybnMgdGhlIG51bWJlciBvZiBub2Rlcy5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IG4sIGNGID0gMCwgY0wgPSAwO1xuICAgICAgICAvLyBGaXJzdCwgY2xlYXIgaW4gdGhlIGZvcndhcmQgZGlyZWN0aW9uLlxuICAgICAgICBuID0gXy5fZmlyc3Q7XG4gICAgICAgIF8uX2ZpcnN0ID0gbnVsbDtcbiAgICAgICAgd2hpbGUgKG4pIHtcbiAgICAgICAgICAgIGNGKys7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IG47XG4gICAgICAgICAgICBuID0gbi5uZXh0O1xuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBMYXN0LCBjbGVhciBpbiB0aGUgcmV2ZXJzZSBkaXJlY3Rpb24uXG4gICAgICAgIG4gPSBfLl9sYXN0O1xuICAgICAgICBfLl9sYXN0ID0gbnVsbDtcbiAgICAgICAgd2hpbGUgKG4pIHtcbiAgICAgICAgICAgIGNMKys7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IG47XG4gICAgICAgICAgICBuID0gbi5wcmV2aW91cztcbiAgICAgICAgICAgIGN1cnJlbnQucHJldmlvdXMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjRiAhPT0gY0wpXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0xpbmtlZE5vZGVMaXN0OiBGb3J3YXJkIHZlcnN1cyByZXZlcnNlIGNvdW50IGRvZXMgbm90IG1hdGNoIHdoZW4gY2xlYXJpbmcuIEZvcndhcmQ6ICcgKyBjRiArIFwiLCBSZXZlcnNlOiBcIiArIGNMKTtcbiAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICBfLnVuc2FmZUNvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIGNGO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGxpc3QuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aGUgbGlzdCB0byBzZWUgaWYgYSBub2RlIGV4aXN0cy5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXhPZihub2RlKSAhPSAtMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaW5kZXggb2YgYSBwYXJ0aWN1bGFyIG5vZGUuXG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICovXG4gICAgZ2V0Tm9kZUF0KGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IG5leHQgPSB0aGlzLl9maXJzdDtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAobmV4dCAmJiBpKysgPCBpbmRleCkge1xuICAgICAgICAgICAgbmV4dCA9IG5leHQubmV4dCB8fCBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgIH1cbiAgICBmaW5kKGNvbmRpdGlvbikge1xuICAgICAgICBsZXQgbm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgobiwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmRpdGlvbihuLCBpKSkge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBuO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aGUgbGlzdCB0byBmaW5kIHRoZSBzcGVjaWZpZWQgbm9kZSBhbmQgcmV0dXJucyBpdHMgaW5kZXguXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpbmRleE9mKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgJiYgKG5vZGUucHJldmlvdXMgfHwgbm9kZS5uZXh0KSkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIGxldCBjLCBuID0gdGhpcy5fZmlyc3Q7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgYyA9IG47XG4gICAgICAgICAgICAgICAgaWYgKGMgPT09IG5vZGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgfSB3aGlsZSAoKG4gPSBjICYmIGMubmV4dCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZmlyc3Qgbm9kZSBhbmQgcmV0dXJucyB0cnVlIGlmIHN1Y2Nlc3NmdWwuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcmVtb3ZlRmlyc3QoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2ZpcnN0ICYmIHRoaXMucmVtb3ZlTm9kZSh0aGlzLl9maXJzdCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGxhc3Qgbm9kZSBhbmQgcmV0dXJucyB0cnVlIGlmIHN1Y2Nlc3NmdWwuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcmVtb3ZlTGFzdCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fbGFzdCAmJiB0aGlzLnJlbW92ZU5vZGUodGhpcy5fbGFzdCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBub2RlLlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBzdWNjZXNzZnVsIGFuZCBmYWxzZSBpZiBub3QgZm91bmQgKGFscmVhZHkgcmVtb3ZlZCkuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ25vZGUnKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHByZXYgPSBub2RlLnByZXZpb3VzIHx8IG51bGwsIG5leHQgPSBub2RlLm5leHQgfHwgbnVsbDtcbiAgICAgICAgbGV0IGEgPSBmYWxzZSwgYiA9IGZhbHNlO1xuICAgICAgICBpZiAocHJldilcbiAgICAgICAgICAgIHByZXYubmV4dCA9IG5leHQ7XG4gICAgICAgIGVsc2UgaWYgKF8uX2ZpcnN0ID09IG5vZGUpXG4gICAgICAgICAgICBfLl9maXJzdCA9IG5leHQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGEgPSB0cnVlO1xuICAgICAgICBpZiAobmV4dClcbiAgICAgICAgICAgIG5leHQucHJldmlvdXMgPSBwcmV2O1xuICAgICAgICBlbHNlIGlmIChfLl9sYXN0ID09IG5vZGUpXG4gICAgICAgICAgICBfLl9sYXN0ID0gcHJldjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYiA9IHRydWU7XG4gICAgICAgIGlmIChhICE9PSBiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oJ25vZGUnLCBmb3JtYXQoXCJQcm92aWRlZCBub2RlIGlzIGhhcyBubyB7MH0gcmVmZXJlbmNlIGJ1dCBpcyBub3QgdGhlIHsxfSBub2RlIVwiLCBhID8gXCJwcmV2aW91c1wiIDogXCJuZXh0XCIsIGEgPyBcImZpcnN0XCIgOiBcImxhc3RcIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlbW92ZWQgPSAhYSAmJiAhYjtcbiAgICAgICAgaWYgKHJlbW92ZWQpIHtcbiAgICAgICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgICAgIF8udW5zYWZlQ291bnQtLTtcbiAgICAgICAgICAgIG5vZGUucHJldmlvdXMgPSBudWxsO1xuICAgICAgICAgICAgbm9kZS5uZXh0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5vZGUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdC5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtMaW5rZWROb2RlTGlzdH1cbiAgICAgKi9cbiAgICBhZGROb2RlKG5vZGUpIHtcbiAgICAgICAgdGhpcy5hZGROb2RlQWZ0ZXIobm9kZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbm9kZSBiZWZvcmUgdGhlIHNwZWNpZmllZCAnYmVmb3JlJyBub2RlLlxuICAgICAqIElmIG5vICdiZWZvcmUnIG5vZGUgaXMgc3BlY2lmaWVkLCBpdCBpbnNlcnRzIGl0IGFzIHRoZSBmaXJzdCBub2RlLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHBhcmFtIGJlZm9yZVxuICAgICAqIEByZXR1cm5zIHtMaW5rZWROb2RlTGlzdH1cbiAgICAgKi9cbiAgICBhZGROb2RlQmVmb3JlKG5vZGUsIGJlZm9yZSA9IG51bGwpIHtcbiAgICAgICAgYXNzZXJ0VmFsaWREZXRhY2hlZChub2RlKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghYmVmb3JlKSB7XG4gICAgICAgICAgICBiZWZvcmUgPSBfLl9maXJzdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmVmb3JlKSB7XG4gICAgICAgICAgICBsZXQgcHJldiA9IGJlZm9yZS5wcmV2aW91cztcbiAgICAgICAgICAgIG5vZGUucHJldmlvdXMgPSBwcmV2O1xuICAgICAgICAgICAgbm9kZS5uZXh0ID0gYmVmb3JlO1xuICAgICAgICAgICAgYmVmb3JlLnByZXZpb3VzID0gbm9kZTtcbiAgICAgICAgICAgIGlmIChwcmV2KVxuICAgICAgICAgICAgICAgIHByZXYubmV4dCA9IG5vZGU7XG4gICAgICAgICAgICBpZiAoYmVmb3JlID09IF8uX2ZpcnN0KVxuICAgICAgICAgICAgICAgIF8uX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gXy5fbGFzdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICBfLnVuc2FmZUNvdW50Kys7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbm9kZSBhZnRlciB0aGUgc3BlY2lmaWVkICdhZnRlcicgbm9kZS5cbiAgICAgKiBJZiBubyAnYWZ0ZXInIG5vZGUgaXMgc3BlY2lmaWVkLCBpdCBhcHBlbmRzIGl0IGFzIHRoZSBsYXN0IG5vZGUuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcGFyYW0gYWZ0ZXJcbiAgICAgKiBAcmV0dXJucyB7TGlua2VkTm9kZUxpc3R9XG4gICAgICovXG4gICAgYWRkTm9kZUFmdGVyKG5vZGUsIGFmdGVyID0gbnVsbCkge1xuICAgICAgICBhc3NlcnRWYWxpZERldGFjaGVkKG5vZGUpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFhZnRlcikge1xuICAgICAgICAgICAgYWZ0ZXIgPSBfLl9sYXN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZnRlcikge1xuICAgICAgICAgICAgbGV0IG5leHQgPSBhZnRlci5uZXh0O1xuICAgICAgICAgICAgbm9kZS5uZXh0ID0gbmV4dDtcbiAgICAgICAgICAgIG5vZGUucHJldmlvdXMgPSBhZnRlcjtcbiAgICAgICAgICAgIGFmdGVyLm5leHQgPSBub2RlO1xuICAgICAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICAgICAgbmV4dC5wcmV2aW91cyA9IG5vZGU7XG4gICAgICAgICAgICBpZiAoYWZ0ZXIgPT0gXy5fbGFzdClcbiAgICAgICAgICAgICAgICBfLl9sYXN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gXy5fbGFzdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICBfLnVuc2FmZUNvdW50Kys7XG4gICAgICAgIHJldHVybiBfO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhbmQgZXhpc3Rpbmcgbm9kZSBhbmQgcmVwbGFjZXMgaXQuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcGFyYW0gcmVwbGFjZW1lbnRcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHJlcGxhY2Uobm9kZSwgcmVwbGFjZW1lbnQpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ25vZGUnKTtcbiAgICAgICAgaWYgKG5vZGUgPT0gcmVwbGFjZW1lbnQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgYXNzZXJ0VmFsaWREZXRhY2hlZChyZXBsYWNlbWVudCwgJ3JlcGxhY2VtZW50Jyk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICByZXBsYWNlbWVudC5wcmV2aW91cyA9IG5vZGUucHJldmlvdXM7XG4gICAgICAgIHJlcGxhY2VtZW50Lm5leHQgPSBub2RlLm5leHQ7XG4gICAgICAgIGlmIChub2RlLnByZXZpb3VzKVxuICAgICAgICAgICAgbm9kZS5wcmV2aW91cy5uZXh0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgIGlmIChub2RlLm5leHQpXG4gICAgICAgICAgICBub2RlLm5leHQucHJldmlvdXMgPSByZXBsYWNlbWVudDtcbiAgICAgICAgaWYgKG5vZGUgPT0gXy5fZmlyc3QpXG4gICAgICAgICAgICBfLl9maXJzdCA9IHJlcGxhY2VtZW50O1xuICAgICAgICBpZiAobm9kZSA9PSBfLl9sYXN0KVxuICAgICAgICAgICAgXy5fbGFzdCA9IHJlcGxhY2VtZW50O1xuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIHJldHVybiBfO1xuICAgIH1cbiAgICBzdGF0aWMgdmFsdWVFbnVtZXJhdG9yRnJvbShsaXN0KSB7XG4gICAgICAgIGlmICghbGlzdClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2xpc3QnKTtcbiAgICAgICAgbGV0IGN1cnJlbnQsIG5leHQsIHZlcnNpb247XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBhbmNob3IuLi5cbiAgICAgICAgICAgIGN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgICAgbmV4dCA9IGxpc3QuZmlyc3Q7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbGlzdC5fdmVyc2lvbjtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgbGlzdC5hc3NlcnRWZXJzaW9uKHZlcnNpb24pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgICAgICAgICAgICAgIG5leHQgPSBjdXJyZW50ICYmIGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBjb3B5VmFsdWVzKGxpc3QsIGFycmF5LCBpbmRleCA9IDApIHtcbiAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5maXJzdCkge1xuICAgICAgICAgICAgaWYgKCFhcnJheSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhcnJheScpO1xuICAgICAgICAgICAgbGlzdC5mb3JFYWNoKChub2RlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaW5kZXggKyBpXSA9IG5vZGUudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzZXJ0VmFsaWREZXRhY2hlZChub2RlLCBwcm9wTmFtZSA9ICdub2RlJykge1xuICAgIGlmIChub2RlID09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24ocHJvcE5hbWUpO1xuICAgIGlmIChub2RlLm5leHQgfHwgbm9kZS5wcmV2aW91cylcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDYW5ub3QgYWRkIGEgbm9kZSB0byBhIExpbmtlZE5vZGVMaXN0IHRoYXQgaXMgYWxyZWFkeSBsaW5rZWQuXCIpO1xufVxuZXhwb3J0IGRlZmF1bHQgTGlua2VkTm9kZUxpc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MaW5rZWROb2RlTGlzdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0xpbmtlZE5vZGVMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuY29uc3QgTlVMTCA9IFwibnVsbFwiLCBHRVRfU1lNQk9MID0gXCJnZXRTeW1ib2xcIiwgR0VUX0hBU0hfQ09ERSA9IFwiZ2V0SGFzaENvZGVcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRJZGVudGlmaWVyKG9iaiwgdGhyb3dJZlVua25vd24gPSBmYWxzZSkge1xuICAgIGlmIChUeXBlLmlzUHJvcGVydHlLZXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICBpZiAob2JqID09PSBudWxsKVxuICAgICAgICByZXR1cm4gTlVMTDtcbiAgICBpZiAob2JqID09PSBWT0lEMClcbiAgICAgICAgcmV0dXJuIFR5cGUuVU5ERUZJTkVEO1xuICAgIC8vIFNlZSBJU3ltYm9saXphYmxlLlxuICAgIGlmIChUeXBlLmhhc01ldGhvZChvYmosIEdFVF9TWU1CT0wpKSB7XG4gICAgICAgIHJldHVybiBvYmouZ2V0U3ltYm9sKCk7XG4gICAgfVxuICAgIC8vIFNlZSBJSGFzaGFibGUuXG4gICAgaWYgKFR5cGUuaGFzTWV0aG9kKG9iaiwgR0VUX0hBU0hfQ09ERSkpIHtcbiAgICAgICAgcmV0dXJuIG9iai5nZXRIYXNoQ29kZSgpO1xuICAgIH1cbiAgICBpZiAodGhyb3dJZlVua25vd24pIHtcbiAgICAgICAgaWYgKFR5cGUuaXNGdW5jdGlvbih0aHJvd0lmVW5rbm93bikpXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dJZlVua25vd24ob2JqKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhyb3cgXCJDYW5ub3QgY3JlYXRlIGtub3duIGlkZW50aXR5LlwiO1xuICAgIH1cbiAgICByZXR1cm4gKHR5cGVvZiBvYmoudG9TdHJpbmcgPT0gVHlwZS5GVU5DVElPTilcbiAgICAgICAgPyBvYmoudG9TdHJpbmcoKVxuICAgICAgICA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xufVxuZXhwb3J0IGRlZmF1bHQgZ2V0SWRlbnRpZmllcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldElkZW50aWZpZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9EaWN0aW9uYXJpZXMvZ2V0SWRlbnRpZmllci5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBhcmVFcXVhbCB9IGZyb20gXCIuLi8uLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSBcIi4uL0VudW1lcmF0aW9uL0VudW1lcmF0b3JcIjtcbmltcG9ydCB7IENvbGxlY3Rpb25CYXNlIH0gZnJvbSBcIi4uL0NvbGxlY3Rpb25CYXNlXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yQmFzZVwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgZXh0cmFjdEtleVZhbHVlIH0gZnJvbSBcIi4uLy4uL0tleVZhbHVlRXh0cmFjdFwiO1xuaW1wb3J0IHsgS2V5Tm90Rm91bmRFeGNlcHRpb24gfSBmcm9tIFwiLi4vS2V5Tm90Rm91bmRFeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG4vLyBEZXNpZ24gTm90ZTogU2hvdWxkIERpY3Rpb25hcnlBYnN0cmFjdEJhc2UgYmUgSURpc3Bvc2FibGU/XG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeUJhc2UgZXh0ZW5kcyBDb2xsZWN0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlKSB7XG4gICAgICAgIHN1cGVyKHNvdXJjZSk7XG4gICAgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgX29uVmFsdWVNb2RpZmllZChrZXksIHZhbHVlLCBvbGQpIHtcbiAgICB9XG4gICAgX2FkZEludGVybmFsKGl0ZW0pIHtcbiAgICAgICAgaWYgKCFpdGVtKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignaXRlbScsICdEaWN0aW9uYXJpZXMgbXVzdCB1c2UgYSB2YWxpZCBrZXkvdmFsdWUgcGFpci4gXFwnJyArIGl0ZW0gKyAnXFwnIGlzIG5vdCBhbGxvd2VkLicpO1xuICAgICAgICByZXR1cm4gZXh0cmFjdEtleVZhbHVlKGl0ZW0sIChrZXksIHZhbHVlKSA9PiB0aGlzLmFkZEJ5S2V5VmFsdWUoa2V5LCB2YWx1ZSkpO1xuICAgIH1cbiAgICBfY2xlYXJJbnRlcm5hbCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiBfLmtleXMpIHtcbiAgICAgICAgICAgIGlmIChfLnJlbW92ZUJ5S2V5KGtleSkpXG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuICAgIGNvbnRhaW5zKGl0ZW0pIHtcbiAgICAgICAgLy8gU2hvdWxkIG5ldmVyIGhhdmUgYSBudWxsIG9iamVjdCBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgaWYgKCFpdGVtIHx8ICF0aGlzLmdldENvdW50KCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIC8vIExlYXZlIGFzIHZhcmlhYmxlIGZvciBkZWJ1Z2dpbmcuLi5cbiAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWYWx1ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIGFyZUVxdWFsKHZhbHVlLCB2KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9yZW1vdmVJbnRlcm5hbChpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbSlcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICByZXR1cm4gZXh0cmFjdEtleVZhbHVlKGl0ZW0sIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAvLyBMZWF2ZSBhcyB2YXJpYWJsZSBmb3IgZGVidWdnaW5nLi4uXG4gICAgICAgICAgICBsZXQgdiA9IHRoaXMuZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiAoYXJlRXF1YWwodmFsdWUsIHYpICYmIHRoaXMucmVtb3ZlQnlLZXkoa2V5KSlcbiAgICAgICAgICAgICAgICA/IDEgOiAwO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IGtleXMoKSB7IHJldHVybiB0aGlzLmdldEtleXMoKTsgfVxuICAgIGdldCB2YWx1ZXMoKSB7IHJldHVybiB0aGlzLmdldFZhbHVlcygpOyB9XG4gICAgYWRkQnlLZXlWYWx1ZShrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gVk9JRDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNhbm5vdCBhZGQgJ3VuZGVmaW5lZCcgYXMgYSB2YWx1ZS5cIik7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoXy5jb250YWluc0tleShrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCBleCA9IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQWRkaW5nIGEga2V5L3ZhbHVlIHdoZW4gdGhlIGtleSBhbHJlYWR5IGV4aXN0cy5cIik7XG4gICAgICAgICAgICBleC5kYXRhWydrZXknXSA9IGtleTtcbiAgICAgICAgICAgIGV4LmRhdGFbJ3ZhbHVlJ10gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRocm93IGV4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLnNldFZhbHVlKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICBnZXRBc3N1cmVkVmFsdWUoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZShrZXkpO1xuICAgICAgICBpZiAodmFsdWUgPT09IFZPSUQwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEtleU5vdEZvdW5kRXhjZXB0aW9uKGBLZXkgJyR7a2V5fScgbm90IGZvdW5kLmApO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHRyeUdldFZhbHVlKGtleSwgb3V0KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZShrZXkpO1xuICAgICAgICBpZiAodmFsdWUgIT09IFZPSUQwKSB7XG4gICAgICAgICAgICBvdXQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiBhbiBlbnRyeS5cbiAgICAgKiBJdCdzIGltcG9ydGFudCB0byBrbm93IHRoYXQgJ3VuZGVmaW5lZCcgY2Fubm90IGV4aXN0IGFzIGEgdmFsdWUgaW4gdGhlIGRpY3Rpb25hcnkgYW5kIGlzIHVzZWQgYXMgYSBmbGFnIGZvciByZW1vdmFsLlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzZXRWYWx1ZShrZXksIHZhbHVlKSB7XG4gICAgICAgIC8vIHNldFZhbHVlIHNob3VsZG4ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IHJlY3Vyc2lvbi4uLlxuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IG9sZCA9IF8uZ2V0VmFsdWUoa2V5KTsgLy8gZ2V0IHRoZSBvbGQgdmFsdWUgaGVyZSBhbmQgcGFzcyB0byBpbnRlcm5hbC5cbiAgICAgICAgaWYgKCFhcmVFcXVhbCh2YWx1ZSwgb2xkKSAmJiBfLl9zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIF8uX29uVmFsdWVNb2RpZmllZChrZXksIHZhbHVlLCBvbGQpO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbihjaGFuZ2VkKTtcbiAgICAgICAgcmV0dXJuIGNoYW5nZWQ7XG4gICAgfVxuICAgIGNvbnRhaW5zS2V5KGtleSkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9nZXRFbnRyeShrZXkpO1xuICAgIH1cbiAgICBjb250YWluc1ZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgd2hpbGUgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgaWYgKGFyZUVxdWFsKGUuY3VycmVudCwgdmFsdWUsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZW1vdmVCeUtleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0VmFsdWUoa2V5LCBWT0lEMCk7XG4gICAgfVxuICAgIHJlbW92ZUJ5VmFsdWUodmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiBfLmdldEtleXMoKSkge1xuICAgICAgICAgICAgaWYgKGFyZUVxdWFsKF8uZ2V0VmFsdWUoa2V5KSwgdmFsdWUsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgXy5yZW1vdmVCeUtleShrZXkpO1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cbiAgICBpbXBvcnRFbnRyaWVzKHBhaXJzKSB7XG4gICAgICAgIC8vIEFsbG93IHBpcGluZyB0aHJvdWdoIHRvIHRyaWdnZXIgb25Nb2RpZmllZCBwcm9wZXJseS5cbiAgICAgICAgcmV0dXJuIHN1cGVyLmltcG9ydEVudHJpZXMocGFpcnMpO1xuICAgIH1cbiAgICBfaW1wb3J0RW50cmllcyhwYWlycykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFwYWlycylcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBsZXQgY2hhbmdlZCA9IDA7XG4gICAgICAgIGZvckVhY2gocGFpcnMsIHBhaXIgPT4gZXh0cmFjdEtleVZhbHVlKHBhaXIsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5fc2V0VmFsdWVJbnRlcm5hbChrZXksIHZhbHVlKSlcbiAgICAgICAgICAgICAgICBjaGFuZ2VkKys7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNoYW5nZWQ7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgdmVyLCBrZXlzLCBsZW4sIGluZGV4ID0gMDtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgdmVyID0gXy5fdmVyc2lvbjsgLy8gVHJhY2sgdGhlIHZlcnNpb24gc2luY2UgZ2V0S2V5cyBpcyBhIGNvcHkuXG4gICAgICAgICAgICBrZXlzID0gXy5nZXRLZXlzKCk7XG4gICAgICAgICAgICBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBfLmFzc2VydFZlcnNpb24odmVyKTtcbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA8IGxlbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbaW5kZXgrK10sIHZhbHVlID0gXy5nZXRWYWx1ZShrZXkpO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gVk9JRDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHsga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRGljdGlvbmFyeUJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaWN0aW9uYXJ5QmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9EaWN0aW9uYXJ5QmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG4vLyBOZWVkIHRvIHNwb29mIHRoaXMgc28gV2ViUGFjayBkb2Vzbid0IHBhbmljICh3YXJuaW5ncykuXG5sZXQgcjtcbnRyeSB7XG4gICAgciA9IGV2YWwoJ3JlcXVpcmUnKTtcbn1cbmNhdGNoIChleCkgeyB9XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbmV4cG9ydCBjb25zdCBpc0NvbW1vbkpTID0gISEociAmJiByLnJlc29sdmUpO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5leHBvcnQgY29uc3QgaXNSZXF1aXJlSlMgPSAhIShyICYmIHIudG9VcmwgJiYgci5kZWZpbmVkKTtcbi8qXG4gKiBFbnN1cmUgaXMgaW4gYSByZWFsIE5vZGUgZW52aXJvbm1lbnQsIHdpdGggYSBgcHJvY2Vzcy5uZXh0VGlja2AuXG4gKiBUbyBzZWUgdGhyb3VnaCBmYWtlIE5vZGUgZW52aXJvbm1lbnRzOlxuICogTW9jaGEgdGVzdCBydW5uZXIgLSBleHBvc2VzIGEgYHByb2Nlc3NgIGdsb2JhbCB3aXRob3V0IGEgYG5leHRUaWNrYFxuICogQnJvd3NlcmlmeSAtIGV4cG9zZXMgYSBgcHJvY2Vzcy5uZXhUaWNrYCBmdW5jdGlvbiB0aGF0IHVzZXNcbiAqIGBzZXRUaW1lb3V0YC4gSW4gdGhpcyBjYXNlIGBzZXRJbW1lZGlhdGVgIGlzIHByZWZlcnJlZCBiZWNhdXNlXG4gKiBpdCBpcyBmYXN0ZXIuIEJyb3dzZXJpZnkncyBgcHJvY2Vzcy50b1N0cmluZygpYCB5aWVsZHNcbiAqIFwiW29iamVjdCBPYmplY3RdXCIsIHdoaWxlIGluIGEgcmVhbCBOb2RlIGVudmlyb25tZW50XG4gKiBgcHJvY2Vzcy5uZXh0VGljaygpYCB5aWVsZHMgXCJbb2JqZWN0IHByb2Nlc3NdXCIuXG4gKi9cbmV4cG9ydCBjb25zdCBpc05vZGVKUyA9IHR5cGVvZiBwcm9jZXNzID09IFwib2JqZWN0XCJcbiAgICAmJiBwcm9jZXNzLnRvU3RyaW5nKCkgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiXG4gICAgJiYgcHJvY2Vzcy5uZXh0VGljayAhPSB2b2lkIDA7XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcbnRyeSB7XG4gICAgT2JqZWN0LmZyZWV6ZShleHBvcnRzKTtcbn1cbmNhdGNoIChleCkgeyB9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FbnZpcm9ubWVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Vudmlyb25tZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL1R5cGVzXCI7XG5jb25zdCBWT0lEMCA9IHZvaWQgMCwgRE9UID0gJy4nLCBLRVkgPSAna2V5JywgVkFMVUUgPSAndmFsdWUnLCBJVEVNID0gJ2l0ZW0nLCBJVEVNXzEgPSBJVEVNICsgJ1sxXScsIElURU1fVkFMVUUgPSBJVEVNICsgRE9UICsgVkFMVUUsIElOVkFMSURfS1ZQX01FU1NBR0UgPSAnSW52YWxpZCB0eXBlLiAgTXVzdCBiZSBhIEtleVZhbHVlUGFpciBvciBUdXBsZSBvZiBsZW5ndGggMi4nLCBDQU5OT1RfQkVfVU5ERUZJTkVEID0gJ0Nhbm5vdCBlcXVhbCB1bmRlZmluZWQuJztcbmV4cG9ydCBmdW5jdGlvbiBpc0tleVZhbHVlUGFpcihrdnApIHtcbiAgICByZXR1cm4ga3ZwICYmIGt2cC5oYXNPd25Qcm9wZXJ0eShLRVkpICYmIGt2cC5oYXNPd25Qcm9wZXJ0eShWQUxVRSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0S2V5KGtleSwgbmFtZSA9IElURU0pIHtcbiAgICBhc3NlcnROb3RVbmRlZmluZWQoa2V5LCBuYW1lICsgRE9UICsgS0VZKTtcbiAgICBpZiAoa2V5ID09PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKG5hbWUgKyBET1QgKyBLRVkpO1xuICAgIHJldHVybiBrZXk7XG59XG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0VHVwbGUodHVwbGUsIG5hbWUgPSBJVEVNKSB7XG4gICAgaWYgKHR1cGxlLmxlbmd0aCAhPSAyKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24obmFtZSwgJ0tleVZhbHVlUGFpciB0dXBsZXMgbXVzdCBiZSBvZiBsZW5ndGggMi4nKTtcbiAgICBhc3NlcnRLZXkodHVwbGVbMF0sIG5hbWUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE5vdFVuZGVmaW5lZCh2YWx1ZSwgbmFtZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gVk9JRDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihuYW1lLCBDQU5OT1RfQkVfVU5ERUZJTkVEKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEtleVZhbHVlKGl0ZW0sIHRvKSB7XG4gICAgbGV0IGtleSwgdmFsdWU7XG4gICAgaWYgKFR5cGUuaXNBcnJheUxpa2UoaXRlbSkpIHtcbiAgICAgICAgYXNzZXJ0VHVwbGUoaXRlbSk7XG4gICAgICAgIGtleSA9IGl0ZW1bMF07XG4gICAgICAgIHZhbHVlID0gYXNzZXJ0Tm90VW5kZWZpbmVkKGl0ZW1bMV0sIElURU1fMSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzS2V5VmFsdWVQYWlyKGl0ZW0pKSB7XG4gICAgICAgIGtleSA9IGFzc2VydEtleShpdGVtLmtleSk7XG4gICAgICAgIHZhbHVlID0gYXNzZXJ0Tm90VW5kZWZpbmVkKGl0ZW0udmFsdWUsIElURU1fVkFMVUUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKElURU0sIElOVkFMSURfS1ZQX01FU1NBR0UpO1xuICAgIH1cbiAgICByZXR1cm4gdG8oa2V5LCB2YWx1ZSk7XG59XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0S2V5VmFsdWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1LZXlWYWx1ZUV4dHJhY3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9LZXlWYWx1ZUV4dHJhY3QuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvc3lzdGVtLmNvbGxlY3Rpb25zLmdlbmVyaWMuS2V5Tm90Rm91bmRFeGNlcHRpb24odj12cy4xMTApLmFzcHhcbiAqL1xuaW1wb3J0IHsgU3lzdGVtRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvU3lzdGVtRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnS2V5Tm90Rm91bmRFeGNlcHRpb24gJztcbmV4cG9ydCBjbGFzcyBLZXlOb3RGb3VuZEV4Y2VwdGlvbiBleHRlbmRzIFN5c3RlbUV4Y2VwdGlvbiB7XG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgS2V5Tm90Rm91bmRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1LZXlOb3RGb3VuZEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0tleU5vdEZvdW5kRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4qIEJhc2VkIFVwb246IGh0dHA6Ly9yZWZlcmVuY2Vzb3VyY2UubWljcm9zb2Z0LmNvbS8jU3lzdGVtL0NvbXBNb2Qvc3lzdGVtL2NvbGxlY3Rpb25zL2dlbmVyaWMvcXVldWUuY3NcbiogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4qL1xuaW1wb3J0IHsgYXJlRXF1YWwgfSBmcm9tIFwiLi4vQ29tcGFyZVwiO1xuaW1wb3J0ICogYXMgQVUgZnJvbSBcIi4vQXJyYXkvVXRpbGl0eVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuLi9JbnRlZ2VyXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL05vdEltcGxlbWVudGVkRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9uQmFzZSB9IGZyb20gXCIuL0NvbGxlY3Rpb25CYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuY29uc3QgTUlOSU1VTV9HUk9XID0gNDtcbmNvbnN0IFNIUklOS19USFJFU0hPTEQgPSAzMjsgLy8gVW51c2VkP1xuLy8gdmFyIEdST1dfRkFDVE9SOiBudW1iZXIgPSAyMDA7ICAvLyBkb3VibGUgZWFjaCB0aW1lXG5jb25zdCBHUk9XX0ZBQ1RPUl9IQUxGID0gMTAwO1xuY29uc3QgREVGQVVMVF9DQVBBQ0lUWSA9IE1JTklNVU1fR1JPVztcbmNvbnN0IGVtcHR5QXJyYXkgPSBPYmplY3QuZnJlZXplKFtdKTtcbmV4cG9ydCBjbGFzcyBRdWV1ZSBleHRlbmRzIENvbGxlY3Rpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UsIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgICAgICBzdXBlcihWT0lEMCwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9oZWFkID0gMDtcbiAgICAgICAgXy5fdGFpbCA9IDA7XG4gICAgICAgIF8uX3NpemUgPSAwO1xuICAgICAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgICAgIF8uX2FycmF5ID0gZW1wdHlBcnJheTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoVHlwZS5pc051bWJlcihzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FwYWNpdHkgPSBzb3VyY2U7XG4gICAgICAgICAgICAgICAgYXNzZXJ0SW50ZWdlclplcm9PckdyZWF0ZXIoY2FwYWNpdHksIFwiY2FwYWNpdHlcIik7XG4gICAgICAgICAgICAgICAgXy5fYXJyYXkgPSBjYXBhY2l0eVxuICAgICAgICAgICAgICAgICAgICA/IEFVLmluaXRpYWxpemUoY2FwYWNpdHkpXG4gICAgICAgICAgICAgICAgICAgIDogZW1wdHlBcnJheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlID0gc291cmNlO1xuICAgICAgICAgICAgICAgIF8uX2FycmF5ID0gQVUuaW5pdGlhbGl6ZShUeXBlLmlzQXJyYXlMaWtlKHNlKVxuICAgICAgICAgICAgICAgICAgICA/IHNlLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA6IERFRkFVTFRfQ0FQQUNJVFkpO1xuICAgICAgICAgICAgICAgIF8uX2ltcG9ydEVudHJpZXMoc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF8uX2NhcGFjaXR5ID0gXy5fYXJyYXkubGVuZ3RoO1xuICAgIH1cbiAgICBnZXRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgfVxuICAgIF9hZGRJbnRlcm5hbChpdGVtKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgbGV0IGxlbiA9IF8uX2NhcGFjaXR5O1xuICAgICAgICBpZiAoc2l6ZSA9PSBsZW4pIHtcbiAgICAgICAgICAgIGxldCBuZXdDYXBhY2l0eSA9IGxlbiAqIEdST1dfRkFDVE9SX0hBTEY7XG4gICAgICAgICAgICBpZiAobmV3Q2FwYWNpdHkgPCBsZW4gKyBNSU5JTVVNX0dST1cpXG4gICAgICAgICAgICAgICAgbmV3Q2FwYWNpdHkgPSBsZW4gKyBNSU5JTVVNX0dST1c7XG4gICAgICAgICAgICBfLnNldENhcGFjaXR5KG5ld0NhcGFjaXR5KTtcbiAgICAgICAgICAgIGxlbiA9IF8uX2NhcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhaWwgPSBfLl90YWlsO1xuICAgICAgICBfLl9hcnJheVt0YWlsXSA9IGl0ZW07XG4gICAgICAgIF8uX3RhaWwgPSAodGFpbCArIDEpICUgbGVuO1xuICAgICAgICBfLl9zaXplID0gc2l6ZSArIDE7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIF9yZW1vdmVJbnRlcm5hbChpdGVtLCBtYXgpIHtcbiAgICAgICAgLy9ub2luc3BlY3Rpb24gSHRtbFVua25vd25UYWdcbiAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKFwiSUNvbGxlY3Rpb25cXDxUXFw+LnJlbW92ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW4gUXVldWVcXDxUXFw+XCIgK1xuICAgICAgICAgICAgXCIgc2luY2UgaXQgd291bGQgcmVxdWlyZSBkZXN0cm95aW5nIHRoZSB1bmRlcmx5aW5nIGFycmF5IHRvIHJlbW92ZSB0aGUgaXRlbS5cIik7XG4gICAgfVxuICAgIF9jbGVhckludGVybmFsKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgYXJyYXkgPSBfLl9hcnJheSwgaGVhZCA9IF8uX2hlYWQsIHRhaWwgPSBfLl90YWlsLCBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgaWYgKGhlYWQgPCB0YWlsKVxuICAgICAgICAgICAgQVUuY2xlYXIoYXJyYXksIGhlYWQsIHRhaWwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIEFVLmNsZWFyKGFycmF5LCBoZWFkKTtcbiAgICAgICAgICAgIEFVLmNsZWFyKGFycmF5LCAwLCB0YWlsKTtcbiAgICAgICAgfVxuICAgICAgICBfLl9oZWFkID0gMDtcbiAgICAgICAgXy5fdGFpbCA9IDA7XG4gICAgICAgIF8uX3NpemUgPSAwO1xuICAgICAgICBfLnRyaW1FeGNlc3MoKTtcbiAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmIChfLl9hcnJheSAhPSBlbXB0eUFycmF5KSB7XG4gICAgICAgICAgICBfLl9hcnJheS5sZW5ndGggPSBfLl9jYXBhY2l0eSA9IDA7XG4gICAgICAgICAgICBfLl9hcnJheSA9IGVtcHR5QXJyYXk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVxdWV1ZXMgZW50cmllcyBpbnRvIGFuIGFycmF5LlxuICAgICAqL1xuICAgIGR1bXAobWF4ID0gSW5maW5pdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBpZiAoaXNGaW5pdGUobWF4KSkge1xuICAgICAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKG1heCk7XG4gICAgICAgICAgICBpZiAobWF4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG1heC0tICYmIF8uX3RyeURlcXVldWVJbnRlcm5hbCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KSkgeyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAoXy5fdHJ5RGVxdWV1ZUludGVybmFsKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9KSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgXy50cmltRXhjZXNzKCk7XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBmb3JFYWNoKGFjdGlvbikge1xuICAgICAgICByZXR1cm4gc3VwZXIuZm9yRWFjaChhY3Rpb24sIHRydWUpO1xuICAgIH1cbiAgICBzZXRDYXBhY2l0eShjYXBhY2l0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgYXNzZXJ0SW50ZWdlclplcm9PckdyZWF0ZXIoY2FwYWNpdHksIFwiY2FwYWNpdHlcIik7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gXy5fYXJyYXksIGxlbiA9IF8uX2NhcGFjaXR5O1xuICAgICAgICBpZiAoY2FwYWNpdHkgPiBsZW4pXG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoY2FwYWNpdHkgPT0gbGVuKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGNvbnN0IGhlYWQgPSBfLl9oZWFkLCB0YWlsID0gXy5fdGFpbCwgc2l6ZSA9IF8uX3NpemU7XG4gICAgICAgIC8vIFNwZWNpYWwgY2FzZSB3aGVyZSB3ZSBjYW4gc2ltcGx5IGV4dGVuZCB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheS4gKEphdmFTY3JpcHQgb25seSlcbiAgICAgICAgaWYgKGFycmF5ICE9IGVtcHR5QXJyYXkgJiYgY2FwYWNpdHkgPiBsZW4gJiYgaGVhZCA8IHRhaWwpIHtcbiAgICAgICAgICAgIGFycmF5Lmxlbmd0aCA9IF8uX2NhcGFjaXR5ID0gY2FwYWNpdHk7XG4gICAgICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBjcmVhdGUgYSBuZXcgYXJyYXkgYmVjYXVzZSBtb2RpZnlpbmcgYW4gZXhpc3Rpbmcgb25lIGNvdWxkIGJlIHNsb3cuXG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gQVUuaW5pdGlhbGl6ZShjYXBhY2l0eSk7XG4gICAgICAgIGlmIChzaXplID4gMCkge1xuICAgICAgICAgICAgaWYgKGhlYWQgPCB0YWlsKSB7XG4gICAgICAgICAgICAgICAgQVUuY29weVRvKGFycmF5LCBuZXdBcnJheSwgaGVhZCwgMCwgc2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBBVS5jb3B5VG8oYXJyYXksIG5ld0FycmF5LCBoZWFkLCAwLCBsZW4gLSBoZWFkKTtcbiAgICAgICAgICAgICAgICBBVS5jb3B5VG8oYXJyYXksIG5ld0FycmF5LCAwLCBsZW4gLSBoZWFkLCB0YWlsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfLl9hcnJheSA9IG5ld0FycmF5O1xuICAgICAgICBfLl9jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgICAgICBfLl9oZWFkID0gMDtcbiAgICAgICAgXy5fdGFpbCA9IChzaXplID09IGNhcGFjaXR5KSA/IDAgOiBzaXplO1xuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24odHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbnF1ZXVlKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGl0ZW0pO1xuICAgIH1cbiAgICBfdHJ5RGVxdWV1ZUludGVybmFsKG91dCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLl9zaXplKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBhcnJheSA9IF8uX2FycmF5LCBoZWFkID0gXy5faGVhZDtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IF8uX2FycmF5W2hlYWRdO1xuICAgICAgICBhcnJheVtoZWFkXSA9IG51bGw7XG4gICAgICAgIF8uX2hlYWQgPSAoaGVhZCArIDEpICUgXy5fY2FwYWNpdHk7XG4gICAgICAgIF8uX3NpemUtLTtcbiAgICAgICAgXy5faW5jcmVtZW50TW9kaWZpZWQoKTtcbiAgICAgICAgb3V0KHJlbW92ZWQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZGVxdWV1ZSh0aHJvd0lmRW1wdHkgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBWT0lEMDtcbiAgICAgICAgaWYgKCF0aGlzLnRyeURlcXVldWUodmFsdWUgPT4geyByZXN1bHQgPSB2YWx1ZTsgfSkgJiYgdGhyb3dJZkVtcHR5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDYW5ub3QgZGVxdWV1ZSBhbiBlbXB0eSBxdWV1ZS5cIik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIHF1ZXVlIGhhcyBlbnRyaWVzIGFuIHB1bGxzIGFuIGVudHJ5IGZyb20gdGhlIGhlYWQgb2YgdGhlIHF1ZXVlIGFuZCBwYXNzZXMgaXQgdG8gdGhlIG91dCBoYW5kbGVyLlxuICAgICAqIEBwYXJhbSBvdXQgVGhlICdvdXQnIGhhbmRsZXIgdGhhdCByZWNlaXZlcyB0aGUgdmFsdWUgaWYgaXQgZXhpc3RzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGEgdmFsdWUgd2FzIHJldHJpZXZlZC4gIEZhbHNlIGlmIG5vdC5cbiAgICAgKi9cbiAgICB0cnlEZXF1ZXVlKG91dCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLl9zaXplKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgLy8gQSBzaW5nbGUgZGVxdWV1ZSBzaG91bGRuJ3QgbmVlZCB1cGRhdGUgcmVjdXJzaW9uIHRyYWNraW5nLi4uXG4gICAgICAgIGlmICh0aGlzLl90cnlEZXF1ZXVlSW50ZXJuYWwob3V0KSkge1xuICAgICAgICAgICAgLy8gVGhpcyBtYXkgcHJlZW1wdGl2ZWx5IHRyaWdnZXIgdGhlIF9vbk1vZGlmaWVkLlxuICAgICAgICAgICAgaWYgKF8uX3NpemUgPCBfLl9jYXBhY2l0eSAvIDIpXG4gICAgICAgICAgICAgICAgXy50cmltRXhjZXNzKFNIUklOS19USFJFU0hPTEQpO1xuICAgICAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF9nZXRFbGVtZW50KGluZGV4KSB7XG4gICAgICAgIGFzc2VydEludGVnZXJaZXJvT3JHcmVhdGVyKGluZGV4LCBcImluZGV4XCIpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgcmV0dXJuIF8uX2FycmF5WyhfLl9oZWFkICsgaW5kZXgpICUgXy5fY2FwYWNpdHldO1xuICAgIH1cbiAgICBwZWVrKHRocm93SWZFbXB0eSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplID09IDApIHtcbiAgICAgICAgICAgIGlmICh0aHJvd0lmRW1wdHkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDYW5ub3QgY2FsbCBwZWVrIG9uIGFuIGVtcHR5IHF1ZXVlLlwiKTtcbiAgICAgICAgICAgIHJldHVybiBWT0lEMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXlbdGhpcy5faGVhZF07XG4gICAgfVxuICAgIHRyaW1FeGNlc3ModGhyZXNob2xkKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgaWYgKHNpemUgPCBNYXRoLmZsb29yKF8uX2NhcGFjaXR5ICogMC45KSAmJiAoIXRocmVzaG9sZCAmJiB0aHJlc2hvbGQgIT09IDAgfHwgaXNOYU4odGhyZXNob2xkKSB8fCB0aHJlc2hvbGQgPCBzaXplKSlcbiAgICAgICAgICAgIF8uc2V0Q2FwYWNpdHkoc2l6ZSk7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgaW5kZXgsIHZlcnNpb24sIHNpemU7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgdmVyc2lvbiA9IF8uX3ZlcnNpb247XG4gICAgICAgICAgICBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBfLmFzc2VydFZlcnNpb24odmVyc2lvbik7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gc2l6ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihfLl9nZXRFbGVtZW50KGluZGV4KyspKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzZXJ0WmVyb09yR3JlYXRlcih2YWx1ZSwgcHJvcGVydHkpIHtcbiAgICBpZiAodmFsdWUgPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKHByb3BlcnR5LCB2YWx1ZSwgXCJNdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvXCIpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gYXNzZXJ0SW50ZWdlclplcm9PckdyZWF0ZXIodmFsdWUsIHByb3BlcnR5KSB7XG4gICAgSW50ZWdlci5hc3NlcnQodmFsdWUsIHByb3BlcnR5KTtcbiAgICByZXR1cm4gYXNzZXJ0WmVyb09yR3JlYXRlcih2YWx1ZSwgcHJvcGVydHkpO1xufVxuZXhwb3J0IGRlZmF1bHQgUXVldWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL1F1ZXVlLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi4vLi4vSW50ZWdlclwiO1xuaW1wb3J0IHsgYXJlRXF1YWwgfSBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tIFwiLi9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBjb3B5LCBjb3B5VG8gfSBmcm9tIFwiLi9jb3B5XCI7XG5leHBvcnQgeyBpbml0aWFsaXplLCBjb3B5LCBjb3B5VG8gfTtcbmNvbnN0IENCTiA9ICdDYW5ub3QgYmUgbnVsbC4nLCBDQjAgPSAnQ2Fubm90IGJlIHplcm8uJywgQ0JMMCA9ICdDYW5ub3QgYmUgbGVzcyB0aGFuIHplcm8uJywgVkZOID0gJ011c3QgYmUgYSB2YWxpZCBmaW5pdGUgbnVtYmVyJztcbi8qKlxuICogQ2hlY2tzIHRvIHNlZSB3aGVyZSB0aGUgcHJvdmlkZWQgYXJyYXkgY29udGFpbnMgYW4gaXRlbS92YWx1ZS5cbiAqIElmIHRoZSBhcnJheSB2YWx1ZSBpcyBudWxsLCB0aGVuIC0xIGlzIHJldHVybmVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gaXRlbVxuICogQHBhcmFtIHtmdW5jdGlvbj99IGVxdWFsaXR5Q29tcGFyZXJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICBjb25zdCBsZW4gPSBhcnJheSAmJiBhcnJheS5sZW5ndGg7XG4gICAgaWYgKGxlbikge1xuICAgICAgICAvLyBOYU4gTkVWRVIgZXZhbHVhdGVzIGl0cyBlcXVhbGl0eSBzbyBiZSBjYXJlZnVsLlxuICAgICAgICBpZiAoKGFycmF5KSBpbnN0YW5jZW9mIChBcnJheSkgJiYgIVR5cGUuaXNUcnVlTmFOKGl0ZW0pKVxuICAgICAgICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIC8vICdhcmVFcXVhbCcgaW5jbHVkZXMgTmFOPT1OYU4gZXZhbHVhdGlvbi5cbiAgICAgICAgICAgIGlmIChlcXVhbGl0eUNvbXBhcmVyKGFycmF5W2ldLCBpdGVtKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG4vKipcbiAqIENoZWNrcyB0byBzZWUgaWYgdGhlIHByb3ZpZGVkIGFycmF5IGNvbnRhaW5zIGFuIGl0ZW0uXG4gKiBJZiB0aGUgYXJyYXkgdmFsdWUgaXMgbnVsbCwgdGhlbiBmYWxzZSBpcyByZXR1cm5lZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIGl0ZW1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBlcXVhbGl0eUNvbXBhcmVyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICByZXR1cm4gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxpdHlDb21wYXJlcikgIT0gLTE7XG59XG4vKipcbiAqIEZpbmRzIGFuZCByZXBsYWNlcyBhIHZhbHVlIGZyb20gYW4gYXJyYXkuICBXaWxsIHJlcGxhY2VzIGFsbCBpbnN0YW5jZXMgdW5sZXNzIGEgbWF4aW11bSBpcyBzcGVjaWZpZWQuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBvbGRcbiAqIEBwYXJhbSBuZXdWYWx1ZVxuICogQHBhcmFtIG1heFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UoYXJyYXksIG9sZCwgbmV3VmFsdWUsIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKCFhcnJheSB8fCAhYXJyYXkubGVuZ3RoIHx8IG1heCA9PT0gMClcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKG1heCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ21heCcsIG1heCwgQ0JMMCk7XG4gICAgaWYgKCFtYXgpXG4gICAgICAgIG1heCA9IEluZmluaXR5OyAvLyBqdXN0IGluIGNhc2UuXG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGFycmF5W2ldID09PSBvbGQpIHtcbiAgICAgICAgICAgIGFycmF5W2ldID0gbmV3VmFsdWU7XG4gICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgaWYgKGNvdW50ID09IG1heClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG59XG4vKipcbiAqIFJlcGxhY2VzIHZhbHVlcyBvZiBhbiBhcnJheSBhY3Jvc3MgYSByYW5nZSBvZiBpbmRleGVzLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBzdGFydFxuICogQHBhcmFtIHN0b3BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVJhbmdlKGFycmF5LCB2YWx1ZSwgc3RhcnQgPSAwLCBzdG9wKSB7XG4gICAgaWYgKCFhcnJheSlcbiAgICAgICAgcmV0dXJuO1xuICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihzdGFydCwgJ3N0YXJ0Jyk7XG4gICAgaWYgKCFzdG9wICYmIHN0b3AgIT09IDApXG4gICAgICAgIHN0b3AgPSBhcnJheS5sZW5ndGg7XG4gICAgSW50ZWdlci5hc3NlcnQoc3RvcCwgJ3N0b3AnKTtcbiAgICBpZiAoc3RvcCA8IHN0YXJ0KVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RvcFwiLCBzdG9wLCBcImlzIGxlc3MgdGhhbiBzdGFydFwiKTtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBzdG9wOyBpKyspIHtcbiAgICAgICAgYXJyYXlbaV0gPSB2YWx1ZTtcbiAgICB9XG59XG4vKipcbiAqIENsZWFycyAoc2V0cyB0byBudWxsKSB2YWx1ZXMgb2YgYW4gYXJyYXkgYWNyb3NzIGEgcmFuZ2Ugb2YgaW5kZXhlcy5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIHN0YXJ0XG4gKiBAcGFyYW0gc3RvcFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIoYXJyYXksIHN0YXJ0ID0gMCwgc3RvcCkge1xuICAgIHVwZGF0ZVJhbmdlKGFycmF5LCBudWxsLCBzdGFydCwgc3RvcCk7XG59XG4vKipcbiAqIEVuc3VyZXMgYSB2YWx1ZSBleGlzdHMgd2l0aGluIGFuIGFycmF5LiAgSWYgbm90IGZvdW5kLCBhZGRzIHRvIHRoZSBlbmQuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBpdGVtXG4gKiBAcGFyYW0ge2Z1bmN0aW9uP30gZXF1YWxpdHlDb21wYXJlclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlcihhcnJheSwgaXRlbSwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgaWYgKCFhcnJheSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignYXJyYXknLCBDQk4pO1xuICAgIGxldCBsZW4gPSBhcnJheS5sZW5ndGg7IC8vIGF2b2lkIHF1ZXJ5aW5nIC5sZW5ndGggbW9yZSB0aGFuIG9uY2UuICpcbiAgICBjb25zdCBvayA9ICFsZW4gfHwgIWNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICBpZiAob2spXG4gICAgICAgIGFycmF5W2xlbl0gPSBpdGVtOyAvLyAqIHB1c2ggd291bGQgcXVlcnkgbGVuZ3RoIGFnYWluLlxuICAgIHJldHVybiBvaztcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgaW5kZXggb2Ygd2hpY2ggdGhlIHByb3ZpZGVkIHByZWRpY2F0ZSByZXR1cm5zIHRydWUuXG4gKiBSZXR1cm5zIC0xIGlmIGFsd2F5cyBmYWxzZS5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIHByZWRpY2F0ZVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlKSB7XG4gICAgaWYgKCFhcnJheSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignYXJyYXknLCBDQk4pO1xuICAgIGlmICghVHlwZS5pc0Z1bmN0aW9uKHByZWRpY2F0ZSkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbigncHJlZGljYXRlJywgJ011c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICBjb25zdCBsZW4gPSBhcnJheS5sZW5ndGg7XG4gICAgaWYgKCFUeXBlLmlzTnVtYmVyKGxlbiwgdHJ1ZSkgfHwgbGVuIDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCdhcnJheScsICdEb2VzIG5vdCBoYXZlIGEgdmFsaWQgbGVuZ3RoLicpO1xuICAgIGlmICgoYXJyYXkpIGluc3RhbmNlb2YgKEFycmF5KSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKGFycmF5W2ldLCBpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKChpKSBpbiAoYXJyYXkpICYmIHByZWRpY2F0ZShhcnJheVtpXSwgaSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goc291cmNlLCBhY3Rpb24pIHtcbiAgICBpZiAoc291cmNlICYmIGFjdGlvbikge1xuICAgICAgICAvLyBEb24ndCBjYWNoZSB0aGUgbGVuZ3RoIHNpbmNlIGl0IGlzIHBvc3NpYmxlIHRoYXQgdGhlIHVuZGVybHlpbmcgYXJyYXkgY2hhbmdlZC5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhY3Rpb24oc291cmNlW2ldLCBpKSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIElzIHNpbWlsYXIgdG8gQXJyYXkubWFwKCkgYnV0IGluc3RlYWQgb2YgcmV0dXJuaW5nIGEgbmV3IGFycmF5LCBpdCB1cGRhdGVzIHRoZSBleGlzdGluZyBpbmRleGVzLlxuICogQ2FuIGFsc28gYmUgYXBwbGllZCB0byBhIHN0cnVjdHVyZSB0aGF0IGluZGV4ZXMgbGlrZSBhbiBhcnJheSwgYnV0IG1heSBub3QgYmUuXG4gKiBAcGFyYW0gdGFyZ2V0XG4gKiBAcGFyYW0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VG8odGFyZ2V0LCBmbikge1xuICAgIGlmICh0YXJnZXQgJiYgZm4pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRhcmdldFtpXSA9IGZuKHRhcmdldFtpXSwgaSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIFJlbW92ZXMgYW4gZW50cnkgYXQgYSBzcGVjaWZpZWQgaW5kZXguXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIHdhcyBhYmxlIHRvIGJlIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVJbmRleChhcnJheSwgaW5kZXgpIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhcnJheScsIENCTik7XG4gICAgSW50ZWdlci5hc3NlcnQoaW5kZXgsICdpbmRleCcpO1xuICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2luZGV4JywgaW5kZXgsIENCTDApO1xuICAgIGNvbnN0IGV4aXN0cyA9IGluZGV4IDwgYXJyYXkubGVuZ3RoO1xuICAgIGlmIChleGlzdHMpXG4gICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIGV4aXN0cztcbn1cbi8qKlxuICogRmluZHMgYW5kIHJlbW92ZXMgYSB2YWx1ZSBmcm9tIGFuIGFycmF5LiAgV2lsbCByZW1vdmUgYWxsIGluc3RhbmNlcyB1bmxlc3MgYSBtYXhpbXVtIGlzIHNwZWNpZmllZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gbWF4XG4gKiBAcGFyYW0ge2Z1bmN0aW9uP30gZXF1YWxpdHlDb21wYXJlclxuICogQHJldHVybnMge251bWJlcn0gVGhlIG51bWJlciBvZiB0aW1lcyB0aGUgdmFsdWUgd2FzIGZvdW5kIGFuZCByZW1vdmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCB2YWx1ZSwgbWF4ID0gSW5maW5pdHksIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgIGlmICghYXJyYXkgfHwgIWFycmF5Lmxlbmd0aCB8fCBtYXggPT09IDApXG4gICAgICAgIHJldHVybiAwO1xuICAgIGlmIChtYXggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdtYXgnLCBtYXgsIENCTDApO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgaWYgKCFtYXggfHwgIWlzRmluaXRlKG1heCkpIHtcbiAgICAgICAgLy8gRG9uJ3QgdHJhY2sgdGhlIGluZGV4ZXMgYW5kIHJlbW92ZSBpbiByZXZlcnNlLlxuICAgICAgICBmb3IgKGxldCBpID0gKGFycmF5Lmxlbmd0aCAtIDEpOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKGVxdWFsaXR5Q29tcGFyZXIoYXJyYXlbaV0sIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBTaW5jZSB0aGUgdXNlciB3aWxsIGV4cGVjdCBpdCB0byBoYXBwZW4gaW4gZm9yd2FyZCBvcmRlci4uLlxuICAgICAgICBjb25zdCBmb3VuZCA9IFtdOyAvLyBpbmRleGVzO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlcXVhbGl0eUNvbXBhcmVyKGFycmF5W2ldLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBmb3VuZC5wdXNoKGkpO1xuICAgICAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IG1heClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IGZvdW5kLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBhcnJheS5zcGxpY2UoZm91bmRbaV0sIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbn1cbi8qKlxuICogU2ltcGx5IHJlcGVhdHMgYSB2YWx1ZSB0aGUgbnVtYmVyIG9mIHRpbWVzIHNwZWNpZmllZC5cbiAqIEBwYXJhbSBlbGVtZW50XG4gKiBAcGFyYW0gY291bnRcbiAqIEByZXR1cm5zIHtUW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBlYXQoZWxlbWVudCwgY291bnQpIHtcbiAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgJ2NvdW50Jyk7XG4gICAgaWYgKGNvdW50IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignY291bnQnLCBjb3VudCwgQ0JMMCk7XG4gICAgY29uc3QgcmVzdWx0ID0gaW5pdGlhbGl6ZShjb3VudCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IGVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIFJldHVybnMgYSByYW5nZSBvZiBudW1iZXJzIGJhc2VkIHVwb24gdGhlIGZpcnN0IHZhbHVlIGFuZCB0aGUgc3RlcCB2YWx1ZS5cbiAqIEBwYXJhbSBmaXJzdFxuICogQHBhcmFtIGNvdW50XG4gKiBAcGFyYW0gc3RlcFxuICogQHJldHVybnMge251bWJlcltdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2UoZmlyc3QsIGNvdW50LCBzdGVwID0gMSkge1xuICAgIGlmIChpc05hTihmaXJzdCkgfHwgIWlzRmluaXRlKGZpcnN0KSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignZmlyc3QnLCBmaXJzdCwgVkZOKTtcbiAgICBpZiAoaXNOYU4oY291bnQpIHx8ICFpc0Zpbml0ZShjb3VudCkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2NvdW50JywgY291bnQsIFZGTik7XG4gICAgaWYgKGNvdW50IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignY291bnQnLCBjb3VudCwgQ0JMMCk7XG4gICAgY29uc3QgcmVzdWx0ID0gaW5pdGlhbGl6ZShjb3VudCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IGZpcnN0O1xuICAgICAgICBmaXJzdCArPSBzdGVwO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgcmFuZ2Ugb2YgbnVtYmVycyBiYXNlZCB1cG9uIHRoZSBmaXJzdCB2YWx1ZSBhbmQgdGhlIHN0ZXAgdmFsdWUgZXhjbHVkaW5nIGFueSBudW1iZXJzIGF0IG9yIGJleW9uZCB0aGUgdW50aWwgdmFsdWUuXG4gKiBAcGFyYW0gZmlyc3RcbiAqIEBwYXJhbSB1bnRpbFxuICogQHBhcmFtIHN0ZXBcbiAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlVW50aWwoZmlyc3QsIHVudGlsLCBzdGVwID0gMSkge1xuICAgIGlmIChzdGVwID09IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ3N0ZXAnLCBzdGVwLCBDQjApO1xuICAgIHJldHVybiByYW5nZShmaXJzdCwgKHVudGlsIC0gZmlyc3QpIC8gc3RlcCwgc3RlcCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGlzdGluY3Qoc291cmNlKSB7XG4gICAgaWYgKCFzb3VyY2UpXG4gICAgICAgIHJldHVybiBbXTsgLy8gQWxsb3dpbmcgZm9yIG51bGwgZmFjaWxpdGF0ZXMgcmVnZXggZmlsdGVyaW5nLlxuICAgIGNvbnN0IHNlZW4gPSB7fTtcbiAgICByZXR1cm4gc291cmNlLmZpbHRlcihlID0+ICEoZSBpbiBzZWVuKSAmJiAoc2VlbltlXSA9IHRydWUpKTtcbn1cbi8qKlxuICogVGFrZXMgYW55IGFycmF5cyB3aXRoaW4gYW4gYXJyYXkgYW5kIGluc2VydHMgdGhlIHZhbHVlcyBjb250YWluZWQgd2l0aGluIGluIHBsYWNlIG9mIHRoYXQgYXJyYXkuXG4gKiBGb3IgZXZlcnkgY291bnQgaGlnaGVyIHRoYW4gMCBpbiByZWN1cnNlRGVwdGggaXQgd2lsbCBhdHRlbXB0IGFuIGFkZGl0aW9uYWwgcGFzcy4gIFBhc3NpbmcgSW5maW5pdHkgd2lsbCBmbGF0dGVuIGFsbCBhcnJheXMgY29udGFpbmVkLlxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSByZWN1cnNlRGVwdGhcbiAqIEByZXR1cm5zIHthbnlbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYSwgcmVjdXJzZURlcHRoID0gMCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgeCA9IGFbaV07XG4gICAgICAgIGlmICgoeCkgaW5zdGFuY2VvZiAoQXJyYXkpKSB7XG4gICAgICAgICAgICBpZiAocmVjdXJzZURlcHRoID4gMClcbiAgICAgICAgICAgICAgICB4ID0gZmxhdHRlbih4LCByZWN1cnNlRGVwdGggLSAxKTtcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgeC5sZW5ndGg7IG4rKylcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh4W25dKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXN1bHQucHVzaCh4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVV0aWxpdHkuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9VdGlsaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ05vdEltcGxlbWVudGVkRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbiBleHRlbmRzIFN5c3RlbUV4Y2VwdGlvbiB7XG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTm90SW1wbGVtZW50ZWRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Ob3RJbXBsZW1lbnRlZEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvTm90SW1wbGVtZW50ZWRFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0ICogYXMgVmFsdWVzIGZyb20gXCIuLi8uLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBTb3J0Q29udGV4dCB9IGZyb20gXCIuL1NvcnRDb250ZXh0XCI7XG5pbXBvcnQgeyBGdW5jdGlvbnMgfSBmcm9tIFwiLi4vLi4vRnVuY3Rpb25zXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmV4cG9ydCBjbGFzcyBLZXlTb3J0ZWRDb250ZXh0IGV4dGVuZHMgU29ydENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKG5leHQsIF9rZXlTZWxlY3Rvciwgb3JkZXIgPSAxIC8qIEFzY2VuZGluZyAqLywgY29tcGFyZXIgPSBWYWx1ZXMuY29tcGFyZSkge1xuICAgICAgICBzdXBlcihuZXh0LCBjb21wYXJlciwgb3JkZXIpO1xuICAgICAgICB0aGlzLl9rZXlTZWxlY3RvciA9IF9rZXlTZWxlY3RvcjtcbiAgICB9XG4gICAgY29tcGFyZShhLCBiKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQga3MgPSBfLl9rZXlTZWxlY3RvcjtcbiAgICAgICAgaWYgKCFrcyB8fCBrcyA9PSBGdW5jdGlvbnMuSWRlbnRpdHkpXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuY29tcGFyZShhLCBiKTtcbiAgICAgICAgLy8gV2UgZm9yY2UgPGFueT4gaGVyZSBzaW5jZSBpdCBjYW4gYmUgYSBQcmltaXRpdmUgb3IgSUNvbXBhcmFibGU8YW55PlxuICAgICAgICBjb25zdCBkID0gVmFsdWVzLmNvbXBhcmUoa3MoYSksIGtzKGIpKTtcbiAgICAgICAgaWYgKGQgPT0gMCAmJiBfLl9uZXh0KVxuICAgICAgICAgICAgcmV0dXJuIF8uX25leHQuY29tcGFyZShhLCBiKTtcbiAgICAgICAgcmV0dXJuIF8uX29yZGVyICogZDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBLZXlTb3J0ZWRDb250ZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9S2V5U29ydGVkQ29udGV4dC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL1NvcnRpbmcvS2V5U29ydGVkQ29udGV4dC5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgKiBhcyBWYWx1ZXMgZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmV4cG9ydCBjbGFzcyBTb3J0Q29udGV4dCB7XG4gICAgY29uc3RydWN0b3IoX25leHQsIF9jb21wYXJlciA9IFZhbHVlcy5jb21wYXJlLCBfb3JkZXIgPSAxIC8qIEFzY2VuZGluZyAqLykge1xuICAgICAgICB0aGlzLl9uZXh0ID0gX25leHQ7XG4gICAgICAgIHRoaXMuX2NvbXBhcmVyID0gX2NvbXBhcmVyO1xuICAgICAgICB0aGlzLl9vcmRlciA9IF9vcmRlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlyZWN0aW9uIG9mIHRoZSBjb21wYXJpc29uLlxuICAgICAqIEB0eXBlIHtPcmRlcn1cbiAgICAgKi9cbiAgICBnZXQgb3JkZXIoKSB7IHJldHVybiB0aGlzLl9vcmRlcjsgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhbiBhcnJheSBvZiBpbmRleGVzIGZyb20gdGhlIHNvdXJjZSBpbiBvcmRlciBvZiB0aGVpciBleHBlY3RlZCBpbnRlcm5hbFNvcnQgd2l0aG91dCBtb2RpZnlpbmcgdGhlIHNvdXJjZS5cbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHJldHVybnMge251bWJlcltdfVxuICAgICAqL1xuICAgIGdlbmVyYXRlU29ydGVkSW5kZXhlcyhzb3VyY2UpIHtcbiAgICAgICAgaWYgKHNvdXJjZSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBzb3VyY2UubWFwKChzLCBpKSA9PiBpKTtcbiAgICAgICAgcmVzdWx0LnNvcnQoKGEsIGIpID0+IHRoaXMuY29tcGFyZShzb3VyY2VbYV0sIHNvdXJjZVtiXSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wYXJlcyB0d28gdmFsdWVzIGJhc2VkIHVwb24gU29ydENvbnRleHQgcGFyYW1ldGVycy5cbiAgICAgKiBAcGFyYW0gYVxuICAgICAqIEBwYXJhbSBiXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBjb21wYXJlKGEsIGIpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGQgPSBfLl9jb21wYXJlcihhLCBiKTtcbiAgICAgICAgaWYgKGQgPT0gMCAmJiBfLl9uZXh0KVxuICAgICAgICAgICAgcmV0dXJuIF8uX25leHQuY29tcGFyZShhLCBiKTtcbiAgICAgICAgcmV0dXJuIF8uX29yZGVyICogZDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBTb3J0Q29udGV4dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNvcnRDb250ZXh0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvU29ydGluZy9Tb3J0Q29udGV4dC5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUXG4gKi9cbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi9JbnRlZ2VyXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplIH0gZnJvbSBcIi4vQ29sbGVjdGlvbnMvQXJyYXkvaW5pdGlhbGl6ZVwiO1xuaW1wb3J0IHsgc2h1ZmZsZSBhcyBhcnJheVNodWZmbGUgfSBmcm9tIFwiLi9Db2xsZWN0aW9ucy9BcnJheS9zaHVmZmxlXCI7XG52YXIgYXNzZXJ0ID0gSW50ZWdlci5hc3NlcnQ7XG4vKipcbiAqIFRoaXMgbW9kdWxlIG9ubHkgYWN0cyBhcyBhIHV0aWxpdHkgQVBJIGZvciBnZXR0aW5nIHJhbmRvbSBudW1iZXJzIGZyb20gTWF0aC5yYW5kb20oKS5cbiAqIElmIHlvdSBuZWVkIHJlcGVhdGFibGUgc2VlZGVkIHJhbmRvbSBudW1iZXJzIHRoZW4geW91J2xsIG5lZWQgYSBzZXBhcmF0ZSB1dGlsaXR5LlxuICogSGlnaGx5IHJlY29tbWVuZGVkOiBodHRwczovL2dpdGh1Yi5jb20vY2trbmlnaHQvcmFuZG9tLWpzIHdoaWNoIGhhcyB0eXBpbmdzIHVuZGVyIEB0eXBlcy9yYW5kb20tanMuXG4gKi9cbmV4cG9ydCB2YXIgUmFuZG9tO1xuKGZ1bmN0aW9uIChSYW5kb20pIHtcbiAgICBmdW5jdGlvbiByKG1heEV4Y2x1c2l2ZSA9IDEpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heEV4Y2x1c2l2ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5yKGJvdW5kYXJ5LCBpbmNsdXNpdmUpIHtcbiAgICAgICAgY29uc3QgYSA9IE1hdGguYWJzKGJvdW5kYXJ5KTtcbiAgICAgICAgaWYgKGEgPT09IDAgfHwgYSA9PT0gMSAmJiAhaW5jbHVzaXZlKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGlmIChpbmNsdXNpdmUpXG4gICAgICAgICAgICBib3VuZGFyeSArPSBib3VuZGFyeSAvIGE7XG4gICAgICAgIHJldHVybiByKGJvdW5kYXJ5KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXJyYXlDb3B5KHNvdXJjZSkge1xuICAgICAgICBjb25zdCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBpbml0aWFsaXplKGxlbik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IHNvdXJjZVtpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgZnJvbSAwIHRvIHRoZSBtYXhFeGNsdXNpdmUuXG4gICAgICogTmVnYXRpdmUgbnVtYmVycyBhcmUgYWxsb3dlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXhFeGNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGludGVnZXIobWF4RXhjbHVzaXZlKSB7XG4gICAgICAgIHJldHVybiBuZXh0KG1heEV4Y2x1c2l2ZSk7XG4gICAgfVxuICAgIFJhbmRvbS5pbnRlZ2VyID0gaW50ZWdlcjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgcmFuZG9tIGZsb2F0aW5nIHBvaW50IG51bWJlcnMgdXAgdG8gdGhlIG1heEV4Y2x1c2l2ZSB2YWx1ZS5cbiAgICAgKiBVc2VmdWwgZm9yIGdlbmVyYXRpbmcgYSByYW5kb20gYW5kIG1lbW9pemFibGUgc2V0IGZvciB1c2Ugd2l0aCBvdGhlciBlbnVtZXJhYmxlcy5cbiAgICAgKiBAcGFyYW0gbWF4RXhjbHVzaXZlXG4gICAgICogQHJldHVybnMgeygpPT5udW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGUobWF4RXhjbHVzaXZlID0gMSkge1xuICAgICAgICByZXR1cm4gKCkgPT4gcihtYXhFeGNsdXNpdmUpO1xuICAgIH1cbiAgICBSYW5kb20uZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbiAgICAoZnVuY3Rpb24gKGdlbmVyYXRlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgcmFuZG9tIGludGVnZXJzIHVwIHRvIHRoZSBib3VuZGFyeS5cbiAgICAgICAgICogVXNlZnVsIGZvciBnZW5lcmF0aW5nIGEgcmFuZG9tIGFuZCBtZW1vaXphYmxlIHNldCBmb3IgdXNlIHdpdGggb3RoZXIgZW51bWVyYWJsZXMuXG4gICAgICAgICAqIEBwYXJhbSBib3VuZGFyeVxuICAgICAgICAgKiBAcGFyYW0gaW5jbHVzaXZlXG4gICAgICAgICAqIEByZXR1cm5zIHsoKT0+bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gaW50ZWdlcnMoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IG5yKGJvdW5kYXJ5LCBpbmNsdXNpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGdlbmVyYXRlLmludGVnZXJzID0gaW50ZWdlcnM7XG4gICAgfSkoZ2VuZXJhdGUgPSBSYW5kb20uZ2VuZXJhdGUgfHwgKFJhbmRvbS5nZW5lcmF0ZSA9IHt9KSk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGZyb20gMCB0byB0aGUgYm91bmRhcnkuXG4gICAgICogUmV0dXJuIHZhbHVlIHdpbGwgYmUgbGVzcyB0aGFuIHRoZSBib3VuZGFyeSB1bmxlc3MgaW5jbHVzaXZlIGlzIHNldCB0byB0cnVlLlxuICAgICAqIE5lZ2F0aXZlIG51bWJlcnMgYXJlIGFsbG93ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYm91bmRhcnlcbiAgICAgKiBAcGFyYW0gaW5jbHVzaXZlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBuZXh0KGJvdW5kYXJ5LCBpbmNsdXNpdmUpIHtcbiAgICAgICAgYXNzZXJ0KGJvdW5kYXJ5LCAnYm91bmRhcnknKTtcbiAgICAgICAgcmV0dXJuIG5yKGJvdW5kYXJ5LCBpbmNsdXNpdmUpO1xuICAgIH1cbiAgICBSYW5kb20ubmV4dCA9IG5leHQ7XG4gICAgKGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGludGVnZXIoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5uZXh0KGJvdW5kYXJ5LCBpbmNsdXNpdmUpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQuaW50ZWdlciA9IGludGVnZXI7XG4gICAgICAgIGZ1bmN0aW9uIGZsb2F0KGJvdW5kYXJ5ID0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICAgICAgaWYgKGlzTmFOKGJvdW5kYXJ5KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBcIidib3VuZGFyeScgaXMgbm90IGEgbnVtYmVyLlwiO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiBib3VuZGFyeTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0LmZsb2F0ID0gZmxvYXQ7XG4gICAgICAgIGZ1bmN0aW9uIGluUmFuZ2UobWluLCBtYXgsIGluY2x1c2l2ZSkge1xuICAgICAgICAgICAgYXNzZXJ0KG1pbiwgJ21pbicpO1xuICAgICAgICAgICAgYXNzZXJ0KG1heCwgJ21heCcpO1xuICAgICAgICAgICAgbGV0IHJhbmdlID0gbWF4IC0gbWluO1xuICAgICAgICAgICAgaWYgKHJhbmdlID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBtaW47XG4gICAgICAgICAgICBpZiAoaW5jbHVzaXZlKVxuICAgICAgICAgICAgICAgIHJhbmdlICs9IHJhbmdlIC8gTWF0aC5hYnMocmFuZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIG1pbiArIHIocmFuZ2UpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQuaW5SYW5nZSA9IGluUmFuZ2U7XG4gICAgfSkobmV4dCA9IFJhbmRvbS5uZXh0IHx8IChSYW5kb20ubmV4dCA9IHt9KSk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiByYW5kb20gaW50ZWdlcnMuXG4gICAgICogQHBhcmFtIGNvdW50XG4gICAgICogQHBhcmFtIGJvdW5kYXJ5XG4gICAgICogQHBhcmFtIGluY2x1c2l2ZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnRlZ2Vycyhjb3VudCwgYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICBhc3NlcnQoY291bnQpO1xuICAgICAgICBjb25zdCBzID0gW107XG4gICAgICAgIHMubGVuZ3RoID0gY291bnQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgc1tpXSA9IG5yKGJvdW5kYXJ5LCBpbmNsdXNpdmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbiAgICBSYW5kb20uaW50ZWdlcnMgPSBpbnRlZ2VycztcbiAgICAvKipcbiAgICAgKiBTaHVmZmxlcyBhbiBhcnJheS5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHJldHVybnMge1R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5U2h1ZmZsZSh0YXJnZXQpO1xuICAgIH1cbiAgICBSYW5kb20uc2h1ZmZsZSA9IHNodWZmbGU7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgYW4gYXJyYXktbGlrZSAgYW5kIHJldHVybnMgaXQgc2h1ZmZsZWQuXG4gICAgICogQHBhcmFtIHNvdXJjZVxuICAgICAqIEByZXR1cm5zIHtUW119XG4gICAgICovXG4gICAgZnVuY3Rpb24gY29weShzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5U2h1ZmZsZShhcnJheUNvcHkoc291cmNlKSk7XG4gICAgfVxuICAgIFJhbmRvbS5jb3B5ID0gY29weTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZGlzdGluY3QgcmFuZG9tIHNldCBmcm9tIHRoZSBzb3VyY2UgYXJyYXkgdXAgdG8gdGhlIG1heENvdW50IG9yIHRoZSBmdWxsIGxlbmd0aCBvZiB0aGUgYXJyYXkuXG4gICAgICogQHBhcmFtIHNvdXJjZVxuICAgICAqIEBwYXJhbSBtYXhDb3VudFxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2VsZWN0KHNvdXJjZSwgbWF4Q291bnQpIHtcbiAgICAgICAgaWYgKG1heENvdW50ICE9PSBJbmZpbml0eSlcbiAgICAgICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihtYXhDb3VudCk7XG4gICAgICAgIHN3aXRjaCAobWF4Q291bnQpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzZWxlY3Qub25lKHNvdXJjZSwgdHJ1ZSldO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXJyYXlTaHVmZmxlKGFycmF5Q29weShzb3VyY2UpKTtcbiAgICAgICAgICAgICAgICBpZiAobWF4Q291bnQgPCByZXN1bHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubGVuZ3RoID0gbWF4Q291bnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSYW5kb20uc2VsZWN0ID0gc2VsZWN0O1xuICAgIChmdW5jdGlvbiAoc2VsZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uZShzb3VyY2UsIHRocm93SWZFbXB0eSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZSAmJiBzb3VyY2UubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiBzb3VyY2Vbcihzb3VyY2UubGVuZ3RoKV07XG4gICAgICAgICAgICBpZiAodGhyb3dJZkVtcHR5KVxuICAgICAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IHNlbGVjdCBmcm9tIGFuIGVtcHR5IHNldC5cIjtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3Qub25lID0gb25lO1xuICAgIH0pKHNlbGVjdCA9IFJhbmRvbS5zZWxlY3QgfHwgKFJhbmRvbS5zZWxlY3QgPSB7fSkpO1xufSkoUmFuZG9tIHx8IChSYW5kb20gPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmFuZG9tLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vUmFuZG9tLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbi8qKlxuICogUmFuZG9taXplIGFycmF5IGVsZW1lbnQgb3JkZXIgaW4tcGxhY2UuXG4gKiBVc2luZyBEdXJzdGVuZmVsZCBzaHVmZmxlIGFsZ29yaXRobS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNodWZmbGUodGFyZ2V0KSB7XG4gICAgbGV0IGkgPSB0YXJnZXQubGVuZ3RoO1xuICAgIHdoaWxlICgtLWkpIHtcbiAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICBjb25zdCB0ZW1wID0gdGFyZ2V0W2ldO1xuICAgICAgICB0YXJnZXRbaV0gPSB0YXJnZXRbal07XG4gICAgICAgIHRhcmdldFtqXSA9IHRlbXA7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaHVmZmxlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvc2h1ZmZsZS5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIE9yaWdpbjogaHR0cDovL3d3dy5mYWxsaW5nY2FuYmVkZWFkbHkuY29tL1xuICogTGljZW5zaW5nOiBNSVRcbiAqL1xuaW1wb3J0IHsgUmVhZE9ubHlDb2xsZWN0aW9uQmFzZSB9IGZyb20gXCIuL1JlYWRPbmx5Q29sbGVjdGlvbkJhc2VcIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yQmFzZVwiO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuLi9JbnRlZ2VyXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmV4cG9ydCBjbGFzcyBMYXp5TGlzdCBleHRlbmRzIFJlYWRPbmx5Q29sbGVjdGlvbkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9lbnVtZXJhdG9yID0gc291cmNlLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgdGhpcy5fY2FjaGVkID0gW107XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuX2VudW1lcmF0b3I7XG4gICAgICAgIHRoaXMuX2VudW1lcmF0b3IgPSBudWxsO1xuICAgICAgICBpZiAoZSlcbiAgICAgICAgICAgIGUuZGlzcG9zZSgpO1xuICAgICAgICBjb25zdCBjID0gdGhpcy5fY2FjaGVkO1xuICAgICAgICB0aGlzLl9jYWNoZWQgPSBudWxsO1xuICAgICAgICBpZiAoYylcbiAgICAgICAgICAgIGMubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgX2dldENvdW50KCkge1xuICAgICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgICBjb25zdCBjID0gdGhpcy5fY2FjaGVkO1xuICAgICAgICByZXR1cm4gYyA/IGMubGVuZ3RoIDogMDtcbiAgICB9XG4gICAgX2dldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGxldCBjdXJyZW50O1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSAwO1xuICAgICAgICB9LCB5aWVsZGVyID0+IHtcbiAgICAgICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy5fY2FjaGVkO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyZW50IDwgYy5sZW5ndGggfHwgdGhpcy5nZXROZXh0KCkpXG4gICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKGNbY3VycmVudCsrXSlcbiAgICAgICAgICAgICAgICA6IHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0KGluZGV4KSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihpbmRleCk7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIHdoaWxlIChjLmxlbmd0aCA8PSBpbmRleCAmJiB0aGlzLmdldE5leHQoKSkgeyB9XG4gICAgICAgIGlmIChpbmRleCA8IGMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIGNbaW5kZXhdO1xuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwiaW5kZXhcIiwgXCJHcmVhdGVyIHRoYW4gdG90YWwgY291bnQuXCIpO1xuICAgIH1cbiAgICBpbmRleE9mKGl0ZW0pIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuX2NhY2hlZDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGMuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgd2hpbGUgKHJlc3VsdCA9PSAtMSAmJiB0aGlzLmdldE5leHQodmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09IGl0ZW0pXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYy5sZW5ndGggLSAxO1xuICAgICAgICB9KSkgeyB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGNvbnRhaW5zKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXhPZihpdGVtKSAhPSAtMTtcbiAgICB9XG4gICAgZ2V0TmV4dChvdXQpIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuX2VudW1lcmF0b3I7XG4gICAgICAgIGlmICghZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlLmN1cnJlbnQ7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZWQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAob3V0KVxuICAgICAgICAgICAgICAgIG91dCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fZW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLmdldE5leHQoKSkgeyB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGF6eUxpc3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9MYXp5TGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBDb2xsZWN0aW9uQmFzZSB9IGZyb20gXCIuL0NvbGxlY3Rpb25CYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmV4cG9ydCBjbGFzcyBSZWFkT25seUNvbGxlY3Rpb25CYXNlIGV4dGVuZHMgQ29sbGVjdGlvbkJhc2Uge1xuICAgIGdldENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q291bnQoKTtcbiAgICB9XG4gICAgZ2V0SXNSZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgX2FkZEludGVybmFsKGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfcmVtb3ZlSW50ZXJuYWwoZW50cnksIG1heCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgX2NsZWFySW50ZXJuYWwoKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RW51bWVyYXRvcigpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFJlYWRPbmx5Q29sbGVjdGlvbkJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZWFkT25seUNvbGxlY3Rpb25CYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvUmVhZE9ubHlDb2xsZWN0aW9uQmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIC5ORVQgUmVmZXJlbmNlOiBodHRwOi8vcmVmZXJlbmNlc291cmNlLm1pY3Jvc29mdC5jb20vI21zY29ybGliL3N5c3RlbS90ZXh0L1N0cmluZ0J1aWxkZXIuY3NcbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uL1R5cGVzXCI7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIElNUE9SVEFOVCBOT1RFUyBBQk9VVCBQRVJGT1JNQU5DRTpcbiAqIGh0dHA6Ly9qc3BlcmYuY29tL3N0cmluZy1jb25jYXRlbmF0aW9uLWxvb3BlZFxuICogaHR0cDovL2pzcGVyZi5jb20vYWRkaW5nLXN0cmluZ3MtdG8tYW4tYXJyYXlcbiAqIGh0dHA6Ly9qc3BlcmYuY29tL3N0cmluZy1jb25jYXRlbmF0aW9uLXZlcnN1cy1hcnJheS1vcGVyYXRpb25zLXdpdGgtam9pblxuICpcbiAqIEl0IGlzIGNsZWFybHkgaW5lZmZpY2llbnQgdG8gdXNlIGEgU3RyaW5nQnVpbGRlciBvciBMaW5rZWRMaXN0IHRvIGJ1aWxkIGEgc3RyaW5nIHdoZW4geW91IGhhdmUgYSBzbWFsbCBzZXQgb2Ygc3RyaW5nIHBvcnRpb25zLlxuICogU3RyaW5nQnVpbGRlciB3aWxsIHJlYWxseSBzaG93IGl0J3MgYmVuZWZpdCBsaWtlbHkgc29tZXdoZXJlIGFib3ZlIDEwMDAgaXRlbXMuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCBFTVBUWSA9IFwiXCI7XG5jb25zdCBORVdMSU5FID0gXCJcXHJcXG5cIjtcbmV4cG9ydCBjbGFzcyBTdHJpbmdCdWlsZGVyIHtcbiAgICBjb25zdHJ1Y3RvciguLi5pbml0aWFsKSB7XG4gICAgICAgIHRoaXMuX2xhdGVzdCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcnRBcnJheSA9IFtdO1xuICAgICAgICB0aGlzLmFwcGVuZFRoZXNlKGluaXRpYWwpO1xuICAgIH1cbiAgICBhcHBlbmRTaW5nbGUoaXRlbSkge1xuICAgICAgICBpZiAoaXRlbSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgICAgIF8uX2xhdGVzdCA9IG51bGw7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBpdGVtKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlLk9CSkVDVDpcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGUuRlVOQ1RJT046XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXy5fcGFydEFycmF5LnB1c2goaXRlbSk7IC8vIE90aGVyIHByaW1pdGl2ZSB0eXBlcyBjYW4ga2VlcCB0aGVpciBmb3JtYXQgc2luY2UgYSBudW1iZXIgb3IgYm9vbGVhbiBpcyBhIHNtYWxsZXIgZm9vdHByaW50IHRoYW4gYSBzdHJpbmcuXG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kVGhlc2UoaXRlbXMpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGl0ZW1zLmZvckVhY2gocyA9PiBfLmFwcGVuZFNpbmdsZShzKSk7XG4gICAgICAgIHJldHVybiBfO1xuICAgIH1cbiAgICBhcHBlbmQoLi4uaXRlbXMpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRUaGVzZShpdGVtcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhcHBlbmRMaW5lKC4uLml0ZW1zKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kTGluZXMoaXRlbXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYXBwZW5kTGluZXMoaXRlbXMpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBpZiAoaSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgXy5hcHBlbmRTaW5nbGUoaSk7XG4gICAgICAgICAgICAgICAgXy5fcGFydEFycmF5LnB1c2goTkVXTElORSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gXztcbiAgICB9XG4gICAgLyoqIC8vLyBUaGVzZSBtZXRob2RzIGNhbiBvbmx5IGVmZmljaWVudGx5IGJlIGFkZGVkIGlmIG5vdCB1c2luZyBhIHNpbmdsZSBhcnJheS5cbiAgICAgaW5zZXJ0KGluZGV4OiBudW1iZXIsIHZhbHVlOiBzdHJpbmcsIGNvdW50OiBudW1iZXIgPSAxKTogU3RyaW5nQnVpbGRlclxuICAgICB7XG4gICAgfVxuICAgICByZW1vdmUoc3RhcnRJbmRleDpudW1iZXIsIGxlbmd0aDpudW1iZXIpOiBTdHJpbmdCdWlsZGVyXG4gICAgIHtcbiAgICB9XG4gICAgIC8qKi9cbiAgICBnZXQgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnRBcnJheS5sZW5ndGggPT09IDA7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBsZXQgbGF0ZXN0ID0gdGhpcy5fbGF0ZXN0O1xuICAgICAgICBpZiAobGF0ZXN0ID09IG51bGwpXG4gICAgICAgICAgICB0aGlzLl9sYXRlc3QgPSBsYXRlc3QgPSB0aGlzLl9wYXJ0QXJyYXkuam9pbihFTVBUWSk7XG4gICAgICAgIHJldHVybiBsYXRlc3Q7XG4gICAgfVxuICAgIGpvaW4oZGVsaW1pdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJ0QXJyYXkuam9pbihkZWxpbWl0ZXIpO1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fcGFydEFycmF5Lmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2xhdGVzdCA9IG51bGw7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBTdHJpbmdCdWlsZGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3RyaW5nQnVpbGRlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1RleHQvU3RyaW5nQnVpbGRlci5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiXSwic291cmNlUm9vdCI6IiJ9