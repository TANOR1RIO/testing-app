import { useEffect } from "react";
import styled from "@emotion/styled";

const BGModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Dialog = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  width: 500px;
  max-width: 95vw;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 16px 0;
    color: #222;
    text-align: center;
  }

  button.close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #777;
    transition: color 0.2s;

    &:hover {
      color: #333;
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  input[type="password"] {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #3a96ff;
      box-shadow: 0 0 0 2px rgba(58, 150, 255, 0.2);
    }
  }
`;

const Foot = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;

  button {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
    flex: 1;

    &.cancel {
      background-color: white;
      color: #333;
      border: 1px solid #ddd;

      &:hover {
        background-color: #f9f9f9;
      }
    }

    &.confirm {
      background-color: #3a96ff;
      color: white;

      &:hover {
        background-color: #2d7ed8;
        transform: scale(1.02);
      }
    }
  }
`;

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  foot?: React.ReactNode;
};

export default function Modal({ isOpen, title, onClose, children, foot }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <BGModal>
      <Dialog>
        <Head>
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </Head>
        <Main>{children}</Main>
        {foot && (
          <Foot>
            {foot}
          </Foot>
        )}
      </Dialog>
    </BGModal>
  );
}