/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! r3vis - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://github.com/hashd \n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        '; Licensed MIT */'
    },
    
    lint: {
      files: ['grunt.js', 'dist/r3.js', 'dist/r3_gfx.js']
    },
    
    qunit: {
      files: ['test/**/*.html']
    },
    
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'src/gfx/graph.js', 'src/util/utility.js', 'src/util/config.js', 'src/util/constants.js', 'src/util/effects.js', 'src/util/palette.js', 'src/gfx/area.js', 'src/gfx/bar.js',
              'src/gfx/donut.js', 'src/gfx/line.js', 'src/gfx/percent_area.js', 'src/gfx/percent_bar.js', 'src/gfx/pie.js', 'src/gfx/stacked_area.js', 'src/gfx/stacked_bar.js', 'src/gfx/stepup_bar.js', 
              'src/gfx/table.js', 'src/gfx/tablegraph.js'],
        dest: 'dist/r3.js'
      },
      
      gfx : {
        src: ['<banner:meta.banner>', 'src/gfx/graph.js', 'src/util/utility.js', 'src/util/config.js', 'src/util/constants.js', 'src/util/effects.js', 'src/util/palette.js', 'src/gfx/area.js', 'src/gfx/bar.js',
              'src/gfx/donut.js', 'src/gfx/line.js', 'src/gfx/percent_area.js', 'src/gfx/percent_bar.js', 'src/gfx/pie.js', 'src/gfx/stacked_area.js', 'src/gfx/stacked_bar.js', 'src/gfx/stepup_bar.js', 
              'src/gfx/table.js', 'src/gfx/tablegraph.js'],
        dest: 'dist/r3_gfx.js'
      }
    },
    
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/r3.min.js'
      },
      
      gfx : {
        src: ['<banner:meta.banner>', '<config:concat.gfx.dest>'],
        dest: 'dist/r3_gfx.min.js'
      }
    },
    
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');
  grunt.registerTask('build_gfx', 'concat:gfx min:gfx')
};
