import * as Handlebars from 'handlebars'
import {getFeatureValueTypeToTypeScriptMapping, SimplifiedFeature} from './feature'

const hbsTemplate = `/**
 * GrowthBook Features TypeScript Typings
 *
 * NOTE: This file is auto generated by the GrowthBook CLI (https://docs.growthbook.io/tools/cli).
 * See https://docs.growthbook.io/tools/cli#generating-types for more information.
 *
 * DO NOT EDIT this file manually.
 */
export type AppFeatures = {
  {{#each features}}
  '{{id}}': {{{valueType}}};
  {{/each}}
}
`

/**
 * Given the provided features list, will compile it into a TypeScript template.
 * @param features List of key/value pairs
 * @return {string} TypeScript template
 */
export const getCompiledTypeScriptTemplateForFeatures = (features: SimplifiedFeature[]): string => {
  const compiled = Handlebars.compile(hbsTemplate)

  const featuresMappedToTypes = features.map(({valueType, id}) => ({
    id,
    valueType: getFeatureValueTypeToTypeScriptMapping(valueType),
  }))

  const data = {
    features: featuresMappedToTypes,
  }

  return compiled(data)
}
