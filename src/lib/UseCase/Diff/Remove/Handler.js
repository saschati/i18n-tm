import path from 'path'
export default class Handler {
  _cacher
  _differ
  _pTrasformer
  _pCleaner
  _reader
  _storage
  _unificatior
  _dirReader
  _dirMaker
  constructor(
    _cacher,
    _differ,
    _pTrasformer,
    _pCleaner,
    _reader,
    _storage,
    _unificatior,
    _dirReader,
    _dirMaker
  ) {
    this._cacher = _cacher
    this._differ = _differ
    this._pTrasformer = _pTrasformer
    this._pCleaner = _pCleaner
    this._reader = _reader
    this._storage = _storage
    this._unificatior = _unificatior
    this._dirReader = _dirReader
    this._dirMaker = _dirMaker
  }
  async handle(command) {
    const fromDir = path.join(command.transDir, command.fromLocale)
    const fromFiles = await this._dirReader.readdir(fromDir)
    const cache = (await this._cacher.get())[command.fromLocale] || {}
    for (const fileName of fromFiles) {
      const fromData = await this._reader.read(path.join(fromDir, fileName))
      for (const toLocale of command.toLocales) {
        const diffPathname = path.join(command.transDir, toLocale, fileName)
        const toData = await this._reader.read(diffPathname)
        const toRemoveDir = path.join(command.outputDir, toLocale)
        let diff = {}
        if (command.withPlural === true && cache[fileName] !== undefined) {
          const prepareDiff = this._pTrasformer.transform(
            command.fromLocale,
            toLocale,
            this._differ.diff(fromData, cache[fileName])
          )
          diff = this._differ.diff(
            this._pCleaner.clean(command.fromLocale, fromData),
            this._pCleaner.clean(toLocale, toData)
          )
          diff = this._unificatior.unification(diff, prepareDiff)
        } else {
          diff = this._differ.diff(fromData, toData)
        }
        if (!Object.keys(diff).length) {
          return
        }
        const storePath = path.join(toRemoveDir, fileName)
        await this._dirMaker.create(toRemoveDir)
        await this._storage.save(storePath, diff)
      }
    }
  }
}
