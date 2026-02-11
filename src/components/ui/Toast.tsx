import styled from "@emotion/styled";
import { DoneIcon } from "../../icon/icons";
import { useEffect } from "react";

const Wrap = styled.div`
  position: fixed;
  bottom: 35px;
  right: 35px;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  background-color: #d7dfff;
  border-radius: 15px;
  color: #0e73f6;
  padding: 22.76px 16px;
  min-widht: 371px
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 13.27px;
`;

const Close = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  color: #0e73f6;
  position: absolute;
  top: 8.67px;
  right: 8.67px;
`;

const Message = styled.p`
  color: #0e73f6;
  font-size: 14px;
  font-weight: 600;
`;

type ToastProps = {
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
};

export function Toast({ message, open, onClose, duration = 3000 }: ToastProps) {

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
    onClose();
  }, duration);

  return ()=>clearTimeout(id)
}, [open, onClose, duration]);

  if (!open) return null;

  return (
    <Wrap>
      <Content>
        <DoneIcon />
        <Message>{message}</Message>
      </Content>
      <Close>X</Close>
    </Wrap>
  );
}