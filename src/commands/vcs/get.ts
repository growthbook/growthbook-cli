import {Args, Command, Flags} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {VisualChangesetsRepository} from '../../repositories/visual-changesets.repository'

export default class VcsGet extends Command {
  static description = 'Get a Visual Changeset created in the visual editor'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    includeExperiment: Flags.integer({
      char: 'e',
      description: 'Include the associated experiment in payload',
      options: ['0', '1'],
      default: 0,
      required: false,
    }),
  }

  static args = {
    id: Args.string({
      description: 'Visual Changeset ID',
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
        includeExperiment,
      },
    } = await this.parse(VcsGet)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const repo = new VisualChangesetsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })

    const visualChangeset = await repo.getVisualChangeset(id, includeExperiment)

    this.logJson(visualChangeset)
  }
}
