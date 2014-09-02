var angMod = angular.module( "starNotes", [
    "ngRoute",
    "starNotes.controllers",
    "starNotes.services"
] );


angMod.config( [
    "$routeProvider",
    "$locationProvider",
    "$sceDelegateProvider",
    function ( $routeProvider, $locationProvider, $sceDelegateProvider ) {

        $routeProvider.when( "/", {
            templateUrl: "templates/home.html",
            controller: "Home"
        } );

        $routeProvider.otherwise( {
            redirectTo: "/"
        } );

} ] );
