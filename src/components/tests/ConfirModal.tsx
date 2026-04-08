import styled from '@emotion/styled';
import Modal from "../../modal/modal";
import type { ReactNode } from 'react';

const Button = styled.button<{ tone?: string }>`
  padding: 12px 24px;
  flex: 1;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  
  background-color: ${({ tone }) => tone === 'primary' ? '#0077ff' : 'transparent'};
  color: ${({ tone }) => tone === 'primary' ? '#FFFFFF' : '#333333'};
  border: 1px solid ${({ tone }) => tone === 'primary' ? '#0077ff' : '#dddddd'};

  &:hover {
    background-color: ${({ tone }) => tone === 'primary' ? '#0066dd' : '#f5f5f5'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  labelClose?: ReactNode; 
  labelDone?: ReactNode;
};

export function ConfirmModal(props: ConfirmModalProps) {
  const { 
    isOpen, 
    onClose, 
    onConfirm,
    title,
    labelClose = "Отмена",
    labelDone = "Начать"
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      foot={
        <>
          <Button onClick={onClose}>
            {labelClose}
          </Button>
          <Button tone="primary" onClick={onConfirm}>
            {labelDone}
          </Button>
        </>
      }
    />
  );
}
