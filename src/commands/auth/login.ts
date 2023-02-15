import {Command} from '@oclif/core'

export default class Login  extends Command {
  static description = 'Configure the GrowthBook SDK with your project'

  static examples = [
    `$ growthbook auth login
hello from command login
`,
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('hello from command login')

    this.log(`Run the following command for details: \n $ growthbook ${this.id} --help`)
  }
}
