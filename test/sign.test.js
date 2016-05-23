'use strict';

var path = require('path'),
    zxpSignCmd = require(path.join(__dirname, '..', 'index.js')),
    expect = require('chai').expect;

describe('zxpSignCmd.sign', function () {
    var options = {};

    beforeEach(function () {
        options.input = path.join(__dirname, '..', 'bin', 'test.zxp');
        options.output = path.join(__dirname, 'bin');
        options.cert = path.join(__dirname, '..', 'bin', 'test.p12');
        options.password = 'testps';
    });

    it('Should throw an error because input is not provided', function (done) {
        options.input = null;
        zxpSignCmd.sign(options, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('input property is required');
            done();
        });
    });

    it('Should throw an error because output is not provided', function (done) {
        options.output = null;
        zxpSignCmd.sign(options, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('output property is required');
            done();
        });
    });

    it('Should throw an error because cert is not provided', function (done) {
        options.cert = null;
        zxpSignCmd.sign(options, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('cert property is required');
            done();
        });
    });

    it('Should throw an error because password is not provided', function (done) {
        options.password = null;
        zxpSignCmd.sign(options, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('password property is required');
            done();
        });
    });
});
