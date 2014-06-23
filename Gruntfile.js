module.exports = function(grunt){
  grunt.initConfig({

    browserify: {
      dist: {
        src: [
          'src/utils.js',
          'src/minefield.js',
          'src/fieldlocation.js',
          'src/mineplacer.js',
          'src/cursor.js',
          'src/namespace.js'
        ],
        dest: 'dist/landmine.js'
      }
    },

    uglify: {
      options: {
        banner: '//landmine.js\n'
      },
      dist: {
        files: {
          'dist/landmine.min.js': ['<%= browserify.dist.dest %>']
        }
      }
    },

    jshint: {
      files: ['gruntfile.js', 'src/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
          document: true
        },
        ignores: ['src/intro.js', 'src/outro.js']
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          growl : true
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'test/*.js'],
      tasks: ['jshint', 'browserify', 'uglify', 'mochaTest']
      }
    });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['jshint', 'browserify', 'mochaTest', 'uglify']);
  grunt.registerTask('test', ['jshint', 'browserify', 'mochaTest']);
};
