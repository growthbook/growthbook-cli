import * as chalk from 'chalk'

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
