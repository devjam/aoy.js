import assert from "power-assert";

describe("Element.prototype.matches polyfill", () => {
    it("window に Element.prototype.matches が存在すること", () => {
        assert("matches" in window.Element.prototype === true);
        assert(typeof window.Element.prototype.matches === "function");
    });
});
