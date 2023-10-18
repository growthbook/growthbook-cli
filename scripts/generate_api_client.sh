#!/bin/bash

if [ ! -d tmp ]; then
  mkdir tmp
fi

echo '⏳ Downloading GrowthBook OpenAPI spec...'
curl https://api.growthbook.io/api/v1/openapi.yaml > tmp/openapi.yaml
echo '✅ Downloaded!'

echo '⏳ Generating GrowthBook API client...'

# Remove existing generated API code
rm -rf src/generated/api

# Generate code using the `typescript-axios`
# `typescript-fetch` does not work - possibly related bug: https://github.com/growthbook/growthbook/issues/1269
npx @openapitools/openapi-generator-cli@2.6.0 generate \
  -i ./tmp/openapi.yaml \
  -o src/generated/api \
  -g typescript-axios \
  --skip-validate-spec
