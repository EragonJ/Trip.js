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
    },
    uglify: {
      my_target: {
        options: {
          preserveComments: 'some'
        },
        files: {
          'src/trip.min.js': ['src/trip.js']
        }
      }
    },
    sass: {
      dist_non_compressed: {
        options: {
          compass: true
        },
        files: {
          'src/trip.css': 'src/trip.scss'
        }
      },
      dist_compressed: {
        options: {
          compass: true,
          style: 'compressed'
        },
        files: {
          'src/trip.min.css': 'src/trip.scss'
        }
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: {
          'demo-basic.html': 'views/demo-basic.jade',
          'documentation.html': 'views/documentation.jade',
          'index.html': 'views/index.jade'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');

  // Default task(s).
  grunt.registerTask('test', ['connect', 'qunit']);
  grunt.registerTask('html', ['jade']);
  grunt.registerTask('scss', ['sass']);
  grunt.registerTask('minify', ['uglify']);
  grunt.registerTask('build', ['uglify', 'sass', 'jade']);
};
