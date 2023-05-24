import {Command} from '@oclif/core'
import {baseGrowthBookCliFlags, paginationCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {ProjectsRepository} from '../../repositories/projects.repository'

export default class ProjectsList extends Command {
  static description = 'List all projects'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    ...paginationCliFlags,
  }

  static args = {}

  async run(): Promise<void> {
    const {
      flags: {
        profile,
        apiBaseUrl,
        limit,
        offset,
      },
    } = await this.parse(ProjectsList)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const projectsRepo = new ProjectsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const projects = await projectsRepo.listProjects(limit, offset)

    this.logJson(projects)
  }
}
