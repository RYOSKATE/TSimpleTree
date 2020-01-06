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
        this.isFinite = false;
        this.isValidNumber = false;
        this.isString = false;
        this.isTrueNaN = false;
        this.isObject = false;
        this.isFunction = false;
        this.isUndefined = false;
        this.isNull = false;
        this.isPrimitive = false;
        this.isSymbol = false;
        this.isArray = false;
        this.isNullOrUndefined = false;
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
        super(NAME);
        this._initializer = _initializer;
        this._tryGetNext = _tryGetNext;
        this.reset();
        if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isBoolean(isEndless))
            this._isEndless = isEndless;
        else if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isBoolean(disposer))
            this._isEndless = disposer;
        else
            this._isEndless = false;
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
        _._yielder = undefined;
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
        _._yielder = undefined;
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
    const NUMBER = "number" /* Number */;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exception__ = __webpack_require__(41);
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
    constructor(_disposableObjectName, __finalizer) {
        this._disposableObjectName = _disposableObjectName;
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
                if (_.__finalizer) // Private finalizer...
                 {
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
            while (i < Math.min(e.length, max)) {
                if (action(e[i], i++) === false)
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
            // Don't trap the exception in order to allow it to propagate the stack trace.
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
                if (len < 0) // Null is allowed but will exit immediately.
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
class Functions {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Environment__ = __webpack_require__(48);
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
        super(NAME);
        this._equalityComparer = _equalityComparer;
        this._importEntries(source);
        this._updateRecursion = 0;
        this._modifiedCount = 0;
        this._version = 0;
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
            while (e.moveNext()) // Disposes when finished.
             {
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
     * .linq will return an LinqEnumerable if .linqAsync() has completed successfully or the default module loader is NodeJS+CommonJS.
     * @returns {LinqEnumerable}
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
                    ? `using .linq to load and initialize a LinqEnumerable is currently only supported within a NodeJS environment.
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
     * Returns an LinqEnumerable if one is already available, otherwise undefined.
     * Passing no parameters will still initiate loading and initializing the LinqEnumerable which can be useful for pre-loading.
     * Any call to .linqAsync() where an LinqEnumerable is returned can be assured that any subsequent calls to .linq will return the same instance.
     * @param callback
     * @returns {LinqEnumerable}
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__ = __webpack_require__(42);
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
        super(OBJECT_POOL);
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
        this._pool = [];
        this._trimmer = new __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__["a" /* TaskHandler */](() => this._trim());
        const clear = () => this._clear();
        this._flusher = new __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__["a" /* TaskHandler */](clear);
        this._autoFlusher = new __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__["a" /* TaskHandler */](clear);
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
        this.throwIfDisposed();
        this._trimmer.cancel();
        this._flusher.cancel();
        const p = this._pool;
        this._pool = [];
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
        return ++this._index;
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
        this._index = -1;
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
/* harmony export (immutable) */ __webpack_exports__["Enumerable"] = Enumerable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__System_Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__System_Collections_Array_copy__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__System_Collections_Array_Compare__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__System_Collections_Enumeration_EmptyEnumerator__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__System_Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__System_Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__System_Functions__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__System_Collections_Enumeration_ArrayEnumerator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__System_Disposable_DisposableBase__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__System_Collections_Enumeration_UnsupportedEnumerableException__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__System_Disposable_ObjectDisposedException__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__System_Collections_Sorting_KeySortedContext__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__System_Collections_Enumeration_IndexEnumerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__System_Collections_Enumeration_IteratorEnumerator__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__System_Collections_Array_initialize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__System_Random__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__System_Collections_Enumeration_InfiniteEnumerator__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__System_Collections_LazyList__ = __webpack_require__(59);
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
        super("InfiniteLinqEnumerable", finalizer);
        this._enumeratorFactory = _enumeratorFactory;
        this._isEndless = true;
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
                    if (actionResult !== 2 /* Skip */) // || !== 2
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
        if (!isFinite(count)) // +Infinity equals skip all so return empty.
            return new InfiniteLinqEnumerable(getEmptyEnumerator);
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count");
        return this.where((element, index) => index >= count);
    }
    take(count) {
        if (!(count > 0)) // Out of bounds? Empty.
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
                                if (next) // In case by chance next is null, then try again.
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
                    if (enumerator && enumerator.moveNext()) // 2) Keep returning until done.
                        return yielder.yieldReturn(enumerator.current);
                    if (enumerator) // 3) Dispose and reset for next.
                     {
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
                if (count == n) { // Inserting?
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
                    case 0 /* Break */: // We're done?
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
        // @ts-ignore
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
            //@ts-ignore
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
        if (!(count > 0)) // Out of bounds?
            return _;
        if (!isFinite(count)) // +Infinity equals skip all so return empty.
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
        if (!(count > 0)) // Out of bounds? Empty.
            return Enumerable.empty();
        const _ = this;
        if (!isFinite(count)) // Infinity means return all.
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
                if (len % 32 == 0) // Shrink?
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
        //@ts-ignore
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
        // @ts-ignore
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
        // @ts-ignore
        this._disposableObjectName = "ArrayEnumerable";
        this._source = source;
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
        // noinspection SuspiciousInstanceOfGuard
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
/* harmony export (immutable) */ __webpack_exports__["ArrayEnumerable"] = ArrayEnumerable;

class Grouping extends ArrayEnumerable {
    constructor(_groupKey, elements) {
        super(elements);
        this._groupKey = _groupKey;
        // @ts-ignore
        this._disposableObjectName = "Grouping";
    }
    get key() {
        return this._groupKey;
    }
}
/* harmony export (immutable) */ __webpack_exports__["Grouping"] = Grouping;

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
/* harmony export (immutable) */ __webpack_exports__["Lookup"] = Lookup;

class OrderedEnumerable extends FiniteEnumerable {
    constructor(source, keySelector, order, parent, comparer = __WEBPACK_IMPORTED_MODULE_0__System_Compare__["b" /* compare */]) {
        super(NULL);
        this.source = source;
        this.keySelector = keySelector;
        this.order = order;
        this.parent = parent;
        this.comparer = comparer;
        Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(source && source.isEndless);
        // @ts-ignore
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
/* harmony export (immutable) */ __webpack_exports__["OrderedEnumerable"] = OrderedEnumerable;

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
        // noinspection SuspiciousInstanceOfGuard
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
    let random;
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
/* 33 */
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
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
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
var Linq_1 = __webpack_require__(32);
var StringBuilder_1 = __webpack_require__(61);
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
        var _this_1 = this;
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
                    next.Parent.firstChild = _this_1.ThisNode;
                    _this_1.CyclicPrev.cyclicNext = _this_1.ThisNode;
                    next.cyclicPrev = _this_1.ThisNode;
                };
            }
            return function () {
                _this_1.CyclicPrev.cyclicNext = _this_1.ThisNode;
                next.cyclicPrev = _this_1.ThisNode;
            };
        }
        var parent = this.Parent;
        parent.firstChild = null;
        return function () {
            parent.firstChild = _this_1.ThisNode;
        };
    };
    Node.prototype.toString = function () {
        var builder = new StringBuilder_1.StringBuilder();
        this.ToStringPrivate(this.ThisNode, 0, builder);
        return builder.toString();
    };
    Node.prototype.ToStringPrivate = function (node, depth, builder) {
        var _this_1 = this;
        if (node == null) {
            return;
        }
        for (var i = 0; i < depth; i++) {
            builder.append('  ');
        }
        builder.appendLine(!node.Value != null ? node.Value.toString() : '');
        var children = node.Children();
        children.forEach(function (child) {
            _this_1.ToStringPrivate(child, depth + 1, builder);
        });
    };
    return Node;
}();
exports.Node = Node;

/***/ }),
/* 41 */
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
        this.name = this.getName();
        this.data = {};
        if (innerException)
            this.data['innerException'] = innerException;
        /* Originally intended to use 'get' accessors for properties,
         * But debuggers don't display these readily yet.
         * Object.freeze has to be used carefully, but will prevent overriding values at runtime.
         */
        if (beforeSealing)
            beforeSealing(this);
        // Node has a .stack, let's use it...
        try {
            let stack = eval("new Error()").stack;
            stack = stack
                && stack
                    .replace(/^Error\n/, '')
                    .replace(/(.|\n)+\s+at new.+/, '')
                || '';
            this.stack = this.toStringWithoutBrackets() + stack;
        }
        catch (ex) {
            this.stack = "";
        }
        Object.freeze(this);
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
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TaskHandlerBase__ = __webpack_require__(43);
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
/* 43 */
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
        super(NAME);
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
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LinkedNodeList__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Disposable_ObjectPool__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__getIdentifier__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DictionaryBase__ = __webpack_require__(47);
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
                throw new Error(`"${hash.toString()}" cannot be added to lookup table.`);
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
/* 45 */
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
/* 46 */
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
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Enumeration_Enumerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CollectionBase__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__KeyNotFoundException__ = __webpack_require__(51);
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
                if (value !== VOID0) // Still valid?
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
/* 48 */
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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(49)))

/***/ }),
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Array_Utility__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_NotImplementedException__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CollectionBase__ = __webpack_require__(17);
/*
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
        this._head = 0;
        this._tail = 0;
        this._size = 0;
        if (!source)
            this._array = emptyArray;
        else {
            if (__WEBPACK_IMPORTED_MODULE_2__Types__["a" /* Type */].isNumber(source)) {
                const capacity = source;
                assertIntegerZeroOrGreater(capacity, "capacity");
                this._array = capacity
                    ? __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["c" /* initialize */](capacity)
                    : emptyArray;
            }
            else {
                const se = source;
                this._array = __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["c" /* initialize */](__WEBPACK_IMPORTED_MODULE_2__Types__["a" /* Type */].isArrayLike(se)
                    ? se.length
                    : DEFAULT_CAPACITY);
                this._importEntries(se);
            }
        }
        this._capacity = this._array.length;
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
        if (this._array != emptyArray) {
            this._array.length = this._capacity = 0;
            this._array = emptyArray;
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
        if (!this._size)
            return false;
        const array = this._array, head = this._head;
        const removed = this._array[head];
        array[head] = null;
        this._head = (head + 1) % this._capacity;
        this._size--;
        this._incrementModified();
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
/* 53 */
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
        if (equalityComparer == __WEBPACK_IMPORTED_MODULE_2__Compare__["a" /* areEqual */] && (array) instanceof (Array) && !__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isTrueNaN(item))
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
/* 54 */
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
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SortContext__ = __webpack_require__(56);
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
/* 56 */
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
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Random; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collections_Array_initialize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collections_Array_shuffle__ = __webpack_require__(58);
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
/* 58 */
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
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ReadOnlyCollectionBase__ = __webpack_require__(60);
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
/* 60 */
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
/* 61 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIDgwMmE3NmE4ZDFkMDM3ODNhZmQyIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUeXBlcy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29tcGFyZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnROdWxsRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxBcmd1bWVudEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVudW1lcmF0b3JCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxJbnRlZ2VyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxTeXN0ZW1FeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXERpc3Bvc2FibGVcXERpc3Bvc2FibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGluaXRpYWxpemUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcRW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcZGlzcG9zZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJbmRleEVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSXRlcmF0b3JSZXN1bHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEZ1bmN0aW9ucy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXENvbGxlY3Rpb25CYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGNvcHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRleHRcXFV0aWxpdHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcQXJyYXlFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxEaXNwb3NhYmxlXFxPYmplY3REaXNwb3NlZEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcT2JqZWN0UG9vbC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSW5maW5pdGVFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXFNpbXBsZUVudW1lcmFibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVtcHR5RW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJdGVyYXRvckVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXHNyY1xcU3RyaW5nRXh0ZW5zaW9uLnRzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtLkxpbnFcXExpbnEuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxBcnJheVxcQ29tcGFyZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcc3JjXFxpbmRleC50cyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcc3JjXFxTdHJpbmdOb2RlLnRzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxzcmNcXE5hbWVkTm9kZS50cyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcc3JjXFxOb2RlLnRzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRocmVhZGluZ1xcVGFza3NcXFRhc2tIYW5kbGVyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUaHJlYWRpbmdcXFRhc2tzXFxUYXNrSGFuZGxlckJhc2UuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxEaWN0aW9uYXJpZXNcXERpY3Rpb25hcnkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxMaW5rZWROb2RlTGlzdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXERpY3Rpb25hcmllc1xcZ2V0SWRlbnRpZmllci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXERpY3Rpb25hcmllc1xcRGljdGlvbmFyeUJhc2UuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEVudmlyb25tZW50LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHByb2Nlc3NcXGJyb3dzZXIuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEtleVZhbHVlRXh0cmFjdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEtleU5vdEZvdW5kRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcUXVldWUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxBcnJheVxcVXRpbGl0eS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcTm90SW1wbGVtZW50ZWRFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxTb3J0aW5nXFxLZXlTb3J0ZWRDb250ZXh0LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcU29ydGluZ1xcU29ydENvbnRleHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFJhbmRvbS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEFycmF5XFxzaHVmZmxlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcTGF6eUxpc3QuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxSZWFkT25seUNvbGxlY3Rpb25CYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUZXh0XFxTdHJpbmdCdWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQTs7Ozs7Ozs7QUM3REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdJQUFnSSw2REFBNkQsRUFBRTtBQUMvTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUFBO0FBQUE7QUFDTTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxDQUFDO0FBQUE7QUFBQTtBQUNELG9DOzs7Ozs7O0FDdkZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDa0Q7QUFDbEQ7QUFDTyxxQ0FBcUMsdUVBQWM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFBQTtBQUFBO0FBQ2MsZ0dBQXNCLEVBQUM7QUFDdEMsa0Q7Ozs7Ozs7QUM3QkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0RBQUk7QUFDekIscUJBQXFCLG9EQUFJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUFBO0FBQUE7QUFDYyw0RUFBYSxFQUFDO0FBQzdCLHlDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDgwMmE3NmE4ZDFkMDM3ODNhZmQyIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuY29uc3QgVk9JRDAgPSB2b2lkICgwKSwgX0JPT0xFQU4gPSB0eXBlb2YgdHJ1ZSwgX05VTUJFUiA9IHR5cGVvZiAwLCBfU1RSSU5HID0gdHlwZW9mIFwiXCIsIF9TWU1CT0wgPSBcInN5bWJvbFwiLCBfT0JKRUNUID0gdHlwZW9mIHt9LCBfVU5ERUZJTkVEID0gdHlwZW9mIFZPSUQwLCBfRlVOQ1RJT04gPSB0eXBlb2YgZnVuY3Rpb24gKCkgeyB9LCBMRU5HVEggPSBcImxlbmd0aFwiO1xuLy8gT25seSB1c2VkIGZvciBwcmltaXRpdmVzLlxuY29uc3QgdHlwZUluZm9SZWdpc3RyeSA9IHt9O1xuLyoqXG4gKiBFeHBvc2VzIGVhc3kgYWNjZXNzIHRvIHR5cGUgaW5mb3JtYXRpb24gaW5jbHVkaW5nIGlucXVpcmluZyBhYm91dCBtZW1iZXJzLlxuICovXG5leHBvcnQgY2xhc3MgVHlwZUluZm8ge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgb25CZWZvcmVGcmVlemUpIHtcbiAgICAgICAgdGhpcy5pc0Jvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc051bWJlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRmluaXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNWYWxpZE51bWJlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RyaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNUcnVlTmFOID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNPYmplY3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0Z1bmN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNVbmRlZmluZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3ltYm9sID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNBcnJheSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTnVsbE9yVW5kZWZpbmVkID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlID0gdHlwZW9mIHRhcmdldCkge1xuICAgICAgICAgICAgY2FzZSBfQk9PTEVBTjpcbiAgICAgICAgICAgICAgICB0aGlzLmlzQm9vbGVhbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9OVU1CRVI6XG4gICAgICAgICAgICAgICAgdGhpcy5pc051bWJlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1RydWVOYU4gPSBpc05hTih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNGaW5pdGUgPSBpc0Zpbml0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZE51bWJlciA9ICF0aGlzLmlzVHJ1ZU5hTjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX1NUUklORzpcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3RyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX1NZTUJPTDpcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3ltYm9sID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc051bGxPclVuZGVmaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FycmF5ID0gKHRhcmdldCkgaW5zdGFuY2VvZiAoQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9GVU5DVElPTjpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRnVuY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfVU5ERUZJTkVEOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNVbmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNOdWxsT3JVbmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkZhdGFsIHR5cGUgZmFpbHVyZS4gIFVua25vd24gdHlwZTogXCIgKyB0aGlzLnR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uQmVmb3JlRnJlZXplKVxuICAgICAgICAgICAgb25CZWZvcmVGcmVlemUodGhpcyk7XG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBUeXBlSW5mbyBmb3IgYW55IG1lbWJlciBvciBub24tbWVtYmVyLFxuICAgICAqIHdoZXJlIG5vbi1tZW1iZXJzIGFyZSBvZiB0eXBlIHVuZGVmaW5lZC5cbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEByZXR1cm5zIHtUeXBlSW5mb31cbiAgICAgKi9cbiAgICBtZW1iZXIobmFtZSkge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIHJldHVybiBUeXBlSW5mby5nZXRGb3IodCAmJiAobmFtZSkgaW4gKHQpXG4gICAgICAgICAgICA/IHRbbmFtZV1cbiAgICAgICAgICAgIDogVk9JRDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgVHlwZUluZm8gZm9yIGFueSB0YXJnZXQgb2JqZWN0LlxuICAgICAqIElmIHRoZSB0YXJnZXQgb2JqZWN0IGlzIG9mIGEgcHJpbWl0aXZlIHR5cGUsIGl0IHJldHVybnMgdGhlIFR5cGVJbmZvIGluc3RhbmNlIGFzc2lnbmVkIHRvIHRoYXQgdHlwZS5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHJldHVybnMge1R5cGVJbmZvfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRGb3IodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdGFyZ2V0O1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgIGNhc2UgX0ZVTkNUSU9OOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVHlwZUluZm8odGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5mbyA9IHR5cGVJbmZvUmVnaXN0cnlbdHlwZV07XG4gICAgICAgIGlmICghaW5mbylcbiAgICAgICAgICAgIHR5cGVJbmZvUmVnaXN0cnlbdHlwZV0gPSBpbmZvID0gbmV3IFR5cGVJbmZvKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhcmdldCBtYXRjaGVzIHRoZSB0eXBlIChpbnN0YW5jZW9mKS5cbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgdHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSB0YXJnZXQgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIE90aGVyd2lzZSByZXR1cm5zIHRoZSB0YXJnZXQgYXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7VHxudWxsfVxuICAgICAqL1xuICAgIGFzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgdHlwZSA/IHRoaXMudGFyZ2V0IDogbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gVHlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVJbmZvKHRhcmdldCk7XG59XG4oZnVuY3Rpb24gKFR5cGUpIHtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgdHJ1ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5CT09MRUFOID0gX0JPT0xFQU47XG4gICAgLyoqXG4gICAgICogdHlwZW9mIDBcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuTlVNQkVSID0gX05VTUJFUjtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgXCJcIlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5TVFJJTkcgPSBfU1RSSU5HO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiB7fVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5PQkpFQ1QgPSBfT0JKRUNUO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiBTeW1ib2xcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuU1lNQk9MID0gX1NZTUJPTDtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgdW5kZWZpbmVkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLlVOREVGSU5FRCA9IF9VTkRFRklORUQ7XG4gICAgLyoqXG4gICAgICogdHlwZW9mIGZ1bmN0aW9uXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLkZVTkNUSU9OID0gX0ZVTkNUSU9OO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFyZ2V0IG1hdGNoZXMgdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtUfG51bGx9XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModGFyZ2V0LCB0eXBlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgICBUeXBlLmlzID0gaXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSB0YXJnZXQgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIE90aGVyd2lzZSByZXR1cm5zIHRoZSB0YXJnZXQgYXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMge1R8bnVsbH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcyh0YXJnZXQsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIHR5cGUgPyB0YXJnZXQgOiBudWxsO1xuICAgIH1cbiAgICBUeXBlLmFzID0gYXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGw7XG4gICAgfVxuICAgIFR5cGUuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIGJvb2xlYW4uXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9CT09MRUFOO1xuICAgIH1cbiAgICBUeXBlLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIG51bWJlci5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gaWdub3JlTmFOIERlZmF1bHQgaXMgZmFsc2UuIFdoZW4gdHJ1ZSwgTmFOIGlzIG5vdCBjb25zaWRlcmVkIGEgbnVtYmVyIGFuZCB3aWxsIHJldHVybiBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSwgaWdub3JlTmFOID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX05VTUJFUiAmJiAoIWlnbm9yZU5hTiB8fCAhaXNOYU4odmFsdWUpKTtcbiAgICB9XG4gICAgVHlwZS5pc051bWJlciA9IGlzTnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBpcyBhIG51bWJlciBhbmQgaXMgTmFOLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzVHJ1ZU5hTih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfTlVNQkVSICYmIGlzTmFOKHZhbHVlKTtcbiAgICB9XG4gICAgVHlwZS5pc1RydWVOYU4gPSBpc1RydWVOYU47XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX1NUUklORztcbiAgICB9XG4gICAgVHlwZS5pc1N0cmluZyA9IGlzU3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLCBzdHJpbmcsIG51bWJlciwgbnVsbCwgb3IgdW5kZWZpbmVkLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhbGxvd1VuZGVmaW5lZCBpZiBzZXQgdG8gdHJ1ZSB3aWxsIHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWUsIGFsbG93VW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdCA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgICBjYXNlIF9CT09MRUFOOlxuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBfTlVNQkVSOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgY2FzZSBfVU5ERUZJTkVEOlxuICAgICAgICAgICAgICAgIHJldHVybiBhbGxvd1VuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBUeXBlLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG4gICAgLyoqXG4gICAgICogRm9yIGRldGVjdGluZyBpZiB0aGUgdmFsdWUgY2FuIGJlIHVzZWQgYXMgYSBrZXkuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIGFsbG93VW5kZWZpbmVkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1ByaW1pdGl2ZU9yU3ltYm9sKHZhbHVlLCBhbGxvd1VuZGVmaW5lZCA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9TWU1CT0wgPyB0cnVlIDogaXNQcmltaXRpdmUodmFsdWUsIGFsbG93VW5kZWZpbmVkKTtcbiAgICB9XG4gICAgVHlwZS5pc1ByaW1pdGl2ZU9yU3ltYm9sID0gaXNQcmltaXRpdmVPclN5bWJvbDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLCBudW1iZXIsIG9yIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1Byb3BlcnR5S2V5KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgIHN3aXRjaCAodCkge1xuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBfTlVNQkVSOlxuICAgICAgICAgICAgY2FzZSBfU1lNQk9MOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgVHlwZS5pc1Byb3BlcnR5S2V5ID0gaXNQcm9wZXJ0eUtleTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX0ZVTkNUSU9OO1xuICAgIH1cbiAgICBUeXBlLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gYWxsb3dOdWxsIElmIGZhbHNlIChkZWZhdWx0KSBudWxsIGlzIG5vdCBjb25zaWRlcmVkIGFuIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSwgYWxsb3dOdWxsID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX09CSkVDVCAmJiAoYWxsb3dOdWxsIHx8IHZhbHVlICE9PSBudWxsKTtcbiAgICB9XG4gICAgVHlwZS5pc09iamVjdCA9IGlzT2JqZWN0O1xuICAgIC8qKlxuICAgICAqIEd1YXJhbnRlZXMgYSBudW1iZXIgdmFsdWUgb3IgTmFOIGluc3RlYWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBudW1iZXJPck5hTih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpID8gTmFOIDogdmFsdWU7XG4gICAgfVxuICAgIFR5cGUubnVtYmVyT3JOYU4gPSBudW1iZXJPck5hTjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgVHlwZUluZm8gb2JqZWN0IGZvciB0aGUgdGFyZ2V0LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyB7VHlwZUluZm99XG4gICAgICovXG4gICAgZnVuY3Rpb24gb2YodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBUeXBlSW5mby5nZXRGb3IodGFyZ2V0KTtcbiAgICB9XG4gICAgVHlwZS5vZiA9IG9mO1xuICAgIC8qKlxuICAgICAqIFdpbGwgZGV0ZWN0IGlmIGEgbWVtYmVyIGV4aXN0cyAodXNpbmcgJ2luJykuXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGEgcHJvcGVydHkgb3IgbWV0aG9kIGV4aXN0cyBvbiB0aGUgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUuXG4gICAgICogQHBhcmFtIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHByb3BlcnR5IE5hbWUgb2YgdGhlIG1lbWJlci5cbiAgICAgKiBAcGFyYW0gaWdub3JlVW5kZWZpbmVkIFdoZW4gaWdub3JlVW5kZWZpbmVkIGlzIHRydWUsIGlmIHRoZSBtZW1iZXIgZXhpc3RzIGJ1dCBpcyB1bmRlZmluZWQsIGl0IHdpbGwgcmV0dXJuIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc01lbWJlcihpbnN0YW5jZSwgcHJvcGVydHksIGlnbm9yZVVuZGVmaW5lZCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlICYmICFpc1ByaW1pdGl2ZShpbnN0YW5jZSkgJiYgKHByb3BlcnR5KSBpbiAoaW5zdGFuY2UpICYmIChpZ25vcmVVbmRlZmluZWQgfHwgaW5zdGFuY2VbcHJvcGVydHldICE9PSBWT0lEMCk7XG4gICAgfVxuICAgIFR5cGUuaGFzTWVtYmVyID0gaGFzTWVtYmVyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbWVtYmVyIG1hdGNoZXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIHByb3BlcnR5LCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBoYXNNZW1iZXIoaW5zdGFuY2UsIHByb3BlcnR5KSAmJiB0eXBlb2YgKGluc3RhbmNlW3Byb3BlcnR5XSkgPT09IHR5cGU7XG4gICAgfVxuICAgIFR5cGUuaGFzTWVtYmVyT2ZUeXBlID0gaGFzTWVtYmVyT2ZUeXBlO1xuICAgIGZ1bmN0aW9uIGhhc01ldGhvZChpbnN0YW5jZSwgcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIGhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgcHJvcGVydHksIF9GVU5DVElPTik7XG4gICAgfVxuICAgIFR5cGUuaGFzTWV0aG9kID0gaGFzTWV0aG9kO1xuICAgIGZ1bmN0aW9uIGlzQXJyYXlMaWtlKGluc3RhbmNlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIE5PVEU6XG4gICAgICAgICAqXG4gICAgICAgICAqIEZ1bmN0aW9uczpcbiAgICAgICAgICogRW51bWVyYXRpbmcgYSBmdW5jdGlvbiBhbHRob3VnaCBpdCBoYXMgYSAubGVuZ3RoIHByb3BlcnR5IHdpbGwgeWllbGQgbm90aGluZyBvciB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgICAqIEVmZmVjdGl2ZWx5LCBhIGZ1bmN0aW9uIGlzIG5vdCBsaWtlIGFuIGFycmF5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBTdHJpbmdzOlxuICAgICAgICAgKiBCZWhhdmUgbGlrZSBhcnJheXMgYnV0IGRvbid0IGhhdmUgdGhlIHNhbWUgZXhhY3QgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBpbnN0YW5jZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICB8fCBUeXBlLmlzU3RyaW5nKGluc3RhbmNlKVxuICAgICAgICAgICAgfHwgIVR5cGUuaXNGdW5jdGlvbihpbnN0YW5jZSkgJiYgaGFzTWVtYmVyKGluc3RhbmNlLCBMRU5HVEgpO1xuICAgIH1cbiAgICBUeXBlLmlzQXJyYXlMaWtlID0gaXNBcnJheUxpa2U7XG59KShUeXBlIHx8IChUeXBlID0ge30pKTtcbk9iamVjdC5mcmVlemUoVHlwZSk7XG5leHBvcnQgZGVmYXVsdCBUeXBlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VHlwZXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UeXBlcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi9UeXBlc1wiO1xudmFyIGlzVHJ1ZU5hTiA9IFR5cGUuaXNUcnVlTmFOO1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG4vKipcbiAqIFVzZWQgZm9yIHNwZWNpYWwgY29tcGFyaXNvbiBpbmNsdWRpbmcgTmFOLlxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKiBAcGFyYW0gc3RyaWN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbnxhbnl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcmVFcXVhbChhLCBiLCBzdHJpY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIGEgPT09IGJcbiAgICAgICAgfHwgIXN0cmljdCAmJiBhID09IGJcbiAgICAgICAgfHwgaXNUcnVlTmFOKGEpICYmIGlzVHJ1ZU5hTihiKTtcbn1cbmNvbnN0IENPTVBBUkVfVE8gPSBcImNvbXBhcmVUb1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgc3RyaWN0ID0gdHJ1ZSkge1xuICAgIGlmIChhcmVFcXVhbChhLCBiLCBzdHJpY3QpKVxuICAgICAgICByZXR1cm4gMCAvKiBFcXVhbCAqLztcbiAgICBpZiAoYSAmJiBUeXBlLmhhc01lbWJlcihhLCBDT01QQVJFX1RPKSlcbiAgICAgICAgcmV0dXJuIGEuY29tcGFyZVRvKGIpOyAvLyBJZiBhIGhhcyBjb21wYXJlVG8sIHVzZSBpdC5cbiAgICBlbHNlIGlmIChiICYmIFR5cGUuaGFzTWVtYmVyKGIsIENPTVBBUkVfVE8pKVxuICAgICAgICByZXR1cm4gLWIuY29tcGFyZVRvKGEpOyAvLyBhIGRvZXNuJ3QgaGF2ZSBjb21wYXJlVG8/IGNoZWNrIGlmIGIgZG9lcyBhbmQgaW52ZXJ0LlxuICAgIC8vIEFsbG93IGZvciBzcGVjaWFsIGluZXF1YWxpdHkuLlxuICAgIGlmIChhID4gYiB8fCBzdHJpY3QgJiYgKGEgPT09IDAgJiYgYiA9PSAwIHx8IGEgPT09IG51bGwgJiYgYiA9PT0gVk9JRDApKVxuICAgICAgICByZXR1cm4gMSAvKiBHcmVhdGVyICovO1xuICAgIGlmIChiID4gYSB8fCBzdHJpY3QgJiYgKGIgPT09IDAgJiYgYSA9PSAwIHx8IGIgPT09IG51bGwgJiYgYSA9PT0gVk9JRDApKVxuICAgICAgICByZXR1cm4gLTEgLyogTGVzcyAqLztcbiAgICByZXR1cm4gTmFOO1xufVxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHR3byBwcmltaXRpdmVzIGFyZSBlcXVhbCBvciBpZiB0d28gb2JqZWN0cyBoYXZlIHRoZSBzYW1lIGtleS92YWx1ZSBjb21iaW5hdGlvbnMuXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqIEBwYXJhbSBudWxsRXF1aXZhbGVuY3kgSWYgdHJ1ZSwgbnVsbC91bmRlZmluZWQgd2lsbCBiZSBlcXVpdmFsZW50IHRvIGFuIGVtcHR5IG9iamVjdCB7fS5cbiAqIEBwYXJhbSBleHRyYURlcHRoXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFyZUVxdWl2YWxlbnQoYSwgYiwgbnVsbEVxdWl2YWxlbmN5ID0gdHJ1ZSwgZXh0cmFEZXB0aCA9IDApIHtcbiAgICAvLyBUYWtlIGEgc3RlcCBieSBzdGVwIGFwcHJvYWNoIHRvIGVuc3VyZSBlZmZpY2llbmN5LlxuICAgIGlmIChhcmVFcXVhbChhLCBiLCB0cnVlKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHtcbiAgICAgICAgaWYgKCFudWxsRXF1aXZhbGVuY3kpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChUeXBlLmlzT2JqZWN0KGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gIU9iamVjdC5rZXlzKGEpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVHlwZS5pc09iamVjdChiKSkge1xuICAgICAgICAgICAgcmV0dXJuICFPYmplY3Qua2V5cyhiKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEgPT0gbnVsbCAmJiBiID09IG51bGw7XG4gICAgfVxuICAgIGlmIChUeXBlLmlzT2JqZWN0KGEpICYmIFR5cGUuaXNPYmplY3QoYikpIHtcbiAgICAgICAgY29uc3QgYUtleXMgPSBPYmplY3Qua2V5cyhhKSwgYktleXMgPSBPYmplY3Qua2V5cyhiKSwgbGVuID0gYUtleXMubGVuZ3RoO1xuICAgICAgICBpZiAobGVuICE9IGJLZXlzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgYUtleXMuc29ydCgpO1xuICAgICAgICBiS2V5cy5zb3J0KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBhS2V5c1tpXTtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IGJLZXlzW2ldIHx8ICFhcmVFcXVhbChhW2tleV0sIGJba2V5XSwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvZXNuJ3QgdHJhY2sgY2lyY3VsYXIgcmVmZXJlbmNlcyBidXQgYWxsb3dzIGZvciBjb250cm9sbGluZyB0aGUgYW1vdW50IG9mIHJlY3Vyc2lvbi5cbiAgICAgICAgaWYgKGV4dHJhRGVwdGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgYUtleXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFyZUVxdWl2YWxlbnQoYVtrZXldLCBiW2tleV0sIG51bGxFcXVpdmFsZW5jeSwgZXh0cmFEZXB0aCAtIDEpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbXBhcmUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db21wYXJlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0FyZ3VtZW50TnVsbEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgQXJndW1lbnROdWxsRXhjZXB0aW9uIGV4dGVuZHMgQXJndW1lbnRFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSwgbWVzc2FnZSA9IGAnJHtwYXJhbU5hbWV9JyBpcyBudWxsIChvciB1bmRlZmluZWQpLmAsIGlubmVyRXhjZXB0aW9uKSB7XG4gICAgICAgIHN1cGVyKHBhcmFtTmFtZSwgbWVzc2FnZSwgaW5uZXJFeGNlcHRpb24pO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBBcmd1bWVudE51bGxFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bcmd1bWVudE51bGxFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgdHJpbSB9IGZyb20gXCIuLi9UZXh0L1V0aWxpdHlcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdBcmd1bWVudEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgQXJndW1lbnRFeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIC8vIEZvciBzaW1wbGljaXR5IGFuZCBjb25zaXN0ZW5jeSwgbGV0cyBzdGljayB3aXRoIDEgc2lnbmF0dXJlLlxuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSwgbWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIGJlZm9yZVNlYWxpbmcpIHtcbiAgICAgICAgbGV0IHBuID0gcGFyYW1OYW1lID8gKCd7JyArIHBhcmFtTmFtZSArICd9ICcpIDogJyc7XG4gICAgICAgIHN1cGVyKHRyaW0ocG4gKyAobWVzc2FnZSB8fCAnJykpLCBpbm5lckV4Y2VwdGlvbiwgKF8pID0+IHtcbiAgICAgICAgICAgIF8ucGFyYW1OYW1lID0gcGFyYW1OYW1lO1xuICAgICAgICAgICAgaWYgKGJlZm9yZVNlYWxpbmcpXG4gICAgICAgICAgICAgICAgYmVmb3JlU2VhbGluZyhfKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50RXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJndW1lbnRFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgQXJndW1lbnRFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSwgYWN0dWFsVmFsdWUsIG1lc3NhZ2UgPSAnICcsIGlubmVyRXhjZXB0aW9uKSB7XG4gICAgICAgIHN1cGVyKHBhcmFtTmFtZSwgYCgke2FjdHVhbFZhbHVlfSkgYCArIG1lc3NhZ2UsIGlubmVyRXhjZXB0aW9uLCAoXykgPT4ge1xuICAgICAgICAgICAgXy5hY3R1YWxWYWx1ZSA9IGFjdHVhbFZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBPYmplY3RQb29sIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvT2JqZWN0UG9vbFwiO1xuaW1wb3J0IHsgSXRlcmF0b3JSZXN1bHQgfSBmcm9tIFwiLi9JdGVyYXRvclJlc3VsdFwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmxldCB5aWVsZGVyUG9vbDtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5mdW5jdGlvbiB5aWVsZGVyKHJlY3ljbGUpIHtcbiAgICBpZiAoIXlpZWxkZXJQb29sKVxuICAgICAgICB5aWVsZGVyUG9vbFxuICAgICAgICAgICAgPSBuZXcgT2JqZWN0UG9vbCg0MCwgKCkgPT4gbmV3IFlpZWxkZXIoKSwgeSA9PiB5LnlpZWxkQnJlYWsoKSk7XG4gICAgaWYgKCFyZWN5Y2xlKVxuICAgICAgICByZXR1cm4geWllbGRlclBvb2wudGFrZSgpO1xuICAgIHlpZWxkZXJQb29sLmFkZChyZWN5Y2xlKTtcbn1cbmNsYXNzIFlpZWxkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gVk9JRDA7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gTmFOO1xuICAgIH1cbiAgICBnZXQgY3VycmVudCgpIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7IH0gLy8gdGhpcyBjbGFzcyBpcyBub3QgZW50aXJlbHkgbG9jYWwvcHJpdmF0ZS4gIFN0aWxsIG5lZWRzIHByb3RlY3Rpb24uXG4gICAgZ2V0IGluZGV4KCkgeyByZXR1cm4gdGhpcy5faW5kZXg7IH1cbiAgICB5aWVsZFJldHVybih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gdmFsdWU7XG4gICAgICAgIGlmIChpc05hTih0aGlzLl9pbmRleCkpXG4gICAgICAgICAgICB0aGlzLl9pbmRleCA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX2luZGV4Kys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB5aWVsZEJyZWFrKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gVk9JRDA7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gTmFOO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMueWllbGRCcmVhaygpO1xuICAgIH1cbn1cbmNvbnN0IE5BTUUgPSBcIkVudW1lcmF0b3JCYXNlXCI7XG4vLyBcIkVudW1lcmF0b3JcIiBpcyBjb25mbGljdCBKU2NyaXB0J3MgXCJFbnVtZXJhdG9yXCJcbi8vIE5hbWluZyB0aGlzIGNsYXNzIEVudW1lcmF0b3JCYXNlIHRvIGF2b2lkIGNvbGxpc2lvbiB3aXRoIElFLlxuZXhwb3J0IGNsYXNzIEVudW1lcmF0b3JCYXNlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9pbml0aWFsaXplciwgX3RyeUdldE5leHQsIGRpc3Bvc2VyLCBpc0VuZGxlc3MpIHtcbiAgICAgICAgc3VwZXIoTkFNRSk7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVyID0gX2luaXRpYWxpemVyO1xuICAgICAgICB0aGlzLl90cnlHZXROZXh0ID0gX3RyeUdldE5leHQ7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgaWYgKFR5cGUuaXNCb29sZWFuKGlzRW5kbGVzcykpXG4gICAgICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBpc0VuZGxlc3M7XG4gICAgICAgIGVsc2UgaWYgKFR5cGUuaXNCb29sZWFuKGRpc3Bvc2VyKSlcbiAgICAgICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGRpc3Bvc2VyO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBmYWxzZTtcbiAgICAgICAgaWYgKFR5cGUuaXNGdW5jdGlvbihkaXNwb3NlcikpXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlciA9IGRpc3Bvc2VyO1xuICAgIH1cbiAgICBnZXQgY3VycmVudCgpIHtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuX3lpZWxkZXI7XG4gICAgICAgIHJldHVybiB5ICYmIHkuY3VycmVudDtcbiAgICB9XG4gICAgZ2V0IGluZGV4KCkge1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5feWllbGRlcjtcbiAgICAgICAgcmV0dXJuIHkgPyB5LmluZGV4IDogTmFOO1xuICAgIH1cbiAgICAvKlxuICAgICAqIFByb3ZpZGVzIGEgbWVjaGFuaXNtIHRvIGluZGljYXRlIGlmIHRoaXMgZW51bWVyYWJsZSBuZXZlciBlbmRzLlxuICAgICAqIElmIHNldCB0byB0cnVlLCBzb21lIG9wZXJhdGlvbnMgdGhhdCBleHBlY3QgYSBmaW5pdGUgcmVzdWx0IG1heSB0aHJvdy5cbiAgICAgKiBFeHBsaWNpdCBmYWxzZSBtZWFucyBpdCBoYXMgYW4gZW5kLlxuICAgICAqIEltcGxpY2l0IHZvaWQgbWVhbnMgdW5rbm93bi5cbiAgICAgKi9cbiAgICBnZXQgaXNFbmRsZXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNFbmRsZXNzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRlZCBmb3IgY29tcGF0aWJpbGl0eSBidXQgb25seSB3b3JrcyBpZiB0aGUgZW51bWVyYXRvciBpcyBhY3RpdmUuXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCB5ID0gXy5feWllbGRlcjtcbiAgICAgICAgXy5feWllbGRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgXy5fc3RhdGUgPSAwIC8qIEJlZm9yZSAqLztcbiAgICAgICAgaWYgKHkpXG4gICAgICAgICAgICB5aWVsZGVyKHkpOyAvLyByZWN5Y2xlIHVudGlsIGFjdHVhbGx5IG5lZWRlZC5cbiAgICB9XG4gICAgX2Fzc2VydEJhZFN0YXRlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgc3dpdGNoIChfLl9zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAzIC8qIEZhdWx0ZWQgKi86XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGlzIGVudW1lcmF0b3IgY2F1c2VkIGEgZmF1bHQgYW5kIHdhcyBkaXNwb3NlZC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDUgLyogRGlzcG9zZWQgKi86XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGlzIGVudW1lcmF0b3Igd2FzIG1hbnVhbGx5IGRpc3Bvc2VkLlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXNzZXMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gdGhlIG91dCBjYWxsYmFjayBpZiB0aGUgZW51bWVyYXRvciBpcyBhY3RpdmUuXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIHRyeUdldEN1cnJlbnQob3V0KSB7XG4gICAgICAgIHRoaXMuX2Fzc2VydEJhZFN0YXRlKCk7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gMSAvKiBBY3RpdmUgKi8pIHtcbiAgICAgICAgICAgIG91dCh0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQgY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZSA8IDIgLyogQ29tcGxldGVkICovO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYWZlbHkgbW92ZXMgdG8gdGhlIG5leHQgZW50cnkgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBvbmUuXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIG1vdmVOZXh0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fYXNzZXJ0QmFkU3RhdGUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN3aXRjaCAoXy5fc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDAgLyogQmVmb3JlICovOlxuICAgICAgICAgICAgICAgICAgICBfLl95aWVsZGVyID0gXy5feWllbGRlciB8fCB5aWVsZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF8uX3N0YXRlID0gMSAvKiBBY3RpdmUgKi87XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxpemVyID0gXy5faW5pdGlhbGl6ZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSAxIC8qIEFjdGl2ZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uX3RyeUdldE5leHQoXy5feWllbGRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLl9zdGF0ZSA9IDIgLyogQ29tcGxldGVkICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIF8uX3N0YXRlID0gMyAvKiBGYXVsdGVkICovO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBlbnRyeSBhbmQgZW1pdHMgdGhlIHZhbHVlIHRocm91Z2ggdGhlIG91dCBjYWxsYmFjay5cbiAgICAgKiBOb3RlOiBXaWxsIHRocm93IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uIGlmIHRoaXMgaGFzIGZhdWx0ZWQgb3IgbWFudWFsbHkgZGlzcG9zZWQuXG4gICAgICovXG4gICAgdHJ5TW92ZU5leHQob3V0KSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIG91dCh0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBuZXh0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVOZXh0KClcbiAgICAgICAgICAgID8gdGhpcy5jdXJyZW50XG4gICAgICAgICAgICA6IFZPSUQwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeHBvc2VkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggZ2VuZXJhdG9ycy5cbiAgICAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlTmV4dCgpXG4gICAgICAgICAgICA/IG5ldyBJdGVyYXRvclJlc3VsdCh0aGlzLmN1cnJlbnQsIHRoaXMuaW5kZXgpXG4gICAgICAgICAgICA6IEl0ZXJhdG9yUmVzdWx0LkRvbmU7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlRGlzcG9zZVN0YXRlKDQgLyogSW50ZXJydXB0ZWQgKi8pO1xuICAgIH1cbiAgICAncmV0dXJuJyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fYXNzZXJ0QmFkU3RhdGUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gVk9JRDAgfHwgXy5fc3RhdGUgPT09IDIgLyogQ29tcGxldGVkICovIHx8IF8uX3N0YXRlID09PSA0IC8qIEludGVycnVwdGVkICovXG4gICAgICAgICAgICAgICAgPyBJdGVyYXRvclJlc3VsdC5Eb25lXG4gICAgICAgICAgICAgICAgOiBuZXcgSXRlcmF0b3JSZXN1bHQodmFsdWUsIFZPSUQwLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2Vuc3VyZURpc3Bvc2VTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLndhc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBfLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIF8uX3N0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2lzRW5kbGVzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBkaXNwb3NlciA9IF8uX2Rpc3Bvc2VyO1xuICAgICAgICBfLl9pbml0aWFsaXplciA9IG51bGw7XG4gICAgICAgIF8uX2Rpc3Bvc2VyID0gbnVsbDtcbiAgICAgICAgY29uc3QgeSA9IF8uX3lpZWxkZXI7XG4gICAgICAgIF8uX3lpZWxkZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gNSAvKiBEaXNwb3NlZCAqLztcbiAgICAgICAgaWYgKHkpXG4gICAgICAgICAgICB5aWVsZGVyKHkpO1xuICAgICAgICBpZiAoZGlzcG9zZXIpXG4gICAgICAgICAgICBkaXNwb3NlcigpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEVudW1lcmF0b3JCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW51bWVyYXRvckJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yQmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IEFyZ3VtZW50RXhjZXB0aW9uIH0gZnJvbSBcIi4vRXhjZXB0aW9ucy9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbmV4cG9ydCBmdW5jdGlvbiBJbnRlZ2VyKG4pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihuKTtcbn1cbihmdW5jdGlvbiAoSW50ZWdlcikge1xuICAgIEludGVnZXIuTUFYXzMyX0JJVCA9IDIxNDc0ODM2NDc7XG4gICAgSW50ZWdlci5NQVhfVkFMVUUgPSA5MDA3MTk5MjU0NzQwOTkxO1xuICAgIGNvbnN0IE5VTUJFUiA9IFwibnVtYmVyXCIgLyogTnVtYmVyICovO1xuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGFueSBudW1iZXIgdG8gaXRzIDMyYml0IGNvdW50ZXJwYXJ0LlxuICAgICAqIFRocm93cyBpZiBjb252ZXJzaW9uIGlzIG5vdCBwb3NzaWJsZS5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gYXMzMkJpdChuKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG4gfCAwO1xuICAgICAgICBpZiAoaXNOYU4obikpXG4gICAgICAgICAgICB0aHJvdyBcIiduJyBpcyBub3QgYSBudW1iZXIuXCI7XG4gICAgICAgIGlmIChuICE9PSAtMSAmJiByZXN1bHQgPT09IC0xKVxuICAgICAgICAgICAgdGhyb3cgXCInbicgaXMgdG9vIGxhcmdlIHRvIGJlIGEgMzIgYml0IGludGVnZXIuXCI7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIEludGVnZXIuYXMzMkJpdCA9IGFzMzJCaXQ7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXMobikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG4gPT09IE5VTUJFUiAmJiBpc0Zpbml0ZShuKSAmJiBuID09PSBNYXRoLmZsb29yKG4pO1xuICAgIH1cbiAgICBJbnRlZ2VyLmlzID0gaXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyB3aXRoaW4gYSAzMiBiaXQgcmFuZ2UuXG4gICAgICogQHBhcmFtIG5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpczMyQml0KG4pIHtcbiAgICAgICAgcmV0dXJuIG4gPT09IChuIHwgMCk7XG4gICAgfVxuICAgIEludGVnZXIuaXMzMkJpdCA9IGlzMzJCaXQ7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIG5vdCBhbiBpbnRlZ2VyLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHBhcmFtIGFyZ3VtZW50TmFtZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzc2VydChuLCBhcmd1bWVudE5hbWUpIHtcbiAgICAgICAgbGV0IGkgPSBpcyhuKTtcbiAgICAgICAgaWYgKCFpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKGFyZ3VtZW50TmFtZSB8fCAnbicsIFwiTXVzdCBiZSBhIGludGVnZXIuXCIpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgSW50ZWdlci5hc3NlcnQgPSBhc3NlcnQ7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIGxlc3MgdGhhbiB6ZXJvLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHBhcmFtIGFyZ3VtZW50TmFtZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzc2VydFplcm9PckdyZWF0ZXIobiwgYXJndW1lbnROYW1lKSB7XG4gICAgICAgIGxldCBpID0gYXNzZXJ0KG4sIGFyZ3VtZW50TmFtZSkgJiYgbiA+PSAwO1xuICAgICAgICBpZiAoIWkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKGFyZ3VtZW50TmFtZSB8fCAnbicsIG4sIFwiTXVzdCBiZSBhIHZhbGlkIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHplcm8uXCIpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyID0gYXNzZXJ0WmVyb09yR3JlYXRlcjtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgaWYgbm90IGdyZWF0ZXIgdGhhbiB6ZXJvLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHBhcmFtIGFyZ3VtZW50TmFtZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzc2VydFBvc2l0aXZlKG4sIGFyZ3VtZW50TmFtZSkge1xuICAgICAgICBsZXQgaSA9IGFzc2VydChuLCBhcmd1bWVudE5hbWUpICYmIG4gPiAwO1xuICAgICAgICBpZiAoIWkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKGFyZ3VtZW50TmFtZSB8fCAnbicsIG4sIFwiTXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby5cIik7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgICBJbnRlZ2VyLmFzc2VydFBvc2l0aXZlID0gYXNzZXJ0UG9zaXRpdmU7XG59KShJbnRlZ2VyIHx8IChJbnRlZ2VyID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEludGVnZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnRlZ2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vSW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvc3lzdGVtLnN5c3RlbWV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ1N5c3RlbUV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgU3lzdGVtRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uIHtcbiAgICAvKlxuICAgICAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIG1lc3NhZ2U6c3RyaW5nID0gbnVsbCxcbiAgICAgICAgICAgIGlubmVyRXhjZXB0aW9uOkVycm9yID0gbnVsbCxcbiAgICAgICAgICAgIGJlZm9yZVNlYWxpbmc/OihleDphbnkpPT52b2lkKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdXBlcihtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbiwgYmVmb3JlU2VhbGluZyk7XG4gICAgICAgIH1cbiAgICAqL1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFN5c3RlbUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN5c3RlbUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvU3lzdGVtRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gfSBmcm9tIFwiLi9PYmplY3REaXNwb3NlZEV4Y2VwdGlvblwiO1xuZXhwb3J0IGNsYXNzIERpc3Bvc2FibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihfZGlzcG9zYWJsZU9iamVjdE5hbWUsIF9fZmluYWxpemVyKSB7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gX2Rpc3Bvc2FibGVPYmplY3ROYW1lO1xuICAgICAgICB0aGlzLl9fZmluYWxpemVyID0gX19maW5hbGl6ZXI7XG4gICAgICAgIHRoaXMuX193YXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgd2FzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fd2FzRGlzcG9zZWQ7XG4gICAgfVxuICAgIHRocm93SWZEaXNwb3NlZChtZXNzYWdlLCBvYmplY3ROYW1lID0gdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX193YXNEaXNwb3NlZClcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbihvYmplY3ROYW1lLCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIV8uX193YXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgLy8gUHJlZW1wdGl2ZWx5IHNldCB3YXNEaXNwb3NlZCBpbiBvcmRlciB0byBwcmV2ZW50IHJlcGVhdGVkIGRpc3Bvc2luZy5cbiAgICAgICAgICAgIC8vIE5PVEU6IGluIHRydWUgbXVsdGktdGhyZWFkZWQgc2NlbmFyaW9zLCB0aGlzIG5lZWRzIHRvIGJlIHN5bmNocm9uaXplZC5cbiAgICAgICAgICAgIF8uX193YXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF8uX29uRGlzcG9zZSgpOyAvLyBQcm90ZWN0ZWQgb3ZlcnJpZGUuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoXy5fX2ZpbmFsaXplcikgLy8gUHJpdmF0ZSBmaW5hbGl6ZXIuLi5cbiAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBfLl9fZmluYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF8uX19maW5hbGl6ZXIgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFBsYWNlaG9sZGVyIGZvciBvdmVycmlkZXMuXG4gICAgX29uRGlzcG9zZSgpIHsgfVxufVxuZXhwb3J0IGRlZmF1bHQgRGlzcG9zYWJsZUJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaXNwb3NhYmxlQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uLy4uL0ludGVnZXJcIjtcbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgZGVwZW5kaW5nIG9uIHRoZSByZXF1ZXN0ZWQgY2FwYWNpdHkuXG4gKiBUaGUgcmV0dXJuZWQgYXJyYXkgd2lsbCBoYXZlIGEgLmxlbmd0aCBlcXVhbCB0byB0aGUgdmFsdWUgcHJvdmlkZWQuXG4gKiBAcGFyYW0gbGVuZ3RoXG4gKiBAcmV0dXJucyB7VFtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZShsZW5ndGgpIHtcbiAgICBJbnRlZ2VyLmFzc2VydChsZW5ndGgsICdsZW5ndGgnKTtcbiAgICAvLyBUaGlzIGxvZ2ljIGlzIGJhc2VkIHVwb24gSlMgcGVyZm9ybWFuY2UgdGVzdHMgdGhhdCBzaG93IGEgc2lnbmlmaWNhbnQgZGlmZmVyZW5jZSBhdCB0aGUgbGV2ZWwgb2YgNjU1MzYuXG4gICAgbGV0IGFycmF5O1xuICAgIGlmIChsZW5ndGggPiA2NTUzNilcbiAgICAgICAgYXJyYXkgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBlbHNlIHtcbiAgICAgICAgYXJyYXkgPSBbXTtcbiAgICAgICAgYXJyYXkubGVuZ3RoID0gbGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbml0aWFsaXplLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvaW5pdGlhbGl6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyB1c2luZyB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL2Rpc3Bvc2VcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IEFycmF5RW51bWVyYXRvciB9IGZyb20gXCIuL0FycmF5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgSW5kZXhFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSW5kZXhFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24gfSBmcm9tIFwiLi9VbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb25cIjtcbmltcG9ydCB7IEluZmluaXRlRW51bWVyYXRvciB9IGZyb20gXCIuL0luZmluaXRlRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgRW1wdHlFbnVtZXJhdG9yIGFzIEVtcHR5IH0gZnJvbSBcIi4vRW1wdHlFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBJdGVyYXRvckVudW1lcmF0b3IgfSBmcm9tIFwiLi9JdGVyYXRvckVudW1lcmF0b3JcIjtcbmNvbnN0IFNUUklOR19FTVBUWSA9IFwiXCIsIEVORExFU1NfRVhDRVBUSU9OX01FU1NBR0UgPSAnQ2Fubm90IGNhbGwgZm9yRWFjaCBvbiBhbiBlbmRsZXNzIGVudW1lcmFibGUuICcgK1xuICAgICdXb3VsZCByZXN1bHQgaW4gYW4gaW5maW5pdGUgbG9vcCB0aGF0IGNvdWxkIGhhbmcgdGhlIGN1cnJlbnQgcHJvY2Vzcy4nO1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93SWZFbmRsZXNzKGlzRW5kbGVzcykge1xuICAgIGlmIChpc0VuZGxlc3MpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oRU5ETEVTU19FWENFUFRJT05fTUVTU0FHRSk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBpbml0QXJyYXlGcm9tKHNvdXJjZSwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShzb3VyY2UpKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWluKHNvdXJjZS5sZW5ndGgsIG1heCk7XG4gICAgICAgIGlmIChpc0Zpbml0ZShsZW4pKSB7XG4gICAgICAgICAgICBpZiAobGVuID4gNjU1MzUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShsZW4pO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgICAgICByZXN1bHQubGVuZ3RoID0gbGVuO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG59XG4vLyBDb3VsZCBiZSBhcnJheSwgb3IgSUVudW1lcmFibGUuLi5cbi8qKlxuICogUmV0dXJucyB0aGUgZW51bWVyYXRvciBmb3IgdGhlIHNwZWNpZmllZCBjb2xsZWN0aW9uLCBlbnVtZXJhdG9yLCBvciBpdGVyYXRvci5cbiAqIElmIHRoZSBzb3VyY2UgaXMgaWRlbnRpZmllZCBhcyBJRW51bWVyYXRvciBpdCB3aWxsIHJldHVybiB0aGUgc291cmNlIGFzIGlzLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb20oc291cmNlKSB7XG4gICAgLy8gVG8gc2ltcGxpZnkgYW5kIHByZXZlbnQgbnVsbCByZWZlcmVuY2UgZXhjZXB0aW9uczpcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIEVtcHR5O1xuICAgIGlmICgoc291cmNlKSBpbnN0YW5jZW9mIChBcnJheSkpXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhdG9yKHNvdXJjZSk7XG4gICAgaWYgKFR5cGUuaXNBcnJheUxpa2Uoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gbmV3IEluZGV4RW51bWVyYXRvcigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogc291cmNlLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBwb2ludGVyOiAwLFxuICAgICAgICAgICAgICAgIHN0ZXA6IDFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIVR5cGUuaXNQcmltaXRpdmUoc291cmNlKSkge1xuICAgICAgICBpZiAoaXNFbnVtZXJhYmxlKHNvdXJjZSkpXG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgaWYgKFR5cGUuaXNGdW5jdGlvbihzb3VyY2UpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUVudW1lcmF0b3Ioc291cmNlKTtcbiAgICAgICAgaWYgKGlzRW51bWVyYXRvcihzb3VyY2UpKVxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgaWYgKGlzSXRlcmF0b3Ioc291cmNlKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgSXRlcmF0b3JFbnVtZXJhdG9yKHNvdXJjZSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VudW1lcmFibGUoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gVHlwZS5oYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIFwiZ2V0RW51bWVyYXRvclwiLCBUeXBlLkZVTkNUSU9OKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VudW1lcmFibGVPckFycmF5TGlrZShpbnN0YW5jZSkge1xuICAgIHJldHVybiBUeXBlLmlzQXJyYXlMaWtlKGluc3RhbmNlKSB8fCBpc0VudW1lcmFibGUoaW5zdGFuY2UpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRW51bWVyYXRvcihpbnN0YW5jZSkge1xuICAgIHJldHVybiBUeXBlLmhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgXCJtb3ZlTmV4dFwiLCBUeXBlLkZVTkNUSU9OKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0l0ZXJhdG9yKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIFR5cGUuaGFzTWVtYmVyT2ZUeXBlKGluc3RhbmNlLCBcIm5leHRcIiwgVHlwZS5GVU5DVElPTik7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChlLCBhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKGUgPT09IFNUUklOR19FTVBUWSlcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKGUgJiYgbWF4ID4gMCkge1xuICAgICAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShlKSkge1xuICAgICAgICAgICAgLy8gQXNzdW1lIGUubGVuZ3RoIGlzIGNvbnN0YW50IG9yIGF0IGxlYXN0IGRvZXNuJ3QgZGV2aWF0ZSB0byBpbmZpbml0ZSBvciBOYU4uXG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiAhaXNGaW5pdGUoZS5sZW5ndGgpKTtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgTWF0aC5taW4oZS5sZW5ndGgsIG1heCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKGVbaV0sIGkrKykgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0VudW1lcmF0b3IoZSkpIHtcbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpICYmIGUuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIC8vIFJldHVybiB2YWx1ZSBvZiBhY3Rpb24gY2FuIGJlIGFueXRoaW5nLCBidXQgaWYgaXQgaXMgKD09PSkgZmFsc2UgdGhlbiB0aGUgZm9yRWFjaCB3aWxsIGRpc2NvbnRpbnVlLlxuICAgICAgICAgICAgd2hpbGUgKG1heCA+IGkgJiYgZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbihlLmN1cnJlbnQsIGkrKykgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0VudW1lcmFibGUoZSkpIHtcbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpICYmIGUuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIC8vIEZvciBlbnVtZXJhdG9ycyB0aGF0IGFyZW4ndCBFbnVtZXJhYmxlQmFzZSwgZW5zdXJlIGRpc3Bvc2UgaXMgY2FsbGVkLlxuICAgICAgICAgICAgcmV0dXJuIHVzaW5nKGUuZ2V0RW51bWVyYXRvcigpLCBmID0+IGZvckVhY2goZiwgYWN0aW9uLCBtYXgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJdGVyYXRvcihlKSkge1xuICAgICAgICAgICAgLy8gRm9yIG91ciBwdXJwb3NlIGl0ZXJhdG9ycyBhcmUgZW5kbGVzcyBhbmQgYSBtYXggbXVzdCBiZSBzcGVjaWZpZWQgYmVmb3JlIGl0ZXJhdGluZy5cbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpKTtcbiAgICAgICAgICAgIGxldCBpID0gMCwgcjtcbiAgICAgICAgICAgIC8vIFJldHVybiB2YWx1ZSBvZiBhY3Rpb24gY2FuIGJlIGFueXRoaW5nLCBidXQgaWYgaXQgaXMgKD09PSkgZmFsc2UgdGhlbiB0aGUgZm9yRWFjaCB3aWxsIGRpc2NvbnRpbnVlLlxuICAgICAgICAgICAgd2hpbGUgKG1heCA+IGkgJiYgIShyID0gZS5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKHIudmFsdWUsIGkrKykgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbi8qKlxuICogQ29udmVydHMgYW55IGVudW1lcmFibGUgdG8gYW4gYXJyYXkuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gbWF4IFN0b3BzIGFmdGVyIG1heCBpcyByZWFjaGVkLiAgQWxsb3dzIGZvciBmb3JFYWNoIHRvIGJlIGNhbGxlZCBvbiBpbmZpbml0ZSBlbnVtZXJhdGlvbnMuXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheShzb3VyY2UsIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKHNvdXJjZSA9PT0gU1RSSU5HX0VNUFRZKVxuICAgICAgICByZXR1cm4gW107XG4gICAgaWYgKCFpc0Zpbml0ZShtYXgpICYmIChzb3VyY2UpIGluc3RhbmNlb2YgKEFycmF5KSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGluaXRBcnJheUZyb20oc291cmNlLCBtYXgpO1xuICAgIGlmICgtMSA9PT0gZm9yRWFjaChzb3VyY2UsIChlLCBpKSA9PiB7IHJlc3VsdFtpXSA9IGU7IH0sIG1heCkpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbnkgZW51bWVyYWJsZSB0byBhbiBhcnJheSBvZiBzZWxlY3RlZCB2YWx1ZXMuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gc2VsZWN0b3JcbiAqIEBwYXJhbSBtYXggU3RvcHMgYWZ0ZXIgbWF4IGlzIHJlYWNoZWQuICBBbGxvd3MgZm9yIGZvckVhY2ggdG8gYmUgY2FsbGVkIG9uIGluZmluaXRlIGVudW1lcmF0aW9ucy5cbiAqIEByZXR1cm5zIHtUUmVzdWx0W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXAoc291cmNlLCBzZWxlY3RvciwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoc291cmNlID09PSBTVFJJTkdfRU1QVFkpXG4gICAgICAgIHJldHVybiBbXTtcbiAgICBpZiAoIWlzRmluaXRlKG1heCkgJiYgKHNvdXJjZSkgaW5zdGFuY2VvZiAoQXJyYXkpKVxuICAgICAgICByZXR1cm4gc291cmNlLm1hcChzZWxlY3Rvcik7XG4gICAgY29uc3QgcmVzdWx0ID0gaW5pdEFycmF5RnJvbShzb3VyY2UsIG1heCk7XG4gICAgaWYgKC0xID09PSBmb3JFYWNoKHNvdXJjZSwgKGUsIGkpID0+IHsgcmVzdWx0W2ldID0gc2VsZWN0b3IoZSwgaSk7IH0sIG1heCkpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuLyoqXG4gKiBUYWtlcyBhbnkgbnVtYmVyIG9mIGRpc3Bvc2FibGVzIGFzIGFyZ3VtZW50cyBhbmQgYXR0ZW1wdHMgdG8gZGlzcG9zZSB0aGVtLlxuICogQW55IGV4Y2VwdGlvbnMgdGhyb3duIHdpdGhpbiBhIGRpc3Bvc2UgYXJlIG5vdCB0cmFwcGVkLlxuICogVXNlICdkaXNwb3NlV2l0aG91dEV4Y2VwdGlvbicgdG8gYXV0b21hdGljYWxseSB0cmFwIGV4Y2VwdGlvbnMuXG4gKlxuICogQ2FuIGFjY2VwdCA8YW55PiBhbmQgd2lsbCBpZ25vcmUgb2JqZWN0cyB0aGF0IGRvbid0IGhhdmUgYSBkaXNwb3NlKCkgbWV0aG9kLlxuICogQHBhcmFtIGRpc3Bvc2FibGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwb3NlKC4uLmRpc3Bvc2FibGVzKSB7XG4gICAgLy8gVGhlIGRpc3Bvc2FibGVzIGFyZ3VtZW50cyBhcnJheSBpcyBlZmZlY3RpdmVseSBsb2NhbGl6ZWQgc28gaXQncyBzYWZlLlxuICAgIGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCBmYWxzZSk7XG59XG4oZnVuY3Rpb24gKGRpc3Bvc2UpIHtcbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyB3aGVuIG9ubHkgZGlzcG9zaW5nIG9uZSBvYmplY3QgdG8gYXZvaWQgY3JlYXRpb24gb2YgYXJyYXlzLlxuICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlXG4gICAgICogQHBhcmFtIHRyYXBFeGNlcHRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2luZ2xlKGRpc3Bvc2FibGUsIHRyYXBFeGNlcHRpb25zID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGRpc3Bvc2FibGUpXG4gICAgICAgICAgICBkaXNwb3NlU2luZ2xlKGRpc3Bvc2FibGUsIHRyYXBFeGNlcHRpb25zKTtcbiAgICB9XG4gICAgZGlzcG9zZS5zaW5nbGUgPSBzaW5nbGU7XG4gICAgZnVuY3Rpb24gZGVmZXJyZWQoLi4uZGlzcG9zYWJsZXMpIHtcbiAgICAgICAgdGhlc2UuZGVmZXJyZWQoZGlzcG9zYWJsZXMpO1xuICAgIH1cbiAgICBkaXNwb3NlLmRlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgLyoqXG4gICAgICogVGFrZXMgYW55IG51bWJlciBvZiBkaXNwb3NhYmxlcyBhbmQgdHJhcHMgYW55IGVycm9ycyB0aGF0IG9jY3VyIHdoZW4gZGlzcG9zaW5nLlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIGV4Y2VwdGlvbnMgdGhyb3duLlxuICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICAgICAqIEByZXR1cm5zIHthbnlbXX0gUmV0dXJucyBhbiBhcnJheSBvZiBleGNlcHRpb25zIHRoYXQgb2NjdXJyZWQsIGlmIHRoZXJlIGFyZSBhbnkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gd2l0aG91dEV4Y2VwdGlvbiguLi5kaXNwb3NhYmxlcykge1xuICAgICAgICAvLyBUaGUgZGlzcG9zYWJsZXMgYXJndW1lbnRzIGFycmF5IGlzIGVmZmVjdGl2ZWx5IGxvY2FsaXplZCBzbyBpdCdzIHNhZmUuXG4gICAgICAgIHJldHVybiBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgdHJ1ZSk7XG4gICAgfVxuICAgIGRpc3Bvc2Uud2l0aG91dEV4Y2VwdGlvbiA9IHdpdGhvdXRFeGNlcHRpb247XG4gICAgLyoqXG4gICAgICogVGFrZXMgYW4gYXJyYXkgb2YgZGlzcG9zYWJsZSBvYmplY3RzIGFuZCBlbnN1cmVzIHRoZXkgYXJlIGRpc3Bvc2VkLlxuICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICAgICAqIEBwYXJhbSB0cmFwRXhjZXB0aW9ucyBJZiB0cnVlLCBwcmV2ZW50cyBleGNlcHRpb25zIGZyb20gYmVpbmcgdGhyb3duIHdoZW4gZGlzcG9zaW5nLlxuICAgICAqIEByZXR1cm5zIHthbnlbXX0gSWYgJ3RyYXBFeGNlcHRpb25zJyBpcyB0cnVlLCByZXR1cm5zIGFuIGFycmF5IG9mIGV4Y2VwdGlvbnMgdGhhdCBvY2N1cnJlZCwgaWYgdGhlcmUgYXJlIGFueS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0aGVzZShkaXNwb3NhYmxlcywgdHJhcEV4Y2VwdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmxlbmd0aFxuICAgICAgICAgICAgPyBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcy5zbGljZSgpLCB0cmFwRXhjZXB0aW9ucylcbiAgICAgICAgICAgIDogdm9pZCAwO1xuICAgIH1cbiAgICBkaXNwb3NlLnRoZXNlID0gdGhlc2U7XG4gICAgKGZ1bmN0aW9uICh0aGVzZSkge1xuICAgICAgICBmdW5jdGlvbiBkZWZlcnJlZChkaXNwb3NhYmxlcywgZGVsYXkgPSAwKSB7XG4gICAgICAgICAgICBpZiAoZGlzcG9zYWJsZXMgJiYgZGlzcG9zYWJsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoZGVsYXkgPj0gMCkpXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5ID0gMDtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGRpc3Bvc2VUaGVzZUludGVybmFsLCBkZWxheSwgZGlzcG9zYWJsZXMuc2xpY2UoKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhlc2UuZGVmZXJyZWQgPSBkZWZlcnJlZDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZSB0aGlzIHVuc2FmZSBtZXRob2Qgd2hlbiBndWFyYW50ZWVkIG5vdCB0byBjYXVzZSBldmVudHMgdGhhdCB3aWxsIG1ha2UgbW9kaWZpY2F0aW9ucyB0byB0aGUgZGlzcG9zYWJsZXMgYXJyYXkuXG4gICAgICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICAgICAgICAgKiBAcGFyYW0gdHJhcEV4Y2VwdGlvbnNcbiAgICAgICAgICogQHJldHVybnMge2FueVtdfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbm9Db3B5KGRpc3Bvc2FibGVzLCB0cmFwRXhjZXB0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmxlbmd0aFxuICAgICAgICAgICAgICAgID8gZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMsIHRyYXBFeGNlcHRpb25zKVxuICAgICAgICAgICAgICAgIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICAgIHRoZXNlLm5vQ29weSA9IG5vQ29weTtcbiAgICB9KSh0aGVzZSA9IGRpc3Bvc2UudGhlc2UgfHwgKGRpc3Bvc2UudGhlc2UgPSB7fSkpO1xufSkoZGlzcG9zZSB8fCAoZGlzcG9zZSA9IHt9KSk7XG4vKipcbiAqIEp1c3QgbGlrZSBpbiBDIyB0aGlzICd1c2luZycgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHBhc3NlZCBkaXNwb3NhYmxlIGlzIGRpc3Bvc2VkIHdoZW4gdGhlIGNsb3N1cmUgaGFzIGZpbmlzaGVkLlxuICpcbiAqIFVzYWdlOlxuICogYGBgdHlwZXNjcmlwdFxuICogdXNpbmcobmV3IERpc3Bvc2FibGVPYmplY3QoKSwobXlPYmopPT57XG4gICAgICogICAvLyBkbyB3b3JrIHdpdGggbXlPYmpcbiAgICAgKiB9KTtcbiAqIC8vIG15T2JqIGF1dG9tYXRpY2FsbHkgaGFzIGl0J3MgZGlzcG9zZSBtZXRob2QgY2FsbGVkLlxuICogYGBgXG4gKlxuICogQHBhcmFtIGRpc3Bvc2FibGUgT2JqZWN0IHRvIGJlIGRpc3Bvc2VkLlxuICogQHBhcmFtIGNsb3N1cmUgRnVuY3Rpb24gY2FsbCB0byBleGVjdXRlLlxuICogQHJldHVybnMge1RSZXR1cm59IFJldHVybnMgd2hhdGV2ZXIgdGhlIGNsb3N1cmUncyByZXR1cm4gdmFsdWUgaXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2luZyhkaXNwb3NhYmxlLCBjbG9zdXJlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNsb3N1cmUoZGlzcG9zYWJsZSk7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBkaXNwb3NlU2luZ2xlKGRpc3Bvc2FibGUsIGZhbHNlKTtcbiAgICB9XG59XG4vKipcbiAqIFRoaXMgcHJpdmF0ZSBmdW5jdGlvbiBtYWtlcyBkaXNwb3NpbmcgbW9yZSByb2J1c3QgZm9yIHdoZW4gdGhlcmUncyBubyB0eXBlIGNoZWNraW5nLlxuICogSWYgdHJhcEV4Y2VwdGlvbnMgaXMgJ3RydWUnIGl0IGNhdGNoZXMgYW5kIHJldHVybnMgYW55IGV4Y2VwdGlvbiBpbnN0ZWFkIG9mIHRocm93aW5nLlxuICovXG5mdW5jdGlvbiBkaXNwb3NlU2luZ2xlKGRpc3Bvc2FibGUsIHRyYXBFeGNlcHRpb25zKSB7XG4gICAgaWYgKGRpc3Bvc2FibGVcbiAgICAgICAgJiYgdHlwZW9mIGRpc3Bvc2FibGUgPT0gVHlwZS5PQkpFQ1RcbiAgICAgICAgJiYgdHlwZW9mIGRpc3Bvc2FibGVbJ2Rpc3Bvc2UnXSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgaWYgKHRyYXBFeGNlcHRpb25zKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogVGhpcyBkaXNwb3NlIG1ldGhvZCBhc3N1bWVzIGl0J3Mgd29ya2luZyBvbiBhIGxvY2FsIGFycmF5Q29weSBhbmQgaXMgdW5zYWZlIGZvciBleHRlcm5hbCB1c2UuXG4gKi9cbmZ1bmN0aW9uIGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCB0cmFwRXhjZXB0aW9ucywgaW5kZXggPSAwKSB7XG4gICAgbGV0IGV4Y2VwdGlvbnM7XG4gICAgY29uc3QgbGVuID0gZGlzcG9zYWJsZXMgPyBkaXNwb3NhYmxlcy5sZW5ndGggOiAwO1xuICAgIGZvciAoOyBpbmRleCA8IGxlbjsgaW5kZXgrKykge1xuICAgICAgICBsZXQgbmV4dCA9IGRpc3Bvc2FibGVzW2luZGV4XTtcbiAgICAgICAgaWYgKCFuZXh0KVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGlmICh0cmFwRXhjZXB0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgZXggPSBkaXNwb3NlU2luZ2xlKG5leHQsIHRydWUpO1xuICAgICAgICAgICAgaWYgKGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGNlcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICBleGNlcHRpb25zID0gW107XG4gICAgICAgICAgICAgICAgZXhjZXB0aW9ucy5wdXNoKGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2VTaW5nbGUobmV4dCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRG9uJ3QgdHJhcCB0aGUgZXhjZXB0aW9uIGluIG9yZGVyIHRvIGFsbG93IGl0IHRvIHByb3BhZ2F0ZSB0aGUgc3RhY2sgdHJhY2UuXG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoIXN1Y2Nlc3MgJiYgaW5kZXggKyAxIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIElmIGNvZGUgaXMgJ2NvbnRpbnVlZCcgYnkgdGhlIGRlYnVnZ2VyLFxuICAgICAgICAgICAgICAgICAgICAgKiBuZWVkIHRvIGVuc3VyZSB0aGUgcmVzdCBvZiB0aGUgZGlzcG9zYWJsZXMgYXJlIGNhcmVkIGZvci4gKi9cbiAgICAgICAgICAgICAgICAgICAgZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMsIGZhbHNlLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEp1c3QgaW4gY2FzZS4uLiAgU2hvdWxkIG5ldmVyIGhhcHBlbiwgYnV0IGFzc2VydHMgdGhlIGludGVudGlvbi5cbiAgICAgICAgICAgIGlmICghc3VjY2VzcylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXhjZXB0aW9ucztcbn1cbmV4cG9ydCBkZWZhdWx0IGRpc3Bvc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXNwb3NlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRGlzcG9zYWJsZS9kaXNwb3NlLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4vRW51bWVyYXRvckJhc2VcIjtcbmV4cG9ydCBjbGFzcyBJbmRleEVudW1lcmF0b3IgZXh0ZW5kcyBFbnVtZXJhdG9yQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlRmFjdG9yeSkge1xuICAgICAgICBsZXQgc291cmNlO1xuICAgICAgICBzdXBlcigoKSA9PiB7XG4gICAgICAgICAgICBzb3VyY2UgPSBzb3VyY2VGYWN0b3J5KCk7XG4gICAgICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPCAwKSAvLyBOdWxsIGlzIGFsbG93ZWQgYnV0IHdpbGwgZXhpdCBpbW1lZGlhdGVseS5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibGVuZ3RoIG11c3QgYmUgemVybyBvciBncmVhdGVyXCIpO1xuICAgICAgICAgICAgICAgIGlmICghaXNGaW5pdGUobGVuKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibGVuZ3RoIG11c3QgZmluaXRlIG51bWJlclwiKTtcbiAgICAgICAgICAgICAgICBpZiAobGVuICYmIHNvdXJjZS5zdGVwID09PSAwKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIEluZGV4RW51bWVyYXRvciBzdGVwIHZhbHVlICgwKS5cIik7XG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ZXIgPSBzb3VyY2UucG9pbnRlcjtcbiAgICAgICAgICAgICAgICBpZiAoIXBvaW50ZXIpXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvaW50ZXIgIT0gTWF0aC5mbG9vcihwb2ludGVyKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBJbmRleEVudW1lcmF0b3IgcG9pbnRlciB2YWx1ZSAoXCIgKyBwb2ludGVyICsgXCIpIGhhcyBkZWNpbWFsLlwiKTtcbiAgICAgICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IHBvaW50ZXI7XG4gICAgICAgICAgICAgICAgbGV0IHN0ZXAgPSBzb3VyY2Uuc3RlcDtcbiAgICAgICAgICAgICAgICBpZiAoIXN0ZXApXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAgPSAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0ZXAgIT0gTWF0aC5mbG9vcihzdGVwKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBJbmRleEVudW1lcmF0b3Igc3RlcCB2YWx1ZSAoXCIgKyBzdGVwICsgXCIpIGhhcyBkZWNpbWFsLlwiKTtcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc3RlcCA9IHN0ZXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGVuID0gKHNvdXJjZSAmJiBzb3VyY2Uuc291cmNlKSA/IHNvdXJjZS5sZW5ndGggOiAwO1xuICAgICAgICAgICAgaWYgKCFsZW4gfHwgaXNOYU4obGVuKSlcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gc291cmNlLnBvaW50ZXI7XG4gICAgICAgICAgICBpZiAoc291cmNlLnBvaW50ZXIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IDA7IC8vIHNob3VsZCBuZXZlciBoYXBwZW4gYnV0IGlzIGluIHBsYWNlIHRvIG5lZ2F0ZSBjb21waWxlciB3YXJuaW5ncy5cbiAgICAgICAgICAgIGlmICghc291cmNlLnN0ZXApXG4gICAgICAgICAgICAgICAgc291cmNlLnN0ZXAgPSAxOyAvLyBzaG91bGQgbmV2ZXIgaGFwcGVuIGJ1dCBpcyBpbiBwbGFjZSB0byBuZWdhdGUgY29tcGlsZXIgd2FybmluZ3MuXG4gICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IHNvdXJjZS5wb2ludGVyICsgc291cmNlLnN0ZXA7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnJlbnQgPCBsZW4gJiYgY3VycmVudCA+PSAwKVxuICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihzb3VyY2Uuc291cmNlW2N1cnJlbnRdKVxuICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc291cmNlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZGV4RW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUluZGV4RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0luZGV4RW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmV4cG9ydCBjbGFzcyBJdGVyYXRvclJlc3VsdCB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIGluZGV4LCBkb25lID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09ICdib29sZWFuJylcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IGluZGV4O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IGRvbmU7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgICB9XG59XG4oZnVuY3Rpb24gKEl0ZXJhdG9yUmVzdWx0KSB7XG4gICAgSXRlcmF0b3JSZXN1bHQuRG9uZSA9IG5ldyBJdGVyYXRvclJlc3VsdChWT0lEMCwgVk9JRDAsIHRydWUpO1xuICAgIGZ1bmN0aW9uIEdldERvbmUoKSB7IHJldHVybiBJdGVyYXRvclJlc3VsdC5Eb25lOyB9XG4gICAgSXRlcmF0b3JSZXN1bHQuR2V0RG9uZSA9IEdldERvbmU7XG59KShJdGVyYXRvclJlc3VsdCB8fCAoSXRlcmF0b3JSZXN1bHQgPSB7fSkpO1xuT2JqZWN0LmZyZWV6ZShJdGVyYXRvclJlc3VsdCk7XG5leHBvcnQgZGVmYXVsdCBJdGVyYXRvclJlc3VsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUl0ZXJhdG9yUmVzdWx0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSXRlcmF0b3JSZXN1bHQuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuLyoqXG4gKiBDYW4gYmUgdXNlZCBzdGF0aWNhbGx5IG9yIGV4dGVuZGVkIGZvciB2YXJ5aW5nIGRpZmZlcmVudCByZXVzYWJsZSBmdW5jdGlvbiBzaWduYXR1cmVzLlxuICovXG5leHBvcnQgY2xhc3MgRnVuY3Rpb25zIHtcbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogQSB0eXBlZCBtZXRob2QgZm9yIHVzZSB3aXRoIHNpbXBsZSBzZWxlY3Rpb24gb2YgdGhlIHBhcmFtZXRlci5cbiAgICAgKiBAcmV0dXJucyB7VH1cbiAgICAgKi9cbiAgICBJZGVudGl0eSh4KSB7IHJldHVybiB4OyB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBUcnVlKCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZhbHNlKCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAvKipcbiAgICAgKiBEb2VzIG5vdGhpbmcuXG4gICAgICovXG4gICAgQmxhbmsoKSB7IH1cbn1cbmNvbnN0IHJvb3RGdW5jdGlvbnMgPSBuZXcgRnVuY3Rpb25zKCk7XG4vLyBFeHBvc2Ugc3RhdGljIHZlcnNpb25zLlxuKGZ1bmN0aW9uIChGdW5jdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBBIHR5cGVkIG1ldGhvZCBmb3IgdXNlIHdpdGggc2ltcGxlIHNlbGVjdGlvbiBvZiB0aGUgcGFyYW1ldGVyLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5JZGVudGl0eSA9IHJvb3RGdW5jdGlvbnMuSWRlbnRpdHk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBGdW5jdGlvbnMuVHJ1ZSA9IHJvb3RGdW5jdGlvbnMuVHJ1ZTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5GYWxzZSA9IHJvb3RGdW5jdGlvbnMuRmFsc2U7XG4gICAgLyoqXG4gICAgICogRG9lcyBub3RoaW5nLlxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5CbGFuayA9IHJvb3RGdW5jdGlvbnMuQmxhbms7XG59KShGdW5jdGlvbnMgfHwgKEZ1bmN0aW9ucyA9IHt9KSk7XG4vLyBNYWtlIHRoaXMgcmVhZCBvbmx5LiAgU2hvdWxkIHN0aWxsIGFsbG93IGZvciBzdWItY2xhc3Npbmcgc2luY2UgZXh0cmEgbWV0aG9kcyBhcmUgYWRkZWQgdG8gcHJvdG90eXBlLlxuT2JqZWN0LmZyZWV6ZShGdW5jdGlvbnMpO1xuZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb25zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RnVuY3Rpb25zLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRnVuY3Rpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tIFwiLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBhcmVFcXVhbCB9IGZyb20gXCIuLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBpc0NvbW1vbkpTLCBpc05vZGVKUywgaXNSZXF1aXJlSlMgfSBmcm9tIFwiLi4vRW52aXJvbm1lbnRcIjtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4vL25vaW5zcGVjdGlvbiBTcGVsbENoZWNraW5nSW5zcGVjdGlvblxuY29uc3QgTkFNRSA9IFwiQ29sbGVjdGlvbkJhc2VcIiwgQ01EQyA9IFwiQ2Fubm90IG1vZGlmeSBhIGRpc3Bvc2VkIGNvbGxlY3Rpb24uXCIsIENNUk8gPSBcIkNhbm5vdCBtb2RpZnkgYSByZWFkLW9ubHkgY29sbGVjdGlvbi5cIjtcbmNvbnN0IExJTlFfUEFUSCA9IFwiLi4vLi4vU3lzdGVtLkxpbnEvTGlucVwiO1xuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25CYXNlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSwgX2VxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgICAgICBzdXBlcihOQU1FKTtcbiAgICAgICAgdGhpcy5fZXF1YWxpdHlDb21wYXJlciA9IF9lcXVhbGl0eUNvbXBhcmVyO1xuICAgICAgICB0aGlzLl9pbXBvcnRFbnRyaWVzKHNvdXJjZSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlY3Vyc2lvbiA9IDA7XG4gICAgICAgIHRoaXMuX21vZGlmaWVkQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gMDtcbiAgICB9XG4gICAgZ2V0IGNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb3VudCgpO1xuICAgIH1cbiAgICBnZXRJc1JlYWRPbmx5KCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIGdldCBpc1JlYWRPbmx5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJc1JlYWRPbmx5KCk7XG4gICAgfVxuICAgIGFzc2VydE1vZGlmaWFibGUoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKENNREMpO1xuICAgICAgICBpZiAodGhpcy5nZXRJc1JlYWRPbmx5KCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihDTVJPKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGFzc2VydFZlcnNpb24odmVyc2lvbikge1xuICAgICAgICBpZiAodmVyc2lvbiAhPT0gdGhpcy5fdmVyc2lvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ29sbGVjdGlvbiB3YXMgbW9kaWZpZWQuXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgX29uTW9kaWZpZWQoKSB7IH1cbiAgICBfc2lnbmFsTW9kaWZpY2F0aW9uKGluY3JlbWVudCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKGluY3JlbWVudClcbiAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgaWYgKF8uX21vZGlmaWVkQ291bnQgJiYgIXRoaXMuX3VwZGF0ZVJlY3Vyc2lvbikge1xuICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCA9IDA7XG4gICAgICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF8uX29uTW9kaWZpZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIC8vIEF2b2lkIGZhdGFsIGVycm9ycyB3aGljaCBtYXkgaGF2ZSBiZWVuIGNhdXNlZCBieSBjb25zdW1lci5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgX2luY3JlbWVudE1vZGlmaWVkKCkgeyB0aGlzLl9tb2RpZmllZENvdW50Kys7IH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICBnZXQgaXNVcGRhdGluZygpIHsgcmV0dXJuIHRoaXMuX3VwZGF0ZVJlY3Vyc2lvbiAhPSAwOyB9XG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBjbG9zdXJlIHRoYXQgaWYgcmV0dXJuaW5nIHRydWUgd2lsbCBwcm9wYWdhdGUgYW4gdXBkYXRlIHNpZ25hbC5cbiAgICAgKiBNdWx0aXBsZSB1cGRhdGUgb3BlcmF0aW9ucyBjYW4gYmUgb2NjdXJyaW5nIGF0IG9uY2Ugb3IgcmVjdXJzaXZlbHkgYW5kIHRoZSBvbk1vZGlmaWVkIHNpZ25hbCB3aWxsIG9ubHkgb2NjdXIgb25jZSB0aGV5J3JlIGRvbmUuXG4gICAgICogQHBhcmFtIGNsb3N1cmVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBoYW5kbGVVcGRhdGUoY2xvc3VyZSkge1xuICAgICAgICBpZiAoIWNsb3N1cmUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIGxldCB1cGRhdGVkID0gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodXBkYXRlZCA9IGNsb3N1cmUoKSlcbiAgICAgICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24tLTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgfVxuICAgIC8qXG4gICAgICogTm90ZTogZm9yIGEgc2xpZ2h0IGFtb3VudCBtb3JlIGNvZGUsIHdlIGF2b2lkIGNyZWF0aW5nIGZ1bmN0aW9ucy9jbG9zdXJlcy5cbiAgICAgKiBDYWxsaW5nIGhhbmRsZVVwZGF0ZSBpcyB0aGUgY29ycmVjdCBwYXR0ZXJuLCBidXQgaWYgcG9zc2libGUgYXZvaWQgY3JlYXRpbmcgYW5vdGhlciBmdW5jdGlvbiBzY29wZS5cbiAgICAgKi9cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGVudHJ5IHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBlbnRyeVxuICAgICAqL1xuICAgIGFkZChlbnRyeSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF8uX2FkZEludGVybmFsKGVudHJ5KSlcbiAgICAgICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24tLTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZW50cmllcyBmcm9tIHRoZSBjb2xsZWN0aW9uIGFsbG93aW5nIGZvciBhIGxpbWl0LlxuICAgICAqIEZvciBleGFtcGxlIGlmIHRoZSBjb2xsZWN0aW9uIG5vdCBhIGRpc3RpbmN0IHNldCwgbW9yZSB0aGFuIG9uZSBlbnRyeSBjb3VsZCBiZSByZW1vdmVkLlxuICAgICAqIEBwYXJhbSBlbnRyeSBUaGUgZW50cnkgdG8gcmVtb3ZlLlxuICAgICAqIEBwYXJhbSBtYXggTGltaXQgb2YgZW50cmllcyB0byByZW1vdmUuICBXaWxsIHJlbW92ZSBhbGwgbWF0Y2hlcyBpZiBubyBtYXggc3BlY2lmaWVkLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZW50cmllcyByZW1vdmVkLlxuICAgICAqL1xuICAgIHJlbW92ZShlbnRyeSwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24rKztcbiAgICAgICAgbGV0IG4gPSBOYU47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobiA9IF8uX3JlbW92ZUludGVybmFsKGVudHJ5LCBtYXgpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBjb250ZW50cyBvZiB0aGUgY29sbGVjdGlvbiByZXN1bHRpbmcgaW4gYSBjb3VudCBvZiB6ZXJvLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIGxldCBuID0gTmFOO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG4gPSBfLl9jbGVhckludGVybmFsKCkpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2NsZWFySW50ZXJuYWwoKTtcbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IDA7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlY3Vyc2lvbiA9IDA7XG4gICAgICAgIHRoaXMuX21vZGlmaWVkQ291bnQgPSAwO1xuICAgICAgICBjb25zdCBsID0gdGhpcy5fbGlucTtcbiAgICAgICAgdGhpcy5fbGlucSA9IHZvaWQgMDtcbiAgICAgICAgaWYgKGwpXG4gICAgICAgICAgICBsLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgX2ltcG9ydEVudHJpZXMoZW50cmllcykge1xuICAgICAgICBsZXQgYWRkZWQgPSAwO1xuICAgICAgICBpZiAoZW50cmllcykge1xuICAgICAgICAgICAgaWYgKChlbnRyaWVzKSBpbnN0YW5jZW9mIChBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAvLyBPcHRpbWl6ZSBmb3IgYXZvaWRpbmcgYSBuZXcgY2xvc3VyZS5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlIG9mIGVudHJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FkZEludGVybmFsKGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JFYWNoKGVudHJpZXMsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWRkSW50ZXJuYWwoZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRlZCsrO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhZGRlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2FmZWx5IGltcG9ydHMgYW55IGFycmF5IGVudW1lcmF0b3IsIG9yIGVudW1lcmFibGUuXG4gICAgICogQHBhcmFtIGVudHJpZXNcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGltcG9ydEVudHJpZXMoZW50cmllcykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFlbnRyaWVzKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24rKztcbiAgICAgICAgbGV0IG4gPSBOYU47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobiA9IF8uX2ltcG9ydEVudHJpZXMoZW50cmllcykpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGZpbHRlcmVkIGJ5IHRoZSBwcm92aWRlZCBwcmVkaWNhdGUuXG4gICAgICogUHJvdmlkZWQgZm9yIHNpbWlsYXJpdHkgdG8gSlMgQXJyYXkuXG4gICAgICogQHBhcmFtIHByZWRpY2F0ZVxuICAgICAqIEByZXR1cm5zIHtbXX1cbiAgICAgKi9cbiAgICBmaWx0ZXIocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigncHJlZGljYXRlJyk7XG4gICAgICAgIGxldCBjb3VudCA9ICF0aGlzLmdldENvdW50KCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlKGUsIGkpKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSB0aGUgZmlyc3QgdGltZSBwcmVkaWNhdGUgcmV0dXJucyB0cnVlLiAgT3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqIFVzZWZ1bCBmb3Igc2VhcmNoaW5nIHRocm91Z2ggYSBjb2xsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGFueShwcmVkaWNhdGUpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICBpZiAoIWNvdW50KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHJldHVybiBCb29sZWFuKGNvdW50KTtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoZSwgaSkgPT4gIShmb3VuZCA9IHByZWRpY2F0ZShlLCBpKSkpO1xuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSB0aGUgZmlyc3QgdGltZSBwcmVkaWNhdGUgcmV0dXJucyB0cnVlLiAgT3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqIFNlZSAnLmFueShwcmVkaWNhdGUpJy4gIEFzIHRoaXMgbWV0aG9kIGlzIGp1c3QganVzdCBpbmNsdWRlZCB0byBoYXZlIHNpbWlsYXJpdHkgd2l0aCBhIEpTIEFycmF5LlxuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHNvbWUocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFueShwcmVkaWNhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVxdWFsaXR5IGNvbXBhcmVyIHJlc29sdmVzIHRydWUgb24gYW55IGVsZW1lbnQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAgICogQHBhcmFtIGVudHJ5XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnMoZW50cnkpIHtcbiAgICAgICAgY29uc3QgZXF1YWxzID0gdGhpcy5fZXF1YWxpdHlDb21wYXJlcjtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW55KGUgPT4gZXF1YWxzKGVudHJ5LCBlKSk7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uLCB1c2VDb3B5KSB7XG4gICAgICAgIGlmICh0aGlzLndhc0Rpc3Bvc2VkKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGlmICh1c2VDb3B5KSB7XG4gICAgICAgICAgICBjb25zdCBhID0gdGhpcy50b0FycmF5KCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JFYWNoKGEsIGFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBhLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZm9yRWFjaCh0aGlzLmdldEVudW1lcmF0b3IoKSwgYWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgYWxsIHZhbHVlcyB0byBudW1lcmljYWxseSBpbmRleGFibGUgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKiBAcmV0dXJucyB7VFRhcmdldH1cbiAgICAgKi9cbiAgICBjb3B5VG8odGFyZ2V0LCBpbmRleCA9IDApIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCd0YXJnZXQnKTtcbiAgICAgICAgY29uc3QgY291bnQgPSB0aGlzLmdldENvdW50KCk7XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgY29uc3QgbmV3TGVuZ3RoID0gY291bnQgKyBpbmRleDtcbiAgICAgICAgICAgIGlmICh0YXJnZXQubGVuZ3RoIDwgbmV3TGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRhcmdldC5sZW5ndGggPSBuZXdMZW5ndGg7XG4gICAgICAgICAgICBjb25zdCBlID0gdGhpcy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB3aGlsZSAoZS5tb3ZlTmV4dCgpKSAvLyBEaXNwb3NlcyB3aGVuIGZpbmlzaGVkLlxuICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaW5kZXgrK10gPSBlLmN1cnJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgY29sbGVjdGlvbiBjb250ZW50cy5cbiAgICAgKiBAcmV0dXJucyB7YW55W118QXJyYXl9XG4gICAgICovXG4gICAgdG9BcnJheSgpIHtcbiAgICAgICAgY29uc3QgY291bnQgPSB0aGlzLmdldENvdW50KCk7XG4gICAgICAgIHJldHVybiBjb3VudFxuICAgICAgICAgICAgPyB0aGlzLmNvcHlUbyhjb3VudCA+IDY1NTM2ID8gbmV3IEFycmF5KGNvdW50KSA6IFtdKVxuICAgICAgICAgICAgOiBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogLmxpbnEgd2lsbCByZXR1cm4gYW4gTGlucUVudW1lcmFibGUgaWYgLmxpbnFBc3luYygpIGhhcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5IG9yIHRoZSBkZWZhdWx0IG1vZHVsZSBsb2FkZXIgaXMgTm9kZUpTK0NvbW1vbkpTLlxuICAgICAqIEByZXR1cm5zIHtMaW5xRW51bWVyYWJsZX1cbiAgICAgKi9cbiAgICBnZXQgbGlucSgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IGUgPSB0aGlzLl9saW5xO1xuICAgICAgICBpZiAoIWUpIHtcbiAgICAgICAgICAgIGxldCByO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByID0gZXZhbCgncmVxdWlyZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7IH1cbiAgICAgICAgICAgIHRoaXMuX2xpbnEgPSBlID0gciAmJiByKExJTlFfUEFUSCkuZGVmYXVsdC5mcm9tKHRoaXMpO1xuICAgICAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgaXNSZXF1aXJlSlNcbiAgICAgICAgICAgICAgICAgICAgPyBgdXNpbmcgLmxpbnEgdG8gbG9hZCBhbmQgaW5pdGlhbGl6ZSBhIExpbnFFbnVtZXJhYmxlIGlzIGN1cnJlbnRseSBvbmx5IHN1cHBvcnRlZCB3aXRoaW4gYSBOb2RlSlMgZW52aXJvbm1lbnQuXHJcbkltcG9ydCBTeXN0ZW0uTGlucS9MaW5xIGFuZCB1c2UgRW51bWVyYWJsZS5mcm9tKGUpIGluc3RlYWQuXHJcbllvdSBjYW4gYWxzbyBwcmVsb2FkIHRoZSBMaW5xIG1vZHVsZSBhcyBhIGRlcGVuZGVuY3kgb3IgdXNlIC5saW5xQXN5bmMoY2FsbGJhY2spIGZvciBBTUQvUmVxdWlyZUpTLmBcbiAgICAgICAgICAgICAgICAgICAgOiBcIlRoZXJlIHdhcyBhIHByb2JsZW0gaW1wb3J0aW5nIFN5c3RlbS5MaW5xL0xpbnFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogLmxpbnFBc3luYygpIGlzIGZvciB1c2Ugd2l0aCBkZWZlcnJlZCBsb2FkaW5nLlxuICAgICAqIEVuc3VyZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIExpbnEgZXh0ZW5zaW9ucyBpcyBhdmFpbGFibGUgYW5kIHRoZW4gcGFzc2VzIGl0IHRvIHRoZSBjYWxsYmFjay5cbiAgICAgKiBSZXR1cm5zIGFuIExpbnFFbnVtZXJhYmxlIGlmIG9uZSBpcyBhbHJlYWR5IGF2YWlsYWJsZSwgb3RoZXJ3aXNlIHVuZGVmaW5lZC5cbiAgICAgKiBQYXNzaW5nIG5vIHBhcmFtZXRlcnMgd2lsbCBzdGlsbCBpbml0aWF0ZSBsb2FkaW5nIGFuZCBpbml0aWFsaXppbmcgdGhlIExpbnFFbnVtZXJhYmxlIHdoaWNoIGNhbiBiZSB1c2VmdWwgZm9yIHByZS1sb2FkaW5nLlxuICAgICAqIEFueSBjYWxsIHRvIC5saW5xQXN5bmMoKSB3aGVyZSBhbiBMaW5xRW51bWVyYWJsZSBpcyByZXR1cm5lZCBjYW4gYmUgYXNzdXJlZCB0aGF0IGFueSBzdWJzZXF1ZW50IGNhbGxzIHRvIC5saW5xIHdpbGwgcmV0dXJuIHRoZSBzYW1lIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHtMaW5xRW51bWVyYWJsZX1cbiAgICAgKi9cbiAgICBsaW5xQXN5bmMoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IGUgPSB0aGlzLl9saW5xO1xuICAgICAgICBpZiAoIWUpIHtcbiAgICAgICAgICAgIGlmIChpc1JlcXVpcmVKUykge1xuICAgICAgICAgICAgICAgIGV2YWwoXCJyZXF1aXJlXCIpKFtMSU5RX1BBVEhdLCAobGlucSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBDb3VsZCBlbmQgdXAgYmVpbmcgY2FsbGVkIG1vcmUgdGhhbiBvbmNlLCBiZSBzdXJlIHRvIGNoZWNrIGZvciAuX2xpbnEgYmVmb3JlIHNldHRpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgZSA9IHRoaXMuX2xpbnE7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbnEgPSBlID0gbGlucS5kZWZhdWx0LmZyb20odGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBpbXBvcnRpbmcgU3lzdGVtLkxpbnEvTGlucVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB2b2lkIDA7IC8vIEluIGNhc2UgdGhpcyBpcyByZXR1cm4gc3luY2hyb25vdXNseS4uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc05vZGVKUyAmJiBpc0NvbW1vbkpTKSB7XG4gICAgICAgICAgICAgICAgZSA9IHRoaXMubGlucTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IGZpbmQgYSBjb21wYXRpYmxlIGxvYWRlciBmb3IgaW1wb3J0aW5nIFN5c3RlbS5MaW5xL0xpbnFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZSAmJiBjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db2xsZWN0aW9uQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0NvbGxlY3Rpb25CYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tIFwiLi9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuLyoqXG4gKlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHNvdXJjZUluZGV4XG4gKiBAcGFyYW0gbGVuZ3RoXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weShzb3VyY2UsIHNvdXJjZUluZGV4ID0gMCwgbGVuZ3RoID0gSW5maW5pdHkpIHtcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZTsgLy8gbWF5IGhhdmUgcGFzc2VkIHplcm8/IHVuZGVmaW5lZD8gb3IgbnVsbD9cbiAgICByZXR1cm4gY29weVRvKHNvdXJjZSwgaW5pdGlhbGl6ZShNYXRoLm1pbihsZW5ndGgsIE1hdGgubWF4KHNvdXJjZS5sZW5ndGggLSBzb3VyY2VJbmRleCwgMCkpKSwgc291cmNlSW5kZXgsIDAsIGxlbmd0aCk7XG59XG5jb25zdCBDQk4gPSAnQ2Fubm90IGJlIG51bGwuJywgQ0JMMCA9ICdDYW5ub3QgYmUgbGVzcyB0aGFuIHplcm8uJztcbi8qKlxuICogQ29waWVzIG9uZSBhcnJheSB0byBhbm90aGVyLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIGRlc3RpbmF0aW9uXG4gKiBAcGFyYW0gc291cmNlSW5kZXhcbiAqIEBwYXJhbSBkZXN0aW5hdGlvbkluZGV4XG4gKiBAcGFyYW0gbGVuZ3RoIEFuIG9wdGlvbmFsIGxpbWl0IHRvIHN0b3AgY29weWluZy5cbiAqIEByZXR1cm5zIFRoZSBkZXN0aW5hdGlvbiBhcnJheS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUbyhzb3VyY2UsIGRlc3RpbmF0aW9uLCBzb3VyY2VJbmRleCA9IDAsIGRlc3RpbmF0aW9uSW5kZXggPSAwLCBsZW5ndGggPSBJbmZpbml0eSkge1xuICAgIGlmICghc291cmNlKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdzb3VyY2UnLCBDQk4pO1xuICAgIGlmICghZGVzdGluYXRpb24pXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2Rlc3RpbmF0aW9uJywgQ0JOKTtcbiAgICBpZiAoc291cmNlSW5kZXggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzb3VyY2VJbmRleCcsIHNvdXJjZUluZGV4LCBDQkwwKTtcbiAgICBsZXQgc291cmNlTGVuZ3RoID0gc291cmNlLmxlbmd0aDtcbiAgICBpZiAoIXNvdXJjZUxlbmd0aClcbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgIGlmIChzb3VyY2VJbmRleCA+PSBzb3VyY2VMZW5ndGgpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ3NvdXJjZUluZGV4Jywgc291cmNlSW5kZXgsICdNdXN0IGJlIGxlc3MgdGhhbiB0aGUgbGVuZ3RoIG9mIHRoZSBzb3VyY2UgYXJyYXkuJyk7XG4gICAgaWYgKGRlc3RpbmF0aW9uLmxlbmd0aCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2Rlc3RpbmF0aW9uSW5kZXgnLCBkZXN0aW5hdGlvbkluZGV4LCBDQkwwKTtcbiAgICBjb25zdCBtYXhMZW5ndGggPSBzb3VyY2UubGVuZ3RoIC0gc291cmNlSW5kZXg7XG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkgJiYgbGVuZ3RoID4gbWF4TGVuZ3RoKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzb3VyY2VJbmRleCcsIHNvdXJjZUluZGV4LCAnU291cmNlIGluZGV4ICsgbGVuZ3RoIGNhbm5vdCBleGNlZWQgdGhlIGxlbmd0aCBvZiB0aGUgc291cmNlIGFycmF5LicpO1xuICAgIGxlbmd0aCA9IE1hdGgubWluKGxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICBjb25zdCBuZXdMZW5ndGggPSBkZXN0aW5hdGlvbkluZGV4ICsgbGVuZ3RoO1xuICAgIGlmIChuZXdMZW5ndGggPiBkZXN0aW5hdGlvbi5sZW5ndGgpXG4gICAgICAgIGRlc3RpbmF0aW9uLmxlbmd0aCA9IG5ld0xlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uW2Rlc3RpbmF0aW9uSW5kZXggKyBpXSA9IHNvdXJjZVtzb3VyY2VJbmRleCArIGldO1xuICAgIH1cbiAgICByZXR1cm4gZGVzdGluYXRpb247XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3B5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvY29weS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uL1R5cGVzXCI7XG5leHBvcnQgY29uc3QgRU1QVFkgPSAnJztcbi8qKlxuICogUmV0dXJucyBhIG51bWVyaWNhbCAoaW50ZWdlcikgaGFzaCBjb2RlIG9mIHRoZSBzdHJpbmcuICBDYW4gYmUgdXNlZCBmb3IgaWRlbnRpZnlpbmcgaW5lcXVhbGl0eSBvZiBjb250ZW50cywgYnV0IHR3byBkaWZmZXJlbnQgc3RyaW5ncyBpbiByYXJlIGNhc2VzIHdpbGwgaGF2ZSB0aGUgc2FtZSBoYXNoIGNvZGUuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGFzaENvZGUoc291cmNlKSB7XG4gICAgbGV0IGhhc2ggPSAwIHwgMDtcbiAgICBpZiAoc291cmNlLmxlbmd0aCA9PSAwKVxuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHNvdXJjZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbGV0IGNoID0gc291cmNlLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoO1xuICAgICAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICAgIH1cbiAgICByZXR1cm4gaGFzaDtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXBlYXQoc291cmNlLCBjb3VudCkge1xuICAgIGxldCByZXN1bHQgPSBFTVBUWTtcbiAgICBpZiAoIWlzTmFOKGNvdW50KSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tQ2hhcnMoY2hPckNoYXJzLCBjb3VudCA9IDEpIHtcbiAgICBpZiAoKGNoT3JDaGFycykgaW5zdGFuY2VvZiAoQXJyYXkpKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBFTVBUWTtcbiAgICAgICAgZm9yIChsZXQgY2hhciBvZiBjaE9yQ2hhcnMpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVwZWF0KFN0cmluZy5mcm9tQ2hhckNvZGUoY2hPckNoYXJzKSwgY291bnQpO1xuICAgIH1cbn1cbi8qKlxuICogRXNjYXBlcyBhIFJlZ0V4cCBzZXF1ZW5jZS5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoc291cmNlKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5yZXBsYWNlKC9bLVtcXF1cXC97fSgpKis/LlxcXFxeJHxdL2csIFwiXFxcXCQmXCIpO1xufVxuLyoqXG4gKiBDYW4gdHJpbSBhbnkgY2hhcmFjdGVyIG9yIHNldCBvZiBjaGFyYWN0ZXJzIGZyb20gdGhlIGVuZHMgb2YgYSBzdHJpbmcuXG4gKiBVc2VzIGEgUmVnZXggZXNjYXBlbWVudCB0byByZXBsYWNlIHRoZW0gd2l0aCBlbXB0eS5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBjaGFycyBBIHN0cmluZyBvciBhcnJheSBvZiBjaGFyYWN0ZXJzIGRlc2lyZWQgdG8gYmUgdHJpbW1lZC5cbiAqIEBwYXJhbSBpZ25vcmVDYXNlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzb3VyY2UsIGNoYXJzLCBpZ25vcmVDYXNlKSB7XG4gICAgaWYgKGNoYXJzID09PSBFTVBUWSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICBpZiAoY2hhcnMpIHtcbiAgICAgICAgY29uc3QgZXNjYXBlZCA9IGVzY2FwZVJlZ0V4cCgoY2hhcnMpIGluc3RhbmNlb2YgKEFycmF5KSA/IGNoYXJzLmpvaW4oKSA6IGNoYXJzKTtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5yZXBsYWNlKG5ldyBSZWdFeHAoJ15bJyArIGVzY2FwZWQgKyAnXSt8WycgKyBlc2NhcGVkICsgJ10rJCcsICdnJyArIChpZ25vcmVDYXNlXG4gICAgICAgICAgICA/ICdpJ1xuICAgICAgICAgICAgOiAnJykpLCBFTVBUWSk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2UucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgRU1QVFkpO1xufVxuLyoqXG4gKiBUYWtlcyBhbnkgYXJnXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gYXJnc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChzb3VyY2UsIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gc3VwcGxhbnQoc291cmNlLCBhcmdzKTtcbn1cbi8vXG4vKipcbiAqIFRoaXMgdGFrZXMgYSBzdHJpbmcgYW5kIHJlcGxhY2VzICd7c3RyaW5nfScgd2l0aCB0aGUgcmVzcGVjdGVkIHBhcmFtZXRlci5cbiAqIEFsc28gYWxsb3dzIGZvciBwYXNzaW5nIGFuIGFycmF5IGluIG9yZGVyIHRvIHVzZSAne259JyBub3RhdGlvbi5cbiAqIE5vdCBsaW1pdGVkIHRvIGFuIGFycmF5J3MgaW5kZXhlcy4gIEZvciBleGFtcGxlLCB7bGVuZ3RofSBpcyBhbGxvd2VkLlxuICogQmFzZWQgdXBvbiBDcm9ja2ZvcmQncyBzdXBwbGFudCBmdW5jdGlvbi5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBwYXJhbXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdXBwbGFudChzb3VyY2UsIHBhcmFtcykge1xuICAgIGNvbnN0IG9Jc0FycmF5ID0gKHBhcmFtcykgaW5zdGFuY2VvZiAoQXJyYXkpO1xuICAgIHJldHVybiBzb3VyY2UucmVwbGFjZSgveyhbXnt9XSopfS9nLCAoYSwgYikgPT4ge1xuICAgICAgICBsZXQgbiA9IGI7XG4gICAgICAgIGlmIChvSXNBcnJheSkge1xuICAgICAgICAgICAgbGV0IGkgPSBwYXJzZUludChiKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4oaSkpXG4gICAgICAgICAgICAgICAgbiA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHIgPSBwYXJhbXNbbl07XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHIpIHtcbiAgICAgICAgICAgIGNhc2UgVHlwZS5TVFJJTkc6XG4gICAgICAgICAgICBjYXNlIFR5cGUuTlVNQkVSOlxuICAgICAgICAgICAgY2FzZSBUeXBlLkJPT0xFQU46XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAociAmJiBUeXBlLmhhc01lbWJlck9mVHlwZShyLCBcInRvU3RyaW5nXCIsIFR5cGUuRlVOQ1RJT04pKVxuICAgICAgICAgICAgICAgICAgICA/IHIudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICA6IGE7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNhbk1hdGNoKHNvdXJjZSwgbWF0Y2gpIHtcbiAgICBpZiAoIVR5cGUuaXNTdHJpbmcoc291cmNlKSB8fCAhbWF0Y2gpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoc291cmNlID09PSBtYXRjaClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKG1hdGNoLmxlbmd0aCA8IHNvdXJjZS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBudWxsO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBhdHRlcm4gbWF0Y2hlcyB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzb3VyY2UuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gcGF0dGVyblxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydHNXaXRoKHNvdXJjZSwgcGF0dGVybikge1xuICAgIGNvbnN0IG0gPSBjYW5NYXRjaChzb3VyY2UsIHBhdHRlcm4pO1xuICAgIHJldHVybiBUeXBlLmlzQm9vbGVhbihtKSA/IG0gOiBzb3VyY2UuaW5kZXhPZihwYXR0ZXJuKSA9PSAwO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBhdHRlcm4gbWF0Y2hlcyB0aGUgZW5kIG9mIHRoZSBzb3VyY2UuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gcGF0dGVyblxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmRzV2l0aChzb3VyY2UsIHBhdHRlcm4pIHtcbiAgICBjb25zdCBtID0gY2FuTWF0Y2goc291cmNlLCBwYXR0ZXJuKTtcbiAgICByZXR1cm4gVHlwZS5pc0Jvb2xlYW4obSkgPyBtIDogc291cmNlLmxhc3RJbmRleE9mKHBhdHRlcm4pID09IChzb3VyY2UubGVuZ3RoIC0gcGF0dGVybi5sZW5ndGgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXRpbGl0eS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1RleHQvVXRpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJbmRleEVudW1lcmF0b3IgfSBmcm9tIFwiLi9JbmRleEVudW1lcmF0b3JcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIEFycmF5RW51bWVyYXRvciBleHRlbmRzIEluZGV4RW51bWVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoYXJyYXlPckZhY3RvcnksIHN0YXJ0ID0gMCwgc3RlcCA9IDEpIHtcbiAgICAgICAgc3VwZXIoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXJyYXkgPSBUeXBlLmlzRnVuY3Rpb24oYXJyYXlPckZhY3RvcnkpID8gYXJyYXlPckZhY3RvcnkoKSA6IGFycmF5T3JGYWN0b3J5O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGFycmF5LFxuICAgICAgICAgICAgICAgIHBvaW50ZXI6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGxlbmd0aDogYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgICAgICAgICAgIHN0ZXA6IHN0ZXBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFycmF5RW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFycmF5RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0FycmF5RW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ09iamVjdERpc3Bvc2VkRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBleHRlbmRzIEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24ge1xuICAgIC8vIEZvciBzaW1wbGljaXR5IGFuZCBjb25zaXN0ZW5jeSwgbGV0cyBzdGljayB3aXRoIDEgc2lnbmF0dXJlLlxuICAgIGNvbnN0cnVjdG9yKG9iamVjdE5hbWUsIG1lc3NhZ2UsIGlubmVyRXhjZXB0aW9uKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJycsIGlubmVyRXhjZXB0aW9uLCAoXykgPT4ge1xuICAgICAgICAgICAgXy5vYmplY3ROYW1lID0gb2JqZWN0TmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBvTmFtZSA9IF8ub2JqZWN0TmFtZTtcbiAgICAgICAgb05hbWUgPSBvTmFtZSA/ICgneycgKyBvTmFtZSArICd9ICcpIDogJyc7XG4gICAgICAgIHJldHVybiAnWycgKyBfLm5hbWUgKyAnOiAnICsgb05hbWUgKyBfLm1lc3NhZ2UgKyAnXSc7XG4gICAgfVxuICAgIHN0YXRpYyB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zYWJsZSwgb2JqZWN0TmFtZSwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoZGlzcG9zYWJsZS53YXNEaXNwb3NlZClcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbihvYmplY3ROYW1lLCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYmplY3REaXNwb3NlZEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb24gT2JqZWN0UG9vbCBmcm9tIFBhcmFsbGVsIEV4dGVuc2lvbiBFeHRyYXMgYW5kIG90aGVyIE9iamVjdFBvb2wgaW1wbGVtZW50YXRpb25zLlxuICogVXNlcyAuYWRkKFQpIGFuZCAudGFrZSgpOlRcbiAqL1xuaW1wb3J0IHsgZGlzcG9zZSB9IGZyb20gXCIuL2Rpc3Bvc2VcIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4vRGlzcG9zYWJsZUJhc2VcIjtcbmltcG9ydCB7IFRhc2tIYW5kbGVyIH0gZnJvbSBcIi4uL1RocmVhZGluZy9UYXNrcy9UYXNrSGFuZGxlclwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE9CSkVDVF9QT09MID0gXCJPYmplY3RQb29sXCIsIF9NQVhfU0laRSA9IFwiX21heFNpemVcIiwgQUJTT0xVVEVfTUFYX1NJWkUgPSA2NTUzNiwgTVVTVF9CRV9HVDEgPSBcIk11c3QgYmUgYXQgdmFsaWQgbnVtYmVyIGxlYXN0IDEuXCIsIE1VU1RfQkVfTFRNID0gYE11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICR7QUJTT0xVVEVfTUFYX1NJWkV9LmA7XG5leHBvcnQgY2xhc3MgT2JqZWN0UG9vbCBleHRlbmRzIERpc3Bvc2FibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihfbWF4U2l6ZSwgX2dlbmVyYXRvciwgX3JlY3ljbGVyKSB7XG4gICAgICAgIHN1cGVyKE9CSkVDVF9QT09MKTtcbiAgICAgICAgdGhpcy5fbWF4U2l6ZSA9IF9tYXhTaXplO1xuICAgICAgICB0aGlzLl9nZW5lcmF0b3IgPSBfZ2VuZXJhdG9yO1xuICAgICAgICB0aGlzLl9yZWN5Y2xlciA9IF9yZWN5Y2xlcjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJ5IGRlZmF1bHQgd2lsbCBjbGVhciBhZnRlciA1IHNlY29uZHMgb2Ygbm9uLXVzZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYXV0b0NsZWFyVGltZW91dCA9IDUwMDA7XG4gICAgICAgIGlmIChpc05hTihfbWF4U2l6ZSkgfHwgX21heFNpemUgPCAxKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihfTUFYX1NJWkUsIF9tYXhTaXplLCBNVVNUX0JFX0dUMSk7XG4gICAgICAgIGlmIChfbWF4U2l6ZSA+IEFCU09MVVRFX01BWF9TSVpFKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihfTUFYX1NJWkUsIF9tYXhTaXplLCBNVVNUX0JFX0xUTSk7XG4gICAgICAgIHRoaXMuX2xvY2FsQWJzTWF4U2l6ZSA9IE1hdGgubWluKF9tYXhTaXplICogMiwgQUJTT0xVVEVfTUFYX1NJWkUpO1xuICAgICAgICB0aGlzLl9wb29sID0gW107XG4gICAgICAgIHRoaXMuX3RyaW1tZXIgPSBuZXcgVGFza0hhbmRsZXIoKCkgPT4gdGhpcy5fdHJpbSgpKTtcbiAgICAgICAgY29uc3QgY2xlYXIgPSAoKSA9PiB0aGlzLl9jbGVhcigpO1xuICAgICAgICB0aGlzLl9mbHVzaGVyID0gbmV3IFRhc2tIYW5kbGVyKGNsZWFyKTtcbiAgICAgICAgdGhpcy5fYXV0b0ZsdXNoZXIgPSBuZXcgVGFza0hhbmRsZXIoY2xlYXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBtYXhpbXVtIGF0IHdoaWNoIHRyaW1taW5nIHNob3VsZCBhbGxvdy5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBtYXhTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4U2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBudW1iZXIgb2Ygb2JqZWN0cyBpbiBwb29sLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvdW50KCkge1xuICAgICAgICBjb25zdCBwID0gdGhpcy5fcG9vbDtcbiAgICAgICAgcmV0dXJuIHAgPyBwLmxlbmd0aCA6IDA7XG4gICAgfVxuICAgIF90cmltKCkge1xuICAgICAgICBjb25zdCBwb29sID0gdGhpcy5fcG9vbDtcbiAgICAgICAgd2hpbGUgKHBvb2wubGVuZ3RoID4gdGhpcy5fbWF4U2l6ZSkge1xuICAgICAgICAgICAgZGlzcG9zZS5zaW5nbGUocG9vbC5wb3AoKSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV2lsbCB0cmltIGVuc3VyZSB0aGUgcG9vbCBpcyBsZXNzIHRoYW4gdGhlIG1heFNpemUuXG4gICAgICogQHBhcmFtIGRlZmVyIEEgZGVsYXkgYmVmb3JlIHRyaW1taW5nLiAgV2lsbCBiZSBvdmVycmlkZGVuIGJ5IGxhdGVyIGNhbGxzLlxuICAgICAqL1xuICAgIHRyaW0oZGVmZXIpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhpcy5fdHJpbW1lci5zdGFydChkZWZlcik7XG4gICAgfVxuICAgIF9jbGVhcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHAgPSBfLl9wb29sO1xuICAgICAgICBfLl90cmltbWVyLmNhbmNlbCgpO1xuICAgICAgICBfLl9mbHVzaGVyLmNhbmNlbCgpO1xuICAgICAgICBfLl9hdXRvRmx1c2hlci5jYW5jZWwoKTtcbiAgICAgICAgZGlzcG9zZS50aGVzZS5ub0NvcHkocCwgdHJ1ZSk7XG4gICAgICAgIHAubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2lsbCBjbGVhciBvdXQgdGhlIHBvb2wuXG4gICAgICogQ2FuY2VscyBhbnkgc2NoZWR1bGVkIHRyaW1zIHdoZW4gZXhlY3V0ZWQuXG4gICAgICogQHBhcmFtIGRlZmVyIEEgZGVsYXkgYmVmb3JlIGNsZWFyaW5nLiAgV2lsbCBiZSBvdmVycmlkZGVuIGJ5IGxhdGVyIGNhbGxzLlxuICAgICAqL1xuICAgIGNsZWFyKGRlZmVyKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRoaXMuX2ZsdXNoZXIuc3RhcnQoZGVmZXIpO1xuICAgIH1cbiAgICB0b0FycmF5QW5kQ2xlYXIoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRoaXMuX3RyaW1tZXIuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuX2ZsdXNoZXIuY2FuY2VsKCk7XG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLl9wb29sO1xuICAgICAgICB0aGlzLl9wb29sID0gW107XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCBmb3IgdG9BcnJheUFuZENsZWFyKCk7XG4gICAgICovXG4gICAgZHVtcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9BcnJheUFuZENsZWFyKCk7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2dlbmVyYXRvciA9IG51bGw7XG4gICAgICAgIF8uX3JlY3ljbGVyID0gbnVsbDtcbiAgICAgICAgZGlzcG9zZShfLl90cmltbWVyLCBfLl9mbHVzaGVyLCBfLl9hdXRvRmx1c2hlcik7XG4gICAgICAgIF8uX3RyaW1tZXIgPSBudWxsO1xuICAgICAgICBfLl9mbHVzaGVyID0gbnVsbDtcbiAgICAgICAgXy5fYXV0b0ZsdXNoZXIgPSBudWxsO1xuICAgICAgICBfLl9wb29sLmxlbmd0aCA9IDA7XG4gICAgICAgIF8uX3Bvb2wgPSBudWxsO1xuICAgIH1cbiAgICBleHRlbmRBdXRvQ2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCB0ID0gXy5hdXRvQ2xlYXJUaW1lb3V0O1xuICAgICAgICBpZiAoaXNGaW5pdGUodCkgJiYgIV8uX2F1dG9GbHVzaGVyLmlzU2NoZWR1bGVkKVxuICAgICAgICAgICAgXy5fYXV0b0ZsdXNoZXIuc3RhcnQodCk7XG4gICAgfVxuICAgIGFkZChvKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoXy5fcG9vbC5sZW5ndGggPj0gXy5fbG9jYWxBYnNNYXhTaXplKSB7XG4gICAgICAgICAgICAvLyBHZXR0aW5nIHRvbyBiaWcsIGRpc3Bvc2UgaW1tZWRpYXRlbHkuLi5cbiAgICAgICAgICAgIGRpc3Bvc2Uobyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoXy5fcmVjeWNsZXIpXG4gICAgICAgICAgICAgICAgXy5fcmVjeWNsZXIobyk7XG4gICAgICAgICAgICBfLl9wb29sLnB1c2gobyk7XG4gICAgICAgICAgICBjb25zdCBtID0gXy5fbWF4U2l6ZTtcbiAgICAgICAgICAgIGlmIChtIDwgQUJTT0xVVEVfTUFYX1NJWkUgJiYgXy5fcG9vbC5sZW5ndGggPiBtKVxuICAgICAgICAgICAgICAgIF8uX3RyaW1tZXIuc3RhcnQoNTAwKTtcbiAgICAgICAgfVxuICAgICAgICBfLmV4dGVuZEF1dG9DbGVhcigpO1xuICAgIH1cbiAgICBfb25UYWtlbigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXMsIGxlbiA9IF8uX3Bvb2wubGVuZ3RoO1xuICAgICAgICBpZiAobGVuIDw9IF8uX21heFNpemUpXG4gICAgICAgICAgICBfLl90cmltbWVyLmNhbmNlbCgpO1xuICAgICAgICBpZiAobGVuKVxuICAgICAgICAgICAgXy5leHRlbmRBdXRvQ2xlYXIoKTtcbiAgICB9XG4gICAgdHJ5VGFrZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gXy5fcG9vbC5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX29uVGFrZW4oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0YWtlKGZhY3RvcnkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghXy5fZ2VuZXJhdG9yICYmICFmYWN0b3J5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCdmYWN0b3J5JywgXCJNdXN0IHByb3ZpZGUgYSBmYWN0b3J5IGlmIG9uIHdhcyBub3QgcHJvdmlkZWQgYXQgY29uc3RydWN0aW9uIHRpbWUuXCIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIF8uX3Bvb2wucG9wKCkgfHwgZmFjdG9yeSAmJiBmYWN0b3J5KCkgfHwgXy5fZ2VuZXJhdG9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl9vblRha2VuKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBPYmplY3RQb29sO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0UG9vbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvT2JqZWN0UG9vbC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBTeXN0ZW1FeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9TeXN0ZW1FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbiBleHRlbmRzIFN5c3RlbUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlIHx8IFwiVW5zdXBwb3J0ZWQgZW51bWVyYWJsZS5cIik7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL1Vuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB9IGZyb20gXCIuL1NpbXBsZUVudW1lcmFibGVCYXNlXCI7XG4vKipcbiAqIEEgc2ltcGxpZmllZCBzdHJpcHBlZCBkb3duIGVudW1lcmF0b3IgdGhhdCB1bnRpbCBkaXNwb3NlZCB3aWxsIGluZmluaXRlbHkgcmV0dXJuIHRoZSBwcm92aWRlZCBmYWN0b3J5LlxuICogVGhpcyBpcyBhbmFsb2dvdXMgdG8gYSAnZ2VuZXJhdG9yJyBhbmQgaGFzIGEgY29tcGF0aWJsZSBpbnRlcmZhY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZUVudW1lcmF0b3IgZXh0ZW5kcyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB7XG4gICAgLyoqXG4gICAgICogU2VlIEluZmluaXRlVmFsdWVGYWN0b3J5XG4gICAgICogQHBhcmFtIF9mYWN0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoX2ZhY3RvcnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZmFjdG9yeSA9IF9mYWN0b3J5O1xuICAgIH1cbiAgICBfY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mYWN0b3J5ICE9IG51bGw7XG4gICAgfVxuICAgIG1vdmVOZXh0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZiA9IF8uX2ZhY3Rvcnk7XG4gICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICBfLl9jdXJyZW50ID0gZihfLl9jdXJyZW50LCBfLmluY3JlbWVudEluZGV4KCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2ZhY3RvcnkgPSBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZmluaXRlRW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUluZmluaXRlRW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0luZmluaXRlRW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJdGVyYXRvclJlc3VsdCB9IGZyb20gXCIuL0l0ZXJhdG9yUmVzdWx0XCI7XG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmV4cG9ydCBjbGFzcyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgZ2V0IGN1cnJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICAgIH1cbiAgICBnZXQgY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW5Nb3ZlTmV4dCgpO1xuICAgIH1cbiAgICB0cnlNb3ZlTmV4dChvdXQpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgb3V0KHRoaXMuX2N1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpbmNyZW1lbnRJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuICsrdGhpcy5faW5kZXg7XG4gICAgfVxuICAgIG5leHRWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5tb3ZlTmV4dCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9XG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZU5leHQoKVxuICAgICAgICAgICAgPyBuZXcgSXRlcmF0b3JSZXN1bHQodGhpcy5fY3VycmVudCwgdGhpcy5faW5kZXgpXG4gICAgICAgICAgICA6IEl0ZXJhdG9yUmVzdWx0LkRvbmU7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgfVxuICAgICdyZXR1cm4nKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IFZPSUQwICYmIHRoaXMuX2Nhbk1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICA/IG5ldyBJdGVyYXRvclJlc3VsdCh2YWx1ZSwgVk9JRDAsIHRydWUpXG4gICAgICAgICAgICAgICAgOiBJdGVyYXRvclJlc3VsdC5Eb25lO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBWT0lEMDtcbiAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBnZXRJc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW5Nb3ZlTmV4dCgpO1xuICAgIH1cbiAgICBnZXQgaXNFbmRsZXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJc0VuZGxlc3MoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBTaW1wbGVFbnVtZXJhYmxlQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNpbXBsZUVudW1lcmFibGVCYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vU2ltcGxlRW51bWVyYWJsZUJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgSXRlcmF0b3JSZXN1bHQgfSBmcm9tIFwiLi9JdGVyYXRvclJlc3VsdFwiO1xuaW1wb3J0IHsgRnVuY3Rpb25zIH0gZnJvbSBcIi4uLy4uL0Z1bmN0aW9uc1wiO1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG4vKipcbiAqIEEgc2ltcGxpZmllZCBzdHJpcHBlZCBkb3duIGVudW1lcmFibGUgdGhhdCBpcyBhbHdheXMgY29tcGxldGUgYW5kIGhhcyBubyByZXN1bHRzLlxuICogRnJvemVuIGFuZCBleHBvcnRlZCBhcyAnZW1wdHknIHRvIGFsbG93IGZvciByZXVzZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEVtcHR5RW51bWVyYXRvciA9IE9iamVjdC5mcmVlemUoe1xuICAgIGN1cnJlbnQ6IFZPSUQwLFxuICAgIG1vdmVOZXh0OiBGdW5jdGlvbnMuRmFsc2UsXG4gICAgdHJ5TW92ZU5leHQ6IEZ1bmN0aW9ucy5GYWxzZSxcbiAgICBuZXh0VmFsdWU6IEZ1bmN0aW9ucy5CbGFuayxcbiAgICBuZXh0OiBJdGVyYXRvclJlc3VsdC5HZXREb25lLFxuICAgIFwicmV0dXJuXCI6IEl0ZXJhdG9yUmVzdWx0LkdldERvbmUsXG4gICAgZW5kOiBGdW5jdGlvbnMuQmxhbmssXG4gICAgcmVzZXQ6IEZ1bmN0aW9ucy5CbGFuayxcbiAgICBkaXNwb3NlOiBGdW5jdGlvbnMuQmxhbmssXG4gICAgaXNFbmRsZXNzOiBmYWxzZVxufSk7XG5leHBvcnQgZGVmYXVsdCBFbXB0eUVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FbXB0eUVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbXB0eUVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgU2ltcGxlRW51bWVyYWJsZUJhc2UgfSBmcm9tIFwiLi9TaW1wbGVFbnVtZXJhYmxlQmFzZVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4vKipcbiAqIEEgc2ltcGxpZmllZCBzdHJpcHBlZCBkb3duIGVudW1lcmF0b3IgdGhhdCB1bnRpbCBkaXNwb3NlZCB3aWxsIGluZmluaXRlbHkgcmV0dXJuIHRoZSBwcm92aWRlZCBmYWN0b3J5LlxuICogVGhpcyBpcyBhbmFsb2dvdXMgdG8gYSAnZ2VuZXJhdG9yJyBhbmQgaGFzIGEgY29tcGF0aWJsZSBpbnRlcmZhY2UuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEl0ZXJhdG9yRW51bWVyYXRvciBleHRlbmRzIFNpbXBsZUVudW1lcmFibGVCYXNlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gX2l0ZXJhdG9yXG4gICAgICogQHBhcmFtIF9pc0VuZGxlc3MgdHJ1ZSBhbmQgZmFsc2UgYXJlIGV4cGxpY2l0IHdoZXJlIGFzIHVuZGVmaW5lZCBtZWFucyAndW5rbm93bicuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoX2l0ZXJhdG9yLCBfaXNFbmRsZXNzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2l0ZXJhdG9yID0gX2l0ZXJhdG9yO1xuICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBfaXNFbmRsZXNzO1xuICAgIH1cbiAgICBfY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVyYXRvciAhPSBudWxsO1xuICAgIH1cbiAgICBtb3ZlTmV4dCh2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgaSA9IF8uX2l0ZXJhdG9yO1xuICAgICAgICBpZiAoaSkge1xuICAgICAgICAgICAgY29uc3QgciA9IGFyZ3VtZW50cy5sZW5ndGggPyBpLm5leHQodmFsdWUpIDogaS5uZXh0KCk7XG4gICAgICAgICAgICBfLl9jdXJyZW50ID0gci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChyLmRvbmUpXG4gICAgICAgICAgICAgICAgXy5kaXNwb3NlKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2l0ZXJhdG9yID0gbnVsbDtcbiAgICB9XG4gICAgZ2V0SXNFbmRsZXNzKCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLl9pc0VuZGxlc3MpICYmIHN1cGVyLmdldElzRW5kbGVzcygpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEl0ZXJhdG9yRW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUl0ZXJhdG9yRW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0l0ZXJhdG9yRW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyDjgqTjg7Pjgr/jg7zjg5XjgqfjgqTjgrnntbHlkIjjgavjgojjgovjgrPjgqLjgq/jg6njgrnjga7mi6HlvLVcbmRlY2xhcmUgaW50ZXJmYWNlIFN0cmluZyB7XG4gIG5vcm1hbGl6ZU5ld0xpbmUoKTogc3RyaW5nO1xufVxuXG5TdHJpbmcucHJvdG90eXBlLm5vcm1hbGl6ZU5ld0xpbmUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnJlcGxhY2UoL1xccj9cXG4vZywgJ1xcclxcbicpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TdHJpbmdFeHRlbnNpb24udHMiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIE9yaWdpbmFsOiBodHRwOi8vbGlucWpzLmNvZGVwbGV4LmNvbS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBhcmVFcXVhbCBhcyBhcmVFcXVhbFZhbHVlcywgY29tcGFyZSBhcyBjb21wYXJlVmFsdWVzIH0gZnJvbSBcIi4uL1N5c3RlbS9Db21wYXJlXCI7XG5pbXBvcnQgeyBjb3B5IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9jb3B5XCI7XG5pbXBvcnQgKiBhcyBBcnJheXMgZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9Db21wYXJlXCI7XG5pbXBvcnQgKiBhcyBlbnVtVXRpbCBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3JcIjtcbmltcG9ydCB7IGlzRW51bWVyYWJsZSwgaXNFbnVtZXJhdG9yLCBpc0l0ZXJhdG9yLCB0aHJvd0lmRW5kbGVzcyB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgRW1wdHlFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbXB0eUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vU3lzdGVtL1R5cGVzXCI7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uL1N5c3RlbS9JbnRlZ2VyXCI7XG5pbXBvcnQgeyBGdW5jdGlvbnMgYXMgQmFzZUZ1bmN0aW9ucyB9IGZyb20gXCIuLi9TeXN0ZW0vRnVuY3Rpb25zXCI7XG5pbXBvcnQgeyBBcnJheUVudW1lcmF0b3IgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0FycmF5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9EaWN0aW9uYXJpZXMvRGljdGlvbmFyeVwiO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL1F1ZXVlXCI7XG5pbXBvcnQgeyBkaXNwb3NlLCB1c2luZyB9IGZyb20gXCIuLi9TeXN0ZW0vRGlzcG9zYWJsZS9kaXNwb3NlXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi9TeXN0ZW0vRGlzcG9zYWJsZS9EaXNwb3NhYmxlQmFzZVwiO1xuaW1wb3J0IHsgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9VbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb25cIjtcbmltcG9ydCB7IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9EaXNwb3NhYmxlL09iamVjdERpc3Bvc2VkRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBLZXlTb3J0ZWRDb250ZXh0IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9Tb3J0aW5nL0tleVNvcnRlZENvbnRleHRcIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9TeXN0ZW0vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9TeXN0ZW0vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbmltcG9ydCB7IEluZGV4RW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSW5kZXhFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBJdGVyYXRvckVudW1lcmF0b3IgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0l0ZXJhdG9yRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZSB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvaW5pdGlhbGl6ZVwiO1xuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSBcIi4uL1N5c3RlbS9SYW5kb21cIjtcbmltcG9ydCB7IEluZmluaXRlRW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSW5maW5pdGVFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBMYXp5TGlzdCB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvTGF6eUxpc3RcIjtcbnZhciBkaXNwb3NlU2luZ2xlID0gZGlzcG9zZS5zaW5nbGU7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbi8vICNyZWdpb24gTG9jYWwgQ29uc3RhbnRzLlxuY29uc3QgSU5WQUxJRF9ERUZBVUxUID0ge307IC8vIGNyZWF0ZSBhIHByaXZhdGUgdW5pcXVlIGluc3RhbmNlIGZvciByZWZlcmVuY2luZy5cbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuY29uc3QgTlVMTCA9IG51bGw7XG5mdW5jdGlvbiBCUkVBSygpIHtcbiAgICByZXR1cm4gMCAvKiBCcmVhayAqLztcbn1cbmZ1bmN0aW9uIFJFVFVSTigpIHtcbiAgICByZXR1cm4gMSAvKiBSZXR1cm4gKi87XG59XG5mdW5jdGlvbiBpc05vdE51bGxPclVuZGVmaW5lZChlKSB7XG4gICAgcmV0dXJuIGUgIT0gbnVsbDtcbn1cbi8vIExlYXZlIGludGVybmFsIHRvIGF2b2lkIGFjY2lkZW50YWwgb3ZlcndyaXRpbmcuXG5jbGFzcyBMaW5xRnVuY3Rpb25zIGV4dGVuZHMgQmFzZUZ1bmN0aW9ucyB7XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICBHcmVhdGVyKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPiBiID8gYSA6IGI7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgTGVzc2VyKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPCBiID8gYSA6IGI7XG4gICAgfVxufVxuY29uc3QgRnVuY3Rpb25zID0gT2JqZWN0LmZyZWV6ZShuZXcgTGlucUZ1bmN0aW9ucygpKTtcbi8vIEZvciByZS11c2UgYXMgYSBmYWN0b3J5LlxuZnVuY3Rpb24gZ2V0RW1wdHlFbnVtZXJhdG9yKCkge1xuICAgIHJldHVybiBFbXB0eUVudW1lcmF0b3I7XG59XG4vLyAjZW5kcmVnaW9uXG4vKlxuICogTk9URTogQWJvdXQgSW5maW5pdGVFbnVtZXJhYmxlPFQ+IGFuZCBFbnVtZXJhYmxlPFQ+LlxuICogVGhlcmUgbWF5IHNlZW0gbGlrZSB0aGVyZSdzIGV4dHJhIG92ZXJyaWRlcyBoZXJlIGFuZCB0aGV5IG1heSBzZWVtIHVubmVjZXNzYXJ5LlxuICogQnV0IGFmdGVyIGNsb3NlciBpbnNwZWN0aW9uIHlvdSdsbCBzZWUgdGhlIHR5cGUgY2hhaW4gaXMgcmV0YWluZWQgYW5kXG4gKiBpbmZpbml0ZSBlbnVtZXJhYmxlcyBhcmUgcHJldmVudGVkIGZyb20gaGF2aW5nIGZlYXR1cmVzIHRoYXQgZmluaXRlIG9uZXMgaGF2ZS5cbiAqXG4gKiBJJ20gbm90IHN1cmUgaWYgaXQncyB0aGUgYmVzdCBvcHRpb24gdG8ganVzdCB1c2Ugb3ZlcnJpZGVzLCBidXQgaXQgaG9ub3JzIHRoZSB0eXBpbmcgcHJvcGVybHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9lbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyKSB7XG4gICAgICAgIHN1cGVyKFwiSW5maW5pdGVMaW5xRW51bWVyYWJsZVwiLCBmaW5hbGl6ZXIpO1xuICAgICAgICB0aGlzLl9lbnVtZXJhdG9yRmFjdG9yeSA9IF9lbnVtZXJhdG9yRmFjdG9yeTtcbiAgICAgICAgdGhpcy5faXNFbmRsZXNzID0gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0IGlzRW5kbGVzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRW5kbGVzcztcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBJRW51bWVyYWJsZTxUPiBJbXBsZW1lbnRhdGlvbi4uLlxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtZXJhdG9yRmFjdG9yeSgpO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgLy8gI3JlZ2lvbiBJRGlzcG9zYWJsZSBvdmVycmlkZS4uLlxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTsgLy8gSnVzdCBpbiBjYXNlLlxuICAgICAgICB0aGlzLl9lbnVtZXJhdG9yRmFjdG9yeSA9IG51bGw7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICAvLyBSZXR1cm4gYSBkZWZhdWx0ICh1bmZpbHRlcmVkKSBlbnVtZXJhYmxlLlxuICAgIGFzRW51bWVyYWJsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiBfLmdldEVudW1lcmF0b3IoKSk7XG4gICAgfVxuICAgIGRvQWN0aW9uKGFjdGlvbiwgaW5pdGlhbGl6ZXIsIGlzRW5kbGVzcyA9IHRoaXMuaXNFbmRsZXNzLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0UgPSBpc0VuZGxlc3MgfHwgdW5kZWZpbmVkOyAvLyBJbiBjYXNlIGl0J3MgbnVsbC5cbiAgICAgICAgaWYgKCFhY3Rpb24pXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiYWN0aW9uXCIpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbGl6ZXIpXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICAvLyBNYXkgbmVlZCBhIHdheSB0byBwcm9wYWdhdGUgaXNFbmRsZXNzXG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uUmVzdWx0ID0gYWN0aW9uKGMsIGluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uUmVzdWx0ID09PSBmYWxzZSB8fCBhY3Rpb25SZXN1bHQgPT09IDAgLyogQnJlYWsgKi8pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25SZXN1bHQgIT09IDIgLyogU2tpcCAqLykgLy8gfHwgIT09IDJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGMpO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiBhY3Rpb25SZXN1bHQ9PT0yLCB0aGVuIGEgc2lnbmFsIGZvciBza2lwIGlzIHJlY2VpdmVkLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob25Db21wbGV0ZSlcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZShpbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH0sIGlzRSk7XG4gICAgICAgIH0sIFxuICAgICAgICAvLyBVc2luZyBhIGZpbmFsaXplciB2YWx1ZSByZWR1Y2VzIHRoZSBjaGFuY2Ugb2YgYSBjaXJjdWxhciByZWZlcmVuY2VcbiAgICAgICAgLy8gc2luY2Ugd2UgY291bGQgc2ltcGx5IHJlZmVyZW5jZSB0aGUgZW51bWVyYXRpb24gYW5kIGNoZWNrIGUud2FzRGlzcG9zZWQuXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGFjdGlvbiA9IE5VTEw7XG4gICAgICAgIH0sIGlzRSk7XG4gICAgfVxuICAgIGZvcmNlKCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aGlzLmRvQWN0aW9uKEJSRUFLKVxuICAgICAgICAgICAgLmdldEVudW1lcmF0b3IoKVxuICAgICAgICAgICAgLm1vdmVOZXh0KCk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gSW5kZXhpbmcvUGFnaW5nIG1ldGhvZHMuXG4gICAgc2tpcChjb3VudCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShjb3VudCkpIC8vICtJbmZpbml0eSBlcXVhbHMgc2tpcCBhbGwgc28gcmV0dXJuIGVtcHR5LlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKGdldEVtcHR5RW51bWVyYXRvcik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICByZXR1cm4gdGhpcy53aGVyZSgoZWxlbWVudCwgaW5kZXgpID0+IGluZGV4ID49IGNvdW50KTtcbiAgICB9XG4gICAgdGFrZShjb3VudCkge1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKSAvLyBPdXQgb2YgYm91bmRzPyBFbXB0eS5cbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2NvdW50JywgY291bnQsICdNdXN0IGJlIGZpbml0ZS4nKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIik7XG4gICAgICAgIC8vIE9uY2UgYWN0aW9uIHJldHVybnMgZmFsc2UsIHRoZSBlbnVtZXJhdGlvbiB3aWxsIHN0b3AuXG4gICAgICAgIHJldHVybiBfLmRvQWN0aW9uKChlbGVtZW50LCBpbmRleCkgPT4gaW5kZXggPCBjb3VudCwgbnVsbCwgZmFsc2UpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIFNpbmdsZSBWYWx1ZSBSZXR1cm4uLi5cbiAgICBlbGVtZW50QXQoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuZWxlbWVudEF0T3JEZWZhdWx0KGluZGV4LCBJTlZBTElEX0RFRkFVTFQpO1xuICAgICAgICBpZiAodiA9PT0gSU5WQUxJRF9ERUZBVUxUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignaW5kZXgnLCBpbmRleCwgXCJpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiBzb3VyY2VcIik7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICBlbGVtZW50QXRPckRlZmF1bHQoaW5kZXgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4LCAnaW5kZXgnKTtcbiAgICAgICAgY29uc3QgbiA9IGluZGV4O1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpID09IG4pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qIE5vdGU6IFVubGlrZSBwcmV2aW91cyBpbXBsZW1lbnRhdGlvbnMsIHlvdSBjb3VsZCBwYXNzIGEgcHJlZGljYXRlIGludG8gdGhlc2UgbWV0aG9kcy5cbiAgICAgKiBCdXQgc2luY2UgdW5kZXIgdGhlIGhvb2QgaXQgZW5kcyB1cCBjYWxsaW5nIC53aGVyZShwcmVkaWNhdGUpIGFueXdheSxcbiAgICAgKiBpdCBtYXkgYmUgYmV0dGVyIHRvIHJlbW92ZSB0aGlzIHRvIGFsbG93IGZvciBhIGNsZWFuZXIgc2lnbmF0dXJlL292ZXJyaWRlLlxuICAgICAqIEphdmFTY3JpcHQvVHlwZVNjcmlwdCBkb2VzIG5vdCBlYXNpbHkgYWxsb3cgZm9yIGEgc3RyaWN0IG1ldGhvZCBpbnRlcmZhY2UgbGlrZSBDIy5cbiAgICAgKiBIYXZpbmcgdG8gd3JpdGUgZXh0cmEgb3ZlcnJpZGUgbG9naWMgaXMgZXJyb3IgcHJvbmUgYW5kIGNvbmZ1c2luZyB0byB0aGUgY29uc3VtZXIuXG4gICAgICogUmVtb3ZpbmcgdGhlIHByZWRpY2F0ZSBoZXJlIG1heSBhbHNvIGNhdXNlIHRoZSBjb25zdW1lciBvZiB0aGlzIG1ldGhvZCB0byB0aGluayBtb3JlIGFib3V0IGhvdyB0aGV5IHN0cnVjdHVyZSB0aGVpciBxdWVyeS5cbiAgICAgKiBUaGUgZW5kIGFsbCBkaWZmZXJlbmNlIGlzIHRoYXQgdGhlIHVzZXIgbXVzdCBkZWNsYXJlIC53aGVyZShwcmVkaWNhdGUpIGJlZm9yZSAuZmlyc3QoKSwgLnNpbmdsZSgpLCBvciAubGFzdCgpLlxuICAgICAqIE90aGVyd2lzZSB0aGVyZSB3b3VsZCBuZWVkIHRvIGJlIG11Y2ggbW9yZSBjb2RlIHRvIGhhbmRsZSB0aGVzZSBjYXNlcyAoLmZpcnN0KHByZWRpY2F0ZSksIGV0Yyk7XG4gICAgICogKi9cbiAgICBmaXJzdCgpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuZmlyc3RPckRlZmF1bHQoSU5WQUxJRF9ERUZBVUxUKTtcbiAgICAgICAgaWYgKHYgPT09IElOVkFMSURfREVGQVVMVClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImZpcnN0OlRoZSBzZXF1ZW5jZSBpcyBlbXB0eS5cIik7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICBmaXJzdE9yRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiBlLm1vdmVOZXh0KCkgPyBlLmN1cnJlbnQgOiBkZWZhdWx0VmFsdWUpO1xuICAgIH1cbiAgICBzaW5nbGUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoIWUubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNpbmdsZTpzZXF1ZW5jZSBjb250YWlucyBtb3JlIHRoYW4gb25lIGVsZW1lbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2luZ2xlOlRoZSBzZXF1ZW5jZSBpcyBlbXB0eS5cIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaW5nbGVPckRlZmF1bHQoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoIWUubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFueSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiBlLm1vdmVOZXh0KCkpO1xuICAgIH1cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuYW55KCk7XG4gICAgfVxuICAgIHRyYXZlcnNlRGVwdGhGaXJzdChjaGlsZHJlblNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzczsgLy8gSXMgZW5kbGVzcyBpcyBub3QgYWZmaXJtYXRpdmUgaWYgZmFsc2UuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gRGV2IE5vdGU6IE1heSB3YW50IHRvIGNvbnNpZGVyIHVzaW5nIGFuIGFjdHVhbCBzdGFjayBhbmQgbm90IGFuIGFycmF5LlxuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3JTdGFjaztcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGxlbjsgLy8gQXZvaWQgdXNpbmcgcHVzaC9wb3Agc2luY2UgdGhleSBxdWVyeSAubGVuZ3RoIGV2ZXJ5IHRpbWUgYW5kIGNhbiBiZSBzbG93ZXIuXG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yU3RhY2sgPSBbXTtcbiAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHJlc3VsdFNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFja1tsZW4rK10gPSBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSBjaGlsZHJlblNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZSA9ICFUeXBlLmlzU3RyaW5nKGMpICYmIEVudW1lcmFibGUuZnJvbUFueShjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBlID8gZS5nZXRFbnVtZXJhdG9yKCkgOiBFbXB0eUVudW1lcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IGVudW1lcmF0b3JTdGFja1stLWxlbl07XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFjay5sZW5ndGggPSBsZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvclN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwb3NlLnRoZXNlLm5vQ29weShlbnVtZXJhdG9yU3RhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvclN0YWNrLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yU3RhY2sgPSBOVUxMO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBmbGF0dGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RNYW55KGVudHJ5ID0+IHtcbiAgICAgICAgICAgIGxldCBlID0gIVR5cGUuaXNTdHJpbmcoZW50cnkpICYmIEVudW1lcmFibGUuZnJvbUFueShlbnRyeSk7XG4gICAgICAgICAgICByZXR1cm4gZSA/IGUuZmxhdHRlbigpIDogW2VudHJ5XTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBhaXJ3aXNlKHNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlbGVjdG9yXCIpO1xuICAgICAgICBsZXQgcHJldmlvdXM7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGkgPyBzZWxlY3RvcihwcmV2aW91cywgdmFsdWUsIGkpIDogTlVMTDtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KS5za2lwKDEpO1xuICAgIH1cbiAgICBzY2FuKGZ1bmMsIHNlZWQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghZnVuYylcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJmdW5jXCIpO1xuICAgICAgICByZXR1cm4gKHNlZWQgPT09IFZPSUQwXG4gICAgICAgICAgICA/IHRoaXMuc2VsZWN0KCh2YWx1ZSwgaSkgPT4gc2VlZCA9IGkgPyBmdW5jKHNlZWQsIHZhbHVlLCBpKSA6IHZhbHVlKVxuICAgICAgICAgICAgOiB0aGlzLnNlbGVjdCgodmFsdWUsIGkpID0+IHNlZWQgPSBmdW5jKHNlZWQsIHZhbHVlLCBpKSkpO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgc2VsZWN0KHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChzZWxlY3Rvcik7XG4gICAgfVxuICAgIG1hcChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoc2VsZWN0b3IpO1xuICAgIH1cbiAgICAvKlxuICAgIHB1YmxpYyBzdGF0aWMgSUVudW1lcmFibGU8VFJlc3VsdD4gU2VsZWN0TWFueTxUU291cmNlLCBUQ29sbGVjdGlvbiwgVFJlc3VsdD4oXG4gICAgICAgIHRoaXMgSUVudW1lcmFibGU8VFNvdXJjZT4gc291cmNlLFxuICAgICAgICBGdW5jPFRTb3VyY2Us4oCCSUVudW1lcmFibGU8VENvbGxlY3Rpb24+PiBjb2xsZWN0aW9uU2VsZWN0b3IsXG4gICAgICAgIEZ1bmM8VFNvdXJjZSzigIJUQ29sbGVjdGlvbizigIJUUmVzdWx0PiByZXN1bHRTZWxlY3RvcilcbiAgICAgKi9cbiAgICBfc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWNvbGxlY3Rpb25TZWxlY3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJjb2xsZWN0aW9uU2VsZWN0b3JcIik7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzczsgLy8gRG8gc2Vjb25kIGVudW1lcmF0aW9uLCBpdCB3aWxsIGJlIGluZGV0ZXJtaW5hdGUgaWYgZmFsc2UuXG4gICAgICAgIGlmICghcmVzdWx0U2VsZWN0b3IpXG4gICAgICAgICAgICByZXN1bHRTZWxlY3RvciA9IChhLCBiKSA9PiBiO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IG1pZGRsZUVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFjb2xsZWN0aW9uU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gVk9JRDA7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWNvbGxlY3Rpb25TZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgLy8gSnVzdCBzdGFydGVkLCBhbmQgbm90aGluZyB0byBlbnVtZXJhdGU/IEVuZC5cbiAgICAgICAgICAgICAgICBpZiAobWlkZGxlRW51bWVyYXRvciA9PT0gVk9JRDAgJiYgIWVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIG1vdmVOZXh0IGhhcyBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlLi4uXG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIG1pZGRsZSBpZiB0aGVyZSBpc24ndCBvbmUuXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWlkZGxlRW51bWVyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pZGRsZVNlcSA9IGNvbGxlY3Rpb25TZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIGluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29sbGVjdGlvbiBpcyBudWxsPyAgU2tpcCBpdC4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtaWRkbGVTZXEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShtaWRkbGVTZXEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtaWRkbGVFbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIG1pZGRsZUVudW1lcmF0b3IuY3VycmVudCkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIG5vIG1vcmUgaW4gdGhpcyBtaWRkbGU/ICBUaGVuIGNsZWFyIGFuZCByZXNldCBmb3IgbmV4dC4uLlxuICAgICAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgbWlkZGxlRW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGRpc3Bvc2VTaW5nbGUobWlkZGxlRW51bWVyYXRvcik7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgbWlkZGxlRW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uU2VsZWN0b3IgPSBOVUxMO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBzZWxlY3RNYW55KGNvbGxlY3Rpb25TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcik7XG4gICAgfVxuICAgIF9maWx0ZXJTZWxlY3RlZChzZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSwgZmlsdGVyKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFzZWxlY3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzZWxlY3RvclwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSBpbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gc2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWx0ZXIgfHwgZmlsdGVyKHJlc3VsdCwgaSsrKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9LCBfLl9pc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB9LCBfLl9pc0VuZGxlc3MpO1xuICAgIH1cbiAgICBjaG9vc2Uoc2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yLCBpc05vdE51bGxPclVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHdoZXJlKHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoRnVuY3Rpb25zLklkZW50aXR5LCBwcmVkaWNhdGUpO1xuICAgIH1cbiAgICBmaWx0ZXIocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChGdW5jdGlvbnMuSWRlbnRpdHksIHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIG5vbk51bGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndoZXJlKHYgPT4gdiAhPSBudWxsICYmIHYgIT0gVk9JRDApO1xuICAgIH1cbiAgICBvZlR5cGUodHlwZSkge1xuICAgICAgICBsZXQgdHlwZU5hbWU7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBOdW1iZXI6XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLk5VTUJFUjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3RyaW5nOlxuICAgICAgICAgICAgICAgIHR5cGVOYW1lID0gVHlwZS5TVFJJTkc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLkJPT0xFQU47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZ1bmN0aW9uOlxuICAgICAgICAgICAgICAgIHR5cGVOYW1lID0gVHlwZS5GVU5DVElPTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgLndoZXJlKHggPT4geCBpbnN0YW5jZW9mIHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICAud2hlcmUoeCA9PiBpc05vdE51bGxPclVuZGVmaW5lZCh4KSAmJiB0eXBlb2YgeCA9PT0gdHlwZU5hbWUpO1xuICAgIH1cbiAgICBleGNlcHQoc2Vjb25kLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQga2V5cztcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGtleXMgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmQpXG4gICAgICAgICAgICAgICAgICAgIGVudW1VdGlsLmZvckVhY2goc2Vjb25kLCBrZXkgPT4geyBrZXlzLmFkZEJ5S2V5VmFsdWUoa2V5LCB0cnVlKTsgfSk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzLmFkZEJ5S2V5VmFsdWUoY3VycmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGtleXMuY2xlYXIoKTtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgZGlzdGluY3QoY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2VwdChOVUxMLCBjb21wYXJlU2VsZWN0b3IpO1xuICAgIH1cbiAgICAvLyBbMCwwLDAsMSwxLDEsMiwyLDIsMCwwLDAsMSwxXSByZXN1bHRzIGluIFswLDEsMiwwLDFdO1xuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBjb21wYXJlS2V5O1xuICAgICAgICAgICAgbGV0IGluaXRpYWwgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gY29tcGFyZVNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJlRXF1YWxWYWx1ZXMoY29tcGFyZUtleSwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29tcGFyZUtleSA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHNpbmdsZSBkZWZhdWx0IHZhbHVlIGlmIGVtcHR5LlxuICAgICAqIEBwYXJhbSBkZWZhdWx0VmFsdWVcbiAgICAgKiBAcmV0dXJucyB7RW51bWVyYWJsZX1cbiAgICAgKi9cbiAgICBkZWZhdWx0SWZFbXB0eShkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaXNGaXJzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihkZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgbnVsbCwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgemlwKHNlY29uZCwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShzZWNvbmQpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IGZpcnN0RW51bWVyYXRvci5tb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgJiYgc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihmaXJzdEVudW1lcmF0b3IuY3VycmVudCwgc2Vjb25kRW51bWVyYXRvci5jdXJyZW50LCBpbmRleCsrKSksICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB6aXBNdWx0aXBsZShzZWNvbmQsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlY29uZC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWNvbmRUZW1wO1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlY29uZFRlbXAgPSBuZXcgUXVldWUoc2Vjb25kKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFzZWNvbmRFbnVtZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZFRlbXAuY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHQgPSBzZWNvbmRUZW1wLmRlcXVldWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQpIC8vIEluIGNhc2UgYnkgY2hhbmNlIG5leHQgaXMgbnVsbCwgdGhlbiB0cnkgYWdhaW4uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGZpcnN0RW51bWVyYXRvci5jdXJyZW50LCBzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQsIGluZGV4KyspKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRUZW1wKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRUZW1wLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIHNlY29uZFRlbXAgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIEpvaW4gTWV0aG9kc1xuICAgIGpvaW4oaW5uZXIsIG91dGVyS2V5U2VsZWN0b3IsIGlubmVyS2V5U2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG91dGVyRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBsb29rdXA7XG4gICAgICAgICAgICBsZXQgaW5uZXJFbGVtZW50cztcbiAgICAgICAgICAgIGxldCBpbm5lckNvdW50ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG91dGVyRW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGxvb2t1cCA9IEVudW1lcmFibGUuZnJvbShpbm5lcilcbiAgICAgICAgICAgICAgICAgICAgLnRvTG9va3VwKGlubmVyS2V5U2VsZWN0b3IsIEZ1bmN0aW9ucy5JZGVudGl0eSwgY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbm5lckVsZW1lbnQgPSBpbm5lckVsZW1lbnRzW2lubmVyQ291bnQrK107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXJFbGVtZW50ICE9PSBWT0lEMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihvdXRlckVudW1lcmF0b3IuY3VycmVudCwgaW5uZXJFbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lckVsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdXRlckVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IG91dGVyS2V5U2VsZWN0b3Iob3V0ZXJFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJFbGVtZW50cyA9IGxvb2t1cC5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3V0ZXJFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBvdXRlckVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlubmVyRWxlbWVudHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIG91dGVyRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgbG9va3VwID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ3JvdXBKb2luKGlubmVyLCBvdXRlcktleVNlbGVjdG9yLCBpbm5lcktleVNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGxvb2t1cDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBsb29rdXAgPSBFbnVtZXJhYmxlLmZyb20oaW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIC50b0xvb2t1cChpbm5lcktleVNlbGVjdG9yLCBGdW5jdGlvbnMuSWRlbnRpdHksIGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4gZW51bWVyYXRvci5tb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIGxvb2t1cC5nZXQob3V0ZXJLZXlTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQpKSkpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGxvb2t1cCA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1lcmdlKGVudW1lcmFibGVzKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIGlmICghZW51bWVyYWJsZXMgfHwgZW51bWVyYWJsZXMubGVuZ3RoID09IDApXG4gICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBxdWV1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIDEpIEZpcnN0IGdldCBvdXIgdmFsdWVzLi4uXG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gbmV3IFF1ZXVlKGVudW1lcmFibGVzKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFlbnVtZXJhdG9yICYmIHF1ZXVlLnRyeURlcXVldWUodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IGVudW1VdGlsLmZyb20odmFsdWUpOyAvLyA0KSBLZWVwIGdvaW5nIGFuZCBvbiB0byBzdGVwIDIuICBFbHNlIGZhbGwgdGhyb3VnaCB0byB5aWVsZEJyZWFrKCkuXG4gICAgICAgICAgICAgICAgICAgIH0pKSB7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IgJiYgZW51bWVyYXRvci5tb3ZlTmV4dCgpKSAvLyAyKSBLZWVwIHJldHVybmluZyB1bnRpbCBkb25lLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpIC8vIDMpIERpc3Bvc2UgYW5kIHJlc2V0IGZvciBuZXh0LlxuICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSlcbiAgICAgICAgICAgICAgICAgICAgcXVldWUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGNvbmNhdCguLi5lbnVtZXJhYmxlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXJnZShlbnVtZXJhYmxlcyk7XG4gICAgfVxuICAgIHVuaW9uKHNlY29uZCwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGtleXM7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBrZXlzID0gbmV3IERpY3Rpb25hcnkoY29tcGFyZVNlbGVjdG9yKTsgLy8gQWN0aW5nIGFzIGEgSGFzaFNldC5cbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IgPT09IFZPSUQwKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChmaXJzdEVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGZpcnN0RW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5hZGRCeUtleVZhbHVlKGN1cnJlbnQsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKHNlY29uZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlIChzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHNlY29uZEVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzLmFkZEJ5S2V5VmFsdWUoY3VycmVudCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGluc2VydEF0KGluZGV4LCBvdGhlcikge1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgsICdpbmRleCcpO1xuICAgICAgICBjb25zdCBuID0gaW5kZXg7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgIGxldCBpc0VudW1lcmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShvdGhlcik7XG4gICAgICAgICAgICAgICAgaXNFbnVtZXJhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSBuKSB7IC8vIEluc2VydGluZz9cbiAgICAgICAgICAgICAgICAgICAgaXNFbnVtZXJhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHNlY29uZEVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihmaXJzdEVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhaXNFbnVtZXJhdGVkXG4gICAgICAgICAgICAgICAgICAgICYmIHNlY29uZEVudW1lcmF0b3IubW92ZU5leHQoKVxuICAgICAgICAgICAgICAgICAgICAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHNlY29uZEVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGFsdGVybmF0ZU11bHRpcGxlKHNlcXVlbmNlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciwgbW9kZSwgZW51bWVyYXRvciwgYWx0ZXJuYXRlRW51bWVyYXRvcjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEluc3RlYWQgb2YgcmVjYWxsaW5nIGdldEVudW1lcmF0b3IgZXZlcnkgdGltZSwganVzdCByZXNldCB0aGUgZXhpc3Rpbmcgb25lLlxuICAgICAgICAgICAgICAgIGFsdGVybmF0ZUVudW1lcmF0b3IgPSBuZXcgQXJyYXlFbnVtZXJhdG9yKEVudW1lcmFibGUudG9BcnJheShzZXF1ZW5jZSkpOyAvLyBGcmVlemVcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgbGV0IGhhc0F0TGVhc3RPbmUgPSBlbnVtZXJhdG9yLm1vdmVOZXh0KCk7XG4gICAgICAgICAgICAgICAgbW9kZSA9IGhhc0F0TGVhc3RPbmVcbiAgICAgICAgICAgICAgICAgICAgPyAxIC8qIFJldHVybiAqL1xuICAgICAgICAgICAgICAgICAgICA6IDAgLyogQnJlYWsgKi87XG4gICAgICAgICAgICAgICAgaWYgKGhhc0F0TGVhc3RPbmUpXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMCAvKiBCcmVhayAqLzogLy8gV2UncmUgZG9uZT9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyIC8qIFNraXAgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWx0ZXJuYXRlRW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGFsdGVybmF0ZUVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdGVFbnVtZXJhdG9yLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMSAvKiBSZXR1cm4gKi87XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxhdGVzdCA9IGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAvLyBTZXQgdXAgdGhlIG5leHQgcm91bmQuLi5cbiAgICAgICAgICAgICAgICAvLyBJcyB0aGVyZSBhbm90aGVyIG9uZT8gIFNldCB0aGUgYnVmZmVyIGFuZCBzZXR1cCBpbnN0cnVjdCBmb3IgdGhlIG5leHQgb25lIHRvIGJlIHRoZSBhbHRlcm5hdGUuXG4gICAgICAgICAgICAgICAgbGV0IGFub3RoZXIgPSBlbnVtZXJhdG9yLm1vdmVOZXh0KCk7XG4gICAgICAgICAgICAgICAgbW9kZSA9IGFub3RoZXJcbiAgICAgICAgICAgICAgICAgICAgPyAyIC8qIFNraXAgKi9cbiAgICAgICAgICAgICAgICAgICAgOiAwIC8qIEJyZWFrICovO1xuICAgICAgICAgICAgICAgIGlmIChhbm90aGVyKVxuICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4obGF0ZXN0KTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGFsdGVybmF0ZUVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGFsdGVybmF0ZUVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGFsdGVybmF0ZUVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgbnVsbCwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgYWx0ZXJuYXRlU2luZ2xlKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsdGVybmF0ZU11bHRpcGxlKEVudW1lcmFibGUubWFrZSh2YWx1ZSkpO1xuICAgIH1cbiAgICBhbHRlcm5hdGUoLi4uc2VxdWVuY2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWx0ZXJuYXRlTXVsdGlwbGUoc2VxdWVuY2UpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIEVycm9yIEhhbmRsaW5nXG4gICAgY2F0Y2hFcnJvcihoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBpbml0Li4uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXIoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaW5hbGx5QWN0aW9uKGFjdGlvbikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KVxuICAgICAgICAgICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgYnVmZmVyKHNpemUpIHtcbiAgICAgICAgaWYgKHNpemUgPCAxIHx8ICFpc0Zpbml0ZShzaXplKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYnVmZmVyIHNpemUuXCIpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChzaXplLCBcInNpemVcIik7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIGxldCBsZW47XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhcnJheSA9IGluaXRpYWxpemUoc2l6ZSk7XG4gICAgICAgICAgICAgICAgbGVuID0gMDtcbiAgICAgICAgICAgICAgICB3aGlsZSAobGVuIDwgc2l6ZSAmJiBlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlbbGVuKytdID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcnJheS5sZW5ndGggPSBsZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhbGVuICYmIHlpZWxkZXIueWllbGRSZXR1cm4oYXJyYXkpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIHNoYXJlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IHNoYXJlZEVudW1lcmF0b3I7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNoYXJlZEVudW1lcmF0b3IgfHwgKHNoYXJlZEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzaGFyZWRFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgIHNoYXJlZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgc2hhcmVkRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgIH0sIF8uX2lzRW5kbGVzcyk7XG4gICAgfVxuICAgIG1lbW9pemUoKSB7XG4gICAgICAgIGxldCBzb3VyY2UgPSBuZXcgTGF6eUxpc3QodGhpcyk7XG4gICAgICAgIHJldHVybiAobmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4gc291cmNlLmdldEVudW1lcmF0b3IoKSwgKCkgPT4ge1xuICAgICAgICAgICAgc291cmNlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHNvdXJjZSA9IG51bGw7XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4vKipcbiAqIEVudW1lcmFibGU8VD4gaXMgYSB3cmFwcGVyIGNsYXNzIHRoYXQgYWxsb3dzIG1vcmUgcHJpbWl0aXZlIGVudW1lcmFibGVzIHRvIGV4aGliaXQgTElOUSBiZWhhdmlvci5cbiAqXG4gKiBJbiBDIyBFbnVtZXJhYmxlPFQ+IGlzIG5vdCBhbiBpbnN0YW5jZSBidXQgaGFzIGV4dGVuc2lvbnMgZm9yIElFbnVtZXJhYmxlPFQ+LlxuICogSW4gdGhpcyBjYXNlLCB3ZSB1c2UgRW51bWVyYWJsZTxUPiBhcyB0aGUgdW5kZXJseWluZyBjbGFzcyB0aGF0IGlzIGJlaW5nIGNoYWluZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaW5xRW51bWVyYWJsZSBleHRlbmRzIEluZmluaXRlTGlucUVudW1lcmFibGUge1xuICAgIGNvbnN0cnVjdG9yKGVudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIsIGlzRW5kbGVzcykge1xuICAgICAgICBzdXBlcihlbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyKTtcbiAgICAgICAgdGhpcy5faXNFbmRsZXNzID0gaXNFbmRsZXNzO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJMaW5xRW51bWVyYWJsZVwiO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gYSBkZWZhdWx0ICh1bmZpbHRlcmVkKSBlbnVtZXJhYmxlLlxuICAgIGFzRW51bWVyYWJsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gXy5nZXRFbnVtZXJhdG9yKCkpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIEluZGV4aW5nL1BhZ2luZyBtZXRob2RzLlxuICAgIHNraXBXaGlsZShwcmVkaWNhdGUpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiBwcmVkaWNhdGUoZWxlbWVudCwgaW5kZXgpXG4gICAgICAgICAgICA/IDIgLyogU2tpcCAqL1xuICAgICAgICAgICAgOiAxIC8qIFJldHVybiAqLyk7XG4gICAgfVxuICAgIHRha2VXaGlsZShwcmVkaWNhdGUpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdwcmVkaWNhdGUnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiBwcmVkaWNhdGUoZWxlbWVudCwgaW5kZXgpXG4gICAgICAgICAgICA/IDEgLyogUmV0dXJuICovXG4gICAgICAgICAgICA6IDAgLyogQnJlYWsgKi8sIG51bGwsIG51bGwgLy8gV2UgZG9uJ3Qga25vdyB0aGUgc3RhdGUgaWYgaXQgaXMgZW5kbGVzcyBvciBub3QuXG4gICAgICAgICk7XG4gICAgfVxuICAgIC8vIElzIGxpa2UgdGhlIGludmVyc2Ugb2YgdGFrZSBXaGlsZSB3aXRoIHRoZSBhYmlsaXR5IHRvIHJldHVybiB0aGUgdmFsdWUgaWRlbnRpZmllZCBieSB0aGUgcHJlZGljYXRlLlxuICAgIHRha2VVbnRpbChwcmVkaWNhdGUsIGluY2x1ZGVVbnRpbFZhbHVlKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigncHJlZGljYXRlJyk7XG4gICAgICAgIGlmICghaW5jbHVkZVVudGlsVmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbigoZWxlbWVudCwgaW5kZXgpID0+IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleClcbiAgICAgICAgICAgICAgICA/IDAgLyogQnJlYWsgKi9cbiAgICAgICAgICAgICAgICA6IDEgLyogUmV0dXJuICovLCBudWxsLCBudWxsIC8vIFdlIGRvbid0IGtub3cgdGhlIHN0YXRlIGlmIGl0IGlzIGVuZGxlc3Mgb3Igbm90LlxuICAgICAgICAgICAgKTtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZvdW5kKVxuICAgICAgICAgICAgICAgIHJldHVybiAwIC8qIEJyZWFrICovO1xuICAgICAgICAgICAgZm91bmQgPSBwcmVkaWNhdGUoZWxlbWVudCwgaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIDEgLyogUmV0dXJuICovO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgICAgICB9LCBudWxsIC8vIFdlIGRvbid0IGtub3cgdGhlIHN0YXRlIGlmIGl0IGlzIGVuZGxlc3Mgb3Igbm90LlxuICAgICAgICApO1xuICAgIH1cbiAgICB0cmF2ZXJzZUJyZWFkdGhGaXJzdChjaGlsZHJlblNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzczsgLy8gSXMgZW5kbGVzcyBpcyBub3QgYWZmaXJtYXRpdmUgaWYgZmFsc2UuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbmVzdExldmVsID0gMDtcbiAgICAgICAgICAgIGxldCBidWZmZXIsIGxlbjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIG5lc3RMZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgbGVuID0gMDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXJbbGVuKytdID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0U2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBuZXN0TGV2ZWwpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWxlbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHQgPSBFbnVtZXJhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAuZnJvbShidWZmZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0TWFueShjaGlsZHJlblNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0LmFueSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXN0TGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IG5leHQuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWFjdGlvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJhY3Rpb25cIik7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKF8uaXNFbmRsZXNzKTtcbiAgICAgICAgLypcbiAgICAgICAgLy8gSXQgY291bGQgYmUganVzdCBhcyBlYXN5IHRvIGRvIHRoZSBmb2xsb3dpbmc6XG4gICAgICAgIHJldHVybiBlbnVtVXRpbC5mb3JFYWNoKF8sIGFjdGlvbiwgbWF4KTtcbiAgICAgICAgLy8gQnV0IHRvIGJlIG1vcmUgYWN0aXZlIGFib3V0IGNoZWNraW5nIGZvciBkaXNwb3NhbCwgd2UgdXNlIHRoaXMgaW5zdGVhZDpcbiAgICAgICAgKi9cbiAgICAgICAgLy8gUmV0dXJuIHZhbHVlIG9mIGFjdGlvbiBjYW4gYmUgYW55dGhpbmcsIGJ1dCBpZiBpdCBpcyAoPT09KSBmYWxzZSB0aGVuIHRoZSBlbnVtVXRpbC5mb3JFYWNoIHdpbGwgZGlzY29udGludWUuXG4gICAgICAgIHJldHVybiBtYXggPiAwID8gdXNpbmcoXy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgdGhyb3dJZkVuZGxlc3MoIWlzRmluaXRlKG1heCkgJiYgZS5pc0VuZGxlc3MpO1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgLy8gSXQgaXMgcG9zc2libGUgdGhhdCBzdWJzZXF1ZW50bHkgJ2FjdGlvbicgY291bGQgY2F1c2UgdGhlIGVudW1lcmF0aW9uIHRvIGRpc3Bvc2UsIHNvIHdlIGhhdmUgdG8gY2hlY2sgZWFjaCB0aW1lLlxuICAgICAgICAgICAgd2hpbGUgKG1heCA+IGkgJiYgXy50aHJvd0lmRGlzcG9zZWQoKSAmJiBlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKGUuY3VycmVudCwgaSsrKSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0pIDogMDtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBDb252ZXJzaW9uIE1ldGhvZHNcbiAgICB0b0FycmF5KHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gcHJlZGljYXRlXG4gICAgICAgICAgICA/IHRoaXMud2hlcmUocHJlZGljYXRlKS50b0FycmF5KClcbiAgICAgICAgICAgIDogdGhpcy5jb3B5VG8oW10pO1xuICAgIH1cbiAgICBjb3B5VG8odGFyZ2V0LCBpbmRleCA9IDAsIGNvdW50ID0gSW5maW5pdHkpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCF0YXJnZXQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwidGFyZ2V0XCIpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgpO1xuICAgICAgICAvLyBJZiBub3QgZXhwb3NpbmcgYW4gYWN0aW9uIHRoYXQgY291bGQgY2F1c2UgZGlzcG9zZSwgdGhlbiB1c2UgZW51bVV0aWwuZm9yRWFjaCB1dGlsaXR5IGluc3RlYWQuXG4gICAgICAgIGVudW1VdGlsLmZvckVhY2godGhpcywgKHgsIGkpID0+IHtcbiAgICAgICAgICAgIHRhcmdldFtpICsgaW5kZXhdID0geDtcbiAgICAgICAgfSwgY291bnQpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICB0b0xvb2t1cChrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5LCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZGljdCA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IGtleSA9IGtleVNlbGVjdG9yKHgsIGkpO1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlbGVtZW50U2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBsZXQgYXJyYXkgPSBkaWN0LmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICBpZiAoYXJyYXkgIT09IFZPSUQwKVxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGljdC5hZGRCeUtleVZhbHVlKGtleSwgW2VsZW1lbnRdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgTG9va3VwKGRpY3QpO1xuICAgIH1cbiAgICB0b01hcChrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgb2JqW2tleVNlbGVjdG9yKHgsIGkpXSA9IGVsZW1lbnRTZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIHRvRGljdGlvbmFyeShrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZGljdCA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4gZGljdC5hZGRCeUtleVZhbHVlKGtleVNlbGVjdG9yKHgsIGkpLCBlbGVtZW50U2VsZWN0b3IoeCwgaSkpKTtcbiAgICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgfVxuICAgIHRvSm9pbmVkU3RyaW5nKHNlcGFyYXRvciA9IFwiXCIsIHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICAuc2VsZWN0KHNlbGVjdG9yKVxuICAgICAgICAgICAgLnRvQXJyYXkoKVxuICAgICAgICAgICAgLmpvaW4oc2VwYXJhdG9yKTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIHRha2VFeGNlcHRMYXN0KGNvdW50ID0gMSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSkgLy8gT3V0IG9mIGJvdW5kcz9cbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSkgLy8gK0luZmluaXR5IGVxdWFscyBza2lwIGFsbCBzbyByZXR1cm4gZW1wdHkuXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgY29uc3QgYyA9IGNvdW50O1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHE7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgcSA9IG5ldyBRdWV1ZSgpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgbmV4dCBvbmUgdG8gdGhlIHF1ZXVlLlxuICAgICAgICAgICAgICAgICAgICBxLmVucXVldWUoZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gRGlkIHdlIHJlYWNoIG91ciBxdW90YT9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHEuY291bnQgPiBjKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2theSB0aGVuLCBzdGFydCByZXR1cm5pbmcgcmVzdWx0cy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHEuZGVxdWV1ZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBpZiAocSlcbiAgICAgICAgICAgICAgICAgICAgcS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgcSA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNraXBUb0xhc3QoY291bnQpIHtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSkgLy8gT3V0IG9mIGJvdW5kcz8gRW1wdHkuXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShjb3VudCkpIC8vIEluZmluaXR5IG1lYW5zIHJldHVybiBhbGwuXG4gICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIik7XG4gICAgICAgIC8vIFRoaXMgc2V0cyB1cCB0aGUgcXVlcnkgc28gbm90aGluZyBpcyBkb25lIHVudGlsIG1vdmUgbmV4dCBpcyBjYWxsZWQuXG4gICAgICAgIHJldHVybiBfLnJldmVyc2UoKVxuICAgICAgICAgICAgLnRha2UoY291bnQpXG4gICAgICAgICAgICAucmV2ZXJzZSgpO1xuICAgIH1cbiAgICAvLyBUbyBoZWxwIHdpdGggdHlwZSBndWFyZGluZy5cbiAgICBzZWxlY3Qoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnNlbGVjdChzZWxlY3Rvcik7XG4gICAgfVxuICAgIG1hcChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gc3VwZXIuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICB9XG4gICAgc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNYW55KGNvbGxlY3Rpb25TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpO1xuICAgIH1cbiAgICBjaG9vc2Uoc2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yLCBpc05vdE51bGxPclVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHJldmVyc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhyb3dJZkVuZGxlc3MoXy5faXNFbmRsZXNzKTsgLy8gQ2Fubm90IHJldmVyc2UgYW4gZW5kbGVzcyBjb2xsZWN0aW9uLi4uXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJ1ZmZlcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gXy50b0FycmF5KCk7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+ICEhaW5kZXggJiYgeWllbGRlci55aWVsZFJldHVybihidWZmZXJbLS1pbmRleF0pLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2h1ZmZsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aHJvd0lmRW5kbGVzcyhfLl9pc0VuZGxlc3MpOyAvLyBDYW5ub3Qgc2h1ZmZsZSBhbiBlbmRsZXNzIGNvbGxlY3Rpb24uLi5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYnVmZmVyO1xuICAgICAgICAgICAgbGV0IGNhcGFjaXR5O1xuICAgICAgICAgICAgbGV0IGxlbjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gXy50b0FycmF5KCk7XG4gICAgICAgICAgICAgICAgY2FwYWNpdHkgPSBsZW4gPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBBdm9pZCB1c2luZyBtYWpvciBhcnJheSBvcGVyYXRpb25zIGxpa2UgLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFsZW4pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJbmRleCA9IFJhbmRvbS5pbnRlZ2VyKGxlbik7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkVmFsdWUgPSBidWZmZXJbc2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICAgICAgYnVmZmVyW3NlbGVjdGVkSW5kZXhdID0gYnVmZmVyWy0tbGVuXTsgLy8gVGFrZSB0aGUgbGFzdCBvbmUgYW5kIHB1dCBpdCBoZXJlLlxuICAgICAgICAgICAgICAgIGJ1ZmZlcltsZW5dID0gTlVMTDsgLy8gY2xlYXIgcG9zc2libGUgcmVmZXJlbmNlLlxuICAgICAgICAgICAgICAgIGlmIChsZW4gJSAzMiA9PSAwKSAvLyBTaHJpbms/XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSBsZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oc2VsZWN0ZWRWYWx1ZSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY291bnQocHJlZGljYXRlKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZm9yRWFjaChwcmVkaWNhdGVcbiAgICAgICAgICAgID8gKHgsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlKHgsIGkpKVxuICAgICAgICAgICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuICAgIC8vIEFraW4gdG8gJy5ldmVyeScgb24gYW4gYXJyYXkuXG4gICAgYWxsKHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJwcmVkaWNhdGVcIik7XG4gICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICghcHJlZGljYXRlKHgsIGkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gJ2V2ZXJ5JyBoYXMgYmVlbiBhZGRlZCBoZXJlIGZvciBwYXJpdHkvY29tcGF0aWJpbGl0eSB3aXRoIGFuIGFycmF5LlxuICAgIGV2ZXJ5KHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGwocHJlZGljYXRlKTtcbiAgICB9XG4gICAgLy8gQWtpbiB0byAnLnNvbWUnIG9uIGFuIGFycmF5LlxuICAgIGFueShwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuYW55KCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgLy8gU3BsaXR0aW5nIHRoZSBmb3JFYWNoIHVwIHRoaXMgd2F5IHJlZHVjZXMgaXRlcmF0aXZlIHByb2Nlc3NpbmcuXG4gICAgICAgIC8vIGZvckVhY2ggaGFuZGxlcyB0aGUgZ2VuZXJhdGlvbiBhbmQgZGlzcG9zYWwgb2YgdGhlIGVudW1lcmF0b3IuXG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0ID0gcHJlZGljYXRlKHgsIGkpOyAvLyBmYWxzZSA9IG5vdCBmb3VuZCBhbmQgdGhlcmVmb3JlIGl0IHNob3VsZCBjb250aW51ZS4gIHRydWUgPSBmb3VuZCBhbmQgYnJlYWs7XG4gICAgICAgICAgICByZXR1cm4gIXJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vICdzb21lJyBoYXMgYmVlbiBhZGRlZCBoZXJlIGZvciBwYXJpdHkvY29tcGF0aWJpbGl0eSB3aXRoIGFuIGFycmF5LlxuICAgIHNvbWUocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFueShwcmVkaWNhdGUpO1xuICAgIH1cbiAgICBjb250YWlucyh2YWx1ZSwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGlmIChjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBjb21wYXJlU2VsZWN0b3IodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW55KHYgPT4gYXJlRXF1YWxWYWx1ZXMoY29tcGFyZVNlbGVjdG9yKHYpLCBzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYW55KHYgPT4gYXJlRXF1YWxWYWx1ZXModiwgdmFsdWUpKTtcbiAgICB9XG4gICAgLy8gT3JpZ2luYWxseSBoYXMgYW4gb3ZlcmxvYWQgZm9yIGEgcHJlZGljYXRlLFxuICAgIC8vIGJ1dCB0aGF0J3MgYSBiYWQgaWRlYSBzaW5jZSB0aGlzIGNvdWxkIGJlIGFuIGVudW1lcmF0aW9uIG9mIGZ1bmN0aW9ucyBhbmQgdGhlcmVmb3JlIGZhaWwgdGhlIGludGVudC5cbiAgICAvLyBCZXR0ZXIgdG8gY2hhaW4gYSB3aGVyZSBzdGF0ZW1lbnQgZmlyc3QgdG8gYmUgbW9yZSBleHBsaWNpdC5cbiAgICBpbmRleE9mKHZhbHVlLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgbGV0IGZvdW5kID0gLTE7XG4gICAgICAgIHRoaXMuZm9yRWFjaChjb21wYXJlU2VsZWN0b3JcbiAgICAgICAgICAgID8gKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXJlRXF1YWxWYWx1ZXMoY29tcGFyZVNlbGVjdG9yKGVsZW1lbnQsIGkpLCBjb21wYXJlU2VsZWN0b3IodmFsdWUsIGkpLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IChlbGVtZW50LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gV2h5PyAgQmVjYXVzZSBOYU4gZG9lc24ndCBlcXVhbCBOYU4uIDpQXG4gICAgICAgICAgICAgICAgaWYgKGFyZUVxdWFsVmFsdWVzKGVsZW1lbnQsIHZhbHVlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICBsYXN0SW5kZXhPZih2YWx1ZSwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAtMTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGNvbXBhcmVTZWxlY3RvclxuICAgICAgICAgICAgPyAoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlU2VsZWN0b3IoZWxlbWVudCwgaSksIGNvbXBhcmVTZWxlY3Rvcih2YWx1ZSwgaSksIHRydWUpKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXJlRXF1YWxWYWx1ZXMoZWxlbWVudCwgdmFsdWUsIHRydWUpKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGludGVyc2VjdChzZWNvbmQsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFzZWNvbmQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic2Vjb25kXCIpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLmlzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBrZXlzO1xuICAgICAgICAgICAgbGV0IG91dHM7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXNlY29uZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGtleXMgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIG91dHMgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGVudW1VdGlsLmZvckVhY2goc2Vjb25kLCBrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLmFkZEJ5S2V5VmFsdWUoa2V5LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvdXRzLmNvbnRhaW5zS2V5KGN1cnJlbnQpICYmIGtleXMuY29udGFpbnNLZXkoY3VycmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHMuYWRkQnlLZXlWYWx1ZShjdXJyZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleXMpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChvdXRzKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBrZXlzID0gTlVMTDtcbiAgICAgICAgICAgICAgICBvdXRzID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHNlY29uZCA9IE5VTEw7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIHNlcXVlbmNlRXF1YWwoc2Vjb25kLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWxWYWx1ZXMpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlMSA9PiB1c2luZyhlbnVtVXRpbC5mcm9tKHNlY29uZCksIGUyID0+IHtcbiAgICAgICAgICAgIC8vIGlmIGJvdGggYXJlIGVuZGxlc3MsIHRoaXMgd2lsbCBuZXZlciBldmFsdWF0ZS5cbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKGUxLmlzRW5kbGVzcyAmJiBlMi5pc0VuZGxlc3MpO1xuICAgICAgICAgICAgd2hpbGUgKGUxLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWUyLm1vdmVOZXh0KCkgfHwgIWVxdWFsaXR5Q29tcGFyZXIoZTEuY3VycmVudCwgZTIuY3VycmVudCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAhZTIubW92ZU5leHQoKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBvZlR5cGUodHlwZSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gc3VwZXIub2ZUeXBlKHR5cGUpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIE9yZGVyaW5nIE1ldGhvZHNcbiAgICBvcmRlckJ5KGtleVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywga2V5U2VsZWN0b3IsIDEgLyogQXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgb3JkZXJVc2luZyhjb21wYXJpc29uKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywgbnVsbCwgMSAvKiBBc2NlbmRpbmcgKi8sIG51bGwsIGNvbXBhcmlzb24pO1xuICAgIH1cbiAgICBvcmRlclVzaW5nUmV2ZXJzZWQoY29tcGFyaXNvbikge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMsIG51bGwsIC0xIC8qIERlc2NlbmRpbmcgKi8sIG51bGwsIGNvbXBhcmlzb24pO1xuICAgIH1cbiAgICBvcmRlckJ5RGVzY2VuZGluZyhrZXlTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMsIGtleVNlbGVjdG9yLCAtMSAvKiBEZXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgLypcbiAgICAgICAgIHdlaWdodGVkU2FtcGxlKHdlaWdodFNlbGVjdG9yKSB7XG4gICAgICAgICB3ZWlnaHRTZWxlY3RvciA9IFV0aWxzLmNyZWF0ZUxhbWJkYSh3ZWlnaHRTZWxlY3Rvcik7XG4gICAgICAgICB2YXIgc291cmNlID0gdGhpcztcbiAgICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGU8VD4oKCkgPT4ge1xuICAgICAgICAgdmFyIHNvcnRlZEJ5Qm91bmQ7XG4gICAgICAgICB2YXIgdG90YWxXZWlnaHQgPSAwO1xuICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZTxUPihcbiAgICAgICAgICgpID0+IHtcbiAgICAgICAgIHNvcnRlZEJ5Qm91bmQgPSBzb3VyY2VcbiAgICAgICAgIC5jaG9vc2UoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgIHZhciB3ZWlnaHQgPSB3ZWlnaHRTZWxlY3Rvcih4KTtcbiAgICAgICAgIGlmICh3ZWlnaHQgPD0gMCkgcmV0dXJuIG51bGw7IC8vIGlnbm9yZSAwXG4gICAgICAgICB0b3RhbFdlaWdodCArPSB3ZWlnaHQ7XG4gICAgICAgICByZXR1cm4geyB2YWx1ZTogeCwgYm91bmQ6IHRvdGFsV2VpZ2h0IH1cbiAgICAgICAgIH0pXG4gICAgICAgICAudG9BcnJheSgpO1xuICAgICAgICAgfSxcbiAgICAgICAgICgpID0+IHtcbiAgICAgICAgIGlmIChzb3J0ZWRCeUJvdW5kLmxlbmd0aCA+IDApIHtcbiAgICAgICAgIHZhciBkcmF3ID0gKE1hdGgucmFuZG9tKCkgKiB0b3RhbFdlaWdodCkgKyAxO1xuICAgICAgICAgdmFyIGxvd2VyID0gLTE7XG4gICAgICAgICB2YXIgdXBwZXIgPSBzb3J0ZWRCeUJvdW5kLmxlbmd0aDtcbiAgICAgICAgIHdoaWxlICh1cHBlciAtIGxvd2VyID4gMSkge1xuICAgICAgICAgdmFyIGluZGV4ID0gKChsb3dlciArIHVwcGVyKSAvIDIpO1xuICAgICAgICAgaWYgKHNvcnRlZEJ5Qm91bmRbaW5kZXhdLmJvdW5kID49IGRyYXcpIHtcbiAgICAgICAgIHVwcGVyID0gaW5kZXg7XG4gICAgICAgICB9XG4gICAgICAgICBlbHNlIHtcbiAgICAgICAgIGxvd2VyID0gaW5kZXg7XG4gICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykueWllbGRSZXR1cm4oc29ydGVkQnlCb3VuZFt1cHBlcl0udmFsdWUpO1xuICAgICAgICAgfVxuICAgICAgICAgcmV0dXJuICg8YW55PnRoaXMpLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgIH0sXG4gICAgICAgICBGdW5jdGlvbnMuQmxhbmspO1xuICAgICAgICAgfSk7XG4gICAgICAgICB9XG4gICAgICAgICAqL1xuICAgIC8vICNlbmRyZWdpb25cbiAgICBidWZmZXIoc2l6ZSkge1xuICAgICAgICByZXR1cm4gc3VwZXIuYnVmZmVyKHNpemUpO1xuICAgIH1cbiAgICBncm91cEJ5KGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBpZiAoIWVsZW1lbnRTZWxlY3RvcilcbiAgICAgICAgICAgIGVsZW1lbnRTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eTsgLy8gQWxsb3cgZm9yICdudWxsJyBhbmQgbm90IGp1c3QgdW5kZWZpbmVkLlxuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHRoaXNcbiAgICAgICAgICAgIC50b0xvb2t1cChrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IpXG4gICAgICAgICAgICAuZ2V0RW51bWVyYXRvcigpKTtcbiAgICB9XG4gICAgcGFydGl0aW9uQnkoa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IgPSAoa2V5LCBlbGVtZW50cykgPT4gbmV3IEdyb3VwaW5nKGtleSwgZWxlbWVudHMpLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghZWxlbWVudFNlbGVjdG9yKVxuICAgICAgICAgICAgZWxlbWVudFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5OyAvLyBBbGxvdyBmb3IgJ251bGwnIGFuZCBub3QganVzdCB1bmRlZmluZWQuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQga2V5O1xuICAgICAgICAgICAgbGV0IGNvbXBhcmVLZXk7XG4gICAgICAgICAgICBsZXQgZ3JvdXA7XG4gICAgICAgICAgICBsZXQgbGVuO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFlbGVtZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlTZWxlY3Rvcih2KTtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFyZUtleSA9IGNvbXBhcmVTZWxlY3RvcihrZXkpO1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IFtlbGVtZW50U2VsZWN0b3IodildO1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFlbGVtZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGlmICghZ3JvdXApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICBsZXQgaGFzTmV4dCwgYztcbiAgICAgICAgICAgICAgICB3aGlsZSAoKGhhc05leHQgPSBlbnVtZXJhdG9yLm1vdmVOZXh0KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlS2V5LCBjb21wYXJlU2VsZWN0b3Ioa2V5U2VsZWN0b3IoYykpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwW2xlbisrXSA9IGVsZW1lbnRTZWxlY3RvcihjKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSByZXN1bHRTZWxlY3RvcihrZXksIGdyb3VwKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBjID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlTZWxlY3RvcihjKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFyZUtleSA9IGNvbXBhcmVTZWxlY3RvcihrZXkpO1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IFtlbGVtZW50U2VsZWN0b3IoYyldO1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBncm91cCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudFNlbGVjdG9yID0gTlVMTDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZsYXR0ZW4oKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5mbGF0dGVuKCk7XG4gICAgfVxuICAgIHBhaXJ3aXNlKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5wYWlyd2lzZShzZWxlY3Rvcik7XG4gICAgfVxuICAgIGFnZ3JlZ2F0ZShyZWR1Y3Rpb24sIGluaXRpYWxWYWx1ZSkge1xuICAgICAgICBpZiAoaW5pdGlhbFZhbHVlID09IFZPSUQwKSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gaVxuICAgICAgICAgICAgICAgICAgICA/IHJlZHVjdGlvbihpbml0aWFsVmFsdWUsIHZhbHVlLCBpKVxuICAgICAgICAgICAgICAgICAgICA6IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gcmVkdWN0aW9uKGluaXRpYWxWYWx1ZSwgdmFsdWUsIGkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluaXRpYWxWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvdmlkZWQgYXMgYW4gYW5hbG9nIGZvciBhcnJheS5yZWR1Y2UuICBTaW1wbHkgYSBzaG9ydGN1dCBmb3IgYWdncmVnYXRlLlxuICAgICAqIEBwYXJhbSByZWR1Y3Rpb25cbiAgICAgKiBAcGFyYW0gaW5pdGlhbFZhbHVlXG4gICAgICovXG4gICAgcmVkdWNlKHJlZHVjdGlvbiwgaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUocmVkdWN0aW9uLCBpbml0aWFsVmFsdWUpO1xuICAgIH1cbiAgICBhdmVyYWdlKHNlbGVjdG9yID0gVHlwZS5udW1iZXJPck5hTikge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBzdW0gPSB0aGlzLnN1bSgoZSwgaSkgPT4ge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcihlLCBpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoaXNOYU4oc3VtKSB8fCAhY291bnQpXG4gICAgICAgICAgICA/IE5hTlxuICAgICAgICAgICAgOiAoc3VtIC8gY291bnQpO1xuICAgIH1cbiAgICAvLyBJZiB1c2luZyBudW1iZXJzLCBpdCBtYXkgYmUgdXNlZnVsIHRvIGNhbGwgLnRha2VVbnRpbCh2PT52PT1JbmZpbml0eSx0cnVlKSBiZWZvcmUgY2FsbGluZyBtYXguIFNlZSBzdGF0aWMgdmVyc2lvbnMgZm9yIG51bWJlcnMuXG4gICAgbWF4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUoRnVuY3Rpb25zLkdyZWF0ZXIpO1xuICAgIH1cbiAgICBtaW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZShGdW5jdGlvbnMuTGVzc2VyKTtcbiAgICB9XG4gICAgbWF4Qnkoa2V5U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKChhLCBiKSA9PiAoa2V5U2VsZWN0b3IoYSkgPiBrZXlTZWxlY3RvcihiKSkgPyBhIDogYik7XG4gICAgfVxuICAgIG1pbkJ5KGtleVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZSgoYSwgYikgPT4gKGtleVNlbGVjdG9yKGEpIDwga2V5U2VsZWN0b3IoYikpID8gYSA6IGIpO1xuICAgIH1cbiAgICAvLyBBZGRpdGlvbi4uLiAgT25seSB3b3JrcyB3aXRoIG51bWVyaWNhbCBlbnVtZXJhdGlvbnMuXG4gICAgc3VtKHNlbGVjdG9yID0gVHlwZS5udW1iZXJPck5hTikge1xuICAgICAgICBsZXQgc3VtID0gMDtcbiAgICAgICAgLy8gVGhpcyBhbGxvd3MgZm9yIGluZmluaXR5IG1hdGggdGhhdCBkb2Vzbid0IGRlc3Ryb3kgdGhlIG90aGVyIHZhbHVlcy5cbiAgICAgICAgbGV0IHN1bUluZmluaXRlID0gMDsgLy8gTmVlZHMgbW9yZSBpbnZlc3RpZ2F0aW9uIHNpbmNlIHdlIGFyZSByZWFsbHkgdHJ5aW5nIHRvIHJldGFpbiBzaWducy5cbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBzdW0gPSBOYU47XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRmluaXRlKHZhbHVlKSlcbiAgICAgICAgICAgICAgICBzdW0gKz0gdmFsdWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3VtSW5maW5pdGUgKz1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPiAwID8gKCsxKSA6ICgtMSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaXNOYU4oc3VtKSA/IE5hTiA6IChzdW1JbmZpbml0ZSA/IChzdW1JbmZpbml0ZSAqIEluZmluaXR5KSA6IHN1bSk7XG4gICAgfVxuICAgIC8vIE11bHRpcGxpY2F0aW9uLi4uXG4gICAgcHJvZHVjdChzZWxlY3RvciA9IFR5cGUubnVtYmVyT3JOYU4pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDEsIGV4aXN0cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIGV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBOYU47XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlID09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAwOyAvLyBNdWx0aXBseWluZyBieSB6ZXJvIHdpbGwgYWx3YXlzIGVuZCBpbiB6ZXJvLlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE11bHRpcGxpY2F0aW9uIGNhbiBuZXZlciByZWNvdmVyIGZyb20gaW5maW5pdHkgYW5kIHNpbXBseSBtdXN0IHJldGFpbiBzaWducy5cbiAgICAgICAgICAgIC8vIFlvdSBjb3VsZCBjYW5jZWwgb3V0IGluZmluaXR5IHdpdGggMS9pbmZpbml0eSBidXQgbm8gYXZhaWxhYmxlIHJlcHJlc2VudGF0aW9uIGV4aXN0cy5cbiAgICAgICAgICAgIHJlc3VsdCAqPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoZXhpc3RzICYmIGlzTmFOKHJlc3VsdCkpID8gTmFOIDogcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUYWtlcyB0aGUgZmlyc3QgbnVtYmVyIGFuZCBkaXZpZGVzIGl0IGJ5IGFsbCBmb2xsb3dpbmcuXG4gICAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBxdW90aWVudChzZWxlY3RvciA9IFR5cGUubnVtYmVyT3JOYU4pIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IE5hTjtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IDAgfHwgIWlzRmluaXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBOYU47XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0IC89IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNvdW50ID09PSAxKVxuICAgICAgICAgICAgcmVzdWx0ID0gTmFOO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgLy8gI3JlZ2lvbiBTaW5nbGUgVmFsdWUgUmV0dXJuLi4uXG4gICAgbGFzdCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IFZPSUQwO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgXy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdmFsdWUgPSB4O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFmb3VuZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImxhc3Q6Tm8gZWxlbWVudCBzYXRpc2ZpZXMgdGhlIGNvbmRpdGlvbi5cIik7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgbGFzdE9yRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IFZPSUQwO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgXy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdmFsdWUgPSB4O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICghZm91bmQpID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICBtZW1vaXplKCkge1xuICAgICAgICBsZXQgc291cmNlID0gbmV3IExhenlMaXN0KHRoaXMpO1xuICAgICAgICByZXR1cm4gKG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBzb3VyY2UuZ2V0RW51bWVyYXRvcigpLCAoKSA9PiB7XG4gICAgICAgICAgICBzb3VyY2UuZGlzcG9zZSgpO1xuICAgICAgICAgICAgc291cmNlID0gbnVsbDtcbiAgICAgICAgfSwgdGhpcy5pc0VuZGxlc3MpKTtcbiAgICB9XG4gICAgdGhyb3dXaGVuRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKFJFVFVSTiwgbnVsbCwgdGhpcy5pc0VuZGxlc3MsIGNvdW50ID0+IHtcbiAgICAgICAgICAgIGlmICghY291bnQpXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJDb2xsZWN0aW9uIGlzIGVtcHR5LlwiO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyBQcm92aWRlZCBmb3IgdHlwZSBndWFyZGluZy5cbmV4cG9ydCBjbGFzcyBGaW5pdGVFbnVtZXJhYmxlIGV4dGVuZHMgTGlucUVudW1lcmFibGUge1xuICAgIGNvbnN0cnVjdG9yKGVudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIpIHtcbiAgICAgICAgc3VwZXIoZW51bWVyYXRvckZhY3RvcnksIGZpbmFsaXplciwgZmFsc2UpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJGaW5pdGVFbnVtZXJhYmxlXCI7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEFycmF5RW51bWVyYWJsZSBleHRlbmRzIEZpbml0ZUVudW1lcmFibGUge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSkge1xuICAgICAgICBzdXBlcigoKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheUVudW1lcmF0b3IoKCkgPT4ge1xuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKFwiVGhlIHVuZGVybHlpbmcgQXJyYXlFbnVtZXJhYmxlIHdhcyBkaXNwb3NlZC5cIiwgXCJBcnJheUVudW1lcmF0b3JcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uX3NvdXJjZTsgLy8gU2hvdWxkIG5ldmVyIGJlIG51bGwsIGJ1dCBBcnJheUVudW1lcmFibGUgaWYgbm90IGRpc3Bvc2VkIHNpbXBseSB0cmVhdHMgbnVsbCBhcyBlbXB0eSBhcnJheS5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIkFycmF5RW51bWVyYWJsZVwiO1xuICAgICAgICB0aGlzLl9zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fc291cmNlID0gTlVMTDtcbiAgICB9XG4gICAgZ2V0IHNvdXJjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZTtcbiAgICB9XG4gICAgdG9BcnJheSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBlbnVtVXRpbC50b0FycmF5KF8uX3NvdXJjZSk7XG4gICAgfVxuICAgIGFzRW51bWVyYWJsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhYmxlKHRoaXMuX3NvdXJjZSk7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uLCBtYXggPSBJbmZpbml0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLmZvckVhY2goXy5fc291cmNlLCBhY3Rpb24sIG1heCk7XG4gICAgfVxuICAgIC8vIFRoZXNlIG1ldGhvZHMgc2hvdWxkIEFMV0FZUyBjaGVjayBmb3IgYXJyYXkgbGVuZ3RoIGJlZm9yZSBhdHRlbXB0aW5nIGFueXRoaW5nLlxuICAgIGFueShwcmVkaWNhdGUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZTtcbiAgICAgICAgbGV0IGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiAhIWxlbiAmJiAoIXByZWRpY2F0ZSB8fCBzdXBlci5hbnkocHJlZGljYXRlKSk7XG4gICAgfVxuICAgIGNvdW50KHByZWRpY2F0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlLCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICByZXR1cm4gbGVuICYmIChwcmVkaWNhdGUgPyBzdXBlci5jb3VudChwcmVkaWNhdGUpIDogbGVuKTtcbiAgICB9XG4gICAgZWxlbWVudEF0T3JEZWZhdWx0KGluZGV4LCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihpbmRleCwgJ2luZGV4Jyk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZTtcbiAgICAgICAgcmV0dXJuIGluZGV4IDwgc291cmNlLmxlbmd0aFxuICAgICAgICAgICAgPyBzb3VyY2VbaW5kZXhdXG4gICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgbGFzdCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZSwgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIChsZW4pXG4gICAgICAgICAgICA/IHNvdXJjZVtsZW4gLSAxXVxuICAgICAgICAgICAgOiBzdXBlci5sYXN0KCk7XG4gICAgfVxuICAgIGxhc3RPckRlZmF1bHQoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBfLl9zb3VyY2UsIGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgICAgICAgID8gc291cmNlW2xlbiAtIDFdXG4gICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgc2tpcChjb3VudCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IG5ldyBBcnJheUVudW1lcmF0b3IoKCkgPT4gXy5fc291cmNlLCBjb3VudCkpO1xuICAgIH1cbiAgICB0YWtlRXhjZXB0TGFzdChjb3VudCA9IDEpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBfLnRha2UoXy5fc291cmNlLmxlbmd0aCAtIGNvdW50KTtcbiAgICB9XG4gICAgc2tpcFRvTGFzdChjb3VudCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgcmV0dXJuIF87XG4gICAgICAgIGNvbnN0IGxlbiA9IF8uX3NvdXJjZVxuICAgICAgICAgICAgPyBfLl9zb3VyY2UubGVuZ3RoXG4gICAgICAgICAgICA6IDA7XG4gICAgICAgIHJldHVybiBfLnNraXAobGVuIC0gY291bnQpO1xuICAgIH1cbiAgICByZXZlcnNlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5kZXhFbnVtZXJhdG9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcyA9IF8uX3NvdXJjZTtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQgfHwgIXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogcyxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogKHMubGVuZ3RoIC0gMSksXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aDogcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IC0xXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtZW1vaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hc0VudW1lcmFibGUoKTtcbiAgICB9XG4gICAgc2VxdWVuY2VFcXVhbChzZWNvbmQsIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbFZhbHVlcykge1xuICAgICAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShzZWNvbmQpKVxuICAgICAgICAgICAgcmV0dXJuIEFycmF5cy5hcmVFcXVhbCh0aGlzLnNvdXJjZSwgc2Vjb25kLCB0cnVlLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFN1c3BpY2lvdXNJbnN0YW5jZU9mR3VhcmRcbiAgICAgICAgaWYgKHNlY29uZCBpbnN0YW5jZW9mIEFycmF5RW51bWVyYWJsZSlcbiAgICAgICAgICAgIHJldHVybiBzZWNvbmQuc2VxdWVuY2VFcXVhbCh0aGlzLnNvdXJjZSwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgICAgIHJldHVybiBzdXBlci5zZXF1ZW5jZUVxdWFsKHNlY29uZCwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgfVxuICAgIHRvSm9pbmVkU3RyaW5nKHNlcGFyYXRvciA9IFwiXCIsIHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLl9zb3VyY2U7XG4gICAgICAgIHJldHVybiAhc2VsZWN0b3IgJiYgKHMpIGluc3RhbmNlb2YgKEFycmF5KVxuICAgICAgICAgICAgPyBzLmpvaW4oc2VwYXJhdG9yKVxuICAgICAgICAgICAgOiBzdXBlci50b0pvaW5lZFN0cmluZyhzZXBhcmF0b3IsIHNlbGVjdG9yKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgR3JvdXBpbmcgZXh0ZW5kcyBBcnJheUVudW1lcmFibGUge1xuICAgIGNvbnN0cnVjdG9yKF9ncm91cEtleSwgZWxlbWVudHMpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudHMpO1xuICAgICAgICB0aGlzLl9ncm91cEtleSA9IF9ncm91cEtleTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiR3JvdXBpbmdcIjtcbiAgICB9XG4gICAgZ2V0IGtleSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyb3VwS2V5O1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBMb29rdXAge1xuICAgIGNvbnN0cnVjdG9yKF9kaWN0aW9uYXJ5KSB7XG4gICAgICAgIHRoaXMuX2RpY3Rpb25hcnkgPSBfZGljdGlvbmFyeTtcbiAgICB9XG4gICAgZ2V0IGNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGljdGlvbmFyeS5jb3VudDtcbiAgICB9XG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGljdGlvbmFyeS5nZXRWYWx1ZShrZXkpIHx8IG51bGw7XG4gICAgfVxuICAgIGNvbnRhaW5zKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGljdGlvbmFyeS5jb250YWluc0tleShrZXkpO1xuICAgIH1cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uX2RpY3Rpb25hcnkuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKCFlbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihuZXcgR3JvdXBpbmcoY3VycmVudC5rZXksIGN1cnJlbnQudmFsdWUpKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIE9yZGVyZWRFbnVtZXJhYmxlIGV4dGVuZHMgRmluaXRlRW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlLCBrZXlTZWxlY3Rvciwgb3JkZXIsIHBhcmVudCwgY29tcGFyZXIgPSBjb21wYXJlVmFsdWVzKSB7XG4gICAgICAgIHN1cGVyKE5VTEwpO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgdGhpcy5rZXlTZWxlY3RvciA9IGtleVNlbGVjdG9yO1xuICAgICAgICB0aGlzLm9yZGVyID0gb3JkZXI7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLmNvbXBhcmVyID0gY29tcGFyZXI7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKHNvdXJjZSAmJiBzb3VyY2UuaXNFbmRsZXNzKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiT3JkZXJlZEVudW1lcmFibGVcIjtcbiAgICB9XG4gICAgY3JlYXRlT3JkZXJlZEVudW1lcmFibGUoa2V5U2VsZWN0b3IsIG9yZGVyKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcy5zb3VyY2UsIGtleVNlbGVjdG9yLCBvcmRlciwgdGhpcyk7XG4gICAgfVxuICAgIHRoZW5CeShrZXlTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVPcmRlcmVkRW51bWVyYWJsZShrZXlTZWxlY3RvciwgMSAvKiBBc2NlbmRpbmcgKi8pO1xuICAgIH1cbiAgICB0aGVuVXNpbmcoY29tcGFyaXNvbikge1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMuc291cmNlLCBudWxsLCAxIC8qIEFzY2VuZGluZyAqLywgdGhpcywgY29tcGFyaXNvbik7XG4gICAgfVxuICAgIHRoZW5CeURlc2NlbmRpbmcoa2V5U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlT3JkZXJlZEVudW1lcmFibGUoa2V5U2VsZWN0b3IsIC0xIC8qIERlc2NlbmRpbmcgKi8pO1xuICAgIH1cbiAgICB0aGVuVXNpbmdSZXZlcnNlZChjb21wYXJpc29uKSB7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcy5zb3VyY2UsIG51bGwsIC0xIC8qIERlc2NlbmRpbmcgKi8sIHRoaXMsIGNvbXBhcmlzb24pO1xuICAgIH1cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IGJ1ZmZlcjtcbiAgICAgICAgbGV0IGluZGV4ZXM7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIGJ1ZmZlciA9IEVudW1lcmFibGUudG9BcnJheShfLnNvdXJjZSk7XG4gICAgICAgICAgICBpbmRleGVzID0gY3JlYXRlU29ydENvbnRleHQoXylcbiAgICAgICAgICAgICAgICAuZ2VuZXJhdGVTb3J0ZWRJbmRleGVzKGJ1ZmZlcik7XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIChpbmRleCA8IGluZGV4ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihidWZmZXJbaW5kZXhlc1tpbmRleCsrXV0pXG4gICAgICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGJ1ZmZlciA9IE5VTEw7XG4gICAgICAgICAgICBpZiAoaW5kZXhlcylcbiAgICAgICAgICAgICAgICBpbmRleGVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBpbmRleGVzID0gTlVMTDtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBfLnNvdXJjZSA9IE5VTEw7XG4gICAgICAgIF8ua2V5U2VsZWN0b3IgPSBOVUxMO1xuICAgICAgICBfLm9yZGVyID0gTlVMTDtcbiAgICAgICAgXy5wYXJlbnQgPSBOVUxMO1xuICAgIH1cbn1cbi8vIEEgcHJpdmF0ZSBzdGF0aWMgaGVscGVyIGZvciB0aGUgd2VhdmUgZnVuY3Rpb24uXG5mdW5jdGlvbiBuZXh0RW51bWVyYXRvcihxdWV1ZSwgZSkge1xuICAgIGlmIChlKSB7XG4gICAgICAgIGlmIChlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIHF1ZXVlLmVucXVldWUoZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZSlcbiAgICAgICAgICAgICAgICBlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlO1xufVxuLyoqXG4gKiBSZWN1cnNpdmVseSBidWlsZHMgYSBTb3J0Q29udGV4dCBjaGFpbi5cbiAqIEBwYXJhbSBvcmRlcmVkRW51bWVyYWJsZVxuICogQHBhcmFtIGN1cnJlbnRDb250ZXh0XG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBjcmVhdGVTb3J0Q29udGV4dChvcmRlcmVkRW51bWVyYWJsZSwgY3VycmVudENvbnRleHQgPSBudWxsKSB7XG4gICAgY29uc3QgY29udGV4dCA9IG5ldyBLZXlTb3J0ZWRDb250ZXh0KGN1cnJlbnRDb250ZXh0LCBvcmRlcmVkRW51bWVyYWJsZS5rZXlTZWxlY3Rvciwgb3JkZXJlZEVudW1lcmFibGUub3JkZXIsIG9yZGVyZWRFbnVtZXJhYmxlLmNvbXBhcmVyKTtcbiAgICBpZiAob3JkZXJlZEVudW1lcmFibGUucGFyZW50KVxuICAgICAgICByZXR1cm4gY3JlYXRlU29ydENvbnRleHQob3JkZXJlZEVudW1lcmFibGUucGFyZW50LCBjb250ZXh0KTtcbiAgICByZXR1cm4gY29udGV4dDtcbn1cbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5mdW5jdGlvbiB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpIHtcbiAgICBpZiAoZGlzcG9zZWQpXG4gICAgICAgIHRocm93IG5ldyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbihcIkVudW1lcmFibGVcIik7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnQgZnVuY3Rpb24gRW51bWVyYWJsZShzb3VyY2UsIC4uLmFkZGl0aW9uYWwpIHtcbiAgICByZXR1cm4gZW51bWVyYWJsZUZyb20oc291cmNlLCBhZGRpdGlvbmFsKTtcbn1cbmZ1bmN0aW9uIGVudW1lcmFibGVGcm9tKHNvdXJjZSwgYWRkaXRpb25hbCkge1xuICAgIGxldCBlID0gRW51bWVyYWJsZS5mcm9tQW55KHNvdXJjZSk7XG4gICAgaWYgKCFlKVxuICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKCk7XG4gICAgcmV0dXJuIChhZGRpdGlvbmFsICYmIGFkZGl0aW9uYWwubGVuZ3RoKVxuICAgICAgICA/IGUubWVyZ2UoYWRkaXRpb25hbClcbiAgICAgICAgOiBlO1xufVxuKGZ1bmN0aW9uIChFbnVtZXJhYmxlKSB7XG4gICAgZnVuY3Rpb24gZnJvbShzb3VyY2UsIC4uLmFkZGl0aW9uYWwpIHtcbiAgICAgICAgcmV0dXJuIGVudW1lcmFibGVGcm9tKHNvdXJjZSwgYWRkaXRpb25hbCk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZnJvbSA9IGZyb207XG4gICAgZnVuY3Rpb24gZnJvbUFueShzb3VyY2UsIGRlZmF1bHRFbnVtZXJhYmxlKSB7XG4gICAgICAgIGlmIChUeXBlLmlzT2JqZWN0KHNvdXJjZSkgfHwgVHlwZS5pc1N0cmluZyhzb3VyY2UpKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgSW5maW5pdGVMaW5xRW51bWVyYWJsZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgICAgICAgaWYgKFR5cGUuaXNBcnJheUxpa2Uoc291cmNlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5RW51bWVyYWJsZShzb3VyY2UpO1xuICAgICAgICAgICAgaWYgKGlzRW51bWVyYWJsZShzb3VyY2UpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gc291cmNlLmdldEVudW1lcmF0b3IoKSwgbnVsbCwgc291cmNlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICBpZiAoaXNFbnVtZXJhdG9yKHNvdXJjZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBzb3VyY2UsIG51bGwsIHNvdXJjZS5pc0VuZGxlc3MpO1xuICAgICAgICAgICAgaWYgKGlzSXRlcmF0b3Ioc291cmNlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbUFueShuZXcgSXRlcmF0b3JFbnVtZXJhdG9yKHNvdXJjZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFR5cGUuaXNGdW5jdGlvbihzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4gbmV3IEluZmluaXRlRW51bWVyYXRvcihzb3VyY2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmYXVsdEVudW1lcmFibGU7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZnJvbUFueSA9IGZyb21Bbnk7XG4gICAgZnVuY3Rpb24gZnJvbVRoZXNlKHNvdXJjZXMpIHtcbiAgICAgICAgc3dpdGNoIChzb3VyY2VzID8gc291cmNlcy5sZW5ndGggOiAwKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgLy8gQWxsb3cgZm9yIHZhbGlkYXRpb24gYW5kIHRocm93aW5nLi4uXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudW1lcmFibGVGcm9tKHNvdXJjZXNbMF0pO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHkoKS5tZXJnZShzb3VyY2VzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZyb21UaGVzZSA9IGZyb21UaGVzZTtcbiAgICBmdW5jdGlvbiBmcm9tT3JFbXB0eShzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIGZyb21Bbnkoc291cmNlKSB8fCBlbXB0eSgpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZyb21PckVtcHR5ID0gZnJvbU9yRW1wdHk7XG4gICAgLyoqXG4gICAgICogU3RhdGljIGhlbHBlciBmb3IgY29udmVydGluZyBlbnVtZXJhYmxlcyB0byBhbiBhcnJheS5cbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b0FycmF5KHNvdXJjZSkge1xuICAgICAgICAvLyBub2luc3BlY3Rpb24gU3VzcGljaW91c0luc3RhbmNlT2ZHdWFyZFxuICAgICAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgTGlucUVudW1lcmFibGUpXG4gICAgICAgICAgICByZXR1cm4gc291cmNlLnRvQXJyYXkoKTtcbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLnRvQXJyYXkoc291cmNlKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS50b0FycmF5ID0gdG9BcnJheTtcbiAgICBmdW5jdGlvbiBfY2hvaWNlKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4gbmV3IEVudW1lcmF0b3JCYXNlKG51bGwsICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXZhbHVlcyk7XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihSYW5kb20uc2VsZWN0Lm9uZSh2YWx1ZXMpKTtcbiAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICApLCAoKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHZhbHVlcyA9IE5VTEw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLl9jaG9pY2UgPSBfY2hvaWNlO1xuICAgIGZ1bmN0aW9uIGNob2ljZSh2YWx1ZXMpIHtcbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoO1xuICAgICAgICAvLyBXZSBjb3VsZCByZXR1cm4gZW1wdHkgaWYgbm8gbGVuZ3RoLCBidXQgdGhhdCB3b3VsZCBicmVhayB0aGUgdHlwaW5nIGFuZCBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAgICAgICAgLy8gRW5mb3JjaW5nIHRoYXQgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAxIGNob2ljZSBpcyBrZXkuXG4gICAgICAgIGlmICghbGVuIHx8ICFpc0Zpbml0ZShsZW4pKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbGVuZ3RoJywgbGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIF9jaG9pY2UoY29weSh2YWx1ZXMpKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5jaG9pY2UgPSBjaG9pY2U7XG4gICAgZnVuY3Rpb24gY2hvb3NlRnJvbSguLi5hcmdzKSB7XG4gICAgICAgIC8vIFdlIGNvdWxkIHJldHVybiBlbXB0eSBpZiBubyBsZW5ndGgsIGJ1dCB0aGF0IHdvdWxkIGJyZWFrIHRoZSB0eXBpbmcgYW5kIHByb2R1Y2UgdW5leHBlY3RlZCByZXN1bHRzLlxuICAgICAgICAvLyBFbmZvcmNpbmcgdGhhdCB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IDEgY2hvaWNlIGlzIGtleS5cbiAgICAgICAgaWYgKCFhcmdzLmxlbmd0aClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2xlbmd0aCcsIGxlbmd0aCk7XG4gICAgICAgIHJldHVybiBfY2hvaWNlKGFyZ3MpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmNob29zZUZyb20gPSBjaG9vc2VGcm9tO1xuICAgIGZ1bmN0aW9uIF9jeWNsZSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9LCAvLyBSZWluaXRpYWxpemUgdGhlIHZhbHVlIGp1c3QgaW4gY2FzZSB0aGUgZW51bWVyYXRvciBpcyByZXN0YXJ0ZWQuXG4gICAgICAgICAgICAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghdmFsdWVzKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gdmFsdWVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlc1tpbmRleCsrXSk7XG4gICAgICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICApO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHZhbHVlcyA9IE5VTEw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjeWNsZSh2YWx1ZXMpIHtcbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoO1xuICAgICAgICAvLyBXZSBjb3VsZCByZXR1cm4gZW1wdHkgaWYgbm8gbGVuZ3RoLCBidXQgdGhhdCB3b3VsZCBicmVhayB0aGUgdHlwaW5nIGFuZCBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAgICAgICAgLy8gRW5mb3JjaW5nIHRoYXQgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAxIGNob2ljZSBpcyBrZXkuXG4gICAgICAgIGlmICghbGVuIHx8ICFpc0Zpbml0ZShsZW4pKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbGVuZ3RoJywgbGVuZ3RoKTtcbiAgICAgICAgLy8gTWFrZSBhIGNvcHkgdG8gYXZvaWQgbW9kaWZ5aW5nIHRoZSBjb2xsZWN0aW9uIGFzIHdlIGdvLlxuICAgICAgICByZXR1cm4gX2N5Y2xlKGNvcHkodmFsdWVzKSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuY3ljbGUgPSBjeWNsZTtcbiAgICBmdW5jdGlvbiBjeWNsZVRocm91Z2goLi4uYXJncykge1xuICAgICAgICAvLyBXZSBjb3VsZCByZXR1cm4gZW1wdHkgaWYgbm8gbGVuZ3RoLCBidXQgdGhhdCB3b3VsZCBicmVhayB0aGUgdHlwaW5nIGFuZCBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAgICAgICAgLy8gRW5mb3JjaW5nIHRoYXQgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAxIGNob2ljZSBpcyBrZXkuXG4gICAgICAgIGlmICghYXJncy5sZW5ndGgpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdsZW5ndGgnLCBsZW5ndGgpO1xuICAgICAgICByZXR1cm4gX2N5Y2xlKGFyZ3MpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmN5Y2xlVGhyb3VnaCA9IGN5Y2xlVGhyb3VnaDtcbiAgICBmdW5jdGlvbiBlbXB0eSgpIHtcbiAgICAgICAgLy8gQ291bGQgYmUgc2luZ2xlIGV4cG9ydCBmdW5jdGlvbiBpbnN0YW5jZSwgYnV0IGZvciBzYWZldHksIHdlJ2xsIG1ha2UgYSBuZXcgb25lLlxuICAgICAgICByZXR1cm4gbmV3IEZpbml0ZUVudW1lcmFibGUoZ2V0RW1wdHlFbnVtZXJhdG9yKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5lbXB0eSA9IGVtcHR5O1xuICAgIGZ1bmN0aW9uIHJlcGVhdChlbGVtZW50LCBjb3VudCA9IEluZmluaXR5KSB7XG4gICAgICAgIGlmICghKGNvdW50ID4gMCkpXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICByZXR1cm4gaXNGaW5pdGUoY291bnQpICYmIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpXG4gICAgICAgICAgICA/IG5ldyBGaW5pdGVFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYyA9IGNvdW50O1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7IGluZGV4ID0gMDsgfSwgKHlpZWxkZXIpID0+IChpbmRleCsrIDwgYykgJiYgeWllbGRlci55aWVsZFJldHVybihlbGVtZW50KSwgbnVsbCwgZmFsc2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IG5ldyBFbnVtZXJhdG9yQmFzZShudWxsLCAoeWllbGRlcikgPT4geWllbGRlci55aWVsZFJldHVybihlbGVtZW50KSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUucmVwZWF0ID0gcmVwZWF0O1xuICAgIGZ1bmN0aW9uIHJlcGVhdFdpdGhGaW5hbGl6ZShpbml0aWFsaXplciwgZmluYWxpemVyKSB7XG4gICAgICAgIGlmICghaW5pdGlhbGl6ZXIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiaW5pdGlhbGl6ZXJcIik7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpbml0aWFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGluaXRpYWxpemVyKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbml0aWFsaXplclxuICAgICAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgOiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gTlVMTDtcbiAgICAgICAgICAgICAgICBpZiAoZmluYWxpemVyKVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGl6ZXIoZWxlbWVudCk7XG4gICAgICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICApO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpbml0aWFsaXplciA9IE5VTEw7XG4gICAgICAgICAgICBmaW5hbGl6ZXIgPSBWT0lEMDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUucmVwZWF0V2l0aEZpbmFsaXplID0gcmVwZWF0V2l0aEZpbmFsaXplO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZW51bWVyYWJsZSBvZiBvbmUgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAqIEByZXR1cm5zIHtGaW5pdGVFbnVtZXJhYmxlPFQ+fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1ha2UoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gcmVwZWF0KGVsZW1lbnQsIDEpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1ha2UgPSBtYWtlO1xuICAgIC8vIHN0YXJ0IGFuZCBzdGVwIGNhbiBiZSBvdGhlciB0aGFuIGludGVnZXIuXG4gICAgZnVuY3Rpb24gcmFuZ2Uoc3RhcnQsIGNvdW50LCBzdGVwID0gMSkge1xuICAgICAgICBpZiAoIWlzRmluaXRlKHN0YXJ0KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGFydFwiLCBzdGFydCwgXCJNdXN0IGJlIGEgZmluaXRlIG51bWJlci5cIik7XG4gICAgICAgIGlmICghKGNvdW50ID4gMCkpXG4gICAgICAgICAgICByZXR1cm4gZW1wdHkoKTtcbiAgICAgICAgaWYgKCFzdGVwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgdmFsaWQgdmFsdWVcIik7XG4gICAgICAgIGlmICghaXNGaW5pdGUoc3RlcCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIik7XG4gICAgICAgIHJldHVybiBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICBsZXQgYyA9IGNvdW50OyAvLyBGb3JjZSBpbnRlZ2VyIGV2YWx1YXRpb24uXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc3RhcnQ7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBpbmRleCsrIDwgY1xuICAgICAgICAgICAgICAgICAgICAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIGluZGV4IDwgY291bnQpXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUucmFuZ2UgPSByYW5nZTtcbiAgICBmdW5jdGlvbiByYW5nZURvd24oc3RhcnQsIGNvdW50LCBzdGVwID0gMSkge1xuICAgICAgICBzdGVwID0gTWF0aC5hYnMoc3RlcCkgKiAtMTtcbiAgICAgICAgcmV0dXJuIHJhbmdlKHN0YXJ0LCBjb3VudCwgc3RlcCk7XG4gICAgfVxuICAgIEVudW1lcmFibGUucmFuZ2VEb3duID0gcmFuZ2VEb3duO1xuICAgIC8vIHN0ZXAgPSAtMSBiZWhhdmVzIHRoZSBzYW1lIGFzIHRvTmVnYXRpdmVJbmZpbml0eTtcbiAgICBmdW5jdGlvbiB0b0luZmluaXR5KHN0YXJ0ID0gMCwgc3RlcCA9IDEpIHtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShzdGFydCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RhcnRcIiwgc3RhcnQsIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICBpZiAoIXN0ZXApXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSB2YWxpZCB2YWx1ZVwiKTtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShzdGVwKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGVwXCIsIHN0ZXAsIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzdGFydDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBzdGVwO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUudG9JbmZpbml0eSA9IHRvSW5maW5pdHk7XG4gICAgZnVuY3Rpb24gdG9OZWdhdGl2ZUluZmluaXR5KHN0YXJ0ID0gMCwgc3RlcCA9IDEpIHtcbiAgICAgICAgcmV0dXJuIHRvSW5maW5pdHkoc3RhcnQsIC1zdGVwKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS50b05lZ2F0aXZlSW5maW5pdHkgPSB0b05lZ2F0aXZlSW5maW5pdHk7XG4gICAgZnVuY3Rpb24gcmFuZ2VUbyhzdGFydCwgdG8sIHN0ZXAgPSAxKSB7XG4gICAgICAgIGlmIChpc05hTih0bykgfHwgIWlzRmluaXRlKHRvKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJ0b1wiLCB0bywgXCJNdXN0IGJlIGEgZmluaXRlIG51bWJlci5cIik7XG4gICAgICAgIGlmIChzdGVwICYmICFpc0Zpbml0ZShzdGVwKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGVwXCIsIHN0ZXAsIFwiTXVzdCBiZSBhIGZpbml0ZSBub24temVybyBudW1iZXIuXCIpO1xuICAgICAgICAvLyBUaGlzIHdheSB3ZSBhZGp1c3QgZm9yIHRoZSBkZWx0YSBmcm9tIHN0YXJ0IGFuZCB0byBzbyB0aGUgdXNlciBjYW4gc2F5ICsvLSBzdGVwIGFuZCBpdCB3aWxsIHdvcmsgYXMgZXhwZWN0ZWQuXG4gICAgICAgIHN0ZXAgPSBNYXRoLmFicyhzdGVwKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGaW5pdGVFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4geyB2YWx1ZSA9IHN0YXJ0OyB9LCBzdGFydCA8IHRvXG4gICAgICAgICAgICAgICAgPyB5aWVsZGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlIDw9IHRvICYmIHlpZWxkZXIueWllbGRSZXR1cm4odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiB5aWVsZGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlID49IHRvICYmIHlpZWxkZXIueWllbGRSZXR1cm4odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgLT0gc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJhbmdlVG8gPSByYW5nZVRvO1xuICAgIGZ1bmN0aW9uIG1hdGNoZXMoaW5wdXQsIHBhdHRlcm4sIGZsYWdzID0gXCJcIikge1xuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJpbnB1dFwiKTtcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBpbnB1dDtcbiAgICAgICAgaWYgKHR5cGUgIT0gVHlwZS5TVFJJTkcpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZXhlYyBSZWdFeHAgbWF0Y2hlcyBvZiB0eXBlICdcIiArIHR5cGUgKyBcIicuXCIpO1xuICAgICAgICBpZiAocGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgZmxhZ3MgKz0gKHBhdHRlcm4uaWdub3JlQ2FzZSkgPyBcImlcIiA6IFwiXCI7XG4gICAgICAgICAgICBmbGFncyArPSAocGF0dGVybi5tdWx0aWxpbmUpID8gXCJtXCIgOiBcIlwiO1xuICAgICAgICAgICAgcGF0dGVybiA9IHBhdHRlcm4uc291cmNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmbGFncy5pbmRleE9mKFwiZ1wiKSA9PT0gLTEpXG4gICAgICAgICAgICBmbGFncyArPSBcImdcIjtcbiAgICAgICAgcmV0dXJuIG5ldyBGaW5pdGVFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCByZWdleDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBmbGFncyk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIENhbGxpbmcgcmVnZXguZXhlYyBjb25zZWN1dGl2ZWx5IG9uIHRoZSBzYW1lIGlucHV0IHVzZXMgdGhlIGxhc3RJbmRleCB0byBzdGFydCB0aGUgbmV4dCBtYXRjaC5cbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKGlucHV0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2ggIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4obWF0Y2gpXG4gICAgICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUubWF0Y2hlcyA9IG1hdGNoZXM7XG4gICAgZnVuY3Rpb24gZ2VuZXJhdGUoZmFjdG9yeSwgY291bnQgPSBJbmZpbml0eSkge1xuICAgICAgICBpZiAoIWZhY3RvcnkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiZmFjdG9yeVwiKTtcbiAgICAgICAgaWYgKGlzTmFOKGNvdW50KSB8fCBjb3VudCA8PSAwKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKGNvdW50KSAmJiBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKVxuICAgICAgICAgICAgPyBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjb3VudDtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBpbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudCA8IGMgJiYgeWllbGRlci55aWVsZFJldHVybihmYWN0b3J5KGN1cnJlbnQpKTtcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmFjdG9yeSA9IE5VTEw7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGZhY3RvcnkoaW5kZXgrKykpO1xuICAgICAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZhY3RvcnkgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbiAgICBsZXQgcmFuZG9tO1xuICAgIChmdW5jdGlvbiAocmFuZG9tKSB7XG4gICAgICAgIGZ1bmN0aW9uIGZsb2F0cyhtYXhFeGNsdXNpdmUgPSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGUoUmFuZG9tLmdlbmVyYXRlKG1heEV4Y2x1c2l2ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJhbmRvbS5mbG9hdHMgPSBmbG9hdHM7XG4gICAgICAgIGZ1bmN0aW9uIGludGVnZXJzKGJvdW5kYXJ5LCBpbmNsdXNpdmUpIHtcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZShSYW5kb20uZ2VuZXJhdGUuaW50ZWdlcnMoYm91bmRhcnksIGluY2x1c2l2ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJhbmRvbS5pbnRlZ2VycyA9IGludGVnZXJzO1xuICAgIH0pKHJhbmRvbSA9IEVudW1lcmFibGUucmFuZG9tIHx8IChFbnVtZXJhYmxlLnJhbmRvbSA9IHt9KSk7XG4gICAgZnVuY3Rpb24gdW5mb2xkKHNlZWQsIHZhbHVlRmFjdG9yeSwgc2tpcFNlZWQgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXZhbHVlRmFjdG9yeSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJmYWN0b3J5XCIpO1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc2VlZDtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gIXNraXBTZWVkO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXZhbHVlRmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgbGV0IGkgPSBpbmRleCsrO1xuICAgICAgICAgICAgICAgIGlmIChpc0ZpcnN0KVxuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlRmFjdG9yeSh2YWx1ZSwgaSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4odmFsdWUpO1xuICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdmFsdWVGYWN0b3J5ID0gTlVMTDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUudW5mb2xkID0gdW5mb2xkO1xuICAgIGZ1bmN0aW9uIGZvckVhY2goZW51bWVyYWJsZSwgYWN0aW9uLCBtYXggPSBJbmZpbml0eSkge1xuICAgICAgICAvLyBXaWxsIHByb3Blcmx5IGRpc3Bvc2UgY3JlYXRlZCBlbnVtZXJhYmxlLlxuICAgICAgICAvLyBXaWxsIHRocm93IGlmIGVudW1lcmFibGUgaXMgZW5kbGVzcy5cbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLmZvckVhY2goZW51bWVyYWJsZSwgYWN0aW9uLCBtYXgpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZvckVhY2ggPSBmb3JFYWNoO1xuICAgIGZ1bmN0aW9uIG1hcChlbnVtZXJhYmxlLCBzZWxlY3Rvcikge1xuICAgICAgICAvLyBXaWxsIHByb3Blcmx5IGRpc3Bvc2UgY3JlYXRlZCBlbnVtZXJhYmxlLlxuICAgICAgICAvLyBXaWxsIHRocm93IGlmIGVudW1lcmFibGUgaXMgZW5kbGVzcy5cbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLm1hcChlbnVtZXJhYmxlLCBzZWxlY3Rvcik7XG4gICAgfVxuICAgIEVudW1lcmFibGUubWFwID0gbWFwO1xuICAgIC8vIFNsaWdodGx5IG9wdGltaXplZCB2ZXJzaW9ucyBmb3IgbnVtYmVycy5cbiAgICBmdW5jdGlvbiBtYXgodmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IHYgPSB2YWx1ZXNcbiAgICAgICAgICAgIC50YWtlVW50aWwodiA9PiB2ID09ICtJbmZpbml0eSwgdHJ1ZSlcbiAgICAgICAgICAgIC5hZ2dyZWdhdGUoRnVuY3Rpb25zLkdyZWF0ZXIpO1xuICAgICAgICByZXR1cm4gdiA9PT0gVk9JRDAgPyBOYU4gOiB2O1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1heCA9IG1heDtcbiAgICBmdW5jdGlvbiBtaW4odmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IHYgPSB2YWx1ZXNcbiAgICAgICAgICAgIC50YWtlVW50aWwodiA9PiB2ID09IC1JbmZpbml0eSwgdHJ1ZSlcbiAgICAgICAgICAgIC5hZ2dyZWdhdGUoRnVuY3Rpb25zLkxlc3Nlcik7XG4gICAgICAgIHJldHVybiB2ID09PSBWT0lEMCA/IE5hTiA6IHY7XG4gICAgfVxuICAgIEVudW1lcmFibGUubWluID0gbWluO1xuICAgIC8qKlxuICAgICAqIFRha2VzIGFueSBzZXQgb2YgY29sbGVjdGlvbnMgb2YgdGhlIHNhbWUgdHlwZSBhbmQgd2VhdmVzIHRoZW0gdG9nZXRoZXIuXG4gICAgICogQHBhcmFtIGVudW1lcmFibGVzXG4gICAgICogQHJldHVybnMge0VudW1lcmFibGU8VD59XG4gICAgICovXG4gICAgZnVuY3Rpb24gd2VhdmUoZW51bWVyYWJsZXMpIHtcbiAgICAgICAgaWYgKCFlbnVtZXJhYmxlcylcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2VudW1lcmFibGVzJyk7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBxdWV1ZTtcbiAgICAgICAgICAgIGxldCBtYWluRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gbmV3IFF1ZXVlKCk7XG4gICAgICAgICAgICAgICAgbWFpbkVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKGVudW1lcmFibGVzKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBsZXQgZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy8gRmlyc3QgcGFzcy4uLlxuICAgICAgICAgICAgICAgIGlmIChtYWluRW51bWVyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWUgJiYgbWFpbkVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSBtYWluRW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgZSA9IG5leHRFbnVtZXJhdG9yKHF1ZXVlLCBjID8gZW51bVV0aWwuZnJvbShjKSA6IE5VTEwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5FbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKCFlICYmIHF1ZXVlLnRyeURlcXVldWUodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlID0gbmV4dEVudW1lcmF0b3IocXVldWUsIGVudW1VdGlsLmZyb20odmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9KSkgeyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVcbiAgICAgICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKGUuY3VycmVudClcbiAgICAgICAgICAgICAgICAgICAgOiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcG9zZS50aGVzZS5ub0NvcHkocXVldWUuZHVtcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSBOVUxMO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWFpbkVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIG1haW5FbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBtYWluRW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS53ZWF2ZSA9IHdlYXZlO1xufSkoRW51bWVyYWJsZSB8fCAoRW51bWVyYWJsZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBFbnVtZXJhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlucS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtLkxpbnEvTGlucS5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgKiBhcyBWYWx1ZXMgZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbi8qICB2YWxpZGF0ZVNpemU6IFV0aWxpdHkgZm9yIHF1aWNrIHZhbGlkYXRpb24vaW52YWxpZGF0aW9uIG9mIGFycmF5IGVxdWFsaXR5LlxuICAgIFdoeSB0aGlzIHdheT8gIFdoeSBub3QgcGFzcyBhIGNsb3N1cmUgZm9yIHRoZSBsYXN0IHJldHVybj9cbiAgICBSZWFzb246IFBlcmZvcm1hbmNlIGFuZCBhdm9pZGluZyB0aGUgY3JlYXRpb24gb2YgbmV3IGZ1bmN0aW9ucy9jbG9zdXJlcy4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlU2l6ZShhLCBiKSB7XG4gICAgLy8gQm90aCB2YWxpZCBhbmQgYXJlIHNhbWUgb2JqZWN0LCBvciBib3RoIGFyZSBudWxsL3VuZGVmaW5lZC5cbiAgICBpZiAoYSAmJiBiICYmIGEgPT09IGIgfHwgIWEgJiYgIWIpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vIEF0IHRoaXMgcG9pbnQsIGF0IGxlYXN0IG9uZSBoYXMgdG8gYmUgbm9uLW51bGwuXG4gICAgaWYgKCFhIHx8ICFiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgbGVuID0gYS5sZW5ndGg7XG4gICAgaWYgKGxlbiAhPT0gYi5sZW5ndGgpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAvLyBJZiBib3RoIGFyZSBhcnJheXMgYW5kIGhhdmUgemVybyBsZW5ndGgsIHRoZXkgYXJlIGVxdWFsLlxuICAgIGlmIChsZW4gPT09IDApXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vIFJldHVybiB0aGUgbGVuZ3RoIGZvciBkb3duc3RyZWFtIHByb2Nlc3NpbmcuXG4gICAgcmV0dXJuIGxlbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcmVBbGxFcXVhbChhcnJheXMsIHN0cmljdCA9IHRydWUsIGVxdWFsaXR5Q29tcGFyZXIgPSBWYWx1ZXMuYXJlRXF1YWwpIHtcbiAgICBpZiAoIWFycmF5cylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnROdWxsRXhjZXB0aW9uOiAnYXJyYXlzJyBjYW5ub3QgYmUgbnVsbC5cIik7XG4gICAgaWYgKGFycmF5cy5sZW5ndGggPCAyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY29tcGFyZSBhIHNldCBvZiBhcnJheXMgbGVzcyB0aGFuIDIuXCIpO1xuICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oc3RyaWN0KSkge1xuICAgICAgICBlcXVhbGl0eUNvbXBhcmVyID0gc3RyaWN0O1xuICAgICAgICBzdHJpY3QgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBmaXJzdCA9IGFycmF5c1swXTtcbiAgICBmb3IgKGxldCBpID0gMSwgbCA9IGFycmF5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKCFhcmVFcXVhbChmaXJzdCwgYXJyYXlzW2ldLCBzdHJpY3QsIGVxdWFsaXR5Q29tcGFyZXIpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcmVFcXVhbChhLCBiLCBzdHJpY3QgPSB0cnVlLCBlcXVhbGl0eUNvbXBhcmVyID0gVmFsdWVzLmFyZUVxdWFsKSB7XG4gICAgY29uc3QgbGVuID0gdmFsaWRhdGVTaXplKGEsIGIpO1xuICAgIGlmIChUeXBlLmlzQm9vbGVhbihsZW4pKVxuICAgICAgICByZXR1cm4gbGVuO1xuICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oc3RyaWN0KSkge1xuICAgICAgICBlcXVhbGl0eUNvbXBhcmVyID0gc3RyaWN0O1xuICAgICAgICBzdHJpY3QgPSB0cnVlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICghZXF1YWxpdHlDb21wYXJlcihhW2ldLCBiW2ldLCBzdHJpY3QpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGludGVybmFsU29ydChhLCBjb21wYXJlcikge1xuICAgIGlmICghYSB8fCBhLmxlbmd0aCA8IDIpXG4gICAgICAgIHJldHVybiBhO1xuICAgIGNvbnN0IGxlbiA9IGEubGVuZ3RoO1xuICAgIGxldCBiO1xuICAgIGlmIChsZW4gPiA2NTUzNilcbiAgICAgICAgYiA9IG5ldyBBcnJheShsZW4pO1xuICAgIGVsc2Uge1xuICAgICAgICBiID0gW107XG4gICAgICAgIGIubGVuZ3RoID0gbGVuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGJbaV0gPSBhW2ldO1xuICAgIH1cbiAgICBiLnNvcnQoY29tcGFyZXIpO1xuICAgIHJldHVybiBiO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFyZUVxdWl2YWxlbnQoYSwgYiwgY29tcGFyZXIgPSBWYWx1ZXMuY29tcGFyZSkge1xuICAgIGNvbnN0IGxlbiA9IHZhbGlkYXRlU2l6ZShhLCBiKTtcbiAgICBpZiAoVHlwZS5pc0Jvb2xlYW4obGVuKSlcbiAgICAgICAgcmV0dXJuIGxlbjtcbiAgICAvLyBUaGVyZSBtaWdodCBiZSBhIGJldHRlciBtb3JlIHBlcmZvcm1hbnQgd2F5IHRvIGRvIHRoaXMsIGJ1dCBmb3IgdGhlIG1vbWVudCwgdGhpc1xuICAgIC8vIHdvcmtzIHF1aXRlIHdlbGwuXG4gICAgYSA9IGludGVybmFsU29ydChhLCBjb21wYXJlcik7XG4gICAgYiA9IGludGVybmFsU29ydChiLCBjb21wYXJlcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoY29tcGFyZXIoYVtpXSwgYltpXSkgIT09IDApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tcGFyZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L0NvbXBhcmUuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmltcG9ydC1uYW1lXG5pbXBvcnQgeyBTdHJpbmdOb2RlIH0gZnJvbSAnLi9TdHJpbmdOb2RlJztcbmltcG9ydCAnLi9TdHJpbmdFeHRlbnNpb24nO1xuXG5leHBvcnQge1xuICBTdHJpbmdOb2RlLFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsImltcG9ydCB7IE5hbWVkTm9kZSB9IGZyb20gJy4vTmFtZWROb2RlJztcbmV4cG9ydCBjbGFzcyBTdHJpbmdOb2RlIGV4dGVuZHMgTmFtZWROb2RlPFN0cmluZ05vZGUsIHN0cmluZz4ge1xuXG4gIHB1YmxpYyBnZXQgVmFsdWUoKTpzdHJpbmcge1xuICAgIHJldHVybiBzdXBlci5nZXRWYWx1ZSgpO1xuICB9XG4gIHB1YmxpYyBzZXQgVmFsdWUodmFsdWU6c3RyaW5nKSB7XG4gICAgc3VwZXIuc2V0VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG5vZGU6IHN0cmluZykge1xuICAgIHN1cGVyKG5vZGUpO1xuICB9XG5cbiAgcHVibGljIEFkZEZpcnN0KHZhbHVlOnN0cmluZyB8IFN0cmluZ05vZGUpOlN0cmluZ05vZGUge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gc3VwZXIuQWRkRmlyc3QobmV3IFN0cmluZ05vZGUodmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLkFkZEZpcnN0KHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBBZGRMYXN0KHZhbHVlOnN0cmluZyB8IFN0cmluZ05vZGUpOlN0cmluZ05vZGUge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gc3VwZXIuQWRkTGFzdChuZXcgU3RyaW5nTm9kZSh2YWx1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gc3VwZXIuQWRkTGFzdCh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgQWRkTmV4dCh2YWx1ZTpzdHJpbmcgfCBTdHJpbmdOb2RlKTpTdHJpbmdOb2RlIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHN1cGVyLkFkZE5leHQobmV3IFN0cmluZ05vZGUodmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLkFkZE5leHQodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIEFkZFByZXZpb3VzKHZhbHVlOnN0cmluZyB8IFN0cmluZ05vZGUpOlN0cmluZ05vZGUge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gc3VwZXIuQWRkUHJldmlvdXMobmV3IFN0cmluZ05vZGUodmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLkFkZFByZXZpb3VzKHZhbHVlKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1N0cmluZ05vZGUudHMiLCIvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6aW1wb3J0LW5hbWVcbmltcG9ydCBFbnVtZXJhYmxlIGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9MaW5xJztcbmltcG9ydCB7IElMaW5xRW51bWVyYWJsZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9FbnVtZXJhYmxlJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUnO1xuXG5leHBvcnQgY2xhc3MgTmFtZWROb2RlPFROb2RlIGV4dGVuZHMgTmFtZWROb2RlPFROb2RlLCBUVmFsdWU+LCBUVmFsdWU+IGV4dGVuZHMgTm9kZTxUTm9kZSwgVFZhbHVlPiB7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG5vZGU/OlRWYWx1ZSkge1xuICAgIGlmIChub2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN1cGVyKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbmFtZTpzdHJpbmc7XG4gIHB1YmxpYyBnZXQgTmFtZSgpOnN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuICBwcm90ZWN0ZWQgc2V0KG5hbWU6c3RyaW5nKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIC8vICNyZWdpb24gVHJhdmVyc2FsXG5cbiAgcHVibGljIENoaWxkKG5hbWU6c3RyaW5nKTpUTm9kZSB7XG4gICAgcmV0dXJuIHN1cGVyLkNoaWxkcmVuKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpLmZpcnN0KCk7XG4gIH1cblxuICBwdWJsaWMgQW5jZXN0b3JzKG5hbWVPckluY2x1c2l2ZURlcHRoPzpzdHJpbmcgfCBudW1iZXIsIGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRGVwdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gc3VwZXIuQW5jZXN0b3JzKG5hbWVPckluY2x1c2l2ZURlcHRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLkFuY2VzdG9ycyhpbmNsdXNpdmVEZXB0aCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWVPckluY2x1c2l2ZURlcHRoKTtcbiAgfVxuXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTZWxmKG5hbWVPckluY2x1c2l2ZURlcHRoPzpzdHJpbmcgfCBudW1iZXIsIGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRGVwdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gc3VwZXIuQW5jZXN0b3JzQW5kU2VsZihuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XG4gICAgfVxuICAgIHJldHVybiBzdXBlci5BbmNlc3RvcnNBbmRTZWxmKGluY2x1c2l2ZURlcHRoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xuICB9XG5cbiAgcHVibGljIENoaWxkcmVuKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZFxuICAgID8gc3VwZXIuQ2hpbGRyZW4oKVxuICAgIDogc3VwZXIuQ2hpbGRyZW4oKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgTmV4dHNGcm9tU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWRcbiAgICA/IHN1cGVyLk5leHRzRnJvbVNlbGYoKVxuICAgIDogc3VwZXIuTmV4dHNGcm9tU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBOZXh0c0Zyb21TZWxmQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWRcbiAgICA/IHN1cGVyLk5leHRzRnJvbVNlbGZBbmRTZWxmKClcbiAgICA6IHN1cGVyLiBOZXh0c0Zyb21TZWxmQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBOZXh0c0Zyb21MYXN0KG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZFxuICAgID8gc3VwZXIuTmV4dHNGcm9tTGFzdCgpXG4gICAgOiBzdXBlci5OZXh0c0Zyb21MYXN0KCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgcHVibGljIE5leHRzRnJvbUxhc3RBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZFxuICAgID8gc3VwZXIuTmV4dHNGcm9tTGFzdEFuZFNlbGYoKVxuICAgIDogc3VwZXIuTmV4dHNGcm9tTGFzdEFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgUHJldnNGcm9tRmlyc3QobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkXG4gICAgPyBzdXBlci5QcmV2c0Zyb21GaXJzdCgpXG4gICAgOiBzdXBlci5QcmV2c0Zyb21GaXJzdCgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBQcmV2c0Zyb21GaXJzdEFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkXG4gICAgPyBzdXBlci5QcmV2c0Zyb21GaXJzdEFuZFNlbGYoKVxuICAgIDogc3VwZXIuUHJldnNGcm9tRmlyc3RBbmRTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgcHVibGljIFByZXZzRnJvbVNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkXG4gICAgPyBzdXBlci5QcmV2c0Zyb21TZWxmKClcbiAgICA6IHN1cGVyLlByZXZzRnJvbVNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgUHJldnNGcm9tU2VsZkFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkXG4gICAgPyBzdXBlci5QcmV2c0Zyb21TZWxmQW5kU2VsZigpXG4gICAgOiBzdXBlci5QcmV2c0Zyb21TZWxmQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBEZXNjZW5kYW50cyhuYW1lT3JJbmNsdXNpdmVEZXB0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICBpZiAodHlwZW9mIG5hbWVPckluY2x1c2l2ZURlcHRoICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHN1cGVyLkRlc2NlbmRhbnRzKG5hbWVPckluY2x1c2l2ZURlcHRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLkRlc2NlbmRhbnRzKGluY2x1c2l2ZURlcHRoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xuICB9XG5cbiAgcHVibGljIERlc2NlbmRhbnRzQW5kU2VsZihuYW1lT3JJbmNsdXNpdmVEZXB0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICBpZiAodHlwZW9mIG5hbWVPckluY2x1c2l2ZURlcHRoICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHN1cGVyLkRlc2NlbmRhbnRzQW5kU2VsZihuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XG4gICAgfVxuICAgIHJldHVybiBzdXBlci5EZXNjZW5kYW50c0FuZFNlbGYoaW5jbHVzaXZlRGVwdGgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XG4gIH1cblxuICBwdWJsaWMgU2libGluZ3MobmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVFYWNoTGVuZ3RoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBzdXBlci5TaWJsaW5ncyhuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLlNpYmxpbmdzKGluY2x1c2l2ZUVhY2hMZW5ndGgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoKTtcbiAgfVxuXG4gIHB1YmxpYyBTaWJsaW5nc0FuZFNlbGYobmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVFYWNoTGVuZ3RoPzpudW1iZXIpXG4gICAgOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBzdXBlci5TaWJsaW5nc0FuZFNlbGYobmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiBzdXBlci5TaWJsaW5nc0FuZFNlbGYoaW5jbHVzaXZlRWFjaExlbmd0aCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGgpO1xuICB9XG5cbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZFxuICAgID8gc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGYoKVxuICAgIDogc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGZBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZFxuICAgID8gc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGZBbmRTZWxmKClcbiAgICA6IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkXG4gICAgPyBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGYoKVxuICAgIDogc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkXG4gICAgPyBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGZBbmRTZWxmKClcbiAgICA6IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZFxuICAgID8gc3VwZXIuQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkKClcbiAgICA6IHN1cGVyLkFuY2VzdG9yc1dpdGhTaW5nbGVDaGlsZCgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBBbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGRBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZFxuICAgID8gc3VwZXIuQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkQW5kU2VsZigpXG4gICAgOiBzdXBlci5BbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGRBbmRTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgcHVibGljIERlc2NlbmRhbnRzT2ZTaW5nbGUobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkXG4gICAgPyBzdXBlci5EZXNjZW5kYW50c09mU2luZ2xlKClcbiAgICA6IHN1cGVyLkRlc2NlbmRhbnRzT2ZTaW5nbGUoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgRGVzY2VuZGFudHNPZlNpbmdsZUFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkXG4gICAgPyBzdXBlci5EZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZigpXG4gICAgOiBzdXBlci5EZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mRmlyc3RDaGlsZChuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWRcbiAgICA/IHN1cGVyLkRlc2NlbmRhbnRzT2ZGaXJzdENoaWxkKClcbiAgICA6IHN1cGVyLkRlc2NlbmRhbnRzT2ZGaXJzdENoaWxkKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgcHVibGljIERlc2NlbmRhbnRzT2ZGaXJzdENoaWxkQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWRcbiAgICA/IHN1cGVyLkRlc2NlbmRhbnRzT2ZGaXJzdENoaWxkQW5kU2VsZigpXG4gICAgOiBzdXBlci5EZXNjZW5kYW50c09mRmlyc3RDaGlsZEFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9OYW1lZE5vZGUudHMiLCIvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6aW1wb3J0LW5hbWVcbmltcG9ydCBFbnVtZXJhYmxlIGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9MaW5xJztcbmltcG9ydCB7IElMaW5xRW51bWVyYWJsZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9FbnVtZXJhYmxlJztcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3InO1xuaW1wb3J0IHsgU3RyaW5nQnVpbGRlciB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vVGV4dC9TdHJpbmdCdWlsZGVyJztcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvL1N5c3RlbS9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb24nO1xuaW1wb3J0ICcuL1N0cmluZ0V4dGVuc2lvbic7XG5leHBvcnQgY2xhc3MgTm9kZTxUTm9kZSBleHRlbmRzIE5vZGU8VE5vZGUsIFRWYWx1ZT4sIFRWYWx1ZT4ge1xuXG4gIC8vLyBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgTm9kZSBjbGFzcyB3aXRoIGEgZGVmYXVsdCB2YWx1ZS5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHZhbHVlPzogVFZhbHVlKSB7XG4gICAgdGhpcy5maXJzdENoaWxkID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5jeWNsaWNQcmV2ID0gdGhpcy5UaGlzTm9kZTtcbiAgICB0aGlzLmN5Y2xpY05leHQgPSB0aGlzLlRoaXNOb2RlO1xuICAgIHRoaXMuVmFsdWUgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlyc3RDaGlsZDpUTm9kZTtcbiAgcHJpdmF0ZSBfcGFyZW50OlROb2RlO1xuICBwcml2YXRlIF9jeWNsaWNQcmV2OlROb2RlO1xuICBwcml2YXRlIF9jeWNsaWNOZXh0OlROb2RlO1xuICBwcml2YXRlIF92YWx1ZTpUVmFsdWU7XG5cbiAgcHJpdmF0ZSBnZXQgVGhpc05vZGUoKTogVE5vZGUge1xuICAgIHJldHVybiA8VE5vZGU+PGFueT50aGlzO1xuICB9XG5cbiAgcHVibGljIGdldCBGaXJzdFNpYmxpbmcoKTpUTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuUGFyZW50ICE9IG51bGwgPyB0aGlzLlBhcmVudC5GaXJzdENoaWxkIDogdGhpcy5UaGlzTm9kZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTGFzdFNpYmxpbmcoKTogVE5vZGUge1xuICAgIHJldHVybiB0aGlzLlBhcmVudCAhPSBudWxsID8gdGhpcy5QYXJlbnQuRmlyc3RDaGlsZC5DeWNsaWNQcmV2IDogdGhpcy5UaGlzTm9kZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRmlyc3RDaGlsZCgpOlROb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fZmlyc3RDaGlsZDtcbiAgfVxuICBwcml2YXRlIHNldCBmaXJzdENoaWxkKGZpcnN0Q2hpbGQ6VE5vZGUpIHtcbiAgICB0aGlzLl9maXJzdENoaWxkID0gZmlyc3RDaGlsZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTGFzdENoaWxkKCk6VE5vZGUge1xuICAgIHJldHVybiB0aGlzLkZpcnN0Q2hpbGQgIT0gbnVsbCA/IHRoaXMuRmlyc3RDaGlsZC5DeWNsaWNQcmV2IDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUGFyZW50KCk6VE5vZGUge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gIH1cbiAgcHJpdmF0ZSBzZXQgcGFyZW50KHBhcmVudDpUTm9kZSkge1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ3ljbGljUHJldigpOlROb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fY3ljbGljUHJldjtcbiAgfVxuICBwcml2YXRlIHNldCBjeWNsaWNQcmV2KGN5Y2xpY1ByZXY6VE5vZGUpIHtcbiAgICB0aGlzLl9jeWNsaWNQcmV2ID0gY3ljbGljUHJldjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ3ljbGljTmV4dCgpOlROb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fY3ljbGljTmV4dDtcbiAgfVxuICBwcml2YXRlIHNldCBjeWNsaWNOZXh0KGN5Y2xpY05leHQ6VE5vZGUpIHtcbiAgICB0aGlzLl9jeWNsaWNOZXh0ID0gY3ljbGljTmV4dDtcbiAgfVxuICBwdWJsaWMgZ2V0IFByZXYoKTpUTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuQ3ljbGljUHJldiAhPT0gdGhpcy5MYXN0U2libGluZyA/IHRoaXMuQ3ljbGljUHJldiA6IG51bGw7XG4gIH1cbiAgcHVibGljIGdldCBOZXh0KCk6VE5vZGUge1xuICAgIHJldHVybiB0aGlzLkN5Y2xpY05leHQgIT09IHRoaXMuRmlyc3RTaWJsaW5nID8gdGhpcy5DeWNsaWNOZXh0IDogbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRWYWx1ZSgpOlRWYWx1ZSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHByb3RlY3RlZCBzZXRWYWx1ZSh2YWx1ZTogVFZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBwcm90ZWN0ZWQgZ2V0IFZhbHVlKCk6VFZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgcHJvdGVjdGVkIHNldCBWYWx1ZSh2YWx1ZTogVFZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ2hpbGRyZW5Db3VudCgpOm51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuQ2hpbGRyZW4oKS5jb3VudCgpO1xuICB9XG5cbiAgcHVibGljIGdldCBMZW5ndGhGcm9tRGVlcGVzdENoaWxkKCk6bnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5HZXRMZW5ndGhGcm9tRGVlcGVzdENoaWxkKCk7XG4gIH1cblxuICBwcml2YXRlIEdldExlbmd0aEZyb21EZWVwZXN0Q2hpbGQoKTpudW1iZXIge1xuICAgIGxldCBtYXhMZW5ndGggPSAwO1xuICAgIHRoaXMuQ2hpbGRyZW4oKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IGNoaWxkLkdldExlbmd0aEZyb21EZWVwZXN0Q2hpbGQoKSArIDE7XG4gICAgICBpZiAobWF4TGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgIG1heExlbmd0aCA9IGxlbmd0aDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF4TGVuZ3RoO1xuICB9XG5cbiAgcHVibGljIENoaWxkQXRPck51bGwoaW5kZXg6bnVtYmVyKTpUTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuQ2hpbGRyZW4oKS5lbGVtZW50QXRPckRlZmF1bHQoaW5kZXgpO1xuICB9XG5cbiAgcHVibGljIEFuY2VzdG9ycyhpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICByZXR1cm4gaW5jbHVzaXZlRGVwdGggPT09IHVuZGVmaW5lZFxuICAgID8gdGhpcy5BbmNlc3RvcnNBbmRTZWxmKCkuc2tpcCgxKVxuICAgIDogdGhpcy5BbmNlc3RvcnMoKS50YWtlKGluY2x1c2l2ZURlcHRoKTtcbiAgfVxuXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTZWxmKGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIGlmIChpbmNsdXNpdmVEZXB0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5BbmNlc3RvcnNBbmRTZWxmKCkudGFrZShpbmNsdXNpdmVEZXB0aCArIDEpO1xuICAgIH1cbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XG4gICAgICBsZXQgbm9kZSA9IF90aGlzLlRoaXNOb2RlO1xuICAgICAgZG8ge1xuICAgICAgICB5aWVsZCBub2RlO1xuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XG4gICAgICB9IHdoaWxlIChub2RlICE9IG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgQ2hpbGRyZW4oKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XG4gICAgICBsZXQgbm9kZSA9IF90aGlzLkZpcnN0Q2hpbGQ7XG4gICAgICBpZiAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0ZXJtaW5hbCA9IG5vZGU7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICB5aWVsZCBub2RlO1xuICAgICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XG4gICAgICAgIH0gd2hpbGUgKG5vZGUgIT09IHRlcm1pbmFsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xuICB9XG5cbiAgcHVibGljIFJldmVyc2VDaGlsZHJlbigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcbiAgICAgIGxldCBub2RlID0gX3RoaXMuTGFzdENoaWxkO1xuICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB0ZXJtaW5hbCA9IG5vZGU7XG4gICAgICBkbyB7XG4gICAgICAgIHlpZWxkIG5vZGU7XG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY1ByZXY7XG4gICAgICB9IHdoaWxlIChub2RlICE9PSB0ZXJtaW5hbCk7XG4gICAgfVxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBOZXh0c0Zyb21TZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcjEoX3RoaXMpIHtcbiAgICAgIGxldCBub2RlID0gX3RoaXMuQ3ljbGljTmV4dDtcbiAgICAgIGNvbnN0IHRlcm1pbmFsID0gX3RoaXMuRmlyc3RTaWJsaW5nO1xuICAgICAgd2hpbGUgKG5vZGUgIT09IHRlcm1pbmFsKSB7XG4gICAgICAgIHlpZWxkIG5vZGU7XG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yMSh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgTmV4dHNGcm9tU2VsZkFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICByZXR1cm4gRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkuY29uY2F0KHRoaXMuTmV4dHNGcm9tU2VsZigpKTtcbiAgfVxuXG4gIHB1YmxpYyBOZXh0c0Zyb21MYXN0KCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5MYXN0U2libGluZztcbiAgICAgIGNvbnN0IHRlcm1pbmFsID0gX3RoaXMuVGhpc05vZGU7XG4gICAgICB3aGlsZSAobm9kZSAhPT0gdGVybWluYWwpIHtcbiAgICAgICAgeWllbGQgbm9kZTtcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljUHJldjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xuICB9XG5cbiAgcHVibGljIE5leHRzRnJvbUxhc3RBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgcmV0dXJuIHRoaXMuTmV4dHNGcm9tTGFzdCgpLmNvbmNhdChFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKSk7XG4gIH1cblxuICBwdWJsaWMgUHJldnNGcm9tRmlyc3QoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XG4gICAgICBsZXQgbm9kZSA9IF90aGlzLkZpcnN0U2libGluZztcbiAgICAgIGNvbnN0IHRlcm1pbmFsID0gX3RoaXMuVGhpc05vZGU7XG4gICAgICB3aGlsZSAobm9kZSAhPT0gdGVybWluYWwpIHtcbiAgICAgICAgeWllbGQgbm9kZTtcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljTmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xuICB9XG5cbiAgcHVibGljIFByZXZzRnJvbUZpcnN0QW5kU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIHJldHVybiB0aGlzLlByZXZzRnJvbUZpcnN0KCkuY29uY2F0KEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpKTtcbiAgfVxuXG4gIHB1YmxpYyBQcmV2c0Zyb21TZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5DeWNsaWNQcmV2O1xuICAgICAgY29uc3QgdGVybWluYWwgPSBfdGhpcy5MYXN0U2libGluZztcbiAgICAgIHdoaWxlIChub2RlICE9PSB0ZXJtaW5hbCkge1xuICAgICAgICB5aWVsZCBub2RlO1xuICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNQcmV2O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgUHJldnNGcm9tU2VsZkFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICByZXR1cm4gRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkuY29uY2F0KHRoaXMuUHJldnNGcm9tU2VsZigpKTtcbiAgfVxuXG4gIHB1YmxpYyBEZXNjZW5kYW50cyhpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XG4gICAgICBpZiAoaW5jbHVzaXZlRGVwdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBzdGFydCA9IF90aGlzLlRoaXNOb2RlO1xuICAgICAgICBsZXQgY3Vyc29yID0gc3RhcnQ7XG4gICAgICAgIGlmIChjdXJzb3IuRmlyc3RDaGlsZCAhPSBudWxsKSB7XG4gICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkZpcnN0Q2hpbGQ7XG4gICAgICAgICAgeWllbGQgY3Vyc29yO1xuICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB3aGlsZSAoY3Vyc29yLkZpcnN0Q2hpbGQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuRmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgeWllbGQgY3Vyc29yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGN1cnNvci5OZXh0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLlBhcmVudDtcbiAgICAgICAgICAgICAgaWYgKGN1cnNvciA9PT0gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnNvciA9IGN1cnNvci5DeWNsaWNOZXh0O1xuICAgICAgICAgICAgeWllbGQgY3Vyc29yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBfdGhpcy5UaGlzTm9kZTtcbiAgICAgICAgbGV0IGN1cnNvciA9IHN0YXJ0O1xuICAgICAgICBpZiAoY3Vyc29yLkZpcnN0Q2hpbGQgIT0gbnVsbCAmJiBpbmNsdXNpdmVEZXB0aCA+IDApIHtcbiAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuRmlyc3RDaGlsZDtcbiAgICAgICAgICBpbmNsdXNpdmVEZXB0aC0tO1xuICAgICAgICAgIHlpZWxkIGN1cnNvcjtcbiAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgd2hpbGUgKGN1cnNvci5GaXJzdENoaWxkICE9IG51bGwgJiYgaW5jbHVzaXZlRGVwdGggPiAwKSB7XG4gICAgICAgICAgICAgIGN1cnNvciA9IGN1cnNvci5GaXJzdENoaWxkO1xuICAgICAgICAgICAgICBpbmNsdXNpdmVEZXB0aC0tO1xuICAgICAgICAgICAgICB5aWVsZCBjdXJzb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY3Vyc29yLk5leHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuUGFyZW50O1xuICAgICAgICAgICAgICBpbmNsdXNpdmVEZXB0aCsrO1xuICAgICAgICAgICAgICBpZiAoY3Vyc29yID09PSBzdGFydCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkN5Y2xpY05leHQ7XG4gICAgICAgICAgICB5aWVsZCBjdXJzb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBEZXNjZW5kYW50c0FuZFNlbGYoaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgcmV0dXJuIGluY2x1c2l2ZURlcHRoID09PSB1bmRlZmluZWRcbiAgICAgID8gRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkuY29uY2F0KHRoaXMuRGVzY2VuZGFudHMoKSlcbiAgICAgIDogRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkuY29uY2F0KHRoaXMuRGVzY2VuZGFudHMoaW5jbHVzaXZlRGVwdGgpKTtcbiAgfVxuXG4gIHB1YmxpYyBTaWJsaW5ncyhpbmNsdXNpdmVFYWNoTGVuZ3RoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIGlmIChpbmNsdXNpdmVFYWNoTGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLlByZXZzRnJvbVNlbGYoKS50YWtlKGluY2x1c2l2ZUVhY2hMZW5ndGgpLnJldmVyc2UoKVxuICAgICAgLmNvbmNhdCh0aGlzLk5leHRzRnJvbVNlbGYoKS50YWtlKGluY2x1c2l2ZUVhY2hMZW5ndGgpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xuICAgICAgY29uc3QgZmlyc3QgPSBfdGhpcy5GaXJzdFNpYmxpbmc7XG4gICAgICBsZXQgbm9kZSA9IGZpcnN0O1xuICAgICAgd2hpbGUgKG5vZGUgIT09IDxUTm9kZT48YW55Pl90aGlzKSB7XG4gICAgICAgIHlpZWxkIG5vZGU7XG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5DeWNsaWNOZXh0O1xuICAgICAgd2hpbGUgKG5vZGUgIT09IGZpcnN0KSB7XG4gICAgICAgIHlpZWxkIG5vZGU7XG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBTaWJsaW5nc0FuZFNlbGYoaW5jbHVzaXZlRWFjaExlbmd0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICBpZiAoaW5jbHVzaXZlRWFjaExlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5QcmV2c0Zyb21TZWxmKCkudGFrZShpbmNsdXNpdmVFYWNoTGVuZ3RoKS5yZXZlcnNlKClcbiAgICAgICAgICAgICAgICAuY29uY2F0KEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpKVxuICAgICAgICAgICAgICAgIC5jb25jYXQodGhpcy5OZXh0c0Zyb21TZWxmKCkudGFrZShpbmNsdXNpdmVFYWNoTGVuZ3RoKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcbiAgICAgIGNvbnN0IGZpcnN0ID0gX3RoaXMuRmlyc3RTaWJsaW5nO1xuICAgICAgbGV0IG5vZGUgPSBmaXJzdDtcbiAgICAgIGRvIHtcbiAgICAgICAgeWllbGQgbm9kZTtcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljTmV4dDtcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT09IGZpcnN0KTtcbiAgICB9XG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xuICB9XG5cbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcbiAgICAgIGRvIHtcbiAgICAgICAgY29uc3QgZSA9IG5vZGUuTmV4dHNGcm9tU2VsZigpLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgd2hpbGUgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgIHlpZWxkIGUuY3VycmVudDtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XG4gICAgICB9IHdoaWxlIChub2RlICE9IG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGZBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgcmV0dXJuIEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpLmNvbmNhdCh0aGlzLkFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmKCkpO1xuICB9XG5cbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIHJldHVybiB0aGlzLkFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYoKS5za2lwKDEpO1xuICB9XG5cbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XG4gICAgICBsZXQgbm9kZSA9IF90aGlzLlRoaXNOb2RlO1xuICAgICAgZG8ge1xuICAgICAgICBjb25zdCBlID0gbm9kZS5QcmV2c0Zyb21TZWxmQW5kU2VsZigpLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgd2hpbGUgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgIHlpZWxkIGUuY3VycmVudDtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XG4gICAgICB9IHdoaWxlIChub2RlICE9IG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgQW5jZXN0b3JXaXRoU2luZ2xlQ2hpbGQoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XG4gICAgICBsZXQgbm9kZSA9IF90aGlzLlRoaXNOb2RlO1xuICAgICAgd2hpbGUgKG5vZGUgPT09IG5vZGUuQ3ljbGljTmV4dCkge1xuICAgICAgICBjb25zdCBsYXN0Tm9kZSA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBub2RlLlBhcmVudDtcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBsYXN0Tm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBBbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGQoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XG4gICAgICBsZXQgbm9kZSA9IF90aGlzLlRoaXNOb2RlO1xuICAgICAgd2hpbGUgKG5vZGUgPT09IG5vZGUuQ3ljbGljTmV4dCkge1xuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkQW5kU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XG4gICAgICB5aWVsZCBub2RlO1xuICAgICAgd2hpbGUgKG5vZGUgPT09IG5vZGUuQ3ljbGljTmV4dCkge1xuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgRGVzY2VuZGFudHNPZlNpbmdsZSgpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIHJldHVybiB0aGlzLkRlc2NlbmRhbnRzT2ZTaW5nbGVBbmRTZWxmKCkuc2tpcCgxKTtcbiAgfVxuXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XG4gICAgICBkbyB7XG4gICAgICAgIHlpZWxkIG5vZGU7XG4gICAgICAgIG5vZGUgPSBub2RlLkZpcnN0Q2hpbGQ7XG4gICAgICB9IHdoaWxlIChub2RlICE9IG51bGwgJiYgbm9kZSA9PT0gbm9kZS5DeWNsaWNOZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xuICB9XG5cbiAgcHVibGljIERlc2NlbmRhbnRzT2ZGaXJzdENoaWxkKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XG4gICAgcmV0dXJuIHRoaXMuRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGRBbmRTZWxmKCkuc2tpcCgxKTtcbiAgfVxuXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mRmlyc3RDaGlsZEFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XG4gICAgICBsZXQgbm9kZSA9IF90aGlzLlRoaXNOb2RlO1xuICAgICAgZG8ge1xuICAgICAgICB5aWVsZCBub2RlO1xuICAgICAgICBub2RlID0gbm9kZS5GaXJzdENoaWxkO1xuICAgICAgfSB3aGlsZSAobm9kZSAhPSBudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xuICB9XG5cbiAgcHVibGljIEFkZFByZXZpb3VzKG5vZGU6VE5vZGUpOlROb2RlIHtcbiAgICBjb25zb2xlLmFzc2VydChub2RlICE9IG51bGwpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUuUGFyZW50ID09IG51bGwpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMuUGFyZW50ICE9IG51bGwpO1xuICAgIGlmICh0aGlzLlBhcmVudC5GaXJzdENoaWxkID09PSA8VE5vZGU+PGFueT50aGlzKSB7XG4gICAgICB0aGlzLlBhcmVudC5maXJzdENoaWxkID0gbm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuQWRkUHJldmlvdXNJZ25vcmluZ0ZpcnN0Q2hpbGQobm9kZSk7XG4gIH1cblxuICBwdWJsaWMgQWRkTmV4dChub2RlOlROb2RlKTpUTm9kZSB7XG4gICAgY29uc29sZS5hc3NlcnQobm9kZSAhPSBudWxsKTtcbiAgICBjb25zb2xlLmFzc2VydChub2RlLlBhcmVudCA9PSBudWxsKTtcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLlBhcmVudCAhPSBudWxsKTtcbiAgICByZXR1cm4gdGhpcy5DeWNsaWNOZXh0LkFkZFByZXZpb3VzSWdub3JpbmdGaXJzdENoaWxkKG5vZGUpO1xuICB9XG5cbiAgcHVibGljIEFkZEZpcnN0KG5vZGU6VE5vZGUpOlROb2RlIHtcbiAgICBjb25zb2xlLmFzc2VydChub2RlICE9IG51bGwpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUuUGFyZW50ID09IG51bGwpO1xuICAgIHJldHVybiB0aGlzLkFkZEZpcnN0UHJpdmF0ZShub2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgQWRkRmlyc3RQcml2YXRlKG5vZGU6VE5vZGUpOlROb2RlIHtcbiAgICB0aGlzLkFkZExhc3RQcml2YXRlKG5vZGUpO1xuICAgIHRoaXMuZmlyc3RDaGlsZCA9IG5vZGU7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwcml2YXRlIEFkZFByZXZpb3VzSWdub3JpbmdGaXJzdENoaWxkKG5vZGU6VE5vZGUpOlROb2RlIHtcbiAgICBub2RlLnBhcmVudCA9IHRoaXMuUGFyZW50O1xuICAgIG5vZGUuY3ljbGljTmV4dCA9IHRoaXMuVGhpc05vZGU7XG4gICAgbm9kZS5jeWNsaWNQcmV2ID0gdGhpcy5DeWNsaWNQcmV2O1xuICAgIHRoaXMuQ3ljbGljUHJldi5jeWNsaWNOZXh0ID0gbm9kZTtcbiAgICB0aGlzLmN5Y2xpY1ByZXYgPSBub2RlO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgcHVibGljIEFkZExhc3Qobm9kZTpUTm9kZSk6VE5vZGUge1xuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUgIT0gbnVsbCk7XG4gICAgY29uc29sZS5hc3NlcnQobm9kZS5QYXJlbnQgPT0gbnVsbCk7XG4gICAgcmV0dXJuIHRoaXMuQWRkTGFzdFByaXZhdGUobm9kZSk7XG4gIH1cblxuICBwcml2YXRlIEFkZExhc3RQcml2YXRlKG5vZGU6VE5vZGUpOlROb2RlIHtcbiAgICBjb25zdCBzZWNvbmQgPSB0aGlzLkZpcnN0Q2hpbGQ7XG4gICAgaWYgKHNlY29uZCA9PSBudWxsKSB7XG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuVGhpc05vZGU7XG4gICAgICBub2RlLmN5Y2xpY05leHQgPSBub2RlO1xuICAgICAgbm9kZS5jeWNsaWNQcmV2ID0gbm9kZTtcbiAgICAgIHRoaXMuZmlyc3RDaGlsZCA9IG5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlY29uZC5BZGRQcmV2aW91c0lnbm9yaW5nRmlyc3RDaGlsZChub2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwdWJsaWMgUmVwbGFjZShuZXdOb2RlOlROb2RlKTp2b2lkIHtcbiAgICBpZiAodGhpcy5QYXJlbnQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oJ0Egcm9vdCBub2RlIGNhbm5vdCBiZSByZXBsYWNlZC4nKTtcbiAgICB9XG4gICAgbmV3Tm9kZS5wYXJlbnQgPSB0aGlzLlBhcmVudDtcbiAgICBuZXdOb2RlLmN5Y2xpY05leHQgPSB0aGlzLkN5Y2xpY05leHQ7XG4gICAgbmV3Tm9kZS5jeWNsaWNQcmV2ID0gdGhpcy5DeWNsaWNQcmV2O1xuICAgIHRoaXMuQ3ljbGljUHJldi5jeWNsaWNOZXh0ID0gbmV3Tm9kZTsgLy8gcHJldi5uZXh0ID0gbmV3Tm9kZVxuICAgIHRoaXMuQ3ljbGljTmV4dC5jeWNsaWNQcmV2ID0gbmV3Tm9kZTtcbiAgICBuZXdOb2RlLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IG5ld05vZGU7XG4gICAgaWYgKHRoaXMuUGFyZW50LkZpcnN0Q2hpbGQgPT09IDxUTm9kZT48YW55PnRoaXMpIHtcbiAgICAgIHRoaXMuUGFyZW50LmZpcnN0Q2hpbGQgPSBuZXdOb2RlO1xuICAgIH1cbiAgICB0aGlzLmN5Y2xpY05leHQgPSBudWxsO1xuICAgIHRoaXMuY3ljbGljUHJldiA9IG51bGw7XG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIFJlbW92ZSgpOnZvaWQge1xuICAgIGlmICh0aGlzLlBhcmVudCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbignQSByb290IG5vZGUgY2Fubm90IGJlIHJlbW92ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IG5leHQgPSB0aGlzLkN5Y2xpY05leHQ7XG4gICAgaWYgKG5leHQgIT09IDxUTm9kZT48YW55PnRoaXMpIHtcbiAgICAgIHRoaXMuQ3ljbGljUHJldi5jeWNsaWNOZXh0ID0gbmV4dDtcbiAgICAgIG5leHQuY3ljbGljUHJldiA9IHRoaXMuQ3ljbGljUHJldjtcbiAgICAgIGlmICh0aGlzLlBhcmVudC5GaXJzdENoaWxkID09PSA8VE5vZGU+PGFueT50aGlzKSB7XG4gICAgICAgIHRoaXMuUGFyZW50LmZpcnN0Q2hpbGQgPSBuZXh0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLlBhcmVudC5maXJzdENoaWxkID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5jeWNsaWNOZXh0ID0gbnVsbDtcbiAgICB0aGlzLmN5Y2xpY1ByZXYgPSBudWxsO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBSZW1vdmVSZWNvdmVyYWJseSgpIHtcbiAgICBpZiAodGhpcy5QYXJlbnQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oJ0Egcm9vdCBub2RlIGNhbm5vdCBiZSByZW1vdmVkLicpO1xuICAgIH1cbiAgICBjb25zdCBuZXh0ID0gdGhpcy5DeWNsaWNOZXh0O1xuICAgIGlmIChuZXh0ICE9PSA8VE5vZGU+PGFueT50aGlzKSB7XG4gICAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IG5leHQ7XG4gICAgICBuZXh0LmN5Y2xpY1ByZXYgPSB0aGlzLkN5Y2xpY1ByZXY7XG4gICAgICBpZiAodGhpcy5QYXJlbnQuRmlyc3RDaGlsZCA9PT0gPFROb2RlPjxhbnk+dGhpcykge1xuICAgICAgICB0aGlzLlBhcmVudC5maXJzdENoaWxkID0gbmV4dDtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICBuZXh0LlBhcmVudC5maXJzdENoaWxkID0gdGhpcy5UaGlzTm9kZTtcbiAgICAgICAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IHRoaXMuVGhpc05vZGU7XG4gICAgICAgICAgbmV4dC5jeWNsaWNQcmV2ID0gdGhpcy5UaGlzTm9kZTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHRoaXMuQ3ljbGljUHJldi5jeWNsaWNOZXh0ID0gdGhpcy5UaGlzTm9kZTtcbiAgICAgICAgbmV4dC5jeWNsaWNQcmV2ID0gdGhpcy5UaGlzTm9kZTtcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuUGFyZW50O1xuICAgIHBhcmVudC5maXJzdENoaWxkID0gbnVsbDtcbiAgICByZXR1cm4gKCkgPT4geyBwYXJlbnQuZmlyc3RDaGlsZCA9IHRoaXMuVGhpc05vZGU7IH07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmcge1xuICAgIGNvbnN0IGJ1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xuICAgIHRoaXMuVG9TdHJpbmdQcml2YXRlKHRoaXMuVGhpc05vZGUsIDAsIGJ1aWxkZXIpO1xuICAgIHJldHVybiBidWlsZGVyLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwcml2YXRlIFRvU3RyaW5nUHJpdmF0ZShub2RlOlROb2RlLCBkZXB0aDpudW1iZXIsIGJ1aWxkZXI6U3RyaW5nQnVpbGRlcik6dm9pZCAge1xuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXB0aDsgaSsrKSB7XG4gICAgICBidWlsZGVyLmFwcGVuZCgnICAnKTtcbiAgICB9XG4gICAgYnVpbGRlci5hcHBlbmRMaW5lKCFub2RlLlZhbHVlICE9IG51bGwgPyBub2RlLlZhbHVlLnRvU3RyaW5nKCkgOiAnJyk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBub2RlLkNoaWxkcmVuKCk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICB0aGlzLlRvU3RyaW5nUHJpdmF0ZShjaGlsZCwgZGVwdGggKyAxLCBidWlsZGVyKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL05vZGUudHMiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5jb25zdCBOQU1FID0gJ0V4Y2VwdGlvbic7XG4vKipcbiAqIFJlcHJlc2VudHMgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIGFwcGxpY2F0aW9uIGV4ZWN1dGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbiB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIEV4Y2VwdGlvbiBjbGFzcyB3aXRoIGEgc3BlY2lmaWVkIGVycm9yIG1lc3NhZ2UgYW5kIG9wdGlvbmFsbHkgYSByZWZlcmVuY2UgdG8gdGhlIGlubmVyIGV4Y2VwdGlvbiB0aGF0IGlzIHRoZSBjYXVzZSBvZiB0aGlzIGV4Y2VwdGlvbi5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSBpbm5lckV4Y2VwdGlvblxuICAgICAqIEBwYXJhbSBiZWZvcmVTZWFsaW5nIFRoaXMgZGVsZWdhdGUgaXMgdXNlZCB0byBhbGxvdyBhY3Rpb25zIHRvIG9jY3VyIGp1c3QgYmVmb3JlIHRoaXMgY29uc3RydWN0b3IgZmluaXNoZXMuICBTaW5jZSBzb21lIGNvbXBpbGVycyBkbyBub3QgYWxsb3cgdGhlIHVzZSBvZiAndGhpcycgYmVmb3JlIHN1cGVyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGlubmVyRXhjZXB0aW9uLCBiZWZvcmVTZWFsaW5nKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICAgICAgaWYgKGlubmVyRXhjZXB0aW9uKVxuICAgICAgICAgICAgdGhpcy5kYXRhWydpbm5lckV4Y2VwdGlvbiddID0gaW5uZXJFeGNlcHRpb247XG4gICAgICAgIC8qIE9yaWdpbmFsbHkgaW50ZW5kZWQgdG8gdXNlICdnZXQnIGFjY2Vzc29ycyBmb3IgcHJvcGVydGllcyxcbiAgICAgICAgICogQnV0IGRlYnVnZ2VycyBkb24ndCBkaXNwbGF5IHRoZXNlIHJlYWRpbHkgeWV0LlxuICAgICAgICAgKiBPYmplY3QuZnJlZXplIGhhcyB0byBiZSB1c2VkIGNhcmVmdWxseSwgYnV0IHdpbGwgcHJldmVudCBvdmVycmlkaW5nIHZhbHVlcyBhdCBydW50aW1lLlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGJlZm9yZVNlYWxpbmcpXG4gICAgICAgICAgICBiZWZvcmVTZWFsaW5nKHRoaXMpO1xuICAgICAgICAvLyBOb2RlIGhhcyBhIC5zdGFjaywgbGV0J3MgdXNlIGl0Li4uXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc3RhY2sgPSBldmFsKFwibmV3IEVycm9yKClcIikuc3RhY2s7XG4gICAgICAgICAgICBzdGFjayA9IHN0YWNrXG4gICAgICAgICAgICAgICAgJiYgc3RhY2tcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL15FcnJvclxcbi8sICcnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKC58XFxuKStcXHMrYXQgbmV3LisvLCAnJylcbiAgICAgICAgICAgICAgICB8fCAnJztcbiAgICAgICAgICAgIHRoaXMuc3RhY2sgPSB0aGlzLnRvU3RyaW5nV2l0aG91dEJyYWNrZXRzKCkgKyBzdGFjaztcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhY2sgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciB0eXBlLlxuICAgICAqIFRoZSBkZWZhdWx0IGlzICdFcnJvcicuXG4gICAgICovXG4gICAgZ2V0TmFtZSgpIHsgcmV0dXJuIE5BTUU7IH1cbiAgICAvKipcbiAgICAgKiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBFeGNlcHRpb24gaW5zdGFuY2UuXG4gICAgICovXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgWyR7dGhpcy50b1N0cmluZ1dpdGhvdXRCcmFja2V0cygpfV1gO1xuICAgIH1cbiAgICB0b1N0cmluZ1dpdGhvdXRCcmFja2V0cygpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IG0gPSBfLm1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBfLm5hbWUgKyAobSA/ICgnOiAnICsgbSkgOiAnJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZGF0YSBvYmplY3QuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgZm9yIChsZXQgayBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrKSlcbiAgICAgICAgICAgICAgICBkZWxldGUgZGF0YVtrXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUYXNrSGFuZGxlckJhc2UgfSBmcm9tIFwiLi9UYXNrSGFuZGxlckJhc2VcIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5leHBvcnQgY2xhc3MgVGFza0hhbmRsZXIgZXh0ZW5kcyBUYXNrSGFuZGxlckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9hY3Rpb24pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fYWN0aW9uID0gX2FjdGlvbjtcbiAgICAgICAgaWYgKCFfYWN0aW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignYWN0aW9uJyk7XG4gICAgfVxuICAgIF9vbkV4ZWN1dGUoKSB7XG4gICAgICAgIHRoaXMuX2FjdGlvbigpO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2FjdGlvbiA9IG51bGw7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVGFza0hhbmRsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UYXNrSGFuZGxlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1RocmVhZGluZy9UYXNrcy9UYXNrSGFuZGxlci5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSBcIlRhc2tIYW5kbGVyQmFzZVwiO1xuLyoqXG4gKiBBIHNpbXBsZSBjbGFzcyBmb3IgaGFuZGxpbmcgcG90ZW50aWFsbHkgcmVwZWF0ZWQgZXhlY3V0aW9ucyBlaXRoZXIgZGVmZXJyZWQgb3IgaW1tZWRpYXRlLlxuICovXG5leHBvcnQgY2xhc3MgVGFza0hhbmRsZXJCYXNlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihOQU1FKTtcbiAgICAgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gMCAvKiBDcmVhdGVkICovO1xuICAgIH1cbiAgICBnZXQgaXNTY2hlZHVsZWQoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX3RpbWVvdXRJZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NoZWR1bGVzL1Jlc2NoZWR1bGVzIHRyaWdnZXJpbmcgdGhlIHRhc2suXG4gICAgICogQHBhcmFtIGRlZmVyIE9wdGlvbmFsIHRpbWUgdG8gd2FpdCB1bnRpbCB0cmlnZ2VyaW5nLlxuICAgICAqL1xuICAgIHN0YXJ0KGRlZmVyID0gMCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLl9zdGF0dXMgPSAxIC8qIFdhaXRpbmdUb1J1biAqLztcbiAgICAgICAgaWYgKCEoZGVmZXIgPiAwKSlcbiAgICAgICAgICAgIGRlZmVyID0gMDsgLy8gQSBuZWdhdGlvbiBpcyB1c2VkIHRvIGNhdGNoIGVkZ2UgY2FzZXMuXG4gICAgICAgIGlmIChpc0Zpbml0ZShkZWZlcikpXG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0SWQgPSBzZXRUaW1lb3V0KFRhc2tIYW5kbGVyQmFzZS5faGFuZGxlciwgZGVmZXIsIHRoaXMpO1xuICAgIH1cbiAgICBydW5TeW5jaHJvbm91c2x5KCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBUYXNrSGFuZGxlckJhc2UuX2hhbmRsZXIodGhpcyk7XG4gICAgfVxuICAgIGdldFN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cztcbiAgICB9XG4gICAgZ2V0IHN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdHVzKCk7XG4gICAgfVxuICAgIC8vIFVzZSBhIHN0YXRpYyBmdW5jdGlvbiBoZXJlIHRvIGF2b2lkIHJlY3JlYXRpbmcgYSBuZXcgZnVuY3Rpb24gZXZlcnkgdGltZS5cbiAgICBzdGF0aWMgX2hhbmRsZXIoZCkge1xuICAgICAgICBkLmNhbmNlbCgpO1xuICAgICAgICBkLl9zdGF0dXMgPSAyIC8qIFJ1bm5pbmcgKi87XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkLl9vbkV4ZWN1dGUoKTtcbiAgICAgICAgICAgIGQuX3N0YXR1cyA9IDMgLyogUmFuVG9Db21wbGV0aW9uICovO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgZC5fc3RhdHVzID0gNSAvKiBGYXVsdGVkICovO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IG51bGw7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLl90aW1lb3V0SWQ7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zdGF0dXMgPSA0IC8qIENhbmNlbGxlZCAqLztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBUYXNrSGFuZGxlckJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UYXNrSGFuZGxlckJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UaHJlYWRpbmcvVGFza3MvVGFza0hhbmRsZXJCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogT3JpZ2luYWw6IGh0dHA6Ly9saW5xanMuY29kZXBsZXguY29tL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBMaW5rZWROb2RlTGlzdCB9IGZyb20gXCIuLi9MaW5rZWROb2RlTGlzdFwiO1xuaW1wb3J0IHsgT2JqZWN0UG9vbCB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL09iamVjdFBvb2xcIjtcbmltcG9ydCB7IGdldElkZW50aWZpZXIgfSBmcm9tIFwiLi9nZXRJZGVudGlmaWVyXCI7XG5pbXBvcnQgRGljdGlvbmFyeUJhc2UgZnJvbSBcIi4vRGljdGlvbmFyeUJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG4vLyBMaW5rZWRMaXN0IGZvciBEaWN0aW9uYXJ5XG5jbGFzcyBIYXNoRW50cnkge1xuICAgIGNvbnN0cnVjdG9yKGtleSwgdmFsdWUsIHByZXZpb3VzLCBuZXh0KSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJldmlvdXMgPSBwcmV2aW91cztcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV4dDtcbiAgICB9XG59XG5sZXQgbGlua2VkTGlzdFBvb2w7XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZnVuY3Rpb24gbGlua2VkTm9kZUxpc3QocmVjeWNsZSkge1xuICAgIGlmICghbGlua2VkTGlzdFBvb2wpXG4gICAgICAgIGxpbmtlZExpc3RQb29sXG4gICAgICAgICAgICA9IG5ldyBPYmplY3RQb29sKDIwLCAoKSA9PiBuZXcgTGlua2VkTm9kZUxpc3QoKSwgciA9PiByLmNsZWFyKCkpO1xuICAgIGlmICghcmVjeWNsZSlcbiAgICAgICAgcmV0dXJuIGxpbmtlZExpc3RQb29sLnRha2UoKTtcbiAgICBsaW5rZWRMaXN0UG9vbC5hZGQocmVjeWNsZSk7XG59XG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeSBleHRlbmRzIERpY3Rpb25hcnlCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihfa2V5R2VuZXJhdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2tleUdlbmVyYXRvciA9IF9rZXlHZW5lcmF0b3I7XG4gICAgICAgIHRoaXMuX2VudHJpZXMgPSBsaW5rZWROb2RlTGlzdCgpO1xuICAgICAgICB0aGlzLl9idWNrZXRzID0ge307XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2VudHJpZXMgPSBudWxsO1xuICAgICAgICBfLl9idWNrZXRzID0gbnVsbDtcbiAgICAgICAgXy5faGFzaEdlbmVyYXRvciA9IG51bGw7XG4gICAgfVxuICAgIGdldENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW50cmllcyAmJiB0aGlzLl9lbnRyaWVzLnVuc2FmZUNvdW50IHx8IDA7XG4gICAgfVxuICAgIF9nZXRCdWNrZXQoaGFzaCwgY3JlYXRlSWZNaXNzaW5nKSB7XG4gICAgICAgIGlmIChoYXNoID09IG51bGwgfHwgIWNyZWF0ZUlmTWlzc2luZyAmJiAhdGhpcy5nZXRDb3VudCgpKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghVHlwZS5pc1ByaW1pdGl2ZU9yU3ltYm9sKGhhc2gpKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiS2V5IHR5cGUgbm90IGluZGV4YWJsZSBhbmQgY291bGQgY2F1c2UgRGljdGlvbmFyeSB0byBiZSBleHRyZW1lbHkgc2xvdy5cIik7XG4gICAgICAgIGNvbnN0IGJ1Y2tldHMgPSB0aGlzLl9idWNrZXRzO1xuICAgICAgICBsZXQgYnVja2V0ID0gYnVja2V0c1toYXNoXTtcbiAgICAgICAgaWYgKGNyZWF0ZUlmTWlzc2luZyAmJiAhYnVja2V0KVxuICAgICAgICAgICAgYnVja2V0c1toYXNoXVxuICAgICAgICAgICAgICAgID0gYnVja2V0XG4gICAgICAgICAgICAgICAgICAgID0gbGlua2VkTm9kZUxpc3QoKTtcbiAgICAgICAgcmV0dXJuIGJ1Y2tldCB8fCBudWxsO1xuICAgIH1cbiAgICBfZ2V0QnVja2V0RW50cnkoa2V5LCBoYXNoLCBidWNrZXQpIHtcbiAgICAgICAgaWYgKGtleSA9PSBudWxsIHx8ICF0aGlzLmdldENvdW50KCkpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgXyA9IHRoaXMsIGNvbXBhcmVyID0gXy5fa2V5R2VuZXJhdG9yLCBjb21wYXJlS2V5ID0gY29tcGFyZXIgPyBjb21wYXJlcihrZXkpIDoga2V5O1xuICAgICAgICBpZiAoIWJ1Y2tldClcbiAgICAgICAgICAgIGJ1Y2tldCA9IF8uX2dldEJ1Y2tldChoYXNoIHx8IGdldElkZW50aWZpZXIoY29tcGFyZUtleSkpO1xuICAgICAgICByZXR1cm4gYnVja2V0XG4gICAgICAgICAgICAmJiAoY29tcGFyZXJcbiAgICAgICAgICAgICAgICA/IGJ1Y2tldC5maW5kKGUgPT4gY29tcGFyZXIoZS5rZXkpID09PSBjb21wYXJlS2V5KVxuICAgICAgICAgICAgICAgIDogYnVja2V0LmZpbmQoZSA9PiBlLmtleSA9PT0gY29tcGFyZUtleSkpO1xuICAgIH1cbiAgICBfZ2V0RW50cnkoa2V5KSB7XG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLl9nZXRCdWNrZXRFbnRyeShrZXkpO1xuICAgICAgICByZXR1cm4gZSAmJiBlLnZhbHVlO1xuICAgIH1cbiAgICBnZXRWYWx1ZShrZXkpIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuX2dldEVudHJ5KGtleSk7XG4gICAgICAgIHJldHVybiBlID8gZS52YWx1ZSA6IFZPSUQwO1xuICAgIH1cbiAgICBfc2V0VmFsdWVJbnRlcm5hbChrZXksIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBidWNrZXRzID0gXy5fYnVja2V0cywgZW50cmllcyA9IF8uX2VudHJpZXMsIGNvbXBhcmVLZXkgPSBfLl9rZXlHZW5lcmF0b3IgPyBfLl9rZXlHZW5lcmF0b3Ioa2V5KSA6IGtleSwgaGFzaCA9IGdldElkZW50aWZpZXIoY29tcGFyZUtleSk7XG4gICAgICAgIGxldCBidWNrZXQgPSBfLl9nZXRCdWNrZXQoaGFzaCk7XG4gICAgICAgIGNvbnN0IGJ1Y2tldEVudHJ5ID0gYnVja2V0ICYmIF8uX2dldEJ1Y2tldEVudHJ5KGtleSwgaGFzaCwgYnVja2V0KTtcbiAgICAgICAgLy8gRW50cnkgZXhpdHM/IERlbGV0ZSBvciB1cGRhdGVcbiAgICAgICAgaWYgKGJ1Y2tldEVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBiID0gYnVja2V0O1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBWT0lEMCkge1xuICAgICAgICAgICAgICAgIGxldCB4ID0gYi5yZW1vdmVOb2RlKGJ1Y2tldEVudHJ5KSwgeSA9IGVudHJpZXMucmVtb3ZlTm9kZShidWNrZXRFbnRyeS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHggJiYgIWIuY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGJ1Y2tldHNbaGFzaF07XG4gICAgICAgICAgICAgICAgICAgIGxpbmtlZE5vZGVMaXN0KGIpO1xuICAgICAgICAgICAgICAgICAgICBidWNrZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoeCAhPT0geSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJFbnRyaWVzIGFuZCBidWNrZXRzIGFyZSBvdXQgb2Ygc3luYy5cIjtcbiAgICAgICAgICAgICAgICBpZiAoeClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCBleHBvc2UgdGhlIGludGVybmFsIGhhc2ggZW50cmllcyBzbyByZXBsYWNpbmcgdGhlIHZhbHVlIGlzIG9rLlxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZCA9IGJ1Y2tldEVudHJ5LnZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgICAgIGJ1Y2tldEVudHJ5LnZhbHVlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFhcmVFcXVhbCh2YWx1ZSwgb2xkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSAhPT0gVk9JRDApIHtcbiAgICAgICAgICAgIGlmICghYnVja2V0KVxuICAgICAgICAgICAgICAgIGJ1Y2tldCA9IF8uX2dldEJ1Y2tldChoYXNoLCB0cnVlKTtcbiAgICAgICAgICAgIGlmICghYnVja2V0KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgXCIke2hhc2gudG9TdHJpbmcoKX1cIiBjYW5ub3QgYmUgYWRkZWQgdG8gbG9va3VwIHRhYmxlLmApO1xuICAgICAgICAgICAgbGV0IGVudHJ5ID0gbmV3IEhhc2hFbnRyeShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGVudHJpZXMuYWRkTm9kZShlbnRyeSk7XG4gICAgICAgICAgICBidWNrZXQuYWRkTm9kZShuZXcgSGFzaEVudHJ5KGtleSwgZW50cnkpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgX2NsZWFySW50ZXJuYWwoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBidWNrZXRzID0gXy5fYnVja2V0cztcbiAgICAgICAgLy8gRW5zdXJlIHJlc2V0IGFuZCBjbGVhbi4uLlxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYnVja2V0cykge1xuICAgICAgICAgICAgaWYgKGJ1Y2tldHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGxldCBidWNrZXQgPSBidWNrZXRzW2tleV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIGJ1Y2tldHNba2V5XTtcbiAgICAgICAgICAgICAgICBsaW5rZWROb2RlTGlzdChidWNrZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLl9lbnRyaWVzLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qXG4gICAgICogTm90ZTogc3VwZXIuZ2V0RW51bWVyYXRvcigpIHdvcmtzIHBlcmZlY3RseSB3ZWxsLFxuICAgICAqIGJ1dCBlbnVtZXJhdGluZyB0aGUgaW50ZXJuYWwgbGlua2VkIG5vZGUgbGlzdCBpcyBtdWNoIG1vcmUgZWZmaWNpZW50LlxuICAgICAqL1xuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgdmVyLCBjdXJyZW50RW50cnk7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHZlciA9IF8uX3ZlcnNpb247XG4gICAgICAgICAgICBjdXJyZW50RW50cnkgPSBfLl9lbnRyaWVzLmZpcnN0O1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRFbnRyeSkge1xuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcik7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyBrZXk6IGN1cnJlbnRFbnRyeS5rZXksIHZhbHVlOiBjdXJyZW50RW50cnkudmFsdWUgfTtcbiAgICAgICAgICAgICAgICBjdXJyZW50RW50cnkgPSBjdXJyZW50RW50cnkubmV4dCB8fCBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRLZXlzKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBlID0gXy5fZW50cmllcyAmJiBfLl9lbnRyaWVzLmZpcnN0O1xuICAgICAgICB3aGlsZSAoZSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goZS5rZXkpO1xuICAgICAgICAgICAgZSA9IGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBnZXRWYWx1ZXMoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IGUgPSBfLl9lbnRyaWVzICYmIF8uX2VudHJpZXMuZmlyc3Q7XG4gICAgICAgIHdoaWxlIChlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChlLnZhbHVlKTtcbiAgICAgICAgICAgIGUgPSBlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBEaWN0aW9uYXJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGljdGlvbmFyeS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9EaWN0aW9uYXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCIuLi9UZXh0L1V0aWxpdHlcIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJTVBPUlRBTlQgTk9URVMgQUJPVVQgUEVSRk9STUFOQ0U6XG4gKiBodHRwOi8vanNwZXJmLmNvbS9zaW11bGF0aW5nLWEtcXVldWVcbiAqXG4gKiBBZGRpbmcgdG8gYW4gYXJyYXkgaXMgdmVyeSBmYXN0LCBidXQgbW9kaWZ5aW5nIGlzIHNsb3cuXG4gKiBMaW5rZWRMaXN0IHdpbnMgd2hlbiBtb2RpZnlpbmcgY29udGVudHMuXG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2Njg4NC9hcnJheS12ZXJzdXMtbGlua2VkLWxpc3RcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VmdWwgZm9yIG1hbmFnaW5nIGEgbGlzdCBvZiBsaW5rZWQgbm9kZXMsIGJ1dCBpdCBkb2VzIG5vdCBwcm90ZWN0IGFnYWluc3QgbW9kaWZ5aW5nIGluZGl2aWR1YWwgbGlua3MuXG4gKiBJZiB0aGUgY29uc3VtZXIgbW9kaWZpZXMgYSBsaW5rIChzZXRzIHRoZSBwcmV2aW91cyBvciBuZXh0IHZhbHVlKSBpdCB3aWxsIGVmZmVjdGl2ZWx5IGJyZWFrIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIEl0IGlzIHBvc3NpYmxlIHRvIGRlY2xhcmUgYSBub2RlIHR5cGUgb2YgYW55IGtpbmQgYXMgbG9uZyBhcyBpdCBjb250YWlucyBhIHByZXZpb3VzIGFuZCBuZXh0IHZhbHVlIHRoYXQgY2FuIHJlZmVyZW5jZSBhbm90aGVyIG5vZGUuXG4gKiBBbHRob3VnaCBub3QgYXMgc2FmZSBhcyB0aGUgaW5jbHVkZWQgTGlua2VkTGlzdCwgdGhpcyBjbGFzcyBoYXMgbGVzcyBvdmVyaGVhZCBhbmQgaXMgbW9yZSBmbGV4aWJsZS5cbiAqXG4gKiBUaGUgY291bnQgKG9yIGxlbmd0aCkgb2YgdGhpcyBMaW5rZWROb2RlTGlzdCBpcyBub3QgdHJhY2tlZCBzaW5jZSBpdCBjb3VsZCBiZSBjb3JydXB0ZWQgYXQgYW55IHRpbWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaW5rZWROb2RlTGlzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGFzdCA9IG51bGw7XG4gICAgICAgIHRoaXMudW5zYWZlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gMDtcbiAgICB9XG4gICAgYXNzZXJ0VmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgICAgIGlmICh2ZXJzaW9uICE9PSB0aGlzLl92ZXJzaW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDb2xsZWN0aW9uIHdhcyBtb2RpZmllZC5cIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZmlyc3Qgbm9kZS4gIFdpbGwgYmUgbnVsbCBpZiB0aGUgY29sbGVjdGlvbiBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBnZXQgZmlyc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGxhc3Qgbm9kZS5cbiAgICAgKi9cbiAgICBnZXQgbGFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGl2ZWx5IGNvdW50cyB0aGUgbnVtYmVyIG9mIGxpbmtlZCBub2RlcyBhbmQgcmV0dXJucyB0aGUgdmFsdWUuXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgY291bnQoKSB7XG4gICAgICAgIGxldCBuZXh0ID0gdGhpcy5fZmlyc3Q7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIG5leHQgPSBuZXh0Lm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uLCBpZ25vcmVWZXJzaW9uaW5nKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgY3VycmVudCA9IG51bGwsIG5leHQgPSBfLmZpcnN0OyAvLyBCZSBzdXJlIHRvIHRyYWNrIHRoZSBuZXh0IG5vZGUgc28gaWYgY3VycmVudCBub2RlIGlzIHJlbW92ZWQuXG4gICAgICAgIGNvbnN0IHZlcnNpb24gPSBfLl92ZXJzaW9uO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoIWlnbm9yZVZlcnNpb25pbmcpXG4gICAgICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcnNpb24pO1xuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICBuZXh0ID0gY3VycmVudCAmJiBjdXJyZW50Lm5leHQ7XG4gICAgICAgIH0gd2hpbGUgKGN1cnJlbnRcbiAgICAgICAgICAgICYmIGFjdGlvbihjdXJyZW50LCBpbmRleCsrKSAhPT0gZmFsc2UpO1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIG1hcChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoIXNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignc2VsZWN0b3InKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMuZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goc2VsZWN0b3Iobm9kZSwgaSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXJhc2VzIHRoZSBsaW5rZWQgbm9kZSdzIHJlZmVyZW5jZXMgdG8gZWFjaCBvdGhlciBhbmQgcmV0dXJucyB0aGUgbnVtYmVyIG9mIG5vZGVzLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgbiwgY0YgPSAwLCBjTCA9IDA7XG4gICAgICAgIC8vIEZpcnN0LCBjbGVhciBpbiB0aGUgZm9yd2FyZCBkaXJlY3Rpb24uXG4gICAgICAgIG4gPSBfLl9maXJzdDtcbiAgICAgICAgXy5fZmlyc3QgPSBudWxsO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgICAgY0YrKztcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gbjtcbiAgICAgICAgICAgIG4gPSBuLm5leHQ7XG4gICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIExhc3QsIGNsZWFyIGluIHRoZSByZXZlcnNlIGRpcmVjdGlvbi5cbiAgICAgICAgbiA9IF8uX2xhc3Q7XG4gICAgICAgIF8uX2xhc3QgPSBudWxsO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgICAgY0wrKztcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gbjtcbiAgICAgICAgICAgIG4gPSBuLnByZXZpb3VzO1xuICAgICAgICAgICAgY3VycmVudC5wcmV2aW91cyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNGICE9PSBjTClcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTGlua2VkTm9kZUxpc3Q6IEZvcndhcmQgdmVyc3VzIHJldmVyc2UgY291bnQgZG9lcyBub3QgbWF0Y2ggd2hlbiBjbGVhcmluZy4gRm9yd2FyZDogJyArIGNGICsgXCIsIFJldmVyc2U6IFwiICsgY0wpO1xuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gY0Y7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgbGlzdC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBsaXN0IHRvIHNlZSBpZiBhIG5vZGUgZXhpc3RzLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnMobm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKG5vZGUpICE9IC0xO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbmRleCBvZiBhIHBhcnRpY3VsYXIgbm9kZS5cbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKi9cbiAgICBnZXROb2RlQXQoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgbmV4dCA9IHRoaXMuX2ZpcnN0O1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChuZXh0ICYmIGkrKyA8IGluZGV4KSB7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dC5uZXh0IHx8IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfVxuICAgIGZpbmQoY29uZGl0aW9uKSB7XG4gICAgICAgIGxldCBub2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5mb3JFYWNoKChuLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZGl0aW9uKG4sIGkpKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG47XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBsaXN0IHRvIGZpbmQgdGhlIHNwZWNpZmllZCBub2RlIGFuZCByZXR1cm5zIGl0cyBpbmRleC5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGluZGV4T2Yobm9kZSkge1xuICAgICAgICBpZiAobm9kZSAmJiAobm9kZS5wcmV2aW91cyB8fCBub2RlLm5leHQpKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IGMsIG4gPSB0aGlzLl9maXJzdDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBjID0gbjtcbiAgICAgICAgICAgICAgICBpZiAoYyA9PT0gbm9kZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9IHdoaWxlICgobiA9IGMgJiYgYy5uZXh0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBmaXJzdCBub2RlIGFuZCByZXR1cm5zIHRydWUgaWYgc3VjY2Vzc2Z1bC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVGaXJzdCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZmlyc3QgJiYgdGhpcy5yZW1vdmVOb2RlKHRoaXMuX2ZpcnN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGFzdCBub2RlIGFuZCByZXR1cm5zIHRydWUgaWYgc3VjY2Vzc2Z1bC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVMYXN0KCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9sYXN0ICYmIHRoaXMucmVtb3ZlTm9kZSh0aGlzLl9sYXN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIG5vZGUuXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHN1Y2Nlc3NmdWwgYW5kIGZhbHNlIGlmIG5vdCBmb3VuZCAoYWxyZWFkeSByZW1vdmVkKS5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHJlbW92ZU5vZGUobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbm9kZScpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcHJldiA9IG5vZGUucHJldmlvdXMgfHwgbnVsbCwgbmV4dCA9IG5vZGUubmV4dCB8fCBudWxsO1xuICAgICAgICBsZXQgYSA9IGZhbHNlLCBiID0gZmFsc2U7XG4gICAgICAgIGlmIChwcmV2KVxuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV4dDtcbiAgICAgICAgZWxzZSBpZiAoXy5fZmlyc3QgPT0gbm9kZSlcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gbmV4dDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYSA9IHRydWU7XG4gICAgICAgIGlmIChuZXh0KVxuICAgICAgICAgICAgbmV4dC5wcmV2aW91cyA9IHByZXY7XG4gICAgICAgIGVsc2UgaWYgKF8uX2xhc3QgPT0gbm9kZSlcbiAgICAgICAgICAgIF8uX2xhc3QgPSBwcmV2O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBiID0gdHJ1ZTtcbiAgICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbignbm9kZScsIGZvcm1hdChcIlByb3ZpZGVkIG5vZGUgaXMgaGFzIG5vIHswfSByZWZlcmVuY2UgYnV0IGlzIG5vdCB0aGUgezF9IG5vZGUhXCIsIGEgPyBcInByZXZpb3VzXCIgOiBcIm5leHRcIiwgYSA/IFwiZmlyc3RcIiA6IFwibGFzdFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9ICFhICYmICFiO1xuICAgICAgICBpZiAocmVtb3ZlZCkge1xuICAgICAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICAgICAgXy51bnNhZmVDb3VudC0tO1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IG51bGw7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMge0xpbmtlZE5vZGVMaXN0fVxuICAgICAqL1xuICAgIGFkZE5vZGUobm9kZSkge1xuICAgICAgICB0aGlzLmFkZE5vZGVBZnRlcihub2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBub2RlIGJlZm9yZSB0aGUgc3BlY2lmaWVkICdiZWZvcmUnIG5vZGUuXG4gICAgICogSWYgbm8gJ2JlZm9yZScgbm9kZSBpcyBzcGVjaWZpZWQsIGl0IGluc2VydHMgaXQgYXMgdGhlIGZpcnN0IG5vZGUuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcGFyYW0gYmVmb3JlXG4gICAgICogQHJldHVybnMge0xpbmtlZE5vZGVMaXN0fVxuICAgICAqL1xuICAgIGFkZE5vZGVCZWZvcmUobm9kZSwgYmVmb3JlID0gbnVsbCkge1xuICAgICAgICBhc3NlcnRWYWxpZERldGFjaGVkKG5vZGUpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFiZWZvcmUpIHtcbiAgICAgICAgICAgIGJlZm9yZSA9IF8uX2ZpcnN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChiZWZvcmUpIHtcbiAgICAgICAgICAgIGxldCBwcmV2ID0gYmVmb3JlLnByZXZpb3VzO1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IHByZXY7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBiZWZvcmU7XG4gICAgICAgICAgICBiZWZvcmUucHJldmlvdXMgPSBub2RlO1xuICAgICAgICAgICAgaWYgKHByZXYpXG4gICAgICAgICAgICAgICAgcHJldi5uZXh0ID0gbm9kZTtcbiAgICAgICAgICAgIGlmIChiZWZvcmUgPT0gXy5fZmlyc3QpXG4gICAgICAgICAgICAgICAgXy5fZmlyc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgXy5fZmlyc3QgPSBfLl9sYXN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQrKztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBub2RlIGFmdGVyIHRoZSBzcGVjaWZpZWQgJ2FmdGVyJyBub2RlLlxuICAgICAqIElmIG5vICdhZnRlcicgbm9kZSBpcyBzcGVjaWZpZWQsIGl0IGFwcGVuZHMgaXQgYXMgdGhlIGxhc3Qgbm9kZS5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSBhZnRlclxuICAgICAqIEByZXR1cm5zIHtMaW5rZWROb2RlTGlzdH1cbiAgICAgKi9cbiAgICBhZGROb2RlQWZ0ZXIobm9kZSwgYWZ0ZXIgPSBudWxsKSB7XG4gICAgICAgIGFzc2VydFZhbGlkRGV0YWNoZWQobm9kZSk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIWFmdGVyKSB7XG4gICAgICAgICAgICBhZnRlciA9IF8uX2xhc3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFmdGVyKSB7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IGFmdGVyLm5leHQ7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBuZXh0O1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IGFmdGVyO1xuICAgICAgICAgICAgYWZ0ZXIubmV4dCA9IG5vZGU7XG4gICAgICAgICAgICBpZiAobmV4dClcbiAgICAgICAgICAgICAgICBuZXh0LnByZXZpb3VzID0gbm9kZTtcbiAgICAgICAgICAgIGlmIChhZnRlciA9PSBfLl9sYXN0KVxuICAgICAgICAgICAgICAgIF8uX2xhc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgXy5fZmlyc3QgPSBfLl9sYXN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQrKztcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIGFuZCBleGlzdGluZyBub2RlIGFuZCByZXBsYWNlcyBpdC5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSByZXBsYWNlbWVudFxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgcmVwbGFjZShub2RlLCByZXBsYWNlbWVudCkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbm9kZScpO1xuICAgICAgICBpZiAobm9kZSA9PSByZXBsYWNlbWVudClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBhc3NlcnRWYWxpZERldGFjaGVkKHJlcGxhY2VtZW50LCAncmVwbGFjZW1lbnQnKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJlcGxhY2VtZW50LnByZXZpb3VzID0gbm9kZS5wcmV2aW91cztcbiAgICAgICAgcmVwbGFjZW1lbnQubmV4dCA9IG5vZGUubmV4dDtcbiAgICAgICAgaWYgKG5vZGUucHJldmlvdXMpXG4gICAgICAgICAgICBub2RlLnByZXZpb3VzLm5leHQgPSByZXBsYWNlbWVudDtcbiAgICAgICAgaWYgKG5vZGUubmV4dClcbiAgICAgICAgICAgIG5vZGUubmV4dC5wcmV2aW91cyA9IHJlcGxhY2VtZW50O1xuICAgICAgICBpZiAobm9kZSA9PSBfLl9maXJzdClcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgIGlmIChub2RlID09IF8uX2xhc3QpXG4gICAgICAgICAgICBfLl9sYXN0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIHN0YXRpYyB2YWx1ZUVudW1lcmF0b3JGcm9tKGxpc3QpIHtcbiAgICAgICAgaWYgKCFsaXN0KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbGlzdCcpO1xuICAgICAgICBsZXQgY3VycmVudCwgbmV4dCwgdmVyc2lvbjtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGFuY2hvci4uLlxuICAgICAgICAgICAgY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgICBuZXh0ID0gbGlzdC5maXJzdDtcbiAgICAgICAgICAgIHZlcnNpb24gPSBsaXN0Ll92ZXJzaW9uO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBsaXN0LmFzc2VydFZlcnNpb24odmVyc2lvbik7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICAgICAgbmV4dCA9IGN1cnJlbnQgJiYgY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGNvcHlWYWx1ZXMobGlzdCwgYXJyYXksIGluZGV4ID0gMCkge1xuICAgICAgICBpZiAobGlzdCAmJiBsaXN0LmZpcnN0KSB7XG4gICAgICAgICAgICBpZiAoIWFycmF5KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5Jyk7XG4gICAgICAgICAgICBsaXN0LmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBhcnJheVtpbmRleCArIGldID0gbm9kZS52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG59XG5mdW5jdGlvbiBhc3NlcnRWYWxpZERldGFjaGVkKG5vZGUsIHByb3BOYW1lID0gJ25vZGUnKSB7XG4gICAgaWYgKG5vZGUgPT0gbnVsbClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihwcm9wTmFtZSk7XG4gICAgaWYgKG5vZGUubmV4dCB8fCBub2RlLnByZXZpb3VzKVxuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNhbm5vdCBhZGQgYSBub2RlIHRvIGEgTGlua2VkTm9kZUxpc3QgdGhhdCBpcyBhbHJlYWR5IGxpbmtlZC5cIik7XG59XG5leHBvcnQgZGVmYXVsdCBMaW5rZWROb2RlTGlzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbmtlZE5vZGVMaXN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvTGlua2VkTm9kZUxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5jb25zdCBOVUxMID0gXCJudWxsXCIsIEdFVF9TWU1CT0wgPSBcImdldFN5bWJvbFwiLCBHRVRfSEFTSF9DT0RFID0gXCJnZXRIYXNoQ29kZVwiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldElkZW50aWZpZXIob2JqLCB0aHJvd0lmVW5rbm93biA9IGZhbHNlKSB7XG4gICAgaWYgKFR5cGUuaXNQcm9wZXJ0eUtleShvYmopKVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIGlmIChvYmogPT09IG51bGwpXG4gICAgICAgIHJldHVybiBOVUxMO1xuICAgIGlmIChvYmogPT09IFZPSUQwKVxuICAgICAgICByZXR1cm4gVHlwZS5VTkRFRklORUQ7XG4gICAgLy8gU2VlIElTeW1ib2xpemFibGUuXG4gICAgaWYgKFR5cGUuaGFzTWV0aG9kKG9iaiwgR0VUX1NZTUJPTCkpIHtcbiAgICAgICAgcmV0dXJuIG9iai5nZXRTeW1ib2woKTtcbiAgICB9XG4gICAgLy8gU2VlIElIYXNoYWJsZS5cbiAgICBpZiAoVHlwZS5oYXNNZXRob2Qob2JqLCBHRVRfSEFTSF9DT0RFKSkge1xuICAgICAgICByZXR1cm4gb2JqLmdldEhhc2hDb2RlKCk7XG4gICAgfVxuICAgIGlmICh0aHJvd0lmVW5rbm93bikge1xuICAgICAgICBpZiAoVHlwZS5pc0Z1bmN0aW9uKHRocm93SWZVbmtub3duKSlcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0lmVW5rbm93bihvYmopO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aHJvdyBcIkNhbm5vdCBjcmVhdGUga25vd24gaWRlbnRpdHkuXCI7XG4gICAgfVxuICAgIHJldHVybiAodHlwZW9mIG9iai50b1N0cmluZyA9PSBUeXBlLkZVTkNUSU9OKVxuICAgICAgICA/IG9iai50b1N0cmluZygpXG4gICAgICAgIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG59XG5leHBvcnQgZGVmYXVsdCBnZXRJZGVudGlmaWVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2V0SWRlbnRpZmllci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9nZXRJZGVudGlmaWVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tIFwiLi4vRW51bWVyYXRpb24vRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkJhc2UgfSBmcm9tIFwiLi4vQ29sbGVjdGlvbkJhc2VcIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBleHRyYWN0S2V5VmFsdWUgfSBmcm9tIFwiLi4vLi4vS2V5VmFsdWVFeHRyYWN0XCI7XG5pbXBvcnQgeyBLZXlOb3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9LZXlOb3RGb3VuZEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbi8vIERlc2lnbiBOb3RlOiBTaG91bGQgRGljdGlvbmFyeUFic3RyYWN0QmFzZSBiZSBJRGlzcG9zYWJsZT9cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5QmFzZSBleHRlbmRzIENvbGxlY3Rpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICAgICAgc3VwZXIoc291cmNlKTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfb25WYWx1ZU1vZGlmaWVkKGtleSwgdmFsdWUsIG9sZCkge1xuICAgIH1cbiAgICBfYWRkSW50ZXJuYWwoaXRlbSkge1xuICAgICAgICBpZiAoIWl0ZW0pXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdpdGVtJywgJ0RpY3Rpb25hcmllcyBtdXN0IHVzZSBhIHZhbGlkIGtleS92YWx1ZSBwYWlyLiBcXCcnICsgaXRlbSArICdcXCcgaXMgbm90IGFsbG93ZWQuJyk7XG4gICAgICAgIHJldHVybiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgKGtleSwgdmFsdWUpID0+IHRoaXMuYWRkQnlLZXlWYWx1ZShrZXksIHZhbHVlKSk7XG4gICAgfVxuICAgIF9jbGVhckludGVybmFsKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIF8ua2V5cykge1xuICAgICAgICAgICAgaWYgKF8ucmVtb3ZlQnlLZXkoa2V5KSlcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG4gICAgY29udGFpbnMoaXRlbSkge1xuICAgICAgICAvLyBTaG91bGQgbmV2ZXIgaGF2ZSBhIG51bGwgb2JqZWN0IGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICBpZiAoIWl0ZW0gfHwgIXRoaXMuZ2V0Q291bnQoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RLZXlWYWx1ZShpdGVtLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgLy8gTGVhdmUgYXMgdmFyaWFibGUgZm9yIGRlYnVnZ2luZy4uLlxuICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICByZXR1cm4gYXJlRXF1YWwodmFsdWUsIHYpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3JlbW92ZUludGVybmFsKGl0ZW0pIHtcbiAgICAgICAgaWYgKCFpdGVtKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIHJldHVybiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIC8vIExlYXZlIGFzIHZhcmlhYmxlIGZvciBkZWJ1Z2dpbmcuLi5cbiAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWYWx1ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIChhcmVFcXVhbCh2YWx1ZSwgdikgJiYgdGhpcy5yZW1vdmVCeUtleShrZXkpKVxuICAgICAgICAgICAgICAgID8gMSA6IDA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQga2V5cygpIHsgcmV0dXJuIHRoaXMuZ2V0S2V5cygpOyB9XG4gICAgZ2V0IHZhbHVlcygpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWVzKCk7IH1cbiAgICBhZGRCeUtleVZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBWT0lEMClcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ2Fubm90IGFkZCAndW5kZWZpbmVkJyBhcyBhIHZhbHVlLlwiKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmIChfLmNvbnRhaW5zS2V5KGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ID0gbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJBZGRpbmcgYSBrZXkvdmFsdWUgd2hlbiB0aGUga2V5IGFscmVhZHkgZXhpc3RzLlwiKTtcbiAgICAgICAgICAgIGV4LmRhdGFbJ2tleSddID0ga2V5O1xuICAgICAgICAgICAgZXguZGF0YVsndmFsdWUnXSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhyb3cgZXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8uc2V0VmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIGdldEFzc3VyZWRWYWx1ZShrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gVk9JRDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgS2V5Tm90Rm91bmRFeGNlcHRpb24oYEtleSAnJHtrZXl9JyBub3QgZm91bmQuYCk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdHJ5R2V0VmFsdWUoa2V5LCBvdXQpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gVk9JRDApIHtcbiAgICAgICAgICAgIG91dCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIGFuIGVudHJ5LlxuICAgICAqIEl0J3MgaW1wb3J0YW50IHRvIGtub3cgdGhhdCAndW5kZWZpbmVkJyBjYW5ub3QgZXhpc3QgYXMgYSB2YWx1ZSBpbiB0aGUgZGljdGlvbmFyeSBhbmQgaXMgdXNlZCBhcyBhIGZsYWcgZm9yIHJlbW92YWwuXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHNldFZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgLy8gc2V0VmFsdWUgc2hvdWxkbid0IG5lZWQgdG8gd29ycnkgYWJvdXQgcmVjdXJzaW9uLi4uXG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgb2xkID0gXy5nZXRWYWx1ZShrZXkpOyAvLyBnZXQgdGhlIG9sZCB2YWx1ZSBoZXJlIGFuZCBwYXNzIHRvIGludGVybmFsLlxuICAgICAgICBpZiAoIWFyZUVxdWFsKHZhbHVlLCBvbGQpICYmIF8uX3NldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgXy5fb25WYWx1ZU1vZGlmaWVkKGtleSwgdmFsdWUsIG9sZCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKGNoYW5nZWQpO1xuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG4gICAgY29udGFpbnNLZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2dldEVudHJ5KGtleSk7XG4gICAgfVxuICAgIGNvbnRhaW5zVmFsdWUodmFsdWUpIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICB3aGlsZSAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBpZiAoYXJlRXF1YWwoZS5jdXJyZW50LCB2YWx1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJlbW92ZUJ5S2V5KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRWYWx1ZShrZXksIFZPSUQwKTtcbiAgICB9XG4gICAgcmVtb3ZlQnlWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIF8uZ2V0S2V5cygpKSB7XG4gICAgICAgICAgICBpZiAoYXJlRXF1YWwoXy5nZXRWYWx1ZShrZXkpLCB2YWx1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBfLnJlbW92ZUJ5S2V5KGtleSk7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuICAgIGltcG9ydEVudHJpZXMocGFpcnMpIHtcbiAgICAgICAgLy8gQWxsb3cgcGlwaW5nIHRocm91Z2ggdG8gdHJpZ2dlciBvbk1vZGlmaWVkIHByb3Blcmx5LlxuICAgICAgICByZXR1cm4gc3VwZXIuaW1wb3J0RW50cmllcyhwYWlycyk7XG4gICAgfVxuICAgIF9pbXBvcnRFbnRyaWVzKHBhaXJzKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIXBhaXJzKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGxldCBjaGFuZ2VkID0gMDtcbiAgICAgICAgZm9yRWFjaChwYWlycywgcGFpciA9PiBleHRyYWN0S2V5VmFsdWUocGFpciwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChfLl9zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpKVxuICAgICAgICAgICAgICAgIGNoYW5nZWQrKztcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCB2ZXIsIGtleXMsIGxlbiwgaW5kZXggPSAwO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICB2ZXIgPSBfLl92ZXJzaW9uOyAvLyBUcmFjayB0aGUgdmVyc2lvbiBzaW5jZSBnZXRLZXlzIGlzIGEgY29weS5cbiAgICAgICAgICAgIGtleXMgPSBfLmdldEtleXMoKTtcbiAgICAgICAgICAgIGxlbiA9IGtleXMubGVuZ3RoO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIF8uYXNzZXJ0VmVyc2lvbih2ZXIpO1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpbmRleCsrXSwgdmFsdWUgPSBfLmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBWT0lEMCkgLy8gU3RpbGwgdmFsaWQ/XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHsga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRGljdGlvbmFyeUJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaWN0aW9uYXJ5QmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9EaWN0aW9uYXJ5QmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG4vLyBOZWVkIHRvIHNwb29mIHRoaXMgc28gV2ViUGFjayBkb2Vzbid0IHBhbmljICh3YXJuaW5ncykuXG5sZXQgcjtcbnRyeSB7XG4gICAgciA9IGV2YWwoJ3JlcXVpcmUnKTtcbn1cbmNhdGNoIChleCkgeyB9XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbmV4cG9ydCBjb25zdCBpc0NvbW1vbkpTID0gISEociAmJiByLnJlc29sdmUpO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5leHBvcnQgY29uc3QgaXNSZXF1aXJlSlMgPSAhIShyICYmIHIudG9VcmwgJiYgci5kZWZpbmVkKTtcbi8qXG4gKiBFbnN1cmUgaXMgaW4gYSByZWFsIE5vZGUgZW52aXJvbm1lbnQsIHdpdGggYSBgcHJvY2Vzcy5uZXh0VGlja2AuXG4gKiBUbyBzZWUgdGhyb3VnaCBmYWtlIE5vZGUgZW52aXJvbm1lbnRzOlxuICogTW9jaGEgdGVzdCBydW5uZXIgLSBleHBvc2VzIGEgYHByb2Nlc3NgIGdsb2JhbCB3aXRob3V0IGEgYG5leHRUaWNrYFxuICogQnJvd3NlcmlmeSAtIGV4cG9zZXMgYSBgcHJvY2Vzcy5uZXhUaWNrYCBmdW5jdGlvbiB0aGF0IHVzZXNcbiAqIGBzZXRUaW1lb3V0YC4gSW4gdGhpcyBjYXNlIGBzZXRJbW1lZGlhdGVgIGlzIHByZWZlcnJlZCBiZWNhdXNlXG4gKiBpdCBpcyBmYXN0ZXIuIEJyb3dzZXJpZnkncyBgcHJvY2Vzcy50b1N0cmluZygpYCB5aWVsZHNcbiAqIFwiW29iamVjdCBPYmplY3RdXCIsIHdoaWxlIGluIGEgcmVhbCBOb2RlIGVudmlyb25tZW50XG4gKiBgcHJvY2Vzcy5uZXh0VGljaygpYCB5aWVsZHMgXCJbb2JqZWN0IHByb2Nlc3NdXCIuXG4gKi9cbmV4cG9ydCBjb25zdCBpc05vZGVKUyA9IHR5cGVvZiBwcm9jZXNzID09IFwib2JqZWN0XCJcbiAgICAmJiBwcm9jZXNzLnRvU3RyaW5nKCkgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiXG4gICAgJiYgcHJvY2Vzcy5uZXh0VGljayAhPSB2b2lkIDA7XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcbnRyeSB7XG4gICAgT2JqZWN0LmZyZWV6ZShleHBvcnRzKTtcbn1cbmNhdGNoIChleCkgeyB9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FbnZpcm9ubWVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Vudmlyb25tZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL1R5cGVzXCI7XG5jb25zdCBWT0lEMCA9IHZvaWQgMCwgRE9UID0gJy4nLCBLRVkgPSAna2V5JywgVkFMVUUgPSAndmFsdWUnLCBJVEVNID0gJ2l0ZW0nLCBJVEVNXzEgPSBJVEVNICsgJ1sxXScsIElURU1fVkFMVUUgPSBJVEVNICsgRE9UICsgVkFMVUUsIElOVkFMSURfS1ZQX01FU1NBR0UgPSAnSW52YWxpZCB0eXBlLiAgTXVzdCBiZSBhIEtleVZhbHVlUGFpciBvciBUdXBsZSBvZiBsZW5ndGggMi4nLCBDQU5OT1RfQkVfVU5ERUZJTkVEID0gJ0Nhbm5vdCBlcXVhbCB1bmRlZmluZWQuJztcbmV4cG9ydCBmdW5jdGlvbiBpc0tleVZhbHVlUGFpcihrdnApIHtcbiAgICByZXR1cm4ga3ZwICYmIGt2cC5oYXNPd25Qcm9wZXJ0eShLRVkpICYmIGt2cC5oYXNPd25Qcm9wZXJ0eShWQUxVRSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0S2V5KGtleSwgbmFtZSA9IElURU0pIHtcbiAgICBhc3NlcnROb3RVbmRlZmluZWQoa2V5LCBuYW1lICsgRE9UICsgS0VZKTtcbiAgICBpZiAoa2V5ID09PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKG5hbWUgKyBET1QgKyBLRVkpO1xuICAgIHJldHVybiBrZXk7XG59XG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0VHVwbGUodHVwbGUsIG5hbWUgPSBJVEVNKSB7XG4gICAgaWYgKHR1cGxlLmxlbmd0aCAhPSAyKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24obmFtZSwgJ0tleVZhbHVlUGFpciB0dXBsZXMgbXVzdCBiZSBvZiBsZW5ndGggMi4nKTtcbiAgICBhc3NlcnRLZXkodHVwbGVbMF0sIG5hbWUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE5vdFVuZGVmaW5lZCh2YWx1ZSwgbmFtZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gVk9JRDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihuYW1lLCBDQU5OT1RfQkVfVU5ERUZJTkVEKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEtleVZhbHVlKGl0ZW0sIHRvKSB7XG4gICAgbGV0IGtleSwgdmFsdWU7XG4gICAgaWYgKFR5cGUuaXNBcnJheUxpa2UoaXRlbSkpIHtcbiAgICAgICAgYXNzZXJ0VHVwbGUoaXRlbSk7XG4gICAgICAgIGtleSA9IGl0ZW1bMF07XG4gICAgICAgIHZhbHVlID0gYXNzZXJ0Tm90VW5kZWZpbmVkKGl0ZW1bMV0sIElURU1fMSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzS2V5VmFsdWVQYWlyKGl0ZW0pKSB7XG4gICAgICAgIGtleSA9IGFzc2VydEtleShpdGVtLmtleSk7XG4gICAgICAgIHZhbHVlID0gYXNzZXJ0Tm90VW5kZWZpbmVkKGl0ZW0udmFsdWUsIElURU1fVkFMVUUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKElURU0sIElOVkFMSURfS1ZQX01FU1NBR0UpO1xuICAgIH1cbiAgICByZXR1cm4gdG8oa2V5LCB2YWx1ZSk7XG59XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0S2V5VmFsdWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1LZXlWYWx1ZUV4dHJhY3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9LZXlWYWx1ZUV4dHJhY3QuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvc3lzdGVtLmNvbGxlY3Rpb25zLmdlbmVyaWMuS2V5Tm90Rm91bmRFeGNlcHRpb24odj12cy4xMTApLmFzcHhcbiAqL1xuaW1wb3J0IHsgU3lzdGVtRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvU3lzdGVtRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnS2V5Tm90Rm91bmRFeGNlcHRpb24gJztcbmV4cG9ydCBjbGFzcyBLZXlOb3RGb3VuZEV4Y2VwdGlvbiBleHRlbmRzIFN5c3RlbUV4Y2VwdGlvbiB7XG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgS2V5Tm90Rm91bmRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1LZXlOb3RGb3VuZEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0tleU5vdEZvdW5kRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBCYXNlZCBVcG9uOiBodHRwOi8vcmVmZXJlbmNlc291cmNlLm1pY3Jvc29mdC5jb20vI1N5c3RlbS9Db21wTW9kL3N5c3RlbS9jb2xsZWN0aW9ucy9nZW5lcmljL3F1ZXVlLmNzXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgYXJlRXF1YWwgfSBmcm9tIFwiLi4vQ29tcGFyZVwiO1xuaW1wb3J0ICogYXMgQVUgZnJvbSBcIi4vQXJyYXkvVXRpbGl0eVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuLi9JbnRlZ2VyXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL05vdEltcGxlbWVudGVkRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9uQmFzZSB9IGZyb20gXCIuL0NvbGxlY3Rpb25CYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuY29uc3QgTUlOSU1VTV9HUk9XID0gNDtcbmNvbnN0IFNIUklOS19USFJFU0hPTEQgPSAzMjsgLy8gVW51c2VkP1xuLy8gdmFyIEdST1dfRkFDVE9SOiBudW1iZXIgPSAyMDA7ICAvLyBkb3VibGUgZWFjaCB0aW1lXG5jb25zdCBHUk9XX0ZBQ1RPUl9IQUxGID0gMTAwO1xuY29uc3QgREVGQVVMVF9DQVBBQ0lUWSA9IE1JTklNVU1fR1JPVztcbmNvbnN0IGVtcHR5QXJyYXkgPSBPYmplY3QuZnJlZXplKFtdKTtcbmV4cG9ydCBjbGFzcyBRdWV1ZSBleHRlbmRzIENvbGxlY3Rpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UsIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgICAgICBzdXBlcihWT0lEMCwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgICAgIHRoaXMuX2hlYWQgPSAwO1xuICAgICAgICB0aGlzLl90YWlsID0gMDtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IDA7XG4gICAgICAgIGlmICghc291cmNlKVxuICAgICAgICAgICAgdGhpcy5fYXJyYXkgPSBlbXB0eUFycmF5O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChUeXBlLmlzTnVtYmVyKHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXBhY2l0eSA9IHNvdXJjZTtcbiAgICAgICAgICAgICAgICBhc3NlcnRJbnRlZ2VyWmVyb09yR3JlYXRlcihjYXBhY2l0eSwgXCJjYXBhY2l0eVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcnJheSA9IGNhcGFjaXR5XG4gICAgICAgICAgICAgICAgICAgID8gQVUuaW5pdGlhbGl6ZShjYXBhY2l0eSlcbiAgICAgICAgICAgICAgICAgICAgOiBlbXB0eUFycmF5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2UgPSBzb3VyY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJyYXkgPSBBVS5pbml0aWFsaXplKFR5cGUuaXNBcnJheUxpa2Uoc2UpXG4gICAgICAgICAgICAgICAgICAgID8gc2UubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIDogREVGQVVMVF9DQVBBQ0lUWSk7XG4gICAgICAgICAgICAgICAgdGhpcy5faW1wb3J0RW50cmllcyhzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2FwYWNpdHkgPSB0aGlzLl9hcnJheS5sZW5ndGg7XG4gICAgfVxuICAgIGdldENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG4gICAgX2FkZEludGVybmFsKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHNpemUgPSBfLl9zaXplO1xuICAgICAgICBsZXQgbGVuID0gXy5fY2FwYWNpdHk7XG4gICAgICAgIGlmIChzaXplID09IGxlbikge1xuICAgICAgICAgICAgbGV0IG5ld0NhcGFjaXR5ID0gbGVuICogR1JPV19GQUNUT1JfSEFMRjtcbiAgICAgICAgICAgIGlmIChuZXdDYXBhY2l0eSA8IGxlbiArIE1JTklNVU1fR1JPVylcbiAgICAgICAgICAgICAgICBuZXdDYXBhY2l0eSA9IGxlbiArIE1JTklNVU1fR1JPVztcbiAgICAgICAgICAgIF8uc2V0Q2FwYWNpdHkobmV3Q2FwYWNpdHkpO1xuICAgICAgICAgICAgbGVuID0gXy5fY2FwYWNpdHk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFpbCA9IF8uX3RhaWw7XG4gICAgICAgIF8uX2FycmF5W3RhaWxdID0gaXRlbTtcbiAgICAgICAgXy5fdGFpbCA9ICh0YWlsICsgMSkgJSBsZW47XG4gICAgICAgIF8uX3NpemUgPSBzaXplICsgMTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgX3JlbW92ZUludGVybmFsKGl0ZW0sIG1heCkge1xuICAgICAgICAvL25vaW5zcGVjdGlvbiBIdG1sVW5rbm93blRhZ1xuICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oXCJJQ29sbGVjdGlvblxcPFRcXD4ucmVtb3ZlIGlzIG5vdCBpbXBsZW1lbnRlZCBpbiBRdWV1ZVxcPFRcXD5cIiArXG4gICAgICAgICAgICBcIiBzaW5jZSBpdCB3b3VsZCByZXF1aXJlIGRlc3Ryb3lpbmcgdGhlIHVuZGVybHlpbmcgYXJyYXkgdG8gcmVtb3ZlIHRoZSBpdGVtLlwiKTtcbiAgICB9XG4gICAgX2NsZWFySW50ZXJuYWwoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBhcnJheSA9IF8uX2FycmF5LCBoZWFkID0gXy5faGVhZCwgdGFpbCA9IF8uX3RhaWwsIHNpemUgPSBfLl9zaXplO1xuICAgICAgICBpZiAoaGVhZCA8IHRhaWwpXG4gICAgICAgICAgICBBVS5jbGVhcihhcnJheSwgaGVhZCwgdGFpbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgQVUuY2xlYXIoYXJyYXksIGhlYWQpO1xuICAgICAgICAgICAgQVUuY2xlYXIoYXJyYXksIDAsIHRhaWwpO1xuICAgICAgICB9XG4gICAgICAgIF8uX2hlYWQgPSAwO1xuICAgICAgICBfLl90YWlsID0gMDtcbiAgICAgICAgXy5fc2l6ZSA9IDA7XG4gICAgICAgIF8udHJpbUV4Y2VzcygpO1xuICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBpZiAodGhpcy5fYXJyYXkgIT0gZW1wdHlBcnJheSkge1xuICAgICAgICAgICAgdGhpcy5fYXJyYXkubGVuZ3RoID0gdGhpcy5fY2FwYWNpdHkgPSAwO1xuICAgICAgICAgICAgdGhpcy5fYXJyYXkgPSBlbXB0eUFycmF5O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlcXVldWVzIGVudHJpZXMgaW50byBhbiBhcnJheS5cbiAgICAgKi9cbiAgICBkdW1wKG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgaWYgKGlzRmluaXRlKG1heCkpIHtcbiAgICAgICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihtYXgpO1xuICAgICAgICAgICAgaWYgKG1heCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChtYXgtLSAmJiBfLl90cnlEZXF1ZXVlSW50ZXJuYWwodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKF8uX3RyeURlcXVldWVJbnRlcm5hbCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICB9XG4gICAgICAgIF8udHJpbUV4Y2VzcygpO1xuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmZvckVhY2goYWN0aW9uLCB0cnVlKTtcbiAgICB9XG4gICAgc2V0Q2FwYWNpdHkoY2FwYWNpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGFzc2VydEludGVnZXJaZXJvT3JHcmVhdGVyKGNhcGFjaXR5LCBcImNhcGFjaXR5XCIpO1xuICAgICAgICBjb25zdCBhcnJheSA9IF8uX2FycmF5LCBsZW4gPSBfLl9jYXBhY2l0eTtcbiAgICAgICAgaWYgKGNhcGFjaXR5ID4gbGVuKVxuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKGNhcGFjaXR5ID09IGxlbilcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBjb25zdCBoZWFkID0gXy5faGVhZCwgdGFpbCA9IF8uX3RhaWwsIHNpemUgPSBfLl9zaXplO1xuICAgICAgICAvLyBTcGVjaWFsIGNhc2Ugd2hlcmUgd2UgY2FuIHNpbXBseSBleHRlbmQgdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkuIChKYXZhU2NyaXB0IG9ubHkpXG4gICAgICAgIGlmIChhcnJheSAhPSBlbXB0eUFycmF5ICYmIGNhcGFjaXR5ID4gbGVuICYmIGhlYWQgPCB0YWlsKSB7XG4gICAgICAgICAgICBhcnJheS5sZW5ndGggPSBfLl9jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgICAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgY3JlYXRlIGEgbmV3IGFycmF5IGJlY2F1c2UgbW9kaWZ5aW5nIGFuIGV4aXN0aW5nIG9uZSBjb3VsZCBiZSBzbG93LlxuICAgICAgICBjb25zdCBuZXdBcnJheSA9IEFVLmluaXRpYWxpemUoY2FwYWNpdHkpO1xuICAgICAgICBpZiAoc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGlmIChoZWFkIDwgdGFpbCkge1xuICAgICAgICAgICAgICAgIEFVLmNvcHlUbyhhcnJheSwgbmV3QXJyYXksIGhlYWQsIDAsIHNpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgQVUuY29weVRvKGFycmF5LCBuZXdBcnJheSwgaGVhZCwgMCwgbGVuIC0gaGVhZCk7XG4gICAgICAgICAgICAgICAgQVUuY29weVRvKGFycmF5LCBuZXdBcnJheSwgMCwgbGVuIC0gaGVhZCwgdGFpbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXy5fYXJyYXkgPSBuZXdBcnJheTtcbiAgICAgICAgXy5fY2FwYWNpdHkgPSBjYXBhY2l0eTtcbiAgICAgICAgXy5faGVhZCA9IDA7XG4gICAgICAgIF8uX3RhaWwgPSAoc2l6ZSA9PSBjYXBhY2l0eSkgPyAwIDogc2l6ZTtcbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW5xdWV1ZShpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChpdGVtKTtcbiAgICB9XG4gICAgX3RyeURlcXVldWVJbnRlcm5hbChvdXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zaXplKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBhcnJheSA9IHRoaXMuX2FycmF5LCBoZWFkID0gdGhpcy5faGVhZDtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IHRoaXMuX2FycmF5W2hlYWRdO1xuICAgICAgICBhcnJheVtoZWFkXSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2hlYWQgPSAoaGVhZCArIDEpICUgdGhpcy5fY2FwYWNpdHk7XG4gICAgICAgIHRoaXMuX3NpemUtLTtcbiAgICAgICAgdGhpcy5faW5jcmVtZW50TW9kaWZpZWQoKTtcbiAgICAgICAgb3V0KHJlbW92ZWQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZGVxdWV1ZSh0aHJvd0lmRW1wdHkgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBWT0lEMDtcbiAgICAgICAgaWYgKCF0aGlzLnRyeURlcXVldWUodmFsdWUgPT4geyByZXN1bHQgPSB2YWx1ZTsgfSkgJiYgdGhyb3dJZkVtcHR5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDYW5ub3QgZGVxdWV1ZSBhbiBlbXB0eSBxdWV1ZS5cIik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIHF1ZXVlIGhhcyBlbnRyaWVzIGFuIHB1bGxzIGFuIGVudHJ5IGZyb20gdGhlIGhlYWQgb2YgdGhlIHF1ZXVlIGFuZCBwYXNzZXMgaXQgdG8gdGhlIG91dCBoYW5kbGVyLlxuICAgICAqIEBwYXJhbSBvdXQgVGhlICdvdXQnIGhhbmRsZXIgdGhhdCByZWNlaXZlcyB0aGUgdmFsdWUgaWYgaXQgZXhpc3RzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGEgdmFsdWUgd2FzIHJldHJpZXZlZC4gIEZhbHNlIGlmIG5vdC5cbiAgICAgKi9cbiAgICB0cnlEZXF1ZXVlKG91dCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLl9zaXplKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgLy8gQSBzaW5nbGUgZGVxdWV1ZSBzaG91bGRuJ3QgbmVlZCB1cGRhdGUgcmVjdXJzaW9uIHRyYWNraW5nLi4uXG4gICAgICAgIGlmICh0aGlzLl90cnlEZXF1ZXVlSW50ZXJuYWwob3V0KSkge1xuICAgICAgICAgICAgLy8gVGhpcyBtYXkgcHJlZW1wdGl2ZWx5IHRyaWdnZXIgdGhlIF9vbk1vZGlmaWVkLlxuICAgICAgICAgICAgaWYgKF8uX3NpemUgPCBfLl9jYXBhY2l0eSAvIDIpXG4gICAgICAgICAgICAgICAgXy50cmltRXhjZXNzKFNIUklOS19USFJFU0hPTEQpO1xuICAgICAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF9nZXRFbGVtZW50KGluZGV4KSB7XG4gICAgICAgIGFzc2VydEludGVnZXJaZXJvT3JHcmVhdGVyKGluZGV4LCBcImluZGV4XCIpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgcmV0dXJuIF8uX2FycmF5WyhfLl9oZWFkICsgaW5kZXgpICUgXy5fY2FwYWNpdHldO1xuICAgIH1cbiAgICBwZWVrKHRocm93SWZFbXB0eSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplID09IDApIHtcbiAgICAgICAgICAgIGlmICh0aHJvd0lmRW1wdHkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDYW5ub3QgY2FsbCBwZWVrIG9uIGFuIGVtcHR5IHF1ZXVlLlwiKTtcbiAgICAgICAgICAgIHJldHVybiBWT0lEMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXlbdGhpcy5faGVhZF07XG4gICAgfVxuICAgIHRyaW1FeGNlc3ModGhyZXNob2xkKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgaWYgKHNpemUgPCBNYXRoLmZsb29yKF8uX2NhcGFjaXR5ICogMC45KSAmJiAoIXRocmVzaG9sZCAmJiB0aHJlc2hvbGQgIT09IDAgfHwgaXNOYU4odGhyZXNob2xkKSB8fCB0aHJlc2hvbGQgPCBzaXplKSlcbiAgICAgICAgICAgIF8uc2V0Q2FwYWNpdHkoc2l6ZSk7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgaW5kZXgsIHZlcnNpb24sIHNpemU7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgdmVyc2lvbiA9IF8uX3ZlcnNpb247XG4gICAgICAgICAgICBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBfLmFzc2VydFZlcnNpb24odmVyc2lvbik7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gc2l6ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihfLl9nZXRFbGVtZW50KGluZGV4KyspKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzZXJ0WmVyb09yR3JlYXRlcih2YWx1ZSwgcHJvcGVydHkpIHtcbiAgICBpZiAodmFsdWUgPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKHByb3BlcnR5LCB2YWx1ZSwgXCJNdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvXCIpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gYXNzZXJ0SW50ZWdlclplcm9PckdyZWF0ZXIodmFsdWUsIHByb3BlcnR5KSB7XG4gICAgSW50ZWdlci5hc3NlcnQodmFsdWUsIHByb3BlcnR5KTtcbiAgICByZXR1cm4gYXNzZXJ0WmVyb09yR3JlYXRlcih2YWx1ZSwgcHJvcGVydHkpO1xufVxuZXhwb3J0IGRlZmF1bHQgUXVldWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL1F1ZXVlLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi4vLi4vSW50ZWdlclwiO1xuaW1wb3J0IHsgYXJlRXF1YWwgfSBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tIFwiLi9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBjb3B5LCBjb3B5VG8gfSBmcm9tIFwiLi9jb3B5XCI7XG5leHBvcnQgeyBpbml0aWFsaXplLCBjb3B5LCBjb3B5VG8gfTtcbmNvbnN0IENCTiA9ICdDYW5ub3QgYmUgbnVsbC4nLCBDQjAgPSAnQ2Fubm90IGJlIHplcm8uJywgQ0JMMCA9ICdDYW5ub3QgYmUgbGVzcyB0aGFuIHplcm8uJywgVkZOID0gJ011c3QgYmUgYSB2YWxpZCBmaW5pdGUgbnVtYmVyJztcbi8qKlxuICogQ2hlY2tzIHRvIHNlZSB3aGVyZSB0aGUgcHJvdmlkZWQgYXJyYXkgY29udGFpbnMgYW4gaXRlbS92YWx1ZS5cbiAqIElmIHRoZSBhcnJheSB2YWx1ZSBpcyBudWxsLCB0aGVuIC0xIGlzIHJldHVybmVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gaXRlbVxuICogQHBhcmFtIHtmdW5jdGlvbj99IGVxdWFsaXR5Q29tcGFyZXJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICBjb25zdCBsZW4gPSBhcnJheSAmJiBhcnJheS5sZW5ndGg7XG4gICAgaWYgKGxlbikge1xuICAgICAgICAvLyBOYU4gTkVWRVIgZXZhbHVhdGVzIGl0cyBlcXVhbGl0eSBzbyBiZSBjYXJlZnVsLlxuICAgICAgICBpZiAoZXF1YWxpdHlDb21wYXJlciA9PSBhcmVFcXVhbCAmJiAoYXJyYXkpIGluc3RhbmNlb2YgKEFycmF5KSAmJiAhVHlwZS5pc1RydWVOYU4oaXRlbSkpXG4gICAgICAgICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgLy8gJ2FyZUVxdWFsJyBpbmNsdWRlcyBOYU49PU5hTiBldmFsdWF0aW9uLlxuICAgICAgICAgICAgaWYgKGVxdWFsaXR5Q29tcGFyZXIoYXJyYXlbaV0sIGl0ZW0pKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbi8qKlxuICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgcHJvdmlkZWQgYXJyYXkgY29udGFpbnMgYW4gaXRlbS5cbiAqIElmIHRoZSBhcnJheSB2YWx1ZSBpcyBudWxsLCB0aGVuIGZhbHNlIGlzIHJldHVybmVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gaXRlbVxuICogQHBhcmFtIHtmdW5jdGlvbj99IGVxdWFsaXR5Q29tcGFyZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyKSAhPSAtMTtcbn1cbi8qKlxuICogRmluZHMgYW5kIHJlcGxhY2VzIGEgdmFsdWUgZnJvbSBhbiBhcnJheS4gIFdpbGwgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyB1bmxlc3MgYSBtYXhpbXVtIGlzIHNwZWNpZmllZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIG9sZFxuICogQHBhcmFtIG5ld1ZhbHVlXG4gKiBAcGFyYW0gbWF4XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShhcnJheSwgb2xkLCBuZXdWYWx1ZSwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoIWFycmF5IHx8ICFhcnJheS5sZW5ndGggfHwgbWF4ID09PSAwKVxuICAgICAgICByZXR1cm4gMDtcbiAgICBpZiAobWF4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbWF4JywgbWF4LCBDQkwwKTtcbiAgICBpZiAoIW1heClcbiAgICAgICAgbWF4ID0gSW5maW5pdHk7IC8vIGp1c3QgaW4gY2FzZS5cbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoYXJyYXlbaV0gPT09IG9sZCkge1xuICAgICAgICAgICAgYXJyYXlbaV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICBpZiAoY291bnQgPT0gbWF4KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbn1cbi8qKlxuICogUmVwbGFjZXMgdmFsdWVzIG9mIGFuIGFycmF5IGFjcm9zcyBhIHJhbmdlIG9mIGluZGV4ZXMuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIHN0YXJ0XG4gKiBAcGFyYW0gc3RvcFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUmFuZ2UoYXJyYXksIHZhbHVlLCBzdGFydCA9IDAsIHN0b3ApIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICByZXR1cm47XG4gICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKHN0YXJ0LCAnc3RhcnQnKTtcbiAgICBpZiAoIXN0b3AgJiYgc3RvcCAhPT0gMClcbiAgICAgICAgc3RvcCA9IGFycmF5Lmxlbmd0aDtcbiAgICBJbnRlZ2VyLmFzc2VydChzdG9wLCAnc3RvcCcpO1xuICAgIGlmIChzdG9wIDwgc3RhcnQpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdG9wXCIsIHN0b3AsIFwiaXMgbGVzcyB0aGFuIHN0YXJ0XCIpO1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHN0b3A7IGkrKykge1xuICAgICAgICBhcnJheVtpXSA9IHZhbHVlO1xuICAgIH1cbn1cbi8qKlxuICogQ2xlYXJzIChzZXRzIHRvIG51bGwpIHZhbHVlcyBvZiBhbiBhcnJheSBhY3Jvc3MgYSByYW5nZSBvZiBpbmRleGVzLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gc3RhcnRcbiAqIEBwYXJhbSBzdG9wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhcihhcnJheSwgc3RhcnQgPSAwLCBzdG9wKSB7XG4gICAgdXBkYXRlUmFuZ2UoYXJyYXksIG51bGwsIHN0YXJ0LCBzdG9wKTtcbn1cbi8qKlxuICogRW5zdXJlcyBhIHZhbHVlIGV4aXN0cyB3aXRoaW4gYW4gYXJyYXkuICBJZiBub3QgZm91bmQsIGFkZHMgdG8gdGhlIGVuZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIGl0ZW1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBlcXVhbGl0eUNvbXBhcmVyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhcnJheScsIENCTik7XG4gICAgbGV0IGxlbiA9IGFycmF5Lmxlbmd0aDsgLy8gYXZvaWQgcXVlcnlpbmcgLmxlbmd0aCBtb3JlIHRoYW4gb25jZS4gKlxuICAgIGNvbnN0IG9rID0gIWxlbiB8fCAhY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIpO1xuICAgIGlmIChvaylcbiAgICAgICAgYXJyYXlbbGVuXSA9IGl0ZW07IC8vICogcHVzaCB3b3VsZCBxdWVyeSBsZW5ndGggYWdhaW4uXG4gICAgcmV0dXJuIG9rO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBpbmRleCBvZiB3aGljaCB0aGUgcHJvdmlkZWQgcHJlZGljYXRlIHJldHVybnMgdHJ1ZS5cbiAqIFJldHVybnMgLTEgaWYgYWx3YXlzIGZhbHNlLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gcHJlZGljYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhcnJheScsIENCTik7XG4gICAgaWYgKCFUeXBlLmlzRnVuY3Rpb24ocHJlZGljYXRlKSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCdwcmVkaWNhdGUnLCAnTXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIGNvbnN0IGxlbiA9IGFycmF5Lmxlbmd0aDtcbiAgICBpZiAoIVR5cGUuaXNOdW1iZXIobGVuLCB0cnVlKSB8fCBsZW4gPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oJ2FycmF5JywgJ0RvZXMgbm90IGhhdmUgYSB2YWxpZCBsZW5ndGguJyk7XG4gICAgaWYgKChhcnJheSkgaW5zdGFuY2VvZiAoQXJyYXkpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaV0sIGkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKGkpIGluIChhcnJheSkgJiYgcHJlZGljYXRlKGFycmF5W2ldLCBpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChzb3VyY2UsIGFjdGlvbikge1xuICAgIGlmIChzb3VyY2UgJiYgYWN0aW9uKSB7XG4gICAgICAgIC8vIERvbid0IGNhY2hlIHRoZSBsZW5ndGggc2luY2UgaXQgaXMgcG9zc2libGUgdGhhdCB0aGUgdW5kZXJseWluZyBhcnJheSBjaGFuZ2VkLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFjdGlvbihzb3VyY2VbaV0sIGkpID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSXMgc2ltaWxhciB0byBBcnJheS5tYXAoKSBidXQgaW5zdGVhZCBvZiByZXR1cm5pbmcgYSBuZXcgYXJyYXksIGl0IHVwZGF0ZXMgdGhlIGV4aXN0aW5nIGluZGV4ZXMuXG4gKiBDYW4gYWxzbyBiZSBhcHBsaWVkIHRvIGEgc3RydWN0dXJlIHRoYXQgaW5kZXhlcyBsaWtlIGFuIGFycmF5LCBidXQgbWF5IG5vdCBiZS5cbiAqIEBwYXJhbSB0YXJnZXRcbiAqIEBwYXJhbSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlUbyh0YXJnZXQsIGZuKSB7XG4gICAgaWYgKHRhcmdldCAmJiBmbikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFyZ2V0W2ldID0gZm4odGFyZ2V0W2ldLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogUmVtb3ZlcyBhbiBlbnRyeSBhdCBhIHNwZWNpZmllZCBpbmRleC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgd2FzIGFibGUgdG8gYmUgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUluZGV4KGFycmF5LCBpbmRleCkge1xuICAgIGlmICghYXJyYXkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5JywgQ0JOKTtcbiAgICBJbnRlZ2VyLmFzc2VydChpbmRleCwgJ2luZGV4Jyk7XG4gICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignaW5kZXgnLCBpbmRleCwgQ0JMMCk7XG4gICAgY29uc3QgZXhpc3RzID0gaW5kZXggPCBhcnJheS5sZW5ndGg7XG4gICAgaWYgKGV4aXN0cylcbiAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gZXhpc3RzO1xufVxuLyoqXG4gKiBGaW5kcyBhbmQgcmVtb3ZlcyBhIHZhbHVlIGZyb20gYW4gYXJyYXkuICBXaWxsIHJlbW92ZSBhbGwgaW5zdGFuY2VzIHVubGVzcyBhIG1heGltdW0gaXMgc3BlY2lmaWVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBtYXhcbiAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBlcXVhbGl0eUNvbXBhcmVyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoZSB2YWx1ZSB3YXMgZm91bmQgYW5kIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUoYXJyYXksIHZhbHVlLCBtYXggPSBJbmZpbml0eSwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgaWYgKCFhcnJheSB8fCAhYXJyYXkubGVuZ3RoIHx8IG1heCA9PT0gMClcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKG1heCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ21heCcsIG1heCwgQ0JMMCk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAoIW1heCB8fCAhaXNGaW5pdGUobWF4KSkge1xuICAgICAgICAvLyBEb24ndCB0cmFjayB0aGUgaW5kZXhlcyBhbmQgcmVtb3ZlIGluIHJldmVyc2UuXG4gICAgICAgIGZvciAobGV0IGkgPSAoYXJyYXkubGVuZ3RoIC0gMSk7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxpdHlDb21wYXJlcihhcnJheVtpXSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIFNpbmNlIHRoZSB1c2VyIHdpbGwgZXhwZWN0IGl0IHRvIGhhcHBlbiBpbiBmb3J3YXJkIG9yZGVyLi4uXG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107IC8vIGluZGV4ZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGVxdWFsaXR5Q29tcGFyZXIoYXJyYXlbaV0sIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGZvdW5kLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gbWF4KVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gZm91bmQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShmb3VuZFtpXSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufVxuLyoqXG4gKiBTaW1wbHkgcmVwZWF0cyBhIHZhbHVlIHRoZSBudW1iZXIgb2YgdGltZXMgc3BlY2lmaWVkLlxuICogQHBhcmFtIGVsZW1lbnRcbiAqIEBwYXJhbSBjb3VudFxuICogQHJldHVybnMge1RbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdChlbGVtZW50LCBjb3VudCkge1xuICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCAnY291bnQnKTtcbiAgICBpZiAoY291bnQgPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdjb3VudCcsIGNvdW50LCBDQkwwKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbml0aWFsaXplKGNvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gZWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogUmV0dXJucyBhIHJhbmdlIG9mIG51bWJlcnMgYmFzZWQgdXBvbiB0aGUgZmlyc3QgdmFsdWUgYW5kIHRoZSBzdGVwIHZhbHVlLlxuICogQHBhcmFtIGZpcnN0XG4gKiBAcGFyYW0gY291bnRcbiAqIEBwYXJhbSBzdGVwXG4gKiBAcmV0dXJucyB7bnVtYmVyW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5nZShmaXJzdCwgY291bnQsIHN0ZXAgPSAxKSB7XG4gICAgaWYgKGlzTmFOKGZpcnN0KSB8fCAhaXNGaW5pdGUoZmlyc3QpKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdmaXJzdCcsIGZpcnN0LCBWRk4pO1xuICAgIGlmIChpc05hTihjb3VudCkgfHwgIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignY291bnQnLCBjb3VudCwgVkZOKTtcbiAgICBpZiAoY291bnQgPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdjb3VudCcsIGNvdW50LCBDQkwwKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbml0aWFsaXplKGNvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gZmlyc3Q7XG4gICAgICAgIGZpcnN0ICs9IHN0ZXA7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIFJldHVybnMgYSByYW5nZSBvZiBudW1iZXJzIGJhc2VkIHVwb24gdGhlIGZpcnN0IHZhbHVlIGFuZCB0aGUgc3RlcCB2YWx1ZSBleGNsdWRpbmcgYW55IG51bWJlcnMgYXQgb3IgYmV5b25kIHRoZSB1bnRpbCB2YWx1ZS5cbiAqIEBwYXJhbSBmaXJzdFxuICogQHBhcmFtIHVudGlsXG4gKiBAcGFyYW0gc3RlcFxuICogQHJldHVybnMge251bWJlcltdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2VVbnRpbChmaXJzdCwgdW50aWwsIHN0ZXAgPSAxKSB7XG4gICAgaWYgKHN0ZXAgPT0gMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignc3RlcCcsIHN0ZXAsIENCMCk7XG4gICAgcmV0dXJuIHJhbmdlKGZpcnN0LCAodW50aWwgLSBmaXJzdCkgLyBzdGVwLCBzdGVwKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkaXN0aW5jdChzb3VyY2UpIHtcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIFtdOyAvLyBBbGxvd2luZyBmb3IgbnVsbCBmYWNpbGl0YXRlcyByZWdleCBmaWx0ZXJpbmcuXG4gICAgY29uc3Qgc2VlbiA9IHt9O1xuICAgIHJldHVybiBzb3VyY2UuZmlsdGVyKGUgPT4gIShlIGluIHNlZW4pICYmIChzZWVuW2VdID0gdHJ1ZSkpO1xufVxuLyoqXG4gKiBUYWtlcyBhbnkgYXJyYXlzIHdpdGhpbiBhbiBhcnJheSBhbmQgaW5zZXJ0cyB0aGUgdmFsdWVzIGNvbnRhaW5lZCB3aXRoaW4gaW4gcGxhY2Ugb2YgdGhhdCBhcnJheS5cbiAqIEZvciBldmVyeSBjb3VudCBoaWdoZXIgdGhhbiAwIGluIHJlY3Vyc2VEZXB0aCBpdCB3aWxsIGF0dGVtcHQgYW4gYWRkaXRpb25hbCBwYXNzLiAgUGFzc2luZyBJbmZpbml0eSB3aWxsIGZsYXR0ZW4gYWxsIGFycmF5cyBjb250YWluZWQuXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIHJlY3Vyc2VEZXB0aFxuICogQHJldHVybnMge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhLCByZWN1cnNlRGVwdGggPSAwKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB4ID0gYVtpXTtcbiAgICAgICAgaWYgKCh4KSBpbnN0YW5jZW9mIChBcnJheSkpIHtcbiAgICAgICAgICAgIGlmIChyZWN1cnNlRGVwdGggPiAwKVxuICAgICAgICAgICAgICAgIHggPSBmbGF0dGVuKHgsIHJlY3Vyc2VEZXB0aCAtIDEpO1xuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCB4Lmxlbmd0aDsgbisrKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHhbbl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXRpbGl0eS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L1V0aWxpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgU3lzdGVtRXhjZXB0aW9uIH0gZnJvbSBcIi4vU3lzdGVtRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnTm90SW1wbGVtZW50ZWRFeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIE5vdEltcGxlbWVudGVkRXhjZXB0aW9uIGV4dGVuZHMgU3lzdGVtRXhjZXB0aW9uIHtcbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU5vdEltcGxlbWVudGVkRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9Ob3RJbXBsZW1lbnRlZEV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgKiBhcyBWYWx1ZXMgZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IFNvcnRDb250ZXh0IH0gZnJvbSBcIi4vU29ydENvbnRleHRcIjtcbmltcG9ydCB7IEZ1bmN0aW9ucyB9IGZyb20gXCIuLi8uLi9GdW5jdGlvbnNcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIEtleVNvcnRlZENvbnRleHQgZXh0ZW5kcyBTb3J0Q29udGV4dCB7XG4gICAgY29uc3RydWN0b3IobmV4dCwgX2tleVNlbGVjdG9yLCBvcmRlciA9IDEgLyogQXNjZW5kaW5nICovLCBjb21wYXJlciA9IFZhbHVlcy5jb21wYXJlKSB7XG4gICAgICAgIHN1cGVyKG5leHQsIGNvbXBhcmVyLCBvcmRlcik7XG4gICAgICAgIHRoaXMuX2tleVNlbGVjdG9yID0gX2tleVNlbGVjdG9yO1xuICAgIH1cbiAgICBjb21wYXJlKGEsIGIpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBrcyA9IF8uX2tleVNlbGVjdG9yO1xuICAgICAgICBpZiAoIWtzIHx8IGtzID09IEZ1bmN0aW9ucy5JZGVudGl0eSlcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5jb21wYXJlKGEsIGIpO1xuICAgICAgICAvLyBXZSBmb3JjZSA8YW55PiBoZXJlIHNpbmNlIGl0IGNhbiBiZSBhIFByaW1pdGl2ZSBvciBJQ29tcGFyYWJsZTxhbnk+XG4gICAgICAgIGNvbnN0IGQgPSBWYWx1ZXMuY29tcGFyZShrcyhhKSwga3MoYikpO1xuICAgICAgICBpZiAoZCA9PSAwICYmIF8uX25leHQpXG4gICAgICAgICAgICByZXR1cm4gXy5fbmV4dC5jb21wYXJlKGEsIGIpO1xuICAgICAgICByZXR1cm4gXy5fb3JkZXIgKiBkO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEtleVNvcnRlZENvbnRleHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1LZXlTb3J0ZWRDb250ZXh0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvU29ydGluZy9LZXlTb3J0ZWRDb250ZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCAqIGFzIFZhbHVlcyBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuZXhwb3J0IGNsYXNzIFNvcnRDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihfbmV4dCwgX2NvbXBhcmVyID0gVmFsdWVzLmNvbXBhcmUsIF9vcmRlciA9IDEgLyogQXNjZW5kaW5nICovKSB7XG4gICAgICAgIHRoaXMuX25leHQgPSBfbmV4dDtcbiAgICAgICAgdGhpcy5fY29tcGFyZXIgPSBfY29tcGFyZXI7XG4gICAgICAgIHRoaXMuX29yZGVyID0gX29yZGVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXJlY3Rpb24gb2YgdGhlIGNvbXBhcmlzb24uXG4gICAgICogQHR5cGUge09yZGVyfVxuICAgICAqL1xuICAgIGdldCBvcmRlcigpIHsgcmV0dXJuIHRoaXMuX29yZGVyOyB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGFuIGFycmF5IG9mIGluZGV4ZXMgZnJvbSB0aGUgc291cmNlIGluIG9yZGVyIG9mIHRoZWlyIGV4cGVjdGVkIGludGVybmFsU29ydCB3aXRob3V0IG1vZGlmeWluZyB0aGUgc291cmNlLlxuICAgICAqIEBwYXJhbSBzb3VyY2VcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XG4gICAgICovXG4gICAgZ2VuZXJhdGVTb3J0ZWRJbmRleGVzKHNvdXJjZSkge1xuICAgICAgICBpZiAoc291cmNlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHNvdXJjZS5tYXAoKHMsIGkpID0+IGkpO1xuICAgICAgICByZXN1bHQuc29ydCgoYSwgYikgPT4gdGhpcy5jb21wYXJlKHNvdXJjZVthXSwgc291cmNlW2JdKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXBhcmVzIHR3byB2YWx1ZXMgYmFzZWQgdXBvbiBTb3J0Q29udGV4dCBwYXJhbWV0ZXJzLlxuICAgICAqIEBwYXJhbSBhXG4gICAgICogQHBhcmFtIGJcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGNvbXBhcmUoYSwgYikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZCA9IF8uX2NvbXBhcmVyKGEsIGIpO1xuICAgICAgICBpZiAoZCA9PSAwICYmIF8uX25leHQpXG4gICAgICAgICAgICByZXR1cm4gXy5fbmV4dC5jb21wYXJlKGEsIGIpO1xuICAgICAgICByZXR1cm4gXy5fb3JkZXIgKiBkO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNvcnRDb250ZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U29ydENvbnRleHQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9Tb3J0aW5nL1NvcnRDb250ZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVRcbiAqL1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuL0ludGVnZXJcIjtcbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tIFwiLi9Db2xsZWN0aW9ucy9BcnJheS9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBzaHVmZmxlIGFzIGFycmF5U2h1ZmZsZSB9IGZyb20gXCIuL0NvbGxlY3Rpb25zL0FycmF5L3NodWZmbGVcIjtcbnZhciBhc3NlcnQgPSBJbnRlZ2VyLmFzc2VydDtcbi8qKlxuICogVGhpcyBtb2R1bGUgb25seSBhY3RzIGFzIGEgdXRpbGl0eSBBUEkgZm9yIGdldHRpbmcgcmFuZG9tIG51bWJlcnMgZnJvbSBNYXRoLnJhbmRvbSgpLlxuICogSWYgeW91IG5lZWQgcmVwZWF0YWJsZSBzZWVkZWQgcmFuZG9tIG51bWJlcnMgdGhlbiB5b3UnbGwgbmVlZCBhIHNlcGFyYXRlIHV0aWxpdHkuXG4gKiBIaWdobHkgcmVjb21tZW5kZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9ja2tuaWdodC9yYW5kb20tanMgd2hpY2ggaGFzIHR5cGluZ3MgdW5kZXIgQHR5cGVzL3JhbmRvbS1qcy5cbiAqL1xuZXhwb3J0IHZhciBSYW5kb207XG4oZnVuY3Rpb24gKFJhbmRvbSkge1xuICAgIGZ1bmN0aW9uIHIobWF4RXhjbHVzaXZlID0gMSkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4RXhjbHVzaXZlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbnIoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICBjb25zdCBhID0gTWF0aC5hYnMoYm91bmRhcnkpO1xuICAgICAgICBpZiAoYSA9PT0gMCB8fCBhID09PSAxICYmICFpbmNsdXNpdmUpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgaWYgKGluY2x1c2l2ZSlcbiAgICAgICAgICAgIGJvdW5kYXJ5ICs9IGJvdW5kYXJ5IC8gYTtcbiAgICAgICAgcmV0dXJuIHIoYm91bmRhcnkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhcnJheUNvcHkoc291cmNlKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGluaXRpYWxpemUobGVuKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBmcm9tIDAgdG8gdGhlIG1heEV4Y2x1c2l2ZS5cbiAgICAgKiBOZWdhdGl2ZSBudW1iZXJzIGFyZSBhbGxvd2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1heEV4Y2x1c2l2ZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gaW50ZWdlcihtYXhFeGNsdXNpdmUpIHtcbiAgICAgICAgcmV0dXJuIG5leHQobWF4RXhjbHVzaXZlKTtcbiAgICB9XG4gICAgUmFuZG9tLmludGVnZXIgPSBpbnRlZ2VyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyByYW5kb20gZmxvYXRpbmcgcG9pbnQgbnVtYmVycyB1cCB0byB0aGUgbWF4RXhjbHVzaXZlIHZhbHVlLlxuICAgICAqIFVzZWZ1bCBmb3IgZ2VuZXJhdGluZyBhIHJhbmRvbSBhbmQgbWVtb2l6YWJsZSBzZXQgZm9yIHVzZSB3aXRoIG90aGVyIGVudW1lcmFibGVzLlxuICAgICAqIEBwYXJhbSBtYXhFeGNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyB7KCk9Pm51bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZShtYXhFeGNsdXNpdmUgPSAxKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiByKG1heEV4Y2x1c2l2ZSk7XG4gICAgfVxuICAgIFJhbmRvbS5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xuICAgIChmdW5jdGlvbiAoZ2VuZXJhdGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyByYW5kb20gaW50ZWdlcnMgdXAgdG8gdGhlIGJvdW5kYXJ5LlxuICAgICAgICAgKiBVc2VmdWwgZm9yIGdlbmVyYXRpbmcgYSByYW5kb20gYW5kIG1lbW9pemFibGUgc2V0IGZvciB1c2Ugd2l0aCBvdGhlciBlbnVtZXJhYmxlcy5cbiAgICAgICAgICogQHBhcmFtIGJvdW5kYXJ5XG4gICAgICAgICAqIEBwYXJhbSBpbmNsdXNpdmVcbiAgICAgICAgICogQHJldHVybnMgeygpPT5udW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBpbnRlZ2Vycyhib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2VuZXJhdGUuaW50ZWdlcnMgPSBpbnRlZ2VycztcbiAgICB9KShnZW5lcmF0ZSA9IFJhbmRvbS5nZW5lcmF0ZSB8fCAoUmFuZG9tLmdlbmVyYXRlID0ge30pKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgZnJvbSAwIHRvIHRoZSBib3VuZGFyeS5cbiAgICAgKiBSZXR1cm4gdmFsdWUgd2lsbCBiZSBsZXNzIHRoYW4gdGhlIGJvdW5kYXJ5IHVubGVzcyBpbmNsdXNpdmUgaXMgc2V0IHRvIHRydWUuXG4gICAgICogTmVnYXRpdmUgbnVtYmVycyBhcmUgYWxsb3dlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBib3VuZGFyeVxuICAgICAqIEBwYXJhbSBpbmNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5leHQoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICBhc3NlcnQoYm91bmRhcnksICdib3VuZGFyeScpO1xuICAgICAgICByZXR1cm4gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgfVxuICAgIFJhbmRvbS5uZXh0ID0gbmV4dDtcbiAgICAoZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgZnVuY3Rpb24gaW50ZWdlcihib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gUmFuZG9tLm5leHQoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dC5pbnRlZ2VyID0gaW50ZWdlcjtcbiAgICAgICAgZnVuY3Rpb24gZmxvYXQoYm91bmRhcnkgPSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4oYm91bmRhcnkpKVxuICAgICAgICAgICAgICAgIHRocm93IFwiJ2JvdW5kYXJ5JyBpcyBub3QgYSBudW1iZXIuXCI7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIGJvdW5kYXJ5O1xuICAgICAgICB9XG4gICAgICAgIG5leHQuZmxvYXQgPSBmbG9hdDtcbiAgICAgICAgZnVuY3Rpb24gaW5SYW5nZShtaW4sIG1heCwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICBhc3NlcnQobWluLCAnbWluJyk7XG4gICAgICAgICAgICBhc3NlcnQobWF4LCAnbWF4Jyk7XG4gICAgICAgICAgICBsZXQgcmFuZ2UgPSBtYXggLSBtaW47XG4gICAgICAgICAgICBpZiAocmFuZ2UgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgICAgIGlmIChpbmNsdXNpdmUpXG4gICAgICAgICAgICAgICAgcmFuZ2UgKz0gcmFuZ2UgLyBNYXRoLmFicyhyYW5nZSk7XG4gICAgICAgICAgICByZXR1cm4gbWluICsgcihyYW5nZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dC5pblJhbmdlID0gaW5SYW5nZTtcbiAgICB9KShuZXh0ID0gUmFuZG9tLm5leHQgfHwgKFJhbmRvbS5uZXh0ID0ge30pKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHJhbmRvbSBpbnRlZ2Vycy5cbiAgICAgKiBAcGFyYW0gY291bnRcbiAgICAgKiBAcGFyYW0gYm91bmRhcnlcbiAgICAgKiBAcGFyYW0gaW5jbHVzaXZlXG4gICAgICogQHJldHVybnMge251bWJlcltdfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGludGVnZXJzKGNvdW50LCBib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgIGFzc2VydChjb3VudCk7XG4gICAgICAgIGNvbnN0IHMgPSBbXTtcbiAgICAgICAgcy5sZW5ndGggPSBjb3VudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBzW2ldID0gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIFJhbmRvbS5pbnRlZ2VycyA9IGludGVnZXJzO1xuICAgIC8qKlxuICAgICAqIFNodWZmbGVzIGFuIGFycmF5LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyB7VH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzaHVmZmxlKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gYXJyYXlTaHVmZmxlKHRhcmdldCk7XG4gICAgfVxuICAgIFJhbmRvbS5zaHVmZmxlID0gc2h1ZmZsZTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY29weSBvZiBhbiBhcnJheS1saWtlICBhbmQgcmV0dXJucyBpdCBzaHVmZmxlZC5cbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHJldHVybnMge1RbXX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb3B5KHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gYXJyYXlTaHVmZmxlKGFycmF5Q29weShzb3VyY2UpKTtcbiAgICB9XG4gICAgUmFuZG9tLmNvcHkgPSBjb3B5O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBkaXN0aW5jdCByYW5kb20gc2V0IGZyb20gdGhlIHNvdXJjZSBhcnJheSB1cCB0byB0aGUgbWF4Q291bnQgb3IgdGhlIGZ1bGwgbGVuZ3RoIG9mIHRoZSBhcnJheS5cbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHBhcmFtIG1heENvdW50XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZWxlY3Qoc291cmNlLCBtYXhDb3VudCkge1xuICAgICAgICBpZiAobWF4Q291bnQgIT09IEluZmluaXR5KVxuICAgICAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKG1heENvdW50KTtcbiAgICAgICAgc3dpdGNoIChtYXhDb3VudCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gW3NlbGVjdC5vbmUoc291cmNlLCB0cnVlKV07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBhcnJheVNodWZmbGUoYXJyYXlDb3B5KHNvdXJjZSkpO1xuICAgICAgICAgICAgICAgIGlmIChtYXhDb3VudCA8IHJlc3VsdC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5sZW5ndGggPSBtYXhDb3VudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFJhbmRvbS5zZWxlY3QgPSBzZWxlY3Q7XG4gICAgKGZ1bmN0aW9uIChzZWxlY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gb25lKHNvdXJjZSwgdGhyb3dJZkVtcHR5KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZVtyKHNvdXJjZS5sZW5ndGgpXTtcbiAgICAgICAgICAgIGlmICh0aHJvd0lmRW1wdHkpXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJDYW5ub3Qgc2VsZWN0IGZyb20gYW4gZW1wdHkgc2V0LlwiO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdC5vbmUgPSBvbmU7XG4gICAgfSkoc2VsZWN0ID0gUmFuZG9tLnNlbGVjdCB8fCAoUmFuZG9tLnNlbGVjdCA9IHt9KSk7XG59KShSYW5kb20gfHwgKFJhbmRvbSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SYW5kb20uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9SYW5kb20uanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuLyoqXG4gKiBSYW5kb21pemUgYXJyYXkgZWxlbWVudCBvcmRlciBpbi1wbGFjZS5cbiAqIFVzaW5nIER1cnN0ZW5mZWxkIHNodWZmbGUgYWxnb3JpdGhtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2h1ZmZsZSh0YXJnZXQpIHtcbiAgICBsZXQgaSA9IHRhcmdldC5sZW5ndGg7XG4gICAgd2hpbGUgKC0taSkge1xuICAgICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgIGNvbnN0IHRlbXAgPSB0YXJnZXRbaV07XG4gICAgICAgIHRhcmdldFtpXSA9IHRhcmdldFtqXTtcbiAgICAgICAgdGFyZ2V0W2pdID0gdGVtcDtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNodWZmbGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9zaHVmZmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogT3JpZ2luOiBodHRwOi8vd3d3LmZhbGxpbmdjYW5iZWRlYWRseS5jb20vXG4gKiBMaWNlbnNpbmc6IE1JVFxuICovXG5pbXBvcnQgeyBSZWFkT25seUNvbGxlY3Rpb25CYXNlIH0gZnJvbSBcIi4vUmVhZE9ubHlDb2xsZWN0aW9uQmFzZVwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uL0ludGVnZXJcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIExhenlMaXN0IGV4dGVuZHMgUmVhZE9ubHlDb2xsZWN0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2VudW1lcmF0b3IgPSBzb3VyY2UuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICB0aGlzLl9jYWNoZWQgPSBbXTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZW51bWVyYXRvcjtcbiAgICAgICAgdGhpcy5fZW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgIGlmIChlKVxuICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIHRoaXMuX2NhY2hlZCA9IG51bGw7XG4gICAgICAgIGlmIChjKVxuICAgICAgICAgICAgYy5sZW5ndGggPSAwO1xuICAgIH1cbiAgICBfZ2V0Q291bnQoKSB7XG4gICAgICAgIHRoaXMuZmluaXNoKCk7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIHJldHVybiBjID8gYy5sZW5ndGggOiAwO1xuICAgIH1cbiAgICBfZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgY3VycmVudCA9IDA7XG4gICAgICAgIH0sIHlpZWxkZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnJlbnQgPCBjLmxlbmd0aCB8fCB0aGlzLmdldE5leHQoKSlcbiAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oY1tjdXJyZW50KytdKVxuICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQoaW5kZXgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4KTtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuX2NhY2hlZDtcbiAgICAgICAgd2hpbGUgKGMubGVuZ3RoIDw9IGluZGV4ICYmIHRoaXMuZ2V0TmV4dCgpKSB7IH1cbiAgICAgICAgaWYgKGluZGV4IDwgYy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gY1tpbmRleF07XG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJpbmRleFwiLCBcIkdyZWF0ZXIgdGhhbiB0b3RhbCBjb3VudC5cIik7XG4gICAgfVxuICAgIGluZGV4T2YoaXRlbSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBjID0gdGhpcy5fY2FjaGVkO1xuICAgICAgICBsZXQgcmVzdWx0ID0gYy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICB3aGlsZSAocmVzdWx0ID09IC0xICYmIHRoaXMuZ2V0TmV4dCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gaXRlbSlcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjLmxlbmd0aCAtIDE7XG4gICAgICAgIH0pKSB7IH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29udGFpbnMoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKGl0ZW0pICE9IC0xO1xuICAgIH1cbiAgICBnZXROZXh0KG91dCkge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZW51bWVyYXRvcjtcbiAgICAgICAgaWYgKCFlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlZC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChvdXQpXG4gICAgICAgICAgICAgICAgb3V0KHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9lbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZpbmlzaCgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dCgpKSB7IH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MYXp5TGlzdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0xhenlMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IENvbGxlY3Rpb25CYXNlIH0gZnJvbSBcIi4vQ29sbGVjdGlvbkJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIFJlYWRPbmx5Q29sbGVjdGlvbkJhc2UgZXh0ZW5kcyBDb2xsZWN0aW9uQmFzZSB7XG4gICAgZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDb3VudCgpO1xuICAgIH1cbiAgICBnZXRJc1JlYWRPbmx5KCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfYWRkSW50ZXJuYWwoZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIF9yZW1vdmVJbnRlcm5hbChlbnRyeSwgbWF4KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBfY2xlYXJJbnRlcm5hbCgpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRFbnVtZXJhdG9yKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUmVhZE9ubHlDb2xsZWN0aW9uQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlYWRPbmx5Q29sbGVjdGlvbkJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9SZWFkT25seUNvbGxlY3Rpb25CYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogLk5FVCBSZWZlcmVuY2U6IGh0dHA6Ly9yZWZlcmVuY2Vzb3VyY2UubWljcm9zb2Z0LmNvbS8jbXNjb3JsaWIvc3lzdGVtL3RleHQvU3RyaW5nQnVpbGRlci5jc1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vVHlwZXNcIjtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSU1QT1JUQU5UIE5PVEVTIEFCT1VUIFBFUkZPUk1BTkNFOlxuICogaHR0cDovL2pzcGVyZi5jb20vc3RyaW5nLWNvbmNhdGVuYXRpb24tbG9vcGVkXG4gKiBodHRwOi8vanNwZXJmLmNvbS9hZGRpbmctc3RyaW5ncy10by1hbi1hcnJheVxuICogaHR0cDovL2pzcGVyZi5jb20vc3RyaW5nLWNvbmNhdGVuYXRpb24tdmVyc3VzLWFycmF5LW9wZXJhdGlvbnMtd2l0aC1qb2luXG4gKlxuICogSXQgaXMgY2xlYXJseSBpbmVmZmljaWVudCB0byB1c2UgYSBTdHJpbmdCdWlsZGVyIG9yIExpbmtlZExpc3QgdG8gYnVpbGQgYSBzdHJpbmcgd2hlbiB5b3UgaGF2ZSBhIHNtYWxsIHNldCBvZiBzdHJpbmcgcG9ydGlvbnMuXG4gKiBTdHJpbmdCdWlsZGVyIHdpbGwgcmVhbGx5IHNob3cgaXQncyBiZW5lZml0IGxpa2VseSBzb21ld2hlcmUgYWJvdmUgMTAwMCBpdGVtcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IEVNUFRZID0gXCJcIjtcbmNvbnN0IE5FV0xJTkUgPSBcIlxcclxcblwiO1xuZXhwb3J0IGNsYXNzIFN0cmluZ0J1aWxkZXIge1xuICAgIGNvbnN0cnVjdG9yKC4uLmluaXRpYWwpIHtcbiAgICAgICAgdGhpcy5fbGF0ZXN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFydEFycmF5ID0gW107XG4gICAgICAgIHRoaXMuYXBwZW5kVGhlc2UoaW5pdGlhbCk7XG4gICAgfVxuICAgIGFwcGVuZFNpbmdsZShpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICAgICAgXy5fbGF0ZXN0ID0gbnVsbDtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGUuT0JKRUNUOlxuICAgICAgICAgICAgICAgIGNhc2UgVHlwZS5GVU5DVElPTjpcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfLl9wYXJ0QXJyYXkucHVzaChpdGVtKTsgLy8gT3RoZXIgcHJpbWl0aXZlIHR5cGVzIGNhbiBrZWVwIHRoZWlyIGZvcm1hdCBzaW5jZSBhIG51bWJlciBvciBib29sZWFuIGlzIGEgc21hbGxlciBmb290cHJpbnQgdGhhbiBhIHN0cmluZy5cbiAgICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRUaGVzZShpdGVtcykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaXRlbXMuZm9yRWFjaChzID0+IF8uYXBwZW5kU2luZ2xlKHMpKTtcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIGFwcGVuZCguLi5pdGVtcykge1xuICAgICAgICB0aGlzLmFwcGVuZFRoZXNlKGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFwcGVuZExpbmUoLi4uaXRlbXMpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRMaW5lcyhpdGVtcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhcHBlbmRMaW5lcyhpdGVtcykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGlmIChpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBfLmFwcGVuZFNpbmdsZShpKTtcbiAgICAgICAgICAgICAgICBfLl9wYXJ0QXJyYXkucHVzaChORVdMSU5FKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBfO1xuICAgIH1cbiAgICAvKiogLy8vIFRoZXNlIG1ldGhvZHMgY2FuIG9ubHkgZWZmaWNpZW50bHkgYmUgYWRkZWQgaWYgbm90IHVzaW5nIGEgc2luZ2xlIGFycmF5LlxuICAgICBpbnNlcnQoaW5kZXg6IG51bWJlciwgdmFsdWU6IHN0cmluZywgY291bnQ6IG51bWJlciA9IDEpOiBTdHJpbmdCdWlsZGVyXG4gICAgIHtcbiAgICB9XG4gICAgIHJlbW92ZShzdGFydEluZGV4Om51bWJlciwgbGVuZ3RoOm51bWJlcik6IFN0cmluZ0J1aWxkZXJcbiAgICAge1xuICAgIH1cbiAgICAgLyoqL1xuICAgIGdldCBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFydEFycmF5Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGxldCBsYXRlc3QgPSB0aGlzLl9sYXRlc3Q7XG4gICAgICAgIGlmIChsYXRlc3QgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuX2xhdGVzdCA9IGxhdGVzdCA9IHRoaXMuX3BhcnRBcnJheS5qb2luKEVNUFRZKTtcbiAgICAgICAgcmV0dXJuIGxhdGVzdDtcbiAgICB9XG4gICAgam9pbihkZWxpbWl0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnRBcnJheS5qb2luKGRlbGltaXRlcik7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9wYXJ0QXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fbGF0ZXN0ID0gbnVsbDtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFN0cmluZ0J1aWxkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdHJpbmdCdWlsZGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vVGV4dC9TdHJpbmdCdWlsZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSJdLCJzb3VyY2VSb290IjoiIn0=