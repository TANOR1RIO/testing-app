import { NavLink, Outlet } from 'react-router-dom';
import { StoreProvider } from '../store/StoreProvider/StoreProvider';

export default function AppLayout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/student">Student</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </header>
      <main>
        <StoreProvider>
          <Outlet />
        </StoreProvider>
      </main>
      <footer>© 2025</footer>
    </div>
  );
}