var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require("browser-sync").create();
var sm = require("gulp-sourcemaps");

gulp.task("sass", function() {
    return gulp.src("app/scss/**/*.scss")
        .pipe(sm.init())
            .pipe(sass())
        .pipe(sm.write())
        .pipe(gulp.dest("app/css"))
        .pipe(bs.reload({
            stream: true
        }));
});

gulp.task("browserSync", function() {
    bs.init({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task("watch", ['browserSync', 'sass'], function() {
    gulp.watch("app/scss/**/*.scss", ['sass'])
    gulp.watch('app/*.html', bs.reload);
    gulp.watch('app/js/**/*.js', bs.reload);
});
