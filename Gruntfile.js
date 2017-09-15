module.exports = function(grunt){
    
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        
        // code style patterns
        jshint: {
          files: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
          options: {
            globals: {
              jQuery: true,
              console: true,
              module: true
            }
          }
        },
        
        watch: {
          files: ['<%= jshint.files %>'],
          tasks: ['jshint']
        },
        
        useminPrepare: {
            html: 'app/index.html',
            options:{
                dest: 'dist/<%= pkg.name %>'
            }
        },
        
        usemin: {
            html:['dist/<%= pkg.name %>/index.html'],
        },
        
        copy: {
            main:{
                files:[
                    {
                        expand : true,
                        cwd: 'app',
                        src: ['*.html'],
                        dest: 'dist/<%= pkg.name %>'
                    }
                ]
            },
            
            resources:{
                files:[
                    {
                        expand : true,
                        cwd: 'app/resources',
                        src: ['**/*.png', '**/*.json', '**/*.gif'],
                        dest: 'dist/<%= pkg.name %>/resources'
                    }
                ]
            },
            
            views:{
                files:[
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['*/views', '*/views/*.html'],
                        dest: 'dist/<%= pkg.name %>'
                    }
                ]
            },
            
            fonts0:{
                files:[
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome',
                        src: ['fonts/*.*'],
                        dest: 'dist/<%= pkg.name %>/resources'
                    }
                ]
            },
            
            fonts1:{
                files:[
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: 'dist/<%= pkg.name %>/resources'
                    }
                ]
            },
            
            img:{
                files:[
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/jquery-ui/themes/pepper-grinder/images',
                        src: ['*.*'],
                        dest: 'dist/<%= pkg.name %>/resources/css/images'
                    }
                ]
            },

            deploy:{
                files:[
                    {
                        expand : true,
                        src : ['dist/**'],
                        dest: '/opt/data/webapp/mentoring'
                    }
                ]
            }
        },

        // compress :{
        //     main: {
        //         options: {
        //           archive: 'apache/<%= pkg.name %>.zip'
        //         },
        //         files: [{
        //           expand: true,
        //           cwd: 'dist/',
        //           src: ['**/*'],
        //           dest: '/'
        //         }]
        //       }
        // },

        clean : {
            options: {
                'force': true
            },
            build : ['dist/<%= pkg.name %>'],
            deploy: ['dist/<%= pkg.name %>', '/opt/data/webapp/mentoring/dist/<%= pkg.name %>']
        },

        connect:{
            server:{
                options:{
                    port:3000,
                    hostname: '0.0.0.0',
                    keepalive: true,
                    //base: 'dist/<%= pkg.name %>',
                    
                    middleware: function (connect, options, defaultMiddleware) {
                         var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        
                         return [
                            // Include the proxy first
                            proxy
                         ].concat(defaultMiddleware);
                    }
                },
                
                proxies: [
                    {
                        context: '/mentoring-integ',
                        host: 'localhost',
                        port: 8080
                    },

                    {
                        context: '/account-manager-web',
                        host: 'localhost',
                        port: 8081
                    }
                ]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    // grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', ['clean:build', 'jshint','copy:main', 'copy:resources', 'copy:views', 'copy:fonts0', 'copy:fonts1', 'copy:img', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'usemin']);
    grunt.registerTask('deploy', ['clean:deploy', 'build', 'copy:deploy']);
    
    grunt.registerTask('serve', function(){
        return grunt.task.run(['build', 'configureProxies:server', 'connect']);
    });
};