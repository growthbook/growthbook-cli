#!/bin/bash

if [ ! -d tmp ]; then
  mkdir tmp
fi

echo '⏳ Downloading GrowthBook OpenAPI spec...'
curl https://api.growthbook.io/api/v1/openapi.yaml > tmp/openapi.yaml
echo '✅ Downloaded!'

echo '⏳ Generating GrowthBook API client...'

rm -rf src/generated/api

# This appears to generate invalid TypeScript code, possibly due to our validation errors
# Ref: https://github.com/growthbook/growthbook/issues/1269
npx openapi-generator-cli generate \
  -i ./tmp/openapi.yaml \
  -o src/generated/api \
  -g typescript-axios \
  --skip-validate-spec

