import type { AnswerState, Question } from "../types/testing";

export function checkQuestion(q: Question, answ: AnswerState | undefined) {
  const correct = q?.correct;

  if (!correct) return { max: q?.score ?? 0, currentAnsw: 0 };
  if (!answ) return { max: q?.score ?? 0, currentAnsw: 0 };

  if (q.type === "single") {
    const ok = answ?.value === correct;
    return {
      max: q.score,
      currentAnsw: ok ? q.score : 0,
      status: ok ? "correct" : "wrong",
    };
  }

  if (q.type === "text") {
    return {
      max: q.score,
      currentAnsw: 0,
    };
  }

  if (q.type === "multiple") {
    const userAnsw = Array.isArray(answ?.value) ? answ.value : [];
    const questionDone = Array.isArray(correct) ? correct : [];

    const correctCount = userAnsw.filter((val) =>
      questionDone.includes(val)
    ).length;

    // Дальше логика для multiple — на скриншоте обрезано
    const wrongCount = userAnsw.filter(
      (val) => !questionDone.includes(val)
    ).length;

    if (wrongCount > 0) {
      return { max: q.score, currentAnsw: 0, status: "wrong" };
    }

    const totalCorrect = questionDone.length;

    if (totalCorrect === 0) {
      return { max: q.score, currentAnsw: 0 };
    }

    if (correctCount === totalCorrect) {
      return { max: q.score, currentAnsw: q.score, status: "correct" };
    }

    const points = Math.round((q.score * correctCount) / totalCorrect);
    return { max: q.score, currentAnsw: points, status: "partial" };
  }

  return { max: q.score, currentAnsw: 0 };
}