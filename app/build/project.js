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

        var resolve = {
            checkLogin: function ( Login ) {
                return Login.checkLogin();
            }
        };

        $routeProvider.when( "/", {
            templateUrl: "templates/home.html",
            controller: "Home"
        } );

        $routeProvider.when( "/settings", {
            templateUrl: "templates/settings.html",
            controller: "Settings"
        } );

        $routeProvider.otherwise( {
            redirectTo: "/"
        } );

} ] );

var ctlMod = angular.module( "starNotes.controllers", [] );


ctlMod.controller( "Main", [ "$scope", "$location",
    function ( $scope, $location ) {

        $scope.isActiveNavItem = function ( view ) {

            return view === $location.path();

        };

    } ] );


ctlMod.controller( "Home", [ "$scope",
    function ( $scope ) {

    } ] );


ctlMod.controller( "Settings", [ "$scope",
    function ( $scope ) {

    } ] );

var svcMod = angular.module( "starNotes.services", [] );


svcMod.factory( "applyScope", [ "$rootScope",
    function ( $rootScope ) {
        return function ( err, data, done ) {
            $rootScope.$apply( function () {
                if ( err ) {
                    return done( err );
                }
                return done( null, data );
            } );
        };
    } ] );


svcMod.factory( "DB", [ "$rootScope",
    function ( $rootScope ) {

        var db = new PouchDB( "linksDB" );

        if ( $rootScope.syncEnabled ) {
            // TODO
        }

        return db;

    } ] );


svcMod.factory( "GUI", [ function () {

    var gui = require('nw.gui');

    return gui;

} ] );


svcMod.factory( "Login", [ "$rootScope", "$location",
    function ( $rootScope, $location ) {
        return {
            checkLogin: function () {
                // TODO: check login and redirect to get-started as needed
            }
        };
    } ] );
