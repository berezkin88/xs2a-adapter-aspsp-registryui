var gulp =          require('gulp');
var runSequence =   require('run-sequence');
const del =         require('del');
var cnf = require('../package.json').config;

del([cnf.dist.dep]);

gulp.task('clean', function() {
    return del([cnf.dist.dep]);
})

gulp.task('build', ['clean'], function() {
    runSequence(
        'sass',
        'html',
        'js'
    );
  }); 