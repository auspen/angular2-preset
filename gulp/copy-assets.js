(() => {
    /// <summary>Gulp task for copying assets to the dist folder</summary>

    // Require npm dependencies
    var gulp = require("gulp");
    var config = require("./build.config");

    module.exports = () => {
        /// <summary>Copy assets, including images,ico, etc. to the dist folder</summary>
        /// <return type="Function"></return>
        var assetsSrcFiles = config.src + "/" + config.assetsFolder + "/**/*";
        var assetsDistPath = config.dist + "/" + config.assetsFolder;

        return gulp.src(assetsSrcFiles)
            .pipe(gulp.dest(assetsDistPath));
    }
})();
