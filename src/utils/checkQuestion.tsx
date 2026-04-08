import type { AnswerState, Question } from "../types/testing";

type QuestionProps = {
  q: Question;
  answ: AnswerState | undefined;
};

export type CheckResult = {
  max: number;
  currentAnsw: number;
  isCorrect: boolean;
  status: "correct" | "wrong" | "partial" | "ungraded";
};

export function checkQuestion(props: QuestionProps): CheckResult {
  const { q, answ } = props;
  const correct = q.correct;

  if (!correct) {
    return {
      max: q?.score ?? 0,
      currentAnsw: 0,
      isCorrect: false,
      status: "ungraded",
    };
  }

  if (!answ) {
    return {
      max: q?.score ?? 0,
      currentAnsw: 0,
      isCorrect: false,
      status: "wrong",
    };
  }

  if (q.type === "single") {
    const ok = answ?.value === correct;
    return {
      max: q.score,
      currentAnsw: ok ? q.score : 0,
      isCorrect: ok,
      status: ok ? "correct" : "wrong",
    };
  }

  if (q.type === "text") {
    return {
      max: q.score,
      currentAnsw: 0,
      isCorrect: false,
      status: "ungraded",
    };
  }

  if (q.type === "multiple") {
    const userAnswer = Array.isArray(answ?.value) ? answ.value : [];
    const questionDone = Array.isArray(correct) ? correct : [];

    const totalCorrect = questionDone.length;

    const correctCount = userAnswer.filter((val) =>
      questionDone.includes(val)
    ).length;

    const wrongCount = userAnswer.filter(
      (val) => !questionDone.includes(val)
    ).length;

    // Лишние (неправильные) варианты -> 0 баллов
    if (wrongCount > 0) {
      return { max: q.score, currentAnsw: 0, isCorrect: false, status: "wrong" };
    }

    // Защита на случай некорректных данных
    if (totalCorrect === 0) {
      return { max: q.score, currentAnsw: 0, isCorrect: false, status: "ungraded" };
    }

    // Если выбраны все правильные
    if (correctCount === totalCorrect) {
      return { max: q.score, currentAnsw: q.score, isCorrect: true, status: "correct" };
    }

    // Частично правильный ответ: баллы пропорционально
    const points = Math.round((q.score * correctCount) / totalCorrect);

    return { max: q.score, currentAnsw: points, isCorrect: false, status: "partial" };
  }

  return { max: q.score, currentAnsw: 0, isCorrect: false, status: "ungraded" };
}