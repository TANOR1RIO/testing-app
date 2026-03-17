import type { AnswerState, Question } from "../types/testing";

type QuestionProps = {
    q: Question;
    answ: AnswerState | undefined
    status: 'correct' | 'wrong' | 'partial';
};

export function checkQuestion(props: QuestionProps) {
    
    const {q, answ} = props;
        
    const correct = q.correct;

    if(!correct) return { max: q?.score, correctAnsw: 0 }
    if(!answ) return { max: q?.score, correctAnsw: 0 }

    if (q.type === 'single') {
        const ok = answ?.value === correct;
        return {
            max: q.score,
            currentAnsw: ok ? q.score : 0,
            status: ok ? 'correct' : 'wrong',
        }
    }
    if (q.type === 'text') {
        return {
            max: q.score,
            currentAnsw: 0,
        }
    }
    if (q.type === 'multiple') {
        const userAnswer = Array.isArray(answ?.value) ? answ.value : [];
        const questionDone = Array.isArray(correct) ? correct : [];

        const correctCount = userAnswer.filter(val => questionDone.includes(val)).length;
        const wrongCount = userAnswer.filter(val => !questionDone.includes(val)).length;

        if (wrongCount > 0) {
            return {
                max: q.score,
                currentAnsw: 0,
                status: 'wrong',
            };
        }

        if (correctCount === questionDone.length) {
            return {
                max: q.score,
                currentAnsw: q.score,
                status: 'correct',
            };
        }
       
        return {
            max: q.score,
            currentAnsw: 0,
            status: 'partial',
        };
    }
    
    return {
        max: q.score,
        currentAnsw: 0,
    };
}