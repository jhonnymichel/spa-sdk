import { observable, action } from 'mobx'
import { CreateResource, transition } from './resource'
import axios from 'axios'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

class Todos {
  @observable list = CreateResource([] as Todo[])

  @action.bound async fetch(): Promise<void> {
    const { list } = this
    transition(list, 'load')

    try {
      const { data } = await axios.get(process.env.TODO_API_URL)
      list.data = data
      transition(list, 'finish')
    } catch (e) {
      transition(list, 'throw')
      list.error = e
      console.error(e)
    }
  }

  hydrate(data): void {
    if (data?.list) {
      this.list = data.list
    }
  }
}

export default Todos
