import {Command} from '@oclif/core'
import {baseGrowthBookCliFlags, paginationCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {SavedGroupsRepository} from '../../repositories/saved-groups.repository'

export default class SavedgroupsList extends Command {
  static description = 'Defined sets of attribute values which can be used with feature rules for targeting features at particular users.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    ...paginationCliFlags,
  }

  static args = {}

  async run(): Promise<void> {
    const {
      flags: {
        profile,
        apiBaseUrl,
        limit,
        offset,
      },
    } = await this.parse(SavedgroupsList)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const repo = new SavedGroupsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })

    const savedGroups = await repo.listSavedGroups(limit, offset)

    this.logJson(savedGroups)
  }
}
