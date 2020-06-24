import { rest } from 'msw'
import { setupServer } from 'msw/node'

// eslint-disable-next-line no-undef
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

export default server
