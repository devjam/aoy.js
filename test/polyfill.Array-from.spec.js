import assert from "power-assert";

describe("Array.from polyfill", () => {

    it("Array に from メソッドが存在すること", () => {
        assert("from" in Array === true);
    });

    it("引数を配列に変換できていること", () => {
        var fixtureArr = ["a", "b", "c"];
        var fn = function () {
            return Array.from(arguments);
        };
        var result = fn("a", "b", "c");
        assert(Array.isArray(result) === true);
        assert(result[0] === fixtureArr[0]);
        assert(result[1] === fixtureArr[1]);
        assert(result[2] === fixtureArr[2]);
    });

    it("ノードリストを配列に変換できていること", () => {
        var body = document.querySelectorAll("body");
        var result = Array.from(body);
        assert(Array.isArray(result) === true);
        assert(result[0] === body[0]);
    });
});
