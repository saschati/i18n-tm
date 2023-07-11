import UnderlineKeyer from './UnderlineKeyer'

describe('UnderlineKeyer', () => {
  describe('has', () => {
    it('returns true if the key contains the separator', () => {
      const keyer = new UnderlineKeyer()

      expect(keyer.has('foo_bar_baz')).toBe(true)
      expect(keyer.has('foo-bar-baz')).toBe(false)
    })
  })

  describe('get', () => {
    it('splits the key into name and rule parts', () => {
      const keyer = new UnderlineKeyer()

      expect(keyer.get('foo_bar_baz')).toEqual(['foo_bar', 'baz'])
      expect(keyer.get('foo_baz')).toEqual(['foo', 'baz'])
      expect(keyer.get('baz')).toEqual(['', 'baz'])
    })
  })

  describe('format', () => {
    it('joins the name and rule parts using the separator', () => {
      const keyer = new UnderlineKeyer()

      expect(keyer.format('foo_bar', 'baz')).toBe('foo_bar_baz')
      expect(keyer.format('foo', '')).toBe('foo_')
      expect(keyer.format('', 'baz')).toBe('_baz')
      expect(keyer.format('', '')).toBe('_')
    })
  })
})
