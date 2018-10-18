'use strict';

var zxp = require('zxp-provider').bin,
    path = require('path'),
    fs = require('graceful-fs'),
    exec = require('child_process').exec;

var insertSpaces = function () {
    var builtString = '',
    args = Array.prototype.slice.call(arguments);

    args.forEach(function(val) {
        builtString = builtString + val + ' ';
    });
    return builtString;
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

var wrapStringsInQuotes = function(options) {
    var string,
        property;

    for (property in options) {
        if (!options.hasOwnProperty(property)) {
            continue;
        }

        string = options[property];

        if (typeof(string) !== 'string') {
            continue;
        }

        string = string.trim();

        if (string[0] !== '"' && string.slice(-1) !== '"') {
            string = '"' + string + '"';
            options[property] = string;
        }
    }
}

var buildOutputPath = function (output, callback) {
    fs.mkdir(path.dirname(output), function (error) {
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

        buildOutputPath(options.output, function (error) {
            if (error) {
                callback(error);
                return;
            } else {
                wrapStringsInQuotes(options);

                cmd = insertSpaces(zxp, '-sign', options.input, options.output, options.cert, options.password);

                if (options.timestamp) {
                    cmd = insertSpaces(cmd, '-tsa', options.timestamp);
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

        buildOutputPath(options.output, function (error) {
            if (error) {
                callback(error);
                return;
            } else {
                wrapStringsInQuotes(options);

                cmd = insertSpaces(zxp, '-selfSignedCert', options.country, options.province, options.org, options.name, options.password, options.output);

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

        cmd = insertSpaces(zxp, '-verify', options.input);

        if (options.info) {
            cmd = insertSpaces(cmd, '-certInfo');
        }
        if (options.skipChecks) {
            cmd = insertSpaces(cmd, '-skipOnlineRevocationChecks');
        }
        if (options.addCerts) {
            cmd = insertSpaces(cmd, '-addCerts', options.addCerts);
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
