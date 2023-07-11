export default interface IDirRemover {
  remove(path: string): Promise<void>
}
