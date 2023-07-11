import UpdateDiffer from './UpdateDiffer'

describe('UpdateDiffer', () => {
  it('returns empty object if either fromObject or toObject is empty', () => {
    const differ = new UpdateDiffer()

    expect(differ.diff({}, {})).toEqual({})
    expect(differ.diff({ key: 'value' }, {})).toEqual({})
    expect(differ.diff({}, { key: 'value' })).toEqual({})
  })

  it('returns updatedDiff of toObject and fromObject', () => {
    const differ = new UpdateDiffer()

    const fromObject = {
      key1: 'value1-updated',
      key2: {
        nestedKey1: 'nestedValue1',
        nestedKey2: 'nestedValue2-updated',
      },
      key3: 'value3',
    }

    const toObject = {
      key1: 'value1',
      key2: {
        nestedKey1: 'nestedValue1',
        nestedKey2: 'nestedValue2',
      },
    }

    const expectedDiff = {
      key1: 'value1-updated',
      key2: {
        nestedKey2: 'nestedValue2-updated',
      },
    }

    expect(differ.diff(fromObject, toObject)).toEqual(expectedDiff)
  })
})
