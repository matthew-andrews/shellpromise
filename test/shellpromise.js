'use strict';

var shellpromise = require('../shellpromise');
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

});
