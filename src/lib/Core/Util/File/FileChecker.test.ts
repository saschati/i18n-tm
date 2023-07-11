import FileChecker from './FileChecker'
import fs from 'fs/promises'

describe('FileChecker', () => {
  let fileChecker: FileChecker

  beforeEach(() => {
    jest.resetAllMocks()
    fileChecker = new FileChecker()
  })

  it('returns true if file exists', async () => {
    const accessSpy = jest.spyOn(fs, 'access').mockResolvedValueOnce(undefined)
    const pathname = '/path/to/file.txt'

    const result = await fileChecker.check(pathname)

    expect(result).toBe(true)
    expect(accessSpy).toHaveBeenCalledWith(pathname, fs.constants.F_OK)
  })

  it('returns false if file does not exist', async () => {
    const accessSpy = jest.spyOn(fs, 'access').mockRejectedValueOnce(new Error())
    const pathname = '/path/to/file.txt'

    const result = await fileChecker.check(pathname)

    expect(result).toBe(false)
    expect(accessSpy).toHaveBeenCalledWith(pathname, fs.constants.F_OK)
  })
})
