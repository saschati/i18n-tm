import { updatedDiff } from 'deep-object-diff'
export default class UpdateDiffer {
  diff(fromObject, toObject) {
    if (Object.keys(fromObject).length === 0 || Object.keys(toObject).length === 0) {
      return {}
    }
    const diff = updatedDiff(toObject, fromObject)
    return diff
  }
}
