import {Args, Command, Flags} from '@oclif/core'

export default class Auth  extends Command {
  static description = 'Say hello'

  static examples = [
    `$ growthbook auth friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  static flags = {
    from: Flags.string({char: 'f', description: 'Who is saying hello', required: true}),
  }

  static args = {
    person: Args.string({description: 'Person to say hello to', required: true}),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Auth)

    this.log(`hello ${args.person} from ${flags.from}!`)

    this.log(`Run the following command for details: \n $ growthbook ${this.id} --help`)
  }
}
