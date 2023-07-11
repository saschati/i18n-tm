import path from 'path'
export default class Handler {
  _cacher
  _reader
  _dirMaker
  _dirReader
  constructor(_cacher, _reader, _dirMaker, _dirReader) {
    this._cacher = _cacher
    this._reader = _reader
    this._dirMaker = _dirMaker
    this._dirReader = _dirReader
  }
  async handle(command) {
    const transPathname = path.join(command.transDir, command.locale)
    const transFiles = await this._dirReader.readdir(transPathname)
    await this._dirMaker.create(command.cacheDir)
    const cache = (await this._cacher.get()) || {}
    cache[command.locale] ??= {}
    const localeCache = cache[command.locale] || {}
    cache[command.locale] = localeCache
    for (const transFile of transFiles) {
      localeCache[transFile] = await this._reader.read(path.join(transPathname, transFile))
    }
    await this._cacher.set(cache)
    return true
  }
}
