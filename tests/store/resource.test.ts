import { CreateResource, transition } from 'store/resource'

describe('CreateResource', () => {
  it('Should return a Resource object with the correct initial values', () => {
    expect(CreateResource('this is the data')).toEqual({
      data: 'this is the data',
      state: 'initial',
      error: null,
    })
  })
})

describe('transition', () => {
  describe('When the resource state is initial', () => {
    const resource = CreateResource([])
    beforeEach(() => {
      resource.state = 'initial'
    })

    it('Should transition to loading  with the load action', () => {
      transition(resource, 'load')
      expect(resource.state).toBe('loading')
    })

    it('Should not transition with throw or finish', () => {
      expect(() => {
        transition(resource, 'throw')
      }).toThrow()

      expect(() => {
        transition(resource, 'finish')
      }).toThrow()

      expect(resource.state).toBe('initial')
    })
  })

  describe('When the resource state is loading', () => {
    const resource = CreateResource([])
    beforeEach(() => {
      resource.state = 'loading'
    })

    it('Should transition to ok with the finish action', () => {
      transition(resource, 'finish')
      expect(resource.state).toBe('ok')
    })

    it('Should transition to error with the throw action', () => {
      transition(resource, 'throw')
      expect(resource.state).toBe('error')
    })

    it('Should not transition with the load action', () => {
      expect(() => {
        transition(resource, 'load')
      }).toThrow()

      expect(resource.state).toBe('loading')
    })
  })

  describe('When the resource state is error', () => {
    const resource = CreateResource([])
    beforeEach(() => {
      resource.state = 'error'
    })

    it('Should transition to loading with the load action', () => {
      transition(resource, 'load')
      expect(resource.state).toBe('loading')
    })

    it('Should not transition with throw or finish', () => {
      expect(() => {
        transition(resource, 'throw')
      }).toThrow()

      expect(() => {
        transition(resource, 'finish')
      }).toThrow()

      expect(resource.state).toBe('error')
    })
  })
})
