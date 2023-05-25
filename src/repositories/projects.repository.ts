import {BaseApiRepository, BaseRepository, Pagination} from './base.repository'
import {Project, ProjectsApi} from '../generated/api'
import {AxiosResponse} from 'axios'

export class ProjectsRepository extends BaseRepository implements BaseApiRepository<ProjectsApi> {
  public async getProject(id: string): Promise<Project> {
    const api = this.api()
    const result = await api.getProject(id)

    return result.data.project
  }

  public async listProjects(limit: number, offset: number): Promise<ListProjectsResponse> {
    const api = this.api()
    const result: AxiosResponse<ListProjectsResponse> = await api.listProjects(limit, offset)

    return result.data
  }

  api(): ProjectsApi  {
    return new ProjectsApi(this.apiConfig())
  }
}

type ListProjectsResponse = Pagination & {
  projects: Project[]
}
