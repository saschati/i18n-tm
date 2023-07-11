export default class Command {
  fromLocale
  toLocales
  transDir
  outputDir
  withPlural
  constructor(fromLocale, toLocales, transDir, outputDir, withPlural) {
    this.fromLocale = fromLocale
    this.toLocales = toLocales
    this.transDir = transDir
    this.outputDir = outputDir
    this.withPlural = withPlural
  }
}
