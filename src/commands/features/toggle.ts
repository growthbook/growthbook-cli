import {Args, Command, Flags} from '@oclif/core'
import {parseBooleanFromString} from '../../utils/cli'

export default class FeaturesToggle extends Command {
  static description = 'Toggle a feature on or off for a specific environment'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
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
    const {args} = await this.parse(FeaturesToggle)
    const {flags: {
      enabled,
      reason = '',
      environment,
    }} = await this.parse(FeaturesToggle)

    const parsedEnabled = parseBooleanFromString(enabled) || false

    this.log(`you input : ${args.featureKey} env= ${environment}, enabled = ${parsedEnabled}, reason = ${reason}`)
  }
}
