import {BaseApiRepository, BaseRepository, Pagination} from './base.repository'
import {DataSource, DataSourcesApi} from '../generated/api'
import {AxiosResponse} from 'axios'

export class DataSourcesRepository extends BaseRepository implements BaseApiRepository<DataSourcesApi> {
  public async getDataSource(id: string): Promise<DataSource> {
    const dataSourcesApi = this.api()
    const result = await dataSourcesApi.getDataSource(id)

    return result.data.dataSource
  }

  public async listDataSources(limit: number, offset: number, projectId?: string): Promise<ListDataSourcesResponse> {
    const dataSourcesApi = this.api()
    const result: AxiosResponse<ListDataSourcesResponse> = await dataSourcesApi.listDataSources(limit, offset, projectId)

    return result.data
  }

  api(): DataSourcesApi  {
    return new DataSourcesApi(this.apiConfig())
  }
}

type ListDataSourcesResponse = Pagination & {
  dataSources: DataSource[]
}
