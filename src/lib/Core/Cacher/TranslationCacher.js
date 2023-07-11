export default class TranslationCacher {
  _storage
  _reader
  _pathname
  constructor(_storage, _reader, _pathname) {
    this._storage = _storage
    this._reader = _reader
    this._pathname = _pathname
  }
  async set(cache) {
    await this._storage.save(this._pathname, cache)
  }
  async get() {
    return await this._reader.read(this._pathname)
  }
}
