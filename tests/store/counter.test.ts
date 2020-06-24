import Counter from 'store/counter'

describe('Counter', () => {
  describe('hydrate', () => {
    it('Should be prepared to treat all initial values as optional', () => {
      const counterStore = new Counter()
      expect(() => {
        counterStore.hydrate(null)
      }).not.toThrow()

      expect(counterStore.value).toBe(0)
    })
  })
})
