import {Command, Flags} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {MetricsRepository} from '../../repositories/metrics.repository'

export default class MetricsList extends Command {
  static description = 'List all metrics'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    limit: Flags.integer({
      description: 'Limit for pagination',
      required: false,
      default: 100,
    }),
    offset: Flags.integer({
      description: 'Offset for pagination',
      required: false,
      default: 0,
    }),
    project: Flags.string({
      description: 'Project ID filter',
      required: false,
    }),
  }

  static args = {}

  async run(): Promise<void> {
    const {
      flags: {
        profile,
        apiBaseUrl,
        limit,
        offset,
        project,
      },
    } = await this.parse(MetricsList)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const metricsRepo = new MetricsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })

    const metrics = await metricsRepo.listMetrics(limit, offset, project)

    this.logJson(metrics)
  }
}
