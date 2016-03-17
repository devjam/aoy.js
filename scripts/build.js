"use strict";

const fs = require("fs");
const del = require("del");
const rollup = require("rollup");
const json = require("rollup-plugin-json");
const babel = require("rollup-plugin-babel");
const beautify = require("js-beautify").js_beautify;
const pkg = require("../package.json");

const pkgName = pkg["name"];
const buildFormats = ["umd", "es6"];

del([pkg["main"], pkg["jsnext:main"]]).then((paths) => {
    if (paths.length) {
        console.log(`Files and folders that would be deleted:\n${paths.join("\n")}`);
    }
    build();
});

function build() {
    buildFormats.forEach((val) => {
        var options = getRollupOptions(val);
        rollup.rollup(options).then((bundle) => {
            var callback;
            if (val !== "es6") {
                callback = function (dest) {
                    beautifier(dest, function () {
                        console.log(`Build complete: ${pkg["main"]}`);
                    });
                }
            } else {
                callback = function () {
                    console.log(`Build complete: ${pkg["jsnext:main"]}`);
                }
            }
            writeBundle(bundle, val, callback);
        });
    });
}

function getRollupOptions(buildType) {
    var options = {
        entry: `./src/index.js`,
        plugins: [
            json()
        ]
    };
    if (buildType !== "es6") {
        let babelOpts = babel({
            presets: ["es2015-rollup"],
            exclude: "node_modules/**"
        });
        options.plugins.push(babelOpts);
    }
    return options;
}

function writeBundle(bundle, buildType, callback) {
    var options = {
        format: buildType
    };

    if (buildType === "es6") {
        options.dest = pkg["jsnext:main"];
    } else {
        options.dest = pkg["main"];
        options.moduleId = options.moduleName = pkgName;
    }

    bundle.write(options);

    if (typeof callback === "function") {
        callback(options.dest);
    }
}

function beautifier(filePath, callback) {
    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
            throw err;
        }
        var beautified = beautify(data, {
            "indent_size": 4,
            "max_preserve_newlines": 2,
            "wrap_attributes_indent_size": 4,
            "end_with_newline": true
        });
        fs.writeFile(filePath, beautified, "utf8", (err) => {
            if (err) {
                throw err;
            }
            if (typeof callback === "function") {
                callback();
            }
        });
    });
}
