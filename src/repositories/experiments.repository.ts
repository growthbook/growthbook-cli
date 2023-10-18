import {BaseApiRepository, BaseRepository, Pagination} from './base.repository'
import {Experiment, ExperimentsApi, GetExperimentResults200Response, UpdateExperimentRequest} from '../generated/api'
import {AxiosResponse} from 'axios'

export class ExperimentsRepository extends BaseRepository implements BaseApiRepository<ExperimentsApi> {
  public async getExperiment(id: string): Promise<Experiment> {
    const experimentsApi = this.api()
    const result = await experimentsApi.getExperiment(id)

    return result.data.experiment
  }

  public async listExperiments({
    limit,
    offset,
    projectId,
    datasourceId,
    experimentId,
  }: ListExperimentsOptions): Promise<ListExperimentsResponse> {
    const experimentsApi = this.api()
    const result: AxiosResponse<ListExperimentsResponse> = await experimentsApi.listExperiments(
      limit,
      offset,
      projectId,
      datasourceId,
      experimentId,
    )

    return result.data
  }

  public async getExperimentResults({
    id,
    dimension,
    phase,
  }: GetExperimentResultsOptions): Promise<GetExperimentResults200Response> {
    const experimentsApi = this.api()
    const result = await experimentsApi.getExperimentResults(id, phase, dimension)

    return result.data
  }

  public async updateExperiment(id: string, payload: UpdateExperimentRequest): Promise<Experiment> {
    const api = this.api()
    const result = await api.updateExperiment(id, payload)

    return result.data.experiment
  }

  api(): ExperimentsApi  {
    return new ExperimentsApi(this.apiConfig())
  }
}

type ListExperimentsOptions = {
  limit: number
  offset: number
  projectId?: string
  datasourceId?: string
  experimentId?: string
}

type ListExperimentsResponse = Pagination & {
  experiments: Experiment[]
}

type GetExperimentResultsOptions = {
  id: string
  phase?: string
  dimension?: string
}

