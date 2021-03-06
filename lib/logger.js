var
    bole   = require('bole'),
    config = require('./config')();

var logger = bole('npme');

var level = 'info';
var stream = process.stdout;
if (process.env.NODE_ENV && (process.env.NODE_ENV.match(/^dev/) || process.env.NODE_ENV.match(/^test/)))
{
    level = 'debug';
    stream = require('bistre')({time: true}); // pretty
    stream.pipe(process.stdout);
}

if (config.headless) {
    logger = {
      log: function() {},
      warn: function() {},
      error: function() {},
      success: function() {},
      info: function() {},
      trace: function() {}
    }
}

else if (config.jsonLogging)
{
    bole.output({ level: level, stream: stream });
}

else if (!config.jsonLogging)
{
    logger = console;
}

// can add more file stream sinks here.

exports.log = function() { logger.info.apply(null, arguments); }
exports.warn = function() { logger.warn.apply(null, arguments); };
exports.error = function() { logger.error.apply(null, arguments); };
exports.success = function() { logger.info.apply(null, arguments); };
exports.info = function() { logger.info.apply(null, arguments); };
exports.trace = function() { logger.debug.apply(null, arguments); };
