module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    qunit: {
      all: {
        options: {
          timeout: 10000,
          urls: [
            'http://localhost:8000/tests/test.html'
          ]
        }
      }
    },
    connect: {
      server: {
        option: {
          port: 8000,
          base: 'tests'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('test', ['connect', 'qunit']);
};
