/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
          
    concat: {
      dist: {
        src: ['src/gfx/graph.js', 'src/util/utility.js', 'src/util/config.js', 'src/util/constants.js', 'src/util/register.js', 'src/util/effects.js', 'src/util/palette.js', 'src/util/test.js', 'src/gfx/area.js', 'src/gfx/bar.js',
              'src/gfx/donut.js', 'src/gfx/line.js', 'src/gfx/percent_area.js', 'src/gfx/percent_bar.js', 'src/gfx/pie.js', 'src/gfx/polar_area.js', 'src/gfx/stacked_area.js', 'src/gfx/stacked_bar.js', 'src/gfx/stepup_bar.js', 'src/gfx/waterfall.js', 
              'src/gfx/table.js', 'src/gfx/tablegraph.js'],
        dest: 'build/uv.js'
      },
      
      gfx : {
        src: ['src/gfx/graph.js', 'src/util/utility.js', 'src/util/config.js', 'src/util/constants.js', 'src/util/register.js', 'src/util/effects.js', 'src/util/palette.js', 'src/util/test.js', 'src/gfx/area.js', 'src/gfx/bar.js', 'src/gfx/donut.js', 'src/gfx/line.js', 'src/gfx/percent_area.js', 'src/gfx/percent_bar.js', 'src/gfx/pie.js', 'src/gfx/polar_area.js', 'src/gfx/stacked_area.js', 'src/gfx/stacked_bar.js', 'src/gfx/stepup_bar.js',  'src/gfx/waterfall.js', 'src/gfx/table.js', 'src/gfx/tablegraph.js'],
        dest: 'build/uvcharts.js'
      },

      style : {
        src : ['src/css/uv.css'],
        dest : 'build/uv.css'
      }
    },
   
    watch: {
      scripts: {
        files: ['src/gfx/*.js','src/util/*.js','src/css/*.css'],
        tasks: ['concat'],
        options: {
          interrupt: true,
        }
      }
    },

    uglify : {
      options : {
        mangle : true
      },

      gfx : {
        files : {
          'build/uvcharts.min.js' : ['<%= concat.gfx.dest %>']
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        camelcase : true,
        //indent: 2,
        latedef : true,
        newcap : true,
        undef : true,
        //trailing : true,
        //unused : true,
        globals: {
          jQuery: true,
          d3: true,
          console: true,
          $ : true,
          saveAs: true
        },
      },
      uses_defaults: ['lib/*.js'],
      
      gfx: {
        files: {
          src: ['<%= concat.gfx.dest %>']
        }
      }
    },

    copy : {
      release : {
        files : [  
          { expand: 'true', cwd: 'build/', src : ['**'], dest : 'dist/' }
        ]
      }
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['build_gfx']);
  grunt.registerTask('build_gfx', ['concat:gfx', 'uglify:gfx', 'jshint:gfx']);
  grunt.registerTask('release', ['build_gfx','copy:release']);
};
