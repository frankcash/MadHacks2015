module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["less"],
                    yuicompress: true
                },
                files: {
                    "./public/css/style.css": "./less/bootstrap.less"
                }
            }
        },
        watch: {
            files: "./less/**/*.less",
            tasks: ["less"]
        }
    });
    grunt.registerTask('default', ["less", "watch"]);
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};