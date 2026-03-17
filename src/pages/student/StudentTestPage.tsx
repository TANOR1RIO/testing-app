import { TestCard } from '../../components/tests/TestsCard';
import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';
import { type Attempt, type TestItem } from '../../types/testing';
import { Loader } from '../../icon/icons';

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); 
  gap: 24px;
  padding: 20px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

type AnswerValue = string | string[] | null;
type AnswerType = 'multiple' | 'single' | 'text';
export type AnswerState = {
  type: AnswerType;
  value: AnswerValue;
};

export type AnswerMap = Record<number, AnswerState>;

export function StudentTestPage() {
  const [tests, setTests] = useState<TestItem[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_TESTS = '/data/tests.json';
    const API_ATTEMPTS = '/data/attempts.json';
    Promise.all([fetch(API_TESTS), fetch(API_ATTEMPTS)])
      .then(async (res) => {
        if (!res[0].ok) throw new Error('HTTP!' + res[0].status);
        if (!res[1].ok) throw new Error('HTTP!' + res[1].status);
        const t = await res[0].json();
        const a = await res[1].json();
        setTests(t);
        setAttempts(a);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const lastAttemptByTest = useMemo(() => {
    const byTest = new Map<number, Attempt>();
    const attempt = attempts.filter(a => a.userId === 1);

    for (const a of attempt) {
      byTest.set(a.testId, a);
    }
    return byTest;
  }, [attempts]);

  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
        <h3>Ошибка: {error}</h3>
      </div>
    );
  }

  return (
    <Cards>
      {tests.map((t, i) => (
        <TestCard
          test={t}
          key={i}
          lastAttempt={lastAttemptByTest.get(t.id)}
        />
      ))}
    </Cards>
  );
}