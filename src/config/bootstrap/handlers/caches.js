import Handler from '@App/UseCase/Cache/Handler.js'
const bootstrap = (contaner) => {
  contaner.set(
    'Cache\\Handler',
    () =>
      new Handler(
        contaner.get('ITranslationCacher'),
        contaner.get('TranslationIReader'),
        contaner.get('IDirMaker'),
        contaner.get('IDirReader')
      )
  )
}
export default bootstrap
