import AddDiffer from '@App/Core/Differ/AddDiffer.js'
import DeleteDiffer from '@App/Core/Differ/DeleteDiffer.js'
import UpdateDiffer from '@App/Core/Differ/UpdateDiffer.js'
import type { TranslationDiffObject, TranslationDiffObjectDelete } from '../../types'
import type IDiffer from '@App/Core/Differ/IDiffer.js'
import type { Bootstrap } from '../bootstrap.js'

const bootstrap: Bootstrap = (contaner) => {
  contaner.set<IDiffer<TranslationDiffObject, TranslationDiffObject>>(
    'AddIDiffer',
    () => new AddDiffer(),
    true
  )
  contaner.set<IDiffer<TranslationDiffObject, TranslationDiffObjectDelete>>(
    'DeleteIDiffer',
    () => new DeleteDiffer(),
    true
  )
  contaner.set<IDiffer<TranslationDiffObject, TranslationDiffObject>>(
    'UpdateIDiffer',
    () => new UpdateDiffer(),
    true
  )
}

export default bootstrap
