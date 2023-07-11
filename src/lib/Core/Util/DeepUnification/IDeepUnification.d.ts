export default interface IDeepUnification<T> {
  unification(from: T, to: T): T
}
