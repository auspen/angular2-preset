var gulp = require("gulp");
var config = require("./gulp/build.config.js")();
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var buffer = require("vinyl-buffer");
var runSequence = require("gulp-run-sequence");
var inject = require("gulp-inject");
var sass = require("gulp-sass");
var concat = require("gulp-concat");

gulp.task("build-css", () => {
    /// <summary>Compile SASS sources into a single app.css file</summary>
    /// <return type="Function"></return>

    var scssSourceFiles = config.src + "/**/*.scss";
    var cssDistPath = config.dist + "/" + config.cssDistFolder;

    return gulp.src(scssSourceFiles)
        .pipe(sass().on("error", sass.logError))
        .pipe(concat(config.cssDistFile))
        .pipe(gulp.dest(cssDistPath))
});

gulp.task("copy-assets", () => {
    /// <summary>Copy assets, including images,ico, etc. to the dist folder</summary>
    /// <return type="Function"></return>
    var assetsSrcFiles = config.src + "/" + config.assetsFolder + "/**/*";
    var assetsDistPath = config.dist + "/" + config.assetsFolder;

    return gulp.src(assetsSrcFiles)
        .pipe(gulp.dest(assetsDistPath));
});

gulp.task("test", ()=> {
    /// <summary>Compile SASS sources into a single app.css file</summary>
    /// <return type="Function"></return>
});

gulp.task("copy-html", () => {
    /// <summary>Copy the index.html file from source to dist and inject all necessary dependencies</summary>
    /// <return type="Function"></return>

    var srcHtml = config.src + "/" + config.indexHtml;
    var libJsFiles = config.dist  + "/" + config.libsDistFolder + "/**/*.js";
    var cssFiles = config.dist  + "/" + config.cssDistFolder + "/**/*.css";
    var appJsFile = config.dist  + "/" + config.jsApp;
    return gulp.src(srcHtml)
        .pipe(inject(gulp.src(libJsFiles, { read: false }), { name: "libs", relative: true } ))
        .pipe(inject(gulp.src(cssFiles, { read: false }), { relative: true }))
        .pipe(inject(gulp.src(appJsFile, { read: false }), { name: "app", relative: true }))
        .pipe(gulp.dest(config.dist));
});

gulp.task("copy-js-libs", () => {
    /// <summary>copy the necessary JS libs into the dist folder</summary>
    /// <return type="Function"></return>

    var libsDistPath = config.dist + "/" + config.libsDistFolder;
    return gulp.src(config.libFiles)
        .pipe(gulp.dest(libsDistPath));
});

gulp.task("build-js-app", () => {
    /// <summary>build and concatenate the TS files into a single app.js file</summary>
    /// <return type="Function"></return>

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

gulp.task("default", (cb) => {
    runSequence(["build-js-app", "copy-js-libs", "build-css", "copy-assets"], "copy-html", cb);
});