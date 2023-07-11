import DeepUnification from '@App/Core/Util/DeepUnification/DeepUnification.js'
import FileChecker from '@App/Core/Util/File/FileChecker.js'
import DirChecker from '@App/Core/Util/Dir/DirChecker.js'
import DirMaker from '@App/Core/Util/Dir/DirMaker.js'
import DirReader from '@App/Core/Util/Dir/DirReader.js'
import DirRemover from '@App/Core/Util/Dir/DirRemover.js'
import FileRemover from '@App/Core/Util/File/FileRemover.js'
const bootstrap = (contaner) => {
  contaner.set('IFileChecker', () => new FileChecker(), true)
  contaner.set('IFileRemover', () => new FileRemover(), true)
  contaner.set('IDirChecker', () => new DirChecker(), true)
  contaner.set('IDirMaker', () => new DirMaker(), true)
  contaner.set('IDirReader', () => new DirReader(), true)
  contaner.set('IDirRemover', () => new DirRemover(), true)
  contaner.set('IDeepUnification', () => new DeepUnification(), true)
}
export default bootstrap
