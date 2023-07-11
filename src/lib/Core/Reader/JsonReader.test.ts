import fs from 'fs/promises'
import JsonReader from './JsonReader'

const mockFileChecker = {
  check: jest.fn().mockResolvedValue(true),
}

describe('JsonStorage', () => {
  const reader = new JsonReader(mockFileChecker)

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('read', () => {
    it('should read and parse JSON data from file', async () => {
      const pathname = '/path/to/file'
      const jsonData = { foo: 'bar' }
      const jsonString = JSON.stringify(jsonData)
      const readFileSpy = jest.spyOn(fs, 'readFile').mockResolvedValue(jsonString)

      const result = await reader.read(pathname)

      expect(readFileSpy).toHaveBeenCalledWith(pathname, 'utf8')
      expect(result).toEqual(jsonData)
    })

    it('should return empty object if file does not exist', async () => {
      const pathname = '/path/to/nonexistent/file'
      mockFileChecker.check.mockResolvedValue(false)

      const result = await reader.read(pathname)

      expect(result).toEqual({})
    })
  })
})
