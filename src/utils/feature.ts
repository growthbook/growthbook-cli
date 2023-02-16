export type SimplifiedFeature = {
  id: string
  valueType: string
}

/**
 * Maps a GrowthBook value type to a TypeScript type
 * @param valueType GrowthBook value type
 * @return {string} TypeScript type
 */
export const getFeatureValueTypeToTypeScriptMapping = (valueType: string): string => {
  switch (valueType) {
  case 'boolean':
  case 'number':
  case 'string':
    return valueType

  case 'json':
    return 'Record<string, unknown>'

  default:
    return 'unknown'
  }
}
