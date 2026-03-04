import { useLocation, useParams } from "react-router";
import {QuestionBlock} from "../../components/tests/QuestionBlock";
import { Timer } from "../../components/Timer";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Loader } from "../../icon/icons";
import { StudentHeader } from '../../components/student/StudentHeader';
import type { Question, TestItem } from "../../types/testing";

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
  const [anwers, setAnwers] = useState<Question[]>([]);
  const [testMeta, setTestMeta] = useState<TestItem | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { id } = useParams();
  const testId = Number(id);

  useEffect(() => {
    const API_URL = '/data/questions.json';
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP${res}`);
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
        if (!res.ok) throw new Error(`HTTP${res}`);
        return res.json();
      })
      .then((tests: TestItem[]) => {
        const found = tests.find(t => t.id === testId);
        setTestMeta(found);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  console.log('testMeta', testMeta);

  const durationSec =
    (
      location.state as {
        durationSec?: number;
      } | null
    )?.durationSec ?? 600;
  function handleChange(id: number, value:string | string[]){
    console.log(id,value)
    setAnwers(prev => ({
      ...prev,
      [id]:{
        ...prev[id],
        value
      }
    }))
  }
  console.log('answer',anwers);
  if (Number.isNaN(testId))
    return (
      <div>
        <StudentHeader title="100" />
        <Grid>
          <h3>Неопределенный ID теста</h3>
        </Grid>
      </div>
    );

  if (questions.length === 0)
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
      <StudentHeader title="100" />
      <Grid>
        <div>
          {filtered.map(q => (
            <QuestionBlock key={q.id} question={q} onChange={handleChange} />
          ))}
        </div>
        <Timer
          durationSec={durationSec}
          onFinish={() => alert('Тест закончен')}
        />
      </Grid>
    </div>
  );
}