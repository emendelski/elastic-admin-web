(function() {

	var moduleName = "elasticSnapshot";
	app.directive(moduleName, directive);
	function directive() {

		return {
			restrict: "E",
			scope: {},
			templateUrl: "src/directive/elasticSnapshot/elasticSnapshot.html",
			controllerAs: moduleName,
			controller: controller,
			link: link
		};

		function link($scope, $element, $attrs, $ctrl) {

			$scope.snapshotRepo = "";
			$scope.snapshotOrderBy = "snapshot";
			$scope.snapshotFilter = "";

			$scope.$on("reloadElasticSnapshot", function() {
				$ctrl.reloadSnapshot();
			});

		}

	}

	controller.$inject = ["$q", "$scope", "Elastic"];
	function    controller($q,   $scope,   Elastic) {

		var $ctrl = this;

		$ctrl.reloadSnapshot = function() {
			$scope.loading = true;
			return Elastic.snapshot()
				.then(function(res) {
					$scope.snapshotRepoData = res.data;
					angular.forEach(res.data, function(snapshot, name) {
						$scope.snapshotRepo = $scope.snapshotRepo || name;
					});

					if ($scope.snapshotRepo) {
						return $ctrl.reloadSnapshotAll($scope.snapshotRepo);
					}
				})
				.finally(function() {
					$scope.loading = false;
				});
		};

		$ctrl.reloadSnapshotAll = function(indices) {
			return Elastic.snapshotAll(indices)
				.then(function(res) {
					$scope.snapshotAll = res.data;
				});
		};

		$ctrl.setSnapshotOrderBy = function(orderby) {
			if ($scope.snapshotOrderBy === orderby) {
				$scope.snapshotOrderBy = "-" + orderby;
			} else {
				$scope.snapshotOrderBy = orderby;
			}
		};

		$ctrl.deleteSnapshot = function(snapshotName) {
			$scope.deleting = true;
			return Elastic.deleteSnapshot($scope.snapshotRepo, snapshotName)
				.then(function() {
					return $ctrl.reloadSnapshotAll($scope.snapshotRepo);
				})
				.then(function() {
					$scope.deleting = false;
				});
		};

		// $ctrl.deleteIndex = function(index) {
		// 	return Elastic.deleteIndex(index)
		// 		.then(function() {
		// 			return $ctrl.reloadStatsIndices();
		// 		});
		// };
		//
		// $ctrl.reloadStatsIndices = function() {
		// 	$scope.loadingStatsIndices = true;
		// 	return $q.all([
		// 		Elastic.stats(),
		// 		Elastic.clusterState()
		// 	])
		// 	.then(function(res) {
		// 		$scope.stats = res[0].data;
		// 		$scope.clusterState = res[1].data;
		// 		$scope.statsIndices = [];
		// 		angular.forEach($scope.stats.indices, function(idx, name) {
		// 			idx.index = name;
		// 			idx.docs = idx.total.docs.count;
		// 			idx.size = idx.primaries.store.size_in_bytes;
		// 			idx.metadata = angular.copy($scope.clusterState.metadata.indices[name]);
		// 			$scope.statsIndices.push(idx);
		// 		});
		// 	})
		// 	.finally(function() {
		// 		$scope.loadingStatsIndices = false;
		// 	});
		// };
		//
		// $ctrl.onReplicaKeyup = function(ev, idx, indexForm) {
		// 	switch (ev.keyCode) {
		// 	case 13: // [ENTER]
		// 		angular.element(ev.target).blur();
		// 		Elastic.setIndexNumberOfReplicas(idx.index, idx.metadata.settings.index.number_of_replicas)
		// 			.then(function() {
		// 				return $ctrl.reloadStatsIndices();
		// 			});
		// 		break;
		// 	}
		// };

	}

})();
