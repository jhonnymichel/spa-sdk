import { NextPage } from 'next'
import { useStore, initializeStore, GetServerSideStoreState } from 'store'
import { observer } from 'mobx-react'
import Button from 'components/button'
import { useEffect } from 'react'

const Todos: NextPage = observer(() => {
  const { todos } = useStore()
  const { state } = todos.list

  return (
    <div className="container py-container">
      <div className="w-full flex flex-col items-start space-y-4">
        <Button disabled={state === 'loading'} variant="md" onClick={todos.fetch}>
          Reload
        </Button>
        {state === 'loading' && <div>Loading todos</div>}
        {state === 'error' && (
          <div className="w-full flex justify-center py-16">Error loading todos</div>
        )}
        {state === 'ok' &&
          todos.list.data.map((todo) => (
            <div key={todo.id} className="px-4 py-2 bg-white hover:shadow-lg w-full rounded-lg">
              <p className="text-gray-700">{todo.title}</p>
            </div>
          ))}
      </div>
    </div>
  )
})

export const getServerSideProps: GetServerSideStoreState = async () => {
  const { todos } = initializeStore()

  await todos.fetch()

  return {
    props: {
      initialStoreState: {
        todos: { list: todos.list },
      },
    },
  }
}

export default Todos
