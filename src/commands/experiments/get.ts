import {Args, Command} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {ExperimentsRepository} from '../../repositories/experiments.repository'

export default class ExperimentsGet extends Command {
  static description = 'Get a single experiment by ID'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
  }

  static args = {
    id: Args.string({
      description: 'Experiment ID',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const {
      args: {
        id,
      },
      flags: {
        profile,
        apiBaseUrl,
      },
    } = await this.parse(ExperimentsGet)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const experimentsRepo = new ExperimentsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const experiment = await experimentsRepo.getExperiment(id)

    this.logJson(experiment)
  }
}
