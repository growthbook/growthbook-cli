import fetch, {RequestInit} from 'node-fetch'
import {SimplifiedFeature} from './feature'

// region HTTP methods

export const makeGet = async <ResBody>(url: string, init: RequestInit = {}): Promise<ResBody> => {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error('Cannot fetch: ' + response.statusText)
  }

  return await response.json() as ResBody
}

// endregion HTTP methods

// region Features

export type SimpleFeatureResponse = SimplifiedFeature[]

export type Pagination = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  hasMore: boolean;
  nextOffset: number;
}

/**
 * Fetches all the features from the GrowthBook REST API for the provided API base URL.
 * @param apiBaseUrl  The API base URL for the target GrowthBook instance
 * @param token  Secret token
 * @return {Promise<SimpleFeatureResponse>} A list of features
 */
export const fetchAllPaginatedFeatures = async (apiBaseUrl: string, token: string): Promise<SimpleFeatureResponse> => {
  const limit = 100
  let offset = 0

  const featuresEndpoint = apiBaseUrl + '/api/v1/features'

  let allFeatures: SimpleFeatureResponse = []

  let shouldFetch = true

  while (shouldFetch) {
    const params = new URLSearchParams()
    params.append('limit', String(limit))
    params.append('offset', String(offset))

    const fullUrl = featuresEndpoint + '?' + params.toString()

    const response = await makeGet<{ features: SimpleFeatureResponse } & Pagination>(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const {nextOffset, hasMore, features} = response

    allFeatures = [...allFeatures, ...features]

    offset = nextOffset
    shouldFetch = hasMore

    console.log('✅ Fetched features at URL:', fullUrl)
  }

  return allFeatures
}

// endregion Features
