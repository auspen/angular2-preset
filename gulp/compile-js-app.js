(() => {
    /// <summary>Gulp task for compiling TS=>JS and placing the output to the dist folder</summary>

    // Require npm dependencies
    var gulp = require("gulp");
    var config = require("./build.config");
    var browserify = require("browserify");
    var source = require('vinyl-source-stream');
    var tsify = require("tsify");
    var buffer = require("vinyl-buffer");
    var gulpIf = require("gulp-if");
    var uglify = require("gulp-uglify");

    module.exports = {
        compileReleaseApp: compileApp.bind(null, false),
        compileDebugApp: compileApp.bind(null, true)
    }

    function compileApp(debugBuild) {
        /// <summary>Build and concatenate the TS files into a single app.js file</summary>
        /// <param name="debugBuild" type="Boolean">Determine if source maps for TS files needed</param>
        /// <return type="Function"></return>

        return browserify({
            debug: debugBuild,
            entries: config.tsApp,
            extensions: ['.js', '.ts']
        })
            .plugin(tsify)
            .bundle()
            .pipe(source(config.jsApp))
            .pipe(buffer())
            .pipe(gulpIf(!debugBuild, uglify()))
            .pipe(gulp.dest(config.dist));
    }
})();
