import {BaseApiRepository, BaseRepository} from './base.repository'
import {GetVisualChangeset200Response, VisualChangeset, VisualChangesetsApi} from '../generated/api'
import {AxiosResponse} from 'axios'

export class VisualChangesetsRepository extends BaseRepository implements BaseApiRepository<VisualChangesetsApi> {
  public async getVisualChangeset(id: string, includeExperiment?: number): Promise<GetVisualChangeset200Response> {
    const api = this.api()
    const result = await api.getVisualChangeset(id, includeExperiment)

    return result.data
  }

  public async listVisualChangesets(experimentId: string): Promise<ListVisualChangesetsResponse> {
    const api = this.api()
    const result = await api.listVisualChangesets(experimentId) as unknown as AxiosResponse<ListVisualChangesetsResponse>

    return result.data
  }

  api(): VisualChangesetsApi  {
    return new VisualChangesetsApi(this.apiConfig())
  }
}

type ListVisualChangesetsResponse = {
  visualChangesets: VisualChangeset[]
}
