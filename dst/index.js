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
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
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
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:import-name
var StringNode_1 = __webpack_require__(37);
exports.StringNode = StringNode_1.StringNode;
__webpack_require__(31);

/***/ }),
/* 37 */
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
var NamedNode_1 = __webpack_require__(38);
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
var Node_1 = __webpack_require__(39);
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
/* 39 */
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
var Linq_1 = __webpack_require__(40);
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
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["Enumerable"] = Enumerable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__System_Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__System_Collections_Array_copy__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__System_Collections_Array_Compare__ = __webpack_require__(42);
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
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export areAllEqual */
/* harmony export (immutable) */ __webpack_exports__["a"] = areEqual;
/* unused harmony export areEquivalent */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIGEyYjhkZjY5MTgxYmYxNDdkOWI1IiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUeXBlcy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29tcGFyZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnROdWxsRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxBcmd1bWVudEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVudW1lcmF0b3JCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxJbnRlZ2VyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxTeXN0ZW1FeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXERpc3Bvc2FibGVcXERpc3Bvc2FibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGluaXRpYWxpemUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcRW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcZGlzcG9zZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJbmRleEVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSXRlcmF0b3JSZXN1bHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEZ1bmN0aW9ucy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXENvbGxlY3Rpb25CYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGNvcHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRleHRcXFV0aWxpdHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcQXJyYXlFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxEaXNwb3NhYmxlXFxPYmplY3REaXNwb3NlZEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcT2JqZWN0UG9vbC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSW5maW5pdGVFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXFNpbXBsZUVudW1lcmFibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVtcHR5RW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJdGVyYXRvckVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXHNyY1xcU3RyaW5nRXh0ZW5zaW9uLnRzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxzcmNcXGluZGV4LnRzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxzcmNcXFN0cmluZ05vZGUudHMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXHNyY1xcTmFtZWROb2RlLnRzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxzcmNcXE5vZGUudHMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW0uTGlucVxcTGlucS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXENvbXBhcmUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRocmVhZGluZ1xcVGFza3NcXFRhc2tIYW5kbGVyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUaHJlYWRpbmdcXFRhc2tzXFxUYXNrSGFuZGxlckJhc2UuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxEaWN0aW9uYXJpZXNcXERpY3Rpb25hcnkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxMaW5rZWROb2RlTGlzdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXERpY3Rpb25hcmllc1xcZ2V0SWRlbnRpZmllci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXERpY3Rpb25hcmllc1xcRGljdGlvbmFyeUJhc2UuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEVudmlyb25tZW50LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHByb2Nlc3NcXGJyb3dzZXIuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEtleVZhbHVlRXh0cmFjdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEtleU5vdEZvdW5kRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcUXVldWUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxBcnJheVxcVXRpbGl0eS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcTm90SW1wbGVtZW50ZWRFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxTb3J0aW5nXFxLZXlTb3J0ZWRDb250ZXh0LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcU29ydGluZ1xcU29ydENvbnRleHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFJhbmRvbS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEFycmF5XFxzaHVmZmxlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcTGF6eUxpc3QuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxSZWFkT25seUNvbGxlY3Rpb25CYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUZXh0XFxTdHJpbmdCdWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdJQUFnSSw2REFBNkQsRUFBRTtBQUMvTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7OztBQ3JOQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQzRCO0FBQ1U7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQjtBQUNBLG1DOzs7Ozs7OztBQ3ZGQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxxRDs7Ozs7OztBQ2RBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDdkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUFBO0FBQUE7QUFDQTtBQUNBLDBDOzs7Ozs7Ozs7QUN2Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2dCO0FBQ0Q7QUFDVztBQUNBO0FBQ2U7QUFDWjtBQUNNO0FBQ047QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2QkFBNkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxlQUFlLEVBQUU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw0QkFBNEIsRUFBRTtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7O0FDM0pBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyw4Q0FBOEM7QUFDbkQsQ0FBQywwQkFBMEI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGFBQWE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7O0FDaktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSwyQzs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCO0FBQ3BEO0FBQ0EsQ0FBQyx3Q0FBd0M7QUFDekM7QUFDQTtBQUNBLDBDOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUIsVUFBVTtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYSxjQUFjO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7QUM1REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQjtBQUNDO0FBQ2E7QUFDSTtBQUNYO0FBQ21CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUJBQXVCO0FBQ2pEO0FBQ0Esc0JBQXNCLG1DQUFtQztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHNDOzs7Ozs7O0FDcktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDBEOzs7Ozs7O0FDakJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsOEM7Ozs7Ozs7QUNwQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnSUFBcUQsK0JBQStCLEVBQUU7QUFDdEYsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EscUlBQTBEO0FBQzFELHFCQUFxQixJQUFJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNklBQXVEO0FBQ3ZELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlMQUF3RjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlJQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlJQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQSxpQkFBaUI7QUFDakIsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUlBQWlELFdBQVcsRUFBRTtBQUM5RCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUlBQTZDLGVBQWUsRUFBRTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyx1REFBdUQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxLQUFLO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0Esc0M7Ozs7Ozs7Ozs7O0FDbkxBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDaUI7QUFDbUI7QUFDUjtBQUNJO0FBQ1A7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdU5BQWlGLEVBQUUsMkJBQTJCLEVBQUU7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQzs7Ozs7Ozs7QUNwV0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Qzs7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNtQjtBQUNEO0FBQ087QUFDQTtBQUNPO0FBQ0k7QUFDVjtBQUNLO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsZ0JBQWdCLHVCQUF1QjtBQUN2QyxrQkFBa0IseUJBQXlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtIQUFtRCxJQUFJO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QseUJBQXlCO0FBQ3pFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDBDOzs7Ozs7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osdUM7Ozs7Ozs7QUNoQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQzRCO0FBQ0k7QUFDakI7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDNUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLGdEOzs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUI7QUFDbkI7QUFDZTtBQUNHO0FBQ087QUFDUztBQUNFO0FBQ0U7QUFDYjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixJQUFJO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsZ0JBQWdCLEVBQUU7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZQQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDRztBQUNDO0FBQ1M7QUFDSTtBQUNNO0FBQ2pCO0FBQ0U7QUFDZjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0EsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsVUFBVTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxRQUFRO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsMkNBQTJDLFNBQVM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7QUMvU0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsbUQ7Ozs7Ozs7OztBQ2RBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNzQjtBQUNGO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDRDOzs7Ozs7O0FDMUJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxpQkFBaUIsb0JBQW9CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsdUM7Ozs7Ozs7Ozs7QUMzQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQjtBQUNHO0FBQ2E7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUsscURBQXFEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyx5Q0FBeUM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFdBQVc7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssK0NBQStDO0FBQ3BELENBQUMsd0JBQXdCO0FBQ3pCLGtDOzs7Ozs7O0FDNUtBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7QUNsQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDO0FBQ0s7QUFDYjtBQUNQO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUFBO0FBQUE7QUFDQSxvQzs7Ozs7OztBQ3ZGQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ3lCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxrRDs7Ozs7Ozs7QUM3QkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EseUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTJiOGRmNjkxODFiZjE0N2Q5YjUiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5jb25zdCBWT0lEMCA9IHZvaWQgKDApLCBfQk9PTEVBTiA9IHR5cGVvZiB0cnVlLCBfTlVNQkVSID0gdHlwZW9mIDAsIF9TVFJJTkcgPSB0eXBlb2YgXCJcIiwgX1NZTUJPTCA9IFwic3ltYm9sXCIsIF9PQkpFQ1QgPSB0eXBlb2Yge30sIF9VTkRFRklORUQgPSB0eXBlb2YgVk9JRDAsIF9GVU5DVElPTiA9IHR5cGVvZiBmdW5jdGlvbiAoKSB7IH0sIExFTkdUSCA9IFwibGVuZ3RoXCI7XG4vLyBPbmx5IHVzZWQgZm9yIHByaW1pdGl2ZXMuXG5jb25zdCB0eXBlSW5mb1JlZ2lzdHJ5ID0ge307XG4vKipcbiAqIEV4cG9zZXMgZWFzeSBhY2Nlc3MgdG8gdHlwZSBpbmZvcm1hdGlvbiBpbmNsdWRpbmcgaW5xdWlyaW5nIGFib3V0IG1lbWJlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBUeXBlSW5mbyB7XG4gICAgY29uc3RydWN0b3IodGFyZ2V0LCBvbkJlZm9yZUZyZWV6ZSkge1xuICAgICAgICB0aGlzLmlzQm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTnVtYmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdHJpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1RydWVOYU4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc09iamVjdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRnVuY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1VuZGVmaW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTeW1ib2wgPSBmYWxzZTtcbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUgPSB0eXBlb2YgdGFyZ2V0KSB7XG4gICAgICAgICAgICBjYXNlIF9CT09MRUFOOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNCb29sZWFuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX05VTUJFUjpcbiAgICAgICAgICAgICAgICB0aGlzLmlzTnVtYmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzVHJ1ZU5hTiA9IGlzTmFOKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0Zpbml0ZSA9IGlzRmluaXRlKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ZhbGlkTnVtYmVyID0gIXRoaXMuaXNUcnVlTmFOO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNTdHJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfU1lNQk9MOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNTeW1ib2wgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfT0JKRUNUOlxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc051bGwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTnVsbE9yVW5kZWZpbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQXJyYXkgPSAodGFyZ2V0KSBpbnN0YW5jZW9mIChBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPYmplY3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX0ZVTkNUSU9OOlxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIHRoaXMuaXNGdW5jdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9VTkRFRklORUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5pc1VuZGVmaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc051bGxPclVuZGVmaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IFwiRmF0YWwgdHlwZSBmYWlsdXJlLiAgVW5rbm93biB0eXBlOiBcIiArIHRoaXMudHlwZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob25CZWZvcmVGcmVlemUpXG4gICAgICAgICAgICBvbkJlZm9yZUZyZWV6ZSh0aGlzKTtcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIFR5cGVJbmZvIGZvciBhbnkgbWVtYmVyIG9yIG5vbi1tZW1iZXIsXG4gICAgICogd2hlcmUgbm9uLW1lbWJlcnMgYXJlIG9mIHR5cGUgdW5kZWZpbmVkLlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHJldHVybnMge1R5cGVJbmZvfVxuICAgICAqL1xuICAgIG1lbWJlcihuYW1lKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLnRhcmdldDtcbiAgICAgICAgcmV0dXJuIFR5cGVJbmZvLmdldEZvcih0ICYmIChuYW1lKSBpbiAodClcbiAgICAgICAgICAgID8gdFtuYW1lXVxuICAgICAgICAgICAgOiBWT0lEMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBUeXBlSW5mbyBmb3IgYW55IHRhcmdldCBvYmplY3QuXG4gICAgICogSWYgdGhlIHRhcmdldCBvYmplY3QgaXMgb2YgYSBwcmltaXRpdmUgdHlwZSwgaXQgcmV0dXJucyB0aGUgVHlwZUluZm8gaW5zdGFuY2UgYXNzaWduZWQgdG8gdGhhdCB0eXBlLlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyB7VHlwZUluZm99XG4gICAgICovXG4gICAgc3RhdGljIGdldEZvcih0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiB0YXJnZXQ7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBfT0JKRUNUOlxuICAgICAgICAgICAgY2FzZSBfRlVOQ1RJT046XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUeXBlSW5mbyh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbmZvID0gdHlwZUluZm9SZWdpc3RyeVt0eXBlXTtcbiAgICAgICAgaWYgKCFpbmZvKVxuICAgICAgICAgICAgdHlwZUluZm9SZWdpc3RyeVt0eXBlXSA9IGluZm8gPSBuZXcgVHlwZUluZm8odGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFyZ2V0IG1hdGNoZXMgdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXModHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIHRhcmdldCBkb2VzIG5vdCBtYXRjaCB0aGUgdHlwZSAoaW5zdGFuY2VvZikuXG4gICAgICogT3RoZXJ3aXNlIHJldHVybnMgdGhlIHRhcmdldCBhcyB0aGUgdHlwZS5cbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtUfG51bGx9XG4gICAgICovXG4gICAgYXModHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQgaW5zdGFuY2VvZiB0eXBlID8gdGhpcy50YXJnZXQgOiBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBUeXBlKHRhcmdldCkge1xuICAgIHJldHVybiBuZXcgVHlwZUluZm8odGFyZ2V0KTtcbn1cbihmdW5jdGlvbiAoVHlwZSkge1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiB0cnVlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLkJPT0xFQU4gPSBfQk9PTEVBTjtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgMFxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5OVU1CRVIgPSBfTlVNQkVSO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiBcIlwiXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLlNUUklORyA9IF9TVFJJTkc7XG4gICAgLyoqXG4gICAgICogdHlwZW9mIHt9XG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLk9CSkVDVCA9IF9PQkpFQ1Q7XG4gICAgLyoqXG4gICAgICogdHlwZW9mIFN5bWJvbFxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5TWU1CT0wgPSBfU1lNQk9MO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiB1bmRlZmluZWRcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuVU5ERUZJTkVEID0gX1VOREVGSU5FRDtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgZnVuY3Rpb25cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuRlVOQ1RJT04gPSBfRlVOQ1RJT047XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB0YXJnZXQgbWF0Y2hlcyB0aGUgdHlwZSAoaW5zdGFuY2VvZikuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMge1R8bnVsbH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh0YXJnZXQsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIHR5cGU7XG4gICAgfVxuICAgIFR5cGUuaXMgPSBpcztcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIHRhcmdldCBkb2VzIG5vdCBtYXRjaCB0aGUgdHlwZSAoaW5zdGFuY2VvZikuXG4gICAgICogT3RoZXJ3aXNlIHJldHVybnMgdGhlIHRhcmdldCBhcyB0aGUgdHlwZS5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7VHxudWxsfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzKHRhcmdldCwgdHlwZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgdHlwZSA/IHRhcmdldCA6IG51bGw7XG4gICAgfVxuICAgIFR5cGUuYXMgPSBhcztcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbDtcbiAgICB9XG4gICAgVHlwZS5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFyYW1ldGVyIGlzIGEgYm9vbGVhbi5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX0JPT0xFQU47XG4gICAgfVxuICAgIFR5cGUuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFyYW1ldGVyIGlzIGEgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBpZ25vcmVOYU4gRGVmYXVsdCBpcyBmYWxzZS4gV2hlbiB0cnVlLCBOYU4gaXMgbm90IGNvbnNpZGVyZWQgYSBudW1iZXIgYW5kIHdpbGwgcmV0dXJuIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlLCBpZ25vcmVOYU4gPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfTlVNQkVSICYmICghaWdub3JlTmFOIHx8ICFpc05hTih2YWx1ZSkpO1xuICAgIH1cbiAgICBUeXBlLmlzTnVtYmVyID0gaXNOdW1iZXI7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGlzIGEgbnVtYmVyIGFuZCBpcyBOYU4uXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNUcnVlTmFOKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9OVU1CRVIgJiYgaXNOYU4odmFsdWUpO1xuICAgIH1cbiAgICBUeXBlLmlzVHJ1ZU5hTiA9IGlzVHJ1ZU5hTjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIHN0cmluZy5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfU1RSSU5HO1xuICAgIH1cbiAgICBUeXBlLmlzU3RyaW5nID0gaXNTdHJpbmc7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4sIHN0cmluZywgbnVtYmVyLCBudWxsLCBvciB1bmRlZmluZWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIGFsbG93VW5kZWZpbmVkIGlmIHNldCB0byB0cnVlIHdpbGwgcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZSwgYWxsb3dVbmRlZmluZWQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB0ID0gdHlwZW9mIHZhbHVlO1xuICAgICAgICBzd2l0Y2ggKHQpIHtcbiAgICAgICAgICAgIGNhc2UgX0JPT0xFQU46XG4gICAgICAgICAgICBjYXNlIF9TVFJJTkc6XG4gICAgICAgICAgICBjYXNlIF9OVU1CRVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjYXNlIF9VTkRFRklORUQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsbG93VW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FzZSBfT0JKRUNUOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFR5cGUuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcbiAgICAvKipcbiAgICAgKiBGb3IgZGV0ZWN0aW5nIGlmIHRoZSB2YWx1ZSBjYW4gYmUgdXNlZCBhcyBhIGtleS5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gYWxsb3dVbmRlZmluZWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzUHJpbWl0aXZlT3JTeW1ib2wodmFsdWUsIGFsbG93VW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX1NZTUJPTCA/IHRydWUgOiBpc1ByaW1pdGl2ZSh2YWx1ZSwgYWxsb3dVbmRlZmluZWQpO1xuICAgIH1cbiAgICBUeXBlLmlzUHJpbWl0aXZlT3JTeW1ib2wgPSBpc1ByaW1pdGl2ZU9yU3ltYm9sO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcsIG51bWJlciwgb3Igc3ltYm9sLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzUHJvcGVydHlLZXkodmFsdWUpIHtcbiAgICAgICAgY29uc3QgdCA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgICBjYXNlIF9TVFJJTkc6XG4gICAgICAgICAgICBjYXNlIF9OVU1CRVI6XG4gICAgICAgICAgICBjYXNlIF9TWU1CT0w6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBUeXBlLmlzUHJvcGVydHlLZXkgPSBpc1Byb3BlcnR5S2V5O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFyYW1ldGVyIGlzIGEgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfRlVOQ1RJT047XG4gICAgfVxuICAgIFR5cGUuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0LlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhbGxvd051bGwgSWYgZmFsc2UgKGRlZmF1bHQpIG51bGwgaXMgbm90IGNvbnNpZGVyZWQgYW4gb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlLCBhbGxvd051bGwgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfT0JKRUNUICYmIChhbGxvd051bGwgfHwgdmFsdWUgIT09IG51bGwpO1xuICAgIH1cbiAgICBUeXBlLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG4gICAgLyoqXG4gICAgICogR3VhcmFudGVlcyBhIG51bWJlciB2YWx1ZSBvciBOYU4gaW5zdGVhZC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG51bWJlck9yTmFOKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpc05hTih2YWx1ZSkgPyBOYU4gOiB2YWx1ZTtcbiAgICB9XG4gICAgVHlwZS5udW1iZXJPck5hTiA9IG51bWJlck9yTmFOO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBUeXBlSW5mbyBvYmplY3QgZm9yIHRoZSB0YXJnZXQuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEByZXR1cm5zIHtUeXBlSW5mb31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvZih0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIFR5cGVJbmZvLmdldEZvcih0YXJnZXQpO1xuICAgIH1cbiAgICBUeXBlLm9mID0gb2Y7XG4gICAgLyoqXG4gICAgICogV2lsbCBkZXRlY3QgaWYgYSBtZW1iZXIgZXhpc3RzICh1c2luZyAnaW4nKS5cbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYSBwcm9wZXJ0eSBvciBtZXRob2QgZXhpc3RzIG9uIHRoZSBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZS5cbiAgICAgKiBAcGFyYW0gaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgTmFtZSBvZiB0aGUgbWVtYmVyLlxuICAgICAqIEBwYXJhbSBpZ25vcmVVbmRlZmluZWQgV2hlbiBpZ25vcmVVbmRlZmluZWQgaXMgdHJ1ZSwgaWYgdGhlIG1lbWJlciBleGlzdHMgYnV0IGlzIHVuZGVmaW5lZCwgaXQgd2lsbCByZXR1cm4gZmFsc2UuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzTWVtYmVyKGluc3RhbmNlLCBwcm9wZXJ0eSwgaWdub3JlVW5kZWZpbmVkID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UgJiYgIWlzUHJpbWl0aXZlKGluc3RhbmNlKSAmJiAocHJvcGVydHkpIGluIChpbnN0YW5jZSkgJiYgKGlnbm9yZVVuZGVmaW5lZCB8fCBpbnN0YW5jZVtwcm9wZXJ0eV0gIT09IFZPSUQwKTtcbiAgICB9XG4gICAgVHlwZS5oYXNNZW1iZXIgPSBoYXNNZW1iZXI7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBtZW1iZXIgbWF0Y2hlcyB0aGUgdHlwZS5cbiAgICAgKiBAcGFyYW0gaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgcHJvcGVydHksIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGhhc01lbWJlcihpbnN0YW5jZSwgcHJvcGVydHkpICYmIHR5cGVvZiAoaW5zdGFuY2VbcHJvcGVydHldKSA9PT0gdHlwZTtcbiAgICB9XG4gICAgVHlwZS5oYXNNZW1iZXJPZlR5cGUgPSBoYXNNZW1iZXJPZlR5cGU7XG4gICAgZnVuY3Rpb24gaGFzTWV0aG9kKGluc3RhbmNlLCBwcm9wZXJ0eSkge1xuICAgICAgICByZXR1cm4gaGFzTWVtYmVyT2ZUeXBlKGluc3RhbmNlLCBwcm9wZXJ0eSwgX0ZVTkNUSU9OKTtcbiAgICB9XG4gICAgVHlwZS5oYXNNZXRob2QgPSBoYXNNZXRob2Q7XG4gICAgZnVuY3Rpb24gaXNBcnJheUxpa2UoaW5zdGFuY2UpIHtcbiAgICAgICAgLypcbiAgICAgICAgICogTk9URTpcbiAgICAgICAgICpcbiAgICAgICAgICogRnVuY3Rpb25zOlxuICAgICAgICAgKiBFbnVtZXJhdGluZyBhIGZ1bmN0aW9uIGFsdGhvdWdoIGl0IGhhcyBhIC5sZW5ndGggcHJvcGVydHkgd2lsbCB5aWVsZCBub3RoaW5nIG9yIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAgICAgICAgICogRWZmZWN0aXZlbHksIGEgZnVuY3Rpb24gaXMgbm90IGxpa2UgYW4gYXJyYXkuXG4gICAgICAgICAqXG4gICAgICAgICAqIFN0cmluZ3M6XG4gICAgICAgICAqIEJlaGF2ZSBsaWtlIGFycmF5cyBidXQgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBleGFjdCBtZXRob2RzLlxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgIHx8IFR5cGUuaXNTdHJpbmcoaW5zdGFuY2UpXG4gICAgICAgICAgICB8fCAhVHlwZS5pc0Z1bmN0aW9uKGluc3RhbmNlKSAmJiBoYXNNZW1iZXIoaW5zdGFuY2UsIExFTkdUSCk7XG4gICAgfVxuICAgIFR5cGUuaXNBcnJheUxpa2UgPSBpc0FycmF5TGlrZTtcbn0pKFR5cGUgfHwgKFR5cGUgPSB7fSkpO1xuT2JqZWN0LmZyZWV6ZShUeXBlKTtcbmV4cG9ydCBkZWZhdWx0IFR5cGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UeXBlcy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1R5cGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL1R5cGVzXCI7XG52YXIgaXNUcnVlTmFOID0gVHlwZS5pc1RydWVOYU47XG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbi8qKlxuICogVXNlZCBmb3Igc3BlY2lhbCBjb21wYXJpc29uIGluY2x1ZGluZyBOYU4uXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqIEBwYXJhbSBzdHJpY3RcbiAqIEByZXR1cm5zIHtib29sZWFufGFueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFyZUVxdWFsKGEsIGIsIHN0cmljdCA9IHRydWUpIHtcbiAgICByZXR1cm4gYSA9PT0gYlxuICAgICAgICB8fCAhc3RyaWN0ICYmIGEgPT0gYlxuICAgICAgICB8fCBpc1RydWVOYU4oYSkgJiYgaXNUcnVlTmFOKGIpO1xufVxuY29uc3QgQ09NUEFSRV9UTyA9IFwiY29tcGFyZVRvXCI7XG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZShhLCBiLCBzdHJpY3QgPSB0cnVlKSB7XG4gICAgaWYgKGFyZUVxdWFsKGEsIGIsIHN0cmljdCkpXG4gICAgICAgIHJldHVybiAwIC8qIEVxdWFsICovO1xuICAgIGlmIChhICYmIFR5cGUuaGFzTWVtYmVyKGEsIENPTVBBUkVfVE8pKVxuICAgICAgICByZXR1cm4gYS5jb21wYXJlVG8oYik7IC8vIElmIGEgaGFzIGNvbXBhcmVUbywgdXNlIGl0LlxuICAgIGVsc2UgaWYgKGIgJiYgVHlwZS5oYXNNZW1iZXIoYiwgQ09NUEFSRV9UTykpXG4gICAgICAgIHJldHVybiAtYi5jb21wYXJlVG8oYSk7IC8vIGEgZG9lc24ndCBoYXZlIGNvbXBhcmVUbz8gY2hlY2sgaWYgYiBkb2VzIGFuZCBpbnZlcnQuXG4gICAgLy8gQWxsb3cgZm9yIHNwZWNpYWwgaW5lcXVhbGl0eS4uXG4gICAgaWYgKGEgPiBiIHx8IHN0cmljdCAmJiAoYSA9PT0gMCAmJiBiID09IDAgfHwgYSA9PT0gbnVsbCAmJiBiID09PSBWT0lEMCkpXG4gICAgICAgIHJldHVybiAxIC8qIEdyZWF0ZXIgKi87XG4gICAgaWYgKGIgPiBhIHx8IHN0cmljdCAmJiAoYiA9PT0gMCAmJiBhID09IDAgfHwgYiA9PT0gbnVsbCAmJiBhID09PSBWT0lEMCkpXG4gICAgICAgIHJldHVybiAtMSAvKiBMZXNzICovO1xuICAgIHJldHVybiBOYU47XG59XG4vKipcbiAqIERldGVybWluZXMgaWYgdHdvIHByaW1pdGl2ZXMgYXJlIGVxdWFsIG9yIGlmIHR3byBvYmplY3RzIGhhdmUgdGhlIHNhbWUga2V5L3ZhbHVlIGNvbWJpbmF0aW9ucy5cbiAqIEBwYXJhbSBhXG4gKiBAcGFyYW0gYlxuICogQHBhcmFtIG51bGxFcXVpdmFsZW5jeSBJZiB0cnVlLCBudWxsL3VuZGVmaW5lZCB3aWxsIGJlIGVxdWl2YWxlbnQgdG8gYW4gZW1wdHkgb2JqZWN0IHt9LlxuICogQHBhcmFtIGV4dHJhRGVwdGhcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJlRXF1aXZhbGVudChhLCBiLCBudWxsRXF1aXZhbGVuY3kgPSB0cnVlLCBleHRyYURlcHRoID0gMCkge1xuICAgIC8vIFRha2UgYSBzdGVwIGJ5IHN0ZXAgYXBwcm9hY2ggdG8gZW5zdXJlIGVmZmljaWVuY3kuXG4gICAgaWYgKGFyZUVxdWFsKGEsIGIsIHRydWUpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkge1xuICAgICAgICBpZiAoIW51bGxFcXVpdmFsZW5jeSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKFR5cGUuaXNPYmplY3QoYSkpIHtcbiAgICAgICAgICAgIHJldHVybiAhT2JqZWN0LmtleXMoYSkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChUeXBlLmlzT2JqZWN0KGIpKSB7XG4gICAgICAgICAgICByZXR1cm4gIU9iamVjdC5rZXlzKGIpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYSA9PSBudWxsICYmIGIgPT0gbnVsbDtcbiAgICB9XG4gICAgaWYgKFR5cGUuaXNPYmplY3QoYSkgJiYgVHlwZS5pc09iamVjdChiKSkge1xuICAgICAgICBjb25zdCBhS2V5cyA9IE9iamVjdC5rZXlzKGEpLCBiS2V5cyA9IE9iamVjdC5rZXlzKGIpLCBsZW4gPSBhS2V5cy5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gIT0gYktleXMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBhS2V5cy5zb3J0KCk7XG4gICAgICAgIGJLZXlzLnNvcnQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGtleSA9IGFLZXlzW2ldO1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gYktleXNbaV0gfHwgIWFyZUVxdWFsKGFba2V5XSwgYltrZXldLCB0cnVlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9lc24ndCB0cmFjayBjaXJjdWxhciByZWZlcmVuY2VzIGJ1dCBhbGxvd3MgZm9yIGNvbnRyb2xsaW5nIHRoZSBhbW91bnQgb2YgcmVjdXJzaW9uLlxuICAgICAgICBpZiAoZXh0cmFEZXB0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBhS2V5cykge1xuICAgICAgICAgICAgICAgIGlmICghYXJlRXF1aXZhbGVudChhW2tleV0sIGJba2V5XSwgbnVsbEVxdWl2YWxlbmN5LCBleHRyYURlcHRoIC0gMSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tcGFyZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbXBhcmUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnQXJndW1lbnROdWxsRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBBcmd1bWVudE51bGxFeGNlcHRpb24gZXh0ZW5kcyBBcmd1bWVudEV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lLCBtZXNzYWdlID0gYCcke3BhcmFtTmFtZX0nIGlzIG51bGwgKG9yIHVuZGVmaW5lZCkuYCwgaW5uZXJFeGNlcHRpb24pIHtcbiAgICAgICAgc3VwZXIocGFyYW1OYW1lLCBtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbik7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFyZ3VtZW50TnVsbEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgU3lzdGVtRXhjZXB0aW9uIH0gZnJvbSBcIi4vU3lzdGVtRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyB0cmltIH0gZnJvbSBcIi4uL1RleHQvVXRpbGl0eVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0FyZ3VtZW50RXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBBcmd1bWVudEV4Y2VwdGlvbiBleHRlbmRzIFN5c3RlbUV4Y2VwdGlvbiB7XG4gICAgLy8gRm9yIHNpbXBsaWNpdHkgYW5kIGNvbnNpc3RlbmN5LCBsZXRzIHN0aWNrIHdpdGggMSBzaWduYXR1cmUuXG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lLCBtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbiwgYmVmb3JlU2VhbGluZykge1xuICAgICAgICBsZXQgcG4gPSBwYXJhbU5hbWUgPyAoJ3snICsgcGFyYW1OYW1lICsgJ30gJykgOiAnJztcbiAgICAgICAgc3VwZXIodHJpbShwbiArIChtZXNzYWdlIHx8ICcnKSksIGlubmVyRXhjZXB0aW9uLCAoXykgPT4ge1xuICAgICAgICAgICAgXy5wYXJhbU5hbWUgPSBwYXJhbU5hbWU7XG4gICAgICAgICAgICBpZiAoYmVmb3JlU2VhbGluZylcbiAgICAgICAgICAgICAgICBiZWZvcmVTZWFsaW5nKF8pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQXJndW1lbnRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bcmd1bWVudEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvQXJndW1lbnRFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gZXh0ZW5kcyBBcmd1bWVudEV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lLCBhY3R1YWxWYWx1ZSwgbWVzc2FnZSA9ICcgJywgaW5uZXJFeGNlcHRpb24pIHtcbiAgICAgICAgc3VwZXIocGFyYW1OYW1lLCBgKCR7YWN0dWFsVmFsdWV9KSBgICsgbWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIChfKSA9PiB7XG4gICAgICAgICAgICBfLmFjdHVhbFZhbHVlID0gYWN0dWFsVmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2VcIjtcbmltcG9ydCB7IE9iamVjdFBvb2wgfSBmcm9tIFwiLi4vLi4vRGlzcG9zYWJsZS9PYmplY3RQb29sXCI7XG5pbXBvcnQgeyBJdGVyYXRvclJlc3VsdCB9IGZyb20gXCIuL0l0ZXJhdG9yUmVzdWx0XCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xubGV0IHlpZWxkZXJQb29sO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmZ1bmN0aW9uIHlpZWxkZXIocmVjeWNsZSkge1xuICAgIGlmICgheWllbGRlclBvb2wpXG4gICAgICAgIHlpZWxkZXJQb29sXG4gICAgICAgICAgICA9IG5ldyBPYmplY3RQb29sKDQwLCAoKSA9PiBuZXcgWWllbGRlcigpLCB5ID0+IHkueWllbGRCcmVhaygpKTtcbiAgICBpZiAoIXJlY3ljbGUpXG4gICAgICAgIHJldHVybiB5aWVsZGVyUG9vbC50YWtlKCk7XG4gICAgeWllbGRlclBvb2wuYWRkKHJlY3ljbGUpO1xufVxuY2xhc3MgWWllbGRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBWT0lEMDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBOYU47XG4gICAgfVxuICAgIGdldCBjdXJyZW50KCkgeyByZXR1cm4gdGhpcy5fY3VycmVudDsgfSAvLyB0aGlzIGNsYXNzIGlzIG5vdCBlbnRpcmVseSBsb2NhbC9wcml2YXRlLiAgU3RpbGwgbmVlZHMgcHJvdGVjdGlvbi5cbiAgICBnZXQgaW5kZXgoKSB7IHJldHVybiB0aGlzLl9pbmRleDsgfVxuICAgIHlpZWxkUmV0dXJuKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSB2YWx1ZTtcbiAgICAgICAgaWYgKGlzTmFOKHRoaXMuX2luZGV4KSlcbiAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5faW5kZXgrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHlpZWxkQnJlYWsoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBWT0lEMDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBOYU47XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy55aWVsZEJyZWFrKCk7XG4gICAgfVxufVxuY29uc3QgTkFNRSA9IFwiRW51bWVyYXRvckJhc2VcIjtcbi8vIFwiRW51bWVyYXRvclwiIGlzIGNvbmZsaWN0IEpTY3JpcHQncyBcIkVudW1lcmF0b3JcIlxuLy8gTmFtaW5nIHRoaXMgY2xhc3MgRW51bWVyYXRvckJhc2UgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGggSUUuXG5leHBvcnQgY2xhc3MgRW51bWVyYXRvckJhc2UgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX2luaXRpYWxpemVyLCBfdHJ5R2V0TmV4dCwgZGlzcG9zZXIsIGlzRW5kbGVzcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplciA9IF9pbml0aWFsaXplcjtcbiAgICAgICAgdGhpcy5fdHJ5R2V0TmV4dCA9IF90cnlHZXROZXh0O1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IE5BTUU7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgaWYgKFR5cGUuaXNCb29sZWFuKGlzRW5kbGVzcykpXG4gICAgICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBpc0VuZGxlc3M7XG4gICAgICAgIGVsc2UgaWYgKFR5cGUuaXNCb29sZWFuKGRpc3Bvc2VyKSlcbiAgICAgICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGRpc3Bvc2VyO1xuICAgICAgICBpZiAoVHlwZS5pc0Z1bmN0aW9uKGRpc3Bvc2VyKSlcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2VyID0gZGlzcG9zZXI7XG4gICAgfVxuICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5feWllbGRlcjtcbiAgICAgICAgcmV0dXJuIHkgJiYgeS5jdXJyZW50O1xuICAgIH1cbiAgICBnZXQgaW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLl95aWVsZGVyO1xuICAgICAgICByZXR1cm4geSA/IHkuaW5kZXggOiBOYU47XG4gICAgfVxuICAgIC8qXG4gICAgICogUHJvdmlkZXMgYSBtZWNoYW5pc20gdG8gaW5kaWNhdGUgaWYgdGhpcyBlbnVtZXJhYmxlIG5ldmVyIGVuZHMuXG4gICAgICogSWYgc2V0IHRvIHRydWUsIHNvbWUgb3BlcmF0aW9ucyB0aGF0IGV4cGVjdCBhIGZpbml0ZSByZXN1bHQgbWF5IHRocm93LlxuICAgICAqIEV4cGxpY2l0IGZhbHNlIG1lYW5zIGl0IGhhcyBhbiBlbmQuXG4gICAgICogSW1wbGljaXQgdm9pZCBtZWFucyB1bmtub3duLlxuICAgICAqL1xuICAgIGdldCBpc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VuZGxlc3M7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZGVkIGZvciBjb21wYXRpYmlsaXR5IGJ1dCBvbmx5IHdvcmtzIGlmIHRoZSBlbnVtZXJhdG9yIGlzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICByZXNldCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHkgPSBfLl95aWVsZGVyO1xuICAgICAgICBfLl95aWVsZGVyID0gbnVsbDtcbiAgICAgICAgXy5fc3RhdGUgPSAwIC8qIEJlZm9yZSAqLztcbiAgICAgICAgaWYgKHkpXG4gICAgICAgICAgICB5aWVsZGVyKHkpOyAvLyByZWN5Y2xlIHVudGlsIGFjdHVhbGx5IG5lZWRlZC5cbiAgICB9XG4gICAgX2Fzc2VydEJhZFN0YXRlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgc3dpdGNoIChfLl9zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAzIC8qIEZhdWx0ZWQgKi86XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGlzIGVudW1lcmF0b3IgY2F1c2VkIGEgZmF1bHQgYW5kIHdhcyBkaXNwb3NlZC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDUgLyogRGlzcG9zZWQgKi86XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGlzIGVudW1lcmF0b3Igd2FzIG1hbnVhbGx5IGRpc3Bvc2VkLlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXNzZXMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gdGhlIG91dCBjYWxsYmFjayBpZiB0aGUgZW51bWVyYXRvciBpcyBhY3RpdmUuXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIHRyeUdldEN1cnJlbnQob3V0KSB7XG4gICAgICAgIHRoaXMuX2Fzc2VydEJhZFN0YXRlKCk7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gMSAvKiBBY3RpdmUgKi8pIHtcbiAgICAgICAgICAgIG91dCh0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQgY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZSA8IDIgLyogQ29tcGxldGVkICovO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYWZlbHkgbW92ZXMgdG8gdGhlIG5leHQgZW50cnkgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBvbmUuXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIG1vdmVOZXh0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fYXNzZXJ0QmFkU3RhdGUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN3aXRjaCAoXy5fc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDAgLyogQmVmb3JlICovOlxuICAgICAgICAgICAgICAgICAgICBfLl95aWVsZGVyID0gXy5feWllbGRlciB8fCB5aWVsZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF8uX3N0YXRlID0gMSAvKiBBY3RpdmUgKi87XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxpemVyID0gXy5faW5pdGlhbGl6ZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSAxIC8qIEFjdGl2ZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uX3RyeUdldE5leHQoXy5feWllbGRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLl9zdGF0ZSA9IDIgLyogQ29tcGxldGVkICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIF8uX3N0YXRlID0gMyAvKiBGYXVsdGVkICovO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBlbnRyeSBhbmQgZW1pdHMgdGhlIHZhbHVlIHRocm91Z2ggdGhlIG91dCBjYWxsYmFjay5cbiAgICAgKiBOb3RlOiBXaWxsIHRocm93IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uIGlmIHRoaXMgaGFzIGZhdWx0ZWQgb3IgbWFudWFsbHkgZGlzcG9zZWQuXG4gICAgICovXG4gICAgdHJ5TW92ZU5leHQob3V0KSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIG91dCh0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBuZXh0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVOZXh0KClcbiAgICAgICAgICAgID8gdGhpcy5jdXJyZW50XG4gICAgICAgICAgICA6IFZPSUQwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeHBvc2VkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggZ2VuZXJhdG9ycy5cbiAgICAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlTmV4dCgpXG4gICAgICAgICAgICA/IG5ldyBJdGVyYXRvclJlc3VsdCh0aGlzLmN1cnJlbnQsIHRoaXMuaW5kZXgpXG4gICAgICAgICAgICA6IEl0ZXJhdG9yUmVzdWx0LkRvbmU7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlRGlzcG9zZVN0YXRlKDQgLyogSW50ZXJydXB0ZWQgKi8pO1xuICAgIH1cbiAgICAncmV0dXJuJyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fYXNzZXJ0QmFkU3RhdGUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gVk9JRDAgfHwgXy5fc3RhdGUgPT09IDIgLyogQ29tcGxldGVkICovIHx8IF8uX3N0YXRlID09PSA0IC8qIEludGVycnVwdGVkICovXG4gICAgICAgICAgICAgICAgPyBJdGVyYXRvclJlc3VsdC5Eb25lXG4gICAgICAgICAgICAgICAgOiBuZXcgSXRlcmF0b3JSZXN1bHQodmFsdWUsIFZPSUQwLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2Vuc3VyZURpc3Bvc2VTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLndhc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBfLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIF8uX3N0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2lzRW5kbGVzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBkaXNwb3NlciA9IF8uX2Rpc3Bvc2VyO1xuICAgICAgICBfLl9pbml0aWFsaXplciA9IG51bGw7XG4gICAgICAgIF8uX2Rpc3Bvc2VyID0gbnVsbDtcbiAgICAgICAgY29uc3QgeSA9IF8uX3lpZWxkZXI7XG4gICAgICAgIF8uX3lpZWxkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IDUgLyogRGlzcG9zZWQgKi87XG4gICAgICAgIGlmICh5KVxuICAgICAgICAgICAgeWllbGRlcih5KTtcbiAgICAgICAgaWYgKGRpc3Bvc2VyKVxuICAgICAgICAgICAgZGlzcG9zZXIoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBFbnVtZXJhdG9yQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVudW1lcmF0b3JCYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuL0V4Y2VwdGlvbnMvQXJndW1lbnRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5leHBvcnQgZnVuY3Rpb24gSW50ZWdlcihuKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3Iobik7XG59XG4oZnVuY3Rpb24gKEludGVnZXIpIHtcbiAgICBJbnRlZ2VyLk1BWF8zMl9CSVQgPSAyMTQ3NDgzNjQ3O1xuICAgIEludGVnZXIuTUFYX1ZBTFVFID0gOTAwNzE5OTI1NDc0MDk5MTtcbiAgICBjb25zdCBOVU1CRVIgPSBcIm51bWJlclwiO1xuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGFueSBudW1iZXIgdG8gaXRzIDMyYml0IGNvdW50ZXJwYXJ0LlxuICAgICAqIFRocm93cyBpZiBjb252ZXJzaW9uIGlzIG5vdCBwb3NzaWJsZS5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gYXMzMkJpdChuKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG4gfCAwO1xuICAgICAgICBpZiAoaXNOYU4obikpXG4gICAgICAgICAgICB0aHJvdyBcIiduJyBpcyBub3QgYSBudW1iZXIuXCI7XG4gICAgICAgIGlmIChuICE9PSAtMSAmJiByZXN1bHQgPT09IC0xKVxuICAgICAgICAgICAgdGhyb3cgXCInbicgaXMgdG9vIGxhcmdlIHRvIGJlIGEgMzIgYml0IGludGVnZXIuXCI7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIEludGVnZXIuYXMzMkJpdCA9IGFzMzJCaXQ7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXMobikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG4gPT09IE5VTUJFUiAmJiBpc0Zpbml0ZShuKSAmJiBuID09PSBNYXRoLmZsb29yKG4pO1xuICAgIH1cbiAgICBJbnRlZ2VyLmlzID0gaXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyB3aXRoaW4gYSAzMiBiaXQgcmFuZ2UuXG4gICAgICogQHBhcmFtIG5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpczMyQml0KG4pIHtcbiAgICAgICAgcmV0dXJuIG4gPT09IChuIHwgMCk7XG4gICAgfVxuICAgIEludGVnZXIuaXMzMkJpdCA9IGlzMzJCaXQ7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIG5vdCBhbiBpbnRlZ2VyLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHBhcmFtIGFyZ3VtZW50TmFtZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzc2VydChuLCBhcmd1bWVudE5hbWUpIHtcbiAgICAgICAgbGV0IGkgPSBpcyhuKTtcbiAgICAgICAgaWYgKCFpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKGFyZ3VtZW50TmFtZSB8fCAnbicsIFwiTXVzdCBiZSBhIGludGVnZXIuXCIpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgSW50ZWdlci5hc3NlcnQgPSBhc3NlcnQ7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIGxlc3MgdGhhbiB6ZXJvLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHBhcmFtIGFyZ3VtZW50TmFtZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzc2VydFplcm9PckdyZWF0ZXIobiwgYXJndW1lbnROYW1lKSB7XG4gICAgICAgIGxldCBpID0gYXNzZXJ0KG4sIGFyZ3VtZW50TmFtZSkgJiYgbiA+PSAwO1xuICAgICAgICBpZiAoIWkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKGFyZ3VtZW50TmFtZSB8fCAnbicsIG4sIFwiTXVzdCBiZSBhIHZhbGlkIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHplcm8uXCIpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyID0gYXNzZXJ0WmVyb09yR3JlYXRlcjtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgaWYgbm90IGdyZWF0ZXIgdGhhbiB6ZXJvLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHBhcmFtIGFyZ3VtZW50TmFtZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzc2VydFBvc2l0aXZlKG4sIGFyZ3VtZW50TmFtZSkge1xuICAgICAgICBsZXQgaSA9IGFzc2VydChuLCBhcmd1bWVudE5hbWUpICYmIG4gPiAwO1xuICAgICAgICBpZiAoIWkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKGFyZ3VtZW50TmFtZSB8fCAnbicsIG4sIFwiTXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby5cIik7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgICBJbnRlZ2VyLmFzc2VydFBvc2l0aXZlID0gYXNzZXJ0UG9zaXRpdmU7XG59KShJbnRlZ2VyIHx8IChJbnRlZ2VyID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEludGVnZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnRlZ2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vSW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvc3lzdGVtLnN5c3RlbWV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ1N5c3RlbUV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgU3lzdGVtRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uIHtcbiAgICAvKlxuICAgICAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIG1lc3NhZ2U6c3RyaW5nID0gbnVsbCxcbiAgICAgICAgICAgIGlubmVyRXhjZXB0aW9uOkVycm9yID0gbnVsbCxcbiAgICAgICAgICAgIGJlZm9yZVNlYWxpbmc/OihleDphbnkpPT52b2lkKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdXBlcihtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbiwgYmVmb3JlU2VhbGluZyk7XG4gICAgICAgIH1cbiAgICAqL1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFN5c3RlbUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN5c3RlbUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvU3lzdGVtRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gfSBmcm9tIFwiLi9PYmplY3REaXNwb3NlZEV4Y2VwdGlvblwiO1xuZXhwb3J0IGNsYXNzIERpc3Bvc2FibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihfX2ZpbmFsaXplcikge1xuICAgICAgICB0aGlzLl9fZmluYWxpemVyID0gX19maW5hbGl6ZXI7XG4gICAgICAgIHRoaXMuX193YXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgd2FzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fd2FzRGlzcG9zZWQ7XG4gICAgfVxuICAgIHRocm93SWZEaXNwb3NlZChtZXNzYWdlLCBvYmplY3ROYW1lID0gdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX193YXNEaXNwb3NlZClcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbihvYmplY3ROYW1lLCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIV8uX193YXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgLy8gUHJlZW1wdGl2ZWx5IHNldCB3YXNEaXNwb3NlZCBpbiBvcmRlciB0byBwcmV2ZW50IHJlcGVhdGVkIGRpc3Bvc2luZy5cbiAgICAgICAgICAgIC8vIE5PVEU6IGluIHRydWUgbXVsdGktdGhyZWFkZWQgc2NlbmFyaW9zLCB0aGlzIG5lZWRzIHRvIGJlIHN5bmNocm9uaXplZC5cbiAgICAgICAgICAgIF8uX193YXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF8uX29uRGlzcG9zZSgpOyAvLyBQcm90ZWN0ZWQgb3ZlcnJpZGUuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoXy5fX2ZpbmFsaXplcikge1xuICAgICAgICAgICAgICAgICAgICBfLl9fZmluYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF8uX19maW5hbGl6ZXIgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFBsYWNlaG9sZGVyIGZvciBvdmVycmlkZXMuXG4gICAgX29uRGlzcG9zZSgpIHsgfVxufVxuZXhwb3J0IGRlZmF1bHQgRGlzcG9zYWJsZUJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaXNwb3NhYmxlQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uLy4uL0ludGVnZXJcIjtcbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgZGVwZW5kaW5nIG9uIHRoZSByZXF1ZXN0ZWQgY2FwYWNpdHkuXG4gKiBUaGUgcmV0dXJuZWQgYXJyYXkgd2lsbCBoYXZlIGEgLmxlbmd0aCBlcXVhbCB0byB0aGUgdmFsdWUgcHJvdmlkZWQuXG4gKiBAcGFyYW0gbGVuZ3RoXG4gKiBAcmV0dXJucyB7VFtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZShsZW5ndGgpIHtcbiAgICBJbnRlZ2VyLmFzc2VydChsZW5ndGgsICdsZW5ndGgnKTtcbiAgICAvLyBUaGlzIGxvZ2ljIGlzIGJhc2VkIHVwb24gSlMgcGVyZm9ybWFuY2UgdGVzdHMgdGhhdCBzaG93IGEgc2lnbmlmaWNhbnQgZGlmZmVyZW5jZSBhdCB0aGUgbGV2ZWwgb2YgNjU1MzYuXG4gICAgbGV0IGFycmF5O1xuICAgIGlmIChsZW5ndGggPiA2NTUzNilcbiAgICAgICAgYXJyYXkgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBlbHNlIHtcbiAgICAgICAgYXJyYXkgPSBbXTtcbiAgICAgICAgYXJyYXkubGVuZ3RoID0gbGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbml0aWFsaXplLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvaW5pdGlhbGl6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyB1c2luZyB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL2Rpc3Bvc2VcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IEFycmF5RW51bWVyYXRvciB9IGZyb20gXCIuL0FycmF5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgSW5kZXhFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSW5kZXhFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24gfSBmcm9tIFwiLi9VbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb25cIjtcbmltcG9ydCB7IEluZmluaXRlRW51bWVyYXRvciB9IGZyb20gXCIuL0luZmluaXRlRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgRW1wdHlFbnVtZXJhdG9yIGFzIEVtcHR5IH0gZnJvbSBcIi4vRW1wdHlFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBJdGVyYXRvckVudW1lcmF0b3IgfSBmcm9tIFwiLi9JdGVyYXRvckVudW1lcmF0b3JcIjtcbmNvbnN0IFNUUklOR19FTVBUWSA9IFwiXCIsIEVORExFU1NfRVhDRVBUSU9OX01FU1NBR0UgPSAnQ2Fubm90IGNhbGwgZm9yRWFjaCBvbiBhbiBlbmRsZXNzIGVudW1lcmFibGUuICcgK1xuICAgICdXb3VsZCByZXN1bHQgaW4gYW4gaW5maW5pdGUgbG9vcCB0aGF0IGNvdWxkIGhhbmcgdGhlIGN1cnJlbnQgcHJvY2Vzcy4nO1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93SWZFbmRsZXNzKGlzRW5kbGVzcykge1xuICAgIGlmIChpc0VuZGxlc3MpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oRU5ETEVTU19FWENFUFRJT05fTUVTU0FHRSk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBpbml0QXJyYXlGcm9tKHNvdXJjZSwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShzb3VyY2UpKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWluKHNvdXJjZS5sZW5ndGgsIG1heCk7XG4gICAgICAgIGlmIChpc0Zpbml0ZShsZW4pKSB7XG4gICAgICAgICAgICBpZiAobGVuID4gNjU1MzUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShsZW4pO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgICAgICByZXN1bHQubGVuZ3RoID0gbGVuO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG59XG4vLyBDb3VsZCBiZSBhcnJheSwgb3IgSUVudW1lcmFibGUuLi5cbi8qKlxuICogUmV0dXJucyB0aGUgZW51bWVyYXRvciBmb3IgdGhlIHNwZWNpZmllZCBjb2xsZWN0aW9uLCBlbnVtZXJhdG9yLCBvciBpdGVyYXRvci5cbiAqIElmIHRoZSBzb3VyY2UgaXMgaWRlbnRpZmllZCBhcyBJRW51bWVyYXRvciBpdCB3aWxsIHJldHVybiB0aGUgc291cmNlIGFzIGlzLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb20oc291cmNlKSB7XG4gICAgLy8gVG8gc2ltcGxpZnkgYW5kIHByZXZlbnQgbnVsbCByZWZlcmVuY2UgZXhjZXB0aW9uczpcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIEVtcHR5O1xuICAgIGlmICgoc291cmNlKSBpbnN0YW5jZW9mIChBcnJheSkpXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhdG9yKHNvdXJjZSk7XG4gICAgaWYgKFR5cGUuaXNBcnJheUxpa2Uoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gbmV3IEluZGV4RW51bWVyYXRvcigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogc291cmNlLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBwb2ludGVyOiAwLFxuICAgICAgICAgICAgICAgIHN0ZXA6IDFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIVR5cGUuaXNQcmltaXRpdmUoc291cmNlKSkge1xuICAgICAgICBpZiAoaXNFbnVtZXJhYmxlKHNvdXJjZSkpXG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgaWYgKFR5cGUuaXNGdW5jdGlvbihzb3VyY2UpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUVudW1lcmF0b3Ioc291cmNlKTtcbiAgICAgICAgaWYgKGlzRW51bWVyYXRvcihzb3VyY2UpKVxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgaWYgKGlzSXRlcmF0b3Ioc291cmNlKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgSXRlcmF0b3JFbnVtZXJhdG9yKHNvdXJjZSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VudW1lcmFibGUoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gVHlwZS5oYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIFwiZ2V0RW51bWVyYXRvclwiLCBUeXBlLkZVTkNUSU9OKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VudW1lcmFibGVPckFycmF5TGlrZShpbnN0YW5jZSkge1xuICAgIHJldHVybiBUeXBlLmlzQXJyYXlMaWtlKGluc3RhbmNlKSB8fCBpc0VudW1lcmFibGUoaW5zdGFuY2UpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRW51bWVyYXRvcihpbnN0YW5jZSkge1xuICAgIHJldHVybiBUeXBlLmhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgXCJtb3ZlTmV4dFwiLCBUeXBlLkZVTkNUSU9OKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0l0ZXJhdG9yKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIFR5cGUuaGFzTWVtYmVyT2ZUeXBlKGluc3RhbmNlLCBcIm5leHRcIiwgVHlwZS5GVU5DVElPTik7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChlLCBhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKGUgPT09IFNUUklOR19FTVBUWSlcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKGUgJiYgbWF4ID4gMCkge1xuICAgICAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShlKSkge1xuICAgICAgICAgICAgLy8gQXNzdW1lIGUubGVuZ3RoIGlzIGNvbnN0YW50IG9yIGF0IGxlYXN0IGRvZXNuJ3QgZGV2aWF0ZSB0byBpbmZpbml0ZSBvciBOYU4uXG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiAhaXNGaW5pdGUoZS5sZW5ndGgpKTtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgTWF0aC5taW4oZS5sZW5ndGgsIG1heCk7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24oZVtpXSwgaSkgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0VudW1lcmF0b3IoZSkpIHtcbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpICYmIGUuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIC8vIFJldHVybiB2YWx1ZSBvZiBhY3Rpb24gY2FuIGJlIGFueXRoaW5nLCBidXQgaWYgaXQgaXMgKD09PSkgZmFsc2UgdGhlbiB0aGUgZm9yRWFjaCB3aWxsIGRpc2NvbnRpbnVlLlxuICAgICAgICAgICAgd2hpbGUgKG1heCA+IGkgJiYgZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbihlLmN1cnJlbnQsIGkrKykgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0VudW1lcmFibGUoZSkpIHtcbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpICYmIGUuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIC8vIEZvciBlbnVtZXJhdG9ycyB0aGF0IGFyZW4ndCBFbnVtZXJhYmxlQmFzZSwgZW5zdXJlIGRpc3Bvc2UgaXMgY2FsbGVkLlxuICAgICAgICAgICAgcmV0dXJuIHVzaW5nKGUuZ2V0RW51bWVyYXRvcigpLCBmID0+IGZvckVhY2goZiwgYWN0aW9uLCBtYXgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJdGVyYXRvcihlKSkge1xuICAgICAgICAgICAgLy8gRm9yIG91ciBwdXJwb3NlIGl0ZXJhdG9ycyBhcmUgZW5kbGVzcyBhbmQgYSBtYXggbXVzdCBiZSBzcGVjaWZpZWQgYmVmb3JlIGl0ZXJhdGluZy5cbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpKTtcbiAgICAgICAgICAgIGxldCBpID0gMCwgcjtcbiAgICAgICAgICAgIC8vIFJldHVybiB2YWx1ZSBvZiBhY3Rpb24gY2FuIGJlIGFueXRoaW5nLCBidXQgaWYgaXQgaXMgKD09PSkgZmFsc2UgdGhlbiB0aGUgZm9yRWFjaCB3aWxsIGRpc2NvbnRpbnVlLlxuICAgICAgICAgICAgd2hpbGUgKG1heCA+IGkgJiYgIShyID0gZS5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKHIudmFsdWUsIGkrKykgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbi8qKlxuICogQ29udmVydHMgYW55IGVudW1lcmFibGUgdG8gYW4gYXJyYXkuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gbWF4IFN0b3BzIGFmdGVyIG1heCBpcyByZWFjaGVkLiAgQWxsb3dzIGZvciBmb3JFYWNoIHRvIGJlIGNhbGxlZCBvbiBpbmZpbml0ZSBlbnVtZXJhdGlvbnMuXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheShzb3VyY2UsIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKHNvdXJjZSA9PT0gU1RSSU5HX0VNUFRZKVxuICAgICAgICByZXR1cm4gW107XG4gICAgaWYgKCFpc0Zpbml0ZShtYXgpICYmIChzb3VyY2UpIGluc3RhbmNlb2YgKEFycmF5KSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGluaXRBcnJheUZyb20oc291cmNlLCBtYXgpO1xuICAgIGlmICgtMSA9PT0gZm9yRWFjaChzb3VyY2UsIChlLCBpKSA9PiB7IHJlc3VsdFtpXSA9IGU7IH0sIG1heCkpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbnkgZW51bWVyYWJsZSB0byBhbiBhcnJheSBvZiBzZWxlY3RlZCB2YWx1ZXMuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gc2VsZWN0b3JcbiAqIEBwYXJhbSBtYXggU3RvcHMgYWZ0ZXIgbWF4IGlzIHJlYWNoZWQuICBBbGxvd3MgZm9yIGZvckVhY2ggdG8gYmUgY2FsbGVkIG9uIGluZmluaXRlIGVudW1lcmF0aW9ucy5cbiAqIEByZXR1cm5zIHtUUmVzdWx0W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXAoc291cmNlLCBzZWxlY3RvciwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoc291cmNlID09PSBTVFJJTkdfRU1QVFkpXG4gICAgICAgIHJldHVybiBbXTtcbiAgICBpZiAoIWlzRmluaXRlKG1heCkgJiYgKHNvdXJjZSkgaW5zdGFuY2VvZiAoQXJyYXkpKVxuICAgICAgICByZXR1cm4gc291cmNlLm1hcChzZWxlY3Rvcik7XG4gICAgY29uc3QgcmVzdWx0ID0gaW5pdEFycmF5RnJvbShzb3VyY2UsIG1heCk7XG4gICAgaWYgKC0xID09PSBmb3JFYWNoKHNvdXJjZSwgKGUsIGkpID0+IHsgcmVzdWx0W2ldID0gc2VsZWN0b3IoZSwgaSk7IH0sIG1heCkpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuLyoqXG4gKiBUYWtlcyBhbnkgbnVtYmVyIG9mIGRpc3Bvc2FibGVzIGFzIGFyZ3VtZW50cyBhbmQgYXR0ZW1wdHMgdG8gZGlzcG9zZSB0aGVtLlxuICogQW55IGV4Y2VwdGlvbnMgdGhyb3duIHdpdGhpbiBhIGRpc3Bvc2UgYXJlIG5vdCB0cmFwcGVkLlxuICogVXNlICdkaXNwb3NlV2l0aG91dEV4Y2VwdGlvbicgdG8gYXV0b21hdGljYWxseSB0cmFwIGV4Y2VwdGlvbnMuXG4gKlxuICogQ2FuIGFjY2VwdCA8YW55PiBhbmQgd2lsbCBpZ25vcmUgb2JqZWN0cyB0aGF0IGRvbid0IGhhdmUgYSBkaXNwb3NlKCkgbWV0aG9kLlxuICogQHBhcmFtIGRpc3Bvc2FibGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwb3NlKC4uLmRpc3Bvc2FibGVzKSB7XG4gICAgLy8gVGhlIGRpc3Bvc2FibGVzIGFyZ3VtZW50cyBhcnJheSBpcyBlZmZlY3RpdmVseSBsb2NhbGl6ZWQgc28gaXQncyBzYWZlLlxuICAgIGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCBmYWxzZSk7XG59XG4oZnVuY3Rpb24gKGRpc3Bvc2UpIHtcbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyB3aGVuIG9ubHkgZGlzcG9zaW5nIG9uZSBvYmplY3QgdG8gYXZvaWQgY3JlYXRpb24gb2YgYXJyYXlzLlxuICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlXG4gICAgICogQHBhcmFtIHRyYXBFeGNlcHRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2luZ2xlKGRpc3Bvc2FibGUsIHRyYXBFeGNlcHRpb25zID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGRpc3Bvc2FibGUpXG4gICAgICAgICAgICBkaXNwb3NlU2luZ2xlKGRpc3Bvc2FibGUsIHRyYXBFeGNlcHRpb25zKTtcbiAgICB9XG4gICAgZGlzcG9zZS5zaW5nbGUgPSBzaW5nbGU7XG4gICAgZnVuY3Rpb24gZGVmZXJyZWQoLi4uZGlzcG9zYWJsZXMpIHtcbiAgICAgICAgdGhlc2UuZGVmZXJyZWQoZGlzcG9zYWJsZXMpO1xuICAgIH1cbiAgICBkaXNwb3NlLmRlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgLyoqXG4gICAgICogVGFrZXMgYW55IG51bWJlciBvZiBkaXNwb3NhYmxlcyBhbmQgdHJhcHMgYW55IGVycm9ycyB0aGF0IG9jY3VyIHdoZW4gZGlzcG9zaW5nLlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIGV4Y2VwdGlvbnMgdGhyb3duLlxuICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICAgICAqIEByZXR1cm5zIHthbnlbXX0gUmV0dXJucyBhbiBhcnJheSBvZiBleGNlcHRpb25zIHRoYXQgb2NjdXJyZWQsIGlmIHRoZXJlIGFyZSBhbnkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gd2l0aG91dEV4Y2VwdGlvbiguLi5kaXNwb3NhYmxlcykge1xuICAgICAgICAvLyBUaGUgZGlzcG9zYWJsZXMgYXJndW1lbnRzIGFycmF5IGlzIGVmZmVjdGl2ZWx5IGxvY2FsaXplZCBzbyBpdCdzIHNhZmUuXG4gICAgICAgIHJldHVybiBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgdHJ1ZSk7XG4gICAgfVxuICAgIGRpc3Bvc2Uud2l0aG91dEV4Y2VwdGlvbiA9IHdpdGhvdXRFeGNlcHRpb247XG4gICAgLyoqXG4gICAgICogVGFrZXMgYW4gYXJyYXkgb2YgZGlzcG9zYWJsZSBvYmplY3RzIGFuZCBlbnN1cmVzIHRoZXkgYXJlIGRpc3Bvc2VkLlxuICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICAgICAqIEBwYXJhbSB0cmFwRXhjZXB0aW9ucyBJZiB0cnVlLCBwcmV2ZW50cyBleGNlcHRpb25zIGZyb20gYmVpbmcgdGhyb3duIHdoZW4gZGlzcG9zaW5nLlxuICAgICAqIEByZXR1cm5zIHthbnlbXX0gSWYgJ3RyYXBFeGNlcHRpb25zJyBpcyB0cnVlLCByZXR1cm5zIGFuIGFycmF5IG9mIGV4Y2VwdGlvbnMgdGhhdCBvY2N1cnJlZCwgaWYgdGhlcmUgYXJlIGFueS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0aGVzZShkaXNwb3NhYmxlcywgdHJhcEV4Y2VwdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmxlbmd0aFxuICAgICAgICAgICAgPyBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcy5zbGljZSgpLCB0cmFwRXhjZXB0aW9ucylcbiAgICAgICAgICAgIDogdm9pZCAwO1xuICAgIH1cbiAgICBkaXNwb3NlLnRoZXNlID0gdGhlc2U7XG4gICAgKGZ1bmN0aW9uICh0aGVzZSkge1xuICAgICAgICBmdW5jdGlvbiBkZWZlcnJlZChkaXNwb3NhYmxlcywgZGVsYXkgPSAwKSB7XG4gICAgICAgICAgICBpZiAoZGlzcG9zYWJsZXMgJiYgZGlzcG9zYWJsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoZGVsYXkgPj0gMCkpXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5ID0gMDtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGRpc3Bvc2VUaGVzZUludGVybmFsLCBkZWxheSwgZGlzcG9zYWJsZXMuc2xpY2UoKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhlc2UuZGVmZXJyZWQgPSBkZWZlcnJlZDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZSB0aGlzIHVuc2FmZSBtZXRob2Qgd2hlbiBndWFyYW50ZWVkIG5vdCB0byBjYXVzZSBldmVudHMgdGhhdCB3aWxsIG1ha2UgbW9kaWZpY2F0aW9ucyB0byB0aGUgZGlzcG9zYWJsZXMgYXJyYXkuXG4gICAgICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICAgICAgICAgKiBAcGFyYW0gdHJhcEV4Y2VwdGlvbnNcbiAgICAgICAgICogQHJldHVybnMge2FueVtdfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbm9Db3B5KGRpc3Bvc2FibGVzLCB0cmFwRXhjZXB0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmxlbmd0aFxuICAgICAgICAgICAgICAgID8gZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMsIHRyYXBFeGNlcHRpb25zKVxuICAgICAgICAgICAgICAgIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICAgIHRoZXNlLm5vQ29weSA9IG5vQ29weTtcbiAgICB9KSh0aGVzZSA9IGRpc3Bvc2UudGhlc2UgfHwgKGRpc3Bvc2UudGhlc2UgPSB7fSkpO1xufSkoZGlzcG9zZSB8fCAoZGlzcG9zZSA9IHt9KSk7XG4vKipcbiAqIEp1c3QgbGlrZSBpbiBDIyB0aGlzICd1c2luZycgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHBhc3NlZCBkaXNwb3NhYmxlIGlzIGRpc3Bvc2VkIHdoZW4gdGhlIGNsb3N1cmUgaGFzIGZpbmlzaGVkLlxuICpcbiAqIFVzYWdlOlxuICogYGBgdHlwZXNjcmlwdFxuICogdXNpbmcobmV3IERpc3Bvc2FibGVPYmplY3QoKSwobXlPYmopPT57XG4gICAgICogICAvLyBkbyB3b3JrIHdpdGggbXlPYmpcbiAgICAgKiB9KTtcbiAqIC8vIG15T2JqIGF1dG9tYXRpY2FsbHkgaGFzIGl0J3MgZGlzcG9zZSBtZXRob2QgY2FsbGVkLlxuICogYGBgXG4gKlxuICogQHBhcmFtIGRpc3Bvc2FibGUgT2JqZWN0IHRvIGJlIGRpc3Bvc2VkLlxuICogQHBhcmFtIGNsb3N1cmUgRnVuY3Rpb24gY2FsbCB0byBleGVjdXRlLlxuICogQHJldHVybnMge1RSZXR1cm59IFJldHVybnMgd2hhdGV2ZXIgdGhlIGNsb3N1cmUncyByZXR1cm4gdmFsdWUgaXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2luZyhkaXNwb3NhYmxlLCBjbG9zdXJlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNsb3N1cmUoZGlzcG9zYWJsZSk7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBkaXNwb3NlU2luZ2xlKGRpc3Bvc2FibGUsIGZhbHNlKTtcbiAgICB9XG59XG4vKipcbiAqIFRoaXMgcHJpdmF0ZSBmdW5jdGlvbiBtYWtlcyBkaXNwb3NpbmcgbW9yZSByb2J1c3QgZm9yIHdoZW4gdGhlcmUncyBubyB0eXBlIGNoZWNraW5nLlxuICogSWYgdHJhcEV4Y2VwdGlvbnMgaXMgJ3RydWUnIGl0IGNhdGNoZXMgYW5kIHJldHVybnMgYW55IGV4Y2VwdGlvbiBpbnN0ZWFkIG9mIHRocm93aW5nLlxuICovXG5mdW5jdGlvbiBkaXNwb3NlU2luZ2xlKGRpc3Bvc2FibGUsIHRyYXBFeGNlcHRpb25zKSB7XG4gICAgaWYgKGRpc3Bvc2FibGVcbiAgICAgICAgJiYgdHlwZW9mIGRpc3Bvc2FibGUgPT0gVHlwZS5PQkpFQ1RcbiAgICAgICAgJiYgdHlwZW9mIGRpc3Bvc2FibGVbJ2Rpc3Bvc2UnXSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgaWYgKHRyYXBFeGNlcHRpb25zKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogVGhpcyBkaXNwb3NlIG1ldGhvZCBhc3N1bWVzIGl0J3Mgd29ya2luZyBvbiBhIGxvY2FsIGFycmF5Q29weSBhbmQgaXMgdW5zYWZlIGZvciBleHRlcm5hbCB1c2UuXG4gKi9cbmZ1bmN0aW9uIGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCB0cmFwRXhjZXB0aW9ucywgaW5kZXggPSAwKSB7XG4gICAgbGV0IGV4Y2VwdGlvbnM7XG4gICAgY29uc3QgbGVuID0gZGlzcG9zYWJsZXMgPyBkaXNwb3NhYmxlcy5sZW5ndGggOiAwO1xuICAgIGZvciAoOyBpbmRleCA8IGxlbjsgaW5kZXgrKykge1xuICAgICAgICBsZXQgbmV4dCA9IGRpc3Bvc2FibGVzW2luZGV4XTtcbiAgICAgICAgaWYgKCFuZXh0KVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGlmICh0cmFwRXhjZXB0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgZXggPSBkaXNwb3NlU2luZ2xlKG5leHQsIHRydWUpO1xuICAgICAgICAgICAgaWYgKGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGNlcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICBleGNlcHRpb25zID0gW107XG4gICAgICAgICAgICAgICAgZXhjZXB0aW9ucy5wdXNoKGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2VTaW5nbGUobmV4dCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdWNjZXNzICYmIGluZGV4ICsgMSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICAvKiBJZiBjb2RlIGlzICdjb250aW51ZWQnIGJ5IHRoZSBkZWJ1Z2dlcixcbiAgICAgICAgICAgICAgICAgICAgICogbmVlZCB0byBlbnN1cmUgdGhlIHJlc3Qgb2YgdGhlIGRpc3Bvc2FibGVzIGFyZSBjYXJlZCBmb3IuICovXG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCBmYWxzZSwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBKdXN0IGluIGNhc2UuLi4gIFNob3VsZCBuZXZlciBoYXBwZW4sIGJ1dCBhc3NlcnRzIHRoZSBpbnRlbnRpb24uXG4gICAgICAgICAgICBpZiAoIXN1Y2Nlc3MpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV4Y2VwdGlvbnM7XG59XG5leHBvcnQgZGVmYXVsdCBkaXNwb3NlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlzcG9zZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvZGlzcG9zZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0b3JCYXNlXCI7XG5leHBvcnQgY2xhc3MgSW5kZXhFbnVtZXJhdG9yIGV4dGVuZHMgRW51bWVyYXRvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZUZhY3RvcnkpIHtcbiAgICAgICAgbGV0IHNvdXJjZTtcbiAgICAgICAgc3VwZXIoKCkgPT4ge1xuICAgICAgICAgICAgc291cmNlID0gc291cmNlRmFjdG9yeSgpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSAmJiBzb3VyY2Uuc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgMClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibGVuZ3RoIG11c3QgYmUgemVybyBvciBncmVhdGVyXCIpO1xuICAgICAgICAgICAgICAgIGlmICghaXNGaW5pdGUobGVuKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibGVuZ3RoIG11c3QgZmluaXRlIG51bWJlclwiKTtcbiAgICAgICAgICAgICAgICBpZiAobGVuICYmIHNvdXJjZS5zdGVwID09PSAwKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIEluZGV4RW51bWVyYXRvciBzdGVwIHZhbHVlICgwKS5cIik7XG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ZXIgPSBzb3VyY2UucG9pbnRlcjtcbiAgICAgICAgICAgICAgICBpZiAoIXBvaW50ZXIpXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvaW50ZXIgIT0gTWF0aC5mbG9vcihwb2ludGVyKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBJbmRleEVudW1lcmF0b3IgcG9pbnRlciB2YWx1ZSAoXCIgKyBwb2ludGVyICsgXCIpIGhhcyBkZWNpbWFsLlwiKTtcbiAgICAgICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IHBvaW50ZXI7XG4gICAgICAgICAgICAgICAgbGV0IHN0ZXAgPSBzb3VyY2Uuc3RlcDtcbiAgICAgICAgICAgICAgICBpZiAoIXN0ZXApXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAgPSAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0ZXAgIT0gTWF0aC5mbG9vcihzdGVwKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBJbmRleEVudW1lcmF0b3Igc3RlcCB2YWx1ZSAoXCIgKyBzdGVwICsgXCIpIGhhcyBkZWNpbWFsLlwiKTtcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc3RlcCA9IHN0ZXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGVuID0gKHNvdXJjZSAmJiBzb3VyY2Uuc291cmNlKSA/IHNvdXJjZS5sZW5ndGggOiAwO1xuICAgICAgICAgICAgaWYgKCFsZW4gfHwgaXNOYU4obGVuKSlcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gc291cmNlLnBvaW50ZXI7XG4gICAgICAgICAgICBpZiAoc291cmNlLnBvaW50ZXIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IDA7IC8vIHNob3VsZCBuZXZlciBoYXBwZW4gYnV0IGlzIGluIHBsYWNlIHRvIG5lZ2F0ZSBjb21waWxlciB3YXJuaW5ncy5cbiAgICAgICAgICAgIGlmICghc291cmNlLnN0ZXApXG4gICAgICAgICAgICAgICAgc291cmNlLnN0ZXAgPSAxOyAvLyBzaG91bGQgbmV2ZXIgaGFwcGVuIGJ1dCBpcyBpbiBwbGFjZSB0byBuZWdhdGUgY29tcGlsZXIgd2FybmluZ3MuXG4gICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IHNvdXJjZS5wb2ludGVyICsgc291cmNlLnN0ZXA7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnJlbnQgPCBsZW4gJiYgY3VycmVudCA+PSAwKVxuICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihzb3VyY2Uuc291cmNlW2N1cnJlbnRdKVxuICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc291cmNlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZGV4RW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUluZGV4RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0luZGV4RW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmV4cG9ydCBjbGFzcyBJdGVyYXRvclJlc3VsdCB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIGluZGV4LCBkb25lID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09ICdib29sZWFuJylcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IGluZGV4O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IGRvbmU7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgICB9XG59XG4oZnVuY3Rpb24gKEl0ZXJhdG9yUmVzdWx0KSB7XG4gICAgSXRlcmF0b3JSZXN1bHQuRG9uZSA9IG5ldyBJdGVyYXRvclJlc3VsdChWT0lEMCwgVk9JRDAsIHRydWUpO1xuICAgIGZ1bmN0aW9uIEdldERvbmUoKSB7IHJldHVybiBJdGVyYXRvclJlc3VsdC5Eb25lOyB9XG4gICAgSXRlcmF0b3JSZXN1bHQuR2V0RG9uZSA9IEdldERvbmU7XG59KShJdGVyYXRvclJlc3VsdCB8fCAoSXRlcmF0b3JSZXN1bHQgPSB7fSkpO1xuT2JqZWN0LmZyZWV6ZShJdGVyYXRvclJlc3VsdCk7XG5leHBvcnQgZGVmYXVsdCBJdGVyYXRvclJlc3VsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUl0ZXJhdG9yUmVzdWx0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSXRlcmF0b3JSZXN1bHQuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuLyoqXG4gKiBDYW4gYmUgdXNlZCBzdGF0aWNhbGx5IG9yIGV4dGVuZGVkIGZvciB2YXJ5aW5nIGRpZmZlcmVudCByZXVzYWJsZSBmdW5jdGlvbiBzaWduYXR1cmVzLlxuICovXG4vKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovIGV4cG9ydCBjbGFzcyBGdW5jdGlvbnMge1xuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBBIHR5cGVkIG1ldGhvZCBmb3IgdXNlIHdpdGggc2ltcGxlIHNlbGVjdGlvbiBvZiB0aGUgcGFyYW1ldGVyLlxuICAgICAqIEByZXR1cm5zIHtUfVxuICAgICAqL1xuICAgIElkZW50aXR5KHgpIHsgcmV0dXJuIHg7IH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIFRydWUoKSB7IHJldHVybiB0cnVlOyB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgZmFsc2UuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgRmFsc2UoKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIC8qKlxuICAgICAqIERvZXMgbm90aGluZy5cbiAgICAgKi9cbiAgICBCbGFuaygpIHsgfVxufVxuY29uc3Qgcm9vdEZ1bmN0aW9ucyA9IG5ldyBGdW5jdGlvbnMoKTtcbi8vIEV4cG9zZSBzdGF0aWMgdmVyc2lvbnMuXG4oZnVuY3Rpb24gKEZ1bmN0aW9ucykge1xuICAgIC8qKlxuICAgICAqIEEgdHlwZWQgbWV0aG9kIGZvciB1c2Ugd2l0aCBzaW1wbGUgc2VsZWN0aW9uIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgRnVuY3Rpb25zLklkZW50aXR5ID0gcm9vdEZ1bmN0aW9ucy5JZGVudGl0eTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5UcnVlID0gcm9vdEZ1bmN0aW9ucy5UcnVlO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgZmFsc2UuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgRnVuY3Rpb25zLkZhbHNlID0gcm9vdEZ1bmN0aW9ucy5GYWxzZTtcbiAgICAvKipcbiAgICAgKiBEb2VzIG5vdGhpbmcuXG4gICAgICovXG4gICAgRnVuY3Rpb25zLkJsYW5rID0gcm9vdEZ1bmN0aW9ucy5CbGFuaztcbn0pKEZ1bmN0aW9ucyB8fCAoRnVuY3Rpb25zID0ge30pKTtcbi8vIE1ha2UgdGhpcyByZWFkIG9ubHkuICBTaG91bGQgc3RpbGwgYWxsb3cgZm9yIHN1Yi1jbGFzc2luZyBzaW5jZSBleHRyYSBtZXRob2RzIGFyZSBhZGRlZCB0byBwcm90b3R5cGUuXG5PYmplY3QuZnJlZXplKEZ1bmN0aW9ucyk7XG5leHBvcnQgZGVmYXVsdCBGdW5jdGlvbnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1GdW5jdGlvbnMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9GdW5jdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JcIjtcbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb25cIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2VcIjtcbmltcG9ydCB7IGlzQ29tbW9uSlMsIGlzTm9kZUpTLCBpc1JlcXVpcmVKUyB9IGZyb20gXCIuLi9FbnZpcm9ubWVudFwiO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbi8vbm9pbnNwZWN0aW9uIFNwZWxsQ2hlY2tpbmdJbnNwZWN0aW9uXG5jb25zdCBOQU1FID0gXCJDb2xsZWN0aW9uQmFzZVwiLCBDTURDID0gXCJDYW5ub3QgbW9kaWZ5IGEgZGlzcG9zZWQgY29sbGVjdGlvbi5cIiwgQ01STyA9IFwiQ2Fubm90IG1vZGlmeSBhIHJlYWQtb25seSBjb2xsZWN0aW9uLlwiO1xuY29uc3QgTElOUV9QQVRIID0gXCIuLi8uLi9TeXN0ZW0uTGlucS9MaW5xXCI7XG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbkJhc2UgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlLCBfZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2VxdWFsaXR5Q29tcGFyZXIgPSBfZXF1YWxpdHlDb21wYXJlcjtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gTkFNRTtcbiAgICAgICAgXy5faW1wb3J0RW50cmllcyhzb3VyY2UpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24gPSAwO1xuICAgICAgICBfLl9tb2RpZmllZENvdW50ID0gMDtcbiAgICAgICAgXy5fdmVyc2lvbiA9IDA7XG4gICAgfVxuICAgIGdldCBjb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q291bnQoKTtcbiAgICB9XG4gICAgZ2V0SXNSZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICBnZXQgaXNSZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXNSZWFkT25seSgpO1xuICAgIH1cbiAgICBhc3NlcnRNb2RpZmlhYmxlKCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZChDTURDKTtcbiAgICAgICAgaWYgKHRoaXMuZ2V0SXNSZWFkT25seSgpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oQ01STyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBhc3NlcnRWZXJzaW9uKHZlcnNpb24pIHtcbiAgICAgICAgaWYgKHZlcnNpb24gIT09IHRoaXMuX3ZlcnNpb24pXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNvbGxlY3Rpb24gd2FzIG1vZGlmaWVkLlwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIF9vbk1vZGlmaWVkKCkgeyB9XG4gICAgX3NpZ25hbE1vZGlmaWNhdGlvbihpbmNyZW1lbnQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmIChpbmNyZW1lbnQpXG4gICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIGlmIChfLl9tb2RpZmllZENvdW50ICYmICF0aGlzLl91cGRhdGVSZWN1cnNpb24pIHtcbiAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQgPSAwO1xuICAgICAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBfLl9vbk1vZGlmaWVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAvLyBBdm9pZCBmYXRhbCBlcnJvcnMgd2hpY2ggbWF5IGhhdmUgYmVlbiBjYXVzZWQgYnkgY29uc3VtZXIuXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF9pbmNyZW1lbnRNb2RpZmllZCgpIHsgdGhpcy5fbW9kaWZpZWRDb3VudCsrOyB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgZ2V0IGlzVXBkYXRpbmcoKSB7IHJldHVybiB0aGlzLl91cGRhdGVSZWN1cnNpb24gIT0gMDsgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgY2xvc3VyZSB0aGF0IGlmIHJldHVybmluZyB0cnVlIHdpbGwgcHJvcGFnYXRlIGFuIHVwZGF0ZSBzaWduYWwuXG4gICAgICogTXVsdGlwbGUgdXBkYXRlIG9wZXJhdGlvbnMgY2FuIGJlIG9jY3VycmluZyBhdCBvbmNlIG9yIHJlY3Vyc2l2ZWx5IGFuZCB0aGUgb25Nb2RpZmllZCBzaWduYWwgd2lsbCBvbmx5IG9jY3VyIG9uY2UgdGhleSdyZSBkb25lLlxuICAgICAqIEBwYXJhbSBjbG9zdXJlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFuZGxlVXBkYXRlKGNsb3N1cmUpIHtcbiAgICAgICAgaWYgKCFjbG9zdXJlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICBsZXQgdXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHVwZGF0ZWQgPSBjbG9zdXJlKCkpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgIH1cbiAgICAvKlxuICAgICAqIE5vdGU6IGZvciBhIHNsaWdodCBhbW91bnQgbW9yZSBjb2RlLCB3ZSBhdm9pZCBjcmVhdGluZyBmdW5jdGlvbnMvY2xvc3VyZXMuXG4gICAgICogQ2FsbGluZyBoYW5kbGVVcGRhdGUgaXMgdGhlIGNvcnJlY3QgcGF0dGVybiwgYnV0IGlmIHBvc3NpYmxlIGF2b2lkIGNyZWF0aW5nIGFub3RoZXIgZnVuY3Rpb24gc2NvcGUuXG4gICAgICovXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBlbnRyeSB0byB0aGUgY29sbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZW50cnlcbiAgICAgKi9cbiAgICBhZGQoZW50cnkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24rKztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfLl9hZGRJbnRlcm5hbChlbnRyeSkpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBfO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGVudHJpZXMgZnJvbSB0aGUgY29sbGVjdGlvbiBhbGxvd2luZyBmb3IgYSBsaW1pdC5cbiAgICAgKiBGb3IgZXhhbXBsZSBpZiB0aGUgY29sbGVjdGlvbiBub3QgYSBkaXN0aW5jdCBzZXQsIG1vcmUgdGhhbiBvbmUgZW50cnkgY291bGQgYmUgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0gZW50cnkgVGhlIGVudHJ5IHRvIHJlbW92ZS5cbiAgICAgKiBAcGFyYW0gbWF4IExpbWl0IG9mIGVudHJpZXMgdG8gcmVtb3ZlLiAgV2lsbCByZW1vdmUgYWxsIG1hdGNoZXMgaWYgbm8gbWF4IHNwZWNpZmllZC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGVudHJpZXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICByZW1vdmUoZW50cnksIG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIGxldCBuID0gTmFOO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG4gPSBfLl9yZW1vdmVJbnRlcm5hbChlbnRyeSwgbWF4KSlcbiAgICAgICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24tLTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgY29udGVudHMgb2YgdGhlIGNvbGxlY3Rpb24gcmVzdWx0aW5nIGluIGEgY291bnQgb2YgemVyby5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICBsZXQgbiA9IE5hTjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChuID0gXy5fY2xlYXJJbnRlcm5hbCgpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9jbGVhckludGVybmFsKCk7XG4gICAgICAgIHRoaXMuX3ZlcnNpb24gPSAwO1xuICAgICAgICB0aGlzLl91cGRhdGVSZWN1cnNpb24gPSAwO1xuICAgICAgICB0aGlzLl9tb2RpZmllZENvdW50ID0gMDtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMuX2xpbnE7XG4gICAgICAgIHRoaXMuX2xpbnEgPSB2b2lkIDA7XG4gICAgICAgIGlmIChsKVxuICAgICAgICAgICAgbC5kaXNwb3NlKCk7XG4gICAgfVxuICAgIF9pbXBvcnRFbnRyaWVzKGVudHJpZXMpIHtcbiAgICAgICAgbGV0IGFkZGVkID0gMDtcbiAgICAgICAgaWYgKGVudHJpZXMpIHtcbiAgICAgICAgICAgIGlmICgoZW50cmllcykgaW5zdGFuY2VvZiAoQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgLy8gT3B0aW1pemUgZm9yIGF2b2lkaW5nIGEgbmV3IGNsb3N1cmUuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hZGRJbnRlcm5hbChlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yRWFjaChlbnRyaWVzLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FkZEludGVybmFsKGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWQrKztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWRkZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhZmVseSBpbXBvcnRzIGFueSBhcnJheSBlbnVtZXJhdG9yLCBvciBlbnVtZXJhYmxlLlxuICAgICAqIEBwYXJhbSBlbnRyaWVzXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBpbXBvcnRFbnRyaWVzKGVudHJpZXMpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghZW50cmllcylcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIGxldCBuID0gTmFOO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG4gPSBfLl9pbXBvcnRFbnRyaWVzKGVudHJpZXMpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBmaWx0ZXJlZCBieSB0aGUgcHJvdmlkZWQgcHJlZGljYXRlLlxuICAgICAqIFByb3ZpZGVkIGZvciBzaW1pbGFyaXR5IHRvIEpTIEFycmF5LlxuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAcmV0dXJucyB7W119XG4gICAgICovXG4gICAgZmlsdGVyKHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ3ByZWRpY2F0ZScpO1xuICAgICAgICBsZXQgY291bnQgPSAhdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShlLCBpKSlcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgdGhlIGZpcnN0IHRpbWUgcHJlZGljYXRlIHJldHVybnMgdHJ1ZS4gIE90aGVyd2lzZSBmYWxzZS5cbiAgICAgKiBVc2VmdWwgZm9yIHNlYXJjaGluZyB0aHJvdWdoIGEgY29sbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBhbnkocHJlZGljYXRlKSB7XG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgaWYgKCFjb3VudClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICByZXR1cm4gQm9vbGVhbihjb3VudCk7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvckVhY2goKGUsIGkpID0+ICEoZm91bmQgPSBwcmVkaWNhdGUoZSwgaSkpKTtcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgdGhlIGZpcnN0IHRpbWUgcHJlZGljYXRlIHJldHVybnMgdHJ1ZS4gIE90aGVyd2lzZSBmYWxzZS5cbiAgICAgKiBTZWUgJy5hbnkocHJlZGljYXRlKScuICBBcyB0aGlzIG1ldGhvZCBpcyBqdXN0IGp1c3QgaW5jbHVkZWQgdG8gaGF2ZSBzaW1pbGFyaXR5IHdpdGggYSBKUyBBcnJheS5cbiAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBzb21lKHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbnkocHJlZGljYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBlcXVhbGl0eSBjb21wYXJlciByZXNvbHZlcyB0cnVlIG9uIGFueSBlbGVtZW50IGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBlbnRyeVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zKGVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGVxdWFscyA9IHRoaXMuX2VxdWFsaXR5Q29tcGFyZXI7XG4gICAgICAgIHJldHVybiB0aGlzLmFueShlID0+IGVxdWFscyhlbnRyeSwgZSkpO1xuICAgIH1cbiAgICBmb3JFYWNoKGFjdGlvbiwgdXNlQ29weSkge1xuICAgICAgICBpZiAodGhpcy53YXNEaXNwb3NlZClcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBpZiAodXNlQ29weSkge1xuICAgICAgICAgICAgY29uc3QgYSA9IHRoaXMudG9BcnJheSgpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9yRWFjaChhLCBhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgYS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZvckVhY2godGhpcy5nZXRFbnVtZXJhdG9yKCksIGFjdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29waWVzIGFsbCB2YWx1ZXMgdG8gbnVtZXJpY2FsbHkgaW5kZXhhYmxlIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICogQHJldHVybnMge1RUYXJnZXR9XG4gICAgICovXG4gICAgY29weVRvKHRhcmdldCwgaW5kZXggPSAwKSB7XG4gICAgICAgIGlmICghdGFyZ2V0KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigndGFyZ2V0Jyk7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0xlbmd0aCA9IGNvdW50ICsgaW5kZXg7XG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCA8IG5ld0xlbmd0aClcbiAgICAgICAgICAgICAgICB0YXJnZXQubGVuZ3RoID0gbmV3TGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgZSA9IHRoaXMuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgd2hpbGUgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpbmRleCsrXSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSBjb2xsZWN0aW9uIGNvbnRlbnRzLlxuICAgICAqIEByZXR1cm5zIHthbnlbXXxBcnJheX1cbiAgICAgKi9cbiAgICB0b0FycmF5KCkge1xuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgcmV0dXJuIGNvdW50XG4gICAgICAgICAgICA/IHRoaXMuY29weVRvKGNvdW50ID4gNjU1MzYgPyBuZXcgQXJyYXkoY291bnQpIDogW10pXG4gICAgICAgICAgICA6IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAubGlucSB3aWxsIHJldHVybiBhbiBJTGlucUVudW1lcmFibGUgaWYgLmxpbnFBc3luYygpIGhhcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5IG9yIHRoZSBkZWZhdWx0IG1vZHVsZSBsb2FkZXIgaXMgTm9kZUpTK0NvbW1vbkpTLlxuICAgICAqIEByZXR1cm5zIHtJTGlucUVudW1lcmFibGV9XG4gICAgICovXG4gICAgZ2V0IGxpbnEoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBlID0gdGhpcy5fbGlucTtcbiAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICBsZXQgcjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgciA9IGV2YWwoJ3JlcXVpcmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkgeyB9XG4gICAgICAgICAgICB0aGlzLl9saW5xID0gZSA9IHIgJiYgcihMSU5RX1BBVEgpLmRlZmF1bHQuZnJvbSh0aGlzKTtcbiAgICAgICAgICAgIGlmICghZSkge1xuICAgICAgICAgICAgICAgIHRocm93IGlzUmVxdWlyZUpTXG4gICAgICAgICAgICAgICAgICAgID8gYHVzaW5nIC5saW5xIHRvIGxvYWQgYW5kIGluaXRpYWxpemUgYSBJTGlucUVudW1lcmFibGUgaXMgY3VycmVudGx5IG9ubHkgc3VwcG9ydGVkIHdpdGhpbiBhIE5vZGVKUyBlbnZpcm9ubWVudC5cclxuSW1wb3J0IFN5c3RlbS5MaW5xL0xpbnEgYW5kIHVzZSBFbnVtZXJhYmxlLmZyb20oZSkgaW5zdGVhZC5cclxuWW91IGNhbiBhbHNvIHByZWxvYWQgdGhlIExpbnEgbW9kdWxlIGFzIGEgZGVwZW5kZW5jeSBvciB1c2UgLmxpbnFBc3luYyhjYWxsYmFjaykgZm9yIEFNRC9SZXF1aXJlSlMuYFxuICAgICAgICAgICAgICAgICAgICA6IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBpbXBvcnRpbmcgU3lzdGVtLkxpbnEvTGlucVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAubGlucUFzeW5jKCkgaXMgZm9yIHVzZSB3aXRoIGRlZmVycmVkIGxvYWRpbmcuXG4gICAgICogRW5zdXJlcyBhbiBpbnN0YW5jZSBvZiB0aGUgTGlucSBleHRlbnNpb25zIGlzIGF2YWlsYWJsZSBhbmQgdGhlbiBwYXNzZXMgaXQgdG8gdGhlIGNhbGxiYWNrLlxuICAgICAqIFJldHVybnMgYW4gSUxpbnFFbnVtZXJhYmxlIGlmIG9uZSBpcyBhbHJlYWR5IGF2YWlsYWJsZSwgb3RoZXJ3aXNlIHVuZGVmaW5lZC5cbiAgICAgKiBQYXNzaW5nIG5vIHBhcmFtZXRlcnMgd2lsbCBzdGlsbCBpbml0aWF0ZSBsb2FkaW5nIGFuZCBpbml0aWFsaXppbmcgdGhlIElMaW5xRW51bWVyYWJsZSB3aGljaCBjYW4gYmUgdXNlZnVsIGZvciBwcmUtbG9hZGluZy5cbiAgICAgKiBBbnkgY2FsbCB0byAubGlucUFzeW5jKCkgd2hlcmUgYW4gSUxpbnFFbnVtZXJhYmxlIGlzIHJldHVybmVkIGNhbiBiZSBhc3N1cmVkIHRoYXQgYW55IHN1YnNlcXVlbnQgY2FsbHMgdG8gLmxpbnEgd2lsbCByZXR1cm4gdGhlIHNhbWUgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHJldHVybnMge0lMaW5xRW51bWVyYWJsZX1cbiAgICAgKi9cbiAgICBsaW5xQXN5bmMoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IGUgPSB0aGlzLl9saW5xO1xuICAgICAgICBpZiAoIWUpIHtcbiAgICAgICAgICAgIGlmIChpc1JlcXVpcmVKUykge1xuICAgICAgICAgICAgICAgIGV2YWwoXCJyZXF1aXJlXCIpKFtMSU5RX1BBVEhdLCAobGlucSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBDb3VsZCBlbmQgdXAgYmVpbmcgY2FsbGVkIG1vcmUgdGhhbiBvbmNlLCBiZSBzdXJlIHRvIGNoZWNrIGZvciAuX2xpbnEgYmVmb3JlIHNldHRpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgZSA9IHRoaXMuX2xpbnE7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbnEgPSBlID0gbGlucS5kZWZhdWx0LmZyb20odGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBpbXBvcnRpbmcgU3lzdGVtLkxpbnEvTGlucVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB2b2lkIDA7IC8vIEluIGNhc2UgdGhpcyBpcyByZXR1cm4gc3luY2hyb25vdXNseS4uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc05vZGVKUyAmJiBpc0NvbW1vbkpTKSB7XG4gICAgICAgICAgICAgICAgZSA9IHRoaXMubGlucTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IGZpbmQgYSBjb21wYXRpYmxlIGxvYWRlciBmb3IgaW1wb3J0aW5nIFN5c3RlbS5MaW5xL0xpbnFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZSAmJiBjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db2xsZWN0aW9uQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0NvbGxlY3Rpb25CYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tIFwiLi9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuLyoqXG4gKlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHNvdXJjZUluZGV4XG4gKiBAcGFyYW0gbGVuZ3RoXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weShzb3VyY2UsIHNvdXJjZUluZGV4ID0gMCwgbGVuZ3RoID0gSW5maW5pdHkpIHtcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZTsgLy8gbWF5IGhhdmUgcGFzc2VkIHplcm8/IHVuZGVmaW5lZD8gb3IgbnVsbD9cbiAgICByZXR1cm4gY29weVRvKHNvdXJjZSwgaW5pdGlhbGl6ZShNYXRoLm1pbihsZW5ndGgsIE1hdGgubWF4KHNvdXJjZS5sZW5ndGggLSBzb3VyY2VJbmRleCwgMCkpKSwgc291cmNlSW5kZXgsIDAsIGxlbmd0aCk7XG59XG5jb25zdCBDQk4gPSAnQ2Fubm90IGJlIG51bGwuJywgQ0JMMCA9ICdDYW5ub3QgYmUgbGVzcyB0aGFuIHplcm8uJztcbi8qKlxuICogQ29waWVzIG9uZSBhcnJheSB0byBhbm90aGVyLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIGRlc3RpbmF0aW9uXG4gKiBAcGFyYW0gc291cmNlSW5kZXhcbiAqIEBwYXJhbSBkZXN0aW5hdGlvbkluZGV4XG4gKiBAcGFyYW0gbGVuZ3RoIEFuIG9wdGlvbmFsIGxpbWl0IHRvIHN0b3AgY29weWluZy5cbiAqIEByZXR1cm5zIFRoZSBkZXN0aW5hdGlvbiBhcnJheS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUbyhzb3VyY2UsIGRlc3RpbmF0aW9uLCBzb3VyY2VJbmRleCA9IDAsIGRlc3RpbmF0aW9uSW5kZXggPSAwLCBsZW5ndGggPSBJbmZpbml0eSkge1xuICAgIGlmICghc291cmNlKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdzb3VyY2UnLCBDQk4pO1xuICAgIGlmICghZGVzdGluYXRpb24pXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2Rlc3RpbmF0aW9uJywgQ0JOKTtcbiAgICBpZiAoc291cmNlSW5kZXggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzb3VyY2VJbmRleCcsIHNvdXJjZUluZGV4LCBDQkwwKTtcbiAgICBsZXQgc291cmNlTGVuZ3RoID0gc291cmNlLmxlbmd0aDtcbiAgICBpZiAoIXNvdXJjZUxlbmd0aClcbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgIGlmIChzb3VyY2VJbmRleCA+PSBzb3VyY2VMZW5ndGgpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ3NvdXJjZUluZGV4Jywgc291cmNlSW5kZXgsICdNdXN0IGJlIGxlc3MgdGhhbiB0aGUgbGVuZ3RoIG9mIHRoZSBzb3VyY2UgYXJyYXkuJyk7XG4gICAgaWYgKGRlc3RpbmF0aW9uLmxlbmd0aCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2Rlc3RpbmF0aW9uSW5kZXgnLCBkZXN0aW5hdGlvbkluZGV4LCBDQkwwKTtcbiAgICBjb25zdCBtYXhMZW5ndGggPSBzb3VyY2UubGVuZ3RoIC0gc291cmNlSW5kZXg7XG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkgJiYgbGVuZ3RoID4gbWF4TGVuZ3RoKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzb3VyY2VJbmRleCcsIHNvdXJjZUluZGV4LCAnU291cmNlIGluZGV4ICsgbGVuZ3RoIGNhbm5vdCBleGNlZWQgdGhlIGxlbmd0aCBvZiB0aGUgc291cmNlIGFycmF5LicpO1xuICAgIGxlbmd0aCA9IE1hdGgubWluKGxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICBjb25zdCBuZXdMZW5ndGggPSBkZXN0aW5hdGlvbkluZGV4ICsgbGVuZ3RoO1xuICAgIGlmIChuZXdMZW5ndGggPiBkZXN0aW5hdGlvbi5sZW5ndGgpXG4gICAgICAgIGRlc3RpbmF0aW9uLmxlbmd0aCA9IG5ld0xlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uW2Rlc3RpbmF0aW9uSW5kZXggKyBpXSA9IHNvdXJjZVtzb3VyY2VJbmRleCArIGldO1xuICAgIH1cbiAgICByZXR1cm4gZGVzdGluYXRpb247XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3B5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvY29weS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uL1R5cGVzXCI7XG5leHBvcnQgY29uc3QgRU1QVFkgPSAnJztcbi8qKlxuICogUmV0dXJucyBhIG51bWVyaWNhbCAoaW50ZWdlcikgaGFzaCBjb2RlIG9mIHRoZSBzdHJpbmcuICBDYW4gYmUgdXNlZCBmb3IgaWRlbnRpZnlpbmcgaW5lcXVhbGl0eSBvZiBjb250ZW50cywgYnV0IHR3byBkaWZmZXJlbnQgc3RyaW5ncyBpbiByYXJlIGNhc2VzIHdpbGwgaGF2ZSB0aGUgc2FtZSBoYXNoIGNvZGUuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGFzaENvZGUoc291cmNlKSB7XG4gICAgbGV0IGhhc2ggPSAwIHwgMDtcbiAgICBpZiAoc291cmNlLmxlbmd0aCA9PSAwKVxuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHNvdXJjZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbGV0IGNoID0gc291cmNlLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoO1xuICAgICAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICAgIH1cbiAgICByZXR1cm4gaGFzaDtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXBlYXQoc291cmNlLCBjb3VudCkge1xuICAgIGxldCByZXN1bHQgPSBFTVBUWTtcbiAgICBpZiAoIWlzTmFOKGNvdW50KSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tQ2hhcnMoY2hPckNoYXJzLCBjb3VudCA9IDEpIHtcbiAgICBpZiAoKGNoT3JDaGFycykgaW5zdGFuY2VvZiAoQXJyYXkpKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBFTVBUWTtcbiAgICAgICAgZm9yIChsZXQgY2hhciBvZiBjaE9yQ2hhcnMpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVwZWF0KFN0cmluZy5mcm9tQ2hhckNvZGUoY2hPckNoYXJzKSwgY291bnQpO1xuICAgIH1cbn1cbi8qKlxuICogRXNjYXBlcyBhIFJlZ0V4cCBzZXF1ZW5jZS5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoc291cmNlKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5yZXBsYWNlKC9bLVtcXF1cXC97fSgpKis/LlxcXFxeJHxdL2csIFwiXFxcXCQmXCIpO1xufVxuLyoqXG4gKiBDYW4gdHJpbSBhbnkgY2hhcmFjdGVyIG9yIHNldCBvZiBjaGFyYWN0ZXJzIGZyb20gdGhlIGVuZHMgb2YgYSBzdHJpbmcuXG4gKiBVc2VzIGEgUmVnZXggZXNjYXBlbWVudCB0byByZXBsYWNlIHRoZW0gd2l0aCBlbXB0eS5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBjaGFycyBBIHN0cmluZyBvciBhcnJheSBvZiBjaGFyYWN0ZXJzIGRlc2lyZWQgdG8gYmUgdHJpbW1lZC5cbiAqIEBwYXJhbSBpZ25vcmVDYXNlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzb3VyY2UsIGNoYXJzLCBpZ25vcmVDYXNlKSB7XG4gICAgaWYgKGNoYXJzID09PSBFTVBUWSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICBpZiAoY2hhcnMpIHtcbiAgICAgICAgY29uc3QgZXNjYXBlZCA9IGVzY2FwZVJlZ0V4cCgoY2hhcnMpIGluc3RhbmNlb2YgKEFycmF5KSA/IGNoYXJzLmpvaW4oKSA6IGNoYXJzKTtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5yZXBsYWNlKG5ldyBSZWdFeHAoJ15bJyArIGVzY2FwZWQgKyAnXSt8WycgKyBlc2NhcGVkICsgJ10rJCcsICdnJyArIChpZ25vcmVDYXNlXG4gICAgICAgICAgICA/ICdpJ1xuICAgICAgICAgICAgOiAnJykpLCBFTVBUWSk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2UucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgRU1QVFkpO1xufVxuLyoqXG4gKiBUYWtlcyBhbnkgYXJnXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gYXJnc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChzb3VyY2UsIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gc3VwcGxhbnQoc291cmNlLCBhcmdzKTtcbn1cbi8vXG4vKipcbiAqIFRoaXMgdGFrZXMgYSBzdHJpbmcgYW5kIHJlcGxhY2VzICd7c3RyaW5nfScgd2l0aCB0aGUgcmVzcGVjdGVkIHBhcmFtZXRlci5cbiAqIEFsc28gYWxsb3dzIGZvciBwYXNzaW5nIGFuIGFycmF5IGluIG9yZGVyIHRvIHVzZSAne259JyBub3RhdGlvbi5cbiAqIE5vdCBsaW1pdGVkIHRvIGFuIGFycmF5J3MgaW5kZXhlcy4gIEZvciBleGFtcGxlLCB7bGVuZ3RofSBpcyBhbGxvd2VkLlxuICogQmFzZWQgdXBvbiBDcm9ja2ZvcmQncyBzdXBwbGFudCBmdW5jdGlvbi5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBwYXJhbXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdXBwbGFudChzb3VyY2UsIHBhcmFtcykge1xuICAgIGNvbnN0IG9Jc0FycmF5ID0gKHBhcmFtcykgaW5zdGFuY2VvZiAoQXJyYXkpO1xuICAgIHJldHVybiBzb3VyY2UucmVwbGFjZSgveyhbXnt9XSopfS9nLCAoYSwgYikgPT4ge1xuICAgICAgICBsZXQgbiA9IGI7XG4gICAgICAgIGlmIChvSXNBcnJheSkge1xuICAgICAgICAgICAgbGV0IGkgPSBwYXJzZUludChiKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4oaSkpXG4gICAgICAgICAgICAgICAgbiA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHIgPSBwYXJhbXNbbl07XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHIpIHtcbiAgICAgICAgICAgIGNhc2UgVHlwZS5TVFJJTkc6XG4gICAgICAgICAgICBjYXNlIFR5cGUuTlVNQkVSOlxuICAgICAgICAgICAgY2FzZSBUeXBlLkJPT0xFQU46XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAociAmJiBUeXBlLmhhc01lbWJlck9mVHlwZShyLCBcInRvU3RyaW5nXCIsIFR5cGUuRlVOQ1RJT04pKVxuICAgICAgICAgICAgICAgICAgICA/IHIudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICA6IGE7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNhbk1hdGNoKHNvdXJjZSwgbWF0Y2gpIHtcbiAgICBpZiAoIVR5cGUuaXNTdHJpbmcoc291cmNlKSB8fCAhbWF0Y2gpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoc291cmNlID09PSBtYXRjaClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKG1hdGNoLmxlbmd0aCA8IHNvdXJjZS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBudWxsO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBhdHRlcm4gbWF0Y2hlcyB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzb3VyY2UuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gcGF0dGVyblxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydHNXaXRoKHNvdXJjZSwgcGF0dGVybikge1xuICAgIGNvbnN0IG0gPSBjYW5NYXRjaChzb3VyY2UsIHBhdHRlcm4pO1xuICAgIHJldHVybiBUeXBlLmlzQm9vbGVhbihtKSA/IG0gOiBzb3VyY2UuaW5kZXhPZihwYXR0ZXJuKSA9PSAwO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBhdHRlcm4gbWF0Y2hlcyB0aGUgZW5kIG9mIHRoZSBzb3VyY2UuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gcGF0dGVyblxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmRzV2l0aChzb3VyY2UsIHBhdHRlcm4pIHtcbiAgICBjb25zdCBtID0gY2FuTWF0Y2goc291cmNlLCBwYXR0ZXJuKTtcbiAgICByZXR1cm4gVHlwZS5pc0Jvb2xlYW4obSkgPyBtIDogc291cmNlLmxhc3RJbmRleE9mKHBhdHRlcm4pID09IChzb3VyY2UubGVuZ3RoIC0gcGF0dGVybi5sZW5ndGgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXRpbGl0eS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1RleHQvVXRpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJbmRleEVudW1lcmF0b3IgfSBmcm9tIFwiLi9JbmRleEVudW1lcmF0b3JcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIEFycmF5RW51bWVyYXRvciBleHRlbmRzIEluZGV4RW51bWVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoYXJyYXlPckZhY3RvcnksIHN0YXJ0ID0gMCwgc3RlcCA9IDEpIHtcbiAgICAgICAgc3VwZXIoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXJyYXkgPSBUeXBlLmlzRnVuY3Rpb24oYXJyYXlPckZhY3RvcnkpID8gYXJyYXlPckZhY3RvcnkoKSA6IGFycmF5T3JGYWN0b3J5O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGFycmF5LFxuICAgICAgICAgICAgICAgIHBvaW50ZXI6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGxlbmd0aDogYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgICAgICAgICAgIHN0ZXA6IHN0ZXBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFycmF5RW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFycmF5RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0FycmF5RW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ09iamVjdERpc3Bvc2VkRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBleHRlbmRzIEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24ge1xuICAgIC8vIEZvciBzaW1wbGljaXR5IGFuZCBjb25zaXN0ZW5jeSwgbGV0cyBzdGljayB3aXRoIDEgc2lnbmF0dXJlLlxuICAgIGNvbnN0cnVjdG9yKG9iamVjdE5hbWUsIG1lc3NhZ2UsIGlubmVyRXhjZXB0aW9uKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJycsIGlubmVyRXhjZXB0aW9uLCAoXykgPT4ge1xuICAgICAgICAgICAgXy5vYmplY3ROYW1lID0gb2JqZWN0TmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBvTmFtZSA9IF8ub2JqZWN0TmFtZTtcbiAgICAgICAgb05hbWUgPSBvTmFtZSA/ICgneycgKyBvTmFtZSArICd9ICcpIDogJyc7XG4gICAgICAgIHJldHVybiAnWycgKyBfLm5hbWUgKyAnOiAnICsgb05hbWUgKyBfLm1lc3NhZ2UgKyAnXSc7XG4gICAgfVxuICAgIHN0YXRpYyB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zYWJsZSwgb2JqZWN0TmFtZSwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoZGlzcG9zYWJsZS53YXNEaXNwb3NlZClcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbihvYmplY3ROYW1lLCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYmplY3REaXNwb3NlZEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb24gT2JqZWN0UG9vbCBmcm9tIFBhcmFsbGVsIEV4dGVuc2lvbiBFeHRyYXMgYW5kIG90aGVyIE9iamVjdFBvb2wgaW1wbGVtZW50YXRpb25zLlxuICogVXNlcyAuYWRkKFQpIGFuZCAudGFrZSgpOlRcbiAqL1xuaW1wb3J0IHsgZGlzcG9zZSB9IGZyb20gXCIuL2Rpc3Bvc2VcIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4vRGlzcG9zYWJsZUJhc2VcIjtcbmltcG9ydCB7IFRhc2tIYW5kbGVyIH0gZnJvbSBcIi4uL1RocmVhZGluZy9UYXNrcy9UYXNrSGFuZGxlclwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE9CSkVDVF9QT09MID0gXCJPYmplY3RQb29sXCIsIF9NQVhfU0laRSA9IFwiX21heFNpemVcIiwgQUJTT0xVVEVfTUFYX1NJWkUgPSA2NTUzNiwgTVVTVF9CRV9HVDEgPSBcIk11c3QgYmUgYXQgdmFsaWQgbnVtYmVyIGxlYXN0IDEuXCIsIE1VU1RfQkVfTFRNID0gYE11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICR7QUJTT0xVVEVfTUFYX1NJWkV9LmA7XG5leHBvcnQgY2xhc3MgT2JqZWN0UG9vbCBleHRlbmRzIERpc3Bvc2FibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihfbWF4U2l6ZSwgX2dlbmVyYXRvciwgX3JlY3ljbGVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX21heFNpemUgPSBfbWF4U2l6ZTtcbiAgICAgICAgdGhpcy5fZ2VuZXJhdG9yID0gX2dlbmVyYXRvcjtcbiAgICAgICAgdGhpcy5fcmVjeWNsZXIgPSBfcmVjeWNsZXI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCeSBkZWZhdWx0IHdpbGwgY2xlYXIgYWZ0ZXIgNSBzZWNvbmRzIG9mIG5vbi11c2UuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmF1dG9DbGVhclRpbWVvdXQgPSA1MDAwO1xuICAgICAgICBpZiAoaXNOYU4oX21heFNpemUpIHx8IF9tYXhTaXplIDwgMSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oX01BWF9TSVpFLCBfbWF4U2l6ZSwgTVVTVF9CRV9HVDEpO1xuICAgICAgICBpZiAoX21heFNpemUgPiBBQlNPTFVURV9NQVhfU0laRSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oX01BWF9TSVpFLCBfbWF4U2l6ZSwgTVVTVF9CRV9MVE0pO1xuICAgICAgICB0aGlzLl9sb2NhbEFic01heFNpemUgPSBNYXRoLm1pbihfbWF4U2l6ZSAqIDIsIEFCU09MVVRFX01BWF9TSVpFKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gT0JKRUNUX1BPT0w7XG4gICAgICAgIF8uX3Bvb2wgPSBbXTtcbiAgICAgICAgXy5fdHJpbW1lciA9IG5ldyBUYXNrSGFuZGxlcigoKSA9PiBfLl90cmltKCkpO1xuICAgICAgICBjb25zdCBjbGVhciA9ICgpID0+IF8uX2NsZWFyKCk7XG4gICAgICAgIF8uX2ZsdXNoZXIgPSBuZXcgVGFza0hhbmRsZXIoY2xlYXIpO1xuICAgICAgICBfLl9hdXRvRmx1c2hlciA9IG5ldyBUYXNrSGFuZGxlcihjbGVhcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIG1heGltdW0gYXQgd2hpY2ggdHJpbW1pbmcgc2hvdWxkIGFsbG93LlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IG1heFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhTaXplO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IG51bWJlciBvZiBvYmplY3RzIGluIHBvb2wuXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgY291bnQoKSB7XG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLl9wb29sO1xuICAgICAgICByZXR1cm4gcCA/IHAubGVuZ3RoIDogMDtcbiAgICB9XG4gICAgX3RyaW0oKSB7XG4gICAgICAgIGNvbnN0IHBvb2wgPSB0aGlzLl9wb29sO1xuICAgICAgICB3aGlsZSAocG9vbC5sZW5ndGggPiB0aGlzLl9tYXhTaXplKSB7XG4gICAgICAgICAgICBkaXNwb3NlLnNpbmdsZShwb29sLnBvcCgpLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaWxsIHRyaW0gZW5zdXJlIHRoZSBwb29sIGlzIGxlc3MgdGhhbiB0aGUgbWF4U2l6ZS5cbiAgICAgKiBAcGFyYW0gZGVmZXIgQSBkZWxheSBiZWZvcmUgdHJpbW1pbmcuICBXaWxsIGJlIG92ZXJyaWRkZW4gYnkgbGF0ZXIgY2FsbHMuXG4gICAgICovXG4gICAgdHJpbShkZWZlcikge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aGlzLl90cmltbWVyLnN0YXJ0KGRlZmVyKTtcbiAgICB9XG4gICAgX2NsZWFyKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcCA9IF8uX3Bvb2w7XG4gICAgICAgIF8uX3RyaW1tZXIuY2FuY2VsKCk7XG4gICAgICAgIF8uX2ZsdXNoZXIuY2FuY2VsKCk7XG4gICAgICAgIF8uX2F1dG9GbHVzaGVyLmNhbmNlbCgpO1xuICAgICAgICBkaXNwb3NlLnRoZXNlLm5vQ29weShwLCB0cnVlKTtcbiAgICAgICAgcC5sZW5ndGggPSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaWxsIGNsZWFyIG91dCB0aGUgcG9vbC5cbiAgICAgKiBDYW5jZWxzIGFueSBzY2hlZHVsZWQgdHJpbXMgd2hlbiBleGVjdXRlZC5cbiAgICAgKiBAcGFyYW0gZGVmZXIgQSBkZWxheSBiZWZvcmUgY2xlYXJpbmcuICBXaWxsIGJlIG92ZXJyaWRkZW4gYnkgbGF0ZXIgY2FsbHMuXG4gICAgICovXG4gICAgY2xlYXIoZGVmZXIpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhpcy5fZmx1c2hlci5zdGFydChkZWZlcik7XG4gICAgfVxuICAgIHRvQXJyYXlBbmRDbGVhcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIF8uX3RyaW1tZXIuY2FuY2VsKCk7XG4gICAgICAgIF8uX2ZsdXNoZXIuY2FuY2VsKCk7XG4gICAgICAgIGNvbnN0IHAgPSBfLl9wb29sO1xuICAgICAgICBfLl9wb29sID0gW107XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCBmb3IgdG9BcnJheUFuZENsZWFyKCk7XG4gICAgICovXG4gICAgZHVtcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9BcnJheUFuZENsZWFyKCk7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2dlbmVyYXRvciA9IG51bGw7XG4gICAgICAgIF8uX3JlY3ljbGVyID0gbnVsbDtcbiAgICAgICAgZGlzcG9zZShfLl90cmltbWVyLCBfLl9mbHVzaGVyLCBfLl9hdXRvRmx1c2hlcik7XG4gICAgICAgIF8uX3RyaW1tZXIgPSBudWxsO1xuICAgICAgICBfLl9mbHVzaGVyID0gbnVsbDtcbiAgICAgICAgXy5fYXV0b0ZsdXNoZXIgPSBudWxsO1xuICAgICAgICBfLl9wb29sLmxlbmd0aCA9IDA7XG4gICAgICAgIF8uX3Bvb2wgPSBudWxsO1xuICAgIH1cbiAgICBleHRlbmRBdXRvQ2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCB0ID0gXy5hdXRvQ2xlYXJUaW1lb3V0O1xuICAgICAgICBpZiAoaXNGaW5pdGUodCkgJiYgIV8uX2F1dG9GbHVzaGVyLmlzU2NoZWR1bGVkKVxuICAgICAgICAgICAgXy5fYXV0b0ZsdXNoZXIuc3RhcnQodCk7XG4gICAgfVxuICAgIGFkZChvKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoXy5fcG9vbC5sZW5ndGggPj0gXy5fbG9jYWxBYnNNYXhTaXplKSB7XG4gICAgICAgICAgICAvLyBHZXR0aW5nIHRvbyBiaWcsIGRpc3Bvc2UgaW1tZWRpYXRlbHkuLi5cbiAgICAgICAgICAgIGRpc3Bvc2Uobyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoXy5fcmVjeWNsZXIpXG4gICAgICAgICAgICAgICAgXy5fcmVjeWNsZXIobyk7XG4gICAgICAgICAgICBfLl9wb29sLnB1c2gobyk7XG4gICAgICAgICAgICBjb25zdCBtID0gXy5fbWF4U2l6ZTtcbiAgICAgICAgICAgIGlmIChtIDwgQUJTT0xVVEVfTUFYX1NJWkUgJiYgXy5fcG9vbC5sZW5ndGggPiBtKVxuICAgICAgICAgICAgICAgIF8uX3RyaW1tZXIuc3RhcnQoNTAwKTtcbiAgICAgICAgfVxuICAgICAgICBfLmV4dGVuZEF1dG9DbGVhcigpO1xuICAgIH1cbiAgICBfb25UYWtlbigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXMsIGxlbiA9IF8uX3Bvb2wubGVuZ3RoO1xuICAgICAgICBpZiAobGVuIDw9IF8uX21heFNpemUpXG4gICAgICAgICAgICBfLl90cmltbWVyLmNhbmNlbCgpO1xuICAgICAgICBpZiAobGVuKVxuICAgICAgICAgICAgXy5leHRlbmRBdXRvQ2xlYXIoKTtcbiAgICB9XG4gICAgdHJ5VGFrZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gXy5fcG9vbC5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX29uVGFrZW4oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0YWtlKGZhY3RvcnkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghXy5fZ2VuZXJhdG9yICYmICFmYWN0b3J5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCdmYWN0b3J5JywgXCJNdXN0IHByb3ZpZGUgYSBmYWN0b3J5IGlmIG9uIHdhcyBub3QgcHJvdmlkZWQgYXQgY29uc3RydWN0aW9uIHRpbWUuXCIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIF8uX3Bvb2wucG9wKCkgfHwgZmFjdG9yeSAmJiBmYWN0b3J5KCkgfHwgXy5fZ2VuZXJhdG9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl9vblRha2VuKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBPYmplY3RQb29sO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0UG9vbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvT2JqZWN0UG9vbC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBTeXN0ZW1FeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9TeXN0ZW1FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbiBleHRlbmRzIFN5c3RlbUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlIHx8IFwiVW5zdXBwb3J0ZWQgZW51bWVyYWJsZS5cIik7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL1Vuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB9IGZyb20gXCIuL1NpbXBsZUVudW1lcmFibGVCYXNlXCI7XG4vKipcbiAqIEEgc2ltcGxpZmllZCBzdHJpcHBlZCBkb3duIGVudW1lcmF0b3IgdGhhdCB1bnRpbCBkaXNwb3NlZCB3aWxsIGluZmluaXRlbHkgcmV0dXJuIHRoZSBwcm92aWRlZCBmYWN0b3J5LlxuICogVGhpcyBpcyBhbmFsb2dvdXMgdG8gYSAnZ2VuZXJhdG9yJyBhbmQgaGFzIGEgY29tcGF0aWJsZSBpbnRlcmZhY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZUVudW1lcmF0b3IgZXh0ZW5kcyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB7XG4gICAgLyoqXG4gICAgICogU2VlIEluZmluaXRlVmFsdWVGYWN0b3J5XG4gICAgICogQHBhcmFtIF9mYWN0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoX2ZhY3RvcnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZmFjdG9yeSA9IF9mYWN0b3J5O1xuICAgIH1cbiAgICBfY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mYWN0b3J5ICE9IG51bGw7XG4gICAgfVxuICAgIG1vdmVOZXh0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZiA9IF8uX2ZhY3Rvcnk7XG4gICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICBfLl9jdXJyZW50ID0gZihfLl9jdXJyZW50LCBfLmluY3JlbWVudEluZGV4KCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2ZhY3RvcnkgPSBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZmluaXRlRW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUluZmluaXRlRW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0luZmluaXRlRW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJdGVyYXRvclJlc3VsdCB9IGZyb20gXCIuL0l0ZXJhdG9yUmVzdWx0XCI7XG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmV4cG9ydCBjbGFzcyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgZ2V0IGN1cnJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICAgIH1cbiAgICBnZXQgY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW5Nb3ZlTmV4dCgpO1xuICAgIH1cbiAgICB0cnlNb3ZlTmV4dChvdXQpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgb3V0KHRoaXMuX2N1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpbmNyZW1lbnRJbmRleCgpIHtcbiAgICAgICAgbGV0IGkgPSB0aGlzLl9pbmRleDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBpID0gaXNOYU4oaSkgPyAwIDogKGkgKyAxKTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIG5leHRWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5tb3ZlTmV4dCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9XG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZU5leHQoKVxuICAgICAgICAgICAgPyBuZXcgSXRlcmF0b3JSZXN1bHQodGhpcy5fY3VycmVudCwgdGhpcy5faW5kZXgpXG4gICAgICAgICAgICA6IEl0ZXJhdG9yUmVzdWx0LkRvbmU7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgfVxuICAgICdyZXR1cm4nKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IFZPSUQwICYmIHRoaXMuX2Nhbk1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICA/IG5ldyBJdGVyYXRvclJlc3VsdCh2YWx1ZSwgVk9JRDAsIHRydWUpXG4gICAgICAgICAgICAgICAgOiBJdGVyYXRvclJlc3VsdC5Eb25lO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBWT0lEMDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBOYU47XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgZ2V0SXNFbmRsZXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FuTW92ZU5leHQoKTtcbiAgICB9XG4gICAgZ2V0IGlzRW5kbGVzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXNFbmRsZXNzKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlRW51bWVyYWJsZUJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaW1wbGVFbnVtZXJhYmxlQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL1NpbXBsZUVudW1lcmFibGVCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IEl0ZXJhdG9yUmVzdWx0IH0gZnJvbSBcIi4vSXRlcmF0b3JSZXN1bHRcIjtcbmltcG9ydCB7IEZ1bmN0aW9ucyB9IGZyb20gXCIuLi8uLi9GdW5jdGlvbnNcIjtcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuLyoqXG4gKiBBIHNpbXBsaWZpZWQgc3RyaXBwZWQgZG93biBlbnVtZXJhYmxlIHRoYXQgaXMgYWx3YXlzIGNvbXBsZXRlIGFuZCBoYXMgbm8gcmVzdWx0cy5cbiAqIEZyb3plbiBhbmQgZXhwb3J0ZWQgYXMgJ2VtcHR5JyB0byBhbGxvdyBmb3IgcmV1c2UuXG4gKi9cbmV4cG9ydCBjb25zdCBFbXB0eUVudW1lcmF0b3IgPSBPYmplY3QuZnJlZXplKHtcbiAgICBjdXJyZW50OiBWT0lEMCxcbiAgICBtb3ZlTmV4dDogRnVuY3Rpb25zLkZhbHNlLFxuICAgIHRyeU1vdmVOZXh0OiBGdW5jdGlvbnMuRmFsc2UsXG4gICAgbmV4dFZhbHVlOiBGdW5jdGlvbnMuQmxhbmssXG4gICAgbmV4dDogSXRlcmF0b3JSZXN1bHQuR2V0RG9uZSxcbiAgICBcInJldHVyblwiOiBJdGVyYXRvclJlc3VsdC5HZXREb25lLFxuICAgIGVuZDogRnVuY3Rpb25zLkJsYW5rLFxuICAgIHJlc2V0OiBGdW5jdGlvbnMuQmxhbmssXG4gICAgZGlzcG9zZTogRnVuY3Rpb25zLkJsYW5rLFxuICAgIGlzRW5kbGVzczogZmFsc2Vcbn0pO1xuZXhwb3J0IGRlZmF1bHQgRW1wdHlFbnVtZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW1wdHlFbnVtZXJhdG9yLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW1wdHlFbnVtZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFNpbXBsZUVudW1lcmFibGVCYXNlIH0gZnJvbSBcIi4vU2ltcGxlRW51bWVyYWJsZUJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLyoqXG4gKiBBIHNpbXBsaWZpZWQgc3RyaXBwZWQgZG93biBlbnVtZXJhdG9yIHRoYXQgdW50aWwgZGlzcG9zZWQgd2lsbCBpbmZpbml0ZWx5IHJldHVybiB0aGUgcHJvdmlkZWQgZmFjdG9yeS5cbiAqIFRoaXMgaXMgYW5hbG9nb3VzIHRvIGEgJ2dlbmVyYXRvcicgYW5kIGhhcyBhIGNvbXBhdGlibGUgaW50ZXJmYWNlLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBJdGVyYXRvckVudW1lcmF0b3IgZXh0ZW5kcyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIF9pdGVyYXRvclxuICAgICAqIEBwYXJhbSBfaXNFbmRsZXNzIHRydWUgYW5kIGZhbHNlIGFyZSBleHBsaWNpdCB3aGVyZSBhcyB1bmRlZmluZWQgbWVhbnMgJ3Vua25vd24nLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKF9pdGVyYXRvciwgX2lzRW5kbGVzcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pdGVyYXRvciA9IF9pdGVyYXRvcjtcbiAgICAgICAgdGhpcy5faXNFbmRsZXNzID0gX2lzRW5kbGVzcztcbiAgICB9XG4gICAgX2Nhbk1vdmVOZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlcmF0b3IgIT0gbnVsbDtcbiAgICB9XG4gICAgbW92ZU5leHQodmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGkgPSBfLl9pdGVyYXRvcjtcbiAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBhcmd1bWVudHMubGVuZ3RoID8gaS5uZXh0KHZhbHVlKSA6IGkubmV4dCgpO1xuICAgICAgICAgICAgXy5fY3VycmVudCA9IHIudmFsdWU7XG4gICAgICAgICAgICBpZiAoci5kb25lKVxuICAgICAgICAgICAgICAgIF8uZGlzcG9zZSgpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9pdGVyYXRvciA9IG51bGw7XG4gICAgfVxuICAgIGdldElzRW5kbGVzcygpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5faXNFbmRsZXNzKSAmJiBzdXBlci5nZXRJc0VuZGxlc3MoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJdGVyYXRvckVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JdGVyYXRvckVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JdGVyYXRvckVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8g44Kk44Oz44K/44O844OV44Kn44Kk44K557Wx5ZCI44Gr44KI44KL44Kz44Ki44Kv44Op44K544Gu5ouh5by1XHJcbmRlY2xhcmUgaW50ZXJmYWNlIFN0cmluZyB7XHJcbiAgbm9ybWFsaXplTmV3TGluZSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcblN0cmluZy5wcm90b3R5cGUubm9ybWFsaXplTmV3TGluZSA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gdGhpcy5yZXBsYWNlKC9cXHI/XFxuL2csICdcXHJcXG4nKTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1N0cmluZ0V4dGVuc2lvbi50cyIsIi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTppbXBvcnQtbmFtZVxyXG5pbXBvcnQgeyBTdHJpbmdOb2RlIH0gZnJvbSAnLi9TdHJpbmdOb2RlJztcclxuaW1wb3J0ICcuL1N0cmluZ0V4dGVuc2lvbic7XHJcblxyXG5leHBvcnQge1xyXG4gIFN0cmluZ05vZGUsXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsImltcG9ydCB7IE5hbWVkTm9kZSB9IGZyb20gJy4vTmFtZWROb2RlJztcclxuZXhwb3J0IGNsYXNzIFN0cmluZ05vZGUgZXh0ZW5kcyBOYW1lZE5vZGU8U3RyaW5nTm9kZSwgc3RyaW5nPiB7XHJcblxyXG4gIHB1YmxpYyBnZXQgVmFsdWUoKTpzdHJpbmcge1xyXG4gICAgcmV0dXJuIHN1cGVyLmdldFZhbHVlKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgVmFsdWUodmFsdWU6c3RyaW5nKSB7XHJcbiAgICBzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihub2RlOiBzdHJpbmcpIHtcclxuICAgIHN1cGVyKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZEZpcnN0KHZhbHVlOnN0cmluZyB8IFN0cmluZ05vZGUpOlN0cmluZ05vZGUge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLkFkZEZpcnN0KG5ldyBTdHJpbmdOb2RlKHZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuQWRkRmlyc3QodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZExhc3QodmFsdWU6c3RyaW5nIHwgU3RyaW5nTm9kZSk6U3RyaW5nTm9kZSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuQWRkTGFzdChuZXcgU3RyaW5nTm9kZSh2YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkFkZExhc3QodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZE5leHQodmFsdWU6c3RyaW5nIHwgU3RyaW5nTm9kZSk6U3RyaW5nTm9kZSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuQWRkTmV4dChuZXcgU3RyaW5nTm9kZSh2YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkFkZE5leHQodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZFByZXZpb3VzKHZhbHVlOnN0cmluZyB8IFN0cmluZ05vZGUpOlN0cmluZ05vZGUge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLkFkZFByZXZpb3VzKG5ldyBTdHJpbmdOb2RlKHZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuQWRkUHJldmlvdXModmFsdWUpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU3RyaW5nTm9kZS50cyIsIi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTppbXBvcnQtbmFtZVxyXG5pbXBvcnQgRW51bWVyYWJsZSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtLkxpbnEvTGlucSc7XHJcbmltcG9ydCB7IElMaW5xRW51bWVyYWJsZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9FbnVtZXJhYmxlJztcclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmFtZWROb2RlPFROb2RlIGV4dGVuZHMgTmFtZWROb2RlPFROb2RlLCBUVmFsdWU+LCBUVmFsdWU+IGV4dGVuZHMgTm9kZTxUTm9kZSwgVFZhbHVlPiB7XHJcblxyXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihub2RlPzpUVmFsdWUpIHtcclxuICAgIGlmIChub2RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3VwZXIobm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG5hbWU6c3RyaW5nO1xyXG4gIHB1YmxpYyBnZXQgTmFtZSgpOnN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gIH1cclxuICBwcm90ZWN0ZWQgc2V0KG5hbWU6c3RyaW5nKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gIH1cclxuXHJcbiAgLy8gI3JlZ2lvbiBUcmF2ZXJzYWxcclxuXHJcbiAgcHVibGljIENoaWxkKG5hbWU6c3RyaW5nKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gc3VwZXIuQ2hpbGRyZW4oKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSkuZmlyc3QoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnMobmFtZU9ySW5jbHVzaXZlRGVwdGg/OnN0cmluZyB8IG51bWJlciwgaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWVPckluY2x1c2l2ZURlcHRoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuQW5jZXN0b3JzKG5hbWVPckluY2x1c2l2ZURlcHRoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5BbmNlc3RvcnMoaW5jbHVzaXZlRGVwdGgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2VsZihuYW1lT3JJbmNsdXNpdmVEZXB0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRGVwdGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5BbmNlc3RvcnNBbmRTZWxmKG5hbWVPckluY2x1c2l2ZURlcHRoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5BbmNlc3RvcnNBbmRTZWxmKGluY2x1c2l2ZURlcHRoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIENoaWxkcmVuKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5DaGlsZHJlbigpIFxyXG4gICAgOiBzdXBlci5DaGlsZHJlbigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBOZXh0c0Zyb21TZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5OZXh0c0Zyb21TZWxmKClcclxuICAgIDogc3VwZXIuTmV4dHNGcm9tU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBOZXh0c0Zyb21TZWxmQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuTmV4dHNGcm9tU2VsZkFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci4gTmV4dHNGcm9tU2VsZkFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tTGFzdChuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuTmV4dHNGcm9tTGFzdCgpXHJcbiAgICA6IHN1cGVyLk5leHRzRnJvbUxhc3QoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tTGFzdEFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLk5leHRzRnJvbUxhc3RBbmRTZWxmKClcclxuICAgIDogc3VwZXIuTmV4dHNGcm9tTGFzdEFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tRmlyc3QobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLlByZXZzRnJvbUZpcnN0KClcclxuICAgIDogc3VwZXIuUHJldnNGcm9tRmlyc3QoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tRmlyc3RBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5QcmV2c0Zyb21GaXJzdEFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci5QcmV2c0Zyb21GaXJzdEFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuUHJldnNGcm9tU2VsZigpXHJcbiAgICA6IHN1cGVyLlByZXZzRnJvbVNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tU2VsZkFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLlByZXZzRnJvbVNlbGZBbmRTZWxmKClcclxuICAgIDogc3VwZXIuUHJldnNGcm9tU2VsZkFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHMobmFtZU9ySW5jbHVzaXZlRGVwdGg/OnN0cmluZyB8IG51bWJlciwgaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWVPckluY2x1c2l2ZURlcHRoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuRGVzY2VuZGFudHMobmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkRlc2NlbmRhbnRzKGluY2x1c2l2ZURlcHRoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzQW5kU2VsZihuYW1lT3JJbmNsdXNpdmVEZXB0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRGVwdGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5EZXNjZW5kYW50c0FuZFNlbGYobmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkRlc2NlbmRhbnRzQW5kU2VsZihpbmNsdXNpdmVEZXB0aCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWVPckluY2x1c2l2ZURlcHRoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBTaWJsaW5ncyhuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoPzpzdHJpbmcgfCBudW1iZXIsIGluY2x1c2l2ZUVhY2hMZW5ndGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5TaWJsaW5ncyhuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5TaWJsaW5ncyhpbmNsdXNpdmVFYWNoTGVuZ3RoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgU2libGluZ3NBbmRTZWxmKG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGg/OnN0cmluZyB8IG51bWJlciwgaW5jbHVzaXZlRWFjaExlbmd0aD86bnVtYmVyKVxyXG4gICAgOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuU2libGluZ3NBbmRTZWxmKG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLlNpYmxpbmdzQW5kU2VsZihpbmNsdXNpdmVFYWNoTGVuZ3RoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmKClcclxuICAgIDogc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGZBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZkFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZkFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGYoKVxyXG4gICAgOiBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmQW5kU2VsZigpXHJcbiAgICA6IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBBbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGQobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkFuY2VzdG9yc1dpdGhTaW5nbGVDaGlsZCgpXHJcbiAgICA6IHN1cGVyLkFuY2VzdG9yc1dpdGhTaW5nbGVDaGlsZCgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGRBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5BbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGRBbmRTZWxmKClcclxuICAgIDogc3VwZXIuQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mU2luZ2xlKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5EZXNjZW5kYW50c09mU2luZ2xlKClcclxuICAgIDogc3VwZXIuRGVzY2VuZGFudHNPZlNpbmdsZSgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuRGVzY2VuZGFudHNPZlNpbmdsZUFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci5EZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mRmlyc3RDaGlsZChuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGQoKVxyXG4gICAgOiBzdXBlci5EZXNjZW5kYW50c09mRmlyc3RDaGlsZCgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mRmlyc3RDaGlsZEFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkRlc2NlbmRhbnRzT2ZGaXJzdENoaWxkQW5kU2VsZigpXHJcbiAgICA6IHN1cGVyLkRlc2NlbmRhbnRzT2ZGaXJzdENoaWxkQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL05hbWVkTm9kZS50cyIsIi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTppbXBvcnQtbmFtZVxyXG5pbXBvcnQgRW51bWVyYWJsZSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtLkxpbnEvTGlucSc7XHJcbmltcG9ydCB7IElMaW5xRW51bWVyYWJsZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9FbnVtZXJhYmxlJztcclxuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvcic7XHJcbmltcG9ydCB7IFN0cmluZ0J1aWxkZXIgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1RleHQvU3RyaW5nQnVpbGRlcic7XHJcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvL1N5c3RlbS9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb24nO1xyXG5pbXBvcnQgJy4vU3RyaW5nRXh0ZW5zaW9uJztcclxuZXhwb3J0IGNsYXNzIE5vZGU8VE5vZGUgZXh0ZW5kcyBOb2RlPFROb2RlLCBUVmFsdWU+LCBUVmFsdWU+IHtcclxuICBcclxuICAvLy8gSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIE5vZGUgY2xhc3Mgd2l0aCBhIGRlZmF1bHQgdmFsdWUuXHJcbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHZhbHVlPzogVFZhbHVlKSB7XHJcbiAgICB0aGlzLmZpcnN0Q2hpbGQgPSBudWxsO1xyXG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgdGhpcy5jeWNsaWNQcmV2ID0gdGhpcy5UaGlzTm9kZTtcclxuICAgIHRoaXMuY3ljbGljTmV4dCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICB0aGlzLlZhbHVlID0gdmFsdWUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2ZpcnN0Q2hpbGQ6VE5vZGU7XHJcbiAgcHJpdmF0ZSBfcGFyZW50OlROb2RlO1xyXG4gIHByaXZhdGUgX2N5Y2xpY1ByZXY6VE5vZGU7XHJcbiAgcHJpdmF0ZSBfY3ljbGljTmV4dDpUTm9kZTtcclxuICBwcml2YXRlIF92YWx1ZTpUVmFsdWU7XHJcblxyXG4gIHByaXZhdGUgZ2V0IFRoaXNOb2RlKCk6IFROb2RlIHtcclxuICAgIHJldHVybiA8VE5vZGU+PGFueT50aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBGaXJzdFNpYmxpbmcoKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5QYXJlbnQgIT0gbnVsbCA/IHRoaXMuUGFyZW50LkZpcnN0Q2hpbGQgOiB0aGlzLlRoaXNOb2RlO1xyXG4gIH1cclxuICBcclxuICBwdWJsaWMgZ2V0IExhc3RTaWJsaW5nKCk6IFROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLlBhcmVudCAhPSBudWxsID8gdGhpcy5QYXJlbnQuRmlyc3RDaGlsZC5DeWNsaWNQcmV2IDogdGhpcy5UaGlzTm9kZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgRmlyc3RDaGlsZCgpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLl9maXJzdENoaWxkO1xyXG4gIH1cclxuICBwcml2YXRlIHNldCBmaXJzdENoaWxkKGZpcnN0Q2hpbGQ6VE5vZGUpIHtcclxuICAgIHRoaXMuX2ZpcnN0Q2hpbGQgPSBmaXJzdENoaWxkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBMYXN0Q2hpbGQoKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5GaXJzdENoaWxkICE9IG51bGwgPyB0aGlzLkZpcnN0Q2hpbGQuQ3ljbGljUHJldiA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IFBhcmVudCgpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgc2V0IHBhcmVudChwYXJlbnQ6VE5vZGUpIHtcclxuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgQ3ljbGljUHJldigpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLl9jeWNsaWNQcmV2O1xyXG4gIH1cclxuICBwcml2YXRlIHNldCBjeWNsaWNQcmV2KGN5Y2xpY1ByZXY6VE5vZGUpIHtcclxuICAgIHRoaXMuX2N5Y2xpY1ByZXYgPSBjeWNsaWNQcmV2O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBDeWNsaWNOZXh0KCk6VE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N5Y2xpY05leHQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgc2V0IGN5Y2xpY05leHQoY3ljbGljTmV4dDpUTm9kZSkge1xyXG4gICAgdGhpcy5fY3ljbGljTmV4dCA9IGN5Y2xpY05leHQ7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgUHJldigpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLkN5Y2xpY1ByZXYgIT09IHRoaXMuTGFzdFNpYmxpbmcgPyB0aGlzLkN5Y2xpY1ByZXYgOiBudWxsO1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0IE5leHQoKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5DeWNsaWNOZXh0ICE9PSB0aGlzLkZpcnN0U2libGluZyA/IHRoaXMuQ3ljbGljTmV4dCA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0VmFsdWUoKTpUVmFsdWUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuICBwcm90ZWN0ZWQgc2V0VmFsdWUodmFsdWU6IFRWYWx1ZSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJvdGVjdGVkIGdldCBWYWx1ZSgpOlRWYWx1ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgfVxyXG4gIHByb3RlY3RlZCBzZXQgVmFsdWUodmFsdWU6IFRWYWx1ZSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgQ2hpbGRyZW5Db3VudCgpOm51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5DaGlsZHJlbigpLmNvdW50KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IExlbmd0aEZyb21EZWVwZXN0Q2hpbGQoKTpudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuR2V0TGVuZ3RoRnJvbURlZXBlc3RDaGlsZCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgR2V0TGVuZ3RoRnJvbURlZXBlc3RDaGlsZCgpOm51bWJlciB7XHJcbiAgICBsZXQgbWF4TGVuZ3RoID0gMDtcclxuICAgIHRoaXMuQ2hpbGRyZW4oKS5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgY29uc3QgbGVuZ3RoID0gY2hpbGQuR2V0TGVuZ3RoRnJvbURlZXBlc3RDaGlsZCgpICsgMTtcclxuICAgICAgaWYgKG1heExlbmd0aCA8IGxlbmd0aCkge1xyXG4gICAgICAgIG1heExlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF4TGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIENoaWxkQXRPck51bGwoaW5kZXg6bnVtYmVyKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5DaGlsZHJlbigpLmVsZW1lbnRBdE9yRGVmYXVsdChpbmRleCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzKGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIGluY2x1c2l2ZURlcHRoID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHRoaXMuQW5jZXN0b3JzQW5kU2VsZigpLnNraXAoMSkgXHJcbiAgICA6IHRoaXMuQW5jZXN0b3JzKCkudGFrZShpbmNsdXNpdmVEZXB0aCk7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTZWxmKGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKGluY2x1c2l2ZURlcHRoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuQW5jZXN0b3JzQW5kU2VsZigpLnRha2UoaW5jbHVzaXZlRGVwdGggKyAxKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuUGFyZW50O1xyXG4gICAgICB9IHdoaWxlIChub2RlICE9IG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIENoaWxkcmVuKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuRmlyc3RDaGlsZDtcclxuICAgICAgaWYgKG5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCB0ZXJtaW5hbCA9IG5vZGU7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgICAgfSB3aGlsZSAobm9kZSAhPT0gdGVybWluYWwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHVibGljIFJldmVyc2VDaGlsZHJlbigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLkxhc3RDaGlsZDtcclxuICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0ZXJtaW5hbCA9IG5vZGU7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY1ByZXY7XHJcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT09IHRlcm1pbmFsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBOZXh0c0Zyb21TZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yMShfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLkN5Y2xpY05leHQ7XHJcbiAgICAgIGNvbnN0IHRlcm1pbmFsID0gX3RoaXMuRmlyc3RTaWJsaW5nO1xyXG4gICAgICB3aGlsZSAobm9kZSAhPT0gdGVybWluYWwpIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yMSh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tU2VsZkFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKS5jb25jYXQodGhpcy5OZXh0c0Zyb21TZWxmKCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIE5leHRzRnJvbUxhc3QoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5MYXN0U2libGluZztcclxuICAgICAgY29uc3QgdGVybWluYWwgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgd2hpbGUgKG5vZGUgIT09IHRlcm1pbmFsKSB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNQcmV2O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tTGFzdEFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLk5leHRzRnJvbUxhc3QoKS5jb25jYXQoRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFByZXZzRnJvbUZpcnN0KCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuRmlyc3RTaWJsaW5nO1xyXG4gICAgICBjb25zdCB0ZXJtaW5hbCA9IF90aGlzLlRoaXNOb2RlO1xyXG4gICAgICB3aGlsZSAobm9kZSAhPT0gdGVybWluYWwpIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBQcmV2c0Zyb21GaXJzdEFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLlByZXZzRnJvbUZpcnN0KCkuY29uY2F0KEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBQcmV2c0Zyb21TZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuQ3ljbGljUHJldjtcclxuICAgICAgY29uc3QgdGVybWluYWwgPSBfdGhpcy5MYXN0U2libGluZztcclxuICAgICAgd2hpbGUgKG5vZGUgIT09IHRlcm1pbmFsKSB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNQcmV2O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tU2VsZkFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKS5jb25jYXQodGhpcy5QcmV2c0Zyb21TZWxmKCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzKGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBpZiAoaW5jbHVzaXZlRGVwdGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgICAgbGV0IGN1cnNvciA9IHN0YXJ0O1xyXG4gICAgICAgIGlmIChjdXJzb3IuRmlyc3RDaGlsZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuRmlyc3RDaGlsZDtcclxuICAgICAgICAgIHlpZWxkIGN1cnNvcjtcclxuICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChjdXJzb3IuRmlyc3RDaGlsZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgeWllbGQgY3Vyc29yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlIChjdXJzb3IuTmV4dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLlBhcmVudDtcclxuICAgICAgICAgICAgICBpZiAoY3Vyc29yID09PSBzdGFydCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuQ3ljbGljTmV4dDtcclxuICAgICAgICAgICAgeWllbGQgY3Vyc29yO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gIFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgICAgbGV0IGN1cnNvciA9IHN0YXJ0O1xyXG4gICAgICAgIGlmIChjdXJzb3IuRmlyc3RDaGlsZCAhPSBudWxsICYmIGluY2x1c2l2ZURlcHRoID4gMCkge1xyXG4gICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgICBpbmNsdXNpdmVEZXB0aC0tO1xyXG4gICAgICAgICAgeWllbGQgY3Vyc29yO1xyXG4gICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgd2hpbGUgKGN1cnNvci5GaXJzdENoaWxkICE9IG51bGwgJiYgaW5jbHVzaXZlRGVwdGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgaW5jbHVzaXZlRGVwdGgtLTtcclxuICAgICAgICAgICAgICB5aWVsZCBjdXJzb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKGN1cnNvci5OZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuUGFyZW50O1xyXG4gICAgICAgICAgICAgIGluY2x1c2l2ZURlcHRoKys7XHJcbiAgICAgICAgICAgICAgaWYgKGN1cnNvciA9PT0gc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkN5Y2xpY05leHQ7XHJcbiAgICAgICAgICAgIHlpZWxkIGN1cnNvcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c0FuZFNlbGYoaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gaW5jbHVzaXZlRGVwdGggPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpLmNvbmNhdCh0aGlzLkRlc2NlbmRhbnRzKCkpXHJcbiAgICAgIDogRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkuY29uY2F0KHRoaXMuRGVzY2VuZGFudHMoaW5jbHVzaXZlRGVwdGgpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBTaWJsaW5ncyhpbmNsdXNpdmVFYWNoTGVuZ3RoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKGluY2x1c2l2ZUVhY2hMZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5QcmV2c0Zyb21TZWxmKCkudGFrZShpbmNsdXNpdmVFYWNoTGVuZ3RoKS5yZXZlcnNlKClcclxuICAgICAgLmNvbmNhdCh0aGlzLk5leHRzRnJvbVNlbGYoKS50YWtlKGluY2x1c2l2ZUVhY2hMZW5ndGgpKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgY29uc3QgZmlyc3QgPSBfdGhpcy5GaXJzdFNpYmxpbmc7XHJcbiAgICAgIGxldCBub2RlID0gZmlyc3Q7XHJcbiAgICAgIHdoaWxlIChub2RlICE9PSA8VE5vZGU+PGFueT5fdGhpcykge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljTmV4dDtcclxuICAgICAgfVxyXG4gICAgICBub2RlID0gbm9kZS5DeWNsaWNOZXh0O1xyXG4gICAgICB3aGlsZSAobm9kZSAhPT0gZmlyc3QpIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBTaWJsaW5nc0FuZFNlbGYoaW5jbHVzaXZlRWFjaExlbmd0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmIChpbmNsdXNpdmVFYWNoTGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuUHJldnNGcm9tU2VsZigpLnRha2UoaW5jbHVzaXZlRWFjaExlbmd0aCkucmV2ZXJzZSgpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpKVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdCh0aGlzLk5leHRzRnJvbVNlbGYoKS50YWtlKGluY2x1c2l2ZUVhY2hMZW5ndGgpKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgY29uc3QgZmlyc3QgPSBfdGhpcy5GaXJzdFNpYmxpbmc7XHJcbiAgICAgIGxldCBub2RlID0gZmlyc3Q7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT09IGZpcnN0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLlRoaXNOb2RlO1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgY29uc3QgZSA9IG5vZGUuTmV4dHNGcm9tU2VsZigpLmdldEVudW1lcmF0b3IoKTtcclxuICAgICAgICB3aGlsZShlLm1vdmVOZXh0KCkpIHtcclxuICAgICAgICAgIHlpZWxkIGUuY3VycmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuUGFyZW50O1xyXG4gICAgICB9IHdoaWxlIChub2RlICE9IG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuICBcclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGZBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkuY29uY2F0KHRoaXMuQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGYoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5BbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGZBbmRTZWxmKCkuc2tpcCgxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGZBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICBjb25zdCBlID0gbm9kZS5QcmV2c0Zyb21TZWxmQW5kU2VsZigpLmdldEVudW1lcmF0b3IoKTtcclxuICAgICAgICB3aGlsZShlLm1vdmVOZXh0KCkpIHtcclxuICAgICAgICAgIHlpZWxkIGUuY3VycmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuUGFyZW50O1xyXG4gICAgICB9IHdoaWxlIChub2RlICE9IG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yV2l0aFNpbmdsZUNoaWxkKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIHdoaWxlIChub2RlID09PSBub2RlLkN5Y2xpY05leHQpIHtcclxuICAgICAgICBjb25zdCBsYXN0Tm9kZSA9IG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuUGFyZW50O1xyXG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcclxuICAgICAgICAgIHJldHVybiBsYXN0Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIHdoaWxlIChub2RlID09PSBub2RlLkN5Y2xpY05leHQpIHtcclxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XHJcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGRBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgIHdoaWxlIChub2RlID09PSBub2RlLkN5Y2xpY05leHQpIHtcclxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XHJcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mU2luZ2xlKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5EZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZigpLnNraXAoMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNPZlNpbmdsZUFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuRmlyc3RDaGlsZDtcclxuICAgICAgfSB3aGlsZSAobm9kZSAhPSBudWxsICYmIG5vZGUgPT09IG5vZGUuQ3ljbGljTmV4dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGQoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLkRlc2NlbmRhbnRzT2ZGaXJzdENoaWxkQW5kU2VsZigpLnNraXAoMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGRBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkZpcnN0Q2hpbGQ7XHJcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT0gbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkUHJldmlvdXMobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZSAhPSBudWxsKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUuUGFyZW50ID09IG51bGwpO1xyXG4gICAgY29uc29sZS5hc3NlcnQodGhpcy5QYXJlbnQgIT0gbnVsbCk7XHJcbiAgICBpZiAodGhpcy5QYXJlbnQuRmlyc3RDaGlsZCA9PT0gPFROb2RlPjxhbnk+dGhpcykge1xyXG4gICAgICB0aGlzLlBhcmVudC5maXJzdENoaWxkID0gbm9kZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLkFkZFByZXZpb3VzSWdub3JpbmdGaXJzdENoaWxkKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZE5leHQobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZSAhPSBudWxsKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUuUGFyZW50ID09IG51bGwpO1xyXG4gICAgY29uc29sZS5hc3NlcnQodGhpcy5QYXJlbnQgIT0gbnVsbCk7XHJcbiAgICByZXR1cm4gdGhpcy5DeWNsaWNOZXh0LkFkZFByZXZpb3VzSWdub3JpbmdGaXJzdENoaWxkKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZEZpcnN0KG5vZGU6VE5vZGUpOlROb2RlIHtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUgIT0gbnVsbCk7XHJcbiAgICBjb25zb2xlLmFzc2VydChub2RlLlBhcmVudCA9PSBudWxsKTtcclxuICAgIHJldHVybiB0aGlzLkFkZEZpcnN0UHJpdmF0ZShub2RlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgQWRkRmlyc3RQcml2YXRlKG5vZGU6VE5vZGUpOlROb2RlIHtcclxuICAgIHRoaXMuQWRkTGFzdFByaXZhdGUobm9kZSk7XHJcbiAgICB0aGlzLmZpcnN0Q2hpbGQgPSBub2RlO1xyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIEFkZFByZXZpb3VzSWdub3JpbmdGaXJzdENoaWxkKG5vZGU6VE5vZGUpOlROb2RlIHtcclxuICAgIG5vZGUucGFyZW50ID0gdGhpcy5QYXJlbnQ7XHJcbiAgICBub2RlLmN5Y2xpY05leHQgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgbm9kZS5jeWNsaWNQcmV2ID0gdGhpcy5DeWNsaWNQcmV2O1xyXG4gICAgdGhpcy5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSBub2RlO1xyXG4gICAgdGhpcy5jeWNsaWNQcmV2ID0gbm9kZTtcclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZExhc3Qobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZSAhPSBudWxsKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUuUGFyZW50ID09IG51bGwpO1xyXG4gICAgcmV0dXJuIHRoaXMuQWRkTGFzdFByaXZhdGUobm9kZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIEFkZExhc3RQcml2YXRlKG5vZGU6VE5vZGUpOlROb2RlIHtcclxuICAgIGNvbnN0IHNlY29uZCA9IHRoaXMuRmlyc3RDaGlsZDtcclxuICAgIGlmIChzZWNvbmQgPT0gbnVsbCkge1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICAgIG5vZGUuY3ljbGljTmV4dCA9IG5vZGU7XHJcbiAgICAgIG5vZGUuY3ljbGljUHJldiA9IG5vZGU7XHJcbiAgICAgIHRoaXMuZmlyc3RDaGlsZCA9IG5vZGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZWNvbmQuQWRkUHJldmlvdXNJZ25vcmluZ0ZpcnN0Q2hpbGQobm9kZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBSZXBsYWNlKG5ld05vZGU6VE5vZGUpOnZvaWQge1xyXG4gICAgaWYgKHRoaXMuUGFyZW50ID09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oJ0Egcm9vdCBub2RlIGNhbm5vdCBiZSByZXBsYWNlZC4nKTtcclxuICAgIH1cclxuICAgIG5ld05vZGUucGFyZW50ID0gdGhpcy5QYXJlbnQ7XHJcbiAgICBuZXdOb2RlLmN5Y2xpY05leHQgPSB0aGlzLkN5Y2xpY05leHQ7XHJcbiAgICBuZXdOb2RlLmN5Y2xpY1ByZXYgPSB0aGlzLkN5Y2xpY1ByZXY7XHJcbiAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IG5ld05vZGU7IC8vIHByZXYubmV4dCA9IG5ld05vZGVcclxuICAgIHRoaXMuQ3ljbGljTmV4dC5jeWNsaWNQcmV2ID0gbmV3Tm9kZTtcclxuICAgIG5ld05vZGUuQ3ljbGljUHJldi5jeWNsaWNOZXh0ID0gbmV3Tm9kZTtcclxuICAgIGlmICh0aGlzLlBhcmVudC5GaXJzdENoaWxkID09PSA8VE5vZGU+PGFueT50aGlzKSB7XHJcbiAgICAgIHRoaXMuUGFyZW50LmZpcnN0Q2hpbGQgPSBuZXdOb2RlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jeWNsaWNOZXh0ID0gbnVsbDtcclxuICAgIHRoaXMuY3ljbGljUHJldiA9IG51bGw7XHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUmVtb3ZlKCk6dm9pZCB7XHJcbiAgICBpZiAodGhpcy5QYXJlbnQgPT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbignQSByb290IG5vZGUgY2Fubm90IGJlIHJlbW92ZWQuJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXh0ID0gdGhpcy5DeWNsaWNOZXh0O1xyXG4gICAgaWYgKG5leHQgIT09IDxUTm9kZT48YW55PnRoaXMpIHtcclxuICAgICAgdGhpcy5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSBuZXh0O1xyXG4gICAgICBuZXh0LmN5Y2xpY1ByZXYgPSB0aGlzLkN5Y2xpY1ByZXY7XHJcbiAgICAgIGlmICh0aGlzLlBhcmVudC5GaXJzdENoaWxkID09PSA8VE5vZGU+PGFueT50aGlzKSB7XHJcbiAgICAgICAgdGhpcy5QYXJlbnQuZmlyc3RDaGlsZCA9IG5leHQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUGFyZW50LmZpcnN0Q2hpbGQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jeWNsaWNOZXh0ID0gbnVsbDtcclxuICAgIHRoaXMuY3ljbGljUHJldiA9IG51bGw7XHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUmVtb3ZlUmVjb3ZlcmFibHkoKSB7XHJcbiAgICBpZiAodGhpcy5QYXJlbnQgPT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbignQSByb290IG5vZGUgY2Fubm90IGJlIHJlbW92ZWQuJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXh0ID0gdGhpcy5DeWNsaWNOZXh0O1xyXG4gICAgaWYgKG5leHQgIT09IDxUTm9kZT48YW55PnRoaXMpIHtcclxuICAgICAgdGhpcy5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSBuZXh0O1xyXG4gICAgICBuZXh0LmN5Y2xpY1ByZXYgPSB0aGlzLkN5Y2xpY1ByZXY7XHJcbiAgICAgIGlmICh0aGlzLlBhcmVudC5GaXJzdENoaWxkID09PSA8VE5vZGU+PGFueT50aGlzKSB7XHJcbiAgICAgICAgdGhpcy5QYXJlbnQuZmlyc3RDaGlsZCA9IG5leHQ7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgIG5leHQuUGFyZW50LmZpcnN0Q2hpbGQgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgICAgICAgdGhpcy5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgICAgICAgbmV4dC5jeWNsaWNQcmV2ID0gdGhpcy5UaGlzTm9kZTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgICAgIG5leHQuY3ljbGljUHJldiA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLlBhcmVudDtcclxuICAgIHBhcmVudC5maXJzdENoaWxkID0gbnVsbDtcclxuICAgIHJldHVybiAoKSA9PiB7IHBhcmVudC5maXJzdENoaWxkID0gdGhpcy5UaGlzTm9kZTsgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b1N0cmluZygpOnN0cmluZyB7XHJcbiAgICBjb25zdCBidWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgIHRoaXMuVG9TdHJpbmdQcml2YXRlKHRoaXMuVGhpc05vZGUsIDAsIGJ1aWxkZXIpO1xyXG4gICAgcmV0dXJuIGJ1aWxkZXIudG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgVG9TdHJpbmdQcml2YXRlKG5vZGU6VE5vZGUsZGVwdGg6bnVtYmVyLCBidWlsZGVyOlN0cmluZ0J1aWxkZXIpOnZvaWQgIHtcclxuICAgIGlmIChub2RlID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXB0aDsgaSsrKSB7XHJcbiAgICAgIGJ1aWxkZXIuYXBwZW5kKCcgICcpO1xyXG4gICAgfVxyXG4gICAgYnVpbGRlci5hcHBlbmRMaW5lKCFub2RlLlZhbHVlICE9IG51bGwgPyBub2RlLlZhbHVlLnRvU3RyaW5nKCkgOiAnJyk7XHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuQ2hpbGRyZW4oKTtcclxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICB0aGlzLlRvU3RyaW5nUHJpdmF0ZShjaGlsZCwgZGVwdGggKyAxLCBidWlsZGVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvTm9kZS50cyIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogT3JpZ2luYWw6IGh0dHA6Ly9saW5xanMuY29kZXBsZXguY29tL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGFyZUVxdWFsIGFzIGFyZUVxdWFsVmFsdWVzLCBjb21wYXJlIGFzIGNvbXBhcmVWYWx1ZXMgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbXBhcmVcIjtcbmltcG9ydCB7IGNvcHkgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L2NvcHlcIjtcbmltcG9ydCAqIGFzIEFycmF5cyBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L0NvbXBhcmVcIjtcbmltcG9ydCAqIGFzIGVudW1VdGlsIGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgaXNFbnVtZXJhYmxlLCBpc0VudW1lcmF0b3IsIGlzSXRlcmF0b3IsIHRocm93SWZFbmRsZXNzIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBFbXB0eUVudW1lcmF0b3IgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VtcHR5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9TeXN0ZW0vVHlwZXNcIjtcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi4vU3lzdGVtL0ludGVnZXJcIjtcbmltcG9ydCB7IEZ1bmN0aW9ucyBhcyBCYXNlRnVuY3Rpb25zIH0gZnJvbSBcIi4uL1N5c3RlbS9GdW5jdGlvbnNcIjtcbmltcG9ydCB7IEFycmF5RW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vQXJyYXlFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IERpY3Rpb25hcnkgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9EaWN0aW9uYXJ5XCI7XG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvUXVldWVcIjtcbmltcG9ydCB7IGRpc3Bvc2UsIHVzaW5nIH0gZnJvbSBcIi4uL1N5c3RlbS9EaXNwb3NhYmxlL2Rpc3Bvc2VcIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uL1N5c3RlbS9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24gfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL1Vuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gfSBmcm9tIFwiLi4vU3lzdGVtL0Rpc3Bvc2FibGUvT2JqZWN0RGlzcG9zZWRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEtleVNvcnRlZENvbnRleHQgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL1NvcnRpbmcvS2V5U29ydGVkQ29udGV4dFwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgSW5kZXhFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JbmRleEVudW1lcmF0b3JcIjtcbmltcG9ydCB7IEl0ZXJhdG9yRW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSXRlcmF0b3JFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vU3lzdGVtL1JhbmRvbVwiO1xuaW1wb3J0IHsgSW5maW5pdGVFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JbmZpbml0ZUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IExhenlMaXN0IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9MYXp5TGlzdFwiO1xudmFyIGRpc3Bvc2VTaW5nbGUgPSBkaXNwb3NlLnNpbmdsZTtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLy8gI3JlZ2lvbiBMb2NhbCBDb25zdGFudHMuXG5jb25zdCBJTlZBTElEX0RFRkFVTFQgPSB7fTsgLy8gY3JlYXRlIGEgcHJpdmF0ZSB1bmlxdWUgaW5zdGFuY2UgZm9yIHJlZmVyZW5jaW5nLlxuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5jb25zdCBOVUxMID0gbnVsbDtcbmZ1bmN0aW9uIEJSRUFLKCkge1xuICAgIHJldHVybiAwIC8qIEJyZWFrICovO1xufVxuZnVuY3Rpb24gUkVUVVJOKCkge1xuICAgIHJldHVybiAxIC8qIFJldHVybiAqLztcbn1cbmZ1bmN0aW9uIGlzTm90TnVsbE9yVW5kZWZpbmVkKGUpIHtcbiAgICByZXR1cm4gZSAhPSBudWxsO1xufVxuLy8gTGVhdmUgaW50ZXJuYWwgdG8gYXZvaWQgYWNjaWRlbnRhbCBvdmVyd3JpdGluZy5cbmNsYXNzIExpbnFGdW5jdGlvbnMgZXh0ZW5kcyBCYXNlRnVuY3Rpb25zIHtcbiAgICAvLyBub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIEdyZWF0ZXIoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA+IGIgPyBhIDogYjtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICBMZXNzZXIoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA8IGIgPyBhIDogYjtcbiAgICB9XG59XG5jb25zdCBGdW5jdGlvbnMgPSBPYmplY3QuZnJlZXplKG5ldyBMaW5xRnVuY3Rpb25zKCkpO1xuLy8gRm9yIHJlLXVzZSBhcyBhIGZhY3RvcnkuXG5mdW5jdGlvbiBnZXRFbXB0eUVudW1lcmF0b3IoKSB7XG4gICAgcmV0dXJuIEVtcHR5RW51bWVyYXRvcjtcbn1cbi8vICNlbmRyZWdpb25cbi8qXG4gKiBOT1RFOiBBYm91dCBJbmZpbml0ZUVudW1lcmFibGU8VD4gYW5kIEVudW1lcmFibGU8VD4uXG4gKiBUaGVyZSBtYXkgc2VlbSBsaWtlIHRoZXJlJ3MgZXh0cmEgb3ZlcnJpZGVzIGhlcmUgYW5kIHRoZXkgbWF5IHNlZW0gdW5uZWNlc3NhcnkuXG4gKiBCdXQgYWZ0ZXIgY2xvc2VyIGluc3BlY3Rpb24geW91J2xsIHNlZSB0aGUgdHlwZSBjaGFpbiBpcyByZXRhaW5lZCBhbmRcbiAqIGluZmluaXRlIGVudW1lcmFibGVzIGFyZSBwcmV2ZW50ZWQgZnJvbSBoYXZpbmcgZmVhdHVyZXMgdGhhdCBmaW5pdGUgb25lcyBoYXZlLlxuICpcbiAqIEknbSBub3Qgc3VyZSBpZiBpdCdzIHRoZSBiZXN0IG9wdGlvbiB0byBqdXN0IHVzZSBvdmVycmlkZXMsIGJ1dCBpdCBob25vcnMgdGhlIHR5cGluZyBwcm9wZXJseS5cbiAqL1xuZXhwb3J0IGNsYXNzIEluZmluaXRlTGlucUVudW1lcmFibGUgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX2VudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIpIHtcbiAgICAgICAgc3VwZXIoZmluYWxpemVyKTtcbiAgICAgICAgdGhpcy5fZW51bWVyYXRvckZhY3RvcnkgPSBfZW51bWVyYXRvckZhY3Rvcnk7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IHRydWU7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJJbmZpbml0ZUxpbnFFbnVtZXJhYmxlXCI7XG4gICAgfVxuICAgIGdldCBpc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VuZGxlc3M7XG4gICAgfVxuICAgIC8vICNyZWdpb24gSUVudW1lcmFibGU8VD4gSW1wbGVtZW50YXRpb24uLi5cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZW51bWVyYXRvckZhY3RvcnkoKTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIC8vICNyZWdpb24gSURpc3Bvc2FibGUgb3ZlcnJpZGUuLi5cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7IC8vIEp1c3QgaW4gY2FzZS5cbiAgICAgICAgdGhpcy5fZW51bWVyYXRvckZhY3RvcnkgPSBudWxsO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgLy8gUmV0dXJuIGEgZGVmYXVsdCAodW5maWx0ZXJlZCkgZW51bWVyYWJsZS5cbiAgICBhc0VudW1lcmFibGUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4gXy5nZXRFbnVtZXJhdG9yKCkpO1xuICAgIH1cbiAgICBkb0FjdGlvbihhY3Rpb24sIGluaXRpYWxpemVyLCBpc0VuZGxlc3MgPSB0aGlzLmlzRW5kbGVzcywgb25Db21wbGV0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFID0gaXNFbmRsZXNzIHx8IHVuZGVmaW5lZDsgLy8gSW4gY2FzZSBpdCdzIG51bGwuXG4gICAgICAgIGlmICghYWN0aW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImFjdGlvblwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWFjdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYWxpemVyKVxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplcigpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgLy8gTWF5IG5lZWQgYSB3YXkgdG8gcHJvcGFnYXRlIGlzRW5kbGVzc1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWFjdGlvbik7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvblJlc3VsdCA9IGFjdGlvbihjLCBpbmRleCsrKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvblJlc3VsdCA9PT0gZmFsc2UgfHwgYWN0aW9uUmVzdWx0ID09PSAwIC8qIEJyZWFrICovKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uUmVzdWx0ICE9PSAyIC8qIFNraXAgKi8pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgYWN0aW9uUmVzdWx0PT09MiwgdGhlbiBhIHNpZ25hbCBmb3Igc2tpcCBpcyByZWNlaXZlZC5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9uQ29tcGxldGUpXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoaW5kZXgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9LCBpc0UpO1xuICAgICAgICB9LCBcbiAgICAgICAgLy8gVXNpbmcgYSBmaW5hbGl6ZXIgdmFsdWUgcmVkdWNlcyB0aGUgY2hhbmNlIG9mIGEgY2lyY3VsYXIgcmVmZXJlbmNlXG4gICAgICAgIC8vIHNpbmNlIHdlIGNvdWxkIHNpbXBseSByZWZlcmVuY2UgdGhlIGVudW1lcmF0aW9uIGFuZCBjaGVjayBlLndhc0Rpc3Bvc2VkLlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBhY3Rpb24gPSBOVUxMO1xuICAgICAgICB9LCBpc0UpO1xuICAgIH1cbiAgICBmb3JjZSgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhpcy5kb0FjdGlvbihCUkVBSylcbiAgICAgICAgICAgIC5nZXRFbnVtZXJhdG9yKClcbiAgICAgICAgICAgIC5tb3ZlTmV4dCgpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIEluZGV4aW5nL1BhZ2luZyBtZXRob2RzLlxuICAgIHNraXAoY291bnQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKGdldEVtcHR5RW51bWVyYXRvcik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICByZXR1cm4gdGhpcy53aGVyZSgoZWxlbWVudCwgaW5kZXgpID0+IGluZGV4ID49IGNvdW50KTtcbiAgICB9XG4gICAgdGFrZShjb3VudCkge1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignY291bnQnLCBjb3VudCwgJ011c3QgYmUgZmluaXRlLicpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgLy8gT25jZSBhY3Rpb24gcmV0dXJucyBmYWxzZSwgdGhlIGVudW1lcmF0aW9uIHdpbGwgc3RvcC5cbiAgICAgICAgcmV0dXJuIF8uZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiBpbmRleCA8IGNvdW50LCBudWxsLCBmYWxzZSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gU2luZ2xlIFZhbHVlIFJldHVybi4uLlxuICAgIGVsZW1lbnRBdChpbmRleCkge1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5lbGVtZW50QXRPckRlZmF1bHQoaW5kZXgsIElOVkFMSURfREVGQVVMVCk7XG4gICAgICAgIGlmICh2ID09PSBJTlZBTElEX0RFRkFVTFQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdpbmRleCcsIGluZGV4LCBcImlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHNvdXJjZVwiKTtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICAgIGVsZW1lbnRBdE9yRGVmYXVsdChpbmRleCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgsICdpbmRleCcpO1xuICAgICAgICBjb25zdCBuID0gaW5kZXg7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gbilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUuY3VycmVudDtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyogTm90ZTogVW5saWtlIHByZXZpb3VzIGltcGxlbWVudGF0aW9ucywgeW91IGNvdWxkIHBhc3MgYSBwcmVkaWNhdGUgaW50byB0aGVzZSBtZXRob2RzLlxuICAgICAqIEJ1dCBzaW5jZSB1bmRlciB0aGUgaG9vZCBpdCBlbmRzIHVwIGNhbGxpbmcgLndoZXJlKHByZWRpY2F0ZSkgYW55d2F5LFxuICAgICAqIGl0IG1heSBiZSBiZXR0ZXIgdG8gcmVtb3ZlIHRoaXMgdG8gYWxsb3cgZm9yIGEgY2xlYW5lciBzaWduYXR1cmUvb3ZlcnJpZGUuXG4gICAgICogSmF2YVNjcmlwdC9UeXBlU2NyaXB0IGRvZXMgbm90IGVhc2lseSBhbGxvdyBmb3IgYSBzdHJpY3QgbWV0aG9kIGludGVyZmFjZSBsaWtlIEMjLlxuICAgICAqIEhhdmluZyB0byB3cml0ZSBleHRyYSBvdmVycmlkZSBsb2dpYyBpcyBlcnJvciBwcm9uZSBhbmQgY29uZnVzaW5nIHRvIHRoZSBjb25zdW1lci5cbiAgICAgKiBSZW1vdmluZyB0aGUgcHJlZGljYXRlIGhlcmUgbWF5IGFsc28gY2F1c2UgdGhlIGNvbnN1bWVyIG9mIHRoaXMgbWV0aG9kIHRvIHRoaW5rIG1vcmUgYWJvdXQgaG93IHRoZXkgc3RydWN0dXJlIHRoZWlyIHF1ZXJ5LlxuICAgICAqIFRoZSBlbmQgYWxsIGRpZmZlcmVuY2UgaXMgdGhhdCB0aGUgdXNlciBtdXN0IGRlY2xhcmUgLndoZXJlKHByZWRpY2F0ZSkgYmVmb3JlIC5maXJzdCgpLCAuc2luZ2xlKCksIG9yIC5sYXN0KCkuXG4gICAgICogT3RoZXJ3aXNlIHRoZXJlIHdvdWxkIG5lZWQgdG8gYmUgbXVjaCBtb3JlIGNvZGUgdG8gaGFuZGxlIHRoZXNlIGNhc2VzICguZmlyc3QocHJlZGljYXRlKSwgZXRjKTtcbiAgICAgKiAqL1xuICAgIGZpcnN0KCkge1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5maXJzdE9yRGVmYXVsdChJTlZBTElEX0RFRkFVTFQpO1xuICAgICAgICBpZiAodiA9PT0gSU5WQUxJRF9ERUZBVUxUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZmlyc3Q6VGhlIHNlcXVlbmNlIGlzIGVtcHR5LlwiKTtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICAgIGZpcnN0T3JEZWZhdWx0KGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlID0+IGUubW92ZU5leHQoKSA/IGUuY3VycmVudCA6IGRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuICAgIHNpbmdsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZS5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmICghZS5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2luZ2xlOnNlcXVlbmNlIGNvbnRhaW5zIG1vcmUgdGhhbiBvbmUgZWxlbWVudC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzaW5nbGU6VGhlIHNlcXVlbmNlIGlzIGVtcHR5LlwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpbmdsZU9yRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZS5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmICghZS5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYW55KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlID0+IGUubW92ZU5leHQoKSk7XG4gICAgfVxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5hbnkoKTtcbiAgICB9XG4gICAgdHJhdmVyc2VEZXB0aEZpcnN0KGNoaWxkcmVuU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzOyAvLyBJcyBlbmRsZXNzIGlzIG5vdCBhZmZpcm1hdGl2ZSBpZiBmYWxzZS5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBEZXYgTm90ZTogTWF5IHdhbnQgdG8gY29uc2lkZXIgdXNpbmcgYW4gYWN0dWFsIHN0YWNrIGFuZCBub3QgYW4gYXJyYXkuXG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvclN0YWNrO1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbGVuOyAvLyBBdm9pZCB1c2luZyBwdXNoL3BvcCBzaW5jZSB0aGV5IHF1ZXJ5IC5sZW5ndGggZXZlcnkgdGltZSBhbmQgY2FuIGJlIHNsb3dlci5cbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFjayA9IFtdO1xuICAgICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcmVzdWx0U2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBsZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvclN0YWNrW2xlbisrXSA9IGVudW1lcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IGNoaWxkcmVuU2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlID0gIVR5cGUuaXNTdHJpbmcoYykgJiYgRW51bWVyYWJsZS5mcm9tQW55KGMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IGUgPyBlLmdldEVudW1lcmF0b3IoKSA6IEVtcHR5RW51bWVyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobGVuID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gZW51bWVyYXRvclN0YWNrWy0tbGVuXTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvclN0YWNrLmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yU3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3Bvc2UudGhlc2Uubm9Db3B5KGVudW1lcmF0b3JTdGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yU3RhY2subGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFjayA9IE5VTEw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGZsYXR0ZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1hbnkoZW50cnkgPT4ge1xuICAgICAgICAgICAgbGV0IGUgPSAhVHlwZS5pc1N0cmluZyhlbnRyeSkgJiYgRW51bWVyYWJsZS5mcm9tQW55KGVudHJ5KTtcbiAgICAgICAgICAgIHJldHVybiBlID8gZS5mbGF0dGVuKCkgOiBbZW50cnldO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcGFpcndpc2Uoc2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghc2VsZWN0b3IpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic2VsZWN0b3JcIik7XG4gICAgICAgIGxldCBwcmV2aW91cztcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0KCh2YWx1ZSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gaSA/IHNlbGVjdG9yKHByZXZpb3VzLCB2YWx1ZSwgaSkgOiBOVUxMO1xuICAgICAgICAgICAgcHJldmlvdXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pLnNraXAoMSk7XG4gICAgfVxuICAgIHNjYW4oZnVuYywgc2VlZCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFmdW5jKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImZ1bmNcIik7XG4gICAgICAgIHJldHVybiAoc2VlZCA9PT0gVk9JRDBcbiAgICAgICAgICAgID8gdGhpcy5zZWxlY3QoKHZhbHVlLCBpKSA9PiBzZWVkID0gaSA/IGZ1bmMoc2VlZCwgdmFsdWUsIGkpIDogdmFsdWUpXG4gICAgICAgICAgICA6IHRoaXMuc2VsZWN0KCh2YWx1ZSwgaSkgPT4gc2VlZCA9IGZ1bmMoc2VlZCwgdmFsdWUsIGkpKSk7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICBzZWxlY3Qoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgbWFwKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChzZWxlY3Rvcik7XG4gICAgfVxuICAgIC8qXG4gICAgcHVibGljIHN0YXRpYyBJRW51bWVyYWJsZTxUUmVzdWx0PiBTZWxlY3RNYW55PFRTb3VyY2UsIFRDb2xsZWN0aW9uLCBUUmVzdWx0PihcbiAgICAgICAgdGhpcyBJRW51bWVyYWJsZTxUU291cmNlPiBzb3VyY2UsXG4gICAgICAgIEZ1bmM8VFNvdXJjZSzigIJJRW51bWVyYWJsZTxUQ29sbGVjdGlvbj4+IGNvbGxlY3Rpb25TZWxlY3RvcixcbiAgICAgICAgRnVuYzxUU291cmNlLOKAglRDb2xsZWN0aW9uLOKAglRSZXN1bHQ+IHJlc3VsdFNlbGVjdG9yKVxuICAgICAqL1xuICAgIF9zZWxlY3RNYW55KGNvbGxlY3Rpb25TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghY29sbGVjdGlvblNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImNvbGxlY3Rpb25TZWxlY3RvclwiKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzOyAvLyBEbyBzZWNvbmQgZW51bWVyYXRpb24sIGl0IHdpbGwgYmUgaW5kZXRlcm1pbmF0ZSBpZiBmYWxzZS5cbiAgICAgICAgaWYgKCFyZXN1bHRTZWxlY3RvcilcbiAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yID0gKGEsIGIpID0+IGI7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbWlkZGxlRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWNvbGxlY3Rpb25TZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIG1pZGRsZUVudW1lcmF0b3IgPSBWT0lEMDtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghY29sbGVjdGlvblNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAvLyBKdXN0IHN0YXJ0ZWQsIGFuZCBub3RoaW5nIHRvIGVudW1lcmF0ZT8gRW5kLlxuICAgICAgICAgICAgICAgIGlmIChtaWRkbGVFbnVtZXJhdG9yID09PSBWT0lEMCAmJiAhZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gbW92ZU5leHQgaGFzIGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2UuLi5cbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgbWlkZGxlIGlmIHRoZXJlIGlzbid0IG9uZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtaWRkbGVFbnVtZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWlkZGxlU2VxID0gY29sbGVjdGlvblNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgaW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb2xsZWN0aW9uIGlzIG51bGw/ICBTa2lwIGl0Li4uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1pZGRsZVNlcSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pZGRsZUVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKG1pZGRsZVNlcSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pZGRsZUVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgbWlkZGxlRW51bWVyYXRvci5jdXJyZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVsc2Ugbm8gbW9yZSBpbiB0aGlzIG1pZGRsZT8gIFRoZW4gY2xlYXIgYW5kIHJlc2V0IGZvciBuZXh0Li4uXG4gICAgICAgICAgICAgICAgICAgIG1pZGRsZUVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZGlzcG9zZVNpbmdsZShtaWRkbGVFbnVtZXJhdG9yKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb25TZWxlY3RvciA9IE5VTEw7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIHNlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKTtcbiAgICB9XG4gICAgX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5LCBmaWx0ZXIpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlbGVjdG9yXCIpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBzZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIGkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbHRlciB8fCBmaWx0ZXIocmVzdWx0LCBpKyspKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH0sIF8uX2lzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIH0sIF8uX2lzRW5kbGVzcyk7XG4gICAgfVxuICAgIGNob29zZShzZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoc2VsZWN0b3IsIGlzTm90TnVsbE9yVW5kZWZpbmVkKTtcbiAgICB9XG4gICAgd2hlcmUocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChGdW5jdGlvbnMuSWRlbnRpdHksIHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIGZpbHRlcihwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKEZ1bmN0aW9ucy5JZGVudGl0eSwgcHJlZGljYXRlKTtcbiAgICB9XG4gICAgbm9uTnVsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2hlcmUodiA9PiB2ICE9IG51bGwgJiYgdiAhPSBWT0lEMCk7XG4gICAgfVxuICAgIG9mVHlwZSh0eXBlKSB7XG4gICAgICAgIGxldCB0eXBlTmFtZTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgICAgICAgICB0eXBlTmFtZSA9IFR5cGUuTlVNQkVSO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTdHJpbmc6XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLlNUUklORztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQm9vbGVhbjpcbiAgICAgICAgICAgICAgICB0eXBlTmFtZSA9IFR5cGUuQk9PTEVBTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRnVuY3Rpb246XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLkZVTkNUSU9OO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICAgICAgICAgICAgICAud2hlcmUoeCA9PiB4IGluc3RhbmNlb2YgdHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgIC53aGVyZSh4ID0+IGlzTm90TnVsbE9yVW5kZWZpbmVkKHgpICYmIHR5cGVvZiB4ID09PSB0eXBlTmFtZSk7XG4gICAgfVxuICAgIGV4Y2VwdChzZWNvbmQsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBrZXlzO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAga2V5cyA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZClcbiAgICAgICAgICAgICAgICAgICAgZW51bVV0aWwuZm9yRWFjaChzZWNvbmQsIGtleSA9PiB7IGtleXMuYWRkQnlLZXlWYWx1ZShrZXksIHRydWUpOyB9KTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWtleXMuY29udGFpbnNLZXkoY3VycmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMuYWRkQnlLZXlWYWx1ZShjdXJyZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAga2V5cy5jbGVhcigpO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBkaXN0aW5jdChjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjZXB0KE5VTEwsIGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgfVxuICAgIC8vIFswLDAsMCwxLDEsMSwyLDIsMiwwLDAsMCwxLDFdIHJlc3VsdHMgaW4gWzAsMSwyLDAsMV07XG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGNvbXBhcmVLZXk7XG4gICAgICAgICAgICBsZXQgaW5pdGlhbCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBjb21wYXJlU2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlS2V5LCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb21wYXJlS2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc2luZ2xlIGRlZmF1bHQgdmFsdWUgaWYgZW1wdHkuXG4gICAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZVxuICAgICAqIEByZXR1cm5zIHtFbnVtZXJhYmxlfVxuICAgICAqL1xuICAgIGRlZmF1bHRJZkVtcHR5KGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGlzRmlyc3Q7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNGaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICB6aXAoc2Vjb25kLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlyc3RFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHNlY29uZEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKHNlY29uZCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4gZmlyc3RFbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAmJiBzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGZpcnN0RW51bWVyYXRvci5jdXJyZW50LCBzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQsIGluZGV4KyspKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHppcE11bHRpcGxlKHNlY29uZCwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghc2Vjb25kLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlY29uZFRlbXA7XG4gICAgICAgICAgICBsZXQgZmlyc3RFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHNlY29uZEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2Vjb25kVGVtcCA9IG5ldyBRdWV1ZShzZWNvbmQpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIXNlY29uZEVudW1lcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kVGVtcC5jb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHNlY29uZFRlbXAuZGVxdWV1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKG5leHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0U2VsZWN0b3IoZmlyc3RFbnVtZXJhdG9yLmN1cnJlbnQsIHNlY29uZEVudW1lcmF0b3IuY3VycmVudCwgaW5kZXgrKykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZFRlbXApXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZFRlbXAuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgc2Vjb25kVGVtcCA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gSm9pbiBNZXRob2RzXG4gICAgam9pbihpbm5lciwgb3V0ZXJLZXlTZWxlY3RvciwgaW5uZXJLZXlTZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IsIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgb3V0ZXJFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGxvb2t1cDtcbiAgICAgICAgICAgIGxldCBpbm5lckVsZW1lbnRzO1xuICAgICAgICAgICAgbGV0IGlubmVyQ291bnQgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0ZXJFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgbG9va3VwID0gRW51bWVyYWJsZS5mcm9tKGlubmVyKVxuICAgICAgICAgICAgICAgICAgICAudG9Mb29rdXAoaW5uZXJLZXlTZWxlY3RvciwgRnVuY3Rpb25zLklkZW50aXR5LCBjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXJFbGVtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlubmVyRWxlbWVudCA9IGlubmVyRWxlbWVudHNbaW5uZXJDb3VudCsrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lckVsZW1lbnQgIT09IFZPSUQwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKG91dGVyRW51bWVyYXRvci5jdXJyZW50LCBpbm5lckVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyRWxlbWVudHMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dGVyRW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gb3V0ZXJLZXlTZWxlY3RvcihvdXRlckVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lckVsZW1lbnRzID0gbG9va3VwLmdldChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvdXRlckVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIG91dGVyRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaW5uZXJFbGVtZW50cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgb3V0ZXJFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBsb29rdXAgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBncm91cEpvaW4oaW5uZXIsIG91dGVyS2V5U2VsZWN0b3IsIGlubmVyS2V5U2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbG9va3VwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGxvb2t1cCA9IEVudW1lcmFibGUuZnJvbShpbm5lcilcbiAgICAgICAgICAgICAgICAgICAgLnRvTG9va3VwKGlubmVyS2V5U2VsZWN0b3IsIEZ1bmN0aW9ucy5JZGVudGl0eSwgY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiBlbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgbG9va3VwLmdldChvdXRlcktleVNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCkpKSksICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgbG9va3VwID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWVyZ2UoZW51bWVyYWJsZXMpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgaWYgKCFlbnVtZXJhYmxlcyB8fCBlbnVtZXJhYmxlcy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHF1ZXVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gMSkgRmlyc3QgZ2V0IG91ciB2YWx1ZXMuLi5cbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSBuZXcgUXVldWUoZW51bWVyYWJsZXMpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWVudW1lcmF0b3IgJiYgcXVldWUudHJ5RGVxdWV1ZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbSh2YWx1ZSk7IC8vIDQpIEtlZXAgZ29pbmcgYW5kIG9uIHRvIHN0ZXAgMi4gIEVsc2UgZmFsbCB0aHJvdWdoIHRvIHlpZWxkQnJlYWsoKS5cbiAgICAgICAgICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvciAmJiBlbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSlcbiAgICAgICAgICAgICAgICAgICAgcXVldWUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGNvbmNhdCguLi5lbnVtZXJhYmxlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXJnZShlbnVtZXJhYmxlcyk7XG4gICAgfVxuICAgIHVuaW9uKHNlY29uZCwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGtleXM7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBrZXlzID0gbmV3IERpY3Rpb25hcnkoY29tcGFyZVNlbGVjdG9yKTsgLy8gQWN0aW5nIGFzIGEgSGFzaFNldC5cbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IgPT09IFZPSUQwKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChmaXJzdEVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGZpcnN0RW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5hZGRCeUtleVZhbHVlKGN1cnJlbnQsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKHNlY29uZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlIChzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHNlY29uZEVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzLmFkZEJ5S2V5VmFsdWUoY3VycmVudCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGluc2VydEF0KGluZGV4LCBvdGhlcikge1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgsICdpbmRleCcpO1xuICAgICAgICBjb25zdCBuID0gaW5kZXg7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgIGxldCBpc0VudW1lcmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShvdGhlcik7XG4gICAgICAgICAgICAgICAgaXNFbnVtZXJhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSBuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzRW51bWVyYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZmlyc3RFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gIWlzRW51bWVyYXRlZFxuICAgICAgICAgICAgICAgICAgICAmJiBzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybihzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBhbHRlcm5hdGVNdWx0aXBsZShzZXF1ZW5jZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBidWZmZXIsIG1vZGUsIGVudW1lcmF0b3IsIGFsdGVybmF0ZUVudW1lcmF0b3I7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBJbnN0ZWFkIG9mIHJlY2FsbGluZyBnZXRFbnVtZXJhdG9yIGV2ZXJ5IHRpbWUsIGp1c3QgcmVzZXQgdGhlIGV4aXN0aW5nIG9uZS5cbiAgICAgICAgICAgICAgICBhbHRlcm5hdGVFbnVtZXJhdG9yID0gbmV3IEFycmF5RW51bWVyYXRvcihFbnVtZXJhYmxlLnRvQXJyYXkoc2VxdWVuY2UpKTsgLy8gRnJlZXplXG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGxldCBoYXNBdExlYXN0T25lID0gZW51bWVyYXRvci5tb3ZlTmV4dCgpO1xuICAgICAgICAgICAgICAgIG1vZGUgPSBoYXNBdExlYXN0T25lXG4gICAgICAgICAgICAgICAgICAgID8gMSAvKiBSZXR1cm4gKi9cbiAgICAgICAgICAgICAgICAgICAgOiAwIC8qIEJyZWFrICovO1xuICAgICAgICAgICAgICAgIGlmIChoYXNBdExlYXN0T25lKVxuICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDAgLyogQnJlYWsgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMiAvKiBTa2lwICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsdGVybmF0ZUVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihhbHRlcm5hdGVFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRlRW51bWVyYXRvci5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDEgLyogUmV0dXJuICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBsYXRlc3QgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgLy8gU2V0IHVwIHRoZSBuZXh0IHJvdW5kLi4uXG4gICAgICAgICAgICAgICAgLy8gSXMgdGhlcmUgYW5vdGhlciBvbmU/ICBTZXQgdGhlIGJ1ZmZlciBhbmQgc2V0dXAgaW5zdHJ1Y3QgZm9yIHRoZSBuZXh0IG9uZSB0byBiZSB0aGUgYWx0ZXJuYXRlLlxuICAgICAgICAgICAgICAgIGxldCBhbm90aGVyID0gZW51bWVyYXRvci5tb3ZlTmV4dCgpO1xuICAgICAgICAgICAgICAgIG1vZGUgPSBhbm90aGVyXG4gICAgICAgICAgICAgICAgICAgID8gMiAvKiBTa2lwICovXG4gICAgICAgICAgICAgICAgICAgIDogMCAvKiBCcmVhayAqLztcbiAgICAgICAgICAgICAgICBpZiAoYW5vdGhlcilcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGxhdGVzdCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChhbHRlcm5hdGVFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdGVFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBhbHRlcm5hdGVFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGFsdGVybmF0ZVNpbmdsZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbHRlcm5hdGVNdWx0aXBsZShFbnVtZXJhYmxlLm1ha2UodmFsdWUpKTtcbiAgICB9XG4gICAgYWx0ZXJuYXRlKC4uLnNlcXVlbmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsdGVybmF0ZU11bHRpcGxlKHNlcXVlbmNlKTtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBFcnJvciBIYW5kbGluZ1xuICAgIGNhdGNoRXJyb3IoaGFuZGxlcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgaW5pdC4uLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluYWxseUFjdGlvbihhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKGVudW1lcmF0b3IuY3VycmVudClcbiAgICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIGJ1ZmZlcihzaXplKSB7XG4gICAgICAgIGlmIChzaXplIDwgMSB8fCAhaXNGaW5pdGUoc2l6ZSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJ1ZmZlciBzaXplLlwiKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoc2l6ZSwgXCJzaXplXCIpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICBsZXQgbGVuO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBpbml0aWFsaXplKHNpemUpO1xuICAgICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGxlbiA8IHNpemUgJiYgZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5W2xlbisrXSA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJyYXkubGVuZ3RoID0gbGVuO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIWxlbiAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKGFycmF5KTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBzaGFyZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBzaGFyZWRFbnVtZXJhdG9yO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaGFyZWRFbnVtZXJhdG9yIHx8IChzaGFyZWRFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCkpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hhcmVkRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICBzaGFyZWRFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHNoYXJlZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICB9LCBfLl9pc0VuZGxlc3MpO1xuICAgIH1cbiAgICBtZW1vaXplKCkge1xuICAgICAgICBsZXQgc291cmNlID0gbmV3IExhenlMaXN0KHRoaXMpO1xuICAgICAgICByZXR1cm4gKG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHNvdXJjZS5nZXRFbnVtZXJhdG9yKCksICgpID0+IHtcbiAgICAgICAgICAgIHNvdXJjZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICBzb3VyY2UgPSBudWxsO1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuLyoqXG4gKiBFbnVtZXJhYmxlPFQ+IGlzIGEgd3JhcHBlciBjbGFzcyB0aGF0IGFsbG93cyBtb3JlIHByaW1pdGl2ZSBlbnVtZXJhYmxlcyB0byBleGhpYml0IExJTlEgYmVoYXZpb3IuXG4gKlxuICogSW4gQyMgRW51bWVyYWJsZTxUPiBpcyBub3QgYW4gaW5zdGFuY2UgYnV0IGhhcyBleHRlbnNpb25zIGZvciBJRW51bWVyYWJsZTxUPi5cbiAqIEluIHRoaXMgY2FzZSwgd2UgdXNlIEVudW1lcmFibGU8VD4gYXMgdGhlIHVuZGVybHlpbmcgY2xhc3MgdGhhdCBpcyBiZWluZyBjaGFpbmVkLlxuICovXG5leHBvcnQgY2xhc3MgTGlucUVudW1lcmFibGUgZXh0ZW5kcyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihlbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyLCBpc0VuZGxlc3MpIHtcbiAgICAgICAgc3VwZXIoZW51bWVyYXRvckZhY3RvcnksIGZpbmFsaXplcik7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGlzRW5kbGVzcztcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIkxpbnFFbnVtZXJhYmxlXCI7XG4gICAgfVxuICAgIC8vIFJldHVybiBhIGRlZmF1bHQgKHVuZmlsdGVyZWQpIGVudW1lcmFibGUuXG4gICAgYXNFbnVtZXJhYmxlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBfLmdldEVudW1lcmF0b3IoKSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gSW5kZXhpbmcvUGFnaW5nIG1ldGhvZHMuXG4gICAgc2tpcFdoaWxlKHByZWRpY2F0ZSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbigoZWxlbWVudCwgaW5kZXgpID0+IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleClcbiAgICAgICAgICAgID8gMiAvKiBTa2lwICovXG4gICAgICAgICAgICA6IDEgLyogUmV0dXJuICovKTtcbiAgICB9XG4gICAgdGFrZVdoaWxlKHByZWRpY2F0ZSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ3ByZWRpY2F0ZScpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbigoZWxlbWVudCwgaW5kZXgpID0+IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleClcbiAgICAgICAgICAgID8gMSAvKiBSZXR1cm4gKi9cbiAgICAgICAgICAgIDogMCAvKiBCcmVhayAqLywgbnVsbCwgbnVsbCAvLyBXZSBkb24ndCBrbm93IHRoZSBzdGF0ZSBpZiBpdCBpcyBlbmRsZXNzIG9yIG5vdC5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgLy8gSXMgbGlrZSB0aGUgaW52ZXJzZSBvZiB0YWtlIFdoaWxlIHdpdGggdGhlIGFiaWxpdHkgdG8gcmV0dXJuIHRoZSB2YWx1ZSBpZGVudGlmaWVkIGJ5IHRoZSBwcmVkaWNhdGUuXG4gICAgdGFrZVVudGlsKHByZWRpY2F0ZSwgaW5jbHVkZVVudGlsVmFsdWUpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdwcmVkaWNhdGUnKTtcbiAgICAgICAgaWYgKCFpbmNsdWRlVW50aWxWYWx1ZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKChlbGVtZW50LCBpbmRleCkgPT4gcHJlZGljYXRlKGVsZW1lbnQsIGluZGV4KVxuICAgICAgICAgICAgICAgID8gMCAvKiBCcmVhayAqL1xuICAgICAgICAgICAgICAgIDogMSAvKiBSZXR1cm4gKi8sIG51bGwsIG51bGwgLy8gV2UgZG9uJ3Qga25vdyB0aGUgc3RhdGUgaWYgaXQgaXMgZW5kbGVzcyBvciBub3QuXG4gICAgICAgICAgICApO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoZm91bmQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAgLyogQnJlYWsgKi87XG4gICAgICAgICAgICBmb3VuZCA9IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleCk7XG4gICAgICAgICAgICByZXR1cm4gMSAvKiBSZXR1cm4gKi87XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgIH0sIG51bGwgLy8gV2UgZG9uJ3Qga25vdyB0aGUgc3RhdGUgaWYgaXQgaXMgZW5kbGVzcyBvciBub3QuXG4gICAgICAgICk7XG4gICAgfVxuICAgIHRyYXZlcnNlQnJlYWR0aEZpcnN0KGNoaWxkcmVuU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzOyAvLyBJcyBlbmRsZXNzIGlzIG5vdCBhZmZpcm1hdGl2ZSBpZiBmYWxzZS5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBuZXN0TGV2ZWwgPSAwO1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciwgbGVuO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgbmVzdExldmVsID0gMDtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltsZW4rK10gPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIG5lc3RMZXZlbCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghbGVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IEVudW1lcmFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mcm9tKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RNYW55KGNoaWxkcmVuU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHQuYW55KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lc3RMZXZlbCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gbmV4dC5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBmb3JFYWNoKGFjdGlvbiwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghYWN0aW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImFjdGlvblwiKTtcbiAgICAgICAgdGhyb3dJZkVuZGxlc3MoXy5pc0VuZGxlc3MpO1xuICAgICAgICAvKlxuICAgICAgICAvLyBJdCBjb3VsZCBiZSBqdXN0IGFzIGVhc3kgdG8gZG8gdGhlIGZvbGxvd2luZzpcbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLmZvckVhY2goXywgYWN0aW9uLCBtYXgpO1xuICAgICAgICAvLyBCdXQgdG8gYmUgbW9yZSBhY3RpdmUgYWJvdXQgY2hlY2tpbmcgZm9yIGRpc3Bvc2FsLCB3ZSB1c2UgdGhpcyBpbnN0ZWFkOlxuICAgICAgICAqL1xuICAgICAgICAvLyBSZXR1cm4gdmFsdWUgb2YgYWN0aW9uIGNhbiBiZSBhbnl0aGluZywgYnV0IGlmIGl0IGlzICg9PT0pIGZhbHNlIHRoZW4gdGhlIGVudW1VdGlsLmZvckVhY2ggd2lsbCBkaXNjb250aW51ZS5cbiAgICAgICAgcmV0dXJuIG1heCA+IDAgPyB1c2luZyhfLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiBlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAvLyBJdCBpcyBwb3NzaWJsZSB0aGF0IHN1YnNlcXVlbnRseSAnYWN0aW9uJyBjb3VsZCBjYXVzZSB0aGUgZW51bWVyYXRpb24gdG8gZGlzcG9zZSwgc28gd2UgaGF2ZSB0byBjaGVjayBlYWNoIHRpbWUuXG4gICAgICAgICAgICB3aGlsZSAobWF4ID4gaSAmJiBfLnRocm93SWZEaXNwb3NlZCgpICYmIGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24oZS5jdXJyZW50LCBpKyspID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfSkgOiAwO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIENvbnZlcnNpb24gTWV0aG9kc1xuICAgIHRvQXJyYXkocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVcbiAgICAgICAgICAgID8gdGhpcy53aGVyZShwcmVkaWNhdGUpLnRvQXJyYXkoKVxuICAgICAgICAgICAgOiB0aGlzLmNvcHlUbyhbXSk7XG4gICAgfVxuICAgIGNvcHlUbyh0YXJnZXQsIGluZGV4ID0gMCwgY291bnQgPSBJbmZpbml0eSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXRhcmdldClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJ0YXJnZXRcIik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihpbmRleCk7XG4gICAgICAgIC8vIElmIG5vdCBleHBvc2luZyBhbiBhY3Rpb24gdGhhdCBjb3VsZCBjYXVzZSBkaXNwb3NlLCB0aGVuIHVzZSBlbnVtVXRpbC5mb3JFYWNoIHV0aWxpdHkgaW5zdGVhZC5cbiAgICAgICAgZW51bVV0aWwuZm9yRWFjaCh0aGlzLCAoeCwgaSkgPT4ge1xuICAgICAgICAgICAgdGFyZ2V0W2kgKyBpbmRleF0gPSB4O1xuICAgICAgICB9LCBjb3VudCk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIHRvTG9va3VwKGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHksIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBkaWN0ID0gbmV3IERpY3Rpb25hcnkoY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5ID0ga2V5U2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGVsZW1lbnRTZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgICAgIGxldCBhcnJheSA9IGRpY3QuZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgICAgIGlmIChhcnJheSAhPT0gVk9JRDApXG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkaWN0LmFkZEJ5S2V5VmFsdWUoa2V5LCBbZWxlbWVudF0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBMb29rdXAoZGljdCk7XG4gICAgfVxuICAgIHRvTWFwKGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgb2JqW2tleVNlbGVjdG9yKHgsIGkpXSA9IGVsZW1lbnRTZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIHRvRGljdGlvbmFyeShrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZGljdCA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4gZGljdC5hZGRCeUtleVZhbHVlKGtleVNlbGVjdG9yKHgsIGkpLCBlbGVtZW50U2VsZWN0b3IoeCwgaSkpKTtcbiAgICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgfVxuICAgIHRvSm9pbmVkU3RyaW5nKHNlcGFyYXRvciA9IFwiXCIsIHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICAuc2VsZWN0KHNlbGVjdG9yKVxuICAgICAgICAgICAgLnRvQXJyYXkoKVxuICAgICAgICAgICAgLmpvaW4oc2VwYXJhdG9yKTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIHRha2VFeGNlcHRMYXN0KGNvdW50ID0gMSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICBjb25zdCBjID0gY291bnQ7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgcTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBxID0gbmV3IFF1ZXVlKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBuZXh0IG9uZSB0byB0aGUgcXVldWUuXG4gICAgICAgICAgICAgICAgICAgIHEuZW5xdWV1ZShlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBEaWQgd2UgcmVhY2ggb3VyIHF1b3RhP1xuICAgICAgICAgICAgICAgICAgICBpZiAocS5jb3VudCA+IGMpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPa2F5IHRoZW4sIHN0YXJ0IHJldHVybmluZyByZXN1bHRzLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocS5kZXF1ZXVlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGlmIChxKVxuICAgICAgICAgICAgICAgICAgICBxLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBxID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2tpcFRvTGFzdChjb3VudCkge1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgcmV0dXJuIF87XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICAvLyBUaGlzIHNldHMgdXAgdGhlIHF1ZXJ5IHNvIG5vdGhpbmcgaXMgZG9uZSB1bnRpbCBtb3ZlIG5leHQgaXMgY2FsbGVkLlxuICAgICAgICByZXR1cm4gXy5yZXZlcnNlKClcbiAgICAgICAgICAgIC50YWtlKGNvdW50KVxuICAgICAgICAgICAgLnJldmVyc2UoKTtcbiAgICB9XG4gICAgLy8gVG8gaGVscCB3aXRoIHR5cGUgZ3VhcmRpbmcuXG4gICAgc2VsZWN0KHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBtYXAoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnNlbGVjdChzZWxlY3Rvcik7XG4gICAgfVxuICAgIHNlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKTtcbiAgICB9XG4gICAgY2hvb3NlKHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChzZWxlY3RvciwgaXNOb3ROdWxsT3JVbmRlZmluZWQpO1xuICAgIH1cbiAgICByZXZlcnNlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKF8uX2lzRW5kbGVzcyk7IC8vIENhbm5vdCByZXZlcnNlIGFuIGVuZGxlc3MgY29sbGVjdGlvbi4uLlxuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF8udG9BcnJheSgpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiAhIWluZGV4ICYmIHlpZWxkZXIueWllbGRSZXR1cm4oYnVmZmVyWy0taW5kZXhdKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNodWZmbGUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhyb3dJZkVuZGxlc3MoXy5faXNFbmRsZXNzKTsgLy8gQ2Fubm90IHNodWZmbGUgYW4gZW5kbGVzcyBjb2xsZWN0aW9uLi4uXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJ1ZmZlcjtcbiAgICAgICAgICAgIGxldCBjYXBhY2l0eTtcbiAgICAgICAgICAgIGxldCBsZW47XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF8udG9BcnJheSgpO1xuICAgICAgICAgICAgICAgIGNhcGFjaXR5ID0gbGVuID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQXZvaWQgdXNpbmcgbWFqb3IgYXJyYXkgb3BlcmF0aW9ucyBsaWtlIC5zbGljZSgpO1xuICAgICAgICAgICAgICAgIGlmICghbGVuKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSW5kZXggPSBSYW5kb20uaW50ZWdlcihsZW4pO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZFZhbHVlID0gYnVmZmVyW3NlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgICAgIGJ1ZmZlcltzZWxlY3RlZEluZGV4XSA9IGJ1ZmZlclstLWxlbl07IC8vIFRha2UgdGhlIGxhc3Qgb25lIGFuZCBwdXQgaXQgaGVyZS5cbiAgICAgICAgICAgICAgICBidWZmZXJbbGVuXSA9IE5VTEw7IC8vIGNsZWFyIHBvc3NpYmxlIHJlZmVyZW5jZS5cbiAgICAgICAgICAgICAgICBpZiAobGVuICUgMzIgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihzZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb3VudChwcmVkaWNhdGUpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5mb3JFYWNoKHByZWRpY2F0ZVxuICAgICAgICAgICAgPyAoeCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoeCwgaSkpXG4gICAgICAgICAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG4gICAgLy8gQWtpbiB0byAnLmV2ZXJ5JyBvbiBhbiBhcnJheS5cbiAgICBhbGwocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInByZWRpY2F0ZVwiKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFwcmVkaWNhdGUoeCwgaSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvLyAnZXZlcnknIGhhcyBiZWVuIGFkZGVkIGhlcmUgZm9yIHBhcml0eS9jb21wYXRpYmlsaXR5IHdpdGggYW4gYXJyYXkuXG4gICAgZXZlcnkocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbChwcmVkaWNhdGUpO1xuICAgIH1cbiAgICAvLyBBa2luIHRvICcuc29tZScgb24gYW4gYXJyYXkuXG4gICAgYW55KHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5hbnkoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAvLyBTcGxpdHRpbmcgdGhlIGZvckVhY2ggdXAgdGhpcyB3YXkgcmVkdWNlcyBpdGVyYXRpdmUgcHJvY2Vzc2luZy5cbiAgICAgICAgLy8gZm9yRWFjaCBoYW5kbGVzIHRoZSBnZW5lcmF0aW9uIGFuZCBkaXNwb3NhbCBvZiB0aGUgZW51bWVyYXRvci5cbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICByZXN1bHQgPSBwcmVkaWNhdGUoeCwgaSk7IC8vIGZhbHNlID0gbm90IGZvdW5kIGFuZCB0aGVyZWZvcmUgaXQgc2hvdWxkIGNvbnRpbnVlLiAgdHJ1ZSA9IGZvdW5kIGFuZCBicmVhaztcbiAgICAgICAgICAgIHJldHVybiAhcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gJ3NvbWUnIGhhcyBiZWVuIGFkZGVkIGhlcmUgZm9yIHBhcml0eS9jb21wYXRpYmlsaXR5IHdpdGggYW4gYXJyYXkuXG4gICAgc29tZShwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW55KHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIGNvbnRhaW5zKHZhbHVlLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgcyA9IGNvbXBhcmVTZWxlY3Rvcih2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbnkodiA9PiBhcmVFcXVhbFZhbHVlcyhjb21wYXJlU2VsZWN0b3IodiksIHMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hbnkodiA9PiBhcmVFcXVhbFZhbHVlcyh2LCB2YWx1ZSkpO1xuICAgIH1cbiAgICAvLyBPcmlnaW5hbGx5IGhhcyBhbiBvdmVybG9hZCBmb3IgYSBwcmVkaWNhdGUsXG4gICAgLy8gYnV0IHRoYXQncyBhIGJhZCBpZGVhIHNpbmNlIHRoaXMgY291bGQgYmUgYW4gZW51bWVyYXRpb24gb2YgZnVuY3Rpb25zIGFuZCB0aGVyZWZvcmUgZmFpbCB0aGUgaW50ZW50LlxuICAgIC8vIEJldHRlciB0byBjaGFpbiBhIHdoZXJlIHN0YXRlbWVudCBmaXJzdCB0byBiZSBtb3JlIGV4cGxpY2l0LlxuICAgIGluZGV4T2YodmFsdWUsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBsZXQgZm91bmQgPSAtMTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGNvbXBhcmVTZWxlY3RvclxuICAgICAgICAgICAgPyAoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlU2VsZWN0b3IoZWxlbWVudCwgaSksIGNvbXBhcmVTZWxlY3Rvcih2YWx1ZSwgaSksIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBXaHk/ICBCZWNhdXNlIE5hTiBkb2Vzbid0IGVxdWFsIE5hTi4gOlBcbiAgICAgICAgICAgICAgICBpZiAoYXJlRXF1YWxWYWx1ZXMoZWxlbWVudCwgdmFsdWUsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuICAgIGxhc3RJbmRleE9mKHZhbHVlLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IC0xO1xuICAgICAgICB0aGlzLmZvckVhY2goY29tcGFyZVNlbGVjdG9yXG4gICAgICAgICAgICA/IChlbGVtZW50LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZUVxdWFsVmFsdWVzKGNvbXBhcmVTZWxlY3RvcihlbGVtZW50LCBpKSwgY29tcGFyZVNlbGVjdG9yKHZhbHVlLCBpKSwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiAoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhlbGVtZW50LCB2YWx1ZSwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaW50ZXJzZWN0KHNlY29uZCwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlY29uZClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzZWNvbmRcIik7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uaXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGtleXM7XG4gICAgICAgICAgICBsZXQgb3V0cztcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghc2Vjb25kKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAga2V5cyA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgb3V0cyA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgZW51bVV0aWwuZm9yRWFjaChzZWNvbmQsIGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMuYWRkQnlLZXlWYWx1ZShrZXksIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW91dHMuY29udGFpbnNLZXkoY3VycmVudCkgJiYga2V5cy5jb250YWluc0tleShjdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cy5hZGRCeUtleVZhbHVlKGN1cnJlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5cylcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKG91dHMpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGtleXMgPSBOVUxMO1xuICAgICAgICAgICAgICAgIG91dHMgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgc2Vjb25kID0gTlVMTDtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgc2VxdWVuY2VFcXVhbChzZWNvbmQsIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbFZhbHVlcykge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUxID0+IHVzaW5nKGVudW1VdGlsLmZyb20oc2Vjb25kKSwgZTIgPT4ge1xuICAgICAgICAgICAgLy8gaWYgYm90aCBhcmUgZW5kbGVzcywgdGhpcyB3aWxsIG5ldmVyIGV2YWx1YXRlLlxuICAgICAgICAgICAgdGhyb3dJZkVuZGxlc3MoZTEuaXNFbmRsZXNzICYmIGUyLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICB3aGlsZSAoZTEubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmICghZTIubW92ZU5leHQoKSB8fCAhZXF1YWxpdHlDb21wYXJlcihlMS5jdXJyZW50LCBlMi5jdXJyZW50KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICFlMi5tb3ZlTmV4dCgpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIG9mVHlwZSh0eXBlKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBzdXBlci5vZlR5cGUodHlwZSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gT3JkZXJpbmcgTWV0aG9kc1xuICAgIG9yZGVyQnkoa2V5U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLCBrZXlTZWxlY3RvciwgMSAvKiBBc2NlbmRpbmcgKi8pO1xuICAgIH1cbiAgICBvcmRlclVzaW5nKGNvbXBhcmlzb24pIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLCBudWxsLCAxIC8qIEFzY2VuZGluZyAqLywgbnVsbCwgY29tcGFyaXNvbik7XG4gICAgfVxuICAgIG9yZGVyVXNpbmdSZXZlcnNlZChjb21wYXJpc29uKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywgbnVsbCwgLTEgLyogRGVzY2VuZGluZyAqLywgbnVsbCwgY29tcGFyaXNvbik7XG4gICAgfVxuICAgIG9yZGVyQnlEZXNjZW5kaW5nKGtleVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywga2V5U2VsZWN0b3IsIC0xIC8qIERlc2NlbmRpbmcgKi8pO1xuICAgIH1cbiAgICAvKlxuICAgICAgICAgd2VpZ2h0ZWRTYW1wbGUod2VpZ2h0U2VsZWN0b3IpIHtcbiAgICAgICAgIHdlaWdodFNlbGVjdG9yID0gVXRpbHMuY3JlYXRlTGFtYmRhKHdlaWdodFNlbGVjdG9yKTtcbiAgICAgICAgIHZhciBzb3VyY2UgPSB0aGlzO1xuICAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZTxUPigoKSA9PiB7XG4gICAgICAgICB2YXIgc29ydGVkQnlCb3VuZDtcbiAgICAgICAgIHZhciB0b3RhbFdlaWdodCA9IDA7XG4gICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlPFQ+KFxuICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgc29ydGVkQnlCb3VuZCA9IHNvdXJjZVxuICAgICAgICAgLmNob29zZShmdW5jdGlvbiAoeCkge1xuICAgICAgICAgdmFyIHdlaWdodCA9IHdlaWdodFNlbGVjdG9yKHgpO1xuICAgICAgICAgaWYgKHdlaWdodCA8PSAwKSByZXR1cm4gbnVsbDsgLy8gaWdub3JlIDBcbiAgICAgICAgIHRvdGFsV2VpZ2h0ICs9IHdlaWdodDtcbiAgICAgICAgIHJldHVybiB7IHZhbHVlOiB4LCBib3VuZDogdG90YWxXZWlnaHQgfVxuICAgICAgICAgfSlcbiAgICAgICAgIC50b0FycmF5KCk7XG4gICAgICAgICB9LFxuICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgaWYgKHNvcnRlZEJ5Qm91bmQubGVuZ3RoID4gMCkge1xuICAgICAgICAgdmFyIGRyYXcgPSAoTWF0aC5yYW5kb20oKSAqIHRvdGFsV2VpZ2h0KSArIDE7XG4gICAgICAgICB2YXIgbG93ZXIgPSAtMTtcbiAgICAgICAgIHZhciB1cHBlciA9IHNvcnRlZEJ5Qm91bmQubGVuZ3RoO1xuICAgICAgICAgd2hpbGUgKHVwcGVyIC0gbG93ZXIgPiAxKSB7XG4gICAgICAgICB2YXIgaW5kZXggPSAoKGxvd2VyICsgdXBwZXIpIC8gMik7XG4gICAgICAgICBpZiAoc29ydGVkQnlCb3VuZFtpbmRleF0uYm91bmQgPj0gZHJhdykge1xuICAgICAgICAgdXBwZXIgPSBpbmRleDtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2Uge1xuICAgICAgICAgbG93ZXIgPSBpbmRleDtcbiAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICAgIHJldHVybiAoPGFueT50aGlzKS55aWVsZFJldHVybihzb3J0ZWRCeUJvdW5kW3VwcGVyXS52YWx1ZSk7XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykueWllbGRCcmVhaygpO1xuICAgICAgICAgfSxcbiAgICAgICAgIEZ1bmN0aW9ucy5CbGFuayk7XG4gICAgICAgICB9KTtcbiAgICAgICAgIH1cbiAgICAgICAgICovXG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIGJ1ZmZlcihzaXplKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5idWZmZXIoc2l6ZSk7XG4gICAgfVxuICAgIGdyb3VwQnkoa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3RvciwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGlmICghZWxlbWVudFNlbGVjdG9yKVxuICAgICAgICAgICAgZWxlbWVudFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5OyAvLyBBbGxvdyBmb3IgJ251bGwnIGFuZCBub3QganVzdCB1bmRlZmluZWQuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gdGhpc1xuICAgICAgICAgICAgLnRvTG9va3VwKGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIGNvbXBhcmVTZWxlY3RvcilcbiAgICAgICAgICAgIC5nZXRFbnVtZXJhdG9yKCkpO1xuICAgIH1cbiAgICBwYXJ0aXRpb25CeShrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciA9IChrZXksIGVsZW1lbnRzKSA9PiBuZXcgR3JvdXBpbmcoa2V5LCBlbGVtZW50cyksIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFlbGVtZW50U2VsZWN0b3IpXG4gICAgICAgICAgICBlbGVtZW50U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHk7IC8vIEFsbG93IGZvciAnbnVsbCcgYW5kIG5vdCBqdXN0IHVuZGVmaW5lZC5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBrZXk7XG4gICAgICAgICAgICBsZXQgY29tcGFyZUtleTtcbiAgICAgICAgICAgIGxldCBncm91cDtcbiAgICAgICAgICAgIGxldCBsZW47XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWVsZW1lbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleVNlbGVjdG9yKHYpO1xuICAgICAgICAgICAgICAgICAgICBjb21wYXJlS2V5ID0gY29tcGFyZVNlbGVjdG9yKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gW2VsZW1lbnRTZWxlY3Rvcih2KV07XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWVsZW1lbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgaWYgKCFncm91cClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgIGxldCBoYXNOZXh0LCBjO1xuICAgICAgICAgICAgICAgIHdoaWxlICgoaGFzTmV4dCA9IGVudW1lcmF0b3IubW92ZU5leHQoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYyA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZUVxdWFsVmFsdWVzKGNvbXBhcmVLZXksIGNvbXBhcmVTZWxlY3RvcihrZXlTZWxlY3RvcihjKSkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBbbGVuKytdID0gZWxlbWVudFNlbGVjdG9yKGMpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHJlc3VsdFNlbGVjdG9yKGtleSwgZ3JvdXApO1xuICAgICAgICAgICAgICAgIGlmIChoYXNOZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleVNlbGVjdG9yKGMpO1xuICAgICAgICAgICAgICAgICAgICBjb21wYXJlS2V5ID0gY29tcGFyZVNlbGVjdG9yKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gW2VsZW1lbnRTZWxlY3RvcihjKV07XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50U2VsZWN0b3IgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmxhdHRlbigpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmZsYXR0ZW4oKTtcbiAgICB9XG4gICAgcGFpcndpc2Uoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnBhaXJ3aXNlKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgYWdncmVnYXRlKHJlZHVjdGlvbiwgaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIGlmIChpbml0aWFsVmFsdWUgPT0gVk9JRDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSBpXG4gICAgICAgICAgICAgICAgICAgID8gcmVkdWN0aW9uKGluaXRpYWxWYWx1ZSwgdmFsdWUsIGkpXG4gICAgICAgICAgICAgICAgICAgIDogdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSByZWR1Y3Rpb24oaW5pdGlhbFZhbHVlLCB2YWx1ZSwgaSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5pdGlhbFZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm92aWRlZCBhcyBhbiBhbmFsb2cgZm9yIGFycmF5LnJlZHVjZS4gIFNpbXBseSBhIHNob3J0Y3V0IGZvciBhZ2dyZWdhdGUuXG4gICAgICogQHBhcmFtIHJlZHVjdGlvblxuICAgICAqIEBwYXJhbSBpbml0aWFsVmFsdWVcbiAgICAgKi9cbiAgICByZWR1Y2UocmVkdWN0aW9uLCBpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKHJlZHVjdGlvbiwgaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgYXZlcmFnZShzZWxlY3RvciA9IFR5cGUubnVtYmVyT3JOYU4pIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3Qgc3VtID0gdGhpcy5zdW0oKGUsIGkpID0+IHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoZSwgaSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKGlzTmFOKHN1bSkgfHwgIWNvdW50KVxuICAgICAgICAgICAgPyBOYU5cbiAgICAgICAgICAgIDogKHN1bSAvIGNvdW50KTtcbiAgICB9XG4gICAgLy8gSWYgdXNpbmcgbnVtYmVycywgaXQgbWF5IGJlIHVzZWZ1bCB0byBjYWxsIC50YWtlVW50aWwodj0+dj09SW5maW5pdHksdHJ1ZSkgYmVmb3JlIGNhbGxpbmcgbWF4LiBTZWUgc3RhdGljIHZlcnNpb25zIGZvciBudW1iZXJzLlxuICAgIG1heCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKEZ1bmN0aW9ucy5HcmVhdGVyKTtcbiAgICB9XG4gICAgbWluKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUoRnVuY3Rpb25zLkxlc3Nlcik7XG4gICAgfVxuICAgIG1heEJ5KGtleVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZSgoYSwgYikgPT4gKGtleVNlbGVjdG9yKGEpID4ga2V5U2VsZWN0b3IoYikpID8gYSA6IGIpO1xuICAgIH1cbiAgICBtaW5CeShrZXlTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUoKGEsIGIpID0+IChrZXlTZWxlY3RvcihhKSA8IGtleVNlbGVjdG9yKGIpKSA/IGEgOiBiKTtcbiAgICB9XG4gICAgLy8gQWRkaXRpb24uLi4gIE9ubHkgd29ya3Mgd2l0aCBudW1lcmljYWwgZW51bWVyYXRpb25zLlxuICAgIHN1bShzZWxlY3RvciA9IFR5cGUubnVtYmVyT3JOYU4pIHtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIGZvciBpbmZpbml0eSBtYXRoIHRoYXQgZG9lc24ndCBkZXN0cm95IHRoZSBvdGhlciB2YWx1ZXMuXG4gICAgICAgIGxldCBzdW1JbmZpbml0ZSA9IDA7IC8vIE5lZWRzIG1vcmUgaW52ZXN0aWdhdGlvbiBzaW5jZSB3ZSBhcmUgcmVhbGx5IHRyeWluZyB0byByZXRhaW4gc2lnbnMuXG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgc3VtID0gTmFOO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0Zpbml0ZSh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgc3VtICs9IHZhbHVlO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN1bUluZmluaXRlICs9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID4gMCA/ICgrMSkgOiAoLTEpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGlzTmFOKHN1bSkgPyBOYU4gOiAoc3VtSW5maW5pdGUgPyAoc3VtSW5maW5pdGUgKiBJbmZpbml0eSkgOiBzdW0pO1xuICAgIH1cbiAgICAvLyBNdWx0aXBsaWNhdGlvbi4uLlxuICAgIHByb2R1Y3Qoc2VsZWN0b3IgPSBUeXBlLm51bWJlck9yTmFOKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAxLCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBleGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gTmFOO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMDsgLy8gTXVsdGlwbHlpbmcgYnkgemVybyB3aWxsIGFsd2F5cyBlbmQgaW4gemVyby5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNdWx0aXBsaWNhdGlvbiBjYW4gbmV2ZXIgcmVjb3ZlciBmcm9tIGluZmluaXR5IGFuZCBzaW1wbHkgbXVzdCByZXRhaW4gc2lnbnMuXG4gICAgICAgICAgICAvLyBZb3UgY291bGQgY2FuY2VsIG91dCBpbmZpbml0eSB3aXRoIDEvaW5maW5pdHkgYnV0IG5vIGF2YWlsYWJsZSByZXByZXNlbnRhdGlvbiBleGlzdHMuXG4gICAgICAgICAgICByZXN1bHQgKj0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKGV4aXN0cyAmJiBpc05hTihyZXN1bHQpKSA/IE5hTiA6IHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGFrZXMgdGhlIGZpcnN0IG51bWJlciBhbmQgZGl2aWRlcyBpdCBieSBhbGwgZm9sbG93aW5nLlxuICAgICAqIEBwYXJhbSBzZWxlY3RvclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgcXVvdGllbnQoc2VsZWN0b3IgPSBUeXBlLm51bWJlck9yTmFOKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGxldCByZXN1bHQgPSBOYU47XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSAwIHx8ICFpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gTmFOO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCAvPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjb3VudCA9PT0gMSlcbiAgICAgICAgICAgIHJlc3VsdCA9IE5hTjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIC8vICNyZWdpb24gU2luZ2xlIFZhbHVlIFJldHVybi4uLlxuICAgIGxhc3QoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgdmFsdWUgPSBWT0lEMDtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIF8uZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbHVlID0geDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZm91bmQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJsYXN0Ok5vIGVsZW1lbnQgc2F0aXNmaWVzIHRoZSBjb25kaXRpb24uXCIpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGxhc3RPckRlZmF1bHQoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgdmFsdWUgPSBWT0lEMDtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIF8uZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbHVlID0geDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoIWZvdW5kKSA/IGRlZmF1bHRWYWx1ZSA6IHZhbHVlO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgbWVtb2l6ZSgpIHtcbiAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBMYXp5TGlzdCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIChuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gc291cmNlLmdldEVudW1lcmF0b3IoKSwgKCkgPT4ge1xuICAgICAgICAgICAgc291cmNlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHNvdXJjZSA9IG51bGw7XG4gICAgICAgIH0sIHRoaXMuaXNFbmRsZXNzKSk7XG4gICAgfVxuICAgIHRocm93V2hlbkVtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbihSRVRVUk4sIG51bGwsIHRoaXMuaXNFbmRsZXNzLCBjb3VudCA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvdW50KVxuICAgICAgICAgICAgICAgIHRocm93IFwiQ29sbGVjdGlvbiBpcyBlbXB0eS5cIjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8gUHJvdmlkZWQgZm9yIHR5cGUgZ3VhcmRpbmcuXG5leHBvcnQgY2xhc3MgRmluaXRlRW51bWVyYWJsZSBleHRlbmRzIExpbnFFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihlbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyKSB7XG4gICAgICAgIHN1cGVyKGVudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIkZpbml0ZUVudW1lcmFibGVcIjtcbiAgICB9XG59XG5jbGFzcyBBcnJheUVudW1lcmFibGUgZXh0ZW5kcyBGaW5pdGVFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICAgICAgc3VwZXIoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhdG9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZChcIlRoZSB1bmRlcmx5aW5nIEFycmF5RW51bWVyYWJsZSB3YXMgZGlzcG9zZWQuXCIsIFwiQXJyYXlFbnVtZXJhdG9yXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLl9zb3VyY2U7IC8vIFNob3VsZCBuZXZlciBiZSBudWxsLCBidXQgQXJyYXlFbnVtZXJhYmxlIGlmIG5vdCBkaXNwb3NlZCBzaW1wbHkgdHJlYXRzIG51bGwgYXMgZW1wdHkgYXJyYXkuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiQXJyYXlFbnVtZXJhYmxlXCI7XG4gICAgICAgIF8uX3NvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9zb3VyY2UgPSBOVUxMO1xuICAgIH1cbiAgICBnZXQgc291cmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlO1xuICAgIH1cbiAgICB0b0FycmF5KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLnRvQXJyYXkoXy5fc291cmNlKTtcbiAgICB9XG4gICAgYXNFbnVtZXJhYmxlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUVudW1lcmFibGUodGhpcy5fc291cmNlKTtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gZW51bVV0aWwuZm9yRWFjaChfLl9zb3VyY2UsIGFjdGlvbiwgbWF4KTtcbiAgICB9XG4gICAgLy8gVGhlc2UgbWV0aG9kcyBzaG91bGQgQUxXQVlTIGNoZWNrIGZvciBhcnJheSBsZW5ndGggYmVmb3JlIGF0dGVtcHRpbmcgYW55dGhpbmcuXG4gICAgYW55KHByZWRpY2F0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlO1xuICAgICAgICBsZXQgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuICEhbGVuICYmICghcHJlZGljYXRlIHx8IHN1cGVyLmFueShwcmVkaWNhdGUpKTtcbiAgICB9XG4gICAgY291bnQocHJlZGljYXRlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBfLl9zb3VyY2UsIGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBsZW4gJiYgKHByZWRpY2F0ZSA/IHN1cGVyLmNvdW50KHByZWRpY2F0ZSkgOiBsZW4pO1xuICAgIH1cbiAgICBlbGVtZW50QXRPckRlZmF1bHQoaW5kZXgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4LCAnaW5kZXgnKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlO1xuICAgICAgICByZXR1cm4gaW5kZXggPCBzb3VyY2UubGVuZ3RoXG4gICAgICAgICAgICA/IHNvdXJjZVtpbmRleF1cbiAgICAgICAgICAgIDogZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgICBsYXN0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlLCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICByZXR1cm4gKGxlbilcbiAgICAgICAgICAgID8gc291cmNlW2xlbiAtIDFdXG4gICAgICAgICAgICA6IHN1cGVyLmxhc3QoKTtcbiAgICB9XG4gICAgbGFzdE9yRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZSwgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgICAgICAgPyBzb3VyY2VbbGVuIC0gMV1cbiAgICAgICAgICAgIDogZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgICBza2lwKGNvdW50KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIF87XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gbmV3IEFycmF5RW51bWVyYXRvcigoKSA9PiBfLl9zb3VyY2UsIGNvdW50KSk7XG4gICAgfVxuICAgIHRha2VFeGNlcHRMYXN0KGNvdW50ID0gMSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIF8udGFrZShfLl9zb3VyY2UubGVuZ3RoIC0gY291bnQpO1xuICAgIH1cbiAgICBza2lwVG9MYXN0KGNvdW50KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShjb3VudCkpXG4gICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgY29uc3QgbGVuID0gXy5fc291cmNlXG4gICAgICAgICAgICA/IF8uX3NvdXJjZS5sZW5ndGhcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgcmV0dXJuIF8uc2tpcChsZW4gLSBjb3VudCk7XG4gICAgfVxuICAgIHJldmVyc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmRleEVudW1lcmF0b3IoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzID0gXy5fc291cmNlO1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCB8fCAhcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBzLFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiAocy5sZW5ndGggLSAxKSxcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogLTFcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1lbW9pemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzRW51bWVyYWJsZSgpO1xuICAgIH1cbiAgICBzZXF1ZW5jZUVxdWFsKHNlY29uZCwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsVmFsdWVzKSB7XG4gICAgICAgIGlmIChUeXBlLmlzQXJyYXlMaWtlKHNlY29uZCkpXG4gICAgICAgICAgICByZXR1cm4gQXJyYXlzLmFyZUVxdWFsKHRoaXMuc291cmNlLCBzZWNvbmQsIHRydWUsIGVxdWFsaXR5Q29tcGFyZXIpO1xuICAgICAgICBpZiAoc2Vjb25kIGluc3RhbmNlb2YgQXJyYXlFbnVtZXJhYmxlKVxuICAgICAgICAgICAgcmV0dXJuIHNlY29uZC5zZXF1ZW5jZUVxdWFsKHRoaXMuc291cmNlLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnNlcXVlbmNlRXF1YWwoc2Vjb25kLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICB9XG4gICAgdG9Kb2luZWRTdHJpbmcoc2VwYXJhdG9yID0gXCJcIiwgc2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuX3NvdXJjZTtcbiAgICAgICAgcmV0dXJuICFzZWxlY3RvciAmJiAocykgaW5zdGFuY2VvZiAoQXJyYXkpXG4gICAgICAgICAgICA/IHMuam9pbihzZXBhcmF0b3IpXG4gICAgICAgICAgICA6IHN1cGVyLnRvSm9pbmVkU3RyaW5nKHNlcGFyYXRvciwgc2VsZWN0b3IpO1xuICAgIH1cbn1cbmNsYXNzIEdyb3VwaW5nIGV4dGVuZHMgQXJyYXlFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihfZ3JvdXBLZXksIGVsZW1lbnRzKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRzKTtcbiAgICAgICAgdGhpcy5fZ3JvdXBLZXkgPSBfZ3JvdXBLZXk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJHcm91cGluZ1wiO1xuICAgIH1cbiAgICBnZXQga2V5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3JvdXBLZXk7XG4gICAgfVxufVxuY2xhc3MgTG9va3VwIHtcbiAgICBjb25zdHJ1Y3RvcihfZGljdGlvbmFyeSkge1xuICAgICAgICB0aGlzLl9kaWN0aW9uYXJ5ID0gX2RpY3Rpb25hcnk7XG4gICAgfVxuICAgIGdldCBjb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpY3Rpb25hcnkuY291bnQ7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpY3Rpb25hcnkuZ2V0VmFsdWUoa2V5KSB8fCBudWxsO1xuICAgIH1cbiAgICBjb250YWlucyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpY3Rpb25hcnkuY29udGFpbnNLZXkoa2V5KTtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLl9kaWN0aW9uYXJ5LmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIGlmICghZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4obmV3IEdyb3VwaW5nKGN1cnJlbnQua2V5LCBjdXJyZW50LnZhbHVlKSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmNsYXNzIE9yZGVyZWRFbnVtZXJhYmxlIGV4dGVuZHMgRmluaXRlRW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlLCBrZXlTZWxlY3Rvciwgb3JkZXIsIHBhcmVudCwgY29tcGFyZXIgPSBjb21wYXJlVmFsdWVzKSB7XG4gICAgICAgIHN1cGVyKE5VTEwpO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgdGhpcy5rZXlTZWxlY3RvciA9IGtleVNlbGVjdG9yO1xuICAgICAgICB0aGlzLm9yZGVyID0gb3JkZXI7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLmNvbXBhcmVyID0gY29tcGFyZXI7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKHNvdXJjZSAmJiBzb3VyY2UuaXNFbmRsZXNzKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIk9yZGVyZWRFbnVtZXJhYmxlXCI7XG4gICAgfVxuICAgIGNyZWF0ZU9yZGVyZWRFbnVtZXJhYmxlKGtleVNlbGVjdG9yLCBvcmRlcikge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMuc291cmNlLCBrZXlTZWxlY3Rvciwgb3JkZXIsIHRoaXMpO1xuICAgIH1cbiAgICB0aGVuQnkoa2V5U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlT3JkZXJlZEVudW1lcmFibGUoa2V5U2VsZWN0b3IsIDEgLyogQXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgdGhlblVzaW5nKGNvbXBhcmlzb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLnNvdXJjZSwgbnVsbCwgMSAvKiBBc2NlbmRpbmcgKi8sIHRoaXMsIGNvbXBhcmlzb24pO1xuICAgIH1cbiAgICB0aGVuQnlEZXNjZW5kaW5nKGtleVNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU9yZGVyZWRFbnVtZXJhYmxlKGtleVNlbGVjdG9yLCAtMSAvKiBEZXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgdGhlblVzaW5nUmV2ZXJzZWQoY29tcGFyaXNvbikge1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMuc291cmNlLCBudWxsLCAtMSAvKiBEZXNjZW5kaW5nICovLCB0aGlzLCBjb21wYXJpc29uKTtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgIGxldCBpbmRleGVzO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICBidWZmZXIgPSBFbnVtZXJhYmxlLnRvQXJyYXkoXy5zb3VyY2UpO1xuICAgICAgICAgICAgaW5kZXhlcyA9IGNyZWF0ZVNvcnRDb250ZXh0KF8pXG4gICAgICAgICAgICAgICAgLmdlbmVyYXRlU29ydGVkSW5kZXhlcyhidWZmZXIpO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHJldHVybiAoaW5kZXggPCBpbmRleGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oYnVmZmVyW2luZGV4ZXNbaW5kZXgrK11dKVxuICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChidWZmZXIpXG4gICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBidWZmZXIgPSBOVUxMO1xuICAgICAgICAgICAgaWYgKGluZGV4ZXMpXG4gICAgICAgICAgICAgICAgaW5kZXhlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgaW5kZXhlcyA9IE5VTEw7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgXy5zb3VyY2UgPSBOVUxMO1xuICAgICAgICBfLmtleVNlbGVjdG9yID0gTlVMTDtcbiAgICAgICAgXy5vcmRlciA9IE5VTEw7XG4gICAgICAgIF8ucGFyZW50ID0gTlVMTDtcbiAgICB9XG59XG4vLyBBIHByaXZhdGUgc3RhdGljIGhlbHBlciBmb3IgdGhlIHdlYXZlIGZ1bmN0aW9uLlxuZnVuY3Rpb24gbmV4dEVudW1lcmF0b3IocXVldWUsIGUpIHtcbiAgICBpZiAoZSkge1xuICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBxdWV1ZS5lbnF1ZXVlKGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGUpXG4gICAgICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZTtcbn1cbi8qKlxuICogUmVjdXJzaXZlbHkgYnVpbGRzIGEgU29ydENvbnRleHQgY2hhaW4uXG4gKiBAcGFyYW0gb3JkZXJlZEVudW1lcmFibGVcbiAqIEBwYXJhbSBjdXJyZW50Q29udGV4dFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlU29ydENvbnRleHQob3JkZXJlZEVudW1lcmFibGUsIGN1cnJlbnRDb250ZXh0ID0gbnVsbCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgS2V5U29ydGVkQ29udGV4dChjdXJyZW50Q29udGV4dCwgb3JkZXJlZEVudW1lcmFibGUua2V5U2VsZWN0b3IsIG9yZGVyZWRFbnVtZXJhYmxlLm9yZGVyLCBvcmRlcmVkRW51bWVyYWJsZS5jb21wYXJlcik7XG4gICAgaWYgKG9yZGVyZWRFbnVtZXJhYmxlLnBhcmVudClcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVNvcnRDb250ZXh0KG9yZGVyZWRFbnVtZXJhYmxlLnBhcmVudCwgY29udGV4dCk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZnVuY3Rpb24gdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKSB7XG4gICAgaWYgKGRpc3Bvc2VkKVxuICAgICAgICB0aHJvdyBuZXcgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24oXCJFbnVtZXJhYmxlXCIpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIEVudW1lcmFibGUoc291cmNlLCAuLi5hZGRpdGlvbmFsKSB7XG4gICAgcmV0dXJuIGVudW1lcmFibGVGcm9tKHNvdXJjZSwgYWRkaXRpb25hbCk7XG59XG5mdW5jdGlvbiBlbnVtZXJhYmxlRnJvbShzb3VyY2UsIGFkZGl0aW9uYWwpIHtcbiAgICBsZXQgZSA9IEVudW1lcmFibGUuZnJvbUFueShzb3VyY2UpO1xuICAgIGlmICghZSlcbiAgICAgICAgdGhyb3cgbmV3IFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbigpO1xuICAgIHJldHVybiAoYWRkaXRpb25hbCAmJiBhZGRpdGlvbmFsLmxlbmd0aClcbiAgICAgICAgPyBlLm1lcmdlKGFkZGl0aW9uYWwpXG4gICAgICAgIDogZTtcbn1cbihmdW5jdGlvbiAoRW51bWVyYWJsZSkge1xuICAgIGZ1bmN0aW9uIGZyb20oc291cmNlLCAuLi5hZGRpdGlvbmFsKSB7XG4gICAgICAgIHJldHVybiBlbnVtZXJhYmxlRnJvbShzb3VyY2UsIGFkZGl0aW9uYWwpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZyb20gPSBmcm9tO1xuICAgIGZ1bmN0aW9uIGZyb21Bbnkoc291cmNlLCBkZWZhdWx0RW51bWVyYWJsZSkge1xuICAgICAgICBpZiAoVHlwZS5pc09iamVjdChzb3VyY2UpIHx8IFR5cGUuaXNTdHJpbmcoc291cmNlKSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEluZmluaXRlTGlucUVudW1lcmFibGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgICAgIGlmIChUeXBlLmlzQXJyYXlMaWtlKHNvdXJjZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheUVudW1lcmFibGUoc291cmNlKTtcbiAgICAgICAgICAgIGlmIChpc0VudW1lcmFibGUoc291cmNlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHNvdXJjZS5nZXRFbnVtZXJhdG9yKCksIG51bGwsIHNvdXJjZS5pc0VuZGxlc3MpO1xuICAgICAgICAgICAgaWYgKGlzRW51bWVyYXRvcihzb3VyY2UpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gc291cmNlLCBudWxsLCBzb3VyY2UuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIGlmIChpc0l0ZXJhdG9yKHNvdXJjZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb21BbnkobmV3IEl0ZXJhdG9yRW51bWVyYXRvcihzb3VyY2UpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChUeXBlLmlzRnVuY3Rpb24oc291cmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IG5ldyBJbmZpbml0ZUVudW1lcmF0b3Ioc291cmNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRFbnVtZXJhYmxlO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZyb21BbnkgPSBmcm9tQW55O1xuICAgIGZ1bmN0aW9uIGZyb21UaGVzZShzb3VyY2VzKSB7XG4gICAgICAgIHN3aXRjaCAoc291cmNlcyA/IHNvdXJjZXMubGVuZ3RoIDogMCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eSgpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vIEFsbG93IGZvciB2YWxpZGF0aW9uIGFuZCB0aHJvd2luZy4uLlxuICAgICAgICAgICAgICAgIHJldHVybiBlbnVtZXJhYmxlRnJvbShzb3VyY2VzWzBdKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5KCkubWVyZ2Uoc291cmNlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgRW51bWVyYWJsZS5mcm9tVGhlc2UgPSBmcm9tVGhlc2U7XG4gICAgZnVuY3Rpb24gZnJvbU9yRW1wdHkoc291cmNlKSB7XG4gICAgICAgIHJldHVybiBmcm9tQW55KHNvdXJjZSkgfHwgZW1wdHkoKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5mcm9tT3JFbXB0eSA9IGZyb21PckVtcHR5O1xuICAgIC8qKlxuICAgICAqIFN0YXRpYyBoZWxwZXIgZm9yIGNvbnZlcnRpbmcgZW51bWVyYWJsZXMgdG8gYW4gYXJyYXkuXG4gICAgICogQHBhcmFtIHNvdXJjZVxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9BcnJheShzb3VyY2UpIHtcbiAgICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIExpbnFFbnVtZXJhYmxlKVxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS50b0FycmF5KCk7XG4gICAgICAgIHJldHVybiBlbnVtVXRpbC50b0FycmF5KHNvdXJjZSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUudG9BcnJheSA9IHRvQXJyYXk7XG4gICAgZnVuY3Rpb24gX2Nob2ljZSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IG5ldyBFbnVtZXJhdG9yQmFzZShudWxsLCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCF2YWx1ZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oUmFuZG9tLnNlbGVjdC5vbmUodmFsdWVzKSk7XG4gICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgKSwgKCkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB2YWx1ZXMgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5fY2hvaWNlID0gX2Nob2ljZTtcbiAgICBmdW5jdGlvbiBjaG9pY2UodmFsdWVzKSB7XG4gICAgICAgIGxldCBsZW4gPSB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgLy8gV2UgY291bGQgcmV0dXJuIGVtcHR5IGlmIG5vIGxlbmd0aCwgYnV0IHRoYXQgd291bGQgYnJlYWsgdGhlIHR5cGluZyBhbmQgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgIC8vIEVuZm9yY2luZyB0aGF0IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgMSBjaG9pY2UgaXMga2V5LlxuICAgICAgICBpZiAoIWxlbiB8fCAhaXNGaW5pdGUobGVuKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2xlbmd0aCcsIGxlbmd0aCk7XG4gICAgICAgIHJldHVybiBfY2hvaWNlKGNvcHkodmFsdWVzKSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuY2hvaWNlID0gY2hvaWNlO1xuICAgIGZ1bmN0aW9uIGNob29zZUZyb20oLi4uYXJncykge1xuICAgICAgICAvLyBXZSBjb3VsZCByZXR1cm4gZW1wdHkgaWYgbm8gbGVuZ3RoLCBidXQgdGhhdCB3b3VsZCBicmVhayB0aGUgdHlwaW5nIGFuZCBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAgICAgICAgLy8gRW5mb3JjaW5nIHRoYXQgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAxIGNob2ljZSBpcyBrZXkuXG4gICAgICAgIGlmICghYXJncy5sZW5ndGgpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdsZW5ndGgnLCBsZW5ndGgpO1xuICAgICAgICByZXR1cm4gX2Nob2ljZShhcmdzKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5jaG9vc2VGcm9tID0gY2hvb3NlRnJvbTtcbiAgICBmdW5jdGlvbiBfY3ljbGUodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfSwgLy8gUmVpbml0aWFsaXplIHRoZSB2YWx1ZSBqdXN0IGluIGNhc2UgdGhlIGVudW1lcmF0b3IgaXMgcmVzdGFydGVkLlxuICAgICAgICAgICAgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXZhbHVlcyk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IHZhbHVlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybih2YWx1ZXNbaW5kZXgrK10pO1xuICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB2YWx1ZXMgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3ljbGUodmFsdWVzKSB7XG4gICAgICAgIGxldCBsZW4gPSB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgLy8gV2UgY291bGQgcmV0dXJuIGVtcHR5IGlmIG5vIGxlbmd0aCwgYnV0IHRoYXQgd291bGQgYnJlYWsgdGhlIHR5cGluZyBhbmQgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgIC8vIEVuZm9yY2luZyB0aGF0IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgMSBjaG9pY2UgaXMga2V5LlxuICAgICAgICBpZiAoIWxlbiB8fCAhaXNGaW5pdGUobGVuKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2xlbmd0aCcsIGxlbmd0aCk7XG4gICAgICAgIC8vIE1ha2UgYSBjb3B5IHRvIGF2b2lkIG1vZGlmeWluZyB0aGUgY29sbGVjdGlvbiBhcyB3ZSBnby5cbiAgICAgICAgcmV0dXJuIF9jeWNsZShjb3B5KHZhbHVlcykpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmN5Y2xlID0gY3ljbGU7XG4gICAgZnVuY3Rpb24gY3ljbGVUaHJvdWdoKC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gV2UgY291bGQgcmV0dXJuIGVtcHR5IGlmIG5vIGxlbmd0aCwgYnV0IHRoYXQgd291bGQgYnJlYWsgdGhlIHR5cGluZyBhbmQgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgIC8vIEVuZm9yY2luZyB0aGF0IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgMSBjaG9pY2UgaXMga2V5LlxuICAgICAgICBpZiAoIWFyZ3MubGVuZ3RoKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbGVuZ3RoJywgbGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIF9jeWNsZShhcmdzKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5jeWNsZVRocm91Z2ggPSBjeWNsZVRocm91Z2g7XG4gICAgZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgICAgIC8vIENvdWxkIGJlIHNpbmdsZSBleHBvcnQgZnVuY3Rpb24gaW5zdGFuY2UsIGJ1dCBmb3Igc2FmZXR5LCB3ZSdsbCBtYWtlIGEgbmV3IG9uZS5cbiAgICAgICAgcmV0dXJuIG5ldyBGaW5pdGVFbnVtZXJhYmxlKGdldEVtcHR5RW51bWVyYXRvcik7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZW1wdHkgPSBlbXB0eTtcbiAgICBmdW5jdGlvbiByZXBlYXQoZWxlbWVudCwgY291bnQgPSBJbmZpbml0eSkge1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKGNvdW50KSAmJiBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKVxuICAgICAgICAgICAgPyBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjb3VudDtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4geyBpbmRleCA9IDA7IH0sICh5aWVsZGVyKSA9PiAoaW5kZXgrKyA8IGMpICYmIHlpZWxkZXIueWllbGRSZXR1cm4oZWxlbWVudCksIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBuZXcgRW51bWVyYXRvckJhc2UobnVsbCwgKHlpZWxkZXIpID0+IHlpZWxkZXIueWllbGRSZXR1cm4oZWxlbWVudCksIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICkpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJlcGVhdCA9IHJlcGVhdDtcbiAgICBmdW5jdGlvbiByZXBlYXRXaXRoRmluYWxpemUoaW5pdGlhbGl6ZXIsIGZpbmFsaXplcikge1xuICAgICAgICBpZiAoIWluaXRpYWxpemVyKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImluaXRpYWxpemVyXCIpO1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbGl6ZXIpXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBpbml0aWFsaXplcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZXJcbiAgICAgICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IE5VTEw7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgZmluYWxpemVyKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSBOVUxMO1xuICAgICAgICAgICAgZmluYWxpemVyID0gVk9JRDA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJlcGVhdFdpdGhGaW5hbGl6ZSA9IHJlcGVhdFdpdGhGaW5hbGl6ZTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVudW1lcmFibGUgb2Ygb25lIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJucyB7RmluaXRlRW51bWVyYWJsZTxUPn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYWtlKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHJlcGVhdChlbGVtZW50LCAxKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5tYWtlID0gbWFrZTtcbiAgICAvLyBzdGFydCBhbmQgc3RlcCBjYW4gYmUgb3RoZXIgdGhhbiBpbnRlZ2VyLlxuICAgIGZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBjb3VudCwgc3RlcCA9IDEpIHtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShzdGFydCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RhcnRcIiwgc3RhcnQsIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICAgIGlmICghc3RlcClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGVwXCIsIHN0ZXAsIFwiTXVzdCBiZSBhIHZhbGlkIHZhbHVlXCIpO1xuICAgICAgICBpZiAoIWlzRmluaXRlKHN0ZXApKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgZmluaXRlIG51bWJlci5cIik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICByZXR1cm4gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgbGV0IGMgPSBjb3VudDsgLy8gRm9yY2UgaW50ZWdlciBldmFsdWF0aW9uLlxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHN0YXJ0O1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5kZXgrKyA8IGNcbiAgICAgICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiBpbmRleCA8IGNvdW50KVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBzdGVwO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJhbmdlID0gcmFuZ2U7XG4gICAgZnVuY3Rpb24gcmFuZ2VEb3duKHN0YXJ0LCBjb3VudCwgc3RlcCA9IDEpIHtcbiAgICAgICAgc3RlcCA9IE1hdGguYWJzKHN0ZXApICogLTE7XG4gICAgICAgIHJldHVybiByYW5nZShzdGFydCwgY291bnQsIHN0ZXApO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJhbmdlRG93biA9IHJhbmdlRG93bjtcbiAgICAvLyBzdGVwID0gLTEgYmVoYXZlcyB0aGUgc2FtZSBhcyB0b05lZ2F0aXZlSW5maW5pdHk7XG4gICAgZnVuY3Rpb24gdG9JbmZpbml0eShzdGFydCA9IDAsIHN0ZXAgPSAxKSB7XG4gICAgICAgIGlmICghaXNGaW5pdGUoc3RhcnQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0YXJ0XCIsIHN0YXJ0LCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgaWYgKCFzdGVwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgdmFsaWQgdmFsdWVcIik7XG4gICAgICAgIGlmICghaXNGaW5pdGUoc3RlcCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc3RhcnQ7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnRvSW5maW5pdHkgPSB0b0luZmluaXR5O1xuICAgIGZ1bmN0aW9uIHRvTmVnYXRpdmVJbmZpbml0eShzdGFydCA9IDAsIHN0ZXAgPSAxKSB7XG4gICAgICAgIHJldHVybiB0b0luZmluaXR5KHN0YXJ0LCAtc3RlcCk7XG4gICAgfVxuICAgIEVudW1lcmFibGUudG9OZWdhdGl2ZUluZmluaXR5ID0gdG9OZWdhdGl2ZUluZmluaXR5O1xuICAgIGZ1bmN0aW9uIHJhbmdlVG8oc3RhcnQsIHRvLCBzdGVwID0gMSkge1xuICAgICAgICBpZiAoaXNOYU4odG8pIHx8ICFpc0Zpbml0ZSh0bykpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwidG9cIiwgdG8sIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICBpZiAoc3RlcCAmJiAhaXNGaW5pdGUoc3RlcCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSBmaW5pdGUgbm9uLXplcm8gbnVtYmVyLlwiKTtcbiAgICAgICAgLy8gVGhpcyB3YXkgd2UgYWRqdXN0IGZvciB0aGUgZGVsdGEgZnJvbSBzdGFydCBhbmQgdG8gc28gdGhlIHVzZXIgY2FuIHNheSArLy0gc3RlcCBhbmQgaXQgd2lsbCB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICBzdGVwID0gTWF0aC5hYnMoc3RlcCk7XG4gICAgICAgIHJldHVybiBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHsgdmFsdWUgPSBzdGFydDsgfSwgc3RhcnQgPCB0b1xuICAgICAgICAgICAgICAgID8geWllbGRlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZSA8PSB0byAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogeWllbGRlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZSA+PSB0byAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIC09IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5yYW5nZVRvID0gcmFuZ2VUbztcbiAgICBmdW5jdGlvbiBtYXRjaGVzKGlucHV0LCBwYXR0ZXJuLCBmbGFncyA9IFwiXCIpIHtcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiaW5wdXRcIik7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgaW5wdXQ7XG4gICAgICAgIGlmICh0eXBlICE9IFR5cGUuU1RSSU5HKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGV4ZWMgUmVnRXhwIG1hdGNoZXMgb2YgdHlwZSAnXCIgKyB0eXBlICsgXCInLlwiKTtcbiAgICAgICAgaWYgKHBhdHRlcm4gaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIGZsYWdzICs9IChwYXR0ZXJuLmlnbm9yZUNhc2UpID8gXCJpXCIgOiBcIlwiO1xuICAgICAgICAgICAgZmxhZ3MgKz0gKHBhdHRlcm4ubXVsdGlsaW5lKSA/IFwibVwiIDogXCJcIjtcbiAgICAgICAgICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNvdXJjZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmxhZ3MuaW5kZXhPZihcImdcIikgPT09IC0xKVxuICAgICAgICAgICAgZmxhZ3MgKz0gXCJnXCI7XG4gICAgICAgIHJldHVybiBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVnZXg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAocGF0dGVybiwgZmxhZ3MpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDYWxsaW5nIHJlZ2V4LmV4ZWMgY29uc2VjdXRpdmVseSBvbiB0aGUgc2FtZSBpbnB1dCB1c2VzIHRoZSBsYXN0SW5kZXggdG8gc3RhcnQgdGhlIG5leHQgbWF0Y2guXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhpbnB1dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKG1hdGNoKVxuICAgICAgICAgICAgICAgICAgICA6IHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1hdGNoZXMgPSBtYXRjaGVzO1xuICAgIGZ1bmN0aW9uIGdlbmVyYXRlKGZhY3RvcnksIGNvdW50ID0gSW5maW5pdHkpIHtcbiAgICAgICAgaWYgKCFmYWN0b3J5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImZhY3RvcnlcIik7XG4gICAgICAgIGlmIChpc05hTihjb3VudCkgfHwgY291bnQgPD0gMClcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIHJldHVybiBpc0Zpbml0ZShjb3VudCkgJiYgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIilcbiAgICAgICAgICAgID8gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjID0gY291bnQ7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPCBjICYmIHlpZWxkZXIueWllbGRSZXR1cm4oZmFjdG9yeShjdXJyZW50KSk7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZhY3RvcnkgPSBOVUxMO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWZhY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihmYWN0b3J5KGluZGV4KyspKTtcbiAgICAgICAgICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5ID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG4gICAgdmFyIHJhbmRvbTtcbiAgICAoZnVuY3Rpb24gKHJhbmRvbSkge1xuICAgICAgICBmdW5jdGlvbiBmbG9hdHMobWF4RXhjbHVzaXZlID0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlKFJhbmRvbS5nZW5lcmF0ZShtYXhFeGNsdXNpdmUpKTtcbiAgICAgICAgfVxuICAgICAgICByYW5kb20uZmxvYXRzID0gZmxvYXRzO1xuICAgICAgICBmdW5jdGlvbiBpbnRlZ2Vycyhib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGUoUmFuZG9tLmdlbmVyYXRlLmludGVnZXJzKGJvdW5kYXJ5LCBpbmNsdXNpdmUpKTtcbiAgICAgICAgfVxuICAgICAgICByYW5kb20uaW50ZWdlcnMgPSBpbnRlZ2VycztcbiAgICB9KShyYW5kb20gPSBFbnVtZXJhYmxlLnJhbmRvbSB8fCAoRW51bWVyYWJsZS5yYW5kb20gPSB7fSkpO1xuICAgIGZ1bmN0aW9uIHVuZm9sZChzZWVkLCB2YWx1ZUZhY3RvcnksIHNraXBTZWVkID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF2YWx1ZUZhY3RvcnkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiZmFjdG9yeVwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICBsZXQgaXNGaXJzdDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHNlZWQ7XG4gICAgICAgICAgICAgICAgaXNGaXJzdCA9ICFza2lwU2VlZDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCF2YWx1ZUZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIGxldCBpID0gaW5kZXgrKztcbiAgICAgICAgICAgICAgICBpZiAoaXNGaXJzdClcbiAgICAgICAgICAgICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZUZhY3RvcnkodmFsdWUsIGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHZhbHVlRmFjdG9yeSA9IE5VTEw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnVuZm9sZCA9IHVuZm9sZDtcbiAgICBmdW5jdGlvbiBmb3JFYWNoKGVudW1lcmFibGUsIGFjdGlvbiwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICAgICAgLy8gV2lsbCBwcm9wZXJseSBkaXNwb3NlIGNyZWF0ZWQgZW51bWVyYWJsZS5cbiAgICAgICAgLy8gV2lsbCB0aHJvdyBpZiBlbnVtZXJhYmxlIGlzIGVuZGxlc3MuXG4gICAgICAgIHJldHVybiBlbnVtVXRpbC5mb3JFYWNoKGVudW1lcmFibGUsIGFjdGlvbiwgbWF4KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiBtYXAoZW51bWVyYWJsZSwgc2VsZWN0b3IpIHtcbiAgICAgICAgLy8gV2lsbCBwcm9wZXJseSBkaXNwb3NlIGNyZWF0ZWQgZW51bWVyYWJsZS5cbiAgICAgICAgLy8gV2lsbCB0aHJvdyBpZiBlbnVtZXJhYmxlIGlzIGVuZGxlc3MuXG4gICAgICAgIHJldHVybiBlbnVtVXRpbC5tYXAoZW51bWVyYWJsZSwgc2VsZWN0b3IpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1hcCA9IG1hcDtcbiAgICAvLyBTbGlnaHRseSBvcHRpbWl6ZWQgdmVyc2lvbnMgZm9yIG51bWJlcnMuXG4gICAgZnVuY3Rpb24gbWF4KHZhbHVlcykge1xuICAgICAgICBjb25zdCB2ID0gdmFsdWVzXG4gICAgICAgICAgICAudGFrZVVudGlsKHYgPT4gdiA9PSArSW5maW5pdHksIHRydWUpXG4gICAgICAgICAgICAuYWdncmVnYXRlKEZ1bmN0aW9ucy5HcmVhdGVyKTtcbiAgICAgICAgcmV0dXJuIHYgPT09IFZPSUQwID8gTmFOIDogdjtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5tYXggPSBtYXg7XG4gICAgZnVuY3Rpb24gbWluKHZhbHVlcykge1xuICAgICAgICBjb25zdCB2ID0gdmFsdWVzXG4gICAgICAgICAgICAudGFrZVVudGlsKHYgPT4gdiA9PSAtSW5maW5pdHksIHRydWUpXG4gICAgICAgICAgICAuYWdncmVnYXRlKEZ1bmN0aW9ucy5MZXNzZXIpO1xuICAgICAgICByZXR1cm4gdiA9PT0gVk9JRDAgPyBOYU4gOiB2O1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1pbiA9IG1pbjtcbiAgICAvKipcbiAgICAgKiBUYWtlcyBhbnkgc2V0IG9mIGNvbGxlY3Rpb25zIG9mIHRoZSBzYW1lIHR5cGUgYW5kIHdlYXZlcyB0aGVtIHRvZ2V0aGVyLlxuICAgICAqIEBwYXJhbSBlbnVtZXJhYmxlc1xuICAgICAqIEByZXR1cm5zIHtFbnVtZXJhYmxlPFQ+fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdlYXZlKGVudW1lcmFibGVzKSB7XG4gICAgICAgIGlmICghZW51bWVyYWJsZXMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdlbnVtZXJhYmxlcycpO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcXVldWU7XG4gICAgICAgICAgICBsZXQgbWFpbkVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuICAgICAgICAgICAgICAgIG1haW5FbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShlbnVtZXJhYmxlcyk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgbGV0IGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vIEZpcnN0IHBhc3MuLi5cbiAgICAgICAgICAgICAgICBpZiAobWFpbkVudW1lcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFlICYmIG1haW5FbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjID0gbWFpbkVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUgPSBuZXh0RW51bWVyYXRvcihxdWV1ZSwgYyA/IGVudW1VdGlsLmZyb20oYykgOiBOVUxMKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluRW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlICghZSAmJiBxdWV1ZS50cnlEZXF1ZXVlKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZSA9IG5leHRFbnVtZXJhdG9yKHF1ZXVlLCBlbnVtVXRpbC5mcm9tKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICAgICAgICAgIHJldHVybiBlXG4gICAgICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihlLmN1cnJlbnQpXG4gICAgICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2UudGhlc2Uubm9Db3B5KHF1ZXVlLmR1bXAoKSk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gTlVMTDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1haW5FbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBtYWluRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgbWFpbkVudW1lcmF0b3IgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUud2VhdmUgPSB3ZWF2ZTtcbn0pKEVudW1lcmFibGUgfHwgKEVudW1lcmFibGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgRW51bWVyYWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbnEuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS5MaW5xL0xpbnEuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuY29uc3QgTkFNRSA9ICdFeGNlcHRpb24nO1xuLyoqXG4gKiBSZXByZXNlbnRzIGVycm9ycyB0aGF0IG9jY3VyIGR1cmluZyBhcHBsaWNhdGlvbiBleGVjdXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBFeGNlcHRpb24ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBFeGNlcHRpb24gY2xhc3Mgd2l0aCBhIHNwZWNpZmllZCBlcnJvciBtZXNzYWdlIGFuZCBvcHRpb25hbGx5IGEgcmVmZXJlbmNlIHRvIHRoZSBpbm5lciBleGNlcHRpb24gdGhhdCBpcyB0aGUgY2F1c2Ugb2YgdGhpcyBleGNlcHRpb24uXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0gaW5uZXJFeGNlcHRpb25cbiAgICAgKiBAcGFyYW0gYmVmb3JlU2VhbGluZyBUaGlzIGRlbGVnYXRlIGlzIHVzZWQgdG8gYWxsb3cgYWN0aW9ucyB0byBvY2N1ciBqdXN0IGJlZm9yZSB0aGlzIGNvbnN0cnVjdG9yIGZpbmlzaGVzLiAgU2luY2Ugc29tZSBjb21waWxlcnMgZG8gbm90IGFsbG93IHRoZSB1c2Ugb2YgJ3RoaXMnIGJlZm9yZSBzdXBlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbiwgYmVmb3JlU2VhbGluZykge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgdGhpcy5uYW1lID0gXy5nZXROYW1lKCk7XG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgICAgICBpZiAoaW5uZXJFeGNlcHRpb24pXG4gICAgICAgICAgICBfLmRhdGFbJ2lubmVyRXhjZXB0aW9uJ10gPSBpbm5lckV4Y2VwdGlvbjtcbiAgICAgICAgLyogT3JpZ2luYWxseSBpbnRlbmRlZCB0byB1c2UgJ2dldCcgYWNjZXNzb3JzIGZvciBwcm9wZXJ0aWVzLFxuICAgICAgICAgKiBCdXQgZGVidWdnZXJzIGRvbid0IGRpc3BsYXkgdGhlc2UgcmVhZGlseSB5ZXQuXG4gICAgICAgICAqIE9iamVjdC5mcmVlemUgaGFzIHRvIGJlIHVzZWQgY2FyZWZ1bGx5LCBidXQgd2lsbCBwcmV2ZW50IG92ZXJyaWRpbmcgdmFsdWVzIGF0IHJ1bnRpbWUuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoYmVmb3JlU2VhbGluZylcbiAgICAgICAgICAgIGJlZm9yZVNlYWxpbmcoXyk7XG4gICAgICAgIC8vIE5vZGUgaGFzIGEgLnN0YWNrLCBsZXQncyB1c2UgaXQuLi5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzdGFjayA9IGV2YWwoXCJuZXcgRXJyb3IoKVwiKS5zdGFjaztcbiAgICAgICAgICAgIHN0YWNrID0gc3RhY2tcbiAgICAgICAgICAgICAgICAmJiBzdGFja1xuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXkVycm9yXFxuLywgJycpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oLnxcXG4pK1xccythdCBuZXcuKy8sICcnKVxuICAgICAgICAgICAgICAgIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5zdGFjayA9IF8udG9TdHJpbmdXaXRob3V0QnJhY2tldHMoKSArIHN0YWNrO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkgeyB9XG4gICAgICAgIE9iamVjdC5mcmVlemUoXyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciB0eXBlLlxuICAgICAqIFRoZSBkZWZhdWx0IGlzICdFcnJvcicuXG4gICAgICovXG4gICAgZ2V0TmFtZSgpIHsgcmV0dXJuIE5BTUU7IH1cbiAgICAvKipcbiAgICAgKiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBFeGNlcHRpb24gaW5zdGFuY2UuXG4gICAgICovXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgWyR7dGhpcy50b1N0cmluZ1dpdGhvdXRCcmFja2V0cygpfV1gO1xuICAgIH1cbiAgICB0b1N0cmluZ1dpdGhvdXRCcmFja2V0cygpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IG0gPSBfLm1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBfLm5hbWUgKyAobSA/ICgnOiAnICsgbSkgOiAnJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZGF0YSBvYmplY3QuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgZm9yIChsZXQgayBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrKSlcbiAgICAgICAgICAgICAgICBkZWxldGUgZGF0YVtrXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgKiBhcyBWYWx1ZXMgZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbi8qICB2YWxpZGF0ZVNpemU6IFV0aWxpdHkgZm9yIHF1aWNrIHZhbGlkYXRpb24vaW52YWxpZGF0aW9uIG9mIGFycmF5IGVxdWFsaXR5LlxuICAgIFdoeSB0aGlzIHdheT8gIFdoeSBub3QgcGFzcyBhIGNsb3N1cmUgZm9yIHRoZSBsYXN0IHJldHVybj9cbiAgICBSZWFzb246IFBlcmZvcm1hbmNlIGFuZCBhdm9pZGluZyB0aGUgY3JlYXRpb24gb2YgbmV3IGZ1bmN0aW9ucy9jbG9zdXJlcy4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlU2l6ZShhLCBiKSB7XG4gICAgLy8gQm90aCB2YWxpZCBhbmQgYXJlIHNhbWUgb2JqZWN0LCBvciBib3RoIGFyZSBudWxsL3VuZGVmaW5lZC5cbiAgICBpZiAoYSAmJiBiICYmIGEgPT09IGIgfHwgIWEgJiYgIWIpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vIEF0IHRoaXMgcG9pbnQsIGF0IGxlYXN0IG9uZSBoYXMgdG8gYmUgbm9uLW51bGwuXG4gICAgaWYgKCFhIHx8ICFiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgbGVuID0gYS5sZW5ndGg7XG4gICAgaWYgKGxlbiAhPT0gYi5sZW5ndGgpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAvLyBJZiBib3RoIGFyZSBhcnJheXMgYW5kIGhhdmUgemVybyBsZW5ndGgsIHRoZXkgYXJlIGVxdWFsLlxuICAgIGlmIChsZW4gPT09IDApXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vIFJldHVybiB0aGUgbGVuZ3RoIGZvciBkb3duc3RyZWFtIHByb2Nlc3NpbmcuXG4gICAgcmV0dXJuIGxlbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcmVBbGxFcXVhbChhcnJheXMsIHN0cmljdCA9IHRydWUsIGVxdWFsaXR5Q29tcGFyZXIgPSBWYWx1ZXMuYXJlRXF1YWwpIHtcbiAgICBpZiAoIWFycmF5cylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnROdWxsRXhjZXB0aW9uOiAnYXJyYXlzJyBjYW5ub3QgYmUgbnVsbC5cIik7XG4gICAgaWYgKGFycmF5cy5sZW5ndGggPCAyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY29tcGFyZSBhIHNldCBvZiBhcnJheXMgbGVzcyB0aGFuIDIuXCIpO1xuICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oc3RyaWN0KSkge1xuICAgICAgICBlcXVhbGl0eUNvbXBhcmVyID0gc3RyaWN0O1xuICAgICAgICBzdHJpY3QgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBmaXJzdCA9IGFycmF5c1swXTtcbiAgICBmb3IgKGxldCBpID0gMSwgbCA9IGFycmF5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKCFhcmVFcXVhbChmaXJzdCwgYXJyYXlzW2ldLCBzdHJpY3QsIGVxdWFsaXR5Q29tcGFyZXIpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcmVFcXVhbChhLCBiLCBzdHJpY3QgPSB0cnVlLCBlcXVhbGl0eUNvbXBhcmVyID0gVmFsdWVzLmFyZUVxdWFsKSB7XG4gICAgY29uc3QgbGVuID0gdmFsaWRhdGVTaXplKGEsIGIpO1xuICAgIGlmIChUeXBlLmlzQm9vbGVhbihsZW4pKVxuICAgICAgICByZXR1cm4gbGVuO1xuICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oc3RyaWN0KSkge1xuICAgICAgICBlcXVhbGl0eUNvbXBhcmVyID0gc3RyaWN0O1xuICAgICAgICBzdHJpY3QgPSB0cnVlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICghZXF1YWxpdHlDb21wYXJlcihhW2ldLCBiW2ldLCBzdHJpY3QpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGludGVybmFsU29ydChhLCBjb21wYXJlcikge1xuICAgIGlmICghYSB8fCBhLmxlbmd0aCA8IDIpXG4gICAgICAgIHJldHVybiBhO1xuICAgIGNvbnN0IGxlbiA9IGEubGVuZ3RoO1xuICAgIGxldCBiO1xuICAgIGlmIChsZW4gPiA2NTUzNilcbiAgICAgICAgYiA9IG5ldyBBcnJheShsZW4pO1xuICAgIGVsc2Uge1xuICAgICAgICBiID0gW107XG4gICAgICAgIGIubGVuZ3RoID0gbGVuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGJbaV0gPSBhW2ldO1xuICAgIH1cbiAgICBiLnNvcnQoY29tcGFyZXIpO1xuICAgIHJldHVybiBiO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFyZUVxdWl2YWxlbnQoYSwgYiwgY29tcGFyZXIgPSBWYWx1ZXMuY29tcGFyZSkge1xuICAgIGNvbnN0IGxlbiA9IHZhbGlkYXRlU2l6ZShhLCBiKTtcbiAgICBpZiAoVHlwZS5pc0Jvb2xlYW4obGVuKSlcbiAgICAgICAgcmV0dXJuIGxlbjtcbiAgICAvLyBUaGVyZSBtaWdodCBiZSBhIGJldHRlciBtb3JlIHBlcmZvcm1hbnQgd2F5IHRvIGRvIHRoaXMsIGJ1dCBmb3IgdGhlIG1vbWVudCwgdGhpc1xuICAgIC8vIHdvcmtzIHF1aXRlIHdlbGwuXG4gICAgYSA9IGludGVybmFsU29ydChhLCBjb21wYXJlcik7XG4gICAgYiA9IGludGVybmFsU29ydChiLCBjb21wYXJlcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoY29tcGFyZXIoYVtpXSwgYltpXSkgIT09IDApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tcGFyZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L0NvbXBhcmUuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVGFza0hhbmRsZXJCYXNlIH0gZnJvbSBcIi4vVGFza0hhbmRsZXJCYXNlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIFRhc2tIYW5kbGVyIGV4dGVuZHMgVGFza0hhbmRsZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihfYWN0aW9uKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2FjdGlvbiA9IF9hY3Rpb247XG4gICAgICAgIGlmICghX2FjdGlvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FjdGlvbicpO1xuICAgIH1cbiAgICBfb25FeGVjdXRlKCkge1xuICAgICAgICB0aGlzLl9hY3Rpb24oKTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9hY3Rpb24gPSBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFRhc2tIYW5kbGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFza0hhbmRsZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UaHJlYWRpbmcvVGFza3MvVGFza0hhbmRsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgRGlzcG9zYWJsZUJhc2UgfSBmcm9tIFwiLi4vLi4vRGlzcG9zYWJsZS9EaXNwb3NhYmxlQmFzZVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gXCJUYXNrSGFuZGxlckJhc2VcIjtcbi8qKlxuICogQSBzaW1wbGUgY2xhc3MgZm9yIGhhbmRsaW5nIHBvdGVudGlhbGx5IHJlcGVhdGVkIGV4ZWN1dGlvbnMgZWl0aGVyIGRlZmVycmVkIG9yIGltbWVkaWF0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFRhc2tIYW5kbGVyQmFzZSBleHRlbmRzIERpc3Bvc2FibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBOQU1FO1xuICAgICAgICB0aGlzLl90aW1lb3V0SWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdGF0dXMgPSAwIC8qIENyZWF0ZWQgKi87XG4gICAgfVxuICAgIGdldCBpc1NjaGVkdWxlZCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fdGltZW91dElkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY2hlZHVsZXMvUmVzY2hlZHVsZXMgdHJpZ2dlcmluZyB0aGUgdGFzay5cbiAgICAgKiBAcGFyYW0gZGVmZXIgT3B0aW9uYWwgdGltZSB0byB3YWl0IHVudGlsIHRyaWdnZXJpbmcuXG4gICAgICovXG4gICAgc3RhcnQoZGVmZXIgPSAwKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IDEgLyogV2FpdGluZ1RvUnVuICovO1xuICAgICAgICBpZiAoIShkZWZlciA+IDApKVxuICAgICAgICAgICAgZGVmZXIgPSAwOyAvLyBBIG5lZ2F0aW9uIGlzIHVzZWQgdG8gY2F0Y2ggZWRnZSBjYXNlcy5cbiAgICAgICAgaWYgKGlzRmluaXRlKGRlZmVyKSlcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IHNldFRpbWVvdXQoVGFza0hhbmRsZXJCYXNlLl9oYW5kbGVyLCBkZWZlciwgdGhpcyk7XG4gICAgfVxuICAgIHJ1blN5bmNocm9ub3VzbHkoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIFRhc2tIYW5kbGVyQmFzZS5faGFuZGxlcih0aGlzKTtcbiAgICB9XG4gICAgZ2V0U3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xuICAgIH1cbiAgICBnZXQgc3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGF0dXMoKTtcbiAgICB9XG4gICAgLy8gVXNlIGEgc3RhdGljIGZ1bmN0aW9uIGhlcmUgdG8gYXZvaWQgcmVjcmVhdGluZyBhIG5ldyBmdW5jdGlvbiBldmVyeSB0aW1lLlxuICAgIHN0YXRpYyBfaGFuZGxlcihkKSB7XG4gICAgICAgIGQuY2FuY2VsKCk7XG4gICAgICAgIGQuX3N0YXR1cyA9IDIgLyogUnVubmluZyAqLztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGQuX29uRXhlY3V0ZSgpO1xuICAgICAgICAgICAgZC5fc3RhdHVzID0gMyAvKiBSYW5Ub0NvbXBsZXRpb24gKi87XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICBkLl9zdGF0dXMgPSA1IC8qIEZhdWx0ZWQgKi87XG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gbnVsbDtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuX3RpbWVvdXRJZDtcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICAgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3N0YXR1cyA9IDQgLyogQ2FuY2VsbGVkICovO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFRhc2tIYW5kbGVyQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhc2tIYW5kbGVyQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1RocmVhZGluZy9UYXNrcy9UYXNrSGFuZGxlckJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBPcmlnaW5hbDogaHR0cDovL2xpbnFqcy5jb2RlcGxleC5jb20vXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgYXJlRXF1YWwgfSBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IExpbmtlZE5vZGVMaXN0IH0gZnJvbSBcIi4uL0xpbmtlZE5vZGVMaXN0XCI7XG5pbXBvcnQgeyBPYmplY3RQb29sIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvT2JqZWN0UG9vbFwiO1xuaW1wb3J0IHsgZ2V0SWRlbnRpZmllciB9IGZyb20gXCIuL2dldElkZW50aWZpZXJcIjtcbmltcG9ydCBEaWN0aW9uYXJ5QmFzZSBmcm9tIFwiLi9EaWN0aW9uYXJ5QmFzZVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbi8vIExpbmtlZExpc3QgZm9yIERpY3Rpb25hcnlcbmNsYXNzIEhhc2hFbnRyeSB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCB2YWx1ZSwgcHJldmlvdXMsIG5leHQpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcmV2aW91cyA9IHByZXZpb3VzO1xuICAgICAgICB0aGlzLm5leHQgPSBuZXh0O1xuICAgIH1cbn1cbmxldCBsaW5rZWRMaXN0UG9vbDtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5mdW5jdGlvbiBsaW5rZWROb2RlTGlzdChyZWN5Y2xlKSB7XG4gICAgaWYgKCFsaW5rZWRMaXN0UG9vbClcbiAgICAgICAgbGlua2VkTGlzdFBvb2xcbiAgICAgICAgICAgID0gbmV3IE9iamVjdFBvb2woMjAsICgpID0+IG5ldyBMaW5rZWROb2RlTGlzdCgpLCByID0+IHIuY2xlYXIoKSk7XG4gICAgaWYgKCFyZWN5Y2xlKVxuICAgICAgICByZXR1cm4gbGlua2VkTGlzdFBvb2wudGFrZSgpO1xuICAgIGxpbmtlZExpc3RQb29sLmFkZChyZWN5Y2xlKTtcbn1cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5IGV4dGVuZHMgRGljdGlvbmFyeUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9rZXlHZW5lcmF0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fa2V5R2VuZXJhdG9yID0gX2tleUdlbmVyYXRvcjtcbiAgICAgICAgdGhpcy5fZW50cmllcyA9IGxpbmtlZE5vZGVMaXN0KCk7XG4gICAgICAgIHRoaXMuX2J1Y2tldHMgPSB7fTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fZW50cmllcyA9IG51bGw7XG4gICAgICAgIF8uX2J1Y2tldHMgPSBudWxsO1xuICAgICAgICBfLl9oYXNoR2VuZXJhdG9yID0gbnVsbDtcbiAgICB9XG4gICAgZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbnRyaWVzICYmIHRoaXMuX2VudHJpZXMudW5zYWZlQ291bnQgfHwgMDtcbiAgICB9XG4gICAgX2dldEJ1Y2tldChoYXNoLCBjcmVhdGVJZk1pc3NpbmcpIHtcbiAgICAgICAgaWYgKGhhc2ggPT0gbnVsbCB8fCAhY3JlYXRlSWZNaXNzaW5nICYmICF0aGlzLmdldENvdW50KCkpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCFUeXBlLmlzUHJpbWl0aXZlT3JTeW1ib2woaGFzaCkpXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJLZXkgdHlwZSBub3QgaW5kZXhhYmxlIGFuZCBjb3VsZCBjYXVzZSBEaWN0aW9uYXJ5IHRvIGJlIGV4dHJlbWVseSBzbG93LlwiKTtcbiAgICAgICAgY29uc3QgYnVja2V0cyA9IHRoaXMuX2J1Y2tldHM7XG4gICAgICAgIGxldCBidWNrZXQgPSBidWNrZXRzW2hhc2hdO1xuICAgICAgICBpZiAoY3JlYXRlSWZNaXNzaW5nICYmICFidWNrZXQpXG4gICAgICAgICAgICBidWNrZXRzW2hhc2hdXG4gICAgICAgICAgICAgICAgPSBidWNrZXRcbiAgICAgICAgICAgICAgICAgICAgPSBsaW5rZWROb2RlTGlzdCgpO1xuICAgICAgICByZXR1cm4gYnVja2V0IHx8IG51bGw7XG4gICAgfVxuICAgIF9nZXRCdWNrZXRFbnRyeShrZXksIGhhc2gsIGJ1Y2tldCkge1xuICAgICAgICBpZiAoa2V5ID09IG51bGwgfHwgIXRoaXMuZ2V0Q291bnQoKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBfID0gdGhpcywgY29tcGFyZXIgPSBfLl9rZXlHZW5lcmF0b3IsIGNvbXBhcmVLZXkgPSBjb21wYXJlciA/IGNvbXBhcmVyKGtleSkgOiBrZXk7XG4gICAgICAgIGlmICghYnVja2V0KVxuICAgICAgICAgICAgYnVja2V0ID0gXy5fZ2V0QnVja2V0KGhhc2ggfHwgZ2V0SWRlbnRpZmllcihjb21wYXJlS2V5KSk7XG4gICAgICAgIHJldHVybiBidWNrZXRcbiAgICAgICAgICAgICYmIChjb21wYXJlclxuICAgICAgICAgICAgICAgID8gYnVja2V0LmZpbmQoZSA9PiBjb21wYXJlcihlLmtleSkgPT09IGNvbXBhcmVLZXkpXG4gICAgICAgICAgICAgICAgOiBidWNrZXQuZmluZChlID0+IGUua2V5ID09PSBjb21wYXJlS2V5KSk7XG4gICAgfVxuICAgIF9nZXRFbnRyeShrZXkpIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuX2dldEJ1Y2tldEVudHJ5KGtleSk7XG4gICAgICAgIHJldHVybiBlICYmIGUudmFsdWU7XG4gICAgfVxuICAgIGdldFZhbHVlKGtleSkge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZ2V0RW50cnkoa2V5KTtcbiAgICAgICAgcmV0dXJuIGUgPyBlLnZhbHVlIDogVk9JRDA7XG4gICAgfVxuICAgIF9zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGJ1Y2tldHMgPSBfLl9idWNrZXRzLCBlbnRyaWVzID0gXy5fZW50cmllcywgY29tcGFyZUtleSA9IF8uX2tleUdlbmVyYXRvciA/IF8uX2tleUdlbmVyYXRvcihrZXkpIDoga2V5LCBoYXNoID0gZ2V0SWRlbnRpZmllcihjb21wYXJlS2V5KTtcbiAgICAgICAgbGV0IGJ1Y2tldCA9IF8uX2dldEJ1Y2tldChoYXNoKTtcbiAgICAgICAgY29uc3QgYnVja2V0RW50cnkgPSBidWNrZXQgJiYgXy5fZ2V0QnVja2V0RW50cnkoa2V5LCBoYXNoLCBidWNrZXQpO1xuICAgICAgICAvLyBFbnRyeSBleGl0cz8gRGVsZXRlIG9yIHVwZGF0ZVxuICAgICAgICBpZiAoYnVja2V0RW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBidWNrZXQ7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFZPSUQwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHggPSBiLnJlbW92ZU5vZGUoYnVja2V0RW50cnkpLCB5ID0gZW50cmllcy5yZW1vdmVOb2RlKGJ1Y2tldEVudHJ5LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoeCAmJiAhYi5jb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYnVja2V0c1toYXNoXTtcbiAgICAgICAgICAgICAgICAgICAgbGlua2VkTm9kZUxpc3QoYik7XG4gICAgICAgICAgICAgICAgICAgIGJ1Y2tldCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh4ICE9PSB5KVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkVudHJpZXMgYW5kIGJ1Y2tldHMgYXJlIG91dCBvZiBzeW5jLlwiO1xuICAgICAgICAgICAgICAgIGlmICh4KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IGV4cG9zZSB0aGUgaW50ZXJuYWwgaGFzaCBlbnRyaWVzIHNvIHJlcGxhY2luZyB0aGUgdmFsdWUgaXMgb2suXG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkID0gYnVja2V0RW50cnkudmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgYnVja2V0RW50cnkudmFsdWUudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWFyZUVxdWFsKHZhbHVlLCBvbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9PSBWT0lEMCkge1xuICAgICAgICAgICAgaWYgKCFidWNrZXQpXG4gICAgICAgICAgICAgICAgYnVja2V0ID0gXy5fZ2V0QnVja2V0KGhhc2gsIHRydWUpO1xuICAgICAgICAgICAgaWYgKCFidWNrZXQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7aGFzaH1cIiBjYW5ub3QgYmUgYWRkZWQgdG8gbG9va3VwIHRhYmxlLmApO1xuICAgICAgICAgICAgbGV0IGVudHJ5ID0gbmV3IEhhc2hFbnRyeShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGVudHJpZXMuYWRkTm9kZShlbnRyeSk7XG4gICAgICAgICAgICBidWNrZXQuYWRkTm9kZShuZXcgSGFzaEVudHJ5KGtleSwgZW50cnkpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgX2NsZWFySW50ZXJuYWwoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBidWNrZXRzID0gXy5fYnVja2V0cztcbiAgICAgICAgLy8gRW5zdXJlIHJlc2V0IGFuZCBjbGVhbi4uLlxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYnVja2V0cykge1xuICAgICAgICAgICAgaWYgKGJ1Y2tldHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGxldCBidWNrZXQgPSBidWNrZXRzW2tleV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIGJ1Y2tldHNba2V5XTtcbiAgICAgICAgICAgICAgICBsaW5rZWROb2RlTGlzdChidWNrZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLl9lbnRyaWVzLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qXG4gICAgICogTm90ZTogc3VwZXIuZ2V0RW51bWVyYXRvcigpIHdvcmtzIHBlcmZlY3RseSB3ZWxsLFxuICAgICAqIGJ1dCBlbnVtZXJhdGluZyB0aGUgaW50ZXJuYWwgbGlua2VkIG5vZGUgbGlzdCBpcyBtdWNoIG1vcmUgZWZmaWNpZW50LlxuICAgICAqL1xuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgdmVyLCBjdXJyZW50RW50cnk7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHZlciA9IF8uX3ZlcnNpb247XG4gICAgICAgICAgICBjdXJyZW50RW50cnkgPSBfLl9lbnRyaWVzLmZpcnN0O1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRFbnRyeSkge1xuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcik7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyBrZXk6IGN1cnJlbnRFbnRyeS5rZXksIHZhbHVlOiBjdXJyZW50RW50cnkudmFsdWUgfTtcbiAgICAgICAgICAgICAgICBjdXJyZW50RW50cnkgPSBjdXJyZW50RW50cnkubmV4dCB8fCBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRLZXlzKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBlID0gXy5fZW50cmllcyAmJiBfLl9lbnRyaWVzLmZpcnN0O1xuICAgICAgICB3aGlsZSAoZSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goZS5rZXkpO1xuICAgICAgICAgICAgZSA9IGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBnZXRWYWx1ZXMoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IGUgPSBfLl9lbnRyaWVzICYmIF8uX2VudHJpZXMuZmlyc3Q7XG4gICAgICAgIHdoaWxlIChlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChlLnZhbHVlKTtcbiAgICAgICAgICAgIGUgPSBlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBEaWN0aW9uYXJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGljdGlvbmFyeS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9EaWN0aW9uYXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCIuLi9UZXh0L1V0aWxpdHlcIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJTVBPUlRBTlQgTk9URVMgQUJPVVQgUEVSRk9STUFOQ0U6XG4gKiBodHRwOi8vanNwZXJmLmNvbS9zaW11bGF0aW5nLWEtcXVldWVcbiAqXG4gKiBBZGRpbmcgdG8gYW4gYXJyYXkgaXMgdmVyeSBmYXN0LCBidXQgbW9kaWZ5aW5nIGlzIHNsb3cuXG4gKiBMaW5rZWRMaXN0IHdpbnMgd2hlbiBtb2RpZnlpbmcgY29udGVudHMuXG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2Njg4NC9hcnJheS12ZXJzdXMtbGlua2VkLWxpc3RcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VmdWwgZm9yIG1hbmFnaW5nIGEgbGlzdCBvZiBsaW5rZWQgbm9kZXMsIGJ1dCBpdCBkb2VzIG5vdCBwcm90ZWN0IGFnYWluc3QgbW9kaWZ5aW5nIGluZGl2aWR1YWwgbGlua3MuXG4gKiBJZiB0aGUgY29uc3VtZXIgbW9kaWZpZXMgYSBsaW5rIChzZXRzIHRoZSBwcmV2aW91cyBvciBuZXh0IHZhbHVlKSBpdCB3aWxsIGVmZmVjdGl2ZWx5IGJyZWFrIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIEl0IGlzIHBvc3NpYmxlIHRvIGRlY2xhcmUgYSBub2RlIHR5cGUgb2YgYW55IGtpbmQgYXMgbG9uZyBhcyBpdCBjb250YWlucyBhIHByZXZpb3VzIGFuZCBuZXh0IHZhbHVlIHRoYXQgY2FuIHJlZmVyZW5jZSBhbm90aGVyIG5vZGUuXG4gKiBBbHRob3VnaCBub3QgYXMgc2FmZSBhcyB0aGUgaW5jbHVkZWQgTGlua2VkTGlzdCwgdGhpcyBjbGFzcyBoYXMgbGVzcyBvdmVyaGVhZCBhbmQgaXMgbW9yZSBmbGV4aWJsZS5cbiAqXG4gKiBUaGUgY291bnQgKG9yIGxlbmd0aCkgb2YgdGhpcyBMaW5rZWROb2RlTGlzdCBpcyBub3QgdHJhY2tlZCBzaW5jZSBpdCBjb3VsZCBiZSBjb3JydXB0ZWQgYXQgYW55IHRpbWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaW5rZWROb2RlTGlzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGFzdCA9IG51bGw7XG4gICAgICAgIHRoaXMudW5zYWZlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gMDtcbiAgICB9XG4gICAgYXNzZXJ0VmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgICAgIGlmICh2ZXJzaW9uICE9PSB0aGlzLl92ZXJzaW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDb2xsZWN0aW9uIHdhcyBtb2RpZmllZC5cIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZmlyc3Qgbm9kZS4gIFdpbGwgYmUgbnVsbCBpZiB0aGUgY29sbGVjdGlvbiBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBnZXQgZmlyc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGxhc3Qgbm9kZS5cbiAgICAgKi9cbiAgICBnZXQgbGFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGl2ZWx5IGNvdW50cyB0aGUgbnVtYmVyIG9mIGxpbmtlZCBub2RlcyBhbmQgcmV0dXJucyB0aGUgdmFsdWUuXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgY291bnQoKSB7XG4gICAgICAgIGxldCBuZXh0ID0gdGhpcy5fZmlyc3Q7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIG5leHQgPSBuZXh0Lm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uLCBpZ25vcmVWZXJzaW9uaW5nKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgY3VycmVudCA9IG51bGwsIG5leHQgPSBfLmZpcnN0OyAvLyBCZSBzdXJlIHRvIHRyYWNrIHRoZSBuZXh0IG5vZGUgc28gaWYgY3VycmVudCBub2RlIGlzIHJlbW92ZWQuXG4gICAgICAgIGNvbnN0IHZlcnNpb24gPSBfLl92ZXJzaW9uO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoIWlnbm9yZVZlcnNpb25pbmcpXG4gICAgICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcnNpb24pO1xuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICBuZXh0ID0gY3VycmVudCAmJiBjdXJyZW50Lm5leHQ7XG4gICAgICAgIH0gd2hpbGUgKGN1cnJlbnRcbiAgICAgICAgICAgICYmIGFjdGlvbihjdXJyZW50LCBpbmRleCsrKSAhPT0gZmFsc2UpO1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIG1hcChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoIXNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignc2VsZWN0b3InKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMuZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goc2VsZWN0b3Iobm9kZSwgaSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXJhc2VzIHRoZSBsaW5rZWQgbm9kZSdzIHJlZmVyZW5jZXMgdG8gZWFjaCBvdGhlciBhbmQgcmV0dXJucyB0aGUgbnVtYmVyIG9mIG5vZGVzLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgbiwgY0YgPSAwLCBjTCA9IDA7XG4gICAgICAgIC8vIEZpcnN0LCBjbGVhciBpbiB0aGUgZm9yd2FyZCBkaXJlY3Rpb24uXG4gICAgICAgIG4gPSBfLl9maXJzdDtcbiAgICAgICAgXy5fZmlyc3QgPSBudWxsO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgICAgY0YrKztcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gbjtcbiAgICAgICAgICAgIG4gPSBuLm5leHQ7XG4gICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIExhc3QsIGNsZWFyIGluIHRoZSByZXZlcnNlIGRpcmVjdGlvbi5cbiAgICAgICAgbiA9IF8uX2xhc3Q7XG4gICAgICAgIF8uX2xhc3QgPSBudWxsO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgICAgY0wrKztcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gbjtcbiAgICAgICAgICAgIG4gPSBuLnByZXZpb3VzO1xuICAgICAgICAgICAgY3VycmVudC5wcmV2aW91cyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNGICE9PSBjTClcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTGlua2VkTm9kZUxpc3Q6IEZvcndhcmQgdmVyc3VzIHJldmVyc2UgY291bnQgZG9lcyBub3QgbWF0Y2ggd2hlbiBjbGVhcmluZy4gRm9yd2FyZDogJyArIGNGICsgXCIsIFJldmVyc2U6IFwiICsgY0wpO1xuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gY0Y7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgbGlzdC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBsaXN0IHRvIHNlZSBpZiBhIG5vZGUgZXhpc3RzLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnMobm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKG5vZGUpICE9IC0xO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbmRleCBvZiBhIHBhcnRpY3VsYXIgbm9kZS5cbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKi9cbiAgICBnZXROb2RlQXQoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgbmV4dCA9IHRoaXMuX2ZpcnN0O1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChuZXh0ICYmIGkrKyA8IGluZGV4KSB7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dC5uZXh0IHx8IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfVxuICAgIGZpbmQoY29uZGl0aW9uKSB7XG4gICAgICAgIGxldCBub2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5mb3JFYWNoKChuLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZGl0aW9uKG4sIGkpKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG47XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBsaXN0IHRvIGZpbmQgdGhlIHNwZWNpZmllZCBub2RlIGFuZCByZXR1cm5zIGl0cyBpbmRleC5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGluZGV4T2Yobm9kZSkge1xuICAgICAgICBpZiAobm9kZSAmJiAobm9kZS5wcmV2aW91cyB8fCBub2RlLm5leHQpKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IGMsIG4gPSB0aGlzLl9maXJzdDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBjID0gbjtcbiAgICAgICAgICAgICAgICBpZiAoYyA9PT0gbm9kZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9IHdoaWxlICgobiA9IGMgJiYgYy5uZXh0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBmaXJzdCBub2RlIGFuZCByZXR1cm5zIHRydWUgaWYgc3VjY2Vzc2Z1bC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVGaXJzdCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZmlyc3QgJiYgdGhpcy5yZW1vdmVOb2RlKHRoaXMuX2ZpcnN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGFzdCBub2RlIGFuZCByZXR1cm5zIHRydWUgaWYgc3VjY2Vzc2Z1bC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVMYXN0KCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9sYXN0ICYmIHRoaXMucmVtb3ZlTm9kZSh0aGlzLl9sYXN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIG5vZGUuXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHN1Y2Nlc3NmdWwgYW5kIGZhbHNlIGlmIG5vdCBmb3VuZCAoYWxyZWFkeSByZW1vdmVkKS5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHJlbW92ZU5vZGUobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbm9kZScpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcHJldiA9IG5vZGUucHJldmlvdXMgfHwgbnVsbCwgbmV4dCA9IG5vZGUubmV4dCB8fCBudWxsO1xuICAgICAgICBsZXQgYSA9IGZhbHNlLCBiID0gZmFsc2U7XG4gICAgICAgIGlmIChwcmV2KVxuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV4dDtcbiAgICAgICAgZWxzZSBpZiAoXy5fZmlyc3QgPT0gbm9kZSlcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gbmV4dDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYSA9IHRydWU7XG4gICAgICAgIGlmIChuZXh0KVxuICAgICAgICAgICAgbmV4dC5wcmV2aW91cyA9IHByZXY7XG4gICAgICAgIGVsc2UgaWYgKF8uX2xhc3QgPT0gbm9kZSlcbiAgICAgICAgICAgIF8uX2xhc3QgPSBwcmV2O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBiID0gdHJ1ZTtcbiAgICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbignbm9kZScsIGZvcm1hdChcIlByb3ZpZGVkIG5vZGUgaXMgaGFzIG5vIHswfSByZWZlcmVuY2UgYnV0IGlzIG5vdCB0aGUgezF9IG5vZGUhXCIsIGEgPyBcInByZXZpb3VzXCIgOiBcIm5leHRcIiwgYSA/IFwiZmlyc3RcIiA6IFwibGFzdFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9ICFhICYmICFiO1xuICAgICAgICBpZiAocmVtb3ZlZCkge1xuICAgICAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICAgICAgXy51bnNhZmVDb3VudC0tO1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IG51bGw7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMge0xpbmtlZE5vZGVMaXN0fVxuICAgICAqL1xuICAgIGFkZE5vZGUobm9kZSkge1xuICAgICAgICB0aGlzLmFkZE5vZGVBZnRlcihub2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBub2RlIGJlZm9yZSB0aGUgc3BlY2lmaWVkICdiZWZvcmUnIG5vZGUuXG4gICAgICogSWYgbm8gJ2JlZm9yZScgbm9kZSBpcyBzcGVjaWZpZWQsIGl0IGluc2VydHMgaXQgYXMgdGhlIGZpcnN0IG5vZGUuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcGFyYW0gYmVmb3JlXG4gICAgICogQHJldHVybnMge0xpbmtlZE5vZGVMaXN0fVxuICAgICAqL1xuICAgIGFkZE5vZGVCZWZvcmUobm9kZSwgYmVmb3JlID0gbnVsbCkge1xuICAgICAgICBhc3NlcnRWYWxpZERldGFjaGVkKG5vZGUpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFiZWZvcmUpIHtcbiAgICAgICAgICAgIGJlZm9yZSA9IF8uX2ZpcnN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChiZWZvcmUpIHtcbiAgICAgICAgICAgIGxldCBwcmV2ID0gYmVmb3JlLnByZXZpb3VzO1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IHByZXY7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBiZWZvcmU7XG4gICAgICAgICAgICBiZWZvcmUucHJldmlvdXMgPSBub2RlO1xuICAgICAgICAgICAgaWYgKHByZXYpXG4gICAgICAgICAgICAgICAgcHJldi5uZXh0ID0gbm9kZTtcbiAgICAgICAgICAgIGlmIChiZWZvcmUgPT0gXy5fZmlyc3QpXG4gICAgICAgICAgICAgICAgXy5fZmlyc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgXy5fZmlyc3QgPSBfLl9sYXN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQrKztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBub2RlIGFmdGVyIHRoZSBzcGVjaWZpZWQgJ2FmdGVyJyBub2RlLlxuICAgICAqIElmIG5vICdhZnRlcicgbm9kZSBpcyBzcGVjaWZpZWQsIGl0IGFwcGVuZHMgaXQgYXMgdGhlIGxhc3Qgbm9kZS5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSBhZnRlclxuICAgICAqIEByZXR1cm5zIHtMaW5rZWROb2RlTGlzdH1cbiAgICAgKi9cbiAgICBhZGROb2RlQWZ0ZXIobm9kZSwgYWZ0ZXIgPSBudWxsKSB7XG4gICAgICAgIGFzc2VydFZhbGlkRGV0YWNoZWQobm9kZSk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIWFmdGVyKSB7XG4gICAgICAgICAgICBhZnRlciA9IF8uX2xhc3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFmdGVyKSB7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IGFmdGVyLm5leHQ7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBuZXh0O1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IGFmdGVyO1xuICAgICAgICAgICAgYWZ0ZXIubmV4dCA9IG5vZGU7XG4gICAgICAgICAgICBpZiAobmV4dClcbiAgICAgICAgICAgICAgICBuZXh0LnByZXZpb3VzID0gbm9kZTtcbiAgICAgICAgICAgIGlmIChhZnRlciA9PSBfLl9sYXN0KVxuICAgICAgICAgICAgICAgIF8uX2xhc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgXy5fZmlyc3QgPSBfLl9sYXN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQrKztcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIGFuZCBleGlzdGluZyBub2RlIGFuZCByZXBsYWNlcyBpdC5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSByZXBsYWNlbWVudFxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgcmVwbGFjZShub2RlLCByZXBsYWNlbWVudCkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbm9kZScpO1xuICAgICAgICBpZiAobm9kZSA9PSByZXBsYWNlbWVudClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBhc3NlcnRWYWxpZERldGFjaGVkKHJlcGxhY2VtZW50LCAncmVwbGFjZW1lbnQnKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJlcGxhY2VtZW50LnByZXZpb3VzID0gbm9kZS5wcmV2aW91cztcbiAgICAgICAgcmVwbGFjZW1lbnQubmV4dCA9IG5vZGUubmV4dDtcbiAgICAgICAgaWYgKG5vZGUucHJldmlvdXMpXG4gICAgICAgICAgICBub2RlLnByZXZpb3VzLm5leHQgPSByZXBsYWNlbWVudDtcbiAgICAgICAgaWYgKG5vZGUubmV4dClcbiAgICAgICAgICAgIG5vZGUubmV4dC5wcmV2aW91cyA9IHJlcGxhY2VtZW50O1xuICAgICAgICBpZiAobm9kZSA9PSBfLl9maXJzdClcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgIGlmIChub2RlID09IF8uX2xhc3QpXG4gICAgICAgICAgICBfLl9sYXN0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIHN0YXRpYyB2YWx1ZUVudW1lcmF0b3JGcm9tKGxpc3QpIHtcbiAgICAgICAgaWYgKCFsaXN0KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbGlzdCcpO1xuICAgICAgICBsZXQgY3VycmVudCwgbmV4dCwgdmVyc2lvbjtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGFuY2hvci4uLlxuICAgICAgICAgICAgY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgICBuZXh0ID0gbGlzdC5maXJzdDtcbiAgICAgICAgICAgIHZlcnNpb24gPSBsaXN0Ll92ZXJzaW9uO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBsaXN0LmFzc2VydFZlcnNpb24odmVyc2lvbik7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICAgICAgbmV4dCA9IGN1cnJlbnQgJiYgY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGNvcHlWYWx1ZXMobGlzdCwgYXJyYXksIGluZGV4ID0gMCkge1xuICAgICAgICBpZiAobGlzdCAmJiBsaXN0LmZpcnN0KSB7XG4gICAgICAgICAgICBpZiAoIWFycmF5KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5Jyk7XG4gICAgICAgICAgICBsaXN0LmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBhcnJheVtpbmRleCArIGldID0gbm9kZS52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG59XG5mdW5jdGlvbiBhc3NlcnRWYWxpZERldGFjaGVkKG5vZGUsIHByb3BOYW1lID0gJ25vZGUnKSB7XG4gICAgaWYgKG5vZGUgPT0gbnVsbClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihwcm9wTmFtZSk7XG4gICAgaWYgKG5vZGUubmV4dCB8fCBub2RlLnByZXZpb3VzKVxuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNhbm5vdCBhZGQgYSBub2RlIHRvIGEgTGlua2VkTm9kZUxpc3QgdGhhdCBpcyBhbHJlYWR5IGxpbmtlZC5cIik7XG59XG5leHBvcnQgZGVmYXVsdCBMaW5rZWROb2RlTGlzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbmtlZE5vZGVMaXN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvTGlua2VkTm9kZUxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5jb25zdCBOVUxMID0gXCJudWxsXCIsIEdFVF9TWU1CT0wgPSBcImdldFN5bWJvbFwiLCBHRVRfSEFTSF9DT0RFID0gXCJnZXRIYXNoQ29kZVwiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldElkZW50aWZpZXIob2JqLCB0aHJvd0lmVW5rbm93biA9IGZhbHNlKSB7XG4gICAgaWYgKFR5cGUuaXNQcm9wZXJ0eUtleShvYmopKVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIGlmIChvYmogPT09IG51bGwpXG4gICAgICAgIHJldHVybiBOVUxMO1xuICAgIGlmIChvYmogPT09IFZPSUQwKVxuICAgICAgICByZXR1cm4gVHlwZS5VTkRFRklORUQ7XG4gICAgLy8gU2VlIElTeW1ib2xpemFibGUuXG4gICAgaWYgKFR5cGUuaGFzTWV0aG9kKG9iaiwgR0VUX1NZTUJPTCkpIHtcbiAgICAgICAgcmV0dXJuIG9iai5nZXRTeW1ib2woKTtcbiAgICB9XG4gICAgLy8gU2VlIElIYXNoYWJsZS5cbiAgICBpZiAoVHlwZS5oYXNNZXRob2Qob2JqLCBHRVRfSEFTSF9DT0RFKSkge1xuICAgICAgICByZXR1cm4gb2JqLmdldEhhc2hDb2RlKCk7XG4gICAgfVxuICAgIGlmICh0aHJvd0lmVW5rbm93bikge1xuICAgICAgICBpZiAoVHlwZS5pc0Z1bmN0aW9uKHRocm93SWZVbmtub3duKSlcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0lmVW5rbm93bihvYmopO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aHJvdyBcIkNhbm5vdCBjcmVhdGUga25vd24gaWRlbnRpdHkuXCI7XG4gICAgfVxuICAgIHJldHVybiAodHlwZW9mIG9iai50b1N0cmluZyA9PSBUeXBlLkZVTkNUSU9OKVxuICAgICAgICA/IG9iai50b1N0cmluZygpXG4gICAgICAgIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG59XG5leHBvcnQgZGVmYXVsdCBnZXRJZGVudGlmaWVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2V0SWRlbnRpZmllci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9nZXRJZGVudGlmaWVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tIFwiLi4vRW51bWVyYXRpb24vRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkJhc2UgfSBmcm9tIFwiLi4vQ29sbGVjdGlvbkJhc2VcIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBleHRyYWN0S2V5VmFsdWUgfSBmcm9tIFwiLi4vLi4vS2V5VmFsdWVFeHRyYWN0XCI7XG5pbXBvcnQgeyBLZXlOb3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9LZXlOb3RGb3VuZEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbi8vIERlc2lnbiBOb3RlOiBTaG91bGQgRGljdGlvbmFyeUFic3RyYWN0QmFzZSBiZSBJRGlzcG9zYWJsZT9cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5QmFzZSBleHRlbmRzIENvbGxlY3Rpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICAgICAgc3VwZXIoc291cmNlKTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfb25WYWx1ZU1vZGlmaWVkKGtleSwgdmFsdWUsIG9sZCkge1xuICAgIH1cbiAgICBfYWRkSW50ZXJuYWwoaXRlbSkge1xuICAgICAgICBpZiAoIWl0ZW0pXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdpdGVtJywgJ0RpY3Rpb25hcmllcyBtdXN0IHVzZSBhIHZhbGlkIGtleS92YWx1ZSBwYWlyLiBcXCcnICsgaXRlbSArICdcXCcgaXMgbm90IGFsbG93ZWQuJyk7XG4gICAgICAgIHJldHVybiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgKGtleSwgdmFsdWUpID0+IHRoaXMuYWRkQnlLZXlWYWx1ZShrZXksIHZhbHVlKSk7XG4gICAgfVxuICAgIF9jbGVhckludGVybmFsKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIF8ua2V5cykge1xuICAgICAgICAgICAgaWYgKF8ucmVtb3ZlQnlLZXkoa2V5KSlcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG4gICAgY29udGFpbnMoaXRlbSkge1xuICAgICAgICAvLyBTaG91bGQgbmV2ZXIgaGF2ZSBhIG51bGwgb2JqZWN0IGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICBpZiAoIWl0ZW0gfHwgIXRoaXMuZ2V0Q291bnQoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RLZXlWYWx1ZShpdGVtLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgLy8gTGVhdmUgYXMgdmFyaWFibGUgZm9yIGRlYnVnZ2luZy4uLlxuICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICByZXR1cm4gYXJlRXF1YWwodmFsdWUsIHYpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3JlbW92ZUludGVybmFsKGl0ZW0pIHtcbiAgICAgICAgaWYgKCFpdGVtKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIHJldHVybiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIC8vIExlYXZlIGFzIHZhcmlhYmxlIGZvciBkZWJ1Z2dpbmcuLi5cbiAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWYWx1ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIChhcmVFcXVhbCh2YWx1ZSwgdikgJiYgdGhpcy5yZW1vdmVCeUtleShrZXkpKVxuICAgICAgICAgICAgICAgID8gMSA6IDA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQga2V5cygpIHsgcmV0dXJuIHRoaXMuZ2V0S2V5cygpOyB9XG4gICAgZ2V0IHZhbHVlcygpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWVzKCk7IH1cbiAgICBhZGRCeUtleVZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBWT0lEMClcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ2Fubm90IGFkZCAndW5kZWZpbmVkJyBhcyBhIHZhbHVlLlwiKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmIChfLmNvbnRhaW5zS2V5KGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ID0gbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJBZGRpbmcgYSBrZXkvdmFsdWUgd2hlbiB0aGUga2V5IGFscmVhZHkgZXhpc3RzLlwiKTtcbiAgICAgICAgICAgIGV4LmRhdGFbJ2tleSddID0ga2V5O1xuICAgICAgICAgICAgZXguZGF0YVsndmFsdWUnXSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhyb3cgZXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8uc2V0VmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIGdldEFzc3VyZWRWYWx1ZShrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gVk9JRDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgS2V5Tm90Rm91bmRFeGNlcHRpb24oYEtleSAnJHtrZXl9JyBub3QgZm91bmQuYCk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdHJ5R2V0VmFsdWUoa2V5LCBvdXQpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gVk9JRDApIHtcbiAgICAgICAgICAgIG91dCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIGFuIGVudHJ5LlxuICAgICAqIEl0J3MgaW1wb3J0YW50IHRvIGtub3cgdGhhdCAndW5kZWZpbmVkJyBjYW5ub3QgZXhpc3QgYXMgYSB2YWx1ZSBpbiB0aGUgZGljdGlvbmFyeSBhbmQgaXMgdXNlZCBhcyBhIGZsYWcgZm9yIHJlbW92YWwuXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHNldFZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgLy8gc2V0VmFsdWUgc2hvdWxkbid0IG5lZWQgdG8gd29ycnkgYWJvdXQgcmVjdXJzaW9uLi4uXG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgb2xkID0gXy5nZXRWYWx1ZShrZXkpOyAvLyBnZXQgdGhlIG9sZCB2YWx1ZSBoZXJlIGFuZCBwYXNzIHRvIGludGVybmFsLlxuICAgICAgICBpZiAoIWFyZUVxdWFsKHZhbHVlLCBvbGQpICYmIF8uX3NldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgXy5fb25WYWx1ZU1vZGlmaWVkKGtleSwgdmFsdWUsIG9sZCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKGNoYW5nZWQpO1xuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG4gICAgY29udGFpbnNLZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2dldEVudHJ5KGtleSk7XG4gICAgfVxuICAgIGNvbnRhaW5zVmFsdWUodmFsdWUpIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICB3aGlsZSAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBpZiAoYXJlRXF1YWwoZS5jdXJyZW50LCB2YWx1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJlbW92ZUJ5S2V5KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRWYWx1ZShrZXksIFZPSUQwKTtcbiAgICB9XG4gICAgcmVtb3ZlQnlWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIF8uZ2V0S2V5cygpKSB7XG4gICAgICAgICAgICBpZiAoYXJlRXF1YWwoXy5nZXRWYWx1ZShrZXkpLCB2YWx1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBfLnJlbW92ZUJ5S2V5KGtleSk7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuICAgIGltcG9ydEVudHJpZXMocGFpcnMpIHtcbiAgICAgICAgLy8gQWxsb3cgcGlwaW5nIHRocm91Z2ggdG8gdHJpZ2dlciBvbk1vZGlmaWVkIHByb3Blcmx5LlxuICAgICAgICByZXR1cm4gc3VwZXIuaW1wb3J0RW50cmllcyhwYWlycyk7XG4gICAgfVxuICAgIF9pbXBvcnRFbnRyaWVzKHBhaXJzKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIXBhaXJzKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGxldCBjaGFuZ2VkID0gMDtcbiAgICAgICAgZm9yRWFjaChwYWlycywgcGFpciA9PiBleHRyYWN0S2V5VmFsdWUocGFpciwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChfLl9zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpKVxuICAgICAgICAgICAgICAgIGNoYW5nZWQrKztcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCB2ZXIsIGtleXMsIGxlbiwgaW5kZXggPSAwO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICB2ZXIgPSBfLl92ZXJzaW9uOyAvLyBUcmFjayB0aGUgdmVyc2lvbiBzaW5jZSBnZXRLZXlzIGlzIGEgY29weS5cbiAgICAgICAgICAgIGtleXMgPSBfLmdldEtleXMoKTtcbiAgICAgICAgICAgIGxlbiA9IGtleXMubGVuZ3RoO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIF8uYXNzZXJ0VmVyc2lvbih2ZXIpO1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpbmRleCsrXSwgdmFsdWUgPSBfLmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBWT0lEMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBEaWN0aW9uYXJ5QmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURpY3Rpb25hcnlCYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRGljdGlvbmFyaWVzL0RpY3Rpb25hcnlCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbi8vIE5lZWQgdG8gc3Bvb2YgdGhpcyBzbyBXZWJQYWNrIGRvZXNuJ3QgcGFuaWMgKHdhcm5pbmdzKS5cbmxldCByO1xudHJ5IHtcbiAgICByID0gZXZhbCgncmVxdWlyZScpO1xufVxuY2F0Y2ggKGV4KSB7IH1cbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuZXhwb3J0IGNvbnN0IGlzQ29tbW9uSlMgPSAhIShyICYmIHIucmVzb2x2ZSk7XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbmV4cG9ydCBjb25zdCBpc1JlcXVpcmVKUyA9ICEhKHIgJiYgci50b1VybCAmJiByLmRlZmluZWQpO1xuLypcbiAqIEVuc3VyZSBpcyBpbiBhIHJlYWwgTm9kZSBlbnZpcm9ubWVudCwgd2l0aCBhIGBwcm9jZXNzLm5leHRUaWNrYC5cbiAqIFRvIHNlZSB0aHJvdWdoIGZha2UgTm9kZSBlbnZpcm9ubWVudHM6XG4gKiBNb2NoYSB0ZXN0IHJ1bm5lciAtIGV4cG9zZXMgYSBgcHJvY2Vzc2AgZ2xvYmFsIHdpdGhvdXQgYSBgbmV4dFRpY2tgXG4gKiBCcm93c2VyaWZ5IC0gZXhwb3NlcyBhIGBwcm9jZXNzLm5leFRpY2tgIGZ1bmN0aW9uIHRoYXQgdXNlc1xuICogYHNldFRpbWVvdXRgLiBJbiB0aGlzIGNhc2UgYHNldEltbWVkaWF0ZWAgaXMgcHJlZmVycmVkIGJlY2F1c2VcbiAqIGl0IGlzIGZhc3Rlci4gQnJvd3NlcmlmeSdzIGBwcm9jZXNzLnRvU3RyaW5nKClgIHlpZWxkc1xuICogXCJbb2JqZWN0IE9iamVjdF1cIiwgd2hpbGUgaW4gYSByZWFsIE5vZGUgZW52aXJvbm1lbnRcbiAqIGBwcm9jZXNzLm5leHRUaWNrKClgIHlpZWxkcyBcIltvYmplY3QgcHJvY2Vzc11cIi5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZUpTID0gdHlwZW9mIHByb2Nlc3MgPT0gXCJvYmplY3RcIlxuICAgICYmIHByb2Nlc3MudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCJcbiAgICAmJiBwcm9jZXNzLm5leHRUaWNrICE9IHZvaWQgMDtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxudHJ5IHtcbiAgICBPYmplY3QuZnJlZXplKGV4cG9ydHMpO1xufVxuY2F0Y2ggKGV4KSB7IH1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVudmlyb25tZW50LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRW52aXJvbm1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuL0V4Y2VwdGlvbnMvQXJndW1lbnRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vVHlwZXNcIjtcbmNvbnN0IFZPSUQwID0gdm9pZCAwLCBET1QgPSAnLicsIEtFWSA9ICdrZXknLCBWQUxVRSA9ICd2YWx1ZScsIElURU0gPSAnaXRlbScsIElURU1fMSA9IElURU0gKyAnWzFdJywgSVRFTV9WQUxVRSA9IElURU0gKyBET1QgKyBWQUxVRSwgSU5WQUxJRF9LVlBfTUVTU0FHRSA9ICdJbnZhbGlkIHR5cGUuICBNdXN0IGJlIGEgS2V5VmFsdWVQYWlyIG9yIFR1cGxlIG9mIGxlbmd0aCAyLicsIENBTk5PVF9CRV9VTkRFRklORUQgPSAnQ2Fubm90IGVxdWFsIHVuZGVmaW5lZC4nO1xuZXhwb3J0IGZ1bmN0aW9uIGlzS2V5VmFsdWVQYWlyKGt2cCkge1xuICAgIHJldHVybiBrdnAgJiYga3ZwLmhhc093blByb3BlcnR5KEtFWSkgJiYga3ZwLmhhc093blByb3BlcnR5KFZBTFVFKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRLZXkoa2V5LCBuYW1lID0gSVRFTSkge1xuICAgIGFzc2VydE5vdFVuZGVmaW5lZChrZXksIG5hbWUgKyBET1QgKyBLRVkpO1xuICAgIGlmIChrZXkgPT09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24obmFtZSArIERPVCArIEtFWSk7XG4gICAgcmV0dXJuIGtleTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRUdXBsZSh0dXBsZSwgbmFtZSA9IElURU0pIHtcbiAgICBpZiAodHVwbGUubGVuZ3RoICE9IDIpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihuYW1lLCAnS2V5VmFsdWVQYWlyIHR1cGxlcyBtdXN0IGJlIG9mIGxlbmd0aCAyLicpO1xuICAgIGFzc2VydEtleSh0dXBsZVswXSwgbmFtZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Tm90VW5kZWZpbmVkKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKHZhbHVlID09PSBWT0lEMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKG5hbWUsIENBTk5PVF9CRV9VTkRFRklORUQpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgdG8pIHtcbiAgICBsZXQga2V5LCB2YWx1ZTtcbiAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShpdGVtKSkge1xuICAgICAgICBhc3NlcnRUdXBsZShpdGVtKTtcbiAgICAgICAga2V5ID0gaXRlbVswXTtcbiAgICAgICAgdmFsdWUgPSBhc3NlcnROb3RVbmRlZmluZWQoaXRlbVsxXSwgSVRFTV8xKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNLZXlWYWx1ZVBhaXIoaXRlbSkpIHtcbiAgICAgICAga2V5ID0gYXNzZXJ0S2V5KGl0ZW0ua2V5KTtcbiAgICAgICAgdmFsdWUgPSBhc3NlcnROb3RVbmRlZmluZWQoaXRlbS52YWx1ZSwgSVRFTV9WQUxVRSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oSVRFTSwgSU5WQUxJRF9LVlBfTUVTU0FHRSk7XG4gICAgfVxuICAgIHJldHVybiB0byhrZXksIHZhbHVlKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RLZXlWYWx1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUtleVZhbHVlRXh0cmFjdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0tleVZhbHVlRXh0cmFjdC5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9zeXN0ZW0uY29sbGVjdGlvbnMuZ2VuZXJpYy5LZXlOb3RGb3VuZEV4Y2VwdGlvbih2PXZzLjExMCkuYXNweFxuICovXG5pbXBvcnQgeyBTeXN0ZW1FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9TeXN0ZW1FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdLZXlOb3RGb3VuZEV4Y2VwdGlvbiAnO1xuZXhwb3J0IGNsYXNzIEtleU5vdEZvdW5kRXhjZXB0aW9uIGV4dGVuZHMgU3lzdGVtRXhjZXB0aW9uIHtcbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBLZXlOb3RGb3VuZEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUtleU5vdEZvdW5kRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvS2V5Tm90Rm91bmRFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4qIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiogQmFzZWQgVXBvbjogaHR0cDovL3JlZmVyZW5jZXNvdXJjZS5taWNyb3NvZnQuY29tLyNTeXN0ZW0vQ29tcE1vZC9zeXN0ZW0vY29sbGVjdGlvbnMvZ2VuZXJpYy9xdWV1ZS5jc1xuKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiovXG5pbXBvcnQgeyBhcmVFcXVhbCB9IGZyb20gXCIuLi9Db21wYXJlXCI7XG5pbXBvcnQgKiBhcyBBVSBmcm9tIFwiLi9BcnJheS9VdGlsaXR5XCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uL1R5cGVzXCI7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uL0ludGVnZXJcIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvTm90SW1wbGVtZW50ZWRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbmltcG9ydCB7IENvbGxlY3Rpb25CYXNlIH0gZnJvbSBcIi4vQ29sbGVjdGlvbkJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5jb25zdCBNSU5JTVVNX0dST1cgPSA0O1xuY29uc3QgU0hSSU5LX1RIUkVTSE9MRCA9IDMyOyAvLyBVbnVzZWQ/XG4vLyB2YXIgR1JPV19GQUNUT1I6IG51bWJlciA9IDIwMDsgIC8vIGRvdWJsZSBlYWNoIHRpbWVcbmNvbnN0IEdST1dfRkFDVE9SX0hBTEYgPSAxMDA7XG5jb25zdCBERUZBVUxUX0NBUEFDSVRZID0gTUlOSU1VTV9HUk9XO1xuY29uc3QgZW1wdHlBcnJheSA9IE9iamVjdC5mcmVlemUoW10pO1xuZXhwb3J0IGNsYXNzIFF1ZXVlIGV4dGVuZHMgQ29sbGVjdGlvbkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgICAgIHN1cGVyKFZPSUQwLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2hlYWQgPSAwO1xuICAgICAgICBfLl90YWlsID0gMDtcbiAgICAgICAgXy5fc2l6ZSA9IDA7XG4gICAgICAgIGlmICghc291cmNlKVxuICAgICAgICAgICAgXy5fYXJyYXkgPSBlbXB0eUFycmF5O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChUeXBlLmlzTnVtYmVyKHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXBhY2l0eSA9IHNvdXJjZTtcbiAgICAgICAgICAgICAgICBhc3NlcnRJbnRlZ2VyWmVyb09yR3JlYXRlcihjYXBhY2l0eSwgXCJjYXBhY2l0eVwiKTtcbiAgICAgICAgICAgICAgICBfLl9hcnJheSA9IGNhcGFjaXR5XG4gICAgICAgICAgICAgICAgICAgID8gQVUuaW5pdGlhbGl6ZShjYXBhY2l0eSlcbiAgICAgICAgICAgICAgICAgICAgOiBlbXB0eUFycmF5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2UgPSBzb3VyY2U7XG4gICAgICAgICAgICAgICAgXy5fYXJyYXkgPSBBVS5pbml0aWFsaXplKFR5cGUuaXNBcnJheUxpa2Uoc2UpXG4gICAgICAgICAgICAgICAgICAgID8gc2UubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIDogREVGQVVMVF9DQVBBQ0lUWSk7XG4gICAgICAgICAgICAgICAgXy5faW1wb3J0RW50cmllcyhzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXy5fY2FwYWNpdHkgPSBfLl9hcnJheS5sZW5ndGg7XG4gICAgfVxuICAgIGdldENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG4gICAgX2FkZEludGVybmFsKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHNpemUgPSBfLl9zaXplO1xuICAgICAgICBsZXQgbGVuID0gXy5fY2FwYWNpdHk7XG4gICAgICAgIGlmIChzaXplID09IGxlbikge1xuICAgICAgICAgICAgbGV0IG5ld0NhcGFjaXR5ID0gbGVuICogR1JPV19GQUNUT1JfSEFMRjtcbiAgICAgICAgICAgIGlmIChuZXdDYXBhY2l0eSA8IGxlbiArIE1JTklNVU1fR1JPVylcbiAgICAgICAgICAgICAgICBuZXdDYXBhY2l0eSA9IGxlbiArIE1JTklNVU1fR1JPVztcbiAgICAgICAgICAgIF8uc2V0Q2FwYWNpdHkobmV3Q2FwYWNpdHkpO1xuICAgICAgICAgICAgbGVuID0gXy5fY2FwYWNpdHk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFpbCA9IF8uX3RhaWw7XG4gICAgICAgIF8uX2FycmF5W3RhaWxdID0gaXRlbTtcbiAgICAgICAgXy5fdGFpbCA9ICh0YWlsICsgMSkgJSBsZW47XG4gICAgICAgIF8uX3NpemUgPSBzaXplICsgMTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgX3JlbW92ZUludGVybmFsKGl0ZW0sIG1heCkge1xuICAgICAgICAvL25vaW5zcGVjdGlvbiBIdG1sVW5rbm93blRhZ1xuICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oXCJJQ29sbGVjdGlvblxcPFRcXD4ucmVtb3ZlIGlzIG5vdCBpbXBsZW1lbnRlZCBpbiBRdWV1ZVxcPFRcXD5cIiArXG4gICAgICAgICAgICBcIiBzaW5jZSBpdCB3b3VsZCByZXF1aXJlIGRlc3Ryb3lpbmcgdGhlIHVuZGVybHlpbmcgYXJyYXkgdG8gcmVtb3ZlIHRoZSBpdGVtLlwiKTtcbiAgICB9XG4gICAgX2NsZWFySW50ZXJuYWwoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBhcnJheSA9IF8uX2FycmF5LCBoZWFkID0gXy5faGVhZCwgdGFpbCA9IF8uX3RhaWwsIHNpemUgPSBfLl9zaXplO1xuICAgICAgICBpZiAoaGVhZCA8IHRhaWwpXG4gICAgICAgICAgICBBVS5jbGVhcihhcnJheSwgaGVhZCwgdGFpbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgQVUuY2xlYXIoYXJyYXksIGhlYWQpO1xuICAgICAgICAgICAgQVUuY2xlYXIoYXJyYXksIDAsIHRhaWwpO1xuICAgICAgICB9XG4gICAgICAgIF8uX2hlYWQgPSAwO1xuICAgICAgICBfLl90YWlsID0gMDtcbiAgICAgICAgXy5fc2l6ZSA9IDA7XG4gICAgICAgIF8udHJpbUV4Y2VzcygpO1xuICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKF8uX2FycmF5ICE9IGVtcHR5QXJyYXkpIHtcbiAgICAgICAgICAgIF8uX2FycmF5Lmxlbmd0aCA9IF8uX2NhcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIF8uX2FycmF5ID0gZW1wdHlBcnJheTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXF1ZXVlcyBlbnRyaWVzIGludG8gYW4gYXJyYXkuXG4gICAgICovXG4gICAgZHVtcChtYXggPSBJbmZpbml0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGlmIChpc0Zpbml0ZShtYXgpKSB7XG4gICAgICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIobWF4KTtcbiAgICAgICAgICAgIGlmIChtYXggIT09IDApIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAobWF4LS0gJiYgXy5fdHJ5RGVxdWV1ZUludGVybmFsKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pKSB7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdoaWxlIChfLl90cnlEZXF1ZXVlSW50ZXJuYWwodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH0pKSB7IH1cbiAgICAgICAgfVxuICAgICAgICBfLnRyaW1FeGNlc3MoKTtcbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5mb3JFYWNoKGFjdGlvbiwgdHJ1ZSk7XG4gICAgfVxuICAgIHNldENhcGFjaXR5KGNhcGFjaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBhc3NlcnRJbnRlZ2VyWmVyb09yR3JlYXRlcihjYXBhY2l0eSwgXCJjYXBhY2l0eVwiKTtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBfLl9hcnJheSwgbGVuID0gXy5fY2FwYWNpdHk7XG4gICAgICAgIGlmIChjYXBhY2l0eSA+IGxlbilcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmIChjYXBhY2l0eSA9PSBsZW4pXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgY29uc3QgaGVhZCA9IF8uX2hlYWQsIHRhaWwgPSBfLl90YWlsLCBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgLy8gU3BlY2lhbCBjYXNlIHdoZXJlIHdlIGNhbiBzaW1wbHkgZXh0ZW5kIHRoZSBsZW5ndGggb2YgdGhlIGFycmF5LiAoSmF2YVNjcmlwdCBvbmx5KVxuICAgICAgICBpZiAoYXJyYXkgIT0gZW1wdHlBcnJheSAmJiBjYXBhY2l0eSA+IGxlbiAmJiBoZWFkIDwgdGFpbCkge1xuICAgICAgICAgICAgYXJyYXkubGVuZ3RoID0gXy5fY2FwYWNpdHkgPSBjYXBhY2l0eTtcbiAgICAgICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlIGNyZWF0ZSBhIG5ldyBhcnJheSBiZWNhdXNlIG1vZGlmeWluZyBhbiBleGlzdGluZyBvbmUgY291bGQgYmUgc2xvdy5cbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBBVS5pbml0aWFsaXplKGNhcGFjaXR5KTtcbiAgICAgICAgaWYgKHNpemUgPiAwKSB7XG4gICAgICAgICAgICBpZiAoaGVhZCA8IHRhaWwpIHtcbiAgICAgICAgICAgICAgICBBVS5jb3B5VG8oYXJyYXksIG5ld0FycmF5LCBoZWFkLCAwLCBzaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEFVLmNvcHlUbyhhcnJheSwgbmV3QXJyYXksIGhlYWQsIDAsIGxlbiAtIGhlYWQpO1xuICAgICAgICAgICAgICAgIEFVLmNvcHlUbyhhcnJheSwgbmV3QXJyYXksIDAsIGxlbiAtIGhlYWQsIHRhaWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF8uX2FycmF5ID0gbmV3QXJyYXk7XG4gICAgICAgIF8uX2NhcGFjaXR5ID0gY2FwYWNpdHk7XG4gICAgICAgIF8uX2hlYWQgPSAwO1xuICAgICAgICBfLl90YWlsID0gKHNpemUgPT0gY2FwYWNpdHkpID8gMCA6IHNpemU7XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbih0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVucXVldWUoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQoaXRlbSk7XG4gICAgfVxuICAgIF90cnlEZXF1ZXVlSW50ZXJuYWwob3V0KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIV8uX3NpemUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gXy5fYXJyYXksIGhlYWQgPSBfLl9oZWFkO1xuICAgICAgICBjb25zdCByZW1vdmVkID0gXy5fYXJyYXlbaGVhZF07XG4gICAgICAgIGFycmF5W2hlYWRdID0gbnVsbDtcbiAgICAgICAgXy5faGVhZCA9IChoZWFkICsgMSkgJSBfLl9jYXBhY2l0eTtcbiAgICAgICAgXy5fc2l6ZS0tO1xuICAgICAgICBfLl9pbmNyZW1lbnRNb2RpZmllZCgpO1xuICAgICAgICBvdXQocmVtb3ZlZCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBkZXF1ZXVlKHRocm93SWZFbXB0eSA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFZPSUQwO1xuICAgICAgICBpZiAoIXRoaXMudHJ5RGVxdWV1ZSh2YWx1ZSA9PiB7IHJlc3VsdCA9IHZhbHVlOyB9KSAmJiB0aHJvd0lmRW1wdHkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNhbm5vdCBkZXF1ZXVlIGFuIGVtcHR5IHF1ZXVlLlwiKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgcXVldWUgaGFzIGVudHJpZXMgYW4gcHVsbHMgYW4gZW50cnkgZnJvbSB0aGUgaGVhZCBvZiB0aGUgcXVldWUgYW5kIHBhc3NlcyBpdCB0byB0aGUgb3V0IGhhbmRsZXIuXG4gICAgICogQHBhcmFtIG91dCBUaGUgJ291dCcgaGFuZGxlciB0aGF0IHJlY2VpdmVzIHRoZSB2YWx1ZSBpZiBpdCBleGlzdHMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgYSB2YWx1ZSB3YXMgcmV0cmlldmVkLiAgRmFsc2UgaWYgbm90LlxuICAgICAqL1xuICAgIHRyeURlcXVldWUob3V0KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIV8uX3NpemUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICAvLyBBIHNpbmdsZSBkZXF1ZXVlIHNob3VsZG4ndCBuZWVkIHVwZGF0ZSByZWN1cnNpb24gdHJhY2tpbmcuLi5cbiAgICAgICAgaWYgKHRoaXMuX3RyeURlcXVldWVJbnRlcm5hbChvdXQpKSB7XG4gICAgICAgICAgICAvLyBUaGlzIG1heSBwcmVlbXB0aXZlbHkgdHJpZ2dlciB0aGUgX29uTW9kaWZpZWQuXG4gICAgICAgICAgICBpZiAoXy5fc2l6ZSA8IF8uX2NhcGFjaXR5IC8gMilcbiAgICAgICAgICAgICAgICBfLnRyaW1FeGNlc3MoU0hSSU5LX1RIUkVTSE9MRCk7XG4gICAgICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgX2dldEVsZW1lbnQoaW5kZXgpIHtcbiAgICAgICAgYXNzZXJ0SW50ZWdlclplcm9PckdyZWF0ZXIoaW5kZXgsIFwiaW5kZXhcIik7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICByZXR1cm4gXy5fYXJyYXlbKF8uX2hlYWQgKyBpbmRleCkgJSBfLl9jYXBhY2l0eV07XG4gICAgfVxuICAgIHBlZWsodGhyb3dJZkVtcHR5ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NpemUgPT0gMCkge1xuICAgICAgICAgICAgaWYgKHRocm93SWZFbXB0eSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNhbm5vdCBjYWxsIHBlZWsgb24gYW4gZW1wdHkgcXVldWUuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFZPSUQwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9hcnJheVt0aGlzLl9oZWFkXTtcbiAgICB9XG4gICAgdHJpbUV4Y2Vzcyh0aHJlc2hvbGQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHNpemUgPSBfLl9zaXplO1xuICAgICAgICBpZiAoc2l6ZSA8IE1hdGguZmxvb3IoXy5fY2FwYWNpdHkgKiAwLjkpICYmICghdGhyZXNob2xkICYmIHRocmVzaG9sZCAhPT0gMCB8fCBpc05hTih0aHJlc2hvbGQpIHx8IHRocmVzaG9sZCA8IHNpemUpKVxuICAgICAgICAgICAgXy5zZXRDYXBhY2l0eShzaXplKTtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBpbmRleCwgdmVyc2lvbiwgc2l6ZTtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gXy5fdmVyc2lvbjtcbiAgICAgICAgICAgIHNpemUgPSBfLl9zaXplO1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIF8uYXNzZXJ0VmVyc2lvbih2ZXJzaW9uKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBzaXplKVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKF8uX2dldEVsZW1lbnQoaW5kZXgrKykpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBhc3NlcnRaZXJvT3JHcmVhdGVyKHZhbHVlLCBwcm9wZXJ0eSkge1xuICAgIGlmICh2YWx1ZSA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24ocHJvcGVydHksIHZhbHVlLCBcIk11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm9cIik7XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBhc3NlcnRJbnRlZ2VyWmVyb09yR3JlYXRlcih2YWx1ZSwgcHJvcGVydHkpIHtcbiAgICBJbnRlZ2VyLmFzc2VydCh2YWx1ZSwgcHJvcGVydHkpO1xuICAgIHJldHVybiBhc3NlcnRaZXJvT3JHcmVhdGVyKHZhbHVlLCBwcm9wZXJ0eSk7XG59XG5leHBvcnQgZGVmYXVsdCBRdWV1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvUXVldWUuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuLi8uLi9JbnRlZ2VyXCI7XG5pbXBvcnQgeyBhcmVFcXVhbCB9IGZyb20gXCIuLi8uLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZSB9IGZyb20gXCIuL2luaXRpYWxpemVcIjtcbmltcG9ydCB7IGNvcHksIGNvcHlUbyB9IGZyb20gXCIuL2NvcHlcIjtcbmV4cG9ydCB7IGluaXRpYWxpemUsIGNvcHksIGNvcHlUbyB9O1xuY29uc3QgQ0JOID0gJ0Nhbm5vdCBiZSBudWxsLicsIENCMCA9ICdDYW5ub3QgYmUgemVyby4nLCBDQkwwID0gJ0Nhbm5vdCBiZSBsZXNzIHRoYW4gemVyby4nLCBWRk4gPSAnTXVzdCBiZSBhIHZhbGlkIGZpbml0ZSBudW1iZXInO1xuLyoqXG4gKiBDaGVja3MgdG8gc2VlIHdoZXJlIHRoZSBwcm92aWRlZCBhcnJheSBjb250YWlucyBhbiBpdGVtL3ZhbHVlLlxuICogSWYgdGhlIGFycmF5IHZhbHVlIGlzIG51bGwsIHRoZW4gLTEgaXMgcmV0dXJuZWQuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBpdGVtXG4gKiBAcGFyYW0ge2Z1bmN0aW9uP30gZXF1YWxpdHlDb21wYXJlclxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgIGNvbnN0IGxlbiA9IGFycmF5ICYmIGFycmF5Lmxlbmd0aDtcbiAgICBpZiAobGVuKSB7XG4gICAgICAgIC8vIE5hTiBORVZFUiBldmFsdWF0ZXMgaXRzIGVxdWFsaXR5IHNvIGJlIGNhcmVmdWwuXG4gICAgICAgIGlmICgoYXJyYXkpIGluc3RhbmNlb2YgKEFycmF5KSAmJiAhVHlwZS5pc1RydWVOYU4oaXRlbSkpXG4gICAgICAgICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgLy8gJ2FyZUVxdWFsJyBpbmNsdWRlcyBOYU49PU5hTiBldmFsdWF0aW9uLlxuICAgICAgICAgICAgaWYgKGVxdWFsaXR5Q29tcGFyZXIoYXJyYXlbaV0sIGl0ZW0pKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbi8qKlxuICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgcHJvdmlkZWQgYXJyYXkgY29udGFpbnMgYW4gaXRlbS5cbiAqIElmIHRoZSBhcnJheSB2YWx1ZSBpcyBudWxsLCB0aGVuIGZhbHNlIGlzIHJldHVybmVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gaXRlbVxuICogQHBhcmFtIHtmdW5jdGlvbj99IGVxdWFsaXR5Q29tcGFyZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyKSAhPSAtMTtcbn1cbi8qKlxuICogRmluZHMgYW5kIHJlcGxhY2VzIGEgdmFsdWUgZnJvbSBhbiBhcnJheS4gIFdpbGwgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyB1bmxlc3MgYSBtYXhpbXVtIGlzIHNwZWNpZmllZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIG9sZFxuICogQHBhcmFtIG5ld1ZhbHVlXG4gKiBAcGFyYW0gbWF4XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShhcnJheSwgb2xkLCBuZXdWYWx1ZSwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoIWFycmF5IHx8ICFhcnJheS5sZW5ndGggfHwgbWF4ID09PSAwKVxuICAgICAgICByZXR1cm4gMDtcbiAgICBpZiAobWF4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbWF4JywgbWF4LCBDQkwwKTtcbiAgICBpZiAoIW1heClcbiAgICAgICAgbWF4ID0gSW5maW5pdHk7IC8vIGp1c3QgaW4gY2FzZS5cbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoYXJyYXlbaV0gPT09IG9sZCkge1xuICAgICAgICAgICAgYXJyYXlbaV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICBpZiAoY291bnQgPT0gbWF4KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbn1cbi8qKlxuICogUmVwbGFjZXMgdmFsdWVzIG9mIGFuIGFycmF5IGFjcm9zcyBhIHJhbmdlIG9mIGluZGV4ZXMuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIHN0YXJ0XG4gKiBAcGFyYW0gc3RvcFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUmFuZ2UoYXJyYXksIHZhbHVlLCBzdGFydCA9IDAsIHN0b3ApIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICByZXR1cm47XG4gICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKHN0YXJ0LCAnc3RhcnQnKTtcbiAgICBpZiAoIXN0b3AgJiYgc3RvcCAhPT0gMClcbiAgICAgICAgc3RvcCA9IGFycmF5Lmxlbmd0aDtcbiAgICBJbnRlZ2VyLmFzc2VydChzdG9wLCAnc3RvcCcpO1xuICAgIGlmIChzdG9wIDwgc3RhcnQpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdG9wXCIsIHN0b3AsIFwiaXMgbGVzcyB0aGFuIHN0YXJ0XCIpO1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHN0b3A7IGkrKykge1xuICAgICAgICBhcnJheVtpXSA9IHZhbHVlO1xuICAgIH1cbn1cbi8qKlxuICogQ2xlYXJzIChzZXRzIHRvIG51bGwpIHZhbHVlcyBvZiBhbiBhcnJheSBhY3Jvc3MgYSByYW5nZSBvZiBpbmRleGVzLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gc3RhcnRcbiAqIEBwYXJhbSBzdG9wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhcihhcnJheSwgc3RhcnQgPSAwLCBzdG9wKSB7XG4gICAgdXBkYXRlUmFuZ2UoYXJyYXksIG51bGwsIHN0YXJ0LCBzdG9wKTtcbn1cbi8qKlxuICogRW5zdXJlcyBhIHZhbHVlIGV4aXN0cyB3aXRoaW4gYW4gYXJyYXkuICBJZiBub3QgZm91bmQsIGFkZHMgdG8gdGhlIGVuZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIGl0ZW1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBlcXVhbGl0eUNvbXBhcmVyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhcnJheScsIENCTik7XG4gICAgbGV0IGxlbiA9IGFycmF5Lmxlbmd0aDsgLy8gYXZvaWQgcXVlcnlpbmcgLmxlbmd0aCBtb3JlIHRoYW4gb25jZS4gKlxuICAgIGNvbnN0IG9rID0gIWxlbiB8fCAhY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIpO1xuICAgIGlmIChvaylcbiAgICAgICAgYXJyYXlbbGVuXSA9IGl0ZW07IC8vICogcHVzaCB3b3VsZCBxdWVyeSBsZW5ndGggYWdhaW4uXG4gICAgcmV0dXJuIG9rO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBpbmRleCBvZiB3aGljaCB0aGUgcHJvdmlkZWQgcHJlZGljYXRlIHJldHVybnMgdHJ1ZS5cbiAqIFJldHVybnMgLTEgaWYgYWx3YXlzIGZhbHNlLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gcHJlZGljYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhcnJheScsIENCTik7XG4gICAgaWYgKCFUeXBlLmlzRnVuY3Rpb24ocHJlZGljYXRlKSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCdwcmVkaWNhdGUnLCAnTXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIGNvbnN0IGxlbiA9IGFycmF5Lmxlbmd0aDtcbiAgICBpZiAoIVR5cGUuaXNOdW1iZXIobGVuLCB0cnVlKSB8fCBsZW4gPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oJ2FycmF5JywgJ0RvZXMgbm90IGhhdmUgYSB2YWxpZCBsZW5ndGguJyk7XG4gICAgaWYgKChhcnJheSkgaW5zdGFuY2VvZiAoQXJyYXkpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaV0sIGkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKGkpIGluIChhcnJheSkgJiYgcHJlZGljYXRlKGFycmF5W2ldLCBpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChzb3VyY2UsIGFjdGlvbikge1xuICAgIGlmIChzb3VyY2UgJiYgYWN0aW9uKSB7XG4gICAgICAgIC8vIERvbid0IGNhY2hlIHRoZSBsZW5ndGggc2luY2UgaXQgaXMgcG9zc2libGUgdGhhdCB0aGUgdW5kZXJseWluZyBhcnJheSBjaGFuZ2VkLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFjdGlvbihzb3VyY2VbaV0sIGkpID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSXMgc2ltaWxhciB0byBBcnJheS5tYXAoKSBidXQgaW5zdGVhZCBvZiByZXR1cm5pbmcgYSBuZXcgYXJyYXksIGl0IHVwZGF0ZXMgdGhlIGV4aXN0aW5nIGluZGV4ZXMuXG4gKiBDYW4gYWxzbyBiZSBhcHBsaWVkIHRvIGEgc3RydWN0dXJlIHRoYXQgaW5kZXhlcyBsaWtlIGFuIGFycmF5LCBidXQgbWF5IG5vdCBiZS5cbiAqIEBwYXJhbSB0YXJnZXRcbiAqIEBwYXJhbSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlUbyh0YXJnZXQsIGZuKSB7XG4gICAgaWYgKHRhcmdldCAmJiBmbikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFyZ2V0W2ldID0gZm4odGFyZ2V0W2ldLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogUmVtb3ZlcyBhbiBlbnRyeSBhdCBhIHNwZWNpZmllZCBpbmRleC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgd2FzIGFibGUgdG8gYmUgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUluZGV4KGFycmF5LCBpbmRleCkge1xuICAgIGlmICghYXJyYXkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5JywgQ0JOKTtcbiAgICBJbnRlZ2VyLmFzc2VydChpbmRleCwgJ2luZGV4Jyk7XG4gICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignaW5kZXgnLCBpbmRleCwgQ0JMMCk7XG4gICAgY29uc3QgZXhpc3RzID0gaW5kZXggPCBhcnJheS5sZW5ndGg7XG4gICAgaWYgKGV4aXN0cylcbiAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gZXhpc3RzO1xufVxuLyoqXG4gKiBGaW5kcyBhbmQgcmVtb3ZlcyBhIHZhbHVlIGZyb20gYW4gYXJyYXkuICBXaWxsIHJlbW92ZSBhbGwgaW5zdGFuY2VzIHVubGVzcyBhIG1heGltdW0gaXMgc3BlY2lmaWVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBtYXhcbiAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBlcXVhbGl0eUNvbXBhcmVyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoZSB2YWx1ZSB3YXMgZm91bmQgYW5kIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUoYXJyYXksIHZhbHVlLCBtYXggPSBJbmZpbml0eSwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgaWYgKCFhcnJheSB8fCAhYXJyYXkubGVuZ3RoIHx8IG1heCA9PT0gMClcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKG1heCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ21heCcsIG1heCwgQ0JMMCk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAoIW1heCB8fCAhaXNGaW5pdGUobWF4KSkge1xuICAgICAgICAvLyBEb24ndCB0cmFjayB0aGUgaW5kZXhlcyBhbmQgcmVtb3ZlIGluIHJldmVyc2UuXG4gICAgICAgIGZvciAobGV0IGkgPSAoYXJyYXkubGVuZ3RoIC0gMSk7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxpdHlDb21wYXJlcihhcnJheVtpXSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIFNpbmNlIHRoZSB1c2VyIHdpbGwgZXhwZWN0IGl0IHRvIGhhcHBlbiBpbiBmb3J3YXJkIG9yZGVyLi4uXG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107IC8vIGluZGV4ZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGVxdWFsaXR5Q29tcGFyZXIoYXJyYXlbaV0sIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGZvdW5kLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gbWF4KVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gZm91bmQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShmb3VuZFtpXSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufVxuLyoqXG4gKiBTaW1wbHkgcmVwZWF0cyBhIHZhbHVlIHRoZSBudW1iZXIgb2YgdGltZXMgc3BlY2lmaWVkLlxuICogQHBhcmFtIGVsZW1lbnRcbiAqIEBwYXJhbSBjb3VudFxuICogQHJldHVybnMge1RbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdChlbGVtZW50LCBjb3VudCkge1xuICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCAnY291bnQnKTtcbiAgICBpZiAoY291bnQgPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdjb3VudCcsIGNvdW50LCBDQkwwKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbml0aWFsaXplKGNvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gZWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogUmV0dXJucyBhIHJhbmdlIG9mIG51bWJlcnMgYmFzZWQgdXBvbiB0aGUgZmlyc3QgdmFsdWUgYW5kIHRoZSBzdGVwIHZhbHVlLlxuICogQHBhcmFtIGZpcnN0XG4gKiBAcGFyYW0gY291bnRcbiAqIEBwYXJhbSBzdGVwXG4gKiBAcmV0dXJucyB7bnVtYmVyW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5nZShmaXJzdCwgY291bnQsIHN0ZXAgPSAxKSB7XG4gICAgaWYgKGlzTmFOKGZpcnN0KSB8fCAhaXNGaW5pdGUoZmlyc3QpKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdmaXJzdCcsIGZpcnN0LCBWRk4pO1xuICAgIGlmIChpc05hTihjb3VudCkgfHwgIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignY291bnQnLCBjb3VudCwgVkZOKTtcbiAgICBpZiAoY291bnQgPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdjb3VudCcsIGNvdW50LCBDQkwwKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbml0aWFsaXplKGNvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gZmlyc3Q7XG4gICAgICAgIGZpcnN0ICs9IHN0ZXA7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIFJldHVybnMgYSByYW5nZSBvZiBudW1iZXJzIGJhc2VkIHVwb24gdGhlIGZpcnN0IHZhbHVlIGFuZCB0aGUgc3RlcCB2YWx1ZSBleGNsdWRpbmcgYW55IG51bWJlcnMgYXQgb3IgYmV5b25kIHRoZSB1bnRpbCB2YWx1ZS5cbiAqIEBwYXJhbSBmaXJzdFxuICogQHBhcmFtIHVudGlsXG4gKiBAcGFyYW0gc3RlcFxuICogQHJldHVybnMge251bWJlcltdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2VVbnRpbChmaXJzdCwgdW50aWwsIHN0ZXAgPSAxKSB7XG4gICAgaWYgKHN0ZXAgPT0gMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignc3RlcCcsIHN0ZXAsIENCMCk7XG4gICAgcmV0dXJuIHJhbmdlKGZpcnN0LCAodW50aWwgLSBmaXJzdCkgLyBzdGVwLCBzdGVwKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkaXN0aW5jdChzb3VyY2UpIHtcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIFtdOyAvLyBBbGxvd2luZyBmb3IgbnVsbCBmYWNpbGl0YXRlcyByZWdleCBmaWx0ZXJpbmcuXG4gICAgY29uc3Qgc2VlbiA9IHt9O1xuICAgIHJldHVybiBzb3VyY2UuZmlsdGVyKGUgPT4gIShlIGluIHNlZW4pICYmIChzZWVuW2VdID0gdHJ1ZSkpO1xufVxuLyoqXG4gKiBUYWtlcyBhbnkgYXJyYXlzIHdpdGhpbiBhbiBhcnJheSBhbmQgaW5zZXJ0cyB0aGUgdmFsdWVzIGNvbnRhaW5lZCB3aXRoaW4gaW4gcGxhY2Ugb2YgdGhhdCBhcnJheS5cbiAqIEZvciBldmVyeSBjb3VudCBoaWdoZXIgdGhhbiAwIGluIHJlY3Vyc2VEZXB0aCBpdCB3aWxsIGF0dGVtcHQgYW4gYWRkaXRpb25hbCBwYXNzLiAgUGFzc2luZyBJbmZpbml0eSB3aWxsIGZsYXR0ZW4gYWxsIGFycmF5cyBjb250YWluZWQuXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIHJlY3Vyc2VEZXB0aFxuICogQHJldHVybnMge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhLCByZWN1cnNlRGVwdGggPSAwKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB4ID0gYVtpXTtcbiAgICAgICAgaWYgKCh4KSBpbnN0YW5jZW9mIChBcnJheSkpIHtcbiAgICAgICAgICAgIGlmIChyZWN1cnNlRGVwdGggPiAwKVxuICAgICAgICAgICAgICAgIHggPSBmbGF0dGVuKHgsIHJlY3Vyc2VEZXB0aCAtIDEpO1xuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCB4Lmxlbmd0aDsgbisrKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHhbbl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXRpbGl0eS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L1V0aWxpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgU3lzdGVtRXhjZXB0aW9uIH0gZnJvbSBcIi4vU3lzdGVtRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnTm90SW1wbGVtZW50ZWRFeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIE5vdEltcGxlbWVudGVkRXhjZXB0aW9uIGV4dGVuZHMgU3lzdGVtRXhjZXB0aW9uIHtcbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU5vdEltcGxlbWVudGVkRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9Ob3RJbXBsZW1lbnRlZEV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgKiBhcyBWYWx1ZXMgZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IFNvcnRDb250ZXh0IH0gZnJvbSBcIi4vU29ydENvbnRleHRcIjtcbmltcG9ydCB7IEZ1bmN0aW9ucyB9IGZyb20gXCIuLi8uLi9GdW5jdGlvbnNcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIEtleVNvcnRlZENvbnRleHQgZXh0ZW5kcyBTb3J0Q29udGV4dCB7XG4gICAgY29uc3RydWN0b3IobmV4dCwgX2tleVNlbGVjdG9yLCBvcmRlciA9IDEgLyogQXNjZW5kaW5nICovLCBjb21wYXJlciA9IFZhbHVlcy5jb21wYXJlKSB7XG4gICAgICAgIHN1cGVyKG5leHQsIGNvbXBhcmVyLCBvcmRlcik7XG4gICAgICAgIHRoaXMuX2tleVNlbGVjdG9yID0gX2tleVNlbGVjdG9yO1xuICAgIH1cbiAgICBjb21wYXJlKGEsIGIpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBrcyA9IF8uX2tleVNlbGVjdG9yO1xuICAgICAgICBpZiAoIWtzIHx8IGtzID09IEZ1bmN0aW9ucy5JZGVudGl0eSlcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5jb21wYXJlKGEsIGIpO1xuICAgICAgICAvLyBXZSBmb3JjZSA8YW55PiBoZXJlIHNpbmNlIGl0IGNhbiBiZSBhIFByaW1pdGl2ZSBvciBJQ29tcGFyYWJsZTxhbnk+XG4gICAgICAgIGNvbnN0IGQgPSBWYWx1ZXMuY29tcGFyZShrcyhhKSwga3MoYikpO1xuICAgICAgICBpZiAoZCA9PSAwICYmIF8uX25leHQpXG4gICAgICAgICAgICByZXR1cm4gXy5fbmV4dC5jb21wYXJlKGEsIGIpO1xuICAgICAgICByZXR1cm4gXy5fb3JkZXIgKiBkO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEtleVNvcnRlZENvbnRleHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1LZXlTb3J0ZWRDb250ZXh0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvU29ydGluZy9LZXlTb3J0ZWRDb250ZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCAqIGFzIFZhbHVlcyBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuZXhwb3J0IGNsYXNzIFNvcnRDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihfbmV4dCwgX2NvbXBhcmVyID0gVmFsdWVzLmNvbXBhcmUsIF9vcmRlciA9IDEgLyogQXNjZW5kaW5nICovKSB7XG4gICAgICAgIHRoaXMuX25leHQgPSBfbmV4dDtcbiAgICAgICAgdGhpcy5fY29tcGFyZXIgPSBfY29tcGFyZXI7XG4gICAgICAgIHRoaXMuX29yZGVyID0gX29yZGVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXJlY3Rpb24gb2YgdGhlIGNvbXBhcmlzb24uXG4gICAgICogQHR5cGUge09yZGVyfVxuICAgICAqL1xuICAgIGdldCBvcmRlcigpIHsgcmV0dXJuIHRoaXMuX29yZGVyOyB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGFuIGFycmF5IG9mIGluZGV4ZXMgZnJvbSB0aGUgc291cmNlIGluIG9yZGVyIG9mIHRoZWlyIGV4cGVjdGVkIGludGVybmFsU29ydCB3aXRob3V0IG1vZGlmeWluZyB0aGUgc291cmNlLlxuICAgICAqIEBwYXJhbSBzb3VyY2VcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XG4gICAgICovXG4gICAgZ2VuZXJhdGVTb3J0ZWRJbmRleGVzKHNvdXJjZSkge1xuICAgICAgICBpZiAoc291cmNlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHNvdXJjZS5tYXAoKHMsIGkpID0+IGkpO1xuICAgICAgICByZXN1bHQuc29ydCgoYSwgYikgPT4gdGhpcy5jb21wYXJlKHNvdXJjZVthXSwgc291cmNlW2JdKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXBhcmVzIHR3byB2YWx1ZXMgYmFzZWQgdXBvbiBTb3J0Q29udGV4dCBwYXJhbWV0ZXJzLlxuICAgICAqIEBwYXJhbSBhXG4gICAgICogQHBhcmFtIGJcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGNvbXBhcmUoYSwgYikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZCA9IF8uX2NvbXBhcmVyKGEsIGIpO1xuICAgICAgICBpZiAoZCA9PSAwICYmIF8uX25leHQpXG4gICAgICAgICAgICByZXR1cm4gXy5fbmV4dC5jb21wYXJlKGEsIGIpO1xuICAgICAgICByZXR1cm4gXy5fb3JkZXIgKiBkO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNvcnRDb250ZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U29ydENvbnRleHQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9Tb3J0aW5nL1NvcnRDb250ZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVRcbiAqL1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuL0ludGVnZXJcIjtcbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tIFwiLi9Db2xsZWN0aW9ucy9BcnJheS9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBzaHVmZmxlIGFzIGFycmF5U2h1ZmZsZSB9IGZyb20gXCIuL0NvbGxlY3Rpb25zL0FycmF5L3NodWZmbGVcIjtcbnZhciBhc3NlcnQgPSBJbnRlZ2VyLmFzc2VydDtcbi8qKlxuICogVGhpcyBtb2R1bGUgb25seSBhY3RzIGFzIGEgdXRpbGl0eSBBUEkgZm9yIGdldHRpbmcgcmFuZG9tIG51bWJlcnMgZnJvbSBNYXRoLnJhbmRvbSgpLlxuICogSWYgeW91IG5lZWQgcmVwZWF0YWJsZSBzZWVkZWQgcmFuZG9tIG51bWJlcnMgdGhlbiB5b3UnbGwgbmVlZCBhIHNlcGFyYXRlIHV0aWxpdHkuXG4gKiBIaWdobHkgcmVjb21tZW5kZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9ja2tuaWdodC9yYW5kb20tanMgd2hpY2ggaGFzIHR5cGluZ3MgdW5kZXIgQHR5cGVzL3JhbmRvbS1qcy5cbiAqL1xuZXhwb3J0IHZhciBSYW5kb207XG4oZnVuY3Rpb24gKFJhbmRvbSkge1xuICAgIGZ1bmN0aW9uIHIobWF4RXhjbHVzaXZlID0gMSkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4RXhjbHVzaXZlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbnIoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICBjb25zdCBhID0gTWF0aC5hYnMoYm91bmRhcnkpO1xuICAgICAgICBpZiAoYSA9PT0gMCB8fCBhID09PSAxICYmICFpbmNsdXNpdmUpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgaWYgKGluY2x1c2l2ZSlcbiAgICAgICAgICAgIGJvdW5kYXJ5ICs9IGJvdW5kYXJ5IC8gYTtcbiAgICAgICAgcmV0dXJuIHIoYm91bmRhcnkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhcnJheUNvcHkoc291cmNlKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGluaXRpYWxpemUobGVuKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBmcm9tIDAgdG8gdGhlIG1heEV4Y2x1c2l2ZS5cbiAgICAgKiBOZWdhdGl2ZSBudW1iZXJzIGFyZSBhbGxvd2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1heEV4Y2x1c2l2ZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gaW50ZWdlcihtYXhFeGNsdXNpdmUpIHtcbiAgICAgICAgcmV0dXJuIG5leHQobWF4RXhjbHVzaXZlKTtcbiAgICB9XG4gICAgUmFuZG9tLmludGVnZXIgPSBpbnRlZ2VyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyByYW5kb20gZmxvYXRpbmcgcG9pbnQgbnVtYmVycyB1cCB0byB0aGUgbWF4RXhjbHVzaXZlIHZhbHVlLlxuICAgICAqIFVzZWZ1bCBmb3IgZ2VuZXJhdGluZyBhIHJhbmRvbSBhbmQgbWVtb2l6YWJsZSBzZXQgZm9yIHVzZSB3aXRoIG90aGVyIGVudW1lcmFibGVzLlxuICAgICAqIEBwYXJhbSBtYXhFeGNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyB7KCk9Pm51bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZShtYXhFeGNsdXNpdmUgPSAxKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiByKG1heEV4Y2x1c2l2ZSk7XG4gICAgfVxuICAgIFJhbmRvbS5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xuICAgIChmdW5jdGlvbiAoZ2VuZXJhdGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyByYW5kb20gaW50ZWdlcnMgdXAgdG8gdGhlIGJvdW5kYXJ5LlxuICAgICAgICAgKiBVc2VmdWwgZm9yIGdlbmVyYXRpbmcgYSByYW5kb20gYW5kIG1lbW9pemFibGUgc2V0IGZvciB1c2Ugd2l0aCBvdGhlciBlbnVtZXJhYmxlcy5cbiAgICAgICAgICogQHBhcmFtIGJvdW5kYXJ5XG4gICAgICAgICAqIEBwYXJhbSBpbmNsdXNpdmVcbiAgICAgICAgICogQHJldHVybnMgeygpPT5udW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBpbnRlZ2Vycyhib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2VuZXJhdGUuaW50ZWdlcnMgPSBpbnRlZ2VycztcbiAgICB9KShnZW5lcmF0ZSA9IFJhbmRvbS5nZW5lcmF0ZSB8fCAoUmFuZG9tLmdlbmVyYXRlID0ge30pKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgZnJvbSAwIHRvIHRoZSBib3VuZGFyeS5cbiAgICAgKiBSZXR1cm4gdmFsdWUgd2lsbCBiZSBsZXNzIHRoYW4gdGhlIGJvdW5kYXJ5IHVubGVzcyBpbmNsdXNpdmUgaXMgc2V0IHRvIHRydWUuXG4gICAgICogTmVnYXRpdmUgbnVtYmVycyBhcmUgYWxsb3dlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBib3VuZGFyeVxuICAgICAqIEBwYXJhbSBpbmNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5leHQoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICBhc3NlcnQoYm91bmRhcnksICdib3VuZGFyeScpO1xuICAgICAgICByZXR1cm4gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgfVxuICAgIFJhbmRvbS5uZXh0ID0gbmV4dDtcbiAgICAoZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgZnVuY3Rpb24gaW50ZWdlcihib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gUmFuZG9tLm5leHQoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dC5pbnRlZ2VyID0gaW50ZWdlcjtcbiAgICAgICAgZnVuY3Rpb24gZmxvYXQoYm91bmRhcnkgPSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4oYm91bmRhcnkpKVxuICAgICAgICAgICAgICAgIHRocm93IFwiJ2JvdW5kYXJ5JyBpcyBub3QgYSBudW1iZXIuXCI7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIGJvdW5kYXJ5O1xuICAgICAgICB9XG4gICAgICAgIG5leHQuZmxvYXQgPSBmbG9hdDtcbiAgICAgICAgZnVuY3Rpb24gaW5SYW5nZShtaW4sIG1heCwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICBhc3NlcnQobWluLCAnbWluJyk7XG4gICAgICAgICAgICBhc3NlcnQobWF4LCAnbWF4Jyk7XG4gICAgICAgICAgICBsZXQgcmFuZ2UgPSBtYXggLSBtaW47XG4gICAgICAgICAgICBpZiAocmFuZ2UgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgICAgIGlmIChpbmNsdXNpdmUpXG4gICAgICAgICAgICAgICAgcmFuZ2UgKz0gcmFuZ2UgLyBNYXRoLmFicyhyYW5nZSk7XG4gICAgICAgICAgICByZXR1cm4gbWluICsgcihyYW5nZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dC5pblJhbmdlID0gaW5SYW5nZTtcbiAgICB9KShuZXh0ID0gUmFuZG9tLm5leHQgfHwgKFJhbmRvbS5uZXh0ID0ge30pKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHJhbmRvbSBpbnRlZ2Vycy5cbiAgICAgKiBAcGFyYW0gY291bnRcbiAgICAgKiBAcGFyYW0gYm91bmRhcnlcbiAgICAgKiBAcGFyYW0gaW5jbHVzaXZlXG4gICAgICogQHJldHVybnMge251bWJlcltdfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGludGVnZXJzKGNvdW50LCBib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgIGFzc2VydChjb3VudCk7XG4gICAgICAgIGNvbnN0IHMgPSBbXTtcbiAgICAgICAgcy5sZW5ndGggPSBjb3VudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBzW2ldID0gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIFJhbmRvbS5pbnRlZ2VycyA9IGludGVnZXJzO1xuICAgIC8qKlxuICAgICAqIFNodWZmbGVzIGFuIGFycmF5LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyB7VH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzaHVmZmxlKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gYXJyYXlTaHVmZmxlKHRhcmdldCk7XG4gICAgfVxuICAgIFJhbmRvbS5zaHVmZmxlID0gc2h1ZmZsZTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY29weSBvZiBhbiBhcnJheS1saWtlICBhbmQgcmV0dXJucyBpdCBzaHVmZmxlZC5cbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHJldHVybnMge1RbXX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb3B5KHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gYXJyYXlTaHVmZmxlKGFycmF5Q29weShzb3VyY2UpKTtcbiAgICB9XG4gICAgUmFuZG9tLmNvcHkgPSBjb3B5O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBkaXN0aW5jdCByYW5kb20gc2V0IGZyb20gdGhlIHNvdXJjZSBhcnJheSB1cCB0byB0aGUgbWF4Q291bnQgb3IgdGhlIGZ1bGwgbGVuZ3RoIG9mIHRoZSBhcnJheS5cbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHBhcmFtIG1heENvdW50XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZWxlY3Qoc291cmNlLCBtYXhDb3VudCkge1xuICAgICAgICBpZiAobWF4Q291bnQgIT09IEluZmluaXR5KVxuICAgICAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKG1heENvdW50KTtcbiAgICAgICAgc3dpdGNoIChtYXhDb3VudCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gW3NlbGVjdC5vbmUoc291cmNlLCB0cnVlKV07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBhcnJheVNodWZmbGUoYXJyYXlDb3B5KHNvdXJjZSkpO1xuICAgICAgICAgICAgICAgIGlmIChtYXhDb3VudCA8IHJlc3VsdC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5sZW5ndGggPSBtYXhDb3VudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFJhbmRvbS5zZWxlY3QgPSBzZWxlY3Q7XG4gICAgKGZ1bmN0aW9uIChzZWxlY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gb25lKHNvdXJjZSwgdGhyb3dJZkVtcHR5KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZVtyKHNvdXJjZS5sZW5ndGgpXTtcbiAgICAgICAgICAgIGlmICh0aHJvd0lmRW1wdHkpXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJDYW5ub3Qgc2VsZWN0IGZyb20gYW4gZW1wdHkgc2V0LlwiO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdC5vbmUgPSBvbmU7XG4gICAgfSkoc2VsZWN0ID0gUmFuZG9tLnNlbGVjdCB8fCAoUmFuZG9tLnNlbGVjdCA9IHt9KSk7XG59KShSYW5kb20gfHwgKFJhbmRvbSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SYW5kb20uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9SYW5kb20uanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuLyoqXG4gKiBSYW5kb21pemUgYXJyYXkgZWxlbWVudCBvcmRlciBpbi1wbGFjZS5cbiAqIFVzaW5nIER1cnN0ZW5mZWxkIHNodWZmbGUgYWxnb3JpdGhtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2h1ZmZsZSh0YXJnZXQpIHtcbiAgICBsZXQgaSA9IHRhcmdldC5sZW5ndGg7XG4gICAgd2hpbGUgKC0taSkge1xuICAgICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgIGNvbnN0IHRlbXAgPSB0YXJnZXRbaV07XG4gICAgICAgIHRhcmdldFtpXSA9IHRhcmdldFtqXTtcbiAgICAgICAgdGFyZ2V0W2pdID0gdGVtcDtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNodWZmbGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9zaHVmZmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogT3JpZ2luOiBodHRwOi8vd3d3LmZhbGxpbmdjYW5iZWRlYWRseS5jb20vXG4gKiBMaWNlbnNpbmc6IE1JVFxuICovXG5pbXBvcnQgeyBSZWFkT25seUNvbGxlY3Rpb25CYXNlIH0gZnJvbSBcIi4vUmVhZE9ubHlDb2xsZWN0aW9uQmFzZVwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uL0ludGVnZXJcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIExhenlMaXN0IGV4dGVuZHMgUmVhZE9ubHlDb2xsZWN0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2VudW1lcmF0b3IgPSBzb3VyY2UuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICB0aGlzLl9jYWNoZWQgPSBbXTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZW51bWVyYXRvcjtcbiAgICAgICAgdGhpcy5fZW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgIGlmIChlKVxuICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIHRoaXMuX2NhY2hlZCA9IG51bGw7XG4gICAgICAgIGlmIChjKVxuICAgICAgICAgICAgYy5sZW5ndGggPSAwO1xuICAgIH1cbiAgICBfZ2V0Q291bnQoKSB7XG4gICAgICAgIHRoaXMuZmluaXNoKCk7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIHJldHVybiBjID8gYy5sZW5ndGggOiAwO1xuICAgIH1cbiAgICBfZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgY3VycmVudCA9IDA7XG4gICAgICAgIH0sIHlpZWxkZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnJlbnQgPCBjLmxlbmd0aCB8fCB0aGlzLmdldE5leHQoKSlcbiAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oY1tjdXJyZW50KytdKVxuICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQoaW5kZXgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4KTtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuX2NhY2hlZDtcbiAgICAgICAgd2hpbGUgKGMubGVuZ3RoIDw9IGluZGV4ICYmIHRoaXMuZ2V0TmV4dCgpKSB7IH1cbiAgICAgICAgaWYgKGluZGV4IDwgYy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gY1tpbmRleF07XG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJpbmRleFwiLCBcIkdyZWF0ZXIgdGhhbiB0b3RhbCBjb3VudC5cIik7XG4gICAgfVxuICAgIGluZGV4T2YoaXRlbSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBjID0gdGhpcy5fY2FjaGVkO1xuICAgICAgICBsZXQgcmVzdWx0ID0gYy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICB3aGlsZSAocmVzdWx0ID09IC0xICYmIHRoaXMuZ2V0TmV4dCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gaXRlbSlcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjLmxlbmd0aCAtIDE7XG4gICAgICAgIH0pKSB7IH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29udGFpbnMoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKGl0ZW0pICE9IC0xO1xuICAgIH1cbiAgICBnZXROZXh0KG91dCkge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZW51bWVyYXRvcjtcbiAgICAgICAgaWYgKCFlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlZC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChvdXQpXG4gICAgICAgICAgICAgICAgb3V0KHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9lbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZpbmlzaCgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dCgpKSB7IH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MYXp5TGlzdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0xhenlMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IENvbGxlY3Rpb25CYXNlIH0gZnJvbSBcIi4vQ29sbGVjdGlvbkJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIFJlYWRPbmx5Q29sbGVjdGlvbkJhc2UgZXh0ZW5kcyBDb2xsZWN0aW9uQmFzZSB7XG4gICAgZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDb3VudCgpO1xuICAgIH1cbiAgICBnZXRJc1JlYWRPbmx5KCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfYWRkSW50ZXJuYWwoZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIF9yZW1vdmVJbnRlcm5hbChlbnRyeSwgbWF4KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBfY2xlYXJJbnRlcm5hbCgpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRFbnVtZXJhdG9yKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUmVhZE9ubHlDb2xsZWN0aW9uQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlYWRPbmx5Q29sbGVjdGlvbkJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9SZWFkT25seUNvbGxlY3Rpb25CYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogLk5FVCBSZWZlcmVuY2U6IGh0dHA6Ly9yZWZlcmVuY2Vzb3VyY2UubWljcm9zb2Z0LmNvbS8jbXNjb3JsaWIvc3lzdGVtL3RleHQvU3RyaW5nQnVpbGRlci5jc1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vVHlwZXNcIjtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSU1QT1JUQU5UIE5PVEVTIEFCT1VUIFBFUkZPUk1BTkNFOlxuICogaHR0cDovL2pzcGVyZi5jb20vc3RyaW5nLWNvbmNhdGVuYXRpb24tbG9vcGVkXG4gKiBodHRwOi8vanNwZXJmLmNvbS9hZGRpbmctc3RyaW5ncy10by1hbi1hcnJheVxuICogaHR0cDovL2pzcGVyZi5jb20vc3RyaW5nLWNvbmNhdGVuYXRpb24tdmVyc3VzLWFycmF5LW9wZXJhdGlvbnMtd2l0aC1qb2luXG4gKlxuICogSXQgaXMgY2xlYXJseSBpbmVmZmljaWVudCB0byB1c2UgYSBTdHJpbmdCdWlsZGVyIG9yIExpbmtlZExpc3QgdG8gYnVpbGQgYSBzdHJpbmcgd2hlbiB5b3UgaGF2ZSBhIHNtYWxsIHNldCBvZiBzdHJpbmcgcG9ydGlvbnMuXG4gKiBTdHJpbmdCdWlsZGVyIHdpbGwgcmVhbGx5IHNob3cgaXQncyBiZW5lZml0IGxpa2VseSBzb21ld2hlcmUgYWJvdmUgMTAwMCBpdGVtcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IEVNUFRZID0gXCJcIjtcbmNvbnN0IE5FV0xJTkUgPSBcIlxcclxcblwiO1xuZXhwb3J0IGNsYXNzIFN0cmluZ0J1aWxkZXIge1xuICAgIGNvbnN0cnVjdG9yKC4uLmluaXRpYWwpIHtcbiAgICAgICAgdGhpcy5fbGF0ZXN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFydEFycmF5ID0gW107XG4gICAgICAgIHRoaXMuYXBwZW5kVGhlc2UoaW5pdGlhbCk7XG4gICAgfVxuICAgIGFwcGVuZFNpbmdsZShpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICAgICAgXy5fbGF0ZXN0ID0gbnVsbDtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGUuT0JKRUNUOlxuICAgICAgICAgICAgICAgIGNhc2UgVHlwZS5GVU5DVElPTjpcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfLl9wYXJ0QXJyYXkucHVzaChpdGVtKTsgLy8gT3RoZXIgcHJpbWl0aXZlIHR5cGVzIGNhbiBrZWVwIHRoZWlyIGZvcm1hdCBzaW5jZSBhIG51bWJlciBvciBib29sZWFuIGlzIGEgc21hbGxlciBmb290cHJpbnQgdGhhbiBhIHN0cmluZy5cbiAgICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRUaGVzZShpdGVtcykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaXRlbXMuZm9yRWFjaChzID0+IF8uYXBwZW5kU2luZ2xlKHMpKTtcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIGFwcGVuZCguLi5pdGVtcykge1xuICAgICAgICB0aGlzLmFwcGVuZFRoZXNlKGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFwcGVuZExpbmUoLi4uaXRlbXMpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRMaW5lcyhpdGVtcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhcHBlbmRMaW5lcyhpdGVtcykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGlmIChpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBfLmFwcGVuZFNpbmdsZShpKTtcbiAgICAgICAgICAgICAgICBfLl9wYXJ0QXJyYXkucHVzaChORVdMSU5FKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBfO1xuICAgIH1cbiAgICAvKiogLy8vIFRoZXNlIG1ldGhvZHMgY2FuIG9ubHkgZWZmaWNpZW50bHkgYmUgYWRkZWQgaWYgbm90IHVzaW5nIGEgc2luZ2xlIGFycmF5LlxuICAgICBpbnNlcnQoaW5kZXg6IG51bWJlciwgdmFsdWU6IHN0cmluZywgY291bnQ6IG51bWJlciA9IDEpOiBTdHJpbmdCdWlsZGVyXG4gICAgIHtcbiAgICB9XG4gICAgIHJlbW92ZShzdGFydEluZGV4Om51bWJlciwgbGVuZ3RoOm51bWJlcik6IFN0cmluZ0J1aWxkZXJcbiAgICAge1xuICAgIH1cbiAgICAgLyoqL1xuICAgIGdldCBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFydEFycmF5Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGxldCBsYXRlc3QgPSB0aGlzLl9sYXRlc3Q7XG4gICAgICAgIGlmIChsYXRlc3QgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuX2xhdGVzdCA9IGxhdGVzdCA9IHRoaXMuX3BhcnRBcnJheS5qb2luKEVNUFRZKTtcbiAgICAgICAgcmV0dXJuIGxhdGVzdDtcbiAgICB9XG4gICAgam9pbihkZWxpbWl0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnRBcnJheS5qb2luKGRlbGltaXRlcik7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9wYXJ0QXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fbGF0ZXN0ID0gbnVsbDtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFN0cmluZ0J1aWxkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdHJpbmdCdWlsZGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vVGV4dC9TdHJpbmdCdWlsZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSJdLCJzb3VyY2VSb290IjoiIn0=