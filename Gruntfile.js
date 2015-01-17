module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },

      all: [
        'Gruntfile.js',
        'app/js/**/*.js',
        'spec/**/*.js'
      ]
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: 'app/js/**/*.js',
        dest: 'jim.js'
      }
    },

    karma: {
      options: {
        frameworks: ['jasmine']
      },
      unit: {
        options: {
          singleRun: true,
          browsers: ['PhantomJS'],
          files: [
            'app/bower_components/lodash/dist/lodash.min.js',
            'app/js/**/*.js',
            'spec/javascripts/helpers/**/*.js',
            'spec/**/*.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'karma:unit']);
};
