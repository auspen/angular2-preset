(() => {
    /// <summary>Gulp task compiling SCSS=>CSS and placing the output to the dist folder</summary>

    // Require npm dependencies

    var gulp = require("gulp");
    var config = require("./build.config");
    var sass = require("gulp-sass");
    var concat = require("gulp-concat");
    var cleanCss = require("gulp-clean-css");

    module.exports = () => {
        /// <summary>Compile SASS sources into a single app.css file</summary>
        /// <return type="Function"></return>

        var scssSourceFiles = config.src + "/**/*.scss";
        var cssDistPath = config.dist + "/" + config.cssDistFolder;

        return gulp.src(scssSourceFiles)
            .pipe(sass().on("error", sass.logError))
            .pipe(concat(config.cssDistFile))
            .pipe(cleanCss())
            .pipe(gulp.dest(cssDistPath))
    }
})();
