var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	notify = require('gulp-notify'),
	connect = require('gulp-connect');

gulp.task('jade', function(){
	return gulp.src('src/templates/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('builds/development'))
		.pipe(connect.reload());
});

gulp.task('sass', function(){
	return gulp.src('src/sass/main.scss')
		.pipe(sass({sourceComments: 'map', sourceMap: 'sass'}))
		.pipe(gulp.dest('builds/development/css'))
		.pipe(notify({ message: 'Sass compile: All done!'}))
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('src/templates/**/*.jade', ['jade']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development',
		port: 9000,
    	livereload: true
	});
});

gulp.task('default', ['jade', 'sass', 'connect', 'watch']);