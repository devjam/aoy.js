(function () {
    var El = window.Element;
    if (El && !El.prototype.matches) {
        let proto = El.prototype;
        proto.matches = proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
    }
})();
