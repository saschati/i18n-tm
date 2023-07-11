import path from 'path'
export default class Handler {
  _differ
  _plural
  _provider
  _dirReader
  _dirMaker
  _reader
  _storage
  constructor(_differ, _plural, _provider, _dirReader, _dirMaker, _reader, _storage) {
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
    for (const fileName of fromFiles) {
      const fromData = await this._reader.read(path.join(fromDir, fileName))
      for (const toLocale of command.toLocales) {
        const diffPathname = path.join(command.transDir, toLocale, fileName)
        const toData = await this._reader.read(diffPathname)
        const toAddDir = path.join(command.outputDir, toLocale)
        let diff = this._differ.diff(fromData, toData)
        if (command.withPlural === true) {
          diff = this._plural.transform(command.fromLocale, toLocale, diff)
          diff = this._differ.diff(diff, toData)
        }
        if (!Object.keys(diff).length) {
          return
        }
        if (command.withRemoteProvider === true) {
          diff = await this._provider.translateDeep(diff, command.fromLocale, toLocale)
        }
        const storePath = path.join(toAddDir, fileName)
        await this._dirMaker.create(toAddDir)
        await this._storage.save(storePath, diff)
      }
    }
  }
}
