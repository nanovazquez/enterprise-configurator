require('../lib/config')({headless: true}); // turn off output in tests.

var
    Lab    = require('lab'),
    path   = require('path'),
    logger = require('../lib/logger');

Lab.describe('logger', function()
{
    Lab.it('exports six log functions', function(done)
    {
        Lab.expect(logger).to.have.property('log');
        Lab.expect(logger).to.have.property('info');
        Lab.expect(logger).to.have.property('warn');
        Lab.expect(logger).to.have.property('error');
        Lab.expect(logger).to.have.property('success');
        Lab.expect(logger).to.have.property('trace');

        Lab.expect(logger.log).to.be.a('function');
        Lab.expect(logger.info).to.be.a('function');
        Lab.expect(logger.warn).to.be.a('function');
        Lab.expect(logger.error).to.be.a('function');
        Lab.expect(logger.success).to.be.a('function');
        Lab.expect(logger.trace).to.be.a('function');

        done();
    });

    Lab.it('logs in a colorful way', function(done)
    {
        logger.log('this is a plain console log');
        logger.info('this is a plain message with a gray timestamp');
        logger.warn('this is a yellow warning with a label');
        logger.error('this is a red error with a label');
        logger.success('this is a green success report with a label');

        done();
    });

    Lab.it('converts objects to string representations', function(done)
    {
        logger.info({ json: true });
        done();
    });
});
