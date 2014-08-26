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

        $routeProvider.when( "/folders", {
            templateUrl: "templates/folders-list.html",
            controller: "FoldersList"
        } );

        $routeProvider.when( "/folders/:id", {
            templateUrl: "templates/folders-detail.html",
            controller: "FoldersDetail"
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


ctlMod.controller( "AddLink", [ "$scope", "Folder",
    function ( $scope, Folder ) {

        $scope.availableFolders = [];

        Folder.list( function ( err, data ) {

            if ( err ) {
                return;
            }

            $scope.availableFolders = data.rows;

        } );

    } ] );


ctlMod.controller( "AddFolder", [ "$scope", "$rootScope", "Folder",
    function ( $scope, $rootScope, Folder ) {

        $scope.folder = {
            name: ""
        };

        $scope.save = function () {

            Folder.add( $scope.folder, function ( err, data ) {

                if ( err ) {
                    return;
                }

                console.log( data );
                clearForm();

            } );

        };

        var clearForm = function () {
            $scope.folder.name = "";
        };

    } ] );


ctlMod.controller( "FoldersList", [ "$scope", "$rootScope", "Folder",
    function ( $scope, rootScope, Folder ) {

        Folder.list( function ( err, data ) {

            if ( err ) {
                return;
            }

            $scope.folders = data.rows;

        } );

    } ] );


ctlMod.controller( "FoldersDetail", [ "$scope", "$rootScope", "$routeParams", "Folder",
    function ( $scope, rootScope, routeParams, Folder ) {

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
    function ( DB, applyScope ) {
        return {
            add: function ( doc, done ) {

                doc.type = "folder";
                DB.post( doc, function ( err, res ) {
                    return applyScope( err, res, done );
                } );

            },
            list: function ( done ) {

                var options = {
                    include_docs: true,
                    descending: true
                };

                DB.allDocs( options, function( err, data ) {
                    return applyScope( err, data, done );
                } );

            }
        };
    } ] );
