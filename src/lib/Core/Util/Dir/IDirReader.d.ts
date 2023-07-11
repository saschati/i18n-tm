export default interface IDirReader {
  readdir(path: string): Promise<string[]>
}
