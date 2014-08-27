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

        var clearForm = function () {
            $scope.link.url = "";
            $scope.link.note = "";
            $scope.folder = {};
        };

        Folder.list( function ( err, data ) {

            if ( err ) {
                // TODO: broadcast error
                return;
            }

            $scope.availableFolders = data.rows;

        } );

        $scope.link = {
            url: "",
            note: ""
        };

        $scope.save = function () {

            var folder = $scope.selectedFolder.doc;

            Folder.addLink( $scope.link, folder, function ( err, data ) {

                if ( err ) {
                    // TODO: broadcast error
                    return;
                }
                clearForm();

            } );

        };

    } ] );


ctlMod.controller( "AddFolder", [ "$scope", "$rootScope", "Folder",
    function ( $scope, $rootScope, Folder) {

        $scope.folder = {
            name: ""
        };

        $scope.save = function () {

            Folder.add( $scope.folder, function ( err, data ) {

                if ( err ) {
                    // TODO: broadcast error
                    return;
                }

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
                // TODO: broadcast error
                return;
            }

            $scope.folders = data.rows;

        } );

    } ] );


ctlMod.controller( "FoldersDetail", [ "$scope", "$rootScope", "$routeParams", "Folder",
    function ( $scope, $rootScope, $routeParams, Folder ) {

        var gui = require('nw.gui');

        Folder.read( $routeParams.id, function ( err, data ) {

            if ( err ) {
                console.log( err );
                return;
            }

            $scope.folder = data;
            console.log( $scope.folder );

        } );

        $scope.openLink = function ( url ) {
            gui.Shell.openExternal( url );
        };

    } ] );

var svcMod = angular.module( "linksApp.services", [] );
var gui = require('nw.gui');


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


svcMod.factory( "Folder", [ "DB", "applyScope",
    function ( DB, applyScope ) {
        return {
            add: function ( doc, done ) {

                doc.type = "folder";
                doc.links = [];
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

            },
            read: function ( folderId, done ) {

                DB.get( folderId, function ( err, data ) {
                    return applyScope( err, data, done );
                } );

            },
            addLink: function ( linkDoc, folderDoc, done ) {

                folderDoc.links.push( linkDoc );
                DB.put( folderDoc, function ( err, data ) {
                    return applyScope( err, data, done );
                } );

            }
        };
    } ] );
