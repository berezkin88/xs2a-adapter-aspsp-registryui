var gulp =          require('gulp');
var cnf =           require('../package.json').config;
 
gulp.task('img', function () {
  gulp.src(cnf.src.img)
  .pipe(gulp.dest(cnf.dist.img));
});
 
gulp.task('img:watch', function () {
  gulp.watch(cnf.src.img, ['img']);
});