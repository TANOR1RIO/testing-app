import styled from '@emotion/styled';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 6rem;
  margin: 0;
  color: #e53935;
  font-weight: 700;
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  margin: 12px 0 24px;
  font-weight: 500;
  color: #555;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #777;
  max-width: 500px;
  line-height: 1.6;
`;

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <Title>404</Title>
      <Subtitle>Страница не найдена</Subtitle>
      <Message>
        Запрашиваемая страница не существует или была перемещена.
      </Message>
    </PageWrapper>
  );
}