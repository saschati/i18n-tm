import path from 'path'
import type Command from './Command'
import type { TranslationDiffObject, TranslationDiffObjectDelete } from '../../../../types'
import type ITranslationCacher from '@App/Core/Cacher/ITranslationCacher'
import type IDiffer from '@App/Core/Differ/IDiffer'
import type IPluralCleaner from '@App/Core/Plural/IPluralCleaner'
import type IPluralTransformer from '@App/Core/Plural/IPluralTransformer'
import type IReader from '@App/Core/Reader/IReader'
import type IDirReader from '@App/Core/Util/Dir/IDirReader'
import type IDirMaker from '@App/Core/Util/Dir/IDirMaker'
import type IStorage from '@App/Core/Storage/IStorage'
import type IDeepUnification from '@App/Core/Util/DeepUnification/IDeepUnification'

export default class Handler {
  constructor(
    private _cacher: ITranslationCacher,
    private _differ: IDiffer<TranslationDiffObject, TranslationDiffObjectDelete>,
    private _pTrasformer: IPluralTransformer,
    private _pCleaner: IPluralCleaner,
    private _reader: IReader<TranslationDiffObject>,
    private _storage: IStorage<TranslationDiffObject>,
    private _unificatior: IDeepUnification<TranslationDiffObject>,
    private _dirReader: IDirReader,
    private _dirMaker: IDirMaker
  ) {}

  async handle(command: Command) {
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
            this._differ.diff(fromData, cache[fileName] as TranslationDiffObject)
          )

          diff = this._differ.diff(
            this._pCleaner.clean(command.fromLocale, fromData),
            this._pCleaner.clean(toLocale, toData)
          )
          diff = this._unificatior.unification(diff, prepareDiff as TranslationDiffObject)
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
