const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Convert sass to minified css with autoprefixes in public folder
gulp.task('styles', () => {
  const plugins = [
    autoprefixer,
    cssnano
  ];

  return gulp.src('./sass/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(plugins))
  .pipe(gulp.dest('./public/css/'));
});

// Watch if sass files changes then run styles task.
gulp.watch('./sass/**/*.scss', gulp.series('styles'));

gulp.task('default', gulp.series(['styles']));