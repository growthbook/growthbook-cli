import {Command, Flags} from '@oclif/core'
import * as Fs from 'node:fs'
import * as toml from '@iarna/toml'
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

    this.writeApiKeyToGrowthBookConfig(apiKey)
  }

  /**
   * Writes the API key to the config file. Will throw errors if it cannot read or write to the file
   * @param {string} apiKey The GrowthBook secret
   * @return void
   */
  private writeApiKeyToGrowthBookConfig(apiKey: string): void {
    const configText = this.getGrowthBookConfigFileContents()
    const config = toml.parse(configText)

    if (config.default) {
      this.log('Overwriting existing default configuration')
    }

    config.default = {
      growthbook_secret: apiKey,
    }

    const stringified = toml.stringify(config)

    this.writeConfigFile(stringified)
  }

  private static getGrowthBookConfigDirectory() {
    const homeDirectory = Environment.getHomeDirectory()
    return homeDirectory + '/.growthbook'
  }

  private static getGrowthBookConfigFilePath() {
    const growthBookDirectory = Login.getGrowthBookConfigDirectory()
    return growthBookDirectory + '/config.toml'
  }

  /**
   * Finds the GrowthBook config.toml file in ~/.growthbook/config.toml
   * If the directory doesn't exist, it will be created.
   * If the directory cannot be created, the program will exit.
   * @returns {string} Contents of the config.toml file or an empty string
   */
  private getGrowthBookConfigFileContents(): string {
    const growthBookDirectory = Login.getGrowthBookConfigDirectory()

    // Create the ~/.growthbook directory if it doesn't exist
    try {
      if (!Fs.existsSync(growthBookDirectory)) {
        Fs.mkdirSync(growthBookDirectory)
        return ''
      }
    } catch (error) {
      this.error('Cannot create ~/.growthbook directory \n' + error)
    }

    // Read the ~/.growthbook/config.toml file
    const configFilePath = growthBookDirectory + '/config.toml'
    try {
      if (!Fs.existsSync(configFilePath)) {
        this.log('Created ~/.growthbook/config.toml')

        Fs.writeFileSync(configFilePath, '')

        return ''
      }
    } catch (error) {
      this.error(`Cannot create file ${configFilePath} \n` + error)
    }

    try {
      return Fs.readFileSync(configFilePath, 'utf-8')
    } catch (error) {
      this.error(`Cannot read file ${configFilePath} \n` + error)
    }
  }

  private writeConfigFile(fileContents: string) {
    const configFilePath = Login.getGrowthBookConfigFilePath()
    try {
      Fs.writeFileSync(configFilePath, fileContents)

      this.log('The GrowthBook config has been written at ~/.growthbook/config.toml')
    } catch (error) {
      this.error(`Cannot read file ${configFilePath} \n` + error)
    }
  }
}
