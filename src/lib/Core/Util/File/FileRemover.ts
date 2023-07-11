import fs from 'fs/promises'
import type IFileRemover from './IFileRemover'

export default class FileRemover implements IFileRemover {
  async remove(pathname: string): Promise<void> {
    try {
      await fs.access(pathname, fs.constants.F_OK)
      await fs.unlink(pathname)
    } catch (error) {}
  }
}
