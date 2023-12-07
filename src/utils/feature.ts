import {FeaturesRepository} from '../repositories/features.repository'

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

/**
 * Fetches all the features from the GrowthBook REST API for the provided API base URL.
 * @param apiBaseUrl  The API base URL for the target GrowthBook instance
 * @param token  Secret token
 * @param projectId  Optional project ID filter
 * @return {Promise<SimplifiedFeature[]>} A list of features
 */
export const fetchAllPaginatedFeatures = async (apiBaseUrl: string, token: string, projectId?: string): Promise<SimplifiedFeature[]> => {
  const limit = 100
  let offset = 0

  let allFeatures: SimplifiedFeature[] = []
  let shouldFetch = true

  const featuresRepo = new FeaturesRepository({
    apiKey: token,
    apiBaseUrl,
  })

  while (shouldFetch) {
    const response = await featuresRepo.listFeatures(limit, offset, projectId)
    const {nextOffset, hasMore, features} = response

    allFeatures = [...allFeatures, ...features]

    offset = nextOffset
    shouldFetch = hasMore
  }

  return allFeatures
}
