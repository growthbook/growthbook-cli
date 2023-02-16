import {getGrowthBookConfigDirectory, getGrowthBookConfigFilePath} from '../../src/utils/file'
import {expect} from '@oclif/test'

describe('file utils', () => {
  describe('getGrowthBookConfigDirectory', () => {
    it('should return the home directory', () => {
      const result = getGrowthBookConfigDirectory()

      expect(result).not.to.be.empty
      expect(result.endsWith('/.growthbook')).to.be.true
    })
  })

  describe('getGrowthBookConfigFilePath', () => {
    it('should return the path of the file', () => {
      const result = getGrowthBookConfigFilePath()

      expect(result).not.to.be.empty
      expect(result.endsWith('/.growthbook/config.toml')).to.be.true
    })
  })
})
