/* globals beforeEach, it, describe */
'use strict';
/**
* The ZXPSignCmd executable does not function in travis-ci.
* As a result, the tests that run against the executable are removed from ci-tests
*/
const path = require('path');
const zxpSignCmd = require(path.join(__dirname, '..', 'index.js'));
const expect = require('chai').expect;
const testPassword = 'testPs';
const testCertName = 'testCert';
const testCertLoc = path.join(__dirname, '..', 'bin', testCertName + '.p12');
const testZxpName = 'test';
const testZxpLoc = path.join(__dirname, '..', 'bin', testZxpName + '.zxp');

describe('zxpSignCmd exe tests', function () {
    let options;
    let certOptions;
    let verifyOptions;

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

    it('Should generate a self-signed cert', async () => {
        certOptions.country = 'us';
        const result = await zxpSignCmd.selfSignedCert(certOptions);
        expect(result).to.match(/Self-signed certificate generated successfully/);
    });

    it('Should generate a zxp package using the example extension', async () => {
        const result = await zxpSignCmd.sign(options);
        expect(result).to.match(/Signed successfully/);;
    });

    it('Should verify the packaged zxp', async () => {
        await zxpSignCmd.verify(verifyOptions);
    });

    it('Should add info to the verification', async () => {
        verifyOptions.info = true;
        await zxpSignCmd.verify(verifyOptions);
    });
});
