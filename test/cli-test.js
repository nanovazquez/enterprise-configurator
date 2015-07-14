require('../lib/config')({headless: true}); // turn off output in tests.

var Code = require('code'),
  path = require('path'),
  Cli = require('../lib').Cli,
  _ = require('lodash');

describe('cli', function() {
  describe('generateArgs', function() {
    it('should generate options from config class', function(done) {
      var cli = Cli();

      var argv = cli.yargs.options(cli.generateArgs()).argv;

      var help = cli.yargs.help();

      // generations option.
      Code.expect(help).to.match(/-h/);
      // generates alias.
      Code.expect(help).to.match(/-host/);
      // generates description.
      Code.expect(help).to.match(/couch instance to write package meta/)
      // generates defaults.
      Code.expect(help).to.match(/default: .*5000.*/);

      done();
    });

    it('should generate list of possible usage commands', function(done) {
      var cli = Cli();

      cli.generateArgs();

      var help = cli.yargs.help();

      Code.expect(help).to.match(/start/);

      done();
    });
  });

  describe('help', function() {
    it('should print help if no arguments are given', function(done) {
      var cli = Cli({
        yargs: require('yargs')([]),
        logger: {
          log: function(str) {
            Code.expect(str).to.match(/Usage:/);
            done();
          }
        }
      });

      cli.run();
    });

    it('should print help if --help is given', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['generate', '--help']),
        logger: {
          log: function(str) {
            Code.expect(str).to.match(/Usage:/);
            done();
          }
        }
      });

      cli.run();
    });

    it('should print help if command is not found', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['foobar']),
        logger: {
          error: function(str) {},
          log: function(str) {
            Code.expect(str).to.match(/Usage:/);
            done();
          }
        }
      });

      cli.run();
    });

  });

  describe('execute', function() {
    it('should execute non-hyphenated option as command', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['start']),
        start: function(extra) {
          Code.expect(extra).to.be.undefined;
          done();
        }
      });

      cli.run();
    });

    it('should pass additional non-hyphenated commands as args', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['start', 'foobar']),
        start: function(extra) {
          Code.expect(extra).to.equal('foobar');
          done();
        }
      });

      cli.run();
    });
  });

  describe('updateConfigWithArgs', function() {
    it('should parse type of arguments if type is provided', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['start', '--auth-fetch', 'false']),
        start: function(extra) {
          var config = (require('../lib').Config)();
          Code.expect(config.authFetch).to.equal(false);
          done();
        }
      });

      cli.run();
    });

    it('should allow a true boolean variable to be overridden with a false value', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['start', '--check-sha', 'false']),
        start: function(extra) {
          var config = (require('../lib').Config)();
          Code.expect(config.checkSha).to.equal(false);
          done();
        }
      });

      cli.run();
    });

    it('accepts array options starting with [', function(done) {

      var cli = Cli({
        yargs: require('yargs')(['start', '--validateHost', '["one", "two", "three", "four", "five"]']),
        start: function(extra) {
          var config = (require('../lib').Config)();
          Code.expect(config.validateHost).to.deep.equal(['one', 'two', 'three', 'four', 'five']);
          done();
        }
      });

      cli.run();
    });

    it('accepts object options starting with {', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['start', '--validateHost', '{ "host": "localhost", "port": 6000 }']),
        start: function(extra) {
          var config = (require('../lib').Config)();
          Code.expect(config.validateHost).to.deep.equal({ host: 'localhost', port: 6000});
          done();
        }
      });

      cli.run();
    });

    it('passes non-JSON strings through untouched', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['start', '--validateHost', '{ whatevs }']),
        start: function(extra) {
          var config = (require('../lib').Config)();
          Code.expect(config.validateHost).to.deep.equal('{ whatevs }');
          done();
        }
      });

      cli.run();
    });

  });
});
