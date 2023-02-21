import {expect, test} from '@oclif/test'

describe('features', () => {
  test
  .stdout()
  .command(['features'])
  .it('outputs help instructions', ctx => {
    expect(ctx.stdout).to.contain('Run the following command for details:')
    expect(ctx.stdout).to.contain(' $ growthbook features --help')
  })
})
