import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 16px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #0f172a;
  text-align: center;
  margin: 0;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #334155;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #0e73f6;
    box-shadow: 0 0 0 3px rgba(14, 115, 246, 0.15);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #475569;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #0e73f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0b5bc9;
  }

  &:active {
    background-color: #094da6;
  }
`;

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate('/student');
  };

  return (
    <LoginPageContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Вход в систему</Title>

        <InputGroup>
          <Label htmlFor="login">Логин</Label>
          <Input id="login" type="text" />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" type="password" />
        </InputGroup>

        <CheckboxLabel>
          <Checkbox type="checkbox" />
          Запомнить меня
        </CheckboxLabel>

        <SubmitButton type="submit">Войти</SubmitButton>
      </Form>
    </LoginPageContainer>
  );
}