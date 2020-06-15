import { useContext } from 'react'
import { useStaticRendering, MobXProviderContext } from 'mobx-react'
import { GetStaticProps, GetServerSideProps } from 'next'
import Counter from './counter'
import Todos from './todo'
import { observable } from 'mobx'

let store

class Store {
  @observable counter = new Counter()
  @observable todos = new Todos()
}

// Type safing the store server side/static rendering
export type InitialStoreState = {
  counter?: Pick<Store['counter'], 'value'>
  todos?: Pick<Store['todos'], 'list'>
}

// Next 5 lines are also about server side/static rendering
const isServer = typeof window === 'undefined'
useStaticRendering(isServer)
export type GetInitialStoreState = { initialStoreState: InitialStoreState }
export type GetStaticStoreState = GetStaticProps<GetInitialStoreState>
export type GetServerSideStoreState = GetServerSideProps<GetInitialStoreState>

export function initializeStore(initialData?: InitialStoreState): Store {
  if (!store || isServer) {
    store = new Store()
  }

  // client side hydration after ssg/ssr occurs
  if (initialData) {
    store.counter.hydrate(initialData.counter)
    store.todos.hydrate(initialData.todos)
  }

  return store
}

export function resetStore(): void {
  store.counter = new Counter()
  store.todos = new Todos()
}

export function useStore(): Store {
  const { store } = useContext(MobXProviderContext)
  return store
}
