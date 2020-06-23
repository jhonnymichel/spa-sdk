import StateMachine, { Config } from 'javascript-state-machine'

export type LoadingState = 'initial' | 'loading' | 'error' | 'ok'

type Action = 'load' | 'throw' | 'finish'

const baseConfig: Config<LoadingState, Action> = {
  init: 'initial',
  transitions: [
    { name: 'load', from: ['initial', 'error', 'ok'], to: 'loading' },
    { name: 'throw', from: 'loading', to: 'error' },
    { name: 'finish', from: 'loading', to: 'ok' },
  ],
}

export type Resource<TData> = {
  data: TData
  error: { data: any; message: string; response: any } | null
  state: LoadingState
}

export function CreateResource<TData>(data: TData): Resource<TData> {
  return {
    data: data,
    state: 'initial',
    error: null,
  }
}

export function transition(resource: Resource<any>, action: Action): void {
  const config = { ...baseConfig, init: resource.state }
  const machine = new StateMachine<LoadingState, Action>(config)
  machine[action]()

  resource.state = machine.state
}
