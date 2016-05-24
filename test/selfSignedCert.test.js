/* globals beforeEach, it, describe */
'use strict';

var path = require('path'),
    zxpSignCmd = require(path.join(__dirname, '..', 'index.js')),
    expect = require('chai').expect,
    testPassword = 'testPs',
    testCertName = 'testCert',
    testCertLoc = path.join(__dirname, '..', 'bin', testCertName + '.p12');

describe('zxpSignCmd.selfSignedCert', function () {
    var certOptions = {};

    beforeEach(function() {
        certOptions = {
            country: 'us',
            province: 'na',
            org: 'corp',
            name: testCertName,
            password: testPassword,
            output: testCertLoc
        };
    });

    it('Should throw an error because country is not provided', function (done) {
        certOptions.country = null;
        zxpSignCmd.selfSignedCert(certOptions, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('country property is required');
            expect(result).to.be.a('undefined');
            done();
        });
    });

    it('Should throw an error because province is not provided', function (done) {
        certOptions.province = null;
        zxpSignCmd.selfSignedCert(certOptions, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('province property is required');
            expect(result).to.be.a('undefined');
            done();
        });
    });

    it('Should throw an error because org is not provided', function (done) {
        certOptions.org = null;
        zxpSignCmd.selfSignedCert(certOptions, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('org property is required');
            expect(result).to.be.a('undefined');
            done();
        });
    });

    it('Should throw an error because name is not provided', function (done) {
        certOptions.name = null;
        zxpSignCmd.selfSignedCert(certOptions, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('name property is required');
            expect(result).to.be.a('undefined');
            done();
        });
    });

    it('Should throw an error because password is not provided', function (done) {
        certOptions.password = null;
        zxpSignCmd.selfSignedCert(certOptions, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('password property is required');
            expect(result).to.be.a('undefined');
            done();
        });
    });

    it('Should throw an error because output is not provided', function (done) {
        certOptions.output = null;
        zxpSignCmd.selfSignedCert(certOptions, function (error, result) {

            expect(error).to.be.an('error');
            expect(error.message).to.equal('output property is required');
            expect(result).to.be.a('undefined');
            done();
        });
    });
});
