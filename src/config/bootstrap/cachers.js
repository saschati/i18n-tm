import JsonReader from '@App/Core/Reader/JsonReader.js'
import TranslationCacher from '@App/Core/Cacher/TranslationCacher.js'
import JsonStorage from '@App/Core/Storage/JsonStorage.js'
const bootstrap = (contaner, config) => {
  contaner.set(
    'ITranslationCacher',
    () => {
      return new TranslationCacher(
        new JsonStorage(''),
        new JsonReader(contaner.get('IFileChecker')),
        config.getCachePath()
      )
    },
    true
  )
}
export default bootstrap
