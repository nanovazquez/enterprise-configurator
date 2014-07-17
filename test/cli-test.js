require('../lib/config')({headless: true}); // turn off output in tests.

var Lab = require('lab'),
  path = require('path'),
  Cli = require('../lib').Cli,
  _ = require('lodash');

Lab.experiment('cli', function() {
  Lab.experiment('generateArgs', function() {
    Lab.it('should generate options from config class', function(done) {
      var cli = Cli();

      cli.generateArgs();

      var help = cli.yargs.help();

      // generations option.
      Lab.expect(help).to.match(/-h/);
      // generates alias.
      Lab.expect(help).to.match(/-host/);
      // generates description.
      Lab.expect(help).to.match(/package meta-information DB/)
      // generates defaults.
      Lab.expect(help).to.match(/default: .*5000.*/);

      done();
    });

    Lab.it('should generate list of possible usage commands', function(done) {
      var cli = Cli();

      cli.generateArgs();

      var help = cli.yargs.help();

      Lab.expect(help).to.match(/start/);

      done();
    });
  });

  Lab.experiment('help', function() {
    Lab.it('should print help if no arguments are given', function(done) {
      var cli = Cli({
        yargs: require('yargs')([]),
        logger: {
          log: function(str) {
            Lab.expect(str).to.match(/Usage:/);
            done();
          }
        }
      });

      cli.run();
    });

    Lab.it('should print help if --help is given', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['generate', '--help']),
        logger: {
          log: function(str) {
            Lab.expect(str).to.match(/Usage:/);
            done();
          }
        }
      });

      cli.run();
    });

    Lab.it('should print help if command is not found', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['foobar']),
        logger: {
          error: function(str) {},
          log: function(str) {
            Lab.expect(str).to.match(/Usage:/);
            done();
          }
        }
      });

      cli.run();
    });

  });

  Lab.experiment('execute', function() {
    Lab.it('should execute non-hyphenated option as command', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['start']),
        start: function(extra) {
          Lab.expect(extra).to.be.undefined;
          done();
        }
      });

      cli.run();
    });

    Lab.it('should pass additional non-hyphenated commands as args', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['start', 'foobar']),
        start: function(extra) {
          Lab.expect(extra).to.eql('foobar');
          done();
        }
      });

      cli.run();
    });
  });

  Lab.experiment('updateConfigWithArgs', function() {
    Lab.it('should parse type of arguments if type is provided', function(done) {
      var cli = Cli({
        yargs: require('yargs')(['start', '--auth-fetch', 'false']),
        start: function(extra) {
          var config = (require('../lib').Config)();
          Lab.expect(config.authFetch).to.eql(false);
          done();
        }
      });

      cli.run();
    });
  });
});
