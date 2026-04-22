import { makeAutoObservable } from "mobx";
import type { RootStore } from "../../store/rootStore";
import type { NavigateFunction } from "react-router";

export class TestRunPageVM {
    finishModalOpen: boolean = false;
    private rootStore: RootStore;  // ← явное объявление поля

    constructor(rootStore: RootStore) {  // ← обычный параметр
        this.rootStore = rootStore;         // ← явное присваивание
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get store() {
        return this.rootStore.testRunStore;
    }

    openFinishModal() {
        if (this.store.showResult) return;
        this.finishModalOpen = true;
    }

    closeFinishModal() {
        this.finishModalOpen = false;
    }

    init(testId: number) {
        this.store.start(testId);
    }

    get finishModalTitle(): string {
        return this.store.getAllAnswered 
            ? "Хотите закончить тестирование?"
            : "Не все задания выполнены, хотите закончить?";
    }

    submit(navigate: NavigateFunction) {
        const test = this.store.tests;       
        const testId = this.store.testId;
        const maxScore = this.store.maxScore;
        const score = this.store.score;
        
        if (!test || testId == null) return;

        const seconds = this.store.spentSec;

        if (test?.attemptsAllowed > 1 && test?.allowRetry) {
            navigate(`/student/tests/${testId}/result`, {
                replace: true,
                state: {
                    time: seconds,
                    max: maxScore,
                    score,
                    attempAllowed: test?.attemptsAllowed - 1,
                },
            });
        }

        this.store.setShowResult(true);
    }

    onTimerFinihs(navigate: NavigateFunction) {
        if (!this.store.showResult) {
            this.submit(navigate);
        }
    }
}