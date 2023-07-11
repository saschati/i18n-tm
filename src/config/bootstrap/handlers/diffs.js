import AddHandler from '@App/UseCase/Diff/Add/Handler.js'
import RemoveHandler from '@App/UseCase/Diff/Remove/Handler.js'
import UpdateHandler from '@App/UseCase/Diff/Update/Handler.js'
const bootstrap = (contaner) => {
  contaner.set(
    'Diff\\Add\\Handler',
    () =>
      new AddHandler(
        contaner.get('AddIDiffer'),
        contaner.get('IPluralTransformer'),
        contaner.get('RemoteProvider'),
        contaner.get('IDirReader'),
        contaner.get('IDirMaker'),
        contaner.get('TranslationIReader'),
        contaner.get('DiffIStorage')
      )
  )
  contaner.set(
    'Diff\\Remove\\Handler',
    () =>
      new RemoveHandler(
        contaner.get('ITranslationCacher'),
        contaner.get('DeleteIDiffer'),
        contaner.get('IPluralTransformer'),
        contaner.get('IPluralCleaner'),
        contaner.get('TranslationIReader'),
        contaner.get('DiffIStorage'),
        contaner.get('IDeepUnification'),
        contaner.get('IDirReader'),
        contaner.get('IDirMaker')
      )
  )
  contaner.set(
    'Diff\\Update\\Handler',
    () =>
      new UpdateHandler(
        contaner.get('ITranslationCacher'),
        contaner.get('UpdateIDiffer'),
        contaner.get('IPluralTransformer'),
        contaner.get('RemoteProvider'),
        contaner.get('IDirReader'),
        contaner.get('IDirMaker'),
        contaner.get('TranslationIReader'),
        contaner.get('DiffIStorage')
      )
  )
}
export default bootstrap
