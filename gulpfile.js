const gulp = require('gulp');
const concat = require('gulp-concat');
//const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
var rename = require("gulp-rename");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const image = require('gulp-image');
//const autoprefixer = [require('autoprefixer')({ grid: true, browsers: ['last 2 versions', 'ie 6-8', 'Firefox > 20']  })];
const autoprefixer = require('autoprefixer');


//Источник CSS файлов
const cssFiles = [
  './app/styles/all.css'
  
];

//Источник JS файлов
const scriptFiles = [
  './app/scripts/script.js',
  './app/scripts/script2.js'
];

//Функция для минификации HTML файла с добавление суфикаса и сохраненнияем в ту же пaпку
//Файл должен лежать в коренвой попки 
function htmlmini() {
  return gulp.src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    //Для переименования(чтобы не возникало багов)
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('./'));
}
// Источник все scss файлов для склеивание в all scss
let scssFiles = [
  './app/scss/reset.scss',
  './app/scss/variables.scss',
  './app/scss/style.scss',
  './app/scss/modules/header.scss',
  './app/scss/modules/firstScreen.scss',
  './app/scss/modules/features.scss',
  './app/scss/modules/about.scss',
  './app/scss/modules/service.scss',
  './app/scss/modules/price.scss',

  './app/scss/modules/form.scss',
  './app/scss/modules/resultForm.scss',
  './app/scss/modules/footer.scss',
  './app/scss/mediaModules/styleMedia.scss',
  './app/scss/mediaModules/headerMedia.scss',
  './app/scss/mediaModules/firstScreenMedia.scss',
  './app/scss/mediaModules/featuresMedia.scss',
  './app/scss/mediaModules/serviceMedia.scss',
  './app/scss/mediaModules/aboutMedia.scss',
  './app/scss/mediaModules/formMedia.scss',
  './app/scss/mediaModules/footerMedia.scss',

];

// Функция для склеивания всех  scss  в один 
function concatScss() {
  del('./app/allScss/all.scss');
  return gulp.src(scssFiles)
    .pipe(concat('all.scss'))
    .pipe(gulp.dest('./app/allScss'))
    .pipe(browserSync.stream());

}

//Функция для компиляции SCSS в CSS
function sasscomp() {
    return gulp.src('./app/allScss/all.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/styles'))
    .pipe(browserSync.stream());
}






//Фунция для конкантинации файлов CSS в один файл all.CSS
//Добавление автопрефиксоф
//Минификация файла
//Сохранение в папку ./dist/styles
//.pipe(concat('all.css'))
function styles() {
  return gulp.src('./app/styles/all.css')
    .pipe(postcss([autoprefixer(
      {
        overrideBrowserslist: ['last 2 versions'],
        grid: "autoplace",
        cascade: false
      }
    )]))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(browserSync.stream());
}


//Функция для конкатинации всех JS файлов в одни вайл all.JS
//Сохранения в папку ./dist/scripts
function scripts() {
  return gulp.src(scriptFiles)
    .pipe(concat('all.js'))

    .pipe(gulp.dest('./dist/scripts'))
    .pipe(browserSync.stream());
}

//Для очистки папки dist, перед повторным записыванием
function clean() {
  return del(['dist/scripts', 'dist/styles'])
}
// function cleanScss() {
//   return del('app/scss/all.scss')
// }

//Запуск перезагрузки и 
//Отслеживание изменений в :
//
function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    browser: "chrome.exe",
  });

  gulp.watch('./app/scss/**/*.scss', concatScss);
  gulp.watch('./app/allScss/all.scss', sasscomp);
  gulp.watch('./app/styles/**/*.css', styles);
  gulp.watch('./app/scripts/**/*.js', scripts);
  gulp.watch("./index.html").on('change', browserSync.reload);
}


gulp.task('htmlmini', htmlmini);
gulp.task('sasscomp', sasscomp);
gulp.task('styles', styles);
gulp.task('concatScss', concatScss);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series( clean,  gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));






//Отдельно для минификации js файла
var uglifyjs = require('uglify-js'); // can be a git checkout
// or another module (such as `uglify-es` for ES6 support)
var composer = require('gulp-uglify/composer');
var pump = require('pump');

var minify = composer(uglifyjs, console);

gulp.task('compressjs', function (cb) {
  // the same options as described above
  var options = {};

  pump([
    gulp.src('./dist/scripts/all.js'),
    minify(options),
    gulp.dest('dist/scripts/min/')
  ],
    cb
  );
});






gulp.task('compressimg', async function () {
  gulp.src('./app/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
});





gulp.task('image', async function () {
  gulp.src('./app/images/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: true // defaults to false
    }))
    .pipe(gulp.dest('./dist/images'));
});





