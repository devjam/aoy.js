import assert from "power-assert";

describe("noScrollFocus()", () => {
    var anchor;

    beforeEach(function () {
        document.body.innerHTML = window.__html__["test/fixtures/noScrollFocus.html"];
        anchor = document.getElementById("anchor");
        window.scrollTo(0, 0);
    });

    afterEach(function () {
        document.body.innerHTML = "";
    });

    it("普通にフォーカスしたらスクロール位置は 0 より大きくなること", () => {
        var scrollY1;
        var scrollY2;
        scrollY1 = window.scrollY;
        anchor.focus();
        scrollY2 = window.scrollY;
        assert(scrollY1 === 0);
        assert(scrollY2 > 0);
    });

    it("noScrollFocus() でフォーカスしたらスクロール位置は 0 のままであること", () => {
        var scrollY1;
        var scrollY2;
        scrollY1 = window.scrollY;
        aoy.noScrollFocus(anchor);
        scrollY2 = window.scrollY;
        assert(scrollY1 === 0);
        assert(scrollY2 === 0);
    });
});
