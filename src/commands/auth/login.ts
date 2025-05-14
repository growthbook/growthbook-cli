import {Command, Flags, ux} from '@oclif/core'
import * as Fs from 'node:fs'
import * as toml from '@iarna/toml'
import {getGrowthBookConfigDirectory, getGrowthBookConfigFilePath} from '../../utils/file'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {baseGrowthBookCliFlags, Icons} from '../../utils/cli'

export default class Login extends Command {
  static description = 'Configure your API key with the GrowthBook SDK with your project'

  static examples = []

  static flags = {
    ...baseGrowthBookCliFlags,
    apiKey: Flags.string({
      char: 'k',
      description: 'Your GrowthBook secret API Key',
      required: false,
    }),
  }

  static args = {}

  async run(): Promise<void> {
    const {flags: {
      apiKey: apiKeyFlag,
      profile: profileFlag,
      apiBaseUrl: apiBaseUrlFlag,
    }} = await this.parse(Login)

    let apiKey = apiKeyFlag
    let profile = profileFlag
    let apiBaseUrl = apiBaseUrlFlag

    if (!apiKey) {
      apiKey = await ux.prompt('What is your GrowthBook secret API Key?', {
        type: 'hide',
        required: true,
      })
      if (!apiKey) {
        this.error(`${Icons.xSymbol} You must provide a GrowthBook secret API key to continue`)
      }
    }

    if (!profile) {
      profile = await ux.prompt(`What is the name of this profile? You can leave this blank (default: ${DEFAULT_GROWTHBOOK_PROFILE})`, {
        required: false,
      })
      if (!profile) {
        profile = DEFAULT_GROWTHBOOK_PROFILE
      }
    }

    if (!apiBaseUrl) {
      apiBaseUrl = await ux.prompt(`What is the API base URL of the GrowthBook instance? If using GrowthBook cloud, you can leave this blank (e.g. http://localhost:3100, default: ${DEFAULT_GROWTHBOOK_BASE_URL})`, {
        required: false,
      })
      if (!apiBaseUrl) {
        apiBaseUrl = DEFAULT_GROWTHBOOK_BASE_URL
      }
    }

    this.writeApiKeyToGrowthBookConfig(apiKey, profile, apiBaseUrl)
  }

  /**
   * Writes the API key to the config file. Will throw errors if it cannot read or write to the file
   * @param {string} apiKey The GrowthBook secret
   * @param {string} profile The profile to write in the config
   * @param {string} apiBaseUrl The base URL of the GrowthBook API
   * @return void
   */
  private writeApiKeyToGrowthBookConfig(apiKey: string, profile: string, apiBaseUrl: string): void {
    const configText = this.getGrowthBookConfigFileContents()
    const config = toml.parse(configText)

    if (config[profile]) {
      this.log(`Overwriting existing configuration for the '${profile}' profile`)
    }

    config[profile] = {
      growthbook_secret: apiKey,
      api_base_url: apiBaseUrl,
    }

    const stringified = toml.stringify(config)

    this.writeConfigFile(stringified)
  }

  /**
   * Finds the GrowthBook config.toml file in ~/.growthbook/config.toml
   * If the directory doesn't exist, it will be created.
   * If the directory cannot be created, the program will exit.
   * @returns {string} Contents of the config.toml file or an empty string
   */
  private getGrowthBookConfigFileContents(): string {
    const growthBookDirectory = getGrowthBookConfigDirectory()

    // Create the ~/.growthbook directory if it doesn't exist
    try {
      if (!Fs.existsSync(growthBookDirectory)) {
        Fs.mkdirSync(growthBookDirectory)
        return ''
      }
    } catch (error) {
      this.error('💥 Cannot create ~/.growthbook directory \n' + error)
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
      this.error(`💥 Cannot create file ${configFilePath} \n` + error)
    }

    try {
      return Fs.readFileSync(configFilePath, 'utf-8')
    } catch (error) {
      this.error(`💥 Cannot read file ${configFilePath} \n` + error)
    }
  }

  private writeConfigFile(fileContents: string) {
    const configFilePath = getGrowthBookConfigFilePath()
    try {
      Fs.writeFileSync(configFilePath, fileContents)

      this.log(`The GrowthBook config has been written at ~/.growthbook/config.toml ${Icons.checkmark}`)
    } catch (error) {
      this.error(`💥 Cannot write to file at ${configFilePath} \n` + error)
    }
  }
}
