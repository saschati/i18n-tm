import JsonStorage from '@App/Core/Storage/JsonStorage.js'
const bootstrap = (contaner, config) => {
  contaner.set(
    'TranslationIStorage',
    () => {
      const storages = {
        json: () => new JsonStorage('  '),
      }
      return storages[config.transFormat]()
    },
    true
  )
  contaner.set(
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
