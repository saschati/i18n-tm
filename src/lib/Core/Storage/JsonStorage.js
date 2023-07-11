import fs from 'fs/promises'
export default class JsonStorage {
  _space
  constructor(_space) {
    this._space = _space
  }
  async save(pathname, data) {
    const json = JSON.stringify(data, null, this._space)
    await fs.writeFile(pathname, json, 'utf8')
  }
}
