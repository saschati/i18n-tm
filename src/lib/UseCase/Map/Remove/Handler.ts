import path from 'path'
import type Command from './Command'
import type AbstractMapper from '@App/Core/Mapper/AbstractMapper'
import type IDirChecker from '@App/Core/Util/Dir/IDirChecker'
import type IDirReader from '@App/Core/Util/Dir/IDirReader'
import type IDirRemover from '@App/Core/Util/Dir/IDirRemover'
import type IFileRemover from '@App/Core/Util/File/IFileRemover'

export default class Handler {
  constructor(
    private _dirReader: IDirReader,
    private _dirRemover: IDirRemover,
    private _dirChecker: IDirChecker,
    private _fileRemover: IFileRemover,
    private _cleaner: AbstractMapper
  ) {}

  async handle(command: Command) {
    const locales = await this._dirReader.readdir(command.outputDir)

    for (const locale of locales) {
      const fromDir = path.join(command.outputDir, locale)
      const toDir = path.join(command.transDir, locale)

      if ((await this._dirChecker.has(toDir)) === false) {
        continue
      }

      const files = await this._dirReader.readdir(fromDir)

      for (const filename of files) {
        const fromPathname = path.join(fromDir, filename)
        const toPathname = path.join(toDir, filename)

        await this._cleaner.map(fromPathname, toPathname)
        await this._fileRemover.remove(fromPathname)
      }

      await this._dirRemover.remove(fromDir)
    }
  }
}
