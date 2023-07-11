import { TranslationDiffObject } from '../../../types'
import IReader from '../Reader/IReader'
import JsonReader from '../Reader/JsonReader'
import IStorage from '../Storage/IStorage'
import JsonStorage from '../Storage/JsonStorage'
import MargeMapper from './MargeMapper'

describe('MargeMapper', () => {
  let fromReader: IReader<TranslationDiffObject>
  let toReader: IReader<TranslationDiffObject>
  let storage: IStorage<TranslationDiffObject>
  let mapper: MargeMapper

  beforeEach(() => {
    const fileChecker = {
      check: jest.fn().mockReturnValue(true),
    }

    fromReader = new JsonReader(fileChecker)
    toReader = new JsonReader(fileChecker)
    storage = new JsonStorage('')
    mapper = new MargeMapper(fromReader, toReader, storage)
  })

  it('should map objects with correct merging', async () => {
    const from = { a: 1, b: { c: 2 } }
    const to = { a: 1, b: { d: 3 } }
    const expected = { a: 1, b: { c: 2, d: 3 } }

    const fromReadSpy = jest.spyOn(fromReader, 'read').mockRejectedValueOnce(from)
    const toReadSpy = jest.spyOn(toReader, 'read').mockRejectedValueOnce(to)
    const saveSpy = jest.spyOn(storage, 'save').mockRejectedValueOnce(undefined)

    await mapper.map('from', 'to')

    expect(fromReadSpy).toHaveBeenCalledWith('from')
    expect(toReadSpy).toHaveBeenCalledWith('to')
    expect(saveSpy).toHaveBeenCalledWith(expected, 'to')
  })

  /*
  it('should map arrays with correct merging', async () => {
    const from = [1, { a: 2 }]
    const to = [1, { b: 3 }]
    const expected = [1, { a: 2, b: 3 }]

    fromReader.setReadResult(from)
    toReader.setReadResult(to)

    await mapper.map('from', 'to')

    expect(storage.saved).toEqual({ to: expected })
  })

  it('should map empty objects and arrays', async () => {
    const from = { a: 1, b: {} }
    const to = { b: { c: 2 } }
    const expected = { a: 1, b: { c: 2 } }

    fromReader.setReadResult(from)
    toReader.setReadResult(to)

    await mapper.map('from', 'to')

    expect(storage.saved).toEqual({ to: expected })
  })

  it('should not modify input objects', async () => {
    const from = { a: 1, b: { c: 2 } }
    const to = { a: 1, b: { d: 3 } }

    fromReader.setReadResult(from)
    toReader.setReadResult(to)

    await mapper.map('from', 'to')

    expect(from).toEqual({ a: 1, b: { c: 2 } })
    expect(to).toEqual({ a: 1, b: { d: 3 } })
  })
  */
})
