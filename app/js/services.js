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

        var db = new PouchDB( "linksDB", {
            ajax: {
                cache: false
            }
        } );

        // if ( $rootScope.syncEnabled ) {
        //     // TODO
        // }

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

                var mr = {
                    map: function ( doc, emit ) {
                        emit( doc.name, doc.name );
                    }
                };

                var options = {
                    include_docs: true
                };

                DB.query( mr, options, function ( err, res ) {
                    return applyScope( err, res, done );
                } );

                // DB.allDocs( { include_docs: true, descending: true }, function( err, doc ) {
                //     return applyScope( err, doc, done );
                // } );

            }
        };
    } ] );
