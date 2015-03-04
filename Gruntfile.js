module.exports = function(grunt) {
  var pathToInk = 'node_modules/grunt-jsdoc/node_modules/ink-docstrap';

  // Project configuration.
  grunt.initConfig({
    qunit: {
      all: {
        options: {
          timeout: 10000,
          urls: [
            'http://localhost:8000/tests/core/test.html',
            'http://localhost:8000/tests/trip_events/test.html',
            'http://localhost:8000/tests/directions/test.html',
            'http://localhost:8000/tests/themes/test.html',
            'http://localhost:8000/tests/key_events/test.html',
            'http://localhost:8000/tests/integration/test.html',
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
          'dist/trip.min.js': ['dist/trip.js']
        }
      }
    },
    sass: {
      dist_non_compressed: {
        options: {
          compass: true,
          sourcemap: 'none'
        },
        files: {
          'dist/trip.css': 'src/trip.scss'
        }
      },
      dist_compressed: {
        options: {
          compass: true,
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'dist/trip.min.css': 'src/trip.scss'
        }
      }
    },
    concat: {
      dist: {
        // we have to sore this in order to make sure nothing would get wrong
        src: [
          'src/trip._header_.js',
          'src/trip.parser.js',
          'src/trip.core.js'
        ],
        dest: 'dist/trip.js'
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
          'doc/src/setup.markdown',
          'src/trip._header_.js',
          'views/src/_index.html',
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
        src: ['dist/trip.js', '.jsdoc_index.md'],
        options: {
          destination: 'doc/jsdoc',
          template : pathToInk + '/template',
          configure : pathToInk + '/template/jsdoc.conf.json'
        }
      }
    },
    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'doc/src/*.markdown',
            dest: 'doc',
            flatten: true,
            ext: '.html'
          }
        ],
        options: {
          template: 'doc/src/_template.html',
          autoTemplate: true,
          autoTemplateFormat: 'html',
          markdownOptions: {
            gfm: true,
            highlight: 'manual',
            codeLines: {
              before: '<span>',
              after: '</span>'
            }
          }
        }
      }
    },
    includereplace: {
      all: {
        files: {
          './index.html': ['views/src/_index.html'],
          './demo.html': ['views/src/_demo.html'],
          './doc-configuration.html': ['doc/configuration.html'],
          './doc-setup.html': ['doc/setup.html']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-include-replace');

  // Default task(s).
  grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
  grunt.registerTask('scss', ['sass']);
  grunt.registerTask('minify', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('build', ['minify', 'sass']);
  grunt.registerTask('doc', ['markdown', 'includereplace']);
  grunt.registerTask('all', ['build', 'jsdoc']);
  grunt.registerTask('bumpversion',
    ['replace:configfiles', 'replace:sourcefiles', 'build', 'doc', 'jsdoc']);

  // How to bump version ?
  //
  // grunt bumpversion --oldv=1.3.0 --newv=2.0.0
  //
  // NOTE:
  //
  // 1. After bumping versions, we will also build again to make sure
  // this change get reflected into built files also.
  //
  // 2. Because the matching rule is very easy, we have to check version
  // again after bumping to make sure we won't override the wrong words.
};
