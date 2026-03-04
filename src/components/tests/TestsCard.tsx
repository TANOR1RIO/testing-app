import styled from '@emotion/styled';
import type { TestItem, Attempt } from '../../types/testing';
import { CalendarIcon, DoneIcon, TimeIcon } from '../../icon/icons';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

const Tags = styled.div`
  display: flex;
  gap: 5px;
`;
const Card = styled.div`
  position: relative;
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
const ContentScore = styled.div`
  background-color: #e8f5ff;
  border-radius: 0 0 2px 4px;
  padding: 20px 10px 46px;
  position: absolute;
  top: 0;
  right: 35px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%);
`;

const Score = styled.span`
  color: #0e73f6;
  font-weight: 600;
  font-size: 26.4px;
  line-height: 1;
`;

const MaxScore = styled.span`
  color: #0e73f64d;
  font-weight: 600;
  font-size: 26.4px;
  line-height: 1;
`;
const BaseButton = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.71;
  border-radius: 10px;
  padding: 7px 22px;
  min-width: 122px;
  cursor: pointer;
`;

const StartBtn = styled(BaseButton)`
  color: #ffffff;
  border: 1px solid #0e73f6;
  background-color: #0e73f6;
`;

const RetryBtn = styled(BaseButton)`
  border: 1px solid #dde2e4;
  background-color: transparent;
  color: #09090b;
`;

const SuccessBtn = styled(BaseButton)`
  color: #ffffff;
  border: 1px solid #00c63f;
  background-color: #00c63f;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:disabled {
    opacity: 0.7;
  }
`;

type TestCardProp = {
  test: TestItem;
  lastAttempt?: Attempt; // ✅ Сделали опциональным и исправили camelCase
};

export function TestCard(props: TestCardProp) {
  const { test, lastAttempt } = props;
  console.log(lastAttempt);

  const navigate = useNavigate();

  function formatSecFromMin(seconds: number | null): string | null {
    if (!seconds) return null;

    const minutes = Math.round(seconds / 60);

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

  // ✅ Добавили проверку на undefined
  const isGraded = lastAttempt?.status === 'graded';
  const scoreText = isGraded ? lastAttempt.score / 10 : null;

  const textBtn = useMemo(() => {
    if (isGraded && test.allowRetry)
      return { status: 'retry', label: 'Пройти заного' };
    if (isGraded && !test.allowRetry)
      return { status: 'done', label: 'Выполненно' };
    return { status: 'start', label: 'Пройти' };
  }, [isGraded, test.allowRetry]);

  function handleClick() {
    if (textBtn.status === 'done') return;
    navigate(`/student/tests/${test.id}`, {
      state: { durationSec: test.durationSec },
    });

    console.log(test.id);
  }

  return (
    <Card>
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
      <div>
        {textBtn.status === 'start' && (
          <StartBtn onClick={() => handleClick()}>{textBtn.label}</StartBtn>
        )}
        {textBtn.status === 'retry' && (
          <RetryBtn onClick={() => handleClick()}>{textBtn.label}</RetryBtn>
        )}
        {textBtn.status === 'done' && (
          <SuccessBtn disabled>
            {textBtn.label}
            <DoneIcon />
          </SuccessBtn>
        )}
      </div>
      {scoreText && (
        <ContentScore>
          <Score>{scoreText}</Score>
          <MaxScore>/10</MaxScore>
        </ContentScore>
      )}
    </Card>
  );
}