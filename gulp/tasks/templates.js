const gulp = require("gulp");
const config = require("../config").templates;
const pug = require("gulp-pug");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const gutil = require("gulp-util");
const size = require("gulp-size");

gulp.task("templates", () => {
  return gulp
    .src(config.page_src)
    .pipe(
      plumber({
        errorHandler: notify.onError("PUG Error: <%= error.message %>"),
      })
    )
    .pipe(pug({ pretty: true }))
    .pipe(size({ title: "template" }))
    .pipe(process.USE_TEMP ? gulp.dest(config.temp) : gulp.dest(config.dest));
});
