var _ = require('lodash'),
   os  = require('os'),
   config = null;

function Config(opts) {
  if (opts && opts.registryDBName) {
    opts.couchUrl += (opts.couchUrl.slice(-1) === '/' ? '' : '/') +
      opts.registryDBName;
    opts.couchUrlRemote += (opts.couchUrlRemote.slice(-1) === '/' ? '' : '/') +
      opts.registryDBName;
  }

  _.extend(this, {
    host: '127.0.0.1',
    port: '5000',
    binaryDirectory: __dirname + '/../packages',
    couchUrl: 'http://admin:admin@localhost:5984/registry',
    frontDoorHost: 'http://npm-on-prem.internal.npmjs.com:8080',
    binariesHost: 'http://127.0.0.1:8000',
    authHost: 'http://127.0.0.1:5000',
    authFetch: false,
    // used by npm-auth-ws to fetch JSON from registry-frontdoor.
    sharedFetchSecret: 'change-me-to-a-secure-token',
    checkSha: true,
    couchUrlRemote: 'https://skimdb.npmjs.com/registry',
    couchUrlCache: 'https://skimdb.npmjs.com/registry',
    whiteListPath: __dirname + '/../.whitelist',
    githubHost: 'https://github.example.com',
    authenticationMethod: 'github',
    authorizationMethod: 'github',
    sessionHandler: 'github',
    validateHost: 'http://127.0.0.1:5001',
    verification: 'https://license.npmjs.com/',
    license: '../../.license.json',
    isNpmeRegistry: false,
    policy: 'white-list',
    readThroughCache: false,
    metrics: '',
    nodename: os.hostname(),
  }, opts);
}

// return a set of descriptions for the various
// command-line options. Any commands with descriptions
// will automatically become available to the CLI.
Config.prototype.descriptions = function() {
  return {
    host: 'host to bind to',
    port: 'port to bind to',
    binaryDirectory: 'where should package tarballs be stored on disk?',
    binariesHost: 'full url of host that serves package binaries',
    authHost: 'full url of the host that performs authorization and authentication',
    authFetch: {
      description: 'should we authenticate package fetches?',
      type: 'boolean'
    },
    couchUrl: 'couch instance to write package meta information to, with the database name',
    couchUrlRemote: 'url of remote CouchDB for following, with the database name',
    frontDoorHost: 'front-facing url of npm enterprise',
    checkSha: {
      description: 'should shasum be checked when storing packges',
      type: 'boolean'
    },
    whiteListPath: 'path to whitelist to use when indexing packages',
    githubHost: 'full url of internal GitHub Enterprise appliance',
    sessionHandler: "key value store for user sessions",
    authenticationMethod: 'approach used when authenticating a user',
    authorizationMethod: 'approach used to validate a package publication',
    validateHost: 'full url of host to use when validating package publications',
    license: 'location of the license file',
    verification: 'license verification host',
    isNpmeRegistry: 'is this registry an npmE installer registry?',
    policy: 'policy to apply when following packages from public registry',
    readThroughCache: {
      description: 'should the registry act as a read-through cache?',
      type: 'boolean'
    },
    couchUrlCache: 'url of the cache upstream (defaults to --couch-url-remote)',
    metrics: { description: 'uri of metrics collector to send metrics to', type: 'string' },
    nodename: { description: 'name of this node; for metrics', type: 'string' },
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
