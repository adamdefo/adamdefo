var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    myth = require('gulp-myth'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync');

gulp.task('jade', function() {

    gulp.src(['./assets/jade/*.jade', '!./assets/jade/_*.jade'])
        .pipe(jade({
            pretty: true
        })).on('error', console.log)
        .pipe(gulp.dest('./dev/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function() {

    gulp.src(['./assets/sass/app.sass', '!./assets/sass/_*.sass'])
    .pipe(sass())
    .pipe(myth())
    .pipe(gulp.dest('./dev/css/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function() {

    gulp.src(['!./assets/js/vendor/vue/*.js', './assets/js/vendor/*.js', './assets/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dev/js'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function() {

    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dev/img'));
});

gulp.task('browser-sync', function() {

    browserSync({
        server: {
            baseDir: 'dev'
        },
        notify: false
    });
});

gulp.task('default', ['browser-sync', 'sass', 'jade', 'js', 'images'], function() {

    gulp.watch('./assets/sass/**/*.sass', ['sass']);
    gulp.watch('./assets/jade/**/*.jade', ['jade']);
    gulp.watch('./assets/js/**/*', ['js']);
});



// сборка проекта в продакшн
gulp.task('build', function() {

    gulp.src('./dev/css/app.css')
        //.pipe(sass())
        .pipe(myth())
        .pipe(csso())
        .pipe(gulp.dest('./build/css/'));

    gulp.src(['./assets/jade/*.jade', '!./assets/jade/_*.jade'])
        .pipe(jade())
        .pipe(gulp.dest('./build/'));

    gulp.src(['./assets/js/**/*.js', '!./assets/js/vendor/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));

    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
});
