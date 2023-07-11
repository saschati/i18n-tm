export default class Command {
  constructor(
    public readonly locale: string,
    public readonly fileName: string,
    public readonly cacheDir: string,
    public readonly transDir: string
  ) {}
}
