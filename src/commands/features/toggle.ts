import {Args, Command, Flags} from '@oclif/core'
import {baseGrowthBookCliFlags, Icons, parseBooleanFromString} from '../../utils/cli'
import {toggleFeature} from '../../utils/http'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'

export default class FeaturesToggle extends Command {
  static description = 'Toggle a feature on or off for a specific environment'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    environment: Flags.string({
      char: 'e',
      description: 'Environment that you would like to toggle',
      required: true,
    }),
    enabled: Flags.string({
      char: 'n',
      description: 'Enabled state of the feature',
      required: true,
      options: ['true', 'false', 'on', 'off', '1', '0'],
    }),
    reason: Flags.string({
      char: 'r',
      description: 'The reason for toggling it on',
      required: false,
    }),
  }

  static args = {
    featureKey: Args.string({
      description: 'Feature key to toggle',
      required: true,
    }),
  }

  public async run(): Promise<void> {
    const {args: {
      featureKey,
    }} = await this.parse(FeaturesToggle)
    const {flags: {
      enabled,
      reason = '',
      environment,
      profile,
      apiBaseUrl,
    }} = await this.parse(FeaturesToggle)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const config = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || config.apiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const parsedEnabled = parseBooleanFromString(enabled) || false

    const updatedFeature = await toggleFeature(baseUrlUsed, config.apiKey, {
      id: featureKey,
      reason,
      enabled: parsedEnabled,
      environment,
    })

    this.logJson(updatedFeature)
    this.log(`\n${Icons.checkmark} The feature was updated!`)
  }
}
