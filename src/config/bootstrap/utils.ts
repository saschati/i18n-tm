import DeepUnification from '@App/Core/Util/DeepUnification/DeepUnification.js'
import FileChecker from '@App/Core/Util/File/FileChecker.js'
import DirChecker from '@App/Core/Util/Dir/DirChecker.js'
import DirMaker from '@App/Core/Util/Dir/DirMaker.js'
import DirReader from '@App/Core/Util/Dir/DirReader.js'
import DirRemover from '@App/Core/Util/Dir/DirRemover.js'
import FileRemover from '@App/Core/Util/File/FileRemover.js'
import type IDeepUnification from '@App/Core/Util/DeepUnification/IDeepUnification.js'
import type IFileChecker from '@App/Core/Util/File/IFileChecker.js'
import type IDirChecker from '@App/Core/Util/Dir/IDirChecker.js'
import type IFileRemover from '@App/Core/Util/File/IFileRemover.js'
import type IDirRemover from '@App/Core/Util/Dir/IDirRemover.js'
import type IDirReader from '@App/Core/Util/Dir/IDirReader.js'
import type IDirMaker from '@App/Core/Util/Dir/IDirMaker.js'
import type { TranslationDiffObject } from '../../types'
import type { Bootstrap } from '../bootstrap.js'

const bootstrap: Bootstrap = (contaner) => {
  contaner.set<IFileChecker>('IFileChecker', () => new FileChecker(), true)
  contaner.set<IFileRemover>('IFileRemover', () => new FileRemover(), true)
  contaner.set<IDirChecker>('IDirChecker', () => new DirChecker(), true)
  contaner.set<IDirMaker>('IDirMaker', () => new DirMaker(), true)
  contaner.set<IDirReader>('IDirReader', () => new DirReader(), true)
  contaner.set<IDirRemover>('IDirRemover', () => new DirRemover(), true)
  contaner.set<IDeepUnification<TranslationDiffObject>>(
    'IDeepUnification',
    () => new DeepUnification(),
    true
  )
}

export default bootstrap
