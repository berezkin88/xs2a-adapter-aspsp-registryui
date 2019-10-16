var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var cnf = require('../package.json').config;
var babel = require('gulp-babel');
var include = require("gulp-include");
var uglify = require('gulp-uglify');

gulp.task('js', function () {
  return gulp.src(cnf.src.js)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") }))
    .pipe(include({
      extensions: "js",
      hardFail: true
    }))
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    // .pipe(uglify())
    .pipe(gulp.dest(cnf.dist.js))
});

gulp.task('js:watch', function () {
  gulp.watch(cnf.src.js, ['js']);
});