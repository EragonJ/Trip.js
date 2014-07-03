module.exports = function(grunt) {
  var pathToInk = 'node_modules/grunt-jsdoc/node_modules/ink-docstrap';

  // Project configuration.
  grunt.initConfig({
    qunit: {
      all: {
        options: {
          timeout: 10000,
          urls: [
            'http://localhost:8000/tests/trip_events/test.html',
            'http://localhost:8000/tests/directions/test.html',
            'http://localhost:8000/tests/themes/test.html',
            'http://localhost:8000/tests/key_events/test.html',
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
          'doc/documentation-1.3.html': 'views/documentation-1.3.jade',
          'doc/documentation.html': 'views/documentation.jade',
          'index.html': 'views/index.jade'
        }
      }
    },
    jshint: {
      options: {
        maxlen: 80,
        globals: {
          jQuery: true
        }
      },
      all: [
        'Gruntfile.js',
        'src/trip.js'
      ],
    },
    replace: {
      configfiles: {
        src: [
          'trip.jquery.json',
          'package.json',
          'component.json'
        ],
        overwrite: true,
        replacements: [{
          from: (function() {
            return new RegExp('"version": "' + grunt.option('oldv') + '",');
          })(),
          to: function() {
            return '"version": "' + grunt.option('newv') + '",';
          }
        }]
      },
      sourcefiles: {
        src: [
          'views/index.jade',
          'src/trip.js',
          'README.md'
        ],
        overwrite: true,
        replacements: [{
          from: (function() {
            return new RegExp(grunt.option('oldv'));
          })(),
          to: function() {
            return grunt.option('newv');
          }
        }]
      }
    },
    jsdoc: {
      dist: {
        src: ['src/trip.js', '.jsdoc_index.md'],
        options: {
          destination: 'doc',
          template : pathToInk + '/template',
          configure : pathToInk + '/template/jsdoc.conf.json'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-text-replace');

  // Default task(s).
  grunt.registerTask('test', ['connect', 'qunit']);
  grunt.registerTask('html', ['jade']);
  grunt.registerTask('scss', ['sass']);
  grunt.registerTask('minify', ['jshint', 'uglify']);
  grunt.registerTask('build', ['minify', 'sass']);
  grunt.registerTask('doc', ['jsdoc', 'jade']);
  grunt.registerTask('all', ['build', 'doc']);
  grunt.registerTask('bumpversion',
    ['replace:configfiles', 'replace:sourcefiles', 'build']);

  // How to bump version ?
  //
  // grunt bumpversion --oldv=1.3.0 --newv=2.0.0
  //
  // NOTE: 
  //
  // 1. After bumping versions, we will also build again to make sure
  // this change old get reflected into built files also.
  //
  // 2. Because the matching rule is very easy, we have to check version
  // again after bumping to make sure we won't override the wrong words.
};
