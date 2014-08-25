var svcMod = angular.module( "linksApp.services", [] );


var db = new PouchDB( "linksDB" );


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


// svcMod.factory( "DB", [ "$rootScope",
//     function ( $rootScope ) {

//         var db = new PouchDB( "linksDB", {
//             ajax: {
//                 cache: false
//             }
//         } );

//         // if ( $rootScope.syncEnabled ) {
//         //     // TODO
//         // }

//         return db;

//     } ] );


svcMod.factory( "Folder", [ "applyScope",
    function ( applyScope ) {
        return {
            add: function ( doc, done ) {

                doc.type = "folder";
                db.post( doc, function ( err, res ) {
                    return applyScope( err, res, done );
                } );

            },
            list: function ( done ) {

                db.allDocs( { include_docs: true, descending: true }, function( err, doc ) {
                    return applyScope( err, doc, done );
                } );

            }
        };
    } ] );
