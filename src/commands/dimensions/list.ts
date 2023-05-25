import {Command, Flags} from '@oclif/core'
import {baseGrowthBookCliFlags, paginationCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {DimensionsRepository} from '../../repositories/dimensions.repository'

export default class DimensionsList extends Command {
  static description = 'Get all dimensions used during experiment analysis'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    ...paginationCliFlags,
    dataSourceId: Flags.string({
      description: 'Data source ID to filter by',
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
        dataSourceId,
      },
    } = await this.parse(DimensionsList)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const repo = new DimensionsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })

    const dimensions = await repo.listDimensions(limit, offset, dataSourceId)

    this.logJson(dimensions)
  }
}
