import fs from 'fs/promises'
import FileRemover from './FileRemover'

describe('FileRemover', () => {
  const remover = new FileRemover()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call fs.unlink with the pathname if the file exists', async () => {
    const pathname = '/path/to/file.txt'
    const accessSpy = jest.spyOn(fs, 'access').mockResolvedValueOnce(undefined)
    const unlinkSpy = jest.spyOn(fs, 'unlink').mockResolvedValueOnce(undefined)

    await remover.remove(pathname)

    expect(accessSpy).toBeCalledWith(pathname, fs.constants.F_OK)
    expect(unlinkSpy).toBeCalledWith(pathname)
  })

  it('should not call fs.unlink if the file does not exist', async () => {
    const pathname = '/path/to/file.txt'
    const accessSpy = jest.spyOn(fs, 'access').mockRejectedValueOnce(new Error())
    const unlinkSpy = jest.spyOn(fs, 'unlink').mockResolvedValueOnce(undefined)

    await remover.remove(pathname)

    expect(accessSpy).toBeCalledWith(pathname, fs.constants.F_OK)
    expect(unlinkSpy).not.toBeCalled()
  })
})
