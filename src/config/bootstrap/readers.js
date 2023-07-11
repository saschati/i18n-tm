import JsonReader from '@App/Core/Reader/JsonReader.js'
const bootstrap = (contaner, config) => {
  contaner.set(
    'TranslationIReader',
    () => {
      const readers = {
        json: () => new JsonReader(contaner.get('IFileChecker')),
      }
      return readers[config.transFormat]()
    },
    true
  )
  contaner.set(
    'DiffIReader',
    () => {
      const readers = {
        json: () => new JsonReader(contaner.get('IFileChecker')),
      }
      return readers[config.diffFormat]()
    },
    true
  )
}
export default bootstrap
