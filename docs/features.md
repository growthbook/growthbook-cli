`growthbook features`
=====================



* [`growthbook features`](#growthbook-features)
* [`growthbook features generate-types`](#growthbook-features-generate-types)

## `growthbook features`

```
USAGE
  $ growthbook features
```

_See code: [dist/commands/features/index.ts](https://github.com/growthbook/growthbook-cli/blob/v0.0.0/dist/commands/features/index.ts)_

## `growthbook features generate-types`

Generate TypeScript types for all your features

```
USAGE
  $ growthbook features generate-types [-u <value>] [-o <value>] [-p <value>]

FLAGS
  -o, --output=<value>      Output path for the app-features.ts file. All directories in this path should exist. If not
                            provided, the directory ./growthbook-types will be created in the current working directory.
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default:
                            https://api.growthbook.io)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Generate TypeScript types for all your features
```
