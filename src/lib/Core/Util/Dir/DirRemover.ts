import fs from 'fs/promises'
import type IDirRemover from './IDirRemover'

export default class DirRemover implements IDirRemover {
  async remove(path: string): Promise<void> {
    try {
      await fs.access(path)

      return await fs.rmdir(path)
    } catch (e) {}
  }
}
