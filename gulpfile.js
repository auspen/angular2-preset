(() => {
    /// <summary>Main gulp file for building application</summary>

    // Require npm dependencies
    var gulp = require("gulp");
    var runSequence = require("gulp-run-sequence");

    // Require custom gulp build methods
    var buildCss = require("./gulp/build-css");
    var copyAssets = require("./gulp/copy-assets");
    var copyIndexHtml = require("./gulp/copy-index-html");
    var copyJsLibs = require("./gulp/copy-js-libs");
    var compileJsApp = require("./gulp/compile-js-app");

    // Assign gulp tasks to gulp build methods
    gulp.task("build-css", buildCss);
    gulp.task("copy-assets", copyAssets);
    gulp.task("copy-index-html", copyIndexHtml);
    gulp.task("copy-js-libs", copyJsLibs);
    gulp.task("compile-js-app", compileJsApp);


    gulp.task("test", ()=> {
        /// <summary>Compile SASS sources into a single app.css file</summary>
        /// <return type="Function"></return>
    });

    // Create main build methods
    gulp.task("release-build", (cb) => {
        runSequence(["compile-js-app", "copy-js-libs", "build-css", "copy-assets"], "copy-index-html", cb);
    });

    // Register the default build task
    gulp.task("default", ["release-build"]);
})();
