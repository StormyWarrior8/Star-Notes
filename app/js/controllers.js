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
