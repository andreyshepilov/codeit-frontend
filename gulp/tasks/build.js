const gulp = require("gulp");
const runSequence = require("run-sequence");

gulp.task("build", callback => {
  runSequence(
    "clean",
    ["styles", "templates", "images", "fonts", "scripts"],
    callback
  );
});
