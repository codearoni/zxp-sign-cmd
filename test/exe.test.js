/* globals beforeEach, it, describe */
'use strict';
/**
* The ZXPSignCmd executable does not function in travis-ci.
* As a result, the tests that run against the executable are removed from ci-tests
*/
var path = require('path'),
    zxpSignCmd = require(path.join(__dirname, '..', 'index.js')),
    expect = require('chai').expect,
    testPassword = 'testPs',
    testCertName = 'testCert',
    testCertLoc = path.join(__dirname, '..', 'bin', testCertName + '.p12'),
    testZxpName = 'test',
    testZxpLoc = path.join(__dirname, '..', 'bin', testZxpName + '.zxp');

describe('zxpSignCmd exe tests', function () {
    var options,
        certOptions,
        verifyOptions;

    beforeEach(function () {
        options  = {
            input: path.join(__dirname, 'ext'),
            output: testZxpLoc,
            cert: testCertLoc,
            password: testPassword
        };
        certOptions = {
            country: 'us',
            province: 'na',
            org: 'corp',
            name: testCertName,
            password: testPassword,
            output: testCertLoc
        };
        verifyOptions = {
            input: testZxpLoc
        };
    });

    it('Should generate a self-signed cert', function (done) {
        certOptions.country = 'us';
        zxpSignCmd.selfSignedCert(certOptions, function (error, result) {

            expect(error).to.be.a('null');
            expect(result).to.equal('Self-signed certificate generated successfully\r\n');
            done();
        });
    });

    it('Should generate a zxp package using the example extension', function (done) {

        zxpSignCmd.sign(options, function (error, result) {
            expect(error).to.be.a('null');
            expect(result).to.equal('Signed successfully\r\n');
            done();
        });
    });

    it('Should verify the packaged zxp', function (done) {

        zxpSignCmd.verify(verifyOptions, function (error, result) {

            expect(error).to.be.a('null');
            done();
        });
    });

    it('Should add info to the verification', function (done) {
        verifyOptions.info = true;

        zxpSignCmd.verify(verifyOptions, function (error, result) {

            expect(error).to.be.a('null');
            done();
        });
    });
});
