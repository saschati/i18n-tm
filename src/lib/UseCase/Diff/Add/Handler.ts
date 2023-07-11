import path from 'path'
import type Command from './Command'
import type AbstractProvider from '@App/Core/RemoteProvider/AbstractProvider'
import type IDiffer from '@App/Core/Differ/IDiffer'
import type IPluralTransformer from '@App/Core/Plural/IPluralTransformer'
import type IReader from '@App/Core/Reader/IReader'
import type IStorage from '@App/Core/Storage/IStorage'
import type IDirMaker from '@App/Core/Util/Dir/IDirMaker'
import type IDirReader from '@App/Core/Util/Dir/IDirReader'
import type { TranslationDiffObject } from '../../../../types'

export default class Handler {
  constructor(
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

    for (const fileName of fromFiles) {
      const fromData = await this._reader.read(path.join(fromDir, fileName))

      for (const toLocale of command.toLocales) {
        const diffPathname = path.join(command.transDir, toLocale, fileName)
        const toData = await this._reader.read(diffPathname)

        const toAddDir = path.join(command.outputDir, toLocale)

        let diff = this._differ.diff(fromData, toData)

        if (command.withPlural === true) {
          diff = this._plural.transform(command.fromLocale, toLocale, diff) as TranslationDiffObject
          diff = this._differ.diff(diff, toData)
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

        const storePath = path.join(toAddDir, fileName)

        await this._dirMaker.create(toAddDir)
        await this._storage.save(storePath, diff)
      }
    }
  }
}
