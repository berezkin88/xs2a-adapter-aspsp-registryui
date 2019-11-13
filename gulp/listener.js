var gulp =          require('gulp');
var runSequence =   require('run-sequence');

gulp.task('listener', function() {
    runSequence(
        'build',
        [
            'sass:watch', 
            'js:watch', 
            'html:watch'
        ]
    );
  }); 