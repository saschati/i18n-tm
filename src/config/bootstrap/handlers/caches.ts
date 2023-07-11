import Handler from '@App/UseCase/Cache/Handler.js'
import type { TranslationDiffObject } from '../../../types'
import type ITranslationCacher from '@App/Core/Cacher/ITranslationCacher.js'
import type IReader from '@App/Core/Reader/IReader.js'
import type IDirMaker from '@App/Core/Util/Dir/IDirMaker.js'
import type IDirReader from '@App/Core/Util/Dir/IDirReader.js'
import type { Bootstrap } from '../../bootstrap.js'

const bootstrap: Bootstrap = (contaner) => {
  contaner.set<Handler>(
    'Cache\\Handler',
    () =>
      new Handler(
        contaner.get<ITranslationCacher>('ITranslationCacher'),
        contaner.get<IReader<TranslationDiffObject>>('TranslationIReader'),
        contaner.get<IDirMaker>('IDirMaker'),
        contaner.get<IDirReader>('IDirReader')
      )
  )
}

export default bootstrap
