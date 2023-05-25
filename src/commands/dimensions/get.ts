import {Args, Command} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {DimensionsRepository} from '../../repositories/dimensions.repository'

export default class DimensionsGet extends Command {
  static description = 'Get a single dimension used during experiment analysis'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
  }

  static args = {
    id: Args.string({
      description: 'Dimension ID',
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
    } = await this.parse(DimensionsGet)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const repo = new DimensionsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const dimension = await repo.getDimension(id)

    this.logJson(dimension)
  }
}
