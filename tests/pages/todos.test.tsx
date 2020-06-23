import TodosPage from 'pages/todos'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { resetStore, initializeStore } from 'store'
import { render, screen, waitForElementToBeRemoved } from 'tests/utils'

global.process.env.NEXT_PUBLIC_TODO_API_URL = '/todoapi'

const server = setupServer(
  rest.get('/todoapi', (req, res, ctx) => {
    return res(
      ctx.json([
        { userId: 1, id: 1, title: 'test todo', completed: false },
        { userId: 2, id: 2, title: 'test todo', completed: false },
      ])
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('Todos page', () => {
  const store = initializeStore()

  beforeEach(() => {
    server.resetHandlers()
    resetStore()
  })

  it('Displays a load message while content is loading', async () => {
    store.todos.fetch()
    render(<TodosPage />)
    expect(screen.getByText('Loading todos')).toBeTruthy()
  })

  it('Displays content after its loaded', async () => {
    store.todos.fetch()
    render(<TodosPage />)
    await waitForElementToBeRemoved(() => screen.queryByText('Loading todos'))
    expect(screen.queryAllByText('test todo')).toHaveLength(2)
  })

  it('Displays an error message if load fails', async () => {
    server.use(rest.get('/todoapi', (req, res, ctx) => res(ctx.status(500))))
    store.todos.fetch()
    render(<TodosPage />)
    await waitForElementToBeRemoved(() => screen.queryByText('Loading todos'))
    expect(screen.queryAllByText('test todo')).toHaveLength(0)
    expect(screen.getByText('Error loading todos')).toBeTruthy()
  })
})
