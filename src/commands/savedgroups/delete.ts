import {Args, Command} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {SavedGroupsRepository} from '../../repositories/saved-groups.repository'

export default class SavedgroupsDelete extends Command {
  static description = 'Delete a saved group'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
  }

  static args = {
    id: Args.string({
      description: 'Saved Group ID',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const {
      args: {
        id,
      },
      flags: {
        profile,
        apiBaseUrl,
      },
    } = await this.parse(SavedgroupsDelete)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const repo = new SavedGroupsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })
    const result = await repo.deleteSavedGroup(id)

    this.logJson(result)
  }
}
