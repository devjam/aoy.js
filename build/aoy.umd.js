(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define('aoy', factory) :
        (global.aoy = factory());
}(this, function() {
    'use strict';

    (function() {
        var El = window.Element;
        var ElProto = El.prototype;
        ElProto.matches || function() {
            ElProto.matches = ElProto.matchesSelector || ElProto.webkitMatchesSelector || ElProto.msMatchesSelector || ElProto.mozMatchesSelector;
        }();
    })();

    /*!
     Array.from polyfill
     https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from
     Any copyright is dedicated to the Public Domain.
     http://creativecommons.org/publicdomain/zero/1.0/
     */
    (function() {
        if (!Array.from) {
            Array.from = function() {
                var toStr = Object.prototype.toString;
                var isCallable = function isCallable(fn) {
                    return typeof fn === "function" || toStr.call(fn) === "[object Function]";
                };
                var toInteger = function toInteger(value) {
                    var number = Number(value);
                    if (isNaN(number)) {
                        return 0;
                    }
                    if (number === 0 || !isFinite(number)) {
                        return number;
                    }
                    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
                };
                var maxSafeInteger = Math.pow(2, 53) - 1;
                var toLength = function toLength(value) {
                    var len = toInteger(value);
                    return Math.min(Math.max(len, 0), maxSafeInteger);
                };

                return function from(arrayLike /*, mapFn, thisArg */ ) {
                    var C = this;
                    var items = Object(arrayLike);

                    if (arrayLike == null) {
                        throw new TypeError("Array.from requires an array-like object - not null or undefined");
                    }

                    var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                    var T;
                    if (typeof mapFn !== "undefined") {
                        if (!isCallable(mapFn)) {
                            throw new TypeError("Array.from: when provided, the second argument must be a function");
                        }

                        if (arguments.length > 2) {
                            T = arguments[2];
                        }
                    }

                    var len = toLength(items.length);
                    var A = isCallable(C) ? Object(new C(len)) : new Array(len);
                    var k = 0;
                    var kValue;
                    while (k < len) {
                        kValue = items[k];
                        if (mapFn) {
                            A[k] = typeof T === "undefined" ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                        } else {
                            A[k] = kValue;
                        }
                        k += 1;
                    }
                    A.length = len;
                    return A;
                };
            }();
        }
    })();

    var version = "0.0.1";

    /**
     * PointerEvent, MSPointerEvents, TouchEvent を判定する。
     * PointerEvent と MSPointerEvents はどちらかのみ true になる。
     * @param {Object} [root = window]
     * @returns {{pointer: boolean, mspointer: boolean, touch: boolean}}
     * @private
     */
    var _detectPointerType = function _detectPointerType(root) {
        root = root || window;
        var pointerEnabled = "onpointerdown" in root;
        var msPointerEnabled = "onmspointerdown" in root;
        var touchEnabled = "ontouchstart" in root || root.DocumentTouch && document instanceof DocumentTouch;
        var mqMozTouchEnabled = function mqMozTouchEnabled() {
            var mM = window.matchMedia;
            if (!mM) {
                return false;
            }
            return mM("(-moz-touch-enabled: 1)").matches;
        };

        return {
            pointer: pointerEnabled,
            mspointer: !pointerEnabled && msPointerEnabled,
            touch: touchEnabled || mqMozTouchEnabled()
        };
    };

    /**
     * wheel, transitionend, animation* イベントをノーマライズする。
     * @param {Object} [root = window]
     * @returns {{wheel: string, transitionend: string, animationstart: string, animationiteration: string, animationend: string}}
     * @private
     */
    var _normalizeEventName = function _normalizeEventName(root) {
        root = root || window;
        var hasWebkitTransitionEvent = "WebKitTransitionEvent" in root;
        var hasTransitionEvent = "TransitionEvent" in root;
        var hasWebkitAnimationEvent = "WebKitAnimationEvent" in root;
        var hasAnimationEvent = "AnimationEvent" in root;

        var result = {
            wheel: "onwheel" in root ? "wheel" : "mousewheel",
            transitionend: "transitionend",
            animationstart: "animationstart",
            animationiteration: "animationiteration",
            animationend: "animationend"
        };

        if (!hasTransitionEvent && hasWebkitTransitionEvent) {
            result.transitionend = "webkitTransitionEnd";
        }

        if (!hasAnimationEvent && hasWebkitAnimationEvent) {
            result.animationstart = "webkitAnimationStart";
            result.animationiteration = "webkitAnimationIteration";
            result.animationend = "webkitAnimationEnd";
        }

        return result;
    };

    /**
     * スクロールを発生させずに要素にフォーカスする
     * @param {Object} element フォーカスする要素
     * @param {Object} [context = window] スクロールをロックするノード
     */
    var noScrollFocus = function noScrollFocus(element, context) {
        context = context || window;
        var x = context.pageXOffset;
        var y = context.pageYOffset;
        element.focus();
        context.scroll(x, y);
    };

    var aoy = function aoy() {};

    aoy.version = version;

    aoy._detectPointerType = _detectPointerType;
    aoy.pointerType = _detectPointerType();

    aoy._normalizeEventName = _normalizeEventName;
    aoy.eventName = _normalizeEventName();

    aoy.noScrollFocus = noScrollFocus;

    return aoy;

}));
