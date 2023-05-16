# Contributing

Built using [oclif](https://github.com/oclif/oclif). See the [oclif README](./oclif_README.md).

- [💻 Development](#-development)
  - [Linking the development `growthbook` binary in another project](#linking-the-development-growthbook-binary-in-another-project)
- [💅 Style Guide](#-style-guide)
  - [Adding commands](#adding-commands)
  - [Adding networking with the GrowthBook API](#adding-networking-with-the-growthbook-api)
  - [Unit tests](#unit-tests)


## 💻 Development

Generate root commands and sub-commands with Plop.js:

    yarn plop

Build the CLI binary:

    yarn build

When running the CLI locally in development, use `./bin/run` instead of `growthbook`, e.g.:

    ./bin/run features generate-types --output ./types

A script `yarn cli` has been added that does both a build and a run.

Docs generation occurs on-commit.

To create new commands, you can run:

    yarn plop command


### Linking the development `growthbook` binary in another project

You can test the CLI by using `yarn link` to link the project to another project. Run the following in this repository:

    yarn link

In your consumer project, run the following to link your development version of the CLI:

    yarn link @growthbook/cli

This will allow you to run `growthbook` commands, e.g.:

    growthbook features generate-types --output ./types



## 💅 Style Guide

The style of this project is somewhat opinionated. Code generators have been provided for repetitive tasks, please use them. Common logic has been abstracted into convenience utils, allowing developers to add functionality quickly and provide a consistent user experience.


### Adding commands

Generate a new command using `yarn plop command` for a sub-command or `yarn plop root command` for a root command. This will create a command with some default boilerplate including code to support standard arguments all commands take.

Commonly-used command flags and arguments are available in `./src/utils/cli.ts`:

- **Credentials and API configuration**: Users should be able to pass in a custom profile or API base URL
- **Single-line input**: Allow users to pass in single-line input either as an argument or a flag, depending on the use case. For example, `growthbook metrics get mt_abc123` allows users to pass the metric ID as the first and only argument. When collecting only a single input, use an argument. When collecting multiple inputs, use flags.
- **Multi-line Input**: When allowing the user to provide multi-line input (e.g. when accepting a payload body for making post requests), allow the user to provide input in various ways:
    - **Standard input**: Support standard input so a user can pipe output into the command, e.g. `cat my-metric.json | growthbook metrics create` will allow a user to create a metric with the payload from standard in
    - **File input**: Allow a user to pass in a flag `--filePath [-f]` so the command can parse the file contents as JSON and post it to the API.
    - **From prompt**: If none of the above are provided, prompt the user for required input. The user can post a single-line input that can be parsed as JSON and posted to the API. 
- **Output**: 
    - **File output**: Allow the user to pass an optional flag `--output [-o]` and write the success response to file, if provided.
    - **Standard output**: Always log feedback messaging and responses to the console as JSON, or the error message, which can be retrieved from the error response.

For an example of all of the above, see the create metric command at `./src/commands/metrics/create.ts`.


### Adding networking with the GrowthBook API

Generate a new repository using `yarn plop repository` and use the OpenAPI-generated resource name. This repository should be a simple wrapper around the OpenAPI calls and should not have any business logic. Do not use OpenAPI-generated classes directly in the code—they should always be wrapped following this repository pattern.

OpenAPI-generated classes can be found in `./src/generated/api`.

For examples, see repositories for Experiments, Features and Metrics in `./src/repositories`.


### Unit tests

You are encouraged to write unit tests in the `./test` directory where this may be valuable and practical.
