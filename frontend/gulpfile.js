const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


// -- PATHS

const paths = {
  sass: {
    src: 'src/assets/css/**/*.sass',
    dest: 'src/assets/css'
  }
}


// -- TASKS

gulp.task('sass', () => {
  return gulp.src(paths.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('watch', () => {
  gulp.watch(paths.sass.src, gulp.series('sass'));
});


// -- DEFAULT

const build = gulp.series('sass', 'watch');

gulp.task('default', build);