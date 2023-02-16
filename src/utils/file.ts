import {Environment} from './environment'

export function getGrowthBookConfigDirectory(): string {
  const homeDirectory = Environment.getHomeDirectory()
  return homeDirectory + '/.growthbook'
}

export function getGrowthBookConfigFilePath(): string {
  const growthBookDirectory = getGrowthBookConfigDirectory()
  return growthBookDirectory + '/config.toml'
}
