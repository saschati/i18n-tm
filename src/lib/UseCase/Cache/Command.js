export default class Command {
  locale
  fileName
  cacheDir
  transDir
  constructor(locale, fileName, cacheDir, transDir) {
    this.locale = locale
    this.fileName = fileName
    this.cacheDir = cacheDir
    this.transDir = transDir
  }
}
