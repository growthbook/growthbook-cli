import {Args, Command} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {SdkConnectionsRepository} from '../../repositories/sdk-connections.repository'

export default class SdkconnectionsGet extends Command {
  static description = 'Client keys and settings for connecting SDKs to a GrowthBook instance'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
  }

  static args = {
    id: Args.string({
      description: 'SDK connection ID',
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
    } = await this.parse(SdkconnectionsGet)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const repo = new SdkConnectionsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const connection = await repo.getSdkConnection(id)

    this.logJson(connection)
  }
}
