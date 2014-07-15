module.exports = function(grunt){
  grunt.initConfig({

    browserify: {
      dist: {
        src: 'src/**/*.js',
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
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
          document: true,
          describe: true,
          it: true,
          beforeEach: true,
          require: true,
          setInterval: true,
          clearInterval: true,
          window: true,
          setTimeout: true
        },
        ignores: ['src/intro.js', 'src/outro.js'],
        curly: true,
        eqeqeq: true,
        forin: true,
        indent: 2,
        latedef: true,
        newcap: true,
        undef: true,
        unused: true,
        trailing: true
      }
    },
    mochaTest: {
      tdd: {
        options: {
          growl : true
        },
        src: ['test/**/*.js']
      },
      build: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'test/*.js'],
      tasks: ['jshint', 'mochaTest:tdd', 'browserify', 'uglify']
      },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
	commit: true,
	commitMessage: 'Release v%VERSION%',
	commitFiles: ['package.json', 'bower.json', 'dist/*.js'],
	createTag: true,
	tagName: 'v%VERSION%',
	tagMessage: 'Version %VERSION%',
	push: false
      }
    }
    });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', ['jshint', 'mochaTest:build', 'browserify', 'uglify']);
  grunt.registerTask('test', ['jshint', 'mochaTest:build']);
  grunt.registerTask('release', ['default', 'bump']);
};
