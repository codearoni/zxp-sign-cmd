'use strict';

const util = require('util');
const path =  require('path');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const mkdir = util.promisify(fs.mkdir);
const zxpProvider = require('zxp-provider');
const zxp = zxpProvider();

const insertSpaces = function () {
    let builtString = '';
    const args = Array.prototype.slice.call(arguments);

    args.forEach(function(val) {
        builtString = builtString + val + ' ';
    });

    return builtString;
};

const quoteWrap = (str) => {
    return '"' + str + '"';
};

const validateOptions = (options, requirements) => {
    let err = null;
    requirements.forEach(function (req) {
        if(!options[req]) {
            err = new Error(req + ' property is required');
        }
    });
    return err;
};

const buildOutputPath = async (output) => {
    
    const dirPath = path.dirname(output);
    try {
        await mkdir(dirPath, { recursive: true });
    } catch (error) {
        if (error && error.code === 'EEXIST') {
            return null;
        } else {
            throw error;
        }
    }
};

module.exports = {
    sign: async (options) => {

        // validate params
        const inputError = validateOptions(options, ['input', 'output', 'cert', 'password']);

        if (inputError) {
            throw inputError;
        }

        const input = quoteWrap(options.input);
        const output = quoteWrap(options.output);
        const cert = quoteWrap(options.cert);
        let cmd = insertSpaces(zxp, '-sign', input, output, cert, quoteWrap(options.password));

        if (options.timestamp) {
            cmd = insertSpaces(cmd, '-tsa', options.timestamp);
        }

        // do not use the quote-wrapped parameter to build a directory
        await buildOutputPath(options.output);

        const result = await exec(cmd);
        return result.stdout || null;
    },
    selfSignedCert: async (options) => {

        const inputError = validateOptions(options, ['country', 'province', 'org', 'name', 'password', 'output']);

        if (inputError) {
            throw inputError;
        }

        let cmd = insertSpaces(zxp, '-selfSignedCert', quoteWrap(options.country), quoteWrap(options.province), quoteWrap(options.org), quoteWrap(options.name), quoteWrap(options.password), quoteWrap(options.output));

        if (options.locality) {
            cmd = insertSpaces(cmd, '-locality', options.locality);
        }
        if (options.orgUnit) {
            cmd = insertSpaces(cmd, '-orgUnit', options.orgUnit);
        }
        if (options.email) {
            cmd = insertSpaces(cmd, '-email', options.email);
        }
        if (options.validityDays) {
            cmd = insertSpaces(cmd, '-validityDays', options.validityDays);
        }

        // do not use the quote-wrapped parameter to build a directory
        await buildOutputPath(options.output);

        const result = await exec(cmd);
        return result.stdout || null;
    },
    verify: async (options) => {

        const inputError = validateOptions(options, ['input']);

        if (inputError) {
            throw inputError;
        }

        const input = quoteWrap(options.input);
        let cmd = insertSpaces(zxp, '-verify', input);

        if (options.info) {
            cmd = insertSpaces(cmd, '-certInfo');
        }
        if (options.skipChecks) {
            cmd = insertSpaces(cmd, '-skipOnlineRevocationChecks');
        }
        if (options.addCerts) {
            cmd = insertSpaces(cmd, '-addCerts', options.addCerts);
        }

        const result = await exec(cmd);
        return result.stdout || null;
    }
};
