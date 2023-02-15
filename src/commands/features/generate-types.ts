import {Command} from '@oclif/core'

export default class GenerateTypes  extends Command {
  static description = 'Generate TypeScript types for all your features'

  static examples = [
    `$ growthbook features generate-types
hello from command generate-types
`,
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('hello from command generate-types')

    this.log(`Run the following command for details: \n $ growthbook ${this.id} --help`)
  }
}
