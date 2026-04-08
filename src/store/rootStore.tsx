import Counter from './Counter';
import { TestsCatalogStore } from './domains/tests/testCatalogStore';

export class RootStore {
    counterStore: Counter;
    testsCatalogStore: TestsCatalogStore;

    constructor() {
        this.counterStore = new Counter();
        this.testsCatalogStore = new TestsCatalogStore();
    }
}

export const rootStore = new RootStore();