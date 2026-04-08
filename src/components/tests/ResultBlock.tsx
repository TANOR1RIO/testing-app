import styled from '@emotion/styled';

const Result = styled.div`
  background-color: #81c49156;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 321px;
  gap: 15px;
`;

const TitleRes = styled.h4`
  color: #10ce3f;
  font-size: 16px;
  line-height: 1;
  font-weight: 400;
`;

const Value = styled.div`
  color: #10ce3f;
  font-size: 66px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0;
`;

type ResultBlockProps = {
  score: number;
  max: number;
};

export function ResultBlock({ score, max }: ResultBlockProps) {
  return (
    <Result>
      <TitleRes>Баллы</TitleRes>
      <Value>
        {score} / {max}
      </Value>
    </Result>
  );
}