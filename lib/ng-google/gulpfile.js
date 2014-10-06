var gulp = require('gulp');
var path = require('path');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var ngTemplates = require('gulp-ng-templates');
var htmlmin = require('gulp-htmlmin');

var paths = {
	scripts: ['src/**/*.js'],
	templates: ['src/**/*.html']
};

gulp.task('jshint', function () {
	gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter());
});

gulp.task('templates', function () {
	var dest = path.join(__dirname, 'dist');

	gulp.src(paths.templates)
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(ngTemplates({
			module: 'google.templates',
			filename: 'angular-google.tpl.min.js',
			path: function (path, base) {
				path = path.replace(base, '').replace(/(components|templates)(\/|\\)/g, '');
				return path;
			}
		}))
		.pipe(gulp.dest(dest));
});

gulp.task('scripts', ['jshint'], function () {
	var dest = path.join(__dirname, 'dist');

	gulp.src(paths.scripts)
		.pipe(concat('angular-google.min.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest(dest));
});

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.templates, ['templates']);
});

gulp.task('build', ['scripts', 'templates']);

gulp.task('default', ['build', 'watch']);