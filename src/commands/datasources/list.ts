import {Command, Flags} from '@oclif/core'
import {baseGrowthBookCliFlags, paginationCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {DataSourcesRepository} from '../../repositories/data-sources.repository'

export default class DatasourcesList extends Command {
  static description = 'Get all data sources'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    ...paginationCliFlags,
    project: Flags.string({
      description: 'Project ID filter',
      required: false,
    }),
  }

  static args = {}

  async run(): Promise<void> {
    const {
      flags: {
        profile,
        apiBaseUrl,
        limit,
        offset,
        project,
      },
    } = await this.parse(DatasourcesList)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const dataSourcesRepo = new DataSourcesRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })

    const dataSources = await dataSourcesRepo.listDataSources(limit, offset, project)

    this.logJson(dataSources)
  }
}
