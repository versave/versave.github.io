const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const uglify = require('gulp-uglify');
const chokidar = require('chokidar');
const paths = {
	src: '../src',
	build: '../build'
};

/**
*	SASS Compiling
*/
gulp.task('sass', () => {
	return gulp
		.src(`${paths.src}/scss/style.scss`)
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest(`${paths.build}/assets/css`))
			.pipe(browserSync.stream());
});
			

/**
*	Autoprefixer
*/
gulp.task('autoprefix', async () => {
	await gulp
		.src(`${paths.build}/assets/css/style.css`)
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(gulp.dest(`${paths.build}/assets/css`));
});

/**
*	Webpack
*/
gulp.task('webpack', () => {
	return webpackStream(webpackConfig)
		.on('error', function() {
			this.emit('end');
		})
		.pipe(gulp.dest(`${paths.build}/assets/js/`));
});

/**
*	Watch Task
*/
gulp.task('watch', () => {
	browserSync.init({
		server: {
			baseDir: `${paths.build}`,
			directory: true
		}
	});

	// Auto import SCSS
	handleScss();

	// Other watch tasks
	gulp.watch(`${paths.src}/scss/**/*.scss`, gulp.series('sass', 'autoprefix'));
	
	gulp
		.watch(`${paths.build}/*.html`)
			.on('change', browserSync.reload);

	gulp
		.watch(`${paths.src}/js/**/*.js`)
			.on('change', browserSync.reload);
	
	gulp.watch(`${paths.src}/js/**/*.js`, gulp.series('webpack'));
});

/**
*	SCSS Add/Delete
*/
const handleScss = () => {
	const watcher = chokidar.watch(`${paths.src}/scss/partials`, {ignoreInitial: true});
	const styleScss = `${paths.src}/scss/style.scss`;

	watcher
		.on('add', (filePath) => {
			const fileName = filePath.split('partials\\')[1];

			fs.appendFile(styleScss, `\n@import './partials/${fileName}';`, function (err) {
				err ? console.log(err) : console.log(`${fileName} added to style.scss`);
			});
		})
		.on('unlink', (filePath) => {
			const fileName = filePath.split('partials\\')[1];
			
			try {
				const data = fs.readFileSync(styleScss, 'utf-8');
				const fileLine = `@import './partials/${fileName}';`;

				const editedValue = data.replace(new RegExp(fileLine), '');
				const newValue = editedValue.replace(/^\s*[\r\n]/gm, '');

				fs.writeFileSync(styleScss, newValue, 'utf-8');
			} catch(e) {
				console.log(e)
			}
		});
};

/**
*	Minifying Task`
*/
gulp.task('minify', async () => {
	await gulp
		.src(`${paths.build}/assets/css/style.css`)
			.pipe(cssnano())
			.pipe(gulp.dest(`${paths.build}/assets/css`));		
	await gulp
		.src(`${paths.build}/assets/js/bundle.js`)
			.pipe(uglify())
			.pipe(gulp.dest(`${paths.build}/assets/js/`));

});

/**
*	Build Task
*/
gulp.task('build', gulp.series('sass', 'autoprefix', 'webpack'));

