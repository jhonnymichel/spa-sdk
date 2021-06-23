import { NextPage } from 'next'
import { useStore, initializeStore, GetServerSideStoreState } from 'store'
import { observer } from 'mobx-react'
import Button from 'components/button'
import { useEffect } from 'react'

const Todos: NextPage = observer(() => {
  const { todos } = useStore()
  const { state } = todos.list

  return (
    <div className="max-w-2xl px-4 mx-auto py-container">
      <h1 className="hidden lg:block">Todo list</h1>
      <div className="flex flex-col items-start w-full space-y-4">
        <Button disabled={state === 'loading'} variant="md" onClick={todos.fetch}>
          Reload
        </Button>
        {state === 'loading' && <div>Loading todos</div>}
        {state === 'error' && (
          <div className="flex justify-center w-full py-16">Error loading todos</div>
        )}
        {state === 'ok' && (
          <div className="flex flex-wrap">
            {todos.list.data.map((todo) => (
              <div key={todo.id} className="w-6/12 p-1 md:w-4/12 lg:w-3/12 xl:w-2/12">
                <div className="w-full h-40 px-4 py-2 bg-white rounded-lg hover:shadow-lg">
                  <p className="text-gray-700">{todo.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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
