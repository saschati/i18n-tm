import path from 'path'
import type Command from './Command'
import type ITranslationCacher from '@App/Core/Cacher/ITranslationCacher'
import type IReader from '@App/Core/Reader/IReader'
import type IDirMaker from '@App/Core/Util/Dir/IDirMaker'
import type IDirReader from '@App/Core/Util/Dir/IDirReader'
import type { TranslationDiffObject, CacheTransition } from '../../../types'

export default class Handler {
  constructor(
    private readonly _cacher: ITranslationCacher,
    private readonly _reader: IReader<TranslationDiffObject>,
    private readonly _dirMaker: IDirMaker,
    private readonly _dirReader: IDirReader
  ) {}

  async handle(command: Command) {
    const transPathname = path.join(command.transDir, command.locale)
    const transFiles = await this._dirReader.readdir(transPathname)

    await this._dirMaker.create(command.cacheDir)

    const cache: CacheTransition = (await this._cacher.get()) || {}

    cache[command.locale] ??= {}
    const localeCache = cache[command.locale] || {}
    cache[command.locale] = localeCache

    for (const transFile of transFiles) {
      localeCache[transFile] = await this._reader.read(path.join(transPathname, transFile))
    }

    await this._cacher.set(cache)

    return true
  }
}
