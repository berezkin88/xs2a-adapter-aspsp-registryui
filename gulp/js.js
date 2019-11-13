var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var cnf = require('../package.json').config;
var babel = require('gulp-babel');
var include = require("gulp-include");
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('js', function () {
  return jsFlow(cnf.dist.dep), jsMainFlow(cnf.dist.test), jsMainFlow(cnf.dist.main.scripts);
});

gulp.task('js:watch', function () {
  gulp.watch(cnf.src.js, ['js']);
});

function jsFlow(destination) {
  return gulp.src(cnf.src.js)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") }))
    .pipe(include({
      extensions: "js",
      hardFail: true
    }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({
      dirname: "",
      basename: "main",
      prefix: "",
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(gulp.dest(destination));
}

function jsMainFlow(destination) {
  return gulp.src(cnf.src.js)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") }))
    .pipe(include({
      extensions: "js",
      hardFail: true
    }))
    .pipe(gulp.dest(destination));
}