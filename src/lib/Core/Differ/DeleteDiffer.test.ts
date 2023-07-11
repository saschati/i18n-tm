import DeleteDiffer from './DeleteDiffer'

describe('DeleteDiffer', () => {
  it('should return an empty object if either input is empty', () => {
    const differ = new DeleteDiffer()

    expect(differ.diff({}, {})).toEqual({})
    expect(differ.diff({ key: 'value' }, {})).toEqual({})
    expect(differ.diff({}, { key: 'value' })).toEqual({})
  })

  it('should return a diff object representing the deleted keys', () => {
    const differ = new DeleteDiffer()

    const fromObject = {
      key1: 'value1',
      key3: {
        nestedKey: {
          deepKey2: 'deepValue',
        },
      },
    }

    const toObject = {
      key1: 'value1',
      key2: {
        nestedKey: 'nestedValue',
      },
      key3: {
        nestedKey: {
          deepKey1: 'deepValue',
          deepKey2: 'deepValue',
        },
      },
    }

    const expectedDiff = {
      key2: null,
      key3: {
        nestedKey: {
          deepKey1: null,
        },
      },
    }

    expect(differ.diff(fromObject, toObject)).toEqual(expectedDiff)
  })
})
