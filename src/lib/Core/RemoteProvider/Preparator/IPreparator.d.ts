export default interface IPreparator {
  prepareBefore(text: string): string
  prepareAfter(text: string): string
}
