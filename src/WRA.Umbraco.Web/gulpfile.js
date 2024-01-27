const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const esmify = require('esmify');
const log = require('gulplog');
const sass = require('gulp-sass')(require('sass'));
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

const runScripts = options => {
    const {
        src,
        name,
        dest = './wwwroot/js/dist',
        presets = ['@babel/preset-env']
    } = options;

    return (
        browserify({
            transform: [
                babelify.configure({ presets })
            ],
            entries: src,
            debug: true,
            plugin: [
                [esmify]
            ]
        })
            .bundle()
            .pipe(source(name))
            .pipe(buffer())
            .on('error', log.error)
            .pipe(gulp.dest(dest))
    );
};

gulp.task('scripts_global', () => runScripts({
    src: './wwwroot/js/src/global.js',
    name: 'global.js'
}));

gulp.task('scripts', gulp.parallel(
    'scripts_global'
));

gulp.task('styles', () => (
    gulp.src('./wwwroot/css/src/global.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' })
            .on('error', sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./wwwroot/css/dist'))
));

gulp.task('watch-scripts', () => {
    gulp.watch(
        './wwwroot/js/src/**/*.js',
        gulp.series('scripts')
    )
});

gulp.task('watch-styles', () => {
    gulp.watch(
        './wwwroot/css/src/**/*.scss',
        gulp.series('styles')
    )
});

gulp.task('watch', gulp.parallel('watch-scripts', 'watch-styles'));

gulp.task('build', gulp.series('scripts', 'styles'));
