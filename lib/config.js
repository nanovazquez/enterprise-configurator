var _ = require('lodash'),
  config = null;

function Config(opts) {
  _.extend(this, {
    host: '127.0.0.1',
    port: '5000',
    binaryDirectory: __dirname + '/../packages',
    couchUrl: 'http://admin:admin@localhost:5984',
    frontDoorHost: 'http://npm-on-prem.internal.npmjs.com:8080',
    binariesHost: 'http://127.0.01:8000',
    authHost: 'http://127.0.0.1:5000',
    registryDBName: 'registry',
    checkSha: true
  }, opts);
};

// return a set of descriptions for the various
// command-line options. Any commands with descriptions
// will automatically become available to the CLI.
Config.prototype.descriptions = function() {
  return {
    host: 'host to bind to',
    port: 'port to bind to',
    binaryDirectory: 'where should package tarballs be stored on disk?',
    couchUrl: 'couch instance to write package meta information to',
    frontDoorHost: 'front-facing url of npm enterprise',
    registryDBName: 'package meta-information DB',
    checkSha: 'should shasum be checked when storing packges'
  }
};

// singleton pattern for grabbing config model.
module.exports = function(opts) {
  if (!opts && config) return config;
  else {
    config = new Config(opts);
    return config;
  }
};
