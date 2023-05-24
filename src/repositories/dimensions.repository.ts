import {BaseApiRepository, BaseRepository, Pagination} from './base.repository'
import {Dimension, DimensionsApi} from '../generated/api'
import {AxiosResponse} from 'axios'

export class DimensionsRepository extends BaseRepository implements BaseApiRepository<DimensionsApi> {
  public async getDimension(id: string): Promise<Dimension> {
    const api = this.api()
    const result = await api.getDimension(id)

    return result.data.dimension
  }

  public async listDimensions(limit: number, offset: number, dataSourceId?: string): Promise<ListDimensionsResponse> {
    const api = this.api()
    const result: AxiosResponse<ListDimensionsResponse> = await api.listDimensions(limit, offset, dataSourceId)

    return result.data
  }

  api(): DimensionsApi  {
    return new DimensionsApi(this.apiConfig())
  }
}

type ListDimensionsResponse = Pagination & {
  dimensions: Dimension[]
}
