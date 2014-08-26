var ctlMod = angular.module( "linksApp.controllers", [] );

ctlMod.controller( "Main", [ "$scope", "$location",
    function ( $scope, $location ) {

        $scope.isActiveNavItem = function ( view ) {

            return view === $location.path();

        };

    } ] );


ctlMod.controller( "AddLink", [ "$scope", "Folder",
    function ( $scope, Folder ) {

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
                console.log( data );

            } );

        };

        var clearForm = function () {
            $scope.link.url = "";
            $scope.link.note = "";
            $scope.folder = {};
        };

    } ] );


ctlMod.controller( "AddFolder", [ "$scope", "$rootScope", "Folder",
    function ( $scope, $rootScope, Folder ) {

        $scope.folder = {
            name: ""
        };

        $scope.save = function () {

            Folder.add( $scope.folder, function ( err, data ) {

                if ( err ) {
                    // TODO: broadcast error
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
                // TODO: broadcast error
                return;
            }

            $scope.folders = data.rows;
            console.log( $scope.folders );

        } );

    } ] );


ctlMod.controller( "FoldersDetail", [ "$scope", "$rootScope", "$routeParams", "Folder",
    function ( $scope, $rootScope, $routeParams, Folder ) {

        Folder.read( $routeParams.id, function ( err, data ) {

            if ( err ) {
                console.log( err );
                return;
            }

            $scope.folder = data;

        } );

    } ] );


ctlMod.controller( "SyncSetup", [ "$scope", function ( $scope ) {

} ] );
