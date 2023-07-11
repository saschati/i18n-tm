import fs from 'fs/promises'
import type IStorage from './IStorage'

export default class JsonStorage<T = object> implements IStorage<T> {
  constructor(private _space: string) {}

  async save(pathname: string, data: T) {
    const json = JSON.stringify(data, null, this._space)

    await fs.writeFile(pathname, json, 'utf8')
  }
}
