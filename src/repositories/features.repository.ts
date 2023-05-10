import {AxiosResponse} from 'axios'
import {BaseApiRepository, BaseRepository, Pagination} from './base.repository'
import {Feature, FeaturesApi} from '../generated/api'
import {SimplifiedFeature} from '../utils/feature'

type ToggleFeatureOptions = {
  featureKey: string
  environment: string
  enabled: boolean
  reason: string
}

type ListFeaturesResponse = Pagination & {
  features: SimplifiedFeature[]
}

export class FeaturesRepository extends BaseRepository implements BaseApiRepository<FeaturesApi> {
  public async getFeature(featureKey: string): Promise<Feature> {
    const featuresApi = this.api()
    const result = await featuresApi.getFeature(featureKey)

    return result.data.feature
  }

  public async listFeatures(limit: number, offset: number, projectId?: string): Promise<ListFeaturesResponse> {
    const featuresApi = this.api()
    const result: AxiosResponse<ListFeaturesResponse> = await featuresApi.listFeatures(limit, offset, projectId)

    return result.data
  }

  public async toggleFeature({
    enabled,
    reason,
    featureKey,
    environment,
  }: ToggleFeatureOptions): Promise<Feature> {
    const featuresApi = this.api()
    const result = await featuresApi.toggleFeature(featureKey, {
      reason,
      environments: {
        [environment]: enabled,
      },
    })

    return result.data.feature
  }

  api(): FeaturesApi {
    return new FeaturesApi(this.apiConfig())
  }
}
