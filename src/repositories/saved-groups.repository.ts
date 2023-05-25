import {BaseApiRepository, BaseRepository, Pagination} from './base.repository'
import {DeleteSavedGroup200Response, SavedGroup, SavedGroupsApi} from '../generated/api'
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

  public async deleteSavedGroup(id: string): Promise<DeleteSavedGroup200Response> {
    const api = this.api()
    const result = await api.deleteSavedGroup(id)

    return result.data
  }

  api(): SavedGroupsApi  {
    return new SavedGroupsApi(this.apiConfig())
  }
}

type ListSavedGroups = Pagination & {
  savedGroups: SavedGroup[]
}
