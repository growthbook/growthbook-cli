import {expect} from '@oclif/test'
import {SimplifiedFeature} from '../../src/utils/feature'
import {getCompiledTypeScriptTemplateForFeatures} from '../../src/utils/templating'

describe('templating utils', () => {
  describe('getCompiledTemplateForFeatures', () => {
    it('should return TypeScript for the provided simplified features list', () => {
      const input: SimplifiedFeature[] = [
        {
          id: 'sample_json',
          valueType: 'json',
        },
        {
          id: 'donut_price',
          valueType: 'number',
        },
        {
          id: 'greeting',
          valueType: 'string',
        },
        {
          id: 'dark_mode',
          valueType: 'boolean',
        },
        {
          id: 'show-experiment-groups',
          valueType: 'boolean',
        },
      ]

      const result = getCompiledTypeScriptTemplateForFeatures(input)

      const expected = `export type AppFeatures = {
  'sample_json': Record<string, unknown>;
  'donut_price': number;
  'greeting': string;
  'dark_mode': boolean;
  'show-experiment-groups': boolean;
}
`

      expect(result).to.eq(expected)
    })
  })
})
