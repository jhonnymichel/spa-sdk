import Todo from 'store/todo'

describe('Todo', () => {
  describe('hydrate', () => {
    it('Should be prepared to treat all initial values as optional', () => {
      const todoStore = new Todo()
      expect(() => {
        todoStore.hydrate(null)
      }).not.toThrow()

      expect(todoStore.list).toEqual({
        state: 'initial',
        data: [],
        error: null,
      })
    })
  })
})
