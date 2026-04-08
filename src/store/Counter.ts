import { makeAutoObservable } from 'mobx';

class Counter {
  value: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  //action
  increment() {
    this.value++;
  }
  //action
  decrement() {
    this.value--;
  }
  //action
  reset() {
    this.value = 0;
  }
}

export default Counter;