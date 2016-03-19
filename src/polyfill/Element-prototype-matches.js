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
