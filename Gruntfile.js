module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');

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
    }
  });
};
