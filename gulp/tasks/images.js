const gulp = require("gulp");
const config = require("../config").images;
const imagemin = require("gulp-imagemin");
const size = require("gulp-size");
const plumber = require("gulp-plumber");
const gutil = require("gulp-util");
const notify = require("gulp-notify");
const options = require("minimist")(process.argv.slice(2));

gulp.task("images", () => {
  return gulp
    .src(config.files_src)
    .pipe(
      plumber({
        errorHandler: notify.onError("Images Error: <%= error.message %>"),
      })
    )
    .pipe(
      options.production
        ? imagemin(
            [
              imagemin.gifsicle({ interlaced: true }),
              imagemin.jpegtran({ progressive: true }),
              imagemin.optipng({ optimizationLevel: 5 }),
              imagemin.svgo({
                plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
              }),
            ],
            {
              verbose: true,
            }
          )
        : gutil.noop()
    )
    .pipe(
      size({
        title: "image",
      })
    )
    .pipe(process.USE_TEMP ? gulp.dest(config.temp) : gulp.dest(config.dest));
});
