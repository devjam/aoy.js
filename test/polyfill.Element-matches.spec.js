import assert from "power-assert";

describe("Element.matches polyfill", () => {
    it("window に Element.prototype.matches が存在すること", () => {
        assert("matches" in window.Element.prototype === true);
    });
});
