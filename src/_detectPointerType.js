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

export default _detectPointerType;
