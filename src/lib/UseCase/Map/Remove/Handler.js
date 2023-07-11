import path from 'path'
export default class Handler {
  _dirReader
  _dirRemover
  _dirChecker
  _fileRemover
  _cleaner
  constructor(_dirReader, _dirRemover, _dirChecker, _fileRemover, _cleaner) {
    this._dirReader = _dirReader
    this._dirRemover = _dirRemover
    this._dirChecker = _dirChecker
    this._fileRemover = _fileRemover
    this._cleaner = _cleaner
  }
  async handle(command) {
    const locales = await this._dirReader.readdir(command.outputDir)
    for (const locale of locales) {
      const fromDir = path.join(command.outputDir, locale)
      const toDir = path.join(command.transDir, locale)
      if ((await this._dirChecker.has(toDir)) === false) {
        continue
      }
      const files = await this._dirReader.readdir(fromDir)
      for (const filename of files) {
        const fromPathname = path.join(fromDir, filename)
        const toPathname = path.join(toDir, filename)
        await this._cleaner.map(fromPathname, toPathname)
        await this._fileRemover.remove(fromPathname)
      }
      await this._dirRemover.remove(fromDir)
    }
  }
}
