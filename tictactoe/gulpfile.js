var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

gulp.task("sass", function() {
  return gulp
    .src("src/**/*.scss") // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest("build"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("markup", function() {
  return gulp.src("src/*.html").pipe(gulp.dest("build"));
});

gulp.task("script", function() {
    return gulp.src("src/*.js").pipe(gulp.dest("build"));
  });

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "build"
    }
  });
});

gulp.task("watch", ["browserSync", "sass", "markup", "script"], function() {
  gulp.watch("src/**/*.scss", ["sass"]);
  gulp.watch("src/*.html", browserSync.reload);
  gulp.watch("src/**/*.js", browserSync.reload);
  // Other watchers
});
