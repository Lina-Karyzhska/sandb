const { src, dest, watch, parallel, series } = require("gulp");

const scss         = require("gulp-sass"),
      autoprefixer = require("gulp-autoprefixer"), 
      imagemin     = require("gulp-imagemin"),
      concat       = require("gulp-concat"),
      uglify       = require("gulp-uglify"),
      sourcemaps   = require("gulp-sourcemaps"),
      browserSync  = require("browser-sync").create(),
      del          = require("del"),
      fileinclude  = require("gulp-file-include"),
      imgCompress  = require("imagemin-jpeg-recompress");

function html() {
    return src(["src/*.html", "src/.htaccess", "!src/_*.html"])
        .pipe(fileinclude())
        .pipe(dest("dist"))
        .pipe(browserSync.stream());
}

function styles() {
    return src([
        "node_modules/slick-slider/slick/slick.scss",
        "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css",
        "src/scss/index.scss"
    ])
        .pipe(sourcemaps.init())
        .pipe(scss({outputStyle: "compressed"}))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            grid: true,
            cascade: true
         }))
        .pipe(concat("styles.min.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream());
};

function scripts() {
    return src([
        "node_modules/jquery/dist/jquery.js",
        "node_modules/slick-slider/slick/slick.min.js",
        "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js",
        "src/js/*.js"
    ])
        .pipe(concat("main.min.js")) 
        .pipe(uglify())
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream());
};

function scriptsLanguages() {
    return src([
        "node_modules/jquery/dist/jquery.js",
        "src/js/languages.js"
    ])
        .pipe(concat("languages.min.js")) 
        .pipe(uglify())
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream());
};

function imgs() {
    return src("src/images/**/*.png")
        .pipe(imagemin([
          imgCompress({
            loops: 4,
            min: 70,
            max: 80,
            quality: "high"
          }),
          imagemin.gifsicle(),
          imagemin.optipng(),
          imagemin.svgo()
        ]))
        .pipe(dest("./dist/images"))
        .pipe(browserSync.stream());
};

function svg() {
    return src("src/images/*.svg")
        .pipe(dest("./dist/images"))
        .pipe(browserSync.stream());
};

function sync() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        },
        port: 3000
    });
};

function fonts() {
    return src("src/fonts/**/*")
        .pipe(dest("./dist/fonts"))
        .pipe(browserSync.stream());
};

function video() {
    return src("src/videos/**/*")
        .pipe(dest("./dist/videos"))
        .pipe(browserSync.stream());
};

function cleanDist() {
    return del("dist");
}

function watching() {
    watch(["src/*.html", "src/.htaccess"], html);
    watch(["src/js/**/*.js"], scripts);
    watch(["src/js/languages.js"], scriptsLanguages);
    watch(["src/scss/**/*.scss"], styles);
    watch(["src/fonts/**/*"], fonts);
    watch(["src/videos/**/*"], video);
    watch(["src/images/**/*.{jpg,png,gif,ico,webp}"], imgs);
    watch(["src/images/*.svg"], svg);
};

exports.styles = styles;
exports.watching = watching;
exports.browserSync = sync;
exports.scripts = scripts;
exports.scriptsLanguages = scriptsLanguages;
exports.imgs = imgs;
exports.svg = svg;
exports.fonts = fonts;
exports.video = video;
exports.cleanDist = cleanDist;

const build = series(cleanDist, parallel(html, styles, imgs, fonts, video, scripts, scriptsLanguages, svg));
exports.default = parallel(build, sync, watching);