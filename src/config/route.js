(function() {

	app.config(routeConfig);
	routeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	function    routeConfig($stateProvider,   $urlRouterProvider) {

		$urlRouterProvider.when("*path", routePathFilter);
		routePathFilter.$inject = ["$match"];
		function    routePathFilter($match) {
			if ($match.path) {
				var path = $match.path.replace(/\/+/g, "/").replace(/\/$/, "");
				if (path !== $match.path) {
					return path;
				}
			}
			return false;
		}

		$urlRouterProvider.otherwise("/");

	}

})();
