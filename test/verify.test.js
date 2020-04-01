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

describe('zxpSignCmd.verify', function () {
    let verifyOptions;

    beforeEach(function () {
        verifyOptions = {
            input: testZxpLoc
        };
    });

    it('Should throw an error because no input is provided', async () => {
        verifyOptions.input = null;
        try {
            await zxpSignCmd.verify(verifyOptions);
            expect(error).to.be.an('error');
        } catch (error) {
            expect(error).to.be.an('error');
        }
    });
});
