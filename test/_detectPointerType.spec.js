import assert from "power-assert";

describe("_detectPointerType()", () => {

    it("onpointerdown だけがある場合は pointer のみが true になること", () => {
        var obj = {
            onpointerdown: null
        };
        var result = aoy._detectPointerType(obj);
        assert(result.pointer === true);
        assert(result.mspointer === false);
        assert(result.touch === false);
    });

    it("onmspointerdown のみがある場合は mspointer のみが true になること", () => {
        var obj = {
            onmspointerdown: null
        };
        var result = aoy._detectPointerType(obj);
        assert(result.pointer === false);
        assert(result.mspointer === true);
        assert(result.touch === false);
    });

    it("ontouchstart のみがある場合は touch のみが true になること", () => {
        var obj = {
            ontouchstart: null
        };
        var result = aoy._detectPointerType(obj);
        assert(result.pointer === false);
        assert(result.mspointer === false);
        assert(result.touch === true);
    });

    it("onpointerdown と onmspointerdown の両方がある場合は pointer のみが true になること", () => {
        var obj = {
            onpointerdown: null,
            onmspointerdown: null
        };
        var result = aoy._detectPointerType(obj);
        assert(result.pointer === true);
        assert(result.mspointer === false);
        assert(result.touch === false);
    });

    it("onpointerdown と ontouchstart の両方がある場合は pointer と touch の両方が true になること", () => {
        var obj = {
            onpointerdown: null,
            ontouchstart: null
        };
        var result = aoy._detectPointerType(obj);
        assert(result.pointer === true);
        assert(result.mspointer === false);
        assert(result.touch === true);
    });
});
