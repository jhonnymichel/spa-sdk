/* eslint-disable @typescript-eslint/no-var-requires */
describe('initializeStore', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('Should always return a new store at server side', () => {
    jest.mock('store/is-server', () => true)
    const { initializeStore } = require('store')

    const storeA = initializeStore()
    const storeB = initializeStore()
    const storeC = initializeStore()

    expect(storeA === storeB).toBeFalsy()
    expect(storeB === storeC).toBeFalsy()
  })
})

it('Should initialize the store with the default values', () => {
  const { initializeStore } = require('store')

  const store = initializeStore()

  expect(store.counter.value).toBe(0)
  expect(store.todos.list).toEqual({
    state: 'initial',
    data: [],
    error: null,
  })
})

it('Should hydrate the store when initialData is provided', () => {
  const { initializeStore } = require('store')

  const store = initializeStore({
    counter: {
      value: 5,
    },
    todos: {
      list: {
        state: 'ok',
        data: [{ userId: 1, id: 1, title: 'Hello World', completed: false }],
        error: null,
      },
    },
  })

  expect(store.counter.value).toBe(5)
  expect(store.todos.list).toEqual({
    state: 'ok',
    data: [{ userId: 1, id: 1, title: 'Hello World', completed: false }],
    error: null,
  })
})
