import assert from "power-assert";

describe("getFocusableElements()", () => {
    before(function () {
        document.body.innerHTML = window.__html__["test/fixtures/getFocusableElements.html"];
    });

    after(function () {
        document.body.innerHTML = "";
    });

    it("フォーカス可能な要素を配列で返せていること", () => {
        var result = aoy.getFocusableElements();
        assert(Array.isArray(result.focusable) === true);
        assert(result.focusable.length === 5)
    });

    it("除外指定した要素が正しく除外され、除外された要素を配列で返せていること", () => {
        var result = aoy.getFocusableElements("a");
        assert(result.focusable.length === 3);
        assert(Array.isArray(result.excluded) === true);
        assert(result.excluded.length === 2);
    });

    it("指定コンテキストで機能すること", () => {
        var result = aoy.getFocusableElements(null, document.getElementById("root"));
        assert(result.focusable.length === 1);
        assert(result.excluded.length === 0);
    });
});
