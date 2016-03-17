(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define('aoy', factory) :
        (global.aoy = factory());
}(this, function() {
    'use strict';

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

    var aoy = function aoy() {};

    aoy.version = version;

    aoy._detectPointerType = _detectPointerType;
    aoy.pointerType = _detectPointerType();

    return aoy;

}));
