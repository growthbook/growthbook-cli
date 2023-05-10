import {Args, Command} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {MetricsRepository} from '../../repositories/metrics.repository'

export default class MetricsGet extends Command {
  static description = 'Get a single metric by ID'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
  }

  static args = {
    metricId: Args.string({
      description: 'Metric ID',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const {
      args: {
        metricId,
      },
      flags: {
        profile,
        apiBaseUrl,
      },
    } = await this.parse(MetricsGet)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const metricsRepo = new MetricsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const metric = await metricsRepo.getMetric(metricId)

    this.logJson(metric)
  }
}
