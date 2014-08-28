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

function dateLabel() {
  return chalk.gray( (new Date()).toISOString() ) + ' ';
}

function regularizeMessage(message) {
  if (typeof message === 'object') message = JSON.stringify(message, null, '  ');
  return message;
}

exports.warn = function(message) {
  this.log(dateLabel() + warningLabel + chalk.yellow(regularizeMessage(message)));
};

exports.error = function(message) {
  this.log(dateLabel() + errorLabel + chalk.red(regularizeMessage(message)));
};

exports.success = function(message) {
  this.log( dateLabel() + successLabel + chalk.green(regularizeMessage(message)));
};

exports.info = function(message) {
  this.log( dateLabel() + regularizeMessage(message));
}
