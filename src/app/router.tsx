import { createBrowserRouter } from 'react-router';
import AppLayout from '../layouts/AppLayout';
import StudentLayout from '../layouts/StudentLayout';
import AdminLayout from '../layouts/AdminLayout';
import LoginPage from '../pages/login/LoginPage';
import NotFoundPage from '../pages/error/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      {
        path: 'student',
        element: <StudentLayout />,
        children: [
          {
            index: true,
            element: <h2>Student dashboard</h2>,
          },
          {
            path: 'tests',
            element: <h2>Student TESTS</h2>,
          },
        ],
      },
      { path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <h2>Admin dashboard</h2>,
          },
          {
            path: 'settinhs',
            element: <h2>Admin SETTINGS</h2>,
          }
        ]
      },
       {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);