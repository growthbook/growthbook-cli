import * as Fs from 'node:fs'
import {Args, Command, Flags, ux} from '@oclif/core'
import {baseGrowthBookCliFlags, fileInputOutputCliFlags, Icons} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {SavedGroupsRepository} from '../../repositories/saved-groups.repository'
import {UpdateSavedGroupRequest} from '../../generated/api'
import {errorStringFromResponse} from '../../utils/http'

export default class SavedgroupsUpdate extends Command {
  static description = 'Update an existing saved group.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --filePath input.json',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    ...fileInputOutputCliFlags,
    id: Flags.string({
      char: 'i',
      description: 'Saved group ID to update',
      required: true,
    }),
  }

  static args = {
    input: Args.string({
      description: 'JSON payload of the update payload. Docs: https://docs.growthbook.io/api/#tag/saved-groups/operation/updateSavedGroup',
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
        id,
      },
    } = await this.parse(SavedgroupsUpdate)
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
      payload = await ux.prompt('Paste the saved group payload', {
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

    const repo = new SavedGroupsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })

    try {
      // Update the saved group
      const updatedRecord = await repo.updateSavedGroup(id, parsedPayload as UpdateSavedGroupRequest)
      this.logJson(updatedRecord)
      ux.action.stop(`${Icons.checkmark} Successfully updated saved group ${updatedRecord.id}`)

      // If provided an output path, write to file
      if (output) {
        const outputContents = JSON.stringify(updatedRecord, null, 2)
        ux.action.start('Writing updated saved group to file')

        try {
          Fs.writeFileSync(output, outputContents)
          ux.action.stop(`${Icons.checkmark} Output updated saved group to ${output}`)
        } catch (error) {
          this.error(`${error}`)
          ux.action.stop(`${Icons.xSymbol} Failed to write saved group output to file path ${output}`)
        }
      }
    } catch (error) {
      this.error(errorStringFromResponse(error))
      ux.action.stop(`${Icons.xSymbol} Failed to update saved group`)
    }
  }
}
