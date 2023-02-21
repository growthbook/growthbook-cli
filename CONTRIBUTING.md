# Contributing

Built using [oclif](https://github.com/oclif/oclif). See the [oclif README](./oclif_README.md).


## Development

Generate commands and command "namespaces" with Plop.js:

    yarn plop

Build the CLI binary:

    yarn build

When running the CLI locally in development, use `./bin/run` instead of `growthbook`.

Regenerate documentation with the following command at the root directory:

```sh
npx oclif readme && node scripts/remove-see-code-lines.js;
```
