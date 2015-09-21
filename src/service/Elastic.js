(function() {

	var moduleName = "Elastic";
	app.factory(moduleName, Factory);
	Factory.$inject = ["$http"];
	function    Factory($http) {

		function Elastic() {
			this.url = "http://localhost:9200";
		}

		Elastic.prototype.stats = function() {
			var url = this.url.replace(/\/+$/, "") + "/_stats";
			return $http.get(url);
		};

		Elastic.prototype.deleteIndex = function(index) {
			var url = this.url.replace(/\/+$/, "") + "/" + index;
			return $http.delete(url);
		};

		return new Elastic();
	}

})();
