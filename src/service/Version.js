(function() {

	var moduleName = "Version";
	app.provider(moduleName, Provider);
	function Provider() {

		var provider = this;

		provider.config = {
			// the version maybe modify by gulp task
			"version": "0"
		};

		provider.$get = Get;

	}

	Get.$inject = ["$http"];
	function    Get($http) {

		var provider = this;

		function Version() {
			this.config = provider.config;
			if (this.config.version == "0") {
				// load version from package.json in dev mode
				$http.get("package.json").then(function(data) {
					if (data && data.data && data.data.version) {
						this.config.version = data.data.version + "-dev";
					}
				}.bind(this));
			}
		}

		Version.prototype.toString = function() {
			return this.config.version;
		};

		return new Version();

	}

})();
