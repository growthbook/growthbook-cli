import {BaseApiRepository, BaseRepository, Pagination} from './base.repository'
import {Segment, SegmentsApi} from '../generated/api'
import {AxiosResponse} from 'axios'

export class SegmentsRepository extends BaseRepository implements BaseApiRepository<SegmentsApi> {
  public async getSegment(id: string): Promise<Segment> {
    const api = this.api()
    const result = await api.getSegment(id)

    return result.data.segment
  }

  public async listSegments(limit: number, offset: number, dataSourceId?: string): Promise<ListSegmentsResponse> {
    const api = this.api()
    const result: AxiosResponse<ListSegmentsResponse> = await api.listSegments(limit, offset, dataSourceId)

    return result.data
  }

  api(): SegmentsApi  {
    return new SegmentsApi(this.apiConfig())
  }
}

type ListSegmentsResponse = Pagination & {
  segments: Segment[]
}
