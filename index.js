'use strict';

var zxp = require('zxp-provider').bin,
    path = require('path'),
    fs = require('graceful-fs'),
    exec = require('child_process').exec;

var mkdir = function (dirPath, mode, callback) {
    fs.mkdir(dirPath, mode, function (error) {
        if (error && error.code === 'ENOENT') {
            mkdir(path.dirname(dirPath), mode, mkdir.bind(this, dirPath, mode, callback));
        } else if (callback) callback(error);
    });
};

var validateOptions = function (options, requirements) {
    var err = null;
    requirements.forEach(function (req) {
        if(!options[req]) {
            err = new Error(req + ' property is required');
        }
    });
    return err;
};

var buildOutputPath = function (output, callback) {
    mkdir(path.dirname(output), function (error) {
        if (error) {
            if (error.code === 'EEXIST') {
                callback(null);
            } else {
                callback(error);
            }
        } else {
            callback(null);
        }
    });
};

module.exports = {
    sign: function (options, callback) {
        var cbError = null,
            cmd;

        cbError = validateOptions(options, ['input', 'output', 'cert', 'password']);

        if (cbError) {
            callback(cbError);
            return;
        }

        cmd = [zxp, '-sign', options.input, options.output, options.cert, options.password].join(' ');

        if (options.timestamp) {
            cmd = [cmd, '-tsa', options.timestamp].join(' ');
        }

        buildOutputPath(options.output, function (error) {
            if (error) {
                callback(error);
                return;
            } else {
                exec(cmd, function (error, stdout, stderr) {
                    if (error) {
                        callback(error);
                        return;
                    }
                    if (stderr) {
                        console.log(stderr);
                    }

                    callback(null, stdout);
                });
            }
        });
    },
    selfSignedCert: function (options, callback) {
        var cbError = null,
            cmd;

        cbError = validateOptions(options, ['country', 'province', 'org', 'name', 'password', 'output']);

        if (cbError) {
            callback(cbError);
            return;
        }

        cmd = [zxp, '-selfSignedCert', options.country, options.province, options.org, options.name, options.password, options.output].join(' ');

        if (options.locality) {
            cmd = [cmd, '-locality', options.locality].join(' ');
        }
        if (options.orgUnit) {
            cmd = [cmd, '-orgUnit', options.orgUnit].join(' ');
        }
        if (options.email) {
            cmd = [cmd, '-email', options.email].join(' ');
        }
        if (options.validityDays) {
            cmd = [cmd, '-validityDays', options.validityDays].join(' ');
        }

        buildOutputPath(options.output, function (error) {
            if (error) {
                callback(error);
                return;
            } else {
                exec(cmd, function (error, stdout, stderr) {
                    if (error) {
                        callback(error);
                        return;
                    }
                    if (stderr) {
                        console.log(stderr);
                    }

                    callback(null, stdout);
                });
            }
        });
    },
    verify: function (options, callback) {
        var cbError = null,
            cmd;

        cbError = validateOptions(options, ['input']);

        if (cbError) {
            callback(cbError);
            return;
        }

        cmd = [zxp, '-verify', options.input].join(' ');

        if (options.info) {
            cmd = [cmd, '-certInfo'].join(' ');
        }
        if (options.skipChecks) {
            cmd = [cmd, '-skipOnlineRevocationChecks'].join(' ');
        }
        if (options.addCerts) {
            cmd = [cmd, '-addCerts', options.addCerts].join(' ');
        }

        exec(cmd, function (error, stdout, stderr) {
            if (error) {
                callback(error);
                return;
            }
            if (stderr) {
                console.log(stderr);
            }

            callback(null, stdout);
        });
    }
};
