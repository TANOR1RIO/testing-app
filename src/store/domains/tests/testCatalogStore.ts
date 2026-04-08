import { makeAutoObservable, runInAction } from "mobx";
import type { Attempt, TestItem } from "../../../types/testing";

const API_TESTS = '/data/tests.json';
const API_ATTEMPTS = '/data/attempts.json';

export class TestsCatalogStore {
  tests: TestItem[] = [];
  attempts: Attempt[] = [];

  loading: boolean = false;
  error: string | null = null;
  
  filters = null;
  currentUserId = 1;

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
  }
  
  setFilters(f: null) {
    this.filters = f;
  }

  async load() {
    this.loading = true;
    this.error = null;

    try {
      const [r1, r2] = await Promise.all([
        fetch(API_TESTS),
        fetch(API_ATTEMPTS)
      ]);

      if (!r1.ok) throw new Error(`HTTP${r1.status}`);
      if (!r2.ok) throw new Error(`HTTP${r2.status}`);

      const t = await r1.json();
      const a = await r2.json();

      if (!Array.isArray(t) || !Array.isArray(a)) {
        throw new Error('Некорректный формат данных');
      }

      runInAction(() => {
        this.tests = t;
        this.attempts = a;
      });

    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : `Неизвестная ошибка ${e}`;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
  
  get visibleTests(): TestItem[] {
    return this.tests.filter(test => test.isPublished);
  }
  
  get lastAttemptByTest() {
    const byTest = new Map<number, Attempt>();
    const attempt = this.attempts.filter(
        a => a.userId === this.currentUserId,
    );
    for (const a of attempt) {
        byTest.set(a.testId, a);
    }
    return byTest;
  }
  
}