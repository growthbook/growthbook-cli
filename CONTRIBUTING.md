# Contributing

Built using [oclif](https://github.com/oclif/oclif). See the [oclif README](./oclif_README.md).


## Development

Generate commands and command "namespaces" with Plop.js:

    yarn plop

Build the CLI binary:

    yarn build

When running the CLI locally in development, use `./bin/run` instead of `growthbook`, e.g.:

    ./bin/run features generate-types --output ./types

Docs generation occurs on-commit.


### Linking the development `growthbook` binary in another project

You can test the CLI by using `yarn link` to link the project to another project. Run the following in this repository:

    yarn link

In your consumer project, run the following to link your development version of the CLI:

    yarn link @growthbook/cli

This will allow you to run `growthbook` commands, e.g.:

    growthbook features generate-types --output ./types
