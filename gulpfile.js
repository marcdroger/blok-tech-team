const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Convert sass to css in public folder
gulp.task('styles', () => {
  return gulp.src('./sass/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/css/'));
})


gulp.task('default', gulp.series(['styles']));