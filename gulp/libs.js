var gulp =          require('gulp');
var plumber =       require('gulp-plumber');
var notify =        require("gulp-notify");
var cnf =           require('../package.json').config;
var cssnano =       require('gulp-cssnano');
var rename =        require("gulp-rename");
var importCss =     require('gulp-import-css');
var uglify =        require('gulp-uglify');
var include =       require("gulp-include");
var babel =         require('gulp-babel');

gulp.task('libs', function () {
    gulp.src(cnf.libs.css)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(importCss())
    .pipe(cssnano())
    .pipe(rename({
      dirname: "",
      basename: "libs",
      prefix: "",
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(gulp.dest(cnf.dist.css));
    gulp.src(cnf.libs.js)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(babel())
    .pipe(include({
      extensions: "js",
      hardFail: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest(cnf.dist.js));
  }); 
   
  gulp.task('libs:watch', function () {
    gulp.watch(cnf.libs.css, ['libs']);
    gulp.watch(cnf.libs.js, ['libs']);
  });