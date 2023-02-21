import {Command} from '@oclif/core'

export default class Auth extends Command {
  static description = ''

  static examples = [
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log(`Run the following command for details: \n $ growthbook ${this.id} --help`)
  }
}
