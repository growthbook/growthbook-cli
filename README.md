# GrowthBook CLI

A CLI tool for helping developers work with the GrowthBook open-source platform for feature flags and A/B tests. 

See the [official GrowthBook CLI](https://docs.growthbook.io/tools/cli) documentation for more information.

# Commands

<!-- commands -->
* [`growthbook auth`](#growthbook-auth)
* [`growthbook auth login`](#growthbook-auth-login)
* [`growthbook auth logout`](#growthbook-auth-logout)
* [`growthbook datasources get ID`](#growthbook-datasources-get-id)
* [`growthbook datasources list`](#growthbook-datasources-list)
* [`growthbook dimensions get ID`](#growthbook-dimensions-get-id)
* [`growthbook dimensions list`](#growthbook-dimensions-list)
* [`growthbook experiments get ID`](#growthbook-experiments-get-id)
* [`growthbook experiments list`](#growthbook-experiments-list)
* [`growthbook experiments results EXPERIMENTID`](#growthbook-experiments-results-experimentid)
* [`growthbook experiments update [INPUT]`](#growthbook-experiments-update-input)
* [`growthbook features generate-types`](#growthbook-features-generate-types)
* [`growthbook features get FEATUREKEY`](#growthbook-features-get-featurekey)
* [`growthbook features list`](#growthbook-features-list)
* [`growthbook features toggle FEATUREKEY`](#growthbook-features-toggle-featurekey)
* [`growthbook help [COMMANDS]`](#growthbook-help-commands)
* [`growthbook metrics create [INPUT]`](#growthbook-metrics-create-input)
* [`growthbook metrics get METRICID`](#growthbook-metrics-get-metricid)
* [`growthbook metrics list`](#growthbook-metrics-list)
* [`growthbook projects get PROJECTID`](#growthbook-projects-get-projectid)
* [`growthbook projects list`](#growthbook-projects-list)
* [`growthbook savedgroups create [INPUT]`](#growthbook-savedgroups-create-input)
* [`growthbook savedgroups get ID`](#growthbook-savedgroups-get-id)
* [`growthbook savedgroups list`](#growthbook-savedgroups-list)
* [`growthbook savedgroups update [INPUT]`](#growthbook-savedgroups-update-input)
* [`growthbook sdkconnections get ID`](#growthbook-sdkconnections-get-id)
* [`growthbook sdkconnections list`](#growthbook-sdkconnections-list)
* [`growthbook segments get ID`](#growthbook-segments-get-id)
* [`growthbook segments list`](#growthbook-segments-list)
* [`growthbook vcs get ID`](#growthbook-vcs-get-id)
* [`growthbook vcs list`](#growthbook-vcs-list)

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

## `growthbook datasources list`

Get all data sources

```
USAGE
  $ growthbook datasources list [-u <value>] [-p <value>] [--limit <value>] [--offset <value>] [--project <value>]

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)
  --limit=<value>           [default: 100] Limit for pagination
  --offset=<value>          Offset for pagination
  --project=<value>         Project ID filter

DESCRIPTION
  Get all data sources

EXAMPLES
  $ growthbook datasources list
```

## `growthbook dimensions get ID`

Get a single dimension used during experiment analysis

```
USAGE
  $ growthbook dimensions get ID [-u <value>] [-p <value>]

ARGUMENTS
  ID  Dimension ID

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Get a single dimension used during experiment analysis

EXAMPLES
  $ growthbook dimensions get
```

## `growthbook dimensions list`

Get all dimensions used during experiment analysis

```
USAGE
  $ growthbook dimensions list [-u <value>] [-p <value>] [--limit <value>] [--offset <value>] [--dataSourceId <value>]

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)
  --dataSourceId=<value>    Data source ID to filter by
  --limit=<value>           [default: 100] Limit for pagination
  --offset=<value>          Offset for pagination

DESCRIPTION
  Get all dimensions used during experiment analysis

EXAMPLES
  $ growthbook dimensions list
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

## `growthbook experiments update [INPUT]`

Update an existing experiment.

```
USAGE
  $ growthbook experiments update [INPUT] -i <value> [-u <value>] [-p <value>] [-f <value>] [-o <value>]

ARGUMENTS
  INPUT  JSON payload for the update. Docs: [Your Docs URL]

FLAGS
  -f, --filePath=<value>    Path to input file
  -i, --id=<value>          (required) Experiment ID to update
  -o, --output=<value>      Path to output file, e.g. created-resource.json
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Update an existing experiment.

EXAMPLES
  $ growthbook experiments update

  $ growthbook experiments update --filePath input.json
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

## `growthbook projects get PROJECTID`

Get a single project by ID

```
USAGE
  $ growthbook projects get PROJECTID [-u <value>] [-p <value>]

ARGUMENTS
  PROJECTID  Project ID

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Get a single project by ID

EXAMPLES
  $ growthbook projects get
```

## `growthbook projects list`

List all projects

```
USAGE
  $ growthbook projects list [-u <value>] [-p <value>] [--limit <value>] [--offset <value>]

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)
  --limit=<value>           [default: 100] Limit for pagination
  --offset=<value>          Offset for pagination

DESCRIPTION
  List all projects

EXAMPLES
  $ growthbook projects list
```

## `growthbook savedgroups create [INPUT]`

Create a saved group

```
USAGE
  $ growthbook savedgroups create [INPUT] [-u <value>] [-p <value>] [-f <value>] [-o <value>]

ARGUMENTS
  INPUT  JSON payload of the saved group to be created. Docs:
         https://docs.growthbook.io/api/#tag/saved-groups/operation/postSavedGroup

FLAGS
  -f, --filePath=<value>    Path to input file
  -o, --output=<value>      Path to output file, e.g. created-resource.json
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Create a saved group

EXAMPLES
  $ growthbook savedgroups create

  $ growthbook savedgroups create --filePath input.json
```

## `growthbook savedgroups get ID`

Get a single saved group by ID

```
USAGE
  $ growthbook savedgroups get ID [-u <value>] [-p <value>]

ARGUMENTS
  ID  Saved Group ID

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Get a single saved group by ID

EXAMPLES
  $ growthbook savedgroups get
```

## `growthbook savedgroups list`

Defined sets of attribute values which can be used with feature rules for targeting features at particular users.

```
USAGE
  $ growthbook savedgroups list [-u <value>] [-p <value>] [--limit <value>] [--offset <value>]

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)
  --limit=<value>           [default: 100] Limit for pagination
  --offset=<value>          Offset for pagination

DESCRIPTION
  Defined sets of attribute values which can be used with feature rules for targeting features at particular users.

EXAMPLES
  $ growthbook savedgroups list
```

## `growthbook savedgroups update [INPUT]`

Update an existing saved group.

```
USAGE
  $ growthbook savedgroups update [INPUT] -i <value> [-u <value>] [-p <value>] [-f <value>] [-o <value>]

ARGUMENTS
  INPUT  JSON payload of the update payload. Docs:
         https://docs.growthbook.io/api/#tag/saved-groups/operation/updateSavedGroup

FLAGS
  -f, --filePath=<value>    Path to input file
  -i, --id=<value>          (required) Saved group ID to update
  -o, --output=<value>      Path to output file, e.g. created-resource.json
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Update an existing saved group.

EXAMPLES
  $ growthbook savedgroups update

  $ growthbook savedgroups update --filePath input.json
```

## `growthbook sdkconnections get ID`

Client keys and settings for connecting SDKs to a GrowthBook instance

```
USAGE
  $ growthbook sdkconnections get ID [-u <value>] [-p <value>]

ARGUMENTS
  ID  SDK connection ID

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Client keys and settings for connecting SDKs to a GrowthBook instance

EXAMPLES
  $ growthbook sdkconnections get
```

## `growthbook sdkconnections list`

Client keys and settings for connecting SDKs to a GrowthBook instance

```
USAGE
  $ growthbook sdkconnections list [-u <value>] [-p <value>] [--limit <value>] [--offset <value>] [--projectId <value>]

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)
  --limit=<value>           [default: 100] Limit for pagination
  --offset=<value>          Offset for pagination
  --projectId=<value>       Project ID to filter by

DESCRIPTION
  Client keys and settings for connecting SDKs to a GrowthBook instance

EXAMPLES
  $ growthbook sdkconnections list
```

## `growthbook segments get ID`

Get a single segment used during experiment analysis

```
USAGE
  $ growthbook segments get ID [-u <value>] [-p <value>]

ARGUMENTS
  ID  Segment ID

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  Get a single segment used during experiment analysis

EXAMPLES
  $ growthbook segments get
```

## `growthbook segments list`

Get all segments used during experiment analysis

```
USAGE
  $ growthbook segments list [-u <value>] [-p <value>] [--limit <value>] [--offset <value>] [--dataSourceId <value>]

FLAGS
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)
  --dataSourceId=<value>    Data source ID to filter by
  --limit=<value>           [default: 100] Limit for pagination
  --offset=<value>          Offset for pagination

DESCRIPTION
  Get all segments used during experiment analysis

EXAMPLES
  $ growthbook segments list
```

## `growthbook vcs get ID`

Get a Visual Changeset created in the visual editor

```
USAGE
  $ growthbook vcs get ID [-u <value>] [-p <value>] [-e 0|1]

ARGUMENTS
  ID  Visual Changeset ID

FLAGS
  -e, --includeExperiment=<option>  Include the associated experiment in payload
                                    <options: 0|1>
  -p, --profile=<value>             Optional profile (for projects that use multiple GrowthBook instances) default:
                                    default)
  -u, --apiBaseUrl=<value>          Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                                    https://api.growthbook.io)

DESCRIPTION
  Get a Visual Changeset created in the visual editor

EXAMPLES
  $ growthbook vcs get
```

## `growthbook vcs list`

List Visual Changesets created in the visual editor

```
USAGE
  $ growthbook vcs list -e <value> [-u <value>] [-p <value>]

FLAGS
  -e, --experiment=<value>  (required) Filter by experiment
  -p, --profile=<value>     Optional profile (for projects that use multiple GrowthBook instances) default: default)
  -u, --apiBaseUrl=<value>  Your GrowthBook instance base URL (e.g. http://localhost:3100, default:
                            https://api.growthbook.io)

DESCRIPTION
  List Visual Changesets created in the visual editor

EXAMPLES
  $ growthbook vcs list
```
<!-- commandsstop -->
