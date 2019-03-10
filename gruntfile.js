module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: [
                            '**',
                            '**/.bin/*.js',
                            '**/.bin/*.json',
                            '**/*.py',
                            '**/*.js',
                            '**/*.css',
                            '**/*.html',
                            '**/*.json',
                            '!**/*.ts',
                        ],
                        dest: 'dest/',
                        filter: 'isFile'
                    },
                ],
                verbose: true, // Default: false
                pretend: false, // Don't do any disk operations - just write log. Default: false
                failOnError: true, // Fail the task when copying is not possible. Default: false
            },
        }
    });
};
