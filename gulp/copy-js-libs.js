(() => {
    /// <summary>Gulp task for copying the necessary JS libs to the dist folder</summary>

    // Require npm dependencies
    var gulp = require("gulp");
    var config = require("./build.config");

    module.exports = () => {
        /// <summary>copy the necessary JS libs into the dist folder</summary>
        /// <return type="Function"></return>

        var libsDistPath = config.dist + "/" + config.libsDistFolder;
        return gulp.src(config.libFiles)
            .pipe(gulp.dest(libsDistPath));
    }
})();
