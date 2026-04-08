import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { BackIcon, SearchIcon } from "../../icon/icons";

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

const SearchButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
  color: #475569;
  padding: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  &:hover {
    background: #f5f7fb;
  }
`;

const SearchInput = styled.input`
  height: 36px;
  min-width: 220px;
  padding: 0 10px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  background: #fff;
  box-sizing: border-box;
  &:focus {
    border-color: #0e73f6;
    box-shadow: 0 0 0 3px rgba(14, 115, 246, 0.15);
  }
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

type StudentHeaderProps = {
  title: string;
  onBack?: () => void;
};

export function StudentHeader({ title, onBack }: StudentHeaderProps) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const hideUser = title.trim().toLowerCase() === "профиль";
  const isTestsHeader = 
    title.trim().toLowerCase() === "тесты" || 
    title.trim().toLowerCase() === "мои тесты";

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleCloseSearch();
    }
  };

  return (
    <Header>
      <Left>
        <BackButton
          onClick={onBack ?? (() => navigate(-1))}
          aria-label="Назад"
        >
          <BackIcon />
        </BackButton>
        <Title>{title}</Title>
      </Left>
      {!hideUser && (
        <Right>
          {isTestsHeader && (
            <>
              {searchOpen ? (
                <SearchInput
                  ref={searchInputRef}
                  type="text"
                  placeholder="Поиск тестов…"
                  aria-label="Строка поиска по тестам"
                  onBlur={handleCloseSearch}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <SearchButton
                  onClick={() => setSearchOpen(true)}
                  aria-label="Поиск"
                  title="Открыть поиск"
                >
                  <SearchIcon />
                </SearchButton>
              )}
            </>
          )}
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