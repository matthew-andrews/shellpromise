'use strict';

var shellpromise = require('../shellpromise');
var join = require('path').join;
var expect = require('chai').expect;

describe('shellpromise', function() {

	it('should execute the shell and output the output', function() {
		return shellpromise('printf hello')
			.then(function(output) {
				expect(output).to.eql('hello');
			});
	});

	it('should be able to understand single quotes', function() {
		return shellpromise("printf 'hello world'")
			.then(function(output) {
				expect(output).to.eql('hello world');
			});
	});

	it('should be able to understand double quotes', function() {
		return shellpromise('printf "hello world"')
			.then(function(output) {
				expect(output).to.eql('hello world');
			});
	});

	it('should reject the promise when the shell fails', function() {
		return shellpromise('ehco')
			.then(function() {
				throw new Error("command incorrectly executed successfully");
			}, function(err) {
				expect(err).to.be.an.instanceof(Error);
			});
	});

	it('should default to passing the current environment through', function() {
		process.env.TEST = 'ok';
		return shellpromise('./test/fixtures/env.sh')
			.then(function(output) {
				expect(output).to.eql('ok\n');
			});
	});

	it('should pass environment variables through', function() {
		return shellpromise('./test/fixtures/env.sh', { env: { TEST: 'matt' } })
			.then(function(output) {
				expect(output).to.eql('matt\n');
			});
	});

	it('should pass the cwd thorugh ', function() {
		return shellpromise('ls', { cwd: join(process.cwd(), 'test', 'fixtures') })
			.then(function(output) {
				expect(output).to.eql('env.sh\n');
			});
	});

	it('should return stderr when call fails', function() {
		return shellpromise('ehco hi')
			.then(function(output) {
				throw new Error("command incorrectly executed successfully");
			}, function(output) {
				expect(output).to.not.be.undefined;
				expect(output.toString()).to.contain('command not found');
			});
	});

	it('should should support redirecting stderr to /dev/null', function() {
		return shellpromise('ehco hi 2>/dev/null')
			.then(function(output) {
				throw new Error("command incorrectly executed successfully");
			}, function(output) {
				expect(output.toString()).to.not.contain('command not found');
			});
	});

	it('should support pipe', function() {
		return shellpromise('printf "b" | grep b')
			.then(function(output) {
				expect(output.trim()).to.eql('b');
			});
	});

});
