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

describe('zxpSignCmd.sign', function () {
    var options = {};

    beforeEach(function () {
        options  = {
            input: path.join(__dirname, 'ext'),
            output: testZxpLoc,
            cert: testCertLoc,
            password: testPassword
        };
    });

    it('Should throw an error because input is not provided', function (done) {
        options.input = null;
        zxpSignCmd.sign(options, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('input property is required');
            expect(result).to.be.a('undefined');
            done();
        });
    });

    it('Should throw an error because output is not provided', function (done) {
        options.output = null;
        zxpSignCmd.sign(options, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('output property is required');
            expect(result).to.be.a('undefined');
            done();
        });
    });

    it('Should throw an error because cert is not provided', function (done) {
        options.cert = null;
        zxpSignCmd.sign(options, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('cert property is required');
            expect(result).to.be.a('undefined');
            done();
        });
    });

    it('Should throw an error because password is not provided', function (done) {
        options.password = null;
        zxpSignCmd.sign(options, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('password property is required');
            expect(result).to.be.a('undefined');
            done();
        });
    });
});
