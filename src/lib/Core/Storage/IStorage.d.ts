export default interface IStorage<T> {
  save(pathname: string, data: T): Promise<void>
}
