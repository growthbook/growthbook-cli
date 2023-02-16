import {Command} from '@oclif/core'
import * as Fs from 'node:fs'
import {getGrowthBookConfigFilePath} from '../../utils/file'

export default class Logout  extends Command {
  static description = 'Removes all of the GrowthBook API key configurations'

  static examples = []

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.writeBlankFileToGrowthBookConfig()
  }

  private writeBlankFileToGrowthBookConfig() {
    const configFilePath = getGrowthBookConfigFilePath()

    try {
      Fs.writeFileSync(configFilePath, '')

      this.log('The GrowthBook config has been removed from ~/.growthbook/config.toml')
    } catch (error) {
      this.error(`💥 Cannot write to file at ${configFilePath}. It may not exist or there may be insufficient permissions. \n` + error)
    }
  }
}
