import { useLocation, useParams } from "react-router";
import {QuestionBlock} from "../../components/tests/QuestionBlock";
import { Timer } from "../../components/Timer";
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { Loader } from "../../icon/icons";
import { StudentHeader } from '../../components/student/StudentHeader';
import type { Question, TestItem } from "../../types/testing";
import type { AnswerMap } from "./StudentTestPage"; 
import { ConfirmModal } from "../../components/tests/ConfirModal";
import { checkQuestion } from "../../utils/checkQuestion";


const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 10px;
`;

export function StudentRunTests() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [testMeta, setTestMeta] = useState<TestItem | null>(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { id } = useParams();
  const testId = Number(id);

  useEffect(() => {
    const API_URL = '/data/questions.json';
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP${res.status}`);
        return res.json();
      })
      .then(todos => setQuestions(todos))
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = questions.filter(q => q.testId === Number(id));

  useEffect(() => {
    const API_URL = '/data/tests.json';
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP${res.status}`);
        return res.json();
      })
      .then((tests: TestItem[]) => {
        const found = tests.find(t => t.id === testId);
        setTestMeta(found ?? null);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [testId]);

  

  useEffect(() => {
    if (filtered.length === 0) return;
    
    setAnswers(prevAnsw => {
      if (Object.keys(prevAnsw).length > 0) return prevAnsw;
      
      const initAnswer: AnswerMap = {};
      for (const quest of filtered) {
        initAnswer[quest.id] = {
          type: quest.type,
          value: quest.type === 'multiple' ? [] : null,
        };
      }
      
      return initAnswer;
    });
  }, [filtered]);

  const durationSec =
    (
      location.state as {
        durationSec?: number;
      } | null
    )?.durationSec ?? 600;
    
  function handleChange(id: number, value: string | string[] | null){
    setAnswers(prev => ({
      ...prev,
      [id]: {
        type: prev[id]?.type || 'text',
        value
      }
    }))
  }

  const answeredCount = useMemo (() => {
  return Object.values(answers).filter((answ) => {
    if (answ.type === 'single') return answ.value !== null;
    if (answ.type === 'multiple')
      return Array.isArray(answ.value) && answ.value.length > 0;
    if (answ.type === 'text') return typeof answ.value === 'string' && answ.value.trim() !== '';
  }).length;
  },[answers]);

  const totalCount = filtered.length
  const allAnswered = totalCount === answeredCount;

  function handleSubmit() {
  const resultAnsw = {
    testId,
    answers,
    timeSpent: durationSec, //заглушка
  };
  console.log('------ RESULT ------');
  console.log('attempt:', resultAnsw);

  console.log('Результат', answeredCount, '/', totalCount);
}

function confirFinish(){
  setShowModal(false)
  handleSubmit()
}

const result = useMemo(() => {
    return filtered.map(q => checkQuestion({ 
        q, 
        answ: answers[q.id],
        status: 'partial'
    }));
}, [filtered, answers]);

console.log(result);

const title = allAnswered ? "Хотите закончить тестирование" : "Не все задания выполненны, хотите закончить тестирование"

  if (Number.isNaN(testId))
    return (
      <div>
        <StudentHeader title="100" />
        <Grid>
          <h3>Неопределенный ID теста</h3>
        </Grid>
      </div>
    );

  if (filtered.length === 0)
    return (
      <div>
        <StudentHeader title="100" />
        <Grid>
          <h3>Список вопросов пуст</h3>
        </Grid>
      </div>
    );

  if (error)
    return (
      <div>
        <StudentHeader title="100" />
        <Grid>
          <h3 style={{ color: 'red' }}>{error}</h3>
        </Grid>
      </div>
    );

  if (loading)
    return (
      <div>
        <StudentHeader title="100" />
        <Grid>
          <LoaderWrap>
            <Loader />
          </LoaderWrap>
        </Grid>
      </div>
    );
    
  return (
    <div>
      <StudentHeader title="Тест" />
      <Grid>
        <div>
          {filtered.map(q => (
            <QuestionBlock 
              key={q.id} 
              question={q} 
              onChange={handleChange} 
              value={answers[q.id]?.value ?? null} 
            />
          ))}
        </div>
        <Timer
          durationSec={durationSec}
          onFinish={() => alert('Тест закончен')}
        />
        <button onClick={() => setShowModal(true)}>Отправить</button>
      </Grid>
      <ConfirmModal
        isOpen={showModal} 
        labelDone={"Завершить"}
        onClose={() => setShowModal(false)}
        onConfirm={confirFinish}
        title={title}
      />
    </div>
  );
}