import {Command, Flags} from '@oclif/core'
import * as Fs from 'node:fs'
import {Environment} from '../../utils/environment'

export default class Login  extends Command {
  static description = 'Configure the GrowthBook SDK with your project'

  static examples = []

  static flags = {
    apiKey: Flags.string({
      char: 'k',
      description: 'Your GrowthBook Secret API Key',
      required: true,
    }),
  }

  static args = {}

  async run(): Promise<void> {
    const {flags: {apiKey}} = await this.parse(Login)

    const config = this.getGrowthBookConfigFileContents()

    // this.log('config', config)

    // this.log('hello from command login', apiKey)

    // this.log(`Run the following command for details: \n $ growthbook ${this.id} --help`)
  }

  private getGrowthBookConfigFileContents(): string {
    const homeDirectory = Environment.getHomeDirectory()
    const growthBookDirectory = homeDirectory + '/.growthbook'

    if (!Fs.existsSync(growthBookDirectory)) {
      Fs.mkdirSync(growthBookDirectory)
    }

    return 'foo'
  }
}
