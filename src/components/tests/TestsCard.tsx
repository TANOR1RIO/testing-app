import styled from '@emotion/styled';
import type { TestItem } from '../../types/testing';
import { CalendarIcon, TimeIcon } from '../../icon/icons';

const Tags = styled.div`
  display: flex;
  gap: 5px;
`;

const Tag = styled.div`
  color: #4094f7;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  border: 1px solid #0e73f64d;
  border-radius: 10px;
  padding: 7px 12px;
`;

type TestCardProp = {
  test: TestItem;
};

export function TestCard(props: TestCardProp) {
  const { test } = props;

function formatSecFromMin(seconds: number | null): string | null {
  if (!seconds) return null;

  const minutes = Math.round(seconds / 60);

  // Определяем правильную форму слова "минута"
  let wordForm: string;
  const lastTwoDigits = minutes % 100;
  const lastDigit = minutes % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    wordForm = 'минут';
  } else if (lastDigit === 1) {
    wordForm = 'минута';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    wordForm = 'минуты';
  } else {
    wordForm = 'минут';
  }

  return `${minutes} ${wordForm}`;
}

function formatDateISO(date: string | null): string | null {
  if (!date) return null;
  const d = new Date(date);
  return d.toLocaleDateString('RU');
}

  return (
    <div>
      <h3>{test.title}</h3>
      <p>{test.shortDescription}</p>
      <Tags>
        {test.tags.map((t, i) => (
          <Tag key={i}>{t}</Tag>
        ))}
      </Tags>
      <div>
        <div>
          <CalendarIcon /> {formatDateISO(test.deadlineISO)}
        </div>
        <div>
          <TimeIcon /> {formatSecFromMin(test.durationSec)}
        </div>
      </div>
    </div>
  );
}