(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define('aoy', factory) :
        (global.aoy = factory());
}(this, function() {
    'use strict';

    var version = "0.0.1";

    var aoy = function aoy() {};

    aoy.version = version;

    return aoy;

}));
