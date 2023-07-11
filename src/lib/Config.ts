import path from 'path'

export type DiffFormat = 'json'
export type TransFormat = 'json'
export type RemoteProvider = 'ms' | 'none'

type ConfigProperties =
  | 'locale'
  | 'locales'
  | 'transDir'
  | 'outputDir'
  | 'cacheDir'
  | 'cacheFilename'
  | 'transFormat'
  | 'diffFormat'
  | 'remoteProvider'
  | 'withPlural'
  | 'msApiKey'
  | 'msApiRegion'

export type ConfigOptions = Partial<{
  [key in keyof Config]: key extends ConfigProperties ? Config[key] : never
}>

export default class Config {
  // Locales
  public readonly locale: string | undefined
  public readonly locales: string[] | undefined

  // Path
  public readonly transDir: string | undefined
  public readonly outputDir: string | undefined
  public readonly cacheDir: string | undefined
  public readonly cacheFilename: string | undefined

  public readonly transFormat: TransFormat
  public readonly diffFormat: DiffFormat
  public readonly remoteProvider: RemoteProvider
  public readonly withPlural: boolean

  // Microsoft remote provider keys
  public readonly msApiKey: string | undefined
  public readonly msApiRegion: string | undefined

  constructor(options: ConfigOptions) {
    this.locale = options.locale
    this.locales = options.locales

    this.transDir = options.transDir
    this.outputDir = options.outputDir
    this.cacheDir = options.cacheDir
    this.cacheFilename = options.cacheFilename
    this.transFormat = options.transFormat as TransFormat
    this.diffFormat = options.diffFormat as DiffFormat
    this.remoteProvider = options.remoteProvider as RemoteProvider
    this.withPlural = Boolean(options.withPlural)

    this.msApiKey = options.msApiKey
    this.msApiRegion = options.msApiRegion
  }

  getCachePath(): string {
    if (!this.cacheDir || !this.cacheFilename) {
      throw new Error('Undefined cache path.')
    }

    return path.join(this.cacheDir, this.cacheFilename)
  }

  getAddOutputDir(): string {
    return this.getOutputDirByAction('add')
  }

  getUpdateOutputDir(): string {
    return this.getOutputDirByAction('update')
  }

  getRemoveOutputDir(): string {
    return this.getOutputDirByAction('remote')
  }

  withRemoteProvider(): boolean {
    return this.remoteProvider !== 'none'
  }

  private getOutputDirByAction(action: string): string {
    if (!this.outputDir) {
      throw new Error('The path to the comparison directory is not defined.')
    }

    return path.join(this.outputDir, action)
  }
}
