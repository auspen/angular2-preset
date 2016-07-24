(() => {
    /// <summary>Gulp task for compiling TS=>JS and placing the output to the dist folder</summary>

    // Require npm dependencies
    var gulp = require("gulp");
    var config = require("./build.config");
    var browserify = require("browserify");
    var source = require('vinyl-source-stream');
    var tsify = require("tsify");
    var buffer = require("vinyl-buffer");

    module.exports = () => {
        /// <summary>build and concatenate the TS files into a single app.js file</summary>
        /// <return type="Function"></return>

        return browserify({
            debug: true,
            entries: config.tsApp,
            extensions: ['.js', '.ts']
        })
            .plugin(tsify)
            .bundle()
            .pipe(source(config.jsApp))
            .pipe(buffer())
            .pipe(gulp.dest(config.dist));
    }
})();
