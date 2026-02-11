import styled from '@emotion/styled';
import { Outlet, NavLink } from 'react-router-dom';
import { TestingIcon, StatisticsIcon, ProfileIcon } from '../icon/icons';

const Main = styled.main`
  display: grid;
  grid-template-columns: 240px 1fr;
`;

const Aside = styled.aside`
  padding: 30px 16px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  text-decoration: none;
  color: inherit;
  border-radius: 10px;
  background-color: transparent; /* ← добавлено */
  transition: all 0.3s ease;

  &.active {
    color: #1890ff;
    background-color: #e8f5ff;
  }

  &:hover {
    color: #1890ff;
    background-color: #f5f5f5;
  }
`;

const MainContent = styled.section`
  padding: 30px 40px;
  background-color: #fbfbfb;
`;

export default function StudentLayout() {
  return (
    <Main>
      <Aside>
        <Item
          to="/student/tests"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <TestingIcon />
          Тестирование
        </Item>
        <Item
          to="/student/statistics"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <StatisticsIcon />
          Статистика
        </Item>
        <Item
          to="/student/profile"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <ProfileIcon />
          Профиль
        </Item>
      </Aside>
      <MainContent>
        <Outlet />
      </MainContent>
    </Main>
  );
}