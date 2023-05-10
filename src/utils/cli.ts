import * as chalk from 'chalk'
import {Flags} from '@oclif/core'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from './constants'

/**
 * Green checkmark to be used with ux.action.stop(checkmark) for nicer feedback UI
 */
export const checkmark = chalk.green('✔')

export const TRUTHY_VALUES = [1, '1', 'true', 'on']
export const FALSY_VALUES = [0, '0', 'false', 'off']

/**
 * Defaults to false if the value cannot be parsed as true
 * @param  value {string | number}
 * @return boolean value or null
 */
export const parseBooleanFromString = (value: string | number): boolean | null => {
  if (TRUTHY_VALUES.includes(value.toString().toLowerCase())) return true
  if (FALSY_VALUES.includes(value.toString().toLowerCase())) return false

  return null
}

/**
 * Base GrowthBook CLI flags for adding support for configurations.
 */
export const baseGrowthBookCliFlags = {
  apiBaseUrl: Flags.string({
    char: 'u',
    description: `Your GrowthBook instance base URL (e.g. http://localhost:3100, default: ${DEFAULT_GROWTHBOOK_BASE_URL})`,
    required: false,
    default: DEFAULT_GROWTHBOOK_BASE_URL,
  }),
  profile: Flags.string({
    char: 'p',
    description: `Optional profile (for projects that use multiple GrowthBook instances) default: ${DEFAULT_GROWTHBOOK_PROFILE})`,
    default: DEFAULT_GROWTHBOOK_PROFILE,
    required: false,
  }),
}
