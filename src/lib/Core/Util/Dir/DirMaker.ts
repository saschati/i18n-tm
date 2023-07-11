import fs from 'fs/promises'
import type IDirMaker from './IDirMaker'

export default class DirMaker implements IDirMaker {
  async create(path: string): Promise<void> {
    try {
      await fs.access(path)
    } catch (e) {
      await fs.mkdir(path, { recursive: true })
    }
  }
}
