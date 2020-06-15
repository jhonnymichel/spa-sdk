declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.gif'
declare module '*.json'

declare module 'javascript-state-machine' {
  export interface Config<TState, TAction> {
    init: TState
    transitions: { name: TAction; from: TState | TState[]; to: TState }[]
  }

  declare class StateMachine<TState = string, TAction = string> {
    constructor(config: Config<TState, TAction>)

    state: TState

    transition(action: TAction): void
  }

  export = StateMachine
}
