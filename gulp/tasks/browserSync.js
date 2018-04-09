const gulp = require("gulp");
const config = require("../config");
const browserSync = require("browser-sync");

gulp.task("browserSync", () => {
  browserSync({
    notify: false,
    open: false,
    server: process.USE_TEMP ? config.temp : config.build,
    files: process.USE_TEMP ? [config.temp + "/**/*.css"] : [config.build + "/**/*.css"],
  });
});

gulp.task("browserSync-reload", () => {
  browserSync.reload();
});
