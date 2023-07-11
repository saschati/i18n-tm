import fs from 'fs/promises'
import JsonStorage from './JsonStorage'
import type IStorage from './IStorage'

jest.mock('fs/promises')

describe('JsonStorage', () => {
  let storage: IStorage<object>

  beforeEach(() => {
    storage = new JsonStorage('')

    jest.resetAllMocks()
  })

  describe('save', () => {
    test('Storage json object to file', async () => {
      fs.writeFile = jest.fn()

      const data = {
        one: 'one',
        two: 'two',
      }
      const pathname = './mokefile.json'
      const json = '{"one":"one","two":"two"}'

      await storage.save(pathname, data)

      expect(fs.writeFile).toHaveBeenCalled()
      expect(fs.writeFile).toHaveBeenCalledWith(pathname, json, 'utf8')
    })
  })
})
