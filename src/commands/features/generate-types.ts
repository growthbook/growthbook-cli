import {Command} from '@oclif/core'
import {getGrowthBookConfig} from '../../utils/config'

export default class GenerateTypes  extends Command {
  static description = 'Generate TypeScript types for all your features'

  static examples = []

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    const config = getGrowthBookConfig('default')
    if (!config) {
      this.error('Invalid GrowthBook config. Configure the CLI with the following command:\n\n $ growthbook auth login')
    }

    this.log('We have config!', config.apiKey)

    // TODO: Make an API request.
    // TODO: Handle pagination
    // TODO: Generate types
    // TODO: Put the file somewhere
  }
}
