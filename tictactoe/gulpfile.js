var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
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
  return gulp
    .src("src/**/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("build"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("script", function() {
  return gulp.src("src/**/*.js").pipe(gulp.dest("build"));
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "build"
    }
  });
});

gulp.task("watch", ["browserSync", "sass", "markup", "script"], function() {
  gulp.watch("src/**/*.scss", ["sass", browserSync.reload]);
  gulp.watch("src/**/*.pug", ["markup", browserSync.reload]);
  gulp.watch("src/**/*.js", browserSync.reload);
  // Other watchers
});
