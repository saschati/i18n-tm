import JsonStorage from '@App/Core/Storage/JsonStorage.js'
import type { TranslationDiffObject } from '../../types'
import type IStorage from '@App/Core/Storage/IStorage.js'
import type { Bootstrap } from '../bootstrap.js'

const bootstrap: Bootstrap = (contaner, config) => {
  contaner.set<IStorage<TranslationDiffObject>>(
    'TranslationIStorage',
    () => {
      const storages = {
        json: () => new JsonStorage('  '),
      }

      return storages[config.transFormat]()
    },
    true
  )
  contaner.set<IStorage<TranslationDiffObject>>(
    'DiffIStorage',
    () => {
      const storages = {
        json: () => new JsonStorage('  '),
      }

      return storages[config.diffFormat]()
    },
    true
  )
}

export default bootstrap
