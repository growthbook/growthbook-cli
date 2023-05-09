import {expect, test} from '@oclif/test'

describe('features:toggle', () => {
  test
  .stdout()
  .command(['features:toggle'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['features:toggle', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
