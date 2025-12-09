import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate('/student');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2>Вход в систему</h2>

      <div>
        <label>Логин</label>
        <input type="text" />
      </div>

      <div>
        <label>Пароль</label>
        <input type="password" />
      </div>

      <div>
        <label>
          <input type="checkbox" />
          Запомнить меня
        </label>
      </div>

      <button type="submit">Войти</button>
    </form>
  );
}