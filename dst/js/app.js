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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Text_Utility__ = __webpack_require__(18);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Disposable_DisposableBase__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Disposable_ObjectPool__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__IteratorResult__ = __webpack_require__(14);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exception__ = __webpack_require__(29);
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ObjectDisposedException__ = __webpack_require__(20);
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(7);
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
/* 10 */
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
/* 11 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ArrayEnumerator__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__IndexEnumerator__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__InfiniteEnumerator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__EmptyEnumerator__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__IteratorEnumerator__ = __webpack_require__(26);
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Enumeration_Enumerator__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_InvalidOperationException__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Disposable_DisposableBase__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Environment__ = __webpack_require__(37);
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = copy;
/* harmony export (immutable) */ __webpack_exports__["b"] = copyTo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__initialize__ = __webpack_require__(10);
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
/* 18 */
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IndexEnumerator__ = __webpack_require__(13);
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_InvalidOperationException__ = __webpack_require__(9);
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DisposableBase__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__ = __webpack_require__(31);
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__ = __webpack_require__(7);
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__ = __webpack_require__(24);
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IteratorResult__ = __webpack_require__(14);
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IteratorResult__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Functions__ = __webpack_require__(15);
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
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__ = __webpack_require__(24);
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
/* 27 */
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
var Linq_1 = __webpack_require__(28);
var Startup = /** @class */function () {
    function Startup() {}
    Startup.generator = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, 1];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, 2];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, 3];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    Startup.main = function () {
        var arr = Startup.generator();
        var enu = Linq_1.default.fromAny(arr);
        var i = enu.elementAtOrDefault(1);
        console.log(i);
        return 0;
    };
    return Startup;
}();
Startup.main();

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["Enumerable"] = Enumerable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__System_Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__System_Collections_Array_copy__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__System_Collections_Array_Compare__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__System_Collections_Enumeration_EmptyEnumerator__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__System_Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__System_Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__System_Functions__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__System_Collections_Enumeration_ArrayEnumerator__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__System_Disposable_DisposableBase__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__System_Collections_Enumeration_UnsupportedEnumerableException__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__System_Disposable_ObjectDisposedException__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__System_Collections_Sorting_KeySortedContext__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__System_Collections_Enumeration_IndexEnumerator__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__System_Collections_Enumeration_IteratorEnumerator__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__System_Collections_Array_initialize__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__System_Random__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__System_Collections_Enumeration_InfiniteEnumerator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__System_Collections_LazyList__ = __webpack_require__(48);
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
/* 29 */
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
/* 30 */
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TaskHandlerBase__ = __webpack_require__(32);
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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Disposable_DisposableBase__ = __webpack_require__(8);
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
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LinkedNodeList__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Disposable_ObjectPool__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__getIdentifier__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DictionaryBase__ = __webpack_require__(36);
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Text_Utility__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_InvalidOperationException__ = __webpack_require__(9);
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
/* 35 */
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
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Enumeration_Enumerator__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CollectionBase__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_InvalidOperationException__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__KeyNotFoundException__ = __webpack_require__(40);
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
/* 37 */
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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(38)))

/***/ }),
/* 38 */
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
/* 39 */
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
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__ = __webpack_require__(7);
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
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Array_Utility__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_NotImplementedException__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Exceptions_InvalidOperationException__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CollectionBase__ = __webpack_require__(16);
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
/* 42 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__initialize__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__copy__ = __webpack_require__(17);
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
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(7);
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
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SortContext__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Functions__ = __webpack_require__(15);
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
/* 45 */
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
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Random; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collections_Array_initialize__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collections_Array_shuffle__ = __webpack_require__(47);
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
/* 47 */
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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ReadOnlyCollectionBase__ = __webpack_require__(49);
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
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CollectionBase__ = __webpack_require__(16);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIGRiYzY5YzAzZTQxNGViN2Y4Y2E2IiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUeXBlcy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29tcGFyZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnROdWxsRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxBcmd1bWVudEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVudW1lcmF0b3JCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxJbnRlZ2VyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxTeXN0ZW1FeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXERpc3Bvc2FibGVcXERpc3Bvc2FibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGluaXRpYWxpemUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcRW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcZGlzcG9zZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJbmRleEVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSXRlcmF0b3JSZXN1bHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEZ1bmN0aW9ucy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXENvbGxlY3Rpb25CYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGNvcHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRleHRcXFV0aWxpdHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcQXJyYXlFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxEaXNwb3NhYmxlXFxPYmplY3REaXNwb3NlZEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcT2JqZWN0UG9vbC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSW5maW5pdGVFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXFNpbXBsZUVudW1lcmFibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVtcHR5RW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJdGVyYXRvckVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXHNyY1xcdHNcXGFwcC50cyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbS5MaW5xXFxMaW5xLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxBcnJheVxcQ29tcGFyZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcVGhyZWFkaW5nXFxUYXNrc1xcVGFza0hhbmRsZXIuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRocmVhZGluZ1xcVGFza3NcXFRhc2tIYW5kbGVyQmFzZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXERpY3Rpb25hcmllc1xcRGljdGlvbmFyeS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXExpbmtlZE5vZGVMaXN0LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRGljdGlvbmFyaWVzXFxnZXRJZGVudGlmaWVyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRGljdGlvbmFyaWVzXFxEaWN0aW9uYXJ5QmFzZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRW52aXJvbm1lbnQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xccHJvY2Vzc1xcYnJvd3Nlci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcS2V5VmFsdWVFeHRyYWN0LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcS2V5Tm90Rm91bmRFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxRdWV1ZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEFycmF5XFxVdGlsaXR5LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXFNvcnRpbmdcXEtleVNvcnRlZENvbnRleHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxTb3J0aW5nXFxTb3J0Q29udGV4dC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcUmFuZG9tLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXHNodWZmbGUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxMYXp5TGlzdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXFJlYWRPbmx5Q29sbGVjdGlvbkJhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0lBQWdJLDZEQUE2RCxFQUFFO0FBQy9MO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9CQUFvQjtBQUNyQjtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7QUNqV0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEZBQTBGO0FBQzFGO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7QUMvRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxVQUFVO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLGlEOzs7Ozs7OztBQ2pCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDWDtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msa0JBQWtCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSw2Qzs7Ozs7OztBQ3hCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsWUFBWTtBQUN6QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsdUQ7Ozs7Ozs7Ozs7QUNuQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ1U7QUFDSjtBQUNJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCLEVBQUU7QUFDM0MsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSwwQzs7Ozs7Ozs7O0FDck5BO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDNEI7QUFDVTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEJBQTBCO0FBQzNCO0FBQ0EsbUM7Ozs7Ozs7QUN2RkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7QUN2QkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7QUN2Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EscUQ7Ozs7Ozs7O0FDZEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2dCO0FBQ0Q7QUFDVztBQUNBO0FBQ2U7QUFDWjtBQUNNO0FBQ047QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2QkFBNkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxlQUFlLEVBQUU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw0QkFBNEIsRUFBRTtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7O0FDM0pBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyw4Q0FBOEM7QUFDbkQsQ0FBQywwQkFBMEI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGFBQWE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7O0FDaktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSwyQzs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCO0FBQ3BEO0FBQ0EsQ0FBQyx3Q0FBd0M7QUFDekM7QUFDQTtBQUNBLDBDOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUIsVUFBVTtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYSxjQUFjO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7QUM1REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQjtBQUNDO0FBQ2E7QUFDSTtBQUNYO0FBQ21CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUJBQXVCO0FBQ2pEO0FBQ0Esc0JBQXNCLG1DQUFtQztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0EsMEM7Ozs7Ozs7Ozs7O0FDaFhBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDcUI7QUFDVztBQUNNO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixZQUFZO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0M7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixXQUFXO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QyxzREFBc0QsRUFBRTtBQUN4RCxxREFBcUQsT0FBTztBQUM1RDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLEtBQUssSUFBSTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7O0FDM0lBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDWDtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDckJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxtRDs7Ozs7Ozs7Ozs7QUMvQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDa0I7QUFDTztBQUNIO0FBQ2dCO0FBQ1Y7QUFDNUI7QUFDQSxzTEFBc0wsa0JBQWtCO0FBQ3hNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHNDOzs7Ozs7O0FDcktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDBEOzs7Ozs7O0FDakJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsOEM7Ozs7Ozs7QUNwQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsZ0Q7Ozs7Ozs7O0FDakVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDTDtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFBQTtBQUFBO0FBQ0Q7QUFDQSwyQzs7Ozs7OztBQ3hCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQytCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSw4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0N1QztBQUN2QyxpQ0FBb0Y7QUFDcEY7QUFBQSx1QkFjQSxDQUFDO0FBWmdCLFlBQVMsWUFBeEI7Ozs7QUFDRSx5Q0FBTzs7QUFBUCx1QkFBUTtBQUNSLHlDQUFPOztBQUFQLHVCQUFRO0FBQ1IseUNBQU87O0FBQVAsdUJBQVE7Ozs7QUFDVDtBQUNhLFlBQUksT0FBbEI7QUFDRSxZQUFTLE1BQVUsUUFBYTtBQUNoQyxZQUFTLE1BQTBCLE9BQVUsUUFBUSxRQUFNO0FBQzNELFlBQU8sSUFBTSxJQUFtQixtQkFBSTtBQUM3QixnQkFBSSxJQUFJO0FBQ1QsZUFDUjtBQUFDO0FBQ0gsV0FBQztBQUFBO0FBRU0sUUFBUSxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQmY7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQytEO0FBQ2hEO0FBQ2Y7QUFDQTtBQUNpRTtBQUN2QztBQUNYO0FBQ0c7QUFDbUI7QUFDWDtBQUNEO0FBQ0o7QUFDTDtBQUNTO0FBQ0E7QUFDZ0I7QUFDUDtBQUNQO0FBQ0s7QUFDTTtBQUNaO0FBQ0c7QUFDUjtBQUNKO0FBQ1k7QUFDVjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0lBQXFELCtCQUErQixFQUFFO0FBQ3RGLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLHFJQUEwRDtBQUMxRCxxQkFBcUIsSUFBSTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZJQUF1RDtBQUN2RCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpTEFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpSUFBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpSUFBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3RELG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0EsaUJBQWlCO0FBQ2pCLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlJQUFpRCxXQUFXLEVBQUU7QUFDOUQsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFJQUE2QyxlQUFlLEVBQUU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssdURBQXVEO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLElBQUk7QUFDckI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQSxnQzs7Ozs7OztBQ2owRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsYUFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrQkFBK0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7OztBQ3RFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7O0FDdEZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDTTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHVDOzs7Ozs7O0FDdkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7Ozs7Ozs7QUN2RUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ21CO0FBQ0o7QUFDVTtBQUNBO0FBQ0o7QUFDRztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsS0FBSztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7OztBQ25MQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lCO0FBQ21CO0FBQ1I7QUFDSTtBQUNQO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVOQUFpRixFQUFFLDJCQUEyQixFQUFFO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7O0FDcFdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDbUI7QUFDRDtBQUNPO0FBQ0E7QUFDTztBQUNJO0FBQ1Y7QUFDSztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkMsa0JBQWtCLHlCQUF5QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrSEFBbUQsSUFBSTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHlCQUF5QjtBQUN6RTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSwwQzs7Ozs7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLHVDOzs7Ozs7O0FDaENBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUM0QjtBQUNJO0FBQ2pCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQzs7Ozs7OztBQzVDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxnRDs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ21CO0FBQ25CO0FBQ2U7QUFDRztBQUNPO0FBQ1M7QUFDRTtBQUNFO0FBQ2I7QUFDekI7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsSUFBSTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGdCQUFnQixFQUFFO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2UEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ0c7QUFDQztBQUNTO0FBQ0k7QUFDTTtBQUNqQjtBQUNFO0FBQ2Y7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFVBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsUUFBUTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLDJDQUEyQyxTQUFTO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsV0FBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7O0FDL1NBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLG1EOzs7Ozs7Ozs7QUNkQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDc0I7QUFDRjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSw0Qzs7Ozs7OztBQzFCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHVDOzs7Ozs7Ozs7O0FDM0NBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDa0I7QUFDRztBQUNhO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLHFEQUFxRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUsseUNBQXlDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixXQUFXO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLCtDQUErQztBQUNwRCxDQUFDLHdCQUF3QjtBQUN6QixrQzs7Ozs7OztBQzVLQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7Ozs7O0FDbEJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNpQztBQUNLO0FBQ2I7QUFDUDtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUk7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFBQTtBQUFBO0FBQ0Esb0M7Ozs7Ozs7QUN2RkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0Esa0QiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRiYzY5YzAzZTQxNGViN2Y4Y2E2IiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuY29uc3QgVk9JRDAgPSB2b2lkICgwKSwgX0JPT0xFQU4gPSB0eXBlb2YgdHJ1ZSwgX05VTUJFUiA9IHR5cGVvZiAwLCBfU1RSSU5HID0gdHlwZW9mIFwiXCIsIF9TWU1CT0wgPSBcInN5bWJvbFwiLCBfT0JKRUNUID0gdHlwZW9mIHt9LCBfVU5ERUZJTkVEID0gdHlwZW9mIFZPSUQwLCBfRlVOQ1RJT04gPSB0eXBlb2YgZnVuY3Rpb24gKCkgeyB9LCBMRU5HVEggPSBcImxlbmd0aFwiO1xuLy8gT25seSB1c2VkIGZvciBwcmltaXRpdmVzLlxuY29uc3QgdHlwZUluZm9SZWdpc3RyeSA9IHt9O1xuLyoqXG4gKiBFeHBvc2VzIGVhc3kgYWNjZXNzIHRvIHR5cGUgaW5mb3JtYXRpb24gaW5jbHVkaW5nIGlucXVpcmluZyBhYm91dCBtZW1iZXJzLlxuICovXG5leHBvcnQgY2xhc3MgVHlwZUluZm8ge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgb25CZWZvcmVGcmVlemUpIHtcbiAgICAgICAgdGhpcy5pc0Jvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc051bWJlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RyaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNUcnVlTmFOID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNPYmplY3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0Z1bmN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNVbmRlZmluZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3ltYm9sID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlID0gdHlwZW9mIHRhcmdldCkge1xuICAgICAgICAgICAgY2FzZSBfQk9PTEVBTjpcbiAgICAgICAgICAgICAgICB0aGlzLmlzQm9vbGVhbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9OVU1CRVI6XG4gICAgICAgICAgICAgICAgdGhpcy5pc051bWJlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1RydWVOYU4gPSBpc05hTih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNGaW5pdGUgPSBpc0Zpbml0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZE51bWJlciA9ICF0aGlzLmlzVHJ1ZU5hTjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX1NUUklORzpcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3RyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX1NZTUJPTDpcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3ltYm9sID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc051bGxPclVuZGVmaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FycmF5ID0gKHRhcmdldCkgaW5zdGFuY2VvZiAoQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9GVU5DVElPTjpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRnVuY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfVU5ERUZJTkVEOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNVbmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNOdWxsT3JVbmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkZhdGFsIHR5cGUgZmFpbHVyZS4gIFVua25vd24gdHlwZTogXCIgKyB0aGlzLnR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uQmVmb3JlRnJlZXplKVxuICAgICAgICAgICAgb25CZWZvcmVGcmVlemUodGhpcyk7XG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBUeXBlSW5mbyBmb3IgYW55IG1lbWJlciBvciBub24tbWVtYmVyLFxuICAgICAqIHdoZXJlIG5vbi1tZW1iZXJzIGFyZSBvZiB0eXBlIHVuZGVmaW5lZC5cbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEByZXR1cm5zIHtUeXBlSW5mb31cbiAgICAgKi9cbiAgICBtZW1iZXIobmFtZSkge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIHJldHVybiBUeXBlSW5mby5nZXRGb3IodCAmJiAobmFtZSkgaW4gKHQpXG4gICAgICAgICAgICA/IHRbbmFtZV1cbiAgICAgICAgICAgIDogVk9JRDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgVHlwZUluZm8gZm9yIGFueSB0YXJnZXQgb2JqZWN0LlxuICAgICAqIElmIHRoZSB0YXJnZXQgb2JqZWN0IGlzIG9mIGEgcHJpbWl0aXZlIHR5cGUsIGl0IHJldHVybnMgdGhlIFR5cGVJbmZvIGluc3RhbmNlIGFzc2lnbmVkIHRvIHRoYXQgdHlwZS5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHJldHVybnMge1R5cGVJbmZvfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRGb3IodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdGFyZ2V0O1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgIGNhc2UgX0ZVTkNUSU9OOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVHlwZUluZm8odGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5mbyA9IHR5cGVJbmZvUmVnaXN0cnlbdHlwZV07XG4gICAgICAgIGlmICghaW5mbylcbiAgICAgICAgICAgIHR5cGVJbmZvUmVnaXN0cnlbdHlwZV0gPSBpbmZvID0gbmV3IFR5cGVJbmZvKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhcmdldCBtYXRjaGVzIHRoZSB0eXBlIChpbnN0YW5jZW9mKS5cbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgdHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSB0YXJnZXQgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIE90aGVyd2lzZSByZXR1cm5zIHRoZSB0YXJnZXQgYXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7VHxudWxsfVxuICAgICAqL1xuICAgIGFzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgdHlwZSA/IHRoaXMudGFyZ2V0IDogbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gVHlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVJbmZvKHRhcmdldCk7XG59XG4oZnVuY3Rpb24gKFR5cGUpIHtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgdHJ1ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5CT09MRUFOID0gX0JPT0xFQU47XG4gICAgLyoqXG4gICAgICogdHlwZW9mIDBcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuTlVNQkVSID0gX05VTUJFUjtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgXCJcIlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5TVFJJTkcgPSBfU1RSSU5HO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiB7fVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5PQkpFQ1QgPSBfT0JKRUNUO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiBTeW1ib2xcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuU1lNQk9MID0gX1NZTUJPTDtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgdW5kZWZpbmVkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLlVOREVGSU5FRCA9IF9VTkRFRklORUQ7XG4gICAgLyoqXG4gICAgICogdHlwZW9mIGZ1bmN0aW9uXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLkZVTkNUSU9OID0gX0ZVTkNUSU9OO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFyZ2V0IG1hdGNoZXMgdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtUfG51bGx9XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModGFyZ2V0LCB0eXBlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgICBUeXBlLmlzID0gaXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSB0YXJnZXQgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIE90aGVyd2lzZSByZXR1cm5zIHRoZSB0YXJnZXQgYXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMge1R8bnVsbH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcyh0YXJnZXQsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIHR5cGUgPyB0YXJnZXQgOiBudWxsO1xuICAgIH1cbiAgICBUeXBlLmFzID0gYXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGw7XG4gICAgfVxuICAgIFR5cGUuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIGJvb2xlYW4uXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9CT09MRUFOO1xuICAgIH1cbiAgICBUeXBlLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIG51bWJlci5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gaWdub3JlTmFOIERlZmF1bHQgaXMgZmFsc2UuIFdoZW4gdHJ1ZSwgTmFOIGlzIG5vdCBjb25zaWRlcmVkIGEgbnVtYmVyIGFuZCB3aWxsIHJldHVybiBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSwgaWdub3JlTmFOID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX05VTUJFUiAmJiAoIWlnbm9yZU5hTiB8fCAhaXNOYU4odmFsdWUpKTtcbiAgICB9XG4gICAgVHlwZS5pc051bWJlciA9IGlzTnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBpcyBhIG51bWJlciBhbmQgaXMgTmFOLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzVHJ1ZU5hTih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfTlVNQkVSICYmIGlzTmFOKHZhbHVlKTtcbiAgICB9XG4gICAgVHlwZS5pc1RydWVOYU4gPSBpc1RydWVOYU47XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX1NUUklORztcbiAgICB9XG4gICAgVHlwZS5pc1N0cmluZyA9IGlzU3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLCBzdHJpbmcsIG51bWJlciwgbnVsbCwgb3IgdW5kZWZpbmVkLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhbGxvd1VuZGVmaW5lZCBpZiBzZXQgdG8gdHJ1ZSB3aWxsIHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWUsIGFsbG93VW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdCA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgICBjYXNlIF9CT09MRUFOOlxuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBfTlVNQkVSOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgY2FzZSBfVU5ERUZJTkVEOlxuICAgICAgICAgICAgICAgIHJldHVybiBhbGxvd1VuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBUeXBlLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG4gICAgLyoqXG4gICAgICogRm9yIGRldGVjdGluZyBpZiB0aGUgdmFsdWUgY2FuIGJlIHVzZWQgYXMgYSBrZXkuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIGFsbG93VW5kZWZpbmVkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1ByaW1pdGl2ZU9yU3ltYm9sKHZhbHVlLCBhbGxvd1VuZGVmaW5lZCA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9TWU1CT0wgPyB0cnVlIDogaXNQcmltaXRpdmUodmFsdWUsIGFsbG93VW5kZWZpbmVkKTtcbiAgICB9XG4gICAgVHlwZS5pc1ByaW1pdGl2ZU9yU3ltYm9sID0gaXNQcmltaXRpdmVPclN5bWJvbDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLCBudW1iZXIsIG9yIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1Byb3BlcnR5S2V5KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgIHN3aXRjaCAodCkge1xuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBfTlVNQkVSOlxuICAgICAgICAgICAgY2FzZSBfU1lNQk9MOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgVHlwZS5pc1Byb3BlcnR5S2V5ID0gaXNQcm9wZXJ0eUtleTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX0ZVTkNUSU9OO1xuICAgIH1cbiAgICBUeXBlLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gYWxsb3dOdWxsIElmIGZhbHNlIChkZWZhdWx0KSBudWxsIGlzIG5vdCBjb25zaWRlcmVkIGFuIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSwgYWxsb3dOdWxsID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX09CSkVDVCAmJiAoYWxsb3dOdWxsIHx8IHZhbHVlICE9PSBudWxsKTtcbiAgICB9XG4gICAgVHlwZS5pc09iamVjdCA9IGlzT2JqZWN0O1xuICAgIC8qKlxuICAgICAqIEd1YXJhbnRlZXMgYSBudW1iZXIgdmFsdWUgb3IgTmFOIGluc3RlYWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBudW1iZXJPck5hTih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpID8gTmFOIDogdmFsdWU7XG4gICAgfVxuICAgIFR5cGUubnVtYmVyT3JOYU4gPSBudW1iZXJPck5hTjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgVHlwZUluZm8gb2JqZWN0IGZvciB0aGUgdGFyZ2V0LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyB7VHlwZUluZm99XG4gICAgICovXG4gICAgZnVuY3Rpb24gb2YodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBUeXBlSW5mby5nZXRGb3IodGFyZ2V0KTtcbiAgICB9XG4gICAgVHlwZS5vZiA9IG9mO1xuICAgIC8qKlxuICAgICAqIFdpbGwgZGV0ZWN0IGlmIGEgbWVtYmVyIGV4aXN0cyAodXNpbmcgJ2luJykuXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGEgcHJvcGVydHkgb3IgbWV0aG9kIGV4aXN0cyBvbiB0aGUgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUuXG4gICAgICogQHBhcmFtIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHByb3BlcnR5IE5hbWUgb2YgdGhlIG1lbWJlci5cbiAgICAgKiBAcGFyYW0gaWdub3JlVW5kZWZpbmVkIFdoZW4gaWdub3JlVW5kZWZpbmVkIGlzIHRydWUsIGlmIHRoZSBtZW1iZXIgZXhpc3RzIGJ1dCBpcyB1bmRlZmluZWQsIGl0IHdpbGwgcmV0dXJuIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc01lbWJlcihpbnN0YW5jZSwgcHJvcGVydHksIGlnbm9yZVVuZGVmaW5lZCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlICYmICFpc1ByaW1pdGl2ZShpbnN0YW5jZSkgJiYgKHByb3BlcnR5KSBpbiAoaW5zdGFuY2UpICYmIChpZ25vcmVVbmRlZmluZWQgfHwgaW5zdGFuY2VbcHJvcGVydHldICE9PSBWT0lEMCk7XG4gICAgfVxuICAgIFR5cGUuaGFzTWVtYmVyID0gaGFzTWVtYmVyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbWVtYmVyIG1hdGNoZXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIHByb3BlcnR5LCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBoYXNNZW1iZXIoaW5zdGFuY2UsIHByb3BlcnR5KSAmJiB0eXBlb2YgKGluc3RhbmNlW3Byb3BlcnR5XSkgPT09IHR5cGU7XG4gICAgfVxuICAgIFR5cGUuaGFzTWVtYmVyT2ZUeXBlID0gaGFzTWVtYmVyT2ZUeXBlO1xuICAgIGZ1bmN0aW9uIGhhc01ldGhvZChpbnN0YW5jZSwgcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIGhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgcHJvcGVydHksIF9GVU5DVElPTik7XG4gICAgfVxuICAgIFR5cGUuaGFzTWV0aG9kID0gaGFzTWV0aG9kO1xuICAgIGZ1bmN0aW9uIGlzQXJyYXlMaWtlKGluc3RhbmNlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIE5PVEU6XG4gICAgICAgICAqXG4gICAgICAgICAqIEZ1bmN0aW9uczpcbiAgICAgICAgICogRW51bWVyYXRpbmcgYSBmdW5jdGlvbiBhbHRob3VnaCBpdCBoYXMgYSAubGVuZ3RoIHByb3BlcnR5IHdpbGwgeWllbGQgbm90aGluZyBvciB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgICAqIEVmZmVjdGl2ZWx5LCBhIGZ1bmN0aW9uIGlzIG5vdCBsaWtlIGFuIGFycmF5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBTdHJpbmdzOlxuICAgICAgICAgKiBCZWhhdmUgbGlrZSBhcnJheXMgYnV0IGRvbid0IGhhdmUgdGhlIHNhbWUgZXhhY3QgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBpbnN0YW5jZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICB8fCBUeXBlLmlzU3RyaW5nKGluc3RhbmNlKVxuICAgICAgICAgICAgfHwgIVR5cGUuaXNGdW5jdGlvbihpbnN0YW5jZSkgJiYgaGFzTWVtYmVyKGluc3RhbmNlLCBMRU5HVEgpO1xuICAgIH1cbiAgICBUeXBlLmlzQXJyYXlMaWtlID0gaXNBcnJheUxpa2U7XG59KShUeXBlIHx8IChUeXBlID0ge30pKTtcbk9iamVjdC5mcmVlemUoVHlwZSk7XG5leHBvcnQgZGVmYXVsdCBUeXBlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VHlwZXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UeXBlcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vVHlwZXNcIjtcbnZhciBpc1RydWVOYU4gPSBUeXBlLmlzVHJ1ZU5hTjtcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuLyoqXG4gKiBVc2VkIGZvciBzcGVjaWFsIGNvbXBhcmlzb24gaW5jbHVkaW5nIE5hTi5cbiAqIEBwYXJhbSBhXG4gKiBAcGFyYW0gYlxuICogQHBhcmFtIHN0cmljdFxuICogQHJldHVybnMge2Jvb2xlYW58YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJlRXF1YWwoYSwgYiwgc3RyaWN0ID0gdHJ1ZSkge1xuICAgIHJldHVybiBhID09PSBiXG4gICAgICAgIHx8ICFzdHJpY3QgJiYgYSA9PSBiXG4gICAgICAgIHx8IGlzVHJ1ZU5hTihhKSAmJiBpc1RydWVOYU4oYik7XG59XG5jb25zdCBDT01QQVJFX1RPID0gXCJjb21wYXJlVG9cIjtcbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlKGEsIGIsIHN0cmljdCA9IHRydWUpIHtcbiAgICBpZiAoYXJlRXF1YWwoYSwgYiwgc3RyaWN0KSlcbiAgICAgICAgcmV0dXJuIDAgLyogRXF1YWwgKi87XG4gICAgaWYgKGEgJiYgVHlwZS5oYXNNZW1iZXIoYSwgQ09NUEFSRV9UTykpXG4gICAgICAgIHJldHVybiBhLmNvbXBhcmVUbyhiKTsgLy8gSWYgYSBoYXMgY29tcGFyZVRvLCB1c2UgaXQuXG4gICAgZWxzZSBpZiAoYiAmJiBUeXBlLmhhc01lbWJlcihiLCBDT01QQVJFX1RPKSlcbiAgICAgICAgcmV0dXJuIC1iLmNvbXBhcmVUbyhhKTsgLy8gYSBkb2Vzbid0IGhhdmUgY29tcGFyZVRvPyBjaGVjayBpZiBiIGRvZXMgYW5kIGludmVydC5cbiAgICAvLyBBbGxvdyBmb3Igc3BlY2lhbCBpbmVxdWFsaXR5Li5cbiAgICBpZiAoYSA+IGIgfHwgc3RyaWN0ICYmIChhID09PSAwICYmIGIgPT0gMCB8fCBhID09PSBudWxsICYmIGIgPT09IFZPSUQwKSlcbiAgICAgICAgcmV0dXJuIDEgLyogR3JlYXRlciAqLztcbiAgICBpZiAoYiA+IGEgfHwgc3RyaWN0ICYmIChiID09PSAwICYmIGEgPT0gMCB8fCBiID09PSBudWxsICYmIGEgPT09IFZPSUQwKSlcbiAgICAgICAgcmV0dXJuIC0xIC8qIExlc3MgKi87XG4gICAgcmV0dXJuIE5hTjtcbn1cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0d28gcHJpbWl0aXZlcyBhcmUgZXF1YWwgb3IgaWYgdHdvIG9iamVjdHMgaGF2ZSB0aGUgc2FtZSBrZXkvdmFsdWUgY29tYmluYXRpb25zLlxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKiBAcGFyYW0gbnVsbEVxdWl2YWxlbmN5IElmIHRydWUsIG51bGwvdW5kZWZpbmVkIHdpbGwgYmUgZXF1aXZhbGVudCB0byBhbiBlbXB0eSBvYmplY3Qge30uXG4gKiBAcGFyYW0gZXh0cmFEZXB0aFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcmVFcXVpdmFsZW50KGEsIGIsIG51bGxFcXVpdmFsZW5jeSA9IHRydWUsIGV4dHJhRGVwdGggPSAwKSB7XG4gICAgLy8gVGFrZSBhIHN0ZXAgYnkgc3RlcCBhcHByb2FjaCB0byBlbnN1cmUgZWZmaWNpZW5jeS5cbiAgICBpZiAoYXJlRXF1YWwoYSwgYiwgdHJ1ZSkpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSB7XG4gICAgICAgIGlmICghbnVsbEVxdWl2YWxlbmN5KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoVHlwZS5pc09iamVjdChhKSkge1xuICAgICAgICAgICAgcmV0dXJuICFPYmplY3Qua2V5cyhhKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFR5cGUuaXNPYmplY3QoYikpIHtcbiAgICAgICAgICAgIHJldHVybiAhT2JqZWN0LmtleXMoYikubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhID09IG51bGwgJiYgYiA9PSBudWxsO1xuICAgIH1cbiAgICBpZiAoVHlwZS5pc09iamVjdChhKSAmJiBUeXBlLmlzT2JqZWN0KGIpKSB7XG4gICAgICAgIGNvbnN0IGFLZXlzID0gT2JqZWN0LmtleXMoYSksIGJLZXlzID0gT2JqZWN0LmtleXMoYiksIGxlbiA9IGFLZXlzLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiAhPSBiS2V5cy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGFLZXlzLnNvcnQoKTtcbiAgICAgICAgYktleXMuc29ydCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQga2V5ID0gYUtleXNbaV07XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBiS2V5c1tpXSB8fCAhYXJlRXF1YWwoYVtrZXldLCBiW2tleV0sIHRydWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb2Vzbid0IHRyYWNrIGNpcmN1bGFyIHJlZmVyZW5jZXMgYnV0IGFsbG93cyBmb3IgY29udHJvbGxpbmcgdGhlIGFtb3VudCBvZiByZWN1cnNpb24uXG4gICAgICAgIGlmIChleHRyYURlcHRoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIGFLZXlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhcmVFcXVpdmFsZW50KGFba2V5XSwgYltrZXldLCBudWxsRXF1aXZhbGVuY3ksIGV4dHJhRGVwdGggLSAxKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db21wYXJlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29tcGFyZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnQXJndW1lbnROdWxsRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBBcmd1bWVudE51bGxFeGNlcHRpb24gZXh0ZW5kcyBBcmd1bWVudEV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lLCBtZXNzYWdlID0gYCcke3BhcmFtTmFtZX0nIGlzIG51bGwgKG9yIHVuZGVmaW5lZCkuYCwgaW5uZXJFeGNlcHRpb24pIHtcbiAgICAgICAgc3VwZXIocGFyYW1OYW1lLCBtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbik7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFyZ3VtZW50TnVsbEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgdHJpbSB9IGZyb20gXCIuLi9UZXh0L1V0aWxpdHlcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdBcmd1bWVudEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgQXJndW1lbnRFeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIC8vIEZvciBzaW1wbGljaXR5IGFuZCBjb25zaXN0ZW5jeSwgbGV0cyBzdGljayB3aXRoIDEgc2lnbmF0dXJlLlxuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSwgbWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIGJlZm9yZVNlYWxpbmcpIHtcbiAgICAgICAgbGV0IHBuID0gcGFyYW1OYW1lID8gKCd7JyArIHBhcmFtTmFtZSArICd9ICcpIDogJyc7XG4gICAgICAgIHN1cGVyKHRyaW0ocG4gKyAobWVzc2FnZSB8fCAnJykpLCBpbm5lckV4Y2VwdGlvbiwgKF8pID0+IHtcbiAgICAgICAgICAgIF8ucGFyYW1OYW1lID0gcGFyYW1OYW1lO1xuICAgICAgICAgICAgaWYgKGJlZm9yZVNlYWxpbmcpXG4gICAgICAgICAgICAgICAgYmVmb3JlU2VhbGluZyhfKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50RXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJndW1lbnRFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IEFyZ3VtZW50RXhjZXB0aW9uIH0gZnJvbSBcIi4vQXJndW1lbnRFeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiBleHRlbmRzIEFyZ3VtZW50RXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbU5hbWUsIGFjdHVhbFZhbHVlLCBtZXNzYWdlID0gJyAnLCBpbm5lckV4Y2VwdGlvbikge1xuICAgICAgICBzdXBlcihwYXJhbU5hbWUsIGAoJHthY3R1YWxWYWx1ZX0pIGAgKyBtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbiwgKF8pID0+IHtcbiAgICAgICAgICAgIF8uYWN0dWFsVmFsdWUgPSBhY3R1YWxWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2VcIjtcbmltcG9ydCB7IE9iamVjdFBvb2wgfSBmcm9tIFwiLi4vLi4vRGlzcG9zYWJsZS9PYmplY3RQb29sXCI7XG5pbXBvcnQgeyBJdGVyYXRvclJlc3VsdCB9IGZyb20gXCIuL0l0ZXJhdG9yUmVzdWx0XCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xubGV0IHlpZWxkZXJQb29sO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmZ1bmN0aW9uIHlpZWxkZXIocmVjeWNsZSkge1xuICAgIGlmICgheWllbGRlclBvb2wpXG4gICAgICAgIHlpZWxkZXJQb29sXG4gICAgICAgICAgICA9IG5ldyBPYmplY3RQb29sKDQwLCAoKSA9PiBuZXcgWWllbGRlcigpLCB5ID0+IHkueWllbGRCcmVhaygpKTtcbiAgICBpZiAoIXJlY3ljbGUpXG4gICAgICAgIHJldHVybiB5aWVsZGVyUG9vbC50YWtlKCk7XG4gICAgeWllbGRlclBvb2wuYWRkKHJlY3ljbGUpO1xufVxuY2xhc3MgWWllbGRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBWT0lEMDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBOYU47XG4gICAgfVxuICAgIGdldCBjdXJyZW50KCkgeyByZXR1cm4gdGhpcy5fY3VycmVudDsgfSAvLyB0aGlzIGNsYXNzIGlzIG5vdCBlbnRpcmVseSBsb2NhbC9wcml2YXRlLiAgU3RpbGwgbmVlZHMgcHJvdGVjdGlvbi5cbiAgICBnZXQgaW5kZXgoKSB7IHJldHVybiB0aGlzLl9pbmRleDsgfVxuICAgIHlpZWxkUmV0dXJuKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSB2YWx1ZTtcbiAgICAgICAgaWYgKGlzTmFOKHRoaXMuX2luZGV4KSlcbiAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5faW5kZXgrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHlpZWxkQnJlYWsoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBWT0lEMDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBOYU47XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy55aWVsZEJyZWFrKCk7XG4gICAgfVxufVxuY29uc3QgTkFNRSA9IFwiRW51bWVyYXRvckJhc2VcIjtcbi8vIFwiRW51bWVyYXRvclwiIGlzIGNvbmZsaWN0IEpTY3JpcHQncyBcIkVudW1lcmF0b3JcIlxuLy8gTmFtaW5nIHRoaXMgY2xhc3MgRW51bWVyYXRvckJhc2UgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGggSUUuXG5leHBvcnQgY2xhc3MgRW51bWVyYXRvckJhc2UgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX2luaXRpYWxpemVyLCBfdHJ5R2V0TmV4dCwgZGlzcG9zZXIsIGlzRW5kbGVzcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplciA9IF9pbml0aWFsaXplcjtcbiAgICAgICAgdGhpcy5fdHJ5R2V0TmV4dCA9IF90cnlHZXROZXh0O1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IE5BTUU7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgaWYgKFR5cGUuaXNCb29sZWFuKGlzRW5kbGVzcykpXG4gICAgICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBpc0VuZGxlc3M7XG4gICAgICAgIGVsc2UgaWYgKFR5cGUuaXNCb29sZWFuKGRpc3Bvc2VyKSlcbiAgICAgICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGRpc3Bvc2VyO1xuICAgICAgICBpZiAoVHlwZS5pc0Z1bmN0aW9uKGRpc3Bvc2VyKSlcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2VyID0gZGlzcG9zZXI7XG4gICAgfVxuICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5feWllbGRlcjtcbiAgICAgICAgcmV0dXJuIHkgJiYgeS5jdXJyZW50O1xuICAgIH1cbiAgICBnZXQgaW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLl95aWVsZGVyO1xuICAgICAgICByZXR1cm4geSA/IHkuaW5kZXggOiBOYU47XG4gICAgfVxuICAgIC8qXG4gICAgICogUHJvdmlkZXMgYSBtZWNoYW5pc20gdG8gaW5kaWNhdGUgaWYgdGhpcyBlbnVtZXJhYmxlIG5ldmVyIGVuZHMuXG4gICAgICogSWYgc2V0IHRvIHRydWUsIHNvbWUgb3BlcmF0aW9ucyB0aGF0IGV4cGVjdCBhIGZpbml0ZSByZXN1bHQgbWF5IHRocm93LlxuICAgICAqIEV4cGxpY2l0IGZhbHNlIG1lYW5zIGl0IGhhcyBhbiBlbmQuXG4gICAgICogSW1wbGljaXQgdm9pZCBtZWFucyB1bmtub3duLlxuICAgICAqL1xuICAgIGdldCBpc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VuZGxlc3M7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZGVkIGZvciBjb21wYXRpYmlsaXR5IGJ1dCBvbmx5IHdvcmtzIGlmIHRoZSBlbnVtZXJhdG9yIGlzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICByZXNldCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHkgPSBfLl95aWVsZGVyO1xuICAgICAgICBfLl95aWVsZGVyID0gbnVsbDtcbiAgICAgICAgXy5fc3RhdGUgPSAwIC8qIEJlZm9yZSAqLztcbiAgICAgICAgaWYgKHkpXG4gICAgICAgICAgICB5aWVsZGVyKHkpOyAvLyByZWN5Y2xlIHVudGlsIGFjdHVhbGx5IG5lZWRlZC5cbiAgICB9XG4gICAgX2Fzc2VydEJhZFN0YXRlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgc3dpdGNoIChfLl9zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAzIC8qIEZhdWx0ZWQgKi86XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGlzIGVudW1lcmF0b3IgY2F1c2VkIGEgZmF1bHQgYW5kIHdhcyBkaXNwb3NlZC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDUgLyogRGlzcG9zZWQgKi86XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGlzIGVudW1lcmF0b3Igd2FzIG1hbnVhbGx5IGRpc3Bvc2VkLlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXNzZXMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gdGhlIG91dCBjYWxsYmFjayBpZiB0aGUgZW51bWVyYXRvciBpcyBhY3RpdmUuXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIHRyeUdldEN1cnJlbnQob3V0KSB7XG4gICAgICAgIHRoaXMuX2Fzc2VydEJhZFN0YXRlKCk7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gMSAvKiBBY3RpdmUgKi8pIHtcbiAgICAgICAgICAgIG91dCh0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQgY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZSA8IDIgLyogQ29tcGxldGVkICovO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYWZlbHkgbW92ZXMgdG8gdGhlIG5leHQgZW50cnkgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBvbmUuXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIG1vdmVOZXh0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fYXNzZXJ0QmFkU3RhdGUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN3aXRjaCAoXy5fc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDAgLyogQmVmb3JlICovOlxuICAgICAgICAgICAgICAgICAgICBfLl95aWVsZGVyID0gXy5feWllbGRlciB8fCB5aWVsZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF8uX3N0YXRlID0gMSAvKiBBY3RpdmUgKi87XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxpemVyID0gXy5faW5pdGlhbGl6ZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSAxIC8qIEFjdGl2ZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uX3RyeUdldE5leHQoXy5feWllbGRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLl9zdGF0ZSA9IDIgLyogQ29tcGxldGVkICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIF8uX3N0YXRlID0gMyAvKiBGYXVsdGVkICovO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBlbnRyeSBhbmQgZW1pdHMgdGhlIHZhbHVlIHRocm91Z2ggdGhlIG91dCBjYWxsYmFjay5cbiAgICAgKiBOb3RlOiBXaWxsIHRocm93IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uIGlmIHRoaXMgaGFzIGZhdWx0ZWQgb3IgbWFudWFsbHkgZGlzcG9zZWQuXG4gICAgICovXG4gICAgdHJ5TW92ZU5leHQob3V0KSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIG91dCh0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBuZXh0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVOZXh0KClcbiAgICAgICAgICAgID8gdGhpcy5jdXJyZW50XG4gICAgICAgICAgICA6IFZPSUQwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeHBvc2VkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggZ2VuZXJhdG9ycy5cbiAgICAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlTmV4dCgpXG4gICAgICAgICAgICA/IG5ldyBJdGVyYXRvclJlc3VsdCh0aGlzLmN1cnJlbnQsIHRoaXMuaW5kZXgpXG4gICAgICAgICAgICA6IEl0ZXJhdG9yUmVzdWx0LkRvbmU7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlRGlzcG9zZVN0YXRlKDQgLyogSW50ZXJydXB0ZWQgKi8pO1xuICAgIH1cbiAgICAncmV0dXJuJyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fYXNzZXJ0QmFkU3RhdGUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gVk9JRDAgfHwgXy5fc3RhdGUgPT09IDIgLyogQ29tcGxldGVkICovIHx8IF8uX3N0YXRlID09PSA0IC8qIEludGVycnVwdGVkICovXG4gICAgICAgICAgICAgICAgPyBJdGVyYXRvclJlc3VsdC5Eb25lXG4gICAgICAgICAgICAgICAgOiBuZXcgSXRlcmF0b3JSZXN1bHQodmFsdWUsIFZPSUQwLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2Vuc3VyZURpc3Bvc2VTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLndhc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBfLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIF8uX3N0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2lzRW5kbGVzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBkaXNwb3NlciA9IF8uX2Rpc3Bvc2VyO1xuICAgICAgICBfLl9pbml0aWFsaXplciA9IG51bGw7XG4gICAgICAgIF8uX2Rpc3Bvc2VyID0gbnVsbDtcbiAgICAgICAgY29uc3QgeSA9IF8uX3lpZWxkZXI7XG4gICAgICAgIF8uX3lpZWxkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IDUgLyogRGlzcG9zZWQgKi87XG4gICAgICAgIGlmICh5KVxuICAgICAgICAgICAgeWllbGRlcih5KTtcbiAgICAgICAgaWYgKGRpc3Bvc2VyKVxuICAgICAgICAgICAgZGlzcG9zZXIoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBFbnVtZXJhdG9yQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVudW1lcmF0b3JCYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuZXhwb3J0IGZ1bmN0aW9uIEludGVnZXIobikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG4pO1xufVxuKGZ1bmN0aW9uIChJbnRlZ2VyKSB7XG4gICAgSW50ZWdlci5NQVhfMzJfQklUID0gMjE0NzQ4MzY0NztcbiAgICBJbnRlZ2VyLk1BWF9WQUxVRSA9IDkwMDcxOTkyNTQ3NDA5OTE7XG4gICAgY29uc3QgTlVNQkVSID0gXCJudW1iZXJcIjtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbnkgbnVtYmVyIHRvIGl0cyAzMmJpdCBjb3VudGVycGFydC5cbiAgICAgKiBUaHJvd3MgaWYgY29udmVyc2lvbiBpcyBub3QgcG9zc2libGUuXG4gICAgICogQHBhcmFtIG5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzMzJCaXQobikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuIHwgMDtcbiAgICAgICAgaWYgKGlzTmFOKG4pKVxuICAgICAgICAgICAgdGhyb3cgXCInbicgaXMgbm90IGEgbnVtYmVyLlwiO1xuICAgICAgICBpZiAobiAhPT0gLTEgJiYgcmVzdWx0ID09PSAtMSlcbiAgICAgICAgICAgIHRocm93IFwiJ24nIGlzIHRvbyBsYXJnZSB0byBiZSBhIDMyIGJpdCBpbnRlZ2VyLlwiO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBJbnRlZ2VyLmFzMzJCaXQgPSBhczMyQml0O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKG4pIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBuID09PSBOVU1CRVIgJiYgaXNGaW5pdGUobikgJiYgbiA9PT0gTWF0aC5mbG9vcihuKTtcbiAgICB9XG4gICAgSW50ZWdlci5pcyA9IGlzO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgd2l0aGluIGEgMzIgYml0IHJhbmdlLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXMzMkJpdChuKSB7XG4gICAgICAgIHJldHVybiBuID09PSAobiB8IDApO1xuICAgIH1cbiAgICBJbnRlZ2VyLmlzMzJCaXQgPSBpczMyQml0O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBpZiBub3QgYW4gaW50ZWdlci5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnQobiwgYXJndW1lbnROYW1lKSB7XG4gICAgICAgIGxldCBpID0gaXMobik7XG4gICAgICAgIGlmICghaSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBcIk11c3QgYmUgYSBpbnRlZ2VyLlwiKTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIEludGVnZXIuYXNzZXJ0ID0gYXNzZXJ0O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBpZiBsZXNzIHRoYW4gemVyby5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnRaZXJvT3JHcmVhdGVyKG4sIGFyZ3VtZW50TmFtZSkge1xuICAgICAgICBsZXQgaSA9IGFzc2VydChuLCBhcmd1bWVudE5hbWUpICYmIG4gPj0gMDtcbiAgICAgICAgaWYgKCFpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBuLCBcIk11c3QgYmUgYSB2YWxpZCBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB6ZXJvLlwiKTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlciA9IGFzc2VydFplcm9PckdyZWF0ZXI7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIG5vdCBncmVhdGVyIHRoYW4gemVyby5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnRQb3NpdGl2ZShuLCBhcmd1bWVudE5hbWUpIHtcbiAgICAgICAgbGV0IGkgPSBhc3NlcnQobiwgYXJndW1lbnROYW1lKSAmJiBuID4gMDtcbiAgICAgICAgaWYgKCFpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBuLCBcIk11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uXCIpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgSW50ZWdlci5hc3NlcnRQb3NpdGl2ZSA9IGFzc2VydFBvc2l0aXZlO1xufSkoSW50ZWdlciB8fCAoSW50ZWdlciA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBJbnRlZ2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW50ZWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0ludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvc3lzdGVtLnN5c3RlbWV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ1N5c3RlbUV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgU3lzdGVtRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uIHtcbiAgICAvKlxuICAgICAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIG1lc3NhZ2U6c3RyaW5nID0gbnVsbCxcbiAgICAgICAgICAgIGlubmVyRXhjZXB0aW9uOkVycm9yID0gbnVsbCxcbiAgICAgICAgICAgIGJlZm9yZVNlYWxpbmc/OihleDphbnkpPT52b2lkKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdXBlcihtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbiwgYmVmb3JlU2VhbGluZyk7XG4gICAgICAgIH1cbiAgICAqL1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFN5c3RlbUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN5c3RlbUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvU3lzdGVtRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uIH0gZnJvbSBcIi4vT2JqZWN0RGlzcG9zZWRFeGNlcHRpb25cIjtcbmV4cG9ydCBjbGFzcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX19maW5hbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5fX2ZpbmFsaXplciA9IF9fZmluYWxpemVyO1xuICAgICAgICB0aGlzLl9fd2FzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IHdhc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX3dhc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICB0aHJvd0lmRGlzcG9zZWQobWVzc2FnZSwgb2JqZWN0TmFtZSA9IHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9fd2FzRGlzcG9zZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24ob2JqZWN0TmFtZSwgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLl9fd2FzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIC8vIFByZWVtcHRpdmVseSBzZXQgd2FzRGlzcG9zZWQgaW4gb3JkZXIgdG8gcHJldmVudCByZXBlYXRlZCBkaXNwb3NpbmcuXG4gICAgICAgICAgICAvLyBOT1RFOiBpbiB0cnVlIG11bHRpLXRocmVhZGVkIHNjZW5hcmlvcywgdGhpcyBuZWVkcyB0byBiZSBzeW5jaHJvbml6ZWQuXG4gICAgICAgICAgICBfLl9fd2FzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBfLl9vbkRpc3Bvc2UoKTsgLy8gUHJvdGVjdGVkIG92ZXJyaWRlLlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uX19maW5hbGl6ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5fX2ZpbmFsaXplcigpO1xuICAgICAgICAgICAgICAgICAgICBfLl9fZmluYWxpemVyID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBQbGFjZWhvbGRlciBmb3Igb3ZlcnJpZGVzLlxuICAgIF9vbkRpc3Bvc2UoKSB7IH1cbn1cbmV4cG9ydCBkZWZhdWx0IERpc3Bvc2FibGVCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGlzcG9zYWJsZUJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi4vLi4vSW50ZWdlclwiO1xuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBhcnJheSBkZXBlbmRpbmcgb24gdGhlIHJlcXVlc3RlZCBjYXBhY2l0eS5cbiAqIFRoZSByZXR1cm5lZCBhcnJheSB3aWxsIGhhdmUgYSAubGVuZ3RoIGVxdWFsIHRvIHRoZSB2YWx1ZSBwcm92aWRlZC5cbiAqIEBwYXJhbSBsZW5ndGhcbiAqIEByZXR1cm5zIHtUW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKGxlbmd0aCkge1xuICAgIEludGVnZXIuYXNzZXJ0KGxlbmd0aCwgJ2xlbmd0aCcpO1xuICAgIC8vIFRoaXMgbG9naWMgaXMgYmFzZWQgdXBvbiBKUyBwZXJmb3JtYW5jZSB0ZXN0cyB0aGF0IHNob3cgYSBzaWduaWZpY2FudCBkaWZmZXJlbmNlIGF0IHRoZSBsZXZlbCBvZiA2NTUzNi5cbiAgICBsZXQgYXJyYXk7XG4gICAgaWYgKGxlbmd0aCA+IDY1NTM2KVxuICAgICAgICBhcnJheSA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGVsc2Uge1xuICAgICAgICBhcnJheSA9IFtdO1xuICAgICAgICBhcnJheS5sZW5ndGggPSBsZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluaXRpYWxpemUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9pbml0aWFsaXplLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyB1c2luZyB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL2Rpc3Bvc2VcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IEFycmF5RW51bWVyYXRvciB9IGZyb20gXCIuL0FycmF5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgSW5kZXhFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSW5kZXhFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24gfSBmcm9tIFwiLi9VbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb25cIjtcbmltcG9ydCB7IEluZmluaXRlRW51bWVyYXRvciB9IGZyb20gXCIuL0luZmluaXRlRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgRW1wdHlFbnVtZXJhdG9yIGFzIEVtcHR5IH0gZnJvbSBcIi4vRW1wdHlFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBJdGVyYXRvckVudW1lcmF0b3IgfSBmcm9tIFwiLi9JdGVyYXRvckVudW1lcmF0b3JcIjtcbmNvbnN0IFNUUklOR19FTVBUWSA9IFwiXCIsIEVORExFU1NfRVhDRVBUSU9OX01FU1NBR0UgPSAnQ2Fubm90IGNhbGwgZm9yRWFjaCBvbiBhbiBlbmRsZXNzIGVudW1lcmFibGUuICcgK1xuICAgICdXb3VsZCByZXN1bHQgaW4gYW4gaW5maW5pdGUgbG9vcCB0aGF0IGNvdWxkIGhhbmcgdGhlIGN1cnJlbnQgcHJvY2Vzcy4nO1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93SWZFbmRsZXNzKGlzRW5kbGVzcykge1xuICAgIGlmIChpc0VuZGxlc3MpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oRU5ETEVTU19FWENFUFRJT05fTUVTU0FHRSk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBpbml0QXJyYXlGcm9tKHNvdXJjZSwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShzb3VyY2UpKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWluKHNvdXJjZS5sZW5ndGgsIG1heCk7XG4gICAgICAgIGlmIChpc0Zpbml0ZShsZW4pKSB7XG4gICAgICAgICAgICBpZiAobGVuID4gNjU1MzUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShsZW4pO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgICAgICByZXN1bHQubGVuZ3RoID0gbGVuO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG59XG4vLyBDb3VsZCBiZSBhcnJheSwgb3IgSUVudW1lcmFibGUuLi5cbi8qKlxuICogUmV0dXJucyB0aGUgZW51bWVyYXRvciBmb3IgdGhlIHNwZWNpZmllZCBjb2xsZWN0aW9uLCBlbnVtZXJhdG9yLCBvciBpdGVyYXRvci5cbiAqIElmIHRoZSBzb3VyY2UgaXMgaWRlbnRpZmllZCBhcyBJRW51bWVyYXRvciBpdCB3aWxsIHJldHVybiB0aGUgc291cmNlIGFzIGlzLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb20oc291cmNlKSB7XG4gICAgLy8gVG8gc2ltcGxpZnkgYW5kIHByZXZlbnQgbnVsbCByZWZlcmVuY2UgZXhjZXB0aW9uczpcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIEVtcHR5O1xuICAgIGlmICgoc291cmNlKSBpbnN0YW5jZW9mIChBcnJheSkpXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhdG9yKHNvdXJjZSk7XG4gICAgaWYgKFR5cGUuaXNBcnJheUxpa2Uoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gbmV3IEluZGV4RW51bWVyYXRvcigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogc291cmNlLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBwb2ludGVyOiAwLFxuICAgICAgICAgICAgICAgIHN0ZXA6IDFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIVR5cGUuaXNQcmltaXRpdmUoc291cmNlKSkge1xuICAgICAgICBpZiAoaXNFbnVtZXJhYmxlKHNvdXJjZSkpXG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgaWYgKFR5cGUuaXNGdW5jdGlvbihzb3VyY2UpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUVudW1lcmF0b3Ioc291cmNlKTtcbiAgICAgICAgaWYgKGlzRW51bWVyYXRvcihzb3VyY2UpKVxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgaWYgKGlzSXRlcmF0b3Ioc291cmNlKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgSXRlcmF0b3JFbnVtZXJhdG9yKHNvdXJjZSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VudW1lcmFibGUoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gVHlwZS5oYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIFwiZ2V0RW51bWVyYXRvclwiLCBUeXBlLkZVTkNUSU9OKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VudW1lcmFibGVPckFycmF5TGlrZShpbnN0YW5jZSkge1xuICAgIHJldHVybiBUeXBlLmlzQXJyYXlMaWtlKGluc3RhbmNlKSB8fCBpc0VudW1lcmFibGUoaW5zdGFuY2UpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRW51bWVyYXRvcihpbnN0YW5jZSkge1xuICAgIHJldHVybiBUeXBlLmhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgXCJtb3ZlTmV4dFwiLCBUeXBlLkZVTkNUSU9OKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0l0ZXJhdG9yKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIFR5cGUuaGFzTWVtYmVyT2ZUeXBlKGluc3RhbmNlLCBcIm5leHRcIiwgVHlwZS5GVU5DVElPTik7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChlLCBhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKGUgPT09IFNUUklOR19FTVBUWSlcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKGUgJiYgbWF4ID4gMCkge1xuICAgICAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShlKSkge1xuICAgICAgICAgICAgLy8gQXNzdW1lIGUubGVuZ3RoIGlzIGNvbnN0YW50IG9yIGF0IGxlYXN0IGRvZXNuJ3QgZGV2aWF0ZSB0byBpbmZpbml0ZSBvciBOYU4uXG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiAhaXNGaW5pdGUoZS5sZW5ndGgpKTtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgTWF0aC5taW4oZS5sZW5ndGgsIG1heCk7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24oZVtpXSwgaSkgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0VudW1lcmF0b3IoZSkpIHtcbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpICYmIGUuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIC8vIFJldHVybiB2YWx1ZSBvZiBhY3Rpb24gY2FuIGJlIGFueXRoaW5nLCBidXQgaWYgaXQgaXMgKD09PSkgZmFsc2UgdGhlbiB0aGUgZm9yRWFjaCB3aWxsIGRpc2NvbnRpbnVlLlxuICAgICAgICAgICAgd2hpbGUgKG1heCA+IGkgJiYgZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbihlLmN1cnJlbnQsIGkrKykgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0VudW1lcmFibGUoZSkpIHtcbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpICYmIGUuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIC8vIEZvciBlbnVtZXJhdG9ycyB0aGF0IGFyZW4ndCBFbnVtZXJhYmxlQmFzZSwgZW5zdXJlIGRpc3Bvc2UgaXMgY2FsbGVkLlxuICAgICAgICAgICAgcmV0dXJuIHVzaW5nKGUuZ2V0RW51bWVyYXRvcigpLCBmID0+IGZvckVhY2goZiwgYWN0aW9uLCBtYXgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJdGVyYXRvcihlKSkge1xuICAgICAgICAgICAgLy8gRm9yIG91ciBwdXJwb3NlIGl0ZXJhdG9ycyBhcmUgZW5kbGVzcyBhbmQgYSBtYXggbXVzdCBiZSBzcGVjaWZpZWQgYmVmb3JlIGl0ZXJhdGluZy5cbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpKTtcbiAgICAgICAgICAgIGxldCBpID0gMCwgcjtcbiAgICAgICAgICAgIC8vIFJldHVybiB2YWx1ZSBvZiBhY3Rpb24gY2FuIGJlIGFueXRoaW5nLCBidXQgaWYgaXQgaXMgKD09PSkgZmFsc2UgdGhlbiB0aGUgZm9yRWFjaCB3aWxsIGRpc2NvbnRpbnVlLlxuICAgICAgICAgICAgd2hpbGUgKG1heCA+IGkgJiYgIShyID0gZS5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKHIudmFsdWUsIGkrKykgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbi8qKlxuICogQ29udmVydHMgYW55IGVudW1lcmFibGUgdG8gYW4gYXJyYXkuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gbWF4IFN0b3BzIGFmdGVyIG1heCBpcyByZWFjaGVkLiAgQWxsb3dzIGZvciBmb3JFYWNoIHRvIGJlIGNhbGxlZCBvbiBpbmZpbml0ZSBlbnVtZXJhdGlvbnMuXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheShzb3VyY2UsIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKHNvdXJjZSA9PT0gU1RSSU5HX0VNUFRZKVxuICAgICAgICByZXR1cm4gW107XG4gICAgaWYgKCFpc0Zpbml0ZShtYXgpICYmIChzb3VyY2UpIGluc3RhbmNlb2YgKEFycmF5KSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGluaXRBcnJheUZyb20oc291cmNlLCBtYXgpO1xuICAgIGlmICgtMSA9PT0gZm9yRWFjaChzb3VyY2UsIChlLCBpKSA9PiB7IHJlc3VsdFtpXSA9IGU7IH0sIG1heCkpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbnkgZW51bWVyYWJsZSB0byBhbiBhcnJheSBvZiBzZWxlY3RlZCB2YWx1ZXMuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gc2VsZWN0b3JcbiAqIEBwYXJhbSBtYXggU3RvcHMgYWZ0ZXIgbWF4IGlzIHJlYWNoZWQuICBBbGxvd3MgZm9yIGZvckVhY2ggdG8gYmUgY2FsbGVkIG9uIGluZmluaXRlIGVudW1lcmF0aW9ucy5cbiAqIEByZXR1cm5zIHtUUmVzdWx0W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXAoc291cmNlLCBzZWxlY3RvciwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoc291cmNlID09PSBTVFJJTkdfRU1QVFkpXG4gICAgICAgIHJldHVybiBbXTtcbiAgICBpZiAoIWlzRmluaXRlKG1heCkgJiYgKHNvdXJjZSkgaW5zdGFuY2VvZiAoQXJyYXkpKVxuICAgICAgICByZXR1cm4gc291cmNlLm1hcChzZWxlY3Rvcik7XG4gICAgY29uc3QgcmVzdWx0ID0gaW5pdEFycmF5RnJvbShzb3VyY2UsIG1heCk7XG4gICAgaWYgKC0xID09PSBmb3JFYWNoKHNvdXJjZSwgKGUsIGkpID0+IHsgcmVzdWx0W2ldID0gc2VsZWN0b3IoZSwgaSk7IH0sIG1heCkpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vVHlwZXNcIjtcbi8qKlxuICogVGFrZXMgYW55IG51bWJlciBvZiBkaXNwb3NhYmxlcyBhcyBhcmd1bWVudHMgYW5kIGF0dGVtcHRzIHRvIGRpc3Bvc2UgdGhlbS5cbiAqIEFueSBleGNlcHRpb25zIHRocm93biB3aXRoaW4gYSBkaXNwb3NlIGFyZSBub3QgdHJhcHBlZC5cbiAqIFVzZSAnZGlzcG9zZVdpdGhvdXRFeGNlcHRpb24nIHRvIGF1dG9tYXRpY2FsbHkgdHJhcCBleGNlcHRpb25zLlxuICpcbiAqIENhbiBhY2NlcHQgPGFueT4gYW5kIHdpbGwgaWdub3JlIG9iamVjdHMgdGhhdCBkb24ndCBoYXZlIGEgZGlzcG9zZSgpIG1ldGhvZC5cbiAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcG9zZSguLi5kaXNwb3NhYmxlcykge1xuICAgIC8vIFRoZSBkaXNwb3NhYmxlcyBhcmd1bWVudHMgYXJyYXkgaXMgZWZmZWN0aXZlbHkgbG9jYWxpemVkIHNvIGl0J3Mgc2FmZS5cbiAgICBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgZmFsc2UpO1xufVxuKGZ1bmN0aW9uIChkaXNwb3NlKSB7XG4gICAgLyoqXG4gICAgICogVXNlIHRoaXMgd2hlbiBvbmx5IGRpc3Bvc2luZyBvbmUgb2JqZWN0IHRvIGF2b2lkIGNyZWF0aW9uIG9mIGFycmF5cy5cbiAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZVxuICAgICAqIEBwYXJhbSB0cmFwRXhjZXB0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNpbmdsZShkaXNwb3NhYmxlLCB0cmFwRXhjZXB0aW9ucyA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChkaXNwb3NhYmxlKVxuICAgICAgICAgICAgZGlzcG9zZVNpbmdsZShkaXNwb3NhYmxlLCB0cmFwRXhjZXB0aW9ucyk7XG4gICAgfVxuICAgIGRpc3Bvc2Uuc2luZ2xlID0gc2luZ2xlO1xuICAgIGZ1bmN0aW9uIGRlZmVycmVkKC4uLmRpc3Bvc2FibGVzKSB7XG4gICAgICAgIHRoZXNlLmRlZmVycmVkKGRpc3Bvc2FibGVzKTtcbiAgICB9XG4gICAgZGlzcG9zZS5kZWZlcnJlZCA9IGRlZmVycmVkO1xuICAgIC8qKlxuICAgICAqIFRha2VzIGFueSBudW1iZXIgb2YgZGlzcG9zYWJsZXMgYW5kIHRyYXBzIGFueSBlcnJvcnMgdGhhdCBvY2N1ciB3aGVuIGRpc3Bvc2luZy5cbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSBleGNlcHRpb25zIHRocm93bi5cbiAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZXNcbiAgICAgKiBAcmV0dXJucyB7YW55W119IFJldHVybnMgYW4gYXJyYXkgb2YgZXhjZXB0aW9ucyB0aGF0IG9jY3VycmVkLCBpZiB0aGVyZSBhcmUgYW55LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdpdGhvdXRFeGNlcHRpb24oLi4uZGlzcG9zYWJsZXMpIHtcbiAgICAgICAgLy8gVGhlIGRpc3Bvc2FibGVzIGFyZ3VtZW50cyBhcnJheSBpcyBlZmZlY3RpdmVseSBsb2NhbGl6ZWQgc28gaXQncyBzYWZlLlxuICAgICAgICByZXR1cm4gZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMsIHRydWUpO1xuICAgIH1cbiAgICBkaXNwb3NlLndpdGhvdXRFeGNlcHRpb24gPSB3aXRob3V0RXhjZXB0aW9uO1xuICAgIC8qKlxuICAgICAqIFRha2VzIGFuIGFycmF5IG9mIGRpc3Bvc2FibGUgb2JqZWN0cyBhbmQgZW5zdXJlcyB0aGV5IGFyZSBkaXNwb3NlZC5cbiAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZXNcbiAgICAgKiBAcGFyYW0gdHJhcEV4Y2VwdGlvbnMgSWYgdHJ1ZSwgcHJldmVudHMgZXhjZXB0aW9ucyBmcm9tIGJlaW5nIHRocm93biB3aGVuIGRpc3Bvc2luZy5cbiAgICAgKiBAcmV0dXJucyB7YW55W119IElmICd0cmFwRXhjZXB0aW9ucycgaXMgdHJ1ZSwgcmV0dXJucyBhbiBhcnJheSBvZiBleGNlcHRpb25zIHRoYXQgb2NjdXJyZWQsIGlmIHRoZXJlIGFyZSBhbnkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdGhlc2UoZGlzcG9zYWJsZXMsIHRyYXBFeGNlcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkaXNwb3NhYmxlcyAmJiBkaXNwb3NhYmxlcy5sZW5ndGhcbiAgICAgICAgICAgID8gZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMuc2xpY2UoKSwgdHJhcEV4Y2VwdGlvbnMpXG4gICAgICAgICAgICA6IHZvaWQgMDtcbiAgICB9XG4gICAgZGlzcG9zZS50aGVzZSA9IHRoZXNlO1xuICAgIChmdW5jdGlvbiAodGhlc2UpIHtcbiAgICAgICAgZnVuY3Rpb24gZGVmZXJyZWQoZGlzcG9zYWJsZXMsIGRlbGF5ID0gMCkge1xuICAgICAgICAgICAgaWYgKGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICghKGRlbGF5ID49IDApKVxuICAgICAgICAgICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChkaXNwb3NlVGhlc2VJbnRlcm5hbCwgZGVsYXksIGRpc3Bvc2FibGVzLnNsaWNlKCksIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoZXNlLmRlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2UgdGhpcyB1bnNhZmUgbWV0aG9kIHdoZW4gZ3VhcmFudGVlZCBub3QgdG8gY2F1c2UgZXZlbnRzIHRoYXQgd2lsbCBtYWtlIG1vZGlmaWNhdGlvbnMgdG8gdGhlIGRpc3Bvc2FibGVzIGFycmF5LlxuICAgICAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZXNcbiAgICAgICAgICogQHBhcmFtIHRyYXBFeGNlcHRpb25zXG4gICAgICAgICAqIEByZXR1cm5zIHthbnlbXX1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG5vQ29weShkaXNwb3NhYmxlcywgdHJhcEV4Y2VwdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXNwb3NhYmxlcyAmJiBkaXNwb3NhYmxlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICA/IGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCB0cmFwRXhjZXB0aW9ucylcbiAgICAgICAgICAgICAgICA6IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgICB0aGVzZS5ub0NvcHkgPSBub0NvcHk7XG4gICAgfSkodGhlc2UgPSBkaXNwb3NlLnRoZXNlIHx8IChkaXNwb3NlLnRoZXNlID0ge30pKTtcbn0pKGRpc3Bvc2UgfHwgKGRpc3Bvc2UgPSB7fSkpO1xuLyoqXG4gKiBKdXN0IGxpa2UgaW4gQyMgdGhpcyAndXNpbmcnIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBwYXNzZWQgZGlzcG9zYWJsZSBpcyBkaXNwb3NlZCB3aGVuIHRoZSBjbG9zdXJlIGhhcyBmaW5pc2hlZC5cbiAqXG4gKiBVc2FnZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHVzaW5nKG5ldyBEaXNwb3NhYmxlT2JqZWN0KCksKG15T2JqKT0+e1xuICAgICAqICAgLy8gZG8gd29yayB3aXRoIG15T2JqXG4gICAgICogfSk7XG4gKiAvLyBteU9iaiBhdXRvbWF0aWNhbGx5IGhhcyBpdCdzIGRpc3Bvc2UgbWV0aG9kIGNhbGxlZC5cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBkaXNwb3NhYmxlIE9iamVjdCB0byBiZSBkaXNwb3NlZC5cbiAqIEBwYXJhbSBjbG9zdXJlIEZ1bmN0aW9uIGNhbGwgdG8gZXhlY3V0ZS5cbiAqIEByZXR1cm5zIHtUUmV0dXJufSBSZXR1cm5zIHdoYXRldmVyIHRoZSBjbG9zdXJlJ3MgcmV0dXJuIHZhbHVlIGlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNpbmcoZGlzcG9zYWJsZSwgY2xvc3VyZSkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjbG9zdXJlKGRpc3Bvc2FibGUpO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgZGlzcG9zZVNpbmdsZShkaXNwb3NhYmxlLCBmYWxzZSk7XG4gICAgfVxufVxuLyoqXG4gKiBUaGlzIHByaXZhdGUgZnVuY3Rpb24gbWFrZXMgZGlzcG9zaW5nIG1vcmUgcm9idXN0IGZvciB3aGVuIHRoZXJlJ3Mgbm8gdHlwZSBjaGVja2luZy5cbiAqIElmIHRyYXBFeGNlcHRpb25zIGlzICd0cnVlJyBpdCBjYXRjaGVzIGFuZCByZXR1cm5zIGFueSBleGNlcHRpb24gaW5zdGVhZCBvZiB0aHJvd2luZy5cbiAqL1xuZnVuY3Rpb24gZGlzcG9zZVNpbmdsZShkaXNwb3NhYmxlLCB0cmFwRXhjZXB0aW9ucykge1xuICAgIGlmIChkaXNwb3NhYmxlXG4gICAgICAgICYmIHR5cGVvZiBkaXNwb3NhYmxlID09IFR5cGUuT0JKRUNUXG4gICAgICAgICYmIHR5cGVvZiBkaXNwb3NhYmxlWydkaXNwb3NlJ10gPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGlmICh0cmFwRXhjZXB0aW9ucykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkaXNwb3NhYmxlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkaXNwb3NhYmxlLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG4vKipcbiAqIFRoaXMgZGlzcG9zZSBtZXRob2QgYXNzdW1lcyBpdCdzIHdvcmtpbmcgb24gYSBsb2NhbCBhcnJheUNvcHkgYW5kIGlzIHVuc2FmZSBmb3IgZXh0ZXJuYWwgdXNlLlxuICovXG5mdW5jdGlvbiBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgdHJhcEV4Y2VwdGlvbnMsIGluZGV4ID0gMCkge1xuICAgIGxldCBleGNlcHRpb25zO1xuICAgIGNvbnN0IGxlbiA9IGRpc3Bvc2FibGVzID8gZGlzcG9zYWJsZXMubGVuZ3RoIDogMDtcbiAgICBmb3IgKDsgaW5kZXggPCBsZW47IGluZGV4KyspIHtcbiAgICAgICAgbGV0IG5leHQgPSBkaXNwb3NhYmxlc1tpbmRleF07XG4gICAgICAgIGlmICghbmV4dClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiAodHJhcEV4Y2VwdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ID0gZGlzcG9zZVNpbmdsZShuZXh0LCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChleCkge1xuICAgICAgICAgICAgICAgIGlmICghZXhjZXB0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgIGV4Y2VwdGlvbnMucHVzaChleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkaXNwb3NlU2luZ2xlKG5leHQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGlmICghc3VjY2VzcyAmJiBpbmRleCArIDEgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLyogSWYgY29kZSBpcyAnY29udGludWVkJyBieSB0aGUgZGVidWdnZXIsXG4gICAgICAgICAgICAgICAgICAgICAqIG5lZWQgdG8gZW5zdXJlIHRoZSByZXN0IG9mIHRoZSBkaXNwb3NhYmxlcyBhcmUgY2FyZWQgZm9yLiAqL1xuICAgICAgICAgICAgICAgICAgICBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgZmFsc2UsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSnVzdCBpbiBjYXNlLi4uICBTaG91bGQgbmV2ZXIgaGFwcGVuLCBidXQgYXNzZXJ0cyB0aGUgaW50ZW50aW9uLlxuICAgICAgICAgICAgaWYgKCFzdWNjZXNzKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBleGNlcHRpb25zO1xufVxuZXhwb3J0IGRlZmF1bHQgZGlzcG9zZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpc3Bvc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL2Rpc3Bvc2UuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4vRW51bWVyYXRvckJhc2VcIjtcbmV4cG9ydCBjbGFzcyBJbmRleEVudW1lcmF0b3IgZXh0ZW5kcyBFbnVtZXJhdG9yQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlRmFjdG9yeSkge1xuICAgICAgICBsZXQgc291cmNlO1xuICAgICAgICBzdXBlcigoKSA9PiB7XG4gICAgICAgICAgICBzb3VyY2UgPSBzb3VyY2VGYWN0b3J5KCk7XG4gICAgICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPCAwKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJsZW5ndGggbXVzdCBiZSB6ZXJvIG9yIGdyZWF0ZXJcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShsZW4pKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJsZW5ndGggbXVzdCBmaW5pdGUgbnVtYmVyXCIpO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gJiYgc291cmNlLnN0ZXAgPT09IDApXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgSW5kZXhFbnVtZXJhdG9yIHN0ZXAgdmFsdWUgKDApLlwiKTtcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnRlciA9IHNvdXJjZS5wb2ludGVyO1xuICAgICAgICAgICAgICAgIGlmICghcG9pbnRlcilcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlciA9IDA7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocG9pbnRlciAhPSBNYXRoLmZsb29yKHBvaW50ZXIpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIEluZGV4RW51bWVyYXRvciBwb2ludGVyIHZhbHVlIChcIiArIHBvaW50ZXIgKyBcIikgaGFzIGRlY2ltYWwuXCIpO1xuICAgICAgICAgICAgICAgIHNvdXJjZS5wb2ludGVyID0gcG9pbnRlcjtcbiAgICAgICAgICAgICAgICBsZXQgc3RlcCA9IHNvdXJjZS5zdGVwO1xuICAgICAgICAgICAgICAgIGlmICghc3RlcClcbiAgICAgICAgICAgICAgICAgICAgc3RlcCA9IDE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RlcCAhPSBNYXRoLmZsb29yKHN0ZXApKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIEluZGV4RW51bWVyYXRvciBzdGVwIHZhbHVlIChcIiArIHN0ZXAgKyBcIikgaGFzIGRlY2ltYWwuXCIpO1xuICAgICAgICAgICAgICAgIHNvdXJjZS5zdGVwID0gc3RlcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBsZW4gPSAoc291cmNlICYmIHNvdXJjZS5zb3VyY2UpID8gc291cmNlLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICBpZiAoIWxlbiB8fCBpc05hTihsZW4pKVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBzb3VyY2UucG9pbnRlcjtcbiAgICAgICAgICAgIGlmIChzb3VyY2UucG9pbnRlciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHNvdXJjZS5wb2ludGVyID0gMDsgLy8gc2hvdWxkIG5ldmVyIGhhcHBlbiBidXQgaXMgaW4gcGxhY2UgdG8gbmVnYXRlIGNvbXBpbGVyIHdhcm5pbmdzLlxuICAgICAgICAgICAgaWYgKCFzb3VyY2Uuc3RlcClcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc3RlcCA9IDE7IC8vIHNob3VsZCBuZXZlciBoYXBwZW4gYnV0IGlzIGluIHBsYWNlIHRvIG5lZ2F0ZSBjb21waWxlciB3YXJuaW5ncy5cbiAgICAgICAgICAgIHNvdXJjZS5wb2ludGVyID0gc291cmNlLnBvaW50ZXIgKyBzb3VyY2Uuc3RlcDtcbiAgICAgICAgICAgIHJldHVybiAoY3VycmVudCA8IGxlbiAmJiBjdXJyZW50ID49IDApXG4gICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKHNvdXJjZS5zb3VyY2VbY3VycmVudF0pXG4gICAgICAgICAgICAgICAgOiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNvdXJjZS5zb3VyY2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5faXNFbmRsZXNzID0gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgSW5kZXhFbnVtZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW5kZXhFbnVtZXJhdG9yLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSW5kZXhFbnVtZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmV4cG9ydCBjbGFzcyBJdGVyYXRvclJlc3VsdCB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIGluZGV4LCBkb25lID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09ICdib29sZWFuJylcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IGluZGV4O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IGRvbmU7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgICB9XG59XG4oZnVuY3Rpb24gKEl0ZXJhdG9yUmVzdWx0KSB7XG4gICAgSXRlcmF0b3JSZXN1bHQuRG9uZSA9IG5ldyBJdGVyYXRvclJlc3VsdChWT0lEMCwgVk9JRDAsIHRydWUpO1xuICAgIGZ1bmN0aW9uIEdldERvbmUoKSB7IHJldHVybiBJdGVyYXRvclJlc3VsdC5Eb25lOyB9XG4gICAgSXRlcmF0b3JSZXN1bHQuR2V0RG9uZSA9IEdldERvbmU7XG59KShJdGVyYXRvclJlc3VsdCB8fCAoSXRlcmF0b3JSZXN1bHQgPSB7fSkpO1xuT2JqZWN0LmZyZWV6ZShJdGVyYXRvclJlc3VsdCk7XG5leHBvcnQgZGVmYXVsdCBJdGVyYXRvclJlc3VsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUl0ZXJhdG9yUmVzdWx0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSXRlcmF0b3JSZXN1bHQuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbi8qKlxuICogQ2FuIGJlIHVzZWQgc3RhdGljYWxseSBvciBleHRlbmRlZCBmb3IgdmFyeWluZyBkaWZmZXJlbnQgcmV1c2FibGUgZnVuY3Rpb24gc2lnbmF0dXJlcy5cbiAqL1xuLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqLyBleHBvcnQgY2xhc3MgRnVuY3Rpb25zIHtcbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogQSB0eXBlZCBtZXRob2QgZm9yIHVzZSB3aXRoIHNpbXBsZSBzZWxlY3Rpb24gb2YgdGhlIHBhcmFtZXRlci5cbiAgICAgKiBAcmV0dXJucyB7VH1cbiAgICAgKi9cbiAgICBJZGVudGl0eSh4KSB7IHJldHVybiB4OyB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBUcnVlKCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZhbHNlKCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAvKipcbiAgICAgKiBEb2VzIG5vdGhpbmcuXG4gICAgICovXG4gICAgQmxhbmsoKSB7IH1cbn1cbmNvbnN0IHJvb3RGdW5jdGlvbnMgPSBuZXcgRnVuY3Rpb25zKCk7XG4vLyBFeHBvc2Ugc3RhdGljIHZlcnNpb25zLlxuKGZ1bmN0aW9uIChGdW5jdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBBIHR5cGVkIG1ldGhvZCBmb3IgdXNlIHdpdGggc2ltcGxlIHNlbGVjdGlvbiBvZiB0aGUgcGFyYW1ldGVyLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5JZGVudGl0eSA9IHJvb3RGdW5jdGlvbnMuSWRlbnRpdHk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBGdW5jdGlvbnMuVHJ1ZSA9IHJvb3RGdW5jdGlvbnMuVHJ1ZTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5GYWxzZSA9IHJvb3RGdW5jdGlvbnMuRmFsc2U7XG4gICAgLyoqXG4gICAgICogRG9lcyBub3RoaW5nLlxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5CbGFuayA9IHJvb3RGdW5jdGlvbnMuQmxhbms7XG59KShGdW5jdGlvbnMgfHwgKEZ1bmN0aW9ucyA9IHt9KSk7XG4vLyBNYWtlIHRoaXMgcmVhZCBvbmx5LiAgU2hvdWxkIHN0aWxsIGFsbG93IGZvciBzdWItY2xhc3Npbmcgc2luY2UgZXh0cmEgbWV0aG9kcyBhcmUgYWRkZWQgdG8gcHJvdG90eXBlLlxuT2JqZWN0LmZyZWV6ZShGdW5jdGlvbnMpO1xuZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb25zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RnVuY3Rpb25zLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRnVuY3Rpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSBcIi4vRW51bWVyYXRpb24vRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgYXJlRXF1YWwgfSBmcm9tIFwiLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgRGlzcG9zYWJsZUJhc2UgfSBmcm9tIFwiLi4vRGlzcG9zYWJsZS9EaXNwb3NhYmxlQmFzZVwiO1xuaW1wb3J0IHsgaXNDb21tb25KUywgaXNOb2RlSlMsIGlzUmVxdWlyZUpTIH0gZnJvbSBcIi4uL0Vudmlyb25tZW50XCI7XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLy9ub2luc3BlY3Rpb24gU3BlbGxDaGVja2luZ0luc3BlY3Rpb25cbmNvbnN0IE5BTUUgPSBcIkNvbGxlY3Rpb25CYXNlXCIsIENNREMgPSBcIkNhbm5vdCBtb2RpZnkgYSBkaXNwb3NlZCBjb2xsZWN0aW9uLlwiLCBDTVJPID0gXCJDYW5ub3QgbW9kaWZ5IGEgcmVhZC1vbmx5IGNvbGxlY3Rpb24uXCI7XG5jb25zdCBMSU5RX1BBVEggPSBcIi4uLy4uL1N5c3RlbS5MaW5xL0xpbnFcIjtcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uQmFzZSBleHRlbmRzIERpc3Bvc2FibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UsIF9lcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZXF1YWxpdHlDb21wYXJlciA9IF9lcXVhbGl0eUNvbXBhcmVyO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBOQU1FO1xuICAgICAgICBfLl9pbXBvcnRFbnRyaWVzKHNvdXJjZSk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbiA9IDA7XG4gICAgICAgIF8uX21vZGlmaWVkQ291bnQgPSAwO1xuICAgICAgICBfLl92ZXJzaW9uID0gMDtcbiAgICB9XG4gICAgZ2V0IGNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb3VudCgpO1xuICAgIH1cbiAgICBnZXRJc1JlYWRPbmx5KCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIGdldCBpc1JlYWRPbmx5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJc1JlYWRPbmx5KCk7XG4gICAgfVxuICAgIGFzc2VydE1vZGlmaWFibGUoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKENNREMpO1xuICAgICAgICBpZiAodGhpcy5nZXRJc1JlYWRPbmx5KCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihDTVJPKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGFzc2VydFZlcnNpb24odmVyc2lvbikge1xuICAgICAgICBpZiAodmVyc2lvbiAhPT0gdGhpcy5fdmVyc2lvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ29sbGVjdGlvbiB3YXMgbW9kaWZpZWQuXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgX29uTW9kaWZpZWQoKSB7IH1cbiAgICBfc2lnbmFsTW9kaWZpY2F0aW9uKGluY3JlbWVudCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKGluY3JlbWVudClcbiAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgaWYgKF8uX21vZGlmaWVkQ291bnQgJiYgIXRoaXMuX3VwZGF0ZVJlY3Vyc2lvbikge1xuICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCA9IDA7XG4gICAgICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF8uX29uTW9kaWZpZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIC8vIEF2b2lkIGZhdGFsIGVycm9ycyB3aGljaCBtYXkgaGF2ZSBiZWVuIGNhdXNlZCBieSBjb25zdW1lci5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgX2luY3JlbWVudE1vZGlmaWVkKCkgeyB0aGlzLl9tb2RpZmllZENvdW50Kys7IH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICBnZXQgaXNVcGRhdGluZygpIHsgcmV0dXJuIHRoaXMuX3VwZGF0ZVJlY3Vyc2lvbiAhPSAwOyB9XG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBjbG9zdXJlIHRoYXQgaWYgcmV0dXJuaW5nIHRydWUgd2lsbCBwcm9wYWdhdGUgYW4gdXBkYXRlIHNpZ25hbC5cbiAgICAgKiBNdWx0aXBsZSB1cGRhdGUgb3BlcmF0aW9ucyBjYW4gYmUgb2NjdXJyaW5nIGF0IG9uY2Ugb3IgcmVjdXJzaXZlbHkgYW5kIHRoZSBvbk1vZGlmaWVkIHNpZ25hbCB3aWxsIG9ubHkgb2NjdXIgb25jZSB0aGV5J3JlIGRvbmUuXG4gICAgICogQHBhcmFtIGNsb3N1cmVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBoYW5kbGVVcGRhdGUoY2xvc3VyZSkge1xuICAgICAgICBpZiAoIWNsb3N1cmUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIGxldCB1cGRhdGVkID0gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodXBkYXRlZCA9IGNsb3N1cmUoKSlcbiAgICAgICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24tLTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgfVxuICAgIC8qXG4gICAgICogTm90ZTogZm9yIGEgc2xpZ2h0IGFtb3VudCBtb3JlIGNvZGUsIHdlIGF2b2lkIGNyZWF0aW5nIGZ1bmN0aW9ucy9jbG9zdXJlcy5cbiAgICAgKiBDYWxsaW5nIGhhbmRsZVVwZGF0ZSBpcyB0aGUgY29ycmVjdCBwYXR0ZXJuLCBidXQgaWYgcG9zc2libGUgYXZvaWQgY3JlYXRpbmcgYW5vdGhlciBmdW5jdGlvbiBzY29wZS5cbiAgICAgKi9cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGVudHJ5IHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBlbnRyeVxuICAgICAqL1xuICAgIGFkZChlbnRyeSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF8uX2FkZEludGVybmFsKGVudHJ5KSlcbiAgICAgICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24tLTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZW50cmllcyBmcm9tIHRoZSBjb2xsZWN0aW9uIGFsbG93aW5nIGZvciBhIGxpbWl0LlxuICAgICAqIEZvciBleGFtcGxlIGlmIHRoZSBjb2xsZWN0aW9uIG5vdCBhIGRpc3RpbmN0IHNldCwgbW9yZSB0aGFuIG9uZSBlbnRyeSBjb3VsZCBiZSByZW1vdmVkLlxuICAgICAqIEBwYXJhbSBlbnRyeSBUaGUgZW50cnkgdG8gcmVtb3ZlLlxuICAgICAqIEBwYXJhbSBtYXggTGltaXQgb2YgZW50cmllcyB0byByZW1vdmUuICBXaWxsIHJlbW92ZSBhbGwgbWF0Y2hlcyBpZiBubyBtYXggc3BlY2lmaWVkLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZW50cmllcyByZW1vdmVkLlxuICAgICAqL1xuICAgIHJlbW92ZShlbnRyeSwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24rKztcbiAgICAgICAgbGV0IG4gPSBOYU47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobiA9IF8uX3JlbW92ZUludGVybmFsKGVudHJ5LCBtYXgpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBjb250ZW50cyBvZiB0aGUgY29sbGVjdGlvbiByZXN1bHRpbmcgaW4gYSBjb3VudCBvZiB6ZXJvLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIGxldCBuID0gTmFOO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG4gPSBfLl9jbGVhckludGVybmFsKCkpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2NsZWFySW50ZXJuYWwoKTtcbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IDA7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlY3Vyc2lvbiA9IDA7XG4gICAgICAgIHRoaXMuX21vZGlmaWVkQ291bnQgPSAwO1xuICAgICAgICBjb25zdCBsID0gdGhpcy5fbGlucTtcbiAgICAgICAgdGhpcy5fbGlucSA9IHZvaWQgMDtcbiAgICAgICAgaWYgKGwpXG4gICAgICAgICAgICBsLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgX2ltcG9ydEVudHJpZXMoZW50cmllcykge1xuICAgICAgICBsZXQgYWRkZWQgPSAwO1xuICAgICAgICBpZiAoZW50cmllcykge1xuICAgICAgICAgICAgaWYgKChlbnRyaWVzKSBpbnN0YW5jZW9mIChBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAvLyBPcHRpbWl6ZSBmb3IgYXZvaWRpbmcgYSBuZXcgY2xvc3VyZS5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlIG9mIGVudHJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FkZEludGVybmFsKGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JFYWNoKGVudHJpZXMsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWRkSW50ZXJuYWwoZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRlZCsrO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhZGRlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2FmZWx5IGltcG9ydHMgYW55IGFycmF5IGVudW1lcmF0b3IsIG9yIGVudW1lcmFibGUuXG4gICAgICogQHBhcmFtIGVudHJpZXNcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGltcG9ydEVudHJpZXMoZW50cmllcykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFlbnRyaWVzKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24rKztcbiAgICAgICAgbGV0IG4gPSBOYU47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobiA9IF8uX2ltcG9ydEVudHJpZXMoZW50cmllcykpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGZpbHRlcmVkIGJ5IHRoZSBwcm92aWRlZCBwcmVkaWNhdGUuXG4gICAgICogUHJvdmlkZWQgZm9yIHNpbWlsYXJpdHkgdG8gSlMgQXJyYXkuXG4gICAgICogQHBhcmFtIHByZWRpY2F0ZVxuICAgICAqIEByZXR1cm5zIHtbXX1cbiAgICAgKi9cbiAgICBmaWx0ZXIocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigncHJlZGljYXRlJyk7XG4gICAgICAgIGxldCBjb3VudCA9ICF0aGlzLmdldENvdW50KCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlKGUsIGkpKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSB0aGUgZmlyc3QgdGltZSBwcmVkaWNhdGUgcmV0dXJucyB0cnVlLiAgT3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqIFVzZWZ1bCBmb3Igc2VhcmNoaW5nIHRocm91Z2ggYSBjb2xsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGFueShwcmVkaWNhdGUpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICBpZiAoIWNvdW50KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHJldHVybiBCb29sZWFuKGNvdW50KTtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoZSwgaSkgPT4gIShmb3VuZCA9IHByZWRpY2F0ZShlLCBpKSkpO1xuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSB0aGUgZmlyc3QgdGltZSBwcmVkaWNhdGUgcmV0dXJucyB0cnVlLiAgT3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqIFNlZSAnLmFueShwcmVkaWNhdGUpJy4gIEFzIHRoaXMgbWV0aG9kIGlzIGp1c3QganVzdCBpbmNsdWRlZCB0byBoYXZlIHNpbWlsYXJpdHkgd2l0aCBhIEpTIEFycmF5LlxuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHNvbWUocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFueShwcmVkaWNhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVxdWFsaXR5IGNvbXBhcmVyIHJlc29sdmVzIHRydWUgb24gYW55IGVsZW1lbnQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAgICogQHBhcmFtIGVudHJ5XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnMoZW50cnkpIHtcbiAgICAgICAgY29uc3QgZXF1YWxzID0gdGhpcy5fZXF1YWxpdHlDb21wYXJlcjtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW55KGUgPT4gZXF1YWxzKGVudHJ5LCBlKSk7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uLCB1c2VDb3B5KSB7XG4gICAgICAgIGlmICh0aGlzLndhc0Rpc3Bvc2VkKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGlmICh1c2VDb3B5KSB7XG4gICAgICAgICAgICBjb25zdCBhID0gdGhpcy50b0FycmF5KCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JFYWNoKGEsIGFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBhLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZm9yRWFjaCh0aGlzLmdldEVudW1lcmF0b3IoKSwgYWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgYWxsIHZhbHVlcyB0byBudW1lcmljYWxseSBpbmRleGFibGUgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKiBAcmV0dXJucyB7VFRhcmdldH1cbiAgICAgKi9cbiAgICBjb3B5VG8odGFyZ2V0LCBpbmRleCA9IDApIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCd0YXJnZXQnKTtcbiAgICAgICAgY29uc3QgY291bnQgPSB0aGlzLmdldENvdW50KCk7XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgY29uc3QgbmV3TGVuZ3RoID0gY291bnQgKyBpbmRleDtcbiAgICAgICAgICAgIGlmICh0YXJnZXQubGVuZ3RoIDwgbmV3TGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRhcmdldC5sZW5ndGggPSBuZXdMZW5ndGg7XG4gICAgICAgICAgICBjb25zdCBlID0gdGhpcy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB3aGlsZSAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2luZGV4KytdID0gZS5jdXJyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIGNvbGxlY3Rpb24gY29udGVudHMuXG4gICAgICogQHJldHVybnMge2FueVtdfEFycmF5fVxuICAgICAqL1xuICAgIHRvQXJyYXkoKSB7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICByZXR1cm4gY291bnRcbiAgICAgICAgICAgID8gdGhpcy5jb3B5VG8oY291bnQgPiA2NTUzNiA/IG5ldyBBcnJheShjb3VudCkgOiBbXSlcbiAgICAgICAgICAgIDogW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIC5saW5xIHdpbGwgcmV0dXJuIGFuIElMaW5xRW51bWVyYWJsZSBpZiAubGlucUFzeW5jKCkgaGFzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkgb3IgdGhlIGRlZmF1bHQgbW9kdWxlIGxvYWRlciBpcyBOb2RlSlMrQ29tbW9uSlMuXG4gICAgICogQHJldHVybnMge0lMaW5xRW51bWVyYWJsZX1cbiAgICAgKi9cbiAgICBnZXQgbGlucSgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IGUgPSB0aGlzLl9saW5xO1xuICAgICAgICBpZiAoIWUpIHtcbiAgICAgICAgICAgIGxldCByO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByID0gZXZhbCgncmVxdWlyZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7IH1cbiAgICAgICAgICAgIHRoaXMuX2xpbnEgPSBlID0gciAmJiByKExJTlFfUEFUSCkuZGVmYXVsdC5mcm9tKHRoaXMpO1xuICAgICAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgaXNSZXF1aXJlSlNcbiAgICAgICAgICAgICAgICAgICAgPyBgdXNpbmcgLmxpbnEgdG8gbG9hZCBhbmQgaW5pdGlhbGl6ZSBhIElMaW5xRW51bWVyYWJsZSBpcyBjdXJyZW50bHkgb25seSBzdXBwb3J0ZWQgd2l0aGluIGEgTm9kZUpTIGVudmlyb25tZW50LlxyXG5JbXBvcnQgU3lzdGVtLkxpbnEvTGlucSBhbmQgdXNlIEVudW1lcmFibGUuZnJvbShlKSBpbnN0ZWFkLlxyXG5Zb3UgY2FuIGFsc28gcHJlbG9hZCB0aGUgTGlucSBtb2R1bGUgYXMgYSBkZXBlbmRlbmN5IG9yIHVzZSAubGlucUFzeW5jKGNhbGxiYWNrKSBmb3IgQU1EL1JlcXVpcmVKUy5gXG4gICAgICAgICAgICAgICAgICAgIDogXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGltcG9ydGluZyBTeXN0ZW0uTGlucS9MaW5xXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIC5saW5xQXN5bmMoKSBpcyBmb3IgdXNlIHdpdGggZGVmZXJyZWQgbG9hZGluZy5cbiAgICAgKiBFbnN1cmVzIGFuIGluc3RhbmNlIG9mIHRoZSBMaW5xIGV4dGVuc2lvbnMgaXMgYXZhaWxhYmxlIGFuZCB0aGVuIHBhc3NlcyBpdCB0byB0aGUgY2FsbGJhY2suXG4gICAgICogUmV0dXJucyBhbiBJTGlucUVudW1lcmFibGUgaWYgb25lIGlzIGFscmVhZHkgYXZhaWxhYmxlLCBvdGhlcndpc2UgdW5kZWZpbmVkLlxuICAgICAqIFBhc3Npbmcgbm8gcGFyYW1ldGVycyB3aWxsIHN0aWxsIGluaXRpYXRlIGxvYWRpbmcgYW5kIGluaXRpYWxpemluZyB0aGUgSUxpbnFFbnVtZXJhYmxlIHdoaWNoIGNhbiBiZSB1c2VmdWwgZm9yIHByZS1sb2FkaW5nLlxuICAgICAqIEFueSBjYWxsIHRvIC5saW5xQXN5bmMoKSB3aGVyZSBhbiBJTGlucUVudW1lcmFibGUgaXMgcmV0dXJuZWQgY2FuIGJlIGFzc3VyZWQgdGhhdCBhbnkgc3Vic2VxdWVudCBjYWxscyB0byAubGlucSB3aWxsIHJldHVybiB0aGUgc2FtZSBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB7SUxpbnFFbnVtZXJhYmxlfVxuICAgICAqL1xuICAgIGxpbnFBc3luYyhjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgZSA9IHRoaXMuX2xpbnE7XG4gICAgICAgIGlmICghZSkge1xuICAgICAgICAgICAgaWYgKGlzUmVxdWlyZUpTKSB7XG4gICAgICAgICAgICAgICAgZXZhbChcInJlcXVpcmVcIikoW0xJTlFfUEFUSF0sIChsaW5xKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENvdWxkIGVuZCB1cCBiZWluZyBjYWxsZWQgbW9yZSB0aGFuIG9uY2UsIGJlIHN1cmUgdG8gY2hlY2sgZm9yIC5fbGlucSBiZWZvcmUgc2V0dGluZy4uLlxuICAgICAgICAgICAgICAgICAgICBlID0gdGhpcy5fbGlucTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlucSA9IGUgPSBsaW5xLmRlZmF1bHQuZnJvbSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGltcG9ydGluZyBTeXN0ZW0uTGlucS9MaW5xXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHZvaWQgMDsgLy8gSW4gY2FzZSB0aGlzIGlzIHJldHVybiBzeW5jaHJvbm91c2x5Li5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzTm9kZUpTICYmIGlzQ29tbW9uSlMpIHtcbiAgICAgICAgICAgICAgICBlID0gdGhpcy5saW5xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJDYW5ub3QgZmluZCBhIGNvbXBhdGlibGUgbG9hZGVyIGZvciBpbXBvcnRpbmcgU3lzdGVtLkxpbnEvTGlucVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlICYmIGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbGxlY3Rpb25CYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQ29sbGVjdGlvbkJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tIFwiLi9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuLyoqXG4gKlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHNvdXJjZUluZGV4XG4gKiBAcGFyYW0gbGVuZ3RoXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weShzb3VyY2UsIHNvdXJjZUluZGV4ID0gMCwgbGVuZ3RoID0gSW5maW5pdHkpIHtcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZTsgLy8gbWF5IGhhdmUgcGFzc2VkIHplcm8/IHVuZGVmaW5lZD8gb3IgbnVsbD9cbiAgICByZXR1cm4gY29weVRvKHNvdXJjZSwgaW5pdGlhbGl6ZShNYXRoLm1pbihsZW5ndGgsIE1hdGgubWF4KHNvdXJjZS5sZW5ndGggLSBzb3VyY2VJbmRleCwgMCkpKSwgc291cmNlSW5kZXgsIDAsIGxlbmd0aCk7XG59XG5jb25zdCBDQk4gPSAnQ2Fubm90IGJlIG51bGwuJywgQ0JMMCA9ICdDYW5ub3QgYmUgbGVzcyB0aGFuIHplcm8uJztcbi8qKlxuICogQ29waWVzIG9uZSBhcnJheSB0byBhbm90aGVyLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIGRlc3RpbmF0aW9uXG4gKiBAcGFyYW0gc291cmNlSW5kZXhcbiAqIEBwYXJhbSBkZXN0aW5hdGlvbkluZGV4XG4gKiBAcGFyYW0gbGVuZ3RoIEFuIG9wdGlvbmFsIGxpbWl0IHRvIHN0b3AgY29weWluZy5cbiAqIEByZXR1cm5zIFRoZSBkZXN0aW5hdGlvbiBhcnJheS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUbyhzb3VyY2UsIGRlc3RpbmF0aW9uLCBzb3VyY2VJbmRleCA9IDAsIGRlc3RpbmF0aW9uSW5kZXggPSAwLCBsZW5ndGggPSBJbmZpbml0eSkge1xuICAgIGlmICghc291cmNlKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdzb3VyY2UnLCBDQk4pO1xuICAgIGlmICghZGVzdGluYXRpb24pXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2Rlc3RpbmF0aW9uJywgQ0JOKTtcbiAgICBpZiAoc291cmNlSW5kZXggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzb3VyY2VJbmRleCcsIHNvdXJjZUluZGV4LCBDQkwwKTtcbiAgICBsZXQgc291cmNlTGVuZ3RoID0gc291cmNlLmxlbmd0aDtcbiAgICBpZiAoIXNvdXJjZUxlbmd0aClcbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgIGlmIChzb3VyY2VJbmRleCA+PSBzb3VyY2VMZW5ndGgpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ3NvdXJjZUluZGV4Jywgc291cmNlSW5kZXgsICdNdXN0IGJlIGxlc3MgdGhhbiB0aGUgbGVuZ3RoIG9mIHRoZSBzb3VyY2UgYXJyYXkuJyk7XG4gICAgaWYgKGRlc3RpbmF0aW9uLmxlbmd0aCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2Rlc3RpbmF0aW9uSW5kZXgnLCBkZXN0aW5hdGlvbkluZGV4LCBDQkwwKTtcbiAgICBjb25zdCBtYXhMZW5ndGggPSBzb3VyY2UubGVuZ3RoIC0gc291cmNlSW5kZXg7XG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkgJiYgbGVuZ3RoID4gbWF4TGVuZ3RoKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzb3VyY2VJbmRleCcsIHNvdXJjZUluZGV4LCAnU291cmNlIGluZGV4ICsgbGVuZ3RoIGNhbm5vdCBleGNlZWQgdGhlIGxlbmd0aCBvZiB0aGUgc291cmNlIGFycmF5LicpO1xuICAgIGxlbmd0aCA9IE1hdGgubWluKGxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICBjb25zdCBuZXdMZW5ndGggPSBkZXN0aW5hdGlvbkluZGV4ICsgbGVuZ3RoO1xuICAgIGlmIChuZXdMZW5ndGggPiBkZXN0aW5hdGlvbi5sZW5ndGgpXG4gICAgICAgIGRlc3RpbmF0aW9uLmxlbmd0aCA9IG5ld0xlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uW2Rlc3RpbmF0aW9uSW5kZXggKyBpXSA9IHNvdXJjZVtzb3VyY2VJbmRleCArIGldO1xuICAgIH1cbiAgICByZXR1cm4gZGVzdGluYXRpb247XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3B5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvY29weS5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuZXhwb3J0IGNvbnN0IEVNUFRZID0gJyc7XG4vKipcbiAqIFJldHVybnMgYSBudW1lcmljYWwgKGludGVnZXIpIGhhc2ggY29kZSBvZiB0aGUgc3RyaW5nLiAgQ2FuIGJlIHVzZWQgZm9yIGlkZW50aWZ5aW5nIGluZXF1YWxpdHkgb2YgY29udGVudHMsIGJ1dCB0d28gZGlmZmVyZW50IHN0cmluZ3MgaW4gcmFyZSBjYXNlcyB3aWxsIGhhdmUgdGhlIHNhbWUgaGFzaCBjb2RlLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhhc2hDb2RlKHNvdXJjZSkge1xuICAgIGxldCBoYXNoID0gMCB8IDA7XG4gICAgaWYgKHNvdXJjZS5sZW5ndGggPT0gMClcbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzb3VyY2UubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGxldCBjaCA9IHNvdXJjZS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaDtcbiAgICAgICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgICB9XG4gICAgcmV0dXJuIGhhc2g7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0KHNvdXJjZSwgY291bnQpIHtcbiAgICBsZXQgcmVzdWx0ID0gRU1QVFk7XG4gICAgaWYgKCFpc05hTihjb3VudCkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gc291cmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUNoYXJzKGNoT3JDaGFycywgY291bnQgPSAxKSB7XG4gICAgaWYgKChjaE9yQ2hhcnMpIGluc3RhbmNlb2YgKEFycmF5KSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gRU1QVFk7XG4gICAgICAgIGZvciAobGV0IGNoYXIgb2YgY2hPckNoYXJzKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcGVhdChTdHJpbmcuZnJvbUNoYXJDb2RlKGNoT3JDaGFycyksIGNvdW50KTtcbiAgICB9XG59XG4vKipcbiAqIEVzY2FwZXMgYSBSZWdFeHAgc2VxdWVuY2UuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHNvdXJjZSkge1xuICAgIHJldHVybiBzb3VyY2UucmVwbGFjZSgvWy1bXFxdXFwve30oKSorPy5cXFxcXiR8XS9nLCBcIlxcXFwkJlwiKTtcbn1cbi8qKlxuICogQ2FuIHRyaW0gYW55IGNoYXJhY3RlciBvciBzZXQgb2YgY2hhcmFjdGVycyBmcm9tIHRoZSBlbmRzIG9mIGEgc3RyaW5nLlxuICogVXNlcyBhIFJlZ2V4IGVzY2FwZW1lbnQgdG8gcmVwbGFjZSB0aGVtIHdpdGggZW1wdHkuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gY2hhcnMgQSBzdHJpbmcgb3IgYXJyYXkgb2YgY2hhcmFjdGVycyBkZXNpcmVkIHRvIGJlIHRyaW1tZWQuXG4gKiBAcGFyYW0gaWdub3JlQ2FzZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc291cmNlLCBjaGFycywgaWdub3JlQ2FzZSkge1xuICAgIGlmIChjaGFycyA9PT0gRU1QVFkpXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgaWYgKGNoYXJzKSB7XG4gICAgICAgIGNvbnN0IGVzY2FwZWQgPSBlc2NhcGVSZWdFeHAoKGNoYXJzKSBpbnN0YW5jZW9mIChBcnJheSkgPyBjaGFycy5qb2luKCkgOiBjaGFycyk7XG4gICAgICAgIHJldHVybiBzb3VyY2UucmVwbGFjZShuZXcgUmVnRXhwKCdeWycgKyBlc2NhcGVkICsgJ10rfFsnICsgZXNjYXBlZCArICddKyQnLCAnZycgKyAoaWdub3JlQ2FzZVxuICAgICAgICAgICAgPyAnaSdcbiAgICAgICAgICAgIDogJycpKSwgRU1QVFkpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlLnJlcGxhY2UoL15cXHMrfFxccyskL2csIEVNUFRZKTtcbn1cbi8qKlxuICogVGFrZXMgYW55IGFyZ1xuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIGFyZ3NcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoc291cmNlLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHN1cHBsYW50KHNvdXJjZSwgYXJncyk7XG59XG4vL1xuLyoqXG4gKiBUaGlzIHRha2VzIGEgc3RyaW5nIGFuZCByZXBsYWNlcyAne3N0cmluZ30nIHdpdGggdGhlIHJlc3BlY3RlZCBwYXJhbWV0ZXIuXG4gKiBBbHNvIGFsbG93cyBmb3IgcGFzc2luZyBhbiBhcnJheSBpbiBvcmRlciB0byB1c2UgJ3tufScgbm90YXRpb24uXG4gKiBOb3QgbGltaXRlZCB0byBhbiBhcnJheSdzIGluZGV4ZXMuICBGb3IgZXhhbXBsZSwge2xlbmd0aH0gaXMgYWxsb3dlZC5cbiAqIEJhc2VkIHVwb24gQ3JvY2tmb3JkJ3Mgc3VwcGxhbnQgZnVuY3Rpb24uXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gcGFyYW1zXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VwcGxhbnQoc291cmNlLCBwYXJhbXMpIHtcbiAgICBjb25zdCBvSXNBcnJheSA9IChwYXJhbXMpIGluc3RhbmNlb2YgKEFycmF5KTtcbiAgICByZXR1cm4gc291cmNlLnJlcGxhY2UoL3soW157fV0qKX0vZywgKGEsIGIpID0+IHtcbiAgICAgICAgbGV0IG4gPSBiO1xuICAgICAgICBpZiAob0lzQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBpID0gcGFyc2VJbnQoYik7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKGkpKVxuICAgICAgICAgICAgICAgIG4gPSBpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByID0gcGFyYW1zW25dO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiByKSB7XG4gICAgICAgICAgICBjYXNlIFR5cGUuU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBUeXBlLk5VTUJFUjpcbiAgICAgICAgICAgIGNhc2UgVHlwZS5CT09MRUFOOlxuICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKHIgJiYgVHlwZS5oYXNNZW1iZXJPZlR5cGUociwgXCJ0b1N0cmluZ1wiLCBUeXBlLkZVTkNUSU9OKSlcbiAgICAgICAgICAgICAgICAgICAgPyByLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgOiBhO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjYW5NYXRjaChzb3VyY2UsIG1hdGNoKSB7XG4gICAgaWYgKCFUeXBlLmlzU3RyaW5nKHNvdXJjZSkgfHwgIW1hdGNoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHNvdXJjZSA9PT0gbWF0Y2gpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmIChtYXRjaC5sZW5ndGggPCBzb3VyY2UubGVuZ3RoKVxuICAgICAgICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXR0ZXJuIG1hdGNoZXMgdGhlIGJlZ2lubmluZyBvZiB0aGUgc291cmNlLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHBhdHRlcm5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRzV2l0aChzb3VyY2UsIHBhdHRlcm4pIHtcbiAgICBjb25zdCBtID0gY2FuTWF0Y2goc291cmNlLCBwYXR0ZXJuKTtcbiAgICByZXR1cm4gVHlwZS5pc0Jvb2xlYW4obSkgPyBtIDogc291cmNlLmluZGV4T2YocGF0dGVybikgPT0gMDtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXR0ZXJuIG1hdGNoZXMgdGhlIGVuZCBvZiB0aGUgc291cmNlLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHBhdHRlcm5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5kc1dpdGgoc291cmNlLCBwYXR0ZXJuKSB7XG4gICAgY29uc3QgbSA9IGNhbk1hdGNoKHNvdXJjZSwgcGF0dGVybik7XG4gICAgcmV0dXJuIFR5cGUuaXNCb29sZWFuKG0pID8gbSA6IHNvdXJjZS5sYXN0SW5kZXhPZihwYXR0ZXJuKSA9PSAoc291cmNlLmxlbmd0aCAtIHBhdHRlcm4ubGVuZ3RoKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVV0aWxpdHkuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UZXh0L1V0aWxpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IEluZGV4RW51bWVyYXRvciB9IGZyb20gXCIuL0luZGV4RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5leHBvcnQgY2xhc3MgQXJyYXlFbnVtZXJhdG9yIGV4dGVuZHMgSW5kZXhFbnVtZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheU9yRmFjdG9yeSwgc3RhcnQgPSAwLCBzdGVwID0gMSkge1xuICAgICAgICBzdXBlcigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhcnJheSA9IFR5cGUuaXNGdW5jdGlvbihhcnJheU9yRmFjdG9yeSkgPyBhcnJheU9yRmFjdG9yeSgpIDogYXJyYXlPckZhY3Rvcnk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNvdXJjZTogYXJyYXksXG4gICAgICAgICAgICAgICAgcG9pbnRlcjogc3RhcnQsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICAgICAgICAgICAgc3RlcDogc3RlcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQXJyYXlFbnVtZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJyYXlFbnVtZXJhdG9yLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vQXJyYXlFbnVtZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ09iamVjdERpc3Bvc2VkRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBleHRlbmRzIEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24ge1xuICAgIC8vIEZvciBzaW1wbGljaXR5IGFuZCBjb25zaXN0ZW5jeSwgbGV0cyBzdGljayB3aXRoIDEgc2lnbmF0dXJlLlxuICAgIGNvbnN0cnVjdG9yKG9iamVjdE5hbWUsIG1lc3NhZ2UsIGlubmVyRXhjZXB0aW9uKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJycsIGlubmVyRXhjZXB0aW9uLCAoXykgPT4ge1xuICAgICAgICAgICAgXy5vYmplY3ROYW1lID0gb2JqZWN0TmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBvTmFtZSA9IF8ub2JqZWN0TmFtZTtcbiAgICAgICAgb05hbWUgPSBvTmFtZSA/ICgneycgKyBvTmFtZSArICd9ICcpIDogJyc7XG4gICAgICAgIHJldHVybiAnWycgKyBfLm5hbWUgKyAnOiAnICsgb05hbWUgKyBfLm1lc3NhZ2UgKyAnXSc7XG4gICAgfVxuICAgIHN0YXRpYyB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zYWJsZSwgb2JqZWN0TmFtZSwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoZGlzcG9zYWJsZS53YXNEaXNwb3NlZClcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbihvYmplY3ROYW1lLCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYmplY3REaXNwb3NlZEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uIE9iamVjdFBvb2wgZnJvbSBQYXJhbGxlbCBFeHRlbnNpb24gRXh0cmFzIGFuZCBvdGhlciBPYmplY3RQb29sIGltcGxlbWVudGF0aW9ucy5cbiAqIFVzZXMgLmFkZChUKSBhbmQgLnRha2UoKTpUXG4gKi9cbmltcG9ydCB7IGRpc3Bvc2UgfSBmcm9tIFwiLi9kaXNwb3NlXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBUYXNrSGFuZGxlciB9IGZyb20gXCIuLi9UaHJlYWRpbmcvVGFza3MvVGFza0hhbmRsZXJcIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBPQkpFQ1RfUE9PTCA9IFwiT2JqZWN0UG9vbFwiLCBfTUFYX1NJWkUgPSBcIl9tYXhTaXplXCIsIEFCU09MVVRFX01BWF9TSVpFID0gNjU1MzYsIE1VU1RfQkVfR1QxID0gXCJNdXN0IGJlIGF0IHZhbGlkIG51bWJlciBsZWFzdCAxLlwiLCBNVVNUX0JFX0xUTSA9IGBNdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAke0FCU09MVVRFX01BWF9TSVpFfS5gO1xuZXhwb3J0IGNsYXNzIE9iamVjdFBvb2wgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX21heFNpemUsIF9nZW5lcmF0b3IsIF9yZWN5Y2xlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9tYXhTaXplID0gX21heFNpemU7XG4gICAgICAgIHRoaXMuX2dlbmVyYXRvciA9IF9nZW5lcmF0b3I7XG4gICAgICAgIHRoaXMuX3JlY3ljbGVyID0gX3JlY3ljbGVyO1xuICAgICAgICAvKipcbiAgICAgICAgICogQnkgZGVmYXVsdCB3aWxsIGNsZWFyIGFmdGVyIDUgc2Vjb25kcyBvZiBub24tdXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hdXRvQ2xlYXJUaW1lb3V0ID0gNTAwMDtcbiAgICAgICAgaWYgKGlzTmFOKF9tYXhTaXplKSB8fCBfbWF4U2l6ZSA8IDEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKF9NQVhfU0laRSwgX21heFNpemUsIE1VU1RfQkVfR1QxKTtcbiAgICAgICAgaWYgKF9tYXhTaXplID4gQUJTT0xVVEVfTUFYX1NJWkUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKF9NQVhfU0laRSwgX21heFNpemUsIE1VU1RfQkVfTFRNKTtcbiAgICAgICAgdGhpcy5fbG9jYWxBYnNNYXhTaXplID0gTWF0aC5taW4oX21heFNpemUgKiAyLCBBQlNPTFVURV9NQVhfU0laRSk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IE9CSkVDVF9QT09MO1xuICAgICAgICBfLl9wb29sID0gW107XG4gICAgICAgIF8uX3RyaW1tZXIgPSBuZXcgVGFza0hhbmRsZXIoKCkgPT4gXy5fdHJpbSgpKTtcbiAgICAgICAgY29uc3QgY2xlYXIgPSAoKSA9PiBfLl9jbGVhcigpO1xuICAgICAgICBfLl9mbHVzaGVyID0gbmV3IFRhc2tIYW5kbGVyKGNsZWFyKTtcbiAgICAgICAgXy5fYXV0b0ZsdXNoZXIgPSBuZXcgVGFza0hhbmRsZXIoY2xlYXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBtYXhpbXVtIGF0IHdoaWNoIHRyaW1taW5nIHNob3VsZCBhbGxvdy5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBtYXhTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4U2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBudW1iZXIgb2Ygb2JqZWN0cyBpbiBwb29sLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvdW50KCkge1xuICAgICAgICBjb25zdCBwID0gdGhpcy5fcG9vbDtcbiAgICAgICAgcmV0dXJuIHAgPyBwLmxlbmd0aCA6IDA7XG4gICAgfVxuICAgIF90cmltKCkge1xuICAgICAgICBjb25zdCBwb29sID0gdGhpcy5fcG9vbDtcbiAgICAgICAgd2hpbGUgKHBvb2wubGVuZ3RoID4gdGhpcy5fbWF4U2l6ZSkge1xuICAgICAgICAgICAgZGlzcG9zZS5zaW5nbGUocG9vbC5wb3AoKSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV2lsbCB0cmltIGVuc3VyZSB0aGUgcG9vbCBpcyBsZXNzIHRoYW4gdGhlIG1heFNpemUuXG4gICAgICogQHBhcmFtIGRlZmVyIEEgZGVsYXkgYmVmb3JlIHRyaW1taW5nLiAgV2lsbCBiZSBvdmVycmlkZGVuIGJ5IGxhdGVyIGNhbGxzLlxuICAgICAqL1xuICAgIHRyaW0oZGVmZXIpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhpcy5fdHJpbW1lci5zdGFydChkZWZlcik7XG4gICAgfVxuICAgIF9jbGVhcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHAgPSBfLl9wb29sO1xuICAgICAgICBfLl90cmltbWVyLmNhbmNlbCgpO1xuICAgICAgICBfLl9mbHVzaGVyLmNhbmNlbCgpO1xuICAgICAgICBfLl9hdXRvRmx1c2hlci5jYW5jZWwoKTtcbiAgICAgICAgZGlzcG9zZS50aGVzZS5ub0NvcHkocCwgdHJ1ZSk7XG4gICAgICAgIHAubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2lsbCBjbGVhciBvdXQgdGhlIHBvb2wuXG4gICAgICogQ2FuY2VscyBhbnkgc2NoZWR1bGVkIHRyaW1zIHdoZW4gZXhlY3V0ZWQuXG4gICAgICogQHBhcmFtIGRlZmVyIEEgZGVsYXkgYmVmb3JlIGNsZWFyaW5nLiAgV2lsbCBiZSBvdmVycmlkZGVuIGJ5IGxhdGVyIGNhbGxzLlxuICAgICAqL1xuICAgIGNsZWFyKGRlZmVyKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRoaXMuX2ZsdXNoZXIuc3RhcnQoZGVmZXIpO1xuICAgIH1cbiAgICB0b0FycmF5QW5kQ2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBfLl90cmltbWVyLmNhbmNlbCgpO1xuICAgICAgICBfLl9mbHVzaGVyLmNhbmNlbCgpO1xuICAgICAgICBjb25zdCBwID0gXy5fcG9vbDtcbiAgICAgICAgXy5fcG9vbCA9IFtdO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgZm9yIHRvQXJyYXlBbmRDbGVhcigpO1xuICAgICAqL1xuICAgIGR1bXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvQXJyYXlBbmRDbGVhcigpO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9nZW5lcmF0b3IgPSBudWxsO1xuICAgICAgICBfLl9yZWN5Y2xlciA9IG51bGw7XG4gICAgICAgIGRpc3Bvc2UoXy5fdHJpbW1lciwgXy5fZmx1c2hlciwgXy5fYXV0b0ZsdXNoZXIpO1xuICAgICAgICBfLl90cmltbWVyID0gbnVsbDtcbiAgICAgICAgXy5fZmx1c2hlciA9IG51bGw7XG4gICAgICAgIF8uX2F1dG9GbHVzaGVyID0gbnVsbDtcbiAgICAgICAgXy5fcG9vbC5sZW5ndGggPSAwO1xuICAgICAgICBfLl9wb29sID0gbnVsbDtcbiAgICB9XG4gICAgZXh0ZW5kQXV0b0NsZWFyKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgdCA9IF8uYXV0b0NsZWFyVGltZW91dDtcbiAgICAgICAgaWYgKGlzRmluaXRlKHQpICYmICFfLl9hdXRvRmx1c2hlci5pc1NjaGVkdWxlZClcbiAgICAgICAgICAgIF8uX2F1dG9GbHVzaGVyLnN0YXJ0KHQpO1xuICAgIH1cbiAgICBhZGQobykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKF8uX3Bvb2wubGVuZ3RoID49IF8uX2xvY2FsQWJzTWF4U2l6ZSkge1xuICAgICAgICAgICAgLy8gR2V0dGluZyB0b28gYmlnLCBkaXNwb3NlIGltbWVkaWF0ZWx5Li4uXG4gICAgICAgICAgICBkaXNwb3NlKG8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKF8uX3JlY3ljbGVyKVxuICAgICAgICAgICAgICAgIF8uX3JlY3ljbGVyKG8pO1xuICAgICAgICAgICAgXy5fcG9vbC5wdXNoKG8pO1xuICAgICAgICAgICAgY29uc3QgbSA9IF8uX21heFNpemU7XG4gICAgICAgICAgICBpZiAobSA8IEFCU09MVVRFX01BWF9TSVpFICYmIF8uX3Bvb2wubGVuZ3RoID4gbSlcbiAgICAgICAgICAgICAgICBfLl90cmltbWVyLnN0YXJ0KDUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5leHRlbmRBdXRvQ2xlYXIoKTtcbiAgICB9XG4gICAgX29uVGFrZW4oKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzLCBsZW4gPSBfLl9wb29sLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA8PSBfLl9tYXhTaXplKVxuICAgICAgICAgICAgXy5fdHJpbW1lci5jYW5jZWwoKTtcbiAgICAgICAgaWYgKGxlbilcbiAgICAgICAgICAgIF8uZXh0ZW5kQXV0b0NsZWFyKCk7XG4gICAgfVxuICAgIHRyeVRha2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIF8uX3Bvb2wucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl9vblRha2VuKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGFrZShmYWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIV8uX2dlbmVyYXRvciAmJiAhZmFjdG9yeSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbignZmFjdG9yeScsIFwiTXVzdCBwcm92aWRlIGEgZmFjdG9yeSBpZiBvbiB3YXMgbm90IHByb3ZpZGVkIGF0IGNvbnN0cnVjdGlvbiB0aW1lLlwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBfLl9wb29sLnBvcCgpIHx8IGZhY3RvcnkgJiYgZmFjdG9yeSgpIHx8IF8uX2dlbmVyYXRvcigpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fb25UYWtlbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0UG9vbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9iamVjdFBvb2wuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL09iamVjdFBvb2wuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL1N5c3RlbUV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ1Vuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uIGV4dGVuZHMgU3lzdGVtRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgXCJVbnN1cHBvcnRlZCBlbnVtZXJhYmxlLlwiKTtcbiAgICB9XG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB9IGZyb20gXCIuL1NpbXBsZUVudW1lcmFibGVCYXNlXCI7XG4vKipcbiAqIEEgc2ltcGxpZmllZCBzdHJpcHBlZCBkb3duIGVudW1lcmF0b3IgdGhhdCB1bnRpbCBkaXNwb3NlZCB3aWxsIGluZmluaXRlbHkgcmV0dXJuIHRoZSBwcm92aWRlZCBmYWN0b3J5LlxuICogVGhpcyBpcyBhbmFsb2dvdXMgdG8gYSAnZ2VuZXJhdG9yJyBhbmQgaGFzIGEgY29tcGF0aWJsZSBpbnRlcmZhY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZUVudW1lcmF0b3IgZXh0ZW5kcyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB7XG4gICAgLyoqXG4gICAgICogU2VlIEluZmluaXRlVmFsdWVGYWN0b3J5XG4gICAgICogQHBhcmFtIF9mYWN0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoX2ZhY3RvcnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZmFjdG9yeSA9IF9mYWN0b3J5O1xuICAgIH1cbiAgICBfY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mYWN0b3J5ICE9IG51bGw7XG4gICAgfVxuICAgIG1vdmVOZXh0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZiA9IF8uX2ZhY3Rvcnk7XG4gICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICBfLl9jdXJyZW50ID0gZihfLl9jdXJyZW50LCBfLmluY3JlbWVudEluZGV4KCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2ZhY3RvcnkgPSBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZmluaXRlRW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUluZmluaXRlRW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0luZmluaXRlRW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgSXRlcmF0b3JSZXN1bHQgfSBmcm9tIFwiLi9JdGVyYXRvclJlc3VsdFwiO1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5leHBvcnQgY2xhc3MgU2ltcGxlRW51bWVyYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9XG4gICAgZ2V0IGNhbk1vdmVOZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FuTW92ZU5leHQoKTtcbiAgICB9XG4gICAgdHJ5TW92ZU5leHQob3V0KSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIG91dCh0aGlzLl9jdXJyZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaW5jcmVtZW50SW5kZXgoKSB7XG4gICAgICAgIGxldCBpID0gdGhpcy5faW5kZXg7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gaSA9IGlzTmFOKGkpID8gMCA6IChpICsgMSk7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgICBuZXh0VmFsdWUoKSB7XG4gICAgICAgIHRoaXMubW92ZU5leHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gICAgfVxuICAgIG5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVOZXh0KClcbiAgICAgICAgICAgID8gbmV3IEl0ZXJhdG9yUmVzdWx0KHRoaXMuX2N1cnJlbnQsIHRoaXMuX2luZGV4KVxuICAgICAgICAgICAgOiBJdGVyYXRvclJlc3VsdC5Eb25lO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAncmV0dXJuJyh2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBWT0lEMCAmJiB0aGlzLl9jYW5Nb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgPyBuZXcgSXRlcmF0b3JSZXN1bHQodmFsdWUsIFZPSUQwLCB0cnVlKVxuICAgICAgICAgICAgICAgIDogSXRlcmF0b3JSZXN1bHQuRG9uZTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gVk9JRDA7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gTmFOO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGdldElzRW5kbGVzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nhbk1vdmVOZXh0KCk7XG4gICAgfVxuICAgIGdldCBpc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldElzRW5kbGVzcygpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNpbXBsZUVudW1lcmFibGVCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2ltcGxlRW51bWVyYWJsZUJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9TaW1wbGVFbnVtZXJhYmxlQmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgSXRlcmF0b3JSZXN1bHQgfSBmcm9tIFwiLi9JdGVyYXRvclJlc3VsdFwiO1xuaW1wb3J0IHsgRnVuY3Rpb25zIH0gZnJvbSBcIi4uLy4uL0Z1bmN0aW9uc1wiO1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG4vKipcbiAqIEEgc2ltcGxpZmllZCBzdHJpcHBlZCBkb3duIGVudW1lcmFibGUgdGhhdCBpcyBhbHdheXMgY29tcGxldGUgYW5kIGhhcyBubyByZXN1bHRzLlxuICogRnJvemVuIGFuZCBleHBvcnRlZCBhcyAnZW1wdHknIHRvIGFsbG93IGZvciByZXVzZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEVtcHR5RW51bWVyYXRvciA9IE9iamVjdC5mcmVlemUoe1xuICAgIGN1cnJlbnQ6IFZPSUQwLFxuICAgIG1vdmVOZXh0OiBGdW5jdGlvbnMuRmFsc2UsXG4gICAgdHJ5TW92ZU5leHQ6IEZ1bmN0aW9ucy5GYWxzZSxcbiAgICBuZXh0VmFsdWU6IEZ1bmN0aW9ucy5CbGFuayxcbiAgICBuZXh0OiBJdGVyYXRvclJlc3VsdC5HZXREb25lLFxuICAgIFwicmV0dXJuXCI6IEl0ZXJhdG9yUmVzdWx0LkdldERvbmUsXG4gICAgZW5kOiBGdW5jdGlvbnMuQmxhbmssXG4gICAgcmVzZXQ6IEZ1bmN0aW9ucy5CbGFuayxcbiAgICBkaXNwb3NlOiBGdW5jdGlvbnMuQmxhbmssXG4gICAgaXNFbmRsZXNzOiBmYWxzZVxufSk7XG5leHBvcnQgZGVmYXVsdCBFbXB0eUVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FbXB0eUVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbXB0eUVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFNpbXBsZUVudW1lcmFibGVCYXNlIH0gZnJvbSBcIi4vU2ltcGxlRW51bWVyYWJsZUJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLyoqXG4gKiBBIHNpbXBsaWZpZWQgc3RyaXBwZWQgZG93biBlbnVtZXJhdG9yIHRoYXQgdW50aWwgZGlzcG9zZWQgd2lsbCBpbmZpbml0ZWx5IHJldHVybiB0aGUgcHJvdmlkZWQgZmFjdG9yeS5cbiAqIFRoaXMgaXMgYW5hbG9nb3VzIHRvIGEgJ2dlbmVyYXRvcicgYW5kIGhhcyBhIGNvbXBhdGlibGUgaW50ZXJmYWNlLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBJdGVyYXRvckVudW1lcmF0b3IgZXh0ZW5kcyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIF9pdGVyYXRvclxuICAgICAqIEBwYXJhbSBfaXNFbmRsZXNzIHRydWUgYW5kIGZhbHNlIGFyZSBleHBsaWNpdCB3aGVyZSBhcyB1bmRlZmluZWQgbWVhbnMgJ3Vua25vd24nLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKF9pdGVyYXRvciwgX2lzRW5kbGVzcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pdGVyYXRvciA9IF9pdGVyYXRvcjtcbiAgICAgICAgdGhpcy5faXNFbmRsZXNzID0gX2lzRW5kbGVzcztcbiAgICB9XG4gICAgX2Nhbk1vdmVOZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlcmF0b3IgIT0gbnVsbDtcbiAgICB9XG4gICAgbW92ZU5leHQodmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGkgPSBfLl9pdGVyYXRvcjtcbiAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBhcmd1bWVudHMubGVuZ3RoID8gaS5uZXh0KHZhbHVlKSA6IGkubmV4dCgpO1xuICAgICAgICAgICAgXy5fY3VycmVudCA9IHIudmFsdWU7XG4gICAgICAgICAgICBpZiAoci5kb25lKVxuICAgICAgICAgICAgICAgIF8uZGlzcG9zZSgpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9pdGVyYXRvciA9IG51bGw7XG4gICAgfVxuICAgIGdldElzRW5kbGVzcygpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5faXNFbmRsZXNzKSAmJiBzdXBlci5nZXRJc0VuZGxlc3MoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJdGVyYXRvckVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JdGVyYXRvckVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JdGVyYXRvckVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTppbXBvcnQtbmFtZVxyXG5pbXBvcnQgRW51bWVyYWJsZSwgeyBMaW5xRW51bWVyYWJsZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9MaW5xJztcclxuY2xhc3MgU3RhcnR1cCB7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgKmdlbmVyYXRvcigpOkl0ZXJhYmxlSXRlcmF0b3I8bnVtYmVyPiB7XHJcbiAgICB5aWVsZCAxO1xyXG4gICAgeWllbGQgMjtcclxuICAgIHlpZWxkIDM7XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgbWFpbigpOiBudW1iZXIge1xyXG4gICAgY29uc3QgYXJyID0gU3RhcnR1cC5nZW5lcmF0b3IoKTtcclxuICAgIGNvbnN0IGVudTpMaW5xRW51bWVyYWJsZTxudW1iZXI+ID0gRW51bWVyYWJsZS5mcm9tQW55KGFycik7XHJcbiAgICBjb25zdCBpID0gZW51LmVsZW1lbnRBdE9yRGVmYXVsdCgxKTtcclxuICAgIGNvbnNvbGUubG9nKGkpO1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG59XHJcblxyXG5TdGFydHVwLm1haW4oKTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy9hcHAudHMiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIE9yaWdpbmFsOiBodHRwOi8vbGlucWpzLmNvZGVwbGV4LmNvbS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBhcmVFcXVhbCBhcyBhcmVFcXVhbFZhbHVlcywgY29tcGFyZSBhcyBjb21wYXJlVmFsdWVzIH0gZnJvbSBcIi4uL1N5c3RlbS9Db21wYXJlXCI7XG5pbXBvcnQgeyBjb3B5IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9jb3B5XCI7XG5pbXBvcnQgKiBhcyBBcnJheXMgZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9Db21wYXJlXCI7XG5pbXBvcnQgKiBhcyBlbnVtVXRpbCBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3JcIjtcbmltcG9ydCB7IGlzRW51bWVyYWJsZSwgaXNFbnVtZXJhdG9yLCBpc0l0ZXJhdG9yLCB0aHJvd0lmRW5kbGVzcyB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgRW1wdHlFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbXB0eUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vU3lzdGVtL1R5cGVzXCI7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uL1N5c3RlbS9JbnRlZ2VyXCI7XG5pbXBvcnQgeyBGdW5jdGlvbnMgYXMgQmFzZUZ1bmN0aW9ucyB9IGZyb20gXCIuLi9TeXN0ZW0vRnVuY3Rpb25zXCI7XG5pbXBvcnQgeyBBcnJheUVudW1lcmF0b3IgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0FycmF5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9EaWN0aW9uYXJpZXMvRGljdGlvbmFyeVwiO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL1F1ZXVlXCI7XG5pbXBvcnQgeyBkaXNwb3NlLCB1c2luZyB9IGZyb20gXCIuLi9TeXN0ZW0vRGlzcG9zYWJsZS9kaXNwb3NlXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi9TeXN0ZW0vRGlzcG9zYWJsZS9EaXNwb3NhYmxlQmFzZVwiO1xuaW1wb3J0IHsgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9VbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb25cIjtcbmltcG9ydCB7IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9EaXNwb3NhYmxlL09iamVjdERpc3Bvc2VkRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBLZXlTb3J0ZWRDb250ZXh0IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9Tb3J0aW5nL0tleVNvcnRlZENvbnRleHRcIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9TeXN0ZW0vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9TeXN0ZW0vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbmltcG9ydCB7IEluZGV4RW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSW5kZXhFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBJdGVyYXRvckVudW1lcmF0b3IgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0l0ZXJhdG9yRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZSB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvaW5pdGlhbGl6ZVwiO1xuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSBcIi4uL1N5c3RlbS9SYW5kb21cIjtcbmltcG9ydCB7IEluZmluaXRlRW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSW5maW5pdGVFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBMYXp5TGlzdCB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvTGF6eUxpc3RcIjtcbnZhciBkaXNwb3NlU2luZ2xlID0gZGlzcG9zZS5zaW5nbGU7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbi8vICNyZWdpb24gTG9jYWwgQ29uc3RhbnRzLlxuY29uc3QgSU5WQUxJRF9ERUZBVUxUID0ge307IC8vIGNyZWF0ZSBhIHByaXZhdGUgdW5pcXVlIGluc3RhbmNlIGZvciByZWZlcmVuY2luZy5cbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuY29uc3QgTlVMTCA9IG51bGw7XG5mdW5jdGlvbiBCUkVBSygpIHtcbiAgICByZXR1cm4gMCAvKiBCcmVhayAqLztcbn1cbmZ1bmN0aW9uIFJFVFVSTigpIHtcbiAgICByZXR1cm4gMSAvKiBSZXR1cm4gKi87XG59XG5mdW5jdGlvbiBpc05vdE51bGxPclVuZGVmaW5lZChlKSB7XG4gICAgcmV0dXJuIGUgIT0gbnVsbDtcbn1cbi8vIExlYXZlIGludGVybmFsIHRvIGF2b2lkIGFjY2lkZW50YWwgb3ZlcndyaXRpbmcuXG5jbGFzcyBMaW5xRnVuY3Rpb25zIGV4dGVuZHMgQmFzZUZ1bmN0aW9ucyB7XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICBHcmVhdGVyKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPiBiID8gYSA6IGI7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgTGVzc2VyKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPCBiID8gYSA6IGI7XG4gICAgfVxufVxuY29uc3QgRnVuY3Rpb25zID0gT2JqZWN0LmZyZWV6ZShuZXcgTGlucUZ1bmN0aW9ucygpKTtcbi8vIEZvciByZS11c2UgYXMgYSBmYWN0b3J5LlxuZnVuY3Rpb24gZ2V0RW1wdHlFbnVtZXJhdG9yKCkge1xuICAgIHJldHVybiBFbXB0eUVudW1lcmF0b3I7XG59XG4vLyAjZW5kcmVnaW9uXG4vKlxuICogTk9URTogQWJvdXQgSW5maW5pdGVFbnVtZXJhYmxlPFQ+IGFuZCBFbnVtZXJhYmxlPFQ+LlxuICogVGhlcmUgbWF5IHNlZW0gbGlrZSB0aGVyZSdzIGV4dHJhIG92ZXJyaWRlcyBoZXJlIGFuZCB0aGV5IG1heSBzZWVtIHVubmVjZXNzYXJ5LlxuICogQnV0IGFmdGVyIGNsb3NlciBpbnNwZWN0aW9uIHlvdSdsbCBzZWUgdGhlIHR5cGUgY2hhaW4gaXMgcmV0YWluZWQgYW5kXG4gKiBpbmZpbml0ZSBlbnVtZXJhYmxlcyBhcmUgcHJldmVudGVkIGZyb20gaGF2aW5nIGZlYXR1cmVzIHRoYXQgZmluaXRlIG9uZXMgaGF2ZS5cbiAqXG4gKiBJJ20gbm90IHN1cmUgaWYgaXQncyB0aGUgYmVzdCBvcHRpb24gdG8ganVzdCB1c2Ugb3ZlcnJpZGVzLCBidXQgaXQgaG9ub3JzIHRoZSB0eXBpbmcgcHJvcGVybHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9lbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyKSB7XG4gICAgICAgIHN1cGVyKGZpbmFsaXplcik7XG4gICAgICAgIHRoaXMuX2VudW1lcmF0b3JGYWN0b3J5ID0gX2VudW1lcmF0b3JGYWN0b3J5O1xuICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiSW5maW5pdGVMaW5xRW51bWVyYWJsZVwiO1xuICAgIH1cbiAgICBnZXQgaXNFbmRsZXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNFbmRsZXNzO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIElFbnVtZXJhYmxlPFQ+IEltcGxlbWVudGF0aW9uLi4uXG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudW1lcmF0b3JGYWN0b3J5KCk7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICAvLyAjcmVnaW9uIElEaXNwb3NhYmxlIG92ZXJyaWRlLi4uXG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpOyAvLyBKdXN0IGluIGNhc2UuXG4gICAgICAgIHRoaXMuX2VudW1lcmF0b3JGYWN0b3J5ID0gbnVsbDtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIC8vIFJldHVybiBhIGRlZmF1bHQgKHVuZmlsdGVyZWQpIGVudW1lcmFibGUuXG4gICAgYXNFbnVtZXJhYmxlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IF8uZ2V0RW51bWVyYXRvcigpKTtcbiAgICB9XG4gICAgZG9BY3Rpb24oYWN0aW9uLCBpbml0aWFsaXplciwgaXNFbmRsZXNzID0gdGhpcy5pc0VuZGxlc3MsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRSA9IGlzRW5kbGVzcyB8fCB1bmRlZmluZWQ7IC8vIEluIGNhc2UgaXQncyBudWxsLlxuICAgICAgICBpZiAoIWFjdGlvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJhY3Rpb25cIik7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFhY3Rpb24pO1xuICAgICAgICAgICAgICAgIGlmIChpbml0aWFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZXIoKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIC8vIE1heSBuZWVkIGEgd2F5IHRvIHByb3BhZ2F0ZSBpc0VuZGxlc3NcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb25SZXN1bHQgPSBhY3Rpb24oYywgaW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25SZXN1bHQgPT09IGZhbHNlIHx8IGFjdGlvblJlc3VsdCA9PT0gMCAvKiBCcmVhayAqLylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvblJlc3VsdCAhPT0gMiAvKiBTa2lwICovKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oYyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGFjdGlvblJlc3VsdD09PTIsIHRoZW4gYSBzaWduYWwgZm9yIHNraXAgaXMgcmVjZWl2ZWQuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvbkNvbXBsZXRlKVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKGluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSwgaXNFKTtcbiAgICAgICAgfSwgXG4gICAgICAgIC8vIFVzaW5nIGEgZmluYWxpemVyIHZhbHVlIHJlZHVjZXMgdGhlIGNoYW5jZSBvZiBhIGNpcmN1bGFyIHJlZmVyZW5jZVxuICAgICAgICAvLyBzaW5jZSB3ZSBjb3VsZCBzaW1wbHkgcmVmZXJlbmNlIHRoZSBlbnVtZXJhdGlvbiBhbmQgY2hlY2sgZS53YXNEaXNwb3NlZC5cbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgYWN0aW9uID0gTlVMTDtcbiAgICAgICAgfSwgaXNFKTtcbiAgICB9XG4gICAgZm9yY2UoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRoaXMuZG9BY3Rpb24oQlJFQUspXG4gICAgICAgICAgICAuZ2V0RW51bWVyYXRvcigpXG4gICAgICAgICAgICAubW92ZU5leHQoKTtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBJbmRleGluZy9QYWdpbmcgbWV0aG9kcy5cbiAgICBza2lwKGNvdW50KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZShnZXRFbXB0eUVudW1lcmF0b3IpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMud2hlcmUoKGVsZW1lbnQsIGluZGV4KSA9PiBpbmRleCA+PSBjb3VudCk7XG4gICAgfVxuICAgIHRha2UoY291bnQpIHtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2NvdW50JywgY291bnQsICdNdXN0IGJlIGZpbml0ZS4nKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIik7XG4gICAgICAgIC8vIE9uY2UgYWN0aW9uIHJldHVybnMgZmFsc2UsIHRoZSBlbnVtZXJhdGlvbiB3aWxsIHN0b3AuXG4gICAgICAgIHJldHVybiBfLmRvQWN0aW9uKChlbGVtZW50LCBpbmRleCkgPT4gaW5kZXggPCBjb3VudCwgbnVsbCwgZmFsc2UpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIFNpbmdsZSBWYWx1ZSBSZXR1cm4uLi5cbiAgICBlbGVtZW50QXQoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuZWxlbWVudEF0T3JEZWZhdWx0KGluZGV4LCBJTlZBTElEX0RFRkFVTFQpO1xuICAgICAgICBpZiAodiA9PT0gSU5WQUxJRF9ERUZBVUxUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignaW5kZXgnLCBpbmRleCwgXCJpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiBzb3VyY2VcIik7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICBlbGVtZW50QXRPckRlZmF1bHQoaW5kZXgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4LCAnaW5kZXgnKTtcbiAgICAgICAgY29uc3QgbiA9IGluZGV4O1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpID09IG4pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qIE5vdGU6IFVubGlrZSBwcmV2aW91cyBpbXBsZW1lbnRhdGlvbnMsIHlvdSBjb3VsZCBwYXNzIGEgcHJlZGljYXRlIGludG8gdGhlc2UgbWV0aG9kcy5cbiAgICAgKiBCdXQgc2luY2UgdW5kZXIgdGhlIGhvb2QgaXQgZW5kcyB1cCBjYWxsaW5nIC53aGVyZShwcmVkaWNhdGUpIGFueXdheSxcbiAgICAgKiBpdCBtYXkgYmUgYmV0dGVyIHRvIHJlbW92ZSB0aGlzIHRvIGFsbG93IGZvciBhIGNsZWFuZXIgc2lnbmF0dXJlL292ZXJyaWRlLlxuICAgICAqIEphdmFTY3JpcHQvVHlwZVNjcmlwdCBkb2VzIG5vdCBlYXNpbHkgYWxsb3cgZm9yIGEgc3RyaWN0IG1ldGhvZCBpbnRlcmZhY2UgbGlrZSBDIy5cbiAgICAgKiBIYXZpbmcgdG8gd3JpdGUgZXh0cmEgb3ZlcnJpZGUgbG9naWMgaXMgZXJyb3IgcHJvbmUgYW5kIGNvbmZ1c2luZyB0byB0aGUgY29uc3VtZXIuXG4gICAgICogUmVtb3ZpbmcgdGhlIHByZWRpY2F0ZSBoZXJlIG1heSBhbHNvIGNhdXNlIHRoZSBjb25zdW1lciBvZiB0aGlzIG1ldGhvZCB0byB0aGluayBtb3JlIGFib3V0IGhvdyB0aGV5IHN0cnVjdHVyZSB0aGVpciBxdWVyeS5cbiAgICAgKiBUaGUgZW5kIGFsbCBkaWZmZXJlbmNlIGlzIHRoYXQgdGhlIHVzZXIgbXVzdCBkZWNsYXJlIC53aGVyZShwcmVkaWNhdGUpIGJlZm9yZSAuZmlyc3QoKSwgLnNpbmdsZSgpLCBvciAubGFzdCgpLlxuICAgICAqIE90aGVyd2lzZSB0aGVyZSB3b3VsZCBuZWVkIHRvIGJlIG11Y2ggbW9yZSBjb2RlIHRvIGhhbmRsZSB0aGVzZSBjYXNlcyAoLmZpcnN0KHByZWRpY2F0ZSksIGV0Yyk7XG4gICAgICogKi9cbiAgICBmaXJzdCgpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuZmlyc3RPckRlZmF1bHQoSU5WQUxJRF9ERUZBVUxUKTtcbiAgICAgICAgaWYgKHYgPT09IElOVkFMSURfREVGQVVMVClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImZpcnN0OlRoZSBzZXF1ZW5jZSBpcyBlbXB0eS5cIik7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICBmaXJzdE9yRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiBlLm1vdmVOZXh0KCkgPyBlLmN1cnJlbnQgOiBkZWZhdWx0VmFsdWUpO1xuICAgIH1cbiAgICBzaW5nbGUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoIWUubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNpbmdsZTpzZXF1ZW5jZSBjb250YWlucyBtb3JlIHRoYW4gb25lIGVsZW1lbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2luZ2xlOlRoZSBzZXF1ZW5jZSBpcyBlbXB0eS5cIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaW5nbGVPckRlZmF1bHQoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoIWUubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFueSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiBlLm1vdmVOZXh0KCkpO1xuICAgIH1cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuYW55KCk7XG4gICAgfVxuICAgIHRyYXZlcnNlRGVwdGhGaXJzdChjaGlsZHJlblNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzczsgLy8gSXMgZW5kbGVzcyBpcyBub3QgYWZmaXJtYXRpdmUgaWYgZmFsc2UuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gRGV2IE5vdGU6IE1heSB3YW50IHRvIGNvbnNpZGVyIHVzaW5nIGFuIGFjdHVhbCBzdGFjayBhbmQgbm90IGFuIGFycmF5LlxuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3JTdGFjaztcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGxlbjsgLy8gQXZvaWQgdXNpbmcgcHVzaC9wb3Agc2luY2UgdGhleSBxdWVyeSAubGVuZ3RoIGV2ZXJ5IHRpbWUgYW5kIGNhbiBiZSBzbG93ZXIuXG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yU3RhY2sgPSBbXTtcbiAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHJlc3VsdFNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFja1tsZW4rK10gPSBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSBjaGlsZHJlblNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZSA9ICFUeXBlLmlzU3RyaW5nKGMpICYmIEVudW1lcmFibGUuZnJvbUFueShjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBlID8gZS5nZXRFbnVtZXJhdG9yKCkgOiBFbXB0eUVudW1lcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IGVudW1lcmF0b3JTdGFja1stLWxlbl07XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFjay5sZW5ndGggPSBsZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvclN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwb3NlLnRoZXNlLm5vQ29weShlbnVtZXJhdG9yU3RhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvclN0YWNrLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yU3RhY2sgPSBOVUxMO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBmbGF0dGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RNYW55KGVudHJ5ID0+IHtcbiAgICAgICAgICAgIGxldCBlID0gIVR5cGUuaXNTdHJpbmcoZW50cnkpICYmIEVudW1lcmFibGUuZnJvbUFueShlbnRyeSk7XG4gICAgICAgICAgICByZXR1cm4gZSA/IGUuZmxhdHRlbigpIDogW2VudHJ5XTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBhaXJ3aXNlKHNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlbGVjdG9yXCIpO1xuICAgICAgICBsZXQgcHJldmlvdXM7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGkgPyBzZWxlY3RvcihwcmV2aW91cywgdmFsdWUsIGkpIDogTlVMTDtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KS5za2lwKDEpO1xuICAgIH1cbiAgICBzY2FuKGZ1bmMsIHNlZWQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghZnVuYylcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJmdW5jXCIpO1xuICAgICAgICByZXR1cm4gKHNlZWQgPT09IFZPSUQwXG4gICAgICAgICAgICA/IHRoaXMuc2VsZWN0KCh2YWx1ZSwgaSkgPT4gc2VlZCA9IGkgPyBmdW5jKHNlZWQsIHZhbHVlLCBpKSA6IHZhbHVlKVxuICAgICAgICAgICAgOiB0aGlzLnNlbGVjdCgodmFsdWUsIGkpID0+IHNlZWQgPSBmdW5jKHNlZWQsIHZhbHVlLCBpKSkpO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgc2VsZWN0KHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChzZWxlY3Rvcik7XG4gICAgfVxuICAgIG1hcChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoc2VsZWN0b3IpO1xuICAgIH1cbiAgICAvKlxuICAgIHB1YmxpYyBzdGF0aWMgSUVudW1lcmFibGU8VFJlc3VsdD4gU2VsZWN0TWFueTxUU291cmNlLCBUQ29sbGVjdGlvbiwgVFJlc3VsdD4oXG4gICAgICAgIHRoaXMgSUVudW1lcmFibGU8VFNvdXJjZT4gc291cmNlLFxuICAgICAgICBGdW5jPFRTb3VyY2Us4oCCSUVudW1lcmFibGU8VENvbGxlY3Rpb24+PiBjb2xsZWN0aW9uU2VsZWN0b3IsXG4gICAgICAgIEZ1bmM8VFNvdXJjZSzigIJUQ29sbGVjdGlvbizigIJUUmVzdWx0PiByZXN1bHRTZWxlY3RvcilcbiAgICAgKi9cbiAgICBfc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWNvbGxlY3Rpb25TZWxlY3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJjb2xsZWN0aW9uU2VsZWN0b3JcIik7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzczsgLy8gRG8gc2Vjb25kIGVudW1lcmF0aW9uLCBpdCB3aWxsIGJlIGluZGV0ZXJtaW5hdGUgaWYgZmFsc2UuXG4gICAgICAgIGlmICghcmVzdWx0U2VsZWN0b3IpXG4gICAgICAgICAgICByZXN1bHRTZWxlY3RvciA9IChhLCBiKSA9PiBiO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IG1pZGRsZUVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFjb2xsZWN0aW9uU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gVk9JRDA7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWNvbGxlY3Rpb25TZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgLy8gSnVzdCBzdGFydGVkLCBhbmQgbm90aGluZyB0byBlbnVtZXJhdGU/IEVuZC5cbiAgICAgICAgICAgICAgICBpZiAobWlkZGxlRW51bWVyYXRvciA9PT0gVk9JRDAgJiYgIWVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIG1vdmVOZXh0IGhhcyBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlLi4uXG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIG1pZGRsZSBpZiB0aGVyZSBpc24ndCBvbmUuXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWlkZGxlRW51bWVyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pZGRsZVNlcSA9IGNvbGxlY3Rpb25TZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIGluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29sbGVjdGlvbiBpcyBudWxsPyAgU2tpcCBpdC4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtaWRkbGVTZXEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShtaWRkbGVTZXEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtaWRkbGVFbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIG1pZGRsZUVudW1lcmF0b3IuY3VycmVudCkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIG5vIG1vcmUgaW4gdGhpcyBtaWRkbGU/ICBUaGVuIGNsZWFyIGFuZCByZXNldCBmb3IgbmV4dC4uLlxuICAgICAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgbWlkZGxlRW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGRpc3Bvc2VTaW5nbGUobWlkZGxlRW51bWVyYXRvcik7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgbWlkZGxlRW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uU2VsZWN0b3IgPSBOVUxMO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBzZWxlY3RNYW55KGNvbGxlY3Rpb25TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcik7XG4gICAgfVxuICAgIF9maWx0ZXJTZWxlY3RlZChzZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSwgZmlsdGVyKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFzZWxlY3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzZWxlY3RvclwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSBpbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gc2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWx0ZXIgfHwgZmlsdGVyKHJlc3VsdCwgaSsrKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9LCBfLl9pc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB9LCBfLl9pc0VuZGxlc3MpO1xuICAgIH1cbiAgICBjaG9vc2Uoc2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yLCBpc05vdE51bGxPclVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHdoZXJlKHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoRnVuY3Rpb25zLklkZW50aXR5LCBwcmVkaWNhdGUpO1xuICAgIH1cbiAgICBmaWx0ZXIocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChGdW5jdGlvbnMuSWRlbnRpdHksIHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIG5vbk51bGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndoZXJlKHYgPT4gdiAhPSBudWxsICYmIHYgIT0gVk9JRDApO1xuICAgIH1cbiAgICBvZlR5cGUodHlwZSkge1xuICAgICAgICBsZXQgdHlwZU5hbWU7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBOdW1iZXI6XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLk5VTUJFUjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3RyaW5nOlxuICAgICAgICAgICAgICAgIHR5cGVOYW1lID0gVHlwZS5TVFJJTkc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLkJPT0xFQU47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZ1bmN0aW9uOlxuICAgICAgICAgICAgICAgIHR5cGVOYW1lID0gVHlwZS5GVU5DVElPTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgLndoZXJlKHggPT4geCBpbnN0YW5jZW9mIHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICAud2hlcmUoeCA9PiBpc05vdE51bGxPclVuZGVmaW5lZCh4KSAmJiB0eXBlb2YgeCA9PT0gdHlwZU5hbWUpO1xuICAgIH1cbiAgICBleGNlcHQoc2Vjb25kLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQga2V5cztcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGtleXMgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmQpXG4gICAgICAgICAgICAgICAgICAgIGVudW1VdGlsLmZvckVhY2goc2Vjb25kLCBrZXkgPT4geyBrZXlzLmFkZEJ5S2V5VmFsdWUoa2V5LCB0cnVlKTsgfSk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzLmFkZEJ5S2V5VmFsdWUoY3VycmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGtleXMuY2xlYXIoKTtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgZGlzdGluY3QoY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2VwdChOVUxMLCBjb21wYXJlU2VsZWN0b3IpO1xuICAgIH1cbiAgICAvLyBbMCwwLDAsMSwxLDEsMiwyLDIsMCwwLDAsMSwxXSByZXN1bHRzIGluIFswLDEsMiwwLDFdO1xuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBjb21wYXJlS2V5O1xuICAgICAgICAgICAgbGV0IGluaXRpYWwgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gY29tcGFyZVNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJlRXF1YWxWYWx1ZXMoY29tcGFyZUtleSwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29tcGFyZUtleSA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHNpbmdsZSBkZWZhdWx0IHZhbHVlIGlmIGVtcHR5LlxuICAgICAqIEBwYXJhbSBkZWZhdWx0VmFsdWVcbiAgICAgKiBAcmV0dXJucyB7RW51bWVyYWJsZX1cbiAgICAgKi9cbiAgICBkZWZhdWx0SWZFbXB0eShkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaXNGaXJzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihkZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgbnVsbCwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgemlwKHNlY29uZCwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShzZWNvbmQpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IGZpcnN0RW51bWVyYXRvci5tb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgJiYgc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihmaXJzdEVudW1lcmF0b3IuY3VycmVudCwgc2Vjb25kRW51bWVyYXRvci5jdXJyZW50LCBpbmRleCsrKSksICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB6aXBNdWx0aXBsZShzZWNvbmQsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlY29uZC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWNvbmRUZW1wO1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlY29uZFRlbXAgPSBuZXcgUXVldWUoc2Vjb25kKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFzZWNvbmRFbnVtZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZFRlbXAuY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHQgPSBzZWNvbmRUZW1wLmRlcXVldWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGZpcnN0RW51bWVyYXRvci5jdXJyZW50LCBzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQsIGluZGV4KyspKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRUZW1wKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRUZW1wLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIHNlY29uZFRlbXAgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIEpvaW4gTWV0aG9kc1xuICAgIGpvaW4oaW5uZXIsIG91dGVyS2V5U2VsZWN0b3IsIGlubmVyS2V5U2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG91dGVyRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBsb29rdXA7XG4gICAgICAgICAgICBsZXQgaW5uZXJFbGVtZW50cztcbiAgICAgICAgICAgIGxldCBpbm5lckNvdW50ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG91dGVyRW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGxvb2t1cCA9IEVudW1lcmFibGUuZnJvbShpbm5lcilcbiAgICAgICAgICAgICAgICAgICAgLnRvTG9va3VwKGlubmVyS2V5U2VsZWN0b3IsIEZ1bmN0aW9ucy5JZGVudGl0eSwgY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbm5lckVsZW1lbnQgPSBpbm5lckVsZW1lbnRzW2lubmVyQ291bnQrK107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXJFbGVtZW50ICE9PSBWT0lEMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihvdXRlckVudW1lcmF0b3IuY3VycmVudCwgaW5uZXJFbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lckVsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdXRlckVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IG91dGVyS2V5U2VsZWN0b3Iob3V0ZXJFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJFbGVtZW50cyA9IGxvb2t1cC5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3V0ZXJFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBvdXRlckVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlubmVyRWxlbWVudHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIG91dGVyRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgbG9va3VwID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ3JvdXBKb2luKGlubmVyLCBvdXRlcktleVNlbGVjdG9yLCBpbm5lcktleVNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGxvb2t1cDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBsb29rdXAgPSBFbnVtZXJhYmxlLmZyb20oaW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIC50b0xvb2t1cChpbm5lcktleVNlbGVjdG9yLCBGdW5jdGlvbnMuSWRlbnRpdHksIGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4gZW51bWVyYXRvci5tb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIGxvb2t1cC5nZXQob3V0ZXJLZXlTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQpKSkpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGxvb2t1cCA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1lcmdlKGVudW1lcmFibGVzKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIGlmICghZW51bWVyYWJsZXMgfHwgZW51bWVyYWJsZXMubGVuZ3RoID09IDApXG4gICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBxdWV1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIDEpIEZpcnN0IGdldCBvdXIgdmFsdWVzLi4uXG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gbmV3IFF1ZXVlKGVudW1lcmFibGVzKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFlbnVtZXJhdG9yICYmIHF1ZXVlLnRyeURlcXVldWUodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IGVudW1VdGlsLmZyb20odmFsdWUpOyAvLyA0KSBLZWVwIGdvaW5nIGFuZCBvbiB0byBzdGVwIDIuICBFbHNlIGZhbGwgdGhyb3VnaCB0byB5aWVsZEJyZWFrKCkuXG4gICAgICAgICAgICAgICAgICAgIH0pKSB7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IgJiYgZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUpXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBjb25jYXQoLi4uZW51bWVyYWJsZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVyZ2UoZW51bWVyYWJsZXMpO1xuICAgIH1cbiAgICB1bmlvbihzZWNvbmQsIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBmaXJzdEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgc2Vjb25kRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBrZXlzO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAga2V5cyA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7IC8vIEFjdGluZyBhcyBhIEhhc2hTZXQuXG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yID09PSBWT0lEMCkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZmlyc3RFbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBmaXJzdEVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgha2V5cy5jb250YWluc0tleShjdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMuYWRkQnlLZXlWYWx1ZShjdXJyZW50LCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShzZWNvbmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgha2V5cy5jb250YWluc0tleShjdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5hZGRCeUtleVZhbHVlKGN1cnJlbnQsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBpbnNlcnRBdChpbmRleCwgb3RoZXIpIHtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4LCAnaW5kZXgnKTtcbiAgICAgICAgY29uc3QgbiA9IGluZGV4O1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBmaXJzdEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgc2Vjb25kRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICBsZXQgaXNFbnVtZXJhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IGVudW1VdGlsLmZyb20ob3RoZXIpO1xuICAgICAgICAgICAgICAgIGlzRW51bWVyYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gbikge1xuICAgICAgICAgICAgICAgICAgICBpc0VudW1lcmF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oc2Vjb25kRW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGZpcnN0RW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICFpc0VudW1lcmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgJiYgc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgICAgICYmIHlpZWxkZXIueWllbGRSZXR1cm4oc2Vjb25kRW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgbnVsbCwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgYWx0ZXJuYXRlTXVsdGlwbGUoc2VxdWVuY2UpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYnVmZmVyLCBtb2RlLCBlbnVtZXJhdG9yLCBhbHRlcm5hdGVFbnVtZXJhdG9yO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gSW5zdGVhZCBvZiByZWNhbGxpbmcgZ2V0RW51bWVyYXRvciBldmVyeSB0aW1lLCBqdXN0IHJlc2V0IHRoZSBleGlzdGluZyBvbmUuXG4gICAgICAgICAgICAgICAgYWx0ZXJuYXRlRW51bWVyYXRvciA9IG5ldyBBcnJheUVudW1lcmF0b3IoRW51bWVyYWJsZS50b0FycmF5KHNlcXVlbmNlKSk7IC8vIEZyZWV6ZVxuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBsZXQgaGFzQXRMZWFzdE9uZSA9IGVudW1lcmF0b3IubW92ZU5leHQoKTtcbiAgICAgICAgICAgICAgICBtb2RlID0gaGFzQXRMZWFzdE9uZVxuICAgICAgICAgICAgICAgICAgICA/IDEgLyogUmV0dXJuICovXG4gICAgICAgICAgICAgICAgICAgIDogMCAvKiBCcmVhayAqLztcbiAgICAgICAgICAgICAgICBpZiAoaGFzQXRMZWFzdE9uZSlcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwIC8qIEJyZWFrICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDIgLyogU2tpcCAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbHRlcm5hdGVFbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oYWx0ZXJuYXRlRW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0ZUVudW1lcmF0b3IucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUgPSAxIC8qIFJldHVybiAqLztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbGF0ZXN0ID0gYnVmZmVyO1xuICAgICAgICAgICAgICAgIC8vIFNldCB1cCB0aGUgbmV4dCByb3VuZC4uLlxuICAgICAgICAgICAgICAgIC8vIElzIHRoZXJlIGFub3RoZXIgb25lPyAgU2V0IHRoZSBidWZmZXIgYW5kIHNldHVwIGluc3RydWN0IGZvciB0aGUgbmV4dCBvbmUgdG8gYmUgdGhlIGFsdGVybmF0ZS5cbiAgICAgICAgICAgICAgICBsZXQgYW5vdGhlciA9IGVudW1lcmF0b3IubW92ZU5leHQoKTtcbiAgICAgICAgICAgICAgICBtb2RlID0gYW5vdGhlclxuICAgICAgICAgICAgICAgICAgICA/IDIgLyogU2tpcCAqL1xuICAgICAgICAgICAgICAgICAgICA6IDAgLyogQnJlYWsgKi87XG4gICAgICAgICAgICAgICAgaWYgKGFub3RoZXIpXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihsYXRlc3QpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWx0ZXJuYXRlRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRlRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgYWx0ZXJuYXRlRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBhbHRlcm5hdGVTaW5nbGUodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWx0ZXJuYXRlTXVsdGlwbGUoRW51bWVyYWJsZS5tYWtlKHZhbHVlKSk7XG4gICAgfVxuICAgIGFsdGVybmF0ZSguLi5zZXF1ZW5jZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbHRlcm5hdGVNdWx0aXBsZShzZXF1ZW5jZSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gRXJyb3IgSGFuZGxpbmdcbiAgICBjYXRjaEVycm9yKGhhbmRsZXIpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGluaXQuLi5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmFsbHlBY3Rpb24oYWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpXG4gICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICBidWZmZXIoc2l6ZSkge1xuICAgICAgICBpZiAoc2l6ZSA8IDEgfHwgIWlzRmluaXRlKHNpemUpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBidWZmZXIgc2l6ZS5cIik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KHNpemUsIFwic2l6ZVwiKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgbGV0IGxlbjtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gaW5pdGlhbGl6ZShzaXplKTtcbiAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgICAgIHdoaWxlIChsZW4gPCBzaXplICYmIGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBhcnJheVtsZW4rK10gPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFycmF5Lmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFsZW4gJiYgeWllbGRlci55aWVsZFJldHVybihhcnJheSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgbnVsbCwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgc2hhcmUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgc2hhcmVkRW51bWVyYXRvcjtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2hhcmVkRW51bWVyYXRvciB8fCAoc2hhcmVkRW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNoYXJlZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgc2hhcmVkRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBzaGFyZWRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgfSwgXy5faXNFbmRsZXNzKTtcbiAgICB9XG4gICAgbWVtb2l6ZSgpIHtcbiAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBMYXp5TGlzdCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIChuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiBzb3VyY2UuZ2V0RW51bWVyYXRvcigpLCAoKSA9PiB7XG4gICAgICAgICAgICBzb3VyY2UuZGlzcG9zZSgpO1xuICAgICAgICAgICAgc291cmNlID0gbnVsbDtcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbi8qKlxuICogRW51bWVyYWJsZTxUPiBpcyBhIHdyYXBwZXIgY2xhc3MgdGhhdCBhbGxvd3MgbW9yZSBwcmltaXRpdmUgZW51bWVyYWJsZXMgdG8gZXhoaWJpdCBMSU5RIGJlaGF2aW9yLlxuICpcbiAqIEluIEMjIEVudW1lcmFibGU8VD4gaXMgbm90IGFuIGluc3RhbmNlIGJ1dCBoYXMgZXh0ZW5zaW9ucyBmb3IgSUVudW1lcmFibGU8VD4uXG4gKiBJbiB0aGlzIGNhc2UsIHdlIHVzZSBFbnVtZXJhYmxlPFQ+IGFzIHRoZSB1bmRlcmx5aW5nIGNsYXNzIHRoYXQgaXMgYmVpbmcgY2hhaW5lZC5cbiAqL1xuZXhwb3J0IGNsYXNzIExpbnFFbnVtZXJhYmxlIGV4dGVuZHMgSW5maW5pdGVMaW5xRW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3IoZW51bWVyYXRvckZhY3RvcnksIGZpbmFsaXplciwgaXNFbmRsZXNzKSB7XG4gICAgICAgIHN1cGVyKGVudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIpO1xuICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBpc0VuZGxlc3M7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJMaW5xRW51bWVyYWJsZVwiO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gYSBkZWZhdWx0ICh1bmZpbHRlcmVkKSBlbnVtZXJhYmxlLlxuICAgIGFzRW51bWVyYWJsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gXy5nZXRFbnVtZXJhdG9yKCkpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIEluZGV4aW5nL1BhZ2luZyBtZXRob2RzLlxuICAgIHNraXBXaGlsZShwcmVkaWNhdGUpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiBwcmVkaWNhdGUoZWxlbWVudCwgaW5kZXgpXG4gICAgICAgICAgICA/IDIgLyogU2tpcCAqL1xuICAgICAgICAgICAgOiAxIC8qIFJldHVybiAqLyk7XG4gICAgfVxuICAgIHRha2VXaGlsZShwcmVkaWNhdGUpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdwcmVkaWNhdGUnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiBwcmVkaWNhdGUoZWxlbWVudCwgaW5kZXgpXG4gICAgICAgICAgICA/IDEgLyogUmV0dXJuICovXG4gICAgICAgICAgICA6IDAgLyogQnJlYWsgKi8sIG51bGwsIG51bGwgLy8gV2UgZG9uJ3Qga25vdyB0aGUgc3RhdGUgaWYgaXQgaXMgZW5kbGVzcyBvciBub3QuXG4gICAgICAgICk7XG4gICAgfVxuICAgIC8vIElzIGxpa2UgdGhlIGludmVyc2Ugb2YgdGFrZSBXaGlsZSB3aXRoIHRoZSBhYmlsaXR5IHRvIHJldHVybiB0aGUgdmFsdWUgaWRlbnRpZmllZCBieSB0aGUgcHJlZGljYXRlLlxuICAgIHRha2VVbnRpbChwcmVkaWNhdGUsIGluY2x1ZGVVbnRpbFZhbHVlKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigncHJlZGljYXRlJyk7XG4gICAgICAgIGlmICghaW5jbHVkZVVudGlsVmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbigoZWxlbWVudCwgaW5kZXgpID0+IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleClcbiAgICAgICAgICAgICAgICA/IDAgLyogQnJlYWsgKi9cbiAgICAgICAgICAgICAgICA6IDEgLyogUmV0dXJuICovLCBudWxsLCBudWxsIC8vIFdlIGRvbid0IGtub3cgdGhlIHN0YXRlIGlmIGl0IGlzIGVuZGxlc3Mgb3Igbm90LlxuICAgICAgICAgICAgKTtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZvdW5kKVxuICAgICAgICAgICAgICAgIHJldHVybiAwIC8qIEJyZWFrICovO1xuICAgICAgICAgICAgZm91bmQgPSBwcmVkaWNhdGUoZWxlbWVudCwgaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIDEgLyogUmV0dXJuICovO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgICAgICB9LCBudWxsIC8vIFdlIGRvbid0IGtub3cgdGhlIHN0YXRlIGlmIGl0IGlzIGVuZGxlc3Mgb3Igbm90LlxuICAgICAgICApO1xuICAgIH1cbiAgICB0cmF2ZXJzZUJyZWFkdGhGaXJzdChjaGlsZHJlblNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzczsgLy8gSXMgZW5kbGVzcyBpcyBub3QgYWZmaXJtYXRpdmUgaWYgZmFsc2UuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbmVzdExldmVsID0gMDtcbiAgICAgICAgICAgIGxldCBidWZmZXIsIGxlbjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIG5lc3RMZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgbGVuID0gMDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXJbbGVuKytdID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0U2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBuZXN0TGV2ZWwpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWxlbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHQgPSBFbnVtZXJhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAuZnJvbShidWZmZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0TWFueShjaGlsZHJlblNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0LmFueSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXN0TGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IG5leHQuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWFjdGlvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJhY3Rpb25cIik7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKF8uaXNFbmRsZXNzKTtcbiAgICAgICAgLypcbiAgICAgICAgLy8gSXQgY291bGQgYmUganVzdCBhcyBlYXN5IHRvIGRvIHRoZSBmb2xsb3dpbmc6XG4gICAgICAgIHJldHVybiBlbnVtVXRpbC5mb3JFYWNoKF8sIGFjdGlvbiwgbWF4KTtcbiAgICAgICAgLy8gQnV0IHRvIGJlIG1vcmUgYWN0aXZlIGFib3V0IGNoZWNraW5nIGZvciBkaXNwb3NhbCwgd2UgdXNlIHRoaXMgaW5zdGVhZDpcbiAgICAgICAgKi9cbiAgICAgICAgLy8gUmV0dXJuIHZhbHVlIG9mIGFjdGlvbiBjYW4gYmUgYW55dGhpbmcsIGJ1dCBpZiBpdCBpcyAoPT09KSBmYWxzZSB0aGVuIHRoZSBlbnVtVXRpbC5mb3JFYWNoIHdpbGwgZGlzY29udGludWUuXG4gICAgICAgIHJldHVybiBtYXggPiAwID8gdXNpbmcoXy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgdGhyb3dJZkVuZGxlc3MoIWlzRmluaXRlKG1heCkgJiYgZS5pc0VuZGxlc3MpO1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgLy8gSXQgaXMgcG9zc2libGUgdGhhdCBzdWJzZXF1ZW50bHkgJ2FjdGlvbicgY291bGQgY2F1c2UgdGhlIGVudW1lcmF0aW9uIHRvIGRpc3Bvc2UsIHNvIHdlIGhhdmUgdG8gY2hlY2sgZWFjaCB0aW1lLlxuICAgICAgICAgICAgd2hpbGUgKG1heCA+IGkgJiYgXy50aHJvd0lmRGlzcG9zZWQoKSAmJiBlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKGUuY3VycmVudCwgaSsrKSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0pIDogMDtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBDb252ZXJzaW9uIE1ldGhvZHNcbiAgICB0b0FycmF5KHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gcHJlZGljYXRlXG4gICAgICAgICAgICA/IHRoaXMud2hlcmUocHJlZGljYXRlKS50b0FycmF5KClcbiAgICAgICAgICAgIDogdGhpcy5jb3B5VG8oW10pO1xuICAgIH1cbiAgICBjb3B5VG8odGFyZ2V0LCBpbmRleCA9IDAsIGNvdW50ID0gSW5maW5pdHkpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCF0YXJnZXQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwidGFyZ2V0XCIpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgpO1xuICAgICAgICAvLyBJZiBub3QgZXhwb3NpbmcgYW4gYWN0aW9uIHRoYXQgY291bGQgY2F1c2UgZGlzcG9zZSwgdGhlbiB1c2UgZW51bVV0aWwuZm9yRWFjaCB1dGlsaXR5IGluc3RlYWQuXG4gICAgICAgIGVudW1VdGlsLmZvckVhY2godGhpcywgKHgsIGkpID0+IHtcbiAgICAgICAgICAgIHRhcmdldFtpICsgaW5kZXhdID0geDtcbiAgICAgICAgfSwgY291bnQpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICB0b0xvb2t1cChrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5LCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZGljdCA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IGtleSA9IGtleVNlbGVjdG9yKHgsIGkpO1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlbGVtZW50U2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBsZXQgYXJyYXkgPSBkaWN0LmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICBpZiAoYXJyYXkgIT09IFZPSUQwKVxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGljdC5hZGRCeUtleVZhbHVlKGtleSwgW2VsZW1lbnRdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgTG9va3VwKGRpY3QpO1xuICAgIH1cbiAgICB0b01hcChrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIG9ialtrZXlTZWxlY3Rvcih4LCBpKV0gPSBlbGVtZW50U2VsZWN0b3IoeCwgaSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICB0b0RpY3Rpb25hcnkoa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3RvciwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGRpY3QgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IGRpY3QuYWRkQnlLZXlWYWx1ZShrZXlTZWxlY3Rvcih4LCBpKSwgZWxlbWVudFNlbGVjdG9yKHgsIGkpKSk7XG4gICAgICAgIHJldHVybiBkaWN0O1xuICAgIH1cbiAgICB0b0pvaW5lZFN0cmluZyhzZXBhcmF0b3IgPSBcIlwiLCBzZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICAgICAgLnNlbGVjdChzZWxlY3RvcilcbiAgICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAgIC5qb2luKHNlcGFyYXRvcik7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICB0YWtlRXhjZXB0TGFzdChjb3VudCA9IDEpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghKGNvdW50ID4gMCkpXG4gICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShjb3VudCkpXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgY29uc3QgYyA9IGNvdW50O1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHE7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgcSA9IG5ldyBRdWV1ZSgpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgbmV4dCBvbmUgdG8gdGhlIHF1ZXVlLlxuICAgICAgICAgICAgICAgICAgICBxLmVucXVldWUoZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gRGlkIHdlIHJlYWNoIG91ciBxdW90YT9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHEuY291bnQgPiBjKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2theSB0aGVuLCBzdGFydCByZXR1cm5pbmcgcmVzdWx0cy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHEuZGVxdWV1ZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBpZiAocSlcbiAgICAgICAgICAgICAgICAgICAgcS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgcSA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNraXBUb0xhc3QoY291bnQpIHtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgLy8gVGhpcyBzZXRzIHVwIHRoZSBxdWVyeSBzbyBub3RoaW5nIGlzIGRvbmUgdW50aWwgbW92ZSBuZXh0IGlzIGNhbGxlZC5cbiAgICAgICAgcmV0dXJuIF8ucmV2ZXJzZSgpXG4gICAgICAgICAgICAudGFrZShjb3VudClcbiAgICAgICAgICAgIC5yZXZlcnNlKCk7XG4gICAgfVxuICAgIC8vIFRvIGhlbHAgd2l0aCB0eXBlIGd1YXJkaW5nLlxuICAgIHNlbGVjdChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gc3VwZXIuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICB9XG4gICAgbWFwKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBzZWxlY3RNYW55KGNvbGxlY3Rpb25TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcik7XG4gICAgfVxuICAgIGNob29zZShzZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoc2VsZWN0b3IsIGlzTm90TnVsbE9yVW5kZWZpbmVkKTtcbiAgICB9XG4gICAgcmV2ZXJzZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aHJvd0lmRW5kbGVzcyhfLl9pc0VuZGxlc3MpOyAvLyBDYW5ub3QgcmV2ZXJzZSBhbiBlbmRsZXNzIGNvbGxlY3Rpb24uLi5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYnVmZmVyO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBfLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4gISFpbmRleCAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKGJ1ZmZlclstLWluZGV4XSksICgpID0+IHtcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaHVmZmxlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKF8uX2lzRW5kbGVzcyk7IC8vIENhbm5vdCBzaHVmZmxlIGFuIGVuZGxlc3MgY29sbGVjdGlvbi4uLlxuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgICAgICBsZXQgY2FwYWNpdHk7XG4gICAgICAgICAgICBsZXQgbGVuO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBfLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICBjYXBhY2l0eSA9IGxlbiA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEF2b2lkIHVzaW5nIG1ham9yIGFycmF5IG9wZXJhdGlvbnMgbGlrZSAuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWxlbilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEluZGV4ID0gUmFuZG9tLmludGVnZXIobGVuKTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRWYWx1ZSA9IGJ1ZmZlcltzZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgICAgICBidWZmZXJbc2VsZWN0ZWRJbmRleF0gPSBidWZmZXJbLS1sZW5dOyAvLyBUYWtlIHRoZSBsYXN0IG9uZSBhbmQgcHV0IGl0IGhlcmUuXG4gICAgICAgICAgICAgICAgYnVmZmVyW2xlbl0gPSBOVUxMOyAvLyBjbGVhciBwb3NzaWJsZSByZWZlcmVuY2UuXG4gICAgICAgICAgICAgICAgaWYgKGxlbiAlIDMyID09IDApXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSBsZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oc2VsZWN0ZWRWYWx1ZSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY291bnQocHJlZGljYXRlKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZm9yRWFjaChwcmVkaWNhdGVcbiAgICAgICAgICAgID8gKHgsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlKHgsIGkpKVxuICAgICAgICAgICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuICAgIC8vIEFraW4gdG8gJy5ldmVyeScgb24gYW4gYXJyYXkuXG4gICAgYWxsKHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJwcmVkaWNhdGVcIik7XG4gICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICghcHJlZGljYXRlKHgsIGkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gJ2V2ZXJ5JyBoYXMgYmVlbiBhZGRlZCBoZXJlIGZvciBwYXJpdHkvY29tcGF0aWJpbGl0eSB3aXRoIGFuIGFycmF5LlxuICAgIGV2ZXJ5KHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGwocHJlZGljYXRlKTtcbiAgICB9XG4gICAgLy8gQWtpbiB0byAnLnNvbWUnIG9uIGFuIGFycmF5LlxuICAgIGFueShwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuYW55KCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgLy8gU3BsaXR0aW5nIHRoZSBmb3JFYWNoIHVwIHRoaXMgd2F5IHJlZHVjZXMgaXRlcmF0aXZlIHByb2Nlc3NpbmcuXG4gICAgICAgIC8vIGZvckVhY2ggaGFuZGxlcyB0aGUgZ2VuZXJhdGlvbiBhbmQgZGlzcG9zYWwgb2YgdGhlIGVudW1lcmF0b3IuXG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0ID0gcHJlZGljYXRlKHgsIGkpOyAvLyBmYWxzZSA9IG5vdCBmb3VuZCBhbmQgdGhlcmVmb3JlIGl0IHNob3VsZCBjb250aW51ZS4gIHRydWUgPSBmb3VuZCBhbmQgYnJlYWs7XG4gICAgICAgICAgICByZXR1cm4gIXJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vICdzb21lJyBoYXMgYmVlbiBhZGRlZCBoZXJlIGZvciBwYXJpdHkvY29tcGF0aWJpbGl0eSB3aXRoIGFuIGFycmF5LlxuICAgIHNvbWUocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFueShwcmVkaWNhdGUpO1xuICAgIH1cbiAgICBjb250YWlucyh2YWx1ZSwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGlmIChjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBjb21wYXJlU2VsZWN0b3IodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW55KHYgPT4gYXJlRXF1YWxWYWx1ZXMoY29tcGFyZVNlbGVjdG9yKHYpLCBzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYW55KHYgPT4gYXJlRXF1YWxWYWx1ZXModiwgdmFsdWUpKTtcbiAgICB9XG4gICAgLy8gT3JpZ2luYWxseSBoYXMgYW4gb3ZlcmxvYWQgZm9yIGEgcHJlZGljYXRlLFxuICAgIC8vIGJ1dCB0aGF0J3MgYSBiYWQgaWRlYSBzaW5jZSB0aGlzIGNvdWxkIGJlIGFuIGVudW1lcmF0aW9uIG9mIGZ1bmN0aW9ucyBhbmQgdGhlcmVmb3JlIGZhaWwgdGhlIGludGVudC5cbiAgICAvLyBCZXR0ZXIgdG8gY2hhaW4gYSB3aGVyZSBzdGF0ZW1lbnQgZmlyc3QgdG8gYmUgbW9yZSBleHBsaWNpdC5cbiAgICBpbmRleE9mKHZhbHVlLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgbGV0IGZvdW5kID0gLTE7XG4gICAgICAgIHRoaXMuZm9yRWFjaChjb21wYXJlU2VsZWN0b3JcbiAgICAgICAgICAgID8gKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXJlRXF1YWxWYWx1ZXMoY29tcGFyZVNlbGVjdG9yKGVsZW1lbnQsIGkpLCBjb21wYXJlU2VsZWN0b3IodmFsdWUsIGkpLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IChlbGVtZW50LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gV2h5PyAgQmVjYXVzZSBOYU4gZG9lc24ndCBlcXVhbCBOYU4uIDpQXG4gICAgICAgICAgICAgICAgaWYgKGFyZUVxdWFsVmFsdWVzKGVsZW1lbnQsIHZhbHVlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICBsYXN0SW5kZXhPZih2YWx1ZSwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAtMTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGNvbXBhcmVTZWxlY3RvclxuICAgICAgICAgICAgPyAoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlU2VsZWN0b3IoZWxlbWVudCwgaSksIGNvbXBhcmVTZWxlY3Rvcih2YWx1ZSwgaSksIHRydWUpKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXJlRXF1YWxWYWx1ZXMoZWxlbWVudCwgdmFsdWUsIHRydWUpKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGludGVyc2VjdChzZWNvbmQsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFzZWNvbmQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic2Vjb25kXCIpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLmlzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBrZXlzO1xuICAgICAgICAgICAgbGV0IG91dHM7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXNlY29uZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGtleXMgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIG91dHMgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGVudW1VdGlsLmZvckVhY2goc2Vjb25kLCBrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLmFkZEJ5S2V5VmFsdWUoa2V5LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvdXRzLmNvbnRhaW5zS2V5KGN1cnJlbnQpICYmIGtleXMuY29udGFpbnNLZXkoY3VycmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHMuYWRkQnlLZXlWYWx1ZShjdXJyZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleXMpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChvdXRzKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBrZXlzID0gTlVMTDtcbiAgICAgICAgICAgICAgICBvdXRzID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHNlY29uZCA9IE5VTEw7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIHNlcXVlbmNlRXF1YWwoc2Vjb25kLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWxWYWx1ZXMpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlMSA9PiB1c2luZyhlbnVtVXRpbC5mcm9tKHNlY29uZCksIGUyID0+IHtcbiAgICAgICAgICAgIC8vIGlmIGJvdGggYXJlIGVuZGxlc3MsIHRoaXMgd2lsbCBuZXZlciBldmFsdWF0ZS5cbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKGUxLmlzRW5kbGVzcyAmJiBlMi5pc0VuZGxlc3MpO1xuICAgICAgICAgICAgd2hpbGUgKGUxLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWUyLm1vdmVOZXh0KCkgfHwgIWVxdWFsaXR5Q29tcGFyZXIoZTEuY3VycmVudCwgZTIuY3VycmVudCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAhZTIubW92ZU5leHQoKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBvZlR5cGUodHlwZSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gc3VwZXIub2ZUeXBlKHR5cGUpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIE9yZGVyaW5nIE1ldGhvZHNcbiAgICBvcmRlckJ5KGtleVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywga2V5U2VsZWN0b3IsIDEgLyogQXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgb3JkZXJVc2luZyhjb21wYXJpc29uKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywgbnVsbCwgMSAvKiBBc2NlbmRpbmcgKi8sIG51bGwsIGNvbXBhcmlzb24pO1xuICAgIH1cbiAgICBvcmRlclVzaW5nUmV2ZXJzZWQoY29tcGFyaXNvbikge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMsIG51bGwsIC0xIC8qIERlc2NlbmRpbmcgKi8sIG51bGwsIGNvbXBhcmlzb24pO1xuICAgIH1cbiAgICBvcmRlckJ5RGVzY2VuZGluZyhrZXlTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMsIGtleVNlbGVjdG9yLCAtMSAvKiBEZXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgLypcbiAgICAgICAgIHdlaWdodGVkU2FtcGxlKHdlaWdodFNlbGVjdG9yKSB7XG4gICAgICAgICB3ZWlnaHRTZWxlY3RvciA9IFV0aWxzLmNyZWF0ZUxhbWJkYSh3ZWlnaHRTZWxlY3Rvcik7XG4gICAgICAgICB2YXIgc291cmNlID0gdGhpcztcbiAgICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGU8VD4oKCkgPT4ge1xuICAgICAgICAgdmFyIHNvcnRlZEJ5Qm91bmQ7XG4gICAgICAgICB2YXIgdG90YWxXZWlnaHQgPSAwO1xuICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZTxUPihcbiAgICAgICAgICgpID0+IHtcbiAgICAgICAgIHNvcnRlZEJ5Qm91bmQgPSBzb3VyY2VcbiAgICAgICAgIC5jaG9vc2UoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgIHZhciB3ZWlnaHQgPSB3ZWlnaHRTZWxlY3Rvcih4KTtcbiAgICAgICAgIGlmICh3ZWlnaHQgPD0gMCkgcmV0dXJuIG51bGw7IC8vIGlnbm9yZSAwXG4gICAgICAgICB0b3RhbFdlaWdodCArPSB3ZWlnaHQ7XG4gICAgICAgICByZXR1cm4geyB2YWx1ZTogeCwgYm91bmQ6IHRvdGFsV2VpZ2h0IH1cbiAgICAgICAgIH0pXG4gICAgICAgICAudG9BcnJheSgpO1xuICAgICAgICAgfSxcbiAgICAgICAgICgpID0+IHtcbiAgICAgICAgIGlmIChzb3J0ZWRCeUJvdW5kLmxlbmd0aCA+IDApIHtcbiAgICAgICAgIHZhciBkcmF3ID0gKE1hdGgucmFuZG9tKCkgKiB0b3RhbFdlaWdodCkgKyAxO1xuICAgICAgICAgdmFyIGxvd2VyID0gLTE7XG4gICAgICAgICB2YXIgdXBwZXIgPSBzb3J0ZWRCeUJvdW5kLmxlbmd0aDtcbiAgICAgICAgIHdoaWxlICh1cHBlciAtIGxvd2VyID4gMSkge1xuICAgICAgICAgdmFyIGluZGV4ID0gKChsb3dlciArIHVwcGVyKSAvIDIpO1xuICAgICAgICAgaWYgKHNvcnRlZEJ5Qm91bmRbaW5kZXhdLmJvdW5kID49IGRyYXcpIHtcbiAgICAgICAgIHVwcGVyID0gaW5kZXg7XG4gICAgICAgICB9XG4gICAgICAgICBlbHNlIHtcbiAgICAgICAgIGxvd2VyID0gaW5kZXg7XG4gICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykueWllbGRSZXR1cm4oc29ydGVkQnlCb3VuZFt1cHBlcl0udmFsdWUpO1xuICAgICAgICAgfVxuICAgICAgICAgcmV0dXJuICg8YW55PnRoaXMpLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgIH0sXG4gICAgICAgICBGdW5jdGlvbnMuQmxhbmspO1xuICAgICAgICAgfSk7XG4gICAgICAgICB9XG4gICAgICAgICAqL1xuICAgIC8vICNlbmRyZWdpb25cbiAgICBidWZmZXIoc2l6ZSkge1xuICAgICAgICByZXR1cm4gc3VwZXIuYnVmZmVyKHNpemUpO1xuICAgIH1cbiAgICBncm91cEJ5KGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBpZiAoIWVsZW1lbnRTZWxlY3RvcilcbiAgICAgICAgICAgIGVsZW1lbnRTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eTsgLy8gQWxsb3cgZm9yICdudWxsJyBhbmQgbm90IGp1c3QgdW5kZWZpbmVkLlxuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHRoaXNcbiAgICAgICAgICAgIC50b0xvb2t1cChrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IpXG4gICAgICAgICAgICAuZ2V0RW51bWVyYXRvcigpKTtcbiAgICB9XG4gICAgcGFydGl0aW9uQnkoa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IgPSAoa2V5LCBlbGVtZW50cykgPT4gbmV3IEdyb3VwaW5nKGtleSwgZWxlbWVudHMpLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghZWxlbWVudFNlbGVjdG9yKVxuICAgICAgICAgICAgZWxlbWVudFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5OyAvLyBBbGxvdyBmb3IgJ251bGwnIGFuZCBub3QganVzdCB1bmRlZmluZWQuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQga2V5O1xuICAgICAgICAgICAgbGV0IGNvbXBhcmVLZXk7XG4gICAgICAgICAgICBsZXQgZ3JvdXA7XG4gICAgICAgICAgICBsZXQgbGVuO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFlbGVtZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlTZWxlY3Rvcih2KTtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFyZUtleSA9IGNvbXBhcmVTZWxlY3RvcihrZXkpO1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IFtlbGVtZW50U2VsZWN0b3IodildO1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFlbGVtZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGlmICghZ3JvdXApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICBsZXQgaGFzTmV4dCwgYztcbiAgICAgICAgICAgICAgICB3aGlsZSAoKGhhc05leHQgPSBlbnVtZXJhdG9yLm1vdmVOZXh0KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlS2V5LCBjb21wYXJlU2VsZWN0b3Ioa2V5U2VsZWN0b3IoYykpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwW2xlbisrXSA9IGVsZW1lbnRTZWxlY3RvcihjKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSByZXN1bHRTZWxlY3RvcihrZXksIGdyb3VwKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBjID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlTZWxlY3RvcihjKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFyZUtleSA9IGNvbXBhcmVTZWxlY3RvcihrZXkpO1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IFtlbGVtZW50U2VsZWN0b3IoYyldO1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBncm91cCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudFNlbGVjdG9yID0gTlVMTDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZsYXR0ZW4oKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5mbGF0dGVuKCk7XG4gICAgfVxuICAgIHBhaXJ3aXNlKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5wYWlyd2lzZShzZWxlY3Rvcik7XG4gICAgfVxuICAgIGFnZ3JlZ2F0ZShyZWR1Y3Rpb24sIGluaXRpYWxWYWx1ZSkge1xuICAgICAgICBpZiAoaW5pdGlhbFZhbHVlID09IFZPSUQwKSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gaVxuICAgICAgICAgICAgICAgICAgICA/IHJlZHVjdGlvbihpbml0aWFsVmFsdWUsIHZhbHVlLCBpKVxuICAgICAgICAgICAgICAgICAgICA6IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gcmVkdWN0aW9uKGluaXRpYWxWYWx1ZSwgdmFsdWUsIGkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluaXRpYWxWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvdmlkZWQgYXMgYW4gYW5hbG9nIGZvciBhcnJheS5yZWR1Y2UuICBTaW1wbHkgYSBzaG9ydGN1dCBmb3IgYWdncmVnYXRlLlxuICAgICAqIEBwYXJhbSByZWR1Y3Rpb25cbiAgICAgKiBAcGFyYW0gaW5pdGlhbFZhbHVlXG4gICAgICovXG4gICAgcmVkdWNlKHJlZHVjdGlvbiwgaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZShyZWR1Y3Rpb24sIGluaXRpYWxWYWx1ZSk7XG4gICAgfVxuICAgIGF2ZXJhZ2Uoc2VsZWN0b3IgPSBUeXBlLm51bWJlck9yTmFOKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IHN1bSA9IHRoaXMuc3VtKChlLCBpKSA9PiB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKGUsIGkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIChpc05hTihzdW0pIHx8ICFjb3VudClcbiAgICAgICAgICAgID8gTmFOXG4gICAgICAgICAgICA6IChzdW0gLyBjb3VudCk7XG4gICAgfVxuICAgIC8vIElmIHVzaW5nIG51bWJlcnMsIGl0IG1heSBiZSB1c2VmdWwgdG8gY2FsbCAudGFrZVVudGlsKHY9PnY9PUluZmluaXR5LHRydWUpIGJlZm9yZSBjYWxsaW5nIG1heC4gU2VlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgbnVtYmVycy5cbiAgICBtYXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZShGdW5jdGlvbnMuR3JlYXRlcik7XG4gICAgfVxuICAgIG1pbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKEZ1bmN0aW9ucy5MZXNzZXIpO1xuICAgIH1cbiAgICBtYXhCeShrZXlTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUoKGEsIGIpID0+IChrZXlTZWxlY3RvcihhKSA+IGtleVNlbGVjdG9yKGIpKSA/IGEgOiBiKTtcbiAgICB9XG4gICAgbWluQnkoa2V5U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKChhLCBiKSA9PiAoa2V5U2VsZWN0b3IoYSkgPCBrZXlTZWxlY3RvcihiKSkgPyBhIDogYik7XG4gICAgfVxuICAgIC8vIEFkZGl0aW9uLi4uICBPbmx5IHdvcmtzIHdpdGggbnVtZXJpY2FsIGVudW1lcmF0aW9ucy5cbiAgICBzdW0oc2VsZWN0b3IgPSBUeXBlLm51bWJlck9yTmFOKSB7XG4gICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICAvLyBUaGlzIGFsbG93cyBmb3IgaW5maW5pdHkgbWF0aCB0aGF0IGRvZXNuJ3QgZGVzdHJveSB0aGUgb3RoZXIgdmFsdWVzLlxuICAgICAgICBsZXQgc3VtSW5maW5pdGUgPSAwOyAvLyBOZWVkcyBtb3JlIGludmVzdGlnYXRpb24gc2luY2Ugd2UgYXJlIHJlYWxseSB0cnlpbmcgdG8gcmV0YWluIHNpZ25zLlxuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdG9yKHgsIGkpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHN1bSA9IE5hTjtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNGaW5pdGUodmFsdWUpKVxuICAgICAgICAgICAgICAgIHN1bSArPSB2YWx1ZTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdW1JbmZpbml0ZSArPVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA+IDAgPyAoKzEpIDogKC0xKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpc05hTihzdW0pID8gTmFOIDogKHN1bUluZmluaXRlID8gKHN1bUluZmluaXRlICogSW5maW5pdHkpIDogc3VtKTtcbiAgICB9XG4gICAgLy8gTXVsdGlwbGljYXRpb24uLi5cbiAgICBwcm9kdWN0KHNlbGVjdG9yID0gVHlwZS5udW1iZXJPck5hTikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gMSwgZXhpc3RzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdG9yKHgsIGkpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE5hTjtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDA7IC8vIE11bHRpcGx5aW5nIGJ5IHplcm8gd2lsbCBhbHdheXMgZW5kIGluIHplcm8uXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTXVsdGlwbGljYXRpb24gY2FuIG5ldmVyIHJlY292ZXIgZnJvbSBpbmZpbml0eSBhbmQgc2ltcGx5IG11c3QgcmV0YWluIHNpZ25zLlxuICAgICAgICAgICAgLy8gWW91IGNvdWxkIGNhbmNlbCBvdXQgaW5maW5pdHkgd2l0aCAxL2luZmluaXR5IGJ1dCBubyBhdmFpbGFibGUgcmVwcmVzZW50YXRpb24gZXhpc3RzLlxuICAgICAgICAgICAgcmVzdWx0ICo9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIChleGlzdHMgJiYgaXNOYU4ocmVzdWx0KSkgPyBOYU4gOiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIHRoZSBmaXJzdCBudW1iZXIgYW5kIGRpdmlkZXMgaXQgYnkgYWxsIGZvbGxvd2luZy5cbiAgICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHF1b3RpZW50KHNlbGVjdG9yID0gVHlwZS5udW1iZXJPck5hTikge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBsZXQgcmVzdWx0ID0gTmFOO1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdG9yKHgsIGkpO1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gMCB8fCAhaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IE5hTjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgLz0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY291bnQgPT09IDEpXG4gICAgICAgICAgICByZXN1bHQgPSBOYU47XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICAvLyAjcmVnaW9uIFNpbmdsZSBWYWx1ZSBSZXR1cm4uLi5cbiAgICBsYXN0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IHZhbHVlID0gVk9JRDA7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBfLmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB2YWx1ZSA9IHg7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWZvdW5kKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibGFzdDpObyBlbGVtZW50IHNhdGlzZmllcyB0aGUgY29uZGl0aW9uLlwiKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBsYXN0T3JEZWZhdWx0KGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IHZhbHVlID0gVk9JRDA7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBfLmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB2YWx1ZSA9IHg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKCFmb3VuZCkgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIG1lbW9pemUoKSB7XG4gICAgICAgIGxldCBzb3VyY2UgPSBuZXcgTGF6eUxpc3QodGhpcyk7XG4gICAgICAgIHJldHVybiAobmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHNvdXJjZS5nZXRFbnVtZXJhdG9yKCksICgpID0+IHtcbiAgICAgICAgICAgIHNvdXJjZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICBzb3VyY2UgPSBudWxsO1xuICAgICAgICB9LCB0aGlzLmlzRW5kbGVzcykpO1xuICAgIH1cbiAgICB0aHJvd1doZW5FbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oUkVUVVJOLCBudWxsLCB0aGlzLmlzRW5kbGVzcywgY291bnQgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb3VudClcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNvbGxlY3Rpb24gaXMgZW1wdHkuXCI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIFByb3ZpZGVkIGZvciB0eXBlIGd1YXJkaW5nLlxuZXhwb3J0IGNsYXNzIEZpbml0ZUVudW1lcmFibGUgZXh0ZW5kcyBMaW5xRW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3IoZW51bWVyYXRvckZhY3RvcnksIGZpbmFsaXplcikge1xuICAgICAgICBzdXBlcihlbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJGaW5pdGVFbnVtZXJhYmxlXCI7XG4gICAgfVxufVxuY2xhc3MgQXJyYXlFbnVtZXJhYmxlIGV4dGVuZHMgRmluaXRlRW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlKSB7XG4gICAgICAgIHN1cGVyKCgpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5RW51bWVyYXRvcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGUgdW5kZXJseWluZyBBcnJheUVudW1lcmFibGUgd2FzIGRpc3Bvc2VkLlwiLCBcIkFycmF5RW51bWVyYXRvclwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5fc291cmNlOyAvLyBTaG91bGQgbmV2ZXIgYmUgbnVsbCwgYnV0IEFycmF5RW51bWVyYWJsZSBpZiBub3QgZGlzcG9zZWQgc2ltcGx5IHRyZWF0cyBudWxsIGFzIGVtcHR5IGFycmF5LlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIkFycmF5RW51bWVyYWJsZVwiO1xuICAgICAgICBfLl9zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fc291cmNlID0gTlVMTDtcbiAgICB9XG4gICAgZ2V0IHNvdXJjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZTtcbiAgICB9XG4gICAgdG9BcnJheSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBlbnVtVXRpbC50b0FycmF5KF8uX3NvdXJjZSk7XG4gICAgfVxuICAgIGFzRW51bWVyYWJsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhYmxlKHRoaXMuX3NvdXJjZSk7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uLCBtYXggPSBJbmZpbml0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLmZvckVhY2goXy5fc291cmNlLCBhY3Rpb24sIG1heCk7XG4gICAgfVxuICAgIC8vIFRoZXNlIG1ldGhvZHMgc2hvdWxkIEFMV0FZUyBjaGVjayBmb3IgYXJyYXkgbGVuZ3RoIGJlZm9yZSBhdHRlbXB0aW5nIGFueXRoaW5nLlxuICAgIGFueShwcmVkaWNhdGUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZTtcbiAgICAgICAgbGV0IGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiAhIWxlbiAmJiAoIXByZWRpY2F0ZSB8fCBzdXBlci5hbnkocHJlZGljYXRlKSk7XG4gICAgfVxuICAgIGNvdW50KHByZWRpY2F0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlLCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICByZXR1cm4gbGVuICYmIChwcmVkaWNhdGUgPyBzdXBlci5jb3VudChwcmVkaWNhdGUpIDogbGVuKTtcbiAgICB9XG4gICAgZWxlbWVudEF0T3JEZWZhdWx0KGluZGV4LCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihpbmRleCwgJ2luZGV4Jyk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZTtcbiAgICAgICAgcmV0dXJuIGluZGV4IDwgc291cmNlLmxlbmd0aFxuICAgICAgICAgICAgPyBzb3VyY2VbaW5kZXhdXG4gICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgbGFzdCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZSwgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIChsZW4pXG4gICAgICAgICAgICA/IHNvdXJjZVtsZW4gLSAxXVxuICAgICAgICAgICAgOiBzdXBlci5sYXN0KCk7XG4gICAgfVxuICAgIGxhc3RPckRlZmF1bHQoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBfLl9zb3VyY2UsIGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgICAgICAgID8gc291cmNlW2xlbiAtIDFdXG4gICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgc2tpcChjb3VudCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IG5ldyBBcnJheUVudW1lcmF0b3IoKCkgPT4gXy5fc291cmNlLCBjb3VudCkpO1xuICAgIH1cbiAgICB0YWtlRXhjZXB0TGFzdChjb3VudCA9IDEpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBfLnRha2UoXy5fc291cmNlLmxlbmd0aCAtIGNvdW50KTtcbiAgICB9XG4gICAgc2tpcFRvTGFzdChjb3VudCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgcmV0dXJuIF87XG4gICAgICAgIGNvbnN0IGxlbiA9IF8uX3NvdXJjZVxuICAgICAgICAgICAgPyBfLl9zb3VyY2UubGVuZ3RoXG4gICAgICAgICAgICA6IDA7XG4gICAgICAgIHJldHVybiBfLnNraXAobGVuIC0gY291bnQpO1xuICAgIH1cbiAgICByZXZlcnNlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5kZXhFbnVtZXJhdG9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcyA9IF8uX3NvdXJjZTtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQgfHwgIXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogcyxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogKHMubGVuZ3RoIC0gMSksXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aDogcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IC0xXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtZW1vaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hc0VudW1lcmFibGUoKTtcbiAgICB9XG4gICAgc2VxdWVuY2VFcXVhbChzZWNvbmQsIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbFZhbHVlcykge1xuICAgICAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShzZWNvbmQpKVxuICAgICAgICAgICAgcmV0dXJuIEFycmF5cy5hcmVFcXVhbCh0aGlzLnNvdXJjZSwgc2Vjb25kLCB0cnVlLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICAgICAgaWYgKHNlY29uZCBpbnN0YW5jZW9mIEFycmF5RW51bWVyYWJsZSlcbiAgICAgICAgICAgIHJldHVybiBzZWNvbmQuc2VxdWVuY2VFcXVhbCh0aGlzLnNvdXJjZSwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgICAgIHJldHVybiBzdXBlci5zZXF1ZW5jZUVxdWFsKHNlY29uZCwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgfVxuICAgIHRvSm9pbmVkU3RyaW5nKHNlcGFyYXRvciA9IFwiXCIsIHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLl9zb3VyY2U7XG4gICAgICAgIHJldHVybiAhc2VsZWN0b3IgJiYgKHMpIGluc3RhbmNlb2YgKEFycmF5KVxuICAgICAgICAgICAgPyBzLmpvaW4oc2VwYXJhdG9yKVxuICAgICAgICAgICAgOiBzdXBlci50b0pvaW5lZFN0cmluZyhzZXBhcmF0b3IsIHNlbGVjdG9yKTtcbiAgICB9XG59XG5jbGFzcyBHcm91cGluZyBleHRlbmRzIEFycmF5RW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3IoX2dyb3VwS2V5LCBlbGVtZW50cykge1xuICAgICAgICBzdXBlcihlbGVtZW50cyk7XG4gICAgICAgIHRoaXMuX2dyb3VwS2V5ID0gX2dyb3VwS2V5O1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiR3JvdXBpbmdcIjtcbiAgICB9XG4gICAgZ2V0IGtleSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyb3VwS2V5O1xuICAgIH1cbn1cbmNsYXNzIExvb2t1cCB7XG4gICAgY29uc3RydWN0b3IoX2RpY3Rpb25hcnkpIHtcbiAgICAgICAgdGhpcy5fZGljdGlvbmFyeSA9IF9kaWN0aW9uYXJ5O1xuICAgIH1cbiAgICBnZXQgY291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaWN0aW9uYXJ5LmNvdW50O1xuICAgIH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaWN0aW9uYXJ5LmdldFZhbHVlKGtleSkgfHwgbnVsbDtcbiAgICB9XG4gICAgY29udGFpbnMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaWN0aW9uYXJ5LmNvbnRhaW5zS2V5KGtleSk7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5fZGljdGlvbmFyeS5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKG5ldyBHcm91cGluZyhjdXJyZW50LmtleSwgY3VycmVudC52YWx1ZSkpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5jbGFzcyBPcmRlcmVkRW51bWVyYWJsZSBleHRlbmRzIEZpbml0ZUVudW1lcmFibGUge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSwga2V5U2VsZWN0b3IsIG9yZGVyLCBwYXJlbnQsIGNvbXBhcmVyID0gY29tcGFyZVZhbHVlcykge1xuICAgICAgICBzdXBlcihOVUxMKTtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIHRoaXMua2V5U2VsZWN0b3IgPSBrZXlTZWxlY3RvcjtcbiAgICAgICAgdGhpcy5vcmRlciA9IG9yZGVyO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5jb21wYXJlciA9IGNvbXBhcmVyO1xuICAgICAgICB0aHJvd0lmRW5kbGVzcyhzb3VyY2UgJiYgc291cmNlLmlzRW5kbGVzcyk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJPcmRlcmVkRW51bWVyYWJsZVwiO1xuICAgIH1cbiAgICBjcmVhdGVPcmRlcmVkRW51bWVyYWJsZShrZXlTZWxlY3Rvciwgb3JkZXIpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLnNvdXJjZSwga2V5U2VsZWN0b3IsIG9yZGVyLCB0aGlzKTtcbiAgICB9XG4gICAgdGhlbkJ5KGtleVNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU9yZGVyZWRFbnVtZXJhYmxlKGtleVNlbGVjdG9yLCAxIC8qIEFzY2VuZGluZyAqLyk7XG4gICAgfVxuICAgIHRoZW5Vc2luZyhjb21wYXJpc29uKSB7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcy5zb3VyY2UsIG51bGwsIDEgLyogQXNjZW5kaW5nICovLCB0aGlzLCBjb21wYXJpc29uKTtcbiAgICB9XG4gICAgdGhlbkJ5RGVzY2VuZGluZyhrZXlTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVPcmRlcmVkRW51bWVyYWJsZShrZXlTZWxlY3RvciwgLTEgLyogRGVzY2VuZGluZyAqLyk7XG4gICAgfVxuICAgIHRoZW5Vc2luZ1JldmVyc2VkKGNvbXBhcmlzb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLnNvdXJjZSwgbnVsbCwgLTEgLyogRGVzY2VuZGluZyAqLywgdGhpcywgY29tcGFyaXNvbik7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgYnVmZmVyO1xuICAgICAgICBsZXQgaW5kZXhlcztcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgYnVmZmVyID0gRW51bWVyYWJsZS50b0FycmF5KF8uc291cmNlKTtcbiAgICAgICAgICAgIGluZGV4ZXMgPSBjcmVhdGVTb3J0Q29udGV4dChfKVxuICAgICAgICAgICAgICAgIC5nZW5lcmF0ZVNvcnRlZEluZGV4ZXMoYnVmZmVyKTtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICByZXR1cm4gKGluZGV4IDwgaW5kZXhlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKGJ1ZmZlcltpbmRleGVzW2luZGV4KytdXSlcbiAgICAgICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoYnVmZmVyKVxuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICAgICAgYnVmZmVyID0gTlVMTDtcbiAgICAgICAgICAgIGlmIChpbmRleGVzKVxuICAgICAgICAgICAgICAgIGluZGV4ZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGluZGV4ZXMgPSBOVUxMO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIF8uc291cmNlID0gTlVMTDtcbiAgICAgICAgXy5rZXlTZWxlY3RvciA9IE5VTEw7XG4gICAgICAgIF8ub3JkZXIgPSBOVUxMO1xuICAgICAgICBfLnBhcmVudCA9IE5VTEw7XG4gICAgfVxufVxuLy8gQSBwcml2YXRlIHN0YXRpYyBoZWxwZXIgZm9yIHRoZSB3ZWF2ZSBmdW5jdGlvbi5cbmZ1bmN0aW9uIG5leHRFbnVtZXJhdG9yKHF1ZXVlLCBlKSB7XG4gICAgaWYgKGUpIHtcbiAgICAgICAgaWYgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgcXVldWUuZW5xdWV1ZShlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChlKVxuICAgICAgICAgICAgICAgIGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGU7XG59XG4vKipcbiAqIFJlY3Vyc2l2ZWx5IGJ1aWxkcyBhIFNvcnRDb250ZXh0IGNoYWluLlxuICogQHBhcmFtIG9yZGVyZWRFbnVtZXJhYmxlXG4gKiBAcGFyYW0gY3VycmVudENvbnRleHRcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVNvcnRDb250ZXh0KG9yZGVyZWRFbnVtZXJhYmxlLCBjdXJyZW50Q29udGV4dCA9IG51bGwpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gbmV3IEtleVNvcnRlZENvbnRleHQoY3VycmVudENvbnRleHQsIG9yZGVyZWRFbnVtZXJhYmxlLmtleVNlbGVjdG9yLCBvcmRlcmVkRW51bWVyYWJsZS5vcmRlciwgb3JkZXJlZEVudW1lcmFibGUuY29tcGFyZXIpO1xuICAgIGlmIChvcmRlcmVkRW51bWVyYWJsZS5wYXJlbnQpXG4gICAgICAgIHJldHVybiBjcmVhdGVTb3J0Q29udGV4dChvcmRlcmVkRW51bWVyYWJsZS5wYXJlbnQsIGNvbnRleHQpO1xuICAgIHJldHVybiBjb250ZXh0O1xufVxuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmZ1bmN0aW9uIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCkge1xuICAgIGlmIChkaXNwb3NlZClcbiAgICAgICAgdGhyb3cgbmV3IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uKFwiRW51bWVyYWJsZVwiKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBFbnVtZXJhYmxlKHNvdXJjZSwgLi4uYWRkaXRpb25hbCkge1xuICAgIHJldHVybiBlbnVtZXJhYmxlRnJvbShzb3VyY2UsIGFkZGl0aW9uYWwpO1xufVxuZnVuY3Rpb24gZW51bWVyYWJsZUZyb20oc291cmNlLCBhZGRpdGlvbmFsKSB7XG4gICAgbGV0IGUgPSBFbnVtZXJhYmxlLmZyb21Bbnkoc291cmNlKTtcbiAgICBpZiAoIWUpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbiAgICByZXR1cm4gKGFkZGl0aW9uYWwgJiYgYWRkaXRpb25hbC5sZW5ndGgpXG4gICAgICAgID8gZS5tZXJnZShhZGRpdGlvbmFsKVxuICAgICAgICA6IGU7XG59XG4oZnVuY3Rpb24gKEVudW1lcmFibGUpIHtcbiAgICBmdW5jdGlvbiBmcm9tKHNvdXJjZSwgLi4uYWRkaXRpb25hbCkge1xuICAgICAgICByZXR1cm4gZW51bWVyYWJsZUZyb20oc291cmNlLCBhZGRpdGlvbmFsKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5mcm9tID0gZnJvbTtcbiAgICBmdW5jdGlvbiBmcm9tQW55KHNvdXJjZSwgZGVmYXVsdEVudW1lcmFibGUpIHtcbiAgICAgICAgaWYgKFR5cGUuaXNPYmplY3Qoc291cmNlKSB8fCBUeXBlLmlzU3RyaW5nKHNvdXJjZSkpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKVxuICAgICAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgICAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShzb3VyY2UpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhYmxlKHNvdXJjZSk7XG4gICAgICAgICAgICBpZiAoaXNFbnVtZXJhYmxlKHNvdXJjZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBzb3VyY2UuZ2V0RW51bWVyYXRvcigpLCBudWxsLCBzb3VyY2UuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIGlmIChpc0VudW1lcmF0b3Ioc291cmNlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHNvdXJjZSwgbnVsbCwgc291cmNlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICBpZiAoaXNJdGVyYXRvcihzb3VyY2UpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmcm9tQW55KG5ldyBJdGVyYXRvckVudW1lcmF0b3Ioc291cmNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVHlwZS5pc0Z1bmN0aW9uKHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiBuZXcgSW5maW5pdGVFbnVtZXJhdG9yKHNvdXJjZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZhdWx0RW51bWVyYWJsZTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5mcm9tQW55ID0gZnJvbUFueTtcbiAgICBmdW5jdGlvbiBmcm9tVGhlc2Uoc291cmNlcykge1xuICAgICAgICBzd2l0Y2ggKHNvdXJjZXMgPyBzb3VyY2VzLmxlbmd0aCA6IDApIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHkoKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAvLyBBbGxvdyBmb3IgdmFsaWRhdGlvbiBhbmQgdGhyb3dpbmcuLi5cbiAgICAgICAgICAgICAgICByZXR1cm4gZW51bWVyYWJsZUZyb20oc291cmNlc1swXSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eSgpLm1lcmdlKHNvdXJjZXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIEVudW1lcmFibGUuZnJvbVRoZXNlID0gZnJvbVRoZXNlO1xuICAgIGZ1bmN0aW9uIGZyb21PckVtcHR5KHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gZnJvbUFueShzb3VyY2UpIHx8IGVtcHR5KCk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZnJvbU9yRW1wdHkgPSBmcm9tT3JFbXB0eTtcbiAgICAvKipcbiAgICAgKiBTdGF0aWMgaGVscGVyIGZvciBjb252ZXJ0aW5nIGVudW1lcmFibGVzIHRvIGFuIGFycmF5LlxuICAgICAqIEBwYXJhbSBzb3VyY2VcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRvQXJyYXkoc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBMaW5xRW51bWVyYWJsZSlcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UudG9BcnJheSgpO1xuICAgICAgICByZXR1cm4gZW51bVV0aWwudG9BcnJheShzb3VyY2UpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnRvQXJyYXkgPSB0b0FycmF5O1xuICAgIGZ1bmN0aW9uIF9jaG9pY2UodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiBuZXcgRW51bWVyYXRvckJhc2UobnVsbCwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghdmFsdWVzKTtcbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKFJhbmRvbS5zZWxlY3Qub25lKHZhbHVlcykpO1xuICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICksICgpID0+IHtcbiAgICAgICAgICAgIHZhbHVlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdmFsdWVzID0gTlVMTDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuX2Nob2ljZSA9IF9jaG9pY2U7XG4gICAgZnVuY3Rpb24gY2hvaWNlKHZhbHVlcykge1xuICAgICAgICBsZXQgbGVuID0gdmFsdWVzICYmIHZhbHVlcy5sZW5ndGg7XG4gICAgICAgIC8vIFdlIGNvdWxkIHJldHVybiBlbXB0eSBpZiBubyBsZW5ndGgsIGJ1dCB0aGF0IHdvdWxkIGJyZWFrIHRoZSB0eXBpbmcgYW5kIHByb2R1Y2UgdW5leHBlY3RlZCByZXN1bHRzLlxuICAgICAgICAvLyBFbmZvcmNpbmcgdGhhdCB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IDEgY2hvaWNlIGlzIGtleS5cbiAgICAgICAgaWYgKCFsZW4gfHwgIWlzRmluaXRlKGxlbikpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdsZW5ndGgnLCBsZW5ndGgpO1xuICAgICAgICByZXR1cm4gX2Nob2ljZShjb3B5KHZhbHVlcykpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmNob2ljZSA9IGNob2ljZTtcbiAgICBmdW5jdGlvbiBjaG9vc2VGcm9tKC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gV2UgY291bGQgcmV0dXJuIGVtcHR5IGlmIG5vIGxlbmd0aCwgYnV0IHRoYXQgd291bGQgYnJlYWsgdGhlIHR5cGluZyBhbmQgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgIC8vIEVuZm9yY2luZyB0aGF0IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgMSBjaG9pY2UgaXMga2V5LlxuICAgICAgICBpZiAoIWFyZ3MubGVuZ3RoKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbGVuZ3RoJywgbGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIF9jaG9pY2UoYXJncyk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuY2hvb3NlRnJvbSA9IGNob29zZUZyb207XG4gICAgZnVuY3Rpb24gX2N5Y2xlKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sIC8vIFJlaW5pdGlhbGl6ZSB0aGUgdmFsdWUganVzdCBpbiBjYXNlIHRoZSBlbnVtZXJhdG9yIGlzIHJlc3RhcnRlZC5cbiAgICAgICAgICAgICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCF2YWx1ZXMpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSB2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4odmFsdWVzW2luZGV4KytdKTtcbiAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHZhbHVlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdmFsdWVzID0gTlVMTDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN5Y2xlKHZhbHVlcykge1xuICAgICAgICBsZXQgbGVuID0gdmFsdWVzICYmIHZhbHVlcy5sZW5ndGg7XG4gICAgICAgIC8vIFdlIGNvdWxkIHJldHVybiBlbXB0eSBpZiBubyBsZW5ndGgsIGJ1dCB0aGF0IHdvdWxkIGJyZWFrIHRoZSB0eXBpbmcgYW5kIHByb2R1Y2UgdW5leHBlY3RlZCByZXN1bHRzLlxuICAgICAgICAvLyBFbmZvcmNpbmcgdGhhdCB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IDEgY2hvaWNlIGlzIGtleS5cbiAgICAgICAgaWYgKCFsZW4gfHwgIWlzRmluaXRlKGxlbikpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdsZW5ndGgnLCBsZW5ndGgpO1xuICAgICAgICAvLyBNYWtlIGEgY29weSB0byBhdm9pZCBtb2RpZnlpbmcgdGhlIGNvbGxlY3Rpb24gYXMgd2UgZ28uXG4gICAgICAgIHJldHVybiBfY3ljbGUoY29weSh2YWx1ZXMpKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5jeWNsZSA9IGN5Y2xlO1xuICAgIGZ1bmN0aW9uIGN5Y2xlVGhyb3VnaCguLi5hcmdzKSB7XG4gICAgICAgIC8vIFdlIGNvdWxkIHJldHVybiBlbXB0eSBpZiBubyBsZW5ndGgsIGJ1dCB0aGF0IHdvdWxkIGJyZWFrIHRoZSB0eXBpbmcgYW5kIHByb2R1Y2UgdW5leHBlY3RlZCByZXN1bHRzLlxuICAgICAgICAvLyBFbmZvcmNpbmcgdGhhdCB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IDEgY2hvaWNlIGlzIGtleS5cbiAgICAgICAgaWYgKCFhcmdzLmxlbmd0aClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2xlbmd0aCcsIGxlbmd0aCk7XG4gICAgICAgIHJldHVybiBfY3ljbGUoYXJncyk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuY3ljbGVUaHJvdWdoID0gY3ljbGVUaHJvdWdoO1xuICAgIGZ1bmN0aW9uIGVtcHR5KCkge1xuICAgICAgICAvLyBDb3VsZCBiZSBzaW5nbGUgZXhwb3J0IGZ1bmN0aW9uIGluc3RhbmNlLCBidXQgZm9yIHNhZmV0eSwgd2UnbGwgbWFrZSBhIG5ldyBvbmUuXG4gICAgICAgIHJldHVybiBuZXcgRmluaXRlRW51bWVyYWJsZShnZXRFbXB0eUVudW1lcmF0b3IpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmVtcHR5ID0gZW1wdHk7XG4gICAgZnVuY3Rpb24gcmVwZWF0KGVsZW1lbnQsIGNvdW50ID0gSW5maW5pdHkpIHtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIHJldHVybiBpc0Zpbml0ZShjb3VudCkgJiYgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIilcbiAgICAgICAgICAgID8gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjID0gY291bnQ7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHsgaW5kZXggPSAwOyB9LCAoeWllbGRlcikgPT4gKGluZGV4KysgPCBjKSAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKGVsZW1lbnQpLCBudWxsLCBmYWxzZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gbmV3IEVudW1lcmF0b3JCYXNlKG51bGwsICh5aWVsZGVyKSA9PiB5aWVsZGVyLnlpZWxkUmV0dXJuKGVsZW1lbnQpLCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICApKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5yZXBlYXQgPSByZXBlYXQ7XG4gICAgZnVuY3Rpb24gcmVwZWF0V2l0aEZpbmFsaXplKGluaXRpYWxpemVyLCBmaW5hbGl6ZXIpIHtcbiAgICAgICAgaWYgKCFpbml0aWFsaXplcilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJpbml0aWFsaXplclwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYWxpemVyKVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gaW5pdGlhbGl6ZXIoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxpemVyXG4gICAgICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICA6IHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGlmIChmaW5hbGl6ZXIpXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsaXplcihlbGVtZW50KTtcbiAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGluaXRpYWxpemVyID0gTlVMTDtcbiAgICAgICAgICAgIGZpbmFsaXplciA9IFZPSUQwO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5yZXBlYXRXaXRoRmluYWxpemUgPSByZXBlYXRXaXRoRmluYWxpemU7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbnVtZXJhYmxlIG9mIG9uZSBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHJldHVybnMge0Zpbml0ZUVudW1lcmFibGU8VD59XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFrZShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiByZXBlYXQoZWxlbWVudCwgMSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUubWFrZSA9IG1ha2U7XG4gICAgLy8gc3RhcnQgYW5kIHN0ZXAgY2FuIGJlIG90aGVyIHRoYW4gaW50ZWdlci5cbiAgICBmdW5jdGlvbiByYW5nZShzdGFydCwgY291bnQsIHN0ZXAgPSAxKSB7XG4gICAgICAgIGlmICghaXNGaW5pdGUoc3RhcnQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0YXJ0XCIsIHN0YXJ0LCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBlbXB0eSgpO1xuICAgICAgICBpZiAoIXN0ZXApXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSB2YWxpZCB2YWx1ZVwiKTtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShzdGVwKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGVwXCIsIHN0ZXAsIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGaW5pdGVFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBjID0gY291bnQ7IC8vIEZvcmNlIGludGVnZXIgZXZhbHVhdGlvbi5cbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzdGFydDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluZGV4KysgPCBjXG4gICAgICAgICAgICAgICAgICAgICYmIHlpZWxkZXIueWllbGRSZXR1cm4odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgaW5kZXggPCBjb3VudClcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5yYW5nZSA9IHJhbmdlO1xuICAgIGZ1bmN0aW9uIHJhbmdlRG93bihzdGFydCwgY291bnQsIHN0ZXAgPSAxKSB7XG4gICAgICAgIHN0ZXAgPSBNYXRoLmFicyhzdGVwKSAqIC0xO1xuICAgICAgICByZXR1cm4gcmFuZ2Uoc3RhcnQsIGNvdW50LCBzdGVwKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5yYW5nZURvd24gPSByYW5nZURvd247XG4gICAgLy8gc3RlcCA9IC0xIGJlaGF2ZXMgdGhlIHNhbWUgYXMgdG9OZWdhdGl2ZUluZmluaXR5O1xuICAgIGZ1bmN0aW9uIHRvSW5maW5pdHkoc3RhcnQgPSAwLCBzdGVwID0gMSkge1xuICAgICAgICBpZiAoIWlzRmluaXRlKHN0YXJ0KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGFydFwiLCBzdGFydCwgXCJNdXN0IGJlIGEgZmluaXRlIG51bWJlci5cIik7XG4gICAgICAgIGlmICghc3RlcClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGVwXCIsIHN0ZXAsIFwiTXVzdCBiZSBhIHZhbGlkIHZhbHVlXCIpO1xuICAgICAgICBpZiAoIWlzRmluaXRlKHN0ZXApKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgZmluaXRlIG51bWJlci5cIik7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHN0YXJ0O1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oY3VycmVudCk7XG4gICAgICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS50b0luZmluaXR5ID0gdG9JbmZpbml0eTtcbiAgICBmdW5jdGlvbiB0b05lZ2F0aXZlSW5maW5pdHkoc3RhcnQgPSAwLCBzdGVwID0gMSkge1xuICAgICAgICByZXR1cm4gdG9JbmZpbml0eShzdGFydCwgLXN0ZXApO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnRvTmVnYXRpdmVJbmZpbml0eSA9IHRvTmVnYXRpdmVJbmZpbml0eTtcbiAgICBmdW5jdGlvbiByYW5nZVRvKHN0YXJ0LCB0bywgc3RlcCA9IDEpIHtcbiAgICAgICAgaWYgKGlzTmFOKHRvKSB8fCAhaXNGaW5pdGUodG8pKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInRvXCIsIHRvLCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgaWYgKHN0ZXAgJiYgIWlzRmluaXRlKHN0ZXApKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgZmluaXRlIG5vbi16ZXJvIG51bWJlci5cIik7XG4gICAgICAgIC8vIFRoaXMgd2F5IHdlIGFkanVzdCBmb3IgdGhlIGRlbHRhIGZyb20gc3RhcnQgYW5kIHRvIHNvIHRoZSB1c2VyIGNhbiBzYXkgKy8tIHN0ZXAgYW5kIGl0IHdpbGwgd29yayBhcyBleHBlY3RlZC5cbiAgICAgICAgc3RlcCA9IE1hdGguYWJzKHN0ZXApO1xuICAgICAgICByZXR1cm4gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7IHZhbHVlID0gc3RhcnQ7IH0sIHN0YXJ0IDwgdG9cbiAgICAgICAgICAgICAgICA/IHlpZWxkZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdmFsdWUgPD0gdG8gJiYgeWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBzdGVwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IHlpZWxkZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdmFsdWUgPj0gdG8gJiYgeWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAtPSBzdGVwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUucmFuZ2VUbyA9IHJhbmdlVG87XG4gICAgZnVuY3Rpb24gbWF0Y2hlcyhpbnB1dCwgcGF0dGVybiwgZmxhZ3MgPSBcIlwiKSB7XG4gICAgICAgIGlmIChpbnB1dCA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImlucHV0XCIpO1xuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGlucHV0O1xuICAgICAgICBpZiAodHlwZSAhPSBUeXBlLlNUUklORylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBleGVjIFJlZ0V4cCBtYXRjaGVzIG9mIHR5cGUgJ1wiICsgdHlwZSArIFwiJy5cIik7XG4gICAgICAgIGlmIChwYXR0ZXJuIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICBmbGFncyArPSAocGF0dGVybi5pZ25vcmVDYXNlKSA/IFwiaVwiIDogXCJcIjtcbiAgICAgICAgICAgIGZsYWdzICs9IChwYXR0ZXJuLm11bHRpbGluZSkgPyBcIm1cIiA6IFwiXCI7XG4gICAgICAgICAgICBwYXR0ZXJuID0gcGF0dGVybi5zb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZsYWdzLmluZGV4T2YoXCJnXCIpID09PSAtMSlcbiAgICAgICAgICAgIGZsYWdzICs9IFwiZ1wiO1xuICAgICAgICByZXR1cm4gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlZ2V4O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVnZXggPSBuZXcgUmVnRXhwKHBhdHRlcm4sIGZsYWdzKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQ2FsbGluZyByZWdleC5leGVjIGNvbnNlY3V0aXZlbHkgb24gdGhlIHNhbWUgaW5wdXQgdXNlcyB0aGUgbGFzdEluZGV4IHRvIHN0YXJ0IHRoZSBuZXh0IG1hdGNoLlxuICAgICAgICAgICAgICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMoaW5wdXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaCAhPSBudWxsXG4gICAgICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihtYXRjaClcbiAgICAgICAgICAgICAgICAgICAgOiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5tYXRjaGVzID0gbWF0Y2hlcztcbiAgICBmdW5jdGlvbiBnZW5lcmF0ZShmYWN0b3J5LCBjb3VudCA9IEluZmluaXR5KSB7XG4gICAgICAgIGlmICghZmFjdG9yeSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJmYWN0b3J5XCIpO1xuICAgICAgICBpZiAoaXNOYU4oY291bnQpIHx8IGNvdW50IDw9IDApXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICByZXR1cm4gaXNGaW5pdGUoY291bnQpICYmIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpXG4gICAgICAgICAgICA/IG5ldyBGaW5pdGVFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYyA9IGNvdW50O1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWZhY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50IDwgYyAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKGZhY3RvcnkoY3VycmVudCkpO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5ID0gTlVMTDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZmFjdG9yeShpbmRleCsrKSk7XG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmFjdG9yeSA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xuICAgIHZhciByYW5kb207XG4gICAgKGZ1bmN0aW9uIChyYW5kb20pIHtcbiAgICAgICAgZnVuY3Rpb24gZmxvYXRzKG1heEV4Y2x1c2l2ZSA9IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZShSYW5kb20uZ2VuZXJhdGUobWF4RXhjbHVzaXZlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmFuZG9tLmZsb2F0cyA9IGZsb2F0cztcbiAgICAgICAgZnVuY3Rpb24gaW50ZWdlcnMoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlKFJhbmRvbS5nZW5lcmF0ZS5pbnRlZ2Vycyhib3VuZGFyeSwgaW5jbHVzaXZlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmFuZG9tLmludGVnZXJzID0gaW50ZWdlcnM7XG4gICAgfSkocmFuZG9tID0gRW51bWVyYWJsZS5yYW5kb20gfHwgKEVudW1lcmFibGUucmFuZG9tID0ge30pKTtcbiAgICBmdW5jdGlvbiB1bmZvbGQoc2VlZCwgdmFsdWVGYWN0b3J5LCBza2lwU2VlZCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdmFsdWVGYWN0b3J5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImZhY3RvcnlcIik7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgbGV0IGlzRmlyc3Q7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzZWVkO1xuICAgICAgICAgICAgICAgIGlzRmlyc3QgPSAhc2tpcFNlZWQ7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghdmFsdWVGYWN0b3J5KTtcbiAgICAgICAgICAgICAgICBsZXQgaSA9IGluZGV4Kys7XG4gICAgICAgICAgICAgICAgaWYgKGlzRmlyc3QpXG4gICAgICAgICAgICAgICAgICAgIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVGYWN0b3J5KHZhbHVlLCBpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICApO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZUZhY3RvcnkgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS51bmZvbGQgPSB1bmZvbGQ7XG4gICAgZnVuY3Rpb24gZm9yRWFjaChlbnVtZXJhYmxlLCBhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIC8vIFdpbGwgcHJvcGVybHkgZGlzcG9zZSBjcmVhdGVkIGVudW1lcmFibGUuXG4gICAgICAgIC8vIFdpbGwgdGhyb3cgaWYgZW51bWVyYWJsZSBpcyBlbmRsZXNzLlxuICAgICAgICByZXR1cm4gZW51bVV0aWwuZm9yRWFjaChlbnVtZXJhYmxlLCBhY3Rpb24sIG1heCk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZm9yRWFjaCA9IGZvckVhY2g7XG4gICAgZnVuY3Rpb24gbWFwKGVudW1lcmFibGUsIHNlbGVjdG9yKSB7XG4gICAgICAgIC8vIFdpbGwgcHJvcGVybHkgZGlzcG9zZSBjcmVhdGVkIGVudW1lcmFibGUuXG4gICAgICAgIC8vIFdpbGwgdGhyb3cgaWYgZW51bWVyYWJsZSBpcyBlbmRsZXNzLlxuICAgICAgICByZXR1cm4gZW51bVV0aWwubWFwKGVudW1lcmFibGUsIHNlbGVjdG9yKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5tYXAgPSBtYXA7XG4gICAgLy8gU2xpZ2h0bHkgb3B0aW1pemVkIHZlcnNpb25zIGZvciBudW1iZXJzLlxuICAgIGZ1bmN0aW9uIG1heCh2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgdiA9IHZhbHVlc1xuICAgICAgICAgICAgLnRha2VVbnRpbCh2ID0+IHYgPT0gK0luZmluaXR5LCB0cnVlKVxuICAgICAgICAgICAgLmFnZ3JlZ2F0ZShGdW5jdGlvbnMuR3JlYXRlcik7XG4gICAgICAgIHJldHVybiB2ID09PSBWT0lEMCA/IE5hTiA6IHY7XG4gICAgfVxuICAgIEVudW1lcmFibGUubWF4ID0gbWF4O1xuICAgIGZ1bmN0aW9uIG1pbih2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgdiA9IHZhbHVlc1xuICAgICAgICAgICAgLnRha2VVbnRpbCh2ID0+IHYgPT0gLUluZmluaXR5LCB0cnVlKVxuICAgICAgICAgICAgLmFnZ3JlZ2F0ZShGdW5jdGlvbnMuTGVzc2VyKTtcbiAgICAgICAgcmV0dXJuIHYgPT09IFZPSUQwID8gTmFOIDogdjtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5taW4gPSBtaW47XG4gICAgLyoqXG4gICAgICogVGFrZXMgYW55IHNldCBvZiBjb2xsZWN0aW9ucyBvZiB0aGUgc2FtZSB0eXBlIGFuZCB3ZWF2ZXMgdGhlbSB0b2dldGhlci5cbiAgICAgKiBAcGFyYW0gZW51bWVyYWJsZXNcbiAgICAgKiBAcmV0dXJucyB7RW51bWVyYWJsZTxUPn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3ZWF2ZShlbnVtZXJhYmxlcykge1xuICAgICAgICBpZiAoIWVudW1lcmFibGVzKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignZW51bWVyYWJsZXMnKTtcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHF1ZXVlO1xuICAgICAgICAgICAgbGV0IG1haW5FbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcXVldWUgPSBuZXcgUXVldWUoKTtcbiAgICAgICAgICAgICAgICBtYWluRW51bWVyYXRvciA9IGVudW1VdGlsLmZyb20oZW51bWVyYWJsZXMpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGxldCBlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyBGaXJzdCBwYXNzLi4uXG4gICAgICAgICAgICAgICAgaWYgKG1haW5FbnVtZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghZSAmJiBtYWluRW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IG1haW5FbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBlID0gbmV4dEVudW1lcmF0b3IocXVldWUsIGMgPyBlbnVtVXRpbC5mcm9tKGMpIDogTlVMTCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkVudW1lcmF0b3IgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoIWUgJiYgcXVldWUudHJ5RGVxdWV1ZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBuZXh0RW51bWVyYXRvcihxdWV1ZSwgZW51bVV0aWwuZnJvbSh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH0pKSB7IH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZVxuICAgICAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oZS5jdXJyZW50KVxuICAgICAgICAgICAgICAgICAgICA6IHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwb3NlLnRoZXNlLm5vQ29weShxdWV1ZS5kdW1wKCkpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IE5VTEw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtYWluRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgbWFpbkVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIG1haW5FbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLndlYXZlID0gd2VhdmU7XG59KShFbnVtZXJhYmxlIHx8IChFbnVtZXJhYmxlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEVudW1lcmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MaW5xLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9MaW5xLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5jb25zdCBOQU1FID0gJ0V4Y2VwdGlvbic7XG4vKipcbiAqIFJlcHJlc2VudHMgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIGFwcGxpY2F0aW9uIGV4ZWN1dGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbiB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIEV4Y2VwdGlvbiBjbGFzcyB3aXRoIGEgc3BlY2lmaWVkIGVycm9yIG1lc3NhZ2UgYW5kIG9wdGlvbmFsbHkgYSByZWZlcmVuY2UgdG8gdGhlIGlubmVyIGV4Y2VwdGlvbiB0aGF0IGlzIHRoZSBjYXVzZSBvZiB0aGlzIGV4Y2VwdGlvbi5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSBpbm5lckV4Y2VwdGlvblxuICAgICAqIEBwYXJhbSBiZWZvcmVTZWFsaW5nIFRoaXMgZGVsZWdhdGUgaXMgdXNlZCB0byBhbGxvdyBhY3Rpb25zIHRvIG9jY3VyIGp1c3QgYmVmb3JlIHRoaXMgY29uc3RydWN0b3IgZmluaXNoZXMuICBTaW5jZSBzb21lIGNvbXBpbGVycyBkbyBub3QgYWxsb3cgdGhlIHVzZSBvZiAndGhpcycgYmVmb3JlIHN1cGVyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGlubmVyRXhjZXB0aW9uLCBiZWZvcmVTZWFsaW5nKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICB0aGlzLm5hbWUgPSBfLmdldE5hbWUoKTtcbiAgICAgICAgdGhpcy5kYXRhID0ge307XG4gICAgICAgIGlmIChpbm5lckV4Y2VwdGlvbilcbiAgICAgICAgICAgIF8uZGF0YVsnaW5uZXJFeGNlcHRpb24nXSA9IGlubmVyRXhjZXB0aW9uO1xuICAgICAgICAvKiBPcmlnaW5hbGx5IGludGVuZGVkIHRvIHVzZSAnZ2V0JyBhY2Nlc3NvcnMgZm9yIHByb3BlcnRpZXMsXG4gICAgICAgICAqIEJ1dCBkZWJ1Z2dlcnMgZG9uJ3QgZGlzcGxheSB0aGVzZSByZWFkaWx5IHlldC5cbiAgICAgICAgICogT2JqZWN0LmZyZWV6ZSBoYXMgdG8gYmUgdXNlZCBjYXJlZnVsbHksIGJ1dCB3aWxsIHByZXZlbnQgb3ZlcnJpZGluZyB2YWx1ZXMgYXQgcnVudGltZS5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChiZWZvcmVTZWFsaW5nKVxuICAgICAgICAgICAgYmVmb3JlU2VhbGluZyhfKTtcbiAgICAgICAgLy8gTm9kZSBoYXMgYSAuc3RhY2ssIGxldCdzIHVzZSBpdC4uLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHN0YWNrID0gZXZhbChcIm5ldyBFcnJvcigpXCIpLnN0YWNrO1xuICAgICAgICAgICAgc3RhY2sgPSBzdGFja1xuICAgICAgICAgICAgICAgICYmIHN0YWNrXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eRXJyb3JcXG4vLCAnJylcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLygufFxcbikrXFxzK2F0IG5ldy4rLywgJycpXG4gICAgICAgICAgICAgICAgfHwgJyc7XG4gICAgICAgICAgICB0aGlzLnN0YWNrID0gXy50b1N0cmluZ1dpdGhvdXRCcmFja2V0cygpICsgc3RhY2s7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGV4KSB7IH1cbiAgICAgICAgT2JqZWN0LmZyZWV6ZShfKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIHR5cGUuXG4gICAgICogVGhlIGRlZmF1bHQgaXMgJ0Vycm9yJy5cbiAgICAgKi9cbiAgICBnZXROYW1lKCkgeyByZXR1cm4gTkFNRTsgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIEV4Y2VwdGlvbiBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGBbJHt0aGlzLnRvU3RyaW5nV2l0aG91dEJyYWNrZXRzKCl9XWA7XG4gICAgfVxuICAgIHRvU3RyaW5nV2l0aG91dEJyYWNrZXRzKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgbSA9IF8ubWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIF8ubmFtZSArIChtID8gKCc6ICcgKyBtKSA6ICcnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBkYXRhIG9iamVjdC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICBmb3IgKGxldCBrIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGspKVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2tdO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgKiBhcyBWYWx1ZXMgZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbi8qICB2YWxpZGF0ZVNpemU6IFV0aWxpdHkgZm9yIHF1aWNrIHZhbGlkYXRpb24vaW52YWxpZGF0aW9uIG9mIGFycmF5IGVxdWFsaXR5LlxuICAgIFdoeSB0aGlzIHdheT8gIFdoeSBub3QgcGFzcyBhIGNsb3N1cmUgZm9yIHRoZSBsYXN0IHJldHVybj9cbiAgICBSZWFzb246IFBlcmZvcm1hbmNlIGFuZCBhdm9pZGluZyB0aGUgY3JlYXRpb24gb2YgbmV3IGZ1bmN0aW9ucy9jbG9zdXJlcy4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlU2l6ZShhLCBiKSB7XG4gICAgLy8gQm90aCB2YWxpZCBhbmQgYXJlIHNhbWUgb2JqZWN0LCBvciBib3RoIGFyZSBudWxsL3VuZGVmaW5lZC5cbiAgICBpZiAoYSAmJiBiICYmIGEgPT09IGIgfHwgIWEgJiYgIWIpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vIEF0IHRoaXMgcG9pbnQsIGF0IGxlYXN0IG9uZSBoYXMgdG8gYmUgbm9uLW51bGwuXG4gICAgaWYgKCFhIHx8ICFiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgbGVuID0gYS5sZW5ndGg7XG4gICAgaWYgKGxlbiAhPT0gYi5sZW5ndGgpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAvLyBJZiBib3RoIGFyZSBhcnJheXMgYW5kIGhhdmUgemVybyBsZW5ndGgsIHRoZXkgYXJlIGVxdWFsLlxuICAgIGlmIChsZW4gPT09IDApXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vIFJldHVybiB0aGUgbGVuZ3RoIGZvciBkb3duc3RyZWFtIHByb2Nlc3NpbmcuXG4gICAgcmV0dXJuIGxlbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcmVBbGxFcXVhbChhcnJheXMsIHN0cmljdCA9IHRydWUsIGVxdWFsaXR5Q29tcGFyZXIgPSBWYWx1ZXMuYXJlRXF1YWwpIHtcbiAgICBpZiAoIWFycmF5cylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnROdWxsRXhjZXB0aW9uOiAnYXJyYXlzJyBjYW5ub3QgYmUgbnVsbC5cIik7XG4gICAgaWYgKGFycmF5cy5sZW5ndGggPCAyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY29tcGFyZSBhIHNldCBvZiBhcnJheXMgbGVzcyB0aGFuIDIuXCIpO1xuICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oc3RyaWN0KSkge1xuICAgICAgICBlcXVhbGl0eUNvbXBhcmVyID0gc3RyaWN0O1xuICAgICAgICBzdHJpY3QgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBmaXJzdCA9IGFycmF5c1swXTtcbiAgICBmb3IgKGxldCBpID0gMSwgbCA9IGFycmF5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKCFhcmVFcXVhbChmaXJzdCwgYXJyYXlzW2ldLCBzdHJpY3QsIGVxdWFsaXR5Q29tcGFyZXIpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcmVFcXVhbChhLCBiLCBzdHJpY3QgPSB0cnVlLCBlcXVhbGl0eUNvbXBhcmVyID0gVmFsdWVzLmFyZUVxdWFsKSB7XG4gICAgY29uc3QgbGVuID0gdmFsaWRhdGVTaXplKGEsIGIpO1xuICAgIGlmIChUeXBlLmlzQm9vbGVhbihsZW4pKVxuICAgICAgICByZXR1cm4gbGVuO1xuICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oc3RyaWN0KSkge1xuICAgICAgICBlcXVhbGl0eUNvbXBhcmVyID0gc3RyaWN0O1xuICAgICAgICBzdHJpY3QgPSB0cnVlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICghZXF1YWxpdHlDb21wYXJlcihhW2ldLCBiW2ldLCBzdHJpY3QpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGludGVybmFsU29ydChhLCBjb21wYXJlcikge1xuICAgIGlmICghYSB8fCBhLmxlbmd0aCA8IDIpXG4gICAgICAgIHJldHVybiBhO1xuICAgIGNvbnN0IGxlbiA9IGEubGVuZ3RoO1xuICAgIGxldCBiO1xuICAgIGlmIChsZW4gPiA2NTUzNilcbiAgICAgICAgYiA9IG5ldyBBcnJheShsZW4pO1xuICAgIGVsc2Uge1xuICAgICAgICBiID0gW107XG4gICAgICAgIGIubGVuZ3RoID0gbGVuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGJbaV0gPSBhW2ldO1xuICAgIH1cbiAgICBiLnNvcnQoY29tcGFyZXIpO1xuICAgIHJldHVybiBiO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFyZUVxdWl2YWxlbnQoYSwgYiwgY29tcGFyZXIgPSBWYWx1ZXMuY29tcGFyZSkge1xuICAgIGNvbnN0IGxlbiA9IHZhbGlkYXRlU2l6ZShhLCBiKTtcbiAgICBpZiAoVHlwZS5pc0Jvb2xlYW4obGVuKSlcbiAgICAgICAgcmV0dXJuIGxlbjtcbiAgICAvLyBUaGVyZSBtaWdodCBiZSBhIGJldHRlciBtb3JlIHBlcmZvcm1hbnQgd2F5IHRvIGRvIHRoaXMsIGJ1dCBmb3IgdGhlIG1vbWVudCwgdGhpc1xuICAgIC8vIHdvcmtzIHF1aXRlIHdlbGwuXG4gICAgYSA9IGludGVybmFsU29ydChhLCBjb21wYXJlcik7XG4gICAgYiA9IGludGVybmFsU29ydChiLCBjb21wYXJlcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoY29tcGFyZXIoYVtpXSwgYltpXSkgIT09IDApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tcGFyZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L0NvbXBhcmUuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFRhc2tIYW5kbGVyQmFzZSB9IGZyb20gXCIuL1Rhc2tIYW5kbGVyQmFzZVwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmV4cG9ydCBjbGFzcyBUYXNrSGFuZGxlciBleHRlbmRzIFRhc2tIYW5kbGVyQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX2FjdGlvbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hY3Rpb24gPSBfYWN0aW9uO1xuICAgICAgICBpZiAoIV9hY3Rpb24pXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhY3Rpb24nKTtcbiAgICB9XG4gICAgX29uRXhlY3V0ZSgpIHtcbiAgICAgICAgdGhpcy5fYWN0aW9uKCk7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fYWN0aW9uID0gbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBUYXNrSGFuZGxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhc2tIYW5kbGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vVGhyZWFkaW5nL1Rhc2tzL1Rhc2tIYW5kbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSBcIlRhc2tIYW5kbGVyQmFzZVwiO1xuLyoqXG4gKiBBIHNpbXBsZSBjbGFzcyBmb3IgaGFuZGxpbmcgcG90ZW50aWFsbHkgcmVwZWF0ZWQgZXhlY3V0aW9ucyBlaXRoZXIgZGVmZXJyZWQgb3IgaW1tZWRpYXRlLlxuICovXG5leHBvcnQgY2xhc3MgVGFza0hhbmRsZXJCYXNlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IE5BTUU7XG4gICAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IDAgLyogQ3JlYXRlZCAqLztcbiAgICB9XG4gICAgZ2V0IGlzU2NoZWR1bGVkKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl90aW1lb3V0SWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjaGVkdWxlcy9SZXNjaGVkdWxlcyB0cmlnZ2VyaW5nIHRoZSB0YXNrLlxuICAgICAqIEBwYXJhbSBkZWZlciBPcHRpb25hbCB0aW1lIHRvIHdhaXQgdW50aWwgdHJpZ2dlcmluZy5cbiAgICAgKi9cbiAgICBzdGFydChkZWZlciA9IDApIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gMSAvKiBXYWl0aW5nVG9SdW4gKi87XG4gICAgICAgIGlmICghKGRlZmVyID4gMCkpXG4gICAgICAgICAgICBkZWZlciA9IDA7IC8vIEEgbmVnYXRpb24gaXMgdXNlZCB0byBjYXRjaCBlZGdlIGNhc2VzLlxuICAgICAgICBpZiAoaXNGaW5pdGUoZGVmZXIpKVxuICAgICAgICAgICAgdGhpcy5fdGltZW91dElkID0gc2V0VGltZW91dChUYXNrSGFuZGxlckJhc2UuX2hhbmRsZXIsIGRlZmVyLCB0aGlzKTtcbiAgICB9XG4gICAgcnVuU3luY2hyb25vdXNseSgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgVGFza0hhbmRsZXJCYXNlLl9oYW5kbGVyKHRoaXMpO1xuICAgIH1cbiAgICBnZXRTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXM7XG4gICAgfVxuICAgIGdldCBzdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YXR1cygpO1xuICAgIH1cbiAgICAvLyBVc2UgYSBzdGF0aWMgZnVuY3Rpb24gaGVyZSB0byBhdm9pZCByZWNyZWF0aW5nIGEgbmV3IGZ1bmN0aW9uIGV2ZXJ5IHRpbWUuXG4gICAgc3RhdGljIF9oYW5kbGVyKGQpIHtcbiAgICAgICAgZC5jYW5jZWwoKTtcbiAgICAgICAgZC5fc3RhdHVzID0gMiAvKiBSdW5uaW5nICovO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZC5fb25FeGVjdXRlKCk7XG4gICAgICAgICAgICBkLl9zdGF0dXMgPSAzIC8qIFJhblRvQ29tcGxldGlvbiAqLztcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIGQuX3N0YXR1cyA9IDUgLyogRmF1bHRlZCAqLztcbiAgICAgICAgfVxuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLl9zdGF0dXMgPSBudWxsO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5fdGltZW91dElkO1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0SWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHVzID0gNCAvKiBDYW5jZWxsZWQgKi87XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVGFza0hhbmRsZXJCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFza0hhbmRsZXJCYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vVGhyZWFkaW5nL1Rhc2tzL1Rhc2tIYW5kbGVyQmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBPcmlnaW5hbDogaHR0cDovL2xpbnFqcy5jb2RlcGxleC5jb20vXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgYXJlRXF1YWwgfSBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IExpbmtlZE5vZGVMaXN0IH0gZnJvbSBcIi4uL0xpbmtlZE5vZGVMaXN0XCI7XG5pbXBvcnQgeyBPYmplY3RQb29sIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvT2JqZWN0UG9vbFwiO1xuaW1wb3J0IHsgZ2V0SWRlbnRpZmllciB9IGZyb20gXCIuL2dldElkZW50aWZpZXJcIjtcbmltcG9ydCBEaWN0aW9uYXJ5QmFzZSBmcm9tIFwiLi9EaWN0aW9uYXJ5QmFzZVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbi8vIExpbmtlZExpc3QgZm9yIERpY3Rpb25hcnlcbmNsYXNzIEhhc2hFbnRyeSB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCB2YWx1ZSwgcHJldmlvdXMsIG5leHQpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcmV2aW91cyA9IHByZXZpb3VzO1xuICAgICAgICB0aGlzLm5leHQgPSBuZXh0O1xuICAgIH1cbn1cbmxldCBsaW5rZWRMaXN0UG9vbDtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5mdW5jdGlvbiBsaW5rZWROb2RlTGlzdChyZWN5Y2xlKSB7XG4gICAgaWYgKCFsaW5rZWRMaXN0UG9vbClcbiAgICAgICAgbGlua2VkTGlzdFBvb2xcbiAgICAgICAgICAgID0gbmV3IE9iamVjdFBvb2woMjAsICgpID0+IG5ldyBMaW5rZWROb2RlTGlzdCgpLCByID0+IHIuY2xlYXIoKSk7XG4gICAgaWYgKCFyZWN5Y2xlKVxuICAgICAgICByZXR1cm4gbGlua2VkTGlzdFBvb2wudGFrZSgpO1xuICAgIGxpbmtlZExpc3RQb29sLmFkZChyZWN5Y2xlKTtcbn1cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5IGV4dGVuZHMgRGljdGlvbmFyeUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9rZXlHZW5lcmF0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fa2V5R2VuZXJhdG9yID0gX2tleUdlbmVyYXRvcjtcbiAgICAgICAgdGhpcy5fZW50cmllcyA9IGxpbmtlZE5vZGVMaXN0KCk7XG4gICAgICAgIHRoaXMuX2J1Y2tldHMgPSB7fTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fZW50cmllcyA9IG51bGw7XG4gICAgICAgIF8uX2J1Y2tldHMgPSBudWxsO1xuICAgICAgICBfLl9oYXNoR2VuZXJhdG9yID0gbnVsbDtcbiAgICB9XG4gICAgZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbnRyaWVzICYmIHRoaXMuX2VudHJpZXMudW5zYWZlQ291bnQgfHwgMDtcbiAgICB9XG4gICAgX2dldEJ1Y2tldChoYXNoLCBjcmVhdGVJZk1pc3NpbmcpIHtcbiAgICAgICAgaWYgKGhhc2ggPT0gbnVsbCB8fCAhY3JlYXRlSWZNaXNzaW5nICYmICF0aGlzLmdldENvdW50KCkpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCFUeXBlLmlzUHJpbWl0aXZlT3JTeW1ib2woaGFzaCkpXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJLZXkgdHlwZSBub3QgaW5kZXhhYmxlIGFuZCBjb3VsZCBjYXVzZSBEaWN0aW9uYXJ5IHRvIGJlIGV4dHJlbWVseSBzbG93LlwiKTtcbiAgICAgICAgY29uc3QgYnVja2V0cyA9IHRoaXMuX2J1Y2tldHM7XG4gICAgICAgIGxldCBidWNrZXQgPSBidWNrZXRzW2hhc2hdO1xuICAgICAgICBpZiAoY3JlYXRlSWZNaXNzaW5nICYmICFidWNrZXQpXG4gICAgICAgICAgICBidWNrZXRzW2hhc2hdXG4gICAgICAgICAgICAgICAgPSBidWNrZXRcbiAgICAgICAgICAgICAgICAgICAgPSBsaW5rZWROb2RlTGlzdCgpO1xuICAgICAgICByZXR1cm4gYnVja2V0IHx8IG51bGw7XG4gICAgfVxuICAgIF9nZXRCdWNrZXRFbnRyeShrZXksIGhhc2gsIGJ1Y2tldCkge1xuICAgICAgICBpZiAoa2V5ID09IG51bGwgfHwgIXRoaXMuZ2V0Q291bnQoKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBfID0gdGhpcywgY29tcGFyZXIgPSBfLl9rZXlHZW5lcmF0b3IsIGNvbXBhcmVLZXkgPSBjb21wYXJlciA/IGNvbXBhcmVyKGtleSkgOiBrZXk7XG4gICAgICAgIGlmICghYnVja2V0KVxuICAgICAgICAgICAgYnVja2V0ID0gXy5fZ2V0QnVja2V0KGhhc2ggfHwgZ2V0SWRlbnRpZmllcihjb21wYXJlS2V5KSk7XG4gICAgICAgIHJldHVybiBidWNrZXRcbiAgICAgICAgICAgICYmIChjb21wYXJlclxuICAgICAgICAgICAgICAgID8gYnVja2V0LmZpbmQoZSA9PiBjb21wYXJlcihlLmtleSkgPT09IGNvbXBhcmVLZXkpXG4gICAgICAgICAgICAgICAgOiBidWNrZXQuZmluZChlID0+IGUua2V5ID09PSBjb21wYXJlS2V5KSk7XG4gICAgfVxuICAgIF9nZXRFbnRyeShrZXkpIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuX2dldEJ1Y2tldEVudHJ5KGtleSk7XG4gICAgICAgIHJldHVybiBlICYmIGUudmFsdWU7XG4gICAgfVxuICAgIGdldFZhbHVlKGtleSkge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZ2V0RW50cnkoa2V5KTtcbiAgICAgICAgcmV0dXJuIGUgPyBlLnZhbHVlIDogVk9JRDA7XG4gICAgfVxuICAgIF9zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGJ1Y2tldHMgPSBfLl9idWNrZXRzLCBlbnRyaWVzID0gXy5fZW50cmllcywgY29tcGFyZUtleSA9IF8uX2tleUdlbmVyYXRvciA/IF8uX2tleUdlbmVyYXRvcihrZXkpIDoga2V5LCBoYXNoID0gZ2V0SWRlbnRpZmllcihjb21wYXJlS2V5KTtcbiAgICAgICAgbGV0IGJ1Y2tldCA9IF8uX2dldEJ1Y2tldChoYXNoKTtcbiAgICAgICAgY29uc3QgYnVja2V0RW50cnkgPSBidWNrZXQgJiYgXy5fZ2V0QnVja2V0RW50cnkoa2V5LCBoYXNoLCBidWNrZXQpO1xuICAgICAgICAvLyBFbnRyeSBleGl0cz8gRGVsZXRlIG9yIHVwZGF0ZVxuICAgICAgICBpZiAoYnVja2V0RW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBidWNrZXQ7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFZPSUQwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHggPSBiLnJlbW92ZU5vZGUoYnVja2V0RW50cnkpLCB5ID0gZW50cmllcy5yZW1vdmVOb2RlKGJ1Y2tldEVudHJ5LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoeCAmJiAhYi5jb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYnVja2V0c1toYXNoXTtcbiAgICAgICAgICAgICAgICAgICAgbGlua2VkTm9kZUxpc3QoYik7XG4gICAgICAgICAgICAgICAgICAgIGJ1Y2tldCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh4ICE9PSB5KVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkVudHJpZXMgYW5kIGJ1Y2tldHMgYXJlIG91dCBvZiBzeW5jLlwiO1xuICAgICAgICAgICAgICAgIGlmICh4KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IGV4cG9zZSB0aGUgaW50ZXJuYWwgaGFzaCBlbnRyaWVzIHNvIHJlcGxhY2luZyB0aGUgdmFsdWUgaXMgb2suXG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkID0gYnVja2V0RW50cnkudmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgYnVja2V0RW50cnkudmFsdWUudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWFyZUVxdWFsKHZhbHVlLCBvbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9PSBWT0lEMCkge1xuICAgICAgICAgICAgaWYgKCFidWNrZXQpXG4gICAgICAgICAgICAgICAgYnVja2V0ID0gXy5fZ2V0QnVja2V0KGhhc2gsIHRydWUpO1xuICAgICAgICAgICAgaWYgKCFidWNrZXQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7aGFzaH1cIiBjYW5ub3QgYmUgYWRkZWQgdG8gbG9va3VwIHRhYmxlLmApO1xuICAgICAgICAgICAgbGV0IGVudHJ5ID0gbmV3IEhhc2hFbnRyeShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGVudHJpZXMuYWRkTm9kZShlbnRyeSk7XG4gICAgICAgICAgICBidWNrZXQuYWRkTm9kZShuZXcgSGFzaEVudHJ5KGtleSwgZW50cnkpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgX2NsZWFySW50ZXJuYWwoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBidWNrZXRzID0gXy5fYnVja2V0cztcbiAgICAgICAgLy8gRW5zdXJlIHJlc2V0IGFuZCBjbGVhbi4uLlxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYnVja2V0cykge1xuICAgICAgICAgICAgaWYgKGJ1Y2tldHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGxldCBidWNrZXQgPSBidWNrZXRzW2tleV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIGJ1Y2tldHNba2V5XTtcbiAgICAgICAgICAgICAgICBsaW5rZWROb2RlTGlzdChidWNrZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLl9lbnRyaWVzLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qXG4gICAgICogTm90ZTogc3VwZXIuZ2V0RW51bWVyYXRvcigpIHdvcmtzIHBlcmZlY3RseSB3ZWxsLFxuICAgICAqIGJ1dCBlbnVtZXJhdGluZyB0aGUgaW50ZXJuYWwgbGlua2VkIG5vZGUgbGlzdCBpcyBtdWNoIG1vcmUgZWZmaWNpZW50LlxuICAgICAqL1xuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgdmVyLCBjdXJyZW50RW50cnk7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHZlciA9IF8uX3ZlcnNpb247XG4gICAgICAgICAgICBjdXJyZW50RW50cnkgPSBfLl9lbnRyaWVzLmZpcnN0O1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRFbnRyeSkge1xuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcik7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyBrZXk6IGN1cnJlbnRFbnRyeS5rZXksIHZhbHVlOiBjdXJyZW50RW50cnkudmFsdWUgfTtcbiAgICAgICAgICAgICAgICBjdXJyZW50RW50cnkgPSBjdXJyZW50RW50cnkubmV4dCB8fCBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRLZXlzKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBlID0gXy5fZW50cmllcyAmJiBfLl9lbnRyaWVzLmZpcnN0O1xuICAgICAgICB3aGlsZSAoZSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goZS5rZXkpO1xuICAgICAgICAgICAgZSA9IGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBnZXRWYWx1ZXMoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IGUgPSBfLl9lbnRyaWVzICYmIF8uX2VudHJpZXMuZmlyc3Q7XG4gICAgICAgIHdoaWxlIChlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChlLnZhbHVlKTtcbiAgICAgICAgICAgIGUgPSBlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBEaWN0aW9uYXJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGljdGlvbmFyeS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9EaWN0aW9uYXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tIFwiLi4vVGV4dC9VdGlsaXR5XCI7XG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSU1QT1JUQU5UIE5PVEVTIEFCT1VUIFBFUkZPUk1BTkNFOlxuICogaHR0cDovL2pzcGVyZi5jb20vc2ltdWxhdGluZy1hLXF1ZXVlXG4gKlxuICogQWRkaW5nIHRvIGFuIGFycmF5IGlzIHZlcnkgZmFzdCwgYnV0IG1vZGlmeWluZyBpcyBzbG93LlxuICogTGlua2VkTGlzdCB3aW5zIHdoZW4gbW9kaWZ5aW5nIGNvbnRlbnRzLlxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjY4ODQvYXJyYXktdmVyc3VzLWxpbmtlZC1saXN0XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZnVsIGZvciBtYW5hZ2luZyBhIGxpc3Qgb2YgbGlua2VkIG5vZGVzLCBidXQgaXQgZG9lcyBub3QgcHJvdGVjdCBhZ2FpbnN0IG1vZGlmeWluZyBpbmRpdmlkdWFsIGxpbmtzLlxuICogSWYgdGhlIGNvbnN1bWVyIG1vZGlmaWVzIGEgbGluayAoc2V0cyB0aGUgcHJldmlvdXMgb3IgbmV4dCB2YWx1ZSkgaXQgd2lsbCBlZmZlY3RpdmVseSBicmVhayB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBJdCBpcyBwb3NzaWJsZSB0byBkZWNsYXJlIGEgbm9kZSB0eXBlIG9mIGFueSBraW5kIGFzIGxvbmcgYXMgaXQgY29udGFpbnMgYSBwcmV2aW91cyBhbmQgbmV4dCB2YWx1ZSB0aGF0IGNhbiByZWZlcmVuY2UgYW5vdGhlciBub2RlLlxuICogQWx0aG91Z2ggbm90IGFzIHNhZmUgYXMgdGhlIGluY2x1ZGVkIExpbmtlZExpc3QsIHRoaXMgY2xhc3MgaGFzIGxlc3Mgb3ZlcmhlYWQgYW5kIGlzIG1vcmUgZmxleGlibGUuXG4gKlxuICogVGhlIGNvdW50IChvciBsZW5ndGgpIG9mIHRoaXMgTGlua2VkTm9kZUxpc3QgaXMgbm90IHRyYWNrZWQgc2luY2UgaXQgY291bGQgYmUgY29ycnVwdGVkIGF0IGFueSB0aW1lLlxuICovXG5leHBvcnQgY2xhc3MgTGlua2VkTm9kZUxpc3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9maXJzdCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhc3QgPSBudWxsO1xuICAgICAgICB0aGlzLnVuc2FmZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IDA7XG4gICAgfVxuICAgIGFzc2VydFZlcnNpb24odmVyc2lvbikge1xuICAgICAgICBpZiAodmVyc2lvbiAhPT0gdGhpcy5fdmVyc2lvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ29sbGVjdGlvbiB3YXMgbW9kaWZpZWQuXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGZpcnN0IG5vZGUuICBXaWxsIGJlIG51bGwgaWYgdGhlIGNvbGxlY3Rpb24gaXMgZW1wdHkuXG4gICAgICovXG4gICAgZ2V0IGZpcnN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBsYXN0IG5vZGUuXG4gICAgICovXG4gICAgZ2V0IGxhc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJdGVyYXRpdmVseSBjb3VudHMgdGhlIG51bWJlciBvZiBsaW5rZWQgbm9kZXMgYW5kIHJldHVybnMgdGhlIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvdW50KCkge1xuICAgICAgICBsZXQgbmV4dCA9IHRoaXMuX2ZpcnN0O1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dC5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgICBmb3JFYWNoKGFjdGlvbiwgaWdub3JlVmVyc2lvbmluZykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBudWxsLCBuZXh0ID0gXy5maXJzdDsgLy8gQmUgc3VyZSB0byB0cmFjayB0aGUgbmV4dCBub2RlIHNvIGlmIGN1cnJlbnQgbm9kZSBpcyByZW1vdmVkLlxuICAgICAgICBjb25zdCB2ZXJzaW9uID0gXy5fdmVyc2lvbjtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKCFpZ25vcmVWZXJzaW9uaW5nKVxuICAgICAgICAgICAgICAgIF8uYXNzZXJ0VmVyc2lvbih2ZXJzaW9uKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgICAgICAgICAgbmV4dCA9IGN1cnJlbnQgJiYgY3VycmVudC5uZXh0O1xuICAgICAgICB9IHdoaWxlIChjdXJyZW50XG4gICAgICAgICAgICAmJiBhY3Rpb24oY3VycmVudCwgaW5kZXgrKykgIT09IGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICBtYXAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKCFzZWxlY3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ3NlbGVjdG9yJyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICB0aGlzLmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNlbGVjdG9yKG5vZGUsIGkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVyYXNlcyB0aGUgbGlua2VkIG5vZGUncyByZWZlcmVuY2VzIHRvIGVhY2ggb3RoZXIgYW5kIHJldHVybnMgdGhlIG51bWJlciBvZiBub2Rlcy5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IG4sIGNGID0gMCwgY0wgPSAwO1xuICAgICAgICAvLyBGaXJzdCwgY2xlYXIgaW4gdGhlIGZvcndhcmQgZGlyZWN0aW9uLlxuICAgICAgICBuID0gXy5fZmlyc3Q7XG4gICAgICAgIF8uX2ZpcnN0ID0gbnVsbDtcbiAgICAgICAgd2hpbGUgKG4pIHtcbiAgICAgICAgICAgIGNGKys7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IG47XG4gICAgICAgICAgICBuID0gbi5uZXh0O1xuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBMYXN0LCBjbGVhciBpbiB0aGUgcmV2ZXJzZSBkaXJlY3Rpb24uXG4gICAgICAgIG4gPSBfLl9sYXN0O1xuICAgICAgICBfLl9sYXN0ID0gbnVsbDtcbiAgICAgICAgd2hpbGUgKG4pIHtcbiAgICAgICAgICAgIGNMKys7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IG47XG4gICAgICAgICAgICBuID0gbi5wcmV2aW91cztcbiAgICAgICAgICAgIGN1cnJlbnQucHJldmlvdXMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjRiAhPT0gY0wpXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0xpbmtlZE5vZGVMaXN0OiBGb3J3YXJkIHZlcnN1cyByZXZlcnNlIGNvdW50IGRvZXMgbm90IG1hdGNoIHdoZW4gY2xlYXJpbmcuIEZvcndhcmQ6ICcgKyBjRiArIFwiLCBSZXZlcnNlOiBcIiArIGNMKTtcbiAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICBfLnVuc2FmZUNvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIGNGO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGxpc3QuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aGUgbGlzdCB0byBzZWUgaWYgYSBub2RlIGV4aXN0cy5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXhPZihub2RlKSAhPSAtMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaW5kZXggb2YgYSBwYXJ0aWN1bGFyIG5vZGUuXG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICovXG4gICAgZ2V0Tm9kZUF0KGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IG5leHQgPSB0aGlzLl9maXJzdDtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAobmV4dCAmJiBpKysgPCBpbmRleCkge1xuICAgICAgICAgICAgbmV4dCA9IG5leHQubmV4dCB8fCBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgIH1cbiAgICBmaW5kKGNvbmRpdGlvbikge1xuICAgICAgICBsZXQgbm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgobiwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmRpdGlvbihuLCBpKSkge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBuO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aGUgbGlzdCB0byBmaW5kIHRoZSBzcGVjaWZpZWQgbm9kZSBhbmQgcmV0dXJucyBpdHMgaW5kZXguXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpbmRleE9mKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgJiYgKG5vZGUucHJldmlvdXMgfHwgbm9kZS5uZXh0KSkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIGxldCBjLCBuID0gdGhpcy5fZmlyc3Q7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgYyA9IG47XG4gICAgICAgICAgICAgICAgaWYgKGMgPT09IG5vZGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgfSB3aGlsZSAoKG4gPSBjICYmIGMubmV4dCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZmlyc3Qgbm9kZSBhbmQgcmV0dXJucyB0cnVlIGlmIHN1Y2Nlc3NmdWwuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcmVtb3ZlRmlyc3QoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2ZpcnN0ICYmIHRoaXMucmVtb3ZlTm9kZSh0aGlzLl9maXJzdCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGxhc3Qgbm9kZSBhbmQgcmV0dXJucyB0cnVlIGlmIHN1Y2Nlc3NmdWwuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcmVtb3ZlTGFzdCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fbGFzdCAmJiB0aGlzLnJlbW92ZU5vZGUodGhpcy5fbGFzdCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBub2RlLlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBzdWNjZXNzZnVsIGFuZCBmYWxzZSBpZiBub3QgZm91bmQgKGFscmVhZHkgcmVtb3ZlZCkuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ25vZGUnKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHByZXYgPSBub2RlLnByZXZpb3VzIHx8IG51bGwsIG5leHQgPSBub2RlLm5leHQgfHwgbnVsbDtcbiAgICAgICAgbGV0IGEgPSBmYWxzZSwgYiA9IGZhbHNlO1xuICAgICAgICBpZiAocHJldilcbiAgICAgICAgICAgIHByZXYubmV4dCA9IG5leHQ7XG4gICAgICAgIGVsc2UgaWYgKF8uX2ZpcnN0ID09IG5vZGUpXG4gICAgICAgICAgICBfLl9maXJzdCA9IG5leHQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGEgPSB0cnVlO1xuICAgICAgICBpZiAobmV4dClcbiAgICAgICAgICAgIG5leHQucHJldmlvdXMgPSBwcmV2O1xuICAgICAgICBlbHNlIGlmIChfLl9sYXN0ID09IG5vZGUpXG4gICAgICAgICAgICBfLl9sYXN0ID0gcHJldjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYiA9IHRydWU7XG4gICAgICAgIGlmIChhICE9PSBiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oJ25vZGUnLCBmb3JtYXQoXCJQcm92aWRlZCBub2RlIGlzIGhhcyBubyB7MH0gcmVmZXJlbmNlIGJ1dCBpcyBub3QgdGhlIHsxfSBub2RlIVwiLCBhID8gXCJwcmV2aW91c1wiIDogXCJuZXh0XCIsIGEgPyBcImZpcnN0XCIgOiBcImxhc3RcIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlbW92ZWQgPSAhYSAmJiAhYjtcbiAgICAgICAgaWYgKHJlbW92ZWQpIHtcbiAgICAgICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgICAgIF8udW5zYWZlQ291bnQtLTtcbiAgICAgICAgICAgIG5vZGUucHJldmlvdXMgPSBudWxsO1xuICAgICAgICAgICAgbm9kZS5uZXh0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5vZGUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdC5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtMaW5rZWROb2RlTGlzdH1cbiAgICAgKi9cbiAgICBhZGROb2RlKG5vZGUpIHtcbiAgICAgICAgdGhpcy5hZGROb2RlQWZ0ZXIobm9kZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbm9kZSBiZWZvcmUgdGhlIHNwZWNpZmllZCAnYmVmb3JlJyBub2RlLlxuICAgICAqIElmIG5vICdiZWZvcmUnIG5vZGUgaXMgc3BlY2lmaWVkLCBpdCBpbnNlcnRzIGl0IGFzIHRoZSBmaXJzdCBub2RlLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHBhcmFtIGJlZm9yZVxuICAgICAqIEByZXR1cm5zIHtMaW5rZWROb2RlTGlzdH1cbiAgICAgKi9cbiAgICBhZGROb2RlQmVmb3JlKG5vZGUsIGJlZm9yZSA9IG51bGwpIHtcbiAgICAgICAgYXNzZXJ0VmFsaWREZXRhY2hlZChub2RlKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghYmVmb3JlKSB7XG4gICAgICAgICAgICBiZWZvcmUgPSBfLl9maXJzdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmVmb3JlKSB7XG4gICAgICAgICAgICBsZXQgcHJldiA9IGJlZm9yZS5wcmV2aW91cztcbiAgICAgICAgICAgIG5vZGUucHJldmlvdXMgPSBwcmV2O1xuICAgICAgICAgICAgbm9kZS5uZXh0ID0gYmVmb3JlO1xuICAgICAgICAgICAgYmVmb3JlLnByZXZpb3VzID0gbm9kZTtcbiAgICAgICAgICAgIGlmIChwcmV2KVxuICAgICAgICAgICAgICAgIHByZXYubmV4dCA9IG5vZGU7XG4gICAgICAgICAgICBpZiAoYmVmb3JlID09IF8uX2ZpcnN0KVxuICAgICAgICAgICAgICAgIF8uX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gXy5fbGFzdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICBfLnVuc2FmZUNvdW50Kys7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbm9kZSBhZnRlciB0aGUgc3BlY2lmaWVkICdhZnRlcicgbm9kZS5cbiAgICAgKiBJZiBubyAnYWZ0ZXInIG5vZGUgaXMgc3BlY2lmaWVkLCBpdCBhcHBlbmRzIGl0IGFzIHRoZSBsYXN0IG5vZGUuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcGFyYW0gYWZ0ZXJcbiAgICAgKiBAcmV0dXJucyB7TGlua2VkTm9kZUxpc3R9XG4gICAgICovXG4gICAgYWRkTm9kZUFmdGVyKG5vZGUsIGFmdGVyID0gbnVsbCkge1xuICAgICAgICBhc3NlcnRWYWxpZERldGFjaGVkKG5vZGUpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFhZnRlcikge1xuICAgICAgICAgICAgYWZ0ZXIgPSBfLl9sYXN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZnRlcikge1xuICAgICAgICAgICAgbGV0IG5leHQgPSBhZnRlci5uZXh0O1xuICAgICAgICAgICAgbm9kZS5uZXh0ID0gbmV4dDtcbiAgICAgICAgICAgIG5vZGUucHJldmlvdXMgPSBhZnRlcjtcbiAgICAgICAgICAgIGFmdGVyLm5leHQgPSBub2RlO1xuICAgICAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICAgICAgbmV4dC5wcmV2aW91cyA9IG5vZGU7XG4gICAgICAgICAgICBpZiAoYWZ0ZXIgPT0gXy5fbGFzdClcbiAgICAgICAgICAgICAgICBfLl9sYXN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gXy5fbGFzdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICBfLnVuc2FmZUNvdW50Kys7XG4gICAgICAgIHJldHVybiBfO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhbmQgZXhpc3Rpbmcgbm9kZSBhbmQgcmVwbGFjZXMgaXQuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcGFyYW0gcmVwbGFjZW1lbnRcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHJlcGxhY2Uobm9kZSwgcmVwbGFjZW1lbnQpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ25vZGUnKTtcbiAgICAgICAgaWYgKG5vZGUgPT0gcmVwbGFjZW1lbnQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgYXNzZXJ0VmFsaWREZXRhY2hlZChyZXBsYWNlbWVudCwgJ3JlcGxhY2VtZW50Jyk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICByZXBsYWNlbWVudC5wcmV2aW91cyA9IG5vZGUucHJldmlvdXM7XG4gICAgICAgIHJlcGxhY2VtZW50Lm5leHQgPSBub2RlLm5leHQ7XG4gICAgICAgIGlmIChub2RlLnByZXZpb3VzKVxuICAgICAgICAgICAgbm9kZS5wcmV2aW91cy5uZXh0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgIGlmIChub2RlLm5leHQpXG4gICAgICAgICAgICBub2RlLm5leHQucHJldmlvdXMgPSByZXBsYWNlbWVudDtcbiAgICAgICAgaWYgKG5vZGUgPT0gXy5fZmlyc3QpXG4gICAgICAgICAgICBfLl9maXJzdCA9IHJlcGxhY2VtZW50O1xuICAgICAgICBpZiAobm9kZSA9PSBfLl9sYXN0KVxuICAgICAgICAgICAgXy5fbGFzdCA9IHJlcGxhY2VtZW50O1xuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIHJldHVybiBfO1xuICAgIH1cbiAgICBzdGF0aWMgdmFsdWVFbnVtZXJhdG9yRnJvbShsaXN0KSB7XG4gICAgICAgIGlmICghbGlzdClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2xpc3QnKTtcbiAgICAgICAgbGV0IGN1cnJlbnQsIG5leHQsIHZlcnNpb247XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBhbmNob3IuLi5cbiAgICAgICAgICAgIGN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgICAgbmV4dCA9IGxpc3QuZmlyc3Q7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbGlzdC5fdmVyc2lvbjtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgbGlzdC5hc3NlcnRWZXJzaW9uKHZlcnNpb24pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgICAgICAgICAgICAgIG5leHQgPSBjdXJyZW50ICYmIGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBjb3B5VmFsdWVzKGxpc3QsIGFycmF5LCBpbmRleCA9IDApIHtcbiAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5maXJzdCkge1xuICAgICAgICAgICAgaWYgKCFhcnJheSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhcnJheScpO1xuICAgICAgICAgICAgbGlzdC5mb3JFYWNoKChub2RlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaW5kZXggKyBpXSA9IG5vZGUudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzZXJ0VmFsaWREZXRhY2hlZChub2RlLCBwcm9wTmFtZSA9ICdub2RlJykge1xuICAgIGlmIChub2RlID09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24ocHJvcE5hbWUpO1xuICAgIGlmIChub2RlLm5leHQgfHwgbm9kZS5wcmV2aW91cylcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDYW5ub3QgYWRkIGEgbm9kZSB0byBhIExpbmtlZE5vZGVMaXN0IHRoYXQgaXMgYWxyZWFkeSBsaW5rZWQuXCIpO1xufVxuZXhwb3J0IGRlZmF1bHQgTGlua2VkTm9kZUxpc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MaW5rZWROb2RlTGlzdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0xpbmtlZE5vZGVMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmNvbnN0IE5VTEwgPSBcIm51bGxcIiwgR0VUX1NZTUJPTCA9IFwiZ2V0U3ltYm9sXCIsIEdFVF9IQVNIX0NPREUgPSBcImdldEhhc2hDb2RlXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0SWRlbnRpZmllcihvYmosIHRocm93SWZVbmtub3duID0gZmFsc2UpIHtcbiAgICBpZiAoVHlwZS5pc1Byb3BlcnR5S2V5KG9iaikpXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgaWYgKG9iaiA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIE5VTEw7XG4gICAgaWYgKG9iaiA9PT0gVk9JRDApXG4gICAgICAgIHJldHVybiBUeXBlLlVOREVGSU5FRDtcbiAgICAvLyBTZWUgSVN5bWJvbGl6YWJsZS5cbiAgICBpZiAoVHlwZS5oYXNNZXRob2Qob2JqLCBHRVRfU1lNQk9MKSkge1xuICAgICAgICByZXR1cm4gb2JqLmdldFN5bWJvbCgpO1xuICAgIH1cbiAgICAvLyBTZWUgSUhhc2hhYmxlLlxuICAgIGlmIChUeXBlLmhhc01ldGhvZChvYmosIEdFVF9IQVNIX0NPREUpKSB7XG4gICAgICAgIHJldHVybiBvYmouZ2V0SGFzaENvZGUoKTtcbiAgICB9XG4gICAgaWYgKHRocm93SWZVbmtub3duKSB7XG4gICAgICAgIGlmIChUeXBlLmlzRnVuY3Rpb24odGhyb3dJZlVua25vd24pKVxuICAgICAgICAgICAgcmV0dXJuIHRocm93SWZVbmtub3duKG9iaik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IGNyZWF0ZSBrbm93biBpZGVudGl0eS5cIjtcbiAgICB9XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqLnRvU3RyaW5nID09IFR5cGUuRlVOQ1RJT04pXG4gICAgICAgID8gb2JqLnRvU3RyaW5nKClcbiAgICAgICAgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGdldElkZW50aWZpZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZXRJZGVudGlmaWVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRGljdGlvbmFyaWVzL2dldElkZW50aWZpZXIuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tIFwiLi4vRW51bWVyYXRpb24vRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkJhc2UgfSBmcm9tIFwiLi4vQ29sbGVjdGlvbkJhc2VcIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBleHRyYWN0S2V5VmFsdWUgfSBmcm9tIFwiLi4vLi4vS2V5VmFsdWVFeHRyYWN0XCI7XG5pbXBvcnQgeyBLZXlOb3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9LZXlOb3RGb3VuZEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbi8vIERlc2lnbiBOb3RlOiBTaG91bGQgRGljdGlvbmFyeUFic3RyYWN0QmFzZSBiZSBJRGlzcG9zYWJsZT9cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5QmFzZSBleHRlbmRzIENvbGxlY3Rpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICAgICAgc3VwZXIoc291cmNlKTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfb25WYWx1ZU1vZGlmaWVkKGtleSwgdmFsdWUsIG9sZCkge1xuICAgIH1cbiAgICBfYWRkSW50ZXJuYWwoaXRlbSkge1xuICAgICAgICBpZiAoIWl0ZW0pXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdpdGVtJywgJ0RpY3Rpb25hcmllcyBtdXN0IHVzZSBhIHZhbGlkIGtleS92YWx1ZSBwYWlyLiBcXCcnICsgaXRlbSArICdcXCcgaXMgbm90IGFsbG93ZWQuJyk7XG4gICAgICAgIHJldHVybiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgKGtleSwgdmFsdWUpID0+IHRoaXMuYWRkQnlLZXlWYWx1ZShrZXksIHZhbHVlKSk7XG4gICAgfVxuICAgIF9jbGVhckludGVybmFsKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIF8ua2V5cykge1xuICAgICAgICAgICAgaWYgKF8ucmVtb3ZlQnlLZXkoa2V5KSlcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG4gICAgY29udGFpbnMoaXRlbSkge1xuICAgICAgICAvLyBTaG91bGQgbmV2ZXIgaGF2ZSBhIG51bGwgb2JqZWN0IGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICBpZiAoIWl0ZW0gfHwgIXRoaXMuZ2V0Q291bnQoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RLZXlWYWx1ZShpdGVtLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgLy8gTGVhdmUgYXMgdmFyaWFibGUgZm9yIGRlYnVnZ2luZy4uLlxuICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICByZXR1cm4gYXJlRXF1YWwodmFsdWUsIHYpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3JlbW92ZUludGVybmFsKGl0ZW0pIHtcbiAgICAgICAgaWYgKCFpdGVtKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIHJldHVybiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIC8vIExlYXZlIGFzIHZhcmlhYmxlIGZvciBkZWJ1Z2dpbmcuLi5cbiAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWYWx1ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIChhcmVFcXVhbCh2YWx1ZSwgdikgJiYgdGhpcy5yZW1vdmVCeUtleShrZXkpKVxuICAgICAgICAgICAgICAgID8gMSA6IDA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQga2V5cygpIHsgcmV0dXJuIHRoaXMuZ2V0S2V5cygpOyB9XG4gICAgZ2V0IHZhbHVlcygpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWVzKCk7IH1cbiAgICBhZGRCeUtleVZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBWT0lEMClcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ2Fubm90IGFkZCAndW5kZWZpbmVkJyBhcyBhIHZhbHVlLlwiKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmIChfLmNvbnRhaW5zS2V5KGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ID0gbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJBZGRpbmcgYSBrZXkvdmFsdWUgd2hlbiB0aGUga2V5IGFscmVhZHkgZXhpc3RzLlwiKTtcbiAgICAgICAgICAgIGV4LmRhdGFbJ2tleSddID0ga2V5O1xuICAgICAgICAgICAgZXguZGF0YVsndmFsdWUnXSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhyb3cgZXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8uc2V0VmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIGdldEFzc3VyZWRWYWx1ZShrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gVk9JRDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgS2V5Tm90Rm91bmRFeGNlcHRpb24oYEtleSAnJHtrZXl9JyBub3QgZm91bmQuYCk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdHJ5R2V0VmFsdWUoa2V5LCBvdXQpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gVk9JRDApIHtcbiAgICAgICAgICAgIG91dCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIGFuIGVudHJ5LlxuICAgICAqIEl0J3MgaW1wb3J0YW50IHRvIGtub3cgdGhhdCAndW5kZWZpbmVkJyBjYW5ub3QgZXhpc3QgYXMgYSB2YWx1ZSBpbiB0aGUgZGljdGlvbmFyeSBhbmQgaXMgdXNlZCBhcyBhIGZsYWcgZm9yIHJlbW92YWwuXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHNldFZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgLy8gc2V0VmFsdWUgc2hvdWxkbid0IG5lZWQgdG8gd29ycnkgYWJvdXQgcmVjdXJzaW9uLi4uXG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgb2xkID0gXy5nZXRWYWx1ZShrZXkpOyAvLyBnZXQgdGhlIG9sZCB2YWx1ZSBoZXJlIGFuZCBwYXNzIHRvIGludGVybmFsLlxuICAgICAgICBpZiAoIWFyZUVxdWFsKHZhbHVlLCBvbGQpICYmIF8uX3NldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgXy5fb25WYWx1ZU1vZGlmaWVkKGtleSwgdmFsdWUsIG9sZCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKGNoYW5nZWQpO1xuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG4gICAgY29udGFpbnNLZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2dldEVudHJ5KGtleSk7XG4gICAgfVxuICAgIGNvbnRhaW5zVmFsdWUodmFsdWUpIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICB3aGlsZSAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBpZiAoYXJlRXF1YWwoZS5jdXJyZW50LCB2YWx1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJlbW92ZUJ5S2V5KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRWYWx1ZShrZXksIFZPSUQwKTtcbiAgICB9XG4gICAgcmVtb3ZlQnlWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIF8uZ2V0S2V5cygpKSB7XG4gICAgICAgICAgICBpZiAoYXJlRXF1YWwoXy5nZXRWYWx1ZShrZXkpLCB2YWx1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBfLnJlbW92ZUJ5S2V5KGtleSk7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuICAgIGltcG9ydEVudHJpZXMocGFpcnMpIHtcbiAgICAgICAgLy8gQWxsb3cgcGlwaW5nIHRocm91Z2ggdG8gdHJpZ2dlciBvbk1vZGlmaWVkIHByb3Blcmx5LlxuICAgICAgICByZXR1cm4gc3VwZXIuaW1wb3J0RW50cmllcyhwYWlycyk7XG4gICAgfVxuICAgIF9pbXBvcnRFbnRyaWVzKHBhaXJzKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIXBhaXJzKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGxldCBjaGFuZ2VkID0gMDtcbiAgICAgICAgZm9yRWFjaChwYWlycywgcGFpciA9PiBleHRyYWN0S2V5VmFsdWUocGFpciwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChfLl9zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpKVxuICAgICAgICAgICAgICAgIGNoYW5nZWQrKztcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCB2ZXIsIGtleXMsIGxlbiwgaW5kZXggPSAwO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICB2ZXIgPSBfLl92ZXJzaW9uOyAvLyBUcmFjayB0aGUgdmVyc2lvbiBzaW5jZSBnZXRLZXlzIGlzIGEgY29weS5cbiAgICAgICAgICAgIGtleXMgPSBfLmdldEtleXMoKTtcbiAgICAgICAgICAgIGxlbiA9IGtleXMubGVuZ3RoO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIF8uYXNzZXJ0VmVyc2lvbih2ZXIpO1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpbmRleCsrXSwgdmFsdWUgPSBfLmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBWT0lEMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBEaWN0aW9uYXJ5QmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURpY3Rpb25hcnlCYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRGljdGlvbmFyaWVzL0RpY3Rpb25hcnlCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG4vLyBOZWVkIHRvIHNwb29mIHRoaXMgc28gV2ViUGFjayBkb2Vzbid0IHBhbmljICh3YXJuaW5ncykuXG5sZXQgcjtcbnRyeSB7XG4gICAgciA9IGV2YWwoJ3JlcXVpcmUnKTtcbn1cbmNhdGNoIChleCkgeyB9XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbmV4cG9ydCBjb25zdCBpc0NvbW1vbkpTID0gISEociAmJiByLnJlc29sdmUpO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5leHBvcnQgY29uc3QgaXNSZXF1aXJlSlMgPSAhIShyICYmIHIudG9VcmwgJiYgci5kZWZpbmVkKTtcbi8qXG4gKiBFbnN1cmUgaXMgaW4gYSByZWFsIE5vZGUgZW52aXJvbm1lbnQsIHdpdGggYSBgcHJvY2Vzcy5uZXh0VGlja2AuXG4gKiBUbyBzZWUgdGhyb3VnaCBmYWtlIE5vZGUgZW52aXJvbm1lbnRzOlxuICogTW9jaGEgdGVzdCBydW5uZXIgLSBleHBvc2VzIGEgYHByb2Nlc3NgIGdsb2JhbCB3aXRob3V0IGEgYG5leHRUaWNrYFxuICogQnJvd3NlcmlmeSAtIGV4cG9zZXMgYSBgcHJvY2Vzcy5uZXhUaWNrYCBmdW5jdGlvbiB0aGF0IHVzZXNcbiAqIGBzZXRUaW1lb3V0YC4gSW4gdGhpcyBjYXNlIGBzZXRJbW1lZGlhdGVgIGlzIHByZWZlcnJlZCBiZWNhdXNlXG4gKiBpdCBpcyBmYXN0ZXIuIEJyb3dzZXJpZnkncyBgcHJvY2Vzcy50b1N0cmluZygpYCB5aWVsZHNcbiAqIFwiW29iamVjdCBPYmplY3RdXCIsIHdoaWxlIGluIGEgcmVhbCBOb2RlIGVudmlyb25tZW50XG4gKiBgcHJvY2Vzcy5uZXh0VGljaygpYCB5aWVsZHMgXCJbb2JqZWN0IHByb2Nlc3NdXCIuXG4gKi9cbmV4cG9ydCBjb25zdCBpc05vZGVKUyA9IHR5cGVvZiBwcm9jZXNzID09IFwib2JqZWN0XCJcbiAgICAmJiBwcm9jZXNzLnRvU3RyaW5nKCkgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiXG4gICAgJiYgcHJvY2Vzcy5uZXh0VGljayAhPSB2b2lkIDA7XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcbnRyeSB7XG4gICAgT2JqZWN0LmZyZWV6ZShleHBvcnRzKTtcbn1cbmNhdGNoIChleCkgeyB9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FbnZpcm9ubWVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Vudmlyb25tZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuL0V4Y2VwdGlvbnMvQXJndW1lbnRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vVHlwZXNcIjtcbmNvbnN0IFZPSUQwID0gdm9pZCAwLCBET1QgPSAnLicsIEtFWSA9ICdrZXknLCBWQUxVRSA9ICd2YWx1ZScsIElURU0gPSAnaXRlbScsIElURU1fMSA9IElURU0gKyAnWzFdJywgSVRFTV9WQUxVRSA9IElURU0gKyBET1QgKyBWQUxVRSwgSU5WQUxJRF9LVlBfTUVTU0FHRSA9ICdJbnZhbGlkIHR5cGUuICBNdXN0IGJlIGEgS2V5VmFsdWVQYWlyIG9yIFR1cGxlIG9mIGxlbmd0aCAyLicsIENBTk5PVF9CRV9VTkRFRklORUQgPSAnQ2Fubm90IGVxdWFsIHVuZGVmaW5lZC4nO1xuZXhwb3J0IGZ1bmN0aW9uIGlzS2V5VmFsdWVQYWlyKGt2cCkge1xuICAgIHJldHVybiBrdnAgJiYga3ZwLmhhc093blByb3BlcnR5KEtFWSkgJiYga3ZwLmhhc093blByb3BlcnR5KFZBTFVFKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRLZXkoa2V5LCBuYW1lID0gSVRFTSkge1xuICAgIGFzc2VydE5vdFVuZGVmaW5lZChrZXksIG5hbWUgKyBET1QgKyBLRVkpO1xuICAgIGlmIChrZXkgPT09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24obmFtZSArIERPVCArIEtFWSk7XG4gICAgcmV0dXJuIGtleTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRUdXBsZSh0dXBsZSwgbmFtZSA9IElURU0pIHtcbiAgICBpZiAodHVwbGUubGVuZ3RoICE9IDIpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihuYW1lLCAnS2V5VmFsdWVQYWlyIHR1cGxlcyBtdXN0IGJlIG9mIGxlbmd0aCAyLicpO1xuICAgIGFzc2VydEtleSh0dXBsZVswXSwgbmFtZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Tm90VW5kZWZpbmVkKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKHZhbHVlID09PSBWT0lEMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKG5hbWUsIENBTk5PVF9CRV9VTkRFRklORUQpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgdG8pIHtcbiAgICBsZXQga2V5LCB2YWx1ZTtcbiAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShpdGVtKSkge1xuICAgICAgICBhc3NlcnRUdXBsZShpdGVtKTtcbiAgICAgICAga2V5ID0gaXRlbVswXTtcbiAgICAgICAgdmFsdWUgPSBhc3NlcnROb3RVbmRlZmluZWQoaXRlbVsxXSwgSVRFTV8xKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNLZXlWYWx1ZVBhaXIoaXRlbSkpIHtcbiAgICAgICAga2V5ID0gYXNzZXJ0S2V5KGl0ZW0ua2V5KTtcbiAgICAgICAgdmFsdWUgPSBhc3NlcnROb3RVbmRlZmluZWQoaXRlbS52YWx1ZSwgSVRFTV9WQUxVRSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oSVRFTSwgSU5WQUxJRF9LVlBfTUVTU0FHRSk7XG4gICAgfVxuICAgIHJldHVybiB0byhrZXksIHZhbHVlKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RLZXlWYWx1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUtleVZhbHVlRXh0cmFjdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0tleVZhbHVlRXh0cmFjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvc3lzdGVtLmNvbGxlY3Rpb25zLmdlbmVyaWMuS2V5Tm90Rm91bmRFeGNlcHRpb24odj12cy4xMTApLmFzcHhcbiAqL1xuaW1wb3J0IHsgU3lzdGVtRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvU3lzdGVtRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnS2V5Tm90Rm91bmRFeGNlcHRpb24gJztcbmV4cG9ydCBjbGFzcyBLZXlOb3RGb3VuZEV4Y2VwdGlvbiBleHRlbmRzIFN5c3RlbUV4Y2VwdGlvbiB7XG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgS2V5Tm90Rm91bmRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1LZXlOb3RGb3VuZEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0tleU5vdEZvdW5kRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuKiBCYXNlZCBVcG9uOiBodHRwOi8vcmVmZXJlbmNlc291cmNlLm1pY3Jvc29mdC5jb20vI1N5c3RlbS9Db21wTW9kL3N5c3RlbS9jb2xsZWN0aW9ucy9nZW5lcmljL3F1ZXVlLmNzXG4qIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuKi9cbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uL0NvbXBhcmVcIjtcbmltcG9ydCAqIGFzIEFVIGZyb20gXCIuL0FycmF5L1V0aWxpdHlcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vVHlwZXNcIjtcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi4vSW50ZWdlclwiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yQmFzZVwiO1xuaW1wb3J0IHsgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Ob3RJbXBsZW1lbnRlZEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkJhc2UgfSBmcm9tIFwiLi9Db2xsZWN0aW9uQmFzZVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmNvbnN0IE1JTklNVU1fR1JPVyA9IDQ7XG5jb25zdCBTSFJJTktfVEhSRVNIT0xEID0gMzI7IC8vIFVudXNlZD9cbi8vIHZhciBHUk9XX0ZBQ1RPUjogbnVtYmVyID0gMjAwOyAgLy8gZG91YmxlIGVhY2ggdGltZVxuY29uc3QgR1JPV19GQUNUT1JfSEFMRiA9IDEwMDtcbmNvbnN0IERFRkFVTFRfQ0FQQUNJVFkgPSBNSU5JTVVNX0dST1c7XG5jb25zdCBlbXB0eUFycmF5ID0gT2JqZWN0LmZyZWV6ZShbXSk7XG5leHBvcnQgY2xhc3MgUXVldWUgZXh0ZW5kcyBDb2xsZWN0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICAgICAgc3VwZXIoVk9JRDAsIGVxdWFsaXR5Q29tcGFyZXIpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5faGVhZCA9IDA7XG4gICAgICAgIF8uX3RhaWwgPSAwO1xuICAgICAgICBfLl9zaXplID0gMDtcbiAgICAgICAgaWYgKCFzb3VyY2UpXG4gICAgICAgICAgICBfLl9hcnJheSA9IGVtcHR5QXJyYXk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKFR5cGUuaXNOdW1iZXIoc291cmNlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcGFjaXR5ID0gc291cmNlO1xuICAgICAgICAgICAgICAgIGFzc2VydEludGVnZXJaZXJvT3JHcmVhdGVyKGNhcGFjaXR5LCBcImNhcGFjaXR5XCIpO1xuICAgICAgICAgICAgICAgIF8uX2FycmF5ID0gY2FwYWNpdHlcbiAgICAgICAgICAgICAgICAgICAgPyBBVS5pbml0aWFsaXplKGNhcGFjaXR5KVxuICAgICAgICAgICAgICAgICAgICA6IGVtcHR5QXJyYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZSA9IHNvdXJjZTtcbiAgICAgICAgICAgICAgICBfLl9hcnJheSA9IEFVLmluaXRpYWxpemUoVHlwZS5pc0FycmF5TGlrZShzZSlcbiAgICAgICAgICAgICAgICAgICAgPyBzZS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgOiBERUZBVUxUX0NBUEFDSVRZKTtcbiAgICAgICAgICAgICAgICBfLl9pbXBvcnRFbnRyaWVzKHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfLl9jYXBhY2l0eSA9IF8uX2FycmF5Lmxlbmd0aDtcbiAgICB9XG4gICAgZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cbiAgICBfYWRkSW50ZXJuYWwoaXRlbSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3Qgc2l6ZSA9IF8uX3NpemU7XG4gICAgICAgIGxldCBsZW4gPSBfLl9jYXBhY2l0eTtcbiAgICAgICAgaWYgKHNpemUgPT0gbGVuKSB7XG4gICAgICAgICAgICBsZXQgbmV3Q2FwYWNpdHkgPSBsZW4gKiBHUk9XX0ZBQ1RPUl9IQUxGO1xuICAgICAgICAgICAgaWYgKG5ld0NhcGFjaXR5IDwgbGVuICsgTUlOSU1VTV9HUk9XKVxuICAgICAgICAgICAgICAgIG5ld0NhcGFjaXR5ID0gbGVuICsgTUlOSU1VTV9HUk9XO1xuICAgICAgICAgICAgXy5zZXRDYXBhY2l0eShuZXdDYXBhY2l0eSk7XG4gICAgICAgICAgICBsZW4gPSBfLl9jYXBhY2l0eTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YWlsID0gXy5fdGFpbDtcbiAgICAgICAgXy5fYXJyYXlbdGFpbF0gPSBpdGVtO1xuICAgICAgICBfLl90YWlsID0gKHRhaWwgKyAxKSAlIGxlbjtcbiAgICAgICAgXy5fc2l6ZSA9IHNpemUgKyAxO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfcmVtb3ZlSW50ZXJuYWwoaXRlbSwgbWF4KSB7XG4gICAgICAgIC8vbm9pbnNwZWN0aW9uIEh0bWxVbmtub3duVGFnXG4gICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbihcIklDb2xsZWN0aW9uXFw8VFxcPi5yZW1vdmUgaXMgbm90IGltcGxlbWVudGVkIGluIFF1ZXVlXFw8VFxcPlwiICtcbiAgICAgICAgICAgIFwiIHNpbmNlIGl0IHdvdWxkIHJlcXVpcmUgZGVzdHJveWluZyB0aGUgdW5kZXJseWluZyBhcnJheSB0byByZW1vdmUgdGhlIGl0ZW0uXCIpO1xuICAgIH1cbiAgICBfY2xlYXJJbnRlcm5hbCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gXy5fYXJyYXksIGhlYWQgPSBfLl9oZWFkLCB0YWlsID0gXy5fdGFpbCwgc2l6ZSA9IF8uX3NpemU7XG4gICAgICAgIGlmIChoZWFkIDwgdGFpbClcbiAgICAgICAgICAgIEFVLmNsZWFyKGFycmF5LCBoZWFkLCB0YWlsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBBVS5jbGVhcihhcnJheSwgaGVhZCk7XG4gICAgICAgICAgICBBVS5jbGVhcihhcnJheSwgMCwgdGFpbCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5faGVhZCA9IDA7XG4gICAgICAgIF8uX3RhaWwgPSAwO1xuICAgICAgICBfLl9zaXplID0gMDtcbiAgICAgICAgXy50cmltRXhjZXNzKCk7XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoXy5fYXJyYXkgIT0gZW1wdHlBcnJheSkge1xuICAgICAgICAgICAgXy5fYXJyYXkubGVuZ3RoID0gXy5fY2FwYWNpdHkgPSAwO1xuICAgICAgICAgICAgXy5fYXJyYXkgPSBlbXB0eUFycmF5O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlcXVldWVzIGVudHJpZXMgaW50byBhbiBhcnJheS5cbiAgICAgKi9cbiAgICBkdW1wKG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgaWYgKGlzRmluaXRlKG1heCkpIHtcbiAgICAgICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihtYXgpO1xuICAgICAgICAgICAgaWYgKG1heCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChtYXgtLSAmJiBfLl90cnlEZXF1ZXVlSW50ZXJuYWwodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKF8uX3RyeURlcXVldWVJbnRlcm5hbCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICB9XG4gICAgICAgIF8udHJpbUV4Y2VzcygpO1xuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmZvckVhY2goYWN0aW9uLCB0cnVlKTtcbiAgICB9XG4gICAgc2V0Q2FwYWNpdHkoY2FwYWNpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGFzc2VydEludGVnZXJaZXJvT3JHcmVhdGVyKGNhcGFjaXR5LCBcImNhcGFjaXR5XCIpO1xuICAgICAgICBjb25zdCBhcnJheSA9IF8uX2FycmF5LCBsZW4gPSBfLl9jYXBhY2l0eTtcbiAgICAgICAgaWYgKGNhcGFjaXR5ID4gbGVuKVxuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKGNhcGFjaXR5ID09IGxlbilcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBjb25zdCBoZWFkID0gXy5faGVhZCwgdGFpbCA9IF8uX3RhaWwsIHNpemUgPSBfLl9zaXplO1xuICAgICAgICAvLyBTcGVjaWFsIGNhc2Ugd2hlcmUgd2UgY2FuIHNpbXBseSBleHRlbmQgdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkuIChKYXZhU2NyaXB0IG9ubHkpXG4gICAgICAgIGlmIChhcnJheSAhPSBlbXB0eUFycmF5ICYmIGNhcGFjaXR5ID4gbGVuICYmIGhlYWQgPCB0YWlsKSB7XG4gICAgICAgICAgICBhcnJheS5sZW5ndGggPSBfLl9jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgICAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgY3JlYXRlIGEgbmV3IGFycmF5IGJlY2F1c2UgbW9kaWZ5aW5nIGFuIGV4aXN0aW5nIG9uZSBjb3VsZCBiZSBzbG93LlxuICAgICAgICBjb25zdCBuZXdBcnJheSA9IEFVLmluaXRpYWxpemUoY2FwYWNpdHkpO1xuICAgICAgICBpZiAoc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGlmIChoZWFkIDwgdGFpbCkge1xuICAgICAgICAgICAgICAgIEFVLmNvcHlUbyhhcnJheSwgbmV3QXJyYXksIGhlYWQsIDAsIHNpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgQVUuY29weVRvKGFycmF5LCBuZXdBcnJheSwgaGVhZCwgMCwgbGVuIC0gaGVhZCk7XG4gICAgICAgICAgICAgICAgQVUuY29weVRvKGFycmF5LCBuZXdBcnJheSwgMCwgbGVuIC0gaGVhZCwgdGFpbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXy5fYXJyYXkgPSBuZXdBcnJheTtcbiAgICAgICAgXy5fY2FwYWNpdHkgPSBjYXBhY2l0eTtcbiAgICAgICAgXy5faGVhZCA9IDA7XG4gICAgICAgIF8uX3RhaWwgPSAoc2l6ZSA9PSBjYXBhY2l0eSkgPyAwIDogc2l6ZTtcbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW5xdWV1ZShpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChpdGVtKTtcbiAgICB9XG4gICAgX3RyeURlcXVldWVJbnRlcm5hbChvdXQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghXy5fc2l6ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBfLl9hcnJheSwgaGVhZCA9IF8uX2hlYWQ7XG4gICAgICAgIGNvbnN0IHJlbW92ZWQgPSBfLl9hcnJheVtoZWFkXTtcbiAgICAgICAgYXJyYXlbaGVhZF0gPSBudWxsO1xuICAgICAgICBfLl9oZWFkID0gKGhlYWQgKyAxKSAlIF8uX2NhcGFjaXR5O1xuICAgICAgICBfLl9zaXplLS07XG4gICAgICAgIF8uX2luY3JlbWVudE1vZGlmaWVkKCk7XG4gICAgICAgIG91dChyZW1vdmVkKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGRlcXVldWUodGhyb3dJZkVtcHR5ID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gVk9JRDA7XG4gICAgICAgIGlmICghdGhpcy50cnlEZXF1ZXVlKHZhbHVlID0+IHsgcmVzdWx0ID0gdmFsdWU7IH0pICYmIHRocm93SWZFbXB0eSlcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ2Fubm90IGRlcXVldWUgYW4gZW1wdHkgcXVldWUuXCIpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBxdWV1ZSBoYXMgZW50cmllcyBhbiBwdWxscyBhbiBlbnRyeSBmcm9tIHRoZSBoZWFkIG9mIHRoZSBxdWV1ZSBhbmQgcGFzc2VzIGl0IHRvIHRoZSBvdXQgaGFuZGxlci5cbiAgICAgKiBAcGFyYW0gb3V0IFRoZSAnb3V0JyBoYW5kbGVyIHRoYXQgcmVjZWl2ZXMgdGhlIHZhbHVlIGlmIGl0IGV4aXN0cy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBhIHZhbHVlIHdhcyByZXRyaWV2ZWQuICBGYWxzZSBpZiBub3QuXG4gICAgICovXG4gICAgdHJ5RGVxdWV1ZShvdXQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghXy5fc2l6ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIC8vIEEgc2luZ2xlIGRlcXVldWUgc2hvdWxkbid0IG5lZWQgdXBkYXRlIHJlY3Vyc2lvbiB0cmFja2luZy4uLlxuICAgICAgICBpZiAodGhpcy5fdHJ5RGVxdWV1ZUludGVybmFsKG91dCkpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgbWF5IHByZWVtcHRpdmVseSB0cmlnZ2VyIHRoZSBfb25Nb2RpZmllZC5cbiAgICAgICAgICAgIGlmIChfLl9zaXplIDwgXy5fY2FwYWNpdHkgLyAyKVxuICAgICAgICAgICAgICAgIF8udHJpbUV4Y2VzcyhTSFJJTktfVEhSRVNIT0xEKTtcbiAgICAgICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfZ2V0RWxlbWVudChpbmRleCkge1xuICAgICAgICBhc3NlcnRJbnRlZ2VyWmVyb09yR3JlYXRlcihpbmRleCwgXCJpbmRleFwiKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBfLl9hcnJheVsoXy5faGVhZCArIGluZGV4KSAlIF8uX2NhcGFjaXR5XTtcbiAgICB9XG4gICAgcGVlayh0aHJvd0lmRW1wdHkgPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5fc2l6ZSA9PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhyb3dJZkVtcHR5KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ2Fubm90IGNhbGwgcGVlayBvbiBhbiBlbXB0eSBxdWV1ZS5cIik7XG4gICAgICAgICAgICByZXR1cm4gVk9JRDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2FycmF5W3RoaXMuX2hlYWRdO1xuICAgIH1cbiAgICB0cmltRXhjZXNzKHRocmVzaG9sZCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3Qgc2l6ZSA9IF8uX3NpemU7XG4gICAgICAgIGlmIChzaXplIDwgTWF0aC5mbG9vcihfLl9jYXBhY2l0eSAqIDAuOSkgJiYgKCF0aHJlc2hvbGQgJiYgdGhyZXNob2xkICE9PSAwIHx8IGlzTmFOKHRocmVzaG9sZCkgfHwgdGhyZXNob2xkIDwgc2l6ZSkpXG4gICAgICAgICAgICBfLnNldENhcGFjaXR5KHNpemUpO1xuICAgIH1cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IGluZGV4LCB2ZXJzaW9uLCBzaXplO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBfLl92ZXJzaW9uO1xuICAgICAgICAgICAgc2l6ZSA9IF8uX3NpemU7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcnNpb24pO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IHNpemUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oXy5fZ2V0RWxlbWVudChpbmRleCsrKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFzc2VydFplcm9PckdyZWF0ZXIodmFsdWUsIHByb3BlcnR5KSB7XG4gICAgaWYgKHZhbHVlIDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihwcm9wZXJ0eSwgdmFsdWUsIFwiTXVzdCBiZSBncmVhdGVyIHRoYW4gemVyb1wiKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGFzc2VydEludGVnZXJaZXJvT3JHcmVhdGVyKHZhbHVlLCBwcm9wZXJ0eSkge1xuICAgIEludGVnZXIuYXNzZXJ0KHZhbHVlLCBwcm9wZXJ0eSk7XG4gICAgcmV0dXJuIGFzc2VydFplcm9PckdyZWF0ZXIodmFsdWUsIHByb3BlcnR5KTtcbn1cbmV4cG9ydCBkZWZhdWx0IFF1ZXVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UXVldWUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9RdWV1ZS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuLi8uLi9JbnRlZ2VyXCI7XG5pbXBvcnQgeyBhcmVFcXVhbCB9IGZyb20gXCIuLi8uLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZSB9IGZyb20gXCIuL2luaXRpYWxpemVcIjtcbmltcG9ydCB7IGNvcHksIGNvcHlUbyB9IGZyb20gXCIuL2NvcHlcIjtcbmV4cG9ydCB7IGluaXRpYWxpemUsIGNvcHksIGNvcHlUbyB9O1xuY29uc3QgQ0JOID0gJ0Nhbm5vdCBiZSBudWxsLicsIENCMCA9ICdDYW5ub3QgYmUgemVyby4nLCBDQkwwID0gJ0Nhbm5vdCBiZSBsZXNzIHRoYW4gemVyby4nLCBWRk4gPSAnTXVzdCBiZSBhIHZhbGlkIGZpbml0ZSBudW1iZXInO1xuLyoqXG4gKiBDaGVja3MgdG8gc2VlIHdoZXJlIHRoZSBwcm92aWRlZCBhcnJheSBjb250YWlucyBhbiBpdGVtL3ZhbHVlLlxuICogSWYgdGhlIGFycmF5IHZhbHVlIGlzIG51bGwsIHRoZW4gLTEgaXMgcmV0dXJuZWQuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBpdGVtXG4gKiBAcGFyYW0ge2Z1bmN0aW9uP30gZXF1YWxpdHlDb21wYXJlclxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgIGNvbnN0IGxlbiA9IGFycmF5ICYmIGFycmF5Lmxlbmd0aDtcbiAgICBpZiAobGVuKSB7XG4gICAgICAgIC8vIE5hTiBORVZFUiBldmFsdWF0ZXMgaXRzIGVxdWFsaXR5IHNvIGJlIGNhcmVmdWwuXG4gICAgICAgIGlmICgoYXJyYXkpIGluc3RhbmNlb2YgKEFycmF5KSAmJiAhVHlwZS5pc1RydWVOYU4oaXRlbSkpXG4gICAgICAgICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgLy8gJ2FyZUVxdWFsJyBpbmNsdWRlcyBOYU49PU5hTiBldmFsdWF0aW9uLlxuICAgICAgICAgICAgaWYgKGVxdWFsaXR5Q29tcGFyZXIoYXJyYXlbaV0sIGl0ZW0pKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbi8qKlxuICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgcHJvdmlkZWQgYXJyYXkgY29udGFpbnMgYW4gaXRlbS5cbiAqIElmIHRoZSBhcnJheSB2YWx1ZSBpcyBudWxsLCB0aGVuIGZhbHNlIGlzIHJldHVybmVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gaXRlbVxuICogQHBhcmFtIHtmdW5jdGlvbj99IGVxdWFsaXR5Q29tcGFyZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyKSAhPSAtMTtcbn1cbi8qKlxuICogRmluZHMgYW5kIHJlcGxhY2VzIGEgdmFsdWUgZnJvbSBhbiBhcnJheS4gIFdpbGwgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyB1bmxlc3MgYSBtYXhpbXVtIGlzIHNwZWNpZmllZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIG9sZFxuICogQHBhcmFtIG5ld1ZhbHVlXG4gKiBAcGFyYW0gbWF4XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShhcnJheSwgb2xkLCBuZXdWYWx1ZSwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoIWFycmF5IHx8ICFhcnJheS5sZW5ndGggfHwgbWF4ID09PSAwKVxuICAgICAgICByZXR1cm4gMDtcbiAgICBpZiAobWF4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbWF4JywgbWF4LCBDQkwwKTtcbiAgICBpZiAoIW1heClcbiAgICAgICAgbWF4ID0gSW5maW5pdHk7IC8vIGp1c3QgaW4gY2FzZS5cbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoYXJyYXlbaV0gPT09IG9sZCkge1xuICAgICAgICAgICAgYXJyYXlbaV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICBpZiAoY291bnQgPT0gbWF4KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbn1cbi8qKlxuICogUmVwbGFjZXMgdmFsdWVzIG9mIGFuIGFycmF5IGFjcm9zcyBhIHJhbmdlIG9mIGluZGV4ZXMuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIHN0YXJ0XG4gKiBAcGFyYW0gc3RvcFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUmFuZ2UoYXJyYXksIHZhbHVlLCBzdGFydCA9IDAsIHN0b3ApIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICByZXR1cm47XG4gICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKHN0YXJ0LCAnc3RhcnQnKTtcbiAgICBpZiAoIXN0b3AgJiYgc3RvcCAhPT0gMClcbiAgICAgICAgc3RvcCA9IGFycmF5Lmxlbmd0aDtcbiAgICBJbnRlZ2VyLmFzc2VydChzdG9wLCAnc3RvcCcpO1xuICAgIGlmIChzdG9wIDwgc3RhcnQpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdG9wXCIsIHN0b3AsIFwiaXMgbGVzcyB0aGFuIHN0YXJ0XCIpO1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHN0b3A7IGkrKykge1xuICAgICAgICBhcnJheVtpXSA9IHZhbHVlO1xuICAgIH1cbn1cbi8qKlxuICogQ2xlYXJzIChzZXRzIHRvIG51bGwpIHZhbHVlcyBvZiBhbiBhcnJheSBhY3Jvc3MgYSByYW5nZSBvZiBpbmRleGVzLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gc3RhcnRcbiAqIEBwYXJhbSBzdG9wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhcihhcnJheSwgc3RhcnQgPSAwLCBzdG9wKSB7XG4gICAgdXBkYXRlUmFuZ2UoYXJyYXksIG51bGwsIHN0YXJ0LCBzdG9wKTtcbn1cbi8qKlxuICogRW5zdXJlcyBhIHZhbHVlIGV4aXN0cyB3aXRoaW4gYW4gYXJyYXkuICBJZiBub3QgZm91bmQsIGFkZHMgdG8gdGhlIGVuZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIGl0ZW1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBlcXVhbGl0eUNvbXBhcmVyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhcnJheScsIENCTik7XG4gICAgbGV0IGxlbiA9IGFycmF5Lmxlbmd0aDsgLy8gYXZvaWQgcXVlcnlpbmcgLmxlbmd0aCBtb3JlIHRoYW4gb25jZS4gKlxuICAgIGNvbnN0IG9rID0gIWxlbiB8fCAhY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIpO1xuICAgIGlmIChvaylcbiAgICAgICAgYXJyYXlbbGVuXSA9IGl0ZW07IC8vICogcHVzaCB3b3VsZCBxdWVyeSBsZW5ndGggYWdhaW4uXG4gICAgcmV0dXJuIG9rO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBpbmRleCBvZiB3aGljaCB0aGUgcHJvdmlkZWQgcHJlZGljYXRlIHJldHVybnMgdHJ1ZS5cbiAqIFJldHVybnMgLTEgaWYgYWx3YXlzIGZhbHNlLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gcHJlZGljYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhcnJheScsIENCTik7XG4gICAgaWYgKCFUeXBlLmlzRnVuY3Rpb24ocHJlZGljYXRlKSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCdwcmVkaWNhdGUnLCAnTXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIGNvbnN0IGxlbiA9IGFycmF5Lmxlbmd0aDtcbiAgICBpZiAoIVR5cGUuaXNOdW1iZXIobGVuLCB0cnVlKSB8fCBsZW4gPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oJ2FycmF5JywgJ0RvZXMgbm90IGhhdmUgYSB2YWxpZCBsZW5ndGguJyk7XG4gICAgaWYgKChhcnJheSkgaW5zdGFuY2VvZiAoQXJyYXkpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaV0sIGkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKGkpIGluIChhcnJheSkgJiYgcHJlZGljYXRlKGFycmF5W2ldLCBpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChzb3VyY2UsIGFjdGlvbikge1xuICAgIGlmIChzb3VyY2UgJiYgYWN0aW9uKSB7XG4gICAgICAgIC8vIERvbid0IGNhY2hlIHRoZSBsZW5ndGggc2luY2UgaXQgaXMgcG9zc2libGUgdGhhdCB0aGUgdW5kZXJseWluZyBhcnJheSBjaGFuZ2VkLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFjdGlvbihzb3VyY2VbaV0sIGkpID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSXMgc2ltaWxhciB0byBBcnJheS5tYXAoKSBidXQgaW5zdGVhZCBvZiByZXR1cm5pbmcgYSBuZXcgYXJyYXksIGl0IHVwZGF0ZXMgdGhlIGV4aXN0aW5nIGluZGV4ZXMuXG4gKiBDYW4gYWxzbyBiZSBhcHBsaWVkIHRvIGEgc3RydWN0dXJlIHRoYXQgaW5kZXhlcyBsaWtlIGFuIGFycmF5LCBidXQgbWF5IG5vdCBiZS5cbiAqIEBwYXJhbSB0YXJnZXRcbiAqIEBwYXJhbSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlUbyh0YXJnZXQsIGZuKSB7XG4gICAgaWYgKHRhcmdldCAmJiBmbikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFyZ2V0W2ldID0gZm4odGFyZ2V0W2ldLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogUmVtb3ZlcyBhbiBlbnRyeSBhdCBhIHNwZWNpZmllZCBpbmRleC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgd2FzIGFibGUgdG8gYmUgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUluZGV4KGFycmF5LCBpbmRleCkge1xuICAgIGlmICghYXJyYXkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5JywgQ0JOKTtcbiAgICBJbnRlZ2VyLmFzc2VydChpbmRleCwgJ2luZGV4Jyk7XG4gICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignaW5kZXgnLCBpbmRleCwgQ0JMMCk7XG4gICAgY29uc3QgZXhpc3RzID0gaW5kZXggPCBhcnJheS5sZW5ndGg7XG4gICAgaWYgKGV4aXN0cylcbiAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gZXhpc3RzO1xufVxuLyoqXG4gKiBGaW5kcyBhbmQgcmVtb3ZlcyBhIHZhbHVlIGZyb20gYW4gYXJyYXkuICBXaWxsIHJlbW92ZSBhbGwgaW5zdGFuY2VzIHVubGVzcyBhIG1heGltdW0gaXMgc3BlY2lmaWVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBtYXhcbiAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBlcXVhbGl0eUNvbXBhcmVyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoZSB2YWx1ZSB3YXMgZm91bmQgYW5kIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUoYXJyYXksIHZhbHVlLCBtYXggPSBJbmZpbml0eSwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgaWYgKCFhcnJheSB8fCAhYXJyYXkubGVuZ3RoIHx8IG1heCA9PT0gMClcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKG1heCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ21heCcsIG1heCwgQ0JMMCk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAoIW1heCB8fCAhaXNGaW5pdGUobWF4KSkge1xuICAgICAgICAvLyBEb24ndCB0cmFjayB0aGUgaW5kZXhlcyBhbmQgcmVtb3ZlIGluIHJldmVyc2UuXG4gICAgICAgIGZvciAobGV0IGkgPSAoYXJyYXkubGVuZ3RoIC0gMSk7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxpdHlDb21wYXJlcihhcnJheVtpXSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIFNpbmNlIHRoZSB1c2VyIHdpbGwgZXhwZWN0IGl0IHRvIGhhcHBlbiBpbiBmb3J3YXJkIG9yZGVyLi4uXG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107IC8vIGluZGV4ZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGVxdWFsaXR5Q29tcGFyZXIoYXJyYXlbaV0sIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGZvdW5kLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gbWF4KVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gZm91bmQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShmb3VuZFtpXSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufVxuLyoqXG4gKiBTaW1wbHkgcmVwZWF0cyBhIHZhbHVlIHRoZSBudW1iZXIgb2YgdGltZXMgc3BlY2lmaWVkLlxuICogQHBhcmFtIGVsZW1lbnRcbiAqIEBwYXJhbSBjb3VudFxuICogQHJldHVybnMge1RbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdChlbGVtZW50LCBjb3VudCkge1xuICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCAnY291bnQnKTtcbiAgICBpZiAoY291bnQgPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdjb3VudCcsIGNvdW50LCBDQkwwKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbml0aWFsaXplKGNvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gZWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogUmV0dXJucyBhIHJhbmdlIG9mIG51bWJlcnMgYmFzZWQgdXBvbiB0aGUgZmlyc3QgdmFsdWUgYW5kIHRoZSBzdGVwIHZhbHVlLlxuICogQHBhcmFtIGZpcnN0XG4gKiBAcGFyYW0gY291bnRcbiAqIEBwYXJhbSBzdGVwXG4gKiBAcmV0dXJucyB7bnVtYmVyW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5nZShmaXJzdCwgY291bnQsIHN0ZXAgPSAxKSB7XG4gICAgaWYgKGlzTmFOKGZpcnN0KSB8fCAhaXNGaW5pdGUoZmlyc3QpKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdmaXJzdCcsIGZpcnN0LCBWRk4pO1xuICAgIGlmIChpc05hTihjb3VudCkgfHwgIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignY291bnQnLCBjb3VudCwgVkZOKTtcbiAgICBpZiAoY291bnQgPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdjb3VudCcsIGNvdW50LCBDQkwwKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbml0aWFsaXplKGNvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gZmlyc3Q7XG4gICAgICAgIGZpcnN0ICs9IHN0ZXA7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIFJldHVybnMgYSByYW5nZSBvZiBudW1iZXJzIGJhc2VkIHVwb24gdGhlIGZpcnN0IHZhbHVlIGFuZCB0aGUgc3RlcCB2YWx1ZSBleGNsdWRpbmcgYW55IG51bWJlcnMgYXQgb3IgYmV5b25kIHRoZSB1bnRpbCB2YWx1ZS5cbiAqIEBwYXJhbSBmaXJzdFxuICogQHBhcmFtIHVudGlsXG4gKiBAcGFyYW0gc3RlcFxuICogQHJldHVybnMge251bWJlcltdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2VVbnRpbChmaXJzdCwgdW50aWwsIHN0ZXAgPSAxKSB7XG4gICAgaWYgKHN0ZXAgPT0gMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignc3RlcCcsIHN0ZXAsIENCMCk7XG4gICAgcmV0dXJuIHJhbmdlKGZpcnN0LCAodW50aWwgLSBmaXJzdCkgLyBzdGVwLCBzdGVwKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkaXN0aW5jdChzb3VyY2UpIHtcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIFtdOyAvLyBBbGxvd2luZyBmb3IgbnVsbCBmYWNpbGl0YXRlcyByZWdleCBmaWx0ZXJpbmcuXG4gICAgY29uc3Qgc2VlbiA9IHt9O1xuICAgIHJldHVybiBzb3VyY2UuZmlsdGVyKGUgPT4gIShlIGluIHNlZW4pICYmIChzZWVuW2VdID0gdHJ1ZSkpO1xufVxuLyoqXG4gKiBUYWtlcyBhbnkgYXJyYXlzIHdpdGhpbiBhbiBhcnJheSBhbmQgaW5zZXJ0cyB0aGUgdmFsdWVzIGNvbnRhaW5lZCB3aXRoaW4gaW4gcGxhY2Ugb2YgdGhhdCBhcnJheS5cbiAqIEZvciBldmVyeSBjb3VudCBoaWdoZXIgdGhhbiAwIGluIHJlY3Vyc2VEZXB0aCBpdCB3aWxsIGF0dGVtcHQgYW4gYWRkaXRpb25hbCBwYXNzLiAgUGFzc2luZyBJbmZpbml0eSB3aWxsIGZsYXR0ZW4gYWxsIGFycmF5cyBjb250YWluZWQuXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIHJlY3Vyc2VEZXB0aFxuICogQHJldHVybnMge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhLCByZWN1cnNlRGVwdGggPSAwKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB4ID0gYVtpXTtcbiAgICAgICAgaWYgKCh4KSBpbnN0YW5jZW9mIChBcnJheSkpIHtcbiAgICAgICAgICAgIGlmIChyZWN1cnNlRGVwdGggPiAwKVxuICAgICAgICAgICAgICAgIHggPSBmbGF0dGVuKHgsIHJlY3Vyc2VEZXB0aCAtIDEpO1xuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCB4Lmxlbmd0aDsgbisrKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHhbbl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXRpbGl0eS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L1V0aWxpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ05vdEltcGxlbWVudGVkRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbiBleHRlbmRzIFN5c3RlbUV4Y2VwdGlvbiB7XG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTm90SW1wbGVtZW50ZWRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Ob3RJbXBsZW1lbnRlZEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvTm90SW1wbGVtZW50ZWRFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCAqIGFzIFZhbHVlcyBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgU29ydENvbnRleHQgfSBmcm9tIFwiLi9Tb3J0Q29udGV4dFwiO1xuaW1wb3J0IHsgRnVuY3Rpb25zIH0gZnJvbSBcIi4uLy4uL0Z1bmN0aW9uc1wiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5leHBvcnQgY2xhc3MgS2V5U29ydGVkQ29udGV4dCBleHRlbmRzIFNvcnRDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihuZXh0LCBfa2V5U2VsZWN0b3IsIG9yZGVyID0gMSAvKiBBc2NlbmRpbmcgKi8sIGNvbXBhcmVyID0gVmFsdWVzLmNvbXBhcmUpIHtcbiAgICAgICAgc3VwZXIobmV4dCwgY29tcGFyZXIsIG9yZGVyKTtcbiAgICAgICAgdGhpcy5fa2V5U2VsZWN0b3IgPSBfa2V5U2VsZWN0b3I7XG4gICAgfVxuICAgIGNvbXBhcmUoYSwgYikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGtzID0gXy5fa2V5U2VsZWN0b3I7XG4gICAgICAgIGlmICgha3MgfHwga3MgPT0gRnVuY3Rpb25zLklkZW50aXR5KVxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmNvbXBhcmUoYSwgYik7XG4gICAgICAgIC8vIFdlIGZvcmNlIDxhbnk+IGhlcmUgc2luY2UgaXQgY2FuIGJlIGEgUHJpbWl0aXZlIG9yIElDb21wYXJhYmxlPGFueT5cbiAgICAgICAgY29uc3QgZCA9IFZhbHVlcy5jb21wYXJlKGtzKGEpLCBrcyhiKSk7XG4gICAgICAgIGlmIChkID09IDAgJiYgXy5fbmV4dClcbiAgICAgICAgICAgIHJldHVybiBfLl9uZXh0LmNvbXBhcmUoYSwgYik7XG4gICAgICAgIHJldHVybiBfLl9vcmRlciAqIGQ7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgS2V5U29ydGVkQ29udGV4dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUtleVNvcnRlZENvbnRleHQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9Tb3J0aW5nL0tleVNvcnRlZENvbnRleHQuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCAqIGFzIFZhbHVlcyBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuZXhwb3J0IGNsYXNzIFNvcnRDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihfbmV4dCwgX2NvbXBhcmVyID0gVmFsdWVzLmNvbXBhcmUsIF9vcmRlciA9IDEgLyogQXNjZW5kaW5nICovKSB7XG4gICAgICAgIHRoaXMuX25leHQgPSBfbmV4dDtcbiAgICAgICAgdGhpcy5fY29tcGFyZXIgPSBfY29tcGFyZXI7XG4gICAgICAgIHRoaXMuX29yZGVyID0gX29yZGVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXJlY3Rpb24gb2YgdGhlIGNvbXBhcmlzb24uXG4gICAgICogQHR5cGUge09yZGVyfVxuICAgICAqL1xuICAgIGdldCBvcmRlcigpIHsgcmV0dXJuIHRoaXMuX29yZGVyOyB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGFuIGFycmF5IG9mIGluZGV4ZXMgZnJvbSB0aGUgc291cmNlIGluIG9yZGVyIG9mIHRoZWlyIGV4cGVjdGVkIGludGVybmFsU29ydCB3aXRob3V0IG1vZGlmeWluZyB0aGUgc291cmNlLlxuICAgICAqIEBwYXJhbSBzb3VyY2VcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XG4gICAgICovXG4gICAgZ2VuZXJhdGVTb3J0ZWRJbmRleGVzKHNvdXJjZSkge1xuICAgICAgICBpZiAoc291cmNlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHNvdXJjZS5tYXAoKHMsIGkpID0+IGkpO1xuICAgICAgICByZXN1bHQuc29ydCgoYSwgYikgPT4gdGhpcy5jb21wYXJlKHNvdXJjZVthXSwgc291cmNlW2JdKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXBhcmVzIHR3byB2YWx1ZXMgYmFzZWQgdXBvbiBTb3J0Q29udGV4dCBwYXJhbWV0ZXJzLlxuICAgICAqIEBwYXJhbSBhXG4gICAgICogQHBhcmFtIGJcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGNvbXBhcmUoYSwgYikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZCA9IF8uX2NvbXBhcmVyKGEsIGIpO1xuICAgICAgICBpZiAoZCA9PSAwICYmIF8uX25leHQpXG4gICAgICAgICAgICByZXR1cm4gXy5fbmV4dC5jb21wYXJlKGEsIGIpO1xuICAgICAgICByZXR1cm4gXy5fb3JkZXIgKiBkO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNvcnRDb250ZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U29ydENvbnRleHQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9Tb3J0aW5nL1NvcnRDb250ZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUXG4gKi9cbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi9JbnRlZ2VyXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplIH0gZnJvbSBcIi4vQ29sbGVjdGlvbnMvQXJyYXkvaW5pdGlhbGl6ZVwiO1xuaW1wb3J0IHsgc2h1ZmZsZSBhcyBhcnJheVNodWZmbGUgfSBmcm9tIFwiLi9Db2xsZWN0aW9ucy9BcnJheS9zaHVmZmxlXCI7XG52YXIgYXNzZXJ0ID0gSW50ZWdlci5hc3NlcnQ7XG4vKipcbiAqIFRoaXMgbW9kdWxlIG9ubHkgYWN0cyBhcyBhIHV0aWxpdHkgQVBJIGZvciBnZXR0aW5nIHJhbmRvbSBudW1iZXJzIGZyb20gTWF0aC5yYW5kb20oKS5cbiAqIElmIHlvdSBuZWVkIHJlcGVhdGFibGUgc2VlZGVkIHJhbmRvbSBudW1iZXJzIHRoZW4geW91J2xsIG5lZWQgYSBzZXBhcmF0ZSB1dGlsaXR5LlxuICogSGlnaGx5IHJlY29tbWVuZGVkOiBodHRwczovL2dpdGh1Yi5jb20vY2trbmlnaHQvcmFuZG9tLWpzIHdoaWNoIGhhcyB0eXBpbmdzIHVuZGVyIEB0eXBlcy9yYW5kb20tanMuXG4gKi9cbmV4cG9ydCB2YXIgUmFuZG9tO1xuKGZ1bmN0aW9uIChSYW5kb20pIHtcbiAgICBmdW5jdGlvbiByKG1heEV4Y2x1c2l2ZSA9IDEpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heEV4Y2x1c2l2ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5yKGJvdW5kYXJ5LCBpbmNsdXNpdmUpIHtcbiAgICAgICAgY29uc3QgYSA9IE1hdGguYWJzKGJvdW5kYXJ5KTtcbiAgICAgICAgaWYgKGEgPT09IDAgfHwgYSA9PT0gMSAmJiAhaW5jbHVzaXZlKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGlmIChpbmNsdXNpdmUpXG4gICAgICAgICAgICBib3VuZGFyeSArPSBib3VuZGFyeSAvIGE7XG4gICAgICAgIHJldHVybiByKGJvdW5kYXJ5KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXJyYXlDb3B5KHNvdXJjZSkge1xuICAgICAgICBjb25zdCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBpbml0aWFsaXplKGxlbik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IHNvdXJjZVtpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgZnJvbSAwIHRvIHRoZSBtYXhFeGNsdXNpdmUuXG4gICAgICogTmVnYXRpdmUgbnVtYmVycyBhcmUgYWxsb3dlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXhFeGNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGludGVnZXIobWF4RXhjbHVzaXZlKSB7XG4gICAgICAgIHJldHVybiBuZXh0KG1heEV4Y2x1c2l2ZSk7XG4gICAgfVxuICAgIFJhbmRvbS5pbnRlZ2VyID0gaW50ZWdlcjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgcmFuZG9tIGZsb2F0aW5nIHBvaW50IG51bWJlcnMgdXAgdG8gdGhlIG1heEV4Y2x1c2l2ZSB2YWx1ZS5cbiAgICAgKiBVc2VmdWwgZm9yIGdlbmVyYXRpbmcgYSByYW5kb20gYW5kIG1lbW9pemFibGUgc2V0IGZvciB1c2Ugd2l0aCBvdGhlciBlbnVtZXJhYmxlcy5cbiAgICAgKiBAcGFyYW0gbWF4RXhjbHVzaXZlXG4gICAgICogQHJldHVybnMgeygpPT5udW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGUobWF4RXhjbHVzaXZlID0gMSkge1xuICAgICAgICByZXR1cm4gKCkgPT4gcihtYXhFeGNsdXNpdmUpO1xuICAgIH1cbiAgICBSYW5kb20uZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbiAgICAoZnVuY3Rpb24gKGdlbmVyYXRlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgcmFuZG9tIGludGVnZXJzIHVwIHRvIHRoZSBib3VuZGFyeS5cbiAgICAgICAgICogVXNlZnVsIGZvciBnZW5lcmF0aW5nIGEgcmFuZG9tIGFuZCBtZW1vaXphYmxlIHNldCBmb3IgdXNlIHdpdGggb3RoZXIgZW51bWVyYWJsZXMuXG4gICAgICAgICAqIEBwYXJhbSBib3VuZGFyeVxuICAgICAgICAgKiBAcGFyYW0gaW5jbHVzaXZlXG4gICAgICAgICAqIEByZXR1cm5zIHsoKT0+bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gaW50ZWdlcnMoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IG5yKGJvdW5kYXJ5LCBpbmNsdXNpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGdlbmVyYXRlLmludGVnZXJzID0gaW50ZWdlcnM7XG4gICAgfSkoZ2VuZXJhdGUgPSBSYW5kb20uZ2VuZXJhdGUgfHwgKFJhbmRvbS5nZW5lcmF0ZSA9IHt9KSk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGZyb20gMCB0byB0aGUgYm91bmRhcnkuXG4gICAgICogUmV0dXJuIHZhbHVlIHdpbGwgYmUgbGVzcyB0aGFuIHRoZSBib3VuZGFyeSB1bmxlc3MgaW5jbHVzaXZlIGlzIHNldCB0byB0cnVlLlxuICAgICAqIE5lZ2F0aXZlIG51bWJlcnMgYXJlIGFsbG93ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYm91bmRhcnlcbiAgICAgKiBAcGFyYW0gaW5jbHVzaXZlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBuZXh0KGJvdW5kYXJ5LCBpbmNsdXNpdmUpIHtcbiAgICAgICAgYXNzZXJ0KGJvdW5kYXJ5LCAnYm91bmRhcnknKTtcbiAgICAgICAgcmV0dXJuIG5yKGJvdW5kYXJ5LCBpbmNsdXNpdmUpO1xuICAgIH1cbiAgICBSYW5kb20ubmV4dCA9IG5leHQ7XG4gICAgKGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGludGVnZXIoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5uZXh0KGJvdW5kYXJ5LCBpbmNsdXNpdmUpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQuaW50ZWdlciA9IGludGVnZXI7XG4gICAgICAgIGZ1bmN0aW9uIGZsb2F0KGJvdW5kYXJ5ID0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICAgICAgaWYgKGlzTmFOKGJvdW5kYXJ5KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBcIidib3VuZGFyeScgaXMgbm90IGEgbnVtYmVyLlwiO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiBib3VuZGFyeTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0LmZsb2F0ID0gZmxvYXQ7XG4gICAgICAgIGZ1bmN0aW9uIGluUmFuZ2UobWluLCBtYXgsIGluY2x1c2l2ZSkge1xuICAgICAgICAgICAgYXNzZXJ0KG1pbiwgJ21pbicpO1xuICAgICAgICAgICAgYXNzZXJ0KG1heCwgJ21heCcpO1xuICAgICAgICAgICAgbGV0IHJhbmdlID0gbWF4IC0gbWluO1xuICAgICAgICAgICAgaWYgKHJhbmdlID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBtaW47XG4gICAgICAgICAgICBpZiAoaW5jbHVzaXZlKVxuICAgICAgICAgICAgICAgIHJhbmdlICs9IHJhbmdlIC8gTWF0aC5hYnMocmFuZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIG1pbiArIHIocmFuZ2UpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQuaW5SYW5nZSA9IGluUmFuZ2U7XG4gICAgfSkobmV4dCA9IFJhbmRvbS5uZXh0IHx8IChSYW5kb20ubmV4dCA9IHt9KSk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiByYW5kb20gaW50ZWdlcnMuXG4gICAgICogQHBhcmFtIGNvdW50XG4gICAgICogQHBhcmFtIGJvdW5kYXJ5XG4gICAgICogQHBhcmFtIGluY2x1c2l2ZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnRlZ2Vycyhjb3VudCwgYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICBhc3NlcnQoY291bnQpO1xuICAgICAgICBjb25zdCBzID0gW107XG4gICAgICAgIHMubGVuZ3RoID0gY291bnQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgc1tpXSA9IG5yKGJvdW5kYXJ5LCBpbmNsdXNpdmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbiAgICBSYW5kb20uaW50ZWdlcnMgPSBpbnRlZ2VycztcbiAgICAvKipcbiAgICAgKiBTaHVmZmxlcyBhbiBhcnJheS5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHJldHVybnMge1R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5U2h1ZmZsZSh0YXJnZXQpO1xuICAgIH1cbiAgICBSYW5kb20uc2h1ZmZsZSA9IHNodWZmbGU7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgYW4gYXJyYXktbGlrZSAgYW5kIHJldHVybnMgaXQgc2h1ZmZsZWQuXG4gICAgICogQHBhcmFtIHNvdXJjZVxuICAgICAqIEByZXR1cm5zIHtUW119XG4gICAgICovXG4gICAgZnVuY3Rpb24gY29weShzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5U2h1ZmZsZShhcnJheUNvcHkoc291cmNlKSk7XG4gICAgfVxuICAgIFJhbmRvbS5jb3B5ID0gY29weTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZGlzdGluY3QgcmFuZG9tIHNldCBmcm9tIHRoZSBzb3VyY2UgYXJyYXkgdXAgdG8gdGhlIG1heENvdW50IG9yIHRoZSBmdWxsIGxlbmd0aCBvZiB0aGUgYXJyYXkuXG4gICAgICogQHBhcmFtIHNvdXJjZVxuICAgICAqIEBwYXJhbSBtYXhDb3VudFxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2VsZWN0KHNvdXJjZSwgbWF4Q291bnQpIHtcbiAgICAgICAgaWYgKG1heENvdW50ICE9PSBJbmZpbml0eSlcbiAgICAgICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihtYXhDb3VudCk7XG4gICAgICAgIHN3aXRjaCAobWF4Q291bnQpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzZWxlY3Qub25lKHNvdXJjZSwgdHJ1ZSldO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXJyYXlTaHVmZmxlKGFycmF5Q29weShzb3VyY2UpKTtcbiAgICAgICAgICAgICAgICBpZiAobWF4Q291bnQgPCByZXN1bHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubGVuZ3RoID0gbWF4Q291bnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSYW5kb20uc2VsZWN0ID0gc2VsZWN0O1xuICAgIChmdW5jdGlvbiAoc2VsZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uZShzb3VyY2UsIHRocm93SWZFbXB0eSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZSAmJiBzb3VyY2UubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiBzb3VyY2Vbcihzb3VyY2UubGVuZ3RoKV07XG4gICAgICAgICAgICBpZiAodGhyb3dJZkVtcHR5KVxuICAgICAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IHNlbGVjdCBmcm9tIGFuIGVtcHR5IHNldC5cIjtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3Qub25lID0gb25lO1xuICAgIH0pKHNlbGVjdCA9IFJhbmRvbS5zZWxlY3QgfHwgKFJhbmRvbS5zZWxlY3QgPSB7fSkpO1xufSkoUmFuZG9tIHx8IChSYW5kb20gPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmFuZG9tLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vUmFuZG9tLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG4vKipcbiAqIFJhbmRvbWl6ZSBhcnJheSBlbGVtZW50IG9yZGVyIGluLXBsYWNlLlxuICogVXNpbmcgRHVyc3RlbmZlbGQgc2h1ZmZsZSBhbGdvcml0aG0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaHVmZmxlKHRhcmdldCkge1xuICAgIGxldCBpID0gdGFyZ2V0Lmxlbmd0aDtcbiAgICB3aGlsZSAoLS1pKSB7XG4gICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgY29uc3QgdGVtcCA9IHRhcmdldFtpXTtcbiAgICAgICAgdGFyZ2V0W2ldID0gdGFyZ2V0W2pdO1xuICAgICAgICB0YXJnZXRbal0gPSB0ZW1wO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2h1ZmZsZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L3NodWZmbGUuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogT3JpZ2luOiBodHRwOi8vd3d3LmZhbGxpbmdjYW5iZWRlYWRseS5jb20vXG4gKiBMaWNlbnNpbmc6IE1JVFxuICovXG5pbXBvcnQgeyBSZWFkT25seUNvbGxlY3Rpb25CYXNlIH0gZnJvbSBcIi4vUmVhZE9ubHlDb2xsZWN0aW9uQmFzZVwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uL0ludGVnZXJcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIExhenlMaXN0IGV4dGVuZHMgUmVhZE9ubHlDb2xsZWN0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2VudW1lcmF0b3IgPSBzb3VyY2UuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICB0aGlzLl9jYWNoZWQgPSBbXTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZW51bWVyYXRvcjtcbiAgICAgICAgdGhpcy5fZW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgIGlmIChlKVxuICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIHRoaXMuX2NhY2hlZCA9IG51bGw7XG4gICAgICAgIGlmIChjKVxuICAgICAgICAgICAgYy5sZW5ndGggPSAwO1xuICAgIH1cbiAgICBfZ2V0Q291bnQoKSB7XG4gICAgICAgIHRoaXMuZmluaXNoKCk7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIHJldHVybiBjID8gYy5sZW5ndGggOiAwO1xuICAgIH1cbiAgICBfZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgY3VycmVudCA9IDA7XG4gICAgICAgIH0sIHlpZWxkZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnJlbnQgPCBjLmxlbmd0aCB8fCB0aGlzLmdldE5leHQoKSlcbiAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oY1tjdXJyZW50KytdKVxuICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQoaW5kZXgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4KTtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuX2NhY2hlZDtcbiAgICAgICAgd2hpbGUgKGMubGVuZ3RoIDw9IGluZGV4ICYmIHRoaXMuZ2V0TmV4dCgpKSB7IH1cbiAgICAgICAgaWYgKGluZGV4IDwgYy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gY1tpbmRleF07XG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJpbmRleFwiLCBcIkdyZWF0ZXIgdGhhbiB0b3RhbCBjb3VudC5cIik7XG4gICAgfVxuICAgIGluZGV4T2YoaXRlbSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBjID0gdGhpcy5fY2FjaGVkO1xuICAgICAgICBsZXQgcmVzdWx0ID0gYy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICB3aGlsZSAocmVzdWx0ID09IC0xICYmIHRoaXMuZ2V0TmV4dCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gaXRlbSlcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjLmxlbmd0aCAtIDE7XG4gICAgICAgIH0pKSB7IH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29udGFpbnMoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKGl0ZW0pICE9IC0xO1xuICAgIH1cbiAgICBnZXROZXh0KG91dCkge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZW51bWVyYXRvcjtcbiAgICAgICAgaWYgKCFlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlZC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChvdXQpXG4gICAgICAgICAgICAgICAgb3V0KHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9lbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZpbmlzaCgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dCgpKSB7IH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MYXp5TGlzdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0xhenlMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBDb2xsZWN0aW9uQmFzZSB9IGZyb20gXCIuL0NvbGxlY3Rpb25CYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmV4cG9ydCBjbGFzcyBSZWFkT25seUNvbGxlY3Rpb25CYXNlIGV4dGVuZHMgQ29sbGVjdGlvbkJhc2Uge1xuICAgIGdldENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q291bnQoKTtcbiAgICB9XG4gICAgZ2V0SXNSZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgX2FkZEludGVybmFsKGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfcmVtb3ZlSW50ZXJuYWwoZW50cnksIG1heCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgX2NsZWFySW50ZXJuYWwoKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RW51bWVyYXRvcigpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFJlYWRPbmx5Q29sbGVjdGlvbkJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZWFkT25seUNvbGxlY3Rpb25CYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvUmVhZE9ubHlDb2xsZWN0aW9uQmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==