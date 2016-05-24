/* globals beforeEach, it, describe */
'use strict';

var path = require('path'),
    zxpSignCmd = require(path.join(__dirname, '..', 'index.js')),
    expect = require('chai').expect,
    testPassword = 'testPs',
    testCertName = 'testCert',
    testCertLoc = path.join(__dirname, '..', 'bin', testCertName + '.p12'),
    testZxpName = 'test',
    testZxpLoc = path.join(__dirname, '..', 'bin', testZxpName + '.zxp');

describe('zxpSignCmd.verify', function () {
    var verifyOptions;

    beforeEach(function () {
        verifyOptions = {
            input: testZxpLoc
        };
    });

    it('Should throw an error because no input is provided', function (done) {
        verifyOptions.input = null;
        zxpSignCmd.verify(verifyOptions, function (error, result) {

            expect(error).to.be.an('error');
            expect(result).to.be.a('undefined');
            done();
        });
    });
});
