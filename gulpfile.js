var gulp = require("gulp");
var config = require("./gulp.config")();
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var buffer = require("vinyl-buffer");

gulp.task("build-js-app", () => {
    return browserify({
        debug: true,
        entries: config.tsApp,
        extensions: ['.js', '.json', '.ts']
    })
    .plugin(tsify)
    .bundle()
    .pipe(source(config.jsApp))
    .pipe(buffer())
    .pipe(gulp.dest(config.dist));
});

gulp.task("default", ["build-js-app"]);