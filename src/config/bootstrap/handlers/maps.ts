import AddHandler from '@App/UseCase/Map/Add/Handler.js'
import RemoveHandler from '@App/UseCase/Map/Remove/Handler.js'
import UpdateHandler from '@App/UseCase/Map/Update/Handler.js'
import type AbstractMapper from '@App/Core/Mapper/AbstractMapper.js'
import type IDirChecker from '@App/Core/Util/Dir/IDirChecker.js'
import type IDirMaker from '@App/Core/Util/Dir/IDirMaker.js'
import type IDirReader from '@App/Core/Util/Dir/IDirReader.js'
import type IDirRemover from '@App/Core/Util/Dir/IDirRemover.js'
import type IFileRemover from '@App/Core/Util/File/IFileRemover.js'
import type { Bootstrap } from '../../bootstrap.js'

const bootstrap: Bootstrap = (contaner) => {
  contaner.set<AddHandler>(
    'Map\\Add\\Handler',
    () =>
      new AddHandler(
        contaner.get<IDirMaker>('IDirMaker'),
        contaner.get<IDirReader>('IDirReader'),
        contaner.get<IDirRemover>('IDirRemover'),
        contaner.get<IFileRemover>('IFileRemover'),
        contaner.get<AbstractMapper>('MargeMapper')
      )
  )
  contaner.set<RemoveHandler>(
    'Map\\Remove\\Handler',
    () =>
      new RemoveHandler(
        contaner.get<IDirReader>('IDirReader'),
        contaner.get<IDirRemover>('IDirRemover'),
        contaner.get<IDirChecker>('IDirChecker'),
        contaner.get<IFileRemover>('IFileRemover'),
        contaner.get<AbstractMapper>('CleanMapper')
      )
  )
  contaner.set<UpdateHandler>(
    'Map\\Update\\Handler',
    () =>
      new UpdateHandler(
        contaner.get<IDirMaker>('IDirMaker'),
        contaner.get<IDirReader>('IDirReader'),
        contaner.get<IDirChecker>('IDirChecker'),
        contaner.get<IDirRemover>('IDirRemover'),
        contaner.get<IFileRemover>('IFileRemover'),
        contaner.get<AbstractMapper>('MargeMapper')
      )
  )
}

export default bootstrap
