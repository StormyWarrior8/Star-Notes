var svcMod = angular.module( "linksApp.services", [] );


svcMod.factory( "applyScope", [ "$rootScope",
    function ( $rootScope ) {
        return function ( err, data, done ) {
            $rootScope.$apply( function () {
                console.log( err );
                console.log( data );
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

                DB.allDocs( { include_docs: true, descending: true }, function( err, doc ) {
                    return applyScope( err, doc, done );
                } );

            }
        };
    } ] );
