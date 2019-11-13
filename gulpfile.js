var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var autoprefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload')

/**
 * Compile SCSS styles
 */
gulp.task('sass', function(){
    return gulp.src('source/stylesheets/**/*.scss')
        .pipe(sass()).on('error', sass.logError) // Using gulp-sass
        .pipe(gulp.dest('source/stylesheets'))
        .pipe(notify({
			message: "✔︎ CSS task complete",
			onLast: true
		}))
        .pipe(livereload());;
});

/**
 * Watch for any changes
 */
gulp.task('watch', function(){
    livereload.listen();
    //Watch Files
    gulp.watch('source/stylesheets/**/*.scss', ['sass']);

});

gulp.task('default', ['sass', 'watch']);
