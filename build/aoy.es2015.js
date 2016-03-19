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
 * @param {Object} [context = window] スクロールをロックするノード
 */
const noScrollFocus = function noScrollFocus(element, context) {
    context = context || window;
    var x = context.pageXOffset;
    var y = context.pageYOffset;
    element.focus();
    context.scroll(x, y);
};

const aoy = function aoy() {
};

aoy.version = version;

aoy._detectPointerType = _detectPointerType;
aoy.pointerType = _detectPointerType();

aoy._normalizeEventName = _normalizeEventName;
aoy.eventName = _normalizeEventName();

aoy.noScrollFocus = noScrollFocus;

export default aoy;