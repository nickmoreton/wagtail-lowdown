const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const bundler = require('webpack');
const webpack = require('webpack-stream');
const imageMin = require('gulp-imagemin');

const paths = {
    "src": {
        "styles": "src/css",
        "scripts": "src/js",
        "images": "src/img",
        "svg": "src/svg",
    },
    "dest": {
        "css": "app/static/css",
        "img": "app/static/img",
        "svg": "app/static/svg",
        "js": "app/static/js",
    },
    "clean": "cms/config/static/*"
};

// DEV SCRIPTS
const serve = () => {
    browserSync.init({
        proxy: "0.0.0.0:8000",
        open: false
    });
    // files
    gulp.watch("cms/**/*.html").on("change", browserSync.reload);
    gulp.watch("cms/**/*.py").on("change", browserSync.reload);

    // assets
    gulp.watch(paths.src.styles + "/**/*.scss", styles);
    gulp.watch(paths.src.scripts + "/**/*.js", scripts).on("change", browserSync.reload);
    gulp.watch(paths.src.images + "/**/*.*", images).on("change", browserSync.reload);
    gulp.watch(paths.src.svg + "/**/*.*", svg).on("change", browserSync.reload);
};

const scripts = () => {
    return gulp.src(paths.src.scripts + "/**/*.js")
        .pipe(webpack(require('./webpack'), bundler))
        .pipe(gulp.dest(paths.dest.js))
};

const styles = () => {
    return gulp.src(paths.src.styles + "/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.dest.css))
        .pipe(browserSync.stream());
};

const images = () => {
    return gulp.src(paths.src.images + "/**/*.*")
        .pipe(imageMin())
        .pipe(gulp.dest(paths.dest.img))
};

const svg = () => {
    return gulp.src(paths.src.svg + "/**/*.*")
        .pipe(imageMin())
        .pipe(gulp.dest(paths.dest.svg))
};

// BUILD SCRIPTS

const scriptsBuild = () => {
    return gulp.src(paths.src.scripts + "/**/*.js")
        .pipe(webpack(require('./webpack-build'), bundler))
        .pipe(gulp.dest(paths.dest.js))
};

const stylesBuild = () => {
    return gulp.src(paths.src.styles + "/**/*.scss")
        .pipe(sass({ outputStyle: 'compressed' }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.dest.css));
};

const clean = () => {
    return del(paths.clean)
};


exports.default = gulp.series(clean, scripts, styles, images, svg, serve);

exports.build = gulp.series(clean, scriptsBuild, stylesBuild, images, svg,);
