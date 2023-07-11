export default interface IDiffer<T, R> {
  diff(fromObject: T, toObject: T): R
}
