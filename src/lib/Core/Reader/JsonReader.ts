import fs from 'fs/promises'
import type IFileChecker from '@App/Core/Util/File/IFileChecker'
import type IReader from './IReader'

export default class JsonReader<T> implements IReader<T> {
  constructor(private _fileChecker: IFileChecker) {}

  async read(pathname: string): Promise<T> {
    if ((await this._fileChecker.check(pathname)) === false) {
      return Object.create({})
    }

    const content = await fs.readFile(pathname, 'utf8')
    const json = JSON.parse(content)

    return json
  }
}
