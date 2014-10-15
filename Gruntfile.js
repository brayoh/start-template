module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt)

    grunt.initConfig({
        min: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['js/lib/*.js', 'js/config/*.js', 'js/services/*.js', 'js/controllers/*.js', 'js/directives/*.js'],
                dest: 'js/app.js',
            },
        },
        concat: {
            options: {
                separator: '\r\n\r\n\r\n\r\n\r\n\r\n/******************************************************************************************************/\r\n/******************************************************************************************************/\r\n/******************************************************************************************************/\r\n/******************************************************************************************************/\r\n/******************************************************************************************************/\r\n\r\n',
            },
            dist: {
                src: ['js/lib/*.js', 'js/config/*.js', 'js/services/*.js', 'js/controllers/*.js', 'js/directives/*.js'],
                dest: 'js/app.js',
            },
        },
    });

    grunt.registerTask('default', ['min']);
    grunt.registerTask('nomin', ['concat']);

};