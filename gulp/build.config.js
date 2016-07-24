( () => {
    /// <summary>Configuration file for the Gulp build</summary>

    module.exports = Object.freeze({
        tsApp: "./src/app.ts",
        dist: "./dist",
        jsApp: "app.js",
        indexHtml: "index.html",
        tsFiles: './src/**/*.ts',
        typings: "./typings/**/*d.ts",
        ngTypings: "./node_modules/@angular/**/*.ts",
        src: "./src",
        libFiles: [
            "./node_modules/core-js/client/shim.min.js",
            "./node_modules/zone.js/dist/zone.js",
            "./node_modules/reflect-metadata/Reflect.js"
        ],
        libsDistFolder: "libs",
        cssDistFolder: "css",
        cssDistFile: "app.css",
        assetsFolder: "assets"
    })
})();
