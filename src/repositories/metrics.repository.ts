import {BaseApiRepository, BaseRepository} from './base.repository'
import {Metric, MetricsApi} from '../generated/api'

export class MetricsRepository extends BaseRepository implements BaseApiRepository<MetricsApi> {
  public async getMetric(id: string): Promise<Metric> {
    const metricsApi = this.api()
    const result = await metricsApi.getMetric(id)

    return result.data.metric
  }

  api(): MetricsApi  {
    return new MetricsApi(this.apiConfig())
  }
}
