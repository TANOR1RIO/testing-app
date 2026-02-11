import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import StudentLayout from '../layouts/StudentLayout';
import AdminLayout from '../layouts/AdminLayout';
import LoginPage from '../pages/login/LoginPage';
import NotFoundPage from '../pages/error/NotFoundPage';
// import { StudentTests } from '../pages/student/StudentTests';
import StudentPage from '../pages/student/StudentPage';
import { StudentTestPage } from '../pages/student/StudentTestPage';
import { StudentProfilePage } from '../pages/student/StudentProfilePage';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <NotFoundPage />,
        children: [
            { path: "login", element: <LoginPage /> },
            { path: "student", element: <StudentLayout /> , 
                children: [
                {
                    index: true, 
                    element: <StudentPage /> 
                },
                {
                    path: "tests", 
                    element: <StudentTestPage /> 
                },
                // {
                //     path: "test/:id", 
                //     element: <StudentTestPage />
                // },
                {
                    path: "statistics", 
                    element: <h2>Статичтика студента</h2>
                },
                {
                    path: "profile", 
                    element: <StudentProfilePage/>
                }
            ]},
            { path: "admin", element: <AdminLayout /> ,
                children: [
                {
                    index: true, 
                    element: <h2> Admin dashboard</h2> 
                },
                {
                    path: "settings", 
                    element: <h2> Admin SETTINGS</h2> 
                }
                ]
            },
            { path:'*' , element: <NotFoundPage />}
        ],
    },
]);