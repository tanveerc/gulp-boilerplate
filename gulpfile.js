var gulp = require('gulp'),
	sass = require('gulp-sass'),
	// notify = require('gulp-notify'),
	connect = require('gulp-connect');

var base = {
	src: '_src/',
	dist: 'builds/development/'
}

// tasks
gulp.task('sass', function(){
	return gulp.src('_src/styles/styles.scss')
		.pipe(sass({sourceComments: 'map', sourceMap: 'sass'}))
		.pipe(gulp.dest(base.dist + 'css'))
		// .pipe(notify({ message: 'Sass compile: All done!'}))
		.pipe(connect.reload());
});

gulp.task('copy', function(){
	// html
	gulp.src('_src/**/*.html')
		.pipe(gulp.dest(base.dist))
		.pipe(connect.reload());
	// images
	gulp.src('_src/images/**/*.*')
		.pipe(gulp.dest(base.dist + 'images'));
	// fonts
	gulp.src('_src/fonts/*.*')
		.pipe(gulp.dest(base.dist + 'fonts'));
	// js
	gulp.src('_src/scripts/*.*')
		.pipe(gulp.dest(base.dist + 'js'));
});

gulp.task('watch', function(){
	gulp.watch('_src/styles/**/*.scss', ['sass']);
	gulp.watch('_src/**/*.html', ['copy']);	
	gulp.watch('_src/scripts/*.*', ['copy']);
	gulp.watch('_src/images/**/*.*', ['copy']);
	gulp.watch('_src/fonts/*.*', ['copy']);				
});

gulp.task('connect', function(){
	connect.server({
		root: base.dist,
		port: 9090,
    	livereload: true
	});
});

gulp.task('default', ['sass', 'copy', 'connect', 'watch']);