export default interface IReader<T> {
  read(pathname: string): Promise<T>
}
