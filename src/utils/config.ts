import * as Fs from 'node:fs'
import * as toml from '@iarna/toml'
import {Command} from '@oclif/core'
import {getGrowthBookConfigFilePath} from './file'
import {
  DEFAULT_GROWTHBOOK_BASE_URL,
  DEFAULT_GROWTHBOOK_PROFILE,
} from './constants'

export type GrowthBookCLIConfig = {
  apiKey: string
  apiBaseUrl: string
}

export type GrowthBookTomlProfile = {
  growthbook_secret: string
  api_base_url: string
}

/**
 * Get the text content of the config file.
 * @return {string} String contents of the config file or an empty string
 */
export function getGrowthBookConfigToml(): string {
  try {
    const filePath = getGrowthBookConfigFilePath()

    return Fs.readFileSync(filePath, 'utf-8')
  } catch {
    return ''
  }
}

/**
 * Gets a valid GrowthBook config or null
 * @param {string} profileKey The desired profile in the GrowthBook config
 * @return {GrowthBookCLIConfig | null} Valid GrowthBook config. If no valid config found, this will be null.
 */
export function getGrowthBookProfileConfig(profileKey: string): GrowthBookCLIConfig | null {
  try {
    const filePath = getGrowthBookConfigFilePath()

    const configText = Fs.readFileSync(filePath, 'utf-8')
    const config = toml.parse(configText)

    const profile = config[profileKey] as GrowthBookTomlProfile | undefined
    if (!profile) {
      return null
    }

    const apiKey = profile.growthbook_secret
    if (!apiKey) {
      return null
    }

    let apiBaseUrl = profile.api_base_url
    if (!apiBaseUrl) {
      apiBaseUrl = DEFAULT_GROWTHBOOK_BASE_URL
    }

    return {
      apiKey,
      apiBaseUrl,
    }
  } catch {
    return null
  }
}

/**
 * Will return do standard configuration missing messaging if there's an error calling {@link getGrowthBookProfileConfig}
 * @param profileKey {string}
 * @param command {Command}
 * @return {GrowthBookCLIConfig | null} Valid GrowthBook config. If no valid config found, this will be null but the application would display an error and exit.
 */
export function getGrowthBookProfileConfigAndThrowForCommand(profileKey: string, command: Command): GrowthBookCLIConfig | never {
  const config = getGrowthBookProfileConfig(profileKey)
  if (!config) {
    if (profileKey === DEFAULT_GROWTHBOOK_PROFILE) {
      // Default profile
      command.error('💥 Invalid GrowthBook config. Configure the CLI with the following command:\n\n $ growthbook auth login')
    } else {
      // User is trying to use a custom profile
      command.error(`💥 Cannot find config for profile '${profileKey}'. Configure the CLI with the following command:\n\n $ growthbook auth login`)
    }
  }

  return config
}
