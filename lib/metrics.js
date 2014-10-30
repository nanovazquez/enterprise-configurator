var
    _       = require('lodash'),
    config  = require('./config')(),
    Emitter = require('numbat-emitter'),
    logger  = require('./logger'),
    os      = require('os')
    ;

function StubMetricsEmitter(){}
StubMetricsEmitter.prototype.metric = function() {};

var emitter;

var createClient = module.exports = function createClient()
{
    if (emitter) return emitter;

    if (!config.metrics || !_.isString(config.metrics))
        emitter =  new StubMetricsEmitter();
    else
    {
        var metricsopts =
        {
            uri:  config.metrics,
            node: config.node || os.hostname(),
        };
        emitter = new Emitter(metricsopts);
        logger.info('metrics client configured for ' + config.metrics);
    }

    return emitter;
};
