/* eslint-env node */

var
	// load dependency
	dateformat = require("dateformat"),
	gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	gitRev = require("git-rev"),
	merge = require("merge-stream"),
	runSequence = require("run-sequence"),

	// package info
	pkg = require("./package.json"),

	// list all pages
	pages = [
		"index"
	];

// project config
var paths = {
		"tmpl": ["src/**/*.html"],
		"lint": {
			"js": ["!**/*.tmp.js", "!src/config/appInject.js"
				, "*.js", "src/**/*.js", "test/**/*.js"]
		}
	},
	banner = [
		"/* " + pkg.name + " v" + pkg.version + " " + dateformat(new Date(), "yyyy-mm-dd"),
		" */\n\n"
	].join("\n");

gulp.task("default", ["build"]);

gulp.task("dev", ["watch"]);

gulp.task("up", ["update-npm", "update-bower"]);

gulp.task("build", function(done) {
	runSequence(
		// stage 1: build resource
		["bower.json", "lint", "tmpl"],

		// stage 2: build pages
		["page"],

		done);
});

gulp.task("page", function() {
	var tasks = pages.map(function(page) {
		var assets = $.useref.assets();
		return gulp.src(page + ".src.html")
			// preprocess file path inside of html
			.pipe($.replace("lib/lightslider/src/css/lightslider.css", "tmp/lightslider.css"))

			// process assets inside of html
			.pipe(assets)
			.pipe($.if("*.css", $.minifyCss()))
			.pipe($.if("*.js", $.insert.wrap("(function(){", "})();")))
			.pipe($.if("*.js", $.uglify()))
			.pipe($.insert.prepend(banner))
			.pipe(gulp.dest("."))
			.pipe($.rev())

			// process html
			.pipe(assets.restore())
			.pipe($.useref())
			.pipe($.revReplace())
			.pipe($.if("*.src.html", $.replace("lib/jquery/dist/jquery.js", "lib/jquery/dist/jquery.min.js?v=" + getBowerPkgVersion("jquery"))))
			.pipe($.if("*.src.html", $.replace("lib/angular/angular.js", "lib/angular/angular.min.js?v=" + getBowerPkgVersion("angular"))))
			.pipe($.if("*.src.html", $.replace("lib/semantic-ui/dist/semantic.css", "lib/semantic-ui/dist/semantic.min.css?v=" + getBowerPkgVersion("semantic-ui"))))
			.pipe($.if("*.src.html", $.replace("lib/semantic-ui/dist/semantic.js", "lib/semantic-ui/dist/semantic.min.js?v=" + getBowerPkgVersion("semantic-ui"))))
			.pipe($.if("*.src.html", $.minifyInline()))
			.pipe($.if("*.src.html", $.minifyHtml({empty: true})))
			.pipe($.if("*.src.html", $.rename({basename: page})))
			.pipe(gulp.dest("."))
			.pipe($.size({"title": page + " page", "showFiles": true}))

			// process assets revisioning
			.pipe($.rev.manifest({merge: true, path: "public/rev-manifest.json"}))
			.pipe(gulp.dest("."))
			.pipe($.size({"title": page + " manifest", "showFiles": true}));
	});
	return merge(tasks);
});

gulp.task("bower.json", function() {
	return gulp.src(["bower.json"])
		.pipe($.replace(/"name": "[^"]*"/, "\"name\": \"" + pkg.name + "\""))
		.pipe(gulp.dest("./"));
});

gulp.task("lint", function() {
	return gulp.src(paths.lint.js)
		.pipe($.eslint())
		.pipe($.eslint.format())
		.pipe($.eslint.failOnError());
});

gulp.task("tmpl", function() {
	return gulp.src(paths.tmpl)
		.pipe($.minifyHtml({empty: true}))
		.pipe($.angularTemplatecache("angular-template.tmp.js", {
			templateHeader: 'app.run(["$templateCache", function($templateCache) {',
			root: "src"
		}))
		.pipe(gulp.dest("tmp"))
		.pipe($.size({"title": "angular-template.tmp.js"}));
});

gulp.task("update-npm", function() {
	var cmd = "./node_modules/npm-check-updates/bin/npm-check-updates -a";
	$.util.log(cmd);
	return $.shell.task(cmd + " < package.json")();
});

gulp.task("update-bower", function() {
	var bowerjson = require("./bower.json");
	var deps = [];
	var i, cmd;

	for (i in bowerjson.dependencies) {
		if (i[0] == "~") {
			deps.push(i);
		}
	}
	cmd = "bower install --save --force-latest " + deps.join(" ");
	return $.shell.task(cmd)();
});

gulp.task("watch", function() {
	var watchs = ["src/**", "test/**"];

	pages.map(function(page) {
		watchs.push(page + ".src.html");
	});
	gulp.watch(watchs, function(info) {
		gulp.src(info.path)
			.pipe($.connect.reload());
	});
	gulp.watch(paths.lint.js, function(info) {
		$.util.log("lint", info.path);
		gulp.src(info.path)
			.pipe($.eslint())
			.pipe($.eslint.format());
	});
	$.connect.server({
		root: "./",
		port: 9000,
		livereload: true,
		middleware: function(connect, opt) {
			return [
				function(req, res, next) {
					// $.util.log(req.method, req.url);
					next();
				}
			];
		}
	});
});

gulp.task("profile-inject", ["profile-inject-git-rev"], function() {
	var inject = "$1";

	inject += '\nVersionProvider.config.version = "' + pkg.version + '";';
	return gulp.src(["src/config/appInject.js"])
		.pipe($.replace(/(\/\/ === THIS LINE IS USED FOR INJECTION === \/\/)/, inject))
		.pipe(gulp.dest("src/config"));
});

gulp.task("profile-inject-build-time", function(done) {
	pkg.version += "-" + dateformat(new Date(), "yyyy-mm-dd");
	done();
});

gulp.task("profile-inject-git-rev", ["profile-inject-build-time"], function(done) {
	gitRev.short(function(hash) {
		pkg.version += "-" + hash;
		done();
	});
});

function getBowerPkgVersion(name) {
	return require("./lib/" + name + "/.bower.json").version;
}
