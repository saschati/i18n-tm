import path from 'path'
import type Command from './Command'
import type { TranslationDiffObject } from '../../../../types'
import type IDiffer from '@App/Core/Differ/IDiffer'
import type IPluralTransformer from '@App/Core/Plural/IPluralTransformer'
import type IReader from '@App/Core/Reader/IReader'
import type IStorage from '@App/Core/Storage/IStorage'
import type IDirMaker from '@App/Core/Util/Dir/IDirMaker'
import type ITranslationCacher from '@App/Core/Cacher/ITranslationCacher'
import type IDirReader from '@App/Core/Util/Dir/IDirReader'
import type AbstractProvider from '@App/Core/RemoteProvider/AbstractProvider'

export default class Handler {
  constructor(
    private _cacher: ITranslationCacher,
    private _differ: IDiffer<TranslationDiffObject, TranslationDiffObject>,
    private _plural: IPluralTransformer,
    private _provider: AbstractProvider,
    private _dirReader: IDirReader,
    private _dirMaker: IDirMaker,
    private _reader: IReader<TranslationDiffObject>,
    private _storage: IStorage<TranslationDiffObject>
  ) {}

  async handle(command: Command) {
    const fromDir = path.join(command.transDir, command.fromLocale)
    const fromFiles = await this._dirReader.readdir(fromDir)

    const cache = (await this._cacher.get())[command.fromLocale] || {}

    for (const fileName of fromFiles) {
      const fromData = await this._reader.read(path.join(fromDir, fileName))

      if (cache[fileName] === undefined) {
        continue
      }

      for (const toLocale of command.toLocales) {
        const toUpdateDir = path.join(command.outputDir, toLocale)
        const toCacheData = cache[fileName] as TranslationDiffObject

        const toData = await this._reader.read(path.join(command.transDir, toLocale, fileName))

        let diff = this._differ.diff(this._differ.diff(fromData, toData), toCacheData)

        if (command.withPlural === true) {
          diff = this._plural.transform(command.fromLocale, toLocale, diff) as TranslationDiffObject
        }

        if (!Object.keys(diff).length) {
          return
        }

        if (command.withRemoteProvider === true) {
          diff = (await this._provider.translateDeep(
            diff,
            command.fromLocale,
            toLocale
          )) as TranslationDiffObject
        }

        const storePath = path.join(toUpdateDir, fileName)

        await this._dirMaker.create(toUpdateDir)
        await this._storage.save(storePath, diff)
      }
    }
  }
}
