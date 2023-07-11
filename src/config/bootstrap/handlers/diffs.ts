import AddHandler from '@App/UseCase/Diff/Add/Handler.js'
import RemoveHandler from '@App/UseCase/Diff/Remove/Handler.js'
import UpdateHandler from '@App/UseCase/Diff/Update/Handler.js'
import type AbstractProvider from '@App/Core/RemoteProvider/AbstractProvider.js'
import type { TranslationDiffObject, TranslationDiffObjectDelete } from '../../../types'
import type ITranslationCacher from '@App/Core/Cacher/ITranslationCacher.js'
import type IDiffer from '@App/Core/Differ/IDiffer.js'
import type IPluralCleaner from '@App/Core/Plural/IPluralCleaner.js'
import type IPluralTransformer from '@App/Core/Plural/IPluralTransformer.js'
import type IReader from '@App/Core/Reader/IReader.js'
import type IStorage from '@App/Core/Storage/IStorage.js'
import type IDeepUnification from '@App/Core/Util/DeepUnification/IDeepUnification.js'
import type IDirMaker from '@App/Core/Util/Dir/IDirMaker.js'
import type IDirReader from '@App/Core/Util/Dir/IDirReader.js'
import type { Bootstrap } from '../../bootstrap.js'

const bootstrap: Bootstrap = (contaner) => {
  contaner.set<AddHandler>(
    'Diff\\Add\\Handler',
    () =>
      new AddHandler(
        contaner.get<IDiffer<TranslationDiffObject, TranslationDiffObject>>('AddIDiffer'),
        contaner.get<IPluralTransformer>('IPluralTransformer'),
        contaner.get<AbstractProvider>('RemoteProvider'),
        contaner.get<IDirReader>('IDirReader'),
        contaner.get<IDirMaker>('IDirMaker'),
        contaner.get<IReader<TranslationDiffObject>>('TranslationIReader'),
        contaner.get<IStorage<TranslationDiffObject>>('DiffIStorage')
      )
  )
  contaner.set<RemoveHandler>(
    'Diff\\Remove\\Handler',
    () =>
      new RemoveHandler(
        contaner.get<ITranslationCacher>('ITranslationCacher'),
        contaner.get<IDiffer<TranslationDiffObject, TranslationDiffObjectDelete>>('DeleteIDiffer'),
        contaner.get<IPluralTransformer>('IPluralTransformer'),
        contaner.get<IPluralCleaner>('IPluralCleaner'),
        contaner.get<IReader<TranslationDiffObject>>('TranslationIReader'),
        contaner.get<IStorage<TranslationDiffObject>>('DiffIStorage'),
        contaner.get<IDeepUnification<TranslationDiffObject>>('IDeepUnification'),
        contaner.get<IDirReader>('IDirReader'),
        contaner.get<IDirMaker>('IDirMaker')
      )
  )
  contaner.set<UpdateHandler>(
    'Diff\\Update\\Handler',
    () =>
      new UpdateHandler(
        contaner.get<ITranslationCacher>('ITranslationCacher'),
        contaner.get<IDiffer<TranslationDiffObject, TranslationDiffObject>>('UpdateIDiffer'),
        contaner.get<IPluralTransformer>('IPluralTransformer'),
        contaner.get<AbstractProvider>('RemoteProvider'),
        contaner.get<IDirReader>('IDirReader'),
        contaner.get<IDirMaker>('IDirMaker'),
        contaner.get<IReader<TranslationDiffObject>>('TranslationIReader'),
        contaner.get<IStorage<TranslationDiffObject>>('DiffIStorage')
      )
  )
}

export default bootstrap
