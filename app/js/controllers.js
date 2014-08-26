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
