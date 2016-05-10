(function() {

	var moduleName = "elasticIndices";
	app.directive(moduleName, directive);
	function directive() {

		return {
			restrict: "E",
			scope: {},
			templateUrl: "src/directive/elasticIndices/elasticIndices.html",
			controllerAs: moduleName,
			controller: controller,
			link: link
		};

		function link($scope, $element, $attrs, $ctrl) {

			$scope.statsIndicesOrderBy = "index";
			$scope.statsIndicesFilter = "";

			$scope.$on("reloadElasticIndices", function() {
				$ctrl.reloadStatsIndices();
			});

		}

	}

	controller.$inject = ["$q", "$scope", "Elastic"];
	function    controller($q,   $scope,   Elastic) {

		var $ctrl = this;

		$ctrl.setStatsIndicesOrderBy = function(orderby) {
			if ($scope.statsIndicesOrderBy === orderby) {
				$scope.statsIndicesOrderBy = "-" + orderby;
			} else {
				$scope.statsIndicesOrderBy = orderby;
			}
		};

		$ctrl.deleteIndex = function(index) {
			return Elastic.deleteIndex(index)
				.then(function() {
					return $ctrl.reloadStatsIndices();
				});
		};

		$ctrl.reloadStatsIndices = function() {
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
		};

		$ctrl.onReplicaKeyup = function(ev, idx, indexForm) {
			switch (ev.keyCode) {
			case 13: // [ENTER]
				angular.element(ev.target).blur();
				Elastic.setIndexNumberOfReplicas(idx.index, idx.metadata.settings.index.number_of_replicas)
					.then(function() {
						return $ctrl.reloadStatsIndices();
					});
				break;
			}
		};

	}

})();
