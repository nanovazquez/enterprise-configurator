var _ = require('lodash'),
  cli = null,
  S = require('string'),
  Config = require('./config'),
  config = Config();

// handle a user interacting with the
// command-line, update config appropriately,
// output human readable messages.
//
// you should add methods to Cli with names that
// correspond to the command you wish to execute, .e.g.,
// add the 'start' method, if you wish to execute a
// start command.
function Cli(opts) {
  _.extend(this, {
    logger: require('./logger'),
    yargs: require('yargs'), // overridable parsed arguments.
    takenFlags: [],
    commands: {
      'start': "start the web-service",
    }
  }, opts);
};

// actually run the cli, the cli is also
// included and used for logging.
Cli.prototype.run = function() {
  var _this = this;

  this.generateArgs();

  if (this.yargs.argv._.length === 0 || this.yargs.argv.help) {
    this.logger.log(this.yargs.help());
  } else if (!this.commands[this.yargs.argv._[0]]){
    this.logger.error('command ' + this.yargs.argv._[0] + ' not found')
    this.logger.log(this.yargs.help());
  } else {
    this.updateConfigWithArgs(); // update config singleton.

    try { // execute the command, passing along args.
      this[this.yargs.argv._[0]].apply(this, this.yargs.argv._.slice(1));
    } catch (e) {
      this.logger.error(e.message);
    }
  }
};

// updates the configuration singleton
// with any CLI args passed in.
Cli.prototype.updateConfigWithArgs = function() {
  var yargs = this.yargs;

  _.keys(config).forEach(function(key) {
    if (yargs.argv[key]) {
      config[key] = yargs.argv[key];
    }
  });

  // write the changes.
  Config(config);
};

// generate kwargs CLI parser from config.
Cli.prototype.generateArgs = function() {
  var _this = this,
    descriptions = config.descriptions();

  // populate config flags.
  _.forIn(config, function(value, key) {
    if (descriptions[key]) {
      var option = {
        alias: S(key).dasherize().s,
        default: config[key]
      };

      if (typeof descriptions[key] === 'object') {
        option.description = descriptions[key].description;
        option[descriptions[key].type] = true
      } else {
        option.description = descriptions[key];
      }

      _this.yargs.options(_this._getFlag(key.toLowerCase()), option);
    }
  });

  // now add the usage info.
  this.generateUsage();
};

// iterate over the key, and find a flag
// that hasn't yet been used.
Cli.prototype._getFlag = function(candidates) {
  for (var i = 0; i < candidates.length; i++) {
    var char = candidates.charAt(i);
    if (this.takenFlags.indexOf(char) === -1) {
      this.takenFlags.push(char);
      return char;
    }
  }
};

// generate usae message based on this.commands.
Cli.prototype.generateUsage = function() {
  var usage = 'Usage:\n';

  _.forIn(this.commands, function(value, key) {
    usage += "\n" + value;
  });

  this.yargs.usage(usage);
};

// export CLI as a singleton, to that
// it can easily be imported for logging.
module.exports = function(opts) {
  if (!opts && cli) return cli;
  else {
    cli = new Cli(opts);
    return cli;
  }
};
