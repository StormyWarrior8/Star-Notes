var svcMod = angular.module( "linksApp.services", [] );


svcMod.factory( "DB", [ "$rootScope", function ( $rootScope ) {

    var db = new PouchDB( "linksDB" );

    if ( $rootScope.syncEnabled ) {
        // TODO
    }

    return db;

} ] );
