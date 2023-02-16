import {Command, Flags} from '@oclif/core'
import {getGrowthBookConfig} from '../../utils/config'
import {fetchAllPaginatedFeatures, SimpleFeatureResponse} from '../../utils/http'
import {getCompiledTypeScriptTemplateForFeatures} from '../../utils/templating'

const DEFAULT_GROWTHBOOK_BASE_URL = 'https://api.growthbook.io'

export default class GenerateTypes  extends Command {
  static description = 'Generate TypeScript types for all your features'

  static examples = []

  static flags = {
    apiBaseUrl: Flags.string({
      char: 'u',
      description: `Your GrowthBook instance base URL (e.g. http://localhost:3100, default: ${DEFAULT_GROWTHBOOK_BASE_URL})`,
      required: false,
    }),
  }

  static args = {}

  async run(): Promise<void> {
    const {flags: {
      apiBaseUrl = DEFAULT_GROWTHBOOK_BASE_URL,
    }} = await this.parse(GenerateTypes)

    const config = getGrowthBookConfig('default')
    if (!config) {
      this.error('Invalid GrowthBook config. Configure the CLI with the following command:\n\n $ growthbook auth login')
    }

    const {apiKey} = config

    try {
      const features: SimpleFeatureResponse = await fetchAllPaginatedFeatures(apiBaseUrl, apiKey)
      const output = getCompiledTypeScriptTemplateForFeatures(features)

      this.log('TypeScript???', output)

      // TODO: Put the file somewhere
    } catch (error) {
      this.error('There was an error fetching the features' + error)
    }
  }
}
