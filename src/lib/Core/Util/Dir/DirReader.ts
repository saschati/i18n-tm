import fs from 'fs/promises'
import type IDirReader from './IDirReader'

export default class DirReader implements IDirReader {
  async readdir(path: string): Promise<string[]> {
    try {
      await fs.access(path)

      const files = await fs.readdir(path)

      return files || []
    } catch (e) {
      return []
    }
  }
}
