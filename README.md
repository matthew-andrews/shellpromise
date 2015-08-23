# shell promise [![Build Status](https://travis-ci.org/matthew-andrews/shellpromise.svg?branch=master)](https://travis-ci.org/matthew-andrews/shellpromise)

Executes some shell, returns a promise.

Internally this library uses [`spawn`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) so that when `verbose` is set to `true` you can see the live output from the command — you don't have to wait for the process to exit to know what has happened (useful for a slow process or a long-running process).

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
```

## Options

- `cwd` to change the current working directory that the command will run on (defaults to `process.cwd()`)
- `env` to set environment variables (defaults to `process.env`)
- `verbose` to see more output

## Credits and collaboration

The lead developer of denodeify is Matt Andrews at the Financial Times. All open source code released by the FT is licenced under the MIT licence. We welcome comments, feedback and suggestions. Please feel free to raise an issue or pull request.
