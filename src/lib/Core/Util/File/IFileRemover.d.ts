export default interface IFileRemover {
  remove(pathname: string): Promise<void>
}
