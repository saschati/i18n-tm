import type { TranslationDiffObject } from '../../../types'
import type IReader from '@App/Core/Reader/IReader'
import type IStorage from '@App/Core/Storage/IStorage'

export default abstract class AbstractMapper<
  TFromReader = TranslationDiffObject,
  TToReader = TranslationDiffObject,
  TStorage = TranslationDiffObject
> {
  constructor(
    private _fromReader: IReader<TFromReader>,
    private _toReader: IReader<TToReader>,
    private _storage: IStorage<TStorage>
  ) {}

  protected abstract action(from: TFromReader, to: TToReader): TStorage

  async map(fromPathname: string, toPathname: string): Promise<void> {
    const fromObject = await this._fromReader.read(fromPathname)
    const toObject = await this._toReader.read(toPathname)

    const map = this.action(fromObject, toObject)

    this._storage.save(toPathname, map)
  }
}
