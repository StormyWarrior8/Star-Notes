module.exports = function( grunt ) {

    grunt.initConfig( {
        pkg: grunt.file.readJSON( "package.json" ),
        watch: {
            scripts: {
                files: [
                    "app/js/*"
                ],
                tasks: [ "concat:scripts" ]
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: true,
                banner: "/*! <%= pkg.name %> <%= grunt.template.today( 'yyyy-mm-dd' ) %> */",
                sourceMap: true,
                sourceMapName: "app/build/project.js.map"
            },
            project: {
                files: {
                    "app/build/project.js": [
                        "app/js/*"
                    ]
                }
            }
        },
        concat: {
            scripts: {
                src: [
                    "app/js/*"
                ],
                dest: "app/build/project.js"
            },
            angular: {
                src: [
                    "app/bower_components/angular/angular.min.js",
                    "app/bower_components/angular-route/angular-route.min.js"
                ],
                dest: "app/build/angular.js"
            }
        },
        cssmin: {
            combine: {
                files: {
                    "app/build/style.css": [
                        "app/css/font-awesome.min.css",
                        "app/css/ui-kit.css",
                        "app/css/custom.css"
                    ]
                }
            }
        }
    } );

    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask( "default", [
        "concat:scripts",
        "concat:angular",
        "cssmin:combine"
    ] );

    grunt.registerTask( "deploy",  [
        "uglify",
        "concat:angular"
    ] );

};
