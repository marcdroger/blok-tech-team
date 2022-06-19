const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

// Convert sass to minified css in public folder
gulp.task('styles', () => {
  return gulp.src('./sass/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({ compatibility: 'ie8'}))
  .pipe(gulp.dest('./public/css/'));
})


gulp.task('default', gulp.series(['styles']));