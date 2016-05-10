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

		Elastic.prototype.clusterState = function() {
			var url = this.url.replace(/\/+$/, "") + "/_cluster/state";
			return $http.get(url);
		};

		Elastic.prototype.deleteIndex = function(index) {
			var url = this.url.replace(/\/+$/, "") + "/" + index;
			return $http.delete(url);
		};

		Elastic.prototype.putIndexSettings = function(index, data) {
			var url = this.url.replace(/\/+$/, "") + "/" + index + "/_settings";
			return $http.put(url, data);
		};

		/* eslint-disable camelcase */
		Elastic.prototype.setIndexNumberOfReplicas = function(index, number) {
			return this.putIndexSettings(index, {
				index: {
					number_of_replicas: +number
				}
			});
		};
		/* eslint-enable camelcase */

		Elastic.prototype.snapshot = function() {
			var url = this.url.replace(/\/+$/, "") + "/_snapshot";
			return $http.get(url);
		};

		Elastic.prototype.snapshotAll = function(indices) {
			var url = this.url.replace(/\/+$/, "") + "/_snapshot/" + indices + "/_all";
			return $http.get(url);
		};

		Elastic.prototype.deleteSnapshot = function(repo, snapshot) {
			var url = this.url.replace(/\/+$/, "") + "/_snapshot/" + repo + "/" + snapshot;
			return $http.delete(url);
		};

		return new Elastic();
	}

})();
