var chalk = require('chalk'),
  config = require('./config')();

exports.log = function(message) {
  if (!config.headless) {
    console.log(message);
  }
};

var errorLabel = chalk.bold.black.bgRed('Error:') + ' ';
var successLabel = chalk.bold.white.bgGreen('Success:') + ' ';
var warningLabel = chalk.bold.black.bgYellow('Warning:') + ' ';

exports.warn = function(message) {
  if (typeof message === 'object') message = JSON.stringify(message, null, '  ');

  this.log(warningLabel + chalk.yellow(message));
};

exports.error = function(message) {
  if (typeof message === 'object') message = JSON.stringify(message, null, '  ');

  this.log(errorLabel + chalk.red(message));
};

exports.success = function(message) {
  if (typeof message === 'object') message = JSON.stringify(message, null, '  ');

  this.log(successLabel + chalk.green(message));
};

exports.info = function(message) {
  if (typeof message === 'object') message = JSON.stringify(message, null, '  ');
  this.log( chalk.gray( (new Date()).toISOString() ) + ' ' + message);
}
