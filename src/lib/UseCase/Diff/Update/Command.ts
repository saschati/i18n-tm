export default class Command {
  constructor(
    public readonly fromLocale: string,
    public readonly toLocales: string[],
    public readonly transDir: string,
    public readonly outputDir: string,
    public readonly withPlural: boolean,
    public readonly withRemoteProvider: boolean
  ) {}
}
