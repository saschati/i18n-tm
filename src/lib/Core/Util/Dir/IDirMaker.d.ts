export default interface IDirMaker {
  create(path: string): Promise<void>
}
