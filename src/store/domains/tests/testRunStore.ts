import { makeAutoObservable, runInAction } from 'mobx';
import type { AnswersMap, Question, TestItem } from '../../../types/testing';
import { checkQuestion } from '../../../utils/checkQuestion';

export class TestRunStore {
  testId: number | null = null;
  
  tests: TestItem | null = null;
  allQuestions: Question[] = [];
  answers: AnswersMap = {};
  
  loading: boolean = false;
  error: string = "";
  timeLeftSec: number = 0;
  showResult: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get durationSec(): number {
    return this.tests?.durationSec ?? 600;
  }

  get questions(): Question[] {
    return this.allQuestions.filter((q) => q.testId === this.testId);
  }

  get answeredCount(): number {
    return Object.values(this.answers).filter((answ) => {
      if (!answ) return false;  // ← защита от null/undefined
      
      if (answ.type === "single") return answ.value !== null;
      if (answ.type === "multiple")
        return Array.isArray(answ.value) && answ.value.length > 0;
      if (answ.type === "text")
        return typeof answ.value === "string" && answ.value.trim() !== "";
      
      return false;
    }).length;
  }

  get totalCount(): number {
    return this.questions.length;
  }

  get getAllAnswered(): boolean {
    return this.totalCount === this.answeredCount;
  }

  get result() {
    return this.questions.map((q) => checkQuestion(q, this.answers?.[q.id]));
  }

  get score() {
    return this.result.reduce((acc, curr) => acc + curr.currentAnsw, 0);
  }

  get maxScore() {
    return this.result.reduce((acc, curr) => acc + curr.max, 0);
  }

  get spentSec(): number {
    return this.durationSec - this.timeLeftSec;
  }

  setTimeLeftSec(value: number) {
    this.timeLeftSec = value;
  }

  setShowResult(value: boolean) {
    this.showResult = value;
  }

  setAnswer(questionId: number, value: string | string[] | null) {
    const prev = this.answers[questionId];
    
    // Если answer не существует — создаём новый (находим тип из вопроса)
    if (!prev) {
      const question = this.questions.find(q => q.id === questionId);
      this.answers = {
        ...this.answers,
        [questionId]: {
          type: question?.type || 'text',
          value,
        },
      };
      return;
    }

    this.answers = {
      ...this.answers,  // ← исправлено: распространяем весь answers
      [questionId]: {
        ...prev,
        value,
      },
    };
  }

  reset() {
    this.testId = null;
    this.tests = null;
    this.allQuestions = [];
    this.answers = {};
    this.loading = false;
    this.error = '';
    this.timeLeftSec = 0;
    this.showResult = false;
  }

  async start(testId: number) {
    this.reset();
    this.testId = testId;

    this.loading = true;
    this.error = "";

    const API_TESTS = "/data/tests.json";
    const API_QUESTIONS = "/data/questions.json";

    try {
      const [r1, r2] = await Promise.all([
        fetch(API_TESTS),
        fetch(API_QUESTIONS),
      ]);

      if (!r1.ok) throw new Error(`HTTP${r1.status}`);
      if (!r2.ok) throw new Error(`HTTP${r2.status}`);

      const t = (await r1.json()) as TestItem[];
      const q = (await r2.json()) as Question[];

      if (!Array.isArray(t) || !Array.isArray(q)) {
        throw new Error("Неверный формат данных");
      }
      
      const found = t.find(t => t.id === testId) ?? null;
      const filtered = q.filter(q => q.testId === Number(testId));

      if (filtered.length === 0) {
        runInAction(() => {
          this.tests = found;
          this.allQuestions = q;
          this.answers = {};
        });
        return;
      }

      const initAnswer: AnswersMap = {};
      for (const q of filtered) {
        initAnswer[q.id] = {
          type: q.type,
          value: q.type === "multiple" ? [] : null,
        };
      }
      
      runInAction(() => {
        this.tests = found;
        this.allQuestions = q;
        this.timeLeftSec = found?.durationSec ?? 600;
        this.answers = initAnswer;
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
}