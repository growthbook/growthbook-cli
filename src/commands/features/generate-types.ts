import * as Fs from 'node:fs'
import * as Path from 'node:path'
import {Command, Flags, ux} from '@oclif/core'
import {getGrowthBookProfileConfig} from '../../utils/config'
import {fetchAllPaginatedFeatures, SimpleFeatureResponse} from '../../utils/http'
import {getCompiledTypeScriptTemplateForFeatures} from '../../utils/templating'
import {
  DEFAULT_GROWTHBOOK_BASE_URL,
  DEFAULT_GROWTHBOOK_PROFILE, DEFAULT_GROWTHBOOK_TYPES_DESTINATION,
  GROWTHBOOK_APP_FEATURES_FILENAME,
} from '../../utils/constants'
import {checkmark} from '../../utils/cli'

export default class GenerateTypes extends Command {
  static description = 'Generate TypeScript types for all your features'

  static examples = []

  static flags = {
    apiBaseUrl: Flags.string({
      char: 'u',
      description: `Your GrowthBook instance base URL (e.g. http://localhost:3100, default: ${DEFAULT_GROWTHBOOK_BASE_URL})`,
      required: false,
    }),
    output: Flags.string({
      char: 'o',
      description: `Output path for the ${GROWTHBOOK_APP_FEATURES_FILENAME} file. All directories in this path should exist. If not provided, the directory ${DEFAULT_GROWTHBOOK_TYPES_DESTINATION} will be created in the current working directory.`,
      required: false,
    }),
    profile: Flags.string({
      char: 'p',
      description: `Optional profile (for projects that use multiple GrowthBook instances) default: ${DEFAULT_GROWTHBOOK_BASE_URL})`,
      required: false,
    }),
  }

  static args = {}

  async run(): Promise<void> {
    const {flags: {
      output,
      apiBaseUrl = DEFAULT_GROWTHBOOK_BASE_URL,
      profile = DEFAULT_GROWTHBOOK_PROFILE,
    }} = await this.parse(GenerateTypes)

    ux.action.start('Getting GrowthBook config')

    const config = getGrowthBookProfileConfig(profile)
    if (!config) {
      if (profile === DEFAULT_GROWTHBOOK_PROFILE) {
        // Default profile
        this.error('💥 Invalid GrowthBook config. Configure the CLI with the following command:\n\n $ growthbook auth login')
      } else {
        // User is trying to use a custom profile
        this.error(`💥 Cannot find config for profile '${DEFAULT_GROWTHBOOK_PROFILE}'. Configure the CLI with the following command:\n\n $ growthbook auth login`)
      }
    }

    ux.action.stop(checkmark)

    const {apiKey} = config

    try {
      ux.action.start('Fetching features')

      const features: SimpleFeatureResponse = await fetchAllPaginatedFeatures(apiBaseUrl, apiKey)
      const typeScriptOutput = getCompiledTypeScriptTemplateForFeatures(features)

      ux.action.stop(checkmark)

      let outputPath = output
      if (!outputPath) {
        outputPath = Path.resolve(process.cwd(), DEFAULT_GROWTHBOOK_TYPES_DESTINATION)

        if (!Fs.existsSync(outputPath)) {
          ux.action.start('Creating output directory')

          Fs.mkdirSync(outputPath)
          Fs.writeFileSync(outputPath + '/.gitkeep', '')

          ux.action.stop(`✔ Created directory ${outputPath}`)
        }
      }

      this.writeTypeScriptFile(outputPath, typeScriptOutput)
    } catch (error) {
      this.error('💥 There was an error fetching the features' + error)
    }
  }

  private writeTypeScriptFile(outputPath: string, typeScriptContents: string) {
    ux.action.start('Writing types to disk')

    try {
      const fullyQualifiedPath = Path.resolve(process.cwd(), outputPath)

      Fs.writeFileSync(fullyQualifiedPath + '/' + GROWTHBOOK_APP_FEATURES_FILENAME, typeScriptContents)

      ux.action.stop(checkmark)
      this.log(`${checkmark} Successfully wrote TypeScript definitions to ${fullyQualifiedPath}`)
    } catch (error) {
      this.error('💥 Could not write TypeScript definition file to disk' + error)
    }
  }
}
