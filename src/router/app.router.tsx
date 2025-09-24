import { createBrowserRouter, Navigate } from "react-router";
import { PrivateRoute } from "./PrivateRoute";
import AuthPage from "../pages/AuthPage";
import AccountPage from "../pages/AccountPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/account",
    element: <PrivateRoute element={<AccountPage />} />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
