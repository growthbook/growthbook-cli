`growthbook auth`
=================



* [`growthbook auth`](#growthbook-auth)
* [`growthbook auth login`](#growthbook-auth-login)
* [`growthbook auth logout`](#growthbook-auth-logout)

## `growthbook auth`

```
USAGE
  $ growthbook auth
```

_See code: [dist/commands/auth/index.ts](https://github.com/growthbook/growthbook-cli/blob/v0.0.0/dist/commands/auth/index.ts)_

## `growthbook auth login`

Configure the GrowthBook SDK with your project

```
USAGE
  $ growthbook auth login -k <value> [-p <value>]

FLAGS
  -k, --apiKey=<value>   (required) Your GrowthBook Secret API Key
  -p, --profile=<value>  Optional profile (for projects that use multiple GrowthBook instances or organizations)
                         (default: default)

DESCRIPTION
  Configure the GrowthBook SDK with your project
```

## `growthbook auth logout`

Removes GrowthBook API key configurations

```
USAGE
  $ growthbook auth logout [-p <value>]

FLAGS
  -p, --profile=<value>  Optional profile (for projects that use multiple GrowthBook instances or organizations)
                         (default: all profiles)

DESCRIPTION
  Removes GrowthBook API key configurations
```
