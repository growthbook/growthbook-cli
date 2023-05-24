# GrowthBook CLI

A CLI tool for helping developers work with the GrowthBook open-source platform for feature flags and A/B tests. 

See the [official GrowthBook CLI](https://docs.growthbook.io/tools/cli) documentation for more information.

# Commands

<!-- commands -->
* [`growthbook auth`](#growthbook-auth)
* [`growthbook auth login`](#growthbook-auth-login)
* [`growthbook auth logout`](#growthbook-auth-logout)
* [`growthbook datasources get ID`](#growthbook-datasources-get-id)
* [`growthbook experiments get ID`](#growthbook-experiments-get-id)
* [`growthbook experiments list`](#growthbook-experiments-list)
* [`growthbook experiments results EXPERIMENTID`](#growthbook-experiments-results-experimentid)
* [`growthbook features generate-types`](#growthbook-features-generate-types)
* [`growthbook features get FEATUREKEY`](#growthbook-features-get-featurekey)
* [`growthbook features list`](#growthbook-features-list)
* [`growthbook features toggle FEATUREKEY`](#growthbook-features-toggle-featurekey)
* [`growthbook help [COMMANDS]`](#growthbook-help-commands)
* [`growthbook metrics create [INPUT]`](#growthbook-metrics-create-input)
* [`growthbook metrics get METRICID`](#growthbook-metrics-get-metricid)
* [`growthbook metrics list`](#growthbook-metrics-list)

## `growthbook auth`

```
USAGE
  $ growthbook auth
```



## `growthbook auth login`

Configure your API key with the GrowthBook SDK with your project

```
USAGE
  $ growthbook auth login

DESCRIPTION
  Configure your API key with the GrowthBook SDK with your project
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

## `growthbook datasources get ID`

Get a single datasource by ID

```
USAGE
  $ growthbook datasources get ID [-u <value>] [-p <value>]

ARGUMENTS
  ID  Datasource ID

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Get a single datasource by ID

EXAMPLES
  $ growthbook datasources get
```

## `growthbook experiments get ID`

Get a single experiment by ID

```
USAGE
  $ growthbook experiments get ID [-u <value>] [-p <value>]

ARGUMENTS
  ID  Experiment ID

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Get a single experiment by ID

EXAMPLES
  $ growthbook experiments get
```

## `growthbook experiments list`

Get all experiments

```
USAGE
  $ growthbook experiments list [-u <value>] [-p <value>] [--limit <value>] [--offset <value>] [--project <value>]
    [--datasource <value>] [--experiment <value>]

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)
  --datasource=<value>      Datasource ID filter
  --experiment=<value>      Filter the returned list by the experiment tracking key (id)
  --limit=<value>           [default: 100] Limit for pagination
  --offset=<value>          Offset for pagination
  --project=<value>         Project ID filter

DESCRIPTION
  Get all experiments

EXAMPLES
  $ growthbook experiments list
```

## `growthbook experiments results EXPERIMENTID`

Get results for an experiment with optional phase and dimension filtering

```
USAGE
  $ growthbook experiments results EXPERIMENTID [-u <value>] [-p <value>] [--dimension <value>] [--phase <value>]

ARGUMENTS
  EXPERIMENTID  ID of the experiment

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)
  --dimension=<value>
  --phase=<value>

DESCRIPTION
  Get results for an experiment with optional phase and dimension filtering

EXAMPLES
  $ growthbook experiments results
```

## `growthbook features generate-types`

Generate TypeScript types for all your features

```
USAGE
  $ growthbook features generate-types [-u <value>] [-p <value>] [-o <value>] [-f <value>]

FLAGS
  -f, --filename=<value>    Output filename for the generated types. If not provided, the filename app-features.ts will
                            be used.
  -o, --output=<value>      Output path for the app-features.ts file. All directories in this path should exist. If not
                            provided, the directory ./growthbook-types will be created in the current working directory.
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Generate TypeScript types for all your features
```

## `growthbook features get FEATUREKEY`

Get a feature by key

```
USAGE
  $ growthbook features get FEATUREKEY [-u <value>] [-p <value>]

ARGUMENTS
  FEATUREKEY  Feature key

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Get a feature by key

EXAMPLES
  $ growthbook features get
```

## `growthbook features list`

Get all features

```
USAGE
  $ growthbook features list [-u <value>] [-p <value>] [--limit <value>] [--offset <value>] [--project <value>]

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)
  --limit=<value>           [default: 100] Limit for pagination
  --offset=<value>          Offset for pagination
  --project=<value>         Project ID filter

DESCRIPTION
  Get all features

EXAMPLES
  $ growthbook features list
```

## `growthbook features toggle FEATUREKEY`

Toggle a feature on or off for a specific environment

```
USAGE
  $ growthbook features toggle FEATUREKEY -e <value> -n true|false|on|off|1|0 [-u <value>] [-p <value>] [-r <value>]

ARGUMENTS
  FEATUREKEY  Feature key to toggle

FLAGS
  -e, --environment=<value>  (required) Environment that you would like to toggle
  -n, --enabled=<option>     (required) Enabled state of the feature
                             <options: true|false|on|off|1|0>
  -p, --profile=<value>      Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -r, --reason=<value>       The reason for toggling it on
  -u, --apiBaseUrl=<value>   Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                             https://api.growthbook.io)

DESCRIPTION
  Toggle a feature on or off for a specific environment

EXAMPLES
  $ growthbook features toggle
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



## `growthbook metrics create [INPUT]`

Create a metric from file or standard in

```
USAGE
  $ growthbook metrics create [INPUT] [-u <value>] [-p <value>] [-f <value>] [-o <value>]

ARGUMENTS
  INPUT  JSON payload of the metric to be created. Docs:
         https://docs.growthbook.io/api/#tag/metrics/operation/postMetric

FLAGS
  -f, --filePath=<value>    Path to input file
  -o, --output=<value>      Path to output file, e.g. created-resource.json
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Create a metric from file or standard in

EXAMPLES
  cat my-metric.json | growthbook metrics create

  $ growthbook metrics create --filePath my-metric.json
```

## `growthbook metrics get METRICID`

Get a single metric by ID

```
USAGE
  $ growthbook metrics get METRICID [-u <value>] [-p <value>]

ARGUMENTS
  METRICID  Metric ID

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Get a single metric by ID

EXAMPLES
  $ growthbook metrics get
```

## `growthbook metrics list`

List all metrics

```
USAGE
  $ growthbook metrics list [-u <value>] [-p <value>] [--limit <value>] [--offset <value>] [--project <value>]

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)
  --limit=<value>           [default: 100] Limit for pagination
  --offset=<value>          Offset for pagination
  --project=<value>         Project ID filter

DESCRIPTION
  List all metrics

EXAMPLES
  $ growthbook metrics list
```
<!-- commandsstop -->
