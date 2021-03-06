var gulp = require("gulp");
var uglify = require("gulp-uglify");
var livereload = require("gulp-livereload");
var minifyCSS = require("gulp-minify-css");
var prefix = require("gulp-autoprefixer");
var concatCSS = require("gulp-concat-css");
var sass = require("gulp-sass");
var jshint = require("gulp-jshint");
var jshintStylish = require("jshint-stylish");
var concat = require("gulp-concat");

// handles gulp errors
function handleErrors(error) {
	console.log(error);
	this.emit("end");
}

// modifies styles
gulp.task('styles', function() {
	console.log("starting styles!");
	gulp.src("public/css/styles.scss")
		.pipe(sass())
		.on("error", handleErrors)
		.pipe(prefix('last 2 versions'))
		.pipe(minifyCSS())
		.pipe(gulp.dest("public/build/css/"));
});

// reloads styles
gulp.task("styles:reload", function() {
	gulp.src("public/css/styles.scss")
		.pipe(livereload({auto:false}));
});

// modifies scripts
gulp.task('scripts', function() {
	console.log("starting scripts");
	gulp.src("public/js/**/*.js")
		.pipe(jshint())
		.pipe(jshint.reporter(jshintStylish))
		.pipe(jshint.reporter("fail"))
		.on("error", function() {
			this.emit("end");	
		})
		.pipe(concat("scripts.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("public/build/js/"));
});

// reloads scripts
gulp.task("scripts:reload", function() {
	gulp.src("public/js/main.js")
		.pipe(livereload({auto:false}));
});

// watches files
gulp.task("watch", function() {
	livereload.listen();

	gulp.watch("public/js/**/*.js", ["scripts", "scripts:reload"]);

	gulp.watch("public/index.html")
		.on("change", livereload.changed);

	gulp.watch("public/css/styles.scss", ["styles", "styles:reload"]);

	gulp.watch("public/vendor/css/**/*.css", ["styles:vendor", "styles:vendor:reload"]);		
});

// run all gulp tasks
gulp.task("default", function() {
	gulp.start("styles", "scripts")
});