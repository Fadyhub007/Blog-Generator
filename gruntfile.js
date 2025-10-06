// import sass compiler
const sass = require('sass');
// Gruntfile.js - Project automation setup for web assets
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Minify JS
    uglify: {
      build: {
        src: 'src/assets/js/app.js',
        dest: 'dist/assets/js/app.min.js'
      }
    },
    // Minify CSS
    cssmin: {
      build: {
        src: 'dist/assets/css/style.css',
        dest: 'dist/assets/css/style.min.css'
      }
    },
    // Compile SASS
    sass: {
      dist: {
        files: {
          'dist/assets/css/style.css': 'src/assets/sass/style.scss'
        }
      }
    },
    // Optimize images
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/assets/images',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/assets/images/'
        }]
      }
    },
    // Minify HTML
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'src/index.html',
          'dist/ending.html': 'src/ending.html',
          'dist/river.html': 'src/river.html',
          'dist/mountain.html': 'src/mountain.html',
          'dist/forest.html': 'src/forest.html',
        }
      }
    },
    // Copy other assets (if needed)
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/', src: ['**/*.js', '!js/app.js'], dest: 'dist/'},
          {expand: true, cwd: 'src/', src: ['**/*.css', '!css/style.css'], dest: 'dist/'}
        ]
      }
    },
    clean: {
      build: ['dist']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', [
    'clean',
    'sass',
    'cssmin',
    'uglify',
    'imagemin',
    'htmlmin',
    'copy'
  ]);
  grunt.registerTask('default', ['build']);
};
