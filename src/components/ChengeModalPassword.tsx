import { useState } from "react";
import Modal from "../modal/modal";
import styled from "@emotion/styled";

type ChangeModalPasswordProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const Errors = styled.div`
  border-radius: 4px;
  color: #d32f2f;
  font-size: 14px;
  white-space: pre-line;
  margin-top: 8px;
`;

const USER_PASS = 'Password123$';

export default function ChangeModalPassword({ isOpen, onClose, onSuccess }: ChangeModalPasswordProps) {
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");

  const validatePassword = (pw: string): string[] => {
    const errors: string[] = [];
    if (pw.length < 8) errors.push("Не менее 8 символов");
    if (!/[a-zа-яё]/.test(pw)) {
      errors.push("Хотя бы одна буква в нижнем регистре");
    }
    if (!/[A-ZА-ЯЁ]/.test(pw)) {
      errors.push("Хотя бы одна буква в верхнем регистре");
    }
    if (!/[0-9]/.test(pw)) {
      errors.push("Хотя бы одна цифра");
    }
    if (!/[!@#$%^&*?]/.test(pw)) {
      errors.push("Хотя бы один спецсимвол (!@#$%^&*?)");
    }
    if (/\s/.test(pw)) {
      errors.push("Без пробелов");
    }
    if (pw.toLowerCase() === USER_PASS.toLowerCase()) {
      errors.push("Новый пароль не должен совпадать со старым");
    }

    return errors;
  };

  const errors = validatePassword(pw1);

  // Проверка несовпадения паролей
  const passwordMismatch = pw1 !== '' && pw2 !== '' && pw1 !== pw2;
  const checkErr = passwordMismatch ? 'Пароли не совпадают' : null;

  // Форма валидна, если:
  // - оба поля заполнены
  // - пароли совпадают
  // - нет ошибок валидации
  const formValid = 
    pw1 !== '' && 
    pw2 !== '' && 
    pw1 === pw2 && 
    errors.length === 0;

  async function sendPassword(newPw: string) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (newPw.includes(USER_PASS)) {
          reject(new Error("Ync!"));
        } else {
          resolve();
          console.log("Пароль успешно изменен");
        }
      }, 1000);
    });
  }

  const onSubmit = async () => {
    if (!formValid) return;

    try {
      await sendPassword(pw1);
      setPw1('');
      setPw2('');
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Сменить пароль"
      onClose={onClose}
      foot={
        <>
          <button className="cancel" onClick={onClose}>
            Отмена
          </button>
          <button className="confirm" onClick={onSubmit} disabled={!formValid}>
            Сохранить
          </button>
        </>
      }
    >
      <form>
        <label htmlFor="new-pass">Новый пароль</label>
        <input
          type="password"
          id="new-pass"
          placeholder="Введите новый пароль"
          onChange={(e) => setPw1(e.target.value)}
          value={pw1}
        />
        <label style={{ marginTop: "16px", display: "block" }} htmlFor="confirm-pass">
          Повторите пароль
        </label>
        <input
          type="password"
          id="confirm-pass"
          placeholder="Подтвердите пароль"
          onChange={(e) => setPw2(e.target.value)}
          value={pw2}
        />
      </form>

      {errors.length > 0 && <Errors>{errors.join("\n")}</Errors>}
      {checkErr && <Errors>{checkErr}</Errors>}
    </Modal>
  );
}