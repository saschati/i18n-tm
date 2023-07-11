import path from 'path'
export default class Handler {
  _cacher
  _differ
  _plural
  _provider
  _dirReader
  _dirMaker
  _reader
  _storage
  constructor(_cacher, _differ, _plural, _provider, _dirReader, _dirMaker, _reader, _storage) {
    this._cacher = _cacher
    this._differ = _differ
    this._plural = _plural
    this._provider = _provider
    this._dirReader = _dirReader
    this._dirMaker = _dirMaker
    this._reader = _reader
    this._storage = _storage
  }
  async handle(command) {
    const fromDir = path.join(command.transDir, command.fromLocale)
    const fromFiles = await this._dirReader.readdir(fromDir)
    const cache = (await this._cacher.get())[command.fromLocale] || {}
    for (const fileName of fromFiles) {
      const fromData = await this._reader.read(path.join(fromDir, fileName))
      if (cache[fileName] === undefined) {
        continue
      }
      for (const toLocale of command.toLocales) {
        const toUpdateDir = path.join(command.outputDir, toLocale)
        const toCacheData = cache[fileName]
        const toData = await this._reader.read(path.join(command.transDir, toLocale, fileName))
        let diff = this._differ.diff(this._differ.diff(fromData, toData), toCacheData)
        if (command.withPlural === true) {
          diff = this._plural.transform(command.fromLocale, toLocale, diff)
        }
        if (!Object.keys(diff).length) {
          return
        }
        if (command.withRemoteProvider === true) {
          diff = await this._provider.translateDeep(diff, command.fromLocale, toLocale)
        }
        const storePath = path.join(toUpdateDir, fileName)
        await this._dirMaker.create(toUpdateDir)
        await this._storage.save(storePath, diff)
      }
    }
  }
}
