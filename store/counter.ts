import { observable, action } from 'mobx'

class Counter {
  @observable value = 0

  @action.bound raise(): void {
    console.log(this.value)
    this.value++
  }

  @action.bound lower(): void {
    this.value--
  }

  hydrate(data): void {
    if (data?.value && this.value === 0) {
      this.value = data?.value ?? 0
    }
  }
}

export default Counter
