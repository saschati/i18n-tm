export default class AbstractMapper {
  _fromReader
  _toReader
  _storage
  constructor(_fromReader, _toReader, _storage) {
    this._fromReader = _fromReader
    this._toReader = _toReader
    this._storage = _storage
  }
  async map(fromPathname, toPathname) {
    const fromObject = await this._fromReader.read(fromPathname)
    const toObject = await this._toReader.read(toPathname)
    const map = this.action(fromObject, toObject)
    this._storage.save(toPathname, map)
  }
}
