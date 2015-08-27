'use strict';

var spawn = require('child_process').spawn;

module.exports = function(processToRun, options) {
	options = options || {};
	if (options.verbose) {
		console.log("shellpromise: about to spawn " + processToRun);
	}
	return new Promise(function(resolve, reject) {
		var local = spawn('sh', ['-c', processToRun], { env: options.env || process.env, cwd: options.cwd || process.cwd() });
		var output = "";

		function toStdErr(data) {
			output += data;
			if (options.verbose) {
				console.warn("shellpromise: " + command + " error: " + data.toString());
			}
		}
		function toStdOut(data) {
			output += data;
			if (options.verbose) {
				console.log("shellpromise: " + command + " output: " + data.toString());
			}
		}

		local.stdout.on('data', toStdOut);
		local.stderr.on('data', toStdErr);
		local.on('error', reject);
		local.on('close', function(code) {
			if (code === 0) {
				resolve(output);
			} else {
				if (options.verbose) {
					toStdErr(processToRun.join(' ') + ' exited with exit code ' + code);
				}
				reject(new Error(output));
			}
		});
	});
};
