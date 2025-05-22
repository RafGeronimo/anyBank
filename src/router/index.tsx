import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import Home from "../pages/Home";
import AuthLayout from "../pages/AuthLayout";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import ProtectedRoute from "../pages/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Home />,
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);
