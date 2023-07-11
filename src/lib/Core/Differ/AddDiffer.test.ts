import AddDiffer from './AddDiffer'

describe('AddDiffer', () => {
  let addDiffer: AddDiffer

  beforeEach(() => {
    addDiffer = new AddDiffer()
  })

  it('returns empty object if fromObject is empty', () => {
    const fromObject = {}
    const toObject = { foo: 'bar' }

    const diff = addDiffer.diff(fromObject, toObject)

    expect(diff).toEqual({})
  })

  it('returns fromObject if toObject is empty', () => {
    const fromObject = { foo: 'bar' }
    const toObject = {}

    const diff = addDiffer.diff(fromObject, toObject)

    expect(diff).toEqual(fromObject)
  })

  it('returns added object properties as diff', () => {
    const fromObject = { foo: 'bar', baz: 'qux' }
    const toObject = { foo: 'bar' }

    const diff = addDiffer.diff(fromObject, toObject)

    expect(diff).toEqual({ baz: 'qux' })
  })

  it('returns added object properties nestesed as diff', () => {
    const fromObject = {
      foo: {
        baz: 'qux',
        quux: 'corge',
      },
    }
    const toObject = {
      foo: {
        baz: 'qux',
      },
    }

    const diff = addDiffer.diff(fromObject, toObject)

    expect(diff).toEqual({ foo: { quux: 'corge' } })
  })

  it('returns added object properties array as diff', () => {
    const fromObject = { foo: ['bar', 'baz'] }
    const toObject = {
      foo: ['bar'],
    }

    const diff = addDiffer.diff(fromObject, toObject)

    expect(diff).toEqual({
      foo: {
        1: 'baz',
      },
    })
  })
})
