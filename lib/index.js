exports.Config = function(opts) {
  return require('./config')(opts);
};

exports.Cli = function(opts) {
  return require('./cli')(opts);
};

exports.logger = function() {
  return require('./logger');
};
