import AddHandler from '@App/UseCase/Map/Add/Handler.js'
import RemoveHandler from '@App/UseCase/Map/Remove/Handler.js'
import UpdateHandler from '@App/UseCase/Map/Update/Handler.js'
const bootstrap = (contaner) => {
  contaner.set(
    'Map\\Add\\Handler',
    () =>
      new AddHandler(
        contaner.get('IDirMaker'),
        contaner.get('IDirReader'),
        contaner.get('IDirRemover'),
        contaner.get('IFileRemover'),
        contaner.get('MargeMapper')
      )
  )
  contaner.set(
    'Map\\Remove\\Handler',
    () =>
      new RemoveHandler(
        contaner.get('IDirReader'),
        contaner.get('IDirRemover'),
        contaner.get('IDirChecker'),
        contaner.get('IFileRemover'),
        contaner.get('CleanMapper')
      )
  )
  contaner.set(
    'Map\\Update\\Handler',
    () =>
      new UpdateHandler(
        contaner.get('IDirMaker'),
        contaner.get('IDirReader'),
        contaner.get('IDirChecker'),
        contaner.get('IDirRemover'),
        contaner.get('IFileRemover'),
        contaner.get('MargeMapper')
      )
  )
}
export default bootstrap
