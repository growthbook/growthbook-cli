import {Command, Flags} from '@oclif/core'
import {baseGrowthBookCliFlags, paginationCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {SegmentsRepository} from '../../repositories/segments.repository'

export default class SegmentsList extends Command {
  static description = 'Get all segments used during experiment analysis'

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
    } = await this.parse(SegmentsList)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const repo = new SegmentsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })

    const segments = await repo.listSegments(limit, offset, dataSourceId)

    this.logJson(segments)
  }
}
