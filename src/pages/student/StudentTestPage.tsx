import { TestCard } from '../../components/tests/TestsCard';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import type { TestItem } from '../../types/testing';

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 20px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

export function StudentTestPage() {
  const [tests, setTests] = useState<TestItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_TESTS = '/data/tests.json';

    fetch(API_TESTS)
      .then((res) => {
        if (!res.ok) throw new Error('Не удалось загрузить тесты');
        return res.json();
      })
      .then((data: TestItem[]) => {
        setTests(data);
      })
      .catch((err) => {
        setError(err.message || 'Произошла ошибка');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <LoaderContainer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100px"
          width="100px"
          viewBox="0 0 200 200"
          style={{ color: '#4f46e5' }}
        >
          {/* SVG как в твоём коде — оставлен без изменений */}
          <defs>
            <clipPath id="pencil-eraser">
              <rect height="30" width="30" ry="5" rx="5"></rect>
            </clipPath>
          </defs>
          <circle
            transform="rotate(-113,100,100)"
            strokeLinecap="round"
            strokeDashoffset="439.82"
            strokeDasharray="439.82 439.82"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            r="70"
            className="pencil__stroke"
          ></circle>
          <g transform="translate(100,100)" className="pencil__rotate">
            <g fill="none">
              <circle
                transform="rotate(-90)"
                strokeDashoffset="402"
                strokeDasharray="402.12 402.12"
                strokeWidth="30"
                stroke="hsl(223,90%,50%)"
                r="64"
                className="pencil__body1"
              ></circle>
              <circle
                transform="rotate(-90)"
                strokeDashoffset="465"
                strokeDasharray="464.96 464.96"
                strokeWidth="10"
                stroke="hsl(223,90%,60%)"
                r="74"
                className="pencil__body2"
              ></circle>
              <circle
                transform="rotate(-90)"
                strokeDashoffset="339"
                strokeDasharray="339.29 339.29"
                strokeWidth="10"
                stroke="hsl(223,90%,40%)"
                r="54"
                className="pencil__body3"
              ></circle>
            </g>
            <g
              transform="rotate(-90) translate(49,0)"
              className="pencil__eraser"
            >
              <g className="pencil__eraser-skew">
                <rect
                  height="30"
                  width="30"
                  ry="5"
                  rx="5"
                  fill="hsl(223,90%,70%)"
                ></rect>
                <rect
                  clipPath="url(#pencil-eraser)"
                  height="30"
                  width="5"
                  fill="hsl(223,90%,60%)"
                ></rect>
                <rect
                  height="20"
                  width="30"
                  fill="hsl(223,10%,90%)"
                ></rect>
                <rect
                  height="20"
                  width="15"
                  fill="hsl(223,10%,70%)"
                ></rect>
                <rect
                  height="20"
                  width="5"
                  fill="hsl(223,10%,80%)"
                ></rect>
                <rect
                  height="2"
                  width="30"
                  y="6"
                  fill="hsla(223,10%,10%,0.2)"
                ></rect>
                <rect
                  height="2"
                  width="30"
                  y="13"
                  fill="hsla(223,10%,10%,0.2)"
                ></rect>
              </g>
            </g>
            <g
              transform="rotate(-90) translate(49,-30)"
              className="pencil__point"
            >
              <polygon
                points="15 0,30 30,0 30"
                fill="hsl(33,90%,70%)"
              ></polygon>
              <polygon
                points="15 0,6 30,0 30"
                fill="hsl(33,90%,50%)"
              ></polygon>
              <polygon
                points="15 0,20 10,10 10"
                fill="hsl(223,10%,10%)"
              ></polygon>
            </g>
          </g>
        </svg>
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
      {tests.length > 0 ? (
        tests.map((test) => <TestCard key={test.id} test={test} />)
      ) : (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
          Нет доступных тестов
        </div>
      )}
    </Cards>
  );
}