var gulp =          require('gulp');
var runSequence =   require('run-sequence');
const del =         require('del');

del(['dist/**/*.*']);

gulp.task('clean', function() {
    return del(['dist/']);
})

gulp.task('build', ['clean'], function() {
    runSequence(
        'sass',
        'html',
        'js'
    );
  }); 