import {BaseApiRepository, BaseRepository, Pagination} from './base.repository'
import {SdkConnection, SdkConnectionsApi} from '../generated/api'
import {AxiosResponse} from 'axios'

export class SdkConnectionsRepository extends BaseRepository implements BaseApiRepository<SdkConnectionsApi> {
  public async getSdkConnection(id: string): Promise<SdkConnection> {
    const api = this.api()
    const result = await api.getSdkConnection(id)

    return result.data.sdkConnection
  }

  public async listSdkConnections(limit: number, offset: number, projectId?: string): Promise<ListSdkConnectionsResponse> {
    const api = this.api()
    const result: AxiosResponse<ListSdkConnectionsResponse> = await api.listSdkConnections(limit, offset, projectId)

    return result.data
  }

  api(): SdkConnectionsApi  {
    return new SdkConnectionsApi(this.apiConfig())
  }
}

type ListSdkConnectionsResponse = Pagination & {
  connections?: SdkConnection[] | undefined
}
