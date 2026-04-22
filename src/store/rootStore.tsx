import Counter from './Counter';
import { TestsCatalogStore } from './domains/tests/testCatalogStore';
import { TestRunStore } from './domains/tests/testRunStore';

export class RootStore {
    counterStore: Counter;
    testsCatalogStore: TestsCatalogStore;
    testRunStore: TestRunStore;

    constructor() {
        this.counterStore = new Counter();
        this.testsCatalogStore = new TestsCatalogStore();
        this.testRunStore = new TestRunStore();
    }
}

export const rootStore = new RootStore();