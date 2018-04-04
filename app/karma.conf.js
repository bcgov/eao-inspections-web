// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      captureConsole: true
    },
    coverageReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: 'coverage/',
      fixWebpackSourcePaths: true
    },
    preprocessors: {
      '*.js': ['coverage'],
      '*.ts': ['coverage']
    },
    angularCli: {
      environment: 'dev'
    },
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    captureTimeout: 210000,
    browserDisconnectTolerance: 4,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
  });
};
