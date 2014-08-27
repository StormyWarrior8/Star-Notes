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
