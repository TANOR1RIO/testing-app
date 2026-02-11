import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { BackIcon } from "../../icon/icons";

type StudentHeaderProps = {
  title: string;
  children?: ReactNode;
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  min-height: 64px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: #f4f9ff;
  color: #0e73f6;
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
  text-decoration: none;
  padding: 0;
  margin: 0;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #0f172a;
`;

const Nick = styled.div`
  font-size: 13px;
  color: #64748b;
  word-break: break-word;
  max-width: 120px;
`;

export function StudentHeader({ title }: StudentHeaderProps) {
  const navigate = useNavigate();
  const hideUser = title.trim().toLowerCase() === "профиль";

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Header>
      <Left>
        <BackButton onClick={handleGoBack} aria-label="Назад">
          <BackIcon />
        </BackButton>
        <Title>{title}</Title>
      </Left>

      {!hideUser && (
        <Right>
          <User>
            <Avatar
              src="https://i.pinimg.com/736x/a8/ad/b3/a8adb3faaad0401520f89298fbf0f098.jpg"
              alt="Афигевший Котяра Окакович"
            />
            <Info>
              <Name>Афигевший Котяра Окакович</Name>
              <Nick>vk.com/id276233156</Nick>
            </Info>
          </User>
        </Right>
      )}
    </Header>
  );
}