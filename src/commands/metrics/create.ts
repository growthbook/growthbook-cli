import * as Fs from 'node:fs'
import {Args, Command, ux} from '@oclif/core'
import {baseGrowthBookCliFlags, fileInputOutputCliFlags, Icons} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {MetricsRepository} from '../../repositories/metrics.repository'
import {PostMetricRequest} from '../../generated/api'
import {errorStringFromResponse} from '../../utils/http'

export default class MetricsCreate extends Command {
  static description = 'Create a metric from file or standard in'

  static examples = [
    'cat my-metric.json | <%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --filePath my-metric.json',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    ...fileInputOutputCliFlags,
  }

  static args = {
    input: Args.string({
      description: 'JSON payload of the metric to be created. Docs: https://docs.growthbook.io/api/#tag/metrics/operation/postMetric',
      required: false,
    }),
  }

  async run(): Promise<void> {
    const {
      args: {
        input,
      },
      flags: {
        profile,
        apiBaseUrl,
        filePath,
        output,
      },
    } = await this.parse(MetricsCreate)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    // Read payload from standard in
    let payload = input
    // If no input from standard in, try the filePath (if provided)
    if (!input && filePath) {
      payload = Fs.readFileSync(filePath, 'utf-8')
    }

    // If no payload from file, prompt for input
    if (!payload) {
      payload = await ux.prompt('Paste the metric payload', {
        required: true,
      })
    }

    let parsedPayload: unknown = null
    try {
      parsedPayload = JSON.parse(payload)
    } catch {
      this.error('Unable to parse payload')
    }

    ux.action.start('Posting parsed payload')
    this.logJson(parsedPayload)

    const metricsRepo = new MetricsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })

    try {
      // Create the metric
      const createdMetric = await metricsRepo.createMetric(parsedPayload as PostMetricRequest)
      this.logJson(createdMetric)
      ux.action.stop(`${Icons.checkmark} Successfully created metric ${createdMetric.id}`)

      // If provided an output path, write to file
      if (output) {
        const outputContents = JSON.stringify(createdMetric, null, 2)
        ux.action.start('Writing created metric to file')

        try {
          Fs.writeFileSync(output, outputContents)
          ux.action.stop(`${Icons.checkmark} Output created metric to ${output}`)
        } catch (error) {
          this.error(`${error}`)
          ux.action.stop(`${Icons.xSymbol} Failed to write metric output to file path ${output}`)
        }
      }
    } catch (error) {
      this.error(errorStringFromResponse(error))
      ux.action.stop(`${Icons.xSymbol} Failed to create metric`)
    }
  }
}
