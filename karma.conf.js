"use strict";

module.exports = function (config) {

    config.set({
        basePath: "",
        frameworks: ["mocha", "browserify", "fixture"],
        files: [
            require("./package.json").main,
            "./test/**/*.spec.js",
            "./test/fixtures/*.html"
        ],
        exclude: [
            "node_modules"
        ],
        preprocessors: {
            "test/fixtures/*.html": "html2js",
            "test/*.spec.js": "browserify"
        },
        browserify: {
            debug: true,
            transform: [
                ["babelify", {
                    presets: ["es2015"],
                    plugins: ["babel-plugin-espower"]
                }]
            ]
        },
        reporters: ["mocha"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [
            "Chrome"
            //"Firefox",
            //"Safari"
        ],
        customLaunchers: {
            IE11: {
                base: 'IE',
                'x-ua-compatible': 'IE=11'
            },
            IE10: {
                base: 'IE',
                'x-ua-compatible': 'IE=10'
            },
            IE9: {
                base: 'IE',
                'x-ua-compatible': 'IE=9'
            }
        },
        singleRun: true,
        concurrency: Infinity
    })
};
