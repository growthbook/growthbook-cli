import * as Fs from 'node:fs'
import {Args, Command, Flags, ux} from '@oclif/core'
import {baseGrowthBookCliFlags, fileInputOutputCliFlags, Icons} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {ExperimentsRepository} from '../../repositories/experiments.repository'
import {UpdateExperimentRequest} from '../../generated/api'
import {errorStringFromResponse} from '../../utils/http'

export default class ExperimentsUpdate extends Command {
  static description = 'Update an existing experiment.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --filePath input.json',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    ...fileInputOutputCliFlags,
    id: Flags.string({
      char: 'i',
      description: 'Experiment ID to update',
      required: true,
    }),
  }

  static args = {
    input: Args.string({
      description: 'JSON payload for the update. Docs: [Your Docs URL]',
      required: false,
    }),
  }

  async run(): Promise<void> {
    const {
      args: {input},
      flags: {profile, apiBaseUrl, filePath, output, id},
    } = await this.parse(ExperimentsUpdate)

    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    let payload = input
    if (!input && filePath) {
      payload = Fs.readFileSync(filePath, 'utf-8')
    }

    if (!payload) {
      payload = await ux.prompt('Paste the experiment update payload', {required: true})
    }

    let parsedPayload: unknown = null
    try {
      parsedPayload = JSON.parse(payload)
    } catch {
      this.error('Unable to parse payload')
    }

    ux.action.start('Posting parsed payload')
    // this.logJson(parsedPayload) // Assume you have a logJson method

    const experimentsRepo = new ExperimentsRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })

    try {
      const updatedExperiment = await experimentsRepo.updateExperiment(id, parsedPayload as UpdateExperimentRequest)
      // this.logJson(updatedExperiment) // Assume you have a logJson method
      ux.action.stop(`${Icons.checkmark} Successfully updated experiment ${updatedExperiment.id}`)

      if (output) {
        const outputContents = JSON.stringify(updatedExperiment, null, 2)
        ux.action.start('Writing updated experiment to file')
        try {
          Fs.writeFileSync(output, outputContents)
          ux.action.stop(`${Icons.checkmark} Output updated experiment to ${output}`)
        } catch (error) {
          this.error(`${error}`)
          ux.action.stop(`${Icons.xSymbol} Failed to write experiment output to file path ${output}`)
        }
      }
    } catch (error) {
      this.error(errorStringFromResponse(error))
      ux.action.stop(`${Icons.xSymbol} Failed to update experiment`)
    }
  }
}
