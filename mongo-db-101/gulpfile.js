const gulp = require("gulp");
const path = require("path");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del")
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create();

gulp.task("clean", () => {

    return del(["./dist/**"])
})


gulp.task("build:server", () => {
    var tsconfig = path.resolve("./server/tsconfig.json");
    
    var tsResult = gulp.src("./server/**/*.ts")
        .pipe( sourcemaps.init() )
        .pipe( ts(tsconfig) );

    return tsResult.js
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest(
            path.resolve("./dist/server")
        ));
});


gulp.task("copy:public", () => {

    return gulp.src("./server/public/**/*.*")
        .pipe( gulp.dest(
            path.resolve("./dist/server/public")
        ));
});


gulp.task("dev:server", () => {
    var stream = nodemon({
                    exec: 'ts-node ./server/index.ts' // run ES5 code
                    , watch: './server' // watch ES2015 code
                    , ext: 'ts' // watch ES2015 code
                    , ignore: ['*.spec.ts']
                })        
    
    return stream;
});


gulp.task("default", ["clean", "build:server", "copy:public"]);