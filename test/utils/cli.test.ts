import {expect} from '@oclif/test'
import {parseBooleanFromString} from '../../src/utils/cli'

describe('CLI utils', () => {
  describe('parseBooleanFromString', () => {
    it('should support various boolean types', () => {
      expect(parseBooleanFromString(1)).to.be.true
      expect(parseBooleanFromString('1')).to.be.true
      expect(parseBooleanFromString('true')).to.be.true
      expect(parseBooleanFromString('TRUE')).to.be.true
      expect(parseBooleanFromString('True')).to.be.true
      expect(parseBooleanFromString('on')).to.be.true
      expect(parseBooleanFromString(0)).to.be.false
      expect(parseBooleanFromString('0')).to.be.false
      expect(parseBooleanFromString('false')).to.be.false
      expect(parseBooleanFromString('FALSE')).to.be.false
      expect(parseBooleanFromString('False')).to.be.false
      expect(parseBooleanFromString('off')).to.be.false
      // unsupported boolean value
      expect(parseBooleanFromString('foobar')).to.be.null
    })
  })
})
