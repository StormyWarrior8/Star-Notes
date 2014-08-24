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
