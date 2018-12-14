#!/usr/bin/env node

var zxpSignCli = require('commander');
var zxpSignCmd = require('./index.js');
var prompt = require('prompt');

zxpSignCli
  .version('0.1.0')
  .option('-i, --input', 'Directory that will be compiled into the packaged zxp file.')
  .option('-o, --output', 'Path and filename that the zxp will be exported to.')
  .option('-c, --cert', 'Path and filename of the .p12 certificate that will be used to sign the extension.')
  .option('-t, --tsa', 'URL for a timestamp server.')
  .parse(process.argv);

prompt.start();

prompt.get([{name:'p12Password',hidden: true}], function (err, result) {
    zxpSignCmd.sign({
        input: zxpSignCli.input,
        output: zxpSignCli.output,
        cert: zxpSignCli.cert,
        password: result.p12Password,
        timestamp: zxpSignCli.tsa
    }, function (error, result) {
        if(typeof error.message === 'string') {
            console.log(error.message);
        } else {
            console.log('Done!');
        };
    });
});