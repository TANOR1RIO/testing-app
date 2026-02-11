import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { StudentHeader } from '../components/student/StudentHeader';

function getHeaderTitle(pathname: string): string {
  if (pathname === '/student') return 'Мои тесты';
  if (pathname === '/student/profile') return 'Профиль';
  if (pathname.startsWith('/student/test/')) return 'Тест';
  if (pathname.startsWith('/student/test')) return 'Тесты';
  if (pathname.startsWith('/student/results/')) return 'Результаты';
  return 'Студент';
}

export default function AppLayout() {
  const location = useLocation();
  const { pathname } = location;
  const shouldHideStudentHeader = 
    pathname === '/login' || 
    pathname === '/student/profile';

  const title = getHeaderTitle(pathname);

  return (
    <div>
      <header>
        <nav>
          {!shouldHideStudentHeader && <StudentHeader title={title} />}
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/student">Student</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>© 2025</footer>
    </div>
  );
}