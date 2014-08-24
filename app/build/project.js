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

        $routeProvider.when( "/list", {
            templateUrl: "templates/list.html",
            controller: "List"
        } );

        $routeProvider.when( "/sync-setup", {
            templateUrl: "templates/sync-setup.html",
            controller: "SyncSetup"
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


ctlMod.controller( "AddFolder", [ "$scope", "Folder",
    function ( $scope, Folder ) {

        $scope.folder = {
            name: ""
        };

        $scope.save = function () {
            Folder.add( $scope.folder, function ( err, data ) {
                if ( err ) {
                    console.log( "ERROR" );
                    console.log( err );
                }
                console.log( data );
            } );
        };

    } ] );


ctlMod.controller( "List", [ "$scope", function ( $scope ) {

} ] );


ctlMod.controller( "SyncSetup", [ "$scope", function ( $scope ) {

} ] );

var svcMod = angular.module( "linksApp.services", [] );


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


svcMod.factory( "Folder", [ "DB", "applyScope",
    function ( $rootScope, DB ) {
        return {
            add: function ( doc, done ) {

                doc.type = "folder";
                DB.post( doc, function ( err, res ) {
                    return applyScope( err, res, done );
                } );

            },
            list: function ( done ) {

                var map = function ( doc ) {
                    if ( doc.type === "folder" ) {
                        emit( doc.name );
                    }
                };

                var options = {
                    reduce: false,
                    include_docs: true
                };

                DB.query( { map: map }, options, function ( err, res ) {
                    return applyScope( err, res, done );
                } );

            }
        };
    } ] );
