var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var cnf = require('../package.json').config;
var fileinclude = require('gulp-file-include');

gulp.task('html', function () {
  return htmlFlow(cnf.dist.dep), htmlFlow(cnf.dist.test), htmlFlow(cnf.dist.main.html);
});

gulp.task('html:watch', function () {
  gulp.watch(cnf.src.html, ['html']);
});

function htmlFlow(destination) {
  return gulp.src(cnf.src.html)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(destination));
}