var fs = require('fs');

module.exports = function(grunt) {
  var pathToInk = 'node_modules/grunt-jsdoc/node_modules/ink-docstrap';
  var tripLicenseInfo = fs.readFileSync('./src/trip._header_.js', 'utf8');

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
    sass: {
      dist_non_compressed: {
        options: {
          compass: true,
          sourcemap: 'none'
        },
        files: {
          'dist/trip.css': './src/styles/trip.all.scss',
          'dist/trip.nodep.css': './src/styles/trip.nodep.scss'
        }
      },
      dist_compressed: {
        options: {
          compass: true,
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'dist/trip.min.css': './src/styles/trip.all.scss',
          'dist/trip.nodep.min.css': './src/styles/trip.nodep.scss'
        }
      }
    },
    webpack: {
      'trip.js': require('./webpack.config.js')
    },
    uglify: {
      options: {
        mangle: false,
        banner: tripLicenseInfo
      },
      target: {
        files: {
          './dist/trip.min.js': ['./dist/trip.js']
        }
      }
    },
    jscs: {
      // we will check distributed version directly and if there is any wrong,
      // we can go find related line from sources.
      src: 'src/trip.*.js',
      options: {
        config: '.jscsrc',
        verbose: true
      }
    },
    jshint: {
      options: {
        maxlen: 80
      },
      all: [
        'Gruntfile.js',
        'src/trip.*.js'
      ],
    },
    replace: {
      configfiles: {
        src: [
          'package.json',
          'bower.json'
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
          'src/trip._header_.js',
          'README.md'
        ],
        overwrite: true,
        replacements: [{
          from: (function() {
            return new RegExp(grunt.option('oldv'), 'g');
          })(),
          to: function() {
            return grunt.option('newv');
          }
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('test', ['connect', 'qunit']);
  grunt.registerTask('build-js', ['jshint', 'jscs', 'webpack', 'uglify']);
  grunt.registerTask('build-css', ['sass']);
  grunt.registerTask('build', ['build-js', 'build-css']);
  grunt.registerTask('bumpversion',
    ['replace:configfiles', 'replace:sourcefiles']);

  // How to bump version ?
  //
  // grunt bumpversion --oldv=1.3.0 --newv=2.0.0 && grunt build
  //
  // NOTE:
  //
  // 1. After bumping versions, we will also build again to make sure
  // this change get reflected into built files also.
  //
  // 2. Because the matching rule is very easy, we have to check version
  // again after bumping to make sure we won't override the wrong words.
};
