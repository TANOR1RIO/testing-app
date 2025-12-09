import { NavLink, Outlet } from 'react-router';

export default function AppLayout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Login
          </NavLink>
          <NavLink
            to="/student"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Student
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Admin
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>© 2025</footer>
    </div>
  );
}