/* jshint node:true */
module.exports = function(grunt) {
    'use strict';

    var zazmerge   = require('zaz-center/root/grunt/tasks/zaz-merge.js');
    var morph      = require('zaz-center/root/grunt/tasks/zaz-morph.js');
    var rootConfig = zazmerge( require('./settings/gruntconfig.js').getConfig(grunt), morph.config);
    var userConfig;
    var configs;
    morph.tasks(grunt);

    userConfig = {
        sassFile: 'theme-default',
        cssFile: 'theme-default',
        morphType: ['all'], // legacy, standalone, regular, mobi || only one: ['all']
        morphWatchType: 'regular' // regular || standalone || mob || legacy
    };

    configs = zazmerge(userConfig, rootConfig);

    grunt.initConfig(configs);
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    /* Tasks */
    grunt.registerTask('test', ['connect:test', 'qunit:all']);
    grunt.registerTask('lint', ['scsslint', 'csslint', 'jshint', 'jsonlint']);
    grunt.registerTask('docs', ['yuidoc', 'gh-pages']);
    grunt.registerTask('build', ['clean', 'morph', 'copy:tests', 'concat', 'uglify']);
    grunt.registerTask('default', ['lint', 'build']);

    /* CI Tasks */
    grunt.registerTask('ci-build', ['build']);
    grunt.registerTask('ci-validate', ['lint', 'test']);

};
