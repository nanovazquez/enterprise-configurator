var clc = require('cli-color'),
  config = require('./config')();

exports.log = function(message) {
  if (!config.headless) {
    console.log(message);
  }
};

exports.warn = function(message) {
  this.log(clc.yellow(JSON.stringify(message, null)));
};

exports.error = function(message) {
  this.log(clc.red(JSON.stringify(message)));
};

exports.success = function(message) {
  this.log(clc.green(JSON.stringify(message)));
};
