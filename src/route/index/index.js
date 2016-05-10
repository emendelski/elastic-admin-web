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

	Controller.$inject = ["$location", "$scope", "$stateParams", "$timeout"
	, "Elastic", "Version"];
	function    Controller($location,   $scope,   $stateParams,   $timeout
	,  Elastic,   Version) {

		$scope.Elastic = Elastic;
		$scope.Version = Version;

		function getParamUrl() {
			return unescape($stateParams.url || "") || "http://localhost:9200";
		}

		$scope.reload = function() {
			$scope.$broadcast("reloadElasticIndices");
			$scope.$broadcast("reloadElasticSnapshot");
		};

		$scope.onElasticURLKeyup = function(ev) {
			switch (ev.keyCode) {
			case 13: // [ENTER]
				if (Elastic.url !== getParamUrl()) {
					$stateParams.url = Elastic.url;
					return $location.search($stateParams).replace();
				}
				$scope.reload();
				break;
			}
		};

		Elastic.url = getParamUrl();
		$timeout(function() {
			$scope.reload();
		});

	}

})();
