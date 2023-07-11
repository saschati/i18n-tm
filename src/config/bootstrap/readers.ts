import JsonReader from '@App/Core/Reader/JsonReader.js'
import type { TranslationDiffObject } from '../../types'
import type IReader from '@App/Core/Reader/IReader.js'
import type IFileChecker from '@App/Core/Util/File/IFileChecker.js'
import type { Bootstrap } from '../bootstrap.js'

const bootstrap: Bootstrap = (contaner, config) => {
  contaner.set<IReader<TranslationDiffObject>>(
    'TranslationIReader',
    () => {
      const readers = {
        json: () =>
          new JsonReader<TranslationDiffObject>(contaner.get<IFileChecker>('IFileChecker')),
      }

      return readers[config.transFormat]()
    },
    true
  )
  contaner.set<IReader<TranslationDiffObject>>(
    'DiffIReader',
    () => {
      const readers = {
        json: () =>
          new JsonReader<TranslationDiffObject>(contaner.get<IFileChecker>('IFileChecker')),
      }

      return readers[config.diffFormat]()
    },
    true
  )
}

export default bootstrap
