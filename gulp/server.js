var gulp =          require('gulp');
var cnf =           require('../package.json').config;
var browserSync =   require('browser-sync').create();

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: cnf.dist
        },
        files: cnf.dist
    });
});