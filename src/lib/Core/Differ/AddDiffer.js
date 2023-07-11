import { addedDiff } from 'deep-object-diff'
export default class AddDiffer {
  diff(fromObject, toObject) {
    if (Object.keys(fromObject).length === 0) {
      return {}
    }
    if (Object.keys(toObject).length === 0) {
      return fromObject
    }
    const diff = addedDiff(toObject, fromObject)
    return diff
  }
}
