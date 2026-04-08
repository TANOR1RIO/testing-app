import { makeAutoObservable } from 'mobx';
import type { RootStore } from '../../store/rootStore';

export class StudentTestPageVM {
    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    init() {
    if(this.store.tests.length === 0 && this.store.attempts.length === 0) {
        this.store.load();
        }
    }

    onFiltersChange(f) {
        this.store.setFilters(f);
    }

    get store() {
        return this.rootStore.testsCatalogStore;
    }

    get loading() {
        return this.store.loading;
    }

    get error() {
        return this.store.error;
    }

    get visibleTests() {
        return this.store.visibleTests;
    }
    get lastAttemptByTest() {
        return this.store.lastAttemptByTest;
    }
}