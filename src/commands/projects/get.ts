import {Args, Command} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {ProjectsRepository} from '../../repositories/projects.repository'

export default class ProjectsGet extends Command {
  static description = 'Get a single project by ID'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
  }

  static args = {
    projectId: Args.string({
      description: 'Project ID',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const {
      args: {
        projectId,
      },
      flags: {
        profile,
        apiBaseUrl,
      },
    } = await this.parse(ProjectsGet)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const projectsRepo = new ProjectsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const project = await projectsRepo.getProject(projectId)

    this.logJson(project)
  }
}
