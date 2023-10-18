import {BaseApiRepository, BaseRepository, Pagination} from './base.repository'
import {
  PostSavedGroupRequest,
  SavedGroup,
  SavedGroupsApi,
  UpdateSavedGroupRequest,
} from '../generated/api'
import {AxiosResponse} from 'axios'

export class SavedGroupsRepository extends BaseRepository implements BaseApiRepository<SavedGroupsApi> {
  public async getSavedGroup(id: string): Promise<SavedGroup> {
    const api = this.api()
    const result = await api.getSavedGroup(id)

    return result.data.savedGroup
  }

  public async listSavedGroups(limit: number, offset: number): Promise<ListSavedGroups> {
    const api = this.api()
    const result: AxiosResponse<ListSavedGroups> = await api.listSavedGroups(limit, offset)

    return result.data
  }

  public async createSavedGroup(payload: PostSavedGroupRequest): Promise<SavedGroup> {
    const api = this.api()
    const result = await api.postSavedGroup(payload)

    return result.data.savedGroup
  }

  public async updateSavedGroup(id: string, payload: UpdateSavedGroupRequest): Promise<SavedGroup> {
    const api = this.api()
    const result = await api.updateSavedGroup(id, payload)

    return result.data.savedGroup
  }

  api(): SavedGroupsApi  {
    return new SavedGroupsApi(this.apiConfig())
  }
}

type ListSavedGroups = Pagination & {
  savedGroups: SavedGroup[]
}
