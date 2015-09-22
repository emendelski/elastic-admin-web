(function() {

	app.config(Config);
	Config.$inject = ["$stateProvider", "$urlRouterProvider"];
	function    Config($stateProvider,   $urlRouterProvider) {

		/* eslint-disable angular/ng_controller_as_route */

		$stateProvider
			.state("indexSrc", {
				url: "/index.src.html?url",
				templateUrl: "src/route/index/index.html",
				controllerAs: "index",
				controller: Controller
			})
			.state("index", {
				url: "/?url",
				templateUrl: "src/route/index/index.html",
				controllerAs: "index",
				controller: Controller
			});

		/* eslint-enable angular/ng_controller_as_route */

	}

	Controller.$inject = ["$scope", "$q", "$location", "$stateParams"
	, "Elastic", "Version"];
	function    Controller($scope,   $q,   $location,   $stateParams
	,  Elastic,   Version) {

		$scope.Elastic = Elastic;
		$scope.Version = Version;
		$scope.statsIndicesOrderBy = "index";
		$scope.statsIndicesFilter = "";

		function getParamUrl() {
			return unescape($stateParams.url || "") || "http://localhost:9200";
		}

		$scope.setStatsIndicesOrderBy = function(orderby) {
			if ($scope.statsIndicesOrderBy === orderby) {
				$scope.statsIndicesOrderBy = "-" + orderby;
			} else {
				$scope.statsIndicesOrderBy = orderby;
			}
		};

		$scope.deleteIndex = function(index) {
			Elastic.deleteIndex(index)
				.then(reloadStatsIndices);
		};

		$scope.reloadStatsIndices = reloadStatsIndices;
		function reloadStatsIndices() {
			if (Elastic.url !== getParamUrl()) {
				$stateParams.url = Elastic.url;
				return $location.search($stateParams).replace();
			}

			$scope.loadingStatsIndices = true;
			return $q.all([
				Elastic.stats(),
				Elastic.clusterState()
			])
			.then(function(res) {
				$scope.stats = res[0].data;
				$scope.clusterState = res[1].data;
				$scope.statsIndices = [];
				angular.forEach($scope.stats.indices, function(idx, name) {
					idx.index = name;
					idx.docs = idx.total.docs.count;
					idx.size = idx.primaries.store.size_in_bytes;
					idx.metadata = angular.copy($scope.clusterState.metadata.indices[name]);
					$scope.statsIndices.push(idx);
				});
			})
			.finally(function() {
				$scope.loadingStatsIndices = false;
			});
		}

		$scope.onFilterKeyup = function(ev) {
			if (ev.keyCode === 13) {
				reloadStatsIndices();
			}
		};

		$scope.onReplicaKeyup = function(ev, idx, indexForm) {
			if (ev.keyCode === 13) {
				angular.element(ev.target).blur();
				Elastic.setIndexNumberOfReplicas(idx.index, idx.metadata.settings.index.number_of_replicas)
					.then(reloadStatsIndices);
			}
		};

		Elastic.url = getParamUrl();
		reloadStatsIndices();

	}

})();
