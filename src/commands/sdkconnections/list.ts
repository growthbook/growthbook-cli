import {Command, Flags} from '@oclif/core'
import {baseGrowthBookCliFlags, paginationCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {SdkConnectionsRepository} from '../../repositories/sdk-connections.repository'

export default class SdkconnectionsList extends Command {
  static description = 'Client keys and settings for connecting SDKs to a GrowthBook instance'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    ...paginationCliFlags,
    projectId: Flags.string({
      description: 'Project ID to filter by',
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
        projectId,
      },
    } = await this.parse(SdkconnectionsList)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const repo = new SdkConnectionsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const connections = await repo.listSdkConnections(limit, offset, projectId)

    this.logJson(connections)
  }
}
