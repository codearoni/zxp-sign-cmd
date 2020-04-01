/* globals beforeEach, it, describe */
'use strict';

const path = require('path');
const zxpSignCmd = require(path.join(__dirname, '..', 'index.js'));
const expect = require('chai').expect;
const testPassword = 'testPs';
const testCertName = 'testCert';
const testCertLoc = path.join(__dirname, '..', 'bin', testCertName + '.p12');
const testZxpName = 'test';
const testZxpLoc = path.join(__dirname, '..', 'bin', testZxpName + '.zxp');

describe('zxpSignCmd.sign', function () {
    let options = {};

    beforeEach(function () {
        options  = {
            input: path.join(__dirname, 'ext'),
            output: testZxpLoc,
            cert: testCertLoc,
            password: testPassword
        };
    });

    it('Should throw an error because input is not provided', (done) => {
        options.input = null;
        zxpSignCmd.sign(options).catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('input property is required');
            done();
        });
    });

    it('Should throw an error because output is not provided', async () => {
        options.output = null;
        let result;
        try {
            result = await zxpSignCmd.sign(options);
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('output property is required');
            expect(result).to.be.a('undefined');
        }
    });

    it('Should throw an error because cert is not provided', async () => {
        options.cert = null;
        let result;
        try {
            result = await zxpSignCmd.sign(options);
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('cert property is required');
            expect(result).to.be.a('undefined');
        }
    });

    it('Should throw an error because password is not provided', async () => {
        options.password = null;
        let result;
        try {
            result = await zxpSignCmd.sign(options);
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('password property is required');
            expect(result).to.be.a('undefined');
        }
    });
});
