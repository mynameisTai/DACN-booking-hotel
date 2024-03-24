import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import ErrorPage from "../pages/Error404";
import Home from "../pages/Home";
import AuthProvider from "../context";
import { CardDetail } from "../components/card/CardDetail";
import ProtectedRouter from "./ProtectedRouter";
import { Order } from "../components/order/Order";
import Profile from "../components/user/Profile";
import { StoreProvider } from "../context/order";
import ButtonSuccess from "../components/order/ButtonSuccess";
const AuthLayout = () => {
  return (
    <AuthProvider>
      <StoreProvider>
        <Outlet />
      </StoreProvider>
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <CardDetail />,
        path: `/hotel/:hotelId`,
        children: [
          {
            element: <Order />,
            path: "/hotel/:hotelId/order",
          },
        ],
      },
      {
        element: <Profile />,
        path: "/profile/me",
      },
      {
        element: <ButtonSuccess />,
        path: "/success",
      },
    ],
  },
]);
