const gulp = require("gulp");
const config = require("../config").fonts;

gulp.task("fonts", () => {
  return gulp
    .src(config.src)
    .pipe(process.USE_TEMP ? gulp.dest(config.temp) : gulp.dest(config.dest));
});
