import TodosPage from 'pages/todos'
import { rest } from 'msw'
import server from 'tests/server'
import { resetStore, initializeStore } from 'store'
import { render, screen, waitForElementToBeRemoved } from 'tests/utils'
import { fireEvent } from '@testing-library/react'

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

  it('Restart the cycle when the Reload button is clicked', async () => {
    store.todos.fetch()
    render(<TodosPage />)
    await waitForElementToBeRemoved(() => screen.queryByText('Loading todos'))
    expect(screen.queryAllByText('test todo')).toHaveLength(2)

    fireEvent.click(screen.getByText('Reload'))
    expect(screen.getByText('Loading todos')).toBeTruthy()
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
