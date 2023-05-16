import * as Fs from 'node:fs'
import {Args, Command, Flags, ux} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'

export default class MetricsCreate extends Command {
  static description = 'Create a metric from file or standard in'

  static examples = [
    'cat my-metric.json | <%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    filePath: Flags.string({
      char: 'f',
      description: 'Path to file',
      required: false,
    }),
  }

  static args = {
    input: Args.string({
      description: 'JSON payload of the metric to be created',
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

    // this.log(`Payload: ${payload}`)
    // this.log(`Input: ${input}`)
    this.logJson(parsedPayload)

    // TODO: Delete this
    this.log(`hello from command metrics:create - flags: profile = ${profileUsed}, base URL = ${baseUrlUsed}, API key = ${[...apiKey].map((c, i) => i >= 10 ? '•' : c).join('')}`)
    this.log(`Run the following command for details: \n $ growthbook ${this.id} --help`)
  }
}
