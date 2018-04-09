const gulp = require("gulp");
const config = require("../config");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const gutil = require("gulp-util");
const size = require("gulp-size");
const csso = require("gulp-csso");
const wait = require("gulp-wait");
const options = require("minimist")(process.argv.slice(2));

gulp.task("styles", () => {
  return gulp
    .src(config.styles.files_src)
    .pipe(wait(100))
    .pipe(
      plumber({
        errorHandler: notify.onError("SASS Error: <%= error.message %>"),
      })
    )
    .pipe(!options.production ? sourcemaps.init() : gutil.noop())
    .pipe(
      sass({
        precision: 10,
        options: {
          include: ["./bower_components/../", "./node_modules/../"],
        },
      })
    )
    .pipe(autoprefixer({ browsers: ["last 2 versions"] }))
    .pipe(!options.production ? sourcemaps.write(".") : gutil.noop())
    .pipe(options.production ? csso() : gutil.noop())
    .pipe(size({ title: "style" }))
    .pipe(
      process.USE_TEMP
        ? gulp.dest(config.styles.temp)
        : gulp.dest(config.styles.dest)
    );
});
