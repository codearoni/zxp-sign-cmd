# zxp-sign-cmd

> A JS wrapper for Adobe's extension signer - ZXPSignCmd

[![Dependencies](http://img.shields.io/david/codearoni/zxp-sign-cmd.svg?branch=master)](https://david-dm.org/codearoni/zxp-sign-cmd)
[![Build Status](https://travis-ci.org/codearoni/zxp-sign-cmd.svg?branch=master)](https://travis-ci.org/codearoni/zxp-sign-cmd)
[![Build status](https://ci.appveyor.com/api/projects/status/d8i2r9sgpsyblu4t?svg=true)](https://ci.appveyor.com/project/codearoni/zxp-sign-cmd)
[![Coverage Status](https://coveralls.io/repos/github/codearoni/zxp-sign-cmd/badge.svg?branch=master)](https://coveralls.io/github/codearoni/zxp-sign-cmd?branch=master)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## About
zxp-sign-cmd provides a simple interface for Adobe's extension signer. zxp-sign-cmd takes care of starting the requires processes, handling errors, and building the output directory if required.

## Installation
```bash
    npm i zxp-sign-cmd -D
```

## Usage
```javascript
const zxpSignCmd = require('zxp-sign-cmd');
```

There are functions for all 3 operations: sign, selfSignedCert, and verify.
Each function takes an options object as its first parameter. See the property tables for the appropriate function below.
zxp-sign-cmd's latest API uses promises and async functions. If you require a callback-style implementation, please revert to the legacy v1.x.x API. 
The result will be a string and will contain the stdout provided by ZXPSignCmd (if the task succeeds). In the event that the task fails, an error is thrown.
If you would like to use the await-style implementation, it is recommended to wrap a try/catch and handle errors that way.
However, the API does support .then( ) and .catch( ) configurations.

#### sign
Options

| Property  | Required | Datatype | Purpose |
| --------- | -------- | -------- | ------- |
| input     | yes      | String   | The directory that will be compiled into the packaged zxp file |
| output    | yes      | String   | The path and filename that the zxp will be exported to |
| cert      | yes      | String   | The path and filename of the .p12 certificate that will be used to sign the extension |
| password  | yes      | String   | The password associated with the certificate |
| timestamp | no       | String   | URL for a timestamp server |

Example:
```javascript
const signResult = await zxpSignCmd.sign(options);
```

#### selfSignedCert
Options

| Property  | Required | Datatype | Purpose |
| --------- | -------- | -------- | ------- |
| country   | yes      | String   | The country associated with the certificate |
| province  | yes      | String   | The state or province associated with the certificate |
| org       | yes      | String   | The organization associated with the certificate |
| name      | yes      | String   | The commonName for the certificate |
| password  | yes      | String   | The password for the certificate |
| output    | yes      | String   | The path that the certificate will be exported to |
| locality  | no       | String   | The locality for the certificate |
| orgUnit   | no       | String   | Name of the organizational unit |
| email     | no       | String   | An email associated with the certificate |
| validityDays | no    | Number   | The number of days the certificate is valid |

Example:
```javascript
const certResult = await zxpSignCmd.selfSignedCert(options);
```

#### verify
Options

| Property  | Required | Datatype | Purpose |
| --------- | -------- | -------- | ------- |
| input     | yes      | String   | The path to the zxp file that will be validated |
| info      | no       | Boolean  | Allows the result to return a more verbose output of the validation |
| skipChecks| no       | Boolean  | The validation will skip onlin revocation checks |
| addCerts  | no       | String   | Additional certificates to validate against |

Example:
```javascript
const verifyResult = await zxpSignCmd.verify(options);
```
## Notes
* Code coverage is low because the ZXPSignCmd cannot run in the Travis-CI environment. I imagine this is due to an OS compatiblity issue. If you would like to run see more complete code coverage, pull the repo and execute "npm run test".

* As of v2.0.0, zxp-sign-cmd uses the latest version as defined by the [zxp-provider API](https://github.com/codearoni/zxp-provider).