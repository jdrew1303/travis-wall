module.exports = function(grunt) {
    grunt.initConfig({
        express: {
            options: {
                script: 'server.js'
            },
            dev: {}
        },
        bower: {
            install: {
                options: {
                    targetDir: 'bower_components',
                    copy: false
                }
            }
        },
        ngmin: {
            app: {
                src: [ 'lib/**/*.js' ],
                dest: 'build/app.js'
            }
        },
        copy: {
            app: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [ 'lib/partials/*' ],
                    dest: 'public/partials/'
                }]
            }
        },
        less: {
            app: {
                files: {
                    'build/app.css': 'less/app.less'
                }
            }
        },
         cssmin : {
            app: {
                src: 'build/app.css',
                dest: 'public/css/app.min.css'
            }
        },
        uglify: {
            app: {
                files: {
                    'public/js/app.min.js': [
                        'bower_components/jquery/jquery.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-route/angular-route.js',
                        'bower_components/angular-masonry/angular-masonry.js',
                        'bower_components/get-style-property/get-style-property.js',
                        'bower_components/get-size/get-size.js',
                        'bower_components/eventie/eventie.js',
                        'bower_components/doc-ready/doc-ready.js',
                        'bower_components/eventEmitter/EventEmitter.js',
                        'bower_components/jquery-bridget/jquery.bridget.js',
                        'bower_components/matches-selector/matches-selector.js',
                        'bower_components/imagesloaded/imagesloaded.js',
                        'bower_components/outlayer/item.js',
                        'bower_components/outlayer/outlayer.js',
                        'bower_components/masonry/masonry.js',
                        'bower_components/momentjs/min/moment-with-langs.js',
                        'build/app.js'
                    ]
                }
            }
        },
        watch: {
            less: {
                files:  [ 'less/**/*' ],
                tasks:  [ 'build', 'express:dev' ],
                options: {
                    spawn: false
                }
            },
            lib: {
                files:  [ 'lib/**/*' ],
                tasks:  [ 'build', 'express:dev' ],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('install', [ 'bower:install' ]);
    grunt.registerTask('build', [ 'copy', 'less', 'cssmin', 'ngmin', 'uglify' ]);

    grunt.registerTask('bootstrap', [ 'install', 'build' ]);

    grunt.registerTask('server', [ 'install', 'build', 'express:dev' ]);
    grunt.registerTask('dev', [ 'server', 'watch' ]);
};
