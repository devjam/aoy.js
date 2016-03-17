import assert from "power-assert";

describe("_normalizeEventName()", () => {

    it("wheel イベント", () => {
        var obj1 = {
            onwheel: null
        };
        var obj2 = {
            onmousewheel: null
        };
        var obj3 = {
            onwheel: null,
            onmousewheel: null
        };
        var result1 = aoy._normalizeEventName(obj1);
        var result2 = aoy._normalizeEventName(obj2);
        var result3 = aoy._normalizeEventName(obj3);
        assert(result1.wheel === "wheel");
        assert(result2.wheel === "mousewheel");
        assert(result3.wheel === "wheel");
    });

    it("transitionend イベント", () => {
        var obj1 = {
            "TransitionEvent": null
        };
        var obj2 = {
            "WebKitTransitionEvent": null
        };
        var obj3 = {
            "TransitionEvent": null,
            "WebKitTransitionEvent": null
        };
        var result1 = aoy._normalizeEventName(obj1);
        var result2 = aoy._normalizeEventName(obj2);
        var result3 = aoy._normalizeEventName(obj3);
        assert(result1.transitionend === "transitionend");
        assert(result2.transitionend === "webkitTransitionEnd");
        assert(result3.transitionend === "transitionend");
    });

    it("animation* イベント", () => {
        var obj1 = {
            "AnimationEvent": null
        };
        var obj2 = {
            "WebKitAnimationEvent": null
        };
        var obj3 = {
            "AnimationEvent": null,
            "WebKitAnimationEvent": null
        };
        var result1 = aoy._normalizeEventName(obj1);
        var result2 = aoy._normalizeEventName(obj2);
        var result3 = aoy._normalizeEventName(obj3);
        assert(result1.animationend === "animationend");
        assert(result2.animationend === "webkitAnimationEnd");
        assert(result3.animationend === "animationend");
    });
});
