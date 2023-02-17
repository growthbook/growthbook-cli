# GrowthBook CLI

The GrowthBook CLI. See the official GrowthBook documentation for usage information.

- [Commands](#commands)
  - [auth](#auth)
    - [auth login](#auth-login)
    - [auth logout](#auth-logout)
  - [features](#features)
    - [features generate-types](#features-generate-types)



## Commands

    growthbook --help


```
The GrowthBook command-line interface (CLI) for working with the GrowthBook A/B testing, feature flagging, and experimentation platform

VERSION
  growthbook-cli/0.0.0 darwin-x64 node-v16.14.2

USAGE
  $ growthbook [COMMAND]

TOPICS
  auth
  features

COMMANDS
  auth
  features
  help      Display help for growthbook.
```

### auth

    growthbook auth --help

```
USAGE
  $ growthbook auth

COMMANDS
  auth login   Configure the GrowthBook SDK with your project
  auth logout  Removes GrowthBook API key configurations

```

#### auth login

    growthbook auth login --help

```
Configure the GrowthBook SDK with your project

USAGE
  $ growthbook auth login -k <value> [-p <value>]

FLAGS
  -k, --apiKey=<value>   (required) Your GrowthBook Secret API Key
  -p, --profile=<value>  Optional profile (for projects that use multiple GrowthBook instances or organizations) (default: default)

DESCRIPTION
  Configure the GrowthBook SDK with your project
```

#### auth logout

    growthbook auth logout --help

```
Removes GrowthBook API key configurations

USAGE
  $ growthbook auth logout [-p <value>]

FLAGS
  -p, --profile=<value>  Optional profile (for projects that use multiple GrowthBook instances or organizations) (default: all profiles)

DESCRIPTION
  Removes GrowthBook API key configurations
```

### features

    growthbook features --help

```
USAGE
  $ growthbook features

COMMANDS
  features generate-types  Generate TypeScript types for all your features
```

#### features generate-types

    growthbook features generate-types --help

```
Generate TypeScript types for all your features

USAGE
  $ growthbook features generate-types [-u <value>] [-o <value>] [-p <value>]

FLAGS
  -o, --output=<value>      Output path for the app-features.ts file. All directories in this path should exist. If not provided, the directory ./growthbook-types will be created in the current
                            working directory.
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: https://api.growthbook.io)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default: https://api.growthbook.io)

DESCRIPTION
  Generate TypeScript types for all your features
```
