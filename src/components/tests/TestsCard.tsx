import styled from '@emotion/styled';
import type { TestItem, Attempt } from '../../types/testing';
import { CalendarIcon, DoneIcon, TimeIcon } from '../../icon/icons';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ConfirmModal } from './ConfirModal';

const Card = styled.div`
  position: relative;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px 24px 24px 32px;
  background: #ffffff;
  width: 100%;
  max-width: 900px;
`;

const ScoreRibbon = styled.div`
  position: absolute;
  top: 0;
  right: 32px;
  background: linear-gradient(180deg, #e8f5ff 0%, #e8f5ff 100%);
  border-radius: 0 0 8px 8px;
  padding: 16px 20px 24px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 2px;
  min-width: 70px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%);
`;

const ScoreValue = styled.span`
  color: #0e73f6;
  font-weight: 700;
  font-size: 26px;
  line-height: 1;
`;

const ScoreMax = styled.span`
  color: #0e73f6;
  font-weight: 600;
  font-size: 26px;
  opacity: 0.6;
  line-height: 1;
  margin-top: 0;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.4;
  color: #09090b;
  padding-right: 90px;
`;

const Description = styled.p`
  margin: 0 0 16px 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  color: #4094f7;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  border: 1px solid #0e73f64d;
  border-radius: 10px;
  padding: 7px 12px;
  background: #f9fafb;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const MetaBadge = styled.div<{ $variant?: 'orange' | 'blue' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  background: ${({ $variant }) => ($variant === 'orange' ? '#fff7ed' : '#eff6ff')};
  color: ${({ $variant }) => ($variant === 'orange' ? '#ea580c' : '#0e73f6')};
  border: 1px solid ${({ $variant }) => ($variant === 'orange' ? '#fed7aa' : '#bfdbfe')};
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
`;

const BaseButton = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.71;
  border-radius: 10px;
  padding: 10px 24px;
  min-width: 140px;
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
  lastAttempt?: Attempt;
};

export function TestCard(props: TestCardProp) {
  const { test, lastAttempt } = props;

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

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
    return d.toLocaleDateString('ru-RU');
  }

  const isGraded = lastAttempt?.status === 'graded';
  const scoreText = isGraded ? lastAttempt.score / 10 : null;

  const hasTimeLimit = !!test.durationSec && test.durationSec > 0;
  const hasAttemptAllowedLimit = test.attemptsAllowed === 1;

  const deadline = formatDateISO(test.deadlineISO);
  const duration = formatSecFromMin(test.durationSec);

  const textBtn = useMemo(() => {
    if (isGraded && test.allowRetry)
      return { status: 'retry', label: 'Пройти заново' };
    if (isGraded && !test.allowRetry)
      return { status: 'done', label: 'Выполнено' };
    return { status: 'start', label: 'Пройти' };
  }, [isGraded, test.allowRetry]);

  function startTest() {
    navigate(`/student/tests/${test.id}`, {
      state: { durationSec: test.durationSec },
    });
    setShowModal(false);
  }
  function handleClick() {
    if (textBtn.status === 'done') return;

    let title = 'Начать тест?';
    
    if (hasTimeLimit && hasAttemptAllowedLimit) {
      title = `Тест ограничен по времени ${duration}. Можно пройти только один раз. Начать?`;
    } else if (hasTimeLimit) {
      title = `Тест ограничен по времени ${duration}. Начать?`;
    } if (hasAttemptAllowedLimit) {
      title = 'Можно пройти один раз. Начать?';
    }
    
    setModalTitle(title);
    setShowModal(true);
  }

  return (
    <>
      <Card>
        {scoreText !== null && (
          <ScoreRibbon>
            <ScoreValue>{scoreText}</ScoreValue>
            <ScoreMax>/10</ScoreMax>
          </ScoreRibbon>
        )}
        
        <Title>{test.title}</Title>
        <Description>{test.shortDescription}</Description>
        
        <Tags>
          {test.tags.map((t, i) => (
            <Tag key={i}>{t}</Tag>
          ))}
        </Tags>

        <MetaRow>
          {deadline && (
            <MetaBadge $variant="orange">
              <CalendarIcon /> {deadline}
            </MetaBadge>
          )}
          {duration && (
            <MetaBadge $variant="blue">
              <TimeIcon /> {duration}
            </MetaBadge>
          )}
        </MetaRow>

        <BottomRow>
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
        </BottomRow>
      </Card>

      <ConfirmModal
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onConfirm={startTest}
        title={modalTitle}
      />
    </>
  );
}