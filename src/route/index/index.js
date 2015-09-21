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

	Controller.$inject = ["$scope", "$location", "$stateParams"
	, "Elastic", "Version"];
	function    Controller($scope,   $location,   $stateParams
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
			return Elastic.stats()
				.then(function(res) {
					$scope.stats = res.data;
					$scope.statsIndices = [];
					angular.forEach(res.data.indices, function(idx, name) {
						idx.index = name;
						idx.docs = idx.total.docs.count;
						idx.size = idx.primaries.store.size_in_bytes;
						$scope.statsIndices.push(idx);
					});
				})
				.finally(function() {
					$scope.loadingStatsIndices = false;
				});
		}

		$scope.onKeyup = function(ev) {
			if (ev.keyCode === 13) {
				reloadStatsIndices();
			}
		};

		Elastic.url = getParamUrl();
		reloadStatsIndices();

	}

})();
