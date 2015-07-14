require('../lib/config')({headless: true}); // turn off output in tests.

var
    Code   = require('code'),
    path   = require('path'),
    logger = require('../lib/logger');

describe('logger', function()
{
    it('exports six log functions', function(done)
    {
        Code.expect(logger.log).to.not.equal(undefined)
        Code.expect(logger.info).to.not.equal(undefined)
        Code.expect(logger.warn).to.not.equal(undefined)
        Code.expect(logger.error).to.not.equal(undefined)
        Code.expect(logger.success).to.not.equal(undefined)
        Code.expect(logger.trace).to.not.equal(undefined)

        Code.expect(typeof logger.log).to.equal('function');
        Code.expect(typeof logger.info).to.equal('function');
        Code.expect(typeof logger.warn).to.equal('function');
        Code.expect(typeof logger.error).to.equal('function');
        Code.expect(typeof logger.success).to.equal('function');
        Code.expect(typeof logger.trace).to.equal('function');

        done();
    });

    it('logs in a colorful way', function(done)
    {
        logger.log('this is a plain console log');
        logger.info('this is a plain message with a gray timestamp');
        logger.warn('this is a yellow warning with a label');
        logger.error('this is a red error with a label');
        logger.success('this is a green success report with a label');

        done();
    });

    it('converts objects to string representations', function(done)
    {
        logger.info({ json: true });
        done();
    });
});
