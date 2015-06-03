module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg      : grunt.file.readJSON('package.json'),
		banner   : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> @ <%= pkg.company.name%>' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.

		copy     : {
			main: {
				files: [
					{expand: true, flatten: true, src: ['src/js-sliderWithProgressbar.js'], dest: 'dist/'}
				]
			}
		},

		uglify   : {
			options: {
				banner: '<%= banner %>'
			},
			dist   : {
				src : 'dist/js-sliderWithProgressbar.js',
				dest: 'dist/js-sliderWithProgressbar.min.js'
			}
		},

		less : {
			default: {
				options: {
					compress    : false,
					yuicompress : false,
					cleancss    : false,
					optimization: null
				},
				files: {
					"test/dist/css/main.css" : "test/less/main.less"
				}
			}
		},

		concat : {
			dist: {
				src : ["bower_components/requirejs/require.js", "test/dist/js/main.js" ],
				dest: "test/dist/js/main.js"
			}
		},

		bowerRequirejs: {
			target: {
				options: {
					transitive: true
				},
				rjsConfig: "test/js/config.js"
			}
		},

		requirejs: {
			compile: {
				options: {
					name                  : "config",
					mainConfigFile        : "test/js/config.js",
					out                   : "test/dist/js/main.js",
					optimize              : "none",
					findNestedDependencies: true
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-bower-requirejs');
	grunt.loadNpmTasks('grunt-contrib-concat');


	// do test js build
	grunt.registerTask('jsBuild', ['bowerRequirejs', 'requirejs', 'concat']);

	// Default task.
	grunt.registerTask('default', ['copy', 'uglify', 'less', 'jsBuild']);

};