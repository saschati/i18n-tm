import fs from 'fs/promises'
export default class JsonReader {
  _fileChecker
  constructor(_fileChecker) {
    this._fileChecker = _fileChecker
  }
  async read(pathname) {
    if ((await this._fileChecker.check(pathname)) === false) {
      return Object.create({})
    }
    const content = await fs.readFile(pathname, 'utf8')
    const json = JSON.parse(content)
    return json
  }
}
