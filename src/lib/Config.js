import path from 'path'
export default class Config {
  // Locales
  locale
  locales
  // Path
  transDir
  outputDir
  cacheDir
  cacheFilename
  transFormat
  diffFormat
  remoteProvider
  withPlural
  // Microsoft remote provider keys
  msApiKey
  msApiRegion
  constructor(options) {
    this.locale = options.locale
    this.locales = options.locales
    this.transDir = options.transDir
    this.outputDir = options.outputDir
    this.cacheDir = options.cacheDir
    this.cacheFilename = options.cacheFilename
    this.transFormat = options.transFormat
    this.diffFormat = options.diffFormat
    this.remoteProvider = options.remoteProvider
    this.withPlural = Boolean(options.withPlural)
    this.msApiKey = options.msApiKey
    this.msApiRegion = options.msApiRegion
  }
  getCachePath() {
    if (!this.cacheDir || !this.cacheFilename) {
      throw new Error('Undefined cache path.')
    }
    return path.join(this.cacheDir, this.cacheFilename)
  }
  getAddOutputDir() {
    return this.getOutputDirByAction('add')
  }
  getUpdateOutputDir() {
    return this.getOutputDirByAction('update')
  }
  getRemoveOutputDir() {
    return this.getOutputDirByAction('remote')
  }
  withRemoteProvider() {
    return this.remoteProvider !== 'none'
  }
  getOutputDirByAction(action) {
    if (!this.outputDir) {
      throw new Error('The path to the comparison directory is not defined.')
    }
    return path.join(this.outputDir, action)
  }
}
