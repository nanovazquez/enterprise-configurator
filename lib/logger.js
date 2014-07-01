var clc = require('cli-color'),
  config = require('./config')();

exports.log = function(message) {
  if (!config.headless) {
    console.log(message);
  }
};

exports.warn = function(message) {
  if (typeof message === 'object') message = JSON.stringify(message);

  this.log(clc.yellow(message));
};

exports.error = function(message) {
  if (typeof message === 'object') message = JSON.stringify(message);

  this.log(clc.red(message));
};

exports.success = function(message) {
  if (typeof message === 'object') message = JSON.stringify(message);

  this.log(clc.green(message));
};
