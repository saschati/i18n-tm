import { deletedDiff } from 'deep-object-diff'
export default class DeleteDiffer {
  diff(fromObject, toObject) {
    if (Object.keys(fromObject).length === 0 || Object.keys(toObject).length === 0) {
      return {}
    }
    const diff = deletedDiff(toObject, fromObject)
    return JSON.parse(JSON.stringify(diff, (_, v) => (v === undefined ? null : v)))
  }
}
