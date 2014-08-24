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
