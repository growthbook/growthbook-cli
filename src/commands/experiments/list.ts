import {Command, Flags} from '@oclif/core'
import {baseGrowthBookCliFlags, paginationCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {ExperimentsRepository} from '../../repositories/experiments.repository'

export default class ExperimentsList extends Command {
  static description = 'Get all experiments'

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
    datasource: Flags.string({
      description: 'Datasource ID filter',
      required: false,
    }),
    experiment: Flags.string({
      description: 'Filter the returned list by the experiment tracking key (id)',
      required: false,
    }),
  }

  static args = {}

  async run(): Promise<void> {
    const {
      flags: {
        profile,
        apiBaseUrl,
        offset,
        limit,
        experiment,
        project,
        datasource,
      },
    } = await this.parse(ExperimentsList)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const experimentsRepo = new ExperimentsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const experiments = await experimentsRepo.listExperiments({
      limit,
      offset,
      projectId: project,
      datasourceId: datasource,
      experimentId: experiment,
    })

    this.logJson(experiments)
  }
}
