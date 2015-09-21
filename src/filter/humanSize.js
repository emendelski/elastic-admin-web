(function() {

	var moduleName = "humanSize";
	var provider = {
		// https://en.wikipedia.org/wiki/Byte
		unitSymbol: {
			SI: ["bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
			IEC: ["bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
		},
		unit: "SI",
		$get: humanSize
	};

	app.provider(moduleName, function() {
		return provider;
	});

	app.filter(moduleName, function() {
		return humanSize;
	});

	function humanSize(bytes) {
		if (bytes <= 0) {
			return 0;
		}
		var s = provider.unitSymbol[provider.unit];
		var e = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), s.length - 1);
		return (bytes / Math.pow(1024, Math.floor(e))).toFixed(e > 0 ? 2 : 0) + " " + s[e];
	}

})();
