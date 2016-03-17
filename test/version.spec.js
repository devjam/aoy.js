import assert from "power-assert";
import pkg from "../package.json";

describe("version", () => {

    it("ライブラリーのバージョン情報はパッケージのバージョンと同じであること", () => {
        assert(aoy.version === pkg.version);
    });
});
