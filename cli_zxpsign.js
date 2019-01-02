#!/usr/bin/env node

var readline = require('readline');
var zxpSignCli = require('commander');
var zxpSignCmd = require('./index.js');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

zxpSignCli
  .version('0.1.0', '-v, --version')
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
      if(error && typeof error.message === 'string') {
          console.log(error.message);
      } else {
          console.log('Done!');
      };
  });
};

// We need a --pass flag to get a prompt
if( typeof zxpSignCli.pass === 'boolean' ) {
  rl.stdoutMuted = true;
  rl.question('p12 password: ', (pass) => {
    zxpSignCli.pass = String(pass);
    rl.output.write('\r\n');
    sign();
    rl.close();
  });

  rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (rl.stdoutMuted)
      rl.output.write('*');
    else
      rl.output.write(stringToWrite);
  };

} else {
  sign();
};
