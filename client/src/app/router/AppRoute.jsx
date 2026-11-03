import { createBrowserRouter, RouterProvider } from "react-router";
import PublicRoute from "./PublicRoute";
import AuthLayout from "../../layout/AuthLayout";
import LoginPage from "../../feature/auth/ui/page/LoginPage";
import RegisterPage from "../../feature/auth/ui/page/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../../layout/MainLayout";
import Dashboard from "../../feature/ai/ui/page/Dashboard";

const AppRoute = () => {
  const router = createBrowserRouter([
    {
      element: <PublicRoute />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              path: "/login",
              element: <LoginPage />,
            },
            {
              path: "/register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },

    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/dashboard",
              element: <Dashboard />,
            },
            // {
            //   path: "/resumes",
            //   element: <MyResumes />,
            // },
            // {
            //   path: "/resumes/create",
            //   element: <ResumeBuilder />,
            // },
            // {
            //   path: "/resumes/:id/edit",
            //   element: <ResumeBuilder />,
            // },
            // {
            //   path: "/skill-gap",
            //   element: <SkillGapFinder />,
            // },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoute;
