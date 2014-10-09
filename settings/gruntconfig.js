/* global module, require, define */
module.exports = {
    getConfig: function (grunt) {
        "use strict";
        var paths = {
                port: 8000 + parseInt((new Date()).getTime().toString().substring(10), 10),
                dist: 'dist/',
                src: 'src/',
                docs: 'docs/',
                tests: 'tests/',
                rcs: "node_modules/zaz-center/root/linters/"
            },
            embed;

        embed = require('zaz-center/root/grunt/tasks/embed-includes.js').config(grunt);

        return {
            // reading the package.json file
            "pkg": grunt.file.readJSON('package.json'),

            // ALWAYS USE JSHINT
            "jshint": {
                "options" : {
                    "jshintrc" : paths.rcs + ".jshintrc"
                },
                "all": [
                    'GruntFile.js',
                    'src/**.js',
                    'src/**/**.js',
                    '!src/**/*.min.js'
                ]
            },

            // lint your json files as well, so you don't waiste your time
            "jsonlint": {
                "all": {
                    "src": [
                        "src/**.json",
                        "src/**/**.json"
                    ]
                }
            },

            // concatenates for apps
            "concat": {
                "dist": {
                    "options": {
                        "separator": "\n",
                        "process": function (content, srcpath) {
                            return embed.includes(content);
                        }
                    },
                    "src": [
                        "src/_js/dictionaries/**.js",
                        "src/_js/zaz-app-social-comments.js",
                        "src/_js/addons/**.js"
                    ],
                    "dest": "dist/_js/zaz-app-social-comments.js"
                }
            },


            // copies files from src to dist
            "copy" : {
                // here, it shall copy normal files, avoiding the temporary ones
                "files": {
                    "expand": true,
                    "cwd": 'src/',
                    "src": ['**',
                          '!_js/zaz-app-social-comments.js',
                          '!**/*.html',
                          '!_scss',
                          '!**/*.src.*',
                          '!temp/**',
                          '!**/*.bkp',
                          '!**/*.old'],
                    "dest": paths.dist,
                    "filter": 'isFile',
                    "options": {
                        // it also processes the file contents so you can include
                        // other files, like this
                        // // !include path/to/file.js
                        "processContent": function (content, srcpath) {
                            return content; //embed.includes(content);
                        },
                        "noProcess": '**/*.{png,gif,jpg,jpeg,ico,woff,ttf,eot,svg,wf2}'
                    }
                },

                // also copy the test files to production dist environment
                "tests": {
                    "expand": true,
                    "cwd": 'tests/',
                    "src": ['**'],
                    "dest": paths.dist + "/tests/",
                    "filter": 'isFile'
                },

                "prepareMorph": {
                    "files": [{
                        "expand": true,
                        "cwd": 'node_modules/zaz-center/root/scss',
                        "src": [
                            '**'
                        ],
                        "dest": 'src/_scss/.engine',
                        "flatten": true,
                        "filter": 'isFile'
                    }]
                }
            },

            // watch for changes in files, it will make your work easier
            "watch": {
                "options": {
                    "livereload": false
                },
                "scripts": {
                    "files": ['src/**.js', 'src/**/*.js'],
                    "tasks": ['default'],
                    "options": {
                        "spawn": false,
                        "interval": 500
                    }
                },

                "sass": {
                    "files": ['src/_scss/**.scss', 'src/_scss/**.css', '!src/_scss/engine/**', '!**/**._*'],
                    "tasks": ['lint', 'sass:<%= morphWatchType %>', 'cmq:<%= morphWatchType %>', 'cssmin:<%= morphWatchType %>']
                }
            },

            // perform unit tests, this way you can be more sure of your
            // work's quality
            "qunit": {
                "all": {
                    "options": {
                        "urls": [
                            'http://localhost:' + paths.port + '/tests/index.htm'
                        ]
                    }
                }
            },

            // used by qunit to run unit tests in your terminal
            "connect": {
                "test": {
                    "options": {
                        "port": paths.port,
                        "base": '.',
                        "keepalive" : false
                    }
                }
            },

            // minifies your .js files
            "uglify": {
                "options": grunt.file.readJSON(paths.rcs + '.uglifyrc'),
                "core": {
                    "files": [
                        {
                            "dist/_js/zaz-app-social-comments.min.js": "dist/_js/zaz-app-social-comments.js"
                        }
                    ]
                }
            },

            // removes files
            "clean": ["dist"],

            // generate documentation based on your comments in your js files.
            "yuidoc": {
                "compile": {
                    "name": '<%= pkg.name %>',
                    "description": '<%= pkg.description %>',
                    "version": '<%= pkg.version %>',
                    "url": '<%= pkg.homepage %>',
                    "options": {
                        "paths": ['src/'],
                        "themedir": 'node_modules/zaz-center/root/yuidocs/themes/quick/',
                        "outdir": 'docs/api/'
                    }
                }
            },

            // sends your documentation from your directory ./docs to the branch gh-pages
            "gh-pages": {
                "options": {
                    "base": 'docs'
                },
                "src": ['**']
            }
        };
    }
};
