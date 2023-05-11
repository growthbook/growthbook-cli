import {Args, Command, Flags} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {ExperimentsRepository} from '../../repositories/experiments.repository'

export default class ExperimentsResults extends Command {
  static description = 'Get results for an experiment with optional phase and dimension filtering'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    dimension: Flags.string({
      required: false,
    }),
    phase: Flags.string({
      required: false,
    }),
  }

  static args = {
    experimentId: Args.string({
      description: 'ID of the experiment',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const {
      args: {
        experimentId,
      },
      flags: {
        profile,
        apiBaseUrl,
        dimension,
        phase,
      },
    } = await this.parse(ExperimentsResults)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const experimentsRepo = new ExperimentsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const results = await experimentsRepo.getExperimentResults({
      dimension,
      phase,
      id: experimentId,
    })

    this.logJson(results)
  }
}
