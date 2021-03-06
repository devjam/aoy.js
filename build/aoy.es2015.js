(function () {
    var El = window.Element;
    var ElProto = El.prototype;
    ElProto.matches || (function () {
        ElProto.matches =
            ElProto.matchesSelector ||
            ElProto.webkitMatchesSelector ||
            ElProto.msMatchesSelector ||
            ElProto.mozMatchesSelector;
    })();
})();

/*!
 Array.from polyfill
 https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from
 Any copyright is dedicated to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 */
(function () {
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {
                return typeof fn === "function" || toStr.call(fn) === "[object Function]";
            };
            var toInteger = function (value) {
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
            var toLength = function (value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            return function from(arrayLike/*, mapFn, thisArg */) {
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
        }());
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
const _detectPointerType = function _detectPointerType(root) {
    root = root || window;
    var pointerEnabled = "onpointerdown" in root;
    var msPointerEnabled = "onmspointerdown" in root;
    var touchEnabled = "ontouchstart" in root  || root.DocumentTouch && document instanceof DocumentTouch;
    var mqMozTouchEnabled = function mqMozTouchEnabled() {
        var mM = window.matchMedia;
        if (!mM) {
            return false;
        }
        return mM("(-moz-touch-enabled: 1)").matches
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
const _normalizeEventName = function _normalizeEventName(root) {
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
 */
const noScrollFocus = function noScrollFocus(element) {
    var x = window.scrollX || window.pageXOffset;
    var y = window.scrollY || window.pageYOffset;
    element.focus();
    window.scroll(x, y);
};

/**
 * フォーカス可能な要素のセレクター文字列
 * @type {string}
 */
const focusableElementsSelectors = `a[href]:not([tabindex^="-"]),
area[href]:not([tabindex^="-"]),
input:not([disabled]):not([tabindex^="-"]),
select:not([disabled]):not([tabindex^="-"]),
textarea:not([disabled]):not([tabindex^="-"]),
button:not([disabled]):not([tabindex^="-"]),
iframe:not([tabindex^="-"]),
object:not([tabindex^="-"]),
embed:not([tabindex^="-"]),
[tabindex]:not([tabindex^="-"]),
[contentEditable]:not([tabindex^="-"])`;

/**
 * フォーカス可能な要素を全て取得する。
 * 取得したものと除外したものの両方を返す
 * @param {String} excludeSelectors 除外するセレクターの文字列
 * @param {Document|Element} [context = document]
 * @returns {{focusable: Array.<Element>, excluded: Array.<Element>}}
 */
const getFocusableElements = function getFocusableElements(excludeSelectors, context) {
    var focusableElementsAll;
    var focusableElements = [];
    var excludeElements = [];

    context = context || document;
    focusableElementsAll = context.querySelectorAll(focusableElementsSelectors);

    if (!excludeSelectors) {
        focusableElements = Array.from(focusableElementsAll);
    } else {
        let i = 0;
        let iz = focusableElementsAll.length;
        for (; i < iz; i = i + 1) {
            let element = focusableElementsAll[i];
            if (element.matches(excludeSelectors)) {
                excludeElements.push(element);
                continue;
            }
            focusableElements.push(element);
        }
    }
    return {
        focusable: focusableElements,
        excluded: excludeElements
    }
};

const aoy = function aoy() {
};

aoy.version = version;

aoy._detectPointerType = _detectPointerType;
aoy.pointerType = _detectPointerType();

aoy._normalizeEventName = _normalizeEventName;
aoy.eventName = _normalizeEventName();

aoy.noScrollFocus = noScrollFocus;

aoy.getFocusableElements = getFocusableElements;

export default aoy;