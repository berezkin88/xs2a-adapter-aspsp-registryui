var gulp =          require('gulp');
var sass =          require('gulp-sass');
var plumber =       require('gulp-plumber');
var notify =        require("gulp-notify");
var sourcemaps =    require('gulp-sourcemaps');
var cnf =           require('../package.json').config;
var autoprefixer =  require('gulp-autoprefixer');
var cssnano =       require('gulp-cssnano');
var rename =        require("gulp-rename");
 
gulp.task('sass', function () {
  return gulp.src(cnf.src.sass)
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(cssnano())
  .pipe(rename({
    dirname: "",
    basename: "main",
    prefix: "",
    suffix: ".min",
    extname: ".css"
  }))
  .pipe(gulp.dest(cnf.dist.css));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(cnf.src.sass, ['sass']);
});