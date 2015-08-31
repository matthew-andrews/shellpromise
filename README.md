# shell promise [![Build Status](https://travis-ci.org/matthew-andrews/shellpromise.svg?branch=master)](https://travis-ci.org/matthew-andrews/shellpromise)

Executes some shell, returns a promise.

Internally this library uses [`spawn`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) so that when `verbose` is set to `true` you can see the live output from the command — you don't have to wait for the process to exit to know what has happened (useful for a slow process or a long-running process).

Warning: This micro-library doesn't force you to use any particular Promise implementation by using whatever `Promise` has been defined as globally.  This is so that you may use any ES6 standard Promise compliant library - or, of course, native ES6 Promises.

## Installation

```
npm install --save shellpromise
```

## Usage

```js
var shellpromise = require('shellpromise');

shellpromise("echo 'hello world'")
	.then(function(output) {
		console.log(output); // hello world\n
	});


// For advanced debug pass in `{ verbose: true }` as the second parameter
shellpromise("echo 'hello world'", { verbose: true });
// shellpromise: about to spawn echo hi
// shellpromise: echo output: hi

// To stop stderr from getting into the output redirect with `2>/dev/null`
shellpromise("ehco 'hello world' 2>/dev/null");
```

## Options

- `cwd` to change the current working directory that the command will run on (defaults to `process.cwd()`)
- `env` to set environment variables (defaults to `process.env`)
- `verbose` to see more output

## Credits and collaboration

The lead developer of shell promise is [Matt Andrews](https://twitter.com/andrewsmatt) at the Financial Times. All open source code released by the FT is licenced under the MIT licence. We welcome comments, feedback and suggestions. Please feel free to raise an issue or pull request.
