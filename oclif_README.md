oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g growthbook-cli
$ growthbook COMMAND
running command...
$ growthbook (--version)
growthbook-cli/0.0.0 darwin-x64 node-v16.14.2
$ growthbook --help [COMMAND]
USAGE
  $ growthbook COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
- [`growthbook hello PERSON`](#growthbook-hello-person)
- [`growthbook hello world`](#growthbook-hello-world)
- [`growthbook help [COMMANDS]`](#growthbook-help-commands)
- [`growthbook plugins`](#growthbook-plugins)
- [`growthbook plugins:install PLUGIN...`](#growthbook-pluginsinstall-plugin)
- [`growthbook plugins:inspect PLUGIN...`](#growthbook-pluginsinspect-plugin)
- [`growthbook plugins:install PLUGIN...`](#growthbook-pluginsinstall-plugin-1)
- [`growthbook plugins:link PLUGIN`](#growthbook-pluginslink-plugin)
- [`growthbook plugins:uninstall PLUGIN...`](#growthbook-pluginsuninstall-plugin)
- [`growthbook plugins:uninstall PLUGIN...`](#growthbook-pluginsuninstall-plugin-1)
- [`growthbook plugins:uninstall PLUGIN...`](#growthbook-pluginsuninstall-plugin-2)
- [`growthbook plugins update`](#growthbook-plugins-update)

## `growthbook hello PERSON`

Say hello

```
USAGE
  $ growthbook hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/growthbook/growthbook-cli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `growthbook hello world`

Say hello world

```
USAGE
  $ growthbook hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ growthbook hello world
  hello world! (./src/commands/hello/world.ts)
```

## `growthbook help [COMMANDS]`

Display help for growthbook.

```
USAGE
  $ growthbook help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for growthbook.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.4/src/commands/help.ts)_

## `growthbook plugins`

List installed plugins.

```
USAGE
  $ growthbook plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ growthbook plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.3.0/src/commands/plugins/index.ts)_

## `growthbook plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ growthbook plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ growthbook plugins add

EXAMPLES
  $ growthbook plugins:install myplugin 

  $ growthbook plugins:install https://github.com/someuser/someplugin

  $ growthbook plugins:install someuser/someplugin
```

## `growthbook plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ growthbook plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ growthbook plugins:inspect myplugin
```

## `growthbook plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ growthbook plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ growthbook plugins add

EXAMPLES
  $ growthbook plugins:install myplugin 

  $ growthbook plugins:install https://github.com/someuser/someplugin

  $ growthbook plugins:install someuser/someplugin
```

## `growthbook plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ growthbook plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ growthbook plugins:link myplugin
```

## `growthbook plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ growthbook plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ growthbook plugins unlink
  $ growthbook plugins remove
```

## `growthbook plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ growthbook plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ growthbook plugins unlink
  $ growthbook plugins remove
```

## `growthbook plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ growthbook plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ growthbook plugins unlink
  $ growthbook plugins remove
```

## `growthbook plugins update`

Update installed plugins.

```
USAGE
  $ growthbook plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
