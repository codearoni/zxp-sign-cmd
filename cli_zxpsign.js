#!/usr/bin/env node

var zxpSignCli = require('commander');
var zxpSignCmd = require('./index.js');
var prompt = require('prompt');

zxpSignCli
  .version('0.1.0')
  .option('-i, --input [value]', 'Directory that will be compiled into the packaged zxp file.')
  .option('-o, --output [value]', 'Path and filename that the zxp will be exported to.')
  .option('-c, --cert [value]', 'Path and filename of the .p12 certificate that will be used to sign the extension.')
  .option('-t, --tsa [value]', 'URL for a timestamp server.')
  .option('-p, --pass [value]', 'Password for P12 certificate.')
  .parse(process.argv);

function sign() {
  zxpSignCmd.sign({
      input: zxpSignCli.input,
      output: zxpSignCli.output,
      cert: zxpSignCli.cert,
      password: zxpSignCli.pass,
      timestamp: zxpSignCli.tsa
  }, function (error, result) {
      if(typeof error.message === 'string') {
          console.log(error.message);
      } else {
          console.log('Done!');
      };
  });
};

if( typeof zxpSignCli.pass === 'boolean' ) {
  // Need the --pass flag but you can leave blank to get prompt
  prompt.start();

  prompt.get([{name:'p12Password',hidden: true}], function (err, result) {
      zxpSignCli.pass = result.p12Password;
      sign();
  });
} else {
  sign();
};