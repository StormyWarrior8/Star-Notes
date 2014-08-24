var angMod = angular.module( "linksApp", [
    "ngRoute",
    "linksApp.controllers",
    "linksApp.services"
] );


angMod.config( [
    "$routeProvider",
    "$locationProvider",
    "$sceDelegateProvider",
    function ( $routeProvider, $locationProvider, $sceDelegateProvider ) {

        $routeProvider.when( "/add-link", {
            templateUrl: "templates/add-link.html",
            controller: "AddLink"
        } );

        $routeProvider.when( "/add-folder", {
            templateUrl: "templates/add-folder.html",
            controller: "AddFolder"
        } );

        $routeProvider.otherwise( {
            redirectTo: "/add-link"
        } );

} ] );

var ctlMod = angular.module( "linksApp.controllers", [] );

ctlMod.controller( "Main", [ "$scope", "$location",
    function ( $scope, $location ) {

        $scope.isActiveNavItem = function ( view ) {

            return view === $location.path();

        };

    } ] );


ctlMod.controller( "AddLink", [ "$scope", function ( $scope ) {

} ] );


ctlMod.controller( "AddFolder", [ "$scope", function ( $scope ) {

} ] );

var svcMod = angular.module( "linksApp.services", [] );
