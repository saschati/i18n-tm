import type { CacheTransition } from '../../../types'
import type IReader from '@App/Core/Reader/IReader'
import type IStorage from '@App/Core/Storage/IStorage'
import type ITranslationCacher from './ITranslationCacher'

export default class TranslationCacher implements ITranslationCacher {
  constructor(
    private _storage: IStorage<CacheTransition>,
    private _reader: IReader<CacheTransition>,
    private _pathname: string
  ) {}

  async set(cache: CacheTransition) {
    await this._storage.save(this._pathname, cache)
  }

  async get(): Promise<CacheTransition> {
    return await this._reader.read(this._pathname)
  }
}
