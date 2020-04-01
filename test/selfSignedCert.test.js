/* globals beforeEach, it, describe */
'use strict';

const path = require('path');
const zxpSignCmd = require(path.join(__dirname, '..', 'index.js'));
const expect = require('chai').expect;
const testPassword = 'testPs';
const testCertName = 'testCert';
const testCertLoc = path.join(__dirname, '..', 'bin', testCertName + '.p12');

describe('zxpSignCmd.selfSignedCert', function () {
    let certOptions = {};

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

    it('Should throw an error because country is not provided', async () => {
        certOptions.country = null;
        try {
            await zxpSignCmd.selfSignedCert(certOptions);
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('country property is required');
        }
    });

    it('Should throw an error because province is not provided', async () => {
        certOptions.province = null;
        try {
            await zxpSignCmd.selfSignedCert(certOptions);
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('province property is required');
        }
    });

    it('Should throw an error because org is not provided', async () => {
        certOptions.org = null;
        try {
            await zxpSignCmd.selfSignedCert(certOptions);
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('org property is required');
        }
    });

    it('Should throw an error because name is not provided', async () => {
        certOptions.name = null;
        try {
            await zxpSignCmd.selfSignedCert(certOptions);
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('name property is required');
        }
    });

    it('Should throw an error because password is not provided', async () => {
        certOptions.password = null;
        try {
            await zxpSignCmd.selfSignedCert(certOptions);
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('password property is required');
        }
    });

    it('Should throw an error because output is not provided', async () => {
        certOptions.output = null;
        try {
            await zxpSignCmd.selfSignedCert(certOptions);
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('output property is required');
        }
    });
});
