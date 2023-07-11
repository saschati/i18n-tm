import path from 'path'
export default class Handler {
  _dirMaker
  _dirReader
  _dirChecker
  _dirRemover
  _fileRemover
  _marge
  constructor(_dirMaker, _dirReader, _dirChecker, _dirRemover, _fileRemover, _marge) {
    this._dirMaker = _dirMaker
    this._dirReader = _dirReader
    this._dirChecker = _dirChecker
    this._dirRemover = _dirRemover
    this._fileRemover = _fileRemover
    this._marge = _marge
  }
  async handle(command) {
    await this._dirMaker.create(command.outputDir)
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
        await this._marge.map(fromPathname, toPathname)
        await this._fileRemover.remove(fromPathname)
      }
      await this._dirRemover.remove(fromDir)
    }
  }
}
