import {Args, Command} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {SegmentsRepository} from '../../repositories/segments.repository'

export default class SegmentsGet extends Command {
  static description = 'Get a single segment used during experiment analysis'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
  }

  static args = {
    id: Args.string({
      description: 'Segment ID',
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
    } = await this.parse(SegmentsGet)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const repo = new SegmentsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const segment = await repo.getSegment(id)

    this.logJson(segment)
  }
}
