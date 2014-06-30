exports.Config = function(opts) {
  return require('./config')(opts);
};

exports.Cli = function(opts) {
  return require('./cli')(opts);
};

exports.logger = function(opts) {
  return require('./logger')(opts);
};
