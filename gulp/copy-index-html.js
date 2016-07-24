(() => {
    /// <summary>Gulp task for injecting the necessary JS/CSS files to index.html and placing it into the dist folder</summary>

    // Require npm dependencies
    var gulp = require("gulp");
    var config = require("./build.config");
    var inject = require("gulp-inject");

    module.exports = () => {
        /// <summary>Copy the index.html file from source to dist and inject all necessary dependencies</summary>
        /// <return type="Function"></return>

        var srcHtml = config.src + "/" + config.indexHtml;
        var libJsFiles = config.dist + "/" + config.libsDistFolder + "/**/*.js";
        var cssFiles = config.dist + "/" + config.cssDistFolder + "/**/*.css";
        var appJsFile = config.dist + "/" + config.jsApp;
        return gulp.src(srcHtml)
            .pipe(inject(gulp.src(libJsFiles, {read: false}), {name: "libs", relative: true}))
            .pipe(inject(gulp.src(cssFiles, {read: false}), {relative: true}))
            .pipe(inject(gulp.src(appJsFile, {read: false}), {name: "app", relative: true}))
            .pipe(gulp.dest(config.dist));
    }
})();
