import {Command, Flags, ux} from '@oclif/core'
import * as Fs from 'node:fs'
import * as toml from '@iarna/toml'
import {getGrowthBookConfigFilePath} from '../../utils/file'
import {getGrowthBookConfigToml} from '../../utils/config'
import {Icons} from '../../utils/cli'

export default class Logout extends Command {
  static description = 'Removes GrowthBook API key configurations'

  static examples = []

  static flags = {
    profile: Flags.string({
      char: 'p',
      description: 'Optional profile (for projects that use multiple GrowthBook instances or organizations) (default: all profiles)',
      required: false,
    }),
  }

  static args = {}

  async run(): Promise<void> {
    const {flags: {
      profile,
    }} = await this.parse(Logout)

    if (profile) {
      // Log out of only one specific profile
      this.logOutOfProfile(profile)
    } else {
      // Log out of all profiles
      this.writeBlankFileToGrowthBookConfig()
    }
  }

  /**
   * Removes all profiles
   * @return void
   */
  private writeBlankFileToGrowthBookConfig() {
    ux.action.start('Removing all GrowthBook profiles from ~/.growthbook/config.toml')

    const configFilePath = getGrowthBookConfigFilePath()

    try {
      Fs.writeFileSync(configFilePath, '')

      ux.action.stop(Icons.checkmark)
    } catch (error) {
      this.error(`💥 Cannot write to file at ${configFilePath}. It may not exist or there may be insufficient permissions. \n` + error)
    }
  }

  /**
   * Removes only specified profile
   * @param profile Named profile
   * @return void
   */
  private logOutOfProfile(profile: string) {
    ux.action.start(`Removing config for profile '${profile}' from ~/.growthbook/config.toml'`)

    const configText = getGrowthBookConfigToml()
    const config = toml.parse(configText)

    delete config[profile]

    const configFilePath = getGrowthBookConfigFilePath()
    const stringified = toml.stringify(config)

    try {
      Fs.writeFileSync(configFilePath, stringified)

      ux.action.stop(Icons.checkmark)
    } catch (error) {
      this.error(`💥 Cannot write to file at ${configFilePath}. It may not exist or there may be insufficient permissions. \n` + error)
    }
  }
}
