import {Command, Flags} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {VisualChangesetsRepository} from '../../repositories/visual-changesets.repository'

export default class VcsList extends Command {
  static description = 'List Visual Changesets created in the visual editor'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    experiment: Flags.string({
      char: 'e',
      description: 'Filter by experiment',
      required: true,
    }),
  }

  static args = {}

  async run(): Promise<void> {
    const {
      flags: {
        profile,
        apiBaseUrl,
        experiment,
      },
    } = await this.parse(VcsList)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const repo = new VisualChangesetsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const visualChangesets = await repo.listVisualChangesets(experiment)

    this.logJson(visualChangesets)
  }
}
