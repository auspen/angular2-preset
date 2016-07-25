(() => {
    /// <summary>Main gulp file for building application</summary>

    // Require npm/gulp dependencies
    var gulp = require("gulp");
    var runSequence = require("gulp-run-sequence");
    var watch = require("gulp-watch");

    // Require custom gulp build methods
    var buildCss = require("./gulp/build-css");
    var copyAssets = require("./gulp/copy-assets");
    var copyIndexHtml = require("./gulp/copy-index-html");
    var copyJsLibs = require("./gulp/copy-js-libs");
    var compileJsApp = require("./gulp/compile-js-app");

    // Require build configuration file
    var config = require("./gulp/build.config");

    // Assign gulp tasks to gulp build methods
    gulp.task("build-css", buildCss);
    gulp.task("copy-assets", copyAssets);
    gulp.task("copy-index-html", copyIndexHtml);
    gulp.task("copy-js-libs", copyJsLibs);
    gulp.task("compile-debug-js-app", compileJsApp.compileDebugApp);
    gulp.task("compile-release-js-app", compileJsApp.compileReleaseApp);

    gulp.task("test", ()=> {
        /// <summary>Compile SASS sources into a single app.css file</summary>
        /// <return type="Function"></return>
    });

    // Create sequential tasks
    function debugBuild(cb) {
        /// <summary>Run a sequence of tasks for the debug build</summary>
        runSequence(["compile-debug-js-app", "copy-js-libs", "build-css", "copy-assets"], "copy-index-html", cb);
    }

    function releaseBuild(cb) {
        /// <summary>Run a sequence of tasks for the release build</summary>
        runSequence(["compile-release-js-app", "copy-js-libs", "build-css", "copy-assets"], "copy-index-html", cb);
    }

    // Create the debug build task
    gulp.task("debug-build", debugBuild);

    // Create the production build task
    gulp.task("release-build", releaseBuild);

    // Create the watch task
    gulp.task("watch", () => {
        var srcFiles = [
            config.src + "/**/*",
            "!" + config.src + "/**/*tmp*"
        ];
        return watch(srcFiles, debugBuild.bind(null, "watch"));
    });

    // Register the default build task
    gulp.task("default", ["release-build"]);
})();
