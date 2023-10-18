import {env} from 'node:process'
import {Configuration} from '../generated/api'
import {BaseAPI} from '../generated/api/base'

/**
 * Base options that all repositories need
 */
export type BaseOptions = {
  apiBaseUrl: string
  apiKey: string
  apiVersion?: string
}

/**
 * All repositories should have this property
 */
export type IBaseRepository = {
  apiBaseUrl: string
  apiKey: string
}

/**
 * This is the interface that all repositories should implement
 */
export type BaseApiRepository<T extends BaseAPI> = IBaseRepository & {
  api(): T
}

/**
 * This is the class that all repositories should extend
 */
export class BaseRepository implements IBaseRepository {
  apiBaseUrl: string
  apiKey: string

  constructor(options: BaseOptions) {
    this.apiKey = options.apiKey
    this.apiBaseUrl = options.apiBaseUrl + (options.apiVersion || '/api/v1')
  }

  apiConfig(): Configuration {
    return new Configuration({
      basePath: this.apiBaseUrl,
      accessToken: this.apiKey,
      baseOptions: {
        headers: {
          'User-Agent': `growthbook-cli/${env.npm_package_version}`,
        },
      },
    })
  }
}

export type Pagination = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  hasMore: boolean;
  nextOffset: number | null;
}
