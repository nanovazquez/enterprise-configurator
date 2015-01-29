require('../lib/config')({headless: true}); // turn off output in tests.

var Lab = require('lab'),
  path = require('path'),
  Config = require('../lib').Config,
  _ = require('lodash');

Lab.experiment('config', function() {
  Lab.it('should be initialized with sane defaults', function(done) {
    var config = Config();
    Lab.expect(config.host).to.eql('127.0.0.1');
    done();
  });

  Lab.it('should allow defaults to be overridden by opts', function(done) {
    var config = Config({
      host: '0.0.0.0'
    });
    Lab.expect(config.host).to.eql('0.0.0.0');
    done();
  });

  Lab.it('should behave as a singleton once initialized', function(done) {
    Config({
      host: '8.8.8.8'
    });

    var config = (require('../lib').Config)();

    Lab.expect(config.host).to.eql('8.8.8.8');
    done();
  });

  Lab.it('it should remain compatible with `registryDBName` config', function(done) {
    var config = Config({
      registryDBName: 'registry',
      couchUrl: 'http://localhost:5984',
      couchUrlRemote: 'https://skimdb.npmjs.com/'
    });
    Lab.expect(config.couchUrl).to.eql('http://localhost:5984/registry');
    Lab.expect(config.couchUrlRemote).to.eql('https://skimdb.npmjs.com/registry');
    done();
  });

  Lab.it('it should default `couchUrlCache` to `couchUrlRemote` if operating as read-through cache', function(done) {
    var config = Config({
      couchUrlRemote: 'https://skimdb.npmjs.com/',
      readThroughCache: true
    });
    Lab.expect(config.couchUrlCache).to.eql('https://skimdb.npmjs.com/registry');
    done();
  });

  Lab.it('it should use `couchUrlCache` when explicitely given', function(done) {
    var config = Config({
      couchUrlCache: 'https://skimdb.npmjs.com/',
      couchUrlRemote: 'https://im.trapped.in.a.url.com/',
      readThroughCache: true
    });

    Lab.expect(config.couchUrlCache).to.eql('https://skimdb.npmjs.com/');
    done();
  });
});
