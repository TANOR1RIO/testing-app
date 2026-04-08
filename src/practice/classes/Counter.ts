export class Counter {
  value: number;

  constructor() {
    this.value = 0;
  }

  increment(): void {
    this.value++;
  }

  decrement(): void {
    this.value--;
  }

  reset(): void {
    this.value = 0;
  }
}