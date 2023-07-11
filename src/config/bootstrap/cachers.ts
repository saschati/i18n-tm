import JsonReader from '@App/Core/Reader/JsonReader.js'
import TranslationCacher from '@App/Core/Cacher/TranslationCacher.js'
import JsonStorage from '@App/Core/Storage/JsonStorage.js'
import type IFileChecker from '@App/Core/Util/File/IFileChecker.js'
import type ITranslationCacher from '@App/Core/Cacher/ITranslationCacher.js'
import type { Bootstrap } from '../bootstrap.js'

const bootstrap: Bootstrap = (contaner, config) => {
  contaner.set<ITranslationCacher>(
    'ITranslationCacher',
    () => {
      return new TranslationCacher(
        new JsonStorage(''),
        new JsonReader(contaner.get<IFileChecker>('IFileChecker')),
        config.getCachePath()
      )
    },
    true
  )
}

export default bootstrap
