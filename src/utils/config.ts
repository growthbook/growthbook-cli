import * as Fs from 'node:fs'
import * as toml from '@iarna/toml'
import {getGrowthBookConfigFilePath} from './file'

export type GrowthBookCLIConfig = {
  apiKey: string
}

export type GrowthBookTomlProfile = {
  growthbook_secret: string
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

    return {
      apiKey,
    }
  } catch {
    return null
  }
}
