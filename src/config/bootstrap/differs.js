import AddDiffer from '@App/Core/Differ/AddDiffer.js'
import DeleteDiffer from '@App/Core/Differ/DeleteDiffer.js'
import UpdateDiffer from '@App/Core/Differ/UpdateDiffer.js'
const bootstrap = (contaner) => {
  contaner.set('AddIDiffer', () => new AddDiffer(), true)
  contaner.set('DeleteIDiffer', () => new DeleteDiffer(), true)
  contaner.set('UpdateIDiffer', () => new UpdateDiffer(), true)
}
export default bootstrap
