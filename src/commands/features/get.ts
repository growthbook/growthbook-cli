import {Args, Command} from '@oclif/core'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {FeaturesRepository} from '../../repositories/features.repository'

export default class FeaturesGet extends Command {
  static description = 'Get a feature by key'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
  }

  static args = {
    featureKey: Args.string({
      description: 'Feature key',
      required: true,
    }),
  }

  public async run(): Promise<void> {
    const {
      args: {
        featureKey,
      },
      flags: {
        profile,
        apiBaseUrl,
      },
    } = await this.parse(FeaturesGet)

    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const featuresRepo = new FeaturesRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const feature = await featuresRepo.getFeature(featureKey)

    this.logJson(feature)
  }
}
