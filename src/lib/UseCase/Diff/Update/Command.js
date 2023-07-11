export default class Command {
  fromLocale
  toLocales
  transDir
  outputDir
  withPlural
  withRemoteProvider
  constructor(fromLocale, toLocales, transDir, outputDir, withPlural, withRemoteProvider) {
    this.fromLocale = fromLocale
    this.toLocales = toLocales
    this.transDir = transDir
    this.outputDir = outputDir
    this.withPlural = withPlural
    this.withRemoteProvider = withRemoteProvider
  }
}
