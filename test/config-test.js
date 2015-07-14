require('../lib/config')({headless: true}); // turn off output in tests.

var Code = require('code'),
  path = require('path'),
  Config = require('../lib').Config,
  _ = require('lodash');

describe('config', function() {
  it('should be initialized with sane defaults', function(done) {
    var config = Config();
    Code.expect(config.host).to.equal('127.0.0.1');
    done();
  });

  it('should allow defaults to be overridden by opts', function(done) {
    var config = Config({
      host: '0.0.0.0'
    });
    Code.expect(config.host).to.equal('0.0.0.0');
    done();
  });

  it('should behave as a singleton once initialized', function(done) {
    Config({
      host: '8.8.8.8'
    });

    var config = (require('../lib').Config)();

    Code.expect(config.host).to.equal('8.8.8.8');
    done();
  });

  it('it should remain compatible with `registryDBName` config', function(done) {
    var config = Config({
      registryDBName: 'registry',
      couchUrl: 'http://localhost:5984',
      couchUrlRemote: 'https://skimdb.npmjs.com/'
    });
    Code.expect(config.couchUrl).to.equal('http://localhost:5984/registry');
    Code.expect(config.couchUrlRemote).to.equal('https://skimdb.npmjs.com/registry');
    done();
  });

  it('it should default `couchUrlCache` to `couchUrlRemote` if operating as read-through cache', function(done) {
    var config = Config({
      couchUrlRemote: 'https://skimdb.npmjs.com/',
      readThroughCache: true
    });
    Code.expect(config.couchUrlCache).to.equal('https://skimdb.npmjs.com/registry');
    done();
  });

  it('it should use `couchUrlCache` when explicitely given', function(done) {
    var config = Config({
      couchUrlCache: 'https://skimdb.npmjs.com/',
      couchUrlRemote: 'https://im.trapped.in.a.url.com/',
      readThroughCache: true
    });

    Code.expect(config.couchUrlCache).to.equal('https://skimdb.npmjs.com/');
    done();
  });
});
