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

export default _normalizeEventName;
