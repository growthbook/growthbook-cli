import {BaseApiRepository, BaseRepository} from './base.repository'
import {Experiment, ExperimentsApi} from '../generated/api'

export class ExperimentsRepository extends BaseRepository implements BaseApiRepository<ExperimentsApi> {
  public async getExperiment(id: string): Promise<Experiment> {
    const experimentsApi = this.api()
    const result = await experimentsApi.getExperiment(id)

    return result.data.experiment
  }

  api(): ExperimentsApi  {
    return new ExperimentsApi(this.apiConfig())
  }
}
